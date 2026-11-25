/* 「秦」朝代内容包：法令如霜，徭役如山 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.qin = {
    id: 'qin', name: '秦',
    clock: { year: 1, season: 1 }, eras: [],
    events: [
      { id: 'qin_jungong', title: '军功', tags: ['边境战事'], weight: 11,
        story: '军法森严：斩一首，进一爵。\n战场上尸体堆到脚边时，有人抢着割首级，有人只顾活着。爵位在前，刀剑在侧。',
        options: [
          { t: '搏杀取首，进爵', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 5; if (Math.random() < 0.5) { s.attrs.ming += 8; s.attrs.qian += 5; s.flags['军功爵'] = 1; return '你带回了两颗首级，进了爵。军法官核验时，你盯着那两颗头看了很久——从那天起你睡觉不关灯。'; } s.attrs.ti -= 8; return '你空手而回。军法不问死活，只问首级——你没带回来，就没说话的资格。'; } },
          { t: '随什长稳进，不贪功', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 4; s.attrs.xin += 6; return '你跟住了队伍，没抢一颗首级，也没丢一条命。什长说：这样的人，能带到老。'; } },
          { t: '以工代战，修驰道', dim: 'li', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.qian += 5; return '你被抽去修驰道。锤石三个月，手上的茧比首级实在。'; } },
          { t: '购死囚之首充军功', dim: 'yi', time: '半月', fx: function (s) { s.attrs.qian -= 8; s.hidden.yin -= 8; if (Math.random() < 0.6) { s.attrs.ming += 5; return '首级验过了，爵进了。卖首级的人后来也进了爵——你们谁都没提这事，一辈子。'; } s.flags['冒功'] = 1; s.attrs.ming -= 12; return '验首时看出破绽。冒功是族诛的罪——你被革了役，全家迁去边地。'; } }
        ] },
      { id: 'qin_yaoyi', title: '徭役', tags: ['日常', '灾祸'], weight: 11,
        story: '征发令下：本里出丁赴役，工期半年。\n服役的人，十个里回来的有八个。剩下两个，留在工地上了。',
        options: [
          { t: '应役赴工', dim: 'shi', time: '半载', fx: function (s) { s.attrs.ti -= 7; s.attrs.qian += 3; s.flags['服役'] = 1; return '你服完了半年役。监工的鞭子你挨过三回，工期没误。回家那日，母亲把攒的鸡蛋全煮了。'; } },
          { t: '雇人代役', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 10; s.hidden.yin -= 3; return '你花大价钱雇了个亡命汉代役。他去了。半年后回来讨尾款——你给了，还得赔笑。'; } },
          { t: '逃役亡命', dim: 'yi', time: '一月', fx: function (s) { s.hidden.zhi += 6; s.hidden.yun -= 6; s.flags['逃役'] = 1; if (Math.random() < 0.5) { s.attrs.xin += 5; return '你躲进了山泽，和几百个逃役的人聚在一处。官府的通缉令贴在十里之外——你们成了另一个「里」。'; } s.attrs.ti -= 6; return '你被抓了回来，黥了面，工役改成了三年。脸上的字，一辈子洗不掉。'; } },
          { t: '行贿里正，改簿免役', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 6; if (Math.random() < 0.65) return '簿改了，你没去。里正收了钱嘴很稳——他将来要你改第二回。'; return '改簿的事发了。连坐的法下，你与里正同罚。役照服，罪加一等。'; } }
        ] },
      { id: 'qin_fenshu', title: '焚书', tags: ['朝堂风波', '灾祸'], weight: 10,
        story: '焚书令下：民间所藏诗书，限期上缴焚烧。\n你家有两卷祖传的书。交出去烧，是守法；藏下来，是犯罪。你父亲临终说过：书在，家就在。',
        options: [
          { t: '焚书守法', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin -= 6; s.attrs.ming += 4; return '书在里长的监视下烧了。火很旺。你从灰里捡出一角没烧透的简，又放回了火里——这次烧得很干净。'; } },
          { t: '藏简于壁', dim: 'yi', time: '数日', fx: function (s) { s.hidden.yin += 10; s.hidden.zhi += 8; s.flags['壁中书'] = 1; return '你把简砌进了墙里。此后每回路过那面墙，你的手都想摸一下。摸到老，墙里的话终于重见天日。'; } },
          { t: '背下来，烧掉原本', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 8; s.attrs.xin += 5; s.hidden.zhi += 5; return '你把两卷书背了三十日，然后亲手把原本烧了。火里烧掉的是竹，竹里的字在你脑子里。'; } },
          { t: '上缴别人藏的书，自保', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 12; s.flags['告藏'] = 1; return '你举发了邻家藏书，得了赏。邻家流徙边地。你从此不再读书——书字入眼，就是那家人的脸。'; } }
        ] },
      { id: 'qin_chidao', title: '驰道', tags: ['日常'], weight: 9,
        story: '皇帝东巡，驰道要先行整饬。\n沿线各里要清道、备刍、立候馆。差事急，工期短，官吏的鞭子比工期更急。',
        options: [
          { t: '领班督工，如期完工', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti -= 5; s.attrs.ming += 5; s.flags['督道'] = 1; return '你的里第一个完工。巡道的御史在名册上勾了你的名字——被御史记住，是好是坏，没人说得准。'; } },
          { t: '虚报工数，克扣工钱', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; return '名册写五十人，实到三十。省下的口粮变成了你家的钱。驰道修得很好，路不会说话。'; } },
          { t: '趁御驾将至，献新法整饬', dim: 'shi', time: '半月', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 4; return '你提议分段并行赶工，早了五日完工。郡守问：谁想出来的？你被领去见了郡守的脸。'; } },
          { t: '拖工期，藏工于民', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 3; s.attrs.ming -= 3; return '你让工人们轮着歇，工期拖了十日。御史到时路也修好了——你赌赢了鞭子，赌输了名册。'; } }
        ] },
      { id: 'qin_wangzhe', title: '亡人', tags: ['日常', '灾祸'], weight: 9,
        story: '夜里有人敲门，是个逃亡的儒生，带着一箱书。\n窝藏亡人，连坐。收书，也是罪。他站在雨里，箱底都泡软了。',
        options: [
          { t: '藏人藏书', dim: 'yi', time: '一月', fx: function (s) { s.hidden.yin += 10; s.hidden.zhi += 6; if (Math.random() < 0.6) { s.attrs.cai += 5; return '他在你家柴房住了一个月，把书背给你听。他走时箱空了，你脑子里多了两卷书。'; } s.attrs.ming -= 10; s.flags['藏儒事发'] = 1; return '搜出来了。人被带走，你因连坐受罚。书在押送的路上散了一地，你捡到一卷残的。'; } },
          { t: '只收书，不收人', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.yin -= 4; return '你收了箱子，指了他一条山里的活路。他懂了，磕头走了。书是你的，命是他的。'; } },
          { t: '闭门不应', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin -= 4; s.hidden.zhi += 4; return '你隔着门听他在雨里站了很久，然后脚步声远了。那晚你没睡。往后每到雨夜，你还是会想起那声敲门。'; } },
          { t: '报官', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 12; s.flags['告儒'] = 1; return '赏钱拿到了。那箱书当众烧了，烧书的地方后来种不出庄稼——村里人这么说，你也这么信。'; } }
        ] },
      { id: 'qin_junli', title: '郡吏', tags: ['朝堂风波'], weight: 8,
        story: '郡里招书吏，考的是律条与刀笔。\n秦法繁密，律条背全的没几人。考上了，是刀笔小吏，也是权力链上最底下的一环——案卷过你的手，命也过你的手。',
        options: [
          { t: '苦读律条应考', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 4; s.flags['郡吏'] = 1; return '你考了郡吏。案卷从此过你的手。第一个经你手的案子，判得合法，但你夜里想了很多。'; } },
          { t: '入吏门后收「规费」', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 9; s.flags['吏弊'] = 1; return '过手的案卷有松紧。松一松，谢仪就到。你攒下了一座小院——和案卷里几个睡不着觉的名字。'; } },
          { t: '依法严办，不通融', dim: 'shi', time: '半载', fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 2; G.addFame(s, 'zhou', 3); return '你依法办事，得罪了一串人。上官却升了你——秦法要的就是你这种人：手硬，嘴紧。'; } },
          { t: '借案卷之便，救过一个该死的人', dim: 'yi', time: '一季', fx: function (s) { s.hidden.yin += 10; s.hidden.yun -= 5; s.flags['改过卷'] = 1; return '你改了一个死刑犯案卷里的日期，让他死在了大赦之前。这事你谁都没说——包括后来大赦的消息传来时。'; } }
        ] },
      { id: 'qin_dongxun', title: '东巡', tags: ['朝堂风波'], weight: 8, minScene: 10,
        story: '皇帝东巡，途中驻跸你所在的县。\n全县如临大敌：清道、献食、征乐。献上去的东西不齐，县令的命就悬了——县令的命下面，是你的命。',
        options: [
          { t: '把差事办到滴水不漏', dim: 'shi', time: '半月', fx: function (s) { s.attrs.ming += 6; s.attrs.ti -= 3; return '驻跸三日，万事齐整。车队走后县令长出一口气，把你的名字写进了荐书。'; } },
          { t: '借献食之名中饱', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 7; return '献食的账目做得很平，平账的差额进了你家。皇帝没看见，县令看见了——县令也拿了一份。'; } },
          { t: '混在人群里近看御容', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.hidden.yun += 3; return '你在人群里看见了皇帝。车帘没掀，你看见的是一副从未见过的仪仗。你回家对孩子们讲了三十年。'; } },
          { t: '趁全城忙乱，办自己的私事', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; return '所有人的眼睛都在御道上。你办成了拖了半年的私事。乱是别人的乱，忙是你的忙。'; } }
        ] },
      { id: 'qin_hairen', title: '海市', tags: ['江湖奇遇', '鬼神'], weight: 7, minScene: 12,
        story: '东巡的队伍里带着方士，说要入海求仙。\n县里征船、征粮、征童男童女。海上的事没人知道，但征发的名单是真的。',
        options: [
          { t: '随船出海求仙', dim: 'yi', time: '半载', fx: function (s) { s.hidden.yun += 8; s.attrs.cai += 4; if (Math.random() < 0.5) { s.flags['海客'] = 1; return '船在大海上走了两个月，没见到仙山，见到了前所未见的岛与风。你活着回来，成了讲海上故事的人。'; } s.hidden.yun -= 6; return '船没回来。你随行的那些童男童女，名字刻在了神祠的墙上——求仙的事，成了祭祖的事。'; } },
          { t: '负责征发，严酷催逼', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; return '你把船、粮、人都凑齐了，手段不软。上官赏你。被征的人家在背后给你起了个诨名。'; } },
          { t: '顶替邻家孩子应征', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 8; s.attrs.ti -= 4; return '你把自己报了上去，换了邻家那个独子下来。船回来时你活着——那年海风顺，也可能不是风的事。'; } },
          { t: '直言仙山之妄，上书谏止', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 4; s.hidden.yun -= 4; return '你的书石沉大海，方士们却记住了你。你在征发的名册上多留了一个月——直言的价钱，从来当日结。'; } }
        ] }
    ],
    main: [
      { id: 'qin_m1', title: '新黔首', after: 0, time: '数日',
        story: '你的家乡并入郡县了。\n新任的县吏来清户籍、量田亩、定税册。乡亲们看着那些不认识的字和没见过的规矩，像看另一个世界的官话。\n吏说：从今往后，你们是黔首，也是秦人。',
        options: [
          { t: '带头登记，做顺民', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 4; s.attrs.xin += 3; s.flags['先籍'] = 1; return '你第一个把名姓报了。县吏多看了你一眼——在新法的世界里，第一个守规矩的人总是先被看见。'; } },
          { t: '托病拖延，观望形势', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 3; s.attrs.ming -= 2; return '你拖了一个月。拖不过的——籍册还是登了，只是迟到的名字总要多被问几句。'; } },
          { t: '趁清籍之乱，隐田自利', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 6; s.flags['隐田'] = 1; return '两块坡田你报成了林地。税少了一半。没人查——今年没人查。'; } },
          { t: '找县吏问新法全貌', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 3; s.flags['问法'] = 1; return '你拉着县吏问了半日新法。他讲累了，赏了你一册抄律。后来全村人有事都来问你——你成了懂法的人。'; } }
        ] },
      { id: 'qin_m2', title: '大泽', after: 12, time: '一月',
        story: '远方传来消息：有人在大泽乡揭竿了。\n口号传到你乡里时已经变了三次形。郡县在征兵平乱，乡亲们在观望——天下的风向变了，你家的门口也变了。',
        options: [
          { t: '随郡兵出征平乱', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 5; if (Math.random() < 0.5) { s.flags['平乱功'] = 1; s.attrs.qian += 5; return '你随队打了两仗，乱平了。军功簿上有你的名字——簿上不写那一仗死了多少人。'; } s.attrs.ti -= 8; return '乱没平成，队伍散了。你逃回家的路上想明白了一件事：潮水大的时候，船在哪边都不重要。'; } },
          { t: '聚乡人守里自保', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 6; G.addFame(s, 'xiang', 6); return '你领着乡人筑栅、聚粮、定规矩。乱兵过境两次，没进你的里。乱世里，规矩就是城墙。'; } },
          { t: '投奔起事的队伍', dim: 'yi', time: '一季', fx: function (s) { s.hidden.zhi += 8; s.hidden.yun -= 5; if (Math.random() < 0.4) { s.attrs.ming += 8; s.flags['从乱'] = 1; return '你在乱军里当了个小头目，打了三仗。天下乱得太快，快得你的官名三个月换了四个写法。'; } s.attrs.ming -= 6; return '那支队伍半年后败亡了。你趁夜走脱，回了乡——乡里没人问你去过哪里，这是乱世的好处。'; } },
          { t: '囤粮观察，两头不得罪', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 5; return '你把粮囤得满满的，郡兵来买你卖，过境的义军来借你也给。谁赢了都记得你有粮——和有算计。'; } }
        ] }
    ],
    endings: [
      { name: '法吏清名', group: '秦显', pri: 70,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.9 + (s.attrs.xin - 55) * 0.7 + (s.flags['郡吏'] ? 10 : 0) + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 58 }] },
        verdict: '他一生守法，法救过他，也差点压死他。',
        epilogue: '天下乱了三年，又定了。新朝的官吏来清旧档，发现你的案卷整整齐齐。\n他们问：此人何在？乡人说：前年冬天走的。\n新官把你的案卷留下了，说：这批卷子，比人活得久。' },
      { name: '戍卒之歌', group: '秦中', pri: 52,
        score: function (s) { var v = (s.flags['服役'] || s.flags['逃役'] ? 14 : 0) + (s.attrs.ti - 45) * 0.3 + (100 - s.attrs.ming) * 0.25; return Math.max(0, Math.min(100, v)); },
        verdict: '徭役如山，他把一生垫在了山下。',
        epilogue: '你服过很多次役：修过驰道，戍过长城，挖过河。\n每处工地都留下你的汗和别人的骨头。\n你老了以后最怕听见两件事：打更，和点卯。你的孩子问你怕什么，你说：怕点名。点名就是有人要数你——数着数着，人就没了。' }
    ]
  };


  /* ================= 19 · qin AI 候选入库（promote） ================= */
  D.dynasties.qin.events.push(
    {
      id: 'qin_an1', title: '闾左', tags: ['日常'], weight: 10,
      minScene: 3,
      time: '旬日',
      story: '闾左之居，与闾右隔一道墙。墙东住的是有爵的人家，墙西住的是你这样的黔首。\n一夜大雨，墙塌了半面。有爵的人家要你赔墙，你家的鸡恰好吃了他家的谷。两桩账，叠成了一场官司。\n两家的官司报到亭部，啬夫说按律办，按律办之前的茶钱先要按人情办。',
      options: [
        { t: '赔墙谢罪，忍下这口气', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.attrs.xin += 5; return '你把墙垒了回去，又赔了三倍的谷钱。有爵的人家很满意——满意的人家，冬天借了你一斗种。'; } },
        { t: '引律自辩，逐条陈情', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; if (Math.random() < 0.55) { return '你把秦律的条文背得一字不差。啬夫听了半晌，判各认一半。背律的人，县里记住了名字。'; } s.attrs.ming -= 4; return '律条你背熟了，啬夫却听宗族的。官司输了，你学会了另一条律：势比法重。'; } },
        { t: '连夜加固，另起界石', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 4; s.attrs.cai += 3; return '你把界石往自家这边挪了半步，又把墙修得比原来的厚。墙是新的，账是平的。'; } },
        { t: '夜毁其墙，以牙还牙', dim: 'yi', time: '数日', fx: function (s) { if (Math.random() < 0.6) { s.attrs.xin += 4; s.hidden.yin -= 6; return '他的墙也塌了半面。他猜得到是谁，却没有证据——两家的仇，从此埋进了土里。'; } s.attrs.ming -= 10; s.hidden.yin -= 8; return '你被当场拿住。毁人墙垣，刑徒之罪——你服了半年的役，墙没修，名声先没了。'; } },
      ]
    },
    {
      id: 'qin_an2', title: '驿马', tags: ['日常'], weight: 9,
      minScene: 4,
      time: '半月',
      story: '驿使过境，征你家出驿马一匹、刍粮若干。\n驿马征去，是有去无回的账。里正说：秦法如山，逃是逃不掉的——账认了，路怎么走，你挑。\n驿路上的差使一年数回，回回都是赔钱的买卖，回回都不能不办。',
      options: [
        { t: '献马应役，兼送一程', dim: 'shi', time: '半月', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 4; return '你亲自把马送到下一站。驿吏记下了你家名——驿路上的好名声，是官府的耳目，也是乡里的脸面。'; } },
        { t: '以瘦马充数，暗藏好马', dim: 'li', time: '数日', fx: function (s) { if (Math.random() < 0.6) { s.attrs.qian += 4; s.hidden.yin -= 5; return '瘦马交了差，好马留了家。验马的吏眼花了一回——你的运气，养在别人打盹的空当里。'; } s.attrs.ming -= 9; s.hidden.yin -= 6; return '瘦马被当场退回，欺瞒之罪加一等。你家好马充了公，瘦马也搭了进去。'; } },
        { t: '集乡钱共购驿马', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 4); return '你提议全乡摊钱合购一匹，谁家都不伤筋骨。马送出去了，法子留下了——下一回征发，乡里照这个例。'; } },
        { t: '夜纵驿马，诈称走失', dim: 'yi', time: '数日', fx: function (s) { if (Math.random() < 0.5) { s.hidden.yun += 4; s.hidden.yin -= 5; return '马在夜里跑了，你领人追了三天没追到。驿吏骂了半天，账挂成了「走失」——走失不罪，你赌对了。'; } s.attrs.ming -= 10; s.hidden.yin -= 7; return '马没跑掉，跑的是你——逃役的罪比失马重。你在山里躲了一季，回来时马没了，名也没了。'; } },
      ]
    },
    {
      id: 'qin_an3', title: '谳狱', tags: ['朝堂风波'], weight: 10,
      minScene: 6,
      time: '一月',
      story: '县里一桩盗案要谳（定罪），你是书吏，案卷经你的手。\n证据指向一个累犯，可你巡访时见过真凶的影子。谳错了，你的笔就是刀；改了，你的笔就是你的命。\n郡里派来复核的掾史住在亭舍，他的眼色比律文更难读。',
      options: [
        { t: '依法谳罪，据卷直书', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin -= 5; s.attrs.ming += 3; s.flags['谳狱'] = 1; return '你按卷谳了罪。累犯伏法，真凶逍遥——你把那份不安写进了一封没有寄出的信里。'; } },
        { t: '重勘现场，另寻实证', dim: 'li', time: '半月', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 5; if (Math.random() < 0.5) { s.attrs.ming += 5; return '你在泥里找到了一枚不合脚的履印。案翻了，真凶伏法。你的名字被郡守记在了谳狱的功劳簿上。'; } return '重勘无功，卷还照旧。你把「证据不足」四个字写得格外工整——工整里藏着你不肯说破的话。'; } },
        { t: '拖卷不谳，等真凶露形', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 3; s.hidden.zhi += 5; return '你把卷宗压了半月。上官催了三次，你拖了三次。真凶没露形，你先被记了「怠事」——拖字诀，先磨自己。'; } },
        { t: '改卷徇私，卖与真凶', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 10; s.flags['改卷'] = 1; return '真凶托人递了重金。你改了卷——钱在袖子里响，良心在卷宗里哑。此后你听见「谳」字，手都会抖。'; } },
      ]
    },
    {
      id: 'qin_an4', title: '仓案', tags: ['日常'], weight: 9,
      minScene: 5,
      time: '半月',
      story: '仓啬夫盘点官仓，粟米的账与囤对不上——亏空三成。\n上头要查，经手的吏要顶罪。你是新来的，旧账不是你欠的，火却烧到你脚下。\n亏空的旧账像仓底的陈粟，翻起来全是灰。灰里有没有火，要看你怎么翻。',
      options: [
        { t: '据实上呈，附亏空清册', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 7; s.flags['清仓册'] = 1; return '你的清册一呈，旧吏伏罪，你被委了盘仓的实差。接烂账的人，往往就是下一任的仓啬夫。'; } },
        { t: '替旧吏补账，讨个人情', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 5; s.hidden.yin -= 4; s.flags['补账'] = 1; return '你自掏腰包补平了亏空。旧吏感激你——感激的人，往后在衙门里处处替你说话。人情是账，这本账不亏。'; } },
        { t: '趁乱取粟，填自家之仓', dim: 'yi', time: '旬日', fx: function (s) { if (Math.random() < 0.55) { s.attrs.qian += 8; s.hidden.yin -= 10; return '亏空都记在旧吏头上，你顺手把亏的补到了自家囤里。仓神的眼睛是雪的，人的眼睛是盲的。'; } s.attrs.ming -= 12; s.hidden.yin -= 8; return '盘仓盘到了你的囤。监仓御史的鞭子落下时，旧吏在旁边看着——他笑得很轻。'; } },
        { t: '献仓法改良之策', dim: 'xiu', time: '半月', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 5; s.flags['仓法'] = 1; return '你献了「仓廪出入簿」的盘仓法：入有验、出有符、余有籍。郡守批了「试行」——试行的地方，就是你站的地方。'; } },
      ]
    },
    {
      id: 'qin_an5', title: '学室', tags: ['日常'], weight: 9,
      minScene: 3,
      time: '半载',
      story: '郡设学室，教小吏律令。入学要试，试中的人半官半学，出室即仕。\n你家的牛卖了才凑齐束脩——束脩是牛，前途是官，秤在你心里。\n学室的门朝官府开，学室的学费朝家里要。两头都是硬的。',
      options: [
        { t: '卖牛入学，苦读三年', dim: 'shi', time: '三年', fx: function (s) { s.attrs.cai += 9; s.attrs.ming += 4; s.flags['学室出身'] = 1; return '三年学室，你把律令抄了七遍。出室试你考了上等——牛换的官，父亲说这是他听过最贵的一声哞。'; } },
        { t: '借书自抄，不入学室', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 3; s.flags['抄律'] = 1; return '你借了学室的书抄。抄书的人记性最好——两年后你与出室的学子同试，你比他们高半等。'; } },
        { t: '凑钱与人合雇一师', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian -= 5; s.attrs.cai += 5; return '四家合雇一师，轮流管饭。师傅教得用心——一人出一份钱，四家得四份才学，这是乱世里最好的合伙。'; } },
        { t: '卖牛放贷，以钱生钱', dim: 'yi', time: '半载', fx: function (s) { if (Math.random() < 0.5) { s.attrs.qian += 9; s.hidden.yin -= 6; return '牛钱放了贷，利息滚了两圈。你没做官，做了里中放贷的人——粮熟时上门的人，比学室放榜还多。'; } s.attrs.qian -= 6; s.hidden.yin -= 4; return '贷出去的牛钱烂了两笔。牛没了，钱没了，学也误了——你把「贪」字贴在了门楣上。'; } },
      ]
    },
    {
      id: 'qin_an6', title: '吏课', tags: ['朝堂风波'], weight: 9,
      minScene: 7,
      time: '一月',
      story: '上计之年，郡守课殿吏员：课最者赏，课殿者罚。\n你的同僚劝你把亏空的账挪给病重的老吏——老吏今年反正要退，锅该他背。\n上计的册子一到，衙门里的笔都开始找落笔的地方——落在谁的册上，谁疼。',
      options: [
        { t: '账归其主，不挪不嫁', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 9; s.attrs.ming += 5; s.flags['不嫁账'] = 1; return '你没挪账。课殿了，罚俸一季。老吏临退前握着你的手说：这世道的账，就剩你一人记得干净。'; } },
        { t: '挪账于老吏，自保其课', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 3; s.hidden.yin -= 10; s.flags['嫁账'] = 1; return '账挪了，课最了，赏了。老吏病着，没力气问——可他儿子也是吏。这张债，写在你看不见的册子上。'; } },
        { t: '上书陈课法之弊', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yun += 3; s.flags['陈课弊'] = 1; return '你写了《课吏不当相蔽议》，说上课最的常是挪账的。郡守读罢沉默半晌——第二年课法改了两条。'; } },
        { t: '代老吏做完最后一任', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 8; s.attrs.qian -= 3; s.hidden.yin += 6; return '你替老吏把亏空一页页理清，把能补的都补了。他死在你任上——葬礼那天，全衙的吏都来了。'; } },
      ]
    },
    {
      id: 'qin_an7', title: '商旅', tags: ['日常'], weight: 8,
      minScene: 4,
      time: '一月',
      story: '关市之征重，行商的货每过一关抽一成。\n你贩布与铁器，货重税厚。同行的老商教你一课：货要分，人要散，税卡要认——认卡如认人，认人如认命。\n关吏的脸色是行情，行情比货价变得还快。老商的话你记住了，记住了还要看运气。',
      options: [
        { t: '分批分道，化整为零', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 6; s.attrs.qian += 6; s.flags['分货'] = 1; return '你把货分五路走，各雇各的车。税抽得薄了，货到得齐了——分货的法子，被同行的商队偷学了去。'; } },
        { t: '重金结好关吏', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 8; s.attrs.qian += 6; s.hidden.yin -= 4; s.flags['结关吏'] = 1; return '你把三成的利递给了关吏。此后你的车过卡，查得最松——松查的关，比快马值钱。'; } },
        { t: '贩官市特许之货', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 4; s.attrs.qian += 5; s.flags['官市'] = 1; return '你改贩官市特许的盐铁。利薄，税清，路明——明路的生意做得慢，做得长。'; } },
        { t: '结匪保路，坐地分账', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 10; s.flags['结匪'] = 1; return '你与盗匪议定「护货」的分账。你的货再没被劫过——劫别人的货，用你的名。你的名，从此在匪册上。'; } },
      ]
    },
    {
      id: 'qin_an8', title: '边籍', tags: ['边境战事'], weight: 8,
      minScene: 5,
      time: '一季',
      story: '你被派往边戍做书吏，登记戍卒的名籍与军书。\n戍卒的名册上，每天都要勾掉几个名字——勾的方式，是画一道墨线。墨线画久了，你的手比石头硬，比纸软。\n边地的风把纸吹得哗哗响，册子上的墨线一道比一道短——那是人命缩短的方向。',
      options: [
        { t: '据实登记，一笔不苟', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 5; s.flags['戍书'] = 1; return '你的名册清清楚楚。戍卒的家里来信查人，你一封封照册回——回信的人不识字，识字的是他们的盼。'; } },
        { t: '把病卒记作阵亡，饷归其家', dim: 'yi', time: '一季', fx: function (s) { s.hidden.yin += 10; s.attrs.qian -= 3; s.flags['改册恤孤'] = 1; if (Math.random() < 0.7) return '你改了几笔，把病殁写成阵亡——阵亡的饷厚，够寄回家。改册是死罪，你把它做成了活人的饭。'; s.attrs.ming -= 12; s.flags['改册事发'] = 1; return '改册被军法查出。你被杖责革役——行刑那天，几个戍卒偷偷往你身上盖了件蓑衣。'; } },
        { t: '抄录军书，暗习兵事', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 4; s.flags['习兵书'] = 1; return '你把过手的军书都默记了一遍。戍满归乡时，你懂的东西比一个百将还多——多出来的那些，没处领赏。'; } },
        { t: '贿上官求调内郡', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 9; s.hidden.yin -= 5; s.flags['调内郡'] = 1; return '你花钱调回了内郡的文书房。边戍的册子交出去那天，你回头望了一眼长城的方向——那里埋着你半年的同伴。'; } },
      ]
    },
  );
})(window.GAME_DATA);