$(function() {
    var edenWB = {
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
        events: function() {
            $("body").on("click", ".eden-wb .toggle", function() {
                $(this).toggleClass("roleplay");
                $(this).parent().next().children(".roleplay-content").toggleClass("active");
                $(this).parent().next().children(".about-content").toggleClass("active");
            });
        },
        graphics: function($this) {
            var background = $($this).find("div[data-background]").eq(0).data("background");
            
            edenWB.verifyBackgroundImage(background).then(function() {
                $($this).find("div[data-background]").each(function() {
                    $(this).css("background-image", "url('" + background + "')"); 
                });
            }, function() {});
        },
        init: function() {
            $(".eden-wb").each(function() {
                edenWB.graphics(this);
            });
        },
        commentsInit: function($content) {
            $content.find(".eden-wb").each(function() {
                edenWB.graphics(this);
            });
        }
    };
    
    edenWB.init();
    edenWB.events();
    
    mw.hook("wikipage.content").add(function($content) {
        if ($content.is("#article-comments") || $content.is("li.comment")) {
            edenWB.commentsInit($content);
        }
    });
    
    $(window).on("EditPageAfterRenderPreview", function() {
        edenWB.init();
	});
});