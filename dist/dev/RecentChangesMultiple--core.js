//<pre>
/*
 * Script: RecentChangesMultiple
 * Author: Fewfre
 *
 * Uses ajax loading to view the Special:RecentChanges of multiple wikis all on one page.
 * PLEASE DON'T EDIT DIRECTLY WITHOUT INFORMING ME! If you do so it will likely be overwritten at a later date, as this script is pre-compiled and stored at https://github.com/fewfre/RecentChangesMultiple
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var mw = window.mediaWiki;
var Global =  (function () {
    function Global() {
    }
    Global.init = function (pScriptConfig) {
        Global.FAVICON_BASE = pScriptConfig.FAVICON_BASE || Global.FAVICON_BASE;
        Global.LOADER_IMG = pScriptConfig.LOADER_IMG || Global.LOADER_IMG;
        Global.NOTIFICATION_ICON = pScriptConfig.NOTIFICATION_ICON || Global.NOTIFICATION_ICON;
        Global.userOptions = mw.user.options.get([
            "date",
            "gender",
        ]);
        Global.isUcpWiki = Global.config.wgVersion !== '1.19.24';
    };
    Global.getLoader = function (pSize) {
        if (pSize === void 0) { pSize = 15; }
        return "<svg width=\"" + pSize + "\" height=\"" + pSize + "\" id=\"rcm-loading\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t<g transform=\"translate(20 50)\">\n\t\t\t\t<rect class=\"bar bar1\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.3\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(50 50)\">\n\t\t\t\t<rect class=\"bar bar2\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.6\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(80 50)\">\n\t\t\t\t<rect class=\"bar bar3\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.9\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t</svg>";
    };
    Global.getLoaderLarge = function (pSize) {
        if (pSize === void 0) { pSize = 75; }
        return "<svg width=\"" + pSize + "\" height=\"" + pSize + "\" id=\"rcm-loading-large\" viewBox=\"0 0 100 100\">\n\t\t\t<g transform=\"translate(-20,-20)\">\n\t\t\t\t<path class=\"gear1\" fill=\"#8f7f59\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(20,20) rotate(15 50 50)\">\n\t\t\t\t<path class=\"gear2\" fill=\"#9f9fab\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t</svg>";
    };
    Global.getSymbol = function (pID, pWidth, pHeight) {
        if (pWidth === void 0) { pWidth = 15; }
        if (pHeight === void 0) { pHeight = pWidth; }
        return "<svg width=\"" + pWidth + "\" height=\"" + pHeight + "\" class='rcm-svg-icon'><use xlink:href=\"#" + pID + "\" width=\"" + pWidth + "\" height=\"" + pHeight + "\" /></svg>";
    };
    Global.initSymbols = function () {
        if (!Global.SVG_SYMBOLS) {
            return;
        }
        var tSVG = "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" style=\"height: 0px; width: 0px; position: absolute; overflow: hidden;\">'\n\t\t\t" + Global.SVG_SYMBOLS.join("") + "\n\t\t</svg>";
        delete Global.SVG_SYMBOLS;
        return tSVG;
    };
    Global.showUpdateMessage = function (pMessageCont) {
        Global._addUpdateMessage(pMessageCont, {
            messageID: "rcm-news-V2-14-i18n-rework",
            messageColor: "gold",
            endDate: "Sep 28 2020 00:00:00 GMT",
            message: "\n\t\t\tScript translation now uses the I18n-js system, and can easily be edited <a href=\"https://dev.fandom.com/wiki/Special:BlankPage/I18nEdit/RecentChangesMultiple\">here</a> (must be logged in)!\n\t\t\tAdding a new language is simple as well, by visiting the same link.\n\t\t\t",
        });
    };
    ;
    Global._addUpdateMessage = function (pMessageCont, _a) {
        var messageID = _a.messageID, messageColor = _a.messageColor, endDate = _a.endDate, message = _a.message;
        if (new Date(endDate) > new Date() && (localStorage.getItem(messageID) != "true")) {
            mw.log("(_addUpdateMessage) Message still new enough, so adding");
            var tMessage = Utils_1["default"].newElement("div", { className: "rcm-update-message rcm-um-" + messageID, innerHTML: message }, pMessageCont);
            tMessage.style.cssText = "border:5px double " + messageColor + "; padding:2px 6px; overflow-y: hidden;";
            var tButton = Utils_1["default"].newElement("button", { className: "rcm-btn", innerHTML: "Dismiss Message" }, tMessage);
            tButton.addEventListener("click", function () {
                var messages = document.querySelectorAll(".rcm-um-" + messageID);
                for (var i = 0; i < messages.length; i++) {
                    Utils_1["default"].removeElement(messages[i]);
                }
                localStorage.setItem(messageID, "true");
            });
            tButton.style.cssText = "float:right;";
        }
    };
    Global.version = "2.15h";
    Global.lastVersionDateString = "Nov 2 2020 00:00:00 GMT";
    Global.config = mw.config.get([
        "skin",
        "debug",
        "wgPageName",
        "wgUserName",
        "wgUserLanguage",
        "wgServer",
        "wgScriptPath",
        "wgMonthNames",
        "wgVersion",
    ]);
    Global.debug = Global.config.debug || mw.util.getParamValue("useuserjs") == "0" || mw.util.getParamValue("safemode") == "1";
    Global.isUcpWiki = false;
    Global.AUTO_REFRESH_LOCAL_STORAGE_ID = "RecentChangesMultiple-autorefresh-" + Global.config.wgPageName;
    Global.OPTIONS_SETTINGS_LOCAL_STORAGE_ID = "RecentChangesMultiple-saveoptionscookie-" + Global.config.wgPageName;
    Global.FAVICON_BASE = "//www.google.com/s2/favicons?domain="; 
    Global.LOADER_IMG = "//images.wikia.nocookie.net/__cb1421922474/common/skins/common/images/ajax.gif";
    Global.NOTIFICATION_ICON = "//vignette.wikia.nocookie.net/fewfre/images/4/44/RecentChangesMultiple_Notification_icon.png/revision/latest?cb=20161013043805";
    Global.username = Global.config.wgUserName;
    Global.uniqID = 0;
    Global.useLocalSystemMessages = true;
    Global.timezone = "utc";
    Global.timeFormat = "24";
    Global.loadDelay = 10; 
    Global.SVG_SYMBOLS = [
        "<symbol id=\"rcm-loading\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t<g transform=\"translate(20 50)\">\n\t\t\t\t<rect class=\"bar bar1\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.3\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(50 50)\">\n\t\t\t\t<rect class=\"bar bar2\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.6\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(80 50)\">\n\t\t\t\t<rect class=\"bar bar3\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.9\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t</symbol>",
        "<symbol id=\"rcm-loading-large\" viewBox=\"0 0 100 100\">\n\t\t\t<g transform=\"translate(-20,-20)\">\n\t\t\t\t<path class=\"gear1\" fill=\"#8f7f59\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(20,20) rotate(15 50 50)\">\n\t\t\t\t<path class=\"gear2\" fill=\"#9f9fab\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t</symbol>",
        "<symbol id=\"rcm-columns\" viewBox=\"0 -256 1792 1792\" version=\"1.1\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\" inkscape:version=\"0.48.3.1 r9886\" sodipodi:docname=\"columns_font_awesome.svg\">\n\t\t\t<metadata id=\"metadata12\"><rdf:rdf><cc:work rdf:about=\"\"><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"></dc:type></cc:work></rdf:rdf></metadata>\n\t\t\t<defs id=\"defs10\"></defs>\n\t\t\t<sodipodi:namedview pagecolor=\"#ffffff\" bordercolor=\"#666666\" borderopacity=\"1\" objecttolerance=\"10\" gridtolerance=\"10\" guidetolerance=\"10\" inkscape:pageopacity=\"0\" inkscape:pageshadow=\"2\" inkscape:window-width=\"640\" inkscape:window-height=\"480\" id=\"namedview8\" showgrid=\"false\" inkscape:zoom=\"0.13169643\" inkscape:cx=\"896\" inkscape:cy=\"896\" inkscape:window-x=\"0\" inkscape:window-y=\"25\" inkscape:window-maximized=\"0\" inkscape:current-layer=\"svg2\"></sodipodi:namedview>\n\t\t\t<g transform=\"matrix(1,0,0,-1,68.338983,1277.8305)\" id=\"g4\">\n\t\t\t\t<path d=\"M 160,0 H 768 V 1152 H 128 V 32 Q 128,19 137.5,9.5 147,0 160,0 z M 1536,32 V 1152 H 896 V 0 h 608 q 13,0 22.5,9.5 9.5,9.5 9.5,22.5 z m 128,1216 V 32 q 0,-66 -47,-113 -47,-47 -113,-47 H 160 Q 94,-128 47,-81 0,-34 0,32 v 1216 q 0,66 47,113 47,47 113,47 h 1344 q 66,0 113,-47 47,-47 47,-113 z\" id=\"path6\" inkscape:connector-curvature=\"0\" style=\"fill:currentColor\"></path>\n\t\t\t</g>\n\t\t</symbol>",
        "<symbol id=\"rcm-picture\" viewBox=\"0 0 548.176 548.176\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"enable-background:new 0 0 548.176 548.176;\" xml:space=\"preserve\">\n\t\t\t<g>\n\t\t\t\t<path style=\"fill:currentColor\" d=\"M534.75,68.238c-8.945-8.945-19.694-13.417-32.261-13.417H45.681c-12.562,0-23.313,4.471-32.264,13.417 C4.471,77.185,0,87.936,0,100.499v347.173c0,12.566,4.471,23.318,13.417,32.264c8.951,8.946,19.702,13.419,32.264,13.419h456.815 c12.56,0,23.312-4.473,32.258-13.419c8.945-8.945,13.422-19.697,13.422-32.264V100.499 C548.176,87.936,543.699,77.185,534.75,68.238z M511.623,447.672c0,2.478-0.899,4.613-2.707,6.427 c-1.81,1.8-3.952,2.703-6.427,2.703H45.681c-2.473,0-4.615-0.903-6.423-2.703c-1.807-1.813-2.712-3.949-2.712-6.427V100.495 c0-2.474,0.902-4.611,2.712-6.423c1.809-1.803,3.951-2.708,6.423-2.708h456.815c2.471,0,4.613,0.905,6.42,2.708 c1.801,1.812,2.707,3.949,2.707,6.423V447.672L511.623,447.672z\"/>\n\t\t\t\t<path style=\"fill:currentColor\" d=\"M127.91,237.541c15.229,0,28.171-5.327,38.831-15.987c10.657-10.66,15.987-23.601,15.987-38.826 c0-15.23-5.333-28.171-15.987-38.832c-10.66-10.656-23.603-15.986-38.831-15.986c-15.227,0-28.168,5.33-38.828,15.986 c-10.656,10.66-15.986,23.601-15.986,38.832c0,15.225,5.327,28.169,15.986,38.826C99.742,232.211,112.683,237.541,127.91,237.541z\"/>\n\t\t\t\t<polygon style=\"fill:currentColor\" points=\"210.134,319.765 164.452,274.088 73.092,365.447 73.092,420.267 475.085,420.267 475.085,292.36 356.315,173.587\"/>\n\t\t\t</g>\n\t\t</symbol>",
        "<symbol id=\"rcm-preview\" viewBox=\"0 0 480.606 480.606\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"enable-background:new 0 0 480.606 480.606;\" xml:space=\"preserve\">\n\t\t\t<g>\n\t\t\t\t<rect x=\"85.285\" y=\"192.5\" width=\"200\" height=\"30\"/>\n\t\t\t\t<path style=\"fill:currentColor\" d=\"M439.108,480.606l21.213-21.213l-71.349-71.349c12.528-16.886,19.949-37.777,19.949-60.371\n\t\t\t\t\tc0-40.664-24.032-75.814-58.637-92.012V108.787L241.499,0H20.285v445h330v-25.313c6.188-2.897,12.04-6.396,17.475-10.429\n\t\t\t\t\tL439.108,480.606z M250.285,51.213L299.072,100h-48.787V51.213z M50.285,30h170v100h100v96.957\n\t\t\t\t\tc-4.224-0.538-8.529-0.815-12.896-0.815c-31.197,0-59.148,14.147-77.788,36.358H85.285v30h126.856\n\t\t\t\t\tc-4.062,10.965-6.285,22.814-6.285,35.174c0,1.618,0.042,3.226,0.117,4.826H85.285v30H212.01\n\t\t\t\t\tc8.095,22.101,23.669,40.624,43.636,52.5H50.285V30z M307.389,399.208c-39.443,0-71.533-32.09-71.533-71.533\n\t\t\t\t\ts32.089-71.533,71.533-71.533s71.533,32.089,71.533,71.533S346.832,399.208,307.389,399.208z\"/>\n\t\t\t</g>\n\t\t</symbol>",
        "<symbol id=\"rcm-upvote-tiny\" viewBox=\"0 0 14 14\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M9.746 6.83c-.114.113-.263.17-.413.17-.15 0-.298-.057-.412-.17L7.584 5.49V10.5c0 .322-.26.583-.583.583-.322 0-.583-.26-.583-.583V5.492L5.08 6.829c-.23.227-.598.227-.826 0-.228-.23-.228-.598 0-.826L6.588 3.67c.053-.053.117-.095.19-.125.142-.06.303-.06.445 0 .07.03.136.072.19.126l2.333 2.334c.228.228.228.597 0 .825M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7\" fill-rule=\"evenodd\"/>\n\t\t</symbol>",
        "<symbol id=\"rcm-lock\" viewBox=\"0 0 18 18\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M11 6H7V5c0-1.1.9-2 2-2s2 .9 2 2v1zm-1 6.7V14H8v-1.3c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .7-.4 1.4-1 1.7zM9 1C6.8 1 5 2.8 5 5v1H3c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-2V5c0-2.2-1.8-4-4-4z\" fill=\"#999\" fill-rule=\"evenodd\"/>\n\t\t</symbol>",
        "<symbol id=\"rcm-report\" viewBox=\"0 0 18 18\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M10 9a1 1 0 0 1-2 0V4.5a1 1 0 0 1 2 0V9zm0 4.5a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0v.5zM9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z\" fill-rule=\"evenodd\"></path>\n\t\t</symbol>",
        "<symbol id=\"rcm-settings-gear\" viewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M20,14.5v-2.9l-1.8-0.3c-0.1-0.4-0.3-0.8-0.6-1.4l1.1-1.5l-2.1-2.1l-1.5,1.1c-0.5-0.3-1-0.5-1.4-0.6L13.5,5h-2.9l-0.3,1.8 C9.8,6.9,9.4,7.1,8.9,7.4L7.4,6.3L5.3,8.4l1,1.5c-0.3,0.5-0.4,0.9-0.6,1.4L4,11.5v2.9l1.8,0.3c0.1,0.5,0.3,0.9,0.6,1.4l-1,1.5 l2.1,2.1l1.5-1c0.4,0.2,0.9,0.4,1.4,0.6l0.3,1.8h3l0.3-1.8c0.5-0.1,0.9-0.3,1.4-0.6l1.5,1.1l2.1-2.1l-1.1-1.5c0.3-0.5,0.5-1,0.6-1.4 L20,14.5z M12,16c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,16,12,16z\"/>\n\t\t</symbol>",
        "<symbol id=\"rcm-disc-page\" viewBox=\"0 0 12 12\"><path d=\"M5 7v3H3V2h6v4H6a1 1 0 0 0-1 1m5.935.326c.03-.086.047-.175.053-.265.001-.022.012-.04.012-.061V1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4a.985.985 0 0 0 .383-.077.986.986 0 0 0 .325-.217l3.998-3.998.004-.005a.958.958 0 0 0 .19-.283c.015-.03.023-.062.035-.094\" fill-rule=\"evenodd\"></path></symbol>",
        "<symbol id=\"rcm-disc-envelope\" viewBox=\"0 0 12 12\"><path d=\"M10 9H2V4.414l3.293 3.293a.999.999 0 0 0 1.414 0L10 4.414V9zM8.586 3L6 5.586 3.414 3h5.172zm3.339-1.381A1.003 1.003 0 0 0 11.003 1H.997a.988.988 0 0 0-.704.293A1.003 1.003 0 0 0 0 1.997V10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1.997a.988.988 0 0 0-.075-.378z\" fill-rule=\"evenodd\"></path></symbol>",
        "<symbol id=\"rcm-disc-reply\" viewBox=\"0 0 12 12\"><path id=\"reply-tiny\" d=\"M4.998 4H3.412l2.293-2.293A.999.999 0 1 0 4.291.293l-3.999 4a1 1 0 0 0 0 1.415l3.999 4a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.415L3.412 6h1.586c2.757 0 5 2.243 5 5a1 1 0 1 0 2 0c0-3.86-3.141-7-7-7\"></path></symbol>",
    ];
    return Global;
}());
exports["default"] = Global;

},{"./Utils":13}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var Global_1 = require("./Global");
var RCMModal_1 = require("./RCMModal");
var RCData_1 = require("./RCData");
var mw = window.mediaWiki;
function previewDiff(pPageName, pageID, pAjaxUrl, pDiffLink, pUndoLink, pDiffTableInfo) {
    Utils_1["default"].logUrl("(previewDiff)", pAjaxUrl);
    mw.log(pDiffLink);
    mw.log(pUndoLink);
    var tTitle = pPageName + " - " + i18n_1["default"]('modal-diff-title');
    var tButtons = [];
    tButtons.push(modalLinkButton('modal-diff-open', "diff", pDiffLink));
    if (pUndoLink != null) {
        tButtons.push(modalLinkButton('modal-diff-undo', "undo", pUndoLink));
    }
    RCMModal_1["default"].showLoadingModal({ title: tTitle, buttons: tButtons }).then(function () {
        $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: pAjaxUrl }).then(function (pData) {
            if (!RCMModal_1["default"].isModalOpen()) {
                return;
            }
            var tPage = pData.query.pages[pageID];
            var tRevision = tPage.revisions[0];
            var tOMinor = tRevision.minor == "" ? "<abbr class=\"minoredit\">" + i18n_1["default"]('minoreditletter') + "</abbr> " : "";
            var tNMinor = pDiffTableInfo.newRev.minor ? "<abbr class=\"minoredit\">" + i18n_1["default"]('minoreditletter') + "</abbr> " : "";
            var tRevDate = new Date(tRevision.timestamp);
            var tNewRevDate = pDiffTableInfo.newRev.date;
            var tModalContent = ''
                + "<div id='rcm-diff-view'>"
                + "<table class='diff'>"
                + "<colgroup>"
                + "<col class='diff-marker'>"
                + "<col class='diff-content'>"
                + "<col class='diff-marker'>"
                + "<col class='diff-content'>"
                + "</colgroup>"
                + "<tbody>"
                + "<tr class='diff-header' valign='top'>"
                + "<td class='diff-otitle' colspan='2'>"
                + "<div class='mw-diff-otitle1'>"
                + "<strong>"
                + "<a href='" + pDiffTableInfo.hrefFS + "oldid=" + tRevision.diff.from + "' data-action='revision-link-before'>"
                + i18n_1["default"]('revisionasof', RCData_1["default"].getFullTimeStamp(tRevDate), Utils_1["default"].formatWikiTimeStampDateOnly(tRevDate), Utils_1["default"].formatWikiTimeStampTimeOnly(tRevDate))
                + "</a>"
                + " <span class='mw-rev-head-action'>"
                + ("(<a href=\"" + pDiffTableInfo.hrefFS + "oldid=" + tRevision.diff.from + "&action=edit\" data-action=\"edit-revision-before\">" + i18n_1["default"]('editold') + "</a>)")
                + "</span>"
                + "</strong>"
                + "</div>"
                + "<div class='mw-diff-otitle2'>" + RCData_1["default"].formatUserDetails(pDiffTableInfo.wikiInfo, tRevision.user, tRevision.userhidden == "", tRevision.anon != "") + "</div>"
                + "<div class='mw-diff-otitle3'>" + tOMinor + RCData_1["default"].formatSummary(RCData_1["default"].formatParsedComment(tRevision.parsedcomment, tRevision.commenthidden == "", pDiffTableInfo.wikiInfo)) + "</div>"
                + "</td>"
                + "<td class='diff-ntitle' colspan='2'>"
                + "<div class='mw-diff-ntitle1'>"
                + "<strong>"
                + "<a href='" + pDiffTableInfo.hrefFS + "oldid=" + tRevision.diff.to + "' data-action='revision-link-after'>"
                + i18n_1["default"]('revisionasof', RCData_1["default"].getFullTimeStamp(tNewRevDate), Utils_1["default"].formatWikiTimeStampDateOnly(tNewRevDate), Utils_1["default"].formatWikiTimeStampTimeOnly(tNewRevDate))
                + "</a>"
                + " <span class='mw-rev-head-action'>"
                + ("(<a href=\"" + pDiffTableInfo.hrefFS + "oldid=" + tRevision.diff.to + "&action=edit\" data-action=\"edit-revision-after\">" + i18n_1["default"]('editold') + "</a>)")
                + "</span>"
                + "<span class='mw-rev-head-action'>"
                + ("(<a href=\"" + pDiffTableInfo.hrefFS + "action=edit&undoafter=" + tRevision.diff.to + "&undo=" + tRevision.diff.to + "\" data-action=\"undo\">" + i18n_1["default"]('editundo') + "</a>)")
                + "</span>"
                + "</strong>"
                + "</div>"
                + "<div class='mw-diff-ntitle2'>" + pDiffTableInfo.newRev.user + "</div>"
                + "<div class='mw-diff-ntitle3'>" + tNMinor + pDiffTableInfo.newRev.summary + "</div>"
                + "</td>"
                + "</tr>"
                + tRevision.diff["*"]
                + "</tbody>"
                + "</table>";
            +"</div>";
            RCMModal_1["default"].setModalContent(tModalContent);
        });
    });
}
exports.previewDiff = previewDiff;
function previewImages(pAjaxUrl, pImageNames, pArticlePath) {
    var tImagesInLog = pImageNames.slice();
    var size = 210; 
    pAjaxUrl += "&iiurlwidth=" + size + "&iiurlheight=" + size;
    var tCurAjaxUrl = pAjaxUrl + "&titles=" + tImagesInLog.splice(0, 50).join("|");
    Utils_1["default"].logUrl("(previewImages)", tCurAjaxUrl, pImageNames);
    var tTitle = i18n_1["default"](Global_1["default"].isUcpWiki ? "images" : "awc-metrics-images");
    var tButtons = [];
    var tAddLoadMoreButton = function () {
        if (tImagesInLog.length > 0) {
            mw.log("Over 50 images to display; Extra images must be loaded later.");
            var tModal = document.querySelector("#" + RCMModal_1["default"].MODAL_CONTENT_ID);
            var tGallery_1 = tModal.querySelector(".rcm-gallery");
            var tCont_1 = Utils_1["default"].newElement("center", { style: 'margin-bottom: 8px;' }, tModal);
            var tButton = Utils_1["default"].newElement("button", { innerHTML: i18n_1["default"]('modal-gallery-load-more') }, tCont_1);
            tButton.addEventListener("click", function () {
                tCurAjaxUrl = pAjaxUrl + "&titles=" + tImagesInLog.splice(0, 50).join("|");
                Utils_1["default"].logUrl("(previewImages) click", tCurAjaxUrl);
                tCont_1.innerHTML = Global_1["default"].getLoader(25);
                $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: tCurAjaxUrl }).then(function (pData) {
                    Utils_1["default"].removeElement(tCont_1);
                    tGallery_1.innerHTML += previewImages_getGalleryItemsFromData(pData.query.pages, pArticlePath, size);
                    tAddLoadMoreButton();
                });
            });
        }
    };
    RCMModal_1["default"].showLoadingModal({ title: tTitle, buttons: tButtons }).then(function () {
        $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: tCurAjaxUrl }).then(function (pData) {
            if (!RCMModal_1["default"].isModalOpen()) {
                return;
            }
            var tModalContent = ''
                + '<div class="rcm-gallery wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-medium wikia-gallery-border-small wikia-gallery-captions-center wikia-gallery-caption-size-medium">'
                + previewImages_getGalleryItemsFromData(pData.query.pages, pArticlePath, size)
                + '</div>';
            RCMModal_1["default"].setModalContent(tModalContent);
            tAddLoadMoreButton();
        });
    });
}
exports.previewImages = previewImages;
function previewImages_getGalleryItemsFromData(pData, pArticlePath, pSize) {
    var tReturnText = "";
    for (var key in pData) {
        tReturnText += previewImages_getGalleryItem(pData[key], pArticlePath, pSize);
    }
    return tReturnText;
}
function previewImages_getGalleryItem(pPage, pArticlePath, pSize) {
    var tTitle = pPage.title, tPageTitleNoNS = tTitle.indexOf(":") > -1 ? tTitle.split(":")[1] : tTitle, tImage = pPage.imageinfo ? pPage.imageinfo[0] : null, tInvalidImage = null;
    if (pPage.missing == "") {
        tInvalidImage = {
            thumbHref: pArticlePath + Utils_1["default"].escapeCharactersLink(tTitle),
            thumbText: i18n_1["default"]('filedelete-success', tTitle)
        };
    }
    else if (tImage == null) {
        tInvalidImage = {
            thumbHref: pArticlePath + Utils_1["default"].escapeCharactersLink(tTitle),
            thumbText: Global_1["default"].isUcpWiki
                ? i18n_1["default"]('redirectto') + " " + tTitle
                : i18n_1["default"]('shared_help_was_redirect', tTitle) 
        };
    }
    else if (Utils_1["default"].isFileAudio(tTitle)) {
        tInvalidImage = {
            thumbHref: tImage.url,
            thumbText: '<img src="/extensions/OggHandler/play.png" height="22" width="22"><br />' + tTitle
        };
    }
    else if (tImage.thumburl == "" || (tImage.width == 0 && tImage.height == 0)) {
        tInvalidImage = {
            thumbHref: tImage.url,
            thumbText: tTitle
        };
    }
    var tRCM_galleryItemTemplate = function (_a) {
        var wrapperStyle = _a.wrapperStyle, image = _a.image, imageHref = _a.imageHref, imageStyle = _a.imageStyle, isLightbox = _a.isLightbox, caption = _a.caption;
        wrapperStyle = wrapperStyle ? "style=\"" + wrapperStyle + "\"" : "";
        var lightBoxClass = isLightbox ? "image-no-lightbox" : "image lightbox";
        return '<div class="wikia-gallery-item">'
            + '<div class="thumb">'
            + ("<div class=\"gallery-image-wrapper accent\" " + wrapperStyle + ">")
            + ("<a class=\"" + lightBoxClass + "\" href=\"" + imageHref + "\" style=\"" + imageStyle + "\">")
            + image
            + '</a>'
            + '</div>'
            + '</div>'
            + ("<div class=\"lightbox-caption\" style=\"width:100%;\">" + caption + "</div>")
            + '</div>';
    };
    if (tInvalidImage) {
        return tRCM_galleryItemTemplate({ isLightbox: false, wrapperStyle: null,
            image: tInvalidImage.thumbText,
            imageHref: tInvalidImage.thumbHref,
            imageStyle: "height:" + pSize + "px; width:" + pSize + "px; line-height:inherit;",
            caption: tPageTitleNoNS,
        });
    }
    else {
        var tOffsetY = pSize / 2 - tImage.thumbheight / 2;
        var tScaledWidth = tImage.thumbwidth;
        return tRCM_galleryItemTemplate({ isLightbox: true,
            wrapperStyle: "position: relative; width:" + tScaledWidth + "px; top:" + tOffsetY + "px;",
            image: "<img class=\"thumbimage\" src=\"" + tImage.thumburl + "\" alt=\"" + tTitle + "\">",
            imageHref: tImage.descriptionurl,
            imageStyle: "width:" + tScaledWidth + "px;",
            caption: "<a href=\"" + tImage.descriptionurl + "\">" + tPageTitleNoNS + "</a>"
                + (" &#32; <a class=\"rcm-ajaxIcon\" href=\"" + tImage.url + "\" target=\"_blank\">" + Global_1["default"].getSymbol("rcm-picture") + "</a>"),
        });
    }
}
function previewPage(pAjaxUrl, pPageName, pPageHref, pServerLink) {
    Utils_1["default"].logUrl("(previewPage)", pAjaxUrl);
    var tTitle = "" + pPageName;
    var tButtons = [
        modalLinkButton('modal-preview-openpage', "view", pPageHref),
    ];
    RCMModal_1["default"].showLoadingModal({ title: tTitle, buttons: tButtons }).then(function () {
        $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: pAjaxUrl }).then(function (pData) {
            if (!RCMModal_1["default"].isModalOpen()) {
                return;
            }
            var tContentText = pData.parse.text["*"];
            var tModalContent = ''
                + "<div class='ArticlePreview'>"
                + "<div class='ArticlePreviewInner'>"
                + "<div class='WikiaArticle'>"
                + "<div id='mw-content-text'>"
                + tContentText
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>";
            RCMModal_1["default"].setModalContent(tModalContent);
            var tModalCont = document.querySelector("#" + RCMModal_1["default"].MODAL_CONTENT_ID);
            var tCont = document.querySelector("#" + RCMModal_1["default"].MODAL_CONTENT_ID + " #mw-content-text");
            if (tCont.attachShadow) {
                tModalCont.innerHTML = "";
                tModalCont = tModalCont.attachShadow({ mode: "open" });
                tModalCont.innerHTML = tModalContent;
                tCont = tModalCont.querySelector("#mw-content-text");
                tCont.innerHTML = "";
                var tPreviewHead = Utils_1["default"].newElement("div", { innerHTML: pData.parse.headhtml["*"] });
                var tCurPageHead = document.querySelector("head").cloneNode(true);
                Utils_1["default"].forEach(tCurPageHead.querySelectorAll("link[rel=stylesheet]"), function (o, i, a) {
                    tCont.innerHTML += "<style> @import url(" + o.href + "); </style>"; 
                });
                Utils_1["default"].forEach(tCurPageHead.querySelectorAll("link"), function (o, i, a) { Utils_1["default"].removeElement(o); });
                Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link[rel=stylesheet]"), function (o, i, a) {
                    tCont.innerHTML += "<style> @import url(" + o.href + "); </style>"; 
                });
                Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link"), function (o, i, a) { Utils_1["default"].removeElement(o); });
                tCont.innerHTML += tCurPageHead.innerHTML;
                tCont.innerHTML += "\n<!-- Loaded Wiki Styles -->\n";
                tCont.innerHTML += tPreviewHead.innerHTML;
                tCont.innerHTML += tContentText;
            }
            else if ("scoped" in document.createElement("style")) {
                var tPreviewHead = Utils_1["default"].newElement("div", { innerHTML: pData.parse.headhtml["*"] });
                Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link[rel=stylesheet]"), function (o, i, a) {
                    tCont.innerHTML += "<style scoped> @import url(" + o.href + "); </style>"; 
                });
            }
            Utils_1["default"].forEach(tCont.querySelectorAll("a[href^='/']"), function (o, i, a) {
                o.href = pServerLink + o.getAttribute("href");
            });
            mw.hook('wikipage.content').fire($(tCont)); 
        });
    });
}
exports.previewPage = previewPage;
function modalLinkButton(text, event, link) {
    return { text: i18n_1["default"](text), event: event, callback: function () { window.open(link, '_blank'); } };
}

},{"./Global":1,"./RCData":4,"./RCMModal":9,"./Utils":13,"./i18n":15}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RCMManager_1 = require("./RCMManager");
var Global_1 = require("./Global");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RCMModal_1 = require("./RCMModal");
var makeCollapsible_1 = require("./lib/makeCollapsible");
var $ = window.jQuery;
var mw = window.mediaWiki;
var Notification = window.Notification;
var Main =  (function () {
    function Main() {
        this._notifications = [];
        this.rcmList = [];
        this.langLoaded = false;
        this.onLangLoadCallbacks = [];
        this.numLangLoadErrors = 0;
    }
    Main.prototype.init = function (pScriptConfig) {
        var _this = this;
        mw.loader.using(['mediawiki.util', 'mediawiki.language', 'mediawiki.user', 'user.options']).done(function () {
            Global_1["default"].init(pScriptConfig);
            if (Global_1["default"].debug) {
                mw.log = console.log;
            }
            $(document).ready($.proxy(_this._ready, _this));
            $(document).on("unload", $.proxy(_this._unload, _this));
            $(window).focus($.proxy(_this._onFocus, _this));
        });
    };
    Main.prototype._ready = function () {
        var _this = this;
        var tFirstWrapper = document.querySelector('.rc-content-multiple, #rc-content-multiple');
        var tDataset = tFirstWrapper.dataset;
        i18n_1["default"].init(tDataset.lang);
        if (tDataset.localsystemmessages === "false") {
            Global_1["default"].useLocalSystemMessages = false;
        }
        if (tDataset.loaddelay) {
            Global_1["default"].loadDelay = tDataset.loaddelay;
        }
        if (tDataset.timezone) {
            Global_1["default"].timezone = tDataset.timezone.toLowerCase();
        }
        if (tDataset.timeformat) {
            Global_1["default"].timeFormat = tDataset.timeformat.toLowerCase();
        }
        if (tDataset.hiderail !== "false") {
            document.querySelector("body").className += " rcm-hiderail";
        }
        tDataset = null;
        tFirstWrapper = null;
        var tLoadPromises = [];
        Utils_1["default"].newElement("link", { rel: "stylesheet", type: "text/css", href: "/load.php?mode=articles&articles=u:dev:MediaWiki:RecentChangesMultiple.css&only=styles" }, document.head);
        tLoadPromises[tLoadPromises.length] = this.importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
            ]
        });
        RCMModal_1["default"].init();
        tLoadPromises[tLoadPromises.length] = this._loadLangMessages();
        tLoadPromises[tLoadPromises.length] = new Promise(function (resolve) {
            mw.hook('dev.i18n').add(function () {
                var _a = Global_1["default"].version.match(/(\d*)\.(\d*)(\w*)/), ma = _a[1], mi = _a[2], ch = _a[3];
                ch = ch ? String("a".charCodeAt(0) - 96) : "0";
                var versionAsNum = Number([ma, mi, ch].map(function (n) { return Utils_1["default"].pad(n, 3, "0"); }).join(""));
                window.dev.i18n.loadMessages("RecentChangesMultiple", { cacheVersion: versionAsNum, language: i18n_1["default"].defaultLang, noCache: Global_1["default"].debug }).done(function (devI18n) {
                    i18n_1["default"].devI18n = devI18n;
                    resolve();
                });
            });
        });
        tLoadPromises[tLoadPromises.length] = mw.loader.using([
            'mediawiki.special.recentchanges',
            'mediawiki.special.changeslist',
            'mediawiki.special.changeslist.enhanced',
            'skin.oasis.css',
            'skin.oasis.recentChanges.css'
        ].concat((Global_1["default"].isUcpWiki ? ['ext.fandom.photoGallery.gallery.css'] : []), (Global_1["default"].isUcpWiki ? ["mediawiki.diff.styles", "skin.oasis.diff.css"] : ['mediawiki.action.history.diff'])))
            .then(function () {
            makeCollapsible_1["default"]();
        });
        $("body").append($(Global_1["default"].initSymbols()));
        var tBaseUserValues = {
            "days": mw.user.options.get("rcdays") || 7,
            "limit": mw.user.options.get("rclimit") || 50,
            "hideenhanced": ((mw.user.options.get("usenewrc") == 1 ? "0" : "1") || 0) == "1",
            "hideminor": (mw.user.options.get("hideminor") || 0) == "1",
        };
        this.rcParamsURL = tBaseUserValues;
        var tParam;
        ["limit", "days"].forEach(function (key) {
            if ((tParam = mw.util.getParamValue(key)) != null) {
                _this.rcParamsURL[key] = parseInt(tParam);
            }
        });
        ["hideminor", "hidebots", "hideanons", "hideliu", "hidemyself", "hideenhanced", "hidelogs"].forEach(function (key) {
            if ((tParam = mw.util.getParamValue(key)) != null) {
                _this.rcParamsURL[key] = tParam == "1";
            }
        });
        tLoadPromises = tLoadPromises.map(function (p) { var d = $.Deferred(); p.then(d.resolve); return d; });
        var initDef = $.when.apply($, tLoadPromises);
        this._start(initDef);
    };
    Main.prototype._start = function (pInitDef) {
        var _this = this;
        this._parsePage(document, pInitDef);
        setTimeout(function () {
            mw.hook('wikipage.content').add(function (pSection) {
                if (pSection[0].querySelector('.rc-content-multiple, #rc-content-multiple')) {
                    _this._parsePage(pSection[0], pInitDef);
                }
            });
        }, 0);
    };
    Main.prototype._parsePage = function (pCont, pInitDef) {
        var _this = this;
        var tWrappers = pCont.querySelectorAll('.rc-content-multiple, #rc-content-multiple');
        Utils_1["default"].forEach(tWrappers, function (pNode, pI, pArray) {
            if (pNode.rcm_wrapper_used) {
                mw.log("[Main](_parsePage) Wrapper already parsed; exiting.");
                return;
            }
            pNode.rcm_wrapper_used = true;
            var tRCMManager = new RCMManager_1["default"](pNode, pI);
            _this.rcmList.push(tRCMManager);
            tRCMManager.resultCont.innerHTML = "<center>" + Global_1["default"].getLoaderLarge() + "</center>";
            pInitDef.done(function () {
                tRCMManager.init();
            });
        });
        var refreshAllButton = pCont.querySelector(".rcm-refresh-all");
        if (refreshAllButton) {
            refreshAllButton.addEventListener("click", function () { _this._refreshAllManagers(); });
        }
        tWrappers = null;
    };
    Main.prototype._refreshAllManagers = function () {
        for (var i = 0; i < this.rcmList.length; i++) {
            this.rcmList[i].refresh();
        }
    };
    Main.prototype._unload = function () {
    };
    Main.prototype._onFocus = function () {
        this.clearNotifications();
        this.cancelBlinkWindowTitle();
        for (var i = 0; i < this.rcmList.length; i++) {
            this.rcmList[i].lastLoadDateTime = this.rcmList[i].lastLoadDateTimeActual;
        }
    };
    Main.prototype._loadLangMessages = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tLangLoadAjaxPromises = [];
            var tMissing = [];
            function tRCM_loadLangMessage(pMessages) {
                var tScriptPath = Global_1["default"].useLocalSystemMessages ? Global_1["default"].config.wgServer + Global_1["default"].config.wgScriptPath : "//community.fandom.com";
                var url = tScriptPath + "/api.php?action=query&format=json&meta=allmessages&amlang=" + i18n_1["default"].defaultLang + "&ammessages=" + pMessages;
                Utils_1["default"].logUrl("", url);
                return $.when(
                $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: url,
                    success: function (pData) {
                        if (typeof pData === 'undefined' || typeof pData.query === 'undefined')
                            return; 
                        $.each((pData.query || {}).allmessages, function (index, message) {
                            if (message.missing !== '') {
                                i18n_1["default"].MESSAGES[message.name] = message['*'];
                            }
                            else {
                                if (i18n_1.legacyMessagesRemovedContent.indexOf(message.name) == -1)
                                    tMissing.push([message.name, i18n_1["default"].MESSAGES[message.name]]);
                            }
                        });
                    }
                }), 
                (!Global_1["default"].isUcpWiki ? null : (function () {
                    var legacyWikiPath = "//community.fandom.com";
                    var legacyMessages = i18n_1.legacyMessagesRemovedContent;
                    var url2 = legacyWikiPath + "/api.php?action=query&format=json&meta=allmessages&amlang=" + i18n_1["default"].defaultLang + "&ammessages=" + legacyMessages.join("|");
                    Utils_1["default"].logUrl("Legacy Messages", url2);
                    return $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: url2,
                        success: function (pData) {
                            if (typeof pData === 'undefined' || typeof pData.query === 'undefined')
                                return; 
                            $.each((pData.query || {}).allmessages, function (index, message) {
                                if (message.missing !== '') {
                                    i18n_1["default"].MESSAGES[message.name] = message['*'];
                                }
                                else {
                                    tMissing.push([message.name, i18n_1["default"].MESSAGES[message.name]]);
                                }
                            });
                        }
                    });
                })()));
            }
            var tMessages = "", tNumLoading = 0;
            Object.keys(i18n_1["default"].MESSAGES).forEach(function (key) {
                tMessages += (tNumLoading > 0 ? "|" : "") + key;
                tNumLoading++;
                if (tNumLoading >= 50) {
                    tLangLoadAjaxPromises.push(tRCM_loadLangMessage(tMessages));
                    tMessages = "";
                    tNumLoading = 0;
                }
            }, _this);
            if (tMessages != "") {
                tLangLoadAjaxPromises.push(tRCM_loadLangMessage(tMessages));
            }
            $.when.apply($, tLangLoadAjaxPromises).done(function (pData) {
                resolve();
                if (tMissing.length > 0) {
                    console.log("[RCM] missing messages: ", tMissing);
                }
            })
                .fail(function (pData) {
                if (_this.numLangLoadErrors < 15) {
                    _this.numLangLoadErrors++;
                    _this._loadLangMessages().then(resolve)["catch"](reject); 
                }
                else {
                    mw.log("ERROR: " + JSON.stringify(pData));
                    alert("ERROR: RecentChanges text not loaded properly (" + _this.numLangLoadErrors + " tries); defaulting to English.");
                    resolve();
                }
            });
        });
    };
    Main.prototype.blinkWindowTitle = function (pTitle) {
        var _this = this;
        this.cancelBlinkWindowTitle();
        this._originalTitle = document.title;
        this._blinkInterval = window.setInterval(function () {
            document.title = document.title == _this._originalTitle ? (pTitle + " - " + _this._originalTitle) : _this._originalTitle;
        }, 1000);
    };
    Main.prototype.cancelBlinkWindowTitle = function () {
        if (!this._blinkInterval) {
            return;
        }
        clearInterval(this._blinkInterval);
        this._blinkInterval = null;
        document.title = this._originalTitle;
    };
    Main.prototype.addNotification = function (pTitle, pOptions) {
        if (Notification.permission !== "granted") {
            return;
        }
        pOptions = pOptions || {};
        pOptions.icon = pOptions.icon || Global_1["default"].NOTIFICATION_ICON;
        var tNotification = new Notification(pTitle, pOptions);
        this._notifications.push(tNotification);
        tNotification.onclick = function () {
            parent.focus();
            window.focus(); 
            this.close();
        };
        tNotification = null;
        if (this._notifications.length > 1) {
            this._notifications.shift().close();
        }
    };
    Main.prototype.clearNotifications = function () {
        for (var i = 0; i < this._notifications.length; i++) {
            this._notifications[i].close();
        }
        this._notifications = [];
    };
    Main.prototype.importArticles = function (_a) {
        var type = _a.type, articles = _a.articles;
        if (Global_1["default"].isUcpWiki) {
            return window.importArticles({
                type: 'script',
                articles: articles
            });
        }
        else {
            return new Promise(function (resolve) {
                $.when.apply($, articles.map(function (name) { return $.getScript("/load.php?mode=articles&articles=" + name + "&only=scripts"); })).done(function () {
                    mw.hook('dev.i18n').add(function (i18n) {
                        resolve();
                    });
                });
            });
        }
    };
    return Main;
}());
exports["default"] = new Main();

},{"./Global":1,"./RCMManager":8,"./RCMModal":9,"./Utils":13,"./i18n":15,"./lib/makeCollapsible":17}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./types/RC_TYPE");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCData =  (function () {
    function RCData(pWikiInfo, pManager) {
        this.manager = pManager;
        this.wikiInfo = pWikiInfo;
    }
    RCData.prototype.dispose = function () {
        delete this.manager;
        delete this.wikiInfo;
        this.date = null;
        this.type = null;
    };
    RCData.prototype.init = function (pData) {
        if (!pData.title) {
            pData.title = "";
        } 
        this.date = new Date(pData.timestamp);
        this.userEdited = pData.user != "" && pData.anon != "";
        this.author = this.userEdited ? pData.user : (pData.anon ? pData.anon : pData.user);
        this.userhidden = pData.userhidden == "";
        this.title = Utils_1["default"].escapeCharacters(pData.title.split("/@comment")[0]);
        this.namespace = pData.ns;
        this.logtype = pData.logtype;
        this.logaction = pData.logaction;
        this.newlen = pData.newlen;
        this.oldlen = pData.oldlen;
        this.summary = RCData.formatParsedComment(pData.parsedcomment, pData.commenthidden == "", this.wikiInfo);
        this.unparsedComment = pData.comment;
        this.pageid = pData.pageid;
        this.revid = pData.revid;
        this.old_revid = pData.old_revid;
        this.isNewPage = pData["new"] == "";
        this.isBotEdit = pData.bot == "";
        this.isMinorEdit = pData.minor == "";
        this.isPatrolled = pData.patrolled == "";
        this.titleNoNS = (this.namespace != 0 && this.title.indexOf(":") > -1) ? this.title.split(/:(.+)/)[1] : this.title; 
        this.uniqueID = this.title; 
        this.hrefTitle = Utils_1["default"].escapeCharactersLink(pData.title);
        this.href = this.wikiInfo.articlepath + this.hrefTitle;
        this.hrefBasic = this.href.split("/@comment")[0];
        this.hrefFS = this.href + this.wikiInfo.firstSeperator;
        if (this.type == RC_TYPE_1["default"].LOG || (this.logtype && this.logtype != "0")) { 
        }
        else if (pData.title.indexOf("/@comment") > -1) { 
            this.isSubComment = pData.title.indexOf("/@comment") != pData.title.lastIndexOf("/@comment"); 
            if ( this.namespace == 2001) {
                this.type = RC_TYPE_1["default"].BOARD;
            }
            else if ( this.namespace == 1201) {
                this.type = RC_TYPE_1["default"].WALL;
            }
            else {
                this.type = RC_TYPE_1["default"].COMMENT;
            }
            if (this.type == RC_TYPE_1["default"].BOARD || this.type == RC_TYPE_1["default"].WALL) {
                this.uniqueID = Utils_1["default"].escapeCharactersLink(pData.title.split("/@comment")[0] + "/@comment" + pData.title.split("/@comment")[1]); 
                if (this.isSubComment == false) {
                    var tTitleData = /&lt;ac_metadata title=&quot;(.*?)&quot;&gt;.*?&lt;\/ac_metadata&gt;/g.exec(this.summary);
                    if (tTitleData != null) {
                        this.threadTitle = tTitleData[1];
                        this.summary = this.summary.replace(tTitleData[0], "");
                    }
                }
                this.isWallBoardAction = this.logtype == "0";
                if (this.isWallBoardAction == false && this.isNewPage == false && this.summary == "") {
                    this.summary = this.type == RC_TYPE_1["default"].BOARD ? i18n_1["default"]("forum-recentchanges-edit") : i18n_1["default"]("wall-recentchanges-edit");
                }
            }
        }
        else { 
            this.type = RC_TYPE_1["default"].NORMAL;
        }
        return this; 
    };
    RCData.prototype.time = function () {
        return Utils_1["default"].formatWikiTimeStampTimeOnly(this.date, true);
    };
    RCData.prototype.userDetails = function () {
        return RCData.formatUserDetails(this.wikiInfo, this.author, this.userhidden, this.userEdited);
    };
    RCData.formatUserDetails = function (pWikiInfo, pAuthor, pUserHidden, pUserEdited) {
        if (pUserHidden) {
            return '<span class="history-deleted">' + i18n_1["default"]("rev-deleted-user") + '</span>';
        }
        var blockText = pWikiInfo.user.rights.block ? i18n_1["default"]("pipe-separator") + "<a href='{0}Special:Block/{1}'>" + i18n_1["default"]("blocklink") + "</a>" : "";
        if (pUserEdited) {
            return Utils_1["default"].formatString("<span class='mw-usertoollinks'><a href='{0}User:{1}' class='" + pWikiInfo.getUserClass(pAuthor) + "' " + pWikiInfo.getUserClassDataset(pAuthor) + ">{2}</a> (<a href='{0}User_talk:{1}'>" + i18n_1["default"]("talkpagelinktext") + "</a>" + i18n_1["default"]("pipe-separator") + "<a href='{0}Special:Contributions/{1}'>" + i18n_1["default"]("contribslink") + "</a>" + blockText + ")</span>", pWikiInfo.articlepath, Utils_1["default"].escapeCharactersLink(pAuthor), pAuthor);
        }
        else {
            return Utils_1["default"].formatString("<span class='mw-usertoollinks'><a class='rcm-useranon' href='{0}Special:Contributions/{1}'>{2}</a> (<a href='{0}User_talk:{1}'>" + i18n_1["default"]("talkpagelinktext") + "</a>" + blockText + ")</span>", pWikiInfo.articlepath, Utils_1["default"].escapeCharactersLink(pAuthor), pAuthor);
        }
    };
    RCData.prototype.getThreadTitle = function () {
        return this.threadTitle ? this.threadTitle : "<i>" + i18n_1["default"]('unknownthreadname') + "</i>";
    };
    RCData.prototype.getSummary = function () {
        return RCData.formatSummary(this.summary);
    };
    RCData.formatSummary = function (pSummary) {
        if (pSummary == "" || pSummary == undefined) {
            return "";
        }
        else {
            return " <span class=\"comment\" dir=\"auto\">(" + pSummary + ")</span>";
        }
    };
    RCData.formatParsedComment = function (pParsedComment, pDeleted, pWikiInfo) {
        if (!pDeleted) {
            pParsedComment = pParsedComment.replace(/<a href="\//g, "<a href=\"" + pWikiInfo.server + "/"); 
        }
        else {
            pParsedComment = "<span class=\"history-deleted\">" + i18n_1["default"]("rev-deleted-comment") + "</span>";
        }
        if (pParsedComment == "" || pParsedComment == undefined) {
        }
        else {
            pParsedComment = pParsedComment.trim();
            pParsedComment = pParsedComment.replace(/(\r\n|\n|\r)/gm, " ");
        }
        return pParsedComment;
    };
    RCData.prototype.wallBoardActionMessageWithSummary = function (pThreadTitle) {
        var tThreadTitle = pThreadTitle || this.getThreadTitle(); 
        var tLocalizedActionMessage;
        var tPrefix = this.type == RC_TYPE_1["default"].BOARD ? "forum-recentchanges" : "wall-recentchanges";
        var tMsgType = this.isSubComment ? "reply" : "thread";
        switch (this.logaction) {
            case "wall_remove":
                tLocalizedActionMessage = tPrefix + "-removed-" + tMsgType;
                break;
            case "wall_admindelete":
                tLocalizedActionMessage = tPrefix + "-deleted-" + tMsgType;
                break;
            case "wall_restore":
                tLocalizedActionMessage = tPrefix + "-restored-" + tMsgType;
                break;
            case "wall_archive":
                tLocalizedActionMessage = tPrefix + "-closed-thread";
                break;
            case "wall_reopen":
                tLocalizedActionMessage = tPrefix + "-reopened-thread";
                break;
        }
        if (tLocalizedActionMessage) {
            return " " + i18n_1["default"](tLocalizedActionMessage, this.href, tThreadTitle, this.getBoardWallParentLink(), this.titleNoNS) + this.getSummary();
        }
        else {
            return this.getSummary(); 
        }
    };
    RCData.prototype.getBoardWallParentTitleWithNamespace = function () {
        if (this.type == RC_TYPE_1["default"].BOARD) {
            return "Board:" + this.titleNoNS;
        }
        else if (this.type == RC_TYPE_1["default"].WALL) {
            return "Message_Wall:" + this.titleNoNS;
        }
        else {
            mw.log("This should not happen in getBoardWallParent()");
            return this.title;
        }
    };
    RCData.prototype.getBoardWallParentLink = function () {
        return this.wikiInfo.articlepath + this.getBoardWallParentTitleWithNamespace();
    };
    RCData.prototype.getNotificationTitle = function () {
        return this.title;
    };
    RCData.prototype.pageTitleTextLink = function () {
        if (this.type == RC_TYPE_1["default"].COMMENT) {
            var tNameSpaceText = this.namespace == 1 ? "" : this.wikiInfo.namespaces[String(this.namespace - 1)]["*"] + ":";
            return i18n_1["default"]("rc-comment", "[" + this.href + " " + (tNameSpaceText + this.titleNoNS) + "]");
        }
        else {
            return "<a class='rc-pagetitle' href='" + this.href + "'>" + this.title + "</a>";
        }
    };
    RCData.prototype.wallBoardTitleText = function (pThreadTitle) {
        if (pThreadTitle == undefined) {
            pThreadTitle = this.getThreadTitle();
        }
        if (this.type == RC_TYPE_1["default"].WALL) {
            return i18n_1["default"]("wall-recentchanges-thread-group", "<a href='" + this.href + "'>" + pThreadTitle + "</a>", this.getBoardWallParentLink(), this.titleNoNS);
        }
        else {
            return i18n_1["default"]("forum-recentchanges-thread-group", "<a href='" + this.href + "'>" + pThreadTitle + "</a>", this.getBoardWallParentLink(), this.titleNoNS);
        }
    };
    RCData.prototype.getNSClass = function () {
        return "rc-entry-ns-" + this.namespace;
    };
    RCData.prototype.wallBoardHistoryLink = function () {
        var tLink = "", tText;
        if (this.type == RC_TYPE_1["default"].WALL) {
            tLink = this.wikiInfo.articlepath + Utils_1["default"].escapeCharactersLink(this.getBoardWallParentTitleWithNamespace()) + this.wikiInfo.firstSeperator + "action=history";
            tText = this.isSubComment ? "wall-recentchanges-thread-history-link" : "wall-recentchanges-history-link";
        }
        else {
            tLink = this.wikiInfo.articlepath + Utils_1["default"].escapeCharactersLink(this.getBoardWallParentTitleWithNamespace()) + this.wikiInfo.firstSeperator + "action=history";
            tText = this.isSubComment ? "forum-recentchanges-thread-history-link" : "forum-recentchanges-history-link";
        }
        return "(<a href='" + tLink + "'>" + i18n_1["default"](tText) + "</a>)";
    };
    RCData.getFullTimeStamp = function (pDate) {
        return Utils_1["default"].formatWikiTimeStamp(pDate);
    };
    RCData.prototype.shouldBeRemoved = function (pDate) {
        return this.date.getSeconds() < pDate.getSeconds() - (this.wikiInfo.rcParams.days * 86400) 
            || this.type != RC_TYPE_1["default"].DISCUSSION && this.wikiInfo.resultsCount > this.wikiInfo.rcParams.limit
            || this.type == RC_TYPE_1["default"].DISCUSSION && this.wikiInfo.discussionsCount > Math.min(this.wikiInfo.rcParams.limit, 50);
    };
    return RCData;
}());
exports["default"] = RCData;

},{"./Utils":13,"./i18n":15,"./types/RC_TYPE":19}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var RCData_1 = require("./RCData");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./types/RC_TYPE");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCDataFandomDiscussion =  (function (_super) {
    __extends(RCDataFandomDiscussion, _super);
    function RCDataFandomDiscussion(pWikiInfo, pManager) {
        return _super.call(this, pWikiInfo, pManager) || this;
    }
 RCDataFandomDiscussion.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
 RCDataFandomDiscussion.prototype.init = function (pData) {
        this.type = RC_TYPE_1["default"].DISCUSSION;
        this.containerType = "FORUM";
        var embeddedThread = null;
        try {
            embeddedThread = pData._embedded.thread[0];
            this.containerType = embeddedThread.containerType || "FORUM";
        }
        catch (e) { }
        this.date = new Date(0); 
        this.date.setUTCSeconds((pData.modificationDate || pData.creationDate).epochSecond);
        this.userEdited = true;
        this.author = pData.createdBy.name;
        if (!this.author && pData.creatorIp) {
            this.author = pData.creatorIp.replace("/", "");
            this.userEdited = false;
        }
        this.userhidden = false; 
        this.title = pData.title; 
        this.namespace = -5234; 
        this.summary = pData.rawContent;
        if (this.containerType == "ARTICLE_COMMENT" && !this.summary && pData.jsonModel) {
            var jsonModel = JSON.parse(pData.jsonModel).content;
            this.summary = !jsonModel || jsonModel.length === 0 ? "" : jsonModel.map(function (d) { return d.type == "paragraph" && d.content ? d.content.map(function (td) { return td.text || ""; }) : ""; }).join(" ").replace(/  /, " ");
        }
        if (this.summary.length > 175) {
            this.summary = "\"" + this.summary + "\""; 
            this.summary = this.summary.slice(0, 175) + "...";
        }
        this.unparsedComment = this.summary;
        this.forumId = pData.forumId;
        this.threadId = pData.threadId;
        this.pageid = pData.id; 
        this.isNewPage = pData.modificationDate == null; 
        this.isBotEdit = false; 
        this.isMinorEdit = false; 
        this.isPatrolled = false; 
        this.titleNoNS = this.title; 
        this.uniqueID = pData.threadId; 
        this.hrefTitle = Utils_1["default"].escapeCharactersLink(pData.title);
        this.isReply = pData.isReply;
        this.threadHref = this.wikiInfo.scriptpath + "/d/p/" + this.threadId;
        this.href = this.threadHref + (pData.isReply ? "/r/" + pData.id : "");
        this.hrefBasic = this.href;
        this.hrefFS = this.href + this.wikiInfo.firstSeperator;
        this.threadTitle = embeddedThread ? (embeddedThread.title || pData.title) : pData.title;
        this.user_id = pData.createdBy.id;
        this.user_avatarUrl = pData.createdBy.avatarUrl ? pData.createdBy.avatarUrl + "/scale-to-width-down/15" : pData.createdBy.avatarUrl;
        this.upvoteCount = pData.upvoteCount;
        this.forumName = pData.forumName;
        this.rawContent = pData.rawContent;
        this.isLocked = pData.isLocked;
        this.isReported = pData.isReported;
        if (this.containerType == "WALL") {
            if (this.forumName)
                this.forumPage = this.forumName.replace(" Message Wall", ""); 
            if (RCDataFandomDiscussion.users[pData.forumId]) {
                this.forumPage = RCDataFandomDiscussion.users[pData.forumId].name;
            }
        }
        else if (this.containerType == "ARTICLE_COMMENT" && this.forumName == "Root Forum") {
            this.forumName = null;
        }
        return null; 
    };
 RCDataFandomDiscussion.prototype.userDetails = function () {
        if (this.userhidden) {
            return '<span class="history-deleted">' + i18n_1["default"]("rev-deleted-user") + '</span>';
        }
        var articlepath = this.wikiInfo.articlepath, author = Utils_1["default"].escapeCharactersLink(this.author), authorNotUrlSafe = this.author;
        var toolLinks = [
            "<a href='" + articlepath + "User_talk:" + author + "'>" + i18n_1["default"]("talkpagelinktext") + "</a>",
        ];
        if (this.userEdited) {
            var tUserContribsLink = this.containerType === "FORUM" ? this.wikiInfo.scriptpath + "/d/u/" + this.user_id : this.wikiInfo.articlepath + "Special:Contributions/" + this.author;
            toolLinks.push("<a href='" + tUserContribsLink + "'>" + i18n_1["default"]("contribslink") + "</a>");
        }
        if (this.wikiInfo.user.rights.block) {
            toolLinks.push("<a href='" + articlepath + "Special:Block/" + author + "'>" + i18n_1["default"]("blocklink") + "</a>");
        }
        return [
            "<span class='mw-usertoollinks'>",
            this.getCreatorAvatarImg(),
            "<a href='" + articlepath + (this.userEdited ? "User:" : "Special:Contributions/") + author + "' class='" + this.wikiInfo.getUserClass(this.author) + "' " + this.wikiInfo.getUserClassDataset(this.author) + ">" + authorNotUrlSafe + "</a>",
            " (" + toolLinks.join(i18n_1["default"]("pipe-separator")) + ")",
            "</span>",
        ].join("");
    };
    RCDataFandomDiscussion.prototype.getCreatorAvatarImg = function () {
        return this.makeAvatarImg(this.author, this.user_avatarUrl);
    };
    RCDataFandomDiscussion.prototype.makeAvatarImg = function (pAuthor, pAvatarUrl) {
        return pAvatarUrl
            ? "<span class=\"rcm-avatar\"><a href=\"" + this.wikiInfo.articlepath + "User:" + Utils_1["default"].escapeCharactersLink(pAuthor || "") + "\"><img src='" + pAvatarUrl + "' width=\"15\" height=\"15\" /></a> </span>"
            : "";
    };
    RCDataFandomDiscussion.prototype.discussionTitleText = function (pThreadTitle, pIsHead) {
        if (pIsHead === void 0) { pIsHead = false; }
        switch (this.containerType) {
            case "FORUM": {
                if (pThreadTitle == undefined) {
                    pThreadTitle = this.getThreadTitle();
                }
                var tForumLink = "<a href=\"" + this.wikiInfo.scriptpath + "/d/f?catId=" + this.forumId + "&sort=latest\">" + this.forumName + "</a>";
                var tText = i18n_1["default"].MESSAGES["wall-recentchanges-thread-group"].replace(/(\[\[.*\]\])/g, "$2"); 
                return i18n_1["default"].wiki2html(tText, "<a href=\"" + (pIsHead ? this.threadHref : this.href) + "\">" + pThreadTitle + "</a>" + (pIsHead ? "" : this.getUpvoteCount()), tForumLink);
            }
            case "WALL": {
                if (pThreadTitle == undefined) {
                    pThreadTitle = this.getThreadTitle();
                }
                var tThreadUrl = !this.forumPage ? (pIsHead ? this.threadHref : this.href) : this.wikiInfo.articlepath + "Message_Wall:" + this.forumPage + "?threadId=" + this.threadId;
                var tForumUrl = !this.forumPage ? "#" : this.wikiInfo.articlepath + "Message_Wall:" + this.forumPage;
                var tText = i18n_1["default"].MESSAGES["wall-recentchanges-thread-group"].replace(/(\[\[.*\]\])/g, "$2"); 
                return i18n_1["default"].wiki2html(tText, "<a href=\"" + tThreadUrl + "\">" + pThreadTitle + "</a>", "<a href=\"" + tForumUrl + "\">" + this.forumName + "</a>");
            }
            case "ARTICLE_COMMENT": {
                return i18n_1["default"](pIsHead ? "rc-comments" : "rc-comment", this.getCommentForumNameLink());
            }
        }
        mw.log("(discussionTitleText) Unknown containerType:", this.containerType);
    };
    RCDataFandomDiscussion.prototype.getCommentForumNameLink = function () {
        var _this = this;
        if (this.forumName) {
            return "[" + this.href + " " + this.forumName + "]";
        }
        var tSetDataAfterLoad = function (title, relativeUrl) {
            _this.forumName = title;
            _this.threadHref = _this.wikiInfo.server + relativeUrl + ("?commentId=" + _this.threadId);
            if (_this.isReply) {
                _this.threadHref += "&replyId=" + _this.pageid;
            }
            _this.href = _this.threadHref;
        };
        if (this.wikiInfo.discCommentPageNames.has(this.forumId)) {
            var _a = this.wikiInfo.discCommentPageNames.get(this.forumId), title = _a.title, relativeUrl = _a.relativeUrl;
            tSetDataAfterLoad(title, relativeUrl);
            return "[" + this.href + " " + this.forumName + "]";
        }
        var uniqID = Utils_1["default"].uniqID();
        this.wikiInfo.discCommentPageNamesNeeded.push({ pageID: this.forumId, uniqID: uniqID, cb: function (_a) {
                var title = _a.title, relativeUrl = _a.relativeUrl;
                if (!_this || !_this.date) {
                    return;
                }
                tSetDataAfterLoad(title, relativeUrl);
                $(".rcm" + uniqID + " a").attr("href", _this.href).text(_this.forumName);
            } });
        if (this.wikiInfo.discCommentPageNamesNeeded.length === 1) {
            this.manager.secondaryWikiData.push({
                url: function () {
                    var ids = _this.wikiInfo.discCommentPageNamesNeeded.map(function (o) { return o.pageID; }).filter(function (o, i, a) { return a.indexOf(o) == i; }).join(",");
                    var url = _this.wikiInfo.scriptpath + "/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=" + ids + "&format=json";
                    Utils_1["default"].logUrl("(getCommentForumNameLink)", url);
                    return url;
                },
                dataType: "json",
                skipRefreshSanity: true,
                callback: function (data) {
                    _this.wikiInfo.discCommentPageNamesNeeded.forEach(function (o) {
                        if (data.articleNames[Number(o.pageID)]) {
                            o.cb(data.articleNames[Number(o.pageID)]);
                            _this.wikiInfo.discCommentPageNames.set(o.pageID, data.articleNames[Number(o.pageID)]);
                        }
                    });
                    _this.wikiInfo.discCommentPageNamesNeeded = [];
                }
            });
        }
        return "<span class=\"rcm" + uniqID + "\">[[#|" + this.forumName + "]]</span>";
    };
    RCDataFandomDiscussion.prototype.getUpvoteCount = function () {
        if (this.containerType != "FORUM") {
            return "";
        }
        return "<span class=\"rcm-upvotes\"> (" + Global_1["default"].getSymbol("rcm-upvote-tiny") + " " + this.upvoteCount + ")</span>";
    };
    RCDataFandomDiscussion.prototype.getThreadStatusIcons = function () {
        return ""
            + (this.isLocked ? Global_1["default"].getSymbol("rcm-lock") : "")
            + (this.isReported ? Global_1["default"].getSymbol("rcm-report") : "");
    };
    RCDataFandomDiscussion.prototype.handleSecondaryLoad = function (pElemID) {
    };
    RCDataFandomDiscussion.users = {};
    return RCDataFandomDiscussion;
}(RCData_1["default"]));
exports["default"] = RCDataFandomDiscussion;

},{"./Global":1,"./RCData":4,"./Utils":13,"./i18n":15,"./types/RC_TYPE":19}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RCData_1 = require("./RCData");
var RC_TYPE_1 = require("./types/RC_TYPE");
var RCDataLog =  (function (_super) {
    __extends(RCDataLog, _super);
    function RCDataLog(pWikiInfo, pManager) {
        return _super.call(this, pWikiInfo, pManager) || this;
    }
 RCDataLog.prototype.dispose = function () {
        delete this.manager;
        delete this.wikiInfo;
        this.date = null;
        this.type = null;
    };
    RCDataLog.prototype.initLog = function (pData, pLogDataArray) {
        this.type = RC_TYPE_1["default"].LOG;
        _super.prototype.init.call(this, pData);
        this.log_info_0 = pData["0"];
        this.actionhidden = pData.actionhidden == "";
        this._initLog(pData, pLogDataArray);
        return this; 
    };
    RCDataLog.prototype._initLog = function (pRCData, pLogDataArray) {
        if (this.actionhidden) {
            return;
        }
        var tLogParams = null;
        if (this.wikiInfo.useOutdatedLogSystem) {
            if (pLogDataArray == undefined) {
                return;
            }
            var i = -1;
            for (var x = 0; x < pLogDataArray.length; x++) {
                if (pRCData.logid == pLogDataArray[x].logid) { 
                    i = x;
                    break;
                }
            }
            if (i == -1) {
                return;
            }
            tLogParams = pLogDataArray[i];
        }
        else {
            tLogParams = pRCData.logparams;
        }
        switch (this.logtype) {
            case "move": {
                this.log_move_newTitle = "";
                var is_log_move_noredirect = false;
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (tLogParams) {
                        this.log_move_newTitle = Utils_1["default"].escapeCharacters(tLogParams.target_title);
                        is_log_move_noredirect = tLogParams.suppressredirect == "";
                    }
                }
                else {
                    tLogParams = tLogParams.move;
                    if (tLogParams) {
                        this.log_move_newTitle = Utils_1["default"].escapeCharacters(tLogParams.new_title);
                        is_log_move_noredirect = tLogParams.suppressedredirect == "";
                    }
                }
                this.log_move_noredirect = is_log_move_noredirect ? "-noredirect" : "";
                break;
            }
            case "rights": {
                this.log_rights_oldgroups = "?";
                this.log_rights_newgroups = "?";
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (tLogParams) {
                        this.log_rights_oldgroups = tLogParams.oldgroups.length == 0 ? i18n_1["default"]("rightsnone") : tLogParams.oldgroups.join(", ");
                        this.log_rights_newgroups = tLogParams.newgroups.length == 0 ? i18n_1["default"]("rightsnone") : tLogParams.newgroups.join(", ");
                    }
                }
                else {
                    tLogParams = tLogParams.rights;
                    if (tLogParams) {
                        this.log_rights_oldgroups = tLogParams.old == "" ? i18n_1["default"]("rightsnone") : tLogParams.old;
                        this.log_rights_newgroups = tLogParams["new"] == "" ? i18n_1["default"]("rightsnone") : tLogParams["new"];
                    }
                }
                break;
            }
            case "block": {
                this.log_block_duration = "?";
                var log_block_flags_arr = [];
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (tLogParams) {
                        this.log_block_duration = tLogParams.duration;
                        log_block_flags_arr = tLogParams.flags || [];
                    }
                }
                else {
                    tLogParams = tLogParams.block;
                    if (tLogParams) {
                        this.log_block_duration = tLogParams.duration;
                        log_block_flags_arr = tLogParams.flags.split(",");
                    }
                }
                for (var i = 0; i < log_block_flags_arr.length; i++) {
                    if (i18n_1["default"].exists("block-log-flags-" + log_block_flags_arr[i])) {
                        log_block_flags_arr[i] = i18n_1["default"](("block-log-flags-" + log_block_flags_arr[i]));
                    }
                }
                this.log_block_flags = "(" + log_block_flags_arr.join(", ") + ")";
                log_block_flags_arr = null;
                break;
            }
            case "delete": {
                this.log_delete_revisions_num = 1;
                var log_delete_new_bitmask_id = "?";
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (tLogParams) {
                        this.log_delete_revisions_num = (tLogParams.ids || [1]).length;
                        log_delete_new_bitmask_id = (tLogParams["new"] || {}).bitmask;
                    }
                }
                else {
                    if (this.log_info_0) {
                        log_delete_new_bitmask_id = parseInt((this.log_info_0.split("\n")[3] || "=1").split("=")[1]);
                    }
                }
                switch (log_delete_new_bitmask_id) {
                    case 1: {
                        this.log_delete_new_bitmask = i18n_1["default"]("revdelete-content-hid");
                        break;
                    }
                    case 2: {
                        this.log_delete_new_bitmask = i18n_1["default"]("revdelete-summary-hid"); 
                        break;
                    }
                    case 3: {
                        this.log_delete_new_bitmask = i18n_1["default"]("revdelete-content-hid") + i18n_1["default"]("and") + " " + i18n_1["default"]("revdelete-summary-hid");
                        break;
                    }
                }
                break;
            }
            case "merge": {
                this.log_merge_destination = "";
                this.log_merge_mergepoint = "0";
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (tLogParams) {
                        this.log_merge_destination = Utils_1["default"].escapeCharacters(tLogParams.dest_title);
                        this.log_merge_mergepoint = tLogParams.mergepoint;
                    }
                }
                else {
                    if (this.log_info_0 && pRCData["1"]) {
                        this.log_merge_destination = Utils_1["default"].escapeCharacters(this.log_info_0);
                        this.log_merge_mergepoint = Utils_1["default"].getTimestampForYYYYMMDDhhmmSS(pRCData["1"]);
                    }
                }
                break;
            }
            case "protect": {
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (!this.log_info_0 && tLogParams) {
                        this.log_info_0 = tLogParams.description;
                    }
                }
                break;
            }
            case "chatban": {
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (!this.log_info_0 && tLogParams) {
                        this.log_info_0 = [tLogParams["0"], tLogParams["1"], tLogParams["2"], tLogParams["3"], tLogParams["4"]].join("\n");
                    }
                }
                break;
            }
        }
        tLogParams = null;
    };
    RCDataLog.prototype.logTitleLink = function () {
        return "(<a class='rc-log-link' href='" + this.wikiInfo.articlepath + "Special:Log/" + this.logtype + "'>" + this.logTitle() + "</a>)";
    };
    RCDataLog.prototype.logTitle = function () {
        switch (this.logtype) {
            case "abusefilter": return i18n_1["default"]("abusefilter-log");
            case "block": return i18n_1["default"]("blocklogpage");
            case "chatban": return i18n_1["default"]("chat-chatban-log");
            case "delete": return i18n_1["default"]("dellogpage");
            case "import": return i18n_1["default"]("importlogpage");
            case "merge": return i18n_1["default"]("mergelog");
            case "move": return i18n_1["default"]("movelogpage");
            case "protect": return i18n_1["default"]("protectlogpage");
            case "upload": return i18n_1["default"]("uploadlogpage");
            case "useravatar": return i18n_1["default"]("useravatar-log");
            case "newusers": return i18n_1["default"]("newuserlogpage");
            case "renameuser": return i18n_1["default"]("userrenametool-logpage");
            case "rights": return i18n_1["default"]("rightslog");
            case "wikifeatures": return i18n_1["default"]("wikifeatures-log-name");
            default: return this.logtype; 
        }
    };
    RCDataLog.prototype.logActionText = function () {
        var tLogMessage = "";
        if (this.actionhidden) {
            tLogMessage = "<span class=\"history-deleted\">" + i18n_1["default"]("rev-deleted-event") + "</span>";
            tLogMessage += this.getSummary();
        }
        switch (this.logtype) {
            case "block": {
                tLogMessage += this.userDetails() + " ";
                switch (this.logaction) {
                    case "block": {
                        tLogMessage += i18n_1["default"]("blocklogentry", this.href + "|" + this.titleNoNS, this.log_block_duration, this.log_block_flags);
                        break;
                    }
                    case "reblock": {
                        tLogMessage += i18n_1["default"]("reblock-logentry", this.href + "|" + this.titleNoNS, this.log_block_duration, this.log_block_flags);
                        break;
                    }
                    case "unblock": {
                        tLogMessage += i18n_1["default"]("unblocklogentry", this.titleNoNS);
                        break;
                    }
                }
                break;
            }
            case "delete": {
                tLogMessage += i18n_1["default"](("logentry-delete-" + this.logaction), this.userDetails(), undefined, 
                "<a href='" + this.href + "'>" + this.title + "</a>", this.log_delete_new_bitmask, this.log_delete_revisions_num);
                break;
            }
            case "import": {
                tLogMessage += this.userDetails() + " ";
                switch (this.logaction) {
                    case "upload": {
                        tLogMessage += i18n_1["default"]("import-logentry-upload", this.href + "|" + this.title);
                        break;
                    }
                    case "interwiki": {
                        tLogMessage += i18n_1["default"]("import-logentry-interwiki", this.title);
                        break;
                    }
                }
                break;
            }
            case "merge": {
                tLogMessage += this.userDetails() + " ";
                tLogMessage += i18n_1["default"]("import-logentry-upload", this.href + "|" + this.title, this.wikiInfo.articlepath + this.log_merge_destination + "|" + this.log_merge_destination, this.getLogTimeStamp(new Date(this.log_merge_mergepoint)));
                break;
            }
            case "move": {
                tLogMessage += i18n_1["default"](("logentry-move-" + this.logaction + (this.log_move_noredirect || "" )), this.userDetails(), undefined, 
                "<a href='" + this.hrefFS + "redirect=no'>" + this.title + "</a>", "<a href='" + (this.wikiInfo.articlepath + Utils_1["default"].escapeCharactersLink(this.log_move_newTitle)) + "'>" + this.log_move_newTitle + "</a>");
                break;
            }
            case "protect": {
                tLogMessage += this.userDetails() + " ";
                var t$1 = this.href + "|" + this.title;
                switch (this.logaction) {
                    case "protect": {
                        tLogMessage += i18n_1["default"]("protectedarticle", t$1) + " " + this.log_info_0;
                        break;
                    }
                    case "modify": {
                        tLogMessage += i18n_1["default"]("modifiedarticleprotection", t$1) + " " + this.log_info_0;
                        break;
                    }
                    case "unprotect": {
                        tLogMessage += i18n_1["default"]("unprotectedarticle", t$1);
                        break;
                    }
                    case "move_prot": {
                        tLogMessage += i18n_1["default"].wiki2html(i18n_1["default"].MESSAGES["movedarticleprotection"].replace("[[$2]]", this.log_info_0), t$1);
                        break;
                    }
                }
                break;
            }
            case "upload": {
                tLogMessage += this.userDetails() + " ";
                switch (this.logaction) {
                    case "upload": {
                        tLogMessage += i18n_1["default"]("uploadedimage", this.href + "|" + this.title);
                        break;
                    }
                    case "overwrite": {
                        tLogMessage += i18n_1["default"]("overwroteimage", this.href + "|" + this.title);
                        break;
                    }
                }
                break;
            }
            case "newusers": {
                tLogMessage += i18n_1["default"](("logentry-newusers-" + this.logaction), this.userDetails(), undefined, "");
                break;
            }
            case "rights": {
                tLogMessage += this.userDetails() + " ";
                switch (this.logaction) {
                    case "rights": {
                        tLogMessage += i18n_1["default"]("rightslogentry", "<a href='" + this.href + "'>" + this.title + "</a>", this.log_rights_oldgroups, this.log_rights_newgroups);
                        break;
                    }
                }
                break;
            }
            case "useravatar": {
                tLogMessage += this.userDetails() + " ";
                switch (this.logaction) {
                    case "avatar_chn": {
                        tLogMessage += i18n_1["default"]("blog-avatar-changed-log");
                        break;
                    } 
                    case "avatar_rem": {
                        tLogMessage += i18n_1["default"]("blog-avatar-removed-log", "<a href='" + this.href + "'>" + this.title + "</a>");
                        break;
                    } 
                }
                break;
            }
            case "renameuser": {
                tLogMessage += this.userDetails() + " renameuser"; 
                break;
            }
            case "wikifeatures": {
                tLogMessage += this.userDetails() + " wikifeatures"; 
                break;
            }
            case "chatban": {
                var tChatData = this.log_info_0.split("\n");
                var t$3 = undefined;
                if (tChatData[3]) {
                    t$3 = this.getLogTimeStamp(new Date(parseInt(tChatData[3]) * 1000));
                }
                tLogMessage += this.userDetails() + " ";
                tLogMessage += i18n_1["default"](("chat-" + this.logaction + "-log-entry"), "<a href='" + this.href + "'>" + this.titleNoNS + "</a>", tChatData[2], t$3);
                tChatData = null;
                break;
            }
        }
        if (tLogMessage == "") {
            tLogMessage += this.userDetails() + (" ??? (" + this.logtype + " - " + this.logaction + ") ");
        }
        tLogMessage += this.getSummary();
        if (this.wikiInfo.user.rights.undelete && this.logtype == "delete" && this.logaction == "delete") {
            tLogMessage += " (<a href='" + this.wikiInfo.articlepath + "Special:Undelete" + this.wikiInfo.firstSeperator + "target=" + this.hrefTitle + "'>" + i18n_1["default"]("undeletelink") + "</a>)";
        }
        return tLogMessage;
    };
 RCDataLog.prototype.getNotificationTitle = function () {
        return this.logTitle() + (this.title ? " - " + this.title : "");
    };
    RCDataLog.prototype.getLogTimeStamp = function (pDate) {
        return RCData_1["default"].getFullTimeStamp(pDate);
    };
    return RCDataLog;
}(RCData_1["default"]));
exports["default"] = RCDataLog;

},{"./RCData":4,"./Utils":13,"./i18n":15,"./types/RC_TYPE":19}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./types/RC_TYPE");
var Global_1 = require("./Global");
var GlobalModal_1 = require("./GlobalModal");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCList =  (function () {
    function RCList(pManager) {
        this.manager = pManager;
        this.list = [];
    }
    Object.defineProperty(RCList.prototype, "newest", {
        get: function () { return this.list[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "oldest", {
        get: function () { return this.list[this.list.length - 1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "date", {
        get: function () { return this.newest.date; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "wikiInfo", {
        get: function () { return this.newest.wikiInfo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "type", {
        get: function () { return this.newest.type; },
        enumerable: true,
        configurable: true
    });
    RCList.prototype.dispose = function () {
        delete this.manager;
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].dispose();
            this.list[i] = null;
        }
        this.list = null;
        this.htmlNode = null;
    };
    RCList.prototype.addRC = function (pNewRC) {
        this.list.push(pNewRC);
        this.list.sort(function (a, b) { return b.date.valueOf() - a.date.valueOf(); }); 
        return this; 
    };
    RCList.prototype.removeRC = function (pRC) {
        var tDataInListI = this.list.indexOf(pRC);
        if (tDataInListI > -1) {
            this.list.splice(tDataInListI, 1)[0].dispose();
        }
        else {
            mw.log("[RCList](removeRC) Data did not exist in list, and thus could not be removed.", pRC);
        }
    };
    RCList.prototype.shouldGroupWith = function (pRC) {
        if (this.wikiInfo.scriptpath == pRC.wikiInfo.scriptpath
            && this.type == pRC.type
            && Utils_1["default"].getMonth(this.date) == Utils_1["default"].getMonth(pRC.date)
            && Utils_1["default"].getDate(this.date) == Utils_1["default"].getDate(pRC.date)) {
            switch (this.type) {
                case RC_TYPE_1["default"].LOG: {
                    if (this.newest.logtype == pRC.logtype) {
                        return true;
                    }
                    break;
                }
                default: {
                    if (this.newest.uniqueID == pRC.uniqueID) {
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    };
    RCList.prototype.getLink = function (pRC, pDiff, pOldId) {
        return pRC.hrefFS + "curid=" + pRC.pageid + (pDiff || pDiff == 0 ? "&diff=" + pDiff : "") + (pOldId ? "&oldid=" + pOldId : "");
    };
    RCList.prototype.getDiffLink = function (pFromRC, pToRC) {
        return pFromRC.hrefFS + "curid=" + pFromRC.pageid + "&diff=" + (pToRC ? pToRC.revid : 0) + "&oldid=" + pFromRC.old_revid;
    };
    RCList.prototype._diffHist = function (pRC) {
        var diffLink = i18n_1["default"]('diff');
        if (pRC.isNewPage == false) {
            diffLink = "<a class='rc-diff-link' href='" + this.getDiffLink(pRC, pRC) + "'>" + diffLink + "</a>" + this.getAjaxDiffButton();
        }
        if (this.type == RC_TYPE_1["default"].NORMAL && pRC.namespace == 6) {
            diffLink += this.getAjaxImageButton();
        }
        return "(" + (diffLink + i18n_1["default"]("pipe-separator")) + "<a class='rc-hist-link' href='" + pRC.hrefFS + "action=history'>" + i18n_1["default"]('hist') + "</a>)";
    };
    RCList.prototype._diffSizeText = function (pToRC, pFromRC) {
        var tDiffSize = pToRC.newlen - (pFromRC ? pFromRC : pToRC).oldlen;
        var tDiffSizeText = mw.language.convertNumber(tDiffSize);
        var html = "<strong class='{0}'>{1}</strong>";
        if (tDiffSize > 0) {
            return Utils_1["default"].formatString(html, "mw-plusminus-pos", i18n_1["default"]('parentheses', "+" + tDiffSizeText));
        }
        else if (tDiffSize < 0) {
            return Utils_1["default"].formatString(html, "mw-plusminus-neg", i18n_1["default"]('parentheses', tDiffSizeText));
        }
        else {
            return Utils_1["default"].formatString(html, "mw-plusminus-null", i18n_1["default"]('parentheses', tDiffSizeText));
        }
    };
    RCList.prototype._contributorsCountText = function () {
        var _this = this;
        var contribs = {}, indx;
        this.list.forEach(function (rc) {
            if (contribs.hasOwnProperty(rc.author)) {
                contribs[rc.author].count++;
            }
            else {
                contribs[rc.author] = { count: 1, userEdited: rc.userEdited };
                contribs[rc.author].avatar = (rc.type == RC_TYPE_1["default"].DISCUSSION ? rc.getCreatorAvatarImg() : "");
            }
        });
        var returnText = "[", total = 0, tLength = this.list.length;
        Object.keys(contribs).forEach(function (key) {
            returnText += _this._userPageLink(key, contribs[key].userEdited, contribs[key].avatar) + (contribs[key].count > 1 ? " (" + contribs[key].count + "&times;)" : "");
            total += contribs[key].count;
            if (total < tLength) {
                returnText += "; ";
            }
        }, this);
        return returnText + "]";
    };
    RCList.prototype._changesText = function () {
        var returnText = i18n_1["default"]("nchanges", this.list.length);
        if (this.type == RC_TYPE_1["default"].NORMAL && this.oldest.isNewPage == false) {
            returnText = "<a class='rc-changes-link' href='" + this.getDiffLink(this.oldest, this.newest) + "'>" + returnText + "</a>" + this.getAjaxDiffButton();
        }
        if (this.type == RC_TYPE_1["default"].NORMAL && this.newest.namespace == 6) {
            returnText += this.getAjaxImageButton();
        }
        return returnText;
    };
    RCList.prototype._userPageLink = function (pUsername, pUserEdited, pAvatar) {
        if (pUserEdited) {
            return pAvatar + "<a href='" + this.wikiInfo.articlepath + "User:" + Utils_1["default"].escapeCharactersLink(pUsername) + "' class=\"" + this.wikiInfo.getUserClass(pUsername) + "\" " + this.wikiInfo.getUserClassDataset(pUsername) + ">" + pUsername + "</a>";
        }
        else {
            return "<a class=\"rcm-useranon\" href='" + this.wikiInfo.articlepath + "Special:Contributions/" + Utils_1["default"].escapeCharactersLink(pUsername) + "'>" + pUsername + "</a>";
        }
    };
    RCList.prototype.getExistingThreadTitle = function () {
        var tTitle = null;
        this.list.some(function (rc) {
            if (rc.threadTitle) {
                tTitle = rc.threadTitle;
                return true;
            }
            return false;
        });
        return tTitle;
    };
    RCList.prototype.getThreadTitle = function () {
        var _this = this;
        var tTitle = this.getExistingThreadTitle();
        var tReturnText = tTitle;
        if (this.manager.extraLoadingEnabled) {
            var tElemID_1 = Utils_1["default"].uniqID();
            tReturnText = "<span id='" + tElemID_1 + "'><i>" + (tTitle ? tTitle : i18n_1["default"]('unknownthreadname')) + "</i></span>";
            if (this.type != RC_TYPE_1["default"].DISCUSSION) {
                this.manager.secondaryWikiData.push({
                    url: this.wikiInfo.scriptpath + "/api.php?action=query&format=json&prop=revisions&titles=" + this.newest.uniqueID + "&rvprop=content",
                    callback: function (data) {
                        var tSpan = document.querySelector("#" + tElemID_1);
                        if (!tSpan) {
                            return;
                        }
                        var tPage = Utils_1["default"].getFirstItemFromObject(data.query.pages);
                        tSpan.parentNode.href = _this.wikiInfo.articlepath + "Thread:" + tPage.pageid;
                        var tTitleData = /<ac_metadata title="(.*?)".*?>.*?<\/ac_metadata>/g.exec(tPage.revisions[0]["*"]);
                        if (tTitleData != null) {
                            tSpan.innerHTML = tTitleData[1];
                        }
                    }
                });
            }
            else {
                if (tTitle == null) {
                    this.newest.handleSecondaryLoad(tElemID_1);
                }
                else {
                    tReturnText = tTitle;
                }
            }
        }
        else {
            if (tReturnText == null) {
                tReturnText = "<i>" + i18n_1["default"]('unknownthreadname') + "</i>";
            }
        }
        return tReturnText;
    };
    RCList.prototype.getAjaxDiffButton = function () {
        return " <span class=\"rcm-ajaxIcon rcm-ajaxDiff\">" + Global_1["default"].getSymbol("rcm-columns") + "</span>";
    };
    RCList.prototype.getAjaxImageButton = function () {
        return " <span class=\"rcm-ajaxIcon rcm-ajaxImage\">" + Global_1["default"].getSymbol("rcm-picture") + "</span>";
    };
    RCList.prototype.getAjaxPagePreviewButton = function () {
        return " <span class=\"rcm-ajaxIcon rcm-ajaxPage\">" + Global_1["default"].getSymbol("rcm-preview") + "</span>";
    };
    RCList.prototype.addPreviewDiffListener = function (pElem, pFromRC, pToRC) {
        if (pElem) {
            if (pToRC == undefined) {
                pToRC = pFromRC;
            }
            var pageName = pFromRC.title;
            var pageID = pFromRC.pageid;
            var ajaxLink = this.wikiInfo.scriptpath + ("/api.php?action=query&format=json&prop=revisions|info&rvprop=size|user|parsedcomment|timestamp|flags&rvdiffto=" + pToRC.revid + "&revids=" + pFromRC.old_revid);
            var diffLink = pFromRC.hrefFS + "curid=" + pFromRC.pageid + "&diff=" + pToRC.revid + "&oldid=" + pFromRC.old_revid;
            var undoLink = pFromRC.hrefFS + "curid=" + pFromRC.pageid + "&undo=" + pToRC.revid + "&undoafter=" + pFromRC.old_revid + "&action=edit";
            var diffTableInfo = {
                wikiInfo: pFromRC.wikiInfo,
                hrefFS: pFromRC.hrefFS,
                newRev: { user: pToRC.userDetails(), summary: pToRC.getSummary(), date: pToRC.date, minor: pToRC.isMinorEdit },
            };
            this._addAjaxClickListener(pElem, function () { GlobalModal_1.previewDiff(pageName, pageID, ajaxLink, diffLink, undoLink, diffTableInfo); });
            pFromRC = null;
            pToRC = null;
        }
    };
    RCList.prototype.addPreviewImageListener = function (pElem, pImageRCs) {
        if (Object.prototype.toString.call(pImageRCs) !== '[object Array]') {
            pImageRCs = [pImageRCs];
        }
        pImageRCs = pImageRCs;
        if (pElem) {
            var tImageNames = [];
            for (var i = 0; i < pImageRCs.length; i++) {
                if (tImageNames.indexOf(pImageRCs[i].hrefTitle) < 0) {
                    tImageNames.push(pImageRCs[i].hrefTitle);
                }
            }
            var ajaxLink = this.wikiInfo.scriptpath + "/api.php?action=query&prop=imageinfo&format=json&redirects&iiprop=url|size";
            var articlepath = this.wikiInfo.articlepath;
            this._addAjaxClickListener(pElem, function () { GlobalModal_1.previewImages(ajaxLink, tImageNames, articlepath); });
            pImageRCs = null;
        }
    };
    RCList.prototype.addPreviewPageListener = function (pElem, pRC) {
        if (pElem) {
            var ajaxLink_1 = this.wikiInfo.scriptpath + ("/api.php?action=parse&format=json&pageid=" + pRC.pageid + "&prop=text|headhtml&disabletoc=true");
            var pageName = pRC.title;
            var pageHref_1 = pRC.href;
            if (pRC.type == RC_TYPE_1["default"].WALL || pRC.type == RC_TYPE_1["default"].BOARD || pRC.type == RC_TYPE_1["default"].COMMENT) {
                pageHref_1 = this.wikiInfo.articlepath + "Thread:" + pRC.pageid;
            }
            var serverLink_1 = this.wikiInfo.server;
            this._addAjaxClickListener(pElem, function () { GlobalModal_1.previewPage(ajaxLink_1, pageName, pageHref_1, serverLink_1); });
        }
    };
    RCList.prototype._addAjaxClickListener = function (pElem, pCallback) {
        var tRCM_AjaxIconClickHandler = function (e) {
            e.preventDefault();
            pCallback();
        };
        pElem.addEventListener("click", tRCM_AjaxIconClickHandler);
    };
    RCList.prototype._flag = function (pFlag, pRC, pEmpty) {
        var tI18nLetter, tI18nTooltip;
        switch (pFlag) {
            case "newpage": {
                if (pRC.isNewPage) {
                    tI18nLetter = "newpageletter";
                    tI18nTooltip = "recentchanges-label-newpage";
                }
                break;
            }
            case "minoredit": {
                if (pRC.isMinorEdit) {
                    tI18nLetter = "minoreditletter";
                    tI18nTooltip = "recentchanges-label-minor";
                }
                break;
            }
            case "botedit": {
                if (pRC.isBotEdit) {
                    tI18nLetter = "boteditletter";
                    tI18nTooltip = "recentchanges-label-bot";
                }
                break;
            }
        }
        if (!tI18nLetter) {
            return pEmpty;
        }
        else {
            return "<abbr class=\"" + pFlag + "\" title=\"" + i18n_1["default"](tI18nTooltip) + "\">" + i18n_1["default"](tI18nLetter) + "</abbr>";
        }
    };
    RCList.prototype._getFlags = function (pRC, pEmpty, pData) {
        pData = pData || {};
        return ""
            + this._flag("newpage", pRC, pEmpty)
            + (pData.ignoreminoredit ? pEmpty : this._flag("minoredit", pRC, pEmpty))
            + this._flag("botedit", pRC, pEmpty)
            + pEmpty 
        ;
    };
    RCList.prototype._showFavicon = function () {
        return this.manager.chosenWikis.length > 1;
    };
    RCList.prototype._getBackgroundClass = function () {
        return this._showFavicon() ? "rcm-tiled-favicon" : "";
    };
    RCList.prototype._toHTMLSingle = function (pRC) {
        if (this.list.length > 1) {
            return this._toHTMLBlock();
        }
        var html = "";
        switch (pRC.type) {
            case RC_TYPE_1["default"].LOG: {
                var tRC = pRC;
                html += tRC.logTitleLink();
                if (pRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += RCList.SEP;
                html += tRC.logActionText();
                break;
            }
            case RC_TYPE_1["default"].WALL:
            case RC_TYPE_1["default"].BOARD: {
                if (pRC.isWallBoardAction) {
                    html += RCList.SEP;
                    html += pRC.userDetails();
                    html += pRC.wallBoardActionMessageWithSummary(this.getThreadTitle());
                }
                else {
                    html += pRC.wallBoardTitleText(this.getThreadTitle());
                    html += this.getAjaxPagePreviewButton();
                    html += " " + this._diffHist(pRC);
                    html += RCList.SEP;
                    html += this._diffSizeText(pRC);
                    html += RCList.SEP;
                    html += pRC.userDetails();
                    html += pRC.getSummary();
                }
                break;
            }
            case RC_TYPE_1["default"].DISCUSSION: {
                var tRC = pRC;
                html += tRC.getThreadStatusIcons();
                html += tRC.discussionTitleText(tRC.containerType != "ARTICLE_COMMENT" ? this.getThreadTitle() : "unused");
                html += RCList.SEP;
                html += tRC.userDetails();
                html += tRC.getSummary();
                break;
            }
            case RC_TYPE_1["default"].COMMENT:
            case RC_TYPE_1["default"].NORMAL:
            default: {
                html += pRC.pageTitleTextLink();
                html += this.getAjaxPagePreviewButton();
                html += " " + this._diffHist(pRC);
                html += RCList.SEP;
                html += this._diffSizeText(pRC);
                html += RCList.SEP;
                html += pRC.userDetails();
                html += pRC.getSummary();
                break;
            }
        }
        var tTable = Utils_1["default"].newElement("table", { className: "mw-enhanced-rc " + pRC.wikiInfo.rcClass + " " + pRC.getNSClass() });
        Utils_1["default"].newElement("caption", { className: this._getBackgroundClass() }, tTable); 
        var tRow = Utils_1["default"].newElement("tr", {}, tTable);
        if (this._showFavicon()) {
            Utils_1["default"].newElement("td", { innerHTML: pRC.wikiInfo.getFaviconHTML(true) }, tRow);
        }
        Utils_1["default"].newElement("td", { className: "mw-enhanced-rc", innerHTML: ""
                + '<span class="rcm-arr none">&nbsp;</span>'
                + this._getFlags(pRC, "&nbsp;")
                + "&nbsp;"
                + pRC.time()
                + "&nbsp;"
        }, tRow);
        Utils_1["default"].newElement("td", { innerHTML: html }, tRow);
        this.addPreviewDiffListener(tTable.querySelector(".rcm-ajaxDiff"), pRC);
        this.addPreviewImageListener(tTable.querySelector(".rcm-ajaxImage"), pRC);
        this.addPreviewPageListener(tTable.querySelector(".rcm-ajaxPage"), pRC);
        if (this.manager.makeLinksAjax) {
            this.addPreviewDiffListener(tTable.querySelector(".rc-diff-link"), pRC);
            if (tTable.querySelector(".rcm-ajaxImage")) {
                this.addPreviewImageListener(tTable.querySelector(".rc-log-link"), pRC);
                this.addPreviewImageListener(tTable.querySelector(".rc-pagetitle"), pRC);
            }
        }
        return tTable;
    };
    RCList.prototype._toHTMLBlock = function () {
        if (this.list.length == 1) {
            return this._toHTMLSingle(this.newest);
        }
        var tBlockHead = this._toHTMLBlockHead();
        for (var i = 0; i < this.list.length; i++) {
            tBlockHead.querySelector("tbody").appendChild(this._toHTMLBlockLine(this.list[i]));
        }
        if ($(tBlockHead).makeCollapsibleRCM) {
            $(tBlockHead).makeCollapsibleRCM();
        }
        return tBlockHead;
    };
    RCList.prototype._toHTMLBlockHead = function () {
        var html = "";
        switch (this.type) {
            case RC_TYPE_1["default"].LOG: {
                html += this.newest.logTitleLink();
                if (this.newest.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                break;
            }
            case RC_TYPE_1["default"].NORMAL: {
                html += "<a class='rc-pagetitle' href='" + this.newest.href + "'>" + this.newest.title + "</a>";
                html += this.getAjaxPagePreviewButton();
                html += " (" + this._changesText() + i18n_1["default"]("pipe-separator") + "<a href='" + this.newest.hrefFS + "action=history'>" + i18n_1["default"]("hist") + "</a>)";
                html += RCList.SEP;
                html += this._diffSizeText(this.newest, this.oldest);
                break;
            }
            case RC_TYPE_1["default"].WALL: {
                html += this.newest.wallBoardTitleText(this.getThreadTitle());
                html += " (" + this._changesText() + ")";
                break;
            }
            case RC_TYPE_1["default"].BOARD: {
                html += this.newest.wallBoardTitleText(this.getThreadTitle());
                html += " (" + this._changesText() + ")";
                break;
            }
            case RC_TYPE_1["default"].DISCUSSION: {
                html += this.newest.discussionTitleText(this.getThreadTitle(), true);
                html += " (" + this._changesText() + ")";
                break;
            }
            case RC_TYPE_1["default"].COMMENT: {
                var tNameSpaceText = this.newest.namespace == 1 ? "" : this.wikiInfo.namespaces[String(this.newest.namespace - 1)]["*"] + ":";
                var tCommentUrl = this.wikiInfo.articlepath + Utils_1["default"].escapeCharactersLink(tNameSpaceText + this.newest.titleNoNS + "#WikiaArticleComments");
                html += i18n_1["default"]("rc-comments", "[" + tCommentUrl + " " + (tNameSpaceText + this.newest.titleNoNS) + "]");
                html += " (" + this._changesText() + ")";
                break;
            }
        }
        html += RCList.SEP;
        html += this._contributorsCountText();
        var tTable = Utils_1["default"].newElement("table", { className: "rcmmw-collapsible mw-enhanced-rc rcmmw-collapsed " + this.newest.wikiInfo.rcClass + " " + this.newest.getNSClass() }); 
        Utils_1["default"].newElement("caption", { className: this._getBackgroundClass() }, tTable); 
        var tTbody = Utils_1["default"].newElement("tbody", {}, tTable); 
        var tRow = Utils_1["default"].newElement("tr", {}, tTbody);
        if (this._showFavicon()) {
            Utils_1["default"].newElement("td", { innerHTML: this.newest.wikiInfo.getFaviconHTML(true) }, tRow);
        }
        var td1 = Utils_1["default"].newElement("td", {}, tRow);
        Utils_1["default"].newElement("span", { className: "rcmmw-collapsible-toggle", innerHTML: ''
                + '<span class="mw-rc-openarrow"><a title="' + i18n_1["default"]("rc-enhanced-expand") + '">' 
                + '<span class="rcm-arr" title="' + i18n_1["default"]("rc-enhanced-expand") + '">+</span>'
                + '</a></span>'
                + '<span class="mw-rc-closearrow"><a title="' + i18n_1["default"]("rc-enhanced-hide") + '">' 
                + '<span class="rcm-arr" title="' + i18n_1["default"]("rc-enhanced-hide") + '">-</span>'
                + '</a></span>' }, td1);
        Utils_1["default"].newElement("td", { className: "mw-enhanced-rc", innerHTML: ""
                + this._getFlags(this.oldest, "&nbsp;", { ignoreminoredit: true })
                + "&nbsp;"
                + this.newest.time()
                + "&nbsp;"
        }, tRow);
        Utils_1["default"].newElement("td", { innerHTML: html }, tRow);
        this.addPreviewDiffListener(tTable.querySelector(".rcm-ajaxDiff"), this.oldest, this.newest);
        this.addPreviewImageListener(tTable.querySelector(".rcm-ajaxImage"), this.list);
        this.addPreviewPageListener(tTable.querySelector(".rcm-ajaxPage"), this.newest);
        if (this.manager.makeLinksAjax) {
            this.addPreviewDiffListener(tTable.querySelector(".rc-diff-link, .rc-changes-link"), this.oldest, this.newest);
            if (tTable.querySelector(".rcm-ajaxImage")) {
                this.addPreviewImageListener(tTable.querySelector(".rc-log-link"), this.list);
                this.addPreviewImageListener(tTable.querySelector(".rc-pagetitle"), this.list);
            }
        }
        return tTable;
    };
    RCList.prototype._toHTMLBlockLine = function (pRC) {
        var html = "";
        switch (pRC.type) {
            case RC_TYPE_1["default"].LOG: {
                var tRC = pRC;
                html += "<span class='mw-enhanced-rc-time'>" + tRC.time() + "</span>";
                if (tRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += RCList.SEP;
                html += tRC.logActionText();
                break;
            }
            case RC_TYPE_1["default"].WALL:
            case RC_TYPE_1["default"].BOARD: {
                if (pRC.isWallBoardAction) {
                    html += "<span class='mw-enhanced-rc-time'>" + pRC.time() + "</span>";
                    html += RCList.SEP;
                    html += pRC.userDetails();
                    html += pRC.wallBoardActionMessageWithSummary(this.getThreadTitle());
                }
                else {
                    html += "<span class='mw-enhanced-rc-time'><a href='" + pRC.href + "' title='" + pRC.title + "'>" + pRC.time() + "</a></span>";
                    html += " (<a href='" + pRC.href + "'>" + i18n_1["default"]("cur") + "</a>";
                    html += this.getAjaxPagePreviewButton();
                    if (pRC.isNewPage == false) {
                        html += i18n_1["default"]("pipe-separator") + "<a href='" + this.getDiffLink(pRC, pRC) + "'>" + i18n_1["default"]("last") + "</a>" + this.getAjaxDiffButton();
                    }
                    html += ")";
                    html += RCList.SEP;
                    html += this._diffSizeText(pRC);
                    html += RCList.SEP;
                    html += pRC.userDetails();
                    html += pRC.getSummary();
                }
                break;
            }
            case RC_TYPE_1["default"].DISCUSSION: {
                var tRC = pRC;
                html += "<span class='mw-enhanced-rc-time'><a href='" + tRC.href + "' title='" + tRC.title + "'>" + tRC.time() + "</a></span>";
                html += tRC.getThreadStatusIcons();
                html += tRC.getUpvoteCount();
                html += RCList.SEP;
                html += pRC.userDetails();
                html += pRC.getSummary();
                break;
            }
            case RC_TYPE_1["default"].COMMENT:
            case RC_TYPE_1["default"].NORMAL: {
                html += "<span class='mw-enhanced-rc-time'><a href='" + this.getLink(pRC, null, pRC.revid) + "' title='" + pRC.title + "'>" + pRC.time() + "</a></span>";
                html += " (<a href='" + this.getLink(pRC, 0, pRC.revid) + "'>" + i18n_1["default"]("cur") + "</a>";
                if (pRC.type == RC_TYPE_1["default"].COMMENT) {
                    html += this.getAjaxPagePreviewButton();
                }
                if (pRC.isNewPage == false) {
                    html += i18n_1["default"]("pipe-separator") + "<a href='" + this.getLink(pRC, pRC.revid, pRC.old_revid) + "'>" + i18n_1["default"]("last") + "</a>" + this.getAjaxDiffButton();
                }
                html += ")";
                html += RCList.SEP;
                html += this._diffSizeText(pRC);
                html += RCList.SEP;
                html += pRC.userDetails();
                html += pRC.getSummary();
                break;
            }
        }
        var tRow = Utils_1["default"].newElement("tr", { style: "display: none;" });
        if (this._showFavicon()) {
            Utils_1["default"].newElement("td", {}, tRow);
        } 
        Utils_1["default"].newElement("td", {}, tRow); 
        Utils_1["default"].newElement("td", { className: "mw-enhanced-rc", innerHTML: ""
                + this._getFlags(pRC, "&nbsp;")
                + "&nbsp;"
        }, tRow);
        Utils_1["default"].newElement("td", { className: "mw-enhanced-rc-nested", innerHTML: html }, tRow);
        this.addPreviewDiffListener(tRow.querySelector(".rcm-ajaxDiff"), pRC);
        this.addPreviewImageListener(tRow.querySelector(".rcm-ajaxImage"), pRC);
        this.addPreviewPageListener(tRow.querySelector(".rcm-ajaxPage"), pRC);
        if (this.manager.makeLinksAjax) {
            this.addPreviewDiffListener(tRow.querySelector(".rc-diff-link"), pRC);
        }
        return tRow;
    };
    RCList.prototype._toHTMLNonEnhanced = function (pRC, pIndex) {
        var html = "";
        switch (pRC.type) {
            case RC_TYPE_1["default"].LOG: {
                var tRC = pRC;
                html += tRC.logTitleLink();
                if (tRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += i18n_1["default"]("semicolon-separator") + tRC.time();
                html += RCList.SEP;
                html += tRC.logActionText();
                break;
            }
            case RC_TYPE_1["default"].WALL:
            case RC_TYPE_1["default"].BOARD: {
                if (pRC.isWallBoardAction) {
                    html += pRC.wallBoardHistoryLink();
                    html += i18n_1["default"]("semicolon-separator") + pRC.time();
                    html += RCList.SEP;
                    html += pRC.userDetails();
                    html += pRC.wallBoardActionMessageWithSummary(this.getThreadTitle());
                }
                else {
                    html += this._diffHist(pRC);
                    html += RCList.SEP;
                    html += this._getFlags(pRC, "") + " ";
                    html += pRC.wallBoardTitleText(this.getThreadTitle());
                    html += this.getAjaxPagePreviewButton();
                    html += i18n_1["default"]("semicolon-separator") + pRC.time();
                    html += RCList.SEP;
                    html += this._diffSizeText(pRC);
                    html += RCList.SEP;
                    html += pRC.userDetails();
                    html += pRC.getSummary();
                }
                break;
            }
            case RC_TYPE_1["default"].DISCUSSION: {
                var tRC = pRC;
                html += tRC.getThreadStatusIcons();
                html += tRC.discussionTitleText(this.getThreadTitle());
                html += i18n_1["default"]("semicolon-separator") + pRC.time();
                html += RCList.SEP;
                html += tRC.userDetails();
                html += tRC.getSummary();
                break;
            }
            case RC_TYPE_1["default"].COMMENT:
            case RC_TYPE_1["default"].NORMAL:
            default: {
                html += this._diffHist(pRC);
                html += RCList.SEP;
                html += this._getFlags(pRC, "") + " ";
                html += pRC.pageTitleTextLink();
                html += this.getAjaxPagePreviewButton();
                html += i18n_1["default"]("semicolon-separator") + pRC.time();
                html += RCList.SEP;
                html += this._diffSizeText(pRC);
                html += RCList.SEP;
                html += pRC.userDetails();
                html += pRC.getSummary();
                break;
            }
        }
        var tLi = Utils_1["default"].newElement("li", { className: (pIndex % 2 == 0 ? "mw-line-even" : "mw-line-odd") + " " + pRC.wikiInfo.rcClass + " " + pRC.getNSClass() });
        Utils_1["default"].newElement("div", { className: this._getBackgroundClass() }, tLi);
        ;
        if (this._showFavicon()) {
            tLi.innerHTML += pRC.wikiInfo.getFaviconHTML(true) + " ";
        }
        tLi.innerHTML += html;
        this.addPreviewDiffListener(tLi.querySelector(".rcm-ajaxDiff"), pRC);
        this.addPreviewImageListener(tLi.querySelector(".rcm-ajaxImage"), pRC);
        this.addPreviewPageListener(tLi.querySelector(".rcm-ajaxPage"), pRC);
        if (this.manager.makeLinksAjax) {
            this.addPreviewDiffListener(tLi.querySelector(".rc-diff-link"), pRC);
            if (tLi.querySelector(".rcm-ajaxImage")) {
                this.addPreviewImageListener(tLi.querySelector(".rc-log-link"), pRC);
                this.addPreviewImageListener(tLi.querySelector(".rc-pagetitle"), pRC);
            }
        }
        return tLi;
    };
    RCList.prototype.toHTML = function (pIndex) {
        if (this.manager.rcParams.hideenhanced) {
            return this.htmlNode = this._toHTMLNonEnhanced(this.newest, pIndex);
        }
        else {
            if (this.list.length > 1) {
                return this.htmlNode = this._toHTMLBlock();
            }
            else {
                return this.htmlNode = this._toHTMLSingle(this.newest);
            }
        }
    };
    RCList.SEP = " . . ";
    return RCList;
}());
exports["default"] = RCList;

},{"./Global":1,"./GlobalModal":2,"./Utils":13,"./i18n":15,"./types/RC_TYPE":19}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
var RCMWikiPanel_1 = require("./RCMWikiPanel");
var RCMOptions_1 = require("./RCMOptions");
var Global_1 = require("./Global");
var RCMModal_1 = require("./RCMModal");
var WikiData_1 = require("./WikiData");
var RCData_1 = require("./RCData");
var RCDataLog_1 = require("./RCDataLog");
var RCDataFandomDiscussion_1 = require("./RCDataFandomDiscussion");
var RCList_1 = require("./RCList");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./types/RC_TYPE");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCMManager =  (function () {
    function RCMManager(pWrapper, pModID) {
        this.modID = "rcm" + pModID;
        this.resultCont = pWrapper;
        this.makeLinksAjax = false;
        this.ajaxID = 0;
        this.autoRefreshLocalStorageID = Global_1["default"].AUTO_REFRESH_LOCAL_STORAGE_ID + "-" + this.modID;
        this.extraLoadingEnabled = true;
        this.flagWikiDataIsLoaded = false;
        this.isHardRefresh = true;
        this._parseWikiList();
    }
    RCMManager.prototype.dispose = function () {
        this.resultCont = null;
        this.optionsNode.dispose();
        this.optionsNode = null;
        this.statusNode = null;
        this.wikisNode.dispose();
        this.wikisNode = null;
        this.resultsNode = null;
        this.footerNode = null;
        this.rcmNewChangesMarker = null;
        this.rcmNoNewChangesMarker = null;
        this.hideusers = null;
        this.onlyshowusers = null;
        this.rcData = null;
        this.newRecentChangesEntries = null;
        if (this.recentChangesEntries) {
            for (var i = 0; i < this.recentChangesEntries.length; i++) {
                this.recentChangesEntries[i].dispose();
                this.recentChangesEntries[i] = null;
            }
            this.recentChangesEntries = null;
        }
        this.ajaxCallbacks = null;
        this.erroredWikis = null;
        this.secondaryWikiData = null;
        this.lastLoadDateTime = null;
    };
    ;
    RCMManager.prototype._parseWikiList = function () {
        var _this = this;
        var tDataset = this.resultCont.dataset;
        this.rcParamsBase = $.extend({}, Main_1["default"].rcParamsURL, this.parseRCParams(tDataset.params, "&", "="));
        this.rcParams = $.extend(this.getDefaultRCParams(), this.rcParamsBase);
        this.autoRefreshEnabledDefault = tDataset.autorefreshEnabled == "true" ? true : false;
        this.autoRefreshTimeoutNum = (tDataset.autorefresh ? parseInt(tDataset.autorefresh) : 60) * 1000; 
        this.autoRefreshEvenOnFocus = tDataset.autorefreshEvenonfocus == "false" ? false : true;
        var socialStatus = tDataset.discussionsEnabled;
        var socialEnabled = this.discussionsEnabled = socialStatus !== "false";
        this.discNamespaces = { FORUM: socialEnabled, WALL: socialEnabled, ARTICLE_COMMENT: socialEnabled };
        if (socialEnabled && socialStatus && socialStatus !== "true" && socialStatus !== "false") {
            var dns = socialStatus.split(",").map(function (s) { return s.trim(); });
            this.discNamespaces.FORUM = dns.indexOf("FORUM") != -1;
            this.discNamespaces.WALL = dns.indexOf("WALL") != -1;
            this.discNamespaces.ARTICLE_COMMENT = dns.indexOf("ARTICLE_COMMENT") != -1;
        }
        this.hideusers = []; 
        if (tDataset.hideusers) {
            this.hideusers = tDataset.hideusers.replace(/_/g, " ").split(",");
        }
        this.hideusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
        this.notificationsHideusers = [];
        if (tDataset.notificationsHideusers) {
            this.notificationsHideusers = tDataset.notificationsHideusers.replace(/_/g, " ").split(",");
        }
        this.notificationsHideusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
        this.onlyshowusers = []; 
        if (tDataset.onlyshowusers) {
            this.onlyshowusers = tDataset.onlyshowusers.replace(/_/g, " ").split(",");
        }
        this.onlyshowusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
        this.extraLoadingEnabled = tDataset.extraLoadingEnabled == "false" ? false : true;
        this.makeLinksAjax = tDataset.ajaxlinks == "true" ? true : false;
        this.chosenWikis = [];
        $(this.resultCont).find(">ul>li").each(function (i, pNode) {
            _this.chosenWikis.push(new WikiData_1["default"](_this).initListData(pNode));
        });
        this.chosenWikis = Utils_1["default"].uniq_fast_key(this.chosenWikis, "scriptpath"); 
        tDataset = null;
        this.resultCont.innerHTML = "";
    };
    RCMManager.prototype.init = function () {
        this.resultCont.innerHTML = "";
        this.resultCont.className += " " + this.modID;
        this.modID = "." + this.modID;
        this.rcData = [];
        this.recentChangesEntries = [];
        this.optionsNode = new RCMOptions_1["default"](this).init(Utils_1["default"].newElement("div", { className: "rcm-options" }, this.resultCont));
        this.statusNode = Utils_1["default"].newElement("div", { className: "rcm-status" }, this.resultCont);
        this.wikisNode = new RCMWikiPanel_1["default"](this).init(Utils_1["default"].newElement("div", { className: "rcm-wikis" }, this.resultCont));
        Global_1["default"].showUpdateMessage(this.resultCont);
        this.resultsNode = Utils_1["default"].newElement("div", { className: "rcm-results rc-conntent" }, this.resultCont);
        this.footerNode = Utils_1["default"].newElement("div", { className: "rcm-footer" }, this.resultCont);
        var tEndNewMessageDate = new Date(Global_1["default"].lastVersionDateString);
        tEndNewMessageDate.setDate(tEndNewMessageDate.getDate() + 3);
        var tNewVersion = tEndNewMessageDate > new Date() ? '<sup class="rcm-new-version">' + i18n_1["default"]("notification-new") + '</sup>' : "";
        this.footerNode.innerHTML = "[<a href='//dev.fandom.com/wiki/RecentChangesMultiple'>RecentChangesMultiple</a>] " + i18n_1["default"]('footer', "[https://github.com/fewfre/RecentChangesMultiple/blob/master/changelog " + Global_1["default"].version + "]VERSION", "REPLACE")
            .replace("VERSION", tNewVersion)
            .replace("REPLACE", "<img src='https://fewfre.com/images/avatar.jpg?tag=rcm&pref=" + encodeURIComponent(window.location.href.split("#")[0]) + "' width='14' height='14' /> <a href='https://fewfre.fandom.com/wiki/Fewfre_Wiki'>Fewfre</a>");
        $(this.resultsNode).on("click", ".rcm-favicon-goto-button", this.wikisNode.goToAndOpenInfo);
        this._startWikiDataLoad();
        return this;
    };
    ;
    RCMManager.prototype._load = function (pWikiData, pUrl, pDataType, pTries, pID, pCallback, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        ++pTries;
        setTimeout(function () {
            $.ajax({ type: 'GET', dataType: pDataType, data: {},
                timeout: 15000,
                url: pUrl,
                success: function (data) { pCallback(data, pWikiData, pTries, pID, null); },
                error: function (data, status) { pCallback(null, pWikiData, pTries, pID, status); },
            });
        }, pDelayNum);
    };
    RCMManager.prototype._retryOrError = function (pWikiData, pTries, pID, pFailStatus, pLoadCallback, pHandleErrorCallback) {
        mw.log("Error loading " + pWikiData.servername + " (" + pTries + "/" + this.loadingErrorRetryNum + " tries)");
        if (pTries < this.loadingErrorRetryNum) {
            pLoadCallback(pWikiData, pTries, pID, 0);
        }
        else {
            if (this.erroredWikis.length === 0) {
                var tMessage = pFailStatus == null ? "error-loading-syntaxhang" : "error-loading-connection";
                pHandleErrorCallback(pWikiData, pTries, pID, tMessage, RCMManager.LOADING_ERROR_RETRY_NUM_INC);
            }
            else {
                this.erroredWikis.push({ wikiInfo: pWikiData, tries: pTries, id: pID });
                this.statusNode.querySelector(".errored-wiki").innerHTML += ", " + pWikiData.servername;
            }
        }
    };
    RCMManager.prototype._onParsingFinished = function (pCallback) {
        var _this = this;
        this.wikisLeftToLoad--;
        document.querySelector(this.modID + " .rcm-load-perc").innerHTML = this.calcLoadPercent() + "%"; 
        if (this.wikisLeftToLoad > 0) {
            if (this.ajaxCallbacks.length > 0) {
                this.ajaxCallbacks.shift();
                if (this.ajaxCallbacks.length > 0) {
                    setTimeout(function () { _this.ajaxCallbacks[0](); }, 0);
                }
            }
        }
        else {
            pCallback();
        }
    };
    RCMManager.prototype._startWikiDataLoad = function () {
        var _this = this;
        this.erroredWikis = [];
        this.ajaxCallbacks = [];
        this.ajaxID++;
        this.loadingErrorRetryNum = RCMManager.LOADING_ERROR_RETRY_NUM_INC;
        if (this.chosenWikis.length > 0) {
            Utils_1["default"].forEach(this.chosenWikis, function (tWikiData, i) {
                _this._loadWikiData(tWikiData, 0, _this.ajaxID, (i + 1) * Global_1["default"].loadDelay);
            });
            this.totalItemsToLoad = this.chosenWikis.length;
            this.wikisLeftToLoad = this.totalItemsToLoad;
            this.statusNode.innerHTML = Global_1["default"].getLoader() + " " + i18n_1["default"]('status-loading') + " (<span class='rcm-load-perc'>0%</span>)";
        }
        else {
            Utils_1["default"].removeElement(this.statusNode);
            Utils_1["default"].removeElement(this.wikisNode.root);
            this.resultsNode.innerHTML = "<div class='banner-notification error center'>" + i18n_1["default"](Global_1["default"].isUcpWiki ? "expand_templates_input_missing" : "wikiacuratedcontent-content-empty-section") + "</div>";
        }
    };
    RCMManager.prototype._loadWikiData = function (pWikiData, pTries, pID, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        this._load(pWikiData, pWikiData.getWikiDataApiUrl(), 'jsonp', pTries, pID, this._onWikiDataLoaded.bind(this), pDelayNum);
    };
    RCMManager.prototype._onWikiDataLoaded = function (pData, pWikiData, pTries, pID, pFailStatus) {
        if (pID != this.ajaxID) {
            return;
        }
        if (!!pData && pData.error && pData.query == null) {
            console.error(pData, pData.error, pData.query == null);
            this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + pWikiData.servername + "</div>" + JSON.stringify(pData.error) + "</div>";
            throw "Wiki returned error";
        }
        else if (pFailStatus == "timeout") {
            this._handleWikiDataLoadError(pWikiData, pTries, pID, "error-loading-syntaxhang", 1);
            return;
        }
        else if (pData == null || pData.query == null || pData.query.general == null) {
            this._retryOrError(pWikiData, pTries, pID, pFailStatus, this._loadWikiData.bind(this), this._handleWikiDataLoadError.bind(this));
            return;
        }
        if (pData && pData.warning) {
            mw.log("WARNING: ", pData.warning);
        }
        pWikiData.initAfterLoad(pData.query);
        this._onWikiDataParsingFinished(pWikiData);
    };
    RCMManager.prototype._handleWikiDataLoadError = function (pWikiData, pTries, pID, pErrorMessage, pInc) {
        var _this = this;
        this.statusNode.innerHTML = "<div class='rcm-error'>" + i18n_1["default"](pErrorMessage, "[<span class='errored-wiki'>" + pWikiData.servername + "</span>]", pTries) + "</div>";
        if (pErrorMessage == "error-loading-syntaxhang" && 'https:' == document.location.protocol) {
            this.statusNode.innerHTML += "<div class='rcm-error'>" + i18n_1["default"]("error-loading-http") + "</div>";
        }
        var tHandler = function (pEvent) {
            _this.loadingErrorRetryNum += pInc;
            if (pEvent) {
                pEvent.target.removeEventListener("click", tHandler);
            }
            tHandler = null;
            _this.erroredWikis.forEach(function (obj) {
                _this._loadWikiData(obj.wikiInfo, obj.tries, obj.id);
            });
            _this.erroredWikis = [];
            _this.statusNode.innerHTML = Global_1["default"].getLoader() + " " + i18n_1["default"]('status-loading-sorting') + " (<span class='rcm-load-perc'>" + _this.calcLoadPercent() + "%</span>)";
        };
        Utils_1["default"].newElement("button", { className: "rcm-btn", innerHTML: i18n_1["default"]("error-trymoretimes", pInc) }, this.statusNode).addEventListener("click", tHandler);
        var tHandlerRemove = function (pEvent) {
            if (pEvent) {
                pEvent.target.removeEventListener("click", tHandlerRemove);
            }
            tHandlerRemove = null;
            _this.chosenWikis.splice(_this.chosenWikis.indexOf(pWikiData), 1);
            _this.statusNode.innerHTML = Global_1["default"].getLoader() + " " + i18n_1["default"]('status-loading-sorting') + " (<span class='rcm-load-perc'>" + _this.calcLoadPercent() + "%</span>)";
            _this._onWikiDataParsingFinished(null);
        };
        Utils_1["default"].addTextTo(" ", this.statusNode);
        Utils_1["default"].newElement("button", { className: "rcm-btn", innerHTML: i18n_1["default"](Global_1["default"].isUcpWiki ? "wall-message-remove" : "wikia-hubs-remove") }, this.statusNode).addEventListener("click", tHandlerRemove);
        this.erroredWikis.push({ wikiInfo: pWikiData, tries: pTries, id: pID });
    };
    RCMManager.prototype._onWikiDataParsingFinished = function (pWikiData) {
        var _this = this;
        this._onParsingFinished(function () { _this._onAllWikiDataParsed(); });
    };
    RCMManager.prototype._onAllWikiDataParsed = function () {
        this.flagWikiDataIsLoaded = true;
        var tCSS = "";
        this.chosenWikis.forEach(function (wikiInfo) {
            tCSS += "\n." + wikiInfo.rcClass + " .rcm-tiled-favicon {"
                + (wikiInfo.bgcolor != null ? "background: " + wikiInfo.bgcolor + ";" : "background-image: url(" + wikiInfo.favicon + ");")
                + " }";
        });
        mw.util.addCSS(tCSS);
        this.wikisNode.onWikiDataLoaded();
        this._start(true);
    };
    RCMManager.prototype._startDiscussionLoading = function (pID) {
        var _this = this;
        if (!this.discussionsEnabled) {
            return;
        }
        this.ajaxCallbacks = [];
        this.loadingErrorRetryNum = RCMManager.LOADING_ERROR_RETRY_NUM_INC;
        this.totalItemsToLoad = 0;
        var wikis = this.chosenWikis.filter(function (w) { return !w.hidden; });
        wikis.forEach(function (tWikiData, i) {
            if (tWikiData.usesWikiaDiscussions !== false) {
                _this.totalItemsToLoad++;
                _this._loadWikiaDiscussions(tWikiData, 0, pID, _this.totalItemsToLoad * Global_1["default"].loadDelay);
            }
        });
        if (this.totalItemsToLoad <= 0) {
            this.discussionsEnabled = false;
            this.rcmChunkStart();
            return;
        }
        this.wikisLeftToLoad = this.totalItemsToLoad;
        this.statusNode.innerHTML = Global_1["default"].getLoader() + " " + i18n_1["default"]('status-discussions-loading') + " (<span class='rcm-load-perc'>0%</span>)";
    };
    RCMManager.prototype._loadWikiaDiscussions = function (pWikiData, pTries, pID, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        this._load(pWikiData, pWikiData.getWikiDiscussionUrl(), 'json', pTries, pID, this._onWikiDiscussionLoaded.bind(this), pDelayNum);
    };
    RCMManager.prototype._onWikiDiscussionLoaded = function (pData, pWikiData, pTries, pID, pFailStatus) {
        var _this = this;
        if (pID != this.ajaxID) {
            return;
        }
        if (pFailStatus == null && pData && pData["_embedded"] && pData["_embedded"]["doc:posts"]) {
            pWikiData.usesWikiaDiscussions = true;
            this.ajaxCallbacks.push(function () {
                _this._parseWikiDiscussions(pData["_embedded"]["doc:posts"], pWikiData);
            });
            if (this.ajaxCallbacks.length === 1) {
                this.ajaxCallbacks[0]();
            }
        }
        else {
            if (pWikiData.usesWikiaDiscussions === true) {
                mw.log("Error loading " + pWikiData.servername + " (" + pTries + "/" + this.loadingErrorRetryNum + " tries)");
                if (pTries < this.loadingErrorRetryNum && pFailStatus == "timeout") {
                    this._loadWikiaDiscussions(pWikiData, pTries, pID, 0);
                }
                else {
                    this._onDiscussionParsingFinished(pWikiData);
                }
                return;
            }
            else {
                if (pFailStatus != "timeout") {
                    mw.log("[RCMManager](loadWikiDiscussions) " + pWikiData.servername + " has no discussions.");
                    pWikiData.usesWikiaDiscussions = false;
                }
                this._onDiscussionParsingFinished(pWikiData);
            }
        }
    };
    RCMManager.prototype._parseWikiDiscussions = function (pData, pWikiData) {
        var _this = this;
        if (pData.length <= 0) {
            this._onDiscussionParsingFinished(pWikiData);
            return;
        }
        pData.sort(function (a, b) {
            return (a.modificationDate || a.creationDate).epochSecond < (b.modificationDate || b.creationDate).epochSecond ? 1 : -1;
        });
        pWikiData.updateLastDiscussionDate(Utils_1["default"].getFirstItemFromObject(pData));
        var tNewRC, tDate, tChangeAdded;
        pData.forEach(function (pRCData) {
            var tUser = pRCData.createdBy.name;
            if (_this._changeShouldBePrunedBasedOnOptions(tUser, pWikiData)) {
                return;
            }
            if (pWikiData.rcParams.hidemyself && Global_1["default"].username == tUser) {
                return;
            }
            if ((pRCData.modificationDate || pRCData.creationDate).epochSecond < Math.round(pWikiData.getEndDate().getTime() / 1000)) {
                return;
            }
            try {
                var containerType = pRCData._embedded.thread[0].containerType;
                if (!_this.discNamespaces[containerType]) {
                    return;
                }
            }
            catch (e) { }
            _this.itemsToAddTotal++;
            tNewRC = new RCDataFandomDiscussion_1["default"](pWikiData, _this);
            tNewRC.init(pRCData);
            _this._addRCDataToList(tNewRC);
            pWikiData.discussionsCount++;
        });
        mw.log("Discussions:", pWikiData.servername, pData);
        this._onDiscussionParsingFinished(pWikiData);
    };
    RCMManager.prototype._onDiscussionParsingFinished = function (pWikiData) {
        var _this = this;
        this._onParsingFinished(function () { _this.rcmChunkStart(); });
    };
    RCMManager.prototype._start = function (pUpdateParams) {
        var _this = this;
        if (pUpdateParams === void 0) { pUpdateParams = false; }
        clearTimeout(this.autoRefreshTimeoutID);
        this.wikisNode.clear();
        this.newRecentChangesEntries = [];
        this.ajaxCallbacks = [];
        this.erroredWikis = [];
        this.secondaryWikiData = [];
        this.ajaxID++;
        this.loadingErrorRetryNum = RCMManager.LOADING_ERROR_RETRY_NUM_INC;
        this.itemsAdded = this.itemsToAddTotal = 0;
        var wikis = this.chosenWikis.filter(function (w) { return !w.hidden; });
        if (wikis.length == 0) {
            Utils_1["default"].newElement("div", { className: "rcm-noNewChanges", innerHTML: "<strong>" + i18n_1["default"]('nonewchanges') + "</strong>" }, this.resultsNode);
            this.wikisNode.refresh();
            return;
        }
        wikis.forEach(function (tWikiData, i) {
            if (pUpdateParams) {
                tWikiData.setupRcParams();
            } 
            _this._loadWiki(tWikiData, 0, _this.ajaxID, (i + 1) * Global_1["default"].loadDelay);
        });
        this.totalItemsToLoad = wikis.length;
        this.wikisLeftToLoad = this.totalItemsToLoad;
        this.statusNode.innerHTML = Global_1["default"].getLoader() + " " + i18n_1["default"]('status-loading-sorting') + " (<span class='rcm-load-perc'>0%</span>)";
    };
    RCMManager.prototype.refresh = function (pUpdateParams) {
        if (pUpdateParams === void 0) { pUpdateParams = false; }
        if (this.chosenWikis.length == 0 || !this.flagWikiDataIsLoaded) {
            return;
        }
        this.isHardRefresh = false;
        this.statusNode.innerHTML = "";
        if (this.rcmNewChangesMarker && (!this.isAutoRefreshEnabled() || (document.hasFocus() || this.lastLoadDateTime >= this.recentChangesEntries[0].date))) {
            Utils_1["default"].removeElement(this.rcmNewChangesMarker);
            this.rcmNewChangesMarker = null;
        }
        if (this.rcmNoNewChangesMarker) {
            Utils_1["default"].removeElement(this.rcmNoNewChangesMarker);
            this.rcmNoNewChangesMarker = null;
        }
        this.ajaxCallbacks = null;
        this.secondaryWikiData = null;
        RCMModal_1["default"].closeModal();
        this._start(pUpdateParams);
    };
    RCMManager.prototype.hardRefresh = function (pUpdateParams) {
        if (pUpdateParams === void 0) { pUpdateParams = false; }
        if (this.chosenWikis.length == 0 || !this.flagWikiDataIsLoaded) {
            return;
        }
        this.isHardRefresh = true;
        this.statusNode.innerHTML = "";
        this.resultsNode.innerHTML = "";
        this.rcmNewChangesMarker = null;
        this.rcmNoNewChangesMarker = null;
        this.chosenWikis.forEach(function (tWikiData) {
            tWikiData.lastChangeDate = tWikiData.getEndDate();
            tWikiData.lastDiscussionDate = tWikiData.getEndDate();
            tWikiData.resultsCount = 0;
            tWikiData.discussionsCount = 0;
        });
        this.rcData = [];
        if (this.recentChangesEntries != null) {
            for (var i = 0; i < this.recentChangesEntries.length; i++) {
                this.recentChangesEntries[i].dispose();
                this.recentChangesEntries[i] = null;
            }
            this.recentChangesEntries = null;
        }
        this.recentChangesEntries = [];
        this.ajaxCallbacks = null;
        this.secondaryWikiData = null;
        RCMModal_1["default"].closeModal();
        this._start(pUpdateParams);
    };
    RCMManager.prototype._loadWiki = function (pWikiData, pTries, pID, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        this._load(pWikiData, pWikiData.getApiUrl(), 'jsonp', pTries, pID, this._onWikiLoaded.bind(this), pDelayNum);
    };
    RCMManager.prototype._onWikiLoaded = function (pData, pWikiData, pTries, pID, pFailStatus) {
        var _this = this;
        if (pID != this.ajaxID) {
            return;
        }
        if (!!pData && pData.error && pData.query == null) {
            this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + pWikiData.servername + "</div>" + JSON.stringify(pData.error) + "</div>";
            this.addRefreshButtonTo(this.statusNode);
            throw "Wiki returned error";
        }
        else if (pFailStatus == "timeout") {
            this._handleWikiLoadError(pWikiData, pTries, pID, "error-loading-syntaxhang", 1);
            return;
        }
        else if (pData == null || pData.query == null || pData.query.recentchanges == null) {
            this._retryOrError(pWikiData, pTries, pID, pFailStatus, this._loadWiki.bind(this), this._handleWikiLoadError.bind(this));
            return;
        }
        if (pData && pData.warning) {
            mw.log("WARNING: ", pData.warning);
        }
        this.ajaxCallbacks.push(function () {
            _this._parseWiki(pData.query.recentchanges, pData.query.logevents, pWikiData);
        });
        if (this.ajaxCallbacks.length === 1) {
            this.ajaxCallbacks[0]();
        }
    };
    RCMManager.prototype._handleWikiLoadError = function (pWikiData, pTries, pID, pErrorMessage, pInc) {
        var _this = this;
        clearTimeout(this.loadErrorTimeoutID);
        this.loadErrorTimeoutID = null;
        this.statusNode.innerHTML = "<div class='rcm-error'>" + i18n_1["default"](pErrorMessage, "[<span class='errored-wiki'>" + pWikiData.servername + "</span>]", pTries) + "</div>";
        this.addRefreshButtonTo(this.statusNode);
        var tHandler = function (pEvent) {
            clearTimeout(_this.loadErrorTimeoutID);
            _this.loadErrorTimeoutID = null;
            _this.loadingErrorRetryNum += pInc;
            if (pEvent) {
                pEvent.target.removeEventListener("click", tHandler);
            }
            tHandler = null;
            _this.erroredWikis.forEach(function (obj) {
                _this._loadWiki(obj.wikiInfo, obj.tries, obj.id);
            });
            _this.erroredWikis = [];
            _this.statusNode.innerHTML = Global_1["default"].getLoader() + " " + i18n_1["default"]('status-loading-sorting') + " (<span class='rcm-load-perc'>" + _this.calcLoadPercent() + "%</span>)";
        };
        Utils_1["default"].newElement("button", { className: "rcm-btn", innerHTML: i18n_1["default"]("error-trymoretimes", pInc) }, this.statusNode).addEventListener("click", tHandler);
        this.erroredWikis.push({ wikiInfo: pWikiData, tries: pTries, id: pID });
        if (this.isAutoRefreshEnabled()) {
            this.loadErrorTimeoutID = window.setTimeout(function () { if (tHandler) {
                tHandler(null);
            } }, 20000);
        }
    };
    RCMManager.prototype._parseWiki = function (pData, pLogData, pWikiData) {
        var _this = this;
        if (pData.length <= 0) {
            this._onWikiParsingFinished(pWikiData);
            return;
        }
        mw.log(pWikiData.servername, pData);
        pWikiData.updateLastChangeDate(Utils_1["default"].getFirstItemFromObject(pData));
        var tNewRC, tDate, tChangeAdded;
        pData.forEach(function (pRCData) {
            if (_this._changeShouldBePrunedBasedOnOptions(pRCData.user, pWikiData)) {
                return;
            }
            _this.itemsToAddTotal++;
            if (pRCData.logtype && pRCData.logtype != "0") { 
                tNewRC = new RCDataLog_1["default"](pWikiData, _this).initLog(pRCData, pLogData);
            }
            else {
                tNewRC = new RCData_1["default"](pWikiData, _this).init(pRCData);
            }
            _this._addRCDataToList(tNewRC);
            pWikiData.resultsCount++;
        });
        this._onWikiParsingFinished(pWikiData);
    };
    ;
    RCMManager.prototype._changeShouldBePrunedBasedOnOptions = function (pUser, pWikiData) {
        if (pUser && this.hideusers.indexOf(pUser) > -1 || (pWikiData.hideusers && pWikiData.hideusers.indexOf(pUser) > -1)) {
            return true;
        }
        if (pUser && (this.onlyshowusers.length != 0 && this.onlyshowusers.indexOf(pUser) == -1)) {
            return true;
        }
        if (pUser && (pWikiData.onlyshowusers != undefined && pWikiData.onlyshowusers.indexOf(pUser) == -1)) {
            return true;
        }
        return false;
    };
    RCMManager.prototype._addRCDataToList = function (pNewRC) {
        var _this = this;
        var tNewRcCombo = { data: pNewRC, list: null };
        this.rcData.push(tNewRcCombo); 
        var tResultsIsEmpty = this.resultsNode.innerHTML == "", tNewList, tNoChangeAdded;
        if (this.rcParams.hideenhanced) {
            tNoChangeAdded = true; 
        }
        else if (tResultsIsEmpty) {
            tNoChangeAdded = this.recentChangesEntries.every(function (pRCList, i) {
                if (pNewRC.date > pRCList.date) {
                    _this.recentChangesEntries.splice(i, 0, tNewList = new RCList_1["default"](_this).addRC(pNewRC));
                    return false;
                }
                else if (pRCList.shouldGroupWith(pNewRC)) {
                    tNewList = pRCList.addRC(pNewRC);
                    return false;
                }
                return true;
            });
        }
        else {
            var tIndexToAddAt_1 = -1, tNewTimeStamp_1 = Utils_1["default"].formatWikiTimeStamp(pNewRC.date, false);
            tNoChangeAdded = this.recentChangesEntries.every(function (pRCList, i) {
                if (tIndexToAddAt_1 == -1 && pNewRC.date > pRCList.date) {
                    tIndexToAddAt_1 = i;
                    if (pRCList.shouldGroupWith(pNewRC)) {
                        tNewList = pRCList.addRC(pNewRC);
                        return false;
                    }
                }
                else {
                    if (pRCList.shouldGroupWith(pNewRC)) {
                        tNewList = pRCList.addRC(pNewRC);
                        if (tIndexToAddAt_1 > -1) {
                            _this.recentChangesEntries.splice(i, 1); 
                            _this.recentChangesEntries.splice(tIndexToAddAt_1, 0, pRCList);
                        }
                        return false;
                    }
                    else if (tIndexToAddAt_1 > -1 && tNewTimeStamp_1 != Utils_1["default"].formatWikiTimeStamp(pRCList.date, false)) {
                        _this.recentChangesEntries.splice(tIndexToAddAt_1, 0, tNewList = new RCList_1["default"](_this).addRC(pNewRC));
                        return false;
                    }
                }
                return true;
            });
        }
        if (tNoChangeAdded) {
            this.recentChangesEntries.push(tNewList = new RCList_1["default"](this).addRC(pNewRC));
        }
        tNewRcCombo.list = tNewList;
    };
    RCMManager.prototype._onWikiParsingFinished = function (pWikiData) {
        var _this = this;
        this.wikisNode.onWikiLoaded(pWikiData);
        this._onParsingFinished(function () { _this._onAllWikisParsed(); });
    };
    RCMManager.prototype._onAllWikisParsed = function () {
        if (this.discussionsEnabled) {
            this._startDiscussionLoading(this.ajaxID);
        }
        else {
            this.rcmChunkStart();
        }
    };
    RCMManager.prototype.rcmChunkStart = function () {
        var _this = this;
        var tDate = new Date();
        this.statusNode.innerHTML = i18n_1["default"]('status-timestamp', "<b><tt>" + Utils_1["default"].pad(Utils_1["default"].getHours(tDate), 2) + ":" + Utils_1["default"].pad(Utils_1["default"].getMinutes(tDate), 2) + "</tt></b>");
        this.statusNode.innerHTML += "<span class='rcm-content-loading'> – [" + i18n_1["default"]('status-changesadded', "<span class='rcm-content-loading-num'>0</span> / " + this.itemsToAddTotal) + "]</span>";
        this.rcData.sort(function (a, b) { return b.data.date.valueOf() - a.data.date.valueOf(); });
        if (this.rcParams.hideenhanced) {
            this.recentChangesEntries.sort(function (a, b) { return b.date.valueOf() - a.date.valueOf(); });
        }
        this.removeOldResults(tDate);
        this.newRecentChangesEntries = [];
        var tResultsIsEmpty = this.resultsNode.innerHTML == "";
        this.recentChangesEntries.every(function (pRCList, i) {
            if (pRCList.date > _this.lastLoadDateTimeActual || tResultsIsEmpty) {
                _this.newRecentChangesEntries.push(pRCList);
                return true;
            }
            return false;
        });
        if (this.recentChangesEntries.length == 0 || (this.lastLoadDateTime != null && this.recentChangesEntries[0].date <= this.lastLoadDateTime)) {
            if (!this.rcmNewChangesMarker)
                this.rcmNoNewChangesMarker = this.resultsNode.insertBefore(Utils_1["default"].newElement("div", { className: "rcm-noNewChanges", innerHTML: "<strong>" + i18n_1["default"]('nonewchanges') + "</strong>" }), this.resultsNode.firstChild);
        }
        else {
            if (!this.rcmNewChangesMarker && this.newRecentChangesEntries.length > 0 && this.lastLoadDateTime != null && this.resultsNode.innerHTML != "") {
                var tRcSection = this.resultsNode.querySelector("div, ul");
                this.rcmNewChangesMarker = tRcSection.insertBefore(Utils_1["default"].newElement("div", { className: "rcm-previouslyLoaded", innerHTML: "<strong>" + i18n_1["default"]('previouslyloaded') + "</strong>" }), tRcSection.firstChild);
                tRcSection = null;
            }
            if (this.lastLoadDateTimeActual != null && this.isAutoRefreshEnabled() && !document.hasFocus()) {
                if (this.recentChangesEntries[0].date > this.lastLoadDateTimeActual) {
                    this.notifyUserOfChange();
                }
            }
        }
        this.rcmChunk(0, 99, 99, null, this.ajaxID);
    };
    RCMManager.prototype.removeOldResults = function (pDate) {
        var _this = this;
        if (this.resultsNode.innerHTML == "") {
            return;
        }
        var tWikisToCheck = this.chosenWikis.slice(0);
        var tRcCombo, tDirtyLists = [], tWikiI;
        for (var i = this.rcData.length - 1; i >= 0; i--) {
            tRcCombo = this.rcData[i];
            if ((tWikiI = tWikisToCheck.indexOf(tRcCombo.data.wikiInfo)) == -1) {
                continue;
            }
            if (tRcCombo.data.shouldBeRemoved(pDate)) {
                if (tRcCombo.data.type != RC_TYPE_1["default"].DISCUSSION) {
                    tRcCombo.data.wikiInfo.resultsCount--;
                }
                else {
                    tRcCombo.data.wikiInfo.discussionsCount--;
                }
                this.rcData[i] = null;
                this.rcData.splice(i, 1);
                tRcCombo.list.removeRC(tRcCombo.data);
                if (this.rcParams.hideenhanced || tDirtyLists.indexOf(tRcCombo.list) == -1) {
                    tDirtyLists.push(tRcCombo.list);
                }
                tRcCombo.data == null;
                tRcCombo.list = null;
            }
            else if (tRcCombo.data.wikiInfo.resultsCount <= tRcCombo.data.wikiInfo.rcParams.limit && tRcCombo.data.wikiInfo.discussionsCount <= Math.min(tRcCombo.data.wikiInfo.rcParams.limit, 50)) {
                tWikisToCheck.splice(tWikiI, 1);
                if (tWikisToCheck.length == 0) {
                    break;
                }
            }
        }
        tRcCombo = null;
        tWikisToCheck = null;
        var tNewRCList, tOldNode, tListI;
        tDirtyLists.forEach(function (pRCList) {
            tListI = _this.recentChangesEntries.indexOf(pRCList);
            if (tListI > -1) {
                if (pRCList.list.length <= 0) {
                    if (pRCList.htmlNode) {
                        Utils_1["default"].removeElement(pRCList.htmlNode);
                    }
                    _this.recentChangesEntries[tListI].dispose();
                    _this.recentChangesEntries[tListI] = null;
                    _this.recentChangesEntries.splice(tListI, 1);
                }
                else {
                    if (pRCList.htmlNode) {
                        tOldNode = pRCList.htmlNode;
                        Utils_1["default"].insertAfter(pRCList.toHTML(tListI), tOldNode);
                        Utils_1["default"].removeElement(tOldNode);
                    }
                }
            }
            else {
                console.warn("[RCMManager](removeOldResults) Failed to remove old list.");
            }
        });
        tNewRCList = null;
        tOldNode = null;
        tDirtyLists = null;
        Utils_1["default"].forEach(this.resultsNode.querySelectorAll(".rcm-rc-cont"), function (o) {
            if (o.innerHTML == "") {
                Utils_1["default"].removeElement(o.previousSibling);
                Utils_1["default"].removeElement(o);
            }
        });
    };
    RCMManager.prototype.notifyUserOfChange = function () {
        var tMostRecentEntry = this.recentChangesEntries[0].newest;
        var tDontNotify = this.notificationsHideusers.indexOf(tMostRecentEntry.author) > -1 || (tMostRecentEntry.wikiInfo.notificationsHideusers && tMostRecentEntry.wikiInfo.notificationsHideusers.indexOf(tMostRecentEntry.author) > -1) || !tMostRecentEntry.wikiInfo.notificationsEnabled;
        if (!tDontNotify) {
            var tNumNewChanges = 0, tNumNewChangesWiki = 0;
            for (var i = 0; i < this.recentChangesEntries.length; i++) {
                if (this.recentChangesEntries[i].date > this.lastLoadDateTime) {
                    for (var j = 0; j < this.recentChangesEntries[i].list.length; j++) {
                        if (this.recentChangesEntries[i].list[j].date > this.lastLoadDateTime) {
                            tNumNewChanges++;
                            if (this.recentChangesEntries[i].wikiInfo.scriptpath == tMostRecentEntry.wikiInfo.scriptpath) {
                                tNumNewChangesWiki++;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    break;
                }
            }
            Main_1["default"].blinkWindowTitle(i18n_1["default"]("notification-new") + " " + i18n_1["default"]("nchanges", tNumNewChanges));
            var tEditTitle = tMostRecentEntry.getNotificationTitle();
            if (tEditTitle == null) {
                tEditTitle = this.recentChangesEntries[0].getExistingThreadTitle();
                tEditTitle = tEditTitle ? i18n_1["default"]('discussions') + " - " + tEditTitle : i18n_1["default"]('discussions');
            }
            var bodyContents = [];
            if (tEditTitle)
                bodyContents.push(tEditTitle);
            bodyContents.push(i18n_1["default"]("notification-edited-by", tMostRecentEntry.author));
            if (tMostRecentEntry.unparsedComment)
                bodyContents.push(i18n_1["default"]("notification-edit-summary", tMostRecentEntry.unparsedComment));
            Main_1["default"].addNotification(i18n_1["default"]("nchanges", tNumNewChanges) + " - " + tMostRecentEntry.wikiInfo.sitename + (tNumNewChangesWiki != tNumNewChanges ? " (" + tNumNewChangesWiki + ")" : ""), {
                body: bodyContents.join("\n")
            });
        }
        tMostRecentEntry = null;
    };
    RCMManager.prototype.rcmChunk = function (pIndex, pLastDay, pLastMonth, pContainer, pID) {
        var _this = this;
        if (pID != this.ajaxID) {
            return;
        } 
        if (this.newRecentChangesEntries.length == 0) {
            this.finishScript();
            return;
        }
        var date = this.newRecentChangesEntries[pIndex].date, tAddToTopOfExistingContainer = false;
        if (Utils_1["default"].getDate(date) != pLastDay || Utils_1["default"].getMonth(date) != pLastMonth) {
            pLastDay = Utils_1["default"].getDate(date);
            pLastMonth = Utils_1["default"].getMonth(date);
            var tTimestamp = Utils_1["default"].formatWikiTimeStamp(date, false);
            var tNewContainer = void 0;
            if (tNewContainer = this.resultsNode.querySelector("[data-timestamp=\"" + tTimestamp + "\"]")) {
                pContainer = tNewContainer;
                tAddToTopOfExistingContainer = true;
            }
            else {
                var tNewHeading = Utils_1["default"].newElement("h4", { innerHTML: tTimestamp });
                tNewContainer = this.rcParams.hideenhanced == false ? Utils_1["default"].newElement("div", { className: "rcm-rc-cont" }) : Utils_1["default"].newElement("ul", { className: "special rcm-rc-cont" });
                tNewContainer.dataset["timestamp"] = tTimestamp;
                if (!pContainer) {
                    if (this.isHardRefresh) {
                        this.resultsNode.appendChild(tNewHeading);
                        this.resultsNode.appendChild(tNewContainer);
                    }
                    else {
                        Utils_1["default"].prependChild(tNewHeading, this.resultsNode);
                        Utils_1["default"].insertAfter(tNewContainer, tNewHeading);
                    }
                }
                else {
                    Utils_1["default"].insertAfter(tNewHeading, pContainer);
                    Utils_1["default"].insertAfter(tNewContainer, tNewHeading);
                }
                pContainer = tNewContainer;
                tNewHeading = null;
            }
            tNewContainer = null;
        }
        if (this.rcmNewChangesMarker) {
            if (this.newRecentChangesEntries[pIndex].htmlNode) {
                Utils_1["default"].removeElement(this.newRecentChangesEntries[pIndex].htmlNode);
            }
            var tRcNode = this.newRecentChangesEntries[pIndex].toHTML(pIndex);
            if (pContainer.innerHTML == "") {
                pContainer.appendChild(tRcNode);
            }
            else if (tAddToTopOfExistingContainer || pIndex == 0) {
                pContainer.firstChild.parentNode.insertBefore(tRcNode, pContainer.firstChild);
            }
            else {
                if (this.newRecentChangesEntries[pIndex - 1].htmlNode.parentNode != pContainer) {
                    pContainer.appendChild(tRcNode);
                }
                else {
                    Utils_1["default"].insertAfter(tRcNode, this.newRecentChangesEntries[pIndex - 1].htmlNode);
                }
            }
            tRcNode = null;
        }
        else {
            pContainer.appendChild(this.newRecentChangesEntries[pIndex].toHTML(pIndex));
        }
        this.itemsAdded += this.newRecentChangesEntries[pIndex].list.length;
        if (++pIndex < this.newRecentChangesEntries.length) {
            document.querySelector(this.modID + " .rcm-content-loading-num").innerHTML = this.itemsAdded.toString();
            if (pIndex % 5 == 0) {
                setTimeout(function () { _this.rcmChunk(pIndex, pLastDay, pLastMonth, pContainer, pID); });
            }
            else {
                this.rcmChunk(pIndex, pLastDay, pLastMonth, pContainer, pID);
            }
        }
        else {
            this.finishScript();
        }
    };
    ;
    RCMManager.prototype.finishScript = function () {
        Utils_1["default"].removeElement(document.querySelector(this.modID + " .rcm-content-loading"));
        this.addRefreshButtonTo(this.statusNode);
        this.addAutoRefreshInputTo(this.statusNode);
        if (this.lastLoadDateTime == null || !this.isAutoRefreshEnabled() || document.hasFocus()) {
            this.lastLoadDateTime = this.recentChangesEntries.length > 0 ? this.recentChangesEntries[0].date : null; 
        }
        this.lastLoadDateTimeActual = this.recentChangesEntries.length > 0 ? this.recentChangesEntries[0].date : null; 
        this.startAutoRefresh();
        (window.ajaxCallAgain || []).forEach(function (cb) { cb(); });
        if (this.extraLoadingEnabled) {
            this.chosenWikis.forEach(function (wd) { wd.checkForSecondaryLoading(); });
            this._loadExtraInfo(this.ajaxID);
        }
    };
    ;
    RCMManager.prototype.startAutoRefresh = function () {
        var _this = this;
        if (!this.isAutoRefreshEnabled()) {
            return;
        }
        this.autoRefreshTimeoutID = window.setTimeout(function () {
            if (RCMModal_1["default"].isModalOpen() || (_this.autoRefreshEvenOnFocus == false && document.hasFocus())) {
                _this.startAutoRefresh();
                return;
            }
            _this.refresh();
        }, this.autoRefreshTimeoutNum);
    };
    ;
    RCMManager.prototype._loadExtraInfo = function (pID) {
        var _this = this;
        if (pID != this.ajaxID) {
            return;
        }
        if (this.secondaryWikiData.length == 0) {
            mw.log("[RCMManager](_loadExtraInfo) All loading finished.");
            return;
        }
        var _a = this.secondaryWikiData.shift(), url = _a.url, _b = _a.dataType, dataType = _b === void 0 ? "jsonp" : _b, tCallback = _a.callback, skipRefreshSanity = _a.skipRefreshSanity;
        if (typeof url === "function")
            url = url();
        var tries = 0, retryDelay = 0, MAX_TRIES = 10;
        var tDoLoad = function () {
            $.ajax({ type: 'GET', url: url, dataType: dataType, data: {} })
                .then(function () {
                var pArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    pArgs[_i] = arguments[_i];
                }
                if (!skipRefreshSanity && pID != _this.ajaxID) {
                    return;
                }
                tCallback.apply(_this, pArgs);
            })
                .fail(function () {
                tries++;
                if ((!skipRefreshSanity && pID != _this.ajaxID) || tries >= MAX_TRIES) {
                    return;
                }
                setTimeout(tDoLoad, retryDelay);
                retryDelay = Math.min(tries * 10, 60) * 1000;
            });
        };
        tDoLoad();
        setTimeout(function () { _this._loadExtraInfo(pID); }, Global_1["default"].loadDelay);
    };
    RCMManager.prototype.addRefreshButtonTo = function (pParent) {
        var self = this;
        pParent.appendChild(document.createTextNode(" "));
        Utils_1["default"].newElement("button", { className: "rcm-btn", innerHTML: i18n_1["default"]('status-refresh') }, pParent).addEventListener("click", function tHandler(e) {
            e.target.removeEventListener("click", tHandler);
            self.refresh();
        });
    };
    ;
    RCMManager.prototype.addAutoRefreshInputTo = function (pParent) {
        var self = this;
        pParent.appendChild(document.createTextNode(" "));
        var autoRefresh = Utils_1["default"].newElement("span", { className: "rcm-autoRefresh" }, pParent);
        Utils_1["default"].newElement("label", { htmlFor: "rcm-autoRefresh-checkbox", innerHTML: i18n_1["default"]('autorefresh'), title: i18n_1["default"]('autorefresh-tooltip', Math.floor(self.autoRefreshTimeoutNum / 1000)) }, autoRefresh);
        var checkBox = Utils_1["default"].newElement("input", { className: "rcm-autoRefresh-checkbox", type: "checkbox" }, autoRefresh);
        checkBox.checked = this.isAutoRefreshEnabled();
        checkBox.addEventListener("click", function tHandler(e) {
            if (document.querySelector(self.modID + " .rcm-autoRefresh-checkbox").checked) {
                localStorage.setItem(self.autoRefreshLocalStorageID, true.toString());
                self.refresh();
                Notification.requestPermission();
            }
            else {
                localStorage.setItem(self.autoRefreshLocalStorageID, false.toString());
                clearTimeout(self.autoRefreshTimeoutID);
            }
        });
    };
    ;
    RCMManager.prototype.isAutoRefreshEnabled = function () {
        return localStorage.getItem(this.autoRefreshLocalStorageID) == "true" || this.autoRefreshEnabledDefault;
    };
    RCMManager.prototype.calcLoadPercent = function () {
        return Math.round((this.totalItemsToLoad - this.wikisLeftToLoad) / this.totalItemsToLoad * 100);
    };
    ;
    RCMManager.prototype.parseRCParams = function (pData, pExplodeOn, pSplitOn) {
        var tRcParams = {};
        var paramStringArray = [];
        if (!pData) {
            return tRcParams;
        }
        var tRcParamsRawData = pData.split(pExplodeOn);
        var tRcParamsDataSplit; 
        for (var i = 0; i < tRcParamsRawData.length; i++) {
            tRcParamsDataSplit = tRcParamsRawData[i].split(pSplitOn);
            if (tRcParamsDataSplit.length > 1) {
                if (tRcParamsDataSplit[0] == "limit" && tRcParamsDataSplit[1]) {
                    tRcParams["limit"] = parseInt(tRcParamsDataSplit[1]);
                }
                else if (tRcParamsDataSplit[0] == "days" && tRcParamsDataSplit[1]) {
                    tRcParams["days"] = parseInt(tRcParamsDataSplit[1]);
                }
                else if (tRcParamsDataSplit[0] == "namespace" && (tRcParamsDataSplit[1] || tRcParamsDataSplit[1] === "0")) {
                    tRcParams["namespace"] = tRcParamsDataSplit[1];
                }
                else if (tRcParamsDataSplit[1]) {
                    tRcParams[tRcParamsDataSplit[0]] = tRcParamsDataSplit[1] == "1";
                }
                paramStringArray.push(tRcParamsDataSplit[0] + "=" + tRcParamsDataSplit[1]);
            }
        }
        tRcParams.paramString = paramStringArray.join("&");
        paramStringArray = null;
        return tRcParams;
    };
    RCMManager.prototype.getDefaultRCParams = function () {
        return {
            paramString: "",
            limit: 50,
            days: 7,
            hideminor: false,
            hidebots: true,
            hideanons: false,
            hideliu: false,
            hidemyself: false,
            hideenhanced: false,
            hidelogs: false,
            namespace: null,
        };
    };
    RCMManager.LOADING_ERROR_RETRY_NUM_INC = 5;
    return RCMManager;
}());
exports["default"] = RCMManager;

},{"./Global":1,"./Main":3,"./RCData":4,"./RCDataFandomDiscussion":5,"./RCDataLog":6,"./RCList":7,"./RCMModal":9,"./RCMOptions":10,"./RCMWikiPanel":11,"./Utils":13,"./WikiData":14,"./i18n":15,"./types/RC_TYPE":19}],9:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var i18n_1 = require("./i18n");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCMModal =  (function () {
    function RCMModal() {
    }
    RCMModal.init = function () {
        mw.hook('dev.modal').add(function (module) {
            RCMModal.modalFactory = module;
        });
        if (Global_1["default"].isUcpWiki) {
            try {
                window.dev.modal._windowManager.on("closing", function (modal) {
                    if (modal.elementId == RCMModal.MODAL_ID) {
                        RCMModal.isOpen = false;
                    }
                });
            }
            catch (e) { }
        }
    };
    RCMModal.createModal = function (pData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , new Promise(function (resolve) {
                        RCMModal.clearModalCache();
                        var modalBase = new RCMModal.modalFactory.Modal(pData);
                        modalBase.create().then(function (modal) {
                            RCMModal.modal = modal;
                            resolve(modal);
                        });
                    })];
            });
        });
    };
    RCMModal.clearModalCache = function () {
        delete RCMModal.modalFactory.modals[RCMModal.MODAL_ID];
        $("#" + RCMModal.MODAL_ID + ", #blackout_" + RCMModal.MODAL_ID).remove();
    };
    RCMModal.showModal = function (pData) {
        return __awaiter(this, void 0, void 0, function () {
            var buttons, events, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        RCMModal.closeModal();
                        RCMModal.isOpen = true;
                        buttons = [], events = {};
                        buttons.push({
                            text: i18n_1["default"]('modal-close'),
                            event: "close_button",
                            normal: false, primary: false,
                        });
                        events["close_button"] = function () { RCMModal.modal.close(); };
                        pData.buttons && pData.buttons.forEach(function (o, i, a) {
                            buttons.push({ text: o.text, event: o.event, normal: true, primary: true });
                            if (o.closeOnClick !== false) {
                                events[o.event] = function (e) {
                                    o.callback(e);
                                    RCMModal.modal.close();
                                };
                            }
                            else {
                                events[o.event] = o.callback;
                            }
                        });
                        return [4 , RCMModal.createModal({
                                id: RCMModal.MODAL_ID,
                                size: Global_1["default"].isUcpWiki ? 'larger' : 'content-size',
                                close: function () { RCMModal.isOpen = false; return true; },
                                title: pData.title,
                                content: "<div id=\"" + RCMModal.MODAL_CONTENT_ID + "\">" + pData.content + "</div>",
                                buttons: buttons,
                                events: events,
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.show();
                        return [2 ];
                }
            });
        });
    };
    RCMModal.showLoadingModal = function (pData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pData.content = "<div style='text-align:center; padding:10px;'>" + Global_1["default"].getLoaderLarge() + "</div>";
                        return [4 , RCMModal.showModal(pData)];
                    case 1:
                        _a.sent();
                        return [2 ];
                }
            });
        });
    };
    RCMModal.setModalContent = function (pHTML) {
        document.querySelector("#" + RCMModal.MODAL_CONTENT_ID).innerHTML = pHTML;
        if (Global_1["default"].isUcpWiki) {
            try {
                window.dev.modal._windowManager.windows[RCMModal.MODAL_ID].updateSize();
            }
            catch (e) { }
        }
    };
    RCMModal.isModalOpen = function () {
        return RCMModal.modal != null && RCMModal.isOpen;
    };
    RCMModal.closeModal = function () {
        if (RCMModal.isModalOpen()) {
            RCMModal.modal.close();
        }
    };
    RCMModal.MODAL_ID = "rcm-modal";
    RCMModal.MODAL_CONTENT_ID = "rcm-modal-content";
    RCMModal.modalFactory = null;
    RCMModal.modal = null;
    RCMModal.isOpen = false;
    return RCMModal;
}());
exports["default"] = RCMModal;

},{"./Global":1,"./i18n":15}],10:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var WikiaMultiSelectDropdown_1 = require("./lib/WikiaMultiSelectDropdown");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCMOptions =  (function () {
    function RCMOptions(pManager) {
        var _this = this;
        this._onChange_limit = function (pEvent) {
            _this.afterChangeNumber("limit", parseInt(pEvent.target.value));
        };
        this._onChange_days = function (pEvent) {
            _this.afterChangeNumber("days", parseInt(pEvent.target.value));
        };
        this._onChange_hideminor = function (pEvent) {
            _this.afterChangeBoolean("hideminor", !pEvent.target.checked);
        };
        this._onChange_hidebots = function (pEvent) {
            _this.afterChangeBoolean("hidebots", !pEvent.target.checked);
        };
        this._onChange_hideanons = function (pEvent) {
            if (pEvent.target.checked == false && _this.usersCheckbox.checked == false) {
                _this.manager.rcParams["hideliu"] = false;
                _this.usersCheckbox.checked = true;
            }
            _this.afterChangeBoolean("hideanons", !pEvent.target.checked);
        };
        this._onChange_hideliu = function (pEvent) {
            if (pEvent.target.checked == false && _this.anonsCheckbox.checked == false) {
                _this.manager.rcParams["hideanons"] = false;
                _this.anonsCheckbox.checked = true;
            }
            _this.afterChangeBoolean("hideliu", !pEvent.target.checked);
        };
        this._onChange_hidemyself = function (pEvent) {
            _this.afterChangeBoolean("hidemyself", !pEvent.target.checked);
        };
        this._onChange_hideenhanced = function (pEvent) {
            _this.afterChangeBoolean("hideenhanced", !pEvent.target.checked);
        };
        this._onChange_hidelogs = function (pEvent) {
            _this.afterChangeBoolean("hidelogs", !pEvent.target.checked);
        };
        this._onChange_settingsSaveCookie = function (pEvent) {
            if (pEvent.target.checked) {
                _this.save();
            }
            else {
                localStorage.removeItem(_this.localStorageID);
            }
        };
        this._onChange_discussionsDropdown = function (pEvent) {
            var dropdown = _this.discussionsDropdown;
            _this.discussionsDropdown.$dropdown.find(".dropdown-item input").each(function (i, o) {
                var checkbox = o;
                _this.discNamespaces[checkbox.value] = checkbox.checked;
                _this.manager.discNamespaces[checkbox.value] = checkbox.checked;
            });
            _this.manager.discussionsEnabled = dropdown.getSelectedItems().length > 0;
            _this.manager.hardRefresh(true);
            _this.save();
        };
        this.manager = pManager;
        this.localStorageID = Global_1["default"].OPTIONS_SETTINGS_LOCAL_STORAGE_ID + "-" + pManager.modID.replace(".", "");
    }
    RCMOptions.prototype.dispose = function () {
        this.removeEventListeners();
        this.manager = null;
        this.root = null;
        this.rcParams = null;
        this.discNamespaces = null;
        this.settingsSaveCookieCheckbox = null;
        this.settingsShowDiscussionsCheckbox = null;
        this.limitField = null;
        this.daysField = null;
        this.minorEditsCheckbox = null;
        this.botsCheckbox = null;
        this.anonsCheckbox = null;
        this.usersCheckbox = null;
        this.myEditsCheckbox = null;
        this.groupedChangesCheckbox = null;
        this.logsCheckbox = null;
    };
    RCMOptions.prototype.init = function (pElem) {
        var _this = this;
        this.root = pElem;
        var tSave = this.getSave();
        this.rcParams = tSave.options || {}; 
        this.manager.rcParams = $.extend(this.manager.rcParams, this.rcParams);
        var dns = this.manager.discNamespaces;
        this.discNamespaces = $.extend({ FORUM: dns.FORUM, WALL: dns.WALL, ARTICLE_COMMENT: dns.ARTICLE_COMMENT }, (tSave.discNamespaces || {}));
        this.manager.discNamespaces = __assign({}, this.discNamespaces);
        this.manager.discussionsEnabled = Object.keys(this.discNamespaces).filter(function (key) { return _this.discNamespaces[key]; }).length > 0;
        this._addElements();
        return this;
    };
    RCMOptions.prototype._addElements = function () {
        var tFieldset = Utils_1["default"].newElement("fieldset", { className: "rcoptions collapsible" }, this.root);
        Utils_1["default"].newElement("legend", { innerHTML: i18n_1["default"]('recentchanges-legend') }, tFieldset);
        var tContent = Utils_1["default"].newElement("div", { className: "rc-fieldset-content" }, tFieldset);
        var tSettingsPanel = Utils_1["default"].newElement("aside", { className: "rcm-options-settings" }, tContent);
        tSettingsPanel.innerHTML = Global_1["default"].getSymbol("rcm-settings-gear", 19);
        tSettingsPanel.querySelector("svg").style.cssText = "vertical-align: top;";
        var tSettingsPanelContent = Utils_1["default"].newElement("div", { className: "rcm-options-settings-cont" }, tSettingsPanel);
        this.settingsSaveCookieCheckbox = this._createNewSettingsOption(i18n_1["default"]('optionspanel-savewithcookie'), this.isSaveEnabled(), tSettingsPanelContent);
        var tRow1Text = i18n_1["default"]('rclinks').split("<br />")[0].split("$3")[0].split(/\$1|\$2/);
        var tRow1 = Utils_1["default"].newElement("div", {}, tContent);
        Utils_1["default"].addTextTo(tRow1Text[0], tRow1);
        this.limitField = Utils_1["default"].newElement("select", {}, tRow1);
        Utils_1["default"].addTextTo(tRow1Text[1], tRow1);
        this.daysField = Utils_1["default"].newElement("select", {}, tRow1);
        Utils_1["default"].addTextTo(tRow1Text[2] || "", tRow1);
        var tRow2 = Utils_1["default"].newElement("div", {}, tContent);
        this.minorEditsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideminor', ""), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.botsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhidebots', ""), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.anonsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideanons', ""), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.usersCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideliu', ""), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.myEditsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhidemine', ""), tRow2);
        if (Global_1["default"].username && this.manager.hideusers.indexOf(Global_1["default"].username) != -1) {
            this.myEditsCheckbox.disabled = true;
            this.myEditsCheckbox.checked = false;
            this.myEditsCheckbox.title = i18n_1["default"]('optionspanel-hideusersoverride');
        }
        Utils_1["default"].addTextTo(" | ", tRow2);
        if (Global_1["default"].isUcpWiki) {
            this.groupedChangesCheckbox = this._newCheckbox(i18n_1["default"]('rcfilters-group-results-by-page'), tRow2);
        }
        else {
            this.groupedChangesCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideenhanced', ""), tRow2);
        }
        Utils_1["default"].addTextTo(" | ", tRow2);
        if (Global_1["default"].isUcpWiki) {
            this.logsCheckbox = this._newCheckbox(i18n_1["default"]('rcfilters-filter-logactions-label'), tRow2);
        }
        else {
            this.logsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhidelogs', ""), tRow2);
        }
        Utils_1["default"].newElement("hr", null, tContent);
        var tRow3 = Utils_1["default"].newElement("table", { className: "mw-recentchanges-table" }, tContent);
        var tRow3Row = Utils_1["default"].newElement("row", { className: "mw-recentchanges-table" }, tRow3);
        Utils_1["default"].newElement("td", { className: "mw-label", innerHTML: i18n_1["default"](Global_1["default"].isUcpWiki ? "socialactivity-page-title" : "discussions") + ":" }, tRow3Row);
        var tRow3RowTdInput = Utils_1["default"].newElement("td", { className: "mw-input" }, tRow3Row);
        this.discussionsDropdown = this._createNewMultiSelectDropdown([
            { label: i18n_1["default"]('discussions'), value: "FORUM" },
            { label: i18n_1["default"]('message-wall'), value: "WALL" },
            { label: i18n_1["default"]('comments'), value: "ARTICLE_COMMENT" },
        ], this.manager.discNamespaces, tRow3RowTdInput);
        this.addEventListeners();
        this.refresh();
        return this;
    };
    RCMOptions.prototype._newCheckbox = function (pText, pParent) {
        var tLabel = Utils_1["default"].newElement("label", null, pParent);
        var tCheckbox = Utils_1["default"].newElement("input", { type: "checkbox" }, tLabel);
        Utils_1["default"].addTextTo(" " + Utils_1["default"].ucfirst(pText.trim()), tLabel);
        return tCheckbox;
    };
    RCMOptions.prototype._createNewSettingsOption = function (pText, pChecked, pParent) {
        var tCheckbox = this._newCheckbox(pText, pParent);
        tCheckbox.checked = pChecked;
        return tCheckbox;
    };
    RCMOptions.prototype._createNewMultiSelectDropdown = function (pList, pChecked, pParent) {
        var $dropdown = $("<div class=\"WikiaDropdown MultiSelect disc\">\n\t\t\t<div class=\"selected-items\">\n\t\t\t\t<span class=\"selected-items-list\"></span>\n\t\t\t\t<img class=\"arrow\" src=\"data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D\" />\n\t\t\t</div>\n\t\t\t<div class=\"dropdown\">\n\t\t\t\t<div class=\"toolbar\">\n\t\t\t\t\t<label><input type=\"checkbox\" name=\"select-all\" class=\"select-all\" value=\"all\">" + i18n_1["default"]("listusers-select-all") + "</label>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"dropdown-list\">\n\t\t\t\t\t" + pList.map(function (o, i) {
            var checked = pChecked[o.value]; 
            return "<li class=\"dropdown-item " + (checked ? "selected" : "") + "\">\n\t\t\t\t\t\t\t<label><input type=\"checkbox\" name=\"namespace[]\" value=\"" + o.value + "\" " + (checked ? "checked" : "") + ">" + o.label + "</label>\n\t\t\t\t\t\t</li>";
        }).join("") + "\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>")
            .appendTo(pParent);
        return (new WikiaMultiSelectDropdown_1.WikiaMultiSelectDropdown($dropdown, { eventNamespace: 'WikiaMultiSelectDropdown' + this.manager.modID, minHeight: 100, maxHeight: 100 })).init();
    };
    RCMOptions.prototype.refresh = function () {
        var _this = this;
        this.limitField.innerHTML = "";
        var tLimit = this.manager.rcParams.limit;
        var tLimitValues = [25, 50, 75, 100, 200, 350, 500];
        if (tLimitValues.indexOf(tLimit) == -1) {
            tLimitValues.push(tLimit);
            tLimitValues.sort(function (a, b) { return a - b; });
        }
        for (var i = 0; i < tLimitValues.length; i++) {
            Utils_1["default"].newElement("option", { value: tLimitValues[i], innerHTML: tLimitValues[i], selected: (tLimit == tLimitValues[i] ? "selected" : undefined) }, this.limitField);
        }
        this.daysField.innerHTML = "";
        var tDays = this.manager.rcParams.days;
        var tDayValues = [1, 3, 7, 14, 30];
        if (tDayValues.indexOf(tDays) == -1) {
            tDayValues.push(tDays);
            tDayValues.sort(function (a, b) { return a - b; });
        }
        for (var i = 0; i < tDayValues.length; i++) {
            Utils_1["default"].newElement("option", { value: tDayValues[i], innerHTML: tDayValues[i], selected: (tDays == tDayValues[i] ? "selected" : undefined) }, this.daysField);
        }
        this.minorEditsCheckbox.checked = !this.manager.rcParams.hideminor;
        this.botsCheckbox.checked = !this.manager.rcParams.hidebots;
        this.anonsCheckbox.checked = !this.manager.rcParams.hideanons;
        this.usersCheckbox.checked = !this.manager.rcParams.hideliu;
        this.myEditsCheckbox.checked = !this.manager.rcParams.hidemyself;
        this.groupedChangesCheckbox.checked = !this.manager.rcParams.hideenhanced;
        this.logsCheckbox.checked = !this.manager.rcParams.hidelogs;
        Object.keys(this.discNamespaces).forEach(function (ns) {
            _this.discussionsDropdown.$dropdown.find("[value=" + ns + "]").attr("checked", _this.discNamespaces[ns]);
        });
    };
    RCMOptions.prototype.addEventListeners = function () {
        this.settingsSaveCookieCheckbox.addEventListener("change", this._onChange_settingsSaveCookie);
        this.limitField.addEventListener("change", this._onChange_limit);
        this.daysField.addEventListener("change", this._onChange_days);
        this.minorEditsCheckbox.addEventListener("change", this._onChange_hideminor);
        this.botsCheckbox.addEventListener("change", this._onChange_hidebots);
        this.anonsCheckbox.addEventListener("change", this._onChange_hideanons);
        this.usersCheckbox.addEventListener("change", this._onChange_hideliu);
        this.myEditsCheckbox.addEventListener("change", this._onChange_hidemyself);
        this.groupedChangesCheckbox.addEventListener("change", this._onChange_hideenhanced);
        this.logsCheckbox.addEventListener("change", this._onChange_hidelogs);
        this.discussionsDropdown.on("change", this._onChange_discussionsDropdown);
        this.discussionsDropdown.$selectAll.on("change", this._onChange_discussionsDropdown);
    };
    RCMOptions.prototype.removeEventListeners = function () {
        this.settingsSaveCookieCheckbox.removeEventListener("change", this._onChange_settingsSaveCookie);
        this.limitField.removeEventListener("change", this._onChange_limit);
        this.daysField.removeEventListener("change", this._onChange_days);
        this.minorEditsCheckbox.removeEventListener("change", this._onChange_hideminor);
        this.botsCheckbox.removeEventListener("change", this._onChange_hidebots);
        this.anonsCheckbox.removeEventListener("change", this._onChange_hideanons);
        this.usersCheckbox.removeEventListener("change", this._onChange_hideliu);
        this.myEditsCheckbox.removeEventListener("change", this._onChange_hidemyself);
        this.groupedChangesCheckbox.removeEventListener("change", this._onChange_hideenhanced);
        this.logsCheckbox.removeEventListener("change", this._onChange_hidelogs);
    };
    RCMOptions.prototype.afterChangeNumber = function (pKey, pVal, pHardRefresh) {
        if (pHardRefresh === void 0) { pHardRefresh = false; }
        this.rcParams[pKey] = pVal;
        this.manager.rcParams[pKey] = pVal;
        this.manager.hardRefresh(true);
        this.save();
    };
    RCMOptions.prototype.afterChangeBoolean = function (pKey, pVal, pHardRefresh) {
        if (pHardRefresh === void 0) { pHardRefresh = false; }
        this.rcParams[pKey] = pVal;
        this.manager.rcParams[pKey] = pVal;
        this.manager.hardRefresh(true);
        this.save();
    };
    RCMOptions.prototype.save = function () {
        if (this.settingsSaveCookieCheckbox.checked) {
            var _a = this, options = _a.rcParams, discNamespaces = _a.discNamespaces;
            localStorage.setItem(this.localStorageID, JSON.stringify({ options: options, discNamespaces: discNamespaces }));
        }
    };
    RCMOptions.prototype.getSave = function () {
        return localStorage.getItem(this.localStorageID)
            ? JSON.parse(localStorage.getItem(this.localStorageID))
            : {};
    };
    RCMOptions.prototype.isSaveEnabled = function () {
        return localStorage.getItem(this.localStorageID) != null;
    };
    return RCMOptions;
}());
exports["default"] = RCMOptions;

},{"./Global":1,"./Utils":13,"./i18n":15,"./lib/WikiaMultiSelectDropdown":16}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var $ = window.jQuery;
var mw = window.mediaWiki;
var RCMWikiPanel =  (function () {
    function RCMWikiPanel(pManager) {
        this.manager = pManager;
        this.singleWiki = this.manager.chosenWikis.length == 1;
        this.loadedWikis = [];
    }
    RCMWikiPanel.prototype.dispose = function () {
        this.manager = null;
        this.root = null;
        this.wikisNode = null;
        this.infoNode = null;
        this.loadedNode = null;
        this.loadedListNode = null;
        this.hiddenNode = null;
        this.hiddenListNode = null;
        this.loadedWikis = null;
    };
    RCMWikiPanel.prototype.init = function (pElem) {
        var _this = this;
        this.root = pElem;
        if (!this.singleWiki) {
            this.wikisNode = Utils_1["default"].newElement("div", { style: "display:none;" }, this.root);
            this.loadedNode = Utils_1["default"].newElement("span", { className: "loaded-wikis" }, this.wikisNode);
            this.loadedNode.innerHTML += "<span class=\"rcm-wikisloaded-title\" title=\"" + i18n_1["default"]('wikipanel-wikisloaded-tooltip') + "\">" + i18n_1["default"]('wikipanel-wikisloaded') + "</span>: ";
            this.loadedListNode = Utils_1["default"].newElement("ul", { className: "rcm-wikis-list" }, this.loadedNode);
            this.hiddenNode = Utils_1["default"].newElement("span", { className: "hidden-wikis", style: "display:none;" }, this.wikisNode);
            this.hiddenNode.innerHTML += i18n_1["default"]('abusefilter-history-hidden') + ": ";
            this.hiddenListNode = Utils_1["default"].newElement("ul", { className: "rcm-wikis-list" }, this.hiddenNode);
            Utils_1["default"].addTextTo(" ", this.hiddenNode);
            Utils_1["default"].newElement("button", { className: "rcm-btn rcm-btn-short", innerHTML: i18n_1["default"]('show') }, this.hiddenNode).addEventListener("click", function (e) {
                e.preventDefault();
                _this.manager.chosenWikis.forEach(function (wiki) { wiki.hidden = false; });
                _this.manager.hardRefresh();
                return false;
            });
        }
        this.infoNode = Utils_1["default"].newElement("div", { className: "rcm-wikis-info" }, this.root);
        return this;
    };
    RCMWikiPanel.prototype.onWikiDataLoaded = function () {
        if (!this.singleWiki) {
            this.wikisNode.style.display = "block";
        }
    };
    RCMWikiPanel.prototype.clear = function () {
        if (!this.singleWiki) {
            this.loadedListNode.innerHTML = "";
            this.hiddenListNode.innerHTML = "";
            this.hiddenNode.style.display = "none";
            this.infoNode.innerHTML = "";
            this.loadedWikis = [];
        }
    };
    RCMWikiPanel.prototype.refresh = function () {
        var _this = this;
        if (this.singleWiki) {
            if (!this.infoNode.innerHTML) {
                this.onIconClick(this.manager.chosenWikis[0], null);
            }
            return;
        } 
        this.loadedListNode.innerHTML = "";
        this.hiddenListNode.innerHTML = "";
        this.manager.chosenWikis.filter(function (w) { return !w.needsSiteinfoData && (w.hidden || _this.loadedWikis.indexOf(w.htmlName) > -1); }).forEach(function (wiki) {
            _this._addWiki(wiki);
        });
        this.hiddenNode.style.display = this.manager.chosenWikis.some(function (wiki) { return wiki.hidden; }) ? "initial" : "none";
    };
    RCMWikiPanel.prototype._addWiki = function (pWikiInfo) {
        var _this = this;
        var ul = pWikiInfo.hidden ? this.hiddenListNode : this.loadedListNode;
        var favicon = Utils_1["default"].newElement("li", { id: pWikiInfo.infoID, className: "favicon", innerHTML: pWikiInfo.getFaviconHTML() }, ul);
        favicon.addEventListener("click", function (e) { _this.onIconClick(pWikiInfo, e); });
    };
    RCMWikiPanel.prototype.onWikiLoaded = function (pWikiInfo) {
        this.loadedWikis.push(pWikiInfo.htmlName);
        this.refresh();
    };
    RCMWikiPanel.prototype.onIconClick = function (pWikiInfo, e) {
        var _this = this;
        var infoBanner = this.infoNode.querySelector(".banner-notification");
        if (infoBanner && infoBanner.dataset.wiki == pWikiInfo.servername &&  e && (e.screenX != 0 && e.screenY != 0)) {
            this.closeInfo();
        }
        else {
            var tLink_1 = function (page, key) { return "<a href='" + pWikiInfo.articlepath + page + "'>" + i18n_1["default"](key) + "</a>"; };
            var tLinkNum = function (page, key, num) { return tLink_1(page, key) + (": <b>" + num + "</b>"); };
            var wikiLinksList = [
                tLink_1("Special:RecentChanges" + pWikiInfo.firstSeperator + pWikiInfo.rcParams.paramString, "recentchanges"),
                tLink_1("Special:NewPages", "newpages"),
                tLink_1("Special:NewFiles", "newimages"),
                tLink_1("Special:Log", "log"),
                pWikiInfo.isWikiaWiki && pWikiInfo.isLegacyWikiaWiki && tLink_1("Special:Insights", "insights"),
                pWikiInfo.isWikiaWiki && pWikiInfo.user.rights.analytics && tLink_1("Special:Analytics", "admindashboard-control-analytics-label"),
                tLink_1("Special:Random", "randompage"),
                pWikiInfo.usesWikiaDiscussions && "<a href='" + pWikiInfo.scriptpath + "/d'>" + i18n_1["default"]("discussions") + "</a>",
                pWikiInfo.isWikiaWiki && tLink_1("Special:SocialActivity", "socialactivity-page-title"),
            ].filter(function (o) { return !!o; });
            var buttons = [];
            if (!this.singleWiki) {
                if (!pWikiInfo.hidden) {
                    buttons.push("<button id=\"rcm-hide-cur-wiki\" class=\"rcm-btn rcm-btn-short\">" + i18n_1["default"]('hide') + "</button>");
                    buttons.push("<button id=\"rcm-showonly-cur-wiki\" class=\"rcm-btn rcm-btn-short\">" + i18n_1["default"]('wikipanel-showonly') + "</button>");
                }
                else {
                    buttons.push("<button id=\"rcm-show-cur-wiki\" class=\"rcm-btn rcm-btn-short\">" + i18n_1["default"]('show') + "</button>");
                    buttons.push("<button id=\"rcm-showonly-cur-wiki\" class=\"rcm-btn rcm-btn-short\">" + i18n_1["default"]('wikipanel-showonly') + "</button>");
                }
            }
            var statsHTML = ""
                + "<table class='wikitable center statisticstable' style='margin: 0;'>"
                + "<tr>"
                + ("<td>" + tLinkNum("Special:AllPages", (Global_1["default"].isUcpWiki ? "articles" : "awc-metrics-articles"), pWikiInfo.statistics.articles) + "</td>")
                + ("<td>" + tLinkNum("Special:ListFiles", "prefs-files", pWikiInfo.statistics.images) + "</td>")
                + ("<td>" + tLinkNum("Special:ListUsers", "statistics-users-active", pWikiInfo.statistics.activeusers) + "</td>")
                + ("<td>" + tLinkNum("Special:ListAdmins", "group-sysop", pWikiInfo.statistics.admins) + "</td>")
                + ("<td>" + tLinkNum("Special:Statistics", "edits", pWikiInfo.statistics.edits) + "</td>")
                + "</tr>"
                + "</table>";
            var siteLink = "<a href='" + (pWikiInfo.articlepath + Utils_1["default"].escapeCharactersLink(pWikiInfo.mainpage)) + "'>" + pWikiInfo.sitename + "</a>";
            var html = ""
                + "<table class='rcm-wiki-infotable'>"
                + "<tr>"
                + ("<td rowspan='2' class='rcm-favicon-cell'>" + pWikiInfo.getFaviconHTML(false, 32) + "</td>")
                + "<td class=\"rcm-titlelinks-cell\">"
                + ("<div class=\"rcm-wiki-title\"><b>" + siteLink + "</b></div>")
                + ("<div class=\"rcm-links\">" + wikiLinksList.join(" • ") + "</div>")
                + (buttons.length > 0 ? "<div class=\"rcm-buttons\">" + buttons.join(" ") + "</div>" : "")
                + "</td>"
                + "</tr>"
                + "<tr>"
                + ("<td>" + statsHTML + "</td>")
                + "</tr>"
                + "</table>";
            this.addBanner(html, !this.singleWiki, "data-wiki='" + pWikiInfo.servername + "'");
            $("#rcm-hide-cur-wiki").on("click", function () {
                pWikiInfo.hidden = true;
                _this.manager.hardRefresh();
            });
            $("#rcm-showonly-cur-wiki").on("click", function () {
                _this.manager.chosenWikis.forEach(function (wiki) { wiki.hidden = true; });
                pWikiInfo.hidden = false;
                _this.manager.hardRefresh();
            });
            $("#rcm-show-cur-wiki").on("click", function () {
                pWikiInfo.hidden = false;
                _this.manager.hardRefresh();
            });
        }
    };
    RCMWikiPanel.prototype.addBanner = function (contents, addCloseButton, params) {
        if (params === void 0) { params = ""; }
        var html = [
            "<div class='banner-notification warn' " + params + ">",
            (addCloseButton ? "<button class='close wikia-chiclet-button'><img></button>" : ""),
            "<div class='msg'>" + contents + "</div>",
            "</div>",
        ].filter(function (o) { return !!o; }).join("");
        this.infoNode.innerHTML = html;
        if (addCloseButton) {
            this.infoNode.querySelector(".banner-notification .close").addEventListener("click", this.closeInfo.bind(this));
        }
    };
    RCMWikiPanel.prototype.closeInfo = function () {
        $(this.infoNode.querySelector(".banner-notification")).animate({ height: "toggle", opacity: "toggle" }, 200, function () {
            $(this).remove();
        });
    };
    RCMWikiPanel.prototype.goToAndOpenInfo = function (e) {
        var btn = document.querySelector("#" + e.currentTarget.dataset.infoid);
        if (btn) {
            if (!Utils_1["default"].elemIsVisible(btn)) {
                var tScrollOffset = Global_1["default"].config.skin == "oasis" ? -46 : 0;
                $('html, body').scrollTop($(btn).offset().top + tScrollOffset - 6);
            }
            btn.click();
        }
    };
    return RCMWikiPanel;
}());
exports["default"] = RCMWikiPanel;

},{"./Global":1,"./Utils":13,"./i18n":15}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var $ = window.jQuery;
var mw = window.mediaWiki;
var UserData =  (function () {
    function UserData(pWikiInfo, pManager) {
        this.manager = pManager;
    }
    UserData.prototype.dispose = function () {
        delete this.manager;
        delete this.wikiInfo;
        this.groups = null;
        this.block = null;
    };
    UserData.prototype.init = function (pData) {
        this.userid = pData.userid;
        this.name = pData.name;
        this.groups = pData.groups || [];
        Utils_1["default"].removeFromArray(this.groups, "*");
        if (pData.blockedby) {
            this.block = { by: pData.blockedby, reason: pData.blockreason, expiration: pData.blockexpiry };
        }
        return this; 
    };
    UserData.prototype.getClassNames = function () {
        return "rcm-usergroup-" + this.groups.join(" rcm-usergroup-") + (this.block ? " rcm-userblocked" : "");
    };
    UserData.getUsersApiUrl = function (pList, pScriptpath) {
        var tReturnText = pScriptpath + "/api.php?action=query&format=json&continue=&list=users";
        tReturnText += "&usprop=" + ["blockinfo", "groups"].join("|"); 
        tReturnText += "&ususers=" + Utils_1["default"].escapeCharactersLink(pList.join("|").replace(/ /g, "_"));
        Utils_1["default"].logUrl("[UserData](getUsersApiUrl)", tReturnText);
        return tReturnText;
    };
    return UserData;
}());
exports["default"] = UserData;

},{"./Utils":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var $ = window.jQuery;
var mw = window.mediaWiki;
var Utils =  (function () {
    function Utils() {
    }
    Utils.forEach = function (collection, callback, pScope) { if (collection != undefined) {
        Array.prototype.forEach.call(collection, callback, pScope);
    } };
    Utils.newElement = function (tag, attributes, parent) {
        var element = document.createElement(tag);
        if (!!attributes) {
            for (var key in attributes) {
                if (key == "style") {
                    element.style.cssText = attributes[key];
                }
                else {
                    element[key] = attributes[key];
                }
            }
        }
        if (parent != undefined)
            parent.appendChild(element);
        return element;
    };
    Utils.removeElement = function (pNode) {
        pNode = pNode;
        pNode.parentNode.removeChild(pNode);
    };
    Utils.addTextTo = function (pText, pNode) {
        pNode.appendChild(document.createTextNode(pText));
    };
    Utils.elemIsVisible = function (pElem) {
        var rect = pElem.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    };
    Utils.insertAfter = function (pNewNode, pRef) {
        return (pRef.nextSibling ? pRef.parentNode.insertBefore(pNewNode, pRef.nextSibling) : pRef.parentNode.appendChild(pNewNode));
    };
    Utils.prependChild = function (pNewNode, pRef) {
        return (pRef.firstChild ? pRef.insertBefore(pNewNode, pRef.firstChild) : pRef.appendChild(pNewNode));
    };
    Utils.getSeconds = function (pDate) { return Global_1["default"].timezone == "utc" ? pDate.getUTCSeconds() : pDate.getSeconds(); };
    Utils.getMinutes = function (pDate) { return Global_1["default"].timezone == "utc" ? pDate.getUTCMinutes() : pDate.getMinutes(); };
    Utils.getHours = function (pDate) { return Global_1["default"].timezone == "utc" ? pDate.getUTCHours() : pDate.getHours(); };
    Utils.getDate = function (pDate) { return Global_1["default"].timezone == "utc" ? pDate.getUTCDate() : pDate.getDate(); };
    Utils.getMonth = function (pDate) { return Global_1["default"].timezone == "utc" ? pDate.getUTCMonth() : pDate.getMonth(); };
    Utils.getYear = function (pDate) { return Global_1["default"].timezone == "utc" ? pDate.getUTCFullYear() : pDate.getFullYear(); };
    Utils.formatWikiTimeStamp = function (pDate, pShowTime) {
        if (pShowTime === void 0) { pShowTime = true; }
        var tDateString = Utils.formatWikiTimeStampDateOnly(pDate), tTime = pShowTime ? Utils.formatWikiTimeStampTimeOnly(pDate) : "";
        if (Global_1["default"].userOptions.date != "ISO 8601") {
            if (tTime) {
                tTime = tTime + ", ";
            }
            tDateString = tTime + tDateString;
        }
        else {
            if (tTime) {
                tTime = "T" + tTime;
            }
            tDateString = tDateString + tTime;
        }
        return tDateString;
    };
    Utils.formatWikiTimeStampDateOnly = function (pDate) {
        var tYear = Utils.getYear(pDate), tMonth = Utils.getMonth(pDate) + 1, tMonthName = Global_1["default"].config.wgMonthNames[tMonth], tDay = Utils.getDate(pDate);
        switch (Global_1["default"].userOptions.date) {
            case "mdyts":
            case "mdyt":
            case "mdy":
            default: return tMonthName + " " + tDay + ", " + tYear;
            case "dmyts":
            case "dmyt":
            case "dmy": return tDay + " " + tMonthName + " " + tYear;
            case "ymdts":
            case "ymdt":
            case "ymd": return tYear + " " + tMonthName + " " + tDay;
            case "ISO 8601": return tYear + "-" + Utils.pad(tMonth, 2, 0) + "-" + Utils.pad(tDay, 2, 0);
        }
    };
    Utils.formatWikiTimeStampTimeOnly = function (pDate, pNoSeconds) {
        if (pNoSeconds === void 0) { pNoSeconds = false; }
        var tHours = Utils.getHours(pDate), tMinutes = Utils.getMinutes(pDate), tSeconds = Utils.getSeconds(pDate), tSuffix = "", tTime;
        if (Global_1["default"].timeFormat == "12") {
            tSuffix = tHours >= 12 ? "PM" : "AM";
            tHours = ((tHours + 11) % 12 + 1);
        }
        tTime = Utils.pad(tHours, 2) + ":" + Utils.pad(tMinutes, 2);
        if (!pNoSeconds && Global_1["default"].userOptions.date == "ISO 8601") {
            tTime += ":" + Utils.pad(tSeconds, 2);
        }
        tTime += tSuffix;
        return tTime;
    };
    Utils.getTimestampForYYYYMMDDhhmmSS = function (pNum) {
        pNum = "" + pNum;
        var i = 0;
        return pNum.slice(i, i += 4) + "-" + pNum.slice(i, i += 2) + "-" + pNum.slice(i, i += 2) + "T" + pNum.slice(i, i += 2) + ":" + pNum.slice(i, i += 2) + ":" + pNum.slice(i, i += 2);
    };
    Utils.pad = function (n, width, z) {
        if (z === void 0) { z = 0; }
        n = n.toString();
        return n.length >= width ? n : new Array(width - n.length + 1).join(z.toString()) + n;
    };
    Utils.formatString = function (format) {
        var pArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            pArgs[_i - 1] = arguments[_i];
        }
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof pArgs[number] != 'undefined'
                ? pArgs[number]
                : match;
        });
    };
    Utils.escapeCharacters = function (pString) {
        return pString ? pString.replace(/"/g, '&quot;').replace(/'/g, '&apos;') : pString;
    };
    Utils.escapeCharactersLink = function (pString) {
        return mw.util.wikiUrlencode(pString);
    };
    Utils.ucfirst = function (s) { return s && s[0].toUpperCase() + s.slice(1); };
    Utils.uniq_fast_key = function (a, key) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
            var item = a[i];
            if (seen[item[key]] !== 1) {
                seen[item[key]] = 1;
                out[j++] = item;
            }
        }
        return out;
    };
    Utils.uniqID = function () {
        return "id" + (++Global_1["default"].uniqID);
    };
    Utils.getFirstItemFromObject = function (pData) {
        for (var tKey in pData)
            return pData[tKey];
    };
    Utils.objectToUrlQueryData = function (data) {
        var ret = [];
        for (var d in data) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
        return ret.join('&');
    };
    Utils.removeFromArray = function (pArray, pData) {
        var i = pArray.indexOf(pData);
        if (i != -1) {
            return pArray.splice(i, 1)[0];
        }
        return null;
    };
    Utils.isFileAudio = function (pTitle) {
        var tExt = null, audioExtensions = ["oga", "ogg", "ogv"]; 
        for (var i = 0; i < audioExtensions.length; i++) {
            tExt = "." + audioExtensions[i];
            if (pTitle.indexOf(tExt, pTitle.length - tExt.length) !== -1) {
                return true;
            } 
        }
        return false;
    };
    Utils.logUrl = function (pPrefix, pUrl) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var _a = pUrl.replace("&format=json", "&format=jsonfm").split(/\?|\&/), start = _a[0], vars = _a.slice(1);
        mw.log.apply(mw, [pPrefix, start + "?" + vars.join("&")].concat(args));
    };
    Utils.version_compare = function (v1Arg, v2Arg, operator) {
        var i = 0, x = 0, compare = 0, 
        vm = { 'dev': -6, 'alpha': -5, 'a': -5, 'beta': -4, 'b': -4, 'RC': -3, 'rc': -3, '#': -2, 'p': 1, 'pl': 1 }, 
        prepVersion = function (v) {
            v = ('' + v)
                .replace(/[_\-+]/g, '.');
            v = v.replace(/([^.\d]+)/g, '.$1.')
                .replace(/\.{2,}/g, '.');
            return (!v.length ? [-8] : v.split('.'));
        };
        var numVersion = function (v) {
            return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
        }, v1 = prepVersion(v1Arg), v2 = prepVersion(v2Arg);
        x = Math.max(v1.length, v2.length);
        for (i = 0; i < x; i++) {
            if (v1[i] == v2[i]) {
                continue;
            }
            v1[i] = numVersion(v1[i]);
            v2[i] = numVersion(v2[i]);
            if (v1[i] < v2[i]) {
                compare = -1;
                break;
            }
            else if (v1[i] > v2[i]) {
                compare = 1;
                break;
            }
        }
        if (!operator) {
            return compare.toString();
        }
        switch (operator) {
            case '>':
            case 'gt': {
                return (compare > 0).toString();
            }
            case '>=':
            case 'ge': {
                return (compare >= 0).toString();
            }
            case '<=':
            case 'le': {
                return (compare <= 0).toString();
            }
            case '==':
            case '=':
            case 'eq': {
                return (compare === 0).toString();
            }
            case '<>':
            case '!=':
            case 'ne': {
                return (compare !== 0).toString();
            }
            case '':
            case '<':
            case 'lt': {
                return (compare < 0).toString();
            }
            default: {
                return null;
            }
        }
    };
    return Utils;
}());
exports["default"] = Utils;

},{"./Global":1}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var UserData_1 = require("./UserData");
var Utils_1 = require("./Utils");
var $ = window.jQuery;
var mw = window.mediaWiki;
var WikiData =  (function () {
    function WikiData(pManager) {
        this.manager = pManager;
        this.notificationsEnabled = true;
        this.needsSiteinfoData = true;
        this.needsUserData = true;
        this.user = { rights: {
                block: false, undelete: false, rollback: true,
                analytics: false,
            } };
        this.isWikiaWiki = true;
        this.isLegacyWikiaWiki = true;
        this.useOutdatedLogSystem = false;
        this.users = {};
        this.usersNeeded = [];
        this.discCommentPageNames = new Map();
        this.discCommentPageNamesNeeded = [];
        this.hidden = false;
        this.lastChangeDate = null;
        this.lastDiscussionDate = null;
        this.resultsCount = 0;
        this.discussionsCount = 0;
    }
    WikiData.prototype.dispose = function () {
        this.manager = null;
        this.hideusers = null;
        this.onlyshowusers = null;
        this.rcParamsBase = null;
        this.rcParams = null;
        this.namespaces = null;
        this.user = null;
        this.lastChangeDate = null;
        this.lastDiscussionDate = null;
    };
    WikiData.prototype.initListData = function (pNode) {
        var _a = pNode.textContent.trim().replace(/(\r\n|\n|\r)/gm, "\n").split(/[&\n]/).map(function (s) { return s.trim(); }).filter(function (s) { return !!s; }), tWikiDataRawUrl = _a[0], tWikiDataRaw = _a.slice(1); 
        this.servername = tWikiDataRawUrl.replace(/^https?\:\/\//, "").replace(/(\/$)/g, "");
        this.scriptdir = "";
        this.firstSeperator = "?";
        this.htmlName = this.servername.replace(/([\.\/])/g, "-");
        this.isWikiaWiki = (this.servername.indexOf(".wikia.") > -1) || (this.servername.indexOf(".fandom.") > -1);
        this.isLegacyWikiaWiki = this.isWikiaWiki;
        this.useOutdatedLogSystem = this.isWikiaWiki;
        var tWikiDataSplit, tKey, tVal; 
        for (var i = 0; i < tWikiDataRaw.length; i++) {
            tWikiDataSplit = tWikiDataRaw[i].split("=");
            if (tWikiDataSplit.length > 1) {
                tKey = tWikiDataSplit[0];
                tVal = tWikiDataSplit[1];
                switch (tKey) {
                    case "params": {
                        this.rcParamsBase = this.manager.parseRCParams(tVal, ",", ":");
                        break;
                    }
                    case "hideusers": {
                        this.hideusers = tVal.replace("", " ").split(",");
                        this.hideusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
                        break;
                    }
                    case "onlyshowusers": {
                        this.onlyshowusers = tVal.replace("", " ").split(",");
                        this.onlyshowusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
                        break;
                    }
                    case "notifications_hideusers": {
                        this.notificationsHideusers = tVal.replace("", " ").split(",");
                        this.notificationsHideusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
                        break;
                    }
                    case "notifications_enabled": {
                        this.notificationsEnabled = tVal !== "false";
                        break;
                    }
                    case "scriptdir": {
                        this.scriptdir = tVal;
                        if (this.scriptdir[0] != "/") {
                            this.scriptdir = "/" + this.scriptdir;
                        }
                        if (this.scriptdir[this.scriptdir.length - 1] == "/") {
                            this.scriptdir = this.scriptdir.slice(0, -1);
                        }
                        break;
                    }
                    case "favicon": {
                        this.favicon = tVal;
                        if (this.favicon.indexOf(".") > -1) {
                            this.favicon = "//" + this.favicon;
                        }
                        else {
                            this.favicon = "//vignette.wikia.nocookie.net/" + this.favicon + "/images/6/64/Favicon.ico";
                        }
                        break;
                    }
                    case "username": {
                        this.username = tVal;
                        break;
                    }
                    case "bgcolor": {
                        this.bgcolor = tVal;
                        break;
                    }
                    default: {
                        this[tKey] = tVal;
                        break;
                    }
                }
            }
        }
        if (!this.username && this.isWikiaWiki && Global_1["default"].username) {
            this.username = Global_1["default"].username;
        }
        this.scriptpath = "//" + this.servername + this.scriptdir;
        this.infoID = "wiki-" + this.htmlName;
        this.rcClass = "rc-entry-" + this.htmlName;
        tKey = null;
        tVal = null;
        tWikiDataRaw = null;
        tWikiDataSplit = null;
        return this; 
    };
    WikiData.prototype.initAfterLoad = function (pQuery) {
        if (this.needsSiteinfoData && !!pQuery.general) {
            this.needsSiteinfoData = false;
            this.server = pQuery.general.server || ("//" + this.servername);
            this.articlepath = this.server + pQuery.general.articlepath.replace("$1", "");
            if (this.articlepath.indexOf("?") > -1) {
                this.firstSeperator = "&";
            }
            this.scriptpath = "" + this.server + pQuery.general.scriptpath; 
            this.sitename = pQuery.general.sitename;
            this.mainpage = pQuery.general.mainpage;
            this.mwversion = pQuery.general.generator;
            this.langCode = pQuery.general.lang;
            if (this.isWikiaWiki) {
                this.isLegacyWikiaWiki = this.mwversion == "MediaWiki 1.19.24";
                this.useOutdatedLogSystem = this.isLegacyWikiaWiki;
            }
            if (this.favicon == null) {
                if (pQuery.general.favicon && !this.isWikiaWiki) {
                    this.favicon = pQuery.general.favicon;
                    if (this.favicon.indexOf("http") != 0 && this.favicon.indexOf("//") != 0) {
                        this.favicon = this.server + "/" + this.favicon;
                    }
                }
                else if (!!pQuery.pages) {
                    var tPageID;
                    for (tPageID in pQuery.pages)
                        break; 
                    if (pQuery.pages[tPageID] && pQuery.pages[tPageID].imageinfo) {
                        this.favicon = pQuery.pages[tPageID].imageinfo[0].url;
                    }
                }
            }
            this.namespaces = pQuery.namespaces || {};
            this.statistics = pQuery.statistics || {};
            if (!!pQuery.variables) {
                var wgCityIdObj = $.grep(pQuery.variables, function (o) { return o.id === "wgCityId"; })[0];
                if (!wgCityIdObj) {
                    this.usesWikiaDiscussions = false;
                }
            }
        }
        if (this.needsUserData && !!pQuery.users) {
            this.needsUserData = false;
            var tRightList = pQuery.users[0].rights;
            this.user.rights = {
                block: tRightList.indexOf("block") > -1,
                undelete: tRightList.indexOf("undelete") > -1,
                rollback: tRightList.indexOf("rollback") > -1,
                analytics: tRightList.indexOf("analytics") > -1,
            };
        }
        if (this.favicon == null) {
            this.favicon = Global_1["default"].FAVICON_BASE + this.scriptpath;
        }
        return this;
    };
    WikiData.prototype.setupRcParams = function () {
        this.rcParams = $.extend({}, this.manager.rcParamsBase); 
        if (Object.keys(this.manager.optionsNode.rcParams).length > 0) {
            this.rcParams = $.extend(this.rcParams, this.manager.optionsNode.rcParams);
        }
        if (this.rcParamsBase != null) {
            this.rcParams = $.extend(this.rcParams, this.rcParamsBase);
        }
        this.rcParams.paramString = this.createRcParamsString(this.rcParams);
        this.rcParams = $.extend(this.manager.getDefaultRCParams(), this.rcParams);
        if (!this.lastChangeDate) {
            this.lastChangeDate = this.getEndDate();
            this.lastDiscussionDate = this.getEndDate();
        }
    };
    WikiData.prototype.createRcParamsString = function (pParams) {
        var tArray = [];
        $.each(pParams, function (tKey, tVal) {
            if (tKey != "paramString") {
                if (tVal === true) {
                    tVal = "1";
                }
                if (tVal === false) {
                    tVal = "0";
                }
                tArray.push(tKey + "=" + tVal);
            }
        });
        return tArray.join("&");
    };
    WikiData.prototype.getFaviconHTML = function (pOpenInfoBanner, pSize) {
        if (pOpenInfoBanner === void 0) { pOpenInfoBanner = false; }
        if (pSize === void 0) { pSize = 16; }
        var html = "<img src='" + this.favicon + "' title='" + this.sitename + "' width='" + pSize + "' height='" + pSize + "' />";
        if (pOpenInfoBanner) {
            html = "<span class='rcm-favicon-goto-button' data-infoid='" + this.infoID + "'>" + html + "</span>";
        }
        return html;
    };
    WikiData.prototype.getEndDate = function () {
        var tDate = new Date(); 
        tDate.setDate(tDate.getDate() - this.rcParams.days);
        return tDate;
    };
    WikiData.prototype.getUserClass = function (pUser) {
        if (this.manager.extraLoadingEnabled && pUser) {
            pUser = pUser.replace(/_/g, " ");
            if (this.users[pUser]) {
                return this.users[pUser].getClassNames();
            }
            else {
                if (this.usersNeeded.indexOf(pUser) == -1)
                    this.usersNeeded.push(pUser);
                return "rcm-user-needed";
            }
        }
        return "";
    };
    WikiData.prototype.getUserClassDataset = function (pUser) {
        if (!pUser) {
            return "";
        }
        return "data-username=\"" + pUser.replace(/"/g, "&quot;") + "\"";
    };
    WikiData.prototype.checkForSecondaryLoading = function () {
        var MAX = 50, loops = Math.ceil(this.usersNeeded.length / MAX);
        for (var i = 0; i < loops; i++) {
            var url = UserData_1["default"].getUsersApiUrl(this.usersNeeded.slice(i * MAX, (i + 1) * MAX), this.scriptpath);
            this.checkForSecondaryLoading_doUsersLoad(url);
        }
    };
    WikiData.prototype.checkForSecondaryLoading_doUsersLoad = function (pUrl) {
        var _this = this;
        this.manager.secondaryWikiData.push({
            url: pUrl,
            callback: function (data) {
                if (!data.query || !data.query.users) {
                    return;
                }
                data.query.users.forEach(function (user, i) {
                    var username = user.name;
                    if (user.invalid === "" || user.missing === "") {
                        Utils_1["default"].removeFromArray(_this.usersNeeded, username);
                        return;
                    }
                    _this.users[username] = new UserData_1["default"](_this, _this.manager).init(user);
                    Utils_1["default"].removeFromArray(_this.usersNeeded, username);
                    var tNeededClass = "rcm-user-needed";
                    var tUserNodes = _this.manager.resultsNode.querySelectorAll("." + _this.rcClass + " ." + tNeededClass + "[data-username=\"" + username.replace(/"/g, '&quot;') + "\"]");
                    Utils_1["default"].forEach(tUserNodes, function (pUserNode) {
                        pUserNode.className += " " + _this.users[username].getClassNames();
                        pUserNode.classList.remove(tNeededClass);
                    });
                });
            }
        });
    };
    WikiData.prototype.updateLastChangeDate = function (pData) {
        if (new Date(pData.timestamp) < this.lastChangeDate) {
            return;
        }
        this.lastChangeDate = new Date(pData.timestamp);
        this.lastChangeDate.setSeconds(this.lastChangeDate.getSeconds() + 1);
        this.lastChangeDate.setMilliseconds(1);
    };
    WikiData.prototype.updateLastDiscussionDate = function (pData) {
        var tSecond = (pData.modificationDate || pData.creationDate).epochSecond;
        this.lastDiscussionDate = new Date(0);
        this.lastDiscussionDate.setUTCSeconds(tSecond);
        this.lastDiscussionDate.setUTCMilliseconds(1);
    };
    WikiData.prototype.getWikiDataApiUrl = function () {
        if (!this.needsSiteinfoData || !this.needsUserData) {
            return null;
        }
        var params = {}, tUrlList = [], tMetaList = [], tPropList = [];
        tMetaList.push("siteinfo");
        params["siprop"] = ["general", "namespaces", "statistics", "variables"].join("|");
        tPropList.push("imageinfo");
        params["iiprop"] = "url";
        params["titles"] = "File:Favicon.ico";
        if (this.username) {
            tUrlList.push("users");
            params["ususers"] = this.username;
            params["usprop"] = "rights";
        }
        else {
            this.needsUserData = false;
        }
        if (tUrlList.length > 0) {
            params["list"] = tUrlList.join("|");
        }
        if (tMetaList.length > 0) {
            params["meta"] = tMetaList.join("|");
        }
        if (tPropList.length > 0) {
            params["prop"] = tPropList.join("|");
        }
        var tReturnText = "https:" + this.scriptpath + "/api.php?action=query&format=json&continue=&" + Utils_1["default"].objectToUrlQueryData(params);
        tReturnText.replace(/ /g, "_");
        tMetaList = null;
        tPropList = null;
        Utils_1["default"].logUrl("[WikiData](getWikiDataApiUrl)", tReturnText);
        return tReturnText;
    };
    WikiData.prototype.getWikiDiscussionUrl = function () {
        var tEndDate = this.lastDiscussionDate; 
        var tLimit = this.rcParams.limit < 50 ? this.rcParams.limit : 50; 
        var params = {
            limit: tLimit,
            page: 0,
            since: tEndDate.toISOString(),
            responseGroup: "small",
            reported: "false",
            viewableOnly: !this.user.rights.block,
        };
        var tReturnText = this.scriptpath + "/wikia.php?controller=DiscussionPost&method=getPosts&" + Utils_1["default"].objectToUrlQueryData(params);
        mw.log("[WikiData](getWikiDiscussionUrl) " + this.servername + " - " + tReturnText);
        return tReturnText;
    };
    WikiData.prototype.getApiUrl = function () {
        var params = {}, tUrlList = [], tMetaList = [], tPropList = [];
        var tEndDate = this.lastChangeDate; 
        tUrlList.push("recentchanges");
        params["rcprop"] = WikiData.RC_PROPS; 
        params["rclimit"] = this.rcParams.limit;
        params["rcend"] = tEndDate.toISOString();
        var tRcShow = [];
        if (this.rcParams.hideminor) {
            tRcShow.push("!minor");
        }
        if (this.rcParams.hidebots) {
            tRcShow.push("!bot");
        }
        if (this.rcParams.hideanons) {
            tRcShow.push("!anon");
        }
        if (this.rcParams.hideliu) {
            tRcShow.push("anon");
        } 
        params["rcshow"] = tRcShow.join("|");
        tRcShow = null;
        var tRcType = ["edit", "new"]; 
        if (this.rcParams.hidelogs == false) {
            tRcType.push("log");
        }
        params["rctype"] = tRcType.join("|");
        tRcType = null;
        var tUser = null;
        if (this.rcParams.hidemyself && this.username) {
            tUser = this.username;
        }
        else if (this.manager.hideusers.length > 0) {
            tUser = this.manager.hideusers[0];
        }
        else if (this.hideusers) {
            tUser = this.hideusers[0];
        }
        if (tUser != null) {
            params["rcexcludeuser"] = tUser;
        }
        if (this.rcParams.namespace || this.rcParams.namespace === "0") {
            params["rcnamespace"] = this.rcParams.namespace; 
        }
        if (this.useOutdatedLogSystem && this.rcParams.hidelogs == false) {
            tUrlList.push("logevents");
            params["leprop"] = ["details", "user", "title", "timestamp", "type", "ids"].join("|");
            params["letype"] = ["rights", "move", "delete", "block", "merge"].join("|");
            params["lelimit"] = this.rcParams.limit;
            params["leend"] = tEndDate.toISOString();
        }
        params["list"] = tUrlList.join("|");
        if (tMetaList.length > 0) {
            params["meta"] = tMetaList.join("|");
        }
        if (tPropList.length > 0) {
            params["prop"] = tPropList.join("|");
        }
        var tReturnText = this.scriptpath + "/api.php?action=query&format=json&continue=&" + Utils_1["default"].objectToUrlQueryData(params);
        tReturnText.replace(/ /g, "_");
        tUrlList = null;
        tMetaList = null;
        tPropList = null;
        tEndDate = null;
        Utils_1["default"].logUrl("[WikiData](getApiUrl)", tReturnText);
        return tReturnText;
    };
    WikiData.RC_PROPS = ["user", "flags", "title", "ids", "sizes", "timestamp", "loginfo", "parsedcomment", "comment"].join("|"); 
    return WikiData;
}());
exports["default"] = WikiData;

},{"./Global":1,"./UserData":12,"./Utils":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var $ = window.jQuery;
var mw = window.mediaWiki;
var i18n = function (pKey) {
    var pArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pArgs[_i - 1] = arguments[_i];
    }
    var _a;
    var tText;
    var devMsg = (_a = i18n.devI18n).msg.apply(_a, [pKey].concat(pArgs));
    if (devMsg.exists) {
        tText = devMsg.plain();
    }
    else {
        tText = i18n.MESSAGES[pKey];
    }
    if (tText == undefined) {
        mw.log("[RecentChangesMultiple.i18n]() '" + pKey + "' is undefined.");
        return pKey;
    }
    return i18n.wiki2html.apply(i18n, [tText].concat(pArgs));
};
i18n.defaultLang = "en";
i18n.init = function (pLang) {
    i18n.defaultLang = pLang ? pLang.toLowerCase() : Global_1["default"].config.wgUserLanguage;
    i18n.mwLanguageData = $.extend(i18n.mwLanguageData.en, i18n.mwLanguageData[i18n.defaultLang] || i18n.mwLanguageData[i18n.defaultLang.split("-")[0]]);
    mw.language.setData(Global_1["default"].config.wgUserLanguage, i18n.mwLanguageData); 
};
i18n.exists = function (pKey) {
    var devMsg = i18n.devI18n.msg(pKey);
    return devMsg.exists || i18n.MESSAGES[pKey];
};
var MESSAGES = i18n.MESSAGES = {
    'talkpagelinktext': 'Talk',
    'cur': 'cur',
    'last': 'prev',
    'recentchanges-legend': 'Recent changes options',
    'rclinks': 'Show last $1 changes in last $2 days<br />$3',
    'rcshowhideminor': '$1 minor edits',
    'rcshowhidebots': '$1 bots',
    'rcshowhideliu': '$1 logged-in users',
    'rcshowhideanons': '$1 anonymous users',
    'rcshowhidemine': '$1 my edits',
    'rcshowhideenhanced': '$1 grouped recent changes',
    'rcfilters-group-results-by-page': 'Group results by page',
    'rcshowhidelogs': '$1 logs',
    'rcfilters-filter-logactions-label': 'Logged actions',
    'diff': 'diff',
    'hist': 'hist',
    'hide': 'Hide',
    'show': 'Show',
    'minoreditletter': 'm',
    'newpageletter': 'N',
    'boteditletter': 'b',
    'unpatrolledletter': '!',
    'blocklink': 'block',
    'contribslink': 'contribs',
    'nchanges': '$1 {{PLURAL:$1|change|changes}}',
    'rollbacklink': 'rollback',
    'recentchanges-label-newpage': 'This edit created a new page',
    'recentchanges-label-minor': 'This is a minor edit',
    'recentchanges-label-bot': 'This edit was performed by a bot',
    'recentchanges-label-unpatrolled': 'This edit has not yet been patrolled',
    'rc-enhanced-expand': 'Show details (requires JavaScript)',
    'rc-enhanced-hide': 'Hide details',
    'semicolon-separator': ';&#32;',
    'pipe-separator': '&#32;|&#32;',
    'parentheses': '($1)',
    'rev-deleted-comment': '(edit summary removed)',
    'rev-deleted-user': '(username removed)',
    'rev-deleted-event': '(log action removed)',
    'and': '&#32;and',
    'recentchanges': 'Recent changes',
    'newpages': 'New pages',
    'newimages': 'New photos',
    'log': 'Logs',
    'insights': 'Insights',
    'randompage': 'Random page',
    'group-sysop': 'Administrators',
    'group-user': 'Users',
    'statistics-users-active': 'Active users',
    'prefs-files': 'Files',
    'awc-metrics-articles': 'Articles',
    'articles': 'Articles',
    'edits': 'Edits',
    'filedelete-success': "'''$1''' has been deleted.",
    'shared_help_was_redirect': 'This page is a redirect to $1',
    'redirectto': 'Redirect to:',
    'awc-metrics-images': 'Images',
    'images': 'Images',
    'wikiacuratedcontent-content-empty-section': 'This section needs some items',
    'expand_templates_input_missing': 'You need to provide at least some input wikitext.',
    'wikia-hubs-remove': 'Remove',
    'wall-message-remove': 'Remove',
    'undeletelink': 'view/restore',
    'admindashboard-control-analytics-label': 'Analytics',
    'abusefilter-history-hidden': 'Hidden',
    'revisionasof': 'Revision as of $1',
    'editold': 'edit',
    'editundo': 'undo',
    'blocklogpage': 'Block log',
    'dellogpage': 'Deletion log',
    'importlogpage': 'Import log',
    'mergelog': 'Merge log',
    'movelogpage': 'Move log',
    'protectlogpage': 'Protection log',
    'uploadlogpage': 'Upload log',
    'newuserlogpage': 'User creation log',
    'rightslog': 'User rights log',
    'useravatar-log': 'User avatar log',
    'userrenametool-logpage': 'User rename log',
    'wikifeatures-log-name': 'Wiki Features log',
    'chat-chatban-log': 'Chat ban log',
    'abusefilter-log': 'Abuse filter log',
    'blocklogentry': 'blocked [[$1]] with an expiry time of $2 $3',
    'reblock-logentry': 'changed block settings for [[$1]] with an expiry time of $2 $3',
    'unblocklogentry': 'unblocked $1',
    'block-log-flags-anononly': 'anonymous users only',
    'block-log-flags-nocreate': 'account creation disabled',
    'block-log-flags-noautoblock': 'autoblock disabled',
    'block-log-flags-noemail': 'e-mail blocked',
    'block-log-flags-nousertalk': 'cannot edit own talk page',
    'block-log-flags-angry-autoblock': 'enhanced autoblock enabled',
    'block-log-flags-hiddenname': 'username hidden',
    'logentry-delete-delete': '$1 deleted page $3',
    'logentry-delete-delete_redir': '$1 {{GENDER:$2|deleted}} redirect $3 by overwriting',
    'logentry-delete-restore': '$1 restored page $3',
    'logentry-delete-event': '$1 changed visibility of {{PLURAL:$5|a log event|$5 log events}} on $3: $4',
    'logentry-delete-revision': '$1 changed visibility of {{PLURAL:$5|a revision|$5 revisions}} on page $3: $4',
    'logentry-delete-event-legacy': '$1 changed visibility of log events on $3',
    'logentry-delete-revision-legacy': '$1 changed visibility of revisions on page $3',
    'revdelete-content-hid': 'content hidden',
    'revdelete-summary-hid': 'edit summary hidden',
    'import-logentry-upload': 'imported [[$1]] by file upload',
    'import-logentry-interwiki': 'transwikied $1',
    'pagemerge-logentry': 'merged [[$1]] into [[$2]] (revisions up to $3)',
    'logentry-move-move': '$1 moved page $3 to $4',
    'logentry-move-move-noredirect': '$1 moved page $3 to $4 without leaving a redirect',
    'logentry-move-move_redir': '$1 moved page $3 to $4 over redirect',
    'logentry-move-move_redir-noredirect': '$1 moved page $3 to $4 over a redirect without leaving a redirect',
    'protectedarticle': 'protected "[[$1]]"',
    'modifiedarticleprotection': 'changed protection level for "[[$1]]"',
    'unprotectedarticle': 'removed protection from "[[$1]]"',
    'movedarticleprotection': 'moved protection settings from "[[$2]]" to "[[$1]]"',
    'uploadedimage': 'uploaded "[[$1]]"',
    'overwroteimage': 'uploaded a new version of "[[$1]]"',
    'logentry-newusers-newusers': '$1 created a user account',
    'logentry-newusers-create': '$1 created a user account',
    'logentry-newusers-create2': '$1 created a user account $3',
    'logentry-newusers-autocreate': 'Account $1 was created automatically',
    'rightslogentry': 'changed group membership for $1 from $2 to $3',
    'rightslogentry-autopromote': 'was automatically promoted from $2 to $3',
    'rightsnone': '(none)',
    'blog-avatar-changed-log': 'Added or changed avatar',
    'blog-avatar-removed-log': "Removed $1's avatars",
    'userrenametool-success': 'The user "$1" has been renamed to "$2".',
    'chat-chatbanadd-log-entry': 'banned $1 from chat with an expiry time of $2, ends $3',
    'chat-chatbanremove-log-entry': 'unbanned $1 from chat',
    'chat-chatbanchange-log-entry': 'changed ban settings for $1 with an expiry time of $2, ends $3',
    'wall-recentchanges-edit': 'edited message',
    'wall-recentchanges-removed-thread': 'removed thread "[[$1|$2]]" from [[$3|$4\'s wall]]',
    'wall-recentchanges-removed-reply': 'removed reply from "[[$1|$2]]" from [[$3|$4\'s wall]]',
    'wall-recentchanges-restored-thread': 'restored thread "[[$1|$2]]" to [[$3|$4\'s wall]]',
    'wall-recentchanges-restored-reply': 'restored reply on "[[$1|$2]]" to [[$3|$4\'s wall]]',
    'wall-recentchanges-deleted-thread': 'deleted thread "[[$1|$2]]" from [[$3|$4\'s wall]]',
    'wall-recentchanges-deleted-reply': 'deleted reply from "[[$1|$2]]" from [[$3|$4\'s wall]]',
    'wall-recentchanges-closed-thread': 'closed thread "[[$1|$2]]" on [[$3|$4\'s wall]]',
    'wall-recentchanges-reopened-thread': 'reopened thread "[[$1|$2]]" on [[$3|$4\'s wall]]',
    'wall-recentchanges-thread-group': '$1 on [[$2|$3\'s wall]]',
    'wall-recentchanges-history-link': 'wall history',
    'wall-recentchanges-thread-history-link': 'thread history',
    'forum-recentchanges-edit': 'edited message',
    'forum-recentchanges-removed-thread': 'removed thread "[[$1|$2]]" from the [[$3|$4 Board]]',
    'forum-recentchanges-removed-reply': 'removed reply from "[[$1|$2]]" from the [[$3|$4 Board]]',
    'forum-recentchanges-restored-thread': 'restored thread "[[$1|$2]]" to the [[$3|$4 Board]]',
    'forum-recentchanges-restored-reply': 'restored reply on "[[$1|$2]]" to the [[$3|$4 Board]]',
    'forum-recentchanges-deleted-thread': 'deleted thread "[[$1|$2]]" from the [[$3|$4 Board]]',
    'forum-recentchanges-deleted-reply': 'deleted reply from "[[$1|$2]]" from the [[$3|$4 Board]]',
    'forum-recentchanges-thread-group': '$1 on the [[$2|$3 Board]]',
    'forum-recentchanges-history-link': 'board history',
    'forum-recentchanges-thread-history-link': 'thread history',
    'forum-recentchanges-closed-thread': 'closed thread "[[$1|$2]]" from [[$3|$4]]',
    'forum-recentchanges-reopened-thread': 'reopened thread "[[$1|$2]]" from [[$3|$4]]',
    'forum-related-discussion-heading': 'Discussions about $1',
    'embeddable-discussions-loading': 'Loading Discussions...',
    'allmessages-filter-all': 'All',
    'listusers-select-all': 'Select all',
    'socialactivity-page-title': 'Social Activity',
    'abusefilter-log-detailedentry-meta': '$1: $2 triggered $3, performing the action \"$4\" on $5.\nActions taken: $6;\nFilter description: $7 ($8)',
    'abusefilter-log-entry': '$1: $2 triggered an abuse filter, performing the action \"$3\" on $4.\nActions taken: $5;\nFilter description: $6',
    'abusefilter-action-block': 'Block',
    'abusefilter-action-blockautopromote': 'Block autopromote',
    'abusefilter-action-degroup': 'Remove from groups',
    'abusefilter-action-disallow': 'Disallow',
    'abusefilter-action-rangeblock': 'Range-block',
    'abusefilter-action-tag': 'Tag',
    'abusefilter-action-throttle': 'Throttle',
    'abusefilter-action-warn': 'Warn',
    "abusefilter-log-detailslink": "details",
    "abusefilter-changeslist-examine": "examine",
};
exports.legacyMessagesRemovedContent = [
    "insights",
    "useravatar-log",
    "wikifeatures-log-name",
    "blog-avatar-changed-log",
    "blog-avatar-removed-log",
    "chat-chatban-log",
    "chat-chatbanadd-log-entry",
    "chat-chatbanremove-log-entry",
    "chat-chatbanchange-log-entry",
    "wall-recentchanges-edit",
    "wall-recentchanges-removed-thread",
    "wall-recentchanges-removed-reply",
    "wall-recentchanges-restored-thread",
    "wall-recentchanges-restored-reply",
    "wall-recentchanges-deleted-thread",
    "wall-recentchanges-deleted-reply",
    "wall-recentchanges-closed-thread",
    "wall-recentchanges-reopened-thread",
    "wall-recentchanges-thread-group",
    "wall-recentchanges-history-link",
    "wall-recentchanges-thread-history-link",
    "forum-recentchanges-edit",
    "forum-recentchanges-removed-thread",
    "forum-recentchanges-removed-reply",
    "forum-recentchanges-restored-thread",
    "forum-recentchanges-restored-reply",
    "forum-recentchanges-deleted-thread",
    "forum-recentchanges-deleted-reply",
    "forum-recentchanges-thread-group",
    "forum-recentchanges-history-link",
    "forum-recentchanges-thread-history-link",
    "forum-recentchanges-closed-thread",
    "forum-recentchanges-reopened-thread",
];
i18n.mwLanguageData = {
    en: {
        "digitTransformTable": null,
        "separatorTransformTable": null,
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": []
    },
    be: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": " ",
            ".": ","
        },
        "grammarForms": {
            "родны": {
                "ВікіВіды": "ВікіВідаў",
                "ВікіКнігі": "ВікіКніг",
                "Вікікрыніцы": "Вікікрыніц",
                "ВікіНавіны": "ВікіНавін",
                "Вікіслоўнік": "Вікіслоўніка",
                "Вікіпедыя": "Вікіпедыі"
            },
            "вінавальны": {
                "Вікіпедыя": "Вікіпедыю"
            },
            "месны": {
                "ВікіВіды": "ВікіВідах",
                "ВікіКнігі": "ВікіКнігах",
                "Вікікрыніцы": "Вікікрыніцах",
                "ВікіНавіны": "ВікіНавінах",
                "Вікіслоўнік": "Вікіслоўніку",
                "Вікіпедыя": "Вікіпедыі"
            }
        },
        "pluralRules": [
            "n % 10 = 1 and n % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, … @decimal 1.0, 21.0, 31.0, 41.0, 51.0, 61.0, 71.0, 81.0, 101.0, 1001.0, …", "n % 10 = 2..4 and n % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, … @decimal 2.0, 3.0, 4.0, 22.0, 23.0, 24.0, 32.0, 33.0, 102.0, 1002.0, …", "n % 10 = 0 or n % 10 = 5..9 or n % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"
        ],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    ca: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": ".",
            ".": ","
        },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    de: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": ".",
            ".": ","
        },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    es: {
        "digitTransformTable": null,
        "separatorTransformTable": null,
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": []
    },
    gl: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": ".",
            ".": ","
        },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["pt", "en"]
    },
    it: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": " ",
            ".": ","
        },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    ja: {
        "digitTransformTable": null,
        "separatorTransformTable": null,
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    nl: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": ".", ".": "," },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    oc: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": " ",
            ".": ","
        },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    pl: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": " ", ".": "," },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    pt: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": " ", ".": "," },
        "grammarForms": [],
        "pluralRules": ["n = 0..2 and n != 2 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["pt-br", "en"]
    },
    "pt-br": {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": " ", ".": "," },
        "grammarForms": [],
        "pluralRules": ["n = 0..2 and n != 2 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["pt", "en"]
    },
    ro: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": ".", ".": "," },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1", "v != 0 or n = 0 or n != 1 and n % 100 = 1..19 @integer 0, 2~16, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    ru: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": " ", ".": "," },
        "grammarForms": [],
        "pluralRules": ["v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    tr: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": ".", ".": "," },
        "grammarForms": [],
        "pluralRules": ["n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    uk: {
        "digitTransformTable": null,
        "separatorTransformTable": { ",": " ", ".": "," },
        "grammarForms": {
            "genitive": {
                "Вікіпедія": "Вікіпедії",
                "Вікісловник": "Вікісловника",
                "Вікісховище": "Вікісховища",
                "Вікіпідручник": "Вікіпідручника",
                "Вікіцитати": "Вікіцитат",
                "Вікіджерела": "Вікіджерел",
                "Вікіновини": "Вікіновин",
                "Вікідані": "Вікіданих",
                "Вікімандри": "Вікімандрів"
            },
            "dative": {
                "Вікіпедія": "Вікіпедії",
                "Вікісловник": "Вікісловнику",
                "Вікісховище": "Вікісховищу",
                "Вікіпідручник": "Вікіпідручнику",
                "Вікіцитати": "Вікіцитатам",
                "Вікіджерела": "Вікіджерелам",
                "Вікіновини": "Вікіновинам",
                "Вікідані": "Вікіданим",
                "Вікімандри": "Вікімандрам"
            },
            "accusative": {
                "Вікіпедія": "Вікіпедію",
                "Вікісловник": "Вікісловник",
                "Вікісховище": "Вікісховище",
                "Вікіпідручник": "Вікіпідручник",
                "Вікіцитати": "Вікіцитати",
                "Вікіджерела": "Вікіджерела",
                "Вікіновини": "Вікіновини",
                "Вікідані": "Вікідані",
                "Вікімандри": "Вікімандри"
            },
            "instrumental": {
                "Вікіпедія": "Вікіпедією",
                "Вікісловник": "Вікісловником",
                "Вікісховище": "Вікісховищем",
                "Вікіпідручник": "Вікіпідручником",
                "Вікіцитати": "Вікіцитатами",
                "Вікіджерела": "Вікіджерелами",
                "Вікіновини": "Вікіновинами",
                "Вікідані": "Вікіданими",
                "Вікімандри": "Вікімандрами"
            },
            "locative": {
                "Вікіпедія": "у Вікіпедії",
                "Вікісловник": "у Вікісловнику",
                "Вікісховище": "у Вікісховищі",
                "Вікіпідручник": "у Вікіпідручнику",
                "Вікіцитати": "у Вікіцитатах",
                "Вікіджерела": "у Вікіджерелах",
                "Вікіновини": "у Вікіновинах",
                "Вікідані": "у Вікіданих",
                "Вікімандри": "у Вікімандрах"
            },
            "vocative": {
                "Вікіпедія": "Вікіпедіє",
                "Вікісловник": "Вікісловнику",
                "Вікісховище": "Вікісховище",
                "Вікіпідручник": "Вікіпідручнику",
                "Вікіцитати": "Вікіцитати",
                "Вікіджерела": "Вікіджерела",
                "Вікіновини": "Вікіновини",
                "Вікідані": "Вікідані",
                "Вікімандри": "Вікімандри"
            }
        },
        "pluralRules": [
            "v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"
        ],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["ru", "en"]
    },
    val: {
        "digitTransformTable": null,
        "separatorTransformTable": null,
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    vi: {
        "digitTransformTable": null,
        "separatorTransformTable": {
            ",": ".",
            ".": ","
        },
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["en"]
    },
    zh: {
        "digitTransformTable": null,
        "separatorTransformTable": null,
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["zh-hans", "en"]
    },
    "zh-hant": {
        "digitTransformTable": null,
        "separatorTransformTable": null,
        "grammarForms": [],
        "pluralRules": ["i = 1 and v = 0 @integer 1"],
        "digitGroupingPattern": null,
        "fallbackLanguages": ["zh-hans", "en"]
    },
};
i18n.wiki2html = function (pText) {
    var pArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pArgs[_i - 1] = arguments[_i];
    }
    if (pText == undefined) {
        mw.log("ERROR: [RecentChangesMultiple] i18n.wiki2html was passed an undefined string");
        return pText;
    }
    ;
    return pText
        .replace(/'''(.*?)'''/g, function (m, l) {
        return "<strong>" + l + "</strong>";
    })
        .replace(/''(.*?)''/g, function (m, l) {
        return "<em>" + l + "</em>";
    })
        .replace(/[^\[](http[^\[\s]*)/g, function (m, l) {
        return "<a href=\"" + l + "\">" + l + "</a>";
    })
        .replace(/\$(\d+)/g, function (match, number) {
        return typeof pArgs[number - 1] != 'undefined' ? pArgs[number - 1] : match;
    })
        .replace(/\[\[(.*?)\]\]/g, function (m, l) {
        var p = l.split(/\|/);
        var link = p.shift();
        return "<a href=\"" + link + "\">" + (p.length ? p.join('|') : link) + "</a>";
    })
        .replace(/[\[](https?:\/\/.*|\/\/.*)[!\]]/g, function (m, l) {
        var p = l.replace(/[\[\]]/g, '').split(/ /);
        var link = p.shift();
        return "<a href=\"" + link + "\">" + (p.length ? p.join(' ') : link) + "</a>";
    })
        .replace(/{{GENDER:(.*?)}}/g, function (m, l) {
        var p = l.split("|");
        var user = p.shift(); 
        return mw.language.gender(Global_1["default"].userOptions.gender, p);
    })
        .replace(/{{PLURAL:(.*?)}}/g, function (m, l) {
        var p = l.split("|");
        var num = p.shift();
        return mw.language.convertPlural(num, p);
    })
        .replace(/{{GRAMMAR:(.*?)}}/g, function (m, l) {
        var p = l.split("|");
        return mw.language.convertGrammar(p[1], p[0]);
    });
};
exports["default"] = i18n;

},{"./Global":1}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18n_1 = require("../i18n");
var WikiaMultiSelectDropdown =  (function () {
    function WikiaMultiSelectDropdown(element, options) {
        this.events = {};
        this.settings = {
            closeOnEscape: !0,
            closeOnOutsideClick: !0,
            eventNamespace: 'WikiaMultiSelectDropdown',
            onChange: null,
            onDocumentClick: null,
            onClick: null,
            onKeyDown: null,
            maxHeight: 390,
            minHeight: 30
        };
        this.settings = $.extend(this.settings, options);
        this.$document = $(document);
        this.$wrapper = $(element).addClass('closed');
    }
    WikiaMultiSelectDropdown.prototype.init = function () {
        this.$dropdown = this.$wrapper.find('.dropdown');
        this.$selectedItems = this.$wrapper.find('.selected-items');
        this.$selectedItemsList = this.$selectedItems.find('.selected-items-list');
        this.dropdownMarginBottom = parseFloat(this.$dropdown.css('marginBottom')) || 10;
        this.dropdownItemHeight = parseFloat(this.getItems().eq(0).css('lineHeight')) || 30;
        this.$checkboxes = this.getItems().find(':checkbox');
        this.$footerToolbar = $('.WikiaFooter .toolbar');
        this.updateDropdownHeight();
        this.updateSelectedItemsList();
        this.$selectAll = this.$dropdown.find('.select-all');
        this.$selectAll.on('change', this.selectAll.bind(this));
        this.$selectAll.prop('checked', this.everythingSelected());
        this.bindEvents();
        return this;
    };
    WikiaMultiSelectDropdown.prototype.bind = function (e, cb, scope) {
        if (typeof e == 'object') {
            scope = cb;
            for (var i in e) {
                if (i !== 'scope') {
                    this.bind(i, e[i], e.scope || scope);
                }
            }
        }
        else if ($.isArray(cb)) {
            for (var i_1 = 0; i_1 < cb.length; i_1++) {
                this.bind(e, cb[i_1], scope);
            }
        }
        else {
            scope = scope || this;
            this.events[e] = this.events[e] || [];
            this.events[e].push({
                fn: cb,
                scope: scope
            });
        }
        return true;
    };
    WikiaMultiSelectDropdown.prototype.unbind = function (e, cb, scope) {
        if (typeof e == 'object') {
            scope = cb;
            var ret = !1;
            for (var i in e) {
                if (i !== 'scope') {
                    ret = this.unbind(i, e[i], e.scope || scope) || ret;
                }
            }
            return ret;
        }
        else if ($.isArray(cb)) {
            var ret = !1;
            for (var i_2 = 0; i_2 < cb.length; i_2++) {
                ret = this.unbind(e, cb[i_2], scope) || ret;
            }
            return ret;
        }
        else {
            if (!this.events[e]) {
                return false;
            }
            scope = scope || this;
            for (var i in this.events[e]) {
                if (this.events[e][i].fn == cb && this.events[e][i].scope == scope) {
                    delete this.events[e][i];
                    return true;
                }
            }
            return false;
        }
    };
    WikiaMultiSelectDropdown.prototype.on = function (e, cb) {
        this.bind.apply(this, arguments);
    };
    WikiaMultiSelectDropdown.prototype.un = function (e, cb) {
        this.unbind.apply(this, arguments);
    };
    WikiaMultiSelectDropdown.prototype.relayEvents = function (o, e, te) {
        te = te || e;
        o.bind(e, function () {
            var a = [
                te
            ].concat(arguments);
            this.fire.apply(this, a);
        }, this);
    };
    WikiaMultiSelectDropdown.prototype.fire = function (e) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.events[e])
            return true;
        var ee = this.events[e];
        for (var i = 0; i < ee.length; i++) {
            if (typeof ee[i].fn == 'function') {
                var scope = ee[i].scope || this;
                if (ee[i].fn.apply(scope, args) === false) {
                    return false;
                }
            }
        }
        return true;
    };
    WikiaMultiSelectDropdown.prototype.bindEvents = function () {
        this.$wrapper.off('click.' + this.settings.eventNamespace).on('click.' + this.settings.eventNamespace, this.onClick.bind(this));
        this.getItems().off('click.' + this.settings.eventNamespace).on('click.' + this.settings.eventNamespace, this.onChange.bind(this));
        this.$document.off('click.' + this.settings.eventNamespace).off('keydown.' + this.settings.eventNamespace);
        if (this.settings.closeOnEscape || this.settings.onKeyDown) {
            this.$document.on('keydown.' + this.settings.eventNamespace, this.onKeyDown.bind(this));
        }
        if (this.settings.closeOnOutsideClick || this.settings.onDocumentClick) {
            this.$document.on('click.' + this.settings.eventNamespace, this.onDocumentClick.bind(this));
        }
        this.fire('bindEvents');
    };
    WikiaMultiSelectDropdown.prototype.disable = function () {
        this.close();
        this.$wrapper.addClass('disable');
    };
    WikiaMultiSelectDropdown.prototype.enable = function () {
        this.$wrapper.removeClass('disable');
    };
    WikiaMultiSelectDropdown.prototype.close = function () {
        this.$wrapper.removeClass('open').addClass('closed');
        this.fire('close');
        this.updateSelectedItemsList();
    };
    WikiaMultiSelectDropdown.prototype.open = function () {
        if (this.$wrapper.hasClass('disable')) {
            this.updateDropdownHeight();
            return true;
        }
        this.$wrapper.toggleClass('open closed');
        this.fire('open');
        this.updateDropdownHeight();
    };
    WikiaMultiSelectDropdown.prototype.getItems = function () {
        return this.$dropdown.find('.dropdown-item');
    };
    WikiaMultiSelectDropdown.prototype.getSelectedItems = function () {
        return this.$dropdown.find(':checked:not(.select-all)');
    };
    WikiaMultiSelectDropdown.prototype.isOpen = function () {
        return this.$wrapper.hasClass('open');
    };
    WikiaMultiSelectDropdown.prototype.onClick = function (event) {
        var $target = $(event.target);
        if ($target.is(this.getItems().find('label'))) {
            return;
        }
        if (!this.settings.onClick || this.settings.onClick() !== false) {
            if (!this.isOpen()) {
                this.open();
            }
        }
        this.fire('click', event);
    };
    WikiaMultiSelectDropdown.prototype.onChange = function (event) {
        var $checkbox = $(event.target);
        if (!this.settings.onChange || this.settings.onChange() !== false) {
            $checkbox.closest('.dropdown-item').toggleClass('selected');
        }
        if (this.$selectAll.is(':checked')) {
            this.$selectAll.toggleClass('modified', !this.everythingSelected());
        }
        this.fire('change', event);
    };
    WikiaMultiSelectDropdown.prototype.onKeyDown = function (event) {
        if (!this.settings.onKeyDown || this.settings.onKeyDown() !== false) {
            if (this.settings.closeOnEscape && event.keyCode == 27 && this.isOpen()) {
                this.close();
            }
        }
        this.fire('keyDown', event);
    };
    WikiaMultiSelectDropdown.prototype.onDocumentClick = function (event) {
        if (!this.settings.onDocumentClick || this.settings.onDocumentClick() !== false) {
            if (this.settings.closeOnOutsideClick && this.isOpen() && !$.contains(this.$wrapper[0], event.target)) {
                this.close();
            }
        }
        this.fire('documentClick', event);
    };
    WikiaMultiSelectDropdown.prototype.everythingSelected = function () {
        return this.getItems().length == this.getSelectedItems().length;
    };
    WikiaMultiSelectDropdown.prototype.selectAll = function (event) {
        var checked = this.$selectAll.removeClass('modified').is(':checked');
        this.doSelectAll(checked);
    };
    WikiaMultiSelectDropdown.prototype.doSelectAll = function (checked) {
        this.getItems().toggleClass('selected', checked).find(':checkbox').prop('checked', checked);
    };
    WikiaMultiSelectDropdown.prototype.updateDropdownHeight = function () {
        var dropdownOffset = this.$dropdown.offset().top, footerToolbarOffset = this.$footerToolbar.length ? this.$footerToolbar.offset().top : 0, dropdownHeight = dropdownOffset - this.dropdownMarginBottom;
        dropdownHeight = Math.min(this.settings.maxHeight, footerToolbarOffset ? (footerToolbarOffset - dropdownHeight) : dropdownHeight);
        dropdownHeight = Math.max(this.settings.minHeight, Math.floor(dropdownHeight / this.dropdownItemHeight) * this.dropdownItemHeight);
        this.$dropdown.height(dropdownHeight);
    };
    WikiaMultiSelectDropdown.prototype.updateSelectedItemsList = function () {
        var remaining, items = this.getItems(), maxDisplayed = 3, selected = [];
        this.$selectedItemsList.empty();
        items.each(function (i, element) {
            var $element = $(element), $checkbox = $element.find(':checkbox');
            if (!$checkbox.is(':checked')) {
                $checkbox.removeAttr('checked');
            }
            else {
                selected.push($element.find('label').text());
            }
        });
        var all = (items.length == selected.length);
        this.$selectedItemsList.append($('<strong>').text(all ? i18n_1["default"]('allmessages-filter-all') : selected.length > 0 ? selected.slice(0, maxDisplayed).join(', ') : i18n_1["default"]('rightsnone')));
        this.$dropdown.css('width', this.$selectedItems.outerWidth());
        this.fire('update');
    };
    WikiaMultiSelectDropdown.prototype.getSelectedValues = function () {
        return this.getSelectedItems().map(function () {
            return $(this).val();
        }).get();
    };
    return WikiaMultiSelectDropdown;
}());
exports.WikiaMultiSelectDropdown = WikiaMultiSelectDropdown;

},{"../i18n":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    (function ($, mw) {
        $.fn.makeCollapsibleRCM = function () {
            return this.each(function () {
                var _fn = 'jquery.makeCollapsibleRCM> ';
                var $that = $(this).addClass('rcmmw-collapsible'), that = this, collapsetext = $(this).attr('data-collapsetext'), expandtext = $(this).attr('data-expandtext'), $toggleLink, toggleElement = function ($collapsible, action, $defaultToggle, instantHide) {
                    if (instantHide === void 0) { instantHide = undefined; }
                    if (!$collapsible.jquery) {
                        return;
                    }
                    if (action != 'expand' && action != 'collapse') {
                        return;
                    }
                    if (typeof $defaultToggle == 'undefined') {
                        $defaultToggle = null;
                    }
                    if ($defaultToggle !== null && !($defaultToggle instanceof $)) {
                        return;
                    }
                    var $containers = null;
                    if (action == 'collapse') {
                        if ($collapsible.is('table')) {
                            $containers = $collapsible.find('>thead>tr, >tbody>tr');
                            if ($defaultToggle) {
                                $containers.not($defaultToggle.closest('tr')).stop(true, true).fadeOut();
                            }
                            else {
                                if (instantHide) {
                                    $containers.hide();
                                }
                                else {
                                    $containers.stop(true, true).fadeOut();
                                }
                            }
                        }
                        else if ($collapsible.is('ul') || $collapsible.is('ol')) {
                            $containers = $collapsible.find('> li');
                            if ($defaultToggle) {
                                $containers.not($defaultToggle.parent()).stop(true, true).slideUp();
                            }
                            else {
                                if (instantHide) {
                                    $containers.hide();
                                }
                                else {
                                    $containers.stop(true, true).slideUp();
                                }
                            }
                        }
                        else {
                            var $collapsibleContent = $collapsible.find('> .rcmmw-collapsible-content');
                            if ($collapsibleContent.length) {
                                if (instantHide) {
                                    $collapsibleContent.hide();
                                }
                                else {
                                    $collapsibleContent.slideUp();
                                }
                            }
                            else {
                                if ($collapsible.is('tr') || $collapsible.is('td') || $collapsible.is('th')) {
                                    $collapsible.fadeOut();
                                }
                                else {
                                    $collapsible.slideUp();
                                }
                            }
                        }
                    }
                    else {
                        if ($collapsible.is('table')) {
                            $containers = $collapsible.find('>thead>tr, >tbody>tr');
                            if ($defaultToggle) {
                                $containers.not($defaultToggle.parent().parent()).stop(true, true).fadeIn();
                            }
                            else {
                                $containers.stop(true, true).fadeIn();
                            }
                        }
                        else if ($collapsible.is('ul') || $collapsible.is('ol')) {
                            $containers = $collapsible.find('> li');
                            if ($defaultToggle) {
                                $containers.not($defaultToggle.parent()).stop(true, true).slideDown();
                            }
                            else {
                                $containers.stop(true, true).slideDown();
                            }
                        }
                        else {
                            var $collapsibleContent = $collapsible.find('> .rcmmw-collapsible-content');
                            if ($collapsibleContent.length) {
                                $collapsibleContent.slideDown();
                            }
                            else {
                                if ($collapsible.is('tr') || $collapsible.is('td') || $collapsible.is('th')) {
                                    $collapsible.fadeIn();
                                }
                                else {
                                    $collapsible.slideDown();
                                }
                            }
                        }
                        setTimeout(function () {
                            $(window).trigger('scroll');
                        }, 250);
                    }
                }, toggleLinkDefault = function (that, e) {
                    var $that = $(that), $collapsible = $that.closest('.rcmmw-collapsible.rcmmw-made-collapsible').toggleClass('rcmmw-collapsed');
                    e.preventDefault();
                    e.stopPropagation();
                    if (!$that.hasClass('rcmmw-collapsible-toggle-collapsed')) {
                        $that.removeClass('rcmmw-collapsible-toggle-expanded').addClass('rcmmw-collapsible-toggle-collapsed');
                        if ($that.find('> a').length) {
                            $that.find('> a').text(expandtext);
                        }
                        else {
                            $that.text(expandtext);
                        }
                        toggleElement($collapsible, 'collapse', $that);
                    }
                    else {
                        $that.removeClass('rcmmw-collapsible-toggle-collapsed').addClass('rcmmw-collapsible-toggle-expanded');
                        if ($that.find('> a').length) {
                            $that.find('> a').text(collapsetext);
                        }
                        else {
                            $that.text(collapsetext);
                        }
                        toggleElement($collapsible, 'expand', $that);
                    }
                    return;
                }, toggleLinkPremade = function ($that, e) {
                    var $collapsible = $that.eq(0).closest('.rcmmw-collapsible.rcmmw-made-collapsible').toggleClass('rcmmw-collapsed');
                    if ($(e.target).is('a')) {
                        return true;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    if (!$that.hasClass('rcmmw-collapsible-toggle-collapsed')) {
                        $that.removeClass('rcmmw-collapsible-toggle-expanded').addClass('rcmmw-collapsible-toggle-collapsed');
                        toggleElement($collapsible, 'collapse', $that);
                    }
                    else {
                        $that.removeClass('rcmmw-collapsible-toggle-collapsed').addClass('rcmmw-collapsible-toggle-expanded');
                        toggleElement($collapsible, 'expand', $that);
                    }
                    return;
                }, toggleLinkCustom = function ($that, e, $collapsible) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    var action = $collapsible.hasClass('rcmmw-collapsed') ? 'expand' : 'collapse';
                    $collapsible.toggleClass('rcmmw-collapsed');
                    toggleElement($collapsible, action, $that);
                }, buildDefaultToggleLink = function () {
                    return $('<a href="#"></a>').text(collapsetext).wrap('<span class="rcmmw-collapsible-toggle"></span>').parent().prepend('&nbsp;[').append(']&nbsp;').on('click.rcmmw-collapse', function (e) {
                        toggleLinkDefault(this, e);
                    });
                };
                if (!collapsetext) {
                    collapsetext = mw.msg('collapsible-collapse');
                }
                if (!expandtext) {
                    expandtext = mw.msg('collapsible-expand');
                }
                if ($that.hasClass('rcmmw-made-collapsible')) {
                    return;
                }
                else {
                    $that.addClass('rcmmw-made-collapsible');
                }
                if (($that.attr('id') || '').indexOf('rcmmw-customcollapsible-') === 0) {
                    var thatId = $that.attr('id'), $customTogglers = $('.' + thatId.replace('rcmmw-customcollapsible', 'rcmmw-customtoggle'));
                    mw.log(_fn + 'Found custom collapsible: #' + thatId);
                    if ($customTogglers.length) {
                        $customTogglers.on('click.rcmmw-collapse', function (e) {
                            toggleLinkCustom($(this), e, $that);
                        });
                    }
                    else {
                        mw.log(_fn + '#' + thatId + ': Missing toggler!');
                    }
                    if ($that.hasClass('rcmmw-collapsed')) {
                        $that.removeClass('rcmmw-collapsed');
                        toggleLinkCustom($customTogglers, null, $that);
                    }
                }
                else {
                    if ($that.is('table')) {
                        var $firstRowCells = $('tr:first th, tr:first td', that), $toggle = $firstRowCells.find('> .rcmmw-collapsible-toggle');
                        if (!$toggle.length) {
                            $toggleLink = buildDefaultToggleLink();
                            $firstRowCells.eq(-1).prepend($toggleLink);
                        }
                        else {
                            $toggleLink = $toggle.off('click.rcmmw-collapse').on('click.rcmmw-collapse', function (e) {
                                toggleLinkPremade($toggle, e);
                            });
                        }
                    }
                    else if ($that.is('ul') || $that.is('ol')) {
                        var $firstItem = $('li:first', $that), $toggle = $firstItem.find('> .rcmmw-collapsible-toggle');
                        if (!$toggle.length) {
                            var firstval = $firstItem.attr('value');
                            if (firstval === undefined || !firstval || firstval == '-1') {
                                $firstItem.attr('value', '1');
                            }
                            $toggleLink = buildDefaultToggleLink();
                            $that.prepend($toggleLink.wrap('<li class="rcmmw-collapsible-toggle-li"></li>').parent());
                        }
                        else {
                            $toggleLink = $toggle.off('click.rcmmw-collapse').on('click.rcmmw-collapse', function (e) {
                                toggleLinkPremade($toggle, e);
                            });
                        }
                    }
                    else {
                        var $toggle = $that.find('> .rcmmw-collapsible-toggle');
                        if (!$that.find('> .rcmmw-collapsible-content').length) {
                            $that.wrapInner('<div class="rcmmw-collapsible-content"></div>');
                        }
                        if (!$toggle.length) {
                            $toggleLink = buildDefaultToggleLink();
                            $that.prepend($toggleLink);
                        }
                        else {
                            $toggleLink = $toggle.off('click.rcmmw-collapse').on('click.rcmmw-collapse', function (e) {
                                toggleLinkPremade($toggle, e);
                            });
                        }
                    }
                }
                if ($that.hasClass('rcmmw-collapsed') && ($that.attr('id') || '').indexOf('rcmmw-customcollapsible-') !== 0) {
                    $that.removeClass('rcmmw-collapsed');
                    toggleElement($that, 'collapse', $toggleLink.eq(0), true);
                    $toggleLink.eq(0).click();
                }
            });
        };
    })(window.jQuery, window.mediaWiki);
}
exports["default"] = default_1;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
var appConfig = (window.dev = window.dev || {}).RecentChangesMultiple = window.dev.RecentChangesMultiple || {};
if (document.querySelectorAll('.rc-content-multiple, #rc-content-multiple')[0] == undefined) {
    console.log("RecentChangesMultiple tried to run despite no data. Exiting.");
}
else {
    Main_1["default"].init(appConfig);
    window.dev.RecentChangesMultiple.app = Main_1["default"];
}

},{"./Main":3}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RC_TYPE;
(function (RC_TYPE) {
    RC_TYPE[RC_TYPE["NORMAL"] = 0] = "NORMAL";
    RC_TYPE[RC_TYPE["LOG"] = 1] = "LOG";
    RC_TYPE[RC_TYPE["COMMENT"] = 2] = "COMMENT";
    RC_TYPE[RC_TYPE["WALL"] = 3] = "WALL";
    RC_TYPE[RC_TYPE["BOARD"] = 4] = "BOARD";
    RC_TYPE[RC_TYPE["DISCUSSION"] = 5] = "DISCUSSION";
})(RC_TYPE || (RC_TYPE = {}));
exports["default"] = RC_TYPE;

},{}]},{},[18]);
//</pre>