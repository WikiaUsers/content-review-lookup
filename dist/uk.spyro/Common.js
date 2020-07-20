/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
//Inactive users
window.InactiveUsers = {
    months: 1,
    text: 'НЕАКТИВНИЙ'
};

$(function () {
    if ($('.infobox-gender').length || $('.infobox-registration-date').length) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'query',
                list: 'users',
                ususers: mw.config.get('wgPageName'),
                usprop: 'registration|gender'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data) {
                    switch (data.query.users[0].gender) {
                    case 'male':
                        $('.infobox-gender').append('<img src="https://vignette.wikia.nocookie.net/wikies/images/c/c1/Male.svg/revision/latest/scale-to-width/25?cb=20150302060331&amp;path-prefix=ru" alt="Male.svg" class="" data-image-key="Male.svg" data-image-name="Male.svg" width="25" height="25">');
                        break;
                    case 'female':
                        $('.infobox-gender').append('<img src="https://vignette.wikia.nocookie.net/wikies/images/2/23/Female.svg/revision/latest/scale-to-width/25?cb=20150302060307&amp;path-prefix=ru" alt="Female.svg" class="" data-image-key="Female.svg" data-image-name="Female.svg" width="25" height="25">');
                        break;
                    case 'unknown':
                        break;
                    default:
                        // nothing atm
                    }
                    $('.infobox-registration-date').text(data.query.users[0].registration.replace('T', ' ').replace('Z', ''));
                }
            },
            error: function () {
                console.log('Error: Request failed.');
            }
        });
    }
 
    if ($('.infobox-editcount').length) {
        // Special:EditCount gives more precise data than MW API
        $.ajax({
            url: '/wiki/Special:EditCount/' + mw.config.get('wgPageName'),
            type: 'GET',
            success: function (data) {
                if (data) {
                    //TODO: normal selector instead of this
                    $('.infobox-editcount').text($(data).find('.ecrowright:eq(5)').text());
                }
            },
            error: function () {
                console.log('Error: Request failed.');
            }
        });
    }
 
    if ($('.infobox-avatar').length) {
        $.ajax({
            url: '/wiki/Special:Contributions/' + mw.config.get('wgPageName'),
            type: 'GET',
            success: function (data) {
                if (data) {
                    $('.infobox-avatar').empty().append($(data).find('.masthead-avatar').children('img'));
                }
            },
            error: function () {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    }
});

$(function() {
    if (wgUserName != 'null') {
        $('.insertusername').text(wgUserName);
    }
});