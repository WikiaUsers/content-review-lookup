mw.loader.using("mediawiki.api").then(
    function () {
        return new mw.Api().loadMessagesIfMissing(["community-header-pages"]);
    }
).then(
    function () {
        $.ajax({
            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/api/v1/Articles/Details"),
            type: "GET",
            data: {
                controller: "DesignSystemApi",
                method: "getCommunityHeader",
                product: "wikis",
                id: mw.config.get("wgCityId"),
            }
        }).done(
            function (data) {
                var wikiTools = document.querySelectorAll(".wiki-tools");

                for (var i = 0; i < wikiTools.length; i++) {
                    var counter = document.createElement("div");

                    Object.assign(counter.style, {
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        justifyContent: "center",
                        textAlign: "right",
                        marginRight: "8px"
                    });

                    var counterValue = document.createElement("span");
                    counterValue.innerHTML = data.counter.value;

                    Object.assign(counterValue.style, {
                        display: "block",
                        fontWeight: "bold",
                        lineHeight: 1
                    });

                    counter.appendChild(counterValue);

                    var counterLabel = document.createElement("span");
                    if (mw.config.get("wgPageContentLanguage") == "ru") {
                        mw.messages.set("nkch-article-counter", "{{PLURAL:$1|страница|страницы|страниц}}");
                        counterLabel.innerHTML = mw.message("nkch-article-counter", +data.counter.value).text();
                    } else {
                        counterLabel.innerHTML = mw.message(data.counter.label.key).text();
                    }

                    Object.assign(counterLabel.style, {
                        display: "block",
                        fontSize: "10px",
                        fontWeight: "bold",
                        lineHeight: 1,
                        textTransform: "uppercase"
                    });

                    counter.appendChild(counterLabel);

                    wikiTools[i].children[0].before(counter);
                }
            }
        );
    }
);