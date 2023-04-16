/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
var sceneList = [ '花园', '蚁穴', '沙漠', '火蚁穴', '沼泽', '海洋', '海洋（滤镜）', 'PvP' ];

var map = 
{
	'基本' : [ '花园', 'PvP' ],
	'轻' : [ '花园', '蚁穴', 'PvP' ],
	'岩石' : [ '花园', 'PvP' ],
	'正方形' : { '花园' : 0.95, '沙漠': 0.01, '沼泽' : 0.01, '海洋' : 0.01, 'PvP' : 0.02 },
	'玫瑰' : [ '花园', '沙漠', 'PvP' ],
	'刺' : [ '花园', 'PvP' ],
	'鸢尾' : [ '花园', '沙漠' ],
	'翅膀' : [ '花园', '蚁穴', '沙漠', '火蚁穴' ],
	'导弹' : [ '花园', 'PvP' ],
	'葡萄' : '花园',
	'仙人掌' : '沙漠',
	'更快' : { '花园' : 0.33, '蚁穴' : 0.33, '海洋' : 0.01, '海洋（滤镜）' : 0.33 },
	'泡泡' : { '花园' : 0.01, '海洋' : 0.01, '海洋（滤镜）' : 0.98 },
	'花粉' : [ '花园', 'PvP' ],
	'蒲公英' : [ '花园', 'PvP' ],
	'蛋' : [ '花园', '蚁穴', '沙漠', '火蚁穴' ],
	'触角' : [ '花园', 'PvP' ],
	'重' : [ '花园', 'PvP' ],
	'阴阳' : [ '花园', 'PvP' ],
	'网' : '花园'
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
	'花园' : 'url(https://static.wikia.nocookie.net/florrio/images/d/d0/%E8%8A%B1%E5%9B%AD%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104053920&path-prefix=zh)',
	'蚁穴' : 'url(https://static.wikia.nocookie.net/florrio/images/5/52/%E8%9A%81%E7%A9%B4%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104053958&path-prefix=zh)',
	'沙漠' : 'url(https://static.wikia.nocookie.net/florrio/images/5/5b/%E6%B2%99%E6%BC%A0%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054014&path-prefix=zh)',
	'火蚁穴' : 'url(https://static.wikia.nocookie.net/florrio/images/a/a5/%E7%81%AB%E8%9A%81%E7%A9%B4%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054022&path-prefix=zh)',
	'沼泽' : 'url(https://static.wikia.nocookie.net/florrio/images/c/c4/%E6%B2%BC%E6%B3%BD%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054030&path-prefix=zh)',
	'海洋' : 'url(https://static.wikia.nocookie.net/florrio/images/5/56/%E6%B5%B7%E6%B4%8B%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054039&path-prefix=zh)',
	'海洋（滤镜）' : 'url(https://static.wikia.nocookie.net/florrio/images/1/1f/%E6%B5%B7%E6%B4%8B%EF%BC%88%E6%BB%A4%E9%95%9C%EF%BC%89%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054046&path-prefix=zh)',
	'PvP' : 'url(https://static.wikia.nocookie.net/florrio/images/d/d0/PvP%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054053&path-prefix=zh)'
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
 * A faster alternative to importing stylesheets where API requests are not needed
 * HTML class "transcluded-css" comes from [[Template:CSS]]
 * After this CSS importing method is approved, the previous one will be removed soon
 */
mw.hook("wikipage.content").add(function () {
    $("span.transcluded-css").each(function () {
        mw.util.addCSS($(this).text());
        $(this).remove();
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