/* Version du JS revue par @John Trololo et @Think D. Solucer */
/* <pre> */
$(function()
{

    /* Début JS */
    
/*****************************************************************
** S'il vous plait, ne mettez aucun code JS avant les imports ****
*********** !!! TOUJOURS APRES les imports !!! *******************
******************************************************************/

/* Version du JS revue par @Think D. Solucer */
// Page JS concernant les IHM du wiki

/* Début JS des utilisateurs*/
importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/userRightIcons.js', // Étiquettes
        'MediaWiki:Common.js/Avertissements.js', // Ne pas hésiter à demander l'ajout de nouveaux avertissements
    ]
});

/* Fin JS des utilisateurs */
        

//retirer la raison par défaut sur spécial:supprimer
$(function() {
    if(mw.config.get('wgAction') === 'delete') {
        $("#wpReason").val("");
    }
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