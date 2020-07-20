importScriptPage('RelatedDiscussionsModule/code.js', 'dev'); 


function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    rights["Tigerisnormal"] = ["Rat Fucker", "Avatar Stealer", "Frogs Are Reptiles", "Spaghetti Fucker", "Bitch Boy"];
    rights["Killerface45"] = ["God, over Man, Beast, Machinery, Cosmos, and the Supernatural"];
    rights["Minipop56"] = ["Your Mathematical Lordship", "Carl Friedrich Gauss", "Your Resident Bureaucrat"];
    rights["DudeWithASuit"] = ["Sexy"];
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

importScriptPage("User:Madnessfan34537/multikick.js","cod")