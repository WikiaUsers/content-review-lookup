importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});

importScriptPage("ChatOptions/code.js", "dev");
//Clear chat
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button" style="width:90px;">Xoá màn hình</a></div>').prependTo('.Rail');
    }
}
function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}

window.onload = addClearChatText();

// Chat Header
// Credit to Runescape Wiki
var chatTopic = '<a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emoticons" style="position:relative;">Biểu tượng cảm xúc</a> • <a href="/wiki/Project:Chat/Logs" target="_blank" title="Chat Logs" style="position:relative;">Lịch sử chat</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

//Bộ gõ tiếng Việt
if ((mediaWiki.config.get('wgPageName') !== 'Mainpage') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1202 || mediaWiki.config.get('wgNamespaceNumber') === 1200 || mediaWiki.config.get('wgNamespaceNumber') === 1201 || mediaWiki.config.get('wgNamespaceNumber') === 2000)) {
    impart('MediaWiki:AVIM.js');
    impart('MediaWiki:AVIM_portlet.js');
}
//Chat Style
importArticles({
    type: "style",
    articles: "MediaWiki:ModifiedChat.css"
});

//Replace picture URL with picture
/*By AnimatedCartoons*/
var chatTopic2 = 'Nhận ảnh từ URL: <input type="checkbox" id="imgtoggle" onclick="OnChangeCheckbox (event)">'
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chatTopic2" style="width:100%; text-align:right; position:absolute; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-top: 20px; margin-left: -160px;" title="Chỉ hỗ trợ định dạng .jpg, .jpeg, .png, .gif, .bmp, và .svg. Chức năng này hiện còn nhiều hạn chế, không thể nhận ảnh từ một vài tên miền.">'+chatTopic2+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

function Init () {
    var checkbox = document.getElementById ("imgtoggle");
    if (checkbox.addEventListener) {
        checkbox.addEventListener ("CheckboxStateChange", OnChangeCheckbox, false);
    }
}
function OnChangeCheckbox (event) {
    var checkbox = event.target;
    if (checkbox.checked) {
        setInterval(function () {
            "use strict";
            var $jpg = $('.Chat .message a[href$=".jpg"]').text(),
        $jpeg, $png, $gif, $bmp, $svg;
        $('.Chat .message a[href$=".jpg"]').replaceWith('<img src="' + $jpg + '" />');
        $jpeg = $('.Chat .message a[href$=".jpeg"]').text();
        $('.Chat .message a[href$=".jpeg"]').replaceWith('<img src="' + $jpeg + '" />');
        $png = $('.Chat .message a[href$=".png"]').text();
        $('.Chat .message a[href$=".png"]').replaceWith('<img src="' + $png + '" />');
        $gif = $('.Chat .message a[href$=".gif"]').text();
        $('.Chat .message a[href$=".gif"]').replaceWith('<img src="' + $gif + '" />');
        $bmp = $('.Chat .message a[href$=".bmp"]').text();
        $('.Chat .message a[href$=".bmp"]').replaceWith('<img src="' + $bmp + '" />');
        $svg = $('.Chat .message a[href$=".svg"]').text();
        $('.Chat .message a[href$=".svg"]').replaceWith('<img src="' + $svg + '" />');
        document.getElementById("imgtoggle").disabled=true;
    }, 1);
    }
}