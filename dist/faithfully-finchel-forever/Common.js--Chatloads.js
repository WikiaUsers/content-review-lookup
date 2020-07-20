/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************************/
/* Thank you User:Spottedstar from Kungfupanda wiki and The Glee Project Wiki */
/****************************************************/
 
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