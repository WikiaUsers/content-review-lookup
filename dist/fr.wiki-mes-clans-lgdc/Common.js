
//=================================================================================================
//
//                                             USERNAME
//
//=================================================================================================
 
// Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
// Requiers de copier {{USERNAME}}.
 
function substUsername() {
        $('.insertusername').html('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + wgUserName + '</a>');
        $('.insertusername:hover').css('text-decoration', 'none');
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').html(wgUserName); });


//=================================================================================================
//
//                                             USERTAG
//
//=================================================================================================

window.UserTagsJS = {
	modules: {},
	tags: {
window:UserTagsJS =    {  
	modules: {},
	tags: {
		// new groups 
		'dieu': { u:'Divinité', m:'Dieu', f:'Déesse' },
		'css': { u:'Codeur CSS', f:'Codeuse CSS' },
		'modeles': { u:'Membre modèle', f:'Codeuse Modèle' },
		'html': { u:'Codeur html', f:'Codeuse html' }
	}
    }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Co-fondatrice' },
		chatmoderator: { u: 'Modérateur des kicks' },
		founder: {u:'Fondatrice grumpy'	}
	}


};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 31; // Inactif au bout de 31 jours sans modifications 
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Ajoute le groupe bureaucrat aux bureaucrates
UserTagsJS.modules.mwGroups = ['discussionmoderator']; // Ajoute le groupe bureaucrat aux bureaucrates
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Retire le groupe administrateur aux bureaucates
	grandmaitreducustom: ['dieu'], // retire le groupe grandmaitreducustom aux "dieu"
	bureaucrat: ['fondatrice grumpy']
};
UserTagsJS.modules.userfilter = {
	'Wyz': ['inactive'] // Wyz n'est jamais inactif, même s'il devrait l'être 
}
	
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});