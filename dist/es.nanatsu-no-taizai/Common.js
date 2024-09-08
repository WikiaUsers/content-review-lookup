importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		gran: { u:'Gran Caballero Sagrado', f:'Gran Caballera Sagrada', m:'Gran Caballero Sagrado' },
		caballero: { m:'Caballero Sagrado', f:'Caballera Sagrada', u:'Caballero Sagrado' },
		caballerod: { m:'Caballero Sagrado Diamante', f:'Caballera Sagrada Diamante', u:'Caballero Sagrado Diamante' },
		caballerop: { m:'Caballero Sagrado Platino', f:'Caballera Sagrada Platino', u:'Caballero Sagrado Platino' },
		caballeroc: { m:'Caballero Sagrado Cardinal', f:'Caballera Sagrada Cardinal', u:'Caballero Sagrado Cardinal' },
	}
};
UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.custom = {
	'BlackQuimera08': ['caballeroc'],
	'ObscureFlame': ['caballeroc'],
	'Shirokoneko': ['caballerod'],
	'SacredOwl': ['gran']
};

// AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');