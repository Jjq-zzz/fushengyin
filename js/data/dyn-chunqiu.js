/* 「春秋」朝代内容包：霸主会盟，礼未全崩 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.chunqiu = {
    id: 'chunqiu', name: '春秋',
    clock: { year: 1, season: 1 }, eras: [],
    events: [
      { id: 'cq_huimeng', title: '会盟', tags: ['朝堂风波'], weight: 11,
        story: '两国会盟，你的主公命你执玉。\n执玉之礼：玉贵于命。盟坛之上失手碎玉，是辱国；护玉太紧误了礼，是失仪。',
        options: [
          { t: '苦练执玉之仪，滴水不漏', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 5; return '盟坛上你双手奉玉，纹丝不动。两国的司礼都点了头。礼成之日，你的名字在两国司礼的册子上。'; } },
          { t: '以玉为质，私下与对方通好', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 5; s.flags['私通盟国'] = 1; return '你借执玉之便与对方的行人搭上了线。此后两国的消息，有一半先过你的手。'; } },
          { t: '教主公以辞让，宁可失玉不失礼', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 3; return '你劝主公：玉碎了可复得，礼失了不可复。盟上对方果然刁难，主公让得体面，反受各国称许。'; } },
          { t: '临坛装病，避开这趟差', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 2; s.hidden.zhi += 3; return '你病了。玉由别人执——那人手抖了三次，玉没碎，他从此升了职。你看着他，把自己的病又养了三个月。'; } }
        ] },
      { id: 'cq_shijun', title: '弑君', tags: ['朝堂风波', '灾祸'], weight: 10,
        story: '国中传出弑君之变，新立的君要人表态。\n史官已经提笔了：书「某弑其君」——史笔如刀，落在谁头上，谁就遗臭。也有人说，机会来了，站对了就是从龙之功。',
        options: [
          { t: '闭门不表，静观其变', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 3; return '你称病十日。新君坐稳了，没追究沉默的人。史册上也没有你的名字——这种时候，无名即是有名。'; } },
          { t: '率先称臣，取从龙之功', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 8; s.flags['从龙'] = 1; return '你第一个上表称臣。新君赏了你。此后每见史官，你都下意识避开他的眼睛。'; } },
          { t: '为旧君发丧，冒死上谏', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 8; s.attrs.xin += 8; s.hidden.yun -= 6; s.flags['冒死谏'] = 1; if (Math.random() < 0.5) return '你麻衣素服，为新君所不容，囚了十日放还。太史把你的名字记在了旧君的列传里——那一行，值。'; return '你被杖逐出国。太史记了你的事，别国的人都知道了你的名字。你在他乡住了三年，反倒安全。'; } },
          { t: '趁乱收拢旧府的人与物', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.attrs.ming -= 3; s.hidden.yin -= 4; return '旧府的人散了，物散了，你收拢了一部分。乱世里这叫「善后」，太平年叫「趁火」。'; } }
        ] },
      { id: 'cq_yangshi', title: '养士', tags: ['日常'], weight: 10,
        story: '卿大夫家门下养士，管饭，也给出路。\n你可以去投——士的身份不问出身，只问本事。门客有上百，出头的十之一二。',
        options: [
          { t: '投身门下，从末座做起', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 3; s.flags['为门客'] = 1; return '你坐了三个月末座，把门里的人脉摸透了。第四个月，上客的席上多了一副你的箸。'; } },
          { t: '献一策求上客之位', dim: 'shi', time: '一季', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; if (Math.random() < 0.55) return '你的策被采纳了半条——半条就够。你被请进了上客的席。席上酒好，你却只记得那半条。'; return '策递上去了，石沉大海。你在末座又坐了一季，把这口气咽成了学问。'; } },
          { t: '不入豪门，自耕自读', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.ti += 3; s.attrs.cai += 3; s.attrs.xin += 5; return '你守着自己的几亩田与几卷书。门客们进进出出，你看着他们，像看另一种庄稼。'; } },
          { t: '周旋于数家之间，两头食禄', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 6; s.flags['客两家'] = 1; return '你同时领两家的禄，替两边传不宜传的话。三月后你富了，两家都知道了——你还活着，因为暂时谁都不想先动手。'; } }
        ] },
      { id: 'cq_fushi', title: '赋诗', tags: ['日常', '善缘'], weight: 9,
        story: '诸侯宴享，赋诗言志——诗错一句，两国的关系就要抖三抖。\n这次宴上，主公指名让你应和。',
        options: [
          { t: '引《诗》应和，中规中矩', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ming += 5; s.attrs.cai += 3; return '你引的诗句典正，两国宾主都挑不出错。宴后行人赞了主公一句「善使人」。'; } },
          { t: '改一字，暗藏锋芒', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yun -= 3; return '你把诗改了一字，讽意全出。对方行人的脸色变了三次。主公散宴后说：你今天替我出了一口气——也知道这口气要用什么还。'; } },
          { t: '称不能诗，辞而不赋', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.attrs.ming -= 2; return '你说不能诗。满座的目光略过了你。平庸的宴，平安的夜。'; } },
          { t: '提前打探对方将赋何篇', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.attrs.cai += 4; s.hidden.yin -= 2; return '你花钱买通了对方的乐工，知道了他们将赋的篇目。应和时字字都在他们的上风——赢得漂亮，赢得不干净。'; } }
        ] },
      { id: 'cq_jiachen', title: '家臣', tags: ['朝堂风波'], weight: 9,
        story: '你所在的大夫家，家臣的势力比主公的公室还盛。\n有人劝你趁势站到家臣那边——陪臣执国命，也是命。有人劝你念旧主之恩。',
        options: [
          { t: '忠于公室，暗中报信', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 6; s.attrs.ming -= 2; s.flags['忠公室'] = 1; return '你把家臣的动向报给了公室。三家分晋之势已显，你的消息再无人来问——忠臣这个字，是拿命垫的。'; } },
          { t: '随家臣执国命', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.attrs.qian += 6; s.hidden.yin -= 6; s.flags['随家臣'] = 1; return '家臣掌了权，你分到了实惠。史官的竹简上，「陪臣执国命」六个字里，有你一笔。'; } },
          { t: '居中调停，两边都不得罪', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.xin -= 4; s.hidden.yun += 3; return '你说合了几次，两边都让你三分。你成了那个「有用的人」——有用的位置，通常不安全。'; } },
          { t: '辞官去国，一走了之', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 4; return '你把印绶留在案上，出城去了。走到界碑时你回头望了一眼——那座城还在冒烟，你已经不欠它什么了。'; } }
        ] },
      { id: 'cq_junzi', title: '君子之猎', tags: ['日常'], weight: 8,
        story: '国君田猎，从人如云。礼法说：猎有三驱之制，不掩群，不取卵。\n兽到了眼前，礼与猎的规矩，人人都看得见，人人都未必守。',
        options: [
          { t: '守三驱之礼，不越一分', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 5; return '你按礼进退，猎获不多。国君在车上看见了，回宫后赏了你——赏的不是兽，是礼。'; } },
          { t: '舍礼逐兽，满载而归', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 6; s.attrs.ming -= 4; s.hidden.yin -= 3; return '你的车装得最满。同僚背后学你的样子笑——笑声里没有敬意。'; } },
          { t: '猎而有获，分与同车之人', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.attrs.qian -= 2; s.hidden.yin += 4; return '你猎了不少，下车就分了。同车的人从此认你。礼没了半分，人得了一群。'; } },
          { t: '借猎观阵，暗记军备', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 3; s.flags['观阵'] = 1; return '你把这次田猎当成了阅兵，暗记车马的数量与阵形的疏密。回来写成一卷，你的主公读了两遍。'; } }
        ] },
      { id: 'cq_shibi', title: '史笔', tags: ['朝堂风波'], weight: 9, minScene: 10,
        story: '太史要记载一场惨败，直书主帅之过。\n主头的家臣来封口：改一个字，赏百金；不改，你的史位就到头了。太史年迈，问你怎么办。',
        options: [
          { t: '劝太史直书不隐', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 10; s.attrs.ming += 6; s.hidden.yun -= 6; s.flags['护史笔'] = 1; return '太史照书了。他死于次年——不是被杀，是老死。你接了他的简册，每一笔都写得很重。'; } },
          { t: '受金改字', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 12; s.flags['改史'] = 1; return '字改了，金收了。简册上那行字从此面目全非。你夜里翻简时，总把那页翻得快些。'; } },
          { t: '抄录两份：一份呈上，一份藏名山', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 6; s.hidden.yin += 8; s.flags['藏史'] = 1; return '呈上的那份改了字。藏的那份埋在了山里的陶瓮中。你不知道它会不会被挖出来——埋下去的时候，你心里的一页放下了。'; } },
          { t: '称病避席，不碰这简', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.hidden.zhi += 4; return '你告了病。简册由别人改。你躲开了金，也躲开了那一笔——躲开的字，会在别的地方等你。'; } }
        ] },
      { id: 'cq_gongzhan', title: '围城', tags: ['边境战事', '灾祸'], weight: 9, minScene: 12,
        story: '敌军围城了。\n城里粮支一月，援军无信。守将问计于众，有人说降，有人说守，有人说趁夜突围请援。你在一旁听着——这城的命，正在被几句话掂量。',
        options: [
          { t: '上城协守，与城共存', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti -= 6; s.attrs.xin += 8; G.addFame(s, 'xiang', 8); if (Math.random() < 0.55) { s.attrs.ming += 8; return '守到第二十九日，援军到了。城头的旗没换。守将把你名字刻在了城门的横木上。'; } s.attrs.ming -= 5; s.flags['城破被掳'] = 1; return '城破在第三十三日。你被掳去做了三个月的役工，逃回来时城已易主。你活着，城没活。'; } },
          { t: '缒城而出，突围请援', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ti -= 5; s.hidden.yun += 5; if (Math.random() < 0.5) { s.attrs.ming += 10; return '你绳城而下，穿过两道封锁把信送到了。援军动身那日，你已经跑废了一双鞋。'; } s.attrs.ming -= 3; return '信送到了，援军没动——人家也有自己的城要守。你把这四个字带回去时，不敢抬头。'; } },
          { t: '暗中与围军议降条件', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 6; s.flags['议过降'] = 1; return '你摸清了对方开出的条件。城最后守住了，条件用不上——可知道条件的人都记住了你。'; } },
          { t: '囤粮居奇，等城开', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 10; return '围城一月，粮价飞涨。你家的粮囤出了十倍的价。城破或城存，你都赢了——赢的方式，让活下来的人心里发凉。'; } }
        ] }
    ],
    main: [
      { id: 'cq_m1', title: '观社', after: 0, time: '数日',
        story: '你十四岁，随父观曹刿论战之后的社祭。\n老人说：那一年，一个布衣在长勺看见了胜机。满场的人都在传「一鼓作气」。\n你回家路上问父亲：布衣凭什么能上战场说话？父亲说：凭他读过的书，和敢开口的胆。',
        options: [
          { t: '立志读书，待时而动', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 6; s.hidden.zhi += 5; s.flags['观社之志'] = 1; return '你把「一鼓作气」四个字刻在了案头。此后十年，你没让它褪色。'; } },
          { t: '记下父亲的话，原样教给村中孩子', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 5; s.attrs.cai += 3; return '你在村塾把这段故事讲给孩子们听。有个孩子问：胆能读出来吗？你说：能，慢慢读。'; } },
          { t: '只记住热闹，回家做小买卖', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 5; return '你在社市倒腾了两趟货。胜机什么的，不如当日的饼价实在。'; } },
          { t: '问：若败了呢？', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.hidden.zhi += 4; return '父亲答不上来，只说：败了的人，史书不写。你从此对不写的那部分人，多了一份心。'; } }
        ] },
      { id: 'cq_m2', title: '问鼎', after: 12, time: '一季',
        story: '传闻楚子使人问周鼎之轻重。\n天下哗然。你所在的国家夹在大国之间，主公夜不能寐，召问：「鼎之轻重，可问乎？可扛乎？」',
        options: [
          { t: '答：在德不在鼎', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.flags['答鼎'] = 1; return '你说：鼎之轻重，在德不在力。主公沉默良久，把这八个字用在了国书上。四方称善。'; } },
          { t: '劝主公早择大国而附', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 6; s.attrs.xin -= 4; s.flags['附大国'] = 1; return '主公附了一个大国，贡赋重了，兵祸少了。你说不清这买卖是赚是赔——先活着，再说。'; } },
          { t: '请缨使楚，亲探其意', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.hidden.yun -= 4; if (Math.random() < 0.5) return '你在楚廷应对得体，探回了实情：楚意在东，不在你们。主公睡了一个整觉。'; return '你差点被扣在楚。回来时瘦了一圈，带回的消息是：楚人意不可测。这五个字，值你那趟险。'; } },
          { t: '劝主公修内政，不问鼎事', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.cai += 4; return '你说：鼎重千钧，问我一国之民力足不足。主公听了后半句，减了两项徭役。'; } }
        ] }
    ],
    endings: [
      { name: '一国之谏', group: '春显', pri: 70,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.8 + (s.attrs.xin - 55) * 0.8 + (s.flags['答鼎'] ? 14 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '他以一言存社稷，以百年存一句话。',
        epilogue: '你晚年不再出仕，在家著书。\n你写的东西里最有名的一句，是当年在朝堂上说的那句。后人把它刻在了各处的门楣上。\n你死时，吊唁的人里有三国的行人。他们对你的评价出奇一致：这个人，话少，但每句都有用。' },
      { name: '乱世过客', group: '春中', pri: 46,
        score: function (s) { var v = (100 - s.attrs.ming) * 0.3 + (s.flags['城破被掳'] ? 10 : 0) + (s.hidden.yun - 40) * 0.3; return Math.max(0, Math.min(100, v)); },
        verdict: '礼崩乐坏的年月，他走过了许多城的门。',
        epilogue: '你这一生换过三个国家、五座城。\n每座城你都会待上几年，学一点当地的规矩，留一点自己的手艺。\n没有一国的史书记你。你在路上救过的一个人，后来把他儿子的名字取成了你的字——这是你被记住的唯一方式。' }
    ]
  };
})(window.GAME_DATA);
