/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Для шаблона - "ТвоёИмя" (http://ru.dont-starve.wikia.com/wiki/MediaWiki%3ACommon.js)*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.yourname").html(wgUserName);
});
/* Надпись для неактивных */
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВНЫЙ УЧАСТНИК'
};

/*Показ IP анонимов в комментах*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

 /* Автомат. плашки за правки  */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount > 1 && editCount <= 50) {
            title = "Новый участник";
        } else if (editCount > 50 && editCount <= 100) {
            title = "Хозяин щенка";
        } else if (editCount > 100 && editCount <= 400) {
            title = "Хозяин собаки";
        } else if (editCount > 400 && editCount <= 500) {
            title = "Заводчик";
        } else if (editCount > 500 && editCount <= 900) {
            title = "Ветеринар";
        } else if (editCount > 900 && editCount <= 1500) {
            title = "Опытный собаковод";
        } else if (editCount > 1500 && editCount <= 2000) {
            title = "Опытный участник";
        } else if (editCount > 2000 && editCount <= 3000) {
            title = "Профи";
        } else if (editCount > 3000 && editCount <= 5000) {
            title = "Всезнающий";
        } else if (editCount > 5000 && editCount <= 50000) {
            title = "Почётный участник";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );

/*Слайдер*/
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

//Adds a link to the original article when copying (if someone steals information from the project)

function addLink() {
  var body_element = document.getElementsByTagName('body')[0];
  var selection;
  selection = window.getSelection();
  var pagelink = '<br><br><br>' + "Источник: <a href='"+document.location.href+"'>"+document.location.href+"";
  var copytext = selection + pagelink;
  var newdiv = document.createElement('div');
  newdiv.style.position='absolute';
  newdiv.style.left='-99999px';
  body_element.appendChild(newdiv);
  newdiv.innerHTML = copytext;
  selection.selectAllChildren(newdiv);
  window.setTimeout(function() {
  body_element.removeChild(newdiv);
  },0);
}

document.oncopy = addLink;