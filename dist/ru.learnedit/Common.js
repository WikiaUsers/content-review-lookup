/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// 1

/* Тест голосования */

importArticles({
    type: 'script',
    articles: [
        'u:dev:StarRatings/code.js',
        'u:dev:StarRatings/ui.js',
        'u:dev:StarRatings/stats.js'
    ]
});

/* Тестирование моего слайдера для заглавной */
$(function() {
    $(".mp-slider").css({
        "background": "rgba(200, 200, 200, 0.3)",
        "width": "100%",
        "padding": "2px",
        "border-collapse": "collapse",
        "text-align": "center",
        "margin": "2px 0px",
        "min-height": "300px",
        "height": "0"
    });

    $(".mp-menu").css({
        "background": "gray",
        "padding": "3px",
        "text-align": "center",
        "width": "100px",
        "vertical-align": "top",
    });

    $(".mp-menu img").css({
        "border": "1px solid #e1e1e1",
        "margin-bottom": "3px",
        "background": "black"
    });

    $(".mp-slider").each(function(index, element) {
        $(element).find(".mp-slide").hide();
        $(element).find(".mp-slide:first").show();
        $(element).find("img:first").addClass("mp-selected");

        $(element)
            .find(".mp-menu a")
            .attr("href", "");

        $(element)
            .find(".mp-menu a")
            .attr("class", "");

        $(element)
            .find(".mp-menu a")
            .hover(function() {
                $(this).find("img").css("opacity", "0.5");
            }, function() {
                $(this).find("img").css("opacity", "2.0");
            });

        $(element)
            .find(".mp-menu a")
            .click(function(event) {
                var indexOfElement = $(this).index();
                event.preventDefault();
    
                $(element)
                    .find(".mp-slide")
                    .hide();

                $(element)
                    .find("img")
                    .removeClass("mp-selected");

                $(element)
                    .find(".mp-slide:eq(" + indexOfElement.toString() + ")")
                    .fadeIn(250);

                $(element)
                    .find("img:eq(" + indexOfElement.toString() + ")")
                    .addClass("mp-selected");
            });
    });
});

// Скрипты с ru.wikies
/* Здесь размещён jQuery-код Wildrem'а, предназначенный для
** Новой версии инфобокса участника
*/

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
            type: 'POST',
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