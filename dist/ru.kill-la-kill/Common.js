/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*** НАСТРОЙСКИ СКРИПТОВ ***/
/*Добавляет плашку "НЕАКТИВЕН" для неактивных участников*/
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};

window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
],
window.AjaxRCRefreshText = 'Автообновление',
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу',
window.ajaxIndicator = 'https://images.wikia.nocookie.net/kill-la-kill/ru/images/4/42/Loading.gif';

/*Добавление к внешним ссылкам автоматическое открытие в новой вкладке*/
/**Спёр со стены Kopcap94**/
$(function() {
    if ($('.external').length) {
        $('.external').attr('target','_blank');
    }
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
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