// NolicenseWarning पटकथा
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
    ]
};

// Standard_Edit_Summary पटकथा
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Custom-StandardEditSummaries'
};

function LinkFA() {
    if ( document.getElementById( 'p-lang' ) ) {
        var InterwikiLinks = document.getElementById( 'p-lang' ).getElementsByTagName( 'li' );
 
        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            var className = InterwikiLinks[i].className.match(/interwiki-[-\w]+/);
            if ( document.getElementById( className + '-fa' ) && InterwikiLinks[i].className.indexOf( 'badge-featuredarticle' ) === -1 ) {
                InterwikiLinks[i].className += ' FA';
                InterwikiLinks[i].title = 'यह इस भाषा में एक निर्वाचित लेख है।';
            } else if ( document.getElementById( className + '-ga' ) && InterwikiLinks[i].className.indexOf( 'badge-goodarticle' ) === -1 ) {
                InterwikiLinks[i].className += ' GA';
                InterwikiLinks[i].title = 'यह इस भाषा में एक श्रेष्ठ लेख है।';
            }
        }
    }
}