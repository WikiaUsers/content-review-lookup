/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */

var sceneList = [ '花园', '蚁穴', '沙漠', '蚂蚁地狱', '沼泽', '海洋', '海洋（滤镜）', 'PvP' ,'下水道','地狱','丛林','中心','蠕虫（地图）'];

var map = 
{
	'基本' : [ '花园', 'PvP','地狱' ],
	'轻' : [ '花园', '蚁穴', 'PvP' ,'蚂蚁地狱','中心'],
	'岩石' : [ '花园', 'PvP' ],
	'正方形' : ['花园','沙漠','海洋','海洋（滤镜）','蚂蚁地狱','下水道','地狱','中心'],
	'玫瑰' : [ '花园', '沙漠', 'PvP','中心' ],
	'刺' : [ '花园', 'PvP' ],
	'鸢尾' : [ '花园', '沙漠' ],
	'翅膀' : [ '下水道'],
	'导弹' : [ '花园', 'PvP' ],
	'葡萄' : '花园',
	'仙人掌' : '沙漠',
	'更快' : { '花园' : 0.33, '蚁穴' : 0.33, '海洋' : 0.01, '海洋（滤镜）' : 0.33 },
	'泡泡' : { '花园' : 0.01, '海洋' : 0.01, '海洋（滤镜）' : 0.98 },
	'花粉' : [ '花园', 'PvP' ],
	'蒲公英' : [ '花园', 'PvP' ],
	'甲虫卵' : [  '沙漠' ,'地狱'],
	'蚁卵' : '蚂蚁地狱',
	'触角' : [ '花园', 'PvP','下水道' ],
	'重' : [ '花园', 'PvP' ],
	'阴阳' : [ '花园', 'PvP' ],
	'网' : ['花园','PvP','下水道'],
	'果冻' : {'海洋' : 0.50, '海洋（滤镜）' : 0.50},
	'安卡':'沙漠',
	'暗黑标记':'地狱',
	'贝壳':['海洋','海洋（滤镜）'],
	'便便':'下水道',
	'玻璃':['花园','蚂蚁地狱','蚁穴','沙漠'],
	'铲子':['花园'],
	'磁铁':['沙漠','海洋','海洋（滤镜）'],
	'橙子':'花园',
	'电池':'丛林',
	'大丽花':['丛林','PvP'],
	'大米':['蚂蚁地狱','蚁穴','花园','PvP','中心'],
	'第三只眼':['花园','下水道','地狱'],
	'蠕虫内脏':'蠕虫（地图）',
	'蠕虫':'蚂蚁地狱',
	'酸泡泡':'沼泽'
};

var pageName = mw.config.get('wgPageName');

var scene = map[pageName];
switch (Object.prototype.toString.call(scene))
{
	case '[object Undefined]':
		scene = mw.config.get('isDarkTheme') ? 'PvP' : '花园';
		break;
	case '[object String]':
		scene = scene;
		break;
	case '[object Array]':
		Math.florr = Math.floor;
		scene = scene[Math.florr(Math.random() * scene.length)];
		break;
	case '[object Object]':
		randomNumber = Math.random();
		choice = 0;
		for (var i = 0; i < sceneList.length; i++)
		{
			var currentScene = sceneList[i];
			if (scene[currentScene])
			{
				choice += scene[currentScene];
				if (randomNumber < choice)
				{
					scene = currentScene;
					break;
				}
			}
		}
		break;
}

document.getElementsByClassName("fandom-community-header__background")[0].style.backgroundImage = 
{
	'花园' : 'url(https://static.wikia.nocookie.net/florrio/images/f/fd/%E8%83%8C%E6%99%AF.svg/revision/latest?cb=20230930230146&path-prefix=zh)',
	'蚁穴' : 'url(https://static.wikia.nocookie.net/florrio/images/5/52/%E8%9A%81%E7%A9%B4%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104053958&path-prefix=zh)',
	'沙漠' : 'url(https://floof.netlify.app/assets/tiles/desert.svg)',
	'蚂蚁地狱' : 'url(https://floof.netlify.app/assets/tiles/antHell.svg)',
	'沼泽' : 'url(https://static.wikia.nocookie.net/florrio/images/c/c4/%E6%B2%BC%E6%B3%BD%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054030&path-prefix=zh)',
	'海洋' : 'url(https://floof.netlify.app/assets/tiles/ocean.svg)',
	'海洋（滤镜）' : 'url(https://floof.netlify.app/assets/tiles/oceanAlt.svg)',
	'PvP' : 'url(https://static.wikia.nocookie.net/florrio/images/7/72/PvPBG1.svg/revision/latest/scale-to-width-down/185?cb=20240903143626&path-prefix=zh)',
	'下水道':'url(https://floof.netlify.app/assets/tiles/sewer.svg)',
	'地狱':'url(https://floof.netlify.app/assets/tiles/hell.svg)',
	'丛林':'url(https://static.wikia.nocookie.net/florrio/images/4/49/JungleBG1.svg/revision/latest/scale-to-width-down/185?cb=20240903143456&path-prefix=zh)',
	'中心':'url(https://static.wikia.nocookie.net/florrio/images/5/5d/CentraliaBG.svg/revision/latest/scale-to-width-down/185?cb=20240903143806&path-prefix=zh)'
	'蠕虫（地图）':'url(https://static.wikia.nocookie.net/florrio/images/3/3b/Wormmap.svg/revision/latest?cb=20250111063116&path-prefix=zh)'
}[scene]; // 此处有BUG

(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
/*
 * HTML class "transcluded-css", which is to be deprecated, comes from [[Template:CSS]]
 * The new "import-css" class comes from [[Module:CSS]]
 * After this revision is approved, the "transcluded-css" one will be removed soon
 */
mw.hook("wikipage.content").add(function () {
    $("span.transcluded-css").each(function () {
        mw.util.addCSS($(this).text());
        $(this).remove();
    });
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});

(function () {
	var subWikis = {
		旧: {name: '旧版florr.io 中文维基', logo: 'https://static.wikia.nocookie.net/florrio/images/a/a8/%E9%85%8D%E7%BD%AE.webp/revision/latest?cb=20240728012911&format=original&path-prefix=zh', light: 'https://static.wikia.nocookie.net/florrio/images/d/d0/%E8%8A%B1%E5%9B%AD%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104053920&format=original&path-prefix=zh', dark: 'https://static.wikia.nocookie.net/florrio/images/d/d0/PvP%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054053&format=original&path-prefix=zh'},
		二: {name: 'florr.io二创 中文维基'},
		W: {name: 'Flowr.fun 中文维基', logo: 'https://static.wikia.nocookie.net/florrio/images/7/7d/WSite-logo.png/revision/latest?cb=20240830094753&format=original&path-prefix=zh', light: 'https://static.wikia.nocookie.net/florrio/images/2/2f/WSite-background-light.png/revision/latest?cb=20240830101803&format=original&path-prefix=zh', dark: 'https://static.wikia.nocookie.net/florrio/images/f/f1/WSite-background-dark.png/revision/latest?cb=20240830101850&format=original&path-prefix=zh'}
	};

	var name = '.fandom-community-header__community-name, .fandom-sticky-header__sitename';
	var logo = '.fandom-community-header__image, .fandom-sticky-header__logo';
	var background = '.fandom-community-header__background';

	var root = mw.config.get('wgTitle').split('/')[0];
	var subWiki = subWikis[root], w = subWiki;
	if (w) {
		$(name + ', ' + logo).attr('href', function (_, src) {return src + '/' + root;});
		if (w.name) $(name).text(w.name);
		if (w.logo) $(logo).children().attr('src', w.logo);
		if (w.light || w.dark) $(background).css('background-image', 'url(' + (mw.config.get('isDarkTheme') ? w.dark || w.light: w.light || w.dark) + ')');
	}
})();{{史诗|}}

// 可选配置 — 留空则使用默认值 （AI代码，用于给每个新编辑的用户发规则）
window.welcomeMessage = {
  enabled: true,                  // 启用脚本
  adminUsername: '维基管理员',  // 管理员用户名（对应 $4）
  adminNickname: '维基管理员', // 管理员展示名（对应 $3）
  messageTitle: '欢迎加入我们, $1!',   // 消息标题
  // 消息正文（支持HTML和变量）
  messageText: '$1 ，欢迎加入florr.io中文维基！\n在您开始编辑前，请认真阅读主页中的 Help:新人编辑者 与 Florr.io_中文维基:封禁标准。前者是对于新用户的建议与指引，后者是本维基的规则。感谢您的理解与支持，现在可以开始您的编辑了！',
  debug: false,                   // 关闭调试日志
  testAllEdits: true,            // 关闭测试模式（仅首次编辑触发）
  preferTalk: false               // 优先使用消息墙
};

// ====== 全局随机数生成器 ======(AI代码)
window.Random = function(min, max, isInteger) {
  // 参数处理（支持单参数/多参数调用）
  const hasMin = (typeof min === 'number');
  const hasMax = (typeof max === 'number');
  const toInteger = (typeof isInteger === 'boolean') ? isInteger : false;
  
  // 范围校验与默认值
  const realMin = hasMin ? min : 0;
  const realMax = hasMax ? max : (hasMin ? min : 1);
  const [finalMin, finalMax] = realMin > realMax ? [realMax, realMin] : [realMin, realMax];
  
  // 核心算法（梅森旋转）
  const value = _mersenneTwister();
  
  // 结果转换
  if (toInteger) {
    return Math.floor(value * (finalMax - finalMin + 1)) + finalMin;
  }
  return value * (finalMax - finalMin) + finalMin;
};

// ====== 梅森旋转算法实现 ======
(function() {
  // 初始化状态（单例模式）
  if (window._mtState) return;
  
  const N = 624, M = 397;
  const state = new Array(N);
  let index = N + 1;
  const seed = new Date().getTime();

  // 初始化状态数组
  state = seed >>> 0;
  for (let i = 1; i < N; i++) {
    const s = state[i - 1] ^ (state[i - 1] >>> 30);
    state[i] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + 
               (s & 0x0000ffff) * 1812433253 + i;
    state[i] >>>= 0;
  }

  // 生成随机数（私有函数）
  window._mersenneTwister = function() {
    if (index >= N) {
      for (let k = 0; k < N - M; k++) {
        const y = (state[k] & 0x80000000) | (state[k + 1] & 0x7fffffff);
        state[k] = state[k + M] ^ (y >>> 1)^ ((y & 1) ? 0x9908b0df : 0);
      }
      for (let k = N - M; k < N - 1; k++) {
        const y = (state[k] & 0x80000000) | (state[k + 1] & 0x7fffffff);
        state[k] = state[k + M - N] ^ (y >>> 1)^ ((y & 1) ? 0x9908b0df : 0);
      }
      const y = (state[N - 1] & 0x80000000) | (state & 0x7fffffff);
      state[N - 1] = state[M - 1] ^ (y >>> 1)^ ((y & 1) ? 0x9908b0df : 0);
      index = 0;
    }

    let y = state[index++];
    y ^= y >>> 11;
    y^= (y << 7) & 0x9d2c5680;
    y^= (y << 15) & 0xefc60000;
    y^= y >>> 18;
    
    return (y >>> 0) / 4294967296; // 转换为[0,1)区间
  };
})();