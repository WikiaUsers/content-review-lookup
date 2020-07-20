(function () {
    if (!mw.config.get('wgUserName') || window.ListSubpagesLoaded) {
        return;
    }
    window.ListSubpagesLoaded = true;
    
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

    function load (msg) {
        $.ajax({
            url: 'https://community.fandom.com/wikia.php?controller=UserActivity%5C&method=index&format=jsonp',
            dataType: 'jsonp'
        }).done(function (d) {
            parallelIter(d.items, 5, function(item) {
                var wiki = item.url.replace(/^http:/, 'https:');
                return $.ajax({
                    url: wiki + 'api.php?action=query&list=allpages&apprefix=' + mw.config.get('wgUserName') + '/&apnamespace=2&format=json',
                    dataType: 'jsonp',
                    timeout: 5000
                }).done(function (d) {
                    if (d.error) {
                        $('#errors').append(
                            mw.html.escape(d.error.info),
                            ': ',
                            $('<a>',{
                                href: wiki,
                                text: wiki
                            }),
                            '<br>'
                        );
                    } else {
                        d.query.allpages.forEach(function (p) {
                            var url = wiki + 'wiki/' + p.title;
                            $('#results').append(
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
        });
    }

    function main (i18nData) {
        var i18n = i18nData;
        $('.page-header__title').text('ListSubpages');
        document.title = 'ListSubpages | ' + mw.config.get('wgSiteName') + ' | Fandom';
        $('#mw-content-text').empty();
        $('#mw-content-text').html(
            i18n.msg('notice').escape() +
            '<br><br>' +
            i18n.msg('results-header').escape() +
            '<br><pre id="results"/><br>' +
            i18n.msg('errors-header').escape() +
            '<br><pre id="errors"/>'
        );
        load(i18n.msg('done').plain());
    }

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

    importArticle({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Placement.js'
        ]
    });
})();