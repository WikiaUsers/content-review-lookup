/*HideShow*/
var collapsed = true;
$('.HideShow').click(function () {
    if (collapsed) {
        $('.HideShow').text('Скрыть');
        collapsed = false;
    }
    else {
        $('.HideShow').text('Показать');
        collapsed = true;
    }
    });
/*Для шаблона*/
$('.nickname').text(mw.config.get('wgUserName'));
/*Быстрое создание статей с заглавной*/
/*Автор скрипта - King Henry V*/
function createArticle(){
    if ($('#authorName').val().toString().length === 0) {
        $('warning').fadeIn(1000);
        $.showCustomModal('Вы не указали имя автора. Попробуйте заново.', {id: "warningModal",
   width: 300,
   buttons: [{
       message: 'OK',
       handler: function  (){
           $('#warningModal').closeModal ();
       }
       }]});
    }
    else {
        if ($('#authorCountry').val().toString() == "Англия"){
           var countryAdjective = "английский ";
        }
        else if ($('#authorCountry').val().toString() == "Россия"){
            var countryAdjective = "русский ";
        }
        else if ($('#authorCountry').val().toString() == "США"){
            var countryAdjective = "американский ";
        }
        else {
            var countryAdjective = "";
        }
        var birthDate = $("#authorYear").val().toString().split("-")[0];
        var deathDate = $("#authorYear").val().toString().split("-")[1];
        var articleText = "{{ПА}}{{Автор|Изображение = " + $("#authorPhoto").val().toString() + "|Имя = {{PAGENAME}}|Гражданство (подданство): = " + $('#authorCountry').val().toString() + "|Направление = " + $('#authorGenres').val().toString() + "|Дата рождения = " + birthDate + "}}" + "'''{{PAGENAME}}''' (в оригинале - " + $('#authorOriginalName').val().toString() + ") - " + countryAdjective + $('#authorGenres').val().toString() + ", живший в период с " + birthDate + " по " + deathDate + " год." + " Наиболее известными произведениями этого автора являются: " + $("#authorBooks").val().toString() + ".";
        $.ajax({
            url: mw.util.wikiScript('api'),
            type: 'POST',
            data: {
                action: 'edit',
                title: $('#authorName').val().toString(),
                summary: "Новая статья, созданная с помощью скрипта.",
                text: articleText,
                token: mw.user.tokens.get('editToken'),
                format: 'json'
            },
            dataType: 'json',
 
            success: function (data) {
                if (data && data.edit && data.edit.result == 'Success') {
                    
                    $.showCustomModal('Статья создана.', {
                        id: 'RequestSuccess',
                        width: 300,
                    });
                } 
            }
        });
    }
}
var authorForm = '<form class = "WikiaForm">'
+ '<fieldset>'
+ '<p style = "padding: 5px; border:1px solid #006400; font-size:13px; color:black">Пожалуйста, заполните все поля карточки, чётко следуя инструкции, чтобы создать заготовку.<p>'
+ '<p class = "must-be-filled><span style = "display:block">Имя автора:</span><span class = "warning" style = "color:red; display:none">Пожалуйста, укажите имя автора.</span></p><input type = "text" id = "authorName" placeholder = "Например, Льюис Кэрролл" style = "width: 660px; height: 30px"/>'
+ '<p>Фотография автора:</p><input id = "authorPhoto" placeholder = "Например, Lewis.jpg" style = "height: 30px; width: 660px"/>'
+ '<p>Годы рождения и смерти автора:</p><input id = "authorYear" placeholder = "Например, 1832-1898" style = "height: 30px; width: 660px;"/> '
+ '<p>Направление:</p><input id = "authorGenres" placeholder = "Например, детский писатель" style = "height: 30px; width: 660px"/>'
+ '<p>Страна:</p><input id = "authorCountry" style = "width: 660px; height:30px;" placeholder = "Например, Англия"/>'
+ '<p>Самые известные книги автора:</p><input id = "authorBooks" placeholder = "Например, Алиса в Стране Чудес, Алиса в Зазеркалье" style = "height: 30px; width: 660px"/>'
+ '<p>Имя в оригинале:</p><input id = "authorOriginalName" placeholder = "Например, Lewis Carroll" style = "width:660px; height:30px"/>'
+ '</fieldset>' 
+ '</form>';
$('.author-button').click(function (){
    $.showCustomModal('Заполните форму, чтобы создать заготовку статьи.', authorForm, 
    {width:700, 
    id: "authorModal",
    buttons: [{
        message: 'Отмена',
        id: 'cancelButton',
        handler: function (){
            $('#authorModal').closeModal();
        }
        },
        {
        message: 'Создать статью',
        id: "submitButton",
        handler: function (){
            createArticle();
        }
        }
    ]
})});
/* Чтобы был виден участникам их собственный ник */

$(function() {
	if ( !wgUserName ) return;
	$('.insertusername').html(wgUserName);
});

/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
    if (!$('.insertusername').length) {
        return;
    }
 
    if (wgUserName !== null) {
        $('.insertusername').html(wgUserName);   
    } else {
        $('.insertusername').text('Анонимный участник');
    }
})(this.jQuery, this.mediaWiki);

// Открытие ссылок в отдельной вкладке
!function( $ ) {
    if ( $( '.user-link' ).length ) { $( '.user-link a' ).attr( 'target', '_blank' ); }
    if ( $( '.references' ).length ) { $( '.references .reference-text a' ).attr( 'target', '_blank' ); }
}( jQuery );

// Для инфобокса участников
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
                        break;
                    }
                    try {
                        if (data.query.users[0].registration) {
                            $('.infobox-registration-date').empty().text(data.query.users[0].registration.replace('T', ' ').replace('Z', ''));
                        } else {
                            $('.infobox-registration-date').html('<span style="color: gray;">Нет данных</span>');
                        }
                    } catch (e) {
                        $('.infobox-registration-date').html('<span style="color: gray;">Нет данных</span>');
                    }
                }
            },
            error: function () {
                console.log('Error: Request failed.');
                $('.infobox-registration-date').html('<span style="color: gray;">Нет данных</span>');
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
                    $('.infobox-editcount').html($(data).find('.ecrowright:eq(5)').text());
                }
            },
            error: function () {
                console.log('Error: Request failed.');
                $('.infobox-editcount').html('<span style="color: gray;">Нет данных</span>');
            }
        });
    }
 
    if ($('.infobox-avatar').length) {
        $.ajax({
            url: '/wiki/Special:Contributions/' + mw.config.get('wgPageName'),
            type: 'GET',
            success: function (data) {
                if (data) {
                    $('.infobox-avatar').html($(data).find('.masthead-avatar').children('img'));
                }
            },
            error: function () {
                console.log('Error: Cannot obtain user avatar.');
                $('.infobox-avatar').html('<span style="color: gray;">Нет данных</span>');
            }
        });
    }
});
 
(function () {
    if ( !wgUserName ) return;
    $("span.insertusername").html(wgUserName); 
})();

/* Автоматическая выдача плашек по числу правок участника */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 100) {
            title = "Начинающий читатель";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Читатель книг";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Книголюб";
        } else if (editCount > 1000 && editCount <= 2000) {
            title = "Библиотекарь";
        } else {
            title = "Мудрец";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );