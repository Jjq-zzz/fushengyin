/* 界面层：只渲染与转发，一切推演在 engine */
(function () {
  'use strict';

  var D = window.GAME_DATA;
  var $ = function (id) { return document.getElementById(id); };

  var DIM = [
    { key: 'shi', name: '入世进取', glyph: '仕' },
    { key: 'li', name: '谋生逐利', glyph: '利' },
    { key: 'xiu', name: '隐修守心', glyph: '隐' },
    { key: 'yi', name: '仗义行险', glyph: '义' }
  ];
  var ATTR_GLYPH = { ti: '体', cai: '才', qian: '钱', ming: '名', xin: '心' };
  var CN_NUM = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌'];
  /* 结局稀有度印章：依数据里的 pri 分四档 */
  function endingTier(pri) {
    if (pri >= 78) return { label: '极稀', cls: 't1' };
    if (pri >= 67) return { label: '显达', cls: 't2' };
    if (pri >= 53) return { label: '有成', cls: 't3' };
    return { label: '寻常', cls: 't4' };
  }
  /* 场景淡入：切回文档状态后重启动画 */
  function inkIn(el) {
    el.classList.remove('ink-in');
    void el.offsetWidth;
    el.classList.add('ink-in');
  }
  /* v3 · 全局动效降级偏好 */
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* v3 · 打字机：标题行整体出现，正文逐字（单例定时器；被打断时补全剩余文字） */
  var typeTimer = null;
  var typeCtx = null;
  var typeDecode = document.createElement('textarea');
  function typeText(el, html) {
    stopTyping();
    if (reduceMotion || !el) { if (el) el.innerHTML = html; return; }
    var m = html.match(/^((?:<span class="ev-title">[\s\S]*?<\/span>)?)([\s\S]*)$/);
    var head = m[1] || '', body = m[2] || '';
    typeDecode.innerHTML = body;                 // 解码转义实体，避免逐字切断 &quot; 等
    var text = typeDecode.value;
    typeCtx = { el: el, html: html };
    el.innerHTML = head;
    var out = document.createTextNode('');
    el.appendChild(out);
    var i = 0;
    typeTimer = setInterval(function () {
      i += 2;                      // 每次 2 字 ≈ 30 字/秒
      out.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(typeTimer); typeTimer = null; typeCtx = null;
        el.innerHTML = html;       // 打完还原原始 HTML（含实体）
      }
    }, 66);
  }
  function stopTyping() {
    if (typeTimer) { clearInterval(typeTimer); typeTimer = null; }
    if (typeCtx) { typeCtx.el.innerHTML = typeCtx.html; typeCtx = null; }
  }
  var ORIGIN_ORDER = ['huang', 'shi', 'nong', 'jiang', 'shang', 'jun', 'gong', 'yi', 'yue', 'fan', 'dao', 'zui'];
  var ORIGIN_KIND = {
    huang: '宗室', shi: '士族', nong: '耕户', jiang: '将门', shang: '商贾', jun: '军户',
    gong: '匠籍', yi: '医家', yue: '乐籍', fan: '蕃部', dao: '方外', zui: '罪籍'
  };

  var chosen = { dynasty: null, origin: null };
  var lastAttrs = null;

  /* ---------------- 存档 / 图鉴 ---------------- */
  var SAVE_KEY = 'fsy:save:v2';   // 09 起：含 name/gender/bent/alloc，旧 v1 档自然失效
  var DEX_KEY = 'fsy:dex:v1';
  var memStore = {};
  var storageOK = (function () {
    try {
      window.localStorage.setItem('fsy:probe', '1');
      window.localStorage.removeItem('fsy:probe');
      return true;
    } catch (e) { return false; }
  })();

  function storeGet(k) {
    if (storageOK) { try { return window.localStorage.getItem(k); } catch (e) { /* 落到内存 */ } }
    return memStore[k] == null ? null : memStore[k];
  }
  function storeSet(k, v) {
    memStore[k] = v;
    if (storageOK) { try { window.localStorage.setItem(k, v); } catch (e) { /* 配额满则只留内存 */ } }
  }
  function storeDel(k) {
    delete memStore[k];
    if (storageOK) { try { window.localStorage.removeItem(k); } catch (e) { /* 忽略 */ } }
  }

  var CN_D = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  function cnNum(n) {
    n = Math.max(0, Math.floor(n || 0));
    if (n < 10) return CN_D[n];
    if (n < 20) return '十' + (n % 10 ? CN_D[n % 10] : '');
    if (n < 30) return '廿' + (n % 10 ? CN_D[n % 10] : '');
    if (n < 40) return '卅' + (n % 10 ? CN_D[n % 10] : '');
    if (n < 100) return CN_D[Math.floor(n / 10)] + '十' + (n % 10 ? CN_D[n % 10] : '');
    return String(n);
  }
  function plain(o) { var r = {}; for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) r[k] = o[k]; return r; }

  function buildSave() {
    var s = G.state;
    if (!s || s.ending || s.dead) return null;
    return {
      v: 2,
      dynasty: s.dynasty, origin: s.origin,
      name: s.name, gender: s.gender, bent: s.bent, alloc: plain(s.alloc || {}),
      family: JSON.parse(JSON.stringify(s.family || {})),
      estate: JSON.parse(JSON.stringify(s.estate || {})),
      power: s.power || 0, ex: JSON.parse(JSON.stringify(s.ex || {})),
      totalDays: s.totalDays, scene: s.scene,
      loc: s.loc, identity: s.identity,
      attrs: plain(s.attrs), hidden: plain(s.hidden), flags: plain(s.flags),
      npcs: JSON.parse(JSON.stringify(s.npcs || {})),
      seen: plain(s.seen), dimCount: plain(s.dimCount),
      queue: (s.queue || []).slice(),
      offers: JSON.parse(JSON.stringify(s.offers || [])),
      vow: s.vow ? JSON.parse(JSON.stringify(s.vow)) : null,
      fame: plain(s.fame || {}),
      fameOff: s.fameOff || 0,
      omen: s.omen ? plain(s.omen) : null,                              // 23-A1
      peers: s.peers ? JSON.parse(JSON.stringify(s.peers)) : null,      // 23-A2
      nextPeerAge: s.nextPeerAge || null,                               // 23-A2
      history: (s.history || []).slice(-80),
      savedAt: new Date().toISOString()
    };
  }
  function saveGame() {
    var d = buildSave();
    if (!d) return;
    storeSet(SAVE_KEY, JSON.stringify(d));
  }
  function clearSave() { storeDel(SAVE_KEY); }
  function readSave() {
    var raw = storeGet(SAVE_KEY);
    if (!raw) return null;
    var d = null;
    try { d = JSON.parse(raw); } catch (e) { return null; }
    if (!d || !D.dynasties[d.dynasty] || !D.origins[d.origin]) return null;
    return d;
  }
  function saveAge(d) {
    return (D.origins[d.origin].age || 0) + Math.floor((d.totalDays || 0) / 360);
  }

  function readDex() {
    var raw = storeGet(DEX_KEY), d = null;
    try { d = raw ? JSON.parse(raw) : null; } catch (e) { d = null; }
    if (!d || !(d.items instanceof Array)) d = { v: 1, items: [] };
    return d;
  }
  function writeDex(d) { storeSet(DEX_KEY, JSON.stringify(d)); }

  /* 结局总表从数据里取，不写死条数；同名去重 */
  function allEndingNames() {
    var names = [], seen = {};
    function push(e) {
      if (!e || !e.name || seen[e.name]) return;
      seen[e.name] = 1; names.push(e.name);
    }
    (D.endings || []).forEach(push);
    Object.keys(D.dynasties).forEach(function (k) { ((D.dynasties[k] || {}).endings || []).forEach(push); });
    return names;
  }

  function recordDex(e) {
    var d = readDex(), s = G.state, hit = null;
    for (var i = 0; i < d.items.length; i++) if (d.items[i].name === e.name) hit = d.items[i];
    if (hit) {
      hit.count = (hit.count || 1) + 1;
      hit.age = s.age;
      hit.at = new Date().toISOString().slice(0, 10);
    } else {
      d.items.push({
        name: e.name, verdict: e.verdict || '', dynasty: s.dynasty, origin: s.origin,
        age: s.age, at: new Date().toISOString().slice(0, 10), count: 1
      });
    }
    writeDex(d);
    return d;
  }

  function refreshTitle() {
    var btn = $('btn-continue'), hint = $('save-hint');
    var d = readSave();
    if (btn) btn.disabled = !d;
    if (hint) {
      hint.textContent = d
        ? D.dynasties[d.dynasty].name + ' · ' + D.origins[d.origin].name + ' · ' + cnNum(saveAge(d)) + '岁 · 第' + cnNum(d.scene) + '段'
        : '';
    }
    var dexBtn = $('btn-dex');
    if (dexBtn) {
      var got = readDex().items.length;
      dexBtn.textContent = '结 局 图 鉴　已集 ' + got + ' / ' + allEndingNames().length;
    }
    var lh = $('legacy-hint');
    if (lh) {
      var legT = readLegacy();
      lh.textContent = (storageOK && legT.bonus && legT.bonus.type) ? '随身：' + legacyName(legT.bonus.type) : '';
    }
  }

  function continueGame() {
    var d = readSave();
    if (!d) { refreshTitle(); return; }
    G.newGame(d.dynasty, d.origin, { name: d.name, gender: d.gender, bent: d.bent, alloc: d.alloc });
    var s = G.state;
    s.totalDays = d.totalDays || 0;
    s.scene = d.scene || 0;
    s.loc = d.loc || s.loc;
    s.identity = d.identity || s.identity;
    if (d.alloc) s.alloc = plain(d.alloc);
    if (d.family) s.family = JSON.parse(JSON.stringify(d.family));
    if (d.estate) s.estate = JSON.parse(JSON.stringify(d.estate));
    if (d.power != null) s.power = d.power;
    if (d.ex) s.ex = JSON.parse(JSON.stringify(d.ex));
    s.attrs = plain(d.attrs || s.attrs);
    s.hidden = plain(d.hidden || s.hidden);
    s.flags = plain(d.flags || {});
    s.npcs = JSON.parse(JSON.stringify(d.npcs || {}));
    s.seen = plain(d.seen || {});
    s.dimCount = plain(d.dimCount || s.dimCount);
    s.queue = (d.queue || []).slice();
    s.offers = JSON.parse(JSON.stringify(d.offers || []));
    // 续前局必须恢复志向与名望三层，否则“守誓/名望门槛”会静默失效
    s.vow = d.vow ? JSON.parse(JSON.stringify(d.vow)) : null;
    s.fame = plain(d.fame || s.fame);
    s.fameOff = d.fameOff || 0;
    // 23 · 谶语与同侪：旧档没有则静默补齐（老玩家续档不炸，谶可后补）
    s.omen = d.omen ? plain(d.omen) : G.state.omen || null;
    s.peers = d.peers ? JSON.parse(JSON.stringify(d.peers)) : G.state.peers || [];
    s.nextPeerAge = d.nextPeerAge || (s.age + 10);
    s.history = (d.history || []).slice();
    G.refreshClock(s);

    chosen = { dynasty: d.dynasty, origin: d.origin };
    lastAttrs = null;
    $('log-list').innerHTML = '';
    s.history.forEach(addLog);
    show('screen-play');
    renderPanel();
    renderScene(G.next());
  }

  function openDex() {
    var d = readDex(), names = allEndingNames(), got = {}, i;
    for (i = 0; i < d.items.length; i++) got[d.items[i].name] = d.items[i];
    var priOf = {};
    (D.endings || []).forEach(function (e) { if (e && e.name) priOf[e.name] = e.pri; });
    Object.keys(D.dynasties).forEach(function (k) {
      ((D.dynasties[k] || {}).endings || []).forEach(function (e) { if (e && e.name) priOf[e.name] = e.pri; });
    });
    var pct = names.length ? Math.round(d.items.length / names.length * 100) : 0;
    var bar = $('dex-progress');
    if (bar) {
      bar.innerHTML = '<div class="dex-bar"><i style="width:' + pct + '%"></i></div>' +
        '已集 ' + d.items.length + ' / ' + names.length + '　' + pct + '%';
    }
    var body = $('overlay-dex-body');
    if (body) {
      body.innerHTML = '';
      names.forEach(function (n) {
        var el = document.createElement('div');
        var it = got[n];
        if (it) {
          el.className = 'dex-item got';
          var dyn = D.dynasties[it.dynasty], org = D.origins[it.origin];
          el.innerHTML = '<div class="dex-name">' + escapeHtml(n) + '</div>' +
            '<div class="dex-verdict">' + escapeHtml(it.verdict || '') + '</div>' +
            '<div class="dex-meta">' + (dyn ? dyn.name : '') + ' · ' + (org ? org.name : '') +
            ' · ' + (it.age || 0) + '岁' + (it.count > 1 ? '　×' + it.count : '') + '</div>' +
            '<span class="seal dex-tier ' + endingTier(priOf[n]).cls + '">' + endingTier(priOf[n]).label + '</span>';
        } else {
          el.className = 'dex-item locked';
          el.innerHTML = '<div class="dex-name">？？？</div><div class="dex-verdict">尚未走到</div>';
        }
        body.appendChild(el);
      });
    }
    $('overlay-dex').classList.add('show');
  }


  /* ---------------- 15 · 多周目遗泽 ---------------- */
  var LEGACY_KEY = 'fsy:legacy:v1';
  var LEGACY_DEFS = [
    { type: 'shu', name: '旧书一箧', note: '开局才学＋6' },
    { type: 'yin', name: '旧银一锭', note: '开局银钱＋6' },
    { type: 'ti', name: '一身体魄', note: '开局体魄＋6' },
    { type: 'sheng', name: '家　声', note: '开局名望＋5 · 解锁「家声」事' },
    { type: 'xin', name: '故人旧信', note: '开局便有一位故人' }
  ];
  function readLegacy() {
    var raw = storeGet(LEGACY_KEY), d = null;
    try { d = raw ? JSON.parse(raw) : null; } catch (e) { d = null; }
    if (!d || typeof d.runs !== 'number') d = { v: 1, runs: 0, points: 0, items: [], bonus: null };
    return d;
  }
  function writeLegacy(l) { storeSet(LEGACY_KEY, JSON.stringify(l)); }
  function legacyName(type) {
    for (var i = 0; i < LEGACY_DEFS.length; i++) if (LEGACY_DEFS[i].type === type) return LEGACY_DEFS[i].name;
    return '';
  }

  var pendingLegacy = null;
  function renderLegacyBlock() {
    var sec = $('legacy-block');
    if (!sec) return;
    var pts = $('legacy-points'), list = $('legacy-list'), btn = $('btn-legacy-confirm');
    if (!storageOK) {
      sec.style.display = '';
      pts.textContent = '此机不记旧事——遗泽需浏览器存储，眼下记不下。';
      list.innerHTML = '';
      btn.style.display = 'none';
      return;
    }
    var leg = readLegacy();
    sec.style.display = '';
    pts.textContent = '此生是你第 ' + leg.runs + ' 世。遗泽点 ' + leg.points + '（每两世得一点，至多三点）。';
    list.innerHTML = '';
    pendingLegacy = null;
    btn.style.display = 'none';
    if (leg.points <= 0) {
      var none = document.createElement('div');
      none.className = 'legacy-none';
      none.textContent = '尚无遗泽点可领。';
      list.appendChild(none);
      return;
    }
    LEGACY_DEFS.forEach(function (d) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'bent-btn';
      el.innerHTML = '<span class="bn">' + d.name + '</span><span class="bnote">' + d.note + '</span>';
      el.onclick = function () {
        pendingLegacy = d.type;
        var kids = list.querySelectorAll ? list.querySelectorAll('.bent-btn') : [];
        for (var i = 0; i < kids.length; i++) kids[i].classList.remove('sel');
        el.classList.add('sel');
        btn.style.display = '';
        btn.textContent = '带 着 ' + d.name + ' 转 世';
      };
      list.appendChild(el);
    });
    btn.onclick = function () {
      if (!pendingLegacy) return;
      var leg2 = readLegacy();
      leg2.points -= 1;
      leg2.bonus = { type: pendingLegacy };
      if (leg2.items.indexOf(legacyName(pendingLegacy)) < 0) leg2.items.push(legacyName(pendingLegacy));
      writeLegacy(leg2);
      pendingLegacy = null;
      sec.style.display = 'none';
      refreshTitle();
    };
  }

  /* ---------------- 屏切换 ---------------- */
  function show(id) {
    var cur = document.querySelector('.screen.active');
    if (cur && cur.id !== id && !reduceMotion) {
      cur.classList.add('leaving');
      var old = cur;
      setTimeout(function () { old.classList.remove('leaving'); old.classList.remove('active'); }, 200);
    } else {
      var nodes = document.querySelectorAll('.screen');
      for (var i = 0; i < nodes.length; i++) nodes[i].classList.remove('active');
    }
    $(id).classList.add('active');
    $(id).scrollTop = 0;
  }

  /* ---------------- 择朝 ---------------- */
  function buildDynasty() {
    var grid = $('dynasty-grid');
    grid.innerHTML = '';
    var reg = D.registry || { groups: [{ id: 'all', name: '诸 朝', dyn: Object.keys(D.dynasties) }], dyn: {} };
    reg.groups.forEach(function (g) {
      var row = document.createElement('div');
      row.className = 'dyn-group';
      var head = document.createElement('div');
      head.className = 'dyn-group-head';
      head.innerHTML = '<span>' + g.name + '</span><i></i>';
      row.appendChild(head);
      var cells = document.createElement('div');
      cells.className = 'dyn-cells';
      g.dyn.forEach(function (id) {
        var d = D.dynasties[id];
        if (!d) return;
        var meta = reg.dyn[id] || {};
        var el = document.createElement('button');
        el.className = 'card dyn-card corners dyn-card-sm';
        el.innerHTML = '<div class="dyn-water" aria-hidden="true">' + d.name + '</div>' +
          '<div class="dyn-top"><span class="seal dyn-seal">' + d.name + '</span>' +
          '<div><div class="card-name">' + d.name + '</div>' +
          '<div class="card-en">' + (meta.exam === 'keju' ? '科举' : meta.exam === 'chaju' ? '察举' : '无考') + '</div></div></div>' +
          '<div class="dyn-line">' + (meta.line || '') + '</div>' +
          '<div class="dyn-tags">' + (meta.tags || []).map(function (t) {
            return '<span>' + t + '</span>';
          }).join('') + '</div>';
        el.onclick = function () {
          chosen.dynasty = id;
          buildOrigin();
          show('screen-origin');
        };
        cells.appendChild(el);
      });
      row.appendChild(cells);
      grid.appendChild(row);
    });
  }

  /* ---------------- 择身 ---------------- */
  /* ---------------- 09 · 捏人 ---------------- */
  var create = { gender: 'm', alloc: {}, bent: null, vow: null };
  var VOW_DEFS = [
    { id: 'ming', name: '扬 名', note: '我要这世上有人记得我的名字', dim: '入世' },
    { id: 'fu', name: '致 富', note: '我不要再让家里数着米粒下锅', dim: '逐利' },
    { id: 'shou', name: '守 心', note: '我不要活成自己看不起的那种人', dim: '守心' },
    { id: 'kuai', name: '快 意', note: '我这一生，要痛快', dim: '行险' }
  ];
  var BENT_DEFS = [
    { id: 'ji', name: '性急', note: '执念与气运皆涨' },
    { id: 'gua', name: '寡言', note: '心性坚，名望淡' },
    { id: 'min', name: '机敏', note: '气运旺，阴德折' },
    { id: 'ren', name: '仁厚', note: '阴德厚，银钱薄' }
  ];
  var ATTR_CN = { ti: '体魄', cai: '才学', qian: '银钱', ming: '名望', xin: '心性' };

  function resetCreate() {
    create = { gender: 'm', alloc: {}, bent: null, vow: null };
    G.ATTR_KEYS.forEach(function (k) { create.alloc[k] = 0; });
    var input = $('create-name');
    if (input) input.value = '';
  }
  function pointsLeft() {
    var used = 0;
    G.ATTR_KEYS.forEach(function (k) { used += create.alloc[k]; });
    return 6 - used;
  }
  function renderCreate() {
    var box = $('create-points');
    if (!box) return;
    box.innerHTML = '';
    G.ATTR_KEYS.forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pt-row' + (pointsLeft() <= 0 ? ' dim' : '');
      b.innerHTML = '<span class="pt-name">' + ATTR_CN[k] + '</span>' +
        '<span class="pt-dots">' + '●'.repeat(create.alloc[k]) + '○'.repeat(3 - create.alloc[k]) + '</span>';
      b.onclick = function () {
        if (pointsLeft() <= 0 || create.alloc[k] >= 3) return;
        create.alloc[k]++;
        renderCreate();
      };
      box.appendChild(b);
    });
    var hint = $('create-attr-hint');
    if (hint) hint.textContent = attrHintText();
    var bents = $('create-bent-list');
    if (bents) {
      bents.innerHTML = '';
      BENT_DEFS.forEach(function (b) {
        var el = document.createElement('button');
        el.type = 'button';
        el.className = 'bent-btn' + (create.bent === b.id ? ' sel' : '');
        el.innerHTML = '<span class="bn">' + b.name + '</span><span class="bnote">' + b.note + '</span>';
        el.onclick = function () { create.bent = create.bent === b.id ? null : b.id; renderCreate(); };
        bents.appendChild(el);
      });
    }
    var gm = $('create-gender-m'), gf = $('create-gender-f');
    if (gm) gm.className = 'btn-gender' + (create.gender === 'm' ? ' sel' : '');
    if (gf) gf.className = 'btn-gender' + (create.gender === 'f' ? ' sel' : '');
    // 11 · 立誓（可选，不选则侧栏无志）
    var vows = $('vow-list');
    if (vows) {
      vows.innerHTML = '';
      VOW_DEFS.forEach(function (v) {
        var el = document.createElement('button');
        el.type = 'button';
        el.id = 'vow-' + v.id;
        el.className = 'bent-btn' + (create.vow === v.id ? ' sel' : '');
        el.innerHTML = '<span class="bn">' + v.name + '</span><span class="bnote">' + v.note + '（偏' + v.dim + '）</span>';
        el.onclick = function () { create.vow = create.vow === v.id ? null : v.id; renderCreate(); };
        vows.appendChild(el);
      });
      var none = document.createElement('button');
      none.type = 'button';
      none.id = 'vow-none';
      none.className = 'bent-btn' + (create.vow ? '' : ' sel');
      none.innerHTML = '<span class="bn">不 立 誓</span><span class="bnote">未必人人少年时都说过什么</span>';
      none.onclick = function () { create.vow = null; renderCreate(); };
      vows.appendChild(none);
    }
  }
  function attrHintText() {
    var left = pointsLeft();
    var sorted = G.ATTR_KEYS.slice().sort(function (a, b) { return create.alloc[b] - create.alloc[a]; });
    var top = sorted.slice(0, 2).map(function (k) { return ATTR_CN[k]; });
    var bent = create.bent ? (BENT_DEFS.filter(function (b) { return b.id === create.bent; })[0] || {}).name : '';
    var core = top[0] === top[1] ? '一身' + top[0] : '以' + top[0] + '为骨、以' + top[1] + '为用';
    return '你将成为' + (bent ? bent + '之人，' : '一个人，') + core + '。' + (left > 0 ? '（余 ' + left + ' 点）' : '（点数已投满）');
  }

  function buildOrigin() {
    var grid = $('origin-grid');
    grid.innerHTML = '';
    resetCreate();
    var order = ORIGIN_ORDER;
    order.forEach(function (id) {
      var o = D.origins[id];
      if (!o) return;
      var el = document.createElement('button');
      el.className = 'card origin-card corners';
      var good = (o.advantages || []).map(function (t) {
        return '<div class="org-tag good"><span class="mark">利</span><span>' + t + '</span></div>';
      }).join('');
      var bad = (o.shackles || []).map(function (t) {
        return '<div class="org-tag bad"><span class="mark">枷</span><span>' + t + '</span></div>';
      }).join('');
      el.innerHTML =
        '<div class="org-head"><span class="org-name">' + o.name + '</span>' +
        '<span class="org-kind">' + (ORIGIN_KIND[id] || '') + '</span></div>' +
        '<div class="org-intro">' + shorten(o.intro, 64) + examNoteFor(id) + '</div>' +
        '<div class="org-tags">' + good + bad + '</div>';
      el.onclick = function () {
        // 09：出身卡只选定，不再直接开局；选「入世」才落场
        chosen.origin = id;
        var cards = grid.querySelectorAll ? grid.querySelectorAll('.origin-card') : [];
        for (var i = 0; i < cards.length; i++) cards[i].classList.remove('sel');
        el.classList.add('sel');
      };
      grid.appendChild(el);
    });
    renderCreate();
  }

  /* 17 · 朝代选官制度提示（士族/耕户） */
  function examNoteFor(id) {
    if (id !== 'shi' && id !== 'nong') return '';
    var reg = D.registry && D.registry.dyn && D.registry.dyn[chosen.dynasty];
    var exam = reg ? reg.exam : 'none';
    return D.examNote && D.examNote[exam] ? '<br><span class="org-exnote">' + D.examNote[exam] + '</span>' : '';
  }

  function shorten(s, n) {
    if (!s) return '';
    var t = String(s).replace(/\n/g, ' ');
    return t.length > n ? t.slice(0, n) + '…' : t;
  }

  /* ---------------- 开局 ---------------- */
  function startGame(opts) {
    opts = opts || {};
    // 09 · 余点自动投入当前最低的属性，不弹窗拦人：
    //     为可测试性（无头脚本不会补投）与新手体验（漏投不阻塞）做的取舍
    var left = pointsLeft();
    while (left-- > 0) {
      var lowest = G.ATTR_KEYS.slice().sort(function (a, b) { return create.alloc[a] - create.alloc[b]; })[0];
      create.alloc[lowest]++;
    }
    var input = $('create-name');
    var name = (opts.name || (input && input.value ? input.value : '')).trim().slice(0, 4);
    var legCarry = storageOK ? readLegacy().bonus : null;
    G.newGame(chosen.dynasty, chosen.origin, {
      name: name || undefined,
      gender: opts.gender || create.gender,
      bent: create.bent || undefined,
      alloc: create.alloc,
      vow: create.vow || undefined,
      legacy: legCarry || undefined
    });
    if (storageOK) {             // 15 · 遗泽用完即清（items 保留作纪念）
      var legNow = readLegacy();
      legNow.bonus = null;
      writeLegacy(legNow);
    }
    clearSave();
    lastAttrs = null;
    $('log-list').innerHTML = '';
    show('screen-play');
    renderPanel();
    var first = G.next();
    renderScene(first);
  }

  /* ---------------- 侧栏 ---------------- */
  function renderPanel() {
    var s = G.state;
    var org = D.origins[s.origin];
    var dyn = D.dynasties[s.dynasty];

    $('id-identity').textContent = s.identity || '—';
    $('id-origin').textContent = dyn.name + ' · ' + org.name;
    $('id-stage').textContent = G.stageName(s.age) + ' · ' + s.age + ' 岁';
    var powEl = $('id-power');
    if (powEl) {
      var PW = ['白衣', '小吏', '小吏', '入流', '入流', '要职', '要职', '权柄', '权柄', '一手遮天'];
      powEl.textContent = '势 · ' + (PW[Math.min(9, G.state.power || 0)]);
    }
    /* 23-A1 · 谶语：开局一句，整局不再提示，只静静挂在身世栏 */
    var omenEl = $('id-omen');
    if (omenEl) {
      omenEl.textContent = s.omen && s.omen.text ? '谶 · ' + s.omen.text : '';
      omenEl.style.display = s.omen && s.omen.text ? '' : 'none';
    }
    var vowEl = $('id-vow');
    if (vowEl) {
      var VOW_CN = { ming: '扬名', fu: '致富', shou: '守心', kuai: '快意' };
      vowEl.textContent = s.vow
        ? '志 · ' + VOW_CN[s.vow.id] + (s.vow.broken ? ' · 违' : (s.vow.kept ? ' · 守' : ''))
        : '';
      vowEl.style.display = s.vow ? '' : 'none';
    }

    var list = $('attr-list');
    list.innerHTML = '';
    G.ATTR_KEYS.forEach(function (k) {
      var meta = G.ATTR_META[k];
      var v = s.attrs[k];
      var row = document.createElement('div');
      row.className = 'attr-row';
      var delta = '';
      if (lastAttrs && lastAttrs[k] != null) {
        var d = v - lastAttrs[k];
        if (d > 0) { row.classList.add('up'); delta = '<span class="attr-delta">＋' + d + '</span>'; }
        else if (d < 0) { row.classList.add('down'); delta = '<span class="attr-delta">－' + Math.abs(d) + '</span>'; }
      }
      row.innerHTML =
        '<span class="seal attr-icon" title="' + (meta.desc || '') + '">' + (ATTR_GLYPH[k] || '') + '</span>' +
        '<div class="attr-head"><span class="attr-name">' + meta.name + '</span>' +
        '<span class="attr-val">' + v + delta + '</span></div>' +
        '<div class="attr-bar"><i class="attr-fill" style="width:' + v + '%"></i></div>';
      list.appendChild(row);
      // 10 · 名望三层细条（只示意，不显示数值）
      if (k === 'ming' && s.fame) {
        var fb = document.createElement('div');
        fb.className = 'fame-bars';
        [['xiang', '乡里', '孝义可风'], ['zhou', '州郡', '士林有声'], ['chao', '朝堂', '简在帝心']].forEach(function (f) {
          var fr = document.createElement('div');
          fr.className = 'fame-row';
          fr.title = f[2];
          fr.innerHTML = '<span class="fk">' + f[1] + '</span>' +
            '<span class="fbar"><i style="width:' + (s.fame[f[0]] || 0) + '%"></i></span>';
          fb.appendChild(fr);
        });
        list.appendChild(fb);
      }
    });

    var dims = $('dim-list');
    dims.innerHTML = '';
    DIM.forEach(function (d) {
      var el = document.createElement('div');
      el.className = 'dim-item';
      el.innerHTML = '<span class="seal g">' + d.glyph + '</span>' +
        '<span class="dn">' + d.name + '</span>' +
        '<span class="n">' + (s.dimCount[d.key] || 0) + '</span>';
      dims.appendChild(el);
    });

    renderBonds(s);

    var ts = $('time-stamp');
    var hs = G.header();
    ts.textContent = '【时序：' + hs.time + '】';
    $('loc-stamp').textContent = '【地点：' + hs.loc + '】';
  }

  /* ---------------- 故人 ---------------- */
  function bondLabel(n) {
    if (n.alive === false) return '已殁';
    var r = n.rel || 0;
    if (r >= 60) return '生死之交';
    if (r >= 35) return '故交';
    if (r >= 12) return '相识';
    if (r > -12) return '泛泛';
    if (r > -35) return '有隙';
    return '仇怨';
  }

  var curNpc = null;

  function renderBonds(s) {
    var box = $('bond-list');
    if (!box) return;
    box.innerHTML = '';
    var list = Object.keys(s.npcs || {}).map(function (k) {
      var n = s.npcs[k];
      return { key: k, name: n.name || k, rel: n.rel || 0, alive: n.alive !== false,
        met: n.met || 0, opinion: n.opinion || 0, title: n.title || '' };
    }).filter(function (n) {
      return n.rel !== 0 || n.alive === false || n.met > 0 || n.opinion !== 0;
    }).sort(function (a, b) { return Math.abs(b.rel) - Math.abs(a.rel); }).slice(0, 7);

    if (!list.length) {
      var empty = document.createElement('div');
      empty.className = 'bond-tag';
      empty.textContent = '尚无可记之人';
      box.appendChild(empty);
      return;
    }
    list.forEach(function (n) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'bond-item' + (n.alive === false ? ' dead' : (n.rel <= -35 ? ' enemy' : (n.rel >= 35 ? ' close' : '')));
      el.setAttribute ? el.setAttribute('data-id', n.key) : (el.dataset.id = n.key);
      el.title = n.title ? n.name + ' · ' + n.title : n.name;
      el.innerHTML = '<span class="bond-name">' + escapeHtml(n.name) + '</span>' +
        '<span class="bond-tag">' + bondLabel(n) + '</span>';
      el.onclick = function () { openNpc(n.key); };
      box.appendChild(el);
    });
  }

  /* ---------------- 08 · 人物档弹层：表里两层 ---------------- */
  var VEIL = '未 曾 细 看';
  function npcDetail(id) {
    var s = G.state;
    var n = s.npcs[id];
    if (!n) return null;
    var rev = n.revealed || { traits: [], opinion: false, secret: false };
    var stage = Math.floor(s.age / 10);
    var observed = !!s.flags['_obs_' + id + '_' + stage];
    var html = '<div class="npc-row"><span class="npc-k">身　份</span><span class="npc-v">' +
      escapeHtml(n.title || n.note || '来历不明') + '</span></div>' +
      '<div class="npc-row"><span class="npc-k">初　见</span><span class="npc-v">' +
      (n.age != null ? n.age + ' 岁' : '记不清了') + '</span></div>' +
      '<div class="npc-row"><span class="npc-k">往　来</span><span class="npc-v">见过 ' + (n.met || 0) + ' 面</span></div>' +
      '<div class="npc-row"><span class="npc-k">你对他</span><span class="npc-v">' + bondLabel(n) + '</span></div>';

    html += '<div class="npc-sect">其 人 其 性</div>';
    html += (rev.traits && rev.traits.length)
      ? '<div class="npc-traits">' + rev.traits.map(function (t) { return '<span class="chip">' + escapeHtml(t) + '</span>'; }).join('') + '</div>'
      : '<div class="npc-veil">' + VEIL + '</div>';

    html += '<div class="npc-sect">他 眼 中 的 你</div>';
    html += rev.opinion
      ? '<div class="npc-op">' + escapeHtml(rev.opinionLevel || '') + '</div>'
      : '<div class="npc-veil">' + VEIL + '</div>';

    html += '<div class="npc-sect">把　柄</div><div id="npc-secret-block">';
    html += (rev.secret && n.secret)
      ? '<div class="npc-secret">' + escapeHtml(n.secret) + '</div>'
      : '<div class="npc-veil">' + VEIL + '</div>';
    html += '</div>';

    if (n.history && n.history.length) {
      html += '<div class="npc-sect">往 事 记</div>';
      n.history.forEach(function (h) {
        html += '<div class="npc-hist"><span class="npc-hage">' + h.age + '岁</span>' + escapeHtml(h.text) + '</div>';
      });
    }
    return { html: html, n: n, observed: observed };
  }

  function openNpc(id) {
    var d = npcDetail(id);
    if (!d) return;
    curNpc = id;
    $('overlay-npc-title').textContent = d.n.name;
    $('overlay-npc-body').innerHTML = d.html;
    var btn = $('btn-observe');
    btn.disabled = d.observed || d.n.alive === false;
    btn.textContent = d.observed ? '已 观 过' : '观 人';
    $('overlay-npc').classList.add('show');
  }

  function doObserve() {
    if (!curNpc) return;
    var r = G.observe(curNpc);
    if (!r.ok) {
      var b = $('btn-observe');
      b.textContent = r.reason || '观 不 成';
      b.disabled = true;
      return;
    }
    var d = npcDetail(curNpc);
    if (d) {
      $('overlay-npc-body').innerHTML = '<div class="npc-result">' + escapeHtml(r.text) + '</div>' + d.html;
      var btn = $('btn-observe');
      btn.disabled = d.observed;
      btn.textContent = d.observed ? '已 观 过' : '观 人';
    }
    var hs = G.header();
    $('time-stamp').textContent = '【时序：' + hs.time + '】';
    $('loc-stamp').textContent = '【地点：' + hs.loc + '】';
    renderBonds(G.state);
  }

  /* ---------------- 12 · 悬案条 ---------------- */
  function renderOffers() {
    var strip = $('offer-strip');
    if (!strip) return;
    var offers = (G.state && G.state.offers) || [];
    if (!offers.length) { strip.style.display = 'none'; strip.innerHTML = ''; return; }
    strip.style.display = '';
    strip.innerHTML = '<span class="os-label">未 决</span>';
    offers.forEach(function (o) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'offer-item' + (o.left <= 1 ? ' urgent' : '');
      el.title = '点此回去处理';
      el.innerHTML = '<span class="os-short">' + escapeHtml(o.short) + '</span>' +
        '<span class="os-dots">' + '●'.repeat(Math.max(0, o.left)) + '○'.repeat(o.ttl - Math.max(0, o.left)) + '</span>';
      el.onclick = function () {
        var sc = G.takeOffer(o.id);
        if (sc) renderScene(sc);
        renderOffers();
      };
      strip.appendChild(el);
    });
  }


  /* ---------------- 16 · 关系网（纯 SVG 圆环，只读） ---------------- */
  var WEB_IDS = ['li', 'shen', 'pei', 'yan', 'ahe', 'xu'];
  var WEB_NAMES = { li: '李慕之', shen: '沈九娘', pei: '裴敬', yan: '严七', ahe: '阿禾', xu: '徐翁' };
  function openWeb() {
    var body = $('overlay-web-body');
    if (!body) return;
    var s = G.state;
    if (!s) { body.innerHTML = '<div class="review-line">尚未入世。</div>'; $('overlay-web').classList.add('show'); return; }
    var web = D.npcWeb || {};
    var W = 440, H = 330, cx = W / 2, cy = H / 2, R = 118;
    var pos = {};
    WEB_IDS.forEach(function (id, i) {
      var ang = Math.PI * 2 * i / WEB_IDS.length - Math.PI / 2;
      pos[id] = { x: cx + Math.cos(ang) * R, y: cy + Math.sin(ang) * R * 0.82 };
    });
    var svg = '<svg class="web-svg" viewBox="0 0 ' + W + ' ' + H + '" width="100%">';
    // 边：每对只画一次
    Object.keys(web).forEach(function (a) {
      Object.keys(web[a]).forEach(function (b) {
        if (a >= b) return;
        var v = web[a][b];
        var pa = pos[a], pb = pos[b];
        if (!pa || !pb) return;
        var w = 1 + Math.abs(v) / 22;
        var col = v > 0 ? 'rgba(74,66,56,.7)' : 'rgba(163,52,42,.6)';
        svg += '<line x1="' + pa.x.toFixed(1) + '" y1="' + pa.y.toFixed(1) + '" x2="' + pb.x.toFixed(1) + '" y2="' + pb.y.toFixed(1) +
          '" stroke="' + col + '" stroke-width="' + w.toFixed(1) + '"' + (v < 0 ? ' stroke-dasharray="4 3"' : '') + '/>';
      });
    });
    // 中心：你
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="24" fill="#a3342a"/>' +
      '<text x="' + cx + '" y="' + (cy + 5) + '" text-anchor="middle" class="web-you">你</text>';
    // 节点
    WEB_IDS.forEach(function (id) {
      var p = pos[id];
      var n = s.npcs[id];
      var known = n && (n.met > 0 || (n.rel || 0) !== 0 || n.alive === false);
      var dead = n && n.alive === false;
      var label = known ? (n.name || WEB_NAMES[id]) : WEB_NAMES[id];
      var tag = known ? bondLabel(n) : '未识';
      svg += '<g class="web-node' + (known ? '' : ' unknown') + (dead ? ' dead' : '') + '" data-id="' + id + '">' +
        '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="21" fill="#f7f1e4" stroke="' +
        (dead ? 'rgba(31,27,22,.3)' : 'rgba(31,27,22,.45)') + '" stroke-width="1.5"' + (dead ? ' stroke-dasharray="3 3"' : '') + '/>' +
        '<text x="' + p.x.toFixed(1) + '" y="' + (p.y + 4).toFixed(1) + '" text-anchor="middle" class="web-name">' + escapeHtml(label) + '</text>' +
        '<text x="' + p.x.toFixed(1) + '" y="' + (p.y + 36).toFixed(1) + '" text-anchor="middle" class="web-tag">' + tag + '</text></g>';
    });
    svg += '</svg>';
    body.innerHTML = svg;
    var nodes = body.querySelectorAll ? body.querySelectorAll('.web-node') : [];
    for (var i = 0; i < nodes.length; i++) {
      (function (node) {
        node.addEventListener('click', function () {
          var id = node.getAttribute('data-id');
          $('overlay-web').classList.remove('show');
          openNpc(id);
        });
      })(nodes[i]);
    }
    $('overlay-web').classList.add('show');
  }

  /* ---------------- 场景 ---------------- */
  function renderScene(sc) {
    if (!sc) return;
    if (sc.ending) { renderEnding(sc); return; }

    lastAttrs = null;
    var s = G.state;

    $('result-block').classList.remove('show');
    $('result-block').textContent = '';

    var html = '';
    if (sc.title) html += '<span class="ev-title">' + sc.title + '</span>';
    html += escapeHtml(sc.story || '');
    var storyEl = $('story-text');
    typeText(storyEl, html);

    $('choice-head').textContent = '可 选 抉 择';
    var box = $('choices');
    box.innerHTML = '';

    if (sc.quiet) {
      var b = document.createElement('button');
      b.className = 'choice';
      b.style.animationDelay = '.1s';
      var qNum = sc.quietLabel === '掩 卷' ? '掩' : '岁';
      b.innerHTML = '<span class="choice-num">' + qNum + '</span><span class="choice-text">' +
        escapeHtml(sc.quietLabel || '任其流逝') + '</span>' +
        '<span class="choice-span">' + (sc.quietLabel === '掩 卷' ? '同侪已远，各安天命' : '岁月自流') + '</span>';
      b.onclick = function () {
        renderScene(G.next());
      };
      box.appendChild(b);
    } else {
      (sc.options || []).forEach(function (o, i) {
        var b = document.createElement('button');
        b.className = 'choice';
        b.style.animationDelay = (i * 0.07 + 0.1) + 's';
        b.innerHTML = '<span class="choice-num">' + (CN_NUM[i] || (i + 1)) + '</span>' +
          '<span class="choice-text">' + escapeHtml(o.t) + '</span>' +
          (o.span ? '<span class="choice-span">' + o.span + '</span>' : '');
        b.onclick = function () { pick(o.idx); };
        box.appendChild(b);
      });
    }

    if (sc.header) {
      $('time-stamp').textContent = '【时序：' + sc.header.time + '】';
      $('loc-stamp').textContent = '【地点：' + sc.header.loc + '】';
    }
    renderPanel();
    $('story-text').parentElement.scrollTop = 0;
    inkIn(storyEl);
    renderOffers();
    // 18 · AI 叙事层：请求期间正文显示原文，成功后替换；失败静默
    if (typeof AI !== 'undefined' && AI.available() && sc && sc.options) {
      var s0 = G.state;
      AI.rewrite(sc, {
        dynasty: D.dynasties[s0.dynasty] ? D.dynasties[s0.dynasty].name : '',
        time: sc.header ? sc.header.time : '', loc: s0.loc || '',
        identity: s0.identity || '', gender: s0.gender === 'f' ? '女' : '男',
        age: s0.age, scene: s0.scene,
        npcs: Object.keys(s0.npcs || {}).map(function (k) { return s0.npcs[k].name; }).slice(0, 4)
      }, function (out) {
        if (!out) return;
        var el = $('story-text');
        if (!el || !el.classList.contains('ink-in') && !sc.options) return;
        var scNow = G.state._ev;
        if (!scNow || scNow.id !== sc.id) return;   // 场景已切换则放弃
        typeText(el, (sc.title ? '<span class="ev-title">' + escapeHtml(sc.title) + '</span>' : '') + escapeHtml(out.story));
        var btns = $('choices').querySelectorAll ? $('choices').querySelectorAll('.choice-text') : [];
        for (var i = 0; i < btns.length && i < out.options.length; i++) btns[i].textContent = out.options[i];
      });
    }
  }

  function pick(idx) {
    stopTyping();
    var before = snapshot();
    var r = G.choose(idx);
    if (!r) return;
    if (r.ending) { renderEnding(r.ending); return; }
    // 结算已定、下一场未出：此刻落盘，关掉页面也能从这一抉择之后接着走
    saveGame();
    lastAttrs = before;
    renderPanel();
    renderOffers();

    var rb = $('result-block');
    rb.classList.add('show');
    var chips = '';
    var deltas = [];
    G.ATTR_KEYS.forEach(function (k) {
      var d = G.state.attrs[k] - (before[k] || 0);
      if (!d) return;
      chips += '<span class="rb-delta ' + (d > 0 ? 'up' : 'down') + '">' +
        G.ATTR_META[k].name + (d > 0 ? ' ＋' : ' －') + Math.abs(d) + '</span>';
      deltas.push({ name: G.ATTR_META[k].name, d: d });
    });
    rb.innerHTML =
      (r.elapsed ? '<span class="rb-elapsed">此去 ' + escapeHtml(r.elapsed) + '</span>' : '') +
      '<div class="rb-text">' + escapeHtml(r.result || '') + '</div>' +
      (chips ? '<div class="rb-deltas">' + chips + '</div>' : '');
    /* v3 · 数值飘字 */
    deltas.forEach(function (dc, i) {
      var f = document.createElement('span');
      f.className = 'float-chip' + (dc.d > 0 ? ' up' : ' down');
      f.textContent = dc.name + (dc.d > 0 ? ' ＋' : ' －') + Math.abs(dc.d);
      f.style.left = (20 + i * 64) + 'px';
      f.style.animationDelay = (0.1 + i * 0.12) + 's';
      rb.appendChild(f);
    });

    $('choices').innerHTML = '';
    $('choice-head').textContent = '续 行';

    var cont = document.createElement('button');
    cont.className = 'choice go';
    cont.innerHTML = '<span class="choice-num">继</span><span class="choice-text">续 行</span>';
    cont.onclick = function () {
      var n = G.next();
      renderScene(n);
    };
    $('choices').appendChild(cont);

    addLog(G.state.history[G.state.history.length - 1]);
    rb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function snapshot() {
    var a = {};
    G.ATTR_KEYS.forEach(function (k) { a[k] = G.state.attrs[k]; });
    return a;
  }

  function addLog(h) {
    if (!h) return;
    var list = $('log-list');
    var el = document.createElement('div');
    el.className = 'log-item';
    el.innerHTML = '<span class="lt">' + h.age + '岁 · ' + escapeHtml(h.time) + '</span>' +
      '<span class="lc">' + escapeHtml(h.choice) + (h.note ? '\n' + escapeHtml(h.note) : '') + '</span>';
    list.appendChild(el);
    list.scrollTop = list.scrollHeight;
  }

  /* ---------------- 结局 ---------------- */
  function renderEnding(r) {
    var e = r.data || {};
    clearSave();                 // 一局已了，旧档作废
    var dexCountBefore = readDex().items.length;
    var dex = recordDex(e);      // 图鉴跨局留存
    if (storageOK) {             // 15 · 遗泽：局数与点数（每两世一点；新结局另加一点；上限三点）
      var leg = readLegacy();
      leg.runs += 1;
      if (leg.runs % 2 === 0) leg.points = Math.min(3, leg.points + 1);
      if (dex.items.length > dexCountBefore) leg.points = Math.min(3, leg.points + 1);
      writeLegacy(leg);
    }
    $('ending-name').textContent = e.name || '泯然众人';
    var tierEl = $('ending-tier');
    if (tierEl) {
      var tier = endingTier(e.pri);
      tierEl.className = 'seal ending-tier ' + tier.cls;
      tierEl.textContent = tier.label;
      tierEl.style.animation = 'none';
      void tierEl.offsetWidth;
      tierEl.style.animation = '';
    }
    $('ending-dex').textContent = '此局已记入图鉴 ' + dex.items.length + ' / ' + allEndingNames().length;
    $('ending-verdict').textContent = e.verdict || '一生无甚可书。';
    $('ending-epilogue').textContent = e.epilogue || '';

    var rev = $('ending-review');
    rev.innerHTML = '';
    (r.review && r.review.lines || []).forEach(function (l) {
      var el = document.createElement('div');
      el.className = 'review-line';
      el.textContent = l;
      rev.appendChild(el);
    });

    /* 23-A6 · 口述史：老年重放三段记忆 */
    var rcSec = $('ending-recall-section'), rcEl = $('ending-recall');
    if (rcSec && rcEl) {
      var rcs = r.recollections || [];
      if (rcs.length) {
        rcEl.innerHTML = '';
        rcs.forEach(function (rc) {
          var el = document.createElement('div');
          el.className = 'recall-item';
          el.innerHTML =
            '<div class="recall-head"><span class="recall-age">' + rc.age + '岁 · ' + escapeHtml(rc.time || '') +
            ' · ' + escapeHtml(rc.loc || '') + '</span>' +
            (rc.title ? '<span class="recall-title">' + escapeHtml(rc.title) + '</span>' : '') + '</div>' +
            '<div class="recall-story">' + escapeHtml(rc.story || '') + '</div>' +
            '<div class="recall-now">' + escapeHtml(rc.now || '') + '</div>';
          rcEl.appendChild(el);
        });
        rcSec.style.display = '';
      } else {
        rcSec.style.display = 'none';
      }
    }

    /* 23-A1 · 验谶 */
    var omSec = $('ending-omen-section'), omEl = $('ending-omen');
    if (omSec && omEl) {
      var om = r.omen;
      if (om && om.verdict) {
        omEl.innerHTML =
          '<div class="omen-text">「' + escapeHtml((G.state && G.state.omen && G.state.omen.text) || '') + '」</div>' +
          '<div class="omen-verdict verdict-' + ({ '应验': 'yes', '半应验': 'half', '反谶': 'no' }[om.verdict] || 'half') +
          '">' + escapeHtml(om.verdict) + '</div>' +
          '<div class="omen-note">' + escapeHtml(om.note || '') + '</div>';
        omSec.style.display = '';
      } else {
        omSec.style.display = 'none';
      }
    }

    var hg = $('ending-hidden');
    hg.innerHTML = '';
    (r.hiddenReveal || []).forEach(function (h, i) {
      var el = document.createElement('div');
      el.className = 'hidden-card';
      el.innerHTML =
        '<div class="hk">其 ' + (CN_NUM[i] || i + 1) + '</div>' +
        '<div class="hn">' + h.name + '</div>' +
        '<div class="hl">' + h.level + '</div>' +
        '<div class="hidden-meter"><i style="width:' + h.value + '%"></i></div>' +
        '<div class="ht">' + h.text + '</div>';
      hg.appendChild(el);
    });

    var famSec = $('ending-family-section'), famEl = $('ending-family');
    if (famSec && famEl) {
      var fam = r.family || {};
      var rows = '';
      if (fam.spouse) rows += '<div class="fam-row"><span class="fk">' + (G.state.gender === 'f' ? '夫' : '妻') + '</span><span>' +
        escapeHtml(fam.spouse.name) + (fam.spouse.alive ? '，尚在' : '，已故') + '</span></div>';
      if (fam.children && fam.children.length) {
        rows += '<div class="fam-row"><span class="fk">子 女</span><span>' +
          fam.children.map(function (c) { return escapeHtml(c.name) + (c.grown ? '（已成人）' : ''); }).join('、') + '</span></div>';
      }
      if (fam.estate && (fam.estate.tian + fam.estate.pu + fam.estate.shu > 0)) {
        rows += '<div class="fam-row"><span class="fk">产 业</span><span>田 ' + fam.estate.tian + ' 亩 · 铺 ' + fam.estate.pu + ' 间 · 书 ' + fam.estate.shu + ' 箧</span></div>';
      }
      if (rows) { famEl.innerHTML = rows; famSec.style.display = ''; }
    }
    var tl = $('ending-timeline');
    tl.innerHTML = '';
    var hist = G.state.history;
    if (!hist.length) {
      tl.innerHTML = '<div class="review-line">未留行迹。</div>';
    } else {
      hist.forEach(function (h) {
        var el = document.createElement('div');
        el.className = 'tl-item';
        el.innerHTML = '<div class="tl-when">' + h.age + '岁 · ' + escapeHtml(h.loc || '') + '</div>' +
          '<div class="tl-what"><b>' + escapeHtml(h.title || '') + '</b>　' + escapeHtml(h.choice || '') + '</div>';
        tl.appendChild(el);
      });
    }

    renderLegacyBlock();
    show('screen-ending');
    refreshTitle();
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------------- 事件绑定 ---------------- */
  /* 安全绑定：单个 id 缺失不再炸掉整段事件绑定 */
  function bindClick(id, fn) { var el = $(id); if (el) el.onclick = fn; }

  $('btn-start').onclick = function () { buildDynasty(); show('screen-dynasty'); };
  $('btn-back-dynasty').onclick = function () { show('screen-dynasty'); };
  /* 09 · 捏人 */
  $('create-gender-m').onclick = function () { create.gender = 'm'; renderCreate(); };
  $('create-gender-f').onclick = function () { create.gender = 'f'; renderCreate(); };
  $('btn-create').onclick = function () {
    if (!chosen.dynasty || !chosen.origin) return;
    startGame();
  };
  $('btn-continue').onclick = function () { continueGame(); };
  $('btn-dex').onclick = function () { openDex(); };
  $('btn-close-dex').onclick = function () { $('overlay-dex').classList.remove('show'); };
  $('overlay-dex').onclick = function (ev) {
    if (ev.target === $('overlay-dex')) $('overlay-dex').classList.remove('show');
  };
  $('btn-again').onclick = function () {
    chosen = { dynasty: null, origin: null };
    show('screen-title');
    refreshTitle();
  };
  $('btn-restart').onclick = function () {
    if (!confirm('重开一局？此局行迹将不存。')) return;
    clearSave();                 // 只清存档，图鉴留着
    chosen = { dynasty: null, origin: null };
    show('screen-title');
    refreshTitle();
  };
  $('btn-log').onclick = function () {
    var body = $('overlay-log-body');
    body.innerHTML = '';
    var hist = G.state.history;
    if (!hist.length) body.innerHTML = '<div class="review-line">尚无行迹。</div>';
    hist.forEach(function (h) {
      var el = document.createElement('div');
      el.className = 'tl-item';
      el.innerHTML = '<div class="tl-when">' + h.age + '岁 · ' + escapeHtml(h.time) + '</div>' +
        '<div class="tl-what"><b>' + escapeHtml(h.title || '') + '</b>　' + escapeHtml(h.choice || '') + '</div>';
      body.appendChild(el);
    });
    $('overlay-log').classList.add('show');
  };
  $('btn-close-log').onclick = function () { $('overlay-log').classList.remove('show'); };
  $('overlay-log').onclick = function (ev) {
    if (ev.target === $('overlay-log')) $('overlay-log').classList.remove('show');
  };


  /* 08 · 人物档 */
  bindClick('btn-observe', doObserve);
  bindClick('btn-web', openWeb);
  bindClick('btn-close-web', function () { $('overlay-web').classList.remove('show'); });
  bindClick('overlay-web', function (ev) {
    if (ev.target === $('overlay-web')) $('overlay-web').classList.remove('show');
  });
  bindClick('btn-close-npc', function () { $('overlay-npc').classList.remove('show'); });
  bindClick('btn-close-npc-2', function () { $('overlay-npc').classList.remove('show'); });
  bindClick('overlay-npc', function (ev) {
    if (ev.target === $('overlay-npc')) $('overlay-npc').classList.remove('show');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $('overlay-log').classList.remove('show');
      $('overlay-dex').classList.remove('show');
      $('overlay-npc').classList.remove('show');
      $('overlay-web').classList.remove('show');
    }
    if (!$('screen-play').classList.contains('active')) return;
    if ($('overlay-log').classList.contains('show')) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 8) {
      var btns = $('choices').querySelectorAll('.choice');
      if (btns[n - 1]) btns[n - 1].click();
    }
  });

  /* 18 · AI 设置弹层（段尾，安全绑定） */
  function aiOpen() {
    var cfg = (typeof AI !== 'undefined' && AI._store) ? AI._store() : {};
    $('ai-key').value = cfg.key || '';
    $('ai-model').value = cfg.model || 'deepseek-chat';
    $('ai-proxy').value = cfg.proxy || '';
    $('ai-toggle').textContent = cfg.on ? '开' : '关';
    $('overlay-ai').classList.add('show');
  }
  bindClick('btn-ai', aiOpen);
  bindClick('btn-close-ai', function () { $('overlay-ai').classList.remove('show'); });
  bindClick('overlay-ai', function (ev) { if (ev.target === $('overlay-ai')) $('overlay-ai').classList.remove('show'); });
  bindClick('ai-toggle', function () {
    var b = $('ai-toggle');
    b.textContent = b.textContent === '开' ? '关' : '开';
  });
  bindClick('ai-save', function () {
    if (typeof AI === 'undefined' || !AI._save) return;
    AI._save({
      v: 1,
      key: $('ai-key').value.trim(),
      model: $('ai-model').value.trim() || 'deepseek-chat',
      proxy: $('ai-proxy').value.trim(),
      on: $('ai-toggle').textContent === '开'
    });
    $('overlay-ai').classList.remove('show');
  });
  bindClick('ai-clear', function () {
    try {
      window.localStorage.removeItem('fsy:ai:v1');
      window.localStorage.removeItem('fsy:ai:cache:v1');
    } catch (e) { /* 忽略 */ }
    $('ai-key').value = '';
    $('ai-toggle').textContent = '关';
  });

  /* 载入即建朝代卡 */
  window.addEventListener('DOMContentLoaded', function () {
    buildDynasty();
    refreshTitle();
    // 调试/演示用：?dyn=tang&org=shi 直达开局
    var q = {};
    (location.search || '').replace(/^\?/, '').split('&').forEach(function (kv) {
      var p = kv.split('='); if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    });
    if (q.step === 'dynasty') { show('screen-dynasty'); return; }
    if (q.step === 'origin' && q.dyn && D.dynasties[q.dyn]) {
      chosen.dynasty = q.dyn; buildOrigin(); show('screen-origin'); return;
    }
    if (q.dyn && D.dynasties[q.dyn] && D.origins[q.org]) {
      chosen.dynasty = q.dyn; chosen.origin = q.org;
      startGame({ gender: q.gender === 'f' ? 'f' : undefined, name: q.name || undefined });
      if (q.auto) {
        var left = parseInt(q.auto, 10) || 0;
        var timer = setInterval(function () {
          if (left-- <= 0) { clearInterval(timer); return; }
          var btns = $('choices').querySelectorAll('.choice');
          if (btns.length) btns[0].click();
        }, 30);
      }
    }
  });
})();
