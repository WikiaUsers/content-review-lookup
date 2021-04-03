// Chat options 
// Written by Callofduty4 and Madnessfan34537, modified by Fang³

importScriptPage('User:Dragonfree97/chat.js/options.js','animalcrossing');
importScriptPage('ChatObject/code.js', 'dev' );
importScriptPage('Roleplay and Fanfiction Wiki:Sandbox/CustomChatTags.js', 'animalcrossing'); 

// END Chat options

// Chat header

var chatTopic = '• <a href="http://animalcrossing.wikia.com/wiki/Animal Crossing Wiki:Chat Rules" target="_blank">chat rules</a> • <a href="http://animalcrossing.wikia.com/wiki/Animal Crossing Wiki:Rules" target="_blank">wiki rules</a> • <a href="http://animalcrossing.wikia.com/wiki/Animal Crossing Wiki:Administrators" target="_blank">admins</a> • <a href="http://animalcrossing.wikia.com/wiki/Special:RecentChanges" target="_blank">recent changes</a> • <a href="http://animalcrossing.wikia.com/wiki/MediaWiki:Emoticons" target="_blank">emoticons</a> • <a href="http://animalcrossing.wikia.com/wiki/Animal_Crossing_Wiki" target="_blank">main page</a> • <a href="http://animalcrossing.wikia.com/wiki/Special:MyPage" target="_blank">my page</a> • <a href="http://animalcrossing.wikia.com/wiki/Special:UserLogout" target="_blank">logout</a> •'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;color:#337800;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// END Chat header