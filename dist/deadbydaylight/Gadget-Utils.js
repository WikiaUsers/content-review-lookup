$(function (){
	CustomizeModificationsOfSidebar();
});

function CustomizeModificationsOfSidebar() {
	// adds [[Special:CategoryTree|Special:CategoryTree]] to toolbox
	console.log("adding links");
	ModifySidebar( 'add', 'toolbox', 'Modules', '/wiki/Modules');
	ModifySidebar( 'add', 'toolbox', 'Fandom Desktop CSS', '/wiki/MediaWiki:Fandomdesktop.css');
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
				target = 'wds-dropdown';
				break;
			case 'navigation':
				target = 'p-navigation';
				break;
			default:
				target = 'p-' + section;
				break;
		}

		if ( action == 'add' ) {
			if (section == 'toolbox'){
				var nodeScroll = document.getElementsByClassName( target )[9]
							   .getElementsByTagName( 'div' )[1]
							   .getElementsByTagName( 'ul' )[0];
				var nodeEdit = document.getElementsByClassName( target )[4]
							   .getElementsByTagName( 'div' )[1]
							   .getElementsByTagName( 'ul' )[0];
			   var nodeMain = document.getElementsByClassName( target )[26]
							   .getElementsByTagName( 'div' )[1]
							   .getElementsByTagName( 'ul' )[0];

				var liNode = document.createElement( 'li' );
				var aNode = document.createElement( 'a' );

				aNode.appendChild(document.createTextNode(name));
				//aNode.setAttribute('data-tracking', 'custom-level-2');
				aNode.setAttribute( 'href', link );
				liNode.appendChild( aNode );
				
				nodeScroll.appendChild(liNode);
				nodeEdit.appendChild(liNode);
				nodeMain.appendChild(liNode);
			}else{
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