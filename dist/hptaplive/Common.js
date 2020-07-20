/* Tooltips */
var tooltips_list = [
    {
        classname: 'card-images',
        parse: '{{Card_Images|<#cardname#>}}'
    }
]
var tooltips_config = {
    offsetX: 10,
    offsetY: 10
}

/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:dev:DupImageList/code.js",
	"MediaWiki:Common.js/displayclock.js",
	"MediaWiki:Common.js/collapse.js",
        "u:dev:AjaxBatchDelete/code.2.js",
        'u:dev:MiniComplete/code.js',
		'u:dev:Tooltips/code.js',
		'u:dev:HighlightUsers/code.js'
    ]
});

/* Highlight */
highlight = {
    selectAll: true,
    sysop: '#AA00DD',
    bot: 'white',
    users: {

    }
};