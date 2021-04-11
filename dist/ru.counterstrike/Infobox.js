/* Дата регистрации участника */
$(function () {
    if (mw.config.get("wgNamespaceNumber") === 2) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'query',
                list: 'users',
                ususers: mw.config.get("profileUserName"),
                usprop: 'registration'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data) {
                    if (data.query.users[0].registration) {
                        $('.ib-regdate').empty().text(new Date(data.query.users[0].registration).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }));
                    } else {
                        $('.ib-regdate').html("Нет данных");
                    }
                }
            }
        });
    }
})