var nkch = typeof window.nkch != "undefined" ? window.nkch : new Object();
window.nkch = nkch;

nkch.og = typeof nkch.og != "undefined" ? nkch.og : new Object();

if (!nkch.og.isActive) {
    nkch.og.isActive = true;

    var og_list = document.querySelectorAll(".nkch-og__src");

    if (og_list.length > 0) {
        mw.loader.using(["mediawiki.util"], function () {
            mw.util.addCSS(
                ".nkch-og { margin-bottom: 10px; }" +
                ".nkch-og>a { text-decoration: none !important; }" +
                ".nkch-og__data { background-color: var(--theme-page-background-color--secondary); border: 1px solid var(--theme-border-color); border-radius: 3px; color: var(--theme-page-text-color); display: flex; font-size: 14px; overflow: hidden; }" +
                ".nkch-og__thumb>img { height: 175px; width: 175px; }" +
                ".nkch-og__details { display: flex; flex: 1; flex-direction: column; justify-content: space-between; overflow: hidden; overflow-wrap: break-word; padding: 18px; }" +
                ".nkch-og__title { font-size: 16px; font-weight: bold; }" +
                ".nkch-og__description { flex: 1; overflow: hidden; position: relative; }" +
                ".nkch-og__description.is-large { max-height: 75px; }" +
                ".nkch-og__description.is-large:after { content: ''; display: block; background-image: linear-gradient(transparent, var(--theme-page-background-color--secondary)); width: 100%; height: 30px; position: absolute; bottom: 0; }" +
                ".nkch-og__source { color: rgba(var(--theme-page-text-color--rgb), .6); font-weight: bold; }" +
                ".nkch-og__source svg { margin-left: 3px; }"
            );

            for (var i = 0; i < og_list.length; i++) {
                (function (og_item) {
                    var og_itemLink = og_item.querySelector("a");

                    if (og_itemLink == undefined) return;
                    if (og_itemLink.innerHTML.startsWith("javascript:")) return;
                    if (!og_itemLink.innerHTML.startsWith("http")) return;

                    $.get({
                            url: encodeURI("https://services.fandom.com/opengraph"),
                            data: {
                                uri: og_itemLink.innerText
                            },
                            xhrFields: {
                                withCredentials: true
                            }
                        })
                        .done(
                            function (data) {
                                if (data.type === "website" || data.type === "") {
                                    var og = document.createElement("div");
                                    og.classList.add("nkch-og");

                                    var og_link = document.createElement("a");
                                    og_link.classList.add("nkch-og__link");

                                    og_link.href = data.url;

                                    og_link.setAttribute("target", "_blank");
                                    og_link.setAttribute("rel", "noopener noreferrer");

                                    og.append(og_link);

                                    var og_data = document.createElement("div");
                                    og_data.classList.add("nkch-og__data");

                                    og_link.append(og_data);

                                    var og_thumb = document.createElement("div");
                                    og_thumb.classList.add("nkch-og__thumb");

                                    og_data.append(og_thumb);

                                    if (data.imageUrl !== null && data.imageUrl !== "") {
                                        var og_thumb_src = document.createElement("img");
                                        og_thumb_src.src = data.imageUrl + "/zoom-crop/width/175/height/175";

                                        og_thumb.append(og_thumb_src);
                                    }

                                    var og_details = document.createElement("div");
                                    og_details.classList.add("nkch-og__details");

                                    og_data.append(og_details);

                                    var og_summary = document.createElement("div");
                                    og_summary.classList.add("nkch-og__summary");

                                    og_details.append(og_summary);

                                    var og_title = document.createElement("div");
                                    og_title.classList.add("nkch-og__title");
                                    og_title.innerText = data.title;

                                    og_summary.append(og_title);

                                    if (data.description !== null && data.description !== "") {
                                        var og_description = document.createElement("div");
                                        og_description.classList.add("nkch-og__description");
                                        og_description.innerHTML = data.description;

                                        og_summary.append(og_description);
                                    }

                                    var og_source = document.createElement("div");
                                    og_source.classList.add("nkch-og__source");

                                    if (data.siteName !== null && data.siteName !== "") {
                                        og_source.innerText = data.siteName;
                                    } else {
                                        og_source.innerText = new mw.Uri(data.url).host;
                                    }

                                    og_details.append(og_source);

                                    $("<svg class='wds-icon wds-icon-tiny'><use xlink:href='#wds-icons-external-tiny'></use></svg>").appendTo($(og_source));

                                    og_item.after(og);

                                    if (data.description !== null && data.description !== "") {
                                        var og_description_isLarge = og_description.clientHeight > 85;
                                        og_description.classList.toggle("is-large", og_description_isLarge);
                                    }
                                }
                            }
                        )
                })(og_list[i]);
            }
        });
    }
}