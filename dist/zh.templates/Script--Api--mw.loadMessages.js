/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
* [[Category:Api|{{SUBPAGENAME}}]]
**/

/** @return instance of jQuery.Promise */
function loadMessages(messages)
{
	return new mw.Api().get(
	{
		action: 'query',
		meta: 'allmessages',
		amlang: mw.config.get('wgUserLanguage'),
		ammessages: messages
	}).done(function(data)
	{
		$.each(data.query.allmessages, function(index, message)
		{
			if (message.missing !== '')
			{
				mw.messages.set(message.name, message['*']);
			}
		});
	});
}

/*
loadMessages( 'january|february|march' ).done( doStuff );
$( '<a>' ).prop( 'href', '#' ).text( mw.message( 'translate-msggroupselector-projects' ).text() );
*/