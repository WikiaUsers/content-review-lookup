/**** Any JavaScript here will be loaded for all users on every page load. ****/

/* Auto-Refresh */
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:WikiActivity",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* ####################################
    Dev and MediaWiki imports
   #################################### */

importArticles({
    type: "style",
    articles: [
        'MediaWiki:AdminHighlighting.css',
        'MediaWiki:Poll.css'
    ]
});

/* ################################
    On-load stuff
   ################################ */

$(function() {

    /* ####################################
        Livestream V2
       #################################### */

    if ($("#twitch-online").length > 0) {

        // Yogscast twitch names
        var names = [
            "Yogscast",
            "PyrionFlax",
            "sips_",
            "HatFilms",
            "TheFyreUK",
            "Rythian",
            "ZoeyProasheck",
            "WilliamStrife",
            "YogsLomadia",
            "Turps",
            "InTheLittleWood",
            "Sjin",
            "BebopVox",
            "SoTotallyToby",
            "Nilesy",
            "CaffCast",
            "HeyChrissa"
        ];

        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/streams/' + name,
                headers: {
                    'Client-ID': 'jpseb9skikaxrtxvj7hwpxbqb4ulcge'
                },
                success: function(json) {
                    if (json.stream === null) {
                        // No current stream
                    } else {
                        var channelString = mw.html.escape(json._links.channel);
                        var channelGameString = mw.html.escape(json.stream.game);
                        channelString = channelString.replace("https://api.twitch.tv/kraken/channels/", "");
                        $("#twitch-online").append("<div class=\"live-user\"><a href=\"https://twitch.tv/" + channelString + "\"><img src=\"https://vignette.wikia.nocookie.net/yogscast/images/e/e4/Twitch-square.png/revision/latest/scale-to-width-down/26\"><div class=\"live-text\">" + channelString + "</div><span class=\"twitch-desc\">" + channelGameString + "</span></a></div>");
                        $(".sidebar-livestreams").css("display", "block");
                    }
                }
            });
        }

        // Yogscast YouTube
        var ytstreams = ["l6rGXhLfey4", "elmzjRaHfe8", "sYdGOBTBLBo"];
        var ytnames = ["Hat Films", "Sjin", "Zoey"];

        $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=l6rGXhLfey4%2C+elmzjRaHfe8%2C+sYdGOBTBLBo&fields=items&key=AIzaSyAJsrNQ3KEXbjdcIYR2sds0V0W0R68GItk", function(json) {
            for (var i = 0; i < 3; i++) {
                var titleString = mw.html.escape(json.items[i].snippet.title);
                var channelID = mw.html.escape(json.items[i].snippet.channelId);
                if (json.items[i].snippet.liveBroadcastContent == "none") {
                    //$("#ytgaming-online").append( "<div class=\"live-user\"><a href=\"https://gaming.youtube.com/watch?v="+ytstreams[i]+"\"><img src=\"ytgaming-square.png\"><div class=\"live-text\">"+ytnames[i] + "</div><span class=\"twitch-desc\">"+ titleString +"</span></a></div>");
                } else {
                    $("#twitch-online").append("<div class=\"live-user\"><a href=\"https://gaming.youtube.com/watch?v=" + ytstreams[i] + "\"><img src=\"https://vignette.wikia.nocookie.net/yogscast/images/4/42/Ytgaming-square.png/revision/latest/scale-to-width-down/26\"><div class=\"live-text\">" + ytnames[i] + "</div><span class=\"twitch-desc\">" + titleString + "</span></a></div>");
                    $(".sidebar-livestreams").css("display", "block");
                }
            }
        });

    }
});