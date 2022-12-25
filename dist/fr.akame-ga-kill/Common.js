/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {  
                 bannedfromchat: { u:'Banni(e)', m:'Banni', f:'Bannie' },
                 sysop: { u:'Administrateur', m:'Administrateur', f:'Administratrice' },
                 codeur: { u:'Codeur Général', m:'Codeur Général', f:'Codeuse Générale' },
                 founder: { u:'Fondateur' , m:'Fondateur' },
         }
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['sysop', 'rollback', 'bannedfromchat', 'chatmoderator', 'founder'];
UserTagsJS.modules.custom = { 
        'Zoro-chin': ['codeur'],
};