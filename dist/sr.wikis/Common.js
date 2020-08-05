/* Јаваскрипт постављен овде ће се користити за све кориснике при отварању сваке странице. */

/* Аутоматско ажурирање */
window.ajaxPages = [
    "Посебно:СписакНадгледања",
    "Посебно:Доприноси",
    "Посебно:WikiActivity",
    "Посебно:СкорашњеИзмене"
];
window.AjaxRCRefreshText = 'Ауто-ажурирање'; //
window.AjaxRCRefreshHoverText = 'Укључи ауто-ажурирање паге'; //

/* Приказивање пуну датум и време */
window.DisplayClockJS = '%2H:%2M:%2S %2d %{Јануар;Фебруар;Март;Април;Маj;Jуна;Jула;Аугуст;Септембар;Октобар;Новембар;Децембар}m %Y (UTC)';

/* Викификатор */
 
function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'Викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}

/* Додавање блока вести у десни део странице под јединицом за ћаскање */
function getNews() {
    if ($('#WikiaRail').length) {
        $.get(mw.config.get('wgServer') + '/wiki/МедијаВики:Вести', function(data) {
            $NewsModule = $('<section class="wiki-news module"><h1 style="margin-top:0px; margin-bottom:10px;">Вести</h1><div>' +
                $(data).find('#mw-content-text').html() + '</div></section>');
            $NewsModule.appendTo('#WikiaRail');
        });
    } else {
        setTimeout(getNews, 200);
    }
}
getNews();

//Импорт EditIntroButton
window.EditIntroButtonText = 'Мењати преамбулу';

//Wikis
$(function () {
     if ($('.wiki-infobox-input').length) {
         wiki = $('.wiki-infobox-input').text();
         if (wiki.indexOf('http://') === -1) {
             wiki = 'http://' + wiki;
         }
         if (wiki.indexOf('.wikia.com') === -1) {
             wiki = wiki + '.wikia.com';
         }
         $.ajax({
             url: wiki + '/api.php',
             data: {
                 action: 'query',
                 meta: 'siteinfo',
                 siprop: 'wikidesc',
                 format: 'json'
             },
             dataType: 'jsonp',
             jsonp: 'callback',
             crossDomain: true,
             type: 'GET',
             success: function (data) {
                 var cityId = data['query']['wikidesc']['id'];
                 $.ajax({
                     url: 'http://www.wikia.com/api/v1/Wikis/Details/',
                     data: {
                         ids: cityId
                     },
                     dataType: 'json',
                     type: 'GET',
                     success: function (wikiinfo) {
                         $('.wiki-infobox-wordmark').html('<img src="' + wikiinfo.items[cityId].wordmark + '" />');
                         $('.wiki-infobox-edits').text(wikiinfo.items[cityId].stats.edits);
                         $('.wiki-infobox-articles').text(wikiinfo.items[cityId].stats.articles);
                         $('.wiki-infobox-pages').text(wikiinfo.items[cityId].stats.pages);
                         $('.wiki-infobox-active-users').text(wikiinfo.items[cityId].stats.activeUsers);
                         $('.wiki-infobox-images').text(wikiinfo.items[cityId].stats.images);
                         $('.wiki-infobox-videos').text(wikiinfo.items[cityId].stats.videos);
                         $('.wiki-infobox-admins').text(wikiinfo.items[cityId].stats.admins);
                         $('.wiki-infobox-wam-score').text(wikiinfo.items[cityId].wam_score);
                         $('.wiki-infobox-lang').text(wikiinfo.items[cityId].lang);
                         $('.wiki-infobox-headline').text(wikiinfo.items[cityId].headline);
                         $('.wiki-infobox-topic').text(wikiinfo.items[cityId].topic);
                         $('.wiki-infobox-hub').text(wikiinfo.items[cityId].hub);
                         $('.wiki-infobox-description').text(wikiinfo.items[cityId].desc);
                         $.get('/api/v1/User/Details/?ids=' + wikiinfo.items[cityId].topUsers, function (users) {
                             $('.wiki-infobox-top-users').html("<ol><li>" + $.map(users.items, function (u) {
                                 return u.name
                             }).join('</li><li>') + "</li></ol>");
 
                         });
                     }
                 });
             }
         });
     }
 });



//Userinfo
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