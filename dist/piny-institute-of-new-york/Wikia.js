 /* Adds icons to page header
  * by: The 888th Avatar, adapted to new header by Thailog
  */
 $(function() {
     if( $( '.wds-community-header' ).length ) {
         $( '#PageHeader' ).prepend(
             $( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
         );
     } else {
         $( '.WikiaPageHeader' ).append( $( '#icons' ) );
         $( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } )
         .show();
     }
 });