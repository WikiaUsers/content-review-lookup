/* Das folgende JavaScript wird für Benutzer der Küken-Benutzeroberfläche geladen. Allgemeingültiges JavaScript bitte in [[MediaWiki:Common.js]] eintragen. */

if ( navigator.platform == "Nintendo 3DS" ) {
  function work(ref) {
    "use strict";
    var anchor = "";
    if (ref.indexOf("#")!= -1) {
      ref = ref.split("#");
      anchor = "#" + ref[1];
      ref = ref[0];
    }
    if (ref.indexOf("useskin=") == -1) {
      if (ref.indexOf("?")!= -1) {
        return ref + "&useskin=chick" + anchor;
      } else
        return ref + "?useskin=chick" + anchor;
    } else
      return ref + anchor;
  }

  window.onload = (function (){
    "use strict";
    var links = document.links;
    var worknode = document.createElement("input");
 
    worknode.setAttribute( "type", "hidden" );
    worknode.setAttribute( "name", "useskin" );
    worknode.setAttribute( "value", "chick" );
 
    for (var i = 0; i < links.length; ++i)
      if ( links[i].href.indexOf("/wiki/")!= -1 )
        links[i].href = work(links[i].href);
    var forms = document.forms;
    for (var  i = 0; i < forms.length; ++i)
      forms[i].appendChild(worknode.cloneNode());
  });

  var uplink = document.createElement("img");
  uplink.setAttribute( "onclick" , "window.scrollTo(0, 0);" );
  uplink.setAttribute( "alt" , "↑" );
  uplink.setAttribute( "src" , "https://images.wikia.nocookie.net/__cb20140413102022/mh3u/de/images/a/a1/Uplink.png" );
  document.body.appendChild(uplink);
  document.body.setAttribute( "onscroll" , 'uplink.setAttribute( "style" , "position:absolute; left:"+( window.pageXOffset + window.innerWidth / 10 * 7 )+"px; top:"+( window.pageYOffset + window.innerHeight / 7 * 6 )+"px; z-index:8;" );' );

  var monolink = document.createElement("a");
  monolink.appendChild( document.createTextNode( "Desktopansicht" ) );
  monolink.setAttribute( "href" , '/wiki/' + encodeURI(wgPageName) + '?useskin=monobook' );
  var monoli = document.createElement("li");
  monoli.appendChild(monolink);
  var lili = document.getElementById("t-permalink");
  lili.parentNode.insertBefore( monoli , lili );
}