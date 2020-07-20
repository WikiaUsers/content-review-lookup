window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];
 
/** Summary filler
  * de RuneScape Wiki
  */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');
 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) { 
     mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": imageFile, 
        "speedTip": speedTip, 
        "tagOpen": tagOpen, 
        "tagClose": tagClose, 
        "sampleText": sampleText
    }; 
}
 
/* Personagem */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/9/99/%C3%8Dcone_de_Personagem.png','Personagem','{{','}}','Personagem\n|nome                            = \n|Imagem                           = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|espécie                         = \n|planeta                         = \n|idade                           = \n|afiliação                       = \n|ocupação                        = \n|originalmente                   = \n|habilidades                     = \n|equipamento                     = \n|parentes                        = \n|apelidos                        = \n|dublagem                             = \n|primeira                        = \n','');

/* Alienígena */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/c/c1/%C3%8Dcone_de_Alien%C3%ADgena.png','Alien','{{','}}','Alien\n|nome       = \n|Imagem         = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|espécie         = \n|planeta      = \n|originalmente         = \n|poder       = \n|dublagem        = \n|primeira     = \n','');

/* Vilão */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/a/af/%C3%8Dcone_de_Vil%C3%A3o.png','Vilão','{{','}}','Vilão\n|nome                  = \n|Imagem               = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|espécie               = \n|planeta             = \n|idade                 = \n|afiliação             = \n|ocupação              = \n|originalmente         = \n|habilidades           = \n|equipamento           = \n|parentes                   = \n|apelidos                   = \n|dublagem                   = \n|primeira              = \n','');

/* Episódio */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/9/93/%C3%8Dcone_de_Epis%C3%B3dio.png','Episódio','{{','}}','Episódio\n|nome       = \n|imagem       = Sem Imagem Ep.png\n|estreia eua       = \n|estreia br       = \n|série         = \n|temporada      = \n|nome original         = \n|número do episódio         = \n|número total         = \n|anterior         = \n|seguinte         = \n|dirigido por         = \n|escrito por         = \n','');

/* Objeto */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/3/3a/%C3%8Dcone_de_Objeto.png','Objeto','{{','}}','Objeto\n|nome       = \n|Imagem       = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|planeta         = \n|uso         = \n|tipo        = \n|poder         = \n|primeira       = \n','');

/* Local */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/e/e6/%C3%8Dcone_de_Local.png','Local','{{','}}','Local\n|nome                   = \n|Imagem                 = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|lugar                  = \n|tipo                   = \n|donos                  = \n|primeira      = \n','');

/* Galeria */
addCustomButton('http://images.wikia.com/ben10reboot/pt-br/images/2/20/%C3%8Dcone_de_Galeria.png','Galeria','{{DISPLAYTITLE:Galeria: }}','[[Categoria:Galerias]]','\n{{Voltar}}\n<tabber>\n\n<gallery position="center" orientation="none" hideaddbutton="true" widths="163" bordersize="none" bordercolor="transparent">\n\n</gallery>\n</tabber>\n','');

//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts'];
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];

//Add border color to infoboxes
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});