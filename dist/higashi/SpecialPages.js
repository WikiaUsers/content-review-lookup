// Credit go to Penguin-Pal 
// Modified it a  bit to make it works with AjaxRC
function SpecialPages() {
    /* data */
    var data = {
            pages: {}, // key = title, value = data
            ids: {}, // key = title, value = pageid
            specialPages: ["Longpages", "Newpages", "Protectedpages"],
            normalPages: ["Higashi_Light_Novel", "Higashi_New_Pages"]		
        },
        fn = {};

    /* functions */
    // json xhr
    fn.queryJsonUrl = function(url, cb) {
        var a = new XMLHttpRequest(),
            b;
        a.open("GET", url, true);
        a.onload = function() {
            b = JSON.parse(a.responseText);
            cb(b);
        };
        a.send();
    };

    // prepare ids of pages
    fn.preparePageIds = function(list, cb) {
        if (list.length > 0) {
            fn.queryJsonUrl(mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&titles=" + encodeURIComponent(list.splice(0, 100).join("|")), function(response) {
                var pages = response.query.pages,
                    pageid;
                for (pageid in pages) {
                    data.ids[pages[pageid].title] = pageid;
                }
                fn.preparePageIds(list, cb);
            });
        } else {
            cb();
        }
    };

    // prepare data of pages
    fn.preparePageData = function(ids, cb) {
        if (ids.length > 0) {
            fn.queryJsonUrl("/api/v1/Articles/Details?abstract=150&width=128&height=128&ids=" + ids.splice(0, 100).join(","), function(response) {
                var page,
                    pageid;
                for (pageid in response.items) {
                    page = response.items[pageid];
                    data.pages[page.title] = {
                        id: page.id,
                        title: page.title,
                        desc: page.abstract,
                        url: page.url,
                        src: page.thumbnail || mw.config.get("wgBlankImgUrl")
                    };
                }
                fn.preparePageData(ids, cb);
            });
        } else {
            cb();
        }
    };

    // generate markup
    fn.generateMarkup = function(list) {
        var nav = $('<nav class="special-pages-preview" />'),
            item,
            pg,
            columns = 3;
        list.forEach(function(page, i) {
            pg = data.pages[page];
            item = $('<a target="_blank" class="special-pages-preview-link" />').attr({
                href: pg.url,
                title: pg.title
            }).append(
                $('<img class="special-pages-preview-image" />').attr({
                    src: pg.src,
                    width: 128,
                    height: 128
                }),
                $('<span class="special-pages-preview-title" />').text(pg.title),
                $('<span class="special-pages-preview-description" />').text(pg.desc)
            );
            $('<div class="special-pages-preview-item" />').attr({
                "data-row": i % 3 + 1
            }).append(item).appendTo(nav);
            if (i % columns == 2) {
                $(nav).append('<br />');
            }
        });
        return nav;
    };

    // generate Normal page markup
    fn.generateNormalMarkup = function(list) {
        var nav = $('<nav class="normal-pages-preview" />'),
            item,
            pg,
            columns = 2;
        list.forEach(function(page, i) {
            pg = data.pages[page];
            item = $('<a target="_blank" class="normal-pages-preview-link" />').attr({
                href: pg.url,
                title: pg.title
            }).append(
                $('<img class="normal-pages-preview-image" />').attr({
                    src: pg.src,
                    width: 128,
                    height: 128
                }),
                $('<span class="normal-pages-preview-title" />').text(pg.title),
                $('<span class="normal-pages-preview-description" />').text(pg.desc)
            );
            $('<div class="normal-pages-preview-item" />').attr({
                "data-row": i % 2 + 1
            }).append(item).appendTo(nav);
            if (i % columns == 1) {
                $(nav).append('<br />');
            }
        });
        return nav;
    };
	

    // prepare pages
    fn.preparePages = function(list, cb) {
        fn.preparePageIds(list.concat(), function() {
            var ids = [];
            list.forEach(function(page) {
                ids.push(data.ids[page]);
            });
            fn.preparePageData(ids, function() {
                var nav = fn.generateMarkup(list);
                cb(nav);
            });
        });
    };
	
    // prepare normal pages
    fn.prepareNormalPages = function(list, cb) {
        fn.preparePageIds(list.concat(), function() {
            var ids = [];
            list.forEach(function(page) {
                ids.push(data.ids[page]);
            });
            fn.preparePageData(ids, function() {
                var nav = fn.generateNormalMarkup(list);
                cb(nav);
            });
        });
    };
	
    // get selectors for given normal page
    fn.getSpecialPageSelectors = function(specialPage) {
        var s = {
            wrapper: "ol.special",
            items: "ol.special li a"
        };
        switch (normalPage) {
            case "Sonako_Light_Novel":
                s.wrapper = "#mw-content-text .newpages > ul";
                s.items = "#mw-content-text .newpages > ul a.mw-newpages-pagename";
                break;
            case "Sonako_New_Pages":
                s.wrapper = "#mw-content-text > ul";
                s.items = "#mw-content-text > ul a.mw-newpages-pagename";
                break;
        }
        switch (specialPage) {
            case "Protectedpages":
                s.wrapper = "#mw-content-text > ul";
                s.items = "#mw-content-text > ul a";
                break;
            case "Newpages":
                s.wrapper = "#mw-content-text > ul";
                s.items = "#mw-content-text > ul a.mw-newpages-pagename";
                break;
            case "Longpages":
                s.items = "ol.special a:last-of-type";
                break;
        }
        return s;
    };
	
    /* implementations */
    var specialPage = mw.config.get("wgCanonicalSpecialPageName"),
        normalPage = mw.config.get("wgPageName"),
        specialPageContent = [],
        selectors;
    if (data.specialPages.indexOf(specialPage) > -1) {
        selectors = fn.getSpecialPageSelectors(specialPage);
        $(selectors.items).each(function() {
            specialPageContent.push($(this).text());
        });
        fn.preparePages(specialPageContent, function(nav) {
            $(selectors.wrapper).html(nav);
        });
    }
    if (data.normalPages.indexOf(normalPage) > -1) {
        selectors = fn.getSpecialPageSelectors(normalPage);
        $(selectors.items).each(function() {
            specialPageContent.push($(this).text());
        });
        fn.prepareNormalPages(specialPageContent, function(nav) {
            $(selectors.wrapper).html(nav);
        });
    }	
}

$(function() {
    $(SpecialPages);
    // ajaxrc support
    window.ajaxCallAgain = window.ajaxCallAgain || [];
    window.ajaxCallAgain.push(SpecialPages);
});

// For Duplicate page
$(function() {
    /* data */
    var data = {
            pages: {}, // key = title, value = data
            ids: {}, // key = title, value = pageid
            normalPages: ["Higashi_Light_Novel"]		
        },
        fn = {};

    /* functions */
    // json xhr
    fn.queryJsonUrl = function(url, cb) {
        var a = new XMLHttpRequest(),
            b;
        a.open("GET", url, true);
        a.onload = function() {
            b = JSON.parse(a.responseText);
            cb(b);
        };
        a.send();
    };

    // prepare ids of pages
    fn.preparePageIds = function(list, cb) {
        if (list.length > 0) {
            fn.queryJsonUrl(mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&titles=" + encodeURIComponent(list.splice(0, 100).join("|")), function(response) {
                var pages = response.query.pages,
                    pageid;
                for (pageid in pages) {
                    data.ids[pages[pageid].title] = pageid;
                }
                fn.preparePageIds(list, cb);
            });
        } else {
            cb();
        }
    };

    // prepare data of pages
    fn.preparePageData = function(ids, cb) {
        if (ids.length > 0) {
            fn.queryJsonUrl("/api/v1/Articles/Details?abstract=150&width=128&height=128&ids=" + ids.splice(0, 100).join(","), function(response) {
                var page,
                    pageid;
                for (pageid in response.items) {
                    page = response.items[pageid];
                    data.pages[page.title] = {
                        id: page.id,
                        title: page.title,
                        desc: page.abstract,
                        url: page.url,
                        src: page.thumbnail || mw.config.get("wgBlankImgUrl")
                    };
                }
                fn.preparePageData(ids, cb);
            });
        } else {
            cb();
        }
    };

    // generate Normal page markup
    fn.generateNormalMarkup = function(list) {
        var nav = $('<nav class="normal-pages-preview" />'),
            item,
            pg,
            columns = 2;
        list.forEach(function(page, i) {
            pg = data.pages[page];
            item = $('<a target="_blank" class="normal-pages-preview-link" />').attr({
                href: pg.url,
                title: pg.title
            }).append(
                $('<img class="normal-pages-preview-image" />').attr({
                    src: pg.src,
                    width: 128,
                    height: 128
                }),
                $('<span class="normal-pages-preview-title" />').text(pg.title),
                $('<span class="normal-pages-preview-description" />').text(pg.desc)
            );
            $('<div class="normal-pages-preview-item" />').attr({
                "data-row": i % 2 + 1
            }).append(item).appendTo(nav);
            if (i % columns == 1) {
                $(nav).append('<br />');
            }
        });
        return nav;
    };

    // prepare normal pages
    fn.prepareNormalPages = function(list, cb) {
        fn.preparePageIds(list.concat(), function() {
            var ids = [];
            list.forEach(function(page) {
                ids.push(data.ids[page]);
            });
            fn.preparePageData(ids, function() {
                var nav = fn.generateNormalMarkup(list);
                cb(nav);
            });
        });
    };
	
    // get selectors for given normal page
    fn.getSpecialPageSelectors = function(specialPage) {
        var s = {
            wrapper: "ol.special",
            items: "ol.special li a"
        };
        switch (normalPage) {
            case "Sonako_Light_Novel":
                s.wrapper = "#mw-content-text .recentchanges";
                s.items = "#mw-content-text .recentchanges a:not(.activityfeed-diff)";
                break;
        }
        return s;
    };
	
    /* implementations */
    var normalPage = mw.config.get("wgPageName"),
        specialPageContent = [],
        selectors;
    if (data.normalPages.indexOf(normalPage) > -1) {
        selectors = fn.getSpecialPageSelectors(normalPage);
        $(selectors.items).each(function() {
            specialPageContent.push($(this).text());
        });
        fn.prepareNormalPages(specialPageContent, function(nav) {
            $(selectors.wrapper).html(nav);
        });
    }	
});