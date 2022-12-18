/**
 * @title ListRC
 * @author rekowiki > User:Nekokon
 * @source https://rekowiki.tk/wiki/index.php/MediaWiki:Common.js
 *
 * To-do: Make FandomDesktop skin and HydraRevived script compatible
 */
function ModifySidebar( action, section, name, link ) {
	try {
		switch ( section ) {
			case ( 'languages' ):
				var target = 'p-lang';
				break;
			case ( 'toolbox' ):
				var target = 'p-tb';
				break;
			case ( 'navigation' ):
				var target = 'p-navigation';
				break;
			default:
				var target = 'p-' + section;
				break;
		}

		if ( action === 'add' ) {
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

		if ( action === 'remove' ) {
			var list = document.getElementById( target )
				.getElementsByTagName( 'div' )[0]
				.getElementsByTagName( 'ul' )[0];

			var listelements = list.getElementsByTagName( 'li' );

			for ( var i = 0; i < listelements.length; i++ ) {
				if (
					listelements[i].getElementsByTagName( 'a' )[0].innerHTML === name ||
					listelements[i].getElementsByTagName( 'a' )[0].href === link
				) {
					list.removeChild( listelements[i] );
				}
			}
		}

	} catch ( e ) {
		// let's just ignore what's happened
		return;
	}
}

function CustomizeModificationsOfSidebar() {
	// adds [[Special:CategoryTree|Special:CategoryTree]] to toolbox
	// ModifySidebar( 'add', 'toolbox', 'CategoryTree', 'https://en.wikipedia.org/wiki/Special:CategoryTree' );
	// removes [[Special:Upload|Special:Upload]] from toolbox
	// ModifySidebar( 'remove', 'toolbox', 'Upload file', 'https://en.wikipedia.org/wiki/Special:Upload' );
	// ModifySidebar( 'remove', '近期變更', '近期變更', 'recentchanges-url|recentchanges' );
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if ( this.readyState === 4 && this.status === 200 ) {
			var xmlDoc = this.responseXML;
			var x = xmlDoc.getElementsByTagName( 'rc' );
			var i;
			var name = '';
			var h3 = document.createElement( 'li' );
			h3.style.marginTop = '10px';
			h3.style.marginBottom = '4px';
			h3.style.fontSize = '12px';
			h3.style.borderBottom = '3px inset';
			var texth3 = document.createTextNode( '最近20則變更' );
			h3.appendChild( texth3 );

			document.getElementById( 'n-所有變更' ).appendChild( h3 );

			for ( i = 0; i < x.length; i++ ) {
				name = x[i].getAttribute( 'title' );
				ModifySidebar(
					'add',
					'近期變更',
					name,
					'https://rekowiki.tk/wiki/index.php/' + name
				);
			}
		}
	};

	xhttp.open(
		'GET',
		'https://newkomica-kari.fandom.com/zh-tw/api.php?action=query&format=xml&prop=&list=recentchanges&continue=-%7C%7C&rcdir=older&rcprop=title&rclimit=20&rctype=edit%7Cnew&rctoponly=1',
		true
	);
	xhttp.send();
}

jQuery( CustomizeModificationsOfSidebar );