var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );
var ve = document.getElementById('ca-ve-edit');
var edittopHTML;
if (wgNamespaceNumber > -1) {

    if (ve) {
        edittopHTML = '<span class="mw-editsection">' +
    '<span class="mw-editsection-bracket">[ </span>' +
    '<a href="/index.php?title=' + wgPageName + '&amp;veaction=edit&amp;section=0" title="Edit &quot;intro&quot; section">edit</a>' +
    '<span class="mw-editsection-bracket"> | </span>' +
    '<a href="/index.php?title=' + wgPageName + '&amp;action=edit&amp;section=0" title="Edit &quot;intro&quot; section">edit source</a>' +
    '<span class="mw-editsection-bracket"> ]</span>' +
    '</span>';
    }
    else {
        edittopHTML = '<span class="mw-editsection">' +
    '<span class="mw-editsection-bracket">[ </span>' +
    '<a href="/index.php?title=' + wgPageName + '&amp;action=edit&amp;section=0" title="Edit &quot;intro&quot; section">edit</a>' +
    '<span class="mw-editsection-bracket"> ]</span>' +
    '</span>';
    }
  
$('#firstHeading').append(edittopHTML);

}