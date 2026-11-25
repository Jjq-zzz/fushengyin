/* 18 · DeepSeek 运行时叙事层：只改写叙述，不改数值、不改选项数量
 * window.AI = { available(), rewrite(sc, meta), clearCache() }
 * - 开关默认关；key 只存 localStorage（fsy:ai:v1），绝不入代码
 * - 六条校验，任一失败静默降级为原文
 * - 缓存 fsy:ai:cache:v1，key = dynasty|eventId|gender|identity|scene，上限 200 条
 */
(function (global) {
  'use strict';

  var KEY_STORE = 'fsy:ai:v1';
  var CACHE_KEY = 'fsy:ai:cache:v1';
  var BLACKLIST = /系统|属性|数值|积分|任务|玩家|升级|好感度|\d+\s*点/;
  var TIMEOUT = 8000;

  function store() {
    try { return JSON.parse(global.localStorage.getItem(KEY_STORE) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function save(cfg) {
    try { global.localStorage.setItem(KEY_STORE, JSON.stringify(cfg)); } catch (e) { /* 配额满则忽略 */ }
  }
  function cacheGet(k) {
    try {
      var c = JSON.parse(global.localStorage.getItem(CACHE_KEY) || '{}');
      return c[k] || null;
    } catch (e) { return null; }
  }
  function cachePut(k, v) {
    try {
      var c = JSON.parse(global.localStorage.getItem(CACHE_KEY) || '{}');
      var keys = Object.keys(c);
      if (keys.length >= 200) { keys.sort(); delete c[keys[0]]; }   // 满 200 条时按 key 排序淘汰一条（近似清最旧）
      c[k] = v;
      global.localStorage.setItem(CACHE_KEY, JSON.stringify(c));
    } catch (e) { /* 忽略 */ }
  }

  var directFailNotified = false;

  function available() {
    var cfg = store();
    return !!(cfg.on && cfg.key && typeof global.fetch === 'function');
  }

  /* 校验六条：解析成功 / story 长度 / 选项数一致 / 黑名单 / 选项文案长度 / story 为字符串 */
  function validate(parsed, originCount) {
    if (!parsed || typeof parsed !== 'object') return '非对象';
    if (typeof parsed.story !== 'string') return 'story 非字符串';
    if (parsed.story.length < 60 || parsed.story.length > 260) return 'story 长度越界';
    if (!Array.isArray(parsed.options) || parsed.options.length !== originCount) return '选项数量改变';
    for (var i = 0; i < parsed.options.length; i++) {
      if (typeof parsed.options[i] !== 'string' || parsed.options[i].length > 14) return '选项文案越界';
    }
    var all = parsed.story + parsed.options.join('');
    if (BLACKLIST.test(all)) return '命中黑名单';
    return null;
  }

  function rewrite(sc, meta, cb) {
    var cfg = store();
    if (!available()) { cb(null); return; }
    if (!sc || !sc.id || sc.quiet) { cb(null); return; }

    var cacheId = [meta.dynasty, sc.id, meta.gender || 'm', meta.identity || '', meta.scene || 0].join('|');
    var hit = cacheGet(cacheId);
    if (hit) { cb(hit); return; }

    var proxy = (cfg.proxy || '').trim();
    var url = proxy || 'https://api.deepseek.com/chat/completions';

    var user = JSON.stringify({
      朝代: meta.dynasty || '', 时序: meta.time || '', 地点: meta.loc || '',
      身份: meta.identity || '', 性别: meta.gender || '男', 年纪: meta.age || '',
      原场景: { 标题: sc.title || '', 正文: sc.story || '' },
      选项: (sc.options || []).map(function (o) { return o.t; }),
      身边人: meta.npcs || [],
      要求: '改写后仍需保持四个选项的数量与顺序，语义不变'
    });

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, TIMEOUT);

    fetch(url, {
      method: 'POST',
      signal: controller ? controller.signal : undefined,
      headers: { 'Authorization': 'Bearer ' + cfg.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: cfg.model || 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是《浮生引》的叙述者。改写我给你的一个场景，只改文字，不改事实。规则：\n- 半文半白，克制，有画面；不使用现代词（系统/属性/数值/积分/任务/玩家/升级/好感度一律禁止）。\n- 叙述中不得出现任何数字、不得写「加/减/提升/下降」多少。\n- 不得新增人物、不得让人物死而复生、不得改变选项的实质含义。\n- 每个选项的文案不超过十二字，写成动作，不写结果。\n- 只输出 JSON，不要解释。' },
          { role: 'user', content: user }
        ],
        temperature: 1.0,
        max_tokens: 1200,
        response_format: { type: 'json_object' }
      })
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function (data) {
      var raw = data && data.choices && data.choices[0] && data.choices[0].message.content || '';
      var parsed = null;
      try { parsed = JSON.parse(raw); } catch (e) { /* 校验失败，降级 */ }
      var bad = parsed ? validate(parsed, (sc.options || []).length) : '解析失败';
      if (bad) {
        if (typeof console !== 'undefined' && console.warn) console.warn('[ai] 降级：' + bad);
        cb(null); return;
      }
      var out = { story: parsed.story, options: parsed.options };
      cachePut(cacheId, out);
      cb(out);
    }).catch(function (e) {
      clearTimeout(timer);
      if (typeof console !== 'undefined' && console.warn) console.warn('[ai] 请求失败，静默降级：' + e.message);
      if (!proxy && !directFailNotified && typeof console !== 'undefined' && console.warn) {
        directFailNotified = true;
        console.warn('[ai] 直连被拒？可在设置里填代理地址后重试。');
      }
      cb(null);
    });
  }

  global.AI = {
    available: available,
    rewrite: rewrite,
    clearCache: function () { try { global.localStorage.removeItem(CACHE_KEY); } catch (e) { /* 忽略 */ } },
    _store: store,
    _save: save
  };
})(typeof window !== 'undefined' ? window : globalThis);
