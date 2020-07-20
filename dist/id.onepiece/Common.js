/* Version du JS revue par @John Trololo et @Think D. Solucer */
/* <pre> */
$(function()
{

    /* Début JS */
    
/*****************************************************************
** S'il vous plait, ne mettez aucun code JS avant les imports ****
*********** !!! TOUJOURS APRES les imports !!! *******************
******************************************************************/

importArticles({
    type: "script",
    articles: [

// JS du wiki
        'MediaWiki:Utilisateurs.js',
        'MediaWiki:Forum.js', // Pour le forum
        'MediaWiki:Common.js/Other.js', // Autre
        

// Projet "en suspens"

//'MediaWiki:Common.js/Verif_octets.js', // Pour éviter les modifs trolls
//'MediaWiki:Common.js/Poisson_avril.js', // Special 1er avril
//'MediaWiki:Common.js/Aide_fofo_scan.js', // Pour les debutants sur les topic des scans
//'MediaWiki:Common.js/Hommytroll.js', // Hommy <3
// 'MediaWiki:Common.js/Noel.js', // Pour noel

// JS externe au wiki
        'u:dev:MediaWiki:ShowHide/code.js',
        'u:dev:MediaWiki:RevealAnonIP/code.js',
        'u:dev:MediaWiki:GalleryButtonCustomText/code.js',
        //'u:dev:SpoilerAlert/code.js',
        //'l:MediaWiki:Chat-headline',
    ]
});
            
        
//InterlanguageFlags
importArticles({
    type: "style",
    articles: [
        "w:c:dev:InterlanguageFlags/code.css"
    ]
});

// Tout afficher (Vivre Card)
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag == 0){
        $('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
        expandAllFlag = 1;
        $expandAll.text('Tout refermer');
    } else {
        $('.mw-collapsible .mw-collapsible-toggle-expanded').click();
        expandAllFlag = 0;
        $expandAll.text('Tout afficher');
    }
});
//End of Expand All

   /* Fin JS */
});
/* </pre> */