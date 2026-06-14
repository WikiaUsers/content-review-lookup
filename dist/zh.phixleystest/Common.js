mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css")
            .attr("data-css-hash", $(this).attr("data-css-hash"))
            .attr("data-from", $(this).attr("data-from"))
            .attr("data-trigger", $(this).attr("data-trigger"));
        var trigger = $(this).attr("data-trigger");
        var triggerOpened = false;
        if (trigger != "none") {
            css.disabled = true;
            $(".triggerablecss-" + trigger).click(function () {
                css.disabled = !css.disabled;
                triggerOpened = true;
            });
        }
    });
});

// $.getJSON(mw.util.wikiScript("index"), {
//     title: "MediaWiki:Custom-ImportScripts.json",
//     action: "raw"
// }).done(function (result, status) {
//     if (status != "success" || typeof (result) != "object") return;
//     var scripts = result[mw.config.get("wgPageName")];
//     if (scripts) {
//         if (typeof (scripts) == "string") scripts = [scripts];
//         importScript(scripts);
//     }
// });

(function () {
    var page = mw.config.get('wgPageName') || '';
    var model = mw.config.get('wgPageContentModel');
    if (!page || model !== 'css') return;
    var rawUrl = mw.util.getUrl(page, { action: 'raw', ctype: 'text/css' });
    fetch(rawUrl, { credentials: 'same-origin' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function (cssText) {
            if (!cssText) return;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.setAttribute('data-injected-from', page);
            style.appendChild(document.createTextNode(cssText));
            document.head.appendChild(style);
        })
        .catch(function (err) {
            console.error('加载CSS源失败 : ', page, err);
        });
}());