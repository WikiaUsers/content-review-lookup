/********** Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. **********/
 
/* Código para los reversores */
window.UserTagsJS = {
	modules: {},
	tags: {
                jshelper: { u: 'Bot', order: 100 },
		rollback: { u: 'Reversor', order: 2 },
		bureaucrat: { u: 'Burócrata', order: 1 }
	}
};

UserTagsJS.modules.custom = {
	'LinikBot': ['jshelper']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

 /*Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME*/
 function UserNameReplace() {
     if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
     $("span.insertusername").html(wgUserName);
  }
  addOnloadHook(UserNameReplace);