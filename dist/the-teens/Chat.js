// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#33D6E8">Welcome to The Teens Wiki Chat, Have a good time and please remember to follow the <a href="/wiki/The_Teens_Wiki:Chat_Policy" target="_blank">Chat Policy</a></font>';

WikiaEmoticons.doReplacements=function(text,emoticonMapping){$().log("Processing any emoticons... ");var imgUrlsByRegexString=emoticonMapping.getImgUrlsByRegexString();for(var regexString in imgUrlsByRegexString){if(regexString=='')continue;imgSrc=imgUrlsByRegexString[regexString];imgSrc=imgSrc.replace(/"/g,"%22");regexString=regexString.replace(/>/g,"&gt;");regexString=regexString.replace(/</g,"&lt;");var numIters=0;var origText=text;do{var regex=new RegExp("(^| )("+regexString+")([^/]|$)","gi");var emoticon=" <img src=\""+imgSrc+"\" alt=\"$2\" title=\"$2\"/> ";var glyphUsed=text.replace(regex,'$2');glyphUsed=glyphUsed.replace(/"/g,"&quot;");text=text.replace(regex,'$1'+emoticon+'$3');}while((origText!=text)&&(numIters++<5));}
$().log("Done processing emoticons.");return text;}
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// END Chat topic

// Chat options 
// Written by Callofduty4 and Madnessfan34537
importScriptPage('MediaWiki:Chat.js/options.js','cod');

// END Chat options

/*Mark admins*/
// Written by administrators of the Runescape wiki, who also kindly gave permission for use. 
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/RainbowDashful|Meowingtons Brony/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000)