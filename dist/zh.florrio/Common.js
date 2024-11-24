/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
var sceneList = [ '花园', '蚁穴', '沙漠', '蚂蚁地狱', '沼泽', '海洋', '海洋（滤镜）', 'PvP' ,'下水道','地狱','丛林','中心'];

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
}[scene];
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
})();