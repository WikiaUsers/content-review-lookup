/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3,
    brackets: '  ',
    userlang: false, 
    en: {
	show: "[show]",
	hide: "[hide]",
	showAll: "[expand all]",
	hideAll: "[collapse all]"
    }
}