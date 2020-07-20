// CODE WRITTEN BY USER:RAPPY_4187
// http://rappy.wikia.com/wiki/MediaWiki:Wikia.js

function addMastheadTags() {
  var rights = {};

  // LIST OF USERS
  rights["Leviathan 89"]        = ["Helper","VSTF"],
  rights["Cresh."]    = ["Helper"],
  rights["Paolino Paperino"]    = ["Helper"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
       }
    }
}

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});