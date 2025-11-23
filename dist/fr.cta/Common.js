/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */

// Configuration SpoilerTags
window.spoilerTags = {
    disable: false,
    spoilAll: false,
    unspoil: true,
    hover: true,
    tooltip: true,
    tooltipText: "Cliquer pour révéler"
};

// Forcer l'initialisation des spoilers
mw.hook('dev.spoilerTags').add(function() {
    console.log('SpoilerTags initialisé !');
});