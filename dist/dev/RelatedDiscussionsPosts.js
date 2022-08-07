;(function(window, $, mw) {
	'use strict';
	var nkch = typeof window.nkch != "undefined" ? window.nkch : {};
	window.nkch = nkch;
	
	nkch.rdp = typeof nkch.rdp != "undefined" ? nkch.rdp : {};
	
	const config = mw.config.get([
		'wgScriptPath',
		'wgPageName',
		'wgServer',
		'wgArticleId',
		'wgNamespaceNumber'
	]);
	var msg;
	function init() {
	    $.get(config.wgScriptPath + '/wikia.php', {
            controller: "DiscussionThread",
            method: "getThreads",
            tag: config.wgPageName.replace(/_/g, ' '),
            format: "json"
	    }).done(function (data) {
            var rdp_threads = data._embedded.threads;
            console.log(rdp_threads);

            if (rdp_threads !== 'undefined' && rdp_threads.length > 0) {
                var rdp_threads_stack = 0;

                if (rdp_threads.length > 3) {
                    rdp_threads_stack = rdp_threads.length - 3;
                    rdp_threads.length = 3;
                }

                var tagLink = config.wgScriptPath + "/f/t/" + encodeURIComponent(config.wgPageName.replace(/_/g, " "));

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

                rdp__header_thumb[0].classList.add("nkch-rdp__header-thumb--no-image");
                $("<svg class='nkch-rdp__header-thumb-icon wds-icon'><use xlink:href='#wds-icons-tag-small'></use></svg>").appendTo(rdp__header_thumb);

                if (nkch.rdp.showThumb) {
                    $.ajax({
                        url: encodeURI(config.wgServer + config.wgScriptPath + "/api/v1/Articles/Details"),
                        type: "GET",
                        data: {
                            ids: config.wgArticleId
                        }
                    }).done(
                        function (details) {
                            if (details.items[config.wgArticleId].thumbnail !== null) {
                                rdp__header_thumb[0].classList.remove("nkch-rdp__header-thumb--no-image");
                                $(".nkch-rdp__header-thumb-icon").remove();

                                $("<img>", {
                                        src: details.items[config.wgArticleId].thumbnail,
                                        class: "nkch-rdp__header-thumb-image",
                                    })
                                    .attr("width", 46)
                                    .appendTo(rdp__header_thumb);
                            }
                        }
                    );
                }

                const rdp__header_text_wrapper = $("<div>", {
                    class: "nkch-rdp__header-text-wrapper"
                }).appendTo(rdp__header);

                const rdp__header_text = $("<h2>", {
                    class: "nkch-rdp__header-text",
                    text: msg("headerText").plain()
                }).appendTo(rdp__header_text_wrapper);

                const rdp__header_link_container = $("<span>", {
                    class: "nkch-rdp__header-link-container"
                }).appendTo(rdp__header_text_wrapper);

                const rdp__header_link = $("<a>", {
                    class: "nkch-rdp__header-link",
                    href: tagLink,
                    text: msg("headerLink", config.wgPageName.replace(/_/g, " ")).plain()
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
                        href: config.wgServer + config.wgScriptPath + "/f/p/" + rdp_threads[i].id
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
                    var rdp__item_extra_content;
                    if (rdp_threads[i]._embedded.attachments[0].polls.length > 0) {
                        rdp__item_extra_content = $("<div>", {
                            class: "nkch-rdp__item-extra-content nkch-rdp__item-extra-poll"
                        }).appendTo(rdp__item_extra);

                        $("<svg class='nkch-rdp__item-extra-content-icon wds-icon wds-icon-small'><use xlink:href='#wds-icons-poll-small'></use></svg>").appendTo(rdp__item_extra_content);
                    } else if (rdp_threads[i]._embedded.attachments[0].contentImages.length > 0) {
                        rdp__item_extra_content = $("<div>", {
                            class: "nkch-rdp__item-extra-content nkch-rdp__item-extra-attachment"
                        }).appendTo(rdp__item_extra);

                        rdp__item_extra_content[0].style.backgroundImage = "url(" + rdp_threads[i]._embedded.attachments[0].contentImages[0].url + ")";
                    }
                }

                if (rdp_threads_stack > 0) {
                	$(rdp__content).append('<div class="nkch-rdp__view-more">' +
                		'<span class="nkch-rdp__view-more-link-container">' +
                			'<a class="nkch-rdp__view-more-link" href="' + tagLink + '">' + msg("viewMoreLink").escape() + '</a>' +
                		'</span>' +
                	'</div>');
                }
            }
        });
	}
	    
	if (!nkch.rdp.isActive && config.wgNamespaceNumber === 0) {
	    nkch.rdp.isActive = true;
	    mw.loader.using(["mediawiki.api", "mediawiki.util"], function () {
	        mw.hook('dev.i18n').add(function(i18n) {
	            i18n.loadMessages('RelatedDiscussionsPosts').done(function(i18no) {
	                msg = i18no.msg;
	                init();
	            });
	        });
	        importArticles(
	            {
	                type: 'script',
	                article: 'u:dev:MediaWiki:I18n-js/code.js'
	            },
	            {
	                type: 'style',
	                article: 'u:dev:MediaWiki:RelatedDiscussionsPosts.css'
	            }
	        );
	    });
	}
})(window, window.jQuery, window.mediaWiki);