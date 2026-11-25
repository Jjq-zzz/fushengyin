/* 「南北朝」朝代内容包：佛寺遍地，胡汉杂处 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.nanbei = {
    id: 'nanbei', name: '南北朝',
    clock: { year: 1, season: 2 }, eras: [],
    events: [
      { id: 'nb_junti', title: '均田令', tags: ['朝堂风波'], weight: 11,
        story: '朝廷颁均田令：露田、桑田按口授受。\n你家原来的田多于口分——多出的部分要还官。还，是守法；不还，是赌官吏不查。',
        options: [
          { t: '如数还田', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.qian -= 4; s.attrs.xin += 7; s.flags['还田'] = 1; return '你把多出的田还了。授田的册子上你家的名字写得工整。十年后田制变了几回，你的册子每次都干净。'; } },
          { t: '析产分户，多领官田', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 6; s.hidden.yin -= 4; s.attrs.qian += 5; return '你把家里析成四户，按口多领了官田。析户的文书做得滴水不漏——漏洞留给下一个改制的年代。'; } },
          { t: '贿吏瞒田', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yin -= 7; if (Math.random() < 0.65) return '瞒下的田成了你家的私利。经手的吏每年都来——他来的日子，是你家最破财的日子。'; s.attrs.ming -= 8; return '瞒田被查出，罚没加倍。均田令没让你均，先让你疼。'; } },
          { t: '入寺为僧尼避课', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 5; s.flags['入寺避课'] = 1; return '你落发出家——寺田不纳课，僧尼不服役。你念经的功夫一般，避税的功德圆满。'; } }
        ] },
      { id: 'nb_chujia', title: '出家', tags: ['鬼神', '日常'], weight: 10,
        story: '佛寺遍地，出家可免役免课，还有饭吃。\n你的母亲病重，寺里的药比市上的便宜。有人说入寺是逃避，有人说入寺是修行——你和母亲都需要',
        options: [
          { t: '出家三年，为母祈福', dim: 'xiu', time: '三年', fx: function (s) { s.attrs.xin += 9; s.hidden.yin += 8; s.flags['出家'] = 1; return '你披缁三年，为母诵经。母亲多活了五年——寺里的药与你的斋饭，谁也说不清哪一样管用。'; } },
          { t: '不出家，市药奉母', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian -= 6; s.attrs.xin += 5; return '你在市上寻药，寻遍三城。母亲的病稳住了。你欠下的债用了三年还清——药是苦的，债也是。'; } },
          { t: '入寺做净人，不出家', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 4; s.attrs.xin += 3; s.flags['寺役'] = 1; return '你在寺里做净人，半僧半俗。佛你信一半，饭你信全的——这样的日子，寺内外都有很多人过着。'; } },
          { t: '借佛寺之势谋利', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 7; s.flags['借佛敛财'] = 1; return '你替寺里放贷收租，抽一成辛苦钱。佛门的账你做得干净——干净得让放贷的利息看起来像功德。'; } }
        ] },
      { id: 'nb_shimo', title: '释褐', tags: ['朝堂风波'], weight: 9,
        story: '朝廷开科取士的先声又起，寒门释褐入仕的路松了一条缝。\n你的才学够，门第不够——这条缝，是挤进去，还是等它再宽些？',
        options: [
          { t: '应选入仕', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 4; s.flags['释褐'] = 1; return '你释褐为秘书郎。品卑，路正。门第的人讥你侥幸，你把讥笑誊成了座右铭。'; } },
          { t: '先积才名三年再选', dim: 'shi', time: '三年', fx: function (s) { s.attrs.cai += 9; s.attrs.ming += 5; return '你等了三年，攒了三卷文章与州里的三封荐书。再选时，缝宽了，你进得从容。'; } },
          { t: '攀婚高门以进', dim: 'li', time: '一季', fx: function (s) { s.attrs.ming += 4; s.hidden.yin -= 6; s.flags['婚攀'] = 1; return '你入赘了高门。仕途从此顺——顺在你姓了别人的姓。每年祭祖，你都不敢抬头。'; } },
          { t: '讥科选为饰，闭门著书', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 5; s.flags['著书'] = 1; return '你说：选士之制，三百年后才是真路。你闭门写了《选举论》——三百年后，路真的来了，书没人记得。'; } }
        ] },
      { id: 'nb_hanhua', title: '汉化之争', tags: ['朝堂风波'], weight: 10,
        story: '朝廷推行汉化：改汉姓、易汉服、禁胡语。\n胡旧贵族怨声载道，汉人士族暗暗叫好。你家里两种血——改名，还是守旧姓，成了族里的大事。',
        options: [
          { t: '举族改汉姓', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 4; s.flags['改姓'] = 1; return '你举族改了汉姓，连祖坟的碑都重刻了。旧姓从此只在祭祖的祝文里出现——祝文是给祖先听的，祖先听得懂。'; } },
          { t: '守旧姓，不奉新令', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.attrs.ming -= 5; s.hidden.zhi += 6; s.flags['守旧姓'] = 1; return '你守了旧姓。仕途堵了十年——十年后风向又变，你家的旧姓成了「不忘本」的德行。守东西的人，赢在耐心。'; } },
          { t: '一家两姓，两头得利', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 7; s.flags['两姓'] = 1; return '你让长子改姓入仕，幼子守旧姓承祖。两头的路都留了——两头的人，逢年过节坐不到一桌。'; } },
          { t: '上书陈两族之利', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.hidden.yun += 3; return '你写了《胡汉合流议》，说融合是活路，清洗是死路。书传到朝中，被引了三次——三次都在关键处。'; } }
        ] },
      { id: 'nb_bluan', title: '侯景之乱', tags: ['边境战事', '灾祸'], weight: 10, minScene: 10,
        story: '乱兵过江，江南糜烂。\n台城被围数月，城里人相食。你家在城外有田、在城内有亲。乱世的算术题：保人，还是保粮？',
        options: [
          { t: '入城助守，与亲同生死', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti -= 7; s.attrs.xin += 9; s.flags['守台城'] = 1; if (Math.random() < 0.3) { s.attrs.ming += 8; return '城破前援军到了。你活着出来，瘦得脱形。你救的亲人里，活下来两个——两个，你记了一生。'; } s.hidden.yun -= 6; return '城破。你在乱军中死里逃生，亲人只找到一个。此后你不再提那几个月——提一次，重活一次。'; } },
          { t: '举家避入山寺', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.qian -= 4; s.hidden.yun += 7; s.flags['避山寺'] = 1; return '你带全家躲进山寺，以佣耕换庇护。乱平之后你出山，寺里的粥你喝了三个月——佛没救天下，救了你家。'; } },
          { t: '投乱军求生', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 10; s.flags['从乱'] = 1; return '你在乱军里做了文书。乱军吃人的事你见过，账你记过。乱平后你把那半年的记忆烧了——烧不干净的。'; } },
          { t: '囤粮居奇，乱中取利', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 12; s.flags['乱中囤'] = 1; return '你的一囤粮换了三座宅子。乱平后你的宅子越来越多，夜里的安稳越来越少——人相食的年月里你赚过钱，这件事只有你自己能审。'; } }
        ] },
      { id: 'nb_yijing', title: '译场', tags: ['日常', '鬼神'], weight: 8,
        story: '大译场招通文墨之士，校雠梵夹。\n译经无俸，饭食管饱，果报在「来世」——而来世的说法，本朝最流行。',
        options: [
          { t: '入译场校经', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.cai += 8; s.attrs.xin += 5; s.flags['译经'] = 1; return '你校了一年经，校出前人错简十七处。译主说：你的名字会随经流传——确实流传了，比你的官名久。'; } },
          { t: '译场之外贩经本', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 4; return '你把译场的抄本拿到市上卖，生意好得惊人。经是救人的，买卖是养家的——两不耽误，你信。'; } },
          { t: '著文辟佛', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yun -= 6; s.flags['辟佛'] = 1; return '你写了《论佛寺蚕食》五千言。佛门没倒，你先被寺产的势力排挤出了本州——你的文传了下来，你的困也传了下来。'; } },
          { t: '资助译场，留名功德', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin += 6; s.attrs.ming += 3; return '你资助了译场的纸笔。译成的经卷末尾，施主名单里有你——名单比经文先朽，朽前你看到过三回。'; } }
        ] },
      { id: 'nb_buqu', title: '部曲', tags: ['日常', '朝堂风波'], weight: 9, minScene: 8,
        story: '世家的部曲视同私产，随主赠转。\n你家的部曲老周，跟了你家三代。新法令部曲可放免为平民——放，还是留？老周自己在等信。',
        options: [
          { t: '放免老周，给田给身契', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yin += 12; s.flags['放部曲'] = 1; return '你把身契烧了，给了老周五亩田。他跪着哭了一场。此后他种他的田，你收他的租——租减半，他自己提的。'; } },
          { t: '留契不放，善待之', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 3; s.hidden.yin -= 5; s.flags['留契'] = 1; return '你留下契，给他添了冬衣。老周没提放免的事——他不敢提，你不敢放，两家的默契里各有一把锁。'; } },
          { t: '卖部曲与别家', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 14; s.flags['卖周'] = 1; return '你把老周一家转卖了。成交那天老周没哭没闹，只回头看了你家的大门一眼——那一眼，你看见了三代人的账。'; } },
          { t: '收其子为义子，改籍为平', dim: 'xiu', time: '一月', fx: function (s) { s.hidden.yin += 8; s.attrs.ming += 4; s.attrs.qian -= 3; return '你收老周的儿子做了义子，改籍为平民。族里说你坏了规矩——你家的规矩，从那天起确实换了一套。'; } }
        ] },
      { id: 'nb_liangdi', title: '两地书', tags: ['日常'], weight: 8,
        story: '南北分治，两国使节岁岁往来，商旅与书信时断时续。\n你的兄弟在南边，你在北边。一封信在路上走半年，到了时人可能已经没了。',
        options: [
          { t: '托使团带信', dim: 'shi', time: '半月', fx: function (s) { s.attrs.qian -= 2; s.hidden.yin += 5; s.flags['两地书'] = 1; return '你把信托给了使团。半年后回信到了，信里说：娘还在，田还在，等你。你把这三个「还在」读了十遍。'; } },
          { t: '走私商的路子通商', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 5; s.flags['南北货'] = 1; return '你做起了南北的转口买卖：南边的茶与纸，北边的马与皮。两边都禁，两边都睁眼——你成了两边都离不了的人。'; } },
          { t: '冒禁北渡寻亲', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ti -= 5; s.hidden.yun -= 5; s.hidden.yin += 8; s.flags['冒禁渡'] = 1; return '你偷渡了一次。兄弟见上了，娘没见上——你到的前一年，她走了。你把没见上的那面，留给了下一个十年。'; } },
          { t: '断了音信，各安天命', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin -= 4; s.hidden.zhi += 4; return '你停了信。不是不想，是每次写信都像给往事挖坟。三年后你重新提笔——第一句写的是：我还在。'; } }
        ] }
    ],
    main: [
      { id: 'nb_m1', title: '乱世之择', after: 0, time: '旬日',
        story: '南北对峙，你的家乡在界河边上。\n南边的船与北边的马都到过你家门口。父亲说：两边都别靠，靠了哪边，另一边的刀都记得你。\n你十六岁，第一次自己决定一件大事。',
        options: [
          { t: '两边都不靠，做界河上的生意', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 4; s.flags['界河商'] = 1; return '你做了界河上的行商。南货北货都经你的手，两边的税都缴——缴税买的是平安，平安是真的。'; } },
          { t: '渡河南下，求一个安稳', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 5; s.flags['南下'] = 1; return '你南下投了亲。南边的日子文弱，文弱得让人忘了打仗的声音——你用了一阵子才习惯安静。'; } },
          { t: '留在北地，习骑射自保', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 5; s.hidden.zhi += 4; s.flags['北守'] = 1; return '你留在北边练了骑射。界河北岸的日子硬，硬出来的骨头，后来经住了三次大乱。'; } },
          { t: '入寺读书避世', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.cai += 7; s.attrs.xin += 4; return '你借寺里的清净读了三年书。乱世里的寺院是书堆——你出来时，两边的官都在招你这样的识字人。'; } }
        ] },
      { id: 'nb_m2', title: '一统之兆', after: 12, time: '一季',
        story: '北边的国力大涨，南边的朝局日渐昏聩。\n明眼人都看出：一统有期了——谁统谁，才是问题。你家的产业、亲族、前程，分在河两岸。大水要来，你先挪哪一头？',
        options: [
          { t: '举族北迁，迎将来的大势', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.flags['迁北'] = 1; return '你把南边的产业变卖了大半，举族北迁。数年后一统，方向果然在北——族里把你的判断记进了家训。'; } },
          { t: '守南土，尽人事', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin += 7; s.hidden.zhi += 6; s.hidden.yun -= 5; s.flags['守南'] = 1; return '你说：国亡与否，轮不到商贾判断。你守着南边的产业撑到了最后——最后的最后，你把家小渡去了北边，自己留了下来。'; } },
          { t: '两头置产，静观其变', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 6; s.flags['两头产'] = 1; return '你在两边各置了产、留了人。一统之后，无论谁统治，你家都在「自己人」的名单上——这算术冷酷，但有效。'; } },
          { t: '上书两国，请罢兵互市', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 6; s.hidden.yun -= 4; s.flags['请互市'] = 1; return '你写了《罢兵互市议》，托两边的朋友各递了一份。战没停，互市开了——界河上的税关，用你拟的章程。'; } }
        ] }
    ],
    endings: [
      { name: '混一之商', group: '南显', pri: 68,
        score: function (s) { var v = (s.attrs.qian - 55) * 0.9 + (s.flags['界河商'] || s.flags['两头产'] ? 14 : 0) + (s.attrs.cai - 50) * 0.4; return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ qian: 60 }] },
        verdict: '南北打了二百年，他的货没停过一天。',
        epilogue: '一统之后，两边的关撤了，你的商队反而更大了。\n你晚年把两地的货路画成一张图，图上没有国界，只有商路。\n你的孙辈问你当年怕不怕。你说：怕。所以每条路上，我都留了两条退路。' },
      { name: '浮屠余生', group: '南中', pri: 50,
        score: function (s) { var v = (s.flags['出家'] || s.flags['避山寺'] ? 16 : 0) + (s.hidden.yin - 40) * 0.4 + (s.dimCount.xiu || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '他在寺里躲过了乱世，乱世也躲进了他的经里。',
        epilogue: '你晚年回到那座山寺，做了个烧火的杂役。\n有人认出你曾是这里的富户，问你怎么甘心。你说：甘心二字，是在这里学会的。\n你死在一个无事的下午。火没烧完，饭还温着。' }
    ]
  };
})(window.GAME_DATA);
