var chatTopic = '<font color="white">GTA Myths Wiki chat</font><br /><a href="/wiki/GTA_Myths_Wiki:Chat_Rules" target="blank" title="GTA Myths Wiki Chat" style="position:relative;text-decoration:underline;">Chat Rules</a> • <a href="/wiki/GTA_Myths_Wiki:Staff" target="blank" title="GTA Myths Wiki:Chat" style="position:relative;text-decoration:underline;">Staff</a>';

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;align:center">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});