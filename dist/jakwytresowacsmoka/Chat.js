// Usprawnienia chatu// 
/* ChatOptions */
importScriptPage('ChatOptions/code.js', 'dev');
//Odnośniki''
var chatTopic = '<a href="https://jakwytresowacsmoka.wikia.com/wiki/Jak_Wytresowa%C4%87_Smoka_Wiki:Regulamin" target="_blank" title="Regulamin wiki" style="position:relative;text-decoration:none;">Regulamin</a> <a href="http://jakwytresowacsmoka.wikia.com/wiki/Pomoc:Chat" target="_blank" title="Pomoc:Chat" style="position:relative;text-decoration:none;">Pomoc</a> <a href="http://jakwytresowacsmoka.wikia.com/wiki/MediaWiki:Emoticons" target="_blank" title="Wszyskie emotikony" style="position:relative;text-decoration:none;">Lista emotikon</a>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:left;position:absolute;width:60%;z-index:0;font-size: 13px;color:#0074D8;font-weight:bold;line-height:1.6;margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

//Okno emotikon + formatowanie tekstu
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});