/* 十二出身：先天之势与天生之枷 */
(function (D) {
  D.origins = D.origins || {};

  /* 17 · 选官制度提示：keju 缺席的朝代，读书人出身换一种说法 */
  D.examNote = {
    keju: '',
    chaju: '此朝未开科场，进身之路在察举征辟——先修身立名，自有州郡来问。',
    none: '此朝无选官考试。读书人的出路，在投效、在军功、在有人识你。'
  };

  /* ============ 一 · 寒门耕户 ============ */
  D.origins.nong = {
    id: 'nong', name: '寒门耕户',
    age: 15, loc: '河内·槐里村', identity: { m: '农家子', f: '农家女' },
    intro: '你生在槐里村，家中三代佃户，名下无一分田。父亲的手掌裂得像旱了一夏的河床，母亲在灶前数着米粒下锅。村东头的老槐树下，里正每年秋后来收租，腰间的铜钥匙叮当作响。',
    advantages: ['筋骨结实，耐得饥寒', '识得五谷、虫候与人心之艰', '乡里有一二可托之人'],
    shackles: ['无书可读，无门可投', '赋税徭役如影随形', '名不入乡绅之眼'],
    attrs: { ti: 58, cai: 18, qian: 10, ming: 14, xin: 52 },
    hidden: { yun: 50, yin: 56, zhi: 30 },
    flags: { '乡里情分': 1 },
    npcs: { ahe: { name: '阿禾', rel: 60, alive: true, note: '同村少年，一同长大' } },
    opening: [{
      id: 'org_nong_1', title: '秋租',
      time: '半月',
      loc: '河内·槐里村',
      story: '秋收才罢，谷子还摊在场上没干透。里正来了，身后跟着两个带棍的乡丁。他拿靴尖碾了碾谷粒，说今年加耗，一亩多收三升。\n父亲蹲在檐下不出声，母亲的手在围裙上绞紧了。谷子是全家一冬的命。里正的目光扫过来，落在你身上——他认得你，去年你替他扛过两趟粮。',
      options: [
        {
          t: '上前赔笑，替父亲把话圆下来', dim: 'li', time: '数日',
          fx: function (s) {
            s.attrs.ming += 2; s.attrs.xin -= 2; s.hidden.yin -= 2;
            var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel -= 3;
            s.flags['见过里正'] = 1;
            return '你把腰弯下去，说了许多软话。里正笑了，抬手在你肩上拍了两下，加耗减了一升。父亲没抬头。阿禾在院墙外看着，什么也没说，转身走了。';
          }
        },
        {
          t: '夜里去求村东的老塾师，问他能否作保', dim: 'xiu', time: '旬日',
          req: { cai: 15 },
          fx: function (s) {
            s.attrs.cai += 5; s.attrs.ming += 3; s.attrs.qian -= 3;
            s.flags['启蒙'] = 1; s.hidden.zhi += 3;
            return '老塾师姓陈，眼已半盲，摸着你递上的两枚鸡蛋，问你识得几个字。你摇头。他叹了一声，说：不识字的保，作不得。但他让你每旬来一趟，替他扫屋、磨墨，顺便认几个字。';
          }
        },
        {
          t: '把谷子连夜挑进城，卖了换钱', dim: 'li', time: '数日',
          fx: function (s) {
            s.attrs.qian += 8; s.attrs.ti -= 4;
            s.flags['私卖口粮'] = 1; s.hidden.yun += 2;
            return '你摸黑挑担走了三十里，天亮前把谷子脱了手，价贱，但总算有了现钱。回家时母亲正在门口张望，见你肩上的空担，脸色白了一白。这一冬，粥要更稀了。';
          }
        },
        {
          t: '拦住乡丁，当众问他这加耗是哪条律', dim: 'yi', time: '数日',
          fx: function (s) {
            s.attrs.ming += 8; s.attrs.ti -= 3; s.attrs.qian -= 5;
            s.hidden.zhi += 6; s.hidden.yun -= 4;
            var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
            s.flags['顶撞里正'] = 1;
            return '你横在谷场当中，问了那一句。乡丁的棍子抬起来，阿禾先扑上去抱住你的腰。里正脸色青了又白，末了只说了句"记着"，收粮走了。当夜父亲抽了你一巴掌，母亲在灶后哭。但第二天，村里人看你的眼神变了。';
          }
        }
      ]
    }],
    events: [
      {
        id: 'nong_lao', title: '老塾师', weight: 9, tags: ['日常'], minScene: 2, maxScene: 14,
        cond: { flag: '启蒙', noflag: '陈师已殁' },
        time: '半载', loc: '槐里村·陈宅',
        story: '陈师傅咳了一冬，开春时已起不了床。他把你叫到榻前，从枕下摸出一册残书，封皮都没了，纸边卷得像枯叶。\n"我这一辈子，教出过两个举人，都在外头做官，没一个回来过。"他把书按在你手里，"你若要读，就别回头。"',
        options: [
          { t: '跪下受书，应下这一句', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 8; s.attrs.xin += 4; s.hidden.zhi += 5; s.flags['受残书'] = 1; return '你磕了三个头。陈师闭了眼，说：去吧，把门带上。三日后他殁了，你去送了，坟前只有你和阿禾两个人。'; } },
          { t: '问他那两个举人如今在何处', dim: 'shi', time: '数日', req: { cai: 22 }, fx: function (s) { s.attrs.cai += 3; s.attrs.ming += 2; s.flags['知有旧门生'] = 1; return '他报了两个人的名字，一个在县里做主簿，一个据说在京中。说完便不说了，眼神飘向窗外。你把这两个名字记下了。'; } },
          { t: '替他张罗后事，把书留给能读的人', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 6; s.hidden.yin += 8; s.flags['葬陈师'] = 1; return '你把自己攒的几吊钱全拿了出来，乡邻凑了一副薄棺。出殡那日，村人念你的好。那册残书，你最后还是留在了自己怀里。'; } },
          { t: '照旧去听，但心里另有打算', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 2; s.hidden.zhi -= 2; return '你仍去，却不再只读书。你留意陈家还有几分薄田、几件旧物，也留意那两个举人的门路。人活着，总得先想活路。'; } }
        ]
      },
      {
        id: 'nong_shui', title: '修渠', weight: 10, tags: ['日常', '善缘'], minScene: 3,
        time: '两月', loc: '槐里村',
        story: '春旱。上游的人家把渠口堵了，下游几十亩眼看要枯。村人要你去说理——因为你识字，也因为你去年顶撞过里正，他们觉得你胆子大。\n可上游那片地，是县里王主簿的族产。',
        options: [
          { t: '带人连夜掘开渠口', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 10; s.attrs.ti -= 5; s.hidden.yin += 6; s.hidden.zhi += 5; s.flags['掘渠'] = 1; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10; return '铁锹下去，泥水溅了满身。天亮时水哗哗地流进田里，村人欢呼。可三日后，官差的传票就到了村口。'; } },
          { t: '写状子递县衙，按律争水', dim: 'shi', time: '一月', req: { cai: 25 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.attrs.qian -= 4; s.flags['递过状子'] = 1; s.hidden.zhi += 2; return '状子写得不算好，但律条引得对。县里批了个"候勘"。这一候，就是一月。田里的水终究少了一半，可你第一次摸到了"律"这个东西的分量。'; } },
          { t: '去上游说项，许他些好处', dim: 'li', time: '半月', fx: function (s) { s.attrs.qian -= 8; s.attrs.ming += 3; s.attrs.xin -= 3; s.hidden.yin -= 4; s.flags['与王主簿家往来'] = 1; return '你提着两坛酒去，说了半晌，最后把自家那块坡地许了出去。水放了。村人不知内情，只当你口才好。王家的管家记下了你这张脸。'; } },
          { t: '不掺和，趁旱去城里找活计', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 10; s.attrs.ti -= 3; s.attrs.ming -= 3; return '你收拾了铺盖进城。码头扛包、米行扫仓，两个月挣了些钱。回村时渠的事已了——有人掘了口子，被打了三十板，是阿禾。'; } }
        ]
      },
      {
        id: 'nong_bing', title: '点兵', weight: 8, tags: ['灾祸'], minScene: 6, age: [17, 40],
        time: '一月', loc: '槐里村',
        story: '边关有警，州里下了点兵文书。名册摊在里正家的桌上，一户一丁。你家只你一个男丁。\n夜里父亲把家里仅有的半贯钱数了三遍，说：去买通里正。母亲不说话，只是把你那件旧袄的袖口又缝了一层。',
        options: [
          { t: '拿钱去打点，留下', dim: 'li', time: '一月', req: { qian: 10 }, fx: function (s) { s.attrs.qian -= 10; s.attrs.ming -= 4; s.hidden.yin -= 5; s.flags['免役'] = 1; return '钱送出去了，名册上另添了一个名字——是村西的孤老汉，无儿无女。他走那日，没看任何人。你站在人群里，觉得那件旧袄忽然重得很。'; } },
          { t: '自请代父从军', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ti += 8; s.attrs.ming += 8; s.attrs.xin += 4; s.hidden.zhi += 6; s.flags['从军'] = 1; s.npcs.wei = { name: '魏老校', rel: 20, alive: true }; return '你把名字按了手印。父亲拦你，被母亲拉住。临行那夜母亲煮了一锅稠粥，谁也没吃几口。你走时天未亮，村口只有阿禾来送，塞给你一把柴刀。'; } },
          { t: '去县里应募，做民夫换钱粮', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 12; s.attrs.ti -= 6; s.attrs.cai += 2; s.flags['民夫'] = 1; return '民夫不上一线，只运粮修寨。半年下来，肩背脱了一层皮，换回一袋粟和几串钱。你见过军营，也见过军营里怎么死人——不是死在刀下，是死在粮车上。'; } },
          { t: '装病，让里正另想办法', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.ti -= 4; s.attrs.ming -= 6; s.hidden.yun -= 3; return '你把脸涂黄，躺在草席上呻吟。里正来看了两回，骂了几句走了。兵还是点了，点到谁家，你没敢问。'; } }
        ]
      },
      {
        id: 'nong_nv', title: '邻女', weight: 7, tags: ['情缘'], minScene: 8, age: [16, 30],
        cond: { gender: 'm', noflag: '成家' },
        time: '半载', loc: '槐里村',
        story: '村东李家的女儿，名唤阿绫，常来帮你母亲舂米。她的手很稳，舂起米来一声一声，像更漏。\n李家愿结这门亲，但要三匹绢、一头牛。你家拿不出。阿绫只说：不急。',
        options: [
          { t: '去镇上做工，攒聘礼', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 14; s.attrs.ti -= 6; s.attrs.ming -= 2; s.flags['求聘阿绫'] = 1; return '你在镇上铁铺拉了一年风箱，手臂粗了一圈，掌心全是茧。钱攒够那日，你连夜走回村，天正下小雪。'; } },
          { t: '请母亲去说，先把亲事定下', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 3; s.attrs.ming += 2; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel -= 8; s.flags['求聘阿绫'] = 1; return '母亲去了，李家应了，只说聘礼可缓。阿绫来舂米时低着头，耳根红着。阿禾那几日没来找你，后来你才知，他也托人去说过。'; } },
          { t: '劝阿绫另择良配，自己要走远路', dim: 'yi', time: '半载', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 2; s.hidden.zhi += 6; s.flags['辞婚'] = 1; return '你把话说完，阿绫没哭，只把手里的米筛放稳了，说：那你去吧。往后两年，每逢你回家，她都已嫁作他人妇，路上遇见，仍旧点头。'; } },
          { t: '借这层关系，攀上李家在县里的亲戚', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ming += 5; s.attrs.qian -= 6; s.attrs.xin -= 4; s.hidden.yin -= 3; s.flags['李家门路'] = 1; return '李家在县里有个做书办的亲戚。你借着议亲的由头去了两趟，门路算是搭上了。阿绫看你的眼神，一日比一日淡。'; } }
        ]
      }
    ]
  };

  /* ============ 二 · 书香士族 ============ */
  D.origins.shi = {
    id: 'shi', name: '书香士族',
    age: 16, loc: '洛阳·崇仁坊', identity: { m: '士族子弟', f: '士族女' },
    intro: '你家在洛阳崇仁坊，门前两株老槐，进门是一座三进的老宅，梁上悬着祖父的"及第"匾。父亲官不过七品，却把半生的体面都供在了书房里。\n族中长辈见你，第一句总是："莫坠了门风。"',
    advantages: ['家中藏书满架，自幼识字', '长辈故旧半在朝堂', '一纸门第，处处有人肯见'],
    shackles: ['门第之望压在肩上', '一步踏错便是辱没祖宗', '清高惯了，不谙生计'],
    attrs: { ti: 30, cai: 56, qian: 42, ming: 42, xin: 44 },
    hidden: { yun: 56, yin: 50, zhi: 40 },
    flags: { '士族门第': 1 },
    npcs: {
      pei: { name: '裴敬', rel: 10, alive: true, note: '世家子弟，与你家是世交亦是世仇' },
      li: { name: '李慕之', rel: 0, alive: true, note: '寒门书生，尚不相识' }
    },
    opening: [{
      id: 'org_shi_1', title: '家宴',
      time: '数日', loc: '洛阳·崇仁坊',
      story: '父亲做寿，来的都是旧交。裴家也来了人——裴敬，比你长两岁，去年已中了明经，席间谈吐从容，长辈们频频颔首。\n酒到半酣，有人问起你的学业。父亲放下酒盏，看了你一眼。整座厅堂都静了。',
      options: [
        { t: '引经据典，当场作一篇寿序', dim: 'shi', time: '数日', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 8; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 6; s.flags['家宴扬名'] = 1; return '你略一沉吟，援笔立成。满座称善，父亲抚须不语，眼角的纹路却松了。裴敬举杯敬你，笑得极得体：好文章。只是锋芒早露，未必是福。'; } },
        { t: '谦辞推让，把话头递给裴敬', dim: 'li', time: '数日', fx: function (s) { s.attrs.ming += 2; s.attrs.xin += 2; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 8; return '你说才疏学浅，不敢在裴兄面前献丑。裴敬笑着谦了两句，便顺势谈起了别的。父亲那一晚没再提你的学业，散席时只说了句：你还算懂事。'; } },
        { t: '直言取士之弊，说今人多不读书', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming -= 4; s.attrs.xin += 5; s.hidden.zhi += 6; s.flags['狂言'] = 1; return '你说得痛快，席上却冷了。有位老世伯搁下筷子，说少年人火气盛。父亲的脸沉了一夜。散席后他在廊下站了很久，没回头看你。'; } },
        { t: '借口更衣，去书房翻祖父旧稿', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 3; s.flags['读过祖稿'] = 1; return '书房里有股樟脑味。祖父的旧稿堆在角落，多半是批注，字极瘦。你翻到一页，写着一句：读书不是为了做官。下面是更小的字：可我们这样的人家，不做官，便什么都不是。'; } }
      ]
    }],
    events: [
      {
        id: 'shi_men', title: '门生帖', weight: 10, tags: ['朝堂风波'], minScene: 2,
        time: '一月', loc: '洛阳',
        story: '父亲旧交崔公遣人送来一张帖，说愿收你为门生，引你去见一位在尚书省行走的座主。帖上墨迹很新。\n母亲说这是天大的机缘。父亲却在灯下把帖翻来覆去看了半个时辰，末了说：崔公这人，近来与新政走得近。',
        options: [
          { t: '接帖，备厚礼登门', dim: 'shi', time: '一月', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 18; s.attrs.ming += 10; s.flags['崔公门下'] = 1; s.hidden.zhi += 3; return '崔府门第深，你候了半日才得见。崔公问了你几句经义，便说：年轻人肯来，是好事。你出府时天已黑，手里多了一封荐书。'; } },
          { t: '接帖，只投门生，不附新政', dim: 'xiu', time: '一月', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 5; s.attrs.xin += 4; s.flags['崔公门下'] = 1; return '你在崔府只谈学问，不谈时局。崔公听出你的意思，笑了一笑，说：也罢。荐书仍给了，只是薄了些。'; } },
          { t: '回帖婉拒，说学业未成', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 4; s.hidden.zhi -= 4; s.flags['拒崔公'] = 1; return '你把帖退了回去，附了一封短笺。母亲气得三日没同你说话。父亲却在夜里推门进来，坐了一会儿，说：你比我有骨头。'; } },
          { t: '把帖转给裴敬，卖他一个人情', dim: 'li', time: '数日', fx: function (s) { s.attrs.ming -= 2; s.attrs.qian += 8; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 15; s.flags['荐裴敬'] = 1; return '裴敬得了帖，怔了一怔，随即大笑，说你这人有趣。他塞给你一锭银子，说：往后有我一份，便有你的。这话他说得轻，你却记住了。'; } }
        ]
      },
      {
        id: 'shi_book', title: '借书', weight: 9, tags: ['日常'], minScene: 3,
        time: '两月', loc: '洛阳·书肆',
        story: '城南书肆有一部《汉书》，是旧刻，缺了两卷。掌柜说要五贯，少一文不卖。你翻了几页，见页边有前人的批注，字迹极工。\n同来的书童说，家里账上这个月已经紧了。',
        options: [
          { t: '倾囊买下', dim: 'xiu', time: '两月', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.cai += 8; s.hidden.zhi += 3; s.flags['得汉书'] = 1; return '你数了两遍钱，掌柜才把书递过来。回宅的路上你把书抱在怀里，像抱着一件热的东西。那两卷缺失，后来你抄了三年才补齐。'; } },
          { t: '抄书，以工抵价', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ti -= 2; s.attrs.qian += 3; s.flags['抄书'] = 1; return '你在书肆后院抄了两月书，腕子肿了又消。掌柜给了工钱，还让你把《汉书》抄了一部带走。自此你抄书的功夫在坊间有了名。'; } },
          { t: '转去求父亲的旧友借阅', dim: 'shi', time: '一月', req: { ming: 35 }, fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 3; return '父亲的旧友姓周，书房里竟有全本。他让你在府上看了半月，临走时叹道：你父亲当年也是这般，蹲在我书斋里不肯走。'; } },
          { t: '不买，寻个由头让书肆赊给你', dim: 'yi', time: '一月', fx: function (s) { s.attrs.cai += 3; s.attrs.ming -= 3; s.hidden.yin -= 4; s.flags['赊书'] = 1; return '你同掌柜说家中急用，先赊下，月内送钱。掌柜信了你。钱一直没送，书倒是读完了。后来你路过那家肆，掌柜看你的眼神，淡得很。'; } }
        ]
      },
      {
        id: 'shi_li', title: '廊下书生', weight: 9, tags: ['善缘'], minScene: 4,
        cond: { noflag: '识李慕之' },
        time: '数日', loc: '洛阳·国子监外',
        story: '国子监外的廊下，有个书生靠着柱子坐着，衣衫洗得发白，膝上一册书，人却睡着了。押门的吏在轰人。\n他醒过来，急急收拾书，一页纸飘到你脚边。你拾起来，是篇策论，写得极好，只是没有落款。',
        options: [
          { t: '替他解围，请他吃一碗汤饼', dim: 'yi', time: '数日', fx: function (s) { s.attrs.qian -= 3; s.attrs.ming += 4; s.hidden.yin += 8; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 25; s.flags['识李慕之'] = 1; return '他姓李，名慕之，并州人，来京三年，未有门路。他吃汤饼吃得很快，吃完才想起道谢，耳朵红了。他说：他日若有一日，必还你今日一饭。'; } },
          { t: '问他愿不愿替你代笔应酬文章', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 3; s.attrs.ming += 3; s.hidden.yin -= 3; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10; s.flags['识李慕之'] = 1; s.flags['用李代笔'] = 1; return '他先是一愣，随即应了，只说：莫教人知道。此后你席面上的应酬文章，多半出自他手。他从不推辞，也不多要。'; } },
          { t: '把那篇策论记在心里，人却不理', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 4; s.hidden.yin -= 2; s.flags['识李慕之'] = 1; return '你把那页纸还了，看他的眼神却多留了一分。策论的章法，你回去默了一遍。至于这个人——京城里这样的人太多，你顾不过来。'; } },
          { t: '引他去见崔公，做个顺水人情', dim: 'shi', time: '一月', req: { flag: '崔公门下' }, fx: function (s) { s.attrs.ming += 5; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 15; s.flags['识李慕之'] = 1; s.flags['李入崔门'] = 1; return '崔公看了策论，问是谁荐的。你说是你自己识得的人。崔公看了你一眼，那一眼里的意思，你许多年后才懂。'; } }
        ]
      },
      {
        id: 'shi_zu', title: '族议', weight: 8, tags: ['朝堂风波'], minScene: 7, age: [18, 35],
        time: '一月', loc: '洛阳·宗祠',
        story: '族中开祠议事。三房的一位叔祖要捐一个官，缺二百贯，意指各房分摊。你父亲这一房出得起，却要动你的束脩与赴考盘缠。\n叔祖说：一族兴旺，靠的是有人在外头站着。这话不错，只是站着的那个人，未必是你。',
        options: [
          { t: '应下分摊，换叔祖一句提携', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 6; s.flags['族中有人'] = 1; s.hidden.zhi += 2; return '钱出了，叔祖当众说你识大体。散祠后他留你说了几句，许你明年随他一道去州府走动。这话值不值二百贯，你心里没底。'; } },
          { t: '以账册为凭，当众算出各房该出多少', dim: 'li', time: '一月', req: { cai: 50 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.attrs.xin += 3; s.flags['族议执言'] = 1; return '你取来账册，一笔一笔念下去。祠堂里静得能听见香灰落下的声音。叔祖脸色变了三回，末了只说：后生可畏。钱照旧出了，但少了一半。'; } },
          { t: '不争，退到廊下听他们议完', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 3; s.hidden.zhi -= 3; return '你退到廊下，看庭中那株老桂。里面争了许久，最后定了各房均摊。没人问你的意思。你忽然觉得，这宅子里的许多事，其实与你无关。'; } },
          { t: '私下把捐官的门路截下来，自己做', dim: 'yi', time: '两月', req: { qian: 30 }, fx: function (s) { s.attrs.qian -= 30; s.attrs.ming += 8; s.hidden.yin -= 8; s.hidden.zhi += 8; s.flags['自捐官'] = 1; s.flags['得罪叔祖'] = 1; return '你抢在族议之前，托人把那个缺补上了。叔祖知道后，在祠堂里摔了茶盏。父亲跪了一夜。你得了官身，也得了族中一半人的冷眼。'; } }
        ]
      }
    ]
  };

  /* ============ 三 · 行商子弟 ============ */
  D.origins.shang = {
    id: 'shang', name: '行商子弟',
    age: 16, loc: '江陵·沙市码头', identity: { m: '商贾之子', f: '商户女' },
    intro: '你家在江陵沙市有三间铺面，做的是川米与淮盐的转手生意。父亲常说：士农工商，商在末，可末位上的人，能看见所有人要什么。\n码头上的人识得你，因为你从小就在秤与算盘之间长大。',
    advantages: ['通晓算盘与人情', '识得南北货路、船帮与牙行', '手上有一笔可动的本钱'],
    shackles: ['商居其末，士人轻之', '官吏可随时伸手', '一笔货折了，便是倾家'],
    attrs: { ti: 42, cai: 34, qian: 62, ming: 24, xin: 40 },
    hidden: { yun: 50, yin: 46, zhi: 36 },
    flags: { '商家子': 1 },
    npcs: {
      shen: { name: '沈九娘', rel: 15, alive: true, note: '市井女子，消息极灵' },
      yan: { name: '严七', rel: 0, alive: true, note: '市税司的差役，尚不相识' }
    },
    opening: [{
      id: 'org_shang_1', title: '一船盐',
      time: '半月', loc: '江陵·沙市码头',
      story: '父亲卧病，铺子里的事暂交到你手上。头一桩便棘手：一船淮盐泊在港外，押船的伙计说，市税司的人已经盯了三日。\n盐引上的数目对不上。父亲在病榻上只说了一句：这船盐，是我们家半年的气力。',
      options: [
        { t: '照章补税，把数目报足', dim: 'li', time: '半月', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 4; s.hidden.yin += 5; s.flags['补税'] = 1; return '你亲自去市税司，把差额补了。税吏数钱时眼皮都没抬。这一船盐赚得薄，可父亲听了，只说：稳当。'; } },
        { t: '寻沈九娘，打听税吏的软处', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 14; s.hidden.yin -= 6; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 20; s.flags['走九娘门路'] = 1; return '九娘在茶楼后巷见你，听你说完，笑得眼尾上挑。她说税吏新纳了一房妾，正缺体面。三日后，盐船进港，无人来查。她没要钱，只说：记着，你欠我一回。'; } },
        { t: '把盐原船退回，宁折本钱', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.qian -= 18; s.attrs.xin += 6; s.attrs.ming += 3; s.flags['退盐'] = 1; return '你让船掉头。伙计们骂你迂，父亲在榻上沉默了很久，末了说：你没做错，只是我们家经不起做对的事。那年冬天，铺子关了一间。'; } },
        { t: '连夜卸货，分散到乡下私仓', dim: 'yi', time: '数日', fx: function (s) { s.attrs.qian += 20; s.attrs.ti -= 4; s.hidden.yun -= 5; s.hidden.zhi += 4; s.flags['私卸'] = 1; s.flags['被税司盯上'] = 1; return '月黑风高，二十几条汉子搬了一夜。货是保住了，可码头上没有不透风的墙。三日后，市税司的严七来了铺子里，什么也没说，只坐了一盏茶的工夫。'; } }
      ]
    }],
    events: [
      {
        id: 'shang_yan', title: '严七', weight: 12, tags: ['灾祸'], minScene: 2,
        cond: { flag: '被税司盯上' },
        time: '一月', loc: '江陵·沙市',
        story: '严七来了第二回。这回带了两个人，坐在铺子里的长凳上，把玩着腰间的铁尺。\n他说：最近上头查得紧，你这铺子的账，我想借去看看。他笑得很和气，和气到让人后背发凉。',
        options: [
          { t: '奉上二十贯，请他"看账辛苦"', dim: 'li', time: '一月', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.ming -= 2; s.hidden.yin -= 4; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 25; s.flags['严七收了钱'] = 1; return '严七掂了掂，收进袖里，说账不必看了。临走时他拍拍你的肩：小东家懂事。往后有事，报我的名字。这句话是护身符，也是绳子。'; } },
          { t: '把真账给他看，一文不藏', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 5; s.attrs.xin += 4; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8; s.flags['账已过目'] = 1; return '严七翻了半个时辰，没找出什么。他合上账本，看了你半晌，说：你倒是个实心人。话是夸，语气却像在记账。'; } },
          { t: '做两本账，把真账藏起来', dim: 'yi', time: '旬日', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 6; s.hidden.yin -= 5; s.flags['做假账'] = 1; s.flags['欺瞒税司'] = 1; return '你连夜重誊了一本，做旧、压皱、洒上茶渍。严七拿走的是那本假的。他没再来，你也没敢松气——他若哪天回过味来，这事就不是钱能了的。'; } },
          { t: '托九娘把严七的底细摸清，反手拿住', dim: 'yi', time: '两月', req: { npc: { id: 'shen', rel: 25 } }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.hidden.yin -= 3; s.hidden.zhi += 8; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 10; s.flags['握严七把柄'] = 1; return '九娘替你摸到严七在外头放债、私分税银的凭据。你把话透了一句给他。严七的脸白了一瞬，随即又笑：小东家，往后咱们是一家人。'; } }
        ]
      },
      {
        id: 'shang_huo', title: '蜀道', weight: 10, tags: ['江湖奇遇'], minScene: 3,
        time: '一年', loc: '江陵→成都',
        story: '川中有客商愿出高价收蜀锦，只是要人亲自押货入蜀。栈道险，山匪多，来回一年。\n父亲说：这一趟若成，铺子能起死回生；若不成，你就别回来了。',
        options: [
          { t: '亲自押货，走栈道', dim: 'yi', time: '一年', fx: function (s) { s.attrs.qian += 26; s.attrs.ti -= 8; s.attrs.ming += 5; s.hidden.yun += 4; s.flags['入过蜀'] = 1; return '栈道窄处只容一人一骑。你在剑门关外遇过一回劫，靠着一句"货是给节度使府上的"唬退了对面的刀。回程时蜀锦成了三倍价，你也瘦脱了形。'; } },
          { t: '雇船帮护送，分他三成利', dim: 'li', time: '一年', req: { qian: 15 }, fx: function (s) { s.attrs.qian += 14; s.attrs.ming += 3; s.npcs.chuan = { name: '船帮把头', rel: 20, alive: true }; s.flags['船帮情'] = 1; return '船帮把头姓吴，收了钱，一路上把货看得比命重。过三峡时翻了半船，他跳下去捞了两趟。到成都清账，他只多要了一壶酒。'; } },
          { t: '改做稳妥的川米生意', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 10; s.attrs.xin += 3; return '你没走栈道，改囤川米。半年下来赚得不多，但一文没亏。父亲说：你这样，铺子传得下去，但发不了家。'; } },
          { t: '把这趟货源转手卖给同行，抽佣', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 12; s.attrs.ming -= 3; s.hidden.yin -= 5; s.flags['转手货源'] = 1; return '你把蜀中的门路卖给了城北另一家，抽了笔不小的佣。那家后来折在山里，人货两空。消息传回来那天，你在铺子里拨了半日算盘，一粒珠子都没拨对。'; } }
        ]
      },
      {
        id: 'shang_shen', title: '九娘', weight: 8, tags: ['情缘'], minScene: 5, age: [17, 36],
        cond: { gender: 'm', npc: { id: 'shen', rel: 20 } },
        time: '半载', loc: '江陵·茶楼后巷',
        story: '九娘病了。她这样的人，病一场，茶楼的位置就没了，消息也就断了。\n她托人捎话给你，只三个字：来看看。你去时，她坐在窗下，脸色比窗纸还白。',
        options: [
          { t: '请医延药，养她半年', dim: 'yi', time: '半载', req: { qian: 18 }, fx: function (s) { s.attrs.qian -= 18; s.hidden.yin += 10; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 30; s.flags['养九娘'] = 1; return '医生来了三回，药钱不轻。九娘好起来后，把茶楼的位置让了，索性替你家管账。她算得比你还快，也比你狠。'; } },
          { t: '给她一笔钱，让她自行安顿', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 8; s.attrs.xin -= 3; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 8; return '你把钱放在她枕边。她看了一眼，没数，说：行。你出门时听见她在里头笑了一声，笑得不像从前。'; } },
          { t: '留下照看，铺子的事先搁下', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.qian -= 10; s.attrs.xin += 8; s.hidden.zhi += 4; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 25; s.flags['伴九娘'] = 1; return '你在她屋里守了半月，煎药、熬粥、听她半夜说胡话。铺子那半年亏了不少。她好后第一句话是：你这个人，做不成大生意。'; } },
          { t: '借她病中把茶楼的地契拿到手', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian += 20; s.attrs.ming -= 5; s.hidden.yin -= 12; s.hidden.zhi += 6; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel -= 30; s.flags['吞九娘产业'] = 1; return '你趁着议药钱，把地契过了户。九娘病好后才知道，什么也没说，只把茶楼的门从里头闩上。往后三年，你铺子里的消息，总比别人慢半日。'; } }
        ]
      },
      {
        id: 'shang_guan', title: '捐纳', weight: 8, tags: ['朝堂风波'], minScene: 7,
        time: '两月', loc: '江陵·州衙',
        story: '州里开了一个捐纳的名目，出三百贯可得一个散官虚衔。父亲说：商人有个官身，出门不必低头。\n可三百贯，是铺子全部的流动本钱。',
        options: [
          { t: '捐下这个衔，换一身官服', dim: 'shi', time: '两月', req: { qian: 30 }, fx: function (s) { s.attrs.qian -= 30; s.attrs.ming += 12; s.flags['有官身'] = 1; return '文书下来那日，你换上那身青袍，站在铺子门口，街坊都来看。父亲摸了摸衣角，说：这就对了。可你夜里算完账，发现铺子已经空了一半。'; } },
          { t: '不捐，把钱压在货上', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 18; s.attrs.ming -= 2; s.flags['货压三仓'] = 1; return '你进了三仓货。那年秋后粮价涨了三成，你赚得比一个散官体面得多。只是在衙门里，你仍旧要站着说话。'; } },
          { t: '拿这笔钱修桥铺路，博一个乡望', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.qian -= 28; s.attrs.ming += 14; s.hidden.yin += 12; s.flags['修桥'] = 1; return '桥修了半年，你出了大半的钱。桥成那日，乡里立了块碑，碑上有你的名字。父亲在碑前站了很久，说：这比官身好。'; } },
          { t: '把钱借给缺钱的吏员，做长久的人情', dim: 'yi', time: '两月', fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 4; s.hidden.yin += 3; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 12; s.flags['放吏债'] = 1; return '你把钱分作几笔，借给了州衙里几个紧要的吏员，不收利，只求记个人情。他们收了，也就记住了。这些人比官身有用，只是不上台面。'; } }
        ]
      }
    ]
  };

  /* ============ 四 · 军户遗孤 ============ */
  D.origins.jun = {
    id: 'jun', name: '军户遗孤',
    age: 15, loc: '陇西·赤亭烽', identity: { m: '军户子', f: '军户女' },
    intro: '你父亲死在陇西的一次小规模冲突里，尸首没有运回来，只带回一副断了的弓和半枚军牌。母亲三年后也去了。\n军籍是世袭的。名册上有你父亲的名字，如今下面添了你的。烽燧下的老兵们看着你长大，也看着你一步步走近他们当年的路。',
    advantages: ['弓马娴熟，筋骨过人', '父辈旧部尚念旧情', '识得边地风沙与刀口'],
    shackles: ['军籍世袭，身不由己', '父死之因疑云未散', '不谙文墨，难入正途'],
    attrs: { ti: 66, cai: 22, qian: 12, ming: 20, xin: 52 },
    hidden: { yun: 46, yin: 52, zhi: 56 },
    flags: { '军籍': 1, '父仇未明': 1 },
    npcs: {
      ahe: { name: '阿禾', rel: 40, alive: true, note: '同伍少年' },
      wei: { name: '魏老校', rel: 35, alive: true, note: '父亲旧部，待你如子' }
    },
    opening: [{
      id: 'org_jun_1', title: '断弓',
      time: '数日', loc: '陇西·赤亭烽',
      story: '魏老校把你父亲的断弓交到你手上，弓臂上的裂纹像一道旧疤。\n"你父当年不是死在胡人箭下。"他压低了声，"那日我们奉命后撤，他却一个人往前去了。谁下的令，我至今不晓。"\n烽燧外的风卷着沙，打在墙上，一声一声。',
      options: [
        { t: '追问下去，要一个名字', dim: 'yi', time: '数日', fx: function (s) { s.hidden.zhi += 8; s.attrs.xin += 3; var n = G.npc(s, 'wei', { name: '魏老校' }); n.rel -= 5; s.flags['追问父死'] = 1; return '魏老校沉默很久，最后只说了一句：等你拿得起弓，我再告诉你。他把断弓挂回墙上，转身进了里屋，那一夜没再出来。'; } },
        { t: '收起断弓，先去把武艺练起来', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.ti += 8; s.attrs.cai += 2; s.attrs.xin += 3; s.flags['苦练'] = 1; return '一年里你日日对着烽燧下的木靶，手掌裂了又合。魏老校偶尔来看，什么也不说，只把你的姿势扳正。'; } },
        { t: '把军牌卖了，想法子脱籍', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 10; s.attrs.ming -= 4; s.hidden.yin -= 4; s.flags['谋脱籍'] = 1; return '军牌当了八贯钱。你拿着钱去县里打听脱籍的门路，人家告诉你：军籍脱不得，除非有人替你死。你把这句话记下了。'; } },
        { t: '去营中应募，做一名正兵', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti += 5; s.attrs.ming += 5; s.attrs.qian += 4; s.flags['入营'] = 1; return '你把名字按在名册上。发下的甲是旧的，肩处有别人的血渍，洗不掉。魏老校见了，只说了句：活着。'; } }
      ]
    }],
    events: [
      {
        id: 'jun_xun', title: '巡边', weight: 11, tags: ['边境战事'], minScene: 2,
        time: '两月', loc: '陇西·边墙外',
        story: '你随队巡边。第五日，斥候回报说前面三十里有胡骑的痕迹，数目不详。\n带队的队正是个二十来岁的年轻人，姓赵，第一次领队。他的马在原地踏了两步，缰绳握得发白。',
        options: [
          { t: '请命带三人前出探路', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ti += 4; s.attrs.ming += 8; s.hidden.yun -= 3; s.hidden.zhi += 4; s.flags['敢战'] = 1; return '你带了三骑贴着沙梁走，摸到近处数清了人：十七骑，是流寇，不是正经的胡兵。回营报信，赵队正看你一眼，说了句：你比你父亲还愣。'; } },
          { t: '劝队正结阵缓行，先报大营', dim: 'shi', time: '两月', req: { cai: 25 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.attrs.xin += 3; return '队正从了你的话。结阵缓行，一路无事。回营后他把这份功劳分了你一半，说：你在，我心里稳。后来他一路升到校尉，逢人便说你的好。'; } },
          { t: '趁乱割几颗首级，回去报功', dim: 'li', time: '数日', fx: function (s) { s.attrs.ming += 5; s.attrs.qian += 6; s.hidden.yin -= 8; s.flags['杀良冒功'] = 1; return '你落在后头，遇见了两个放羊的。首级是带回去了，功也报了。夜里你梦见那两只羊，在城墙外头站着，一动不动地看你。'; } },
          { t: '借巡边之机，摸清商道的关隘', dim: 'li', time: '两月', fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 8; s.flags['识边道'] = 1; return '你把沿路的关隘、水井、可藏人的沟壑都记在心里。这些地方，日后不论是行军还是走货，都值钱。'; } }
        ]
      },
      {
        id: 'jun_fu', title: '旧部', weight: 9, tags: ['日常'], minScene: 4,
        cond: { npc: { id: 'wei', rel: 25 } },
        time: '一月', loc: '陇西·赤亭烽',
        story: '魏老校要走了。他老了，军中不要他，他打算回关中老家去，种两亩地。\n临行前他喝了很多酒，忽然说：你父亲那日往前冲，是因为有人答应他，只要他冲，后头就有人接应。接应的人，没来。',
        options: [
          { t: '问他那人是谁', dim: 'yi', time: '数日', fx: function (s) { s.hidden.zhi += 10; s.attrs.ming += 2; var n = G.npc(s, 'wei', { name: '魏老校' }); n.rel += 10; s.flags['知父死有主使'] = 1; return '他说了一个姓：裴。说完便伏在案上睡了。第二天他走时，什么也没再说，只把那半枚军牌留给了你。'; } },
          { t: '不提旧事，替他备好行装', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.attrs.xin += 6; s.hidden.yin += 8; var n = G.npc(s, 'wei', { name: '魏老校' }); n.rel += 15; s.flags['送魏老校'] = 1; return '你替他备了干粮、一双新靴。他走到门口回头看你，眼睛红着，说：你父亲若是活着，见你这样，会很高兴。这年冬天他死在回乡的路上，消息隔了半年才到。'; } },
          { t: '留他下来，代他养老', dim: 'li', time: '一年', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 5; s.attrs.xin += 4; var n = G.npc(s, 'wei', { name: '魏老校' }); n.rel += 20; s.flags['养魏老校'] = 1; return '你替他在烽燧边赁了间小屋，每月送米。他嘴上骂你多事，却把家里收拾得干净。他说：我这把老骨头，还能替你看几年门。'; } },
          { t: '向他借旧部的名册，另作打算', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 3; s.npcs.wei.rel = 0; s.flags['得旧部名册'] = 1; return '他看了你很久，从怀里摸出一张纸给你。纸上几十个名字，多半已划了。他说：这些人，你找得着，未必叫得动。你收下了。'; } }
        ]
      },
      {
        id: 'jun_pei', title: '裴家子', weight: 8, tags: ['朝堂风波'], minScene: 6,
        cond: { flag: '知父死有主使' },
        time: '两月', loc: '陇西·州城',
        story: '州城来了个督军的年轻人，姓裴，是京中裴氏的旁支。他点名要看赤亭烽的旧档。\n你在营门口与他打了个照面。他先是一愣，随即笑了：你是那谁的儿子？他父亲当年，是条好汉。',
        options: [
          { t: '拔刀相向，当场问个明白', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ti += 3; s.attrs.ming += 6; s.hidden.zhi += 10; s.hidden.yun -= 8; s.flags['与裴家结仇'] = 1; s.npcs.pei = { name: '裴敬', rel: -40, alive: true }; return '刀出鞘半寸就被人按住了。裴家的人不急不恼，甩了甩袖子，说：军中人就是这般。三日后你被调去守最北的一座空烽，粮少水远。'; } },
          { t: '忍下，先摸清他查的是什么', dim: 'shi', time: '两月', req: { cai: 25 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 2; s.hidden.zhi += 4; s.npcs.pei = { name: '裴敬', rel: -10, alive: true }; s.flags['查裴家'] = 1; return '你托旧部打听，才知他查的是当年那批"未及接应"的军令。旧档少了一页。他把这一页的缺失记在心里，也把你记在心里。'; } },
          { t: '主动示好，做他的马前卒', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 5; s.hidden.yin -= 5; s.npcs.pei = { name: '裴敬', rel: 20, alive: true }; s.flags['附裴家'] = 1; return '你替他跑了几趟腿，办了几件他不便办的事。他很满意，临行留了一句话：你父亲的旧案，我能替你翻。这话你不信，但你记住了。'; } },
          { t: '把父亲的断弓给他看，看他如何作答', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.zhi += 6; s.npcs.pei = { name: '裴敬', rel: -5, alive: true }; return '他看了那弓很久，末了说：弓是好弓，可惜人不会等。他把弓还给你，转身走了。你站在原地，忽然明白了一件事：他什么都知道。'; } }
        ]
      },
      {
        id: 'jun_gong', title: '首功', weight: 9, tags: ['边境战事', '灾祸'], minScene: 8, age: [18, 40],
        time: '两月', loc: '陇西·大斗拔谷',
        story: '一场硬仗。胡骑绕后，粮道被截，主将令你这一队死守谷口，等援军。\n箭射完了，就用刀。同伍的人一个一个少下去。阿禾在你左手边，肩头插着一支箭，还在笑。',
        options: [
          { t: '死守不退，替全军争那半日', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ti -= 10; s.attrs.ming += 14; s.attrs.xin += 5; s.hidden.yin += 10; s.hidden.zhi += 6; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.alive = false; s.flags['谷口死守'] = 1; s.flags['阿禾殁'] = 1; return '援军到时，谷口只剩七个人。阿禾是最后一个倒下的，他倒下时还攥着你的衣袖。你活着回来了，也把一件东西永远留在了那道谷口。'; } },
          { t: '带剩下的人突围，能活几个是几个', dim: 'shi', time: '两月', req: { ti: 50 }, fx: function (s) { s.attrs.ti -= 5; s.attrs.ming += 6; s.attrs.xin -= 4; s.hidden.yin -= 6; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.alive = false; s.flags['弃谷突围'] = 1; return '你带着十一个人从侧沟翻出去。谷口破了，后军死伤惨重，军法司后来问你为何不守。你说：守不住。他们记了你的名字，也记了这笔账。'; } },
          { t: '假传号令，骗胡骑分兵', dim: 'yi', time: '两月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 10; s.hidden.yun += 6; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10; s.flags['谷口诈敌'] = 1; return '你叫人打着主将的旗，往东边山坳里跑。胡骑果然分了一半去追。剩下的人守到天黑，援军到了。阿禾活了，肩上留了个洞，逢阴天就疼。'; } },
          { t: '先护送阿禾撤下，再回来', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.ming -= 6; s.attrs.xin += 8; s.hidden.yin += 12; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 20; s.flags['救阿禾'] = 1; return '你把阿禾背下谷，回来时谷口已经破了。军法司要治你的罪，魏老校的旧部联名替你担了下来。阿禾此后跟了你二十年，一句话没多问过。'; } }
        ]
      }
    ]
  };

  /* ============ 五 · 道观童 ============ */
  D.origins.dao = {
    id: 'dao', name: '道观童',
    age: 14, loc: '终南山·玄都观', identity: '道童',
    intro: '你不知自己姓什么。玄都观的徐翁在山门口捡到你，襁褓里只有一枚刻着"玄"字的木牌。\n观里清苦，晨钟暮鼓，抄经、采药、看星。徐翁教你识字、认药、看云色，也教你一些旁人不懂的东西。他从不许你下山。',
    advantages: ['通晓符箓、医理与草木', '识得些旁人不知的事', '心静，耐得住长夜'],
    shackles: ['无姓无宗，俗世视你为方外之人', '难入正途，科考无门', '山门之外，无人识你'],
    attrs: { ti: 44, cai: 40, qian: 8, ming: 16, xin: 62 },
    hidden: { yun: 62, yin: 58, zhi: 26 },
    flags: { '道籍': 1, '身世不明': 1 },
    npcs: { xu: { name: '徐翁', rel: 55, alive: true, note: '玄都观老道，养你长大' } },
    opening: [{
      id: 'org_dao_1', title: '山门',
      time: '数日', loc: '终南山·玄都观',
      story: '山下有人来上香，是个穿孝的妇人。她跪在殿前，烧了三炷香，起来时看见你，忽然站住不动了。\n她的脸白得厉害，嘴唇动了几动，问：你今年多大？\n徐翁从殿后走出来，挡在你们之间。',
      options: [
        { t: '如实答她，看她要说什么', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 3; s.hidden.zhi += 8; s.flags['见过孝妇'] = 1; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel -= 5; return '你说十四。她的手抖起来，说了句"像"，便掩面走了。徐翁直到她下山才松开手里的拂尘，说：往后这样的人，不要理。'; } },
        { t: '退到徐翁身后，不答', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 10; return '你退了一步。徐翁与那妇人说了几句，妇人走时回头看了你一眼，眼里像有火，又像有水。徐翁回来只说：做饭去。'; } },
        { t: '追下山去，问她是何人', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ti += 2; s.hidden.zhi += 10; s.hidden.yun -= 3; s.flags['追问身世'] = 1; return '你在山道上追上她。她只说了一句：你与我儿，同岁。说完便上车走了。车帘落下时，你看见她腕上戴着一只与你木牌同色的玉。'; } },
        { t: '不理会，回殿里继续抄经', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 4; return '你回到案前，一笔一笔抄下去。心却总在"玄"字上停。抄到第七遍，窗外落了一场雪，什么声音也没有。'; } }
      ]
    }],
    events: [
      {
        id: 'dao_yao', title: '采药', weight: 11, tags: ['日常'], minScene: 2,
        time: '半月', loc: '终南山·后谷',
        story: '徐翁让你去后谷采一味"夜合草"，说只在该处、只在雨后三日生。\n你去了，草是找到了，可谷里还有别的东西——一具尸体，官靴，腰间有刀，死了约莫两日，脸上有伤。',
        options: [
          { t: '搜他身上，看他是谁', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 8; s.hidden.yun -= 4; s.flags['得官刀'] = 1; return '他是州衙的捕头。你从他身上摸出一卷文书和一把短刀。文书上画着一个人像，画得不像，可你觉得眼熟。你把刀留下了。'; } },
          { t: '回观报知徐翁，由他处置', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.hidden.yin += 6; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 12; s.flags['报知徐翁'] = 1; return '徐翁听完，脸色变了。他让你引路，到了谷里看了那尸体一眼，只说：埋了。你们埋了一整夜。他再没提起，可自那日后，观门夜里加了闩。'; } },
          { t: '装作未见，采了药就回', dim: 'xiu', time: '半月', fx: function (s) { s.attrs.cai += 3; s.hidden.yun += 3; s.flags['讳言尸首'] = 1; return '你采了药，绕道回观。当夜睡不安稳，梦里总有一双官靴。徐翁看了你一眼，什么也没问。'; } },
          { t: '下山去州城，把这事卖个消息', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 16; s.attrs.ming -= 3; s.hidden.yin -= 6; s.flags['卖消息'] = 1; return '你在州城的茶楼里把话透了出去，换了一小袋钱。第二日就有人上山来问。徐翁把你叫到殿前，跪了半宿。'; } }
        ]
      },
      {
        id: 'dao_ke', title: '夜客', weight: 9, tags: ['鬼神异闻'], minScene: 3,
        time: '数日', loc: '终南山·玄都观',
        story: '三更，有人叩门。开了，外头站着一个浑身湿透的人，说是山下行商，遇雨迷路。\n他进门时，你闻见一股河泥的腥气。徐翁在里屋咳嗽了一声。烛火跳了一下——他站在灯下，脚下没有影子。',
        options: [
          { t: '照常待客，煮一碗姜汤', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yin += 10; s.hidden.yun += 5; s.flags['待夜客'] = 1; return '他喝了汤，坐了一夜，天未亮就走了。临走时说：你家观后那口井，明日别用。第二日井水果然浑了，苦得不能入口。'; } },
          { t: '当门念一段净天地咒', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 4; s.hidden.yun += 3; s.flags['会咒'] = 1; return '你念到一半，他的身形就淡了。门外只剩一摊水。徐翁出来看了一眼，说：念错了两个字。他替你把那两个字纠了，又添了一句：以后莫在人前念。'; } },
          { t: '问他从哪条河来，要替谁捎话', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 6; s.flags['夜客捎话'] = 1; return '他愣了。半晌，他说了个地名，又说了一个女子的名字，请你有朝一日替他说一句"我没负你"。你应了。鸡鸣时他不见了，门槛上留着一枚湿透的铜钱。'; } },
          { t: '闭门不纳，任他站着', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin -= 3; s.hidden.yin -= 4; return '你把门闩上，回到榻上，一夜听着门外有水滴的声音。天亮开门，门外干净得很，什么都没有。'; } }
        ]
      },
      {
        id: 'dao_xu', title: '徐翁病', weight: 10, tags: ['日常', '善缘'], minScene: 6, age: [16, 40],
        cond: { npc: { id: 'xu', alive: true } },
        time: '半载', loc: '终南山·玄都观',
        story: '徐翁病了，起于一场夜雨。他自己把了脉，说不必请医，只把观里的钥匙交给了你。\n他说：我这一生只做错过一件事。你若要问，问；不问，我带到土里去。',
        options: [
          { t: '跪下问：我的身世', dim: 'yi', time: '半载', fx: function (s) { s.hidden.zhi += 12; s.attrs.cai += 5; s.flags['知身世'] = 1; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 15; return '他闭着眼说了很久。说完，他喘了半晌，道：那枚木牌，是你母亲的东西。你父亲……是个不该死的人。他没说完就睡了，此后再没醒来细说。'; } },
          { t: '不问，只守着煎药', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 10; s.hidden.yin += 10; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 25; s.flags['守徐翁'] = 1; return '你煎了半年的药。他有时清醒，教你几味药的脾性，教你如何看一个人的气色。他走那日很安静，窗外的雪落了一整夜。'; } },
          { t: '替他把观中的田产、法器清点清楚', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 10; s.attrs.cai += 4; s.attrs.ming -= 3; s.flags['掌观产'] = 1; return '你把观里的东西一一记在册上。徐翁看着你，什么也没说。他死后，你才明白他那一夜为什么叹气。'; } },
          { t: '下山去请名医，不惜代价', dim: 'yi', time: '半载', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 4; s.hidden.yin += 8; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 20; s.flags['请医救徐翁'] = 1; return '医生来了，诊了半日，说人事已尽。你花了钱，只换来徐翁多活了三个月。那三个月里，他把观中所有的手艺都教了你。'; } }
        ]
      },
      {
        id: 'dao_cheng', title: '入世', weight: 8, tags: ['江湖奇遇'], minScene: 9,
        time: '一季', loc: '终南山下·道口',
        story: '山下道口新立了一块碑，说要征召方术之士入宫奉养。有官差上山来问，观里有没有懂得符水、能治疑难的人。\n徐翁说过：观里的东西，不是拿来换富贵的。可他也说过：人总要吃饭。',
        options: [
          { t: '应召入京，做一名供奉', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian += 18; s.attrs.ming += 12; s.attrs.xin -= 6; s.hidden.zhi += 6; s.flags['入京供奉'] = 1; return '你随官差进了京。宫里很大，也很冷。你替人看过几回病，也替人算过几回命。每回说准了，赏赐就厚一分；说错了，就没人再提。'; } },
          { t: '婉拒，继续留在山中', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.cai += 4; s.hidden.yun += 5; s.flags['守山'] = 1; return '你回了官差。他们说你不识抬举。徐翁没说什么，只是那一夜的茶比往常浓。'; } },
          { t: '下山行医，走村串户换些米粮', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 12; s.attrs.ming += 6; s.attrs.ti -= 4; s.hidden.yin += 12; s.flags['行医'] = 1; return '你背着一只药箱，走了一年山路。治好了几个孩子，也送走了一个老人。村里人叫你"小道长"，见了就塞鸡蛋。'; } },
          { t: '把观里一部禁书偷偷带下山，卖与人', dim: 'yi', time: '两月', fx: function (s) { s.attrs.qian += 26; s.attrs.ming -= 6; s.hidden.yin -= 12; s.hidden.zhi += 8; s.flags['卖禁书'] = 1; return '书卖了个好价。买书的人问你要不要再见识些"别的"，你摇头走了。可你知道，那本书里的东西，已经不在你手上了。'; } }
        ]
      }
    ]
  };

  /* ============ 六 · 罪臣之后 ============ */
  D.origins.zui = {
    id: 'zui', name: '罪臣之后',
    age: 17, loc: '长安·城南陋巷', identity: { m: '罪臣遗孤', f: '罪臣之女' },
    intro: '你父亲曾官至四品，家中奴仆成群。三年前一桩案子，抄家、流放、赐死，一夜之间。\n你因年幼免死，被没入官中为奴，后来被人保了出来，住在城南陋巷。父亲的旧部、旧友，一半死了，一半装作不认识你。\n你记得那些高门的样子，也记得他们关门时的声音。',
    advantages: ['曾见高门风光，识得权贵言语间的刀', '父辈旧案中藏着把柄', '能忍，能装，能等'],
    shackles: ['名在案牍，处处受查', '仇家未必忘了你', '无人肯与你结亲、共事'],
    attrs: { ti: 36, cai: 50, qian: 18, ming: 10, xin: 42 },
    hidden: { yun: 40, yin: 46, zhi: 62 },
    flags: { '罪籍': 1, '父案未雪': 1 },
    npcs: {
      yan: { name: '严七', rel: 5, alive: true, note: '当年押解你父亲的差役' },
      li: { name: '李慕之', rel: 0, alive: true, note: '寒门书生，尚不相识' }
    },
    opening: [{
      id: 'org_zui_1', title: '陋巷',
      time: '数日', loc: '长安·城南陋巷',
      story: '有人叩门。开门一看，是严七，当年押解你父亲的那个差役。他老了些，腰上仍旧挂着那把刀。\n他站在门外不进来，说：你父亲那案子，我经手过。有些话，我憋了三年。\n巷子里有孩子在唱童谣，声音很亮。',
      options: [
        { t: '请他进来，听他慢慢说', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 2; s.hidden.zhi += 8; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 20; s.flags['严七吐实'] = 1; return '他说：案子是先定的，罪证是后凑的。你父亲临刑前托我一件事，我一直没敢办。他从怀里摸出一块旧玉，说这是你父亲让他转交的。'; } },
        { t: '闭门，说不认识他', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.zhi += 4; var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 10; s.flags['拒严七'] = 1; return '你把门关了。他在门外站了一会儿，说：行。脚步声远去。当夜你翻来覆去，想的不是他的话，是他腰上那把刀。'; } },
        { t: '问他：如今谁能替我翻案', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 3; s.hidden.yin -= 3; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10; s.flags['知翻案门路'] = 1; return '他报了两个名字，一个在御史台，一个是当年主审的门生。他说：这两个人，一个要名，一个要钱。你自己挑。说完他走了，没喝你一口水。'; } },
        { t: '把他引进巷子深处，问他当年收了多少', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming -= 4; s.attrs.ti += 2; s.hidden.zhi += 10; s.hidden.yun -= 5; var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 15; s.flags['与严七结怨'] = 1; return '你把话问得很直。他脸色变了，手按在刀上，末了只说了句：小子，你爹当年也是这么硬。他走了，走得很急。'; } }
      ]
    }],
    events: [
      {
        id: 'zui_cha', title: '查籍', weight: 12, tags: ['灾祸'], minScene: 2,
        time: '一月', loc: '长安·城南',
        story: '里正带着两个坊丁来查户籍。你的名字在罪籍册上，墨色比旁人深一分。\n里正说：上头有新令，罪臣之后，不得应举，不得离京。他把册子合上，看了你一眼：你若想走，我也可以当没看见。',
        options: [
          { t: '塞钱给他，请他多照拂', dim: 'li', time: '一月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 2; s.hidden.yin -= 3; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 5; s.flags['买通里正'] = 1; return '里正收了钱，把册子上的名字轻轻刮淡了一笔。他说：你这人懂事。往后有事，先来找我。这话听着像恩，细想是绳。'; } },
          { t: '问他：这新令是谁手里出来的', dim: 'shi', time: '一月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 3; s.hidden.zhi += 5; s.flags['知新令来处'] = 1; return '里正迟疑了一下，说了个衙门的名字，又补了一句：你问这个做什么。你说随便问问。他看你的眼神，从此多了一层。'; } },
          { t: '当夜收拾行李，离开长安', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming -= 5; s.attrs.qian -= 5; s.hidden.yun += 6; s.flags['离京'] = 1; return '你三更出城，守门的卒子正在打盹。出城之后，你回头看了一眼长安的城墙，黑得像一道横着的刀。你没有留恋。'; } },
          { t: '不理会，照旧闭门读书', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 8; s.attrs.xin += 5; s.hidden.zhi += 3; return '你半年没出门，把父亲留下的半箱书读了三遍。册子上的名字淡不淡，与你无关。可你心里知道，这不是长久之计。'; } }
        ]
      },
      {
        id: 'zui_gu', title: '故人门', weight: 10, tags: ['朝堂风波'], minScene: 3,
        time: '一月', loc: '长安·朱雀街',
        story: '父亲当年的门生，如今做了六品官。你记得他，他来家里拜年时抱过你。\n你在他的府门外站了半日。门房说：老爷不见客。你看见他的车从侧门出去，帘子掀了一角，又放下了。',
        options: [
          { t: '跪在门外，跪到有人出来', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.ti -= 5; s.hidden.zhi += 10; s.npcs.men = { name: '父亲门生', rel: 10, alive: true }; s.flags['跪门'] = 1; return '你跪了整整一个下午。黄昏时他派人出来，塞给你一袋钱，说：走吧，别来了。钱是热的，你的膝盖是凉的。'; } },
          { t: '改从他夫人那里入手', dim: 'li', time: '两月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 4; s.npcs.men = { name: '父亲门生', rel: 20, alive: true }; s.flags['走内宅门路'] = 1; return '你托人给他的夫人送了一尊旧年的佛像，说是你父亲从前替他家求来的。三日后，他府上派了个管事来，添了一句：老爷说，过往的事，莫再提。'; } },
          { t: '在街口拦住他的车，当众叫一声世叔', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming -= 6; s.hidden.zhi += 8; s.npcs.men = { name: '父亲门生', rel: -20, alive: true }; s.flags['当街认亲'] = 1; return '满街的人都看了过来。他的脸在帘后白了一瞬，随即笑道：认错人了。车走了。你站在原地，听见身后有人在笑。'; } },
          { t: '算了，回去做自己的事', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 8; s.hidden.zhi -= 8; s.attrs.ming -= 2; return '你转身走了。那半日的屈辱，你后来想起时，已经不那么烫了。有些门，关上了就是关上了。'; } }
        ]
      },
      {
        id: 'zui_an', title: '旧案', weight: 9, tags: ['朝堂风波'], minScene: 6,
        cond: { or: [{ flag: '严七吐实' }, { flag: '知新令来处' }, { flag: '知翻案门路' }] },
        time: '两月', loc: '长安·御史台外',
        story: '你摸到了当年案卷的下落：御史台的旧档房，第七架第三格。\n可旧档房要有人引，进去一趟，需银钱、需人情，也需一个能替你担着的人。',
        options: [
          { t: '倾尽所有，买通档吏进去抄一遍', dim: 'li', time: '两月', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.cai += 6; s.hidden.zhi += 8; s.flags['得案卷抄本'] = 1; return '你在档房里待了一夜，抄了半卷。抄到一处，笔停了——供词上的画押，不是你父亲的笔迹。你把那一页记得死死的。'; } },
          { t: '把这事透给御史台里想整人的那位', dim: 'shi', time: '两月', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 6; s.hidden.yin -= 6; s.hidden.zhi += 10; s.flags['借刀'] = 1; return '你把消息递了上去。半月后，有人被参了一本，罪名与当年那桩案子有关。你父亲的名字，第一次出现在了别人的奏疏里——作为"冤"。'; } },
          { t: '不去碰，把线索封起来', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 8; s.hidden.zhi -= 10; s.flags['封旧案'] = 1; return '你把那些线索锁进了一只木匣，埋在后院。埋的时候你对自己说：活着比什么都强。可你每年都会去那棵树下站一会儿。'; } },
          { t: '夜入档房，强取', dim: 'yi', time: '数日', req: { ti: 35 }, fx: function (s) { s.attrs.ti -= 6; s.attrs.ming -= 4; s.hidden.zhi += 12; s.hidden.yun -= 8; s.flags['窃档'] = 1; s.flags['被通缉'] = 1; return '你翻墙进去，取走了那一卷。第二日城中贴了告示，说御史台失窃。你把卷子藏在灶膛的砖缝里，许多年没敢再看。'; } }
        ]
      },
      {
        id: 'zui_li', title: '同病', weight: 8, tags: ['善缘'], minScene: 5,
        cond: { noflag: '识李慕之' },
        time: '数日', loc: '长安·城南书肆',
        story: '书肆里有个书生，为了一部书与人争执。他说话很急，脸涨得通红，最后被掌柜请了出去。\n你在门口遇见他。他看见你手里那册书，愣了一下，说：你也读这个？他的眼睛很亮，不像这城里的人。',
        options: [
          { t: '请他喝酒，交个朋友', dim: 'yi', time: '数日', fx: function (s) { s.attrs.qian -= 4; s.attrs.ming += 4; s.hidden.yin += 8; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 25; s.flags['识李慕之'] = 1; return '他叫李慕之。酒过三巡，他说：我这一生只想做一件事，让天下人知道寒门也能出人才。你听了没笑。他于是把你当成了知己。'; } },
          { t: '把那册书让给他', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai -= 2; s.attrs.ming += 2; s.hidden.yin += 6; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 15; s.flags['识李慕之'] = 1; return '他把书抱在怀里，说了三遍谢谢。你看他走远，忽然想起父亲当年也这样抱着书。'; } },
          { t: '与他议论时政，探他的底', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 2; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 8; s.flags['识李慕之'] = 1; return '他胆子大，话说得比你还狠。你听着，心里却在算：这样的人，日后要么死得很早，要么站得很高。'; } },
          { t: '不深交，只留个姓名', dim: 'li', time: '数日', fx: function (s) { s.attrs.cai += 2; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 3; s.flags['识李慕之'] = 1; return '你报了姓名。他记住了，很认真地重复了一遍。你走出书肆时想：这城里，还有人肯认真记一个罪臣之子的名字。'; } }
        ]
      }
    ]
  };

  /* ============ 七 · 皇族宗室 ============ */
  var ROYAL = { han: '刘', tang: '李', song: '赵', ming: '朱' };
  var ROYAL_TITLE = { han: '宗室', tang: '宗室', song: '宗室', ming: '宗室' };

  D.origins.huang = {
    id: 'huang', name: '皇族宗室',
    age: 15, loc: '京师·王府',
    /* 17 · 国姓动态化：按注册表 royal 拼（刘氏宗室子 / 姒氏宗室女 / 孛儿只斤氏宗室子…） */
    identity: function (s) {
      var reg = (window.GAME_DATA.registry && window.GAME_DATA.registry.dyn[s.dynasty]) || {};
      var royal = reg.royal && reg.royal !== '—' ? reg.royal : '宗室';
      return royal + '氏宗室' + (s.gender === 'f' ? '女' : '子');
    },
    intro: '你姓国姓。家中食邑万户，府里有属官、有护军、有唱喏的僮仆。逢年过节，宫里下来的赏赐装在描金的箱子里，抬进府门时，街坊都要跪。\n可你父亲从不在人前提"皇"字。他说：这姓是天给的，也是天收的。',
    advantages: ['天潢贵胄，名分压人', '宫中有人，消息比旁人早三日', '见过这世上最好的东西'],
    shackles: ['宗室不得干政，一动便是觊觎', '削藩之议年年都有', '一言不慎，便是谋逆'],
    attrs: { ti: 40, cai: 46, qian: 72, ming: 66, xin: 34 },
    hidden: { yun: 68, yin: 44, zhi: 46 },
    flags: { '宗室': 1, '天潢': 1 },
    npcs: {
      pei: { name: '裴敬', rel: 15, alive: true, note: '世家子弟，与王府往来' },
      yan: { name: '严七', rel: 0, alive: true, note: '宗正寺的小吏' }
    },
    opening: [{
      id: 'org_huang_1', title: '入京',
      time: '一季',
      loc: '京师·王府',
      story: function (s) {
        var reg = (window.GAME_DATA.registry && window.GAME_DATA.registry.dyn[s.dynasty]) || {};
        var xing = (reg.royal && reg.royal !== '—') ? reg.royal : (ROYAL[s.dynasty] || '某');
        return '你姓' + xing + '，是' + (ROYAL_TITLE[s.dynasty] || '宗室') + '，论起来该叫当今一声叔伯。\n\n诏书是秋末到的：宗室子弟年十五以上，入京习礼，随宗正寺读书。府里的长史捧着诏书，手在抖。父亲看了很久，说：习礼是假，看着是真。\n\n母亲连夜替你收拾行装，把一枚旧玉佩缝进衣襟里，说：若有一日不能回来，就把它埋了。';
      },
      options: [
        {
          t: '奉诏入京，一言不发', dim: 'shi', time: '一季',
          fx: function (s) {
            s.attrs.ming += 8; s.attrs.xin += 2; s.flags['入京习礼'] = 1;
            var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 10;
            return '你入了京，住在宗正寺旁的一所旧宅里。宅子不小，门口却有两个兵。与你同来的宗室子弟有十九个，头一个月，谁也不肯先说一句话。';
          }
        },
        {
          t: '称病不去，留在封地', dim: 'li', time: '半载',
          fx: function (s) {
            s.attrs.qian += 8; s.attrs.ming -= 6; s.hidden.zhi += 6;
            s.flags['称病'] = 1; s.flags['朝廷起疑'] = 1;
            return '父亲替你上了病状。宗正寺回了一纸文书，说：既病，好生将养。话说得客气，可那纸文书之后，府门外多了一辆不起眼的车，停了三日。';
          }
        },
        {
          t: '入京，但先托人打听这诏书的来路', dim: 'yi', time: '两月',
          req: { qian: 20 },
          fx: function (s) {
            s.attrs.qian -= 20; s.attrs.cai += 6; s.hidden.zhi += 4;
            s.flags['知诏书来路'] = 1;
            var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 20;
            return '严七收了钱，说了三件事：这诏是某位阁臣拟的；主意的根子在"削"字上；来年还有一道更狠的。他说完，又添了一句：小王爷，这话我没说过。';
          }
        },
        {
          t: '夜里出府，去看一眼自家的封地', dim: 'xiu', time: '半月',
          fx: function (s) {
            s.attrs.xin += 6; s.hidden.yun += 5; s.hidden.zhi += 3;
            return '你换了粗布衣裳，跟着收粮的车出了城。封地上的农户不认得你，指着远处的王府说：那是皇家的地，我们替皇家种。你蹲在田埂上，听了很久。';
          }
        }
      ]
    }],
    events: [
      {
        id: 'huang_xue', title: '削藩', weight: 11, tags: ['朝堂风波'], minScene: 3,
        time: '一季', loc: '京师·宗正寺',
        story: '朝中又议削藩。这回不是说说——三道旨意下来，封地的护军裁了一半，属官撤了七成。\n同来的宗室子弟里，有人当夜就醉了，抱着柱子哭，说：我们连反都没反过。',
        options: [
          { t: '上表请自削护卫，以示无他', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 8; s.attrs.xin += 4; s.hidden.yin += 6; s.flags['自请削藩'] = 1; return '表递上去，宫里赏了一句"知大体"。父亲的信半月后到，只有八个字：你做得对，我很心疼。'; } },
          { t: '暗中把护军的名册抄一份留着', dim: 'yi', time: '两月', fx: function (s) { s.attrs.cai += 6; s.hidden.zhi += 10; s.hidden.yun -= 4; s.flags['藏护军名册'] = 1; return '你把名册抄了两份，一份埋在旧宅的槐树下，一份缝在书箱夹层里。抄的时候手很稳，抄完才发现后背全湿了。'; } },
          { t: '与同来的宗室结个盟，互通声气', dim: 'li', time: '两月', fx: function (s) { s.attrs.ming += 6; s.attrs.qian -= 10; s.flags['宗室结盟'] = 1; return '你们十九个人在一处废园里喝了酒，割破手指，滴在酒里。谁也没说反，只说：将来若有一个出事，余下的替他收尸。'; } },
          { t: '什么也不做，读书、写字、等', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 8; s.attrs.xin += 6; s.hidden.zhi -= 4; return '你抄了半年的《汉书》。抄到《诸侯王表》，笔停了一停，又接着抄下去。'; } }

        ]
      },
      {
        id: 'huang_yan', title: '王府夜宴', weight: 9, tags: ['日常', '情缘'], minScene: 4,
        time: '一月', loc: '京师·王府',
        story: '宗正寺的一位少卿做寿，请了几位宗室。席上有歌，有酒，也有话。\n席间有人提起边事，又有人提起今上的旧事。话说得越来越近，近到不该在席上说的地步。',
        options: [
          { t: '举杯岔开话头，只说风月', dim: 'li', time: '一月', fx: function (s) { s.attrs.ming += 4; s.attrs.xin += 4; s.hidden.zhi -= 3; return '你把话头引到今夜的曲子上，说这支《凉州》弹得好。满席的人都松了口气，顺着你说起了乐工。散席时，那位少卿送出门，看了你一眼。'; } },
          { t: '顺着说下去，探一探各人的底', dim: 'yi', time: '一月', fx: function (s) { s.attrs.cai += 5; s.hidden.zhi += 8; s.flags['席间探底'] = 1; return '你说了两句模棱的话，席上果然有人接。你记住了三个人的名字，也记住了他们说话时手放在哪里。'; } },
          { t: '起身告辞，说府中有事', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你告了罪，先走了。车出巷口时，你回头看了一眼，席上的灯还亮着。后来那一席人里，有两个被参了。'; } },
          { t: '把席上的话记下来，递给该听的人', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 8; s.attrs.qian += 10; s.hidden.yin -= 8; s.hidden.zhi += 6; s.flags['告发席语'] = 1; return '你写了密札，托严七递上去。半月后，席上说话的两个人被贬了。少卿升了官。没人知道是谁写的，可你知道，从这一夜起，你不再是那个只知道读书的宗室子了。'; } }

        ]
      },
      {
        id: 'huang_jin', title: '入值', weight: 9, tags: ['朝堂风波'], minScene: 6,
        time: '一季', loc: '京师·宫城',
        story: '宫里传你入值。宗室入值，是恩典，也是试。\n引路的太监一路不说话，只在拐角处低声提了一句：今日殿上，有人要问宗室该不该领差事。',
        options: [
          { t: '答"宗室不当与朝政"', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 6; s.hidden.zhi -= 5; s.flags['殿对'] = 1; return '你说完，殿上静了一瞬。上头笑了一声，说：倒是个明白人。你退出来时，那太监悄悄说：您这一句，救了半府的人。'; } },
          { t: '答"宗室亦臣子，愿效犬马"', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 12; s.attrs.qian += 10; s.flags['殿对'] = 1; s.flags['得用'] = 1; return '你答得极恭顺。上头点了点头，当场给了一个差事。走出宫门时，你抬头看了看天，忽然明白父亲为什么从不在人前提那个字。'; } },
          { t: '什么也不答，只叩头', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin -= 2; s.hidden.zhi += 6; s.attrs.ming -= 4; return '你只叩头，一句话没说。上头看了你半晌，摆摆手让你退下。回府的路上，你想了一路：这一叩，是保命，也是认了。'; } },
          { t: '反问：陛下要宗室做臣，还是做囚', dim: 'yi', time: '一季', req: { xin: 50 }, fx: function (s) { s.attrs.ming += 14; s.hidden.zhi += 12; s.hidden.yun -= 6; s.flags['殿对'] = 1; s.flags['触怒天颜'] = 1; return '满殿的人都低下了头。上头沉默了很久，忽然笑了：你胆子比你父亲大。你被遣回府，禁足三月。三月里，府门外多了四个兵。'; } }
        ]
      }
    ]
  };

  /* ============ 八 · 将门虎子 ============ */
  D.origins.jiang = {
    id: 'jiang', name: '将门虎子',
    age: 16, loc: '边镇·节度府', identity: { m: '将门子', f: '将门女' },
    intro: '你父亲是这一镇的主将，帐下三千人，姓什么都听他的。你自小在军营里长大，会走路就会骑马，会说话就会喊号。\n可你也听过那句话：飞鸟尽，良弓藏。父亲每回喝多了，都要念一遍。',
    advantages: ['家学弓马，自幼在军中', '父辈部曲尚在，一呼可应', '识得兵事、粮道与人心'],
    shackles: ['兵权是刀，也是靶', '朝廷对将门，从来是又用又防', '父辈的旧账，迟早要算到你头上'],
    attrs: { ti: 64, cai: 34, qian: 40, ming: 34, xin: 46 },
    hidden: { yun: 50, yin: 48, zhi: 52 },
    flags: { '将门': 1, '兵权': 1 },
    npcs: {
      wei: { name: '魏老校', rel: 40, alive: true, note: '父亲的老部下' },
      pei: { name: '裴敬', rel: 5, alive: true, note: '京中来的监军之子' }
    },
    opening: [{
      id: 'org_jiang_1', title: '还京',
      time: '两月', loc: '边镇·节度府',
      story: '诏书到了：召你父亲还京述职，兵权暂交副将。\n父亲接了诏，一夜没睡。第二日清早，他把你叫到校场，让你射三箭。你射完，他看了看靶，说：够用了。然后他解下腰间那柄刀，放在你手里。\n"我这一去，未必回得来。"',
      options: [
        { t: '随父入京，寸步不离', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 4; s.flags['随父入京'] = 1; return '你跟着父亲进了京。他在宫里待了三日，出来时人瘦了一圈，却笑了，说：没事。你不信，可你没问。'; } },
        { t: '留在军中，替父亲看着这三千人', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ming += 10; s.attrs.ti += 4; s.flags['掌军'] = 1; var n = G.npc(s, 'wei', { name: '魏老校' }); n.rel += 10; return '父亲走了。军中三日无事，第四日，副将开始换人。魏老校来找你，说：小将军，你得说话。'; } },
        { t: '把刀收起来，托病不出', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 8; s.attrs.ming -= 6; s.hidden.zhi += 4; s.flags['韬光'] = 1; return '你把刀挂在墙上，病了两个月。军中的事，一概不问。魏老校来看了你三回，第三回什么也没说，放下两坛酒走了。'; } },
        { t: '连夜去见副将，把话挑明', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.attrs.ti += 2; s.hidden.zhi += 6; s.flags['与副将对峙'] = 1; return '你带了三个人，夜里进了副将的帐。他正在写什么，见你进来，把纸压住了。你说：我父亲还没死。他笑了，说：小将军，我知道。'; } }
      ]
    }],
    events: [
      {
        id: 'jiang_xiang', title: '粮饷', weight: 10, tags: ['边境战事'], minScene: 2,
        time: '两月', loc: '边镇·大营',
        story: '粮饷又拖了。三个月，一粒米没到。营里的兵开始杀马。\n管粮的转运使在百里外的城里，说：京里没批。',
        options: [
          { t: '带兵去城外"借"粮', dim: 'yi', time: '两月', fx: function (s) { s.attrs.qian += 20; s.attrs.ming += 6; s.attrs.ti -= 4; s.hidden.yin -= 6; s.flags['借粮'] = 1; s.flags['朝廷记过'] = 1; return '你带了两百人，把城外的官仓"借"了。转运使连夜上表，说你拥兵自重。粮是有了，罪名也有了。'; } },
          { t: '把自己的家财拿出来，先垫上', dim: 'li', time: '两月', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.ming += 16; s.hidden.yin += 14; s.flags['散家财'] = 1; return '你把府里的银子、绢帛、连母亲的嫁妆都拿了出来。粮买回来了，营里那日吃了顿饱饭。老兵们不说话，只是把碗放得很轻。'; } },
          { t: '亲自进京，去户部要', dim: 'shi', time: '一季', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.flags['进京要饷'] = 1; return '你在户部外站了七日，递了九道呈文。第八日，一个郎中出来见你，说：小将军，这粮不是没有，是不想给。'; } },
          { t: '让兵自己想办法，睁一只眼闭一只眼', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 6; s.attrs.ming -= 8; s.hidden.yin -= 8; s.flags['纵兵'] = 1; return '你没拦。三日之内，沿边的村子被抢了七处。有个老妇抱着空罐子坐在路边，看见你的马，什么也没说，只是把罐子抱得更紧。'; } }

        ]
      },
      {
        id: 'jiang_jian', title: '监军', weight: 9, tags: ['朝堂风波'], minScene: 4,
        time: '两月', loc: '边镇·大营',
        story: '京里派了监军来，姓裴，二十出头，说话很客气，客气得像刀子裹了纸。\n他到营的第一件事，是要看兵籍；第二件事，是要在军议上坐主位。',
        options: [
          { t: '让他看，把他当上司待', dim: 'li', time: '两月', fx: function (s) { s.attrs.ming += 6; s.attrs.qian -= 6; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 20; s.flags['裴监军'] = 1; return '你把兵籍双手递上。他一页一页看，看得很细。看完，他说：小将军治军有法。这话是夸，也是记档。'; } },
          { t: '给他一个下马威，军议照旧', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 8; s.attrs.ti -= 2; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 15; s.flags['与监军不睦'] = 1; return '军议上你坐在主位，他坐在侧首。他什么也没说，只是一直在看你的手。散议后，他写了一封很长的信回京。'; } },
          { t: '把他拉到城头，看一遍真正的边关', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 6; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 12; s.flags['裴见边关'] = 1; return '你在城头站了一夜，指给他看哪一处是烽燧，哪一处是死地，哪一处去年死了多少人。天亮时他没说话，回营后把兵籍还给了你。'; } },
          { t: '托人查他的底，备一手', dim: 'shi', time: '两月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.cai += 5; s.hidden.zhi += 6; s.flags['握监军把柄'] = 1; return '你查到他在京中有一笔说不清的账。你把凭据收好，没打算用。可你知道，这东西早晚会有用。'; } }

        ]
      },
      {
        id: 'jiang_gong', title: '战功', weight: 10, tags: ['边境战事'], minScene: 5,
        time: '两月', loc: '边镇·关外',
        story: '胡骑犯边，三千骑，分三路。你手里只有八百人。\n打，可能全折在这里；不打，关后的三个县就没了。',
        options: [
          { t: '据险死守，等援军', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ti -= 8; s.attrs.ming += 14; s.hidden.yin += 10; s.attrs.xin += 6; s.flags['死守'] = 1; return '你在山口守了四日。箭射完了用石头，石头用完了用刀。援军到时，八百人还剩二百。你站在尸堆里，手抖得握不住刀。'; } },
          { t: '弃关，护着三个县的百姓先走', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 16; s.attrs.ti -= 4; s.flags['弃关护民'] = 1; return '你弃了关，带着几万百姓往南撤。关丢了，百姓活了。京里的处分下来时，边地的老人却在路口给你摆了水。'; } },
          { t: '夜袭敌营，斩其首', dim: 'yi', time: '数日', req: { ti: 55 }, fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 18; s.hidden.zhi += 8; s.hidden.yun += 4; s.flags['夜袭'] = 1; return '你带三百骑，夜里摸进敌营，斩了对方一个万夫长。胡骑退了。这一战之后，边地的人叫你"小将军"，不再加你父亲的名字。'; } },
          { t: '按兵不动，先把军报送出去', dim: 'shi', time: '两月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.hidden.zhi += 4; s.flags['持重'] = 1; return '你没动。军报六百里加急送出去，援军十日后到，关还在。可那十日里，关外的村子被烧了四个。'; } }
        ]
      }
    ]
  };

  /* ============ 九 · 匠户之家 ============ */
  D.origins.gong = {
    id: 'gong', name: '匠户之家',
    age: 15, loc: '官营作坊', identity: { m: '匠户子', f: '匠户女' },
    intro: '你家在匠籍，世代替官府做工。父亲是木作的头儿，一把墨斗用了三十年，线还是直的。\n你从六岁起就在作坊里捡刨花，十岁能独立打一张案。匠户不能应举，不能做官，工钱按季发，发多少看工部的心情。\n可父亲说：手上有活，走到哪里都饿不死。',
    advantages: ['一手好手艺，木作、营造、器物皆通', '识得机关、尺寸、材料的脾性', '匠人圈子小，但都认手艺'],
    shackles: ['匠籍世袭，不得应举', '官府征役，随叫随到', '工价被克扣，是常事'],
    attrs: { ti: 52, cai: 40, qian: 20, ming: 14, xin: 50 },
    hidden: { yun: 48, yin: 52, zhi: 38 },
    flags: { '匠籍': 1, '家传手艺': 1 },
    npcs: {
      xu: { name: '徐翁', rel: 25, alive: true, note: '作坊里的老匠头' },
      shen: { name: '沈九娘', rel: 0, alive: true, note: '市井中人，尚不相识' }
    },
    opening: [{
      id: 'org_gong_1', title: '大工',
      time: '一季', loc: '京师·将作监',
      story: '将作监下来一道征役：修宫城西角楼，征匠三百。你家在册，父亲的名字在第一页。\n可父亲的手去年伤了，抬不起大料。他把墨斗推到你面前，说：你去。\n母亲在门口站着，没说话。',
      options: [
        { t: '替父应役，去修角楼', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 4; s.attrs.cai += 6; s.attrs.qian += 8; s.flags['修角楼'] = 1; return '你去了。三百个匠人，吃住都在工棚里。你被分去做斗拱，一天十二个时辰，手里的凿子没停过。监工的老匠头看了你的活，说：你父亲教得好。'; } },
        { t: '拿钱买个人替役', dim: 'li', time: '一月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.ming -= 4; s.hidden.yin -= 6; s.flags['买替役'] = 1; return '你花了钱，找了个外乡人顶名。他走那天，你塞给他两个饼。后来听说角楼塌了一角，压死了三个人。'; } },
        { t: '去求将作监的吏，说父亲的手伤', dim: 'xiu', time: '一月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 4; s.hidden.yin += 6; s.flags['求免役'] = 1; return '吏员看了你父亲的伤手，又看了你，说：匠户没有免役的例。但他把父亲的名字挪到了后头，说：先养着吧。'; } },
        { t: '把家里那套祖传的图样献上去，换一个差事', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 10; s.attrs.qian += 12; s.hidden.zhi += 8; s.flags['献图样'] = 1; return '那套图样是祖父留下的，画的是大木作的榫卯。献上去后，将作监的丞亲自见了你，说：这手艺，不该埋没在工棚里。'; } }
      ]
    }],
    events: [
      {
        id: 'gong_qiao', title: '造桥', weight: 10, tags: ['日常', '善缘'], minScene: 2,
        time: '一季', loc: '城外·河上',
        story: '城外的桥塌了。乡里凑了钱，要请人重造。\n县里的意思，是修一座窄的，够走人就行；乡里的意思，是修宽的，能过车。钱只够一座。',
        options: [
          { t: '按县里的意思修窄桥，快、省、不担责', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 4; return '桥三月就修好了，窄得只能过人。县里很满意，赏了你一匹布。第二年发大水，桥冲了，冲得很干净。'; } },
          { t: '按乡里的意思修宽桥，自己贴钱', dim: 'yi', time: '半载', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 14; s.hidden.yin += 14; s.flags['修宽桥'] = 1; return '桥修了半年，宽得能过两辆车。乡里人立了块碑，碑上刻了你的名字。那块碑在桥头立了很多年。'; } },
          { t: '想法子改一改桥式，宽窄都兼顾', dim: 'xiu', time: '半载', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 10; s.attrs.ming += 8; s.flags['巧作'] = 1; return '你把桥做成三孔，中间走车，两边走人，用料比原样还省。县里的主簿来看了一回，说：这后生，不该只在乡里修桥。'; } },
          { t: '把这活转包出去，抽一份利', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 16; s.attrs.ming -= 6; s.hidden.yin -= 8; s.flags['转包'] = 1; return '你把活转给了外乡的一伙匠人，抽了三成。桥修得潦草，第二年就歪了。乡里人骂的是那伙匠人，你听着，没说话。'; } }

        ]
      },
      {
        id: 'gong_qi', title: '军器', weight: 9, tags: ['边境战事'], minScene: 3,
        time: '一季', loc: '官营作坊',
        story: '军中要三千张弓。将作监把活分下来，工期限三月，用料按旧例。\n旧例的料，做出来的弓，用一年就软。管事的说：历来如此，不必多事。',
        options: [
          { t: '按旧例做，不多事', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 12; s.attrs.ming += 2; s.hidden.yin -= 6; return '三千张弓，如期交了。管事的很满意。三年后边关来了一份文书，说某批弓不堪用，查来查去，查到了料上。'; } },
          { t: '自己贴料，做出能用的弓', dim: 'yi', time: '一季', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 12; s.hidden.yin += 14; s.flags['好弓'] = 1; return '你贴了自家的料，把弓做得比旧例厚两分。交上去时，验弓的军官拉了拉，说：这批弓，不一样。他记住了你的名字。'; } },
          { t: '把旧例的弊写成条陈递上去', dim: 'shi', time: '两月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.hidden.yin += 8; s.flags['条陈'] = 1; s.flags['得罪工匠头'] = 1; return '条陈递上去了。三个月后，新的用料章程下来，比旧例厚了两分。可作坊里的老人从此不太理你。'; } },
          { t: '把好料私卖出去，用次料充数', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 30; s.attrs.ming -= 8; s.hidden.yin -= 16; s.hidden.zhi += 4; s.flags['以次充好'] = 1; return '好料卖了三十贯。次料做的弓，看着一样。你收钱那天，作坊里的老师傅看了你一眼，什么也没说，从此不再让你碰他的墨斗。'; } }

        ]
      },
      {
        id: 'gong_tuo', title: '脱籍', weight: 9, tags: ['朝堂风波'], minScene: 5,
        time: '两月', loc: '京师·户房',
        story: '有人说，匠籍可以脱。条件是：在官造上立一件大功，或有五品以上官员作保。\n前者要拿命去换，后者要拿人情去换。你两样都缺。',
        options: [
          { t: '去求那位认得你的官作保', dim: 'shi', time: '两月', req: { ming: 40 }, fx: function (s) { s.attrs.ming += 8; s.attrs.qian -= 10; s.flags['求保'] = 1; return '你去了。他听完，说：保你可以，但你得先替我做一件事。这话说得客气，你知道这就是价钱。'; } },
          { t: '接一桩没人敢接的官造，拿命去换', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ti -= 8; s.attrs.ming += 12; s.hidden.yun += 6; s.flags['接险工'] = 1; return '那是一座要修在崖上的塔。前两拨匠人都死了。你接了。修了四个月，塔成了，你瘦得脱了形。'; } },
          { t: '不脱了，把手艺传给儿子', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.cai += 4; s.hidden.zhi -= 6; return '你把手艺一样一样教给儿子。教到墨斗时，你说：这线要拉直，人也要直。儿子点点头，手还小，握不住。'; } },
          { t: '花钱买一份假文书', dim: 'li', time: '两月', req: { qian: 30 }, fx: function (s) { s.attrs.qian -= 30; s.attrs.ming += 6; s.hidden.yin -= 6; s.flags['买文书'] = 1; s.flags['籍贯有假'] = 1; return '文书买到了，你真的脱了匠籍。可你此后的名字，是别人的。每回有人问你祖上何处，你都要先想一想。'; } }
        ]
      }
    ]
  };

  /* ============ 十 · 医家传人 ============ */
  D.origins.yi = {
    id: 'yi', name: '医家传人',
    age: 15, loc: '州城·药铺', identity: { m: '医家子', f: '医家女' },
    intro: '你家三代行医，铺子不大，门上挂一块褪了色的木匾。祖父留下的药柜有八十四个抽屉，每一个你都背得出。\n父亲诊病有个规矩：穷人少收，富人照收，官家多收。他说：这不是势利，是让铺子开得下去。',
    advantages: ['家传医术，识药性、脉理', '疫气、伤科皆通', '病家记恩，人情自来'],
    shackles: ['方技之流，士人不与同席', '一旦治死了人，名声尽毁', '疫起时，医者不得退'],
    attrs: { ti: 44, cai: 46, qian: 32, ming: 24, xin: 56 },
    hidden: { yun: 52, yin: 58, zhi: 32 },
    flags: { '医家': 1 },
    npcs: {
      xu: { name: '徐翁', rel: 30, alive: true, note: '游方老医，与你父相熟' },
      ahe: { name: '阿禾', rel: 30, alive: true, note: '药铺里的学徒' }
    },
    opening: [{
      id: 'org_yi_1', title: '疫起',
      time: '一月', loc: '州城·药铺',
      story: '城南起了疫。先是几户，后来一条巷子。官府封了坊门，郎中一个也不许进。\n父亲的药箱已经背上了。他站在门口，回头看你，说：你可以不去。',
      options: [
        { t: '跟着父亲进疫坊', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 10; s.hidden.yin += 16; s.flags['入疫坊'] = 1; return '你们进了坊。药不够，只能用旧的方子减半。父亲诊脉，你抓药、煎药、抬人。一个月里，你们送走了四十一个，救回来六十七个。'; } },
        { t: '留在铺子里，守住药源', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 18; s.attrs.ming -= 4; s.hidden.yin -= 4; s.flags['守药铺'] = 1; return '疫中药价一日三涨，你把铺子里的药卖了个好价。父亲回来后，看着空了的药柜，什么也没说，自己去后院晒药。'; } },
        { t: '把方子抄出去，教里正怎么防', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.hidden.yin += 10; s.flags['传方'] = 1; return '你抄了二十份方子，挨家挨户送。里正按你说的，把病人分开安置，烧了秽物。这一坊比别坊少死了一半人。'; } },
        { t: '去请那位游方的徐翁', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 4; var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 15; s.flags['请徐翁'] = 1; return '徐翁来了。他看了一眼病人，说：这不是疫，是水。他带人去查了井，果然有一口井被尸水污了。封了那口井，疫就缓了。'; } }
      ]
    }],
    events: [
      {
        id: 'yi_gui', title: '贵人', weight: 10, tags: ['朝堂风波'], minScene: 2,
        time: '两月', loc: '州城·府邸',
        story: '一位致仕的老大人病了，请了三个郎中，都不见效。有人举荐了你父亲。\n父亲说：这病我能看，但这府里的事，我看不了。他让你去。',
        options: [
          { t: '去，只诊病，不问别的', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.attrs.qian += 10; s.flags['诊贵人'] = 1; return '你诊了三日，用的是温补的方子。第七日，老大人能坐起来了。他拉着你的手说：你这孩子，眼干净。赏了你一匣银子。'; } },
          { t: '去，并且留心府里的人事', dim: 'shi', time: '两月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 10; s.hidden.zhi += 6; s.flags['识贵府'] = 1; return '你诊病的时候，也看清了这府里谁做主、谁在等、谁在盼着老人死。你把这些记在心里，一个字没说。'; } },
          { t: '推了，说父亲不在，不敢独诊', dim: 'li', time: '数日', fx: function (s) { s.attrs.xin += 4; s.attrs.ming -= 4; return '你推了。三日后，老人死了。举荐你的人后来遇见你，只说了一句：可惜。'; } },
          { t: '去，但开一张不痛不痒的方子', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian += 15; s.attrs.ming -= 6; s.hidden.yin -= 12; s.hidden.zhi += 6; s.flags['开温方'] = 1; return '方子很稳，稳到治不好也治不死。府里给了厚赏，说你有分寸。老人拖了半年，走了。你收钱那日，手有点凉。'; } }

        ]
      },
      {
        id: 'yi_wu', title: '误诊', weight: 9, tags: ['灾祸'], minScene: 4,
        time: '一月', loc: '州城·药铺',
        story: '你诊错了一个人。是个孩子，你说是风寒，其实是什么，后来才知道。\n孩子没救回来。他的父亲抱着一件小衣裳，站在药铺门口，从早站到晚。',
        options: [
          { t: '出去认了，赔钱、赔罪', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 20; s.attrs.ming -= 10; s.attrs.xin += 8; s.hidden.yin += 10; s.flags['认误诊'] = 1; return '你出去，跪下了。他没打你，也没骂你，只是把一件小衣裳放在你手里，说：你留着。此后你每回诊小儿，都要多看三遍。'; } },
          { t: '闭门不出，等事情过去', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.ming -= 14; s.hidden.yin -= 10; s.attrs.xin -= 6; s.flags['讳误诊'] = 1; return '你关了门。第三日，门口的小衣裳不见了。第五日，有人在墙上写了两个字。你擦了，第二天又写上了。'; } },
          { t: '查清楚到底是何病，写成医案', dim: 'shi', time: '两月', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 10; s.attrs.ming += 6; s.hidden.yin += 8; s.flags['著医案'] = 1; return '你把那孩子的症状、脉象、用药，一笔一笔写下来，写成一份医案。后来这份医案救了很多孩子。你把第一页烧给了那孩子。'; } },
          { t: '托人送钱，不露面', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming -= 4; s.hidden.yin += 2; return '你托人送了钱。钱收了，人没来。你知道这事没完，可你也不知道还能做什么。'; } }

        ]
      },
      {
        id: 'yi_gong', title: '召医', weight: 8, tags: ['朝堂风波'], minScene: 6,
        time: '一季', loc: '京师·太医署',
        story: '宫里传召名医。州里把你父亲的名字报了上去，父亲病了，于是换成了你。\n进了太医署才知道，这里的规矩比药方复杂：谁开的方，谁担的责；治好了是恩，治不好是罪。',
        options: [
          { t: '照实诊，该说什么说什么', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 12; s.attrs.cai += 8; s.hidden.zhi += 6; s.flags['太医'] = 1; return '你在御前说了实话：这病能缓，不能断根。满殿的人都替你捏了把汗。上头沉默了一会儿，说：倒也老实。赏了你，也记了你。'; } },
          { t: '跟着院使的话说，稳稳当当', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 18; s.attrs.ming += 6; s.hidden.yin -= 4; s.flags['太医'] = 1; return '你顺着院使的方子添了两味药，说得滴水不漏。宫里很满意。你领了赏，也领了一个不大不小的差事。'; } },
          { t: '借机把民间疾苦写进奏疏', dim: 'shi', time: '一季', req: { cai: 50 }, fx: function (s) { s.attrs.cai += 10; s.attrs.ming += 14; s.hidden.yin += 10; s.flags['医谏'] = 1; return '你在奏疏末尾写了一段：臣来时，见州道上有饿殍。太医院不管这个，可你写了。奏疏留中不发，但有人抄了一份出去。'; } },
          { t: '辞了，回州城开你的药铺', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 6; s.hidden.zhi -= 6; return '你辞了。院使很意外，说：别人求都求不来。你说：我父亲说，医家的地方在病人床边。你回了州城，铺子照旧开着。'; } }
        ]
      }
    ]
  };

  /* ============ 十一 · 乐户贱籍 ============ */
  D.origins.yue = {
    id: 'yue', name: '乐户贱籍',
    age: 14, loc: '教坊·乐营', identity: { m: '乐户子', f: '乐户女' },
    intro: '你生在乐户，籍在教坊司。父亲是乐工，母亲是歌者。你自幼学的第一件事不是识字，是听音。\n贱籍的人不能应举，不能与良民通婚，不能穿绸。可你也见过这城里最体面的人，坐在席上听你唱，听得眼睛发红。',
    advantages: ['通音律，识人心', '消息灵通，比旁人早知道半日', '见惯世态炎凉，不易被吓住'],
    shackles: ['贱籍，不得应举、不得通婚良民', '身不由己，可被买卖、赠予', '颜色一衰，便无人问'],
    attrs: { ti: 34, cai: 42, qian: 16, ming: 30, xin: 38 },
    hidden: { yun: 54, yin: 46, zhi: 42 },
    flags: { '乐籍': 1 },
    npcs: {
      shen: { name: '沈九娘', rel: 30, alive: true, note: '乐营里的姐姐，管着账' },
      pei: { name: '裴敬', rel: 10, alive: true, note: '常来听曲的世家子' }
    },
    opening: [{
      id: 'org_yue_1', title: '献曲',
      time: '一月', loc: '京师·教坊',
      story: '教坊要选人，献入宫中。选上的，从此是宫里的人；选不上的，继续在乐营里熬。\n管事的看着你，说：你嗓子好，模样也过得去。你自己想清楚。',
      options: [
        { t: '应选，赌一个进宫的机会', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 10; s.attrs.qian += 8; s.hidden.zhi += 8; s.flags['入宫献曲'] = 1; return '你被选上了。进宫那日，教坊的姐妹们送到门口，谁也没说话。宫墙很高，墙里很静，静得能听见自己的呼吸。'; } },
        { t: '推了，留在乐营', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 4; s.flags['留乐营'] = 1; return '你说自己不配。管事看了你一眼，没再劝。那一年献进宫的三个人，后来只回来一个。'; } },
        { t: '找九娘，问她有没有别的路', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 4; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 15; s.flags['问九娘'] = 1; return '九娘替你算了一笔账：赎身要多少，脱籍要谁点头，哪个官好说话。她说完，说：这条路难走，可也不是走不通。'; } },
        { t: '趁着献曲，把一支旧曲改成讽世之词', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 6; s.hidden.zhi += 10; s.hidden.yun -= 4; s.flags['讽曲'] = 1; return '你把词改了。唱到一半，席上有人放下了杯子。唱完，满堂寂静。有人低声问：这词是谁写的。你低头说：小的不懂词，是听来的。'; } }
      ]
    }],
    events: [
      {
        id: 'yue_shu', title: '赎身', weight: 10, tags: ['日常', '情缘'], minScene: 2,
        time: '半载', loc: '京师·乐营',
        story: '九娘替你问了价：赎身要八十贯，脱籍还要打点。\n八十贯，是你唱十年也攒不下的数。可有人愿意出。',
        options: [
          { t: '接受那位世家子的好意，赎身', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 20; s.attrs.ming += 8; s.hidden.zhi += 6; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 20; s.flags['赎身'] = 1; s.flags['受人之恩'] = 1; return '裴家替你出了钱。你出了乐营，住进城南一所小院。院子很好，只是门口的人，从教坊的管事换成了裴家的仆人。'; } },
          { t: '自己攒钱，一文一文地攒', dim: 'xiu', time: '两载', req: { qian: 30 }, fx: function (s) { s.attrs.qian -= 30; s.attrs.xin += 8; s.attrs.ming += 6; s.flags['自赎'] = 1; return '你唱了两年，攒够了钱。赎身那日，管事数了三遍，说：你这是何苦。你说：自己的身子，自己赎。'; } },
          { t: '不赎了，就在乐营里做自己的事', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; s.hidden.zhi -= 4; s.attrs.cai += 4; return '你没赎。乐营里也有乐营里的活法，你开始教小一点的孩子们识谱。她们叫你先生，叫得很认真。'; } },
          { t: '借赎身的事，把教坊的黑账摸出来', dim: 'yi', time: '两月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 6; s.hidden.yin += 8; s.hidden.zhi += 8; s.flags['摸教坊账'] = 1; return '你借着算赎身的账，把教坊这些年的进出摸了个大概。数字对不上，差得很远。你把那几张纸藏在琴箱底下。'; } }

        ]
      },
      {
        id: 'yue_xi', title: '堂会', weight: 9, tags: ['江湖奇遇'], minScene: 3,
        time: '一月', loc: '京师·某府',
        story: '一位大官做寿，请了教坊去唱。席上有酒，有权，有刀。\n唱到一半，有人要你改词，把寿主的名字唱进去。你不认得那个人，只知道他坐在最上首，笑得很轻。',
        options: [
          { t: '照他们的意思唱，唱得漂亮', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 16; s.attrs.ming += 8; s.hidden.yin -= 4; s.flags['唱堂会'] = 1; return '你唱得极好，满堂喝彩。寿主赏了一锭银子，说：这孩子会说话。你谢了恩，退到廊下，把手心的汗擦在裙子上。'; } },
          { t: '推说词不熟，唱一支旧的', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 4; return '你说词是新学的，怕唱错。席上有人不悦，可也没发作。你唱了一支极旧的曲子，唱到"旧时王谢"那一句，声音低了下去。'; } },
          { t: '趁唱词，把席上的一桩密事点出来', dim: 'yi', time: '一月', req: { cai: 45 }, fx: function (s) { s.attrs.ming += 12; s.hidden.zhi += 10; s.hidden.yun -= 6; s.flags['词中藏锋'] = 1; return '你把那桩事编进词里，唱得很轻。席上有一半人听懂了，另一半人没听懂。散席后，有个人在门外等你，说：跟我走一趟。'; } },
          { t: '推病不去', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming -= 6; return '你推了病。管事骂了你一顿，扣了半月的钱。你不知道那一夜席上出了什么事，只知道第二日，那位寿主被参了。'; } }

        ]
      },
      {
        id: 'yue_tuo', title: '脱籍', weight: 9, tags: ['朝堂风波'], minScene: 5,
        time: '两月', loc: '京师·教坊司',
        story: '脱籍的文书要过三道手：教坊司、户房、还有一位肯画押的官。\n九娘说：前两道我替你走，最后一道，得你自己去。',
        options: [
          { t: '带着自己攒的钱去，堂堂正正求一次', dim: 'shi', time: '两月', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.ming += 10; s.flags['脱籍'] = 1; s.flags['良民'] = 1; return '你去了。那位官看了文书，看了你，问：你脱了籍，打算做什么？你说：唱自己的曲，挣自己的饭。他笑了，画了押。'; } },
          { t: '托九娘找门路，走人情', dim: 'li', time: '两月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 6; s.hidden.yin -= 4; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 12; s.flags['脱籍'] = 1; s.flags['良民'] = 1; return '九娘走了三趟，请了两回酒。文书下来那日，她把纸递给你，说：往后你是良民了，别再让人看轻。'; } },
          { t: '不脱了，贱籍也有贱籍的活法', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 8; s.hidden.zhi -= 6; s.attrs.ming -= 2; return '你把文书推回去。管事很意外。你说：我在乐营里，还有些人放不下。他看了你很久，说：你这个人，怪。'; } },
          { t: '拿一桩把柄去换那份画押', dim: 'yi', time: '两月', req: { flag: '摸教坊账' }, fx: function (s) { s.attrs.ming += 8; s.hidden.yin -= 6; s.hidden.zhi += 10; s.flags['脱籍'] = 1; s.flags['良民'] = 1; s.flags['威胁官吏'] = 1; return '你把那几张纸放在桌上。那位官看了三行，脸就白了。他画了押，还亲自送你出门。你走出衙门时，天很蓝，你却觉得背后有风。'; } }
        ]
      }
    ]
  };

  /* ============ 十二 · 蕃将之后 ============ */
  D.origins.fan = {
    id: 'fan', name: '蕃将之后',
    age: 16, loc: '边地·羁縻州', identity: { m: '蕃部子弟', f: '蕃部女' },
    intro: '你母亲是汉人，父亲是蕃部的首领。你从小两种话都会说，两边的人却都说你不是自己人。\n朝廷用你父亲守边，也防你父亲守边。你的名字在蕃部的谱上，也在朝廷的册上。',
    advantages: ['骑射娴熟，识得草原与山道', '通胡汉两语，两边都有人', '边地的货、马、盐，你都有门路'],
    shackles: ['非我族类，处处被提防', '两边都不认你', '蕃将不得掌禁军，进京便如入笼'],
    attrs: { ti: 62, cai: 28, qian: 26, ming: 26, xin: 44 },
    hidden: { yun: 46, yin: 50, zhi: 50 },
    flags: { '蕃将': 1, '两姓之人': 1 },
    npcs: {
      wei: { name: '魏老校', rel: 25, alive: true, note: '父亲部下的汉军校尉' },
      ahe: { name: '阿禾', rel: 40, alive: true, note: '一起长大的蕃部少年' }
    },
    opening: [{
      id: 'org_fan_1', title: '征发',
      time: '一月', loc: '边地·羁縻州',
      story: '朝廷来了一道令：征蕃部骑兵五百，随官军出征。\n父亲把令放在案上，看着你，说：这一次，你带人去。\n帐外，阿禾正在磨刀。他抬头看你，问：我们这一趟，是替谁打？',
      options: [
        { t: '带人出征，按令行事', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ti += 6; s.attrs.ming += 8; s.attrs.qian += 8; s.flags['从征'] = 1; return '你带了五百骑，跟着官军走了两个月。旗号是朝廷的，打的却是你最熟的那片草原。回来时，五百人少了六十个。'; } },
        { t: '推说部中马少，只出二百', dim: 'li', time: '两月', fx: function (s) { s.attrs.ming -= 6; s.attrs.qian += 6; s.hidden.yun += 4; s.flags['减员'] = 1; return '你只点了二百人。官军的监军很恼，可边地的事，他也说不清。二百人去了，回来一百七十个。你把省下来的马分给了部中的人家。'; } },
        { t: '先问阿禾：你想去打谁', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.zhi += 4; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12; return '阿禾说：我不想打谁，我只想活着回来。你沉默了很久，说：那我尽量让你们都回来。他把刀往地上一插，说：行，我跟着你。'; } },
        { t: '把这道令压下来，派人去京里打点', dim: 'yi', time: '两月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.cai += 5; s.hidden.zhi += 8; s.flags['压令'] = 1; s.flags['朝廷起疑'] = 1; return '令压下来了，人去了京里。回话说：可以拖，但拖不过一年。你父亲听完，只说了一句：一年，够了。'; } }
      ]
    }],
    events: [
      {
        id: 'fan_shi', title: '边市', weight: 10, tags: ['江湖奇遇'], minScene: 2,
        time: '一月', loc: '边地·互市',
        story: '边市开了。汉人的茶、盐、铁器，蕃部的马、皮、乳酪，都在这里换。\n可今年朝廷下了新禁：铁器不许出关。市上的人都在看你的脸色。',
        options: [
          { t: '照禁办事，铁器一律不许出', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 8; s.attrs.qian -= 6; s.flags['守禁'] = 1; return '你把三车铁器扣在了市口。蕃部的老首领在你帐外站了半日，说：今年冬天冷，没有铁，锅都补不上。你说：我知道。他没再说什么，转身走了，背影很直。'; } },
          { t: '睁一只眼，让铁器过去', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 24; s.hidden.yin -= 4; s.flags['放铁'] = 1; s.flags['违禁'] = 1; return '铁器过去了，钱也过来了。边市热闹了一整个月。你收钱的时候，看见魏老校在远处看着你，看了很久，转身走了。'; } },
          { t: '把铁器折成农具，按"器用"报', dim: 'xiu', time: '一月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 8; s.attrs.qian += 10; s.attrs.ming += 6; s.flags['铁改农具'] = 1; return '你把铁器重铸成锄、犁、锅，报了个"农器"。文书上写得滴水不漏。监市的官看了半天，说：你这人，脑子活。'; } },
          { t: '把禁令的事透给京里，换一个功', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 10; s.attrs.qian += 8; s.hidden.yin -= 8; s.flags['告边市'] = 1; return '你把市上私贩铁器的人报了上去。官府查了一批，赏了你。可边市上的人从此见了你，话都少了一半。'; } }

        ]
      },
      {
        id: 'fan_yi', title: '猜忌', weight: 9, tags: ['朝堂风波'], minScene: 4,
        time: '两月', loc: '京师·馆驿',
        story: '你随父亲入京朝见。馆驿的安排很周到，周到得每一步都有人跟着。\n第三日，一位御史递了本章，说蕃将拥兵，恐为后患。',
        options: [
          { t: '上表自请留京为质，交出兵权', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ming += 12; s.attrs.xin += 8; s.hidden.zhi -= 6; s.flags['留京为质'] = 1; return '你自请留京，把部中兵事交给了副手。父亲在驿馆里坐了一夜，第二日拍了拍你的肩，说：你比我明白。'; } },
          { t: '把部中的账目、兵籍全数呈上，自证清白', dim: 'xiu', time: '两月', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 10; s.hidden.yin += 6; s.flags['呈账'] = 1; return '账目呈上去，清清楚楚。御史看了半月，没挑出错。宫里传话说：知道了。这三个字，比什么赏都重。'; } },
          { t: '暗中联络京中的蕃将旧交', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 10; s.hidden.yun -= 6; s.flags['联蕃将'] = 1; s.flags['结党'] = 1; return '你见了三位蕃将旧交。你们在一处不起眼的宅子里坐了一夜，什么也没定，只是都知道：若有一日，还有彼此。'; } },
          { t: '什么也不辩，等朝廷自己查', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 4; s.hidden.zhi += 4; return '你什么也没做。查了三个月，查不出什么，御史自己请了罪。可你知道，这种事，查一次不成，还会有第二次。'; } }

        ]
      },
      {
        id: 'fan_liang', title: '两难', weight: 9, tags: ['边境战事'], minScene: 5,
        time: '两月', loc: '边地·关下',
        story: '关外的部众被逼得反了。领头的，是你小时候的玩伴。\n朝廷命你去平。关上的兵看着你，关外的马也看着你。',
        options: [
          { t: '出关，与他阵前说话', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 12; s.attrs.xin += 6; s.hidden.yin += 10; s.hidden.zhi += 8; s.flags['阵前说话'] = 1; return '你单人出关，在阵前站了很久。他骑马过来，说：你还记得我们小时候偷马的事么。你说：记得。他笑了，说：那你回去吧，这一仗，我不打你。'; } },
          { t: '按令进兵，把乱平了', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ti += 4; s.attrs.ming += 10; s.attrs.qian += 12; s.hidden.yin -= 10; s.hidden.zhi += 6; s.flags['平乱'] = 1; return '你进了兵。这一仗打得很干净，也很冷。乱平了，首级装了十几辆车。京里的赏赐下来时，你正在给那些死了的部众念经。'; } },
          { t: '按兵不动，暗里给他一条退路', dim: 'li', time: '两月', fx: function (s) { s.attrs.ming -= 4; s.hidden.yin += 14; s.hidden.zhi += 4; s.flags['纵敌'] = 1; s.flags['暗通部众'] = 1; return '你按兵不动，把西边的一条小道空了出来。三日后，部众从那里走了。京里查问，你说：兵少，堵不住。这话没人信，也没人深究。'; } },
          { t: '上表请朝廷招抚，别打', dim: 'shi', time: '两月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 10; s.hidden.yin += 12; s.flags['请招抚'] = 1; return '你的表递了三道。第三道批下来：准。部众降了，首领被安置在关内。他后来常来找你喝酒，一句话不说，喝完就走。'; } }
        ]
      }
    ]
  };

})(window.GAME_DATA);
