//Q, by Sophiedp, using JS by Dorumin
mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function () {
    var badPages = [];

    function query (params, cb, resolve) {
        return new Promise(function (res) {
            return new mw.Api().get(params).then(function (data) {
                cb(data);

                if (data.continue) {
                    query(
                        Object.assign(
                            {},
                            params,
                            data.continue
                        ),
                        cb,
                        resolve || res
                    );
                } else {
                    resolve();
                }
            });
        });
    }

    function edit (items, summary) {
        items.forEach(function (page) {
            new mw.Api().postWithToken('csrf', {
                action: 'edit',
                title: page.orginal.title,
                text: page.orginal.revisions[0].slots.main['*'].replace(/\|1{{{\d+?\|}}}=/, ''),
                minor: true,
                bot: true,
                summary: summary
            }).done(function () {
                $('#mw-content-text #results').find('a[href$="' + page.orginal.title + '"]').css('text-decoration', 'line-through');
            });
        });
    }

    function main () {
        query({
            action: 'query',
            generator: 'allpages',
            gaplimit: 50,
            prop: 'revisions',
            rvprop: 'content',
            rvslots: '*',
            gapnamespace: 10
        }, function (data) {
            for (const page of Object.values(data.query.pages)) {
                if (/\|1{{{\d+?\|}}}=/.test(page.revisions[0].slots.main['*'])) {
                    console.log('found', page);
                    badPages.push({
                        orginal: page,
                        match: page.revisions[0].slots.main['*'].match(/\|1{{{\d+?\|}}}=/)[0]
                    });
                }
            }
        }, function () {
            alert('All done!');

            $('#mw-content-text #results').html(badPages.map(function (item) {
                return $('<a>', {
                    text: item.orginal.title,
                    href: mw.util.getUrl(item.orginal.title)
                }).prop('outerHTML') + ' - ' + item.match;
            }).join('\n')).after($('<div>', {
                class: 'wds-button',
                text: 'Edit',
                css: {
                    'margin-top': '5px'
                },
                click: function () {
                    $(this).addClass('wds-is-disabled');
                    var summary = prompt('Please enter an edit summary');
                    edit(badPages, summary);
                }
            }));
        });
    }

    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Blankpage' && !mw.config.get('wgTitle').endsWith('/Q')) {
        $('#WikiaBar .toolbar .tools > :first-child').append(
            $('<li>', {
                append: $('<a>', {
                    text: 'Q',
                    href: mw.util.getUrl('Special:BlankPage/Q')
                })
            })
        );
    } else {
        $('.page-header__title').text('Q');
        document.title = document.title.replace('Blank page', 'Q');
        $('#mw-content-text p').replaceWith(
            $('<pre>', {
                id: 'results'
            })
        );
        main();
    }
});