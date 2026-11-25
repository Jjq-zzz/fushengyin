/* 「元」朝代内容包：四等之制，驿路通达 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.yuan = {
    id: 'yuan', name: '元', clock: { year: 1, season: 0 }, eras: [{ name: '至元', span: 30 }, { name: '大德', span: 11 }, { name: '至大', span: 4 }],
    events: [
      { id: 'yd_sideng', title: '四等之制', tags: ['朝堂风波'], weight: 11,
        story: '国人分四等，汉儿居末。\n衙门的告示用三种文字，汉文的排在最下。你识字，识三种排法——排法就是出路。',
        options: [
          { t: '习蒙古语与色目语', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 4; s.flags['通三语'] = 1; return '你学了三年的译语。四等人之下还有一个阶层：不会说话的人——你把自己从里面捞了出来。'; } },
          { t: '做吏不投官', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 3; s.flags['为吏'] = 1; return '你入了衙门做吏。汉人做官难，做吏稳——吏的位置像磨盘，转得慢，磨得细。'; } },
          { t: '入商贾，与色目人合伙', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 4; s.flags['色目合伙'] = 1; return '你与一位回回商人合伙跑货。他的算学与你的地缘合在一起——四等之制里，钱是第五等人，谁都认。'; } },
          { t: '讥等制，退而治农', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.ti += 3; s.flags['守田'] = 1; return '你回田里了。四等人里没有农人的等——地里的活不问你姓什么，只问勤不勤。'; } }
        ] },
      { id: 'yd_zhanlu', title: '站赤', tags: ['日常'], weight: 10,
        story: '驿路（站赤）通天下，站户供马、供饭、供力役。\n你家被签为站户——签了站，朝廷的差使就长在你家门上了。',
        options: [
          { t: '应签为站户', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 4; s.attrs.ming += 3; s.flags['站户'] = 1; return '你当了站户。驿马蹄声成了你家的钟表——报信的、传诏的、逃难的，都从你家门前过。你的耳朵，练成了半部邸报。'; } },
          { t: '贿吏改签他人', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 7; if (Math.random() < 0.6) return '签换了别家。那家的马被驿使牵走的那天，你正好路过——你低头走得很快。'; s.attrs.ming -= 8; s.flags['改签事发'] = 1; return '改签事发，你家照签，另罚了钱。驿站的消息你也知道了：关于你的那一条，传得最快。'; } },
          { t: '在驿站旁开店', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.flags['驿站铺'] = 1; return '你在驿站旁开了家食铺。过往的差人都来吃饭——你的饭桌，成了消息最灵的衙门。'; } },
          { t: '习驿传之规，谋一份押差', dim: 'yi', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.ti += 3; s.flags['押差'] = 1; return '你考了个押差的职，跑遍三条驿路。天下的路你走熟了——熟路的人，乱世里最先知道风向。'; } }
        ] },
      { id: 'yd_haiyun', title: '海运', tags: ['日常', '灾祸'], weight: 9,
        story: '朝廷行海运：江南的粮从海路运北。\n海船招工，工钱是漕运的两倍——海上的风，比鞭子讲理，也比鞭子无情。',
        options: [
          { t: '下海做工', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ti -= 5; s.attrs.qian += 8; s.flags['海工'] = 1; if (Math.random() < 0.7) { s.attrs.cai += 3; return '你跑了两趟海。海上的天说变就变——你学会了看云，看云的人，比看官脸的人踏实。'; } s.hidden.yun -= 6; return '你那趟船遇了风暴，漂了三天。你活着回来后做了个决定：不再看海——海看见你，还是会想起那三天。'; } },
          { t: '做海船的货栈', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 7; s.attrs.cai += 4; s.flags['海栈'] = 1; return '你开了海货的栈，南货北销。海运的船年年沉几艘，你的栈年年赚——赚的账里，有几页是别人的海。'; } },
          { t: '献改良帆具之策', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yin += 5; s.flags['帆策'] = 1; return '你改良的硬帆减少了覆船。海道运司采纳了——采纳的文书里没有你的名字，海工的命里多了你的。'; } },
          { t: '守田，不沾海', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你没沾海。海工们回乡时的酒你喝过——他们的故事里死过人，你的故事里只有收成。'; } }
        ] },
      { id: 'yd_semumu', title: '色目商', tags: ['日常'], weight: 9,
        story: '色目商人遍布市镇，握着斡脱钱（官本商贷）的权。\n斡脱钱利息高，官府担保——借的人多，被担保压垮的人也多。你的铺子缺本钱，借不借？',
        options: [
          { t: '借斡脱钱扩铺', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian -= 4; s.attrs.qian += 10; s.flags['斡脱贷'] = 1; return '你借了斡脱钱，铺子翻了一倍。还贷的日子像追兵——你追上了，追上之后你学会了：官本的钱，官样的还。'; } },
          { t: '拒贷，以货易货', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 4; s.flags['以货易货'] = 1; return '你用货换货，绕开了钱。色目商人赞你精明——精明的人不用他们的钱，也不欠他们的情。'; } },
          { t: '入斡脱商团为伙计', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 6; s.flags['斡脱伙计'] = 1; return '你入了斡脱的商团。商团的账比官府的清——清得冷酷。两年后你带着一身算学的本事出团，本事里有一半是冷。'; } },
          { t: '上书陈斡脱贷之弊', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.attrs.ming -= 2; s.hidden.yun -= 5; s.flags['陈贷弊'] = 1; return '你上书说斡脱贷压垮小商户。书被压了——压书的人里，有一半自己也在放贷。'; } }
        ] },
      { id: 'yd_keju', title: '科举复开', tags: ['朝堂风波'], weight: 9, minScene: 8,
        story: '废了几十年，科举复开了：限额取人，四等分额，汉人取的一半还分南北。\n你家的书等这一天等了半辈子——名额比书厚，路比门窄。',
        options: [
          { t: '应举', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.flags['元进士'] = 1; if (Math.random() < 0.3 + s.attrs.cai / 300) { s.attrs.ming += 5; return '你中了。那一科的进士总共不过百人——你成了百人之一，也成了乡里三十年来第一个「官家人」。'; } return '落第。名额一百，考生一万——你没输给学问，输给了一只骰子。你把骰子画在了书页边上。'; } },
          { t: '转投书院教书', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.flags['书院'] = 1; return '你进了书院教书。教的书生里后来中了三个——他们中榜后第一个拜的是主考，第二个是你。'; } },
          { t: '以吏进身，不挤科场', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 6; s.attrs.cai += 3; s.flags['吏途'] = 1; return '你走了吏路。科举的门窄，吏的门像地道——窄门里出贵人，地道里出实权。'; } },
          { t: '讥新科为饰，隐居治学', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 6; s.flags['隐学'] = 1; return '你说：百人的科，取不出百人的官。你隐进了山里的书院——书院的书，比官册厚。'; } }
        ] },
      { id: 'yd_huanghe', title: '河决', tags: ['灾祸', '日常'], weight: 9, minScene: 10,
        story: '黄河决了口，你乡在泛区边上。\n治河的徭役压下来，治河的贪墨也压下来——石料十成到工地的只有六成。里正问：这堤，怎么修？',
        options: [
          { t: '监工，咬住石料的数', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 4; G.addFame(s, 'xiang', 7); s.attrs.ming += 5; s.flags['监河工'] = 1; return '你盯着石料一石一石点数。贪墨的人恨你，堤保住了。第二年汛期，别乡的堤冲了三处，你乡的没动。'; } },
          { t: '入贪墨的分账', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 10; s.flags['河贪'] = 1; return '你入了分账的伙。石料省下的钱分到你手——你数钱的时候，河水的声音在你耳边大了一倍。'; } },
          { t: '领乡人筑自卫小堤', dim: 'yi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ti -= 3; s.flags['自卫堤'] = 1; return '你不等官堤，领乡人加高了自家的围埝。大水来时官堤先溃，自卫堤挡住了——乡人叫它「你的埝」。'; } },
          { t: '携家暂避高地', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.qian -= 3; s.hidden.yun += 5; s.flags['避水'] = 1; return '你举家上了高地。水退后你回家——家还在，田淹了一半。你的邻居没走，田没淹，人病了一场。命与田，各人各算。'; } }
        ] },
      { id: 'yd_xiqu', title: '戏曲', tags: ['日常'], weight: 8,
        story: '杂剧大兴，勾栏瓦舍夜夜满座。\n你写得一手好曲子——好曲子在这个朝代，换得来酒，换不来官。勾栏的班主来找你。',
        options: [
          { t: '为班底写本', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 8; s.attrs.qian += 5; s.flags['曲家'] = 1; return '你写的本子连演了三个月，满城传唱。唱你的人不知道你，知道你的人不唱——曲家的账，历来这样算。'; } },
          { t: '自己登台', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ming -= 2; s.attrs.qian += 6; s.flags['登台'] = 1; return '你自己登了台。台下叫好，族里摇头——优伶之戏，登台的人不入谱。你入不了谱，入了城。'; } },
          { t: '把牢骚写成散曲', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 3; s.hidden.zhi += 4; s.flags['牢骚曲'] = 1; return '你把四等制的牢骚写成了散曲。曲子传进了官府的宴席——宴席上有人笑，有人拍案。拍案的人后来请了你，笑的人后来忘了你。'; } },
          { t: '教曲于勾栏学徒', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 5; s.hidden.yin += 5; return '你教了十个学徒。曲子的寿命比人长——多年后你的调子还在台上，台上的角儿换了一茬又一茬。'; } }
        ] },
      { id: 'yd_baoshui', title: '包税', tags: ['朝堂风波'], weight: 8, minScene: 9,
        story: '朝廷行包税：把一乡的税额定给包税人，多收归己。\n包税的贴子贴到了市亭——你乡的税额，明码标价。竞买的人里有色目商人，也有本乡的狠人。',
        options: [
          { t: '竞买包税，公道征收', dim: 'shi', time: '一年', fx: function (s) { s.attrs.qian += 6; s.attrs.xin += 7; s.flags['包税'] = 1; if (Math.random() < 0.5) { s.attrs.qian += 5; return '你买了乡税，按定额收，分文不多。一年下来你竟有薄利——公道的生意，也能做，只是做得慢。'; } s.attrs.qian -= 5; return '你买亏了：旱了半年，税额却一分不少。你把自家的钱贴了进去才缴齐——贴钱的包税人，乡人替你记着情。'; } },
          { t: '竞买，严酷催征', dim: 'yi', time: '一年', fx: function (s) { s.attrs.qian += 12; s.hidden.yin -= 14; s.flags['苛包税'] = 1; return '你把税额抬了三成收回本。乡人给你起的外号传了两代——钱是真的，外号也是真的。'; } },
          { t: '联合乡人抬价挤走外商', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 6; s.hidden.yin -= 4; s.flags['挤标'] = 1; return '你联合乡人把标价抬上天，挤走了色目商人。外商退标那年，你的铺子吃下了他的三份生意——挤人的算术，最后都是自己的账。'; } },
          { t: '不参与，劝乡人早备粮', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 4; s.hidden.yin += 5; return '你劝乡人早点把税粮备好——不管谁包税，粮备好了心不慌。包税人换了两轮，你乡的粮囤一直是满的。'; } }
        ] }
    ],
    main: [
      { id: 'yd_m1', title: '驿路少年', after: 0, time: '旬日',
        story: '你十五岁，在驿站旁长大。\n驿马从你家门前跑过一辈子：报捷的、报丧的、传诏的。马蹄声里有整个天下——你的耳朵听惯了它，你的心还没决定跟不跟它走。',
        options: [
          { t: '学译语，走驿路的正途', dim: 'yi', time: '一年', fx: function (s) { s.attrs.cai += 7; s.flags['译语少年'] = 1; return '你学了译语。驿路上的人开始叫你「小通事」——叫着叫着，你真的成了通事。'; } },
          { t: '跟着马队学跑商', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 7; s.flags['驿商'] = 1; return '你跟着马队跑了一年商。驿路的人情你攒了一路——人情比路照值钱，路照会旧。'; } },
          { t: '进学塾，走科举的梦', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.flags['科举梦'] = 1; return '你进了学塾。科举还没开——你读书像在赌一纸还没下的诏。先生说你痴，你说等。'; } },
          { t: '在家帮父亲养驿马', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 5; s.attrs.ti += 3; return '你养了半年驿马。马的性子你摸透了——性子里最要紧的一条：驿马不认路，认背上的令。人也一样。'; } }
        ] },
      { id: 'yd_m2', title: '驿路之变', after: 12, time: '一季',
        story: '天下渐乱，驿路上跑的不再是捷报。\n你的驿站开始接待逃难的官、失散的兵、讨饭的宗室。驿站的粮册越来越薄，来的人越来越重——重得你的屋檐都弯了。',
        options: [
          { t: '倾站所存，广济过客', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin += 12; G.addFame(s, 'xiang', 8); return '你把驿站的存粮散了出去。过客里有人后来发达了——发达的人回来，把你家门前那条路修成了石路。'; } },
          { t: '关站闭户，自保度乱', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin -= 3; s.attrs.qian += 3; s.flags['关站'] = 1; return '你关了站。门板上钉了两层木条——木条挡住了乱兵，也挡住了后来敲门的恩情。'; } },
          { t: '借驿路之利，转运避难的人', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 5; s.hidden.yin += 5; s.flags['转运'] = 1; return '你用驿路的人脉，把两百多口人分批送去了安全的地方。收的钱一半——另一半，你自愿的。'; } },
          { t: '投靠过境的豪杰军队', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 5; s.flags['投军'] = 1; return '你投了过境的义军做粮官。义军的粮账你理得清楚——清楚到主帅说：这人的账，比他的命干净。'; } }
        ] }
    ],
    endings: [
      { name: '驿路通译', group: '元显', pri: 68,
        score: function (s) { var v = (s.flags['通三语'] || s.flags['译语少年'] ? 16 : 0) + (s.attrs.cai - 55) * 0.7 + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 56 }] },
        verdict: '四等人的天下，他在每一等人里都有朋友。',
        epilogue: '你晚年通译退休，把三语的词典留给了一个学徒。\n新朝立后，有人来清驿站的旧档——档案里你签过的押，几十年的驿路大事都有你的字。\n史官问：此人何人？学徒答：驿路的人。史官想了想，写下了这四个字。' },
      { name: '勾栏曲师', group: '元中', pri: 50,
        score: function (s) { var v = (s.flags['曲家'] || s.flags['牢骚曲'] ? 16 : 0) + (s.attrs.cai - 50) * 0.4 + (s.dimCount.xiu || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '他考不中的那科，把他的曲唱了一百年。',
        epilogue: '你的曲子在你死后越传越广。\n后来的人从曲子里研究这个朝代——他们说：史书写的是朝堂，曲里唱的才是人间。\n唱的人间里，有你的一间。' }
    ]
  };
})(window.GAME_DATA);
