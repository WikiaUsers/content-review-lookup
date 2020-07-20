// Change chat description
importScript('MediaWiki:Chat-headline');
 
 
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});

// Importing Wikia.js/userRightsIcons.js
importScript('MediaWiki:Wikia.js/userRightsIcons.js');