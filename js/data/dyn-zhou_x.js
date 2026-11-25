/* 「西周」朝代内容包：礼乐既定，宗法为骨 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.zhou_x = {
    id: 'zhou_x', name: '西周',
    clock: { year: 1, season: 0 }, eras: [],
    events: [
      { id: 'zx_jitian', title: '籍田', tags: ['日常', '善缘'], weight: 11,
        story: '春耕籍礼，宗伯要选一个年轻子弟执耒演示。\n礼做得好，是宗族的体面；做得僵，是失仪。',
        options: [
          { t: '苦练一月，把礼做足', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ti += 3; s.attrs.ming += 6; return '籍礼那日你步履合度，进退有节。宗伯说：这个孩子，礼在心里。'; } },
          { t: '推说足疾，辞了这差', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你辞了。礼照做，体面照有，只是名册上没有你——也好。'; } },
          { t: '借籍礼与诸侯从人结交', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 4; s.attrs.ming += 3; s.hidden.yin -= 2; return '礼成宴上你敬了三国的从人。回来时袖子里多了三份请帖。'; } },
          { t: '当众指出仪程一处讹误', dim: 'yi', time: '数日', req: { cai: 35 }, fx: function (s) { s.attrs.cai += 6; s.attrs.ming -= 2; if (Math.random() < 0.5) return '你指的讹误属实，宗伯改了仪程。他记住了你——用一种复杂的眼神。'; return '你指错了。宗伯没发作，只说：回去把《礼》抄十遍。'; } }
        ] },
      { id: 'zx_zongmiao', title: '宗庙', tags: ['朝堂风波'], weight: 10,
        story: '宗庙年久失修，主祭时梁上落了灰。\n修庙要动用族中公产，几位长老为「该修哪一庙」吵了三日。',
        options: [
          { t: '主修祖庙，动公产', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 8; s.attrs.ming += 6; G.addFame(s, 'xiang', 5); return '祖庙修葺一新，主祭那日梁上再无落灰。长老们吵赢了各自的面子，你赢了一个「能办事」。'; } },
          { t: '倡俭，以苇席代修', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 3; return '你说礼在心不在椽。庙照旧，灰照落，老人们骂了一季，公产却保住了。'; } },
          { t: '两头劝，收两边的谢', dim: 'li', time: '半月', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 4; return '你来回传话，两边都谢了你。庙的事拖到明年，明年再吵。'; } },
          { t: '夜探宗庙，查出蛀梁之因', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 5; s.hidden.yun += 3; return '你夜里打着火把看梁，查出是白蚁，不是年久。治了蚁，省了大修。族老说：这孩子看东西，看根。'; } }
        ] },
      { id: 'zx_rongkou', title: '戎寇', tags: ['边境战事', '灾祸'], weight: 10,
        story: '戎人寇边，烽燧点起来了。\n族里丁壮要随王师出征，老弱要入城避祸。你家在城外有田，有粮，有祖坟。',
        options: [
          { t: '从王师出征', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti -= 5; s.attrs.ming += 7; if (Math.random() < 0.6) return '你随师出镐，戎人没敢近前。军功簿上有你的名字，田里的秋粮是家里人收的。'; return '追戎入谷，中了埋伏。你带着箭伤爬回来，队里少了三个人。'; } },
          { t: '护族中老幼入城', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 6; G.addFame(s, 'xiang', 6); s.attrs.ti -= 3; return '你押着三十多口老幼入城安置，一路没失一个人。城门吏说：这一队，是今天进得最齐的。'; } },
          { t: '运粮入城，趁机抬价', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 6; return '城里的粮价翻了倍。你赚了。戎退之后，有人在你家门上抹了一把泥。'; } },
          { t: '守田不走，赌戎不至', dim: 'yi', time: '数日', fx: function (s) { if (Math.random() < 0.4) { s.attrs.qian += 5; s.hidden.yun += 5; return '戎没来。你的田保住了，秋收比城里人还早。胆气这种东西，赌赢了叫胆气。'; } s.attrs.qian -= 10; s.attrs.ti -= 6; s.flags['遭寇'] = 1; return '戎来了。你躲进地窖活了下来，田里的秋粮成了别人的军粮。'; } }
        ] },
      { id: 'zx_liyue', title: '习乐', tags: ['日常'], weight: 9,
        story: '乐师收徒，教钟鼓与埙。\n他说：礼乐一体，知乐者知礼。学成要五年，五年的束脩不少——但出了师，走到哪国都有人请你。',
        options: [
          { t: '拜师，学满五年', dim: 'xiu', time: '三年', fx: function (s) { s.attrs.qian -= 8; s.attrs.cai += 8; s.attrs.xin += 5; s.flags['知乐'] = 1; return '五年下来，你能听出一钟的偏音。乐师说：你的耳朵成了。此后任何宴上，执钟的位置有你一个。'; } },
          { t: '只学一年，够用就停', dim: 'li', time: '一年', fx: function (s) { s.attrs.qian -= 3; s.attrs.cai += 4; return '你学了一年，宴上能应个景。乐师说你可惜，你说肚子要紧。'; } },
          { t: '借学乐之名，出入贵府', dim: 'yi', time: '一年', fx: function (s) { s.attrs.ming += 4; s.attrs.qian += 4; s.hidden.yin -= 3; return '你抱着埙在几家贵府间走动，音乐学了个半吊子，门路倒通了。'; } },
          { t: '替乐师整理旧谱，得其真传', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 3; return '你替他把散乱的旧谱理成册。他高兴，把不外传的一段教了你——理旧账的人，得新本事。'; } }
        ] },
      { id: 'zx_jingtian', title: '井田', tags: ['日常'], weight: 9,
        story: '公田的收成一年不如一年，私田倒绿得很。\n里正说这是天年；你蹲在田埂上看了一晌午，觉得不是。',
        options: [
          { t: '倡议改分田之法', dim: 'li', time: '一月', fx: function (s) { s.attrs.cai += 5; s.attrs.ming -= 2; if (Math.random() < 0.5) { s.attrs.qian += 5; return '你的分法试了一年，公田的收成起来了。里正脸上挂不住，心里记了你的好。'; } return '法子试了，没成。里正说：祖宗的田制，轮不到你改。你记下了教训。'; } },
          { t: '守规制，劝族人尽力公田', dim: 'shi', time: '一季', fx: function (s) { s.attrs.xin += 5; G.addFame(s, 'xiang', 4); s.attrs.ti -= 2; return '你带头先耕公田。一季下来公田的绿意回来了些。里正上报了你的名字。'; } },
          { t: '自家尽力私田，不多话', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.attrs.ming -= 2; return '你把力气全下了私田。收成好。公田荒着，荒着也是大家的荒。'; } },
          { t: '把公私田的差异写下来', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 4; s.hidden.zhi += 3; return '你用刀笔把两片田的差别刻在木板上。几十年后你的孙子翻出来，问这是什么。你说：是规矩开始松的声音。'; } }
        ] },
      { id: 'zx_guoren', title: '谤言', tags: ['朝堂风波'], weight: 8,
        story: '国人对朝政有怨言，王使在查「谤者」。\n有人劝你也去指认几个——查的人要数目，指认的人要赏钱。',
        options: [
          { t: '拒不作证，闭门自守', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 6; return '你闭门三日，谁来也不应门。查的人走了。后来路上行人以目，你至少不必用眼睛害人。'; } },
          { t: '指认仇家，借刀报怨', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 12; s.flags['构陷'] = 1; return '你的仇家被带走了。赏钱到手那夜你睡得极差。第二年他放回来了——他知道是谁。'; } },
          { t: '替被指认的邻人作保', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.ming += 6; s.hidden.yin += 5; s.attrs.qian -= 3; return '你出面作保，押上了自家的名。邻人放回来了。这城里的路，你从此走得更宽也更险。'; } },
          { t: '连夜把要紧的人送出城', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.yin += 6; s.attrs.qian -= 3; return '你把三个要被指认的人装进运菜的车送出城。查的人扑了个空。没人知道，你也不说。'; } }
        ] },
      { id: 'zx_liuji', title: '流彘', tags: ['朝堂风波', '灾祸'], weight: 8, minScene: 10,
        story: '国人暴动，王奔彘。\n城里乱了一日一夜。乱民烧了几个府邸，也顺火烧了些不相干的。你的门户、你的主家、你的出路，都在这一夜里。',
        options: [
          { t: '护送主家出城', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming += 5; return '你护着主家连夜出城，路上遇乱民两次，都是好话加散财过的。主家记了你一生。'; } },
          { t: '趁乱取些浮财', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 8; return '你从火场边拾了几箱没人认的东西。乱平之后有人来认，你推说不知。夜里的火光从此常入你梦。'; } },
          { t: '守门户，不参与者', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; return '你闩门两日。乱过了。街坊见面彼此点点头——都活下来了，都懂了。'; } },
          { t: '随乱众去冲王使的馆驿', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming -= 3; s.hidden.yun -= 5; if (Math.random() < 0.5) { s.attrs.qian += 5; return '馆驿里抄出不少东西，你分到一份。事后清查的风声紧，你埋掉了那份「运气」。'; } return '王师回城那日拿了一批人。你跑得快，名字没上簿——你从此再不信「乱中无人问」。'; } }
        ] },
      { id: 'zx_zhuhou', title: '朝觐', tags: ['朝堂风波'], weight: 8, minScene: 9,
        story: '族中长辈要带你去镐京朝觐。\n朝觐是见世面，也是递名帖——诸侯的从人里，有识人的眼睛。',
        options: [
          { t: '随行朝觐，谨言慎礼', dim: 'shi', time: '一月', fx: function (s) { s.attrs.ming += 5; s.attrs.xin += 4; return '你在镐京见了天子仪仗，回家后走路都慢了三分。见过大场面的人，沉得住气。'; } },
          { t: '在从人宴上露一手才艺', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.cai += 4; s.attrs.ming += 5; s.hidden.yun += 2; return '你鼓了段钟。一位大夫问：谁家子弟？族老替你答了。那位大夫的名字，你记了一生。'; } },
          { t: '替长辈跑腿，摸清朝中人情', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 3; s.attrs.cai += 3; s.hidden.yin -= 2; return '你跑遍了该跑的门。人情账记了满满一册——册子后来烧了，账在你心里。'; } },
          { t: '称病不去，避这趟风头', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; s.hidden.zhi += 2; return '你没去。朝觐的行列里没有你，你的名字也少了一次进眼睛的机会。'; } }
        ] }
    ],
    main: [
      { id: 'zx_m1', title: '冠礼', after: 0, time: '数日',
        story: '你行冠礼了。\n加冠三次，每次都是不同的祝词。最后一次，你的父亲——或者主家的长辈——为你取字，然后说：从今日起，你说的每一句话，都有人当真了。',
        options: [
          { t: '谢尊长，誓守家法', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 5; return '你把誓词念得极稳。长辈们交换了一个满意的眼神。你从此有了字，也有了被当真的资格。'; } },
          { t: '问：若家法与礼相悖呢？', dim: 'yi', time: '数日', fx: function (s) { s.attrs.cai += 6; s.hidden.zhi += 4; s.flags['冠礼之问'] = 1; return '满堂静了片刻。长辈说：好问题——用一辈子去答。这个问，后来在族中传了很多年。'; } },
          { t: '只磕头，不说话', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; return '礼成。你把那句话咽了下去。咽下去的话没有消失，只是换了地方住。'; } },
          { t: '收宾客的贺仪，笑纳', dim: 'li', time: '数日', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 2; return '贺仪收了不少。你第一次明白「冠」字的另一面：它意味着你有资格收钱了。'; } }
        ] },
      { id: 'zx_m2', title: '东迁之兆', after: 12, time: '一月',
        story: '镐京的方向夜里有异光，流言说戎人年内必大举。\n族老们议了三夜：走，还是守？祖坟在，宗庙在，可乱世里活人比死人要紧。',
        options: [
          { t: '主东迁，举族随王师', dim: 'shi', time: '一月', fx: function (s) { s.attrs.xin += 6; s.attrs.ming += 6; s.flags['主东迁'] = 1; return '你的话在族议上起了作用。族里开始收拾细软、祭器、种子。宗庙搬不走的，派人岁岁遥祭。'; } },
          { t: '主守祖地，生死于此', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 8; return '你说：坟在这里，人就在这里。一部分族人留了下来——留下来的人里，后来有活着的，也有没活着的。'; } },
          { t: '两头下注，分族而迁', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 5; s.hidden.yun += 6; s.flags['分族'] = 1; return '你劝族里分了两拨：一拨东迁，一拨留守。无论哪头成，族都能续——这话冷，但对。'; } },
          { t: '趁乱贱收田宅', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 8; return '要走的人贱卖了田。你用半价收了几块好地。天下要乱了，你的家底却厚了——这笔账，天不知怎么算。'; } }
        ] }
    ],
    endings: [
      { name: '守礼君子', group: '周显', pri: 68,
        score: function (s) { var v = (s.attrs.xin - 55) * 1.0 + (s.attrs.ming - 55) * 0.7 + (s.flags['冠礼之问'] ? 8 : 0) + (s.dimCount.xiu || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ xin: 60 }] },
        verdict: '礼崩的时代，他把自己活成了礼。',
        epilogue: '东迁的年月里，你带着族里的祭器走了很远的路。\n别人抢粮，你护鼎；别人烧谱，你抄谱。\n后来有人在新的都邑里重建宗庙，照的就是你手抄的仪程。你的名字刻在庙梁的背面——没人看见，但它在。' },
      { name: '乱邦遗黎', group: '周中', pri: 46,
        score: function (s) { var v = (100 - s.attrs.ming) * 0.3 + (s.flags['遭寇'] ? 10 : 0) + (s.hidden.yun - 40) * 0.3; return Math.max(0, Math.min(100, v)); },
        verdict: '王奔彘，人奔命。他只是活下来了。',
        epilogue: '那一年你换了个地方住，换了个姓叫。\n新的地方的人问你的来历，你说：从西边来的。\n西边有什么？你望着东边的日头，说：有我没赶上的事。' }
    ]
  };
})(window.GAME_DATA);
