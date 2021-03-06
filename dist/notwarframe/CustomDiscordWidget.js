importArticles({
    type: "style",
    articles: [
        'MediaWiki:CustomDiscordWidget.css'         //CustomDiscordWidget.js
    ]
});

/* retrieve json file */
$.getJSON("https://discordapp.com/api/servers/231973089737572352/widget.json", function(json) {
    
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
                                    .html("<strong>" + countmembers + "</strong> Members Online")
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
                                          .html("Voice Chat<br>General: ")
                                          .appendTo(widgCha);
                            var emptyChaName = document.createElement('div');
                            $(emptyChaName).attr('id', 'empty-in-channel-name')
                                           .appendTo(widgCha);
                    var membContainer = document.createElement('div');
                    $(membContainer).attr('id', 'members-container')
                                    .appendTo(widgBody);
                        var widgMembOnline = document.createElement('div');
                        $(widgMembOnline).addClass('widget-members-online')
                                         .text("Members Online")
                                         .appendTo(membContainer);
                        var widgAdminOnline = document.createElement('div');
                        $(widgAdminOnline).addClass('widget-admins-online')
                                          .text("Admins")
                                          .appendTo(membContainer);
                        var widgModOnline = document.createElement('div');
                        $(widgModOnline).addClass('widget-mods-online')
                                        .text("Mods")
                                        .appendTo(membContainer);
                        var userlist = document.createElement('div');
                        $(userlist).attr('id', 'userlist')
                                   .text("Users")
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
                                 .attr("href", "https://discordapp.com/invite/U8kPksk")
                                 .attr("target", "_blank")
                                 .text("Connect")
                                 .appendTo(widgFooter);
 
 
    /* WIDGET POPULATION*/
 
    /* 
    --- Admins IDs ---
    ArcticEngie:     135348017078206464
    Brizingr5:       184425957296177152
    ChickenBar:      335820602390740994
    Emailformygames: 156975793090723841
    Flaicher:        185461665171505152
    6079Smith:       298723684812849152
    Twilight053:     152040144063430656
    USouLz:          137491251921551360
    Voqualin:        232123955639615488
 
    --- Mods IDs ---
    DaExile:          75948343410298880
    Doudich:         178907024409624577
    Gat235:          152589022940626944
    Hennils:         156857194736779264
    Hilycker:        207738565457739776
    Kselia:          259044923934769152
    Rngd444:         231976359084294145
    TunaInABottle:   205020350835195904
    */
 
    var adminsid = ["135348017078206464", "184425957296177152", "335820602390740994", "156975793090723841", "185461665171505152", "298723684812849152", "152040144063430656", "137491251921551360", "232123955639615488"];
    var modsid = ["75948343410298880", "178907024409624577", "152589022940626944", "156857194736779264", "207738565457739776", "259044923934769152", "231976359084294145", "205020350835195904"];
 
    for (var j = 0; j < countmembers; j++) { // iterate through every online user
    var isVoice = false;
    
    if (json.members[j].hasOwnProperty('channel_id')) {
        if(json.members[j].channel_id == "231973089737572353") //check if channel_id of voice channell exist and increments voice users counter
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
                    $(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/notwarframe/images/2/26/Voice1.svg")
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
                    $(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/notwarframe/images/2/26/Voice1.svg")
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
                    $(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/notwarframe/images/2/26/Voice1.svg")
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