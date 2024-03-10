$(function (){
	CustomizeModificationsOfSidebar();
});

function CustomizeModificationsOfSidebar() {
	// adds [[Special:CategoryTree|Special:CategoryTree]] to toolbox
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
			var liNode, aNode;
			if (section == 'toolbox'){
				//find all li.wds-dropdown that has children span with inner text TOOLBOX
				var els = Array.from(document.querySelectorAll('li.wds-dropdown')) //find all li with class wds-dropdown
										.filter(el => Object.keys(Array.from(el.getElementsByTagName('span')) //filter this list to only cases that contains a span-
																	.filter(spanEl => spanEl.innerText == "TOOLBOX")).length > 0 ); //that has inner text TOOLBOX
				var mainNode;
				for (let element of els){
                    liNode = document.createElement( 'li' );
					aNode = document.createElement( 'a' );
	
					aNode.appendChild(document.createTextNode(name));
					aNode.setAttribute( 'href', link );
					liNode.appendChild( aNode );
				
                    mainNode = element.querySelector('div ul');
                    mainNode.appendChild(liNode);
                    console.log("*Toolbox link added*");
				}
			}else{
				var node = document.getElementById( target )
							   .getElementsByTagName( 'div' )[0]
							   .getElementsByTagName( 'ul' )[0];
			

				aNode = document.createElement( 'a' );
				liNode = document.createElement( 'li' );
	
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