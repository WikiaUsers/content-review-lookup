importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('MediaWiki:Common.js');
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

// Adds copyright notice to siderail in Oasis 
importScript('MediaWiki:Wikia.js/copyright.js'); 
// END Adds copyright notice to siderail in Oasis

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
}
$(document).ready(function() {changeChatDesc()});