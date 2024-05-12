/* This script adds a link to Special:AdminLinks on the VectorBeta toolbar.
 It is needed since the extension does not show the link when this is active
 Further, if you are a non administrator, this gadget will be of no use.
*/
 
$( document ).ready( function() {
  mw.util.addPortletLink(
    'p-personal',
    mw.util.wikiGetlink( 'Special:AdminLinks' ),
    'Admin Links',
    'pt-adminlinks',
    'Show Administrator Links',
    null,
    '#pt-preferences'
  );
});