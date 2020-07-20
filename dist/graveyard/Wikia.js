// add Notice tab

if (!window.NoticeTab) {
   addOnloadHook(addNoticeTab);
}
 
var NoticeTab = true;

function userIsInGroup(group) {
   if (wgUserGroups) {
      if (!group || group.length == 0) {
         group = '*';
      }
      for(var i in wgUserGroups)
         if (wgUserGroups[i]==group) return true;
   }
   return false;
}
 
function addNoticeTab () {

   var theText = 'Notices';

   if (userIsInGroup('bureaucrat') || userIsInGroup('sysop') || userIsInGroup('chatmoderator') || userIsInGroup('patroller') || userIsInGroup('rollback')) {
      if(skin == 'oasis') {
         if (wgNamespaceNumber == 2 || wgNamespaceNumber == 3 || wgNamespaceNumber == 500) {
            $('<li data-id="'+theText+'"><a href="/wiki/User_talk:'+encodeURIComponent(wgTitle)+'/'+theText+'" rel="nofollow" title="'+theText+'"">'+theText+'</a></li>').appendTo('#WikiaUserPagesHeader > .tabs-container > .tabs');
         }
         else if (wgNamespaceNumber == -1) {
            var url = window.location.pathname;
            var UserName = url.substring(url.lastIndexOf('/')+1);
            $('<li data-id="'+theText+'"><a href="/wiki/User_talk:'+UserName+'/'+theText+'" rel="nofollow" title="'+theText+'"">'+theText+'</a></li>').appendTo('#WikiaUserPagesHeader > .tabs-container > .tabs');
         }
      }
   }
}

if (wgNamespaceNumber == 3) {
 
   var url = window.location.pathname;
   var PageName = url.substring(url.lastIndexOf('/')+1);
 
   if (PageName == 'Notices') {
      if (userIsInGroup('bureaucrat') || userIsInGroup('sysop') || userIsInGroup('chatmoderator') || userIsInGroup('patroller') || userIsInGroup('rollback')) {}
      else
      {
         $("a[id='ca-addsection']").removeAttr("href").attr("title", "This page is for administrative use only").css("color", "#D9D9D9");
         $("li").has("a[id='ca-edit']").remove();
         $("li").has("a[id='ca-move']").remove();
      }
   }
}