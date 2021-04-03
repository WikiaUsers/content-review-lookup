// Загрузить js для Заглавной страницы
if(document.getElementById('mainpage-box')){
    importScript('MediaWiki:Mainpage.js');
}
// Загрузить js для Вставки панорам
if(document.getElementById('panorama')){
    importScript('MediaWiki:Panorama.js');
}

// Загрузить js для Вставки видео с Coub
if(document.getElementById('coub')){
    importScript('MediaWiki:Coub.js');
}

// Загрузить js для Вставки панорам с Sketchfab
if(document.getElementById('sketchfab')){
    importScript('MediaWiki:Sketchfab.js');
}

// Загрузить js для расчета себестоимости
/*if(document.getElementById('CalcCost')){
    importScript('MediaWiki:CalcCost.js');
}*/

// Загрузить js для карты ( перенес в MediaWiki:ImportJS )
/*if(document.getElementById('Maps')){
    importScript('MediaWiki:Maps.js');
}*/

/*(function(){
    importWikiaScriptPages(["Maps.js"]);
})();*/

/*Случайный фон */
 
document.addEventListener("DOMContentLoaded", function(event){ 
    var imgs = [
        //'https://vignette.wikia.nocookie.net/crossout/images/c/cb/Bg1.jpg/revision/latest?cb=20170607100343&path-prefix=ru',
        //'https://vignette.wikia.nocookie.net/crossout/images/a/a5/Bg2.jpg/revision/latest?cb=20170607100405&path-prefix=ru',
        //'https://vignette.wikia.nocookie.net/crossout/images/f/ff/Bg3.jpg/revision/latest?cb=20170607100413&path-prefix=ru',
        //'https://vignette.wikia.nocookie.net/crossout/images/3/32/Bg4.jpg/revision/latest?cb=20170607100421&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/crossout/images/5/50/Wiki-background/revision/latest?cb=20200206062713l&path-prefix=ru',
    ];
 
 /*
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});
 */
 
    document.getElementsByTagName("body")[0]
        .setAttribute("style", 'background-image:url(' 
        + imgs[Math.floor((imgs.length) * Math.random())] + '); background-attachment: fixed !important; background-size: cover; background-position: center center;');
 
});

/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/320091590741983242/embed.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
 
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Подробнее <a href="http://ru.crossout.wikia.com/wiki/Discord" target="_blank">тут</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4>Пользователи онлайн <div class="discord-chevron" style="float: right"></div></h4>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<ul class="discord-list"></ul>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    data.members.forEach(function (v) {
        var $member = $('<li class="discord-member">' +
            '<div class="discord-avatar">' +
                '<img />' +
            '</div>' +
        '</li>');
        $member.append(v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : ''));
        $member.find('.discord-avatar').addClass("discord-" + v.status);
        $member.find('img').attr("src", v.avatar_url);
 
        $module.find(".discord-list").append($member);
    });
 
    var toggle      = $module.find('.discord-chevron'),
        collapsible = $module.find('.discord-list');
 
    collapsible.hide();
    toggle.click(function() {
        if ( !toggle.hasClass('opened') ) {
            collapsible.slideDown();
            toggle.addClass('opened');
        } else {
            collapsible.slideUp();
            toggle.removeClass('opened');
        }  
    });
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
 
})();

/***************Tooltip***********************/
/*
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/ru/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
}); 

// Simple tooltips //
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');
 
function addMastheadTags() {
  var rights = {};
  
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    } 
}; 
*/
/*********************Tooltip end************************************/

/* Автообновление вики-активности */
importArticles({
    type: 'script',
    articles: [
        'w:dev:AjaxRC/code.js',
    ]
});
 
var ajaxPages 
= ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText 
= 'Автообновление страницы';

/**///////////Последние изменения///////////////////////////*/
$(function() {
    if (mw.config.get('wgNamespaceNumber') === 0 && !$.getUrlVar('diff') && !$.getUrlVar('oldid')) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            console.log(data);
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
            var html = '<div class="lastEdited">Последняя правка совершена <a href="/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> (' + new Date(rv.timestamp).toUTCString().slice(0, 16) + ') </a>, ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC) <a class="lastEdited-diff">(разн)</a></div>';
            $('#PageHeader').after(html);
            mw.loader.using(['mediawiki.action.history.diff'], function() {
                $('.lastEdited-diff').on('click', function() {
                    $.showCustomModal('Изменения: ' + mw.config.get('wgPageName').replace(/_/g, ' '), rv.diff['*'], {
                        id: 'lastEdited-diff',
                        width: 650,
                        buttons: [{
                            message: 'Link',
                            defaultButton: true,
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/?diff=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Undo',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Cancel',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                            }
                        }]
                    });
                });
            });
        });
    }
});

/**/////////// CategoryIcon ///////////**/
/* https://dev.fandom.com/wiki/CategoryIcon/ru */
//создать объект опций
window.fng = $.extend(window.fng, {cicon:{}});
//задать расширение .png
window.fng.cicon.ext = '.png';
//добавить 'Map ' к именам картинок ('Map Earth' и тп)
window.fng.cicon.iprepend = '';
//запросить изменение размера до 50px
window.fng.cicon.scale = '/scale-to-width-down/50';
/**/////////// CategoryIcon End ///////////**/

/*// Шаблон:Купить //*/
;(function($, mw) {
    if (!$('.buy_box').length) { return; }
    
    $('.buy_box .buy_nav .buy_box_btn').first().addClass('act');
    $('.buy_box .buy_block').first().addClass('act');
    
    $('.buy_box .buy_nav .buy_box_btn').click(function(e) {
        v = $(this).attr('data-box');
        $('.buy_box .buy_nav .buy_box_btn').removeClass('act');
        //$('.buy_box .buy_nav .buy_box_btn').removeProperty("background-color");
        //$('.buy_box .buy_nav .buy_box_btn').css("border-color","rgba(0,0,0,0.00)");
        $('.buy_box .buy_block').removeClass('act');
        //$('.buy_box .buy_block').css("display","none");
        $(this).addClass('act');
        $('.buy_box .buy_block.buy_'+v).addClass('act');
    });

})(this.jQuery, this.mediaWiki);
/*////*/