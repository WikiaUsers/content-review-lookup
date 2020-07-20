importArticles({
    type: 'script',
    articles: [
        'u:creepypasta:MediaWiki:Wikia.js/AdminNotify.js'
    ]
});
mw.loader.load('https://raw.github.com/DoctorWhooves/Main/master/scraps/Storage.js');
 
if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Bienvenue sur le Wiki Harry Potter.", '<form class="WikiaForm" method="" name=""><fieldset>Bonjour et bienvenue sur le wiki, ' + wgUserName + '. Nous avons détecté que tu étais un nouvel étudiant à <a href="http://fr.harrypotter.wikia.com/wiki/Poudlard">Poudlard</a>.<br /><br />Tout d\'abord, assure-toi d\'avoir pris connaissance des <a href="http://fr.harrypotter.wikia.com/wiki/Project:Conventions d\'édition">Conventions d\'édition</a> avant de contribuer, ou <a href="http://fr.harrypotter.wikia.com/wiki/Rusard">Rusard</a> pourrait te punir sévèrement !  <a href="http://fr.harrypotter.wikia.com/wiki/Special:UserSignup">Clique ici</a> pour créer un compte si tu n\'en as pas encore.<br /><br />Si tu rencontre un problème quelconque ou si tu as une question à poser, n\'hésite pas à <a href="http://fr.harrypotter.wikia.com/wiki/Mur:Hulothe">envoyer un hibou</a> !<br /><br /><a href="http://fr.harrypotter.wikia.com/wiki/Project:Administrateurs">Les directeurs de Poudlard</a>.<br /><br /><br /><h6>NOTE: Vous n\'êtes peut-être pas un nouvel utilisateur. Cette fenêtre repose sur <a href="http://diveintohtml5.info/storage.html">localStorage</a> pour détecter si vous avez déjà visité le site</h6></feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "OK, je suis prêt à continuer !",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}
 
if (wgUserGroups.indexOf("sysop") > -1) {
    $('.allpagesredirect').show();
}