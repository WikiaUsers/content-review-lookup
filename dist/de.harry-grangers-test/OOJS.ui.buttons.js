function createButton(label,parent,callback) {
    mw.loader.using( 'oojs-ui-core' ).done( function () {
	$( function () {
		var button = new OO.ui.ButtonWidget( { label: label } );
		button.on( 'click', callback);
                console.log(button);
		$(parent).append( button.$element );
	} );
    } );
}

createButton('Here we are',$( '#mw-content-text' ),function() {
    console.log('Done!');
});