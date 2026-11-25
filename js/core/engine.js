/* 古风抉择模拟器 · 引擎（无依赖，纯数据驱动）
 * UI 只渲染，一切推演在此。
 */
(function (global) {
  'use strict';

  var DATA = global.GAME_DATA = global.GAME_DATA || {};
  DATA.origins = DATA.origins || {};
  DATA.dynasties = DATA.dynasties || {};
  DATA.shared = DATA.shared || [];
  DATA.endings = DATA.endings || [];

  var SEASONS = ['春', '夏', '秋', '冬'];
  var DAYS = { '数日': 5, '旬日': 10, '半月': 15, '一月': 30, '两月': 60, '一季': 90, '半载': 180, '一年': 360, '两载': 720, '三年': 1080, '五载': 1800, '十年': 3600,
    // 兼容旧数据里的写法：半年=半载，两年=两载
    '半年': 180, '两年': 720 };

  var ATTR_KEYS = ['ti', 'cai', 'qian', 'ming', 'xin'];
  var ATTR_META = {
    ti:  { name: '体魄', desc: '筋骨气血。弱则百事难支，强则能行远路、负重任。' },
    cai: { name: '才学', desc: '经义文章、筹算谋略。科场、幕府、书院皆以此为凭。' },
    qian:{ name: '银钱', desc: '囊中所有。贫则不择路，富则招人眼。' },
    ming:{ name: '名望', desc: '他人眼中之你。名重则门自开，名败则步步荆棘。' },
    xin: { name: '心性', desc: '守得住的分寸。心性弱者，富贵亦如浮萍。' }
  };
  var HIDDEN_KEYS = ['yun', 'yin', 'zhi'];
  var HIDDEN_META = {
    yun: { name: '气运', loose: '天道无常。偏私于谁，向来不肯先说。' },
    yin: { name: '阴德', loose: '有些债，人看不见，天地却记着。' },
    zhi: { name: '执念', loose: '心里那点不肯放下的东西，是火，也是绳。' }
  };
  var DIM_NAME = { shi: '入世进取', li: '谋生逐利', xiu: '隐修守心', yi: '仗义行险' };
  var STAGES = [[0, '垂髫'], [13, '少年'], [17, '弱冠'], [25, '而立'], [35, '不惑'], [50, '知天命'], [60, '花甲'], [70, '古稀']];

  function rnd(n) { return Math.floor(Math.random() * n); }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function clone(o) { var r = {}; for (var k in o) r[k] = o[k]; return r; }
  function numToCn(n) {
    var d = ['〇','一','二','三','四','五','六','七','八','九'];
    if (n < 10) return d[n];
    if (n < 20) return '十' + (n % 10 ? d[n % 10] : '');
    if (n < 100) return d[Math.floor(n / 10)] + '十' + (n % 10 ? d[n % 10] : '');
    return String(n);
  }
  function stageName(age) {
    var name = STAGES[0][1];
    for (var i = 0; i < STAGES.length; i++) if (age >= STAGES[i][0]) name = STAGES[i][1];
    return name;
  }

  /* ---------------- 条件 ---------------- */
  function test(s, req) {
    if (req == null) return true;
    if (typeof req === 'function') return !!req(s);
    if (Array.isArray(req)) return req.every(function (r) { return test(s, r); });
    for (var k in req) {
      if (!Object.prototype.hasOwnProperty.call(req, k)) continue;
      var v = req[k];
      if (k === 'or') { if (!v.some(function (x) { return test(s, x); })) return false; continue; }
      if (k === 'all') { if (!v.every(function (x) { return test(s, x); })) return false; continue; }
      if (k === 'not') { if (test(s, v)) return false; continue; }
      if (k === 'flag') { if (!s.flags[v]) return false; continue; }
      if (k === 'noflag') { if (s.flags[v]) return false; continue; }
      if (k === 'gender') { if (s.gender !== v) return false; continue; }
      if (k === 'seen') { if (!s.seen[v]) return false; continue; }
      if (k === 'notseen') { if (s.seen[v]) return false; continue; }
      if (k === 'age') { if (s.age < v[0] || s.age > (v[1] == null ? 999 : v[1])) return false; continue; }
      if (k === 'dead') { if (!!s.dead !== !!v) return false; continue; }
      if (k === 'year') { if (s.clock.year < v[0] || s.clock.year > (v[1] == null ? 999 : v[1])) return false; continue; }
      if (k === 'dim') { if ((s.dimCount[v[0]] || 0) < v[1]) return false; continue; }
      if (k === 'npc') {
        var n = s.npcs[v.id];
        if (!n) return false;
        if (v.rel != null && n.rel < v.rel) return false;
        if (v.relMax != null && n.rel > v.relMax) return false;
        if (v.alive === false && n.alive !== false) return false;
        if (v.alive === true && n.alive === false) return false;
        continue;
      }
      if (k === 'hidden') {
        for (var hk in v) { if (s.hidden[hk] < v[hk]) return false; }
        continue;
      }
      if (k === 'fame') {   // 10 · 名望分层条件
        for (var fk in v) { if ((s.fame && s.fame[fk] || 0) < v[fk]) return false; }
        continue;
      }
      if (ATTR_KEYS.indexOf(k) >= 0) {
        var val = s.attrs[k];
        if (typeof v === 'number') { if (val < v) return false; }
        else if (Array.isArray(v)) { if (val < v[0] || val > (v[1] == null ? 999 : v[1])) return false; }
        continue;
      }
    }
    return true;
  }

  /* ---------------- 建立状态 ---------------- */
  /* 09 · 捏人默认值：姓名按朝代取姓，空白随机 */
  var SURNAMES = {
    han: ['刘', '李', '王', '张', '赵'], tang: ['李', '崔', '卢', '郑', '王'],
    song: ['赵', '韩', '曾', '苏', '林'], ming: ['朱', '顾', '徐', '沈', '周']
  };
  /* 17 · 姓氏池优先用注册表国姓，缺失朝代退回通用池 */
  function surnamePool(dynastyId) {
    var reg = DATA.registry && DATA.registry.dyn && DATA.registry.dyn[dynastyId];
    var royal = reg && reg.royal && reg.royal !== '—' ? reg.royal : null;
    var base = SURNAMES[dynastyId] || ['陈', '张', '刘', '李', '王'];
    if (royal) base = [royal].concat(base.slice(0, 4));
    return base;
  }
  var GIVEN_NAMES = ['景年', '怀瑾', '知微', '承安', '文昭', '叔平', '仲卿', '少陵', '伯言', '子墨', '望舒', '清让', '明远', '元礼', '季同', '令仪'];
  function randomName(dynastyId) {
    var pool = surnamePool(dynastyId);
    return pool[rnd(pool.length)] + GIVEN_NAMES[rnd(GIVEN_NAMES.length)];
  }
  /* 09 · 秉性：改隐藏值，走暗线 */
  var BENTS = {
    ji:  { name: '性急', fx: function (s) { s.hidden.zhi += 8; s.hidden.yun += 4; } },
    gua: { name: '寡言', fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 4; } },
    min: { name: '机敏', fx: function (s) { s.hidden.yun += 8; s.hidden.yin -= 4; } },
    ren: { name: '仁厚', fx: function (s) { s.hidden.yin += 8; s.attrs.qian -= 3; } }
  };
  /* 09 · 身份取值：兼容 字符串 / {m,f} / function(s) 三种写法 */
  function resolveIdentity(s) {
    var id = DATA.origins[s.origin].identity;
    if (typeof id === 'function') return id(s) || '';
    if (id && typeof id === 'object') return s.gender === 'f' ? (id.f || id.m || '') : (id.m || id.f || '');
    return id || '';
  }

  /* 15 · 遗泽用：按 08 的档案形态建一个人物（不走 G.npc，避免 _touched 污染） */
  function newNpc(s, id, name) {
    if (!s.npcs[id]) s.npcs[id] = {
      name: name || id, rel: 0, alive: true,
      opinion: 0, traits: [], met: 0, secret: null, history: []
    };
    return s.npcs[id];
  }

  /* ---------------- 23-A1 · 谶语：开局一句，终章验谶 ----------------
   * 整局无任何提示；finish() 时按 key 对一生做判定，给 应验/半应验/反谶。
   * 要求：每一条都必须能在事后说通，不许是废话谶。
   */
  var OMENS = [
    { text: '三起三落，终不归乡。', key: 'sangui' },
    { text: '金玉满堂，莫之能守。', key: 'jinyu' },
    { text: '雨中得剑，雪里埋名。', key: 'yujian' },
    { text: '名动九州，身老田舍。', key: 'mingzhou' },
    { text: '少年得意，白首无成。', key: 'shaonian' },
    { text: '一诺既出，生死随之。', key: 'yinuo' },
    { text: '妻贤子孝，老有所终。', key: 'qixian' },
    { text: '孤身行路，无人送行。', key: 'gushen' },
    { text: '祸从口出，福自心田。', key: 'huofu' },
    { text: '执念成山，压断此身。', key: 'zhinian' },
    { text: '田园三顷，日落而息。', key: 'tianyuan' },
    { text: '才高八斗，命薄如纸。', key: 'caigao' },
    { text: '上善若水，水善利万物而不争。', key: 'rushui' },
    { text: '大器晚成，晚而未成。', key: 'wanqi' }
  ];
  function drawOmen() {
    var o = OMENS[rnd(OMENS.length)];
    return { text: o.text, key: o.key, answered: false };
  }
  /* 按谶的 key 对一生做判定。返回 { verdict, note } 或 null */
  function resolveOmen(s) {
    if (!s || !s.omen || s.omen.answered) return null;
    s.omen.answered = true;
    var c = s.dimCount || {};
    var dims = [c.shi || 0, c.li || 0, c.xiu || 0, c.yi || 0];
    var spread = Math.max.apply(null, dims) - Math.min.apply(null, dims);
    var closeNpcs = Object.keys(s.npcs || {}).filter(function (k) {
      var n = s.npcs[k]; return n.alive !== false && (n.rel || 0) >= 50;
    }).length;
    var fam = s.family || {};
    var livingSpouse = fam.spouse && fam.spouse.alive !== false;
    var grownKids = (fam.children || []).filter(function (ch) { return ch.grown && ch.alive !== false; }).length;
    function pick(verdict, note) { return { verdict: verdict, note: note }; }
    switch (s.omen.key) {
      case 'sangui':   // 三起三落，终不归乡
        if (spread >= 8) return pick('应验', '你这一生果然几番起落，不曾在一处生根。');
        if (spread >= 4) return pick('半应验', '起落是有过几回，只是没有谶里说的那样多。');
        return pick('反谶', '你安土重迁，一生只在两三处盘桓，算得安稳。');
      case 'jinyu':    // 金玉满堂，莫之能守
        if (s.attrs.qian >= 60) return pick('应验', '你聚过财，也散过财。谶应在了后半句。');
        if (s.attrs.qian >= 30) return pick('半应验', '钱财不缺，也无从谈守与不守。');
        return pick('反谶', '你一生清贫——无金玉满堂，便无所谓守不住。');
      case 'yujian':   // 雨中得剑，雪里埋名
        if ((c.yi || 0) >= 7 && s.attrs.ming < 40) return pick('应验', '你行过险事，终究没有留名。谶应了个十足。');
        if ((c.yi || 0) >= 4 || s.attrs.ming < 40) return pick('半应验', '险事行过，名也算埋了，只是两样都没到十分。');
        return pick('反谶', '你一生不曾行险，名声也留了下来。两头都不应。');
      case 'mingzhou': // 名动九州，身老田舍
        if ((s.fame && s.fame.zhou >= 50) && (s.power || 0) <= 2) return pick('应验', '名是传出去的，人是一直留在原处的。');
        if (s.fame && s.fame.zhou >= 40) return pick('半应验', '名望起过，只是身没有那么老，路也没有那么窄。');
        return pick('反谶', '你一生名不外传，谶的前半句就没有应过。');
      case 'shaonian': // 少年得意，白首无成
        if ((c.shi || 0) >= 10 && s.attrs.ming < 35) return pick('应验', '早年间确实顺过。只是走到头，两手仍是空的。');
        if ((c.shi || 0) >= 6) return pick('半应验', '得意是有过的，成就也说不上有。各应一半。');
        return pick('反谶', '你少年时并不得意——后来的路，倒是自己一步步挣出来的。');
      case 'yinuo':    // 一诺既出，生死随之
        if (closeNpcs >= 2) return pick('应验', '有两个人到死都认你这一诺。');
        if (closeNpcs >= 1) return pick('半应验', '一诺换来了一个人。不多，也不少。');
        return pick('反谶', '你说过的诺言，无人记得，你也不必偿。');
      case 'qixian':   // 妻贤子孝，老有所终
        if (livingSpouse && grownKids >= 1) return pick('应验', '人还在，孩子也成人了。这一条谶，是好的。');
        if (livingSpouse || grownKids >= 1) return pick('半应验', '另一半谶，被命运留下了。');
        return pick('反谶', '妻与子两头都空。谶没有应，命也难说好。');
      case 'gushen':   // 孤身行路，无人送行
        if (closeNpcs === 0) return pick('应验', '走到最后，路上确是你一个人。');
        if (closeNpcs === 1) return pick('半应验', '送行的人只有一个。也够，也不够。');
        return pick('反谶', '你这一生，从不是一个人在走。');
      case 'huofu':    // 祸从口出，福自心田
        if (s.hidden.yin >= 65 && s.hidden.yun <= 40) return pick('应验', '福是你一点点积出来的，运气倒一直不站在你这边。');
        if (s.hidden.yin >= 55 || s.hidden.yin <= 25) return pick('半应验', '心田里种什么收什么，只是没有谶里说得那样分明。');
        return pick('反谶', '你的祸福另有来处，与口与心都不相干。');
      case 'zhinian': // 执念成山，压断此身
        if (s.hidden.zhi >= 75) return pick('应验', '你一直没放下。山是压下来的。');
        if (s.hidden.zhi >= 55) return pick('半应验', '那点执念背了一生，只是没有压断你。');
        return pick('反谶', '你放得下。放得下的人，压不着。');
      case 'tianyuan': // 田园三顷，日落而息
        var es = s.estate || {};
        if ((es.tian || 0) + (es.pu || 0) + (es.shu || 0) >= 4 && (c.xiu || 0) >= 8) return pick('应验', '田是置下了，日子也确实是自己息下来的。');
        if ((es.tian || 0) + (es.pu || 0) + (es.shu || 0) >= 3) return pick('半应验', '田园有了。日落而息四个字，是别人替你过的。');
        return pick('反谶', '你一生没有置下几亩田，谶里的安稳也没有轮到你。');
      case 'caigao':   // 才高八斗，命薄如纸
        if (s.attrs.cai >= 60 && (s.attrs.ti <= 30 || s.attrs.qian <= 30)) return pick('应验', '才学是真的，命也是真的薄。');
        if (s.attrs.cai >= 50) return pick('半应验', '才学没辜负你，命也没有多厚待你。各得一半。');
        return pick('反谶', '八斗谈不上，命倒不算薄。');
      case 'rushui':   // 上善若水
        if ((c.xiu || 0) >= 10 && s.attrs.xin >= 60) return pick('应验', '你一生不争。不争的人，最后什么都在。');
        if ((c.xiu || 0) >= 6) return pick('半应验', '让过的都让了，争过的也争过几回。像水，也有结冰的时候。');
        return pick('反谶', '你不是水。你是刀，是火，是硬碰硬的那一块。');
      case 'wanqi':    // 大器晚成，晚而未成
        if ((c.shi || 0) >= 8 && s.scene >= 40) return pick('应验', '到老也还在成器的路上。器没成，路走完了。');
        if (s.scene >= 44) return pick('半应验', '晚是晚的。成与不成，只有你自己认得。');
        return pick('反谶', '你的故事早早有了定局，谈不上晚成。');
    }
    return pick('半应验', '谶语含糊，人生也是。');
  }

  /* ---------------- 23-A2 · 同侪对照：逢十岁一屏 ----------------
   * 三个与你同起点的人，各一句现状。纯文本，无选项，读完即走。
   * 写"命运的岔路"，不写排行榜。
   */
  function buildPeers(s) {
    var pool = surnamePool(s.dynasty);
    var arcs = ['gui', 'ping', 'yao'];
    var peers = [];
    for (var i = 0; i < 3; i++) {
      peers.push({
        name: pool[rnd(pool.length)] + GIVEN_NAMES[rnd(GIVEN_NAMES.length)],
        arc: arcs[i], seed: rnd(100)
      });
    }
    return peers;
  }
  function peerLine(p, bucket) {
    var gui = {
      young: '已在县里谋得一门差事，人人说他有出息。',
      mid: '如今是一方人物，出门有随从，说话有人记。',
      late: p.seed < 30 ? '前年冬天没了，走得极风光，全城送殡。' : '听说致仕还乡，儿孙绕膝，园子比从前大了三倍。'
    };
    var ping = {
      young: '仍在原处，娶妻生子，日子清苦，但过得下去。',
      mid: '还是那样——田里的活计，集上的口角，一年一年地过。',
      late: p.seed < 40 ? '身子还硬朗，常坐在村口晒太阳，见谁都笑。' : '腿脚不成了，靠儿女轮流照看，话也少了。'
    };
    var yao = {
      young: '听说闯了祸，家里替他赔了不少钱。',
      mid: '落魄了一阵，去了远处的州府，从此再无音讯。',
      late: p.seed < 55 ? '有人说他死在了外乡，也有人说，他入了道。没人去证实过。' : '前年忽然回来过一趟，瘦得认不出，住了一夜又走了。'
    };
    var t = { gui: gui, ping: ping, yao: yao }[p.arc];
    return t[bucket] || t.mid;
  }
  function peerScene(s) {
    var bucket = s.age < 30 ? 'young' : s.age < 50 ? 'mid' : 'late';
    var lines = (s.peers || []).map(function (p) { return p.name + '——' + peerLine(p, bucket); });
    var coda = (s.age >= 60)
      ? '你们这些人，如今凑在一起的日子，只剩各家的白事了。'
      : '你们的路，是从同一年、同一个起点上岔开的。';
    var story = '【同侪】\n当年与你同一年进学、同一批入行的人，如今——\n\n' +
      lines.join('\n') + '\n\n' + coda;
    return {
      id: '_peers_' + s.age, quiet: true, quietLabel: '掩 卷', title: '同 侪',
      story: story,
      options: [{ idx: 0, t: '掩 卷', dim: 'xiu' }],
      header: buildHeader(s)
    };
  }

  function newGame(dynastyId, originId, opts) {
    var dyn = DATA.dynasties[dynastyId], org = DATA.origins[originId];
    if (!dyn) throw new Error('未知朝代：' + dynastyId);
    if (!org) throw new Error('未知出身：' + originId);
    opts = opts || {};
    var s = {
      dynasty: dynastyId, origin: originId,
      totalDays: 0, age: org.age,
      name: String(opts.name || '').trim().slice(0, 4) || randomName(dynastyId),
      gender: opts.gender === 'f' ? 'f' : 'm',
      bent: opts.bent || null,
      clock: { season: dyn.clock.season || 0, year: dyn.clock.year || 1, eraIndex: 0 },
      loc: org.loc, identity: '',
      attrs: {}, hidden: {}, flags: {}, npcs: {}, seen: {},
      history: [], scene: 0, queue: [], dimCount: { shi: 0, li: 0, xiu: 0, yi: 0 },
      offers: [],   // 12 · 悬案
      family: { spouse: null, children: [] },   // 13 · 家业
      estate: { tian: 0, pu: 0, shu: 0 },       // 13 · 田亩/铺面/藏书，各 0–9
      power: 0,                                  // 14 · 权势 0–9
      ex: { yu: 0, ye: 0, lou: 0, du: 0 },       // 14 · 兑换次数（递减用）
      omen: drawOmen(),                          // 23-A1 · 谶语
      peers: null,                               // 23-A2 · 同侪（对象建好后立刻生成）
      nextPeerAge: org.age + 10,                 // 23-A2 · 下一次同侪对照的岁数
      dead: null, ending: null, _ev: null, _opts: null
    };
    ATTR_KEYS.forEach(function (k) { s.attrs[k] = clamp((org.attrs && org.attrs[k]) || 20, 0, 100); });
    HIDDEN_KEYS.forEach(function (k) { s.hidden[k] = clamp((org.hidden && org.hidden[k]) || 50, 0, 100); });
    // 09 · 天赋点：每点 +6，单属性至多 3 点（与 15 的遗泽共享此上限）
    s.alloc = {};
    ATTR_KEYS.forEach(function (k) { s.alloc[k] = 0; });
    if (opts.alloc) {
      ATTR_KEYS.forEach(function (k) {
        var p = Math.max(0, Math.min(3, Math.floor(opts.alloc[k] || 0)));
        s.alloc[k] = p;
        s.attrs[k] = clamp(s.attrs[k] + p * 6, 0, 100);
      });
    }
    if (org.flags) Object.keys(org.flags).forEach(function (k) { s.flags[k] = org.flags[k]; });
    if (org.npcs) Object.keys(org.npcs).forEach(function (k) { s.npcs[k] = clone(org.npcs[k]); });
    s.identity = resolveIdentity(s);
    s.peers = buildPeers(s);   // 23-A2 · 同侪三人，与玩家同起点
    // 10 · 名望三层：乡里 / 州郡 / 朝堂。zhou 初值按「ming = 0.3x + 0.4z + 0.5c」反推，
    //     保证开局时公式回算 ming 与原值一致，旧 cond: {ming} 语义不受损
    s.fame = {
      xiang: clamp(s.attrs.ming, 0, 100),
      zhou: Math.min(100, Math.round(1.75 * s.attrs.ming)),
      chao: 0
    };
    s.fameOff = 0;      // 旧事件直接改 ming 的量，从三层公式之外叠加
    s._fameTouched = false;
    // 09 · 秉性落在暗处
    if (s.bent && BENTS[s.bent]) BENTS[s.bent].fx(s);
    // 15 · 遗泽：上一世带来的东西，用完即清（加成视作天赋第 4 点，不破上限）
    if (opts.legacy && opts.legacy.type) {
      var lg = opts.legacy.type;
      if (lg === 'shu') s.attrs.cai = clamp(s.attrs.cai + 6, 0, 100);
      if (lg === 'yin') s.attrs.qian = clamp(s.attrs.qian + 6, 0, 100);
      if (lg === 'ti') s.attrs.ti = clamp(s.attrs.ti + 6, 0, 100);
      if (lg === 'sheng') { s.attrs.ming = clamp(s.attrs.ming + 5, 0, 100); s.flags['家声遗泽'] = 1; }
      if (lg === 'xin') {
        var nid = ({ han: 'li', tang: 'shen', song: 'li', ming: 'yan' })[dynastyId] || 'li';
        var NN = { li: '李慕之', shen: '沈九娘', yan: '严七', pei: '裴敬', ahe: '阿禾', xu: '徐翁' };
        var n0 = newNpc(s, nid, NN[nid] || nid);
        n0.rel = 20; n0.met = 1;
      }
    }
    HIDDEN_KEYS.forEach(function (k) { s.hidden[k] = clamp(s.hidden[k], 0, 100); });
    ATTR_KEYS.forEach(function (k) { s.attrs[k] = clamp(s.attrs[k], 0, 100); });
    // 11 · 志向：只记方向与守违，不给属性
    s.vow = opts.vow ? {
      id: opts.vow,
      at: s.age,
      dim: { ming: 'shi', fu: 'li', shou: 'xiu', kuai: 'yi' }[opts.vow] || null,
      kept: 0, stray: 0, broken: false
    } : null;
    s.queue = (org.opening || []).slice();

    var G = global.G;
    G.state = s;
    refreshClock(s);
    return s;
  }

  function refreshClock(s) {
    var dyn = DATA.dynasties[s.dynasty];
    var base = dyn.clock;
    var seasons = Math.floor(s.totalDays / 90);
    s.clock.season = (base.season + seasons) % 4;
    s.clock.year = (base.year || 1) + Math.floor((base.season + seasons) / 4);
    s.age = DATA.origins[s.origin].age + Math.floor(s.totalDays / 360);
    // 年号推进
    var eras = dyn.eras || [];
    if (eras.length) {
      var i = 0, rest = s.clock.year;
      while (i < eras.length - 1 && rest > eras[i].span) { rest -= eras[i].span; i++; }
      s.clock.eraIndex = i;
      s.clock.year = Math.max(1, Math.min(rest, eras[i].span));
      s.clock.eraYear = rest;
    }
    // 08：人物身份随岁月演进（只改字符串）
    var titles = DATA.npcTitles || {};
    Object.keys(s.npcs || {}).forEach(function (id) {
      var tb = titles[id], n = s.npcs[id];
      if (!tb || !n) return;
      for (var j = tb.length - 1; j >= 0; j--) {
        if (s.scene >= tb[j][0]) { if (n.title != tb[j][1]) n.title = tb[j][1]; break; }
      }
    });
    // 13 · 配偶同步年岁；子女按 bornAtAge 长大，十六岁成人写一条行迹
    if (s.family && s.family.spouse && s.family.spouse.alive) {
      s.family.spouse.age = s.age + (s.family.spouse.gap || 0);
    }
    if (s.family) {
      (s.family.children || []).forEach(function (c) {
        c.age = Math.max(0, s.age - (c.bornAtAge || 0));
        if (!c.grown && c.age >= 16) {
          c.grown = true;
          s.history.push({ age: s.age, time: timeText(s), title: '', choice: (c.name || '孩子') + '成人', dim: null, loc: s.loc, delta: null });
        }
      });
    }
  }

  function addDays(s, d) {
    if (!d) return;
    if (typeof d === 'string') d = DAYS[d] || 30;
    s.totalDays += d;
    refreshClock(s);
  }

  function timeText(s) {
    var dyn = DATA.dynasties[s.dynasty];
    var era = (dyn.eras || [])[s.clock.eraIndex] || { name: '' };
    var y = s.clock.eraYear != null ? s.clock.eraYear : s.clock.year;
    return era.name + (y <= 1 ? '元' : numToCn(y)) + '年 · ' + SEASONS[s.clock.season];
  }

  /* ---------------- 事件池 ---------------- */
  function allEvents(s) {
    var dyn = DATA.dynasties[s.dynasty], org = DATA.origins[s.origin];
    return (org.events || []).concat(DATA.shared, dyn.events || []);
  }
  function byId(s, id) {
    var org = DATA.origins[s.origin];
    var pool = (org.opening || []).concat(allEvents(s)), i;
    for (i = 0; i < pool.length; i++) if (pool[i] && pool[i].id === id) return pool[i];
    var main = DATA.dynasties[s.dynasty].main || [];
    for (i = 0; i < main.length; i++) if (main[i].id === id) return main[i];
    return null;
  }

  function dueMain(s) {
    var main = DATA.dynasties[s.dynasty].main || [];
    for (var i = 0; i < main.length; i++) {
      var m = main[i];
      if (s.seen[m.id]) continue;
      if (s.scene < (m.after == null ? 0 : m.after)) continue;
      if (m.cond && !test(s, m.cond)) continue;
      return m;
    }
    return null;
  }

  function eligible(s, ev) {
    if (!ev || ev.main) return false;
    if (ev.once !== false && s.seen[ev.id]) return false;
    if (ev.cond && !test(s, ev.cond)) return false;
    if (ev.minScene != null && s.scene < ev.minScene) return false;
    if (ev.maxScene != null && s.scene > ev.maxScene) return false;
    if (ev.age) { if (s.age < ev.age[0] || s.age > (ev.age[1] == null ? 999 : ev.age[1])) return false; }
    if (ev.origin && ev.origin.indexOf(s.origin) < 0) return false;
    if (ev.dyn && ev.dyn.indexOf(s.dynasty) < 0) return false;   // 17 · 公共事件按朝代白名单过滤
    if (ev.exam) {                                               // 选官制度门槛：keju / chaju / none
      var reg = DATA.registry && DATA.registry.dyn && DATA.registry.dyn[s.dynasty];
      if (!reg || reg.exam !== ev.exam) return false;
    }
    return true;
  }

  function weightOf(s, ev) {
    var w = ev.weight == null ? 10 : ev.weight;
    var tags = ev.tags || [];
    if (tags.indexOf('奇遇') >= 0) w *= 0.4 + s.hidden.yun / 55;
    if (tags.indexOf('灾祸') >= 0) {
      w *= 0.55 + (100 - s.hidden.yun) / 60;
      if (s.hidden.yin < 30) w *= 1.7;
      if (s.hidden.zhi > 70) w *= 1.3;
    }
    if (tags.indexOf('善缘') >= 0) w *= 0.55 + s.hidden.yin / 70;
    if (tags.indexOf('执') >= 0) w *= 0.35 + s.hidden.zhi / 45;
    if (tags.indexOf('鬼神') >= 0) w *= 0.45 + (s.hidden.yun + s.hidden.yin) / 220;
    // 11 · 志向偏移：只 +15%，志是倾向，不是挂机加成
    if (s.vow && !s.vow.broken) {
      var want = { ming: ['朝堂风波', '江湖奇遇', '善缘'], fu: ['日常', '江湖奇遇'], shou: ['鬼神异闻', '善缘'], kuai: ['灾祸', '边境战事', '执'] }[s.vow.id] || [];
      for (var vi = 0; vi < want.length; vi++) if (tags.indexOf(want[vi]) >= 0) { w *= 1.15; break; }
    }
    return Math.max(0.4, w);
  }

  function fallbackOption() {
    return { t: '默然退去，另寻他路', dim: 'xiu', res: '你退了一步。天地很大，未必只有眼前这一条道。' };
  }

  /* ---------------- 取景 ---------------- */
  function buildHeader(s) {
    return { time: timeText(s), loc: s.loc, age: s.age, stage: stageName(s.age) };
  }

  function next() {
    var s = global.G.state;
    if (s.dead || s.ending) return finish();
    // 终局三条并列，谁先到谁结束（实测校准：62/34 会把所有人压在六十几岁，七十岁以上为 0）
    if (s.scene >= 52) return finish();
    if (s.age >= 78) return finish();
    if (s.age >= 70 && s.scene >= 34) return finish();

    settleOffers(s);   // 12 · 悬案：按场景数倒计时，逾期静默结算（绝不在 choose 里推进）

    /* 23-A2 · 同侪对照：逢十岁插一屏，纯文本无选项，不占悬案与主线 */
    if (s.peers && s.peers.length && s.age >= s.nextPeerAge) {
      s.nextPeerAge += 10;
      s.scene++;
      return peerScene(s);
    }

    var ev = null, i;
    /* 12 · 带 raiseOffer 的事件不直接呈现：立为悬案挂进侧栏，本段改呈别的事 */
    for (var attempt = 0; attempt < 2 && !ev; attempt++) {
      while (s.queue.length && !ev) {
        var q = s.queue.shift();
        var f = typeof q === 'string' ? byId(s, q) : q;
        if (f && f.raiseOffer) f = raiseOfferEvent(s, f);
        if (f) ev = f;
      }
      if (!ev) ev = dueMain(s);
      if (ev && ev.raiseOffer && !s.flags['_raised_' + ev.id]) { ev = raiseOfferEvent(s, ev); }

      if (!ev) {
        var pool = [];
        allEvents(s).forEach(function (e) {
          if (eligible(s, e)) {
            // 已立过案的悬案事件不再进随机池，只等玩家从悬案条受理
            if (s.flags['_raised_' + e.id]) return;
            pool.push({ e: e, w: weightOf(s, e) });
          }
        });
        if (pool.length) {
          var total = 0; pool.forEach(function (p) { total += p.w; });
          var r = Math.random() * total;
          for (i = 0; i < pool.length; i++) { r -= pool[i].w; if (r <= 0) { ev = pool[i].e; break; } }
          if (!ev) ev = pool[pool.length - 1].e;
          if (ev && ev.raiseOffer && !s.flags['_raised_' + ev.id]) { ev = raiseOfferEvent(s, ev); }
          else if (ev && ev.raiseOffer) ev = null;
        }
      }
    }

    if (!ev) {
      if (s.age >= 76 || s.scene >= 41) return finish();
      addDays(s, 360);
      var quiet = {
        id: '_quiet_' + s.scene, title: '岁时无声', quiet: true, time: '一年',
        story: '【岁时无声】\n这一年并无大事可记。日升月落，田畴青了又黄。你只是活着，一日一日地活着。',
        options: [{ t: '任其流逝', dim: 'xiu', res: '又一年过去了。' }]
      };
      s.seen[quiet.id] = true;
      s.scene++;
      s._ev = quiet;
      s._opts = quiet.options;
      return {
        id: quiet.id, quiet: true, story: quiet.story,
        options: [{ idx: 0, t: '任其流逝', dim: 'xiu' }], header: buildHeader(s)
      };
    }
    return present(s, ev);
  }

  /* ---------------- 12 · 悬案：立案 / 倒计时 / 受理 ---------------- */
  function raiseOfferEvent(s, ev) {
    if (!ev || !ev.raiseOffer) return null;
    if (s.flags['_raised_' + ev.id]) return null;
    if (!s.offers) s.offers = [];
    if (s.offers.length >= 3) return null;   // 最多同时三条，满了则本次不立
    s.flags['_raised_' + ev.id] = 1;
    s.offers.push({
      id: ev.id,
      short: ev.raiseOffer.short || ev.title || '',
      ttl: ev.raiseOffer.ttl || 2,
      left: ev.raiseOffer.ttl || 2,
      title: ev.title || ''
    });
    return null;   // 返回 null：本段不呈现它
  }
  function settleOffers(s) {
    if (!s.offers || !s.offers.length) return;
    for (var i = s.offers.length - 1; i >= 0; i--) {
      var of = s.offers[i];
      of.left -= 1;
      if (of.left > 0) continue;
      s.offers.splice(i, 1);
      var src = byId(s, of.id);
      var text = '';
      if (src && src.raiseOffer && typeof src.raiseOffer.expire === 'function') text = String(src.raiseOffer.expire(s) || '');
      s.history.push({ age: s.age, time: timeText(s), title: '', choice: '逾期未决', note: (of.short ? '【' + of.short + '】' : '') + text, dim: null, loc: s.loc, delta: null });
    }
  }

  function humanDays(d) {
    if (typeof d === 'string') d = DAYS[d] || 30;
    if (d <= 7) return '数日';
    if (d <= 20) return '旬日';
    if (d <= 45) return '一月';
    if (d <= 100) return '一季';
    if (d <= 200) return '半载';
    if (d <= 400) return '一年';
    if (d <= 800) return '两载';
    if (d <= 1200) return '三年';
    return '数载';
  }

  function present(s, ev) {
    if (ev.id) s.seen[ev.id] = true;
    s.scene++;
    if (ev.loc) s.loc = ev.loc;
    if (ev.onEnter) ev.onEnter(s);

    var opts = (ev.options || []).filter(function (o) { return !o.req || test(s, o.req); });
    var locked = false;
    if (!opts.length) { opts = [fallbackOption()]; locked = true; }
    opts = opts.slice(0, 4);

    s._ev = ev; s._opts = opts;

    var story = typeof ev.story === 'function' ? ev.story(s) : ev.story;
    if (locked) story += '\n\n你站在原处，把眼前的几条路一一想过。每一条，都不是此刻的你走得进去的。';
    ev._story = String(story);   // 23-A6 · 留存原文，终章口述史重放用

    return {
      id: ev.id, title: ev.title || '',
      story: story,
      options: opts.map(function (o, idx) {
        return {
          idx: idx,
          t: typeof o.t === 'function' ? o.t(s) : o.t,
          dim: o.dim,
          span: humanDays(DAYS[o.time] || (o.time != null ? o.time : DAYS[ev.time] || 30))
        };
      }),
      header: buildHeader(s)
    };
  }

  /* ---------------- 结算 ---------------- */
  function choose(idx) {
    var s = global.G.state;
    var ev = s._ev, opts = s._opts;
    if (!ev || !opts) return null;
    var o = opts[idx];
    if (!o) return null;

    var before = { ti: s.attrs.ti, cai: s.attrs.cai, qian: s.attrs.qian, ming: s.attrs.ming, xin: s.attrs.xin };
    var npcBefore = {};
    Object.keys(s.npcs).forEach(function (id) { npcBefore[id] = s.npcs[id].rel || 0; });
    s._touched = {};   // 08：本次结算中经由 G.npc() 触及的人物
    var res = '';
    if (o.fx) { var r = o.fx(s); if (typeof r === 'string') res = r; }
    // 契约里写明「引擎会 clamp 到 0–100」，此前只在新开局时 clamp，事件里会涨到两百多
    ATTR_KEYS.forEach(function (k) { s.attrs[k] = clamp(s.attrs[k], 0, 100); });
    HIDDEN_KEYS.forEach(function (k) { s.hidden[k] = clamp(s.hidden[k], 0, 100); });

    /* 08 · 双向好感：你对他做过的事，他记着（opinion 永不以数字显示） */
    Object.keys(s.npcs).forEach(function (id) {
      var n = s.npcs[id];
      if (s._touched[id]) n.met = (n.met || 0) + 1;
      var d = (n.rel || 0) - (npcBefore[id] || 0);
      if (!d) return;
      var sign = o.kind === '恩' ? 1 : o.kind === '怨' ? -1 : (d > 0 ? 1 : -1);
      var mag = Math.abs(d);
      if (sign < 0) mag *= 1.5;                    // 人对怨更敏感
      else if (s.hidden.yin < 30) mag *= 0.7;      // 阴德薄的人，善事在别人眼里也打折
      n.opinion = clamp((n.opinion || 0) + sign * Math.min(20, mag), -100, 100);
    });
    /* 16 · 迁怒：他的盟友随他疏远你，他的仇家反向改观（只动 opinion，单次连带 ≤3 人） */
    var changedIds = Object.keys(s.npcs).filter(function (id) { return (s.npcs[id].rel || 0) !== (npcBefore[id] || 0); });
    var propagated = 0;
    for (var pi = 0; pi < changedIds.length && propagated < 3; pi++) {
      var web = (DATA.npcWeb || {})[changedIds[pi]] || {};
      var dRel = (s.npcs[changedIds[pi]].rel || 0) - (npcBefore[changedIds[pi]] || 0);
      Object.keys(web).forEach(function (other) {
        if (propagated >= 3) return;
        var t = s.npcs[other];
        if (!t || !dRel) return;
        var w = web[other];
        t.opinion = clamp((t.opinion || 0) + (w > 0 ? dRel * 0.4 : -dRel * 0.4), -100, 100);
        propagated++;
      });
    }
    s._touched = null;

    /* 10 · 名望分层结算：旧事件直接改的 ming 记入 fameOff，分层变化走公式回算 */
    var dMing = s.attrs.ming - before.ming;
    if (dMing) s.fameOff = clamp(s.fameOff + dMing, -200, 200);
    if (s._fameTouched) {
      s.attrs.ming = clamp(Math.round(0.3 * s.fame.xiang + 0.4 * s.fame.zhou + 0.5 * s.fame.chao) + s.fameOff, 0, 100);
      s._fameTouched = false;
    }

    /* 11 · 守誓 / 违誓：判据是「背离明显多于顺从」，不是固定阈值 */
    if (s.vow) {
      var own = s.dimCount[s.vow.dim] || 0;
      var all = (s.dimCount.shi || 0) + (s.dimCount.li || 0) + (s.dimCount.xiu || 0) + (s.dimCount.yi || 0);
      if (own >= 6) s.vow.kept = 1;
      if (s.scene > 8 && !s.vow.broken && all - own >= own + 5) {
        s.vow.broken = true;
        s.vow.stray = all - own;
        s.hidden.zhi = clamp(s.hidden.zhi + 8, 0, 100);
        s.queue.push('sh_shi_1');
      }
    }

    s.dimCount[o.dim || 'xiu'] = (s.dimCount[o.dim || 'xiu'] || 0) + 1;

    var days0 = s.totalDays;
    var d = o.time != null ? o.time : (ev.time != null ? ev.time : 30);
    if (typeof d === 'string') d = DAYS[d] || 30;
    addDays(s, d);
    // 章回之间，岁月自流：少年日子慢，壮年走得快，晚岁反而慢下来
    var a0 = s.age;
    var drift = a0 < 20 ? 40
              : a0 < 30 ? 220
              : a0 < 45 ? 400
              : a0 < 60 ? 300
              : a0 < 70 ? 180
              : 120;
    addDays(s, drift);
    // 14 · 体魄自复：损耗是常态，岁月也养人（防四属性均值塌向单极）
    if (s.attrs.ti < 45) s.attrs.ti += 2; else if (s.attrs.ti < 70) s.attrs.ti += 1;
    var elapsed = humanDays(s.totalDays - days0);

    if (!res) res = typeof o.res === 'function' ? o.res(s) : (o.res || '');
    res = String(res).replace(/\{age\}/g, s.age).replace(/\{loc\}/g, s.loc);

    var delta = {
      ti: s.attrs.ti - before.ti, cai: s.attrs.cai - before.cai, qian: s.attrs.qian - before.qian,
      ming: s.attrs.ming - before.ming, xin: s.attrs.xin - before.xin
    };

    s.history.push({ age: s.age, time: timeText(s), title: ev.title || '', choice: typeof o.t === 'function' ? o.t(s) : o.t, dim: o.dim, loc: s.loc, delta: delta, story: String(ev._story || '').slice(0, 160) });

    // 入队只接受能解析成事件对象的字符串 id；
    // 主线事件用 after: 数字 表示场景阈值，不得当事件 id 入队（否则会生成无内容的空场）
    function enqueue(x) {
      if (!x || typeof x !== 'string') return;
      if (!byId(s, x)) {
        if (global.console) console.warn('[engine] 未知事件 id，已忽略：' + x);
        return;
      }
      s.queue.push(x);
    }
    if (o.then) [].concat(o.then).forEach(enqueue);
    if (ev.after && !(s.dynasty && (DATA.dynasties[s.dynasty].main || []).indexOf(ev) >= 0)) {
      [].concat(typeof ev.after === 'function' ? ev.after(s) : ev.after).forEach(enqueue);
    }

    shadow(s);
    s._ev = null; s._opts = null;

    var out = { result: res, header: buildHeader(s), deltas: delta, death: !!s.dead, elapsed: elapsed };
    if (s.dead) out.ending = finish();
    return out;
  }

  function shadow(s) {
    if (s.hidden.zhi >= 72 && !s.flags['_zhi']) { s.flags['_zhi'] = 1; s.queue.push('sh_zhi_1'); }
    if (s.hidden.zhi >= 88 && !s.flags['_zhi2']) { s.flags['_zhi2'] = 1; s.queue.push('sh_zhi_2'); }
    if (s.hidden.yin <= 18 && !s.flags['_huo']) { s.flags['_huo'] = 1; s.queue.push('sh_huo_1'); }
    if (s.hidden.yun >= 88 && !s.flags['_yun']) { s.flags['_yun'] = 1; s.queue.push('sh_yun_1'); }
    // 08：opinion 咬人 —— 记仇者背刺，感恩者提携（触发时记下是哪个人）
    var bei = null, ti = null;
    Object.keys(s.npcs).forEach(function (id) {
      var op = s.npcs[id].opinion || 0;
      if (!bei && op <= -30 && !s.flags['_bei_' + id]) { s.flags['_bei_' + id] = 1; bei = id; }
      if (!ti && op >= 40 && !s.flags['_ti_' + id]) { s.flags['_ti_' + id] = 1; ti = id; }
    });
    if (bei) { s._hookNpc = bei; s.queue.push('sh_bei_1'); }
    if (ti) { s._hookNpc = ti; s.queue.push('sh_ti_1'); }
    // 14 · 权势反噬：势大而德薄者被参，势极而执深者招风
    if (s.power >= 5 && s.hidden.yin < 30 && !s.flags['_tan']) { s.flags['_tan'] = 1; s.queue.push('sh_c_tan'); }
    if (s.power >= 7 && s.hidden.zhi > 65 && !s.flags['_feng']) { s.flags['_feng'] = 1; s.queue.push('sh_c_fu'); }
    if ((s.attrs.ti <= 0 || s.attrs.xin <= 0) && !s.dead) {
      if (!s.flags['_bing']) { s.flags['_bing'] = 1; s.queue.unshift('sh_bing_1'); }
      else s.dead = { reason: s.attrs.ti <= 0 ? '积劳成疾，气血耗尽，终不能起。' : '心志溃散，形销骨立。' };
    }
  }

  /* ---------------- 10 · 分层名望增减（含外溢，唯一入口） ---------------- */
  function addFame(s, layer, n) {
    if (!s.fame || !s.fame.hasOwnProperty(layer)) return;
    var v = clamp((s.fame[layer] || 0) + n, 0, 100);
    var gained = v - s.fame[layer];
    s.fame[layer] = v;
    if (gained > 0) {
      if (layer === 'chao') {
        s.fame.zhou = clamp(s.fame.zhou + Math.round(gained * 0.5), 0, 100);
        s.fame.xiang = clamp(s.fame.xiang + Math.round(gained * 0.25), 0, 100);
      } else if (layer === 'zhou') {
        s.fame.xiang = clamp(s.fame.xiang + Math.round(gained * 0.5), 0, 100);
      }
    }
    s._fameTouched = true;
  }

  /* ---------------- 结局 ---------------- */
  function finish() {
    var s = global.G.state;
    if (!s.ending) s.ending = pickEnding(s);
    var e = s.ending || DATA.endings[DATA.endings.length - 1];
    e = Object.assign({}, e, {
      name: e.name || '泯然众人',
      verdict: e.verdict || e.desc || '一生无甚可书。',
      epilogue: e.epilogue || e.text || ''
    });
    return {
      ending: true, data: e, header: buildHeader(s), age: s.age,
      review: review(s), hiddenReveal: hiddenReveal(s), dead: s.dead,
      family: familySummary(s),   // 13 · 新增字段，不改既有字段
      recollections: recollections(s),   // 23-A6 · 口述史：终章前重放三段记忆
      omen: resolveOmen(s)               // 23-A1 · 验谶：应验 / 半应验 / 反谶
    };
  }

  /* 23-A6 · 口述史：从行迹里挑三段关键记忆，附一句"如今再看" */
  var RECALL_NOW = {
    shi: ['如今再看，那一步踏出去，此后的人生都从那里拐了弯。', '后来你才明白，进也是退，退也是进。'],
    li:  ['那几两银子的计较，如今想来竟是要紧的几个夜晚。', '账算得清，命算不清。'],
    xiu: ['那天你没说什么。后来的一生，都是那句没说出口的话在替你说话。', '退的那一步，如今看来是守住了。'],
    yi:  ['那一回胆子大过了头。也可能，刚刚好。', '行险的人不求安稳，只求那一瞬是真的活过。']
  };
  function recollections(s) {
    var cand = s.history.filter(function (h) { return h.dim != null && h.story && h.title; });
    if (cand.length < 3) {
      var extra = s.history.filter(function (h) { return h.dim != null && cand.indexOf(h) < 0; });
      cand = cand.concat(extra);
    }
    cand = cand.slice().sort(function (a, b) {
      var sa = scoreRecall(a), sb = scoreRecall(b);
      return sb - sa;
    }).slice(0, 3).sort(function (a, b) { return a.age - b.age; });
    return cand.map(function (h, i) {
      var pool = RECALL_NOW[h.dim] || RECALL_NOW.xiu;
      return {
        age: h.age, time: h.time, loc: h.loc,
        title: h.title || '', choice: h.choice || '',
        story: h.story || '',
        now: pool[(i + h.age) % pool.length]
      };
    });
  }
  function scoreRecall(h) {
    var d = h.delta || {}, n = 0, k;
    for (k in d) n += Math.abs(d[k] || 0);
    return n + (h.title ? 3 : 0);
  }

  /* 13 · 终章家业摘要 */
  function familySummary(s) {
    var f = s.family || {}, es = s.estate || { tian: 0, pu: 0, shu: 0 };
    return {
      spouse: f.spouse ? { name: f.spouse.name, alive: f.spouse.alive !== false, rel: f.spouse.rel || 0 } : null,
      children: (f.children || []).map(function (c) {
        return { name: c.name, gender: c.gender, age: c.age || 0, grown: !!c.grown, alive: c.alive !== false };
      }),
      estate: { tian: es.tian || 0, pu: es.pu || 0, shu: es.shu || 0 }
    };
  }

  function pickEnding(s) {
    var own = (DATA.dynasties[s.dynasty].endings || []).filter(function (e) { return !e.cond || test(s, e.cond); });
    var generic = DATA.endings.filter(function (e) { return !e.cond || test(s, e.cond); });
    var pool = own.concat(generic);
    if (!pool.length) return DATA.endings[DATA.endings.length - 1];
    pool = pool.slice().sort(function (a, b) {
      var pa = a.pri || 0, pb = b.pri || 0;
      if (pa !== pb) return pb - pa;
      var sa = a.score ? a.score(s) : 0, sb = b.score ? b.score(s) : 0;
      return sb - sa;
    });
    return pool[0];
  }

  function review(s) {
    var lines = [];
    if (s.history.length) {
      var f = s.history[0], l = s.history[s.history.length - 1];
      lines.push('起于' + f.age + '岁，' + f.time + '，' + f.loc + '。');
      lines.push('止于' + l.age + '岁，' + l.time + '，' + l.loc + '。');
    } else {
      lines.push('一生无甚事可记。');
    }
    var c = s.dimCount, top = 'shi', n = -1;
    ['shi', 'li', 'xiu', 'yi'].forEach(function (k) { if ((c[k] || 0) > n) { n = c[k] || 0; top = k; } });
    if (n > 0) lines.push('其行止，偏于「' + DIM_NAME[top] + '」，凡' + n + '次。');
    var npcs = Object.keys(s.npcs).map(function (k) { return s.npcs[k]; }).filter(function (n) { return n.rel >= 50 && n.alive !== false; });
    if (npcs.length) lines.push('至终，' + npcs.map(function (n) { return n.name; }).join('、') + '尚在左右。');
    // 11 · 誓言评语：只叙述，不奖惩
    if (s.vow) {
      var VOW_NAME = { ming: '扬名', fu: '致富', shou: '守心', kuai: '快意' };
      var VOW_ATTR = { ming: 'ming', fu: 'qian', shou: 'xin', kuai: 'xin' };
      var vn = VOW_NAME[s.vow.id] || '';
      var va = s.attrs[VOW_ATTR[s.vow.id]] || 0;
      if (s.vow.broken) lines.push('你立过誓，也忘过它。');
      else if (s.vow.kept && va >= 25) lines.push('你少年时说过要' + vn + '，后来果然如此。');
      else if (va < 25) lines.push('你说要' + vn + '，只是说说。');
      else lines.push('少年时说过要' + vn + '，行到一半，忘了后半句。');
    }
    // 13 · 家业一句（有什么写什么，没有就不写，不判词）
    var fam = s.family || {}, es = s.estate || {};
    if (fam.spouse && fam.spouse.alive !== false) {
      lines.push((s.gender === 'f' ? '夫' : '妻') + fam.spouse.name + '，尚在。');
    } else if (fam.spouse) {
      lines.push('故去的' + (s.gender === 'f' ? '夫' : '妻') + '，坟上草已青了几回。');
    }
    var kids = (fam.children || []).filter(function (c) { return c.alive !== false; });
    if (kids.length) {
      var eldest = kids[0];
      lines.push('子女 ' + kids.length + ' 人，' + eldest.name + '已成人。');
    }
    if ((es.tian || 0) + (es.pu || 0) + (es.shu || 0) > 0) {
      lines.push('遗田 ' + (es.tian || 0) + ' 亩，铺 ' + (es.pu || 0) + ' 间，书 ' + (es.shu || 0) + ' 箧。');
    }
    return { lines: lines, count: s.history.length };
  }

  function hiddenReveal(s) {
    return HIDDEN_KEYS.map(function (k) {
      var v = s.hidden[k];
      var lv = v >= 80 ? '极盛' : v >= 60 ? '厚' : v >= 40 ? '中平' : v >= 20 ? '薄' : '几无';
      return { key: k, name: HIDDEN_META[k].name, value: v, level: lv, text: HIDDEN_META[k].loose };
    });
  }

  /* ---------------- 08 · 观人：把时间换成信息，绝不产出数值 ---------------- */
  var TRAIT_POOL_POS = ['重诺', '厚道', '豁达', '惜才', '守信'];
  var TRAIT_POOL_NEG = ['记仇', '多疑', '墙头草', '凉薄', '寡言'];
  var SECRET_POOL = [
    '他早年亏空过公账，账册还压在旧库里。',
    '他家中长幼不睦，分产的事闹得难看。',
    '他当年那一桩进身之阶，来路并不干净。',
    '他酒后与外人说过上司的昏话，传出去够他喝一壶。'
  ];
  function opinionText(v) {
    if (v >= 40) return '他心里把你排得很前。';
    if (v >= 10) return '他待你，比寻常人近些。';
    if (v > -10) return '他待你，客气而已。';
    if (v > -40) return '他笑的时候，眼睛不动。';
    return '他记着你。';
  }
  function observe(npcId) {
    var s = global.G.state;
    if (!s || s.dead || s.ending) return { ok: false, reason: '此身已了，无处可观。', text: '', revealed: null };
    var n = s.npcs[npcId];
    if (!n) return { ok: false, reason: '眼前没有这个人。', text: '', revealed: null };
    if (n.alive === false) return { ok: false, reason: '人已不在，无处可观。', text: '', revealed: null };
    var stage = Math.floor(s.age / 10);
    var key = '_obs_' + npcId + '_' + stage;
    if (s.flags[key]) return { ok: false, reason: '你已仔细看过他这一回。', text: '', revealed: null };

    s.flags[key] = 1;
    addDays(s, 10);                                   // 代价：旬日
    s.attrs.xin = clamp(s.attrs.xin - 1, 0, 100);     // 代价：心性 −1
    n.revealed = n.revealed || { traits: [], opinion: false, secret: false };
    var revealed = { traits: [], opinionLevel: null, secret: false };
    var parts = [];

    if (Math.random() < (s.hidden.yun + s.attrs.xin) / 200) {
      // 一条尚未揭示的秉性；没有则按观感正负补一条，写进人物对象
      var unseen = (n.traits || []).filter(function (t) { return n.revealed.traits.indexOf(t) < 0; });
      if (!unseen.length) {
        var pool = (n.opinion || 0) >= 0 ? TRAIT_POOL_POS : TRAIT_POOL_NEG;
        var t = pool[rnd(pool.length)];
        n.traits = (n.traits || []).concat([t]).slice(0, 3);
        unseen = [t];
      }
      var got = unseen[rnd(unseen.length)];
      n.revealed.traits.push(got);
      revealed.traits.push(got);
      parts.push('你看了他旬日，看出几分' + got + '的性子。');
      // 他对你的真实观感（只给区间，不给数字）
      n.revealed.opinion = true;
      revealed.opinionLevel = opinionText(n.opinion || 0);
      parts.push(revealed.opinionLevel);
      // 小概率得到把柄（他越不喜你，越容易窥出破绽）
      if (!n.secret && Math.random() < Math.max(0.08, (100 - (n.opinion || 0)) / 100 * 0.35)) {
        n.secret = SECRET_POOL[rnd(SECRET_POOL.length)];
        n.revealed.secret = true;
        revealed.secret = true;
        parts.push('你还窥见他一件不肯示人的旧事。');
      }
    } else {
      parts.push('你看了他旬日，面上客套如常。人到什么时候，心就藏到什么时候——这一回，你什么也没看出来。');
    }
    return { ok: true, text: parts.join(''), revealed: revealed };
  }

  /* ---------------- 对外 ---------------- */
  var G = global.G = {
    DATA: DATA, DAYS: DAYS, ATTR_KEYS: ATTR_KEYS, ATTR_META: ATTR_META,
    HIDDEN_KEYS: HIDDEN_KEYS, HIDDEN_META: HIDDEN_META, DIM_NAME: DIM_NAME,
    state: null, test: test, addDays: addDays, timeText: timeText, stageName: stageName,
    newGame: newGame, next: next, choose: choose, finish: finish,
    randomName: randomName, BENTS: BENTS, resolveIdentity: resolveIdentity,
    addFame: addFame,
    takeOffer: function (id) {
      var s = global.G.state;
      if (!s || !s.offers) return null;
      for (var i = 0; i < s.offers.length; i++) {
        if (s.offers[i].id === id) {
          s.offers.splice(i, 1);
          var ev = byId(s, id);
          return ev ? present(s, ev) : null;
        }
      }
      return null;
    },
    offersOf: function () { return global.G.state && global.G.state.offers || []; },
    header: function () { return buildHeader(global.G.state); },
    refreshClock: refreshClock,
    npc: function (s, id, def) {
      if (!s.npcs[id]) s.npcs[id] = {
        name: def && def.name ? def.name : id, rel: 0, alive: true,
        opinion: 0,     // 他对你的观感（不直接显示，观人后才可见区间）
        traits: [],     // 秉性，最多 3 条，观人逐步揭示
        met: 0,         // 见过几面
        secret: null,   // 把柄，观人后才可能得到
        history: []     // 与你往来的短句记录
      };
      // 08：choose() 结算期间触及的人物要记 met（通过 _touched 标记）
      if (s._touched) s._touched[id] = 1;
      if (def) Object.keys(def).forEach(function (k) { if (s.npcs[id][k] == null) s.npcs[id][k] = def[k]; });
      return s.npcs[id];
    },
    observe: observe,
    weightOf: weightOf
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = G;
})(typeof window !== 'undefined' ? window : globalThis);
