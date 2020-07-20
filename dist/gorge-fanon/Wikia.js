// <source lang="JavaScript">
// WRITTEN BY USER:RAPPY_4187

function addMastheadTags() {
    var rights  = {},
        user    = "";
 
    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2
 
    rights["Curiousgorge66"]    = ["Founder of Gorge Fanon", "Admin", "Nickelodeon Fanon"],
    rights["IAmBagel"]      = ["Admin", "Nickelodeon Fanon", "The Bagel Show"],
    rights["PB&Jotterisnumber1"] = ["Admin", "Rollback", "Sophie the Otter", "PB&J Otter"],
    rights["Chaossy"] = ["Admin", "Nickelodeon Fanon", "AniNick"],
    rights["Kayem-san"] = ["Nickelodeon Fanon"],
    rights["EliNinja"] = ["Nickelodeon Fanon", "EliShows"],
    rights[".mynameischrome."] = ["Nickelodeon Fanon", "Chromeyness"],
    rights["Omgitskittykatty"] = ["Nickelodeon Fanon"],
    rights["HomestarSB9"] = ["Nickelodeon Fanon"],
    rights["KingKool720"] = ["Grand Theft Auto Fans"],
    rights["SpongeTechX"] = ["Admin", "Nickelodeon Fanon"],
    rights["Derphox"] = ["Admin", "Nickelodeon Fanon"],
    rights["That Guy in the hat"] = ["Nickelodeon Fanon"],
    rights["Princess Dynasti"] = ["Nickelodeon Fanon"],
    
    rights["Non-existent User"] = ["Do not remove this line"];

    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { 
        user = wgTitle; 
    }
 
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

// </source>


importScriptPage('User:Monchoman45/ChatHacks.js', 'c');