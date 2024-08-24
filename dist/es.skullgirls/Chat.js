/*Códigos de Wikia Developers*/
/**Actualizador de Emotes**/
ajaxEmoticonsInterval = 1000;
importScriptPage('AjaxEmoticons/code.js', 'dev');
/**Chat Toolbox**/
/**Chat Tags*/
importArticles({
	type: "script",
	articles: [
		'MediaWiki:ChatToolbox.js',
        'MediaWiki:ChatTags.js'
	]
});
/*Música del Chat*/
$('<audio controls style="width:242px; position:absolute; top:16px; right:165px; border-radius:5px; background-color:orange;"><source src="https://images.wikia.nocookie.net/skullgirls-es/es/images/b/ba/M%C3%BAsicaChat.ogg" type="audio/ogg"></audio>').insertAfter('#ChatHeader');
/*Noticia o aviso para el Chat*/
$('<div style="position:absolute; top:13px; border-radius:5px; left:130px; text-align:center; background:linear-gradient(to bottom, orangered, red); color:white; border:1px solid darkred; height:35px; width:276px; font-weight:bold;">¡Sientete cómodo charlando en el Chat de Skullgirls Wiki!</div>').insertAfter('#ChatHeader');
/*Filtro de chats de otras wikis, código originado de MLP Wiki*/
$( '[name="message"]' ) .keypress( function(e) {
    if ( e.which == 32 || e.which == 13 ) {
        this.value = this.value.replace (/Especial:Chat|Special:Chat/gi,'w:c:es.skullgirls (* No enlaces a otros Chats *) (angryfilia)');
        }
    }
);