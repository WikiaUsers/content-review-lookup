importScriptPage('MediaWiki:Common.js/Tabber.js'); 
importScriptPage('BackToTopButton/code.js', 'dev'); 
importScriptPage('MediaWiki:YoutubePlayer/code.js', 'dev');
importScriptPage('MediaWiki:PortalSlider.js');


/* Atualizando automaticamente mudan�as recentes
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
 
/* Bot�o Personagem */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/b/b7/Icon_personagens_2.png','Personagem','{{','}}','Personagem\n|nome                            = \n|S�rie1                          = \n|Imagem1                         = \n|S�rie2                          = \n|Imagem2                         = \n|S�rie3                          = \n|Imagem3                         = \n|S�rie4                          = \n|Imagem4                         = \n|S�rie5                          = \n|Imagem5                         = \n|esp�cie                         = \n|planeta                         = \n|idade                           = \n|afilia��o                       = \n|ocupa��o                        = \n|originalmente                   = \n|amigo                           = \n|inimigo                         = \n|habilidades                     = \n|equipamento                     = \n|parentes                        = \n|apelidos                        = \n|linhas temporais alternativas   = \n|voz                             = \n|bra                             = \n|primeira                        = \n','');

/* Bot�o Alien�gena */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/1/12/OXS6DJS.png','Alien','{{','}}','Alien\n|nome       = \n|S�rie1    = \n|Imagem1         = \n|S�rie2         = \n|Imagem2        = \n|S�rie3      = \n|Imagem3         = \n|S�rie4       = \n|Imagem4       = \n|S�rie5       = \n|Imagem5       = \n|esp�cie         = \n|planeta      = \n|corpo      = \n|predador      = \n|originalmente         = \n|tradu��o         = \n|poder       = \n|voz        = \n|dublagem        = \n|primeira     = \n|parentes = \n','');

/* Bot�o Vil�o */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/3/35/Icon_vil%C3%B5es.png','Vil�o','{{','}}','Vil�o\n|nome                  = \n|S�rie1                = \n|Imagem1               = \n|S�rie2                = \n|Imagem2               = \n|S�rie3                = \n|Imagem3               = \n|S�rie4                = \n|Imagem4               = \n|S�rie5                = \n|Imagem5               = \n|esp�cie               = \n|idade                 = \n|afilia��o             = \n|ocupa��o              = \n|originalmente         = \n|habilidades           = \n|equipamento           = \n|voz                   = \n|bra                   = \n|primeira              = \n','');

/* Bot�o Epis�dio */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/8/81/Icon_epis�dios_2.png','Epis�dio','{{','}}','Epis�dio\n|nome       = \n|imagem       = \n|estreia         = \n|s�rie         = \n|arco        = \n|temporada      = \n|nome original         = \n|literalmente       = \n|n�mero do epis�dio         = \n|n�mero geral         = \n|anterior         = \n|seguinte         = \n|escrito por         = \n|dirigido por         = \n','');

/* Bot�o Artefatos e Objetos */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/c/ce/Icon_objetos_2.png','Artefatos/Objetos','{{','}}','Artefatos/Objetos\n|nome       = \n|imagem       = \n|planeta         = \n|uso         = \n|tipo        = \n|poder         = \n|primeira       = \n','');

/* Bot�o Local */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/a/ae/Icon_lugares.png','Local','{{','}}','Local\n|nome                   = \n|imagem                 = \n|lugar                  = \n|tipo                   = \n|donos                  = \n|primeira_apari��o      = \n','');


 
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


/* Mensagem para usu�rios n�o registrados. Criado por: BlackZetsu */
if (wgUserName === null)
    var WikiaNotificationMessage = "<a href='/wiki/Especial:UserSignup'>N�o � registrado? Se registre agora clicando aqui, � gr�tis!</a>"; 
    // Mensagem
    importArticles({
        type: "script",
        articles: [
            "w:dev:WikiaNotification/code.js", // Notifica��o Wikia
        ]
    });

// Discord
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js' /
            ]
});