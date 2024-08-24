importScriptPage('MediaWiki:Common.js/Tabber.js'); 
importScriptPage('BackToTopButton/code.js', 'dev'); 
importScriptPage('MediaWiki:YoutubePlayer/code.js', 'dev');
importScriptPage('MediaWiki:PortalSlider.js');


/* Atualizando automaticamente mudanças recentes
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/** Summary filler
  * de RuneScape Wiki
  */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');
 
 function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) 
 { mwCustomEditButtons[mwCustomEditButtons.length] = 
 {"imageFile": imageFile, 
 "speedTip": speedTip, 
 "tagOpen": tagOpen, 
 "tagClose": tagClose, 
 "sampleText": sampleText}; 
 }
 
/* Botão Personagem */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/b/b7/Icon_personagens_2.png','Personagem','{{','}}','Personagem\n|nome                            = \n|Série1                          = \n|Imagem1                         = \n|Série2                          = \n|Imagem2                         = \n|Série3                          = \n|Imagem3                         = \n|Série4                          = \n|Imagem4                         = \n|Série5                          = \n|Imagem5                         = \n|espécie                         = \n|planeta                         = \n|idade                           = \n|afiliação                       = \n|ocupação                        = \n|originalmente                   = \n|amigo                           = \n|inimigo                         = \n|habilidades                     = \n|equipamento                     = \n|parentes                        = \n|apelidos                        = \n|linhas temporais alternativas   = \n|voz                             = \n|bra                             = \n|primeira                        = \n','');

/* Botão Alienígena */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/1/12/OXS6DJS.png','Alien','{{','}}','Alien\n|nome       = \n|Série1    = \n|Imagem1         = \n|Série2         = \n|Imagem2        = \n|Série3      = \n|Imagem3         = \n|Série4       = \n|Imagem4       = \n|Série5       = \n|Imagem5       = \n|espécie         = \n|planeta      = \n|corpo      = \n|predador      = \n|originalmente         = \n|tradução         = \n|poder       = \n|voz        = \n|dublagem        = \n|primeira     = \n|parentes = \n','');

/* Botão Vilão */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/3/35/Icon_vil%C3%B5es.png','Vilão','{{','}}','Vilão\n|nome                  = \n|Série1                = \n|Imagem1               = \n|Série2                = \n|Imagem2               = \n|Série3                = \n|Imagem3               = \n|Série4                = \n|Imagem4               = \n|Série5                = \n|Imagem5               = \n|espécie               = \n|idade                 = \n|afiliação             = \n|ocupação              = \n|originalmente         = \n|habilidades           = \n|equipamento           = \n|voz                   = \n|bra                   = \n|primeira              = \n','');

/* Botão Episódio */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/8/81/Icon_episódios_2.png','Episódio','{{','}}','Episódio\n|nome       = \n|imagem       = \n|estreia         = \n|série         = \n|arco        = \n|temporada      = \n|nome original         = \n|literalmente       = \n|número do episódio         = \n|número geral         = \n|anterior         = \n|seguinte         = \n|escrito por         = \n|dirigido por         = \n','');

/* Botão Artefatos e Objetos */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/c/ce/Icon_objetos_2.png','Artefatos/Objetos','{{','}}','Artefatos/Objetos\n|nome       = \n|imagem       = \n|planeta         = \n|uso         = \n|tipo        = \n|poder         = \n|primeira       = \n','');

/* Botão Local */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/a/ae/Icon_lugares.png','Local','{{','}}','Local\n|nome                   = \n|imagem                 = \n|lugar                  = \n|tipo                   = \n|donos                  = \n|primeira_aparição      = \n','');


 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
 
// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE


function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_1334882127625"><param name="movie" value="http://universoben10.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334882127625&v=0&w=0"/><embed id="emb_1334882127625" src="http://universoben10.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334882127625&v=0&w=0"></embed></object><br>[ <a href="http://universoben10.chatango.com/clonegroup?ts=1334882127625">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334882127625">Start New</a> | <a href="http://universoben10.chatango.com/">Full Size</a> ]';
  }
}
 
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}


/* Mensagem para usuários não registrados. Criado por: BlackZetsu */
if (wgUserName === null)
    var WikiaNotificationMessage = "<a href='/wiki/Especial:UserSignup'>Não é registrado? Se registre agora clicando aqui, é grátis!</a>"; 
    // Mensagem
    importArticles({
        type: "script",
        articles: [
            "w:dev:WikiaNotification/code.js", // Notificação Wikia
        ]
    });

// Discord
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js' /
            ]
});