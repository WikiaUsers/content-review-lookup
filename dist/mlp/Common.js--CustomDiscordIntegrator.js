/**
 * Created by Soap Shadow
 * Revised by Bobogoobo
 * Version 1.5.0
 *
 * This is a custom discord integrator widget for the MLP Wiki.
 * It allows the widget to show member roles as well as
 * displaying custom graphics and text.
 * 
 * Thanks to Speedit for the rail onload event code.
 * 
 * Reference: https://dev.wikia.com/wiki/MediaWiki:AddRailModule/code.js
 * Reference: https://mlp.wikia.com/wiki/MediaWiki:Common.js
 * Reference: https://warframe.wikia.com/wiki/MediaWiki:CustomDiscordWidget.js
 * 
 * Version History
 * v1.0.0 - Initial
 * v1.1.0 - Put the widget into a custom wikia rail module, which also adds a svg icon
 *          for the title and sub text about server guidelines.
 *        - Add bots role.
 * v1.2.0 - Add support for template substitution for pages which don't have the wikia rail
 *          i.e. the main page.
 * v1.3.0 - Remove Discord Operators role.
 *        - Refactor code.
 * v1.4.0 - Merge Discord Operators and Wiki Administrators into a single role.
 * v1.5.0 - Add GiveawayBot and Icecreambot to Bot list.
 *        - Replace server nicks with Wikia usernames.
 */

// Import discord integrator widget CSS.
importArticles({
    type: "style",
    articles: [
        "MediaWiki:Common.js/CustomDiscordIntegrator.js/StyleLight.css"
    ]
});

$.getJSON("https://discordapp.com/api/guilds/290889126771818496/widget.json", function (json) {

    function populateAdmins() {
        /**
         * Admins
         * 
         * This function populates an array with the 
         * admin user ids and returns the array.
         *
         * Bobogoobo                155484151317921792
         * Crazy sam10              276372791450664960
         * Dogman15                 197237301779234816
         * Guildmaster Grovyle      299220986249871360
         * Hope(N Forever)          202331223853367296
         * ImperfectXIII            397090507987353601
         * Jonny Manz               275751487232278529
         * Kinrah                   194527278129086465
         * Shadowdemon137           243564033217658890
         * Soap Shadow              273261090404696074
         * TheodoreRowy             271004412426715159
         * Thundermare              232534094381056001
         * TheRequiemEmpire         270241904610770946
         * TheUltimateH4M           153295441453252608
         * William Holden           156600423850049539
         */
        return [
            '155484151317921792',
            '276372791450664960',
            '197237301779234816',
            '299220986249871360',
            '202331223853367296',
            '397090507987353601',
            '275751487232278529',
            '194527278129086465',
            //**'243564033217658890',*/
            //**'273261090404696074',*/
            '271004412426715159',
            '232534094381056001',
            '270241904610770946',
            '153295441453252608',
            '156600423850049539',
        ];
    }

    function populateMods() {
        /**
         * Moderators
         * 
         * This function populates an array with the
         * Moderator user ids and returns the array.
         *
         * Callofduty4                              95710210273841152
         * Daxxie X Z                               251746399241240577
         * DJVinylScratchy                          213189905629708288
         * Lelouch vi Britannia of the Rebellion    271960310112321536
         * Lil' Shaddie The Gallade                 241378773860220928
         * NotkiKlepto                              322936592316760070
         * Smith B.                                 247059326051549184
         * UnknownProdigy                           238324337881513987
         */
        return [
            '95710210273841152',
            '251746399241240577',
            '213189905629708288',
            '271960310112321536',
            '241378773860220928',
            '322936592316760070',
            '247059326051549184',
            '238324337881513987',
        ];
    }

    function populateBots() {
        /**
         * Bots
         * 
         * This function populates an array with the
         * bot user ids and returns the array.
         * 
         * FlutterBot   287590006682550272
         * GiveawayBot  294882584201003009
         * Icecreambot  287394602623696896
         * MaidBot      481848561596891138
         * Noteworthy   443143851499061301
         * Talos        288744044748865536
         * Tatsumaki    172002275412279296
         */
        return [
            '287590006682550272',
            '294882584201003009',
            '287394602623696896',
            '481848561596891138',
            '443143851499061301',
            '288744044748865536',
            '172002275412279296',
        ];
    }

    var $rail = $("#WikiaRail"); // Get the Wikia rail.

    var $widgetContainer; // Container to hold the widget. This replaces the iframe.

    var membersOnline = json.members.length; // Number of members currently online.

    // Create widget HTML code.
    // This is the same code generated by the widget iframe; however, by manually creating it,
    // we can move things around and create custom elements, which will allow us
    // to add member roles to the widget and make other customisations.

    // Create the container to hold the widget. This replaces the iframe.
    $widgetContainer = $("<div></div>").attr("id", "discord-widget-container");

    // Create discord widget.
    var $widgetDiscord = $("<div></div>").attr("id", "discord-widget").appendTo($widgetContainer);

    // Create light theme widget.
    var $widgetLightTheme = $("<div></div>").addClass("widget widget-theme-light").appendTo($widgetDiscord);

    // Create header.
    var $widgetHeader = $("<div></div>").addClass("widget-header").appendTo($widgetLightTheme);
    
    // Create main widget area.
    var $widgetBody = $("<div></div>").addClass("widget-body").appendTo($widgetLightTheme);
    
    // Create container for main widget area.
    var $widgetBodyContainer = $("<div></div>").appendTo($widgetBody);
    
    // Create container to hold all users currently online.
    var $widgetBodyUsers = $("<div></div>").appendTo($widgetBodyContainer);
    
    // Create container to hold admins who are online.
    var $adminsOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    
    // Create container to hold moderators who are online.
    var $moderatorsOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    
    // Create container to hold bots who are online.
    var $botsOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    
    // Create container to hold all other users who are online.
    var $usersOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    
    // Create widget footer.
    var $widgetFooter = $("<div></div>").addClass("widget-footer").appendTo($widgetLightTheme);
    
    // Add discord logo to header.
    $("<a></a>")
        .addClass("widget-logo")
        .attr("href", "https://discordapp.com/?utm_source=Discord%20Widget&utm_medium=Logo")
        .attr("target", "_blank")
        .appendTo($widgetHeader);

    // Add members online to header.
    $("<span></span>")
        .addClass("widget-header-count")
        .html("<strong>" + membersOnline + "</strong> Ponies Online")
        .appendTo($widgetHeader);

    // Add admins online title.
    $("<div></div>").addClass("widget-role-name-admins").text("Admins").appendTo($adminsOnlineContainer);

    // Add moderators online title.
    $("<div></div>").addClass("widget-role-name-mods").text("Moderators").appendTo($moderatorsOnlineContainer);

    // Add bots online title.
    $("<div></div>").addClass("widget-role-name-bots").text("Bots").appendTo($botsOnlineContainer);

    // Add users online title.
    $("<div></div>").addClass("widget-role-name-users").text("Users").appendTo($usersOnlineContainer);
    
    // Add widget footer text.
    $("<span></span>")
        .addClass("widget-footer-info")
        .append("By joining, you agree to the <a href=\"https://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki%3AChat\">server guidelines</a>")
        .appendTo($widgetFooter);

    // Add connect button.
    $("<a></a>")
        .addClass("widget-btn-connect")
        .attr("href", json.instant_invite + "?utm_source=Discord%20Widget&utm_medium=Connect")
        .attr("target", "_blank")
        .text("Join Equestria")
        .appendTo($widgetFooter);

    // Populate the staff and bot users.
    var admins = populateAdmins();
    var mods = populateMods();
    var bots = populateBots();

    // Run through the JSON and add users.
    for (var i = 0; i < membersOnline; i++) {

        var member = json.members[i];

        // Check whether the user is a staff member or a bot user.
        // If yes, add the user to the relevant role section,
        // else add the user to the users section.
        if (admins.includes(member.id)) {
            $(createWidgetMember(member)).appendTo($adminsOnlineContainer);
        } else if (mods.includes(member.id)) {
            $(createWidgetMember(member)).appendTo($moderatorsOnlineContainer);
        } else if (bots.includes(member.id)) {
            $(createWidgetMember(member)).appendTo($botsOnlineContainer);
        } else {
            $(createWidgetMember(member)).appendTo($usersOnlineContainer);
        }
    }

    function createWidgetMember(member) {

        /**
         * Create widget member.
         * 
         * This function creates the element for a user
         * and returns the element.
         */

        // Create widget member.
        var $widgetMember = $("<div></div>").addClass("widget-member");

        // Create widget member avatar container.
        var $widgetMemberAvatarContainer = $("<div></div>").addClass("widget-member-avatar").appendTo($widgetMember);

        // Add user avatar.
        $("<img />").attr("src", member.avatar_url).appendTo($widgetMemberAvatarContainer);

        // Add user status.
        var $userStatus = $("<span></span>");
        switch (member.status) {
            case "online":
                $userStatus.addClass("widget-member-status widget-member-status-online");
                break;
            case "idle":
                $userStatus.addClass("widget-member-status widget-member-status-idle");
                break;
            case "dnd":
                $userStatus.addClass("widget-member-status widget-member-status-dnd");
                break;
        }
        $userStatus.appendTo($widgetMemberAvatarContainer);

        // Add username.
        // Check if the user has a nick set.
        // If yes, add nick, else add username.
        var $username = $("<span></span>");
        if (member.hasOwnProperty("nick")) {
            $username.text(member.nick);
        } else {
            $username.text(member.username);
        }
        $username.addClass("widget-member-name").appendTo($widgetMember);

        return $widgetMember;
    }
    
    function drawDiscordLogo(fill) {
        // Use standard JS as jQuery doesn't fully support SVG DOM.
        // TODO: replace with static image?
        
        // Add container title icon svg.
        var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("viewBox", "0 0 1000 800");
        icon.setAttribute("height", "18");
        icon.setAttribute("width", "18");

        // Add container title icon svg path.
        var iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (fill) {
            iconPath.style.fill = fill;
        }
        iconPath.setAttribute("d", "M 361.9857,0.00138389 C 348.73055,0.05478389 239.07459,3.1670339 123.39327,89.124664 123.39327,89.124664 0,311.06297 0,584.4136 c 0,0 71.978249,123.39208 261.35281,129.39038 0,0 31.70511,-37.7037 57.41206,-70.26582 C 209.93876,610.97599 168.80785,543.28361 168.80785,543.28361 c 0,0 8.5708,5.99726 23.99498,14.56626 0.85689,0 1.71122,0.85558 3.42502,1.7125 2.57069,1.71377 5.1422,2.57081 7.7129,4.28459 21.42246,11.99658 42.84423,21.42368 62.5529,29.13581 35.13283,14.56729 77.12215,27.41951 125.96536,36.84541 64.26736,11.9966 139.67306,16.28044 221.93532,0.85625 40.27424,-7.71208 81.40794,-18.85053 124.25286,-36.84541 29.99142,-11.13969 63.40925,-27.41914 98.54205,-50.55541 0,0 -42.84417,69.40888 -155.09786,101.11413 25.70697,31.70521 56.55581,68.54998 56.55581,68.54998 C 928.02173,706.94949 1000,583.55668 1000,584.4136 1000,311.06297 876.60671,89.124664 876.60671,89.124664 754.07028,-2.5634661 636.67349,0.00803389 636.67349,0.00803389 L 624.67932,13.718014 C 770.35209,57.419834 838.04548,121.6888 838.04548,121.6888 748.92802,73.702484 661.52634,49.707644 580.121,40.281764 c -61.69669,-6.85519 -120.82499,-5.13937 -173.09576,1.71581 -5.14137,0 -9.42484,0.85563 -14.56623,1.7125 -29.99144,3.42762 -102.82721,13.70953 -194.51535,53.98375 -31.70523,13.710366 -50.55871,23.994976 -50.55871,23.994976 0,0 70.26568,-67.697276 224.50739,-111.399106 L 363.32318,0.00803389 c 0,0 -0.4538,-0.0102 -1.33748,-0.007 z M 340.18778,316.20414 c 48.8432,0 88.26098,41.98669 87.40413,94.25746 0,52.27084 -38.56093,94.2608 -87.40413,94.2608 -47.98632,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z m 312.76778,0 c 47.98631,0 87.40413,41.98669 87.40413,94.25746 0,52.27084 -38.56089,94.2608 -87.40413,94.2608 -47.9863,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z");
        icon.appendChild(iconPath);
        
        return icon;
    }

    function addToRail() {

        // Get widget container.
        var $widgetContainerRail = $widgetContainer;

        // Create rail module section.
        var $railModuleSection = $("<section></section>").addClass("rail-module");

        // Add rail module title.
        var $railModuleTitle = $("<h2></h2>").addClass("has-icon").appendTo($railModuleSection);

        // Add rail module Discord logo.
        $railModuleTitle.append(drawDiscordLogo("#883E97"));

        // Add rail module title text.
        $railModuleTitle.append("Community Chat");

        // Add widget container to the rail module section.
        $widgetContainerRail.appendTo($railModuleSection);

        // Get ads section.
        var $ads = $("#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL").last();

        // Check if there are ads in the rail.
        // If yes, then add the module after the ads.
        // Else, prepend to the rail.
        if ($ads.exists()) {
            $railModuleSection.insertAfter($ads);
        } else {
            $rail.prepend($railModuleSection);
        }
    }

    // Check if the Wikia rail has loaded.
    // If yes, then add the widget, else add the widget on load.
    if (!$rail.hasClass("loaded")) {
        $rail.on("afterLoad.rail", addToRail);
    } else {
        addToRail();
    }

    // Substitute any CustomDiscordIntegrator templates with the widget.
    $(".CustomDiscordIntegrator").each(function () {

        // Get the template container.
        var $container = $(this);

        // Add container title section.
        var $containerTitleSection = $("<div></div>").attr("id", "title").appendTo($container);

        // Add container title.
        var $containerTitle = $("<h2></h2>").addClass("title has-icon").appendTo($containerTitleSection);

        // Add container Discord logo.
        $containerTitle.append(drawDiscordLogo());

        // Add container title text.
        $containerTitle.append("Community Chat");

        // Add the widget to the container.
        $container.append($widgetContainer);
    });

});