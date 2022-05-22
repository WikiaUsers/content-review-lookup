/* For the "FanonSubModule" page, used for mass posting on message walls
 * This function deals with the aesthetics and functionality of the mainframe
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

$(document).ready(function () {
 if ( mw.config.get('wgPageName') == "Avatar_Wiki:FanonSubModule" ) {
  var allowCheck;
  var cooldown;
  $.ajax({
    type: "GET",
    url: "https://avatar.fandom.com/api.php",
    data: { action:'query', prop:'revisions', titles:'Avatar_Wiki:FanonSubModule/CheckPage', rvprop:'content' },
    success: function ( data ) {
      var match = data.search( mw.config.get('wgUserName') );
      if ( match == -1 || mw.config.get('wgUserName') == null ) {
        allowCheck = false;
      }
      else {
        allowCheck = true;
        var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var searchTerm = "* '''" + mw.config.get('wgUserName') + "''': On " + days[new Date().getUTCDay()] + ", " + new Date().getUTCDate() + " " + months[new Date().getUTCMonth()] + " " + new Date().getUTCFullYear();
        $.ajax({
          type: "GET",
          url: "https://avatar.fandom.com/api.php",
          async: false,
          data: { action:'query', prop:'revisions', titles:'Avatar_Wiki:FanonSubModule', rvprop:'content' },
          success: function ( data ) {
            if ( data.indexOf(searchTerm) == -1) {
              cooldown = false;
            }
          }
        });
      }
      if ( allowCheck == true && cooldown == false ) {
        var timer;
        $(".subinputbox").html('<input class="usersearchbox" type="text" tabindex="1" value="" placeholder="Username" style="width:102%" dir="ltr">');
        $(".results").html('<select multiple="" size="7" title="Matched users" tabindex="2" style="width:100%" disabled=""></select>');
        $(".endlist").html('<textarea id="endlistmessage" tabindex="3" rows="13" style="resize:none; width:97%" placeholder="i.e User:Example"></textarea>');
        $(".resultsbuttons").html('<input type="button" value="↧" style="height:30px; margin-bottom:4px; margin-left:2px" disabled="disabled">');
        $(".messageform").html('<input type="text" style="width:75%" id="messagetitle" tabindex="4" placeholder="Enter title"><br><textarea id="messagebody" tabindex="5" rows="7" style="resize:none; width:97%" placeholder="Enter message"></textarea><button id="messagePreview" class="preview secondary" disabled="disabled">Preview</button><button id="messageSubmit" style="margin-left:10px;" class="submit" disabled="disabled">Submit</button>');
        $(".usersearchbox").keyup(function() {
          clearInterval(timer);
          timer = setTimeout(function() {
            checkSum();
          }, 500);
        });
        $("#messagebody").keyup(function() {
          var messageValue = $("#messagebody").val();
          if ( messageValue == "" ) {
            $("#messagePreview").prop("disabled", true);
            $("#messageSubmit").prop("disabled", true); //Bookmark for change
          }
          else {
            $("#messagePreview").prop("disabled", false);
            $("#messageSubmit").prop("disabled", false); //Bookmark for change
          }
        });
        $("#messagePreview").click(function() {
          var messageValue = $("#messagebody").val();
          var messageTitle = $("#messagetitle").val();
          var documentHeight = $(document).height();
          $("#messagePreview").prop("disabled", true);
          $.ajax({
            type: "POST",
            url: "https://avatar.fandom.com/wikia.php?controller=WallExternal&method=preview&format=json",
            headers: { accept: 'application/json, text/javascript, */*; q=0.01' },
            data: { body: messageValue, convertToFormat:'' , metatitle: messageTitle },
            success: function ( data ) {
              $("body").append('<section class="modalWrapper preview" id="PreviewWrapper" style="bottom: 25%; left: 22.5%; width: 55%; z-index: 2000000002; position: fixed;"><button class="close wikia-chiclet-button"><img src="https://images.wikia.nocookie.net/__cb62025/common/skins/oasis/images/icon_close.png"></button><h1>Preview</h1><section class="modalContent"><div><div class="WallPreview" style="font-size:13px; border:1px solid #e5dfc6; min-height: 300px; position: relative;"><div class="WikiaArticle" style="width: 590px; padding-top:10px">' + data["body"] + '</div></div><div class="neutral modalToolbar"><a id="close" class="wikia-button secondary">Back</a></div></div></div></section></section><div class="blackout" data-opacity="0.65" style="height: ' + documentHeight + 'px; width: 1263px; z-index: 2000000001; opacity: 0.65; display: block;"></div>');
              $(".msg-title").attr("style","font-weight:bold; font-size:18px;");
              $(".wikia-chiclet-button,.blackout,#close").click(function() {
                $("#PreviewWrapper,.blackout").fadeOut("fast","linear", function () { 
                  $("#PreviewWrapper,.blackout").remove();
                });
                $("#messagePreview").prop("disabled", false);
              });
            }
          });
        });
        $("#messageSubmit").click(function() {
          var messageValue = $("#messagebody").val();
          var messageTitle = $("#messagetitle").val();
          var usersList = $("#endlistmessage").val().split("\n");
          var finalList = usersList.slice(0,50);
          $("#submassform").animate({height:"81px"});
          $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Fanon Mass Subscription Module </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px; padding-left:8px"> <div class="floatleft"><img alt="Information" src="http://i1338.photobucket.com/albums/o690/KettleMeetPot/ajax-loader_zps9261ad29.gif" width="35" height="35" style="margin-top:8px"></div> <div style="margin-left:45px"><big><b>Working:</b></big><br> <p> Do not refresh your web browser or leave the page. Thank you for your patience. </p></div> </td></tr></tbody></table>');
          var token = mw.user.tokens.get( 'csrfToken' );
          for (var i = 0; i < finalList.length; i++) {
            var userToMessage = finalList[i].slice(5);
            $.ajax({
              type: "POST",
              url: "https://avatar.fandom.com/wikia.php?controller=WallExternal&method=postNewMessage&format=json",
              data: { body: messageValue, messagetitle: messageTitle, notifyeveryone:'0', pagenamespace:'1200', pagetitle: userToMessage, token:token },
            });
          }
            $.ajax({
              type: "GET",
              url: "https://avatar.fandom.com/api.php",
              data: { action:'query', prop:'revisions', titles: 'Avatar_Wiki:FanonSubModule', rvprop:'content'},
              success: function( data ) {
                var contentlog = data.split('<span style="color:blue;">&lt;rev xml:space=&quot;preserve&quot;&gt;</span>');
                var content;
                var testerlog = contentlog[1].search("script type");
                if ( testerlog == -1 ) {
                  content = contentlog[1].slice(0,-370).replace(/&amp;quot;/g,'"').replace(/&amp;lt;/g,"<").replace(/&amp;gt;/g,">").replace(/<a href=\"http:\/\/avatar.fandom.com\/wiki\//g,"[").replace(/\">.*\]<\/a>/g,"]");
                }
                else {
                  content = contentlog[1].slice(0,-928).replace(/&amp;quot;/g,'"').replace(/&amp;lt;/g,"<").replace(/&amp;gt;/g,">").replace(/<a href=\"http:\/\/avatar.fandom.com\/wiki\//g,"[").replace(/\">.*\]<\/a>/g,"]]");
                }
                var usersLogger = finalList.join(", ").replace(/User:/g,"");
                var lister = content.split('<!-- Demarcation -->');
                var logger = lister[0] + "\n* '''" + mw.config.get('wgUserName') + "''': On {{subst:" + "#time:l, d F Y}}, at " + "{{subst:" + "#time:H:i}}. '''Message''': '" + messageTitle + ": <i>" + messageValue + "</i>', '''To''': " + usersLogger  + ".\n<!-- Demarcation -->\n}}";
                $.ajax({
                  type: "POST",
                  url: "https://avatar.fandom.com/api.php",
                  data: { action:'edit', title: 'Avatar_Wiki:FanonSubModule', text:logger, bot:'true', summary:'Usage of FanonSubModule: adding entry', token: token },
                  success: function( data ) {
                    $("#submassform").removeAttr("style");
                    $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Fanon Mass Subscription Module </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px; padding-left:8px"> <div class="floatleft"><img alt="Information" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/90px-Information.png"></div> <div style="margin-left:45px"><big><b>Action Complete:</b></big><br> <p>' + mw.config.get('wgUserName') + ', your message has successfully been sent to the following users: ' + usersLogger + '. Due to a cooldown period, you will be able to use the module again in 24 hours. Thank you for using Avatar Wiki' + "'" + 's Fanon Subscription Module!</p></div> </td></tr></tbody></table></div>');
                  }
                });
              }
            });
        });
      }
      else if ( allowCheck == true && cooldown != false ) {
      $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Fanon Mass Subscription Module </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px"> <div class="floatleft"><a href="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/5/54/Information.png" class="image" data-image-name="Information.png"><img alt="Information" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/100px-Information.png" width="100" height="100"></a></div> <big><b>Notice:</b></big><br> <p>Hello ' + mw.config.get('wgUserName') + '. Unfortunately, you have already used the services of the Fanon Subscription Module within the last 24 hours. As this system is limited to a one use per day policy, you will be required to wait until the relevant cooldown time has lapsed. If you have any queries, please contact a local <a href="/wiki/Avatar_Wiki:Administrators" title="Avatar Wiki:Administrators">administrator</a> for further information. </p> </td></tr></tbody></table>');
      }
      else if ( mw.config.get('wgPageName') == "Avatar_Wiki:FanonSubModule" && mw.config.get('wgUserName') != null ) {
        $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Fanon Mass Subscription Module </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px"> <div class="floatleft"><a href="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/5/54/Information.png" class="image" data-image-name="Information.png"><img alt="Information" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/100px-Information.png" width="100" height="100"></a></div> <big><b>Notice:</b></big><br> <p>Hello ' + mw.config.get('wgUserName') + '. Unfortunately, you are not listed on our local <a href="/wiki/Avatar_Wiki:FanonSubModule/CheckPage" title="Avatar Wiki:FanonSubModule/CheckPage">checkpage</a> as a user to be granted access to the Fanon Subscription Module. Please contact a local <a href="/wiki/Avatar_Wiki:Administrators" title="Avatar Wiki:Administrators">administrator</a> for further information. </p> </td></tr></tbody></table>');
      }
      else if ( mw.config.get('wgPageName') == "Avatar_Wiki:FanonSubModule") {
        $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Fanon Mass Subscription Module </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px"> <div class="floatleft"><a href="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/5/54/Information.png" class="image" data-image-name="Information.png"><img alt="Information" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/100px-Information.png" width="100" height="100"></a></div> <big><b>Notice:</b></big><br> <p>Hello anonymous user. Unfortunately, in order to use this service, you must have an account and be listed on our local <a href="/wiki/Avatar_Wiki:FanonSubModule/CheckPage" title="Avatar Wiki:FanonSubModule/CheckPage">checkpage</a> for the Fanon Subscription Module. Please contact a local <a href="/wiki/Avatar_Wiki:Administrators" title="Avatar Wiki:Administrators">administrator</a> for further information. </p> </td></tr></tbody></table>');
      }
    }
  });
 }
});

function checkSum () {
  var value = $(".usersearchbox").val();
  if ( value == "" ) {
    $(".results").html('<select multiple="" size="7" title="Matched users" tabindex="2" style="width:100%" disabled=""></select>');
  }
  else {
    $.ajax({
      type: "GET",
      url: "https://avatar.fandom.com/api.php",
      data: { action:'query', list:'allusers', aufrom: value, aurights:'autoconfirmed', auwitheditsonly:'true', aulimit:'7', format:'wddxfm' },
      success: function ( data ) {
        var rawData = data.split('<span style="color:blue;">&lt;string&gt;</span>');
        var processedData = new Array();
        for (i=0; i < rawData.length; i++) {
          processedData[i] = rawData[i].slice(0,-157);
        }
        $(".results").html('<select multiple size="7" id="activechecksum" title="Matched users" tabindex="2" style="width:100%"><option value="1">'+ processedData[1] +'</option><option value="2">' + processedData[3] +'</option><option value="3">'+ processedData[5] +'</option><option value="4">'+ processedData[7] +'</option><option value="5">'+ processedData[9] +'</option><option value="6">'+ processedData[11] +'</option><option value="7">'+ processedData[13] +'</option></select>');
        $("#activechecksum").dblclick(function () {
          var option = $("#activechecksum > option:selected").html();
          var currentString = $("#endlistmessage").val();
          if ( currentString.length < 8 ) {
            $("#endlistmessage").val("User:"+ option);
          }
          else {
            $("#endlistmessage").val( currentString + "\nUser:" + option);
          }
        });
      }
    });
  }
}

/*
$(document).ready(function () { 
  if ( mw.config.get('wgPageName') == "Special:RecentChanges" ) {
   return;
  }
});
*/