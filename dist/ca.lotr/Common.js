/* Es carregar� per a tots els usuaris, i per a qualsevol p�gina, el codi JavaScript que hi haja despr�s d'aquesta l�nia. */

// Ajax Auto-Refrescar
AjaxRCRefreshText = 'Refrescar';
AjaxRCRefreshHoverText = 'Refresca autom�ticament la p�gina';
ajaxPages = ["Especial:Canvis_recents","Especial:WikiActivity", "Especial:P�gines_noves", "Especial:Images"];
 
// =====================================
//              Imports
// =====================================
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',           // Ajax Auto-Refrescar
        'u:dev:MediaWiki:ReferencePopups/code.js',  //Refer�ncies popup
    ]
});