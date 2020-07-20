//Temat
var chatTopic = '<a href="http://jakwytresowacsmoka.wikia.com/wiki/Jak_Wytresowa%C4%87_Smoka_Wiki:Regulamin" target="_blank" title="Regulamin wiki" style="position:relative;text-decoration:none;">Regulamin</a> <a href="http://jakwytresowacsmoka.wikia.com/wiki/Pomoc:Usprawnienia_czatu" target="_blank" title="Pomoc:Usprawnienia czatu" style="position:relative;text-decoration:none;">Pomoc</a> <a href="http://jakwytresowacsmoka.wikia.com/wiki/MediaWiki:Emoticons" target="_blank" title="Wszyskie emotikony" style="position:relative;text-decoration:none;">Lista emotikon</a>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:left;position:absolute;width:60%;z-index:0;font-size: 13px;color:#0074D8;font-weight:bold;line-height:1.6;margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove() 

//Usprawnienia czatu
importScriptPage('LightBlock/code.js', 'dev');
importScriptPage("ChatTags/code.js", "dev");
importScriptPage('ChatOptions/code.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        "u:dev:jumbles/startup.js"
    ]
} );
importScriptPage('ChatAnnouncements/code.js','dev');
importArticles({
	type: "script",
	articles: [
		"u:dev:QuickModTools/code.js"
	]
});
window.onload = addButtons();