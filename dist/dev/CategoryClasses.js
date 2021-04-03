/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    
    "use strict";
    
    if (window.andrewds1021 && window.andrewds1021.category_classes
        && window.andrewds1021.category_classes.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            category_classes: {}
        };
    } else if (!window.andrewds1021.category_classes) {
        window.andrewds1021.category_classes = {};
    }
    window.andrewds1021.category_classes.has_run = true;
    
    var config = mw.config.get([
        "wgPageName",
        "wgVersion"
    ]);
    var request = {
        action: "query",
        titles: config.wgPageName,
        prop: "categories",
        cllimit: "max",
        indexpageids: true,
        meta: "siteinfo",
        siprop: "namespaces"
    };
    var trim_idx = 0;
    var api;
    
    function run() {
        api.get(request).then(function (data) {
            if (data && data.query) {
                if (data.query.namespaces && data.query.namespaces["14"]
                    && data.query.namespaces["14"]["*"]) {
                    delete request.meta;
                    delete request.siprop;
                    trim_idx = data.query.namespaces["14"]["*"].length + 1;
                }
                if (data.query.pageids && data.query.pages && data.query.pageids[0]
                    && data.query.pages[data.query.pageids[0]]
                    && data.query.pages[data.query.pageids[0]].categories) {
                    data.query.pages[data.query.pageids[0]].categories
                        .forEach(function (val) {
                        if (!val.title) return;
                        document.body.classList.add("category-"
                            + val.title.substring(trim_idx)
                            .replace(/[\x00-\x20!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~]|\xC2\xA0/g,
                            "_").replace(/_+/g, "_").replace(/_$/, "")
                            .replace(/^_/, ""));
                    });
                }
            }
            if ((config.wgVersion === "1.19.24") && data && data["query-continue"]
                && data["query-continue"].categories
                && data["query-continue"].categories.clcontinue) {
                request.clcontinue = data["query-continue"].categories.clcontinue;
                run();
            } else if (data && data["continue"] && data["continue"].clcontinue) {
                request.clcontinue = data["continue"].clcontinue;
                run();
            }
        });
    }
    
    mw.loader.using("mediawiki.api").then(function () {
        api = new mw.Api();
        run();
    });
    
})();