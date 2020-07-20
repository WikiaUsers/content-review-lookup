// UserTag
 // http://dev.wikia.com/wiki/UserTags
 // Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity)
 
 
 window.UserTagsJS = {
 	modules: {},
 	tags: {
 	'Administrator':		{ u:'Administrator', m:'Administrator', f:'Administrator' },
 	'Biurokrata':			{ u:'Biurokrata', m:'Biurokrata', f:'Biurokrata' },
 	'Założyciel':			{ u:'Założyciel', m:'Założyciel', f:'Założyciel' }
 	}
 };
 
 UserTagsJS.modules.custom = {
 	'Albina von Roth':       ['Hrabina','Ślązaczka']
 };
 
 importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});