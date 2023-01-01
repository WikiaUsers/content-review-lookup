//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Sandbox chat<br /><a href="/wiki/Neko%27s_Sandbox_Wiki:Chat_Rules" target="_blank" title="Neko%27s Sandbox Wiki:Chat" style="position:relative;text-decoration:underline;">Chat rules</a> • <a href="/wiki/Abilities" target="_blank" title="Neko%27s Sandbox Wiki:Chat" style="position:relative;text-decoration:underline;">Actions</a> • <a href="/wiki/Actions" target="_blank" title="Neko%27s Sandbox Wiki:Chat" style="position:relative;text-decoration:underline;">Actions</a> • <a href="/wiki/Items" target="_blank" title="Neko%27s Sandbox Wiki:Chat" style="position:relative;text-decoration:underline;">Items</a> • <a href="/wiki/Skills" target="_blank" title="Neko%27s Sandbox Wiki:Chat" style="position:relative;text-decoration:underline;">Skills</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()