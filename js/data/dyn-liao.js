/* 「辽」朝代内容包：捺钵四时，南北分官 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.liao = {
    id: 'liao', name: '辽', clock: { year: 1, season: 3 }, eras: [{ name: '统和', span: 30 }, { name: '太平', span: 11 }, { name: '重熙', span: 24 }, { name: '清宁', span: 10 }],
    events: [
      { id: 'liao_nabo', title: '随捺钵', tags: ['日常'], weight: 11,
        story: '皇帝四时捺钵，春水秋山，行营即朝廷。\n你被选入随驾的杂役——随捺钵的人，走得比谁都多，见得比谁都多，说得比谁都少。',
        options: [
          { t: '应役随驾', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ti -= 3; s.attrs.ming += 6; s.flags['随捺钵'] = 1; return '你随捺钵走了一轮。天子猎天鹅的营地你见过，南北面官的帐里酒你闻过。你的见识，是用脚换的。'; } },
          { t: '趁机习契丹语', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 3; s.flags['通契丹语'] = 1; return '你随营半年学通了契丹语。汉人通胡语的少，通的人贵——贵人里后来有你的名字。'; } },
          { t: '随营做买卖', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 4; return '你在行营间倒腾汉地的茶绢。捺钵走到哪，你的货到哪——朝廷搬家，你的市集跟着搬。'; } },
          { t: '辞役守家', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你没去。随驾的人回来说了一年的见闻，你听了半年的免费故事——用耳朵看天下，也省脚力。'; } }
        ] },
      { id: 'liao_nanbei', title: '南北面官', tags: ['朝堂风波'], weight: 10,
        story: '辽制以汉法治汉人、国法治契丹，南北分官。\n汉人想进北面官，比登天难；南面官的缺，又在汉人大族手里。你的才学与姓氏，摆在两个秤上。',
        options: [
          { t: '入南面官', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.attrs.cai += 4; s.flags['南面官'] = 1; return '你入了南面官的属僚。汉官管汉地，规矩熟——你慢慢懂得了：两套制度不是分裂，是两把不同的锁。'; } },
          { t: '钻营北面官的缺', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 4; s.hidden.yin -= 5; s.flags['谋北面'] = 1; if (Math.random() < 0.4) { s.attrs.ming += 5; return '你托了帐族的门路，真的进了北面官属——汉人做北官，全州轰动。你成了两套制度之间那道窄门。'; } s.attrs.qian -= 4; return '门路花完了钱，人没进去。帐族的大门朝北开——你这样的姓，走不进北边的帐。'; } },
          { t: '考科举入仕（汉科）', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; return '你中了汉科的进士。辽的科举限汉人取汉官——门窄，但那扇门里出来的人，都念同一套书。'; } },
          { t: '在两界之间做通译', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 3; s.flags['通译'] = 1; return '你做了南北之间的通译。两边的官都要你，两边的账都找你——你活成了制度的缝隙里最滋润的那类人。'; } }
        ] },
      { id: 'liao_bianshi', title: '边市', tags: ['日常'], weight: 9,
        story: '宋辽互市，榷场上的茶、绢、盐、羊来来往往。\n官府抽税，牙人抽佣，边民抽空——你在中间，三样都见得着。',
        options: [
          { t: '入榷场为牙人', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.attrs.cai += 4; s.flags['边市牙人'] = 1; return '你做了榷场牙人，南北的语言你都会。三年后你的佣钱盖起了三间瓦房——瓦房的地址，选在两界之间最中间。'; } },
          { t: '走私私市', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 9; s.flags['走私市'] = 1; if (Math.random() < 0.65) return '榷场之外的小道你走了两年。巡边军的马蹄声你听得出远近——听声的本事，比货值钱。'; s.attrs.ming -= 10; return '你被巡军堵了一次，货没了，人逃了。走私市的第一课：货没了能再贩，腿断了不能。'; } },
          { t: '养羊贩绒', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 7; s.attrs.ti += 2; s.flags['羊绒商'] = 1; return '你学北人养羊贩绒。汉地的人抢着买——你成了边市上少数「两头都是自己人」的商贩。'; } },
          { t: '为使团当通事随行', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 4; return '你随辽使入宋，当通事。汴京的繁华你看了三个月——你回来后在榷场立了个规矩：宋货不得抬价过三成。'; } }
        ] },
      { id: 'liao_buzu', title: '部族', tags: ['朝堂风波'], weight: 9,
        story: '部族之间的草场之争年年有。\n你家依附的帐族与邻族为一片冬牧场动了刀兵——帐长点你随行，你是汉儿，汉儿执矛，两边都觉得稀奇。',
        options: [
          { t: '随帐族赴争', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ti -= 4; s.attrs.ming += 4; s.flags['部族之争'] = 1; if (Math.random() < 0.5) { s.attrs.qian += 3; return '争牧场没动成大刀，只是对峙三日，邻族退了。帐长把你的名字记进了「同难」的名单——汉儿与契丹人，第一次写在一行。'; } s.attrs.ti -= 5; return '真动了手。你挂了彩，牧场还是丢了。帐长说：汉儿不必再来了——这话既是怨，也是护。'; } },
          { t: '献策以盟代刀', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.flags['盟约'] = 1; return '你提议两边歃血分场，立石为界。帐长采纳了——界石立起那天，你明白了草原与田地共用同一个道理。'; } },
          { t: '告到北面官府', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming -= 2; s.hidden.yin -= 4; s.flags['告官'] = 1; return '你把争场告到了官府。官府判了个和稀泥——两边都觉得你多事。草原的事，草原有草原的算法。'; } },
          { t: '趁争之机贩马', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 6; s.flags['趁乱贩马'] = 1; return '两边争场，马价大跌——你收了十几匹。和约一立，马价回涨，你赚了两倍。乱是你没挑的，利是你挑的。'; } }
        ] },
      { id: 'liao_songshi', title: '岁币', tags: ['朝堂风波'], weight: 9, minScene: 8,
        story: '澶渊之后，宋岁币银绢至界，两国百年不识兵戈。\n押运岁币的差事肥而稳——肥在过手的银绢，稳在两国都不敢让这条路断。',
        options: [
          { t: '投岁币押运', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.flags['押岁币'] = 1; return '你押了三年岁币，银车的轮子比你家祖坟的碑还亮。太平年月里，这条路是天下最稳的饭碗。'; } },
          { t: '管榷场税册', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 5; s.flags['税册'] = 1; return '你管了榷场的税册。册上的数字年年涨——你明白，涨的是两国共同的太平。你给这个太平当账房。'; } },
          { t: '上书请开武备', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.xin += 7; s.attrs.ming -= 3; s.hidden.yun -= 5; s.flags['请武备'] = 1; return '你上书说太平靠盟约不靠岁币。书被压了——你赌的是「万一」，赌注是你的仕途。'; } },
          { t: '做两国通婚的媒', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 5; s.hidden.yin += 6; s.attrs.ming += 3; return '你促成了三桩汉契通婚。太平年月里，婚书比盟约结实——你做的是比岁币更细的事。'; } }
        ] },
      { id: 'liao_haidong', title: '海东青', tags: ['日常', '灾祸'], weight: 8,
        story: '上头征海东青（名鹰），催得急。\n鹰在极北的海边，捕鹰的人十去三回。你家有旧识的猎户——人情是现成的，命不是。',
        options: [
          { t: '亲往捕鹰', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 6; s.flags['捕鹰'] = 1; if (Math.random() < 0.45) { s.attrs.qian += 8; return '你带回了两只海东青。上头赏了你——赏的是鹰，鹰的眼里没有赏，只有天。'; } s.attrs.ti -= 5; return '鹰没捕到，同去的猎户折了一人。你替他把尸骨背了回来——上头的催文还在你家桌上，你把文压在了尸骨的布下面。'; } },
          { t: '转雇猎户，抽成', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 5; s.flags['鹰牙'] = 1; return '你做起了鹰的牙人，抽成三成。鹰价年年涨——你发现这行当的账本上，写的都是命换的钱。'; } },
          { t: '献策以驯代捕', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 4; s.hidden.yin += 5; return '你上书请设驯鹰之坊，少捕多驯。坊真办了——猎户的死亡率降了三成，你的名在坊里的功德册上。'; } },
          { t: '以他鹰充数', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 4; s.hidden.yin -= 8; s.flags['充鹰'] = 1; if (Math.random() < 0.6) return '你以寻常鹰充了数。验鹰的内行居然没看穿——或者看穿了不想惹事。你把这笔侥幸记在了账上。'; s.attrs.ming -= 8; return '充数的鹰被当场验出。欺罔之罪你担了半份——半份，也够你把家产搬一半充公。'; } }
        ] },
      { id: 'liao_zitou', title: '头下军州', tags: ['日常', '朝堂风波'], weight: 8, minScene: 9,
        story: '契丹贵族的「头下军州」散布州县：私城、私兵、私税。\n你家被划进了一座头下城——城主是帐族的贵戚，税比朝廷重两成，管得比朝廷细。',
        options: [
          { t: '服私税，安分度日', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.qian -= 5; s.attrs.xin += 4; return '你缴了私税。城主的家丁很客气——客气的前提是你先客气。城里的日子平静，平静得像交租。'; } },
          { t: '联户上告朝廷', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 4; s.hidden.yun -= 5; s.flags['告头下'] = 1; if (Math.random() < 0.35) { s.attrs.ming += 5; return '你的状子递到了南面官，恰逢朝廷削头下之权——税减了。你们那纸状子，成了后来削藩案例里的第一条。'; } s.attrs.qian -= 5; return '状子先到了城主手里。你被枷号三日——城主说：朝廷是朝廷，城是城。'; } },
          { t: '投城主为属吏', dim: 'li', time: '一季', fx: function (s) { s.attrs.ming += 4; s.attrs.qian += 5; s.hidden.yin -= 4; s.flags['投头下'] = 1; return '你做了城主的属吏，替他管汉户的账。两边的苦你都知道——你把两边的苦换成了两边的钱。'; } },
          { t: '串户迁出私城', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 5; s.attrs.qian -= 3; return '你串联三十户悄悄迁出了私城。城主追查，人去城空——空城让朝廷有了削他的口实。你成了他记恨的名单第一位，也成了乡人感激的名单唯一位。'; } }
        ] },
      { id: 'liao_shuangsu', title: '双俗', tags: ['日常'], weight: 8,
        story: '汉儿在辽地过百年，除夕拜的是佛，春分祭的是天；婚丧嫁娶，两边的规矩都来过一遍。\n你的孩子问你：我们是南边的，还是北边的？\n你看着院里同时晾着的袄与袍，一时没答。',
        options: [
          { t: '答：我们都是', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 5; s.flags['双俗之家'] = 1; return '你说：南边的书我们念，北边的马我们骑——都学，都记。孩子似懂非懂，懂的那一半，够他用一生。'; } },
          { t: '带孩子回汉地祭祖', dim: 'xiu', time: '半月', fx: function (s) { s.attrs.xin += 6; s.attrs.qian -= 3; s.flags['南祭'] = 1; return '你带孩子回了祖坟。孩子在祖坟前问了很多问题，你答了一半——另一半，你自己也在找答案。'; } },
          { t: '让孩子入北边的帐学', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ming += 4; s.hidden.yin -= 3; s.flags['帐学'] = 1; return '你把孩子送进了帐学。他学会骑马射箭，也学会在两种规矩之间找活路——这门手艺，比你传的任何产业都值钱。'; } },
          { t: '什么都不答，让他自己看', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.yun += 4; return '你没答。十年后他自己答了：他说他在集市上用两种话讲价，用两种礼敬酒——「我是市上的人」。你说：这答案比我好。'; } }
        ] }
    ],
    main: [
      { id: 'liao_m1', title: '界河人家', after: 0, time: '旬日',
        story: '你家住在界河以南三里。\n河对岸是契丹的牧地，南岸是宋人的稻田。两边的炊烟都看得见，两边的税卡都去过。\n你十二岁那年，第一次被问：你是宋人还是辽人？\n你回家问祖父。祖父正给马钉掌，说：我是这河边的人。',
        options: [
          { t: '记住这句话', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 5; s.flags['河边人'] = 1; return '「河边的人」——你把这句话刻在了门槛上。此后两边的兵来过、税来过、货来过，你的门槛没换过。'; } },
          { t: '学祖父钉掌养马', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.ti += 3; s.flags['钉掌'] = 1; return '你跟祖父学了钉掌。南来的马、北来的马，你家的桩上都拴过——马不问籍，你也不问。'; } },
          { t: '过河去看牧地', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ti += 3; s.hidden.yun += 5; s.flags['过河北'] = 1; return '你偷偷过河看了牧地。契丹的少年请你骑了一回马——你在马背上明白了一件事：河两边的人，笑起来是一样的。'; } },
          { t: '去南边的学塾', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; return '你进了南岸的学塾。先生问籍贯，你答「河边」。先生愣了愣，说：好籍贯——天下的书，都是给河边的人写的。'; } }
        ] },
      { id: 'liao_m2', title: '盟书之签', after: 12, time: '一季',
        story: '两国盟约续签，要在界河设坛。\n两边的行人都找你——你通双语、识双俗、家在河边。签书那天，你要站在坛上，两边都看得见的位置。',
        options: [
          { t: '应命登坛为礼生', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 7; s.attrs.xin += 6; s.flags['登坛'] = 1; return '你登了坛，两边的话各念了一遍。念完两边的鼓都响了——响声重叠的那一段，是给河听的。'; } },
          { t: '借坛会之机议互市新章', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 5; s.flags['新市章'] = 1; return '你把拟好的互市新章递给了两边的行人。章成了法，法落在榷场——你的名字，从此挂在两边的市门上。'; } },
          { t: '躲开这一趟差', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.hidden.zhi += 3; return '你托病没去。坛上的热闹与你无关，坛后的刀光也与你无关——你在家给马钉了一天的掌。'; } },
          { t: '借盟坛之利扩商路', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 5; s.flags['盟市'] = 1; return '你趁两边的使团云集，签了五份货约。盟约百年一续，货约一年一签——你押了签得勤的那头。'; } }
        ] }
    ],
    endings: [
      { name: '界河世商', group: '辽显', pri: 68,
        score: function (s) { var v = (s.attrs.qian - 55) * 0.8 + (s.flags['界河人'] ? 14 : 0) + (s.flags['登坛'] || s.flags['新市章'] ? 10 : 0) + (s.dimCount.li || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ qian: 58 }] },
        verdict: '两国百年不识兵戈，他家百年不失一门。',
        epilogue: '你家的门槛刻着「河边的人」，三代没换过。\n南边的茶、北边的马、两边的税卡与笑脸，都在这条门槛上过。\n你死后，两边的行人在你家门口各烧了一炷香——香在门槛前汇成一股烟，往天上去了。' },
      { name: '捺钵故吏', group: '辽中', pri: 50,
        score: function (s) { var v = (s.flags['随捺钵'] ? 14 : 0) + (s.attrs.cai - 50) * 0.4 + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '他见过四时捺钵的全部营地，只在自己的院子里终老。',
        epilogue: '你随驾走过春水秋山，晚年在自家院里种了一畦南边的菜。\n有人问：跟着天子走了半生，值么？\n你说：值。见过大天地的眼睛，看自家菜地的时候，特别亮。' }
    ]
  };
})(window.GAME_DATA);
