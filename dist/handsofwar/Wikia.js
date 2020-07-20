// Written by RAPPY 4187; Aion Wiki

$(function() {
 var rights = {};
 var adminTag = "<a href='Hands of War Wiki:Administrators'><span style='color:black'>Administrator</span></a>";
 var cratTag = "<a href='Hands of War Wiki:Administrators'><span style='color:black'>Bureaucrat</span></a>";

 rights["Super Saiyan 7 Somebody"]      = [adminTag, cratTag];
 
if (wgPageName.indexOf("Special:Contributions") != -1){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
userName.replace("User:", "");
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.tag').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});