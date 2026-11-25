/* 「清」朝代内容包：旗籍与科举并行，文字狱与洋务俱来 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.qing = {
    id: 'qing', name: '清', clock: { year: 1, season: 1 }, eras: [{ name: '康熙', span: 61 }, { name: '雍正', span: 13 }, { name: '乾隆', span: 60 }],
    events: [
      { id: 'qg_tifa', title: '剃发令', tags: ['朝堂风波', '灾祸'], weight: 11,
        story: '剃发令下：留头不留发，留发不留头。\n你的头发，是身体，也是规矩，也是命。剃刀在县衙门口架着，队伍排得很长。',
        options: [
          { t: '剃发遵令', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin -= 5; s.attrs.ming += 3; s.flags['剃发'] = 1; return '你剃了。铜镜里的头型陌生得像另一个人。镜子外的人活下来了——活下来的人，慢慢学着把镜子里的当自己。'; } },
          { t: '逃入山寺避令', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 5; s.flags['避剃'] = 1; return '你躲进山寺做了半年火工。寺里的和尚都光头——头一次，光头不是罪。'; } },
          { t: '拒剃，举家走远乡', dim: 'yi', time: '一月', fx: function (s) { s.attrs.xin += 7; s.hidden.zhi += 7; s.hidden.yun -= 6; s.flags['拒剃'] = 1; return '你举家逃到了边远的地界，那里县官也睁一只眼。你保住了头发——头发白了几根，是这几年的。'; } },
          { t: '先剃，再替人想办法', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 6; s.flags['剃头生意'] = 1; return '你剃了发，买了剃刀挑子做起了生意。剃一个收三文——你把令做成了营生，营生里的人情，比令复杂。'; } }
        ] },
      { id: 'qg_keju', title: '科场', tags: ['朝堂风波'], weight: 10,
        story: '科举照开，八股照作。\n你乡的学额紧张：本县的秀才名额十年没涨，读书的人十年翻了三番。你家三代人的墨，磨进了同一个砚。',
        options: [
          { t: '苦攻八股应县试', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.flags['秀才'] = 1; if (Math.random() < 0.35 + s.attrs.cai / 250) { s.attrs.ming += 5; return '你中了秀才。红色的报帖贴上门楣那天，你祖父把用了四十年的砚台传给了你——砚台比报帖旧，比报帖稳。'; } return '县试落榜，第五次了。你祖父的砚台还在你手里——砚台里的墨，一年比一年深。'; } },
          { t: '改学幕友（刑名师爷）', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.qian += 5; s.flags['幕友'] = 1; return '你学了刑名钱谷，入了幕。官是流水的官，幕是铁打的幕——你的文书递上去，官照着批。'; } },
          { t: '捐监生，绕开科场', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 10; s.attrs.ming += 3; s.hidden.yin -= 3; s.flags['捐监'] = 1; return '你家捐了个监生。功名是买的，体面是真的——真的体面与假的名分，在这个朝代很好辨认：认钱。'; } },
          { t: '弃举业，学西算', dim: 'yi', time: '一年', fx: function (s) { s.attrs.cai += 8; s.attrs.ming -= 3; s.hidden.yun += 6; s.flags['西算'] = 1; return '你跟一个传教士学了西算。乡人说你入邪教——十年后县里修水利，请的还是你这个「入邪教的」。'; } }
        ] },
      { id: 'qg_wenziyu', title: '文字狱', tags: ['朝堂风波', '灾祸'], weight: 10, minScene: 8,
        story: '文字狱的风声又紧了。\n邻县有人因一句诗被抄家。你家书楼里有先祖的手稿，稿里有几句前朝的旧句——烧，是护族；藏，是赌命。',
        options: [
          { t: '焚稿自保', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin -= 8; s.hidden.yin -= 3; s.attrs.ming += 2; s.flags['焚稿'] = 1; return '你在后院烧了一夜。火光里你读到了几句从没读过的——读完就烧。有些字，只能读一次。'; } },
          { t: '藏稿于夹壁', dim: 'yi', time: '旬日', fx: function (s) { s.hidden.yin += 6; s.hidden.zhi += 8; s.flags['藏稿'] = 1; if (Math.random() < 0.7) { return '稿藏进了夹壁。你把夹壁的位置告诉了长子——告诉的方式是让他砌砖。砌墙的人不知道墙里有什么，这就是保密。'; } s.attrs.ming -= 12; s.flags['藏书案'] = 1; return '搜检出了稿。你家流徙三千里——三千里外，你把没烧掉的那几句背给了儿子听。'; } },
          { t: '抄录副本，分藏亲友', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 6; s.hidden.yin += 8; s.attrs.qian -= 3; s.flags['分藏'] = 1; return '你抄了五份，分藏五家。许多年后稿子从五个方向回来，拼成了一部完整的书——书成之日，五家都还记得当年。'; } },
          { t: '上缴自首', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.ming += 4; s.attrs.xin -= 6; s.hidden.yun -= 5; s.flags['自首'] = 1; return '你自首了。官府褒了你「明白」，罚没书版。族里说你是明白人——明白人的夜里，烧纸钱都要先看看风。'; } }
        ] },
      { id: 'qg_qimin', title: '旗民之分', tags: ['日常'], weight: 9,
        story: '旗民不交产、不通婚，旗人坐粮，民人种地。\n你家与一户旗人为邻——他家旗地连你家田，地界上的那条沟，二十年没填平。',
        options: [
          { t: '据约争界，诉讼到底', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming -= 2; s.attrs.qian -= 4; s.flags['争界'] = 1; if (Math.random() < 0.4) { s.attrs.qian += 3; return '你竟争赢了半条沟。判词下来那天，旗人邻居在你家田头站了半晌——站完，他把自家的篱笆往里挪了一尺。'; } return '官司输了。沟还是那条沟——你学了一个道理：旗民的沟，法断不平，只能等水冲。'; } },
          { t: '以田换好，私下通融', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; s.flags['通旗'] = 1; return '你把两亩薄田「换」给了他家，换来了通行的方便与旗营的照应。你的粮车从此过卡不查——不查的关卡，比赢来的沟值钱。'; } },
          { t: '教旗营子弟读书', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.hidden.yin += 5; s.flags['教旗学'] = 1; return '你在旗营里开了蒙馆。旗人子弟的字渐渐写得像样——旗营的佐领给你送了面「文教」的匾。旗民的界，在字上先通了。'; } },
          { t: '忍让周全，结为姻亲', dim: 'shi', time: '一年', fx: function (s) { s.attrs.xin += 7; s.hidden.yin += 6; s.attrs.qian -= 5; s.flags['旗民姻亲'] = 1; return '你家与他家结了亲。旗民不婚的规矩，在两家的酒桌上破了例——规矩破在私处，官府睁着眼，乡里闭着眼，日子睁着眼。'; } }
        ] },
      { id: 'qg_caoyun', title: '漕弊', tags: ['日常'], weight: 9, minScene: 8,
        story: '漕运的弊病三代了：旗丁勒索、帮费层层、米里掺沙。\n你家是纳漕的粮户——粮一出手，三成的损耗是人家的「规矩」。',
        options: [
          { t: '依规纳漕，破财免事', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.qian -= 6; s.attrs.xin -= 2; return '你按规矩交了帮费。粮船开了，你的账本上记下一行：太平的价钱。每年这一行，墨色最沉。'; } },
          { t: '联户抗漕弊，上控', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 5; s.hidden.yun -= 5; s.flags['抗漕'] = 1; if (Math.random() < 0.35) { s.attrs.qian += 4; return '你们联户上控，巡抚竟批了：帮费减三成。减下来的三成，是你们跪在辕门三天换的——跪过的膝盖，记性好。'; } s.attrs.qian -= 5; s.flags['抗漕获罪'] = 1; return '上控的状子成了刁民的罪证。你被枷了半个月——枷板上看着你的，还有那些没敢联名的粮户。'; } },
          { t: '学漕务，入帮为书办', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 6; s.flags['漕书办'] = 1; return '你入了漕帮做书办。弊病你比谁都清楚——清楚的人在弊病里如鱼得水，也如坐针毡。'; } },
          { t: '改种商品粮，绕开漕政', dim: 'li', time: '一年', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 6; s.flags['改种'] = 1; return '你把田改种了棉花与桑。漕粮的折银一年年涨，你的桑棉一年年卖得好——绕开规矩的最好办法，是换一种活法。'; } }
        ] },
      { id: 'qg_yangwu', title: '洋务', tags: ['日常'], weight: 8, minScene: 10,
        story: '洋人的船炮消息一年多似一年，通商的口岸一开再开。\n县里来了个洋行的买办招人：会算学、懂夷语的，月俸是教谕的三倍。乡里说你若去了，就是「失了体统」。',
        options: [
          { t: '入洋行做买办', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 10; s.attrs.cai += 5; s.hidden.yin -= 4; s.flags['买办'] = 1; return '你做了买办。夷语三个月就能上口，账房两套并行——乡里的体统丢在身后，口岸的世界在你脚下展开。'; } },
          { t: '自学夷语夷算', dim: 'yi', time: '一年', fx: function (s) { s.attrs.cai += 8; s.attrs.ming -= 2; s.flags['自学夷语'] = 1; return '你跟一个落魄的通译学了夷语。学会那天你翻开夷字的账本——账本里的世界，与你的教科书完全对不上。对不上的，才是真的。'; } },
          { t: '上书请办新学', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.attrs.ming += 4; s.hidden.yun -= 5; s.flags['请新学'] = 1; return '你上书县令请办新式学堂。县令批了「缓议」。十年后县里真办了学堂——堂里的课表，抄的是你那本书。'; } },
          { t: '守旧业，讥洋务为奇技', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.zhi += 4; return '你说：船炮是奇技，人心是根本。你的话在乡里受用——受用的话，往往也是慢药。'; } }
        ] },
      { id: 'qg_banpu', title: '海禁与开埠', tags: ['日常', '朝堂风波'], weight: 8, minScene: 10,
        story: '口岸开埠，洋货涌进来，土货涌出去。\n你乡的手织布被洋布挤得卖不动了——织机停了三成，市价跌了五成。织户们看着你，等你拿主意。',
        options: [
          { t: '领织户改织洋庄花色', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 6; s.flags['改织'] = 1; return '你改了花样与幅宽，专织洋行不做的土庄花色。市面稳住了——你明白了一个道理：斗不过船，就换一条水路。'; } },
          { t: '做洋行的收土货生意', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 5; s.flags['收洋货'] = 1; return '你转做洋行的收货人，压价收土货转手卖洋。你的钱翻了两番——你的织户们的眼神，从「等主意」变成了「防着你」。'; } },
          { t: '聚织户请官府限洋布', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 3; s.hidden.yun -= 5; s.flags['请限洋布'] = 1; return '你带头递了公呈请限洋布。呈文石沉大海——海很大，你的布很薄。你学会了在薄布上绣最结实的花样。'; } },
          { t: '改行做洋布生意', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 8; s.flags['贩洋布'] = 1; return '你索性贩起了洋布。乡里的织机彻底停了，你的铺子开了三家——你发的家，踩着你乡的织机声。这笔账，你打算用义庄还。'; } }
        ] },
      { id: 'qg_zupu', title: '族谱', tags: ['日常'], weight: 8,
        story: '续修族谱，各房要捐银。\n谱里有一支早年「下南洋」的，据说在海外发了财——修谱的信寄去了南洋，去不去信、认不认，族里吵了三个月。',
        options: [
          { t: '主修全谱，海外的也认', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.attrs.qian += 5; s.flags['全谱'] = 1; return '你主张把南洋的一支修进去。谱成那年，南洋汇来一笔修谱银——银子的分量，把族里反对的声音压平了。'; } },
          { t: '主削其支，守谱例', dim: 'li', time: '旬日', fx: function (s) { s.attrs.ming += 3; s.hidden.yin -= 4; s.flags['削支'] = 1; return '你主张按谱例削了那一支。规矩守住了——三十年后海外的那支回来认祖，你的名字在他们的名单上。'; } },
          { t: '借修谱敛族产', dim: 'yi', time: '半载', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 10; s.flags['谱银'] = 1; return '你把修谱的捐银管得很活——谱修好了，账也「活」了一笔。族老查账那天的脸色，你记了一辈子。'; } },
          { t: '借谱修契，与南洋通商', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 7; s.flags['南洋商'] = 1; return '你借修谱的信与南洋的那支通了商。族谱成了商路——纸上认亲，账上发财，两边都划算。'; } }
        ] },
      { id: 'qg_jiaofei', title: '会党', tags: ['朝堂风波', '灾祸'], weight: 9, minScene: 12,
        story: '反清的会党在你乡秘密活动，官府的密探也到了。\n有人劝你加入——「反清复明」四个字，一半是香火，一半是刀火。你的铺子、你的族、你的头，都在这四个字下面。',
        options: [
          { t: '入会，暗结义士', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.hidden.yin -= 5; s.hidden.zhi += 8; s.flags['入会'] = 1; return '你入了会。香堂上的誓词你记了一生——记了，但从没往外说。会里的人管这叫口紧，你管这叫命。'; } },
          { t: '报官请赏', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 14; s.flags['告会'] = 1; return '你报了官。赏银到手，会党的名单上有你乡的七个人——七个名字换的赏，你家用了三代才敢提。'; } },
          { t: '两面周旋，保乡太平', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.hidden.yin -= 6; s.attrs.qian += 5; s.flags['两面保'] = 1; return '你两头都递了话：会里不在我乡动手，官府不来我乡抓人。你成了两边的「中间人」——中间人的命，靠两边都离不开你。'; } },
          { t: '举家远走南洋', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.qian -= 6; s.hidden.yun += 7; s.flags['下南洋'] = 1; return '你举家下了南洋。家乡的会与官的斗，你在海外的信里一年听一段——听成了一种既安全又揪心的故事。'; } }
        ] }
    ],
    main: [
      { id: 'qg_m1', title: '顶戴之年', after: 0, time: '旬日',
        story: '你十八岁，看着父亲在县衙的门房里跪了半天才递上状纸。\n回来他说：这朝的规矩，是要跪着办事的规矩。你要么学会跪着走路，要么学会站着说话——站着说话的人，先得有站着的东西。',
        options: [
          { t: '读书，求功名与体统', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 7; s.flags['科名之志'] = 1; return '你开始攻书。你把「站着的东西」理解为功名——功名是不是，要用一生验证。'; } },
          { t: '学夷语夷算，求另一种站法', dim: 'yi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.hidden.yun += 6; s.flags['新学'] = 1; return '你找了通译学夷语。这条路没人走通——没人走的路上，你走成了路。'; } },
          { t: '从商，攒站着的东西', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 7; s.flags['商志'] = 1; return '你入了商途。父亲说：钱不是站着的东西，钱能买站着的东西——这算他一生的总结。'; } },
          { t: '练武，投旗营谋出身', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ti += 6; s.hidden.yin -= 4; s.flags['投旗营'] = 1; return '你投了旗营的汉军名额。营里的规矩教你的第一件事：跪的功夫，比站的重要。你学得快，忘得慢。'; } }
        ] },
      { id: 'qg_m2', title: '三千年之变', after: 12, time: '一季',
        story: '你在中年遇上了三千年未有之大变局的传闻。\n洋人的船越来越多，新的字（夷字）越来越多，旧的规矩一条条松了。族老们说天要变了，你看着自家的产业与儿孙——变天之前，把根往哪里移？',
        options: [
          { t: '让儿孙兼习新学', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 5; s.flags['儿孙新学'] = 1; return '你送儿孙进了新式学堂。族里骂你数典忘祖——二十年后你家两代人的饭碗，一半是新学端的。'; } },
          { t: '置办产业于通商口岸', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 5; s.flags['口岸产'] = 1; return '你在口岸置了产。田是旧的稳，铺是新的活——你的家业一半踩在旧土，一半泡在新潮。'; } },
          { t: '修祖祠、纂族谱，以旧驭新', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 8; s.attrs.qian -= 5; s.flags['修祠'] = 1; return '你花了大钱修祠纂谱。变局里宗族是最后的锚——锚沉了，船就散了。你把自己活成了锚。'; } },
          { t: '举家迁入租界观变', dim: 'yi', time: '半载', fx: function (s) { s.attrs.qian -= 8; s.hidden.yun += 7; s.flags['入租界'] = 1; return '你把家搬进了租界。租界的马路不平，电灯很亮——你活在两个朝代的缝里，缝里有光，也有风。'; } }
        ] }
    ],
    endings: [
      { name: '经世通才', group: '清显', pri: 70,
        score: function (s) { var v = (s.flags['新学'] || s.flags['儿孙新学'] ? 16 : 0) + (s.attrs.cai - 55) * 0.8 + (s.attrs.ming - 55) * 0.4 + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '三千年之变里，他最先学会了新字，没丢掉旧心。',
        epilogue: '你晚年把一生的新学札记编成了一册。\n变法那年，有司来征你的书——你只送了扉页的一句话：变法先变人，变人先变教。\n你死在旧历的年底。新式的报纸登了你的讣闻，旧式的族谱记了你的行状——两种记载，说的都是同一个人。' },
      { name: '埠头旧翁', group: '清中', pri: 50,
        score: function (s) { var v = (s.flags['买办'] || s.flags['口岸产'] ? 16 : 0) + (s.attrs.qian - 55) * 0.5 + (s.dimCount.li || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '他一生在旧与新之间摆渡，两边都叫他自己人。',
        epilogue: '你的铺子开在旧城与租界之间，门牌一块是汉字，一块是夷字。\n你死那天，两边都停了半日的市。\n出殡的队伍从旧城走到租界——抬棺的人说，棺材很沉，装着两个时代。' }
    ]
  };
})(window.GAME_DATA);
