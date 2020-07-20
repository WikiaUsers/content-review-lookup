/* Chat Options - Taken from Dev */
importScriptPage('MediaWiki:ChatOptions.js');

importScriptPage('MediaWiki:ChatParty.js');

/* Chat Skins - by Seaside98 */
importScriptPage('MediaWiki:ChatSkins.js');

/*function sendMessage(){inputValue=$('#Write textarea').val();if(inputValue!=''){mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:inputValue}).xport());$('#Write textarea').val('');$('#Write input[type="submit"]').attr('enabled','enabled');console.log('Message sent!');};};$('#Write input[type="submit"]').show().attr({'value':'Send','enabled':'enabled'}).on('click',sendMessage);$('#Write textarea').keyup(function(){if($('#Write textarea').val().length==0){$('#Write input[type="submit"]').attr('enabled','enabled');}else{$('#Write input[type="submit"]').removeAttr('enabled');};});*/


/* Developer Chat Tools - Written by Drew1200. */
$('#Write textarea').keydown(function(e) {
  if(e.keyCode == 13 && $('#Write textarea').val().indexOf("./") !== -1)
  {
    var output = $ ('#Write textarea').val().replace(/.\//, "");
    var hacks = false;
    switch(output) {
      case "hacks":
        if(hacks === false) {
          importScriptPage("MediaWiki:ChatHacks.js");
          hacks = true;
        }
        break;
      case "help":
        inlineAlert("~help~");
        break;
      case "log":
        console.log("log");
        if(hacks === false) {
          importScriptPage('MediaWiki:ChatHacks.js');
          hacks = true;
        }
        importScriptPage('User:Joeytje50/ChatLogger.js', 'runescape');
      default:
        eval(output);
        break;
    }
    $(this).unbind('keypress').val('');
  }
});
console.log("Developer Tools initiated successfully.");