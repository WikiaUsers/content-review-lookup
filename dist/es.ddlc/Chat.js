/*Importaciones*/
/**Developers Wiki**/
/***Códigos***/
importArticles({
    type: 'script',
    articles: [
/***Botón de enviar***/
        'u:dev:ChatSendButton.js',
/***Contador de mensajes no leídos al estar en otra pestaña***/
        'u:dev:NewMessageCount.js',
/***Caja de herramientas***/
        'u:dev:ChatToolbox/code.js',
/***Aviso de mensaje privado***/
        'u:dev:PrivateMessageAlert/code.js'
    ]
});
/*Filtro de chats de otras wikis*/
$( '[name="message"]' ) .keypress( function(e) {
    if ( e.which == 32 || e.which == 13 ) {
        this.value = this.value.replace (/Especial:Chat|Special:Chat/gi,'w:c:es.mlp No se enlaza a otros chats. (Sayori)');
        }
    }
);