$(function($) {
    var kevinWordBubble = {
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
        graphics: function($this) {
            var aboutBackground = $($this).data("about-background"),
                roleplayBackground = $($this).data("roleplay-background"),
                galleryBackground = $($this).data("gallery-background"),
                powersBackground = $($this).data("powers-background"),
                userProfileBackground = $($this).data("user-profile-background");
            
            kevinWordBubble.verifyBackgroundImage(aboutBackground).then(function() {
                $($this).find(".about-quadrant").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + aboutBackground + "')"
                });
                
                $($this).find(".interface.about").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('" + aboutBackground + "')"
                });
                
                $($this).find(".capsule").css({
                    "background-image": "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.75) 100%), url('" + aboutBackground + "')"
                });
            }, function() {});
            
            kevinWordBubble.verifyBackgroundImage(roleplayBackground).then(function() {
                $($this).find(".roleplay-quadrant").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + roleplayBackground + "')"
                });
                
                $($this).find(".interface.roleplay").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('" + roleplayBackground + "')"
                });
                
                var infinityBackground = (userProfileBackground.indexOf("{{{") === -1 && userProfileBackground.indexOf("http") !== -1 && (userProfileBackground.indexOf(".jpg") !== -1 || userProfileBackground.indexOf(".png") !== -1)) ? userProfileBackground : roleplayBackground;
                
                mw.util.addCSS(" \
                    .infinity:before { \
                        background-image: url('" + infinityBackground + "') !important; \
                    } \
                ");
            }, function() {});
            
            kevinWordBubble.verifyBackgroundImage(galleryBackground).then(function() {
                $($this).find(".gallery-quadrant").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + galleryBackground + "')"
                });
                
                $($this).find(".interface.gallery").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('" + galleryBackground + "')"
                });
            }, function() {});
            
            kevinWordBubble.verifyBackgroundImage(powersBackground).then(function() {
                $($this).find(".powers-quadrant").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + powersBackground + "')"
                });
                
                $($this).find(".interface.powers").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('" + powersBackground + "')"
                });
                
                var powerNodeBackground = (userProfileBackground.indexOf("{{{") === -1 && userProfileBackground.indexOf("http") !== -1 && (userProfileBackground.indexOf(".jpg") !== -1 || userProfileBackground.indexOf(".png") !== -1)) ? userProfileBackground : powersBackground;
                
                $($this).find(".power-node").css({
                    "background-image": "url('" + powerNodeBackground + "')"
                });
            }, function() {});
            
            kevinWordBubble.verifyBackgroundImage(userProfileBackground).then(function() {
                $($this).find(".user-profile").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + userProfileBackground + "')"
                });
                
                $($this).find(".user-profile-card-icon-background").css({
                    "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + userProfileBackground + "')"
                });
            }, function() {});
            
            if ($($this).find(".image-one").children("img").length) {
                $($this).find(".character-image-mask").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $($this).find(".image-one").children("img").attr("src") + "')");
            } else if ($($this).find(".image-two").children("img").length) {
                $($this).find(".character-image-mask").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $($this).find(".image-two").children("img").attr("src") + "')");
            } else if ($($this).find(".image-three").children("img").length) {
                $($this).find(".character-image-mask").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $($this).find(".image-three").children("img").attr("src") + "')");
            } else {
                kevinWordBubble.verifyBackgroundImage(userProfileBackground).then(function() {
                    $($this).find(".character-image-mask").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + userProfileBackground + "')");
                }, function() {});
            }
        },
        data: function($this) {
            var powerSet = $($this).find(".power-set");
            
            if (!powerSet.find(".no-power-set").length) {
                powerSet.find(":header").each(function() {
                    var powerCategory = $(this).children(".mw-headline").text(),
                        powerCategoryItems = $(this).next("ol").find("li");
 
                    if (powerCategory.indexOf("Offensive") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".offensive-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("Defensive") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".defensive-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("Supplementary") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".supplementary-passive-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("Passive") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".supplementary-passive-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("3 Months") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".monthly-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("6 Months") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".monthly-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("9 Months") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".monthly-powers").find(".powers-text").children());
                        });
                    } else if (powerCategory.indexOf("Traits") !== -1) {
                        powerCategoryItems.each(function() {
                            $(this).appendTo($($this).find(".traits").find(".powers-text").children());
                        });
                    }
                });
                
                powerSet.remove();
            }
            
            var characterPageLink = $($this).find(".capsule-text").children("a");
            
            if (characterPageLink.length) {
                var characterNameArray = characterPageLink.text().split(" ");
                
                $($this).find(".character-name").children("a").attr("target", "_blank");
                $($this).find(".character-name").children("a").empty();
                
                for (var i = 0; i < characterNameArray.length; i++) {
                    if ("\"“'".indexOf(characterNameArray[i].charAt(0)) === -1) {
                        $($this).find(".character-name").children("a").append('<span>' + characterNameArray[i].charAt(0) + '</span><span>.</span>');
                    }
                }
                
                $($this).find(".header").removeClass("inactive");
            }
            
            if ($($this).find(".username").find("span:nth-child(3)").children("a:not(.new)").length === 2) {
                var username = $($this).find(".username").data("username");
                
                $.nirvana.getJson("UserProfilePage", "renderUserIdentityBox", {
                    title: "User:" + username
                }).done(function(data) {
                    if (data.user.edits !== -1 && data.user.name == username) {
                        var userAvatar = data.user.avatar.replace(/\/scale-to-width-down\/.+/, "/scale-to-width-down/75"),
                            memberSince = data.user.registration,
                            editCount = data.user.edits;
                        
                        $($this).find(".user-avatar").css({
                            "background-image": "url('" + userAvatar + "')"
                        });
 
                        $($this).find(".user-profile-card:first-of-type").children(".user-profile-card-text").text(editCount + " Edits");
                        $($this).find(".user-profile-card:nth-of-type(2)").children(".user-profile-card-text").text(memberSince);
                    }
                });
                
                mw.loader.using("mediawiki.api").done(function() {
                    new mw.Api().get({
                        action: "query",
                        list: "users",
                        ususers: username,
                        usprop: "groups"
                    }).done(function(data) {
                        if (data.query.users[0].groups.indexOf("bureaucrat") !== -1) {
                            $($this).find(".user-profile-card:last-of-type").children(".user-profile-card-text").text("Bureaucrat");
                        } else if (data.query.users[0].groups.indexOf("sysop") !== -1) {
                            $($this).find(".user-profile-card:last-of-type").children(".user-profile-card-text").text("Administrator");
                        } else if (data.query.users[0].groups.indexOf("rollback") !== -1) {
                            $($this).find(".user-profile-card:last-of-type").children(".user-profile-card-text").text("Rollback");
                        } else if (data.query.users[0].groups.indexOf("chatmoderator") !== -1) {
                            $($this).find(".user-profile-card:last-of-type").children(".user-profile-card-text").text("Chat Moderator");
                        } else {
                            $($this).find(".user-profile-card:last-of-type").children(".user-profile-card-text").text("Regular User");
                        }
                    });
                });
            } else if ($($this).find(".username").find("span:nth-child(3)").children("a.new").length === 2) {
                $($this).find(".user-profile-card").children(".user-profile-card-text").text("User Not Found");
            } else {
                $($this).find(".user-profile-card").children(".user-profile-card-text").text("...");
            }
        },
        events: function() {
            $(".navigation-toggle").on("click", function() {
                $(this).closest(".andromeda-ui").children(".menu-navigation").addClass("active");
            });
            
            $(".close-navigation-menu").on("click", function() {
                $(this).closest(".menu-navigation").removeClass("active");
            });
            
            $(".user-profile-toggle").on("click", function() {
                $(this).siblings(".close-navigation-menu").click();
                $(this).closest(".andromeda-ui").children(".user-profile-blur").addClass("active");
            });
            
            $(".user-profile-blur").on("click", function(event) {
                if (!$(event.target).is(".user-profile-blur")) return;
        
                $(this).removeClass("active");
            });
            
            $(".card-toggle-container").on("click", function() {
                $(this).addClass("active");
                $(this).siblings(".user-profile-card-container").addClass("active");
                $(this).siblings(".username").addClass("active");
                $(this).siblings(".user-avatar").addClass("active");
            });
            
            $(".user-profile-card").on("click", function() {
                $(this).parent().removeClass("active");
                $(this).parent().siblings(".card-toggle-container").removeClass("active");
                $(this).parent().siblings(".username").removeClass("active");
                $(this).parent().siblings(".user-avatar").removeClass("active");
            });
            
            $(".interface-toggle").on("click", function() {
                var activeInterface = $(this).text().toLowerCase();
                
                $(this).closest(".andromeda-ui").removeClass($(this).closest(".andromeda-ui").attr('class').split(' ')[1]).addClass(activeInterface);
                $(this).closest(".menu-navigation").children(".close-navigation-menu").click();
                $(this).closest(".menu-navigation").children(".navigation-quadrant.active").removeClass("active");
                $(this).parent(".navigation-quadrant").addClass("active");
            });
            
            $(".previous-capsule-toggle").on("click", function() {
                var capsuleContainer = $(this).parent();
                
                if (capsuleContainer.hasClass("in-progress")) return;
                
                capsuleContainer.addClass("in-progress");
                
                var activeCapsule = $(this).parent().find(".capsule.active"),
                activeCapsuleIndicator = $(this).siblings(".capsule-container").find(".capsule-indicator.active");
                
                $(this).siblings(".next-capsule-toggle").removeClass("inactive");
                activeCapsule.addClass("shift-out-left");
                activeCapsule.prev().addClass("active");
                
                if (activeCapsuleIndicator.prev().length) {
                    activeCapsuleIndicator.removeClass("active").prev().addClass("active");
                    
                    if (activeCapsuleIndicator.parent().is(".capsule-indicator-top") && !activeCapsuleIndicator.prev().prev().length) {
                        $(this).addClass("inactive");
                    }
                } else if (activeCapsuleIndicator.parent().is(".capsule-indicator-bottom")) {
                    activeCapsuleIndicator.removeClass("active");
                    activeCapsuleIndicator.closest(".capsule-container").children(".capsule-indicator-top").children(".capsule-indicator").eq(3).addClass("active");
                }
                
                setTimeout(function() {
                    capsuleContainer.removeClass("in-progress");
                    activeCapsule.removeClass("active shift-out-left");
                }, 500);
            });
            
            $(".next-capsule-toggle").on("click", function() {
                var capsuleContainer = $(this).parent();
                
                if (capsuleContainer.hasClass("in-progress")) return;
                
                capsuleContainer.addClass("in-progress");
                
                var activeCapsule = $(this).parent().find(".capsule.active"),
                activeCapsuleIndicator = $(this).siblings(".capsule-container").find(".capsule-indicator.active");
                
                $(this).siblings(".previous-capsule-toggle").removeClass("inactive");
                activeCapsule.addClass("shift-out-right");
                activeCapsule.next().addClass("active");
                
                if (activeCapsuleIndicator.next().length) {
                    activeCapsuleIndicator.removeClass("active").next().addClass("active");
                    
                    if (activeCapsuleIndicator.parent().is(".capsule-indicator-bottom") && !activeCapsuleIndicator.next().next().length) {
                        $(this).addClass("inactive");
                    }
                } else if (activeCapsuleIndicator.parent().is(".capsule-indicator-top")) {
                    activeCapsuleIndicator.removeClass("active");
                    activeCapsuleIndicator.closest(".capsule-container").children(".capsule-indicator-bottom").children(".capsule-indicator").eq(0).addClass("active");
                }
                
                setTimeout(function() {
                    capsuleContainer.removeClass("in-progress");
                    activeCapsule.removeClass("active shift-out-right");
                }, 1000);
            });
            
            $(".image-gallery img").each(function() {
                $(this).attr("draggable", "false");
            });
            
            $(".previous-image-toggle").on("click", function() {
                var imageGallery = $(this).siblings(".image-gallery");
        
                if (imageGallery.hasClass("in-progress")) return;
        
                imageGallery.addClass("in-progress");
        
                var progressBarInner = $(this).siblings(".image-gallery-side").find(".image-gallery-progress-bar-inner"),
                    activeImage = imageGallery.children(".active");
        
                progressBarInner.removeClass("image-gallery-progress-bar-animate");
                
                setTimeout(function() {
                    progressBarInner.addClass("image-gallery-progress-bar-animate");
                }, 1);
        
                if (activeImage.prev().length) {
                    activeImage.removeClass("active");
                    activeImage.prev().addClass("active");
                } else {
                    activeImage.removeClass("active");
                    imageGallery.find(".image-three").addClass("active");
                }
        
                setTimeout(function() {
                    imageGallery.removeClass("in-progress");
                }, 1000);
            });
            
            $(".next-image-toggle").on("click", function() {
                var imageGallery = $(this).siblings(".image-gallery");
                
                if (imageGallery.hasClass("in-progress")) return;
                
                imageGallery.addClass("in-progress");
                
                var progressBarInner = $(this).siblings(".image-gallery-side").find(".image-gallery-progress-bar-inner"),
                    activeImage = imageGallery.children(".active");
                
                progressBarInner.removeClass("image-gallery-progress-bar-animate");
                
                setTimeout(function() {
                    progressBarInner.addClass("image-gallery-progress-bar-animate");
                }, 50);
                
                if (activeImage.next().length) {
                    activeImage.removeClass("active");
                    activeImage.next().addClass("active");
                } else {
                    activeImage.removeClass("active");
                    imageGallery.find(".image-one").addClass("active");
                }        
                
                setTimeout(function() {
                    imageGallery.removeClass("in-progress");
                }, 1000);
            });
            
            $(".image-gallery-progress-bar-inner").on("animationiteration webkitAnimationIteration", function() {
                $(this).closest(".image-gallery-container").find(".next-image-toggle").click();
            });
            
            $(".stop-gallery-animate").on("click", function() {
                $(this).toggleClass("active");
            });
            
            $(".power-node-border").on("click", function() {
                $(this).parent().toggleClass("active-node");
                $(this).toggleClass("active");
            });
        },
        init: function($this) {
            kevinWordBubble.graphics($this);
            kevinWordBubble.data($this);
        }
    };
    
    $(".andromeda-ui").each(function() {
        kevinWordBubble.init(this);
    });
    
    kevinWordBubble.events();
    
    $(window).on("EditPageAfterRenderPreview", function() {
        $(".andromeda-ui").each(function() {
            kevinWordBubble.init(this);
        });
        
        kevinWordBubble.events();
	});
	
	mw.hook("wikipage.content").add(function($content){
        if ($content.is("#article-comments")) {
            $content.find(".andromeda-ui").each(function() {
                kevinWordBubble.init(this);
            });
            
            kevinWordBubble.events();
        } else if ($content.is("li.comment")) {
            var commentLoad = setInterval(function() {
                if ($content.find(".andromeda-ui").length) {
                    $content.find(".andromeda-ui").each(function() {
                        kevinWordBubble.init(this);
                    });
                    
                    kevinWordBubble.events();
                    clearInterval(commentLoad);
                }
            }, 100);
        }
    });
})(jQuery);