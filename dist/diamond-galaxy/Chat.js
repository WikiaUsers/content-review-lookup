//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Diamond Galaxy Wiki Chat! Please make sure to read the <a href="/wiki/Rules" target="_blank" title="Rules"><u>chat guidelines</u></a>.
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
window.ignoreBot = "FlutterBot";
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// ****************
 
// Change the document title for the chat page
 
document.title = "Chat - " + mw.config.get('wgSiteName');
 
// Function for message input
$('[name="message"]').keypress(function(e) {
  if (e.which == 13) {
 
    var message = this.value;
 
    // Stop posting of whitespace
    if (!message.trim()) {
      e.preventDefault();
      $('[name="message"]').val('').removeAttr('disabled').focus();  
    }
  }
})