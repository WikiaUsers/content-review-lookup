// Last updated: 01:07, April 6, 2019 (UTC)
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki

$(function() {
    var rights = {},
        userName = "",
        checkUser = "<a href='/wiki/Help:Checkuser'><span style='color:white'>Check User</span></a>",
        founder = "Founder",
        cratTag = "<a href='/wiki/Project:Administrators#Bureaucrats'><span style='color:white'>Bureaucrat</span></a>",
        adminTag = "<a href='/wiki/Project:Administrators#Administrators'><span style='color:white'>Administrator</span></a>",
        chatMod = "<a href='/wiki/Project:Administrators#Chat_Moderators'><span style='color:white'>Chat Moderator</span></a>",
        rollBack = "<a href='/wiki/Help:Rollback'><span style='color:white'>Rollback</span></a>",
        botTag = "<a href='/wiki/Help:Bots'><span style='color:white'>Bot</span></a>",
        councilTag = "<a href='http://community.wikia.com/wiki/Help:Community_Council'><span style='color:white'>Councilor</span></a>";

    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // BUREAUCRATS
    rights["Luke0Skywalker"] = [adminTag, cratTag]

    // ADMINS
    rights["RyaNayR"] = [adminTag],
    rights["Queen of Ooo 1216"] = [adminTag],
    rights["SwegWrestlur"] = [adminTag],

    // CHAT MODERATORS
    rights["CHolt"] = [chatMod],
    rights["AcePhoenix 007"] = [chatMod],
    rights["DarlingVanilla"] = [chatMod],
    rights["Gameuser10"] = [chatMod],

    // BOTS
    rights["Decembirth"] = [botTag],
    rights["Flambot"] = [botTag],
    rights["Bellamybot"] = [botTag],
    rights["TyBot"] = [botTag],
    rights["QATestsBot"] = [botTag],
    rights["Wikia"] = [botTag],
    rights["WikiaBot"] = [botTag],

    // ROLLBACK
    rights["Animaltamer7"] = [rollBack],

    // FOUNDER
    rights["Tavisource"] = [founder, adminTag, cratTag, councilTag];

    // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    if (wgCanonicalSpecialPageName == "Contributions") {
        userName = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else { userName = wgTitle; }

    if (typeof rights[userName] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // add new rights
            $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});