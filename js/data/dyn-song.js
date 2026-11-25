(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.song = {
    id: 'song',
    name: '宋',
    desc: '文治极盛，武备渐弛。汴河上舟楫如织，边关上岁币如约。读书人一朝登第，便可平步青云；一朝党祸，亦可终身不齿。',
    clock: { year: 1, season: 0 },
    eras: [
      { name: '太平兴国', span: 4 },
      { name: '至道', span: 2 },
      { name: '咸平', span: 3 },
      { name: '景德', span: 2 },
      { name: '大中祥符', span: 3 },
      { name: '天圣', span: 2 },
      { name: '庆历', span: 2 },
      { name: '嘉祐', span: 2 },
      { name: '熙宁', span: 2 },
      { name: '元丰', span: 1 },
      { name: '元祐', span: 1 },
      { name: '靖康', span: 4 },
      { name: '建炎', span: 3 },
      { name: '绍兴', span: 20 }
    ],

    events: [

      {
        id: 'song_keju_kao',
        title: '糊名',
        tags: ['朝堂风波', '日常'],
        weight: 14,
        loc: '汴京',
        time: '一月',
        minScene: 2,
        story: '礼部贡院外，举子如堵。糊名誊录，卷上姓名籍贯尽被纸糊遮去，只余一笔墨迹待人评说。你握着笔，纸上策问一道：农桑与榷利，孰先？\n风从廊下过，吹得烛火斜斜地晃。',
        options: [
          {
            t: '以农桑为本，据实而书',
            dim: 'shi',
            time: '一月',
            req: { cai: 38 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 3; s.hidden.zhi += 3;
              s.flags['应举'] = 1;
              return '你写得极慢，一字一字都从田垄间来。交卷时天已薄暮，誊录官抬头看了你一眼，什么也没说。';
            }
          },
          {
            t: '揣摩时好，专言榷利',
            dim: 'li',
            time: '一月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.xin -= 3; s.attrs.ming += 1;
              s.flags['应举'] = 1;
              return '你顺着主司近来爱听的话写下去，笔锋圆熟。走出贡院时，自己也不大记得写了些什么。';
            }
          },
          {
            t: '搁笔不答，径出贡院',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.xin += 2; s.attrs.ming -= 2; s.hidden.zhi += 2;
              return '你把空白卷子压在案角，出门去。街上卖花的正挑担子过，香气一路跟着你走了很远。';
            }
          },
          {
            t: '替邻座递一卷小抄',
            dim: 'yi',
            time: '旬日',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian += 8; s.attrs.ming -= 3; s.hidden.yin -= 3;
              s.flags['科场污点'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '那卷纸在袖中传了三只手。事后有人来讨谢礼，数目不小；你给了，他笑着称你「懂事」。';
            }
          }
        ]
      },

      {
        id: 'song_wazi',
        title: '瓦子',
        tags: ['日常', '善缘'],
        weight: 16,
        loc: '汴京',
        time: '旬日',
        story: '入夜，瓦子勾栏里锣声一起，看棚便坐满了人。说书人拍下醒木，讲的是前朝兴废。帘后有个女子在理茶盏，抬眼向你这边一瞥，眼里像有算计，也像有笑。',
        options: [
          {
            t: '占个末座，听完整本',
            dim: 'xiu',
            time: '旬日',
            fx: function (s) {
              s.attrs.xin += 2; s.attrs.ming += 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 10;
              return '一段听完，灯也残了。那女子替你续了半盏凉茶，说：「郎君听得认真，倒不像来凑热闹的。」';
            }
          },
          {
            t: '与九娘合伙盘下这间棚子',
            dim: 'li',
            time: '一季',
            req: { qian: 45 },
            fx: function (s) {
              s.attrs.qian -= 11; s.attrs.ming += 3; s.hidden.zhi += 2;
              s.flags['瓦子有份'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 24;
              return '你出本钱，她出人情与门路。棚子换了新幔，锣声比先前更响。夜里她对账，算盘珠子拨得极快，抬头道：「郎君只管读书，这些俗事我来。」';
            }
          },
          {
            t: '散尽囊中零钱，替看客付了茶资',
            dim: 'yi',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian -= 5; s.attrs.ming += 2; s.hidden.yin += 4;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 6;
              return '满棚人哄笑起来，说今日遇上个痴郎君。角落里一个同乡少年记住了你的脸，临走替你掀了帘子。';
            }
          },
          {
            t: '不看不听，绕道回斋',
            dim: 'shi',
            time: '旬日',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.xin -= 1;
              return '你从人声里挤过去，身后锣鼓催得急。回到斋中，摊开书，字却一个也进不去。';
            }
          }
        ]
      },

      {
        id: 'song_diancha',
        title: '斗茶',
        tags: ['日常'],
        weight: 12,
        time: '旬日',
        story: '茶肆里斗茶正酣。众人点茶，以茶匙击拂，看谁盏中汤花咬得住盏壁、久而不散。邻座老者递来一只建盏，笑问：「郎君也来一试？」',
        options: [
          {
            t: '接过茶筅，细注缓击',
            dim: 'xiu',
            time: '旬日',
            fx: function (s) {
              s.attrs.xin += 2; s.attrs.ming += 2;
              return '你手很稳。汤花如雪，久久不退。老者看了半晌，只说：「心静的人，茶也静。」';
            }
          },
          {
            t: '以高价买下那盏名器',
            dim: 'li',
            time: '旬日',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian -= 10; s.attrs.ming += 2;
              s.flags['藏有一盏'] = 1;
              return '盏底有小裂，卖者不肯减价。你仍买了。此后每逢客至，你便取它出来，说这裂纹是旧年窑火留下的。';
            }
          },
          {
            t: '替茶肆题一联于壁',
            dim: 'shi',
            time: '旬日',
            req: { cai: 35 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 2;
              return '你援笔立就。掌柜喜出望外，逢人便指那壁上的字。此后你路过，总有人替你留一张靠窗的桌子。';
            }
          },
          {
            t: '趁乱藏起邻座的钱囊',
            dim: 'yi',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian += 7; s.hidden.yin -= 3; s.attrs.xin -= 2;
              return '人群正笑，你把那只囊扫进袖里。出门时手心全是汗，风吹过来，竟有些冷。';
            }
          }
        ]
      },

      {
        id: 'song_jiaozi',
        title: '交子',
        tags: ['日常'],
        weight: 11,
        time: '一季',
        minScene: 3,
        story: '蜀中客商携来一叠纸券，说是以铁钱为本，可兑可转，名曰交子。他把券在你眼前一晃：「郎君若信得过，这纸比钱轻，却比钱走得远。」',
        options: [
          {
            t: '倾囊换券，随商队行货',
            dim: 'li',
            time: '一年',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian += 14; s.attrs.ming += 2; s.hidden.yun += 2;
              s.flags['用交子'] = 1;
              return '纸券在几处铺子里都认。你第一次觉得，钱原来可以不长脚，也能走千里。';
            }
          },
          {
            t: '只换少许，试其真伪',
            dim: 'shi',
            time: '两月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.qian += 3;
              return '你拿小半去兑，分毫不差。剩下的便压在箱底，闲时取出来看那印纹，想这世上的信，究竟是谁替谁立的。';
            }
          },
          {
            t: '劝客商慎行，恐纸上生风波',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.xin += 2; s.hidden.yin += 2;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 9;
              return '客商笑你迂。九娘在旁听了，却低声说：「这年头，肯说一句实话的人不多了。」';
            }
          },
          {
            t: '伪造数张，混入市面',
            dim: 'yi',
            time: '两月',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.qian += 18; s.attrs.ming -= 4; s.hidden.yin -= 5;
              s.flags['私造交子'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10;
              return '印纹描得极像，连老商都拿眼眯了半天。你花得痛快，只是每回听见街上有人争执，便不由自主地站住。';
            }
          }
        ]
      },

      {
        id: 'song_shuyuan',
        title: '书院',
        tags: ['日常', '善缘'],
        weight: 12,
        time: '一年',
        story: '山中有书院，堂前古松，讲席不设门户，寒士亦可听讲。主讲先生正说到「格物」二字，忽而停住，问在座诸生：「物在何处？」满堂寂然。',
        options: [
          {
            t: '起身答以「在眼前一草一木」',
            dim: 'shi',
            time: '一年',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.ming += 2; s.hidden.zhi += 2;
              s.flags['治学'] = 1;
              return '先生看你良久，说：「肯向眼前看，便不算空谈。」那一日之后，斋里常有人来与你论难。';
            }
          },
          {
            t: '默坐终日，一字不答',
            dim: 'xiu',
            time: '半载',
            fx: function (s) {
              s.attrs.xin += 4; s.attrs.cai += 2; s.hidden.zhi += 2;
              s.flags['治学'] = 1;
              return '钟响了三回，你才觉出膝已麻木。出门时山月正上，照见石阶上一层薄露。';
            }
          },
          {
            t: '捐资为书院置田',
            dim: 'li',
            time: '一季',
            req: { qian: 60 },
            fx: function (s) {
              s.attrs.qian -= 18; s.attrs.ming += 4; s.hidden.yin += 4;
              s.flags['书院有田'] = 1;
              return '先生说，田在，讲席便不会断。你的名字被写在册末，字很小，却压得住纸。';
            }
          },
          {
            t: '夜访先生，问以时政',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 2; s.hidden.zhi += 2;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 9;
              return '先生只说了半句：「法无善恶，行法的人有。」灯芯爆了一声，他便不肯再讲。同舍的李慕之在门外等你，眼睛很亮。';
            }
          }
        ]
      },

      {
        id: 'song_caoyun',
        title: '漕运',
        tags: ['日常', '江湖奇遇'],
        weight: 11,
        time: '两月',
        loc: '汴河',
        story: '汴河上纲船首尾相接，粮纲、盐纲、花石纲，各有各的旗号。押纲的小吏在船头点数，见你立在岸上，招手道：「郎君若闲，来搭把手，也算长个见识。」',
        options: [
          {
            t: '随船押纲，走一遭淮上',
            dim: 'li',
            time: '一季',
            fx: function (s) {
              s.attrs.qian += 7; s.attrs.ti += 2; s.hidden.zhi += 3;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '船过闸时，纤夫赤着膀子喊号子，声音在河面上滚。严七塞给你一包碎银，说这是规矩。';
            }
          },
          {
            t: '记下沿途损耗，欲上呈有司',
            dim: 'shi',
            time: '两月',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 2; s.hidden.yin += 3;
              s.flags['理过漕账'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 10;
              return '你把数目一笔笔记清。严七的笑淡了，说：「郎君是做大事的人，只是别把路走窄了。」';
            }
          },
          {
            t: '只借船头一角，看水看云',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.xin += 2;
              return '河水浑黄，天色却极净。你看了一日，什么也没做，心里那点急躁不知何时散了。';
            }
          },
          {
            t: '夜半凿船，劫一纲盐',
            dim: 'yi',
            time: '两月',
            req: { ti: 45 },
            fx: function (s) {
              s.attrs.qian += 16; s.attrs.ming -= 5; s.hidden.yin -= 5; s.attrs.ti -= 2;
              s.flags['沾过私盐'] = 1;
              return '水声盖住了一切。事成之后，你在芦苇里蹲了半夜，才敢抬头。天上的星很多，一颗也不认得。';
            }
          }
        ]
      },

      {
        id: 'song_taixue',
        title: '斋舍',
        tags: ['朝堂风波', '日常'],
        weight: 12,
        time: '半载',
        minScene: 4,
        story: '太学斋舍，夜谈最盛。有人拍案骂执政，有人默坐抄经。李慕之把一封家书压在灯下，信上说乡里又旱了。他抬眼看你：「你说，读书究竟为了什么？」',
        options: [
          {
            t: '为天下，不为一身',
            dim: 'shi',
            time: '半载',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.cai += 2; s.hidden.zhi += 2;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 24;
              return '李慕之笑了，把家书折好：「好。他日若我先低了头，你记得今日这话。」';
            }
          },
          {
            t: '为稻粱谋，先安父母',
            dim: 'li',
            time: '半载',
            fx: function (s) {
              s.attrs.qian += 5; s.attrs.ming -= 2; s.hidden.zhi += 2;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10;
              return '他沉默一阵，说我实在。那夜灯油燃尽，两人都没再开口，却也不算不欢。';
            }
          },
          {
            t: '为求一个心安',
            dim: 'xiu',
            time: '半载',
            fx: function (s) {
              s.attrs.xin += 3; s.attrs.cai += 3;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 17;
              return '「心安最难。」他把窗推开一条缝，「我夜里总睡不实。」';
            }
          },
          {
            t: '趁夜联名上书，攻讦执政',
            dim: 'yi',
            time: '半载',
            req: { cai: 50 },
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.cai += 2; s.hidden.yin -= 2;
              s.flags['曾上书'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 10;
              var m = G.npc(s, 'li', { name: '李慕之' }); m.rel -= 6;
              return '书成，署名者数人，裴敬的名字写在最前。李慕之按了手印，却整夜坐在阶上，没有回斋。';
            }
          }
        ]
      },

      {
        id: 'song_dianhu',
        title: '佃户',
        tags: ['日常', '灾祸'],
        weight: 10,
        time: '一季',
        story: '庄上佃户老周来告，说今年租子实在纳不上，求宽限一季。他身后跟着个瘦孩子，鞋露着脚趾，却把手里半个饼藏到背后。管家在旁冷笑：「宽了这家，别家便都来求。」',
        options: [
          {
            t: '免了这一季的租',
            dim: 'yi',
            time: '一季',
            fx: function (s) {
              s.attrs.qian -= 9; s.attrs.ming += 3; s.hidden.yin += 5;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10;
              return '老周跪下去，被你扶住。那孩子把饼掰了一半，执意塞给你，饼上还有他手心的汗。';
            }
          },
          {
            t: '依例收租，分文不让',
            dim: 'li',
            time: '一季',
            fx: function (s) {
              s.attrs.qian += 8; s.attrs.ming -= 2; s.hidden.yin -= 3;
              return '管家点头称是。谷子量过，老周挑着空筐走远，孩子跟在后面，一次也没回头。';
            }
          },
          {
            t: '免租，但令其子入庄学识字',
            dim: 'shi',
            time: '一年',
            req: { cai: 30 },
            fx: function (s) {
              s.attrs.qian -= 5; s.attrs.ming += 3; s.attrs.cai += 2; s.hidden.yin += 4;
              s.flags['庄学'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 14;
              return '孩子进学堂那日，老周在门外站了很久。他不敢进去，怕自己的泥脚踏脏了地。';
            }
          },
          {
            t: '把租子转押给邻庄，从中取利',
            dim: 'yi',
            time: '半载',
            fx: function (s) {
              s.attrs.qian += 11; s.attrs.ming -= 2; s.hidden.yin -= 4;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '字据画了押，老周不识字，只按了个手印。严七收好契纸，说：「郎君这事办得利落。」';
            }
          }
        ]
      },

      {
        id: 'song_jianxia',
        title: '夜雨剑客',
        tags: ['江湖奇遇'],
        weight: 9,
        time: '旬日',
        story: '破庙檐下，雨脚如麻。一个披蓑衣的人靠在柱边磨剑，磨得很慢。他忽然道：「后面有人追我。你若怕，现在走。」话音未落，庙外已起了马蹄声。',
        options: [
          {
            t: '吹熄灯火，与他共守庙门',
            dim: 'yi',
            time: '旬日',
            req: { ti: 40 },
            fx: function (s) {
              s.attrs.ti -= 3; s.attrs.ming += 3; s.hidden.zhi += 3; s.hidden.yin += 3;
              s.flags['救过剑客'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
              return '你俩背靠着背。来的人没讨到便宜，退走时留下一句话，说这笔账记下了。剑客收剑入鞘，问你姓名，你只说了乡里。';
            }
          },
          {
            t: '指一条小路，自己避入后山',
            dim: 'xiu',
            time: '旬日',
            fx: function (s) {
              s.attrs.xin += 3; s.hidden.yun += 2;
              return '你在雨里走了半夜，天亮时回望，庙已烧了。不知那人走脱没有。';
            }
          },
          {
            t: '向追骑告发，领一笔赏钱',
            dim: 'li',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian += 11; s.attrs.ming -= 3; s.hidden.yin -= 5;
              s.flags['卖过江湖客'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '领头的抛来一袋钱，很沉。你数的时候手在抖，不知是冷的，还是别的缘故。';
            }
          },
          {
            t: '劝他弃剑，随你去投官',
            dim: 'shi',
            time: '两月',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.ming += 2; s.attrs.cai += 3;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 6;
              return '那人听了，忽然笑起来，笑声在庙里荡：「官？」他把剑横在膝上，「我这把剑，就是被官逼出来的。」';
            }
          }
        ]
      },

      {
        id: 'song_xu_bu',
        title: '卜肆',
        tags: ['鬼神异闻', '善缘'],
        weight: 8,
        time: '一月',
        story: '桥头卜肆，一幡一几。老者须发皆白，自称姓徐，不问你生辰，只看你一眼，便道：「你眉间有事未了。」说罢把三枚钱推到你面前。',
        options: [
          {
            t: '掷钱问前程',
            dim: 'shi',
            time: '一月',
            fx: function (s) {
              s.attrs.cai += 3; s.hidden.yun += 2;
              s.flags['问过前程'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 8;
              return '钱落，两正一反。徐翁看了很久，说：「走得远，回得晚。」你问是何意，他只摇头，收起钱不再言语。';
            }
          },
          {
            t: '问一桩心病',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.xin += 2; s.hidden.yin += 2;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 12;
              return '你说了很久。他听完，只道：「放不下的，多半不是那件事，是你自己。」风把幡吹得啪啪响。';
            }
          },
          {
            t: '以重金求改运之法',
            dim: 'li',
            time: '两月',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian -= 14; s.hidden.yun += 4; s.hidden.yin -= 2;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 4;
              return '他收了钱，替你换了一个方位住，又嘱咐某日不可出门。你都照做了。至于灵不灵，谁也说不上。';
            }
          },
          {
            t: '掀了他的卦摊，斥其妖言',
            dim: 'yi',
            time: '旬日',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.xin -= 3; s.hidden.yun -= 3; s.hidden.yin -= 2;
              s.flags['得罪徐翁'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel -= 20;
              return '铜钱滚了一地。老人不怒，慢慢蹲下去一枚枚捡，说：「郎君命硬，只是硬得苦。」';
            }
          }
        ]
      },

      {
        id: 'song_shanfei',
        title: '山道',
        tags: ['江湖奇遇', '灾祸'],
        weight: 9,
        time: '一月',
        story: '山道窄，前头横着几根断木。树后转出数人，为首者拎着刀，先看你腰间，再看你行囊：「留下买路的钱，人可以走。」',
        options: [
          {
            t: '破财免灾，尽数奉上',
            dim: 'li',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian -= 9; s.attrs.ming -= 2; s.hidden.yun += 2;
              return '他们把行囊倒空，连一件旧衣也拿走了。你走下山时，风比来时冷。';
            }
          },
          {
            t: '自报太学名号，与之周旋',
            dim: 'shi',
            time: '一月',
            req: { ming: 30 },
            fx: function (s) {
              s.attrs.ming += 2; s.attrs.cai += 3;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 8;
              return '为首者愣了一下，说自家也是被逼上山的，早些年还听过太学的讲。他让人挪开断木，只取了你半囊钱。';
            }
          },
          {
            t: '抽身便走，钻入林中',
            dim: 'yi',
            time: '旬日',
            req: { ti: 35 },
            fx: function (s) {
              s.attrs.ti -= 2; s.hidden.zhi += 3;
              return '荆棘扯破了衣袖。你跑了很久，直到听不见身后脚步，才靠着一棵树坐下，喘得像风箱。';
            }
          },
          {
            t: '席地而坐，与之讲律法利害',
            dim: 'xiu',
            time: '一月',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.xin += 2; s.hidden.yin += 3;
              return '你讲了半日。为首者从冷笑到沉默，最后丢下一句「读书人真麻烦」，竟真的走了。';
            }
          }
        ]
      },

      {
        id: 'song_dukou',
        title: '渡口',
        tags: ['日常', '江湖奇遇'],
        weight: 10,
        time: '旬日',
        story: '渡口无桥，只有一条旧船。船夫说，今日水急，只渡识水性的。岸上还立着一个抱包袱的妇人，怀里的孩子烧得脸通红。',
        options: [
          {
            t: '让妇人与孩子先渡',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.hidden.yin += 5; s.attrs.ming += 2; s.attrs.ti -= 2;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 6;
              return '船到中流，孩子哭了一声，妇人便哭了。你立在岸上，等到日头偏西才得过河。';
            }
          },
          {
            t: '出钱雇两条船，一并渡了',
            dim: 'li',
            time: '旬日',
            req: { qian: 35 },
            fx: function (s) {
              s.attrs.qian -= 8; s.attrs.ming += 2; s.hidden.yin += 3;
              return '船夫收了钱，话也多了，一路讲的都是上下游的旧事。你听着，竟觉得这条河比书上写的更活。';
            }
          },
          {
            t: '挽袖下水，推船过急流',
            dim: 'shi',
            time: '旬日',
            req: { ti: 45 },
            fx: function (s) {
              s.attrs.ti += 2; s.attrs.ming += 3; s.hidden.yin += 3;
              return '水冷得像刀。上岸时你两腿发软，船夫拍着你肩说，这样的读书人，他头一回见。';
            }
          },
          {
            t: '自寻上游浅滩，涉水而过',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.ti += 3; s.attrs.xin += 3; s.hidden.zhi += 2;
              return '浅滩的石头很滑。你走了小半日，衣摆全湿，倒是省下了一笔船钱，也多看了几里山色。';
            }
          }
        ]
      },

      {
        id: 'song_qingli',
        title: '庆历党议',
        tags: ['朝堂风波'],
        weight: 12,
        time: '一年',
        minScene: 6,
        cond: { cai: 45 },
        story: '朝中议新政，罢黜与擢升在旬月之间换了几回。旧友来信，说某公已被贬，某公新入枢府，末了一句：「郎君欲站哪一边？站晚了，两边都不认你。」',
        options: [
          {
            t: '附新政，上书言事',
            dim: 'shi',
            time: '一年',
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.cai += 2; s.attrs.xin -= 3;
              s.flags['新党'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 14;
              return '你的名字上了荐书的名单。有人开始在茶肆里向你拱手，也有人绕着你走。';
            }
          },
          {
            t: '守旧制，为贬者辩',
            dim: 'xiu',
            time: '一年',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.xin += 2;
              s.flags['旧党'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 10;
              return '裴敬在信里称你「有守」。你读完信，把它烧了。这年头，白纸黑字最是靠不住。';
            }
          },
          {
            t: '称病不出，闭门读书',
            dim: 'xiu',
            time: '两载',
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.xin += 2; s.attrs.ming -= 2;
              s.flags['不涉党争'] = 1;
              return '你把门关了一整年。墙外风声时紧时松，你只听见笔尖划过纸的声音。';
            }
          },
          {
            t: '两头递话，居中取利',
            dim: 'li',
            time: '一年',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian += 16; s.attrs.ming -= 2; s.hidden.zhi += 3; s.hidden.yin -= 2;
              s.flags['骑墙'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 12;
              return '你在两家之间走了许多趟。银子进得快，只是每回听见「党」这个字，胃里都要翻一下。';
            }
          }
        ]
      },

      {
        id: 'song_xining',
        title: '青苗',
        tags: ['朝堂风波', '日常'],
        weight: 11,
        time: '一年',
        minScene: 8,
        story: '新法行于州县。青苗钱春贷秋还，本意是济农，行到下面却成了摊派。老农捧着借据，看不懂上面写的是什么，只问：「这钱，是不是不借也得借？」',
        options: [
          {
            t: '违令不摊，只贷与真贫者',
            dim: 'yi',
            time: '一年',
            fx: function (s) {
              s.attrs.ming += 4; s.hidden.yin += 5; s.attrs.cai += 2;
              s.flags['忤新法'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10;
              return '上官的文书下来申斥，你把它压在案底。老农们夜里悄悄来还钱，多是一把米、两只鸡。';
            }
          },
          {
            t: '依令催缴，务求考课',
            dim: 'shi',
            time: '一年',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.qian += 7; s.attrs.xin -= 2;
              s.flags['行新法'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10;
              return '考课列了上等。你升了一阶，宴上有人举杯称你干练。回衙时天已黑透，门外蹲着个还不上钱的农户。';
            }
          },
          {
            t: '上书言其弊，请宽限期',
            dim: 'xiu',
            time: '半载',
            req: { cai: 55 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.xin += 2; s.attrs.ming -= 3;
              return '书递上去，如石投水。数月后有一纸批语回来，说你「书生之见」。你把那纸折好，收进箱里。';
            }
          },
          {
            t: '按借据加息，转贷与商人',
            dim: 'li',
            time: '一年',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.ming -= 3; s.hidden.yin -= 5;
              s.flags['借法牟利'] = 1;
              return '钱从官仓出，转一圈回来，厚了一层。你做得极干净，账上挑不出错，只是夜里常梦见那些按手印的手。';
            }
          }
        ]
      },

      {
        id: 'song_taijian',
        title: '台谏',
        tags: ['朝堂风波'],
        weight: 10,
        time: '半载',
        minScene: 7,
        cond: { ming: 35 },
        story: '台谏官风闻奏事，一纸弹章可以断人前程。今日被论的是你的座主，罪名含糊，只说是「交结」。同僚纷纷避席，唯有你还照旧去他府上问安。',
        options: [
          {
            t: '公开为座主申辩',
            dim: 'yi',
            time: '半载',
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.xin += 2; s.hidden.zhi += 3;
              s.flags['为座主辩'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 12;
              return '你在朝堂上说完，满殿无人接话。退朝时裴敬与你并肩走了一段，什么也没说，只把伞往你这边偏了偏。';
            }
          },
          {
            t: '上章自劾，与之同贬',
            dim: 'xiu',
            time: '半载',
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.xin += 4; s.attrs.cai += 3;
              s.flags['同贬'] = 1;
              return '你被贬去外州。离京那日，座主立在城门外，老得厉害，只说了句：「何苦。」';
            }
          },
          {
            t: '闭门谢客，静待风头',
            dim: 'li',
            time: '半载',
            fx: function (s) {
              s.attrs.ming -= 2; s.attrs.xin -= 2; s.hidden.zhi += 2;
              return '你把门闩上了。半月后风头过去，座主罢官，你安然无恙，只是再没人来与你论学。';
            }
          },
          {
            t: '暗递座主旧事，以求自保',
            dim: 'yi',
            time: '半载',
            fx: function (s) {
              s.attrs.ming += 2; s.attrs.qian += 7; s.hidden.yin -= 5; s.attrs.xin -= 2;
              s.flags['卖座主'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10;
              return '你写得很克制，句句属实，却句句要命。严七收了纸，笑道：「郎君终于肯为自己打算了。」';
            }
          }
        ]
      },

      {
        id: 'song_zhigao',
        title: '草诏',
        tags: ['朝堂风波'],
        weight: 8,
        time: '一月',
        minScene: 9,
        cond: { cai: 60 },
        story: '你值宿学士院，半夜内侍叩门，送来一道急旨：明日便要宣麻。旨意里的意思含混，褒贬两可。写重了，是杀人的笔；写轻了，是抗旨的罪。',
        options: [
          {
            t: '据实而书，不增不减',
            dim: 'shi',
            time: '一月',
            req: { cai: 55 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 4; s.hidden.zhi += 2;
              s.flags['掌过制诰'] = 1;
              return '你改到天亮，只动了几个字。宣出之后，无人挑得出毛病，也无人称快。这大约就是制诰该有的样子。';
            }
          },
          {
            t: '曲笔回护，为旧友留一线',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.attrs.ming += 2; s.attrs.xin += 2; s.hidden.yin += 3;
              s.flags['曲笔'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 20;
              return '诏中「贬」字换作了「罢」，一字之差，便是天壤。内侍看了你一眼，什么也没问。';
            }
          },
          {
            t: '揣摩上意，加重其罪',
            dim: 'li',
            time: '一月',
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.qian += 9; s.hidden.yin -= 4; s.attrs.xin -= 2;
              s.flags['笔下杀人'] = 1;
              return '笔落下去，你听见自己心跳。次日内侍来传话，说官家称你「识大体」。你谢恩，膝盖有些发软。';
            }
          },
          {
            t: '称病交还旨意，请他人代笔',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.xin += 2; s.attrs.ming -= 2; s.attrs.cai += 2;
              return '你把笔搁下，说目疾骤发。此事后来无人再提，只是再有大诏，便不点你了。';
            }
          }
        ]
      },

      {
        id: 'song_dangan',
        title: '党籍',
        tags: ['朝堂风波'],
        weight: 9,
        time: '半载',
        minScene: 12,
        story: '州学门前立起一块碑，刻着元祐党人姓名。碑成之日，有司令众人往观，观者须自陈与之无涉。人群里有人低声念着碑上的名字，念到一半便停了。',
        options: [
          {
            t: '在碑前长揖，不避人眼',
            dim: 'yi',
            time: '半载',
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.xin += 3; s.hidden.yin += 4;
              s.flags['党籍碑下'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 16;
              return '你揖下去，四周骤然安静。守碑的差役握紧了棍，终究没动。裴敬远远看着，转身走了。';
            }
          },
          {
            t: '随众自陈，划清界限',
            dim: 'li',
            time: '半载',
            fx: function (s) {
              s.attrs.ming -= 3; s.attrs.xin -= 2; s.hidden.zhi += 3;
              s.flags['与党人绝'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 14;
              return '你在名册上画了押。夜里裴敬遣人送来一封信，只有四个字：「从此两清。」';
            }
          },
          {
            t: '抄下碑文，藏于箧底',
            dim: 'shi',
            time: '半载',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 2; s.hidden.zhi += 3; s.attrs.ming += 3;
              s.flags['存党籍碑文'] = 1;
              return '你抄得极工整。日后这些名字会有人重新提起，你想。纸很薄，压在手心却重。';
            }
          },
          {
            t: '夜半携锤，欲碎此碑',
            dim: 'yi',
            time: '一月',
            req: { ti: 45 },
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.ti -= 3; s.hidden.yin -= 2; s.hidden.zhi += 5;
              s.flags['碎碑'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10;
              return '锤落第一下，声音大得吓人。阿禾在巷口替你望风，事成后拉着你跑了几条街，两个人都笑不出来。';
            }
          }
        ]
      },

      {
        id: 'song_huang',
        title: '蝗',
        tags: ['天灾时疫', '灾祸'],
        weight: 10,
        time: '一季',
        story: '蝗自北来，蔽日如云。田里的青苗一夜之间只剩秆子。老农跪在田头叩首，说这是天谴，不敢捕。县里贴出告示，捕蝗论斗给赏，换米论升。',
        options: [
          {
            t: '亲下田亩，率众捕蝗',
            dim: 'shi',
            time: '一季',
            fx: function (s) {
              s.attrs.ti -= 2; s.attrs.ming += 4; s.attrs.cai += 3;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
              return '你带着人挖沟烧火，烟熏得睁不开眼。几日下来，田保住了小半。老农不再叩首，跟着你下了地。';
            }
          },
          {
            t: '散尽存粮，设粥棚于村口',
            dim: 'yi',
            time: '一季',
            req: { qian: 45 },
            fx: function (s) {
              s.attrs.qian -= 16; s.attrs.ming += 5; s.hidden.yin += 6;
              s.flags['施粥'] = 1;
              return '粥棚支了整整一月。你瘦了一圈，却记住了每一张来接粥的脸。有个孩子后来常来，说长大要还你。';
            }
          },
          {
            t: '囤粮待价，闭门不出',
            dim: 'li',
            time: '一季',
            fx: function (s) {
              s.attrs.qian += 18; s.attrs.ming -= 4; s.hidden.yin -= 5;
              s.flags['囤粮'] = 1;
              return '粮价果然一日一涨。你数着钱，听见墙外有人哭，便把钱箱盖上了。';
            }
          },
          {
            t: '设坛祈禳，劝民勿杀生',
            dim: 'xiu',
            time: '半载',
            fx: function (s) {
              s.attrs.xin += 2; s.attrs.ming += 3; s.hidden.yun += 2; s.hidden.yin += 2;
              return '香烧了许多日，蝗虫终究是自己飞走的，田也空了。人们说心诚则灵，你没有反驳。';
            }
          }
        ]
      },

      {
        id: 'song_juehe',
        title: '汴河决',
        tags: ['天灾时疫', '灾祸'],
        weight: 9,
        time: '两月',
        loc: '汴京',
        story: '连日大雨，汴河水位暴涨，堤上已见渗漏。守堤的兵卒敲锣示警，城中却还有人在灯下饮酒。水若进来，先淹的不是高门，是城西那些低洼的屋子。',
        options: [
          {
            t: '上堤与役夫一同筑土',
            dim: 'yi',
            time: '两月',
            req: { ti: 40 },
            fx: function (s) {
              s.attrs.ti -= 2; s.attrs.ming += 5; s.hidden.yin += 5;
              s.flags['守过堤'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
              return '沙袋压上去，水还是从缝里钻。你与阿禾在泥里滚了一夜，天亮时堤保住了，人瘫成一排。';
            }
          },
          {
            t: '先遣人迁城西老弱',
            dim: 'shi',
            time: '一月',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.cai += 3; s.hidden.yin += 5;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 17;
              return '九娘把瓦子的棚子腾出来安置人。她一边发干粮一边骂官府，骂得极有条理，听得众人都笑了。';
            }
          },
          {
            t: '趁乱低价买下城西屋契',
            dim: 'li',
            time: '两月',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian += 14; s.attrs.ming -= 4; s.hidden.yin -= 5;
              s.flags['水患买地'] = 1;
              return '契纸上的墨还没干，水就退了。你买下的那些屋子，后来成了一整条街。';
            }
          },
          {
            t: '闭户搬书，先护住一箱旧籍',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.xin += 3;
              return '你把书箱架到梁上，自己坐在桌上过了一夜。水到门槛便停了，像是特意绕开这一间。';
            }
          }
        ]
      },

      {
        id: 'song_shiyi',
        title: '时疫',
        tags: ['天灾时疫', '灾祸'],
        weight: 9,
        time: '一季',
        story: '疫起于城南，先是一家，后是一巷。城门未闭，药价一日贵过一日。有人在巷口烧艾，烟低低地伏在地上，不肯散。',
        options: [
          {
            t: '入疫巷施药，昼夜不歇',
            dim: 'yi',
            time: '一季',
            req: { ti: 45 },
            fx: function (s) {
              s.attrs.ti -= 5; s.attrs.ming += 5; s.hidden.yin += 7;
              s.hidden.yun -= 2;
              s.flags['疫中施药'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 14;
              if (s.attrs.ti <= 12) { n.alive = false; s.flags['阿禾殁'] = 1; }
              return s.flags['阿禾殁']
                ? '你与阿禾轮流守着。他也染上了，走得比你预想的快。最后一日他还说，等疫过了，要回乡看看。'
                : '你与阿禾轮流守着。有人活下来，也有人死在你手里。他最常说的是「多谢」，说得你后来听不得这两个字。';
            }
          },
          {
            t: '出重金购药，转售城中',
            dim: 'li',
            time: '一季',
            req: { qian: 55 },
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.ming -= 5; s.hidden.yin -= 5;
              s.flags['疫中牟利'] = 1;
              return '药卖得极好。有钱人家派仆人来抢，价抬到后来，你自己都觉得荒唐。';
            }
          },
          {
            t: '闭门不出，抄方书自守',
            dim: 'xiu',
            time: '一季',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.xin += 3; s.hidden.yin -= 2;
              return '你把门缝用纸糊了，每日只煮粥、读书。疫气终究没找上门，你却总觉得欠了街上什么。';
            }
          },
          {
            t: '上书请开官仓、设病坊',
            dim: 'shi',
            time: '半载',
            req: { ming: 40 },
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.cai += 2; s.hidden.yin += 4;
              s.flags['请设病坊'] = 1;
              return '文书递了数回，病坊终于设起来。你去看过一回，里头很挤，却比街上干净。';
            }
          }
        ]
      },

      {
        id: 'song_qiyu',
        title: '祈雨',
        tags: ['天灾时疫', '鬼神异闻'],
        weight: 8,
        time: '两月',
        story: '大旱，井底见泥。太守率众祷于社坛，巫师跳了整夜。台下人山人海，有人哭，有人只是木然地看着天。',
        options: [
          {
            t: '随众跪祷，直至天明',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.xin += 2; s.hidden.yun += 2; s.hidden.yin += 2;
              s.attrs.ti -= 3;
              return '露水打湿了衣襟。天将亮时，云从西边压过来，落了几点，便又散了。人群里还是响起了欢呼。';
            }
          },
          {
            t: '献金置香，为全城祈福',
            dim: 'li',
            time: '两月',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian -= 11; s.attrs.ming += 4; s.hidden.yun += 2;
              return '香案摆了数日。太守当众谢你，说城中士绅该以你为范。你听着，只盼那云别散得太快。';
            }
          },
          {
            t: '开渠引水，不待天时',
            dim: 'shi',
            time: '一季',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 4; s.attrs.ti -= 2;
              s.flags['开过渠'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 10;
              return '你带人测了地势，从邻县引水入渠。渠成那日下了雨，众人却都说是你的渠引来的。';
            }
          },
          {
            t: '夜掘社坛，取其埋藏',
            dim: 'yi',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian += 14; s.attrs.ming -= 5; s.hidden.yin -= 6; s.hidden.yun -= 3;
              s.flags['掘坛'] = 1;
              return '坛下埋着旧年的铜器与玉。你取走了大半。此后每逢旱天，你都不大敢抬头看云。';
            }
          }
        ]
      },

      {
        id: 'song_suibi',
        title: '岁币',
        tags: ['边境战事', '朝堂风波'],
        weight: 10,
        time: '一年',
        minScene: 5,
        story: '北使入城，馆伴使在驿中与之力争「献」与「纳」一字之差。议定之后，岁输银绢如约，边关无事。城中人照旧赶集，只有几个太学生聚在桥头，说这是耻。',
        options: [
          {
            t: '上书请罢岁币，修边备',
            dim: 'yi',
            time: '一年',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.cai += 2; s.hidden.zhi += 3; s.attrs.xin -= 2;
              s.flags['主战'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 17;
              return '书入不报。李慕之却把你的稿子抄了一份，说将来总要有人记得这话。';
            }
          },
          {
            t: '受命押送岁币，亲走一趟',
            dim: 'shi',
            time: '两载',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.cai += 2; s.attrs.ti -= 2;
              s.flags['押过岁币'] = 1;
              return '车队出关那日，风很大。你看着那些银箱被搬上对方的车，忽然明白了什么叫「以财事人」。';
            }
          },
          {
            t: '于榷场通商，从中抽息',
            dim: 'li',
            time: '一年',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian += 18; s.attrs.ming += 2; s.hidden.zhi -= 2;
              s.flags['榷场通商'] = 1;
              return '南北货物在场上换手。你渐渐觉得，刀兵之外另有一条路，只是这条路从不写在奏章里。';
            }
          },
          {
            t: '不置一词，归家温书',
            dim: 'xiu',
            time: '一年',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.xin += 3; s.attrs.ming -= 3;
              return '桥头的议论散得很快。你合上书，窗外正有北来的商队经过，驼铃一路响到夜里。';
            }
          }
        ]
      },

      {
        id: 'song_xixia',
        title: '西夏犯边',
        tags: ['边境战事', '灾祸'],
        weight: 10,
        time: '两载',
        minScene: 9,
        story: '西边急报，蕃骑犯边，破了几座寨子。州里募人守城，应募者寥寥。你站在城门下看那张告示，墨迹被风掀起一角。',
        options: [
          {
            t: '投笔从戎，随军西行',
            dim: 'yi',
            time: '三年',
            req: { ti: 45 },
            fx: function (s) {
              s.attrs.ti += 2; s.attrs.ming += 5; s.attrs.cai -= 3; s.attrs.xin += 2;
              s.hidden.zhi += 4;
              s.flags['从军西夏'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 14;
              return '阿禾跟了你一路。边地的月比中原大，夜里冷得能听见骨头响。你们守住了城，也埋了几个人。';
            }
          },
          {
            t: '筹粮助军，奔走于州县',
            dim: 'shi',
            time: '两载',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 4; s.attrs.qian += 5;
              s.flags['筹粮'] = 1;
              return '你算过每石米能走几日路。转运使看了你的册子，说若人人都这样办事，边事何至于此。';
            }
          },
          {
            t: '献守御之策，条陈利害',
            dim: 'shi',
            time: '一年',
            req: { cai: 55 },
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.ming += 5; s.hidden.zhi += 2;
              s.flags['献边策'] = 1;
              return '你的策子被抄送边帅，据说颇为称许。至于用没用，你后来在邸报里只看到一句「议格」。';
            }
          },
          {
            t: '举家南迁，避乱于江左',
            dim: 'li',
            time: '两载',
            fx: function (s) {
              s.attrs.qian -= 9; s.attrs.ming -= 2; s.hidden.yin -= 2;
              s.flags['避乱南迁'] = 1;
              return '船解缆时，你回头看了一眼城楼。此后再没回去过，却常常梦到那面褪色的旗。';
            }
          }
        ]
      },

      {
        id: 'song_qidan',
        title: '契丹铁骑',
        tags: ['边境战事'],
        weight: 9,
        time: '一年',
        minScene: 10,
        story: '北边传来消息，契丹游骑越境，掠了几个村子又退回去了。边将按兵不动，说是「小寇，不足劳师」。被掠的人家跪在衙前，从早跪到晚。',
        options: [
          {
            t: '代为申状，力请发兵',
            dim: 'yi',
            time: '一年',
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.cai += 2; s.hidden.yin += 4;
              s.flags['请边兵'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 17;
              return '状子递上去，边将终于动了，只是去得太晚。你后来听说，那几个村子已经空了。';
            }
          },
          {
            t: '募乡勇，自守村堡',
            dim: 'shi',
            time: '两载',
            req: { ti: 40 },
            fx: function (s) {
              s.attrs.ti += 3; s.attrs.ming += 5; s.hidden.yin += 3;
              s.flags['乡勇'] = 1;
              return '堡墙又加高了一层，壮丁轮值。契丹再来时，见有备，绕道走了。村里人叫你「相公」，叫得你不好意思。';
            }
          },
          {
            t: '出钱抚恤被掠之家',
            dim: 'li',
            time: '两月',
            req: { qian: 40 },
            fx: function (s) {
              s.attrs.qian -= 11; s.attrs.ming += 3; s.hidden.yin += 5;
              return '钱分下去，有人磕头，有人只是哭。你这才知道，人到了极处，是道不出谢的。';
            }
          },
          {
            t: '置之不理，专心举业',
            dim: 'xiu',
            time: '一年',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming -= 3;
              return '你把窗关上，读了一整个冬天的经义。开春时衙前那块地方，已经看不出跪过的痕迹。';
            }
          }
        ]
      },

      {
        id: 'song_chengfang',
        title: '城守',
        tags: ['边境战事', '灾祸'],
        weight: 9,
        time: '一季',
        minScene: 16,
        story: '兵临城下。守臣登陴，见城外旌旗连天，城中却还有人在争该战该和。粮只够半月，箭只够三轮。有人悄悄收拾细软，往南门去了。',
        options: [
          {
            t: '登城督战，与士卒同食',
            dim: 'yi',
            time: '一季',
            req: { ti: 45 },
            fx: function (s) {
              s.attrs.ming += 6; s.attrs.ti -= 4; s.hidden.zhi += 4; s.hidden.yin += 4;
              s.flags['守城'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 16;
              if (s.attrs.ti <= 10) { n.alive = false; s.flags['阿禾殁'] = 1; }
              return s.flags['阿禾殁']
                ? '你在城头守了几日几夜。阿禾替你挡了一下，那一挡之后再没起来。城守住了，你却记不清自己当时喊了什么。'
                : '你在城头守了几日几夜。箭擦着耳过去，你竟不觉得怕。阿禾替你挡了一下，手臂上留了道很深的口子。';
            }
          },
          {
            t: '主持和议，以金帛退兵',
            dim: 'shi',
            time: '一季',
            req: { cai: 50 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 3; s.attrs.qian -= 14;
              s.flags['主和'] = 1;
              return '你出城谈判，来去三趟。兵是退了，城也保住了，只是此后每逢有人说「气节」，你便不接话。';
            }
          },
          {
            t: '保护城中书版与图籍南运',
            dim: 'xiu',
            time: '一季',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 4; s.hidden.yin += 3;
              s.flags['护书南运'] = 1;
              return '书版装了许多车，从南门走。城破之后，那些版片在江边重新印出书来，字里还带着火气。';
            }
          },
          {
            t: '携家先出南门',
            dim: 'li',
            time: '两月',
            fx: function (s) {
              s.attrs.qian += 5; s.attrs.ming -= 5; s.hidden.yin -= 4;
              s.flags['先遁'] = 1;
              return '南门挤得水泄不通。你回头望了一眼，城头的旗还在，只是比昨日矮了一截。';
            }
          }
        ]
      },

      {
        id: 'song_zhaomu',
        title: '募兵',
        tags: ['边境战事', '日常'],
        weight: 8,
        time: '一年',
        story: '募兵的旗插在街心。应募者多在册上按个手印，领一串钱，便随队走了。队伍里有逃荒的，有欠债的，也有看着还算体面的少年。',
        options: [
          {
            t: '替军中点验名册，剔除老弱',
            dim: 'shi',
            time: '一年',
            req: { cai: 35 },
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 3; s.hidden.yin += 3;
              s.flags['点过兵'] = 1;
              return '你挨个看过去，划掉了好些名字。被划掉的人不肯走，说留在家里也是饿死。你无话可答。';
            }
          },
          {
            t: '出资为应募者置办行装',
            dim: 'yi',
            time: '一季',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian -= 14; s.attrs.ming += 4; s.hidden.yin += 5;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 12;
              return '每人一双新鞋、一件棉袄。发到最后，阿禾问能不能多给一双，说路上会烂。你给了。';
            }
          },
          {
            t: '趁募兵之机，贩军中杂物',
            dim: 'li',
            time: '一年',
            fx: function (s) {
              s.attrs.qian += 16; s.attrs.ming -= 2; s.hidden.yin -= 3;
              return '靴、盐、火镰，样样都缺，样样都能卖。你赚了一笔，也见惯了队伍开拔时的哭。';
            }
          },
          {
            t: '上书请以弓手代正兵，省费养民',
            dim: 'xiu',
            time: '半载',
            req: { cai: 55 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 3; s.hidden.zhi += 2;
              return '你的条陈被留中。多年后有人重提此法，已不记得最初是谁写的了。';
            }
          }
        ]
      },

      {
        id: 'song_guishi',
        title: '鬼市',
        tags: ['鬼神异闻'],
        weight: 7,
        time: '旬日',
        story: '五更天，城外荒市未散。摊上卖的东西古怪：半面铜镜、掉了漆的妆奁、一支还带着干血的簪。摊主皆低头不语，钱丢进瓦罐里，不必问价。',
        options: [
          {
            t: '买下那面铜镜',
            dim: 'yi',
            time: '旬日',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian -= 5; s.hidden.yun += 3; s.hidden.zhi += 2;
              s.flags['鬼市铜镜'] = 1;
              return '镜面照人，比寻常的暗些。你带回家，夜里偶尔会听见很轻的梳头声，回头却什么也没有。';
            }
          },
          {
            t: '只看不问，天亮即回',
            dim: 'xiu',
            time: '旬日',
            fx: function (s) {
              s.attrs.xin += 2; s.hidden.yun += 3;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 6;
              return '你走出市口时，鸡恰巧叫了。回头看，那里只是一片乱坟，几丛枯草在风里晃。';
            }
          },
          {
            t: '买下那支簪，寻访其主',
            dim: 'shi',
            time: '两月',
            fx: function (s) {
              s.attrs.qian -= 7; s.attrs.ming += 2; s.hidden.yin += 4;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 14;
              return '簪上刻着一个小字。九娘见了，脸色变了变，说这是城东旧户人家的款式，那家早已没人了。';
            }
          },
          {
            t: '以纸钱换其瓦罐，尽取之',
            dim: 'li',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian += 11; s.hidden.yin -= 5; s.hidden.yun -= 3; s.attrs.xin -= 2;
              s.flags['取鬼市钱'] = 1;
              return '瓦罐很轻，倒出来的却不少。你数完抬头，四周摊子已一个不剩，只剩你站在雾里。';
            }
          }
        ]
      },

      {
        id: 'song_hushen',
        title: '狐',
        tags: ['鬼神异闻'],
        weight: 7,
        time: '半载',
        story: '废园久无人住，近来却有灯火。邻人说见过一个白衣女子在廊下读书，见人便避。你夜过园外，果然听见里头有翻书声。',
        options: [
          {
            t: '叩门求见，与之论书',
            dim: 'shi',
            time: '半载',
            fx: function (s) {
              s.attrs.cai += 3; s.hidden.yun += 3; s.attrs.xin += 2;
              s.flags['园中夜谈'] = 1;
              return '门自己开了。那女子隔着一盏灯与你说话，谈的都是极旧的本子。天亮时灯灭，人也不见了，案上留着一页批注，字迹娟秀。';
            }
          },
          {
            t: '备下香烛，礼而远之',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.xin += 2; s.hidden.yun += 2; s.hidden.yin += 2;
              return '你把香烛放在门外，叩了三下便走。此后再无灯火，园中的书声也断了。';
            }
          },
          {
            t: '约邻里同往，焚其园',
            dim: 'yi',
            time: '两月',
            fx: function (s) {
              s.attrs.ming += 2; s.hidden.yin -= 4; s.hidden.yun -= 2;
              s.flags['焚园'] = 1;
              return '火起时，有人看见白影从墙头掠过，快得像一缕烟。众人都说除了一害，你却在灰里拾到半页未烧尽的书。';
            }
          },
          {
            t: '将园子买下，另作书斋',
            dim: 'li',
            time: '一季',
            req: { qian: 50 },
            fx: function (s) {
              s.attrs.qian -= 14; s.attrs.cai += 2; s.attrs.ming += 2;
              s.flags['购得废园'] = 1;
              return '价钱低得可疑。你搬进去住，第一夜便听见有人在廊下踱步，走得很慢，像是在等你开口。';
            }
          }
        ]
      },

      {
        id: 'song_mengti',
        title: '梦题',
        tags: ['鬼神异闻'],
        weight: 6,
        time: '旬日',
        story: '你梦见自己立在一堵粉墙前，墙上有半首诗，笔势极熟，仿佛是自己写的，却想不起何时写过。醒来时天未亮，枕边有淡淡的墨气。',
        options: [
          {
            t: '披衣起身，把那半首续完',
            dim: 'shi',
            time: '旬日',
            req: { cai: 40 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 2; s.hidden.zhi += 2;
              s.flags['续梦诗'] = 1;
              return '续完最后一字，窗外正好有鸟叫。你把诗写在纸上，读了三遍，越读越觉得不像自己的手笔。';
            }
          },
          {
            t: '不落一字，静坐至天明',
            dim: 'xiu',
            time: '旬日',
            fx: function (s) {
              s.attrs.xin += 3; s.hidden.yun += 2;
              return '你坐着，看天光一点点把屋子填满。那半首诗渐渐模糊，像被谁收了回去。';
            }
          },
          {
            t: '四处寻那堵墙，欲验真假',
            dim: 'yi',
            time: '两月',
            fx: function (s) {
              s.attrs.ti -= 3; s.attrs.cai += 3; s.hidden.zhi += 3;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 8;
              return '你走了许多巷子。徐翁听了，只说：「梦里题的诗，多半是前世欠的债。」你没敢再问。';
            }
          },
          {
            t: '把那半首诗卖与书坊',
            dim: 'li',
            time: '一月',
            req: { ming: 35 },
            fx: function (s) {
              s.attrs.qian += 9; s.attrs.ming += 3; s.hidden.zhi += 3;
              return '书坊主看了半晌，说这诗有古意，肯出高价。刊出后有人唱和，你看著那些和诗，忽然有些心虚。';
            }
          }
        ]
      },

      {
        id: 'song_guzhong',
        title: '古冢',
        tags: ['鬼神异闻', '灾祸'],
        weight: 6,
        time: '一月',
        story: '乡人掘地得古冢，砖上有字，年号已漫漶。有人说是前朝贵人，有人说是无主的。棺木一开，里头只有一枚玉印和半卷绢书。',
        options: [
          {
            t: '命人封冢，具礼重葬',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.qian -= 5; s.attrs.ming += 2; s.hidden.yin += 5;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 10;
              return '土一锹一锹填回去。徐翁在旁看着，说：「敬死者，是敬自己将来。」';
            }
          },
          {
            t: '取玉印归己，绢书焚之',
            dim: 'li',
            time: '一月',
            fx: function (s) {
              s.attrs.qian += 14; s.attrs.ming -= 3; s.hidden.yin -= 5;
              s.flags['古冢玉印'] = 1;
              return '玉印握在手里，凉得久不回暖。绢书烧得很快，灰里浮出一行字，你没能看清。';
            }
          },
          {
            t: '细读绢书，录其文字',
            dim: 'shi',
            time: '两月',
            req: { cai: 50 },
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.ming += 2; s.hidden.zhi += 2;
              s.flags['录古冢书'] = 1;
              return '多半已朽，只余数行，记的是某年某月的家事。你把它们抄进册子，忽然觉得那人与你并不算陌生。';
            }
          },
          {
            t: '报官请赏，任官府发落',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.attrs.qian += 7; s.attrs.ming += 2; s.hidden.yin -= 2;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10;
              return '严七带人来封了冢，赏钱给得爽快。至于那些东西后来去了哪里，没人再提。';
            }
          }
        ]
      },

      {
        id: 'song_shibo',
        title: '市舶',
        tags: ['日常', '江湖奇遇'],
        weight: 10,
        time: '一年',
        loc: '泉州',
        minScene: 8,
        story: '海舶入港，桅樯蔽日。市舶司的吏员在码头抽解货物，香料、犀角、琉璃，堆得像小山。船主是个深目的胡商，用生硬的汉话问你：「郎君可愿看看货？」',
        options: [
          {
            t: '随船出海，走一遭南洋',
            dim: 'yi',
            time: '三年',
            req: { ti: 45, qian: 40 },
            fx: function (s) {
              s.attrs.ti -= 3; s.attrs.qian += 27; s.attrs.ming += 4; s.hidden.yun += 3;
              s.flags['曾下南洋'] = 1;
              return '海上没有方向，只有星与风。你吐了许多日，才勉强站得起来。回来时带的货，换了一整条街的铺面。';
            }
          },
          {
            t: '代市舶司核税，厘清旧账',
            dim: 'shi',
            time: '一年',
            req: { cai: 50 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 4; s.attrs.qian += 7;
              s.flags['市舶核税'] = 1;
              return '旧账积了多年，你理了三箩筐。胡商私下塞来一匣香料，你退了回去，他反而更敬你。';
            }
          },
          {
            t: '合伙置一艘海舶，坐收其利',
            dim: 'li',
            time: '两载',
            req: { qian: 70 },
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.ming += 2; s.hidden.zhi += 3;
              s.flags['有海舶'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 20;
              return '九娘替你看着账，连船员的月钱都算得清清楚楚。她说海上的钱来得快，去得也快，得有人守着岸。';
            }
          },
          {
            t: '只购些香料，归赠故人',
            dim: 'xiu',
            time: '一季',
            fx: function (s) {
              s.attrs.qian -= 5; s.attrs.ming += 2; s.hidden.yin += 3;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 14;
              return '香料包在粗纸里，一路走一路香。李慕之收到时笑说，这味道像是从很远的梦里来的。';
            }
          }
        ]
      },

      {
        id: 'song_quechang',
        title: '榷场',
        tags: ['日常', '边境战事'],
        weight: 9,
        time: '一季',
        story: '榷场开市，南北客商各据一边。宋人卖茶、绢、瓷，北人卖马、羊、皮毛。官设监官，抽解甚重。有人在棚下低声说，走私的路子比正路宽。',
        options: [
          {
            t: '依正途交易，纳足抽解',
            dim: 'shi',
            time: '一季',
            fx: function (s) {
              s.attrs.qian += 9; s.attrs.ming += 2; s.hidden.yin += 2;
              return '你纳完税，账面薄得可怜。监官却记住了你，说往后有要紧的货，先问你。';
            }
          },
          {
            t: '绕道私贩，避其抽解',
            dim: 'yi',
            time: '一季',
            req: { ti: 35 },
            fx: function (s) {
              s.attrs.qian += 20; s.attrs.ming -= 3; s.hidden.yin -= 4;
              s.flags['私贩'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 12;
              return '夜里过河，马嘴里衔着枚铜钱以防出声。严七在岸边接应，一句话没多问。';
            }
          },
          {
            t: '为北客作保，从中取佣',
            dim: 'li',
            time: '一季',
            req: { ming: 40 },
            fx: function (s) {
              s.attrs.qian += 14; s.attrs.ming += 2; s.attrs.cai += 3;
              s.flags['作保'] = 1;
              return '你替几桩买卖画了押。北客重信，说日后你到北边，凭这个便能通行。';
            }
          },
          {
            t: '记下马价与边情，归报有司',
            dim: 'yi',
            time: '一季',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 3; s.hidden.zhi += 2;
              s.flags['探过边情'] = 1;
              return '你把马价、盐价、牛羊数一一默记，回程写了满满几页。有司看了，问你可愿再去。';
            }
          }
        ]
      },

      {
        id: 'song_huaben',
        title: '话本',
        tags: ['日常', '善缘'],
        weight: 10,
        time: '一季',
        story: '书坊刻话本，一册卖不了几个钱，看的人却多。坊主说，如今最卖得动的是公案与烟粉，讲经义的没人要。他指着一叠旧稿：「郎君若能写，稿酬从优。」',
        options: [
          {
            t: '取市井旧闻，写一册公案',
            dim: 'li',
            time: '一季',
            req: { cai: 35 },
            fx: function (s) {
              s.attrs.qian += 11; s.attrs.ming += 4; s.hidden.zhi += 3;
              s.flags['写过话本'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 20;
              return '九娘替你改了几处对白，说市井人不会那样讲话。改过之后，坊间果然传抄得凶。';
            }
          },
          {
            t: '写前朝兴亡，寄一腔块垒',
            dim: 'shi',
            time: '一年',
            req: { cai: 50 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 5; s.hidden.zhi += 4;
              s.flags['写过兴亡'] = 1;
              return '你写得很慢，写到城破那一段，搁了好几日的笔。书出来后被人在茶肆里讲，讲到痛处，满座竟无人作声。';
            }
          },
          {
            t: '只抄旧本，收取微利',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.qian += 4; s.attrs.cai += 3; s.attrs.xin += 2;
              return '你抄了一整个月，字比原先还工整。坊主说这样的抄手难找，问你可愿长做。';
            }
          },
          {
            t: '把话本改成讲经的底本',
            dim: 'yi',
            time: '一年',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 2; s.hidden.yin += 2; s.attrs.qian -= 4;
              s.flags['以俗讲经'] = 1;
              return '你把因果报应掺进公案里，讲的人爱听，听的人也肯想。有人骂你亵渎，也有人说这才是渡人的法子。';
            }
          }
        ]
      },

      {
        id: 'song_songzi',
        title: '讼事',
        tags: ['日常', '朝堂风波'],
        weight: 9,
        time: '两月',
        story: '县衙前有人击鼓。两姓争一片水田，各执契纸，墨色新旧不同。县官将案卷推给你：「郎君通文墨，看看这契是真是假。」',
        options: [
          {
            t: '细辨纸墨，断其真伪',
            dim: 'shi',
            time: '两月',
            req: { cai: 45 },
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.ming += 3; s.hidden.yin += 2;
              s.flags['断过案'] = 1;
              return '旧契的纸是竹纸，新契却用了近年才有的楮皮。你指出来，堂下有人腿一软，跪了下去。';
            }
          },
          {
            t: '劝两家各让一半，息事宁人',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.ming += 2; s.attrs.xin += 2; s.hidden.yin += 4;
              return '两家都不服，却也不再闹。你走出衙时，听身后有人啐了一口，也有人说多谢。';
            }
          },
          {
            t: '受其中一家之托，代为周旋',
            dim: 'li',
            time: '两月',
            req: { qian: 30 },
            fx: function (s) {
              s.attrs.qian += 11; s.attrs.ming -= 2; s.hidden.yin -= 3;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 8;
              return '你走了几趟门路，案子便「查无实据」。托你的人送来厚礼，说日后还有仰仗之处。';
            }
          },
          {
            t: '当堂揭出县吏受贿',
            dim: 'yi',
            time: '两月',
            req: { cai: 50 },
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.cai += 2; s.hidden.zhi += 3; s.hidden.yin += 3;
              s.flags['忤县吏'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 16;
              return '你话一出口，堂上堂下都静了。县官脸色变了几变，终究把那吏押了下去。严七在门外看着你，眼神很凉。';
            }
          }
        ]
      },

      {
        id: 'song_sui_shi',
        title: '岁除',
        tags: ['日常'],
        weight: 9,
        once: false, maxScene: 30,
        age: [17, 60],
        time: '一月',
        story: '腊月将尽，巷口有人写春帖，桃符换了新的。灶下蒸着糕，孩子守着不肯走。你立在门边看了一会儿，才想起自己也该写一副。',
        options: [
          {
            t: '铺纸研墨，自书一副',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.xin += 2; s.attrs.cai += 1;
              return '笔落得很慢。写完贴上门，墨还没干，风吹得纸角一掀一掀。';
            }
          },
          {
            t: '替邻里代写，收些润笔',
            dim: 'li',
            time: '一月',
            fx: function (s) {
              s.attrs.qian += 6; s.attrs.ming += 1;
              return '一下午写了十几副，手都酸了。有人塞来一包糖，也有人硬要给钱。';
            }
          },
          {
            t: '携礼往谒师长故旧',
            dim: 'shi',
            time: '一月',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.qian -= 4;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 7;
              return '一家一家走过去，说些不痛不痒的话。回来时天已黑，鞋底沾了雪。';
            }
          },
          {
            t: '携酒出城，与阿禾守岁',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.attrs.ti += 1; s.attrs.xin += 2; s.hidden.yin += 2;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 6;
              return '两人坐在草垛上喝酒，数远处的爆竹。阿禾说，明年想去汴京看看。';
            }
          }
        ]
      },

      {
        id: 'song_chun_geng',
        title: '春耕',
        tags: ['日常'],
        weight: 9,
        once: false, maxScene: 32,
        age: [17, 60],
        time: '两月',
        story: '开春，田里的水凉得刺骨。耕牛拉着犁，走得极慢。老农赤脚踩在泥里，回头看你一眼：「郎君也下来试试？」',
        options: [
          {
            t: '脱鞋下田，跟着犁走一趟',
            dim: 'shi',
            time: '两月',
            fx: function (s) {
              s.attrs.ti += 2; s.attrs.ming += 2; s.hidden.yin += 2;
              return '泥从脚趾缝里挤出来。走到田头，你才明白一碗饭有多重。';
            }
          },
          {
            t: '出资置牛具，与农户分利',
            dim: 'li',
            time: '两月',
            fx: function (s) {
              s.attrs.qian -= 8; s.attrs.ming += 2;
              return '牛具置办下来，秋后分粮。老农说这样公道，你也觉得。';
            }
          },
          {
            t: '只在田埂上坐半日',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.xin += 3;
              return '风从田上来，带着新泥的腥气。你什么也没做，坐到日头偏西。';
            }
          },
          {
            t: '寻访乡间疾苦，录成一册',
            dim: 'yi',
            time: '两月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 2; s.hidden.yin += 3;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 4;
              return '你问得很细。有人说着说着就哭了，你便不问了，只记下来。';
            }
          }
        ]
      },

      {
        id: 'song_xia_shu',
        title: '暑雨',
        tags: ['日常'],
        weight: 9,
        once: false, maxScene: 34,
        age: [17, 60],
        time: '一月',
        story: '暑雨连旬，屋角渗水，书页返潮。邻家小儿赤脚在巷里趟水，喊着要去看船。',
        options: [
          {
            t: '把书搬到高处，逐页阴干',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.xin += 1;
              return '你一夜起了三回，翻动那些湿了的纸。有几页字洇了，像被谁哭过。';
            }
          },
          {
            t: '趁水势贩些薪炭，赚一笔',
            dim: 'li',
            time: '一月',
            fx: function (s) {
              s.attrs.qian += 9; s.attrs.ming -= 1;
              return '湿柴卖不出价，干柴却值钱。你囤了几担，卖得很好。';
            }
          },
          {
            t: '带孩子们去看水，讲些旧事',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.attrs.ming += 2; s.hidden.yin += 3;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 5;
              return '孩子们听得入了神。讲到一半雨又落下来，众人哄笑着往回跑。';
            }
          },
          {
            t: '闭门不出，听雨读书',
            dim: 'shi',
            time: '一月',
            fx: function (s) {
              s.attrs.cai += 3;
              return '雨声盖住了世上的杂音。你读了一整天，读到掌灯才觉出饿。';
            }
          }
        ]
      },

      {
        id: 'song_qiu_shou',
        title: '秋收',
        tags: ['日常'],
        weight: 9,
        once: false, maxScene: 36,
        age: [17, 60],
        time: '两月',
        story: '秋收的场上，谷子摊得金黄。有人扬场，有人装袋，孩子追着鸡跑。佃户捧着第一捧新米来，非要你先尝。',
        options: [
          {
            t: '取一撮新米，就地煮粥分食',
            dim: 'yi',
            time: '两月',
            fx: function (s) {
              s.attrs.xin += 3; s.hidden.yin += 4; s.attrs.qian -= 4;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 6;
              return '粥很稀，众人却喝得香。阿禾说，今年总算能过个饱冬。';
            }
          },
          {
            t: '趁新谷登场，低价收粮',
            dim: 'li',
            time: '两月',
            fx: function (s) {
              s.attrs.qian += 12; s.attrs.ming -= 2; s.hidden.yin -= 2;
              return '谷价最低的那几日，你收了整整一仓。开春再卖，价钱便不同了。';
            }
          },
          {
            t: '核一遍田亩账目，厘清积弊',
            dim: 'shi',
            time: '两月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 3;
              s.flags['理过田账'] = 1;
              return '旧账翻出来，错漏不少。你一条条改正，管家在旁站得腰都直不起来。';
            }
          },
          {
            t: '登高望远，写一篇秋色',
            dim: 'xiu',
            time: '两月',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.xin += 2;
              return '山上的风已经很凉。你写到「禾黍高低」，忽然停了笔，觉得再写下去便俗了。';
            }
          }
        ]
      },

      {
        id: 'song_dong_ye',
        title: '冬夜',
        tags: ['日常'],
        weight: 9,
        once: false, maxScene: 38,
        age: [17, 65],
        time: '一月',
        story: '冬夜长，炭盆里的火将熄未熄。妻子在灯下补衣，你摊着书，却一行也看不进去。更鼓从远处传来，一记，又一记。',
        options: [
          {
            t: '添炭挑灯，与家人闲话',
            dim: 'xiu',
            time: '一月',
            fx: function (s) {
              s.attrs.xin += 3; s.attrs.ti += 1;
              return '说的都是闲事：谁家添了孩子，哪家铺子关了门。说到后来，火也旺了。';
            }
          },
          {
            t: '披衣出门，往衙中理事',
            dim: 'shi',
            time: '一月',
            fx: function (s) {
              s.attrs.ming += 3; s.attrs.cai += 2; s.attrs.ti -= 2;
              return '衙中只剩一盏灯。你把积下的案卷理完，抬头时天已泛白。';
            }
          },
          {
            t: '核一核这一年的出入',
            dim: 'li',
            time: '一月',
            fx: function (s) {
              s.attrs.qian += 5; s.attrs.cai += 1;
              return '算到半夜，数目对上了。你在末尾画了个圈，心里踏实了些。';
            }
          },
          {
            t: '温一壶酒，独坐至天明',
            dim: 'yi',
            time: '一月',
            fx: function (s) {
              s.attrs.ti -= 1; s.hidden.zhi += 3;
              return '酒很淡。你想起许多旧人，有的还在，有的不知去了哪里。';
            }
          }
        ]
      },

      {
        id: 'song_ke_zhi',
        title: '客至',
        tags: ['日常', '善缘'],
        weight: 8,
        once: false, maxScene: 40,
        age: [18, 65],
        time: '旬日',
        story: '有客自远方来，衣衫半旧，说是慕名求见。他谈锋极健，从经义说到边事，末了却问：「郎君可肯借我一宿？」',
        options: [
          {
            t: '留客，与之彻夜长谈',
            dim: 'shi',
            time: '旬日',
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.ming += 2;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 9;
              return '他说了许多你在书上看不到的事。天亮时他拱手告辞，连姓名也没留。';
            }
          },
          {
            t: '赠些盘缠，送他上路',
            dim: 'yi',
            time: '旬日',
            fx: function (s) {
              s.attrs.qian -= 7; s.hidden.yin += 4; s.attrs.ming += 1;
              return '他推辞了两回，终究收下，说日后必还。你笑着说不必。';
            }
          },
          {
            t: '只留一饭，不多言语',
            dim: 'xiu',
            time: '旬日',
            fx: function (s) {
              s.attrs.xin += 2;
              return '饭很简素。他吃得很慢，吃完道了声谢，便走了。';
            }
          },
          {
            t: '探他来历，暗中记下',
            dim: 'li',
            time: '旬日',
            fx: function (s) {
              s.attrs.cai += 2; s.hidden.zhi += 2;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 5;
              return '你留意他的口音与鞋上的泥。后来严七问起，你说了几句，他便点头。';
            }
          }
        ]
      }

    ],

    main: [

      {
        id: 'song_m1', after: 0,
        title: '家学',
        time: '两载',
        story: '你生在文治之世。乡里最体面的人家，门楣上不刻功名，只挂一块「耕读」的匾。父亲把你领到塾师面前，说：「不求他做大官，只求他识得几个字，不至于被人欺。」\n塾师看了你一眼，把一本《千字文》推到案上。',
        options: [
          {
            t: '从此苦读，日夜不辍',
            dim: 'shi',
            time: '五载',
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.ti -= 3; s.attrs.xin += 2; s.hidden.zhi += 3;
              s.flags['蒙学'] = 1;
              return '几年间，你把那本书翻烂了好几回。塾师说你「心太急」，却也把自家的批注本借给了你。';
            }
          },
          {
            t: '白日读书，夜里帮家里记账',
            dim: 'li',
            time: '五载',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.qian += 5; s.attrs.ti += 2;
              s.flags['蒙学'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 10;
              return '算盘与笔墨，你两样都熟。父亲看着账本，难得露了点笑，说这样也好，饿不死。';
            }
          },
          {
            t: '常去村口道观，听老道讲书',
            dim: 'xiu',
            time: '五载',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.xin += 4; s.hidden.yun += 2;
              s.flags['蒙学'] = 1;
              var n = G.npc(s, 'xu', { name: '徐翁' }); n.rel += 10;
              return '老道讲书不讲章句，只讲人。你听得半懂，却记住了他一句话：「字是死的，写字的人要活。」';
            }
          },
          {
            t: '与镇上少年结伴，走街串巷',
            dim: 'yi',
            time: '五载',
            fx: function (s) {
              s.attrs.ti += 4; s.attrs.ming += 2; s.attrs.cai += 3;
              s.flags['蒙学'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 14;
              return '你们爬树、偷瓜、在庙会上替人跑腿。阿禾说，将来你若做了官，别忘了替他们村修条路。';
            }
          }
        ]
      },

      {
        id: 'song_m2', after: 4,
        title: '州试',
        cond: { age: [18, 999] },
        time: '一年',
        story: '州试放榜那日，榜下人挤得水泄不通。糊名誊录之后，主司只看文章，不问门第。这是本朝立国的规矩：寒门亦可由一笔字翻身。\n你挤到榜前，从头看到尾，又从尾看到头。',
        options: [
          {
            t: '中榜，赴京应省试',
            dim: 'shi',
            time: '一年',
            req: { cai: 42 },
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.ming += 5; s.hidden.zhi += 3;
              s.flags['举业'] = 1;
              s.flags['曾中州试'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 20;
              return '榜上有你的名字。李慕之也在，名次靠后。他拍了拍你的肩，笑得比你还高兴：「同去，同去。」';
            }
          },
          {
            t: '落榜，留在州学再读一年',
            dim: 'xiu',
            time: '两载',
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.xin += 2; s.attrs.ming -= 3;
              s.flags['落第'] = 1;
              return '榜上没有你。你在州学旁租了间小屋，把落卷重新抄了一遍，一个字一个字地找毛病。';
            }
          },
          {
            t: '中榜而不赴京，先谋一职养家',
            dim: 'li',
            time: '一年',
            req: { cai: 38 },
            fx: function (s) {
              s.attrs.cai += 2; s.attrs.qian += 9; s.attrs.ming += 2;
              s.flags['举业'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 14;
              return '你在州衙谋了个书手的差事。九娘替你说了几句好话，事情便成了。她说：「先活着，再谈别的。」';
            }
          },
          {
            t: '落榜后弃文，随商队走一趟',
            dim: 'yi',
            time: '两载',
            fx: function (s) {
              s.attrs.qian += 11; s.attrs.ti += 2; s.attrs.cai += 2; s.attrs.ming -= 2;
              s.flags['落第'] = 1;
              s.flags['走过商路'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 10;
              return '你跟着商队走了几千里，见过盐场、渡口与荒村。回来时人黑了一圈，字却不如从前稳了。';
            }
          }
        ]
      },

      {
        id: 'song_m3', after: 9,
        title: '太学',
        time: '半载',
        cond: { seen: 'song_m2', cai: 36, age: [19, 999] },
        story: '太学斋舍的灯，常常亮到三更。这里的人谈学问，也谈天下；一篇策论可以在半日之间传遍全斋，也可以在半日之间招来麻烦。\n裴敬住你隔壁，出身世家，文章极好，眼睛长在额上。他敲了敲你的门：「听说你州试的文章，被人抄去当了范本？」',
        options: [
          {
            t: '与他论学，不卑不亢',
            dim: 'shi',
            time: '半载',
            fx: function (s) {
              s.attrs.cai += 4; s.attrs.ming += 3; s.hidden.zhi += 2;
              s.flags['太学'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 14;
              var m = G.npc(s, 'li', { name: '李慕之' }); m.rel += 10;
              return '你们从经义争到吏治，争到天快亮。他最后说：「你文章里有一股不肯让人的气。这样的人，朝堂上活不长。」';
            }
          },
          {
            t: '谨守本分，只谈章句',
            dim: 'xiu',
            time: '半载',
            fx: function (s) {
              s.attrs.cai += 3; s.attrs.xin += 2;
              s.flags['太学'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 4;
              return '他听了几句，兴致便淡了，起身告辞。门关上后，你听见他在廊下与人说笑，声音很远。';
            }
          },
          {
            t: '借他的门路，谋一个差遣',
            dim: 'li',
            time: '半载',
            fx: function (s) {
              s.attrs.qian += 7; s.attrs.ming += 2; s.attrs.xin -= 2;
              s.flags['太学'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 8;
              return '他没有推辞，只写了张条子，让你去某处投递。事成之后你道谢，他淡淡道：「举手之劳。记着便好。」';
            }
          },
          {
            t: '联名上书，请改取士之法',
            dim: 'yi',
            time: '半载',
            req: { cai: 55 },
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.cai += 2; s.hidden.zhi += 4; s.hidden.yin -= 3;
              s.flags['太学'] = 1;
              s.flags['曾上书'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 17;
              return '书成，署名者甚众。裴敬偏偏不签，说：「锋芒太露，先伤自己。」你与他的梁子，大约便是这时结下的。';
            }
          }
        ]
      },

      {
        id: 'song_m4', after: 14,
        title: '党争',
        time: '一年',
        cond: { seen: 'song_m3', age: [22, 85] },
        story: '你已入仕。这一年，朝中换了风向。旧党的人说你「躁进」，新党的人说你「守旧」。两边都有你的故人：李慕之在台谏，裴敬在中书。\n一日散朝，两人在廊下等你，谁也不先开口。',
        options: [
          {
            t: '站在李慕之这一边，主更张',
            dim: 'shi',
            time: '一年',
            req: { flag: '举业' },
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.cai += 2; s.attrs.xin -= 2;
              s.flags['新党'] = 1; s.flags['入仕'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 24;
              var m = G.npc(s, 'pei', { name: '裴敬' }); m.rel -= 16;
              return '李慕之长揖到地，说：「我就知道你会来。」裴敬看了你一眼，转身走入雨里，伞也没撑。';
            }
          },
          {
            t: '站在裴敬这一边，主守成',
            dim: 'xiu',
            time: '一年',
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.xin += 2;
              s.flags['旧党'] = 1; s.flags['入仕'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 16;
              var m = G.npc(s, 'li', { name: '李慕之' }); m.rel -= 10;
              return '裴敬只说了一个「好」字。李慕之什么也没说，把那封没递上去的荐书收回袖中。';
            }
          },
          {
            t: '自请外放，避此是非',
            dim: 'li',
            time: '两载',
            fx: function (s) {
              s.attrs.qian += 5; s.attrs.ming -= 2; s.attrs.cai += 3; s.attrs.xin += 2;
              s.flags['外放'] = 1; s.flags['入仕'] = 1;
              return '你去了一个远州。那里也有党争，只是争得小些，还容得下你把一县的赋税重新理一遍。';
            }
          },
          {
            t: '两不相帮，只求保住官身',
            dim: 'yi',
            time: '一年',
            fx: function (s) {
              s.attrs.qian += 9; s.attrs.ming += 2; s.hidden.zhi += 3; s.hidden.yin -= 2;
              s.flags['骑墙'] = 1; s.flags['入仕'] = 1;
              var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 12;
              return '你两边都递了话，两边都不算得罪。严七说你这样能活得久。你没问他，活得久是不是也算一种本事。';
            }
          }
        ]
      },

      {
        id: 'song_m5', after: 20,
        title: '汴京',
        time: '两载',
        cond: { seen: 'song_m4', age: [24, 90] },
        story: '汴京的繁华，是要用一整夜才看得完的。御街两侧，灯烛通明，瓦子里唱着新曲，酒楼上有胡姬按拍。你骑马从州桥过，桥下船灯一串一串，像把星河倒进了水里。\n同行的老吏说：「这城，吃的是天下。」',
        options: [
          {
            t: '入朝陈奏，请减东南漕额',
            dim: 'shi',
            time: '两载',
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.cai += 3; s.hidden.yin += 3;
              s.flags['为民请命'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 17;
              return '奏章被留中，却在士林间传开了。有人替你可惜，也有人替你担心。你照旧每夜从州桥过，看那些船灯。';
            }
          },
          {
            t: '在瓦子置一份产业，坐收其利',
            dim: 'li',
            time: '两载',
            req: { qian: 60 },
            fx: function (s) {
              s.attrs.qian += 16; s.attrs.ming += 2;
              s.flags['汴京有业'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 24;
              return '九娘替你盯着生意，说这城里最好赚的，是让人忘忧的东西。她说着，自己也笑了一下。';
            }
          },
          {
            t: '闭门著述，把这城的盛景写下来',
            dim: 'xiu',
            time: '三年',
            req: { cai: 55 },
            fx: function (s) {
              s.attrs.cai += 5; s.attrs.ming += 4; s.hidden.zhi += 4;
              s.flags['著书'] = 1;
              return '你写了许多年，写桥、写市、写灯、写人。写成之后，你把稿子压在箱底，忽然有些怕——怕日后这城不是这样了。';
            }
          },
          {
            t: '结交权贵，谋一个更快的出身',
            dim: 'yi',
            time: '两载',
            fx: function (s) {
              s.attrs.ming += 4; s.attrs.qian += 7; s.hidden.yin -= 3; s.attrs.xin -= 3;
              s.flags['结交权贵'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel += 8;
              return '你在几处宅子里出入，学会了许多不必说出口的话。裴敬教你如何敬酒，也教你如何看人。';
            }
          }
        ]
      },

      {
        id: 'song_m6', after: 26,
        title: '靖康',
        time: '两载',
        cond: function (s) { return !!s.seen['song_m5'] && s.totalDays >= 8640; },
        story: '这一年冬天，北兵渡河。汴京城外的烽火烧了许久未断。城中先是不信，后来抢米，再后来，连哭也听不见了。\n有人劝你南渡，有人劝你死守，也有人说，读书人到了这一步，该做的是把书带走。',
        options: [
          {
            t: '扈从南渡，随朝廷过江',
            dim: 'shi',
            time: '两载',
            fx: function (s) {
              s.attrs.ming += 5; s.attrs.ti -= 3; s.hidden.zhi += 3;
              s.flags['南渡'] = 1; s.flags['靖康'] = 1;
              var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 17;
              return '船过江时，你回头看，北岸的烟一直没断。李慕之立在船头，许久才说：「这一去，便不是回去了。」';
            }
          },
          {
            t: '留守旧都，护住城中图籍',
            dim: 'yi',
            time: '两载',
            fx: function (s) {
              s.attrs.ming += 6; s.attrs.ti -= 5; s.hidden.yin += 5; s.hidden.zhi += 5;
              s.flags['留守旧都'] = 1; s.flags['靖康'] = 1;
              var n = G.npc(s, 'ahe', { name: '阿禾' }); n.rel += 16;
              if (n.rel >= 45) { n.alive = false; s.flags['阿禾殁'] = 1; }
              return s.flags['阿禾殁']
                ? '阿禾留下来陪你。你们把书版埋在后园，把书捆成担子。城破那日他挡在巷口，叫你快走。后来你只找回了他的鞋。'
                : '阿禾留下来陪你。你们把书版埋在后园，把书捆成担子。城破那几日，你护着的不是书，是一口气。';
            }
          },
          {
            t: '携家南奔，避乱于江湖',
            dim: 'li',
            time: '两载',
            fx: function (s) {
              s.attrs.qian -= 11; s.attrs.ti -= 2; s.attrs.ming -= 2;
              s.flags['南渡'] = 1; s.flags['靖康逃亡'] = 1;
              var n = G.npc(s, 'shen', { name: '沈九娘' }); n.rel += 14;
              return '一路上尽是南奔的人。九娘在渡口替人算命换粮，说反正这世道，谁也不知道明日。';
            }
          },
          {
            t: '往投北军，为其掌文书',
            dim: 'yi',
            time: '两载',
            fx: function (s) {
              s.attrs.qian += 14; s.attrs.ming -= 5; s.hidden.yin -= 6; s.attrs.xin -= 3;
              s.flags['仕北'] = 1; s.flags['靖康'] = 1;
              var n = G.npc(s, 'pei', { name: '裴敬' }); n.rel -= 12;
              return '你换了一身衣冠去应召。录用的官吏问你可识字，你答识得。笔递过来时，你迟疑了一下，终究还是接了。';
            }
          }
        ]
      }

    ],

    endings: [

      {
        id: 'song_end_sudi',
        name: '苏堤一梦',
        pri: 59,
        cond: { flag: '南渡', ming: [38, 200] },
        desc: '你在江南筑了一道堤，堤上种柳，春来如烟。',
        text: '南渡之后，你在江左做了几任闲官。那时西湖淤塞，水漫田畴，无人肯管，你便自己去算土方、募夫役，一锹一锹地筑。\n堤成那日，百姓挑着酒来谢。你坐在柳下，忽然想起汴京的州桥，想起桥下那一串船灯。风从湖上来，把柳丝吹到脸上。\n后来有人在堤上立碑，刻了你的名字。你去看过一回，站了片刻便走了。有些事做成了，反而不必再说。',
        score: function (s) { var v=(s.attrs.cai-60)*1.2+(s.hidden.yin-50)*1.0+(s.attrs.ming-40)*0.8;return Math.max(0,Math.min(100,v)); }
      },

      {
        id: 'song_end_yimin',
        name: '靖康遗民',
        pri: 66,
        cond: { flag: '留守旧都' },
        desc: '你留在旧都，看城门换了一面旗。',
        text: '城破之后，你留了下来。北人入城，街市照旧开着，只是买东西的人少了，说话的声音也低了。\n你把家里的书埋在后园，每年春天翻出来晒一次。有的字被水浸坏了，你便一笔一笔描补，描得比原样还慢。\n邻家小儿来问你，从前这城是什么样子。你说了很久，说到灯市，说到瓦子，说到州桥下的船灯。孩子听得入神，问：「后来呢？」\n你说：「后来就到这里了。」',
        score: function (s) { var v=(100-s.attrs.ming)*0.5+(s.hidden.yin-50)*0.6+(s.attrs.xin-60)*0.9+(s.flags['长安陷']?10:0);return Math.max(0,Math.min(100,v)); }
      },

      {
        id: 'song_end_lixue',
        name: '理学名儒',
        pri: 56,
        cond: { flag: '治学', cai: [52, 200] },
        desc: '你一生注书讲学，门人把你的话抄成了册子。',
        text: '你没有做到很大的官。中岁之后，索性辞了差遣，回到山中书院讲学。讲的是「格物」，是「诚意」，是那些被时人讥为迂阔的话。\n门人渐多，有人从千里外来听。你讲得并不快，常常一句话停很久，停到檐下的雨都落完了。\n临终那年，你把注了一半的稿子交给弟子，说：「不必求全。能有一句是真的，便够了。」\n后来你的书被人翻刻，被人增删，也被人拿来当敲门砖。这些你都不知道了。',
        score: function (s) { var v=(s.attrs.cai-70)*1.2+(s.attrs.xin-70)*1.1+(s.dimCount.xiu||0)*1.5;return Math.max(0,Math.min(100,v)); }
      },

      {
        id: 'song_end_shuoshu',
        name: '瓦子说书人',
        pri: 73,
        cond: { npc: { id: 'shen', rel: 35 }, flag: '写过话本' },
        desc: '你在勾栏里讲了一辈子的故事，讲到后来，自己也分不清哪段是真的。',
        text: '你终究没有做成什么大事。后来索性在瓦子勾栏里落了脚，替人写话本，也自己上台讲。\n醒木一拍，讲的都是别人的悲欢。讲到城破，台下便有人抹泪；讲到团圆，满棚便哄然叫好。你隔着灯火看那些脸，觉得他们比你活得真。\n九娘老了，仍管着账。有一回她问你，你讲的那些，有几句是你自己的。你想了想，说：「讲到哪句，哪句就是。」\n锣声又起。你喝了口凉茶，接着往下讲。',
        score: function (s) { var v=(s.attrs.ming-45)*0.6+(s.attrs.cai-45)*0.7+(100-s.attrs.qian)*0.3+(s.dimCount.li||0)*1.0;return Math.max(0,Math.min(100,v)); }
      }

    ]
  };

  /* ================= 12 · 悬案事件（宋） ================= */
  D.dynasties.song.events.push(
    {
      id: 'song_bt_1', title: '递话', tags: ['朝堂风波'], weight: 12,
      minScene: 8,
      raiseOffer: {
        ttl: 3, short: '党争要你表态，迟则见疑',
        expire: function (s) {
          s.flags['两边不靠'] = 1;
          s.attrs.ming -= 8; s.attrs.xin -= 4;
          return '你迟迟没有递出那句话。后来两边都不再问你了——问，是抬举；不问，是看死。朝堂上的位置，有时候不站队本身就是站错了队。';
        }
      },
      story: '新法旧法之争，如今连酒楼上都要分左右座。\n有人递话给你：上头要拟人了，想先听听你的意思。话说得很客气，意思却明白——这一句表态递上去，往后的路便定了。\n你想起前朝那些站错了的人。也想起一句话都没来得及说的那些人。',
      options: [
        {
          t: '表态，站到说话人那边', dim: 'shi', time: '旬日',
          fx: function (s) { s.attrs.ming += 8; s.attrs.xin -= 4; s.flags['站队'] = 1; return '你的意思递上去了，很快有了回音：好。此后你进退有了依托，行事也有了掣肘。靠山这种东西，一半是梯，一半是绳。'; }
        },
        {
          t: '递一句两不得的空话', dim: 'li', time: '旬日',
          fx: function (s) { s.attrs.ming += 3; s.attrs.xin += 2; s.hidden.yun -= 3; s.flags['两不得罪'] = 1; return '你说：但知躬耕，不预朝论。回话的人笑了笑，把这句记下了——记成什么意思，就看往后谁得势。骑墙的人，墙塌得慢，塌得也未必轻。'; }
        },
        {
          t: '直言不肯以人废言', dim: 'xiu', time: '半月',
          fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 4; s.hidden.yin += 5; s.flags['不附会'] = 1; return '你回了一句：法善则从，法弊则言，不论何人主政。这句话传出去，两边的门都对你关了半扇——可两边的书，从此都肯收你的。'; }
        },
        {
          t: '上书请调外任，避开风口', dim: 'yi', time: '一月', req: { ming: 30 },
          fx: function (s) { s.attrs.ming -= 3; s.attrs.xin += 5; s.hidden.yun += 4; s.flags['外任避祸'] = 1; return '你求了个边远州郡的差。风浪大的时候，港湾里最安全——也最闷。你到任那天，驿舍外下着小雨，你觉得这雨下得安稳。'; }
        }
      ]
    }
  );
})(window.GAME_DATA);