/*Importaciones*/
/**Chat-toolbox**/
importScriptPage('MediaWiki:ChatToolboxCode.js');
/**Developers Wiki**/
/***Códigos***/
importArticles({
    type: 'script',
    articles: [
/***Botón de enviar***/
        'u:dev:ChatSendButton.js',
/***Contador de mensajes no leídos al estar en otra pestaña***/
        'u:dev:NewMessageCount.js'
    ]
});
/****Actualizar emoticones sin salir del chat****/
ajaxEmoticonsInterval = 15000;
importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');
/*Remplazo de palabra*/
document.getElementsByName('message')[0].onkeypress = function(e) {
    if ( e.which == 32 ) {
        if ( this.value == 'multifacepalm' ) {
            this.value = '(facepalm) (ckfp) (derpyfp) (lunafp) (lyrafp) (pcfp) (ppfp) (rarefp) (rdfp) (scootfp) (snipsfp) (spikefp) (vinylfp) (extremefacepalm)';
        }
    }
    if ( e.which == 32 ) {
        if ( this.value == 'mane6' ) {
            this.value = '(aj) (shy) (pp) (rarity) (rd) (ts)';
        }
    }
}
/*Filtro de chats de otras wikis*/
$( '[name="message"]' ) .keypress( function(e) {
    if ( e.which == 32 || e.which == 13 ) {
        this.value = this.value.replace (/Especial:Chat|Special:Chat/gi,'w:c:es.pacmanylasaventurasfantasmales Sin links de otros chats (angrypinkie)');
        }
    }
)