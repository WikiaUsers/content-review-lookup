importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/usertags.js",
        "MediaWiki:Wikia.js/slider.js"
    ]
});

// Add link to Rules to Wiki-Nav
// @author: http://c.wikia.com/wiki/User:UltimateSupreme
$("<li><a>").addClass('subnav-2-item')
	.find('a')
		.attr({
			'href': '/wiki/Cryptid Wiki:Rules',
			'class': 'subnav-2a'
		})
		.text('Rules').end()
	.appendTo($('.WikiHeader nav ul li.marked ul'));