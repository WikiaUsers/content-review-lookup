SpoilerAlert = {
    question: 'Cet article contient des informations n\'étant pas apparues dans les chapitres. Si vous ne voulez pas connaître des éléments futures qui peuvent vous faire perdre goût à la lecture, nous vous demandons de ne pas afficher le contenu de cette page ou bien de faire très attention en le lisant. Voulez-vous toutefois continuer ?',
    yes: 'Oui s\'il vous plaît',
    no: 'Non, pas question',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');