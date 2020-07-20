

/*Original: http://ru.elderscrolls.wikia.com/wiki/MediaWiki:Chat.js*/
$(function() {
    if ($('#HeadLineBar').length) {
        return;
    }
    var headline_styles = 'display:inline-block; width:300px; font-size:12px; text-align:center; line-height:14px; padding:7px 0; color:#3a3a3a; font-weight:bold; position:absolute; right:160px;';
    var headline_bar = '<div id="HeadLineBar" style="' + headline_styles + '"></div>';
    $('.ChatHeader > .wordmark').append(headline_bar);
});
 
/*********************************/
 
function appendTimestamps() {
    if(cwmLoaded === true) {
        timer = new Date();
        hours = timer.getHours() % 12;
        if (hours === 0) { hours = 12; }
        minutes = timer.getMinutes();
        seconds = timer.getSeconds();
        if($("#entry-"+JLAPI.mostRecentMessage.cid()).hasClass('inline-alert')) {
            $("#entry-"+JLAPI.mostRecentMessage.cid()).append("<span class='time' style='font-weight: initial;'>"+hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2)+"</span>");
        } else {
            $("#entry-"+JLAPI.mostRecentMessage.cid()+" > span.time").html(hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2));
        }
    }
}

/* ChatTags */
var chatags = {images: true, videos: true };

/*------------------------------------------------------------------------------*/
//importScriptPage('SpeedEmoticon/code.js','korniux');
importArticles({
    type:'script',
    articles: [
        // ----
        "w:c:shining-armor:MediaWiki:ChatTags/code.js",
        "MediaWiki:ChatSmiles.js",
        "w:c:dev:MediaWiki:ChatOptions/code/ru.js"
        // ----
        ]
    });


/* Фунция открывания правил в чате */
function openRules(){
    window.open("http://ru.steven-universe.wikia.com/wiki/Steven_Universe_Wiki:%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0_%D1%87%D0%B0%D1%82%D0%B0", "Window", "scrollbars=yes, resizable=yes, width=814, height=659");
}
 
/* Добавление кнопок в чат */
$(window).load(function addButtons() {
    var $o = $('#chatOptionsButton');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        $o.after('<nav id="btnTheme" class="wikia-menu-button"><div style="text-align: center;" id="themeNum">Фон 1</div><ul class="WikiaMenuElement" style="width: 100%;"><li><a data-theme="0">Фон 1</a></li><li><a data-theme="1">Фон 2</a></li><li><a data-theme="2">Фон 3</a></li><li><a data-theme="3">Фон 4</a></li><li><a data-theme="4">Фон 5</a></li><li><a data-theme="5">Фон 6</a></li><li><a data-theme="6">Фон 7</a></li><li><a data-theme="7">Фон 8</a></li><li><a data-theme="8">Фон 9</a></li></ul></nav>'
        +
        "<input id='btnOpenOptions' class='option-button chat-big' onclick='openOptions();' type='button' value='Опции'></input>"
        +
        "<input id='btnRules' class='option-button' onclick='openRules();' type='button' value='Правила'></input>");
        /* Скрываем кнопку "Options" */
        $o.remove();
        $('#btnTheme').hover(function(){$(this).toggleClass('active')});
 
        $("#btnTheme .WikiaMenuElement a").mouseup(function(event){
            if ( event.which != 1 ) {
                return false;
            }
            var t = $(this).attr("data-theme");
            $("#btnTheme #themeNum").html("Фон " + (parseInt(t)+1));
            $("body").css("background-image", themes[t]);
        });
    }
});
 
/* Фунция смены темы чата */
 
var themes = [
        '', //Ничего
        'url(\'http://i.imgur.com/h56AYQD.png\')',
        'url(\'http://i.imgur.com/PbaWFMs.png\')',
        'url(\'http://i.imgur.com/NfSI2xC.png\')',
        'url(\'http://i.imgur.com/8mjHNoT.png\')',
        'url(\'http://i.imgur.com/aNrHKQn.png\')',
        'url(\'http://i.imgur.com/v6iXPzs.png\')',
        'url(\'http://i.imgur.com/HRv51aT.png\')',
        'url(\'http://i.imgur.com/TI963jh.png\')'
        ];
 
$("body").addClass("theme0");