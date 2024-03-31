importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/fanonmodule.js", /* Create WikiaRail element to advertise the fanon portal */
               
	]
});

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('MediaWiki:Common.js/SpoilerPop.js', 'the-rubiesa-teenage-adventure-and-the-vampirepedia');

importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});