// [[Шаблон:Користувач]
// Автор скрипта: [[Користувач:Fngplg]
mw.hook('wikipage.content').add(function ($content) {
    var msg = {
        nodata: '<span class="udu-nodata">Немає даних</span>',
        reqfailed: 'Error: Request failed.',
        cantavatar: 'Error: Cannot obtain user avatar.',
        usernotfound: 'Користувача не знайдено',
        delimiter: '<span class="udu-delim">, </span>',
    };
    var requestMax = 6,
        requestThreshold = 300,
        requestCount = 0,
        requests = [],
        rejected = 0,
        names = $content.find('.infobox-nicknames').text()
            .split('/')
            .map(function(v){return (v||'').trim()})
            .filter(Boolean),
        nickname = mw.config.get('wgTitle').replace( /^[^/]+\//, '' );
    if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length || $content.find('.infobox-editcount')) {
        if ( mw.config.get( 'wgNamespaceNumber' ) !== 0 ) {
            $content.find( '.pi-title .user-link' ).html(
                $( '<a />', {
                    href: '/wiki/User:' + (names[0] || nickname),
                    target: '_blank'
                }).append(
                    $('<span>', {
                        class: 'udu-nickname',
                        text: names[0] || nickname
                    })
                )
            );
        }
 
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'query',
                list: 'users',
                ususers: names[0] || nickname,
                usprop: 'registration|gender|editcount'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data) {
                    switch (data.query.users[0].gender) {
                    case 'male':
                        $content.find('.infobox-gender').append('<span class="fa fa-mars udu-fa"></span>');
                        break;
                    case 'female':
                        $content.find('.infobox-gender').append('<span class="fa fa-venus udu-fa"></span>');
                        break;
                    case 'unknown':
                        break;
                    default:
                        break;
                    }
                    try {
                        if (data.query.users[0].registration) {
                            $content.find('.infobox-registration-date').empty().text(data.query.users[0].registration.replace('T', ' ').replace('Z', ''));
                        } else {
                            $content.find('.infobox-registration-date').html(msg.nodata);
                        }

                        if (data.query.users[0].editcount) {
                            $content.find('.infobox-editcount').html(data.query.users[0].editcount);
                        } else {
                            $content.find('.infobox-editcount').html(msg.nodata);
                        }
                    } catch (e) {
                        $content.find('.infobox-registration-date').html(msg.nodata);
                        $content.find('.infobox-editcount').html(msg.nodata);
                    }
                }
            },
            error: function () {
                console.log(msg.reqfailed);
                $content.find('.infobox-registration-date').html(msg.nodata);
                $content.find('.infobox-editcount').html(msg.nodata)
            }
        });
    }// if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length)
 
    if ($content.find('.infobox-avatar').length) {
        $.ajax({
            url: '/api/v1/User/Details?size=150&ids=' + nickname,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $content.find('.infobox-avatar').html(
                        $('<img>', {
                           src: (data.items[0] || {}).avatar,
                           class: 'avatar'
                        })
                    );
                }
            },
            error: function () {
                console.log(msg.cantavatar);
                $content.find('.infobox-avatar').html(msg.nodata);
            }
        });
    }// if ($content.find('.infobox-avatar').length)
 
    // if ($content.find('.infobox-editcount').length)
});