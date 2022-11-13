/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity", "Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';
importScriptPage('AjaxRC/code.js', 'dev');
/*------------------------ Sliders на jqueryUI -------------------------------*/
// by User:Tierrie
var slideTime = 15000; // Время показа слайда (+1-3 секунды чтобы слайдеры не делали это одновременно)
mw.loader.using( ['oojs-ui-windows'], function() {
	$(document).ready(function() {
		$(".portal_slider").each(function(index, portal_slider) {
			$(portal_slider).tabs({ fx: {opacity:'toggle', duration:100} } );
			$("[class^=portal_sliderlink]").click(function() {
				$(portal_slider).tabs('select', this.className.replace("portal_sliderlink_", ""));
				return false;
			});
			$(portal_slider).find('#portal_next').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				return false;
			});
			$(portal_slider).find('#portal_prev').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') === 0) ? ($(portal_slider).tabs('length')-1) : $(portal_slider).tabs('option', 'selected') - 1 );
				return false;
			});
			var timerId = setTimeout(function tick() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				timerId = setTimeout(tick, slideTime + Math.floor(Math.random() * 3000));
			}, slideTime + Math.floor(Math.random() * 3000));
		});
	});
});
/* Special User Statuses */
function addMastheadTags() {
    var rights = {};
 
    rights["Sargot"] = ["Герой вики",];
    rights["Kuppa7121"] = ["Смотритель вики",];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        var user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for(var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    } 
};
 
$(function() {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});
/****************** Подключение функций после загрузки страницы ***************/
$(document).ready(function() {
	randomBackground();
	fixTable();
	//if ($("div.interactive-maps-container").length) {interactiveMapZoom();} // Запускаем при наличии интерактивной карты на странице
	setTimeout(function(){ slideRegenerate(); }, 2000); // Запускаем отложено, т.к. галереи подгружаются не сразу
	setTimeout(function(){ switcher(); }, 5000); // Запускаем отложено, т.к. инструменты подгружаются не сразу
});