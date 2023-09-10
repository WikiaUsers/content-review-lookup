/* ######################################################################## */
/* ### JavaScript here will be loaded for all users on every page load. ### */
/* ######################################################################## */
// ============================================================
 
/* Please see MediaWiki:ImportJS for imported JS */


/*** Collapsible trs v2 *** from FF Wiki *************************************
 * Allows associated table rows to collapse under another
 * Uses class "collapsibletr" to set collapsibility
 * Class "collapsed" makes it collapsed by default
 * Collapses all rows underneath it until another tr has
 * the class "collapsibletr", or a tr has the class "uncollapsibletr"
 ****************************************************************************/
$('tr.collapsibletr').each(function(){
     $(this).nextUntil('.collapsibletr, .uncollapsible').hide();
}).click(function(){
     $(this).toggleClass('collapsed').nextUntil('.collapsibletr, .uncollapsible').toggle();
});

/*** Refocus {{A}} *** from FF Wiki *****************************************
 * Takes {{A}} uses in tables and relocates them to the cell ID
 * Means it focuses on the cell instead of v-centered text
 ****************************************************************************/
$(".table th .attach, .table td .attach").each(function (_, $element) {
    var $ancestor = $element.closest("th, td");
 
    if (!$ancestor.id) {
        $ancestor.id = $element.id;
        $element.id = "";
    }
});