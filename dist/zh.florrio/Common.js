/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
var sceneList = [ '花园', '蚁穴', '沙漠', '蚂蚁地狱', '沼泽', '海洋', '海洋（滤镜）', 'PvP' ,'下水道','地狱'];

var map = 
{
	'基本' : [ '花园', 'PvP','地狱' ],
	'轻' : [ '花园', '蚁穴', 'PvP' ,'蚂蚁地狱'],
	'岩石' : [ '花园', 'PvP' ],
	'正方形' : { '花园' : 0.95, '沙漠': 0.01, '沼泽' : 0.01, '海洋' : 0.01, 'PvP' : 0.02 },
	'玫瑰' : [ '花园', '沙漠', 'PvP' ],
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
	'果冻' : {'海洋' : 0.50, '海洋（滤镜）' : 0.50}
};

var pageName = mw.config.get('wgPageName');

var scene = map[pageName];
switch (Object.prototype.toString.call(scene))
{
	case '[object Undefined]':
		scene = '花园';
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
	'PvP' : 'url(https://static.wikia.nocookie.net/florrio/images/d/d0/PvP%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054053&path-prefix=zh)',
	'下水道':'url(https://floof.netlify.app/assets/tiles/sewer.svg)',
	'地狱':'url(https://floof.netlify.app/assets/tiles/hell.svg)'
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
		W: {name: 'Flowr.fun 中文维基', logo: 'https://static.wikia.nocookie.net/florrio/images/7/7d/WSite-logo.png/revision/latest?cb=20240830094753&format=original&path-prefix=zh', background: 'url(https://static.wikia.nocookie.net/florrio/images/2/2f/WSite-background-light.png/revision/latest?cb=20240830101803&format=original&path-prefix=zh)',bg:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuNTY2ZWJjNSwgMjAyMi8wNS8wOS0wNzoyMjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wOC0yOFQwNjozNzozMy0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDgtMjhUMDY6NDE6MTgtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDgtMjhUMDY6NDE6MTgtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdjNWU0YWI0LWZjOTAtNGM0My1iZmEyLWM4OGUwOWFmZDA4MSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjE2ZWY5ZDc5LTU2OTQtNmE0Yy04MGY5LTJlZWY1ODg4OWQwNiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmNkZWQwOWE1LWFkZDAtYjM0ZS1hZmMzLTgwMjc5ZmUzZWJkYiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2RlZDA5YTUtYWRkMC1iMzRlLWFmYzMtODAyNzlmZTNlYmRiIiBzdEV2dDp3aGVuPSIyMDI0LTA4LTI4VDA2OjM3OjMzLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuNCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjdjNWU0YWI0LWZjOTAtNGM0My1iZmEyLWM4OGUwOWFmZDA4MSIgc3RFdnQ6d2hlbj0iMjAyNC0wOC0yOFQwNjo0MToxOC0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk2nxioAAABvSURBVGiB7dGxDYBADARBQMTfl/tviIAOIBi9tJM4vZXPmTl2dukBf93vWWvZHZ9t/4ECtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQCtAK0ArQHkDUBh4z/0vwAAAAASUVORK5CYII=)'}
	};

	var root = mw.config.get('wgPageName').split('/')[0];
	var subWiki = subWikis[root], w = subWiki;
	if (w) {
		$('.fandom-community-header__image, .fandom-community-header__community-name, .fandom-sticky-header__logo, .fandom-sticky-header__sitename').attr('href', function (_, src) {return src + '/' + root;});
		if (w.name) $('.fandom-community-header__community-name, .fandom-sticky-header__sitename').text(w.name);
		if (w.logo) $('.fandom-community-header__image, .fandom-sticky-header__logo').children().attr('src', w.logo);
		if (w.background) 
			if (mw.config.get('isDarkTheme')==0)
				document.getElementsByClassName("fandom-community-header__background")[0].style.backgroundImage = w.background;
			else
				document.getElementsByClassName("fandom-community-header__background")[0].style.backgroundImage = w.bg;
	}
})();