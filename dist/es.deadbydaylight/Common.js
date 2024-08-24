/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina */

/*
Orden autom�tico en tablas ordenadas en ingl�s (origen) y deban estar en castellano (destino):
https://meta.wikimedia.org/wiki/Help:Sorting#Using_JavaScript_to_trigger_client-side_table_sorting
*/

function isSortedTablePage() {
    return ( wgPageName == "Page_To_Sort"  || wgPageName == "Other_Page_To_Sort" );
}

jQuery( document ).ready( function( $ ) {
    mw.loader.using( 'jquery.tablesorter', function() {
        if( isSortedTablePage() ) $('table.autosort').tablesorter( {sortList: [ { 0: 'asc'} ]} );
    } );
} );