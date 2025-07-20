/**
* This script is based off [[w:c:dev:MediaWiki:DiscussionsRailModule/UCP.js]] (authors: MACH-59330, 
* KockaAdmiralac, Не кочан) and parts of [[w:c:dev:MediaWiki:CommunityPageRailModule.js]] (author: Не кочан).
* It is highly modified by Nekky-chan and restores the embedded module inside wikitext / pages.
* This script relies on the wikia.php API endpoint and might break at any time!
*/
(function () {
    if (window.discussionsRailModuleLoaded) {
        return;
    }
    window.discussionsRailModuleLoaded = true;
    
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
    
    function insertToEmbed() {
        var config = window.discussionsModuleConfig || {};
        var showEmbedIcon = config.embedIcon !== false; // default true
        
        var embedContainers = document.querySelectorAll(".discussions-rail-theme");
        embedContainers.forEach(function(container) {
            container.innerHTML = '';
            
            var clonedList = nkch.drm.el.section.list.$e.cloneNode(true);
            
            var clonedSection = document.createElement("section");
            clonedSection.classList.add("rail-module", "activity-module", "discussions-activity");
            clonedSection.id = "discussions-activity-module-embed";
            clonedSection.appendChild(clonedList);
            
            var activityItems = clonedSection.querySelectorAll('.activity-item');
            activityItems.forEach(function(item) {
                item.style.marginBottom = '6px';
                
                var pageTitle = item.querySelector('.page-title');
                if (pageTitle) {
                    pageTitle.style.marginBottom = '0px';
                }
                
                var editInfo = item.querySelector('.edit-info');
                if (editInfo) {
                    editInfo.style.marginTop = '0px';
                }
            });
            
            clonedSection.style.background = 'none';
            clonedSection.style.border = 'none';
            clonedSection.style.margin = '0';
            clonedSection.style.padding = '0';
            
            container.appendChild(clonedSection);
        });
    }
    
    function createSkeletonLoader(itemCount) {
        var skeletonContainer = document.createElement("div");
        skeletonContainer.classList.add("discussions-skeleton");
        
        for (var i = 0; i < itemCount; i++) {
            var skeletonItem = document.createElement("div");
            skeletonItem.classList.add("discussions-skeleton-item");
            
            var skeletonAvatar = document.createElement("div");
            skeletonAvatar.classList.add("discussions-skeleton-avatar");
            
            var skeletonContent = document.createElement("div");
            skeletonContent.classList.add("discussions-skeleton-content");
            
            var skeletonTitle = document.createElement("div");
            skeletonTitle.classList.add("discussions-skeleton-title");
            
            var skeletonMeta = document.createElement("div");
            skeletonMeta.classList.add("discussions-skeleton-meta");
            
            skeletonContent.appendChild(skeletonTitle);
            skeletonContent.appendChild(skeletonMeta);
            
            skeletonItem.appendChild(skeletonAvatar);
            skeletonItem.appendChild(skeletonContent);
            
            skeletonContainer.appendChild(skeletonItem);
        }
        
        return skeletonContainer;
    }

    function insertSkeletonToEmbed(i18n) {
        var config = window.discussionsModuleConfig || {};
        var size = config.size || 5;
        
        var embedContainers = document.querySelectorAll(".discussions-rail-theme");
        embedContainers.forEach(function(container) {
            var skeletonSection = document.createElement("section");
            skeletonSection.classList.add("rail-module", "activity-module", "discussions-activity");
            skeletonSection.id = "discussions-activity-module-skeleton";
            
            var skeletonLoader = createSkeletonLoader(size);
            skeletonSection.appendChild(skeletonLoader);
            
            container.appendChild(skeletonSection);
        });
    }
    function init(i18n) {
        var now = Math.floor(Date.now() / 1000.0);

        var config = window.discussionsModuleConfig || {};
        var size = config.size || 5;
        var mostrecent = config.mostrecent !== false; // default true
        var catid = config.catid || [];
        var enableEmbed = config.embed !== false; // default true
        var enableRail = config.rail !== false; // default true
        var showEmbedIcon = config.embedIcon !== false; // default true

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

        nkch.drm.el.section.$e.classList.add("rail-module", "activity-module", "discussions-activity");
        nkch.drm.el.section.$e.id = "discussions-activity-module";

        if (enableRail) {
            if ($('#WikiaRail').hasClass('is-ready')) {
                insertToSiderail();
            } else {
                $("#WikiaRail").on("afterLoad.rail", insertToSiderail);
            }
        }

        if (enableEmbed) {
            setTimeout(function() {
                insertSkeletonToEmbed(i18n);
            }, 100);
        }

        nkch.drm.el.section.header.$e.classList.add("rail-module__header", "has-icon");

        nkch.drm.el.section.header.$e.innerHTML = i18n.msg("title").escape();

        nkch.drm.el.section.$e.appendChild(nkch.drm.el.section.header.$e);

        if (enableRail) {
            var skeletonLoader = createSkeletonLoader(size);
            nkch.drm.el.section.$e.appendChild(skeletonLoader);
        }

        nkch.drm.el.section.header.icon.$e.classList.add("wds-icon", "wds-icon-small");
        nkch.drm.el.section.header.icon.$e.setAttributeNS(null, "viewBox", "0 0 18 18");

        nkch.drm.el.section.header.$e.prepend(nkch.drm.el.section.header.icon.$e);

        nkch.drm.el.section.header.icon.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-discussions-small");

        nkch.drm.el.section.header.icon.$e.appendChild(nkch.drm.el.section.header.icon.src.$e);

        nkch.drm.el.section.list.$e.classList.add("activity-items");

        nkch.drm.el.section.list.$e.classList.add("rail-module__list");

        Object.assign(nkch.drm.el.section.list.$e.style, {
            gap: "8px"
        });

        var apiData = {
            controller: "DiscussionThread",
            method: "getThreads",
            limit: 50
        };
        
        if (catid.length > 0) {
            apiData.forumId = catid.join(',');
        }
        
        $.ajax({
            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
            type: "GET",
            data: apiData
        }).done(
            function (data) {
                var discussionsThreadsAll = data._embedded.threads;

                var discussionsThreads = discussionsThreadsAll;
                
                if (mostrecent) {
                    discussionsThreads = discussionsThreads.sort(
                        function (a, b) {
                            if (a.modificationDate.epochSecond > b.modificationDate.epochSecond) return -1;
                            if (a.modificationDate.epochSecond < b.modificationDate.epochSecond) return 1;
                            return 0;
                        }
                    );
                }
                
                var limitSize = Math.max(3, Math.min(6, size));
                if (discussionsThreads.length > limitSize) discussionsThreads.length = limitSize;

                var postRequests = discussionsThreads.map(function(thread, index) {
                    return $.ajax({
                        url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
                        type: "GET",
                        data: {
                            controller: "DiscussionPost",
                            method: "getPost",
                            postId: thread.lastPostId
                        }
                    }).then(function(post) {
                        return { post: post, thread: thread, index: index };
                    });
                });

                $.when.apply($, postRequests).done(function() {
                    var results = Array.prototype.slice.call(arguments);
                    
                    results.sort(function(a, b) {
                        return a.index - b.index;
                    });

                    results.forEach(function(result) {
                        var post = result.post;
                        var thread = result.thread;
                        var i = result.index;
                            var item = document.createElement("li");
                            var avatar = document.createElement("div");
                            var avatarLink = document.createElement("a");
                            var content = document.createElement("div");
                            var title = document.createElement("div");
                            var titleLink = document.createElement("a");
                            var text = document.createElement("div");
                            var lastReply = document.createElement("a");
                            var timeago = document.createElement("time");

                            item.className = "activity-item";
                            item.style.cssText = "display:flex;align-items:flex-start;gap:8px";
                            nkch.drm.el.section.list.$e.appendChild(item);

                            avatar.className = "wds-avatar";
                            avatar.style.cssText = "flex-shrink:0;width:24px;height:24px";
                            avatarLink.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + mw.Title.makeTitle(2, thread.createdBy.name).getPrefixedText());
                            avatarLink.title = thread.createdBy.name;
                            avatar.appendChild(avatarLink);
                            item.appendChild(avatar);

                            if (thread.createdBy.avatarUrl) {
                                var img = document.createElement("img");
                                img.className = "wds-avatar__image";
                                img.src = thread.createdBy.avatarUrl;
                                img.style.cssText = "width:24px;height:24px;border-radius:50%;object-fit:cover";
                                avatarLink.appendChild(img);
                            } else {
                                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                svg.className = "wds-avatar__image";
                                svg.setAttribute("viewBox", "0 0 24 24");
                                svg.style.cssText = "width:24px;height:24px";
                                var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
                                use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-avatar");
                                svg.appendChild(use);
                                avatarLink.appendChild(svg);
                            }

                            content.style.cssText = "flex:1;min-width:0";
                            item.appendChild(content);

                            title.className = "page-title";
                            titleLink.className = "discussions-activity__page-title page-title-link";
                            titleLink.style.cssText = "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
                            titleLink.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/p/" + post.threadId);
                            titleLink[thread.title.length ? "innerText" : "innerHTML"] = thread.title || i18n.msg("post-by", thread.createdBy.name).escape();
                            title.appendChild(titleLink);
                            content.appendChild(title);

                            text.className = "edit-info";
                            text.style.display = "flex";
                            lastReply.className = "discussions-activity__username edit-info-user";
                            lastReply.style.cssText = "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgba(var(--right-rail-text-color--rgb),.75);font-size:12px;font-weight:400;max-width:150px";
                            lastReply.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + mw.Title.makeTitle(2, thread.createdBy.name).getPrefixedText());
                            lastReply.innerText = thread.createdBy.name;
                            text.appendChild(lastReply);
                            content.appendChild(text);

                            timeago.className = "timeago discussions-activity__timeago edit-info-time";
                            timeago.style.cssText = "color:rgba(var(--right-rail-text-color--rgb),.75);font-size:12px;font-weight:400";

                            var diff = now * 1000 - thread.modificationDate.epochSecond * 1000,
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

                            timeago.innerHTML = createdAgo;
                            timeago.title = new Date(thread.modificationDate.epochSecond * 1000).toLocaleString(mw.config.get("wgContentLanguage"), {
                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                            });
                            text.appendChild(timeago);
                    });

                    var skeletonLoader = nkch.drm.el.section.$e.querySelector('.discussions-skeleton');
                    if (skeletonLoader) {
                        skeletonLoader.remove();
                    }
                    
                    nkch.drm.el.section.$e.appendChild(nkch.drm.el.section.list.$e);
                    
                    if (enableEmbed) {
                        var embedSkeletons = document.querySelectorAll("#discussions-activity-module-skeleton");
                        embedSkeletons.forEach(function(skeleton) {
                            skeleton.remove();
                        });
                        
                        insertToEmbed();
                    }
                });
            }
        ).fail(
            function () {
                Object.assign(nkch.drm.el.section.error.$e.style, {
                    color: "var(--theme-alert-color)"
                });

                nkch.drm.el.section.error.$e.innerHTML = i18n.msg("error").escape();

                nkch.drm.el.section.$e.appendChild(nkch.drm.el.section.error.$e);

                return;
            }
        );
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
    importArticle({
        type: "style",
        article: "MediaWiki:DiscussionsRailModule.css"
    });
})();