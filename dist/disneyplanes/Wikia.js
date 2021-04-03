// ********************************************
// Implement edit restriction on chat feature
// Written by TheBABAMStudios for Planes Wiki
// ********************************************
 
window.chatRestr = {
// Disable message (1 = enabled, 0 = disabled)
    enableMessage: 1,
 
    // Message that appears. Links cannot be used in this message.
    undereditMessage: "Hi "+ wgUserName+"! Thanks for trying to use the Planes Wiki chat room but however according to our wiki's policy you may not use the chat with fewer than 10 edits. If you still can't continue and you have over than 10 edits please contact any administrator on Planes Wiki.
 
 
    // Enable redirect (1 = enabled, 0 = disabled)
    enableRedirect: 1,
 
    // Page to redirect to 
    redirectPage: "Planes Wiki:Policy"
}
 
$(function(){
 
// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];
 
var exceptionList = ["TheBABAMStudios", "Lightening McQueen"]; 
 
var userObject = new Object;
$.getJSON("/api.php?action=query&meta=userinfo&uiprop=groups&format=json", function(result){
userObject.name = result.query.userinfo.name;
userObject.groups = result.query.userinfo.groups;
 
 
 
 
 
if (exceptionList.indexOf(userObject.name) == -1 && userObject.groups.indexOf("vstf") == -1 && userObject.groups.indexOf("staff") == -1){
    $.get("/wiki/Special:Editcount/"+userObject.name, function(result){
 
      // To change the number of edits required to enter the chat, change the numbers below.  
      // Be sure to leave the semi-colon intact.
      // To disable the restriction, change both of these to 0. 
 
      var mainCountRestriction = 10;
      var totalCountRestriction = 10;
 
      regExpNumberIsolation = /\d/g ;
      regExpSearch = /\(Main\)/ ;
      mainPos = result.search(regExpSearch);
      if (mainPos != -1){
        slicedMainText = result.slice(mainPos+36, mainPos+41);
 
        var numberedMainText = slicedMainText.match(regExpNumberIsolation).toString();
		numberedMainText = numberedMainText.replace(/,/g, "");
 
      }else{
        numberedMainText = 0;
      }
 
      totalPos = result.search("All wikis");
      if (totalPos != -1){
        slicedTotalText = result.slice(totalPos+52, totalPos+57);
 
        var numberedTotalText = slicedTotalText.match(regExpNumberIsolation).toString();
		numberedTotalText = numberedTotalText.replace(/,/g,"");
      }else{
        numberedTotalText = 0;
      }
 
      if (numberedTotalText < totalCountRestriction || numberedMainText < mainCountRestriction){
 
        if (document.location.href.indexOf("Special:Chat") != -1 && typeof(userObject.name) == "string"){
          if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);}
          window.close();
          if (window.closed == false){
            if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}else{window.location.replace(wgServer);}
          }
        }else{
          $(document).ready(function() {
            $('[data-canonical="chat"]').click(function (){
              if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);}
              if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}
            }).removeAttr("data-canonical").css("cursor", "pointer");
            $('[href="/wiki/Special:Chat"]').removeAttr("href");
            setTimeout('$(".chat-join a").removeAttr("onclick").click(function() {if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);} if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}}); $(".chat-join button").removeAttr("onclick").click(function() {if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);} if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}});', 500);
          });
        }
      }
    });
}
});
});