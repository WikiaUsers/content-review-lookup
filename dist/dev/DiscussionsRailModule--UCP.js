/* from https://nkch.fandom.com/wiki/MediaWiki:DiscussionsRailModule.js */
(function () {
	// Discussions are only available for logged-in users
	if (!mw.config.get('wgUserId')) {
		return;
	}
    if (!$(".fandom-community-header .explore-menu a[data-tracking='explore-discuss']").length) {
        return;
    }
    
    var nkch = "undefined" !== typeof window.nkch ? window.nkch : {};
	window.nkch = nkch;
	
	nkch.drm = "undefined" !== typeof nkch.drm ? nkch.drm : {};
    
    if (nkch.drm.isActive) {
        return;
    }
    nkch.drm.isActive = true;
    
    function insertToSiderail() {
        if (!mw.user.isAnon())
            document.querySelector(".sticky-modules-wrapper .recent-wiki-activity").after(nkch.drm.el.section.$e);
        else
            document.querySelector(".sticky-modules-wrapper").append(nkch.drm.el.section.$e);
    }
    function init(i18n) {
        var now = Math.floor(Date.now() / 1000.0);

        /* - elements - */

        nkch.drm.el = {
            section: {
                $e: document.createElement("section"),
                header: {
                    $e: document.createElement("h2"),
                    icon: {
                        $e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        src: {
                            $e: document.createElementNS("http://www.w3.org/2000/svg", "use")
                        }
                    },
                    text: {
                        $e: document.createElement("span")
                    },
                },
                list: {
                    $e: document.createElement("ul"),
                    items: []
                },
                error: {
                    $e: document.createElement("div")
                }
            }
        };

        /* - section - */

        nkch.drm.el.section.$e.classList.add("rail-module", "activity-module", "discussions-activity");
        nkch.drm.el.section.$e.id = "discussions-activity-module";

        if ($('#WikiaRail').hasClass('is-ready')) {
            insertToSiderail();
        } else {
            $("#WikiaRail").on("afterLoad.rail", insertToSiderail);
        }

        /* - section : header - */

        nkch.drm.el.section.header.$e.classList.add("rail-module__header", "has-icon");

        nkch.drm.el.section.header.$e.innerHTML = i18n.msg("title").escape();

        nkch.drm.el.section.$e.appendChild(nkch.drm.el.section.header.$e);

        /* - section : header : icon - */

        nkch.drm.el.section.header.icon.$e.classList.add("wds-icon", "wds-icon-small");
        nkch.drm.el.section.header.icon.$e.setAttributeNS(null, "viewBox", "0 0 18 18");

        nkch.drm.el.section.header.$e.prepend(nkch.drm.el.section.header.icon.$e);

        /* - section : header : icon : src - */

        nkch.drm.el.section.header.icon.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-discussions-small");

        nkch.drm.el.section.header.icon.$e.appendChild(nkch.drm.el.section.header.icon.src.$e);

        /* - section : list - */

        nkch.drm.el.section.list.$e.classList.add("activity-items");

        nkch.drm.el.section.list.$e.classList.add("rail-module__list");

        $.ajax({
            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
            type: "GET",
            data: {
                controller: "DiscussionThread",
                method: "getThreads",
                limit: 50
            }
        }).done(
            function (data) {
                var discussionsThreadsAll = data._embedded.threads;

                var discussionsThreads = discussionsThreadsAll.sort(
                    function (a, b) {
                        if (a.modificationDate.epochSecond > b.modificationDate.epochSecond) return -1;
                        if (a.modificationDate.epochSecond < b.modificationDate.epochSecond) return 1;
                        return 0;
                    }
                );
                if (discussionsThreads.length > 5) discussionsThreads.length = 5;

                var i = 0;

                function threadsLoop() {
                    if (i === discussionsThreads.length) {
                        nkch.drm.el.section.$e.appendChild(nkch.drm.el.section.list.$e);
                        return;
                    }
                    $.ajax({
                        url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
                        type: "GET",
                        data: {
                            controller: "DiscussionPost",
                            method: "getPost",
                            postId: discussionsThreads[i].lastPostId
                        }
                    }).done(
                        function (post) {
                            /* - elements - */
                            var item = {
                                $e: document.createElement("li"),
                                content: {
                                    $e: document.createElement("div"),
                                    title: {
                                        $e: document.createElement("div"),
                                        link: {
                                            $e: document.createElement("a"),
                                        }
                                    },
                                    text: {
                                        $e: document.createElement("div"),
                                        lastReply: {
                                            $e: document.createElement("a"),
                                        },
                                        timeago: {
                                            $e: document.createElement("time"),
                                        }
                                    }
                                }
                            };

                            /* - item - */

                            item.$e.classList.add("activity-item");

                            nkch.drm.el.section.list.$e.appendChild(item.$e);

                            /* - item : content - */

                            item.$e.appendChild(item.content.$e);

                            /* - item : content : title - */

                            item.content.title.$e.classList.add("page-title");

                            item.content.$e.appendChild(item.content.title.$e);

                            /* - item : content : title : link - */

                            item.content.title.link.$e.classList.add("discussions-activity__page-title", "page-title-link");

                            Object.assign(item.content.title.link.$e.style, {
                            	display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            });

                            item.content.title.link.$e.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/p/" + post.threadId);

                            if (discussionsThreads[i].title.length === 0) {
                                item.content.title.link.$e.innerHTML = i18n.msg("post-by", discussionsThreads[i].createdBy.name).escape();
                            } else {
                                item.content.title.link.$e.innerText = discussionsThreads[i].title;
                            }

                            item.content.title.$e.appendChild(item.content.title.link.$e);

                            /* - item : content : text - */

                            item.content.text.$e.classList.add("edit-info");

                            Object.assign(item.content.text.$e.style, {
                                display: "flex"
                            });

                            item.content.$e.appendChild(item.content.text.$e);

                            /* - item : content : text : lastReply - */
                            
                            item.content.text.lastReply.$e.classList.add("discussions-activity__username", "edit-info-user");

                            Object.assign(item.content.text.lastReply.$e.style, {
                            	display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: "rgba(var(--right-rail-text-color--rgb),.75)",
                                fontSize: "12px",
                                fontWeight: "400",
                                maxWidth: "150px"
                            });

                            item.content.text.lastReply.$e.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + mw.Title.makeTitle(2, post.createdBy.name).getPrefixedText());
                            item.content.text.lastReply.$e.innerText = post.createdBy.name;

                            item.content.text.$e.appendChild(item.content.text.lastReply.$e);

                            /* - item : content : text : timeago - */

                            item.content.text.timeago.$e.classList.add("timeago", "discussions-activity__timeago", "edit-info-time");

                            Object.assign(item.content.text.timeago.$e.style, {
                                color: "rgba(var(--right-rail-text-color--rgb),.75)",
                                fontSize: "12px",
                                fontWeight: "400"
                            });

                            var diff = now * 1000 - discussionsThreads[i].modificationDate.epochSecond * 1000,
                                createdAgo;

                            var msPerMinute = 60 * 1000,
                                msPerHour = msPerMinute * 60,
                                msPerDay = msPerHour * 24,
                                msPerMonth = msPerDay * 30,
                                msPerYear = msPerDay * 365;

                            if (diff < msPerMinute) {
                                time = Math.round(diff / 1000);
                                createdAgo = mw.message("timeago-second", time).escaped();
                            } else if (diff < msPerHour) {
                                time = Math.round(diff / msPerMinute);
                                createdAgo = mw.message("timeago-minute", time).escaped();
                            } else if (diff < msPerDay) {
                                time = Math.round(diff / msPerHour);
                                createdAgo = mw.message("timeago-hour", time).escaped();
                            } else {
                                time = Math.round(diff / msPerDay);
                                createdAgo = mw.message("timeago-day", time).escaped();
                            }

                            if (diff >= msPerMonth) {
                                if (diff < msPerYear) {
                                    addtime = Math.round(diff / msPerMonth);
                                    createdAgo = mw.message("timeago-month", addtime).escaped();
                                } else {
                                    addtime = Math.round(diff / msPerYear);
                                    createdAgo = mw.message("timeago-year", addtime).escaped();
                                }
                            }

                            item.content.text.timeago.$e.innerHTML = createdAgo;
                            item.content.text.timeago.$e.title = new Date(
                                discussionsThreads[i].modificationDate.epochSecond * 1000)
                                    .toLocaleString(mw.config.get("wgContentLanguage"),
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                }
                            );

                            item.content.text.$e.appendChild(item.content.text.timeago.$e);

                            i++;
                            threadsLoop();
                        }
                    );
                }
                threadsLoop();
            }
        ).fail(
            function () {

                /* - section : error - */
                Object.assign(nkch.drm.el.section.error.$e.style, {
                    color: "var(--theme-alert-color)"
                });

                nkch.drm.el.section.error.$e.innerHTML = i18n.msg("error").escape();

                nkch.drm.el.section.$e.appendChild(nkch.drm.el.section.error.$e);

                return;
            }
        );
        mw.util.addCSS(".discussions-activity__timeago:before { content: '•'; margin: 0 3px; }");
    }
    mw.hook("dev.i18n").add(
        function (i18n) {
            i18n.loadMessages("DiscussionsRailModule").done(init);
        }
    );
    importArticle({
        type: "script",
        article: "u:dev:MediaWiki:I18n-js/code.js"
    });
})();