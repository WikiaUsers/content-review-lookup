(function () {
    function cssValue(name) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim()
            .replace(/^["']|["']$/g, "");
    }

    function cssList(name) {
        return cssValue(name)
            .split(",")
            .map(function (item) {
                return item.trim();
            })
            .filter(Boolean);
    }

    function normalize(value) {
        try {
            value = decodeURIComponent(value || "");
        } catch (error) {
            value = value || "";
        }

        return value.replace(/_/g, " ").toLowerCase().trim();
    }

    function slugify(value) {
        return normalize(value)
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function getUsers() {
        const users = [];

        cssList("--us-users").forEach(function (username) {
            users.push({
                name: username,
                slug: slugify(username),
                group: null
            });
        });

        cssList("--us-groups").forEach(function (groupName) {
            const groupSlug = slugify(groupName);

            cssList("--us-" + groupSlug + "-users").forEach(function (username) {
                users.push({
                    name: username,
                    slug: slugify(username),
                    group: groupSlug
                });
            });
        });

        return users;
    }

    function getAction(link) {
        try {
            return new URL(link.href, location.href).searchParams.get("action") || "";
        } catch (error) {
            return "";
        }
    }

    function isEditLink(link) {
        try {
            const url = new URL(link.href, location.href);

            return (
                url.searchParams.get("action") === "edit" ||
                url.searchParams.get("veaction") === "edit"
            );
        } catch (error) {
            return false;
        }
    }

    function crossWikiSetting() {
        const raw = cssValue("--us-cross-wiki").toLowerCase();

        if (raw === "true") return "true";
        if (raw === "false") return "false";

        return "unset";
    }

    let crossWikiEnabled = crossWikiSetting() === "true";

    const currentUsername = normalize(
        (window.mw && mw.config && mw.config.get("wgUserName")) || ""
    );

    function jsonpFetch(url) {
        return new Promise(function (resolve, reject) {
            const callbackName = "usJsonp" + Math.random().toString(36).slice(2);
            const script = document.createElement("script");
            let timer;

            window[callbackName] = function (data) {
                clearTimeout(timer);
                delete window[callbackName];
                script.remove();
                resolve(data);
            };

            script.onerror = function () {
                clearTimeout(timer);
                delete window[callbackName];
                script.remove();
                reject(new Error("jsonp failed"));
            };

            timer = setTimeout(function () {
                delete window[callbackName];
                script.remove();
                reject(new Error("jsonp timeout"));
            }, 10000);

            script.src =
                url +
                (url.indexOf("?") === -1 ? "?" : "&") +
                "callback=" +
                callbackName;
            document.head.appendChild(script);
        });
    }

    function fetchUserModule(moduleName, only, onText) {
        try {
            if (!(window.mw && mw.config && mw.util)) return;

            const username = mw.config.get("wgUserName");

            if (!username) return;

            const skin = mw.config.get("skin") || "fandomdesktop";
            const url =
                mw.util.wikiScript("load") +
                "?lang=en&modules=" +
                encodeURIComponent(moduleName) +
                "&only=" +
                encodeURIComponent(only) +
                "&skin=" +
                encodeURIComponent(skin) +
                "&user=" +
                encodeURIComponent(username);

            fetch(url, { credentials: "omit" })
                .then(function (response) {
                    return response.text();
                })
                .then(onText)
                .catch(function () {});
        } catch (error) {}
    }

    function detectGlobalJs(onDetected) {
        fetchUserModule("user", "scripts", function (text) {
            if (text.indexOf("u:dev:MediaWiki:UserStyles.js") !== -1) onDetected();
        });
    }

    function extractCssVarFromText(cssText, varName) {
        const escaped = varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp("--" + escaped + "\\s*:\\s*([^;]+);?");
        const match = cssText.match(pattern);

        return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
    }

    function extractCssListFromText(cssText, varName) {
        return extractCssVarFromText(cssText, varName)
            .split(",")
            .map(function (item) {
                return item.trim();
            })
            .filter(Boolean);
    }

    function globalCssNamesUser(cssText, username) {
        const name = normalize(username);

        if (
            extractCssListFromText(cssText, "us-users").some(function (u) {
                return normalize(u) === name;
            })
        ) {
            return true;
        }

        return extractCssListFromText(cssText, "us-groups").some(function (groupName) {
            const groupSlug = slugify(groupName);

            return extractCssListFromText(cssText, "us-" + groupSlug + "-users").some(function (u) {
                return normalize(u) === name;
            });
        });
    }

    function detectGlobalCss(onDetected) {
        try {
            if (!(window.mw && mw.config)) return;

            const username = mw.config.get("wgUserName");

            if (!username) return;

            const title = "User:" + username + "/global.css";
            const apiUrl =
                "https://community.fandom.com/api.php?action=query&prop=revisions&rvprop=content&formatversion=2&format=json&titles=" +
                encodeURIComponent(title);

            jsonpFetch(apiUrl)
                .then(function (data) {
                    const page =
                        data && data.query && data.query.pages && data.query.pages[0];
                    const content =
                        page && page.revisions && page.revisions[0] && page.revisions[0].content;

                    if (content && globalCssNamesUser(content, username)) onDetected();
                })
                .catch(function () {});
        } catch (error) {}
    }

    function getLinkTitle(link) {
        try {
            const url = new URL(link.href, location.href);
            const titleParam = url.searchParams.get("title");

            if (titleParam) return normalize(titleParam);

            const match = url.pathname.match(/\/wiki\/(.+)$/i);

            if (match) return normalize(match[1]);

            return "";
        } catch (error) {
            return "";
        }
    }

    function isCrossWikiAllowedForLink(link, username) {
        try {
            const url = new URL(link.href, location.href);

            if (url.hostname === location.hostname) return true;

            return crossWikiEnabled && normalize(username) === currentUsername;
        } catch (error) {
            return false;
        }
    }

    function shouldSkipLink(link) {
        const href = normalize(link.href);
        const rawHref = link.getAttribute("href") || "";
        const action = getAction(link);

        return (
            rawHref.includes("#") ||
            href.includes("#") ||
            href.includes("diff=") ||
            href.includes("oldid=") ||
            href.includes("curid=") ||
            href.includes("target=") ||
            href.includes("page=user:") ||
            (action && action !== "edit") ||
            link.getAttribute("role") === "button" ||
            link.classList.contains("image") ||
            link.querySelector("img") ||
            link.closest(".toc") ||
            link.closest("#toc") ||
            link.closest(".user-identity-stats") ||
            link.closest("#p-tb") ||
            link.closest(".page-tools-module") ||
            link.closest(".global-explore-navigation__nav") ||
            link.closest(".blog-listing__title") ||
            link.closest(".blog-listing__read-post")
        );
    }

    function matchesUserTitle(title, name) {
        function isExactlyOrSubpage(prefix) {
            const base = prefix + name;

            return title === base || title.indexOf(base + "/") === 0;
        }

        return (
            isExactlyOrSubpage("user:") ||
            isExactlyOrSubpage("user talk:") ||
            isExactlyOrSubpage("message wall:") ||
            isExactlyOrSubpage("user blog:")
        );
    }

    function getLinkType(link, username) {
        if (!isCrossWikiAllowedForLink(link, username)) return null;

        const title = getLinkTitle(link);
        const name = normalize(username);
        const edit = isEditLink(link);
        const inProfileNav = Boolean(link.closest(".user-profile-navigation"));

        function isUnderPrefix(prefix) {
            return title.indexOf(prefix) === 0 && title.slice(prefix.length) === name;
        }

        if (matchesUserTitle(title, name)) {
            if (edit) return "edit";
            if (inProfileNav) return "nav";
            return "name";
        }

        if (
            isUnderPrefix("special:contributions/") ||
            isUnderPrefix("special:userprofileactivity/")
        ) {
            if (inProfileNav) return "nav";
            return "related";
        }

        return null;
    }

    function addTypeClasses(element, user, type) {
        element.classList.add("us-" + type);
        element.classList.add("us-user-" + user.slug + "-" + type);

        if (user.group) {
            element.classList.add("us-" + user.group + "-" + type);
        }
    }

    function addClasses(element, user, type) {
        const isEdit = type === "edit";
        const navItem = type === "nav" ? element.closest(".user-profile-navigation__link") : null;
        const isActiveNav = Boolean(navItem && navItem.classList.contains("is-active"));

        if (!isEdit) {
            element.classList.add("us-user");
            element.classList.add("us-user-" + user.slug);

            if (user.group) {
                element.classList.add("us-" + user.group);
            }
        }

        if (type) {
            addTypeClasses(element, user, type);
        }

        if (isActiveNav) {
            element.classList.add("us-nav-active");
            element.classList.add("us-user-" + user.slug + "-nav-active");

            navItem.classList.add("us-nav-item-active");
            navItem.classList.add("us-user-" + user.slug + "-nav-item-active");

            if (user.group) {
                element.classList.add("us-" + user.group + "-nav-active");
                navItem.classList.add("us-" + user.group + "-nav-item-active");
            }

            [0, 50, 250, 1000, 2500].forEach(function (delay) {
                setTimeout(function () {
                    const navLink = navItem.querySelector("a");
                    const color = navLink ? getComputedStyle(navLink).color : "";

                    if (!color) return;

                    navItem.style.setProperty("border-bottom", "4px solid " + color, "important");
                    navItem.style.setProperty("opacity", "1", "important");
                }, delay);
            });
        }

        element.dataset.usUser = user.name;
        element.dataset.usGroup = user.group || "";
        element.dataset.usType = type || "";
    }

    function styleLinks(root) {
        const users = getUsers();

        (root || document).querySelectorAll("a[href]").forEach(function (link) {
            if (shouldSkipLink(link)) return;

            users.forEach(function (user) {
                const type = getLinkType(link, user.name);

                if (!type) return;

                addClasses(link, user, type);
            });
        });
    }

    function styleProfileHeaders() {
        document.querySelectorAll(".user-identity-header__attributes").forEach(function (header) {
            const displayName = header.querySelector("h1");
            const nicknameLine = header.querySelector("h2");

            if (!displayName) return;

            getUsers().forEach(function (user) {
                if (normalize(displayName.textContent) !== normalize(user.name)) return;

                addClasses(displayName, user, "name");

                if (nicknameLine && !nicknameLine.querySelector(".us-nickname")) {
                    Array.from(nicknameLine.childNodes).forEach(function (node) {
                        if (node.nodeType !== Node.TEXT_NODE) return;
                        if (!node.textContent.trim()) return;

                        const nickname = document.createElement("span");

                        nickname.textContent = node.textContent;
                        addClasses(nickname, user, "nickname");
                        node.replaceWith(nickname);
                    });
                }
            });
        });
    }

    function applyUserStyles(root) {
        styleLinks(root);
        styleProfileHeaders();
    }

    applyUserStyles(document);

    if (crossWikiSetting() === "unset") {
        detectGlobalJs(function () {
            detectGlobalCss(function () {
                crossWikiEnabled = true;
                applyUserStyles(document);
            });
        });
    }

    if (window.mw && mw.hook) {
        mw.hook("wikipage.content").add(function ($content) {
            applyUserStyles($content[0]);
        });
    }

    let mutationTimer = null;

    new MutationObserver(function () {
        if (mutationTimer) clearTimeout(mutationTimer);

        mutationTimer = setTimeout(function () {
            applyUserStyles(document);
        }, 150);
    }).observe(document.body, {
        childList: true,
        subtree: true
    });
})();