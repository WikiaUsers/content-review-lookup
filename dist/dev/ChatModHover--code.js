/*
* ChatModHover
* @description relay what usergroup a user is in who have a star next to their name in chat when their name is hovered
* Works for staff, wiki-managers, helpers, SOAP, admin, discussions moderator and chat moderator
* Prioritizes local groups over global (e.g. chat moderator over SOAP) except staff
* @author Ozuzanna
*/

$(function() {

if (chatModHoverLoaded !== true) {

var adminList = [],
threadModList = [],
chatModList = [],
soapList = [],
helperList = [],
wikiManagerList = [],
chatModHoverLoaded = true;

/* Getting list of users */
function getUserGroupList(group,array) {
  $.ajax({
    url: mw.util.wikiScript('api'),
    data: {
      format: 'json',
      action: 'query',
      list: 'allusers',
      augroup: group,
      aulimit: 500,
      cb: new Date().getTime()
    },
    dataType: 'json',
    type: 'POST',
    success: function(d) {
      var allusers = d.query.allusers;
      for (var i in allusers) {
        array.push(allusers[i].name);
      }
    }
  });
}

getUserGroupList("chatmoderator",chatModList);
getUserGroupList("threadmoderator",threadModList);
getUserGroupList("sysop",adminList);
getUserGroupList("wiki-manager",wikiManagerList);
getUserGroupList("helper",helperList);
getUserGroupList("soap",soapList);

function updateHovers() {
  $('.username').each(function() {
    if ($(this).parents().eq(1).attr('id') !== "WikiChatList" || $(this).attr('title'))
      return;
    else if ($(this).parent().hasClass('staff')) /* Staff have their own class in chat so we can use that */
      $(this).attr('title','This user is Fandom Staff');
    else if (adminList.indexOf($(this).text()) !== -1)
      $(this).attr('title','This user is an administrator');
      else if (threadModList.indexOf($(this).text()) !== -1)
      $(this).attr('title','This user is a discussions moderator');    
    else if (chatModList.indexOf($(this).text()) !== -1)
      $(this).attr('title','This user is a chat moderator');
     else if (wikiManagerList.indexOf($(this).text()) !== -1)
      $(this).attr('title','This user is a wiki manager');     
    else if (helperList.indexOf($(this).text()) !== -1)
      $(this).attr('title','This user is a Fandom Helper');
    else if (soapList.indexOf($(this).text()) !== -1)
      $(this).attr('title','This user is SOAP');
  });
  console.log('Chat moderator hovers updated');
}

if (typeof hoverStatus !== "number"){
  hoverStatus = setInterval(function(){updateHovers()}, 60000);
}
else {
  clearInterval(hoverStatus);
  hoverStatus = setInterval(function(){updateHovers()}, 60000);
}

}

});