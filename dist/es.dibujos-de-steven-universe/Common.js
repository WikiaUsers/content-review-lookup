/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//UserTags Script y Configuración
window.UserTagsJS = {
	modules: {},
	tags: {
		diseñador: { u: 'Diseñador', order:1 },
		contentmod: { u: 'Mod de contenido', order:2 },
		reversor: { u: 'Reversor', order:3}
	}
};
UserTagsJS.modules.custom = {
	'AsrielDeathSoul': ['diseñador'],
	'ElNobDeTfm': ['diseñador'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});