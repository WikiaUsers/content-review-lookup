mw.loader.using('mediawiki.api').then(

    function () {
        // Разделённый на "подстраницы" заголовок
        var titleSplited = mw.config.get("wgTitle").split("/");


        // Фетчим категории
        function fetchForums() {
            return new Promise(function (resolve) {
                $.ajax({
                    url: encodeURI(mw.config.get("wgServicesExternalDomain") + "discussion/" + mw.config.get("wgCityId") + "/forums"),
                    type: "GET"
                }).then(function (forums) {
                    forums = forums._embedded["doc:forum"];
                    console.log(forums);
                    resolve(forums);
                })
            })
        }


        // Фетчим темы
        function fetchThreads() {
            return new Promise(function (resolve) {
                $.ajax({
                    url: encodeURI(mw.config.get("wgServicesExternalDomain") + "discussion/" + mw.config.get("wgCityId") + "/threads?viewableOnly=true&sortKey=creation_date"),
                    type: "GET"
                }).then(function (threads) {
                    threads = threads._embedded.threads;
                    console.log(threads);
                    resolve(threads);
                })
            })
        }


        // Фетчим посты по категории
        function getThreads(forumId) {
            return new Promise(function (resolve) {
                $.ajax({
                    url: encodeURI(mw.config.get("wgServicesExternalDomain") + "discussion/" + mw.config.get("wgCityId") + "/threads?viewableOnly=true&sortKey=creation_date&forumId=" + forumId),
                    type: "GET"
                }).then(function (threadsById) {
                    threadsById = threadsById._embedded.threads;
                    console.log(threadsById);
                    resolve(threadsById);
                })
            })
        }


        // Фетчим нужных участников
        function getUsers(ids) {
            ids = ids.join("+").toString();
            return new Promise(function (resolve) {
                $.ajax({
                    url: encodeURI("https://cors-anywhere.herokuapp.com/https://www.wikia.com/api/v1/User/Details?ids=" + ids),
                    type: "GET"
                }).then(function (d_users) {
                    resolve(d_users.items)
                });
            })
        }


        // Создаём основу страницы
        function CreatePageBase(title) {
            var mainspace = document.getElementById("mw-content-text");
            document.title = title + " | " + mw.config.get("wgSiteName")
            document.querySelector(".page-header__title").innerHTML = title;

            mainspace.innerHTML = "";
            mainspace.style.position = "relative";
            mainspace.style.display = "flex";
            mainspace.style.justifyContent = "space-between";

            var mainspaceContent = document.createElement("div");
            mainspaceContent.id = "mainspaceContent";
            mainspaceContent.style.width = "calc(100% - 320px)";

            var mainspaceRail = document.createElement("div");
            mainspaceRail.id = "mainspaceRail";
            mainspaceRail.style.width = "300px";

            mainspace.appendChild(mainspaceContent)
            mainspace.appendChild(mainspaceRail)
        }


        // Устанавливаем рельсу
        function SetupRail(threads) {
            var d_activity = document.createElement("section");
            mainspaceRail.appendChild(d_activity);

            d_activityHeader = document.createElement("h2");
            d_activityHeader.innerText = "Новые темы в обсуждениях";

            d_activityHeader.style.borderBottom = "1px solid #cccccc";
            d_activityHeader.style.fontSize = "16px";
            d_activityHeader.style.fontWeight = "bold";
            d_activityHeader.style.minHeight = "30px";
            d_activityHeader.style.marginBottom = "16px";
            d_activityHeader.style.paddingLeft = "2px";

            d_activity.appendChild(d_activityHeader);

            var d_activityBlocks = [];
            if (threads.length > 5) threads.length = 5;
            for (e = 0; e < threads.length; e++) {
                d_activityBlocks[e] = document.createElement("div");
                d_activityBlocks[e].id = "d_railActivity_block" + e;
                d_activityBlocks[e].className = "d_railActivity_block";

                d_activityBlocks[e].style.display = "flex";
                d_activityBlocks[e].style.marginBottom = "10px";

                d_activity.appendChild(d_activityBlocks[e]);


                d_activityBlocksAvatarLink = document.createElement("a");
                d_activityBlocksAvatarLink.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/User:" + threads[e].createdBy.name;
                d_activityBlocksAvatar = document.createElement("img");
                d_activityBlocksAvatar.src = threads[e].createdBy.avatarUrl;

                d_activityBlocksAvatar.style.width = "32px";
                d_activityBlocksAvatar.style.height = "32px";
                d_activityBlocksAvatar.style.border = "2px solid gray";
                d_activityBlocksAvatar.style.borderRadius = "20px";
                d_activityBlocksAvatar.style.marginRight = "10px";

                d_activityBlocks[e].appendChild(d_activityBlocksAvatarLink);
                d_activityBlocksAvatarLink.appendChild(d_activityBlocksAvatar);


                d_activityBlocksText = document.createElement("div");

                d_activityBlocks[e].appendChild(d_activityBlocksText);

                d_activityBlocksText.style.whiteSpace = "nowrap";
                d_activityBlocksText.style.textOverflow = "ellipsis";
                d_activityBlocksText.style.overflow = "hidden";
                d_activityBlocksText.style.display = "flex";
                d_activityBlocksText.style.flexDirection = "column";


                d_activityBlocksAnchor = document.createElement("a");
                d_activityBlocksAnchor.innerHTML = threads[e].title;
                d_activityBlocksAnchor.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/Special:NotDiscussions/" + threads[e].forumId + "/" + threads[e].id;

                d_activityBlocksAnchor.style.fontSize = "14px";

                d_activityBlocksText.appendChild(d_activityBlocksAnchor);


                d_activityBlocksUser = document.createElement("a");
                d_activityBlocksUser.innerHTML = threads[e].createdBy.name;
                d_activityBlocksUser.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/User:" + threads[e].createdBy.name;

                d_activityBlocksUser.style.fontSize = "12px";
                d_activityBlocksUser.style.color = "gray";

                d_activityBlocksText.appendChild(d_activityBlocksUser);
            }
        }

        // Работаем...
        fetchForums().then(
            function (forums) {
                fetchThreads().then(
                    function (threads) {
                        // Если на странице Special:NotDiscussions
                        if (mw.config.get("wgCanonicalNamespace") == "Special" && mw.config.get("wgTitle") == "NotDiscussions") {

                            CreatePageBase("NotDiscussions")
                            SetupRail(threads)

                            var d_categories = [];

                            for (i = 0; i < forums.length; i++) {

                                d_categories[i] = document.createElement("div");
                                d_categories[i].className = "d_categories";
                                d_categories[i].id = "d_categories_" + i;

                                d_categories[i].style.display = "flex";
                                d_categories[i].style.flexDirection = "column";
                                d_categories[i].style.position = "relative";
                                d_categories[i].style.padding = "12px";
                                d_categories[i].style.borderRadius = "5px";
                                d_categories[i].style.border = "1px solid #bfbfbf80";
                                d_categories[i].style.textDecoration = "none";
                                d_categories[i].style.marginTop = "10px";
                                d_categories[i].style.background = "rgba(186,205,216,0.1)";

                                mainspaceContent.appendChild(d_categories[i])


                                var d_categoriesName = document.createElement("a");
                                d_categoriesName.className = "d_categoriesName";
                                d_categoriesName.innerHTML = forums[i].name;
                                d_categoriesName.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/Special:NotDiscussions/" + forums[i].id;

                                d_categoriesName.style.fontWeight = "bold";
                                d_categoriesName.style.fontSize = "18px";


                                var d_categoriesDescription = document.createElement("span");
                                d_categoriesDescription.className = "d_categoriesDescription";
                                d_categoriesDescription.innerHTML = forums[i].description;

                                d_categoriesDescription.style.opacity = ".8";

                                d_categories[i].appendChild(d_categoriesName)
                                d_categories[i].appendChild(d_categoriesDescription)


                                var d_categoriesActivity = document.createElement("span");
                                d_categoriesActivity.className = "d_categoriesActivity";

                                d_categoriesActivityThreads = forums[i].threadCount;
                                d_categoriesActivityPosts = forums[i].postCount;

                                d_categoriesActivity.innerHTML = "Тем" + ": " + d_categoriesActivityThreads + " • " + "Сообщений" + ": " + d_categoriesActivityPosts;

                                d_categoriesActivity.style.position = "absolute";
                                d_categoriesActivity.style.right = "10px";

                                d_categories[i].appendChild(d_categoriesActivity)


                                if (forums[i].latestContribution.author !== null) {
                                    var d_categoriesPostsCount = document.createElement("p");
                                    d_categoriesPostsCount.className = "d_categoriesPostsCount";

                                    d_categoriesPostsCount.style.fontSize = "14px";
                                    d_categoriesPostsCount.style.marginTop = "10px";

                                    var d_categoriesPostsCount_type = document.createElement("span");
                                    switch (forums[i].latestContribution.item) {
                                        case "POST":
                                            d_categoriesPostsCount_type.innerHTML = "Последнее сообщение от"
                                            break;

                                        case "REPLY":
                                            d_categoriesPostsCount_type.innerHTML = "Последний ответ от"
                                            break;

                                        default:
                                            d_categoriesPostsCount_type.innerHTML = "Последнее сообщение от"
                                    }

                                    var d_categoriesPostsCount_space = document.createElement("span");
                                    d_categoriesPostsCount_space.innerHTML = " ";

                                    var d_categoriesPostsCount_user = document.createElement("a");
                                    getUsers([forums[i].latestContribution.author]).then(function (users) {
                                        d_categoriesPostsCount_user.innerHTML = (users)[0].name;
                                        d_categoriesPostsCount_user.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/User:" + (users)[0].name;
                                    })

                                    var d_categoriesPostsCount_dot = document.createElement("span");
                                    d_categoriesPostsCount_dot.innerHTML = " • "

                                    d_categories[i].appendChild(d_categoriesPostsCount);

                                    d_categoriesPostsCount.appendChild(d_categoriesPostsCount_type);
                                    d_categoriesPostsCount.appendChild(d_categoriesPostsCount_space);
                                    d_categoriesPostsCount.appendChild(d_categoriesPostsCount_user);
                                    d_categoriesPostsCount.appendChild(d_categoriesPostsCount_dot);
                                    //d_categoriesPostsCount.appendChild(d_categoriesPostsCount_time)
                                }
                            }
                        }


                        // Если на подстранице Special:NotDiscussions/...
                        else if (mw.config.get("wgCanonicalNamespace") == "Special" && forums.some(function (e) {
                                return e.id == titleSplited[1]
                            }) && !titleSplited[2]) {
                            var selectedForum = forums.find(function (e) {
                                return e.id == titleSplited[1]
                            });
                            CreatePageBase("Категория" + ": " + selectedForum.name);
                            SetupRail(threads);


                            var mainspaceDesc = document.createElement("div")
                            mainspaceDesc.innerHTML = selectedForum.description;

                            mainspaceDesc.style.opacity = ".8";
                            mainspaceDesc.style.marginBottom = "20px";

                            mainspaceContent.appendChild(mainspaceDesc);

                            getThreads(selectedForum.id).then(function (postsByCategory) {

                                var d_posts = [];

                                for (p = 0; p < postsByCategory.length; p++) {
                                    d_posts[p] = document.createElement("div");
                                    d_posts[p].className = "d_posts";
                                    d_posts[p].id = "d_posts_" + p;

                                    d_posts[p].style.display = "flex";
                                    d_posts[p].style.flexDirection = "column";
                                    d_posts[p].style.position = "relative";
                                    d_posts[p].style.padding = "12px";
                                    d_posts[p].style.borderRadius = "5px";
                                    d_posts[p].style.border = "1px solid #bfbfbf80";
                                    d_posts[p].style.textDecoration = "none";
                                    d_posts[p].style.marginTop = "10px";
                                    d_posts[p].style.background = "rgba(186,205,216,0.1)";

                                    mainspaceContent.appendChild(d_posts[p]);


                                    var d_postsTitle = document.createElement("a");
                                    d_postsTitle.className = "d_postsTitle";
                                    d_postsTitle.innerHTML = postsByCategory[p].title;
                                    d_postsTitle.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/Special:NotDiscussions/" + postsByCategory[p].forumId + "/" + postsByCategory[p].id;

                                    d_postsTitle.style.fontWeight = "bold";
                                    d_postsTitle.style.fontSize = "18px";


                                    var d_postsAuthor = document.createElement("a");
                                    d_postsAuthor.className = "d_postsAuthor";
                                    d_postsAuthor.innerHTML = postsByCategory[p].createdBy.name;
                                    d_postsAuthor.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/User:" + postsByCategory[p].createdBy.name;

                                    d_postsAuthor.style.fontSize = "12px";

                                    var d_postsAdditional = document.createElement("span");
                                    d_postsAdditional.className = "d_postsAdditional";
                                    d_postsAdditional.innerHTML = "❤ " + postsByCategory[p].upvoteCount + "; 💬 " + postsByCategory[p].postCount + "; 📈 " + postsByCategory[p].trendingScore;

                                    d_postsAdditional.style.marginTop = "10px";

                                    d_posts[p].appendChild(d_postsTitle)
                                    d_posts[p].appendChild(d_postsAuthor)
                                    d_posts[p].appendChild(d_postsAdditional)
                                }
                            })
                        }


                        // Если на подстранице подстраницы Special:NotDiscussions/...
                        else if (mw.config.get("wgCanonicalNamespace") == "Special" && forums.some(function (e) {
                                return e.id == titleSplited[1]
                            }) && threads.some(function (e) {
                                return e.id == titleSplited[2]
                            })) {
                            var selectedThread = threads.find(function (e) {
                                return e.id == titleSplited[2]
                            });
                            CreatePageBase(selectedThread.title);
                            SetupRail(threads);

                            var mainThread = document.createElement("div")

                            mainThread.style.borderRadius = "5px";
                            mainThread.style.border = "1px solid #bfbfbf80";
                            mainThread.style.textDecoration = "none";
                            mainThread.style.marginTop = "10px";
                            mainThread.style.padding = "12px";
                            mainThread.style.background = "rgba(186,205,216,0.1)";
                            mainThread.style.marginBottom = "20px";

                            mainspaceContent.appendChild(mainThread);

                            var mainThreadContent = document.createElement("div")

                            mainThreadContent.innerHTML = selectedThread.rawContent;

                            var mainThreadAdditional = document.createElement("span");
                            mainThreadAdditional.className = "mainThreadAdditional";
                            mainThreadAdditional.innerHTML = "❤ " + selectedThread.upvoteCount + "; 💬 " + selectedThread.postCount + "; 📈 " + selectedThread.trendingScore;

                            mainThread.appendChild(mainThreadContent);
                            mainThread.appendChild(mainThreadAdditional);
                        }
                    })
            })
    })