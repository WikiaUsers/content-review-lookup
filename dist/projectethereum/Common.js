/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    var edenUI = {
        verifyBackgroundImage: function(url) {
            return new Promise(function(resolve, reject) {
                if (!(/^http(?:s)?:\/\/(?:static|vignette)\.wikia\.nocookie\.net\/[A-Za-z0-9-]+\/images\/(?:[A-Za-z0-9]+\/){2}[^\/]+\.[A-Za-z]+(?:\/revision\/latest(?:\?cb=\d+)?)?(?:\/)?$/.test(url))) {
                    reject();
                }
                
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
        },
        events: function() {
			$.fn.extend({
    			smoothScroll: function(scrollDistance) {
					if (CSS.supports("scroll-behavior", "smooth")) {
						this.scrollTop(scrollDistance);
					} else {
						this.animate({
							scrollTop: scrollDistance
						}, 500);
					}
				}
			});
			
			$("body").on("click", ".eden-ui .navigation-block", function() {
				const scrollDistance = (($(this).index(".navigation-block") + 1) % 6) * 450;
				
                $(this).closest(".eden-ui").find(".main-content").smoothScroll(scrollDistance);
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
            var background = mw.html.escape($($this).find("div[data-background]").eq(0).data("background")),
                accentBackground = mw.html.escape($($this).find("div[data-accent-background]").eq(0).data("accent-background")),
                accentBackgroundSecondary = mw.html.escape($($this).find("div[data-accent-background-secondary]").eq(0).data("accent-background-secondary")),
                mainColor = mw.html.escape($($this).find("div[data-main-color]").eq(0).data("main-color")),
                accentColor = mw.html.escape($($this).find("div[data-accent-color]").eq(0).data("accent-color")),
                hoverMainColor = mw.html.escape($($this).find("div[data-hover-main-color]").eq(0).data("hover-main-color")),
                hoverBorderColor = mw.html.escape($($this).find("div[data-hover-accent-color]").eq(0).data("hover-accent-color")),
                hoverLinkColor = mw.html.escape($($this).find("div[data-hover-accent-color]").eq(1).data("hover-accent-color")),
                imageOnePosition = mw.html.escape($($this).find("div[data-image-position]").eq(0).data("image-position")),
                imageTwoPosition = mw.html.escape($($this).find("div[data-image-position]").eq(1).data("image-position")),
                imageThreePosition = mw.html.escape($($this).find("div[data-image-position]").eq(2).data("image-position"));
            
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

    edenUI.events();

	mw.hook("wikipage.content").add(edenUI.init);
	mw.hook("ve.activationComplete").add(edenUI.init);
});