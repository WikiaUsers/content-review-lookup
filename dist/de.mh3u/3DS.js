document.getElementById("wkSrhTgl").setAttribute("href", "/wiki/Spezial:Suche#");
document.getElementById("wkNavTgl").removeAttribute("href");
document.getElementById("wkPrfTgl").setAttribute("href", "/wiki/Spezial:Anmelden#");

var toclink = document.createElement("a");
toclink.setAttribute( "style", "font-size:xx-small; line-height:1em; padding:1px; position:absolute; right:18px; top:160px; border:dashed thin dodgerblue;");
toclink.appendChild( document.createTextNode( "↓↓Inhaltsverzeichnis↓↓" ) );
toclink.setAttribute( "href", "#tocWrapper");
var zeContent = document.getElementById("mw-content-text");
zeContent.insertBefore( toclink , zeContent.firstChild );

var leThumbs = document.getElementsByClassName("lazy");
for (var i = 0, len = leThumbs.length; i < len; ++i) {
    leThumbs[i].setAttribute( "src" , leThumbs[i].getAttribute( "data-src" ) );
}

// [[Bild:Uplink.png]]
var uplink = document.createElement("img");
uplink.setAttribute( "onclick" , "window.scrollTo(0, 0);" );
uplink.setAttribute( "alt" , "↑" );
uplink.setAttribute( "src" , "https://images.wikia.nocookie.net/__cb20140413102022/mh3u/de/images/a/a1/Uplink.png" );
document.body.appendChild(uplink);
document.body.setAttribute( "onscroll" , 'uplink.setAttribute( "style" , "position:absolute; left:"+( window.pageXOffset + window.innerWidth / 10 * 7 )+"px; top:"+( window.pageYOffset + window.innerHeight / 7 * 6 )+"px; z-index:8;" );' );

var skinChange = document.getElementById("wkFllSite");
skinChange.setAttribute ("href", 'javascript:document.cookie = "useskin=monobook; path=/wiki/; domain=.de.mh3u.wikia.com; expires=Tue, 19 Jan 2038 03:14:07 GMT"; window.location.replace( "/wiki/" + encodeURI(wgPageName) );' );
skinChange.removeAttribute("data-skin");
//skinChange.removeAttribute("href");
skinChange.setAttribute("id", "DSktop");