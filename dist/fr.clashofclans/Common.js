/* Importation des scripts */
var strThousandsSeparator = "&nbsp;";
importArticles({
    type: "script",
    articles: [
        'u:zh.pad:MediaWiki:CountDown.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        "u:dev:MisspelledPage/code.js",
        'u:dev:DisplayClock/code.js',
        "MediaWiki:Common.js/Imagination.js",
        "MediaWiki:Common.js/Vandalisme.js",
        "MediaWiki:Common.js/Anectodes.js",
        "MediaWiki:Common.js/RepportErrorWikia.js",
        "MediaWiki:Common.js/Troupes.js",
        "MediaWiki:Common.js/Experience.js",
        "MediaWiki:Common.js/ModeToggle.js",
        "MediaWiki:Common.js/heroscost.js",
        "MediaWiki:Common.js/Facebook.js",
        "MediaWiki:Common.js/QUIZ.js",
        "MediaWiki:Protection.js",
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:UserTags/code.js",
        "w:c:dev:BackToTopButton/code.js"
    ]
});

if (wgPageName === "Gemmes") {
  importScriptPage('MediaWiki:GemCalculators.js');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2d %B %Y %2H:%2M:%2S (UTC)';


//Désactiver les commentaires sur Mise à jour future pour les anonymes
if (!wgUserName && wgPageName == "Mise_à_jour_future") { 
    if (ArticleComments) {
        if (ArticleComments.addHover) {
            var realFunc = ArticleComments.addHover;
            ArticleComments.addHover = function () {
                var result = realFunc.apply(ArticleComments, arguments);
                $('#article-comments-minieditor-newpost').before('<p style="font-size:14px" class="information">Vous devez <a href="/wiki/Special:UserLogin">être connecté</a> pour poster des commentaires sur cette page.</p>');
                $('#article-comments-minieditor-newpost').remove();
                $('.article-comm-reply').remove();
                return result;
            };
        }

// special case where article comments have already loaded (shouldn't happen much in production)
        if (ArticleComments.initCompleted) {
            $('#article-comments-minieditor-newpost').before('<p style="font-size:14px" class="information">Vous devez <a href="/wiki/Special:UserLogin">être connecté</a> pour poster des commentaires sur cette page.</p>');
            $('#article-comments-minieditor-newpost').remove();
            $('.article-comm-reply').remove();
        }
    }
}
//Finished
/* 
var end = new Date("2015-08-07"),
    start = new Date(),
    diff  = new Date(end - start),
   days = diff/1000/60/60/24;
   console.log(days);
if (days > 0) {
if ($.inArray( wgPageName, ["Mine_d'Or", "Extracteur_d'Élixir", "Foreuse_d’Élixir_Noir"]) > -1 ) {
  $('#WikiaArticle').prepend('<img style="width: 660px; padding-bottom:10px;" src="https://images.wikia.nocookie.net/__cb20150731092715/clashofclans/fr/images/thumb/c/cd/Boost.png/640px-Boost.png"/>');
}
}
*/
// Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js
var disclaimerNs=[0,1,4,5,6,7,14,15,110,111,400,401,500,502,503,-1];
if (disclaimerNs.indexOf(wgNamespaceNumber) !== -1) {
var legaltext="Clash of Clans™ est un jeu commercial de l'entreprise SUPERCELL. Le wikia Clash of Clans est un site indépendant non sponsorisé par le groupe SUPERCELL.";
var legaldiv='<div id="lcowiki_legal"><div style="clear:both"></div><br><center><div class="legaldisclaimer">'+legaltext+"</div></center></div>";
$(".WikiaArticle").append(legaldiv);
$(".legaldisclaimer").css({
fontSize:"80%",
border:"1px solid #F6A938",
backgroundColor:"#F2F2F2",
borderRadius:"8px"
})};

// Fin du texte d'information
if (mw.toolbar) {
mw.toolbar.addButton(
	'https://vignette.wikia.nocookie.net/naruto/images/9/96/Button_aquote.png/revision/latest?cb=20141212182610&path-prefix=fr',
	'Ajouter des guillemets',
	'«&nbsp;',
	'&nbsp;»',
	'',
	'mw-editbutton-guillemets'
);
}

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'helper', 'staff', 'util']
};
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */
// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u:'Patrouilleur', link:'Équipe#Rollbacks' },
		verifcom: { u:'Vérificateur de commentaires'},
		bureaucrat: { u:'Bureaucrate', link:'Équipe#Bureaucrates' },
        sysop: { u:'Administrateur', f:'Administratrice', m:'Administrateur', link:'Équipe#Administrateurs' },
                'Protecteur du wiki': { u:'Protecteur du wiki', link:'Équipe#Protecteur du wiki' },
                'Gagnant du jeu': { u:'Meilleur bombeur' },
                'Administrateur inactif': { u:'Administrateur inactif' },
                founder: { u:'Fondateur', link:'Équipe#Fondateur' }
	}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 5, // est présent depuis moins de 5 jours
	edits: 10 // à fait moins de 10 édits
};
UserTagsJS.modules.inactive = 60; // Inactif au bout de 60 jours sans modifications 
UserTagsJS.modules.mwGroups = ['verifcom', 'bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'founder'];

// Ajoute le groupe bureaucrat aux bureaucrates
UserTagsJS.modules.metafilter = {
	rollback: ['sysop'], // retire le groupe rollback aux admins
	chatmoderator: ['sysop'], // retire le groupe modérateur du tchat aux admins
	bureaucrat: ['founder'], // retire le groupe bureaucrates au fondateur
    newuser: ['bot', 'bot-global']
};
UserTagsJS.modules.custom = {
        'Rizzen coc': ['Gagnant du jeu']
};
UserTagsJS.modules.userfilter = {
	'Wikia': ['newuser'] // Wikia n'est jamais un nouveau contributeur
};
UserTagsJS.modules.implode = {
	'Administrateur inactif': ['sysop', 'inactive'],
	'Protecteur du wiki': ['chatmoderator', 'rollback'] // Ajoute "Protecteur du wiki" pour les rollbacks et patrollers en supprimant ces derniers
};

/**
 * lastEdited.js
 * 
 * Adds last edited details to the page
 * @author: Inspired from the code of [[w:User:Fubuki風吹]], made by [[User:Gguigui1]] 
 */
$(function() {
        if (!wgUserName) {
          return;
        }
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user|size|parsedcomment',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            if (wgNamespaceNumber !== 0)
                return;
            for (var i in data.query.pages) break;
            if (!data.query.pages[i].revisions)
                return;
            var rv = data.query.pages[i].revisions[0],
                sel;
				console.log(rv);
				var temps = Math.floor((Date.now() - new Date(rv.timestamp)) / (1000*60*60*24)) + " jours";
				if (temps.split(" ")[0] < 1) {
					temps = Math.floor((Date.now() - new Date(rv.timestamp)) / (1000*60*60)) + " heures";
				}
				if (temps.split(" ")[0] < 1) {
					temps = Math.floor((Date.now() - new Date(rv.timestamp)) / (1000*60)) + " minutes";
				}
				if (temps.split(" ")[0] > 30 && temps.split(" ")[1] == "jours") {
					temps = Math.floor(temps.split(" ")[0] / 30) + " mois";
				}
				if (temps.split(" ")[0] > 7 && temps.split(" ")[1] == "jours") {
					temps = Math.floor(temps.split(" ")[0] / 7) + " semaines";
				}
				if (temps.split(" ")[0] < 2 && temps.split(" ")[1] !== "mois") { // compter pour 0 et 1
					temps = temps.slice(0,-1);
				}
                var html = '<div class="lastEdited">Dernière modification par : ';
                html += '<a href="/fr/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> il y a ' + temps;
                html += ' | ' + new Date(rv.timestamp).toUTCString().slice(0, 10) + new Date(rv.timestamp).toUTCString().slice(11, 25) + ' (UTC)';
                    if (rv.parsedcomment) {
					if (rv.parsedcomment.indexOf('Created page with') > -1) {
                        html += '<br>Résumé: Created page.';
                    } else {
                        html += '<br>Résumé: ' + rv.parsedcomment;
                    }
					}
				html += '  <button type="button" id="undo" data-undo-after="' + rv.diff.from + '" data-undo="' + rv.diff.to + '">Annuler</button>  <a id="signaler" class="button" href="/fr/wiki/Vandalisme">Signaler</a>';
                html += '</div><br>';
                switch (mw.config.get('wgNamespaceNumber')) {
                    case 2:
                    case 3:
                        sel = '.UserProfileActionButton';
						$(sel).after(html);
                        mw.util.addCSS('.lastEdited {padding-bottom: 5px;border-bottom: 1px solid #ccc;}');
                        break;
                    default:
                        sel = '#WikiaArticle';
						$(sel).before(html);
						mw.util.addCSS('.lastEdited {color: white !important; background-color:orange;}');
                }
				if ($.inArray(rv.user, ["Mister Genky", "Ambushette", "Gguigui1", "Maxx86"]) > -1) {
					$("#undo").remove();
					$("#signaler").remove();
				}
		});
		$(document).on('click', '#undo', function() {
			window.open(wgServer + '/fr/wiki/' + wgPageName + '?action=edit&undoafter=' + $(this).attr('data-undo-after') + "&undo=" + $(this).attr('data-undo')); 
		});
});

/* Importation des articles */
importArticle({ type: 'style', article:
'u:zh.pad:MediaWiki:CountDown.css' });