// ********************************************
// Implement edit restriction on chat feature
// Written by Foodbandlt for Sonic News Network
// ********************************************
 
    window.chatRestr = new Object;
// Disable message (1 = enabled, 0 = disabled)
    window.chatRestr.enableMessage = 1;
 
    // Message that appears. Links cannot be used in this message.
    window.chatRestr.undereditMessage = "¡Hola "+ wgUserName+"! Gracias por querer entrar al chat de Super Mario Wiki. Lamentablemente, necesitas ser un editor activo en el wiki para entrar. Nuestras reglas (que las puedes encontrar en  http://es.mario.wikia.com/wiki/Super_Mario_Wiki:Reglas) dicen que requieres 2 ediciones en páginas para poder entrar en el chat.";
 
 
    // Enable redirect (1 = enabled, 0 = disabled)
    window.chatRestr.enableRedirect = 1;
 
    // Page to redirect to 
    window.chatRestr.redirectPage = "Super_Mario_Wiki:Reglas";
 
$(function(){
 
// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];
 
var exceptionList = ["Videojuego" , "Gamedezyner" , "Bullet_Bot"]; 
 
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
 
      var mainCountRestriction = 2;
      var totalCountRestriction = 2;
 
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
        numberedMainText = 0;
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
        numberedTotalText = 0;
      }
 
      if (typeof alertPopped === "undefined" && (numberedTotalText < totalCountRestriction || numberedMainText < mainCountRestriction)){
        alertPopped = 1;
 
        if (wgPageName == "Especial:Chat" && wgUserName != null){
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
            $('[href="/wiki/Especial:Chat"]').removeAttr("href");
            setTimeout('$(".chat-join a").removeAttr("onclick").click(function() {if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);} if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}}); $(".chat-join button").removeAttr("onclick").click(function() {if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);} if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}});', 500);
          });
        }
      }
    });
  }
}
});
});