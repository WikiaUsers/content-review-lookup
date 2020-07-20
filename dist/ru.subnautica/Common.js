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

// hides the tooltip
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}

// displays the tooltip
function displayTip(e) {
    $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $tfb.not(":empty").css("visibility", "visible");
}

// moves the tooltip
function moveTip(e) {
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($tfb.not(".hidden").innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($tfb.not(".hidden").innerWidth() + 20) : 20);
    $tfb.not(".hidden").css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}

// AJAX tooltips
function showTip(e) {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        $tfb.load("/" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "?action=render div.tooltip-content", function() {
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            displayTip(e);
        });
    }
}

function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
    $("#bodyContent").mouseover(hideTip);
    $("#bodyContent").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#bodyContent span.ajaxttlink").each(bindTT);
});

/* Simple tooltips */
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');

/* WikiEditor / Викификатор */
function addWikifButton() {
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return;
    var i = document.createElement('img');
    i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
    i.alt = i.title = 'викификатор';
    i.onclick = Wikify;
    i.style.cursor = 'pointer';
    toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
    importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
    addOnloadHook(addWikifButton);
}

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