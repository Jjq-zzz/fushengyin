/* 「西晋」朝代内容包：门第如铁，清谈误国 */
(function (D) {
  D.dynasties = D.dynasties || {};
  D.dynasties.jin_x = {
    id: 'jin_x', name: '西晋',
    clock: { year: 1, season: 0 }, eras: [],
    events: [
      { id: 'jx_zhongzheng', title: '中正评', tags: ['朝堂风波'], weight: 11,
        story: '中正定品，九等定终身。\n你家的门第不高。乡里的中正是本州大族的姻亲——评你的那支笔，握在别人家的手里。',
        options: [
          { t: '备礼走动，求上品', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 6; s.attrs.ming += 6; s.hidden.yin -= 4; return '你走动了三个月，品定为「中上」。上品无寒门，你够到了中品的边——够到的这一寸，用尽了十年的积蓄。'; } },
          { t: '以才学名动州里', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 5; s.hidden.yun += 3; return '你的文章在州府传抄，中正不得不把你提了一等。他提笔时叹了口气——那口气里，有整个时代。'; } },
          { t: '拒评，直言九品之弊', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.xin += 8; s.attrs.ming -= 4; s.hidden.yun -= 5; s.flags['讥九品'] = 1; return '你写了《论九品失实》一文，传抄甚广。你的品定下来了：下下。评语是「狂悖」。你把评语裱了起来。'; } },
          { t: '弃文从武，绕开清途', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ti += 5; s.attrs.ming += 3; s.flags['从武'] = 1; return '你投了军。武人的升迁不问门第，问首级。你选了另一条笔直的路——路上全是刀。'; } }
        ] },
      { id: 'jx_qingtan', title: '清谈', tags: ['日常'], weight: 10,
        story: '洛下清谈成风，麈尾一挥，胜过十卷书。\n有人劝你习清谈：谈好了是名士，谈不好是笑柄。名士的位置有限，笑柄的位置无限。',
        options: [
          { t: '苦研玄理，入场论辩', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 5; s.flags['善清谈'] = 1; return '你在论辩中连折两人，名动洛下。散场时有人握你的手说：可惜，可惜。你没问可惜什么——后来懂了。'; } },
          { t: '务实政，讥清谈误国', dim: 'shi', time: '数日', fx: function (s) { s.attrs.xin += 7; s.attrs.ming -= 2; s.flags['务实'] = 1; return '你埋头钱谷文书，对清谈客拱手绕行。务实的人在朝里不吃香，在州郡是宝。'; } },
          { t: '借清谈之名交游权贵', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 5; s.attrs.ming += 4; s.hidden.yin -= 5; return '你谈得一般，请客一流。三年后你成了圈子里的人——圈子里的人，先知天下事，后知天下要亡。'; } },
          { t: '在家注老庄，不赴场', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 5; s.attrs.xin += 6; return '你在家里注《庄子》，注到「安时而处顺」时，窗外正好下雪。你放下笔看了一炷香的雪。'; } }
        ] },
      { id: 'jx_shichong', title: '斗富', tags: ['日常'], weight: 9,
        story: '京中贵人斗富成风：以蜡代薪，以锦障泥。\n你的邻家也入了这个局，输了半个家产来撑面子。他劝你也入局——「撑过这一场，圈子就认你」。',
        options: [
          { t: '入局斗富，一掷千金', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 12; s.attrs.ming += 5; s.hidden.yin -= 6; return '你赢了那一场。圈子里传你的名字，请柬多了。半年后你才明白：斗富赢来的朋友，比输掉的钱还不值。'; } },
          { t: '讥其虚靡，闭门自守', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 5; s.attrs.ming -= 2; return '你家的饭桌一年比一年简。圈子里的笑话换了一茬又一茬，你的粮囤一年比一年实。'; } },
          { t: '反其道，散财赈灾', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 8; s.hidden.yin += 10; G.addFame(s, 'zhou', 6); return '那年灾荒，你开仓三日。斗富的圈子里传你的笑话，灾区的里正给你立了块碑。笑话会散，碑不会。'; } },
          { t: '投资斗富者的债', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 5; s.flags['放债'] = 1; return '你放债给斗富的人——斗富的人总缺钱。三年后你的债契堆满一箱，圈子里一半人的体面在你手里。'; } }
        ] },
      { id: 'jx_wanghu', title: '贾后风声', tags: ['朝堂风波', '灾祸'], weight: 9, minScene: 8,
        story: '宫里的风声一日三变。\n辅政的外戚与宗王相互猜忌，僚属们各自选边。你的座上官刚升了半级——半级，站错队就没了。',
        options: [
          { t: '随座主入局', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 6; s.hidden.yun -= 6; s.flags['入局'] = 1; if (Math.random() < 0.45) { s.attrs.qian += 5; return '座主赢了这局，你跟着升了官。升官那夜全城放炮——你听着炮响，想起兵是会真开的。'; } s.attrs.ming -= 8; s.flags['局败'] = 1; return '局败了。你被贬出京，路上听说座主满门被抄。你解下官印，在河边坐到天亮。'; } },
          { t: '称病去职，避祸还乡', dim: 'xiu', time: '数日', fx: function (s) { s.attrs.xin += 6; s.hidden.yun += 7; return '你以老病辞官。同僚笑你怕事。次年京中大乱，凡是那半年在朝的人，没几个活着——笑你的人没笑成。'; } },
          { t: '押宗王一边', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 5; s.flags['押王'] = 1; return '你押了宗王。宗王进京掌权，你水涨船高。你悄悄把家眷送回了乡——船大的时候，先想船翻。'; } },
          { t: '两头传话，自保渔利', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; s.flags['传话人'] = 1; return '你在两边之间传了半年话，两边都觉得你可信——可信的原因是你在两边都留了把柄。'; } }
        ] },
      { id: 'jx_wuhu', title: '胡汉之界', tags: ['日常', '边境战事'], weight: 9, minScene: 8,
        story: '迁入内地的胡人越来越多，与汉民杂处而相怨。\n县里征发胡人修渠，胡人说工重饷薄，汉人说他们懒。你的渠上有十户胡佃，工钱在你手里。',
        options: [
          { t: '同工同酬，一视同仁', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 4; s.hidden.yin += 8; G.addFame(s, 'xiang', 5); return '你把工钱拉平了。胡佃们干活比往年卖力三成。县里的官说你糊涂，渠是实实在在通了。'; } },
          { t: '压低胡佃工钱', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 6; s.hidden.yin -= 8; s.flags['欺胡'] = 1; return '工钱压了三成，渠照通。你在县里得了个「精明」的名声——那些压下去的钱，后来变成别的样子回来过。'; } },
          { t: '教胡人子弟识字', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 5; s.hidden.yin += 8; s.flags['教胡童'] = 1; return '你收了六个胡人孩子开蒙。多年后中原大乱，其中一人路过你的旧居，下马拜了三拜才走。'; } },
          { t: '借胡汉之怨兼并田产', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 10; s.flags['乘怨夺田'] = 1; return '你挑了两边的官司，两边都把田贱卖给了你。多年后大乱，来找你的不是官司——是刀。'; } }
        ] },
      { id: 'jx_luoyang', title: '纸贵', tags: ['日常'], weight: 8,
        story: '一位名士的赋传遍洛下，纸为之贵。\n抄书成了生意，也成了门路。你抄得一手好字——好字在这个时代，是一张长期的饭票。',
        options: [
          { t: '以抄书为业', dim: 'li', time: '半载', fx: function (s) { s.attrs.qian += 6; s.attrs.cai += 4; s.flags['抄书客'] = 1; return '你抄了三年的书。抄过的书你都能背——洛下的书生们说你「以手为腹」。'; } },
          { t: '自作文，投名士求荐', dim: 'shi', time: '一季', fx: function (s) { s.attrs.cai += 6; s.attrs.ming += 5; s.hidden.yun -= 3; if (Math.random() < 0.5) { s.attrs.ming += 5; return '名士读罢你的文，提笔荐了你。荐书在洛下通行无阻——你从此活在别人的笔底下。'; } return '文投了三家，石沉大海。你把退稿的理由各自抄了一遍——抄别人不识货，也算一门功课。'; } },
          { t: '伪造名士手书获利', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 8; s.hidden.yin -= 10; s.flags['伪书'] = 1; if (Math.random() < 0.6) return '你仿的字骗过了三家书肆。名士听说了，一笑置之——他的笑让你此后三年不敢用那手字。'; s.attrs.ming -= 12; return '伪书被当场拆穿。你被逐出洛下书肆行会——你的字再好，落款不是你。'; } },
          { t: '注释名赋，附骥而传', dim: 'shi', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.ming += 4; return '你给那篇名赋做了注，注比赋传得还广。后人提赋必提注——你把自己附在了名下，也附进了不朽。'; } }
        ] },
      { id: 'jx_nandu', title: '南渡之议', tags: ['朝堂风波', '灾祸'], weight: 10, minScene: 10,
        story: '北边的风声一年紧过一年，南渡的说法在朝野流传。\n走的人要舍祖业、别祖坟；留的人把命押给了边军。你的族老议了三夜，议不出一个整字。',
        options: [
          { t: '举族南渡', dim: 'shi', time: '一月', fx: function (s) { s.attrs.qian -= 8; s.attrs.xin += 6; s.hidden.yun += 7; s.flags['南渡'] = 1; return '你带着族人过了江。江上风大，船上的老人们一路回头。南岸的地不好，但南岸的天一直是晴的——好些年。'; } },
          { t: '留守祖业，赌边军', dim: 'yi', time: '数日', fx: function (s) { s.attrs.ming += 4; s.hidden.zhi += 6; s.hidden.yun -= 6; s.flags['留守'] = 1; return '你说：祖坟在此，吾不往。族里一半人走了，一半人留了。走的人后来寄回的每一封信，你都要读三遍——读的是别人的命，垫的是自己的胆。'; } },
          { t: '两头安置，先送妇孺', dim: 'yi', time: '一月', fx: function (s) { s.attrs.qian -= 5; s.attrs.cai += 4; s.hidden.yun += 5; return '你把妇孺送过江，丁壮留下看家业。两头都留了根——这是乱世里最贵的算术。'; } },
          { t: '趁南渡贱收北地田宅', dim: 'li', time: '一季', fx: function (s) { s.attrs.qian += 10; s.hidden.yin -= 8; s.flags['贱收'] = 1; return '南渡的人贱卖了七成的家业，你收了大半。你收的时候就知道这些地守不住——守不住的东西，便宜也是贵。'; } }
        ] },
      { id: 'jx_zhanzhen', title: '占田', tags: ['日常'], weight: 8, minScene: 9,
        story: '朝颁占田之制：官依品占，民依口占。\n令文写得堂皇，落地全看州县。你家的田在册上多报了三十亩——多报的，是要不要退的良心账。',
        options: [
          { t: '如实申报', dim: 'shi', time: '旬日', fx: function (s) { s.attrs.xin += 7; s.attrs.qian -= 3; return '你如实报了。多缴的税让家里紧了一年。县丞说：全县像你这样的，不到五家——你听了不知该骄傲还是该心寒。'; } },
          { t: '贿吏改册', dim: 'li', time: '旬日', fx: function (s) { s.attrs.qian -= 3; s.hidden.yin -= 6; if (Math.random() < 0.7) return '册改了，税省了。经手的书吏从此每年都来——他不是来收税的，是来收人的。'; s.attrs.ming -= 8; return '改册的事在上计中被查出。你补税三倍，全县通报。三年后令废了——你的亏，白吃了。'; } },
          { t: '把占田令讲给乡人听', dim: 'xiu', time: '旬日', fx: function (s) { s.attrs.cai += 4; G.addFame(s, 'xiang', 5); return '你在社树下把令文念给乡人听，哪句是权利，哪句是坑。听懂的人没吃亏。你成了乡里的「活令文」。'; } },
          { t: '多报人丁多占田', dim: 'yi', time: '旬日', fx: function (s) { s.attrs.qian += 5; s.hidden.yin -= 6; s.flags['冒丁'] = 1; return '你把没出生的孩子都报了上去。占足了田——册子上那些「儿子」，成了你每年上税时的笑谈。'; } }
        ] }
    ],
    main: [
      { id: 'jx_m1', title: '入洛', after: 0, time: '旬日',
        story: '你二十岁，第一次进洛阳。\n朱雀街宽得能并跑六辆车，贵人家的车帷比别家的房顶还高。你在街口站了半个时辰，看这个帝都的富贵从眼前流过去——像水，也像要决的水。',
        options: [
          { t: '游历权门，广投名帖', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 4; s.attrs.ming += 5; s.hidden.yin -= 3; return '你在洛下投了三十份名帖，回帖七份。七份里有一份能引路——你在洛下的根，就这么细的一根。'; } },
          { t: '闭门读书，不趋权门', dim: 'xiu', time: '半载', fx: function (s) { s.attrs.cai += 7; s.attrs.xin += 5; return '你在城南赁屋读书半年。权门的车马从巷外过，你的书页往里翻——后来乱世里活下来的人，多是巷子里翻书的。'; } },
          { t: '结交寒门俊才', dim: 'shi', time: '一季', fx: function (s) { s.attrs.ming += 4; s.hidden.yin += 5; s.flags['结寒俊'] = 1; return '你与七个寒门才士结了社，立誓不因门第相轻。那七个人后来散在各地做官——你的名字在七地都有人念。'; } },
          { t: '慕斗富之风，学豪奢', dim: 'yi', time: '一季', fx: function (s) { s.attrs.qian -= 8; s.attrs.ming += 3; s.hidden.yin -= 5; return '你学了半年豪奢，学会了，穷了。穷了才看清：洛下的富贵是潮水，潮水退时，最先露出来的是学潮水的人。'; } }
        ] },
      { id: 'jx_m2', title: '永嘉之兆', after: 12, time: '一月',
        story: '洛阳的粮价三个月翻了四倍，城外开始有胡骑的游哨。\n朝中还在斗，斗的人说「胡人不足虑」。你家里的粮够吃两个月——两个月之后的事，没人敢想。',
        options: [
          { t: '变卖家财，即刻南渡', dim: 'shi', time: '一季', fx: function (s) { s.attrs.qian -= 6; s.hidden.yun += 8; s.flags['南渡决'] = 1; return '你贱卖了洛下的宅子，换了南渡的船票与粮。船离岸那天你回头看了一眼洛阳——那眼，成了你对北方的最后一眼。'; } },
          { t: '入坞堡，聚宗族自保', dim: 'yi', time: '一季', fx: function (s) { s.attrs.xin += 6; s.attrs.ti -= 3; s.flags['筑坞'] = 1; return '你随宗族筑坞聚守。胡骑来了三次，都没攻进来。坞里的日子苦，苦得真实。'; } },
          { t: '散家财结胡帅，求庇护', dim: 'li', time: '一月', fx: function (s) { s.attrs.qian -= 8; s.hidden.yin -= 6; s.flags['结胡帅'] = 1; return '你重金结交了一位胡人小帅。城破那日他派兵护了你家。别人骂你通胡——骂的人后来都在求你引荐。'; } },
          { t: '押上一切，赌朝廷勤王', dim: 'yi', time: '一季', fx: function (s) { s.attrs.ming += 5; s.hidden.yun -= 7; s.hidden.zhi += 5; return '你把家财捐了勤王。王师败了，钱没了，洛阳陷了。你在难民营里把这件事从头想了一遍——想完只得出四个字：为之奈何。'; } }
        ] }
    ],
    endings: [
      { name: '江左侨士', group: '晋显', pri: 68,
        score: function (s) { var v = (s.attrs.cai - 55) * 0.7 + (s.flags['南渡'] ? 14 : 0) + (s.attrs.xin - 50) * 0.5 + (s.dimCount.shi || 0); return Math.max(0, Math.min(100, v)); },
        cond: { all: [{ cai: 56 }] },
        verdict: '他把北方丢了，把北方的话带过了江。',
        epilogue: '你在江南安顿下来，教孩子念北方的音。\n有人问你想不想回去。你想了很久，说：北方在，人不在了；人在，北方就还在。\n你的坟朝北——这是你留给子孙唯一的家训。' },
      { name: '坞主残年', group: '晋中', pri: 52,
        score: function (s) { var v = (s.flags['筑坞'] ? 16 : 0) + (s.attrs.xin - 50) * 0.5 + (100 - s.attrs.ming) * 0.25; return Math.max(0, Math.min(100, v)); },
        verdict: '洛阳陷了，他的坞堡还在。这就是全部的功业。',
        epilogue: '你守的坞熬过了三次围攻、两次瘟疫。\n坞里的人从四十口变成三百口，变成一座小城。\n你死的时候，坞里给你留了位置最正的一间房——他们说：这坞是他扛起来的。扛的人先走，扛的东西还在。' }
    ]
  };
})(window.GAME_DATA);
