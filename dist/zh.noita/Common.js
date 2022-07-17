/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */

// 注意有不知道哪里来的js把$占用了, 不要直接引用window.$
mw.loader.using(['jquery', 'mediawiki.api']).then(function () {
    "use strict";

    const $ = window.jQuery;
    // 这里要注意, 不同的fandom皮肤这个可能不一样, 比如.page-content只有左侧那款皮肤才有
    const $root = $('div#content:first');
    const api = new mw.Api();

    // ===== Tooltips start =====
    // See [[https://wowpedia.fandom.com/wiki/Help:Tooltips]]
    const Tooltips = {hideClasses: [], cache: {}, activeHover: false, enabled: true, activeVersion: ''};
    var $tfb, $ttfb, $htt;

    function hideTip(e) {
        $tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
        $tfb.children().remove();
        if ($(e.currentTarget).data('ahl-id') === Tooltips.activeHover) Tooltips.activeHover = null;
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
    function showTipFromCacheEntry(e, wikiText, dataSelector) {
        var element = Tooltips.cache[wikiText];
        if (!element.length) {
            $tfb.html('<div class="portable-infobox"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
        } else {
            element.find(dataSelector).css("display", "").addClass("portable-infobox");
            $tfb.html(element);
        }
        displayTip(e);
    }

    // 将法术内容替换，使用这种方式是为了减少网络请求
    function replaceSpellInfoBoxData(templateName, wikiText, $e) {
        const $newEle = $(Tooltips.cache[templateName]);

        const $dataSourceArr = $newEle.find('[data-source]');
        const dataMap = $e.data();
        const usageDataKeys = {};

        // 1. 元素中有，但数据中没有的，应把元素移除
        // 2. 元素中有，数据中也有的，应将元素值替换
        // 3. 元素中没有，但数据中有的，应添加元素；为了简化代码，使用一个包含所有元素的页面来作为模板
        $dataSourceArr.each(function (_, e) {
            const dataSource = e.dataset.source;
            if (dataSource === 'baseName') {
                e.innerText = dataMap.tpname;
                return;
            } else if (dataSource === 'image') {
                const bgPositionX = (dataMap.tpsortid - 1) * -80;
                e.innerHTML = '<div class="sprite-spell-bg-80px" ' +
                    'style="background-position-x: ' + bgPositionX + 'px;height: 80px;width: 80px;margin: 0 auto;"></div>';
                return;
            }
            var children = e.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].tagName !== 'DIV') continue;
                var dataKey = 'tp' + dataSource.toLowerCase();
                var dataValue = dataMap[dataKey];
                if (dataValue === null || dataValue === undefined || dataValue === '') {
                    e.remove();
                } else {
                    children[i].innerText = dataValue;
                    usageDataKeys[dataKey] = true;
                }
                break;
            }
        });

        Tooltips.cache[wikiText] = $newEle;
    }

    function showTip(e) {
        if (!Tooltips.enabled) return;
        const $t = $(e.currentTarget), ks = Tooltips.hideClasses, $p = $t.parent();
        if ($p.hasClass("selflink")) {
            return;
        }
        for (var j = 0; j < ks.length; j++) {
            if ($t.hasClass(ks[j])) return;
        }
        const templateName = $t.data('templateName');
        // 用于渲染的文本
        const wikiText = '{{' + templateName + '|name=' + $t.data('spellName') + '}}';
        // 此参数用于从返回的数据中选择要显示的元素
        var dataSelector = "aside:first";
        // 唯一标识，用于处理多个悬浮框触发时的情况。比如A正在加载悬浮窗，此时又触发了B的悬浮窗事件，那么A就不该显示
        const tipId = wikiText + ' ' + dataSelector;
        Tooltips.activeHover = tipId;
        $t.data('ahl-id', tipId);

        // 直接从缓存中获取
        if (Tooltips.cache[wikiText])
            return showTipFromCacheEntry(e, wikiText, dataSelector);

        // 如果使用已有的参数，而不是从网络请求
        // 使用 data-tp="true" 来指定开启此选项
        if ($t.data('tp')) {
            if (Tooltips.cache[templateName]) {
                replaceSpellInfoBoxData(templateName, wikiText, $t);
                return showTipFromCacheEntry(e, wikiText, dataSelector);
            }
            // 加载一个包含所有元素的模板，这样之后只需要替换及删除即可
            api.get({
                action: 'parse',
                text: '{{' + $t.data('templateFull') + '}}',
                contentmodel: 'wikitext'
            }).done(function (data) {
                var text;
                if (data && data.parse && data.parse.text)
                    text = data.parse.text['*'];
                if (!text) return;

                Tooltips.cache[templateName] = text;
                if (tipId !== Tooltips.activeHover) return;
                replaceSpellInfoBoxData(templateName, wikiText, $t);
                return showTipFromCacheEntry(e, wikiText, dataSelector);
            });
            return;
        }

        api.get({
            action: 'parse',
            text: wikiText,
            contentmodel: 'wikitext'
        }).done(function (data) {
            var text;
            if (data && data.parse && data.parse.text)
                text = data.parse.text['*'];
            if (!text) return;

            Tooltips.cache[wikiText] = $(text);
            if (tipId !== Tooltips.activeHover) return;
            showTipFromCacheEntry(e, wikiText, dataSelector);
        });
    }

    +function ($root) {
        if (!$tfb) {
            $root.append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
            $tfb = $("#tfb");
            $ttfb = $("#templatetfb");
            $htt = $("#tfb,#templatetfb");
        }
        $root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
        $root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function () {
            var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
            if (cn) $(this).find("span.ajaxttlink").addClass(cn);
        });
        $root.find("span.ajaxttlink").each(function () {
            var $t = $(this), $p = $t.parent(), $pp = $p.parent(); // 此处的pp是带有ajaxoutertt的元素
            if ($p.hasClass("selflink")) {
                return;
            }
            var ppDataMap = $pp.data();
            Object.keys(ppDataMap).forEach(function (dataKey) {
                var dataValue = ppDataMap[dataKey];
                if (dataValue === '' || dataValue === null || dataValue === undefined) return;
                if (dataKey.startsWith('tp')) {
                    dataKey = dataKey.toLowerCase();
                }
                $t.data(dataKey, dataValue);
            });
            $pp.removeAttr($.map($pp[0].attributes, function(attr){return attr.name})
            .filter(function (k) {
                return k.startsWith('data-tp');
            }).join(' '))
            .removeAttr('data-template-name data-template-full data-spell-name');
            $t.on("mouseenter", showTip)
                .on("mouseleave", hideTip)
                .on("mousemove", moveTip);
            $t.removeAttr("title");
        });
    }($root);
    // ===== Tooltips end =====

    // for hover gifs
    $root.find("div.hover-gif img").each(function (i, obj) {
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