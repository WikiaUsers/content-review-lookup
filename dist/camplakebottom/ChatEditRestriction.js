// Implement edit restriction on chat feature
// Written by Foodbandlt for Sonic News Network

    window.chatRestr = new Object;
// Disable message (1 = enabled, 0 = disabled)
    window.chatRestr.enableMessage = 1;

    // Message that appears. Links cannot be used in this message.
    window.chatRestr.undereditMessage = "Hi "+ wgUserName+"! Thanks for trying to enter Camp Sunny Smiles. However, the camp is only for active campers of the wiki, and you have not yet made the minimum number of edits required to use it. Our chat rules (which can be found at http://camplakebottom.wikia.com/wiki/Camp_Lakebottom_Wiki:Rules#Chat) requires that you make at least 1 edits to be able to enter the chat. We apologize for this inconvenience and hope to see you at the camp soon.";

    // Enable redirect (1 = enabled, 0 = disabled)
    window.chatRestr.enableRedirect = 1;

    // Page to redirect to 
    window.chatRestr.redirectPage = "Camp_Lakebottom_Wiki:Rules#Chat";
 
$(function(){

// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];

var exceptionList = ["Foodbandlt"]; 

var userObject = new Object;
$.getJSON("/api.php?action=query&meta=userinfo&uiprop=groups&format=json", function(result){
userObject.name = result.query.userinfo.name;
userObject.groups = result.query.userinfo.groups;

if (exceptionList.indexOf(userObject.name) == -1 && userObject.groups.indexOf("vstf") == -1 && userObject.groups.indexOf("staff") == -1){
  if (typeof alertPopped === "undefined"){
    $.get("/wiki/Special:Editcount/"+userObject.name, function(result){

      // To change the number of edits required to enter the chat, change the numbers below.  
      // Be sure to leave the semi-colon intact.
      // To disable the restriction, change both of these to 0. 

      var mainCountRestriction = 1;
      var totalCountRestriction = 1;

      regExpNumberIsolation = /\d/g ;
      regExpSearch = /\(Main\)/ ;
      mainPos = result.search(regExpSearch);
      if (mainPos != -1){
        slicedMainText = result.slice(mainPos+36, mainPos+41);
 
        var numberedMainText = slicedMainText.match(regExpNumberIsolation).toString();
        if (numberedMainText.search(",") != -1){
          while (numberedMainText.indexOf(",") > -1){
            var numberedMainText = numberedMainText.replace(",","");
          }
        }
      }else{
        numberedMainText = 1;
      }
 
      totalPos = result.search("All wikis");
      if (totalPos != -1){
        slicedTotalText = result.slice(totalPos+52, totalPos+57);
 
        var numberedTotalText = slicedTotalText.match(regExpNumberIsolation).toString();
        if (numberedTotalText.search(",") != -1){
          while (numberedTotalText.indexOf(",") != -1){
            var numberedTotalText = numberedTotalText.replace(",","");
          }
        }
      }else{
        numberedTotalText = 1;
      }
 
      if (typeof alertPopped === "undefined" && (numberedTotalText < totalCountRestriction || numberedMainText < mainCountRestriction)){
        alertPopped = 1;

        if (wgPageName == "Special:Chat" && wgUserName != null){
          if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);}
          window.close();
          if (window.closed == false){
            if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}else{window.location.replace(wgServer);}
          }
        }else if (wgUserName != null){
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
}
});
});