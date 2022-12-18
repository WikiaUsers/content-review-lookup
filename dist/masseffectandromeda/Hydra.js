/* Any JavaScript here will be loaded for users using the Hydra skin */

/******************************************
/* Responsive main page element transfers *
/******************************************/
/* Moves #rmpabovesearch and #rmpbelowsearch above and below the search box, respectively */
$( 'body.page-Mass_Effect_Andromeda_Wiki.ns-0.action-view' ).append( $( '#rmpabovesearch' ) );
$( 'body.page-Mass_Effect_Andromeda_Wiki.ns-0.action-view' ).append( $( '#rmpbelowsearch' ) );
$( 'body.page-Mass_Effect_Andromeda_Wiki.ns-0.action-view #rmpabovesearch' ).show();
$( 'body.page-Mass_Effect_Andromeda_Wiki.ns-0.action-view #rmpbelowsearch' ).show();