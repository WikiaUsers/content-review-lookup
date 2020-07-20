/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

SpoilerAlert = {
            question: 'Alerte au spoil ! Vous êtes prevenus ! Cette page contient des révélations sur le sujet dont parle le titre de la page. Souhaitez-vous accéder à la page ?',
            yes: 'Oui, s\'il vous plaît !',
            no: 'Non, pas question !',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Contient des spoilers');
    },
    back:true
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js",
        "u:dev:NewImages.js"
    ]
});