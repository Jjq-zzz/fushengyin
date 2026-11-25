/* 「新」朝代内容包：符命改了天下，天下不认 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.xin = {
    id: 'xin', name: '新',
    clock: { year: 1, season: 0 }, eras: [],
    events: [
      { id: 'xin_wangtian', title: '王田令', tags: ['朝堂风波'], weight: 11,
        story: '王田令下：天下田改称王田，买卖禁止。\n你家刚买的两亩地在册上成了「王田」。官吏说这是均平，乡人说这是抢——抢完再看，田还是那些田，人心换了一批。',
        options: [
          { t: '遵令申报田亩', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 4; s.attrs.qian -= 4; s.flags['报王田'] = 1; return '你头一批申报了。官吏夸你懂法。半年后王田令松动，你先报的田先还了回来——守法的人，在新朝也吃香。'; } },
          { t: '隐匿不报，等令废', dim: 'yi', time: '一月', fx: function (s) { s.hidden.yin -= 5; s.attrs.qian += 3; if (Math.random() < 0.6) return '你匿下了。令果然没撑几年，你赌赢了。乡里后来管赌赢的人叫「先觉」。'; s.attrs.ming -= 8; s.flags['匿田事发'] = 1; return '查出来了。田充公，人罚役。罚完那天令也废了——你笑不出来。'; } },
          { t: '低价收难民之田', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 8; s.flags['乘乱收田'] = 1; return '流民过境，贱卖的田你收了五块。令下又废，田还是你的。你成了乡里的富户，也成了井水边的话题。'; } },
          { t: '代乡邻打官司争田', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 6); s.attrs.ming += 3; return '你把新法条文读得比官吏还熟，替七户人把田争了回来。官吏恨你，乡人供你。'; } }
        ] },
      { id: 'xin_fuming', title: '符命', tags: ['鬼神', '朝堂风波'], weight: 10,
        story: '各地「符命」迭出：挖出的石头上刻着字，井里的水浮着丹书。\n郡县催呈祥瑞，报上去有赏——石头是真的，字是谁刻的，没人问。',
        options: [
          { t: '献石报瑞', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 6; s.flags['献符'] = 1; return '你请人刻了块石，报了上去。赏贝下来了。夜深时你偶尔会想：天下就靠这些石头撑着？'; } },
          { t: '拒报，直言其伪', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 9; s.attrs.ming -= 5; s.hidden.yun -= 5; return '你说石上的字纹路太新。郡吏变了脸。符命照献，你的名字上了另一本册子。'; } },
          { t: '借献符之路进身', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 4; s.hidden.yin -= 4; return '你献符时附了一篇颂文，文采被上头看中，召你入郡为吏。石头是假的，文章是真的。'; } },
          { t: '暗里造符，卖符敛财', dim: 'yi', time: '半月', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 8; s.flags['造符'] = 1; return '你成了造符的行家，手艺好到官吏都来订。这行当干得越久，你越信不信符命，自己都糊涂了。'; } }
        ] },
      { id: 'xin_bibi', title: '币乱', tags: ['日常', '灾祸'], weight: 10,
        story: '币制改了四回，钱越铸越薄。\n市上的贝币、刀币、大泉混着用，买东西像猜谜。最后定的「大泉五十」，一枚当五十用——市人用脚投票，米价先涨为敬。',
        options: [
          { t: '囤实货，避虚币', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 8; s.attrs.cai += 3; s.flags['囤货避币'] = 1; return '你把新钱到手就换成盐、谷、布。币又改时，你的货没贬值。乡里的账，你越算越精。'; } },
          { t: '以旧钱交易，对抗新令', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming -= 2; s.hidden.yin -= 4; s.flags['拒新币'] = 1; if (Math.random() < 0.55) return '市人慢慢都跟着你用旧钱。官府禁了几次，禁不住——钱认分量，不认诏书。'; s.attrs.qian -= 6; return '官府突查市集，你的旧钱被没收一半，人还挨了鞭子。钱认分量，鞭子认人。'; } },
          { t: '帮邻里算清币值', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 5); return '你编了个换算的歌诀教给市人。此后集市上吵架的少了——会算账的人，脾气都好些。'; } },
          { t: '举报囤积的商人', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 4; s.hidden.yin -= 10; s.flags['告商'] = 1; return '你举报了三家囤货的，得了赏。半年后币再改，轮到你囤的那批货烂在了手里——报应来得不快，但很准。'; } }
        ] },
      { id: 'xin_liumin', title: '流民', tags: ['灾祸', '日常'], weight: 10,
        story: '旱蝗连年，流民过境如水。\n起初几十人一伙，后来几百人一伙。县里让他们「就地安置」——安置的意思是：别到城里来。',
        options: [
          { t: '开粥棚安置过境者', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 8; s.hidden.yin += 10; G.addFame(s, 'xiang', 6); return '你的粥棚撑了三十日。流民走了，留下三个能干活的后生——后来成了你家最得力的帮手。'; } },
          { t: '驱赶，护自家粮囤', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming -= 4; s.hidden.yin -= 5; s.attrs.xin -= 3; return '你带人守住了粮囤。流民绕过你家走了。那年冬天没出事——你防的祸没来，心防却一直没拆。'; } },
          { t: '收流民为佣，便宜用工', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 4; s.flags['佣流民'] = 1; return '你雇了十个流民开荒，管饭少给钱。荒地开了，你的仓满了。流民们学会了你的法子，后来各自成了小地主——他们不再恨你，但他们记得。'; } },
          { t: '随流民同去他乡寻活路', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ti -= 4; s.hidden.yun += 6; s.flags['流浪'] = 1; return '你跟着流民走了四百里，见过新法之下各地的光景。回来后你比谁都明白：这朝撑不了几年了。'; } }
        ] },
      { id: 'xin_lülin', title: '绿林风声', tags: ['边境战事', '灾祸'], weight: 9, minScene: 8,
        story: '山里聚了绿林，郡县讨伐不利。\n绿林不打穷村，专打富户与官仓。你家的光景，在村里排前三。',
        options: [
          { t: '散财结好，买条路子', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 8; s.hidden.yun += 6; s.flags['结绿林'] = 1; return '你托人送了两车粮上山。此后你家门前的路，夜里太平了。这钱花的，比雇家丁便宜，也比雇家丁危险。'; } },
          { t: '筑坞自守，练乡勇', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 5; s.attrs.xin += 6; G.addFame(s, 'xiang', 6); return '你领着乡人筑了坞堡，练了四十个乡勇。绿林来试探过一次，没讨到好——坞堡的名字传开了，你成了乡里的头。'; } },
          { t: '入山入伙', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 4; s.attrs.qian += 8; s.hidden.yin -= 8; s.flags['落草'] = 1; return '你入了伙，分了两票的财。山上讲义气，也讲刀快。半年后你觉得刀太快了，下了山——下山的人，山上记着。'; } },
          { t: '向郡守献剿抚之策', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.hidden.yun -= 4; s.flags['献策'] = 1; return '你的策被采纳了一半：抚其饥者，剿其暴者。策行之后贼势稍减——绿林也记住了那个出主意的人。'; } }
        ] },
      { id: 'xin_gaiming', title: '改名', tags: ['日常'], weight: 8,
        story: '朝廷改天下地名，你的家乡从此有了三个名字：旧的、新的、和最新的。\n官文书用新名，百姓用旧名，书信里两边混用——收信人靠猜。',
        options: [
          { t: '做个对照册，赠予乡人', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 5); return '你把新旧地名对照成册，市亭里贴了一份。此后县里递错文书的事少了一半——县令惊讶，乡人感谢。'; } },
          { t: '沿用旧名，不认新名', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin += 4; s.attrs.ming -= 2; s.flags['守旧名'] = 1; return '你写信、立契都用旧名。官府纠正过几次，你改了又用回。地名的固执，是人心最后的固执。'; } },
          { t: '借改名做买卖的名号', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 2; return '你把铺子的字号改成新朝的官名，官吏进门都客气三分。牌子换了字，货没换——买卖照做。'; } },
          { t: '什么都不做，等下一次改', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.hidden.zhi += 3; return '你赌对了：一年后地名又改回来了。什么都没做的人，成了全乡反应最快的人——这是个冷笑话。'; } }
        ] },
      { id: 'xin_liüling', title: '六筦', tags: ['朝堂风波'], weight: 9, minScene: 8,
        story: '朝廷六筦：盐、铁、酒、铸钱、名山大泽、五均赊贷，皆收官营。\n你家的酿酒坊在名单上。官吏说：可以「合作」，四六分账——官六，你四。',
        options: [
          { t: '接受官营合作', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 3; s.attrs.ming += 3; s.flags['官营四六'] = 1; return '你把坊交了出去，自己做了工头。酿的酒还是那些酒，利少了一大半——但作坊保住了，你也保住了。'; } },
          { t: '偷偷私酿，走黑市', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 8; s.flags['私酿'] = 1; if (Math.random() < 0.7) return '私酒走夜路卖了半年，利是官营的三倍。你雇的脚夫嘴都很紧——钱能雇住嘴，也能雇住别的事。'; s.attrs.ming -= 10; s.flags['私酿事发'] = 1; return '私酿坊被端了。你罚了钱，坊没了。那批酒客转去了别家——你的亏，别人补上了。'; } },
          { t: '转行，改做不筦的买卖', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 4; return '你把工坊改成织布——六筦没管到布。两年后你的布行开了三间铺，旧同行还在给官府打工。'; } },
          { t: '联合同行上书请废', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 5; s.hidden.yun -= 5; s.attrs.qian -= 3; return '你联络了七家联名上书。书递上去了，人也被记下了。半年后六筦松动——没人说是因为你们，你们自己信了。'; } }
        ] },
      { id: 'xin_kumiao', title: '哭庙', tags: ['朝堂风波', '灾祸'], weight: 8, minScene: 10,
        story: '兵败的消息传到郡城，有人在市上哭，说天命要改了。\n哭的人越来越多，官吏弹压不住。哭庙成了罪，也成了祭——看你站在哪边。',
        options: [
          { t: '随众哭，哭完回家', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.yun -= 3; s.flags['哭过'] = 1; return '你哭了一场。哭完心里松了些——十年的新法，原来大家都在等一个结束。'; } },
          { t: '组织乡人早做准备', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 6); s.attrs.qian -= 3; return '你说：改朝的日子快了，先修坞、先存粮、先结邻。乡人照办了。两年后大乱过境，你乡完好。'; } },
          { t: '押注新贵，献城投诚', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 8; s.flags['投新主'] = 1; if (Math.random() < 0.55) { s.attrs.qian += 6; return '你把郡城的布防图献给了围城的义军。城破那天你受了职——旧朝的名册上，你的名字被朱笔勾掉了。'; } s.attrs.ming -= 8; return '你押的那支义军，一个月后被剿了。你在逃亡路上把所有能证明你身份的东西都烧了。'; } },
          { t: '闭门著文，记下这十年', dim: 'yi', time: '一季', fx: function (s) { s.attrs.cai += 8; s.hidden.zhi += 6; s.flags['记事'] = 1; return '你把新朝十年的事一样一样写下来：令、币、民、乱。写完你读了一遍，说：后人会需要这个。后来果然需要——书是你孙子传出去的。'; } }
        ] }
    ],
    main: [
      { id: 'xin_m1', title: '改制之年', after: 0, time: '旬日',
        story: '新朝立，改制如潮：改官名、改地名、改币制、改田制。\n你家乡的县衙换了匾，里正换了人，市上的钱换了样。老人说：改来改去，庄稼照旧长。\n你说不清这年是好是坏——只知道什么都得重新学一遍。',
        options: [
          { t: '把新法逐条学透', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 3; s.flags['通改制'] = 1; return '你抄了新法的全文，一条条注解。乡人有事都来问你——改制之年，懂法的人比有粮的人吃香。'; } },
          { t: '守旧业，以不变应万变', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; return '你不赶新潮。一年后许多赶潮的人回头找你借种子——不变的人，攒下了变化中唯一的东西。'; } },
          { t: '趁改制的乱头牟利', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 6; s.flags['乱中取利'] = 1; return '官名换、币换、地价乱，你在乱里换了三手货。乱世是生意人的春天——和冬天。'; } },
          { t: '站到改制官吏的一边', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 5; s.flags['佐改制'] = 1; return '你做了新法之乡的里正。官府说你得力，乡人说你变脸。两边的账，你各记一半。'; } }
        ] },
      { id: 'xin_m2', title: '天命之问', after: 12, time: '一月',
        story: '盗贼蜂起，四境糜烂。\n有游士过你家门，说：王莽的符命是真的，天下却是假的——真符命治不了假天下。你若掌权，先改什么？\n这一问，问住了路过的人，也问住了你。',
        options: [
          { t: '答：先罢苛令，还田于民', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 6; s.flags['答天命'] = 1; return '游士听完，把你的答案记在了袖中的册子上。他说：若有一日天下重问，我会念这一条。'; } },
          { t: '答：天命不在改，在养', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 7; s.attrs.cai += 4; return '你说：法如刀，养民如地。刀再快，割不动没长好的地。游士点头而去，没记你的名字——这类答案，他见得多。'; } },
          { t: '答：先聚兵，乱世唯力耳', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 6; s.hidden.yun -= 3; return '游士看了你半晌，说：你这答案能成事，也能祸世。他说完走了。你把这句话想了三夜。'; } },
          { t: '不答，只请他吃了一顿饭', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian -= 2; s.hidden.yin += 5; s.hidden.yun += 4; return '你什么也没答，添了副碗筷。游士吃完说：天下的答案，都在饭碗里。他后来发达了，托人给你捎了一车粮。'; } }
        ] }
    ],
    endings: [
      { name: '改制遗才', group: '新显', pri: 66,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.8 + (s.flags['通改制'] ? 12 : 0) + (s.attrs.xin - 50) * 0.6 + (s.dimCount.cai || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '新朝十五年，他学会了在变的天下里做不变的人。',
        epilogue: '新朝亡了。新朝立的学官废了，新铸的钱废了，新改的地名废了。\n只有你按新法格式整理的田册，被下一个朝代的官吏沿用着——他们说：这册子好用。\n制度比朝命长命。你比制度也长命。' },
      { name: '符命之世', group: '新中', pri: 50,
        score: function (s) { var v = (100 - s.attrs.ming) * 0.3 + (s.flags['献符'] || s.flags['造符'] ? 14 : 0) + (s.hidden.yun - 40) * 0.3; return Math.max(0, Math.min(100, v)); },
        verdict: '他亲眼看石头说话，又亲眼看石头沉默。',
        epilogue: '你晚年常给别人讲符命年代的荒唐事，讲得绘声绘色。\n有年轻人问：那些石头，就没有一块是真的？\n你想了想，说：有一块。哪一块？我刻的那块最真——至少石头是真的。' }
    ]
  };
})(window.GAME_DATA);
