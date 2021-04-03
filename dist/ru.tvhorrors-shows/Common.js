/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
mw.loader.load('/ru/index.php?title=Mediawiki:' + mw.config.get( 'wgPageName' ).replace(/:/g,'_') + '.css&action=raw&ctype=text/css', 'text/css' );


//===================================
// Переключатель стилей работающий с [[Шаблон:serial]]
// Стили записаны в MediaWiki:Styles.css
// Скрипт by АУИ Вики
// Автор Maxwell Winters
// 
 
$(function() {
if($('#changestyle').length > 0) {
var cl = $($('#changestyle').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('version-' + cl);
}
}
});

/*************************************************/
/****************** Слайдеры *********************/
/*************************************************/

mw.loader.using( ['jquery.ui.tabs'], function() {
    $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
            return false;
        });
    });
});