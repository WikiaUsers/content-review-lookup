var chatTopic = 'Welcome to The Elder Scrolls Chat<br><a href="/wiki/The_Elder_Scrolls_Wiki:Chat#Grounds_for_blocking" target="_blank" title="Elder Scrolls Wiki:Chat" style="position:relative;text-decoration:underline;">Chat rules</a> • <a href="/wiki/The_Elder_Scrolls_Wiki:Staff" target="_blank" title="Elder Scrolls Wiki:Chat" style="position:relative;text-decoration:underline;">Moderators</a> • <a href="http://www.wikia.com/Terms_of_Use" title="Elder Scrolls Wiki:Chat" target="_blank" style="position:relative;text-decoration:underline;">Terms of Use</a>';
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});

// Import Chat features
importArticles({
    type    : "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        "u:dev:!mods/code.js"
    ]
});

//Adding username-id to chat header as CSS-hook
$('.ChatHeader .User').attr('id', 'user-'.concat(wgUserName));

$(document).ready(function() {
    var dt = new Date();
    if (dt.getDate() === 1 && dt.getMonth() === 3) {
        $("img").each(function(){$(this).attr("src", "https://vignette.wikia.nocookie.net/central/images/1/15/Parrot.gif");});
        //Refresh upon new message
        window.mainRoom.socket.bind('chat:add', function(message) {
            $("img").each(function(){$(this).attr("src", "https://vignette.wikia.nocookie.net/central/images/1/15/Parrot.gif");});
        });
    }
});