importArticles({
    type: "style",
    articles: [
        'MediaWiki:CustomDiscordWidget.css'         //CustomDiscordWidget.js
    ]
});

/* retrieve json file */
$.getJSON("https://discordapp.com/api/servers/325702990898003969/widget.json", function(json) {
    
var countmembers = json.members.length; //online users number


    /* WIDGET STRUCTURE CREATION  */

    var widgContainer = document.createElement('div');
    $(widgContainer).attr('id', 'widgetcontainer');
        var discWidg = document.createElement('div');
        $(discWidg).attr('id', 'discord-widget')
                   .appendTo(widgContainer);
            var widgThemeDark = document.createElement('div');
            $(widgThemeDark).addClass('widget widget-theme-dark')
                            .appendTo(discWidg);
                var widgHead = document.createElement('div');
                $(widgHead).addClass('widget-header')
                           .appendTo(widgThemeDark);
                    var disclogo = document.createElement('a');
                    $(disclogo).addClass('widget-logo')
                               .attr("href", "https://discordapp.com")
                               .attr("target", "_blank")
                               .appendTo(widgHead);
                    var widgHeadCount = document.createElement('span');
                    $(widgHeadCount).addClass('widget-header-count')
                                    .html("<strong>" + countmembers + "</strong> Membros Online")
                                    .appendTo(widgHead);
                var widgBody = document.createElement('div');
                $(widgBody).addClass('widget-body')
                           .appendTo(widgThemeDark);
                    var chaContainer = document.createElement('div');
                    $(chaContainer).attr('id', 'channel-container')
                                   .appendTo(widgBody);
                        var widgCha = document.createElement('div');
                        $(widgCha).addClass('widget-channel')
                                  .appendTo(chaContainer);
                            var widgChaName = document.createElement('div');
                            $(widgChaName).addClass('widget-channel-name')
                                          .text("Dax Comunidade Wiki PT-BR")
                                          .appendTo(widgCha);
                            var emptyChaName = document.createElement('div');
                            $(emptyChaName).attr('id', 'empty-in-channel-name')
                                           .appendTo(widgCha);
                    var membContainer = document.createElement('div');
                    $(membContainer).attr('id', 'members-container')
                                    .appendTo(widgBody);
                        var widgMembOnline = document.createElement('div');
                        $(widgMembOnline).addClass('widget-members-online')
                                         .text("Membros Online")
                                         .appendTo(membContainer);
                        var widgAdminOnline = document.createElement('div');
                        $(widgAdminOnline).addClass('widget-admins-online')
                                          .text("Administradores")
                                          .appendTo(membContainer);
                        var widgModOnline = document.createElement('div');
                        $(widgModOnline).addClass('widget-mods-online')
                                        .text("Moderadores")
                                        .appendTo(membContainer);
                        var userlist = document.createElement('div');
                        $(userlist).attr('id', 'userlist')
                                   .text("Usuários")
                                   .appendTo(membContainer);
                var widgFooter = document.createElement('div');
                $(widgFooter).addClass('widget-footer')
                             .appendTo(widgThemeDark);
                    var invitetext = document.createElement('span');
                    $(invitetext).addClass('widget-footer-info')
                                 .text("Free voice chat from Discord")
                                 .appendTo(widgFooter);
                    var invitelink = document.createElement('a');
                    $(invitelink).addClass('widget-btn-connect')
                                 .attr("href", "https://discord.gg/yRrp4cw")
                                 .attr("target", "_blank")
                                 .text("Conectar")
                                 .appendTo(widgFooter);


    /* WIDGET POPULATION*/

    /* 
    --- Admins IDs ---
    Kyle:            235207667889471489
    Lwks:            298515033732939777
    Dioniso:         283130746431078400

    --- Mods IDs ---
    joaoppd:         259019605731704842
    Ricop02:         262592126641111041
    PapaTod0s:       280750769731534860
    Antimorsa - Dak: 231224747608899584
    Moyra:           410945773811793921
    Alcool:          201410677187805187
    Aldo Prime:      207903018132307970
    */

    var adminsid = ["235207667889471489","298515033732939777", "283130746431078400"];
    var modsid = ["259019605731704842","262592126641111041","280750769731534860", "231224747608899584", "410945773811793921", "201410677187805187", "207903018132307970"];

    for (var j = 0; j < countmembers; j++) { // iterate through every online user

        // first create html for admins, which will be displayed first

        for (var i = 0; i < adminsid.length; i++) { // do for each existing admin
            if (json.members[j].id == adminsid[i]) { // if current iterated users id = current iterated admin id, create html for that admin

                var widgAdmin = document.createElement('div');
                $(widgAdmin).addClass('widget-member');

                var widgAdminAvt = document.createElement('div');
                $(widgAdminAvt).addClass('widget-member-avatar');
                var avtAdminImg = document.createElement('img');
                $(avtAdminImg).attr("src", json.members[j].avatar_url)
                    .appendTo(widgAdminAvt);
                var adminStatus = document.createElement('span');
                if (json.members[j].status === 'online') {
                    $(adminStatus).addClass('widget-member-status widget-member-status-online');
                } else if (json.members[j].status === 'idle') {
                    $(adminStatus).addClass('widget-member-status widget-member-status-idle');
                } else {
                    $(adminStatus).addClass('widget-member-status widget-member-status-dnd');
                }
                $(adminStatus).appendTo(widgAdminAvt);
                $(widgAdminAvt).appendTo(widgAdmin);

                var adminName = document.createElement('span');
                $(adminName).addClass('widget-member-name');
                if (json.members[j].hasOwnProperty('nick')) {
                    $(adminName).text(json.members[j].nick);
                } else {
                    $(adminName).text(json.members[j].username);
                }
                $(adminName).appendTo(widgAdmin);

                if (json.members[j].hasOwnProperty('game')) {
                    var adminGame = document.createElement('span');
                    $(adminGame).addClass('widget-member-game')
                        .text(json.members[j].game.name)
                        .appendTo(widgAdmin);
                }

                $(widgAdmin).appendTo(widgAdminOnline);
            }
        }

        // then create html for mods, which will be displayed after admins

        for (var i = 0; i < modsid.length; i++) { // do for each existing mod
            if (json.members[j].id == modsid[i]) { // if current iterated users id = current iterated mod id, create html for that mod

                var widgMod = document.createElement('div');
                $(widgMod).addClass('widget-member');

                var widgModAvt = document.createElement('div');
                $(widgModAvt).addClass('widget-member-avatar');
                var avtModImg = document.createElement('img');
                $(avtModImg).attr("src", json.members[j].avatar_url)
                    .appendTo(widgModAvt);
                var modStatus = document.createElement('span');
                if (json.members[j].status === 'online') {
                    $(modStatus).addClass('widget-member-status widget-member-status-online');
                } else if (json.members[j].status === 'idle') {
                    $(modStatus).addClass('widget-member-status widget-member-status-idle');
                } else {
                    $(modStatus).addClass('widget-member-status widget-member-status-dnd');
                }
                $(modStatus).appendTo(widgModAvt);
                $(widgModAvt).appendTo(widgMod);

                var modName = document.createElement('span');
                $(modName).addClass('widget-member-name');
                if (json.members[j].hasOwnProperty('nick')) {
                    $(modName).text(json.members[j].nick);
                } else {
                    $(modName).text(json.members[j].username);
                }
                $(modName).appendTo(widgMod);

                if (json.members[j].hasOwnProperty('game')) {
                    var modGame = document.createElement('span');
                    $(modGame).addClass('widget-member-game')
                        .text(json.members[j].game.name)
                        .appendTo(widgMod);
                }

                $(widgMod).appendTo(widgModOnline);
            }
        }

        // then create html for remaining users

        var widgUser = document.createElement('div');
        $(widgUser).addClass('widget-member');

        var widgUserAvt = document.createElement('div');
        $(widgUserAvt).addClass('widget-member-avatar');
        var avtUserImg = document.createElement('img');
        $(avtUserImg).attr("src", json.members[j].avatar_url)
            .appendTo(widgUserAvt);
        var userStatus = document.createElement('span');
        if (json.members[j].status === 'online') {
            $(userStatus).addClass('widget-member-status widget-member-status-online');
        } else if (json.members[j].status === 'idle') {
            $(userStatus).addClass('widget-member-status widget-member-status-idle');
        } else {
            $(userStatus).addClass('widget-member-status widget-member-status-dnd');
        }
        $(userStatus).appendTo(widgUserAvt);
        $(widgUserAvt).appendTo(widgUser);

        var userName = document.createElement('span');
        $(userName).addClass('widget-member-name');
        if (json.members[j].hasOwnProperty('nick')) {
            $(userName).text(json.members[j].nick);
        } else {
            $(userName).text(json.members[j].username);
        }
        $(userName).appendTo(widgUser);

        if (json.members[j].hasOwnProperty('game')) {
            var userGame = document.createElement('span');
            $(userGame).addClass('widget-member-game')
                .text(json.members[j].game.name)
                .appendTo(widgUser);
        }

        $(widgUser).appendTo(userlist);
    };

    $(widgContainer).prependTo('#WikiaRail');
});