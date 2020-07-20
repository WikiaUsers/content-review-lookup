/*<pre>*/

////////////////////////////////////////////
// Box modification and                   //
//     creation functions for Smoke skin. //
////////////////////////////////////////////

function SmokeBox() {
	this.element;
	
	/* Constructing starter functions */
	this.create = function( id ) {//Create a new Smoke Box
		var div = document.createElement( 'div' );
		div.id = id;
		
		this.element = div;
		return div;
	};
	
	this.read = function( id ) {//Create a smoke box by reading an existing element
		var div = document.getElementById( id );
		this.element = div;
		
	}
	
	this.createRoundedBox = function( id, title ) {
		this[ id ] = new Object();
		//RoundedBox
		var div = document.createElement( 'div' );
		div.id = id;
		div.className = 'roundedDiv';
		this[ id ][ 'container' ] = div;
		//RoundTop
		var top = this.makeRound( true );
		div.appendChild( top );
		this[ id ][ 'top'       ] = top;
		//Content Area
		var c = document.createElement( 'div' );
		c.className = 'r_boxContent';
		div.appendChild( c );
		this[ id ][ 'content'   ] = c;
		//Header
		var h = null;
		if( title != null ) {
			h = document.createElement( 'div' );
			h.className = 'boxHeader';
			h.appendChild( document.createTextNode( title ) );
			c.appendChild( h );
		}
		this[ id ][ 'header'    ] = h;
		//OtherParts
		this[ id ][ 'sections'  ] = null;
		this[ id ][ 'left'      ] = null;
		this[ id ].leftElement = null;
		this[ id ][ 'right'     ] = null;
		this[ id ].rightElement = null;
		//Break
		var br = document.createElement( 'div' );
		br.style.clear = 'both';
		div.appendChild( br );
		this[ id ][ 'break'     ] = br;
		//RoundBottom
		var bottom = this.makeRound( false );
		div.appendChild( bottom );
		this[ id ][ 'bottom'    ] = bottom;
		return div;
	};
	/* Add Boxes */
	this.appendRoundedBox = function( id, title ) {
		var b = this.createRoundedBox( id, title );
		this.element.appendChild( b );
		return b;
	};
	this.insertRoundedBoxBefore = function( old, id, title ) {
		var b = this.createRoundedBox( id, title );
		this.element.insertBefore( b, old );
		return b;
	};
	this.insertRoundedBoxAfter = function( old, id, title ) {
		var b = this.createRoundedBox( id, title );
		if( this.element.nextSibbling != null )
			this.element.insertBefore( b, old.nextSibbling );
		else this.element.appendChild( b );
		return b;
	};
	
	/* List Altering */
	this.addListItem = function( id, side, href, text ) {
		if( this.isSectional( id ) ) return null;//We cant add lists to sectional boxes.
		if( !this.isLeftRight( id ) && !this.isSingleList( id ) ) {//Create list if there is none.
			if( side == 'left' ) {
				this[ id ][ 'left' ] = new Array();
				this[ id ].leftElement = document.createElement( 'div' );
				this[ id ].leftElement.className = 'listLeft';
				if( this[ id ].rightElement != null )
					this[ id ][ 'content' ].insertBefore( this[ id ].leftElement, this[ id ].rightElement );
				else
					this[ id ][ 'content' ].appendChild( this[ id ].leftElement );
			} else if( side == 'right' ) {
				this[ id ][ 'right' ] = new Array();
				this[ id ][ 'right' ] = new Array();
				this[ id ].rightElement = document.createElement( 'div' );
				this[ id ].rightElement.className = 'listRight';
				this[ id ][ 'content' ].appendChild( this[ id ].rightElement );
			} else {
				this[ id ][ 'list' ] = new Array();
			}
		}
		//Create List item
		var item = new Object();
		item[ 'block' ] = document.createElement( 'div' );
		item[ 'link'  ] = document.createElement( 'a' );
		item[ 'href'  ] = href;
		item[ 'text'  ] = text;
		item[ 'link'  ].href = href;
		item[ 'link'  ].appendChild( document.createTextNode( text ) );
		item[ 'block' ].className = 'boxLink';
		item[ 'block' ].appendChild( item[ 'link' ] );
		//Add item depending on settings
		if( this.isLeftRight( id ) ) {//Is this a double (Left/Right Columns) list
			if( side == 'left' ) {//We want it on the left
				this[ id ][ 'left' ][ this[ id ][ 'left' ].length ] = item;
				this[ id ].leftElement.appendChild( item[ 'block' ] );
			} else if( side == 'right' ) {//We want it on the right
				this[ id ][ 'right' ][ this[ id ][ 'right' ].length ] = item;
				this[ id ].rightElement.appendChild( item[ 'block' ] );
			} else {//We don't have a preference on side, so add it to the sortest side.
				if( this[ id ][ 'right' ].length < this[ id ][ 'left' ].length ) {
					//Left is larger, add to Right
					this[ id ][ 'right' ][ this[ id ][ 'right' ].length ] = item;
					this[ id ].rightElement.appendChild( item[ 'block' ] );
				} else {
					//Right is larger or both are same size, add to Left
					this[ id ][ 'left' ][ this[ id ][ 'left' ].length ] = item;
					this[ id ].leftElement.appendChild( item[ 'block' ] );
				}
			}
		} else {//This must be a single list.
			//Append item to list
			this[ id ][ 'list'    ][ this[ id ][ 'list' ].length ] = item;
			this[ id ][ 'content' ].appendChild( item[ 'block' ] );
		}
	};
	
	/* Type tests */
	this.isSingleList = function( id ) {
		return this[ id ][ 'list' ] != null;
	};
	this.isSectional = function( id ) {
		return this[ id ][ 'sections' ] != null;
	};
	this.isLeftRight = function( id ) {
		return this[ id ][ 'left' ] != null || this[ id ][ 'right' ] != null;
	};
	
	/* Get & Set */
	this.getHeader = function( id ) {
		if( this[ id ][ 'header' ] != null )
			this[ id ][ 'header' ].firstChild.data;
		return null;
	};
	this.setHeader = function( id, title ) {
		if( this[ id ][ 'header' ] != null ) {
			if( title == null ) {
				this[ id ][ 'header' ].parentNode.removeChild( this[ id ][ 'header' ] );
				this[ id ][ 'header' ] = null;
			} else {
				this[ id ][ 'header' ].firstChild.data = title;
			}
		} else {
			var h = null;
			if( title != null ) {
				h = document.createElement( 'div' );
				h.className = 'boxHeader';
				h.appendChild( document.createTextNode( title ) );
				this[ 'content' ].appendChild( h );
			}
			this[ id ][ 'header' ] = h;
		}
	};
	
	/* Private Builders */
	this.makeRound = function( isTop ) {
		var e = document.createElement( 'b' );
		e.className = isTop ? 'xtop' : 'xbottom';
		for( var xb = isTop ? 1 : 4;
				(  isTop && xb <= 4 ) ||
				( !isTop && xb >= 1 );
				xb += isTop ? 1 : -1 ) {
			var b = document.createElement( 'b' );
			b.className = 'xb' + xb;
			e.appendChild( b );
		}
		return e;
	};
	
}

/*</pre>*/