
// Special:CreatePage - Shodai Tsuchi
	if (mw.config.get('skin') === 'oasis') {
		// Special:CreatePage
		$(window).load(function() {
            $('a.createpage').off('click').attr('href', '/wiki/Special:CreatePage');
		});
    }


/* Novos botões na barra de ferramentas */
 function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText
    };
}
 
 importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});
 
/* Atualização automática mudanças recentes opt-in
 * Veja w:c:dev:AjaxRC para informação & atribuição
 */
AjaxRCRefreshText = 'Auto-atualização';
AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/** Botão Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');
 
/** Botão Sim1 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/2/21/Bot%C3%A3o_Sim1.png','Sim1','{{','}}','Sim1\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|casa         = \n|colegas      = \n|animais      = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão Sim2 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/3/32/Bot%C3%A3o_Sim2.png','Sim2','{{','}}','Sim2\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|animais      = \n|ano            = \n|especialização = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspiração    = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão Sim3 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/7/7e/Bot%C3%A3o_Sim3.png','Sim3','{{','}}','Sim3\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|celebridade  = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|animais      = \n|matéria      = \n|carreira     = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|signo        = \n|traço1       = \n|traço2       = \n|traço3       = \n|traço4       = \n|traço5       = \n|desejo       = \n|música       = \n|comida       = \n|cor          = \n|grupo1       = \n|grupo2       = \n|grupo3       = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');

/** Botão Sim4 **/
addCustomButton('https://vignette.wikia.nocookie.net/simswiki/images/d/d7/Bot%C3%A3o_Sim4.jpg/revision/latest?cb=20140906165026&path-prefix=pt-br','Sim4','{{','}}','Sim4\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|aspiração2   = \n|traçoextra   = \n|traço41      = \n|traço42      = \n|traço43      = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão Simbio-começo **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/c/ce/Bot%C3%A3o_Simbio-come%C3%A7o.png','Simbio-começo','{{','}}','Simbio-começo\n|imagem  = \n|nome    = \n|sexo    = \n|família = \n|pais    = \n|irmãos  = \n|cônjuge = \n|filhos  = \n|outros  = \n','');
 
/** Botão Simbio1 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/a/a7/Bot%C3%A3o_Simbio1.png','Simbio1','{{','}}','Simbio1\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão Simbio2 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/e/e4/Bot%C3%A3o_Simbio2.png','Simbio2','{{','}}','Simbio2\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|ano            = \n|especialização = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspiração    = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão Simbio3 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/8/88/Bot%C3%A3o_Simbio3.png','Simbio3','{{','}}','Simbio3\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|matéria      = \n|carreira     = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|signo        = \n|traço1       = \n|traço2       = \n|traço3       = \n|traço4       = \n|traço5       = \n|desejo       = \n|música       = \n|comida       = \n|cor          = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão Simbio4 **/
addCustomButton('https://vignette.wikia.nocookie.net/simswiki/images/3/3e/Bot%C3%A3o_Simbio4.jpg/revision/latest?cb=20140906165401&path-prefix=pt-br','Simbio4','{{','}}','Simbio4\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspiração2   = \n|traçoextra   = \n|traço41      = \n|traço42      = \n|traço43      = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');

/** Botão Simbio-fim **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/3/35/Bot%C3%A3o_Simbio-fim.png','Simbio-fim','{{','}}','Simbio-fim','');
 
/** Botão DEFAULTSORT **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/9/99/Bot%C3%A3o_Defaultsort.png','Simbio-fim','{{','}}','DEFAULTSORT:sobrenome, nome','');
 
// Aviso de Edição - Escrito por Shodai Tsuchi
if (mw.config.get('wgCanonicalSpecialPageName') == 'CreatePage') {
        $.showCustomModal('<div style="font-weight:bold;color:#ff0000;"><center>Aviso!</center></div>',
                'Olá, caro editor! Antes de começar, algumas dicas: <br /> * Se o artigo que você vai criar envolver tradução de outra língua, tenha cuidado ao usar o Google Tradutor! Adapte sua edição à norma padrão da língua portuguesa antes de publicá-la! <br /> * Lembre-se de ter uma linguagem imparcial, informativa e racional: nada dar a sua própria opinião nas páginas de conteúdo! (De Histórias, posts de blog e comentários pode!) <br /> * Sua linguagem deve ser também impessoal. Evite usar "você", "eu", "o seu Sim", entre outros. <br /> <center><big>Boa sorte! Obrigado por colaborar com a The Sims Wiki!</big></center>', {
                    id: "cancel",
                    width: 600,
                    buttons: [{
                        message: "Prosseguir",
                        handler: function() {
                            $("#cancel").closeModal();
            }
        }]
    });
}
 
function prosseguir() {
    $("#cancel").closeModal();
}
 
function aviso() {
    $.get(mw.util.wikiScript('api'), {
        format: 'json',
        action: 'query',
        title: mw.config.values.wgPageName,
        token: mw.user.tokens.get("editToken"),
        success: prosseguir()
    });
} 

// Special:CreatePage - Shodai Tsuchi
	if (mw.config.get('skin') === 'oasis') {
		// Special:CreatePage
		$(window).load(function() {
            $('a.createpage').off('click').attr('href', '/wiki/Special:CreatePage');
		});
    }
 
 
/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/* Scripts importados */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js', /* Tabelas recolhíveis (agora inútil, apresenta por padrão com "mw-collapsible") */
        'u:dev:Countdown/code.js', /* Contagem regressiva */
        'u:dev:ExternalImageLoader/code.js', /* Predefinição ImagemExterna */
        'u:dev:WallGreetingButton/code.js', /* Botão para as WallGreetings */
        'u:dev:ReferencePopups/code.js' /* Referências em pop-up */
    ]
});

/* Substitui {{Visitante}} com o nome do usuário que visitar a página. Requer a cópia: Predefinição:NOMEDOUSUÁRIO. */  
function UserNameReplace() { 
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) 
        return; $("span.insertusername").html(wgUserName); 
} 
    addOnloadHook(UserNameReplace);  

/* Fim da substituição {{Visitante}} */