/** Main Page layout fixes *********************************************************
 *
 *  Description:        Various layout fixes for the main page, including an
 *                      additional link to the complete list of languages available
 *                      and the renaming of the 'Article' to to 'Main Page'.
 *  Maintainers:        User:AzaToth, User:R. Koot
 */

function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
        if ( Node.textContent ) {      // Per DOM Level 3
            Node.textContent = 'Main Page';
        } else if ( Node.innerText ) { // IE doesn't handle .textContent
            Node.innerText = 'Main Page';
        } else {                       // Fallback
            Node.replaceChild( Node.firstChild, document.createTextNode( 'Main Page' ) ); 
        }
    } catch(e) {
        // bailing out!
    }
}