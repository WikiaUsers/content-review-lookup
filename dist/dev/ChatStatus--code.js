/*
    spexial thex
    1. [[User:Super Miron]] - when being in the wrong place in the right time
    2. [[User:Jeserator]] - ur a nub but there's nothing to be ashamed of it
    3. [[User:Watatsuki]] - thank you for not accepting the required admin rights in my godforsaken test wiki for the early testmode testings. but how can you call a list a list if watut isn't there?
    4. [[User:Hey.youcp]] - get a new time zone will you how can i give you a credit if you weren't here on time for testing ヽ༼ຈل͜ຈ༽ﾉ
    5. [[User:-TwinkieReborn-]] - mayo is not an instrument
    6. [[User:Techman129]] - i didn't ask you to beta test this to give you an opportunity to ask me to play mc with you
    7. [[User:Syster]] and [[User:User.name ?query&string]] - thank u guys ur ze best soks evah
*/
if(mw.config.get("wgCanonicalSpecialPageName") == "Chat") {
    $(function () {
        mw.hook('dev.i18n').add(function (i18n) {
            i18n.loadMessages('ChatStatus').done(function (i18n) {
                /* main object */
                var cws = {
                    data: {
                        // dictionary of possible statuses
                        statuses: {
                            "afk": i18n.msg('afk').plain(),
                            "edit": i18n.msg('edit').plain(),
                            "game": i18n.msg('game').plain(),
                            "food": i18n.msg('food').plain(),
                            "book": i18n.msg('book').plain(),
                            "code": i18n.msg('code').plain(),
                            "bottomtext": i18n.msg('bottomtext').plain(),
                            "notsoos": i18n.msg('notsoos').plain(),
                            "cake": i18n.msg('cake').plain(),
                            "google": i18n.msg('google').plain(),
                            "ufo": i18n.msg('ufo').plain(),
                            "homo": i18n.msg('homo').plain()
                        },
                        // statuses of users
                        users: {},
                        // current user's name
                        me: mw.config.get("wgUserName"),
                        // logged messages
                        log: [],
                        // debug mode state
                        debug: false
                    },
                    fn: {}
                };
                // check if local wiki uses settings
                try {
                    var globalSettings = window.ChatStatus;
                    if(globalSettings.statuses instanceof Object) {
                        cws.data.statuses = globalSettings.statuses;
                    }
                } catch(err) {}
                /* functions */
                // console
                cws.fn.log = function () {
                    cws.data.log.push({
                        type: arguments[0],
                        args: Array.prototype.slice.call(arguments, 1)
                    });
                    if(cws.data.debug === true) {
                        console[arguments[0]].apply(this, Array.prototype.slice.call(
                            arguments, 1));
                    }
                };
                // send status
                cws.fn.sendStatus = function (statusName, exp) {
                    var status = new models.SetStatusCommand({
                        statusMessage: "@~cws",
                        statusState: statusName
                    });
                    mainRoom.socket.send(status.xport());
                };
                // set status
                cws.fn.updateStatus = function (user, status) {
                    var statusText = cws.data.statuses.hasOwnProperty(status) ? cws.data
                        .statuses[status] : null,
                        node = cws.fn.getStatusElement(user);
                    cws.data.users[user] = status;
                    if(typeof statusText === "string") {
                        // normal status
                        node.text(statusText).show();
                    } else {
                        // null (for clearing the status) or invalid status
                        node.hide().text("");
                        delete cws.data.users[user]; // why was this commented out? :s
                    }
                };
                // get user status element
                cws.fn.getStatusElement = function (user) {
                    var parentEl = cws.data.me == user ? $("#ChatHeader .User") :
                        mainRoom.model.users.findByName(user).view.el;
                    return $(parentEl).find(".status");
                };
                // refresh my status
                cws.fn.refreshMyStatus = function () {
                    if(cws.data.users.hasOwnProperty(cws.data.me)) {
                        // only update newly-joined user if you have set your status - otherwise there would be no point in updating, right? :P
                        cws.fn.sendStatus(cws.data.users[cws.data.me]);
                    }
                };
                // init
                cws.fn.init = function () {
                    cws.fn.log("warn", "::cws.fn.init();");
                    // css
                    importArticle({
                        type: 'style',
                        article: 'u:dev:MediaWiki:ChatStatus.css'
                    });
                    // on update user
                    mainRoom.socket.on("updateUser", function (msg) {
                        cws.fn.log("log", "%ccustomwikistatus",
                            "background: orange; color: purple;", msg);
                        var data = JSON.parse(msg.data), // parsed data
                            status = data.attrs.statusState, // status code
                            user = data.attrs.name;
                        window.cws_log = window.cws_log || [];
                        window.cws_log.push(data);
                        if(data.attrs.statusMessage == "@~cws") {
                            // custom wiki status
                            if(typeof status === "string") {
                                // status by user
                                cws.fn.updateStatus(user, status.toLowerCase());
                            } else if(status === -1) {
                                // when set to -1, a user who joined chat had their chat fully-loaded,
                                // and asks everyone to resend their status in order to be up-to-date
                                cws.fn.refreshMyStatus();
                            }
                        }
                    });
                    // delete user data when someone leaves
                    // note: will not affect refreshing users, but their status before refreshing will not be added unles they set a new status
                    mainRoom.socket.on("part", function (msg) {
                        var data = JSON.parse(msg.data);
                        cws.fn.log("log", "attempting to delete data for user: " + data.attrs
                            .name);
                        delete cws.data.users[data.attrs.name];
                    });
                    // add button for status settings
                    $('<span id="cws-trigger" title="' + i18n.msg('title').escape() +
                        '" />').click(function () {
                        var statuses = cws.data.statuses,
                            list = "",
                            statusCode;
                        for(statusCode in statuses) {
                            if(typeof statuses[statusCode] === "string") {
                                list += '<li data-cws-status="' + mw.html.escape(statusCode) +
                                    '">' + mw.html.escape(statuses[statusCode]) + '</li>';
                            }
                        }
                        require(["wikia.ui.factory"], function (uiFactory) {
                            uiFactory.init(["modal"]).then(function (uiModal) {
                                $.msg = function () {
                                    cws.fn.log("warn", this, arguments);
                                    return mw.message.call(this, arguments).text();
                                };
                                var config = {
                                    type: "default",
                                    vars: {
                                        id: "cws-modal",
                                        size: "small",
                                        content: '<h3>' + i18n.msg('content').escape() +
                                            '</h3><ul class="cws-modal-statuses">' + list +
                                            '</ul>',
                                        title: i18n.msg('configTitle').plain(),
                                        buttons: [{
                                            vars: {
                                                value: i18n.msg('cancel').plain(),
                                                data: [{
                                                    key: "event",
                                                    value: "close"
                                                }]
                                            }
                                        }, {
                                            vars: {
                                                value: i18n.msg('reset').plain(),
                                                data: [{
                                                    key: "event",
                                                    value: "reset"
                                                }]
                                            }
                                        }]
                                    }
                                };
                                uiModal.createComponent(config, function (modal) {
                                    // when pressing esc - clsoe modal
                                    modal.$element.keydown(function (e) {
                                        if(e.which == 27) {
                                            e.preventDefault();
                                            modal.trigger("close");
                                        }
                                    });
                                    // reset status
                                    modal.bind("reset", function (e) {
                                        e.preventDefault();
                                        cws.fn.sendStatus(null);
                                        modal.trigger("close");
                                    });
                                    // setting status
                                    modal.$element.find(".cws-modal-statuses li").click(
                                        function () {
                                            cws.fn.log("log", "%csetting status to: " + $(this).attr(
                                                "data-cws-status"), "color: #0c0");
                                            cws.fn.sendStatus($(this).attr("data-cws-status"));
                                            modal.trigger("close");
                                        });
                                    // show modal
                                    modal.show();
                                });
                            });
                        });
                    }).appendTo("#ChatHeader");
                    // prevent ordinary away messages
                    NodeChatController.prototype.setAway = function () {
                        // do nothing
                    };
                    // you have just entered chat - ask users to send you their updated status
                    // (users can't rely on mainRoom.socket.on("join"), since they are usually notified before the joining user actually has chat fully-loaded
                    cws.fn.log("warn", "::cws.fn.init -- asking users for statuses");
                    cws.fn.sendStatus(-1); // the value -1 is reserved for asking everyone to resend their statuses, to give you their status info
                    cws.fn.log("warn", "::cws.fn.init -- end");
                };
                /* implement */
                function hasPageLoaded() {
                    cws.fn.log("warn", "hasPageLoaded -- attempt");
                    if($(".Chat > ul:not(:empty)").length > 0 && !$("#WikiChatList").is(
                            ":empty") && window.hasOwnProperty("mainRoom")) {
                        // can initiate
                        cws.fn.log("warn", "hasPageLoaded -- success - initiating");
                        cws.fn.init();
                    } else {
                        cws.fn.log("warn", "hasPageLoaded -- fail- try again");
                        // page not ready yet - wait and try again
                        setTimeout(hasPageLoaded, 500);
                    }
                }
                hasPageLoaded();
                // debug mode
                try {
                    if(window.ChatStatus.debug === true) {
                        window.cws = cws;
                        cws.data.debug = true;
                    }
                } catch(err) {}
            });
        });
        importArticle({
            type: 'script',
            article: 'u:dev:I18n-js/code.js'
        });
    });
}