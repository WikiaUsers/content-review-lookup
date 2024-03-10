/* Any JavaScript here will be loaded for all users on every page load. */


/* Auto-sort DropTable lists */

mw.loader.using( "jquery.tablesorter", function() 
{
    /* This function will sort RANDOM DropTables first by Alphabetical, then by Rarity */
    /* The ID "randomDropTable" is added to a Template:DropTableStart if the user defined the "Random" property with anything  */
    $( ".randomDropTable.wikitable.sortable" ).tablesorter( { sortList: [ { 1: 'desc' }, { 0: 'asc' } ] } )

    /* This function will sort GUARANTEED DropTables by Alphabetical */
    /* The ID "guaranteedDropTable" is added to a Template:DropTableStart if the user did NOT define the "Random" property with anything  */
    $( ".guaranteedDropTable.wikitable.sortable") .tablesorter( { sortList: [ { 0: 'asc' } ] } )
});