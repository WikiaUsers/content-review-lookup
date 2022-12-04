/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

/*
 * The following code imports '/style.css' to the current page.
 * It also imports the '/style.css' subpage of all pages transcluded in the current page.
 * Only pages under (Main), User, Project, Template, Help namespaces will have styles imported into them.
 * And only '/style.css' subpages under these namespaces can be imported.
 */
mw.loader.using("mediawiki.util", function () {
    var config = mw.config.get([
        "wgArticleId",
        "wgNamespaceNumber",
        "wgPageName"
    ]);
    var allowedNS = [0, 2, 4, 10, 12];
    if (config.wgArticleId == 0 || !allowedNS.includes(config.wgNamespaceNumber)) { return; }
    //wgArticleId evaluates to 0 when the page does not exist

    var stylesheets = [config.wgPageName.replace("&", "%26") + "/style.css"];
    var tlquery = {
        action: "query",
        pageids: config.wgArticleId,
        format: "json",
        formatversion: 2,
        prop: "templates",
        tlnamespace: allowedNS.join("|"),
        tllimit: 500
    };
    var rvquery = {
        action: "query",
        format: "json",
        formatversion: 2,
        prop: "revisions",
        rvslots: "*",
        rvprop: "content"
    };

    mw.hook("pageStyles.getTemplates").add(function (tlcontinue) {
        if (tlcontinue) { tlquery.tlcontinue = tlcontinue; }
        $.get(mw.util.wikiScript("api"), tlquery, function (obj) {
            if (typeof obj == "object" && obj.batchcomplete && obj.query.pages[0].templates) {
                var templates = obj.query.pages[0].templates;
                templates.forEach(function (t) {
                    if (allowedNS.includes(t.ns)) {
                        stylesheets.push(t.title.replace("&", "%26") + "/style.css");
                    }
                });
                if (obj.continue) {
                    mw.hook("pageStyles.getTemplates").fire(obj.continue.tlcontinue);
                }
                else {
                    mw.hook("pageStyles.getStyles").fire(0);
                }
            }
            else {
                mw.hook("pageStyles.getStyles").fire(0);
            }
        });
    });

    mw.hook("pageStyles.getStyles").add(function (i) {
        rvquery.titles = stylesheets.slice(i * 50, Math.min((i + 1) * 50, stylesheets.length)).join("|");
        $.get(mw.util.wikiScript("api"), rvquery, function (obj) {
            if (typeof obj == "object" && obj.batchcomplete) {
                obj.query.pages.forEach(function (p) {
                    if (p.missing) { return; }
                    mw.util.addCSS(p.revisions[0].slots.main.content);
                });
                if ((i + 1) * 50 < stylesheets.length) {
                    mw.hook("pageStyles.getStyles").fire(i + 1);
                }
            }
        });
    });

    mw.hook("pageStyles.getTemplates").fire();
});

/*
 * A faster alternative to importing stylesheets where API requests are not needed
 * HTML class "transcluded-css" comes from [[Template:CSS]]
 * After this CSS importing method is approved, the previous one will be removed soon
 */
mw.loader.using("mediawiki.util", function() {
	$("span.transcluded-css").each(function() {
		mw.util.addCSS($(this).text());
		$(this).remove();
	});
});