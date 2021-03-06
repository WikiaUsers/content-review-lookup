/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "style",
    articles: [
        "MediaWiki:Common.js/widgetInject.js/widgetInject.css"
    ]
});

// Fixes Discord //

$.getJSON("https://discordapp.com/api/guilds/498179496864645151/widget.json", function(json) {

    /*  -Populate Methods-
     *  Add the usernames to the corresponding category, for longer term stability it is recommended server nicknames be disabled.
     *
     *  -Example-
     *
     *  function populateXXXXX() {
     *    return [
     *      'UserA',
     *      'UserB',
     *      'UserC'
     *    ];
     *  }
     */

    function populateAdmins() {
        return [
          'JG Online',
          'fyr02',
          'The Minmus Derp'
        ];
    }

    function populateMods() {
        return [];
    }

    function populateBots() {
        return [
          'MathBot',
          'Tatsu'
        ];
    }

    var debug = true;

    var $rail = $("#WikiaRail");
    var $widgetContainer;
    var membersOnline = json.members.length;

    $widgetContainer = $("<div></div>").attr("id", "discord-widget-container");

    var $widgetDiscord = $("<div></div>").attr("id", "discord-widget").appendTo($widgetContainer);
    var $widgetLightTheme = $("<div></div>").addClass("widget widget-theme-light").appendTo($widgetDiscord);
    var $widgetHeader = $("<div></div>").addClass("widget-header").appendTo($widgetLightTheme);
    var $widgetBody = $("<div></div>").addClass("widget-body").appendTo($widgetLightTheme);
    var $widgetBodyContainer = $("<div></div>").appendTo($widgetBody);
    var $widgetBodyUsers = $("<div></div>").appendTo($widgetBodyContainer);
    var $adminsOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    //var $moderatorsOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    var $botsOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    var $usersOnlineContainer = $("<div></div>").addClass("widget-role-container").appendTo($widgetBodyUsers);
    var $widgetFooter = $("<div></div>").addClass("widget-footer").appendTo($widgetLightTheme);

    $("<a></a>")
        .addClass("widget-logo")
        .attr("href", "https://discordapp.com/?utm_source=Discord%20Widget&utm_medium=Logo")
        .attr("target", "_blank")
        .appendTo($widgetHeader);

    $("<span></span>")
        .addClass("widget-header-count")
        .html("<strong>" + membersOnline + "</strong> Users online")
        .appendTo($widgetHeader);


    $("<div></div>").addClass("widget-role-name-admins").text("Admins").appendTo($adminsOnlineContainer);
    //$("<div></div>").addClass("widget-role-name-mods").text("Moderators").appendTo($moderatorsOnlineContainer);
    $("<div></div>").addClass("widget-role-name-bots").text("Bots").appendTo($botsOnlineContainer);
    $("<div></div>").addClass("widget-role-name-users").text("Users").appendTo($usersOnlineContainer);

    $("<span></span>")
        .addClass("widget-footer-info")
        .append("")
        .appendTo($widgetFooter);

    $("<a></a>")
        .addClass("widget-btn-connect")
        .attr("href", "https://discord.gg/4UYvGBw?utm_source=Discord%20Widget&utm_medium=Connect")
        .attr("target", "_blank")
        .text("Start building!")
        .appendTo($widgetFooter);

    var admins = populateAdmins();
    var mods = populateMods();
    var bots = populateBots();

    if(debug) console.log(membersOnline, json.members);

    for (var i = 0; i < membersOnline; i++) {
        var member = json.members[i];

        if (admins.includes(member.username)) {
            $(createWidgetMember(member)).appendTo($adminsOnlineContainer);
            if(debug) console.log("added to admins");
        } else if (mods.includes(member.username)) {
            // $(createWidgetMember(member)).appendTo($moderatorsOnlineContainer);
            if(debug) console.log("added to moderators");
        } else if (bots.includes(member.username)) {
            $(createWidgetMember(member)).appendTo($botsOnlineContainer);
            if(debug) console.log("added to bots");
        } else {
            $(createWidgetMember(member)).appendTo($usersOnlineContainer);
            if(debug) console.log("added to users");
        }
    }

    function createWidgetMember(member) {

        var $widgetMember = $("<div></div>").addClass("widget-member");
        var $widgetMemberAvatarContainer = $("<div></div>").addClass("widget-member-avatar").appendTo($widgetMember);

        $("<img />").attr("src", member.avatar_url).appendTo($widgetMemberAvatarContainer);

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
        var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("viewBox", "0 0 1000 800");
        icon.setAttribute("height", "18");
        icon.setAttribute("width", "18");

        var iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (fill) {
            iconPath.style.fill = fill;
        }
        iconPath.setAttribute("d", "M 361.9857,0.00138389 C 348.73055,0.05478389 239.07459,3.1670339 123.39327,89.124664 123.39327,89.124664 0,311.06297 0,584.4136 c 0,0 71.978249,123.39208 261.35281,129.39038 0,0 31.70511,-37.7037 57.41206,-70.26582 C 209.93876,610.97599 168.80785,543.28361 168.80785,543.28361 c 0,0 8.5708,5.99726 23.99498,14.56626 0.85689,0 1.71122,0.85558 3.42502,1.7125 2.57069,1.71377 5.1422,2.57081 7.7129,4.28459 21.42246,11.99658 42.84423,21.42368 62.5529,29.13581 35.13283,14.56729 77.12215,27.41951 125.96536,36.84541 64.26736,11.9966 139.67306,16.28044 221.93532,0.85625 40.27424,-7.71208 81.40794,-18.85053 124.25286,-36.84541 29.99142,-11.13969 63.40925,-27.41914 98.54205,-50.55541 0,0 -42.84417,69.40888 -155.09786,101.11413 25.70697,31.70521 56.55581,68.54998 56.55581,68.54998 C 928.02173,706.94949 1000,583.55668 1000,584.4136 1000,311.06297 876.60671,89.124664 876.60671,89.124664 754.07028,-2.5634661 636.67349,0.00803389 636.67349,0.00803389 L 624.67932,13.718014 C 770.35209,57.419834 838.04548,121.6888 838.04548,121.6888 748.92802,73.702484 661.52634,49.707644 580.121,40.281764 c -61.69669,-6.85519 -120.82499,-5.13937 -173.09576,1.71581 -5.14137,0 -9.42484,0.85563 -14.56623,1.7125 -29.99144,3.42762 -102.82721,13.70953 -194.51535,53.98375 -31.70523,13.710366 -50.55871,23.994976 -50.55871,23.994976 0,0 70.26568,-67.697276 224.50739,-111.399106 L 363.32318,0.00803389 c 0,0 -0.4538,-0.0102 -1.33748,-0.007 z M 340.18778,316.20414 c 48.8432,0 88.26098,41.98669 87.40413,94.25746 0,52.27084 -38.56093,94.2608 -87.40413,94.2608 -47.98632,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z m 312.76778,0 c 47.98631,0 87.40413,41.98669 87.40413,94.25746 0,52.27084 -38.56089,94.2608 -87.40413,94.2608 -47.9863,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z");
        icon.appendChild(iconPath);

        return icon;
    }

    function addToRail() {
        var $widgetContainerRail = $widgetContainer;
        var $railModuleSection = $("<section></section>").addClass("rail-module");
        var $railModuleTitle = $("<h2></h2>").addClass("has-icon").appendTo($railModuleSection);

        $railModuleTitle.append(drawDiscordLogo("#ADABBB"));
        $railModuleTitle.append("WBH Discord");
        $widgetContainerRail.appendTo($railModuleSection);

        var $ads = $("#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL").last();
        if ($ads.exists()) {
            $railModuleSection.insertAfter($ads);
        } else {
            $rail.prepend($railModuleSection);
        }
    }

    if (!$rail.hasClass("loaded")) {
        $rail.on("afterLoad.rail", addToRail);
    } else {
        addToRail();
    }

    $(".CustomDiscordIntegrator").each(function () {
        var $container = $(this);
        var $containerTitleSection = $("<div></div>").attr("id", "title").appendTo($container);
        var $containerTitle = $("<h2></h2>").addClass("title has-icon").appendTo($containerTitleSection);

        $containerTitle.append(drawDiscordLogo());
        $containerTitle.append("WBH Discord");
        $container.append($widgetContainer);
    });

  });