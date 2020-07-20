function kevinWBLoad() {
    function kevinWBFAQAnswers($this, kevinWBCharacterPage) {
        new mw.Api().get({
            action: 'query',
            titles: kevinWBCharacterPage,
            prop: 'revisions',
            rvprop: 'content'
        }).done(function(d) {
            for (var i in d.query.pages) {
                var kevinWBPageContent = d.query.pages[i].revisions[0]['*'],
                    kevinWBContentParameters = kevinWBPageContent.split("|");

                if (kevinWBPageContent.indexOf("{{Bach Char Page Version 9") === -1) {
                    $($this).find(".kevin-wb-faq-results").html('This feature is only compatible with "Bach Char Page Version 9"!');
                } else {
                    var kevinCharacterName = $($this).find(".kevin-wb-biography-info-text:first").text();

                    new mw.Api().get({
                    	action: 'query',
                        titles: 'Template:Kevin Word Bubble/FAQ',
                        prop: 'revisions',
                        rvprop: 'content'
                    }).done(function(d) {
                        for (var i in d.query.pages) {
                            var kevinWBFAQContent = d.query.pages[i].revisions[0]['*'].replace(/<.*>.*<\/.*>/, "").split(/.*\/\/\n*/m)[1],
                                kevinWBFAQQuestions = kevinWBFAQContent.split(/\s+\|\s+/)[0].replace(/≪CHARACTER\sNAME≫/g, kevinCharacterName).split(" || "),
                                kevinWBFAQKeywords = kevinWBFAQContent.split(/\s+\|\s+/)[1].split(/\s+\|\|\s+/);

                            $($this).find(".kevin-wb-question").each(function(index) {
                                $(this).html('' + kevinWBFAQQuestions[index] + ' \
                                <br> \
                                <span class="kevin-wb-keywords">' + kevinWBFAQKeywords[index] + '</span> \
                                ');
                            });

                            for (var j = 0; j < kevinWBContentParameters.length - 1; j++) {
                                  while ((kevinWBContentParameters[j].match(/\[\[/g) || []).length !== (kevinWBContentParameters[j].match(/\]\]/g) || []).length) {
                                    if ((kevinWBContentParameters[j + 1].match(/\]\]/g) || []).length !== 0) {
                                        kevinWBContentParameters[j] = kevinWBContentParameters[j] + "|" + kevinWBContentParameters[j + 1];
                                        kevinWBContentParameters.splice(j + 1, 1);
                                    } else {
                                        break;
                                    }
                                }

                                while ((kevinWBContentParameters[j].match(/\{\{/g) || []).length !== (kevinWBContentParameters[j].match(/\}\}/g) || []).length) {
                                    if (kevinWBContentParameters[j].indexOf("{{Bach Char Page Version 9") !== -1) {
                                        break;
                                    }

                                    if ((kevinWBContentParameters[j + 1].match(/\}\}/g) || []).length === 0) {
                                        kevinWBContentParameters[j] = kevinWBContentParameters[j] + "|" + kevinWBContentParameters[j + 1];
                                        kevinWBContentParameters.splice(j + 1, 1);
                                    } else {
                                         kevinWBContentParameters[j] = kevinWBContentParameters[j] + "|" + kevinWBContentParameters[j + 1];
                                        kevinWBContentParameters.splice(j + 1, 1);

                                        break;
                                    }
                                }
                            }

                            for (var k in kevinWBContentParameters) {
                                if (kevinWBContentParameters[k].indexOf("<span") !== -1 && kevinWBContentParameters[k].indexOf("</span>") !== -1) {
                                    kevinWBContentParameters[k] = kevinWBContentParameters[k].replace(/\<[^/>]+\>/, "").replace(/\<\/.+\>/, "");
                                }
                            }

                            $($this).find(".kevin-wb-question").each(function() {
                                var kevinWBParameter = $(this).next().attr("class").split(" ")[1];

                                for (var l in kevinWBContentParameters) {
                                    var kevinWBContentSplit = kevinWBContentParameters[l].split(/\s*=\s*/),
                                        kevinWBContentParameter = kevinWBContentSplit[0],
                                        kevinWBContentValue = kevinWBContentSplit[1];

                                    if (kevinWBParameter == kevinWBContentParameter) {
                                        if (kevinWBContentValue.indexOf("[[") !== -1 && kevinWBContentValue.indexOf("]]") !== -1) {
                                            var kevinWBContentLinks = kevinWBContentValue.match(/\[\[([^\]]+)\]\]/g);

                                            for (var m in kevinWBContentLinks) {
                                                if (kevinWBContentLinks[m].indexOf("File:") === -1) {
                                                    if (kevinWBContentLinks[m].indexOf("|") !== -1) {
                                                        var kevinWBLink = kevinWBContentLinks[m].match(/\[\[(.+)\|/)[1],
                                                            kevinWBLinkText = kevinWBContentLinks[m].match(/\|(.+)\]\]/)[1],
                                                            kevinWBLinkReplace = '<a href="/wiki/' + kevinWBLink + '" title="' + kevinWBLinkText + '">' + kevinWBLinkText + '</a>';

                                                        kevinWBContentValue = kevinWBContentValue.replace(kevinWBContentLinks[m], kevinWBLinkReplace);
                                                    } else {
                                                        var kevinWBLink = kevinWBContentLinks[m].match(/\[\[(.+)\]\]/)[1],
                                                            kevinWBLinkReplace = '<a href="/wiki/' + kevinWBLink + '" title="' + kevinWBLink + '">' + kevinWBLink + '</a>';
    
                                                        kevinWBContentValue = kevinWBContentValue.replace(kevinWBContentLinks[m], kevinWBLinkReplace);
                                                    }
                                                }
                                            }
                                        }

                                        if (kevinWBContentValue.indexOf("[[File:") !== -1) {
                                            kevinWBContentValue = kevinWBContentValue.replace(/\[\[File:.+\]\]/, "");
                                        }

                                        $(this).next().html(kevinWBContentValue);
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    
    $(".kevin-wb p").each(function() {
        $(this).children().unwrap(); 
    });

    $(".kevin-wb").each(function() {
        $(this).find(".kevin-wb-faq-toggle").children().text("FAQ Toggle");

        if ($(this).find(".kevin-wb-character-name").children("a").length === 0 && !$(this).find(".kevin-wb-character-name").children(".selflink").length) {
            $(this).find(".kevin-wb-faq-results").html('No character page link is provided!');
        } else {
            if (!$(this).find(".kevin-wb-character-name").children(".selflink").length) {
                var kevinWBCharacterPage = $(this).find(".kevin-wb-character-name").children("a").attr("href").split("/wiki/")[1],
                kevinWBCharacterPageRedLink = kevinWBCharacterPage.toString().indexOf("redlink=1");
            } else {
                var kevinWBCharacterPage = wgPageName,
                kevinWBCharacterPageRedLink = -1;
            }

            if (kevinWBCharacterPageRedLink !== -1) {
                $(this).find(".kevin-wb-faq-results").html('The character page linked does not exist!');
            } else {
                kevinWBFAQAnswers(this, kevinWBCharacterPage);
            }
        }

        $(this).find(".kevin-wb-hover-bar").html("H<br>O<br>V<br>E<br>R");

        $(this).find(".kevin-wb-header").css({
            "background": "url('" + $(this).find(".kevin-wb-header").data("kevin-wb-header-background") + "')"
        });

        $(this).find(".kevin-wb-middle").css({
            "background": "url('" + $(this).find(".kevin-wb-middle").data("kevin-wb-middle-background") + "')"
        });

        $(this).find(".kevin-wb-bottom-header").css({
            "background": "url('" + $(this).find(".kevin-wb-bottom-header").data("kevin-wb-bottom-header-background") + "')"
        });

        mw.util.addCSS(' \
            .' + $(this).find(".kevin-wb-other-header").data("kevin-wb-name") + '-primary-header-text { \
                display: inline-block; \
                position: relative; \
                background: -webkit-linear-gradient(' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-top-gradient") + ', ' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-bottom-gradient") + '); \
                -webkit-background-clip: text; \
                -webkit-text-fill-color: transparent; \
                font-family: ' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-font") + '; \
                font-style: italic; \
                font-size: 250%; \
            } \
            .' + $(this).find(".kevin-wb-other-header").data("kevin-wb-name") + '-secondary-header-text { \
                display: inline-block; \
                position: relative; \
                background: -webkit-linear-gradient(' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-top-gradient") + ', ' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-bottom-gradient") + '); \
                -webkit-background-clip: text; \
                -webkit-text-fill-color: transparent; \
                font-family: ' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-font") + '; \
                font-style: italic; \
                font-size: 150%; \
            } \
            .' + $(this).find(".kevin-wb-other-header").data("kevin-wb-name") + '-tertiary-header-text { \
                display: inline-block; \
                position: relative; \
                background: -webkit-linear-gradient(' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-top-gradient") + ', ' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-bottom-gradient") + '); \
                -webkit-background-clip: text; \
                -webkit-text-fill-color: transparent; \
                font-family: ' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-font") + '; \
                font-style: italic; \
                font-size: 100%; \
            } \
            .' + $(this).find(".kevin-wb-other-header").data("kevin-wb-name") + '-primary-header-text:before { \
                content: attr(data-primary-header-text); \
                display: inline-block; \
                position: absolute; \
                z-index: -1; \
                left: 0; \
                background: none; \
                text-shadow: 1px 1px' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-text-shadow-color") + '; \
            } \
            .' + $(this).find(".kevin-wb-other-header").data("kevin-wb-name") + '-secondary-header-text:before { \
                content: attr(data-secondary-header-text); \
                display: inline-block; \
                position: absolute; \
                z-index: -1; \
                left: 0; \
                background: none; \
                text-shadow: 1px 1px' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-text-shadow-color") + '; \
            } \
            .' + $(this).find(".kevin-wb-other-header").data("kevin-wb-name") + '-tertiary-header-text:before { \
                content: attr(data-tertiary-header-text); \
                display: inline-block; \
                position: absolute; \
                z-index: -1; \
                left: 0; \
                background: none; \
                text-shadow: 1px 1px' + $(this).find(".kevin-wb-other-header").data("kevin-wb-header-text-shadow-color") + '; \
            } \
        ');
    });
    
    function setKevinWBBackgroundImage() {
        $(".kevin-wb").each(function() {
            var kevinWBHeaderImageURL = $(this).find(".kevin-wb-header").data("kevin-wb-header-background"),
                kevinWBMiddleImageURL = $(this).find(".kevin-wb-header").data("kevin-wb-header-background"),
                kevinWBHeaderImage = new Image(),
                kevinWBMiddleImage = new Image();
   
            kevinWBHeaderImage.src = kevinWBHeaderImageURL;
            kevinWBMiddleImage.src = kevinWBMiddleImageURL;
            
            var kevinWBHeaderImageWidth = kevinWBHeaderImage.width,
                kevinWBMiddleImageWidth = kevinWBMiddleImage.width;

            if (kevinWBHeaderImageWidth < $(this).width()) {
                $(this).find(".kevin-wb-header").css({
                    "background-size": "cover"
                });

                $(this).find(".kevin-wb-bottom-header").css({
                    "background-size": "cover"
                });
            } else {
                $(this).find(".kevin-wb-header").css({
                    "background-size": ""
                });

                $(this).find(".kevin-wb-bottom-header").css({
                    "background-size": ""
                });
            }

            if (kevinWBMiddleImageWidth < $(this).width()) {
                $(this).find(".kevin-wb-middle").css({
                    "background-size": "cover"
                });
            } else {
                $(this).find(".kevin-wb-middle").css({
                    "background-size": ""
                });
            }

            $(".kevin-wb-middle-image").remove();
            $(".kevin-wb-header-image").remove();
        });
    }

    kevinWBBackgroundImageCounter = 0;
    
    function kevinWBBackgroundImage() {
        if (kevinWBBackgroundImageCounter <= 50) {
            kevinWBBackgroundImageCounter += 1;

            setKevinWBBackgroundImage();
        } else {
            clearInterval(kevinWBBackgroundImage);
        }
    }

    setInterval(kevinWBBackgroundImage, 100);

    if ("ontouchstart" in window === false && screen.width > 504) {
        $(".kevin-wb a").on("mouseenter", function(event) {
            var kevinWBLinkContext = '<div class="kevin-wb-link-context">Click to open the link to "' + $(this).attr("title") + '"!<br>CTRL + click to open in a new background tab!</div>';

            $(this).attr("data-title", $(this).attr("title"));
            $(this).removeAttr("title");

            if ($(this).closest(".ArticlePreview").length) {            
                $(kevinWBLinkContext).prependTo(".ArticlePreview");

                $(".kevin-wb-link-context").css({
                    top: $(this).offset().top + 10 + $(this).height() - $(".ArticlePreview").offset().top,
                    left: (event.pageX - $(".kevin-wb-link-context").width() / 2) - $(".ArticlePreview").offset().left
                });
            } else {
                $(kevinWBLinkContext).prependTo(".WikiaSiteWrapper");

                $(".kevin-wb-link-context").css({
                    top: $(this).offset().top + 10 + $(this).height(),
                    left: (event.pageX - $(".kevin-wb-link-context").width() / 2)
                });
            }

            var kevinWBLinkContextLength = $(".kevin-wb-link-context").length;

            if (kevinWBLinkContextLength >= 2) {
                for (var i = 1; i <= kevinWBLinkContextLength; i++) {
                    if (i !== kevinWBLinkContextLength) {
                        $(".kevin-wb-link-context:nth-of-type(" + i + ")").remove();
                    }
                }
            }
        }).on("mousemove", function(event) {
            if ($(this).closest(".ArticlePreview").length) {
                $(".kevin-wb-link-context").css({
                    top: $(this).offset().top + 10 + $(this).height() - $(".ArticlePreview").offset().top,
                    left: (event.pageX - $(".kevin-wb-link-context").width() / 2) - $(".ArticlePreview").offset().left
                });
            } else {
                $(".kevin-wb-link-context").css({
                    top: $(this).offset().top + 10 + $(this).height(),
                    left: (event.pageX - $(".kevin-wb-link-context").width() / 2)
                });
            }
        }).on("mouseleave scroll", function() {
            $(".kevin-wb-link-context").remove();
            $(this).attr("title", $(this).attr("data-title"));
            $(this).removeAttr("data-title");
        });

        function removeKevinWBContextMenu() {
            $(".kevin-wb-context-menu").remove();

            $(".kevin-wb").css({
                "-webkit-touch-callout": "",
                "-webkit-user-select": "",
                "-moz-user-select": "",
                "-ms-user-select": "",
                "-khtml-user-select": "",
                "user-select": "",
                "pointer-events": ""
            });
        }

        $(".kevin-wb").on("contextmenu", function(event) {
            event.preventDefault();

            if ($(".kevin-wb-context-menu").length) {
                removeKevinWBContextMenu();
            }

            var kevinWBContextMenu = '<div class="kevin-wb-context-menu"> \
                                    <ul> \
                                    <li>Kevin Word Bubble</li> \
                                    <li>Word bubble created by: <a href="/wiki/User:Kevin_Mo">Kevin</a></li> \
                                    <li>Last updated on: 2/25/17</li> \
                                    <li>Header background image: <a href="' + $(this).find(".kevin-wb-header").data("kevin-wb-header-background") + '">Link</a></li> \
                                    <li>Middle background image: <a href="' + $(this).find(".kevin-wb-middle").data("kevin-wb-middle-background") + '">Link</a></li> \
                                    </ul> \
                                    </div>';
            
            if ($(this).closest(".ArticlePreview").length) {
                $(kevinWBContextMenu).prependTo(".ArticlePreview");

                $(".kevin-wb-context-menu").css({
                    top: event.pageY - $(".ArticlePreview").offset().top,
                    left: event.pageX - $(".ArticlePreview").offset().left
                });
            } else {
                $(kevinWBContextMenu).prependTo(".WikiaSiteWrapper");

                $(".kevin-wb-context-menu").css({
                    top: event.pageY,
                    left: event.pageX
                });
            }

            
    
            $(".kevin-wb-context-menu li, .kevin-wb-context-menu a").on("contextmenu", function(event) {
                event.preventDefault();
            });

            $(".kevin-wb").css({
                "-webkit-touch-callout": "none",
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none",
                "-khtml-user-select": "none",
                "user-select": "none",
                "pointer-events": "none"
            });
        });

        $(document).on("mousedown", function(event) {
            if ((($(".kevin-wb-context-menu").length && !$(event.target).closest(".kevin-wb-hover").length && $(event.target).closest(".kevin-wb").find(".kevin-wb-biography").css("display") == "block") || !$(event.target).closest(".kevin-wb").length || ($(".kevin-wb-biography:visible").length && !$(event.target).closest(".kevin-wb").find(".kevin-wb-biography:visible").length)) && !$(event.target).is(".kevin-wb-context-menu li") && !$(event.target).is(".kevin-wb-context-menu a")) {
                $(".kevin-wb-biography:visible").hide();
                $(".kevin-wb-image:hidden").show();
            }

            if (($(".kevin-wb-context-menu").length && !$(event.target).is(".kevin-wb-context-menu li") && !$(event.target).is(".kevin-wb-context-menu a"))) {
                removeKevinWBContextMenu();
            }
        }).on("contextmenu", function(event) {
            if (!$(event.target).closest(".kevin-wb").length || ($(".kevin-wb-biography:visible").length && !$(event.target).closest(".kevin-wb").find(".kevin-wb-biography:visible").length)) {
                $(".kevin-wb-biography:visible").hide();
                $(".kevin-wb-image:hidden").show();    
            }

            if (!$(event.target).closest(".kevin-wb").length && !$(event.target).is(".kevin-wb-context-menu li") && !$(event.target).is(".kevin-wb-context-menu a")) {
                removeKevinWBContextMenu();
            }
        });

        document.addEventListener("wheel", function(event) {
            if (($(".kevin-wb-context-menu").length && !$(event.target).closest(".kevin-wb-hover").length && $(event.target).closest(".kevin-wb").find(".kevin-wb-biography").css("display") == "block") || !$(event.target).closest(".kevin-wb").length) {
                $(".kevin-wb-biography:visible").hide();
                $(".kevin-wb-image:hidden").show();
            }

            if ($(".kevin-wb-context-menu").length) {
                removeKevinWBContextMenu();
            }
        }, {
            passive: true
        });

        $(window).on("resize", function() {
            if ($(".kevin-wb-context-menu").length) {
                removeKevinWBContextMenu();
            }
        });
    }

    $(".kevin-wb-hover").on("mouseenter", function() {
        if (!$(".kevin-wb-context-menu").length) {
            $(this).siblings(".kevin-wb-image").hide();

            if ($(this).hasClass("kevin-wb-biography")) {
                $(this).show();
            } else {
                $(this).siblings(".kevin-wb-biography").show();
            }
        }
    }).on("mouseleave", function() {
        if (!$(".kevin-wb-context-menu").length) {
            $(this).siblings(".kevin-wb-image").show();

            if ($(this).hasClass("kevin-wb-biography")) {
                $(this).hide();
            } else {
                $(this).siblings(".kevin-wb-biography").hide();
            }
        }
    });

    $(".kevin-wb-biography").hide();

    var userAgent = window.navigator.userAgent,
        detectBrowser = {
            internetExplorer: function() {
                var MSIEUserAgent = userAgent.indexOf('MSIE'),
                    tridentUserAgent = userAgent.indexOf('Trident/');

                if (MSIEUserAgent > -1 || tridentUserAgent > -1) {
                    return true;
                }
            },
            microsoftEdge: function() {
                var edgeUserAgent = userAgent.indexOf('Edge/');

                if (edgeUserAgent > -1) {
                    return true;
                }
            },
            preVersion49Firefox: function() {
                var firefoxUserAgent = userAgent.indexOf('Firefox/');

                if (firefoxUserAgent > -1) {
                    var firefoxVersion = userAgent.split("Firefox/")[1].split(".")[0];

                    if (firefoxVersion < 49) {
                        return true;
                    }
                }
            }
        };

    function kevinWBHeaderText(kevinWBAppendTo) {
        if (kevinWBAppendTo == "kevin-wb-other-header") {
            $(".kevin-wb").each(function() {
                if ($(this).find(".kevin-wb-header-text").length) {
                    $(this).find(".kevin-wb-character-name").appendTo($(this).find(".kevin-wb-other-header").find("span:first"));
                    $(this).find(".kevin-wb-title-owned-by").appendTo($(this).find(".kevin-wb-other-header").find("span:nth-of-type(2)"));
                    $(this).find(".kevin-wb-posted-on").appendTo($(this).find(".kevin-wb-other-header").find("span:nth-of-type(3)"));

            
                    $(this).find(".kevin-wb-character-name").closest("div").find("span:first").after("<br>");
                    $(this).find(".kevin-wb-title-owned-by").closest("div").find("span:nth-of-type(2)").after("<br>");
    
                    $(this).find(".kevin-wb-header-text").remove();
                }
            });
        } else {
            $(".kevin-wb").each(function() {
                if ($(this).find(".kevin-wb-header-text").length) {
                    $(this).find(".kevin-wb-character-name").appendTo($(this).find(".kevin-wb-firefox-ie-header").find("span:first"));
                    $(this).find(".kevin-wb-title-owned-by").appendTo($(this).find(".kevin-wb-firefox-ie-header").find("span:nth-of-type(2)"));
                    $(this).find(".kevin-wb-posted-on").appendTo($(this).find(".kevin-wb-firefox-ie-header").find("span:nth-of-type(3)"));

                    $(this).find(".kevin-wb-character-name").closest("div").find("span:first").after("<br>");
                    $(this).find(".kevin-wb-title-owned-by").closest("div").find("span:nth-of-type(2)").after("<br>");

                    $(this).find(".kevin-wb-header-text").remove();
                }
            });
        }
    }

    if (detectBrowser.internetExplorer() === true) {
        $(".kevin-wb-other-header").hide();
        $(".kevin-wb-other-biography").hide();

        kevinWBHeaderText("kevin-wb-firefox-ie-header");
    } else if (detectBrowser.microsoftEdge() === true) {
        $(".kevin-wb-firefox-ie-header").hide();
        $(".kevin-wb-other-biography").hide();

        kevinWBHeaderText("kevin-wb-other-header");
    } else if (detectBrowser.preVersion49Firefox === true) {
        $(".kevin-wb-other-header").hide();
        $(".kevin-wb-ie-biography").hide();

        kevinWBHeaderText("kevin-wb-firefox-ie-header");
    } else {
        $(".kevin-wb-firefox-ie-header").hide();
        $(".kevin-wb-ie-biography").hide();

        kevinWBHeaderText("kevin-wb-other-header");
    }

    $(".kevin-wb-text").on("click", function() {
        if (!$(".kevin-wb-context-menu").length) {
            var kevinWBTextSelection = getSelection().toString();

            if (!kevinWBTextSelection) {
                var kevinWBTextClick = Date.now(),
                    kevinWBTextLastClick = $(this).attr("kevin-wb-text-last-clicked") || 0;

                if ((kevinWBTextClick - kevinWBTextLastClick) >= 450) {
                    if (!$(this).hasClass("kevin-wb-expanded")) {
                        $(this).queue("animations", function(nextAnimation) {
                            $(this).closest(".kevin-wb-middle").children(".kevin-wb-main").fadeOut(350, function() {
                                nextAnimation();
                            });
                        }).queue("animations", function(nextAnimation) {
                            $(this).css({
                                height: 300,
                                marginBottom: 0
                            });

                            $(this).parent().prependTo($(this).closest(".kevin-wb-middle"));
                            $(this).parent().fadeIn(350);
                            nextAnimation();
                        }).dequeue("animations");

                        $(this).addClass("kevin-wb-expanded");
                    } else {
                        $(this).queue("animations", function(nextAnimation) {
                            $(this).parent().fadeOut(350, function() {
                                nextAnimation();
                            });
                        }).queue("animations", function(nextAnimation) {
                            $(this).closest(".kevin-wb-middle").children(".kevin-wb-main").fadeIn(350);
                            nextAnimation();
                        }).queue("animations", function(nextAnimation) {
                            $(this).css({
                                height: 145,
                                marginBottom: 10
                            });
                            $(this).parent().insertBefore($(this).closest(".kevin-wb-middle").find(".kevin-wb-scroll3"));
                            $(this).parent().fadeIn(350);
                            nextAnimation(); 
                        }).dequeue("animations");

                        $(this).removeClass("kevin-wb-expanded");
                    }

                    $(this).attr("kevin-wb-text-last-clicked", Date.now());
                }
            }
        }
    });

    var kevinWBSearchBar = '<div class="kevin-wb-search-bar-wrapper"> \
                                <input class="kevin-wb-search-bar" size="5" placeholder="Enter a search term!"></input> \
                            </div>';

    $(".kevin-wb-search-bar-placeholder").each(function() {
        $(this).replaceWith(kevinWBSearchBar);
    });

    $(".kevin-wb-search-bar").on("keyup", function() {
        $(this).closest(".kevin-wb-faq-container").find(".kevin-wb-question").hide();
        $(this).closest(".kevin-wb-faq-container").find(".kevin-wb-answer").hide();

        if ($(this).val().length > 2) {
            var kevinWBSearchTerm = $(this).val().toLowerCase(),
                kevinWBSearchTermLength = kevinWBSearchTerm.length;

            $(this).closest(".kevin-wb-faq-container").find(".kevin-wb-question").each(function() {
                var kevinWBKeywords = $(this).find(".kevin-wb-keywords").text(),
                    kevinWBKeyword = $(this).find(".kevin-wb-keywords").text().split(/\s*,\s*/);

                for (var m in kevinWBKeyword) {
                    if (kevinWBKeyword[m].substring(0, kevinWBSearchTermLength) == kevinWBSearchTerm) {
                        $(this).show();
                        $(this).next().show();
                    }
                }
            });
        }

        $(this).closest(".kevin-wb-middle").find(".kevin-wb-answer").each(function() {
            $(this).css({
                "margin-bottom": "",
                "border-bottom": "",
                "padding-bottom": ""
            });
        });

        var kevinWBResultsShown = $(this).closest(".kevin-wb-middle").find(".kevin-wb-answer:visible").length;

        $(this).closest(".kevin-wb-middle").find(".kevin-wb-answer:visible").each(function(index) {
            if (kevinWBResultsShown != index + 1) {
                $(this).css({
                    "margin-bottom": 10,
                    "border-bottom": "2px solid rgba(255, 255, 255, 0.25)",
                    "padding-bottom": 10
                });
            }
        });
    });

    function kevinWBMiddle() {
        $(".kevin-wb:visible").each(function() {
            if ($(this).find(".kevin-wb-header").width() !== $(this).find(".kevin-wb-middle").outerWidth()) {
                $(this).find(".kevin-wb-middle").width($(this).find(".kevin-wb-middle").prev().width() - ($(this).find(".kevin-wb-middle").prev().width() * 0.08));
            }
        });
    }

    setInterval(kevinWBMiddle, 100);

    $(".kevin-wb-bottom-header-hover").on("mouseenter", function() {
        $(this).find(".kevin-wb-faq-toggle").fadeIn(250);
    }).on("mouseleave", function() {
        $(this).find(".kevin-wb-faq-toggle").fadeOut(250);
    });

    $(".kevin-wb-faq-toggle").on("click", function() {
        var kevinWBFlip = Date.now(),
            kevinWBLastFlip = $(this).parent().prev().attr("kevin-wb-last-flipped") || 0;

        if ((kevinWBFlip - kevinWBLastFlip) >= 250) {
            if (!$(this).parent().prev().hasClass("kevin-wb-last-flipped")) {
                $(this).parent().prev().addClass("kevin-wb-last-flipped");

                if ($(this).parent().prev().find(".kevin-wb-text").hasClass("kevin-wb-expanded")) {
                    $(this).parent().prev().children(".kevin-wb-scroll").hide();
                }

                $(this).parent().prev().find(".kevin-wb-main").hide();
                $(this).parent().prev().find(".kevin-wb-faq").show();
            } else {
                $(this).parent().prev().removeClass("kevin-wb-last-flipped");
                $(this).parent().prev().children(".kevin-wb-scroll").show();

                if (!$(this).parent().prev().find(".kevin-wb-text").hasClass("kevin-wb-expanded")) {
                    $(this).parent().prev().find(".kevin-wb-main").show();
                }

                $(this).parent().prev().find(".kevin-wb-faq").hide();
            }

            $(this).parent().prev().attr("kevin-wb-last-flipped", Date.now());
        }
    });

    $(".tabbernav a").on("click", function() {
        $(".kevin-wb-middle").each(function() {
            if (!$(this).closest("tabbertabhide").length) {
                setKevinWBBackgroundImage();
            }        
        });
    });

    $(window).on("resize", function() {
        $(".kevin-wb-middle").each(function() {
            if (!$(this).closest("tabbertabhide").length) {
                setKevinWBBackgroundImage();
            }        
        });
    });
}

$(function() {
    window.NullEditCallAgain = window.NullEditCallAgain || [];
    window.NullEditCallAgain.push(kevinWBLoad);

    $(window).on("load", function() {
        if ($(".kevin-wb").length) {
            kevinWBLoad();
        }
    });

    function kevinWBPreview() {
        if ($(".kevin-wb").length) {
            kevinWBLoad();
        } else {
            setTimeout(kevinWBPreview, 0);
        }
    }

    if (wgAction == "edit") {
        var editPreviewObserver = new MutationObserver(function(editPreviewMutations) {
            editPreviewMutations.forEach(function(editPreviewMutation) {
                Array.prototype.forEach.call(editPreviewMutation.addedNodes, function(editPreviewNode) {
                    if (editPreviewNode.id == "EditPageDialog") {
                        kevinWBPreview();
                    }
                });
            });
        });

        editPreviewObserverTarget = document.body,
        editPreviewObserverConfig = {
            childList: true
        };

        editPreviewObserver.observe(editPreviewObserverTarget, editPreviewObserverConfig);
    }

    var kevinWBObserver = new MutationObserver(function(kevinWBMutations) {
		kevinWBMutations.forEach(function(kevinWBMutation) {
			Array.prototype.forEach.call(kevinWBMutation.addedNodes, function(kevinWBNode) {
				if (kevinWBNode.nodeType == 1) {
					if (kevinWBNode.id == "article-comments") {
                        if ($(".kevin-wb").length) {
                            kevinWBLoad();
                        }
					}
				}
			});
		});
	}),
	
	kevinWBObserverTargetComment = document.querySelector("#WikiaArticleComments"),
	kevinWBObserverConfig = {
        childList: true,
        subtree: true
	};
	
    if ($("#WikiaArticleComments").length) {
        kevinWBObserver.observe(kevinWBObserverTargetComment, kevinWBObserverConfig);
    }
	
    function kevinWBCommentHeight() {
        var kevinWBCommentCurrentHeight = $("div.article-comments").height();

        function kevinWBCommentHeightChange() {
            var kevinWBCommentNewHeight = $("div.article-comments").height();

            if ($("div.article-comments").length && $(".kevin-wb").length && kevinWBCommentCurrentHeight !== kevinWBCommentNewHeight) {
                kevinWBCommentCurrentHeight = $("div.article-comments").height();
                kevinWBLoad();
            }
        }
  
        kevinWBCommentHeightChange();
        setInterval(kevinWBCommentHeightChange, 1000);
    }

    kevinWBCommentHeight();
    
    $(window).on("unload", function() {
        if (wgAction == "edit") {
            if ($(".kevin-wb").length) {
                kevinWBObserver.disconnect();
                editPreviewObserver.disconnect();
            }
        } else if ($("#article-comments").length ) {
            if ($(".kevin-wb").length) {
                kevinWBObserver.disconnect();
                clearInterval(kevinWBCommentHeightChange);
            }
        }
    });
});