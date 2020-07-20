// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">

// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4

$(function() {
 var rights = {};

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

 
rights["Itsuka"]                               = ["<a href=\" http://sengokubasara.wikia.com\"><span style=\" color:white;\">Sun's Shadow</span></a>"];
 rights["Tatzelwyrm"]        = ["<a href=\" http://sengokubasara.wikia.com\"><span style=\" color:white;\">Shadow's Light</span></a>"];
 
 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

if (wgPageName == "Special:Contributions"){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;

while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}

userName = unfinishedTitle;

}else{
userName = wgTitle;
}

 if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>