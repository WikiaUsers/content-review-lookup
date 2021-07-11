/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */

// 注意有不知道哪里来的js把$占用了, 不要直接引用window.$
jQuery(function () {
    "use strict";

    const $ = window.jQuery;
    const article = "#content";

    // ===== Tooltips start =====
    // See [[https://wowpedia.fandom.com/wiki/Help:Tooltips]]
    const Tooltips = {hideClasses: [], cache: {}, activeHover: false, enabled: true, activeVersion: ''};
    var $tfb, $ttfb, $htt;

    function hideTip() {
        $tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
        $tfb.children().remove();
        if ($(this).data('ahl-id') === Tooltips.activeHover) Tooltips.activeHover = null;
    }

    function displayTip(e) {
        $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
        moveTip(e);
        $htt.not(":empty").css("visibility", "visible");
        moveTip(e);
    }

    function moveTip(e) {
        var $ct = $htt.not(":empty");
        var eh = $ct.innerHeight() + 20, wh = $(window).height();
        var newTop = e.clientY + ((e.clientY > (wh / 2)) ? -eh : 20);
        var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + 20) : 20);
        newTop = Math.max(105, Math.min(wh - eh, newTop));
        $ct.css({"position": "fixed", "top": newTop + "px", "left": newLeft + "px"});
    }

    // AJAX tooltips
    function showTipFromCacheEntry(e, url, tag) {
        var h = Tooltips.cache[url + " " + tag];
        if (!h) {
            h = Tooltips.cache[url].find(tag);
            if (h.length) Tooltips.cache[url + " " + tag] = h;
        }
        if (!h.length) {
            $tfb.html('<div class="portable-infobox"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
        } else {
            h.css("display", "").addClass("portable-infobox");
            $tfb.html(h);
        }
        displayTip(e);
    }

    function showTip(e) {
        if (!Tooltips.enabled) return;
        var $t = $(this), ks = Tooltips.hideClasses, $p = $t.parent();
        if ($p.hasClass("selflink")) {
            return;
        }
        for (var j = 0; j < ks.length; j++) {
            if ($t.hasClass(ks[j])) return;
        }
        var tooltipIdentifier = "aside:first",
            tooltipTag = $t.attr("class").match(/taggedttlink(-[^\s]+)/);
        if ($t.hasClass("versionsttlink")) tooltipIdentifier += Tooltips.activeVersion;
        else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
        var url = "/zh/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'aside[class*="portable-infobox"]';
        var tipId = url + " " + tooltipIdentifier;
        Tooltips.activeHover = tipId;
        $t.data('ahl-id', tipId);
        if (Tooltips.cache[url] != null) return showTipFromCacheEntry(e, url, tooltipIdentifier);
        $('<div style="display: none"/>').load(url, function (text) {
            if (!text) return; // Occurs when navigating away from the page cancels the XHR
            Tooltips.cache[url] = $(this);
            if (tipId !== Tooltips.activeHover) return;
            showTipFromCacheEntry(e, url, tooltipIdentifier);
        });
    }

    +function (root) {
        if ($tfb == null) {
            $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
            $tfb = $("#tfb");
            $ttfb = $("#templatetfb");
            $htt = $("#tfb,#templatetfb");
        }
        root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
        root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function () {
            var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
            if (cn) $(this).find("span.ajaxttlink").addClass(cn);
        });
        root.find("span.ajaxttlink").each(function () {
            var $t = $(this), $p = $t.parent();
            if ($p.hasClass("selflink")) {
                return;
            }
            // var pageName = $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F");
            var pageName = $p.attr("href").split('/').pop().replace("?", "%3F");
            $t.data("tt", pageName).on("mouseenter", showTip).on("mouseleave", hideTip).mousemove(moveTip);
            $t.removeAttr("title");
        });
    }($(article));
    // ===== Tooltips end =====

    // for hover gifs
    $("div.hover-gif img").each(function (i, obj) {
        var $canvas = $("<canvas width='" + $(obj).attr("width") + "' height='" + $(obj).attr("height") + "'></canvas>");
        $(obj).parent().append($canvas);
        var ctx = $canvas[0].getContext("2d");
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
        img.src = obj.src;
    });

});