// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF">Welcome to the <strike>White Castle Diner</strike> RWBY Wiki Chat<br/> <img src="https://images.wikia.nocookie.net/__cb20130530014922/rainssandbox/images/c/cf/Omg.png" border="0"/> Ermahgerd!!! Yellow Trailer!! [[file:omg.png|link=]]</font> <img src="https://images.wikia.nocookie.net/__cb20130530014922/rainssandbox/images/c/cf/Omg.png" border="0"/>
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()