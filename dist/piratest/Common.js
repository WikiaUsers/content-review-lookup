/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
   //Bot
 
    rights[""]                 = ["Bot"],
    rights[""]                       = ["Bot"],
    rights[""]                     = ["Bot"],
    rights[""]                       = ["Bot"],
    rights[""]                     = ["Bot"],
    rights[""]                    = ["Bot"],
    rights[""]                   = ["Bot"],
    rights[""]                     = ["Bot"],
    rights[""]               = ["Bot"],
    rights["Wikia"]                        = ["Bot"],
    rights[""]  = ["Bot"],
    rights[String.fromCharCode(8747)]      = ["Bot"],
 
   //Bureaucrat 
 
    rights["Aaron9999"]                      = ["Bureaucrat", "Founder", "POTCOW Staff"],
    rights["Edward Mctimbers"]             = ["Bureaucrat", "POTCOW Staff"],
    rights[""]                    = ["Bureaucrat"],
    rights[""]                      = ["Bureaucrat"],
 
   //Checkuser
 
    rights[""]                       = ["Bureaucrat", "Checkuser"],
    rights[""]                  = ["Bureaucrat", "Checkuser"],
    rights[""]                    = ["Bureaucrat", "Checkuser"],
    rights[""]                  = ["Bureaucrat", "Checkuser"],
 
   //Rollback
 
    rights[""]                     = ["Chat Moderator", "Rollback"],

  // END List of Accounts Given Extra User Rights Icons