/********************************************************************************/
/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */
/********************************************************************************/
/* Importação */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js",
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:ShowHide/code.js",
        "w:dev:View_Source/code.js",
        "w:dev:WallGreetingButton/code.js",
        "w:dev:InactiveUsers/code.js",
        "w:dev:AjaxRC/code.js",
        "w:dev:BackToTopButton/code.js",
        "w:dev:FloatingToc/code.js",
        "w:dev:SocialIcons/code.js",
    ]
});
 
var SocialMediaButtons = { 
  position: "bottom",
  colorScheme: "dark",
  wikiTwitterAccount: "default"
};

/* Auto Refresh */
AjaxRCRefreshText = 'Carregamento automático';
AjaxRCRefreshHoverText = 'Atualiza automaticamente a página';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity"];
 
/* Usuários sem edições recentemente */
InactiveUsers = { text: 'Não editou recentemente' };
 
/* Slider */
// Slider
// Autor: Pecoes & Vuh
// Udostępniane na tej Wiki na licencji CC-BY-NC-SA za zgodą autora
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl
 
if (mediaWiki.config.get('wgAction') === 'view')  (function () {
 
    'use strict';
 
    function createSlider () {
        /*jshint validthis:true*/
        var scrollPane = $(this),
            scrollPaneWidth = scrollPane.width(),
            scrollContent = scrollPane.find('.scroll-content'),
            scrollContentWidth = 0;
 
        scrollContent.find('img').each(function () {
            var $this = $(this),
                width = $this.width();
            if (width) {
                scrollContentWidth += width;
            } else {
                $this.on('load', function () {
                    scrollContentWidth += $this.width();
                });
            }
        });
 
        var scrollbar = scrollPane.find('.scroll-bar').slider({
            slide: function(event, ui) {
                if (scrollContentWidth > scrollPaneWidth) {
                    scrollContent.css('margin-left', Math.round(
                        ui.value / 100 * (scrollPaneWidth - scrollContentWidth)
                    ) + 'px');
                } else {
                    scrollContent.css('margin-left', 0);
                }
            }
        });
 
        scrollPane.css( "overflow", "hidden" );
 
        scrollbar.find('.ui-slider-handle').css({
            width: '60px',
            marginLeft: '-30px'
        });
    }
 
    $(function () {
        var imgSlider = $('.img-slider');
        if (!imgSlider.length) return;
 
        $('head')
        .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" /><style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #999; box-shadow: 0 0 4px #0E4B4E; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: #0E4B4E; border: none; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 #0E4B4E; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider * { margin: 0; padding: 0; } .img-slider figure { display: inline-block; }</style>');
 
        imgSlider
        .wrap('<div class="scroll-pane"></div>')
        .addClass('scroll-content')
        .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');
 
        mediaWiki.loader.using('jquery.ui.slider', function () {
            $('.scroll-pane').each(createSlider);
        });
    });
}());

/* class="insertusername" */
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) {return;}
    var n = document.getElementsByClassName('insertusername');
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);