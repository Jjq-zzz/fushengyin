/* 公共事件：暗属性长线、跨朝代遭遇、NPC 后续 */
(function (D) {
  D.shared = D.shared || [];

  D.shared.push(
    /* ---------- 病榻：体魄或心性见底，最后一次抉择 ---------- */
    {
      id: 'sh_bing_1', title: '病榻', tags: ['灾祸'], once: true, weight: 60,
      story: '你倒下了。\n起初只是咳嗽，后来是发热，再后来连起身都要人扶。医生来看过，说了些宽慰的话，开的方子却一味比一味重。\n窗外有光。你躺着，听着院子里的声音，忽然很想知道，若就这样去了，会有人替你上坟么。',
      options: [
        {
          t: '把医生都辞了，自己熬', dim: 'xiu', time: '一季',
          fx: function (s) { s.attrs.ti += 14; s.attrs.xin += 6; s.hidden.yin += 4; return '你把药碗推开，说听天由命。熬了一个月，烧退了。人是瘦脱了形，可又能起身走路。医生说这是命大。'; }
        },
        {
          t: '散尽家财，请名医、用好药', dim: 'li', time: '一季', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 25; s.attrs.ti += 20; s.attrs.xin -= 2; return '钱花得像流水。第二个月你能坐起来了，第三个月能下地了。你看着空了的箱笼，觉得这买卖做得值。'; }
        },
        {
          t: '把身后事一桩一桩交代清楚', dim: 'shi', time: '两月',
          fx: function (s) { s.attrs.xin += 10; s.attrs.ming += 6; s.hidden.zhi -= 10; return '你把账、把田契、把欠了谁、谁欠了你，一样一样说了。交代完，心里空落落的，反倒踏实。后来病竟慢慢好了。'; }
        },
        {
          t: '谁也不见，一个人躺着', dim: 'yi', time: '一季',
          fx: function (s) { s.attrs.ti -= 6; s.attrs.xin -= 4; s.hidden.zhi += 6; s.attrs.ming -= 4; return '你把人都遣了出去，一个人在屋里躺着。白天很长，夜里更长。你想起很多人，有的还活着，有的不在了。后来有一天，你忽然想喝一口水，就自己爬起来喝了。'; }
        }
      ]
    },

    /* ---------- 执念线（隐藏执念过高的偏执悲剧） ---------- */
    {
      id: 'sh_zhi_1', title: '镜中', tags: ['执'], once: true, weight: 40,
      loc: '旧宅',
      story: '你又梦见那一件事了。\n醒来时天还没亮，屋里静得能听见自己的心跳。案上摊着昨夜写的字，一页一页，写的都是同一句话。你数了数，三十七张。\n手有点抖。你把它按住，按不住。',
      options: [
        {
          t: '把那些纸全烧了，出门走一走', dim: 'xiu', time: '一月',
          fx: function (s) { s.hidden.zhi -= 18; s.attrs.xin += 6; s.attrs.ti += 3; return '火在盆里烧了很久。你看着那些字卷起来、变黑、化成灰。天亮了，你推门出去，巷子里的风是新的。'; }
        },
        {
          t: '再写一遍，写到自己认不出这几个字', dim: 'yi', time: '半月',
          fx: function (s) { s.hidden.zhi += 12; s.attrs.cai += 4; s.attrs.ti -= 4; s.attrs.xin -= 6; return '写到第三日，手腕肿了。写到第七日，那几个字忽然变得陌生，像是别人的事。你搁下笔，笑了一声，那笑声自己听着都怕。'; }
        },
        {
          t: '去找一个人，把话说完', dim: 'shi', time: '一月',
          fx: function (s) { s.hidden.zhi -= 10; s.attrs.xin += 4; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 5; return '你去找了李慕之。他听完，沉默很久，说：我懂。只这两个字，你心里那根绷了许久的弦，松了一寸。'; }
        },
        {
          t: '什么也不做，坐着等天亮', dim: 'xiu', time: '数日',
          fx: function (s) { s.hidden.zhi -= 4; s.attrs.xin += 2; return '你坐着。天一点一点亮起来，纸上的字也一点一点看得清了。你还是没有烧它们。'; }
        }
      ]
    },
    {
      id: 'sh_zhi_2', title: '断绳', tags: ['执'], once: true, weight: 40,
      cond: { hidden: { zhi: 80 } },
      story: '你终于站到了那个人的门前。\n这么多年，你把他想了一千遍，每一遍都比上一遍更可恨。可门开了，走出来的是个佝偻的老人，眼也花了，走路要扶墙。\n他抬头看你，问：客人找谁？',
      options: [
        {
          t: '把刀收起来，说找错了', dim: 'xiu', time: '数日',
          fx: function (s) { s.hidden.zhi -= 30; s.attrs.xin += 10; s.hidden.yin += 10; s.flags['放下'] = 1; return '你说找错了。他点点头，慢慢把门关上。你站在门外，忽然觉得这些年像一场长病，此刻烧退了，人虚得厉害，却也轻了。'; }
        },
        {
          t: '把当年的事一件一件说给他听', dim: 'shi', time: '一月',
          fx: function (s) { s.hidden.zhi -= 12; s.attrs.cai += 4; s.attrs.ming += 4; s.flags['对质'] = 1; return '你说了两个时辰。他听着，中途倒下过一次，被你扶起来，又听。末了他说：我记不得了。你信了——他是真的记不得了。'; }
        },
        {
          t: '照原样做完', dim: 'yi', time: '数日',
          fx: function (s) { s.hidden.zhi -= 40; s.hidden.yin -= 30; s.attrs.xin -= 20; s.attrs.ming -= 10; s.flags['手染血'] = 1; if (s.npcs.pei) { s.npcs.pei.rel = -60; s.npcs.pei.alive = false; } return '事情做完，你在他屋里坐了很久。血在地上积了一小滩，映着窗纸上的光。走出来时，巷子里有人在卖炊饼，热气腾腾。你买了两个，吃了半个，剩下的扔了。'; }
        },
        {
          t: '转身就走，从此不再想', dim: 'yi', time: '半月',
          fx: function (s) { s.hidden.zhi += 6; s.attrs.xin -= 4; s.attrs.ti -= 2; return '你转身就走。走出三条街，脚步才慢下来。可你知道，这事没有完——它只是从门外搬进了心里。'; }
        }
      ]
    },

    /* ---------- 阴德薄：横祸 ---------- */
    {
      id: 'sh_huo_1', title: '无妄', tags: ['灾祸'], once: true, weight: 40,
      cond: { hidden: { yin: 22 } },
      story: '一场祸事来得毫无道理。\n你走在路上，头顶的幡杆忽然断了，砸下来。你躲开了，身边一个卖菜的妇人没躲开。她躺在地上，血从鬓角流出来，眼睛还睁着，看着天。\n人群围上来，有人在喊官府。',
      options: [
        {
          t: '留下，替她请医、认这桩事', dim: 'yi', time: '一月',
          fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 6; s.hidden.yin += 14; return '医生来了，说救不活。你出了钱，替她办了后事，又寻到了她家。她男人抱着孩子，什么也没说，只是看着你。'; }
        },
        {
          t: '趁乱走开，这与你无关', dim: 'li', time: '数日',
          fx: function (s) { s.attrs.ming -= 4; s.hidden.yin -= 8; return '你走开了。走出很远，还听见后头有人在哭。那哭声跟了你很多年，你后来学会了不去听。'; }
        },
        {
          t: '当场说清经过，请人作证', dim: 'shi', time: '旬日',
          req: { ming: 30 },
          fx: function (s) { s.attrs.cai += 3; s.attrs.ming += 3; s.hidden.yin += 4; return '你在人群里把话说了三遍，说幡杆是旧了。有人替你作证。官府记了一笔，说你清白。可那个妇人还是死了。'; }
        },
        {
          t: '自己掏钱，把这事压在私下', dim: 'li', time: '旬日', req: { qian: 20 },
          fx: function (s) { s.attrs.qian -= 20; s.attrs.ming -= 2; s.hidden.yin += 3; return '你把钱给了她家，没让官府知道。钱能了事，了不了心。她男人收钱时手在抖，你不敢看他的眼。'; }
        }
      ]
    },

    /* ---------- 气运盛：奇遇 ---------- */
    {
      id: 'sh_yun_1', title: '拾遗', tags: ['奇遇'], once: true, weight: 40,
      cond: { hidden: { yun: 84 } },
      story: '路边有个包袱，青布包着，系得很整齐。你踢了一脚，沉甸甸的。\n打开看，是五十两银子，还有一封没封口的信。信上写着一个人的名字和一处地址，字很急，末了一句：救我一家。\n四下无人。',
      options: [
        {
          t: '按信上的地址送去', dim: 'yi', time: '一月',
          fx: function (s) { s.hidden.yin += 18; s.hidden.yun += 6; s.attrs.ming += 8; s.flags['送银'] = 1; return '你找到了那处院子，一个妇人跪下来给你磕头。你扶起她，原样把银子交了。她说：你叫什么？你说了名字。她记了。'; }
        },
        {
          t: '留下银子，把信烧了', dim: 'li', time: '数日',
          fx: function (s) { s.attrs.qian += 30; s.hidden.yin -= 12; s.hidden.yun -= 8; s.flags['吞银'] = 1; return '信很快就烧完了。银子进了你的囊中，花得也快。只是此后每逢夜里落雨，你总会想起那句"救我一家"。'; }
        },
        {
          t: '送去，但留下名字，日后好讨一份人情', dim: 'shi', time: '一月',
          fx: function (s) { s.attrs.ming += 5; s.attrs.qian += 8; s.hidden.yin += 6; s.flags['送银'] = 1; s.npcs.men = { name: '受银之人', rel: 20, alive: true }; return '妇人磕了头，你留了名字。她千恩万谢。你走出巷子时想：这世上的人情，是要记账的。'; }
        },
        {
          t: '交给官府，说明来历', dim: 'xiu', time: '旬日',
          fx: function (s) { s.attrs.ming += 4; s.hidden.yin += 6; s.hidden.yun += 2; return '官府收了，记了你的名。后来那笔银子去了哪里，你不知道。你只知道，你把一件麻烦交出去了。'; }
        }
      ]
    },

    /* ---------- 通用长线：旧恩 ---------- */
    {
      id: 'cm_en', title: '旧恩', tags: ['朝堂风波', '善缘'], once: true, weight: 9,
      minScene: 7, cond: { npc: { id: 'li', rel: 45 } },
      story: '李慕之来了，穿着官服。他如今在御史台供职，车马随从，与当年廊下的那个书生判若两人。\n他屏退左右，坐下来说：我如今能办几件事了。你想办哪一件？\n这话说得平静，你却听出了分量。',
      options: [
        {
          t: '请他替我谋一个实职', dim: 'shi', time: '两月',
          fx: function (s) { s.attrs.ming += 12; s.attrs.qian += 6; s.flags['得李荐'] = 1; s.hidden.zhi += 2; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 5; return '他沉吟片刻，写了一个名字给你，说：去这里，别提我。你去了，职位不显，却是实差。这一步，抵得上旁人十年。'; }
        },
        {
          t: '请他替一桩旧案说话', dim: 'yi', time: '两月',
          fx: function (s) { s.attrs.ming += 8; s.hidden.yin += 10; s.flags['李翻旧案'] = 1; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 10; return '他听完，脸色变了，说这案子牵连太大。你说我知道。他沉默很久，末了说：我试试。他这一试，把自己的前程也搭进去了。'; }
        },
        {
          t: '什么也不要，只与他喝一夜酒', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin += 8; s.hidden.zhi -= 5; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel += 15; return '酒喝到半夜，他忽然说：我这辈子最怕的，是变成当年那些不肯开门的人。你举杯说：那就别变。他重重地点头，像个少年。'; }
        },
        {
          t: '请他替我递一笔生意上的话', dim: 'li', time: '两月',
          fx: function (s) { s.attrs.qian += 24; s.hidden.yin -= 4; var n = G.npc(s, 'li', { name: '李慕之' }); n.rel -= 5; return '他愣了一下，还是应了。事情办得很顺，钱也来得容易。他走的时候，脚步比来时慢。'; }
        }
      ]
    },
    {
      id: 'cm_chou', title: '故怨', tags: ['灾祸'], once: true, weight: 10,
      minScene: 8, cond: { npc: { id: 'yan', rel: -20 } },
      story: '严七带了人来，说是查一桩旧案。他手里捏着一纸告状，告的是你。\n他把告状在你眼前晃了晃，笑：这上头写的，可真不假。你说怎么办呢？',
      options: [
        {
          t: '拿钱消灾', dim: 'li', time: '一月', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 25; s.attrs.ming -= 4; var n = G.npc(s, 'yan', { name: '严七' }); n.rel += 20; return '钱递过去，他把告状收了，说：早这样不就好了。他走后，你在案前坐了一夜，想着这人会不会来第二回。'; }
        },
        {
          t: '找他的上司，把他也拖下去', dim: 'yi', time: '两月', req: { cai: 45 },
          fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 5; s.hidden.yin -= 6; s.hidden.zhi += 6; var n = G.npc(s, 'yan', { name: '严七' }); n.rel -= 20; s.flags['与严七死斗'] = 1; return '你捏着他私分税银的凭据去了州衙。严七被革了差，走那日回头看了你一眼，那一眼你记了很久。'; }
        },
        {
          t: '认下罪名，听凭处置', dim: 'xiu', time: '一月',
          fx: function (s) { s.attrs.ming -= 8; s.attrs.xin += 8; s.hidden.yin += 8; s.attrs.qian -= 10; return '你认了。挨了二十板，罚了钱。严七反倒没了兴致，说：你这人没意思。你趴在榻上想，这世道，认罪比狡辩便宜。'; }
        },
        {
          t: '连夜出城，避几年风头', dim: 'yi', time: '一年',
          fx: function (s) { s.attrs.ming -= 6; s.attrs.qian -= 8; s.hidden.yun += 4; s.flags['避祸'] = 1; return '你走了。一年后回来，告状的事已经淡了，铺子却空了。你站在门口，忽然明白什么叫人走茶凉。'; }
        }
      ]
    },
    {
      id: 'cm_bing', title: '时疫', tags: ['天灾时疫'], once: true, weight: 8,
      minScene: 6,
      time: '一季', loc: '疫中',
      story: '疫病从南边来，先是几户人家关门闭户，后来整条巷子都静了。\n官府封了坊门，每日有人推着车来收尸。药价一日三涨。你是这条巷子里少数还走得动的人。',
      options: [
        {
          t: '留下照看邻里，能救一个是一个', dim: 'yi', time: '一季',
          fx: function (s) { s.attrs.ti -= 10; s.attrs.ming += 14; s.hidden.yin += 20; s.hidden.yun += 4; s.flags['疫中留'] = 1; return '你熬药、抬人、烧尸。这一季你瘦了一圈，也送走了七八个人。疫过之后，巷子里的人见了你，都会让一让路。'; }
        },
        {
          t: '囤药转卖，此时不赚何时赚', dim: 'li', time: '一季',
          fx: function (s) { s.attrs.qian += 30; s.attrs.ming -= 12; s.hidden.yin -= 18; s.flags['疫中囤药'] = 1; return '药价翻了五倍，你赚了。有人在你门前跪着求一剂药，你隔着门缝看了很久，最后没有开门。'; }
        },
        {
          t: '闭门不出，等疫过去', dim: 'xiu', time: '一季',
          fx: function (s) { s.attrs.ti -= 3; s.attrs.xin += 4; s.hidden.yin -= 2; return '你把门窗都糊死了，日日读书。疫过开门，巷子里少了半边人。你活下来了，却觉得像是偷来的。'; }
        },
        {
          t: '去官府献策，组织坊间防疫', dim: 'shi', time: '一季', req: { cai: 40 },
          fx: function (s) { s.attrs.cai += 5; s.attrs.ming += 10; s.attrs.qian += 6; s.hidden.yin += 12; s.flags['防疫献策'] = 1; return '你写了一份条陈，说分坊隔离、设粥棚、焚秽物。官府用了三条。疫势稍缓时，有人在衙门口念了你的名字。'; }
        }
      ]
    },
    {
      id: 'cm_shan', title: '山行', tags: ['江湖奇遇'], once: true, weight: 7,
      minScene: 5,
      story: '山路遇雨，你躲进一间破庙。庙里已有一人，斗笠压得很低，膝上一柄刀。\n他抬头看你一眼，说：坐。火堆边烤着半只野兔。',
      options: [
        {
          t: '坐下，与他分食', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.ti += 3; s.hidden.yun += 4; s.npcs.ke = { name: '斗笠客', rel: 15, alive: true }; s.flags['识斗笠客'] = 1; return '他不说话，你也不问。天亮时他先走，临走扔下一句：你这人不错。三年后你在城中被人围住，是他替你解的围。'; }
        },
        {
          t: '问他这刀上沾过几条命', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.ming += 2; s.hidden.zhi += 5; s.attrs.ti -= 3; s.npcs.ke = { name: '斗笠客', rel: 8, alive: true }; return '他笑了一声，说：我不数。你也笑了。那一夜你们谁也没睡实。'; }
        },
        {
          t: '借宿一夜，天亮便走，不多话', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin += 3; return '你睡在角落，天亮时他已经走了，火堆还温着。你在庙门上看见一道刻痕，像是记数。'; }
        },
        {
          t: '趁他睡着，摸他的行囊', dim: 'li', time: '数日',
          fx: function (s) { s.attrs.qian += 12; s.hidden.yin -= 6; s.hidden.yun -= 6; s.npcs.ke = { name: '斗笠客', rel: -20, alive: true }; s.flags['偷斗笠客'] = 1; return '你摸到一袋碎银和一块令牌。银你拿了，令牌放回去。天亮时他已不见，火堆边留着一行字：银你拿去，令牌记着。'; }
        }
      ]
    },
    {
      id: 'cm_hun', title: '议婚', tags: ['日常', '情缘'], once: true, weight: 8,
      minScene: 7, age: [18, 32], cond: { noflag: '成家' },
      story: '有人来提亲了。对方家境寻常，人品听说还过得去。媒人的话说得很圆：这世道，寻个能一道过日子的人，比什么都强。\n你坐在堂上，一时想不出该说什么。',
      options: [
        {
          t: '应下，把日子过起来', dim: 'xiu', time: '半载',
          fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 4; s.attrs.qian -= 8; s.flags['成家'] = 1; marryTo(s, '妻', -2, 40); return '婚事办得简单。拜堂那日你抬头看她，她也正看你，两个人都笑了。此后家里有了一盏夜里不灭的灯。'; }
        },
        {
          t: '应下，但要借这门亲攀些关系', dim: 'shi', time: '半载',
          fx: function (s) { s.attrs.ming += 8; s.attrs.qian += 6; s.attrs.xin -= 6; s.flags['成家'] = 1; s.flags['婚姻为势'] = 1; marryTo(s, '妻', -2, 10); return '你应了，也在婚宴上认得了几个有用的人。她是个聪明的女子，第一年就看出了你的心思，此后话便少了。'; }
        },
        {
          t: '推了，说自己还有未了的事', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin += 3; s.hidden.zhi += 6; s.attrs.ming -= 2; s.flags['辞婚'] = 1; return '你推了。媒人走时脸色不好看。夜里你独坐，想起父亲当年说过：人这一生，总要留一样东西给自己。'; }
        },
        {
          t: '先问对方家中有多少田产', dim: 'li', time: '旬日',
          fx: function (s) { s.attrs.qian += 10; s.attrs.ming -= 4; s.flags['成家'] = 1; var sp = marryTo(s, '妻', -2, 20); s.family.spouse.rel = 20; sp.rel = 20; return '媒人报了数目，你觉得合宜，便应了。日子过得不坏，只是她偶尔会问你：当初是不是先问的田产。你不答。'; }
        }
      ]
    },
    {
      id: 'cm_lao', title: '白头', tags: ['日常'], once: true, weight: 6,
      minScene: 14, age: [45, 90],
      story: '你开始觉得累了。\n从前能走三十里不歇，如今走十里就要在树下坐一坐。镜子里的那张脸，眉眼还是你的，可皮肤松了，鬓角白了。\n你忽然想起很多年前的一个下午，那时你还什么都没有。',
      options: [
        {
          t: '把手上的事一样一样交出去', dim: 'xiu', time: '一年',
          fx: function (s) { s.attrs.xin += 8; s.attrs.ming += 4; s.flags['交卸'] = 1; return '你把账目、田契、人事，一样一样交了出去。交完那日，你在院里坐了一下午，什么也没做，觉得很好。'; }
        },
        {
          t: '再撑几年，还能撑', dim: 'shi', time: '两载',
          fx: function (s) { s.attrs.ti -= 8; s.attrs.ming += 6; s.attrs.qian += 8; s.flags['不放手'] = 1; return '你没有交。往后两年你做得比从前还多，头发白得更快。有人说你这是不服老，你自己知道，是怕。'; }
        },
        {
          t: '把这些年的事写下来', dim: 'xiu', time: '一年',
          fx: function (s) { s.attrs.cai += 8; s.attrs.ming += 8; s.flags['著书'] = 1; return '你写了一年，写成薄薄一卷。写的时候常停下来，有些事记不清了，有些人连脸都模糊了，只剩一句话还记得。'; }
        },
        {
          t: '散尽家财，只留一棺一饭', dim: 'yi', time: '半载',
          fx: function (s) { s.attrs.qian -= 30; s.attrs.ming += 10; s.hidden.yin += 14; s.flags['散财'] = 1; return '你把钱散了出去，给族中、给邻里、给几个不认得的人。有人跪下来谢你，你摆摆手。此后你吃得简单，睡得踏实。'; }
        }
      ]
    }
  );

  /* ================= 08 · 人物档案：身份演进表与两条派生事件 ================= */

  /* 身份演进：按 scene 阈值切换 title（引擎 refreshClock 里应用） */
  D.npcTitles = {
    li:   [[0, '寒门书生'], [8, '县学生'], [16, '进士'], [24, '御史']],
    shen: [[0, '市井女子'], [6, '绸缎行东家'], [14, '行会管事'], [22, '半城消息都经她手']],
    pei:  [[0, '世家子弟'], [8, '荫官'], [16, '州郡要职'], [24, '党争中的一方']],
    yan:  [[0, '差役'], [8, '缉事'], [16, '狱吏'], [22, '上司也要让他三分']],
    ahe:  [[0, '同村少年'], [6, '行脚'], [12, '军中伙夫']],
    xu:   [[0, '游方老道'], [10, '观主'], [20, '山门有声']]
  };
  function hookName(s) {
    var id = s._hookNpc;
    var n = id && s.npcs[id];
    return n ? n.name : '故人';
  }

  D.shared.push(
    /* ---------- 背刺：opinion ≤ −30，他把当年的事捅出去 ---------- */
    {
      id: 'sh_bei_1', title: '背刺', tags: ['灾祸', '朝堂风波'], once: true, weight: 0,
      story: function (s) {
        var nm = hookName(s);
        return '风声是从别人嘴里传来的。\n' + nm + '在酒席上说起你当年的事，添了几分，去了几分，说得有鼻子有眼。听的人笑了，笑完都看向你。\n你想起当年为他的事奔走的那几个夜晚。原来账，他不是不记，是倒着记的。';
      },
      options: [
        {
          t: '登门对质，把话说开', dim: 'shi', time: '旬日',
          fx: function (s) { var n = G.npc(s, s._hookNpc || 'li'); n.rel -= 10; n.opinion = (n.opinion || 0) - 5; s.attrs.ming -= 3; s._hookNpc = null; return '你上门去，他起初避而不见，后来隔着门说了句：当年的事，你也未必干净。话没说开，门先关上了。街坊倒觉得你肯当面锣对面鼓，比背后嚼舌的强。'; }
        },
        {
          t: '花一笔钱，把流言按下去', dim: 'li', time: '半月', req: { qian: 15 },
          fx: function (s) { s.attrs.qian -= 15; s.attrs.ming -= 2; var n = G.npc(s, s._hookNpc || 'li'); n.rel -= 4; s._hookNpc = null; return '你请了几桌酒，席间只字不提，只说往日情分。钱花了，话头淡了。只是往后你再听见他的名字，心里总要沉一下。'; }
        },
        {
          t: '不辩不解，把眼下的路走稳', dim: 'xiu', time: '一月',
          fx: function (s) { s.attrs.xin += 6; s.attrs.ming -= 5; s._hookNpc = null; return '你什么也没做。日子照旧过，事照旧办。一个月后，新的闲话盖过了旧的。有人私下说：那人当时替他挡过事，如今他这么回，不厚道。'; }
        },
        {
          t: '寻他一个错处，还回去', dim: 'yi', time: '半月',
          fx: function (s) { var n = G.npc(s, s._hookNpc || 'li'); n.opinion = (n.opinion || 0) - 15; n.rel -= 20; s.attrs.ming -= 4; s.attrs.xin -= 6; s.hidden.zhi += 8; s._hookNpc = null; return '你把他的错处递给了相干的人。很快他也知道了。两个都撕破脸的人，从此见了面连头都不点。夜里你睡得不坏，只是那口气，咽下去之后一直烧。'; }
        }
      ]
    },
    /* ---------- 提携：opinion ≥ 40，他在关键时刻举荐你 ---------- */
    {
      id: 'sh_ti_1', title: '提携', tags: ['朝堂风波', '善缘'], once: true, weight: 0,
      story: function (s) {
        var nm = hookName(s);
        return '有人替你递了话。\n' + nm + '在一个你不在场的场合说起你，说了几句公道话，又添了几句好话。听的人记下了。几日后，消息辗转传到你耳朵里：有位子上，可以挪你了。';
      },
      options: [
        {
          t: '登门道谢，把这份情记牢', dim: 'shi', time: '旬日',
          fx: function (s) { var n = G.npc(s, s._hookNpc || 'li'); n.rel += 6; n.opinion = (n.opinion || 0) + 5; s.attrs.ming += 6; s.flags['受过提携'] = 1; s._hookNpc = null; return '你带着薄礼登门，他摆手不受，只说了句：你的本事，我不过顺水推舟。话说得轻，情分落得实。此后府上有事，你总是头一个到。'; }
        },
        {
          t: '备一份厚礼，把门路铺深些', dim: 'li', time: '半月', req: { qian: 20 },
          fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 8; var n = G.npc(s, s._hookNpc || 'li'); n.rel += 3; s._hookNpc = null; return '礼送得重，话说得轻。他收了一半，退回一半，说：办事归办事，这个不能全收。可自那以后，他引见的人，也渐渐肯引见你了。'; }
        },
        {
          t: '辞而不受，另走自己的路', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 2; var n = G.npc(s, s._hookNpc || 'li'); n.opinion = (n.opinion || 0) - 10; s._hookNpc = null; return '你婉言辞了。他愣了一下，笑说：随你。传话的人私下问你为何不识抬举，你说不出，只觉得肩上一轻，心里一空。'; }
        },
        {
          t: '顺势索求更多', dim: 'yi', time: '旬日',
          fx: function (s) { s.attrs.ming += 4; s.attrs.qian += 6; var n = G.npc(s, s._hookNpc || 'li'); n.opinion = (n.opinion || 0) - 12; n.rel -= 5; s._hookNpc = null; return '你问他：既然肯举荐，何不再添一把力。他没应，也没恼，只是此后那扇门，你再去时便慢了半拍。得实惠的是你，可账，他也开始记了。'; }
        }
      ]
    }
  );


  /* ================= 09 · 性别锁事件（男女各三条，题材与强度对等） ================= */
  D.shared.push(
    /* —— 女 · 冒籍应试：改名换装赴考，成则一举成名，败则身败名裂 —— */
    {
      id: 'sh_g_mj', title: '冒籍', tags: ['朝堂风波'], once: true, weight: 7, exam: 'keju',
      minScene: 6, cond: { gender: 'f' },
      story: '科举之门，历来看重的是「身家清白」四个字，而那四个字里，从来不含你这样的女儿身。\n可你读过的书、写过的文章，不肯认这个理。同窗里有人出了个主意：换一个名字，换一身男装，籍册上添一笔——便可入考场，与你素日纸上谈的那些人一较高下。\n成，是一举成名；败，是身败名裂。没有第三样结局。',
      options: [
        {
          t: '改名换装，赌这一场', dim: 'yi', time: '一季', req: { cai: 45 },
          fx: function (s) { var win = Math.random() < 0.45 + (s.attrs.cai - 45) / 200; if (win) { s.attrs.ming += 16; s.hidden.yun += 4; s.flags['冒籍得中'] = 1; return '放榜那日，你的名字写在中间偏前的位置。你隔着人群看了很久，不敢笑出声。此后你活成两个人：一个是榜上的名字，一个是你自己。哪个都别弄丢。'; } s.attrs.ming -= 18; s.hidden.yin -= 6; s.flags['冒籍败露'] = 1; return '场内有人多看了你两眼。三月之后，风声漏了。没有枷锁加身——他们只是把你的名字从一切册子上抹去，让所有人从此都知道那件事。有些门，关上时就不再开了。'; }
        },
        {
          t: '只做男装游学，不去应考', dim: 'shi', time: '两月', req: { cai: 30 },
          fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yun += 3; return '男装的用处不在考场，在路上。你以表字会文友，以文章入文会，没有人盘问你的籍册。才名是一寸一寸攒起来的，这条路慢，但走得。'; }
        },
        {
          t: '把才学教给同村的女孩子', dim: 'xiu', time: '一月',
          fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 8; s.attrs.ming += 2; s.flags['开蒙授业'] = 1; return '起初只有两个，后来有五六个。她们认字时眼睛里的光，你在别处没见过。你没能走进那扇门，可你开始造另一扇。'; }
        },
        {
          t: '收起书本，安分持家', dim: 'li', time: '数日',
          fx: function (s) { s.attrs.qian += 5; s.attrs.xin -= 2; s.hidden.zhi += 6; return '书收进了箱底。家里的账倒是理得更清了。只是夜深时偶尔想起某一页上自己批的小字，会伸手把箱盖又按紧一分。'; }
        }
      ]
    },
    /* —— 女 · 女医行诊 —— */
    {
      id: 'sh_g_ny', title: '女医', tags: ['日常', '善缘'], once: true, weight: 8,
      minScene: 4, cond: { gender: 'f' },
      story: '城中富户的内眷染了时症，却不肯让男医看诊——深宅大院，隔帘诊脉，男医束手。\n有人荐了你。理由只有一条：你是女身，进得去那道门。这行当没有功名可挣，可深宅里的人情与谢仪，一样是人情与谢仪。',
      options: [
        {
          t: '应下，用心诊治', dim: 'shi', time: '旬日',
          fx: function (s) { s.attrs.ming += 6; s.attrs.qian += 6; s.hidden.yin += 6; s.flags['女医有声'] = 1; return '你连去了七日。病人退了热，主母亲自送你出角门，塞给你的谢仪比说好的厚。此后那条巷子里的人家，请医先问你。'; }
        },
        {
          t: '借此出入内宅，多结善缘', dim: 'li', time: '半月',
          fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 4; s.attrs.xin -= 3; s.flags['内宅门路'] = 1; return '你看得清这行当真正的行情：药钱是小的，门路是大的。几家内眷的信都开始往你手上递。只是你在她们中间传的那些话，也开始有了分量——分量这种东西，接不好会砸手。'; }
        },
        {
          t: '顺手也替贫户看诊', dim: 'xiu', time: '一月',
          fx: function (s) { s.hidden.yin += 12; s.attrs.ming += 5; s.attrs.qian -= 3; s.attrs.xin += 4; return '富宅的谢仪你收着，贫户的诊金你免了。有人笑你傻，你只当没听见。夜里睡得沉，比进补管用。'; }
        },
        {
          t: '推了，只守家中一摊事', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin += 2; s.hidden.yun -= 3; return '你回了荐你的人，说家里走不开。门外的那片天地便仍旧隔着帘子。帘子里的日子安稳，安稳得让人偶尔心慌。'; }
        }
      ]
    },
    /* —— 女 · 掌铺：接手家中铺子 —— */
    {
      id: 'sh_g_zp', title: '掌铺', tags: ['日常'], once: true, weight: 8,
      minScene: 5, cond: { gender: 'f' },
      story: '家中铺子的老掌柜告老还乡了。\n父亲的意思是再请一位，你却看完了半年的流水账——账目里能省的、该添的、被抹平的亏空，你都看出来了。你说：不如我来。\n铺子里的伙计互相看了看，没说话。',
      options: [
        {
          t: '接过来，把账理清楚', dim: 'li', time: '一月',
          fx: function (s) { s.attrs.qian += 12; s.attrs.ming += 4; s.attrs.xin -= 2; s.flags['女儿掌铺'] = 1; return '你换了两个吃空额的伙计，添了两种俏货。三个月下来，流水比老掌柜在时还多一成。伙计们不再互相使眼色了——他们学着叫你「掌柜的」。'; }
        },
        {
          t: '只拿主意，不抛头面', dim: 'xiu', time: '半月',
          fx: function (s) { s.attrs.qian += 8; s.attrs.xin += 4; s.flags['幕后当家'] = 1; return '你坐在后堂，主意从帘子后面递出去。铺面上看来还是老掌柜的规矩，可进出的货悄悄换了方向。有人起疑，疑了几回，也就惯了。'; }
        },
        {
          t: '借此把铺面开到州城去', dim: 'shi', time: '一季', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 8; s.flags['铺进州城'] = 1; s.hidden.yun += 3; return '你在州城赁了半间门脸，货由你定，价由你开。头一个月亏，第二个月平，第三个月起，州城的人开始认你这个字号。生意做着做着，就做成了脸面。'; }
        },
        {
          t: '让给兄长，自己得一份嫁资', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.qian += 6; s.attrs.xin -= 4; s.hidden.zhi += 5; return '你把账册放回原处，只提了一个条件：折一份嫁资给你。父亲应得很快，快得让你心里空了一下。钱你收着，账你却忘不掉。'; }
        }
      ]
    },
    /* —— 男 · 送妹和亲：宗室男子与家的两难 —— */
    {
      id: 'sh_g_hq', title: '和亲', tags: ['朝堂风波'], once: true, weight: 7,
      minScene: 8, cond: { gender: 'm' },
      story: '边事又紧了。朝议的结果是遣使议和，随附和亲之约——人选圈定在你家。\n妹妹今年十七。她自己在灯下听完旨意，没哭，只问你：兄长，去，是不是对家里好？\n你答不上来。这道旨意对你家是恩典还是刀，要看你怎么接。',
      options: [
        {
          t: '送妹就国，为家族搏前程', dim: 'shi', time: '一月',
          fx: function (s) { s.attrs.ming += 12; s.attrs.xin -= 8; s.hidden.yin -= 4; s.flags['送妹和亲'] = 1; return '妹妹走的那日没有回头。她去后的第二年，你家的门第确实高了一截——可你每次升迁，耳边总有人提那桩「美事」。有些前程，是用一种说不出口的东西垫的。'; }
        },
        {
          t: '散家财打点，把人选换下来', dim: 'li', time: '两月', req: { qian: 30 },
          fx: function (s) { s.attrs.qian -= 30; s.hidden.yin += 6; s.attrs.ming -= 3; return '你把钱递到了能递的地方。名册上换了别人家的女儿。妹妹在闺中多住了两年，你家的门庭冷清了两年。你不知道这件事做的是对是错，只知道夜里睡得着了。'; }
        },
        {
          t: '上书力陈不可，宁可获罪', dim: 'yi', time: '一月',
          fx: function (s) { var ok = Math.random() < 0.35 + s.attrs.ming / 250; if (ok) { s.attrs.ming += 14; s.hidden.yin += 10; return '你的奏疏在朝堂上被念了两遍。和约照订，人选却换了旁人——主事者嫌你家「不识抬举」，也犯不上强夺。妹妹终身保住了，你的名字也传出去了。'; } s.attrs.ming -= 12; s.attrs.xin -= 4; s.flags['忤旨'] = 1; return '奏疏留中，人被申饬了一番。人选照旧。妹妹走前隔窗看你一眼，什么也没说。你那份奏本，到底没能换回什么，只换回你自己心里那点不肯。'; }
        },
        {
          t: '闭门不问，只当没听见', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin -= 6; s.hidden.zhi += 8; s.flags['临事避嫌'] = 1; return '你称病，把门关了三日。旨意没有等你——它从来不等人。第四日开门时，家里已经静得不像有人住过那个女孩。'; }
        }
      ]
    },
    /* —— 男 · 军中：边镇募兵，男子的另一条上升路 —— */
    {
      id: 'sh_g_jz', title: '募兵', tags: ['边境战事'], once: true, weight: 8,
      minScene: 5, cond: { gender: 'm' },
      story: '边镇又募兵了。告示贴在城门口，说此次募的是「敢战之士」，饷银比往年厚，主将也是真肯用人的人。\n围观的人不少，报名的不多——去边镇的人，回来的少。可你也听说了另一样：军功换来的前程，不看你的出身，只看你的首级与战伤。',
      options: [
        {
          t: '投军，去搏一条军功路', dim: 'yi', time: '一季', req: { ti: 40 },
          fx: function (s) { var ok = Math.random() < 0.5 + (s.attrs.ti - 40) / 150; if (ok) { s.attrs.ming += 10; s.attrs.ti -= 8; s.flags['军功在身'] = 1; return '你赶上了那年秋冬的两仗。第一仗你活着，第二仗你带了三个人活着回来。军功簿上记了你一笔。从那以后，营里的人提起你，先说战功，再说出身。'; } s.attrs.ti -= 16; s.attrs.xin -= 4; s.hidden.zhi += 6; return '你赶上的那仗，是败仗。你在尸堆里躺了一夜，天亮时自己爬回来的。伤养了三个月，落下阴雨天疼的旧疾。军功簿上没有你，可你从此知道战争是什么。'; }
        },
        {
          t: '不入行伍，替军前运粮', dim: 'li', time: '一月',
          fx: function (s) { s.attrs.qian += 10; s.attrs.ming += 3; s.flags['军前效力的钱'] = 1; return '你凑了一队骡车，替兵站运粮。刀剑没沾过，钱倒是真赚了——兵凶战危，运费的行价翻着番。只是每过一趟，你在路上见的东西，也在你心里记一笔。'; }
        },
        {
          t: '留在乡里，替军户人家照看老小', dim: 'xiu', time: '半月',
          fx: function (s) { s.attrs.xin += 6; s.hidden.yin += 8; s.attrs.ming += 2; return '村中壮丁去了一半，留下的多是老小。你替张家修了篱，替李家挑了水，替王家读了信——信是儿子从军中寄的，报平安。秋后王家老妇往你手里塞了两个鸡蛋，你推不掉。'; }
        },
        {
          t: '花钱捐个军前杂职，不亲上阵', dim: 'shi', time: '一月', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 6; s.attrs.xin -= 2; s.flags['军前挂名'] = 1; return '你捐了个辎重营的书办。不上阵，但随营。名册上有你，档案里有你，将来论功行赏，也有你一份——薄，但有。你用钱买了个「在场」，这买卖自古不亏。'; }
        }
      ]
    },
    /* —— 男 · 宗妇：宗室男子的妻族事务 —— */
    {
      id: 'sh_g_zf', title: '宗妇', tags: ['日常', '朝堂风波'], once: true, weight: 7,
      minScene: 9, cond: { gender: 'm', origin: ['huang'] },
      story: '你成了家，宗正寺的册子上便多了一栏：你家新妇的族望。\n宗室的婚事从来不是两个人的事。妻族强，你在族中说话便硬三分；妻族弱，旁人看你便矮三分。如今有人为你说了一门亲——对方的家世，说强不强，说弱不弱，胜在与人无争。',
      options: [
        {
          t: '应下这门亲，图个清净', dim: 'xiu', time: '两月',
          fx: function (s) { s.attrs.xin += 10; s.attrs.ming += 3; s.flags['成家'] = 1; var sp = marryTo(s, '妻', -2, 30); if (sp) sp.note = '与人无争的妻族'; return '新妇进门，宗正寺的册子改了一笔。族中长辈本等着看这门「低亲」的笑话，看了两年，只看见你家安安静静，无祸无灾。安安静静，在宗室里已是难得的福气。'; }
        },
        {
          t: '托人另谋高门，攀一处强援', dim: 'shi', time: '一月', req: { ming: 35 },
          fx: function (s) { s.attrs.ming += 8; s.hidden.yin -= 4; s.flags['联姻强宗'] = 1; var sp = marryTo(s, '妻', -1, 15); if (sp) sp.note = '强宗之女'; var ok = Math.random() < 0.55; if (!ok) { s.attrs.xin -= 6; return '强宗应了婚事，也把条件一并送了来：往后族中大事，你家要站在他们那边。你得了靠山，也拴上了绳。新妇进门那日礼数周全，只是你们彼此都知道，这桩婚事先敬的是谁的牌位。'; } return '强宗应了婚事。合卺那日族中人人道贺，道贺的话里都带着秤。你家说话的分量重了——至于新妇与你，来日方长，先处着。'; }
        },
        {
          t: '借议亲之机，向宗正寺讨个实缺', dim: 'li', time: '一月', req: { qian: 20 },
          fx: function (s) { s.attrs.qian -= 15; s.attrs.ming += 6; s.flags['成家'] = 1; s.flags['讨得实缺'] = 1; marryTo(s, '妻', -2, 20); return '婚事与差事一并谈成。宗正寺的人收了你的意思，把一个不咸不淡却顶用的差事批了下来。妻族那边得了准信，也痛快。两桩事一场酒，都办完了。'; }
        },
        {
          t: '暂不成家，把册子那一栏空着', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin += 4; s.hidden.zhi += 6; s.flags['宗室未娶'] = 1; return '你回绝了说亲人，宗正寺的册子上那一栏空着。空着也是一种立场，族中很快有人替你「着急」起来。你由他们说去——你的日子，还轮不到册子替你过。'; }
        }
      ]
    }
  );

  /* ================= 10 · 名望分区：三拨人，三种评价 ================= */
  D.shared.push(
    /* —— 组一 · 荒年 —— */
    {
      id: 'sh_f_hx', title: '村粥', tags: ['日常', '善缘'], once: true, weight: 8,
      story: '入了冬，村里断粮的人家一天比一天多。你家缸底的米也见得着底了。\n村口老槐树下，张家的小儿已经三天没出门——不是病，是起不来。你看着自家那点存粮，又看着那条日渐冷清的村道。',
      options: [
        { t: '开棚施粥，散去一半存粮', dim: 'shi', time: '半月', fx: function (s) { s.attrs.qian -= 8; G.addFame(s, 'xiang', 10); s.hidden.yin += 6; return '粥棚支了半个月。张家小儿来喝粥时，他娘在棚外磕了一个头。开春后村里人提起你，先提那口锅。'; } },
        { t: '借粮立据，秋后加息归还', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 4; G.addFame(s, 'xiang', 4); s.attrs.ming -= 2; return '粮借出去了，据立得清清楚楚。村里人领了粮，谢也谢了，背地里却说：到底是放账的人家。秋后你还真把账收回来了。'; } },
        { t: '自家也紧，闭门自保', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 2; G.addFame(s, 'xiang', -2); return '你把院门闩了。粥是没施，家里那几口也囫囵过了冬。开春有人在槐树下提起张家，你没接话。'; } },
        { t: '领着村里后生去邻县籴粮', dim: 'yi', time: '一月', req: { ti: 35 }, fx: function (s) { s.attrs.ti -= 5; s.attrs.qian -= 4; G.addFame(s, 'xiang', 12); s.hidden.yun += 3; return '你带着七八个后生，推车走了三天，从邻县籴回两车粮。粮价是你磨下来的，回程的路也是你探的。这一趟之后，村里议事，你坐上首。'; } }
      ]
    },
    {
      id: 'sh_f_hz', title: '城棚', tags: ['日常', '善缘'], once: true, weight: 10,
      minScene: 6, cond: { fame: { zhou: 10 } },
      story: '州城今年也荒，流民聚在城南门外。士绅们凑钱设棚，凑份子的名录写在粉牌上，挂在了城楼下。\n有人递话来：以你如今的声望，入一份，名录上便有你。也有人私下说：这棚，是士绅们做给州官看的。',
      options: [
        { t: '入大份，亲身督办粥棚', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 12; G.addFame(s, 'zhou', 10); s.hidden.yin += 5; return '你把棚务接了过来，账目日日晒在棚口。士绅们的面子全了，流民的肚子也垫住了。州官巡城时在你棚前停了半晌，问了三个问题，你答了三个。'; } },
        { t: '入小份，只挂名不出力', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 4; G.addFame(s, 'zhou', 4); return '你入了份子，钱出了，人没到。粉牌上有你的名字。挂名这种事，得失都小，只求日后别被翻出来算。'; } },
        { t: '趁流民聚着，雇一批壮工', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian += 6; s.attrs.ming -= 3; G.addFame(s, 'zhou', 2); return '你以工代赈，雇了几十个流民替你修渠。工钱不高，饭管饱。渠修成了，你的进项多了，粥棚的名录上却没有你——两条路，你走了那条实的。'; } },
        { t: '捐药不捐粮，另辟一路', dim: 'yi', time: '半月', req: { cai: 30 }, fx: function (s) { s.attrs.qian -= 6; G.addFame(s, 'zhou', 8); s.hidden.yin += 8; return '棚里最缺的其实是药。你把自己攒的方子与药材捐了去，棚里的病人少走了几个。士绅们谈粮，你谈药，各办各的事，倒也相安。'; } }
      ]
    },
    {
      id: 'sh_f_hc', title: '奏免', tags: ['朝堂风波'], once: true, weight: 8,
      minScene: 12, cond: { fame: { chao: 8 } },
      story: '一州的赋税，今年收不上来了。折子递上去，御前的批语只有四个字：再议。\n有人来寻你：你在朝中尚有几分说话的分量，若肯出头奏请蠲免，这一州的百姓都记你的好。可御史们正愁没处下笔——灾异之年奏免赋税，写好了是仁政，写坏了，就是收买人心。',
      options: [
        { t: '领衔上奏，请蠲一州之赋', dim: 'shi', time: '一月', fx: function (s) { G.addFame(s, 'chao', 10); G.addFame(s, 'zhou', 5); s.hidden.yun -= 4; s.flags['奏免赋税'] = 1; var ok = Math.random() < 0.6; if (ok) return '折子三上三返，终于批了下来：蠲免一岁。消息传回州里那天，城楼上贴了红。你的名字进了御史的册子，也进了州人的祠堂。'; s.attrs.ming -= 8; return '折子留中不发，御史反而参了你一本：擅动国赋，沽名钓誉。蠲免没成，你的名字倒先挂在了御前的黑册上。'; } },
        { t: '联络同僚，联名而不上首', dim: 'li', time: '一月', fx: function (s) { G.addFame(s, 'chao', 5); s.attrs.ming += 2; return '你只管串联，名字签在第七个。折子批下来时，蠲免成了一半。首署者得了圣眷也惹了御史，你两样都沾得少——你要的本就是这个。'; } },
        { t: '密奏直陈，只走宫里的路', dim: 'yi', time: '半月', fx: function (s) { G.addFame(s, 'chao', 12); s.attrs.xin -= 4; s.hidden.yin -= 4; return '你绕开通政司，把折子递进了内廷。事办成了，蠲免全免。可你走的那条道，从此也有人知道你在走——捷径这种东西，用过一次，就有人在同一处等你。'; } },
        { t: '不出头，只把灾情如实报送', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 5; G.addFame(s, 'chao', 2); return '你把州里报来的灾册一字不改地转了上去。蠲免与否，是朝廷的事。秋后赋税照收，州人骂的是朝廷，没人骂你——你保住了这个「没人骂」。'; } }
      ]
    },
    /* —— 组二 · 诉讼 —— */
    {
      id: 'sh_f_sx', title: '公道', tags: ['日常'], once: true, weight: 8,
      story: '邻家的猪拱了你家的菜，两家人从口角推搡到见血。乡老来评理，两边的说法各执一端。\n你与两家都有些来往，事情的是非曲直，你心里有一杆秤。只是这一杆秤下去，总有一家从此记恨。',
      options: [
        { t: '把是非曲直说个明白', dim: 'shi', time: '数日', fx: function (s) { G.addFame(s, 'xiang', 6); return '你当着乡老把两头的事一件件摆开，谁的理亏、谁的伤重、谁先动的手。判得两家都闭了嘴。吃亏的那家后来在路上遇见你，没点头，也没绕道——乡里的公道，做到这份上就够了。'; } },
        { t: '和稀泥，两家各赔一半', dim: 'li', time: '数日', fx: function (s) { s.attrs.xin += 2; G.addFame(s, 'xiang', 2); s.attrs.ming -= 1; return '你说：都是街坊，抬头不见低头见。两家各让一步，酒桌上一坐，这事就翻篇了。至于谁亏谁亏得冤，没人再提——乡里过日子，翻篇比分辨要紧。'; } },
        { t: '关起门来，不管闲事', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '乡老来问，你推说不知情。这两家的恩怨与你无关，省下的是麻烦，也省下了两家人日后对你的那点敬。'; } },
        { t: '替吃亏又嘴笨的那家出头', dim: 'yi', time: '旬日', req: { ming: 20 }, fx: function (s) { G.addFame(s, 'xiang', 9); s.attrs.xin -= 3; s.hidden.yin += 4; return '那家人老实，受了气说不出囫囵话。你替他们把状写清、把理摆明。理赢了一场，你也结了一个记你十年的敌——可那家从此逢人便说你的好。'; } }
      ]
    },
    {
      id: 'sh_f_sz', title: '冤狱', tags: ['朝堂风波'], once: true, weight: 10,
      minScene: 8, cond: { fame: { zhou: 18 } },
      story: '州里一桩旧案要重审，卷宗里的名字你不陌生——当年判得草率，人都已服刑三年。\n学官私下寻你：你在士林间有些名望，若肯在这案子上出一把力，冤者得以昭雪，你的名字也会写进这桩案子的卷尾。可这案子当年的主审，如今正在州衙高坐。',
      options: [
        { t: '牵头具状，为冤者奔走', dim: 'shi', time: '两月', fx: function (s) { G.addFame(s, 'zhou', 10); s.attrs.ming += 4; s.attrs.xin -= 3; s.flags['平反冤狱'] = 1; return '你带着几个士子把旧卷翻了个底朝天，状子递了三回。案子翻了。冤者出狱那天当街给你作了个揖，你侧身避了。卷尾有你，这一页翻不掉了，你也不想让它掉。'; } },
        { t: '出钱出力，不留名字', dim: 'xiu', time: '一月', fx: function (s) { G.addFame(s, 'zhou', 4); s.attrs.qian -= 5; s.hidden.yin += 10; return '状子递上去的盘缠、狱中打点的费用，你出了，名字没署。案翻之后，学官猜到了是你，你只说：钱是大家的。有些功德，落在明处就轻了。'; } },
        { t: '借这案子攀附主审', dim: 'li', time: '半月', req: { qian: 15 }, fx: function (s) { s.attrs.qian -= 10; G.addFame(s, 'zhou', -4); s.flags['攀过主审'] = 1; return '你反着走了这条路：替主审把当年的疏漏描补圆了。主审记下你这份情，冤狱照旧。你的路好走了几分，夜里想起那个狱中人，梦里都要绕着他走。'; } },
        { t: '把卷宗抄本寄往御史台', dim: 'yi', time: '一月', fx: function (s) { G.addFame(s, 'chao', 6); G.addFame(s, 'zhou', 5); s.hidden.yun -= 5; s.attrs.xin -= 4; var ok = Math.random() < 0.5; if (ok) return '抄本寄出去的时候你就没打算留退路。御史下来查案，主审罢官，冤狱得雪。士林间说这事做得漂亮，州衙里说这人惹不起。'; s.attrs.ming -= 6; return '御史台批了四个字：查无实据。抄本的来源却顺藤摸到了你。案子没翻，你倒先在州里待不下去了——有些险，冒了才知道有多险。'; } }
      ]
    },
    {
      id: 'sh_f_sc', title: '朝案', tags: ['朝堂风波'], once: true, weight: 8,
      minScene: 14, cond: { fame: { chao: 15 } },
      story: '朝里一桩大案发作，牵连甚广。有人递话给你：这案子里的一个人，与你有旧——你只需在大臣问及时「如实」多说一句，那人的罪名便坐实几分。\n一句真话，能救人，也能杀人。说话的人是你，定罪的却不是你。',
      options: [
        { t: '只陈事实，不添不减', dim: 'shi', time: '半月', fx: function (s) { G.addFame(s, 'chao', 6); s.attrs.xin += 6; s.flags['据实以对'] = 1; return '问到你时，你把知道的说完，不知道的说不曾知。两边都不满意你的回答，两边都挑不出你的错。散朝时有人与你并肩走了几步，什么也没说。'; } },
        { t: '多添一句，落井下石', dim: 'yi', time: '旬日', fx: function (s) { G.addFame(s, 'chao', 8); s.hidden.yin -= 10; s.attrs.xin -= 6; s.flags['构陷旧人'] = 1; return '你添的那一句，成了压垮他的最后一根。案结之后，上头赞你「直言」。你升了半级，往后再有人同你饮酒，总是先看你一眼，再碰杯。'; } },
        { t: '反为一言回护', dim: 'xiu', time: '一月', fx: function (s) { G.addFame(s, 'chao', 5); s.attrs.ming -= 6; s.hidden.yin += 8; var ok = Math.random() < 0.5; if (!ok) { s.attrs.ming -= 8; s.flags['受牵连'] = 1; return '你替他分辩的那几句，被记进了案卷。案结时，你也被牵连着挪了位。他不曾谢你——他也不知道。你知道，就够了。'; } return '你把他的旧事往轻里说了几分。他保全了下来，日后升迁的路上一路提携旧人——不知道你也在被提携之列。'; } },
        { t: '称病不出，等风头过去', dim: 'li', time: '半月', fx: function (s) { s.attrs.xin -= 3; G.addFame(s, 'chao', -3); return '你告了半月假。风头过去，案子结了，谁也没等你的话。你的名字没进这案子的任何一页——这是一种本事，也是一种欠。'; } }
      ]
    },
    /* —— 组三 · 名声 —— */
    {
      id: 'sh_f_mx', title: '乡约', tags: ['日常', '善缘'], once: true, weight: 8,
      story: '里正寻上门来，说要重立乡约，戒赌戒讼、敬老恤孤。约文要请人写，村里识字的人不多，里正相中了你。\n写得好，是一乡的美谈；写得不好，往后村人吵架，都要抬出你这纸约文来压人。',
      options: [
        { t: '应下，用心写这一纸乡约', dim: 'shi', time: '旬日', fx: function (s) { G.addFame(s, 'xiang', 8); s.attrs.cai += 3; s.flags['撰乡约'] = 1; return '你写了三天，删了五遍。约文贴在祠堂门口，赶集的日子围了一层又一层人。有老者念给不识字的听，念一句，点一次头。'; } },
        { t: '荐同村塾师执笔，自己润色', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 4; G.addFame(s, 'xiang', 4); s.hidden.yin += 3; return '你把这事让给了村塾的老先生，只在措辞上替他把了把关。老先生得了脸面，你得了清静。里正后来请两人同席，酒桌上他先敬了你——他知道轻重。'; } },
        { t: '借乡约立威，把自家条陈添进去', dim: 'li', time: '旬日', fx: function (s) { G.addFame(s, 'xiang', 5); s.attrs.ming += 3; s.hidden.yin -= 3; return '你在约文里添了一条「私市粮价不得擅抬」——明面上是为全村，细看你家粮行却正好占着先手。村人念着约文道好，念到你家时，声音低了半分。'; } },
        { t: '辞了，说担不起这名声', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 3; return '你推说笔力不逮。里正另请了邻村的先生。这一纸约文贴出来时你去看了一眼，写得平平。平平，也就平平地过了。'; } }
      ]
    },
    {
      id: 'sh_f_mz', title: '文会', tags: ['日常', '善缘'], once: true, weight: 10,
      minScene: 6, cond: { fame: { zhou: 22 } },
      story: '州学官来信，邀你入今年的文会。赴会的人，皆是州郡里拿得出文章的——去了，是添一层「士林有声」；文章站不住，也是当众折一层。\n信末还有一句：会后有荐举的名额，须看会上的文章。',
      options: [
        { t: '赴会，携新作而去', dim: 'shi', time: '半月', req: { cai: 40 }, fx: function (s) { s.attrs.cai += 4; G.addFame(s, 'zhou', 8); s.flags['文会成名'] = 1; return '会上的题目正落在你读得最熟的那一部书上。你的文章被传抄了三份，学官读罢，把你让到了上首。席间递话的人就多了三个。'; } },
        { t: '赴会，只听不写', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.xin += 4; G.addFame(s, 'zhou', 3); s.attrs.cai += 2; return '你坐在末席听了一整日。谁的文章锋利、谁的学问扎实、谁在借题发挥，你都记在心里。散会时学官与你寒暄了两句，说：来日可要交卷？你说：容我再读几年书。'; } },
        { t: '借文会结交要员', dim: 'li', time: '半月', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 8; G.addFame(s, 'zhou', 4); s.flags['结交学官'] = 1; return '你做东，会后设了一席小的，请的都是说话有分量的。文章的事一句没提，铺子与田庄倒谈得投机。文会之后，荐举的名额还没定，你的名字已经先到了。'; } },
        { t: '辞而不赴', dim: 'yi', time: '数日', fx: function (s) { s.hidden.zhi += 3; G.addFame(s, 'zhou', -2); return '你回信辞了，托词是家中事忙。文会照开，荐举照给，给了别人。学官次年没有再来信——州郡的体面，请一回不至，便不再请第二回。'; } }
      ]
    },
    {
      id: 'sh_f_mc', title: '御前', tags: ['朝堂风波'], once: true, weight: 8,
      minScene: 16, cond: { fame: { chao: 28 } },
      story: '有人把你的名字递到了御前。\n不是奏章，是闲谈间的一句话：此人如何如何。御前点了点头，说了一句「知道了」。这三个字传出来，朝中看你的眼神就变了——不知道是福是祸，只知道从今往后，你做的每一件事都有人看着。',
      options: [
        { t: '谨言慎行，等着下一步', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.xin += 8; G.addFame(s, 'chao', 6); s.flags['简在帝心'] = 1; return '你把家中往来书信理了一遍，把门下出入的客清了一遍，把嘴闭上了。三个月里什么也没发生。第四个月，召你的旨意到了——一步跨过了三级台阶。'; } },
        { t: '趁热打铁，求人举荐', dim: 'shi', time: '半月', req: { fame: { zhou: 55 } }, fx: function (s) { G.addFame(s, 'chao', 12); s.attrs.ming += 6; s.hidden.yun -= 4; var ok = Math.random() < 0.65; if (ok) return '学官的荐表递得正是时候。御前那三个字还热着，荐表一沾就着。你入了官册。此后经手的第一件差事不大，但办差的人知道你是谁。'; s.attrs.ming -= 5; return '荐表递上去，御前那三个字却已经凉了——「知道了」的意思，有时候就是「不用再提」。你白花了盘缠，白欠了人情，倒学会了一件事：御前的话，不当钱使。'; } },
        { t: '广散财货，把名声做实', dim: 'li', time: '一月', req: { qian: 25 }, fx: function (s) { s.attrs.qian -= 18; G.addFame(s, 'chao', 5); G.addFame(s, 'zhou', 6); s.hidden.yin -= 5; return '你捐了一座桥，修了一座义仓，桥名与仓名都题得极得体。名声做实了，可「此人善结人心」这句话，也开始在某些人的折子里出现。'; } },
        { t: '上表自陈，辞谢圣眷', dim: 'yi', time: '半月', fx: function (s) { s.attrs.xin += 5; G.addFame(s, 'chao', -2); s.hidden.zhi += 5; s.flags['辞过御前'] = 1; return '你上了一道谢恩又辞谢的表，说自己才不堪用。表递上去，御前笑了一声，说：再看看吧。看的人都在——你把一步登天的梯子亲手扶稳了又松开，图的是个干净。'; } }
      ]
    }
  );

  /* ================= 11 · 悔誓 ================= */
  D.shared.push(
    {
      id: 'sh_shi_1', title: '悔誓', tags: ['执'], once: true, weight: 0,
      story: '夜半醒来，再睡不着。\n你忽然想起十五岁那年说过的话——那时你说得那样响，响得像是对天地说，也对往后几十年说。如今那句话在黑暗里浮上来，你听了两遍，竟像是别人说的。\n窗外有更声。你睁着眼，把当年的自己骂了一遍，又替他辩了两句。',
      options: [
        {
          t: '重新立誓，就当从头来过', dim: 'shi', time: '数日',
          fx: function (s) { if (s.vow) { s.vow.broken = false; s.vow.kept = 0; s.vow.stray = 0; } s.hidden.zhi += 6; return '你对着一碗清水把那句话重新说了一遍。说得没有当年响，也没有当年轻。誓这种东西，重立一次就重一次——你把这句咽下去，起身吹了灯。'; }
        },
        {
          t: '索性认了，把那句话收回去', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin -= 6; s.attrs.ming -= 3; if (s.vow) s.vow.broken = true; return '你承认了：那句话说的时候是真心的，如今不信了。承认完，心里那块石头落了地，砸出来的坑却还在。往后你再听见别人立誓，会走快两步。'; }
        },
        {
          t: '用一年功夫，把话补回来', dim: 'yi', time: '一年',
          fx: function (s) { s.attrs.xin += 4; s.attrs.ming += 6; s.attrs.ti -= 6; if (s.vow) { s.vow.broken = false; s.vow.kept = 1; } var dimFx = { shi: function () { s.attrs.cai += 8; s.attrs.ming += 4; }, li: function () { s.attrs.qian += 10; }, xiu: function () { s.attrs.xin += 8; s.hidden.yin += 4; }, yi: function () { s.hidden.zhi -= 8; s.attrs.ti += 4; } }; (dimFx[s.vow && s.vow.dim] || dimFx.xiu)(); return '你用一年把日子过成偿还的样子。没有人监督你，只有你自己在夜里对账。年底盘账时你发现，亏欠的那一笔，勉强算是平了。'; }
        },
        {
          t: '翻个身，接着睡', dim: 'xiu', time: '数日',
          fx: function (s) { s.hidden.zhi += 4; return '更声敲过三巡，你翻了个身。天亮之后，白天的事一件接一件，那句话再没有浮上来。有些誓不会作废，只是沉底。'; }
        }
      ]
    }
  );

  /* ================= 10 · 上行门槛：xiang≥60 方得举荐，zhou≥55 方得征辟 ================= */
  D.shared.push(
    {
      id: 'sh_f_jj', title: '举荐', tags: ['日常', '善缘'], once: true, weight: 13,
      minScene: 10, cond: { fame: { xiang: 60 } },
      story: '乡里的名声传到了州城。\n有位致仕还乡的老学究放出话来：乡里若有可造之材，他愿作保，荐入州学——话说得客气，门槛写得明白：乡里先认你，州里才会看你。\n这份保荐递到你面前时，村口那口粥锅的旧账，有人替你先提了。',
      options: [
        { t: '受荐，入州学再进一步', dim: 'shi', time: '一月', fx: function (s) { G.addFame(s, 'zhou', 12); s.flags['得人保荐'] = 1; return '老学究亲自领你进了州学的门。进门前他低声说：乡里说你好的人，与州里说你好的人，不是一群人——你要让后一群人也开口。'; } },
        { t: '把名额让给同村的后进', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 8; G.addFame(s, 'xiang', 4); return '你把老学究引到了那个替你抄过书的后生家里。老学究看了他的字，点了头。你自己少走了一步，村口多走了一步。'; } },
        { t: '借此设酬，请人连荐数家', dim: 'li', time: '一月', req: { qian: 12 }, fx: function (s) { s.attrs.qian -= 8; G.addFame(s, 'zhou', 4); G.addFame(s, 'xiang', 2); s.flags['酬荐'] = 1; return '你把谢仪备得足，请保人连着替你说进了两处。路是宽了，只是保人后来酒多了说漏一句：荐一个人是一份情，荐你这三个，他记了三份账。'; } },
        { t: '婉辞，名不必出自人保', dim: 'yi', time: '数日', fx: function (s) { s.attrs.xin += 4; s.hidden.zhi += 5; G.addFame(s, 'xiang', 2); return '你辞了保荐，说要自己走出去。老学究笑了：好，倔。倔这个字，在乡里是褒是贬，要看你十年后走成什么样子。'; } }
      ]
    },
    {
      id: 'sh_f_zb', title: '征辟', tags: ['朝堂风波'], once: true, weight: 18,
      minScene: 14, cond: { fame: { zhou: 55 } },
      story: '州府的辟书到了。\n请你出仕为吏，职卑而位实，是有实权的那种位子。辟书上写着你「士林有声」，落款是州刺史的印。\n这一次，不再是乡里与州郡之间的事了——印一落，你就算进了另一本册子。',
      options: [
        { t: '应辟，入州府为吏', dim: 'shi', time: '一月', fx: function (s) { G.addFame(s, 'chao', 22); G.addFame(s, 'zhou', 6); s.attrs.xin -= 4; s.flags['应辟为吏'] = 1; return '你交了门帖，领了职牒。头一个月只管抄卷宗，第二个月开始有人递帖子请你「看一眼公文」。俸禄没涨，可你知道，有些门从里面推开，比从外面撞容易。'; } },
        { t: '挟名自重，讨一个好缺', dim: 'li', time: '一月', req: { ming: 45 }, fx: function (s) { s.attrs.qian += 10; G.addFame(s, 'chao', 12); s.hidden.yin -= 5; s.flags['讨过好缺'] = 1; return '你推说家计艰难，请州府另择肥职。刺史笑着应了。同僚的目光在背后钉了你一路——你讨来的那个缺，确实肥，也确实扎手。'; } },
        { t: '婉辞，再读几年书', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.attrs.cai += 3; G.addFame(s, 'chao', 2); return '你回了辟书，说学未成，不敢受。州府的人倒高看了你一眼——辞过征辟的人，第二次辟书上的措辞会客气许多。'; } },
        { t: '迁延不至，晾他一晾', dim: 'yi', time: '一月', fx: function (s) { s.hidden.zhi += 5; G.addFame(s, 'chao', -3); s.hidden.yun -= 3; return '辟书在你案头压了一个月。你自有盘算，可州府的耐性也有斤两。第二次来的是催文，不是请帖。'; } }
      ]
    }
  );

  /* 10 · 到任：应辟之后的实职事务（让朝堂层可持续生长） */
  D.shared.push(
    {
      id: 'sh_f_rc', title: '到任', tags: ['朝堂风波', '日常'], once: true, weight: 40,
      cond: { flag: '应辟为吏' },
      story: '到任的头一月，你在衙门里认人、认门、认规矩。\n你要办的差事不重，可你渐渐看明白了：这个位子不在俸禄，在「经手」二字。经手的每一件公文、每一笔账、每一个名字，都在替你结一张网——或结人，或结怨。',
      options: [
        { t: '勤勉当值，公文不过夜', dim: 'shi', time: '一月', fx: function (s) { G.addFame(s, 'chao', 8); s.attrs.xin += 4; G.addFame(s, 'zhou', 3); return '三个月里你经手的事没有一件积压。上官嘴上不说，签押时把要紧的卷宗先送到你案上。基层的位置上，「靠得住」三个字比才干先传上去。'; } },
        { t: '走动上官，把门路踩熟', dim: 'li', time: '一月', req: { qian: 10 }, fx: function (s) { s.attrs.qian -= 8; G.addFame(s, 'chao', 5); s.hidden.yin -= 3; return '你把该走的门都走了，该送的节礼一样没落。上官记住了你的名字。衙门里的人情是水，你学会了在水里呼吸——也学会了呛水。'; } },
        { t: '趁经手之便，给乡里行个方便', dim: 'yi', time: '一月', fx: function (s) { G.addFame(s, 'chao', 4); G.addFame(s, 'xiang', 6); s.hidden.yin += 5; return '公文过你的手，你把老家几户的赋册挪到了「待核」那一摞。没人察觉，乡里却记着好。职权这东西，头一回用在私处，手会抖；第二回就熟了。'; } },
        { t: '只领俸禄，凡事推诿', dim: 'xiu', time: '一月', fx: function (s) { s.attrs.qian += 4; G.addFame(s, 'chao', -3); s.attrs.xin -= 2; return '你把这个差当成了养老。公文推着走，卷宗攒着批。同僚替你收拾了两回烂摊子，第三回便任由它烂着——懒散的名声，在衙门里传得比什么都快。'; } }
      ]
    }
  );

  /* ================= 12 · 悬案事件（公共） ================= */
  D.shared.push(
    {
      id: 'sh_o_yj', title: '故人约', tags: ['日常', '善缘'], weight: 11,
      minScene: 6,
      raiseOffer: {
        ttl: 3, short: '故人约见，说有要事相商',
        expire: function (s) {
          s.flags['错过要事'] = 1;
          s.attrs.xin -= 4; s.hidden.yun -= 4;
          var id = s._hookNpc; delete s._hookNpc;
          return '你终究没有腾出那一日。后来听说，他那一趟是要托你一件事——托了别人。再见面时，他客气得像换了个人。有些门，错过叩门的那一下，就再没有回响。';
        }
      },
      story: '故人托驿站捎来口信：某日午后，老地方，有要事相商。\n没有说是什么事。你与他相识这些年，他知道分寸——不说，就是这一件事说出来之前，需要你人在场。\n可那一日前后，正是你手上一摊事最紧的时候。',
      options: [
        {
          t: '推掉手上的事，如期赴约', dim: 'shi', time: '旬日',
          fx: function (s) { s.attrs.xin += 5; s.hidden.yun += 5; s.flags['赴故人之约'] = 1; return '你把一摊事推给了同僚，赔了人情赶去赴约。他等你多时，说的事果然要紧——要紧到后来几年里，你一次次庆幸自己去了那一次。'; }
        },
        {
          t: '改期再会，先赔罪说明', dim: 'li', time: '数日',
          fx: function (s) { s.attrs.xin += 2; s.attrs.ming += 1; s.flags['改期赴约'] = 1; return '你捎去一封信，赔了罪，另约了日子。他回信说无妨。改期之后的见面，事还是那件事，只是热乎气凉了三分——世上有些话，趁热说和晾凉说，是两种分量。'; }
        },
        {
          t: '请第三人代为听信', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin -= 2; s.hidden.yin -= 2; return '你托了个两方都熟的人去听。话带到了，意思带回来了一半——最要紧的那一半，往往只在两个人之间说，旁人一坐，他就换了话题。'; }
        },
        {
          t: '不赴，也不回话', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin -= 5; s.hidden.zhi += 3; return '你把口信按下了。没有回话，没有托辞。故人的性子是问一遍便不再问第二遍——后来的许多年里，你们照旧通书信，只是再没有那种「要紧事」了。'; }
        }
      ]
    }
  );

  /* ================= 13 · 家业与子嗣 ================= */
  function marryTo(s, name, gap, rel) {
    s.family.spouse = {
      name: name || (s.gender === 'f' ? '夫' : '妻'),
      age: s.age + gap, gap: gap || 0, rel: rel == null ? 25 : rel, alive: true,
      attrs: { ti: 30 + Math.floor(Math.random() * 20), cai: 20 + Math.floor(Math.random() * 25), xin: 30 + Math.floor(Math.random() * 25) }
    };
    s.flags['已成婚'] = 1; s.flags['成家'] = 1;
    s.npcs.jia = { name: s.family.spouse.name, rel: s.family.spouse.rel, alive: true, note: '结发之' + (s.gender === 'f' ? '夫' : '妻') };
    return s.family.spouse;
  }
  /* 供 dyn-*.js 的成婚事件复用（这些文件在 shared 之后加载） */
  window.G.marryTo = marryTo;
  function bornChild(s) {
    if (!s.family) return null;
    if (s.family.children.length >= 3) return null;
    var sp = s.family.spouse;
    var g = Math.random() < 0.5 ? 'm' : 'f';
    var rank = s.family.children.length;
    var name = (s.gender === 'f' ? '阿' : '阿') + ['大', '二', '三'][rank] + (g === 'm' ? '哥' : '姐');
    var avg = function (k) { return Math.round(((s.attrs[k] || 0) + ((sp && sp.attrs && sp.attrs[k]) || 40)) / 2); };
    var adj = s.hidden.yun >= 70 ? 1 : s.hidden.yun <= 30 ? -1 : 0;
    var c = {
      name: name, gender: g, bornAtAge: s.age, age: 0, alive: true, grown: false,
      bent: ['ji', 'gua', 'min', 'ren'][Math.floor(Math.random() * 4)],
      attrs: { ti: Math.max(5, Math.min(80, avg('ti') + adj * 3)), cai: Math.max(5, Math.min(80, avg('cai') + adj)), xin: Math.max(5, Math.min(80, avg('xin') + adj * 2)) }
    };
    s.family.children.push(c);
    return c;
  }
  D.shared.push(
    {
      id: 'sh_j_hun', title: '议婚', tags: ['日常', '情缘'], once: true, weight: 55,
      age: [17, 34], cond: { noflag: '成家' },
      story: '媒人上门了。\n说的是邻县一户人家，门第不算高，胜在家风清白。媒人把话说的天花乱坠，你娘在灶间听得直点头。\n成家这件事，早了怕误，晚了怕孤。你这几日心里翻来覆去，其实只有一句话要问自己：往后这条路上，你要不要一个人陪。',
      options: [
        {
          t: '应下这门亲，好好过日子', dim: 'shi', time: '两月',
          fx: function (s) { var sp = marryTo(s, null, -2, 35); s.attrs.xin += 6; s.attrs.ming += 3; return '花轿进门那日，你掀了盖头（或接了新人），彼此打量了半晌，都笑了。日子往后是两个人一起过——灶是两个人的灶，路是两个人的路。'; }
        },
        {
          t: '相看之后，婉言回绝', dim: 'li', time: '旬日',
          fx: function (s) { s.attrs.qian -= 2; s.attrs.xin += 2; s.flags['回绝过婚事'] = 1; return '你相看了，也回绝了。媒人说可惜，你说不惋惜。这门亲事里看得见的田产，配不上看不见的那些——你心里另有一本账。'; }
        },
        {
          t: '此生不娶（不嫁），一心走自己的路', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.xin += 10; s.hidden.yin += 6; s.flags['立身不婚'] = 1; return '你回绝得很干脆：此身自有去处，不劳媒妁。媒人走后你屋里静得很，可你听着这份静，并不觉得空。一个人把路走完，也是一种成家——把日子当成了家业。'; }
        },
        {
          t: '反托媒人，为家中弟妹先谋', dim: 'yi', time: '一月',
          fx: function (s) { s.attrs.ming += 4; s.attrs.qian -= 3; s.flags['先人后己'] = 1; return '你把自己的亲事搁下，反倒替弟弟妹妹张罗起来。媒人连跑三月，弟妹的亲事成了，你的婚事黄了。娘骂你傻，你笑而不答。'; }
        }
      ]
    },
    {
      id: 'sh_j_hun_y', title: '脱籍议亲', tags: ['日常', '情缘'], once: true, weight: 55,
      age: [17, 34], origin: ['yue'],
      story: '乐籍的婚配，历来是主家说了算。\n可如今有人肯为你赎身、肯明媒正娶——前提是你脱了籍，从此不再是教坊的人。脱籍要打点，打点要钱；赎了籍，教坊的手艺便是你最后的退路，也退不回去了。',
      options: [
        {
          t: '凑钱赎身，脱籍从良嫁人', dim: 'shi', time: '两月', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 20; s.attrs.ming += 8; s.hidden.yin += 6; s.flags['脱籍'] = 1; var sp = marryTo(s, null, -1, 40); return '籍册改了你的名字，婚书也改了。出教坊那日，旧姐妹送到巷口，有人哭了。你从此不在册上——自由这两个字，比任何一场堂会的彩声都重。'; }
        },
        {
          t: '不赎籍，只求主家允了这门亲', dim: 'li', time: '一月',
          fx: function (s) { s.attrs.qian -= 5; s.flags['乐籍有婚'] = 1; var sp = marryTo(s, null, 0, 30); return '主家收了礼，允了你「婚而不脱」。你在教坊照旧当值，夜里归家。两头都占，两头都悬——这样过下去的人，教坊里不止你一个。'; }
        },
        {
          t: '攒钱自赎，先不议亲', dim: 'yi', time: '一年', req: { qian: 35 },
          fx: function (s) { s.attrs.qian -= 30; s.attrs.ming += 6; s.attrs.xin += 6; s.flags['脱籍'] = 1; return '你用三年攒的钱，为自己赎了身。籍册上你的名字勾掉了。没有婚书，没有倚靠，只有一纸脱籍文书攥在你自己手里。有人替你惋惜，你把文书折好收进怀里——这是你自己的东西。'; }
        },
        {
          t: '由主家做主，省得操心', dim: 'xiu', time: '一月',
          fx: function (s) { s.attrs.xin -= 4; s.hidden.zhi += 5; s.flags['主家许配'] = 1; return '主家把你许给了账房的儿子。婚事办得潦草，你盖着盖头听天由命。掀盖头那一刻你才知道对方是谁——乐籍的孩子，连婚事都轮不到自己做主，这一点，你早就知道。'; }
        }
      ]
    },
    {
      id: 'sh_j_zi', title: '添丁', tags: ['日常', '情缘'], once: true, weight: 45,
      age: [19, 46], cond: { or: [{ flag: '已成婚' }, { flag: '成家' }, { flag: '乐籍有婚' }] },
      story: '家里要添人口了。\n产婆来看过，说是胎像还稳。稳不稳，只有天知道——这年头，生孩子是闯一道门，母子都算闯。\n一家人备着红糖、备着襁褓、备着不知道该不该先备下的东西。',
      options: [
        {
          t: '稳稳当当地等，请好产婆', dim: 'shi', time: '一季',
          fx: function (s) { var ok = Math.random() < 0.55 + s.attrs.ti / 300 + (s.hidden.yun - 50) / 400; if (!ok) { s.attrs.xin -= 10; s.hidden.yin += 4; return '生产那夜出了岔子。孩子保住了，大人却伤了身子，从此药不离手。你抱着孩子在院里站了一夜，不知道该谢天还是该怨天。'; } var c = bornChild(s); s.attrs.xin += 8; s.attrs.ming += 4; return '啼声落地，母子平安。产婆抱出来给你看，皱巴巴一团，眼睛还没睁开。你从那一刻起知道，从此你的命里多了一条拴着你的绳。'; }
        },
        {
          t: '信乡下的土法，省钱省事', dim: 'li', time: '一月',
          fx: function (s) { var ok = Math.random() < 0.45 + s.attrs.ti / 350; if (!ok) { s.attrs.xin -= 12; s.hidden.yin -= 4; s.attrs.ti -= 4; return '土法没接住。孩子没能留住，大人也伤了元气。产婆走的时候把进门时的红包退了一半——她见得多了，可那天夜里她也没说话。'; } var c = bornChild(s); s.attrs.qian -= 2; s.attrs.xin += 6; return '土法土规矩，竟也顺顺当当。孩子生下来了，接生婆拿红布一裹，屋里屋外都松了口气。省下的钱给月子里的灶上添了油水。'; }
        },
        {
          t: '自己生不得，抱养一个', dim: 'xiu', time: '一季', req: { age: [19, 50] },
          fx: function (s) { s.attrs.xin += 6; s.hidden.yin += 8; if (s.family.children.length < 3) { var c = bornChild(s); if (c) { c.bornAtAge = s.age - 2; c.age = 2; c.attrs.ti = Math.max(10, c.attrs.ti - 8); } } return '你从族里抱了个孩子来，按养子的规矩写了文书。孩子认生，哭了半月，第四十天头一回冲你笑——从那日起，什么亲生不亲生，都是后话。'; }
        },
        {
          t: '与时疫撞了个正着，母子都凶险', dim: 'yi', time: '一季',
          fx: function (s) { var ok = Math.random() < 0.4 + s.attrs.ti / 200; if (ok) { var c = bornChild(s); s.attrs.ti -= 10; s.attrs.xin += 5; return '疫气撞上了产期，全家都捏着一把汗。闯过来了。孩子生下来瘦，却囫囵。你大病一场，从鬼门关回来那天，把该怕的都怕完了，往后倒什么都不怕了。'; } s.attrs.ti -= 14; s.attrs.xin -= 12; s.hidden.zhi += 6; return '疫气不认人。孩子没能留住，你也伤了大半条命。你在榻上躺了一个月，把这场事的每一天都想了一遍，想不出错在哪——天要收人，不与你商量。'; }
        }
      ]
    },
    {
      id: 'sh_j_ye', title: '置业', tags: ['日常'], once: false, weight: 11,
      age: [25, 62],
      story: '手里的活钱渐渐有了余头。\n余钱是祸——放着会招眼，花了会心疼，只有置成产业，才算真正落袋。置田、开铺、藏书，三条路，各养各的命。',
      options: [
        {
          t: '置田', dim: 'li', time: '一季', req: { qian: 20 },
          fx: function (s) { if (s.estate.tian >= 9) return '你名下的田已经连成了片，乡里再没有比你更多的——再多买，就该有人夜里去你家墙根底下哭穷了。你止了手。'; s.attrs.qian -= 15; s.estate.tian = Math.min(9, s.estate.tian + 2); s.attrs.ming += 2; return '又置进两亩地。地契收进樟木匣时你数了数——匣子里的事，一亩一亩，都是你用年月换的。'; }
        },
        {
          t: '开铺', dim: 'shi', time: '半载', req: { qian: 25 },
          fx: function (s) { if (s.estate.pu >= 9) return '你的铺面沿街开了半条巷，再开就是与同行结死仇了。你把余钱换成了人情。'; s.attrs.qian -= 18; s.estate.pu = Math.min(9, s.estate.pu + 2); s.attrs.ming += 3; s.flags['有铺面'] = 1; return '又开了一间铺。开张那日的鞭炮屑扫了三簸箕。你站在柜台后头看着伙计招呼客人，想起头一间铺开张那天，你自己就是那个伙计。'; }
        },
        {
          t: '藏书', dim: 'xiu', time: '半月', req: { qian: 12 },
          fx: function (s) { if (s.estate.shu >= 9) return '你的书架顶到了房梁，再收就收成了书目。你最后收的那部，只是因为读完那一页时你想哭。'; s.attrs.qian -= 8; s.estate.shu = Math.min(9, s.estate.shu + 1); s.attrs.cai += 4; s.attrs.ming += 2; return '又收进来一箧书。夜里点灯翻到卷末，页边有前一位藏家的批注，墨色已旧。你与他隔着几十年，共着一盏灯。'; }
        },
        {
          t: '押上本钱，跟人做一票大的', dim: 'yi', time: '一季',
          fx: function (s) { var ok = Math.random() < 0.4 + (s.attrs.ming - 40) / 300; if (ok) { s.attrs.qian += 15; s.hidden.yun += 3; s.estate.pu = Math.min(9, s.estate.pu + 1); return '赌赢了。本钱翻了一倍还带零头。你把赢来的钱分成三份：一份置田，一份还人情，一份压箱底——赢过一次的人，才知道怎么不再赌。'; } s.attrs.qian -= 18; s.attrs.xin -= 6; if (s.estate.tian > 0) s.estate.tian -= 1; return '输了。折进去的不只是本钱，还有去年置的那两亩地。回家路上你把这笔账在心里算了十几遍，遍遍都对，遍遍都不甘心。'; }
        }
      ]
    }
  );

  /* ================= 14 · 资源转化链：钱名权学，互相兑换，边际递减 ================= */
  D.shared.push(
    {
      id: 'sh_c_yu', title: '施与', tags: ['日常', '善缘'], once: false, weight: 8,
      story: '城里又有人议论：你家境比寻常人宽裕些。\n宽裕的人家，向来有人来借、有人来求、有人来观望。施与这种事，第一次是善，第二次是例，第三次便成了「他家的钱好拿」——你施与的每一次，都在教别人怎么向你伸手。',
      options: [
        {
          t: '开仓施与，做一次善事', dim: 'shi', time: '旬日',
          fx: function (s) { s.ex.yu++; var rate = s.ex.yu === 1 ? 1 : s.ex.yu === 2 ? 0.6 : 0.3; var gain = Math.round(6 * rate); s.attrs.qian -= 10; G.addFame(s, 'xiang', Math.max(1, gain)); s.hidden.yin += 4; return gain >= 5 ? '钱出了，名进了。受施的人家在门口替你挂了红。头一回施与，人人都记得住。' : gain >= 3 ? '又是你施的。受的人道了谢，看的人说「他家向来如此」。善事做成了惯例，就只剩了例。' : '你照例施了。街坊照例受了。这一回，连谢的人都没有多抬一次头。'; }
        },
        {
          t: '只帮那家最难处的人', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.qian -= 4; s.hidden.yin += 8; s.attrs.xin += 3; return '你寻了村里最难的那么一两家，悄悄送了粮。没挂红，没扬名。夜里睡下时你想：这钱花得比施棚值得多。'; }
        },
        {
          t: '把「施与」改成「借与」，立据收息', dim: 'li', time: '一月',
          fx: function (s) { s.attrs.qian += 5; G.addFame(s, 'xiang', -3); s.hidden.yin -= 3; return '钱借出去了，据立好了，息收回来了。账面比施与好看，人心比施与难看。几年后你收账，有人跪着求宽限，你想了想当年自己施粥的手，把手缩了回去。'; }
        },
        {
          t: '不做，关起门过日子', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin += 2; return '你没出门。城里怎么议论，随它去。攒下的每一文都是自己的，这句话听着硬，可你摸着米缸睡觉的时候，确实踏实。'; }
        }
      ]
    },
    {
      id: 'sh_c_ye', title: '干谒', tags: ['朝堂风波', '日常'], once: false, weight: 8,
      minScene: 8, cond: { cai: 40 },
      story: '有司衙门的门房，认得你的帖子了。\n干谒这件事，头一回去是求见，第二回去是求见，第三回去——门房便知道你是非见不可的了。名帖递进去的次数多了，你的名字在某个簿子上，也在慢慢换一种写法。',
      options: [
        {
          t: '备帖干谒，求个进身之阶', dim: 'shi', time: '半月',
          fx: function (s) { s.ex.ye++; var failRate = 0.15 + (s.ex.ye >= 3 ? 0.2 : 0); s.attrs.ming -= 5; s.attrs.xin -= 3; var ok = Math.random() > failRate; if (ok) { s.power = Math.min(9, s.power + 1); return '有人肯为你具保了。你的名字入了某个簿子——俸禄未变，出入的门禁变了。低头是有代价的，这一回，代价换回了东西。'; } return '帖子递了三回，回帖只有一句「公事冗繁」。你从后门进来，从前门出去——这条路你走熟了，可熟路走多了，人就矮了。'; }
        },
        {
          t: '以文会友，不走门路', dim: 'xiu', time: '一月',
          fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 3; G.addFame(s, 'zhou', 2); return '你把干谒的帖子收了起来，转而去了两场文会。以文会友这条路慢，慢在没人替你抬轿子——快在抬你的人，将来未必拆你的台。'; }
        },
        {
          t: '重金投谒，买一个名分', dim: 'li', time: '一月', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 22; s.power = Math.min(9, s.power + 1); s.hidden.yin -= 5; s.flags['买过名分'] = 1; return '钱递到位了，名分下来了。簿子上你的来路写得清清楚楚——清清楚楚地写着「纳资」。用得着你的日子里没人提这一笔；用不着你的日子里，这一笔就是你的全部。'; }
        },
        {
          t: '把帖子烧了，回家种地', dim: 'yi', time: '数日',
          fx: function (s) { s.attrs.xin += 5; s.hidden.zhi -= 3; return '你把备好的帖子烧了。火光里你把「求」这个字也烧了。第二年秋天，你田里的收成比衙门里的脸色实在得多。'; }
        }
      ]
    },
    {
      id: 'sh_c_lou', title: '陋规', tags: ['朝堂风波'], once: false, weight: 8, dyn: ['yuan', 'ming', 'qing'],
      minScene: 10, cond: { power: 3 },
      story: '你如今经手的事，件件都过你的手。\n经手的人都知道规矩：火耗、常例、打点、漂没——这些不上账的钱，向来是「大家都有份」。你不收，是断别人的路；你收了，是把自己的把柄自己递出去一半。',
      options: [
        {
          t: '照规矩收下', dim: 'li', time: '一月',
          fx: function (s) { s.ex.lou++; s.attrs.qian += 12; s.hidden.yin -= 8 * (s.ex.lou >= 2 ? 2 : 1); s.flags['有把柄'] = 1; return '头一回收的时候你手抖，第二回就顺了。钱确实来得快。账上没有它，可你心里从此也多了一本「没有」的账——那本账，比任何账房记的都清楚。'; }
        },
        {
          t: '分文不取，全数归公', dim: 'shi', time: '一月',
          fx: function (s) { s.attrs.xin += 8; s.hidden.yin += 8; G.addFame(s, 'chao', 2); s.attrs.qian -= 2; return '你把送来的「常例」原封退了，一笔一笔录在案头。同僚看你的眼神像看一个疯子，上官看你的眼神像看一把快刀。清官这种东西，在衙门里先要用，后才有人敬。'; }
        },
        {
          t: '收一半，留一半做个样子', dim: 'xiu', time: '旬日',
          fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 5; s.flags['有把柄'] = 1; s.attrs.xin -= 3; return '你收了一半，退了一半，两边的账都挂了名。你以为这样两头都留了余地——两头都记下了你：贪的人嫌你装，清的人记你贪。'; }
        },
        {
          t: '反手把陋规报了上去', dim: 'yi', time: '半月',
          fx: function (s) { s.hidden.yin += 10; s.attrs.qian -= 5; s.power = Math.max(0, s.power - 1); s.flags['掀过陋规'] = 1; var ok = Math.random() < 0.5; if (ok) return '你把经手的陋规列成单子，递了上去。衙门震了一震，你挪了位——挪到冷衙门去了，可从那以后再没人敢往你手里塞东西。'; s.attrs.ming -= 6; s.attrs.xin -= 6; return '单子递上去第三天就回到了原处，多了一行批语：早有定例。从此衙门里的人与你说话，都用一种含着笑的客气——那客气，是墙。'; }
        }
      ]
    },
    {
      id: 'sh_c_du', title: '苦读', tags: ['日常'], once: false, weight: 8,
      story: '夜又深了，灯还亮着。\n苦读这种事没有近路：一本一本啃下去，一年一年熬出来。读的人多，熬出来的少——熬出来的那些，也未必都落到好去处。可你眼下能抓住的，只有这一盏灯。',
      options: [
        {
          t: '闭门苦读半载', dim: 'xiu', time: '半载',
          fx: function (s) { s.ex.du++; var gain = s.ex.du >= 4 ? 3 : 6; s.attrs.cai += gain; s.attrs.ti -= 4; s.hidden.zhi += 2; return gain >= 6 ? '半载下来，你读书快了，眼睛却花了。文章的字句在纸面上排得越来越齐——你自己知道，那是在往上走。' : '又是半载。书还是那些书，读起来却不再那么费力。费力的事熬到不费力，多半是人熬伤了，不是书读通了。'; }
        },
        {
          t: '读闲书杂学，不分经义', dim: 'li', time: '一季',
          fx: function (s) { s.attrs.cai += 3; s.attrs.qian += 3; s.attrs.ming -= 1; return '你读了些「无用」的书：算学、舆地、工造之属。科场不用它们，日子用得上。有个开铺的远亲来问算，你替他理了一夜账，理出了半年亏空的病根。'; }
        },
        {
          t: '教书养读，边教边学', dim: 'shi', time: '一季',
          fx: function (s) { s.attrs.cai += 4; s.attrs.qian += 4; G.addFame(s, 'xiang', 2); s.attrs.ti -= 2; return '你开了个小馆，教七八个蒙童，束脩虽薄，日子过得去。教人的时候你自己也在长——小孩子问的那些「为什么」，有一半你以前没想过。'; }
        },
        {
          t: '放下书，出去走走', dim: 'yi', time: '一月',
          fx: function (s) { s.attrs.ti += 5; s.attrs.xin += 4; s.hidden.yun += 2; return '你合上书走了三十里。走过集市、渡口、两家为地界吵架的村口。回来再翻开书，字还是那些字，你却知道它们该往哪里放了。'; }
        }
      ]
    },
    /* —— 反噬一 · 弹劾 —— */
    {
      id: 'sh_c_tan', title: '弹章', tags: ['朝堂风波', '灾祸'], once: true, weight: 0,
      story: '参你的折子递上去了。\n折子里列了你经手的每一件事，把每一件都往坏处写了一层。写的人你认得——你曾在他的门前递过帖子，也在他的道上传过常例。\n风声传出来那日，你把自家账目翻出来又核了一遍。你核的其实不是账，是心。',
      options: [
        {
          t: '上表自辩，把账摊开', dim: 'shi', time: '半月',
          fx: function (s) { s.power = Math.max(0, s.power - 2); s.attrs.ming -= 10; s.attrs.xin += 5; s.flags['被参过'] = 1; return '你把经手的账一笔一笔写清，连带自己也认了两条不是。查案的人核了三个月，最后的批语是「事出有因」。位子丢了，名声保住了半个——半个，够你往后走路用了。'; }
        },
        {
          t: '认下，赔罪去职', dim: 'xiu', time: '一月',
          fx: function (s) { s.power = 0; s.attrs.ming -= 6; s.attrs.xin += 8; s.hidden.yin += 6; return '你认了，交印那日把书房里那些「常例」的单子一并烧了。回家路上你走得比赴任那天慢，慢出来的那些时辰，你在想往后往哪里走。'; }
        },
        {
          t: '托人打点，把折子压下去', dim: 'li', time: '半月', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 22; s.hidden.yin -= 6; s.flags['压过弹章'] = 1; return '折子压住了，位子保住了。可递折子的人知道你压了，收钱的人知道你怕了——你的短处，从此多了一本外账。'; }
        },
        {
          t: '反参他一本', dim: 'yi', time: '一月',
          fx: function (s) { var ok = Math.random() < 0.45 + s.power / 25; if (ok) { s.hidden.yin -= 8; s.flags['参倒了人'] = 1; return '你把他的事翻了出来，件件有据。他去了职，你保住了。夜里你想：这一局你赢了，赢得跟你输的时候一样难看。'; } s.power = Math.max(0, s.power - 3); s.attrs.ming -= 8; s.hidden.yin -= 6; return '他早有防备，你的折子反成了「挟私报复」。位子没了半层，冤的人也没昭雪——两头落空的事，你赶上了。'; }
        }
      ]
    },
    /* —— 反噬二 · 树大招风 —— */
    {
      id: 'sh_c_fu', title: '招风', tags: ['朝堂风波', '灾祸'], once: true, weight: 0,
      story: '树大招风，这四个字你从前只当是书上的话。\n如今风真的来了：有人在查你家铺子的账，有人在问你家的地，有人夜里在你门房外停了半晌的马。你的势太扎眼了，而执念让你不肯收——你已经收不动了。',
      options: [
        {
          t: '散财自削，把势卸下来', dim: 'xiu', time: '半载',
          fx: function (s) { s.attrs.qian -= 20; s.power = Math.max(0, s.power - 3); s.hidden.zhi -= 10; s.attrs.xin += 8; return '你把两处铺面让了出去，把家里的排场撤了，把门客遣散了。风还在刮，可你矮下来了，风从头顶过去了。粗茶淡饭那一年，你睡得比哪年都沉。'; }
        },
        {
          t: '硬扛，寸土不让', dim: 'shi', time: '半载',
          fx: function (s) { var ok = Math.random() < 0.4 + s.power / 30; if (ok) { s.attrs.qian -= 8; s.attrs.ming += 6; return '你硬扛了半年，把三拨查你的人都耗走了。扛过来的人说话嗓门都大些——可你知道，你的底气有一半是运气，运气不认人。'; } s.attrs.qian -= 20; s.attrs.ti -= 10; s.attrs.xin -= 8; s.flags['被抄检'] = 1; return '扛到第五个月，抄检的文书到了。家产清了大半，人也脱了一层皮。你护住了最想护的那一样，别的都散了——散的时候你才发现，原来它们从来就不是你的。'; }
        },
        {
          t: '献出部分家业，换个平安', dim: 'li', time: '一季', req: { qian: 25 },
          fx: function (s) { s.attrs.qian -= 20; s.hidden.yin -= 4; s.power = Math.max(0, s.power - 2); return '你「自愿」献了一部分产业给该收的人家。风小了。所有人都体面了——体面这种东西，是用你的家产垫的。'; }
        },
        {
          t: '夜里遣散家小，自去远行', dim: 'yi', time: '一年',
          fx: function (s) { s.attrs.qian -= 15; s.power = Math.max(0, s.power - 4); s.hidden.yun -= 5; s.flags['避祸远行'] = 1; return '你把家小送去了岳家，自己带了一箱细软走了。走的时候没告诉任何人。第二年风声过去了，你回来，家里的桃树开了花——你在外面吃的苦，桃树一概不知。'; }
        }
      ]
    }
  );

  /* ================= 16 · 关系网（静态，只表意 + 迁怒用） ================= */
  D.npcWeb = {
    li:   { pei: -30, shen: 20, xu: 10 },
    pei:  { li: -30, yan: 15 },
    yan:  { pei: 15, ahe: -10 },
    shen: { li: 20, ahe: 10 },
    ahe:  { yan: -10, shen: 10 },
    xu:   { li: 10, shen: 5 }
  };

  /* ================= 15 · 家声遗泽的专属小事件 ================= */
  D.shared.push(
    {
      id: 'sh_y_zhi', title: '家声', tags: ['日常', '善缘'], once: true, weight: 30,
      cond: { flag: '家声遗泽' }, minScene: 3,
      story: '你初到一处，本该处处受冷眼，事情却办得出奇地顺。\n后来才知道：你祖上的名号在这地方响过。有位老人拉着你的手说了你曾祖当年的三件旧事，一件比一件体面。\n你从没见过曾祖。可他的名字替你开了一扇又一扇门。',
      options: [
        {
          t: '承这份情，好好做人和做事', dim: 'shi', time: '旬日',
          fx: function (s) { s.attrs.ming += 6; s.attrs.xin += 4; s.hidden.yin += 4; return '你把老人的话记在心里。此后你在这地方行事，处处留意不堕了那个名号。名声这种东西，祖上存的，是要后人还的——你认这笔账。'; }
        },
        {
          t: '借着祖名，多讨些便利', dim: 'li', time: '半月',
          fx: function (s) { s.attrs.qian += 8; s.attrs.ming += 3; s.hidden.yin -= 3; return '你把祖上的名号用得很足：赊账、见官、递话，处处都顺。顺过三个月你忽然明白，这声名是借的，利息是往后你的为人来还。'; }
        },
        {
          t: '把曾祖的旧事记下来', dim: 'xiu', time: '数日',
          fx: function (s) { s.attrs.cai += 4; s.attrs.xin += 6; s.hidden.zhi -= 3; return '你寻了个识字先生，把老人讲的三件事写成了一页纸。写完你读了两遍，把它收进箱底。一个人知道自己从哪里来，夜里睡得稳些。'; }
        },
        {
          t: '谢过老人，散些钱给乡里', dim: 'yi', time: '旬日',
          fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 5; s.hidden.yin += 8; return '你谢了老人，又把带来的闲钱散给了村里几家难处的人家。老人看你做完这些，点了点头，说：是那个门里出来的人。这句话，比什么都值钱。'; }
        }
      ]
    }
  );

  /* ================= 17 · 朝代注册表（唯一事实来源：royal 国姓 / exam 选官制） ================= */
  D.registry = {
    groups: [
      { id: 'pre-qin',   name: '先 秦',            dyn: ['xia', 'shang', 'zhou_x', 'chunqiu', 'zhanguo'] },
      { id: 'qin-han',   name: '秦 汉',            dyn: ['qin', 'han', 'xin'] },
      { id: 'wei-jin',   name: '三国两晋南北朝',    dyn: ['sanguo', 'jin_x', 'jin_d', 'nanbei'] },
      { id: 'sui-tang',  name: '隋 唐 五 代',       dyn: ['sui', 'tang', 'wudai'] },
      { id: 'song-liao', name: '宋 辽 金 夏',       dyn: ['song', 'liao', 'xixia', 'jin'] },
      { id: 'yuan-qing', name: '元 明 清',          dyn: ['yuan', 'ming', 'qing'] }
    ],
    dyn: {
      xia:     { name: '夏',     line: '洪水未退，人神杂处',       tags: ['治水', '部落', '巫祝'],   exam: 'none',  royal: '姒' },
      shang:   { name: '商',     line: '青铜照影，卜辞问天',       tags: ['甲骨', '方国', '人牲'],   exam: 'none',  royal: '子' },
      zhou_x:  { name: '西周',   line: '礼乐既定，宗法为骨',       tags: ['分封', '礼乐', '井田'],   exam: 'none',  royal: '姬' },
      chunqiu: { name: '春秋',   line: '霸主会盟，礼未全崩',       tags: ['会盟', '弑君', '养士'],   exam: 'none',  royal: '姬' },
      zhanguo: { name: '战国',   line: '变法图强，游士纵横',       tags: ['变法', '合纵', '百家'],   exam: 'none',  royal: '姬' },
      qin:     { name: '秦',     line: '法令如霜，徭役如山',       tags: ['军功', '郡县', '徭役'],   exam: 'none',  royal: '嬴' },
      han:     { name: '汉',     line: '边关烽燧未熄，豪强兼并乡里', tags: ['察举', '边关', '豪强'],   exam: 'chaju', royal: '刘' },
      xin:     { name: '新',     line: '符命改了天下，天下不认',   tags: ['符命', '改制', '流民'],   exam: 'none',  royal: '王' },
      sanguo:  { name: '三国',   line: '兵戈未息，中正将起',       tags: ['军屯', '游说', '降附'],   exam: 'none',  royal: '—' },
      jin_x:   { name: '西晋',   line: '门第如铁，清谈误国',       tags: ['门阀', '清谈', '南渡'],   exam: 'none',  royal: '司马' },
      jin_d:   { name: '东晋',   line: '王与马，共天下',           tags: ['门第', '北伐', '玄言'],   exam: 'none',  royal: '司马' },
      nanbei:  { name: '南北朝', line: '佛寺遍地，胡汉杂处',       tags: ['门第', '释褐', '均田'],   exam: 'keju',  royal: '—' },
      sui:     { name: '隋',     line: '运河通南北，征辽不肯休',   tags: ['科举', '开河', '征辽'],   exam: 'keju',  royal: '杨' },
      tang:    { name: '唐',     line: '万国来朝，诗酒风流',       tags: ['科举', '藩镇', '胡商'],   exam: 'keju',  royal: '李' },
      wudai:   { name: '五代',   line: '兵强马壮者为天子',         tags: ['兵变', '武人', '割据'],   exam: 'keju',  royal: '—' },
      song:    { name: '宋',     line: '文治极盛，岁币苟安',       tags: ['文治', '岁币', '党争'],   exam: 'keju',  royal: '赵' },
      liao:    { name: '辽',     line: '捺钵四时，南北分官',       tags: ['捺钵', '部族', '边市'],   exam: 'keju',  royal: '耶律' },
      xixia:   { name: '西夏',   line: '蕃汉并用，盐铁立国',       tags: ['译经', '盐铁', '蕃汉'],   exam: 'none',  royal: '李' },
      jin:     { name: '金',     line: '猛安谋克，汉化相争',       tags: ['猛安', '汉制', '南迁'],   exam: 'keju',  royal: '完颜' },
      yuan:    { name: '元',     line: '四等之制，驿路通达',       tags: ['驿路', '色目', '海运'],   exam: 'keju',  royal: '孛儿只斤' },
      ming:    { name: '明',     line: '洪武法严，厂卫暗行',       tags: ['厂卫', '海禁', '科场'],   exam: 'keju',  royal: '朱' },
      qing:    { name: '清',     line: '旗籍与科举并行，文字狱与洋务俱来', tags: ['旗籍', '文字狱', '漕运'], exam: 'keju', royal: '爱新觉罗' }
    }
  };
})(window.GAME_DATA);