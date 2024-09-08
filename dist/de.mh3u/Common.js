/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. 

if ( navigator.platform == "Nintendo 3DS" ) {
  document.cookie = "useskin=monobook; path=/; domain=de.mh3u.wikia.com;\
                                         expires=Tue, 19 Jan 2038 03:14:07 GMT;";
  document.cookie = "useskin=toast; path=/wiki/; domain=de.mh3u.wikia.com;\
                                         expires=Fri, 31 Dec 1999 23:59:59 GMT;";
  if ( window.location.href.indexOf( "useskin" ) == -1 &&
                          window.location.href.indexOf("action=submit") == -1 )
    window.location.replace( wgServer + "/wiki/" +
                                      encodeURI(wgPageName) + "?useskin=chick" );
}
*/
switch ( wgPageName ) {
  case "Kantine":
    function markcells(event) {
      "use strict";
      if (event.target.nodeName == "A") {
        /* clean up */
        var temp = document.getElementsByClassName("highlight");
        for ( var i = temp.length - 1; i >= 0; i-- )
          temp[i].removeAttribute("class");
        /* add new highlights */
        temp = document.getElementsByClassName(event.target.parentNode.id);
        for ( var i = temp.length - 1; i >= 0; i-- )
          if (temp[i].parentNode.nodeName == "DD")   /* variable Faehigkeiten */
              temp[i].parentNode.className = "highlight";
          else                  /* Statuseffekte */ /* statische Faehigkeiten */
              temp[i].parentNode.parentNode.parentNode.className = "highlight";
       }
    }
    document.getElementById("bufflist").addEventListener("click", markcells);
  break;

  case "MH3U-Wiki:Info":
    function killAllCookies() {
      "use strict";
      document.cookie = "useskin=toast; expires=Fri, 31 Dec 1999 23:59:59 GMT";
      document.cookie = "useskin=toast; path=/; domain=wikia.com;\
       expires=Fri, 31 Dec 1999 23:59:59 GMT";
      document.cookie = "useskin=toast; path=/; domain=de.mh3u.wikia.com;\
       expires=Fri, 31 Dec 1999 23:59:59 GMT";
    }
    document.getElementById("product").innerHTML = window.navigator.product;
    document.getElementById("appName").innerHTML = window.navigator.appName;
    document.getElementById("appCodeName").innerHTML = window.navigator.appCodeName;
    document.getElementById("appVersion").innerHTML = window.navigator.appVersion;
    document.getElementById("platform").innerHTML = window.navigator.platform;
    document.getElementById("oscpu").innerHTML = window.navigator.oscpu;
    document.getElementById("userAgent").innerHTML = window.navigator.userAgent;
    document.getElementById("cookie").innerHTML = document.cookie;
    document.getElementById("cookill").addEventListener("click", killAllCookies);
  break;
}