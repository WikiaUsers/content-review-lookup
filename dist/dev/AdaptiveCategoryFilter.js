mw.loader.using(["mediawiki.api"])
    .then(
        function () {
            return new mw.Api().loadMessagesIfMissing(["category-page3-shortcut-to-other"]);
        }
    ).then(
        function () {
            api = new mw.Api();
            if (mw.config.get("wgNamespaceNumber") === 14 && document.querySelectorAll(".category-page__members").length !== 0) {
                const title = mw.config.get("wgTitle");

                api.get({
                    action: "query",
                    list: "categorymembers",
                    cmtitle: "Category:" + title,
                    cmlimit: "500",
                    cmprop: "title",
                    format: "json"
                }).done(
                    function (pages) {
                        var members = pages.query.categorymembers;

                        if (members.length > 0) {
                            var membersFiltered = [];

                            for (var i in members) {
                                if (members[i].ns !== 0) {
                                    members[i].title = members[i].title.split(":").slice(1).join();
                                }

                                members[i].title = members[i].title.charAt(0).toUpperCase();

                                if ($.inArray(members[i].title, membersFiltered) === -1) {
                                    membersFiltered.push(members[i].title);
                                }
                            };

                            var url = new URL(window.location.href);
                            var urlParams = url.searchParams;

                            var originalList = document.querySelector(".category-page__alphabet-shortcuts");

                            const shortcutsList = document.createElement("ul");
                            shortcutsList.classList.add("new-alphabet-shortcuts", "category-page__alphabet-shortcuts");

                            for (var i in membersFiltered) {
                                var shortcutsList__item = document.createElement("li");
                                shortcutsList__item.classList.add("category-page__alphabet-shortcut");

                                if (urlParams.has("from")) {
                                    if (urlParams.get("from") === membersFiltered[i]) {
                                        shortcutsList__item.classList.add("is-active");
                                    }
                                }

                                var shortcutsList__link = document.createElement("a");

                                shortcutsList__link.setAttribute("rel", "nofollow");
                                shortcutsList__link.innerHTML = membersFiltered[i];
                                shortcutsList__link.href = mw.util.getUrl(mw.config.get("wgPageName"), {
                                    from: membersFiltered[i]
                                });

                                shortcutsList.appendChild(shortcutsList__item);
                                shortcutsList__item.appendChild(shortcutsList__link);
                            }

                            var hash = document.createElement("li");
                            var hash__link = document.createElement("a");

                            hash.classList.add("category-page__alphabet-shortcut");

                            hash__link.setAttribute("rel", "nofollow");
                            hash__link.innerHTML = "#";
                            hash__link.href = mw.util.getUrl(mw.config.get("wgPageName"));

                            shortcutsList.prepend(hash);
                            hash.appendChild(hash__link);

                            var other = document.createElement("li");
                            other.classList.add("category-page__alphabet-shortcut");

                            if (urlParams.has("from")) { 
                                if (urlParams.get("from") === "¡") {
                                    other.classList.add("is-active");
                                }
                            }

                            var other__link = document.createElement("a");

                            other__link.setAttribute("rel", "nofollow");
                            other__link.innerHTML = mw.message("category-page3-shortcut-to-other").text();
                            other__link.href = mw.util.getUrl(mw.config.get("wgPageName"), {
                                from: "¡"
                            });

                            shortcutsList.appendChild(other);
                            other.appendChild(other__link);

                            originalList.after(shortcutsList);
                            originalList.remove();

                            mw.util.addCSS(".new-alphabet-shortcuts li { margin-left: 2px; }");
                        }
                    }
                );
            }
        }
    );