/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    var intervaleditCount = setInterval(editcountcalc, 500)
    function editcountcalc(){
    if (($(".user-identity-stats li:first-child strong").length || $(".user-identity-stats li:last-child strong").length) && $('#userProfileApp').length && mw.config.get('wgAction') === 'view') {
        clearInterval(intervaleditCount)
        var editCount = 0;
        var postCount = 0;
        if ($(".user-identity-stats li:first-child strong").length) {
        	editCount = $(".user-identity-stats li:first-child strong").text();
        }
        if ($(".user-identity-stats li:last-child strong").length) {
        	postCount = $(".user-identity-stats li:last-child strong").text();
        }
        var title = '';
        if ((1 <= editCount && editCount <= 250) || (1 <= postCount && postCount <= 250)) {
            title = "Котёнок";
        } else if ((editCount > 250 && editCount <= 1000) || (postCount > 250 && postCount <= 1000)) {
            title = "Оруженосец";
        } else if ((editCount > 1000 && editCount <= 5000) || (postCount > 1000 && postCount <= 5000)) {
            title = "Воитель";
        } else {
            title = "Старший воитель";
        }
        $('<span />', {
            class: 'user-identity-header__tag',
            text: title
        }).appendTo('.user-identity-box__info .user-identity-header__attributes');
    }
}
});


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