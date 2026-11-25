/* 唐 · 长安与塞上 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.tang = {
    id: 'tang',
    name: '唐',
    desc: '胡风满市，诗酒盈城。关陇的刀与江南的米养着一个极盛的天下；极盛之下，藩镇渐重，边烽未息。',
    clock: { year: 1, season: 0 },
    eras: [
      { name: '贞观', span: 23 },
      { name: '永徽', span: 6 },
      { name: '显庆', span: 6 },
      { name: '麟德', span: 3 },
      { name: '开元', span: 29 },
      { name: '天宝', span: 15 },
      { name: '至德', span: 4 }
    ],

    events: [

      /* 一 · 行卷 */
      {
        id: 'tang_keju_xingjuan',
        title: '行卷',
        tags: ['朝堂风波', '日常'],
        weight: 14,
        loc: '长安·崇仁坊',
        time: '旬日',
        minScene: 1,
        story: '崇仁坊的客栈里，举子们把诗文抄在厚纸上，卷成轴，一早就出门去投。门子接了卷，只说一句「放着吧」，便不再看你。\n李慕之把自家那卷掂了掂，苦笑道：「我这一卷，投了七家，没有一家回。」',
        options: [
          {
            t: '再誊一遍，投到著作郎门下', dim: 'shi', time: '一月',
            req: { cai: 38 },
            fx: function (s) {
              s.attrs.cai += 7; s.attrs.ming += 4; s.attrs.qian -= 4; s.hidden.zhi += 4;
              s.flags['行卷'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 6;
              return '你又磨了一夜的墨，把旧作删去三首，添了一篇论盐铁。投进去第十日，门子忽然叫住你，说著作郎问了一句：这后生是哪里人。这一句，够你记很久。';
            }
          },
          {
            t: '凑钱通门子，求一个当面', dim: 'li', time: '旬日',
            req: { qian: 28 },
            fx: function (s) {
              s.attrs.qian -= 18; s.attrs.ming += 7; s.hidden.yin -= 4;
              s.flags['行卷'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '门子收了钱，把你从侧门带进去。著作郎正与人下棋，头也没抬，只让你念一首。你念完，他落了一子，说：「字不错。」你退出来时，腿是软的。';
            }
          },
          {
            t: '把诗卷收进箱底，闭门读书', dim: 'xiu', time: '半载',
            fx: function (s) {
              s.attrs.cai += 9; s.attrs.xin += 6; s.attrs.ming -= 3;
              s.flags['闭门读书'] = 1;
              return '你把那卷纸压在箱底，从此日课一章。窗外春去秋来，坊里的举子换了一茬，只有你灯下那本旧书，翻得起了毛。';
            }
          },
          {
            t: '拦在路口，把卷子塞进贵人车中', dim: 'yi', time: '数日',
            req: { ming: 20 },
            fx: function (s) {
              s.attrs.ming += 10; s.attrs.xin -= 3; s.hidden.yun += 5; s.hidden.zhi += 6;
              s.flags['行卷'] = 1; s.flags['惊动贵人'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 4;
              return '车帘掀开一线，里头的人看了你一眼，收下了。第二日，坊间便有人说，有个不要命的举子拦了裴家的车。你听着，不知是祸是福。';
            }
          }
        ]
      },

      /* 二 · 曲江宴 */
      {
        id: 'tang_jinshiyan',
        title: '曲江宴',
        tags: ['朝堂风波', '善缘'],
        weight: 11,
        loc: '长安·曲江',
        time: '半月',
        minScene: 4,
        cond: { flag: '行卷' },
        story: '新科进士赐宴曲江，杏园里探花使骑马先出，一路有人掷花。你坐在末席，酒是新酿的，杯底沉着一点花屑。\n裴敬在隔壁席，隔着几案问你：「听说你的卷子，被人贴在贡院墙上了？」',
        options: [
          {
            t: '即席赋诗，让众人传看', dim: 'shi', time: '半月',
            req: { cai: 46 },
            fx: function (s) {
              s.attrs.cai += 8; s.attrs.ming += 12; s.hidden.zhi += 5;
              s.flags['曲江赋诗'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 8;
              var m = G.npc(s, 'li', { name: '李慕之' }); m.rel += 4;
              return '你借了邻座的笔，就着酒盏写下四句。传到第三席，有人击节，有人不服。日头偏西时，连对岸的船家都在念那一句。';
            }
          },
          {
            t: '借机结识几位豪家子弟', dim: 'li', time: '一月',
            req: { qian: 25 },
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.ming += 7; s.attrs.xin -= 4;
              s.flags['结交豪家'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 6;
              return '你换了两回席，敬了三巡酒。有人拍着你的肩说将来有事尽管来寻，你笑着应下。散席时，袖中多了几张名帖，也多了一笔说不清的账。';
            }
          },
          {
            t: '饮尽一杯，早些离席', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 6; s.attrs.ming += 2;
              return '你独自出了杏园。曲江边柳色正新，游人还没散，笑声隔水传来。你走了一段，忽然觉得这满城的热闹，与自己隔着一层薄薄的纸。';
            }
          },
          {
            t: '替落第的旧友争一个席位', dim: 'yi', time: '旬日',
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.ti -= 3; s.hidden.yin += 7;
              s.flags['重情义'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 14;
              return '你与掌事的人争了几句，末了把自己的座位让出去。李慕之坐在那里，一晚上没怎么说话，临走时只对你拱了拱手。那一年他没中，你中了。';
            }
          }
        ]
      },

      /* 三 · 西市胡商 */
      {
        id: 'tang_xishi_hushang',
        title: '西市胡商',
        tags: ['日常', '江湖奇遇'],
        weight: 16,
        loc: '长安·西市',
        time: '旬日',
        story: '西市日中击鼓，三百余行一齐开门。波斯邸前堆着香料、琉璃与织毯，胡商卷着舌说话，价码写在木牌上。\n沈九娘在摊子后头拨算盘，见你来了，抬一抬下巴：「这批胡椒，他说路上折了半船。你信么？」',
        options: [
          {
            t: '与她合本，吃下这一批', dim: 'li', time: '两月',
            req: { qian: 45 },
            fx: function (s) {
              s.attrs.qian += 35; s.attrs.ming += 6; s.hidden.zhi += 4;
              s.flags['西市有本'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 14;
              return '你们把货分了，一半入仓，一半转手。九娘夜里对账，算盘珠子响到三更，末了把一袋钱推过来：「郎君那份。」她眼里有笑，也有掂量。';
            }
          },
          {
            t: '替胡商写一份汉文契书', dim: 'shi', time: '数日',
            req: { cai: 32 },
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.qian += 10; s.attrs.ming += 4;
              s.flags['识胡语'] = 1;
              return '你替他写明货数、脚钱与违约之罚，字字清楚。胡商听完译语，竖起拇指，硬塞给你一小袋龙脑。九娘在旁边看着，说你这笔字，比货值钱。';
            }
          },
          {
            t: '只买一味药，替他扶一扶秤', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.qian -= 6; s.attrs.xin += 5; s.hidden.yin += 5;
              return '你买了半两苏合香，顺手把歪了的秤杆扶正。胡商看了你一眼，忽然用生硬的汉话说：「你，好人。」这话在市里不值钱，你却记了一路。';
            }
          },
          {
            t: '当众揭他掺了假', dim: 'yi', time: '半月',
            fx: function (s) {
              s.attrs.ming += 9; s.attrs.ti -= 2; s.hidden.yin += 6; s.hidden.yun -= 3;
              s.flags['西市结怨'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 8;
              return '你捻出一撮，摊在掌上，说是掺了木屑。围观的人哄然。胡商脸色变了，市署的人过来封了半摊货。九娘拉你到一边，低声道：「痛快是痛快，往后这条街你少来。」';
            }
          }
        ]
      },

      /* 四 · 平康坊 */
      {
        id: 'tang_pingkang',
        title: '平康夜',
        tags: ['日常', '情缘'],
        weight: 13,
        loc: '长安·平康坊',
        time: '数日',
        minScene: 3,
        story: '平康坊的灯，比别处亮得久。巷口挂着红纱，琵琶声从楼上漏下来，一句一顿。沈九娘换了身衣裳，替人照看席面，见你来了，把你引到靠窗的位子。\n帘后有个女子在调弦，调了很久，也没弹。',
        options: [
          {
            t: '与席上士子联句，斗一回诗', dim: 'shi', time: '数日',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 6; s.attrs.ming += 9; s.hidden.zhi += 4;
              s.flags['平康联句'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 6;
              return '你们一人一句，斗到后来，帘后那女子忽然接了下句，声音不高，满席却静了。她隔着纱帘说：「郎君这一句，留给我罢。」';
            }
          },
          {
            t: '出钱替她赎了身', dim: 'li', time: '两月',
            req: { qian: 70 },
            fx: function (s) {
              s.attrs.qian -= 55; s.attrs.ming += 10; s.hidden.yin += 8;
              s.flags['赎人'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 18;
              return '鸨母数了三遍钱，才把契纸推过来。那女子接过，看了半晌，忽然问你：「郎君要我去哪里？」你竟答不上来。九娘在一旁轻轻咳了一声。';
            }
          },
          {
            t: '独坐听完整阙，起身告辞', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 6; s.hidden.zhi += 3;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 4;
              return '她终于弹了，一曲三折，弹到末了，弦上有一点颤。你没有留话，推门出去。夜风一吹，那点余音才从衣领里散掉。';
            }
          },
          {
            t: '替她挡下强要留客的人', dim: 'yi', time: '半月',
            fx: function (s) {
              s.attrs.ti -= 6; s.attrs.ming += 11; s.hidden.yin += 9; s.hidden.yun -= 4;
              s.flags['平康结怨'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 12;
              return '那人醉得厉害，抬手就掀了案。你横过去一步，酒壶碎在肩上。楼下的人上来拉架，乱到坊门要闭。她蹲下来替你按住伤口，手是抖的。';
            }
          }
        ]
      },

      /* 五 · 宵禁 */
      {
        id: 'tang_xiaojin',
        title: '街鼓',
        tags: ['日常', '灾祸'],
        weight: 15,
        loc: '长安',
        time: '数日',
        story: '日暮，承天门上击鼓八百声，坊门一扇扇合拢。你从东市出来晚了，赶至坊门口，门吏正把横木落下。\n街角有人提灯站着，是严七。他不急，慢慢道：「鼓绝了。郎君是读书人，该知道规矩。」',
        options: [
          {
            t: '塞些钱，请他把门开一线', dim: 'li', time: '数日',
            req: { qian: 18 },
            fx: function (s) {
              s.attrs.qian -= 12; s.attrs.ming -= 2; s.hidden.yin -= 3;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10;
              return '他把钱掂了掂，收进袖里，侧身让开半步。门只开了一线，你挤进去，听见横木在身后落下。严七说：「下回早些。」';
            }
          },
          {
            t: '与他讲律，说鼓未尽', dim: 'shi', time: '数日',
            req: { cai: 35 },
            fx: function (s) {
              s.attrs.ming += 6; s.attrs.cai += 3; s.hidden.zhi += 4;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 4;
              return '你引了《杂令》一句，又指天上的星位。严七听着，忽然笑了：「郎君懂得多。可这横木，是我落下的。」他终究没开。你在檐下坐了一夜。';
            }
          },
          {
            t: '退到墙根，坐到天明', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 5; s.attrs.ti -= 3;
              return '夜里起了风，你缩在墙根，看巡夜的灯一队队过去。天将明时，卖胡饼的先支起炉子，炭火一亮，整条街才活过来。你拍拍衣裳，回坊去了。';
            }
          },
          {
            t: '翻墙入坊，赌他追不上', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.ti += 4; s.attrs.ming += 3; s.hidden.yun += 3; s.hidden.yin -= 2;
              s.flags['犯夜'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 8;
              return '墙头有碎瓦，你落下去时崴了一下，忍着没出声。严七的灯在墙外停了一停，又走了。第二日他见了你，只笑一笑，什么也没说。那笑比刀还冷。';
            }
          }
        ]
      },

      /* 六 · 藩镇辟召 */
      {
        id: 'tang_fanzhen',
        title: '节度辟书',
        tags: ['朝堂风波'],
        weight: 10,
        loc: '长安',
        time: '一月',
        minScene: 5,
        story: '范阳节度使遣使入京，辟召幕僚。使者坐在客舍里，案上摊着空白告身，见你进来，先看你的手，再看你的眼。\n「边镇缺人，」他说，「去了，三年可为一州。」',
        options: [
          {
            t: '应辟，收拾行装北上', dim: 'shi', time: '一季',
            req: { cai: 48 },
            fx: function (s) {
              s.attrs.cai += 7; s.attrs.ming += 8; s.attrs.qian += 15; s.hidden.zhi += 6;
              s.flags['入幕'] = 1; s.flags['北去'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 4;
              return '使者在告身上填了你的名，墨迹未干便催你上路。出通化门时，裴敬来送，站在道边，只说了一句：「边镇的酒烈，别喝太多。」';
            }
          },
          {
            t: '先问俸禄与去留，再谈其他', dim: 'li', time: '一月',
            req: { qian: 20 },
            fx: function (s) {
              s.attrs.qian += 28; s.attrs.ming += 4; s.attrs.xin -= 3;
              s.flags['入幕'] = 1;
              return '你问得细，使者倒也不恼，一条条答了。末了他说：「京里的读书人，都像你这样精明，边关就好守了。」话里有刺，你只当没听出来。';
            }
          },
          {
            t: '以母老为由，婉辞', dim: 'xiu', time: '一月',
            fx: function (s) {
              s.attrs.xin += 7; s.attrs.ming -= 2; s.hidden.yin += 4;
              s.flags['辞辟'] = 1;
              return '你把告身推回去，说家中老母无人奉养。使者看了你许久，收起了纸。他走后，你在窗前坐到天黑。有些门，推开了是路，关上了也是路。';
            }
          },
          {
            t: '荐李慕之代己，自己求为副', dim: 'yi', time: '一季',
            req: { cai: 42 },
            fx: function (s) {
              s.attrs.ming += 6; s.attrs.cai += 4; s.hidden.yin += 7;
              s.flags['入幕'] = 1; s.flags['荐友'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 18;
              return '你把李慕之的文章推到使者面前，说此人胜你十倍。使者读了半篇，抬头问：「他肯去？」李慕之在门外站着，袖子都攥皱了。他后来去了。';
            }
          }
        ]
      },

      /* 七 · 募兵 */
      {
        id: 'tang_mubing',
        title: '募兵帖',
        tags: ['边境战事', '灾祸'],
        weight: 13,
        loc: '河内',
        time: '旬日',
        minScene: 3,
        story: '村口贴了募兵的榜，墨迹被雨打花了一半。募兵不比府兵，去了便吃官粮，安家钱当场发。阿禾挤在榜下看了很久，回头问你：「你说，我去不去？」\n他家里只剩一个瞎眼的祖母。',
        options: [
          {
            t: '劝他留下，替他寻一份活计', dim: 'shi', time: '一月',
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.qian -= 8; s.hidden.yin += 8;
              s.flags['留阿禾'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 16;
              return '你拉着他离开榜下，说城里粮行正缺人手。他一路没说话，到了粮行门口，忽然问你：「那将来呢？」你没答上来。他到底留下了。';
            }
          },
          {
            t: '替他领了安家钱，自己抽一份', dim: 'li', time: '数日',
            req: { qian: 15 },
            fx: function (s) {
              s.attrs.qian += 22; s.attrs.ming -= 4; s.hidden.yin -= 9;
              s.flags['阿禾从军'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel -= 10;
              return '你替他画了押，钱过手时留下两串。他背着弓走的那天，祖母在门口摸他的脸，摸到弓弦，手停住了。你站在人群后面，没上前。';
            }
          },
          {
            t: '替他备一双鞋，送到队尾', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 6; s.attrs.qian -= 5; s.hidden.yin += 6;
              s.flags['阿禾从军'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 8;
              return '你把新纳的鞋塞给他，他愣了一下，说军中发靴。你说拿着。队伍开拔时他回头看了三次，第三次已经看不清脸了。';
            }
          },
          {
            t: '与他一同应募，去边关搏一场', dim: 'yi', time: '两载',
            fx: function (s) {
              s.attrs.ti += 10; s.attrs.ming += 10; s.attrs.qian += 10; s.attrs.xin -= 2;
              s.flags['阿禾从军'] = 1; s.flags['从军'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 20;
              return '你们同一天画押，同一天换上短褐。出村那日，祖母没有出来。阿禾走在前面，背影比从前直。你忽然明白，有些路是自己选的，有些是被这一眼推着走的。';
            }
          }
        ]
      },

      /* 八 · 度牒 */
      {
        id: 'tang_dudie',
        title: '度牒',
        tags: ['日常', '鬼神异闻'],
        weight: 12,
        loc: '长安·荐福寺',
        time: '一月',
        story: '寺里新到一批度牒，有了它，便可免役、免赋，在寺中挂单。求牒的人从山门排到街口，有真信佛的，也有只为躲一纸差役的。\n徐翁在廊下晒药，见你来了，说：「你也来求这个？」',
        options: [
          {
            t: '落发受戒，真心入空门', dim: 'xiu', time: '半载',
            fx: function (s) {
              s.attrs.xin += 9; s.attrs.ti -= 4; s.attrs.ming += 3; s.hidden.yun += 4;
              s.flags['度为僧'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 10;
              return '戒坛上香灰很厚，刀落下时，你听见自己心里有什么也断了。师父赐你一个法名，念了三遍你才应。夜里睡在通铺，隔壁的鼾声很响，你却睡得比在家时安稳。';
            }
          },
          {
            t: '出钱买一张牒，不落发', dim: 'li', time: '半月',
            req: { qian: 35 },
            fx: function (s) {
              s.attrs.qian -= 25; s.attrs.ming += 5; s.hidden.yin -= 5;
              s.flags['买度牒'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 6;
              return '牒是从侧门递出来的，纸是官纸，印也是真印，只是持牒的人不必剃头。你把牒收进贴身，走路时能摸到那一块硬。夜里偶尔会想，这算不算欺了佛。';
            }
          },
          {
            t: '把此事告到祠部', dim: 'shi', time: '一季',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.cai += 4; s.hidden.yin += 5; s.hidden.yun -= 3;
              s.flags['揭度牒'] = 1;
              return '你写了一纸呈文，把事情从头到尾理清。祠部派人来查，寺里封了两间库房，知客僧被带走。山门口排了几日的人散了，有人回头骂了一句，不知骂谁。';
            }
          },
          {
            t: '冒用亡友之名，替他活下去', dim: 'yi', time: '一月',
            fx: function (s) {
              s.attrs.ming += 6; s.attrs.xin -= 4; s.hidden.yin += 9; s.hidden.zhi += 6;
              s.flags['冒名'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 5;
              return '那人死在半年前，牒还没领。你替他领了，也替他给家中捎了信。用他的名字过日子，起初夜里会醒，后来连自己都快信了。';
            }
          }
        ]
      },

      /* 九 · 时疫 */
      {
        id: 'tang_shiyi',
        title: '时疫',
        tags: ['天灾时疫', '灾祸'],
        weight: 11,
        loc: '长安',
        time: '两月',
        minScene: 5,
        story: '入夏雨多，城东先病了几家，不出十日，坊里便不许人随意出入。药铺的门板只开一条缝，递出来的药贵了三倍。\n徐翁背着一只旧药箱，从巷子里出来，袖口沾着黑血。他说：「这不是伤寒。你若要学，今夜就跟我走。」',
        options: [
          {
            t: '随他入疫巷，辨症施药', dim: 'xiu', time: '两月',
            req: { xin: 40 },
            fx: function (s) {
              s.attrs.ti -= 6; s.attrs.xin += 9; s.attrs.cai += 5; s.hidden.yin += 12; s.hidden.yun += 3;
              s.flags['知医'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 20;
              return '你跟着他一户一户地走，学着看舌、按腹、辨气。他把最后半包药分给一个孩子，自己只喝姜汤。第七夜他对你说：「医这东西，救不了命，只能替人挡一挡。」';
            }
          },
          {
            t: '报官请开义仓，设棚施药', dim: 'shi', time: '一季',
            req: { cai: 38 },
            fx: function (s) {
              s.attrs.ming += 12; s.attrs.cai += 5; s.attrs.qian -= 10; s.hidden.yin += 8;
              s.flags['设棚'] = 1;
              return '你在县衙门口站了半日，递了三道呈文。第三日义仓开了，城门口支起大棚。有人说你沽名，也有人排队时对你作揖。你没空理这些，只是催人再熬一锅。';
            }
          },
          {
            t: '趁药贵，把城里存药收进来', dim: 'li', time: '两月',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian += 40; s.attrs.ming -= 8; s.hidden.yin -= 12;
              s.flags['囤药'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '你收了三家药铺的底，囤在城南的仓里。价一日三涨，钱来得比做官还快。夜里数钱时，窗外有哭声，你听了一会儿，把窗关上了。';
            }
          },
          {
            t: '把病孩抱出巷子，另寻一处安顿', dim: 'yi', time: '一月',
            fx: function (s) {
              s.attrs.ti -= 4; s.attrs.ming += 6; s.hidden.yin += 10; s.hidden.yun -= 3;
              s.flags['救疫'] = 1;
              return '你抱出来的孩子烧得烫手，巡坊的人拿棍子拦你。你绕了半座城，才在废寺里找到一间空屋。孩子活下来了，你却病了一场，烧得说胡话。';
            }
          }
        ]
      },

      /* 十 · 河决 */
      {
        id: 'tang_hejue',
        title: '河决',
        tags: ['天灾时疫', '灾祸'],
        weight: 10,
        loc: '陕州',
        time: '一月',
        story: '秋汛，陕州一段河堤崩了。水漫过田，卷着屋梁往下游去。逃上来的人挤在土坡上，什么也没带，只抱着孩子。\n州里的差役还在等上头的文书。',
        options: [
          {
            t: '写一纸急报，连夜送进京', dim: 'shi', time: '半月',
            req: { cai: 36 },
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.ming += 9; s.attrs.ti -= 3; s.hidden.yin += 5;
              s.flags['报灾'] = 1;
              return '你在驿站的油灯下写完，封了火漆，托驿卒换马直送。三日后京中来了回文，拨粮放赈。可那三日里，土坡上又少了几个人。';
            }
          },
          {
            t: '倾囊买粮，就地设粥', dim: 'xiu', time: '一月',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian -= 24; s.attrs.ming += 7; s.hidden.yin += 9;
              s.flags['施粥'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 6;
              return '你在坡上支起三口锅，粥熬得稀，够热。排队的人从坡上排到水边，没有人争。有个老汉喝完，把碗舔净，冲你点了点头。那点头比什么谢都重。';
            }
          },
          {
            t: '去下游收田，等水退了再算', dim: 'li', time: '两月',
            fx: function (s) {
              s.attrs.qian += 26; s.attrs.ming -= 6; s.hidden.yin -= 8;
              s.flags['置田'] = 1;
              return '水退之后，下游好田成了无主之地。你以贱价买了几顷，立了契。来年麦熟，仓里满起来。只是每逢汛期，你总睡得不安稳。';
            }
          },
          {
            t: '带人上堤，堵那一处决口', dim: 'yi', time: '一月',
            fx: function (s) {
              s.attrs.ti -= 8; s.attrs.ming += 12; s.hidden.yin += 10; s.hidden.yun -= 4;
              s.flags['护堤'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10;
              return '你把民夫分成三队，一队扛沙，一队打桩，一队护住老弱。水没过腰，冷得人牙齿打战。合口那日，众人瘫在堤上，谁也没说话，只听见水声从脚下过去。';
            }
          }
        ]
      },

      /* 十一 · 烽燧 */
      {
        id: 'tang_fengsui',
        title: '烽燧',
        tags: ['边境战事', '朝堂风波'],
        weight: 9,
        loc: '朔方',
        time: '半月',
        minScene: 6,
        story: '边地烽燧，一夜连举三把火。守卒说看见了骑影，追出去却什么也没有。上头要一个说法，严七奉命来查，先问了守卒，又来问你。\n「你那夜在堡上，看见什么了？」',
        options: [
          {
            t: '据实作证，说只见风沙', dim: 'shi', time: '半月',
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.cai += 3; s.hidden.zhi += 4;
              s.flags['作证'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 6;
              return '你把那夜的风向、月色、火起的位置一一说了。严七记下来，抬头道：「照你这么说，是自己人慌了。」守卒被拖下去时，一直看着你。';
            }
          },
          {
            t: '收下守卒家人送来的钱，替他圆一句', dim: 'li', time: '旬日',
            req: { qian: 20 },
            fx: function (s) {
              s.attrs.qian += 18; s.attrs.ming -= 3; s.hidden.yin += 6;
              s.flags['圆谎'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 6;
              return '你说那夜确有骑影，只是一晃就没了。严七盯着你看了半晌，笔下却照写了。守卒保住一条命，后来托人送来一坛酒，你没收，只让他好好守烽。';
            }
          },
          {
            t: '推说夜深，什么也没看清', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin -= 3; s.attrs.ming -= 2;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 2;
              return '你只说睡得沉，听见号角才醒。严七笑了笑，合上簿子。此事后来不了了之。你有时会想，那三把火到底是谁点的，又为什么要点。';
            }
          },
          {
            t: '夜里独自上烽台，看那处骑影', dim: 'yi', time: '半月',
            fx: function (s) {
              s.attrs.ti -= 4; s.attrs.ming += 5; s.hidden.yun += 6; s.hidden.zhi += 5;
              s.flags['夜探烽台'] = 1;
              return '你在烽台上等到后半夜，果然看见远处有一点火，亮了又灭，灭了又亮，像是有人在试探。你没有举烽，只把位置记在心里。下山时，天边已经泛白。';
            }
          }
        ]
      },

      /* 十二 · 胡骑 */
      {
        id: 'tang_huqi',
        title: '胡骑掠村',
        tags: ['边境战事', '灾祸'],
        weight: 9,
        loc: '河东',
        time: '一月',
        minScene: 7,
        story: '胡骑从北面来，掠了一个村子，抢粮、牵牛，临走放了一把火。阿禾的祖母就在那村里。\n你赶到时，火还没灭，村口的老槐烧得只剩半截。有人在灰里翻东西，也有人跪着不动。',
        options: [
          {
            t: '追上去，把人和牛夺回来', dim: 'yi', time: '半月',
            fx: function (s) {
              s.attrs.ti -= 9; s.attrs.ming += 12; s.hidden.yin += 8; s.hidden.yun -= 6;
              s.flags['追胡骑'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 16;
              return '你们顺着蹄印追了一夜，在一处干河沟截住落在后头的两骑。混乱里你挨了一刀，也夺回了一个人。阿禾抱着他祖母，蹲在地上哭，哭得像个孩子。';
            }
          },
          {
            t: '报与边军，请他们出兵', dim: 'shi', time: '旬日',
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.cai += 4; s.hidden.yin += 5;
              s.flags['报边军'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 6;
              return '你骑马跑了两处堡，把话递到校尉耳里。边军第三日才动，追到半路便回来了。校尉说，人已过界，不能越境。你站在营门口，看他们的马慢慢卸鞍。';
            }
          },
          {
            t: '变卖随身之物，把被掳的人赎回来', dim: 'li', time: '一月',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian -= 40; s.attrs.ming += 8; s.hidden.yin += 10;
              s.flags['赎人'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
              return '你托了相熟的胡商去说价，来回三趟，才把几个人接回来。他们瘦得脱了形，见着熟悉的屋檐，反倒不敢进。阿禾的祖母没回来。';
            }
          },
          {
            t: '留在村里，收敛死者', dim: 'xiu', time: '半月',
            fx: function (s) {
              s.attrs.xin += 8; s.attrs.ti -= 4; s.hidden.yin += 12;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 8;
              return '你在村后挖了坑，一具一具地放好。没有棺，就用席子裹。阿禾的祖母是你亲手抱进去的，很轻。埋完你在土上坐了半日，风把灰吹到衣上。';
            }
          }
        ]
      },

      /* 十三 · 志怪 · 古寺灯 */
      {
        id: 'tang_gusi_deng',
        title: '古寺灯',
        tags: ['鬼神异闻', '江湖奇遇'],
        weight: 7,
        loc: '终南',
        time: '数日',
        story: '山中遇雨，你借宿一座废寺。殿宇塌了半边，佛首落在草里。夜半，你听见有人敲磬，一声一声，很稳。\n起来看时，东廊下亮着一盏灯，灯前坐着一个人影，背对着你，衣裳是几十年前的样式。',
        options: [
          {
            t: '合掌诵经，不去惊动', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 8; s.hidden.yun += 6; s.hidden.yin += 4;
              s.flags['古寺遇灯'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 8;
              return '你念到天亮，磬声不知何时停了。晨光从破窗照进来，廊下只有一盏空灯，灯盏里没有油。你在佛前添了一炷香，出门时雨已经停了。';
            }
          },
          {
            t: '提灯走近，看他到底是谁', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.ti -= 3; s.attrs.xin -= 4; s.hidden.yun += 8; s.hidden.zhi += 5;
              s.flags['古寺遇灯'] = 1;
              return '你走近三步，那人影便淡一分。走到第七步，灯灭了，廊下空无一人，只有一块倒了的碑。你蹲下去摸碑上的字，摸到一个与你同姓的名字。';
            }
          },
          {
            t: '把灯盏与铜磬收进包袱', dim: 'li', time: '数日',
            fx: function (s) {
              s.attrs.qian += 12; s.attrs.ming -= 2; s.hidden.yin -= 6;
              s.flags['古寺遇灯'] = 1;
              return '灯盏是旧铜，磬也是。你包好带走，出山卖了不错的价。只是此后每回落雨，你总会想起那一声磬，想起自己当时伸手的动作。';
            }
          },
          {
            t: '就着那盏灯，把此事记下来', dim: 'shi', time: '旬日',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 6; s.attrs.ming += 8; s.hidden.zhi += 6;
              s.flags['记异'] = 1; s.flags['古寺遇灯'] = 1;
              return '你取出行囊里的纸笔，就着灯写。写到最后，抬头一看，灯已灭了，纸上却多了一行不是你的字。你把纸收好，后来这一篇传了出去，人说你笔下有鬼气。';
            }
          }
        ]
      },

      /* 十四 · 志怪 · 狐 */
      {
        id: 'tang_shanhu',
        title: '山狐',
        tags: ['鬼神异闻'],
        weight: 6,
        loc: '终南',
        time: '数日',
        story: '雪夜，有个老妪叩门，说是下山投亲，迷了路。她衣裳单薄，鞋却是干的，进门时带进一股松针的气味。\n她坐下烤火，问你：「郎君一个人住这样大的屋子，不冷么？」',
        options: [
          {
            t: '添柴煮茶，与她对坐到天明', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 7; s.hidden.yun += 8; s.hidden.zhi += 3;
              s.flags['遇狐'] = 1;
              return '她讲了许多旧事，讲开元年的灯市，讲一个再没回来的人。天快亮时她起身告辞，走到门口回头道：「你心不坏，就是记性太好。」雪地上没有脚印。';
            }
          },
          {
            t: '按住刀，问她究竟是什么', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.ti -= 3; s.attrs.ming += 3; s.hidden.yun += 5; s.hidden.yin -= 3;
              s.flags['遇狐'] = 1;
              return '刀还没出鞘，她已笑了：「郎君这样，倒像那些道士。」说完人就不见了，火堆上只剩一根白毛。你追出门，雪下得正紧，四野无声。';
            }
          },
          {
            t: '问她山中可有财货', dim: 'li', time: '数日',
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.xin -= 5; s.hidden.yun -= 4; s.hidden.yin -= 6;
              s.flags['遇狐'] = 1;
              return '她指了指屋后，说槐树下埋着一只瓮。你天亮去挖，果然有。钱花得很顺，只是此后三年，你每夜都梦见有人在门外问：「郎君一个人住，不冷么？」';
            }
          },
          {
            t: '请她替你看一看前程', dim: 'shi', time: '数日',
            req: { ming: 30 },
            fx: function (s) {
              s.attrs.ming += 6; s.attrs.cai += 4; s.hidden.yun += 6; s.hidden.zhi += 4;
              s.flags['遇狐'] = 1;
              return '她看了你的手，又看你的脸，说：「名是有的，就是不知刻在碑上，还是刻在人嘴里。」你想再问，她已经把茶喝完了，说该走了。';
            }
          }
        ]
      },

      /* 十五 · 流民 */
      {
        id: 'tang_liumin',
        title: '流民入城',
        tags: ['天灾时疫', '善缘'],
        weight: 11,
        loc: '长安',
        time: '一月',
        story: '关东饥，流民一路往西，城门外聚了上千人。粥棚只开半日，迟来的便只能在墙根蹲着。夜里有人翻墙，被巡街的拿了。\n你家米缸也不算满。',
        options: [
          {
            t: '分出家中一半米，熬粥施与', dim: 'yi', time: '一月',
            fx: function (s) {
              s.attrs.qian -= 20; s.attrs.ming += 8; s.hidden.yin += 12; s.attrs.ti -= 3;
              s.flags['施粥'] = 1;
              return '米下了锅，粥色很淡。你把碗一碗递出去，有人接了就走，也有人捧着碗站着，像不知该往哪里去。第五日米尽了，你看着空缸，心里反比先前安稳。';
            }
          },
          {
            t: '写状陈情，请有司开仓', dim: 'shi', time: '两月',
            req: { cai: 42 },
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.ming += 10; s.attrs.qian -= 8; s.hidden.yin += 6;
              s.flags['陈情'] = 1;
              return '你把流民的来路、人数、病者多少，一条条写在状上。有司起初推诿，你把状子递了三次。仓门开那日，你在人群外站着，听见有人喊了一声「青天」，不知喊的是谁。';
            }
          },
          {
            t: '雇几个壮者，替你做事', dim: 'li', time: '两月',
            req: { qian: 35 },
            fx: function (s) {
              s.attrs.qian += 24; s.attrs.ming += 3; s.hidden.yin += 2;
              s.flags['雇流民'] = 1;
              return '你挑了十来个看着老实的，修屋、挑货、跑腿，工钱给得不高，饭管饱。他们做得极卖力。有人问你往后还要不要人，你说看情形。他点头，说情形好。';
            }
          },
          {
            t: '闭门落闩，各人顾各人', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin -= 5; s.attrs.qian += 3; s.hidden.yin -= 6;
              s.flags['闭门'] = 1;
              return '你把门闩上，听见墙外有人推了一推，又走了。夜里风大，哭声断断续续。你烙了两张饼，吃了一张，另一张放到凉了也没动。';
            }
          }
        ]
      },

      /* 十六 · 御史弹劾 */
      {
        id: 'tang_yushi',
        title: '台谏',
        tags: ['朝堂风波', '灾祸'],
        weight: 9,
        loc: '长安',
        time: '一月',
        minScene: 8,
        story: '御史台递上一道弹章，参裴敬交通藩镇。你与他同席饮过酒，也在他的荐书上署过名。风声传得很快，说凡是与裴家往来的，都要一一问过。\n裴敬遣人送来一封信，只有六个字：勿来，勿言，自保。',
        options: [
          {
            t: '上表自辩，顺带替他说一句', dim: 'shi', time: '一季',
            req: { cai: 50, ming: 35 },
            fx: function (s) {
              s.attrs.ming += 12; s.attrs.cai += 6; s.attrs.xin += 5; s.hidden.zhi += 5;
              s.flags['上表'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 16;
              return '你把表写得极平，不喊冤，只把往来之事一件件列清。末了添一句：若以此罪人，则长安城中无人可免。奏表留中不发，但风声渐渐松了。';
            }
          },
          {
            t: '使钱打点，把名字从簿上抹去', dim: 'li', time: '两月',
            req: { qian: 55 },
            fx: function (s) {
              s.attrs.qian -= 45; s.attrs.ming -= 4; s.hidden.yin -= 6;
              s.flags['打点'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 14;
              var m = G.npc(s, 'pei', { name: '裴敬' }); m.rel -= 10;
              return '钱过三手，簿上果然没了你的名字。裴敬后来被贬出京，走的那日你等在城外。他看见你，勒住马，笑了一下，什么也没说就走了。';
            }
          },
          {
            t: '称病闭门，一概不见', dim: 'xiu', time: '两月',
            fx: function (s) {
              s.attrs.xin += 4; s.attrs.ming -= 6; s.attrs.ti -= 2;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 6;
              return '你把门一关，谁来都说有病。风声最紧的那半个月，你读了半部《汉书》。后来裴敬贬了，你也没事。只是再见面时，两人之间多了一层客气。';
            }
          },
          {
            t: '把裴敬藏进自家后院', dim: 'yi', time: '一月',
            fx: function (s) {
              s.attrs.ming += 10; s.attrs.xin -= 3; s.hidden.yin += 9; s.hidden.yun -= 8;
              s.flags['藏裴敬'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 24;
              return '他在你家柴房住了十七日。白天不敢点灯，夜里出来跟你喝酒。他酒量极好，那几夜却很快就醉，醉后反复说一句：「这天下不该是这样的。」';
            }
          }
        ]
      },

      /* 十七 · 酒肆论诗 */
      {
        id: 'tang_jiulou',
        title: '酒肆论诗',
        tags: ['日常', '善缘'],
        weight: 14,
        loc: '长安·东市',
        time: '数日',
        story: '东市酒肆，胡姬当垆，酒是葡萄酒，色如琥珀。邻桌几个书生在争一首诗的高下，争到面红，把杯子顿得直响。\n李慕之坐在你对面，论文名与身后名，忽然问你：「你说，人死了，诗还在，算不算活着？」',
        options: [
          {
            t: '与他争一夜，各不相让', dim: 'shi', time: '数日',
            fx: function (s) {
              s.attrs.cai += 7; s.attrs.ming += 6; s.hidden.zhi += 6;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10;
              return '你们从《文选》争到近体，从格律争到气骨。酒添了三回，灯芯剪了两回。天将明时他忽然不争了，说：「你说得对，可我还是不服。」两人相视大笑。';
            }
          },
          {
            t: '替邻桌的新诗定个价', dim: 'li', time: '数日',
            req: { qian: 20 },
            fx: function (s) {
              s.attrs.qian += 16; s.attrs.ming += 4; s.attrs.xin -= 3;
              s.flags['卖文'] = 1;
              return '你替人润色了两句，又替他写了个好题目，收了一笔润笔。那书生千恩万谢，后来这首诗果然传开了，只是没人知道第二句是你改的。';
            }
          },
          {
            t: '只饮酒，不置一词', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 6; s.attrs.ti -= 2; s.hidden.yun += 3;
              return '他们争得热闹，你只是听。酒到半酣，胡姬拨了两下弦，声音很轻。李慕之看了你一会儿，说：「你这个人，心里什么都存着，就是不肯拿出来。」';
            }
          },
          {
            t: '把这些年的旧作题在墙上', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.ming += 9; s.hidden.zhi += 7; s.hidden.yun += 4;
              s.flags['题壁'] = 1;
              return '你向店家借了笔，就着酒意往墙上写。写到一半，满店的人都围过来看。第二日墙被店家刷白了一半，剩下一半，他舍不得刷。';
            }
          }
        ]
      },

      /* 十八 · 僧道争 */
      {
        id: 'tang_sengdao',
        title: '僧道争田',
        tags: ['日常', '朝堂风波'],
        weight: 10,
        loc: '长安',
        time: '一月',
        story: '城南一所道观与一座佛寺争一段田界，争了三年，闹到县里。僧人说道观越界筑墙，道士说那墙是前朝旧基。两边的香客都来请你出面。\n徐翁是道观这边的老人，他倒不急，只说：「田是死的，人是活的。」',
        options: [
          {
            t: '亲去丈量，依旧契断个公道', dim: 'shi', time: '两月',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 6; s.attrs.ming += 9; s.hidden.yin += 5;
              s.flags['断田'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 10;
              return '你借来前朝的鱼鳞册，又请了两位老农作证，一尺一尺地量。断下来，田归寺，墙基归观，各自退让一步。两边都不满意，却都无话可说。';
            }
          },
          {
            t: '与寺里合股置田，另分一处', dim: 'li', time: '两月',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian -= 35; s.attrs.ming += 7; s.hidden.zhi += 4;
              s.flags['置田'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel -= 4;
              return '你出钱另买了一段田，把争执的那一段换下来。僧人得了实惠，道士保住了面子。徐翁看着新契，叹道：「你这不是断事，是拿钱盖住了事。」';
            }
          },
          {
            t: '在两家之间坐着，只听不说', dim: 'xiu', time: '一月',
            fx: function (s) {
              s.attrs.xin += 6; s.attrs.cai += 3; s.hidden.yun += 4;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 6;
              return '你听了三日，听出他们其实都为着一口气。第四日你问了一句：「这田出产的粮，是敬佛，还是斋道？」两下都静了。后来各让一步，事情就了了。';
            }
          },
          {
            t: '助徐翁一夜筑墙，把界做实', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.ti -= 4; s.attrs.ming -= 3; s.attrs.xin += 3; s.hidden.yin -= 4;
              s.flags['助道观'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 14;
              return '月黑风高，你带着人把墙基往外挪了两尺，天不亮就砌好了。寺里再来争，已是既成之事。徐翁拍着你的肩说好，你却在夜里梦见那堵墙一直往前长。';
            }
          }
        ]
      },

      /* 十九 · 商队西行 */
      {
        id: 'tang_shangdui',
        title: '西行商队',
        tags: ['江湖奇遇', '边境战事'],
        weight: 9,
        loc: '凉州',
        time: '两月',
        minScene: 6,
        story: '沈九娘的商队要往西域去，驼队三十余匹，驮着绢与茶。她来问你走不走。走一趟，来回两年，风沙、盗匪、关卡，都说不准。\n「不过，」她把一张货单推过来，「走成了，够你十年不愁。」',
        options: [
          {
            t: '入股同行，一路记账', dim: 'li', time: '两载',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian += 60; s.attrs.ti += 5; s.attrs.cai += 5; s.hidden.zhi += 6;
              s.flags['走过西域'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 20;
              return '两年里你看过雪岭、烽燧、胡商的帐子与半夜的火。回来时驼队少了七匹，货却多了两成。九娘把账本合上，说：「郎君这双手，可惜生在读书人家。」';
            }
          },
          {
            t: '随队护行，替她挡一路风险', dim: 'yi', time: '两载',
            fx: function (s) {
              s.attrs.ti += 8; s.attrs.ming += 8; s.attrs.qian += 25; s.hidden.yun -= 3;
              s.flags['走过西域'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 24;
              return '过白龙堆时遇了马贼，你带人把驮队护在沙丘后，挨了一箭。九娘替你拔箭，手很稳。她说：「这一趟，我欠你一条命。」你说：「记在账上。」';
            }
          },
          {
            t: '只送她出关，自己回京', dim: 'shi', time: '一季',
            fx: function (s) {
              s.attrs.xin += 4; s.attrs.ming += 3; s.attrs.qian += 5;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 8;
              return '你送到阳关，风大，说话要凑很近。她从袖里取出一枚旧钱塞给你，说路上带着。驼铃渐远，你站在关下，看那道烟直直地升上去。';
            }
          },
          {
            t: '不去了，留在凉州看边地风物', dim: 'xiu', time: '一年',
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.xin += 6; s.hidden.zhi += 3;
              return '你在凉州住了一年，学了几句胡语，看懂了边市的规矩，也看惯了城头换防。有一回夜里听见羌笛，忽然想起长安的坊门鼓，竟分不清哪边更远。';
            }
          }
        ]
      },

      /* 二十 · 剑客 */
      {
        id: 'tang_jianke',
        title: '白衣客',
        tags: ['江湖奇遇'],
        weight: 8,
        loc: '长安',
        time: '数日',
        story: '雨中，一个白衣客在檐下避雨，腰间悬剑，剑鞘旧得发亮。他看了你许久，忽然把剑横在膝上，说：「这剑跟了我二十年，如今想找个不拿它换钱的人。」',
        options: [
          {
            t: '接过剑，问他为何赠我', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.ti += 6; s.attrs.ming += 6; s.hidden.zhi += 8; s.hidden.yun += 5;
              s.flags['受剑'] = 1;
              return '他说：「因为你刚才看了它一眼，先看的是鞘，不是穗。」说完起身走进雨里，连姓名也没留。你握着剑，觉得比想的沉。';
            }
          },
          {
            t: '推辞不受，只说不敢当', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 8; s.hidden.yun += 4; s.hidden.zhi -= 3;
              return '他点点头，把剑收回鞘里，说：「也好。拿着它的人，多半不得善终。」雨停后你们一同走了两条街，在岔口分开，谁也没回头。';
            }
          },
          {
            t: '问他姓名来历，想记下来', dim: 'shi', time: '数日',
            req: { cai: 38 },
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.ming += 5; s.hidden.yun += 6;
              s.flags['剑客留名'] = 1;
              return '他说了个名字，你后来查遍长安的籍册，查不到。倒是那一夜的事，你写进了笔记，几十年后还有人翻出来，说此人必是剑圣。';
            }
          },
          {
            t: '转手把剑卖给西市的胡商', dim: 'li', time: '数日',
            fx: function (s) {
              s.attrs.qian += 30; s.attrs.ming -= 4; s.hidden.yin -= 9; s.hidden.yun -= 4;
              s.flags['卖剑'] = 1;
              return '胡商识货，给的价比你料的高。钱花得很快。只是后来每逢下雨，你总要在檐下多站一会儿，看看有没有人来避雨。';
            }
          }
        ]
      },

      /* 二十一 · 下第 */
      {
        id: 'tang_xiadi',
        title: '下第',
        tags: ['朝堂风波', '日常'],
        weight: 12,
        loc: '长安',
        time: '半载',
        minScene: 4,
        story: '放榜那日，你在榜下从第一行看到最后一行，看了三遍。没有你的名字。\n回客栈的路上，卖胡饼的照旧吆喝，坊门照旧开合。长安一点也没有变，只有你身上的钱，一日比一日少。',
        options: [
          {
            t: '留在长安，再读三年', dim: 'shi', time: '三年',
            req: { qian: 25 },
            fx: function (s) {
              s.attrs.cai += 12; s.attrs.qian -= 20; s.attrs.xin += 5; s.hidden.zhi += 8;
              s.flags['再举'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 8;
              return '你搬到城南一间小院，房租便宜，就是冬天漏风。三年里你把旧书读了三遍，也替人抄书换米。再进贡院时，守门的老吏都认得你了。';
            }
          },
          {
            t: '入节度使幕，先谋一官半职', dim: 'li', time: '一年',
            req: { cai: 42 },
            fx: function (s) {
              s.attrs.qian += 30; s.attrs.ming += 6; s.attrs.cai += 4; s.attrs.xin -= 3;
              s.flags['入幕'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 6;
              return '幕府的活不难，难的是说话。你学会了在酒桌上把话留三分，在公文里把话写满。一年后你穿着新袍回长安，榜下的人换了一茬，没人认得你。';
            }
          },
          {
            t: '收拾书箱，回山里读书', dim: 'xiu', time: '一年',
            fx: function (s) {
              s.attrs.cai += 8; s.attrs.xin += 9; s.attrs.ming -= 5;
              s.flags['归山'] = 1;
              return '你出城那日，天很好。走到终南山口，回头能看见长安的城楼，小小的一点。你忽然松了一口气，像是把一件很重的东西放下了。';
            }
          },
          {
            t: '不走正途了，替人捉刀代笔', dim: 'yi', time: '一年',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.qian += 22; s.attrs.ming += 5; s.attrs.xin -= 7; s.hidden.yin -= 4;
              s.flags['捉刀'] = 1;
              return '你替人写诗、写状、写情书，什么价都接。有一回在宴上听见自己写的句子被人念出来，满座称好。你端着杯子，跟着笑了笑。';
            }
          }
        ]
      },

      /* 二十二 · 马市 */
      {
        id: 'tang_mashi',
        title: '边市马',
        tags: ['边境战事', '江湖奇遇'],
        weight: 9,
        loc: '朔方',
        time: '一月',
        minScene: 6,
        story: '边市开，胡人以马易绢。一匹好马，牙口、蹄腕、眼神都要看。严七管着税，站在市口，一匹一匹地过，价高的便多抽。\n有个胡人少年牵着一匹青马，站在队尾，不肯上前。',
        options: [
          {
            t: '依律纳税，替少年说句公道', dim: 'shi', time: '旬日',
            req: { cai: 38 },
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.cai += 4; s.hidden.yin += 5;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 5;
              return '你把税则指给严七看，说这匹马按牙口只该抽一档。严七看了你一会儿，挥手放行。少年牵着马过去，回头用生硬的汉话说了句谢。';
            }
          },
          {
            t: '私下与少年换马，不走官市', dim: 'li', time: '一月',
            fx: function (s) {
              s.attrs.qian += 30; s.attrs.ti += 4; s.hidden.yin -= 5; s.hidden.yun += 3;
              s.flags['私市'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 8;
              return '你们在城外一片胡杨林里换了马。青马极快，跑起来像贴着地。你骑了半年，有一天发现马腿上有一道旧烙痕，是军马的记号。';
            }
          },
          {
            t: '只在一旁看，记下马经', dim: 'xiu', time: '一月',
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.xin += 4; s.hidden.zhi += 3;
              return '你在市上蹲了一个月，看人相马，听他们讲蹄铁与草料。后来你写了一卷《相马杂记》，不传于世，只给几个朋友看过。';
            }
          },
          {
            t: '揭发严七多抽的税', dim: 'yi', time: '一月',
            fx: function (s) {
              s.attrs.ming += 11; s.attrs.ti -= 4; s.hidden.yin += 8; s.hidden.yun -= 5;
              s.flags['揭税'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 16;
              return '你把这几日抽税的数目记在纸上，递到节度判官案前。严七被罚了俸，站在市口看了你很久。那眼神你认得，是记下了。';
            }
          }
        ]
      },

      /* 二十三 · 括户 */
      {
        id: 'tang_kuohu',
        title: '括户',
        tags: ['朝堂风波', '灾祸'],
        weight: 10,
        loc: '河内',
        time: '一月',
        minScene: 5,
        story: '朝廷括户，查逃籍的人。严七带着簿子下乡，一村一村地点。躲了几年的人被翻出来，补税、充役，哭喊声从村头传到村尾。\n你家隔壁那户，男人三年前就逃了，只剩女人与两个孩子。',
        options: [
          {
            t: '劝那女人自首，替她求个宽限', dim: 'shi', time: '一月',
            req: { cai: 35 },
            fx: function (s) {
              s.attrs.ming += 7; s.attrs.cai += 3; s.hidden.yin += 8;
              s.flags['括户'] = 1;
              return '你替她写了状，说明男人逃役的缘由，又请里正作保。严七看了半晌，罚了粮，没拿人。女人跪下来磕头，你扶她起来，手上都是灰。';
            }
          },
          {
            t: '塞钱给严七，把那户从簿上勾了', dim: 'li', time: '数日',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian -= 22; s.attrs.ming += 3; s.hidden.yin += 6;
              s.flags['括户'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10;
              return '严七收了钱，笔尖在簿上顿了一顿，到底没勾，只写了个「待查」。他说：「待查就是查不到。」你谢了他，心里却明白，这债日后要还。';
            }
          },
          {
            t: '把那两个孩子藏进自家柴房', dim: 'yi', time: '半月',
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.ti -= 3; s.hidden.yin += 12; s.hidden.yun -= 6;
              s.flags['藏人'] = 1;
              return '两个孩子在你家柴房躲了七日，夜里不敢点灯。严七来搜过一次，你坐在门口跟他闲话，把他引到别处。他走后，你出了一身冷汗。';
            }
          },
          {
            t: '不去管，只在自家门内读书', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin -= 4; s.attrs.cai += 3;
              return '你关上门读书，读不进去。隔壁的哭声一阵一阵，像有人在门外敲门。你把书翻到下一页，又翻回来。天黑时，声音停了。';
            }
          }
        ]
      },

      /* 二十四 · 岁除 */
      {
        id: 'tang_suichu',
        title: '岁除',
        tags: ['日常', '善缘'],
        weight: 13,
        loc: '长安',
        time: '数日',
        story: '除夕，家家扫尘、贴门神、守岁。坊门这一夜开得晚些，街上有人放爆竹，孩子们追着跑。\n沈九娘提了一壶酒来，李慕之也到了，阿禾若在，大约也会来。案上摆着几只粗瓷碗，酒是温的。',
        options: [
          {
            t: '与众人守岁，说一整夜的话', dim: 'shi', time: '数日',
            fx: function (s) {
              s.attrs.xin += 6; s.attrs.ming += 3; s.hidden.yin += 5;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 8;
              var m = G.npc(s, 'li', { name: '李慕之' }); m.rel += 6;
              var a = G.npc(s, 'ahe', { name: '阿禾' }); a.rel += 4;
              return '你们说到更鼓，说到旧事，说到谁欠谁一坛酒。九娘酒量最好，李慕之最先撑不住，伏在案上睡了。窗外爆竹一阵接一阵，把话声盖住又放开。';
            }
          },
          {
            t: '算一算这一年的进出', dim: 'li', time: '数日',
            req: { qian: 20 },
            fx: function (s) {
              s.attrs.qian += 10; s.attrs.ming += 2; s.hidden.zhi += 3;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 5;
              return '你把账本摊开，一笔一笔地核。九娘凑过来看，指着其中一行笑你算错了。你重新算了两遍，果然错了。她把酒推过来，说：「今年就算了罢。」';
            }
          },
          {
            t: '独自出门，沿街走一夜', dim: 'xiu', time: '数日',
            fx: function (s) {
              s.attrs.xin += 7; s.hidden.yun += 4; s.hidden.zhi += 3;
              return '街上空了，爆竹的红纸被风卷着跑。你一直走到城楼下，守卒在打盹。更鼓敲过三回，天边有一点白。你忽然想不起自己在等什么，也不想回去了。';
            }
          },
          {
            t: '把身上的钱分给街角的乞儿', dim: 'yi', time: '数日',
            fx: function (s) {
              s.attrs.qian -= 15; s.attrs.ming += 6; s.hidden.yin += 10;
              s.flags['岁除施舍'] = 1;
              return '墙角蹲着几个孩子，鼻尖冻得通红。你把钱分了，有个小的接了，忽然冲你做了个揖，姿势很生疏。你转身走了几步，听见他们在身后笑。';
            }
          }
        ]
      },
      /* 二十五 · 牙兵 */
      {
        id: 'tang_yabing', cond: { seen: 'tang_fanzhen' },
        title: '牙兵',
        tags: ['朝堂风波', '边境战事'],
        weight: 10,
        loc: '魏博·帅府',
        time: '两月',
        minScene: 6,
        story: '牙兵又换了一个主帅。上一任被乱刀砍在帐里，血一直流到阶下，第二日才有人敢去擦。\n牙兵们说得明白：谁给我们饭吃，谁就是主帅。\n你在这镇里做幕职，帐前那几把刀，刃还很新。',
        options: [
          {
            t: '替新帅起草安抚牙兵的告示', dim: 'shi', time: '两月',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 7; s.attrs.ming += 8; s.attrs.qian += 6; s.hidden.zhi += 4;
              s.flags['牙兵帐下'] = 1;
              return '你写的是：军中有功者，赏不待岁；有罪者，罚不逾时。告示贴在辕门外，牙兵围着看了半日，有人笑了一声，说：这个书生懂规矩。你从此在这镇里站住了脚。';
            }
          },
          {
            t: '趁乱把军中的粮布折成钱', dim: 'li', time: '两月',
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.cai += 4; s.attrs.ming -= 4; s.hidden.yin -= 10;
              s.flags['折军粮'] = 1;
              return '军中的粮、布、草料，账上是一套，库里是一套。你把两套的差折成钱，装进自己的行囊。乱的时候做这件事最方便，也最容易被人在乱的时候想起来。';
            }
          },
          {
            t: '辞了幕职，回乡下', dim: 'xiu', time: '一季',
            fx: function (s) {
              s.attrs.xin += 6; s.attrs.qian -= 6; s.hidden.zhi -= 4;
              s.flags['辞幕'] = 1;
              return '你把文书一叠交还，出了辕门。走出城门时，后头传来一阵喊声，不知是换了帅，还是又杀了人。你没有回头，一路走回乡下，从此不再问镇里的事。';
            }
          },
          {
            t: '夜里把旧帅家小送出城', dim: 'yi', time: '数日',
            req: { ti: 35 },
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.ti -= 4; s.hidden.yin += 12; s.hidden.zhi += 6;
              s.flags['送出城'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 10;
              return '一辆牛车，两个包袱，一个老仆抱着孩子。城门的老卒认得你，什么也没问，把门开了一条缝。车走出去很远，你才听见孩子的哭声。这件事，镇里始终没有人提。';
            }
          }
        ]
      },

      /* 二十六 · 邸店 */
      {
        id: 'tang_didian', cond: { qian: 25 },
        title: '邸店',
        tags: ['江湖奇遇', '日常'],
        weight: 9,
        loc: '长安·西市',
        time: '半载',
        minScene: 4,
        story: '西市的邸店，一半是客舍，一半是货栈。胡商把骆驼拴在门口，一住就是半年。\n店主死了，无子。邻铺的人都盯着那间店，只等官府来断。\n有人来问你：你识字，会算，愿不愿合伙把它盘下来。',
        options: [
          {
            t: '盘下邸店，兼做质库', dim: 'li', time: '半载',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian += 18; s.attrs.cai += 8; s.attrs.ming += 4; s.hidden.zhi += 3;
              s.flags['邸店'] = 1;
              return '你把店盘了下来，前头住客，后头押物。押物比住客来钱快，也不问东西的来路。胡商、举子、外放的官，都在你这店里押过东西。你学会了看人袖口的磨损，判断他缺不缺钱。';
            }
          },
          {
            t: '先去官府问这店该归谁', dim: 'shi', time: '两月',
            req: { cai: 34 },
            fx: function (s) {
              s.attrs.cai += 6; s.attrs.ming += 6; s.attrs.qian += 2;
              s.flags['问店产'] = 1;
              return '你翻了三年的旧档，查出店主还有一个出了家的兄弟。官府把这店判给了他，他转手卖给了你，价钱公道。邻铺的人这才知道，有些事要先去衙门问一句。';
            }
          },
          {
            t: '不沾，店主死得蹊跷', dim: 'xiu', time: '一月',
            fx: function (s) {
              s.attrs.xin += 5; s.hidden.yun += 4; s.hidden.zhi -= 3;
              s.flags['避邸店'] = 1;
              return '你听说店主死那夜，店里住着几个不肯留名字的人。你推了这事，往后绕着那间店走。半年后那店换了主人，又过了半年，新主人也死了。';
            }
          },
          {
            t: '替店中旧伙计讨一份工钱', dim: 'yi', time: '两月',
            fx: function (s) {
              s.attrs.ming += 6; s.hidden.yin += 10; s.attrs.qian -= 4;
              s.flags['讨工钱'] = 1;
              return '店里四个伙计，欠了半年的工钱。你替他们把账算清，去衙门递了一份呈子，又替他们说了几句公道话。钱最后只讨回三成，可那几个人此后见了你，都要唤一声。';
            }
          }
        ]
      }


    ],

    /* ================= 主线：你的名字如何被长安记住 ================= */
    main: [

      {
        id: 'tang_m1',
        title: '名刺',
        after: 0,
        time: '半载',
        story: '你第一次进长安。城门洞开，驼铃、车轮、胡语与叫卖混在一处，像一锅煮开了的水。\n你怀里揣着一卷诗、一枚名刺。名刺上的名字是你自己写的，墨还没干透。有个路过的老吏瞥了一眼，问：「新来的？」你点头。他笑了笑，说长安很大，记性却不好。',
        options: [
          {
            t: '去崇仁坊，一家一家地投卷', dim: 'shi', time: '半载',
            req: { cai: 35 },
            fx: function (s) {
              s.attrs.cai += 8; s.attrs.ming += 6; s.attrs.qian -= 8; s.hidden.zhi += 5;
              s.flags['入长安'] = 1; s.flags['行卷'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 8;
              return '你走了十几家，受了十几回冷脸。李慕之陪你走，夜里两人在客栈分一张案。他说：「长安的门都在里头，得有人替你开。」你问谁开，他摇头。';
            }
          },
          {
            t: '在东市盘一间小铺，先站住脚', dim: 'li', time: '一年',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.ming += 4; s.attrs.cai += 3;
              s.flags['入长安'] = 1; s.flags['东市有铺'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 12;
              return '铺子不大，卖纸笔，也替人代写书信。九娘常来照看，说你写的字有股冷气，读书人爱看。铺子撑住了，只是你夜里写字的时间，一日少过一日。';
            }
          },
          {
            t: '借居慈恩寺下院，闭门读书', dim: 'xiu', time: '两载',
            req: { qian: 10 },
            fx: function (s) {
              s.attrs.cai += 12; s.attrs.xin += 6; s.attrs.ming -= 2; s.attrs.qian -= 8;
              s.flags['入长安'] = 1; s.flags['借居'] = 1;
              return '下院的屋子小，窗对着一棵老槐。晨钟一响便起，暮鼓一响便睡。寺僧说你的灯总亮到最晚，你说是书不好读。两年过去，长安还是那样，你却认得它的声音了。';
            }
          },
          {
            t: '替人抄经换宿，闲时去坊间听事', dim: 'yi', time: '一年',
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.ming += 8; s.attrs.qian += 5; s.hidden.yun += 4;
              s.flags['入长安'] = 1; s.flags['坊间有名'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 6;
              return '你抄经换宿，抄到手腕发酸。闲下来就蹲在坊门口听人说话，听差役骂人，听商旅说边事。一年后，坊里的人有事竟来问你，你的名字先于你的文章，在巷子里传开了。';
            }
          }
        ]
      },

      {
        id: 'tang_m2',
        title: '雁塔题名',
        after: 4,
        time: '一季',
        cond: { age: [17, 999] },
        story: '慈恩寺塔下，新科进士依次题名。有人递笔给你，笔杆上还留着上一个人的手温。塔很高，抬头看久了，脖子会酸。\n李慕之站在人群外，他这一科又落了。裴敬在塔上，隔着几级台阶朝你抬了抬下巴。',
        options: [
          {
            t: '接过笔，把名字端端正正写上', dim: 'shi', time: '一季',
            req: { cai: 46 },
            fx: function (s) {
              s.attrs.cai += 8; s.attrs.ming += 14; s.hidden.zhi += 8; s.hidden.yun += 3;
              s.flags['雁塔题名'] = 1; s.flags['进士'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 8;
              var m = G.npc(s, 'li', { name: '李慕之' }); m.rel += 4;
              return '你写得很慢，一笔一画，像怕它跑了。写完退开，看见自己的名字挤在许多名字中间，并不起眼。可你站了很久，久到裴敬下来拍你的肩。';
            }
          },
          {
            t: '把自己的名字让给落第的旧友', dim: 'yi', time: '两月',
            req: { ming: 30 },
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.xin -= 2; s.hidden.yin += 14; s.hidden.zhi += 4;
              s.flags['让名'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 24;
              return '你把笔塞到李慕之手里，说：「今日借你一用。」他愣了很久，终究没写，把笔还给你，说：「我若靠这个题名，日后也站不住。」他转身走了，背影很直。';
            }
          },
          {
            t: '不题名，只在一旁看', dim: 'xiu', time: '一月',
            fx: function (s) {
              s.attrs.xin += 8; s.attrs.ming += 2; s.hidden.zhi += 4;
              s.flags['不题名'] = 1;
              return '你看他们一个接一个地写，有人写完大笑，有人写完抹眼睛。日头移到塔后，人渐渐散了。你在塔下站了一会儿，把袖里的笔放回原处，走了。';
            }
          },
          {
            t: '替人代笔，收一笔润资', dim: 'li', time: '两月',
            req: { cai: 42, qian: 20 },
            fx: function (s) {
              s.attrs.qian += 30; s.attrs.ming += 6; s.attrs.xin -= 5; s.hidden.zhi += 5;
              s.flags['代笔'] = 1;
              return '有人不愿自己写，托你代题，说事后有谢。你写了三个名字，最后一个写错，重来。收钱时对方说：「郎君的字，比名字值钱。」你笑了笑，把钱收了。';
            }
          }
        ]
      },

      {
        id: 'tang_m3',
        title: '长安传名',
        after: 9,
        time: '半载',
        cond: { age: [20, 999] },
        story: '不知从哪一日开始，长安城里有人在念你的句子。酒肆的歌女把它谱进曲里，平康坊的墙上有人续了下半阙。\n宫里的使者来了两回，问你愿不愿入朝。裴敬说这是好事，李慕之却问你：「你要的是名，还是名后面的东西？」',
        options: [
          {
            t: '应召入朝，以诗为进身之阶', dim: 'shi', time: '半载',
            req: { cai: 45, ming: 30 },
            fx: function (s) {
              s.attrs.ming += 16; s.attrs.cai += 8; s.attrs.xin -= 3; s.hidden.zhi += 8;
              s.flags['诗名'] = 1; s.flags['在朝'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 8;
              return '你换了新袍，随使者入宫。殿上很静，你念了一首旧作，念到一半，皇帝抬手让你停，说后两句好。你退出来时，袍角被门槛绊了一下，没人看见。';
            }
          },
          {
            t: '把诗集成册，与书坊分成', dim: 'li', time: '两月',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian += 35; s.attrs.ming += 10; s.attrs.xin -= 4;
              s.flags['诗名'] = 1; s.flags['有诗集'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 10;
              return '书坊刻了三百册，卖得比想的快。九娘替你收账，说这买卖做得。你翻着自己那本集子，纸白字黑，忽然觉得那些句子有些陌生。';
            }
          },
          {
            t: '辞了征召，回终南山中', dim: 'xiu', time: '两载',
            fx: function (s) {
              s.attrs.xin += 10; s.attrs.cai += 8; s.attrs.ming -= 4; s.hidden.zhi += 6; s.hidden.yun += 5;
              s.flags['诗名'] = 1; s.flags['归山'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10;
              return '你把使者送到门口，说山中还有几卷书没读完。他劝了三回，你辞了三回。李慕之送你出城，走到十里长亭，说：「你在山里写的东西，未必比宫里少。」';
            }
          },
          {
            t: '为被逐的旧友鸣不平，当众赋诗', dim: 'yi', time: '一季',
            fx: function (s) {
              s.attrs.ming += 14; s.attrs.ti -= 3; s.attrs.xin += 5; s.hidden.yin += 9; s.hidden.yun -= 5;
              s.flags['诗名'] = 1; s.flags['直言'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 8;
              return '那人在御史台受了贬，出城时无人敢送。你去送，还当众念了一首。第二日满城都在传。有人说你义，有人说你傻。你只管收拾行李，等着看哪句话先到。';
            }
          }
        ]
      },

      {
        id: 'tang_m4',
        title: '渔阳鼓',
        after: 14,
        time: '半载',
        cond: { age: [23, 999] },
        story: '渔阳的鼓声，一路传到长安。起初没人信，后来潼关的急报一日三至，坊市便乱了。米价一日数涨，坊门开得越来越迟。\n宫里的车驾要往西去。城里的人都在问一句话：走，还是留？',
        options: [
          {
            t: '随驾西行，护着文书与旧档', dim: 'shi', time: '半载',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.ming += 10; s.attrs.ti -= 6; s.attrs.cai += 5; s.hidden.zhi += 8;
              s.flags['西幸'] = 1; s.flags['长安陷'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10;
              return '你跟着队伍出了西门，回头看见长安的城墙在雨里，颜色比平时深。路上车马太多，走得很慢。有人在道边哭，也有人在道边卖饼。你把文书抱在怀里，一路没松手。';
            }
          },
          {
            t: '投军守关，去搏一个出身', dim: 'yi', time: '一年',
            fx: function (s) {
              s.attrs.ti -= 10; s.attrs.ming += 14; s.attrs.xin += 4; s.hidden.yin += 6; s.hidden.yun -= 6;
              s.flags['从军'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
              return '你把笔换成了刀。军中的规矩简单，活着便是功劳。第一场仗下来，你吐了半夜。第二场，你已经能一边止血一边吃饼。阿禾说你变了，你说是刀太快。';
            }
          },
          {
            t: '带家人入山，先避过这一场', dim: 'xiu', time: '两载',
            fx: function (s) {
              s.attrs.xin += 10; s.attrs.cai += 6; s.attrs.ti -= 4; s.hidden.yin += 6;
              s.flags['避乱'] = 1; s.flags['长安陷'] = 1;
              return '你带着家人往南走，走到一处山谷，便不再走了。开荒、种豆、教书，日子过得极慢。山外的事，隔一阵才有人带进来一句，一句比一句坏。';
            }
          },
          {
            t: '留在长安，守着宅子与书', dim: 'li', time: '一月',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian -= 25; s.attrs.ming += 6; s.attrs.xin += 4; s.hidden.yin += 8;
              s.flags['守宅'] = 1; s.flags['长安陷'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 12;
              return '城门破那日，你关了门，把书埋在后园。胡骑从巷口过，马蹄声很闷。九娘赶来拍门，你开门让她进来，两人在灶下坐了一夜，谁也没说话。';
            }
          }
        ]
      },

      {
        id: 'tang_m5',
        title: '记得',
        after: 19,
        time: '一年',
        cond: { age: [30, 999] },
        story: '许多年后，你又回到长安。城还是那座城，坊墙矮了些，街树老了些。东市的酒肆换了主人，墙上还留着半行旧诗，字迹被烟熏得看不清。\n有个说书的在讲从前的旧事，讲到一半，忽然念了一句你的诗，念错了两个字。满堂没人纠正他。',
        options: [
          {
            t: '上前替他把那两个字改回来', dim: 'shi', time: '一年',
            fx: function (s) {
              s.attrs.ming += 10; s.attrs.xin += 5; s.hidden.zhi += 6; s.hidden.yun += 4;
              s.flags['长安记得'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10;
              return '你说了一遍，他愣了一下，跟着念了一遍，念对了。堂下有人回头看你，看了两眼便转回去。你坐回角落，听完这一回书。出门时，天已经黑了。';
            }
          },
          {
            t: '不吭声，只把酒钱留下', dim: 'xiu', time: '一月',
            fx: function (s) {
              s.attrs.xin += 8; s.attrs.qian -= 6; s.hidden.zhi += 4;
              s.flags['长安记得'] = 1;
              return '你把酒钱压在盏下，起身走了。那两个字错得也不算太坏。街上有孩子跑过，撞了你一下，回头说了句什么，跑远了。你站着听了一会儿，才想起该往哪边走。';
            }
          },
          {
            t: '把旧宅买回来，重新挂上匾', dim: 'li', time: '一年',
            req: { qian: 60 },
            fx: function (s) {
              s.attrs.qian -= 50; s.attrs.ming += 12; s.attrs.xin += 4;
              s.flags['长安记得'] = 1; s.flags['买回旧宅'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 14;
              return '宅子还在，匾额没了。你请人重做一块，字是自己写的。挂牌那日来了不少人，有认得的，也有只是来看热闹的。九娘站在门里，说这院子总算又有了人声。';
            }
          },
          {
            t: '去城下寻那些无人祭的坟', dim: 'yi', time: '一季',
            fx: function (s) {
              s.attrs.ming += 8; s.attrs.ti -= 3; s.hidden.yin += 14; s.hidden.zhi += 5;
              s.flags['长安记得'] = 1; s.flags['祭故人'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 8;
              return '城外乱葬岗，土包一个挨一个，多半没有碑。你买了纸钱，一个一个地烧，烧到天黑。风把灰吹起来，落在肩上。你不知道他们叫什么，只知道不该这样。';
            }
          }
        ]
      }

    ],

    /* ================= 朝代结局 ================= */
    endings: [

      {
        id: 'tang_end_changanke',
        name: '长安客',
        group: '客',
        pri: 56,
        cond: { all: [{ age: [45, 61] }, { ming: [0, 65] }, { noflag: '长安记得' }] },
        verdict: '一生长住长安，长安却始终没有记住你的名字。',
        epilogue: '你在长安住了很多年，搬过四次家，从崇仁坊到城南，越搬越远。你认得每一条巷子的拐角，知道哪家胡饼炉子起得最早，哪座坊门关得最迟。\n你也做过几任小官，写过几篇像样的文章，有过几个说得上话的朋友。后来他们一个个走了，有的外放，有的故去，有的只是不再来往。\n老了以后，你常在傍晚出门，沿着坊墙走一圈。鼓声一响，门一扇扇合上。你站在门外，不急，也不恼。长安记不住的人太多了，你不过是其中一个。',
        text: '你在长安住了很多年，搬过四次家，从崇仁坊到城南，越搬越远。你认得每一条巷子的拐角，知道哪家胡饼炉子起得最早，哪座坊门关得最迟。\n你也做过几任小官，写过几篇像样的文章，有过几个说得上话的朋友。后来他们一个个走了，有的外放，有的故去，有的只是不再来往。\n老了以后，你常在傍晚出门，沿着坊墙走一圈。鼓声一响，门一扇扇合上。你站在门外，不急，也不恼。长安记不住的人太多了，你不过是其中一个。',
        score: function (s) { var v=(70-s.attrs.ming)*0.5+(s.age-40)*0.7+s.scene*0.4+(s.attrs.cai-50)*0.3;return Math.max(0,Math.min(100,v)); }
      },

      {
        id: 'tang_end_biansaigu',
        name: '边塞骨',
        group: '骨',
        pri: 55,
        cond: { flag: '从军' },
        verdict: '骨埋塞草，名字刻在烽燧底下，风一年年把它磨浅。',
        epilogue: '你终究留在了边地。起初还数着年头，后来连日子也不数了。春天风里带沙，冬天雪压着营帐，一年一年，都一样。\n你守过几处烽燧，认得每一处的水源与风口。夜里听见马蹄，不必起身就知道是不是自己人。有一次你对着南边站了很久，想起长安的坊门鼓，想起那声音是怎么一层一层传过来的。\n后来你死在一场不大的遭遇里。同袍把你埋在烽燧下面，立了一块木牌。木牌上的字是别人写的，你的名字里错了一个。没有人来改。',
        text: '你终究留在了边地。起初还数着年头，后来连日子也不数了。春天风里带沙，冬天雪压着营帐，一年一年，都一样。\n你守过几处烽燧，认得每一处的水源与风口。夜里听见马蹄，不必起身就知道是不是自己人。有一次你对着南边站了很久，想起长安的坊门鼓，想起那声音是怎么一层一层传过来的。\n后来你死在一场不大的遭遇里。同袍把你埋在烽燧下面，立了一块木牌。木牌上的字是别人写的，你的名字里错了一个。没有人来改。',
        score: function (s) { var v=(s.attrs.ti-50)*0.7+(s.hidden.zhi-50)*0.6+(s.flags['从军']?8:0)+(s.attrs.ming-40)*0.4;return Math.max(0,Math.min(100,v)); }
      },

      {
        id: 'tang_end_shiming',
        name: '诗名动天下',
        group: '诗',
        pri: 51,
        cond: { all: [{ flag: '诗名' }, { cai: 52 }, { npc: { id: 'li', rel: 25 } }] },
        verdict: '长安的灯市唱你的诗，唱到后来，没人记得你也曾走过这条街。',
        epilogue: '你的诗传得很远，远到你自己也没去过的地方。酒肆的歌女唱它，边关的士卒在墙上抄它，后世的孩童开蒙时念它，念得比你的名字还熟。\n你晚年住在城南一所旧宅，常有人来求字。你写得少了，写得也慢了。有一回一个年轻人拿着你的集子来，请你题一句。你翻了很久，翻到一首自己都忘了的诗，忽然笑了。\n你死后，有人替你编集，序里写你一生潦倒。这话不算错。只是每逢上元，长安的灯亮起来，总有人在人堆里念你的句子。灯灭之后，那几句还在。',
        text: '你的诗传得很远，远到你自己也没去过的地方。酒肆的歌女唱它，边关的士卒在墙上抄它，后世的孩童开蒙时念它，念得比你的名字还熟。\n你晚年住在城南一所旧宅，常有人来求字。你写得少了，写得也慢了。有一回一个年轻人拿着你的集子来，请你题一句。你翻了很久，翻到一首自己都忘了的诗，忽然笑了。\n你死后，有人替你编集，序里写你一生潦倒。这话不算错。只是每逢上元，长安的灯亮起来，总有人在人堆里念你的句子。灯灭之后，那几句还在。',
        score: function (s) { var v=(s.attrs.cai-55)*1.2+(s.attrs.ming-40)*1.4;if((s.dimCount.xiu||0)>=6)v+=8;if(s.hidden.zhi>=60)v-=15;if(s.npcs.li&&s.npcs.li.rel>=40)v+=6;return Math.max(0,Math.min(100,v)); }
      },

      {
        id: 'tang_end_luanshi',
        name: '乱世流离',
        group: '乱',
        pri: 50,
        cond: { flag: '长安陷' },
        verdict: '城破之后，你带着一箱书南走，走得比春天还慢。',
        epilogue: '城破那年，你从西门出去，箱子里装着一部没抄完的稿子和几件旧衣。路上尽是往南的人，推车的、挑担的、抱着孩子的，谁也不看谁。\n你走了很久，走到一个不再听见马蹄的地方，才停下来。租了两亩薄田，教书糊口，一住就是许多年。稿子终于抄完了，却没有人可给。\n偶尔有人在灯下问你从前的事。你说长安的坊门、东市的胡饼、曲江的杏花。说到一半便停了，因为再往下说，就是那一年。听的人也不追问，只把灯芯挑一挑。',
        text: '城破那年，你从西门出去，箱子里装着一部没抄完的稿子和几件旧衣。路上尽是往南的人，推车的、挑担的、抱着孩子的，谁也不看谁。\n你走了很久，走到一个不再听见马蹄的地方，才停下来。租了两亩薄田，教书糊口，一住就是许多年。稿子终于抄完了，却没有人可给。\n偶尔有人在灯下问你从前的事。你说长安的坊门、东市的胡饼、曲江的杏花。说到一半便停了，因为再往下说，就是那一年。听的人也不追问，只把灯芯挑一挑。',
        score: function (s) { var v=(s.hidden.yin-50)*0.8+(s.attrs.xin-50)*0.9+(s.attrs.qian<50?8:0);return Math.max(0,Math.min(100,v)); }
      }

    ]
  };

  /* ================= 12 · 悬案事件（唐） ================= */
  D.dynasties.tang.events.push(
    {
      id: 'tang_xj_1', title: '行卷', tags: ['朝堂风波'], weight: 12,
      cond: { fame: { chao: 0 } },
      raiseOffer: {
        ttl: 3, short: '行卷限期投递，过期作废',
        expire: function (s) {
          s.flags['行卷误期'] = 1;
          s.attrs.ming -= 5; s.hidden.yun -= 4;
          return '你终于腾出手来誊那份卷子时，主司的门前已经换了别家的名字。一年的工夫，堵在一旬的路途上。';
        }
      },
      story: '投卷的期限定在旬末。\n你的旧作有两卷誊得满意，却还差一篇压卷的——写它要静下心，可眼下正是南来北往、托人递话的时节。\n写，赶不上遍谒显贵的脚程；递，赶不上篇好文章的构思。卷子只有一份，时节只有一旬。',
      options: [
        {
          t: '闭门数日，先成文章', dim: 'xiu', time: '半月',
          fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 4; s.flags['以文行卷'] = 1; return '你推了两场宴、误了半趟路，把那篇文章写完了。誊清卷子递上去时只剩两日。主司读到末篇，提笔批了一个字：稳。'; }
        },
        {
          t: '先谒贵人，文章从权', dim: 'shi', time: '一月',
          fx: function (s) { s.attrs.ming += 6; s.attrs.cai -= 2; s.flags['先谒后卷'] = 1; return '你把脚程跑完了。三家的门房都认得你了，投卷那日，你的卷子没有被压在最底下——是别人替你递到了案头。文章写得平了些，可路是靠走，不是靠写。'; }
        },
        {
          t: '双管齐下，托人代谒', dim: 'li', time: '半月', req: { qian: 12 },
          fx: function (s) { s.attrs.qian -= 10; s.attrs.ming += 5; s.flags['代谒行卷'] = 1; return '你雇了个干练的判事替你跑门路，自己关屋写文章。钱花得像流水，两头都没误。事后你想：这买卖做得，只是往后未必回回雇得起人。'; }
        },
        {
          t: '只投旧卷，不赶新篇', dim: 'yi', time: '旬日',
          fx: function (s) { s.attrs.ming += 2; s.hidden.zhi += 4; return '你把旧年的两卷誊清投了。稳是稳，旧也是真旧。主司翻完，批语只有一句：此人昔年之文，胜于今日。你把这句话记了很久。'; }
        }
      ]
    }
  );
})(window.GAME_DATA);