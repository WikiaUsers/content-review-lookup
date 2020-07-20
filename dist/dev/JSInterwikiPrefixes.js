/********************* this comment is 80 characters long *********************/


(function () {
    
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.js_interwiki_prefixes
        && window.andrewds1021.js_interwiki_prefixes.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            js_interwiki_prefixes: {}
        };
    } else if (!window.andrewds1021.js_interwiki_prefixes) {
        window.andrewds1021.js_interwiki_prefixes = {};
    }
    window.andrewds1021.js_interwiki_prefixes.has_run = true;
    
/* retrieve interwiki prefixes */
    var root = window.andrewds1021.js_interwiki_prefixes.root;
    if (typeof root === "string") {
        root = [root];
    } else if (!Array.isArray(root)) {
        root = [];
    }
    var fandom = window.andrewds1021.js_interwiki_prefixes.fandom;
    if (typeof fandom === "string") {
        fandom = [fandom];
    } else if (!Array.isArray(fandom)) {
        fandom = [];
    }
    var gamepedia = window.andrewds1021.js_interwiki_prefixes.gamepedia;
    if (typeof gamepedia === "string") {
        gamepedia = [gamepedia];
    } else if (!Array.isArray(gamepedia)) {
        gamepedia = [];
    }
    var prefixes = window.andrewds1021.js_interwiki_prefixes.prefixes;
    if (prefixes && typeof prefixes !== "object") {
        prefixes = {};
    }
    var prefix_keys = Object.keys(prefixes);
    
/* if no prefixes, return */
    if (root.length == 0 && fandom.length == 0 && gamepedia.length == 0
        && prefix_keys.length == 0) return;
    
/* look for relevant page components and declare variables */
    var article_placeholder = document.querySelector("#mw-content-text > .noarticletext");
    var redlinks = document.querySelectorAll("a.new[data-uncrawlable-url]");
    var url, link;
    
/*
if current page doesn't exist and has a recognized prefix, redirect

  waiting for the page to load should allow real interwiki prefixes and
  existing pages to remain unaffected by redirection

if current page exists and has redlinks, redirect redlinks that have
  a recognized prefix

  this requires processing all redlinks on page load rather than one
  at a time on mousedown event
*/
    if (article_placeholder) {
        url = getURL(location.pathname);
        if (!url) return;
        location.href = url;
    } else {
        for (var i = 0; i < redlinks.length; i++) {
            link = redlinks[i];
            jQuery(link).off("mousedown");
            link.href = atob(link.getAttribute("data-uncrawlable-url"));
            url = getURL(link.pathname);
            if (!url) continue;
            link.href = url;
            link.title = url;
            link.classList.add("JSInterwikiPrefixes");
            link.classList.add("extiw");
            link.classList.remove("new");
        }
    }
    
    function getURL(pathname) {
/* declare variables and split URL into parts */
        var idx = pathname.indexOf("wiki/");
        var parts, prefix, result, is_known, entry;
        if (idx == 0 || idx == 1) {
            parts = pathname.substring(idx + 5).split(":");
        } else {
            return null;
        }
/* separate prefix from other parts and convert to lower case */
        prefix = parts.shift().toLowerCase();
/* if prefix for a specific wiki, generate URL to that wiki */
        is_known = prefix_keys.some(function (value) {
            return value === prefix;
        });
        if (is_known) {
            entry = prefixes[prefix];
            if (typeof entry === "string") {
                entry = {domain: entry};
            } else if (!entry) {
                entry = {};
            } else if (typeof entry !== "object") {
                entry = {gamepedia: true};
            }
            if (entry.gamepedia) {
                if (entry.domain) {
                    result = "https://" + entry.domain + ".gamepedia.com/";
                } else {
                    result = "https://help.gamepedia.com/";
                }
            } else {
                if (entry.domain) {
                    result = "https://community.fandom.com/wiki/c:"
                        + entry.domain;
                    if (parts[0]) result = result + ":";
                } else {
                    result = "https://community.fandom.com/wiki/";
                }
            }
        }
/*
if general Gamepedia prefix, generate URL to specified domain

prefer over specific wiki
*/
        is_known = gamepedia.some(function (value) {
            return value === prefix;
        });
        if (is_known && parts[0]) {
            result = "https://" + parts.shift().toLowerCase() + ".gamepedia.com/";
        } else if (is_known) {
            result = "https://help.gamepedia.com/";
        }
/*
if general Fandom prefix, generate Community Central URL

prefer over specific wiki and general Gamepedia
*/
        is_known = fandom.some(function (value) {
            return value === prefix;
        });
        if (is_known) {
            result = "https://community.fandom.com/wiki/";
            if (parts[0]) result = result + "c:" + parts.shift().toLowerCase();
            if (parts[0]) result = result + ":";
        }
/*
if prefix for wiki's root, generate URL

prefer over specific wiki, general Gamepedia, and general Fandom

designed to allow easy linking to things like Discussions posts
*/
        is_known = root.some(function (value) {
            return value === prefix;
        });
        if (is_known) {
            result = "https://" + location.hostname + "/";
        }
        return result + parts.join(":");
    }
    
})();