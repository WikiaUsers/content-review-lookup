/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        'w:c:dev:MediaWiki:Countdown/code.js',
        'u:dev:TZclock.js'
    ]
}, {
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
	]
});

var tooltips_list = [ 
    {
        classname: 'advanced-tooltip',
        onShow: function(handle) { 
        var scrollEvent = new CustomEvent("scroll");
        window.dispatchEvent(scrollEvent);
        },
}];