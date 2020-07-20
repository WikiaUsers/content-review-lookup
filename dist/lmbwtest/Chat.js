/* postMessage function - an API for LMBW developers. Allows accounts to easily send automated messages via JavaScript.*/
function postMessage(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:text}).xport());
  }
}

/* sendMessage function - Same function as postMessage, but compatible with PMs - Written by Drew1200. */
function sendMessage(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    $('#Write textarea').val(text);
    var e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $("#Write textarea").trigger(e);
  }
}

/* Word Filter for Wikia chat - Written by Drew1200. */
window.outputWarning = '';
window.badWords = ["test1", "test2", "bfd", "omfg", "penis", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "dickface", "whore", "cunt", "wtf", "stfu", "piss", "boobs", "tits", "ass", "dyke", "gigolo", "masturbate", "prostitute", "slut", "bs", "lmao"];
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