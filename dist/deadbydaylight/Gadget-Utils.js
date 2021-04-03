$(function (){
	CustomizeModificationsOfSidebar();
});

function CustomizeModificationsOfSidebar() {
	// adds [[Special:CategoryTree|Special:CategoryTree]] to toolbox
	console.log("adding links");
	ModifySidebar( 'add', 'toolbox', 'Modules', 'https://deadbydaylight.gamepedia.com/Modules' );
	// removes [[Special:Upload|Special:Upload]] from toolbox
	//ModifySidebar( 'remove', 'toolbox', 'Upload file', 'https://en.wikipedia.org/wiki/Special:Upload' );
}

function ModifySidebar( action, section, name, link ) {
	try {
		var target;
		switch ( section ) {
			case 'languages':
				target = 'p-lang';
				break;
			case 'toolbox':
				target = 'p-tb';
				break;
			case 'navigation':
				target = 'p-navigation';
				break;
			default:
				target = 'p-' + section;
				break;
		}

		if ( action == 'add' ) {
			var node = document.getElementById( target )
							   .getElementsByTagName( 'div' )[0]
							   .getElementsByTagName( 'ul' )[0];

			var aNode = document.createElement( 'a' );
			var liNode = document.createElement( 'li' );

			aNode.appendChild( document.createTextNode( name ) );
			aNode.setAttribute( 'href', link );
			liNode.appendChild( aNode );
			liNode.className = 'plainlinks';
			node.appendChild( liNode );
		}

		if ( action == 'remove' ) {
			var list = document.getElementById( target )
							   .getElementsByTagName( 'div' )[0]
							   .getElementsByTagName( 'ul' )[0];

			var listelements = list.getElementsByTagName( 'li' );

			for ( var i = 0; i < listelements.length; i++ ) {
				if (
					listelements[i].getElementsByTagName( 'a' )[0].innerHTML == name ||
					listelements[i].getElementsByTagName( 'a' )[0].href == link
				)
				{
					list.removeChild( listelements[i] );
				}
			}
		}
	} catch( e ) {
		// let's just ignore what's happened
		return;
	}
}