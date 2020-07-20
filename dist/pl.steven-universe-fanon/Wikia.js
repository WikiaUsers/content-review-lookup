// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
function addMastheadTags() {
    var rights  = {},
        user    = "";
 
    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Projektanci

    rights["BrakNicku"]   = ["Właścicielka", "Technik", "Projektantka", "Grafik"];
    rights["Madziulka200"]         = ["Biurokratka", "Projektantka"];
    rights["Magi45"]              = ["Pomocnik", "Korekty"];
    rights["LUKI MŁODZIAK"]        = ["Zasłużony Dla Wiki"];
    rights["Kregankyro"]            = ["Zasłużony Dla Wiki"];
 
    // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }
    
    if (typeof rights[wgTitle] != "undefined") {
        // Usunięcie poprzednich opisów grup
        $('.UserProfileMasthead .masthead-info span.group').remove();
 
        for( var i=0, len=rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + 
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}

$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});