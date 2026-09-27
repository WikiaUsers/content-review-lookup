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

// Runs on the File namespace when editing or right after a new upload finishes
if (mw.config.get('wgNamespaceNumber') === 6 && $.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1) {
    mw.hook('wikipage.content').add(function($content) {
        var $textbox = $('#wpTextbox1');
        
        // Only run if a textbox exists and has text, but isn't wrapped yet
        if ($textbox.length && $textbox.val().trim() !== '') {
            var currentText = $textbox.val();

            if (!currentText.includes('{{documentation')) {
                // Wraps everything cleanly inside the documentation box
                var wrappedText = '{{documentation\n|content=\n' + currentText + '\n}}';
                $textbox.val(wrappedText);
            }
        }
    });
}