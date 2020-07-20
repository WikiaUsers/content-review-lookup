    // ********************************************
    // Implement edit restriction on chat feature
    // Written by Foodbandlt for Sonic News Network
    // ********************************************
     
        window.chatRestr = new Object;
    // Disable message (1 = enabled, 0 = disabled)
        window.chatRestr.enableMessage = 1;
     
        // Message that appears. Links cannot be used in this message.
        window.chatRestr.undereditMessage = "Hi "+ wgUserName+"! Thanks for trying to use the Gravity Falls chat room. However, the chat room is only for active editors of the Gravity Falls wiki, and you haven't yet made the minimum number of edits required to use it. Our chat policy requires that you make at least 1 edit. Intentionally poor edits may result in a warning and/or temporary ban. We apologize for this inconvenience and hope to see you in the chat soon.";
     
     
        // Enable redirect (1 = enabled, 0 = disabled)
        window.chatRestr.enableRedirect = 0;
     
        // Page to redirect to
        window.chatRestr.redirectPage = "Special:WikiActivity";
     
    $(function(){
     
    // A list of exceptions to this edit restriction.  
    // Enclose separate usernames inside of quotations, and separate them with commas.
    // i.e. ["username1", "username2"];
     
    var exceptionList = [];
     
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
     
          var mainCountRestriction = 0;
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
            numberedMainText = 0;
          }
     
          totalPos = result.search(">All wikis");
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
     
            if (wgPageName == "Special:Chat" && wgUserName != null){
              if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);}
            }
          }
        });
      }
    }
    });
    });