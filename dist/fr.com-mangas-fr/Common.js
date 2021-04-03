/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'Grand contributeur', m: 'Grand contributeur', f:'Grande contributrice },
		bureaucrat: { u:'Gérant du wiki', m: 'Gérant du wiki', f: 'Gérante du wiki' },
		sysop: { u:'Admin' },
		hamster: { u:'Hamster officiel du wiki' },
		eau: { u:'Eau officielle du wiki' },
		saly: { u: 'Smileytrice .-.' },
	}
};
UserTagsJS.modules.custom = {
	'Salwyn': ['sysop', 'saly'],
	'JealyJ': ['bureaucrat', 'eau'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
};
UserTagsJS.modules.userfilter = {
	'Salwyn': ['inactive']
	'JealyJ': ['inactive']
};
.tag.usergroup-bureaucrat {
	background-color: silver !important;
	color: white !important;
	border: 3px red solid;
	border-radius: 0;
}
.tag.usergroup-bureaucrat:before -{
	content: url("http://t1.gstatic.com/images?q=tbn:ANd9GcSW-qSAnyVrW4PvJx3OBHncwm9jYPOUV30MHYMN_JqviONXGjrZVNNPfn0");
}
.tag.usergroup-sysop {
	background-color: orange !important;
	color: white !important;
	border: 3px red solid;
	border-radius: 0;
}
.tag.usergroup-sysop:before -{
	content: url("http://www.yasana.org/public/Icone_etoile.png");
}
.tag.usergroup-founder {
	background-color: gold !important;
	color: white !important;
	border: 3px red solid;
	border-radius: 0;
}
.tag.usergroup-founder:before -{
	content: url("http://www.webcroisieres.com/images/etoile-jaune.gif");
}
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});