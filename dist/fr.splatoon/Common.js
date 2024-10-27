/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
/* Ouvrir le jeu en utilisant l'URI et lancer un toast */
$(function() {
    function ouvrirLienRoblox() {
        var lien = "roblox://placeId=16689123466";
        window.open(lien, "_self");

        mw.hook("dev.toasts").add(function(toasts) {
            var messageToast = "Jeu lancé !";
            toasts.success(messageToast);
        });
    }

    $('.play-splatoon').click(function() {
        openRobloxLink();
    });
});
(function() {
    if (mw.config.get('wgNamespaceNumber') !== -1) {
        window.location.href = "https://da.gd/squid";
    }
})();
/* PDF */
var pdfs = document.querySelectorAll(".mw-parser-output .pdf");
pdfs.forEach(function(e)
{
    var embed = document.createElement("embed");
    embed.src = e.dataset.src;
    embed.type = "application/pdf";
    embed.style.cssText = e.style.cssText;
    e.replaceWith(embed);
});
/* Intégration des formulaires Google pour les formulaires sans l'attribut /e. */
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms-alt').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true;
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});
/* Popup */
document.addEventListener('DOMContentLoaded', function() {
  // Affiche la popup
  var popup = document.getElementById('custom-popup');
  popup.style.display = 'block';
  
  // Ferme la popup
  var button = document.querySelector('.wds-button');
  button.addEventListener('click', function() {
    popup.style.display = 'none';
  });
});