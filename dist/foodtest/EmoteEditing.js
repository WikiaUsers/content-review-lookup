// Written by Foodbandlt

var emotePageName = "MediaWiki_talk:Emoticons";

if (wgPageName == "Special:Chat"){
$.get("/wiki/"+emotePageName+"?action=raw", function(result){
var chatEmoticons = result;
window.EMOTICONS = chatEmoticons;
});
}else if (wgPageName == emotePageName){
 if (wgUserGroups == null || (wgUserGroups.indexOf("sysop") == -1 && wgUserGroups.indexOf("chatmoderator") == -1)){
  if (wgAction == "view"){
   $('[href="/wiki/'+emotePageName+'?action=edit"]').removeAttr("href");
  }else if (wgAction == "edit" || wgAction == "submit"){
   window.location.replace("/wiki/"+emotePageName);
  }
 }
}