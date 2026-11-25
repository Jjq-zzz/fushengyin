/* 「夏」朝代内容包：洪水未退，人神杂处 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.xia = {
    id: 'xia', name: '夏',
    clock: { year: 1, season: 0 },
    eras: [],
    events: [
      { id: 'xia_shoudi', title: '守堤', tags: ['日常'], weight: 12,
        story: '河水又涨了。老河伯带着全族丁壮在堤上担土。\n夜里水声像一头困兽。族老说，这河要一代一代地守——守不住，田就没了，人就散了。',
        options: [
          { t: '随老河伯上堤，担土固堤', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 6; s.attrs.xin += 4; G.addFame(s, 'xiang', 4); return '你在堤上干了一季，掌心的茧比河伯的还厚。秋汛来时堤没溃。族老拍你的肩：这河，往后有人守了。'; } },
          { t: '察水性，献分水之策', dim: 'shi', time: '一季', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 3; s.hidden.yun += 3; return '你沿河走了半月，画出一条分水的路子。水退后新田露出一大片，族老说：你画的那条线，值钱。'; } },
          { t: '请巫祝灼甲问河', dim: 'xiu', time: '旬日', fx: function (s) { s.hidden.yun += 4; s.attrs.xin += 2; return '龟甲裂纹指向下游。你照卦象把祭品沉了河。那年水没大涨——巫说河神受了；你说，是堤先修的。'; } },
          { t: '举族迁往高地', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 4; s.attrs.ti -= 3; s.hidden.yun += 5; return '你带一房人迁去了高地。老屋没在秋汛里。骂你胆小的人，与第二年大水里活下来的人，后来都叫你当家。'; } }
        ] },
      { id: 'xia_wenwu', title: '问巫', tags: ['日常', '鬼神'], weight: 10,
        story: '族里唯一的巫老了，龟甲越烧越勤。\n这回问的是：谁可承巫事？甲裂三道，老巫看了一晌，忽然望向你。',
        options: [
          { t: '应下，随老巫学灼甲', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 6; s.hidden.yun += 6; return '你学了一年灼甲，手背烫出许多小疤。老巫临终把最好的一块龟甲给你：甲不说话，说话的是心。'; } },
          { t: '婉辞，只做耕田人', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ti += 3; s.attrs.xin += 3; return '你推了。老巫叹了一声。日子照旧，只是村里再有疑难，你看龟甲的目光多了从前没有的东西。'; } },
          { t: '借巫事收拢族人之心', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 5; s.attrs.qian += 4; s.hidden.yin -= 5; return '问巫的日子被你排得很有章法，族人的进退渐渐都来问你。老巫看在眼里，什么也没说。'; } },
          { t: '当众揭破甲裂之伪', dim: 'yi', time: '旬日', fx: function (s) { if (Math.random() < 0.4 + s.attrs.cai / 250) { s.attrs.ming += 6; s.hidden.yun -= 5; return '你指出裂纹是淬水之伪，族中哗然。老巫死于那年冬天。有人敬你，有人躲你，河神那一页从此无人再问。'; } s.attrs.ming -= 8; s.hidden.yin -= 4; return '你说破了，没人信，反说你渎神。那年冬天族里死了三个人，账都算在你舌头上。'; } }
        ] },
      { id: 'xia_zhengshui', title: '争水', tags: ['灾祸', '日常'], weight: 11,
        story: '上游部落把渠口又往里挪了一丈。\n族里丁壮把木棒削好了，只等一声令下。两族为这条渠，祖上流过血。',
        options: [
          { t: '随丁壮赴渠，动手夺水', dim: 'yi', time: '数日', fx: function (s) { if (Math.random() < 0.5 + s.attrs.ti / 200) { s.attrs.ming += 5; s.attrs.ti -= 4; return '渠口夺了回来。你额上挂彩，族人抬着你喊了半日。水进了田，秧是青的。'; } s.attrs.ti -= 8; s.attrs.ming -= 3; return '水没抢回来，还折了两个人。你躺在草铺上听族老骂了半夜。'; } },
          { t: '促两族盟誓，立石分水', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin += 6; G.addFame(s, 'xiang', 6); return '盟誓成了，渠口一分为二，立石为界。那年两边的田都是青的。拳头能抢水，石头能分水。'; } },
          { t: '趁夜掘支渠，引水自灌', dim: 'yi', time: '旬日', fx: function (s) { if (Math.random() < 0.55) { s.attrs.qian += 5; s.hidden.yin -= 6; return '支渠成了，你家田先得水。没人看见，可你每回经过，脚步都轻。'; } s.attrs.ming -= 8; s.hidden.yin -= 8; return '支渠被发现了，两族险些再动刀兵。族老罚你把渠填了。'; } },
          { t: '守自家半干的田，等雨', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 4; s.attrs.ti += 2; return '八月里雨来了。抢渠的人在养伤，你插秧插得比谁都早。'; } }
        ] },
      { id: 'xia_gongyu', title: '贡玉', tags: ['朝堂风波'], weight: 9,
        story: '方国来使，催缴贡玉。\n族里仅有的一块玉是祭祖的传家之物。玉可再采，祖宗不能不敬——可方国的刀，比祖宗的牌位近。',
        options: [
          { t: '献传家之玉，保族平安', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 6; s.attrs.xin -= 3; return '族老把玉从祖案上捧下来的那一刻，手一直在抖。族保住了。祖案上从此多了一段没人提的旧事。'; } },
          { t: '带人入山采新玉', dim: 'yi', time: '一月', fx: function (s) { if (Math.random() < 0.5 + s.attrs.ti / 220) { s.attrs.qian += 6; s.attrs.ti -= 5; return '山里十九日，寻到一块青玉，使者收了。祖宗的玉还在祖案上。'; } s.attrs.ti -= 8; s.attrs.qian -= 3; return '玉没寻到，还折了一个后生。贡期到了，族老把传家玉用布包上。'; } },
          { t: '以陶器代贡，与使者周旋', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 3; s.attrs.ming -= 2; s.hidden.yun += 3; return '最好的三件陶器抬了出去，话磨了一夜。使者收陶，玉的事没再提。今年过去了，明年呢？'; } },
          { t: '闭门不纳使者', dim: 'yi', time: '数日', fx: function (s) { s.hidden.zhi += 6; s.attrs.ming -= 4; return '你把寨门闩了。使者在门外骂了半日。这一刀躲得过今年——躲得过明年么？'; } }
        ] },
      { id: 'xia_dulie', title: '独猎', tags: ['江湖奇遇', '灾祸'], weight: 8,
        story: '秋猎时山里来了一头独行的猛兽，吃过大牲口。\n猎它，是名；避它，是命。你决意独猎。老猎手拦过一次，没拦住。',
        options: [
          { t: '布陷设阱，智取猛兽', dim: 'yi', time: '半月', fx: function (s) { if (Math.random() < 0.5 + s.attrs.cai / 200) { s.attrs.ming += 10; s.attrs.cai += 4; return '六日布阱，兽落时你已三日没睡。族人抬兽皮回寨，你走在最后。'; } s.attrs.ti -= 10; s.hidden.yun -= 4; return '阱塌了，兽没落。你在山里转了半月才出来。'; } },
          { t: '结伴同猎', dim: 'shi', time: '半月', fx: function (s) { if (Math.random() < 0.6) { s.attrs.ming += 6; s.attrs.ti -= 3; return '三人同猎，兽落在最长者的矛下。分功他排你第二：设阱的人当得起。'; } s.attrs.ti -= 6; return '三人去三人回，兽没猎着。情分倒是真的。'; } },
          { t: '半途而返', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.hidden.zhi += 2; return '走到第三道岭你就折回来。族里的故事里没有你，你的冬天平平安安。'; } },
          { t: '随邻族猎队，借名出力', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 4; s.hidden.yin -= 3; return '兽皮分到一张，功劳簿上没有你的名。山里的道理：谁出力，谁出名，谁拿钱。'; } }
        ] },
      { id: 'xia_taotong', title: '陶纹', tags: ['日常'], weight: 9,
        story: '族里烧陶的作坊要出一件祭器，纹样由你来定。\n老人说照祖样来，年轻人说照河水的样子来。一器之纹，两代人的脸面。',
        options: [
          { t: '照祖样刻，分毫不改', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 5; G.addFame(s, 'xiang', 3); return '祭器出窑，纹路与祖样分毫不差。族老捧着看了半晌，说：祖宗认得这个。'; } },
          { t: '依河水之势，自创一纹', dim: 'yi', time: '半月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.hidden.yun += 2; return '你刻的纹像水又像云，出窑那日围了半个寨子。有人叫好，有人摇头。几十年后，邻族的陶上出现了同样的纹。'; } },
          { t: '两样各烧一件，看火说话', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 3; s.attrs.cai += 3; return '两件都出了窑，祖样的那件裂了。天意如此，族里没话——你心里却清楚，是火候，不是天意。'; } },
          { t: '推说手艺不济，辞了', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 2; return '你辞了。祭器照祖样烧成，平平无奇，也平平安安。'; } }
        ] },
      { id: 'xia_jisi', title: '祭祖', tags: ['鬼神', '日常'], weight: 8,
        story: '大祭之前，族里为该宰几头牲吵翻了。\n多宰，是敬祖；少宰，是过日子。巫说祖宗不数牲口，族老说祖宗数。',
        options: [
          { t: '依足古礼，该宰就宰', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.attrs.qian -= 5; return '三牲齐备，鼓声震谷。祭罢分肉，连最挑剔的老人都没挑出错来。祖宗数了什么，没人知道，规矩齐了。'; } },
          { t: '减半，留牲过冬', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 4; s.attrs.ming -= 2; s.hidden.yin -= 2; return '祭礼减半，肉分得也少。冬天的粮囤厚了一指。巫没说话，族老记下了这笔账。'; } },
          { t: '以陶代牲，新立一礼', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.cai += 4; s.hidden.yin += 4; s.attrs.ming -= 3; return '你捏了三件陶牲入祭。巫看了半晌，说：心到了。老人们摇头，年轻人记住了这个新礼。'; } },
          { t: '自请主祭，把仪程抓在手里', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.xin -= 3; s.hidden.zhi += 3; return '你主祭了。仪程一丝不乱，你的名字从此与祭台连在一起。老巫说：祭台上站过的人，就下不来了。'; } }
        ] },
      { id: 'xia_hongshui', title: '溃堤', tags: ['灾祸'], weight: 9, minScene: 6,
        story: '堤还是溃了。水进寨那夜，你能听见房屋倒下的声音。\n族人往山上跑，粮食、老人、祭器，什么都想带，什么都带不动。',
        options: [
          { t: '背老人上高地，一趟一趟地背', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ti -= 6; s.attrs.xin += 8; G.addFame(s, 'xiang', 8); return '你来回背了七趟，最后那趟差点没上来。水退后清点，族里没折一个人。族老说：堤可以再修，人在。'; } },
          { t: '抢粮抢器，把家底驮走', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 5; s.attrs.ti -= 4; return '你抢出来的粮救了自家一冬。邻家没有。水退后他们在你的田埂外站了很久。'; } },
          { t: '趁乱去上游看溃口', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 3; return '你蹚水看了溃口，记下了水路。来年修堤，你画的图省了一半工。族老这才明白，你那日不是逃，是去看路。'; } },
          { t: '抱着祖案上的牌位不撒手', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yin += 5; s.attrs.qian -= 4; return '你把祖宗的牌位抱在怀里，水齐了腰也没撒手。族人后来讲起这一夜，都从你的那双手讲起。'; } }
        ] }
    ],
    main: [
      { id: 'xia_m1', title: '社火', after: 0, time: '旬日',
        story: '你十五岁那年春社，全族在社树下分胙。\n族老喝了酒，指着河对岸说：夏后氏受命治水，治的就是这条河。治好了，是命；治不好，是命。满场的人都喝彩，只有你听见他后半句没说出口的话。',
        options: [
          { t: '问族老后半句是什么', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.zhi += 4; s.flags['问了族老'] = 1; return '族老看了你很久，说：治不好，人也得接着治。这话说给全族，全族只听前半句。你听见了后半句。'; } },
          { t: '默默把酒敬给河的方向', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.hidden.yin += 4; return '你把酒洒向河水。酒香混进水腥气里，一转眼就没了。你从此相信，有些敬，天地不收，也记得。'; } },
          { t: '当众立誓，接老河伯的担子', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.hidden.zhi += 5; s.flags['立誓治水'] = 1; return '你举碗起誓，满场喝彩。老河伯在人群后头看着，没笑——他知道这个誓有多重。'; } },
          { t: '趁社日人多，多做些小买卖', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 6; s.attrs.ming -= 1; return '你在社市来回跑了十几趟，赚了平日半月的钱。喝彩是别人的，贝是自己的。'; } }
        ] },
      { id: 'xia_m2', title: '传耒', after: 12, time: '一季',
        story: '老河伯老了，走不动堤了。\n他把用了半辈子的木耒交到你手里，说：这柄耒治过三代的水。族老在旁边补了一句：三代的水，也淹过三代的田。',
        options: [
          { t: '接耒，领着族人重修堤', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 5; s.attrs.ming += 8; G.addFame(s, 'xiang', 8); return '你领工一季，堤加高了三尺。交工那天老河伯坐在石墩上远远看了半日。他没说什么，可木耒从此真成了你的。'; } },
          { t: '接耒，却把法子改了', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 5; s.hidden.yun += 3; return '你改了旧法，分洪入洼。有人骂你改祖制，有人看你新修的堤没话说。水说了算。'; } },
          { t: '把耒供进祖祠，另立新人', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yin += 5; return '你说担不动，把耒供了起来。祠里多了一件旧器，族里少了一个治水的人——也多了一个记得这件事的人。'; } },
          { t: '卖耒给慕名的邻族', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 6; return '邻族出了大价钱。你交耒那天没回头。贝沉甸甸的，可你从此在河边走，总觉得少了点什么。'; } }
        ] }
    ],
    endings: [
      { name: '夏鼎之臣', group: '夏显', pri: 72,
        score: function (s) { var v = (s.attrs.ming - 60) * 0.8 + (s.flags['立誓治水'] ? 12 : 0) + (s.flags['督堤'] ? 8 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ ming: 62 }] },
        verdict: '他没做成王，可这条河从此记住了他的名字。',
        epilogue: '你后半生都在河上。堤修了三回，改了二回，族里的地一年比一年多。\n你死在秋汛之前的第七天。族人把你葬在堤根，说：让他听着水。\n后来的夏后氏修谱，把你那一支记了半页。半页，够用了。' },
      { name: '洪水遗民', group: '夏中', pri: 48,
        score: function (s) { var v = (100 - s.attrs.ming) * 0.4 + (s.hidden.yun - 40) * 0.3 + (s.flags['迁高地'] ? 10 : 0); return Math.max(0, Math.min(100, v)); },
        verdict: '洪水来的时候，谁也不知道自己算不算被记住的人。',
        epilogue: '大水那年你带着一家人走了很远。\n后来你在别处落了脚，学着别人的法子种田、烧陶、问巫。\n你的孩子问故乡在哪里。你说：在水退的地方。他没听懂，你也没再解释。' }
    ]
  };
})(window.GAME_DATA);
