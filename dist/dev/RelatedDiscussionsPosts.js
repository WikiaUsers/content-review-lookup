var nkch = typeof window.nkch != "undefined" ? window.nkch : new Object();
window.nkch = nkch;

nkch.rdp = typeof nkch.rdp != "undefined" ? nkch.rdp : new Object();

if (!nkch.rdp.isActive && mw.config.get("wgNamespaceNumber") === 0) {
    nkch.rdp.isActive = true;

    mw.loader.using(["mediawiki.api", "mediawiki.util"],
        function () {
            mw.hook("dev.i18n").add(
                function (i18n) {
                    i18n.loadMessages("RelatedDiscussionsPosts").done(
                        function (i18n) {
                            $.ajax({
                                url: mw.util.wikiScript("wikia"),
                                type: "GET",
                                data: {
                                    controller: "DiscussionThread",
                                    method: "getThreads",
                                    tag: mw.config.get("wgPageName").replace(/_/g, ' '),
                                    format: "json"
                                }
                            }).done(
                                function (data) {
                                    var rdp_threads = data._embedded.threads;
                                    console.log(rdp_threads);

                                    if (rdp_threads !== 'undefined' && rdp_threads.length > 0) {
                                        var rdp_threads_stack = 0;

                                        if (rdp_threads.length > 3) {
                                            rdp_threads_stack = rdp_threads.length - 3;
                                            rdp_threads.length = 3;
                                        }

                                        mw.util.addCSS(
                                            ".nkch-rdp { background-color: var(--theme-page-background-color--secondary); border: 1px solid var(--theme-border-color); border-radius: 3px; margin-block: 10px; padding: 18px; }" +
                                            ".nkch-rdp__content { display: flex; flex-direction: column; gap: 10px; }" +
                                            ".nkch-rdp__header { align-items: center; display: flex; gap: 18px; }" +
                                            ".nkch-rdp__header-thumb { background-color: black; border: 2px solid var(--theme-border-color); border-radius: 50%; height: 50px; overflow: hidden; width: 50px; }" +
                                            ".nkch-rdp__header-thumb--no-image { align-items: center; background-color: var(--theme-accent-color); border: none; color: var(--theme-accent-label-color); display: flex; justify-content: center; }" +
                                            ".nkch-rdp__header-text-wrapper { display: flex; flex-direction: column; }" +
                                            ".nkch-rdp__header-text { font-size: 16px; }" +
                                            ".nkch-rdp__list { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }" +
                                            ".nkch-rdp__item-content { background-color: var(--theme-page-background-color); border: 1px solid var(--theme-border-color); border-radius: 3px; color: var(--theme-page-text-color); display: flex; min-height: 60px; transition: .3s; }" +
                                            ".nkch-rdp__item-content:hover { background-color: var(--theme-page-background-color--secondary); }" +
                                            ".nkch-rdp__item-content:hover { color: var(--theme-page-text-color); text-decoration: none; }" +
                                            ".nkch-rdp__item-text { display: flex; flex-direction: column; flex: 1; justify-content: center; overflow: hidden; }" +
                                            ".nkch-rdp__item-title { font-weight: bold; }" +
                                            ".nkch-rdp__item-title, .nkch-rdp__item-author-link { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }" +
                                            ".nkch-rdp__item-author { line-height: 14px; }" +
                                            ".nkch-rdp__item-author-link { font-size: 12px; }" +
                                            ".nkch-rdp__item-user-wrapper { align-items: center; display: flex; justify-content: center; width: 60px; }" +
                                            ".nkch-rdp__item-user { align-items: center; border-radius: 50%; display: flex; height: 30px; justify-content: center; width: 30px; }" +
                                            ".nkch-rdp__item-extra { align-items: center; display: flex; justify-content: center; }" +
                                            ".nkch-rdp__item-extra-content { align-items: center; background-color: rgba(var(--theme-accent-color--rgb), .3); border-radius: 3px; display: flex; height: 40px; justify-content: center; margin-inline: 9px; overflow: hidden; width: 40px; }" +
                                            ".nkch-rdp__item-extra-content-icon { color: var(--theme-accent-color); }" +
                                            ".nkch-rdp__item-extra-attachment { background-position: center; background-size: cover; }" +
                                            ".nkch-rdp__view-more-link-container { float: right; }"
                                        );

                                        var tagLink = "/f/t/" + encodeURIComponent(mw.config.get("wgPageName").replace(/_/g, " "));

                                        const rdp__base = $("<div>", {
                                            class: "nkch-rdp"
                                        });

                                        document.querySelector(".license-description").after(rdp__base[0]);

                                        const rdp__content = $("<div>", {
                                            class: "nkch-rdp__content"
                                        }).appendTo(rdp__base);

                                        const rdp__header = $("<header>", {
                                            class: "nkch-rdp__header"
                                        }).appendTo(rdp__content);

                                        const rdp__header_thumb = $("<div>", {
                                            class: "nkch-rdp__header-thumb"
                                        }).appendTo(rdp__header);

                                        $.ajax({
                                            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/api/v1/Articles/Details"),
                                            type: "GET",
                                            data: {
                                                ids: mw.config.get("wgArticleId")
                                            }
                                        }).done(
                                            function (details) {
                                                switch (details.items[mw.config.get("wgArticleId")].thumbnail !== null) {
                                                    case true:
                                                        $("<img>", {
                                                                src: details.items[mw.config.get("wgArticleId")].thumbnail,
                                                                class: "nkch-rdp__header-thumb-image",
                                                            })
                                                            .attr("width", 46)
                                                            .appendTo(rdp__header_thumb);
                                                        break;
                                                    case false:
                                                        rdp__header_thumb[0].classList.add("nkch-rdp__header-thumb--no-image");

                                                        $("<svg class='nkch-rdp__header-thumb-icon wds-icon'><use xlink:href='#wds-icons-tag-small'></use></svg>").appendTo(rdp__header_thumb);
                                                        break;
                                                }
                                            }
                                        );

                                        const rdp__header_text_wrapper = $("<div>", {
                                            class: "nkch-rdp__header-text-wrapper"
                                        }).appendTo(rdp__header);

                                        const rdp__header_text = $("<h2>", {
                                            class: "nkch-rdp__header-text",
                                            text: i18n.msg("headerText").plain()
                                        }).appendTo(rdp__header_text_wrapper);

                                        const rdp__header_link_container = $("<span>", {
                                            class: "nkch-rdp__header-link-container"
                                        }).appendTo(rdp__header_text_wrapper);

                                        const rdp__header_link = $("<a>", {
                                            class: "nkch-rdp__header-link",
                                            href: tagLink,
                                            text: i18n.msg("headerLink", mw.config.get("wgPageName").replace(/_/g, " ")).plain()
                                        }).appendTo(rdp__header_link_container);

                                        const rdp__list = $("<ul>", {
                                            class: "nkch-rdp__list"
                                        }).appendTo(rdp__content);

                                        for (var i in rdp_threads) {
                                            var rdp__item = $("<li>", {
                                                class: "nkch-rdp__item " + mw.util.escapeIdForAttribute("nkch-rdp__item--created-by-" + rdp_threads[i].createdBy.name)
                                            }).appendTo(rdp__list);

                                            var rdp__item_content = $("<a>", {
                                                class: "nkch-rdp__item-content",
                                                href: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/p/" + rdp_threads[i].id
                                            }).appendTo(rdp__item);

                                            var rdp__item_user_wrapper = $("<a>", {
                                                class: "nkch-rdp__item-user-wrapper"
                                            }).appendTo(rdp__item_content);

                                            var rdp__item_user = $("<a>", {
                                                class: "nkch-rdp__item-user wds-avatar",
                                                href: mw.util.getUrl(new mw.Title(rdp_threads[i].createdBy.name, 2).getPrefixedText()),
                                                title: new mw.Title(rdp_threads[i].createdBy.name, 2)
                                            }).appendTo(rdp__item_user_wrapper);

                                            switch (rdp_threads[i].createdBy.avatarUrl !== null) {
                                                case true:
                                                    $("<img>", {
                                                            src: rdp_threads[i].createdBy.avatarUrl,
                                                            class: "nkch-rdp__item-avatar wds-avatar__image",
                                                        })
                                                        .attr("width", 46)
                                                        .appendTo(rdp__item_user);
                                                    break;
                                                case false:
                                                    $("<svg class='nkch-rdp__item-no-avatar wds-icon'><use xlink:href='#wds-icons-avatar'></use></svg>").appendTo(rdp__item_user);
                                                    break;
                                            }

                                            var rdp__item_text = $("<div>", {
                                                class: "nkch-rdp__item-text",
                                            }).appendTo(rdp__item_content);

                                            var rdp__item_text_title = $("<span>", {
                                                class: "nkch-rdp__item-title",
                                                text: rdp_threads[i].title
                                            }).appendTo(rdp__item_text);

                                            var rdp__item_text_author = $("<span>", {
                                                class: "nkch-rdp__item-author",
                                            }).appendTo(rdp__item_text);

                                            var rdp__item_text_author_link = $("<a>", {
                                                class: "nkch-rdp__item-author-link",
                                                title: new mw.Title(rdp_threads[i].createdBy.name, 2)
                                            }).appendTo(rdp__item_text_author);

                                            if (rdp_threads[i].createdBy.name !== null) {
                                                rdp__item_text_author_link.html(rdp_threads[i].createdBy.name);
                                                rdp__item_text_author_link.attr("href", mw.util.getUrl(new mw.Title(rdp_threads[i].createdBy.name, 2).getPrefixedText()));
                                            } else {
                                                rdp__item_text_author_link.innerHTML = mw.message("fd-notifications-anon-user").parse();
                                            }

                                            var rdp__item_extra = $("<div>", {
                                                class: "nkch-rdp__item-extra"
                                            }).appendTo(rdp__item_content);

                                            if (rdp_threads[i]._embedded.attachments[0].polls.length > 0) {
                                                var rdp__item_extra_content = $("<div>", {
                                                    class: "nkch-rdp__item-extra-content nkch-rdp__item-extra-poll"
                                                }).appendTo(rdp__item_extra);

                                                $("<svg class='nkch-rdp__item-extra-content-icon wds-icon wds-icon-small'><use xlink:href='#wds-icons-poll-small'></use></svg>").appendTo(rdp__item_extra_content);
                                            } else if (rdp_threads[i]._embedded.attachments[0].contentImages.length > 0) {
                                                var rdp__item_extra_content = $("<div>", {
                                                    class: "nkch-rdp__item-extra-content nkch-rdp__item-extra-attachment"
                                                }).appendTo(rdp__item_extra);

                                                rdp__item_extra_content[0].style.backgroundImage = "url(" + rdp_threads[i]._embedded.attachments[0].contentImages[0].url + ")";
                                            }
                                        }

                                        if (rdp_threads_stack > 0) {
                                            const rdp__viewmore = $("<div>", {
                                                class: "nkch-rdp__view-more"
                                            }).appendTo(rdp__content);

                                            const rdp__viewmore_link_container = $("<span>", {
                                                class: "nkch-rdp__view-more-link-container"
                                            }).appendTo(rdp__viewmore);

                                            const rdp__viewmore_link = $("<a>", {
                                                class: "nkch-rdp__view-more-link",
                                                href: tagLink,
                                                text: i18n.msg("viewMoreLink").plain()
                                            }).appendTo(rdp__viewmore_link_container);
                                        }
                                    }
                                }
                            );
                        }
                    )
                }
            )
        }
    );
}