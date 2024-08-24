/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

// Importes de p�ginas MediaWiki y de la Dev Wiki.
importArticles({
    type: 'script',
    articles: [
        "MediaWiki:Common.js/plok.js",
        'u:dev:UserTags/code.js'
 /* End of the {{USERNAME}} replacement */   ]
});
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 $(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 

/* User tags (de la Dev Wiki) */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bur�crata' },
		sysop: { u: 'Administrador' },
		rollback: { u: 'Reversor' },
		contentmod: { u: 'Moderador de contenido' },
		threadmoderator: { u: 'Moderador de Discusiones' },
		chatmod: { u: 'Moderador de Chat' }
	}
};
 
/* Para que el tag est� luego de los que est�n por default */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bur�crata', order: 1 },
		sysop: { u: 'Administrador', order: 2 },
		rollback: { u: 'Reversor', order: 3 },
		contentmod: { u: 'Moderador de contenido', order: 4 },
		threadmoderator: { u: 'Moderador de Discusiones', order: 5 },
		chatmod: { u: 'Moderador de Chat', order: 6 },
	}
};
 
/* Aplicamos los tags a los respectivos usuarios */
UserTagsJS.modules.custom = {
/* Bots y controladores (Bot de la wiki) */
    /*'Karma Akabane-bot': ['bot'],
/* Bureucrats (Bur�cratas) */
    'Thelosted': ['bureaucrat','sysop'],
    'Suzaku 13': ['bureaucrat','sysop'],
/* Sysops (Administradores) */
    'BranDaniMB': ['sysop'],
    'Minase Kirishima-Rei': ['sysop'],
/* Content Moderators (Moderadores de Contenidos) */
    'BRAIAN.FINN': ['threadmoderator'],
/* Chat Moderators (Moderadores del Chat */
    /* */
};