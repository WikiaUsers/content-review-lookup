/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* плашка */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 250) {
            title = "Новичек";
        } else if (editCount > 250 && editCount <= 1000) {
            title = "Опытный наездник";
        } else if (editCount > 1000 && editCount <= 10000) {
            title = "Друид";
        } else {
            title = "Духовный наездник";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );
/*Правильные формы мн. ч. для количества страниц в заголовке, взято с КВВ*/
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
InactiveUsers = { text: 'Неактивен(-на)' };
importScriptPage('InactiveUsers/code.js', 'dev');