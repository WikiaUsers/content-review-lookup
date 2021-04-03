/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Countdown: Конфигурация DEV'овского таймера*/
window.countdownTimer = {
    showText: function () {
        var $this = $(this);
        if ( $this.attr("data-text") ) {
            $this.text($(this).attr("data-text"));
        } else {
            $this
                .css("opacity","0")
                .css("pointer-events","none");
        }
    }
};
/*Конец конфигурации таймера*/


/****************************************/
/* Sliders using jquery by User:Tierrie (это используется?) */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
    });
});

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});


//Скрытие элементов FixImage
$( ".rcmMenu" ).on( "contextmenu", function(event) {
    $( "#customContextMenu" )
        .css("display", "block")
        .css("top", event.pageY - window.pageYOffset + "px")
        .css("left", event.pageX - window.pageXOffset + "px");
    $( "#customContextMenu" ).on( "contextmenu", function() {
        return false;
    });
    $(document).click(function(event) {
        if ($(event.target).closest("#customContextMenu").length) return;
            $("#customContextMenu").hide("slow");
            event.stopPropagation();
        }
    );
    return false;
});
$(".WikiaBarWrapper .toolbar").after("<ul id='customContextMenu' class='hideFixImage'><li><a>Скрыть все фиксированные изображения</a></li></ul>");
$(".hideFixImage").click(function(){
    $(".FixImage").hide();
});

/*# Смена класса для <body> в зависимости от времени #*/
(function($) {
    'use strict';
    var d = new Date(),
    h = d.getHours(),
    s = (h >= 21 || h <= 6) ? 'night' : 'day';
    $('body.skin-oasis').addClass(s);
})(this.jQuery);

/*#################################################################*/
/*  Все прочие скрипты импортируются через [[MediaWiki:ImportJS]]  */
/*#################################################################*/