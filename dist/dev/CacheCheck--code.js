/* CacheCheck.js
 * Crosses out resolved entries on the cached special pages to save time checking them.
 * By Bobogoobo
 */
//TODO: potential additions:
//  *Maybe update the number of links on "Wanted" reports
//  *Maybe make a progress meter of some sort
//  *Should probably use .fail to make sure everything gets wrapped up
//  *Internationalization (as noted in code)
//  *Combine some requests so it doesn't take as long and make as many (maybe use POST and do them all at once)
//  *Add a button to run the script if execution is skipped due to user specification;
//    not sure how drastic a restructure this would require
//Note: imageusage, embeddedin, and backlinks can take &xxcount=true to return only the number of them.

mw.loader.using('mediawiki.util').done(function() {
	'use strict';
    if (window.CacheCheckLoaded) {
        return;
    }
    window.CacheCheckLoaded = true;

    var removeIfFalse = false,
        skips = window.cacheSkip || [],
        skipLimit = Number(window.cacheSkipLimit) || 1000,
        list = $('ol.special').length ? $('ol.special > li') : $('ul.gallery > li, div.wikia-gallery-item'),
        isgallery = $('ol.special').length ? false : true,
        pending = $(list).length,
        qstr = mw.util.wikiScript('api') + '?action=query&format=json&',
        structure = ['query'],
        baseUrl = mw.config.get('wgServer'),
        page = mw.config.get('wgCanonicalSpecialPageName'),
        pages = [
            'Specialpages',
            'Deadendpages',
            'Lonelypages', 
            'Uncategorizedcategories',
            'Uncategorizedpages',
            'Uncategorizedimages',
            'Uncategorizedtemplates', 
            'Unusedcategories',
            'Unusedimages',
            'Unusedtemplates',
            'Wantedcategories',
            'Wantedpages',
            'Wantedfiles',
            'Wantedtemplates'
        ],
        aliasList = [],
        pathRegex,
        i18n;

    function takeAction($el) {
        if (window.CacheCheckRemove) {
            $el.remove();
        } else {
            var $gallery = $el.find('.gallerytext a:first, .gallery-image-wrapper a:first');
            if ($gallery.length) {
                if ($gallery.find('img')) {
                    // The link is actually on the image.
                    $el.remove();
                } else {
                    $gallery.wrap('<s></s>');
                }
            } else {
                $el.wrapInner('<s></s>');
            }
        }
    }

    // Skip execution if not on a relevant page, page is skipped by user, 
    // or list on page is empty. Else, check for empty listings on SpecialPages.
    if (
    	!page ||
        pages.indexOf(page) === -1 ||
        skips.indexOf(page) !== -1 ||
        (list.length === 0 && page !== 'Specialpages') ||
        skipLimit < (Number(mw.util.getParamValue('limit')) || 0)
    ) {
        return;
    } else if (page === 'Specialpages') {
    	$.getJSON(qstr + 'meta=siteinfo&formatversion=2&siprop=specialpagealiases').then(function(data) {
			var spa = data.query.specialpagealiases;
			for (var i = 0; i < spa.length; i++) {
				var aliases = spa[i].aliases;
				for (var j = 0; j < aliases.length; j++) {
					aliasList[aliases[j].replace(/_/g, ' ')] = spa[i].realname;
				}
			}
		}).then(function() {
			// Additional pages to check for having no entries
	        pages.push('BrokenRedirects', 'DoubleRedirects', 'NonportableInfoboxes', 'UnorganizedTemplates');
	        $('#mw-specialpagesgroup-maintenance + .mw-specialpages-list li').each(function() {
	            var $this = $(this),
	                link = $this.children('a').attr('title').substring(8);

				var realname = aliasList[link] || link;
	            if (pages.indexOf(realname) === -1) {
					//console.log('[CacheCheck]', 'Missing page: ' + realname + ' (' + link + ')');
	                return;
	            }

	            $.getJSON(qstr + 'list=querypage&qppage=' + realname, function(data) {
	                var results = data.query.querypage.results;
	                if (results.length === 0) {
	                    takeAction($this);
	                }
	                if (
	                    realname === 'Uncategorizedcategories' &&
	                    results.length === 1 &&
	                    results[0].title === window.topLevelCat
	                ) {
	                    takeAction($this);
	                }
	            });
	        });
		});
        return;
    }

    // Only on "Wanted" reports, entries are resolved if the query result is empty.
    if (page.substring(0, 6) === 'Wanted') {
        removeIfFalse = true;
    }

    // Takes list element, returns generated API query string.
    // Foo is 0 or 1 for lonelypages section.
    function getQS($this, foo) {
        var qs = qstr,
            select = isgallery ? '.gallerytext a:first, .gallery-image-wrapper a:first' : 'a:first',
            url = $this.find(select).prop('href'),
            redlinkUrl = $this.find(select).data('uncrawlableUrl');

        if (redlinkUrl) {
            url = atob(redlinkUrl);
        }

        url = new URL(url, baseUrl);

        if (page === 'Lonelypages') {
            qs += foo ? 'list=embeddedin&eititle=' : 'list=backlinks&bltitle=';
        }
        qs += encodeURIComponent(decodeURIComponent(url.pathname).replace(pathRegex, ''));

        return qs;
    }

    // Takes a JSON request result, returns array relevant to current page.
    function getData(data) {
        for (var i = 0; i < structure.length; i++) {
            if (structure[i] === 'placeholder') {
                //shortcut/hack thanks to https://archive.is/RwvEn
                for (var first in data) break;
                data = data[first];
            } else {
                data = data[structure[i]];
            }
            if (data === undefined) {
                return [];
            }
        }
        return data;
    }

    // Takes element in list, marks script as complete if it is the last list element.
    function checkComplete() {
        pending -= 1;
        if (pending <= 0) {
            $('#CacheCheck').text(i18n('checkdone').plain());
        } else {
            $('#CacheCheck').text(i18n('checking', pending).plain());
        }
    }

    // Note: all desired data is in the format of an array,
    // which in the case of "prop=" queries is missing when there is no data,
    // and otherwise is empty.
    switch (page) {
        case 'Unusedtemplates':
        case 'Wantedtemplates':
            qstr += 'list=embeddedin&eititle=';
            structure.push('embeddedin');
            break;
        case 'Uncategorizedcategories':
        case 'Uncategorizedpages':
        case 'Uncategorizedtemplates':
        case 'Uncategorizedimages':
            qstr += 'prop=categories&titles=';
            structure.push('pages', 'placeholder', 'categories');
            break;
        case 'Unusedimages':
        case 'Wantedfiles':
            qstr += 'list=imageusage&iutitle=';
            structure.push('imageusage');
            break;
        case 'Unusedcategories':
        case 'Wantedcategories':
            qstr += 'list=categorymembers&cmtitle=';
            structure.push('categorymembers');
            break;
        case 'Wantedpages':
            qstr += 'list=backlinks&bltitle=';
            structure.push('backlinks');
            break;
        case 'Deadendpages':
            qstr += 'prop=links&titles=';
            structure.push('pages', 'placeholder', 'links');
            break;
        default:
            break;
    }

    function init(i18nData) {
        pathRegex = new RegExp('^' + mw.util.escapeRegExp(mw.config.get('wgArticlePath').replace('$1', '')));
        i18n = i18nData.msg;
        $('.mw-spcontent').append(
            $('<p>', {
                id: 'CacheCheck',
                text: i18n('checking', pending).plain()
            })
        );
        list.each(function() {
            var $this = $(this);
            if (isgallery) {
                // Uncategorizedimages, Unusedimages
                if ($this.find('img').length) {
                    $.getJSON(getQS($this), function(data) {
                        data = getData(data);
                        if (data.length !== 0) {
                            takeAction($this);
                        }
                        checkComplete();
                    });
                } else {
                    takeAction($this);
                    checkComplete();
                }
            } else if (page === 'Lonelypages') {
                // The only one that needs two queries
                $.getJSON(getQS($this, 0), function(data) {
                    data = data.query.backlinks;
                    if (data.length && !($this.children('s').length)) {
                        takeAction($this);
                    }
                    checkComplete();
                });
                $.getJSON(getQS($this, 1), function(data) {
                    data = data.query.embeddedin;
                    if (data.length && !($this.children('s').length)) {
                        takeAction($this);
                    }
                    checkComplete();
                });
            } else {
                $.getJSON(getQS($this), function(data) {
                    data = getData(data);
                    if (Boolean(removeIfFalse) === (data.length === 0)) {
                        takeAction($this);
                    }
                    checkComplete();
                });
            }
        });
    }

    mw.hook('dev.i18n').add(function (i18njs) {
        i18njs.loadMessages('CacheCheck').done(init);
    });

    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
});