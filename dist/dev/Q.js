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
            Object.values(data.query.pages).forEach(function (page) {
                if (/\|1{{{\d+?\|}}}=/.test(page.revisions[0].slots.main['*'])) {
                    console.log('found', page);
                    badPages.push({
                        orginal: page,
                        match: page.revisions[0].slots.main['*'].match(/\|1{{{\d+?\|}}}=/)[0]
                    });
                }
            });
        }, function () {
            alert('All done!');
            
            if (!badPages.length) {
            	$('#mw-content-text #results').text(mw.messages.get('specialpage-empty'));
            	return;
            }

            $('#mw-content-text #results').html(badPages.map(function (item) {
                return $('<a>', {
                    text: item.orginal.title,
                    href: mw.util.getUrl(item.orginal.title)
                }).prop('outerHTML') + ' - ' + item.match;
            }).join('\n')).after($('<div>', {
                class: 'wds-button',
                text: mw.messages.get('edit'),
                css: {
                    'margin-top': '5px'
                },
                click: function () {
                    $(this).addClass('wds-is-disabled');
                    var summary = prompt(mw.messages.get('summary'));
                    edit(badPages, summary);
                }
            }));
        });
    }

    if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && mw.config.get('wgTitle').endsWith('/Q')) {
        $('.page-header__title').text('Q');
        document.title = document.title.replace('Blank page', 'Q');
        $('#mw-content-text p').replaceWith(
            $('<pre>', {
                id: 'results'
            })
        );
        new mw.Api().loadMessagesIfMissing(['summary', 'specialpage-empty']).then(function () {
			main();
        });
    } else {
		$('#WikiaBar .toolbar .tools > :first-child').after(
            $('<li>', {
                append: $('<a>', {
                    text: 'Q',
                    href: mw.util.getUrl('Special:BlankPage/Q')
                })
            })
        );
    }
});