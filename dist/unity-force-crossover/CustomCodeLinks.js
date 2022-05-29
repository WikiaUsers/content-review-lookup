/* This is used to show custom JS and CSS file list for the CodeQuickLinks extension within the Unity Force Wikia site, allowing admins and bureaucrats to edit it.*/
window.customCodeQuickLinks= {
	replaceAllDefaultLinks: true,
	showIcon: false,
	linkSet: {
		siteFiles: [
			{
				name: "JSPages",
				href: mw.util.getUrl("Special:JSPages")
			},
			{
				name: "ImportJS",
				href: mw.util.getUrl("MediaWiki:ImportJS")
			},
			{
				name: "Common.css",
				href: mw.util.getUrl("MediaWiki:Common.css")
			},
			{
				name: "LinkColours.css",
				href: mw.util.getUrl("MediaWiki:LinkColours.css")
			},
			{
				name: "Common.js",
				href: mw.util.getUrl("MediaWiki:Common.js")
			},
			{
				name: "PortableInfobox.css",
				href: mw.util.getUrl("MediaWiki:PortableInfobox.css")
			}
		],
		userFiles: [
			{
				name: "Common.css",
				href: "https://unity-force-crossover.fandom.com/wiki/Special:MyPage/common.css"
			},
			{
				name: "Common.js",
				href: "https://unity-force-crossover.fandom.com/wiki/Special:MyPage/common.js"
			}
		]
	}
};