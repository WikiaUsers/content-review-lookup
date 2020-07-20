/* http://www.mediawiki.org/wiki/Manual:Messages_API#Using_an_API_query_from_JavaScript
   Grab group names */
function loadMessages( messages ) {
	return new mw.Api().get( {
		action: 'query',
		meta: 'allmessages',
		amlang: mw.config.get( 'wgUserLanguage' ),
		ammessages: messages
	} ).done( function ( data ) {
		$.each( data.query.allmessages, function ( index, message ) {
			if ( message.missing !== '' ) {
				mw.messages.set( message.name, message['*'] );
			}
		} );
	} );
}
function group(groupName) {
    return mw.msg('user-identity-box-group-' + groupName);
}
/* Replace Sheepy's sysop tag with "Mad Queen"
   Replace MaxiGamer's sysop tag with "Poosie Destroyahr" */
function doChange(){
    var tags = document.getElementsByClassName("tag");
    var i, tagToReplace, tagReplaceWith;
    switch (mw.config.get("wgTitle")) {
        case "MaxiGamer WiiU":
            tagToReplace = group('sysop');
            tagReplaceWith = "Poosie Destroyahr";
            break;

        case "Sheepalicious McBigbutt":
            tagToReplace = group('sysop');
            tagReplaceWith = "Mad Queen";
            break;
    }
    for (i = 0; i <= tags.length-1; i++) {
        document.getElementsByClassName("tag")[i].innerHTML = tags[i].innerHTML.replace(tagToReplace,tagReplaceWith);
    }
}

loadMessages('user-identity-box-group-chatmoderator|user-identity-box-group-sysop|user-identity-box-group-threadmoderator').done(doChange());