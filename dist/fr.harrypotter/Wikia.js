/*##################################################################################################
#                                                                                                  #
#                                         CUSTOM EDIT BAR                                          #
#                                                                                                  #
#       @Auteur original : Avatar888                                                               #
#       @Adaptation par : Hulothe                                                                  #
#       @Usage : Personnalisation de la barre d'outils                                             #
#                                                                                                  #
###################################################################################################*/
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/harrypotter/fr/images/7/7c/Outils-Personnage.png",
		"speedTip": "Insérer le modèle {{Infobox Personnage}}",
		"tagOpen": "\{\{Infobox Personnage\r|Nom=",
		"tagClose": "\r|Image= \r|Sexe= \r|Yeux= \r|Cheveux= \r|Naissance= \r|Mort= \r|Famille= \r|Sang= \r|Surnom(s)= \r|Baguette= \r|Epouvantard= \r|Patronus= \r|Animagus= \r|Métier= \r|Affiliation= \r|Première= \r|Dernière= \r|Interprète= \r|Galerie= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/harrypotter/fr/images/7/71/Outils-Lettre.png",
		"speedTip": "Insérer le modèle {{Infobox Lettre}}",
		"tagOpen": "\{\{Infobox Lettre\r|Nom=",
		"tagClose": "\r|Image= \r|Expéditeur= \r|Destinataire= \r|Date= \r|Sujet= \r|Livraison= \r|Première= \r|Dernière= \r|Galerie= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insérer le modèle {{Fichier}} pour ajouter une description.",
		"tagOpen": "==Description==",
		"tagClose": "\r\{\{Fichier\r|Description=\r|Date= \r|Auteur= \r|Source= \r|Licence= \r|Et plus= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Insérer le modèle {{Support}} pour donner son avis.",
		"tagOpen": "{{Support|}}",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Insérer le modèle {{Contre}} pour donner son avis.",
		"tagOpen": "{{Contre|}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Insérer le modèle {{Neutre}} pour donner son avis.",
		"tagOpen": "{{Neutre|}} ",
		"tagClose": "",
		"sampleText": ""};
}

/*##################################################################################################
#                                                                                                  #
#                                              Top Editors                                         #
#                                                                                                  #
#       @Auteur : Hulothe                                                                          #
#       @Usage : Ajout du module Top Editors                                                       #
#                                                                                                  #
###################################################################################################*/

$('#WikiaRail > .LatestPhotosModule').after('<div class="module"><div class="topeditors" data-te-namespace="" data-te-type="edit|new" data-te-show="" data-te-user="" data-te-limit="10" data-te-offset="7">Chargement...</div></div>');

/*##################################################################################################
#                                                                                                  #
#                                             Liens TopNav                                         #
#                                                                                                  #
#       @Auteur : Hulothe                                                                          #
#       @Usage : Ajouter des liens dans la navigation supérieure du wiki                           #
#                                                                                                  #
###################################################################################################*/
$(function() {
 $('.WikiHeader > nav li:first-child > .subnav-2 > li:last-child').after('<li><a href="/wiki/Wiki_Harry_Potter:Conventions_d\'édition" class="subnav-2a">Règles</a></li>').after('<li><a href="/wiki/Wiki_Harry_Potter:Contact" class="subnav-2a">Contact</a></li>');
});

/*##################################################################################################
#                                                                                                  #
#                                       AVERTISSEMENT MODIFICATIONS                                #
#                                                                                                  #
#       @Auteur : Hulothe                                                                          #
#       @Usage : Averti des utilsateurs qui ne modifient que pour gagner des badges                #
#                                                                                                  #
###################################################################################################*/

var ug = wgUserGroups.join(' ');
if (ug.indexOf('helper') + ug.indexOf('sysop') + ug.indexOf('prefetenchef') > -3 && mw.config.get('wgNamespaceNumber') === 1200) {
    $( document ).ready(function() {
                if (wgCanonicalNamespace !== "Mur") {
                   return false;
                }
                $('.WikiaArticle').prepend('<input type="button" value="Avertir pour modifications inutiles" id="modif-badges-avert">');
            var avertissement = '<p>Bonjour ' + $('.UserProfileMasthead .masthead-info h1').text() + ',</p>' +
'<p>Merci pour tes récentes contributions sur le Wiki Harry Potter&nbsp;!</p>' +
'<p>Je dois cependant t\'informer que les modifications ayant pour but de gagner des badges sont interdites sur le wikia, et c\'est apparemment dans cette intention que tu as modifié des pages ou commenté des billets. Ne t\'en fais pas, tu gagneras des badges en modifiant, mais il ne faut pas que ça devienne un prétexte et une source de mauvaises contributions.</p>' +
'<p>Ce n\'est rien de grave, ne t\'inquiète pas, mais je te demande de tenir compte de ces recommandations à l\'avenir. + Si tu as des questions, n\'hésite pas à m\'en faire part&nbsp;!</p>' +
'<p>À bientôt&nbsp;:)</p>'
	    $('#modif-badges-avert').click(function() {
                var succès = "Message posté avec succès !";
	        $.post(mw.util.wikiScript('wikia'), {
                    controller   : 'WallExternal',
                    method       : 'postNewMessage',
                    pagenamespace: '1200',
                    pagetitle    : $('.UserProfileMasthead .masthead-info h1').text(),
                    messagetitle : 'Modifications pour les badges',
                    body         : avertissement + '\n\n~~' + '~',
                    format       : 'json'
                });
                alert(succès);
                window.location.reload();			
        });
    });
}

/* Activité du Wiki - rename edits */
function RwaMore() {
    $('.activity-feed-more').children('a').click();   
}
var numitemsrwa = $(".activityfeed li").length;
if (numitemsrwa < 30) {
    RwaMore();
}
/*
$( document ).ready(function() {
    $('.activity-nav ul').append('<li style="border-left: solid 1px #607f8b; margin-left: 6px; padding-left: 7px;"><a class="rwa-rmv-btn" style="color: #6b979c">Afficher</a><a class="rwa-rmv-btn" style="color: #6b979c; display: none">Masquer</a> les modifs d\'Hulothe</li>');
    $( '.rwa-rmv-btn' ).click(function() {
        $( ".rwa-rmvd" ).toggle();
        $( ".rwa-rmv-btn" ).toggle();
    });
    function initRwa() {
        $( ".activityfeed li" ).each(function() {
        var rwaa = $(this).find('cite span.subtle a');
            var rwab = rwaa.text();
            if(rwab === "Hulothe") {
                $(this).hide();
                $( this ).addClass("rwa-rmvd");
            }
        });
    }
    $(function() {
        initRwa();
    });
});*/

/*##################################################################################################
#                                                                                                  #
#                                            SOCIAL ICONS                                          #
#                                                                                                  #
#       @Auteur : Rappy 4187                                                                       #
#       @Usage : Personnalisation de la barre d'outils                                             #
#                                                                                                  #
###################################################################################################*/

var SocialMediaButtonsNamespaces = [0, 2, 6, 14, 500];
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '30px'
};


/*##################################################################################################
#                                                                                                  #
#                                          WIKIA NOTIFICATIONS                                     #
#                                                                                                  #
#       @Auteur(s) : Jak Himself  et Gguigui1                                                                    #
#       @Usage : Ajouter un message en bas à droite des pages                                      #
#                                                                                                  #
###################################################################################################*/
/* WikiaNotifications */
var expiry = 1;
var WikiaNotificationMessage = "";//<a href=\"/wiki/Fil:34239\">Venez voter pour l'organisation des articles !</a>";


/*##################################################################################################
#                                                                                                  #
#                                          IMPORT ARTICLES                                         #
#                                                                                                  #
###################################################################################################*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:WikiaNotification/code.js',
        'u:dev:SocialIcons/code.js',
        'MediaWiki:Wikia.js/Convertisseur.js', // Convertisseur argent des sorciers / euros
        'MediaWiki:Wikia.js/Sidebar.js'
    ]
});