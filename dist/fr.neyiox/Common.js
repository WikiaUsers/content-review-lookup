/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

importArticles({
    type: "script",
    articles: [
        "w:c:fr.neyiox:MediaWiki:SpoilerAlert.js"
    ]
});

SpoilerAlert = {
    question: 'Cette page contient pas mal de spoilers. Voulez-vous toutefois continuer ?',
    yes: 'Oui s\'il vous plaît',
    no: 'Non, pas question',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};

SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

SpoilerAlert = {
    isSpoiler: function () {
        var h2s = document.getElementsByTagName('h2');
        for (var i = 0, c = h2s.length; i < c; i++) {
            if (/spoiler/i.test($(h2s[i]).text())) return true;
        }
        return false;
    }
};