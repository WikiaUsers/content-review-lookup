mw.loader.using('mediawiki.api').then(
    function () {
        /* Load i18n messages */
        mw.hook('dev.i18n').add(
            function (i18n) {
                i18n.loadMessages('RelatedDiscussionsPosts').done(
                    function (i18n) {
                        if (mw.config.get("wgNamespaceNumber") === 0) {
                            mw.util.addCSS('.ve-activated * #rdp-base { display: none !important }');

                            var rdp_base = document.createElement("div");
                            rdp_base.id = "rdp-base";
                            rdp_base.className = "rdp rdp-base";

                            Object.assign(rdp_base.style, {
                                background: "rgba(186, 205, 216, 0.1)",
                                border: "1px solid rgba(191, 191, 191, 0.5)",
                                borderRadius: "5px",
                                clear: "both",
                                marginTop: "20px",
                                padding: "18px"
                            });

                            $("#articleCategories").after(rdp_base);

                            var rdp_wrapper = document.createElement("div");
                            rdp_wrapper.id = "rdp-wrapper";
                            rdp_wrapper.className = "rdp-wrapper";

                            Object.assign(rdp_wrapper.style, {
                                display: "flex",
                                gap: "18px"
                            });

                            rdp_base.appendChild(rdp_wrapper);

                            var rdp_thumb = document.createElement("div");
                            rdp_thumb.id = "rdp-thumb";
                            rdp_thumb.className = "rdp-thumb";

                            var rdp_image = document.createElement("div");
                            rdp_image.id = "rdp-image";
                            rdp_image.className = "rdp-image";

                            Object.assign(rdp_image.style, {
                                border: "2px solid gray",
                                borderRadius: "40px",
                                height: "40px",
                                width: "40px"
                            });

                            var rdp_bg = document.createElement("div");
                            rdp_bg.id = "rdp-bg";
                            rdp_bg.className = "rdp-bg";

                            Object.assign(rdp_bg.style, {
                                backgroundSize: "contain",
                                borderRadius: "40px",
                                height: "100%",
                                width: "100%"
                            });

                            var rdp_header = document.createElement("div");
                            rdp_header.id = "rdp-header";
                            rdp_header.className = "rdp-header";

                            Object.assign(rdp_header.style, {
                                display: "flex",
                                flexDirection: "column",
                                width: "100%"
                            });

                            rdp_wrapper.appendChild(rdp_thumb);

                            rdp_thumb.appendChild(rdp_image);
                            rdp_image.appendChild(rdp_bg);

                            rdp_wrapper.appendChild(rdp_header);

                            var rdp_header_text = document.createElement("span");
                            rdp_header_text.id = "rdp-header-text";
                            rdp_header_text.className = "rdp-header-text";

                            Object.assign(rdp_header_text.style, {
                                fontSize: "18px",
                                fontWeight: "bold"
                            });

                            rdp_header_text.innerHTML = i18n.msg('headerText').plain();

                            var rdp_header_linkWrapper = document.createElement("span");
                            rdp_header_linkWrapper.id = "rdp-header-linkWrapper";
                            rdp_header_linkWrapper.className = "rdp-header-linkWrapper";

                            rdp_header.appendChild(rdp_header_text);
                            rdp_header.appendChild(rdp_header_linkWrapper);

                            var rdp_header_link = document.createElement("a");
                            rdp_header_link.id = "rdp-header-link";
                            rdp_header_link.className = "rdp-header-link";

                            Object.assign(rdp_header_link.style, {
                                fontSize: "14px"
                            });

                            rdp_header_link.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/t/" + mw.config.get("wgPageName"));
                            rdp_header_link.innerHTML = i18n.msg('headerLink', mw.config.get("wgPageName").replace(/_/g, " ")).plain();

                            rdp_header_linkWrapper.appendChild(rdp_header_link);

                            var rdp_list = document.createElement("ul");
                            rdp_list.id = "rdp-list";
                            rdp_list.className = "rdp-list";

                            Object.assign(rdp_list.style, {
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                marginTop: "10px",
                                width: "100%"
                            });

                            rdp_wrapper.after(rdp_list);

                            $.ajax({
                                url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/api/v1/Articles/Details"),
                                type: "GET",
                                data: {
                                    ids: mw.config.get("wgArticleId")
                                }
                            }).done(
                                function (data) {
                                    if (data.items[mw.config.get("wgArticleId")].thumbnail !== null) {
                                        rdp_bg.style.backgroundImage = "url(" + data.items[mw.config.get("wgArticleId")].thumbnail + ")";
                                    } else {
                                        rdp_bg.style.backgroundColor = "#222";

                                        var rdp_bg_icon = document.createElement("div");
                                        rdp_bg_icon.id = "rdp-bg-icon";
                                        rdp_bg_icon.className = "rdp-bg-icon";

                                        Object.assign(rdp_bg_icon.style, {
                                            backgroundImage: "url('/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/wds-icons-tag.svg')",
                                            width: "100%",
                                            height: "100%",
                                            backgroundSize: "50%",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            filter: "invert(1)"
                                        });

                                        rdp_bg.appendChild(rdp_bg_icon);
                                    }
                                }
                            );

                            $.ajax({
                                url: mw.config.get("wgServicesExternalDomain") + "discussion/" + mw.config.get("wgCityId") + "/threads?tag=" + mw.config.get("wgPageName").replace(/_/g, "+"),
                                type: "GET"
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

                                        for (i in rdp_threads) {
                                            var rdp_item = document.createElement("li");
                                            rdp_item.id = "rdp-item-" + i;
                                            rdp_item.className = "rdp-item";

                                            Object.assign(rdp_item.style, {
                                                background: "rgba(186, 205, 216, 0.1)",
                                                border: "1px solid rgba(191, 191, 191, 0.5)",
                                                borderRadius: "5px",
                                                textDecoration: "none",
                                                width: "100%"
                                            });

                                            var rdp_item_content = document.createElement("a");
                                            rdp_item_content.className = "rdp-item-content";

                                            Object.assign(rdp_item_content.style, {
                                                display: "grid",
                                                gridTemplateAreas: "'avatar text additional'",
                                                gridTemplateColumns: "60px 1fr 60px",
                                                gridTemplateRows: "auto"
                                            });

                                            rdp_item_content.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/p/" + rdp_threads[i].id;

                                            var rdp_item_avatar = document.createElement("a");
                                            rdp_item_avatar.id = "rdp-item-avatar";
                                            rdp_item_avatar.className = "rdp-item-avatar";

                                            Object.assign(rdp_item_avatar.style, {
                                                gridArea: "avatar",
                                                margin: "13px auto",
                                                borderRadius: "20px"
                                            });

                                            if (rdp_threads[i].createdBy.name !== null) {
                                                rdp_item_avatar.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/User:" + rdp_threads[i].createdBy.name;
                                            }

                                            var rdp_item_text = document.createElement("div");
                                            rdp_item_text.id = "rdp-item-text";
                                            rdp_item_text.className = "rdp-item-text";

                                            Object.assign(rdp_item_text.style, {
                                                display: "flex",
                                                flexDirection: "column",
                                                gridArea: "text",
                                                justifyContent: "center",
                                                margin: "10px 0"
                                            });

                                            var rdp_item_additional = document.createElement("div");
                                            rdp_item_additional.id = "rdp-item-additional";
                                            rdp_item_additional.className = "rdp-item-additional";

                                            Object.assign(rdp_item_additional.style, {
                                                gridArea: "additional"
                                            });

                                            rdp_list.appendChild(rdp_item);
                                            rdp_item.appendChild(rdp_item_content);

                                            rdp_item_content.appendChild(rdp_item_avatar);
                                            rdp_item_content.appendChild(rdp_item_text);
                                            rdp_item_content.appendChild(rdp_item_additional);

                                            var rdp_item_avatar_image = document.createElement("div");

                                            rdp_item_avatar_image.style.height = "30px";
                                            rdp_item_avatar_image.style.width = "30px";
                                            rdp_item_avatar_image.style.borderRadius = "20px";

                                            if (rdp_threads[i].createdBy.avatarUrl !== null) {
                                                rdp_item_avatar_image.style.border = "2px solid gray"
                                                rdp_item_avatar_image.style.backgroundSize = "100%";
                                                rdp_item_avatar_image.style.backgroundImage = "url('" + rdp_threads[i].createdBy.avatarUrl + "')";
                                            } else {
                                                rdp_item_avatar_image.style.filter = "invert(.5)";
                                                rdp_item_avatar_image.style.backgroundImage = "url('/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/wds-icons-avatar.svg')";
                                            }

                                            rdp_item_avatar.appendChild(rdp_item_avatar_image)

                                            var rdp_item_title = document.createElement("span");
                                            rdp_item_title.className = "rdp-item-title";

                                            Object.assign(rdp_item_title.style, {
                                                fontWeight: "bold"
                                            });

                                            rdp_item_title.innerHTML = rdp_threads[i].title;

                                            var rdp_item_author = document.createElement("span");

                                            Object.assign(rdp_item_author.style, {
                                                lineHeight: "14px"
                                            });

                                            rdp_item_author_link = document.createElement("a");

                                            if (rdp_threads[i].createdBy.name !== null) {
                                                rdp_item_author_link.innerHTML = rdp_threads[i].createdBy.name;
                                                rdp_item_author_link.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/User:" + rdp_threads[i].createdBy.name;
                                            } else {
                                                rdp_item_author_link.innerHTML = mw.message("oasis-anon-user").parse();
                                            }

                                            rdp_item_author_link.style = "font-size: 12px; margin-top: 2px";

                                            var rdp_item_additional_content = document.createElement("div");
                                            rdp_item_additional_content.style = "background: #8080809e; width: 40px; height: 40px; margin: 10px auto; border-radius: 5px; background-repeat: no-repeat"

                                            if (rdp_threads[i]._embedded.attachments[0].polls.length !== 0) {
                                                rdp_item_additional.appendChild(rdp_item_additional_content);

                                                Object.assign(rdp_item_additional_content.style, {
                                                    backgroundImage: "url('https://wikies.fandom.com/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/wds-icons-poll.svg')",
                                                    backgroundPosition: "center",
                                                    backgroundSize: "20px"
                                                });
                                            } else if (rdp_threads[i]._embedded.attachments[0].contentImages.length !== 0) {
                                                rdp_item_additional.appendChild(rdp_item_additional_content);

                                                Object.assign(rdp_item_additional_content.style, {
                                                    backgroundImage: "url(" + rdp_threads[i]._embedded.attachments[0].contentImages[0].url + ")",
                                                    backgroundPosition: "center",
                                                    backgroundSize: "cover"
                                                });
                                            }

                                            rdp_item_text.appendChild(rdp_item_title);
                                            rdp_item_text.appendChild(rdp_item_author);
                                            rdp_item_author.appendChild(rdp_item_author_link);
                                        }

                                        var rdp_viewMore = document.createElement("span");
                                        rdp_viewMore.id = "rdp_viewMore";
                                        rdp_viewMore.className = "rdp_viewMore";

                                        Object.assign(rdp_viewMore.style, {
                                            display: "inline-block",
                                            marginTop: "5px",
                                            textAlign: "right",
                                            width: "100%"
                                        });

                                        var rdp_viewMore_link = document.createElement("a");
                                        rdp_viewMore_link.id = "rdp_viewMore-link";
                                        rdp_viewMore_link.className = "rdp_viewMore-link";

                                        Object.assign(rdp_viewMore_link.style, {
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            lineHeight: "30px"
                                        });

                                        rdp_viewMore_link.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/t/" + mw.config.get("wgPageName");
                                        rdp_viewMore_link.innerHTML = i18n.msg('viewMoreLink').plain() + " (" + rdp_threads_stack + ")";

                                        if (rdp_threads_stack !== 0) {
                                            rdp_list.after(rdp_viewMore);
                                            rdp_viewMore.appendChild(rdp_viewMore_link);
                                        }
                                    } else {
                                        rdp_list.style.display = "none";
                                    }
                                }
                            );
                        }
                    }
                );
            }
        );

        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
);