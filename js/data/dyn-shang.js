/* 「商」朝代内容包：青铜照影，卜辞问天 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.shang = {
    id: 'shang', name: '商',
    clock: { year: 1, season: 2 },
    eras: [],
    events: [
      { id: 'shang_buzheng', title: '卜征', tags: ['朝堂风波'], weight: 11,
        story: '王要东征，命贞人卜问吉凶。\n三块龟甲，两块说吉。老贞人问你：这第三块，灼是不灼？灼出不吉，仗还打不打？',
        options: [
          { t: '据实灼甲，不问王意', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 8; s.hidden.yun -= 4; if (Math.random() < 0.5) return '甲裂，不吉。征伐缓了一季。老贞人临终把卜签交给你：甲会碎，骨头要硬。'; return '甲裂，不吉。使者拂袖而去，你被贬去看守牛圈。牛不说话，你也不用说话了。'; } },
          { t: '顺王意，报吉', dim: 'li', time: '旬日', fx: function (s) { s.attrs.ming += 5; s.hidden.yin -= 6; return '你报了吉。征伐胜了，庆功酒里有你一爵。第三块甲会裂成什么样子，你永远不知道了。'; } },
          { t: '捧甲请老贞人定夺', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.attrs.ming += 2; return '他灼了，看了，说：吉凶在天，人事在人。这场麻烦落在他一辈子的资历上。'; } },
          { t: '借卜事结交王使', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 4; s.attrs.qian += 4; s.hidden.yin -= 3; return '你陪使者喝了三夜酒，他回王都替你说了话。你的名字进了王的耳朵。'; } }
        ] },
      { id: 'shang_zhuding', title: '铸鼎', tags: ['日常'], weight: 10,
        story: '族里受命铸一件大鼎。\n鼎成，族里有光；鼎裂，经手的人顶罪。工师把这话说了两遍。',
        options: [
          { t: '督工百日，事事过手', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 4; s.attrs.cai += 5; G.addFame(s, 'xiang', 5); return '鼎成了，声音沉厚。开鼎那日工师把最重的一锤让你打。大器是熬出来的，不是铸出来的。'; } },
          { t: '偷减铜料，中饱私囊', dim: 'yi', time: '一月', fx: function (s) { if (Math.random() < 0.4) { s.attrs.qian += 10; s.hidden.yin -= 8; return '鼎成了，壁薄了几分。没人称过铜料，你夜里却总听见鼎响。'; } s.attrs.ming -= 10; s.hidden.yin -= 8; return '鼎裂了，裂口恰在你偷料的地方。偷料的人顶罪，这规矩本身就是一口鼎。'; } },
          { t: '改良陶范，求一次成功', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 3; return '你把浇口改顺了，铸出的鼎纹比往年的深。工师说：这个改法，往后祖祖辈辈照着做。'; } },
          { t: '告病，不沾这桩差', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 2; s.hidden.zhi += 3; return '鼎成那日的热闹你隔着墙听见了。有些功没你的份，有些祸也没有。'; } }
        ] },
      { id: 'shang_fangguo', title: '征发', tags: ['边境战事'], weight: 10,
        story: '东边的方国反了。征发令到了族里：出丁三十，粮五十车。\n粮凑齐了，这个冬天就要饿死人。',
        options: [
          { t: '丁粮足额，血本应征', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 5; return '最后一车粮装车时，仓库空得能听见回声。仗打赢了，战利里有你一份，也有你饿过的那几日。'; } },
          { t: '多出丁，少出粮', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.attrs.ti -= 3; return '你磨了两天，多出五个丁，粮减十车。丁壮回来瘦了一圈，粮囤还剩着底。'; } },
          { t: '贿使者，改写族中簿册', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 8; if (Math.random() < 0.6) return '簿册改了，族里省下了大半。管账的知道，你也知道，他将来也要你改一次。'; return '使者收了贝币却没改簿。征发照旧，钱白花了，你成了族里的笑话。'; } },
          { t: '闭族自守，抗命不征', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming -= 8; s.hidden.zhi += 8; s.flags['抗征'] = 1; return '你把寨门封了。王的兵没来——今年没来。族老夜里睡不着：躲得过今年，躲不过什么时候？'; } }
        ] },
      { id: 'shang_zhanmeng', title: '占梦', tags: ['鬼神'], weight: 9,
        story: '王后夜得怪梦，梦里大屋倾颓。王命卜之，贞人们推说梦不主吉凶。\n有人悄悄劝你：这是个往上爬的机会，也是一口往下跳的井。',
        options: [
          { t: '直断：屋倾，社稷之戒', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 5; s.hidden.yun -= 5; s.flags['直言占梦'] = 1; return '你据梦直言，请王修德省刑。王没发作，赏了你贝十朋。贞人们从此看你的眼神很复杂。'; } },
          { t: '曲解为吉，讨王后欢心', dim: 'li', time: '旬日', fx: function (s) { s.attrs.ming += 5; s.hidden.yin -= 6; return '你说：屋倾，是旧屋让新屋，大吉。王后赏了锦。三年后王宫真塌了一角，压死了人。没人追究，你自己记着。'; } },
          { t: '称病闭门，不接这卦', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.zhi += 3; return '你病了十日。别人的卦解完了，荣与祸都分完了。你守住了你的手，也守住了你的手艺。'; } },
          { t: '借占梦之名进言新政', dim: 'yi', time: '一月', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 4; s.hidden.yun += 2; return '你把梦解成一条条该做的事：疏渠、省役、修仓。王准了三条。没人记得梦，都记得事。'; } }
        ] },
      { id: 'shang_nuli', title: '逃隶', tags: ['日常', '灾祸'], weight: 8,
        story: '王家作坊里一个隶逃了出来，藏进你家的谷囤。\n抓逃隶的人挨家搜。窝藏是死罪；交出去，那个人昨晚求你的眼神你还记得。',
        options: [
          { t: '藏下他，等风声过', dim: 'yi', time: '一月', fx: function (s) { if (Math.random() < 0.6) { s.hidden.yin += 8; s.attrs.xin += 4; return '风声过了，你给他一把种、半袋粮，放他往南去了。他走前给你磕了个头，磕得很实。'; } s.attrs.ming -= 10; s.hidden.yin += 5; return '搜出来了。你被罚了贝，人也险些充作抵罪。他后来又逃了一次，这回没人再藏他。'; } },
          { t: '交出去，领赏', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 10; return '赏贝拿到了。他被打断一条腿拖走时，没回头看你——这个比赏贝扎人。'; } },
          { t: '连夜送他出邑，假称失踪', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yin += 10; s.attrs.xin += 3; return '你带他走了半夜，把他塞上南行的商队。回来报了个失踪。作坊折了他的工，你折了几夜的觉。'; } },
          { t: '劝他去自首，免累旁人', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 2; s.hidden.zhi += 4; return '你劝他自首，说了很多道理。他听完走了，没自首，也没再来。你不知道他后来怎样，只知道自己那晚说的道理，一句也没替他扛。'; } }
        ] },
      { id: 'shang_yanlu', title: '盐利', tags: ['日常'], weight: 9,
        story: '滨海的卤地能煮盐，盐在邑里换得到铜与帛。\n族里要出人煮盐——那活儿熬人，烟熏火燎，一季下来眼睛都是红的。可盐是真的值钱。',
        options: [
          { t: '领人煮盐一季', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 12; s.attrs.ti -= 5; s.flags['善煮盐'] = 1; return '一季盐出，换回的贝堆满了陶罐。你的眼睛熬红了半季，家里从此有了余财。'; } },
          { t: '改进煮盐的灶法', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 7; return '你把灶改成三眼轮烧，出盐快了两成。邻族来偷学，你没拦——法子值钱，人情更值钱。'; } },
          { t: '督盐换取族中之位', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.attrs.ti -= 3; G.addFame(s, 'xiang', 4); return '你把盐事办得井井有条，族老把族中的秤交给了你。秤一上手，人心就都来问了。'; } },
          { t: '不沾盐事，守本业', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.attrs.ti += 2; return '你守着自己的田。煮盐的人富了，也熬坏了眼。你的稻子那年长得不错。'; } }
        ] },
      { id: 'shang_rengg', title: '人牲', tags: ['鬼神', '灾祸'], weight: 8,
        story: '大祭在即，卜辞说要用人牲。\n名单上有战俘，也有债奴。其中一个，前日在市上替你挡过一次无赖的拳头。',
        options: [
          { t: '据卜辞行事，不敢违天', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin -= 10; s.hidden.yin -= 8; s.flags['亲历人牲'] = 1; return '你看着仪式办完。龟甲上说是吉。你此后每回看见龟甲，胃里都发紧——有些吉，是人垫的。'; } },
          { t: '偷换名册，以病死充数', dim: 'yi', time: '旬日', fx: function (s) { if (Math.random() < 0.55) { s.hidden.yin += 10; s.attrs.xin += 5; return '名册改了，一个病死的隶顶了数。没人细查。他活着，你欠着天——你愿意欠。'; } s.attrs.ming -= 10; s.hidden.yin -= 5; s.flags['改册事发'] = 1; return '改册的事发了。你被革去执事，罚贝十朋。他倒是活了下来——这笔账两清了，你想。'; } },
          { t: '献双倍牛牲，请改卜', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 10; s.hidden.yin += 6; s.attrs.ming += 3; return '你出双倍的牛，请贞人重卜。甲裂，说可代。他活下来了，牛死了。天要不要面子，你不知道；要了就好。'; } },
          { t: '以贝赎其身，收为自有', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 12; s.hidden.yin += 5; s.npcs = s.npcs || {}; s.npcs.li_s = { name: '赎来的隶', rel: 40, alive: true, note: '你从祭坛上赎下来的人' }; return '你花了半年的积蓄把他赎了下来。他给你做活，不要工钱，做了三年——第三年你让他走了，他哭得像孩子。'; } }
        ] },
      { id: 'shang_jiameng', title: '盟誓', tags: ['朝堂风波'], weight: 8, minScene: 8,
        story: '两个方国要会盟，请你们族的中人到场作证。\n作证的人，盟成有赏；盟败，两边都怨你。老贞人说：中人是站在两堆火中间的人。',
        options: [
          { t: '应下中人之责', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 6; s.flags['作过中人'] = 1; return '盟成了。你站在两堆火中间念完了誓词。两边都记你的好，也都记你的名——出了事，第一个来找的就是你。'; } },
          { t: '收两边的礼，却托病不去', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; s.attrs.xin -= 4; return '礼你都收了，人没去。盟会照开，事照办。只是你两头都欠了，欠得无声无息。'; } },
          { t: '荐老贞人代往', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.attrs.ming += 2; return '老贞人去了，他的脸面两边都认。你在家守着祭器。省下的事，也省下了将来的仇。'; } },
          { t: '借盟会之机，与两国都通消息', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 8; s.flags['两头传话'] = 1; return '你在两边之间传了几次话，得了几份谢仪。盟成之后，你成了邑里消息最灵的人——灵的人，死得也快。'; } }
        ] }
    ],
    main: [
      { id: 'shang_m1', title: '观卜', after: 0, time: '旬日',
        story: '你十四岁，第一次被允许走近贞人的卜案。\n那日灼的是年成。甲裂的声音很脆，满屋子的人都屏住呼吸。老贞人看完裂纹，抬头问：你看见了什么？\n满屋的人都等着你说「吉」。',
        options: [
          { t: '说吉——随众意', dim: 'li', time: '数日', fx: function (s) { s.attrs.ming += 3; s.attrs.xin -= 2; return '你说了吉。老贞人点点头，没夸你。散场时他低声说：今日之甲，其实是凶。你记住了一句你没说的话。'; } },
          { t: '说出你真的看见的东西', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 8; s.hidden.yun -= 3; s.flags['初言'] = 1; return '你说：裂纹像断开的渠。满屋安静。老贞人笑了：好——看甲先看渠，再看人。你被留下了。'; } },
          { t: '说自己什么也没看见', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; return '你说没看见。老贞人说：那就再烧一块，直到看见为止。那晚你守着火，看了整夜。'; } },
          { t: '趁机摸走一小块碎甲', dim: 'yi', time: '数日', fx: function (s) { s.attrs.qian += 3; s.hidden.yin -= 3; return '碎甲在市上能换贝。你换了三枚。老贞人知道少了一块，没查——他只是在后来教你灼甲时，多考了你三遍。'; } }
        ] },
      { id: 'shang_m2', title: '贞人之任', after: 12, time: '一季',
        story: '老贞人死了。族里要立新贞人。\n候选的有你，也有王都派下来的人。族老私下说：自家的人占案，族说话才有分量；可王的人占案，族能多活几年。',
        options: [
          { t: '争这个案位，据理力争', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 8; s.attrs.cai += 5; s.flags['自族贞人'] = 1; return '你把三年来记下的三百条卜例摊在案上，压过了王使的空谈。案位是你的了。族里说话的声音，从此硬了三分。'; } },
          { t: '让位给王使，换族的平安', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.attrs.xin -= 5; s.flags['让位王使'] = 1; return '王使占了案，族里三年没被征发。你在旁边看了三年，学会了沉默的用处。'; } },
          { t: '自承案位，却行王家的规矩', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.hidden.yin -= 5; s.flags['两面贞人'] = 1; return '你坐了案位，也学王使的腔调。两边都当你是自己人——直到第一次两边冲突，你才知道自己站着的这块案，是悬着的。'; } },
          { t: '辞而不就，往南去学别族的烧陶与观星', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 5; return '你走了。南边的部族烧陶用新火，观星有定法。你学了两年回来，案位早有了主，可你看得懂的东西，多了。'; } }
        ] }
    ],
    endings: [
      { name: '贞人世家', group: '商显', pri: 70,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.9 + (s.flags['自族贞人'] ? 14 : 0) + (s.flags['初言'] ? 8 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 60 }] },
        verdict: '他烧了一辈子龟甲，替一个族问了一辈子天。',
        epilogue: '你成了贞人，又把贞人的位子传给了你的学生。\n你留下的卜辞，刻在几十块甲上，问年成、问征伐、问生死。\n几百年后有人从土里把它们翻出来，一个字一个字地认。认出来的人说：这个人问得很诚实。' },
      { name: '鼎裂之命', group: '商中', pri: 50,
        score: function (s) { var v = (100 - s.attrs.ming) * 0.3 + (s.flags['鼎裂之罪'] ? 18 : 0) + (100 - s.attrs.xin) * 0.3; return Math.max(0, Math.min(100, v)); },
        verdict: '有的鼎裂在火上，有的鼎裂在人心里。',
        epilogue: '你这一生办砸过一件大事，办成过几件小事。\n砸的那件，人人都记得；成的那些，没人提起。\n你老了以后常去作坊看铸铜。火光照在墙上，像你年轻时见过的那样。你站一会儿，就走。' }
    ]
  };
})(window.GAME_DATA);
