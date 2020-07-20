(function ($, window, mw) {
    'use strict';

    var kevinWBMinima = {
        GUIIntegrity: function($this) {
            var minimaBackground = $($this).data("background");

            if (minimaBackground.indexOf("{{{") === -1 && minimaBackground.indexOf("http") !== -1 && (minimaBackground.indexOf(".jpg") !== -1 || minimaBackground.indexOf(".png") !== -1)) {
                $($this).css("background-image", "url('" + minimaBackground + "')");
            }
        },
        setEventHandlers: function($this) {
            $(".minima-ui img").on("dragstart", function(event) {
                event.preventDefault();
            });
        },
        init: function($this) {
            kevinWBMinima.GUIIntegrity($this);
            kevinWBMinima.setEventHandlers($this);
        },
        dynamicDOMChanges: function(MutationObserver) {
            kevinWBMinima.articleCommentsLoad(MutationObserver);
            kevinWBMinima.pageEditor(MutationObserver);
        
            if ($(".article-comments").length) {
                $(".minima-ui").each(function() {
                    kevinWBMinima.init(this);
                });

                kevinWBMinima.newComment(MutationObserver);
            }
        },
        articleCommentsLoad: function(MutationObserver) {
            var kevinWBMinimaObserver = new MutationObserver(function(kevinWBMinimaMutations) {
                kevinWBMinimaMutations.forEach(function(kevinWBMinimaMutation) {
                    Array.prototype.forEach.call(kevinWBMinimaMutation.addedNodes, function(kevinWBMinimaNode) {
                        if (kevinWBMinimaNode.className == "article-comments") {
                            kevinWBMinimaObserver.disconnect();
                            
                            $(".article-comments").find(".minima-ui").each(function() {
                                kevinWBMinima.init(this);
                            });
                            
                            kevinWBMinima.newComment(MutationObserver);
                        }
                    });
                });
            });

            var kevinWBMinimaObserverTarget = document.querySelector("#WikiaArticleComments"),
                kevinWBMinimaObserverConfig = {
                    childList: true,
                    subtree: true
                };

            if ($("#WikiaArticleComments").length) {
                kevinWBMinimaObserver.observe(kevinWBMinimaObserverTarget, kevinWBMinimaObserverConfig);
            }
        },
        pageEditor: function(MutationObserver) {
            if (mw.config.get('wgAction') == "edit") {
                var kevinWBMinimaEPObserver = new MutationObserver(function(kevinWBMinimaEPObserverMutations) {
                    kevinWBMinimaEPObserverMutations.forEach(function(kevinWBMinimaEPObserverMutation) {
                        Array.prototype.forEach.call(kevinWBMinimaEPObserverMutation.addedNodes, function(kevinWBMinimaEPObserverNode) {
                            if (kevinWBMinimaEPObserverNode.id == "EditPageDialog") {
                                kevinWBMinima.articlePreview(MutationObserver);
                            }
                        });
                    });
                });

                var kevinWBMinimaEPObserverTarget = document.body,
                    kevinWBMinimaEPObserverConfig = {
                        childList: true,
                        subtree: true
                    };

                kevinWBMinimaEPObserver.observe(kevinWBMinimaEPObserverTarget, kevinWBMinimaEPObserverConfig);
            }
        },
        newComment: function(MutationObserver) {
            var kevinWBMinimaCommentObserver = new MutationObserver(function(kevinWBMinimaCommentMutations) {
                kevinWBMinimaCommentMutations.forEach(function(kevinWBMinimaCommentMutation) {
                    Array.prototype.forEach.call(kevinWBMinimaCommentMutation.addedNodes, function(kevinWBMinimaCommentNode) {
                        if (kevinWBMinimaCommentNode.tagName == "LI" || kevinWBMinimaCommentNode.className == "sub-comments") {
                            $(".minima-ui").each(function() {
                                kevinWBMinima.init(this);
                            });
                        }
                    });
                });
            });

            var kevinWBMinimaCommentObserverTarget = document.querySelector("#article-comments-ul"),
                kevinWBMinimaCommentObserverConfig = {
                    childList: true,
                    subtree: true
                };

            kevinWBMinimaCommentObserver.observe(kevinWBMinimaCommentObserverTarget, kevinWBMinimaCommentObserverConfig);
        },
        articlePreview: function(MutationObserver) {
            var kevinWBMinimaAPObserver = new MutationObserver(function(kevinWBMinimaAPMutations) {
                kevinWBMinimaAPMutations.forEach(function(kevinWBMinimaAPMutation) {
                    Array.prototype.forEach.call(kevinWBMinimaAPMutation.addedNodes, function(kevinWBMinimaAPNode) {
                        if (kevinWBMinimaAPNode.className == "WikiaArticle") {
                            kevinWBMinimaAPObserver.disconnect();

                            $(".minima-ui").each(function() {
                                kevinWBMinima.init(this);
                            });
                        }
                    });
                });
            });

            var kevinWBMinimaAPObserverTarget = document.querySelector("#EditPageDialog"),
                kevinWBMinimaAPObserverConfig = {
                    childList: true,
                    subtree: true
                };

            kevinWBMinimaAPObserver.observe(kevinWBMinimaAPObserverTarget, kevinWBMinimaAPObserverConfig);
        },
        dynamicDOMChangesFallback: function() {
            if ($(".article-comments").length) {
                $(".minima-ui").each(function() {
                    kevinWBMinima.init(this);
                });

                $("#article-comments-ul").on("DOMNodeInserted", function (event) {
                    if (event.target.tagName == "LI" || event.target.className == "sub-comments") {
                        $(".minima-ui").each(function() {
                            kevinWBMinima.init(this);
                        });
                    }
                });
            }

            $("#WikiaArticleComments").on("DOMNodeInserted", function (event) {
                if (event.target.className == "article-comments") {
                    $(".article-comments").find(".minima-ui").each(function() {
                        kevinWBMinima.init(this);
                    });

                    $("#article-comments-ul").on("DOMNodeInserted", function (event) {
                        if (event.target.tagName == "LI" || event.target.className == "sub-comments") {
                            $(".minima-ui").each(function() {
                                kevinWBMinima.init(this);
                            });
                        }
                    });
                }
            });

            if (mw.config.get('wgAction') == "edit") {
                $(document.body).on("DOMNodeInserted", function (event) {
                    if (event.target.id == "EditPageDialog") {
                        $("#EditPageDialog").on("DOMNodeInserted", function (event) {
                            if (event.target.className == "WikiaArticle") {
                                if ($(".minima-ui").length) {
                                    kevinWBMinima.init(this);
                                }
                            }
                        });
                    }
                });
            }
        }
    };

   $(".minima-ui").each(function() {
        kevinWBMinima.init(this);
    });

    if ("MutationObserver" in window) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        kevinWBMinima.dynamicDOMChanges(MutationObserver);
    } else {
        kevinWBMinima.dynamicDOMChangesFallback();
    }
}) (this.jQuery, this.window, this.mediaWiki);