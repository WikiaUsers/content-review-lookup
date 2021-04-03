$(function() {
    var edenUI = {
        verifyBackgroundImage: function(url) {
            return new Promise(function(resolve, reject) {
                if (!(/^https:\/\/vignette.wikia.nocookie.net\/[A-Za-z0-9-]+\/images\/.+$/.test(url))) {
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
        attr: function($this) {
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
            var background = mw.html.escape($($this).data("background")),
                accentBackground = mw.html.escape($($this).data("accent-background")),
                accentBackgroundSecondary = mw.html.escape($($this).data("accent-background-secondary"));
            
            edenUI.verifyBackgroundImage(background).then(function() {
                $($this).css("--main-background-image", "url('" + background + "')");
            }, function() {});
            
            edenUI.verifyBackgroundImage(accentBackground).then(function() {
                $($this).css("--accent-background-image", "url('" + accentBackground + "')");
            }, function() {});
            
            edenUI.verifyBackgroundImage(accentBackgroundSecondary).then(function() {
                $($this).css("--accent-background-image-secondary", "url('" + accentBackgroundSecondary + "')");
            }, function() {});
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