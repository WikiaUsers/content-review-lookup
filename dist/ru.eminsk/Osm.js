// Verwendung von OpenStreetMap in Wikipedia.
// (c) 2008 by Magnus Manske
// Released under GPL
// initial version http://de.wikipedia.org/w/index.php?title=MediaWiki:Common.js&oldid=83335241

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
  na.appendChild(document.createTextNode('Показать географическую карту'));
  c.appendChild(document.createElement('br'))
  c.appendChild(na);
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
  var url = 'http://toolserver.org/~kolossos/openlayers/kml-on-ol.php?lang=ru&uselang=ru&params=' + h;

  i.id = 'openstreetmap';
  i.style.width = '100%';
  i.style.height = '350px';
  i.style.clear = 'both';
  i.src = url;
  cs.appendChild(i);
  return false;
}

addOnloadHook(openStreetMapInit);