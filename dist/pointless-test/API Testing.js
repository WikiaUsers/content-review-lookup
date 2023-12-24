var api = new mw.Api();
api.get( {
	action: 'parse',
    content: '{{Stub}}'
} );
alert(api.parse(text));