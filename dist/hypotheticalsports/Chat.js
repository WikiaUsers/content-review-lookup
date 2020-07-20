var chatags = { images: true, videos: true };
 
chatAnnouncementsAll = true;
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'MediaWiki:Chat.js/inline.js'
        // ...
    ]
});
 
// All credit goes to Penguin-Pal //
$(function() {
	var gap = 30,
		chatResizeEmoticons = $('<style style="text/css" />');
	$(chatResizeEmoticons).appendTo("head");
	function request() {
		$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Emoticons|MediaWiki:ChatResizeEmoticons.css&rvprop=content&cb=" + new Date().getTime(), function(data) {
			var a = data.query.pages,
				content = {emoticons: [], css: ""};
			for (var pageid in a) {
				if (a[pageid].title == "MediaWiki:ChatResizeEmoticons.css") {
					$(chatResizeEmoticons).html(a[pageid].revisions[0]["*"]);
				} else {
					content.emoticons.push(a[pageid].revisions[0]["*"]);
				}
			}
			mw.config.set("EMOTICONS", content.emoticons.join("\n\n"));
		});
	}
	// make first request when joining the room
	request();
	// request again every every 'gap' seconds
	setInterval(request, gap * 1000);
});

$(function() {
    /* self badge */
    var g = mw.config.get("wgUserGroups"),
        order = ["bureaucrat", "sysop", "contentmoderator", "rollback", "chatmoderator"],
        myGroups = mw.config.get("wgUserGroups"),
        dominantGroup;
        icons = {
                        "bureaucrat": "https://images.wikia.nocookie.net/hypotheticalsports/images/a/aa/BureaucratStarHSW.png",
            "sysop": "https://images.wikia.nocookie.net/hypotheticalsports/images/0/0d/AdminStarHSW.png",
                        "content-moderator": "https://images.wikia.nocookie.net/hypotheticalsports/images/b/ba/JrAdminStarHSW.png",
                        "rollback": "https://images.wikia.nocookie.net/hypotheticalsports/images/d/d7/RollbackStarHSW.png",
                        "chatmoderator": "https://images.wikia.nocookie.net/hypotheticalsports/images/3/3e/ChatModStarHSW.png"
        };
    for (var i in order) {
        var currGroup = order[i];
        if (myGroups.indexOf(currGroup) > -1) {
            dominantGroup = currGroup;
            break;
        }
    }
    if (typeof dominantGroup === "string") {
        $("body").addClass("cugroup-" + dominantGroup);
        mw.util.addCSS(
            'body.cugroup-' + dominantGroup + ' #ChatHeader > .User > .username:after {\n' +
                '\tbackground-image: url(\'' + icons[dominantGroup] + '\');\n' +
                '\tbackground-position: 0 0;\n' +
            '}'
        );
    }
 
    /* badges user list */
    $.when(
            $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=bureaucrat&aulimit=max&cb=" + new Date().getTime()),
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=sysop&aulimit=max&cb=" + new Date().getTime()),
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=content-moderator&aulimit=max&cb=" + new Date().getTime()),
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=rollback&aulimit=max&cb=" + new Date().getTime()),
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=chatmoderator&aulimit=max&cb=" + new Date().getTime())
    ).done(function(data_bureaucrat, data_sysop, data_contentmoderator, data_rollback, data_chatmoderator) {
        var users = {
                    "bureaucrat": data_bureaucrat[0].query.allusers,
                                "sysop": data_sysop[0].query.allusers,
                                "content-moderator": data_content-moderator[0].query.allusers,
                                "rollback": data_rollback[0].query.allusers,
                "chatmoderator": data_chatmoderator[0].query.allusers,
            },
            checkedUsers = [],
            cssData = {},
            cssOutput = "";
        for (var i in order) {
            var currGroup = order[i];
            for (var j in users[currGroup]) {
                var currUser = users[currGroup][j];
                if (checkedUsers.indexOf(currUser.name) == -1 && currUser.id > 0) {
                    checkedUsers.push(currUser.name);
                    if (!cssData.hasOwnProperty(currGroup)) {
                        cssData[currGroup] = [];
                    }
                    cssData[currGroup].push('body.ChatWindow #Rail .User[data-user="' + currUser.name + '"] .username:after');
                }
            }
        }
        for (var i in order) {
            if (typeof cssData[order[i]] === "object") {
                cssOutput += (
                    cssData[order[i]].join(",") + '{' +
                        'background-image: url(\'' + icons[order[i]] + '\');' +
                    'background-position: 0 0;' +
                    '}'
                );
            }
        }
        mw.util.addCSS(cssOutput);
    });
});