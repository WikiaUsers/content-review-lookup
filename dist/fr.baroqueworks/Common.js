/* A ne pas blanchir et modifier sauf sur autorisation (accordée au préalable par un Bureaucrate) ! */

/* Certains codes sont importés de différents Wikis et customisé. */ 

/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */



// Animation page d'accueil
var page = mw.config.get( 'wgPageName' );
if (page === "PageName") {
    var message = "L'équipe de ce Wiki vous dit : Salut !";
    alert(message);
}
 // Import [[MediaWiki:Onlyifuploading.js]] 
 


window.UserTagsJS = {
	modules: {},
	tags: {  
                 bannedfromchat: { u:'Banni(e)', m:'Banni', f:'Bannie' },
                 sysop: { u:'Administrateur', m:'Administrateur', f:'Administratrice' },
                 codeur: { u:'Codeur Général', m:'Codeur Général', f:'Codeuse Générale' },
                 chatmoderator : { u:'Garde du Palais', m:'Garde du Palais', f:'Garde du Palais' },
                 rollback: { u:'Billion' , m:'Billion', f:'Billione' },
                 le_BOSS: { u:'Le BOSS' , m:'Le BOSS' },
                 founder: { u:'Fondateur' , m:'Fondateur' },
         }
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['sysop', 'rollback', 'bannedfromchat', 'chatmoderator', 'founder'];
UserTagsJS.modules.custom = { 
        'Zoro-chin': ['codeur'],
        'Raydjahs':  ['le_BOSS', 'founder'],
        'Franky003': ['codeur']
};

InactiveUsers = { 
    months: 2,
    text: 'Billion inactif'
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// Pages along with their namespace (if any) will go here.
var pages = ['Utilisateur:Zoro-chin'];
 
// URL of the images will go here.
// Remember URL of the logo of 'My Page 1' will be the first, 'My Page 2' will be the second and so on.
var wordmarks = ['http://sournoishack.com/uploads/1865611483243ab533fecafa7a23aa7f045d578cbf.png'];
 
// Iterate for all the pages in the above array
for (i = 0; i < pages.length; i++) {
  /* check for the name of the page */
  if (mw.config.get('wgPageName') == pages[i]) {
    /* replace the image */
    $('#WikiHeader .wordmark a img').attr('src', wordmarks[i]);
  }
}

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 

 
 // END import Onlyifediting-functions
 // ============================================================