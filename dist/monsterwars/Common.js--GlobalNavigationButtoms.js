/* <pre> */
/** Add SANDBOX buttom to Account Navigation in the Wikia skin **/
 
$(document).ready(function() {
    if ( skin == 'oasis' )
        $( '#GlobalNavigation' ).prepend( '<li id="SANDBOX"><a href="/wiki/Special:Mypage/Sandbox">SANDBOX</a></li>' );
 
});
 
/* </pre> */

/* <pre> */
/** Add CSS buttom to Account Navigation in the Wikia skin **/
 
$(document).ready(function() {
    if ( skin == 'oasis' )
        $( '#GlobalNavigation' ).prepend( '<li id="CSS"><a href="/wiki/Special:Mypage/common.css">CSS</a></li>' );
 
});
 
/* </pre> */

/* <pre> */
/** Add JS buttom to Account Navigation in the Wikia skin **/
 
$(document).ready(function() {
    if ( skin == 'oasis' )
        $( '#GlobalNavigation' ).prepend( '<li id="JS"><a href="/wiki/Special:Mypage/common.js">JS</a></li>' );
 
});
 
/* </pre> */