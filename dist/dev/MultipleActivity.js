/*
    MultipleActivity
    by Не кочан
*/

mw.loader.using("mediawiki.api").then(
    function () {
        var api = new mw.Api();
        var title = "MultipleActivity";

        // do only if have not done yet
        if (window.multipleActivityActive) {
            console.warn(title + ": Already running");
            return;
        }

        window.multipleActivityActive = true;

        function getSettings() {
            var params = {
                action: 'parse',
                disablepp: '',
                page: 'MediaWiki:Custom-MultipleActivity-settings',
                prop: 'wikitext',
                format: 'json'
            };

            return new Promise(function (resolve, reject) {
                api.get(params).done(
                    function (data) {
                        if (data.parse) {
                            data = data.parse.wikitext[Object.keys(data.parse.wikitext)[0]];

                            var settingsData = data.split("\n");

                            var settings = {};
                            for (var i in settingsData) {
                                sd = settingsData[i].split(/\s*:\s*/g);
                                settings[sd[0]] = sd[1];
                            }

                            if (settings.ma_links !== undefined) {
                                settings.ma_links = settings.ma_links.split(/\s*,\s*/g);
                            }
                            resolve(settings);
                        }
                    }).fail(reject);
            });
        }

        getSettings().then(
            function (settings) {
                var linkText;
                if (settings.ma_linkText !== undefined) {
                    linkText = settings.ma_linkText;
                } else {
                    linkText = title;
                }

                if (settings.ma_links !== undefined) {
                    if (settings.ma_links.includes("toolbar")) {
                        $(function () {
                            var toolbarLink = document.createElement("li");

                            var toolbarLinkAnchor = document.createElement("a");

                            toolbarLinkAnchor.innerHTML = linkText;
                            toolbarLinkAnchor.href = mw.config.get("wgScriptPath") + "/wiki/Special:MultipleActivity";

                            toolbarLink.appendChild(toolbarLinkAnchor);

                            $("#WikiaBarWrapper .mytools")[0].before(toolbarLink);
                        });
                    }

                    if (settings.ma_links.includes("activityTabs")) {
                        $(function () {
                            var acLink = document.createElement("li");
                            acLink.className = "wds-tabs__tab";

                            var acLinkLabel = document.createElement("div");
                            acLinkLabel.className = "wds-tabs__tab-label";

                            var acLinkAnchor = document.createElement("a");

                            acLinkAnchor.innerHTML = linkText;
                            acLinkAnchor.href = mw.config.get("wgScriptPath") + "/wiki/Special:MultipleActivity";

                            acLink.appendChild(acLinkLabel);
                            acLinkLabel.appendChild(acLinkAnchor);

                            $(".activity-tabs .wds-tabs__tab")[2].after(acLink);

                            window.multipleActivity.addLinkToActivityTabs_done = true;
                        });
                    }
                }
            }
        );

        mw.hook("dev.i18n").add(function (i18n) {
            i18n.loadMessages("MultipleActivity").done(
                function (i18n) {

                    // fetch some recent changes 
                    function ma_getRecentChanges() {
                        var params = {
                            action: "query",
                            list: "recentchanges",
                            rcprop: "title|ids|sizes|flags|user|comment|parsedcomment|timestamp",
                            rcnamespace: "0|1|2|3|4|5|8|9|10|11|14|15|500",
                            rcshow: "!bot",
                            rclimit: "100",
                            format: "json"
                        };

                        return new Promise(function (resolve, reject) {
                            api.get(params).done(
                                function (changes) {
                                    changes = changes.query.recentchanges;
                                    var i = 0;
                                    for (i in changes) {
                                        changes[i].timestamp = Date.parse(changes[i].timestamp) / 1000;
                                        changes[i].rel = "change";
                                    }
                                    resolve(changes);
                                }).fail(reject);
                        });
                    }

                    // fetch some logs
                    function ma_getLogEvents() {
                        var params = {
                            action: "query",
                            list: "logevents",
                            lelimit: "100",
                            format: "json"
                        };

                        return new Promise(function (resolve, reject) {
                            api.get(params).done(
                                function (logs) {
                                    logs = logs.query.logevents;
                                    var i = 0;
                                    for (i in logs) {
                                        logs[i].timestamp = Date.parse(logs[i].timestamp) / 1000;
                                        logs[i].rel = "log";
                                    }
                                    resolve(logs);
                                }).fail(reject);
                        });
                    }

                    // fetch some posts
                    function ma_getDiscussionsPosts() {
                        var params = {
                            controller: "DiscussionPost",
                            method: "getPosts",
                            viewableOnly: true,
                            sortKey: "creation_date",
                            limit: 100,
                            format: "json"
                        };

                        return new Promise(function (resolve) {
                            $.ajax({
                                url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
                                type: "GET",
                                data: params
                            }).then(
                                function (posts) {
                                    posts = posts._embedded["doc:posts"];
                                    var i = 0;
                                    for (i in posts) {
                                        posts[i].timestamp = posts[i].creationDate.epochSecond;
                                        posts[i].rel = "post";
                                        resolve(posts);
                                    }
                                });
                        });
                    }

                    // fetch some comment info
                    function ma_getComment(post) {
                        var params = {
                            controller: "FeedsAndPosts",
                            method: "getArticleNamesAndUsernames",
                            stablePageIds: post.forumId,
                            format: "json"
                        };

                        return new Promise(function (resolve) {
                            $.ajax({
                                url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
                                type: "GET",
                                data: params
                            }).then(
                                function (comment) {
                                    comment.post = post;
                                    resolve(comment);
                                });
                        });
                    }

                    function ma_getRailInfo() {
                        var params = {
                            controller: "FeedsAndPosts",
                            method: "getAll",
                            format: "json"
                        };

                        return new Promise(function (resolve) {
                            $.ajax({
                                url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
                                type: "GET",
                                data: params
                            }).then(
                                function (rail) {
                                    resolve(rail);
                                });
                        });
                    }

                    function ma_getCommunityCorner() {
                        var params = {
                            action: "parse",
                            page: "MediaWiki:Community-corner",
                            prop: "text",
                            format: "json"
                        };

                        return new Promise(function (resolve, reject) {
                            api.get(params).done(
                                function (parse) {
                                    if (parse.parse) {
                                        parse = parse.parse.text[Object.keys(parse.parse.text)[0]];
                                        resolve(parse);
                                    } else {
                                        reject(title + ": " + "Community corner has not been found");
                                    }
                                }).fail(reject);
                        });
                    }

                    function ma_getImages() {
                        var params = {
                            action: "query",
                            list: "allimages",
                            aisort: "timestamp",
                            aidir: "older",
                            aiprop: "user|timestamp|url",
                            format: "json"
                        };

                        return new Promise(function (resolve, reject) {
                            api.get(params).done(
                                function (images) {
                                    if (images.query.allimages) {
                                        images = images.query.allimages;
                                        resolve(images);
                                    }
                                }).fail(reject);
                        });
                    }

                    function timeAgo(dateSrc) {
                        var time, createdAgo;
                        var now = new Date();
                        var diff = now - dateSrc;

                        var msPerMinute = 60 * 1000;
                        var msPerHour = msPerMinute * 60;
                        var msPerDay = msPerHour * 24;
                        var msPerMonth = msPerDay * 30;
                        var msPerYear = msPerDay * 365;

                        if (diff < msPerMinute) {
                            time = Math.round(diff / 1000);
                            createdAgo = mw.message("timeago-second", time).text();
                        } else if (diff < msPerHour) {
                            time = Math.round(diff / msPerMinute);
                            createdAgo = mw.message("timeago-minute", time).text();
                        } else if (diff < msPerDay) {
                            time = Math.round(diff / msPerHour);
                            createdAgo = mw.message("timeago-hour", time).text();
                        } else {
                            time = Math.round(diff / msPerDay);
                            createdAgo = mw.message("timeago-day", time).text();
                        }

                        if (diff >= msPerMonth) {
                            if (diff < msPerYear) {
                                addtime = Math.round(diff / msPerMonth);
                                createdAgo += " (" + i18n.msg('dateAbout').plain() + " " + mw.message("timeago-month", addtime).text() + ")";
                            } else {
                                addtime = Math.round(diff / msPerYear);
                                createdAgo += " (" + i18n.msg('dateAbout').plain() + " " + mw.message("timeago-year", addtime).text() + ")";
                            }
                        }

                        return "<span title='" + dateSrc.toLocaleString(mw.config.get('wgContentLanguage'), {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric"
                        }) + "'>" + createdAgo + "</span>";
                    };

                    // do only if on specified page
                    if (mw.config.get("wgCanonicalNamespace") === "Special" && mw.config.get("wgTitle") === title) {

                        // get some query parameters
                        var url = new URL(window.location.href);

                        // create object for them
                        var urlContainer = {};

                        // "showrail" parameter | default: true
                        urlContainer.showrail = {};
                        if (url.searchParams.get('showrail') != null) {
                            urlContainer.showrail.value = JSON.parse(url.searchParams.get('showrail').toLowerCase());
                        } else {
                            urlContainer.showrail.value = true;
                        }
                        urlContainer.showrail.type = "bool";

                        // "debugmode" parameter | default: false
                        urlContainer.debugmode = {};
                        if (url.searchParams.get('debugmode') != null) {
                            urlContainer.debugmode.value = JSON.parse(url.searchParams.get('debugmode').toLowerCase());
                        } else {
                            urlContainer.debugmode.value = false;
                        }
                        urlContainer.debugmode.type = "bool";

                        // "separate" parameter | default: false
                        urlContainer.separate = {};
                        if (url.searchParams.get('separate') != null) {
                            urlContainer.separate.value = JSON.parse(url.searchParams.get('separate').toLowerCase());
                        } else {
                            urlContainer.separate.value = false;
                        }
                        urlContainer.separate.type = "bool";

                        // parse these parameters
                        for (i in urlContainer) {
                            switch (urlContainer[i].type) {
                                case "bool":
                                    switch (urlContainer[i].value) {
                                        case 1:
                                        case true:
                                            urlContainer[i].value = true;
                                            break
                                        case 0:
                                        case false:
                                            urlContainer[i].value = false;
                                            break
                                    }
                                    break
                            }
                        }

                        // change title of the page
                        document.title = title + " | " + mw.config.get("wgSiteName") + " | Fandom";
                        document.querySelector(".page-header__title").innerHTML = title;

                        // mainspace
                        var ms = document.getElementById("mw-content-text");
                        ms.className += "multipleActivity";
                        ms.id += " multipleActivity";
                        ms.innerHTML = "";

                        ms.style.display = "flex";
                        ms.style.justifyContent = "space-between";
                        ms.style.position = "relative";

                        // content of mainspace
                        var msContent = document.createElement("div");
                        msContent.id = "ma_msContent";

                        msContent.style.minHeight = "500px";

                        if (urlContainer.showrail.value === true) {
                            msContent.style.width = "calc(100% - 320px)";
                        } else {
                            msContent.style.width = "100%";
                        }

                        // rail of mainspace
                        var msRail = document.createElement("div");
                        msRail.id = "ma_msRail";

                        msRail.style.display = "flex";
                        msRail.style.flexDirection = "column";
                        msRail.style.minHeight = "500px";
                        msRail.style.width = "300px";

                        // they should be the same while preloading
                        msContent.style.background = msRail.style.background = "rgba(186, 205, 216, 0.2)";
                        msContent.style.borderRadius = msRail.style.borderRadius = "10px";

                        // add content & rail to mainspace
                        ms.appendChild(msContent);
                        if (urlContainer.showrail.value === true) {
                            ms.appendChild(msRail);
                        }

                        var i = 0;
                        var contentSpace = [];

                        // do...
                        ma_getRecentChanges().then(
                            function (changes) {
                                // ...some...
                                ma_getDiscussionsPosts().then(
                                    function (posts) {
                                        // ...requests
                                        ma_getLogEvents().then(
                                            function (logs) {

                                                // merge 2 arrays together
                                                var multipleArray = changes.concat(posts);

                                                // sort them by timestamp
                                                multipleArray.sort(function (a, b) {
                                                    if (a.timestamp > b.timestamp) {
                                                        return -1;
                                                    }

                                                    if (a.timestamp < b.timestamp) {
                                                        return 1;
                                                    }
                                                })

                                                // crop to 100
                                                arrayLength = 100;
                                                if (multipleArray.length > arrayLength) multipleArray.length = arrayLength;

                                                // debug
                                                if (urlContainer.debugmode.value === true) {
                                                    console.log("Array of events:");
                                                    console.log(multipleArray);

                                                    console.log("Array of logs:");
                                                    console.log(logs);

                                                    console.log("URL parameters:");
                                                    console.log(urlContainer);
                                                }


                                                if (urlContainer.showrail.value === true) {
                                                    // a little bit more requests
                                                    ma_getRailInfo().then(
                                                        function (rail) {
                                                            // best users of all time ngl
                                                            var topUsers = rail.wikiDetails.topUsers;

                                                            // best articles as well
                                                            var topArticles = rail.topArticles;
                                                            if (topArticles.length > 5) topArticles.length = 5;

                                                            var topUsersBlock = document.createElement("div");
                                                            topUsersBlock.className = "wds-avatar-stack";
                                                            topUsersBlock.id = "ma_topUsersBlock";

                                                            topUsersBlock.style.justifyContent = "center";
                                                            topUsersBlock.style.margin = "0";

                                                            msRail.appendChild(topUsersBlock);

                                                            // wiki data
                                                            var wikiTitle = document.createElement("div");
                                                            wikiTitle.id = "ma_wikiTitle";
                                                            wikiTitle.className = "wds-midlight-aqua";
                                                            wikiTitle.innerHTML = rail.wikiVariables.name;

                                                            wikiTitle.style.fontWeight = "bold";
                                                            wikiTitle.style.textAlign = "center";
                                                            wikiTitle.style.fontFamily = "Rubik, sans-serif";
                                                            wikiTitle.style.fontSize = "19px";
                                                            wikiTitle.style.margin = "5px auto";

                                                            msRail.appendChild(wikiTitle);

                                                            var wikiStatsBlock = document.createElement("div");
                                                            wikiStatsBlock.id = "ma_wikiStatsBlock";

                                                            wikiStatsBlock.style.textAlign = "center";
                                                            wikiStatsBlock.style.display = "flex";
                                                            wikiStatsBlock.style.justifyContent = "space-around";
                                                            wikiStatsBlock.style.fontFamily = "Rubik, sans-serif";

                                                            msRail.appendChild(wikiStatsBlock);

                                                            var wikiStatsBlock_Edits = document.createElement("div");
                                                            var wikiStatsBlock_Pages = document.createElement("div");

                                                            wikiStatsBlock.appendChild(wikiStatsBlock_Edits);
                                                            wikiStatsBlock.appendChild(wikiStatsBlock_Pages);

                                                            var wikiStatsBlock_EditsValue = document.createElement("div");
                                                            var wikiStatsBlock_EditsText = document.createElement("div");

                                                            var wikiStatsBlock_PagesValue = document.createElement("div");
                                                            var wikiStatsBlock_PagesText = document.createElement("div");

                                                            wikiStatsBlock_EditsValue.innerHTML = Number(rail.wikiDetails.editCount).toLocaleString();
                                                            wikiStatsBlock_PagesValue.innerHTML = Number(rail.wikiDetails.pageCount).toLocaleString();

                                                            wikiStatsBlock_EditsValue.style.fontWeight = wikiStatsBlock_PagesValue.style.fontWeight = "bold";

                                                            wikiStatsBlock_EditsText.innerHTML = i18n.msg('edits').plain();
                                                            wikiStatsBlock_PagesText.innerHTML = i18n.msg('pages').plain();

                                                            wikiStatsBlock_EditsText.style.color = wikiStatsBlock_PagesText.style.color = "#5f7a7b";
                                                            wikiStatsBlock_EditsText.style.fontSize = wikiStatsBlock_PagesText.style.fontSize = "10px";
                                                            wikiStatsBlock_EditsText.style.fontWeight = wikiStatsBlock_PagesText.style.fontWeight = "500";
                                                            wikiStatsBlock_EditsText.style.letterSpacing = wikiStatsBlock_PagesText.style.letterSpacing = ".5px";
                                                            wikiStatsBlock_EditsText.style.lineHeight = wikiStatsBlock_PagesText.style.lineHeight = "1.2";
                                                            wikiStatsBlock_EditsText.style.textTransform = wikiStatsBlock_PagesText.style.textTransform = "uppercase";

                                                            wikiStatsBlock_Edits.appendChild(wikiStatsBlock_EditsValue);
                                                            wikiStatsBlock_Edits.appendChild(wikiStatsBlock_EditsText);

                                                            wikiStatsBlock_Pages.appendChild(wikiStatsBlock_PagesValue);
                                                            wikiStatsBlock_Pages.appendChild(wikiStatsBlock_PagesText);

                                                            for (i in topUsers) {
                                                                var topUsersAvatar = document.createElement("div");
                                                                topUsersAvatar.className = "wds-avatar";
                                                                topUsersAvatar.id = "ma_topUsersAvatar_" + i;

                                                                var topUsersLink = document.createElement("a");
                                                                topUsersLink.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/User:" + topUsers[i].name;
                                                                topUsersLink.title = topUsers[i].name;
                                                                topUsersAvatar.appendChild(topUsersLink)

                                                                var topUsersImage = document.createElement("div");
                                                                topUsersImage.className = "wds-avatar__image";

                                                                if (topUsers[i].avatarUrl != "") {
                                                                    topUsersImage.style.backgroundImage = "url(" + topUsers[i].avatarUrl + ")";
                                                                    topUsersImage.style.border = "2px solid #bed1cf";
                                                                    topUsersImage.style.width = "40px";
                                                                    topUsersImage.style.height = "40px";
                                                                } else {
                                                                    topUsersImage.style.filter = "invert(.5)";
                                                                    topUsersImage.style.backgroundImage = "url('/resources-ucp/dist/svg/wds-icons-avatar.svg')";
                                                                    topUsersImage.style.width = "38px";
                                                                    topUsersImage.style.height = "38px";
                                                                }
                                                                topUsersImage.style.backgroundSize = "100%";

                                                                topUsersLink.appendChild(topUsersImage)

                                                                topUsersBlock.appendChild(topUsersAvatar)
                                                            }

                                                            var topArticlesBlock = document.createElement("div");
                                                            topArticlesBlock.id = "topArticlesBlock";
                                                            topUsersBlock.style.width = "100%";

                                                            msRail.appendChild(topArticlesBlock)

                                                            for (i in topArticles) {
                                                                var topArticlesEach = document.createElement("div");
                                                                topArticlesEach.id = "ma_topArticlesEach_" + i;

                                                                topArticlesEach.style.padding = "6px";
                                                                topArticlesEach.style.borderRadius = "5px";
                                                                topArticlesEach.style.border = "1px solid rgba(191, 191, 191, 0.5)";
                                                                topArticlesEach.style.textDecoration = "none";
                                                                topArticlesEach.style.marginTop = "10px";
                                                                topArticlesEach.style.background = "rgba(186, 205, 216, 0.1)";

                                                                var topArticlesLink = document.createElement("a");
                                                                topArticlesLink.href = mw.config.get("wgServer") + topArticles[i].url;
                                                                topArticlesLink.title = topArticles[i].title;
                                                                topArticlesEach.appendChild(topArticlesLink);

                                                                topArticlesLink.style.display = "flex";
                                                                topArticlesLink.style.flexDirection = "row";

                                                                var topArticlesImage = document.createElement("div");

                                                                topArticlesImage.style.background = "black";
                                                                topArticlesImage.style.backgroundImage = "url(" + topArticles[i].image + ")";
                                                                topArticlesImage.style.width = "50px";
                                                                topArticlesImage.style.height = "50px";
                                                                topArticlesImage.style.backgroundSize = "cover";
                                                                topArticlesImage.style.borderRadius = "5px";

                                                                var topArticlesText = document.createElement("span");
                                                                topArticlesText.innerHTML = topArticles[i].title;

                                                                topArticlesText.style.margin = "auto 0 auto 10px";
                                                                topArticlesText.style.fontFamily = "Rubik, sans-serif";
                                                                topArticlesText.style.maxWidth = "220px";

                                                                topArticlesLink.appendChild(topArticlesImage)
                                                                topArticlesLink.appendChild(topArticlesText)

                                                                topArticlesBlock.appendChild(topArticlesEach)
                                                            }

                                                            ma_getCommunityCorner().then(
                                                                function (cc) {
                                                                    var communityCornerTitle = document.createElement("div");
                                                                    communityCornerTitle.id = "ma_communityCornerTitle";
                                                                    communityCornerTitle.innerHTML = i18n.msg('communityCorner').plain();

                                                                    communityCornerTitle.style.fontWeight = "bold";
                                                                    communityCornerTitle.style.margin = "20px 0 5px 0";
                                                                    communityCornerTitle.style.fontSize = "18px";

                                                                    var communityCorner = document.createElement("div");
                                                                    communityCorner.id = "ma_communityCorner";
                                                                    communityCorner.innerHTML = cc;

                                                                    communityCorner.style.fontSize = "13px";
                                                                    communityCorner.style.background = "rgba(186, 205, 216, 0.2)";
                                                                    communityCorner.style.padding = "10px";
                                                                    communityCorner.style.borderRadius = "10px";

                                                                    msRail.appendChild(communityCornerTitle);
                                                                    msRail.appendChild(communityCorner);
                                                                }
                                                            )
                                                        }
                                                    )
                                                }

                                                // ¯\_(ツ)_/¯
                                                function theLoopa() {
                                                    if (i < arrayLength) {
                                                        return new Promise(function (resolve) {
                                                            var sizeNumber = multipleArray[i].newlen - multipleArray[i].oldlen;
                                                            var sizeColor;

                                                            if (sizeNumber < 0) {
                                                                sizeColor = "red";
                                                            } else if (sizeNumber > 0) {
                                                                sizeColor = "limegreen";
                                                            } else {
                                                                sizeColor = "gray";
                                                            }

                                                            if (sizeNumber > 0) {
                                                                sizeNumber = "+" + sizeNumber.toLocaleString();
                                                            }

                                                            var date = new Date(multipleArray[i].timestamp * 1000)

                                                            contentSpace[i] = document.createElement("div");
                                                            contentSpace[i].id = "ma_contentSpace_" + i;

                                                            contentSpace[i].style.display = "flex";
                                                            contentSpace[i].style.flexDirection = "row";
                                                            contentSpace[i].style.position = "relative";
                                                            contentSpace[i].style.padding = "12px";
                                                            contentSpace[i].style.borderRadius = "5px";
                                                            contentSpace[i].style.border = "1px solid #bfbfbf80";
                                                            contentSpace[i].style.textDecoration = "none";
                                                            contentSpace[i].style.marginTop = "10px";
                                                            contentSpace[i].style.background = "rgba(186,205,216,0.1)";
                                                            contentSpace[i].style.backdropFilter = "blur(40px)";

                                                            var contentSpace_Icon = document.createElement("div");
                                                            var contentSpace_Info = document.createElement("div");

                                                            contentSpace_Icon.id = "ma_contentSpace_icon_" + i;
                                                            contentSpace_Icon.className = "ma_contentSpace_icon";

                                                            var contentSpace_IconImage = document.createElement("div");
                                                            contentSpace_IconImage.className = "ma_icon_bg";

                                                            var contentSpace_IconImageSrc = document.createElement("div");
                                                            contentSpace_IconImageSrc.className = "ma_icon_src";

                                                            contentSpace_Icon.style.width = "35px";

                                                            contentSpace_IconImage.style.width = "25px";
                                                            contentSpace_IconImage.style.height = "25px";
                                                            contentSpace_IconImage.style.background = "gray";
                                                            contentSpace_IconImage.style.borderRadius = "20px";

                                                            contentSpace_IconImageSrc.style.width = "25px";
                                                            contentSpace_IconImageSrc.style.height = "25px";
                                                            contentSpace_IconImageSrc.style.backgroundPosition = "center";
                                                            contentSpace_IconImageSrc.style.backgroundSize = "50%";
                                                            contentSpace_IconImageSrc.style.backgroundRepeat = "no-repeat";
                                                            contentSpace_IconImageSrc.style.filter = "invert(1)"

                                                            contentSpace_Info.id = "ma_contentSpace_info_" + i;
                                                            contentSpace_Info.className = "ma_contentSpace_info";
                                                            contentSpace_Info.style.display = "flex";
                                                            contentSpace_Info.style.flexDirection = "column";
                                                            contentSpace_Info.style.width = "100%";

                                                            contentSpace[i].appendChild(contentSpace_Icon);
                                                            contentSpace_Icon.appendChild(contentSpace_IconImage);
                                                            contentSpace_IconImage.appendChild(contentSpace_IconImageSrc);
                                                            contentSpace[i].appendChild(contentSpace_Info);

                                                            function dataFormatted(strong, em) {
                                                                return "<strong>" + strong + ":</strong> <em>" + em + "</em>";
                                                            }

                                                            function icon(icon) {
                                                                return "url('/resources-ucp/dist/svg/wds-icons-" + icon + "-small.svg')"
                                                            }

                                                            // check the type of element
                                                            // if the type is "change"
                                                            if (multipleArray[i].rel == "change") {

                                                                contentSpace[i].className = "ma_contentSpace_change";

                                                                var contentSpace_Title = document.createElement("span");
                                                                contentSpace_Title.className = "ma_contentSpace_title";

                                                                var contentSpace_EditedBy = document.createElement("span");
                                                                contentSpace_EditedBy.className = "ma_contentSpace_subtitle";

                                                                var contentSpace_SizeAndTime = document.createElement("span");
                                                                contentSpace_SizeAndTime.className = "ma_contentSpace_time";

                                                                var contentSpace_Separator = document.createElement("hr");
                                                                contentSpace_Separator.className = "ma_contentSpace_separator";

                                                                var contentSpace_Text = document.createElement("span");
                                                                contentSpace_Text.className = "ma_contentSpace_text";

                                                                contentSpace_Title.style.fontWeight = "bold";
                                                                contentSpace_Title.innerHTML = "<a href='" + mw.config.get("wgScriptPath") + "/wiki/" + multipleArray[i].title + "'>" + multipleArray[i].title + "</a>";

                                                                var editType, logsCase, addData, commentType;

                                                                switch (multipleArray[i].type) {
                                                                    case "edit":
                                                                        contentSpace[i].className += " ma_change_edit";
                                                                        contentSpace_IconImage.style.background = "#0094FF";
                                                                        contentSpace_IconImageSrc.style.backgroundImage = icon("pencil");
                                                                        editType = i18n.msg('type_edit').plain();
                                                                        commentType = i18n.msg('summary').plain();
                                                                        break

                                                                    case "new":
                                                                        contentSpace[i].className += " ma_change_new"
                                                                        contentSpace_IconImage.style.background = "limegreen";
                                                                        contentSpace_IconImageSrc.style.backgroundImage = icon("add");
                                                                        editType = i18n.msg('type_new').plain();
                                                                        commentType = i18n.msg('summary').plain();
                                                                        break

                                                                    case "log":
                                                                        logsCase = logs.filter(function (x) {
                                                                            return x.timestamp == multipleArray[i].timestamp
                                                                        })

                                                                        logsCase = logsCase.filter(function (x) {
                                                                            return x.comment == multipleArray[i].comment
                                                                        })

                                                                        switch (logsCase[0].action) {
                                                                            case "delete_redir":
                                                                            case "delete":
                                                                                contentSpace[i].className += " ma_change_delete"
                                                                                contentSpace_IconImage.style.background = "red";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("trash");
                                                                                editType = i18n.msg('type_delete').plain();
                                                                                commentType = i18n.msg('summary').plain();
                                                                                break
                                                                            case "restore":
                                                                                contentSpace[i].className += " ma_change_restore"
                                                                                contentSpace_IconImage.style.background = "green";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("trash-open");
                                                                                editType = i18n.msg('type_restore').plain();
                                                                                commentType = i18n.msg('summary').plain();
                                                                                break
                                                                            case "move_prot":
                                                                            case "protect":
                                                                                contentSpace[i].className += " ma_change_protect"
                                                                                contentSpace_IconImage.style.background = "black";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("flag");
                                                                                editType = i18n.msg('type_protect').plain();
                                                                                commentType = i18n.msg('summary').plain();
                                                                                if (logsCase[0].action != "move_prot") addData = dataFormatted(i18n.msg('parameters').plain(), logsCase[0].params.description);
                                                                                break
                                                                            case "unprotect":
                                                                                contentSpace[i].className += " ma_change_unprotect"
                                                                                contentSpace_IconImage.style.background = "black";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("flag");
                                                                                editType = i18n.msg('type_unprotect').plain();
                                                                                commentType = i18n.msg('summary').plain();
                                                                                break
                                                                            case "move_redir":
                                                                            case "move":
                                                                                contentSpace[i].className += " ma_change_move"
                                                                                contentSpace_IconImage.style.background = "blue";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("refresh");
                                                                                editType = i18n.msg('type_move').plain();
                                                                                commentType = i18n.msg('summary').plain();
                                                                                addData = dataFormatted(i18n.msg('newName').plain(), logsCase[0].params.target_title);
                                                                                break
                                                                            case "block":
                                                                                contentSpace[i].className += " ma_change_block"
                                                                                contentSpace_IconImage.style.background = "darkorange";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("lock");
                                                                                editType = i18n.msg('type_block').plain();
                                                                                commentType = i18n.msg('reason').plain();
                                                                                addData = dataFormatted(i18n.msg('duration').plain(), logsCase[0].params.duration);
                                                                                break
                                                                            case "unblock":
                                                                                contentSpace[i].className += " ma_change_unblock"
                                                                                contentSpace_IconImage.style.background = "darkcyan";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("unlock");
                                                                                editType = i18n.msg('type_unblock').plain();
                                                                                commentType = i18n.msg('reason').plain();
                                                                                break
                                                                            case "rights":
                                                                                contentSpace[i].className += " ma_change_rights"
                                                                                contentSpace_IconImage.style.background = "darkkhaki";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("users");
                                                                                editType = i18n.msg('type_rights').plain();
                                                                                commentType = i18n.msg('reason').plain();

                                                                                var oldgroups, newgroups;

                                                                                if (logsCase[0].params.oldgroups.length == 0) {
                                                                                    oldgroups = i18n.msg('rightsNone').plain();
                                                                                } else {
                                                                                    oldgroups = logsCase[0].params.oldgroups.join(", ");
                                                                                }

                                                                                if (logsCase[0].params.newgroups.length == 0) {
                                                                                    newgroups = i18n.msg('rightsNone').plain();
                                                                                } else {
                                                                                    newgroups = logsCase[0].params.newgroups.join(", ");
                                                                                }

                                                                                addData = dataFormatted(i18n.msg('rightsOld').plain(), oldgroups) + "<br>" + dataFormatted(i18n.msg('rightsNew').plain(), newgroups);;
                                                                                break
                                                                            case "avatar_chn":
                                                                                contentSpace[i].className += " ma_change_avatar_chn"
                                                                                contentSpace_IconImage.style.background = "darkslategray";
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("user");
                                                                                editType = i18n.msg('type_avatar_chn').plain();
                                                                                break
                                                                        }
                                                                        break
                                                                }

                                                                contentSpace_EditedBy.style.fontSize = "15px";
                                                                contentSpace_EditedBy.innerHTML = editType + " <a href='" + mw.config.get("wgScriptPath") + "/wiki/User:" + multipleArray[i].user + "'>" + multipleArray[i].user + "</a>";
                                                                if (multipleArray[i].type == "edit") {
                                                                    contentSpace_EditedBy.innerHTML += " <a href='" + mw.config.get("wgScriptPath") + "/wiki/" + multipleArray[i].title + "?diff=" + multipleArray[i].revid + "&oldid=" + multipleArray[i].old_revid + "'>(" + i18n.msg('diff').plain() + ")</a>"
                                                                }

                                                                var sizeText = "<span style='cursor: help; color: " + sizeColor + "' title='" + i18n.msg('before').plain() + ": " + multipleArray[i].oldlen.toLocaleString() + "; " + i18n.msg('after').plain() + ": " + multipleArray[i].newlen.toLocaleString() + "'>" + sizeNumber.toLocaleString() + "</span>" + " • ";

                                                                if (multipleArray[i].type == "log") {
                                                                    contentSpace_SizeAndTime.innerHTML = timeAgo(date);
                                                                } else {
                                                                    contentSpace_SizeAndTime.innerHTML = sizeText + timeAgo(date);
                                                                }

                                                                contentSpace_Separator.style.width = "100%";

                                                                if (addData && !multipleArray[i].parsedcomment) {
                                                                    contentSpace_Text.innerHTML = addData;
                                                                } else if (!addData && multipleArray[i].parsedcomment) {
                                                                    contentSpace_Text.innerHTML = dataFormatted(commentType, multipleArray[i].parsedcomment);
                                                                } else if (addData && multipleArray[i].parsedcomment) {
                                                                    contentSpace_Text.innerHTML = dataFormatted(commentType, multipleArray[i].parsedcomment) + "<br>" + addData;
                                                                }

                                                                contentSpace_Info.appendChild(contentSpace_Title);
                                                                contentSpace_Info.appendChild(contentSpace_EditedBy);
                                                                contentSpace_Info.appendChild(contentSpace_SizeAndTime);
                                                                if (contentSpace_Text.innerHTML) {
                                                                    contentSpace_Info.appendChild(contentSpace_Separator);
                                                                    contentSpace_Info.appendChild(contentSpace_Text);
                                                                }

                                                            }
                                                            // if the type is "post"
                                                            else if (multipleArray[i].rel == "post") {

                                                                // parse some content
                                                                function parsePostContent(paragraph) {
                                                                    var parArray = [];
                                                                    var i = 0;

                                                                    // the one
                                                                    switch (paragraph.type) {
                                                                        // if is just a simple text you see every day of your pretty boring life
                                                                        case "paragraph":
                                                                            if (paragraph.content) {
                                                                                // another one
                                                                                while (i < paragraph.content.length) {
                                                                                    if (paragraph.content[i].type == "text") {
                                                                                        if (paragraph.content[i].marks) {
                                                                                            switch (paragraph.content[i].marks[0].type) {
                                                                                                case "link":
                                                                                                    parArray.push(paragraph.content[i].text);
                                                                                                    break
                                                                                                case "strong":
                                                                                                    parArray.push("<strong>" + paragraph.content[i].text + "</strong>");
                                                                                                    break
                                                                                                case "em":
                                                                                                    parArray.push("<em>" + paragraph.content[i].text + "</em>");
                                                                                                    break
                                                                                            }
                                                                                        } else if (!paragraph.content[i].marks) {
                                                                                            parArray.push(paragraph.content[i].text)
                                                                                        }
                                                                                    }
                                                                                    i++
                                                                                }
                                                                            }
                                                                            break
                                                                            // if is code
                                                                        case "code_block":
                                                                            if (paragraph.content) {
                                                                                // another one
                                                                                while (i < paragraph.content.length) {
                                                                                    if (paragraph.content[i].type == "text") {
                                                                                        parArray.push(paragraph.content[i].text)
                                                                                    }
                                                                                    i++
                                                                                }
                                                                            }
                                                                            break
                                                                            // if is list
                                                                        case "bulletList":
                                                                        case "orderedList":
                                                                            if (paragraph.content) {
                                                                                // another one
                                                                                while (i < paragraph.content.length) {
                                                                                    if (paragraph.content[i].type == "listItem") {
                                                                                        e = 0;
                                                                                        // another one
                                                                                        while (e < paragraph.content[i].content.length) {
                                                                                            if (paragraph.content[i].content[e].type == "paragraph") {
                                                                                                a = 0;
                                                                                                // and another one
                                                                                                while (a < paragraph.content[i].content[e].content.length) {
                                                                                                    if (paragraph.content[i].content[e].content[a].type == "text") {
                                                                                                        parArray.push(paragraph.content[i].content[e].content[a].text + " ")
                                                                                                    }
                                                                                                    a++
                                                                                                }
                                                                                            }
                                                                                            e++
                                                                                        }
                                                                                    }
                                                                                    i++
                                                                                }
                                                                            }
                                                                            break
                                                                    }

                                                                    return parArray.join("");
                                                                }

                                                                // get some content
                                                                function getPostContent(content) {
                                                                    var postData = JSON.parse(content);

                                                                    postArray = [];
                                                                    var i = 0;
                                                                    while (i < postData.content.length) {
                                                                        postArray.push(parsePostContent(postData.content[i]));
                                                                        i++
                                                                    }
                                                                    var postString = postArray.join(" ");
                                                                    if (postString.length > 250) {
                                                                        postString = postString.substring(0, 251) + "...";
                                                                    }
                                                                    return postString;
                                                                }

                                                                // since comments & wall messages can be leaved even by anonymous users
                                                                function getPostAuthor(postContent) {
                                                                    if (postContent.createdBy.name != null) {
                                                                        return postContent.createdBy.name;
                                                                    } else {
                                                                        return postContent.creatorIp.replace("/", "");
                                                                    }
                                                                }

                                                                //get some pretty good (no) pictures
                                                                function getPostPictures(attachedImages) {
                                                                    attachedImages = attachedImages._embedded.contentImages;

                                                                    if (attachedImages.length > 0) {
                                                                        var postImages = document.createElement("div");
                                                                        postImages.style.display = "flex";
                                                                        postImages.style.flexWrap = "wrap";

                                                                        var cuttedCount;
                                                                        if (attachedImages.length > 5) {
                                                                            cuttedCount = attachedImages.length - 5;
                                                                            attachedImages.length = 5;
                                                                        }

                                                                        for (a in attachedImages) {
                                                                            if (attachedImages[a].mediaType == "image/png" || attachedImages[a].mediaType == "image/jpeg" || attachedImages[a].mediaType == "image/gif" || attachedImages[a].mediaType == null) {
                                                                                var postImagesEach = document.createElement("a");
                                                                                postImagesEach.style.marginRight = "10px";
                                                                                postImagesEach.style.marginTop = "10px";
                                                                                postImagesEach.style.display = "block";

                                                                                if (a < 4) {
                                                                                    postImagesEach.href = attachedImages[a].url;

                                                                                    var postImagesEachImg = document.createElement("img");
                                                                                    postImagesEachImg.src = attachedImages[a].url;
                                                                                    postImagesEachImg.style.maxWidth = "130px";
                                                                                    postImagesEachImg.style.maxHeight = "100px";
                                                                                    postImagesEachImg.style.borderRadius = "5px";

                                                                                    postImagesEach.appendChild(postImagesEachImg);
                                                                                } else {
                                                                                    postImagesEach.href = mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[i].threadId;

                                                                                    var postImagesEachMore = document.createElement("div");
                                                                                    postImagesEachMore.style.width = "130px";
                                                                                    postImagesEachMore.style.height = "100px";
                                                                                    postImagesEachMore.style.borderRadius = "5px";
                                                                                    postImagesEachMore.style.background = "url(" + attachedImages[a].url + ")";
                                                                                    postImagesEachMore.style.backgroundSize = "cover";

                                                                                    var postImagesEachIndicator = document.createElement("div");

                                                                                    postImagesEachIndicator.style.width = "130px";
                                                                                    postImagesEachIndicator.style.height = "100px";
                                                                                    postImagesEachIndicator.style.borderRadius = "5px";
                                                                                    postImagesEachIndicator.style.backdropFilter = "blur(5px)";
                                                                                    postImagesEachIndicator.style.background = "#1115";
                                                                                    postImagesEachIndicator.style.textAlign = "center";
                                                                                    postImagesEachIndicator.style.lineHeight = "100px";
                                                                                    postImagesEachIndicator.style.fontWeight = "bold";
                                                                                    postImagesEachIndicator.style.fontSize = "20px";
                                                                                    postImagesEachIndicator.style.color = "white";

                                                                                    postImagesEachIndicator.innerHTML = "+" + (cuttedCount + 1);

                                                                                    postImagesEach.appendChild(postImagesEachMore);
                                                                                    postImagesEachMore.appendChild(postImagesEachIndicator);
                                                                                }
                                                                                postImages.appendChild(postImagesEach);
                                                                            }
                                                                        }
                                                                        return postImages
                                                                    }
                                                                }

                                                                contentSpace[i].className = "ma_contentSpace_social";

                                                                var contentSpace_Title = document.createElement("span");
                                                                contentSpace_Title.className = "ma_contentSpace_title";

                                                                var contentSpace_Author = document.createElement("span");
                                                                contentSpace_Author.className = "ma_contentSpace_subtitle";

                                                                var contentSpace_Time = document.createElement("span");
                                                                contentSpace_Time.className = "ma_contentSpace_time";

                                                                var contentSpace_Separator = document.createElement("hr");
                                                                contentSpace_Separator.className = "ma_contentSpace_separator";

                                                                var contentSpace_Text = document.createElement("span");
                                                                contentSpace_Text.className = "ma_contentSpace_text";

                                                                contentSpace_Title.style.fontWeight = "bold";
                                                                contentSpace_Author.style.fontSize = "15px";
                                                                contentSpace_Separator.style.width = "100%";

                                                                // check the type of the post
                                                                switch (multipleArray[i]._embedded.thread[0].containerType) {
                                                                    // if the type is discussions post
                                                                    case "FORUM":
                                                                        contentSpace[i].className += " ma_change_forum"
                                                                        contentSpace_IconImage.style.background = "purple";

                                                                        var messageType;
                                                                        switch (multipleArray[i].isReply) {
                                                                            case true:
                                                                                contentSpace_IconImageSrc.style.backgroundImage = icon("bubble");
                                                                                messageType = i18n.msg('type_forum_reply').plain()
                                                                                break
                                                                            case false:
                                                                                if (!multipleArray[i].poll) {
                                                                                    contentSpace_IconImageSrc.style.backgroundImage = icon("bubble");
                                                                                    messageType = i18n.msg('type_forum_new').plain()
                                                                                } else {
                                                                                    contentSpace_IconImageSrc.style.backgroundImage = icon("poll");
                                                                                    messageType = i18n.msg('type_forum_poll').plain()
                                                                                }
                                                                                break
                                                                        }
                                                                        contentSpace_Title.innerHTML = "<a href='" + mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[i].threadId + "'>" + multipleArray[i]._embedded.thread[0].title + "</a>";

                                                                        var postLinkParameters = "/f/p/" + multipleArray[i].threadId;
                                                                        if (multipleArray[i].isReply) postLinkParameters += "/r/" + multipleArray[i].id;

                                                                        contentSpace_Author.innerHTML = messageType + " <a href='" + mw.config.get("wgScriptPath") + "/wiki/User:" + getPostAuthor(multipleArray[i]) + "'>" + getPostAuthor(multipleArray[i]) + "</a> <a href='" + mw.config.get("wgScriptPath") + postLinkParameters + "'>(" + i18n.msg('view').plain() + ")</a>";

                                                                        if (!multipleArray[i].isReply) {
                                                                            contentSpace_Author.innerHTML += " " + i18n.msg('inCategory', multipleArray[i].forumName).plain();
                                                                        }

                                                                        contentSpace_Time.innerHTML = timeAgo(new Date(multipleArray[i].timestamp * 1000));
                                                                        if (multipleArray[i].jsonModel && multipleArray[i].jsonModel != "" && multipleArray[i].jsonModel != null && !multipleArray[i].poll) {
                                                                            content = getPostContent(multipleArray[i].jsonModel).replace(/\s/g, '')
                                                                            if (content.length != 0) contentSpace_Text.innerHTML = dataFormatted(i18n.msg('text').plain(), getPostContent(multipleArray[i].jsonModel))
                                                                        } else if (multipleArray[i].poll) {
                                                                            var pollAnswers = document.createElement("div");
                                                                            contentSpace_Text.appendChild(pollAnswers)
                                                                            pollAnswers = getPoll()
                                                                        }

                                                                        // get some poll info
                                                                        function getPoll() {
                                                                            poll = multipleArray[i].poll;
                                                                            for (a in poll.answers) {
                                                                                var percentage = (poll.answers[a].votes / poll.totalVotes) * 100;

                                                                                var pollAnswers_Each = document.createElement("div");
                                                                                pollAnswers_Each.id = "ma_pollAnswers_Each_" + a;

                                                                                pollAnswers_Each.style.height = "35px";
                                                                                pollAnswers_Each.style.borderRadius = "5px";
                                                                                pollAnswers_Each.style.marginTop = "5px";
                                                                                pollAnswers_Each.style.overflow = "hidden";
                                                                                pollAnswers_Each.style.border = "1px solid rgba(191, 191, 191, 0.5)";
                                                                                pollAnswers_Each.style.background = "rgba(186, 205, 216, 0.1)";
                                                                                pollAnswers_Each.style.backgroundClip = "padding-box"

                                                                                var pollAnswers_EachText = document.createElement("div");
                                                                                pollAnswers_EachText.innerHTML = multipleArray[i].poll.answers[a].text;

                                                                                var pollAnswers_EachData = document.createElement("div");
                                                                                pollAnswers_EachData.innerHTML = percentage + "% • " + multipleArray[i].poll.answers[a].votes;

                                                                                pollAnswers_EachData.style.padding = pollAnswers_EachText.style.padding = "0 5px";
                                                                                pollAnswers_EachData.style.background = pollAnswers_EachText.style.background = "#12121288";
                                                                                pollAnswers_EachData.style.color = pollAnswers_EachText.style.color = "white";
                                                                                pollAnswers_EachData.style.borderRadius = pollAnswers_EachText.style.borderRadius = "5px";
                                                                                pollAnswers_EachData.style.padding = pollAnswers_EachText.style.padding = "3px 8px";
                                                                                pollAnswers_EachData.style.position = pollAnswers_EachText.style.position = "relative";
                                                                                pollAnswers_EachData.style.top = pollAnswers_EachText.style.top = "4px";
                                                                                pollAnswers_EachData.style.display = pollAnswers_EachText.style.display = "inline-block";
                                                                                pollAnswers_EachData.style.fontSize = pollAnswers_EachText.style.fontSize = "15px";

                                                                                pollAnswers_EachText.style.left = "10px";
                                                                                pollAnswers_EachText.style.fontWeight = "bold";

                                                                                pollAnswers_EachData.style.right = "10px"
                                                                                pollAnswers_EachData.style.float = "right"

                                                                                pollAnswers.appendChild(pollAnswers_Each);
                                                                                pollAnswers_Each.appendChild(pollAnswers_EachText);

                                                                                if (poll.userVotes != null) {
                                                                                    pollAnswers_Each.style.backgroundImage = "linear-gradient(90deg, var(--themed-link-color) " + percentage + "%, transparent " + percentage + "%)";
                                                                                    pollAnswers_Each.appendChild(pollAnswers_EachData);
                                                                                }
                                                                            }
                                                                            return pollAnswers;
                                                                        }

                                                                        contentSpace_Info.appendChild(contentSpace_Title);
                                                                        contentSpace_Info.appendChild(contentSpace_Author);
                                                                        contentSpace_Info.appendChild(contentSpace_Time);

                                                                        if (multipleArray[i].jsonModel != null) {
                                                                            var contentText = getPostContent(multipleArray[i].jsonModel).replace(/\s/g, "");
                                                                        } else {
                                                                            contentText = "";
                                                                        }

                                                                        var contentImages = getPostPictures(multipleArray[i]);

                                                                        if (contentText.length != 0 || contentImages != undefined) {
                                                                            contentSpace_Info.appendChild(contentSpace_Separator);

                                                                            if (contentText.length != 0) {
                                                                                contentSpace_Text.innerHTML = dataFormatted(i18n.msg('text').plain(), getPostContent(multipleArray[i].jsonModel))
                                                                            }

                                                                            if (contentImages != undefined) {
                                                                                contentSpace_Text.appendChild(contentImages);
                                                                            }
                                                                        }

                                                                        contentSpace_Info.appendChild(contentSpace_Text);

                                                                        getPostPictures(multipleArray[i])
                                                                        break
                                                                        // if the type is wall message
                                                                    case "WALL":
                                                                        contentSpace[i].className += " ma_change_wall"

                                                                        function getMessageWall(mw) {
                                                                            return mw = mw.substr(0, mw.length - 13);
                                                                        }

                                                                        contentSpace_IconImage.style.background = "purple";
                                                                        contentSpace_IconImageSrc.style.backgroundImage = icon("envelope");

                                                                        var messageType;
                                                                        switch (multipleArray[i].isReply) {
                                                                            case true:
                                                                                messageType = i18n.msg('type_wall_reply').plain()
                                                                                break
                                                                            case false:
                                                                                messageType = i18n.msg('type_wall_new').plain()
                                                                                break
                                                                        }

                                                                        contentSpace_Title.innerHTML = "<a href='" + mw.config.get("wgScriptPath") + "/wiki/Message_Wall:" + getMessageWall(multipleArray[i].forumName) + "?threadId=" + multipleArray[i].threadId + "'>" + multipleArray[i]._embedded.thread[0].title + "</a>";

                                                                        var wallLinkParameters = "?threadId=" + multipleArray[i].threadId;
                                                                        if (multipleArray[i].isReply) wallLinkParameters += "#" + multipleArray[i].id;

                                                                        var userWall = getMessageWall(multipleArray[i].forumName).replace(/_/g, ' ');
                                                                        contentSpace_Author.innerHTML = messageType + " <a href='" + mw.config.get("wgScriptPath") + "/wiki/User:" + getPostAuthor(multipleArray[i]) + "'>" + getPostAuthor(multipleArray[i]) + "</a>" + " " + i18n.msg('onWall').plain() + " <a href='" + mw.config.get("wgScriptPath") + "/wiki/Message_Wall:" + getMessageWall(multipleArray[i].forumName) + "'>" + i18n.msg('messageWall', userWall).plain() + "</a> <a href='" + mw.config.get("wgScriptPath") + "/wiki/Message_Wall:" + getMessageWall(multipleArray[i].forumName) + wallLinkParameters + "'>(" + i18n.msg('view').plain() + ")</a>";

                                                                        contentSpace_Time.innerHTML = timeAgo(new Date(multipleArray[i].timestamp * 1000));
                                                                        if (getPostContent(multipleArray[i].jsonModel) != "") {
                                                                            content = getPostContent(multipleArray[i].jsonModel).replace(/\s/g, '')
                                                                            if (content.length != 0) contentSpace_Text.innerHTML = dataFormatted(i18n.msg('text').plain(), getPostContent(multipleArray[i].jsonModel))
                                                                        }

                                                                        contentSpace_Info.appendChild(contentSpace_Title);
                                                                        contentSpace_Info.appendChild(contentSpace_Author);
                                                                        contentSpace_Info.appendChild(contentSpace_Time);

                                                                        var contentText = getPostContent(multipleArray[i].jsonModel).replace(/\s/g, '');
                                                                        var contentImages = getPostPictures(multipleArray[i]);

                                                                        if (contentText.length != 0 || contentImages != undefined) {
                                                                            contentSpace_Info.appendChild(contentSpace_Separator);

                                                                            if (contentText.length != 0) {
                                                                                contentSpace_Text.innerHTML = dataFormatted(i18n.msg('text').plain(), getPostContent(multipleArray[i].jsonModel))
                                                                            }

                                                                            if (contentImages != undefined) {
                                                                                contentSpace_Text.appendChild(contentImages);
                                                                            }
                                                                        }

                                                                        contentSpace_Info.appendChild(contentSpace_Text);
                                                                        break
                                                                        // if the type is article comment
                                                                    case "ARTICLE_COMMENT":
                                                                        contentSpace[i].className += " ma_change_comment"
                                                                        contentSpace_IconImage.style.background = "purple";
                                                                        contentSpace_IconImageSrc.style.backgroundImage = icon("comment");

                                                                        ma_getComment(multipleArray[i]).then(
                                                                            function (comment) {
                                                                                contentSpace_Title.innerHTML = "<a href='" + comment.articleNames[Object.keys(comment.articleNames)[0]].relativeUrl + "'>" + comment.articleNames[Object.keys(comment.articleNames)[0]].title + "</a>";

                                                                                var commentLinkParameters = "?commentId=" + comment.post.threadId;
                                                                                if (comment.post.isReply) commentLinkParameters += "&replyId=" + comment.post.id;

                                                                                contentSpace_Author.innerHTML = i18n.msg('type_comment').plain() + " <a href='" + mw.config.get("wgScriptPath") + "/wiki/User:" + getPostAuthor(comment.post) + "'>" + getPostAuthor(comment.post) + "</a> <a href='" + comment.articleNames[Object.keys(comment.articleNames)[0]].relativeUrl + commentLinkParameters + "'>(" + i18n.msg('view').plain() + ")</a>"

                                                                                contentSpace_Time.innerHTML = timeAgo(new Date(comment.post.timestamp * 1000));

                                                                                contentSpace_Info.appendChild(contentSpace_Title);
                                                                                contentSpace_Info.appendChild(contentSpace_Author);
                                                                                contentSpace_Info.appendChild(contentSpace_Time);

                                                                                var contentText = getPostContent(comment.post.jsonModel).replace(/\s/g, '');
                                                                                var contentImages = getPostPictures(comment.post);

                                                                                if (contentText.length != 0 || contentImages != undefined) {
                                                                                    contentSpace_Info.appendChild(contentSpace_Separator);

                                                                                    if (contentText.length != 0) {
                                                                                        contentSpace_Text.innerHTML = dataFormatted(i18n.msg('text').plain(), getPostContent(comment.post.jsonModel))
                                                                                    }

                                                                                    if (contentImages != undefined) {
                                                                                        contentSpace_Text.appendChild(contentImages);
                                                                                    }
                                                                                }

                                                                                contentSpace_Info.appendChild(contentSpace_Text);
                                                                            })
                                                                        break
                                                                }
                                                            }

                                                            msContent.appendChild(contentSpace[i]);

                                                            msContent.style.background = msRail.style.background = "none";
                                                            msContent.style.borderRadius = msRail.style.borderRadius = "0";

                                                            if (urlContainer.separate.value === true) {
                                                                var timeSeparator = document.createElement("h4");
                                                                timeSeparator.style.marginTop = "30px";

                                                                if (multipleArray[i].timestamp) {
                                                                    var dateObj = {};
                                                                    var dateEach = new Date(multipleArray[i].timestamp * 1000);

                                                                    dateObj.day = dateEach.getDate();
                                                                    dateObj.month = dateEach.getMonth();
                                                                    dateObj.year = dateEach.getFullYear();

                                                                    multipleArray[i].date = dateObj;
                                                                }

                                                                if (multipleArray[i - 1] !== undefined) {
                                                                    if ((multipleArray[i].date.day != multipleArray[i - 1].date.day) ||
                                                                        (multipleArray[i].date.month != multipleArray[i - 1].date.month) ||
                                                                        (multipleArray[i].date.year != multipleArray[i - 1].date.year)) {
                                                                        timeSeparator.innerHTML = dateEach.toLocaleDateString(mw.config.get('wgContentLanguage'), {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric"
                                                                        });
                                                                        contentSpace[i].before(timeSeparator);
                                                                    }
                                                                }
                                                            }

                                                            resolve()
                                                        }).then(
                                                            function () {
                                                                i++
                                                                theLoopa();
                                                            }
                                                        )
                                                    }
                                                }
                                                theLoopa();
                                            })
                                    })
                            })
                    }
                });
        });

        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    });