// ************
// Importación de las opciones del chat
// ************
// Escrito por Sactage, Callofduty4 y Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
}
// ****************
// Fin de la importación
// ****************

importArticles({
type: 'script',
articles: [
'MediaWiki:Chat-toolbox.js',
'u:dev:MediaWiki:ChatToolbox/code.js',
]
});