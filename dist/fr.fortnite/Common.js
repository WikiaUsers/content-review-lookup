// Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js
var disclaimerNs=[0,1,4,5,6,7,14,15,110,111,400,401,500,502,503,-1];
if (disclaimerNs.indexOf(wgNamespaceNumber) !== -1) {
	var legaltext="Le Wiki Francophone Fortnite est un site dépendant de FANDOM non sponsorisé par Epic Games.";
	var legaldiv='<div id="lcowiki_legal"><div style="clear:both"></div><br><center><div class="legaldisclaimer">'+legaltext+"</div></center></div>";
	if (mw.config.get('skin') === 'fandomdesktop') 
		$(".page-content").append(legaldiv);
	else
		$(".WikiaArticle").append(legaldiv);
		
	$(".legaldisclaimer").css({
	  fontSize:"80%",
	  border:"1px solid #009FFF",
	  backgroundColor:"var(--theme-page-background-color--secondary)",
	  borderRadius:"8px"
	})
}
 
// Fin du texte d'information

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
                var html = '<div class="lastEdited"> Dernière modification par : ';
                html += '<a href="/fr/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> il y a ' + temps;
                html += '  <button type="button" id="undo" data-undo-after="' + rv.diff.from + '" data-undo="' + rv.diff.to + '">Annuler</button>  <a id="signaler" class="button" href="Vandalisme">Signaler</a>';
                html += '</div><br>';
                switch (mw.config.get('wgNamespaceNumber')) {
                    case 2:
                    case 3:
                        sel = '.UserProfileActionButton';
						$(sel).after(html);
                        mw.util.addCSS('.lastEdited {padding-bottom: 5px;border-bottom: 1px solid #ccc;}');
                        break;
                    default:
                        sel = '#content';
						$(sel).before(html);
						mw.util.addCSS('.lastEdited {color: white !important; background-color:#65c2e0; border-radius:2px;} .lastEdited a {color:black;}');
                }
				if ($.inArray(rv.user, ["Mister Genky", "Nico Di Inferno", "Noa Nisei"]) > -1) {
					$("#undo").remove();
					$("#signaler").remove();
				}
		});
		$(document).on('click', '#undo', function() {
			window.open(wgServer + '/fr/wiki/' + wgPageName + '?action=edit&undoafter=' + $(this).attr('data-undo-after') + "&undo=" + $(this).attr('data-undo')); 
		});
});
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/*
 * ACTUALISATION AUTOMATIQUE AVANCÉE 
 */
 
window.ajaxPages = [
    "Spécial:Modifications_récentes",
    "Spécial:WikiActivity",
    "Spécial:Watchlist"
];

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

window.ArticleRating = {
    values: ['Très mauvais', 'Mauvais', 'Moyen', 'Bon', 'Excellent'],
    starSize: [24, 24],
    starColor: ['#ccc', '#ffba01'],
    starStroke: '#000'
}