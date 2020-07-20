// 06:49, November 1, 2011 (UTC)

// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
// Modified by Ozuzanna to be more dynamic for default tags

$(function() {
    var rights = {},
        chatMod = "<a href='//halo.wikia.com/wiki/Halo_Alpha:Chat_Policy'><span style='color:white'>Chat Moderator</span></a>",
        checkUser = "<a href='//halo.wikia.com/wiki/Help:User_access_levels#CheckUsers'><span style='color:white'>Check User</span></a>",
        admin = "<a href='//halo.wikia.com/wiki/Halo_Alpha:Administrators'><span style='color:white'>Admin</span></a>",
        VSTF = "<a href='//halo.wikia.com/wiki/Help:VSTF'><span style='color:white'>VSTF</span></a>",
        councilor = "<a href='//halo.wikia.com/wiki/Help:Community_Council'><span style='color:white'>Councilor</span></a>",
        founder = "<a href='//halo.wikia.com/wiki/Halo_Alpha:Administrators'><span style='color:white'><span style='color: white'>Founder</span></a>";
    bot = "<a href='//halo.wikia.com/wiki/Help:User_access_levels#Bots'><span style='color:white'><span style='color: white'>Bot</span></a>";
    rollBack = "<a href='//halo.wikia.com/wiki/Help:User_access_levels#Rollbacks'><span style='color:white'><span style='color: white'>Rollback</span></a>";
    imageControl = "Image Control";
    globalMod = "<a href='//halo.wikia.com/wiki/Help:Global_Discussions_moderators'><span style='color:white'><span style='color: white'>Global Discussions moderator</span></a>";

    // Begin list of accounts given extra user rights icons
    //
    // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
    // There is no need to add users who are solely administrator/chat moderator, as this is covered dynamically (though if they have a global usergroup such as councilor then they should be added here)

    //Bots

    rights["ForeBot"] = [bot, admin];
    rights["Meanders Ahead"] = [bot, admin];
    rights["VektorBot"] = [bot, admin];

    //Chat Moderators

    //Administrators

    rights["T3CHNOCIDE"] = [councilor, admin];
    rights["TheRequiemEmpire"] = [globalMod, councilor, admin];

    //Rollback

    rights["Ajax 013"] = [rollBack];
    rights["Leo Fox"] = [rollBack];
    rights["Vessel Of War"] = [rollBack];

    //Image Control

    // End list of accounts given extra user rights icons


    if (wgPageName.indexOf("Special:Contributions") != -1) {
        newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
        unfinishedTitle = newTitle;

        while (unfinishedTitle.search("_") > 0) {
            unfinishedTitle = unfinishedTitle.replace("_", " ");
        }

        userName = unfinishedTitle;

    } else {
        userName = wgTitle;
        userName.replace("User:", "");
    }

    if (typeof rights[userName] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // add new rights
            $('<span style="margin-left: 10px;" class="tag tag-custom">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});

//***************
// Adds links to usergroups that have default tags
//***************

if ($('.tag').length && !$('.tag-custom').length) {
    $('.tag').each(function() {
        var obj = $(this),
            tag = obj.text();

        function addLink(page) {
            obj.html('<a href="/wiki/' + page + '"><span style="color:white">' + tag + '</span></a>');
        }

        switch (tag) {
            case "Admin":
                addLink("Halo_Alpha:Administrators");
                break;

            case "Chat moderator":
                addLink("Halo_Alpha:Chat_Policy");
                break;

            case "VSTF":
                addLink("Help:VSTF");
                break;

            case "Wikia Star":
                addLink("Homepage:Stars");
                break;

            case "Councilor":
                addLink("Help:Community Council");
                break;

            case "Staff":
                addLink("Help:Staff");
                break;

            case "Helper":
                addLink("Help:User_rights#Helpers");
                break;

            case "Volunteer Developer":
                addLink("Help:User_rights#Volunteer_Developers");
                break;

            case "Authenticated":
                addLink("Help:User_rights#Authenticated");
                break;

            case "Blocked":
                addLink("Special:Log/block?page=" + mw.config.get('wgTitle').replace('Contributions/', '').replace(' ', '_'));
                break;

            case "Global Discussions Moderator":
                addLink("Help:Global_Discussions_moderators");
                break;

            case "Banned From Chat":
                addLink("Special:Log/chatban?page=" + mw.config.get('wgTitle').replace('Contributions/', '').replace(' ', '_'));
                break;

        }
    });
}