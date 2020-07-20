// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // DEIDAD
 rights["DarkHopeless"]				= [Deidad],
 
   //YAMA
 rights["Hyorinmaru634"]		        = [Yama];
 
 // END list of accounts given extra user rights icons
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
// END rigths