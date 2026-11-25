/* 「明」朝代：洪武法严，厂卫暗行。海禁之下私贸暗涌，科场与党争皆是刀口。 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.ming = {
    id: 'ming', name: '明',
    clock: { year: 1, season: 0 },
    eras: [
      { name: '洪武', span: 8 }, { name: '建文', span: 4 }, { name: '永乐', span: 22 },
      { name: '洪熙', span: 1 }, { name: '宣德', span: 10 }, { name: '正统', span: 14 },
      { name: '景泰', span: 7 }, { name: '天顺', span: 8 }, { name: '成化', span: 23 },
      { name: '弘治', span: 18 }, { name: '正德', span: 16 }, { name: '嘉靖', span: 45 }
    ],
    events: [
      {
        id: 'ming_huang', title: '黄册', weight: 11, tags: ['日常'], minScene: 1,
        time: '一月', loc: '应天·上元县',
        story: '里甲造册，一年一度。书手把黄册摊在祠堂的长案上，一村一村问下去：几口人，几亩田，几头牛。\n问到你家时，里正抬眼看了一下，压低声音说：你家那两亩新垦的坡地，报不报？报了要起税，不报，日后查出来是要充军的。',
        options: [
          { t: '照实报上，一文不瞒', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 4; s.attrs.qian -= 6; s.hidden.yin += 8; s.flags['黄册实名'] = 1; return '里正把笔一顿，记下了。旁人说你傻：这两亩坡地，报上去就是替官府种。可你看着册子上自己的名字，觉得踏实。'; } },
          { t: '少报一亩，留一线活路', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 3; s.flags['黄册少报'] = 1; return '里正笑了，把数目改了。你家少纳一亩的税，也少了一亩的名分。这册子五十年一改，五十年内，那一亩地等于不存在。'; } },
          { t: '退出祠堂，让父亲自己去应', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.attrs.ming -= 2; return '你退到阶下，蹲着听里头一问一答。问到你家时，父亲把两亩坡地照实报了。回家路上他一句话也没说，你也没有问。'; } },
          { t: '反问他：那些乡绅的田，报了几成', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 8; s.attrs.ti -= 2; s.hidden.zhi += 6; s.flags['顶撞里正'] = 1; s.flags['与乡绅结怨'] = 1; return '祠堂里静了一瞬。里正的脸色很难看，说：你这话，是哪个教你的。他没有回答你的问题，但那一日之后，村里人都记住了你。'; } }
        ]
      },
      {
        id: 'ming_jun', title: '军帖', weight: 10, tags: ['边境战事'], minScene: 2,
        time: '两月', loc: '应天·卫所',
        story: '卫所缺人，要从民户中佥点军户。你家的名字在册上，理由写得很简单：丁多。\n军户世袭，一旦入了军籍，子子孙孙都是兵。有人劝你：花点钱，把名字换掉。',
        options: [
          { t: '拿钱打点，把名字换下来', dim: 'li', time: '一月', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.ming -= 4; s.hidden.yin -= 6; s.flags['免军籍'] = 1; return '名字换成了邻村一个寡妇人家的独子。他走那日，站在卫所门口回头看了一眼，那一眼你记了很多年。'; } },
          { t: '认了，去卫所当一名军丁', dim: 'xiu', time: '两载', fx: function (s) { s.attrs.ti += 8; s.attrs.ming += 6; s.attrs.xin += 4; s.flags['军籍'] = 1; var n = G.npc(s, 'wei', { name: '卫所老军', rel: 20, alive: true }); n.rel = Math.max(n.rel || 0, 20); n.note = n.note || '卫所里教你活命的老军'; return '你领了刀，学了操。卫所的日子苦，粮饷常拖，可老兵们待你不坏。有个姓魏的老军教你如何在阵上活下来：不要冲在最前，也不要落在最后。'; } },
          { t: '报名去北平，投燕王麾下', dim: 'shi', time: '两载', fx: function (s) { s.attrs.ti += 6; s.attrs.ming += 8; s.attrs.qian += 6; s.flags['军籍'] = 1; s.flags['北边'] = 1; return '北平和应天不一样，风硬，人也硬。你在燕王的营里待了两年，见惯了刀，也见惯了人心。有人私下说：燕王要反。'; } },
          { t: '连夜逃出应天，改名换姓', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming -= 12; s.attrs.qian -= 6; s.hidden.yun -= 6; s.flags['逃军'] = 1; return '你走了。走出城门口时，天还没亮。此后你叫了另一个名字，说话也换了腔。可你每回听见马蹄声，都要先看看左右。'; } }
        ]
      },
      {
        id: 'ming_yan', title: '严七', weight: 10, tags: ['灾祸'], minScene: 3,
        time: '一月', loc: '应天·城南',
        story: '严七是应天府的一名快手，腰上挂一块牌子，走过的地方，摊子都要收一收。\n他来你家，不为什么大事，只说：最近上头查海禁，你家那条船，出过海没有？他问得很随意，眼睛却盯着你的脸。',
        options: [
          { t: '奉上十两，请他吃碗茶', dim: 'li', time: '一月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 25; s.flags['严七收钱'] = 1; return '严七把银子在手里掂了掂，收进袖中，说：你家的船，我看着干净。往后有风声，我先告诉你。这话是护身符，也是绳子。'; } },
          { t: '照实说，家里有条跑过南洋的船', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 4; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8; s.flags['自陈海船'] = 1; return '严七愣了一下，倒笑了：你这人，倒是实诚。他记了一笔，走了。三日后，那条船被封了，可你没有下狱。'; } },
          { t: '反问他：你收了谁家的钱，来查我', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 6; var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 25; s.flags['与严七结怨'] = 1; return '严七脸上那点笑没了。他站了半晌，只说了句：你胆子不小。他走后，你家的门环上多了一道刀痕。'; } },
          { t: '请他坐下，问他海禁到底禁的是什么', dim: 'xiu', time: '数日', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 6; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10; s.flags['知海禁底细'] = 1; return '严七说了半个时辰。禁的从来不是海，是海上的钱和海上的人。他说完自己也有点意外，站起身来，说：这些话，你别同旁人说。'; } }
        ]
      },
      {
        id: 'ming_si', title: '诏狱', weight: 9, tags: ['朝堂风波'], minScene: 4,
        time: '两月', loc: '应天·锦衣卫狱外',
        story: '城中一夜抓了三十几个人。都是从前的旧官、读书人、商户。罪名含糊：交通不法，诽谤朝政。\n你认得其中一个，姓方，是个教书先生，从前替你写过一封书信。他的妻子跪在你门前，说：求你替他家收个尸。',
        options: [
          { t: '应下，去狱外守着', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.attrs.ti -= 4; s.hidden.yin += 14; s.hidden.zhi += 6; s.flags['替人收尸'] = 1; return '你在狱外守了两月。方先生死在里面，尸首从侧门抬出来，只盖了一张草席。你替他收了，葬在城外。他妻子磕了三个头，什么也没说。'; } },
          { t: '去衙门口问一句罪名', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 6; s.hidden.zhi += 4; s.flags['问罪名'] = 1; return '你在衙门外站了半日，等到一个肯说话的吏。他说：罪名上头定的，我们也说不清。你问：那他要关多久。他看了看左右，低声说：这种案子，没有"多久"。'; } },
          { t: '托严七使钱，把尸首买出来', dim: 'li', time: '一月', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 4; s.hidden.yin += 8; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 12; s.flags['买尸'] = 1; return '严七收了钱，第二日就把人弄出来了。他说：这种事，一年有几回，你要是心软，早晚把自己搭进去。你说：我知道。'; } },
          { t: '把方先生家的书稿藏起来，留一份', dim: 'xiu', time: '一月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 6; s.hidden.yin += 10; s.flags['藏书稿'] = 1; return '你摸黑进了他家，把一箱书稿搬走，埋在自家后院。二十年后，这箱东西见了天日。'; } }
        ]
      },
      {
        id: 'ming_wei', title: '倭警', weight: 9, tags: ['边境战事'], minScene: 5,
        time: '两月', loc: '松江·海口',
        story: '海上来了几十条船，说是倭寇。他们在岸上抢了三日，县里的兵不敢出城。\n盐商们聚在祠堂里议事：是凑钱买平安，还是自己募丁守海口。有人说，这是官府的事。也有人说，官府早就不管了。',
        options: [
          { t: '出钱募丁，守着海口', dim: 'yi', time: '两月', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.ming += 12; s.hidden.yin += 12; s.attrs.ti += 2; s.flags['守海口'] = 1; return '募了三十个人，守了两个月。倭船没敢靠岸。事后有人说你傻，官军都不管的事，你出钱。可海口的渔户见了你，会喊一声"东家"。'; } },
          { t: '凑钱买平安，给倭首送银子', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 15; s.attrs.ming -= 4; s.hidden.yin -= 8; s.flags['通倭'] = 1; return '银子送出去了，海面果然安静了半年。可你心里明白：这门一开，往后年年都得送。'; } },
          { t: '把倭寇的船数、人数据实报官', dim: 'shi', time: '两月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 6; s.flags['报倭情'] = 1; return '文书递上去，过了三个月才有一小队官军来。他们看了看海口，又走了。但你的名字，记在了兵备道的册子上。'; } },
          { t: '关门闭户，等海面平静', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.xin += 5; s.attrs.qian -= 4; return '你把门板上了，把货藏进地窖。两个月里，海上来了又走，走了又来。等地窖的门再打开时，货还在，人也没少。'; } }
        ]
      },
      {
        id: 'ming_ke', title: '八股', weight: 9, tags: ['日常', '朝堂风波'], minScene: 3,
        time: '一季', loc: '应天·贡院外',
        story: '贡院外挤满了人。有人抱着书箱，有人抱着酒坛，还有人在墙根下哭——那是不第的。\n你手上也有一份墨卷，是自己这三年最得意的。只是这一次，题目出得偏，恰好是你最不熟的那一题。',
        options: [
          { t: '凭真本事，硬写', dim: 'xiu', time: '一季', req: { cai: 50 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.attrs.xin += 4; s.flags['应试'] = 1; return '你把原来的思路丢开，从破题处另起。写得极险，也极痛快。出考场时天已黑了，你自己也不知道能不能中。'; } },
          { t: '托人递夹带，求个稳妥', dim: 'li', time: '一季', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.ming += 5; s.hidden.yin -= 10; s.flags['科场夹带'] = 1; return '夹带藏得很好，一路无惊。题目答得很圆，圆到毫无破绽。回来后你把这些年写的文章都烧了。'; } },
          { t: '写一半，把最能说的那半说完就走', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 6; s.hidden.zhi += 8; s.flags['狂卷'] = 1; return '你只写了三百字，把破题与承题写到极处，末尾留了一句：余意未尽。主考后来把那卷子看了三遍。中是没有中，可那份卷子在士子间传了很久。'; } },
          { t: '不考了，投到按察使幕中', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.attrs.qian += 10; s.flags['入幕'] = 1; return '你收拾了书箱，去投了按察使的幕。幕里的公文比八股难，也比八股实。你替东家拟稿、算账、断是非，两年下来，比同年的进士更懂这天下怎么运转。'; } }
        ]
      },
      {
        id: 'ming_hai', title: '下洋', weight: 8, tags: ['江湖奇遇'], minScene: 6,
        time: '三年', loc: '刘家港',
        story: '宝船又要出洋了。船队要招民间的火长、通事、匠人。有人劝你去：一趟下来，赏钱够买十亩地。\n可海上的事，十去七不回。你母亲已经在替你缝冬衣了。',
        options: [
          { t: '随船出洋，赌这一趟', dim: 'yi', time: '三年', fx: function (s) { s.attrs.qian += 30; s.attrs.cai += 8; s.attrs.ti -= 6; s.hidden.yun += 8; s.flags['下过西洋'] = 1; return '三年。你见过海上的月亮，见过别国的城，见过船上的坟。回来那日，船队少了三条船。你把赏钱交到母亲手里，她没接，先抱住你，哭了很久。'; } },
          { t: '不入船队，替他们备货', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 18; s.attrs.cai += 4; s.flags['供船货'] = 1; return '你替船队备了三年的货。瓷、铁锅、绸缎、药材。船未出海，你的钱袋先满了。远航的风险，让别人去担。'; } },
          { t: '做个火长，把手艺学足', dim: 'shi', time: '三年', fx: function (s) { s.attrs.cai += 10; s.attrs.ti -= 3; s.attrs.ming += 6; s.flags['习海图'] = 1; s.flags['下过西洋'] = 1; return '你跟着老火长学看星、记风、辨水色。三年后，你能凭北斗与海水的咸淡，说出一条船在何处。这门手艺，大明再没有几个人会。'; } },
          { t: '只送到海口，回头就走', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 4; s.attrs.qian += 4; return '你在刘家港送船队出海，看着帆影一点点小下去。你没有上船。此后每年都有船队出去，也每年都有人不回来。'; } }
        ]
      },
      {
        id: 'ming_mu', title: '土木', weight: 9, tags: ['朝堂风波'], minScene: 8, time: '一年', loc: '京师',
        story: '皇帝亲征，二十万大军出关。城里人心惶惶，粮价一日三涨。\n没过多久，前线传来消息：大军溃了，皇帝落入敌手。接着又传：京中有人主张南迁。',
        options: [
          { t: '捐粮助守，力主固守京师', dim: 'yi', time: '一年', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.ming += 14; s.hidden.yin += 14; s.hidden.zhi += 6; s.flags['守京师'] = 1; return '你把仓里的粮捐了出去。城中的青壮都上了墙，夜里点着火把，像一条烧红的线。后来于谦真的守住了。此后你走在街上，有人会对你抱一抱拳。'; } },
          { t: '举家南迁，避这趟浑水', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming -= 8; s.hidden.yin -= 6; s.flags['南迁'] = 1; return '你走了。走到徐州时听说京师守住了，你站在客栈的窗前，忽然不知道该往哪里去。'; } },
          { t: '把家中的子弟送上城头', dim: 'shi', time: '一年', fx: function (s) { s.attrs.ti -= 4; s.attrs.ming += 10; s.hidden.yin += 8; s.flags['子弟守城'] = 1; return '你把两个子侄送上了城头。他们都不知道，你送他们的时候，站在城门下站了一个时辰，什么也没说。'; } },
          { t: '把家人送到乡下，自己守着宅子', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 6; s.attrs.qian -= 6; s.hidden.yun += 3; return '你把妻儿送到城外族里，自己留下看宅。城中一日三惊，你每日扫地、关门、听更。守住城的那日，你站在院里，看见第一面旗子从城头升起来。'; } }
        ]
      },
      {
        id: 'ming_ting', title: '廷杖', weight: 8, tags: ['朝堂风波'], minScene: 6,
        time: '一月', loc: '京师·午门外',
        story: '一个御史上了疏，参了当朝的首辅。皇帝大怒，命在午门外廷杖。\n行刑的时候，围观的人挤了半条街。有人低着头，有人偷偷数着板子。打到三十，那御史已经不出声了。',
        options: [
          { t: '挤到前头，替他喊一声冤', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 10; s.attrs.ti -= 6; s.hidden.zhi += 8; s.hidden.yun -= 4; s.flags['午门喊冤'] = 1; return '你喊了一声。四下静了一瞬，随即有人跟着喊了几句。板子停了一下，又落下去。那御史后来没死，被贬去了边地。走那日，他朝你的方向拱了拱手。'; } },
          { t: '记下执刑的人，日后再说', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 4; s.hidden.zhi += 6; s.flags['记下仇家'] = 1; return '你把执刑的锦衣卫校尉、监刑的太监、站在阶上的几个人，一个一个记在心里。这世上很多事，当时做不了，不代表日后做不了。'; } },
          { t: '扶他家里人一把，别让人看见', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.qian -= 10; s.hidden.yin += 12; s.flags['暗中周济'] = 1; return '你托人给御史家送了些米和药，不留名。他家的老仆在门口候了三日，想看看是谁，没等着。'; } },
          { t: '打听那御史的宅子，贱价买下', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 16; s.attrs.ming -= 4; s.hidden.yin -= 8; s.flags['买罪臣宅'] = 1; return '御史还没死，宅子已经有人替他"料理"了。你托中人去问，价钱压到了三成。契约写的是"自愿让售"。你收钥匙那日，院里的桂花正开着。'; } }
        ]
      },
      {
        id: 'ming_li', title: '里甲', weight: 9, tags: ['日常'], minScene: 3,
        time: '一季', loc: '应天·乡里',
        story: '一家逃了，全甲赔补。这是里甲的老规矩。\n甲里十户，今年逃了两户。该出的税、该服的役，摊到剩下八户头上。八户人坐在祠堂里，谁也不说话。',
        options: [
          { t: '把逃户的田接下，连税一并担了', dim: 'li', time: '一季', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 6; s.flags['接逃户田'] = 1; return '你把那两户的田接了下来。田不好，税却不轻。有人说你贪，你不辩。三年后那两户回来，田已经是你的了。'; } },
          { t: '领头去县里求减免', dim: 'shi', time: '一季', req: { cai: 32 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 8; s.hidden.yin += 6; s.flags['求减免'] = 1; return '状子递上去，县里批了个"减半"。八户人凑钱谢你，你只收了一坛酒。'; } },
          { t: '把自己那一份赔上，不让旁人受累', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.qian -= 14; s.attrs.ming += 6; s.hidden.yin += 12; return '你把自家的粮拿出来，替两户逃户垫了。祠堂里的人都看着你，有人低下头。那年冬天你家喝粥，可走在村里，人人让路。'; } },
          { t: '领着八户人，把摊派的文书退回去', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 6; s.hidden.zhi += 6; s.attrs.ti -= 2; s.flags['退文书'] = 1; s.flags['抗摊派'] = 1; return '八户人跟着你去了县里，文书原封退在案上。县官拍了桌子，说：你们这是抗粮。你说：逃户的粮，我们已经在赔了，再摊，是要逼死剩下的人。那一季的役，最后减了三成。'; } }
        ]
      },
      {
        id: 'ming_yao', title: '夜诊', weight: 8, tags: ['鬼神异闻'], minScene: 5,
        time: '数日', loc: '应天·城西',
        story: '三更有人叩门，说家里孩子病得重，求你去看看。你不懂医，可这条巷子里没有别人识得几个字。\n门外站着个穿青衣的妇人，脸看不太清。她手里提着一盏灯，灯焰是青的。',
        options: [
          { t: '跟她走一趟', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.yun += 6; s.hidden.yin += 6; s.flags['夜诊'] = 1; return '走了很久，路越走越陌生。到了地方，屋里只有一个睡着的孩子，额上全是汗。你替他擦了汗，喂了点水。天亮你醒来，自己躺在城西的破庙里，手里攥着一枚旧铜钱。'; } },
          { t: '请她另寻郎中，塞给她些钱', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian -= 5; s.attrs.xin += 3; return '你把钱递过去。她没接，只看了你一眼，转身走进了雨里。第二日听说城西有个孩子夜里死了，才七岁。'; } },
          { t: '关上门，念一段经文', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 3; s.attrs.xin += 4; s.hidden.yun += 3; return '你在门内念了半宿的经。门外没有声音。天亮开门，门槛上留着一小滩水，水里有一片青色的灯花。'; } },
          { t: '喊起邻里，一起去看', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.attrs.ti -= 2; s.flags['聚众夜行'] = 1; return '你敲了七八家的门，一群人举着火把跟着那妇人走。走到半路，她不见了。众人骂骂咧咧地散了，可第二日，城西那家的孩子真好了。'; } }
        ]
      },
      {
        id: 'ming_hun', title: '婚书', weight: 8, tags: ['情缘', '日常'], minScene: 6, age: [18, 34], cond: { noflag: '成家' },
        time: '半载', loc: '应天·城南',
        story: '媒人来了三回。第三回带来的是城南米行家的女儿，据说性子安静，识得几个字。\n父母之命，媒妁之言。你只在庙会上远远看过她一眼，穿青色的衫子，正在挑一支簪。',
        options: [
          { t: '应下，好好过日子', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 8; s.attrs.qian -= 8; s.attrs.ming += 4; s.flags['成家'] = 1; G.marryTo(s, '妻', -2, 45); return '婚书写得很工整。拜堂那日，她低着头，你看见她手里攥着那支庙会上挑的簪。此后二十年，她一直戴着。'; } },
          { t: '先见一面，问问她自己的意思', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 4; s.attrs.xin += 6; s.flags['成家'] = 1; G.marryTo(s, '妻', -2, 55); return '你托人递了话。她在屏风后头说了一句：我没什么意思，只求往后别受气。你笑了，说：不会。这门亲事，后来过得很好。'; } },
          { t: '推了，说要先考功名', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 5; s.hidden.zhi += 6; s.flags['辞婚'] = 1; return '你推了。媒人走时脸色不太好看。夜里你在灯下读书，读到一半，忽然想起她挑簪子的样子。'; } },
          { t: '应下，顺带把米行的生意接过来', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 18; s.attrs.ming += 4; s.attrs.xin -= 4; s.flags['成家'] = 1; G.marryTo(s, '妻', -2, 20); return '婚事办了，米行的生意也顺理成章地交到你手上。岳父说你是个能办事的。她坐在屋里，话很少。'; } }
        ]
      },
      {
        id: 'ming_goubu', title: '勾补', weight: 11, tags: ['日常', '灾祸'], minScene: 2,
        time: '两月', loc: '应天·族中',
        story: '军户的丁册上少了一个名字，卫所便来勾补。\n勾的是你族里一个远房侄儿。他父亲早年死在辽东，家里只剩一个瞎眼的祖母。\n差役把文书摊在桌上，说：三日之内，人要到。',
        options: [
          { t: '去卫所翻册，看能否销籍', dim: 'shi', time: '两月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.attrs.qian -= 6; s.flags['查军册'] = 1; return '你在卫所的库房里翻了四日的旧册，翻到一页写着"绝嗣"两个小字，墨已经淡了。你把它抄下来，递上去。差役看了半晌，说：早说啊。这一户，就这么销了。'; } },
          { t: '出钱，买别家的名字顶上', dim: 'li', time: '一月', req: { qian: 26 }, fx: function (s) { s.attrs.qian -= 26; s.hidden.yin -= 10; s.attrs.ming -= 2; s.flags['买丁'] = 1; return '钱递到差役手里，他改了一个字。顶名的是个流落到城里的外乡人，没有家，也没有人替他说话。他上车那日，看了看天，什么也没问。'; } },
          { t: '不管，只把册子抄一份', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 4; s.attrs.cai += 3; s.hidden.zhi += 3; s.flags['抄军册'] = 1; return '你没有替谁说话，也没有出钱。你只把那份文书一个字一个字抄下来，收在箱底。你也不知道抄它做什么，只是觉得，白纸黑字的东西，迟早有人要问。'; } },
          { t: '夜里把侄儿送出城', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 12; s.hidden.zhi += 6; s.attrs.qian -= 8; s.flags['送丁'] = 1; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12; return '你把他送到城外二十里的岔口，给了他一点钱和一件旧袄。他说：祖母怎么办。你说：我担着。他在夜色里走了几步，回头给你磕了个头。'; } }
        ]
      },
      {
        id: 'ming_biaojian', title: '表笺', weight: 10, tags: ['朝堂风波', '灾祸'], minScene: 3,
        time: '旬日', loc: '应天·县衙',
        story: '衙门里要上贺表。主簿把稿子推给你：你字好，抄一遍。\n表里有一句"光天之下，天生圣人"。老吏站在旁边看了一眼，脸色变了。\n他说：这几个字，从前有人因此掉了脑袋。',
        options: [
          { t: '照抄，多一字也不敢改', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming -= 6; s.attrs.xin -= 2; s.attrs.cai += 3; s.flags['照抄贺表'] = 1; return '你一笔一笔抄完，抄到那几个字时，手停了一停，还是照原样落下。表送上去了，什么事也没有。可你此后每回写字，落笔前都要先想一遍。'; } },
          { t: '花钱请老吏另起一稿', dim: 'li', time: '旬日', req: { qian: 14 }, fx: function (s) { s.attrs.qian -= 14; s.attrs.ming += 4; s.attrs.cai += 4; s.flags['改贺表'] = 1; return '老吏改了三处，改得极不显眼，读起来反倒更顺。主簿看过，签了字。老吏收钱时低声说：这不叫改，这叫懂事。'; } },
          { t: '称病，推给别人抄', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你说手抖，抄不了。主簿骂了一句，叫了另一个人。那人抄完，表也送上去，什么事也没有。你心里那口气，松了很久才下去。'; } },
          { t: '自己把险字换掉', dim: 'yi', time: '旬日', req: { cai: 42 }, fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 8; s.hidden.zhi += 5; s.flags['改险字'] = 1; return '你把那一句换成"日月所照，皆是王土"。字还是那个字，意思全变了，竟也没有人看得出。主簿夸你文气足，你低头应了一句，背上全是汗。'; } }
        ]
      },
      {
        id: 'ming_conglong', title: '从龙', weight: 9, tags: ['朝堂风波'], minScene: 4,
        time: '半载', loc: '应天·兵部',
        story: '靖难的功臣封了公侯，旧的军籍一夜之间成了新贵。\n有人来递话：你父亲当年在北边当过差，若肯认下这份旧籍，便可以叙功。\n认了是富贵。不认，也就这样过下去。',
        options: [
          { t: '认下，去兵部叙功', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ming += 10; s.attrs.qian += 8; s.flags['从龙'] = 1; s.flags['新朝有份'] = 1; return '你在兵部递了状，认了那份旧籍。半年后批下来，授了一个百户。印是真的，世券上的名字是你父亲的。你捧着它，忽然想不起父亲到底在北边做过什么。'; } },
          { t: '不认，拿旧籍去换钱', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 16; s.attrs.ming -= 4; s.hidden.yin -= 6; s.flags['卖旧籍'] = 1; return '你把那份旧的文书卖给了城中一户想攀附的人家。价钱谈得很慢，最后成交时，你连那纸上写了什么都没看懂。钱倒是好钱。'; } },
          { t: '不认，把旧籍烧了', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 3; s.hidden.zhi -= 4; return '你把文书在灶下烧了。火苗舔到"军功"两个字，纸卷起来，就没了。你蹲在那里，觉得心里空了一块，也轻了一块。'; } },
          { t: '认了，只替死去的同乡请恤', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 12; s.flags['请恤'] = 1; return '你认了籍，却不肯叙自己的功，只把当年一同死在那边的几个名字报了上去。兵部的吏看了半天，说：这些人都没有后人。你说：那就给他们一个名分。'; } }
        ]
      },
      {
        id: 'ming_shibo', cond: { flag: '下过西洋' }, title: '市舶', weight: 9, tags: ['江湖奇遇', '日常'], minScene: 6,
        time: '一年', loc: '宁波·市舶司',
        story: '市舶司重开，番船入港。勘合、抽分、牙行，一层一层。\n有人发了财，有人赔了本。港上的老人说：这海上的规矩，一半在官府，一半在会讲番话的人嘴里。\n你还识得几个字。',
        options: [
          { t: '去牙行做个通事', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 18; s.attrs.cai += 6; s.hidden.yun += 4; s.flags['牙行通事'] = 1; return '你学了几句番话，替两边传话。传话的差事最赚钱，也最容易两头挨骂。做了一年，你听得出哪句话是实价，哪句话是试探。这门本事，比钱值。'; } },
          { t: '进市舶司做书吏', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.attrs.qian += 6; s.flags['市舶书吏'] = 1; return '你在抽分的册子上落笔，一笔就是几百斤货。番商在你面前弯腰，牙行的人给你递茶。你渐渐明白，官家的笔，比海上的刀更管用。'; } },
          { t: '不去，守着本业', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 4; s.attrs.qian += 3; return '你没有去。港上的人来来去去，有的发了，有的死在海上。你还是守着原来那一摊，日子不咸不淡。'; } },
          { t: '替番商把被扣的货讨回来', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 10; s.hidden.zhi += 4; s.flags['助番商'] = 1; return '那船货被牙行扣了，说是不合式样。你替他写了状，跑了三处衙门，货最后放了一半。番商把一枚小小的银币按在你手里，说了很长一句番话，你只听懂了"朋友"两个字。'; } }
        ]
      },
      {
        id: 'ming_sihuo', title: '私贩', weight: 9, tags: ['江湖奇遇', '灾祸'], minScene: 5,
        time: '一年', loc: '松江·海塘',
        story: '海禁之下，私贩的船夜里出港。一船货回来，翻几倍。\n同乡邀你入伙：你只管记账，不上船。\n他说得很轻巧，可你知道，官军抓到私贩，不问主从。',
        options: [
          { t: '入伙，只管记账', dim: 'li', time: '一年', req: { cai: 30 }, fx: function (s) { s.attrs.qian += 22; s.attrs.cai += 5; s.hidden.yin -= 8; s.hidden.zhi += 3; s.flags['通私贩'] = 1; return '你记了两年账。哪一票赚了，哪一票赔了，哪一船没有回来，册子上都有一行。你从不去海边，可你比谁都清楚潮水的时辰。'; } },
          { t: '不掺和，也不去告发', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 4; s.hidden.yin -= 2; s.attrs.qian += 2; return '你说：这事我不懂。他便不再提。此后每年冬天，你都听说有人被拿，有人沉了船。你听着，只把炉火拨得旺一些。'; } },
          { t: '递信给卫所，报出私港', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ming += 8; s.attrs.qian += 10; s.hidden.yin -= 10; s.flags['报私港'] = 1; s.flags['与乡人结怨'] = 1; return '官军夜里围了港子，拿住十几个人。赏钱发下来，厚厚一叠。你走在街上，从前的熟人都不看你了。有一回你听见有人说：就是他报的。'; } },
          { t: '劝他别做，替他寻一条正路', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 10; s.attrs.qian -= 6; s.flags['劝止私贩'] = 1; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 10; return '你替他在城里寻了个挑担的营生，又托九娘替他说了一门亲。他起先骂你多事，后来真的不去了。那年冬天，他那条旧船在港里烂了。'; } }
        ]
      },
      {
        id: 'ming_nanbei', cond: { cai: 45 }, title: '南北榜', weight: 9, tags: ['朝堂风波'], minScene: 5, maxScene: 24,
        time: '半载', loc: '京师·礼部',
        story: '会试放榜，一榜全是南人。北方的举子闹到礼部门前，砸了榜。\n朝廷重考，另出一榜。两榜的卷子摆在一处，考官们谁也不肯先开口。\n你也在这一场里。',
        options: [
          { t: '上书论取士之偏', dim: 'shi', time: '半载', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.hidden.zhi += 5; s.flags['议南北榜'] = 1; return '你写的是：文章有南北，天下无南北。文书递上去，被留中了。可那年之后，取士真的分了两榜。你不知这是不是你的功劳，也没有人对你说。'; } },
          { t: '趁乱把卷子再递一次', dim: 'li', time: '两月', req: { qian: 16 }, fx: function (s) { s.attrs.qian -= 16; s.attrs.ming += 6; s.hidden.yin -= 6; s.flags['再递卷'] = 1; return '你托人把落卷递到了新考官手里。第二榜出来，你的名字在后头。你知道这名次不干净，可回乡时，族里人放了一挂鞭。'; } },
          { t: '不参与，回馆读书', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 5; s.attrs.ming -= 3; return '你收拾了书箱，回会馆去了。外头的吵闹听得见，你翻了一页书，又翻了一页。后来两榜的事你都没有中，可那一季读的书，比前三年都扎实。'; } },
          { t: '替北方举子执笔写状', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 10; s.hidden.yin += 8; s.hidden.zhi += 5; s.attrs.ti -= 3; s.flags['写闹状'] = 1; return '你把北方举子的名字、籍贯、落卷的题目一一列清楚。状子贴到礼部墙上，围看的人挤了半条街。有人说你是带头人，你没有承认，也没有否认。'; } }
        ]
      },
      {
        id: 'ming_lunban', title: '轮班', weight: 9, tags: ['日常'], minScene: 2,
        time: '一季', loc: '应天·工部营缮所',
        story: '匠籍三年一班，一班三月。你家的手艺是木作，祖父的名字还在工部的册上。\n今年轮到你家。去了，三个月的活，管饭不管钱；不去，罚。\n同甲的人家，已经有两户在卖东西凑罚银了。',
        options: [
          { t: '出钱雇人代班', dim: 'li', time: '旬日', req: { qian: 18 }, fx: function (s) { s.attrs.qian -= 18; s.attrs.xin -= 2; s.attrs.ming -= 2; s.flags['雇代班'] = 1; return '你雇了个外乡的木匠去顶名。三个月后他回来，人瘦了一圈，手里攥着一小块赏下的布。他把布递给你，说：这活不难，就是不吃饱。'; } },
          { t: '去，把活做漂亮', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.attrs.ti -= 4; s.flags['匠班'] = 1; return '你做的活比旁人细，榫卯严得能听见响。营缮所的官看了一眼，问：谁做的。有人指了指你。他点点头，在你的名字上画了个圈。这个圈，后来换了一份差事。'; } },
          { t: '去，只做份内，不多说一句', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.ti -= 3; s.attrs.qian += 3; return '你去了，做了三个月，一句多余的话没有。同班的人夜里骂官，你不接话。回来时你瘦了些，可心里干净。'; } },
          { t: '去了，替同班的人争工食', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 10; s.attrs.ti -= 4; s.flags['争工食'] = 1; return '你把同班三十几个人的饭食一一记下来，凑到一块去问管事。管事骂了两句，第二天饭里果然多了些油。有人悄悄对你说：你胆子大。你说：饿着肚子做不出好活。'; } }
        ]
      },
      {
        id: 'ming_lumi', cond: { ming: 40 }, title: '禄米', weight: 8, tags: ['朝堂风波', '日常'], minScene: 6,
        time: '半载', loc: '藩府·库前',
        story: '宗室的禄米一年比一年难支。藩府的册上人多，库里的粮少。\n今年发下来的禄米，只给了七成，还是陈的。\n长史说：要不，就减一减那些远支的。',
        options: [
          { t: '应下这差事，从中揩一层', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 20; s.hidden.yin -= 12; s.attrs.ming -= 4; s.flags['克禄米'] = 1; return '你把远支的册子重造了一遍，删去几十个名字。省下来的粮，一半进了库，一半进了各人的家。你分到的那一份，装在两个旧坛子里，抬回去时没有声音。'; } },
          { t: '把册子重核，削去冒领', dim: 'shi', time: '半载', req: { cai: 36 }, fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 8; s.hidden.yin += 6; s.flags['核禄册'] = 1; s.flags['得罪宗亲'] = 1; return '你核了三个月，查出几十个早已死绝的名字还在领粮。册子交上去，长史看了很久，说：这会得罪人。你说：粮只有这些。此后来找你的人少了一半。'; } },
          { t: '不接这差事', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你推了。长史没有勉强，另找了一个人。那人的册子造得很快，快到让人觉得，本来就有个样子在那里，只等一个人来抄。'; } },
          { t: '留着远支的名字去藩府争', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 12; s.hidden.zhi += 6; s.attrs.ti -= 4; s.flags['争禄米'] = 1; return '你带着几个远支的老人去了藩府，在门外站了两日。第三日有人出来，说今年的禄米不再减了。老人们要给你磕头，你把他们扶起来。长史从此见你，都绕着走。'; } }
        ]
      },
      {
        id: 'ming_liangzhang', title: '粮长', weight: 9, tags: ['日常', '灾祸'], minScene: 4,
        time: '一年', loc: '应天·乡里',
        story: '粮长是个苦差：催粮、解运、赔补，一路的损耗都算在他头上。\n县里点了你。前任粮长去年赔得卖了田，如今在城南替人守仓。\n他说：这差事，做得好是本分，做不好是家破。',
        options: [
          { t: '接下，把账做明白', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.attrs.ti -= 4; s.flags['粮长'] = 1; return '你把每户的粮、每船的损耗、每处关卡的使费都记在册上。一年下来，账清得连县里都挑不出错。前任粮长听说了，说：你这是拿命在做。'; } },
          { t: '接下，把损耗摊到各户', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 14; s.attrs.ming -= 8; s.hidden.yin -= 10; s.flags['摊损耗'] = 1; return '你把损耗加在斗上，一石多收几升。没人看得出来，因为人人都是这么交的。年底你家里添了两亩地，乡里人见了你，还是要叫一声粮长。'; } },
          { t: '推了，宁可罚钱', dim: 'xiu', time: '一月', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 12; s.attrs.xin += 5; s.attrs.ming -= 4; return '你交了罚银，把差事推了。县里另点了一个人，那人做了两年，家道就败了。你有时想：若是自己接了，会不会不一样。'; } },
          { t: '接下，替受灾几户瞒下', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 12; s.hidden.zhi += 5; s.attrs.qian -= 8; s.flags['瞒灾粮'] = 1; return '你把受灾的几户从册上抹了，缺的数目自己垫上。解运那日，官船一走，那几户的妇人跪在码头上哭。你没有停，走出很远才回头。'; } }
        ]
      },
      {
        id: 'ming_yidi', title: '驿递', weight: 8, tags: ['日常', '灾祸'], minScene: 4,
        time: '半载', loc: '应天·驿',
        story: '驿站的马瘦了，夫役跑了。公文一日一日积在案上。\n你是驿丞手下管簿册的人。上头催得紧，说再误一日，就要拿人。\n马价贵，夫役的工食却几年没添。',
        options: [
          { t: '拿公家的草料钱，先补工食', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 12; s.hidden.yin -= 8; s.attrs.ming -= 2; s.flags['挪草料'] = 1; return '你把草料钱挪出一半，添了夫役的工食。人也回来了，马也精神了，公文也走得快了。只是账上那一笔，你每年都要想法子填。'; } },
          { t: '把实情一层层报上去', dim: 'shi', time: '半载', req: { cai: 32 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 6; s.flags['报驿弊'] = 1; return '你写了三份文书：马死几匹，夫逃几名，公文误几日。写到第三份，你把历任驿丞的名字也列上了。文书递上去，半年后来了一个新驿丞。'; } },
          { t: '按旧例办，误了就误了', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 3; s.attrs.ming -= 4; s.hidden.yin -= 2; return '你照旧例签发，误了几日便在簿上写"雨阻"。上头问起来，你答得也顺。日子久了，你连自己都不觉得这是谎。'; } },
          { t: '卖了自家的马，先送公文', dim: 'yi', time: '半载', fx: function (s) { s.attrs.qian -= 14; s.attrs.ming += 8; s.hidden.yin += 8; s.attrs.ti -= 2; s.flags['卖马送文'] = 1; return '你把自家的马牵到驿前，套上车就走。那趟公文送到了，误了一日，不算罪。回来时你在空马厩前站了很久，摸着槽沿，什么也没说。'; } }
        ]
      },
      {
        id: 'ming_tumin', title: '徙民', weight: 8, tags: ['灾祸', '朝堂风波'], minScene: 5,
        time: '半载', loc: '应天·旧宅',
        story: '朝廷要徙富户填京师。名单上有你家。\n田、屋、祠堂、祖坟，都在这里。走，是一夜之间的事；不走，是抗旨。\n族老来说：要不，分一户旁支过去顶名。',
        options: [
          { t: '认了，举家北上', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ming += 8; s.attrs.qian -= 10; s.attrs.xin += 3; s.flags['徙京师'] = 1; return '你把田宅托给族人，带着一车书、两箱衣北上。出城那日，你回头看了一眼祠堂的屋脊。到了京师，你赁了三间屋，重新做起。'; } },
          { t: '分一户旁支顶名，花钱打点', dim: 'li', time: '两月', req: { qian: 24 }, fx: function (s) { s.attrs.qian -= 24; s.hidden.yin -= 8; s.attrs.ming += 2; s.flags['顶名'] = 1; return '旁支那户人家进了城，你留在了原籍。钱花得干净，手续也齐全。只是逢年过节，族里坐席的次序，悄悄变了。'; } },
          { t: '把家产散给族人，只身北上', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 10; s.attrs.qian -= 14; s.attrs.ming += 4; s.flags['散产'] = 1; return '你把田分了，屋让了，只带一箱书和一副笔墨。族老送他到城外，说：你这是何苦。你说：带得走的，才是自己的。'; } },
          { t: '抗旨不迁，闭门不出', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 6; s.attrs.ti -= 6; s.hidden.yun -= 5; s.hidden.zhi += 8; s.attrs.qian -= 10; s.flags['抗迁'] = 1; return '你把门关了，谁来也不开。差役在门外站了三日，最后贴了一张告示走了。你赢了这一回，可此后每次听见敲门声，心都要停一下。'; } }
        ]
      },
      {
        id: 'ming_shexue', title: '社学', weight: 8, tags: ['日常', '善缘'], minScene: 3,
        time: '一年', loc: '应天·社学',
        story: '县里立社学，教《大诰》，也教乡里的规矩。塾师是县里选的，束脩由各户摊。\n你家出不起。塾师看了看你家的孩子，说：这孩子记性好，免了罢。\n可免了的束脩，总要有人补上。',
        options: [
          { t: '替塾师管账，抵那笔束脩', dim: 'li', time: '一年', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 6; s.attrs.ming += 3; s.flags['社学管账'] = 1; return '你替他管账、抄名册、收束脩。塾师话少，教得却细。有一回他喝了些酒，说：这村里能读出来的，也就一两个。你听着，心里不知是什么滋味。'; } },
          { t: '出钱补上，让孩子去读', dim: 'shi', time: '一年', fx: function (s) { s.attrs.qian -= 10; s.attrs.ming += 6; s.attrs.xin += 4; s.flags['子弟就学'] = 1; return '你把钱放在塾师的案上，说：不必免。孩子读了三年，能背《大诰》，也会写自己的名字。这在从前，是你家没有过的事。'; } },
          { t: '不读也罢，跟着学手艺', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 4; s.attrs.ti += 3; s.attrs.qian += 4; return '你让孩子跟着自己学手艺。他不识几个字，可手稳，眼准。多年后他做的活，比村里任何一个读书人都实在。'; } },
          { t: '替全村的孩子去求县里免摊', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 10; s.attrs.ti -= 3; s.flags['求免束脩'] = 1; return '你把村里该上学、上不起学的孩子数了一遍，写成一份呈子递到县里。县里批了"减半"。减半也是好的。塾师从此见你，总要多说两句话。'; } }
        ]
      },
      {
        id: 'ming_yanfa', cond: { qian: 30 }, title: '盐引', weight: 8, tags: ['边境战事', '日常'], minScene: 5,
        time: '一年', loc: '两淮·运司',
        story: '盐引要往边上纳粮换。规矩是：粮到边上，引才到手。\n有人邀你合伙：你出粮，他出人，走到边上换引，回来分利。\n路上的损耗、边将的索要、盐价的起落，都不在账上。',
        options: [
          { t: '合伙，把粮运到边上', dim: 'li', time: '一年', req: { qian: 30 }, fx: function (s) { s.attrs.qian += 20; s.attrs.cai += 6; s.attrs.ti -= 4; s.flags['商屯'] = 1; return '你押着二十车粮走了四个月。到边上时，粮少了三成，边将又索去一成。换回来的引，却比预想的多。回程你在车上算了半夜，才算清这一趟到底赚了多少。'; } },
          { t: '不合伙，先去问边将的章程', dim: 'shi', time: '半载', req: { cai: 34 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.attrs.qian += 4; s.flags['问盐章'] = 1; return '你在边将的幕里坐了两日，把纳粮的斗、折引的例、关卡的费，一条一条问明白。问到最后，那幕僚笑着说：你比我们这里的人都清楚。你心里想：清楚了，才敢下场。'; } },
          { t: '不碰，盐引的事太远', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 3; s.attrs.qian += 2; return '你说：这买卖太大，我担不起。他便去找了别人。几年后那人生意做得极大，也栽得极快。你听说时正在灶前烧水，只嗯了一声。'; } },
          { t: '把粮借给运不动的散户', dim: 'yi', time: '一年', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 6; s.hidden.yin += 12; s.flags['借粮散户'] = 1; return '有几户小商凑不齐粮，眼看误了期限。你把自家的粮借出去，说：回来再还。他们后来都还了，还多送了一些盐。你收了盐，把钱退回去。'; } }
        ]
      },
      {
        id: 'ming_banjun', title: '班军', weight: 8, tags: ['边境战事', '日常'], minScene: 4,
        time: '一年', loc: '京师·京营',
        story: '京营要班军。各卫轮流派人赴京操练，一来一回，路上就是半年。\n今年轮到你们卫。老兵说：去了就是站墙、点卯、吃糙米，回来还得补家里的活。\n有人出钱雇人代去。',
        options: [
          { t: '自己去，在营里谋个差', dim: 'shi', time: '一年', fx: function (s) { s.attrs.ming += 8; s.attrs.qian += 6; s.attrs.ti += 4; s.flags['班军'] = 1; return '你去了京营，站了三个月的墙。营里有识字的，被调去管册，你也去求了一份。从此不必站墙，改在灯下点名。糙米还是糙米，可你的手保住了。'; } },
          { t: '出钱雇人代去', dim: 'li', time: '旬日', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.xin -= 2; s.attrs.ming -= 2; s.flags['雇班军'] = 1; return '你雇了一个外乡的汉子去顶名。他走时问你：有棉衣么。你给了他一件。一年后他回来，把棉衣还给你，说：营里发了。'; } },
          { t: '去了，只做份内的操', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 5; s.attrs.ti += 4; s.attrs.qian += 2; return '你去了，操练、点卯、吃饭、睡觉，一样不落，一样不多做。一年下来，你的身子反倒结实了。回来时妻子说：你黑了。'; } },
          { t: '替同伍几个老的顶名册', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 8; s.attrs.ti -= 6; s.flags['顶名班军'] = 1; return '你把两个年过五十的老兵的名字换成自己的，一个人顶三份卯。营官查出来骂了你一顿，罚了半月口粮，倒也没往上报。那两个老兵后来一直记着这事。'; } }
        ]
      }
    ],
    main: [
      {
        id: 'ming_m1', title: '洪武', after: 0, time: '一季', loc: '应天·城南',
        story: '你十七岁那年，朱元璋杀了一批人。\n杀的人里有你父亲的一个旧识，姓钱，做过主簿。抄家那日，官军从他家抬出三十几口箱子，箱子里全是他这些年收的、存的、藏的。\n父亲回来，一句话也没说，只是把家里的旧信翻出来，一封一封烧了。',
        options: [
          { t: '问父亲，烧的是什么', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.zhi += 6; s.flags['问旧信'] = 1; return '父亲说：是从前跟钱主簿来往的信。这年头，白纸黑字最要命。他看着火，又说：你要记住，乱世也好，盛世也好，一个人最要紧的，是知道什么话不能写。'; } },
          { t: '帮他一起烧', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.zhi -= 4; s.attrs.ming += 2; return '父子两个蹲在院里烧了一夜。火光把墙照得忽明忽暗。烧到最后，父亲从灰里拣出一张没烧尽的纸，看了看，又扔回去。'; } },
          { t: '悄悄留下两封，藏起来', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 4; s.hidden.yun += 4; s.hidden.zhi += 8; s.flags['藏旧信'] = 1; return '你把两封信塞进袖里，回屋藏进梁上。你不知道那上头写了什么，只知道，这些东西日后也许值钱，也许要命。'; } },
          { t: '去钱家帮着收殓', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 10; s.hidden.yun -= 4; s.flags['葬钱家'] = 1; return '钱家只剩一个孙子和一个老仆。你帮着埋了人，卖了宅子换了几两银子给他们。那孙子跪下来给你磕头，你把他扶起来，说：别记着我。'; } }
        ]
      },
      {
        id: 'ming_m2', title: '靖难', after: 6, time: '两载', loc: '应天',
        story: '洪武三十一年，皇帝崩了。皇太孙即位，年号建文。\n一年之后，北平的燕王起兵，说什么要"清君侧"。三年过去，官军节节败退。\n城南的人家开始把女儿往乡下送。有人说，燕王的人进城那日，要杀一批人。',
        options: [
          { t: '守着家门，不动', dim: 'xiu', time: '两载', fx: function (s) { s.attrs.xin += 8; s.attrs.qian -= 10; s.hidden.yun += 5; s.flags['靖难守家'] = 1; return '你没有走。城破那日，你关了门，听着外头的马蹄声从午时一直响到天黑。第二日开门，街上换了一批人，别的一样。'; } },
          { t: '暗中帮建文的旧臣递个消息', dim: 'yi', time: '两载', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 10; s.hidden.zhi += 8; s.hidden.yun -= 8; s.flags['助旧臣'] = 1; s.flags['新朝有案'] = 1; return '你替一个姓方的主事递了三回消息。城破后他改名逃了。你不知道他后来活没活下来，可你的名字，已经进了某个人的册子。'; } },
          { t: '迎燕王的人入城，做个顺民', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 4; s.hidden.yin -= 6; s.flags['迎燕王'] = 1; return '你同几个里正一起，捧着香案在街口候着。新朝的人很高兴，赏了你一个差事。差事不大，却是新朝的。'; } },
          { t: '趁乱把方家的孩子藏起来', dim: 'yi', time: '两载', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 16; s.hidden.zhi += 6; s.flags['藏孤'] = 1; s.npcs.fang = { name: '方家子', rel: 40, alive: true }; return '你把方家那个九岁的男孩藏在运炭的车上送出了城，交给城外一个农户。临别时他说：我长大了要回来。你说：别回来。'; } }
        ]
      },
      {
        id: 'ming_m3', title: '宝船', after: 12, time: '三年', loc: '刘家港',
        story: '永乐年间，宝船六下西洋。每次出海，都从民间征火长、通事、匠人。\n你已不是当年的少年。做不做这一趟，是这一生最后一次机会了。',
        options: [
          { t: '随船出洋，见一见这天下', dim: 'yi', time: '三年', fx: function (s) { s.attrs.qian += 26; s.attrs.cai += 10; s.attrs.ming += 8; s.attrs.ti -= 8; s.hidden.yun += 8; s.flags['下过西洋'] = 1; return '三年。你在古里见过比城墙还高的浪，在忽鲁谟斯见过说不出名字的香料。回程时你在船上病了一场，梦见家乡的雨。醒来时海是蓝的。'; } },
          { t: '替船队备货，把生意做大', dim: 'li', time: '三年', fx: function (s) { s.attrs.qian += 30; s.attrs.cai += 4; s.flags['供船货'] = 1; return '你替船队备了三年的货。这一趟下来，你在刘家港有了自己的仓。有人开始叫你"某东家"。'; } },
          { t: '留在岸上，教几个孩子读书', dim: 'xiu', time: '三年', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 8; s.attrs.ming += 6; s.hidden.yin += 8; s.flags['设塾'] = 1; return '你在巷子里设了个塾，收了七八个孩子。束脩收得少，有的还倒贴。三年下来，有两个孩子能背全本《论语》了。'; } },
          { t: '把海图、针路抄一份卖与私商', dim: 'yi', time: '两载', req: { cai: 40 }, fx: function (s) { s.attrs.qian += 40; s.attrs.ming -= 8; s.hidden.yin -= 12; s.hidden.yun -= 5; s.flags['卖海图'] = 1; s.flags['通海禁'] = 1; return '海图卖了个天价。买主是南边来的私商，笑得和气。你收钱时手很稳。此后大明的海禁一年比一年严，你的钱却一年比一年多。'; } }
        ]
      },
      {
        id: 'ming_m4', title: '天顺', after: 18, time: '一年', loc: '京师',
        story: '你老了。\n这一朝换过几个皇帝，你数不清了。前些年夺门之变，于谦被杀，天下人不敢说话。\n有个后生来问你：当年土木堡之变，你在哪里？',
        options: [
          { t: '照实说：我在城墙上', dim: 'shi', time: '一年', fx: function (s) { s.attrs.ming += 8; s.attrs.xin += 6; s.flags['述旧事'] = 1; return '你说了半日。后生听得眼睛发亮，末了问：那你后悔吗？你想了很久，说：后悔的不是那个时候，是后来没再说。'; } },
          { t: '只说记不清了', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.zhi -= 4; return '你说：老了，记不清。后生有些失望，走了。你坐在门槛上，其实记得很清楚。'; } },
          { t: '让他把话记下来，别让后人忘了', dim: 'yi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 10; s.hidden.yin += 8; s.flags['授后生'] = 1; return '你说了三个晚上，他记了满满一本。写到最后，他问：这些能传出去吗？你说：你写你的，传不传，看天。'; } },
          { t: '问他：你家里还有人做官么', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 8; s.attrs.ming += 2; s.hidden.yin -= 4; return '他说有个族叔在吏部。你笑了，请他吃了饭，托他递了一句话。人老了，能用的只剩这些旧关系。'; } }
        ]
      },
      {
        id: 'ming_m5', title: '宽弛', after: 24, time: '一季', loc: '京师·长安街',
        story: '你已过了五十。宫里换了几朝，如今的年号叫弘治。\n听说这位皇帝节俭，罢了几处采办，也放了几个因言获罪的人。街上的人说话，比从前松了些。\n有个后生来问你：这样的世道，还能做点什么。',
        options: [
          { t: '上疏，请开言路', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 10; s.hidden.zhi += 4; s.flags['请开言路'] = 1; return '你写了一份疏，说的是：言路开一寸，天下宽一尺。递上去三个月，没有回音，可那年冬天，有两个被贬的人真的回来了。你不知道这与你有没有干系，你只把那两个名字记在了册上。'; } },
          { t: '趁这宽弛，把生意做开', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 18; s.attrs.ming += 4; s.attrs.cai += 3; s.flags['趁宽'] = 1; return '你把铺子从一间做到了三间。官府不再动不动就来查，路上的关也不再层层加钱。你忽然明白，原来经商最要紧的不是本钱，是世道。'; } },
          { t: '回乡设塾，教几个孩子', dim: 'xiu', time: '两载', fx: function (s) { s.attrs.xin += 8; s.attrs.cai += 5; s.attrs.ming += 6; s.hidden.yin += 8; s.flags['设塾'] = 1; s.flags['著书'] = 1; return '你在村口那间旧屋里设了一塾，收了七个孩子。束脩随人给，有的拿一篮鸡蛋来。你把这一生的见闻写成一册，抄了两份，一份留在塾里，一份埋在了梁上。'; } },
          { t: '替因言获罪的人求一次昭雪', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 14; s.hidden.zhi += 6; s.attrs.ti -= 4; s.flags['求昭雪'] = 1; return '你把当年那几桩案子的日子、名字、罪名一一写上，跑到衙门去递。吏说：这些年了，谁还记得。你说：我记得。你递了三次，第三次，有人收下了。'; } }
        ]
      },
      {
        id: 'ming_m6', title: '礼议', after: 30, time: '一年', loc: '京师·左顺门',
        story: '新君年少，喜欢骑射与游幸。宫里的事，渐渐落到几个近侍手里。\n后来朝中起了大礼议，争的只是一个称呼。争的人一批一批跪在左顺门外，哭声响到夜里。\n你老了，可还认得其中几张脸。',
        options: [
          { t: '上疏，替一边说话', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.hidden.zhi += 5; s.flags['议礼'] = 1; s.flags['著书'] = 1; return '你写了三千字，引经据典，只说一个理字。疏递上去，你等了半年，什么也没有等到。后来那件事定了，定得很难看。你把底稿收好，写下四个字：此论不悔。'; } },
          { t: '不表态，把家小送回原籍', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian -= 10; s.attrs.xin += 5; s.hidden.yun += 4; s.flags['送家小'] = 1; return '你把妻儿送回了原籍，自己留在京里。宅子空了一半，夜里听得见风。有人问你站哪一边，你说：我老了，站不住。这话救了你。'; } },
          { t: '闭门著书，不问朝事', dim: 'xiu', time: '两载', fx: function (s) { s.attrs.cai += 8; s.attrs.xin += 8; s.attrs.ming += 4; s.hidden.yin += 6; s.flags['著书'] = 1; s.flags['闭门'] = 1; return '你闭门两年，把这一朝的事写了一部。写到那些跪在门外的人，你停了很久，最后只写了一句：此辈皆有所守。书成之后，你没有给人看。'; } },
          { t: '去左顺门外跪一次', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 10; s.attrs.ti -= 8; s.hidden.zhi += 8; s.hidden.yin += 10; s.flags['左顺门'] = 1; s.flags['得罪新君'] = 1; return '你去了。跪到第二日，膝下已经没了知觉。有人在你旁边哭，你也哭，哭的不是那个称呼。后来板子下来了，你被抬回家，躺了三个月。那条腿，从此就没有好过。'; } }
        ]
      }
    ],
    endings: [
      {
        id: 'ming_end_jinyi', name: '锦衣夜行', group: '显', pri: 74,
        score: function (s) { var y=s.npcs.yan?s.npcs.yan.rel:0;var v=y*1.3+(s.attrs.ming-55)*0.8+(s.hidden.yin<40?8:0);return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ npc: { id: 'yan', rel: 35 } }, { ming: 55 }] },
        verdict: '他穿了一辈子的黑衣，最后连自己也分不清是官是贼。',
        epilogue: '你入了锦衣卫。先是做校尉，后来做了百户。\n你办过很多案子。有的是真的，有的是上头要的。你学会了一件事：问话的时候，先看人的手，再看人的眼。\n夜里你换下那身黑服，坐在灯下，忽然想不起自己当年是什么样子。\n你死时，来吊的人不多。街上有人说：那是个能办事的。也有人说：那是个能害人的。两种话，都对。'
      },
      {
        id: 'ming_end_hai', name: '海商巨贾', group: '利', pri: 83,
        score: function (s) { var v=(s.attrs.qian-80)*2.2+(s.attrs.cai-50)*0.6+(s.hidden.yin<40?6:0);return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ qian: 80 }, { or: [{ flag: '通海禁' }, { flag: '卖海图' }, { flag: '供船货' }] }] },
        verdict: '他的船从没在官册上出现过，可半个东南的货，都从他手里过。',
        epilogue: '海禁一年比一年严，你的船却一年比一年多。\n你从不亲自出海。你在城里有一间不起眼的铺子，后头是三进的宅。官面上的人逢年过节来一趟，走时车是重的。\n你修了桥、办了义学、捐了军饷，官府给你一块"乐善好施"的匾。\n你死后，家里的账册烧了三日三夜。有人说你留下了一笔巨款，埋在何处无人知晓。也有人说，你的钱早就换成了船，沉在某片海里。'
      },
      {
        id: 'ming_end_zhaoyu', name: '诏狱冤魂', group: '悲', pri: 89,
        score: function (s) { if(!s.dead)return 0;var v=(30-s.attrs.ming)*0.9+(60-s.attrs.xin)*0.4+(s.flags['新朝有案']?8:0);return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ dead: true }, { flag: '新朝有案' }] },
        verdict: '他在诏狱里待了三年，到死也没弄明白自己犯了哪一条。',
        epilogue: '你被拿进了诏狱。\n审你的人是熟人，从前一起喝过酒。他问：你认不认？你说：我认什么？他没再问，让人上了刑。\n三年里你写过七份供状，每一份都不一样。最后一份，你写了"罪臣伏诛"四个字，因为再不写，就要连累家里。\n你死的时候是冬天。狱卒把你的尸首抬出去，扔在城外的乱葬岗。\n许多年后有人翻案，说当年那桩事是冤的。那时已经没有人记得你叫什么。'
      },
      {
        id: 'ming_end_gengdu', name: '耕读传家', group: '隐', pri: 52,
        score: function (s) { var fam=s.family||{},es=s.estate||{};var maxKid=0;(fam.children||[]).forEach(function(c){maxKid=Math.max(maxKid,(c.attrs&&c.attrs.cai)||0);});var v=(s.attrs.cai-55)*0.5+(s.attrs.xin-60)*0.6+((es.shu||0))*8+maxKid*0.6+(es.tian||0)*2;return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ cai: 55 }, { xin: 60 }, { qian: [20, 90] }] },
        verdict: '他没做过官，可他家门上那块"耕读"的匾，挂了四代。',
        epilogue: '你没有做官。\n你在村口设了一个塾，教了三十年的书。束脩收得少，谁家孩子读得起，你就教。\n你把自己一生的读书笔记抄了四份，分给四个学生。有一份后来流到了京城，被一个做大官的人看见，说：这注得比官家的本子还细。\n你的孙子中了举。放榜那日，他跑到你坟前，把报帖烧了。\n他跪着说：爷爷，我们家终于有人读书读出个名堂了。'
      }
    ]
  };

  /* ================= 12 · 悬案事件（明） ================= */
  D.dynasties.ming.events.push(
    {
      id: 'ming_zl_1', title: '缇骑', tags: ['朝堂风波', '灾祸'], weight: 11,
      minScene: 10,
      raiseOffer: {
        ttl: 2, short: '诏狱传唤，三日内须到',
        expire: function (s) {
          s.flags['畏罪不出'] = 1;
          s.attrs.ming -= 12; s.hidden.yin -= 6; s.attrs.xin -= 6;
          return '第三日过了，你没有去。第四日来的人不由分说——「畏罪」这两个字，就这样按在了你的名下。冤不冤，进了那道门再说。';
        }
      },
      story: '缇骑登门，递下一纸文书：三日内自赴诏狱问话。\n没有罪名，没有原告，只有日期与地点。邻居们隔窗看了一眼，很快都把窗关上了。你知道这一纸文书是什么——不去，是畏罪；去了，是龙潭。',
      options: [
        {
          t: '如期自往，从容对簿', dim: 'shi', time: '一月',
          fx: function (s) { s.attrs.xin += 10; s.attrs.ming += 5; s.hidden.yun -= 6; s.flags['自赴诏狱'] = 1; var ok = Math.random() < 0.6; if (ok) return '你第三日一早自己走到了那道门前。问话的人问了两个时辰，你答了两个时辰，一字不差。旬日后放还——「查无实据」四个字，抵得过你半生的小心。'; s.attrs.xin -= 8; s.attrs.ming -= 6; return '你如期到了。问话没问出什么，可你出来时瘦了十斤。此后经年，你夜里听见马蹄声仍会坐起来——那道门你只进过一回，可它一直在你背后。'; }
        },
        {
          t: '变卖细软，先打通门路', dim: 'li', time: '旬日', req: { qian: 20 },
          fx: function (s) { s.attrs.qian -= 18; s.hidden.yin -= 3; s.attrs.xin -= 3; s.flags['花钱消灾'] = 1; var ok = Math.random() < 0.55; if (ok) return '钱递到了能递的地方。文书上的「三日内」变成了「另行传唤」，而那一次传唤，再也没有来。你知道这不是了结，只是缓期。'; s.attrs.ming -= 5; return '钱递出去了，文书上的日期过了，来拿人的缇骑也到了。你这才明白：有的门收了钱也不办事，它收钱，只是让你死心。'; }
        },
        {
          t: '闭门写辩状，遍递公卿', dim: 'xiu', time: '半月', req: { cai: 40 },
          fx: function (s) { s.attrs.ming += 3; s.attrs.xin += 4; s.flags['辩状遍递'] = 1; return '你三天写了七页辩状，字字有出处，句句有对证。递出去的第二天，问话改成了问案，问案改成了存档——有人替你把话递到了更高处。文人的笔，有时候真能当刀。'; }
        },
        {
          t: '越墙而走，亡命他乡', dim: 'yi', time: '两月',
          fx: function (s) { s.attrs.ming -= 10; s.hidden.yun -= 8; s.flags['亡命'] = 1; s.attrs.qian -= 10; return '你在第二日夜里翻了后墙。此后你换了名姓，走了两千里。缇骑没有再追——他们要的人已经有了名目，犯不上再追一个「死人」。你活下来了，只是活着的那个人，再也不是你。'; }
        }
      ]
    }
  );
})(window.GAME_DATA);