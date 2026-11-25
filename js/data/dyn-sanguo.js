/* 「三国」朝代内容包：兵戈未息，中正将起 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.sanguo = {
    id: 'sanguo', name: '三国',
    clock: { year: 1, season: 1 }, eras: [],
    events: [
      { id: 'sg_zezu', title: '择主', tags: ['朝堂风波'], weight: 12,
        story: '三家鼎立，使者在乡里往来招揽。\n北边的给钱，南边的给名，西边的给「兴复」的说法。择主如嫁女，一嫁定终身。',
        options: [
          { t: '投北，图实利', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.attrs.ming += 4; s.flags['仕北'] = 1; return '你在北边得了一个屯田督的缺。饷足，法严，日子过得像兵器。'; } },
          { t: '投南，从名士游', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.flags['仕南'] = 1; return '南边的幕府里文人多。你半年里结识的人物，够你吹一辈子——也够你的主公看紧你一辈子。'; } },
          { t: '投西，践兴复之诺', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 5; s.hidden.zhi += 4; s.flags['仕西'] = 1; return '西边的队伍穷，但说的那句口号让人睡得着觉。你领了半份饷，领了十分的心气。'; } },
          { t: '不投，守乡观势', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 4; s.flags['观望'] = 1; return '三家的使者都走后，你家门前的脚印各留了三双。你谁也没跟。两年后形势明了，你再去投——投的人挑你，你挑时局。'; } }
        ] },
      { id: 'sg_juntun', title: '军屯', tags: ['日常'], weight: 10,
        story: '大军就食于屯田，兵农一体。\n你被编入屯田籍：战时执矛，闲时执耒。屯官说：收成好的屯，冬天有肉；收成差的屯，冬天有账。',
        options: [
          { t: '勤于屯事，成屯中标杆', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 4; s.attrs.qian += 4; G.addFame(s, 'xiang', 4); return '你的田在屯里年年居首。屯官带人来学，你把垄距的道理讲给他们——矛与耒，你都要拿得稳。'; } },
          { t: '改良屯田水利', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 4; s.flags['屯田水利'] = 1; return '你引溪水灌了半个屯。军中书佐把你的法子报了上去——报上去的东西，就不再是你一个人的了。'; } },
          { t: '操练之余贩私盐', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 6; s.flags['屯中私货'] = 1; return '你用操练的空当跑了三趟私货。屯官睁一只眼——他自己也有一只眼闭着的账。'; } },
          { t: '请调前线，求战功', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 6; if (Math.random() < 0.45) { s.flags['阵功'] = 1; return '你在阵前立了功，升了队率。屯里的旧同伴送你出营——送行的人比出征的人平静。'; } s.attrs.ming -= 4; return '前线打了败仗，你带伤回屯。军功成了笑话，命成了本钱。'; } }
        ] },
      { id: 'sg_jiangxiang', title: '降与守', tags: ['朝堂风波', '灾祸'], weight: 10,
        story: '邻城守将举城而降，城里的人们反而活了下来。\n本城的守将誓与城共存亡，围城月余，粮尽了。城里的意见分成了两半，你的名字要落在其中一半。',
        options: [
          { t: '力主死守到底', dim: 'yi', time: '一月', fx: function (s) { s.attrs.xin += 8; s.attrs.ti -= 6; if (Math.random() < 0.5) { s.attrs.ming += 8; s.flags['守城之功'] = 1; return '援军到了，城活了。守将拉着你的手说了两个字：没降。这两个字，够你用一生。'; } s.flags['城殉'] = 1; s.attrs.ming += 5; s.hidden.yun -= 5; return '城破了。你被俘三月放还，回了已成空城的家乡。史书没写这座城——你写了，写在族谱的边角。'; } },
          { t: '密议开城，保一城生灵', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin -= 5; s.hidden.yin += 8; s.attrs.ming -= 3; s.flags['主降'] = 1; return '你与几个父老夜里去见守将，跪着说了「城中生灵」四个字。守将沉默一夜，开门了。城活了下来，你背上了另一样东西。'; } },
          { t: '趁乱携家出城', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yun += 6; s.hidden.yin -= 3; return '你从水门走了。半年后听说城破了。你在新住处给孩子起名，特意避开旧城的名字。'; } },
          { t: '囤粮居奇，两头做买卖', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 10; s.flags['围城发市'] = 1; return '守军买你的粮，围军也买。战后两边都活着，你成了两边都不待见的富人——活着，且不待见，这是你应得的。'; } }
        ] },
      { id: 'sg_youshui', title: '舌辩', tags: ['朝堂风波'], weight: 9,
        story: '两军对垒，主帅遣使阵前论战。\n使者选人时看中了你——说你「言辞便给，胆子不小」。阵前论战，说输了丢人，说赢了丢命。',
        options: [
          { t: '应召阵前论辩', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.hidden.yun -= 4; return '你在阵前引经据典，把对方的副将驳得哑口。两军阵前难得安静了片刻——那一阵安静里，你的名字传遍两营。'; } },
          { t: '借论辩之机探敌虚实', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 5; s.flags['探阵'] = 1; return '你把论战变成了问对，绕着圈子问了三件事。回营后你的「言辞记录」被军中书佐单独抄了一份。'; } },
          { t: '请辞，说降卒之义', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你说阵前之言徒逞口舌。使者换了别人。半个月后那人死在流矢之下——你听说后，把辞差的那天又想了一遍。'; } },
          { t: '阵前倒戈献言', dim: 'yi', time: '旬日', fx: function (s) { s.hidden.yin -= 10; s.attrs.qian += 8; s.flags['阵前卖言'] = 1; return '你话说到一半变了风向，替对方说了话。对方赏了你，本方要拿你——你连夜过了江。舌头养活你，也赶你走。'; } }
        ] },
      { id: 'sg_mingshi', title: '清议', tags: ['日常'], weight: 9,
        story: '名士清议能杀人：月旦一评，人人避让。\n有人提议把你列入「佳士」之评——被评，是荣耀，也是被盯上。评你的人，与你有过节。',
        options: [
          { t: '备礼求评', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 5; s.attrs.ming += 6; s.hidden.yin -= 4; return '礼到了，评到了：「才练志坚，可任方面」。评语传开，荐你的书简多了三封。'; } },
          { t: '不贿，任其评说', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 4; return '你没去。评语下来了：「其人自守，未可测也」。这话说得好——可测的人便宜，不可测的人贵。'; } },
          { t: '先与评者修好', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 5; s.attrs.xin += 4; return '你登门致歉，把过节当面说开了。评语里多了一句「知过能改」——人给你改过的机会，比给你好评更值钱。'; } },
          { t: '反讥清议之弊', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.attrs.xin -= 3; s.hidden.yun -= 4; return '你在众人面前说：评人者谁评之？满座叫好，评者记恨。你的名传开了——以你不想要的方式。'; } }
        ] },
      { id: 'sg_tunke', title: '屯客', tags: ['日常', '灾祸'], weight: 9, minScene: 8,
        story: '豪强招屯客，包食宿，收成五五分。\n同乡劝你：自立门户是空话，乱世先活下来。也有人劝：入了屯，就再也出不来了。',
        options: [
          { t: '入屯为客，先活下来', dim: 'li', time: '一季', fx: function (s) { s.attrs.ti -= 3; s.attrs.qian += 4; s.flags['屯客'] = 1; return '你种了一季，分到四成——账目有出入，你算了，没争。活下来的人，账要慢慢算。'; } },
          { t: '借兵荒贱买田地', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 4; s.attrs.qian += 5; return '兵荒之年，田贱如土。你把两代人攒的钱押上，买了三块地。战后地价翻番——你赌赢了兵荒，兵荒赌走了你良心上的三分。'; } },
          { t: '自立垦荒，拉同乡合伙', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 4; G.addFame(s, 'xiang', 5); s.attrs.qian -= 2; return '你领着五户人家开荒，立了规矩：公议分粮。垦出的地叫「五户滩」——滩是你的名，规矩是大家的。'; } },
          { t: '受雇豪强，做护田部曲', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 3; s.attrs.qian += 6; s.hidden.yin -= 5; s.flags['部曲'] = 1; return '你成了豪强的部曲，护田抓贼。主人待你不薄——不薄到你忘了自己是件「家什」。'; } }
        ] },
      { id: 'sg_bfeng', title: '北伐风声', tags: ['朝堂风波'], weight: 8, minScene: 10,
        story: '西边又要北伐了，征调的文书在路上。\n有人算过：上次北伐，十人去三人回。文书上写的是「建功之机」，乡里的理解是「丧命之期」。',
        options: [
          { t: '应征北上', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 7; s.flags['从北伐'] = 1; if (Math.random() < 0.45) { s.attrs.qian += 5; return '你在陇上立了功。北伐退兵时，你是活着回来的那三成——你从此不再算命，只算粮。'; } s.attrs.xin -= 6; return '兵败退军，你殿后断后来到悬崖边。活着回来的路，是你一步一步量出来的。'; } },
          { t: '代邻家丁役，收其田', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 4; s.hidden.yin -= 6; s.flags['代役'] = 1; return '你替独子的人家应了役，换了他家的三亩好田。你活着回来了——他在城门口跪着谢你，你受不起这个谢。'; } },
          { t: '上书请缓征，陈民力', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 7; s.attrs.ming += 4; s.attrs.ming -= 3; return '你把乡里的丁册与收成写成书递了上去。征调延了一季。书没换来功名，换来了满乡的活人。'; } },
          { t: '逃役入山', dim: 'yi', time: '一月', fx: function (s) { s.hidden.zhi += 5; s.hidden.yun -= 5; s.flags['避役'] = 1; return '你进了山，与逃役的人聚居。半年后赦令下来，你下了山——山里的半年，够你想清楚往后几十年怎么活。'; } }
        ] },
      { id: 'sg_tuolu', title: '托孤', tags: ['朝堂风波', '灾祸'], weight: 8, minScene: 12,
        story: '你的主公病重，召近臣托后事。\n托孤的对象有两人：掌兵的，掌文的。掌文的是你的座主——座主若掌权，你平步青云；若败，你随他一起没。',
        options: [
          { t: '全力辅佐座主秉政', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 8; s.hidden.yun -= 5; s.flags['从执政'] = 1; if (Math.random() < 0.5) { s.attrs.qian += 6; return '座主掌了政，你入了要职。朝堂上人人都知道你是他的人——这既是官阶，也是靶子。'; } s.attrs.ming -= 8; s.flags['政败'] = 1; return '政争败了，座主贬死在路上。你被放逐到偏远郡县——放逐的文书上写你的罪名，罪名是「其党」。'; } },
          { t: '转投掌兵者门下', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.hidden.yin -= 6; s.flags['改门'] = 1; return '你连夜改换了门庭。掌兵者掌了权，你保住了位子——旧座主的葬礼，你没敢去。'; } },
          { t: '请外放，避开中枢', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 6; return '你讨了个边郡的差，走得越远越好。十年后中枢换了三拨人，你在边郡把一州的田治得井井有条。'; } },
          { t: '收留座主的家眷', dim: 'yi', time: '一月', fx: function (s) { s.hidden.yin += 12; s.attrs.qian -= 5; s.flags['庇旧主'] = 1; return '座主败亡后，你把他的一家老小藏了三个月，送出境。没人知道——他知道。他死前留的话是：我那学生，是个厚人。'; } }
        ] }
    ],
    main: [
      { id: 'sg_m1', title: '乱世初立', after: 0, time: '旬日',
        story: '天下三分的消息传到乡里时，你刚束发。\n市上有个老翁在讲古，讲楚汉，讲垓下，讲到乌江的水，拍案而起——满市的人都在听，只有你注意到老翁袖口磨破了。\n乱世里，连讲故事的都吃不饱。',
        options: [
          { t: '立志读书练武，待价而沽', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ti += 3; s.flags['初志'] = 1; return '你白天读书晚上练剑。邻居说你疯——乱世里不疯的人，都先死了。'; } },
          { t: '学一门乱世的手艺', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 5; return '你学了医马——兵荒马乱，马比人金贵。你的手艺三个月内出了名。'; } },
          { t: '入豪门为部曲求庇护', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.ti += 3; s.flags['入部曲'] = 1; return '豪强家的坞堡比城墙牢。你进了门，领了矛，也领了一个规矩：出门要报，回家要点。'; } },
          { t: '随流民南迁避乱', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ti -= 3; s.hidden.yun += 6; s.flags['南迁'] = 1; return '你跟着流民走了两个月，把北方的一切留在了身后。南边的粥比北边的稠——这就是你去南方的原因。'; } }
        ] },
      { id: 'sg_m2', title: '大限之问', after: 12, time: '一月',
        story: '国力衰了，将星陨了几颗。\n主公夜召属下问事：国势如此，是战、是守、是和？问完看了一圈，目光停在你身上——你是这里最年轻的脸。',
        options: [
          { t: '战：以攻代守', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.zhi += 5; s.hidden.yun -= 4; return '你主张打。打了，败了半场，稳住了全场。主公说：年轻是对的——败得起。'; } },
          { t: '守：积谷缮城', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.attrs.cai += 4; return '你主张守。三年后敌兵压境，城里的粮撑过了他们能撑的极限——他们退了。守字值千金。'; } },
          { t: '和：称臣缓祸', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 5; s.attrs.xin -= 5; s.flags['主和'] = 1; return '你主张称臣纳贡。国续了十年，气短了十年。主公临终说你救了国——你自己知道你救的是十年，不是国。'; } },
          { t: '答：臣不知，臣只知民', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 8; s.attrs.cai += 4; return '你说：战守和皆术，民存方为本。满堂静了。主公摆手让你退下，退下之前，他多看了你一眼——那一眼，后来值了很多。'; } }
        ] }
    ],
    endings: [
      { name: '三国遗臣', group: '国显', pri: 68,
        score: function (s) { var v = (s.attrs.ming - 58) * 0.8 + (s.flags['从北伐'] || s.flags['守城之功'] ? 12 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ ming: 60 }] },
        verdict: '三国归一之后，他的忠字才显出重量。',
        epilogue: '新的朝代来了，旧国的史册修了。\n修史的人来寻旧臣，你是少数还在世的几个。\n你说的每句话都被记下，你说的每句多余的话都没有——你早学会了。你死时，史册上你的那一行写得极短，极稳。' },
      { name: '屯田老卒', group: '国中', pri: 50,
        score: function (s) { var v = (s.flags['屯客'] || s.flags['部曲'] ? 14 : 0) + (s.attrs.ti - 45) * 0.3 + (100 - s.attrs.ming) * 0.25; return Math.max(0, Math.min(100, v)); },
        verdict: '他打了半生仗，最后只求一块能种的地。',
        epilogue: '你解甲那年，把矛熔了打了一把锄头。\n锄头很好用。你用它在乱世末尾种出了十年安稳的粮。\n你的孩子问乱世是什么样。你想了很久，说：就是谁的地都不是自己的地。孩子没懂，你也没再讲。' }
    ]
  };
})(window.GAME_DATA);
