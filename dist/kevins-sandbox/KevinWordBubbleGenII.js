var kevinWBGenII = {
    loadGUIElements: function($this) {
        var infoBackground = $($this).data("info-background"),
            roleplayBackground = $($this).data("roleplay-background"),
            imagesBackground = $($this).data("images-background"),
            powersBackground = $($this).data("powers-background"),
            userInfoBackground = $($this).data("user-info-background");

        if (infoBackground.indexOf("{{{") === -1 && infoBackground.indexOf("http") !== -1 && (infoBackground.indexOf(".jpg") !== -1 || infoBackground.indexOf(".png") !== -1)) {
            $($this).find(".sector-one").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + infoBackground + "')"
            });

            $($this).find(".capsule").css({
                "background-image": "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.85) 100%), url('" + infoBackground + "')"
            });
        }

         if (roleplayBackground.indexOf("{{{") === -1 && roleplayBackground.indexOf("http") !== -1 && (roleplayBackground.indexOf(".jpg") !== -1 || roleplayBackground.indexOf(".png") !== -1)) {
            $($this).find(".sector-two").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + roleplayBackground + "')"
            });

            $($this).children(".andromeda-ui-left-sector").children(".sector-container").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + roleplayBackground + "')"
            });

            $($this).children(".andromeda-ui-right-sector").children().css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + roleplayBackground + "')"
            });
        }

        if (imagesBackground.indexOf("{{{") === -1 && imagesBackground.indexOf("http") !== -1 && (imagesBackground.indexOf(".jpg") !== -1 || imagesBackground.indexOf(".png") !== -1)) {
            $($this).find(".sector-three").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + imagesBackground + "')"
            });

            $($this).find(".image-module-background").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('" + imagesBackground + "')"
            });
        }

        if (powersBackground.indexOf("{{{") === -1 && powersBackground.indexOf("http") !== -1 && (powersBackground.indexOf(".jpg") !== -1 || powersBackground.indexOf(".png") !== -1)) {
            $($this).find(".sector-four").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + powersBackground + "')"
            });
        }

        if (userInfoBackground.indexOf("{{{") === -1 && userInfoBackground.indexOf("http") !== -1 && (userInfoBackground.indexOf(".jpg") !== -1 || userInfoBackground.indexOf(".png") !== -1)) {
            $($this).find(".user-info-interface").css({
                "background-image": "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + userInfoBackground + "')"
            });
        }

        var characterPageLink = $($this).find(".capsule-text").children("a"),
            characterName = characterPageLink.text();

        characterPageLink.hide();
        characterPageLink.parent().append(characterName);

        var imageTwoIMG = $($this).find(".image-two"),
            imageThreeIMG = $($this).find(".image-three");

        imageTwoIMG.hide();
        imageThreeIMG.hide();

        var powerset = $($this).find(".power-set");

        if (powerset.find(".no-power-set").length) {
            var noPowerSet = powerset.find(".no-power-set");

            powerset.empty().append(noPowerSet);
        } else if (powerset.find("h4").length || powerset.find("h5").length) {
            var powersetTemplate = $($this).find(".power-set-template");

            powerset.find(":header").each(function() {
                var mwHeadline = $(this).children(".mw-headline"),
                    powersetLi = $(this).next().find("li"),
                    powerset = $(this).closest(".power-set"),
                    offensiveDefensivePowers = powerset.find(".offensive-defensive-powers"),
                    passiveSupplementaryPowers = powerset.find(".passive-supplementary-powers"),
                    monthPowers = powerset.find(".month-powers"),
                    traits = powerset.find(".trait-powers");
    
                if (mwHeadline.text().indexOf("Abilities") !== -1) {
                    powersetLi.each(function() {
                        $(this).appendTo(offensiveDefensivePowers.children());
                    });
                } else if (mwHeadline.text().indexOf("Offensive") !== -1) {
                    powersetLi.each(function() {
                        $(this).appendTo(offensiveDefensivePowers.children());
                    });
                } else if (mwHeadline.text().indexOf("Defensive") !== -1) {
                    powersetLi.each(function() {
                        $(this).appendTo(offensiveDefensivePowers.children());
                    });
                } else if (mwHeadline.text().indexOf("Passive") !== -1) {
                    powersetLi.each(function() {
                        $(this).appendTo(passiveSupplementaryPowers.children());
                    });
                } else if (mwHeadline.text().indexOf("Supplementary") !== -1) {
                    powersetLi.each(function() {
                        $(this).appendTo(passiveSupplementaryPowers.children());
                    });
                } else if (mwHeadline.text().indexOf("3 Months") !== -1) {
                    $(this).next().children().appendTo(monthPowers.children());
                } else if (mwHeadline.text().indexOf("6 Months") !== -1) {
                    $(this).next().children().appendTo(monthPowers.children());
                } else if (mwHeadline.text().indexOf("9 Months") !== -1) {
                    $(this).next().children().appendTo(monthPowers.children());
                } else if (mwHeadline.text().indexOf("Traits") !== -1) {
                    powersetLi.each(function() {
                        $(this).appendTo(traits.children());
                    });
                }
            });

            powersetTemplate.remove();
        }

        if (parseInt($($this).find(".user-info-interface").css("left"), 0) - $($this).width() <= 1) {
            $($this).find(".user-card-container").css("top", 0);
    
            $($this).find(".card-icon").each(function() {
                $(this).css({
                    "background-image": $(this).closest(".user-info-interface").css("background-image"),
                    "background-position": ($(this).offset().left - $(this).closest(".user-info-interface").offset().left) / -1 + "px " + ($(this).offset().top - $(this).closest(".user-info-interface").offset().top) / -1 + "px"
                });
            });

            $($this).find(".user-card-container").removeAttr("style");
        }

        var username = $($this).find(".username").data("username");

        if (username.indexOf("{{{") === -1) {
            $.nirvana.getJson("UserProfilePage", "renderUserIdentityBox", {
                title: "User:" + username
            }).done(function(data) {
                if (data.user.edits !== -1 && data.user.name == username) {
                    var userAvatar = data.user.avatar.replace(/\/scale-to-width-down\/.+/, "/scale-to-width-down/75"),
                        userRights = data.user.tags.join(", ") || "Regular user",
                        memberSince = data.user.registration,
                        editCount = data.user.edits;

                    $($this).find(".user-avatar").css({
                        "background-image": "url('" + userAvatar + "')"
                    });

                    $($this).find(".user-card:first-of-type").children(".card-text").text(editCount + " edits");
                    $($this).find(".user-card:nth-of-type(2)").children(".card-text").text("Member since " + memberSince);
                }
            });

            new mw.Api().get({
                action: "query",
                list: "users",
                ususers: username,
                usprop: "groups"
            }).done(function(data) {
                if (data.query.users[0].groups.indexOf("bureaucrat") !== -1) {
                    $($this).find(".user-card:last-of-type").children(".card-text").text("Bureaucrat");
                } else if (data.query.users[0].groups.indexOf("sysop") !== -1) {
                    $($this).find(".user-card:last-of-type").children(".card-text").text("Administrator");
                } else if (data.query.users[0].groups.indexOf("rollback") !== -1) {
                    $($this).find(".user-card:last-of-type").children(".card-text").text("Rollback");
                } else if (data.query.users[0].groups.indexOf("chatmoderator") !== -1) {
                    $($this).find(".user-card:last-of-type").children(".card-text").text("Chat Moderator");
                } else {
                    $($this).find(".user-card:last-of-type").children(".card-text").text("Regular User");
                }
            });
        }
    },
    GUILayoutIntegrity: function($this) {
        var powerInterface = $($this).find(".powers-interface"),
            powerNodeContainer = $($this).find(".powers-node-container"),
            node = $($this).find(".node"),
            endNode = $($this).find(".end-node");

        if (!powerInterface.is(":visible")) {
            powerInterface.show();
 
            powerNodeContainer.css({
                height: node.outerWidth()
            });

            node.each(function() {
                $(this).css({
                    height: $(this).outerWidth()
                });
            });

            endNode.css({
                height: endNode.width()
            });

            powerInterface.hide();
        } else {
            powerNodeContainer.css({
                height: node.outerWidth()
            });

            node.each(function() {
                $(this).css({
                    height: $(this).outerWidth()
                });
            });

            endNode.css({
                height: endNode.width()
            });
        }

        if ($($this).data("user-info-background").indexOf("{{{") === -1) {
            var userCardBackgroundSize = setInterval(function() {
                var userInfoInterfaceBackgroundSize = new Image();
                    userInfoInterfaceBackgroundSize.src = $($this).data("user-info-background");

                var userInfoInterfaceBackgroundWidth = userInfoInterfaceBackgroundSize.width,
                    userInfoInterfaceBackgroundHeight = userInfoInterfaceBackgroundSize.height;

                if (userInfoInterfaceBackgroundWidth !== 0 || userInfoInterfaceBackgroundHeight !== 0) {
                    if (userInfoInterfaceBackgroundHeight > userInfoInterfaceBackgroundWidth) {
                        $($this).find(".card-icon").each(function() {
                            $(this).css({
                                "background-size": $(this).closest(".user-info-interface").width() + "px auto"
                            });
                        });
                    } else {
                        $($this).find(".card-icon").each(function() {
                            $(this).css({
                                "background-size": "auto 300px"
                            });
                        });
                    }

                    clearInterval(userCardBackgroundSize);
                }
            }, 1);
        }
    },
    setEventHandlers: function($this) {
        $(".menu-interface-toggle").on("click", function(event) {
            event.stopImmediatePropagation();

            if (!$(this).closest(".andromeda-ui").find(".menu-interface").is(":animated") && parseInt($(this).closest(".andromeda-ui").find(".user-info-interface").css("left"), 0) - $(this).closest(".andromeda-ui").width() <= 1) {
                $(this).closest(".andromeda-ui").find(".menu-interface").animate({
                    left: "0%"
                }, {
                    duration: 500,
                    complete: function() {
                        if ($(this).closest(".andromeda-ui").find(".image-interface").hasClass("active-interface")) {
                            $(this).closest(".andromeda-ui").find(".slideshow-progress").css({
                                "animation-play-state": "paused",
                                "-webkit-animation-play-state": "paused",
                                "-moz-animation-play-state": "paused",
                                "-o-animation-play-state": "paused"
                            });
                        }
                    }
                });
            }
        });

        $(".character-info").on("click", function(event) {
            event.stopImmediatePropagation();

            if (!$(this).closest(".andromeda-ui").find(".info-interface").hasClass("active-interface")) {
                $(this).closest(".andromeda-ui").find(".menu-interface-toggle").hide();

                $(this).closest(".menu-interface").animate({
                    left: "-100%"
                }, {
                    duration: 500
                });

                if ($(this).closest(".andromeda-ui").children(".now-playing").is(":visible")) {
                    $(this).closest(".andromeda-ui").children(".now-playing").animate({
                        "opacity": 0
                    }, {
                        duration: 500
                    });
                }

                if ($(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector").css("borderTopLeftRadius") === "0px") {
                    if ($(this).closest(".andromeda-ui").data("info-background").indexOf("{{{") === -1 && $(this).closest(".andromeda-ui").data("info-background").indexOf("http") !== -1 && ($(this).closest(".andromeda-ui").data("info-background").indexOf(".jpg") !== -1 || $(this).closest(".andromeda-ui").data("info-background").indexOf(".png") !== -1)) {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $(this).closest(".andromeda-ui").data("info-background") + "')");
                    } else {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('http://i.imgur.com/bzDiGhX.jpg')");
                    }

                    $(this).closest(".andromeda-ui").find(".active-interface").fadeOut({
                        duration: 250,
                        done: function() {
                            $(this).closest(".andromeda-ui").find(".active-interface").removeClass("active-interface");
                            $(this).closest(".andromeda-ui").find(".info-interface").addClass("active-interface");
                            kevinWBGenII.loadingTransition(this, "info");
                        }
                    });
                }
            } else {
                $(this).closest(".menu-interface").find(".menu-interface-close").click();
            }
        });

        $(".roleplay").on("click", function(event) {
             event.stopImmediatePropagation();

            if (!$(this).closest(".andromeda-ui").find(".roleplay-interface").hasClass("active-interface")) {
                $(this).closest(".andromeda-ui").find(".menu-interface-toggle").hide();

                $(this).closest(".menu-interface").animate({
                    left: "-100%"
                }, {
                    duration: 500
                });

                if ($(this).closest(".andromeda-ui").children(".now-playing").is(":visible")) {
                    $(this).closest(".andromeda-ui").children(".now-playing").animate({
                        "opacity": 0
                    }, {
                        duration: 500
                    });
                }

                if ($(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector").css("borderTopLeftRadius") === "0px") {
                    if ($(this).closest(".andromeda-ui").data("roleplay-background").indexOf("http") !== -1 && ($(this).closest(".andromeda-ui").data("roleplay-background").indexOf(".jpg") !== -1 || $(this).closest(".andromeda-ui").data("roleplay-background").indexOf(".png") !== -1)) {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $(this).closest(".andromeda-ui").data("roleplay-background") + "')");
                    } else {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('https://i.imgur.com/jWh2WXw.jpg')");
                    }

                    $(this).closest(".andromeda-ui").find(".active-interface").fadeOut({
                        duration: 250,
                        done: function() {
                            $(this).closest(".andromeda-ui").find(".active-interface").removeClass("active-interface");
                            $(this).closest(".andromeda-ui").find(".roleplay-interface").addClass("active-interface");
                            kevinWBGenII.loadingTransition(this, "roleplay");
                        }
                    });
                }
            } else {
                $(this).closest(".menu-interface").find(".menu-interface-close").click();
            }
        });        

        $(".images").on("click", function(event) {
             event.stopImmediatePropagation();

            if (!$(this).closest(".andromeda-ui").find(".image-interface").hasClass("active-interface")) {
                $(this).closest(".andromeda-ui").find(".menu-interface-toggle").hide();

                $(this).closest(".menu-interface").animate({
                    left: "-100%"
                }, {
                    duration: 500
                });

                if ($(this).closest(".andromeda-ui").children(".now-playing").is(":visible")) {
                    $(this).closest(".andromeda-ui").children(".now-playing").animate({
                        "opacity": 0
                    }, {
                        duration: 500
                    });
                }

                if ($(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector").css("borderTopLeftRadius") === "0px") {
                    if ($(this).closest(".andromeda-ui").data("images-background").indexOf("http") !== -1 && ($(this).closest(".andromeda-ui").data("images-background").indexOf(".jpg") !== -1 || $(this).closest(".andromeda-ui").data("images-background").indexOf(".png") !== -1)) {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $(this).closest(".andromeda-ui").data("images-background") + "')");
                    } else {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('http://f.fwallpapers.com/images/beautiful-space.jpg')");
                    }

                    $(this).closest(".andromeda-ui").find(".active-interface").fadeOut({
                        duration: 250,
                        done: function() {
                            $(this).closest(".andromeda-ui").find(".active-interface").removeClass("active-interface");
                            $(this).closest(".andromeda-ui").find(".image-interface").addClass("active-interface");
                            kevinWBGenII.loadingTransition(this, "images");
                        }
                    });
                }
            } else {
                $(this).closest(".menu-interface").find(".menu-interface-close").click();
            }
        });

        $(".powers").on("click", function(event) {
             event.stopImmediatePropagation();

            if (!$(this).closest(".andromeda-ui").find(".powers-interface").hasClass("active-interface")) {
                $(this).closest(".andromeda-ui").find(".menu-interface-toggle").hide();

                $(this).closest(".menu-interface").animate({
                    left: "-100%"
                }, {
                    duration: 500
                });

                if ($(this).closest(".andromeda-ui").children(".now-playing").is(":visible")) {
                    $(this).closest(".andromeda-ui").children(".now-playing").animate({
                        "opacity": 0
                    }, {
                        duration: 500
                    });
                }

                if ($(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector").css("borderTopLeftRadius") === "0px") {
                    if ($(this).closest(".andromeda-ui").data("powers-background").indexOf("http") !== -1 && ($(this).closest(".andromeda-ui").data("powers-background").indexOf(".jpg") !== -1 || $(this).closest(".andromeda-ui").data("powers-background").indexOf(".png") !== -1)) {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('" + $(this).closest(".andromeda-ui").data("powers-background") + "')");
                    } else {
                        $(this).closest(".andromeda-ui").find(".sector-container").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url('http://i.imgur.com/L2Gm2Yf.jpg')");
                    }

                    $(this).closest(".andromeda-ui").find(".active-interface").fadeOut({
                        duration: 250,
                        done: function() {
                            $(this).closest(".andromeda-ui").find(".active-interface").removeClass("active-interface");
                            $(this).closest(".andromeda-ui").find(".powers-interface").addClass("active-interface");
                            kevinWBGenII.loadingTransition(this, "powers");
                        }
                    });
                }
            } else {
                $(this).closest(".menu-interface").find(".menu-interface-close").click();
            }
        });

        $(".menu-interface-close").on("click", function() {
            if (!$(this).closest(".menu-interface").is(":animated")) {
                if ($(this).closest(".andromeda-ui").find(".image-interface").hasClass("active-interface")) {
                    $(this).closest(".andromeda-ui").find(".slideshow-progress").css({
                        "animation-play-state": "",
                        "-webkit-animation-play-state": "",
                        "-moz-animation-play-state": "",
                        "-o-animation-play-state": ""
                    });
                }

                $(this).closest(".menu-interface").animate({
                    left: "-100%"
                }, {
                    duration: 500
                });
            }
        });

        $(".next-capsule").on("click", function() {
            if ($(this).css("opacity") === "0") {
                return false;
            }

            if (!$(this).closest(".info-interface-container").find(".active-capsule").is(":animated")) {
                if ($(this).closest(".info-interface-container").find(".active-capsule-indicator").closest(".capsule-indicator-container.top").length) {
                    if (!$(this).closest(".info-interface-container").find(".active-capsule-indicator").next().length) {
                        $(this).closest(".info-interface-container").find(".active-capsule-indicator").removeClass("active-capsule-indicator").next().addClass("active-capsule-indicator");
                        $(this).closest(".info-interface-container").find(".capsule-indicator-container.bottom > .capsule-indicator:first").addClass("active-capsule-indicator");
                    } else {
                        $(this).closest(".info-interface-container").find(".active-capsule-indicator").removeClass("active-capsule-indicator").next().addClass("active-capsule-indicator");
                    }
                } else {
                    $(this).closest(".info-interface-container").find(".active-capsule-indicator").removeClass("active-capsule-indicator").next().addClass("active-capsule-indicator");
                }

                $(this).closest(".info-interface-container").find(".active-capsule").animate({
                    left: "20%",
                    opacity: 0
                }, {
                    duration: 500,
                    complete: function() {
                        $(this).next().addClass("active-capsule");
                        $(this).removeClass("active-capsule");

                        if ($(this).closest(".info-interface-container").find(".active-capsule").next(".capsule").length === 0) {
                            $(this).closest(".info-interface-container").find(".next-capsule, .capsule-right-connector").animate({
                                opacity: 0
                            }, {
                                duration: 250
                            });
                        }

                        if ($(this).closest(".info-interface-container").find(".previous-capsule").css("opacity") === "0") {
                            $(this).closest(".info-interface-container").find(".previous-capsule, .capsule-left-connector").animate({
                                opacity: 1
                            }, {
                                duration: 250
                            });
                        }

                        $(this).closest(".info-interface-container").find(".active-capsule").css({
                            left: "-20%",
                            opacity: 0
                        }).animate({
                            left: 0,
                            opacity: 1
                        });
                    }
                });
            }
        });

        $(".previous-capsule").on("click", function() {
            if ($(this).css("opacity") === "0") {
                return false;
            }

            if (!$(this).closest(".info-interface-container").find(".active-capsule").is(":animated")) {
                if ($(this).closest(".info-interface-container").find(".active-capsule-indicator").closest(".capsule-indicator-container.bottom").length) {
                    if (!$(this).closest(".info-interface-container").find(".active-capsule-indicator").prev().length) {
                        $(this).closest(".info-interface-container").find(".active-capsule-indicator").removeClass("active-capsule-indicator").prev().addClass("active-capsule-indicator");
                        $(this).closest(".info-interface-container").find(".capsule-indicator-container.top > .capsule-indicator:last").addClass("active-capsule-indicator");
                    } else {
                        $(this).closest(".info-interface-container").find(".active-capsule-indicator").removeClass("active-capsule-indicator").prev().addClass("active-capsule-indicator");
                    }
                } else {
                    $(this).closest(".info-interface-container").find(".active-capsule-indicator").removeClass("active-capsule-indicator").prev().addClass("active-capsule-indicator");
                }

                $(this).closest(".info-interface-container").find(".active-capsule").animate({
                    left: "-20%",
                    opacity: 0
                }, {
                    duration: 500,
                    complete: function() {
                        $(this).prev().addClass("active-capsule");
                        $(this).removeClass("active-capsule");

                        if ($(this).closest(".info-interface-container").find(".active-capsule").prev(".capsule").length === 0) {
                            $(this).closest(".info-interface-container").find(".previous-capsule, .capsule-left-connector").animate({
                                opacity: 0
                            }, {
                                duration: 250
                            });
                        }

                        if ($(this).closest(".info-interface-container").find(".next-capsule").css("opacity") === "0") {
                            $(this).closest(".info-interface-container").find(".next-capsule, .capsule-right-connector").animate({
                                opacity: 1
                            }, {
                                duration: 250
                            });
                        }

                        $(this).closest(".info-interface-container").find(".active-capsule").css({
                            left: "20%",
                            opacity: 0
                        }).animate({
                            left: 0,
                            opacity: 1
                        });
                    }
                });
            }
        });

        $(".user-info-interface-toggle").on("click", function() {
            if (!$(this).closest(".andromeda-ui").find(".user-info-interface").is(":animated") && !$(this).closest(".menu-interface").is(":animated")) {
                $(this).closest(".menu-interface").animate({
                    left: "-100%"
                }, {
                    duration: 500,
                    complete: function() {
                        $(this).closest(".andromeda-ui").find(".user-info-interface").animate({
                            left: "60%"
                        }, {
                            duration: 250
                        });
                    }
                });
            }
        });

        var userAgent = window.navigator.userAgent;

        if (/Edge\/|Trident\/|MSIE/.test(window.navigator.userAgent)) {
            $(".infinity").on("mouseenter", function() {
                if (!window.infinityTransition) {
                    window.infinityTransition = true;
                    var characterPageLink = $(this).closest(".andromeda-ui").find(".capsule-text").children("a"),
                        characterName = characterPageLink.text(),
                        characterNameArray = characterName.split(" ");

                    if (characterPageLink.length) {
                        $(this).addClass("infinity-hidden");

                        $(this).one("transitionend webkitTransitionEnd mozTransitionEnd otransitionend oTransitionEnd", function() {
                            if (!$(this).hasClass("infinity-hidden")) {
                                return false;
                            }

                            characterPageLink.clone().appendTo(this).attr("target", "_blank").empty();

                            for (var i = 0; i < characterNameArray.length; i++) {
                                $(this).children().append('<span>' + characterNameArray[i].charAt(0) + '</span><span>.</span>');
                            }

                            $(this).children("a").css({
                                "display": "block",
                                opacity: 0
                            }).animate({
                                opacity: 1
                            }, {
                                duration: 350,
                                complete: function() {
                                    if (window.infinityMouseleave) {
                                        $(this).closest(".andromeda-ui").mousemove();
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }

        $(window).on("mousemove", function(event) {
            if ($(".infinity-hidden").length && !$(event.target).is(".infinity") && !$(event.target).closest(".infinity").length) {
                window.infinityMouseleave = true;

                $(".infinity-hidden").children("a").animate({
                    opacity: 0
                }, {
                    duration: 350,
                    complete: function() {
                        var infinity = $(this).parent();

                        infinity.removeClass("infinity-hidden");
                        infinity.empty();

                        infinity.one("transitionend webkitTransitionEnd mozTransitionEnd otransitionend oTransitionEnd", function() {
                            window.infinityTransition = false;
                            window.infinityMouseleave = false;
                        });
                    }
                });
            } else if ($(event.target).is(".infinity") && !$(event.target).hasClass("infinity-hidden")) {
                $(event.target).mouseenter();
            }
        });

        $(".slideshow-progress").on("animationiteration webkitAnimationIteration mozAnimationIteration", function() {
            $(this).closest(".image-module").find(".next-image").click();
        });

        $(".previous-image, .next-image").on("click", function() {
            if (!$(this).closest(".image-module").hasClass("image-slideshow-transition")) {
                var slideshowNavigation = $(this);

                slideshowNavigation.closest(".image-module").find(".slideshow-progress").removeClass("slideshow-progress-animation");

                setTimeout(function() {
                    slideshowNavigation.closest(".image-module").find(".slideshow-progress").addClass("slideshow-progress-animation");
                }, 1);
            }
        });

        setInterval(function() {
            $(".andromeda-ui").each(function() {
               if ($(this).find(".image-interface").hasClass("active-interface") && !$(this).find(".image-module").hasClass("image-slideshow-transition") && $(this).find(".image-one").hasClass("image-fade-out") && $(this).find(".image-two").hasClass("image-fade-out") && $(this).find(".image-three").hasClass("image-fade-out")) {
                   $(this).find(".active-image").removeClass("image-fade-out");
               } 
            });
        }, 1);

        $(".previous-image").on("click", function() {
            if (!$(this).closest(".image-module").hasClass("image-slideshow-transition")) {
                $(this).closest(".image-module").addClass("image-slideshow-transition");

                $(this).closest(".image-module").find(".active-image").addClass("image-fade-out");

                $(this).closest(".image-module").find(".active-image").one("transitionend webkitTransitionEnd mozTransitionEnd otransitionend oTransitionEnd", function() {
                    $(this).hide();

                    if ($(this).closest(".image-module").find(".active-image").prev().length) {
                        $(this).closest(".image-module").find(".active-image").removeClass("active-image").prev().show().removeClass("image-fade-out image-zoom-first image-zoom-second").addClass("active-image");
                    } else {
                        $(this).closest(".image-module").find(".active-image").removeClass("active-image");
                        $(this).closest(".image-module").find(".image-three").show().removeClass("image-fade-out image-zoom-first image-zoom-second").addClass("active-image");
                    }

                    $(this).closest(".image-module").removeClass("image-slideshow-transition");
                    $(this).closest(".image-module").removeClass("image-slideshow-zoom");
                });
            }
        });

        $(".next-image").on("click", function(event) {
            if (!$(this).closest(".image-module").hasClass("image-slideshow-transition")) {
                $(this).closest(".image-module").addClass("image-slideshow-transition");

                $(this).closest(".image-module").find(".active-image").addClass("image-fade-out");

                $(this).closest(".image-module").find(".active-image").one("transitionend webkitTransitionEnd mozTransitionEnd otransitionend oTransitionEnd", function(event) {
                    if ($(event.target).is("img")) {
                        return false;
                    }

                    $(this).hide();

                    if ($(this).closest(".image-module").find(".active-image").next().length) {
                        $(this).closest(".image-module").find(".active-image").removeClass("active-image").next().show().removeClass("image-fade-out image-zoom-first image-zoom-second").addClass("active-image");
                    } else {
                        $(this).closest(".image-module").find(".active-image").removeClass("active-image");
                        $(this).closest(".image-module").find(".image-one").show().removeClass("image-fade-out image-zoom-first image-zoom-second").addClass("active-image");
                    }

                    $(this).closest(".image-module").removeClass("image-slideshow-transition");
                    $(this).closest(".image-module").removeClass("image-slideshow-zoom");
                });
            }
        });

        $(".image-slideshow img").on("click", function(event) {
            event.stopImmediatePropagation();

            if ($(this).closest(".image-module").hasClass("image-slideshow-zoom") || $(this).closest(".image-module").hasClass("image-slideshow-transition")) {
                return false;
            }

            $(this).closest(".image-module").addClass("image-slideshow-zoom");

            if (!$(this).parent().hasClass("image-zoom-first") && !$(this).parent().hasClass("image-zoom-second")) {
                $(this).parent().addClass("image-zoom-first");
            } else if ($(this).parent().hasClass("image-zoom-first") && !$(this).parent().hasClass("image-zoom-second")) {
                $(this).parent().removeClass("image-zoom-first").addClass("image-zoom-second");
            } else {
                $(this).parent().removeClass("image-zoom-second");
            }

            $(this).one("transitionend webkitTransitionEnd mozTransitionEnd otransitionend oTransitionEnd", function() {
               $(this).closest(".image-module").removeClass("image-slideshow-zoom");
            });
        });

        $(".image-slideshow img").on("dragstart", function(event) {
            event.preventDefault();
        });

        $(".tabbernav > li:not(.tabberactive)").on("click", function() {
            if ($(this).closest(".tabberlive").find(".andromeda-ui").length) {
                $(this).closest(".tabberlive").find(".andromeda-ui").each(function() {
                    if ($(this).find(".image-module").hasClass("image-slideshow-transition")) {
                        $(this).find(".image-module").removeClass("image-slideshow-transition");
                    }
                });
            }
        });

        $(".card-toggle-container").on("click", function(event) {
            event.stopImmediatePropagation();

            if (!$(this).closest(".user-info-interface").find(".user-card-container").is(":animated")) {
                $(this).hide();  
                $(this).closest(".user-info-interface").find(".user-avatar").fadeOut(350);
                $(this).closest(".user-info-interface").find(".username").fadeOut(350);
                $(this).closest(".user-info-interface").find(".user-card-container").animate({
                    top: 0
                }, {
                    duration: 350
                });
            }
        });

        $(".user-card-container").on("click", function(event) {
            event.stopImmediatePropagation();

            if (!$(this).is(":animated")) {
                $(this).animate({
                    top: "91%"
                }, {
                    duration: 350
                });

                $(this).closest(".user-info-interface").find(".card-toggle-container").show();
                $(this).closest(".user-info-interface").find(".user-avatar").fadeIn(350);
                $(this).closest(".user-info-interface").find(".username").fadeIn(350);
            }
        });

        $(".andromeda-ui").on("click", function(event) {
            if (!$(event.target).closest(".user-info-interface").length && parseInt($(this).find(".user-info-interface").css("left"), 0) - parseInt($(this).closest(".andromeda-ui").width(), 0) < 0) {
                event.stopImmediatePropagation();

                if ($(event.target).is(".menu-interface-toggle") || $(event.target).is(".toggle-stripe")) {
                    $(this).find(".user-info-interface").animate({
                        left: "100%"
                    }, {
                        duration: 500,
                        complete: function() {
                            $(this).closest(".andromeda-ui").find(".menu-interface-toggle").click();
                        }
                    });
                } else {
                    $(this).find(".user-info-interface").animate({
                        left: "100%"
                    }, {
                        duration: 500
                    });
                }
            }
        });
    },
    imageSlideshowIntegrity: function($this) {
        $($this).find(".image-slideshow img").each(function() {
            if ($(this).parent().is("p")) {
                $(this).unwrap();
            }

            if (typeof ImgLzy === "object" && $(this).hasClass("lzy")) {
                $(this).attr("data-src", $(this).attr("data-src").replace(/\/scale-to-width-down\/.+/, ""));
                ImgLzy.load(this);
            } else {
                $(this).attr("src", $(this).attr("src").replace(/\/scale-to-width-down\/.+/, ""));
            }

            if ($(this).attr("src").indexOf(".png") === -1) {
                $(this).addClass("img-jpg");
            }

            $(this).removeAttr("data-src onload");
        });
    },
    loadingTransition: function($this, toggle) {
        $($this).closest(".andromeda-ui").children(".andromeda-ui-right-sector").animate({
            top: 200,
            left: $($this).closest(".andromeda-ui").find(".andromeda-ui-left-sector").width() + 50,
            width: 25,
            height: 25,
            borderRadius: 25
        }, {
            duration: 250,
            queue: true,
            complete: function() {
                $(this).clone().appendTo($(this).closest(".andromeda-ui")).css("z-index", "-1").addClass("two");
                $(this).clone().appendTo($(this).closest(".andromeda-ui")).css("z-index", "-1").addClass("three");

                $(this).closest(".andromeda-ui").children(".two").children().css("background-position", "center 0").empty();
                $(this).closest(".andromeda-ui").children(".three").children().css("background-position", "right 0").empty();

                $(this).closest(".andromeda-ui").children(".two").animate({
                    left: $($this).closest(".andromeda-ui").find(".andromeda-ui-left-sector").width() + 100
                }, {
                    duration: 175
                });

                $(this).closest(".andromeda-ui").children(".three").animate({
                    left: $($this).closest(".andromeda-ui").find(".andromeda-ui-left-sector").width() + 150
                }, {
                    duration: 175
                });

                $(this).closest(".andromeda-ui").children(".three").queue(function() {
                    $(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector:first").animate({
                        top: 100
                    }, {
                        duration: 350
                    });

                    $(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector:first").queue(function() {
                        $(this).animate({
                            top: 200
                        }, {
                            duration: 350
                        });

                        $(this).dequeue();                            
                    });

                    $(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector.two").delay(175).animate({
                        top: 100
                    }, {
                        duration: 350
                    });

                    $(this).closest(".andromeda-ui").find(".andromeda-ui-right-sector.two").queue(function() {
                        $(this).animate({
                            top: 200
                        }, {
                            duration: 350
                        });

                        $(this).dequeue();
                    });

                    $(this).dequeue();

                    $(this).delay(350).animate({
                        top: 100
                    }, {
                        duration: 350
                    });

                    $(this).queue(function() {
                        $(this).animate({
                            top: 200
                        }, {
                            duration: 350,
                            complete: function() {
                                $($this).closest(".andromeda-ui").children(".two").delay(175).animate({
                                    left: $($this).closest(".andromeda-ui").find(".andromeda-ui-left-sector").width() + 50
                                }, {
                                    duration: 250,
                                    complete: function() {
                                        $(this).remove();
                                    }
                                });

                                $($this).closest(".andromeda-ui").children(".three").delay(175).animate({
                                    left: $($this).closest(".andromeda-ui").find(".andromeda-ui-left-sector").width() + 50
                                }, {
                                    duration: 250,
                                    complete: function() {
                                        $(this).remove();

                                        kevinWBGenII.expandInterface($this, toggle);
                                    }
                                });
                            }
                        });

                        $(this).dequeue();
                    });
                });
            }
        });
    },
    expandInterface: function($this, toggle) {
        $($this).closest(".andromeda-ui").find(".andromeda-ui-right-sector").delay(175).animate({
            top: 0,
            left: "13%",
            width: "87%",
            height: 300,
            borderRadius: 0,
        }, {
            duration: 350,
            complete: function() {
                $($this).closest(".andromeda-ui").children(".andromeda-ui-right-sector").css({
                    top: "",
                    left: "",
                    width: "",
                    height: "",
                    "border-radius": ""
                });

                if (toggle == "images") {
                    $($this).closest(".andromeda-ui").find(".image-interface").fadeIn(250);
                } else if (toggle == "info") {
                    $($this).closest(".andromeda-ui").find(".info-interface").fadeIn(250);
                } else if (toggle == "roleplay") {
                    $($this).closest(".andromeda-ui").find(".roleplay-interface").fadeIn(250);
                } else if (toggle == "powers") {
                    $($this).closest(".andromeda-ui").find(".powers-interface").fadeIn(250);
                }

                $($this).closest(".andromeda-ui").find(".menu-interface-toggle").show();

                if (($($this).closest(".andromeda-ui").children(".now-playing").css("opacity") === "0" || !$($this).closest(".andromeda-ui").children(".now-playing").is(":visible")) && $($this).closest(".andromeda-ui").find(".control").hasClass("pause")) {
                    $(this).closest(".andromeda-ui").children(".now-playing").show().animate({
                        "opacity": 1
                    }, {
                        duration: 500,
                        complete: function() {
                            $(this).css("opacity", "");
                        }
                    });
                }
            }
        });  
    },
    completeLoadingTransition: function() {
        $(".andromeda-ui-right-sector:animated").each(function() {
            $(this).stop(true, true);
            $(this).closest(".andromeda-ui").children(".two").remove();
            $(this).closest(".andromeda-ui").children(".three").remove();

            $(this).css({
                top: "",
                left: "",
                width: "",
                height: "",
                borderRadius: "",
            });

            if ($(this).children().css("background-image") == $(this).parent().find(".sector-one").css("background-image")) {
                $(this).find(".info-interface").show();
            } else if ($(this).children().css("background-image") == $(this).parent().find(".sector-two").css("background-image")) {
                $(this).find(".roleplay-interface").show();
            } else if ($(this).children().css("background-image") == $(this).parent().find(".sector-three").css("background-image")) {
                $(this).find(".image-interface").show();
            } else if ($(this).children().css("background-image") == $(this).parent().find(".sector-four").css("background-image")) {
                $(this).find(".powers-interface").show();
            }

            $(this).parent().find(".menu-interface-toggle").show();
        });
    },
    init: function($this) {
        kevinWBGenII.loadGUIElements($this);
        kevinWBGenII.GUILayoutIntegrity($this);
        kevinWBGenII.setEventHandlers($this);
        kevinWBGenII.imageSlideshowIntegrity($this);
    },
    dynamicDOMChanges: function(MutationObserver) {
        kevinWBGenII.articleCommentsLoad(MutationObserver);
        kevinWBGenII.pageEditor(MutationObserver);

        if ($(".article-comments").length) {
            $(".andromeda-ui").each(function() {
                kevinWBGenII.init(this);
            });

            kevinWBGenII.newComment(MutationObserver);
        }
    },
    articleCommentsLoad: function(MutationObserver) {
        var andromedaUIObserver = new MutationObserver(function(andromedaUIMutations) {
            andromedaUIMutations.forEach(function(andromedaUIMutation) {
                Array.prototype.forEach.call(andromedaUIMutation.addedNodes, function(andromedaUINode) {
                    if (andromedaUINode.className == "article-comments") {
                        andromedaUIObserver.disconnect();
                        kevinWBGenII.completeLoadingTransition();

                        $(".article-comments").find(".andromeda-ui").each(function() {
                            kevinWBGenII.init(this);
                        });

                        kevinWBGenII.newComment(MutationObserver);
                    }
                });
            });
        });

        var andromedaUIObserverTarget = document.querySelector("#WikiaArticleComments"),
            andromedaUIObserverConfig = {
                childList: true,
                subtree: true
            };

        if ($("#WikiaArticleComments").length) {
            andromedaUIObserver.observe(andromedaUIObserverTarget, andromedaUIObserverConfig);
        }
    },
    pageEditor: function(MutationObserver) {
        if (wgAction == "edit") {
            var andromedaUIEPObserver = new MutationObserver(function(andromedaUIEPMutations) {
                andromedaUIEPMutations.forEach(function(andromedaUIEPMutation) {
                    Array.prototype.forEach.call(andromedaUIEPMutation.addedNodes, function(andromedaUIEPNode) {
                        if (andromedaUIEPNode.id == "EditPageDialog") {
                            kevinWBGenII.articlePreview(MutationObserver);
                        }
                    });
                });
            });

            var andromedaUIEPObserverTarget = document.body,
                andromedaUIEPObserverConfig = {
                    childList: true,
                    subtree: true
                };

            andromedaUIEPObserver.observe(andromedaUIEPObserverTarget, andromedaUIEPObserverConfig);
        }
    },
    newComment: function(MutationObserver) {
        var andromedaUICommentObserver = new MutationObserver(function(andromedaUICommentMutations) {
            andromedaUICommentMutations.forEach(function(andromedaUICommentMutation) {
                Array.prototype.forEach.call(andromedaUICommentMutation.addedNodes, function(andromedaUICommentNode) {
                    if (andromedaUICommentNode.tagName == "LI" || andromedaUICommentNode.className == "sub-comments") {
                        kevinWBGenII.completeLoadingTransition();

                        $(".andromeda-ui").each(function() {
                            if ($(this).find(".active-interface").hasClass("roleplay-interface")) {
                                kevinWBGenII.init(this);
                            }
                        });
                    }
                });
            });
        });

        var andromedaUICommentObserverTarget = document.querySelector("#article-comments-ul"),
            andromedaUICommentObserverConfig = {
                childList: true,
                subtree: true
            };

        andromedaUICommentObserver.observe(andromedaUICommentObserverTarget, andromedaUICommentObserverConfig);
    },
    articlePreview: function(MutationObserver) {
        var andromedaUIAPObserver = new MutationObserver(function(andromedaUIAPMutations) {
            andromedaUIAPMutations.forEach(function(andromedaUIAPMutation) {
                Array.prototype.forEach.call(andromedaUIAPMutation.addedNodes, function(andromedaUIAPNode) {
                    if (andromedaUIAPNode.className == "WikiaArticle") {
                        andromedaUIAPObserver.disconnect();

                        $(".andromeda-ui").each(function() {
                            kevinWBGenII.init(this);
                        });
                    }
                });
            });
        });

        var andromedaUIAPObserverTarget = document.querySelector("#EditPageDialog"),
            andromedaUIAPObserverConfig = {
                childList: true,
                subtree: true
            };

        andromedaUIAPObserver.observe(andromedaUIAPObserverTarget, andromedaUIAPObserverConfig);
    },
    dynamicDOMChangesFallback: function() {
        if ($(".article-comments").length) {
            $(".andromeda-ui").each(function() {
                kevinWBGenII.init(this);
            });

            $("#article-comments-ul").on("DOMNodeInserted", function (event) {
                if (event.target.tagName == "LI" || event.target.className == "sub-comments") {
                    kevinWBGenII.completeLoadingTransition();

                    $(".andromeda-ui").each(function() {
                        if ($(this).find(".active-interface").hasClass("roleplay-interface")) {
                            kevinWBGenII.init(this);
                        }
                    });
                }
            });
        }

        $("#WikiaArticleComments").on("DOMNodeInserted", function (event) {
            if (event.target.className == "article-comments") {
                kevinWBGenII.completeLoadingTransition();

                $(".article-comments").find(".andromeda-ui").each(function() {
                    kevinWBGenII.init(this);
                });

                $("#article-comments-ul").on("DOMNodeInserted", function (event) {
                    if (event.target.tagName == "LI" || event.target.className == "sub-comments") {
                        kevinWBGenII.completeLoadingTransition();

                        $(".andromeda-ui").each(function() {
                            if ($(this).find(".active-interface").hasClass("roleplay-interface")) {
                                kevinWBGenII.init(this);
                            }
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
                            $(".andromeda-ui").each(function() {
                                kevinWBGenII.init(this);
                            });
                        }
                    });
                }
            });
        }
    },
    windowResize: function() {
        if (window.windowWidth !== $(window).width()) {
            $(".andromeda-ui").each(function() {
                kevinWBGenII.GUILayoutIntegrity(this);
            });

            window.windowWidth = $(window).width();
        }
    }
};

$(function() {
    window.infinityTransition = window.infinityMouseleave = false;
    window.windowWidth = $(window).width();

    $(".andromeda-ui").each(function() {
        kevinWBGenII.init(this);
    });

    if ("MutationObserver" in window) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    
        kevinWBGenII.dynamicDOMChanges(MutationObserver);
    } else {
        kevinWBGenII.dynamicDOMChangesFallback();
    }

    $(window).on("resize", function() {
        kevinWBGenII.windowResize();
    });
});