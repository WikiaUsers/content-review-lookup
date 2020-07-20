/* Es carregarà per a tots els usuaris, i per a qualsevol pàgina, el codi JavaScript que hi haja després d'aquesta línia. */

// Ajax Auto-Refrescar
AjaxRCRefreshText = 'Refrescar';
AjaxRCRefreshHoverText = 'Refresca automàticament la pàgina';
ajaxPages = ["Especial:Canvis_recents","Especial:WikiActivity", "Especial:Pàgines_noves", "Especial:Images"];
 
// =====================================
//              Imports
// =====================================
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',           // Ajax Auto-Refrescar
        'u:dev:MediaWiki:ReferencePopups/code.js',  //Referències popup
    ]
});