/* 「西夏」朝代内容包：蕃汉并用，盐铁立国 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.xixia = {
    id: 'xixia', name: '西夏', clock: { year: 1, season: 2 }, eras: [{ name: '天授礼法延祚', span: 11 }, { name: '天佑垂圣', span: 3 }, { name: '福圣承道', span: 4 }],
    events: [
      { id: 'xx_fanhan', title: '蕃汉并用', tags: ['朝堂风波'], weight: 11,
        story: '国中蕃汉并用：官分蕃汉，法有两套。\n你是汉儿，学得蕃语。两套官制之间的空隙里，挤着许多人的饭碗——包括你的。',
        options: [
          { t: '入蕃学，习国书', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 5; s.flags['通国书'] = 1; return '你学了三年国书（蕃文）。通两国文字的人，一国只有几百——你成了这几百人之一。'; } },
          { t: '入汉官一系', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.attrs.cai += 3; s.flags['汉官系'] = 1; return '你入了汉官的一系。汉官管汉民的钱粮——事杂权轻，可权轻的地方，人心反而重。'; } },
          { t: '做蕃汉之间的中人', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 3; s.flags['蕃汉中人'] = 1; return '你做中人，替蕃官收汉地的租、替汉商递蕃地的货。两边的礼都收，两边的眼都躲。'; } },
          { t: '讥两制之弊，闭门注律', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 6; return '你说两套法总有一天要并成一套。你把两边的律对抄成册——三十年后新律颁行，用的正是你注的体例。'; } }
        ] },
      { id: 'xx_yijing', title: '译经', tags: ['鬼神', '日常'], weight: 9,
        story: '国主崇佛，令以国书译大藏经。\n译场招人，无俸有饭，功德簿上的名字刻在石头里。石头能存千年——你的名字要不要存一下？',
        options: [
          { t: '入译场', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.cai += 8; s.hidden.yin += 6; s.flags['译经'] = 1; return '你在译场译了两年。译出的经卷存进了皇家佛窟——佛窟后来封了，你的名字在里面睡到了几百年后。'; } },
          { t: '卖纸墨与译场', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 3; return '你承包了译场的纸墨。译经不赚钱，纸墨赚钱——佛度人，你度佛。'; } },
          { t: '借佛名放贷', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 9; s.flags['佛名贷'] = 1; return '你以寺产为保放贷，利息温和，违约率低——信佛的人不敢赖佛账。你把信仰做成了抵押物。'; } },
          { t: '在家抄经卖福字', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.qian += 3; s.hidden.yin += 5; return '你抄经卖福字，字丑价低。买的人多——人们买的不是字，是一个「有人替他拜过了」的安心。'; } }
        ] },
      { id: 'xx_yantie', title: '盐铁', tags: ['日常'], weight: 10,
        story: '国以盐铁立：青白盐贩入宋边，宋边以茶绢来换。\n私盐的路子各家的祖上都走过——你家的灶，在法与利之间冒着烟。',
        options: [
          { t: '承官盐引', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian += 6; s.attrs.ming += 4; s.flags['官盐引'] = 1; return '你承了官盐引。引贵利薄——但盐车走到宋边关卡不用躲，你的货，是光明正大的白。'; } },
          { t: '走私盐', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 9; s.flags['私盐'] = 1; if (Math.random() < 0.7) return '你的私盐队走夜路走了两年。宋边的巡缉换了四拨人——人换路不换，你的路比人活得久。'; s.attrs.qian -= 8; s.flags['盐案'] = 1; return '盐队被截。你赔了货又罚了钱——罚单上的数目，是你两年的利。你把灶拆了。'; } },
          { t: '冶铁造农器', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 6; s.flags['铁器坊'] = 1; return '你开了个铁器坊打农器。两国都买——农器不问国籍，只问锋利。你的坊成了界河两岸的「中立地带」。'; } },
          { t: '替两国缉私', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 10; s.flags['缉私'] = 1; return '你替两边缉私——缉私的人最懂私路。两年后你成了私盐贩子们共同的名字：那个叛徒。饭碗稳，骂名稳。'; } }
        ] },
      { id: 'xx_zhanhe', title: '战和之间', tags: ['边境战事', '灾祸'], weight: 10, minScene: 8,
        story: '与宋又开战了。打一阵，谈一阵；谈的使者在你乡过境，打的粮队也从你乡过境。\n两种车队都找你征夫——你家的丁，只有一双。',
        options: [
          { t: '随军出征', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 5; s.flags['从军'] = 1; if (Math.random() < 0.45) { s.attrs.qian += 4; return '你随军打了两次硬仗。蕃骑冲锋时你跟在阵后——阵后的活法，是从阵前学来的。'; } s.attrs.xin -= 6; return '你在战场上看着同什倒下。回乡后你把刀挂上了墙——挂刀那天起，你开始信佛。'; } },
          { t: '应征夫役运粮', dim: 'li', time: '一季', fx: function (s) { s.attrs.ti -= 4; s.attrs.qian += 4; s.flags['运粮'] = 1; return '你运了三季粮。粮道两边都有兵，你的骡队练出了闻烟而停的本事——骡子保了你的命。'; } },
          { t: '给两国递话，做和事人', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.hidden.yun -= 4; s.flags['和事人'] = 1; return '你在两边的营帐之间递了半年话。停战的和约里有一条边贸的条款——条款的措辞，用的是你拟的稿。'; } },
          { t: '举家避入山砦', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 6; s.flags['避战'] = 1; return '你举家进了山砦。战事在你乡外打了半年——你下山时，乡里十室九空，你家是满的。满屋的人对着满乡的空，说不出话。'; } }
        ] },
      { id: 'xx_dangxiang', title: '党项旧俗', tags: ['日常'], weight: 8,
        story: '党项旧俗：复仇相报，服斩则止；强悍尚武，鄙薄耕织。\n你的田邻是党项人，他的牛踩了你的苗——按他的俗，赔；按你的怨，恨。两套规矩在你家田埂上打架。',
        options: [
          { t: '依其俗，受赔和解', dim: 'shi', time: '数日', fx: function (s) { s.attrs.qian += 2; s.attrs.xin += 5; s.flags['和解'] = 1; return '他牵了一头羊来赔罪，按他的规矩喝了和头酒。此后你的苗田，他的牛绕着走——规矩认了，路就宽了。'; } },
          { t: '告到汉官处', dim: 'li', time: '旬日', fx: function (s) { s.attrs.ming -= 2; s.hidden.yin -= 3; s.flags['告官'] = 1; return '汉官判他赔三成。他赔了，但从此你家田埂上的路，他的牛走得格外慢——慢是一种记性。'; } },
          { t: '学他的俗，以怨报怨', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 3; s.hidden.zhi += 5; s.hidden.yin -= 6; s.flags['以怨报怨'] = 1; return '你踩回了他家的苗。他愣了愣，笑了——按他的规矩，你这是「懂行」。两家从此互相提防，也互相敬着。'; } },
          { t: '两家结为姻亲', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 8; s.attrs.qian -= 5; s.flags['蕃汉姻亲'] = 1; return '你把女儿许给了他的儿子。婚宴上两边的规矩都办了一遍——麻烦是双份的，护佑也是双份的。'; } }
        ] },
      { id: 'xx_koke', title: '蕃学汉学', tags: ['日常'], weight: 8,
        story: '国设蕃学与汉学，两边的书都招人念。\n你的两个孩子：一个想学蕃字，一个想学汉字。你的家产只供得起一个。',
        options: [
          { t: '供大的念蕃学', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 3; s.flags['蕃学生'] = 1; return '大儿子进了蕃学。国书是新兴的字，会的人少——他毕业后进了译场，家里第一次有了「官家人」。'; } },
          { t: '供小的念汉学', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 5; s.hidden.yin += 4; s.flags['汉学生'] = 1; return '小儿子念了汉学。汉书的书市与宋边相通——他的书，比蕃学的便宜，比蕃学的厚。'; } },
          { t: '两个孩子换着念', dim: 'li', time: '两载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 3; s.flags['换学'] = 1; return '你让兄弟俩一年一换，都学了个半通。半通的两个人合起来，是一整套——后来他们合伙开了个双语的账房。'; } },
          { t: '都不供，教他们放牧经商', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 7; s.attrs.ti += 3; s.flags['牧商'] = 1; return '你把两个儿子都留在了市上。三年后他们的蕃语汉话都流利——市上的大学问，是账本与嘴皮。'; } }
        ] },
      { id: 'xx_gongwei', title: '围城', tags: ['灾祸', '边境战事'], weight: 8, minScene: 9,
        story: '宋军围了城。\n围城三月，城里的粮先断，柴后断。蕃汉两边的富户各自藏粮——围城把两套规矩合成了一道题：分，还是不分？',
        options: [
          { t: '开私仓平粜', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin += 10; G.addFame(s, 'xiang', 8); return '你把自家仓里的粮按平价卖了个尽。围解之后，蕃汉两边的族老同月来你家道谢——谢词是两种，酒是一种。'; } },
          { t: '藏粮不露', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 10; s.flags['藏粮'] = 1; return '你家熬过了围城，仓里还剩半囤。围解后街坊看你的眼神，比饿更难受——你把那半囤粮，搬到了没人看见的地方吃。'; } },
          { t: '缒城请援', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ti -= 5; s.hidden.yun += 6; s.flags['缒城'] = 1; if (Math.random() < 0.5) { s.attrs.ming += 8; return '你缒城而走了三百里，援军的旗真的来了。进城那天你被人抬着走——抬你的人里，蕃汉各半。'; } s.attrs.ming -= 4; return '你没能穿过围线。回城后你在城头看着宋军的营火，看了一夜——火很大，像对面也有一个等援的城。'; } },
          { t: '组织蕃汉共守一段城墙', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin += 9; s.attrs.ming += 6; s.attrs.ti -= 5; s.flags['蕃汉共守'] = 1; return '你把蕃汉两边的丁壮编在了一段城墙上。城墙没破——破不了的从来不是墙，是墙上的两套心。那一月，两套合成了一套。'; } }
        ] },
      { id: 'xx_shichen', title: '称臣之议', tags: ['朝堂风波'], weight: 8, minScene: 10,
        story: '打不过了，朝议向宋称臣。\n称臣的文书用国书还是表？称「兀卒」还是「主」？一字之争，谈了三年。你是译场的老人，两边的文字都在你手里。',
        options: [
          { t: '以一字之利力争', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.flags['争字'] = 1; return '你在谈判桌上为「兀卒」二字争了三季。最后各让一步——你让出去的字，写进了和约；你保住的体面，写进了国史。'; } },
          { t: '劝务实：名号换太平', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 5; return '你说：字是虚的，边贸是实的。虚的字换实的市，划算。主和的公卿把你引为同调——同调的人后来都升了官。'; } },
          { t: '称病退出译谈', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.zhi += 3; return '你退了。谈成的名号你没参与——你的名字避开了那页国史，也避开了那页骂史。'; } },
          { t: '借谈判之机通两边之商', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 8; s.flags['谈中牟'] = 1; return '你随使团往返三趟，私货跟了三趟。和约成了，你的商栈也成了——和约划的界，恰好是你商路的中点。'; } }
        ] }
    ],
    main: [
      { id: 'xx_m1', title: '国字之学', after: 0, time: '旬日',
        story: '国主创制蕃书，颁行天下。\n你十四岁，私塾先生把两种字摆在桌上：左边是汉字，右边是新造的蕃字。先生说：左边是你们的过去，右边是你们的将来——学哪个？',
        options: [
          { t: '两手都学', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.cai += 8; s.flags['双字'] = 1; return '你把两种字都学了。桌上的人后来各站一边，你在中间站着——中间站久了，就成了桥。'; } },
          { t: '专攻蕃字', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.flags['专蕃字'] = 1; return '你专攻蕃字，成了国书的小吏。新字是新朝的骨血——骨头缝里的人，升得快。'; } },
          { t: '只认汉字，不学新字', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 3; s.hidden.zhi += 5; s.flags['守汉字'] = 1; return '你说：字是祖宗的魂。新字的公文你来回了五趟都没签——第五趟之后，签与不签，你说了不算了。'; } },
          { t: '写字换钱，两不沾', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 3; s.flags['写字匠'] = 1; return '你做了写字匠：汉契写汉字，蕃契写蕃字。你不问内容——内容是主家的，笔画是你的。'; } }
        ] },
      { id: 'xx_m2', title: '国运之秤', after: 12, time: '一季',
        story: '你在译场熬成了老人，两国的和战都从你手上过过字。\n今年，秤又斜了：国库空，边烽急。主政的蕃老与汉老同来问你——问的不是字，是国还有几年。',
        options: [
          { t: '答：还有三十年，若罢兵', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 6; s.flags['三十年'] = 1; return '你说了三十年。两位老人对视一眼——后来停战的和议果真签了，国也果真又走了三十年。你的话被写进了国史的「先见」条。'; } },
          { t: '答：字在，国就在', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 6; return '你说：国可以亡，字不要亡——字在，子孙还能认回自己。两位老人让你把这句话写下来，写进了译场的藏经洞。'; } },
          { t: '不答，献上一册双语的账', dim: 'li', time: '数日', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 5; s.flags['双语账'] = 1; return '你没答国运，把三十年的盐铁茶马账呈了上去。两位老人翻完账说：这才是国运。半年后新税制颁行，用的是你的册。'; } },
          { t: '答：问我何用，问天', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin -= 4; s.hidden.zhi += 6; return '你把袍袖一拂，说：问天去。两位老人愣在堂下——你的狂直救了你的清名，没救你的官。'; } }
        ] }
    ],
    endings: [
      { name: '译场国老', group: '夏显', pri: 68,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.9 + (s.flags['译经'] || s.flags['三十年'] ? 14 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '他译了一辈子字，字比他的国活得久。',
        epilogue: '国亡之后，蕃字渐渐没人认得了。\n几百年后，学者们从黑水城的佛窟里翻出经卷，一个字一个字地破译——破译出来的人说：这些字当年译得极认真。\n认真的人里，有你。' },
      { name: '界城商籍', group: '夏中', pri: 50,
        score: function (s) { var v = (s.attrs.qian - 55) * 0.8 + (s.flags['蕃汉姻亲'] || s.flags['蕃汉共守'] ? 12 : 0) + (s.dimCount.li || 0); return Math.max(0, Math.min(100, v)); },
        verdict: '两国打了两百年，他家在两边都有亲家。',
        epilogue: '你家的坟分两片：一片按汉俗朝南，一片按蕃俗朝西。\n你的曾孙考国史时把两边的故事都写了——史官给他判了个「来历不明」。\n他觉得挺好：来历不明的人，两边都不敢惹。' }
    ]
  };
})(window.GAME_DATA);
