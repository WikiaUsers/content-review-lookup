/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importScriptPage( 'InputUsername/code.js', 'dev' );

/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
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

/*********************************/
/*Добавляет "статусы" участников.*/
/*********************************/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
   //Название группы участников
 
 rights["Eliza Cassan"]                     = ["бот"];
 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});

/****************************************/
/*Добавляет автообновление спец.страниц.*/
/****************************************/

var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Включает или выключает автообновление этой страниы';
ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/e/e4/3D_throbber.gif';
importScriptPage( 'AjaxRC/code.js', 'dev' ); 

/****************************************/
/*Добавляет кнопку очистки кэша страницы*/
/****************************************/

var PurgeButtonText = 'Обновить';
importScriptPage( 'PurgeButton/code.js', 'dev' );

// Deus Ex Wiki Menu support script
$(function() {
    $('.deusex-wiki-menu-level-1-item').show();
    $('.deusex-wiki-menu-item').each(function() {
        if ($(this).data("opener-for") !== '') {
            var $menuItem = $(this);
            $(this).children().click(function() {
                if ($('.deusex-wiki-menu-item').is(':animated')) {
                    return;
                }
                var hideLevels = [0];
                if ($menuItem.hasClass('deusex-wiki-menu-level-1-item')) {
                    hideLevels = [3, 2];
                } else if ($menuItem.hasClass('deusex-wiki-menu-level-2-item')) {
                    hideLevels = [3];
                }
                toggleMenu(hideLevels, $menuItem.data("opener-for"));
            });
        }
    });
 
    function toggleMenu(levels, dataOpenBy) {
        var duration = 100;
        var delay = 0;
        $.each(levels, function(index, level) {
            var visibleItemsCount = $('.deusex-wiki-menu-level-' + level + '-item:visible').length;
            if ($('.deusex-wiki-menu-level-' + level + '-item').is(":visible")) {
                $($('.deusex-wiki-menu-level-' + level + '-item:visible').get().reverse()).each(function() {
                    $(this).delay(delay).fadeOut(duration, function() {
                    });
                    delay += duration;
                });
            }
        });
 
        $('.deusex-wiki-menu-item[data-open-by="' + dataOpenBy + '"]:hidden').each(function() {
            $(this).delay(delay).queue(function(next) {
                $(this).css({
                    opacity: 0,
                    display: 'inline-block'
                });
                next();
            }).animate({
                opacity: 1
            }, duration);
            delay += duration;
        });
        // }
    }
    // Temporary, for menu test purposes only
    if (mw.config.get('wgTitle') === 'Wildream/Deus Ex Wiki Menu' && mw.config.get('wgAction') === 'view') {
        $('.mw-content-text, .WikiaMainContent').width($('.mw-content-text').width() + 320);
        $('.WikiaRail').hide();
    }
});