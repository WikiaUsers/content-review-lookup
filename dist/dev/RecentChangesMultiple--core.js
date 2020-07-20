//<syntaxhighlight lang="javascript">
/*
 * Script: RecentChangesMultiple
 * Author: Fewfre
 *
 * Uses ajax loading to view the Special:RecentChanges of multiple wikis all on one page.
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mw = window.mediaWiki;
//###########################################################
// #### ConstantsApp - static class for script-wide data ####
//###########################################################
var ConstantsApp = /** @class */ (function () {
    function ConstantsApp() {
    }
    // Initialize
    ConstantsApp.init = function (pScriptConfig) {
        ConstantsApp.FAVICON_BASE = pScriptConfig.FAVICON_BASE || ConstantsApp.FAVICON_BASE;
        ConstantsApp.LOADER_IMG = pScriptConfig.LOADER_IMG || ConstantsApp.LOADER_IMG;
        ConstantsApp.NOTIFICATION_ICON = pScriptConfig.NOTIFICATION_ICON || ConstantsApp.NOTIFICATION_ICON;
        ConstantsApp.userOptions = mw.user.options.get([
            "date",
            "gender",
        ]);
        // For Testing CSS
        // mw.util.addCSS(`
        // `);
    };
    /*************************************
    * Get loading asset
    **************************************/
    ConstantsApp.getLoader = function (pSize) {
        if (pSize === void 0) { pSize = 15; }
        // return `<img src='${ConstantsApp.LOADER_IMG}' />`;
        // return ConstantsApp.getSymbol('rcm-loading', pSize, pSize);
        // Chrome doesn't like animations in <use> tags.
        return "<svg width=\"" + pSize + "\" height=\"" + pSize + "\" id=\"rcm-loading\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t<g transform=\"translate(20 50)\">\n\t\t\t\t<rect class=\"bar bar1\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.3\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(50 50)\">\n\t\t\t\t<rect class=\"bar bar2\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.6\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(80 50)\">\n\t\t\t\t<rect class=\"bar bar3\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.9\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t</svg>";
    };
    ConstantsApp.getLoaderLarge = function (pSize) {
        if (pSize === void 0) { pSize = 75; }
        // return `<img src='${ConstantsApp.LOADER_IMG}' />`;
        // return ConstantsApp.getSymbol('rcm-loading-large', pSize, pSize);
        // Chrome doesn't like animations in <use> tags.
        return "<svg width=\"" + pSize + "\" height=\"" + pSize + "\" id=\"rcm-loading-large\" viewBox=\"0 0 100 100\">\n\t\t\t<g transform=\"translate(-20,-20)\">\n\t\t\t\t<path class=\"gear1\" fill=\"#8f7f59\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(20,20) rotate(15 50 50)\">\n\t\t\t\t<path class=\"gear2\" fill=\"#9f9fab\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t</svg>";
    };
    /*************************************
    * SVGs - Inline SVG allows icon to use font color.
    **************************************/
    ConstantsApp.getSymbol = function (pID, pWidth, pHeight) {
        if (pWidth === void 0) { pWidth = 15; }
        if (pHeight === void 0) { pHeight = pWidth; }
        return "<svg width=\"" + pWidth + "\" height=\"" + pHeight + "\" class='rcm-svg-icon'><use xlink:href=\"#" + pID + "\" width=\"" + pWidth + "\" height=\"" + pHeight + "\" /></svg>";
    };
    // Svg <symbol>s are added here and used via <use> tags to avoid injecting long html into the page multiple times.
    // Due to how symbols work, this only needs to be injected once per script.
    ConstantsApp.initSymbols = function () {
        if (!ConstantsApp.SVG_SYMBOLS) {
            return;
        }
        var tSVG = "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" style=\"height: 0px; width: 0px; position: absolute; overflow: hidden;\">'\n\t\t\t" + ConstantsApp.SVG_SYMBOLS.join("") + "\n\t\t</svg>";
        delete ConstantsApp.SVG_SYMBOLS;
        return tSVG;
    };
    ConstantsApp.version = "2.12b";
    ConstantsApp.lastVersionDateString = "Sun Jul 20 2017 00:39:12 GMT-0400 (Eastern Standard Time)";
    ConstantsApp.config = mw.config.get([
        "skin",
        "debug",
        "wgPageName",
        "wgUserName",
        "wgUserLanguage",
        "wgServer",
        "wgScriptPath",
        "wgMonthNames",
    ]);
    ConstantsApp.debug = ConstantsApp.config.debug;
    ConstantsApp.AUTO_REFRESH_LOCAL_STORAGE_ID = "RecentChangesMultiple-autorefresh-" + ConstantsApp.config.wgPageName;
    ConstantsApp.OPTIONS_SETTINGS_LOCAL_STORAGE_ID = "RecentChangesMultiple-saveoptionscookie-" + ConstantsApp.config.wgPageName;
    ConstantsApp.FAVICON_BASE = "//www.google.com/s2/favicons?domain="; // Fallback option (encase all other options are unavailable)
    ConstantsApp.LOADER_IMG = "//images.wikia.nocookie.net/__cb1421922474/common/skins/common/images/ajax.gif";
    ConstantsApp.NOTIFICATION_ICON = "//vignette.wikia.nocookie.net/fewfre/images/4/44/RecentChangesMultiple_Notification_icon.png/revision/latest?cb=20161013043805";
    ConstantsApp.username = ConstantsApp.config.wgUserName;
    // These may be update at given points.
    ConstantsApp.uniqID = 0;
    ConstantsApp.useLocalSystemMessages = true;
    ConstantsApp.timezone = "utc";
    ConstantsApp.timeFormat = "24";
    ConstantsApp.loadDelay = 10; // In miliseconds
    ConstantsApp.SVG_SYMBOLS = [
        // Loading icon - general use
        // http://loading.io
        "<symbol id=\"rcm-loading\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t<g transform=\"translate(20 50)\">\n\t\t\t\t<rect class=\"bar bar1\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.3\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(50 50)\">\n\t\t\t\t<rect class=\"bar bar2\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.6\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(80 50)\">\n\t\t\t\t<rect class=\"bar bar3\" fill=\"#3769c8\" x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" opacity=\"0.9\" style=\"outline:1px solid #3769c8;\"/>\n\t\t\t</g>\n\t\t</symbol>",
        // Large Loading icon - for filling empty space during loading (language / modal loading)
        // http://loading.io
        "<symbol id=\"rcm-loading-large\" viewBox=\"0 0 100 100\">\n\t\t\t<g transform=\"translate(-20,-20)\">\n\t\t\t\t<path class=\"gear1\" fill=\"#8f7f59\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t\t<g transform=\"translate(20,20) rotate(15 50 50)\">\n\t\t\t\t<path class=\"gear2\" fill=\"#9f9fab\" d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"/>\n\t\t\t</g>\n\t\t</symbol>",
        // Columns - for use in AjaxDiff
        // https://commons.wikimedia.org/wiki/File:Columns_font_awesome.svg
        "<symbol id=\"rcm-columns\" viewBox=\"0 -256 1792 1792\" version=\"1.1\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\" inkscape:version=\"0.48.3.1 r9886\" sodipodi:docname=\"columns_font_awesome.svg\">\n\t\t\t<metadata id=\"metadata12\"><rdf:rdf><cc:work rdf:about=\"\"><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"></dc:type></cc:work></rdf:rdf></metadata>\n\t\t\t<defs id=\"defs10\"></defs>\n\t\t\t<sodipodi:namedview pagecolor=\"#ffffff\" bordercolor=\"#666666\" borderopacity=\"1\" objecttolerance=\"10\" gridtolerance=\"10\" guidetolerance=\"10\" inkscape:pageopacity=\"0\" inkscape:pageshadow=\"2\" inkscape:window-width=\"640\" inkscape:window-height=\"480\" id=\"namedview8\" showgrid=\"false\" inkscape:zoom=\"0.13169643\" inkscape:cx=\"896\" inkscape:cy=\"896\" inkscape:window-x=\"0\" inkscape:window-y=\"25\" inkscape:window-maximized=\"0\" inkscape:current-layer=\"svg2\"></sodipodi:namedview>\n\t\t\t<g transform=\"matrix(1,0,0,-1,68.338983,1277.8305)\" id=\"g4\">\n\t\t\t\t<path d=\"M 160,0 H 768 V 1152 H 128 V 32 Q 128,19 137.5,9.5 147,0 160,0 z M 1536,32 V 1152 H 896 V 0 h 608 q 13,0 22.5,9.5 9.5,9.5 9.5,22.5 z m 128,1216 V 32 q 0,-66 -47,-113 -47,-47 -113,-47 H 160 Q 94,-128 47,-81 0,-34 0,32 v 1216 q 0,66 47,113 47,47 113,47 h 1344 q 66,0 113,-47 47,-47 47,-113 z\" id=\"path6\" inkscape:connector-curvature=\"0\" style=\"fill:currentColor\"></path>\n\t\t\t</g>\n\t\t</symbol>",
        // Picture - for use in AjaxGallery
        // Icon made by <a href="http://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        "<symbol id=\"rcm-picture\" viewBox=\"0 0 548.176 548.176\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"enable-background:new 0 0 548.176 548.176;\" xml:space=\"preserve\">\n\t\t\t<g>\n\t\t\t\t<path style=\"fill:currentColor\" d=\"M534.75,68.238c-8.945-8.945-19.694-13.417-32.261-13.417H45.681c-12.562,0-23.313,4.471-32.264,13.417 C4.471,77.185,0,87.936,0,100.499v347.173c0,12.566,4.471,23.318,13.417,32.264c8.951,8.946,19.702,13.419,32.264,13.419h456.815 c12.56,0,23.312-4.473,32.258-13.419c8.945-8.945,13.422-19.697,13.422-32.264V100.499 C548.176,87.936,543.699,77.185,534.75,68.238z M511.623,447.672c0,2.478-0.899,4.613-2.707,6.427 c-1.81,1.8-3.952,2.703-6.427,2.703H45.681c-2.473,0-4.615-0.903-6.423-2.703c-1.807-1.813-2.712-3.949-2.712-6.427V100.495 c0-2.474,0.902-4.611,2.712-6.423c1.809-1.803,3.951-2.708,6.423-2.708h456.815c2.471,0,4.613,0.905,6.42,2.708 c1.801,1.812,2.707,3.949,2.707,6.423V447.672L511.623,447.672z\"/>\n\t\t\t\t<path style=\"fill:currentColor\" d=\"M127.91,237.541c15.229,0,28.171-5.327,38.831-15.987c10.657-10.66,15.987-23.601,15.987-38.826 c0-15.23-5.333-28.171-15.987-38.832c-10.66-10.656-23.603-15.986-38.831-15.986c-15.227,0-28.168,5.33-38.828,15.986 c-10.656,10.66-15.986,23.601-15.986,38.832c0,15.225,5.327,28.169,15.986,38.826C99.742,232.211,112.683,237.541,127.91,237.541z\"/>\n\t\t\t\t<polygon style=\"fill:currentColor\" points=\"210.134,319.765 164.452,274.088 73.092,365.447 73.092,420.267 475.085,420.267 475.085,292.36 356.315,173.587\"/>\n\t\t\t</g>\n\t\t</symbol>",
        // Preview - for use in AjaxPagePreview
        // Icon made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        "<symbol id=\"rcm-preview\" viewBox=\"0 0 480.606 480.606\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"enable-background:new 0 0 480.606 480.606;\" xml:space=\"preserve\">\n\t\t\t<g>\n\t\t\t\t<rect x=\"85.285\" y=\"192.5\" width=\"200\" height=\"30\"/>\n\t\t\t\t<path style=\"fill:currentColor\" d=\"M439.108,480.606l21.213-21.213l-71.349-71.349c12.528-16.886,19.949-37.777,19.949-60.371\n\t\t\t\t\tc0-40.664-24.032-75.814-58.637-92.012V108.787L241.499,0H20.285v445h330v-25.313c6.188-2.897,12.04-6.396,17.475-10.429\n\t\t\t\t\tL439.108,480.606z M250.285,51.213L299.072,100h-48.787V51.213z M50.285,30h170v100h100v96.957\n\t\t\t\t\tc-4.224-0.538-8.529-0.815-12.896-0.815c-31.197,0-59.148,14.147-77.788,36.358H85.285v30h126.856\n\t\t\t\t\tc-4.062,10.965-6.285,22.814-6.285,35.174c0,1.618,0.042,3.226,0.117,4.826H85.285v30H212.01\n\t\t\t\t\tc8.095,22.101,23.669,40.624,43.636,52.5H50.285V30z M307.389,399.208c-39.443,0-71.533-32.09-71.533-71.533\n\t\t\t\t\ts32.089-71.533,71.533-71.533s71.533,32.089,71.533,71.533S346.832,399.208,307.389,399.208z\"/>\n\t\t\t</g>\n\t\t</symbol>",
        // Upvote Circle - for use in discussions
        // Taken from Wikia Discussions page
        "<symbol id=\"rcm-upvote-tiny\" viewBox=\"0 0 14 14\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M9.746 6.83c-.114.113-.263.17-.413.17-.15 0-.298-.057-.412-.17L7.584 5.49V10.5c0 .322-.26.583-.583.583-.322 0-.583-.26-.583-.583V5.492L5.08 6.829c-.23.227-.598.227-.826 0-.228-.23-.228-.598 0-.826L6.588 3.67c.053-.053.117-.095.19-.125.142-.06.303-.06.445 0 .07.03.136.072.19.126l2.333 2.334c.228.228.228.597 0 .825M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7\" fill-rule=\"evenodd\"/>\n\t\t</symbol>",
        // Lock - for use in discussions
        // Taken from Wikia Discussions page
        "<symbol id=\"rcm-lock\" viewBox=\"0 0 18 18\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M11 6H7V5c0-1.1.9-2 2-2s2 .9 2 2v1zm-1 6.7V14H8v-1.3c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .7-.4 1.4-1 1.7zM9 1C6.8 1 5 2.8 5 5v1H3c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-2V5c0-2.2-1.8-4-4-4z\" fill=\"#999\" fill-rule=\"evenodd\"/>\n\t\t</symbol>",
        // Alert/Report exlamation point circle - for use in discussions
        // Taken from Wikia Discussions page
        "<symbol id=\"rcm-report\" viewBox=\"0 0 18 18\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M10 9a1 1 0 0 1-2 0V4.5a1 1 0 0 1 2 0V9zm0 4.5a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0v.5zM9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z\" fill-rule=\"evenodd\"></path>\n\t\t</symbol>",
        // Settings gear icon - for use on RCMOptions panel.
        "<symbol id=\"rcm-settings-gear\" viewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\">\n\t\t\t<path style=\"fill:currentColor\" d=\"M20,14.5v-2.9l-1.8-0.3c-0.1-0.4-0.3-0.8-0.6-1.4l1.1-1.5l-2.1-2.1l-1.5,1.1c-0.5-0.3-1-0.5-1.4-0.6L13.5,5h-2.9l-0.3,1.8 C9.8,6.9,9.4,7.1,8.9,7.4L7.4,6.3L5.3,8.4l1,1.5c-0.3,0.5-0.4,0.9-0.6,1.4L4,11.5v2.9l1.8,0.3c0.1,0.5,0.3,0.9,0.6,1.4l-1,1.5 l2.1,2.1l1.5-1c0.4,0.2,0.9,0.4,1.4,0.6l0.3,1.8h3l0.3-1.8c0.5-0.1,0.9-0.3,1.4-0.6l1.5,1.1l2.1-2.1l-1.1-1.5c0.3-0.5,0.5-1,0.6-1.4 L20,14.5z M12,16c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,16,12,16z\"/>\n\t\t</symbol>",
    ];
    return ConstantsApp;
}());
exports["default"] = ConstantsApp;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RCMManager_1 = require("./RCMManager");
var ConstantsApp_1 = require("./ConstantsApp");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var Notification = window.Notification;
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// Main (instance class) - Start script and store values.
//######################################
var Main = /** @class */ (function () {
    // Singleton constructor
    function Main() {
        /***************************
        * Manage Notifications
        ****************************/
        this._notifications = [];
        this.rcmList = [];
        this.langLoaded = false;
        this.onLangLoadCallbacks = [];
        this.numLangLoadErrors = 0;
    }
    // Should only be called once.
    Main.prototype.init = function (pScriptConfig) {
        var _this = this;
        mw.loader.using(['mediawiki.util', 'mediawiki.language', 'mediawiki.user', 'user.options']).done(function () {
            ConstantsApp_1["default"].init(pScriptConfig);
            $(document).ready($.proxy(_this._ready, _this));
            $(document).unload($.proxy(_this._unload, _this));
            $(window).focus($.proxy(_this._onFocus, _this));
        });
    };
    // Once all neccisary content is loaded, start the script.
    Main.prototype._ready = function () {
        var _this = this;
        /***************************
        * Initial Param Parsing
        ****************************/
        var tFirstWrapper = document.querySelector('.rc-content-multiple, #rc-content-multiple');
        var tDataset = tFirstWrapper.dataset;
        i18n_1["default"].init(tDataset.lang);
        if (tDataset.localsystemmessages === "false") {
            ConstantsApp_1["default"].useLocalSystemMessages = false;
        }
        // Set load delay (needed for scripts that load large numbers of wikis)
        if (tDataset.loaddelay) {
            ConstantsApp_1["default"].loadDelay = tDataset.loaddelay;
        }
        if (tDataset.timezone) {
            ConstantsApp_1["default"].timezone = tDataset.timezone.toLowerCase();
        }
        if (tDataset.timeformat) {
            ConstantsApp_1["default"].timeFormat = tDataset.timeformat.toLowerCase();
        }
        // Unless specified, hide the rail to better replicate Special:RecentChanges
        if (tDataset.hiderail !== "false") {
            document.querySelector("body").className += " rcm-hiderail";
        }
        tDataset = null;
        tFirstWrapper = null;
        /***************************
        * Preload
        ****************************/
        // Load the css for module
        Utils_1["default"].newElement("link", { rel: "stylesheet", type: "text/css", href: "/load.php?mode=articles&articles=u:dev:MediaWiki:RecentChangesMultiple.css&only=styles" }, document.head);
        this._loadLangMessages(); // Load Translations from Wiki database.
        // Misc Loading - https://www.mediawiki.org/wiki/ResourceLoader/Modules#mw.loader.load
        mw.loader.load([
            'mediawiki.special.recentchanges',
            'mediawiki.action.history.diff',
        ]);
        /***************************
        * Setup SVG symbols
        ***************************/
        $("body").append($(ConstantsApp_1["default"].initSymbols()));
        /***************************
        * Get rcParams from url
        ***************************/
        // Options from Special:Preferences > Under the Hood
        var tBaseUserValues = {
            "days": mw.user.options.get("rcdays") || 7,
            "limit": mw.user.options.get("rclimit") || 50,
            "hideenhanced": ((mw.user.options.get("usenewrc") == 1 ? "0" : "1") || 0) == "1",
            "hideminor": (mw.user.options.get("hideminor") || 0) == "1",
        };
        // Now modify base values with those in url
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
        /***************************
        * Start App
        ***************************/
        this._parsePage(document);
        /***************************
        * Listen for new Managers
        ***************************/
        // Add additional Managers that are need from any "Tab view" loads.
        setTimeout(function () {
            // https://github.com/Wikia/app/blob/b03df0a89ed672697e9c130d529bf1eb25f49cda/extensions/wikia/TabView/js/TabView.js
            mw.hook('wikipage.content').add(function (pSection) {
                // mw.log(pSection[0], pSection[0].classList.contains("tabBody"), pSection[0].innerHTML);
                if (pSection[0].classList && pSection[0].classList.contains("tabBody")) {
                    if (pSection[0].querySelector('.rc-content-multiple, #rc-content-multiple')) {
                        _this._parsePage(pSection[0]);
                    }
                }
            });
        }, 0);
    };
    Main.prototype._parsePage = function (pCont) {
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
            // Don't init managers until all translation info is loaded.
            if (_this.langLoaded) {
                tRCMManager.init();
            }
            else {
                tRCMManager.resultCont.innerHTML = "<center>" + ConstantsApp_1["default"].getLoaderLarge() + "</center>";
                _this.onLangLoadCallbacks.push(function () { tRCMManager.init(); tRCMManager = null; });
            }
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
        // for(let i = 0; i < this.rcmList.length; i++) {
        // 	// Something on things seems to lag the page.
        // 	// this.rcmList[i].dispose();
        // 	this.rcmList[i] = null;
        // }
        // this.rcmList = null;
        // i18n = null;
    };
    /***************************
    * Events
    ****************************/
    Main.prototype._onFocus = function () {
        this.clearNotifications();
        this.cancelBlinkWindowTitle();
        // Update "previously loaded" messages
        for (var i = 0; i < this.rcmList.length; i++) {
            this.rcmList[i].lastLoadDateTime = this.rcmList[i].lastLoadDateTimeActual;
        }
    };
    /***************************
    * Additional Loading
    ****************************/
    // Replace all i18n.MESSAGES with that of the language specified.
    // TODO: Should probably have support to check if it ran into loading issues.
    Main.prototype._loadLangMessages = function () {
        var _this = this;
        var tLangLoadAjaxPromises = [];
        // Loads the messages and updates the i18n with the new values (max messages that can be passed is 50)
        function tRCM_loadLangMessage(pMessages) {
            var tScriptPath = ConstantsApp_1["default"].useLocalSystemMessages ? ConstantsApp_1["default"].config.wgServer + ConstantsApp_1["default"].config.wgScriptPath : "//community.fandom.com";
            var url = tScriptPath + "/api.php?action=query&format=json&meta=allmessages&amlang=" + i18n_1["default"].defaultLang + "&ammessages=" + pMessages;
            mw.log(url.replace("&format=json", "&format=jsonfm"));
            return $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: url,
                success: function (pData) {
                    if (typeof pData === 'undefined' || typeof pData.query === 'undefined')
                        return; // Catch for wikis that restrict api access.
                    $.each((pData.query || {}).allmessages, function (index, message) {
                        if (message.missing !== '') {
                            i18n_1["default"].MESSAGES[message.name] = message['*'];
                        }
                    });
                }
            });
        }
        // Loads messages in increments of 50.
        var tMessages = "", tNumLoading = 0;
        Object.keys(i18n_1["default"].MESSAGES).forEach(function (key) {
            tMessages += (tNumLoading > 0 ? "|" : "") + key;
            tNumLoading++;
            if (tNumLoading >= 50) {
                tLangLoadAjaxPromises.push(tRCM_loadLangMessage(tMessages));
                tMessages = "";
                tNumLoading = 0;
            }
        }, this);
        // Load last group of messages (if there are any)
        if (tMessages != "") {
            tLangLoadAjaxPromises.push(tRCM_loadLangMessage(tMessages));
        }
        // When loading of all translated messages is done (or one failed) do this.
        $.when.apply($, tLangLoadAjaxPromises).done(function (pData) {
            _this._onAllLangeMessagesLoaded();
        })
            .fail(function (pData) {
            if (_this.numLangLoadErrors < 15) {
                _this.numLangLoadErrors++;
                _this._loadLangMessages();
            }
            else {
                mw.log("ERROR: " + JSON.stringify(pData));
                alert("ERROR: RecentChanges text not loaded properly (" + _this.numLangLoadErrors + " tries); defaulting to English.");
                _this._onAllLangeMessagesLoaded();
            }
        });
    };
    Main.prototype._onAllLangeMessagesLoaded = function () {
        this.langLoaded = true;
        for (var i = 0; i < this.onLangLoadCallbacks.length; i++) {
            this.onLangLoadCallbacks[i]();
        }
        this.onLangLoadCallbacks = [];
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
        pOptions.icon = pOptions.icon || ConstantsApp_1["default"].NOTIFICATION_ICON;
        var tNotification = new Notification(pTitle, pOptions);
        this._notifications.push(tNotification);
        // Make sure on click it brings you back to page (needed for Chrome) https://stackoverflow.com/a/40964355/1411473
        tNotification.onclick = function () {
            parent.focus();
            window.focus(); //just in case, older browsers
            this.close();
        };
        tNotification = null;
        if (this._notifications.length > 1) {
            this._notifications.shift().close();
        }
    };
    Main.prototype.clearNotifications = function () {
        // Remove all notifications
        for (var i = 0; i < this._notifications.length; i++) {
            this._notifications[i].close();
        }
        this._notifications = [];
    };
    return Main;
}());
// We want Main to be an instance class.
exports["default"] = new Main();

},{"./ConstantsApp":1,"./RCMManager":5,"./Utils":12,"./i18n":14}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var RCMModal_1 = require("./RCMModal");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./RC_TYPE");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Recent Change Data ####
// * A data object to keep track of RecentChanges data in an organized way, as well as also having convenience methods.
// * These should only ever be used in RCList.
//######################################
var RCData = /** @class */ (function () {
    // Constructor
    function RCData(pWikiInfo, pManager) {
        this.manager = pManager;
        this.wikiInfo = pWikiInfo;
    }
    RCData.prototype.dispose = function () {
        // @ts-ignore - It's read only, but we still want it deleted here
        delete this.manager;
        // @ts-ignore - It's read only, but we still want it deleted here
        delete this.wikiInfo;
        this.date = null;
        this.type = null;
    };
    RCData.prototype.init = function (pData, pLogDataArray) {
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
        // if(pData.commenthidden != "") {
        // 	this.summary = pData.parsedcomment; // De-wikified.
        // 	this.summary = this.summary.replace("<a href=\"/", "<a href=\""+this.wikiInfo.server+"/"); // Make links point to correct wiki.
        // } else {
        // 	this.summary = '<span class="history-deleted">'+i18n("rev-deleted-comment")+'</span>';
        // }
        this.summary = RCData.formatParsedComment(pData.parsedcomment, pData.commenthidden == "", this.wikiInfo);
        this.unparsedComment = pData.comment;
        this.pageid = pData.pageid;
        this.revid = pData.revid;
        this.old_revid = pData.old_revid;
        this.isNewPage = pData["new"] == "";
        this.isBotEdit = pData.bot == "";
        this.isMinorEdit = pData.minor == "";
        this.isPatrolled = pData.patrolled == "";
        this.titleNoNS = (this.namespace != 0 && this.title.indexOf(":") > -1) ? this.title.split(/:(.+)/)[1] : this.title; // Regex only matches first ":"
        this.uniqueID = this.title; // By default; make change based on this.type.
        this.hrefTitle = Utils_1["default"].escapeCharactersLink(pData.title);
        this.href = this.wikiInfo.articlepath + this.hrefTitle;
        this.hrefBasic = this.href.split("/@comment")[0];
        this.hrefFS = this.href + this.wikiInfo.firstSeperator;
        // Figure out the type of edit this is.
        if (this.logtype && this.logtype != "0") { // It's a "real" log. "0" signifies a wall/board.
            this.type = RC_TYPE_1["default"].LOG;
            this.log_info_0 = pData["0"];
            this.actionhidden = pData.actionhidden == "";
            this._initLog(pData, pLogDataArray);
        }
        else if (pData.title.indexOf("/@comment") > -1) { // It's a comment / board / wall
            this.isSubComment = pData.title.indexOf("/@comment") != pData.title.lastIndexOf("/@comment"); // Check if it has more than one "/@comment"s
            if ( /*Board Thread*/this.namespace == 2001) {
                this.type = RC_TYPE_1["default"].BOARD;
            }
            else if ( /*Wall Thread*/this.namespace == 1201) {
                this.type = RC_TYPE_1["default"].WALL;
            }
            else {
                this.type = RC_TYPE_1["default"].COMMENT;
            }
            if (this.type == RC_TYPE_1["default"].BOARD || this.type == RC_TYPE_1["default"].WALL) {
                this.uniqueID = Utils_1["default"].escapeCharactersLink(pData.title.split("/@comment")[0] + "/@comment" + pData.title.split("/@comment")[1]); // Walls/boards can have 2 /@comments, the first one is what we care about for lists.
                // var tAcMetaDataCheck = "&lt;ac_metadata title=\"";
                // var tAcMetaDataPos = this.summary.lastIndexOf(tAcMetaDataCheck);
                // if(tAcMetaDataPos > -1) { // Check for last encase some has a "ac_metadata" tag as part of their post for some reason
                // 	this.threadTitle = this.summaryDiffHTML.innerHTML.substring(tAcMetaDataPos+tAcMetaDataCheck.length, this.summary.length);
                // 	this.threadTitle = this.threadTitle.substring(0, this.threadTitle.indexOf("\""));
                // 	this.threadTitle = this.threadTitle.replace(/&amp;/g, "&");
                // 	this.summary = ""; // No summaries are shown in on Special:RecentChanges when "ac_metadata" is present (just works out that way)
                // }
                // https://github.com/Wikia/app/blob/10a9dff2fc80b8226456c21efc921b5361dd6432/extensions/wikia/Wall/WallHelper.class.php#L486
                // /<ac_metadata title="([^"]*)">(.*)<\/ac_metadata>/g
                if (this.isSubComment == false) {
                    // If it's the parent wall / board, check for ac_metadata for title
                    // tTitleData[1] returns title, tTitleData[0] return ac_metadata text string
                    var tTitleData = /&lt;ac_metadata title=&quot;(.*?)&quot;&gt;.*?&lt;\/ac_metadata&gt;/g.exec(this.summary);
                    // var tTitleData = /<ac_metadata title="(.*?)">.*?<\/ac_metadata>/g.exec(this.summary);
                    if (tTitleData != null) {
                        this.threadTitle = tTitleData[1];
                        this.summary = this.summary.replace(tTitleData[0], "");
                    }
                }
                this.isWallBoardAction = this.logtype == "0";
                // If a wall / board was edited, display a message saying so.
                if (this.isWallBoardAction == false && this.isNewPage == false && this.summary == "") {
                    this.summary = this.type == RC_TYPE_1["default"].BOARD ? i18n_1["default"]("forum-recentchanges-edit") : i18n_1["default"]("wall-recentchanges-edit");
                }
            }
        }
        else { // else it's a normal freakin edit =p
            this.type = RC_TYPE_1["default"].NORMAL;
        }
        return this; // Return self for chaining or whatnot.
    };
    // If it's a log, init data if needed for that type.
    RCData.prototype._initLog = function (pRCData, pLogDataArray) {
        if (this.actionhidden) {
            return;
        }
        var tLogParams = null;
        // Get log params
        if (this.wikiInfo.useOutdatedLogSystem) {
            if (pLogDataArray == undefined) {
                return;
            }
            var i = -1;
            // Find log info that belong to this RC.
            for (var x = 0; x < pLogDataArray.length; x++) {
                if (pRCData.logid == pLogDataArray[x].logid) { // && pRCData.timestamp == pLogDataArray[x].timestamp) {
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
        // Remember important info for a log.
        switch (this.logtype) {
            case "move": {
                this.log_move_newTitle = "";
                var is_log_move_noredirect = false;
                if (this.wikiInfo.useOutdatedLogSystem == false) {
                    if (tLogParams) {
                        this.log_move_newTitle = Utils_1["default"].escapeCharacters(tLogParams.target_title);
                        is_log_move_noredirect = tLogParams.suppressredirect == "";
                        // target_ns
                    }
                }
                else {
                    tLogParams = tLogParams.move;
                    if (tLogParams) {
                        this.log_move_newTitle = Utils_1["default"].escapeCharacters(tLogParams.new_title);
                        is_log_move_noredirect = tLogParams.suppressedredirect == "";
                        // new_ns
                    }
                }
                // If true, add a flag for it.
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
                // Assumes "block-log-flags" for: anononly, nocreate, noautoblock, noemail, nousertalk, autoblock, hiddenname
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
                    // If we have a translation for flag, use it. otherwise, leave the flag id alone.
                    if (i18n_1["default"]("block-log-flags-" + log_block_flags_arr[i])) {
                        log_block_flags_arr[i] = i18n_1["default"]("block-log-flags-" + log_block_flags_arr[i]);
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
                    // tLogParams = tLogParams.delete;
                    // if(tLogParams) {
                    // }
                    if (this.log_info_0) {
                        // this.log_delete_revisions_num = ????; // No clue how to get this; but haven't been able to find example of it being used, so meh.
                        log_delete_new_bitmask_id = parseInt((this.log_info_0.split("\n")[3] || "=1").split("=")[1]);
                    }
                }
                switch (log_delete_new_bitmask_id) {
                    case 1: {
                        this.log_delete_new_bitmask = i18n_1["default"]("revdelete-content-hid");
                        break;
                    }
                    case 2: {
                        this.log_delete_new_bitmask = i18n_1["default"]("revdelete-summary-hid"); // I'm assuming; couldn't actually find what "2" was.
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
                        // dest_ns
                    }
                }
                else {
                    // tLogParams = tLogParams.merge;
                    // if(tLogParams) {
                    // }
                    if (this.log_info_0 && pRCData["1"]) {
                        this.log_merge_destination = Utils_1["default"].escapeCharacters(this.log_info_0);
                        this.log_merge_mergepoint = Utils_1["default"].getTimestampForYYYYMMDDhhmmSS(pRCData["1"]);
                    }
                }
                break;
            }
        }
        tLogParams = null;
    };
    RCData.prototype.time = function () {
        return Utils_1["default"].formatWikiTimeStampTimeOnly(this.date, true);
        // return Utils.pad(Utils.getHours(this.date),2)+":"+Utils.pad(Utils.getMinutes(this.date),2);
    };
    RCData.prototype.userDetails = function () {
        // if(this.userhidden) { return '<span class="history-deleted">'+i18n("rev-deleted-user")+'</span>'; }
        //
        // var blockText = this.wikiInfo.user.rights.block ? i18n("pipe-separator")+"<a href='{0}Special:Block/{1}'>"+i18n("blocklink")+"</a>" : "";
        // if(this.userEdited) {
        // 	return Utils.formatString("<span class='mw-usertoollinks'><a href='{0}User:{1}'>{2}</a> (<a href='{0}User_talk:{1}'>"+i18n("talkpagelinktext")+"</a>"+i18n("pipe-separator")+"<a href='{0}Special:Contributions/{1}'>"+i18n("contribslink")+"</a>"+blockText+")</span>", this.wikiInfo.articlepath, Utils.escapeCharactersLink(this.author), this.author);
        // } else {
        // 	return Utils.formatString("<span class='mw-usertoollinks'><a href='{0}Special:Contributions/{1}'>{2}</a> (<a href='{0}User_talk:{1}'>"+i18n("talkpagelinktext")+"</a>"+blockText+")</span>", this.wikiInfo.articlepath, Utils.escapeCharactersLink(this.author), this.author);
        // }
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
    RCData.prototype.logTitleLink = function () {
        return "(<a class='rc-log-link' href='" + this.wikiInfo.articlepath + "Special:Log/" + this.logtype + "'>" + this.logTitle() + "</a>)";
    };
    RCData.prototype.logTitle = function () {
        switch (this.logtype) {
            case "abusefilter": return i18n_1["default"]("abusefilter-log");
            case "block": return i18n_1["default"]("blocklogpage");
            case "chatban": return i18n_1["default"]("chat-chatban-log");
            case "delete": return i18n_1["default"]("dellogpage");
            case "import": return i18n_1["default"]("importlogpage");
            case "maps": return i18n_1["default"]("wikia-interactive-maps-log-name");
            case "merge": return i18n_1["default"]("mergelog");
            case "move": return i18n_1["default"]("movelogpage");
            case "protect": return i18n_1["default"]("protectlogpage");
            case "upload": return i18n_1["default"]("uploadlogpage");
            case "useravatar": return i18n_1["default"]("useravatar-log");
            case "newusers": return i18n_1["default"]("newuserlogpage");
            case "renameuser": return i18n_1["default"]("userrenametool-logpage");
            case "rights": return i18n_1["default"]("rightslog");
            case "wikifeatures": return i18n_1["default"]("wikifeatures-log-name");
            default: return this.logtype; // At least display it as a log.
        }
    };
    // Check each entry for "threadTitle", else return default text.
    RCData.prototype.getThreadTitle = function () {
        return this.threadTitle ? this.threadTitle : "<i>" + i18n_1["default"]('rcm-unknownthreadname') + "</i>";
    };
    RCData.prototype.getSummary = function () {
        // if(this.summary == "" || this.summary == undefined) {
        // 	return "";
        // } else {
        // 	this.summary = this.summary.trim();
        // 	this.summary = this.summary.replace(/(\r\n|\n|\r)/gm, " ");
        // 	return ' <span class="comment" dir="auto">('+this.summary+')</span>';
        // }
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
            // pParsedComment = pParsedComment.replace("<a href=\"/", "<a href=\""+pWikiInfo.server+"/"); // Make links point to correct wiki.
            pParsedComment = pParsedComment.replace(/<a href="\//g, "<a href=\"" + pWikiInfo.server + "/"); // Make links point to correct wiki.
        }
        else {
            pParsedComment = "<span class=\"history-deleted\">" + i18n_1["default"]("rev-deleted-comment") + "</span>";
        }
        if (pParsedComment == "" || pParsedComment == undefined) {
            // pParsedComment = "";
        }
        else {
            pParsedComment = pParsedComment.trim();
            pParsedComment = pParsedComment.replace(/(\r\n|\n|\r)/gm, " ");
        }
        return pParsedComment;
    };
    // Returns text explaining what the log did. Also returns user details (since it's a part of some of their wiki text).
    // Some info is only present in the edit summary for some logtypes, so these parts won't be translated.
    RCData.prototype.logActionText = function () {
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
                // logactions assumed: delete, restore, event, revision, event-legacy, revision-legacy
                tLogMessage += i18n_1["default"]("logentry-delete-" + this.logaction, this.userDetails(), undefined, // Cannot know gender of edit user
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
                // merged [[$1]] into [[$2]] (revisions up to $3)
                tLogMessage += i18n_1["default"]("import-logentry-upload", this.href + "|" + this.title, this.wikiInfo.articlepath + this.log_merge_destination + "|" + this.log_merge_destination, this.getLogTimeStamp(new Date(this.log_merge_mergepoint)));
                break;
            }
            case "move": {
                // logactions assumed: move, move-noredirect, move_redir, move_redir-noredirect
                tLogMessage += i18n_1["default"]("logentry-move-" + this.logaction + (this.log_move_noredirect || "" /*band-aid fix*/), this.userDetails(), undefined, // Don't know if male / female.
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
                // logactions assumed: newusers, create, create2, autocreate (kinda sorta maybe)
                tLogMessage += i18n_1["default"]("logentry-newusers-" + this.logaction, this.userDetails(), undefined, "");
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
                    } // 'Added or changed avatar'
                    case "avatar_rem": {
                        tLogMessage += i18n_1["default"]("blog-avatar-removed-log", "<a href='" + this.href + "'>" + this.title + "</a>");
                        break;
                    } // "Removed $1's avatars"
                }
                break;
            }
            case "renameuser": {
                tLogMessage += this.userDetails() + " renameuser"; // Rest of the info is in the edit summary (so won't be translated by script).
                break;
            }
            case "wikifeatures": {
                tLogMessage += this.userDetails() + " wikifeatures"; // Rest of the info is in the edit summary (so won't be translated by script).
                break;
            }
            case "chatban": {
                var tChatData = this.log_info_0.split("\n");
                var t$3 = undefined;
                if (tChatData[3]) {
                    t$3 = this.getLogTimeStamp(new Date(parseInt(tChatData[3]) * 1000));
                }
                tLogMessage += this.userDetails() + " ";
                // logaction assumed: chatbanadd, chatbanremove, chatbanchange
                tLogMessage += i18n_1["default"]("chat-" + this.logaction + "-log-entry", "<a href='" + this.href + "'>" + this.titleNoNS + "</a>", tChatData[2], t$3);
                tChatData = null;
                break;
            }
            case "maps": {
                // logactions assumed: create_map, update_map, delete_map, undelete_map
                //						create_pin_type, update_pin_type, delete_pin_type
                //						create_pin, update_pin, delete_pin
                tLogMessage += i18n_1["default"]("logentry-maps-" + this.logaction, this.userDetails(), undefined, this.title);
                break;
            }
            case "abusefilter": {
                var tAbusePage = this.log_info_0.split("\n");
                var tAbuseItem = tAbusePage.shift();
                tLogMessage += this.userDetails() + " ";
                switch (this.logaction) {
                    case "modify": {
                        tLogMessage += i18n_1["default"]("abusefilter-log-entry-modify", "<a href='" + this.href + "'>" + this.title + "</a>", "<a href='" + this.wikiInfo.articlepath + "Special:AbuseFilter/history/" + tAbusePage + "/diff/prev/" + tAbuseItem + "'>" + i18n_1["default"]("abusefilter-log-detailslink") + "</a>");
                        break;
                    }
                }
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
    // Assumes it's a wall/board that has an action (will just return summary otherwise).
    RCData.prototype.wallBoardActionMessageWithSummary = function (pThreadTitle) {
        var tThreadTitle = pThreadTitle || this.getThreadTitle(); // Title is passed in due to it being found via ajax.
        var tLocalizedActionMessage = "";
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
        if (tLocalizedActionMessage != "") {
            return " " + i18n_1["default"](tLocalizedActionMessage, this.href, tThreadTitle, this.getBoardWallParentLink(), this.titleNoNS) + this.getSummary();
        }
        else {
            return this.getSummary(); // Else not a wall/board action
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
    RCData.prototype.pageTitleTextLink = function () {
        if (this.type == RC_TYPE_1["default"].COMMENT) {
            var tNameSpaceText = this.namespace == 1 ? "" : this.wikiInfo.namespaces[String(this.namespace - 1)]["*"] + ":";
            return i18n_1["default"]("article-comments-rc-comment", this.href, tNameSpaceText + this.titleNoNS);
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
        var tLink = "", tText = "";
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
    RCData.prototype.getLogTimeStamp = function (pDate) {
        return RCData.getFullTimeStamp(pDate);
    };
    RCData.getFullTimeStamp = function (pDate) {
        return Utils_1["default"].formatWikiTimeStamp(pDate);
    };
    RCData.prototype.shouldBeRemoved = function (pDate) {
        // First remove items past "days" (needs to be done first since it can change number allowed by "limit").
        // Then start checking if enough items are listed for the wiki to go past it's "limit".
        return this.date.getSeconds() < pDate.getSeconds() - (this.wikiInfo.rcParams.days * 86400) // days*24*60*60 = days->seconds
            || this.type != RC_TYPE_1["default"].DISCUSSION && this.wikiInfo.resultsCount > this.wikiInfo.rcParams.limit
            || this.type == RC_TYPE_1["default"].DISCUSSION && this.wikiInfo.discussionsCount > Math.min(this.wikiInfo.rcParams.limit, 50);
        // return this.date.getSeconds() < pDate.getSeconds()-(this.wikiInfo.rcParams.days * 86400); // days*24*60*60 = days->seconds
    };
    // STATIC - https://www.mediawiki.org/wiki/API:Revisions
    // Inspired by http://dev.fandom.com/wiki/AjaxDiff / http://dev.fandom.com/wiki/LastEdited
    RCData.previewDiff = function (pPageName, pageID, pAjaxUrl, pDiffLink, pUndoLink, pDiffTableInfo) {
        mw.log("http:" + pAjaxUrl);
        mw.log(pDiffLink);
        mw.log(pUndoLink);
        var tTitle = pPageName + " - " + i18n_1["default"]('rcm-module-diff-title');
        // Need to push separately since undo link -may- not exist (Wikia style forums sometimes).
        var tButtons = [];
        tButtons.push({
            value: i18n_1["default"]('rcm-module-diff-open'),
            event: "diff",
            callback: function () { window.open(pDiffLink, '_blank'); },
        });
        if (pUndoLink != null) {
            tButtons.push({
                value: i18n_1["default"]('rcm-module-diff-undo'),
                event: "undo",
                callback: function () { window.open(pUndoLink, '_blank'); },
            });
        }
        RCMModal_1["default"].showLoadingModal({ title: tTitle, rcm_buttons: tButtons }, function () {
            // Retrieve the diff table.
            // TODO - error support?
            $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: pAjaxUrl,
                success: function (pData) {
                    if (!RCMModal_1["default"].isModalOpen()) {
                        return;
                    }
                    var tPage = pData.query.pages[pageID];
                    var tRevision = tPage.revisions[0];
                    // mw.log("Rollback: ", pRollbackLink, tRevision.rollbacktoken, tPage.lastrevid, tRevision.diff.to);
                    // if(pRollbackLink != null && tRevision.rollbacktoken && tPage.lastrevid == tRevision.diff.to) {
                    // 	tButtons.splice(tButtons.length-2, 0, {
                    // 		value: i18n('rollbacklink'),
                    // 		event: "rollback",
                    // 		callback: () => { window.open(pRollbackLink+tRevision.rollbacktoken, '_blank'); },
                    // 	});
                    // }
                    var tOMinor = tRevision.minor == "" ? "<abbr class=\"minoredit\">" + i18n_1["default"]('minoreditletter') + "</abbr> " : "";
                    var tNMinor = pDiffTableInfo.newRev.minor ? "<abbr class=\"minoredit\">" + i18n_1["default"]('minoreditletter') + "</abbr> " : "";
                    var tRevDate = new Date(tRevision.timestamp);
                    var tNewRevDate = pDiffTableInfo.newRev.date;
                    // TODO: Find out if new revision is most recent, and have timestamp message show the "most recent revision" message. Also make edit button not have "oldid" in the url.
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
                        + i18n_1["default"]('revisionasof', RCData.getFullTimeStamp(tRevDate), Utils_1["default"].formatWikiTimeStampDateOnly(tRevDate), Utils_1["default"].formatWikiTimeStampTimeOnly(tRevDate))
                        + "</a>"
                        + " <span class='mw-rev-head-action'>"
                        + ("(<a href=\"" + pDiffTableInfo.hrefFS + "oldid=" + tRevision.diff.from + "&action=edit\" data-action=\"edit-revision-before\">" + i18n_1["default"]('editold') + "</a>)")
                        + "</span>"
                        + "</strong>"
                        + "</div>"
                        + "<div class='mw-diff-otitle2'>" + RCData.formatUserDetails(pDiffTableInfo.wikiInfo, tRevision.user, tRevision.userhidden == "", tRevision.anon != "") + "</div>"
                        + "<div class='mw-diff-otitle3'>" + tOMinor + RCData.formatSummary(RCData.formatParsedComment(tRevision.parsedcomment, tRevision.commenthidden == "", pDiffTableInfo.wikiInfo)) + "</div>"
                        // +"<div class='mw-diff-otitle4'></div>"
                        + "</td>"
                        + "<td class='diff-ntitle' colspan='2'>"
                        + "<div class='mw-diff-ntitle1'>"
                        + "<strong>"
                        + "<a href='" + pDiffTableInfo.hrefFS + "oldid=" + tRevision.diff.to + "' data-action='revision-link-after'>"
                        + i18n_1["default"]('revisionasof', RCData.getFullTimeStamp(tNewRevDate), Utils_1["default"].formatWikiTimeStampDateOnly(tNewRevDate), Utils_1["default"].formatWikiTimeStampTimeOnly(tNewRevDate))
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
                        // +"<div class='mw-diff-ntitle4'></div>"
                        + "</td>"
                        + "</tr>"
                        + tRevision.diff["*"]
                        + "</tbody>"
                        + "</table>";
                    +"</div>";
                    // RCMModal.showModal({ title:tTitle, content:tModalContent, rcm_buttons:tButtons });
                    RCMModal_1["default"].setModalContent(tModalContent);
                },
            });
        });
    };
    // STATIC - https://www.mediawiki.org/wiki/API:Imageinfo
    // TODO - error support?
    RCData.previewImages = function (pAjaxUrl, pImageNames, pArticlePath) {
        var tImagesInLog = pImageNames.slice();
        var size = 210; // Must match in CSS - Logic: (1000-~40[for internal wrapper width]) / 4 - (15 * 2 [padding])
        pAjaxUrl += "&iiurlwidth=" + size + "&iiurlheight=" + size;
        var tCurAjaxUrl = pAjaxUrl + "&titles=" + tImagesInLog.splice(0, 50).join("|");
        mw.log(tCurAjaxUrl.replace("&format=json", "&format=jsonfm"), pImageNames);
        var tTitle = i18n_1["default"]("awc-metrics-images");
        var tButtons = [];
        var tAddLoadMoreButton = function () {
            if (tImagesInLog.length > 0) {
                mw.log("Over 50 images to display; Extra images must be loaded later.");
                var tModal = document.querySelector("#" + RCMModal_1["default"].MODAL_CONTENT_ID);
                var tGallery_1 = tModal.querySelector(".rcm-gallery");
                var tCont_1 = Utils_1["default"].newElement("center", { style: 'margin-bottom: 8px;' }, tModal);
                var tButton = Utils_1["default"].newElement("button", { innerHTML: i18n_1["default"]('specialvideos-btn-load-more') }, tCont_1);
                tButton.addEventListener("click", function () {
                    tCurAjaxUrl = pAjaxUrl + "&titles=" + tImagesInLog.splice(0, 50).join("|");
                    mw.log(tCurAjaxUrl.replace("&format=json", "&format=jsonfm"));
                    tCont_1.innerHTML = ConstantsApp_1["default"].getLoader(25);
                    $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: tCurAjaxUrl,
                        success: function (pData) {
                            Utils_1["default"].removeElement(tCont_1);
                            tGallery_1.innerHTML += RCData.previewImages_getGalleryItemsFromData(pData.query.pages, pArticlePath, size);
                            tAddLoadMoreButton();
                        },
                    });
                });
            }
        };
        RCMModal_1["default"].showLoadingModal({ title: tTitle, rcm_buttons: tButtons }, function () {
            $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: tCurAjaxUrl,
                success: function (pData) {
                    if (!RCMModal_1["default"].isModalOpen()) {
                        return;
                    }
                    var tModalContent = ''
                        + '<div class="rcm-gallery wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-medium wikia-gallery-border-small wikia-gallery-captions-center wikia-gallery-caption-size-medium">'
                        + RCData.previewImages_getGalleryItemsFromData(pData.query.pages, pArticlePath, size)
                        + '</div>';
                    RCMModal_1["default"].setModalContent(tModalContent);
                    tAddLoadMoreButton();
                },
            });
        });
    };
    RCData.previewImages_getGalleryItemsFromData = function (pData, pArticlePath, pSize) {
        var tReturnText = "";
        for (var key in pData) {
            tReturnText += RCData.previewImages_getGalleryItem(pData[key], pArticlePath, pSize);
        }
        return tReturnText;
    };
    RCData.previewImages_getGalleryItem = function (pPage, pArticlePath, pSize) {
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
                thumbText: i18n_1["default"]('shared_help_was_redirect', tTitle)
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
                + ("<a class=\"" + lightBoxClass + "\" href=\"" + imageHref + "\" target=\"_blank\" style=\"" + imageStyle + "\">")
                + image
                + '</a>'
                + '</div>'
                + '</div>'
                + '<div class="lightbox-caption" style="width:100%;">'
                + caption
                + '</div>'
                + '</div>';
        };
        if (tInvalidImage) {
            // Display text instead of image
            return tRCM_galleryItemTemplate({ isLightbox: false, wrapperStyle: null,
                image: tInvalidImage.thumbText,
                imageHref: tInvalidImage.thumbHref,
                imageStyle: "height:" + pSize + "px; width:" + pSize + "px; line-height:inherit;",
                caption: tPageTitleNoNS,
            });
        }
        else {
            // Returned thumb width/height calculates to fit within size requested at fetch, even if the wiki doesn't return scaled down image.
            var tOffsetY = pSize / 2 - tImage.thumbheight / 2;
            var tScaledWidth = tImage.thumbwidth;
            return tRCM_galleryItemTemplate({ isLightbox: true,
                wrapperStyle: "position: relative; width:" + tScaledWidth + "px; top:" + tOffsetY + "px;",
                image: "<img class=\"thumbimage\" src=\"" + tImage.thumburl + "\" alt=\"" + tTitle + "\">",
                imageHref: tImage.url,
                imageStyle: "width:" + tScaledWidth + "px;",
                caption: "<a href=\"" + tImage.descriptionurl + "\">" + tPageTitleNoNS + "</a>",
            });
        }
    };
    RCData.previewPage = function (pAjaxUrl, pPageName, pPageHref, pServerLink) {
        mw.log("http:" + pAjaxUrl);
        var tTitle = "" + pPageName;
        var tButtons = [
            {
                value: i18n_1["default"]('wikiaPhotoGallery-conflict-view'),
                event: "diff",
                callback: function () { window.open(pPageHref, '_blank'); },
            }
        ];
        RCMModal_1["default"].showLoadingModal({ title: tTitle, rcm_buttons: tButtons }, function () {
            // Retrieve the diff table.
            // TODO - error support?
            $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url: pAjaxUrl,
                success: function (pData) {
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
                        // Setup Shadow dom
                        RCMModal_1["default"].setModalContent("");
                        tModalCont = tModalCont.attachShadow({ mode: "open" });
                        tModalCont.innerHTML = tModalContent;
                        tCont = tModalCont.querySelector("#mw-content-text");
                        tCont.innerHTML = "";
                        // Convert <link> tags (not supported in shadow dom) to <style> tags via @import (bad, but neccisary)
                        // Do it for current wiki head first (since shadow dom strips all css)
                        var tCurPageHead = document.querySelector("head").cloneNode(true);
                        Utils_1["default"].forEach(tCurPageHead.querySelectorAll("link[rel=stylesheet]"), function (o, i, a) {
                            tCont.innerHTML += "<style> @import url(" + o.href + "); </style>"; //o.outerHTML;
                        });
                        // Prevent warnings from poping up about shadow dom not supporting <link>.
                        Utils_1["default"].forEach(tCurPageHead.querySelectorAll("link"), function (o, i, a) { Utils_1["default"].removeElement(o); });
                        // Add page info
                        var tPreviewHead = Utils_1["default"].newElement("div", { innerHTML: pData.parse.headhtml["*"] });
                        Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link[rel=stylesheet]"), function (o, i, a) {
                            tCont.innerHTML += "<style> @import url(" + o.href + "); </style>"; //o.outerHTML;
                        });
                        // Prevent warnings from poping up about shadow dom not supporting <link>.
                        Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link"), function (o, i, a) { Utils_1["default"].removeElement(o); });
                        tCont.innerHTML += tCurPageHead.innerHTML;
                        tCont.innerHTML += "\n<!-- Loaded Wiki Styles -->\n";
                        tCont.innerHTML += tPreviewHead.innerHTML;
                        tCont.innerHTML += tContentText;
                    }
                    // Using scoped styles is only intended as a fallback since not many prowsers yet allow modifying the shadow dom.
                    else if ("scoped" in document.createElement("style")) {
                        var tPreviewHead = Utils_1["default"].newElement("div", { innerHTML: pData.parse.headhtml["*"] });
                        Utils_1["default"].forEach(tPreviewHead.querySelectorAll("link[rel=stylesheet]"), function (o, i, a) {
                            tCont.innerHTML += "<style scoped> @import url(" + o.href + "); </style>"; //o.outerHTML;
                        });
                    }
                    // Fix all local links to point to wiki.
                    Utils_1["default"].forEach(tCont.querySelectorAll("a[href^='/']"), function (o, i, a) {
                        o.href = pServerLink + o.getAttribute("href");
                    });
                    mw.hook('wikipage.content').fire($(tCont)); // Makes sure infoboxes tabs/section collapsing works.
                },
            });
        });
    };
    return RCData;
}());
exports["default"] = RCData;

},{"./ConstantsApp":1,"./RCMModal":6,"./RC_TYPE":10,"./Utils":12,"./i18n":14}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RCData_1 = require("./RCData");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./RC_TYPE");
var ConstantsApp_1 = require("./ConstantsApp");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Recent Change List ####
// * Contains one or more RCData objects. Formats list as needed.
//######################################
var RCList = /** @class */ (function () {
    // Constructor
    function RCList(pManager) {
        this.manager = pManager;
        this.list = [];
        // this.removeListeners= [];
    }
    Object.defineProperty(RCList.prototype, "newest", {
        // Properties
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
        // @ts-ignore - It's read only, but we still want it deleted here
        delete this.manager;
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].dispose();
            this.list[i] = null;
        }
        this.list = null;
        // // Remove event listeners.
        // for(let i=0; i < this.removeListeners.length; i++) {
        // 	this.removeListeners[i]();
        // 	this.removeListeners[i] = null;
        // }
        // this.removeListeners = null;
        this.htmlNode = null;
    };
    RCList.prototype.addRC = function (pNewRC) {
        this.list.push(pNewRC);
        this.list.sort(function (a, b) { return b.date.valueOf() - a.date.valueOf(); }); // More efficent and dependable than doing it manually.
        return this; // Return self for chaining or whatnot.
    };
    // Removes and disposes
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
    // Returns a url that compares the edits of two RCs (can be the same one twice, since a RC has info on the current and previous edit).
    // If "pToRC" is null, it will link to newest edit.
    RCList.prototype.getLink = function (pRC, pDiff, pOldId) {
        return pRC.hrefFS + "curid=" + pRC.pageid + (pDiff || pDiff == 0 ? "&diff=" + pDiff : "") + (pOldId ? "&oldid=" + pOldId : "");
    };
    // Returns a url that compares the edits of two RCs (can be the same one twice, since a RC has info on the current and previous edit).
    // If "pToRC" is null, it will link to newest edit.
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
    // Calculates the size difference between the recent change(s), and returns formatted text to appear in HTML.
    RCList.prototype._diffSizeText = function (pToRC, pFromRC) {
        var tDiffSize = pToRC.newlen - (pFromRC ? pFromRC : pToRC).oldlen;
        var tDiffSizeText = mw.language.convertNumber(tDiffSize);
        var html = "<strong class='{0}'>{1}</strong>";
        if (tDiffSize > 0) {
            return Utils_1["default"].formatString(html, "mw-plusminus-pos", i18n_1["default"]('parentheses', "+" + tDiffSizeText));
        }
        else if (tDiffSize < 0) {
            // The negative is part of the number, so no reason to add it.
            return Utils_1["default"].formatString(html, "mw-plusminus-neg", i18n_1["default"]('parentheses', tDiffSizeText));
        }
        else {
            return Utils_1["default"].formatString(html, "mw-plusminus-null", i18n_1["default"]('parentheses', tDiffSizeText));
        }
    };
    // TODO: Convert to a Map once ES6 is used.
    RCList.prototype._contributorsCountText = function () {
        var _this = this;
        var contribs = {}, indx;
        this.list.forEach(function (rc) {
            if (contribs.hasOwnProperty(rc.author)) {
                contribs[rc.author].count++;
            }
            else {
                contribs[rc.author] = { count: 1, userEdited: rc.userEdited };
                contribs[rc.author].avatar = (rc.type == RC_TYPE_1["default"].DISCUSSION ? rc.getAvatarImg() : "");
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
    // For use with comments / normal pages
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
    // Check each entry for "threadTitle", else return default text.
    RCList.prototype.getThreadTitle = function () {
        var _this = this;
        var tTitle = this.getExistingThreadTitle();
        var tReturnText = tTitle;
        if (this.manager.extraLoadingEnabled) {
            var tElemID_1 = Utils_1["default"].uniqID();
            tReturnText = "<span id='" + tElemID_1 + "'><i>" + (tTitle ? tTitle : i18n_1["default"]('rcm-unknownthreadname')) + "</i></span>";
            // These ajax requests are done here to condense number of requests; title is only needed per list, not per RCData.
            if (this.type != RC_TYPE_1["default"].DISCUSSION) {
                this.manager.secondaryWikiData.push({
                    url: this.wikiInfo.scriptpath + "/api.php?action=query&format=json&prop=revisions&titles=" + this.newest.uniqueID + "&rvprop=content",
                    callback: function (data) {
                        var tSpan = document.querySelector("#" + tElemID_1);
                        // Encase it doesn't exist anymore
                        if (!tSpan) {
                            return;
                        }
                        // for(var tPageIndex in data.query.pages)
                        // var tPage = data.query.pages[tPageIndex];
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
                    var tRC = this.newest;
                    this.manager.secondaryWikiData.push({
                        // https://github.com/Wikia/app/blob/b03df0a89ed672697e9c130d529bf1eb25f49cda/lib/Swagger/src/Discussion/Api/ThreadsApi.php
                        url: "https://services.fandom.com/discussion/" + this.wikiInfo.wikiaCityID + "/threads/" + tRC.threadId,
                        dataType: "json",
                        callback: function (data) {
                            _this.newest.threadTitle = data.title || (data.rawContent.slice(0, 35).trim() + "..."); // If no title, use part of original message.
                            var tSpan = document.querySelector("#" + tElemID_1);
                            if (tSpan) {
                                tSpan.innerHTML = _this.newest.threadTitle;
                                var tIcons = "";
                                if (data.isLocked) {
                                    tIcons += ConstantsApp_1["default"].getSymbol("rcm-lock");
                                }
                                if (data.isReported) {
                                    tIcons += ConstantsApp_1["default"].getSymbol("rcm-report");
                                }
                                if (tIcons) {
                                    tSpan.parentNode.insertBefore(Utils_1["default"].newElement("span", { innerHTML: tIcons }), tSpan);
                                }
                            }
                        }
                    });
                }
                else {
                    tReturnText = tTitle;
                }
            }
        }
        else {
            if (tReturnText == null) {
                tReturnText = "<i>" + i18n_1["default"]('rcm-unknownthreadname') + "</i>";
            }
        }
        return tReturnText;
    };
    RCList.prototype.getAjaxDiffButton = function () {
        return " <span class=\"rcm-ajaxIcon rcm-ajaxDiff\">" + ConstantsApp_1["default"].getSymbol("rcm-columns") + "</span>";
    };
    RCList.prototype.getAjaxImageButton = function () {
        return " <span class=\"rcm-ajaxIcon rcm-ajaxImage\">" + ConstantsApp_1["default"].getSymbol("rcm-picture") + "</span>";
    };
    RCList.prototype.getAjaxPagePreviewButton = function () {
        return " <span class=\"rcm-ajaxIcon rcm-ajaxPage\">" + ConstantsApp_1["default"].getSymbol("rcm-preview") + "</span>";
    };
    // https://www.mediawiki.org/wiki/API:Revisions
    RCList.prototype.addPreviewDiffListener = function (pElem, pFromRC, pToRC) {
        if (pElem) {
            if (pToRC == undefined) {
                pToRC = pFromRC;
            }
            // Initializing here since "rc" may be nulled by the time the event is triggered.
            var pageName = pFromRC.title;
            var pageID = pFromRC.pageid;
            var ajaxLink = this.wikiInfo.scriptpath + ("/api.php?action=query&format=json&prop=revisions|info&rvprop=size|user|parsedcomment|timestamp|flags&rvdiffto=" + pToRC.revid + "&revids=" + pFromRC.old_revid);
            var diffLink = pFromRC.hrefFS + "curid=" + pFromRC.pageid + "&diff=" + pToRC.revid + "&oldid=" + pFromRC.old_revid;
            var undoLink = pFromRC.hrefFS + "curid=" + pFromRC.pageid + "&undo=" + pToRC.revid + "&undoafter=" + pFromRC.old_revid + "&action=edit";
            // var rollbackLink = null;
            // if(this.wikiInfo.user.rights.rollback) {
            // 	ajaxLink += "&rvtoken=rollback";
            // 	// Token provided upon results returned from ajaxLink.
            // 	rollbackLink = Utils.formatString( "{0}action=rollback&from={1}&token=", pFromRC.hrefFS , pFromRC.author );
            // }
            var diffTableInfo = {
                wikiInfo: pFromRC.wikiInfo,
                hrefFS: pFromRC.hrefFS,
                newRev: { user: pToRC.userDetails(), summary: pToRC.getSummary(), date: pToRC.date, minor: pToRC.isMinorEdit },
            };
            this._addAjaxClickListener(pElem, function () { RCData_1["default"].previewDiff(pageName, pageID, ajaxLink, diffLink, undoLink, diffTableInfo); });
            pFromRC = null;
            pToRC = null;
        }
    };
    // https://www.mediawiki.org/wiki/API:Imageinfo
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
            this._addAjaxClickListener(pElem, function () { RCData_1["default"].previewImages(ajaxLink, tImageNames, articlepath); });
            // tImageNames = null;
            pImageRCs = null;
        }
    };
    // https://www.mediawiki.org/wiki/API:Parsing_wikitext#parse
    RCList.prototype.addPreviewPageListener = function (pElem, pRC) {
        if (pElem) {
            // Initializing here since "rc" may be nulled by the time the event is triggered.
            var ajaxLink_1 = this.wikiInfo.scriptpath + ("/api.php?action=parse&format=json&pageid=" + pRC.pageid + "&prop=text|headhtml&disabletoc=true");
            var pageName = pRC.title;
            var pageHref_1 = pRC.href;
            if (pRC.type == RC_TYPE_1["default"].WALL || pRC.type == RC_TYPE_1["default"].BOARD || pRC.type == RC_TYPE_1["default"].COMMENT) {
                // TODO: This isn't -exactly- true, but it gives better results than just linking to the href (as of writing this).
                pageHref_1 = this.wikiInfo.articlepath + "Thread:" + pRC.pageid;
            }
            var serverLink_1 = this.wikiInfo.server;
            this._addAjaxClickListener(pElem, function () { RCData_1["default"].previewPage(ajaxLink_1, pageName, pageHref_1, serverLink_1); });
        }
    };
    RCList.prototype._addAjaxClickListener = function (pElem, pCallback) {
        var tRCM_AjaxIconClickHandler = function (e) {
            e.preventDefault();
            pCallback();
        };
        pElem.addEventListener("click", tRCM_AjaxIconClickHandler);
        // this.removeListeners.push(() => { pElem.removeEventListener("click", tRCM_AjaxIconClickHandler); });
    };
    // private _addRollbackLink(pRC) {
    // 	if(this.extraLoadingEnabled == false) { return ""; }
    // 	var tRollback = Utils.newElement("span", { className:"mw-rollback-link" });
    // 	tRollback.appendChild(document.createTextNode(" "));
    // 	var tRollbackLink = Utils.newElement("a", { innerHTML:i18n("rollbacklink") }, tRollback);
    // 	tRollback.appendChild(document.createTextNode("]"));
    // 	// Initializing here since "rc" may be nulled by the time the event is triggered.
    // 	var tScriptDir = this.wikiInfo.scriptpath;
    // 	var tVersion = this.wikiInfo.mwversion;
    // 	var tPageName = this.title;
    // 	var tPageID = this.pageid;
    // 	var tRollbackLink = this.hrefFS+"action=rollback&from="+pRC.author+"&token=";
    // 	var tRCM_rollback = () => {
    // 		RCList.ajaxRollback(tScriptDir, tVersion, tPageName, tPageID, tRollbackLink);
    // 		tRollbackLink.removeEventListener("click", tRCM_rollback);
    // 	}
    // 	tRollbackLink.addEventListener("click", tRCM_rollback);
    // 	this.removeListeners.push(() => { tRollbackLink.removeEventListener("click", tRCM_rollback); });
    // 	pRC = null;
    // 	return ;
    // }
    // Provide the <abbr> element appropriate to a given abbreviated flag with the appropriate class.
    // Returns a non-breaking space if flag not set.
    RCList.prototype._flag = function (pFlag, pRC, pEmpty) {
        var tI18nLetter = "", tI18nTooltip = "";
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
            // case "unpatrolled":	{ if(pRC.zzzzzz)	{ tI18nLetter="unpatrolledletter"; tI18nTooltip="recentchanges-label-unpatrolled"; } }
        }
        if (tI18nLetter == "") {
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
            + pEmpty //this._flag("unpatrolled", this.oldest)
        ;
    };
    RCList.prototype._showFavicon = function () {
        return this.manager.chosenWikis.length > 1;
    };
    RCList.prototype._getBackgroundClass = function () {
        return this._showFavicon() ? "rcm-tiled-favicon" : "";
    };
    // An RC that is NOT part of a "block" of related changes (logs, edits to same page, etc)
    RCList.prototype._toHTMLSingle = function (pRC) {
        if (this.list.length > 1) {
            return this._toHTMLBlock();
        }
        var html = "";
        switch (pRC.type) {
            case RC_TYPE_1["default"].LOG: {
                html += pRC.logTitleLink();
                if (pRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += RCList.SEP;
                html += pRC.logActionText();
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
                html += tRC.discusssionTitleText(this.getThreadTitle());
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
                // if(this.type == RC_TYPE.NORMAL && this.isNewPage == false && this.wikiInfo.user.rights.rollback) {
                //  html += " [<a href='"+this.href+"action=rollback&from="+this.entry.author.name+"'>rollback</a>]";
                // }
                break;
            }
        }
        var tTable = Utils_1["default"].newElement("table", { className: "mw-enhanced-rc " + pRC.wikiInfo.rcClass + " " + pRC.getNSClass() });
        Utils_1["default"].newElement("caption", { className: this._getBackgroundClass() }, tTable); // Needed for CSS background.
        var tRow = Utils_1["default"].newElement("tr", {}, tTable);
        if (this._showFavicon()) {
            Utils_1["default"].newElement("td", { innerHTML: pRC.wikiInfo.getFaviconHTML(true) }, tRow);
        }
        Utils_1["default"].newElement("td", { className: "mw-enhanced-rc", innerHTML: ""
                + '<img src="//images.wikia.nocookie.net/__cb1422546004/common/skins/common/images/Arr_.png" width="12" height="12" alt="&nbsp;" title="">'
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
    // An RCList that IS a "block" of related changes (logs, edits to same page, etc)
    RCList.prototype._toHTMLBlock = function () {
        if (this.list.length == 1) {
            return this._toHTMLSingle(this.newest);
        }
        var tBlockHead = this._toHTMLBlockHead();
        for (var i = 0; i < this.list.length; i++) {
            tBlockHead.querySelector("tbody").appendChild(this._toHTMLBlockLine(this.list[i]));
        }
        // Make "blocks" collapsible - for this to work, make sure neither this NOR IT'S PARENT is modified via innerHTML after this has been added (to avoid event being "eaten").
        if ($(tBlockHead).makeCollapsible) {
            $(tBlockHead).makeCollapsible();
        }
        return tBlockHead;
    };
    // The first line of a RC "group"
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
                html += this.newest.discusssionTitleText(this.getThreadTitle(), true);
                html += " (" + this._changesText() + ")";
                break;
            }
            case RC_TYPE_1["default"].COMMENT: {
                // Link to comments sections on main page. If in main namespace, add the namespace to the page (if requested, custom namespaces can have comments)
                var tNameSpaceText = this.newest.namespace == 1 ? "" : this.wikiInfo.namespaces[String(this.newest.namespace - 1)]["*"] + ":";
                html += i18n_1["default"].wiki2html(i18n_1["default"].MESSAGES["article-comments-rc-comments"].replace("$1", "$3|$1"), tNameSpaceText + this.newest.titleNoNS, undefined, this.wikiInfo.articlepath + tNameSpaceText + this.newest.titleNoNS + "#WikiaArticleComments");
                html += " (" + this._changesText() + ")";
                // html += SEP
                // html += this._diffSizeText(this.newest, this.oldest);
                break;
            }
        }
        html += RCList.SEP;
        html += this._contributorsCountText();
        var tTable = Utils_1["default"].newElement("table", { className: "mw-collapsible mw-enhanced-rc mw-collapsed " + this.newest.wikiInfo.rcClass + " " + this.newest.getNSClass() }); // mw-made-collapsible
        Utils_1["default"].newElement("caption", { className: this._getBackgroundClass() }, tTable); // Needed for CSS background.
        var tTbody = Utils_1["default"].newElement("tbody", {}, tTable); // tbody is needed for $.makeCollapsible() to work.
        var tRow = Utils_1["default"].newElement("tr", {}, tTbody);
        if (this._showFavicon()) {
            Utils_1["default"].newElement("td", { innerHTML: this.newest.wikiInfo.getFaviconHTML(true) }, tRow);
        }
        var td1 = Utils_1["default"].newElement("td", {}, tRow);
        Utils_1["default"].newElement("span", { className: "mw-collapsible-toggle", innerHTML: ''
                + '<span class="mw-rc-openarrow"><a title="' + i18n_1["default"]("rc-enhanced-expand") + '">' // href="#"
                + '<img width="12" height="12" title="' + i18n_1["default"]("rc-enhanced-expand") + '" alt="+" src="//images.wikia.nocookie.net/__cb1422546004/common/skins/common/images/Arr_r.png">'
                + '</a></span>'
                + '<span class="mw-rc-closearrow"><a title="' + i18n_1["default"]("rc-enhanced-hide") + '">' // href="#"
                + '<img width="12" height="12" title="' + i18n_1["default"]("rc-enhanced-hide") + '" alt="-" src="//images.wikia.nocookie.net/__cb1422546004/common/skins/common/images/Arr_d.png">'
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
    // The individual lines of a RC "group"
    RCList.prototype._toHTMLBlockLine = function (pRC) {
        var html = "";
        switch (pRC.type) {
            case RC_TYPE_1["default"].LOG: {
                html += "<span class='mw-enhanced-rc-time'>" + pRC.time() + "</span>";
                if (pRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += RCList.SEP;
                html += pRC.logActionText();
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
        } // Blank spot for where favicon would be on a normal table
        Utils_1["default"].newElement("td", {}, tRow); // Blank spot for where collapsing arrow would be on the table
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
                html += pRC.logTitleLink();
                if (pRC.logtype == "upload") {
                    html += this.getAjaxImageButton();
                }
                html += i18n_1["default"]("semicolon-separator") + pRC.time();
                html += RCList.SEP;
                html += pRC.logActionText();
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
                html += tRC.discusssionTitleText(this.getThreadTitle());
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
    // Static Constants
    RCList.SEP = " . . ";
    return RCList;
}());
exports["default"] = RCList;

},{"./ConstantsApp":1,"./RCData":3,"./RC_TYPE":10,"./Utils":12,"./i18n":14}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
var RCMWikiPanel_1 = require("./RCMWikiPanel");
var RCMOptions_1 = require("./RCMOptions");
var ConstantsApp_1 = require("./ConstantsApp");
var RCMModal_1 = require("./RCMModal");
var WikiData_1 = require("./WikiData");
var RCData_1 = require("./RCData");
var RCMWikiaDiscussionData_1 = require("./RCMWikiaDiscussionData");
// import RCMAbuseLogData from "./RCMAbuseLogData";
var RCList_1 = require("./RCList");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./RC_TYPE");
var Notification = window.Notification;
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### RCMManager - Module core ####
// * This is what actually parses a "rc-content-multiple" div, and loads the respective information.
// * Uses RCList to actually format the RecentChanges info.
//######################################
var RCMManager = /** @class */ (function () {
    // Constructor
    function RCMManager(pWrapper, pModID) {
        this.modID = "rcm" + pModID;
        this.resultCont = pWrapper;
        this.makeLinksAjax = false;
        this.ajaxID = 0;
        this.autoRefreshLocalStorageID = ConstantsApp_1["default"].AUTO_REFRESH_LOCAL_STORAGE_ID + "-" + this.modID;
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
    // Should only be called once per RCMManager.
    RCMManager.prototype._parseWikiList = function () {
        var _this = this;
        /***************************
        * Data provided to script
        ***************************/
        var tDataset = this.resultCont.dataset;
        this.rcParamsBase = $.extend({}, Main_1["default"].rcParamsURL, this.parseRCParams(tDataset.params, "&", "="));
        this.rcParams = $.extend(this.getDefaultRCParams(), this.rcParamsBase);
        this.autoRefreshEnabledDefault = tDataset.autorefreshEnabled == "true" ? true : false;
        this.autoRefreshTimeoutNum = (tDataset.autorefresh ? parseInt(tDataset.autorefresh) : 60) * 1000; // {int} number of milliseconds to wait before refreshing.
        this.autoRefreshEvenOnFocus = tDataset.autorefreshEvenonfocus == "false" ? false : true;
        this.discussionsEnabled = tDataset.discussionsEnabled !== "false";
        // List of users to hide across whole RCMManager
        this.hideusers = []; // {array}
        if (tDataset.hideusers) {
            this.hideusers = tDataset.hideusers.replace(/_/g, " ").split(",");
        }
        // if(this.rcParams.hidemyself) {
        // 	var tUsername = ConstantsApp.username;
        // 	if(tUsername) { this.hideusers.push(tUsername); }
        // }
        this.hideusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
        this.notificationsHideusers = [];
        if (tDataset.notificationsHideusers) {
            this.notificationsHideusers = tDataset.notificationsHideusers.replace(/_/g, " ").split(",");
        }
        this.notificationsHideusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
        // Only show these users' edits across whole RCMManager
        this.onlyshowusers = []; // {array}
        if (tDataset.onlyshowusers) {
            this.onlyshowusers = tDataset.onlyshowusers.replace(/_/g, " ").split(",");
        }
        this.onlyshowusers.forEach(function (o, i, a) { a[i] = Utils_1["default"].ucfirst(a[i].trim()); });
        this.extraLoadingEnabled = tDataset.extraLoadingEnabled == "false" ? false : true;
        this.makeLinksAjax = tDataset.ajaxlinks == "true" ? true : false;
        // Wikis for the script to load
        this.chosenWikis = [];
        // Utils.forEach(this.resultCont.querySelectorAll(">ul>li"), (pNode) => {
        $(this.resultCont).find(">ul>li").each(function (i, pNode) {
            _this.chosenWikis.push(new WikiData_1["default"](_this).initListData(pNode));
        });
        // Remove duplicates
        this.chosenWikis = Utils_1["default"].uniq_fast_key(this.chosenWikis, "scriptpath"); //todo - mke sure this now also checks /fr/ and such
        tDataset = null;
        this.resultCont.innerHTML = "";
    };
    // Adds core elements. Should only be called once per RCMManager.
    RCMManager.prototype.init = function () {
        this.resultCont.innerHTML = "";
        this.resultCont.className += " " + this.modID;
        this.modID = "." + this.modID;
        this.rcData = [];
        this.recentChangesEntries = [];
        /***************************
        * HTML Elements/Nodes
        ***************************/
        this.optionsNode = new RCMOptions_1["default"](this).init(Utils_1["default"].newElement("div", { className: "rcm-options" }, this.resultCont));
        this.statusNode = Utils_1["default"].newElement("div", { className: "rcm-status" }, this.resultCont);
        this.wikisNode = new RCMWikiPanel_1["default"](this).init(Utils_1["default"].newElement("div", { className: "rcm-wikis" }, this.resultCont));
        this._showUpdateMessage();
        this.resultsNode = Utils_1["default"].newElement("div", { className: "rcm-results rc-conntent" }, this.resultCont);
        this.footerNode = Utils_1["default"].newElement("div", { className: "rcm-footer" }, this.resultCont);
        /***************************
        * Setup
        ***************************/
        // Footer never changes, so set here
        var tEndNewMessageDate = new Date(ConstantsApp_1["default"].lastVersionDateString);
        tEndNewMessageDate.setDate(tEndNewMessageDate.getDate() + 3);
        var tNewVersion = tEndNewMessageDate > new Date() ? '<sup class="rcm-new-version">' + i18n_1["default"]("wikifeatures-promotion-new") + '</sup>' : "";
        this.footerNode.innerHTML = "[<a href='//dev.fandom.com/wiki/RecentChangesMultiple'>RecentChangesMultiple</a>] " + i18n_1["default"]('rcm-footer', "<a href='https://github.com/fewfre/RecentChangesMultiple/blob/master/changelog'>" + ConstantsApp_1["default"].version + "</a>" + tNewVersion, "<img src='https://fewfre.com/images/avatar.jpg?tag=rcm' width='14' height='14' /> <a href='https://fewfre.fandom.com/wiki/Fewfre_Wiki'>Fewfre</a>");
        $(this.resultsNode).on("click", ".rcm-favicon-goto-button", this.wikisNode.goToAndOpenInfo);
        // Now start the app
        this._startWikiDataLoad();
        return this;
    };
    ;
    RCMManager.prototype._showUpdateMessage = function () {
        this._addUpdateMessage({
            messageID: "rcm-news-V2.12-wikia-to-fandom-hide",
            messageColor: "gold",
            endDate: "2019-5-30T00:00:00.000Z",
            message: "\n\t\t\tChange \"wikia.com\" wikis to \"fandom.com\" on your wiki list once they convert to help avoid HTTPS errors.\n\t\t\tWhile converted wikia wikis redirect, they still count as http until changed to fandom.com, so using wikia links while running the script on a fandom wiki will often cause errors.\n\t\t\t",
        });
        this._addUpdateMessage({
            messageID: "rcm-news-V2.12-hide",
            messageColor: "green",
            endDate: "2019-3-30T00:00:00.000Z",
            message: "\n\t\t\tSupport for fandom language wikis now added.\n\t\t\tYou can now add slashes to a wiki on the list.\n\t\t\tex: <code>sonic.fandom.com/pl/.</code> (doesn't work with wikia wikis, only fandom)\n\t\t\tSee <a href='https://dev.fandom.com/wiki/RecentChangesMultiple#Basic_Usage'>here</a> for more details.\n\t\t\t",
        });
    };
    ;
    RCMManager.prototype._addUpdateMessage = function (pData) {
        var messageID = pData.messageID, messageColor = pData.messageColor, endDate = pData.endDate, message = pData.message;
        // Stop showing in a month or two, but also remember dismissal via localStorage.
        if (new Date(endDate) > new Date() && (localStorage.getItem(messageID) != "true")) {
            var tMessage = Utils_1["default"].newElement("div", { className: "rcm-update-message", innerHTML: message }, this.resultCont);
            tMessage.style.cssText = "border:5px double " + messageColor + "; padding:2px 6px; overflow-y: hidden;";
            var tButton = Utils_1["default"].newElement("button", { innerHTML: "Dismiss Message" }, tMessage);
            tButton.addEventListener("click", function tRCM_dismissNotice() {
                Utils_1["default"].removeElement(tMessage);
                tButton.removeEventListener("click", tRCM_dismissNotice);
                localStorage.setItem(messageID, "true");
            });
            tButton.style.cssText = "float:right;";
        }
    };
    /***************************
    * Loading
    ***************************/
    RCMManager.prototype._load = function (pWikiData, pUrl, pDataType, pTries, pID, pCallback, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        ++pTries;
        // A timeout is used instead of loading 1 at a time to save time, as it allows some loading overlap.
        // A timeout is needed since Wikia wikis share a "request overload" detector, which can block your account from making more requests for awhile.
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
                var tMessage = pFailStatus == null ? "rcm-error-loading-syntaxhang" : "rcm-error-loading-connection";
                pHandleErrorCallback(pWikiData, pTries, pID, tMessage, RCMManager.LOADING_ERROR_RETRY_NUM_INC);
            }
            else {
                this.erroredWikis.push({ wikiInfo: pWikiData, tries: pTries, id: pID });
                this.statusNode.querySelector(".errored-wiki").innerHTML += ", " + pWikiData.servername;
            }
        }
    };
    // After a wiki is loaded, check if ALL wikis are loaded
    // If so add results; if not, load the next wiki, or wait for next wiki to return data.
    RCMManager.prototype._onParsingFinished = function (pCallback) {
        var _this = this;
        this.wikisLeftToLoad--;
        document.querySelector(this.modID + " .rcm-load-perc").innerHTML = this.calcLoadPercent() + "%"; //.toFixed(3) + "%";
        if (this.wikisLeftToLoad > 0) {
            if (this.ajaxCallbacks.length > 0) {
                this.ajaxCallbacks.shift();
                // Parse next wiki in queue (if there is one), or wait for next wiki.
                if (this.ajaxCallbacks.length > 0) {
                    setTimeout(function () { _this.ajaxCallbacks[0](); }, 0);
                }
            }
        }
        else {
            pCallback();
        }
    };
    /***************************
    * Setup WikiData classes - Various wiki data needs to be loaded before the script can properly run.
    * These should only be called at the begining of the script; once data is retrieved, does not need to be loaded again.
    ***************************/
    RCMManager.prototype._startWikiDataLoad = function () {
        var _this = this;
        this.erroredWikis = [];
        this.ajaxCallbacks = [];
        this.ajaxID++;
        this.loadingErrorRetryNum = RCMManager.LOADING_ERROR_RETRY_NUM_INC;
        if (this.chosenWikis.length > 0) {
            Utils_1["default"].forEach(this.chosenWikis, function (tWikiData, i) {
                _this._loadWikiData(tWikiData, 0, _this.ajaxID, (i + 1) * ConstantsApp_1["default"].loadDelay);
            });
            this.totalItemsToLoad = this.chosenWikis.length;
            this.wikisLeftToLoad = this.totalItemsToLoad;
            this.statusNode.innerHTML = ConstantsApp_1["default"].getLoader() + " " + i18n_1["default"]('app-loading') + " (<span class='rcm-load-perc'>0%</span>)";
        }
        else {
            // If the RCM has no wikis listed, there is nothing to run, and the user should be informed.
            Utils_1["default"].removeElement(this.statusNode);
            Utils_1["default"].removeElement(this.wikisNode.root);
            this.resultsNode.innerHTML = "<div class='banner-notification error center'>" + i18n_1["default"]("wikiacuratedcontent-content-empty-section") + "</div>";
        }
    };
    RCMManager.prototype._loadWikiData = function (pWikiData, pTries, pID, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        this._load(pWikiData, pWikiData.getWikiDataApiUrl(), 'jsonp', pTries, pID, this._onWikiDataLoaded.bind(this), pDelayNum);
    };
    RCMManager.prototype._onWikiDataLoaded = function (pData, pWikiData, pTries, pID, pFailStatus) {
        // Make sure this isn't something loaded before the script was last refreshed.
        if (pID != this.ajaxID) {
            return;
        }
        // Make sure results are valid
        if (!!pData && pData.error && pData.query == null) {
            console.error(pData, pData.error, pData.query == null);
            this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + pWikiData.servername + "</div>" + JSON.stringify(pData.error) + "</div>";
            throw "Wiki returned error";
        }
        else if (pFailStatus == "timeout") {
            this._handleWikiDataLoadError(pWikiData, pTries, pID, "rcm-error-loading-syntaxhang", 1);
            return;
        }
        else if (pData == null || pData.query == null || pData.query.general == null) {
            // mw.log("Error loading "+pWikiData.servername+" ("+pTries+"/"+this.loadingErrorRetryNum+" tries)");
            // //mw.log(pData);
            // if(pTries < this.loadingErrorRetryNum) {
            // 	this._loadWikiData(pWikiData, pTries, pID, 0);
            // } else {
            // 	if(this.erroredWikis.length === 0) {
            // 		var tMessage = pFailStatus==null ? "rcm-error-loading-syntaxhang" : "rcm-error-loading-connection";
            // 		this._handleWikiDataLoadError(pWikiData, pTries, pID, tMessage, RCMManager.LOADING_ERROR_RETRY_NUM_INC);
            // 	} else {
            // 		this.erroredWikis.push({wikiInfo:pWikiData, tries:pTries, id:pID});
            // 		this.statusNode.querySelector(".errored-wiki").innerHTML += ", "+pWikiData.servername;
            // 	}
            // }
            this._retryOrError(pWikiData, pTries, pID, pFailStatus, this._loadWikiData.bind(this), this._handleWikiDataLoadError.bind(this));
            return;
        }
        if (pData && pData.warning) {
            mw.log("WARNING: ", pData.warning);
        }
        // Store wiki-data retrieved that's needed before wiki parsing
        pWikiData.initAfterLoad(pData.query);
        this._onWikiDataParsingFinished(pWikiData);
    };
    RCMManager.prototype._handleWikiDataLoadError = function (pWikiData, pTries, pID, pErrorMessage, pInc) {
        var _this = this;
        this.statusNode.innerHTML = "<div class='rcm-error'>" + i18n_1["default"](pErrorMessage, "<span class='errored-wiki'>" + pWikiData.servername + "</span>", pTries) + "</div>";
        if (pErrorMessage == "rcm-error-loading-syntaxhang" && 'https:' == document.location.protocol) {
            this.statusNode.innerHTML += "<div class='rcm-error'>" + i18n_1["default"]("rcm-error-loading-http") + "</div>";
        }
        var tHandler = function (pEvent) {
            _this.loadingErrorRetryNum += pInc;
            if (pEvent) {
                pEvent.target.removeEventListener("click", tHandler);
            }
            tHandler = null;
            _this.erroredWikis.forEach(function (obj) {
                // mw.log(obj);
                _this._loadWikiData(obj.wikiInfo, obj.tries, obj.id);
            });
            _this.erroredWikis = [];
            _this.statusNode.innerHTML = ConstantsApp_1["default"].getLoader() + " " + i18n_1["default"]('rcm-loading') + " (<span class='rcm-load-perc'>" + _this.calcLoadPercent() + "%</span>)";
        };
        Utils_1["default"].newElement("button", { innerHTML: i18n_1["default"]("rcm-error-trymoretimes", pInc) }, this.statusNode).addEventListener("click", tHandler);
        var tHandlerRemove = function (pEvent) {
            if (pEvent) {
                pEvent.target.removeEventListener("click", tHandlerRemove);
            }
            tHandlerRemove = null;
            _this.chosenWikis.splice(_this.chosenWikis.indexOf(pWikiData), 1);
            _this.statusNode.innerHTML = ConstantsApp_1["default"].getLoader() + " " + i18n_1["default"]('rcm-loading') + " (<span class='rcm-load-perc'>" + _this.calcLoadPercent() + "%</span>)";
            _this._onWikiDataParsingFinished(null);
        };
        Utils_1["default"].addTextTo(" ", this.statusNode);
        Utils_1["default"].newElement("button", { innerHTML: i18n_1["default"]("wikia-hubs-remove") }, this.statusNode).addEventListener("click", tHandlerRemove);
        this.erroredWikis.push({ wikiInfo: pWikiData, tries: pTries, id: pID });
    };
    RCMManager.prototype._onWikiDataParsingFinished = function (pWikiData) {
        var _this = this;
        this._onParsingFinished(function () { _this._onAllWikiDataParsed(); });
    };
    // Should only be called once.
    RCMManager.prototype._onAllWikiDataParsed = function () {
        this.flagWikiDataIsLoaded = true;
        // Add some run-time CSS classes
        var tCSS = "";
        this.chosenWikis.forEach(function (wikiInfo) {
            // bgcolor should be used if specified, otherwise tile favicon as background. But not both.
            tCSS += "\n." + wikiInfo.rcClass + " .rcm-tiled-favicon {"
                + (wikiInfo.bgcolor != null ? "background: " + wikiInfo.bgcolor + ";" : "background-image: url(" + wikiInfo.favicon + ");")
                + " }";
        });
        mw.util.addCSS(tCSS);
        this._start(true);
    };
    /***************************
    * Discussion Loading
    ***************************/
    RCMManager.prototype._startDiscussionLoading = function (pID) {
        var _this = this;
        if (!this.discussionsEnabled) {
            return;
        }
        this.ajaxCallbacks = [];
        this.loadingErrorRetryNum = RCMManager.LOADING_ERROR_RETRY_NUM_INC;
        this.totalItemsToLoad = 0;
        Utils_1["default"].forEach(this.chosenWikis, function (tWikiData, i) {
            if (tWikiData.usesWikiaDiscussions !== false) {
                _this.totalItemsToLoad++;
                _this._loadWikiaDiscussions(tWikiData, 0, pID, _this.totalItemsToLoad * ConstantsApp_1["default"].loadDelay);
            }
        });
        // If no discussions are being loaded, skip it and tell manager to not even bother in the future.
        if (this.totalItemsToLoad <= 0) {
            this.discussionsEnabled = false;
            this.rcmChunkStart();
            return;
        }
        this.wikisLeftToLoad = this.totalItemsToLoad;
        this.statusNode.innerHTML = ConstantsApp_1["default"].getLoader() + " " + i18n_1["default"]('embeddable-discussions-loading') + " (<span class='rcm-load-perc'>0%</span>)";
    };
    RCMManager.prototype._loadWikiaDiscussions = function (pWikiData, pTries, pID, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        this._load(pWikiData, pWikiData.getWikiDiscussionUrl(), 'json', pTries, pID, this._onWikiDiscussionLoaded.bind(this), pDelayNum);
    };
    RCMManager.prototype._onWikiDiscussionLoaded = function (pData, pWikiData, pTries, pID, pFailStatus) {
        var _this = this;
        // Make sure this isn't something loaded before the script was last refreshed.
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
                //mw.log(pData);
                if (pTries < this.loadingErrorRetryNum && pFailStatus == "timeout") {
                    this._loadWikiaDiscussions(pWikiData, pTries, pID, 0);
                }
                else {
                    // Don't do any fancy error catching. just fail.
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
        // Check if wiki doesn't have any recent changes
        if (pData.length <= 0) {
            this._onDiscussionParsingFinished(pWikiData);
            return;
        }
        // A sort is needed since they are sorted by creation, not last edit.
        pData.sort(function (a, b) {
            return (a.modificationDate || a.creationDate).epochSecond < (b.modificationDate || b.creationDate).epochSecond ? 1 : -1;
        });
        pWikiData.updateLastDiscussionDate(Utils_1["default"].getFirstItemFromObject(pData));
        var tNewRC, tDate, tChangeAdded;
        // Add each entry from the wiki to the list in a sorted order
        pData.forEach(function (pRCData) {
            var tUser = pRCData.createdBy.name;
            if (_this._changeShouldBePrunedBasedOnOptions(tUser, pWikiData)) {
                return;
            }
            // If hideself set
            if (pWikiData.rcParams.hidemyself && ConstantsApp_1["default"].username == tUser) {
                return;
            }
            // Skip if goes past the RC "changes in last _ days" value.
            if ((pRCData.modificationDate || pRCData.creationDate).epochSecond < Math.round(pWikiData.getEndDate().getTime() / 1000)) {
                return;
            }
            _this.itemsToAddTotal++;
            tNewRC = new RCMWikiaDiscussionData_1["default"](pWikiData, _this);
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
    /***************************
    * Main RecentChanges loading methods
    ***************************/
    RCMManager.prototype._start = function (pUpdateParams) {
        var _this = this;
        if (pUpdateParams === void 0) { pUpdateParams = false; }
        clearTimeout(this.autoRefreshTimeoutID);
        this.wikisNode.populate();
        this.newRecentChangesEntries = [];
        this.ajaxCallbacks = [];
        this.erroredWikis = [];
        this.secondaryWikiData = [];
        this.ajaxID++;
        this.loadingErrorRetryNum = RCMManager.LOADING_ERROR_RETRY_NUM_INC;
        this.itemsAdded = this.itemsToAddTotal = 0;
        this.chosenWikis.forEach(function (tWikiData, i) {
            if (pUpdateParams) {
                tWikiData.setupRcParams();
            } // Encase it was changed via RCMOptions
            _this._loadWiki(tWikiData, 0, _this.ajaxID, (i + 1) * ConstantsApp_1["default"].loadDelay);
        });
        this.totalItemsToLoad = this.chosenWikis.length;
        this.wikisLeftToLoad = this.totalItemsToLoad;
        this.statusNode.innerHTML = ConstantsApp_1["default"].getLoader() + " " + i18n_1["default"]('rcm-loading') + " (<span class='rcm-load-perc'>0%</span>)";
    };
    // Refresh and add new changes to top
    RCMManager.prototype.refresh = function (pUpdateParams) {
        if (pUpdateParams === void 0) { pUpdateParams = false; }
        if (this.chosenWikis.length == 0 || !this.flagWikiDataIsLoaded) {
            return;
        }
        this.isHardRefresh = false;
        this.statusNode.innerHTML = "";
        // this.resultsNode.innerHTML = "";
        this.wikisNode.clear();
        // Remove except if auto refresh is on, window doesn't have focus, and the window wasn't clicked and then lost focus again (by checking lastLoadDateTime)
        if (this.rcmNewChangesMarker && (!this.isAutoRefreshEnabled() || (document.hasFocus() || this.lastLoadDateTime >= this.recentChangesEntries[0].date))) {
            Utils_1["default"].removeElement(this.rcmNewChangesMarker);
            this.rcmNewChangesMarker = null;
        }
        if (this.rcmNoNewChangesMarker) {
            Utils_1["default"].removeElement(this.rcmNoNewChangesMarker);
            this.rcmNoNewChangesMarker = null;
        }
        // if(this.recentChangesEntries != null) {
        // 	for (var i = 0; i < this.recentChangesEntries.length; i++) {
        // 		this.recentChangesEntries[i].dispose();
        // 		this.recentChangesEntries[i] = null;
        // 	}
        // 	this.recentChangesEntries = null;
        // }
        this.ajaxCallbacks = null;
        this.secondaryWikiData = null;
        RCMModal_1["default"].closeModal();
        this._start(pUpdateParams);
    };
    // Refresh and fetch all data again.
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
        this.wikisNode.clear();
        this.chosenWikis.forEach(function (tWikiData) {
            tWikiData.lastChangeDate = tWikiData.getEndDate();
            tWikiData.lastDiscussionDate = tWikiData.getEndDate();
            tWikiData.resultsCount = 0;
            tWikiData.discussionsCount = 0;
        });
        // if(this.rcData != null) {
        // 	for (var i = 0; i < this.rcData.length; i++) {
        // 		this.rcData[i].list.dispose();
        // 		this.rcData[i] = null;
        // 	}
        // 	this.rcData = null;
        // }
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
    // Separate method so that it can be reused if the loading failed
    RCMManager.prototype._loadWiki = function (pWikiData, pTries, pID, pDelayNum) {
        if (pDelayNum === void 0) { pDelayNum = 0; }
        this._load(pWikiData, pWikiData.getApiUrl(), 'jsonp', pTries, pID, this._onWikiLoaded.bind(this), pDelayNum);
    };
    /* Called after a wiki is loaded; will add it to queue, and run it if no other callbacks running. */
    RCMManager.prototype._onWikiLoaded = function (pData, pWikiData, pTries, pID, pFailStatus) {
        var _this = this;
        // Make sure this isn't something loaded before the script was last refreshed.
        if (pID != this.ajaxID) {
            return;
        }
        // Make sure results are valid
        if (!!pData && pData.error && pData.query == null) {
            this.statusNode.innerHTML = "<div class='rcm-error'><div>ERROR: " + pWikiData.servername + "</div>" + JSON.stringify(pData.error) + "</div>";
            this.addRefreshButtonTo(this.statusNode);
            throw "Wiki returned error";
        }
        else if (pFailStatus == "timeout") {
            this._handleWikiLoadError(pWikiData, pTries, pID, "rcm-error-loading-syntaxhang", 1);
            return;
        }
        else if (pData == null || pData.query == null || pData.query.recentchanges == null) {
            this._retryOrError(pWikiData, pTries, pID, pFailStatus, this._loadWiki.bind(this), this._handleWikiLoadError.bind(this));
            return;
        }
        if (pData && pData.warning) {
            mw.log("WARNING: ", pData.warning);
        }
        // Store wiki-data retrieved that's needed before wiki parsing
        // pWikiData.initAfterLoad(pData.query);
        this.ajaxCallbacks.push(function () {
            // this._parseWikiAbuseLog(pData.query.abuselog, pWikiData);
            _this._parseWiki(pData.query.recentchanges, pData.query.logevents, pWikiData);
        });
        // Directly call next callback if this is the only one in it. Otherwise let script handle it.
        if (this.ajaxCallbacks.length === 1) {
            this.ajaxCallbacks[0]();
        }
    };
    RCMManager.prototype._handleWikiLoadError = function (pWikiData, pTries, pID, pErrorMessage, pInc) {
        var _this = this;
        clearTimeout(this.loadErrorTimeoutID);
        this.loadErrorTimeoutID = null;
        this.statusNode.innerHTML = "<div class='rcm-error'>" + i18n_1["default"](pErrorMessage, "<span class='errored-wiki'>" + pWikiData.servername + "</span>", pTries) + "</div>";
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
                // mw.log(obj);
                _this._loadWiki(obj.wikiInfo, obj.tries, obj.id);
            });
            _this.erroredWikis = [];
            _this.statusNode.innerHTML = ConstantsApp_1["default"].getLoader() + " " + i18n_1["default"]('rcm-loading') + " (<span class='rcm-load-perc'>" + _this.calcLoadPercent() + "%</span>)";
        };
        Utils_1["default"].newElement("button", { innerHTML: i18n_1["default"]("rcm-error-trymoretimes", pInc) }, this.statusNode).addEventListener("click", tHandler);
        this.erroredWikis.push({ wikiInfo: pWikiData, tries: pTries, id: pID });
        if (this.isAutoRefreshEnabled()) {
            this.loadErrorTimeoutID = window.setTimeout(function () { if (tHandler) {
                tHandler(null);
            } }, 20000);
        }
    };
    /* Check wiki data one at a time, either as it's returned, or after the current data is done being processed. */
    RCMManager.prototype._parseWiki = function (pData, pLogData, pWikiData) {
        var _this = this;
        // Check if wiki doesn't have any recent changes
        if (pData.length <= 0) {
            this._onWikiParsingFinished(pWikiData);
            return;
        }
        mw.log(pWikiData.servername, pData);
        pWikiData.updateLastChangeDate(Utils_1["default"].getFirstItemFromObject(pData));
        var tNewRC, tDate, tChangeAdded;
        // Add each entry from the wiki to the list in a sorted order
        pData.forEach(function (pRCData) {
            if (_this._changeShouldBePrunedBasedOnOptions(pRCData.user, pWikiData)) {
                return;
            }
            _this.itemsToAddTotal++;
            tNewRC = new RCData_1["default"](pWikiData, _this).init(pRCData, pLogData);
            _this._addRCDataToList(tNewRC);
            pWikiData.resultsCount++;
        });
        this._onWikiParsingFinished(pWikiData);
    };
    ;
    RCMManager.prototype._changeShouldBePrunedBasedOnOptions = function (pUser, pWikiData) {
        // Skip if user is hidden for whole script or specific wiki
        if (pUser && this.hideusers.indexOf(pUser) > -1 || (pWikiData.hideusers && pWikiData.hideusers.indexOf(pUser) > -1)) {
            return true;
        }
        // Skip if user is NOT a specified user to show for whole script or specific wiki
        if (pUser && (this.onlyshowusers.length != 0 && this.onlyshowusers.indexOf(pUser) == -1)) {
            return true;
        }
        if (pUser && (pWikiData.onlyshowusers != undefined && pWikiData.onlyshowusers.indexOf(pUser) == -1)) {
            return true;
        }
        return false;
    };
    // private _parseWikiAbuseLog(pLogs, pWikiData:WikiData) : void {
    // 	// Check if wiki doesn't have any logs
    // 	if(!pLogs || pLogs.length <= 0) {
    // 		// this._onWikiParsingFinished(pWikiData);
    // 		return;
    // 	}
    // 	pWikiData.updateLastChangeDate(Utils.getFirstItemFromObject(pLogs));
    // 	// Add each entry from the wiki to the list in a sorted order
    // 	pLogs.forEach((pLogData) => {
    // 		if(this._changeShouldBePrunedBasedOnOptions(pLogData.user, pWikiData)) { return; }
    // 		this.itemsToAddTotal++;
    // 		this._addRCDataToList( new RCMAbuseLogData( pWikiData, this ).init(pLogData) );
    // 		pWikiData.resultsCount++;
    // 	});
    // }
    // TODO: Make it more efficient if using hideenhanced by ignoring some calls.
    RCMManager.prototype._addRCDataToList = function (pNewRC) {
        var _this = this;
        var tNewRcCombo = { data: pNewRC, list: null };
        this.rcData.push(tNewRcCombo); // Just push it in, we'll sort it in rcmChunkStart use array.sort (less intensive than doing it manually).
        var tResultsIsEmpty = this.resultsNode.innerHTML == "", tNewList, tNoChangeAdded;
        if (this.rcParams.hideenhanced) {
            tNoChangeAdded = true; // No reason to do fancy stuff, we'll just call array.sort in rcmChunkStart
        }
        else if (tResultsIsEmpty) {
            tNoChangeAdded = this.recentChangesEntries.every(function (pRCList, i) {
                // No reason to check further for groupings than anything older than self (would be end of the list anyways, if not for other wiki entries)
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
                // No reason to check further for groupings than anything older than self (would be end of the list anyways, if not for other wiki entries)
                // If results in not empty, then we do want to keep checking (by setting tIndexToAddAt) since previous groupings have already been made.
                if (tIndexToAddAt_1 == -1 && pNewRC.date > pRCList.date) {
                    // if(tResultsIsEmpty) {
                    // 	this.recentChangesEntries.splice(i, 0, tNewList = new RCList(this).addRC(pNewRC));
                    // 	return false;
                    // } else {
                    tIndexToAddAt_1 = i;
                    // Encase the grouping is the first thing on the list
                    if (pRCList.shouldGroupWith(pNewRC)) {
                        tNewList = pRCList.addRC(pNewRC);
                        // this.recentChangesEntries.splice(i, 1); // i is higher than tIndexToAddAt, so removing it won't mess up order.
                        // this.recentChangesEntries.splice(tIndexToAddAt, 0, pRCList);
                        return false;
                    }
                    // }
                }
                else {
                    if (pRCList.shouldGroupWith(pNewRC)) {
                        tNewList = pRCList.addRC(pNewRC);
                        if (tIndexToAddAt_1 > -1) {
                            _this.recentChangesEntries.splice(i, 1); // i is higher than tIndexToAddAt, so removing it won't mess up order.
                            _this.recentChangesEntries.splice(tIndexToAddAt_1, 0, pRCList);
                        }
                        return false;
                    }
                    // If tIndexToAddAt is set no reason to keep checking if it literally can not match (due to being the next day).
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
    // /* Check wiki data one at a time, either as it's returned, or after the current data is done being processed. */
    // private _parseWikiOld(pData, pLogData, pWikiData:WikiData) : void {
    // 	// Check if wiki doesn't have any recent changes
    // 	if(pData.length <= 0) {
    // 		this._onWikiParsingFinished(pWikiData);
    // 		return;
    // 	}
    //
    // 	mw.log(pWikiData.servername, pData);
    //
    // 	var tNewRC, tDate, tChangeAdded;
    // 	// Add each entry from the wiki to the list in a sorted order
    // 	pData.forEach((pRCData) => {
    // 		// Skip if user is hidden for whole script or specific wiki
    // 		if(pRCData.user && this.hideusers.indexOf(pRCData.user) > -1 || (pWikiData.hideusers && pWikiData.hideusers.indexOf(pRCData.user) > -1)) { return; }
    // 		// Skip if user is NOT a specified user to show for whole script or specific wiki
    // 		if(pRCData.user && (this.onlyshowusers.length != 0 && this.onlyshowusers.indexOf(pRCData.user) == -1)) { return; }
    // 		if(pRCData.user && (pWikiData.onlyshowusers != undefined && pWikiData.onlyshowusers.indexOf(pRCData.user) == -1)) { return; }
    //
    // 		this.itemsToAddTotal++;
    // 		tNewRC = new RCData( pWikiData, this ).init(pRCData, pLogData);
    // 		tChangeAdded = false;
    // 		this.recentChangesEntries.every((pRCList:RCList, i:number) => {
    // 			if(tNewRC.date > pRCList.date) {
    // 				this.recentChangesEntries.splice(i, 0, new RCList(this).addRC(tNewRC));
    // 				tChangeAdded = true;
    // 				return false;
    // 			} else {
    // 				if(this.rcParams.hideenhanced == false && pRCList.shouldGroupWith(tNewRC)) {
    // 					pRCList.addRC(tNewRC);
    // 					tChangeAdded = true;
    // 					return false;
    // 				}
    // 			}
    // 			return true;
    // 		});
    // 		if(!tChangeAdded || this.recentChangesEntries.length == 0) { this.recentChangesEntries.push( new RCList(this).addRC(tNewRC) ); }
    // 	});
    //
    // 	this._onWikiParsingFinished(pWikiData);
    // };
    // After a wiki is loaded, check if ALL wikis are loaded; if so add results; if not, load the next wiki, or wait for next wiki to return data.
    RCMManager.prototype._onWikiParsingFinished = function (pWikiData) {
        var _this = this;
        this.wikisNode.addWiki(pWikiData);
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
    /***************************
    * Display Results
    ***************************/
    // All wikis are loaded
    RCMManager.prototype.rcmChunkStart = function () {
        var _this = this;
        var tDate = new Date();
        this.statusNode.innerHTML = i18n_1["default"]('rcm-download-timestamp', "<b><tt>" + Utils_1["default"].pad(Utils_1["default"].getHours(tDate), 2) + ":" + Utils_1["default"].pad(Utils_1["default"].getMinutes(tDate), 2) + "</tt></b>");
        this.statusNode.innerHTML += "<span class='rcm-content-loading'>" + i18n_1["default"]('rcm-download-changesadded', "<span class='rcm-content-loading-num'>0</span> / " + this.itemsToAddTotal) + "</span>";
        // Using array sort after as it's more efficient than doing it manually.
        this.rcData.sort(function (a, b) { return b.data.date.valueOf() - a.data.date.valueOf(); });
        if (this.rcParams.hideenhanced) {
            this.recentChangesEntries.sort(function (a, b) { return b.date.valueOf() - a.date.valueOf(); });
        }
        this.removeOldResults(tDate);
        // New changes to add to page
        this.newRecentChangesEntries = [];
        var tResultsIsEmpty = this.resultsNode.innerHTML == "";
        this.recentChangesEntries.every(function (pRCList, i) {
            if (pRCList.date > _this.lastLoadDateTimeActual || tResultsIsEmpty) {
                _this.newRecentChangesEntries.push(pRCList);
                return true;
            }
            return false;
        });
        // Remove except if auto refresh is on, window doesn't have focus, and the window wasn't clicked and then lost focus again (by checking lastLoadDateTime)
        // if(this.rcmNewChangesMarker && (!this.isAutoRefreshEnabled() || (document.hasFocus() || this.recentChangesEntries[0].date < this.lastLoadDateTime))) {
        // 	Utils.removeElement(this.rcmNewChangesMarker);
        // 	this.rcmNewChangesMarker = null;
        // }
        // Remove this before laoding starts.
        // if(this.rcmNoNewChangesMarker) { Utils.removeElement(this.rcmNoNewChangesMarker); this.rcmNoNewChangesMarker = null; }
        if (this.recentChangesEntries.length == 0 || (this.lastLoadDateTime != null && this.recentChangesEntries[0].date <= this.lastLoadDateTime)) {
            if (!this.rcmNewChangesMarker)
                this.rcmNoNewChangesMarker = this.resultsNode.insertBefore(Utils_1["default"].newElement("div", { className: "rcm-noNewChanges", innerHTML: "<strong>" + i18n_1["default"]('rcm-nonewchanges') + "</strong>" }), this.resultsNode.firstChild);
        }
        else {
            if (!this.rcmNewChangesMarker && this.newRecentChangesEntries.length > 0 && this.lastLoadDateTime != null && this.resultsNode.innerHTML != "") {
                var tRcSection = this.resultsNode.querySelector("div, ul");
                this.rcmNewChangesMarker = tRcSection.insertBefore(Utils_1["default"].newElement("div", { className: "rcm-previouslyLoaded", innerHTML: "<strong>" + i18n_1["default"]('rcm-previouslyloaded') + "</strong>" }), tRcSection.firstChild);
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
    // // All wikis are loaded
    // rcmChunkStartOld() : void {
    // 	let tDate:Date = new Date();
    // 	this.statusNode.innerHTML = i18n('rcm-download-timestamp', "<b><tt>"+Utils.pad(Utils.getHours(tDate),2)+":"+Utils.pad(Utils.getMinutes(tDate),2)+"</tt></b>");
    // 	this.statusNode.innerHTML += "<span class='rcm-content-loading'>"+i18n('rcm-download-changesadded', "<span class='rcm-content-loading-num'>0</span> / "+this.itemsToAddTotal)+"</span>"
    // 	this.resultsNode.innerHTML = "";
    //
    // 	// mw.log(this.recentChangesEntries);
    // 	if(this.recentChangesEntries.length == 0 || (this.lastLoadDateTime != null && this.recentChangesEntries[0].date <= this.lastLoadDateTime)) {
    // 		Utils.newElement("div", { className:"rcm-noNewChanges", innerHTML:"<strong>"+i18n('rcm-nonewchanges')+"</strong>" }, this.resultsNode);
    // 	}
    // 	else if(this.lastLoadDateTimeActual != null && this.isAutoRefreshEnabled() && !document.hasFocus()) {
    // 		if(this.recentChangesEntries[0].date > this.lastLoadDateTimeActual) {
    // 			this.notifyUserOfChange();
    // 		}
    // 	}
    // 	this.rcmChunk(0, 99, 99, null, this.ajaxID);
    // }
    // Remove old items past "limit" and "days"
    // All need to be looped through since grouped changes can cause older results to be at the top.
    RCMManager.prototype.removeOldResults = function (pDate) {
        var _this = this;
        if (this.resultsNode.innerHTML == "") {
            return;
        }
        var tWikisToCheck = this.chosenWikis.slice(0);
        var tRcCombo, tDirtyLists = [], tWikiI;
        // Remove all old RCDatas, and mark changed lists as "dirty"
        for (var i = this.rcData.length - 1; i >= 0; i--) {
            tRcCombo = this.rcData[i];
            if ((tWikiI = tWikisToCheck.indexOf(tRcCombo.data.wikiInfo)) == -1) {
                continue;
            }
            // First remove items past "days" (needs to be done first since it can change number allowed by "limit")
            if (tRcCombo.data.shouldBeRemoved(pDate)) {
                if (tRcCombo.data.type != RC_TYPE_1["default"].DISCUSSION) {
                    tRcCombo.data.wikiInfo.resultsCount--;
                }
                else {
                    tRcCombo.data.wikiInfo.discussionsCount--;
                }
                // if(this.rcData[i].data != tRcCombo.list.list[tRcCombo.list.list.length-1]) {
                // 	mw.log("MISMATCH:", tRcCombo.list.list.indexOf(tRcCombo.data), tRcCombo.list.list.length-1, this.rcData[i].data.wikiInfo, this.rcData[i] , tRcCombo.list.list[tRcCombo.list.list.length-1], tRcCombo.list.list);
                // }
                this.rcData[i] = null;
                this.rcData.splice(i, 1);
                tRcCombo.list.removeRC(tRcCombo.data);
                //tRcCombo.list.list.pop().dispose(); // The last item in a list -should- always be the one we care about
                // Mark changed lists as dirty. Edit / remove them after encase multiple datas were removed.
                if (this.rcParams.hideenhanced || tDirtyLists.indexOf(tRcCombo.list) == -1) {
                    tDirtyLists.push(tRcCombo.list);
                }
                tRcCombo.data == null;
                tRcCombo.list = null;
            }
            else if (tRcCombo.data.wikiInfo.resultsCount <= tRcCombo.data.wikiInfo.rcParams.limit && tRcCombo.data.wikiInfo.discussionsCount <= Math.min(tRcCombo.data.wikiInfo.rcParams.limit, 50)) {
                // Stop checking a specific wiki, and if all have been checked exit (for efficency when dealing with high numbers of results).
                tWikisToCheck.splice(tWikiI, 1);
                if (tWikisToCheck.length == 0) {
                    break;
                }
            }
        }
        tRcCombo = null;
        tWikisToCheck = null;
        // Now remove or update dirty lists.
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
        // If there are any blank rc sections left over from removed items, remove them.
        Utils_1["default"].forEach(this.resultsNode.querySelectorAll(".rcm-rc-cont"), function (o) {
            if (o.innerHTML == "") {
                Utils_1["default"].removeElement(o.previousSibling);
                Utils_1["default"].removeElement(o);
            }
        });
        // // First remove items past "days" (needs to be done first since it can change number allowed by "limit")
        // let tRCList:RCList, tNewRCList:RCList, tOldNode:HTMLElement, tDirty:boolean;
        // for(let i = this.recentChangesEntries.length-1; i >= 0; i--) { tRCList = this.recentChangesEntries[i];
        // 	tDirty = false;
        // 	// Loop through all in list encase more than one is to old.
        // 	do {
        // 		if(tRCList.type != RC_TYPE.DISCUSSION) {
        // 			tDirty = true;
        // 			tRCList.wikiInfo.resultsCount--;
        // 			tRCList.list.pop().dispose();
        // 		} else {
        // 			tRCList.wikiInfo.discussionsCount--;
        // 			// TODO: Discussions
        // 			break;
        // 		}
        // 	} while(tRCList.list.length > 0 && tRCList.oldest.shouldBeRemoved(pDate));
        // 	if(tDirty) {
        // 		if(tRCList.list.length <= 0) {
        // 			if(tRCList.htmlNode) { Utils.removeElement(tRCList.htmlNode); }
        // 			this.recentChangesEntries[i].dispose();
        // 			this.recentChangesEntries[i] = null;
        // 			this.recentChangesEntries.splice(i, 1);
        // 		} else {
        // 			if(tRCList.htmlNode) {
        // 				tOldNode = tRCList.htmlNode;
        // 				Utils.insertAfter(tRCList.toHTML(i), tOldNode);
        // 				Utils.removeElement(tOldNode);
        // 			}
        // 		}
        // 	}
        // }
        // tRCList = null; tNewRCList = null; tOldNode = null;
    };
    RCMManager.prototype.notifyUserOfChange = function () {
        var tMostRecentEntry = this.recentChangesEntries[0].newest;
        // Skip if user is hidden for whole script or specific wiki
        var tDontNotify = this.notificationsHideusers.indexOf(tMostRecentEntry.author) > -1 || (tMostRecentEntry.wikiInfo.notificationsHideusers && tMostRecentEntry.wikiInfo.notificationsHideusers.indexOf(tMostRecentEntry.author) > -1) || !tMostRecentEntry.wikiInfo.notificationsEnabled;
        if (!tDontNotify) {
            // Find number of changes since page last visited.
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
            Main_1["default"].blinkWindowTitle(i18n_1["default"]("wikifeatures-promotion-new") + "! " + i18n_1["default"]("nchanges", tNumNewChanges));
            var tEditTitle = tMostRecentEntry.title;
            if (tMostRecentEntry.type == RC_TYPE_1["default"].LOG) {
                tEditTitle = tMostRecentEntry.logTitle() + (tEditTitle ? " - " + tEditTitle : "");
            }
            else if (tEditTitle == null) {
                tEditTitle = this.recentChangesEntries[0].getExistingThreadTitle();
                tEditTitle = tEditTitle ? i18n_1["default"]('discussions') + " - " + tEditTitle : i18n_1["default"]('discussions');
            }
            tEditTitle = tEditTitle ? tEditTitle + "\n" : "";
            var tEditSummary = !tMostRecentEntry.unparsedComment ? "" : "\n" + i18n_1["default"]("edit-summary") + ": " + tMostRecentEntry.unparsedComment;
            Main_1["default"].addNotification(i18n_1["default"]("nchanges", tNumNewChanges) + " - " + tMostRecentEntry.wikiInfo.sitename + (tNumNewChangesWiki != tNumNewChanges ? " (" + tNumNewChangesWiki + ")" : ""), {
                body: tEditTitle + Utils_1["default"].ucfirst(i18n_1["default"]("myhome-feed-edited-by", tMostRecentEntry.author)) + tEditSummary
            });
        }
        tMostRecentEntry = null;
    };
    // Add a single change at a time, with a timeout before the next one to prevents script from locking up browser.
    RCMManager.prototype.rcmChunk = function (pIndex, pLastDay, pLastMonth, pContainer, pID) {
        var _this = this;
        if (pID != this.ajaxID) {
            return;
        } // If the script is refreshed (by auto refresh) while entries are adding, stop adding old entries.
        if (this.newRecentChangesEntries.length == 0) {
            this.finishScript();
            return;
        }
        var date = this.newRecentChangesEntries[pIndex].date, tAddToTopOfExistingContainer = false;
        // Add new date grouping if necessary.
        if (Utils_1["default"].getDate(date) != pLastDay || Utils_1["default"].getMonth(date) != pLastMonth) {
            pLastDay = Utils_1["default"].getDate(date);
            pLastMonth = Utils_1["default"].getMonth(date);
            var tTimestamp = Utils_1["default"].formatWikiTimeStamp(date, false);
            var tNewContainer = void 0;
            // Re-use existing container if there is one
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
                        // Utils.prependChild(tNewContainer, this.resultsNode);
                        Utils_1["default"].prependChild(tNewHeading, this.resultsNode);
                        Utils_1["default"].insertAfter(tNewContainer, tNewHeading);
                        // this.resultsNode.insertBefore(tNewContainer, this.resultsNode.firstChild);
                        // this.resultsNode.insertBefore(tNewHeading, this.resultsNode.firstChild);
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
        // // Show at what point new changes start at.
        // if(this.lastLoadDateTime != null && pIndex-1 >= 0 && date <= this.lastLoadDateTime && this.newRecentChangesEntries[pIndex-1].date > this.lastLoadDateTime) {
        // 	this.rcmNewChangesMarker = Utils.newElement("div", { className:"rcm-previouslyLoaded", innerHTML:"<strong>"+i18n('rcm-previouslyloaded')+"</strong>" }, pContainer);
        // }
        // Add to page
        if (this.rcmNewChangesMarker) {
            if (this.newRecentChangesEntries[pIndex].htmlNode) {
                Utils_1["default"].removeElement(this.newRecentChangesEntries[pIndex].htmlNode);
            }
            var tRcNode = this.newRecentChangesEntries[pIndex].toHTML(pIndex);
            if (pContainer.innerHTML == "") {
                pContainer.appendChild(tRcNode);
            }
            else if (tAddToTopOfExistingContainer || pIndex == 0) {
                // pContainer.insertBefore(tRcNode, pContainer.firstChild); // For some odd reason this sometimes says pContainer.firstChild is not a child of pContainer
                pContainer.firstChild.parentNode.insertBefore(tRcNode, pContainer.firstChild);
            }
            else {
                // pContainer.insertBefore(tRcNode, this.rcmNewChangesMarker); // Kinda hacky but doesn't occassionally fail.
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
            // Only do a timeout every few changes (timeout to prevent browser potentially locking up, only every few to prevent it taking longer than necessary)
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
    // // Add a single change at a time, with a timeout before the next one to prevents script from locking up browser.
    // rcmChunkOld(pIndex:number, pLastDay:number, pLastMonth:number, pContainer:HTMLElement, pID:number) : void {
    // 	if(pID != this.ajaxID) { return; } // If the script is refreshed (by auto refresh) while entries are adding, stop adding old entries.
    //
    // 	if(this.recentChangesEntries.length == 0) { this.finishScript(); return; }
    //
    // 	var date = this.recentChangesEntries[pIndex].date;
    // 	// Add new date grouping if necessary.
    // 	if(Utils.getDate(date) != pLastDay || Utils.getMonth(date) != pLastMonth) {
    // 		pLastDay = Utils.getDate(date);
    // 		pLastMonth = Utils.getMonth(date);
    // 		Utils.newElement("h4", { innerHTML:Utils.formatWikiTimeStamp(date, false) }, this.resultsNode);
    //
    // 		pContainer = this.rcParams.hideenhanced==false ? Utils.newElement("div", {  }, this.resultsNode) : Utils.newElement("ul", { className:"special" }, this.resultsNode);
    // 	}
    // 	// Show at what point new changes start at.
    // 	if(this.lastLoadDateTime != null && pIndex-1 >= 0 && date <= this.lastLoadDateTime && this.recentChangesEntries[pIndex-1].date > this.lastLoadDateTime) {
    // 		this.rcmNewChangesMarker = Utils.newElement("div", { className:"rcm-previouslyLoaded", innerHTML:"<strong>"+i18n('rcm-previouslyloaded')+"</strong>" }, pContainer);
    // 	}
    //
    // 	// Add to page
    // 	pContainer.appendChild(this.recentChangesEntries[pIndex].toHTML(pIndex));
    // 	this.itemsAdded += this.recentChangesEntries[pIndex].list.length;
    //
    // 	if(++pIndex < this.recentChangesEntries.length) {
    // 		document.querySelector(this.modID+" .rcm-content-loading-num").innerHTML = this.itemsAdded.toString();
    // 		// Only do a timeout every few changes (timeout to prevent browser potentially locking up, only every few to prevent it taking longer than necessary)
    // 		if(pIndex%5 == 0) {
    // 			setTimeout(() => { this.rcmChunk(pIndex, pLastDay, pLastMonth, pContainer, pID); });
    // 		} else {
    // 			this.rcmChunk(pIndex, pLastDay, pLastMonth, pContainer, pID);
    // 		}
    // 	}
    // 	else { this.finishScript(); }
    // };
    RCMManager.prototype.finishScript = function () {
        Utils_1["default"].removeElement(document.querySelector(this.modID + " .rcm-content-loading"));
        this.addRefreshButtonTo(this.statusNode);
        this.addAutoRefreshInputTo(this.statusNode);
        // If auto-refresh is on and window doesn't have focus, then don't update the position of "previously loaded" message.
        if (this.lastLoadDateTime == null || !this.isAutoRefreshEnabled() || document.hasFocus()) {
            this.lastLoadDateTime = this.recentChangesEntries.length > 0 ? this.recentChangesEntries[0].date : null; //new Date();
        }
        this.lastLoadDateTimeActual = this.recentChangesEntries.length > 0 ? this.recentChangesEntries[0].date : null; //new Date();
        // Removing this all remove event handlers
        // for (var i = 0; i < this.recentChangesEntries.length; i++) {
        // 	this.recentChangesEntries[i].dispose();
        // 	this.recentChangesEntries[i] = null;
        // }
        // this.recentChangesEntries = null;
        this.startAutoRefresh();
        //$( "#rc-content-multiple .mw-collapsible" ).each(function(){ $(this).makeCollapsible(); });
        (window.ajaxCallAgain || []).forEach(function (cb) { cb(); });
        // Secondary info
        if (this.extraLoadingEnabled) {
            // Check here instead of adding as they come up to condense calls.
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
        var tUrl = this.secondaryWikiData[0].url;
        var tCallback = this.secondaryWikiData[0].callback;
        var tDataType = this.secondaryWikiData[0].dataType || "jsonp";
        this.secondaryWikiData.splice(0, 1);
        $.ajax({
            type: 'GET',
            dataType: tDataType,
            data: {},
            url: tUrl,
            success: function () {
                var pArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    pArgs[_i] = arguments[_i];
                }
                if (pID != _this.ajaxID) {
                    return;
                }
                tCallback.apply(_this, pArgs);
            },
        });
        setTimeout(function () { _this._loadExtraInfo(pID); }, ConstantsApp_1["default"].loadDelay);
    };
    /***************************
    * Specific Helper Methods
    ***************************/
    RCMManager.prototype.addRefreshButtonTo = function (pParent) {
        var self = this;
        pParent.appendChild(document.createTextNode(" "));
        Utils_1["default"].newElement("button", { innerHTML: i18n_1["default"]('rcm-refresh') }, pParent).addEventListener("click", function tHandler(e) {
            e.target.removeEventListener("click", tHandler);
            self.refresh();
        });
    };
    ;
    RCMManager.prototype.addAutoRefreshInputTo = function (pParent) {
        var self = this;
        pParent.appendChild(document.createTextNode(" "));
        var autoRefresh = Utils_1["default"].newElement("span", { className: "rcm-autoRefresh" }, pParent);
        Utils_1["default"].newElement("label", { htmlFor: "rcm-autoRefresh-checkbox", innerHTML: i18n_1["default"]('rcm-autorefresh'), title: i18n_1["default"]('rcm-autorefresh-tooltip', Math.floor(self.autoRefreshTimeoutNum / 1000)) }, autoRefresh);
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
    // take a "&" seperated list of RC params, and returns a Object with settings.
    // NOTE: Script does not currently support: "from" and "namespace" related fields (like invert)
    RCMManager.prototype.parseRCParams = function (pData, pExplodeOn, pSplitOn) {
        var tRcParams = {};
        var paramStringArray = [];
        if (!pData) {
            return tRcParams;
        }
        var tRcParamsRawData = pData.split(pExplodeOn);
        var tRcParamsDataSplit; // Split of raw data
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
                // else if(tRcParamsDataSplit[0] == "from" && tRcParamsDataSplit[1]) {
                // 	tRcParams["from"] = tRcParamsDataSplit[1];
                // }
                // Check all the true / false ones
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
    // Static Constants
    RCMManager.LOADING_ERROR_RETRY_NUM_INC = 5;
    return RCMManager;
}());
exports["default"] = RCMManager;

},{"./ConstantsApp":1,"./Main":2,"./RCData":3,"./RCList":4,"./RCMModal":6,"./RCMOptions":7,"./RCMWikiPanel":8,"./RCMWikiaDiscussionData":9,"./RC_TYPE":10,"./Utils":12,"./WikiData":13,"./i18n":14}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var i18n_1 = require("./i18n");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Modal Manager ####
// This is a STATIC class. This is a helper class for using Wikia modals, as RCM has some specific requirements.
//######################################
var RCMModal = /** @class */ (function () {
    function RCMModal() {
    }
    // pData = { title:String, content:String, rcm_buttons:Array<{ value:String, event:String, callback:Event->Void, closeOnClick:Boolean=true }>, rcm_onModalShown:Void->Void, vars:Object }
    // 'vars' is same as `wikia.ui.factory` modal.
    RCMModal.showModal = function (pData) {
        // Re-open modal so that it gets re-positioned based on new content size.
        RCMModal.closeModal();
        // Prepare content for modal
        var tModalDataOptions = { type: "default", vars: $.extend({
                id: RCMModal.MODAL_ID,
                title: pData.title,
                content: '<div id="' + RCMModal.MODAL_CONTENT_ID + '">' + pData.content + '</div>',
                size: 'auto',
                buttons: [],
            }, pData.vars) };
        var tModalData = tModalDataOptions.vars;
        tModalData.buttons.unshift({ vars: {
                value: i18n_1["default"]('flags-edit-modal-close-button-text'),
                data: { key: "event", value: "close_button" },
            } });
        if (pData.rcm_buttons) {
            pData.rcm_buttons.forEach(function (o, i, a) {
                tModalData.buttons.push({ vars: {
                        value: o.value,
                        classes: ['normal', 'primary'],
                        data: { key: "event", value: o.event },
                    } });
            });
        }
        RCMModal.createModalComponent(tModalDataOptions, function (modal) {
            // cancel - user clicked 'Cancel'
            modal.bind("close_button", function (e) { modal.trigger("close"); });
            if (pData.rcm_buttons) {
                pData.rcm_buttons.forEach(function (o, i, a) {
                    if (o.event && o.callback) {
                        modal.bind(o.event, function (e) {
                            o.callback(e);
                            if (o.closeOnClick !== false) {
                                modal.trigger("close");
                            }
                        });
                    }
                });
            }
            // show modal
            modal.show();
            if (pData.rcm_onModalShown) {
                // setTimeout(pData.rcm_onModalShown, 100);
                pData.rcm_onModalShown();
            }
        });
    };
    RCMModal.createModalComponent = function (pData, pCallback) {
        if (RCMModal.modalFactory) {
            RCMModal.createModalComponentWithExistingFactory(pData, pCallback);
        }
        else {
            window.require(['wikia.ui.factory'], function (ui) {
                ui.init(['modal']).then(function (modal) {
                    RCMModal.modalFactory = modal;
                    RCMModal.createModalComponentWithExistingFactory(pData, pCallback);
                });
            });
        }
    };
    RCMModal.createModalComponentWithExistingFactory = function (pData, pCallback) {
        RCMModal.modalFactory.createComponent(pData, function (obj) {
            RCMModal.modal = obj;
            obj.bind("close", function (e) { RCMModal.modal = null; });
            pCallback(obj);
        });
    };
    // Give same title and buttons as showModal()
    RCMModal.showLoadingModal = function (pData, pOnModalShown) {
        // While we are waiting for results, open diff window to acknowledge user's input
        if (!RCMModal.isModalOpen()) {
            pData.content = "<div style='text-align:center; padding:10px;'>" + ConstantsApp_1["default"].getLoaderLarge() + "</div>";
            pData.rcm_onModalShown = pOnModalShown;
            RCMModal.showModal(pData);
        }
    };
    RCMModal.setModalContent = function (pHTML) {
        document.querySelector("#" + RCMModal.MODAL_CONTENT_ID).innerHTML = pHTML;
    };
    RCMModal.isModalOpen = function () {
        return !!RCMModal.modal;
    };
    RCMModal.closeModal = function () {
        if (RCMModal.isModalOpen()) {
            RCMModal.modal.trigger("close");
        }
    };
    RCMModal.MODAL_ID = "rcm-modal";
    RCMModal.MODAL_CONTENT_ID = "rcm-modal-content";
    RCMModal.modalFactory = null;
    RCMModal.modal = null;
    return RCMModal;
}());
exports["default"] = RCMModal;

},{"./ConstantsApp":1,"./i18n":14}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Run-time Options ####
// * Custom version of RC "options" section, using url params to keep track of options.
//######################################
var RCMOptions = /** @class */ (function () {
    // Constructor
    function RCMOptions(pManager) {
        this.manager = pManager;
        this.localStorageID = ConstantsApp_1["default"].OPTIONS_SETTINGS_LOCAL_STORAGE_ID + "-" + pManager.modID.replace(".", "");
    }
    RCMOptions.prototype.dispose = function () {
        this.removeEventListeners();
        this.manager = null;
        this.root = null;
        this.rcParams = null;
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
        this.root = pElem;
        var tSave = this.getSave();
        this.rcParams = tSave.options || {}; //$.extend({}, this.manager.rcParamsBase);
        this.manager.rcParams = $.extend(this.manager.rcParams, this.rcParams);
        this.discussionsEnabled = tSave.discussionsEnabled;
        if (this.discussionsEnabled != null) {
            this.manager.discussionsEnabled = this.discussionsEnabled;
        }
        this._addElements();
        return this;
    };
    RCMOptions.prototype._addElements = function () {
        var tFieldset = Utils_1["default"].newElement("fieldset", { className: "rcoptions collapsible" }, this.root);
        Utils_1["default"].newElement("legend", { innerHTML: i18n_1["default"]('recentchanges-legend') }, tFieldset);
        var tContent = Utils_1["default"].newElement("div", { className: "rc-fieldset-content" }, tFieldset);
        /***************************
         * RCMOptions settings
         ***************************/
        var tSettingsPanel = Utils_1["default"].newElement("aside", { className: "rcm-options-settings" }, tContent);
        tSettingsPanel.innerHTML = ConstantsApp_1["default"].getSymbol("rcm-settings-gear", 19);
        tSettingsPanel.querySelector("svg").style.cssText = "vertical-align: top;";
        var tSettingsPanelContent = Utils_1["default"].newElement("div", { className: "rcm-options-settings-cont" }, tSettingsPanel);
        this.settingsSaveCookieCheckbox = this._createNewSettingsOption(i18n_1["default"]('rcm-optionspanel-savewithcookie'), this.isSaveEnabled(), tSettingsPanelContent);
        this.settingsShowDiscussionsCheckbox = this._createNewSettingsOption(i18n_1["default"]('discussions'), this.manager.discussionsEnabled, tSettingsPanelContent);
        /***************************
         * First line of choices (numbers)
         ***************************/
        var tRow1Text = i18n_1["default"]('rclinks').split("<br />")[0].split("$3")[0].split(/\$1|\$2/);
        var tRow1 = Utils_1["default"].newElement("div", {}, tContent);
        Utils_1["default"].addTextTo(tRow1Text[0], tRow1);
        this.limitField = Utils_1["default"].newElement("select", {}, tRow1);
        Utils_1["default"].addTextTo(tRow1Text[1], tRow1);
        this.daysField = Utils_1["default"].newElement("select", {}, tRow1);
        Utils_1["default"].addTextTo(tRow1Text[2] || "", tRow1);
        /***************************
         * Second line of choices (checkboxes)
         ***************************/
        var tRow2 = Utils_1["default"].newElement("div", {}, tContent);
        var t1Text = ""; //i18n('show');
        this.minorEditsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideminor', t1Text), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.botsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhidebots', t1Text), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.anonsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideanons', t1Text), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.usersCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideliu', t1Text), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.myEditsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhidemine', t1Text), tRow2);
        if (ConstantsApp_1["default"].username && this.manager.hideusers.indexOf(ConstantsApp_1["default"].username) != -1) {
            this.myEditsCheckbox.disabled = true;
            this.myEditsCheckbox.checked = false;
            this.myEditsCheckbox.title = i18n_1["default"]('rcm-optionspanel-hideusersoverride');
        }
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.groupedChangesCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhideenhanced', t1Text), tRow2);
        Utils_1["default"].addTextTo(" | ", tRow2);
        this.logsCheckbox = this._newCheckbox(i18n_1["default"]('rcshowhidelogs', t1Text), tRow2);
        /***************************
         * Finish - make this work!
         ***************************/
        this.addEventListeners();
        this.refresh();
        return this;
    };
    RCMOptions.prototype._newCheckbox = function (pText, pParent) {
        var tLabel = Utils_1["default"].newElement("label", null, pParent);
        var tCheckbox = Utils_1["default"].newElement("input", { type: "checkbox" }, tLabel);
        Utils_1["default"].addTextTo(pText, tLabel);
        return tCheckbox;
    };
    RCMOptions.prototype._createNewSettingsOption = function (pText, pChecked, pParent) {
        var tCheckbox = this._newCheckbox(pText, pParent);
        tCheckbox.checked = pChecked;
        return tCheckbox;
    };
    // Add / set the values of the fields.
    RCMOptions.prototype.refresh = function () {
        /***************************
         * Limit - max changes returned
         ***************************/
        this.limitField.innerHTML = "";
        var tLimit = this.manager.rcParams.limit;
        var tLimitValues = [25, 50, 75, 100, 200, 350, 500];
        // If rcParam value is unique, add it to list
        if (tLimitValues.indexOf(tLimit) == -1) {
            tLimitValues.push(tLimit);
            tLimitValues.sort(function (a, b) { return a - b; });
        }
        for (var i = 0; i < tLimitValues.length; i++) {
            Utils_1["default"].newElement("option", { value: tLimitValues[i], innerHTML: tLimitValues[i], selected: (tLimit == tLimitValues[i] ? "selected" : undefined) }, this.limitField);
        }
        /***************************
         * Days - max changes returned up to _ days before
         ***************************/
        this.daysField.innerHTML = "";
        var tDays = this.manager.rcParams.days;
        var tDayValues = [1, 3, 7, 14, 30];
        // If rcParam value is unique, add it to list
        if (tDayValues.indexOf(tDays) == -1) {
            tDayValues.push(tDays);
            tDayValues.sort(function (a, b) { return a - b; });
        }
        for (var i = 0; i < tDayValues.length; i++) {
            Utils_1["default"].newElement("option", { value: tDayValues[i], innerHTML: tDayValues[i], selected: (tDays == tDayValues[i] ? "selected" : undefined) }, this.daysField);
        }
        /***************************
         * Checkboxes
         ***************************/
        this.minorEditsCheckbox.checked = !this.manager.rcParams.hideminor;
        this.botsCheckbox.checked = !this.manager.rcParams.hidebots;
        this.anonsCheckbox.checked = !this.manager.rcParams.hideanons;
        this.usersCheckbox.checked = !this.manager.rcParams.hideliu;
        this.myEditsCheckbox.checked = !this.manager.rcParams.hidemyself;
        this.groupedChangesCheckbox.checked = !this.manager.rcParams.hideenhanced;
        this.logsCheckbox.checked = !this.manager.rcParams.hidelogs;
    };
    RCMOptions.prototype.addEventListeners = function () {
        this.settingsSaveCookieCheckbox.addEventListener("change", this._onChange_settingsSaveCookie.bind(this));
        this.settingsShowDiscussionsCheckbox.addEventListener("change", this._onChange_settingsShowDiscussions.bind(this));
        this.limitField.addEventListener("change", this._onChange_limit.bind(this));
        this.daysField.addEventListener("change", this._onChange_days.bind(this));
        this.minorEditsCheckbox.addEventListener("change", this._onChange_hideminor.bind(this));
        this.botsCheckbox.addEventListener("change", this._onChange_hidebots.bind(this));
        this.anonsCheckbox.addEventListener("change", this._onChange_hideanons.bind(this));
        this.usersCheckbox.addEventListener("change", this._onChange_hideliu.bind(this));
        this.myEditsCheckbox.addEventListener("change", this._onChange_hidemyself.bind(this));
        this.groupedChangesCheckbox.addEventListener("change", this._onChange_hideenhanced.bind(this));
        this.logsCheckbox.addEventListener("change", this._onChange_hidelogs.bind(this));
    };
    RCMOptions.prototype.removeEventListeners = function () {
        this.settingsSaveCookieCheckbox.removeEventListener("change", this._onChange_settingsSaveCookie.bind(this));
        this.settingsShowDiscussionsCheckbox.removeEventListener("change", this._onChange_settingsShowDiscussions.bind(this));
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
    /***************************
     * Events
     ***************************/
    RCMOptions.prototype._onChange_limit = function (pEvent) {
        this.afterChangeNumber("limit", parseInt(pEvent.target.value));
    };
    RCMOptions.prototype._onChange_days = function (pEvent) {
        this.afterChangeNumber("days", parseInt(pEvent.target.value));
    };
    RCMOptions.prototype._onChange_hideminor = function (pEvent) {
        this.afterChangeBoolean("hideminor", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_hidebots = function (pEvent) {
        this.afterChangeBoolean("hidebots", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_hideanons = function (pEvent) {
        // Both "hideanons" and "hideliu" cannot be true
        if (pEvent.target.checked == false && this.usersCheckbox.checked == false) {
            this.manager.rcParams["hideliu"] = false;
            this.usersCheckbox.checked = true;
        }
        this.afterChangeBoolean("hideanons", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_hideliu = function (pEvent) {
        // Both "hideanons" and "hideliu" cannot be true
        if (pEvent.target.checked == false && this.anonsCheckbox.checked == false) {
            this.manager.rcParams["hideanons"] = false;
            this.anonsCheckbox.checked = true;
        }
        this.afterChangeBoolean("hideliu", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_hidemyself = function (pEvent) {
        this.afterChangeBoolean("hidemyself", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_hideenhanced = function (pEvent) {
        this.afterChangeBoolean("hideenhanced", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_hidelogs = function (pEvent) {
        this.afterChangeBoolean("hidelogs", !pEvent.target.checked);
    };
    RCMOptions.prototype._onChange_settingsSaveCookie = function (pEvent) {
        if (pEvent.target.checked) {
            this.save();
        }
        else {
            localStorage.removeItem(this.localStorageID);
        }
    };
    RCMOptions.prototype._onChange_settingsShowDiscussions = function (pEvent) {
        this.discussionsEnabled = pEvent.target.checked;
        this.manager.discussionsEnabled = pEvent.target.checked;
        this.manager.hardRefresh(true);
        this.save();
    };
    /***************************
     * Helper Methods
     ***************************/
    // Will add / edit the url param & script value with details entered.
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
            localStorage.setItem(this.localStorageID, JSON.stringify({ options: this.rcParams, discussionsEnabled: this.discussionsEnabled }));
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

},{"./ConstantsApp":1,"./Utils":12,"./i18n":14}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Wiki Panel ####
// * Show the current loaded wikis, as well as any information pertaining to them.s
//######################################
var RCMWikiPanel = /** @class */ (function () {
    // Constructor
    function RCMWikiPanel(pManager) {
        this.manager = pManager;
        this.singleWiki = this.manager.chosenWikis.length == 1;
        this.count = 0;
    }
    RCMWikiPanel.prototype.dispose = function () {
        this.manager = null;
        this.root = null;
        this.listNode = null;
        this.infoNode = null;
    };
    // Should only be called once.
    RCMWikiPanel.prototype.init = function (pElem) {
        this.root = pElem;
        if (!this.singleWiki)
            this.listNode = Utils_1["default"].newElement("span", { className: "rcm-wikis-list" }, this.root);
        this.infoNode = Utils_1["default"].newElement("div", { className: "rcm-wikis-info" }, this.root);
        return this;
    };
    // Clear panel (on refresh).
    RCMWikiPanel.prototype.populate = function () {
        if (!this.singleWiki) {
            this.listNode.innerHTML = i18n_1["default"]('rcm-wikisloaded');
        }
    };
    // Clear panel (on refresh).
    RCMWikiPanel.prototype.clear = function () {
        if (!this.singleWiki) {
            this.listNode.innerHTML = "";
            this.infoNode.innerHTML = "";
        }
        this.count = 0;
    };
    // Clear panel (on refresh).
    RCMWikiPanel.prototype.addWiki = function (pWikiInfo) {
        var _this = this;
        if (this.singleWiki) {
            if (!this.infoNode.innerHTML)
                this.onIconClick(pWikiInfo, null);
        }
        else {
            if (this.count > 0) {
                Utils_1["default"].addTextTo(":", this.listNode);
            }
            var favicon = Utils_1["default"].newElement("span", { id: pWikiInfo.infoID, className: "favicon", innerHTML: pWikiInfo.getFaviconHTML() }, this.listNode);
            favicon.addEventListener("click", function (e) { _this.onIconClick(pWikiInfo, e); });
        }
        this.count++;
    };
    RCMWikiPanel.prototype.onIconClick = function (pWikiInfo, e) {
        var infoBanner = this.infoNode.querySelector(".banner-notification");
        // If already open for that wiki, then close it.
        if (infoBanner && infoBanner.dataset.wiki == pWikiInfo.servername && /*Not called via click()*/ e && (e.screenX != 0 && e.screenY != 0)) {
            this.closeInfo();
        }
        else {
            // Front page|Site name - RecentChanges - New pages – New files – Logs – Insights
            this.infoNode.innerHTML = "" +
                ("<div class='banner-notification warn' data-wiki='" + pWikiInfo.servername + "'>")
                + (this.singleWiki ? "" : "<button class='close wikia-chiclet-button'><img></button>")
                + "<div class='msg'>"
                + "<table class='rcm-wiki-infotable'>"
                + "<tr>"
                + "<td rowspan='2' class='rcm-title-cell'>"
                + pWikiInfo.getFaviconHTML()
                + " "
                + "<b><a href='" + pWikiInfo.articlepath + Utils_1["default"].escapeCharactersLink(pWikiInfo.mainpage) + "'>" + pWikiInfo.sitename + "</a></b>"
                + " : "
                + "</td>"
                + "<td>"
                + "<a href='" + pWikiInfo.articlepath + "Special:RecentChanges" + pWikiInfo.firstSeperator + pWikiInfo.rcParams.paramString + "'>" + i18n_1["default"]("recentchanges") + "</a>"
                + " - "
                + "<a href='" + pWikiInfo.articlepath + "Special:NewPages'>" + i18n_1["default"]("newpages") + "</a>"
                + " - "
                + "<a href='" + pWikiInfo.articlepath + "Special:NewFiles'>" + i18n_1["default"]("newimages") + "</a>"
                + " - "
                + "<a href='" + pWikiInfo.articlepath + "Special:Log'>" + i18n_1["default"]("log") + "</a>"
                + (pWikiInfo.isWikiaWiki ? " - <a href='" + pWikiInfo.articlepath + "Special:Insights'>" + i18n_1["default"]("insights") + "</a>" : "")
                + (pWikiInfo.isWikiaWiki && pWikiInfo.user.rights.analytics ? " - <a href='" + pWikiInfo.articlepath + "Special:Analytics'>" + i18n_1["default"]("admindashboard-control-analytics-label") + "</a>" : "")
                + " - "
                + "<a href='" + pWikiInfo.articlepath + "Special:Random'>" + i18n_1["default"]("randompage") + "</a>"
                + (pWikiInfo.usesWikiaDiscussions ? " - <a href='" + pWikiInfo.scriptpath + "/d'>" + i18n_1["default"]("discussions") + "</a>" : "")
                + "</td>"
                + "</tr>"
                // Now for the statistics
                + "<tr>"
                + "<td>"
                + "<table class='wikitable center statisticstable' style='margin: 0;'>"
                + "<tr>"
                + "<td><a href='" + pWikiInfo.articlepath + "Special:AllPages'>" + i18n_1["default"]("awc-metrics-articles") + "</a>: <b>" + pWikiInfo.statistics.articles + "</b></td>"
                + "<td><a href='" + pWikiInfo.articlepath + "Special:ListFiles'>" + i18n_1["default"]("prefs-files") + "</a>: <b>" + pWikiInfo.statistics.images + "</b></td>"
                + "<td><a href='" + pWikiInfo.articlepath + "Special:ListUsers'>" + i18n_1["default"]("group-user") + "</a>: <b>" + pWikiInfo.statistics.activeusers + "</b></td>"
                + "<td><a href='" + pWikiInfo.articlepath + "Special:ListAdmins'>" + i18n_1["default"]("group-sysop") + "</a>: <b>" + pWikiInfo.statistics.admins + "</b></td>"
                + "<td><a href='" + pWikiInfo.articlepath + "Special:Statistics'>" + i18n_1["default"]("awc-metrics-edits") + "</a>: <b>" + pWikiInfo.statistics.edits + "</b></td>"
                + "</tr>"
                + "</table>"
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</div>";
            +"</div>";
            if (!this.singleWiki) {
                this.infoNode.querySelector(".banner-notification .close").addEventListener("click", this.closeInfo.bind(this));
            }
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
                var tScrollOffset = ConstantsApp_1["default"].config.skin == "oasis" ? -46 : 0;
                // $('html, body').animate({ scrollTop: $(btn).offset().top }, 0);
                $('html, body').scrollTop($(btn).offset().top + tScrollOffset - 6);
            }
            btn.click();
        }
    };
    return RCMWikiPanel;
}());
exports["default"] = RCMWikiPanel;

},{"./ConstantsApp":1,"./Utils":12,"./i18n":14}],9:[function(require,module,exports){
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
var ConstantsApp_1 = require("./ConstantsApp");
var RCData_1 = require("./RCData");
var Utils_1 = require("./Utils");
var i18n_1 = require("./i18n");
var RC_TYPE_1 = require("./RC_TYPE");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Recent Change Data ####
// * A data object to keep track of RecentChanges data in an organized way, as well as also having convenience methods.
// * These should only ever be used in RCList.
//######################################
var RCMWikiaDiscussionData = /** @class */ (function (_super) {
    __extends(RCMWikiaDiscussionData, _super);
    // Constructor
    function RCMWikiaDiscussionData(pWikiInfo, pManager) {
        return _super.call(this, pWikiInfo, pManager) || this;
    }
    /*override*/ RCMWikiaDiscussionData.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    /*override*/ RCMWikiaDiscussionData.prototype.init = function (pData) {
        this.type = RC_TYPE_1["default"].DISCUSSION;
        this.date = new Date(0); /*Epoch*/
        this.date.setUTCSeconds((pData.modificationDate || pData.creationDate).epochSecond);
        this.userEdited = true; // Currently anons cannot edit
        this.author = pData.createdBy.name;
        this.userhidden = false; //pData.userhidden == "";
        this.title = pData.title; //Utils.escapeCharacters( pData.title.split("/@comment")[0] );
        this.namespace = -5234; // Has no namespace. This should probably be unique
        // this.logtype = pData.logtype;
        // this.logaction = pData.logaction;
        // this.newlen = pData.newlen;
        // this.oldlen = pData.oldlen;
        this.summary = pData.rawContent;
        if (this.summary.length > 175) {
            this.summary = this.summary.slice(0, 175) + "...";
        }
        this.unparsedComment = this.summary;
        this.forumId = pData.forumId;
        this.threadId = pData.threadId;
        this.pageid = pData.id; //pData.pageid;
        // this.revid = pData.revid;
        // this.old_revid = pData.old_revid;
        this.isNewPage = pData.modificationDate == null; //pData["new"] == "";
        this.isBotEdit = false; //pData.bot == "";
        this.isMinorEdit = false; //pData.minor == "";
        this.isPatrolled = false; //pData.patrolled == "";
        this.titleNoNS = this.title; //(this.namespace != 0 && this.title.indexOf(":") > -1) ? this.title.split(":")[1] : this.title;
        this.uniqueID = pData.threadId; // By default; make change based on this.type.
        this.hrefTitle = Utils_1["default"].escapeCharactersLink(pData.title);
        this.threadHref = this.wikiInfo.scriptpath + "/d/p/" + this.threadId;
        this.href = this.threadHref + (pData.isReply ? "#reply-" + pData.id : "");
        this.hrefBasic = this.href;
        this.hrefFS = this.href + this.wikiInfo.firstSeperator;
        this.threadTitle = pData.title;
        // Discussion-specific
        this.user_id = pData.createdBy.id;
        this.user_avatarUrl = pData.createdBy.avatarUrl ? pData.createdBy.avatarUrl.replace("/scale-to-width-down/100", "/scale-to-width-down/15") : pData.createdBy.avatarUrl;
        this.upvoteCount = pData.upvoteCount;
        this.forumName = pData.forumName;
        this.rawContent = pData.rawContent;
        this.isLocked = pData.isLocked;
        this.isReported = pData.isReported;
        return null; // Return self for chaining or whatnot.
    };
    /*override*/ RCMWikiaDiscussionData.prototype.userDetails = function () {
        if (this.userhidden) {
            return '<span class="history-deleted">' + i18n_1["default"]("rev-deleted-user") + '</span>';
        }
        var blockText = this.wikiInfo.user.rights.block ? i18n_1["default"]("pipe-separator") + "<a href='{0}Special:Block/{1}'>" + i18n_1["default"]("blocklink") + "</a>" : "";
        // if(this.userEdited) {
        // 	return Utils.formatString("<span class='mw-usertoollinks'><a href='{0}User:{1}'>{2}</a> (<a href='{0}User_talk:{1}'>"+i18n("talkpagelinktext")+"</a>"+i18n("pipe-separator")+"<a href='{0}Special:Contributions/{1}'>"+i18n("contribslink")+"</a>"+blockText+")</span>", this.wikiInfo.articlepath, Utils.escapeCharactersLink(this.author), this.author);
        // } else {
        // 	return Utils.formatString("<span class='mw-usertoollinks'><a href='{0}Special:Contributions/{1}'>{2}</a> (<a href='{0}User_talk:{1}'>"+i18n("talkpagelinktext")+"</a>"+blockText+")</span>", this.wikiInfo.articlepath, Utils.escapeCharactersLink(this.author), this.author);
        // }
        var tUserContribsLink = this.wikiInfo.scriptpath + "/d/u/" + this.user_id;
        return Utils_1["default"].formatString(""
            + "<span class='mw-usertoollinks'>"
            + this.getAvatarImg() + "<a href='{0}User:{1}' class='" + this.wikiInfo.getUserClass(this.author) + "' " + this.wikiInfo.getUserClassDataset(this.author) + ">{2}</a>"
            + " (<a href='{0}User_talk:{1}'>" + i18n_1["default"]("talkpagelinktext") + "</a>"
            + i18n_1["default"]("pipe-separator")
            + "<a href='" + tUserContribsLink + "'>" + i18n_1["default"]("contribslink") + "</a>"
            + blockText + ")"
            + "</span>", this.wikiInfo.articlepath, Utils_1["default"].escapeCharactersLink(this.author), this.author);
    };
    RCMWikiaDiscussionData.prototype.getAvatarImg = function () {
        return this.user_avatarUrl
            ? "<span class=\"rcm-avatar\"><a href=\"" + this.wikiInfo.articlepath + "User:" + Utils_1["default"].escapeCharactersLink(this.author) + "\"><img src='" + this.user_avatarUrl + "' width=\"15\" height=\"15\" /></a> </span>"
            : "";
    };
    RCMWikiaDiscussionData.prototype.discusssionTitleText = function (pThreadTitle, pIsHead) {
        if (pIsHead === void 0) { pIsHead = false; }
        if (pThreadTitle == undefined) {
            pThreadTitle = this.getThreadTitle();
        }
        var tForumLink = "<a href=\"" + this.wikiInfo.scriptpath + "/d/f?catId=" + this.forumId + "&sort=latest\">" + this.forumName + "</a>";
        var tText = i18n_1["default"].MESSAGES["wall-recentchanges-thread-group"];
        // tText = tText.replace(/(\[\[.*\]\])/g, tForumLink);
        tText = tText.replace(/(\[\[.*\]\])/g, "RCM_DISC_BOARD"); // Don't replace with actual content right away, to avoid wiki2html being run on it
        tText = i18n_1["default"].wiki2html(tText, "<a href=\"" + (pIsHead ? this.threadHref : this.href) + "\">" + pThreadTitle + "</a>" + (pIsHead ? "" : this.getUpvoteCount()));
        tText = tText.replace("RCM_DISC_BOARD", tForumLink);
        return tText;
    };
    RCMWikiaDiscussionData.prototype.getUpvoteCount = function () {
        return "<span class=\"rcm-upvotes\"> (" + ConstantsApp_1["default"].getSymbol("rcm-upvote-tiny") + " " + this.upvoteCount + ")</span>";
    };
    RCMWikiaDiscussionData.prototype.getThreadStatusIcons = function () {
        return ""
            + (this.isLocked ? ConstantsApp_1["default"].getSymbol("rcm-lock") : "")
            + (this.isReported ? ConstantsApp_1["default"].getSymbol("rcm-report") : "");
    };
    return RCMWikiaDiscussionData;
}(RCData_1["default"]));
exports["default"] = RCMWikiaDiscussionData;

},{"./ConstantsApp":1,"./RCData":3,"./RC_TYPE":10,"./Utils":12,"./i18n":14}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Wiki Data ####
// * A data object to keep track of wiki data in an organized way, as well as also having convenience methods.
// * These should only be created once per wiki per RCMManager. No reason to re-create every refresh.
//######################################
var UserData = /** @class */ (function () {
    // Constructor
    function UserData(pWikiInfo, pManager) {
        this.manager = pManager;
    }
    UserData.prototype.dispose = function () {
        // @ts-ignore - It's read only, but we still want it deleted here
        delete this.manager;
        // @ts-ignore - It's read only, but we still want it deleted here
        delete this.wikiInfo;
        this.groups = null;
        // this.registration = null;
        this.block = null;
    };
    // Handle data retrieved from https://www.mediawiki.org/wiki/API:Users
    UserData.prototype.init = function (pData) {
        this.userid = pData.userid;
        this.name = pData.name;
        // this.editcount = pData.editcount;
        this.groups = pData.groups || [];
        Utils_1["default"].removeFromArray(this.groups, "*");
        // this.registration = new Date(pData.registration);
        if (pData.blockedby) {
            this.block = { by: pData.blockedby, reason: pData.blockreason, expiration: pData.blockexpiry };
        }
        return this; // Return self for chaining or whatnot.
    };
    // Get user CSS classes as a string.
    UserData.prototype.getClassNames = function () {
        return "rcm-usergroup-" + this.groups.join(" rcm-usergroup-") + (this.block ? " rcm-userblocked" : "");
    };
    UserData.getUsersApiUrl = function (pList, pScriptpath) {
        var tReturnText = pScriptpath + "/api.php?action=query&format=json&continue=&list=users";
        tReturnText += "&usprop=" + ["blockinfo", "groups"].join("|"); // "editcount", "registration"
        tReturnText += "&ususers=" + Utils_1["default"].escapeCharactersLink(pList.join("|").replace(/ /g, "_"));
        mw.log("[UserData](getUsersApiUrl)", tReturnText.replace("&format=json", "&format=jsonfm"));
        return tReturnText;
    };
    return UserData;
}());
exports["default"] = UserData;

},{"./Utils":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// General Helper Methods - STATIC
//######################################
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /***************************
    * Element Stuff
    ***************************/
    // Allows forEach even on nodelists
    Utils.forEach = function (collection, callback, pScope) { if (collection != undefined) {
        Array.prototype.forEach.call(collection, callback, pScope);
    } };
    // Creates a new HTML element (not jQuery) with specific attributes
    Utils.newElement = function (tag, attributes, parent) {
        var element = document.createElement(tag);
        if (attributes != undefined) {
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
        // if (pRef.nextSibling) {
        // 	return <HTMLElement>pRef.parentNode.insertBefore(pNewNode, pRef.nextSibling);
        // } else {
        // 	return <HTMLElement>pRef.parentNode.appendChild(pNewNode);
        // }
    };
    Utils.prependChild = function (pNewNode, pRef) {
        return (pRef.firstChild ? pRef.insertBefore(pNewNode, pRef.firstChild) : pRef.appendChild(pNewNode));
        // if(pRef.firstChild) {
        // 	return <HTMLElement>pRef.insertBefore(pNewNode, pRef.firstChild);
        // } else {
        // 	return <HTMLElement>pRef.appendChild(pNewNode);
        // }
    };
    /***************************
    * Date Methods
    ***************************/
    Utils.getSeconds = function (pDate) { return ConstantsApp_1["default"].timezone == "utc" ? pDate.getUTCSeconds() : pDate.getSeconds(); };
    Utils.getMinutes = function (pDate) { return ConstantsApp_1["default"].timezone == "utc" ? pDate.getUTCMinutes() : pDate.getMinutes(); };
    Utils.getHours = function (pDate) { return ConstantsApp_1["default"].timezone == "utc" ? pDate.getUTCHours() : pDate.getHours(); };
    Utils.getDate = function (pDate) { return ConstantsApp_1["default"].timezone == "utc" ? pDate.getUTCDate() : pDate.getDate(); };
    Utils.getMonth = function (pDate) { return ConstantsApp_1["default"].timezone == "utc" ? pDate.getUTCMonth() : pDate.getMonth(); };
    Utils.getYear = function (pDate) { return ConstantsApp_1["default"].timezone == "utc" ? pDate.getUTCFullYear() : pDate.getFullYear(); };
    Utils.formatWikiTimeStamp = function (pDate, pShowTime) {
        if (pShowTime === void 0) { pShowTime = true; }
        var tDateString = Utils.formatWikiTimeStampDateOnly(pDate), tTime = pShowTime ? Utils.formatWikiTimeStampTimeOnly(pDate) : "";
        if (ConstantsApp_1["default"].userOptions.date != "ISO 8601") {
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
        var tYear = Utils.getYear(pDate), tMonth = Utils.getMonth(pDate) + 1, tMonthName = ConstantsApp_1["default"].config.wgMonthNames[tMonth], tDay = Utils.getDate(pDate);
        switch (ConstantsApp_1["default"].userOptions.date) {
            case "mdy":
            default: return tMonthName + " " + tDay + ", " + tYear;
            case "dmy": return tDay + " " + tMonthName + " " + tYear;
            case "ymd": return tYear + " " + tMonthName + " " + tDay;
            case "ISO 8601": return tYear + "-" + Utils.pad(tMonth, 2, 0) + "-" + Utils.pad(tDay, 2, 0);
        }
    };
    Utils.formatWikiTimeStampTimeOnly = function (pDate, pNoSeconds) {
        if (pNoSeconds === void 0) { pNoSeconds = false; }
        var tHours = Utils.getHours(pDate), tMinutes = Utils.getMinutes(pDate), tSeconds = Utils.getSeconds(pDate), tSuffix = "", tTime;
        if (ConstantsApp_1["default"].timeFormat == "12") {
            tSuffix = tHours >= 12 ? "PM" : "AM";
            tHours = ((tHours + 11) % 12 + 1);
        }
        tTime = Utils.pad(tHours, 2) + ":" + Utils.pad(tMinutes, 2);
        if (!pNoSeconds && ConstantsApp_1["default"].userOptions.date == "ISO 8601") {
            tTime += ":" + Utils.pad(tSeconds, 2);
        }
        tTime += tSuffix;
        return tTime;
    };
    // Convert from MediaWiki time format to one Date object like.
    Utils.getTimestampForYYYYMMDDhhmmSS = function (pNum) {
        pNum = "" + pNum;
        var i = 0;
        return pNum.slice(i, i += 4) + "-" + pNum.slice(i, i += 2) + "-" + pNum.slice(i, i += 2) + "T" + pNum.slice(i, i += 2) + ":" + pNum.slice(i, i += 2) + ":" + pNum.slice(i, i += 2);
        // return pNum.splice(0, 4) +"-"+ pNum.splice(0, 2) +"-"+ pNum.splice(0, 2) +"T"+ pNum.splice(0, 2) +":"+ pNum.splice(0, 2) +":"+ pNum.splice(0, 2);
    };
    /***************************
    * String Methods
    ***************************/
    // http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    Utils.pad = function (n, width, z) {
        if (z === void 0) { z = 0; }
        n = n.toString();
        return n.length >= width ? n : new Array(width - n.length + 1).join(z.toString()) + n;
    };
    // http://stackoverflow.com/a/4673436/1411473
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
    // Need to escape quote for when text is manually added to an html tag attribute.
    Utils.escapeCharacters = function (pString) {
        return pString ? pString.replace(/"/g, '&quot;').replace(/'/g, '&apos;') : pString;
    };
    Utils.escapeCharactersLink = function (pString) {
        return mw.util.wikiUrlencode(pString);
        //return pString ? pString.replace(/%/g, '%25').replace(/ /g, "_").replace(/"/g, '%22').replace(/'/g, '%27').replace(/\?/g, '%3F').replace(/\&/g, '%26').replace(/\+/g, '%2B') : pString;
    };
    // UpperCaseFirstLetter
    Utils.ucfirst = function (s) { return s && s[0].toUpperCase() + s.slice(1); };
    /***************************
    * Misc Methods
    ***************************/
    // Based on: http://stackoverflow.com/a/9229821
    // Remove duplicates
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
        return "id" + (++ConstantsApp_1["default"].uniqID);
    };
    Utils.getFirstItemFromObject = function (pData) {
        for (var tKey in pData)
            return pData[tKey];
    };
    Utils.removeFromArray = function (pArray, pData) {
        var i = pArray.indexOf(pData);
        if (i != -1) {
            return pArray.splice(i, 1)[0];
        }
        return null;
    };
    // Assumes the file has already been checked to be in namespace 6
    Utils.isFileAudio = function (pTitle) {
        var tExt = null, audioExtensions = ["oga", "ogg", "ogv"]; // Audio extensions allowed by Wikia
        for (var i = 0; i < audioExtensions.length; i++) {
            tExt = "." + audioExtensions[i];
            if (pTitle.indexOf(tExt, pTitle.length - tExt.length) !== -1) {
                return true;
            } // If title ends with extension.
        }
        return false;
    };
    // http://phpjs.org/functions/version_compare/
    // Simulate PHP version_compare
    Utils.version_compare = function (v1Arg, v2Arg, operator) {
        //       discuss at: http://phpjs.org/functions/version_compare/
        //      original by: Philippe Jausions (http://pear.php.net/user/jausions)
        //      original by: Aidan Lister (http://aidanlister.com/)
        // reimplemented by: Kankrelune (http://www.webfaktory.info/)
        //      improved by: Brett Zamir (http://brett-zamir.me)
        //      improved by: Scott Baker
        //      improved by: Theriault
        //        example 1: version_compare('8.2.5rc', '8.2.5a');
        //        returns 1: 1
        //        example 2: version_compare('8.2.50', '8.2.52', '<');
        //        returns 2: true
        //        example 3: version_compare('5.3.0-dev', '5.3.0');
        //        returns 3: -1
        //        example 4: version_compare('4.1.0.52','4.01.0.51');
        //        returns 4: 1
        var i = 0, x = 0, compare = 0, 
        // Leave as negatives so they can come before numerical versions
        vm = { 'dev': -6, 'alpha': -5, 'a': -5, 'beta': -4, 'b': -4, 'RC': -3, 'rc': -3, '#': -2, 'p': 1, 'pl': 1 }, 
        // Format version string to remove oddities.
        prepVersion = function (v) {
            v = ('' + v)
                .replace(/[_\-+]/g, '.');
            v = v.replace(/([^.\d]+)/g, '.$1.')
                .replace(/\.{2,}/g, '.');
            return (!v.length ? [-8] : v.split('.'));
        };
        // This converts a version component to a number.
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

},{"./ConstantsApp":1}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var UserData_1 = require("./UserData");
var Utils_1 = require("./Utils");
var $ = window.jQuery;
var mw = window.mediaWiki;
//######################################
// #### Wiki Data ####
// * A data object to keep track of wiki data in an organized way, as well as also having convenience methods.
// * These should only be created once per wiki per RCMManager. No reason to re-create every refresh.
//######################################
var WikiData = /** @class */ (function () {
    // Constructor
    function WikiData(pManager) {
        this.manager = pManager;
        this.notificationsEnabled = true;
        this.needsSiteinfoData = true;
        this.needsUserData = true;
        // Set rollback to true by default so as to fetch extra necessary data first time around.
        this.user = { rights: {
                block: false, undelete: false, rollback: true,
                analytics: false,
            } };
        this.isWikiaWiki = true;
        this.useOutdatedLogSystem = false;
        this.users = {};
        this.usersNeeded = [];
        // this.abuseFilterFilters		= {};
        // this.needsAbuseFilterFilters = true;
        // Initial values set in setupRcParams() due to needing "days" value.
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
    // misc todo - fix discussions not using lang code - only when scriptdir used?
    // Parses LI element data to be able to retrieve information for the respective wiki.
    WikiData.prototype.initListData = function (pNode) {
        // var tWikiDataRaw = pNode.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().split("&"); // Need to check for new lines due to how wikis create lists.
        var _a = pNode.textContent.trim().replace(/(\r\n|\n|\r)/gm, "\n").split(/[&\n]/).map(function (s) { return s.trim(); }).filter(function (s) { return !!s; }), tWikiDataRawUrl = _a[0], tWikiDataRaw = _a.slice(1); // Need to check for new lines due to how wikis create lists.
        // mw.log(tWikiDataRawUrl, tWikiDataRaw);
        // todo - remove /s form URL, and add to scriptdir; if scriptdir is UserData, add it to URL, not replace.
        // todo - but still make sure the scriptdir is used when domain is complained about in errors and such?
        // Some default values
        this.servername = tWikiDataRawUrl.replace(/^https?\:\/\//, "").replace(/(\/$)/g, "");
        this.scriptdir = "";
        this.firstSeperator = "?";
        this.htmlName = this.servername.replace(/([\.\/])/g, "-");
        this.isWikiaWiki = (this.servername.indexOf(".wikia.") > -1) || (this.servername.indexOf(".fandom.") > -1);
        this.useOutdatedLogSystem = this.isWikiaWiki;
        // todo - allow / - consequences?
        // if(this.servername.indexOf("/") > -1) {
        // 	this.manager.resultCont.innerHTML = `<div style='color:red; padding:4px 5px; background:rgba(0,0,0,0.1);'>${ i18n("rcm-error-linkformat", this.servername) }</div>`;
        // 	throw "Incorrect format";
        // }
        var tWikiDataSplit, tKey, tVal; // Split of raw data
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
                        // Add / remove slashes as needed (encase added incorrectly).
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
                            // [depreciated]
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
                        // For sanity's sake, this shouldn't actually be used (so that it's obvious what the script is assuming will be passed in).
                        this[tKey] = tVal;
                        break;
                    }
                }
            }
        }
        if (!this.username && this.isWikiaWiki && ConstantsApp_1["default"].username) {
            this.username = ConstantsApp_1["default"].username;
        }
        this.scriptpath = "//" + this.servername + this.scriptdir;
        this.infoID = "wiki-" + this.htmlName;
        this.rcClass = "rc-entry-" + this.htmlName;
        // this.setupRcParams(); // Moved to manager
        tKey = null;
        tVal = null;
        tWikiDataRaw = null;
        tWikiDataSplit = null;
        return this; // Return self for chaining or whatnot.
    };
    // If Siteinfo / user data / other 1-off fetches are needed (first pass only), the information is stored in this object
    WikiData.prototype.initAfterLoad = function (pQuery) {
        /***************************
         * Siteinfo Data
         ***************************/
        if (this.needsSiteinfoData && !!pQuery.general) {
            this.needsSiteinfoData = false;
            this.server = pQuery.general.server || ("//" + this.servername);
            this.articlepath = this.server + pQuery.general.articlepath.replace("$1", "");
            if (this.articlepath.indexOf("?") > -1) {
                this.firstSeperator = "&";
            }
            this.scriptpath = "" + this.server + pQuery.general.scriptpath; // Re-set with info directly from siteinfo
            this.sitename = pQuery.general.sitename;
            this.mainpage = pQuery.general.mainpage;
            this.mwversion = pQuery.general.generator;
            this.langCode = pQuery.general.lang;
            if (this.favicon == null) {
                // Requires MediaWiki V1.23+
                if (pQuery.general.favicon) {
                    this.favicon = pQuery.general.favicon;
                    // It SHOULD be an absoule link, but encase it isn't... (at least one case found where it wasn't)
                    if (this.favicon.indexOf("http") != 0 && this.favicon.indexOf("//") != 0) {
                        this.favicon = this.server + "/" + this.favicon;
                    }
                }
                // Should work for all Wikia wikis
                else if (!!pQuery.pages) {
                    var tPageID;
                    for (tPageID in pQuery.pages)
                        break; // A trick to get the one (and only) page entry in the object
                    if (pQuery.pages[tPageID] && pQuery.pages[tPageID].imageinfo) {
                        this.favicon = pQuery.pages[tPageID].imageinfo[0].url;
                    }
                    // for (var tPageID in pQuery.pages) {
                    // 	if(pQuery.pages[tPageID] && pQuery.pages[tPageID].ns == 6 && pQuery.pages[tPageID].title.split(":")[1] == "Favicon.ico") {
                    // 		if(pQuery.pages[tPageID].imageinfo) { this.favicon = pQuery.pages[tPageID].imageinfo[0].url; }
                    // 		break;
                    // 	}
                    // }
                }
            }
            this.namespaces = pQuery.namespaces || {};
            this.statistics = pQuery.statistics || {};
            if (!!pQuery.variables) {
                // This is only for Wikia wikis. Other wikis can ignore this.
                var wgCityIdObj = $.grep(pQuery.variables, function (o) { return o.id === "wgCityId"; })[0];
                if (wgCityIdObj) {
                    this.wikiaCityID = wgCityIdObj["*"];
                }
                else {
                    this.usesWikiaDiscussions = false;
                }
            }
        }
        /***************************
         * User Data
         ***************************/
        if (this.needsUserData && !!pQuery.users) {
            this.needsUserData = false;
            // this.user.rights.block = false;
            // this.user.rights.undelete = false;
            // this.user.rights.rollback = false;
            // for(var i in pQuery.users[0].rights) {
            // 	if(pQuery.users[0].rights[i] == "block") { this.user.rights.block = true; }
            // 	if(pQuery.users[0].rights[i] == "undelete") { this.user.rights.undelete = true; }
            // 	else if(pQuery.users[0].rights[i] == "rollback") { this.user.rights.rollback = true; }
            // }
            var tRightList = pQuery.users[0].rights;
            this.user.rights = {
                block: tRightList.indexOf("block") > -1,
                undelete: tRightList.indexOf("undelete") > -1,
                rollback: tRightList.indexOf("rollback") > -1,
                analytics: tRightList.indexOf("analytics") > -1,
            };
        }
        /***************************
         * Favicon fallback - may not be needed now with "pQuery.pages" backup.
         ***************************/
        if (this.favicon == null) {
            this.favicon = ConstantsApp_1["default"].FAVICON_BASE + this.scriptpath;
        }
        return this;
    };
    // initAbuseFilterFilters(pQuery) : this {
    // 	if(this.needsAbuseFilterFilters && !!pQuery.abusefilters){
    // 		this.needsAbuseFilterFilters = false;
    // 		this.abuseFilterFilters = {};
    // 		let tFilter;
    // 		for (let i = 0; i < pQuery.abusefilters.length; i++) {
    // 			tFilter = pQuery.abusefilters[i];
    // 			this.abuseFilterFilters[tFilter.id] = { description:tFilter.description, private:tFilter.private==="" };
    // 		}
    // 	}
    // 	return this;
    // }
    WikiData.prototype.setupRcParams = function () {
        this.rcParams = $.extend({}, this.manager.rcParamsBase); // Make a shallow copy
        if (Object.keys(this.manager.optionsNode.rcParams).length > 0) {
            this.rcParams = $.extend(this.rcParams, this.manager.optionsNode.rcParams);
        }
        if (this.rcParamsBase != null) {
            this.rcParams = $.extend(this.rcParams, this.rcParamsBase);
        }
        // if(this.rcParams == this.manager.rcParamsBase) {
        // 	this.rcParams = this.manager.rcParams; // The manager's RC params are valid if no changes more specific than it exist.
        // } else {
        this.rcParams.paramString = this.createRcParamsString(this.rcParams);
        this.rcParams = $.extend(this.manager.getDefaultRCParams(), this.rcParams);
        // }
        if (!this.lastChangeDate) {
            this.lastChangeDate = this.getEndDate();
            this.lastDiscussionDate = this.getEndDate();
        }
    };
    // Get the string for use with Special:RecentChanges link for this wiki.
    // Don't pass in params with "default" values included, or the link will have them all specified.
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
    // Since both initListData and initSiteinfo can set the wiki's favicon, set default favicon if none set
    WikiData.prototype.getFaviconHTML = function (pOpenInfoBanner) {
        if (pOpenInfoBanner === void 0) { pOpenInfoBanner = false; }
        var html = "<img src='" + this.favicon + "' title='" + this.sitename + "' width='16' height='16' />";
        if (pOpenInfoBanner) {
            html = "<span class='rcm-favicon-goto-button' data-infoid='" + this.infoID + "'>" + html + "</span>";
        }
        return html;
    };
    WikiData.prototype.getEndDate = function () {
        var tDate = new Date(); //this.rcParams.from ? new Date(this.rcParams.from) : new Date();
        tDate.setDate(tDate.getDate() - this.rcParams.days);
        return tDate;
    };
    // Get user CSS classes as a string.
    WikiData.prototype.getUserClass = function (pUser) {
        if (this.manager.extraLoadingEnabled) {
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
    // Get the correspondering dataset for user class.
    WikiData.prototype.getUserClassDataset = function (pUser) {
        return "data-username=\"" + pUser.replace(/"/g, "&quot;") + "\"";
    };
    WikiData.prototype.checkForSecondaryLoading = function () {
        var _this = this;
        var tUrl = this.getUsersApiUrl();
        if (tUrl) {
            this.manager.secondaryWikiData.push({
                url: tUrl,
                callback: function (data) {
                    data.query.users.forEach(function (user, i) {
                        var username = user.name;
                        if (user.invalid === "" || user.missing === "") {
                            Utils_1["default"].removeFromArray(_this.usersNeeded, username);
                            return;
                        }
                        // Keep track of data for future use.
                        _this.users[username] = new UserData_1["default"](_this, _this.manager).init(user);
                        Utils_1["default"].removeFromArray(_this.usersNeeded, username);
                        // Update data on the page.
                        var tNeededClass = "rcm-user-needed";
                        var tUserNodes = _this.manager.resultsNode.querySelectorAll("." + _this.rcClass + " ." + tNeededClass + "[data-username=\"" + username.replace(/"/g, '&quot;') + "\"]");
                        // loop through them and add classes
                        Utils_1["default"].forEach(tUserNodes, function (pUserNode) {
                            pUserNode.className += " " + _this.users[username].getClassNames();
                            pUserNode.classList.remove(tNeededClass);
                        });
                        // TODO: Add classes directly to anchor? or always put a wrapper and add "username" class?
                    });
                }
            });
        }
    };
    WikiData.prototype.updateLastChangeDate = function (pData) {
        if (new Date(pData.timestamp) < this.lastChangeDate) {
            return;
        }
        this.lastChangeDate = new Date(pData.timestamp);
        // Add 1 millisecond to avoid getting this change again.
        this.lastChangeDate.setSeconds(this.lastChangeDate.getSeconds() + 1);
        this.lastChangeDate.setMilliseconds(1);
        //this.lastChangeDate.setMilliseconds(this.lastChangeDate.getMilliseconds()+1001);
    };
    WikiData.prototype.updateLastDiscussionDate = function (pData) {
        var tSecond = (pData.modificationDate || pData.creationDate).epochSecond;
        this.lastDiscussionDate = new Date(0);
        // Add 1 millisecond to avoid getting this change again.
        this.lastDiscussionDate.setUTCSeconds(tSecond);
        this.lastDiscussionDate.setUTCMilliseconds(1);
    };
    // For retrieving 1-off wiki specific info (some of which is required to know before fetching changes)
    WikiData.prototype.getWikiDataApiUrl = function () {
        if (!this.needsSiteinfoData || !this.needsUserData) {
            return null;
        }
        var tReturnText = "https:" + this.scriptpath + "/api.php?action=query&format=json&continue="; // don't assume http:// or https://
        var tUrlList = [];
        var tMetaList = [];
        var tPropList = [];
        /***************************
        * Siteinfo Data - https://www.mediawiki.org/wiki/API:Siteinfo
        * Get the site info (Once per RCMManager)
        ***************************/
        tMetaList.push("siteinfo");
        tReturnText += "&siprop=" + ["general", "namespaces", "statistics", "variables"].join("|");
        /***************************
        * Imageinfo Data - https://www.mediawiki.org/wiki/API:Imageinfo
        * Get favicon url for wiki (needed for wikis below V1.23 [Added to siteinfo at that point]) (Once per RCMManager)
        ***************************/
        tPropList.push("imageinfo");
        tReturnText += "&iiprop=url&titles=File:Favicon.ico";
        /***************************
        * User Data - https://www.mediawiki.org/wiki/API:Users
        * If user logged in / set, get info for this wiki (Once per RCMManager)
        ***************************/
        if (this.username) {
            tUrlList.push("users");
            tReturnText += "&ususers=" + this.username + "&usprop=rights";
        }
        else {
            this.needsUserData = false;
        }
        /***************************
        * Finish building url
        ***************************/
        if (tUrlList.length > 0) {
            tReturnText += "&list=" + tUrlList.join("|");
        }
        if (tMetaList.length > 0) {
            tReturnText += "&meta=" + tMetaList.join("|");
        }
        if (tPropList.length > 0) {
            tReturnText += "&prop=" + tPropList.join("|");
        }
        tReturnText.replace(/ /g, "_");
        tMetaList = null;
        tPropList = null;
        mw.log("[WikiData](getWikiDataApiUrl)", tReturnText.replace("&format=json", "&format=jsonfm"));
        return tReturnText;
    };
    // Gets URL for the Wikia discussions API;
    // https://github.com/Wikia/app/blob/b03df0a89ed672697e9c130d529bf1eb25f49cda/lib/Swagger/src/Discussion/Api/PostsApi.php
    WikiData.prototype.getWikiDiscussionUrl = function () {
        // Get results up to this time stamp.
        var tEndDate = this.lastDiscussionDate; //this.getEndDate();
        var tLimit = this.rcParams.limit < 50 ? this.rcParams.limit : 50; // 50 is the limit, but fetch less if there are less.
        var tReturnText = "https://services.fandom.com/discussion/" + this.wikiaCityID + "/posts?limit=" + tLimit + "&page=0&since=" + tEndDate.toISOString() + "&responseGroup=small&reported=false&viewableOnly=" + !this.user.rights.block;
        mw.log("[WikiData](getWikiDiscussionUrl) " + this.servername + " - " + tReturnText);
        return tReturnText;
    };
    WikiData.prototype.getUsersApiUrl = function () {
        if (this.usersNeeded.length > 0) {
            return UserData_1["default"].getUsersApiUrl(this.usersNeeded, this.scriptpath);
        }
        return null;
    };
    // Returns the url to the Api, which will return the Recent Changes for the wiki (as well as Siteinfo if needed)
    // https://www.mediawiki.org/wiki/API:RecentChanges
    WikiData.prototype.getApiUrl = function () {
        var tReturnText = this.scriptpath + "/api.php?action=query&format=json&continue="; // don't assume http:// or https://
        var tUrlList = [];
        var tMetaList = [];
        var tPropList = [];
        // Get results up to this time stamp.
        var tEndDate = this.lastChangeDate; //this.getEndDate();
        /***************************
        * Recent Changes Data - https://www.mediawiki.org/wiki/API:RecentChanges
        ***************************/
        tUrlList.push("recentchanges");
        tReturnText += "&rcprop=" + WikiData.RC_PROPS; // What data to retrieve.
        // How many results to retrieve
        tReturnText += "&rclimit=" + this.rcParams.limit;
        tReturnText += "&rcend=" + tEndDate.toISOString();
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
        } // Hide users
        tReturnText += "&rcshow=" + tRcShow.join("|");
        tRcShow = null;
        var tRcType = ["edit", "new"]; // external
        if (this.rcParams.hidelogs == false) {
            tRcType.push("log");
        }
        tReturnText += "&rctype=" + tRcType.join("|");
        tRcType = null;
        // Only one user can be excluded like this (so any additional ones will still have to be done manually), but might as well take advantage of it.
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
            tReturnText += "&rcexcludeuser=" + tUser;
        }
        if (this.rcParams.namespace || this.rcParams.namespace === "0") {
            tReturnText += "&rcnamespace=" + this.rcParams.namespace; // Already separated by "|"
        }
        /***************************
        * Log Event Data - https://www.mediawiki.org/wiki/API:Logevents
        * Get info for logs that don't return all necessary info through "Recent Changes" api.
        * To avoid a second loading sequence, we load logs up to same limit / timestamp at "Recent Changes" api (since it's the best we can assume).
        ***************************/
        if (this.useOutdatedLogSystem && this.rcParams.hidelogs == false) {
            tUrlList.push("logevents");
            tReturnText += "&leprop=" + ["details", "user", "title", "timestamp", "type", "ids"].join("|");
            tReturnText += "&letype=" + ["rights", "move", "delete", "block", "merge"].join("|");
            // How many results to retrieve
            tReturnText += "&lelimit=" + this.rcParams.limit;
            tReturnText += "&leend=" + tEndDate.toISOString();
        }
        // /***************************
        // * Abuse Filter Filter List Data - https://www.mediawiki.org/wiki/Extension:AbuseFilter
        // * Each wiki has it's own list of abuse filters
        // ***************************/
        // // Checking for both rights should assure this wiki has logs the user can potentially see.
        // mw.log("[WikiData](getApiUrl) Abuse filter: ", this.rcParams.hidelogs == false , this.user.rights , this.user.rights.abusefilter_log , this.user.rights.abusefilter_view);
        // if(true/*TODO*/ && this.rcParams.hidelogs == false && this.user.rights.abusefilter_log && this.user.rights.abusefilter_view) {
        // 	if(this.needsAbuseFilterFilters) {
        // 		tUrlList.push("abusefilters");
        // 		tReturnText += "&abflimit=500&abfshow=enabled&abfprop=id|description|private";//|actions
        // 	}
        // 	tUrlList.push("abuselog");
        // 	tReturnText += "&afllimit="+this.rcParams.limit;
        // 	tReturnText += "&aflend="+tEndDate.toISOString();
        // 	tReturnText += "&aflprop=ids|user|title|action|result|timestamp";
        // }
        /***************************
        * Finish building url
        ***************************/
        tReturnText += "&list=" + tUrlList.join("|");
        if (tMetaList.length > 0) {
            tReturnText += "&meta=" + tMetaList.join("|");
        }
        if (tPropList.length > 0) {
            tReturnText += "&prop=" + tPropList.join("|");
        }
        tReturnText.replace(/ /g, "_");
        tUrlList = null;
        tMetaList = null;
        tPropList = null;
        tEndDate = null;
        mw.log("[WikiData](getApiUrl)", tReturnText.replace("&format=json", "&format=jsonfm"));
        return tReturnText;
    };
    // Static Constants
    // What data is to be retrieved for each recent change.
    WikiData.RC_PROPS = ["user", "flags", "title", "ids", "sizes", "timestamp", "loginfo", "parsedcomment", "comment"].join("|"); // patrolled
    return WikiData;
}());
exports["default"] = WikiData;

},{"./ConstantsApp":1,"./UserData":11,"./Utils":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantsApp_1 = require("./ConstantsApp");
var $ = window.jQuery;
var mw = window.mediaWiki;
var i18n = function (pKey) {
    var pArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pArgs[_i - 1] = arguments[_i];
    }
    var tText = i18n.TEXT[pKey] || i18n.MESSAGES[pKey];
    if (tText == undefined) {
        mw.log("[RecentChangesMultiple.i18n]() '" + pKey + "' is undefined.");
        return pKey;
    }
    return i18n.wiki2html.apply(i18n, [tText].concat(pArgs));
};
i18n.defaultLang = "en";
i18n.init = function (pLang) {
    // Set default lang for script
    i18n.defaultLang = pLang ? pLang.toLowerCase() : ConstantsApp_1["default"].config.wgUserLanguage;
    // split("-") checks for the "default" form of a language encase the specialized version isn't available for TEXT (ex: zh and zh-tw)
    i18n.TEXT = $.extend(i18n.TEXT.en, i18n.TEXT[i18n.defaultLang] || i18n.TEXT[i18n.defaultLang.split("-")[0]]);
    mw.language.setData(ConstantsApp_1["default"].config.wgUserLanguage, i18n.TEXT.mwLanguageData); // Gets mw.language.convertPlural() to work.
};
// Big thanks to wlb.fandom.com for translations.
i18n.TEXT = {
    en: {
        // Errors
        'rcm-error-linkformat': "'$1' is an incorrect format. Please do '''not''' include 'http://' or anything after the domain, including the first '/'.",
        'rcm-error-loading-syntaxhang': "Error loading [$1] ($2 tries). Please correct syntax (or refresh script to try again).",
        'rcm-error-loading-http': "This page is using an HTTPS connection; as such, this error could also be caused by the target wiki not supporting the HTTPS protocol. See [https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS here] for details.",
        'rcm-error-loading-connection': "Error loading [$1] ($2 tries). Most likely a connection issue; refresh script to try again.",
        'rcm-error-trymoretimes': "Try $1 more times",
        // Notifications
        'rcm-loading': "Loading/Sorting...",
        'rcm-refresh': "Refresh",
        'rcm-download-timestamp': "Recent Changes downloaded at: $1",
        'rcm-download-changesadded': " - [$1 Recent Changes added]",
        // Basics
        'rcm-wikisloaded': "Wikis Loaded: ",
        'rcm-previouslyloaded': "Previously loaded:",
        'rcm-nonewchanges': "No new changes",
        'rcm-autorefresh': "Auto Refresh",
        'rcm-autorefresh-tooltip': "Automatically refreshes Recent Changes every $1 seconds",
        'rcm-footer': "Version $1 by $2",
        // Options Panel
        'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Save options with cookie",
        // Modules
        'rcm-module-diff-title': "Diff Viewer",
        'rcm-module-diff-open': "Open diff",
        'rcm-module-diff-undo': "Undo edit",
        // Other
        'rcm-unknownthreadname': "thread",
        /***************************
         * mediawiki.language.data - found by finding [ mw.loader.implement("mediawiki.language.data" ] in the page source. If not found may be cached, so visit page using a "private / incognito" window.
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": null,
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": []
        },
    },
    be: {
        // Errors
        'rcm-error-linkformat': "'$1' паказаны ў няздатным фармаце. Калі ласка, не выкарыстоўвайце элемент 'http://', не ўстаўляйце нічога пасля яго і першага '/'.",
        'rcm-error-loading-syntaxhang': "Памылка пры загрузцы [$1] (спроб: $2) Калі ласка, выпраўце сінтаксіс (або абновіце скрыпт, каб паспрабаваць зноў).",
        'rcm-error-loading-http': "Гэта старонка скарыстае HTTPS-злучэнне; як такая, гэта абмыла таксама можа быць выклікана мэтавай вікі, што не падтрымвае пратакол HTTPS. Гл.[https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS тут] для атрымання дад. інфармацыі.",
        'rcm-error-loading-connection': "Памылка пры загрузцы [$1] (спроб: $2). Хутчэй за ўсе, гэта памылка з падключэннем, абновіце скрыпт, каб паспрабаваць зноў.",
        'rcm-error-trymoretimes': "Паспрабуйце $1 раз(а)",
        // Notifications
        'rcm-loading': "Загрузка/Сартаванне...",
        'rcm-refresh': "Абнавіць",
        'rcm-download-timestamp': "Апошнія змены ўзятыя з: $1",
        'rcm-download-changesadded': " - [$1 апошніх дададзеных змяненняў]",
        // Basics
        'rcm-wikisloaded': "Загружаныя вікі: ",
        'rcm-previouslyloaded': "Раней загружаныя:",
        'rcm-nonewchanges': "Няма новых зменаў",
        'rcm-autorefresh': "Аўтаматычнае абнаўленне",
        'rcm-autorefresh-tooltip': "Аўтаматычнае абнаўленне апошніх змяненняў кожныя $1 секунд",
        'rcm-footer': "Версія $1, створаная $2",
        // Options Panel
        // 'rcm-optionspanel-hideusersoverride': "data-hideusers вызначаюцца так.",
        'rcm-optionspanel-savewithcookie': "Захаваць змены ў Cookie",
        // Modules
        'rcm-module-diff-title': "Папярэдні прагляд змяненняў",
        'rcm-module-diff-open': "Паказаць змены",
        'rcm-module-diff-undo': "Адмяніць змены",
        // Other
        'rcm-unknownthreadname': "тэма",
        'discussions': 'Абмеркаванні',
        'forum-related-discussion-heading': 'Абмеркаванні пра $1',
        'embeddable-discussions-loading': 'Загрузка Абмеркаванняў...',
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    ca: {
        // Errors
        'rcm-error-linkformat': "'$1' és un format incorrecte. Si us plau, no afegeixis 'http://' o alguna cosa darrere del domini, incloent el primer '/'.",
        'rcm-error-loading-syntaxhang': "Error de càrrega [$1] ($2 intents). Si us plau, corregeix les teves sintaxis (o recarrega el teu script i intenta-ho un altre cop).",
        'rcm-error-loading-connection': "Error de càrrega [$1] ($2 intents). A causa d'un error de connexió, has de recarregar el teu script i intenta-ho un altre cop.",
        'rcm-error-trymoretimes': "Intenta-ho $1 més vegades",
        // Notificacions
        'rcm-loading': "Carregant/Classificant…",
        'rcm-refresh': "Actualització",
        'rcm-download-timestamp': "Canvis recents baixats a: $1",
        'rcm-download-changesadded': " - [$1 Canvis recents afegits]",
        // Bàsics
        'rcm-wikisloaded': "Wikis carregats: ",
        'rcm-previouslyloaded': "Breument carregats:",
        'rcm-nonewchanges': "No hi ha nous canvis",
        'rcm-autorefresh': "Actualització automàtica",
        'rcm-autorefresh-tooltip': "Recarrega automàticament els canvis recents cada $1 segons",
        'rcm-footer': "Versió $1 de $2",
        // Panell d'opcions
        'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Guarda els canvis pel cookie",
        // Mòduls
        'rcm-module-diff-title': "Visualitzador de pàgina",
        'rcm-module-diff-open': "Obre la pàgina",
        'rcm-module-diff-undo': "Desfés el canvi",
        // Altres
        'rcm-unknownthreadname': "tema",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    de: {
        'rcm-error-linkformat': "'$1' ist ein falsches Format. Bitte füge '''nicht''' 'http://' oder Weiteres nach der Domain ein. Dies gilt auch für das erste '/'.",
        'rcm-error-loading-syntaxhang': "Fehler beim Laden [$1] ($2 Versuche). Bitte korrigiere die Syntax (oder lade das Skript neu, um es erneut zu versuchen).",
        'rcm-error-loading-http': "Diese Seite wird mit einem HTTPS-Protokoll übertragen; dieser Fehler kann dadurch hervorgerufen werden, dass das Zielwiki HTTPS nicht unterstützt. Siehe [https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS hier] für Details.",
        'rcm-error-loading-connection': "Fehler beim Laden [$1] ($2 Versuche). Es liegt höchstwahrscheinlich ein Verbindungsproblem vor. Lade das Script neu, um es erneut zu versuchen.",
        'rcm-error-trymoretimes': "Versuche es $1 Mal mehr",
        'rcm-loading': "Lade/Sortiere...",
        'rcm-refresh': "Aktualisieren",
        'rcm-download-timestamp': "Letzte Aktualisierung um: $1",
        'rcm-download-changesadded': " - [$1 hinzugefügte Veränderungen]",
        'rcm-wikisloaded': "Geladene Wikis: ",
        'rcm-previouslyloaded': "Vorige Änderungen:",
        'rcm-nonewchanges': "Keine neuen Veränderungen",
        'rcm-autorefresh': "Auto-Aktualisierung",
        'rcm-autorefresh-tooltip': "Aktualisiert alle $1 Sekunden automatisch die letzten Veränderungen",
        'rcm-footer': "Version $1 von $2",
        'rcm-optionspanel-hideusersoverride': "data-hideusers überschreibt dies.",
        'rcm-optionspanel-savewithcookie': "Speichere Einstellungen mit Cookie",
        'rcm-module-diff-title': "Schnellvergleich",
        'rcm-module-diff-open': "Öffne Versionsvergleich",
        'rcm-module-diff-undo': "Rückgängig machen",
        'rcm-unknownthreadname': "Diskussion",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    es: {
        // Errors
        'rcm-error-linkformat': "'$1' es un formato incorrecto. Por favor '''no''' incluyas 'http://' o cualquier cosa después, incluyendo el primer '/'.",
        'rcm-error-loading-syntaxhang': "Error cargando [$1] ($2 intentos). Por favor corrige la sintaxis (o recarga el script para intentarlo otra vez).",
        'rcm-error-loading-connection': "Error cargando [$1] ($2 intentos). Seguramente sea un problema de conexión; recarga el script para intentarlo otra vez.",
        'rcm-error-trymoretimes': "Inténtalo $1 veces más",
        // Notifications
        'rcm-loading': "Cargando/Clasificando...",
        'rcm-refresh': "Recargar",
        'rcm-download-timestamp': "Cambios recientes descargados en: $1",
        'rcm-download-changesadded': " - [$1 Cambios Recientes añadidos]",
        // Basics
        'rcm-wikisloaded': "Wikis Cargados: ",
        'rcm-previouslyloaded': "Previamente cargados:",
        'rcm-nonewchanges': "No hay nuevos cambios",
        'rcm-autorefresh': "Auto Recargar",
        'rcm-autorefresh-tooltip': "Recarga los Cambios Recientes automáticamente cada $1 segundos",
        'rcm-footer': "Versión $1 por $2",
        // Options Panel
        // 'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        // 'rcm-optionspanel-savewithcookie': "Save changes with cookie",
        // Modules
        'rcm-module-diff-title': "Visor de cambios",
        'rcm-module-diff-open': "Abrir cambio",
        'rcm-module-diff-undo': "Deshacer edición",
        // Other
        'rcm-unknownthreadname': "hilo",
        /***************************
         * mediawiki.language.data - found by finding [ mw.loader.implement("mediawiki.language.data") ] in the page source. If not found may be cached, so visit page using a "private / incognito" window.
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": null,
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": []
        },
    },
    gl: {
        // Erros
        'rcm-error-linkformat': "'$1' é un formato incorrecto. Por favor, non tes que engadir 'http://' ou algunha cousa despois do dominio, incluíndo o primeiro '/'.",
        'rcm-error-loading-syntaxhang': "Erro de carregamento [$1] ($2 tentativas). Por favor, corrixe as túas sintaxes (ou recarrega o teu script e téntao novamente).",
        'rcm-error-loading-connection': "Erro de carregamento [$1] ($2 tentativas). Debido a un erro de conexión, tes de recarregar o teu script e téntao novamente.",
        'rcm-error-trymoretimes': "Téntao $1 máis veces",
        // Notificacións
        'rcm-loading': "A cargar/A clasificar…",
        'rcm-refresh': "Actualización",
        'rcm-download-timestamp': "Cambios recentes baixados en: $1",
        'rcm-download-changesadded': " - [$1 Cambios recentes engadidos]",
        // Básicos
        'rcm-wikisloaded': "Wikis cargados: ",
        'rcm-previouslyloaded': "Brevemente cargados:",
        'rcm-nonewchanges': "Non hai novos cambios",
        'rcm-autorefresh': "Actualización automática",
        'rcm-autorefresh-tooltip': "Recarregar automaticamente os cambios recentes cada $1 segundos",
        'rcm-footer': "Versión $1 de $2",
        // Panel de opcións
        'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Gardar cambios polo cookie",
        // Módulos
        'rcm-module-diff-title': "Visualizador de páxina",
        'rcm-module-diff-open': "Abrir páxina",
        'rcm-module-diff-undo': "Desfacer cambio",
        // Outros
        'rcm-unknownthreadname': "tópico",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    it: {
        // Errori
        'rcm-errore-linkformat': "'$1' non è in un formato corretto. Per favore, '''non''' includere 'http://' o qualsiasi altra cosa dopo il dominio, compreso la prima '/'.",
        'rcm-Errore-loading-syntaxhang': "Errore caricando [$1] ($2 tentativi). Per favore, correggi la tua sintassi (o ricarica il tuo script per riprovare).",
        'rcm-Errore-loading-connection': "Errore caricando [$1] ($2 tentativi). Quasi sicuramente si tratta di un problema di connessione; ricarica lo script per riprovare.",
        'rcm-Errore-trymoretimes': "Prova $1 volte ancora",
        // Notifiche
        'rcm-loading': "Caricando / Ordinando...",
        'rcm-refresh': "Ricarica",
        'rcm-download-timestamp': "Ultime Modifiche scaricate alle: $1",
        'rcm-download-changesadded': " - [$1 Ultime Modifiche aggiunte]",
        // Base
        'rcm-wikisloaded': "Wiki caricate:",
        'rcm-previouslyloaded': "Precedentemente caricate:",
        'rcm-nonewchanges': "Non ci sono nuove modifiche",
        'rcm-autorefresh': "Aggiornamento automatico",
        'rcm-autorefresh-tooltip': "Ricarica automaticamente le Ultime Modifihce ogni $1 secondi",
        'rcm-footer': "Versione $1 ad opera di $2",
        // Opzioni
        'rcm-optionspanel-hideusersoverride': "data-hideusers sovrascrive questo.",
        'rcm-optionspanel-savewithcookie': "Salvare modifiche con un cookie",
        // Moduli
        'rcm-module-diff-title': "Visualizzazione cambiamenti",
        'rcm-module-diff-open': "Apri il confronto delle versioni",
        'rcm-module-diff-undo': "Annulla modifica",
        // Altri
        'rcm-unknownthreadname': "Conversazione",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    ja: {
        // Errors
        'rcm-error-linkformat': "'$1' は表記に誤りがあります。 'http://' や、'/'を含むドメイン名以降の部分を'''含めずに'''指定してください。",
        'rcm-error-loading-syntaxhang': "($2回試しましたが) [$1]の読み込みに失敗しました。（再更新してみるか、）設定を修正してください。",
        'rcm-error-loading-http': "このページはHTTPS接続を利用しています。このエラーはHTTPSプロトコル非対応のWikiにて起こっていることが考えられます。詳細は[https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS こちら]をご覧ください。",
        'rcm-error-loading-connection': "($2回試しましたが) [$1]の読み込みに失敗しました。接続に失敗した可能性があります。再更新してください。",
       'rcm-error-trymoretimes': "もう$1回お試しください",
        // Notifications
        'rcm-loading': "読込・整列中...",
        'rcm-refresh': "更新",
        'rcm-download-timestamp': "$1時点の最近の更新を表示中",
        'rcm-download-changesadded': " - [$1件の最近の更新が追加されました]",
        // Basics
        'rcm-wikisloaded': "対象のWiki: ",
        'rcm-previouslyloaded': "前回との変更点:",
        'rcm-nonewchanges': "新しい変更はありません",
        'rcm-autorefresh': "自動更新",
        'rcm-autorefresh-tooltip': "$1秒おきに情報を自動更新します",
        'rcm-footer': "Version $1 (編集者は$2)",
        // Options Panel
        'rcm-optionspanel-hideusersoverride': "data-hideusersの設定によって無効にされています",
        'rcm-optionspanel-savewithcookie': "クッキーに変更を保存する",
        // Modules
        'rcm-module-diff-title': "差分を表示",
        'rcm-module-diff-open': "差分を別のページで表示",
        'rcm-module-diff-undo': "編集を取り消す",
        // Other
        'rcm-unknownthreadname': "無題",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": null,
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    nl: {
        'rcm-error-linkformat': "'$1' is een onjuist formaat. Gelieve '''niet''' 'http://' of iets anders na het domein, inclusief de eerste '/' bij te voegen.",
        'rcm-error-loading-syntaxhang': "Fout bij het laden van [$1] ($2 pogingen). Corrigeer de syntax (of ververs het script om opnieuw te proberen).",
        'rcm-error-loading-connection': "Fout bij het laden van [$1] ($2 pogingen). Hoogstwaarschijnlijk een verbindingsprobleem; ververs het script om opnieuw te proberen.",
        'rcm-error-trymoretimes': "Probeer het $1 keer meer",
        'rcm-loading': "Laden/Sorteren...",
        'rcm-refresh': "Verversen",
        'rcm-download-timestamp': "Recente Wijzigingen gedownload van: $1",
        'rcm-download-changesadded': " - [$1 Recente Wijzigingen toegevoegd]",
        'rcm-wikisloaded': "Wiki's geladen: ",
        'rcm-previouslyloaded': "Eerder geladen:",
        'rcm-nonewchanges': "Geen nieuwe wijzigingen",
        'rcm-autorefresh': "Auto Verversen",
        'rcm-autorefresh-tooltip': "Automatisch Recente Wijzigingen elke $1 seconden verversen",
        'rcm-footer': "Versie $1 door $2",
        'rcm-optionspanel-hideusersoverride': "data-hideusers overschrijft dit.",
        'rcm-optionspanel-savewithcookie': "Sla wijzigingen op met een cookie",
        'rcm-module-diff-title': "Toon wijz",
        'rcm-module-diff-open': "Open wijz",
        'rcm-module-diff-undo': "Bewerking ongedaan maken",
        'rcm-unknownthreadname': "draad",
        /***************************
         * mediawiki.language.data - found by finding [ mw.loader.implement("mediawiki.language.data" ] in the page source. If not found may be cached, so visit page using a "private / incognito" window.
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": ".", ".": "," },
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    oc: {
        // Errors
        'rcm-error-linkformat': "'$1' es un format incorrècte. Se vos plai, apondètz pas 'http://' o quicòm darrièr del domeni, en comprenent lo primièr '/'.",
        'rcm-Error-loading-syntaxhang': "Error de carga [$1] ($2 assages). Se vos plai, corregissètz las vòstras sintaxis (o recarga lo vòstre script e ensaja-o un autre còp).",
        'rcm-Error-loading-connection': "Error de carga [$1] ($2 assages). A causa d'un error de connexion, te cal recargar lo tieu script e ensaja-o un autre còp.",
        'rcm-Error-trymoretimes': "Ensaja-o $1 mai de còps",
        // Notificacions
        'rcm-loading': "En cargant/En classificant…",
        'rcm-refresh': "Actualizacion",
        'rcm-download-timestamp': "Cambiaments recents davalats sus: $1",
        'rcm-download-changesadded': " - [$1 Cambiaments recents apondis]",
        // Basics
        'rcm-wikisloaded': "Wikis cargats: ",
        'rcm-previouslyloaded': "Brèvament cargats:",
        'rcm-nonewchanges': "I a pas de nòus cambiaments",
        'rcm-autorefresh': "Actualizacion automatica",
        'rcm-autorefresh-tooltip': "Recargatz automaticament los cambiaments recents cada $1 segon",
        'rcm-footer': "Version $1 de $2",
        // Panèl d'opcions
        'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Gardatz los cambiaments pel cookie",
        // Moduls
        'rcm-module-diff-title': "Visualitzador de pagina",
        'rcm-module-diff-open': "Dobrissètz la pagina",
        'rcm-module-diff-undo': "Desfasètz lo cambiament",
        // Autras
        'rcm-unknownthreadname': "tèma",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    pl: {
        // Errors
        'rcm-error-linkformat': "'$1' to nieodpowiedni format. Proszę nie używać elementu 'http://', niczego po nim oraz pierwszego '/'.",
        'rcm-error-loading-syntaxhang': "Błąd podczas wczytywania [$1] (prób: $2) Proszę poprawić syntax (lub odświeżyć skrypt by spróbować ponownie).",
        'rcm-error-loading-connection': "Błąd podczas wczytywania [$1] (prób: $2). Najprawdopodobniej jest to błąd z połączeniem, odśwież skrypt by spróbować ponownie.",
        'rcm-error-trymoretimes': "Spróbuj $1 razy",
        // Notifications
        'rcm-loading': "Ładowanie/Sortowanie...",
        'rcm-refresh': "Odśwież",
        'rcm-download-timestamp': "Ostatnie zmiany pobrane o: $1",
        'rcm-download-changesadded': " - [$1 dodanych ostatnich zmian]",
        // Basics
        'rcm-wikisloaded': "Załadowane wiki: ",
        'rcm-previouslyloaded': "Poprzednio załadowane:",
        'rcm-nonewchanges': "Brak nowych zmian",
        'rcm-autorefresh': "Automatyczne odświeżanie",
        'rcm-autorefresh-tooltip': "Automatyczne odświeżanie ostatnich zmian co każde $1 sekund",
        'rcm-footer': "Wersja $1 stworzona przez $2",
        // Options Panel
        // 'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Zapisz zmiany w pamięci podręcznej",
        // Modules
        'rcm-module-diff-title': "Podgląd zmian",
        'rcm-module-diff-open': "Pokaż zmiany",
        'rcm-module-diff-undo': "Cofnij zmiany",
        // Other
        'rcm-unknownthreadname': "wątek",
        /***************************
         * mediawiki.language.data - found by finding [ mw.loader.implement("mediawiki.language.data" ] in the page source. If not found may be cached, so visit page using a "private / incognito" window.
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": " ", ".": "," },
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    pt: {
        // Erros
        'rcm-error-linkformat': "'$1' é um formato incorrecto. Por favor, não tens de acrescentar 'http://' ou alguma coisa depois do domínio, incluindo o primeiro '/'.",
        'rcm-error-loading-syntaxhang': "Erro de carregamento [$1] ($2 tentativas). Por favor, corrige as tuas sintaxes (ou recarrega o teu script e tenta novamente).",
        'rcm-error-loading-connection': "Erro de carregamento [$1] ($2 tentativas). Devido a um erro de conexão, tens de recarregar o teu script e tenta novamente.",
        'rcm-error-trymoretimes': "Tenta $1 mais vezes",
        // Notificações
        'rcm-loading': "A carregar/A classificar…",
        'rcm-refresh': "Actualização",
        'rcm-download-timestamp': "Mudanças recentes baixadas em: $1",
        'rcm-download-changesadded': " - [$1 Mudanças recentes acrescentadas]",
        // Básicos
        'rcm-wikisloaded': "Wikis carregados: ",
        'rcm-previouslyloaded': "Brevemente carregados:",
        'rcm-nonewchanges': "Não há novas mudanças",
        'rcm-autorefresh': "Actualização automática",
        'rcm-autorefresh-tooltip': "Recarregar automaticamente as mudanças recentes a cada $1 segundos",
        'rcm-footer': "Versão $1 de $2",
        // Painel de opções
        'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Guardar mudanças pelo cookie",
        // Módulos
        'rcm-module-diff-title': "Visualizador de página",
        'rcm-module-diff-open': "Abrir página",
        'rcm-module-diff-undo': "Desfazer mudança",
        // Outros
        'rcm-unknownthreadname': "tópico",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": " ", ".": "," },
            "grammarForms": [],
            "pluralRules": ["n = 0..2 and n != 2 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["pt-br", "en"]
        },
    },
    "pt-br": {
        // Erros
        'rcm-error-linkformat': "'$1' é um formato incorreto. Por favor, não inclua 'http://' ou alguma coisa depois do domínio, incluindo a primeira '/'.",
        'rcm-error-loading-syntaxhang': "Erro de carregamento [$1] ($2 tentativas). Por favor, corrija as suas sintaxes (ou recarregue o seu script para tentar novamente).",
        'rcm-error-loading-connection': "Erro de carregamento [$1] ($2 tentativas). Devido a um erro de conexão,; recarregue o seu script e tente novamente.",
        'rcm-error-trymoretimes': "Tente $1 mais vezes",
        // Notificações
        'rcm-loading': "Carregando/Classificando...",
        'rcm-refresh': "Refresh",
        'rcm-download-timestamp': "Mudanças recentes baixadas em: $1",
        'rcm-download-changesadded': " - [$1 Mudanças recentes adicionadas]",
        // Básicos
        'rcm-wikisloaded': "Wikias carregadas: ",
        'rcm-previouslyloaded': "Brevemente carregadas:",
        'rcm-nonewchanges': "Não há novas mudanças",
        'rcm-autorefresh': "Auto refresh para atualizar automaticamente",
        'rcm-autorefresh-tooltip': "Recarregar automaticamente as mudanças recentes a cada $1 segundos",
        'rcm-footer': "Versão $1 de $2",
        // Painel de opções
        'rcm-optionspanel-hideusersoverride': "data-hideusers o substitui",
        'rcm-optionspanel-savewithcookie': "Salvar mudanças pelo cookie",
        // Modulos
        'rcm-module-diff-title': "Visualizador de página",
        'rcm-module-diff-open': "Abrir página",
        'rcm-module-diff-undo': "Desfazer mudança",
        // Outros
        'rcm-unknownthreadname': "tópico",
        /***************************
         * mediawiki.language.data - found by finding [ mw.loader.implement("mediawiki.language.data" ] in the page source. If not found may be cached, so visit page using a "private / incognito" window.
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": " ", ".": "," },
            "grammarForms": [],
            "pluralRules": ["n = 0..2 and n != 2 @integer 0, 1 @decimal 0.0, 1.0, 0.00, 1.00, 0.000, 1.000, 0.0000, 1.0000"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["pt", "en"]
        },
    },
    ro: {
        // Erori
        'rcm-eroare-linkformat': "'$1' este un format incorect. Te rog să nu incluzi 'http://' sau oricare lucru după aceea, incluzând primul '/'.",
        'rcm-eroare-loading-syntaxhang': "Eroare încărcând [$1] ($2 încercări). Te rog să corectezi sintaxele (sau reîncărca-ţi script-ul pentru a încerca din nou).",
        'rcm-eroare-loading-connection': "Eroare încărcând [$1] ($2 încercări). Cu siguranţă, este o problemă de conexiune; reîncărca-ţi script-ul pentru a încerca din nou.",
        'rcm-eroare-trymoretimes': "Încearcă-l mai mult de $1 ori",
        // Înştiinţări
        'rcm-loading': "Încărcând/Clasificând…",
        'rcm-refresh': "Reîncărcare",
        'rcm-download-timestamp': "Schimburi recente descărcate pe: $1",
        'rcm-download-changesadded': " - [$1 Schimburi recente adăugate]",
        // Bazici
        'rcm-wikisloaded': "Wiki-uri încărcate: ",
        'rcm-previouslyloaded': "În prealabil încărcate:",
        'rcm-nonewchanges': "Nu există noi schimburi",
        'rcm-autorefresh': "Actualizare automată",
        'rcm-autorefresh-tooltip': "Reîncărcaţi schimburile recente în mod automat fiecare $1 secunde",
        'rcm-footer': "Versiune $1 de $2",
        // Panou de opţiuni
        // 'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        // 'rcm-optionspanel-savewithcookie': "Păstraţi schimburi dinspre cookie",
        // Module
        'rcm-module-diff-title': "Vizualizatorul paginei",
        'rcm-module-diff-open': "Deschideţi pagina",
        'rcm-module-diff-undo': "Desfaceţi ediţia",
        // Mai mult
        'rcm-unknownthreadname': "fir",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": ".", ".": "," },
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1", "v != 0 or n = 0 or n != 1 and n % 100 = 1..19 @integer 0, 2~16, 101, 1001, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    ru: {
        // Errors
        'rcm-error-linkformat': "'$1' указан в неподходящем формате. Пожалуйста, не используйте элемент 'http://', не вставляйте ничего после него и первого '/'.",
        'rcm-error-loading-syntaxhang': "Ошибка при загрузке [$1] (попыток: $2) Пожалуйста, исправьте синтаксис (или обновите скрипт, чтобы попытаться снова).",
        'rcm-error-loading-http': "Эта страница использует HTTPS-соединение; как таковая, эта ошибка также может быть вызвана целевой вики, не поддерживающей протокол HTTPS. См.[https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS тут] для получения доп. информации.",
        'rcm-error-loading-connection': "Ошибка при загрузке [$1] (попыток: $2). Скорее всего, это ошибка с подключением, обновите скрипт, чтобы попробовать снова.",
        'rcm-error-trymoretimes': "Попробуйте $1 раз(а)",
        // Notifications
        'rcm-loading': "Загрузка/Сортировка...",
        'rcm-refresh': "Обновить",
        'rcm-download-timestamp': "Последние изменения взяты с: $1",
        'rcm-download-changesadded': " - [$1 последних добавленных изменений]",
        // Basics
        'rcm-wikisloaded': "Загруженные вики: ",
        'rcm-previouslyloaded': "Ранее загруженные:",
        'rcm-nonewchanges': "Нет новых изменений",
        'rcm-autorefresh': "Автоматическое обновление",
        'rcm-autorefresh-tooltip': "Автоматическое обновление последних изменений каждые $1 секунд",
        'rcm-footer': "Версия $1, созданная $2",
        // Options Panel
        // 'rcm-optionspanel-hideusersoverride': "data-hideusers определяются так.",
        'rcm-optionspanel-savewithcookie': "Сохранить изменения в Cookie",
        // Modules
        'rcm-module-diff-title': "Предварительный просмотр изменений",
        'rcm-module-diff-open': "Показать изменения",
        'rcm-module-diff-undo': "Отменить изменения",
        // Other
        'rcm-unknownthreadname': "тема",
        'discussions': 'Обсуждения',
        'forum-related-discussion-heading': 'Обсуждения о $1',
        'embeddable-discussions-loading': 'Загрузка Обсуждений...',
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": " ", ".": "," },
            "grammarForms": [],
            "pluralRules": ["v = 0 and i % 10 = 1 and i % 100 != 11 @integer 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, …", "v = 0 and i % 10 = 2..4 and i % 100 != 12..14 @integer 2~4, 22~24, 32~34, 42~44, 52~54, 62, 102, 1002, …", "v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14 @integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    tr: {
        // Errors
        'rcm-error-linkformat': "'$1' yanlış bir format. Lütfen 'http://' ya da ilk '/' dahil alandan sonra herhangi bir şey eklemeyin.",
        'rcm-error-loading-syntaxhang': "[$1] yüklenirken hata oluştu ($ 2 çalışır). Lütfen sözdizimini düzeltin (veya yeniden denemek için komut dosyasını yenileyin).",
        'rcm-error-loading-http': "Bu sayfa bir HTTPS bağlantısı kullanıyor; Bu nedenle, bu hata HTTPS protokolünü desteklemeyen hedef wiki'den de kaynaklanabilir. Ayrıntılar için [https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS buraya] bakın.",
        'rcm-error-loading-connection': "[$1] yüklenirken hata oluştu ($2 çalışır). Büyük olasılıkla bir bağlantı sorunu; tekrar denemek için komut dosyasını yenileyin.",
        'rcm-error-trymoretimes': "$1 kez daha dene",
        // Notifications
        'rcm-loading': "Yükleniyor/Sınıflandırıyor...",
        'rcm-refresh': "Yenile",
        'rcm-download-timestamp': "İndirilen Son Değişiklikler: $1",
        'rcm-download-changesadded': " - [$1 Son Değişiklikler eklendi]",
        // Basics
        'rcm-wikisloaded': "Wikiler Yüklendi: ",
        'rcm-previouslyloaded': "Önceden yüklenmiş:",
        'rcm-nonewchanges': "No new changes",
        'rcm-autorefresh': "Otomatik Yenileme",
        'rcm-autorefresh-tooltip': "Son Değişiklikleri $1 saniyede bir otomatik olarak yeniler",
        'rcm-footer': "Sürüm $1 yapan $2",
        // Options Panel
        'rcm-optionspanel-hideusersoverride': "veri gizleyicileri bunu geçersiz kılar.",
        'rcm-optionspanel-savewithcookie': "Çerezle seçenekleri kaydet",
        // Modules
        'rcm-module-diff-title': "Fark Görüntüleyici",
        'rcm-module-diff-open': "Farkı aç",
        'rcm-module-diff-undo': "Düzenlemeyi geri al",
        // Other
        'rcm-unknownthreadname': "tartışma",
        /***************************
         * mediawiki.language.data - found by finding [ mw.loader.implement("mediawiki.language.data") ] in the page source. If not found may be cached, so visit page using a "private / incognito" window.
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": { ",": ".", ".": "," },
            "grammarForms": [],
            "pluralRules": ["n = 1 @integer 1 @decimal 1.0, 1.00, 1.000, 1.0000"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    uk: {
        // Errors
        'rcm-error-linkformat': "'$1' вказаний в невідповідному форматі. Будь ласка, не використовуйте елемент 'http://', не вставляйте нічого після нього і першого '/'.",
        'rcm-error-loading-syntaxhang': "Помилка при завантаженні [$1] (спроб: $2) Будь ласка, виправте синтаксис (або поновіть скрипт, щоб спробувати знову).",
        'rcm-error-loading-http': "Ця сторінка використовує HTTPS-з'єднання; як така, ця помилка також може бути викликана цільовою вікі, яка не підтримує протокол HTTPS. Див.[https://dev.fandom.com/wiki/RecentChangesMultiple#HTTPS тут] для отримання додаткової інформації.",
        'rcm-error-loading-connection': "Помилка при завантаженні [$1] (спроб: $2). Швидше за все, це помилка з підключенням, поновіть скрипт, щоб спробувати знову.",
        'rcm-error-trymoretimes': "Спробуйте $1 раз(а)",
        // Notifications
        'rcm-loading': "Завантаження/Сортування...",
        'rcm-refresh': "Оновити",
        'rcm-download-timestamp': "Останні зміни взяті з: $1",
        'rcm-download-changesadded': " - [$1 останніх доданих змін]",
        // Basics
        'rcm-wikisloaded': "Завантажені вікі: ",
        'rcm-previouslyloaded': "Раніше завантажені:",
        'rcm-nonewchanges': "Немає нових змін",
        'rcm-autorefresh': "Автоматичне оновлення",
        'rcm-autorefresh-tooltip': "Автоматичне оновлення останніх змін кожні $1 секунд",
        'rcm-footer': "Версія $1, що створена $2",
        // Options Panel
        // 'rcm-optionspanel-hideusersoverride': "data-hideusers визначаються так.",
        'rcm-optionspanel-savewithcookie': "Зберегти зміни в Cookie",
        // Modules
        'rcm-module-diff-title': "Попередній перегляд змін",
        'rcm-module-diff-open': "Показати зміни",
        'rcm-module-diff-undo': "Скасувати зміни",
        // Other
        'rcm-unknownthreadname': "тема",
        'discussions': 'Обговорення',
        'forum-related-discussion-heading': 'Обговорення щодо $1',
        'embeddable-discussions-loading': 'Завантаження Обговорень...',
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    val: {
        // Errors
        'rcm-error-linkformat': "'$1' és un format incorrecte. Per favor, no afiggues 'http://' o alguna cosa darrere del domini, incloent el primer '/'.",
        'rcm-error-loading-syntaxhang': "Error de càrrega [$1] ($2 intents). Per favor, corrig les tues sintaxis (o recarrega la tua script i intenta-ho un atre colp).",
        'rcm-error-loading-connection': "Error de càrrega [$1] ($2 intents). Per un error de conexió, tens que recarregar la tua script i intenta-ho un atre colp.",
        'rcm-error-trymoretimes': "Intenta-ho $1 més voltes",
        // Notificacions
        'rcm-loading': "Carregant/Classificant…",
        'rcm-refresh': "Actualisació",
        'rcm-download-timestamp': "Canvis recents baixats a: ",
        'rcm-download-changesadded': " - [$1 Canvis recents afegits]",
        // Bàsics
        'rcm-wikisloaded': "Wikis carregats: ",
        'rcm-previouslyloaded': "Breument carregats:",
        'rcm-nonewchanges': "No hi ha nous canvis",
        'rcm-autorefresh': "Actualisació automàtica",
        'rcm-autorefresh-tooltip': "Recarregar automàticament els canvis recents cada $1 segons",
        'rcm-footer': "Versió $1 de $2",
        // Panel d'opcions
        'rcm-optionspanel-hideusersoverride': "data-hideusers overrides this.",
        'rcm-optionspanel-savewithcookie': "Guardar els canvis pel cookie",
        // Mòduls
        'rcm-module-diff-title': "Visualisador de pàgina",
        'rcm-module-diff-open': "Obrir la pàgina",
        'rcm-module-diff-undo': "Desfer el canvi",
        // Atres
        'rcm-unknownthreadname': "tema",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": null,
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["en"]
        },
    },
    vi: {
        'rcm-error-linkformat': "'$1' không đúng định dạng. Xin đừng '''thêm''' 'http://' hay bất cứ ký tự gì trước tên miền trang, bao gồm dấu gạch chéo '/'.",
        'rcm-error-loading-syntaxhang': "Lỗi tải [$1] ($2 lần thử). Hãy sửa lại đúng cú pháp (hoặc làm mới lại trang để thử lại.).",
        'rcm-error-loading-connection': "Lỗi tải [$1] ($2 lần thử). Khả năng lớn đây là lỗi kết nối; làm mới lại trang để thử lại.",
        'rcm-error-trymoretimes': "Thử thêm $1 lần nữa",
        'rcm-loading': "Đang Tải/Đang Sắp Xếp...",
        'rcm-refresh': "Làm mới",
        'rcm-download-timestamp': "Thay Đổi Gần Đây đã được tải vào: $1",
        'rcm-download-changesadded': " - [$1 Thay Đổi Gần Đây đã được thêm vào]",
        'rcm-wikisloaded': "Các Wiki đã tải: ",
        'rcm-previouslyloaded': "Đã tải trước đó:",
        'rcm-nonewchanges': "Không có thay đổi nào mới",
        'rcm-autorefresh': "Tự Động Làm Mới",
        'rcm-autorefresh-tooltip': "Tự động làm mới trang Thay Đổi Gần Đây sau mỗi $1 giây",
        'rcm-footer': "Phiên bản $1 bởi $2",
        'rcm-optionspanel-hideusersoverride': "data-hideusers đã loại trừ điều này.",
        'rcm-optionspanel-savewithcookie': "Lưu lại thiết đặt bằng cookie",
        'rcm-module-diff-title': "Trình Xem Thay Đổi",
        'rcm-module-diff-open': "Mở xem khác",
        'rcm-module-diff-undo': "Lùi sửa",
        'rcm-unknownthreadname': "luồng",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
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
    },
    zh: {
        'rcm-error-linkformat': "「$1」为错误格式。请'''不要'''在网域后加入「http://」或任何文字，包括第一个「/」字符。",
        'rcm-error-loading-syntaxhang': "读取[$1]时发生错误（$2次尝试）。请更正语法（或刷新语法后再试一次）。",
        'rcm-error-loading-connection': "读取[$1]时发生错误（$2次尝试）。极可能为联机问题。请刷新语法后再试一次。",
        'rcm-error-trymoretimes': "请再试$1次",
        'rcm-loading': "正在载入／整理中......",
        'rcm-refresh': "刷新",
        'rcm-download-timestamp': "最近更改于$1载入",
        'rcm-download-changesadded': " - [已添加$1个最近更改内容]",
        'rcm-wikisloaded': "已载入的维基：",
        'rcm-previouslyloaded': "之前已加载：",
        'rcm-nonewchanges': "无新更动",
        'rcm-autorefresh': "自动刷新",
        'rcm-autorefresh-tooltip': "每隔$1秒自动更新最近更改",
        'rcm-footer': "由$2编辑的版本$1",
        'rcm-optionspanel-hideusersoverride': "以data-hideusers覆盖原有设定。",
        'rcm-optionspanel-savewithcookie': "使用cookie储存变动",
        'rcm-module-diff-title': "差异查看器",
        'rcm-module-diff-open': "开启差异",
        'rcm-module-diff-undo': "复原编辑",
        'rcm-unknownthreadname': "话题",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": null,
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["zh-hans", "en"]
        },
    },
    "zh-hant": {
        'rcm-error-linkformat': "「$1」為錯誤格式。請'''不要'''在網域後加入「http://」或任何文字，包括第一個「/」字元。",
        'rcm-error-loading-syntaxhang': "讀取[$1]時發生錯誤（$2 次嘗試）。請更正語法（或重新載入語法後再試一次）。",
        'rcm-error-loading-connection': "讀取[$1]時發生錯誤（$2 次嘗試）。極可能為連線問題。請重新載入語法後再試一次。",
        'rcm-error-trymoretimes': "請再試$1次",
        'rcm-loading': "正在載入／整理中......",
        'rcm-refresh': "重新整理",
        'rcm-download-timestamp': "近期變動於$1載入",
        'rcm-download-changesadded': " - [已新增$1個近期變動內容]",
        'rcm-wikisloaded': "已載入的維基：",
        'rcm-previouslyloaded': "之前已載入：",
        'rcm-nonewchanges': "無新變更",
        'rcm-autorefresh': "自動重整",
        'rcm-autorefresh-tooltip': "每隔$1秒自動更新近期變動",
        'rcm-footer': "由$2編輯的版本$1",
        'rcm-optionspanel-hideusersoverride': "以data-hideusers覆蓋原有設定。",
        'rcm-optionspanel-savewithcookie': "使用cookie儲存變動",
        'rcm-module-diff-title': "差異檢視器",
        'rcm-module-diff-open': "開啟差異",
        'rcm-module-diff-undo': "復原編輯",
        'rcm-unknownthreadname': "討論串",
        /***************************
         * mediawiki.language.data
         ***************************/
        mwLanguageData: {
            "digitTransformTable": null,
            "separatorTransformTable": null,
            "grammarForms": [],
            "pluralRules": ["i = 1 and v = 0 @integer 1"],
            "digitGroupingPattern": null,
            "fallbackLanguages": ["zh-hans", "en"]
        },
    },
};
/*******************************************************************************
* DO NOT CHANGE THIS WHEN TRANSLATING
* MESSAGES is all text that is retrieved from the Wikia servers for any supported language.
* If it is necessary to overwrite a system message, simply add its key to the TEXT object with the new text for your language.
********************************************************************************/
i18n.MESSAGES = {
    /***************************
    * Common Stuff
    ****************************/
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/languages/messages/MessagesEn.php
    'talkpagelinktext': 'Talk',
    'cur': 'cur',
    'last': 'prev',
    'recentchanges-legend': 'Recent changes options',
    'rclinks': 'Show last $1 changes in last $2 days<br />$3',
    'rcshowhideminor': '$1 minor edits',
    'rcshowhidebots': '$1 bots',
    'rcshowhideliu': '$1 logged-in users',
    'rcshowhideanons': '$1 anonymous users',
    // 'rcshowhidepatr'		: '$1 patrolled edits', // 2052
    'rcshowhidemine': '$1 my edits',
    'rcshowhideenhanced': '$1 grouped recent changes',
    'rcshowhidelogs': '$1 logs',
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
    // Tooltips
    'recentchanges-label-newpage': 'This edit created a new page',
    'recentchanges-label-minor': 'This is a minor edit',
    'recentchanges-label-bot': 'This edit was performed by a bot',
    'recentchanges-label-unpatrolled': 'This edit has not yet been patrolled',
    'rc-enhanced-expand': 'Show details (requires JavaScript)',
    'rc-enhanced-hide': 'Hide details',
    // "Extra" support - "# only translate this message to other languages if you have to change it"
    'semicolon-separator': ';&#32;',
    'pipe-separator': '&#32;|&#32;',
    'parentheses': '($1)',
    // Revision deletion
    'rev-deleted-comment': '(edit summary removed)',
    'rev-deleted-user': '(username removed)',
    'rev-deleted-event': '(log action removed)',
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/ArticleComments/ArticleComments.i18n.php
    'article-comments-rc-comment': 'Article comment (<span class="plainlinks">[$1 $2]</span>)',
    'article-comments-rc-comments': 'Article comments ([[$1]])',
    'and': '&#32;and',
    // Wiki Infobar
    'recentchanges': 'Recent changes',
    'newpages': 'New pages',
    'newimages': 'New photos',
    'log': 'Logs',
    'insights': 'Insights',
    'randompage': 'Random page',
    'group-sysop': 'Administrators',
    'group-user': 'Users',
    'prefs-files': 'Files',
    'awc-metrics-articles': 'Articles',
    'awc-metrics-edits': 'Edits',
    // Other
    'filedelete-success': "'''$1''' has been deleted.",
    'shared_help_was_redirect': 'This page is a redirect to $1',
    'specialvideos-btn-load-more': 'Load More',
    'flags-edit-modal-close-button-text': 'Close',
    'awc-metrics-images': 'Images',
    'wikifeatures-promotion-new': 'New',
    'wikiacuratedcontent-content-empty-section': 'This section needs some items',
    'myhome-feed-edited-by': 'edited by $1',
    'edit-summary': 'Edit summary',
    'wikiaPhotoGallery-conflict-view': 'View the current page',
    'app-loading': 'Loading...',
    'wikia-hubs-remove': 'Remove',
    'undeletelink': 'view/restore',
    'admindashboard-control-analytics-label': 'Analytics',
    /***************************
    * Diff Modal
    ****************************/
    'revisionasof': 'Revision as of $1',
    'editold': 'edit',
    'editundo': 'undo',
    /***************************
    * Log Names - wgLogHeaders
    ****************************/
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/languages/messages/MessagesEn.php
    'blocklogpage': 'Block log',
    'dellogpage': 'Deletion log',
    'importlogpage': 'Import log',
    'mergelog': 'Merge log',
    'movelogpage': 'Move log',
    'protectlogpage': 'Protection log',
    'uploadlogpage': 'Upload log',
    'newuserlogpage': 'User creation log',
    'rightslog': 'User rights log',
    // ## Non-standard Mediawiki logs ##
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/UserProfilePageV3/UserProfilePage.i18n.php
    'useravatar-log': 'User avatar log',
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/UserRenameTool/SpecialRenameuser.i18n.php
    'userrenametool-logpage': 'User rename log',
    // ## Wiki Features ##
    // https://github.com/Wikia/app/blob/bf1e586c95224922577b6feea8293df341265a44/extensions/wikia/WikiFeatures/WikiFeatures.i18n.php
    'wikifeatures-log-name': 'Wiki Features log',
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/Chat2/Chat.i18n.php
    'chat-chatban-log': 'Chat ban log',
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/WikiaMaps/WikiaMaps.i18n.php
    'wikia-interactive-maps-log-name': 'Maps log',
    // ## Extensions ##
    // https://git.wikimedia.org/blob/mediawiki%2Fextensions%2FAbuseFilter/be09eabbdd591fb869b30cd4e77a286763cbe4e1/i18n%2Fen.json
    'abusefilter-log': 'Abuse filter log',
    /***************************
    * Log Actions -
    ****************************/
    // https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/languages/messages/MessagesEn.php
    // Block
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
    // Delete
    'logentry-delete-delete': '$1 deleted page $3',
    'logentry-delete-restore': '$1 restored page $3',
    'logentry-delete-event': '$1 changed visibility of {{PLURAL:$5|a log event|$5 log events}} on $3: $4',
    'logentry-delete-revision': '$1 changed visibility of {{PLURAL:$5|a revision|$5 revisions}} on page $3: $4',
    'logentry-delete-event-legacy': '$1 changed visibility of log events on $3',
    'logentry-delete-revision-legacy': '$1 changed visibility of revisions on page $3',
    'revdelete-content-hid': 'content hidden',
    'revdelete-summary-hid': 'edit summary hidden',
    // Import
    'import-logentry-upload': 'imported [[$1]] by file upload',
    'import-logentry-interwiki': 'transwikied $1',
    // Merge
    'pagemerge-logentry': 'merged [[$1]] into [[$2]] (revisions up to $3)',
    // Move
    'logentry-move-move': '$1 moved page $3 to $4',
    'logentry-move-move-noredirect': '$1 moved page $3 to $4 without leaving a redirect',
    'logentry-move-move_redir': '$1 moved page $3 to $4 over redirect',
    'logentry-move-move_redir-noredirect': '$1 moved page $3 to $4 over a redirect without leaving a redirect',
    // Protect
    'protectedarticle': 'protected "[[$1]]"',
    'modifiedarticleprotection': 'changed protection level for "[[$1]]"',
    'unprotectedarticle': 'removed protection from "[[$1]]"',
    'movedarticleprotection': 'moved protection settings from "[[$2]]" to "[[$1]]"',
    // Upload
    'uploadedimage': 'uploaded "[[$1]]"',
    'overwroteimage': 'uploaded a new version of "[[$1]]"',
    // New User
    'logentry-newusers-newusers': '$1 created a user account',
    'logentry-newusers-create': '$1 created a user account',
    'logentry-newusers-create2': '$1 created a user account $3',
    'logentry-newusers-autocreate': 'Account $1 was created automatically',
    // Rights
    'rightslogentry': 'changed group membership for $1 from $2 to $3',
    'rightslogentry-autopromote': 'was automatically promoted from $2 to $3',
    'rightsnone': '(none)',
    // ## Non-standard Mediawiki logs ##
    // User Avatar - https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/UserProfilePageV3/UserProfilePage.i18n.php
    'blog-avatar-changed-log': 'Added or changed avatar',
    'blog-avatar-removed-log': "Removed $1's avatars",
    // User Rename - https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/UserRenameTool/SpecialRenameuser.i18n.php
    'userrenametool-success': 'The user "$1" has been renamed to "$2".',
    // ## Wiki Features ##
    // Wiki Features - https://github.com/Wikia/app/blob/bf1e586c95224922577b6feea8293df341265a44/extensions/wikia/WikiFeatures/WikiFeatures.i18n.php
    // Chat - https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/Chat2/Chat.i18n.php
    'chat-chatbanadd-log-entry': 'banned $1 from chat with an expiry time of $2, ends $3',
    'chat-chatbanremove-log-entry': 'unbanned $1 from chat',
    'chat-chatbanchange-log-entry': 'changed ban settings for $1 with an expiry time of $2, ends $3',
    // Maps - https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/WikiaMaps/WikiaMaps.i18n.php
    'logentry-maps-create_map': '$1 created new map $3',
    'logentry-maps-update_map': '$1 updated map $3',
    'logentry-maps-delete_map': '$1 deleted map $3',
    'logentry-maps-undelete_map': '$1 restored map $3',
    'logentry-maps-create_pin_type': '$1 created new pin category for $3',
    'logentry-maps-update_pin_type': '$1 updated pin category for $3',
    'logentry-maps-delete_pin_type': '$1 deleted pin category for $3',
    'logentry-maps-create_pin': '$1 created new pin for $3',
    'logentry-maps-update_pin': '$1 updated pin for $3',
    'logentry-maps-delete_pin': '$1 deleted pin for $3',
    // // ## Extensions ##
    // // Abuse Filter - https://git.wikimedia.org/blob/mediawiki%2Fextensions%2FAbuseFilter/be09eabbdd591fb869b30cd4e77a286763cbe4e1/i18n%2Fen.json
    // "abusefilter-log-entry-modify" : "modified $1 ($2)",
    // "abusefilter-log-detailslink" : "details",
    /***************************
    * Wall - https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/Wall/Wall.i18n.php#L191
    ****************************/
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
    /***************************
    * Forum Boards - https://github.com/Wikia/app/blob/808a769df6cf8524aa6defcab4f971367e3e3fd8/extensions/wikia/Forum/Forum.i18n.php#L113
    ****************************/
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
    /***************************
    * Discussions
    ****************************/
    'discussions': 'Discussions',
    'forum-related-discussion-heading': 'Discussions about $1',
    'embeddable-discussions-loading': 'Loading Discussions...',
    /***************************
    * AbuseFilter
    ****************************/
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
// http://download.remysharp.com/wiki2html.js
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
        // bold
        .replace(/'''(.*?)'''/g, function (m, l) {
        return '<strong>' + l + '</strong>';
    })
        // italic
        .replace(/''(.*?)''/g, function (m, l) {
        return '<em>' + l + '</em>';
    })
        // normal link
        .replace(/[^\[](http[^\[\s]*)/g, function (m, l) {
        return '<a href="' + l + '">' + l + '</a>';
    })
        // format string by replacing wiki $1 string vars with text.
        .replace(/\$(\d+)/g, function (match, number) {
        return typeof pArgs[number - 1] != 'undefined' ? pArgs[number - 1] : match;
    })
        // internal link or image
        .replace(/\[\[(.*?)\]\]/g, function (m, l) {
        var p = l.split(/\|/);
        var link = p.shift();
        // if (link.match(/^Image:(.*)/)) {
        // 	// no support for images - since it looks up the source from the wiki db
        // 	return m;
        // } else {
        return '<a href="' + link + '">' + (p.length ? p.join('|') : link) + '</a>';
        // }
    })
        // external link
        .replace(/[\[](https?:\/\/.*|\/\/.*)[!\]]/g, function (m, l) {
        var p = l.replace(/[\[\]]/g, '').split(/ /);
        var link = p.shift();
        return '<a href="' + link + '">' + (p.length ? p.join(' ') : link) + '</a>';
    })
        /*******************************************************************************
         * https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.language
         *******************************************************************************/
        // {{GENDER}} - cannot be checked by script, so just uses {{{1}}}/{{{2}}}
        .replace(/{{GENDER:(.*?)}}/g, function (m, l) {
        var p = l.split("|");
        var user = p.shift(); // Remove user object from list
        return mw.language.gender(ConstantsApp_1["default"].userOptions.gender, p);
    })
        // {{PLURAL}} - only does default support
        .replace(/{{PLURAL:(.*?)}}/g, function (m, l) {
        var p = l.split("|");
        var num = p.shift();
        return mw.language.convertPlural(num, p);
    })
        // {{GRAMMAR}}
        .replace(/{{GRAMMAR:(.*?)}}/g, function (m, l) {
        var p = l.split("|");
        //let num = p.shift();
        return mw.language.convertGrammar(p[1], p[0]);
    });
};
exports["default"] = i18n;

},{"./ConstantsApp":1}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
// Double check that script can run; should always be true due to loader, but check is here just encase.
var appConfig = (window.dev = window.dev || {}).RecentChangesMultiple = window.dev.RecentChangesMultiple || {};
if (document.querySelectorAll('.rc-content-multiple, #rc-content-multiple')[0] == undefined) {
    console.log("RecentChangesMultiple tried to run despite no data. Exiting.");
}
else {
    Main_1["default"].init(appConfig);
    window.dev.RecentChangesMultiple.app = Main_1["default"];
}

},{"./Main":2}]},{},[15]);
//</syntaxhighlight>