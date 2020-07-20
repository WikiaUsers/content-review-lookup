 // Written by Rappy_4187
 // Modified for this wiki use by Drek'TharSuperSword

function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons

    rights["Milesprower2"]                       = ["Founder"];
    rights["Drek'TharSuperSword"]                = ["Administrator", "Maintenance User"];
    rights["Wikia"]                              = ["Welcome Bot"];
    rights["WikiaBot"]                           = ["Bot"];
    rights["BLACK OUT"]                          = ["Bureaucrat"];
    rights["Brainulator9"]                       = ["Bureaucrat"];
    rights["HyperKing Hesham"]                   = ["Rollback"];
    rights["Iamarepeater"]                       = ["Rollback"];
    rights["BananaGummyBear64"]                  = ["Rollback"];
    rights["Pikachu the Cattail Lover"]          = ["Rollback"];
    rights["Yaseen.ibrahim.90"]                  = ["Rollback"];
    



  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = 
wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + 
rights[user][i] +
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