/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* MD5 library, see http://pajhome.org.uk/crypt/md5/md5.js */

var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(A){return binl2hex(core_md5(str2binl(A),A.length*chrsz));}function b64_md5(A){return binl2b64(core_md5(str2binl(A),A.length*chrsz));}function str_md5(A){return binl2str(core_md5(str2binl(A),A.length*chrsz));}function hex_hmac_md5(A,B){return binl2hex(core_hmac_md5(A,B));}function b64_hmac_md5(A,B){return binl2b64(core_hmac_md5(A,B));}function str_hmac_md5(A,B){return binl2str(core_hmac_md5(A,B));}function core_md5(A,B){A[B>>5]|=0x80<<((B)%32);A[(((B+64)>>>9)<<4)+14]=B;var C=1732584193;var D=-271733879;var E=-1732584194;var F=271733878;for(var G=0;G<A.length;G+=16){var H=C;var I=D;var J=E;var K=F;C=md5_ff(C,D,E,F,A[G+0],7,-680876936);F=md5_ff(F,C,D,E,A[G+1],12,-389564586);E=md5_ff(E,F,C,D,A[G+2],17,606105819);D=md5_ff(D,E,F,C,A[G+3],22,-1044525330);C=md5_ff(C,D,E,F,A[G+4],7,-176418897);F=md5_ff(F,C,D,E,A[G+5],12,1200080426);E=md5_ff(E,F,C,D,A[G+6],17,-1473231341);D=md5_ff(D,E,F,C,A[G+7],22,-45705983);C=md5_ff(C,D,E,F,A[G+8],7,1770035416);F=md5_ff(F,C,D,E,A[G+9],12,-1958414417);E=md5_ff(E,F,C,D,A[G+10],17,-42063);D=md5_ff(D,E,F,C,A[G+11],22,-1990404162);C=md5_ff(C,D,E,F,A[G+12],7,1804603682);F=md5_ff(F,C,D,E,A[G+13],12,-40341101);E=md5_ff(E,F,C,D,A[G+14],17,-1502002290);D=md5_ff(D,E,F,C,A[G+15],22,1236535329);C=md5_gg(C,D,E,F,A[G+1],5,-165796510);F=md5_gg(F,C,D,E,A[G+6],9,-1069501632);E=md5_gg(E,F,C,D,A[G+11],14,643717713);D=md5_gg(D,E,F,C,A[G+0],20,-373897302);C=md5_gg(C,D,E,F,A[G+5],5,-701558691);F=md5_gg(F,C,D,E,A[G+10],9,38016083);E=md5_gg(E,F,C,D,A[G+15],14,-660478335);D=md5_gg(D,E,F,C,A[G+4],20,-405537848);C=md5_gg(C,D,E,F,A[G+9],5,568446438);F=md5_gg(F,C,D,E,A[G+14],9,-1019803690);E=md5_gg(E,F,C,D,A[G+3],14,-187363961);D=md5_gg(D,E,F,C,A[G+8],20,1163531501);C=md5_gg(C,D,E,F,A[G+13],5,-1444681467);F=md5_gg(F,C,D,E,A[G+2],9,-51403784);E=md5_gg(E,F,C,D,A[G+7],14,1735328473);D=md5_gg(D,E,F,C,A[G+12],20,-1926607734);C=md5_hh(C,D,E,F,A[G+5],4,-378558);F=md5_hh(F,C,D,E,A[G+8],11,-2022574463);E=md5_hh(E,F,C,D,A[G+11],16,1839030562);D=md5_hh(D,E,F,C,A[G+14],23,-35309556);C=md5_hh(C,D,E,F,A[G+1],4,-1530992060);F=md5_hh(F,C,D,E,A[G+4],11,1272893353);E=md5_hh(E,F,C,D,A[G+7],16,-155497632);D=md5_hh(D,E,F,C,A[G+10],23,-1094730640);C=md5_hh(C,D,E,F,A[G+13],4,681279174);F=md5_hh(F,C,D,E,A[G+0],11,-358537222);E=md5_hh(E,F,C,D,A[G+3],16,-722521979);D=md5_hh(D,E,F,C,A[G+6],23,76029189);C=md5_hh(C,D,E,F,A[G+9],4,-640364487);F=md5_hh(F,C,D,E,A[G+12],11,-421815835);E=md5_hh(E,F,C,D,A[G+15],16,530742520);D=md5_hh(D,E,F,C,A[G+2],23,-995338651);C=md5_ii(C,D,E,F,A[G+0],6,-198630844);F=md5_ii(F,C,D,E,A[G+7],10,1126891415);E=md5_ii(E,F,C,D,A[G+14],15,-1416354905);D=md5_ii(D,E,F,C,A[G+5],21,-57434055);C=md5_ii(C,D,E,F,A[G+12],6,1700485571);F=md5_ii(F,C,D,E,A[G+3],10,-1894986606);E=md5_ii(E,F,C,D,A[G+10],15,-1051523);D=md5_ii(D,E,F,C,A[G+1],21,-2054922799);C=md5_ii(C,D,E,F,A[G+8],6,1873313359);F=md5_ii(F,C,D,E,A[G+15],10,-30611744);E=md5_ii(E,F,C,D,A[G+6],15,-1560198380);D=md5_ii(D,E,F,C,A[G+13],21,1309151649);C=md5_ii(C,D,E,F,A[G+4],6,-145523070);F=md5_ii(F,C,D,E,A[G+11],10,-1120210379);E=md5_ii(E,F,C,D,A[G+2],15,718787259);D=md5_ii(D,E,F,C,A[G+9],21,-343485551);C=safe_add(C,H);D=safe_add(D,I);E=safe_add(E,J);F=safe_add(F,K);}return Array(C,D,E,F);}function md5_cmn(A,B,C,D,E,F){return safe_add(bit_rol(safe_add(safe_add(B,A),safe_add(D,F)),E),C);}function md5_ff(A,B,C,D,E,F,G){return md5_cmn((B&C)|((~B)&D),A,B,E,F,G);}function md5_gg(A,B,C,D,E,F,G){return md5_cmn((B&D)|(C&(~D)),A,B,E,F,G);}function md5_hh(A,B,C,D,E,F,G){return md5_cmn(B^C^D,A,B,E,F,G);}function md5_ii(A,B,C,D,E,F,G){return md5_cmn(C^(B|(~D)),A,B,E,F,G);}function core_hmac_md5(A,B){var C=str2binl(A);if(C.length>16)C=core_md5(C,A.length*chrsz);var D=Array(16),opad=Array(16);for(var E=0;E<16;E++){D[E]=C[E]^0x36363636;opad[E]=C[E]^0x5C5C5C5C;}var F=core_md5(D.concat(str2binl(B)),512+B.length*chrsz);return core_md5(opad.concat(F),512+128);}function safe_add(A,B){var C=(A&0xFFFF)+(B&0xFFFF);var D=(A>>16)+(B>>16)+(C>>16);return (D<<16)|(C&0xFFFF);}function bit_rol(A,B){return (A<<B)|(A>>>(32-B));}function str2binl(A){var B=Array();var C=(1<<chrsz)-1;for(var D=0;D<A.length*chrsz;D+=chrsz)B[D>>5]|=(A.charCodeAt(D/chrsz)&C)<<(D%32);return B;}function binl2str(A){var B="";var C=(1<<chrsz)-1;for(var D=0;D<A.length*32;D+=chrsz)B+=String.fromCharCode((A[D>>5]>>>(D%32))&C);return B;}function binl2hex(A){var B=hexcase?"0123456789ABCDEF":"0123456789abcdef";var C="";for(var D=0;D<A.length*4;D++){C+=B.charAt((A[D>>2]>>((D%4)*8+4))&0xF)+B.charAt((A[D>>2]>>((D%4)*8))&0xF);}return C;}function binl2b64(A){var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var C="";for(var D=0;D<A.length*4;D+=3){var E=(((A[D>>2]>>8*(D%4))&0xFF)<<16)|(((A[D+1>>2]>>8*((D+1)%4))&0xFF)<<8)|((A[D+2>>2]>>8*((D+2)%4))&0xFF);for(var F=0;F<4;F++){if(D*8+F*6>A.length*32)C+=b64pad;else C+=B.charAt((E>>6*(3-F))&0x3F);}}return C;}

/* Google Maps interface */

var loadedScripts = {}; // included-scripts tracker
function getElementsByClass(searchClass,tag,node) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

function getParam(name, type, defValue) {
  var eparam = document.getElementById(name);
  if (!eparam) return defValue;

  var value = eparam.firstChild.nodeValue;

  switch (type) {
    case 'bool': 
      value = (value.toLowerCase() == 'true') ? true : false;
      break;
    case 'float': 
      value = parseFloat(value);
      if (isNaN(value)) return defValue;
      break;
    case 'int': 
      value = parseInt(value);
      if (isNaN(value)) return defValue;
  }
  return value;
}


function fromInGameToLatLng(pixel) {
  var p = new GPoint((pixel.x - 68052.13) * 65.1102, (175683.52 - pixel.y) * 64.9985);
  var latlng = map.getCurrentMapType().getProjection().fromPixelToLatLng(p,15);
  return latlng;
}

function fromLatLngToInGame(latlng) {
  var p = map.getCurrentMapType().getProjection().fromLatLngToPixel(latlng,15);
  var gp = new GPoint((p.x / 65.1102) + 68052.13, 175683.52 - (p.y / 64.9985));
  return gp;
}


function mapLoad() {
  if (GBrowserIsCompatible()) {
    var tile_prefix = "https://images.wikia.nocookie.net/rappelz/images/"

    hookEvent('unload', GUnload);

    var rw_map = new GMap2(mapdiv);
    window.map = rw_map;
    rw_map.addControl(new GLargeMapControl());
    var rw_copyright = new GCopyright(1, new GLatLngBounds(new GLatLng(-90,-180),new GLatLng(90,180)), 1, "(c) nFlavor");
    var rw_copyrightCollection = new GCopyrightCollection('Map Data:');
    rw_copyrightCollection.addCopyright(rw_copyright);
    rw_CustomGetTileUrl=function(a,b){
      if (b==5) {
        a.x-=1;a.y-=1;
      }
      if ((a.x < 0) || (a.y < 0) || ((b == 4) && ((a.x > 14) || (a.x ==0) || (a.y ==0))) || ((b == 5) && ((a.x > 28) || (a.x == 0) || (a.y == 0))) || (a.y > 32)) {
        fn = "Default.jpg";
      } else {
        fn = b+"_"+a.x+"_"+a.y+".jpg";
      }
      var hash = hex_md5(fn);
      return tile_prefix+hash.charAt(0)+"/"+hash.substring(0,2)+"/"+fn;
    }
    var rw_tilelayers = [new GTileLayer(rw_copyrightCollection,1,5)];
    rw_tilelayers[0].getTileUrl = rw_CustomGetTileUrl;
    var rw_custommap = new GMapType(rw_tilelayers, new GMercatorProjection(18), "Rappelz Map");
    rw_map.addMapType(rw_custommap);
    var rw_z = getParam('rw_z', 'int', 1);
    rw_map.setCenter(new GLatLng(20,0,true), rw_z, rw_custommap);

    var rw_x = getParam('rw_x', 'int', -1);
    var rw_y = getParam('rw_y', 'int', -1);

    var rw_lat = getParam('rw_lat', 'float', -20);
    var rw_lng = getParam('rw_lng', 'float', 0);

    if ((rw_x > 0) && (rw_y > 0)) {
      var latlng = fromInGameToLatLng(new GPoint(rw_x, rw_y));
    } else {
      var latlng = new GLatLng(rw_lat, rw_lng, true);
    }

    var rw_overview = getParam('rw_overview', 'bool', true);

    rw_map.setCenter(latlng, rw_z, rw_custommap);
    if (rw_overview)
      rw_map.addControl(new GOverviewMapControl());
    rw_map.enableContinuousZoom();

    /* Markers */
    var markers = getElementsByClass("mapmarker", "div");

    for(var i=0, il=markers.length; i<il; i+=1){
      current = markers[i];

      var marker_x = getParam(current.id + '-x', 'float', -1);
      var marker_y = getParam(current.id + '-y', 'float', -1);

      var marker_lat = getParam(current.id + '-lat', 'float', 0);
      var marker_lng = getParam(current.id + '-lng', 'float', 0);

      if ((marker_x > 0) && (marker_y > 0)) {
        var latlng = fromInGameToLatLng(new GPoint(marker_x, marker_y));
      } else {
        var latlng = new GLatLng(marker_lat, marker_lng, true);
      }

      var marker = new GMarker(latlng);
      map.addOverlay(marker);
      marker.bindInfoWindow(document.getElementById(current.id + '-info'));
    }

    /* Polygons */
    var polygons = getElementsByClass("maparea", "div");

    for(var i=0, il=polygons.length; i<il; i+=1){
      var current = polygons[i];
      var value = current.firstChild.nodeValue;
      var latLngs = value.split(";");
      var polyPoints = Array();
      for (var i = 0; i < latLngs.length; i++) {
        var latLng = latLngs[i].split(",");
        polyPoints.push(new GLatLng(latLng[0],latLng[1]));
      }

      map.addOverlay(new GPolygon(polyPoints,"#000000",2,.25,"#ff0000",.25));
    }
  }
}

var mapdiv = document.getElementById("rwmap");
if (mapdiv) {
  importScriptURI('http://maps.google.com/maps?file=api&v=2&key=ABQIAAAADWeB9PWu704m-LeSYwDp5RSd2I_PYszHQjJbXdZOUYtPXSyVCxSCYq65vuav-tbRN7JFIwSxi-7B7Q');
  hookEvent('load', mapLoad);
}

// ============================================================
// BEGIN Dynamic Navigation Bars 
// This script is from Wikipedia. For author attribution, please see 
// http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history

// Primarily tweaked for job skill page views to show more 
// skill detail upon user interaction; 
// and then show less detail upon user interaction.     
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "less";
 var expandCaption = "more";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
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
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
 addOnloadHook( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars (experimantal)
// ============================================================