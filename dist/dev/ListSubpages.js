(function () {
    if (!mw.config.get('wgUserName') || window.ListSubpagesLoaded) {
        return;
    }
    window.ListSubpagesLoaded = true;
    var msg;
    var wikis = [];

    function parallelIter(arr, concurrent, fn) {
        var $promise = $.Deferred();
        var i = 0;
        var values = [];
        var finished = concurrent;
        var cb = function() {
            if (i >= arr.length) {
                finished--;
                if (finished === 0) {
                    $promise.resolve(values);
                }

                return;
            }

            var index = i;
            var value = arr[i++];

            fn(value).then(
                function(data) {
                    values[index] = data;
                    cb();
                },
                function(error) {
                    values[index] = error; // Actual error type to handle
                    cb();
                }
            );
        };

        while (concurrent--) {
            cb();
        }

        return $promise.promise();
    }

    function getSubpages (wikis) {
        parallelIter(wikis, 5, function (item) {
            return $.ajax({
                url: item + 'api.php?action=query&list=allpages&apprefix=' + mw.config.get('wgUserName') + '/&apnamespace=2&format=json',
                dataType: 'jsonp',
                timeout: 5000
            }).done(function (d) {
                if (d.error) {
                    $('#mw-content-text #results').append(
                        mw.html.escape(d.error.info),
                        ': ',
                        $('<a>', {
                            href: item,
                            text: item
                        }),
                        '<br>'
                    );
                } else {
                    d.query.allpages.forEach(function (p) {
                        var url = item + 'wiki/' + p.title;
                        $('#mw-content-text #results').append(
                            $('<a>', {
                                href: url,
                                text: url
                            }),
                            '<br>'
                        );
                    });
                }
            });
        }).then(function () {
            alert(msg);
        });
    }

    function getUrls (data) {
        var data = $(data);

        data.find('.user-activity__table-wrapper tbody tr').each(function () {
            wikis.push($(this).find('td:first-child > a').attr('href'));
        });

        if (data.find('.TablePager-button-next.oo-ui-widget-enabled').length) {
            getWikis(new mw.Uri(data.find('.TablePager-button-next > a').attr('href')).query.offset);
        } else {
            getSubpages(wikis);
        }
    }

    function getWikis (offset) {
        $.get('https://community.fandom.com/wiki/Special:UserActivity?uselang=en' + (offset ? '&offset=' + offset : '')).done(getUrls);
    }

    function main (i18nData) {
        var i18n = i18nData;
        msg = i18n.msg('done').plain();
        $('.page-header__title').text('ListSubpages');
        document.title = 'ListSubpages | ' + mw.config.get('wgSiteName') + ' | Fandom';
        $('#mw-content-text').empty();
        $('#mw-content-text').html(
            i18n.msg('notice').escape() +
            '<pre id="results"></pre>'
        );
        getWikis();
    }

    mw.loader.using('mediawiki.util').then(function () {
        if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && mw.util.getParamValue('blankspecial') === 'listsubpages') {
            mw.hook('dev.i18n').add(function (i18n) {
                i18n.loadMessages('ListSubpages').then(main);
            });
        } else {
            mw.hook('dev.placement').add(function (placement) {
                placement.script('ListSubpages');
                $(placement.element('tools'))[placement.type('prepend')](
                    $('<li>').append(
                        $('<a>', {
                            text: 'ListSubpages',
                            href: mw.util.getUrl('Special:BlankPage', {
                                blankspecial: 'listsubpages'
                            })
                        })
                    )
                );
            });
        }
    });

    importArticle({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Placement.js'
        ]
    });
})();