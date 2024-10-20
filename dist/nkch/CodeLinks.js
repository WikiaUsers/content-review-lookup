/* CodeLinks.css • Не вики (https://nkch.fandom.com) */
/* Original code: https://en.wiktionary.org/wiki/MediaWiki:Gadget-CodeLinks.js */
/* [[Category:JS]], [[Category:JS - Преимущественно импорт]] */

$(function () {
    'use strict';
    // by John Gruber, from https://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var URLRegExp = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

    function processComment(node) {
        var wikilinkMatch, templateMatch, URLMatch,
            textNode = node.firstChild;

        while ((wikilinkMatch = (/\[\[([^|{}\[\]\n]+)?(?:\|.*?)?]]/).exec(textNode.data)) || (templateMatch = (/(\{\{(?:#invoke:)?)([^|{}\[\]\n#]+)(?=\||}})/i).exec(textNode.data)) || (URLMatch = URLRegExp.exec(textNode.data))) {
            var link = document.createElement('a'),
                start = (wikilinkMatch || templateMatch || URLMatch).index,
                linkText;

            link.classList.add("code-link");

            if (URLMatch) {
                var URL = URLMatch[0];

                link.href = URL;

                linkText = URL;
            }
            else {
                var fullPageName;

                if (wikilinkMatch) {
                    linkText = wikilinkMatch[0];

                    fullPageName = wikilinkMatch[1];
                }
                else if (templateMatch) {
                    var prefix = templateMatch[1],
                        pageName = templateMatch[2];

                    linkText = pageName;

                    fullPageName = (prefix === '{{#invoke:' ? 'Module:' : 'Template:')
                        + pageName;

                    link.title = fullPageName;

                    start += prefix.length;
                }

                link.href = mw.util.getUrl(fullPageName);
            }

            var beforeLink = textNode.data.substring(0, start),
                afterLink = textNode.data.substring(start + linkText.length);

            textNode.data = afterLink;

            link.appendChild(document.createTextNode(linkText));

            node.insertBefore(link, textNode);

            node.insertBefore(document.createTextNode(beforeLink), link);

            wikilinkMatch = templateMatch = URLMatch = null;
        }
    }

    function each(coll, walk) {
        return Array.from(coll).forEach(walk);
    }

    each(document.querySelectorAll(".mw-highlight"), function (codeBlock) {
        each(["c", "c1", "cm"], function (commentClass) {
            each(codeBlock.getElementsByClassName(commentClass), processComment);
        });
    });

    var copyArray = Array.from ? Array.from.bind(Array) :
        function copyArray(array) {
            return Array.prototype.slice.call(array);
        };

    var moduleNames = [],
        dataModuleNames = [];

    var functionNames = document.querySelectorAll(".nb");

    functionNames.forEach(function (name) {
        var text = name.firstChild.nodeValue;

        if (text !== "require")
            return;

        var next = name.nextElementSibling;
        var nextText = next && next.firstChild && next.firstChild.nodeValue;
        var hasParenthesis = nextText === "(";

        if (hasParenthesis) {
            next = next.nextElementSibling;

            nextText = next && next.firstChild && next.firstChild.nodeValue;
        }

        var classList = next.classList;

        if (!(classList.contains("s1") || classList.contains("s2")))
            return;

        var string = next;
        var stringValue = nextText;

        if (!stringValue)
            return;

        next = next.nextElementSibling;

        nextText = next && next.firstChild && next.firstChild.nodeValue;

        if (hasParenthesis && nextText && nextText[0] !== ")")
            return;

        moduleNames.push(string);
    });

    var strings = copyArray(document.querySelectorAll(".s1"))
        .concat(copyArray(document.querySelectorAll(".s2")));

    Array.prototype.forEach.call(strings, function (string) {
        if (moduleNames.indexOf(string) !== -1)
            return;

        var stringValue = string.firstChild.nodeValue;

        if (!(/^["'](?:module|mod):/i).test(stringValue))
            return;

        var prev = string.previousElementSibling;
        var prevText = prev && prev.firstChild && prev.firstChild.nodeValue;

        if (prevText === "(") {
            var next = string.nextElementSibling;
            var nextText = next && next.firstChild && next.firstChild.nodeValue;

            if (!(nextText && nextText[0] === ")"))
                return;

            prev = prev.previousElementSibling;

            prevText = prev && prev.firstChild && prev.firstChild.nodeValue;
        }

        if (prevText !== "loadData")
            return;

        prev = prev.previousElementSibling;

        prevText = prev && prev.firstChild && prev.firstChild.nodeValue;

        if (prevText !== ".")
            return;

        prev = prev.previousElementSibling;

        prevText = prev && prev.firstChild && prev.firstChild.nodeValue;

        if (prevText !== "mw")
            return;

        dataModuleNames.push(string);
    });

    if (moduleNames.length > 0 || dataModuleNames.length > 0) {
        mw.loader.using("mediawiki.util").done(function () {
            function addLink(element, page) {
                if (!(element instanceof Element))
                    throw new TypeError("Expected Element object");

                var link = document.createElement("a");

                link.href = mw.util.getUrl(page);

                var firstChild = element.firstChild;

                if (!(firstChild instanceof Text))
                    throw new TypeError("Expected Text object");

                link.appendChild(firstChild);

                element.appendChild(link);
            }

            moduleNames.concat(dataModuleNames).forEach(function (module) {
                var stringValue = module.firstChild.nodeValue,
                    moduleName = stringValue.substring(1, stringValue.length - 1),
                    linkPage = (/^mod(?:ule)?:/i).test(moduleName) ? moduleName
                        : (/^dev?:/i).test(moduleName) ? "w:c:dev:" + moduleName.replace(/^dev?:/i, "Module:")
                            : "mw:Extension:Scribunto/Lua reference manual#" + moduleName;

                addLink(module, linkPage);
            });
        });
    }
});