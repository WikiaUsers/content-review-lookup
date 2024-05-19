$( function () {

	function extendededitlinks_get_event_target ( e ) {
	  var targ ;
	  if (!e) var e = window.event;
	  if (e.target) targ = e.target;
	  else if (e.srcElement) targ = e.srcElement;
	  if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
	  while ( targ.nodeType != 1 || targ.className != "editsection" ) targ = targ.parentNode ;
	  return targ ;
	}
	 
	function extendededitlinks_is_relevant_heading ( current , compare ) {
	  if ( current.nodeType != 1 ) return false ;
	  if ( current.tagName.length != 2 ) return false ;
	  if ( current.tagName.substr ( 0 , 1 ) != "H" ) return false ;
	  if ( current.tagName> compare.tagName) return false ;
	  return true ;
	}
	 
	function extendededitlinks_onmouseover ( e ) {
	  var target = extendededitlinks_get_event_target ( e ) ;
	 
	  var h2 = target ;
	  while ( h2.nodeType != 1 || h2.tagName.substr(0,1) != "H" ) h2 = h2.parentNode;
	 
	  var newdiv = document.createElement ( "div" ) ;
	  newdiv.style.backgroundColor = "#DDDDDD" ;
	//  newdiv.style.border = "1px solid black" ;
	//  newdiv.style.padding = "2px" ;
	 
	  h2.parentNode.insertBefore ( newdiv , h2 ) ;
	  newdiv = h2.previousSibling ; // Unneccessary?
	 
	  var x = h2 ;
	  do {
	    var y = x ;
	    x = x.nextSibling ;
	    newdiv.appendChild ( y ) ;
	  } while ( x && !extendededitlinks_is_relevant_heading ( x , h2 ) ) ;
	 
	}
	 
	function extendededitlinks_onmouseout ( e ) {
	  var target = extendededitlinks_get_event_target ( e ) ;
	 
	  var h2 = target ;
	  while ( h2.nodeType != 1 || h2.tagName.substr(0,1) != "H" ) h2 = h2.parentNode;
	 
	  var newdiv = h2 ;
	  while ( newdiv.nodeType != 1 || newdiv.tagName != "DIV" ) newdiv = newdiv.parentNode;
	 
	  for ( var y = newdiv.firstChild ; y ; y = z ) {
	    z = y.nextSibling ;
	    newdiv.parentNode.insertBefore ( y , newdiv ) ;
	  }
	  newdiv.parentNode.removeChild ( newdiv ) ;
	}
	 
	function extendededitlinks () {
	  var spans = document.getElementsByTagName( "span" );
	  for ( var i = 0 ; i < spans.length ; i++ ) {
	    if ( spans[i].className != "editsection" ) continue ;
	    var a = spans[i].getElementsByTagName("a")[0] ;
	    a.onmouseover = extendededitlinks_onmouseover ;
	    a.onmouseout = extendededitlinks_onmouseout ;
	  }
	}
	
	extendededitlinks();
});