/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

//=============================================================
//*** Configuration for "star" logo in front of interwiki links to Featured Articles
//*** and green symbol in front of interwiki links to Good Articles

/** set to false in Special:Mypage/monobook.js to switch off this "feature" */

/** description that is displayed when cursor hovers above FA interwiki links */
var linkFA_description = "Dieser Artikel wurde als exzellent bewertet.";
var linkGA_description = "Dieser Artikel wurde als lesenswert bewertet.";

// linkFA_bullet/linkGA_bullet and linkFA_style/linkGA_Style werden nur für cologneblue, nostalgia and standard verwendet,
// für monobook, modern und simple siehe [[MediaWiki:Common.css]], vector hat in [[MediaWiki:Vector.css] eigene Definitionen

/** image to use instead of the standard bullet (for cologneblue, nostalgia and standard */
var linkFA_bullet = "http://upload.wikimedia.org/wikipedia/commons/d/d0/Monobook-bullet-star-transparent.png";
var linkGA_bullet = "http://upload.wikimedia.org/wikipedia/commons/a/a1/Monobook-bullet-star-gray.png";

/** style to use for the linkFA_bullet/LinkGA_bullet img */
var linkFA_style = "margin-right: 0.2em;";
var linkGA_style = "margin-right: 0.2em;";

/**
 * star logo for featured articles in other languages,
 * see Template:Link_FA / Template:Link_GA and MediaWiki:Common.css
 */
jQuery( document ).ready(function() {
    // early exit when disabled
    if ((mw.user.options.exists('linkFA_enabled') && !mw.user.options.get('linkFA_enabled'))) return;

    // skins that can be handled the CSS class way
    if (skin == "monobook" || skin == "simple" || skin == "modern" || skin== "vector" ) {
        linkFA_CSS();
    }
    else if (skin == "cologneblue" || skin == "nostalgia" || skin == "standard") {
        linkFA_decorate();
    }

    /** skin == "monobook" || skin == "simple" || skin="modern" || skin== "vector"*/
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
});

/*
## ProjektLinks ##
by Skript von [[user:Merlissimo]] (Idee basierend auf http://de.wiktionary.org/wiki/MediaWiki:Common.js von [[User:Pathoschild]] und [[wikt:de:User:Melancholie]])
erzeugt Sitebar-Interwiki zu Schwesterprojekten aufgrund von Vorlage {{InterProjekt}}
siehe auch Feature-Request [[bugzilla:708]]
*/
jQuery( document ).ready(function() {
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
    sisterprojectnav.className = sistersibling.className
    sisterprojectnav.innerHTML = '<h5>'+document.getElementById("sisterProjects").firstChild.innerHTML+'</h5><div><ul></ul></div>';
    var sistersiblingsub = sistersibling.getElementsByTagName("div")[0];
    if(sistersiblingsub){
        sisterprojectnav.childNodes[1].className = sistersiblingsub.className;
    } else {
        sisterprojectnav.childNodes[1].className = "pBody";
    }

    //Wenn möglich vor den Interwikis einfügen
    var sisternext = document.getElementById("p-lang");
    if ( sisternext && sisternext.parentNode == sisterparent ){
        sisterparent.insertBefore( sisterprojectnav, sisternext );
    }else{
        sisterparent.appendChild(sisterprojectnav);
    }

    //Schwesterlinks ermitteln und einfügen
    var sisterlinks = iProject.getElementsByTagName("a");
    for (var i = 0; i < sisterlinks.length; i++) {
        var sistername = sisterlinks[i].firstChild.nodeValue
        mw.util.addPortletLink('p-sisterprojects', sisterlinks[i].getAttribute("href") + '?uselang=' + mw.config.get( 'wgUserLanguage' ), sistername, "sister-"+ sistername, sistername);
    }
});

//==============================================================================
//*** Fügt einen Link "Alle Sprachen" auf der Hauptseite unter die Sprachverweise hinzu
// only on the main page
if(mw.config.get( 'wgPageName' ) == mw.config.get( 'wgMainPageTitle' )){
jQuery( document ).ready(function() {
    try {
        var completelist = mw.util.addPortletLink("p-lang", "http://de.wikipedia.org/wiki/Wikipedia:Sprachen", "Alle Sprachen", "interwiki-completelist", "Alle Sprachen");
        completelist.className='interwiki-completelist';
    } catch(e) {
        // lets just ignore what's happened
    }
});
}
//================================================================================
//*** force the loading of another JavaScript file 
// Deprecated function, function alias kept for backward compatibility

function includePage(name) {
    return importScript(name);
}

//==============================================================================
//*** Fügt der Suche weitere Suchengines hinzu (kopiert aus eswp)
// 2009-07-02: Auskommentiert, da das neue Suchformular anders funktioniert. Raymond.
// 2009-08-03: code jetzt reparierter . Pmartin
// 2009-08-03: Nochmals auskommentiert, siehe Diskussionsseite
//if (wgCanonicalSpecialPageName == "Search") {
//    importScript("MediaWiki:SpezialSuche.js");
//}

//================================================================================
//*** import Onlyifuploading-functions
// SEE ALSO [[MediaWiki:Onlyifuploading.js]]

if (mw.config.get( 'wgCanonicalSpecialPageName' ) == "Upload") {
    importScript("MediaWiki:Onlyifuploading.js");
    importScript("MediaWiki:Onlyifediting.js");
}

//================================================================================
//*** import watchlistmessage-functions
// Nachrichten auf der Beobachtungliste ausblenden
// SEE ALSO [[MediaWiki:Common.js/watchlist.js]]

if (mw.config.get( 'wgCanonicalSpecialPageName' ) == "Watchlist") {
    importScript("MediaWiki:Common.js/watchlist.js");
}

//================================================================================
//*** Dynamic Navigation Bars

// set up the words in your language
var NavigationBarHide = 'Einklappen';
var NavigationBarShow = 'Ausklappen';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden

// adds show/hide-button to navigation bars
jQuery( document ).ready(function() {
	if(!mw.user.options.exists( 'NavigationBarShowDefault' )){
	    if (typeof NavigationBarShowDefault != 'undefined' ) {
	        mw.user.options.set( 'NavigationBarShowDefault',NavigationBarShowDefault)
	    }
	}

	// shows and hides content and picture (if available) of navigation bars
	// Parameters:
	//     indexNavigationBar: the index of navigation bar to be toggled
	function toggleNavigationBar(NavToggle, NavFrame)
	{
	   if (!NavFrame || !NavToggle) {
		   return false;
	   }

	   // if shown now
	   if (NavToggle.firstChild.data == NavigationBarHide) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild != null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className == 'NavPic') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className == 'NavContent') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className == 'NavToggle') {
				   NavChild.firstChild.data = NavigationBarShow;
			   }
		   }

	   // if hidden now
	   } else if (NavToggle.firstChild.data == NavigationBarShow) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild != null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className == 'NavPic') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className == 'NavContent') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className == 'NavToggle') {
				   NavChild.firstChild.data = NavigationBarHide;
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
	var initiallyToggle	= mw.user.options.get( 'NavigationBarShowDefault',1 ) < NavFrames.length && mw.config.get( 'wgNamespaceNumber' ) != 10;
	for (var i=0;  i<NavFrames.length; i++) {
		var NavFrame = NavFrames[i];
		var NavToggle = document.createElement("a");
		NavToggle.className = 'NavToggle';
		NavToggle.setAttribute('href', '#');
 
		var NavToggleText = document.createTextNode(NavigationBarHide);
		NavToggle.appendChild(NavToggleText);
 
		// add NavToggle-Button as first div-element
		// in < div class="NavFrame" >
		NavFrame.insertBefore(NavToggle, NavFrame.firstChild);
		
		NavToggle.onclick = toggleNavigationBarFunction(NavToggle, NavFrame);
		if (initiallyToggle) {
			toggleNavigationBar(NavToggle, NavFrame);
		}
	}
});

//================================================================================
//*** import Onlyifediting-functions
// SEE ALSO [[MediaWiki:Onlyifediting.js]]

if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
    importScript("MediaWiki:Onlyifediting.js");
}

//================================================================================

/** Skript für Vorlage:Galerie */
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
      }
      else {
        commentText = currentimage.getAttribute("title");
        comment = document.createElement("span").appendChild(document.createTextNode(commentText));
        currentimage.removeAttribute("title");
      }
      if(rightlink !== undefined) {
        rightlink.setAttribute("title", commentText);
      }
      var imghead = document.createElement("div");
      rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.appendChild(document.createTextNode("◀"));
      }
      if (j != units.length - 1) {
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
      if (j != 0) {
        currentimage.style["display"] = "none";
      }
    }
  }
});

/* admin ui changes */

if( mw.config.exists( 'wgUserGroups' ) ) {
  for(var i = 0; i < mw.config.get( 'wgUserGroups' ).length; ++i) {
    if(mw.config.get( 'wgUserGroups' )[i] === "sysop") {
  // importScript("MediaWiki:Group-sysop.js");  kann bei Bedarf ent-auskommentiert werden
      importStylesheet("MediaWiki:Group-sysop.css");
      break;
    }
  }
}

//==============================================================================
//*** Fügt eine Betreffzeile auf leeren Diskussionsseiten ein

jQuery( document ).ready(function() {
        if(mw.config.get( 'wgNamespaceNumber' ) != 0 && mw.config.get( 'wgNamespaceNumber' ) != 1) return;
	var tab = document.getElementById( 'ca-talk' );
	if( !tab || tab.className != 'new' ) return;
	var link = tab.getElementsByTagName( 'a' )[0];
	if( !link ) return;
	link.href += '&section=new';
});


// Lokaler Bilddiskussionsseitenlink eines Commonsbildes verweist nach Commons

if (mw.config.get( 'wgNamespaceNumber' ) == 6) jQuery( document ).ready( function() {
	if (window.keepLocalFileTabs ) return;
	if (document.getElementById( 'ca-history')) return; //Lokale Dateibeschreibung vorhanden?
	if (!$('div.sharedUploadNotice' )[0]) return; //Nur bei Commons-Bildern
 
	var path = wgServer.match(/^https/)
		? 'https://secure.wikimedia.org/wikipedia/commons/wiki/'
		: 'http://commons.wikimedia.org/wiki/';

	// Ändere Link auf Diskussionsseite
	var talk = document.getElementById('ca-talk');
	if (talk && talk.className.match(/(^| )new( |$)/)) {
		var link		= talk.getElementsByTagName('a')[0];
		link.href       = path + 'File_talk:' + encodeURIComponent(wgTitle) + '?uselang=' + mw.config.get( 'wgUserLanguage' );
		link.className  += ' commonstab';
	}
 
	// Ändere Bearbeiten-Link
	var edit	= document.getElementById('ca-edit') || document.getElementById('ca-viewsource');
	if (edit) { 
		var link		= edit.getElementsByTagName('a')[0];
		link.href       = path + 'File:' + encodeURIComponent(wgTitle) + '?uselang=' + mw.config.get( 'wgUserLanguage' ) + '&action=edit';
		link.className  += ' commonstab';
		link.firstChild.nodeValue = 'Bearbeiten';
	}
});

/** Fügt bei SVG-Grafiken Links zu gerenderten PNGs in verschiedenen Breiten hinzu */
function SVGThumbs() {
	var file = document.getElementById("file"); // might fail if MediaWiki can't render the SVG
	if (file && mw.config.get( 'wgIsArticle' ) && mw.config.get( 'wgTitle' ).match(/\.svg$/i)) {
		var thumbu = file.getElementsByTagName('IMG')[0].src;
		if(!thumbu) return;
 
		function svgAltSize( w, title) {
			var path = thumbu.replace(/\/\d+(px-[^\/]+$)/, "/" + w + "$1");
			var a = document.createElement("A");
			a.setAttribute("href", path);
			a.appendChild(document.createTextNode(title));
			return a;
		}
 
		var p = document.createElement("p");
		p.className = "SVGThumbs";
		p.appendChild(document.createTextNode("Aus SVG automatisch erzeugte PNG-Grafiken in verschiedenen Auflösungen"+": "));
		var l = [200, 500, 1000, 2000];
                for( var i = 0; i < l.length; i++ ) {
			p.appendChild(svgAltSize( l[i], l[i] + "px"));
			if( i < l.length-1 ) p.appendChild(document.createTextNode(", "));
                }
		p.appendChild(document.createTextNode("."));
		var info = $(file.parentNode).find( 'div.fullMedia' )[0];
		if( info ) info.appendChild(p);
	}
};
jQuery(document).ready(SVGThumbs);

// <noscript>-Emulation via <div class="noscript"></div>
mw.util.addCSS( '.noscript {display:none;}' );

/*
 * Description: Stay on the secure server as much as possible
 */
if(mw.config.get( 'wgServer' ) == 'https://secure.wikimedia.org') {
    importScript( 'MediaWiki:Common.js/secure.js');
}


// Verwendung von OpenStreetMap in Wikipedia.
// (c) 2008 by Magnus Manske
// Released under GPL

function openStreetMapInit() {
  var c = document.getElementById('coordinates');
  if (!c) return;

  var a = c.getElementsByTagName('a');
  var geohack = false;
  for (var i = 0; i < a.length; i++) {
    var h = a[i].href;
    if (!h.match(/geohack/)) continue;
    if (h.match(/_globe:/)) continue; // no OSM for moon, mars, etc
    geohack = true;
    break;
  }
  if (!geohack) return;

  var na = document.createElement('a');
  na.href = '#';
  na.onclick = openStreetMapToggle ;
  na.appendChild(document.createTextNode('Karte'));
  c.appendChild(document.createTextNode(' ('));
  c.appendChild(na);
  c.appendChild(document.createTextNode(')     '));
}

function openStreetMapToggle() {
  var c = document.getElementById('coordinates');
  if (!c) return; 
  var cs = document.getElementById('contentSub');
  var osm = document.getElementById('openstreetmap');

  if (cs && osm) {
    if (osm.style.display == 'none') {
      osm.style.display = 'block';
    } else {
      osm.style.display = 'none';
    }
    return false;
  }

  var found_link = false;
  var a = c.getElementsByTagName('a');
  var h;
  for (var i = 0; i < a.length; i++) {
    h = a[i].href;
    if (!h.match(/geohack/)) continue;
    found_link = true;
    break;
  }
  if (!found_link) return; // No geohack link found

  h = h.split('params=')[1];
  
  var i = document.createElement('iframe');
  var url = 'http://toolserver.org/~kolossos/openlayers/kml-on-ol.php?lang=de&uselang=' + mw.config.get( 'wgUserLanguage' ) + '&params=' + h;

  i.id = 'openstreetmap';
  i.style.width = '100%';
  i.style.height = '350px';
  i.style.clear = 'both';
  i.src = url;
  cs.appendChild(i);
  return false;
}
jQuery(document).ready(openStreetMapInit);

/* Ändere den Spenden-Link im Sidebar für Besucher aus Deutschland */ 
 
var donate_rewrite_url = function() {
  if ( Geo.country == 'DE' && mw.config.get( 'wgUserLanguage' ) == 'de' ) {
    var baseUrl = 'https://spenden.wikimedia.de/';
    var queryString = jQuery.param({
        'piwik_campaign':'de.wikipedia.org',
        'piwik_kwd':'sidebar',
        'language':wgUserLanguage, 
        'country':Geo.country});
    jQuery("li#n-sitesupport a").attr("href", baseUrl + '?' + queryString);
  }
}
jQuery(document).ready(donate_rewrite_url);