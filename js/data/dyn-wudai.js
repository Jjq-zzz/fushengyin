/* 「五代」朝代内容包：兵强马壮者为天子 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.wudai = {
    id: 'wudai', name: '五代', clock: { year: 1, season: 1 }, eras: [],
    events: [
      { id: 'wd_zhuzhu', title: '择主', tags: ['朝堂风波'], weight: 12,
        story: '朝代十年一换，节度使年年易主。\n乡里传一句话：兵强马壮者为天子。你这样的读书人，择主的标准只剩一条——谁活得久。',
        options: [
          { t: '投最强的藩镇', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.attrs.qian += 4; s.flags['投强藩'] = 1; return '你投了最强的藩。强藩强在兵，兵在你就强——三年后藩乱，你的官印烫手，你把它泡在了酒里。'; } },
          { t: '守乡为里正，不仕', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 6; G.addFame(s, 'xiang', 5); return '你不仕。十年里天子换了五个，你的里正之职没换——乡人说：朝廷是客，你是主。'; } },
          { t: '做各镇通用的书吏', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 5; s.flags['通用吏'] = 1; return '你的文书各镇通吃——换朝不换吏，是这时代的默契。你把默契做成了手艺。'; } },
          { t: '从商贾，走南北', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 4; s.flags['行商'] = 1; return '你弃文从商。关卡年年变，商路年年通——路是人踩出来的，踩的人不怕换旗。'; } }
        ] },
      { id: 'wd_bingbian', title: '兵变', tags: ['朝堂风波', '灾祸'], weight: 10,
        story: '你所在的镇兵哗变了。\n乱兵入城那夜，先抢府库，再抢民居。你的家在第二样的路线上——留，是赌兵的纪律；走，是赌夜的黑。',
        options: [
          { t: '闭户燃烛，开门迎之', dim: 'shi', time: '数日', fx: function (s) { s.attrs.qian -= 4; s.attrs.xin += 5; if (Math.random() < 0.6) return '你点灯开门，摆了酒在堂前。乱兵的头愣了愣，喝了一碗走了——礼在乱世的用处，比刀多一次。'; s.attrs.qian -= 8; return '酒被喝了，家也被搬了。乱兵讲理只讲三成——你家的三成家底，交了这堂课的学费。'; } },
          { t: '举家越墙避入佛寺', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 6; s.flags['避兵'] = 1; return '你带全家躲进了城外的寺。乱兵不抢佛门——不是敬佛，是抢完了没处销赃。你听了一夜的喊声，天亮后皈依了一半。'; } },
          { t: '趁乱投乱兵', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; s.flags['从乱'] = 1; return '你投了乱兵，做了书记。乱兵半月后受抚编入官军——你的书记照做，印换了三次，字没换过。'; } },
          { t: '报信官军，引兵平乱', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 6; s.hidden.yin -= 6; s.flags['引官军'] = 1; if (Math.random() < 0.5) { s.attrs.qian += 5; return '你出城报信，官军三日后至，乱平。你得了赏——本镇的乡人看你的眼神，从此分成了两种。'; } return '你的信没送出去，路上就被乱兵的哨拿了。你被押回城里示众——示众三天，命留下了，脸没了。'; } }
        ] },
      { id: 'wd_wuren', title: '武人之威', tags: ['日常', '灾祸'], weight: 9,
        story: '武人当道，文官如仆。\n新来的节度使在你乡纵兵掠麦，乡人敢怒不敢言。里正想派个「会说话的」去讨个说法——这个差，是福是祸。',
        options: [
          { t: '自请去说', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.ming += 7; s.attrs.xin -= 4; s.flags['单骑说帅'] = 1; if (Math.random() < 0.5) { s.attrs.qian += 3; return '你只身入营，引了两句史书又摆了两句利害。帅笑了，令兵还麦三成——三成麦，你用一张脸换的。'; } s.attrs.ti -= 5; return '帅没笑。你被打了两棍赶出来——棍棒之下你明白了一个道理：这年头，说理要先有兵。'; } },
          { t: '敛乡钱行贿', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 5; return '乡人凑钱送了营。麦没还，来年没再掠——贿买的太平是租来的，租期看兵的心情。'; } },
          { t: '带乡人抢种抢收', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ti -= 3; G.addFame(s, 'xiang', 5); s.attrs.qian -= 2; return '你组织乡人连夜把麦抢收进坞。兵来时场里空空——空场救了麦，也救了明年。'; } },
          { t: '忍了，劝乡人认命', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin -= 3; s.hidden.zhi += 4; return '你劝大家忍。麦没了，人还在——这句话你说得艰难，听着的人更艰难。'; } }
        ] },
      { id: 'wd_qiandan', title: '契丹南下', tags: ['边境战事', '灾祸'], weight: 9, minScene: 9,
        story: '契丹铁骑南下，州县望风。\n风声说要掠人为奴。你乡在官道边——官道，就是他们的路。',
        options: [
          { t: '举乡入山结砦', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti -= 3; s.attrs.xin += 7; s.flags['结砦'] = 1; return '你领全乡入山结砦，断路、设哨、藏粮。骑军过境三次，砦没破。下山那天，乡人在山口给你立了个木牌。'; } },
          { t: '以粮买路', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 8; s.hidden.yin -= 5; return '你备了粮车候在道旁。骑军收了粮，真没进村——买卖做得干脆，你却记住了那个感觉：像牲口买下了自己的命。'; } },
          { t: '随军南逃', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ti -= 5; s.hidden.yun += 5; s.flags['南逃'] = 1; return '你携家南逃四百里。路上你把祖传的一刀卖了换粮——刀换了主，命留给了主。'; } },
          { t: '投骑军为向导', dim: 'yi', time: '半月', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 12; s.flags['为向导'] = 1; return '你给骑军做了半月向导，得了赏。骑军退走后你的乡人回来了——没人问你去过哪里，问的人不敢听。'; } }
        ] },
      { id: 'wd_kaoke', title: '乱世一榜', tags: ['日常'], weight: 8,
        story: '某帝附庸风雅，开科取士。\n天下读书人像久旱逢雨——雨小，人很多。你有一肚子的学问，和一辆快不过战马的书车。',
        options: [
          { t: '赴考', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.flags['五代进士'] = 1; if (Math.random() < 0.35 + s.attrs.cai / 300) { s.attrs.ming += 5; return '你中了。榜发那日城里戒严——怕人抢，也怕人笑。你把榜文抄了一份寄回乡：乡里没人笑。'; } return '落第。你在榜下听说这科取的全部是行贿的——你把盘缠买了书，书比榜耐放。'; } },
          { t: '改考明算，进财赋司', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 5; s.flags['明算吏'] = 1; return '你考了明算，管了一州的粮册。乱世里粮册比诗金贵——你的算盘打出的官阶，比诗文的稳。'; } },
          { t: '做行卷生意', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 4; s.flags['卖文'] = 1; return '你替不识字的武夫代笔行卷，一篇十缗。武夫们得了官，你得了钱——文与权，各取所需。'; } },
          { t: '在军中教书的间隙读书', dim: 'xiu', time: '一年', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 5; return '你做了军中的教书先生。兵们学不成什么，你教得很认真——乱世里认真教书的人，都是在给下一个太平时代存种。'; } }
        ] },
      { id: 'wd_guanchang', title: '牙兵', tags: ['日常', '灾祸'], weight: 9, minScene: 8,
        story: '节度使的牙兵骄横，县官见了都要让路。\n牙兵在你的市上强买强卖，市人凑钱请你「想办法」——他们知道你认识府里的人。',
        options: [
          { t: '上下打点，请府里约束', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 5; s.attrs.ming += 3; if (Math.random() < 0.6) return '府里的判官收了礼，出了告示约束牙兵。市面安静了半年——告示的纸会旧，你的礼数不能旧。'; s.attrs.ming -= 4; return '礼收了，告示没出。你成了市人眼里的骗子——你的名声替牙兵的横行垫了背。'; } },
          { t: '领市人结社自保', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 8; G.addFame(s, 'xiang', 7); s.attrs.qian -= 2; return '你结了市社，立了「牙兵入市，闭户收摊」的规矩。牙兵抢不到东西，慢慢不来了——组织的力量，比告示长久。'; } },
          { t: '引牙兵头目入商股', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 7; s.flags['与牙分股'] = 1; return '你让牙兵头目入了商股。市面从此「太平」——太平得像交了保护费。你知道这不是办法，是止疼药。'; } },
          { t: '上告节度使', dim: 'shi', time: '半月', fx: function (s) { s.attrs.ming += 5; s.attrs.xin += 6; s.hidden.yun -= 5; s.flags['告牙兵'] = 1; if (Math.random() < 0.3) { s.attrs.ming += 5; return '节度使竟真办了牙兵头目——他正愁没由头削牙兵。你成了这盘棋里一颗不知道自己是棋的棋。'; } return '状子递进去，你被牙兵堵在巷里打了一顿。打你的人说：上头就是我们的头。你这才懂这世道的结构图。'; } }
        ] },
      { id: 'wd_hutong', title: '通商', tags: ['日常'], weight: 8,
        story: '五代商路乱而活：各镇抽各自的税，商旅练出了一身「认旗」的本事。\n你乡在两镇交界——交界的市，税收得最狠，生意做得最活。',
        options: [
          { t: '做交界行商', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.attrs.cai += 3; s.flags['界市商'] = 1; return '你在两镇的税卡之间跑货，练出了三套话术。三年后你在两市各开了铺——铺名一个，字号各按各镇的忌讳。'; } },
          { t: '走私盐铁', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 9; s.flags['私盐'] = 1; if (Math.random() < 0.7) return '你走私了两年盐铁，赚出了三进的宅。巡查的兵头换了五个，你的路子换了五条——路比人活。'; s.attrs.ming -= 10; s.flags['私盐案'] = 1; return '第六个兵头不收钱。案子发了，你的宅充了公——充公那天你才发现，宅是你替兵头攒的。'; } },
          { t: '替各镇抄粮册', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 4; return '你被三镇聘去抄粮册——乱世的账乱，会理账的人抢手。你把三镇的虚实都摸在了心里，一个字都没说。'; } },
          { t: '劝乡人改织，免遭税卡', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 4; G.addFame(s, 'xiang', 4); return '你劝乡人改织绢——绢轻，好藏，税轻。乡里的织机多了十台，过卡的担子轻了十倍。'; } }
        ] },
      { id: 'wd_chaodai', title: '又一朝', tags: ['朝堂风波'], weight: 9, minScene: 10,
        story: '汴州又换了旗，国号改了，年号改了。\n官府来收缴前朝的告身（委任状）——烧了旧告身，领新告身；不烧，就是「仕旧朝」的嫌疑。你家的旧告身，是你父亲一生的印痕。',
        options: [
          { t: '烧旧领新', dim: 'li', time: '数日', fx: function (s) { s.attrs.ming += 3; s.attrs.qian -= 2; s.hidden.yin -= 3; return '你把旧告身烧了，领了新的。父亲的名字在火里烧了三秒——三秒，够一个王朝换一个说法。'; } },
          { t: '藏旧领新', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.yin -= 3; s.flags['藏告身'] = 1; return '你交了副本，真本藏进了祖龛。你家的墙上从此挂着新朝的告身，龛里睡着前朝的——你家做官的路，两头都铺着。'; } },
          { t: '拒缴，归乡不仕', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 4; s.flags['不仕'] = 1; return '你把告身供在正堂，回乡种地。官府来问过两次，你都说了同一句：臣已老。其实你不老，你只是看够了。'; } },
          { t: '替人代缴，做成一门生意', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; s.flags['代缴'] = 1; return '你替一百多家跑腿缴换，每家收一脚钱。旗换得越勤，你的生意越稳——你成了这乱世的「跑腿的配件」。'; } }
        ] }
    ],
    main: [
      { id: 'wd_m1', title: '弱冠之年', after: 0, time: '数日',
        story: '你二十岁那年，城头第三次换旗。\n父亲把你叫到榻前说：我们家三代不做武人，三代都活得短。你去学文吧——文慢，慢的东西死得慢。\n他没说完的半句，你说给他听了：也死得疼。',
        options: [
          { t: '从文，习刀笔', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.flags['文途'] = 1; return '你入了州学，学刀笔。先生的第一句话是：先学会把字写小——写小了，才写得长。'; } },
          { t: '反父意，从军', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 5; s.hidden.zhi += 5; s.flags['军籍'] = 1; return '你投了军。父亲没骂你，只把家里那口剑给了你：剑随你，你随你的命。'; } },
          { t: '从商，走中间那条路', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.flags['商途'] = 1; return '你选了商。父亲点头：文武都短，买卖最长——只要你别把货押在旗上。'; } },
          { t: '远走吴越，避开这个战场', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 6; s.flags['走吴越'] = 1; return '你去了南边的吴越国。那边的君主保境安民，你写信回家说：这里的旗三年没换过——父亲回信只有一个字：住。'; } }
        ] },
      { id: 'wd_m2', title: '长兴之问', after: 12, time: '一季',
        story: '中原的明君在位，休兵劝农，天下难得地缓了一口气。\n有人劝你趁太平入仕，有人说太平短，别押。你坐在自家新翻的田边，看着远处的官道——官道上，送诏书的马跑得比往年勤。',
        options: [
          { t: '入仕，趁明主治世建功', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 5; s.flags['明主治世'] = 1; return '你入了仕，办了三件实事。明君崩的那年你在外地——你带着印回乡，把印挂在祠堂：这三年，对得起人。'; } },
          { t: '守乡积谷，备着下一乱', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.xin += 7; s.attrs.qian += 4; G.addFame(s, 'xiang', 6); return '你没出仕。你修了坞、存了三年粮。两年后乱起，你乡是方圆百里唯一没饿死人的地方。'; } },
          { t: '扩商路，把太平变成本钱', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 3; s.flags['太平商'] = 1; return '你趁太平扩了三条商路。乱来的时候，商路是第一批死的——但你的三处货栈，变成三处避难所。'; } },
          { t: '著《五代记》，记这五十年', dim: 'yi', time: '一年', fx: function (s) { s.attrs.cai += 9; s.hidden.zhi += 6; s.flags['五代记'] = 1; return '你用一年写了五十年——五个朝代、十几个天子、数不清的兵变。写完你看了一遍，只添了扉页一句：兵强马壮者为天子，然天子亦死。'; } }
        ] }
    ],
    endings: [
      { name: '五朝元老', group: '代显', pri: 70,
        score: function (s) { var v = (s.flags['通用吏'] || s.flags['五代记'] ? 16 : 0) + (s.attrs.cai - 55) * 0.7 + (s.attrs.xin - 55) * 0.5; return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '天子换了五个，他的字没换过。',
        epilogue: '你侍奉过五个朝代，同僚都换了几轮，你还在。\n新朝的史官来向你请教前朝旧事，你说的比不说的多——说的都是制度，不说的都是人。\n你死后，五朝的实录里都有你，每一处都只有半行。半行，就是你的全部——你已经很满足了。' },
      { name: '坞中遗民', group: '代中', pri: 50,
        score: function (s) { var v = (s.flags['结砦'] || s.flags['避兵'] ? 16 : 0) + (s.attrs.xin - 50) * 0.5 + (100 - s.attrs.ming) * 0.25; return Math.max(0, Math.min(100, v)); },
        verdict: '天子如走马，他的坞门没开过第二次。',
        epilogue: '你守的乡坞送走了五个王朝的溃兵，迎来过三次天子诏书。\n诏书让你出仕，你回的答状永远是四个字：乡务殷繁。\n你死时天下将定。乡人把你的坞门拆下来做了你的棺材板——门护过一乡，现在护你。' }
    ]
  };
})(window.GAME_DATA);
