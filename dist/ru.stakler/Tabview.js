// Creating a tabber to navigate between articles about the object and the history of its development
// by Не кочан
mw.loader.using(["mediawiki.util"]).then(
    function () {
        var type;

        var title = mw.config.get("wgTitle");
        var titleSplitted = title.split("/");

        switch (titleSplitted.length < 2) {
            case true:
                type = "page";
                break;
            case false:
                type = "subpage";
                break;
        }

        const sw_tabview = document.createElement("div");

        sw_tabview.classList.add("sw-tabview-js");

        Object.assign(sw_tabview.style, {
            alignItems: "flex-end",
            display: "flex",
            justifyContent: "center",
            padding: "5px 0"
        });

        document.querySelector(".sw-tabview").before(sw_tabview);
        document.querySelector(".sw-tabview").remove();


        const sw_tabview_tabs = document.createElement("ul");

        sw_tabview_tabs.classList.add("sw-tabview-js__tabs");

        Object.assign(sw_tabview_tabs.style, {
            display: "flex",
            gap: "5px",
            listStyle: "none",
            margin: 0
        });

        sw_tabview.appendChild(sw_tabview_tabs);


        const sw_tabview_tabs__release = document.createElement("li");

        sw_tabview_tabs__release.classList.add("sw-tabview-js__tab");
        if (type === "page") sw_tabview_tabs__release.classList.add("is-active");

        Object.assign(sw_tabview_tabs__release.style, {
            cursor: "pointer"
        });

        sw_tabview_tabs.appendChild(sw_tabview_tabs__release);


        const sw_tabview_tabs__release_link = document.createElement("a");

        sw_tabview_tabs__release_link.classList.add("sw-tabview-js__tab-link");

        Object.assign(sw_tabview_tabs__release_link.style, {
            display: "block",
            padding: "8px 15px"
        });

        if (type === "subpage") sw_tabview_tabs__release_link.href = mw.util.getUrl(mw.Title.makeTitle(0, titleSplitted[0]).getPrefixedText());
        sw_tabview_tabs__release_link.innerHTML = "В игре";

        sw_tabview_tabs__release.appendChild(sw_tabview_tabs__release_link);


        const sw_tabview_tabs__prerelease = document.createElement("li");

        sw_tabview_tabs__prerelease.classList.add("sw-tabview-js__tab");
        if (type === "subpage") sw_tabview_tabs__prerelease.classList.add("is-active");

        Object.assign(sw_tabview_tabs__prerelease.style, {
            cursor: "pointer"
        });

        sw_tabview_tabs.appendChild(sw_tabview_tabs__prerelease);


        const sw_tabview_tabs__prerelease_link = document.createElement("a");

        sw_tabview_tabs__prerelease_link.classList.add("sw-tabview-js__tab-link");

        Object.assign(sw_tabview_tabs__prerelease_link.style, {
            display: "block",
            padding: "8px 15px"
        });

        if (type === "page") sw_tabview_tabs__prerelease_link.href = mw.util.getUrl(mw.Title.makeTitle(0, titleSplitted[0] + "/История_разработки").getPrefixedText());
        sw_tabview_tabs__prerelease_link.innerHTML = "История разработки";

        sw_tabview_tabs__prerelease.appendChild(sw_tabview_tabs__prerelease_link);
    }
);