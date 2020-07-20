/* Version du JS revue par @Think D. Solucer */
/* <pre> */

if (console) console.log("Common.js en marche 3!");

$(function()
{

    /* Début JS */

/* Imports */
 
importArticles({
    type: "script",
    articles: [

// JS du wiki

    'MediaWiki:Common.js/Modeles.js',
    'MediaWiki:Common.js/Other.js',
    'MediaWiki:Common.js/Etiquettes.js',
    

// JS externe au wiki
    'w:c:fr.onepiece:MediaWiki:Common.js/Switch.js'
    ]
});

    /* Fin JS */
});
/* </pre> */