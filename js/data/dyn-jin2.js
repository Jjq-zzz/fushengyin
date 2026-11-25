/* 「金」朝代内容包：猛安谋克，汉化相争 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.jin = {
    id: 'jin', name: '金', clock: { year: 1, season: 0 }, eras: [{ name: '天眷', span: 3 }, { name: '皇统', span: 9 }, { name: '大定', span: 29 }, { name: '明昌', span: 6 }],
    events: [
      { id: 'jn_mengan', title: '猛安谋克', tags: ['日常'], weight: 11,
        story: '猛安谋克入户：百户为谋克，千户为猛安，兵民一体。\n你家被编进谋克——冬练兵，春耕田，番上的令与农时打架。',
        options: [
          { t: '依制练兵番上', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 4; s.attrs.ming += 4; s.flags['番上'] = 1; return '你番上三个月，骑射练得扎实。谋克说：汉儿里你这弓拉得最稳——这算夸，也算隔。'; } },
          { t: '雇人代役', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 7; s.hidden.yin -= 3; return '你雇了个贫户代番。代番的人练成了真兵，你成了真的地主——两种人，一种制度。'; } },
          { t: '贿谋克改籍', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 7; s.flags['改籍'] = 1; if (Math.random() < 0.6) return '籍改成了民户。兵役躲了——谋克的册子上从此少了你，他记得这笔账。'; s.attrs.ming -= 8; return '改籍的事被猛安查出。你被罚双倍番上——番上的人里，你是被记得最牢的一个。'; } },
          { t: '练兵之余贩军马', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 5; s.flags['贩马'] = 1; return '你借番上练兵的路子贩了三匹军马。军马价高利厚——你从此明白：制度的边角料，就够养一家人。'; } }
        ] },
      { id: 'jn_keju', title: '科举', tags: ['朝堂风波'], weight: 10,
        story: '金承科举，汉儿与渤海人可试，女真另设策论进士。\n两榜并立：你考汉榜，还是改习国字考女真榜？两榜的官路，宽窄不同。',
        options: [
          { t: '考汉榜', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.flags['汉榜'] = 1; if (Math.random() < 0.4 + s.attrs.cai / 250) { s.attrs.ming += 5; return '你中了汉榜进士。授官那天你发现：同科的汉儿，比女真的同僚升得慢——你把「慢」字写进了座右铭。'; } return '落第。你把落第的卷子重读了一遍——考官的批语只有两个字：再读。'; } },
          { t: '习国字考女真榜', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 4; s.flags['女真榜'] = 1; return '你花一年学了国字，考了女真榜。榜上名额多、竞争少——你用一年的字，换了一条快十年的路。'; } },
          { t: '考明法明算', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 5; s.flags['法算吏'] = 1; return '你考了明法。两榜的清流都瞧不起法吏，法吏的桌上有实卷——实卷养家，虚名养嘴。'; } },
          { t: '代人应考', dim: 'yi', time: '半载', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 10; s.flags['替考'] = 1; if (Math.random() < 0.7) return '你替三家富户的儿子应考，各收百两。你中了个末名——末名的官身，是你的脸，他们的姓。'; s.flags['替考事发'] = 1; s.attrs.ming -= 14; return '替考事发，你被枷号示众，永不许试。枷上那天你算了一笔账：三年的钱，一辈子的名——亏。'; } }
        ] },
      { id: 'jn_hanhua', title: '汉化之争', tags: ['朝堂风波'], weight: 10,
        story: '朝中汉化与守旧相争：习汉俗者谓长久之计，守旧俗者谓忘本之祸。\n你家是汉儿，儿子的教习却请了女真师傅——两边的书都摆在案上。',
        options: [
          { t: '让儿子全习汉学', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 5; s.flags['汉学'] = 1; return '你儿子读了一年的汉书。他的字写得比策论好——写字的人在朝里受气，在州里受敬。'; } },
          { t: '请女真师傅，习骑射国书', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 5; s.attrs.ti += 3; s.flags['国俗'] = 1; return '女真师傅教会了你儿子两件事：射箭，和不在汉人面前夸射箭。第二种，是师傅白送的。'; } },
          { t: '两家并学，择优而从', dim: 'shi', time: '两载', fx: function (s) { s.attrs.cai += 8; s.attrs.qian -= 5; s.flags['并学'] = 1; return '你儿子两边都学了个囫囵。长大后他在两边的官场都走得通——你把「两边」这个词，变成了家产。'; } },
          { t: '上书言汉化当缓', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 4; s.hidden.yun -= 5; s.flags['言汉化'] = 1; return '你的书递到朝中，两头都不是人：守旧的嫌你多事，汉化的嫌你保守。你的书成了两派的靶子——靶子的命，不好。'; } }
        ] },
      { id: 'jn_nanqian', title: '南迁', tags: ['朝堂风波', '灾祸'], weight: 10, minScene: 10,
        story: '蒙古兵压北境，朝廷议迁都汴京。\n北边的田产、祖坟、猛安的军籍，都要过一次河。你家在北地的三代家业，搬还是留？',
        options: [
          { t: '举家南迁汴京', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 6; s.hidden.yun += 7; s.flags['南迁'] = 1; return '你举家南渡。北边的祖坟托了守坟的远亲——此后你每年往北望一次，望的内容一年比一年少。'; } },
          { t: '留北守产，赌蒙古不南下', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 6; s.hidden.yun -= 7; s.flags['留北'] = 1; return '你留了。三年后北地大乱，你家成了流民——流民的路上你才知道，祖坟守住了，人没守住。'; } },
          { t: '两头安置，先送丁壮', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 5; s.attrs.cai += 4; s.hidden.yun += 5; return '你把丁壮与细软先送过河，老弱守宅。两头下注的做法不体面——体面在南边等着你，命在北边陪着你。'; } },
          { t: '趁南迁贱收北地田宅', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 8; s.flags['贱收'] = 1; return '南迁的人贱卖田宅，你收了三十顷。后来北地失了——你的三十顷成了南迁客们的笑谈：他的地契，是他乡的纸。'; } }
        ] },
      { id: 'jn_zhongfu', title: '括地', tags: ['日常', '灾祸'], weight: 9, minScene: 9,
        story: '朝廷括地：检括民田分授军户。\n括地的官吏拿着册子进乡——册上的数字，决定谁家的地变成谁家的饷。',
        options: [
          { t: '依法受括', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 7; s.attrs.qian -= 5; s.flags['受括'] = 1; return '你如实受括，田减了十顷。军户得了地，倒也安分——你心疼了三年，三年后兵荒，你的十顷救不了你，你的清册救了名声。'; } },
          { t: '贿吏匿田', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 4; s.hidden.yin -= 8; if (Math.random() < 0.6) return '匿田成了。括地的册上少你三十顷——册子的窟窿，是吏家的粮仓。'; s.attrs.ming -= 10; return '匿田事发，你补田又罚钱。括地的官换了一拨，罚单没换。'; } },
          { t: '带乡人上书陈括田之弊', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yun -= 5; s.flags['陈括弊'] = 1; return '你把括地逼出的逃户写成册子上呈。朝中议了一场，括令缓了一月——一月里，逃回的农户有七十家。'; } },
          { t: '抢先把自己报成军户', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 7; s.flags['冒军户'] = 1; return '你抢先报成军户，受田免税。两年后军户要番上——你领的地开始长牙，咬你的清净。'; } }
        ] },
      { id: 'jn_menggu', title: '北虏之警', tags: ['边境战事', '灾祸'], weight: 10, minScene: 12,
        story: '蒙古的骑军年年南下，界壕形同虚设。\n州县征丁修壕、戍边。修壕的人说：壕修得再深，挡不住马；戍边的人说：挡不住也要挡——身后是家。',
        options: [
          { t: '应役修壕戍边', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ti -= 7; s.attrs.ming += 5; s.flags['戍边'] = 1; return '你戍了半年边，壕修了四十里。蒙古的游骑来过三次，壕挡住了两次——第三次，是冬天，河冻了。'; } },
          { t: '献策筑堡屯田', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yun += 4; s.flags['堡屯'] = 1; return '你献了筑堡屯田之策，试验的三堡撑过了两次抄掠。策被推广时，你已经调走了——推广的文书上没你的名。'; } },
          { t: '暗中与北虏通粮', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 12; s.flags['通虏'] = 1; return '你偷偷把粮卖给了北边的牧场。钱来得快——快得让你的每夜都睡在两种心跳里：一种怕查，一种怕愧。'; } },
          { t: '迁家入城，弃乡守城', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin -= 3; s.attrs.qian -= 5; s.flags['入城'] = 1; return '你把家迁进了州城。乡下的田成了游骑的牧场——城里的日子挤而安，挤挤你的命，安安你的心。'; } }
        ] },
      { id: 'jn_junhu', title: '军户之困', tags: ['日常'], weight: 8,
        story: '军户贫弱成了国病：饷薄、田薄、人薄。\n朝廷议给军户发「牛头地」自救——地是好地，税是重税。你家的军籍轮到了这一拨。',
        options: [
          { t: '领牛头地，勤耕自救', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.ti -= 4; s.flags['牛头地'] = 1; return '你领了地，全家下田。一年下来税缴清了，仓里还有余——谋克说：这家汉儿，比女真的会种。'; } },
          { t: '典卖军籍的田', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 7; s.flags['典田'] = 1; return '你把牛头地典了换现钱。钱花了，地的债还在——军籍的地典出去，兵役免不了，两头都沉。'; } },
          { t: '请改民籍', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 3; s.hidden.yin -= 4; s.flags['改民籍'] = 1; return '你跑了一季的官府，把军籍改成了民籍。税重了，番上没了——你用税买了自由，自由的价格，年年缴。'; } },
          { t: '替军户们写状陈情', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 6; s.hidden.yun -= 4; s.flags['陈军困'] = 1; return '你替三百军户写了陈情状。饷调了两成——调饷的文书里引了你的原句。你的名在军户的祠里挂了牌。'; } }
        ] },
      { id: 'jn_fengwan', title: '奉完颜', tags: ['日常'], weight: 8,
        story: '女真贵族的府邸要汉儿佣书、佣账、佣医。\n进贵族府当差是美差也是险差：主人的赏厚，主人的怒也厚。',
        options: [
          { t: '入府佣书', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian += 6; s.attrs.ming += 4; s.flags['佣书'] = 1; return '你入府佣书三年。府里教你一个道理：女真主人的好恶，比朝廷的法令更替得勤——你学会了看脸，也学会了装瞎。'; } },
          { t: '入府行医', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 7; s.flags['府医'] = 1; if (Math.random() < 0.7) return '你治好了主母的旧疾。赏钱之外，府里给了你一面「出入免查」的牌子——那面牌子，比赏钱值十倍。'; s.hidden.yun -= 5; return '你的药没救回府里的小郎。主人的怒你没见过第二面——你被逐出府那天，天在下雨，药箱比你的脸干净。'; } },
          { t: '借府中人脉经商', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 6; s.flags['府商'] = 1; return '你借府里的名头包了三份官买。官买的账平得很稳——稳，是因为府里的赏钱分了你一半，你的利分了府里一半。'; } },
          { t: '不入府，守自家清白', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你没去。同乡进了府的人风光了三年，倒了两年——你看完这五年，觉得自家的清白，抵得过三年风光。'; } }
        ] }
    ],
    main: [
      { id: 'jn_m1', title: '两榜之子', after: 0, time: '数日',
        story: '你生在金国的汉儿家庭。\n父亲是汉榜的老进士，一生官至州学正；叔父是女真榜的进士，一生官至猛安。两个人每年除夕同桌喝酒，喝完必吵——吵的是哪个榜救的人多。',
        options: [
          { t: '从父学文', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.flags['父学'] = 1; return '你从了父。父亲的教法只有一条：字要正，话要少——朝里两榜相争，两边的话都别学全。'; } },
          { t: '从叔学武', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 6; s.flags['叔学'] = 1; return '你从了叔。叔的教法也只有一条：先跑，再射，最后才拔刀——活下来的次序，就是功夫的次序。'; } },
          { t: '两家长都学，学成再选', dim: 'yi', time: '两载', fx: function (s) { s.attrs.cai += 5; s.attrs.ti += 5; s.flags['两学'] = 1; return '你把父叔的本事都学了个皮实。除夕那桌酒从此不吵了——吵不出结果的事，靠你的存在结束了。'; } },
          { t: '谁都不从，自去学医', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 6; s.flags['学医'] = 1; return '你拜了汉医。父叔都不反对——乱世里医家最稳，稳的东西，两榜都点头。'; } }
        ] },
      { id: 'jn_m2', title: '南渡之船', after: 12, time: '一季',
        story: '国势日蹙，你家也到了渡口。\n渡船有限，先渡官眷，再渡富户。你手里有父的告身、叔的军帖——两样东西，能上两趟船；一家人，只能上一趟。',
        options: [
          { t: '用告身先渡家人', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 7; s.hidden.yin += 6; s.flags['渡家人'] = 1; return '你把家人先送过了河，自己留下变卖最后的田产。船开的时候你才明白：告身渡人，田产渡财——渡命的，是你自己跑的那段路。'; } },
          { t: '用军帖自己先渡', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.xin -= 5; s.hidden.yun += 5; s.flags['自渡'] = 1; return '你用了叔的军帖先渡。家人两个月后也到了——他们到时，你已经把落脚的宅子备好了。你欠他们两个月的等待，用三十年偿还。'; } },
          { t: '卖掉两样凭证，雇整船', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian -= 6; s.attrs.cai += 5; s.flags['雇船'] = 1; return '你把告身与军帖都卖了，雇了一整艘民船，全家同渡。船家说：这是今年最稳的一船。稳，因为你谁都没落下。'; } },
          { t: '不渡，散财结坞自保', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; G.addFame(s, 'xiang', 6); s.flags['结坞'] = 1; return '你不渡了。散财结坞，聚了四十户人守渡口东的山坳。乱世的坞又立起来了——这次的坞主，是你。'; } }
        ] }
    ],
    endings: [
      { name: '两榜世家', group: '金显', pri: 68,
        score: function (s) { var v = (s.flags['两学'] ? 16 : 0) + (s.attrs.cai - 55) * 0.7 + (s.dimCount.shi || 0) + (s.attrs.ming - 50) * 0.3; return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 56 }] },
        verdict: '两榜相争百年，他家把两榜都装进了祠堂。',
        epilogue: '国亡之后，你的儿孙散在南北。\n南边的考了科举，北边的承了军职——族谱上两支的字辈，用的是同一套。\n你晚年的最后一句话是：榜是别人的，家是自己的。' },
      { name: '南渡医隐', group: '金中', pri: 50,
        score: function (s) { var v = (s.flags['学医'] || s.flags['府医'] ? 14 : 0) + (s.attrs.xin - 50) * 0.5 + (s.dimCount.xiu || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '他医不了国，医好了南渡路上的一城人。',
        epilogue: '你南渡后在汴京开了医铺，三十年没换过招牌。\n国亡那天你照常开门——来的人多，钱收得少。\n你的医书传了两代。第二代的人在扉页加了一行：祖父说过，朝代是病，人心是药。' }
    ]
  };
})(window.GAME_DATA);
