$(function() {
    var edenUI = {
        sanitize: function(str) {
            return mw.html.escape(str);
        },
        verifyBackgroundImage: function(url) {
            return new Promise(function(resolve, reject) {
                var img = new Image();
                img.src = url;
                img.onload = function() {
    	            resolve();
                };
                img.onerror = img.onabort = function() {
    	            reject();
                };
            });
        },
        verifyCSSValue: function(property, value) {
            property = value;
            return property == value;
        },
        attr: function($this) {
            var id;
            
            do {
                id = Math.random().toString(36).substring(2, 5);
            } while (id.charAt(0).match(/[a-z]/i) === null || $("#" + id).length);
            
            $($this).attr("id", id);
            
            $($this).find(".misc-links a").attr({
                "target": "_blank"
            });
            
            $($this).find("a").attr("tabindex", "-1");
            $($this).find(".inner-content-container").attr("tabindex", "-1");
            $($this).find(".history-text").attr("tabindex", "-1");
            $($this).find(".personality-text").attr("tabindex", "-1");
            $($this).find(".polaroid-image").attr("tabindex", "-1");
            $($this).find(".blank-polaroid").attr("tabindex", "-1");
            $($this).find(".polaroid-caption > div").attr("tabindex", "-1");
            
            $($this).find("img").each(function() {
                ImgLzy.load(this);
            });
        },
        events: function() {
            $("body").on("click", ".eden-ui .navigation-basic-info", function() {
                $(this).closest(".eden-ui").find(".main-content").scrollTop(450);
            });
            
            $("body").on("click", ".eden-ui .navigation-history", function() {
                $(this).closest(".eden-ui").find(".main-content").scrollTop(900);
            });   
            
            $("body").on("click", ".eden-ui .navigation-personality", function() {
                $(this).closest(".eden-ui").find(".main-content").scrollTop(1350);
            });
            
            $("body").on("click", ".eden-ui .navigation-appearance", function() {
                $(this).closest(".eden-ui").find(".main-content").scrollTop(1800);
            });
            
            $("body").on("click", ".eden-ui .navigation-relationships", function() {
                $(this).closest(".eden-ui").find(".main-content").scrollTop(2250);
            });
            
            $("body").on("click", ".eden-ui .navigation-home", function() {
                $(this).closest(".eden-ui").find(".main-content").scrollTop(0);
            });
            
            $("body").on("click", ".eden-ui .previous", function() {
                $(this).siblings(".active").removeClass("active").prev().addClass("active");
                
                $(this).siblings(".next").removeClass("hidden");
                
                if (!$(this).siblings(".active").prev(":not(.previous)").length) {
                    $(this).addClass("hidden");
                }
            });
            
            $("body").on("click", ".eden-ui .next", function() {
                $(this).siblings(".active").removeClass("active").next().addClass("active");
                
                $(this).siblings(".previous").removeClass("hidden");
                
                if (!$(this).siblings(".active").next(":not(.next)").length) {
                    $(this).addClass("hidden");
                }
            });
        },
        graphics: function($this) {
            var background = edenUI.sanitize($($this).find("div[data-background]").eq(0).data("background")),
                accentBackground = edenUI.sanitize($($this).find("div[data-accent-background]").eq(0).data("accent-background")),
                accentBackgroundSecondary = edenUI.sanitize($($this).find("div[data-accent-background-secondary]").eq(0).data("accent-background-secondary")),
                mainColor = edenUI.sanitize($($this).find("div[data-main-color]").eq(0).data("main-color")),
                accentColor = edenUI.sanitize($($this).find("div[data-accent-color]").eq(0).data("accent-color")),
                hoverMainColor = edenUI.sanitize($($this).find("div[data-hover-main-color]").eq(0).data("hover-main-color")),
                hoverBorderColor = edenUI.sanitize($($this).find("div[data-hover-accent-color]").eq(0).data("hover-accent-color")),
                hoverLinkColor = edenUI.sanitize($($this).find("div[data-hover-accent-color]").eq(1).data("hover-accent-color")),
                imageOnePosition = edenUI.sanitize($($this).find("div[data-image-position]").eq(0).data("image-position")),
                imageTwoPosition = edenUI.sanitize($($this).find("div[data-image-position]").eq(1).data("image-position")),
                imageThreePosition = edenUI.sanitize($($this).find("div[data-image-position]").eq(2).data("image-position"));
            
            edenUI.verifyBackgroundImage(background).then(function() {
                $($this).find("div[data-background]").each(function() {
                    $(this).css("background-image", "url('" + background + "')"); 
                });
            }, function() {});
            
            edenUI.verifyBackgroundImage(accentBackground).then(function() {
                $($this).find("div[data-accent-background]").each(function() {
                    $(this).css("background-image", "url('" + accentBackground + "')"); 
                });
            }, function() {});
            
            edenUI.verifyBackgroundImage(accentBackgroundSecondary).then(function() {
                $($this).find("div[data-accent-background-secondary]").each(function() {
                    $(this).css("background-image", "url('" + accentBackgroundSecondary + "')"); 
                });
            }, function() {});
            
            if (edenUI.verifyCSSValue(new Option().style.color, hoverBorderColor)) {
                mw.util.addCSS(" \
                    .eden-ui#" + $($this).attr("id") + " .navigation-block:not(.navigation-home):hover { \
                        border-left: 5px solid " + hoverBorderColor + "; \
                    } \
                ");
            }
            
            if (edenUI.verifyCSSValue(new Option().style.color, hoverMainColor)) {
                mw.util.addCSS(" \
                    .eden-ui#" + $($this).attr("id") + " .navigation-block:not(.navigation-home):hover { \
                        background-color: " + hoverMainColor + "; \
                    } \
                ");
            }
            
            if (edenUI.verifyCSSValue(new Option().style.color, mainColor)) {
                mw.util.addCSS(" \
                    .eden-ui#" + $($this).attr("id") + " .navigation-home:hover { \
                        color: " + $($this).children(".navigation").data("main-color") + "; \
                    } \
                ");
            }
            
            if (edenUI.verifyCSSValue(new Option().style.color, accentColor)) {
                mw.util.addCSS(" \
                    .eden-ui#" + $($this).attr("id") + " .misc-links a > span:before { \
                        color: " + accentColor + " !important; \
                    } \
                ");
            }
            
            if (edenUI.verifyCSSValue(new Option().style.color, hoverLinkColor)) {
                mw.util.addCSS(" \
                    .eden-ui#" + $($this).attr("id") + " .misc-links a > span:hover:before { \
                        color: " + hoverLinkColor + " !important; \
                    } \
                ");
            }
            
            if (edenUI.verifyCSSValue(new Option().style.objectPosition, imageOnePosition)) {
                var imageOne = $($this).find(".polaroid-image").eq(0).find("img");
                
                if (imageOne.length) {
                    imageOne.css("object-position", imageOnePosition);
                }
            }
            
            if (edenUI.verifyCSSValue(new Option().style.objectPosition, imageTwoPosition)) {
                var imageTwo = $($this).find(".polaroid-image").eq(1).find("img");
                
                if (imageTwo.length) {
                    imageTwo.css("object-position", imageTwoPosition);
                }
            }
            
            if (edenUI.verifyCSSValue(new Option().style.objectPosition, imageThreePosition)) {
                var imageThree = $($this).find(".polaroid-image").eq(2).find("img");
                
                if (imageThree.length) {
                    imageThree.css("object-position", imageThreePosition);
                }
            }
        },
        init: function() {
            $(".eden-ui").each(function() {
                edenUI.attr(this);
                edenUI.graphics(this);
            });
        }
    };
    
    edenUI.init();
    edenUI.events();
    
    $(window).on("EditPageAfterRenderPreview", function() {
        edenUI.init();
	});
});