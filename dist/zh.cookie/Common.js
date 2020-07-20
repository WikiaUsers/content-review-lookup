"use strict";
/* 此处的JavaScript将加载于所有用户每一个页面。 */

/**
 * 在鼠标移至文本与标题不同的 wikilink 上时, 弹出带有原标题的 tooltip - when the mouse hovers on a wikilink whose label differs from its link target, displays a tooltip that shows the title of the link target 
 * @author [[User:UnownHearn]]
 * @version 1 (2018/07/28)
*/
(function () {
    $(".WikiaArticle a[title]").hover(function () {
        if (this.className != "") { return; } // 作为 wikilink 的超链接没有 class
        var a = $(this);
        var title = a.attr("title");
        if (title != a.text()) {
            a.append($('<span class="wikilink-tooltip"/>').text(title));
        }
    }, function () {
        $(this).find(".wikilink-tooltip").remove();
    });
})();

/**
* 自动转换链接 - automatically converts texts to links
* @author [[User:UnownHearn]]
* @version 1.8 (2019/03/31)
*/
(function () {

    var rules = [{
        // 两字母 + 一串数字
        regex: /[a-zA-Z]{2}\d+/,
        link: function (text) {
            var base;
            switch (text.slice(0, 2)) {
                // niconico 主要
                case "sm": case "nm": base = "https://www.nicovideo.jp/watch/"; break;
                case "im": base = "https://seiga.nicovideo.jp/seiga/"; break;
                // bilibili
                case "av": base = "https://acg.tv/"; break;
                case "cv": /*专栏*/ base = "https://www.bilibili.com/read/"; break;
                case "am": /*音频*/ base = "https://www.bilibili.com/audio/"; break;
                case "ml": /*~~my~~medialist*/ base = "https://www.bilibili.com/medialist/play/"; break;
                // acfun
                case "ac": base = "http://www.acfun.cn/v/"; break;
                // niconico 其他, 参考: https://dic.nicovideo.jp/a/nico.ms
                case "sg": case "mg": case "bk": /*静画*/ base = "https://seiga.nicovideo.jp/watch/"; break;
                case "lv": /*生放送*/ base = "https://live.nicovideo.jp/watch/"; break;
                /* l/co 略去 */
                case "co": /*社区*/ base = "https://com.nicovideo.jp/community/"; break;
                case "ch": /*频道*/ base = "https://ch.nicovideo.jp/channel/"; break;
                case "ar": /*频道文章*/ base = "https://ch.nicovideo.jp/article/"; break;
                case "nd": /*直贩*/ base = "https://chokuhan.nicovideo.jp/products/detail/"; break;
                /* 市场略去 */
                case "ap": /*应用*/ base = "https://app.nicovideo.jp/app/"; break;
                case "jk": /*实况*/ base = "https://jk.nicovideo.jp/watch/"; break;
                case "nc": /*共有*/ base = "https://www.niconicommons.jp/material/"; break;
                case "nw": /*新闻*/ base = "https://news.nicovideo.jp/watch/"; break;
            }
            if (base !== undefined) { return base + text; }
            return null;
        }
    }, {
        // niconico mylist/ 及 user/
        regex: /(mylist|user)\/\d+/,
        link: "https://www.nicovideo.jp/{}"
    }];

    // Returns the url the given `linkableText` represents (E.g. "sm3777" => "https://nicovideo.jp/watch/sm3777")
    function generateLink(rule, linkableText) {
        if (typeof rule.link === "function") {
            var link = rule.link(linkableText);
            if (link !== null && typeof link !== "string") {
                throw "The return value of link() must be either a string or null!";
            }
            return link;
        } else {
            return rule.link.replace("{}", linkableText);
        }
    }

    // Creates an <a>nchor element with given url `link` and `text`
    //
    // the returned element has one and only one text node as its child.
    function createAnchorElement(link, text) {
        return $("<a/>").addClass("autolink").attr("href", link).text(text).get(0);

        // var a = document.createElement("a");
        // a.className = "autolink";
        // a.href = link;
        // a.textContent = text;
        // return a;
    }

    // Tries detaching a linkable text from given `text` with given `rules`
    //
    // If `text` matches a rule, it will return a tuple contains: 
    //      text before the linkable text,
    //      <a>nchor element that represents the linkable text (or a text node if the text is actually not linkable),
    //      text after the linkable text;
    // Otherwise, it will return a tuple contains: "", null, and the original text.
    function detachLinkableText(text, rules) {
        var textBefore = "";
        var node = null;
        var textAfter = text;
        var lastMatch = null;
        for (var ruleIndex in rules) {
            var rule = rules[ruleIndex];
            var match = rule.regex.exec(text);
            if (match != null && (lastMatch === null || match.index < lastMatch.index)) {
                lastMatch = match;
                textBefore = text.slice(0, match.index);

                var linkableText = match[0];
                var link = generateLink(rule, linkableText);
                if (link == null) {
                    node = document.createTextNode(linkableText);
                } else {
                    node = createAnchorElement(link, linkableText);
                }

                textAfter = text.slice(match.index + linkableText.length);
            }
        }
        return [textBefore, node, textAfter];
    }

    function main() {
        var foundTextNodes = [];

        { //< put all text nodes that under `.WikiaArticle` elements but not under `a` or `.no-autolink` elements into `foundTextNodes`
            var articles = document.getElementsByClassName("WikiaArticle");
            var filter = (function (node) {
                if (node.nodeType == 3 /* TEXT_NODE */) {
                    return NodeFilter.FILTER_ACCEPT;
                } else if (node.nodeType != 1 /* ELEMENT_NODE */
                    || node.tagName.toLowerCase() == "a"
                    || node.classList.contains("no-autolink")) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_SKIP;
            })
            Array.prototype.forEach.call(articles, function (article) {
                var walker = document.createTreeWalker(article, NodeFilter.SHOW_ALL, { acceptNode: filter });
                while (walker.nextNode()) {
                    foundTextNodes.push(walker.currentNode);
                }
            })
        }

        for (var nodeIndex in foundTextNodes) {
            var foundTextNode = foundTextNodes[nodeIndex];
            var remainText = foundTextNode.textContent;
            // this array will only contain text nodes and <a>nchor element nodes that have text nodes
            var nodes = [];

            while (true) {
                var oldRemainText = remainText;

                var rets = detachLinkableText(remainText, rules);
                var textBefore = rets[0];
                var elem = rets[1];
                remainText = rets[2];
                if (elem === null) {
                    // no rule matches
                    break;
                }
                if (textBefore !== "") {
                    nodes.push(document.createTextNode(textBefore));
                }
                nodes.push(elem);

                // `detachLinkableText()` splits the `remainText` into 3 parts: `textBefore`, `elem`, and the new `remainText`.
                // as long as `elem` is not null, the new `remainText` will always be shorter than the old one.
                //
                // this check ensures that the outer `while (true)` loop won't be an infinite loop even if `detachLinkableText()` not working properly
                if (remainText.length >= oldRemainText.length) {
                    throw "oof";
                }
            }

            if (nodes.length !== 0) { //< check if need to replace the original node
                nodes.push(document.createTextNode(remainText));
                $(foundTextNode).replaceWith(nodes);
            }
        }
    }

    main();

})();

/**
 * 通过链接切换并跳转到指定的 Tabber Tab 或 tab 中的锚 - make it possible to toggle and scroll into a designated Tabber Tab or an anchor inside that tab
 * @author [[User:UnownHearn]]
 * @version 0.2 (2019/08/29)
*/
(function () {

    // https://stackoverflow.com/a/37829643
    function scrollIntoViewIfNeeded(target) {
        var rect = target.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            target.scrollIntoView();
        }
    }

    var textDecoder = new TextDecoder("utf-8");
    var re = /(\.[0-9A-F]{2})+/g;

    // unescape texts like ".E6.98.9F.E7.A9.BA"
    // into normal strings like "星空"
    function unescapeMediawikiAnchorText(text) {
        return text.replace(re, function (x) {
            var arr = new Uint8Array(x.length / 3);
            for (var i = 0; i < x.length / 3; i++) {
                arr[i] = parseInt(x[i * 3 + 1] + x[i * 3 + 2], 16);
            }
            return textDecoder.decode(arr);
        })
    }

    // recursively switch to the target tabber tab, along with its ancestors
    function toggleTabberTab(tab) {
        var tabber = tab.parent();

        var parentTab = tabber.closest(".tabbertab");
        if (parentTab.length !== 0) {
            toggleTabberTab(parentTab);
        }

        tabber.children(".tabbertab").each(function () {
            $(this).css("display", $(this).is(tab) ? "block" : "none");
        });

        tabber.children(".tabbernav").children("li").each(function () {
            if ($(this).children("a").attr("title") == tab.attr("title")) {
                $(this).addClass("tabberactive");
            } else {
                $(this).removeClass("tabberactive");
            }
        })
    }

    function tryTogglingAndScrollingIntoTabberTab(tabNameOrElementID) {
        var tab = null;
        var element = document.getElementById(tabNameOrElementID);
        if (element !== null) { // the target is an element
            tab = $(element).closest(".tabbertab");
        } else { // the target might be a tab
            var tabName = tabNameOrElementID;
            tabName = unescapeMediawikiAnchorText(tabName);
            tabName = tabName.replace(/"/g, '\\"'); // sanitize

            var q = ".WikiaArticle .tabbertab[title=\"" + tabName + "\"]";
            var tab = $(q);
            if (tab.length === 0) { // the target is not found
                return;
            }
        }

        toggleTabberTab(tab);

        if (element !== null) {
            scrollIntoViewIfNeeded(element);
        } else {
            // tab.get(0).scrollIntoView();
            scrollIntoViewIfNeeded(tab.parent().get(0));
        }
    }

    $(window).on('load hashchange', function () {
        var hash = window.location.hash;
        if (hash !== "") {
            tryTogglingAndScrollingIntoTabberTab(hash.slice(1));
        }
    });

}());