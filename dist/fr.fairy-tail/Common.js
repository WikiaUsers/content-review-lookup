//Importing scripts from dev.wikia.com. Remember to add new scripts within this importArticles block to reduce the times for loading and executing
// http://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports.
window.RevealAnonIP = {
    permissions: ['user']
};

//Config pour le message d'alerte des pages explicites
SpoilerAlert = {
    categories: "Articles ayant un contenu explicite",
};

//Customization for imported scripts
//PreloadFileDescription, source: http://dev.wikia.com/wiki/PreloadFileDescription
PFD_templates = [{
    label: 'Images',
    desc: '{{Documentation_Image\n|Description = \n|Source      = \n|Vu = \n|Information = }}',
}, ];

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * Code par Emperor Jarjarkine pour pouvoir avoir les introductions  
 */
function addEditIntro(name) {
    // Top link
    if (skin == 'oasis') {
        $('a[data-id="edit"]').attr('href', $('a[data-id="edit"]').attr('href') + '&editintro=' + name);
        $('span.editsection > a').each(function () {
            $(this).attr('href', $(this).attr('href') + '&editintro=' + name);
        });
    } else {
        var el = document.getElementById('ca-edit');

        if (typeof (el.href) == 'undefined') {
            el = el.getElementsByTagName('a')[0];
        }

        if (el)
            el.href += '&editintro=' + name;

        // Section links
        var spans = document.getElementsByTagName('span');
        for (var i = 0; i < spans.length; i++) {
            el = null;

            if (spans[i].className == 'editsection') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el)
                    el.href += '&editintro=' + name;
            } else if (spans[i].className == 'editsection-upper') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el)
                    el.href += '&editintro=' + name;
            }
        }
    }
}

$(function () {
    if (wgNamespaceNumber === 0) {
        var cats = document.getElementsByClassName('categories')[0] || document.getElementById('catlinks');
        if (!cats) {
            return;
        }
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title === 'Catégorie:Articles Vedette') {
                addEditIntro('Modèle:AV_editintro');
                break;
            } else if (cats[i].title === 'Catégorie:Articles de Qualité') {
                addEditIntro('Modèle:AQ_editintro');
                break;
            } else if (cats[i].title === 'Catégorie:Articles de Rang S') {
                addEditIntro('Modèle:ARS_editintro');
            }
        }
    }
});

//Version moderne de BackToTopModern
window.BackToTopModern = true;