// [[Шаблон:Инфобокс участника]
// Автор скрипта: [[Участник:Fngplg]
mw.hook('wikipage.content').add(function ($content) {
    var msg = {
        nodata: '<span class="udu-nodata">Нет данных</span>',
        reqfailed: 'Error: Request failed.',
        cantavatar: 'Error: Cannot obtain user avatar.',
        usernotfound: 'Пользователь не найден',
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
    if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length) {
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
                usprop: 'registration|gender'
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
                    } catch (e) {
                        $content.find('.infobox-registration-date').html(msg.nodata);
                    }
                }
            },
            error: function () {
                console.log(msg.reqfailed);
                $content.find('.infobox-registration-date').html(msg.nodata);
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
 
    if ($content.find('.infobox-editcount').length) {
        requests = names.map(function (nickname) {
            var d = $.Deferred(),
                isreject = false;
            requestCount = requestCount + 1;
            setTimeout(function () {
                $.ajax({
                    url: '/wiki/Special:EditCount/' + nickname,
                    type: 'GET',
                    success: function (data) {
                        if (data) {
                            //TODO: normal selector instead of this
                            var count = 0,
                                $data = $(data);
                            // is user exists
                            if ($data.find('.TablePager').length) {
                                count = Number($data.find('.TablePager .ecrowright:eq(5)').text().replace(/\D/g, '')) || 0;
                            } else {
                                rejected = rejected + 1;
                                isreject = true;
                            }
                            d.resolve({user: nickname, count: count, reject: isreject});
                        }
                    },
                    error: function () {
                        console.log(msg.reqfailed, nickname, this);
                        rejected = rejected + 1;
                        isreject = true;
                        // it can't be .reject, cuz .when will fail
                        d.resolve({user: nickname, count: 0, reject: isreject});
                    }
                });
            }, Math.floor(requestCount / requestMax) * requestThreshold);
            return d.promise();
        });
        $.when.apply($, requests).then(function () {
            var names = [].slice.call(arguments);
            var count = names.reduce(function (acc, v) {
                    return acc + v.count;
                }, 0);
            count = count.toString();// defend count=0    
            if (names.length === rejected) count = 0;// all requests failed are
            $content.find('.infobox-editcount').html(count || msg.nodata);
 
        /* full multiple nicknames support
            var $nicknames = $content.find('.infobox-nicknames'),
                $newnames = $('<span>', {class: 'udu-nicknames'});
            $.each(names, function () {
                $newnames.append(
                    $('<span>', {
                        class: 'udu-nickname',
                        //text: this.user + ' ',
                        title: this.reject ? msg.usernotfound : this.count
                    }).append($('<a>', {
                            href: '/wiki/user:' + this.user,
                            title: this.reject ? msg.usernotfound : this.count,
                            text: this.user,
                        })
                    ).append($(msg.delimiter))
                );
            });
            $newnames.find('.udu-delim:last').remove();
            $nicknames.html($newnames);
        */
        });
    }// if ($content.find('.infobox-editcount').length)
});