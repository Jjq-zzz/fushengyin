/* 「隋」朝代内容包：运河通南北，征辽不肯休 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.sui = {
    id: 'sui', name: '隋', clock: { year: 1, season: 0 }, eras: [{ name: '开皇', span: 20 }, { name: '大业', span: 13 }],
    events: [
      { id: 'sui_kaike', title: '开科', tags: ['朝堂风波'], weight: 11,
        story: '朝廷开科取士，不问门第，问策问经。\n乡里读书人议论了一夜：有人说这是寒门的门，有人说这是苦海的岸。你家的书，三代没换来一个官——这一回，换法子。',
        options: [
          { t: '应科试，背水一战', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 7; s.flags['应科'] = 1; if (Math.random() < 0.4 + s.attrs.cai / 250) { s.attrs.ming += 5; return '你中了乙科。放榜那日，你把三代人抄的书搬出来晒了一遍——晒的其实是委屈。'; } return '落第了。你在榜下站了一炷香，把榜文上的名字默了一遍——默完回家，书桌擦得更勤了。'; } },
          { t: '改投实务，考明法', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 4; s.flags['明法出身'] = 1; return '你考了明法科，入了州司法佐。清流瞧不上法吏，法吏的手上有实权——你选了实在的那头。'; } },
          { t: '依旧走荫补的路', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 5; s.attrs.ming += 3; s.hidden.yin -= 3; return '你托了门路补了个流外官。开科的门是给天下开的，你的门在别处——两扇门，你走熟的那扇。'; } },
          { t: '讥科选未成，闭门治学', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.xin += 5; return '你说：开科是好事，只是头几科的题还嫩。你在家治学三年，第三年你中了——中的那年，题也嫩了。'; } }
        ] },
      { id: 'sui_yunhe', title: '开河', tags: ['日常', '灾祸'], weight: 11,
        story: '大运河的工期压到了你乡：每户出丁，工期一年。\n河要通南北，功在千秋——千秋太远，眼前的鞭子太近。里正把丁册摊在你面前。',
        options: [
          { t: '应役赴工', dim: 'shi', time: '一年', fx: function (s) { s.attrs.ti -= 7; s.attrs.qian += 4; s.flags['河役'] = 1; return '你挖了一年河。工期末段死了很多人，你的什伍里少了四个名字。河通的那天你站在堤上看水——水很平，像没发生过任何事。'; } },
          { t: '督工分段，护乡人周全', dim: 'shi', time: '一年', fx: function (s) { s.attrs.ti -= 4; s.attrs.xin += 7; G.addFame(s, 'xiang', 6); return '你讨了个督工的差，把本乡的段排在了轻活上。你的乡，役卒死了两个——别乡死了二十。这两个的家人，后来给你磕过头。'; } },
          { t: '雇人代役', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 9; s.hidden.yin -= 3; return '你雇了个浪人代役。代役的人回来讨尾款时胳膊断了——河役废人，你花钱买的是他的残年。'; } },
          { t: '逃役，往南走漕运', dim: 'yi', time: '一月', fx: function (s) { s.hidden.zhi += 6; s.hidden.yun -= 5; s.flags['逃河役'] = 1; return '你逃了役，上船做了漕工。河修成了，你却在河上讨生活——官府追逃役的人追了三年，追到船上时，船主替你担保了。'; } }
        ] },
      { id: 'sui_zhenglia', title: '征辽', tags: ['边境战事', '灾祸'], weight: 10,
        story: '又征辽东了。征发的文书与前年一样，前年回来的人不到一半。\n乡里的丁壮听说要征，有人连夜报名（求个先到的选饷），有人连夜进山。',
        options: [
          { t: '应征', dim: 'yi', time: '半载', fx: function (s) { s.attrs.ti -= 7; s.attrs.ming += 6; if (Math.random() < 0.35) { s.flags['辽东功'] = 1; return '辽东城下你立了功——在撤军的那一仗里。功是救人的功，文书上写的是杀敌。'; } s.attrs.xin -= 6; return '辽东城下泡了一季，雨、泥、疫。你活着回来的秘诀是排在队尾——队尾的秘诀，是从死人堆里学的。'; } },
          { t: '代乡里管粮道', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 5; s.flags['辽运'] = 1; return '你管了一段粮道。粮在路上丢三成是常态，你丢了一成半——省下的那一成半，够你良心记账记到老。'; } },
          { t: '组织乡人摊派代役钱', dim: 'shi', time: '一月', fx: function (s) { s.attrs.cai += 5; s.attrs.qian += 4; G.addFame(s, 'xiang', 4); return '你提议全乡凑钱雇勇士代役，摊得公平。去了的人活着回来了——你乡今年没寡妇。'; } },
          { t: '进山避征', dim: 'yi', time: '一月', fx: function (s) { s.hidden.zhi += 5; s.hidden.yun -= 5; s.flags['避辽役'] = 1; return '你进山半年，靠挖野芋活着。下山时征令过期了——你瘦了二十斤，换了一条命，这笔账怎么算都划算。'; } }
        ] },
      { id: 'sui_daxing', title: '营东都', tags: ['日常'], weight: 9,
        story: '东都营建，征天下巧匠。\n你乡的木匠头子被点名去了——点名的人说，回来的时候，就是「天下第一等的匠」。',
        options: [
          { t: '应征入东都', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.ti -= 4; s.attrs.qian += 5; return '你在东都干了一年，见了天下最大的宫殿图纸。回来后你建的自家房梁，榫卯全按宫里的法子——乡亲们叫你「半个将作监」。'; } },
          { t: '荐族中巧匠，自家守乡', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.cai += 4; s.hidden.yin += 4; return '你荐了堂叔去，自家留下接活。堂叔回来时带了三车新式的图样——他教了半个乡，乡里的房，从此不漏雨。'; } },
          { t: '贿免点名校', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 6; s.hidden.yin -= 4; return '你花钱免了征。省下的手艺没省下名——里正的册子上，你家写的是「惜力之家」。'; } },
          { t: '借营建生意与官吏结交', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 4; s.attrs.qian += 5; s.hidden.yin -= 4; return '你给征发的官吏供了三批上等木料。此后你乡的徭役，总能「恰好」排到轻活——木料的利息，长在人情上。'; } }
        ] },
      { id: 'sui_caoyun', title: '漕运', tags: ['日常'], weight: 9,
        story: '河通了，漕运的差事多了。\n漕船的押运是个肥缺也是个险缺：粮丢了要赔，河匪来了要命。乡里的船老大找你合伙。',
        options: [
          { t: '合伙押漕', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.attrs.ti -= 3; s.flags['漕商'] = 1; return '你押了三趟漕，遇过一次匪——匪收了买路钱放行。你从此也备了买路钱，这叫「河上的规矩」。'; } },
          { t: '改良漕船省耗', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; return '你把船舱改了隔水，沉船少了。漕运司把你的船式颁给了别州——颁出去的东西记不着你的名，你的名在船工嘴里。'; } },
          { t: '与河匪分账', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 10; s.flags['通匪'] = 1; return '你与匪头谈成了「护漕」的分账。此后你的船最快最稳——快，是因为没人拦；稳，是因为你成了匪的一部分。'; } },
          { t: '守田不涉漕', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你没上船。河上的财富与你无关，河上的死讯也与你无关——你的稻子听不见河声，长得不错。'; } }
        ] },
      { id: 'sui_xunxing', title: '巡幸', tags: ['朝堂风波'], weight: 9, minScene: 8,
        story: '皇帝巡幸江都，龙舟连绵二百里，沿途州县献食献伎。\n你乡在道旁。迎驾的差事是好差也是死差：办好了见天颜，办砸了见阎王。',
        options: [
          { t: '倾力办差', dim: 'shi', time: '半月', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 6; s.flags['办过迎驾'] = 1; return '你把本段的迎驾办得井井有条。皇帝的车驾过去时，你远远看见了龙旗的一角——那一角，你讲了二十年。'; } },
          { t: '薄献而实，保民力', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.attrs.ming -= 2; s.hidden.yin += 6; return '你把献食的账做得又薄又实——上头不满意，百姓满意。上头忘得快，百姓记得慢而久。'; } },
          { t: '借迎驾敛财', dim: 'li', time: '半月', fx: function (s) { s.attrs.qian += 7; s.hidden.yin -= 8; s.flags['迎驾敛财'] = 1; return '你打着迎驾的旗号摊派了三轮。车驾走后账要平——平账的钱，自然又是三轮摊派回来的。'; } },
          { t: '观龙舟作《汴水谣》', dim: 'shi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 3; s.hidden.yun -= 3; return '你编了首民谣，唱的是龙舟与纤夫。谣传得比车驾远——传到有司耳朵里时，多了一句你没写的判词。'; } }
        ] },
      { id: 'sui_fubing', title: '府兵', tags: ['日常'], weight: 8,
        story: '府兵制下，你家的田与兵役绑在一起：平时耕种，番上为兵。\n今年轮到你家番上——去，田里的活谁干？不去，兵籍谁顶？',
        options: [
          { t: '如期番上', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti += 3; s.attrs.ming += 3; s.flags['番上'] = 1; return '你番上三个月，操练、戍守、再操练。回来时家里的稻收了一半——另一半是邻里帮的，帮出去的情，记在来年。'; } },
          { t: '以钱顶役', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 7; s.hidden.yin -= 3; return '你缴资课顶了役。兵籍的册子干净，田里的活没误——钱能买的东西里，清静算便宜的。'; } },
          { t: '逃番', dim: 'yi', time: '一月', fx: function (s) { s.hidden.zhi += 5; s.hidden.yun -= 6; s.flags['逃番'] = 1; if (Math.random() < 0.5) return '你逃了这番。没人追——府兵的册子乱，乱世将至的册子更乱。你赌赢了三年。'; s.attrs.ming -= 8; return '逃番被抓，杖一百，兵籍改成了戍边——最远的那种。'; } },
          { t: '练乡团，兼习耕战', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 5); s.attrs.ti += 2; return '你把番上的操法搬回了乡里，农闲练团。官府默许——乱世的门前，练拳的人都懂事。'; } }
        ] },
      { id: 'sui_daluan', title: '瓦岗风声', tags: ['朝堂风波', '灾祸'], weight: 10, minScene: 12,
        story: '瓦岗的旗竖起来了，天下豪杰望风而附。\n郡县征兵讨伐，征来的兵一半投了对面。你乡的里正拿着册子来找你——这一回，册子上的名字，可以自己选写哪一边。',
        options: [
          { t: '投官军平乱', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 5; s.attrs.ming += 5; s.flags['投官军'] = 1; if (Math.random() < 0.4) { s.attrs.qian += 4; return '你在阵前招降了三寨人马。招降的功劳比杀敌大——文书上写得明白，你也看得明白。'; } s.attrs.xin -= 6; return '官军败了。你混在溃兵里回乡——乡里的乱比你走时更乱，你的选择越发的少了。'; } },
          { t: '投瓦岗', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; s.flags['投瓦岗'] = 1; return '你在瓦岗军里做了粮曹。义军的粮比官军的清楚——清楚的东西撑得久些，你押了它。'; } },
          { t: '保乡筑坞，不投两边', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 7; G.addFame(s, 'xiang', 8); s.attrs.qian -= 3; return '你领乡人筑坞积粮，两边来人都不接。乱世的坞堡规矩：门内是我的族，门外是你的刀。'; } },
          { t: '卖消息与两边', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 9; s.hidden.yin -= 9; s.flags['两头卖'] = 1; return '你把两边的布防与粮道各卖了一半。你的钱翻了两番——你的名字在两边的册子上，写的都是同一个字：用。'; } }
        ] }
    ],
    main: [
      { id: 'sui_m1', title: '新历之年', after: 0, time: '数日',
        story: '新朝立，改元开皇。新历颁下，旧朝的钱废了。\n你父亲拿着两枚旧钱看了半晌，说：钱废了可以熔，人废不了。说完他把旧钱埋进了祖坟旁——你说不清这是什么意思。',
        options: [
          { t: '问父亲埋钱的用意', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.zhi += 4; s.flags['问旧钱'] = 1; return '父亲说：埋的不是钱，是前朝。人不许忘，就用东西替人记。你把这句话埋进了心里。'; } },
          { t: '把旧钱熔了打农具', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 3; s.attrs.ti += 2; return '你把旧钱熔了打成锄头。铁是好铁，锄是好锄——前朝就这样进了你家地里。'; } },
          { t: '用旧钱请先生开蒙', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.hidden.yin += 4; return '旧钱先生也收。他教你的第一课不是识字，是「钱有新旧，字无古今」。'; } },
          { t: '攒旧钱待其复出', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 3; s.hidden.yun -= 3; s.flags['囤旧钱'] = 1; return '你囤了一坛旧钱，赌它复出。它没复出——你赌输的是两代人的钱，赢的是「再也不赌」四个字。'; } }
        ] },
      { id: 'sui_m2', title: '大业之末', after: 12, time: '一季',
        story: '大业的年号走到第十几年，天下四处起火。\n你乡的里正一夜白头：征兵、征粮、平乱，三件事挤在一张丁册上。他把册子摔在桌上说：这册子，谁爱写谁写！\n满屋的人看着他，又都看着他身后的你。',
        options: [
          { t: '接册，替乡里周旋', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 8; G.addFame(s, 'xiang', 8); s.attrs.cai += 4; return '你接了册。征发的名额你磨掉三成，粮摊派你改成分段——里正老泪纵横。乱世里，接烂摊子的人最像英雄。'; } },
          { t: '劝里正焚册，散乡自治', dim: 'yi', time: '一月', fx: function (s) { s.attrs.xin += 6; s.hidden.zhi += 7; s.flags['焚册'] = 1; return '你劝他把册烧了，乡人自推保长、自定口粮。官府来查，查了个空——空册救了一乡。'; } },
          { t: '抢在乱前，举家投强藩', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 5; s.flags['投藩'] = 1; return '你举家投了本地起事的豪强，献了钱粮。豪强给了你一个粮曹的位子——位子小，乱大，你坐得很稳。'; } },
          { t: '远走江都，避祸观变', dim: 'xiu', time: '半载', fx: function (s) { s.hidden.yun += 6; s.attrs.cai += 4; s.flags['走江都'] = 1; return '你去了江都，在漕船上做工。天下大乱的消息隔三个月才到你——你隔岸观火，火光里学完了半部乱世处世经。'; } }
        ] }
    ],
    endings: [
      { name: '开河功曹', group: '隋显', pri: 68,
        score: function (s) { var v = (s.attrs.xin - 55) * 0.8 + (s.flags['督工分段'] || s.flags['河役'] ? 12 : 0) + (s.dimCount.shi || 0) + (s.attrs.cai - 50) * 0.4; return Math.max(0, Math.min(100, v)); },
        verdict: '运河通了他没看见的千年，他守住了身边的一乡。',
        epilogue: '乱平之后，新朝的官来查河役旧档——你乡的役册最清，死伤最少。\n官问：何人主之？乡人指了指堤上那座小坟。\n官把坟修了修，说：河是他的碑。' },
      { name: '乱世漕客', group: '隋中', pri: 50,
        score: function (s) { var v = (s.flags['漕商'] || s.flags['走江都'] ? 14 : 0) + (s.attrs.qian - 50) * 0.4 + (s.hidden.yun - 40) * 0.3; return Math.max(0, Math.min(100, v)); },
        verdict: '他在河上讨了一生生活，河替他记着岁数。',
        epilogue: '你在漕船上老去，桨换过九把。\n船工们说，你闭眼那天河上起了雾，雾里听不见橹声。\n你的粮账记了一辈子，一本没丢——后来新朝清粮政，用的是你孙儿献上的那本。' }
    ]
  };
})(window.GAME_DATA);
