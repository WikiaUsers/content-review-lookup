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
exports.UNKNOWN_GENDER_TYPE = void 0;
var Utils_1 = require("./Utils");
var  mw = window.mediaWiki;
exports.UNKNOWN_GENDER_TYPE = undefined;
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
    Global.getWdsSymbol = function (pID, width, height) {
        if (width === void 0) { width = 12; }
        if (height === void 0) { height = width; }
        return "<svg class='rcm-svg-icon wds-icon wds-icon-tiny' width=\"" + width + "\" height=\"" + height + "\"><use xlink:href=\"#" + pID + "\" width=\"" + width + "\" height=\"" + height + "\" /></svg>";
    };
    Global.initSymbols = function () {
        if (!Global.SVG_SYMBOLS) {
            return "";
        }
        var tSVG = "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" style=\"height: 0px; width: 0px; position: absolute; overflow: hidden;\">'\n\t\t\t" + Global.SVG_SYMBOLS.join("") + "\n\t\t</svg>";
        delete Global.SVG_SYMBOLS;
        return tSVG;
    };
    Global.showUpdateMessage = function (pMessageCont) {
        Global._addUpdateMessage(pMessageCont, {
            messageID: "rcm-news-no-external",
            messageColor: "gold",
            endDate: "Feb 16 2024 00:00:00 GMT",
            message: "\n\t\t\tDue to security concerns, external non-fandom wikis can no longer be loaded via this script. Thank you for your understanding.\n\t\t\t",
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
    Global.version = "2.17";
    Global.lastVersionDateString = "Jan 26 2024 00:00:00 GMT";
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
        "<symbol id=\"rcm-disc-comment\" viewBox=\"0 0 12 12\"><path id=\"comment-tiny\" d=\"M4.5 2c-.668 0-1.293.26-1.757.731A2.459 2.459 0 0 0 2 4.5c0 1.235.92 2.297 2.141 2.47A1 1 0 0 1 5 7.96v.626l1.293-1.293A.997.997 0 0 1 7 7h.5c.668 0 1.293-.26 1.757-.731.483-.476.743-1.1.743-1.769C10 3.122 8.878 2 7.5 2h-3zM4 12a1 1 0 0 1-1-1V8.739A4.52 4.52 0 0 1 0 4.5c0-1.208.472-2.339 1.329-3.183A4.424 4.424 0 0 1 4.5 0h3C9.981 0 12 2.019 12 4.5a4.432 4.432 0 0 1-1.329 3.183A4.424 4.424 0 0 1 7.5 9h-.086l-2.707 2.707A1 1 0 0 1 4 12z\"></path></symbol>",
        "<symbol id=\"rcm-disc-reply\" viewBox=\"0 0 12 12\"><path id=\"reply-tiny\" d=\"M4.998 4H3.412l2.293-2.293A.999.999 0 1 0 4.291.293l-3.999 4a1 1 0 0 0 0 1.415l3.999 4a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.415L3.412 6h1.586c2.757 0 5 2.243 5 5a1 1 0 1 0 2 0c0-3.86-3.141-7-7-7\"></path></symbol>",
        "<symbol id=\"rcm-disc-poll\" viewBox=\"0 0 12 12\"><path id=\"poll-tiny\" d=\"M2 7a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1zm8-3a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zM6 0a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z\"></path></symbol>",
        "<symbol id=\"rcm-disc-image\" viewBox=\"0 0 12 12\"><path id=\"image-tiny\" d=\"M10 6.243l-.646-.646a.5.5 0 0 0-.708 0L7 7.243 3.854 4.097a.5.5 0 0 0-.708 0L2 5.243V2h8v4.243zM10 10H2V6.657l1.5-1.5 3.146 3.147a.502.502 0 0 0 .708 0L9 6.657l1 1V10zm1-10H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zM6.65 4.35c.09.1.22.15.35.15.07 0 .13-.01.19-.04.06-.02.12-.06.16-.11.05-.04.09-.1.11-.16.03-.06.04-.12.04-.19a.472.472 0 0 0-.15-.35.355.355 0 0 0-.16-.11.495.495 0 0 0-.54.11.472.472 0 0 0-.15.35c0 .07.01.13.04.19.02.06.06.12.11.16\"></path></symbol>",
    ];
    return Global;
}());
exports["default"] = Global;

},{"./Utils":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewDiscussionHTML = exports.previewPage = exports.previewImages = exports.previewDiff = void 0;
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var Global_1 = require("./Global");
var RCMModal_1 = require("./RCMModal");
var rc_data_1 = require("./rc_data");
var $ = window.jQuery, mw = window.mediaWiki;
function previewDiff(pPageName, pageID, pAjaxUrl, pDiffLink, pUndoLink, pDiffTableInfo) {
    Utils_1["default"].logUrl("(previewDiff)", pAjaxUrl);
    mw.log(pDiffLink);
    mw.log(pUndoLink);
    var tTitle = pPageName + " - " + i18n_1["default"]('modal-diff-title');
    var tButtons = [modalLinkButton('modal-diff-open', "diff", pDiffLink)];
    if (pUndoLink != null) {
        tButtons.push(modalLinkButton('modal-diff-undo', "undo", pUndoLink));
    }
    var getRcUrl = function (params) { return pDiffTableInfo.wikiInfo.getPageUrl(pDiffTableInfo.titleUrlEscaped, params); };
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
            var tModalContent = [
                "<div id='rcm-diff-view'>",
                "<table class='diff'>",
                "<colgroup>",
                "<col class='diff-marker'>",
                "<col class='diff-content'>",
                "<col class='diff-marker'>",
                "<col class='diff-content'>",
                "</colgroup>",
                "<tbody>",
                "<tr class='diff-header' valign='top'>",
                "<td class='diff-otitle' colspan='2'>",
                "<div class='mw-diff-otitle1'>",
                "<strong>",
                "<a href='" + getRcUrl({ oldid: tRevision.diff.from }) + "' data-action='revision-link-before'>",
                i18n_1["default"]('revisionasof', Utils_1["default"].formatWikiTimeStamp(tRevDate), Utils_1["default"].formatWikiTimeStampDateOnly(tRevDate), Utils_1["default"].formatWikiTimeStampTimeOnly(tRevDate)),
                "</a>",
                " <span class='mw-rev-head-action'>",
                "(<a href=\"" + getRcUrl({ oldid: tRevision.diff.from, action: 'edit' }) + "\" data-action=\"edit-revision-before\">" + i18n_1["default"]('editold') + "</a>)",
                "</span>",
                "</strong>",
                "</div>",
                "<div class='mw-diff-otitle2'>" + rc_data_1.RCDataArticle.formatUserDetails(pDiffTableInfo.wikiInfo, tRevision.user, tRevision.userhidden == "", tRevision.anon != "") + "</div>",
                "<div class='mw-diff-otitle3'>" + tOMinor + rc_data_1.RCDataAbstract.renderSummary(rc_data_1.RCDataArticle.tweakParsedComment(tRevision.parsedcomment, tRevision.commenthidden == "", pDiffTableInfo.wikiInfo)) + "</div>",
                "</td>",
                "<td class='diff-ntitle' colspan='2'>",
                "<div class='mw-diff-ntitle1'>",
                "<strong>",
                "<a href='" + getRcUrl({ oldid: tRevision.diff.to }) + "' data-action='revision-link-after'>",
                i18n_1["default"]('revisionasof', Utils_1["default"].formatWikiTimeStamp(tNewRevDate), Utils_1["default"].formatWikiTimeStampDateOnly(tNewRevDate), Utils_1["default"].formatWikiTimeStampTimeOnly(tNewRevDate)),
                "</a>",
                " <span class='mw-rev-head-action'>",
                "(<a href=\"" + getRcUrl({ oldid: tRevision.diff.to, action: 'edit' }) + "\" data-action=\"edit-revision-after\">" + i18n_1["default"]('editold') + "</a>)",
                "</span>",
                "<span class='mw-rev-head-action'>",
                "(<a href=\"" + getRcUrl({ action: 'edit', undoafter: tRevision.diff.to, undo: tRevision.diff.to }) + "\" data-action=\"undo\">" + i18n_1["default"]('editundo') + "</a>)",
                "</span>",
                "</strong>",
                "</div>",
                "<div class='mw-diff-ntitle2'>" + pDiffTableInfo.newRev.user + "</div>",
                "<div class='mw-diff-ntitle3'>" + tNMinor + pDiffTableInfo.newRev.summary + "</div>",
                "</td>",
                "</tr>",
                tRevision.diff["*"],
                "</tbody>",
                "</table>",
                "</div>",
            ].join("");
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
    var tTitle = i18n_1["default"]("images");
    var tButtons = [];
    var tAddLoadMoreButton = function () {
        var tModal = document.querySelector("#" + RCMModal_1["default"].MODAL_CONTENT_ID);
        if (!!tModal && tImagesInLog.length > 0) {
            mw.log("Over 50 images to display; Extra images must be loaded later.");
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
            thumbHref: pArticlePath + Utils_1["default"].escapeCharactersUrl(tTitle),
            thumbText: i18n_1["default"]('filedelete-success', tTitle)
        };
    }
    else if (tImage == null) {
        tInvalidImage = {
            thumbHref: pArticlePath + Utils_1["default"].escapeCharactersUrl(tTitle),
            thumbText: i18n_1["default"]('redirectto') + " " + tTitle
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
            caption: tPageTitleNoNS, });
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
            var _a;
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
                var tCurPageHead = (_a = document.querySelector("head")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
                Utils_1["default"].forEach(tCurPageHead.querySelectorAll("link[rel=stylesheet]"), function (o) {
                    tCont.innerHTML += "<style> @import url(" + o.href + "); </style>"; 
                });
                Utils_1["default"].forEach(tCurPageHead.querySelectorAll("link"), function (o) { Utils_1["default"].removeElement(o); });
                Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link[rel=stylesheet]"), function (o) {
                    tCont.innerHTML += "<style> @import url(" + o.href + "); </style>"; 
                });
                Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link"), function (o) { Utils_1["default"].removeElement(o); });
                tCont.innerHTML += tCurPageHead.innerHTML;
                tCont.innerHTML += "\n<!-- Loaded Wiki Styles -->\n";
                tCont.innerHTML += tPreviewHead.innerHTML;
                tCont.innerHTML += tContentText;
            }
            else if ("scoped" in document.createElement("style")) {
                var tPreviewHead = Utils_1["default"].newElement("div", { innerHTML: pData.parse.headhtml["*"] });
                Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link[rel=stylesheet]"), function (o) {
                    tCont.innerHTML += "<style scoped> @import url(" + o.href + "); </style>"; 
                });
            }
            Utils_1["default"].forEach(tCont.querySelectorAll("a[href^='/']"), function (o) {
                o.href = pServerLink + o.getAttribute("href");
            });
            mw.hook('wikipage.content').fire($(tCont)); 
        });
    });
}
exports.previewPage = previewPage;
function previewDiscussionHTML(rc) {
    var _a;
    var _b = rc.previewData, jsonModel = _b.jsonModel, attachments = _b.attachments, poll = _b.poll;
    var html = "";
    if (poll) {
        var answers = poll.answers, question = poll.question, totalVotes_1 = poll.totalVotes;
        var isImagePoll = !!((_a = answers === null || answers === void 0 ? void 0 : answers[0]) === null || _a === void 0 ? void 0 : _a.image);
        var customStyles_1 = {
            poll__answers: "display: flex; align-items: flex-end; flex-wrap: wrap; text-align: center;",
            imageCont: "width: 175px; height: 175px; position: relative;",
            image: "object-fit: cover; height: 100%; left: 0; position: absolute; top: 0; width: 100%;",
        };
        html = "\n\t\t<section class=\"post-info\">\n\t\t\t<header class=\"post-info__title\" role=\"presentation\" itemprop=\"headline\">\n\t\t\t\t<!-- <a class=\"post-info__title-link\" href=\"/f/p/" + rc.threadId + "\">" + question + "</a> -->\n\t\t\t\t<big class=\"post-info__title-link\">" + question + "</big>\n\t\t\t</header>\n\t\t\t<div>\n\t\t\t\t<div class=\"" + (isImagePoll ? 'image-poll' : 'post-poll') + "\" itemscope=\"\" itemtype=\"http://schema.org/Question\">\n\t\t\t\t\t" + (!isImagePoll
            ? "\n\t\t\t\t\t\t" + answers.map(function (ans) { return "\n\t\t\t\t\t\t<div class=\"post-poll__answer\" role=\"presentation\" itemscope=\"\" itemtype=\"http://schema.org/Answer\">\n\t\t\t\t\t\t\t<span class=\"post-poll__text\" itemprop=\"text\">" + ans.text + "</span>\n\t\t\t\t\t\t\t<span class=\"post-poll__votes\" itemprop=\"upvoteCount\">" + Math.floor(ans.votes / totalVotes_1) + "%</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t"; }).join("") + "\n\t\t\t\t\t"
            : "\n\t\t\t\t\t<div class=\"image-poll__answers image-poll__answers-4\" style=\"" + customStyles_1.poll__answers + "\">\n\t\t\t\t\t\t" + answers.map(function (ans) {
                var _a;
                return "\n\t\t\t\t\t\t<div class=\"image-poll__answer\" role=\"presentation\" itemscope=\"\" itemtype=\"http://schema.org/Answer\">\n\t\t\t\t\t\t\t<div class=\"image-poll__image-wrapper\"  style=\"" + customStyles_1.imageCont + "\">\n\t\t\t\t\t\t\t\t<img class=\"image-poll__image\" style=\"" + customStyles_1.image + "\" sizes=\"(max-width: 420px) 180px, 370px\" src=\"" + ((_a = ans.image) === null || _a === void 0 ? void 0 : _a.url) + "\" alt=\"\" loading=\"lazy\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"image-poll__gradient-wrapper\"></div>\n\t\t\t\t\t\t\t<span class=\"image-poll__text\" itemprop=\"text\">" + ans.text + "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t";
            }).join("") + "\n\t\t\t\t\t</div>\n\t\t\t\t\t") + "\n\t\t\t\t\t<div class=\"post-poll__vote\">\n\t\t\t\t\t\t<p class=\"post-poll__total-votes\" itemprop=\"answerCount\" role=\"presentation\">" + totalVotes_1 + " Votes in Poll</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\t\t";
    }
    else {
        var jsonModelDataToString_1 = function (props) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var recur = function (content) { return content === null || content === void 0 ? void 0 : content.map(jsonModelDataToString_1).join(""); };
            switch (props.type) {
                case "doc": return "<div class=\"entity-content\">" + ((_a = recur(props.content)) !== null && _a !== void 0 ? _a : "") + "</div>";
                case "paragraph": return "<p>" + ((_b = recur(props.content)) !== null && _b !== void 0 ? _b : "<br />") + "</p>";
                case "code_block": return "<pre><code>" + ((_c = recur(props.content)) !== null && _c !== void 0 ? _c : "<br />") + "</code></pre>";
                case "bulletList": return "<ul>" + ((_d = recur(props.content)) !== null && _d !== void 0 ? _d : "") + "</ul>";
                case "orderedList": return "<ol>" + ((_e = recur(props.content)) !== null && _e !== void 0 ? _e : "") + "</ol>";
                case "listItem": return "<li>" + ((_f = recur(props.content)) !== null && _f !== void 0 ? _f : "") + "</li>";
                case "image": return "<div class=\"post__image-wrapper\"><img src=\"" + ((_h = (_g = attachments[0]) === null || _g === void 0 ? void 0 : _g.contentImages[props.attrs.id]) === null || _h === void 0 ? void 0 : _h.url) + "\" style=\"max-width: 100%;\" /></div>";
                case "text": {
                    var text_1 = (_j = props.text) !== null && _j !== void 0 ? _j : "";
                    (_k = props.marks) === null || _k === void 0 ? void 0 : _k.forEach(function (mark) {
                        switch (mark.type) {
                            case 'strong':
                                text_1 = "<strong>" + text_1 + "</strong>";
                                break;
                            case 'em':
                                text_1 = "<em>" + text_1 + "</em>";
                                break;
                            case 'link':
                                text_1 = "<a href=\"" + mark.attrs.href + "\" " + (mark.attrs.title ? "title=\"" + mark.attrs.title + "\"" : '') + " target=\"_blank\">" + text_1 + "</a>";
                                break;
                        }
                    });
                    return text_1;
                }
                case "openGraph": {
                    var graphData = (_l = attachments[0]) === null || _l === void 0 ? void 0 : _l.openGraphs[props.attrs.id];
                    var customStyles = {
                        imageCont: "max-height: 175px; max-width: 175px;",
                        post__og: "line-height:0;",
                        post__og_link: "line-height:0; display: block;",
                        post__og_wrapper: "border: 1px solid var(--theme-border-color);",
                        post__og_summary: "white-space: normal;",
                        post__og_source: "white-space: normal;",
                    };
                    return "<div class=\"post__og\" style=\"" + customStyles.post__og + "\">\n\t\t\t\t\t\t<a class=\"post__og-link\" target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + graphData.url + "\" style=\"" + customStyles.post__og_link + "\">\n\t\t\t\t\t\t\t<span class=\"post__og-data-wrapper\" itemscope=\"\" itemtype=\"http://schema.org/Article\" style=\"" + customStyles.post__og_wrapper + "\">\n\t\t\t\t\t\t\t\t<span class=\"post__og-image-container\" style=\"" + customStyles.imageCont + "\">\n\t\t\t\t\t\t\t\t\t<img class=\"post__og-image\" style=\"background-image: url(&quot;" + graphData.imageUrl + "&quot;);\" src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" alt=\"Doodle Champion Island Games!\" itemprop=\"image\" role=\"presentation\" loading=\"lazy\">\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"post__og-details\">\n\t\t\t\t\t\t\t\t\t<span class=\"post__og-summary\" style=\"" + customStyles.post__og_summary + "\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"post__og-title\" itemprop=\"headline\">" + graphData.title + "</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t" + (graphData.siteName ? "<span class=\"post__og-source\" itemprop=\"publisher\" style=\"" + customStyles.post__og_source + "\">\n\t\t\t\t\t\t\t\t\t\t" + graphData.siteName + "\n\t\t\t\t\t\t\t\t\t\t<svg class=\"wds-icon wds-icon-tiny\"><use xlink:href=\"#wds-icons-external-tiny\"></use></svg>\n\t\t\t\t\t\t\t\t\t</span>" : '') + "\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>";
                }
            }
            mw.log("RCM: Unknown discussion preview type", rc.wikiInfo.servername, props);
            return "";
        };
        html = jsonModelDataToString_1(jsonModel);
    }
    var title = rc.containerType != "ARTICLE_COMMENT" ? rc.threadTitle : i18n_1["default"]("rc-comment", rc.forumName);
    ;
    var buttons = [
        modalLinkButton('modal-preview-openpage', "view", rc.href),
    ];
    RCMModal_1["default"].showModal({ title: title, content: html, buttons: buttons });
}
exports.previewDiscussionHTML = previewDiscussionHTML;
function modalLinkButton(text, event, link) {
    return { text: i18n_1["default"](text), event: event, callback: function () { window.open(link, '_blank'); } };
}

},{"./Global":1,"./RCMModal":6,"./Utils":10,"./i18n":12,"./rc_data":20}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RCMManager_1 = require("./RCMManager");
var Global_1 = require("./Global");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RCMModal_1 = require("./RCMModal");
var makeCollapsible_1 = require("./lib/makeCollapsible");
var $ = window.jQuery, mw = window.mediaWiki;
var Notification = window.Notification;
var Main =  (function () {
    function Main() {
        this._blinkInterval = 0;
        this._originalTitle = document.title;
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
            $(_this._ready.bind(_this)); 
            $(document).on("unload", _this._unload.bind(_this));
            $(window).on('focus', _this._onFocus.bind(_this));
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
            Global_1["default"].loadDelay = parseFloat(tDataset.loaddelay);
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
        var tLoadPromises = [];
        Utils_1["default"].newElement("link", { rel: "stylesheet", type: "text/css", href: "https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:RecentChangesMultiple.css&only=styles" }, document.head);
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
            'mediawiki.special.changeslist',
            'mediawiki.special.changeslist.enhanced',
            'ext.fandom.photoGallery.gallery.css',
            "mediawiki.diff.styles", 
        ])
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
        tLoadPromises.forEach(function (p) { p["catch"](console.error); });
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
        Utils_1["default"].forEach(tWrappers, function (pNode, pI) {
            if (pNode.rcm_wrapper_used) {
                mw.log("[Main](_parsePage) Wrapper already parsed; exiting.");
                return;
            }
            pNode.rcm_wrapper_used = true;
            var tRCMManager = new RCMManager_1["default"](pNode, pI);
            _this.rcmList.push(tRCMManager);
            pInitDef.done(function () {
                tRCMManager.init();
            });
        });
        $(".rcm-refresh-all").on("click", function () { _this._refreshAllManagers(); });
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
            var tMissing = [];
            function tRCM_loadLangMessage(pMessages) {
                var tScriptPath = Global_1["default"].useLocalSystemMessages ? Global_1["default"].config.wgServer + Global_1["default"].config.wgScriptPath : "//community.fandom.com";
                var url = tScriptPath + "/api.php?action=query&format=json&meta=allmessages&amlang=" + i18n_1["default"].defaultLang + "&ammessages=" + pMessages.join("|");
                Utils_1["default"].logUrl("", url);
                return $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: url }).done(function (pData) {
                    var _a;
                    if (!((_a = pData === null || pData === void 0 ? void 0 : pData.query) === null || _a === void 0 ? void 0 : _a.allmessages))
                        return; 
                    $.each(pData.query.allmessages, function (index, message) {
                        if (message.missing !== '') {
                            i18n_1["default"].MESSAGES[message.name] = message['*'];
                        }
                        else {
                            tMissing.push([message.name, i18n_1["default"].MESSAGES[message.name]]);
                        }
                    });
                });
            }
            var tLangLoadAjaxPromises = Utils_1["default"].chunkArray(Object.keys(i18n_1["default"].MESSAGES), 50)
                .map(function (arr) { return tRCM_loadLangMessage(arr); });
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
        this._blinkInterval = 0;
        document.title = this._originalTitle;
    };
    Main.prototype.addNotification = function (pTitle, pOptions) {
        var _a;
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
        if (this._notifications.length > 1) {
            (_a = this._notifications.shift()) === null || _a === void 0 ? void 0 : _a.close();
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
        return window.importArticles({
            type: 'script',
            articles: articles
        });
    };
    return Main;
}());
exports["default"] = new Main();

},{"./Global":1,"./RCMManager":5,"./RCMModal":6,"./Utils":10,"./i18n":12,"./lib/makeCollapsible":14}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var $ = window.jQuery, mw = window.mediaWiki;
var TIMEOUT = 15000; 
var MultiLoader =  (function () {
    function MultiLoader(manager) {
        this.manager = manager;
        this.state = "idle";
        this.ajaxID = this.manager.ajaxID;
        this.totalItemsToLoad = 0;
        this.itemsLoaded = 0;
        this.delayStack = 0;
        this.maxTries = 0;
        this.erroredItems = [];
    }
    Object.defineProperty(MultiLoader.prototype, "AjaxID", {
        get: function () { return this.ajaxID; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultiLoader.prototype, "ErroredItems", {
        get: function () { return this.erroredItems; },
        enumerable: false,
        configurable: true
    });
    MultiLoader.prototype.multiLoad = function (_a) {
        var _this = this;
        var list = _a.list, buildUrl = _a.buildUrl, onCheckInvalid = _a.onCheckInvalid, onProgress = _a.onProgress, onSingleLoadFinished = _a.onSingleLoadFinished, onSingleError = _a.onSingleError, maxTries = _a.maxTries, _b = _a.dataType, dataType = _b === void 0 ? "jsonp" : _b;
        if (this.state === "running") {
            console.error("[RCM] Loader started while loader already running");
            return Promise.reject();
        }
        if (list.length == 0) {
            return Promise.resolve([]);
        } 
        this.state = "running";
        this.ajaxID = this.manager.ajaxID;
        this.totalItemsToLoad = list.length;
        this.itemsLoaded = 0;
        this.delayStack = 0;
        this.maxTries = maxTries;
        this.erroredItems = [];
        onProgress(0);
        return Promise.all(list.map(function (item) { return new Promise(function (resolve, reject) {
            var url = buildUrl(item);
            var doSingleLoad = function (tries) {
                _this.singleLoadWithRetries({ url: url, item: item, onCheckInvalid: onCheckInvalid, tries: tries, maxTries: _this.maxTries, dataType: dataType })
                    .then(function (data) {
                    _this.itemsLoaded++;
                    onProgress(_this.getProgress());
                    onSingleLoadFinished(data, item);
                    resolve();
                })["catch"](function (e) {
                    var errorData = { tries: e.tries, item: item, retry: doSingleLoad, remove: function () {
                            _this.totalItemsToLoad--;
                            onProgress(_this.getProgress());
                            resolve();
                        } };
                    _this.erroredItems.push(errorData);
                    onSingleError(e, item, errorData);
                });
            };
            doSingleLoad(0);
        }); }));
    };
    MultiLoader.prototype.singleLoadWithRetries = function (_a) {
        var _this = this;
        var url = _a.url, item = _a.item, onCheckInvalid = _a.onCheckInvalid, _b = _a.tries, tries = _b === void 0 ? 0 : _b, maxTries = _a.maxTries, dataType = _a.dataType;
        return new Promise(function (resolve, reject) {
            var doSingleLoad = function (tries) {
                tries++;
                var doReject = function (reason) { return reject(reason); };
                _this.ajaxLoad(url, dataType, _this.getNextDelay())
                    .then(function (data) {
                    var invalid = onCheckInvalid(data, item);
                    if (invalid) {
                        if ("halt" in invalid && invalid.halt === true) {
                            return doReject({ id: "unknown", error: invalid.error, tries: tries });
                        }
                        if ("servername" in item)
                            mw.log("Error parsing " + item.servername + " (" + tries + "/" + maxTries + " tries)");
                        if (tries >= maxTries) {
                            return doReject({ id: "max-tries", erroredItem: item, tries: tries });
                        }
                        return doSingleLoad(tries);
                    }
                    resolve(data);
                })["catch"](function (status) {
                    if (status === "timeout") {
                        return doReject({ id: "timeout", tries: tries });
                    }
                    if ("servername" in item)
                        mw.log("Error loading " + item.servername + " (" + tries + "/" + maxTries + " tries)");
                    if (tries >= maxTries) {
                        return doReject({ id: "max-tries", erroredItem: item, tries: tries, status: status });
                    }
                    return doSingleLoad(tries);
                });
            };
            doSingleLoad(tries);
        });
    };
    MultiLoader.prototype.ajaxLoad = function (url, dataType, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var id = this.ajaxID;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                $.ajax({ type: 'GET', url: url, dataType: dataType, timeout: TIMEOUT, data: {} })
                    .done(function (data) {
                    if (_this.checkStop(id)) {
                        return;
                    }
                    resolve(data);
                })
                    .fail(function (data, status) {
                    if (_this.checkStop(id)) {
                        return;
                    }
                    reject(status);
                });
            }, delay);
        });
    };
    MultiLoader.prototype.retry = function (incMaxTries) {
        this.maxTries += incMaxTries;
        this.delayStack = 0; 
        this.erroredItems.forEach(function (_a) {
            var tries = _a.tries, retry = _a.retry;
            return retry(tries);
        });
        this.erroredItems = [];
    };
    MultiLoader.prototype.removeAllErroredWikis = function () {
        this.erroredItems.forEach(function (_a) {
            var remove = _a.remove;
            return remove();
        });
        this.erroredItems = [];
    };
    MultiLoader.prototype.getProgress = function () {
        return Math.round(this.itemsLoaded / this.totalItemsToLoad * 100);
    };
    MultiLoader.prototype.checkStop = function (ajaxID) {
        return ajaxID != this.manager.ajaxID;
    };
    MultiLoader.prototype.getNextDelay = function () {
        return this.delayStack += Global_1["default"].loadDelay;
    };
    return MultiLoader;
}());
exports["default"] = MultiLoader;

},{"./Global":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
var Global_1 = require("./Global");
var i18n_1 = require("./i18n");
var WikiData_1 = require("./WikiData");
var rc_data_1 = require("./rc_data");
var RCMWikiPanel_1 = require("./RCMWikiPanel");
var RCMOptions_1 = require("./RCMOptions");
var Utils_1 = require("./Utils");
var RCMModal_1 = require("./RCMModal");
var MultiLoader_1 = require("./MultiLoader");
var $ = window.jQuery, mw = window.mediaWiki;
var RCMManager =  (function () {
    function RCMManager(pWrapper, pModID) {
        var _this = this;
        this._updateLoadingPercent = function (perc) {
            $(_this.modID + " .rcm-load-perc").html(perc + "%"); 
        };
        this._handleWikiDataLoadError = function (pWikiData, pTries, pID, pErrorMessage, pInc) {
            var errorCont = $("<div>").appendTo($(_this.statusNode).find(".rcm-status-alerts-cont"));
            var string = "<div class='rcm-error'>" + i18n_1["default"](pErrorMessage, "[<span class='errored-wiki'>" + mw.html.escape(pWikiData.servername) + "</span>]", pTries) + "</div>";
            if (pErrorMessage == "error-loading-syntaxhang" && 'https:' == document.location.protocol) {
                string += "<div class='rcm-error'>" + i18n_1["default"]("error-loading-http") + "</div>";
            }
            errorCont.html(string);
            $("<button class=\"rcm-btn\">" + i18n_1["default"]("error-trymoretimes", pInc) + "</button>").appendTo(errorCont).on("click", function () {
                _this.currentMultiLoader.retry(pInc);
                errorCont.remove();
            });
            errorCont.append(" ");
            $("<button class=\"rcm-btn\">" + i18n_1["default"]("ooui-item-remove", pInc) + "</button>").appendTo(errorCont).on("click", function () {
                _this.currentMultiLoader.ErroredItems.forEach(function (e) {
                    _this.chosenWikis.splice(_this.chosenWikis.indexOf(e.item), 1);
                });
                _this.currentMultiLoader.removeAllErroredWikis();
                errorCont.remove();
            });
        };
        this._onAllWikiDataParsed = function () {
            _this.flagWikiDataIsLoaded = true;
            mw.util.addCSS(_this.chosenWikis.map(function (w) { return w.getWikiRuntimeCSS(); }).join('\n'));
            _this.wikisNode.onWikiDataLoaded();
            _this.optionsNode.toggleAbuseLogsFilterVisiblity(_this.chosenWikis.some(function (w) { return w.wikiUsesAbuseLogs; }));
            _this._start(true);
        };
        this._onAllDiscussionsParsed = function () {
            _this.rcmChunkStart();
        };
        this._handleWikiLoadError = function (pWikiData, pTries, pID, pErrorMessage, pInc) {
            clearTimeout(_this.loadErrorTimeoutID);
            _this.loadErrorTimeoutID = 0;
            var errorCont = $("<div>").appendTo($(_this.statusNode).find(".rcm-status-alerts-cont"));
            errorCont.html("<div class='rcm-error'>" + i18n_1["default"](pErrorMessage, "[<span class='errored-wiki'>" + mw.html.escape(pWikiData.servername) + "</span>]", pTries) + "</div>");
            _this.addRefreshButtonTo(errorCont[0]);
            errorCont.append(" ");
            var retry = function () {
                clearTimeout(_this.loadErrorTimeoutID);
                _this.loadErrorTimeoutID = 0;
                _this.currentMultiLoader.retry(pInc);
                errorCont.remove();
            };
            $("<button class=\"rcm-btn\">" + i18n_1["default"]("error-trymoretimes", pInc) + "</button>").appendTo(errorCont).on("click", retry);
            if (_this.isAutoRefreshEnabled()) {
                _this.loadErrorTimeoutID = window.setTimeout(function () { retry === null || retry === void 0 ? void 0 : retry(); }, 20000);
            }
        };
        this._onAllWikisParsed = function () {
            if (_this.discussionsEnabled) {
                _this._startDiscussionLoading(_this.ajaxID);
            }
            else {
                _this.rcmChunkStart();
            }
        };
        this.modID = "rcm" + pModID;
        this.resultCont = pWrapper;
        this.makeLinksAjax = false;
        this.ajaxID = 0;
        this.autoRefreshLocalStorageID = Global_1["default"].AUTO_REFRESH_LOCAL_STORAGE_ID + "-" + this.modID;
        this.extraLoadingEnabled = true;
        this.flagWikiDataIsLoaded = false;
        this.isHardRefresh = true;
        this._parseWikiList();
        this.resultCont.innerHTML = "<center>" + Global_1["default"].getLoaderLarge() + "</center>";
    }
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
        this.abuseLogsEnabled = tDataset.abuselogsEnabled == "true";
        var splitNames = function (str) { var _a; return (_a = str === null || str === void 0 ? void 0 : str.replace(/_/g, " ").split(",")) !== null && _a !== void 0 ? _a : []; };
        var sanitiseNames = function (user) { return Utils_1["default"].ucfirst(user.trim()); };
        this.hideusers = splitNames(tDataset.hideusers).map(sanitiseNames);
        this.notificationsHideusers = splitNames(tDataset.notificationsHideusers).map(sanitiseNames);
        this.onlyshowusers = splitNames(tDataset.onlyshowusers).map(sanitiseNames);
        this.extraLoadingEnabled = tDataset.extraLoadingEnabled == "false" ? false : true;
        this.makeLinksAjax = tDataset.ajaxlinks == "true" ? true : false;
        this.chosenWikis = $(this.resultCont).find(">ul>li").toArray().map(function (pNode) { return new WikiData_1["default"](_this).initListData(pNode); });
        var externalWikis = this.chosenWikis.filter(function (w) { return !w.isWikiaWiki; });
        this.chosenWikis = this.chosenWikis.filter(function (w) { return w.isWikiaWiki; });
        if (externalWikis.length > 0) {
            this.wikisNotAllowedToLoad = externalWikis.map(function (w) { return mw.html.escape(w.servername); });
        }
        this.chosenWikis = Utils_1["default"].uniq_fast_key(this.chosenWikis, "scriptpath"); 
        this.resultCont.innerHTML = "";
    };
    RCMManager.prototype.init = function () {
        this.resultCont.innerHTML = "";
        this.resultCont.className += " " + this.modID;
        this.modID = "." + this.modID;
        this.rcData = [];
        this.recentChangesEntries = [];
        this.optionsNode = new RCMOptions_1["default"](this, Utils_1["default"].newElement("div", { className: "rcm-options" }, this.resultCont));
        if (this.wikisNotAllowedToLoad) {
            var errorCont = $("<div>").appendTo(this.resultCont);
            errorCont.html("<div class='rcm-error'>" + i18n_1["default"]('error-external-wiki', "[" + this.wikisNotAllowedToLoad.join(', ') + "]") + "</div>");
        }
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
    RCMManager.prototype._addErroredWikiAfterToManyRetries = function (pWikiData, pTries, pID, pFailStatus, pHandleErrorCallback) {
        if (this.currentMultiLoader.ErroredItems.length === 1 || !this.statusNode.querySelector(".errored-wiki")) {
            var tMessage = pFailStatus == null ? "error-loading-syntaxhang" : "error-loading-connection";
            pHandleErrorCallback(pWikiData, pTries, pID, tMessage, RCMManager.LOADING_ERROR_RETRY_NUM_INC);
        }
        else {
            this.statusNode.querySelector(".errored-wiki").innerHTML += ", " + mw.html.escape(pWikiData.servername);
        }
    };
    RCMManager.prototype.setupStatusLoadingMode = function (loadingText) {
        this.statusNode.innerHTML = [
            "<div class=\"rcm-status-alerts-cont\"></div>",
            "<div class=\"rcm-status-loading-cont\">" + Global_1["default"].getLoader() + " " + i18n_1["default"](loadingText) + " (<span class='rcm-load-perc'>0%</span>)</div>",
        ].join("");
    };
    RCMManager.prototype._startWikiDataLoad = function () {
        this.ajaxID++;
        if (this.chosenWikis.length > 0) {
            this.setupStatusLoadingMode('status-loading');
            this._loadWikiDataFromList(this.chosenWikis);
        }
        else {
            Utils_1["default"].removeElement(this.statusNode);
            Utils_1["default"].removeElement(this.wikisNode.root);
            this.resultsNode.innerHTML = "<div class='banner-notification error center'>" + i18n_1["default"]("expand_templates_input_missing") + "</div>";
        }
    };
    RCMManager.prototype._loadWikiDataFromList = function (list) {
        var _this = this;
        var loader = this.currentMultiLoader = new MultiLoader_1["default"](this);
        loader.multiLoad({
            list: list,
            buildUrl: function (w) { return w.buildWikiDataApiUrl(); },
            dataType: 'jsonp',
            maxTries: RCMManager.LOADING_ERROR_RETRY_NUM_INC,
            onProgress: this._updateLoadingPercent,
            onSingleLoadFinished: function (data, wikiData) {
                if (data && data.warning) {
                    mw.log("WARNING: ", data.warning);
                }
                wikiData.initAfterLoad(data.query); 
            },
            onCheckInvalid: function (data) {
                var _a;
                if ((data === null || data === void 0 ? void 0 : data.error) && !(data === null || data === void 0 ? void 0 : data.query)) {
                    console.error(data.error, data, data.query == null);
                    return { id: "api-error", halt: true, error: data.error }; 
                }
                else if (!((_a = data === null || data === void 0 ? void 0 : data.query) === null || _a === void 0 ? void 0 : _a.general)) {
                    return { id: "parse-error" }; 
                }
                return false;
            },
            onSingleError: function (info, wikiData) {
                var ajaxID = loader.AjaxID;
                switch (info.id) {
                    case "timeout": {
                        _this._handleWikiDataLoadError(wikiData, info.tries, ajaxID, "error-loading-syntaxhang", 1);
                        break;
                    }
                    case "max-tries": {
                        _this._addErroredWikiAfterToManyRetries(wikiData, info.tries, ajaxID, info.status, _this._handleWikiDataLoadError);
                        break;
                    }
                    case "unknown": {
                        _this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + mw.html.escape(wikiData.servername) + "</div>" + JSON.stringify(info.error) + "</div>";
                        throw "Wiki returned error";
                        break;
                    }
                }
            },
        })
            .then(this._onAllWikiDataParsed);
    };
    RCMManager.prototype._start = function (pUpdateParams) {
        if (pUpdateParams === void 0) { pUpdateParams = false; }
        clearTimeout(this.autoRefreshTimeoutID);
        this.wikisNode.clear();
        this.newRecentChangesEntries = [];
        this.secondaryWikiData = [];
        this.ajaxID++;
        this.itemsAdded = this.itemsToAddTotal = 0;
        var wikis = this.chosenWikis.filter(function (w) { return !w.hidden; });
        if (wikis.length == 0) {
            Utils_1["default"].newElement("div", { className: "rcm-noNewChanges", innerHTML: "<strong>" + i18n_1["default"]('nonewchanges') + "</strong>" }, this.resultsNode);
            this.wikisNode.refresh();
            return;
        }
        if (pUpdateParams) {
            wikis.forEach(function (wiki) { return wiki.setupRcParams(); });
        }
        this.setupStatusLoadingMode('status-loading-sorting');
        this._loadRecentChangesFromList(wikis);
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
            tWikiData.lastAbuseLogDate = tWikiData.getEndDate();
            tWikiData.resultsCount = 0;
            tWikiData.discussionsCount = 0;
            tWikiData.abuseLogCount = 0;
            tWikiData.discCommentPageNamesNeeded = [];
        });
        this.rcData = [];
        if (this.recentChangesEntries != null) {
            for (var i = 0; i < this.recentChangesEntries.length; i++) {
                this.recentChangesEntries[i].dispose();
                this.recentChangesEntries[i] = null;
            }
        }
        this.recentChangesEntries = [];
        RCMModal_1["default"].closeModal();
        this._start(pUpdateParams);
    };
    RCMManager.prototype._startDiscussionLoading = function (pID) {
        if (!this.discussionsEnabled) {
            return;
        }
        var wikis = this.chosenWikis.filter(function (w) { return !w.hidden; }).filter(function (w) { return w.usesWikiaDiscussions !== false; });
        if (wikis.length <= 0) {
            this.discussionsEnabled = false;
            this.rcmChunkStart();
            return;
        }
        this.setupStatusLoadingMode('status-discussions-loading');
        this._loadDiscussionsFromList(wikis);
    };
    RCMManager.prototype._loadDiscussionsFromList = function (list) {
        var _this = this;
        var loader = this.currentMultiLoader = new MultiLoader_1["default"](this);
        loader.multiLoad({
            list: list,
            buildUrl: function (w) { return w.buildWikiDiscussionUrl(); },
            dataType: 'json',
            maxTries: RCMManager.LOADING_ERROR_RETRY_NUM_INC,
            onProgress: this._updateLoadingPercent,
            onSingleLoadFinished: function (data, wikiData) {
                var _a;
                if (data && data.warning) {
                    mw.log("WARNING: ", data.warning);
                }
                if (wikiData.usesWikiaDiscussions !== false) {
                    wikiData.usesWikiaDiscussions = true;
                    _this._parseWikiDiscussions((_a = data === null || data === void 0 ? void 0 : data["_embedded"]) === null || _a === void 0 ? void 0 : _a["doc:posts"], wikiData);
                }
            },
            onCheckInvalid: function (data, wikiData) {
                var _a;
                if (data === null || data === void 0 ? void 0 : data.error) {
                    console.error(data.error, data);
                    return { id: "api-error", halt: true, error: "[" + data.status + "] " + data.error + " - " + data.details }; 
                }
                else if (!((_a = data === null || data === void 0 ? void 0 : data["_embedded"]) === null || _a === void 0 ? void 0 : _a["doc:posts"])) {
                    if (wikiData.usesWikiaDiscussions === true) {
                        return { id: "parse-error" }; 
                    }
                    else {
                        mw.log("[RCMManager](loadWikiDiscussions) " + wikiData.servername + " has no discussions.");
                        wikiData.usesWikiaDiscussions = false;
                        return false;
                    }
                }
                return false;
            },
            onSingleError: function (info, wikiData, errorData) {
                switch (info.id) {
                    case "timeout":
                    case "max-tries": {
                        errorData.remove();
                        break;
                    }
                    case "unknown": {
                        _this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + mw.html.escape(wikiData.servername) + "</div>" + JSON.stringify(info.error) + "</div>";
                        throw "Wiki returned error";
                        break;
                    }
                }
            },
        })
            .then(this._onAllDiscussionsParsed);
    };
    RCMManager.prototype._parseWikiDiscussions = function (pData, pWikiData) {
        var _this = this;
        if (!pData || pData.length <= 0) {
            return;
        }
        pData.sort(function (a, b) {
            return (a.modificationDate || a.creationDate).epochSecond < (b.modificationDate || b.creationDate).epochSecond ? 1 : -1;
        });
        pWikiData.updateLastDiscussionDate(Utils_1["default"].getFirstItemFromObject(pData));
        var tNewRC;
        pData.forEach(function (pRCData) {
            var tUser = pRCData.createdBy.name;
            if (_this._changeShouldBePrunedBasedOnOptions(tUser, !!tUser, pWikiData)) {
                return;
            }
            try {
                if ((pRCData.modificationDate || pRCData.creationDate).epochSecond < Math.round(pWikiData.getEndDate().getTime() / 1000)) {
                    return;
                }
                var containerType = pRCData._embedded.thread[0].containerType;
                if (!_this.discNamespaces[containerType]) {
                    return;
                }
            }
            catch (e) { }
            _this.itemsToAddTotal++;
            tNewRC = new rc_data_1.RCDataFandomDiscussion(pWikiData, _this, pRCData);
            _this._addRCDataToList(tNewRC);
            pWikiData.discussionsCount++;
        });
        mw.log("Discussions:", pWikiData.servername, pData);
    };
    RCMManager.prototype._loadRecentChangesFromList = function (list) {
        var _this = this;
        var loader = this.currentMultiLoader = new MultiLoader_1["default"](this);
        loader.multiLoad({
            list: list,
            buildUrl: function (w) { return w.buildApiUrl(); },
            dataType: 'jsonp',
            maxTries: RCMManager.LOADING_ERROR_RETRY_NUM_INC,
            onProgress: this._updateLoadingPercent,
            onSingleLoadFinished: function (data, wikiData) {
                var _a, _b;
                if (data && data.warning) {
                    mw.log("WARNING: ", data.warning);
                }
                wikiData.initAbuseFilterFilters(data.query);
                _this._parseWikiAbuseLog((_a = data.query) === null || _a === void 0 ? void 0 : _a.abuselog, wikiData);
                _this._parseWiki((_b = data.query) === null || _b === void 0 ? void 0 : _b.recentchanges, wikiData);
                _this.wikisNode.onWikiLoaded(wikiData);
            },
            onCheckInvalid: function (data, pWikiData) {
                var _a;
                if ((data === null || data === void 0 ? void 0 : data.error) && !(data === null || data === void 0 ? void 0 : data.query)) {
                    console.error(data.error, data, data.query == null);
                    return { id: "api-error", halt: true, error: data.error }; 
                }
                else if (!((_a = data === null || data === void 0 ? void 0 : data.query) === null || _a === void 0 ? void 0 : _a.recentchanges) && !pWikiData.skipLoadingNormalRcDueToFilters()) {
                    return { id: "parse-error" }; 
                }
                return false;
            },
            onSingleError: function (info, wikiData) {
                var ajaxID = loader.AjaxID;
                switch (info.id) {
                    case "timeout": {
                        _this._handleWikiLoadError(wikiData, info.tries, ajaxID, "error-loading-syntaxhang", 1);
                        break;
                    }
                    case "max-tries": {
                        _this._addErroredWikiAfterToManyRetries(wikiData, info.tries, ajaxID, info.status, _this._handleWikiLoadError);
                        break;
                    }
                    case "unknown": {
                        _this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + mw.html.escape(wikiData.servername) + "</div>" + JSON.stringify(info.error) + "</div>";
                        throw "Wiki returned error";
                        break;
                    }
                }
            },
        })
            .then(this._onAllWikisParsed);
    };
    RCMManager.prototype._parseWiki = function (pData, pWikiData) {
        var _this = this;
        if (!pData || pData.length <= 0) {
            return;
        }
        mw.log(pWikiData.servername, pData);
        pWikiData.updateLastChangeDate(Utils_1["default"].getFirstItemFromObject(pData));
        var tNewRC;
        pData.forEach(function (pRCData) {
            var userEdited = pData.user != "" && pData.anon != "";
            if (_this._changeShouldBePrunedBasedOnOptions(pRCData.user, userEdited, pWikiData)) {
                return;
            }
            _this.itemsToAddTotal++;
            if (pRCData.logtype && pRCData.logtype != "0") { 
                tNewRC = new rc_data_1.RCDataLog(pWikiData, _this, pRCData);
            }
            else {
                tNewRC = new rc_data_1.RCDataArticle(pWikiData, _this, pRCData);
            }
            _this._addRCDataToList(tNewRC);
            pWikiData.resultsCount++;
        });
    };
    ;
    RCMManager.prototype._parseWikiAbuseLog = function (pLogs, pWikiData) {
        var _this = this;
        if (!pLogs || pLogs.length <= 0) {
            return;
        }
        pWikiData.updateLastAbuseLogDate(Utils_1["default"].getFirstItemFromObject(pLogs));
        pLogs.forEach(function (pLogData) {
            pLogData = rc_data_1.RCDataLog.abuseLogDataToNormalLogFormat(pLogData);
            var userEdited = pLogData.anon != "";
            if (_this._changeShouldBePrunedBasedOnOptions(pLogData.user, userEdited, pWikiData)) {
                return;
            }
            _this.itemsToAddTotal++;
            _this._addRCDataToList(new rc_data_1.RCDataLog(pWikiData, _this, pLogData));
            pWikiData.abuseLogCount++;
        });
    };
    RCMManager.prototype._changeShouldBePrunedBasedOnOptions = function (pUser, pUserEdited, pWikiData) {
        if (Global_1["default"].username && pUser && pWikiData.rcParams.hidemyself && Global_1["default"].username == pUser) {
            return true;
        }
        if (pUser && this.hideusers.indexOf(pUser) > -1 || (pWikiData.hideusers && pWikiData.hideusers.indexOf(pUser) > -1)) {
            return true;
        }
        if (pUser && (this.onlyshowusers.length != 0 && this.onlyshowusers.indexOf(pUser) == -1)) {
            return true;
        }
        if (pUser && (pWikiData.onlyshowusers != undefined && pWikiData.onlyshowusers.indexOf(pUser) == -1)) {
            return true;
        }
        if (pWikiData.rcParams.hideanons && !pUserEdited) {
            return true;
        }
        else if (pWikiData.rcParams.hideliu && pUserEdited) {
            return true;
        }
        return false;
    };
    RCMManager.prototype._addRCDataToList = function (pNewRC) {
        var _this = this;
        var tNewRcCombo = { data: pNewRC };
        this.rcData.push(tNewRcCombo); 
        var tResultsIsEmpty = this.resultsNode.innerHTML == "", tNewList, tNoChangeAdded;
        if (this.rcParams.hideenhanced) {
            tNoChangeAdded = true; 
        }
        else if (tResultsIsEmpty) {
            tNoChangeAdded = this.recentChangesEntries.every(function (pRCList, i) {
                if (pNewRC.date > pRCList.date) {
                    _this.recentChangesEntries.splice(i, 0, tNewList = new rc_data_1.RCList(_this).addRC(pNewRC));
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
                        _this.recentChangesEntries.splice(tIndexToAddAt_1, 0, tNewList = new rc_data_1.RCList(_this).addRC(pNewRC));
                        return false;
                    }
                }
                return true;
            });
        }
        if (tNoChangeAdded) {
            this.recentChangesEntries.push(tNewList = new rc_data_1.RCList(this).addRC(pNewRC));
        }
        tNewRcCombo.list = tNewList;
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
            }
            if (this.lastLoadDateTimeActual != null && this.isAutoRefreshEnabled() && !document.hasFocus()) {
                if (this.recentChangesEntries[0].date > this.lastLoadDateTimeActual) {
                    this.notifyUserOfChange();
                }
            }
        }
        this.rcmChunk(0, 99, 99, undefined, this.ajaxID);
    };
    RCMManager.prototype.removeOldResults = function (pDate) {
        var _a;
        var _this = this;
        if (this.resultsNode.innerHTML == "") {
            return;
        }
        var tWikisToCheck = this.chosenWikis.slice(0);
        var data, list, tDirtyLists = [], tWikiI;
        for (var i = this.rcData.length - 1; i >= 0; i--) {
            (_a = this.rcData[i], data = _a.data, list = _a.list);
            if ((tWikiI = tWikisToCheck.indexOf(data.wikiInfo)) == -1) {
                continue;
            }
            if (data.shouldBeRemoved(pDate)) {
                switch (data.getRemovalType()) {
                    case "normal":
                        data.wikiInfo.resultsCount--;
                        break;
                    case "discussion":
                        data.wikiInfo.discussionsCount--;
                        break;
                    case "abuselog":
                        data.wikiInfo.abuseLogCount--;
                        break;
                }
                this.rcData.splice(i, 1);
                list === null || list === void 0 ? void 0 : list.removeRC(data);
                if (!!list && (this.rcParams.hideenhanced || tDirtyLists.indexOf(list) == -1)) {
                    tDirtyLists.push(list);
                }
            }
            else if (data.wikiInfo.resultsCount <= data.wikiInfo.rcParams.limit
                && data.wikiInfo.discussionsCount <= Math.min(data.wikiInfo.rcParams.limit, 50)
                && data.wikiInfo.abuseLogCount <= data.wikiInfo.rcParams.limit) {
                tWikisToCheck.splice(tWikiI, 1);
                if (tWikisToCheck.length == 0) {
                    break;
                }
            }
        }
        var tOldNode, tListI;
        tDirtyLists.forEach(function (pRCList) {
            tListI = _this.recentChangesEntries.indexOf(pRCList);
            if (tListI > -1) {
                if (pRCList.list.length <= 0) {
                    if (pRCList.htmlNode) {
                        Utils_1["default"].removeElement(pRCList.htmlNode);
                    }
                    _this.recentChangesEntries[tListI].dispose();
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
            var bodyContents = [];
            if (tEditTitle)
                bodyContents.push(tEditTitle);
            bodyContents.push(i18n_1["default"]("notification-edited-by", tMostRecentEntry.author));
            if (tMostRecentEntry.summaryUnparsed)
                bodyContents.push(i18n_1["default"]("notification-edit-summary", tMostRecentEntry.summaryUnparsed));
            Main_1["default"].addNotification(i18n_1["default"]("nchanges", tNumNewChanges) + " - " + tMostRecentEntry.wikiInfo.sitename + (tNumNewChangesWiki != tNumNewChanges ? " (" + tNumNewChangesWiki + ")" : ""), {
                body: bodyContents.join("\n")
            });
        }
    };
    RCMManager.prototype.rcmChunk = function (pIndex, pLastDay, pLastMonth, pContainer, pID) {
        var _this = this;
        var _a, _b;
        if (pID != this.ajaxID) {
            return;
        } 
        if (this.newRecentChangesEntries.length == 0) {
            this.finishScript();
            return;
        }
        var date = this.newRecentChangesEntries[pIndex].date, tAddToTopOfExistingContainer = false;
        if (Utils_1["default"].getDate(date) != pLastDay || Utils_1["default"].getMonth(date) != pLastMonth || !pContainer) { 
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
            }
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
                (_b = (_a = pContainer.firstChild) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(tRcNode, pContainer.firstChild);
            }
            else {
                if (this.newRecentChangesEntries[pIndex - 1].htmlNode.parentNode != pContainer) {
                    pContainer.appendChild(tRcNode);
                }
                else {
                    Utils_1["default"].insertAfter(tRcNode, this.newRecentChangesEntries[pIndex - 1].htmlNode);
                }
            }
        }
        else {
            pContainer.appendChild(this.newRecentChangesEntries[pIndex].toHTML(pIndex));
        }
        this.itemsAdded += this.newRecentChangesEntries[pIndex].list.length;
        if (++pIndex < this.newRecentChangesEntries.length) {
            $(this.modID + " .rcm-content-loading-num").html(this.itemsAdded.toString());
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
                tCallback.apply(void 0, pArgs);
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
        var _this = this;
        pParent.appendChild(document.createTextNode(" "));
        $("<button class=\"rcm-btn\">" + i18n_1["default"]("status-refresh") + "</button>").appendTo(pParent).on("click", function () {
            _this.refresh();
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
                localStorage.setItem(self.autoRefreshLocalStorageID, 'true');
                self.refresh();
                Notification.requestPermission();
            }
            else {
                localStorage.setItem(self.autoRefreshLocalStorageID, 'false');
                clearTimeout(self.autoRefreshTimeoutID);
            }
        });
    };
    ;
    RCMManager.prototype.isAutoRefreshEnabled = function () {
        return localStorage.getItem(this.autoRefreshLocalStorageID) == "true" || this.autoRefreshEnabledDefault;
    };
    RCMManager.prototype.parseRCParams = function (pData, pExplodeOn, pSplitOn) {
        var tRcParams = {};
        var paramStringArray = [];
        if (!pData) {
            return tRcParams;
        }
        var tRcParamsRawData = pData.split(pExplodeOn);
        var tRcParamsDataSplit, key, val; 
        for (var i = 0; i < tRcParamsRawData.length; i++) {
            tRcParamsDataSplit = tRcParamsRawData[i].split(pSplitOn);
            if (tRcParamsDataSplit.length > 1) {
                key = tRcParamsDataSplit[0], val = tRcParamsDataSplit[1];
                if (key == "limit" && val) {
                    tRcParams["limit"] = parseInt(val);
                }
                else if (key == "days" && val) {
                    tRcParams["days"] = parseInt(val);
                }
                else if (key == "namespace" && (val || val === "0")) {
                    tRcParams["namespace"] = val;
                }
                else if (val) {
                    tRcParams[key] = val == "1";
                }
                paramStringArray.push(key + "=" + val);
            }
        }
        tRcParams.paramString = paramStringArray.join("&");
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
            hidenewpages: false,
            hidepageedits: false,
            namespace: undefined,
        };
    };
    RCMManager.LOADING_ERROR_RETRY_NUM_INC = 5;
    return RCMManager;
}());
exports["default"] = RCMManager;

},{"./Global":1,"./Main":3,"./MultiLoader":4,"./RCMModal":6,"./RCMOptions":7,"./RCMWikiPanel":8,"./Utils":10,"./WikiData":11,"./i18n":12,"./rc_data":20}],6:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var $ = window.jQuery, mw = window.mediaWiki;
var RCMModal =  (function () {
    function RCMModal() {
    }
    RCMModal.init = function () {
        mw.hook('dev.modal').add(function (module) {
            RCMModal.modalFactory = module;
        });
        try {
            window.dev.modal._windowManager.on("closing", function (modal) {
                if (modal.elementId == RCMModal.MODAL_ID) {
                    RCMModal.isOpen = false;
                }
            });
        }
        catch (e) { }
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
                        events["close_button"] = function () { var _a; (_a = RCMModal.modal) === null || _a === void 0 ? void 0 : _a.close(); };
                        pData.buttons && pData.buttons.forEach(function (o, i, a) {
                            buttons.push({ text: o.text, event: o.event, normal: true, primary: true });
                            if (o.closeOnClick !== false) {
                                events[o.event] = function (e) {
                                    var _a;
                                    o.callback(e);
                                    (_a = RCMModal.modal) === null || _a === void 0 ? void 0 : _a.close();
                                };
                            }
                            else {
                                events[o.event] = o.callback;
                            }
                        });
                        return [4 , RCMModal.createModal({
                                id: RCMModal.MODAL_ID,
                                size: 'larger',
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
        try {
            window.dev.modal._windowManager.windows[RCMModal.MODAL_ID].updateSize();
        }
        catch (e) { }
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
    RCMModal.modal = null;
    RCMModal.isOpen = false;
    return RCMModal;
}());
exports["default"] = RCMModal;

},{"./Global":1,"./i18n":12}],7:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var WikiaMultiSelectDropdown_1 = require("./lib/WikiaMultiSelectDropdown");
var $ = window.jQuery;
var RCMOptions =  (function () {
    function RCMOptions(pManager, pElem) {
        var _this = this;
        var _a;
        this._onChange_limit = function (pEvent) {
            _this.afterChangeNumber("limit", parseInt(_this.getInput(pEvent).value));
        };
        this._onChange_days = function (pEvent) {
            _this.afterChangeNumber("days", parseInt(_this.getInput(pEvent).value));
        };
        this._onChange_hideminor = function (pEvent) {
            _this.afterChangeBoolean("hideminor", !_this.getInput(pEvent).checked);
        };
        this._onChange_hidebots = function (pEvent) {
            _this.afterChangeBoolean("hidebots", !_this.getInput(pEvent).checked);
        };
        this._onChange_hideanons = function (pEvent) {
            if (_this.getInput(pEvent).checked == false && _this.usersCheckbox.checked == false) {
                _this.rcParams["hideliu"] = false;
                _this.manager.rcParams["hideliu"] = false;
                _this.usersCheckbox.checked = true;
            }
            _this.afterChangeBoolean("hideanons", !_this.getInput(pEvent).checked);
        };
        this._onChange_hideliu = function (pEvent) {
            if (_this.getInput(pEvent).checked == false && _this.anonsCheckbox.checked == false) {
                _this.rcParams["hideanons"] = false;
                _this.manager.rcParams["hideanons"] = false;
                _this.anonsCheckbox.checked = true;
            }
            _this.afterChangeBoolean("hideliu", !_this.getInput(pEvent).checked);
        };
        this._onChange_hidemyself = function (pEvent) {
            _this.afterChangeBoolean("hidemyself", !_this.getInput(pEvent).checked);
        };
        this._onChange_hideenhanced = function (pEvent) {
            _this.afterChangeBoolean("hideenhanced", !_this.getInput(pEvent).checked);
        };
        this._onChange_hidelogs = function (pEvent) {
            _this.afterChangeBoolean("hidelogs", !_this.getInput(pEvent).checked);
        };
        this._onChange_hidenewpages = function (pEvent) {
            _this.afterChangeBoolean("hidenewpages", !_this.getInput(pEvent).checked);
        };
        this._onChange_hidepageedits = function (pEvent) {
            _this.afterChangeBoolean("hidepageedits", !_this.getInput(pEvent).checked);
        };
        this._onChange_abuselogs = function (pEvent) {
            _this.manager.abuseLogsEnabled = _this.getInput(pEvent).checked;
            if (_this.manager.abuseLogsEnabled) {
                _this.manager.chosenWikis.forEach(function (w) { return w.needsAbuseFilters = true; });
            }
            _this.manager.hardRefresh(true);
            _this.save();
        };
        this._onChange_settingsSaveCookie = function (pEvent) {
            if (_this.getInput(pEvent).checked) {
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
        this.root = pElem;
        var tSave = this.getSave();
        this.rcParams = tSave.options || {}; 
        this.manager.rcParams = $.extend(this.manager.rcParams, this.rcParams);
        var dns = this.manager.discNamespaces;
        this.discNamespaces = $.extend({ FORUM: dns.FORUM, WALL: dns.WALL, ARTICLE_COMMENT: dns.ARTICLE_COMMENT }, (tSave.discNamespaces || {}));
        this.manager.discNamespaces = __assign({}, this.discNamespaces);
        this.manager.discussionsEnabled = Object.keys(this.discNamespaces).filter(function (key) { return _this.discNamespaces[key]; }).length > 0;
        this.manager.abuseLogsEnabled = (_a = tSave.abuseLogsEnabled) !== null && _a !== void 0 ? _a : this.manager.abuseLogsEnabled;
        this._addElements();
    }
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
        Utils_1["default"].addTextTo(" | ", tRow1);
        this.groupedChangesCheckbox = this._newCheckbox(i18n_1["default"]('rcfilters-group-results-by-page'), tRow1);
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
        this.logsCheckbox = this._newCheckbox(i18n_1["default"]('rcfilters-filter-logactions-label'), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.newPagesCheckbox = this._newCheckbox(i18n_1["default"]('rcfilters-filter-newpages-label'), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.pageEditsCheckbox = this._newCheckbox(i18n_1["default"]('rcfilters-filter-pageedits-label'), tRow2);
        var tALSpan = Utils_1["default"].newElement("span", { className: "rcm-al-filter", style: "display:none;" }, tRow2);
        Utils_1["default"].addTextTo(" | ", tALSpan);
        this.abuseLogsCheckbox = this._newCheckbox(i18n_1["default"]('abuselog'), tALSpan);
        Utils_1["default"].newElement("hr", null, tContent);
        var tRow3 = Utils_1["default"].newElement("table", { className: "mw-recentchanges-table" }, tContent);
        var tRow3Row = Utils_1["default"].newElement("row", { className: "mw-recentchanges-table" }, tRow3);
        Utils_1["default"].newElement("td", { className: "mw-label", innerHTML: i18n_1["default"]("socialactivity-page-title") + ":" }, tRow3Row);
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
    RCMOptions.prototype.toggleAbuseLogsFilterVisiblity = function (pShow) {
        $(this.root).find(".rcm-al-filter").toggle(pShow);
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
        this.newPagesCheckbox.checked = !this.manager.rcParams.hidenewpages;
        this.pageEditsCheckbox.checked = !this.manager.rcParams.hidepageedits;
        this.abuseLogsCheckbox.checked = this.manager.abuseLogsEnabled;
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
        this.newPagesCheckbox.addEventListener("change", this._onChange_hidenewpages);
        this.pageEditsCheckbox.addEventListener("change", this._onChange_hidepageedits);
        this.abuseLogsCheckbox.addEventListener("change", this._onChange_abuselogs);
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
        this.newPagesCheckbox.removeEventListener("change", this._onChange_hidenewpages);
        this.pageEditsCheckbox.removeEventListener("change", this._onChange_hidepageedits);
        this.abuseLogsCheckbox.removeEventListener("change", this._onChange_abuselogs);
    };
    RCMOptions.prototype.getInput = function (pEvent) { return pEvent.target; };
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
            var abuseLogsEnabled = this.manager.abuseLogsEnabled;
            localStorage.setItem(this.localStorageID, JSON.stringify({ options: options, discNamespaces: discNamespaces, abuseLogsEnabled: abuseLogsEnabled }));
        }
    };
    RCMOptions.prototype.getSave = function () {
        var item = localStorage.getItem(this.localStorageID);
        return item ? JSON.parse(item) : {};
    };
    RCMOptions.prototype.isSaveEnabled = function () {
        return localStorage.getItem(this.localStorageID) != null;
    };
    return RCMOptions;
}());
exports["default"] = RCMOptions;

},{"./Global":1,"./Utils":10,"./i18n":12,"./lib/WikiaMultiSelectDropdown":13}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var $ = window.jQuery;
var RCMWikiPanel =  (function () {
    function RCMWikiPanel(pManager) {
        this.manager = pManager;
        this.singleWiki = this.manager.chosenWikis.length == 1;
        this.loadedWikis = [];
    }
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
                this.onIconClick(this.manager.chosenWikis[0]);
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
        var infoBanner = this.infoNode.querySelector(".rcm-wiki-info-banner");
        if (infoBanner && infoBanner.dataset.wiki == pWikiInfo.servername &&  e && (e.screenX != 0 && e.screenY != 0)) {
            this.closeInfo();
        }
        else {
            var tLink_1 = function (page, key) { return "<a href='" + pWikiInfo.getPageUrl(page) + "'>" + i18n_1["default"](key) + "</a>"; };
            var tLinkNum = function (page, key, num) { return tLink_1(page, key) + (": <b>" + num + "</b>"); };
            var wikiLinksList = [
                tLink_1("Special:RecentChanges" + pWikiInfo.firstSeperator + pWikiInfo.rcParams.paramString, "recentchanges"),
                pWikiInfo.isWikiaWiki && tLink_1("Special:SocialActivity", "socialactivity-page-title"),
                tLink_1("Special:NewPages", "newpages"),
                tLink_1("Special:NewFiles", "newimages"),
                tLink_1("Special:Log", "log"),
                pWikiInfo.isWikiaWiki && pWikiInfo.user.rights.analytics && tLink_1("Special:Analytics", "admindashboard-control-analytics-label"),
                tLink_1("Special:Random", "randompage"),
                pWikiInfo.usesWikiaDiscussions && "<a href='" + pWikiInfo.scriptpath + "/f'>" + i18n_1["default"]("discussions") + "</a>",
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
                + ("<td>" + tLinkNum("Special:AllPages", "statistics-articles", pWikiInfo.statistics.articles) + "</td>")
                + ("<td>" + tLinkNum("Special:ListFiles", "prefs-files", pWikiInfo.statistics.images) + "</td>")
                + ("<td>" + tLinkNum("Special:ListUsers", "statistics-users-active", pWikiInfo.statistics.activeusers) + "</td>")
                + ("<td>" + tLinkNum("Special:ListAdmins", "group-sysop", pWikiInfo.statistics.admins) + "</td>")
                + ("<td>" + tLinkNum("Special:Statistics", "edits", pWikiInfo.statistics.edits) + "</td>")
                + "</tr>"
                + "</table>";
            var siteLink = "<a href='" + (pWikiInfo.articlepath + Utils_1["default"].escapeCharactersUrl(pWikiInfo.mainpage)) + "'>" + pWikiInfo.sitename + "</a>";
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
            "<div class='rcm-wiki-info-banner banner-notification' " + params + ">",
            (addCloseButton ? "<button class='close wikia-chiclet-button'></button>" : ""),
            "<div class='msg'>" + contents + "</div>",
            "</div>",
        ].filter(function (o) { return !!o; }).join("");
        this.infoNode.innerHTML = html;
        if (addCloseButton) {
            this.infoNode.querySelector(".rcm-wiki-info-banner .close").addEventListener("click", this.closeInfo.bind(this));
        }
    };
    RCMWikiPanel.prototype.closeInfo = function () {
        $(this.infoNode).find(".rcm-wiki-info-banner").animate({ height: "toggle", opacity: "toggle" }, 200, function () {
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

},{"./Global":1,"./Utils":10,"./i18n":12}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var UserData =  (function () {
    function UserData(wikiInfo, manager, userData) {
        this.manager = manager;
        this.userid = userData.userid;
        this.name = userData.name;
        this.groups = userData.groups || [];
        Utils_1["default"].removeFromArray(this.groups, "*");
        if (userData.blockedby) {
            this.block = { by: userData.blockedby, reason: userData.blockreason, expiration: userData.blockexpiry };
        }
    }
    UserData.prototype.dispose = function () {
        delete this.manager;
        this.groups = undefined;
        this.block = undefined;
    };
    UserData.prototype.getClassNames = function () {
        return "rcm-usergroup-" + this.groups.join(" rcm-usergroup-") + (this.block ? " rcm-userblocked" : "");
    };
    UserData.getUsersApiUrl = function (pList, pScriptpath) {
        var tReturnText = pScriptpath + "/api.php?action=query&format=json&continue=&list=users";
        tReturnText += "&usprop=" + ["blockinfo", "groups"].join("|"); 
        tReturnText += "&ususers=" + Utils_1["default"].escapeCharactersUrl(pList.join("|").replace(/ /g, "_"));
        Utils_1["default"].logUrl("[UserData](getUsersApiUrl)", tReturnText);
        return tReturnText;
    };
    return UserData;
}());
exports["default"] = UserData;

},{"./Utils":10}],10:[function(require,module,exports){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var  mw = window.mediaWiki;
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
                if (attributes[key] === undefined || attributes[key] === null) {
                    continue;
                }
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
        var _a;
        if (!pNode) {
            return;
        }
        pNode = pNode;
        (_a = pNode.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(pNode);
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
        var _a, _b;
        return (pRef.nextSibling ? (_a = pRef.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(pNewNode, pRef.nextSibling) : (_b = pRef.parentNode) === null || _b === void 0 ? void 0 : _b.appendChild(pNewNode));
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
    Utils.escapeCharactersUrl = function (pString) {
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
    Utils.removeFromArray = function (pArray, pData) {
        var i = pArray.indexOf(pData);
        if (i != -1) {
            return pArray.splice(i, 1)[0];
        }
        return null;
    };
    Utils.arrayFind = function (pArray, pFunc) {
        for (var i = 0; i < pArray.length; ++i) {
            if (pFunc(pArray[i])) {
                return pArray[i];
            }
        }
        return null;
    };
    Utils.chunkArray = function (myArray, chunk_size) {
        var index = 0, arrayLength = myArray.length, chunkedArray = [];
        for (index = 0; index < arrayLength; index += chunk_size) {
            chunkedArray.push(myArray.slice(index, index + chunk_size));
        }
        return chunkedArray;
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
    Utils.isFileAudio = function (pTitle) {
        var tExt, audioExtensions = ["oga", "ogg", "ogv"]; 
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
        mw.log.apply(mw, __spreadArray([pPrefix, start + "?" + vars.join("&")], args));
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

},{"./Global":1}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var UserData_1 = require("./UserData");
var Utils_1 = require("./Utils");
var $ = window.jQuery, mw = window.mediaWiki;
var WikiData =  (function () {
    function WikiData(pManager) {
        this.manager = pManager;
        this.notificationsEnabled = true;
        this.needsSiteinfoData = true;
        this.needsUserData = true;
        this.user = { rights: {
                block: false, undelete: false, rollback: true,
                analytics: false,
                editcontentmodel: false,
                abusefilter_view: false, abusefilter_log: false, abusefilter_log_detail: false,
            } };
        this.isWikiaWiki = true;
        this.users = {};
        this.usersNeeded = [];
        this.discCommentPageNames = new Map();
        this.discCommentPageNamesNeeded = [];
        this.wikiUsesAbuseLogs = false; 
        this.abuseFilters = {};
        this.needsAbuseFilters = false;
        this.hidden = false;
        this.resultsCount = 0;
        this.discussionsCount = 0;
        this.abuseLogCount = 0;
    }
    WikiData.prototype.initListData = function (pNode) {
        var _a = pNode.textContent.trim().replace(/(\r\n|\n|\r)/gm, "\n").split(/[&\n]/).map(function (s) { return s.trim(); }).filter(function (s) { return !!s; }), tWikiDataRawUrl = _a[0], tWikiDataRaw = _a.slice(1); 
        this.servername = tWikiDataRawUrl.replace(/^https?\:\/\//, "").replace(/(\/$)/g, "");
        this.scriptdir = "";
        this.firstSeperator = "?";
        this.htmlName = this.servername.replace(/([\.\/])/g, "-");
        this.isWikiaWiki = (this.servername.indexOf(".wikia.") > -1) || (this.servername.indexOf(".fandom.") > -1) || (this.servername.indexOf(".gamepedia.") > -1);
        var urlParts = this.servername.split('/')[0].split('.'); 
        var tld = urlParts[urlParts.length - 1], dmn = urlParts[urlParts.length - 2];
        this.isWikiaWiki = this.isWikiaWiki && ['wikia', 'fandom', 'gamepedia'].indexOf(dmn) > -1 && tld == 'com';
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
                            this.favicon = "//vignette.wikia.nocookie.net/" + this.favicon + "/images/4/4a/Site-favicon.ico";
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
            if (this.favicon == null) {
                if (pQuery.general.favicon && !this.isWikiaWiki) {
                    this.favicon = pQuery.general.favicon;
                    if (this.favicon.indexOf("http") != 0 && this.favicon.indexOf("//") != 0) {
                        this.favicon = this.server + "/" + this.favicon;
                    }
                }
                else if (!!pQuery.pages) {
                    var page = Object.keys(pQuery.pages).map(function (key) { return pQuery.pages[key]; }).filter(function (p) { return p.missing !== ""; }).sort(function (a, b) { return b.title.length - a.title.length; }).shift();
                    if (page && page.imageinfo) {
                        this.favicon = page.imageinfo[0].url;
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
            this._setUserRights(pQuery.users[0].rights);
        }
        else if (this.needsUserData && !!pQuery.userinfo) {
            this.needsUserData = false;
            this._setUserRights(pQuery.userinfo.rights);
        }
        if (this.favicon == null) {
            this.favicon = Global_1["default"].FAVICON_BASE + this.scriptpath;
        }
        return this;
    };
    WikiData.prototype._setUserRights = function (rightsList) {
        this.user.rights = {
            block: rightsList.indexOf("block") > -1,
            undelete: rightsList.indexOf("undelete") > -1,
            rollback: rightsList.indexOf("rollback") > -1,
            analytics: rightsList.indexOf("analytics") > -1,
            editcontentmodel: rightsList.indexOf("editcontentmodel") > -1,
            abusefilter_view: rightsList.indexOf("abusefilter-view") > -1,
            abusefilter_log: rightsList.indexOf("abusefilter-log") > -1,
            abusefilter_log_detail: rightsList.indexOf("abusefilter-log-detail") > -1,
        };
        this.wikiUsesAbuseLogs = this.user.rights.abusefilter_log; 
        if (this.manager.abuseLogsEnabled) {
            this.needsAbuseFilters = this.wikiUsesAbuseLogs;
        }
    };
    WikiData.prototype.initAbuseFilterFilters = function (pQuery) {
        if (this.needsAbuseFilters && !!(pQuery === null || pQuery === void 0 ? void 0 : pQuery.abusefilters)) {
            this.needsAbuseFilters = false;
            this.abuseFilters = {};
            var tFilter = void 0;
            for (var i = 0; i < pQuery.abusefilters.length; i++) {
                tFilter = pQuery.abusefilters[i];
                this.abuseFilters[tFilter.id] = { description: tFilter.description, private: tFilter.private === "" };
            }
        }
        return this;
    };
    WikiData.prototype.setupRcParams = function () {
        var params = $.extend({}, this.manager.rcParamsBase); 
        if (Object.keys(this.manager.optionsNode.rcParams).length > 0) {
            params = $.extend(params, this.manager.optionsNode.rcParams);
        }
        if (this.rcParamsBase != null) {
            params = $.extend(params, this.rcParamsBase);
        }
        params.paramString = this.createRcParamsString(params);
        this.rcParams = $.extend(this.manager.getDefaultRCParams(), params);
        this.lastChangeDate = this.getEndDate();
        this.lastDiscussionDate = this.getEndDate();
        this.lastAbuseLogDate = this.getEndDate();
    };
    WikiData.prototype.createRcParamsString = function (pParams) {
        return $.map(pParams, function (val, key) {
            if (key == "paramString") {
                return '';
            }
            if (val === true) {
                val = "1";
            }
            else if (val === false) {
                val = "0";
            }
            return key + "=" + val;
        }).join("&");
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
    WikiData.prototype.getWikiRuntimeCSS = function () {
        return [
            "." + this.rcClass + " .rcm-tiled-favicon { ",
            (this.bgcolor != null ? "background: " + this.bgcolor + ";" : "background-image: url(" + this.favicon + ");"),
            " }",
        ].join("");
    };
    WikiData.prototype.getPageUrl = function (pageName, params) {
        var query = params ? this.firstSeperator + $.param(params) : "";
        return "" + this.articlepath + pageName + query;
    };
    WikiData.prototype.getApiUrl = function (params) {
        return this.scriptpath + "/api.php?" + $.param(params).replace(/ /g, "_");
    };
    WikiData.prototype.checkForSecondaryLoading = function () {
        var _this = this;
        Utils_1["default"].chunkArray(this.usersNeeded, 50).forEach(function (users) {
            var url = UserData_1["default"].getUsersApiUrl(users, _this.scriptpath);
            _this.checkForSecondaryLoading_doUsersLoad(url);
        });
    };
    WikiData.prototype.checkForSecondaryLoading_doUsersLoad = function (pUrl) {
        var _this = this;
        this.manager.secondaryWikiData.push({
            url: pUrl,
            callback: function (data) {
                var _a;
                if (!((_a = data.query) === null || _a === void 0 ? void 0 : _a.users)) {
                    return;
                }
                data.query.users.forEach(function (user, i) {
                    var username = user.name;
                    if (user.invalid === "" || user.missing === "") {
                        Utils_1["default"].removeFromArray(_this.usersNeeded, username);
                        return;
                    }
                    _this.users[username] = new UserData_1["default"](_this, _this.manager, user);
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
    WikiData.prototype.updateLastAbuseLogDate = function (pData) {
        if (new Date(pData.timestamp) < this.lastAbuseLogDate) {
            return;
        }
        this.lastAbuseLogDate = new Date(pData.timestamp);
        this.lastAbuseLogDate.setSeconds(this.lastAbuseLogDate.getSeconds() + 1);
        this.lastAbuseLogDate.setMilliseconds(1);
    };
    WikiData.prototype.updateLastDiscussionDate = function (pData) {
        var tSecond = (pData.modificationDate || pData.creationDate).epochSecond;
        this.lastDiscussionDate = new Date(0);
        this.lastDiscussionDate.setUTCSeconds(tSecond);
        this.lastDiscussionDate.setUTCMilliseconds(1);
    };
    WikiData.prototype.buildWikiDataApiUrl = function () {
        if (!this.needsSiteinfoData || !this.needsUserData) {
            return "";
        }
        var params = {}, tUrlList = [], tMetaList = [], tPropList = [];
        tMetaList.push("siteinfo");
        params["siprop"] = ["general", "namespaces", "statistics", "variables"].join("|");
        tPropList.push("imageinfo");
        params["iiprop"] = "url";
        params["titles"] = "File:Favicon.ico|File:Site-favicon.ico";
        if (this.username) {
            tUrlList.push("users");
            params["ususers"] = this.username;
            params["usprop"] = "rights";
        }
        else {
            tMetaList.push("userinfo");
            params["uiprop"] = "rights";
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
        Utils_1["default"].logUrl("[WikiData](buildWikiDataApiUrl)", tReturnText);
        return tReturnText;
    };
    WikiData.prototype.buildWikiDiscussionUrl = function () {
        var tEndDate = this.lastDiscussionDate; 
        var tLimit = Math.min(this.rcParams.limit, 100); 
        var params = {
            limit: tLimit,
            page: 0,
            since: tEndDate.toISOString(),
            responseGroup: "small",
            reported: "false",
            viewableOnly: !this.user.rights.block,
        };
        var tReturnText = this.scriptpath + "/wikia.php?controller=DiscussionPost&method=getPosts&" + Utils_1["default"].objectToUrlQueryData(params);
        mw.log("[WikiData](buildWikiDiscussionUrl) " + this.servername + " - " + tReturnText);
        return tReturnText;
    };
    WikiData.prototype.skipLoadingNormalRcDueToFilters = function () {
        return !!this.rcParams.hidenewpages && !!this.rcParams.hidepageedits && !!this.rcParams.hidelogs;
    };
    WikiData.prototype.buildApiUrl = function () {
        var params = {}, tUrlList = [], tMetaList = [], tPropList = [];
        var tEndDate = this.lastChangeDate; 
        if (!this.skipLoadingNormalRcDueToFilters()) {
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
            var tRcType = []; 
            if (this.rcParams.hidenewpages == false) {
                tRcType.push("new");
            }
            if (this.rcParams.hidepageedits == false) {
                tRcType.push("edit");
            }
            if (this.rcParams.hidelogs == false) {
                tRcType.push("log");
            }
            params["rctype"] = tRcType.join("|");
            var tUserToHide = void 0;
            if (this.rcParams.hidemyself && this.username) {
                tUserToHide = this.username;
            }
            else if (this.manager.hideusers.length > 0) {
                tUserToHide = this.manager.hideusers[0];
            }
            else if (this.hideusers) {
                tUserToHide = this.hideusers[0];
            }
            if (tUserToHide != null) {
                params["rcexcludeuser"] = tUserToHide;
            }
            if (this.rcParams.namespace || this.rcParams.namespace === "0") {
                params["rcnamespace"] = this.rcParams.namespace; 
            }
        }
        if (this.wikiUsesAbuseLogs && this.manager.abuseLogsEnabled && this.user.rights.abusefilter_view && this.user.rights.abusefilter_log) {
            if (this.needsAbuseFilters) {
                tUrlList.push("abusefilters");
                params["abflimit"] = 500;
                params["abfshow"] = "enabled";
                params["abfprop"] = "id|description|private"; 
            }
            tUrlList.push("abuselog");
            params["afllimit"] = this.rcParams.limit;
            params["aflend"] = this.lastAbuseLogDate.toISOString();
            params["aflprop"] = "ids|filter|user|title|action|result|timestamp|hidden|revid"; 
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
        Utils_1["default"].logUrl("[WikiData](buildApiUrl)", tReturnText);
        return tReturnText;
    };
    WikiData.RC_PROPS = ["user", "flags", "title", "ids", "sizes", "timestamp", "loginfo", "parsedcomment", "comment"].join("|"); 
    return WikiData;
}());
exports["default"] = WikiData;

},{"./Global":1,"./UserData":9,"./Utils":10}],12:[function(require,module,exports){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var $ = window.jQuery, mw = window.mediaWiki;
var i18n = function (pKey) {
    var _a;
    var pArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pArgs[_i - 1] = arguments[_i];
    }
    var tText;
    var devMsg = (_a = i18n.devI18n).msg.apply(_a, __spreadArray([pKey], pArgs));
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
    return i18n.wiki2html.apply(i18n, __spreadArray([tText], pArgs));
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
    'rcfilters-group-results-by-page': 'Group results by page',
    'rcfilters-filter-logactions-label': 'Logged actions',
    'rcfilters-filter-newpages-label': 'Page creations',
    'rcfilters-filter-pageedits-label': 'Page edits',
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
    'word-separator': ' ',
    'parentheses': '($1)',
    'parentheses-start': '(',
    'parentheses-end': ')',
    'brackets': '[$1]',
    'quotation-marks': '"$1"',
    'ntimes': '$1×',
    'and': '&#32;and',
    'rev-deleted-comment': '(edit summary removed)',
    'rev-deleted-user': '(username removed)',
    'rev-deleted-event': '(log action removed)',
    'recentchanges': 'Recent changes',
    'newpages': 'New pages',
    'newimages': 'New photos',
    'log': 'Logs',
    'randompage': 'Random page',
    'group-sysop': 'Administrators',
    'group-user': 'Users',
    'statistics-articles': 'Content pages',
    'statistics-users-active': 'Active users',
    'prefs-files': 'Files',
    'edits': 'Edits',
    'filedelete-success': "'''$1''' has been deleted.",
    'redirectto': 'Redirect to:',
    'images': 'Images',
    'expand_templates_input_missing': 'You need to provide at least some input wikitext.',
    'ooui-item-remove': 'Remove',
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
    'userrenametool-logpage': 'User rename log',
    'abusefilter-log': 'Abuse filter log',
    'abuselog': 'Abuse log',
    'log-name-contentmodel': 'Content model change log',
    'curseprofile_log_name': 'Profile log',
    'logentry-block-block': '$1 {{GENDER:$2|blocked}} {{GENDER:$4|$3}} with an expiration time of $5 $6',
    'logentry-block-reblock': '$1 {{GENDER:$2|changed}} block settings for {{GENDER:$4|$3}} with an expiration time of $5 $6',
    'logentry-block-unblock': '$1 {{GENDER:$2|unblocked}} {{GENDER:$4|$3}}',
    'block-log-flags-anononly': 'anonymous users only',
    'block-log-flags-nocreate': 'account creation disabled',
    'block-log-flags-noautoblock': 'autoblock disabled',
    'block-log-flags-noemail': 'e-mail blocked',
    'block-log-flags-nousertalk': 'cannot edit own talk page',
    'block-log-flags-angry-autoblock': 'enhanced autoblock enabled',
    'block-log-flags-hiddenname': 'username hidden',
    'logentry-delete-delete': '$1 deleted page $3',
    'logentry-delete-delete_redir': '$1 {{GENDER:$2|deleted}} redirect $3 by overwriting',
    'logentry-delete-restore': '$1 restored page $3 ($4)',
    'logentry-delete-restore-nocount': '$1 restored page $3',
    'logentry-delete-event': '$1 changed visibility of {{PLURAL:$5|a log event|$5 log events}} on $3: $4',
    'logentry-delete-revision': '$1 changed visibility of {{PLURAL:$5|a revision|$5 revisions}} on page $3: $4',
    'logentry-delete-event-legacy': '$1 changed visibility of log events on $3',
    'logentry-delete-revision-legacy': '$1 changed visibility of revisions on page $3',
    'restore-count-files': '{{PLURAL:$1|1 file|$1 files}}',
    'restore-count-revisions': '{{PLURAL:$1|1 revision|$1 revisions}}',
    'revdelete-content-hid': 'content hidden',
    'revdelete-summary-hid': 'edit summary hidden',
    'logentry-import-upload': '$1 {{GENDER:$2|imported}} $3 by file upload',
    'logentry-import-interwiki': '$1 {{GENDER:$2|imported}} $3 from another wiki',
    'pagemerge-logentry': 'merged [[$1]] into [[$2]] (revisions up to $3)',
    'logentry-move-move': '$1 moved page $3 to $4',
    'logentry-move-move-noredirect': '$1 moved page $3 to $4 without leaving a redirect',
    'logentry-move-move_redir': '$1 moved page $3 to $4 over redirect',
    'logentry-move-move_redir-noredirect': '$1 moved page $3 to $4 over a redirect without leaving a redirect',
    'logentry-protect-modify': '$1 {{GENDER:$2|changed}} protection level for $3 $4',
    'logentry-protect-modify-cascade': '$1 {{GENDER:$2|changed}} protection level for $3 $4 [cascading]',
    'logentry-protect-move_prot': '$1 {{GENDER:$2|moved}} protection settings from $4 to $3',
    'logentry-protect-protect': '$1 {{GENDER:$2|protected}} $3 $4',
    'logentry-protect-protect-cascade': '$1 {{GENDER:$2|protected}} $3 $4 [cascading]',
    'logentry-protect-unprotect': '$1 {{GENDER:$2|removed}} protection from $3',
    'logentry-upload-overwrite': '$1 {{GENDER:$2|uploaded}} a new version of $3',
    'logentry-upload-revert': '$1 {{GENDER:$2|reverted}} $3 to an old version',
    'logentry-upload-upload': '$1 {{GENDER:$2|uploaded}} $3',
    'logentry-newusers-newusers': '$1 created a user account',
    'logentry-newusers-create': '$1 created a user account',
    'logentry-newusers-create2': '$1 created a user account $3',
    'logentry-newusers-autocreate': 'Account $1 was created automatically',
    'logentry-rights-autopromote': '$1 was automatically {{GENDER:$2|promoted}} from $4 to $5',
    'logentry-rights-rights': '$1 {{GENDER:$2|changed}} group membership for {{GENDER:$6|$3}} from $4 to $5',
    'logentry-rights-rights-legacy': '$1 {{GENDER:$2|changed}} group membership for $3',
    'rightsnone': '(none)',
    'userrenametool-success': 'The user "$1" has been renamed to "$2".',
    'logentry-curseprofile-comment': 'comment',
    'logentry-curseprofile-comment-created': '$1 left a $4 on $3\'s profile',
    'logentry-curseprofile-comment-deleted': '$1 deleted a $4 on $3\'s profile.',
    'logentry-curseprofile-comment-edited': '$1 edited a $4 on $3\'s profile.',
    'logentry-curseprofile-comment-purged': '$1 purged a $4 on $3\'s profile.',
    'logentry-curseprofile-comment-replied': '$1 replied to a $4 on $3\'s profile.',
    'logentry-curseprofile-profile-edited': '$1 edited the $4 on $3\'s profile.',
    'allmessages-filter-all': 'All',
    'listusers-select-all': 'Select all',
    'socialactivity-page-title': 'Social Activity',
    'activity-social-activity-poll-placeholder': 'poll',
    'activity-social-activity-image-placeholder': 'image',
    'socialactivity-view': 'view',
    'wall-recentchanges-thread-group': '$1 on [[$2|$3\'s wall]]',
    'activity-social-activity-post-create': "$1 posted $2 in $3: $4",
    'activity-social-activity-post-reply-create': "$1 replied to the post $2 in $3: $4",
    'activity-social-activity-message-create': "$1 left the message $2 on $3's wall: $4",
    'activity-social-activity-message-reply-create': "$1 replied to the message $2 on $3's wall: $4",
    'activity-social-activity-comment-create': "$1 commented on the article $2: $3",
    'activity-social-activity-comment-reply-create': "$1 replied to the comment $2 on the article $3: $4",
    "abusefilter-logentry-create": "$1 {{GENDER:$2|created}} $4 ($5)",
    "abusefilter-logentry-modify": "$1 {{GENDER:$2|modified}} $4 ($5)",
    "abusefilter-log-detailslink": "details",
    'abusefilter-log-entry': '$1: $2 {{GENDER:$8|triggered}} an abuse filter, {{GENDER:$8|performing}} the action \"$3\" on $4.\nActions taken: $5;\nFilter description: $6',
    'abusefilter-log-detailedentry-meta': '$1: $2 {{GENDER:$9|triggered}} $3, {{GENDER:$9|performing}} the action \"$4\" on $5.\nActions taken: $6;\nFilter description: $7 ($8)',
    "abusefilter-log-detailedentry-local": "filter $1",
    "abusefilter-changeslist-examine": "examine",
    'abusefilter-action-block': 'Block',
    'abusefilter-action-blockautopromote': 'Block autopromote',
    'abusefilter-action-degroup': 'Remove from groups',
    'abusefilter-action-disallow': 'Disallow',
    'abusefilter-action-rangeblock': 'Range-block',
    'abusefilter-action-tag': 'Tag',
    'abusefilter-action-throttle': 'Throttle',
    'abusefilter-action-warn': 'Warn',
    'abusefilter-log-noactions': 'none',
    'logentry-contentmodel-new': '$1 {{GENDER:$2|created}} the page $3 using a non-default content model \"$5\"',
    'logentry-contentmodel-change': '$1 {{GENDER:$2|changed}} the content model of the page $3 from \"$4\" to \"$5\"',
    'logentry-contentmodel-change-revert': 'revert',
    'logentry-contentmodel-change-revertlink': 'revert',
};
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
 p.shift(); 
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

},{"./Global":1}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikiaMultiSelectDropdown = void 0;
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

},{"../i18n":12}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var i18n_1 = require("../i18n");
var _1 = require(".");
var RCDataAbstract =  (function () {
    function RCDataAbstract(pWikiInfo, pManager, props) {
        var _a, _b, _c, _d;
        this.manager = pManager;
        this.wikiInfo = pWikiInfo;
        if (!props.title) {
            props.title = "";
        } 
        this.date = props.date;
        this.userEdited = props.isUser;
        this.author = props.author;
        this.titleOriginal = props.title;
        this.title = Utils_1["default"].escapeCharacters(props.title);
        this.titleUrlEscaped = Utils_1["default"].escapeCharactersUrl(props.title);
        this.editFlags = {
            newpage: (_a = props.isNewPage) !== null && _a !== void 0 ? _a : false,
            botedit: (_b = props.isBotEdit) !== null && _b !== void 0 ? _b : false,
            minoredit: (_c = props.isMinorEdit) !== null && _c !== void 0 ? _c : false,
            unpatrolled: !((_d = props.isPatrolled) !== null && _d !== void 0 ? _d : false),
        };
        this.groupWithID = props.groupWithID;
    }
    Object.defineProperty(RCDataAbstract.prototype, "href", {
        get: function () { return this.getUrl(); },
        enumerable: false,
        configurable: true
    });
    ;
    RCDataAbstract.prototype.dispose = function () {
        delete this.manager;
        delete this.wikiInfo;
        this.date = null;
    };
    RCDataAbstract.prototype.time = function () {
        return Utils_1["default"].formatWikiTimeStampTimeOnly(this.date, true);
    };
    RCDataAbstract.prototype.getSummary = function () {
        return RCDataAbstract.renderSummary(this.summary);
    };
    RCDataAbstract.renderSummary = function (pSummary) {
        if (pSummary == "" || pSummary == undefined) {
            return "";
        }
        return " <span class=\"comment\" dir=\"auto\">" + i18n_1["default"]('parentheses', pSummary) + "</span>";
    };
    RCDataAbstract.prototype.getNSClass = function () {
        return "rc-entry-ns-" + this.namespace;
    };
    RCDataAbstract.prototype.shouldBeRemoved = function (pDate) {
        if (this.date.getSeconds() < pDate.getSeconds() - (this.wikiInfo.rcParams.days * 86400)) { 
            return true;
        }
        switch (this.getRemovalType()) {
            case "normal": return this.wikiInfo.resultsCount > this.wikiInfo.rcParams.limit;
            case "discussion": return this.wikiInfo.discussionsCount > Math.min(this.wikiInfo.rcParams.limit, 50);
            case "abuselog": return this.wikiInfo.abuseLogCount > this.wikiInfo.rcParams.limit;
        }
    };
    RCDataAbstract.prototype.getRemovalType = function () {
        var rc = this;
        if (rc.type == _1.RC_TYPE.DISCUSSION) {
            return "discussion";
        }
        else if (rc.type == _1.RC_TYPE.LOG && rc.logtype == "abuse") {
            return "abuselog";
        }
        else {
            return "normal";
        }
    };
    return RCDataAbstract;
}());
exports["default"] = RCDataAbstract;

},{".":20,"../Utils":10,"../i18n":12}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var i18n_1 = require("../i18n");
var _1 = require(".");
var RCDataArticle =  (function (_super) {
    __extends(RCDataArticle, _super);
    function RCDataArticle(pWikiInfo, pManager, pData) {
        var _this = this;
        var isUser = pData.user != "" && pData.anon != "";
        _this = _super.call(this, pWikiInfo, pManager, {
            title: pData.title,
            date: new Date(pData.timestamp),
            author: isUser ? pData.user : (pData.anon ? pData.anon : pData.user),
            isUser: isUser,
            namespace: pData.ns,
            groupWithID: pData.title,
            isNewPage: pData["new"] == "",
            isBotEdit: pData.bot == "",
            isMinorEdit: pData.minor == "",
            isPatrolled: pData.patrolled == "",
        }) || this;
        _this.type = _1.RC_TYPE.NORMAL;
        _this.userhidden = pData.userhidden == "";
        _this.newlen = pData.newlen;
        _this.oldlen = pData.oldlen;
        _this.summary = RCDataArticle.tweakParsedComment(pData.parsedcomment, pData.commenthidden == "", _this.wikiInfo);
        _this.summaryUnparsed = pData.comment;
        _this.pageid = pData.pageid;
        _this.revid = pData.revid;
        _this.old_revid = pData.old_revid;
        return _this;
    }
 RCDataArticle.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
 RCDataArticle.prototype.getUrl = function (params) {
        return this.wikiInfo.getPageUrl(this.titleUrlEscaped, params);
    };
 RCDataArticle.prototype.userDetails = function () {
        return RCDataArticle.formatUserDetails(this.wikiInfo, this.author, this.userhidden, this.userEdited);
    };
    RCDataArticle.formatUserDetails = function (pWikiInfo, pAuthor, pUserHidden, pUserEdited) {
        if (pUserHidden) {
            return '<span class="history-deleted">' + i18n_1["default"]("rev-deleted-user") + '</span>';
        }
        var authorUrlEscaped = Utils_1["default"].escapeCharactersUrl(pAuthor);
        var userLink, userTools = [];
        if (pUserEdited) {
            userLink = "<a href=\"" + pWikiInfo.getPageUrl("User:" + authorUrlEscaped) + "\" class=\"" + pWikiInfo.getUserClass(pAuthor) + "\" " + pWikiInfo.getUserClassDataset(pAuthor) + ">" + pAuthor + "</a>";
            userTools.push("<a href=\"" + pWikiInfo.getPageUrl("User_talk:" + authorUrlEscaped) + "\">" + i18n_1["default"]("talkpagelinktext") + "</a>");
            userTools.push("<a href=\"" + pWikiInfo.getPageUrl("Special:Contributions/" + authorUrlEscaped) + "\">" + i18n_1["default"]("contribslink") + "</a>");
        }
        else {
            userLink = "<a href=\"" + pWikiInfo.getPageUrl("Special:Contributions/" + authorUrlEscaped) + "\" class='rcm-useranon'>" + pAuthor + "</a>";
            if (!pWikiInfo.isWikiaWiki) {
                userTools.push("<a href=\"" + pWikiInfo.getPageUrl("User_talk:" + authorUrlEscaped) + "\">" + i18n_1["default"]("talkpagelinktext") + "</a>");
            }
        }
        if (pWikiInfo.user.rights.block) {
            userTools.push("<a href=\"" + pWikiInfo.getPageUrl("Special:Block/" + authorUrlEscaped) + "\">" + i18n_1["default"]("blocklink") + "</a>");
        }
        var userToolsString = userTools.length === 0 ? "" : " " + i18n_1["default"]('parentheses-start') + userTools.join(i18n_1["default"]("pipe-separator")) + i18n_1["default"]('parentheses-end');
        return "<span class='mw-usertoollinks'>" + userLink + userToolsString + "</span>";
    };
    RCDataArticle.tweakParsedComment = function (pParsedComment, pDeleted, pWikiInfo) {
        if (!pDeleted) {
            pParsedComment = pParsedComment === null || pParsedComment === void 0 ? void 0 : pParsedComment.replace(/<a href="\//g, "<a href=\"" + pWikiInfo.server + "/"); 
        }
        else {
            pParsedComment = "<span class=\"history-deleted\">" + i18n_1["default"]("rev-deleted-comment") + "</span>";
        }
        return pParsedComment === null || pParsedComment === void 0 ? void 0 : pParsedComment.trim().replace(/(\r\n|\n|\r)/gm, " ");
    };
 RCDataArticle.prototype.getNotificationTitle = function () {
        return this.title;
    };
    RCDataArticle.prototype.pageTitleTextLink = function () {
        return "<a class='rc-pagetitle' href='" + this.href + "'>" + this.title + "</a>";
    };
    RCDataArticle.prototype.getRcCompareDiffUrl = function (pToRC) {
        return this.getUrl({
            curid: this.pageid,
            diff: (pToRC === null || pToRC === void 0 ? void 0 : pToRC.revid) || 0,
            oldid: this.old_revid,
        });
    };
    RCDataArticle.prototype.getRcRevisionUrl = function (diff, oldid) {
        return this.getUrl(__assign(__assign({ curid: this.pageid }, (diff || diff == 0) && { diff: diff }), oldid && { oldid: oldid }));
    };
    return RCDataArticle;
}(_1.RCDataAbstract));
exports["default"] = RCDataArticle;

},{".":20,"../Utils":10,"../i18n":12}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../Global");
var _1 = require(".");
var Utils_1 = require("../Utils");
var i18n_1 = require("../i18n");
var $ = window.jQuery, mw = window.mediaWiki;
var RCDataFandomDiscussion =  (function (_super) {
    __extends(RCDataFandomDiscussion, _super);
    function RCDataFandomDiscussion(pWikiInfo, pManager, post) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var thread = post._embedded.thread[0];
        var date = new Date(0);
        date.setUTCSeconds((post.modificationDate || post.creationDate).epochSecond);
        _this = _super.call(this, pWikiInfo, pManager, {
            title: (_a = post.title) !== null && _a !== void 0 ? _a : thread.title,
            date: date,
            author: (_b = post.createdBy.name) !== null && _b !== void 0 ? _b : post.creatorIp.replace("/", ""),
            isUser: !!post.createdBy.name,
            groupWithID: post.threadId,
            namespace: -5234, 
        }) || this;
        _this.type = _1.RC_TYPE.DISCUSSION;
        _this.containerType = thread.containerType || "FORUM";
        _this.id = post.id;
        _this.threadId = post.threadId;
        _this.threadTitle = (_c = thread === null || thread === void 0 ? void 0 : thread.title) !== null && _c !== void 0 ? _c : post.title;
        _this.forumId = post.forumId;
        _this.forumName = post.forumName;
        _this.forumPageName = post.forumName;
        _this.user_id = post.createdBy.id;
        _this.user_avatarUrl = post.createdBy.avatarUrl ? post.createdBy.avatarUrl + "/scale-to-width-down/15" : post.createdBy.avatarUrl;
        _this.isReply = post.isReply;
        _this.isLocked = post.isLocked;
        _this.isReported = post.isReported;
        _this.action = post.position == 1 ? "new" : "reply";
        _this.rawContent = post.rawContent;
        var jsonModel = JSON.parse(post.jsonModel);
        if (post.rawContent) {
            _this.summary = post.rawContent;
            if (_this.summary.length > 100) {
                _this.summary = _this.summary.slice(0, 100).trim() + "...";
            }
        }
        else {
            if (post.poll) {
                _this.summary = Global_1["default"].getWdsSymbol('rcm-disc-poll') + " " + i18n_1["default"]('activity-social-activity-poll-placeholder');
            }
            else if (post.jsonModel) { 
                _this.summary = _this.jsonModelToSummary(jsonModel, 100);
            }
            else if (post.renderedContent) { 
                _this.summary = $("<div>" + post.renderedContent + "</div>").text();
                if (_this.summary.length > 100) {
                    _this.summary = _this.summary.slice(0, 100).trim() + "...";
                }
            }
        }
        _this.summaryUnparsed = _this.summary;
        if (jsonModel || post.poll) {
            try {
                _this.previewData = { jsonModel: jsonModel, attachments: post._embedded.attachments, poll: post.poll };
            }
            catch (e) { }
            ;
        }
        if (_this.containerType == "WALL") {
            if (_this.forumName)
                _this.forumPageName = _this.forumName.replace(" Message Wall", ""); 
            if (RCDataFandomDiscussion.users[post.forumId]) {
                _this.forumPageName = RCDataFandomDiscussion.users[post.forumId].name;
            }
        }
        else if (_this.containerType == "ARTICLE_COMMENT") {
            if (!_this.forumName || _this.forumName == "Root Forum") {
                _this.forumName = undefined;
                _this.forumPageName = undefined;
            }
            if (!_this.threadTitle) {
                if ((_d = thread === null || thread === void 0 ? void 0 : thread.firstPost) === null || _d === void 0 ? void 0 : _d.jsonModel) {
                    var jsonModel_1 = JSON.parse(thread.firstPost.jsonModel);
                    _this.threadTitle = _this.jsonModelToSummary(jsonModel_1, 65); 
                }
                else if ((_e = thread === null || thread === void 0 ? void 0 : thread.firstPost) === null || _e === void 0 ? void 0 : _e.renderedContent) {
                    _this.threadTitle = $("<div>" + ((_f = thread === null || thread === void 0 ? void 0 : thread.firstPost) === null || _f === void 0 ? void 0 : _f.renderedContent) + "</div>").text();
                    if (_this.threadTitle.length > 65) {
                        _this.threadTitle = _this.threadTitle.slice(0, 65).trim() + "...";
                    }
                }
            }
        }
        return _this;
    }
 RCDataFandomDiscussion.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
 RCDataFandomDiscussion.prototype.getUrl = function (params, ignoreReply) {
        if (ignoreReply === void 0) { ignoreReply = false; }
        var _a = this, threadId = _a.threadId, id = _a.id, isReply = _a.isReply, wikiInfo = _a.wikiInfo;
        var showReply = isReply && !ignoreReply;
        switch (this.containerType) {
            case 'FORUM': return wikiInfo.scriptpath + "/f/p/" + threadId + (showReply ? "/r/" + id : '') + (params ? '?' + $.param(params) : '');
            case 'WALL': return "" + wikiInfo.getPageUrl("Message_Wall:" + Utils_1["default"].escapeCharactersUrl(this.forumPageName), __assign({ threadId: threadId }, params)) + (showReply ? "#" + id : '');
            case 'ARTICLE_COMMENT': return wikiInfo.getPageUrl(Utils_1["default"].escapeCharactersUrl(this.forumPageName), __assign(__assign({ commentId: threadId }, showReply && { replyId: id }), params));
        }
    };
    RCDataFandomDiscussion.prototype.getForumUrl = function () {
        var wikiInfo = this.wikiInfo;
        switch (this.containerType) {
            case 'FORUM': return wikiInfo.scriptpath + "/f?catId=" + this.forumId + "&sort=latest";
            case 'WALL': return !this.forumPageName ? "#" : this.wikiInfo.getPageUrl("Message_Wall:" + this.forumPageName);
            case 'ARTICLE_COMMENT': return !this.forumPageName ? "#" : this.getUrl(undefined, false); 
        }
    };
 RCDataFandomDiscussion.prototype.userDetails = function () {
        var articlepath = this.wikiInfo.articlepath, author = Utils_1["default"].escapeCharactersUrl(this.author), authorNotUrlSafe = this.author;
        var toolLinks = [
            "<a href='" + articlepath + "User_talk:" + author + "'>" + i18n_1["default"]("talkpagelinktext") + "</a>",
        ];
        if (this.userEdited) {
            var tUserContribsLink = this.containerType === "FORUM" ? this.wikiInfo.scriptpath + "/f/u/" + this.user_id : this.wikiInfo.articlepath + "Special:Contributions/" + this.author;
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
            ? "<span class=\"rcm-avatar\"><a href=\"" + this.wikiInfo.articlepath + "User:" + Utils_1["default"].escapeCharactersUrl(pAuthor || "") + "\"><img src='" + pAvatarUrl + "' width=\"15\" height=\"15\" /></a> </span>"
            : "";
    };
    RCDataFandomDiscussion.prototype.jsonModelToSummary = function (jsonModel, maxLength) {
        var tJsonToSummary = function (props) {
            if ("content" in props && props.content) {
                return props.content.map(tJsonToSummary).join(" ");
            }
            else if (props.type == "text") {
                return props.text;
            }
            else if (props.type == "image") {
                return " ␚ ";
            } 
            return "";
        };
        var summary = tJsonToSummary(jsonModel).replace(/  /g, " ").trim();
        if (summary.length > maxLength) {
            summary = summary.slice(0, maxLength).trim() + "...";
        }
        summary = summary.replace(/␚/g, Global_1["default"].getWdsSymbol('rcm-disc-image') + " " + i18n_1["default"]('activity-social-activity-image-placeholder'));
        return summary;
    };
    RCDataFandomDiscussion.prototype.discussionTitleText = function (ajaxIcon, pIsHead) {
        if (pIsHead === void 0) { pIsHead = false; }
        ajaxIcon = this.previewData ? (ajaxIcon !== null && ajaxIcon !== void 0 ? ajaxIcon : "") : ""; 
        switch (this.containerType) {
            case "FORUM": {
                var tForumLink = "<a href=\"" + this.getForumUrl() + "\">" + this.forumName + "</a>";
                var tText = i18n_1["default"].MESSAGES["wall-recentchanges-thread-group"].replace(/(\[\[.*\]\])/g, "$2"); 
                return i18n_1["default"].wiki2html(tText, "<a href=\"" + this.getUrl(undefined, pIsHead) + "\">" + this.threadTitle + "</a>" + ajaxIcon, tForumLink); 
            }
            case "WALL": {
                var tText = i18n_1["default"].MESSAGES["wall-recentchanges-thread-group"].replace(/(\[\[.*\]\])/g, "$2"); 
                return i18n_1["default"].wiki2html(tText, "<a href=\"" + this.getUrl(undefined, pIsHead) + "\">" + this.threadTitle + "</a>" + ajaxIcon, "<a href=\"" + this.getForumUrl() + "\">" + this.forumName + "</a>");
            }
            case "ARTICLE_COMMENT": {
                return i18n_1["default"](pIsHead ? "rc-comments" : "rc-comment", this.getCommentForumNameLink(pIsHead) + ajaxIcon);
            }
        }
        mw.log("(discussionTitleText) Unknown containerType:", this.containerType);
    };
    RCDataFandomDiscussion.prototype.getCommentLink = function (_a) {
        var _this = this;
        var text = _a.text, _b = _a.showReply, showReply = _b === void 0 ? true : _b;
        this.updateFromOldCommentFetchDataIfNeeded();
        if (this.forumPageName) {
            return "<a href='" + this.getUrl(undefined, !showReply) + "' title='" + this.title + "'>" + (text == "set-to-page-name" ? this.forumName : text) + "</a>";
        }
        var uniqID = Utils_1["default"].uniqID();
        this.wikiInfo.discCommentPageNamesNeeded.push({ pageID: this.forumId, uniqID: uniqID, cb: function (articleData) {
                if (!_this || !_this.date) {
                    return;
                }
                _this.updateDataFromCommentFetch(articleData);
                $(".rcm" + uniqID).attr("href", _this.getUrl(undefined, !showReply));
                if (text == "set-to-page-name") {
                    $(".rcm" + uniqID).text(_this.forumName);
                }
            } });
        this.fetchCommentFeedsAndPostsIfNeeded();
        return "<a class=\"rcm" + uniqID + "\" href='" + this.getUrl(undefined, !showReply) + "' title='" + this.title + "'>" + (text == "set-to-page-name" ? null : text) + "</a>";
    };
    RCDataFandomDiscussion.prototype.getCommentForumNameLink = function (pIsHead) {
        var _this = this;
        if (pIsHead === void 0) { pIsHead = false; }
        this.updateFromOldCommentFetchDataIfNeeded();
        if (this.forumName) {
            return "[" + this.getUrl(undefined, pIsHead) + " " + this.forumName + "]";
        }
        var uniqID = Utils_1["default"].uniqID();
        this.wikiInfo.discCommentPageNamesNeeded.push({ pageID: this.forumId, uniqID: uniqID, cb: function (articleData) {
                if (!_this || !_this.date) {
                    return;
                }
                _this.updateDataFromCommentFetch(articleData);
                $(".rcm" + uniqID + " a").attr("href", _this.getUrl(undefined, pIsHead)).text(_this.forumName);
            } });
        this.fetchCommentFeedsAndPostsIfNeeded();
        return "<span class=\"rcm" + uniqID + "\">[[#|" + this.forumName + "]]</span>";
    };
    RCDataFandomDiscussion.prototype.getCommentTimeLink = function () {
        var _this = this;
        this.updateFromOldCommentFetchDataIfNeeded();
        if (this.forumPageName) {
            return "<a href='" + this.href + "' title='" + this.title + "'>" + this.time() + "</a>";
        }
        var uniqID = Utils_1["default"].uniqID();
        this.wikiInfo.discCommentPageNamesNeeded.push({ pageID: this.forumId, uniqID: uniqID, cb: function (articleData) {
                if (!_this || !_this.date) {
                    return;
                }
                _this.updateDataFromCommentFetch(articleData);
                $(".rcm" + uniqID).attr("href", _this.href);
            } });
        this.fetchCommentFeedsAndPostsIfNeeded();
        return "<a class=\"rcm" + uniqID + "\" href='" + this.href + "' title='" + this.title + "'>" + this.time() + "</a>";
    };
    RCDataFandomDiscussion.prototype.updateDataFromCommentFetch = function (_a) {
        var title = _a.title, relativeUrl = _a.relativeUrl;
        this.forumName = title;
        this.forumPageName = title;
    };
    RCDataFandomDiscussion.prototype.updateFromOldCommentFetchDataIfNeeded = function () {
        if (!this.forumName && this.wikiInfo.discCommentPageNames.has(this.forumId)) {
            var articleData = this.wikiInfo.discCommentPageNames.get(this.forumId); 
            this.updateDataFromCommentFetch(articleData);
        }
    };
    RCDataFandomDiscussion.prototype.fetchCommentFeedsAndPostsIfNeeded = function () {
        var _this = this;
        if (this.wikiInfo.discCommentPageNamesNeeded.length === 1) {
            var wikiInfo_1 = this.wikiInfo;
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
                    wikiInfo_1.discCommentPageNamesNeeded.forEach(function (o) {
                        if (data.articleNames[Number(o.pageID)]) {
                            o.cb(data.articleNames[Number(o.pageID)]);
                            wikiInfo_1.discCommentPageNames.set(o.pageID, data.articleNames[Number(o.pageID)]);
                        }
                    });
                    wikiInfo_1.discCommentPageNamesNeeded = [];
                }
            });
        }
    };
    RCDataFandomDiscussion.prototype.actionText = function () {
        var userDetails = this.userDetails();
        var forumLink = "<a href=\"" + this.getForumUrl() + "\">" + this.forumPageName + "</a>";
        var threadLink = "<a href=\"" + this.getUrl(undefined, true) + "\">" + this.threadTitle + "</a>";
        var viewLink = " " + i18n_1["default"]('parentheses', "<a href=\"" + this.getUrl() + "\">" + i18n_1["default"]('socialactivity-view') + "</a>");
        var summary = i18n_1["default"]('quotation-marks', "<em>" + this.summary + "</em>");
        switch (this.containerType) {
            default:
            case "FORUM": {
                switch (this.action) {
                    case "new": return i18n_1["default"]('activity-social-activity-post-create', userDetails, threadLink, forumLink, summary) + viewLink;
                    case "reply": return i18n_1["default"]('activity-social-activity-post-reply-create', userDetails, threadLink, forumLink, summary) + viewLink;
                }
            }
            case "WALL": {
                switch (this.action) {
                    case "new": return i18n_1["default"]('activity-social-activity-message-create', userDetails, threadLink, forumLink, summary) + viewLink;
                    case "reply": return i18n_1["default"]('activity-social-activity-message-reply-create', userDetails, threadLink, forumLink, summary) + viewLink;
                }
            }
            case "ARTICLE_COMMENT": {
                forumLink = this.getCommentLink({ text: "set-to-page-name", showReply: false });
                threadLink = this.getCommentLink({ text: this.threadTitle, showReply: false });
                viewLink = " " + i18n_1["default"]('parentheses', this.getCommentLink({ text: i18n_1["default"]('socialactivity-view') }));
                switch (this.action) {
                    case "new": return i18n_1["default"]('activity-social-activity-comment-create', userDetails, forumLink, summary) + viewLink;
                    case "reply": return i18n_1["default"]('activity-social-activity-comment-reply-create', userDetails, threadLink, forumLink, summary) + viewLink;
                }
            }
        }
        return "";
    };
    RCDataFandomDiscussion.prototype.getThreadStatusIcons = function () {
        return ""
            + (this.isLocked ? Global_1["default"].getSymbol("rcm-lock") : "")
            + (this.isReported ? Global_1["default"].getSymbol("rcm-report") : "");
    };
    RCDataFandomDiscussion.prototype.getThreadTypeIcon = function () {
        switch (this.containerType) {
            default:
            case "FORUM": return Global_1["default"].getWdsSymbol('rcm-disc-comment'); 
            case "WALL": return Global_1["default"].getWdsSymbol('rcm-disc-envelope');
            case "ARTICLE_COMMENT": return Global_1["default"].getWdsSymbol('rcm-disc-page'); 
        }
        return "";
    };
    RCDataFandomDiscussion.prototype.getThreadActionIcon = function () {
        switch (this.action) {
            case "new": return this.getThreadTypeIcon();
            case "reply": return Global_1["default"].getWdsSymbol('rcm-disc-reply');
        }
    };
 RCDataFandomDiscussion.prototype.getNotificationTitle = function () {
        switch (this.containerType) {
            case "FORUM": {
                return i18n_1["default"]('discussions') + ": " + this.threadTitle + " [" + this.forumName + "]";
            }
            case "WALL": {
                return i18n_1["default"]('message-wall') + ": " + this.threadTitle + " [" + this.forumName + "]";
            }
            case "ARTICLE_COMMENT": {
                return i18n_1["default"]("comments");
            }
        }
    };
    RCDataFandomDiscussion.users = {};
    return RCDataFandomDiscussion;
}(_1.RCDataAbstract));
exports["default"] = RCDataFandomDiscussion;

},{".":20,"../Global":1,"../Utils":10,"../i18n":12}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var i18n_1 = require("../i18n");
var _1 = require(".");
var Global_1 = require("../Global");
var  mw = window.mediaWiki;
var RCDataLog =  (function (_super) {
    __extends(RCDataLog, _super);
    function RCDataLog(pWikiInfo, pManager, pData) {
        var _this = this;
        var isUser = pData.user != "" && pData.anon != "";
        _this = _super.call(this, pWikiInfo, pManager, {
            title: pData.title,
            date: new Date(pData.timestamp),
            author: isUser ? pData.user : (pData.anon ? pData.anon : pData.user),
            isUser: isUser,
            namespace: pData.ns,
            groupWithID: pData.logtype,
            isNewPage: pData["new"] == "",
            isBotEdit: pData.bot == "",
            isMinorEdit: pData.minor == "",
            isPatrolled: pData.patrolled == "",
        }) || this;
        _this.type = _1.RC_TYPE.LOG;
        _this.summary = _1.RCDataArticle.tweakParsedComment(pData.parsedcomment, pData.commenthidden == "", _this.wikiInfo);
        _this.summaryUnparsed = pData.comment;
        _this.logid = pData.logid;
        _this.logtype = pData.logtype;
        _this.logaction = pData.logaction;
        _this.actionhidden = pData.actionhidden == "";
        _this.userhidden = pData.userhidden == "";
        _this._initLog(pData);
        return _this;
    }
 RCDataLog.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    RCDataLog.prototype._initLog = function (pRCData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (this.actionhidden) {
            return;
        }
        this.logParams = __assign({ type: this.logtype }, ((_a = pRCData.logparams) !== null && _a !== void 0 ? _a : {}));
        switch (this.logParams.type) {
            case "abuse": {
                var _o = (_b = pRCData.logparams) !== null && _b !== void 0 ? _b : {}, result = _o.result, filter = _o.filter, filter_id = _o.filter_id;
                this.logParams = {
                    type: "abuse",
                    result: result,
                    filter: filter,
                    filter_id: filter_id,
                };
                break;
            }
            case "abusefilter": {
                var _p = (_c = pRCData.logparams) !== null && _c !== void 0 ? _c : {}, historyId = _p.historyId, newId = _p.newId;
                this.logParams = {
                    type: "abusefilter",
                    historyId: historyId,
                    newId: newId,
                };
                break;
            }
            case "block": {
                var _q = (_d = pRCData.logparams) !== null && _d !== void 0 ? _d : {}, duration = _q.duration, flags = _q.flags, expiry = _q.expiry, sitewide = _q.sitewide;
                this.logParams = {
                    type: "block",
                    duration: duration,
                    flags: (flags !== null && flags !== void 0 ? flags : [])
                        .map(function (f) { return i18n_1["default"].exists("block-log-flags-" + f) ? i18n_1["default"](("block-log-flags-" + f)) : f; })
                        .join(", "),
                    expiry: expiry,
                    sitewide: sitewide === "",
                };
                break;
            }
            case "contentmodel": {
                var _r = (_e = pRCData.logparams) !== null && _e !== void 0 ? _e : {}, oldmodel = _r.oldmodel, newmodel = _r.newmodel;
                this.logParams = {
                    type: "contentmodel",
                    oldmodel: oldmodel,
                    newmodel: newmodel,
                };
                break;
            }
            case "curseprofile": {
                var _s = (_f = pRCData.logparams) !== null && _f !== void 0 ? _f : {}, section = _s["4:section"], comment_id = _s["4:comment_id"];
                this.logParams = {
                    type: "curseprofile",
                    section: section,
                    comment_id: comment_id,
                };
                break;
            }
            case "delete": {
                var _t = (_g = pRCData.logparams) !== null && _g !== void 0 ? _g : {}, count = _t.count, ids = _t.ids,  newMask = _t.new;
                this.logParams = {
                    type: "delete",
                    ids_length: (_h = ids === null || ids === void 0 ? void 0 : ids.length) !== null && _h !== void 0 ? _h : 1,
                    new_bitmask: newMask === null || newMask === void 0 ? void 0 : newMask.bitmask,
                    count: count,
                };
                break;
            }
            case "merge": {
                var _u = (_j = pRCData.logparams) !== null && _j !== void 0 ? _j : {}, dest_title = _u.dest_title, mergepoint = _u.mergepoint;
                this.logParams = {
                    type: "merge",
                    destination: dest_title ? Utils_1["default"].escapeCharacters(dest_title) : "",
                    mergepoint: mergepoint,
                };
                break;
            }
            case "move": {
                var _v = (_k = pRCData.logparams) !== null && _k !== void 0 ? _k : {}, target_title = _v.target_title, suppressredirect = _v.suppressredirect;
                this.logParams = {
                    type: "move",
                    suppressredirect: suppressredirect == "",
                    newTitle: target_title && Utils_1["default"].escapeCharacters(target_title),
                };
                break;
            }
            case "protect": {
                var _w = (_l = pRCData.logparams) !== null && _l !== void 0 ? _l : {}, description = _w.description,  cascade = _w.cascade,  oldtitle_title = _w.oldtitle_title;
                this.logParams = {
                    type: "protect",
                    description: description,
                    cascade: cascade === "",
                    oldtitle_title: oldtitle_title,
                };
                break;
            }
            case "rights": {
                var _x = (_m = pRCData.logparams) !== null && _m !== void 0 ? _m : {}, oldgroups = _x.oldgroups, newgroups = _x.newgroups;
                this.logParams = {
                    type: "rights",
                    legacy: !newgroups && !oldgroups,
                    newgroups: (newgroups === null || newgroups === void 0 ? void 0 : newgroups.length) > 0 ? newgroups.join(", ") : i18n_1["default"]("rightsnone"),
                    oldgroups: (oldgroups === null || oldgroups === void 0 ? void 0 : oldgroups.length) > 0 ? oldgroups.join(", ") : i18n_1["default"]("rightsnone"),
                };
                break;
            }
        }
    };
    RCDataLog.prototype.logTitleLink = function () {
        var logPage = this.logtype === "abuse" ? "Special:AbuseLog" : "Special:Log/" + this.logtype;
        return "(<a class='rc-log-link' href='" + this.wikiInfo.getPageUrl(logPage) + "'>" + this.logTitle() + "</a>)";
    };
    RCDataLog.prototype.logTitle = function () {
        switch (this.logtype) {
            case "abuse": return i18n_1["default"]("abuselog");
            case "abusefilter": return i18n_1["default"]("abusefilter-log");
            case "block": return i18n_1["default"]("blocklogpage");
            case "contentmodel": return i18n_1["default"]("log-name-contentmodel");
            case "curseprofile": return i18n_1["default"]("curseprofile_log_name");
            case "delete": return i18n_1["default"]("dellogpage");
            case "import": return i18n_1["default"]("importlogpage");
            case "merge": return i18n_1["default"]("mergelog");
            case "move": return i18n_1["default"]("movelogpage");
            case "newusers": return i18n_1["default"]("newuserlogpage");
            case "protect": return i18n_1["default"]("protectlogpage");
            case "renameuser": return i18n_1["default"]("userrenametool-logpage");
            case "rights": return i18n_1["default"]("rightslog");
            case "upload": return i18n_1["default"]("uploadlogpage");
            default: return this.logtype; 
        }
    };
    RCDataLog.prototype.logActionText = function () {
        var _this = this;
        var _a, _b, _c;
        var tLogMessage = "";
        var tAfterLogMessage;
        if (this.actionhidden) {
            tLogMessage = "<span class=\"history-deleted\">" + i18n_1["default"]("rev-deleted-event") + "</span>";
            tLogMessage += this.getSummary();
        }
        switch (this.logParams.type) {
            case "abuse": {
                var _d = this.logParams, result = _d.result, filter_1 = _d.filter;
                var filterFromDesc_1 = { found: 0 };
                if (filter_1.trim() != "") {
                    Object.keys(this.wikiInfo.abuseFilters).forEach(function (i) {
                        if (_this.wikiInfo.abuseFilters[i].description == filter_1) {
                            filterFromDesc_1.found++;
                            filterFromDesc_1.id = Number(i);
                            filterFromDesc_1.private = _this.wikiInfo.abuseFilters[i].private;
                        }
                    });
                }
                if (filterFromDesc_1.found !== 1) {
                    filterFromDesc_1.id = filterFromDesc_1.private = undefined;
                }
                filterFromDesc_1.private = filterFromDesc_1.private !== undefined ? filterFromDesc_1.private : true; 
                var resultString = result === ""
                    ? i18n_1["default"]('abusefilter-log-noactions')
                    : result.split(",").map(function (r) { return i18n_1["default"]('abusefilter-action-' + r); }).join(", ");
                var filterIdLink = !filterFromDesc_1.private && filterFromDesc_1.id
                    ? "<a href='" + this.wikiInfo.getPageUrl('Special:AbuseFilter/' + filterFromDesc_1.id) + "'>" + i18n_1["default"]('abusefilter-log-detailedentry-local', filterFromDesc_1.id) + "</a>"
                    : i18n_1["default"]('abusefilter-log-detailedentry-local', filterFromDesc_1.id !== undefined ? filterFromDesc_1.id : "?");
                if (this.wikiInfo.user.rights.abusefilter_log_detail) {
                    tLogMessage = i18n_1["default"]('abusefilter-log-detailedentry-meta', undefined, this.userDetails(), filterIdLink, this.logaction, "<a href='" + this.href + "'>" + this.title + "</a>", resultString, filter_1, [
                        "<a href='" + this.wikiInfo.getPageUrl("Special:AbuseLog/" + this.logid) + "'>" + i18n_1["default"]('abusefilter-log-detailslink') + "</a>",
                        "<a href='" + this.wikiInfo.getPageUrl("Special:AbuseFilter/examine/log/" + this.logid) + "'>" + i18n_1["default"]('abusefilter-changeslist-examine') + "</a>",
                    ].join(" | "), Global_1.UNKNOWN_GENDER_TYPE);
                }
                else {
                    tLogMessage = i18n_1["default"]('abusefilter-log-entry', undefined, this.userDetails(), this.logaction, "<a href='" + this.href + "'>" + this.title + "</a>", resultString, filter_1, undefined, Global_1.UNKNOWN_GENDER_TYPE);
                    if (filterFromDesc_1.id !== undefined && !filterFromDesc_1.private) {
                        tLogMessage += " (" + filterIdLink + ")";
                    }
                }
                tLogMessage = tLogMessage.replace("$1: ", "").replace("$1", "");
                break;
            }
            case "abusefilter": {
                var _e = this.logParams, filterId = _e.newId, historyId = _e.historyId;
                this.wikiInfo.needsAbuseFilters = true;
                switch (this.logaction) {
                    case "create":
                    case "modify":
                        {
                            tLogMessage += i18n_1["default"]("abusefilter-logentry-" + this.logaction, this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, undefined, "<a href='" + this.href + "'>" + this.title + "</a>", "<a href='" + this.wikiInfo.getPageUrl("Special:AbuseFilter/history/" + filterId + "/diff/prev/" + historyId) + "'>" + i18n_1["default"]("abusefilter-log-detailslink") + "</a>");
                            break;
                        }
                }
                break;
            }
            case "block": {
                var _f = this.logParams, duration = _f.duration, flags = _f.flags;
                var affectedUser = (_a = this.title.split(/:(.+)/)[1]) !== null && _a !== void 0 ? _a : this.title;
                tLogMessage += i18n_1["default"](("logentry-block-" + this.logaction), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, undefined, 
                Global_1.UNKNOWN_GENDER_TYPE, 
                duration, flags && i18n_1["default"]('parentheses', flags));
                tLogMessage = tLogMessage.replace("$3", _1.RCDataArticle.formatUserDetails(this.wikiInfo, affectedUser, false, !mw.util.isIPAddress(affectedUser)));
                break;
            }
            case 'contentmodel': {
                var _g = this.logParams, oldmodel = _g.oldmodel, newmodel = _g.newmodel;
                switch (this.logaction) {
                    case "new":
                    case "change":
                        {
                            tLogMessage += i18n_1["default"]("logentry-contentmodel-" + this.logaction, this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + this.title + "</a>", oldmodel, newmodel);
                            break;
                        }
                }
                if (this.logaction == "change" && this.wikiInfo.user.rights.editcontentmodel) {
                    tLogMessage += " (<a href='" + this.wikiInfo.getPageUrl('Special:ChangeContentModel', { pagetitle: this.titleUrlEscaped, model: oldmodel, reason: i18n_1["default"]('logentry-contentmodel-change-revert') }) + "'>" + i18n_1["default"]('logentry-contentmodel-change-revertlink') + "</a>)";
                }
                break;
            }
            case "curseprofile": {
                var _h = this.logParams, section = _h.section, comment_id = _h.comment_id;
                var affectedUser = (_b = this.title.split(/:(.+)/)[1]) !== null && _b !== void 0 ? _b : this.title;
                switch (this.logaction) {
                    case "profile-edited":
                        {
                            tLogMessage += i18n_1["default"]("logentry-curseprofile-" + this.logaction, this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + affectedUser + "</a>", section.replace("profile-", ""));
                            break;
                        }
                    default: {
                        var commentLink = i18n_1["default"]('logentry-curseprofile-comment');
                        if (comment_id != 0) {
                            commentLink = "<a href=\"" + this.wikiInfo.getPageUrl("Special:CommentPermalink/" + comment_id + "#comment" + comment_id) + "\">" + commentLink + "</a>";
                        }
                        tLogMessage += i18n_1["default"]("logentry-curseprofile-" + this.logaction, this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + affectedUser + "</a>", commentLink);
                        break;
                    }
                }
                break;
            }
            case "delete": {
                var _j = this.logParams, ids_length = _j.ids_length, new_bitmask = _j.new_bitmask, count = _j.count;
                var arg4 = undefined;
                switch (this.logaction) {
                    case 'restore': {
                        if (count) {
                            var tArray = [];
                            if ((count === null || count === void 0 ? void 0 : count.revisions) > 0) {
                                tArray.push(i18n_1["default"]('restore-count-revisions', count.revisions));
                            }
                            if ((count === null || count === void 0 ? void 0 : count.files) > 0) {
                                tArray.push(i18n_1["default"]('restore-count-files', count.files));
                            }
                            arg4 = tArray.join(i18n_1["default"]("and") + i18n_1["default"]("word-separator"));
                        }
                        else {
                            this.logaction += '-nocount';
                        }
                        break;
                    }
                    case 'revision':
                    case 'event': {
                        arg4 = (_c = {
                            1: i18n_1["default"]("revdelete-content-hid"),
                            2: i18n_1["default"]("revdelete-summary-hid"),
                            3: i18n_1["default"]("revdelete-content-hid") + i18n_1["default"]("and") + i18n_1["default"]("word-separator") + i18n_1["default"]("revdelete-summary-hid"),
                        }[new_bitmask]) !== null && _c !== void 0 ? _c : "?";
                        break;
                    }
                }
                tLogMessage += i18n_1["default"](("logentry-delete-" + this.logaction), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + this.title + "</a>", arg4, ids_length);
                if (this.wikiInfo.user.rights.undelete && this.logaction == "delete") {
                    tAfterLogMessage = " " + i18n_1["default"]('parentheses', "<a href='" + this.wikiInfo.getPageUrl('Special:Undelete', { target: this.titleUrlEscaped }) + "'>" + i18n_1["default"]("undeletelink") + "</a>");
                }
                break;
            }
            case "import": {
                tLogMessage += i18n_1["default"](("logentry-import-" + this.logaction), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + this.title + "</a>");
                break;
            }
            case "merge": {
                var _k = this.logParams, destination = _k.destination, mergepoint = _k.mergepoint;
                tLogMessage += this.userDetails() + " ";
                tLogMessage += i18n_1["default"]("pagemerge-logentry", this.href + "|" + this.title, this.wikiInfo.articlepath + destination + "|" + destination, Utils_1["default"].formatWikiTimeStamp(new Date(mergepoint)));
                break;
            }
            case "move": {
                var _l = this.logParams, newTitle = _l.newTitle, suppressredirect = _l.suppressredirect;
                var noredirect = suppressredirect ? "-noredirect" : "";
                tLogMessage += i18n_1["default"](("logentry-move-" + this.logaction + noredirect), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.getUrl({ redirect: "no" }) + "'>" + this.title + "</a>", "<a href='" + (this.wikiInfo.articlepath + Utils_1["default"].escapeCharactersUrl(newTitle)) + "'>" + newTitle + "</a>");
                break;
            }
            case "newusers": {
                tLogMessage += i18n_1["default"](("logentry-newusers-" + this.logaction), this.userDetails(), undefined, "");
                break;
            }
            case "protect": {
                var _m = this.logParams, description = _m.description, cascade = _m.cascade, oldtitle_title = _m.oldtitle_title;
                var arg4 = description;
                switch (this.logaction) {
                    case "move_prot": {
                        arg4 = this.wikiInfo.getPageUrl(oldtitle_title);
                        break;
                    }
                }
                tLogMessage += i18n_1["default"](("logentry-protect-" + this.logaction + (cascade ? '-cascade' : '')), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + this.title + "</a>", arg4);
                break;
            }
            case "renameuser": {
                tLogMessage += this.userDetails() + " renameuser"; 
                break;
            }
            case "rights": {
                var _o = this.logParams, oldgroups = _o.oldgroups, newgroups = _o.newgroups, legacy = _o.legacy;
                if (legacy && this.logaction == "rights") {
                    this.logaction += '-legacy';
                }
                tLogMessage += i18n_1["default"](("logentry-rights-" + this.logaction), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + this.title + "</a>", oldgroups, newgroups, Global_1.UNKNOWN_GENDER_TYPE);
                break;
            }
            case "upload": {
                tLogMessage += i18n_1["default"](("logentry-upload-" + this.logaction), this.userDetails(), Global_1.UNKNOWN_GENDER_TYPE, "<a href='" + this.href + "'>" + this.title + "</a>");
                break;
            }
        }
        if (tLogMessage == "") {
            tLogMessage += this.userDetails() + (" ??? (" + this.logtype + " - " + this.logaction + ") ");
        }
        tLogMessage += this.getSummary();
        if (tAfterLogMessage) {
            tLogMessage += tAfterLogMessage;
        }
        return tLogMessage;
    };
 RCDataLog.prototype.getUrl = function (params) {
        return this.wikiInfo.getPageUrl(this.titleUrlEscaped, params);
    };
 RCDataLog.prototype.userDetails = function () {
        return _1.RCDataArticle.formatUserDetails(this.wikiInfo, this.author, this.userhidden, this.userEdited);
    };
 RCDataLog.prototype.getNotificationTitle = function () {
        return this.logTitle() + (this.title ? " - " + this.title : "");
    };
    RCDataLog.abuseLogDataToNormalLogFormat = function (log) {
        return {
            type: "log",
            ns: log.ns,
            title: log.title,
            timestamp: log.timestamp,
            user: log.user,
            pageid: log.id,
            anon: mw.util.isIPAddress(log.user) ? "" : undefined,
            oldlen: 0,
            newlen: 0,
            revid: 0,
            old_revid: 0,
            rcid: 0,
            comment: undefined,
            parsedcomment: undefined,
            logid: log.id,
            logtype: "abuse",
            logaction: log.action,
            logparams: {
                filter: log.filter,
                filter_id: log.filter_id,
                result: log.result,
            }
        };
    };
    return RCDataLog;
}(_1.RCDataAbstract));
exports["default"] = RCDataLog;

},{".":20,"../Global":1,"../Utils":10,"../i18n":12}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var i18n_1 = require("../i18n");
var Global_1 = require("../Global");
var GlobalModal_1 = require("../GlobalModal");
var _1 = require(".");
var $ = window.jQuery, mw = window.mediaWiki;
var RCList =  (function () {
    function RCList(pManager) {
        this.manager = pManager;
        this.list = [];
    }
    Object.defineProperty(RCList.prototype, "newest", {
        get: function () { return this.list[0]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "oldest", {
        get: function () { return this.list[this.list.length - 1]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "date", {
        get: function () { return this.newest.date; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RCList.prototype, "wikiInfo", {
        get: function () { return this.newest.wikiInfo; },
        enumerable: false,
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
        return this.wikiInfo.scriptpath == pRC.wikiInfo.scriptpath
            && this.newest.type == pRC.type
            && this.newest.groupWithID == pRC.groupWithID
            && Utils_1["default"].getMonth(this.date) == Utils_1["default"].getMonth(pRC.date)
            && Utils_1["default"].getDate(this.date) == Utils_1["default"].getDate(pRC.date);
    };
    RCList.prototype._diffHist = function (pRC) {
        var diffLink = i18n_1["default"]('diff');
        if (pRC.editFlags.newpage == false) {
            diffLink = "<a class='rc-diff-link' href='" + pRC.getRcCompareDiffUrl(pRC) + "'>" + diffLink + "</a>" + this.getAjaxDiffButton();
        }
        if (pRC.namespace == 6) {
            diffLink += this.getAjaxImageButton();
        }
        return "" + i18n_1["default"]('parentheses-start') + diffLink + i18n_1["default"]("pipe-separator") + "<a class='rc-hist-link' href='" + pRC.getUrl({ action: 'history' }) + "'>" + i18n_1["default"]('hist') + "</a>" + i18n_1["default"]('parentheses-end');
    };
    RCList.prototype._diffSizeText = function (pToRC, pFromRC) {
        var tDiffSize = pToRC.newlen - (pFromRC !== null && pFromRC !== void 0 ? pFromRC : pToRC).oldlen;
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
        var contribs = this.list.reduce(function (map, rc) {
            if (map.has(rc.author)) {
                map.get(rc.author).count++; 
            }
            else {
                map.set(rc.author, { count: 1, anon: !rc.userEdited, avatar: (rc.type == _1.RC_TYPE.DISCUSSION ? rc.getCreatorAvatarImg() : "") });
            }
            return map;
        }, new Map());
        var contribLinks = [];
        contribs.forEach(function (_a, key) {
            var count = _a.count, anon = _a.anon, avatar = _a.avatar;
            contribLinks.push(_this._userPageLink(key, !anon, avatar) + (count > 1 ? " " + i18n_1["default"]('parentheses', i18n_1["default"]('ntimes', count)) : ""));
        });
        return i18n_1["default"]('brackets', contribLinks.join(i18n_1["default"]('semicolon-separator')));
    };
    RCList.prototype._userPageLink = function (pUsername, pUserEdited, pAvatar) {
        if (pUserEdited) {
            return pAvatar + "<a href='" + this.wikiInfo.getPageUrl("User:" + Utils_1["default"].escapeCharactersUrl(pUsername)) + "' class=\"" + this.wikiInfo.getUserClass(pUsername) + "\" " + this.wikiInfo.getUserClassDataset(pUsername) + ">" + pUsername + "</a>";
        }
        else {
            return "<a class=\"rcm-useranon\" href='" + this.wikiInfo.getPageUrl("Special:Contributions/" + Utils_1["default"].escapeCharactersUrl(pUsername)) + "'>" + pUsername + "</a>";
        }
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
        if (!pElem) {
            return;
        }
        if (pToRC == undefined) {
            pToRC = pFromRC;
        }
        if (pFromRC.type != _1.RC_TYPE.NORMAL || pToRC.type != _1.RC_TYPE.NORMAL) {
            return;
        }
        var pageName = pFromRC.title;
        var pageID = pFromRC.pageid;
        var ajaxLink = this.wikiInfo.getApiUrl({
            action: 'query', format: 'json', prop: 'revisions|info', rvprop: 'size|user|parsedcomment|timestamp|flags',
            rvdiffto: pToRC.revid, revids: pFromRC.old_revid
        });
        var diffLink = pFromRC.getUrl({ curid: pFromRC.pageid, diff: pToRC.revid, oldid: pFromRC.old_revid });
        var undoLink = pFromRC.getUrl({ curid: pFromRC.pageid, undo: pToRC.revid, undoafter: pFromRC.old_revid, action: 'edit' });
        var diffTableInfo = {
            wikiInfo: pFromRC.wikiInfo,
            titleUrlEscaped: pFromRC.titleUrlEscaped,
            newRev: { user: pToRC.userDetails(), summary: pToRC.getSummary(), date: pToRC.date, minor: pToRC.editFlags.minoredit },
        };
        this._addAjaxClickListener(pElem, function () { GlobalModal_1.previewDiff(pageName, pageID, ajaxLink, diffLink, undoLink, diffTableInfo); });
    };
    RCList.prototype.addPreviewImageListener = function (pElem, pImageRCs) {
        if (!pElem) {
            return;
        }
        var imageRCs = (Array.isArray(pImageRCs) ? pImageRCs : [pImageRCs]);
        var tImageNames = imageRCs.map(function (rc) { return rc.titleUrlEscaped; }).filter(function (name, pos, arr) { return arr.indexOf(name) == pos; });
        var ajaxLink = this.wikiInfo.getApiUrl({ action: 'query', format: 'json', prop: 'imageinfo', iiprop: 'url|size', redirects: '1' });
        var articlepath = this.wikiInfo.articlepath;
        this._addAjaxClickListener(pElem, function () { GlobalModal_1.previewImages(ajaxLink, tImageNames, articlepath); });
    };
    RCList.prototype.addPreviewPageListener = function (pElem, pRC) {
        if (!pElem) {
            return;
        }
        switch (pRC.type) {
            case _1.RC_TYPE.DISCUSSION: {
                this._addAjaxClickListener(pElem, function () {
                    GlobalModal_1.previewDiscussionHTML(pRC);
                });
                break;
            }
            case _1.RC_TYPE.NORMAL: {
                var ajaxLink_1 = this.wikiInfo.getApiUrl({ action: 'parse', format: 'json', pageid: pRC.pageid, prop: 'text|headhtml', disabletoc: 'true' });
                var pageName_1 = pRC.title;
                var pageHref_1 = pRC.href;
                var serverLink_1 = this.wikiInfo.server;
                this._addAjaxClickListener(pElem, function () { GlobalModal_1.previewPage(ajaxLink_1, pageName_1, pageHref_1, serverLink_1); });
                break;
            }
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
        if (!pRC.editFlags[pFlag]) {
            return pEmpty;
        }
        var _a = RCList.FLAG_INFO_MAP[pFlag], letter = _a.letter, tooltip = _a.tooltip;
        return "<abbr class=\"" + pFlag + "\" title=\"" + i18n_1["default"](tooltip) + "\">" + i18n_1["default"](letter) + "</abbr>";
    };
    RCList.prototype._getFlags = function (pRC, pEmpty, pData) {
        return [
            this._flag("newpage", pRC, pEmpty),
            ((pData === null || pData === void 0 ? void 0 : pData.ignoreminoredit) ? pEmpty : this._flag("minoredit", pRC, pEmpty)),
            this._flag("botedit", pRC, pEmpty),
            pEmpty 
        ].join("");
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
            case _1.RC_TYPE.NORMAL:
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
            case _1.RC_TYPE.LOG: {
                var tRC = pRC;
                html += tRC.logTitleLink();
                if (tRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += RCList.SEP;
                html += tRC.logActionText();
                break;
            }
            case _1.RC_TYPE.DISCUSSION: {
                var tRC = pRC;
                html += pRC.getThreadActionIcon() + " ";
                html += tRC.getThreadStatusIcons();
                html += tRC.discussionTitleText(this.getAjaxPagePreviewButton());
                html += RCList.SEP;
                html += pRC.actionText();
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
        var _a;
        if (this.list.length == 1) {
            return this._toHTMLSingle(this.newest);
        }
        var tBlockHead = this._toHTMLBlockHead();
        for (var i = 0; i < this.list.length; i++) {
            (_a = tBlockHead.querySelector("tbody")) === null || _a === void 0 ? void 0 : _a.appendChild(this._toHTMLBlockLine(this.list[i]));
        }
        if ($(tBlockHead).makeCollapsibleRCM) {
            $(tBlockHead).makeCollapsibleRCM();
        }
        return tBlockHead;
    };
    RCList.prototype._toHTMLBlockHead = function () {
        var html = "";
        switch (this.newest.type) {
            case _1.RC_TYPE.NORMAL: {
                html += "<a class='rc-pagetitle' href='" + this.newest.href + "'>" + this.newest.title + "</a>";
                html += this.getAjaxPagePreviewButton();
                html += " " + i18n_1["default"]('parentheses-start');
                html += this.oldest.editFlags.newpage == false
                    ? "<a class='rc-changes-link' href='" + this.oldest.getRcCompareDiffUrl(this.newest) + "'>" + i18n_1["default"]("nchanges", this.list.length) + "</a>" + this.getAjaxDiffButton()
                    : i18n_1["default"]("nchanges", this.list.length);
                if (this.newest.namespace == 6) {
                    html += this.getAjaxImageButton();
                }
                html += i18n_1["default"]("pipe-separator");
                html += "<a href='" + this.newest.getUrl({ action: 'history' }) + "'>" + i18n_1["default"]("hist") + "</a>";
                html += i18n_1["default"]('parentheses-end');
                html += RCList.SEP;
                html += this._diffSizeText(this.newest, this.oldest);
                break;
            }
            case _1.RC_TYPE.LOG: {
                html += this.newest.logTitleLink();
                if (this.newest.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                break;
            }
            case _1.RC_TYPE.DISCUSSION: {
                html += this.newest.getThreadTypeIcon() + " ";
                html += this.newest.discussionTitleText(undefined, true);
                html += " " + i18n_1["default"]('parentheses-start');
                html += i18n_1["default"]("nchanges", this.list.length);
                html += i18n_1["default"]('parentheses-end');
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
            case _1.RC_TYPE.NORMAL: {
                html += "<span class='mw-enhanced-rc-time'><a href='" + pRC.getRcRevisionUrl(undefined, pRC.revid) + "' title='" + pRC.title + "'>" + pRC.time() + "</a></span>";
                var diffs = [
                    "<a href='" + pRC.getRcRevisionUrl(0, pRC.revid) + "'>" + i18n_1["default"]("cur") + "</a>",
                    pRC.editFlags.newpage == false ? "<a href='" + pRC.getRcRevisionUrl(pRC.revid, pRC.old_revid) + "'>" + i18n_1["default"]("last") + "</a>" + this.getAjaxDiffButton() : i18n_1["default"]("last"),
                ].filter(function (o) { return !!o; });
                html += " " + i18n_1["default"]('parentheses', diffs.join(i18n_1["default"]("pipe-separator")));
                html += RCList.SEP;
                html += this._diffSizeText(pRC);
                html += RCList.SEP;
                html += pRC.userDetails();
                html += pRC.getSummary();
                break;
            }
            case _1.RC_TYPE.LOG: {
                html += "<span class='mw-enhanced-rc-time'>" + pRC.time() + "</span>";
                if (pRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += RCList.SEP;
                html += pRC.logActionText();
                break;
            }
            case _1.RC_TYPE.DISCUSSION: {
                if (pRC.containerType == "ARTICLE_COMMENT") {
                    html += "<span class='mw-enhanced-rc-time'>" + pRC.getCommentTimeLink() + "</span>";
                }
                else {
                    html += "<span class='mw-enhanced-rc-time'><a href='" + pRC.href + "' title='" + pRC.title + "'>" + pRC.time() + "</a></span>";
                }
                if (pRC.previewData)
                    html += this.getAjaxPagePreviewButton();
                html += pRC.getThreadStatusIcons();
                html += RCList.SEP;
                html += pRC.getThreadActionIcon() + " ";
                html += pRC.actionText();
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
            case _1.RC_TYPE.NORMAL:
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
            case _1.RC_TYPE.LOG: {
                html += pRC.logTitleLink();
                if (pRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += i18n_1["default"]("semicolon-separator") + pRC.time();
                html += RCList.SEP;
                html += pRC.logActionText();
                break;
            }
            case _1.RC_TYPE.DISCUSSION: {
                html += pRC.getThreadActionIcon() + " ";
                html += pRC.getThreadStatusIcons();
                html += pRC.discussionTitleText(this.getAjaxPagePreviewButton());
                html += i18n_1["default"]("semicolon-separator") + pRC.time();
                html += RCList.SEP;
                html += pRC.actionText();
                break;
            }
        }
        var tLi = Utils_1["default"].newElement("li", { className: (pIndex % 2 == 0 ? "mw-line-even" : "mw-line-odd") + (" " + pRC.wikiInfo.rcClass + " " + pRC.getNSClass()) });
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
    RCList.FLAG_INFO_MAP = {
        newpage: { letter: "newpageletter", tooltip: "recentchanges-label-newpage" },
        minoredit: { letter: "minoreditletter", tooltip: "recentchanges-label-minor" },
        botedit: { letter: "boteditletter", tooltip: "recentchanges-label-bot" },
    };
    return RCList;
}());
exports["default"] = RCList;

},{".":20,"../Global":1,"../GlobalModal":2,"../Utils":10,"../i18n":12}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RC_TYPE = exports.RCList = exports.RCDataFandomDiscussion = exports.RCDataLog = exports.RCDataArticle = exports.RCDataAbstract = void 0;
var RCDataAbstract_1 = require("./RCDataAbstract");
exports.RCDataAbstract = RCDataAbstract_1["default"];
var RCDataArticle_1 = require("./RCDataArticle");
exports.RCDataArticle = RCDataArticle_1["default"];
var RCDataLog_1 = require("./RCDataLog");
exports.RCDataLog = RCDataLog_1["default"];
var RCDataFandomDiscussion_1 = require("./RCDataFandomDiscussion");
exports.RCDataFandomDiscussion = RCDataFandomDiscussion_1["default"];
var RCList_1 = require("./RCList");
exports.RCList = RCList_1["default"];
var RC_TYPE_1 = require("../types/RC_TYPE");
exports.RC_TYPE = RC_TYPE_1["default"];

},{"../types/RC_TYPE":22,"./RCDataAbstract":15,"./RCDataArticle":16,"./RCDataFandomDiscussion":17,"./RCDataLog":18,"./RCList":19}],21:[function(require,module,exports){
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

},{"./Main":3}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RC_TYPE;
(function (RC_TYPE) {
    RC_TYPE[RC_TYPE["NORMAL"] = 0] = "NORMAL";
    RC_TYPE[RC_TYPE["LOG"] = 1] = "LOG";
    RC_TYPE[RC_TYPE["DISCUSSION"] = 2] = "DISCUSSION";
})(RC_TYPE || (RC_TYPE = {}));
exports["default"] = RC_TYPE;

},{}]},{},[21]);
//</pre>