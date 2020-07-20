// 12:24, January 1, 2016 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187
// Coding tidied by User:Cblair91 (June 2014)
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
    var rights = {};

    // BEGIN List of Accounts Given Extra User Rights Icons
    rights["BackupChatBot"]           = ["Globally Blocked"],
    rights["Cblair91"]                = ["Globally Blocked"],
    rights["Curiouscrab"]             = ["Administrator"],
    rights["BiggestThomasFan"]        = ["Moderator","Rollbacker","Auto-patrol"],
    rights["Dinoguy1000"]             = ["Advisor"],
    rights["ElsbridgeStationFan1995"] = ["Moderator","Rollbacker","Auto-patrol"],
    rights["FlyingDuckManGenesis"]    = ["Auto-patrol"],
    rights["HottieBottie"]            = ["Globally Blocked"],
    rights["Original Authority"]      = ["Auto-patrol"],
    rights["PB&Jotterisnumber1"]      = ["Moderator","Rollbacker","Auto-patrol"],
    rights["Rider ranger47"]          = ["Administrator","Wikia Star","Councillor"],
    rights["SpikeToronto"]            = ["Bureaucrat","Administrator","Councilor","Head Minion"],
    rights["SpikeTorontoAWB"]         = ["AWB Bot"],
    rights["SpikeTorontoTEST"]        = ["Admin Monobook Test Account"],
    rights["SpikeTorontoTEST2"]       = ["Admin Oasis Test Account"],
    rights["TwoTailedFox"]            = ["Wikia Star","Councillor","Advisor"],
    rights["TyBot"]                   = ["Admin Bot"],
    rights["UltimateSupreme"]         = ["Wikia Star","Auto-patrol"],
    rights["WelcomeToScratchpad"]     = ["Globally Blocked"];
    // END List of Accounts Given Extra User Rights Icons

    // BEGIN Script to Remove Old Rights Icons & Insert New

    if(wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else {
        var user = wgTitle;
    }

    if(typeof rights[user] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for(var i = 0, len = rights[user].length; i < len; i++) {
            // add new rights
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
              '</span>').appendTo('.masthead-info hgroup');
        }
    }
    // END Script to Remove Old Rights Icons & Insert New
};

$(function() {
    if($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});

// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

// </source>