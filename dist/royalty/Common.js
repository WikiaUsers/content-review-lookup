/* Any JavaScript here will be loaded for all users on every page load. */

// Dev Wiki imports
importArticles({
    type: "script",
    articles: [
        "w:dev:BackToTopButton/code.js",
        "w:dev:VisualSpellCheck/code.js",
        "w:dev:SignatureCheck/code.js",
        "w:dev:EditIntroButton/code.js",
        "w:dev:PurgeButton/code.js",
        "w:dev:AjaxBatchDelete/code.js",
        "w:dev:WallGreetingButton/code.js",
        "u:dev:Tooltips/code.js",
        "u:dev:FloatingToc/code.js",
        "u:dev:InactiveUsers/code.js",

    ]
});

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

//</source>