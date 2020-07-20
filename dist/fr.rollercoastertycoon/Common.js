/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
SpoilerAlert = {
    question: 'Cette page contient des spoilers concernant RollerCoaster Tycoon World. êtes-vous sûr(e) de vouloir voir?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');