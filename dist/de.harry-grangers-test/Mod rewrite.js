var rules = new Map([
    [/([A-Z][a-z]+)flagge/, 'Flaggen#$1']
]);
rules.forEach(function(replacement, re) {
    if (re.test(wgPageName)) {
        newPageName = replacement.replace('$1', wgPageName.match(re)[1].toLowerCase());
        location.href = location.protocol + '//' + location.host + mw.util.getUrl(newPageName, { rdfrom: wgPageName });
    }
});

function loadMessages( messages ) {
	return new mw.Api().get( {
		action: 'query',
		meta: 'allmessages',
		ammessages: messages.join( '|' ),
		amlang: mw.config.get( 'wgUserLanguage' )
	} ).then( function ( data ) {
		$.each( data.query.allmessages, function ( i, message ) {
			if ( message.missing !== '' ) {
				mw.messages.set( message.name, message['*'] );
			}
		} );
	} );
}

var rdfrom = mw.util.getParamValue('rdfrom');
if (rdfrom) {
    loadMessages( [ 'redirectedfrom' ] ).then(function() {
        console.log(mw.messages)
        var link = $('<div />').html($('<a />', { href: mw.util.getUrl(rdfrom, { redirect: 'no' }), text: rdfrom })).html()
        $('.page-header__subtitle').remove();
        $('.page-header__main').append($('<div />', { class: 'page-header__subtitle' }).html(mw.message( 'redirectedfrom', link ).text()));
    });
}