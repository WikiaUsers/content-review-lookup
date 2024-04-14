/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importScript('MediaWiki:Chat.js');

/* Herramienta Show/Hide */
var ShowHideConfig = { 
    es: {
	show: "mostrar",
	hide: "ocultar",
	showAll: "mostrar todo",
	hideAll: "ocultar todo"
    }
};
importScriptPage('ShowHide2/code.js', 'dev');