// Chat header

siteUrl = wgServer.slice(7,-10);

var chatTopic = '<a class="topiclink" href="http://' + siteUrl + '.wikia.com/wiki/' + wgSitename + ':Chat Rules" color="#a15b26" target="_blank"><img src="https://images.wikia.nocookie.net/__cb20140914153818/d97/images/9/91/Icon_rules.png" height="12px" class="chattopic-icon" /> chat rules</a> • <a class="topiclink" href="http://' + siteUrl + '.wikia.com/wiki/Special:RecentChanges" color="#a15b26" target="_blank"><img src="https://images.wikia.nocookie.net/__cb20140914153816/d97/images/7/7c/Icon_recent_changes.png" height="12px" class="chattopic-icon" /> recent changes</a> • <a class="topiclink" href="http://' + siteUrl + '.wikia.com/wiki/MediaWiki:Emoticons" color="#a15b26" target="_blank"><img src="https://images.wikia.nocookie.net/__cb20140914153814/d97/images/6/6c/Icon_emoticons.png" height="12px" class="chattopic-icon" /> emoticons</a> • <a class="topiclink" href="http://' + siteUrl + '.wikia.com/wiki/Help:ChatTags" color="#a15b26" target="_blank"><img src="https://images.wikia.nocookie.net/__cb20140914153812/d97/images/3/3a/Icon_chattags.png" height="12px" class="chattopic-icon" /> chattags</a> • <a class="topiclink" href="http://' + siteUrl + '.wikia.com/wiki/Special:MyPage" color="#a15b26" target="_blank"><img src="' + wgAvatarUrl + '" height="12px" class="chattopic-icon" /> my page</a> • <a class="topiclink" href="http://' + siteUrl + '.wikia.com/wiki/Special:Chat?action=purge" color="#a15b26"><img src="https://images.wikia.nocookie.net/__cb20140914153817/d97/images/8/89/Icon_refresh.png" height="12px" class="chattopic-icon" /> refresh</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;color:#337800;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

console.log("Chat header initialized.");
// END Chat header