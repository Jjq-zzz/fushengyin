/* 「东晋」朝代内容包：王与马，共天下 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.jin_d = {
    id: 'jin_d', name: '东晋',
    clock: { year: 1, season: 1 }, eras: [],
    events: [
      { id: 'jd_beifa', title: '北伐请缨', tags: ['边境战事'], weight: 11,
        story: '朝廷又议北伐。\n每次议北伐，都是慷慨者请缨，实际者算粮。粮算下来，够打三个月——三个月后的事，没人提。',
        options: [
          { t: '请缨从军北上', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 5; s.attrs.ming += 7; s.flags['从北伐'] = 1; if (Math.random() < 0.4) { s.attrs.qian += 4; return '你随军收复了两城。班师那日满城设香案——香案后面的户口册上，多了你一行。'; } s.attrs.xin -= 5; return '军至河上，粮尽退兵。你看着北岸的旧都方向站了很久——那方向，你这一生看了很多次。'; } },
          { t: '主后方转运之职', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.cai += 4; s.flags['督运'] = 1; return '你督粮三年，运道没断过。前线的人打一半的仗，另一半在你手里——你知道，却从不提。'; } },
          { t: '上书言北伐不可轻举', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 7; s.attrs.ming -= 3; s.flags['沮北伐'] = 1; return '你的书递上去，主战的公卿骂你怯懦。两年后那次北伐果然败了——骂你的人没道歉，你也没提。'; } },
          { t: '借北伐之名敛军资', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 9; s.flags['借敛'] = 1; return '你以「助饷」为名在各州募捐，三成入了公账。北伐的旗很鲜亮，旗杆的根子，有一截在你家的库房。'; } }
        ] },
      { id: 'jd_xuanyan', title: '玄言雅集', tags: ['日常'], weight: 10,
        story: '名士雅集，曲水流觞，赋诗罚酒。\n你被邀了——集上的诗要即席成，成不了要饮，饮多了失仪。雅事处处是规矩。',
        options: [
          { t: '即席成诗，技惊四座', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 6; return '你的诗成了集上的定稿，传抄一月不衰。定稿的末句被刻上了亭柱——你的字，从此站在风景里。'; } },
          { t: '宁罚酒，不作应制语', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin += 7; s.attrs.ming += 3; return '你饮了三爵，说：好诗不由催。满座先静后笑——这三是你的骨，也是你的价。'; } },
          { t: '借雅集结姻亲', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 4; s.attrs.ming += 4; s.hidden.yin -= 3; return '你在集上说媒般周旋，为自家议定了一门好亲。集上的诗传没传开没人记得，亲事的帖子人人记得。'; } },
          { t: '推病不出', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你没去。集上成的好诗你后来都读了——读别人的好，比当场出丑体面。'; } }
        ] },
      { id: 'jd_qiaowu', title: '侨吴之争', tags: ['朝堂风波'], weight: 10,
        story: '侨姓与吴姓之争百年不休：占田、占官、占气。\n县里议修塘，侨姓出的钱，吴姓出的地，工程卡在两家的名分上。',
        options: [
          { t: '居间调停，促成修塘', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin += 7; G.addFame(s, 'zhou', 6); s.attrs.cai += 4; return '你把功德碑做成两面的：一面侨姓，一面吴姓。塘修成了，两边都说你会做人——会做人的人，两边都不敢用，都想用。'; } },
          { t: '站在侨姓一边压吴', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 4; s.hidden.yin -= 6; s.flags['压吴'] = 1; return '你随侨姓压了吴姓，占得一处好塘。吴姓的阴功夫多：此后你家的鱼，年年死在塘里。'; } },
          { t: '替吴姓争名分', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 3; s.hidden.yin += 6; s.attrs.qian -= 2; return '你替吴姓把名分争了回来。吴地的老人给你送了匾——侨姓的官场从此对你冷了半截。'; } },
          { t: '两头签契，独占工程', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 7; s.flags['包工'] = 1; return '你把工程包了下来，两边的钱各收一份。塘修得不错——修塘的人两边都骂，用塘的人两边都谢。'; } }
        ] },
      { id: 'jd_tuduan', title: '土断', tags: ['朝堂风波'], weight: 9,
        story: '朝廷行土断：侨民就地入籍，编户齐民。\n入籍要缴税、服役——你祖父从北方带来的那本旧籍，是全族免税的凭据。烧还是交，族里吵翻了。',
        options: [
          { t: '举族入籍，奉法纳税', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.qian -= 6; s.flags['入籍'] = 1; return '你把旧籍交了，全族编入当地。税重了三年，族里骂了你三年。三年后你们与本地人通婚、通市——骂声变成了亲家的称呼。'; } },
          { t: '藏匿旧籍，避税如故', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 8; s.flags['匿籍'] = 1; return '旧籍藏进了祠堂的梁上。税躲了十年，族里感谢你十年——感谢的人里，没人愿意替你蹲那次牢。'; } },
          { t: '送族中子弟北上访旧', dim: 'yi', time: '半载', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 4; return '你派子弟北上访旧，抄回了失散支族的谱系。谱全了，族大了——大族在土断里，从来都有另一套算法。'; } },
          { t: '把入籍做成买卖', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 8; s.flags['籍市'] = 1; return '你替三百户侨民办入籍，一户收三成年的利。官府知道，睁着眼——你帮他们把最难的事做完了，这叫功。'; } }
        ] },
      { id: 'jd_huanwen', title: '强藩风声', tags: ['朝堂风波', '灾祸'], weight: 9, minScene: 10,
        story: '上游的强藩又提「清君侧」。\n京中风声鹤唳：有人收拾细软，有人搜罗兵符，有人续写颂文——颂文要写两份，一份给现在，一份给将来。',
        options: [
          { t: '举家暂避外郡', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 6; return '你带着家眷去了外郡「省亲」。乱起了，止了，你回来了。回来时你的官位还在——位子这东西，躲着比争着安全。'; } },
          { t: '附强藩，上劝进表', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 5; s.hidden.yin -= 8; s.flags['附藩'] = 1; if (Math.random() < 0.5) { s.attrs.qian += 6; return '强藩入京，你的表递得早，得了实职。半年后强藩病重——你的实职跟着虚了一半。'; } s.attrs.ming -= 8; return '强藩败退，你的表成了「从逆」的罪证。你花钱、托人、磕头，把罪证换成了「一时糊涂」。'; } },
          { t: '守阙勤王', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 6; s.hidden.yun -= 5; return '你留在京中守阙，乱兵入城那夜守到了最后。乱平之后，「守阙」两个字成了你半生最大的本钱。'; } },
          { t: '预写两份表文', dim: 'li', time: '旬日', fx: function (s) { s.attrs.cai += 6; s.hidden.yin -= 5; s.flags['两面文'] = 1; return '你提前写好了劝进与讨逆两份表文，谁赢用谁。后来没人发现——但你知道，你此生的字，再也写不出一句真话了。'; } }
        ] },
      { id: 'jd_wubao', title: '坞壁乡勇', tags: ['日常', '边境战事'], weight: 9, minScene: 8,
        story: '北边的坞壁乡勇成建制地南附，带来兵、带来苦、带来北边的仇。\n县里议：收，还是拒？收了要给地，拒了要背骂名。',
        options: [
          { t: '主收，授田安插', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 5; G.addFame(s, 'zhou', 6); s.attrs.xin += 5; return '你主收了三百口。授了田，编了保。十年后县里的兵源一半来自这些人家——当年骂你的人，如今夸你。'; } },
          { t: '主拒，保本地之利', dim: 'li', time: '旬日', fx: function (s) { s.attrs.ming -= 3; s.hidden.yin -= 4; return '你主拒了。县里省了田，背了名。北来的人哭骂着去了邻县——邻县后来比你县富，兵也比你县多。'; } },
          { t: '收其壮丁，遣其老幼', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 4; s.hidden.yin -= 8; s.flags['挑壮丁'] = 1; return '你只收壮丁，老幼往南送——往南的文书是虚的，路是真的。你做了半件善事，半件恶事，都做得很齐。'; } },
          { t: '募坞勇为私兵', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.hidden.yin -= 6; s.flags['私兵'] = 1; return '你募了五十坞勇为私兵。县令忌惮你，上官拉拢你——私兵这种东西，养着养着，就不是你的了。'; } }
        ] },
      { id: 'jd_yiji', title: '译经', tags: ['鬼神', '日常'], weight: 8,
        story: '沙门译经之风大盛，佛寺田产日增。\n朝中有人毁佛，有人奉佛。你家隔壁的寺要扩院，看中了你家东边的三亩薄田。',
        options: [
          { t: '献田入寺，求福报', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yin += 10; s.flags['献田'] = 1; return '你把田献了。寺里给你一家挂了长生牌位。此后三十年，你家逢灾必有人帮——福报这种东西，有人说是巧合。'; } },
          { t: '拒卖，与寺争讼', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; s.flags['讼寺'] = 1; return '你赢了讼，田还在。寺里的僧人见你合十如常——你却总觉得那合十里少了点东西。'; } },
          { t: '助译经，得钱得名', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; return '你助沙门译经，校雠之功被记在译场名录上。你不懂梵音，懂句读——句读之功，千年后还有人查。'; } },
          { t: '上书请限寺产', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 3; s.hidden.yun -= 5; s.flags['限佛'] = 1; return '你的书递上去了，朝议了一场，没议出结果。寺里的扩建照做——你的书，只记在了寺僧的仇册上。'; } }
        ] },
      { id: 'jd_yinjiu', title: '醉客', tags: ['日常'], weight: 8,
        story: '名士以醉为高，醉里忘忧，忘的是北边的山河。\n你的座主日日醉，醉中签押——签错一回，县里的赋册就要错一年。你看着他，也看着你自己要走的路。',
        options: [
          { t: '效其风度，同醉', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 4; s.attrs.xin -= 6; s.attrs.qian -= 4; return '你醉了半年，得了半个「风度」的名。半年后你戒了酒——戒酒那天的清醒，比你半生的醉都值钱。'; } },
          { t: '代其理政，暗补其失', dim: 'shi', time: '半载', fx: function (s) { s.attrs.xin += 8; s.attrs.cai += 5; G.addFame(s, 'zhou', 5); return '你在醉影里替他把县政理顺了三年。他临终前把你叫到床前，说：县志里，你的名字在我前头——这是我批的。'; } },
          { t: '谏其戒酒', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 3; return '你跪谏了一次，被挥退了。第二次他听了一半，酒减了三成——三成酒，救了几个人，没人统计。'; } },
          { t: '借醉局攀附', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.ming += 3; s.hidden.yin -= 5; return '你在醉局里递话、牵线、订约。醉里签的东西最真——你攒下的门路，都是别人清醒时不会给的东西。'; } }
        ] }
    ],
    main: [
      { id: 'jd_m1', title: '过江', after: 0, time: '旬日',
        story: '你随族南渡，在江边等船。\n渡口的人排成十里，老人抱着祖宗的牌位不肯上船——牌位湿不得，可江上有雨。\n船夫说：这船，装活人不装死规矩。',
        options: [
          { t: '先渡人，牌位裹雨布随身', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 7; G.addFame(s, 'zhou', 4); return '你把牌位裹了三层雨布抱在怀里过了江。族老在船头哭了——他哭的是他爹，你护的是他爹的爹。'; } },
          { t: '让妇孺先渡，自守家业', dim: 'yi', time: '旬日', fx: function (s) { s.hidden.yin += 8; s.attrs.xin += 5; s.hidden.yun -= 4; return '你把妻儿先送过江，自己留下照看没船的家业。三个月后你也渡了——丢下的东西，比带上的多。'; } },
          { t: '在渡口做些小买卖', dim: 'li', time: '半月', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 4; return '你在渡口卖了半月的干粮与草鞋，赚了北渡人最后的一点铜钱。你后来在江南成家立业——立业的本钱，是这场离乱。'; } },
          { t: '留北不去', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.hidden.zhi += 8; s.flags['留北'] = 1; return '你留在了北岸。族人的船远去后，你把家谱抄了三份：一份随身，一份埋于祖坟，一份缝进了棉衣。'; } }
        ] },
      { id: 'jd_m2', title: '克复之问', after: 12, time: '一季',
        story: '你在江南站稳了脚。\n每年上巳，北望中原成了定例的仪式。今年的集会上有人突然问：诸君北望了十年，望回去过吗？\n满座无言。散会后有人来找你——说有些话，该变成事。',
        options: [
          { t: '投身北伐的实际筹备', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.cai += 5; s.flags['筹备北伐'] = 1; return '你入了北伐的筹备局，管粮、管船、管人。北伐最终还是没成——但筹备的三个月里，你把「望」变成了「备」。'; } },
          { t: '倡言先固江南本根', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; return '你说：江左未固，北伐是浮沙筑塔。你因此得罪了慷慨的人，成全了务实的路。'; } },
          { t: '北上访旧，探故土实情', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ming += 5; s.attrs.ti -= 4; s.hidden.yun -= 4; return '你化装北上，走了三个月。回来的信里你写：故土可复，人心待聚。这封信后来传遍江左——传的人说：这是十年来第一句实话。'; } },
          { t: '办义学，教北来遗孤', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 8; s.attrs.qian -= 5; s.flags['义学'] = 1; return '你办了义学，收的全是北来的孤儿。教书时你常讲北方的样子——讲着讲着你明白了：复中原的人，就坐在你的板凳上。'; } }
        ] }
    ],
    endings: [
      { name: '江左名士', group: '东显', pri: 70,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.9 + (s.attrs.ming - 55) * 0.7 + (s.flags['善清谈'] || s.flags['筹备北伐'] ? 10 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '清谈是他的病，也是他的药。',
        epilogue: '你晚年隐居会稽，修竹一园，书一架。\n北伐的诏书下来时，朝廷来问你的意见。你说了一句话，那句话被刻进了当时的国史。\n你死后二十年，北伐成了。消息传到江南那天，你的学生在你坟前烧了一份捷报。' },
      { name: '北望遗老', group: '东中', pri: 50,
        score: function (s) { var v = (s.flags['留北'] || s.flags['义学'] ? 14 : 0) + (s.hidden.zhi - 40) * 0.4 + (s.dimCount.xiu || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '他一生望着北边，望成了江南的一块碑。',
        epilogue: '你老的时候，北边的家乡已经换了几代人的名字。\n你的学生把你的课编成了书，书里有你对北方所有的记忆——错的地方都没改，你说错了也是思念。\n你死前把脸朝向了西——那里是渡口的方向。' }
    ]
  };
})(window.GAME_DATA);
