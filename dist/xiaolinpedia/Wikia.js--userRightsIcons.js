// 07:52, January 12, 2013 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

$(function() {
  var rights = {};

  // BEGIN List of Accounts Given Extra User Rights Icons

    rights["Ricky Spanish"]      = ["Xiaolin Grand Master","Walrus"],
    rights["RockLepus145ES"]     = ["Xiaolin Apprentice"],
    rights["LevenThumps"]        = ["Xiaolin Master"],
    rights["TrueThespian"]       = ["Xiaolin Dragon"],
    rights["Abce2"]              = ["Xiaolin Apprentice"],
    rights["Ezio Editore da California"]  = ["Xiaolin Dragon"];

  // END List of Accounts Given Extra User Rights Icons

  // BEGIN Script to Remove Old Rights Icons & Insert New

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

}else{
userName = wgTitle;
userName.replace("Message Wall:", "");
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

// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

// </source>