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

/* Importations */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js" /* compte à rebours */
    ]
});

// Changement des noms des grades
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Changement grades */
 window.UserTagsJS = { 
         modules: {}, 
         tags: { 
              sysop: { u:'Conseil 4'},
                 chatmoderator: { u:'Rival', m:'Rival', f:'Rivale' },
                 contentmoderator: { u:'Champion', m:'Champion', f:'Championne' }, 
                 rollback: { u:'Dracologue'},
                 threadmoderator: {u:'Apprenti Policier', m:'Apprenti Policier', f:'Apprentie Policière'}
         }
};
UserTagsJS.modules.autoconfirmed = true; 
UserTagsJS.modules.mwGroups = ['sysop', 'bot', 'chatmoderator']; 
UserTagsJS.modules.custom = { 
        'Ayu05': {'Maître de la Ligue de Sinnoh'},
        'Hector Evans': {'Maître de la Ligue de Kalos'},
        'PingoléonF': {'Ancien du Conseil 4'},
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});