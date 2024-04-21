/* Word Filter for Wikia chat - Written by Drew1200. */
window.outputWarning = '';
window.badWords = ["test1", "test2", "bfd", "omfg", "penis", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "dickface", "whore", "cunt", "wtf", "vagina", "piss", "tits", "damn", "masturbate", "slut", "lmao"];
$('#Write textarea').keydown(function(e) {
    if(e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
      for(var i = 0; i < window.badWords.length; i++) {
        window.outputWarning = $('#Write textarea').val();
      }
      $("div.Chat>ul").append("<li class='inline-alert'>WARNING: The message you just posted contains words marked as inappropriate. Are you sure you want to send this message?<span id='temporary'> ~<br><br>~ <span onclick='ignoreWarning();' style='color:blue;cursor:pointer;'>Yes</span> or <span onclick='endMessage();' style='color:blue;cursor:pointer;'>Cancel</span><span></li>");
      $(this).unbind('keypress').val('');
    }
})
 
function ignoreWarning() {
  postMessage(window.outputWarning);
  $("#temporary").remove(); 
}
 
function endMessage() { 
  $('#temporary').remove();
}
 
function wordFilter() {
  for(var i = 0; i < window.badWords.length; i++) {
    if($('#Write textarea').val().toLowerCase().indexOf(window.badWords[i]) !== -1) {
      return true;
    }
  }
}