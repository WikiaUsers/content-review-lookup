/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importArticles({
	type: 'script',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});


/* SpoilerAlert */
window.SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations dévoilant l\'intrigue d\'une œuvre). Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    fadeDelay: 1600
};


/* Inversion des couleurs des elements grace au modele [[Modèle:InversionTheme]] */
var couleurPageThemeClair = '#ffffff';
var root = document.querySelector(':root');
var tabImages;
if (getComputedStyle(root).getPropertyValue('--theme-page-background-color') == couleurPageThemeClair) {
	tabImages = Array.from(document.getElementsByClassName('inversionClair'));
} else {
	tabImages = Array.from(document.getElementsByClassName('inversionSombre'));
}
console.log(tabImages);
for (var i = 0; i<tabImages.length; i++) {
	tabImages[i].style.filter = 'invert(100%)';
}


/**
 * SPOILERS
 * Cherche [[Modèle:J'ai lu]] sur le profil de l'utilisateur.
 * Si l'utilisateur a lu le livre, le spoiler sera affiché 
 * comme s'il n'y en avait pas (efface spoiler_nomDuLivre_paslu).
 * Sinon, affiche un avertissement (efface spoiler_nomDuLivre_lu).
 * Voir [[Modèle:Spoiler/Bureau]]
 */
tabSpoiler = Array.from(document.getElementsByClassName('spoiler'));
tabLivres = ["animale1", "animale2", "lecasjackspark1", "lecasjackspark2", "lecasjackspark3", "lecasjackspark4", "cogito", "extincta", "phobos0", "phobos1", "phobos2", "phobos3", "phobos4", "vampyria1", "vampyria2"];

function pasModeleJailu() {
    for (var i = 0; i<tabSpoiler.length; i++) {
        for (var idLivre = 0; idLivre<tabLivres.length; idLivre++) {
            livre = tabLivres[idLivre];
            if (tabSpoiler[i].getElementsByClassName('spoiler_' + livre + '_paslu')[0]) {
                tabSpoiler[i].getElementsByClassName('spoiler_' + livre + '_lu')[0].remove();
            }
        }
    }
}

if (mw.config.values.wgUserName !== null) {
    fetch("https://victor-dixen.fandom.com/fr/api.php?action=parse&page=User:"+mw.config.values.wgUserName+"&prop=wikitext&formatversion=2&format=json").then(function (response) {
        return response.json();
    }).then(function (data) {
        var wikitext = data.parse.wikitext;
        if (wikitext.indexOf("{{J'ai lu") !== -1) {
            var jailu = wikitext.substring(wikitext.indexOf("{{J'ai lu"));
            jailu = jailu.substring(0, jailu.indexOf("}}"));
            jailuJS = JSON.parse(jailu.replaceAll(/[ \n]*\|[\n ]*/gm, ',"').replaceAll(/[ ]*=[ ]*/gm, '":').replace(/{[jJ]'ai[ _]lu[\n ]*,/gm, '').replaceAll(/"[a-zA-Z0-9_]*":,/gm, '') + '}');
            console.log(jailuJS);

            for (var i = 0; i<tabSpoiler.length; i++) {
                for (var idLivre = 0; idLivre<tabLivres.length; idLivre++) {
                    livre = tabLivres[idLivre];
                    if (tabSpoiler[i].getElementsByClassName('spoiler_' + livre + '_paslu')[0]) {
                        if (jailuJS[livre] === 1) tabSpoiler[i].getElementsByClassName('spoiler_' + livre + '_paslu')[0].remove();
                        else if (jailuJS[livre] === 0) tabSpoiler[i].getElementsByClassName('spoiler_' + livre + '_lu')[0].remove();
                    }
                }
            }
        } else {
            pasModeleJailu();
        }
    });
} else {
    pasModeleJailu();
}