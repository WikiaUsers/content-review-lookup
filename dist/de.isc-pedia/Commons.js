/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
 
/**
 * Sortierung von Umlauten und ß auch ohne [[Vorlage:SortKey]] ermöglichen
 * For jquery.tablesorter.js
 */
mw.config.set( 'tableSorterCollation', {'Ä':'A', 'Ö':'O', 'Ü':'U', 'ä':'a', 'ö':'o', 'ü':'u', 'ß':'ss'} );
 
/**
 * Stay on the same server as much as possible
 * Load page: [[MediaWiki:Common.js/relative.js]]
 */
if( mw.config.get( 'wgNamespaceNumber' ) > 0 ) { //not in main space and special pages
 mw.loader.using( [ 'user', 'mediawiki.user', 'user.options' ], function() { //wait for overrides in user.js
  if( mw.user.options.get( 'relativeProtocols', true ) ) { //disable in user.js, if not needed
   mw.loader.load( '//de.wikipedia.org/w/index.php?title=MediaWiki:Common.js/relative.js'
                   + '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );
  }
 });
}
 
/**
 * load the Edittools on [[Special:Upload]] and prefill the summary textarea
 * Load pages: [[MediaWiki:Onlyifuploading.js]], [[MediaWiki:Onlyifediting.js]]
 */
if (mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload') {
 importScript("MediaWiki:Onlyifuploading.js");
 importScript("MediaWiki:Onlyifediting.js");
}
 
/**
 * load the Edittools ([[MediaWiki:Edittools]], the part under the edit form)
 * Load page: [[MediaWiki:Onlyifediting.js]]
 */
if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
 importScript("MediaWiki:Onlyifediting.js");
}
 
/**
 * Nachrichten aus [[MediaWiki:watchlist-summary]] auf der Beobachtungliste ausblenden
 * Load page: [[MediaWiki:Common.js/watchlist.js]]
 */
if (mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Watchlist') {
 importScript("MediaWiki:Common.js/watchlist.js");
}
 
//=============================================================
//*** Configuration for "star" logo in front of interwiki links to Featured Articles
//*** and green symbol in front of interwiki links to Good Articles
/** set in Special:Mypage/common.js to switch off this "feature"
mw.user.options.set( 'linkFA_enabled', false );
 * star logo for featured articles in other languages,
 * see Template:Link_FA / Template:Link_GA and MediaWiki:Common.css
 */
mw.loader.using( [ 'user', 'mediawiki.user', 'user.options' ], function() { $(function() {
    /** description that is displayed when cursor hovers above FA interwiki links */
    var linkFA_description = "Dieser Artikel wurde als exzellent bewertet.";
    var linkGA_description = "Dieser Artikel wurde als lesenswert bewertet.";
 
    // linkFA_bullet/linkGA_bullet and linkFA_style/linkGA_Style werden nur für cologneblue, nostalgia and standard verwendet,
    // für monobook, modern und simple siehe [[MediaWiki:Common.css]], vector hat in [[MediaWiki:Vector.css] eigene Definitionen
 
    /** image to use instead of the standard bullet (for cologneblue, nostalgia and standard */
    var linkFA_bullet = "//upload.wikimedia.org/wikipedia/commons/d/d0/Monobook-bullet-star-transparent.png";
    var linkGA_bullet = "//upload.wikimedia.org/wikipedia/commons/a/a1/Monobook-bullet-star-gray.png";
 
    /** style to use for the linkFA_bullet/LinkGA_bullet img */
    var linkFA_style = "margin-right: 0.2em;";
    var linkGA_style = "margin-right: 0.2em;";
 
    // early exit when disabled
    if ( !mw.user.options.get( 'linkFA_enabled', true ) ) {
        return;
    }
 
    // skins that can be handled the CSS class way
    var skin = mw.config.get( 'skin' );
    if (skin === "monobook" || skin === "simple" || skin === "modern" || skin === "vector" ) {
        linkFA_CSS();
    }
    else if (skin === "cologneblue" || skin === "nostalgia" || skin === "standard") {
        linkFA_decorate();
    }
 
    /** skin == "monobook" || skin == "simple" || skin="modern" || skin== "vector" */
    function linkFA_CSS() {
        // links are to replaced in p-lang only
        var pLang = document.getElementById("p-lang");
        if (!pLang) return;
        var lis = pLang.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            // only links with a corresponding Link_FA template are interesting
            if (document.getElementById(li.className + "-fa")) {
              li.className += " FA";         // additional class so the template can be hidden with CSS
              li.title = linkFA_description; // change title
              continue;
            }
            if (document.getElementById(li.className + "-ga")) {
              li.className += " GA";         // additional class so the template can be hidden with CSS
              li.title = linkGA_description; // change title
              continue;
            }
        }
    }
 
    /** skin == "cologneblue" || skin == "nostalgia" || skin == "standard" */
    function linkFA_decorate() {
        // these root elements can contain FA-/GA-links
        var rootIds = new Array("topbar", "footer");
        for (var i=0; i<rootIds.length; i++) {
            var root    = document.getElementById(rootIds[i]);
            if (!root)  continue;
 
            // if the root exists, try to decorate all the links within
            var links   = root.getElementsByTagName("a");
            for (var j=0; j<links.length; j++) {
                decorate(links[j], "-fa", linkFA_bullet, linkFA_description, linkFA_style);
                decorate(links[j], "-ga", linkGA_bullet, linkGA_description, linkGA_style);
            }
        }
    }
 
    /** id necessary, modify a link to show the FA- or GA-star (older) */
    function decorate(link, idSuffix, bullet, description, style) {
        var lang    = link.hostname.split(".")[0];
        var fa      = document.getElementById("interwiki-" + lang + idSuffix);
        if (!fa)	return;
 
	// build an image-node for the FA-star
	var img = document.createElement("img");
	img.setAttribute("src",     bullet);
	img.setAttribute("alt",     description);
	img.setAttribute("style",   style);
	// decorate the link with the image
	link.appendChild(img);
	link.appendChild(link.removeChild(link.firstChild));
	link.setAttribute("title", description);
    }
})});
 
/*
## ProjektLinks ##
by Skript von [[user:Merlissimo]] (Idee basierend auf http://de.wiktionary.org/wiki/MediaWiki:Common.js von [[User:Pathoschild]] und [[wikt:de:User:Melancholie]])
erzeugt Sitebar-Interwiki zu Schwesterprojekten aufgrund von Vorlage [[Vorlage:InterProjekt]]
siehe auch Feature-Request [[bugzilla:708]]
*/
mw.loader.using( [ 'mediawiki.util' ], function() { jQuery( document ).ready(function() {
    var iProject = document.getElementById("interProject");
    if(!iProject) return;
    var sistersibling = document.getElementById("p-lang");
    if(!sistersibling) sistersibling= document.getElementById("p-tb");
    if(!sistersibling) return;
    //Link auf Parennode des Portletmenues
    var sisterparent = sistersibling.parentNode;
 
    //Erzeuge neues Portletmenue
    var sisterprojectnav = document.createElement("div");
    sisterprojectnav.id = "p-sisterprojects";
    sisterprojectnav.className = sistersibling.className;
    sisterprojectnav.innerHTML = '<h3>'+document.getElementById("sisterProjects").firstChild.innerHTML+'</h3><div><ul></ul></div>';
    var sistersiblingsub = sistersibling.getElementsByTagName("div")[0];
    if(sistersiblingsub) {
        sisterprojectnav.childNodes[1].className = sistersiblingsub.className;
    } else {
        sisterprojectnav.childNodes[1].className = "pBody";
    }
 
    //Wenn möglich vor den Interwikis einfügen
    var sisternext = document.getElementById("p-lang");
    if ( sisternext && sisternext.parentNode === sisterparent ) {
        sisterparent.insertBefore( sisterprojectnav, sisternext );
    } else {
        sisterparent.appendChild(sisterprojectnav);
    }
 
    //Schwesterlinks ermitteln und einfügen
    var sisterlinks = iProject.getElementsByTagName("a");
    for (var i = 0; i < sisterlinks.length; i++) {
        var sistername = sisterlinks[i].firstChild.nodeValue;
        mw.util.addPortletLink('p-sisterprojects', sisterlinks[i].getAttribute("href") + '?uselang=' + mw.util.rawurlencode( mw.config.get( 'wgUserLanguage' ) ), sistername, "sister-"+ sistername, sistername);
    }
})});
 
/**
 * Fügt einen Link "Alle Sprachen" auf der Hauptseite unter die Sprachverweise hinzu
 */
if( mw.config.get( 'wgIsMainPage' ) ) {
 mw.loader.using( [ 'mediawiki.util' ], function() { $( function () {
  mw.util.addPortletLink(
   'p-lang',
   mw.util.wikiGetlink( 'Wikipedia:Sprachen' ),
   'Alle Sprachen',
   'interwiki-completelist',
   'Liste aller Sprachversionen von Wikipedia'
  );
 })});
}
 
/**
 * force the loading of another JavaScript file
 * Deprecated function, function alias kept for backward compatibility
 */
window.includePage = function( name ) {
    return importScript( name );
}
 
//================================================================================
//*** Dynamic Navigation Bars
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// mw.user.options.set( 'NavigationBarShowDefault', 0 ); // all bars will be hidden
// mw.user.options.set( 'NavigationBarShowDefault', 1 ); // on pages with more than 1 bar all bars will be hidden
 
// adds show/hide-button to navigation bars
// using 'jquery.makeCollapsible': for messages
// using 'user', 'mediawiki.user', 'user.options': wait for overrides in user.js
mw.loader.using( [ 'mediawiki.util', 'jquery.makeCollapsible', 'user', 'mediawiki.user', 'user.options' ], function() { $(function() {
	// allow setting NavigationBarShowDefault
	var showDefaultCount = mw.user.options.get( 'NavigationBarShowDefault',
		typeof NavigationBarShowDefault !== 'undefined' ? NavigationBarShowDefault : 1 );
	// allow user overrides for b/c
	var textHide = typeof NavigationBarHide === 'string' ? NavigationBarHide : mw.msg( 'collapsible-collapse' );
	var textShow = typeof NavigationBarShow === 'string' ? NavigationBarShow : mw.msg( 'collapsible-expand' );
 
	// shows and hides content and picture (if available) of navigation bars
	// Parameters:
	//     indexNavigationBar: the index of navigation bar to be toggled
	function toggleNavigationBar(NavToggle, NavFrame)
	{
	   if (!NavFrame || !NavToggle) {
		   return false;
	   }
 
	   // if shown now
	   if (NavToggle.firstChild.data === textHide) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild !== null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className === 'NavPic') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className === 'NavContent') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className === 'NavToggle') {
				   NavChild.firstChild.data = textShow;
			   }
		   }
 
	   // if hidden now
	   } else if (NavToggle.firstChild.data === textShow) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild !== null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className === 'NavPic') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className === 'NavContent') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className === 'NavToggle') {
				   NavChild.firstChild.data = textHide;
			   }
		   }
	   }
	}
 
	function toggleNavigationBarFunction(NavToggle, NavFrame) {
		return function() {
			toggleNavigationBar(NavToggle, NavFrame);
			return false;
		};
	}
	// iterate over all NavFrames
	var NavFrames = mw.util.$content.find( 'div.NavFrame' );
 
	// if more Navigation Bars found and not template namespace than Default: hide all
	var initiallyToggle	= showDefaultCount < NavFrames.length && mw.config.get( 'wgNamespaceNumber' ) !== 10;
	for (var i=0;  i<NavFrames.length; i++) {
		var NavFrame = NavFrames[i];
		var NavToggle = document.createElement("a");
		NavToggle.className = 'NavToggle';
		NavToggle.setAttribute('href', '#');
 
		var NavToggleText = document.createTextNode(textHide);
		NavToggle.appendChild(NavToggleText);
 
		// add NavToggle-Button as first div-element
		// in < div class="NavFrame" >
		NavFrame.insertBefore(NavToggle, NavFrame.firstChild);
 
		NavToggle.onclick = toggleNavigationBarFunction(NavToggle, NavFrame);
		if (initiallyToggle) {
			toggleNavigationBar(NavToggle, NavFrame);
		}
	}
})});
 
//================================================================================
 
/** Skript für [[Vorlage:Galerie]] */
jQuery( document ).ready(function() {
  if (document.URL.match(/printable/g)) return;
 
  function toggleImageFunction(group,  remindex, shwindex) {
    return function() {
      document.getElementById("ImageGroupsGr" + group + "Im" + remindex).style["display"] = "none";
      document.getElementById("ImageGroupsGr" + group + "Im" + shwindex).style["display"] = "block";
      return false;
    };
  }
 
  var divs = document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length; i++) {
    if (divs[i].className !== "ImageGroup") { continue; }
    UnitNode = undefined;
    search = divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length; j++) {
      if (search[j].className !== "ImageGroupUnits") { continue; }
      UnitNode=search[j];
      break;
    }
    if (UnitNode === undefined) { continue; }
    units = [];
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className === "center") { units.push(temp); }
    }
    var rightlink = undefined;
    var commentText = undefined;
    for (j = 0; j < units.length; j++) {
      currentimage = units[j];
      currentimage.id = "ImageGroupsGr" + i + "Im" + j;
      var leftlink = document.createElement("a");
      if (commentText !== undefined) {
        leftlink.setAttribute("title", commentText);
      }
      var comment;
      if (typeof(currentimage.getAttribute("title")) !== "string") {
        commentText = (j+1) + "/" + units.length;
        comment = document.createElement("tt").appendChild(document.createTextNode("("+ commentText + ")"));
      } else {
        commentText = currentimage.getAttribute("title");
        comment = document.createElement("span").appendChild(document.createTextNode(commentText));
        currentimage.removeAttribute("title");
      }
      if(rightlink !== undefined) {
        rightlink.setAttribute("title", commentText);
      }
      var imghead = document.createElement("div");
      rightlink = document.createElement("a");
      if (j !== 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.appendChild(document.createTextNode("◀"));
      }
      if (j !== units.length - 1) {
        rightlink.href = "#";
        rightlink.onclick = toggleImageFunction(i, j, j+1);
        rightlink.appendChild(document.createTextNode("▶"));
      }
      imghead.style["fontSize"] = "110%";
      imghead.style["fontweight"] = "bold";
      imghead.appendChild(leftlink);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(comment);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(rightlink);
      if (units.length > 1) {
        currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      }
      if (j !== 0) {
        currentimage.style["display"] = "none";
      }
    }
  }
});
 
/**
 * Fügt eine Betreffzeile auf leeren Artikel-Diskussionsseiten ein
 */
if( mw.config.get( 'wgNamespaceNumber' ) === 0 || mw.config.get( 'wgNamespaceNumber' ) === 1 ) {
 $(function() {
  $( '#ca-talk.new a' ).attr( 'href', function( index, attr ) {
   return attr + '&section=new';
  });
 });
}
 
/**
 * Lokaler Dateidiskussionsseitenlink eines Commonsbildes verweist nach Commons
 */
if (mw.config.get( 'wgNamespaceNumber' ) === 6) {
 mw.loader.using( [ 'mediawiki.util', 'user', 'mediawiki.user' ], function() { $( function() { //wait for overrides in user.js
	if ( mw.config.get( 'keepLocalFileTabs', false ) ) {
		return;
	}
	if ( $( '#ca-history' ).length ) {
		return; //Lokale Dateibeschreibung vorhanden?
	}
	if ( !$( 'div.sharedUploadNotice' ).length ) {
		return; //Nur bei Commons-Bildern
	}
 
	var path = '//commons.wikimedia.org/wiki/';
 
	// Ändere Link auf Diskussionsseite
	var talkLink = $( '#ca-talk.new a' );
	talkLink.attr( 'href', path + 'File_talk:' + mw.util.wikiUrlencode( mw.config.get( 'wgTitle' ) ) + '?uselang=' + mw.util.rawurlencode( mw.config.get( 'wgUserLanguage' ) ) );
	talkLink.addClass( 'commonstab' );
 
	// Ändere Bearbeiten-Link
	var editLink = $( '#ca-edit a, #ca-viewsource a' );
	editLink.attr( 'href', path + 'File:' + mw.util.wikiUrlencode( mw.config.get( 'wgTitle' ) ) + '?action=edit&uselang=' + mw.util.rawurlencode( mw.config.get( 'wgUserLanguage' ) ) );
	editLink.addClass( 'commonstab' );
	editLink.text( 'Bearbeiten' );
 })});
}
 
/**
 * Fügt bei SVG-Grafiken Links zu gerenderten PNGs in verschiedenen Breiten hinzu
 */
if (mw.config.get( 'wgNamespaceNumber' ) === 6) {
 $( function() {
  var file = $( '#file' ); // might fail if MediaWiki can't render the SVG
  if( file.length && mw.config.get( 'wgIsArticle' ) && mw.config.get( 'wgTitle' ).match( /\.svg$/i ) ) {
   var thumbsrc = file.find( 'img' ).attr( 'src' );
   if( !thumbsrc ) {
    return;
   }
 
   var svgAltSize = function( w, title ) {
    var path = thumbsrc.replace( /\/\d+(px-[^\/]+$)/, "/" + w + "$1" );
    var a = $( document.createElement("a") );
    a.attr( 'href', path );
    a.text( title );
    return a;
   };
 
   var p = $( document.createElement("p") );
   p.addClass( "SVGThumbs" );
   p.append( document.createTextNode( "Aus SVG automatisch erzeugte PNG-Grafiken in verschiedenen Auflösungen"+": " ) );
   var l = [ 200, 500, 1000, 2000 ];
   for( var i = 0; i < l.length; i++ ) {
    if( i !== 0 ) {
     p.append( document.createTextNode( ", " ) );
    }
    p.append( svgAltSize( l[i], l[i] + "px" ) );
   }
   p.append( document.createTextNode( "." ) );
   $( file.parent() ).find( 'div.fullMedia' ).append( p );
  }
 });
}
 
/**
 * <noscript>-Emulation via <div class="noscript"></div>
 * Jetzt in [[MediaWiki:Common.css]], hier entfernen ab 28. Oktober 2013
 */
mw.loader.using( [ 'mediawiki.util' ], function() {
 mw.util.addCSS( '.noscript { display:none; }' );
});
 
/**
 * Verwendung von OpenStreetMap in Wikipedia.
 * (c) 2008 by Magnus Manske, Released under GPL
 */
//mediawiki.util is used by openStreetMapToggle
mw.loader.using( [ 'mediawiki.util' ], function() { $( function() {
  var c = $( '#coordinates' );
  if ( !c.length ) {
   return;
  }
 
  var a = c.find( 'a' );
  var geohack = false;
  for (var i = 0; i < a.length; i++) {
    var h = a[i].href;
    if (!h.match(/geohack/)) continue;
    if (h.match(/skyhack/)) continue;
    if (h.match(/_globe:/)) continue; // no OSM for moon, mars, etc
    geohack = true;
    break;
  }
  if ( !geohack ) {
   return;
  }
 
  var separator = $( document.createElement( 'span' ) );
  separator.text( ' | ' );
  separator.attr( 'class', 'noprint coordinates-separator' );
  c.append( separator );
  var img = $( document.createElement( 'img' ) );
  img.attr( {
   'src': '//upload.wikimedia.org/wikipedia/commons/thumb/c/c9/OpenStreetMapLogo.png/17px-OpenStreetMapLogo.png',
   'width': '17px',
   'height': '17px'
  } );
  var a = $( document.createElement( 'a' ) );
  a.attr( {
   'href': '#',
   'title': 'Zeige Koordinaten auf einer Karte von OpenStreetMap',
   'class': 'noprint osm-icon-coordinates'
  } );
  a.click( openStreetMapToggle );
  a.append( img );
  c.append( a );
})});
// The function to toggle
function openStreetMapToggle() {
  var c = $( '#coordinates' );
  if ( !c.length) {
   return;
  }
  var cs = $( '#contentSub' );
  var osm = $( '#openstreetmap' );
 
  if ( cs.length && osm.length ) {
   if ( osm.css( 'display' ) === 'none' ) {
    osm.css( 'display', 'block' );
   } else {
    osm.css( 'display', 'none' );
   }
   return false;
  }
 
  var found_link = false;
  var a = c.find( 'a' );
  var h;
  for (var i = 0; i < a.length; i++) {
   h = a[i].href;
   if (!h.match(/geohack/)) continue;
   found_link = true;
   break;
  }
  if ( !found_link ) {
   return; // No geohack link found
  }
 
  h = h.split('params=')[1];
 
  var url = '//toolserver.org/~kolossos/openlayers/kml-on-ol.php?lang=de&uselang='
          + mw.util.rawurlencode( mw.config.get( 'wgUserLanguage' ) )
          + '&params=' + h
          + '&title=' + mw.util.wikiUrlencode( mw.config.get( 'wgTitle' ) );
 
  var iframe = $( document.createElement( 'iframe' ) );
  iframe.attr( 'id', 'openstreetmap' );
  iframe.css({
   'width': '100%',
   'height': '350px',
   'clear': 'both'
  });
  iframe.attr( 'src', url );
  cs.append( iframe );
  return false;
}
 
/**
 * Ändere den Spenden-Link im Sidebar für Besucher aus Deutschland
 */
$( function() {
 if ( typeof( Geo ) === "object" && Geo.country === 'DE' && mw.config.get( 'wgUserLanguage' ) === 'de' ) {
  var baseUrl = 'https://spenden.de.pedia.isc/';
  var queryString = $.param({
      'piwik_campaign': 'de.wikipedia.org',
      'piwik_kwd': 'sidebar',
      'language': mw.config.get( 'wgUserLanguage' ),
      'country': Geo.country
  });
  $("#n-sitesupport a").attr("href", baseUrl + '?' + queryString);
 }
});
 
/**
 * erzeuge einen "Neuen Abschnitt"-Link an der letzten Überschrift
 */
$( function() {
 var newSectionLink = $( '#ca-addsection a' );
 if( newSectionLink.length ) {
  var link = newSectionLink.clone(); //create a copy
  //avoid duplicate accesskey
  link.removeAttr( 'accesskey' ).attr( 'title', function ( index, oldTitle ) {
   return oldTitle.replace( /\s*\[.*\]\s*$/, '' );
  } );
  //add it within the brackets
  var lastEditsectionLink = $( 'span.mw-editsection:last a:last' );
  lastEditsectionLink.after( link );
  lastEditsectionLink.after( ' | ' ); //see [[MediaWiki:Pipe-separator]]
 }
});
 
/**
 * Entferne [[Vorlage:Anker]] aus der Zusammenfassungszeile,
 * damit diese beim generieren der Auto-Zusammenfassung nicht das Linkziel mit beeinflusst
 */
if ( mw.config.get( 'wgAction' ) === 'edit' ) {
 $( function() {
  $( '#wpSummary' ).val( function( i, val ) {
   //Nur aktiv werden, wenn es auch eine Autozusammenfassung gibt
   if( val.length <= 2 || val.substring( 0, 2 ) !== '/*' ) {
    return val;
   }
   return val.replace( /\{\{[\s_]*:?[\s_]*(?:(?:Template|Vorlage)[\s_]*:[\s_]*)?Anker[\s_]*\|[^}]*\}\}\s*/gi, '' );
  });
 });
}