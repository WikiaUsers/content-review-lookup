//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Constructed Worlds Wiki chat.<br/><a href="/wiki/Project:Chat" target="_blank" title="Project:Chat" style="position:relative;text-decoration:underline;">Read the rules here</a>';
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#969696; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

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