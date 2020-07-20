if (typeof chatTopicArray === 'undefined') {
    var chatTopicArray = [{
        url: wgServer + "/wiki/Special:RecentChanges",
        text: "recent changes",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153816/d97/images/7/7c/Icon_recent_changes.png"
    }, {
        url: wgServer + "/wiki/Special:MyPage",
        text: "my page",
        imgUrl: "" + wgAvatarUrl + ""
    }, {
        url: wgServer + "/wiki/Special:Chat?action=purge",
        text: "refresh",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153817/d97/images/8/89/Icon_refresh.png"
    }, ];
}

ChatTopic = {
    VERSION: "2.1.1",

    loadApp: function() {

        $('#ChatHeader > h1.public.wordmark').css('position', 'absolute');
        $('#ChatHeader > h1.public.wordmark').css('top', '0px');

        // Fixes the logo

        if (!$('.chattopic').length) {

            // Adds the container for the chat topic

            $('#ChatHeader').prepend('<div class="chattopic" style="margin-top: 10px; vertical-align: middle; text-align: center; z-index: 0; font-size: 13px; line-height: 145%;"></div>');

            // Adds the topic items

            for (i = 0; i < chatTopicArray.length; i++) {
                if (i < chatTopicArray.length - 1) {
                    $("div.chattopic").append('<a class="topiclink topiclink' + String(i) + '" href=' + chatTopicArray[i].url + ' target="_blank"><img src=' + chatTopicArray[i].imgUrl + ' height="12px" class="chattopic-icon" /> ' + chatTopicArray[i].text + '</a> • ');
                    if (chatTopicArray[i].url.indexOf(wgServer + "/wiki/Special:Chat") != -1) {
                        $("a.topiclink" + String(i)).attr("target", "");
                    }
                } else {
                    $("div.chattopic").append('<a class="topiclink topiclink' + String(i) + '" href=' + chatTopicArray[i].url + ' target="_blank"><img src=' + chatTopicArray[i].imgUrl + ' height="12px" class="chattopic-icon" /> ' + chatTopicArray[i].text + '</a>');
                    if (chatTopicArray[i].url.indexOf(wgServer + "/wiki/Special:Chat") != -1) {
                        $("a.topiclink" + String(i)).attr("target", "");
                    }
                }
            }
        }

        $("#ChatHeader > h1.private").remove(); // Stops the private chat header from causing problems

        console.log("[TOPIC] Loaded ChatTopic version " + ChatTopic.VERSION);
        // END Chat header
    }
};

ChatTopic.loadApp();