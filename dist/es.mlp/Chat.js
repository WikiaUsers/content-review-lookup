/*Importaciones*/
/**Developers Wiki**/
/***C�digos***/
importArticles({
    type: 'script',
    articles: [
/***Bot�n de enviar***/
        'u:dev:ChatSendButton.js',
/***Contador de mensajes no le�dos al estar en otra pesta�a***/
        'u:dev:NewMessageCount.js',
/***Aviso de mensaje privado***/
        'u:dev:PrivateMessageAlert/code.js'
    ]
});
/****Actualizar emoticones sin salir del chat****/
ajaxEmoticonsInterval = 5000;
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
        this.value = this.value.replace (/Especial:Chat|Special:Chat/gi,'w:c:es.mlp No se enlaza a otros chats. (rare��)');
        }
    }
)