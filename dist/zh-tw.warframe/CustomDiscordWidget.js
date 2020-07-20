/* retrieve json file */
$.getJSON("https://discordapp.com/api/servers/709306059579457567/widget.json", function(json) {
 
    var countmembers = json.members.length; //online users number
    var howmanyvoice = 0; //Voice channel users count;
 
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
                                    .html("<strong>" + countmembers + "</strong> 在線")
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
                                          .html("語音<br>大廳: ")
                                          .appendTo(widgCha);
                            var emptyChaName = document.createElement('div');
                            $(emptyChaName).attr('id', 'empty-in-channel-name')
                                           .appendTo(widgCha);
                    var membContainer = document.createElement('div');
                    $(membContainer).attr('id', 'members-container')
                                    .appendTo(widgBody);
                        var widgMembOnline = document.createElement('div');
                        $(widgMembOnline).addClass('widget-members-online')
                                         .text("在線")
                                         .appendTo(membContainer);
                        var widgAdminOnline = document.createElement('div');
                        $(widgAdminOnline).addClass('widget-admins-online')
                                          .text("管理員")
                                          .appendTo(membContainer);
                        var widgModOnline = document.createElement('div');
                        $(widgModOnline).addClass('widget-mods-online')
                                        .text("編輯")
                                        .appendTo(membContainer);
                        var userlist = document.createElement('div');
                        $(userlist).attr('id', 'userlist')
                                   .text("用戶")
                                   .appendTo(membContainer);
                var widgFooter = document.createElement('div');
                $(widgFooter).addClass('widget-footer')
                             .appendTo(widgThemeDark);
                    var invitetext = document.createElement('span');
                    $(invitetext).addClass('widget-footer-info')
                                 .text("歡迎加入Discord伺服器聊天")
                                 .appendTo(widgFooter);
                    var invitelink = document.createElement('a');
                    $(invitelink).addClass('widget-btn-connect')
                                 .attr("href", "https://discord.gg/ePUBVaA")
                                 .attr("target", "_blank")
                                 .text("加入")
                                 .appendTo(widgFooter);
 
 
    /* WIDGET POPULATION*/
 
    /* 
    --- 管理員 IDs ---
    lonnstyle:       535295352115560488
    shadow_rose123:  254520825603031040
    --- 編輯 IDs ---
    cupa_60:         533225985479278593
    Killer_Neko:     300179412484227074
    TBunny:          565172622212726825
    */
 
    var adminsid = ["535295352115560488", "254520825603031040"];
    var modsid = ["533225985479278593", "300179412484227074", "565172622212726825"];
 
    for (var j = 0; j < countmembers; j++) { // iterate through every online user
    var isVoice = false;
 
    if (json.members[j].hasOwnProperty('channel_id')) {
        if(json.members[j].channel_id == "709306060107677760") //check if channel_id of voice channell exist and increments voice users counter
        howmanyvoice++;
        isVoice = true;
        } else {
            isVoice = false;
          }
 
 
        // first create html for admins, which will be displayed first
 
        for (var i = 0; i < adminsid.length; i++) { // do for each existing admin
            if (json.members[j].id == adminsid[i]) { // if current iterated users id = current iterated admin id, create html for that admin
 
                var widgAdmin = document.createElement('div');
                $(widgAdmin).addClass('widget-member');
                if(isVoice == true){//if in Voice Channel
                    $(widgAdmin).attr('id', 'voiceMember');
                }
                var widgAdminAvt = document.createElement('div');
                $(widgAdminAvt).addClass('widget-member-avatar');
                if(isVoice == true){//if in Voice Channel
                    $(widgAdminAvt).attr('id', 'voiceAvatar');
                }
                var avtAdminImg = document.createElement('img');
                $(avtAdminImg).attr("src", json.members[j].avatar_url)
                    .appendTo(widgAdminAvt);
                if(isVoice == true){//if in Voice Channel
                    $(avtAdminImg).attr('id', 'avatarImg');
                    var voiceImg = document.createElement('img');
                    $(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/warframe/images/2/26/Voice1.svg")
                               .prependTo(widgAdminAvt);
                }
 
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
                if(isVoice == true){//if in Voice Channel
                    $(widgMod).attr('id', 'voiceMember');
                }
                var widgModAvt = document.createElement('div');
                $(widgModAvt).addClass('widget-member-avatar');
                if(isVoice == true){//if in Voice Channel
                    $(widgModAvt).attr('id', 'voiceAvatar');
                }
                var avtModImg = document.createElement('img');
                $(avtModImg).attr("src", json.members[j].avatar_url)
                    .appendTo(widgModAvt);
                if(isVoice == true){//if in Voice Channel
                    $(avtModImg).attr('id', 'avatarImg');
                    var voiceImg = document.createElement('img');
                    $(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/warframe/images/2/26/Voice1.svg")
                               .prependTo(widgModAvt);
                }
 
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
        if(isVoice == true){//if in Voice Channel
            $(widgUser).attr('id', 'voiceMember');
        }
        var widgUserAvt = document.createElement('div');
        $(widgUserAvt).addClass('widget-member-avatar');
        if(isVoice == true){//if in Voice Channel
            $(widgUserAvt).attr('id', 'voiceAvatar');
        }
        var avtUserImg = document.createElement('img');
        $(avtUserImg).attr("src", json.members[j].avatar_url)
            .appendTo(widgUserAvt);
        if(isVoice == true){//if in Voice Channel
            $(avtUserImg).attr('id', 'avatarImg');
                    var voiceImg = document.createElement('img');
                    $(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/warframe/images/2/26/Voice1.svg")
                               .prependTo(widgUserAvt);
        }
 
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
 
    if(howmanyvoice != 0) {
    var voicehtml = $(widgChaName).html() + howmanyvoice; //set total voice channel users.
    $(widgChaName).html(voicehtml)
                  .show();
    }
 
    $(widgContainer).prependTo('#WikiaRail');
});