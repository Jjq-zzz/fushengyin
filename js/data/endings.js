/* 结局库：好结局少，灰色与留白多 */
(function (D) {
  D.endings = D.endings || [];

  function E(o) { D.endings.push(o); }

  /* ---------- 高位/显达 ---------- */
  E({
    name: '名留青史', group: '显', pri: 45,
    score: function (s) { var m=s.attrs.ming,c=s.attrs.cai;var v=(m-78)*1.8+(c-65)*1.2+(s.flags['著书']?12:0)+(s.attrs.xin-50)*0.2;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ ming: 78 }, { cai: 65 }, { flag: '著书' }] },
    verdict: '其人已没，其言犹在纸上发热。',
    epilogue: '许多年后，有人翻到你的名字。此人不知你面目，只知你写过什么、做过什么。他们说你是个好人，也有人说你不过如此。\n争论了几百年，你的书还在。\n坟头的草青了又黄。你躺着，什么都不知道。'
  });
  E({
    name: '功成身退', group: '显', pri: 42,
    score: function (s) { var v=(s.attrs.ming-70)*1.2+(s.attrs.xin-72)*1.6+(s.hidden.zhi<40?10:-6);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ ming: 88 }, { xin: 86 }, { noflag: '执念' }, { age: [45, 99] }] },
    verdict: '得意时抽身，是这世上最难的一步。',
    epilogue: '你走到极盛的那一年，忽然停住了。\n把印绶交上去时，同僚们都很惊讶。你笑了笑，说：够了。\n此后你在城郊置了几亩地，种菜、养鸡、看人下棋。有人来请你出山，你都说老糊涂了。\n你活得很久，久到记得你当年风光的人一个个先走了。'
  });
  E({
    name: '割据一方', group: '显', pri: 69,
    score: function (s) { var v=(s.attrs.ming-65)*0.9+(s.attrs.qian-55)*0.8+(s.attrs.ti-55)*0.7+(s.dimCount.yi||0)*2.2;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ ming: 65 }, { qian: 55 }, { ti: 55 }, { hidden: { zhi: 60 } }, { dim: ['yi', 4] }] },
    verdict: '他终究没能走出自己那一块地。',
    epilogue: '乱世里，你守着一座城、一片山、几千口人。\n你不是官，官府管不到你；你不是贼，贼也不敢惹你。你收税、断案、练兵、修路，做起了一个小小的朝廷。\n有人劝你再进一步。你摇头。你知道再进一步，便是万劫不复。\n你死时，城里的人给你立了祠。剩下的，史书上只有一句：某据某地，历若干年。'
  });
  E({
    name: '家族绵延', group: '显', pri: 60,
    score: function (s) { var fam=s.family||{},es=s.estate||{};var v=(s.attrs.qian-60)*0.5+(fam.children||[]).length*20+((fam.spouse&&fam.spouse.alive!==false)?15:0)+((es.tian||0)+(es.pu||0))*2+(s.age>=60?4:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ qian: 60 }, { flag: '成家' }, { age: [40, 99] }] },
    verdict: '他自己无甚可书，却把一个家撑住了。',
    epilogue: '你这一生没有惊天动地的事。有的是三进的宅子、几十亩地、一屋子人。\n你把儿子送去读书，把女儿嫁了好人家，把祖坟修得体面。族谱上你的那一支，从此再没有断过。\n三代之后，家里出了个进士。那孩子从未见过你，只在祠堂里对着你的牌位磕头。'
  });

  /* ---------- 中位/漂泊 ---------- */
  E({
    name: '乱世漂泊', group: '中', pri: 80,
    score: function (s) { var v=(100-s.hidden.yun)*0.7+(100-s.attrs.ming)*0.4-(s.attrs.qian-40)*0.3;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ not: { hidden: { yun: 46 } } }, { ming: [0, 78] }] },
    verdict: '他一生都在路上，连坟在何处也没人知道。',
    epilogue: '你换过很多地方。每到一个地方，住上几年，又走。\n你见过饥荒、见过兵灾、见过一座城从繁华到空无一人。你学会了什么活计都做一点，什么话都只说三分。\n最后你死在一个不知名的小镇上，客栈的伙计替你收了尸，在城外的乱葬岗上找了一块空地。\n你没有留下名字。'
  });
  E({
    name: '客死异乡', group: '中', pri: 76,
    score: function (s) { if(!s.dead)return 0;var v=(100-s.attrs.qian)*0.5+(100-s.attrs.ming)*0.4+(100-s.hidden.yun)*0.3;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ dead: true }, { noflag: '成家' }] },
    verdict: '他走得太远，远到回不去了。',
    epilogue: '你在一个很远的地方病倒了。这里的话你听得懂，说得不好。\n你托人捎信回去，信在驿站里丢了。你等着，等到不能再等。\n临终前你想起老家的那口井、院里的那棵树、母亲喊你吃饭的声音。\n你在异乡的土里躺着。这里也下雨，雨声和老家的不太一样。'
  });
  E({
    name: '泯然众人', group: '中', pri: 41,
    score: function (s) { var mx=Math.max(s.attrs.cai,s.attrs.ming,s.attrs.qian);var v=80-(mx-40)*1.1+Math.abs(s.hidden.zhi-45)*0.2;return Math.max(0,Math.min(100,v)); },
    verdict: '他来过，做过些事，然后就没有然后了。',
    epilogue: '你这一生，没有大富大贵，也没有大灾大难。\n年轻时也有过一些念头，后来都淡了。你娶妻生子，交了租，还了债，送走了长辈，看着孩子长大。\n你死的那天，天气很好。邻居们来帮了半天忙，吃了顿饭，各自散了。\n像一滴水落进河里。'
  });

  /* ---------- 修行/出世 ---------- */
  E({
    name: '遁入空门', group: '隐', pri: 84,
    score: function (s) { var v=(s.attrs.xin-80)*1.6+(60-s.hidden.zhi)+(s.dimCount.xiu||0)*1.4+(s.attrs.ming<40?8:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ xin: 90 }, { not: { hidden: { zhi: 34 } } }, { noflag: '成家' }] },
    verdict: '他不是逃，是终于放下了。',
    epilogue: '你把头发剃了，法号是师父随手起的。\n起初夜里还是会醒，会想起从前那些脸。后来慢慢就不想了。\n你每日担水、砍柴、诵经，日子过得像一条平缓的河。\n有一年山下的县里出了大事，死了很多人。你下山去看，什么也没说，只是念了一夜的经。\n你死前留下一句话：此生无憾，唯愧一人。至于那人是谁，你没有说。'
  });
  E({
    name: '山中遗老', group: '隐', pri: 88,
    score: function (s) { var v=(s.attrs.cai-60)*0.9+(s.hidden.yun-60)*0.8+(40-s.attrs.ming)*0.7;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ cai: 65 }, { hidden: { yun: 55 } }, { ming: [0, 75] }] },
    verdict: '世上无人知他，他却知世上的许多事。',
    epilogue: '你在一处山里住了一辈子。读书、种药、看云。\n偶尔有迷路的樵夫、赶考的书生闯进来，你就煮一壶茶，讲几句。他们下山后，有时会说你遇见了神仙。\n你听说了，只笑。\n你死后，山里多了一座无名的坟。多年后有人在坟前立碑，碑上刻的是"某先生墓"，某字处空着。'
  });

  /* ---------- 悲/烈 ---------- */
  E({
    name: '同归于尽', group: '烈', pri: 78,
    score: function (s) { var v=(s.hidden.zhi-78)*1.8+(s.flags['手染血']?10:0)+(s.attrs.ming<30?8:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ dead: true }, { or: [{ flag: '手染血' }, { hidden: { zhi: 82 } }] }] },
    verdict: '他拉着他恨的人，一起沉下去了。',
    epilogue: '你等了半生，等到那一日。\n事情做完时，你身上也有了血。你靠在墙边坐了很久，觉得累，也很轻。\n有人在喊，有人在跑。你想起很多年前那个下午，你还什么都没有，天很蓝。\n你没有逃。'
  });
  E({
    name: '身死名裂', group: '烈', pri: 76,
    score: function (s) { if(!s.dead)return 0;var v=(60-s.attrs.ming)*1.4+(s.attrs.xin-40)*0.4;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ dead: true }, { ming: [0, 88] }] },
    verdict: '他做了他认为对的事，只是世人都不这么看。',
    epilogue: '你被定了罪。罪状写得很长，有些是真的，有些不是。\n刑场上人很多，有人骂你，有人朝你扔东西。\n你抬头看了看天。天很好。你想说点什么，最终什么也没说。\n许多年后有人替你翻案，说当年那桩事另有隐情。那时你已经无所谓了。'
  });
  E({
    name: '为义而死', group: '烈', pri: 78,
    score: function (s) { if(!s.dead)return 0;var v=(s.hidden.yin-60)*1.3+(s.dimCount.yi||0)*2+(s.attrs.ming-45)*0.4;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ dead: true }, { hidden: { yin: 82 } }] },
    verdict: '他死的时候，有很多人哭。',
    epilogue: '你不是不知道会死。\n那件事，你可以不去做，做了也未必有人记得。可你还是做了。\n死得不算从容，甚至有些狼狈。但你护住的那个人活着出去了。\n后来那人每逢清明都来，带一壶酒，坐着说些闲话。\n你的名字被写进了县志的"义行"一卷，短短两行。'
  });

  /* ---------- 特殊 ---------- */
  E({
    name: '富甲一方', group: '利', pri: 48,
    score: function (s) { var v=(s.attrs.qian-88)*2+(s.attrs.ming-30)*0.5+(s.attrs.cai-50)*0.3;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ qian: 88 }, { ming: 30 }] },
    verdict: '他数了一辈子的钱，最后也没数清。',
    epilogue: '你的名声不好听，可你的钱很多。\n城里的商号有一半挂着你的字号，码头上的人都认得你的船。\n你在世时，官府要向你借银子；你病时，来探的人排到巷口。\n你死后三年，儿子们分了家，字号一家一家倒掉。\n后人提起你，只说：那人有钱。'
  });
  E({
    name: '执念成疾', group: '悲', pri: 57,
    score: function (s) { var v=(s.hidden.zhi-85)*2+(40-s.attrs.xin)*0.8+(s.hidden.yin<40?6:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ hidden: { zhi: 85 } }, { xin: 40 }] },
    verdict: '他把一件旧事，活成了自己的一生。',
    epilogue: '最后那几年，你常常分不清眼前和从前。\n你会在半夜起来写什么，写到天亮，纸上一个字也没有。你会对着空屋子说话，说得有来有往。\n身边的人都走光了。\n你死的时候，手里攥着一枚旧木牌。他们掰开你的手，看了半天，不知那是什么，随手扔了。'
  });
  E({
    name: '英年早逝', group: '悲', pri: 85,
    score: function (s) { if(!s.dead)return 0;var v=(38-s.age)*2.2+(s.attrs.cai<40?6:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ dead: true }, { age: [0, 34] }] },
    verdict: '一切都还没开始，就结束了。',
    epilogue: '你死得太早。\n有些话没来得及说，有些路没来得及走。你闭上眼睛时，心里想的是一件很小的事——某年春天，某个人说过的一句话。\n你走后，家里乱了一阵，后来慢慢也就好了。\n世界不缺一个人。'
  });
  E({
    name: '天年终老', group: '中', pri: 44,
    score: function (s) { var v=(s.age-60)*0.7+(s.attrs.xin-50)*0.4+(s.hidden.yun-40)*0.2;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ age: [62, 999] }, { noflag: '执念' }] },
    verdict: '他活得很久，久到成了别人口中的"老辈人"。',
    epilogue: '你活到了很少人活到的岁数。\n同辈的人一个也不剩了。你坐在门槛上晒太阳，看孙辈在院里跑。他们不怕你，觉得你只是个爱打瞌睡的老人。\n某天下午，你在梦里走了。\n出殡那天来了很多人，多半是来还人情的。'
  });

  /* ---------- 出身专属：新身份 ---------- */
  E({
    name: '宗室荣华', group: '显', pri: 64,
    score: function (s) { var v=(s.attrs.ming-55)*1.1+(s.attrs.xin-50)*0.9+(s.origin==='huang'?10:0)-(s.flags['触怒天颜']?20:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '宗室' }, { ming: 55 }, { xin: 50 }] },
    verdict: '他一辈子活在国姓里，活得体面，也活得小心。',
    epilogue: '你到底没有卷进任何一桩事里。\n封地还在，护军少了，属官也少了，可府里的日子照旧。你在宗正寺挂了个闲职，每月初一去点个卯，回来读半日书。\n逢年过节，宫里下来的赏赐还是那几只描金箱子。你父亲老了，见人仍旧不提那个字。\n你死时，谥号里有"恭"字。这字很好，也很轻。\n家谱上你这一支，从此安安稳稳地传了下去。'
  });
  E({
    name: '圈禁终身', group: '悲', pri: 90,
    score: function (s) { var v=(60-s.attrs.ming)*0.9+(s.hidden.zhi-60)*0.7+(s.flags['宗室结盟']?10:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '宗室' }, { ming: [0, 85] }] },
    verdict: '他没有谋反，可他姓这个姓。',
    epilogue: '府门被封的那日，来的人很客气，说：请王爷静养。\n此后的十年，你住在一所院子里。院墙很高，墙头有兵。院子里有一棵槐树，你数过它的叶子，数到一半总是忘。\n起初还有人递信进来，后来没有了。\n你死在那所院子里。讣闻报上去，宫里批了四个字：知道了。\n你姓了一辈子的国姓，最后连一块像样的碑都没有。'
  });
  E({
    name: '功高震主', group: '烈', pri: 68,
    score: function (s) { var v=(s.attrs.ming-70)*1.2+(s.attrs.ti-40)*0.6+(s.dimCount.shi||0)*1.5+((s.flags['边功']||s.flags['主战'])?6:0);return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '将门' }, { ming: 70 }, { ti: 40 }] },
    verdict: '他替朝廷打了半生的仗，最后朝廷怕的是他。',
    epilogue: '你打了很多仗，边地的人提起你，比提起你父亲还响。\n响到京里开始不安。先是一道嘉奖，再是一道调令，再是削去一半兵权。你都受了，一句怨言没有。\n最后一夜，京里来的人在你帐外站了半宿。你把刀解下来，放在案上，说：我这一生，没反过。\n他们记下了这句话，然后按章程办事。\n你死后，边地的老兵偷偷给你立了块碑，碑上没写官衔，只写了"我们的将军"。'
  });
  E({
    name: '一代大匠', group: '利', pri: 61,
    score: function (s) { var v=(s.attrs.cai-55)*1.2+(s.dimCount.li||0)*1.3+(s.attrs.ti-40)*0.3;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '匠籍' }, { cai: 55 }] },
    verdict: '他的名字没有刻在任何一块碑上，可那些东西还站着。',
    epilogue: '你这一生经手的活计，有桥、有塔、有宫室的梁、有军中的器。\n你从不署名。匠人不署名，这是规矩。图纸交上去，上头写的是监工官的名字。\n你老了之后，带过三十几个徒弟。你把墨斗传下去的时候，说：线要拉直。\n有一年，一座你三十年前造的桥被大水冲了。官府查下来，说：这桥比后来造的还结实，冲掉的那截，是后人乱改的。\n没有人为你说话，也不需要。'
  });
  E({
    name: '杏林国手', group: '中', pri: 65,
    score: function (s) { var v=(s.hidden.yin-65)*1.3+(s.attrs.ming-45)*0.8+(s.attrs.cai-50)*0.4;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '医家' }, { hidden: { yin: 65 } }, { ming: 45 }] },
    verdict: '他一生没做过官，可这座城有一半人欠他一条命。',
    epilogue: '你的药铺开了五十年。匾换过三回，药柜换过一回，你诊病的那张案，还是祖父留下的。\n你治过瘟疫，治过刀伤，治过买不起药的穷人，也治过不肯付钱的贵人。\n晚年你把手上的医案整理成册，抄了四份，分给四个徒弟。最后一页写着：治不了的，要说治不了。\n你死那日，门口排了很长的队。有人进不去，就在街上磕了个头。\n县志上记了你一行：某，精于医，活人无算。'
  });
  E({
    name: '名动教坊', group: '中', pri: 72,
    score: function (s) { var v=(s.attrs.ming-55)*1.2+(s.dimCount.xiu||0)*1.1+(s.attrs.cai-50)*0.5;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '乐籍' }, { ming: 55 }, { noflag: '良民' }] },
    verdict: '她唱了一辈子别人的悲欢，到死都没唱过自己。',
    epilogue: '你的名字在这一城传了很多年。\n达官贵人来听你的曲，文人替你写词，有人为一支曲子打赏了半年的俸。你唱得很好，好到所有人都忘了你姓什么、从哪里来。\n年岁渐长，颜色渐衰。台上的位置往后退了两排，再退三排，最后不再上台，只在教坊里教孩子们识谱。\n有一次，一个年轻人问你：您当年唱那支《凉州》，是真的伤心么？\n你笑了笑，说：傻孩子，唱得像是真的，就够了。'
  });
  E({
    name: '脱籍良民', group: '中', pri: 71,
    score: function (s) { var v=(s.attrs.qian-40)*0.5+(s.hidden.yin-50)*0.6+(s.flags['良民']?10:0)+(s.attrs.xin-50)*0.4;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '乐籍' }, { flag: '良民' }] },
    verdict: '她用半生的银子，赎回了自己的名字。',
    epilogue: '脱籍的文书下来那天，你把它叠好，放在最贴身的地方，放了整整一年。\n你在城南赁了两间屋，替人写曲子、教琴，也在茶馆里唱。挣得不多，可每一文都是自己的。\n有一年上元，你路过从前那个教坊。门口的管事换了新面孔，正在训一个哭着的孩子。\n你站了一会儿，走上前，说：这孩子我认识，让我带她走吧。\n管事看了看你的文书，把门开了。'
  });
  E({
    name: '边关蕃将', group: '显', pri: 62,
    score: function (s) { var v=(s.attrs.ming-55)*1.0+(s.attrs.ti-50)*0.8+(s.dimCount.yi||0)*1.6;return Math.max(0,Math.min(100,v)); },
    cond: { all: [{ flag: '蕃将' }, { ming: 55 }] },
    verdict: '两边都说他不是自己人，两边都靠他守着边。',
    epilogue: '你这一生，在关内是蕃将，在关外是汉人的官。\n朝廷用你守边，边关的人信你不抢他们。你打了十几仗，多半是替朝廷打自己的族人。\n你老了，朝廷给你一个虚衔，让你入京养老。你上了表，说愿留在边地。准了。\n你死时，关内关外都有人来送。两拨人站得很开，谁也没跟谁说话。\n坟在关下的坡上，朝着草原，也朝着关城。'
  });

  /* 兜底 */
  E({
    name: '泯然众人', group: '中', pri: 40,
    score: function (s) { return 12; },
    verdict: '一生无甚可书。',
    epilogue: '你来了，又走了。\n世上多一座坟，少一个人。'
  });
})(window.GAME_DATA);
