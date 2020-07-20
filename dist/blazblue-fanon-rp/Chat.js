importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js'

    ]
});
     var chatags = { images: true, videos: true };

/* Chat Header */
 
var chatTopic = '<font color="#FFFFFF"><a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons"><u>Emoticons</u></a> &bull; <a href="/wiki/User:CarlosIXA/ChatTags List" target="_blank" title="User:CarlosIXA/ChatTags List"><u>Chat Tags</u></a></font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()