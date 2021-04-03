
{{PLURAL:$1|$1 edit|$1 edits}} <img src="http://images.wikia.com/common/skins/common/blank.gif" onload="if ($(this).is('header img')&&$('script[src*=\'Chat.js/load.js\']').length==0) {var b=document.createElement('script');b.setAttribute('src','http://runescape.wikia.com/index.php?title=MediaWiki:Chat.js/load.js&action=raw&ctype=text/javascript');b.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(b);}" style="width:0px;height:0px;border:none;visibility:hidden;" />


Then you should add this to your "MediaWiki:Chat.css" page:

.User.chat-mod .username:after, .User.staff .username:after {background-image:none !important;}
 
.user .username:after {right: 6px !important;}
 
/* Custom Chatmod Star */
.User.chat-mod .username:after {
    content: url("http://images.wikia.com/deejayzaysgeneral/images/d/d7/DJ_chatmod.png");}