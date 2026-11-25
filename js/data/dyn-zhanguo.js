/* 「战国」朝代内容包：变法图强，游士纵横 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.zhanguo = {
    id: 'zhanguo', name: '战国',
    clock: { year: 1, season: 2 }, eras: [],
    events: [
      { id: 'zg_bianfa', title: '投效变法', tags: ['朝堂风波'], weight: 11,
        story: '本国行变法，新法刻在市门，一字一刑。\n变法的大夫要人手。投他，是往上走；新法得罪的人多，也是往火里走。',
        options: [
          { t: '投身新法之门', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 7; s.hidden.yin -= 4; s.flags['佐新法'] = 1; return '你在新法门下做了属吏。执法三个月，市门下骂你的人排成一排——上头看见的，正是这一排。'; } },
          { t: '研习法家之学再投', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 3; return '你把刑名之书读了一季。去投时，谈锋一出，门客改口称先生。'; } },
          { t: '守旧业，不沾法事', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; return '你守着老本行。新法推行了，日子变了，你家的规矩没变。'; } },
          { t: '暗中替旧贵族递话', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; s.flags['两头走'] = 1; return '旧贵族的谢仪丰厚。你在两扇门之间走了三月，练出了两副脸。'; } }
        ] },
      { id: 'zg_youshui', title: '游说', tags: ['朝堂风波'], weight: 10,
        story: '合纵连横之说盛行。有策士到你乡中来，说可带你入仕——路费他出，功名你分他一半。',
        options: [
          { t: '同行游说，共谋功名', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.flags['游士'] = 1; return '你们说动了两个小国。分功时他拿七你拿三——他说：人是我带的。你记下了这句话，也记下了这个分法。'; } },
          { t: '自游自说，不受人辖', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian -= 5; s.attrs.cai += 6; s.attrs.ming += 4; if (Math.random() < 0.4) { s.attrs.ming += 6; return '你独自说动了一国之相。你的名字第一次被写进国书——写的时候，手都悬了三悬。'; } return '你游了三国，国库空了，话没卖出去。回来时鞋底磨穿，学问倒厚了。'; } },
          { t: '留在乡里，只听新闻', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你听着过路的策士讲天下大势，听完回家吃饭。天下很大，你的田很小，都顾了。'; } },
          { t: '做策士的耳目，收两国的钱', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 8; s.flags['买消息'] = 1; return '你在驿道上卖消息，两国的行人都成了你的主顾。情报这行，活着赚钱，死了成仇。'; } }
        ] },
      { id: 'zg_baijia', title: '百家', tags: ['日常'], weight: 10,
        story: '稷下的学风，闻于天下。\n各家争鸣，路上随便拦一个游学的人，都可能是一派的传人。你也可以去听一季——学费是时间。',
        options: [
          { t: '入稷下，从一家而学', dim: 'shi', time: '一年', fx: function (s) { s.attrs.cai += 9; s.attrs.xin += 4; s.flags['稷下学'] = 1; return '你选了法家入门，儒墨都去旁听。一年下来，你的辩才让同门头疼。'; } },
          { t: '遍听百家，不主一门', dim: 'li', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming -= 2; return '你什么都听，什么都不认。有人讥你无根，有人赞你通达——两边的道理你都收下了。'; } },
          { t: '自创新说，与人论战', dim: 'yi', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 6; s.hidden.yun -= 3; return '你的新说在辩论场上掀了桌子。赞的人传抄，骂的人上书——稷下的规矩：越挨骂，越有名。'; } },
          { t: '不远行，在家读书', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 4; return '你把家里仅有的几卷书读烂了。烂书比新学扎实——这是你后来才懂的话。'; } }
        ] },
      { id: 'zg_zhanguo', title: '围城之岁', tags: ['边境战事', '灾祸'], weight: 10,
        story: '大战之年，你乡所在的城被围了两次。\n第二次围城时，城里已经吃过树皮。守将与围将原是同门——有人在城头喊话叙旧，城下的人听得心酸。',
        options: [
          { t: '登城助守', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti -= 6; s.attrs.ming += 6; if (Math.random() < 0.5) { s.attrs.xin += 6; return '围解于雨季。你从城上下来时，邻居们扶着你走完了半条街。'; } s.flags['城陷'] = 1; s.attrs.ming -= 5; return '城陷那夜你混在难民里出城。活着，比什么功名都值钱——这是那夜教的。'; } },
          { t: '组织乡人挖井储粮', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.cai += 5; G.addFame(s, 'xiang', 6); return '你早一个月让人挖了井、存了粮。第二次围城，你乡是城里唯一没断水的。'; } },
          { t: '趁乱出逃，弃城而去', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yun += 5; s.hidden.yin -= 3; return '你带着家人在围城前走了。城破的消息传到你在的新居，你关了一夜门。'; } },
          { t: '给两边卖粮', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 12; s.hidden.yin -= 10; s.flags['战时贩粮'] = 1; return '城里的粮你卖过，围军的粮你也卖过。战后两边都活着——都知道了，都没动你。这种平衡，你不觉得是本事，觉得是债。'; } }
        ] },
      { id: 'zg_hufu', title: '胡服', tags: ['日常'], weight: 9,
        story: '北边的国改穿胡服骑射，本国士大夫哗然：衣冠之变，是礼之崩。\n市井里却有人悄悄改了裤脚——打仗的命，比体面紧。',
        options: [
          { t: '率先改服，习骑射', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 6; s.attrs.ming += 5; s.hidden.yin -= 3; s.flags['胡服'] = 1; return '你第一个穿上胡服上街，被老人啐过，也被年轻人围着学。半年后，军中的骑手缺了你会少一半力气。'; } },
          { t: '上书言衣冠之重', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 5; s.attrs.xin += 4; return '你的书递了上去，被压了。三个月后骑射营扩编，你的书成了笑谈——也成了你不肯改的凭据。'; } },
          { t: '改良胡服，使其合于礼', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; return '你把胡服的领口改回交衽，裤脚收窄。两边的老人都点了头——折中的东西，活得久。'; } },
          { t: '不改，静观其变', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你穿着旧衣看新法推行。三年后满街胡服，你的旧衣成了稀罕物——稀罕，不是对。'; } }
        ] },
      { id: 'zg_jintai', title: '金台招贤', tags: ['善缘', '日常'], weight: 9,
        story: '某国筑金台招贤，四方之士云集。\n你可以去碰碰运气——台上的位子有限，台下的人很多，管饭的时间很短。',
        options: [
          { t: '上金台自荐', dim: 'shi', time: '一月', fx: function (s) { if (Math.random() < 0.45 + s.attrs.cai / 250) { s.attrs.ming += 8; s.attrs.cai += 4; s.flags['台上客'] = 1; return '你的对答让接引的大夫起身让座。你成了台上的客，俸禄不高，名字进了国书的草稿。'; } s.attrs.qian -= 3; return '台上三日，你连说话的次序都没排上。回来时你把这次丢脸记成了功课。'; } },
          { t: '先在台下扬名，再上台', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 6; return '你先在台下的论辩里赢了三场。上台那日，接引的人已经听过你的名字——名声是走上去的台阶。'; } },
          { t: '替上台的士人跑腿安顿', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.ming += 2; return '你替十几个贤士安排住处，收了些辛苦钱，也收了十几个未来的人情。'; } },
          { t: '不去，笑其招摇', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.hidden.zhi += 3; return '你没去。金台招了很多人，也招了很多笑话。你的笑话没参与——你在家把自家的笑话想明白了。'; } }
        ] },
      { id: 'zg_shangzhan', title: '农战', tags: ['日常'], weight: 8, minScene: 8,
        story: '国法重农战：斩首一级，爵一级；惰农者，罚。\n你的邻人铤而走险去军中搏爵，也有人把地种得比谁都细。爵与谷，两条路摆在你门前。',
        options: [
          { t: '投军搏爵', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 5; s.attrs.ming += 6; if (Math.random() < 0.5) { s.flags['斩首之功'] = 1; s.attrs.qian += 5; return '你带回来一颗记功的首级与一级爵位。夜里你数着爵位的田赏，手抖了很久。'; } s.attrs.ti -= 8; return '你空手而回。同什的人死了一半，你活着——活着就已经是那半边的运气。'; } },
          { t: '精耕其田，以谷为业', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.attrs.ti += 3; return '你把田种成了样板。官府来劝农，让你站在田头讲——讲的是谷，记的是你的名字。'; } },
          { t: '承包军中的粮秣转运', dim: 'li', time: '一季', req: { qian: 12 }, fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 4; s.flags['军运'] = 1; return '你包下了三条粮道。仗打了一年，你的车队没断过——战场上死人的事你没沾，运死人粮的事你沾了。'; } },
          { t: '读书入幕，避开农战之途', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 3; return '你进了幕府做书吏。爵位与谷都没你的份，你的份是文书与见识。'; } }
        ] },
      { id: 'zg_yishu', title: '徙木', tags: ['朝堂风波'], weight: 9, minScene: 10,
        story: '南门立了一根木，悬赏：徙至北门者，予金。\n众人围观，无人敢动——赏太厚，事太轻，必有诈。你站在人群里，想了很久。',
        options: [
          { t: '揭榜徙木', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 8; s.attrs.qian += 6; s.flags['徙木'] = 1; return '你把木头扛到了北门，金当场兑现。围观的人后来都记住了两件事：这个人的名字，和「官府的话是真的」这一件。'; } },
          { t: '劝旁人先试', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 2; s.hidden.yin -= 2; return '你撺掇了一个愣头青去扛。金他拿了，你的名字没出现——这种便宜，占一次就够了。'; } },
          { t: '进言：立法先立信', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; return '你上书说：徙木不是搬木头，是搬人心。上头批了「知道」。半年后新法推行，用的正是这个路数。'; } },
          { t: '转身去查立木的用意', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 3; return '你顺着运木的车查了半日，猜出这是试探民心。你去投了主持其事的大夫——猜中人心的人，人心也会给他开门。'; } }
        ] }
    ],
    main: [
      { id: 'zg_m1', title: '负笈', after: 0, time: '数日',
        story: '你十五岁，背着一卷竹简离家游学。\n送你的母亲在村口站了很久。战国的事你还不懂，只知道书在怀里，路在脚下。\n路上有人对你说：这年头，学问不值钱，刀剑值钱。也有人摇着扇子说：错了，天下最缺的是会说话的人。',
        options: [
          { t: '信刀剑，先习击剑', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 6; s.hidden.yun += 3; return '你学了半年剑，手上有了茧，也有了底气。书你没丢，夜里还读。'; } },
          { t: '信学问，负笈入城', dim: 'li', time: '一季', fx: function (s) { s.attrs.cai += 7; s.flags['游学'] = 1; return '你进了城中的学馆，一季没出馆门。出关那日，先生的荐书在你袖子里。'; } },
          { t: '两头都要，累坏了身子', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ti -= 3; s.attrs.cai += 4; s.attrs.ti += 2; return '你白天习剑夜里读书，一季瘦了十斤。两样都懂一点的人，乱世里最抢手，也最先累死。'; } },
          { t: '回家，不游了', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; return '你走了三十里又折回来。母亲没骂你。第二年你又开始收拾行囊——这次没跟任何人说。'; } }
        ] },
      { id: 'zg_m2', title: '天下之问', after: 12, time: '一月',
        story: '有名士断言：天下将定于一。\n定于谁？各国都在猜，也都在赌。你的主公问你：依你之见，我们该站在哪一边？\n这一问，问的是十年后的生死。',
        options: [
          { t: '答：谁不守旧制，谁得天下', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 6; s.flags['识势'] = 1; return '你说了那句话，主公拍案而起。十年后天下归了那一家，你的判断成了他一生最得意的一次纳言。'; } },
          { t: '答：守好自己，天下自会来问', dim: 'xiu', time: '一季', fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 4; return '你劝他修内政、储粮食、不站队。十年后大国相争，你们这样的小国，因为谁都不值得打而活了下来。'; } },
          { t: '劝主公送质于强邻', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; return '质子送去了，太平了五年。你看着质子的车驾出城，心里清楚：这不是太平，是分期还债。'; } },
          { t: '借问献策，自求出使', dim: 'yi', time: '一月', fx: function (s) { s.attrs.ming += 6; s.attrs.cai += 4; s.hidden.yun -= 3; s.flags['出使'] = 1; return '你讨了差事去了三个国。命保住了，见识长了一倍——乱世里，跑得远的人看得准。'; } }
        ] }
    ],
    endings: [
      { name: '佐命之臣', group: '战显', pri: 74,
        score: function (s) { var v = (s.attrs.cai - 55) * 1.0 + (s.flags['识势'] ? 14 : 0) + (s.attrs.ming - 60) * 0.6 + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 62 }] },
        verdict: '他押中了时代的方向，也搭上了自己的一世。',
        epilogue: '天下定于一之后，你的旧主成了新朝的功臣，你成了功臣的功臣。\n新法的刻石上有你的名字——那块石头今天还在。\n你晚年很少说话。有人问你对新法看法，你指着刻石说：都在上面了。' },
      { name: '布衣游士', group: '战中', pri: 50,
        score: function (s) { var v = (100 - s.attrs.ming) * 0.25 + (s.flags['游士'] ? 8 : 0) + (s.attrs.cai - 40) * 0.4; return Math.max(0, Math.min(100, v)); },
        verdict: '他没能改变天下，天下也没能改变他。',
        epilogue: '你游了一生，说动了几个大夫、几个县令、许多个不听的人。\n你的书没能流传，你的话有一部分活在了学生的嘴里。\n你死在一间客栈。店主记得你，因为你付账从来爽快。' }
    ]
  };
})(window.GAME_DATA);
