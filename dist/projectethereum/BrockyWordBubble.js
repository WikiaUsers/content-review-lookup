/* Autumnal - Brocky Character Page */
var brockyWB = {
    eventHandlers: function() {
        $(".brocky-wb #slide-toggle").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest(".brocky-wb").find("#slide-panel").toggleClass("slide-pushed");
            $(this).closest(".brocky-wb").find("#navigation-panel").toggleClass('navigation-pushed');
            $(this).closest(".brocky-wb").find(".slide-left-icon").toggle(0);
            $(this).closest(".brocky-wb").find(".slide-right-icon").toggle(0);
        });
    
        $(".brocky-wb #about").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest("#navigation-panel").find(".close").not(this).click();
            $(this).closest(".brocky-wb").find("#about-panel").toggle(0);
            $(this).toggleClass("close");
            $(this).closest(".brocky-wb").find(".about-icon").toggle(0);
        });
    
        $(".brocky-wb #links").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest("#navigation-panel").find(".close").not(this).click();
            $(this).closest(".brocky-wb").find("#links-panel").toggle(0);
            $(this).toggleClass("close");
            $(this).closest(".brocky-wb").find(".links-icon").toggle(0);
        });

        $(".brocky-wb #tags").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest("#navigation-panel").find(".close").not(this).click();
            $(this).closest(".brocky-wb").find("#tags-panel").toggle(0);
            $(this).toggleClass("close");
            $(this).closest(".brocky-wb").find(".tags-icon").toggle(0);
        });

        $(".brocky-wb #faq").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest("#navigation-panel").find(".close").not(this).click();
            $(this).closest(".brocky-wb").find("#faq-panel").toggle(0);
            $(this).toggleClass("close");
            $(this).closest(".brocky-wb").find(".faq-icon").toggle(0);
        });

        $(".brocky-wb #blogroll").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest(".brocky-wb").find("img.lzy.lzyPlcHld").each(function() {
                if (typeof ImgLzy === "object") {
                    ImgLzy.load(this);
                }
            });

            $(this).closest("#navigation-panel").find(".close").not(this).click();
            $(this).closest(".brocky-wb").find("#blogroll-panel").toggle(0);
            $(this).toggleClass("close");
            $(this).closest(".brocky-wb").find(".blogroll-icon").toggle(0);
        });

        $(".brocky-wb #extra").on("click", function(event) {
            event.stopImmediatePropagation();

            $(this).closest("#navigation-panel").find(".close").not(this).click();
            $(this).closest(".brocky-wb").find("#extra-panel").toggle(0);
            $(this).toggleClass("close");
            $(this).closest(".brocky-wb").find(".extra-icon").toggle(0);
        });
    },
    dynamicDOMChanges: function(MutationObserver) {
        brockyWB.articleCommentsLoad(MutationObserver);
        brockyWB.pageEditor(MutationObserver);
        
        if ($(".article-comments").length) {
            $(".brocky-wb").each(function() {
                brockyWB.init();
            });

            brockyWB.newComment(MutationObserver);
        }
    },
    articleCommentsLoad: function(MutationObserver) {
        var brockyWBObserver = new MutationObserver(function(brockyWBMutations) {
            brockyWBMutations.forEach(function(brockyWBMutation) {
                Array.prototype.forEach.call(brockyWBMutation.addedNodes, function(brockyWBNode) {
                    if (brockyWBNode.className == "article-comments") {
                        brockyWBObserver.disconnect();

                        $(".article-comments").find(".brocky-wb").each(function() {
                            brockyWB.init();
                        });

                        brockyWB.newComment(MutationObserver);
                    }
                });
            });
        });

        var brockyWBObserverTarget = document.querySelector("#WikiaArticleComments"),
            brockyWBObserverConfig = {
                childList: true,
                subtree: true
            };

        if ($("#WikiaArticleComments").length) {
            brockyWBObserver.observe(brockyWBObserverTarget, brockyWBObserverConfig);
        }
    },
    newComment: function(MutationObserver) {
        var brockyWBCommentObserver = new MutationObserver(function(brockyWBCommentMutations) {
            brockyWBCommentMutations.forEach(function(brockyWBCommentMutation) {
                Array.prototype.forEach.call(brockyWBCommentMutation.addedNodes, function(brockyWBCommentNode) {
                    if (brockyWBCommentNode.tagName == "LI" || brockyWBCommentNode.className == "sub-comments") {
                        $(".brocky-wb").each(function() {
                            brockyWB.init();
                        });
                    }
                });
            });
        });

        var brockyWBCommentObserverTarget = document.querySelector("#article-comments-ul"),
            brockyWBCommentObserverConfig = {
                childList: true,
                subtree: true
            };

        brockyWBCommentObserver.observe(brockyWBCommentObserverTarget, brockyWBCommentObserverConfig);
    },
    pageEditor: function(MutationObserver) {
        if (wgAction == "edit") {
            if ("MutationObserver" in window) {
                var brockyWBEPObserver = new MutationObserver(function(brockyWBEPObserverMutations) {
                    brockyWBEPObserverMutations.forEach(function(brockyWBEPObserverMutation) {
                        Array.prototype.forEach.call(brockyWBEPObserverMutation.addedNodes, function(brockyWBEPObserverNode) {
                            if (brockyWBEPObserverNode.id == "EditPageDialog") {
                                brockyWB.articlePreview(MutationObserver);
                            }
                        });
                    });
                });

                var brockyWBEPObserverTarget = document.body,
                    brockyWBEPObserverConfig = {
                        childList: true,
                        subtree: true
                    };

                brockyWBEPObserver.observe(brockyWBEPObserverTarget, brockyWBEPObserverConfig);
            }
        }
    },
    articlePreview: function(MutationObserver) {
        var brockyWBAPObserver = new MutationObserver(function(brockyWBAPMutations) {
            brockyWBAPMutations.forEach(function(brockyWBAPMutation) {
                Array.prototype.forEach.call(brockyWBAPMutation.addedNodes, function(brockyWBAPNode) {
                    if (brockyWBAPNode.className == "WikiaArticle") {
                        brockyWBAPObserver.disconnect();

                        brockyWB.init();
                    }
                });
            });
        });

        var brockyWBAPObserverTarget = document.querySelector("#EditPageDialog"),
            brockyWBAPObserverConfig = {
                childList: true,
                subtree: true
            };

        brockyWBAPObserver.observe(brockyWBAPObserverTarget, brockyWBAPObserverConfig);
    },
    dynamicDOMChangesFallback: function() {
        if ($(".article-comments").length) {
            $(".brocky-wb").each(function() {
                brockyWB.init();
            });

            $("#article-comments-ul").on("DOMNodeInserted", function (event) {
                if (event.target.tagName == "LI" || event.target.className == "sub-comments") {
                    $(".brocky-wb").each(function() {
                        brockyWB.init();
                    });
                }
            });
        }

        $("#WikiaArticleComments").on("DOMNodeInserted", function (event) {
            if (event.target.className == "article-comments") {
                $(".article-comments").find(".brocky-wb").each(function() {
                    brockyWB.init();
                });

                $("#article-comments-ul").on("DOMNodeInserted", function (event) {
                    if (event.target.tagName == "LI" || event.target.className == "sub-comments") {
                        $(".brocky-wb").each(function() {
                            brockyWB.init();
                        });
                    }
                });
            }
        });

        if (wgAction == "edit") {
            $(document.body).on("DOMNodeInserted", function (event) {
                if (event.target.id == "EditPageDialog") {
                    $("#EditPageDialog").on("DOMNodeInserted", function (event) {
                        if (event.target.className == "WikiaArticle") {
                            if ($(".brocky-wb").length) {
                                brockyWB.init();
                            }
                        }
                    });
                }
            });
        }
    },
    init: function() {
        if (!window.brockyWBAddCSS) {
            if ($(".brocky-wb").length) {
                mw.util.addCSS(' \
                    @import url("https://fonts.googleapis.com/css?family=Poiret+One"); \
                    \
                    @font-face { \
                        font-family: "saturnicons"; \
                        src: url(//dl.dropbox.com/s/c81sfo74jq9g3kg/saturnicons.eot); \
                        src:url(//dl.dropbox.com/s/c81sfo74jq9g3kg/saturnicons.eot?#iefix) format("embedded-opentype"), \
                        url(//dl.dropbox.com/s/x8trqmytgani1sg/saturnicons.woff) format("woff"), \
                        url(//dl.dropbox.com/s/9q3puzxagzaj7pc/saturnicons.ttf) format("truetype"), \
                        url(//dl.dropbox.com/s/h9kqhix0ubm7rsf/saturnicons.svg#saturnicons) format("svg");  \
                        font-weight:400; \
                        font-style:normal; \
                    } \
                ');
            }
        }

        brockyWB.eventHandlers();
    }
};

$(function() {
    if ($(".brocky-wb").length) {
        window.brockyWBAddCSS = true;

        mw.util.addCSS(' \
            @import url("https://fonts.googleapis.com/css?family=Poiret+One"); \
            \
            @font-face { \
                font-family: "saturnicons"; \
                src: url(//dl.dropbox.com/s/c81sfo74jq9g3kg/saturnicons.eot); \
                src:url(//dl.dropbox.com/s/c81sfo74jq9g3kg/saturnicons.eot?#iefix) format("embedded-opentype"), \
                url(//dl.dropbox.com/s/x8trqmytgani1sg/saturnicons.woff) format("woff"), \
                url(//dl.dropbox.com/s/9q3puzxagzaj7pc/saturnicons.ttf) format("truetype"), \
                url(//dl.dropbox.com/s/h9kqhix0ubm7rsf/saturnicons.svg#saturnicons) format("svg");  \
                font-weight:400; \
                font-style:normal; \
            } \
        ');
    }

    brockyWB.init();

    if ("MutationObserver" in window) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        brockyWB.dynamicDOMChanges(MutationObserver);
    } else {
        brockyWB.dynamicDOMChangesFallback();
    }
});