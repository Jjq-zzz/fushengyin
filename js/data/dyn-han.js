/* 「汉」朝代：边关烽燧未熄，豪强兼并乡里。举孝廉可入仕，巫风鬼神犹在人心。 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.han = {
    id: 'han', name: '汉',
    clock: { year: 1, season: 0 },
    eras: [
      { name: '元光', span: 6 }, { name: '元朔', span: 6 }, { name: '元狩', span: 6 },
      { name: '元鼎', span: 6 }, { name: '太初', span: 4 }, { name: '天汉', span: 4 },
      { name: '太始', span: 4 }, { name: '征和', span: 4 }
    ],
    events: [
      {
        id: 'han_shi', title: '市井', weight: 11, tags: ['日常'], minScene: 1,
        time: '数日', loc: '长安·西市',
        story: '西市有胡商卖香料，气味浓得人睁不开眼。角落里有个老妪在卖卜，面前铺一张旧席，席上摆着三枚钱与一根蓍草。\n你走过时，她忽然抬头说：这位郎君，你身上有寒气。她不要钱，只要你听她说完一句话。',
        options: [
          { t: '蹲下听她说', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.yun += 5; s.hidden.zhi += 2; s.flags['听卜'] = 1; return '她说：你命里有一处关口，过不去便是死，过得去也只剩半条命。办法只有一个——莫在冬天往西走。说完她便低头收席，不再看你。'; } },
          { t: '给她一枚钱，问她的来历', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian -= 2; s.attrs.cai += 3; s.hidden.yin += 3; return '她收了钱，笑：我是从边地来的，那里的人，人人都会看天。你看这天的云，压得低，是要打仗的样子。她说完便不再言语。'; } },
          { t: '去市署查她有无市籍', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 3; s.attrs.ming += 4; s.attrs.qian -= 2; s.flags['查市籍'] = 1; return '市署的吏翻了几遍册子，说：西市没有这个人。你回去时，那张旧席已经收了，地上只剩三枚钱的印子。'; } },
          { t: '反问她：你自己过得去那道关口么', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 6; s.hidden.yun -= 3; return '她愣住了。半晌，她说：我早过了，过得只剩这一张席。她把三枚钱收进袖里，起身走了，走得很快，像逃。'; } }
        ]
      },
      {
        id: 'han_xiao', title: '举孝廉', weight: 10, tags: ['朝堂风波'], minScene: 2,
        time: '两月', loc: '本郡·郡府',
        story: '郡里今年有一个孝廉的名额。太守的门槛已被踏薄了。\n你父亲的老友在郡府做曹掾，托人捎话来说：若想争，须得有人在乡里替你说话，还得有一篇能看的文章。',
        options: [
          { t: '作一篇策论，托曹掾递上去', dim: 'shi', time: '两月', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 10; s.flags['举孝廉'] = 1; return '文章递上去半月，太守召你问了几句，问的是《春秋》，你答得稳。他点了点头。出府时曹掾拍拍你的肩，什么也没说。'; } },
          { t: '先散财乡里，博一个孝悌之名', dim: 'li', time: '半载', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 25; s.attrs.ming += 12; s.hidden.yin += 8; s.flags['乡望'] = 1; return '半年里你施粥、修路、替人赎子。乡里的父老说起你，都点头。名额最后给了别人，可你的名字，太守记住了。'; } },
          { t: '不争，静观其变', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.xin += 5; s.hidden.zhi -= 4; s.attrs.cai += 3; return '你没有动。名额给了一个豪强家的子弟，乡里有些议论，也很快就散了。你在灯下读了两月的书。'; } },
          { t: '摸清对手的短处，一并递上去', dim: 'yi', time: '两月', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 6; s.hidden.yin -= 10; s.hidden.zhi += 6; s.flags['举孝廉'] = 1; s.flags['结怨豪强'] = 1; return '你把对手家中隐瞒田亩的事递了上去。名额归了你，可那家人夜里的灯一直亮着。有人劝你：这郡里，你别想安生了。'; } }
        ]
      },
      {
        id: 'han_bian', title: '烽火', weight: 10, tags: ['边境战事'], minScene: 3,
        time: '一年', loc: '朔方·边塞',
        story: '匈奴入寇，朝廷发兵。郡中点了三十人去戍边，你是其一。\n同行的有个叫赵五的，家中新妇才过门。他一路上不怎么说话，只在夜里翻身。',
        options: [
          { t: '在军中搏一个功名', dim: 'shi', time: '一年', fx: function (s) { s.attrs.ti += 6; s.attrs.ming += 10; s.attrs.qian += 6; s.flags['边功'] = 1; return '一次夜袭，你跟着队正冲进敌营，砍了两个。回来时队正拍你的背，说：名字报上去，你有了出身。你摸摸自己的手，还在抖。'; } },
          { t: '留心边地的商路与马价', dim: 'li', time: '一年', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 14; s.flags['识边市'] = 1; return '你发现边关的马，比关内便宜一半。你托人捎信回去，让家里来贩。这一趟若成了，能抵三年收成。'; } },
          { t: '守着赵五，让他活着回去', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 5; s.attrs.xin += 6; s.hidden.yin += 14; s.flags['护赵五'] = 1; s.npcs.zhao = { name: '赵五', rel: 40, alive: true }; return '一次突围，赵五的腿中了箭，你背着他跑了三里。回来他跪下来要给你磕头，你把他拉起来。他从此逢人便说：我这条命是他的。'; } },
          { t: '托病退到后营，只管喂马', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 8; s.attrs.qian += 4; s.hidden.yun += 3; s.flags['避战'] = 1; return '你说心口疼，退到了后营。从此每日铡草、喂马、扫槽。前头打起仗来，你听见鼓声，手里的草叉不肯停。'; } }
        ]
      },
      {
        id: 'han_hao', title: '豪强', weight: 9, tags: ['日常'], minScene: 4,
        time: '一月', loc: '本郡·乡里',
        story: '乡里大姓张家，占了一条水渠的上游。中人之家、贫户都靠这条渠吃饭。\n张家的管事来说：若你肯替张家写一篇碑记，称颂他家"惠及乡里"，便许你三亩好地。',
        options: [
          { t: '写，三亩地是实打实的', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 12; s.attrs.ming -= 4; s.hidden.yin -= 8; s.flags['为张作碑'] = 1; return '碑文写得很漂亮，你自己读了一遍，觉得脸有些热。三亩田契拿到手，张家管事说：郎君是明白人。'; } },
          { t: '写，但在碑文里藏一句讽语', dim: 'yi', time: '一月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.hidden.yin += 4; s.hidden.zhi += 5; s.flags['碑有微词'] = 1; s.flags['得罪张家'] = 1; return '你写了"水行其道，不私一姓"八个字。张家看不懂，乡里读书人看懂了。传到张家耳中时，已过了三年。'; } },
          { t: '不写，去替乡人告官', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ming += 10; s.attrs.qian -= 8; s.hidden.yin += 10; s.hidden.zhi += 6; s.flags['告张家'] = 1; return '状子递上去，县里压了两月，最后批了个"两家自议"。你被张家记恨，乡人却开始叫你"郎君"。'; } },
          { t: '避而不答，托病不见', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 4; s.attrs.ming -= 2; return '你称病不见。管事来过两回，第三回就不来了。水渠的事，后来听说还是那样。'; } }
        ]
      },
      {
        id: 'han_gui', title: '夜祠', weight: 8, tags: ['鬼神异闻'], minScene: 5,
        time: '数日', loc: '本郡·社祠',
        story: '村里社祠的老巫死了。死前一夜，有人听见他在祠里与人说话，说了很久。\n新巫还未选出来。村人夜里路过社祠，都绕着走。今夜有人在祠里点了灯。',
        options: [
          { t: '进去看看', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.yun += 6; s.hidden.zhi += 4; s.flags['入社祠'] = 1; return '祠里只有一盏灯，灯下坐着个孩子，是老巫的孙子，才七八岁。他说：爷爷让我在这里等一个人。他抬头看你：是你么？'; } },
          { t: '替村人办一场送巫的祭', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.qian -= 8; s.attrs.ming += 6; s.hidden.yin += 10; s.hidden.yun += 3; s.flags['送巫'] = 1; return '祭办得周全。村里老人说，这后生懂礼。那天夜里你梦见一个模糊的人影，对你拱了拱手。'; } },
          { t: '去问功曹，社祠该归谁管', dim: 'shi', time: '半月', fx: function (s) { s.attrs.cai += 3; s.attrs.ming += 4; s.flags['问社祠'] = 1; return '功曹翻了册子，说社祠的祭田早在官册上，只是这些年没人管。他抬头看你：你既问了，就由你去催一催。你应下了，回家路上才想起自己并不懂祭祀。'; } },
          { t: '把社祠的祭田、祭器清点入册', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 8; s.attrs.ming -= 3; s.flags['掌社祠'] = 1; return '你清点得很细。清到一半，发现祭田的册子有两本，数目对不上。你把这两本都收进了怀里。'; } }
        ]
      },
      {
        id: 'han_nv', title: '东家女', weight: 8, tags: ['情缘'], minScene: 6, age: [17, 32], cond: { noflag: '成家' },
        time: '半载', loc: '本郡·乡里',
        story: '东家的女儿常来井边打水。她打水的时候，袖子挽到肘上，手臂很白。\n有一回她的桶绳断了，你替她捞上来。她说了声谢，声音很小。此后每回见面，她都会看你一眼。\n东家是乡里的小吏，家里不算富，却比你家体面。',
        options: [
          { t: '托媒去说亲', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.qian -= 8; s.attrs.xin += 6; s.attrs.ming += 3; s.flags['成家'] = 1; G.marryTo(s, '妻', -2, 45); return '婚事定下了，来年开春过门。她把一块自己绣的帕子给你，什么也没说。你揣在怀里，一路上摸了七八回。'; } },
          { t: '先去求个功名再来提亲', dim: 'shi', time: '两载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.hidden.zhi += 6; s.flags['约定'] = 1; return '你对她说：等我有了出身，就来提亲。她点头，说：我等。两年后你回来，她还在井边打水，只是桶绳换了新的。'; } },
          { t: '只当没这回事，专心做事', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 8; s.attrs.xin -= 2; return '你不再去那口井。她后来嫁了县城的一个商人，走那天你远远看着，没上前。'; } },
          { t: '当面同东家把话说透', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 3; s.attrs.qian -= 4; s.hidden.zhi += 4; s.flags['直说'] = 1; return '你挑了个下雨的日子，站在东家门前，把要娶他女儿的话一句一句说了。他看了你很久，说：你倒是敢。这事最后没成，可她在井边再见你时，眼睛是亮的。'; } }
        ]
      },
      {
        id: 'han_li', title: '里正', weight: 9, tags: ['日常'], minScene: 2,
        time: '一月', loc: '本郡·乡里',
        story: '里正老了，要推一个人接他的位子。这差事不算官，却管着一乡的户口、赋税、徭役，油水不多，权柄不小。\n乡里够格的有三个：你，一个屠户，一个从前在县衙当过差的闲汉。',
        options: [
          { t: '请乡老喝酒，把话说透', dim: 'li', time: '一月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 8; s.flags['任里正'] = 1; return '酒喝了三场，话说了许多。乡老们在席上点头，散席后各自回家。半月后，里正的印到了你手上，木头刻的，很旧。'; } },
          { t: '把一乡的田亩户口重新丈量一遍', dim: 'shi', time: '两月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 10; s.attrs.ti -= 3; s.flags['任里正'] = 1; s.flags['清丈田亩'] = 1; return '你带人走了两月，把每一块田、每一户人都记在册上。册子交上去，县里说你办事明白。乡里却有人夜里在你门上敲了三下。'; } },
          { t: '推辞，说自己还年轻', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你推了。里正看了你很久，说：可惜。屠户接了他的位子，第二年加了一成耗。'; } },
          { t: '把屠户的短处递上去，挤掉他', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 8; s.hidden.zhi += 5; s.flags['任里正'] = 1; s.flags['结怨屠户'] = 1; return '你把屠户私宰耕牛的事递了上去。他被罚了钱，里正也做不成了。你接了印。头一天巡乡，屠户站在自家门口，手里握着刀，看你走过去。'; } }
        ]
      },
      {
        id: 'han_shu', title: '抄书', weight: 9, tags: ['日常'], minScene: 2,
        time: '一季', loc: '本郡·书肆',
        story: '郡里的书肆收抄本，一部《论语》给三十钱。你写得不算快，但字还看得过去。\n掌柜说：若肯抄《急就章》，给得多些，只是要得多。',
        options: [
          { t: '接《急就章》，日夜抄', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 12; s.attrs.ti -= 4; s.attrs.cai += 4; return '你抄了三个月，手指起了茧，眼睛也花了。钱到手那日，你在书肆门口站了一会儿，觉得这钱很沉。'; } },
          { t: '抄《论语》，顺便把它读熟', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 10; s.attrs.qian += 5; s.attrs.xin += 3; return '你抄得很慢，抄一句想一句。半年抄完，书也记住了大半。掌柜说你抄得比旁人讲究。'; } },
          { t: '问掌柜能不能赊纸，自己抄一部留着', dim: 'shi', time: '一季', req: { ming: 20 }, fx: function (s) { s.attrs.cai += 6; s.attrs.qian -= 4; s.flags['有自己的书'] = 1; return '掌柜赊了纸给你。你抄了一部《论语》，自己留着。这是你第一本属于自己的书。'; } },
          { t: '把抄本偷偷多抄一部，拿到邻县去卖', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 18; s.hidden.yin -= 6; s.flags['私卖抄本'] = 1; return '你多抄了一部，托人带到邻县卖了。钱比工钱多三倍。掌柜后来清点纸张，皱了下眉，没说什么。'; } }
        ]
      },
      {
        id: 'han_hu', title: '胡商', weight: 8, tags: ['江湖奇遇'], minScene: 3,
        time: '半月', loc: '长安·西市',
        story: '一个胡商在巷子里拦住你，说他的货被市吏扣了，缺个会写汉字的人替他写一份状子。他手里攥着一小袋金子，说话很急。\n他的汉话说得不好，可你能听懂：那批货里，有一半是要运去边关的药材。',
        options: [
          { t: '替他写，分文不取', dim: 'yi', time: '半月', fx: function (s) { s.attrs.ming += 4; s.hidden.yin += 10; s.hidden.yun += 5; s.npcs.hu = { name: '胡商', rel: 30, alive: true }; s.flags['助胡商'] = 1; return '状子递上去，货第三日就放了。胡商要给你金子，你没收。他从此每月都来，带一点干果或一小块香料，放在门口就走。'; } },
          { t: '写，但要他三成的货值', dim: 'li', time: '半月', fx: function (s) { s.attrs.qian += 20; s.hidden.yin -= 3; s.npcs.hu = { name: '胡商', rel: 10, alive: true }; return '他犹豫了很久，还是应了。状子写得很好，货放了。他数钱给你的时候，手比那天更抖。'; } },
          { t: '不写，市吏的事不该沾', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你摆手走了。后来听说那批货烂在了库里，胡商也走了，不知去了哪里。'; } },
          { t: '问他能不能带自己走一趟边关商道', dim: 'shi', time: '一月', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 8; s.npcs.hu = { name: '胡商', rel: 20, alive: true }; s.flags['识商道'] = 1; return '他答应了。路上他教你看骆驼的牙口、辨胡语里的虚词。你学得很快。他似乎很喜欢你，说你像他年轻时的一个朋友。'; } }
        ]
      },
      {
        id: 'han_yu', title: '雨灾', weight: 10, tags: ['天灾时疫'], minScene: 4,
        time: '两月', loc: '本郡·乡里',
        story: '雨下了四十天。河决了，田淹了，村里一半的屋子塌了。\n县里的赈粮过了半月才到，到的时候已经少了两成。里正说：上头说只有这些。',
        options: [
          { t: '带人堵河，先保住剩下的田', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ti -= 8; s.attrs.ming += 12; s.hidden.yin += 12; s.hidden.yun += 4; s.flags['堵河'] = 1; return '你在河堤上守了七天七夜，肩上磨破了皮。河最终没再决口。收成只剩三成，可这三成是抢回来的。'; } },
          { t: '查赈粮的账，问少的那两成哪去了', dim: 'shi', time: '一月', req: { cai: 30 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 8; s.hidden.yin += 8; s.flags['查赈粮'] = 1; s.flags['得罪县吏'] = 1; return '你当着众人把账算了一遍，数目对不上。县吏的脸青了。粮补足了一半，可你的名字也进了县衙的黑册子。'; } },
          { t: '把自家的粮分给最穷的几户', dim: 'xiu', time: '一月', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 8; s.hidden.yin += 14; s.flags['散粮'] = 1; return '你把粮分成小份，一家一家送。送到第七家时，你家的缸也见底了。母亲什么也没说，只是把粥煮得更稀。'; } },
          { t: '趁灾收地，贱价买进', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 22; s.attrs.ming -= 10; s.hidden.yin -= 14; s.flags['灾年收地'] = 1; return '你买下了十几亩被水泡过的田，价钱低得离谱。契约按了手印，那几户人连夜搬走了。此后你在乡里走路，总有人在你背后啐一口。'; } }
        ]
      },
      {
        id: 'han_ke', title: '游侠', weight: 8, tags: ['江湖奇遇'], minScene: 4,
        time: '数日', loc: '本郡·城外',
        story: '城外的破亭子里，有个满身酒气的汉子在磨剑。他见你路过，抬眼看了一下，说：兄弟，赊我一碗酒。\n他腰上有一道新伤，血把衣襟都洇黑了。',
        options: [
          { t: '替他买酒，再请个医生', dim: 'yi', time: '数日', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 4; s.hidden.yin += 6; s.npcs.xia = { name: '游侠', rel: 35, alive: true }; s.flags['救游侠'] = 1; return '医生替他缝了七针，他一声没吭。走时他把剑鞘上的一枚铜环解下来给你，说：拿着，日后有人为难你，给他看。'; } },
          { t: '买酒，问他刀口上的买卖', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 3; s.npcs.xia = { name: '游侠', rel: 20, alive: true }; return '他说得很直白：拿钱，做事，不问是非。他问你要不要入伙。你说再想想。他笑：想清楚了就晚了。'; } },
          { t: '不理会，绕路走', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 2; return '你绕开了。走出一里地，听见后头有马蹄声。后来听说那日城里抓了三个"盗"，其中一个死在狱里。'; } },
          { t: '趁他伤重，摸他的行囊', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 14; s.hidden.yin -= 10; s.hidden.zhi += 6; s.npcs.xia = { name: '游侠', rel: -30, alive: true }; s.flags['偷游侠'] = 1; return '你摸到一小袋金子和一封没写名字的信。金子你拿了，信你也拿了。他醒来时你已走远。三年后有人在夜里敲你的门，敲得很轻，很久。'; } }
        ]
      },
      {
        id: 'han_zong', title: '宗族', weight: 8, tags: ['日常'], minScene: 5,
        time: '一月', loc: '本郡·宗祠',
        story: '族里要修谱。管事的族老说，你父亲那一支，早年有一桩事没说清，谱上不好写。\n他说得很客气，意思却明白：要么你出钱把这一页"修"得体面些，要么这一支就记在旁支名下。',
        options: [
          { t: '出钱，把父亲那一支写正', dim: 'li', time: '一月', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 6; s.flags['谱上有名'] = 1; return '钱出了，谱也修了。你父亲的名字端端正正写在那一页上。族老合上谱，说：这才像话。'; } },
          { t: '把当年的事查清楚，拿出凭据', dim: 'shi', time: '两月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.hidden.zhi += 6; s.flags['查清祖事'] = 1; return '你翻了三家的旧契，又找到一位还记得此事的老妇。凭据拿出来那日，族老看了很久，说：是我记错了。'; } },
          { t: '不入谱也罢，自己另立门户', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 4; s.hidden.zhi -= 4; s.flags['自立门户'] = 1; return '你说不必修了。族老愣住了。你走出宗祠，天正下雨。此后族里的事，再没人来问你。'; } },
          { t: '夜里把谱偷出来，自己改', dim: 'yi', time: '数日', req: { ti: 30 }, fx: function (s) { s.attrs.ming += 4; s.hidden.yin -= 5; s.hidden.zhi += 4; s.flags['私改族谱'] = 1; return '你翻墙进了祠堂，就着月光改了三行字。改完手抖得厉害。第二日族老翻谱，看了半天，说：原来是这样。'; } }
        ]
      },
      {
        id: 'han_yan_tie', title: '盐铁', weight: 11, tags: ['日常', '朝堂风波'], minScene: 3,
        time: '两月', loc: '本郡·盐场',
        story: '朝廷下了诏，盐铁归官。郡里设了盐官，铁器也由官卖。\n城门口的告示下围了一圈人，没人念得出声。你家灶上那口铁锅，是祖父时候打的。铁官说：私铸铁器者，罚。\n盐场那边，煮盐的灶户都编了册，盐一出锅便归官。',
        options: [
          { t: '去盐官处应募做个吏', dim: 'shi', time: '两月', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 6; s.attrs.qian += 6; s.hidden.yin -= 2; s.flags['盐官吏'] = 1; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 6; return '你替他管册、记账、验盐色。盐官姓严，做事狠，待手下却还算公道。他教你一句话：官家的东西，一文也不能多拿，一文也不能少给。'; } },
          { t: '把旧铁器暗里卖给乡人', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 14; s.attrs.ming -= 4; s.hidden.yin -= 6; s.flags['私铁'] = 1; return '你把铁锅、铁锄、两把旧刀埋在后院。夜里有人来敲门，一手交钱，一手交货。来的人越来越多，你开始怕，可钱实在好赚。'; } },
          { t: '不理会，照旧过自己的日子', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 5; s.attrs.qian -= 3; return '你没有去应募，也没有藏什么。官盐贵了，你就少吃盐；铁器贵了，你就用木的。日子紧一些，可夜里睡得安稳。'; } },
          { t: '替灶户去县里递一份状', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.attrs.ti -= 3; s.hidden.yin += 10; s.hidden.zhi += 5; s.flags['助灶户'] = 1; return '状子写的是灶户的苦：盐归了官，工钱却按旧例给。县里压了半月，最后添了两成工钱。灶户们凑了一坛酒送到你家门口，没留名字。'; } }
        ]
      },
      {
        id: 'han_tunshu', title: '屯田', weight: 10, tags: ['边境战事', '日常'], minScene: 5,
        time: '三年', loc: '朔方·屯所',
        story: '边郡新开了几处屯田，募民去种。官给牛与种，收成官取大半。\n去的人要在那边落籍，一去便是一辈子。郡里来的人说得很实在：那边风大，土是生的，头两年未必有收。\n愿意去的，今日就画押。',
        options: [
          { t: '画押，去边地开荒', dim: 'shi', time: '三年', fx: function (s) { s.attrs.ti += 8; s.attrs.qian += 6; s.attrs.ming += 6; s.attrs.xin += 3; s.flags['屯边'] = 1; return '三年里你开了四十亩生地。头一年种下去，长出来的苗稀得像眉毛。第三年秋天，风一过，穗子压得低。你站在田头，忽然觉得这片土是自己的一样。'; } },
          { t: '不去，留在郡里替屯户算账', dim: 'li', time: '两月', fx: function (s) { s.attrs.cai += 7; s.attrs.qian += 12; s.flags['算屯账'] = 1; return '你替十几户屯民算牛价、种价、官取几成。算得越细，你越明白这差事里头有多少空子。你没有伸手，只把自己的那份工钱收得干净。'; } },
          { t: '守着自家的几亩薄田', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 6; s.attrs.ti += 2; s.attrs.qian -= 2; return '你没有走。自家的田只有几亩，你把它翻了两遍，修了田埂，挖了一条小渠。收成不多，可每一粒都是自己的。'; } },
          { t: '劝那户别去，替他们垫粮', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 6; s.hidden.yin += 12; s.flags['垫粮'] = 1; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12; return '那家只有母子两个，儿子才十四。你说：边地不是你这样的人去的。你把家里的粮分了一半给他们，又替他们求了一份郡里的差事。那孩子后来一直叫你一声哥。'; } }
        ]
      },
      {
        id: 'han_chenwei', title: '谶语', weight: 9, tags: ['朝堂风波', '鬼神异闻'], minScene: 4,
        time: '一月', loc: '本郡·书肆',
        story: '郡里传开一句谶语，说某星入斗，当有易代。\n这话原是方士说的，传了几日，传成了另一个样子。县里已经拿了两个读书人。\n你案头有一卷纬书，是父亲留下的。',
        options: [
          { t: '把纬书送到县里自陈', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 5; s.hidden.yin += 4; s.flags['自陈纬书'] = 1; return '你抱着那卷书进了县衙。县吏翻了两页，问：你父亲是做什么的。你答了。他把书收进柜里，说：回去吧，往后别留着这些。你出门时，腿有点软。'; } },
          { t: '把纬书抄给别人，换些钱', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 12; s.hidden.yin -= 8; s.hidden.zhi += 4; s.flags['传纬书'] = 1; return '你抄了三份，一份卖给西市的卜者，一份给了一个游学的书生，一份自己留着。钱不多，可谶语传得更快了。有人在夜里被带走时，你正在灯下数钱。'; } },
          { t: '一把火烧了，再不提此事', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 7; s.hidden.zhi -= 5; s.hidden.yun += 2; return '你在院里烧了那卷书。纸灰飞得很高，落在瓦上。你站着看到最后一页卷起来、发黑、散掉，才回屋。'; } },
          { t: '替被拿的读书人作证', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 8; s.attrs.ti -= 4; s.hidden.yin += 10; s.hidden.zhi += 4; s.flags['谶案作证'] = 1; return '你说那句话是他酒后胡说的，没有别的意思。县吏盯着你看了很久，问：你替他担保？你说担保。他被放了，你自己却在册上留了一个名。'; } }
        ]
      },
      {
        id: 'han_suanmin', title: '算缗', weight: 9, tags: ['朝堂风波', '日常'], minScene: 4,
        time: '两月', loc: '本郡·市中',
        story: '朝廷要算商贾的缗钱，按本钱抽税。隐匿不报的，罚戍边，财物没官；告发的，赏其半。\n这两日市里人人自危。有个相熟的商人来找你，把一卷货单放在案上，说：你识得字，替我改一改。',
        options: [
          { t: '不肯改，劝他照实报', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 8; s.attrs.qian -= 6; s.flags['劝人实报'] = 1; return '你把货单推回去，说：改了，往后你一辈子都要怕人。他脸色变了几回，最后把单子收进袖里。那年他交了重税，可第二年还能开张。'; } },
          { t: '改了，收他一笔', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 20; s.hidden.yin -= 12; s.hidden.zhi += 3; s.flags['改货单'] = 1; return '你把数目改得很巧，巧到连老吏也看不出。他给了你一大笔，走时握着你的手说：往后有事，找我。你收钱的手很稳，心却一直没静下来。'; } },
          { t: '推说不敢，关起门来', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; s.attrs.ming -= 2; return '你说：这种事我担不起。他起身走了，走得很快。后来听说他没改单子，罚了钱，铺子还在。你不知该松一口气还是该愧。'; } },
          { t: '告发，赏钱散给乡里', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 6; s.attrs.qian += 16; s.hidden.yin += 4; s.hidden.zhi += 6; s.flags['告缗'] = 1; s.flags['结怨商贾'] = 1; return '你把隐匿的几家一并报了上去。官府抄了货，赏了你一笔。你把大半散给了乡里的贫户，剩下的留着。有人在夜里往你家门上抹了粪。'; } }
        ]
      },
      {
        id: 'han_liumin', title: '流民', weight: 10, tags: ['天灾时疫', '善缘'], minScene: 6,
        time: '两月', loc: '本郡·城门外',
        story: '关东闹了饥荒，流民一路往西。城外土坡上搭了草棚，一棚挤着十几口人。\n县里封了城门，说恐生疫。有个妇人抱着孩子跪在门外，孩子已经不哭了。',
        options: [
          { t: '出城送一碗粥', dim: 'yi', time: '数日', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 6; s.hidden.yin += 12; s.flags['施粥'] = 1; return '你把锅端出去，一勺一勺分。分到那妇人时，孩子已经醒了，睁着眼睛看你。她没道谢，只是把孩子的脸按在肩上，肩膀抖得很厉害。'; } },
          { t: '雇流民修渠，管一顿饭', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.attrs.ming += 4; s.hidden.yin += 6; s.attrs.cai += 3; s.flags['雇流民'] = 1; return '你雇了三十几个人，修一条荒了多年的渠。工钱压得低，饭管饱。渠修成那日，有个老汉摸着水说：这水是甜的。你的田，也从此不缺灌溉。'; } },
          { t: '联名上书，求县里开仓', dim: 'shi', time: '两月', req: { cai: 32 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 8; s.hidden.yin += 8; s.flags['求开仓'] = 1; s.flags['得罪县吏'] = 1; return '你把流民的数目、病死的人数、城中存粮的数目一并写了进去。县里骂你多事，可仓最终还是开了。开仓那日，你站在人堆里，谁也不知道是你写的。'; } },
          { t: '在门内念经，不出', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 3; s.hidden.yin -= 4; return '你关了门，在屋里念了几日经。念到后来，声音自己就停了。城门外的哭声时有时无，你把它当成风。'; } }
        ]
      },
      {
        id: 'han_taixue', cond: { cai: 35 }, title: '太学', weight: 9, tags: ['朝堂风波'], minScene: 4, maxScene: 20,
        time: '两载', loc: '长安·太学',
        story: '太学立了五经博士，郡里可荐人去读。去了便有籍，衣食由官给。\n名额只有一个。郡府的人说：要么文章，要么家世，要么有人替你说话。',
        options: [
          { t: '应荐去太学', dim: 'shi', time: '两载', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.attrs.qian += 4; s.flags['太学'] = 1; return '你在太学读了两年。博士讲经，讲得极慢，一句能讲半月。同学里有公卿子弟，也有和你一样从郡里来的。你第一次知道，天下读书人原来这样多。'; } },
          { t: '让给别人，换一处田宅', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 16; s.attrs.ming -= 4; s.flags['让荐'] = 1; return '你把名额让给了郡里一个富家的子弟，换来城郊三间屋和几亩田。搬进去那日，你把书箱放在梁下，看了很久，没有打开。'; } },
          { t: '不去，自己在乡里读', dim: 'xiu', time: '两载', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 6; s.hidden.zhi -= 3; return '你没有去。乡里没有博士，你就自己读，读不懂便抄，抄不明白便去问游方的先生。两年下来，你的书比太学里许多人读得都熟，只是没有籍。'; } },
          { t: '让给更穷的同乡，替他求', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 10; s.hidden.yin += 12; s.hidden.zhi += 4; s.flags['让贤'] = 1; var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 15; return '你把名字划掉，写上阿禾。郡府的人问：你图什么。你说：他比我能读。阿禾走那日，把一件旧袍子留给你，说：等我回来。'; } }
        ]
      },
      {
        id: 'han_kuli', title: '缇骑', weight: 8, tags: ['朝堂风波', '灾祸'], minScene: 5,
        time: '数日', loc: '本郡·城门',
        story: '郡里换了太守，带来几个酷吏。缇骑夜里拿人，天亮就有人死在狱里。\n你要去邻县送一封信。出城要验传，验传的吏翻着你的袖子，说：这里头是什么。',
        options: [
          { t: '塞钱过去，求个方便', dim: 'li', time: '数日', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 2; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10; s.flags['买路'] = 1; return '钱递过去，他把你的袖子捏了一捏，便放了行。走出十里，你才敢把信摸出来看，信角已经被汗浸透了。'; } },
          { t: '如实拿出，说是家书', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 5; return '你把信摊开给他看。他识字不多，看了半晌，问：这是家书？你说：是。他把信还给你，说：你爹的字写得好。你说：他已经过世了。他愣了愣，摆手让你走。'; } },
          { t: '退回城里，改日再走', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 4; s.attrs.qian -= 2; return '你转身回了城。那封信在怀里放了半月，最后你自己送去，绕了很远的路。多走了十日，可你没有欠谁的。'; } },
          { t: '把信吞了，硬闯出去', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ti += 4; s.attrs.ming += 6; s.hidden.yun += 5; s.hidden.zhi += 6; s.flags['闯关'] = 1; return '你把信嚼了咽下去，往外走。吏伸手拦你，你撞开他就跑。跑出城门，后头有人喊，你没停。那封信的内容，你记了一辈子。'; } }
        ]
      },
      {
        id: 'han_buqu', title: '部曲', weight: 9, tags: ['日常', '朝堂风波'], minScene: 5,
        time: '一月', loc: '本郡·乡里',
        story: '乡里大姓养了部曲。白日里在田里，夜里在墙上，一个个披甲。\n管事来找你：替他家写一份保聚乡里的状子，往后你家有事，他的人来。\n话说得很客气，意思却硬。',
        options: [
          { t: '写，换一处庇护', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 4; s.hidden.yin -= 6; s.flags['依附豪强'] = 1; return '状子写得堂皇，说这家"纠合乡勇，以卫桑梓"。字是你写的，读到的人都会点头。此后你家门前的路，再没有人敢堵。'; } },
          { t: '不写，去郡里告他私募部曲', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.attrs.cai += 4; s.hidden.yin += 8; s.flags['告豪强'] = 1; s.flags['得罪张家'] = 1; return '郡里查了半年，只判了个"约束不严"。可那家的部曲散了一半。你家的门上，从此多了一道看不见的记号。'; } },
          { t: '不写也不说，收拾东西搬走', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.xin += 5; s.attrs.qian -= 8; return '你把能带的东西装了车，搬到邻县去。走那天没有人送。后来听说那家果然出了事，牵连了一乡的人。'; } },
          { t: '写，另抄一份部曲名册', dim: 'yi', time: '一月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 6; s.hidden.zhi += 8; s.hidden.yin += 2; s.flags['留名册'] = 1; return '状子照写，名册另抄一份，藏在你床下的砖缝里。你不知道这份东西日后有什么用，只知道手里有它，夜里睡得踏实些。'; } }
        ]
      },
      {
        id: 'han_xianliang', cond: { ming: 40 }, title: '对策', weight: 9, tags: ['朝堂风波'], minScene: 6,
        time: '两月', loc: '长安·公车署',
        story: '朝廷诏举贤良方正，能直言极谏者。郡里荐了你。\n对策问的是天为何降灾，民为何流亡，政为何失序。同去的人都在背旧策。\n你磨墨的时候，手心是湿的。',
        options: [
          { t: '照旧策写，稳妥', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 4; s.attrs.xin -= 2; s.flags['对策'] = 1; return '你把旧策改了改，四平八稳。取在中上，授了一个郎官。你在宫里走了几日，才知道金马门外的台阶有那么多级。'; } },
          { t: '写自己的话，不为尊者讳', dim: 'xiu', time: '两月', req: { cai: 50 }, fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.attrs.xin += 6; s.hidden.zhi += 6; s.flags['对策直言'] = 1; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10; return '你写了三件事，件件都指名道姓。卷子递上去，久久没有回音。半月后有人来传话：天子看了两遍。你不知这话是凶是吉。李慕之听说了，专程来道贺，说：这才是对策。'; } },
          { t: '先探主考的口风', dim: 'li', time: '一月', req: { qian: 10 }, fx: function (s) { s.attrs.qian -= 10; s.attrs.cai += 5; s.attrs.ming += 4; s.flags['探风'] = 1; return '你托人打听了主考的偏好，知道他不喜谈兵。对策里便多写农桑，少写边事。你取中了，可取中的是那一篇，不是你。'; } },
          { t: '在策里替流民说话', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 10; s.hidden.yin += 10; s.attrs.ti -= 3; s.flags['为流民上书'] = 1; return '你把关东流亡的数目、城门外死的人数，一字一字写在策里。写完那一段，你停了很久。卷子交上去，你便知道自己这一生不会太顺。'; } }
        ]
      },
      {
        id: 'han_daitian', title: '代田', weight: 8, tags: ['日常'], minScene: 3, maxScene: 24,
        time: '三年', loc: '本郡·田畴',
        story: '郡里来了个搜粟都尉，教人代田：一亩分三甽，年年轮换，地力不竭。\n老农们不信：祖祖辈辈这么种，凭什么你说换就换。\n都尉说：谁肯试一亩，官给种。',
        options: [
          { t: '拿自家的田试', dim: 'shi', time: '三年', fx: function (s) { s.attrs.ti += 6; s.attrs.cai += 4; s.attrs.qian += 10; s.flags['试代田'] = 1; return '头一年，你的田看着比别家难看，甽深沟窄。邻人过来看了两回，都摇头。第二年秋天，你的穗子比他们的长出一截。第三年，全村都来问你甽怎么开。'; } },
          { t: '替他跑腿，教别家去试', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.attrs.cai += 5; s.attrs.ming += 4; s.flags['劝农'] = 1; return '你领着都尉走了十几个村子，一家一家说。有人听，有人骂你替官府做说客。不论听不听，你都收一份脚钱。这钱挣得不体面，却实在。'; } },
          { t: '照旧种，祖法不可改', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.xin += 4; s.attrs.qian -= 2; return '你还是按祖法种。都尉来看过一回，什么也没说。你的田年年如此，不好，也不坏。'; } },
          { t: '官给的种分给佃户担着', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 10; s.attrs.qian -= 6; s.flags['分种'] = 1; return '都尉给的种，你分给了佃户，说：种坏了算我的。那年雨水不好，一半的种没出。你没有要他们赔，自己卖了半亩地补上。'; } }
        ]
      },
      {
        id: 'han_heqin', title: '和亲', weight: 8, tags: ['朝堂风波', '情缘'], minScene: 5,
        time: '两月', loc: '本郡·驿亭',
        story: '匈奴来求亲。朝中说，要选一位宗室女，远嫁漠北。\n宗室里有女儿的人家，这几日都在报病。郡里又传，说是要在良家女中选陪媵。\n门外来了个老妇，说她家的女儿被点了名。',
        options: [
          { t: '替她家去求，把名字换下来', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 12; s.hidden.zhi += 4; s.flags['换名'] = 1; var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 12; return '你跑了三处衙门，说了许多好话，还替那家出了钱。名字终于换了下来。那女儿后来嫁在邻县，生了两个孩子。九娘听说了，托人给你带了一句话：这种事，做一件少一件。'; } },
          { t: '收钱办事，替人换名', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 18; s.hidden.yin -= 10; s.flags['卖名'] = 1; return '你替三家办了事，收了三份钱。换上去的名字，是外乡买来的女子。她上车那日，你没有去看。'; } },
          { t: '上书说和亲非久计', dim: 'shi', time: '两月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 8; s.hidden.zhi += 5; s.flags['议和亲'] = 1; return '你写的是：以女子易太平，太平必不久。文书递上去，没有回音，也没有罪。可郡里的人从此说你不知分寸。'; } },
          { t: '不管，闭门不出', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 4; s.hidden.yin -= 4; return '你关了门。老妇在门外站了半日，走了。那年秋天，车队从郡里的官道上过去，车轮声很响，走了很久才听不见。'; } }
        ]
      },
      {
        id: 'han_zhuhou', cond: { ming: 35 }, title: '酎金', weight: 8, tags: ['朝堂风波', '灾祸'], minScene: 6,
        time: '两月', loc: '本郡·侯府',
        story: '朝廷要以酎金助祭，诸侯献金，成色不足者夺爵。\n一夜之间，郡里少了几家侯门。从前门前车马不绝的宅子，如今只剩一把锁。\n那家的少子来求你：替我写一封讼书。',
        options: [
          { t: '写，但要他家剩下的田', dim: 'li', time: '两月', fx: function (s) { s.attrs.qian += 20; s.hidden.yin -= 8; s.attrs.ming += 2; s.flags['乘人之危'] = 1; return '讼书写得极好，爵没有复，田却到了你名下。那少子签字画押时，手一直在抖。他抬头看你一眼，说：多谢。你听着这两个字，比骂你还难受。'; } },
          { t: '写，分文不取', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 12; s.hidden.zhi += 4; s.flags['代人讼'] = 1; var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 10; return '你替他写了三稿，改了七遍。爵终究没复，可官府许他留着祖宅。他后来去了长安，做了别人的门客。多年后你听说，他还在替人抄书。'; } },
          { t: '不写，去郡府问夺爵的章程', dim: 'shi', time: '两月', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.flags['问章程'] = 1; return '你翻了三日的旧档，把酎金的成色、称量的方法、往年的判例都记下来。你终于明白，这不是成色的事，是朝廷要收权。这个道理，你没有告诉那个少子。'; } },
          { t: '收留那少子住几日', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 6; s.hidden.yin += 8; s.attrs.qian -= 4; s.flags['收留'] = 1; return '他在你家住了十日，每天清早起来扫院子，不说一句话。第十一日他走了，把一块玉留在枕下。你把玉收进箱底，此后再没有见过他。'; } }
        ]
      },
      {
        id: 'han_bushi', title: '输财', weight: 8, tags: ['善缘', '边境战事'], minScene: 4,
        time: '半载', loc: '本郡·县门',
        story: '边事急，官府募民输财助边。输得多的拜爵，输得少的免役。\n乡里没人动。有个牧羊的老翁，把半群羊赶到了县门口，说：都拿去。\n县吏愣着，笔都忘了落。',
        options: [
          { t: '跟着输一点，换个免役', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian -= 14; s.attrs.ming += 4; s.flags['输财免役'] = 1; return '你输了两车粮，换了一纸免役的文书。文书压在箱底，往后再有人来点丁，你把它拿出来，对方看一眼就走。'; } },
          { t: '把家里的粮全输出去', dim: 'yi', time: '半载', fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 10; s.hidden.yin += 14; s.flags['倾家输边'] = 1; return '你把仓里的粮都装上车，跟着老翁一起送到县门。县吏这回记得落笔了。那年冬天你家喝粥，可乡里人见了你，都站起来。'; } },
          { t: '上书说输财不如轻徭', dim: 'shi', time: '两月', req: { cai: 38 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; s.hidden.zhi += 4; s.flags['议轻徭'] = 1; return '你写的是：民有钱输财，不如有力耕田。文书递到郡里，被批了四个字：迂阔难行。可那份底稿，你留了一辈子。'; } },
          { t: '什么也不做', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 2; s.hidden.yin -= 2; return '你站在人堆外头看了一会儿，回家去了。老翁的羊在县门前叫了一夜，第二日就不见了。'; } }
        ]
      },
      {
        id: 'han_shiji', title: '市籍', weight: 9, tags: ['日常', '朝堂风波'], minScene: 3,
        time: '两月', loc: '本郡·市署',
        story: '商人另立市籍，不得衣丝乘车，子孙不得为吏。\n你家祖上做过买卖，市籍上还留着名字。郡里今年要清籍。\n一个老吏说：清不清，看你怎么说。',
        options: [
          { t: '出钱把名字从籍上抹掉', dim: 'li', time: '一月', req: { qian: 20 }, fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 6; s.hidden.yin -= 4; s.flags['除市籍'] = 1; return '钱递上去，老吏用笔在你家那一行上点了一点，说：从此清白。你走出市署，忽然想不起自己祖上到底卖过什么。'; } },
          { t: '认了，照实登记', dim: 'shi', time: '两月', fx: function (s) { s.attrs.ming -= 4; s.attrs.xin += 6; s.hidden.yin += 6; s.flags['市籍在身'] = 1; return '你报了自己的名，也报了祖上的行当。老吏抬头看了你一眼，说：倒有几分胆气。此后你不能乘车，不能穿丝，可走在市里，没人心虚。'; } },
          { t: '不入城，搬去乡下', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.qian -= 8; s.attrs.xin += 6; s.attrs.ti += 3; s.flags['迁乡'] = 1; return '你把铺子盘出去，搬到城外三十里的村子。种地不比做买卖来钱，可籍册上再没有人来问你祖上做过什么。'; } },
          { t: '联络几家商贾，一起去求', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 6; s.hidden.zhi += 5; s.flags['联名求籍'] = 1; return '你约了十几家，凑了一份联名的呈子。郡里不肯改籍，却许了"子孙可应举"一条。这一条，是你们十几个人用两月的功夫换来的。'; } }
        ]
      }
    ],
    main: [
      {
        id: 'han_m1', title: '少年行', after: 0, time: '数日', loc: '本郡·乡里',
        story: '你十四岁那年，乡里来了一位游学的先生，在社树下讲了三日的《诗经》。\n讲到"王于兴师，修我戈矛"时，他停了下来，看着你们这些孩子，说：这一句，你们现在还听不懂。\n讲完他便走了，走前留下一句话：这世道要变了。',
        options: [
          { t: '追上去问他，要变到哪一步', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.zhi += 4; s.flags['问先生'] = 1; return '他回头看你，笑了：你这孩子，眼里有火。他给你讲了一路，讲边关、讲朝堂、讲豪强。走到岔路，他说：记住，读书不是为了做官。他往西去了。'; } },
          { t: '把他的讲义默下来，自己读', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 7; s.attrs.xin += 3; s.flags['默讲义'] = 1; return '你把讲义默了三遍，一字不差。有些地方不懂，便记在旁边，等日后有人能问。'; } },
          { t: '拉住同乡的几个孩子，把话讲给他们听', dim: 'shi', time: '数日', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 3; s.flags['聚童'] = 1; return '你在社树下讲了两日，讲的都是先生的原话，只添了自己的几句。孩子们听得入神。有老人路过，说：这孩子，将来是个能说话的。'; } },
          { t: '不听了，回去干活', dim: 'li', time: '数日', fx: function (s) { s.attrs.ti += 4; s.attrs.qian += 4; return '你回去把院里的柴劈了。劈到黄昏，母亲喊你吃饭。先生的话你只记住一句，还是没懂的那一句。'; } }
        ]
      },
      {
        id: 'han_m2', title: '关山', after: 4, time: '一年', loc: '朔方·边塞',
        story: '你二十岁那年，朝廷征兵。或是自己去，或是替父去，或是出钱免了。\n母亲把家里最后一点钱缝进你的衣角。父亲站在门口，说了一句：我年轻时也去过。他没说下去。',
        options: [
          { t: '应征，去边关挣一个出身', dim: 'shi', time: '两载', fx: function (s) { s.attrs.ti += 8; s.attrs.ming += 8; s.flags['戍边'] = 1; s.flags['边军'] = 1; return '你到了朔方。风沙大得睁不开眼，第一夜你睡在土垒上，听见远处有狼嚎。你握了握那把发下来的刀，觉得它不是刀的重量。'; } },
          { t: '留下，替乡里守着一摊事', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 4; s.flags['留乡'] = 1; return '你没走。郡里正缺人管粮，你接了下来。一年下来，账目清得让老吏都多看两眼。'; } },
          { t: '托人说情，留在郡府做个书佐', dim: 'shi', time: '一季', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 6; s.flags['郡府书佐'] = 1; return '你在郡府抄了半年文书。抄得多了，你开始明白，公文里哪一句是真的，哪一句是给人看的。'; } },
          { t: '往西走，去边地的市集碰运气', dim: 'yi', time: '一年', fx: function (s) { s.attrs.qian += 16; s.attrs.ti -= 4; s.hidden.yun += 5; s.flags['走西口'] = 1; return '你在边市上混了一年，学会了胡语，也学会了怎么在刀口上数钱。回来时你带了一匹好马，比钱更值。'; } }
        ]
      },
      {
        id: 'han_m3', title: '巫蛊', after: 9, time: '两月', loc: '长安·诏狱外',
        story: '朝中出了大案。有人说宫里有人用木偶咒人，牵连了几百人。\n你认识的一个旧友被押进了诏狱。他的家人跪在你门前，说：你认得那么多字，能不能替他写一份申辩。\n这案子，写的字越多，越容易把自己写进去。',
        options: [
          { t: '写，替他把能说的都说了', dim: 'yi', time: '两月', fx: function (s) { s.attrs.ming += 10; s.attrs.cai += 5; s.hidden.yin += 14; s.hidden.zhi += 8; s.flags['为友申辩'] = 1; s.npcs.you = { name: '旧友', rel: 50, alive: true }; return '申辩递上去，没有回音。三月后他被放了出来，瘦得脱形。他来谢你时，一句话没说，先跪了下去。'; } },
          { t: '写，但只写无关痛痒的话，保自己', dim: 'li', time: '两月', fx: function (s) { s.attrs.ming -= 4; s.hidden.yin -= 6; s.attrs.cai += 3; s.flags['申辩敷衍'] = 1; return '你写了一份很稳妥的申辩，稳妥到几乎没有用处。他被判了三年。你在城门口送他，他看了你一眼，什么也没说。'; } },
          { t: '不写，躲起来等风头过去', dim: 'xiu', time: '两月', fx: function (s) { s.attrs.xin -= 2; s.hidden.yin -= 4; s.hidden.yun += 3; return '你关了门，两个月没出门。风头过去了。他死在狱里，你听说后，在灯下坐了一夜。'; } },
          { t: '借这案子，把仇家一并拖进去', dim: 'yi', time: '两月', req: { cai: 45 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yin -= 12; s.hidden.zhi += 10; s.flags['借巫蛊除敌'] = 1; return '你把一个名字加进了供词。那人三日后就下了狱。你去看过他一眼，隔着栅栏。他认出了你，张了张嘴，没说出话。'; } }
        ]
      },
      {
        id: 'han_m4', title: '封侯', after: 14, time: '两载', loc: '长安·未央宫外',
        story: '你有了一次面圣的机会。\n朝中正在议一件事：是否要在边地再开一处屯田。有人主战，有人主守。你若说话，便要站到一边去。',
        options: [
          { t: '陈屯田之利，主战', dim: 'shi', time: '两载', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 12; s.attrs.qian += 8; s.flags['主战'] = 1; s.flags['面圣'] = 1; return '你说得很实。皇帝听完，问：你敢去么？你说敢。回来时你已经是校尉了。有人恭喜你，也有人在暗处记下了你的名字。'; } },
          { t: '陈守边之要，主守', dim: 'shi', time: '两载', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.attrs.xin += 5; s.flags['主守'] = 1; s.flags['面圣'] = 1; return '你说了半个时辰的守边之策，说的是粮、是民、是人。皇帝听完沉默了很久，说：你比他们都明白。你退下时，主战的一派看你的眼神很冷。'; } },
          { t: '不站边，只说"臣请再议"', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 2; return '你说完这四个字，殿上静了一瞬。皇帝笑了笑，说：你倒谨慎。你退下，没有得赏，也没有得罪人。'; } },
          { t: '把屯田的差事揽到自己身上，去边地', dim: 'yi', time: '三年', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 10; s.attrs.qian += 12; s.hidden.yin += 8; s.flags['督屯田'] = 1; return '你去了。三年里你带人开渠、垦荒、筑堡。回来时鬓角已白，可边地多了一万多亩田。'; } }
        ]
      },
      {
        id: 'han_m5', title: '晚岁', after: 19, time: '一年', loc: '本郡·旧宅',
        story: '你老了，回到故乡。\n院子还是那个院子，树长高了，井沿磨得更深。走的时候是少年，回来时村里已没有几个人认得你。\n有个孩子从门前跑过，回头看你，喊了一声：爷爷，你是从哪儿来的？',
        options: [
          { t: '告诉他自己是谁，讲从前的事', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.ming += 8; s.attrs.xin += 8; s.hidden.yin += 6; s.flags['还乡讲旧'] = 1; return '你讲了半日，讲到后来孩子跑了。你不恼，坐在门槛上，看着天色一点一点暗下去。'; } },
          { t: '什么也不说，只说是路过的人', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.zhi -= 6; return '你说：过路的。孩子点点头，跑了。你在门槛上坐着，忽然觉得这四个字也很好。'; } },
          { t: '去社祠看看，添一炷香', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.yun += 6; s.hidden.zhi -= 4; return '社祠还在，老巫的孙子已经做了新巫。他看见你，愣了一下，说：你回来了。他替你添了一炷香，什么也没问。'; } },
          { t: '把家产分给乡里，重修水渠', dim: 'li', time: '一年', req: { qian: 30 }, fx: function (s) { s.attrs.qian -= 30; s.attrs.ming += 12; s.hidden.yin += 16; s.flags['修渠还乡'] = 1; return '渠修了一年。通水那日，乡里人挤在渠边看。有人问这是谁出的钱，老人说：从前这村里出去的一个。'; } }
        ]
      }
    ],
    endings: [
      {
        name: '封侯拜将', group: '汉显', pri: 67,
        score: function (s) { var v=(s.attrs.ming-70)*1.1+(s.attrs.ti-50)*0.6+(s.flags['主战']?8:0)+(s.dimCount.shi||0)*1.2;return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ ming: 70 }, { flag: '面圣' }, { flag: '主战' }] },
        verdict: '他以一身换一城，以一代人换一代人的安稳。',
        epilogue: '你封了侯。府邸在长安城东，门前有石狮，出入有车马。\n朝堂上你说话，很多人要听。你也说过一些违心的话，做过一些不得已的事。\n老了之后你常梦见边关的风沙。你梦见那些没能回来的人，他们都还年轻。\n你死时，皇帝下诏褒恤。史书上你占了一行半。'
      },
      {
        name: '边塞孤魂', group: '汉烈', pri: 81,
        score: function (s) { var v=(45-s.attrs.ti)*0.9+(s.flags['戍边']?10:0)+(40-s.attrs.ming)*0.3;return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ flag: '戍边' }, { ti: [0, 45] }] },
        verdict: '他死在离家很远的地方，风把他的名字吹散了。',
        epilogue: '你死在朔方。那年冬天特别冷，雪下了半月。\n同伍的人把你的东西分了，把你就地埋了。坟前插了一块木牌，写着你的名字，一场风沙过后，字就没了。\n家里得到消息时，已经是一年后。母亲哭瞎了一只眼。\n祁连山下的草，年年都长得很好。'
      },
      {
        name: '乡里善人', group: '汉隐', pri: 47,
        score: function (s) { var v=(s.hidden.yin-68)*1.5+(s.attrs.ming-40)*0.4+(s.attrs.qian<60?6:0);return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ hidden: { yin: 60 } }, { age: [45, 99] }] },
        verdict: '他没做过什么大事，可这一乡的人，都记得他的好。',
        epilogue: '你这一生，没有做大官，没有发大财。\n但你修过渠，救过饥，替人写过状子，送过几副棺材。乡里人叫你"善人"，叫得很自然。\n你死那日，来送的人排了半条街。有人从外乡赶回来，只为了在你灵前磕一个头。\n族谱上你的名字下面，写了四个字：乡里称善。'
      },
      {
        name: '巫蛊遗祸', group: '汉悲', pri: 70,
        score: function (s) { var v=(45-s.attrs.ming)*0.9+(s.flags['借巫蛊除敌']?8:0)+(s.hidden.yin<30?8:0);return Math.max(0,Math.min(100,v)); },
        cond: { all: [{ flag: '借巫蛊除敌' }] },
        verdict: '他用别人的血洗了自己的路，最后那血也漫到了他脚下。',
        epilogue: '那年的事，后来被人翻了出来。\n有人递了状子，说你当年构陷无辜。案子查了两年，你已经老了，走不动了。\n定罪的文书送到时，你正在院里晒太阳。你看完，笑了一声，说：该。\n你的家产被抄没，子孙流放。你死在流放的路上，埋在一处不知名的坡上。'
      }
    ]
  };

  /* ================= 12 · 悬案事件（汉） ================= */
  D.dynasties.han.events.push(
    {
      id: 'han_xin_1', title: '急信', tags: ['日常', '灾祸'], weight: 12,
      raiseOffer: {
        ttl: 2, short: '母亲病重，家中等你回去',
        expire: function (s) {
          s.flags['未归'] = 1;
          s.attrs.xin -= 8; s.attrs.ming -= 4; s.hidden.yin -= 10;
          return '你终究没能回去。信使再来时，只说你母亲已下了葬，没有等你。';
        }
      },
      story: '军中驿马送来一封信，路上走了十一天。\n信是族弟写的，字迹潦草：母亲入冬后咳血，郎中来过两回，人清醒的时候少。信末问：兄可能归？\n你捏着信纸站了半晌。营门外风大，吹得纸响。这里的差事正到关口，军令不许告假——可母亲那边，等不了军令。',
      options: [
        {
          t: '具状请令，连夜归乡', dim: 'shi', time: '一月',
          fx: function (s) { s.attrs.ming -= 6; s.attrs.xin += 8; s.hidden.yin += 8; s.flags['归乡侍疾'] = 1; return '你把军法担了下来。主将看完你的状子，沉默片刻，批了旬日假，罚半月俸。你到家时母亲还认得你，拉着你的手说了三夜的话。第十七日，她走了。你赶上了。'; }
        },
        {
          t: '托同乡捎药带信，人留在营中', dim: 'li', time: '旬日',
          fx: function (s) { s.attrs.qian -= 8; s.attrs.xin -= 5; s.hidden.yin -= 4; s.flags['隔岸侍疾'] = 1; return '你买了最好的药，写了三页纸的信，托了三个顺路的人。信到了，药到了，人没到。母亲托人回的话是：军中要紧，勿念。你把那句话读了几十遍。'; }
        },
        {
          t: '请同袍代往探视，留营当值', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.qian -= 4; s.attrs.xin -= 2; s.hidden.yin += 2; return '你请了同乡的什长绕路探望，捎回来一句「还撑得住」。你把心放回肚子里一半，另一半悬着。当夜巡营，你走得很慢。'; }
        },
        {
          t: '信压进袖中，只当没有收到', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin -= 10; s.hidden.zhi += 8; s.flags['知道而不归'] = 1; return '你把信折了四折，压进了袖子里。当夜照常巡营，口令喊得比哪天都响亮。军中的人看不出来——他们只看得见你的背影，看不见你袖子里那三页纸。'; }
        }
      ]
    },
    {
      id: 'han_yan_1', title: '贵宴', tags: ['朝堂风波'], weight: 11,
      raiseOffer: {
        ttl: 2, short: '豪强下帖，两日内赴宴',
        expire: function (s) {
          s.flags['拂了豪强'] = 1;
          s.attrs.ming -= 6; s.attrs.qian -= 3;
          return '帖子的回音来得很慢，只有四个字：知道了。此后乡里传你的闲话时，多了一个会说风凉话的人。';
        }
      },
      story: '县里豪强的管家登门，留下一个红帖：三日后来府赴宴，「聊叙乡谊」。\n你认得这个「聊叙」。去年他不肯借渠水给西头的几家，今年秋收前忽然广发请帖——赴宴的都记了他的好，不赴的，往后总有一样两样事不凑手。',
      options: [
        {
          t: '如约赴宴，礼数周全', dim: 'li', time: '数日', req: { qian: 8 },
          fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 4; s.hidden.yin -= 2; s.flags['入豪强席'] = 1; return '席间他敬了你三杯，说了两句提携的话。你一一应了。出门时你回头看了一眼那扇门——从今往后，你是这条街上「进过那扇门」的人。'; }
        },
        {
          t: '赴宴，席间替西头几家讨水', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.ming += 6; s.attrs.xin -= 4; s.hidden.yin += 5; s.flags['宴上讨水'] = 1; var ok = Math.random() < 0.5; if (!ok) { s.attrs.ming -= 4; return '你把水的事当席提了。满桌的筷子都停了一停。他笑着打了圆场，渠水开了两日便又关了。你得罪了人，事没办成，可西头几家都听说了那半盏茶的工夫。'; } return '你把水的事当席提了，话说得不软不硬。他沉了片刻，笑着应了。开渠那日西头几家放鞭炮，鞭炮声里的好话，一半是给你的。'; }
        },
        {
          t: '托病不赴，回一份空帖', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin += 3; s.attrs.ming -= 2; s.flags['托病辞宴'] = 1; return '你回帖上写了「偶感风寒」。真病假病不要紧，要紧的是他记性很好。往后半年里，你办事总有一两样「恰巧」的不凑手。'; }
        },
        {
          t: '不去，也不回帖', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.ming -= 4; s.attrs.xin += 2; return '帖子在你案头躺了三日，被风吹落过两次。你没理它。豪强的脸面落了地，摔碎的声音很轻，可整条街都听见了。'; }
        }
      ]
    }
  );
})(window.GAME_DATA);