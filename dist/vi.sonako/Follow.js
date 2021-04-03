/*
For [[Special:Follow]] with parameter "title" and "unfollow": Follow/Unfollow title then return
For [[Special:Follow]]: Update recent news about a favorite title.
For normal main page: Add current LN category to following list.
*/

(function initFollower() {

    // Add link
    $("#my-tools-menu").append('<li><a target="_blank" href="/wiki/Special:Follow">Theo dõi nâng cao</a></li>');

    // Core object
    var follower = {
        fn: {
            // Functionalities
            loadGlobal: function () { },
            saveGlobal: function () { },
            loadLocal: function () { },
            saveLocal: function () { },
            compressWatchlist: function () { },
            decompressWatchlist: function () { },
            setData: function () { },
            follow: function () { },
            hasFollowed: function () { },
            target: function () { },
            untarget: function () { },
            unfollow: function () { },
            unfollowAll: function () { },
            getFeeds: function () { },
            getAvailableTitles: function () { },
            clearFeeds: function () { },
            getCurrentPageCategories: function () { },
            hasFollowedCurrentPage: function () { },

            // GUI
            vitalizeInterface: function () { },
            vitalizeButton: function () { },
            genInteractiveItem: function () { },
            genInteractiveFeed: function () { }
        },
        settings: {
            scriptURL: wgServer + wgScriptPath + "/api.php", // domain
            keyOfTitles: "watchlistTitles",
            username: wgUserName,
            storageTitle: "User:" + wgUserName + "/FollowTitles.css",
            feedsPerReq: 4,
            availableTitles: [],
            from: {},
            to: {},
            noMore: {},
            excludedCategories: ["Action", "Adult", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Game", "Gender Bender", "Harem", "Historical", "Horror", "Martial Arts", "Mature", "Mecha", "Mystery", "Psychological", "Romance", "School Life", "Sci-fi", "Seinen", "Shotocon", "Shoujo", "Shounen", "Slice of life", "Supernatural", "Tragedy", "Active Projects", "Idle Projects", "Stalled Projects", "Inactive Projects", "Licensed", "Hoàn thành", "Teaser", "Original Light Novel", "Spoiler", "Mature content", "Full Text", "Minh họa", "Poll", "Sonako", "Sonako Mainpage", "Wiki"],
            currentPageCategories: [],
            currentPageTitle: decodeURIComponent(location.href.split("/").slice(-1)[0]),
            timeoutDefault: 3000,
            variables: {}
        },
        data: {
            titles: [],
            targetTitles: []
        },
        newfeeds: {},
        markup: {
            html: "",
            css: ""
        }
    };

    // Define functionalities
    follower.fn.loadLocal = function () {
        follower.fn.setData(JSON.parse(window.localStorage.getItem(follower.settings.keyOfTitles)) || {});
    }

    follower.fn.saveLocal = function () {
        window.localStorage.setItem(follower.settings.keyOfTitles, JSON.stringify(follower.data));
    }

    follower.fn.compressWatchlist = function () {
        return follower.data.titles.map(function (title) {
            return (follower.data.targetTitles.includes(title) ? "+" : "-") + title;
        }).join("\n\n");
    }

    follower.fn.decompressWatchlist = function (compressedWatchlist) {
        temp = {
            titles: [],
            targetTitles: []
        };
        if (typeof compressedWatchlist === "string") {
            compressedWatchlist.split("\n\n").forEach(function (line) {
                sign = line.substring(0, 1);
                title = line.substring(1);
                temp.titles.push(title);
                if (sign === "+") {
                    temp.targetTitles.push(title);
                }
            });
        }
        return temp;
    }

    follower.fn.saveGlobal = function (cbSuccess, cbFailure) {
        // Check identification
        if (follower.settings.username === null) {
            cbFailure("Bạn chưa đăng nhập nên không thể lưu dữ liệu lên wikia.");
            return;
        }
        // Check token permission
        if (mw.user.tokens.values.editToken === "+\\") {
            cbFailure("editToken của bạn không hợp lệ.");
            return;
        }
        // Check storage existence
        return $.ajax({
            url: follower.settings.scriptURL,
            type: "POST",
            dataType: "json",
            data: {
                action: "edit",
                title: follower.settings.storageTitle,
                summary: "Save following titles",
                text: follower.fn.compressWatchlist(),
                token: mw.user.tokens.values.editToken,
                format: "json"
            }
        }).then(function onsaveglobalfulfilled(data) {
            console.debug("onsaveglobalfulfilled");
            console.debug(data);
            cbSuccess();
            return data;
        }).fail(function onsaveglobalrejected(err) {
            console.debug("onsaveglobalrejected");
            cbFailure(err);
            return err;
        });
    }

    follower.fn.loadGlobal = function (cbSuccess, cbFailure) {
        // Check identification
        if (follower.settings.username === null) {
            cbFailure("Bạn chưa đăng nhập nên không thể lưu dữ liệu lên wikia.");
            return $.Deferred().resolve();
        }
        // Check existence of storage on wikia
        return $.ajax({
            url: follower.settings.scriptURL,
            type: "GET",
            dataType: "json",
            data: {
                action: "query",
                titles: follower.settings.storageTitle,
                prop: "revisions",
                rvprop: "content",
                indexpageids: true,
                format: "json"
            }
        }).then(function onloadglobalfulfilled(data) {
            console.debug({onloadglobalfulfilled: data});
            if (data.query.pageids[0] === "-1") {
                cbFailure("Trang <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a> không tồn tại. Sẽ sử dụng bộ nhớ trình duyệt. Nếu bạn đã đăng nhập, hãy chọn 'Lưu vào bộ nhớ nào!' để đồng bộ trên mọi thiết bị và trình duyệt.");
            } else {
                list = data.query.pages[data.query.pageids[0]].revisions[0]["*"].trim();
                if (list !== "") {
                    follower.fn.setData(follower.fn.decompressWatchlist(list));
                    cbSuccess();
                } else {
                    follower.fn.setData({});
                    cbSuccess();
                }
                return data;
            }
        }).fail(function onsaveglobalrejected(err) {
            console.debug("onsaveglobalrejected");
            cbFailure(err);
            return err;
        });
    }

    follower.fn.setData = function (newState) {
        if (newState instanceof Object) {
            for (var key in newState) {
                if (newState.hasOwnProperty(key) && follower.data.hasOwnProperty(key)) {
                    follower.data[key] = newState[key];
                }
            }
        }
        follower.fn.saveLocal(); // Always save local after data changes
    }

    follower.fn.hasFollowed = function (title) {
        return follower.data.titles.includes(title);
    }

    follower.fn.follow = function (title) {
        console.debug("Follow " + title);
        follower.fn.setData({
            titles: follower.data.titles.concat(title),
            targetTitles: follower.data.targetTitles.concat(title)
        });
    }

    follower.fn.target = function (title) {
        console.debug("Target " + title);
        follower.fn.setData({
            targetTitles: follower.data.targetTitles.concat(title)
        });
    }

    follower.fn.untarget = function (title) {
        console.debug("Untarget " + title);
        follower.data.targetTitles.splice(follower.data.targetTitles.indexOf(title), 1);
        follower.fn.setData({
            targetTitles: follower.data.targetTitles
        });
    }

    follower.fn.unfollow = function (title) {
        console.debug("Unfollow " + title);
        function byTitle(t) {
            return t !== title;
        }
        follower.fn.setData({
            targetTitles: follower.data.targetTitles.filter(byTitle),
            titles: follower.data.titles.filter(byTitle)
        });
        follower.settings.noMore[title] = undefined;
        follower.settings.from[title] = undefined;
        follower.settings.to[title] = undefined;
    }

    follower.fn.unfollowAll = function () {
        follower.fn.setData({
            targetTitles: [],
            titles: []
        });
        follower.settings.noMore = {};
        follower.settings.from = {};
        follower.settings.to = {};
    }

    follower.fn.getAvailableTitles = function () {
        return $.ajax({
            url: follower.settings.scriptURL,
            data: {
                action: "query",
                list: "allcategories",
                acmin: 1,
                aclimit: "max",
                format: "json"
            },
            type: "GET",
            dataType: "json"
        }).then(function getAvailableTitlesSuccessCb(data) {
            console.debug("getAvailableTitlesSuccess");
            follower.settings.availableTitles = data.query.allcategories.map(function (e) {
                return e["*"];
            });
            return data;
        }).fail(function getAvailableTitlesFailureCb(err) {
            console.debug("getAvailableTitlesFailureCb");
            console.debug(err);
            return err;
        });
    }

    follower.fn.getCurrentPageCategories = function (cbSuccess) {
        follower.settings.currentPageCategories = wgCategories.filter(function (category) {return !follower.settings.excludedCategories.includes(category);});
        console.log({"categories": follower.settings.currentPageCategories});
        cbSuccess();
        return $.when();
    }

    follower.fn.hasFollowedCurrentPage = function () {
        return follower.settings.currentPageCategories.some(function (cat) {
            return follower.data.titles.includes(cat);
        });
    }

    follower.fn.genInteractiveItem = function (title, checked) {
        item = document.createElement("div");
        item.className = "interactiveItemWrapper";
        item.value = title;

        dlt = document.createElement("input");
        item.appendChild(dlt);
        dlt.setAttribute("type", "button");
        dlt.className = "delete";
        dlt.setAttribute("value", "x");
        dlt.setAttribute("title", title);
        dlt.addEventListener("click", function () {
            follower.fn.unfollow($(this).attr("title"));
            $(this).parent().remove();
        });

        input = document.createElement("input");
        item.appendChild(input);
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "feed");
        input.setAttribute("name", title);
        input.setAttribute("value", title);
        input.checked = checked;
        input.addEventListener("click", function (e) {
            if (e.target.checked) {
                follower.fn.target(e.target.value);
            } else {
                follower.fn.untarget(e.target.value);
            }
        });

        lbl = document.createElement("label");
        item.appendChild(lbl);
        lbl.setAttribute("for", "feed");
        lbl.innerText = title;

        return item;
    }

    follower.fn.genInteractiveFeed = function (feed) {
        feedWrapper = document.createElement("div");
        feedWrapper.className = "activity-type-new activity-ns-0 interactiveFeedWrapper";
        console.debug(feed);

        bullet = document.createElement("img");
        feedWrapper.appendChild(bullet);
        bullet.className = "new sprite";
        bullet.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D");
        bullet.setAttribute("alt", "Trang mới");
        bullet.setAttribute("title", "Trang mới");
        bullet.setAttribute("width", 16);
        bullet.setAttribute("height", 16);

        title = document.createElement("strong");
        feedWrapper.appendChild(title);
        a = document.createElement("a");
        title.appendChild(a);
        a.className = "title";
        a.setAttribute("href", "/wiki/" + encodeURIComponent(feed.title));
        a.setAttribute("target", "_blank");
        a.innerText = feed.title;

        cite = document.createElement("cite");
        feedWrapper.appendChild(cite);
        p = document.createElement("p");
        cite.appendChild(p);
        p.className = "subtle";
        span = document.createElement("span");
        p.appendChild(span);
        span.innerText = " cập nhật lần cuối bởi ";
        a = document.createElement("a");
        p.appendChild(a);
        a.setAttribute("href", "/wiki/User:" + encodeURIComponent(feed.byUser));
        a.setAttribute("rel", "nofollow");
        a.setAttribute("target", "_blank");
        a.className = "userlink";
        a.innerText = feed.byUser;
        span = document.createElement("span");
        p.appendChild(span);
        span.innerText = " vào " + (new Date(Date.parse(feed.lastedit))).toLocaleString();

        return feedWrapper;
    }

    follower.fn.getFeeds = function (cbSuccess, cbFailures) {
        console.debug("getFeeds")
        currentDate = (new Date()).toISOString();
        follower.data.targetTitles.forEach(function (title) {
            if (!follower.settings.to[title]) {
                follower.settings.from[title] = currentDate;
                follower.settings.to[title] = currentDate;
                follower.settings.noMore[title] = false;
            }
        });

        (follower.data.targetTitles).forEach(function (title) {
            $.ajax({
                url: follower.settings.scriptURL,
                data: {
                    action: "query",
                    generator: "categorymembers",
                    gcmtitle: "Category:" + title,
                    gcmnamespace: 0,
                    gcmsort: "timestamp",
                    gcmdir: "desc",
                    gcmlimit: follower.settings.feedsPerReq,
                    gcmstart: follower.settings.to[title],
                    format: "json",
                    prop: "revisions|pageprops",
                    rvprop: "timestamp|user",
                    indexpageids: true
                },
                type: "GET",
                dataType: "json"
            }).then(function getFeedForEachSuccessCb(data) {
                console.debug("getFeedForEachSuccessCb");
                console.debug(data);
                feeds = data.query.pageids.map(function (id) {
                    return {
                        pageid: id,
                        title: data.query.pages[id].title,
                        lastedit: data.query.pages[id].revisions[0].timestamp,
                        byUser: data.query.pages[id].revisions[0].user
                    }
                });
                if (data["query-continue"]) {
                    follower.settings.to[title] = data["query-continue"].categorymembers.gcmstart;
                    follower.settings.noMore[title] = false;
                } else {
                    follower.settings.to[title] = feeds[feeds.length - 1].lastedit;
                    follower.settings.noMore[title] = true;
                }
                follower.newfeeds[title] = feeds;
                cbSuccess(title);
            }).fail(function getFeedForEachFailureCb(err) {
                console.debug("getFeedForEachFailureCb")
                console.debug(err);
                cbFailures(title + err.toString());
            });
        });
    }

    follower.fn.clearFeeds = function () {
        console.debug("clearFeeds");
        follower.newfeeds = {};
        follower.settings.from = {};
        follower.settings.to = {};
        follower.settings.noMore = {};
    }

    follower.fn.vitalizeInterface = function () {
        // Set title
        $(".WikiaPage h1, h1#firstHeading").html("Theo Dõi Nâng Cao");
        $("head title").html("Theo Dõi Nâng Cao | Sonako Light Novel Wiki");

        // Load global and local data
        return follower.fn.loadGlobal(
            function loadGlobalSuccessCb() {
                $("#watchstatus").html("Đã tải danh sách theo dõi tại <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a>");
            }, function loadGlobalFailureCb(err) {
                $("#watchstatus").html(err);
            }
        ).then(function () {
            if (follower.data.titles.length === 0) {
                // If loadGlobal fails or anonymous user
                follower.fn.loadLocal();
            }
        }).then(function () {
            // Load available titles
            return follower.fn.getAvailableTitles();
        }).then(function () {
            // Finalize page
            // Initial check of watchlist
            if (follower.data.titles.length === 0) {
                $(".watchlist .instruction").addClass("inactive");
                $(".watchlist #watchstatus").html("Trống vắng quá :(");
                $(".feedRetriever").addClass("inactive");
            } else {
                $(".watchlist #watchstatus").empty();
                $(".watchlist .content.list").append(
                    follower.data.titles.map(function (title) {
                        return follower.fn.genInteractiveItem(title, follower.data.targetTitles.includes(title));
                    })
                );
            }

            // Autocomplete field
            // Sauce: https://www.w3schools.com/howto/howto_js_autocomplete.asp
            (function autocomplete(inp) {
                function addActive(x) {
                    /*a function to classify an item as "active":*/
                    if (!x) return false;
                    /*start by removing the "active" class on all items:*/
                    removeActive(x);
                    if (currentFocus >= x.length) currentFocus = 0;
                    if (currentFocus < 0) currentFocus = (x.length - 1);
                    /*add class "autocomplete-active":*/
                    x[currentFocus].classList.add("autocompleteTitles-active");
                }
                function removeActive(x) {
                    /*a function to remove the "active" class from all autocomplete items:*/
                    for (var i = 0; i < x.length; i++) {
                        x[i].classList.remove("autocompleteTitles-active");
                    }
                }
                function closeAllLists(elmnt) {
                    /*close all autocomplete lists in the document,
                    except the one passed as an argument:*/
                    var x = document.getElementsByClassName("autocompleteTitles-items");
                    for (var i = 0; i < x.length; i++) {
                        if (elmnt != x[i] && elmnt != inp) {
                            x[i].parentNode.removeChild(x[i]);
                        }
                    }
                }
                /*execute a function when someone clicks in the document:*/
                document.addEventListener("click", function (e) {
                    closeAllLists(e.target);
                });
                inp.addEventListener("input", function (e) {
                    val = this.value;
                    /*close any already open lists of autocompleted values*/
                    closeAllLists();
                    if (!val) { return false; }
                    currentFocus = -1;
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("div");
                    a.setAttribute("id", this.id + "autocompleteTitles-list");
                    a.setAttribute("class", "autocompleteTitles-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);
                    /*for each item in the array...*/
                    for (i = 0; i < follower.settings.availableTitles.length; i++) {
                        /*check if the item starts with the same letters as the text field value:*/
                        t = follower.settings.availableTitles[i];
                        if (t.toLowerCase().includes(val.toLowerCase())) {
                            /*create a DIV element for each matching element:*/
                            b = document.createElement("DIV");
                            /*make the matching letters bold:*/
                            idx = t.indexOf(val.toLowerCase());
                            b.innerHTML = t.replace(new RegExp(val, "i"), "<strong>$&</strong>");
                            /*insert a input field that will hold the current array item's value:*/
                            b.innerHTML += "<input type='hidden' value='" + t + "'>";
                            /*execute a function when someone clicks on the item value (DIV element):*/
                            b.addEventListener("click", function (e) {
                                /*insert the value for the autocomplete text field:*/
                                inp.value = this.getElementsByTagName("input")[0].value;
                                /*close the list of autocompleted values,
                                (or any other open lists of autocompleted values:*/
                                closeAllLists();
                            });
                            a.appendChild(b);
                        }
                    }
                });
                /*execute a function presses a key on the keyboard:*/
                inp.addEventListener("keydown", function (e) {
                    var x = document.getElementById(this.id + "autocompleteTitles-list");
                    if (x) x = x.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                        /*If the arrow DOWN key is pressed,
                        increase the currentFocus variable:*/
                        currentFocus++;
                        /*and and make the current item more visible:*/
                        addActive(x);
                    } else if (e.keyCode == 38) { //up
                        /*If the arrow UP key is pressed,
                        decrease the currentFocus variable:*/
                        currentFocus--;
                        /*and and make the current item more visible:*/
                        addActive(x);
                    } else if (e.keyCode == 13) {
                        /*If the ENTER key is pressed, prevent the form from being submitted,*/
                        e.preventDefault();
                        if (currentFocus > -1) {
                            /*and simulate a click on the "active" item:*/
                            if (x) x[currentFocus].click();
                        }
                    }
                });
            })(document.querySelector("#inputTitle"));


            // Listener to register new title
            $(".titles #follow").click(function followCb() {
                title = $("#inputTitle").val();
                if (!title) return;
                console.debug(title);
                $("#inputTitle option:selected").prop("selected", false); // Unselect
                $(".watchlist #watchstatus").html("Trống vắng quá :(");
                $(".watchlist .instruction").removeClass("inactive");
                $(".feedRetriever").removeClass("inactive");
                if (!follower.fn.hasFollowed(title)) {
                    follower.fn.follow(title);
                    $(".watchlist .content.list").append(follower.fn.genInteractiveItem(title, true));
                }
                if (follower.data.titles.length > 0) {
                    $("#watchstatus").text("");
                }
            });

            // Listener to clear titles
            $(".watchlist #clearTitles").click(function () {
                if (follower.data.titles.length === 0) return;
                if (window.confirm("Bạn có chắc là muốn bỏ theo dõi những LN hấp dẫn này chứ?")) {
                    follower.fn.unfollowAll();
                    follower.fn.saveGlobal(
                        function saveGlobalSuccessCb() {
                            $("#watchstatus").html("<span>Đã lưu danh sách theo dõi tại <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a></span>");
                            $(".watchlist .content.list").empty();
                            $(".watchlist .instruction").addClass("inactive");
                            $(".watchlist #watchstatus").html("Trống vắng quá :(");
                        },
                        function saveGlobalFailureCb(err) {
                            $("#watchstatus").html(err);
                        }
                    );
                }
            });

            // Listener to save titles to global
            $(".watchlist #saveTitles").click(function () {
                follower.fn.saveGlobal(
                    function saveGlobalSuccessCb() {
                        $("#watchstatus").html("<span>Đã lưu danh sách theo dõi tại <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a></span>");
                    },
                    function saveGlobalFailureCb(err) {
                        $("#watchstatus").html(err);
                    }
                );
            });

            // Listener to retrieve feed
            $(".feedRetriever #getFeed").click(function () {
                $("#feedStatus").empty();

                follower.fn.getFeeds(function getFeedCbSuccess(title) {
                    console.debug("getFeedCbSuccess " + title);

                    // Show control buttons
                    $(".feedRetriever .control").removeClass("inactive");

                    if (follower.settings.noMore[title]) {
                        $("#feedsStatus").append($("<span></span>").text("Không thể đào thêm " + title + " nữa đâu. "));
                    }

                    // Show feeds
                    $(".feeds.list").append(
                        follower.newfeeds[title].map(follower.fn.genInteractiveFeed)
                    );
                }, function getFeedCbFailure(title, status, err) {
                    console.debug("getFeedCbFailure " + title + " " + status + " " + err);
                    $("#feedsStatus").append($("<span></span>").text("Xảy ra lỗi khi tải  " + title + ": " + status));
                });
            });
            $(".feedRetriever #getMoreFeed").click(function () {
                $(".feedRetriever #getFeed").click();
            });

            // Listener to clear current feeds
            $(".feedRetriever #clearFeed").click(function () {
                follower.fn.clearFeeds();
                // Hide
                $(".feedRetriever .feeds.list").empty();
                $("#feedStatus").empty();
                $(".feedRetriever .control").addClass("inactive");
            });
        });
    }

    follower.fn.vitalizeButton = function ($button) {
        console.log()
        // Get category of this page
        return follower.fn.getCurrentPageCategories(
            function cbSuccess() {
                console.debug("Got categories of current page");
            },
            function cbFailure(err) {
                new BannerNotification("Không thể xác định category của bộ truyện này." + err.toString(), "error", null, follower.settings.timeoutDefault).show();
            }
        ).then(function () {
            // Load global and local data
            if (follower.settings.username !== null) {
                console.debug("Loading " + follower.settings.storageTitle);
                return follower.fn.loadGlobal(
                    function loadGlobalSuccessCb() {
                        // Do nothing
                        console.debug("Loaded " + follower.settings.storageTitle)
                    },
                    function loadGlobalFailureCb(msg) {
                        new BannerNotification(msg, "error", undefined, follower.settings.timeoutDefault).show();
                        // Use local data instead
                        if (follower.data.titles.length === 0) {
                            follower.fn.loadLocal();
                        }
                    }
                );
            } else {
                new BannerNotification("Hãy đăng nhập để đồng bộ danh sách theo dõi trên mọi thiết bị và trình duyệt nhé!", "notify", undefined, follower.settings.timeoutDefault).show();
                // Anonymous user
                if (follower.data.titles.length === 0) {
                    follower.fn.loadLocal();
                }
                return $.Deferred().resolve();
            }
        }).then(function () {
            // Synchronize state of follow button
            if (follower.settings.currentPageCategories.length > 0) {
                if (follower.fn.hasFollowedCurrentPage()) {
                    $button.addClass("followed");
                } else {
                    $button.addClass("unfollowed");
                }
            }
        }).then(function () {
            // Listerner to toggle following
            $button.click(function () {
                if (follower.settings.currentPageCategories.length === 0) return;

                msg = "";
                if ($(this).hasClass("followed")) {
                    // Unsubscribe
                    follower.settings.currentPageCategories.forEach(function (cat) {
                        follower.fn.unfollow(cat);
                    });
                    $(this).removeClass("followed").addClass("unfollowed");
                    msg = "<span>Đã bỏ " + follower.settings.currentPageCategories.join(", ") + " khỏi danh sách theo dõi <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a></span>"
                } else {
                    // Subscribe
                    follower.settings.currentPageCategories.forEach(function (cat) {
                        if (!follower.fn.hasFollowed(cat))
                            follower.fn.follow(cat);
                    });
                    $(this).removeClass("unfollwed").addClass("followed");
                    msg = "<span>Đã thêm " + follower.settings.currentPageCategories.join(", ") + " vào danh sách theo dõi <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a></span>"
                }

                // Save global
                return follower.fn.saveGlobal(
                    function cbSuccess() {
                        new BannerNotification(msg, "confirm", null, follower.settings.timeoutDefault).show();
                    },
                    function cbFailure(err) {
                        new BannerNotification(err, "error", null, follower.settings.timeoutDefault).show();
                    }
                );
            });
        });
    }

    // Implementation
    // Treating demand via FollowTemplate / UnfollowTemplate
    function getQueryVariables() {
        query = window.location.search.substring(1);
        vars = query.split("&");
        variables = {};
        for (var i = 0; i < vars.length; i++) {
            pair = vars[i].split("=");
            variables[pair[0]] = pair[1];
        }
        return variables;
    }
    follower.settings.variables = getQueryVariables();
    if (mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgTitle") === "Follow" && follower.settings.variables.title) {
        console.debug(follower.settings.variables);
        // Get title from query variables
        follower.settings.currentPageTitle = decodeURIComponent(follower.settings.variables.title);
        // Register title into following list
        follower.fn.getCurrentPageCategories(
            function cbSuccess() {
                console.debug("Got categories of current page");
            },
            function cbFailure(err) {
                new BannerNotification("Không thể xác định category của bộ truyện này." + err.toString(), "error", null, follower.settings.timeoutDefault).show();
            }
        ).then(function () {
            // Load global and local data
            if (follower.settings.username !== null) {
                console.debug("Loading " + follower.settings.storageTitle);
                return follower.fn.loadGlobal(
                    function loadGlobalSuccessCb() {
                        // Do nothing
                        console.debug("Loaded " + follower.settings.storageTitle)
                    },
                    function loadGlobalFailureCb(msg) {
                        new BannerNotification(msg, "error", undefined, follower.settings.timeoutDefault).show();
                        // Use local data instead
                        if (follower.data.titles.length === 0) {
                            follower.fn.loadLocal();
                        }
                    }
                );
            } else {
                new BannerNotification("Hãy đăng nhập để đồng bộ danh sách theo dõi trên mọi thiết bị và trình duyệt nhé!", "notify", undefined, follower.settings.timeoutDefault).show();
                // Anonymous user
                if (follower.data.titles.length === 0) {
                    follower.fn.loadLocal();
                }
                return $.Deferred().resolve();
            }
        }).then(function () {
            if (follower.settings.currentPageCategories.length === 0) return;

            msg = "";
            if (follower.settings.variables.follow) {
                // Subscribe
                follower.settings.currentPageCategories.forEach(function (cat) {
                    if (!follower.fn.hasFollowed(cat))
                        follower.fn.follow(cat);
                });
                msg = "<span>Đã thêm " + follower.settings.currentPageCategories.join(", ") + " vào danh sách theo dõi <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a></span>"
            } else if (follower.settings.variables.unfollow) {
                // Unsubscribe
                follower.settings.currentPageCategories.forEach(function (cat) {
                    follower.fn.unfollow(cat);
                });
                msg = "<span>Đã bỏ " + follower.settings.currentPageCategories.join(", ") + " khỏi danh sách theo dõi <a target='_blank' class='title' href='/wiki/" + follower.settings.storageTitle + "'>" + follower.settings.storageTitle + "</a></span>"
            }

            // Save global
            return follower.fn.saveGlobal(
                function cbSuccess() {
                    new BannerNotification(msg, "confirm", null, follower.settings.timeoutDefault).show();
                },
                function cbFailure(err) {
                    new BannerNotification(err, "error", null, follower.settings.timeoutDefault).show();
                }
            );
        }).always(function () {
            if (follower.settings.variables.stay) return;
            new BannerNotification("Đang quay về trang truyện", "confirm", null, follower.settings.timeoutDefault).show();
            setTimeout(function () {
                // Then return
                window.location = mw.config.get("wgServer") + "/wiki/" + follower.settings.variables.title;
            }, follower.settings.timeoutDefault);
        });

    }
    // Full interface on [[Special:Follow]]
    if (mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgTitle") === "Follow") {
        // Global modifier
        window.follower = follower;

        // Decorate html
        follower.markup.html =
            '<div class="watchlistWrapper byTitle">\n' +
            '    <div class="subheader">\n' +
            '        <p class="subtitle info">\n' +
            '            <strong>To the light of Holy, to the glory of Dark, let us pray, the faith of Sonako.</strong>\n' +
            '        </p>\n' +
            '        <p class="instruction">\n' +
            '            Hãy đăng nhập để đồng bộ danh sách theo dõi trên mọi thiết bị và trình duyệt nhé! Nếu danh sách truyện bị thiếu, hãy tìm theo tag của bộ truyện. Và nếu vẫn bị thiếu, hãy thử tại lại trang.\n' +
            '        </p>\n' +
            '        <p id="headStatus" class="info"></p>\n' +
            '    </div>\n' +
            '    <div class="titles">\n' +
            '        <label for="inputTitle">Bạn muốn thêm truyện nào vào danh sách theo dõi?</label>\n' +
            '        <br />\n' +
            '        <div class="autocompleteTitles">\n' +
            '            <input id="inputTitle" type="text" placeholder="Tên bộ truyện" />\n' +
            '        </div>\n' +
            '        <input id="follow" type="button" value="Thêm" />\n' +
            '    </div>\n' +
            '    <hr>\n' +
            '    <div class="watchlist">\n' +
            '        <p class="instruction">Hãy tích chọn những truyện bạn muốn cập nhật tin tức.</p>\n' +
            '        <label for="content">Những truyện bạn đang theo dõi:</label>\n' +
            '        <div class="content list"></div>\n' +
            '        <p id="watchstatus" class="info"></p>\n' +
            '        <div class="control">\n' +
            '            <input id="clearTitles" type="button" value="Bỏ hết đống này đi!" />\n' +
            '            <input id="saveTitles" type="button" value="Lưu vào bộ nhớ nào!" />\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <hr>\n' +
            '    <div class="feedRetriever">\n' +
            '        <input id="getFeed" type="button" value="Dạo này có chương mới chưa?" />\n' +
            '        <input id="clearFeed" type="button" value="Xóa hết kết quả tìm kiếm" />\n' +
            '        <div class="feeds list">\n' +
            '        </div>\n' +
            '        <p id="feedStatus" class="info"></p>\n' +
            '        <div class="control inactive">\n' +
            '            <input id="getMoreFeed" type="button" value="Tải thêm tí nữa" />\n' +
            '            <input id="clearFeed" type="button" value="Xóa hết kết quả tìm kiếm" />\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n'
            ;

        // Decorate css
        follower.markup.css =
            'input.delete {\n' +
            '    margin: 0 4px;\n' +
            '}\n' +
            '\n' +
            'label[for="feed"] {\n' +
            '    font-size: larger;\n' +
            '    font-style: italic;\n' +
            '    font-family: Georgia, "Times New Roman", Times, serif;\n' +
            '}\n' +
            '\n' +
            '.content.list {\n' +
            '    display: flex;\n' +
            '    flex-direction: column;\n' +
            '}\n' +
            '\n' +
            '.inactive {\n' +
            '    display: none;\n' +
            '}\n' +
            '\n' +
            '.subheader.subtitle {\n' +
            '    font-size: xx-large;\n' +
            '    font-style: italic;\n' +
            '    font-weight: bolder;\n' +
            '}\n' +
            '\n' +
            '.interactiveItemWrapper {\n' +
            '    display: inline-flex;\n' +
            '    margin-bottom: 4px;\n' +
            '}\n' +
            '\n' +
            '.interactiveFeedWrapper {\n' +
            '    display: inline-block;\n' +
            '    margin: 10px;\n' +
            '    border: 2px black solid;\n' +
            '    padding: 10px;\n' +
            '    flex-grow: 1;\n' +
            '    width: 20%;\n' +
            '}\n' +
            '\n' +
            '.feeds.list {\n' +
            '    display: block;\n' +
            '    width: 100%;\n' +
            '}\n' +
            '\n' +
            '.info {\n' +
            '    font-style: italic;\n' +
            '}\n' +
            '\n' +
            '.titles div.autocompleteTitles {\n' +
            '    width: 300px;\n' +
            '    position: relative;\n' +
            '    display: inline-block;\n' +
            '    margin-right: 10px;\n' +
            '}\n' +
            '\n' +
            '.titles div.autocompleteTitles input {\n' +
            '    width: 100%;\n' +
            '}\n' +
            '\n' +
            '.autocompleteTitles-items {\n' +
            '    position: absolute;\n' +
            '    border: 1px solid #d4d4d4;\n' +
            '    border-bottom: none;\n' +
            '    border-top: none;\n' +
            '    z-index: 99;\n' +
            '    /*position the autocomplete items to be the same width as the container:*/\n' +
            '    top: 100%;\n' +
            '    left: 0;\n' +
            '    right: 0;\n' +
            '    height: 200px;\n' +
            '    overflow-y: auto;\n' +
            '}\n' +
            '\n' +
            '.autocompleteTitles-items div {\n' +
            '    padding: 10px;\n' +
            '    background-color: #fff;\n' +
            '    border-bottom: 1px solid #d4d4d4;\n' +
            '}\n' +
            '\n' +
            '.autocompleteTitles-items div:hover {\n' +
            '    /*when hovering an item:*/\n' +
            '    background-color: #e9e9e9;\n' +
            '}\n' +
            '\n' +
            '.autocompleteTitles-active {\n' +
            '    /*when navigating through the items using the arrow keys:*/\n' +
            '    background-color: DodgerBlue !important;\n' +
            '    color: #ffffff;\n' +
            '}\n'
            ;

        /* css */
        mw.util.addCSS(follower.markup.css);

        /* markup */
        $("#mw-content-text").html(follower.markup.html);

        /* add listeners */
        follower.fn.vitalizeInterface();

        return;
    }
    // Floating button on normal main page
    if (mw.config.get("wgNamespaceNumber") === 0 && document.getElementById("totopscroller") !== null) {
        // Global modifier
        window.follower = follower;

        // Insert a button in floating division
        follower.markup.html =
            '<a class="lookupButton byTitle" href="/wiki/Special:Follow" target="_blank"></a>' + 
            '<a class="followButton unfollowed byTitle"></a>'
            ;

        follower.markup.css =
            '.lookupButton.byTitle, .followButton.byTitle {\n' +
            '    border-radius: 5px 0 0 5px;\n' +
            '    display: block;\n' +
            '    width: 36px;\n' +
            '    height: 36px;\n' +
            '    opacity: 0.7;\n' +
            '    text-decoration: none;\n' +
            '    margin: 4px 0;\n' +
            '}\n' +
            '.lookupButton.byTitle {\n' +
            '    background: url("https://i.imgur.com/heugVxM.png") no-repeat scroll 50% 50% rgba(0,0,0,0.7);\n' +
            '    background-size: 24px 24px;\n' +
            '}\n' +
            '.followButton.unfollowed.byTitle {\n' +
            '    background: url("https://i.imgur.com/ifYVCig.png") no-repeat scroll 50% 50% rgba(0,0,0,0.7);\n' +
            '    background-size: 24px 24px;\n' +
            '}\n' +
            '\n' +
            '.followButton.followed.byTitle {\n' +
            '    background: url("https://i.imgur.com/wdDNLPl.png") no-repeat scroll 50% 50% rgba(0,0,0,0.7);\n' +
            '    background-size: 24px 24px' +
            '}\n'
            ;

        /* css */
        mw.util.addCSS(follower.markup.css);

        /* markup */
        $("#totopscroller").prepend(follower.markup.html);

        /* add listeners */
        follower.fn.vitalizeButton($(".followButton.byTitle"));

        return;
    }

})();