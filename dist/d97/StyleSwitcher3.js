importScriptPage("MediaWiki:JacobsLadderSuite.js","d97");

StyleSwitcher = {
    VERSION: "3.0.3",
    
    circleType: "square",
    alignType: "right",
    loaded: false,
    defaultLogoUrl: "",
    normal: "",
    skinType: 0,

    report: function(styleIDtext) {
        if (styleIDtext != "default") {
            styleID = parseInt(styleIDtext, 10); //Gets the ID of the selected style
            $('#skinBackground').remove(); //Removes old style
            $('#ChatSkins').remove(); //Removes old style
            $('#ChatSkinsAdditional').remove(); //Removes old style
            $('#ChatSkinsTransparent').remove(); //Removes old style
            $('#HeaderLogo').remove(); //Removes old style
            StyleSwitcher.skinType = stylesheetsArray[styleID].name; //Sets page variable StyleSwitcher.skinType to the new skin
            $.cookie('StyleSwitcher.skinType', styleID, {
                expires: 5
            }); //Sets cookie StyleSwitcher.skinType to the new skin ID

            if (stylesheetsArray[styleID].clear === true) {
                $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
            }

            $('head').append('<link href="' + stylesheetsArray[styleID].url + '" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
            if (stylesheetsArray[styleID].logo !== null) {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + stylesheetsArray[styleID].logo + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
            } else {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + StyleSwitcher.normalLogoUrl + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
            }
        } else {
            styleID = parseInt(defaultSkin, 10); //Gets the ID of the default skin
            $('#skinBackground').remove(); //Removes old style
            $('#ChatSkins').remove(); //Removes old style
            $('#ChatSkinsAdditional').remove(); //Removes old style
            $('#ChatSkinsTransparent').remove(); //Removes old style
            $('#HeaderLogo').remove(); //Removes old style
            StyleSwitcher.skinType = stylesheetsArray[styleID].name; //Sets page variable StyleSwitcher.skinType to the new skin
            $.cookie('StyleSwitcher.skinType', styleID, {
                expires: 5
            }); //Sets cookie StyleSwitcher.skinType to the new skin ID

            if (stylesheetsArray[styleID].clear === true) {
                $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
            }

            $('head').append('<link href="' + stylesheetsArray[styleID].url + '" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
            if (stylesheetsArray[styleID].logo !== null) {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + stylesheetsArray[styleID].logo + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
            } else {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + StyleSwitcher.normalLogoUrl + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
            }
        }
    },

    circleToggle: function() {
        if (StyleSwitcher.circleType == "circle") {
            $('#ChatSkinsCircle').remove();
            $.cookie('StyleSwitcher.circleType', 'square', {
                expires: 5
            });
            StyleSwitcher.circleType = "square";
            $("a.circle-button").text("Circle");
        } else {
            $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:Round.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsCircle"/>');
            $.cookie('StyleSwitcher.circleType', 'circle', {
                expires: 5
            });
            StyleSwitcher.circleType = "circle";
            $("a.circle-button").text("Square");
        }
    },

    alignToggle: function() {
        if (StyleSwitcher.alignType == "left") {
            $('#ChatSkinsLeft').remove();
            $.cookie('StyleSwitcher.alignType', 'right', {
                expires: 5
            });
            StyleSwitcher.alignType = "right";
            $("a.align-button").text("Left");
        } else {
            $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:LeftChat.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsLeft"/>');
            $.cookie('StyleSwitcher.alignType', 'left', {
                expires: 5
            });
            StyleSwitcher.alignType = "left";
            $("a.align-button").text("Right");
        }
    },

    loadApp: function() {
        $('.ChatWindow').attr('id', 'ChatWindow');
        StyleSwitcher.normalLogoUrl = $("#ChatHeader > h1.public.wordmark > a > img").attr("src");

        if (typeof stylesheetsArray === 'undefined') {
            console.log("[STYLE] ERROR: No styles defined!");
        }

        if (typeof defaultSkin === 'undefined') {
            console.log("[STYLE] ERROR: No default skin defined! Setting to 0");
            var defaultSkin = 0;
        }

        if ($.cookie("StyleSwitcher.skinType") === null) {
            if (typeof StyleSwitcher.normal != "undefined") {
                StyleSwitcher.skinType = defaultSkin;
            } else {
                console.log("[STYLE] ERROR: No default skin defined. Setting skin to 0");
                StyleSwitcher.skinType = "0";
                StyleSwitcher.normal = "0";
            }
        } else {
            StyleSwitcher.skinType = $.cookie("StyleSwitcher.skinType");
        }

        $('#ChatHeader > h1.public.wordmark > a').remove(); // Removes the default logo

        if (!$(".stylechanger").length) {
            $('#sidebar-top').prepend('<table id="StyleButtons" style="margin-left:auto;margin-right:auto;width:95%;"><tr><td colspan=2 style="text-align:center;"><select name="style" class="stylechanger" style="width:100%; height:20px !important;" onchange="StyleSwitcher.report(this.value)"><option value="default">Themes</option></select></td></tr><tr><td><div class="circles-div" onclick="StyleSwitcher.circleToggle()" style="text-align: center; cursor: pointer;"><a class="circle-button wikia-button" style="width:47px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;"> Circle </a></div></td><td><div class="align-div" onclick="StyleSwitcher.alignToggle()" style="text-align: center; cursor: pointer;"><a class="align-button wikia-button" style="width:47px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;"> Align </a></div></td></tr></table>');
        }

        if (StyleSwitcher.loaded === false) {
            for (i = 0; i < stylesheetsArray.length; i++) {
                $(".stylechanger").append("<option value='" + String(i) + "'>" + stylesheetsArray[i].name + "</option>");
            }
            StyleSwitcher.loaded = true;
        }

        StyleSwitcher.report(StyleSwitcher.skinType);
        if ($.cookie("StyleSwitcher.alignType") == "left") {
            StyleSwitcher.alignToggle();
        }

        if ($.cookie("StyleSwitcher.circleType") == "circle") {
            StyleSwitcher.circleToggle();
        }
        
        console.log("[StyleSwitcher] StyleSwitcher "+ StyleSwitcher.VERSION +" loaded!");
    }
};

styleSwitcherTimeout = setInterval(function() {
    if($("#sidebar-top").length) {
        StyleSwitcher.loadApp();
        clearInterval(styleSwitcherTimeout);
    }
}, 1000);