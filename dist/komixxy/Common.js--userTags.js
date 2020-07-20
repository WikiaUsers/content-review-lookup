// UserTag
// http://dev.wikia.com/wiki/UserTags
// Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity)


window.UserTagsJS = {
	'Skrypter':		{ u:'Skrypter', m:'Skrypter', f:'Skrypterka', title:'Administrator techniczny' },
	'Projektant':		{ u:'Projektant', m:'Projektant', f:'Projektantka', title:'Wizjoner i designer' },
	'Ekspert od screenów':	{ u:'Ekspert od screenów', m:'Ekspert od screenów', 
	}
};

UserTagsJS.modules.custom = {
// BIUROKRACI
	'Kaktus80':		
    	'Wojnx':		   

// ADMINISTRATORZY

// MODERATORZY

UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});