/*<pre>*/

////////////////////////////////////////////
// Portlet modification functions.        //
//   From [[User:Dantman/monobook.js]]    //
//     From [[w:User:Essjay/monobook.js]] //
////////////////////////////////////////////
var UserMenu;
var PageMenu;
var ToolMenu;

addOnloadHook(function() {
	UserMenu = new PortletMenu( 'p-personal' );
	PageMenu = new PortletMenu( 'p-cactions' );
	ToolMenu = new PortletMenu( 'p-tb' );
});

function PortletMenu( id ) {
	this.menu = document.getElementById( id );
	this.list = this.menu.getElementsByTagName( 'ul' )[ 0 ]; // bypass "<h5>Views</h5>", etc.

	var LIs = this.list.getElementsByTagName( 'li' );

	for ( var i = 0; i < LIs.length; i++ ) {
		this[ LIs[ i ].id ] = LIs[ i ];
	}

	this.newItem = function( id, txt, url, title, isMenu ) {
		var li = document.createElement( 'li' ); li.id  = id;
		var  a = document.createElement( 'a'  ); a.href = ( url == undefined || url == null || url == '' ? '#' : url );
		var mn = undefined;
		if( title != undefined && title != null && title != '' ) a.title = title;
		if(isMenu) {
			mn = document.createElement('ul');
			li.className = 'tabmenu';
		}
		a.appendChild( document.createTextNode( txt ) );
		li.appendChild( a );
		if(isMenu) li.appendChild(mn);

		this[ id ] = li; // watch this!!!

		return li;
	}
	this.newSeperator = function() {
		var li = document.createElement( 'li' );
		var hr = document.createElement( 'hr' );
		li.appendChild( hr );
		
		this[ id ] = li; // watch this!!!

		return li;
	}

	this.append = function( id, txt, url, title, isMenu ) {
		this.list.appendChild( this.newItem( id, txt, url, title, isMenu ) );
	}
	
	this.insertBefore = function( old, id, txt, url, title, isMenu ) {
		this.list.insertBefore( this.newItem( id, txt, url, title, isMenu ), this[ old ] );
	}
	
	this.appendSeperator = function() {
		this.list.appendChild( this.newSeperator() );
	}

	this.getText = function( id	     ) { return this[ id ].getElementsByTagName( 'a' )[ 0 ].firstChild.data }
	this.setText = function( id, txt ) {        this[ id ].getElementsByTagName( 'a' )[ 0 ].firstChild.data = txt }

	this.getHref = function( id	     ) { return this[ id ].getElementsByTagName( 'a' )[ 0 ].href }
	this.setHref = function( id, url ) {        this[ id ].getElementsByTagName( 'a' )[ 0 ].href = url }
	
	this.getClass = function( id      ) { return this[ id ].className.split(/[ 	]+/); }
	this.setClass = function( id, cls ) {        this[ id ].className = ( cls.split ? cls : cls.join(' ') ); }
	this.addClass = function( id, cls ) {
		cl = ( cls.split ? cls.split(/[ 	]+/) : cls );
		cn = this[ id ].className.split(/[ 	]+/);
		for( var c = 0; c < cl.length; c++ ) cn.push( cl[c] );
		//Remove duplicate elements.
		//	To do this, sort array so that matching elements are grouped together.
		//		Then only add elements which don't have a matching one before them.
		cn.sort();
		var ec = new Array();
		for( var c = 0; c < cn.length; c++ ) if( c-1 < 0 || cn[c] != cn[c-1] ) ec.push( cn[c] );
		this[ id ].className = ec.join(' ');
	}
	this.getLinkClass = function( id      ) { return this[ id ].getElementsByTagName( 'a' )[ 0 ].className.split(/[ 	]+/); }
	this.setLinkClass = function( id, cls ) {        this[ id ].getElementsByTagName( 'a' )[ 0 ].className = ( cls.split ? cls : cls.join(' ') ); }
	this.addLinkClass = function( id, cls ) {
		cl = ( cls.split ? cls.split(/[ 	]+/) : cls );
		cn = this[ id ].getElementsByTagName( 'a' )[ 0 ].className.split(/[ 	]+/);
		for( var c = 0; c < cl.length; c++ ) cn.push( cl[c] );
		//Remove duplicate elements.
		//	To do this, sort array so that matching elements are grouped together.
		//		Then only add elements which don't have a matching one before them.
		cn.sort();
		var ec = new Array();
		for( var c = 0; c < cn.length; c++ ) if( c-1 < 0 || cn[c] != cn[c-1] ) ec.push( cn[c] );
		this[ id ].getElementsByTagName( 'a' )[ 0 ].className = ec.join(' ');
	}
}

function RemoveNode( id ) {
	var node = document.getElementById( id )
	node.parentNode.removeChild( node );
}

/*</pre>*/