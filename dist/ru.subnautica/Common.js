/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Автоматические аватары на заглавной
!function(mw, $) {
    'use strict';
    if (!mw.config.get('wgIsMainPage')) return;

    $('.mainpage-avatar').each(function() {
        var $this_elem = $(this).empty(),
            data_obj = {
                id: {
                    action: 'query',
                    list: 'users',
                    ususers: $(this).attr('data-name'),
                    format: 'json'
                },
                avatar: {
                    controller: 'UserProfilePage',
                    method: 'getLightboxData',
                    tab: 'avatar',
                    format: 'json'
                }
            };

        $.get('/api.php', data_obj.id, function(d) {
            data_obj.avatar.userId = d.query.users[0].userid;

            $.post('/wikia.php', data_obj.avatar, function(t) {
                $('<img />', {
                        src: $(t.body).find('img.avatar').attr('src'),
                        width: '55px',
                        height: '55px',
                        style: 'cursor: pointer;'
                    })
                    .click(function() {
                        window.open('/wiki/User:' + data_obj.id.aufrom, '_blank')
                    })
                    .appendTo($this_elem);
            });
        });
    });
}(this.mediaWiki, this.jQuery);

/* Discord 
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js'
    ]
}); */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
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
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

// AJAX-обновление некоторых страниц(выбор страниц)
var ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
var PurgeButtonText = 'Обновить'; //Отображаемое название
 
/*Показ IP анонимов в комментариях*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};