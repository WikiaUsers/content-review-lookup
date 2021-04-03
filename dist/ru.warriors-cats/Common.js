/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автоматическая выдача плашек по числу правок участника */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 250) {
            title = "Котёнок";
        } else if (editCount > 250 && editCount <= 1000) {
            title = "Оруженосец";
        } else if (editCount > 1000 && editCount <= 10000) {
            title = "Воитель";
        } else {
            title = "Старший воитель";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );

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


/*Псевдослайдер-ультранавигация*/
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", "") );
        $(window).scroll();                     //Костыль, который имитирует прокрутку
        setTimeout($(window).scroll(), 1000);   // окна, чтобы загрузились картинки
    return false;
  });
});
});

/*Правильные формы мн. ч. для количества страниц в заголовке, взято с borderlands.fandom.com/ru*/
$(function() {
    // plural for mw:community-header-pages @user:fngplg, 2018
    mw.loader.using(['mediawiki.language']).done(function() {
        $('.wds-community-header__counter-label').text(
            mw.language.convertPlural(
                $('.wds-community-header__counter-value').text(),
                ['страница', 'страниц', 'страницы']
            )
        );
    });
});

/*Плашка в профайл о неактивности*/
InactiveUsers = { text: { male: 'Неактивен', female: 'Неактивна', unknown: 'Неактивен/на' } };