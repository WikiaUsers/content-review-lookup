/*****
  ————————————————————————————————————————————————————————————————————————
  # Custom Discord Widget
  # Creates a custom Discord widget/iframe at the right rail
  # Original Authors: Soap Shadow and Speedit. Changes made by Wither, and adapted by Americhino
  # Based on a script from the My Little Pony Wiki
  —————————————————————————————————————————————————————————————————————————
**/
 
importStylesheet("MediaWiki:CustomDiscordIntegrator.css");
$.getJSON("https://discordapp.com/api/guilds/260258448053239808/widget.json", function(json) {
// Get user's ids
    function getAdmins() {return [
        /**
         * Alpha/Beta
         * 
         * This function populates an array with the 
         * admin user ids and returns the array.
         *
         * Americhino                        221007596222545925
         * Annabeth and Percy                214202808826593283
         * Lieutenant Lion         			 358692760150081536
         */
        "221007596222545925",
        "214202808826593283",
		"358692760150081536"
        ];
    }
    function getMods() {return [
        /**
         * Delta
         * 
         * This function populates an array with the
         * Delta user ids and returns the array.
         *
         * Slasher                 125052275159728129
         * Miststream              148111655526596609
         * Xatula                  266534374009339904
         */
        "125052275159728129", 
        "148111655526596609",
		"266534374009339904"
        ];
    }
    function getNotable() {return [
        /**
         * Notable
         * 
         * This function populates an array with the
         * Notable user ids and returns the array.
         *
         * big ole snack boi                        357288385200521216
         * kadin                                    383826518889070604
         * Maurice.136                              193474553169707009
         * Razza                                    275125083989606401
         * Speedit                                  175267849546366976
         * Valryian Wildfire                        230798521035522049
         */
        "357288385200521216", 
        "383826518889070604",
        "193474553169707009",
        "275125083989606401", 
        "175267849546366976",
        "230798521035522049"
        ];
    }
    function getBots() {return [
        /**
         * Bots
         * 
         * This function populates an array with the
         * bot user ids and returns the array.
         * 
         * akane            483839810058846208
         * Mee6             159985870458322944
         * Tatsumaki        172002275412279296
         * Ayana            185476724627210241
         * FredBoat         184405311681986560
         * Nadeko           116275390695079945
         * DuckHunt         187636089073172481
         * Dyno             155149108183695360
         * NotSoBot         439205512425504771
         * DiscordServers   115385224119975941
         */
        "483839810058846208",
        "159985870458322944", 
        "172002275412279296", 
        "185476724627210241",
        "184405311681986560", 
        "116275390695079945",
        "187636089073172481",
        "170915625722576896", 
        "155149108183695360", 
        "439205512425504771"
    ]}
    //Make some variables
    var $rail = $('#WikiaRail'); //Get the Wikia Rail.
    var $widgetContainer; //Container to hold the widget. This replaces the iframe.
    var membersOnline = json.members.length; //Number of members currently online.
    //=======================================================
    // Start creating the widget
    //=======================================================
    /* Create widget HTML code. This is the same code generated by the widget 
    iframe, however by manually creating it, we can move things around and 
    create custom elements, which will allow us to add
    member roles to the widget and make other customisations. */
 
    // Create the container to hold the widget. This replaces the iframe.
    $widgetContainer = document.createElement("div");
    $($widgetContainer).attr("id", "discord-widget-container");
 
    // Create discord widget.
    var $widgetDiscord = document.createElement("div");
    $($widgetDiscord).attr("id", "discord-widget").appendTo($widgetContainer);
 
    // Create dark theme widget.
    var $widgetDarkTheme = document.createElement("div");
    $($widgetDarkTheme).addClass("widget widget-theme-dark").appendTo
    ($widgetDiscord);
 
    // Create header.
    var $widgetHeader = document.createElement("div");
    $($widgetHeader).addClass("widget-header").appendTo($widgetDarkTheme);
 
    // Add discord logo to header.
    var $widgetHeaderDiscordLogo = document.createElement("a");
    $($widgetHeaderDiscordLogo)
        .addClass("widget-logo")
        .attr("href", "https://discordapp.com/?utm_source=Discord%20Widget&utm_medium=Logo")
        .attr("target", "_blank")
        .appendTo($widgetHeader);
 
    // Add members online to header.
    var $widgetHeaderMembersOnline = document.createElement("span");
    $($widgetHeaderMembersOnline)
        .addClass("widget-header-count")
        .html("<strong>" + membersOnline + 
        "</strong> Members Online")
        .appendTo($widgetHeader);
 
    // Create main widget area.
    var $widgetBody = document.createElement("div");
    $($widgetBody).addClass("widget-body").appendTo($widgetDarkTheme);
 
    // Create container for main widget area.
    var $widgetBodyContainer = document.createElement("div");
    $($widgetBodyContainer).appendTo($widgetBody);
 
    // Create container to hold all users currently online.
    var $widgetBodyUsers = document.createElement("div");
    $($widgetBodyUsers).appendTo($widgetBodyContainer);
 
    // Create container for Alphas
    var $adminOnlineContainer = document.createElement("div");
    $($adminOnlineContainer).addClass("widget-role-container").appendTo
    ($widgetBodyUsers);
 
    var $adminOnlineTitle = document.createElement("div");
    $($adminOnlineTitle)
        .addClass("widget-role-name-admin")
        .text("Admins")
        .appendTo($adminOnlineContainer);
    // Do the same thing, but for mods and bots 
    var $modsOnlineContainer = document.createElement("div");
    $($modsOnlineContainer).addClass("widget-role-container")
    .appendTo($widgetBodyUsers);
    var $modsOnlineTitle = document.createElement("div");
    $($modsOnlineTitle)
        .addClass("widget-role-name-mods")
        .text("Mods")
        .appendTo($modsOnlineContainer);
    var $notableOnlineContainer = document.createElement("div");
    $($notableOnlineContainer)
        .addClass("widget-role-container")
        .appendTo($widgetBodyUsers);
    var $notableOnlineTitle = document.createElement("div");
    $($notableOnlineTitle)
        .addClass("widget-role-name-notable")
        .text("Notable")
        .appendTo($notableOnlineContainer);
 
    var $botsOnlineContainer = document.createElement("div");
    $($botsOnlineContainer)
        .addClass("widget-role-container")
        .appendTo($widgetBodyUsers);
    var $botsOnlineTitle = document.createElement("div");
    $($botsOnlineTitle)
        .addClass("widget-role-name-bots")
        .text("Bots")
        .appendTo($botsOnlineContainer);
 
    // Now for all other users
    var $usersOnlineContainer = document.createElement("div");
    $($usersOnlineContainer)
        .addClass("widget-role-container")
        .appendTo($widgetBodyUsers);
    var $usersOnlineTitle = document.createElement("div");
    $($usersOnlineTitle)
        .addClass("widget-role-name-member")
        .text("Citizens")
        .appendTo($usersOnlineContainer);
 
    // Populate the staff and bots.
    var admin = getAdmins();
    var mod = getMods();
    var notable = getNotable();
    var bots = getBots();
 
    // Run through the JSON and add users.
    for (var i = 0; i < membersOnline; i++) {
 
        var member = json.members[i];
        // Check whether the user is a staff member or a bot.
        // If yes, add the user to the relevant role section,
        // else add the user to the users section.
        if (admin.includes(member.id)) {$(createWidgetMember(member))
        .appendTo($adminOnlineContainer);} 
        else if (mod.includes(member.id)) {$(createWidgetMember(member))
        .appendTo($modsOnlineContainer);} 
        else if (notable.includes(member.id)) {$(createWidgetMember(member))
        .appendTo($notableOnlineContainer);} 
        else if (bots.includes(member.id)) {$(createWidgetMember(member))
        .appendTo($botsOnlineContainer);}
        else {$(createWidgetMember(member)).appendTo($usersOnlineContainer);}}
 
    // Further design the widget
 
    var $widgetFooter = document.createElement("div");
    $($widgetFooter)
        .addClass("widget-footer")
        .appendTo($widgetDarkTheme);
 
    // Add widget footer text.
    var $widgetFooterText = document.createElement("span");
    $($widgetFooterText)
        .addClass("widget-footer-info")
        .append("<a href=\"https://americhino.wikia.com/wiki/Project:Discord\">Policies</a>")
        .appendTo($widgetFooter);
 
    // Add connect button.
    var $widgetFooterButton = document.createElement("a");
    $($widgetFooterButton)
        .addClass("widget-btn-connect")
        .attr("href", json.instant_invite + "?utm_source=Discord%20Widget&utm_medium=Connect")
        .attr("target", "_blank")
        .text("Connect")
        .appendTo($widgetFooter);
 
    function createWidgetMember(member) {
 
        /**
         * Create widget member.
         * 
         * This function creates the element for a user
         * and returns the element.
         */
 
        // Create widget member.
        var $widgetMember = document.createElement("div");
        $($widgetMember)
            .addClass("widget-member");
 
        // Create widget member avatar container.
        var $widgetMemberAvatarContainer = document.createElement("div");
        $($widgetMemberAvatarContainer)
            .addClass("widget-member-avatar")
            .appendTo($widgetMember);
 
        // Add user avatar.
        var $userAvatar = document.createElement("img");
        $($userAvatar)
            .attr("src", member.avatar_url)
            .appendTo($widgetMemberAvatarContainer);
 
        // Add user status.
        var $userStatus = document.createElement("span");
        switch (member.status) {
          case "online":$($userStatus).addClass
            ("widget-member-status widget-member-status-online");
                break;
          case "idle":$($userStatus).addClass
            ("widget-member-status widget-member-status-idle");
                break;
          case "dnd":$($userStatus).addClass
            ("widget-member-status widget-member-status-dnd");
                break;}
        $($userStatus).appendTo($widgetMemberAvatarContainer);
 
        // Add username.
        // Check if the user has a nick set.
        // If yes, add nick, else add username.
        var $username = document.createElement("span");
        if (member.hasOwnProperty("nick")) {$($username).text(member.nick);} 
        else {$($username).text(member.username);}
        $($username).addClass("widget-member-name").appendTo($widgetMember); 
        return $widgetMember;}
 
        //******************************************
        // Finally add the widget
        //******************************************
 
        function addToRail() {
 
        // Get widget container.
        var $widgetContainerRail = $widgetContainer;
 
        // Create rail module section.
        var $railModuleSection = document.createElement("section");
        $($railModuleSection).addClass("rail-module");
 
        // Add rail module title.
        var $railModuleTitle = document.createElement("h2");
        $($railModuleTitle).addClass("has-icon").appendTo($railModuleSection);
 
        // Add rail module title icon svg.
        // Use standard JS as jQuery doesn't fully support SVG DOM.
        var railModuleTitleIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        railModuleTitleIcon.setAttribute("viewBox", "0 0 1000 800");
        railModuleTitleIcon.setAttribute("height", "18");
        railModuleTitleIcon.setAttribute("width", "18");
        $railModuleTitle.appendChild(railModuleTitleIcon);
 
        // Add rail module title icon svg path.
        var railModuleTitleIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        railModuleTitleIconPath.setAttribute("d", "M 361.9857,0.00138389 C 348.73055,0.05478389 239.07459,3.1670339 123.39327,89.124664 123.39327,89.124664 0,311.06297 0,584.4136 c 0,0 71.978249,123.39208 261.35281,129.39038 0,0 31.70511,-37.7037 57.41206,-70.26582 C 209.93876,610.97599 168.80785,543.28361 168.80785,543.28361 c 0,0 8.5708,5.99726 23.99498,14.56626 0.85689,0 1.71122,0.85558 3.42502,1.7125 2.57069,1.71377 5.1422,2.57081 7.7129,4.28459 21.42246,11.99658 42.84423,21.42368 62.5529,29.13581 35.13283,14.56729 77.12215,27.41951 125.96536,36.84541 64.26736,11.9966 139.67306,16.28044 221.93532,0.85625 40.27424,-7.71208 81.40794,-18.85053 124.25286,-36.84541 29.99142,-11.13969 63.40925,-27.41914 98.54205,-50.55541 0,0 -42.84417,69.40888 -155.09786,101.11413 25.70697,31.70521 56.55581,68.54998 56.55581,68.54998 C 928.02173,706.94949 1000,583.55668 1000,584.4136 1000,311.06297 876.60671,89.124664 876.60671,89.124664 754.07028,-2.5634661 636.67349,0.00803389 636.67349,0.00803389 L 624.67932,13.718014 C 770.35209,57.419834 838.04548,121.6888 838.04548,121.6888 748.92802,73.702484 661.52634,49.707644 580.121,40.281764 c -61.69669,-6.85519 -120.82499,-5.13937 -173.09576,1.71581 -5.14137,0 -9.42484,0.85563 -14.56623,1.7125 -29.99144,3.42762 -102.82721,13.70953 -194.51535,53.98375 -31.70523,13.710366 -50.55871,23.994976 -50.55871,23.994976 0,0 70.26568,-67.697276 224.50739,-111.399106 L 363.32318,0.00803389 c 0,0 -0.4538,-0.0102 -1.33748,-0.007 z M 340.18778,316.20414 c 48.8432,0 88.26098,41.98669 87.40413,94.25746 0,52.27084 -38.56093,94.2608 -87.40413,94.2608 -47.98632,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z m 312.76778,0 c 47.98631,0 87.40413,41.98669 87.40413,94.25746 0,52.27084 -38.56089,94.2608 -87.40413,94.2608 -47.9863,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z");
        railModuleTitleIcon.appendChild(railModuleTitleIconPath);
 
        // Add rail module title text.
        $($railModuleTitle).append("Americhino's Paradise");
 
        // Add widget container to the rail module section.
        $($widgetContainerRail).appendTo($railModuleSection);
 
        // Get ads section.
        var $ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
 
        // Check if there are ads in the rail.
        // If yes, then add the module after the ads.
        // Else, prepend to the rail.
        if ($ads.exists()) {$railModuleSection.insertAfter($ads);} 
        else {$rail.prepend($railModuleSection);}}
 
    // Check if the wikia rail has loaded.
    // If yes, then add the widget, else add the widget on load.
    if (!$rail.hasClass("loaded")) {$rail.on("afterLoad.rail", addToRail);} 
    else {addToRail();}
 
    // Substitute any CustomDiscordIntegrator templates with the widget.
    $('.CustomDiscordIntegrator').each(function () {
 
        // Get the template container.
        var $container = $(this);
 
        // Add container title section.
        var $containerTitleSection = document.createElement("div");
        $($containerTitleSection).attr("id", "title").appendTo($container);
 
        // Add container title.
        var $containerTitle = document.createElement("h2");
        $($containerTitle).addClass("title has-icon").appendTo($containerTitleSection);
 
        // Add container title icon svg.
        // Use standard JS as jQuery doesn't fully support SVG DOM.
        var containerTitleIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        containerTitleIcon.setAttribute("viewBox", "0 0 1000 800");
        containerTitleIcon.setAttribute("height", "18");
        containerTitleIcon.setAttribute("width", "18");
        $containerTitle.appendChild(containerTitleIcon);
 
        // Add container title icon svg path.
        var containerTitleIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        containerTitleIconPath.setAttribute("d", "M 361.9857,0.00138389 C 348.73055,0.05478389 239.07459,3.1670339 123.39327,89.124664 123.39327,89.124664 0,311.06297 0,584.4136 c 0,0 71.978249,123.39208 261.35281,129.39038 0,0 31.70511,-37.7037 57.41206,-70.26582 C 209.93876,610.97599 168.80785,543.28361 168.80785,543.28361 c 0,0 8.5708,5.99726 23.99498,14.56626 0.85689,0 1.71122,0.85558 3.42502,1.7125 2.57069,1.71377 5.1422,2.57081 7.7129,4.28459 21.42246,11.99658 42.84423,21.42368 62.5529,29.13581 35.13283,14.56729 77.12215,27.41951 125.96536,36.84541 64.26736,11.9966 139.67306,16.28044 221.93532,0.85625 40.27424,-7.71208 81.40794,-18.85053 124.25286,-36.84541 29.99142,-11.13969 63.40925,-27.41914 98.54205,-50.55541 0,0 -42.84417,69.40888 -155.09786,101.11413 25.70697,31.70521 56.55581,68.54998 56.55581,68.54998 C 928.02173,706.94949 1000,583.55668 1000,584.4136 1000,311.06297 876.60671,89.124664 876.60671,89.124664 754.07028,-2.5634661 636.67349,0.00803389 636.67349,0.00803389 L 624.67932,13.718014 C 770.35209,57.419834 838.04548,121.6888 838.04548,121.6888 748.92802,73.702484 661.52634,49.707644 580.121,40.281764 c -61.69669,-6.85519 -120.82499,-5.13937 -173.09576,1.71581 -5.14137,0 -9.42484,0.85563 -14.56623,1.7125 -29.99144,3.42762 -102.82721,13.70953 -194.51535,53.98375 -31.70523,13.710366 -50.55871,23.994976 -50.55871,23.994976 0,0 70.26568,-67.697276 224.50739,-111.399106 L 363.32318,0.00803389 c 0,0 -0.4538,-0.0102 -1.33748,-0.007 z M 340.18778,316.20414 c 48.8432,0 88.26098,41.98669 87.40413,94.25746 0,52.27084 -38.56093,94.2608 -87.40413,94.2608 -47.98632,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z m 312.76778,0 c 47.98631,0 87.40413,41.98669 87.40413,94.25746 0,52.27084 -38.56089,94.2608 -87.40413,94.2608 -47.9863,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z");
        containerTitleIcon.appendChild(containerTitleIconPath);
 
        // Add container title text.
        $($containerTitle).append("Americhino's Paradise");
 
        // Add the widget to the container
        $($container).append($widgetContainer)});
});