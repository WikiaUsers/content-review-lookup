// Verwendung von OpenStreetMap in Wikipedia.
// (c) 2008 by Magnus Manske
// Released under GPL
 
function openStreetMapInit () {
  c = document.getElementById('coordinates')
  if (!c) return
 
  na = document.createElement('a')
  na.href = '#'
  na.className = 'noprint'
  na.onclick = openStreetMapToggle
  na.appendChild(document.createTextNode('OpenStreetMap'))
  c.appendChild(document.createElement('br'))
  c.appendChild(na)
}
 
function openStreetMapToggle () {
  c = document.getElementById ('coordinates')
  if (!c) return
  cs = document.getElementById('contentSub')
  osm = document.getElementById('openstreetmap')
 
  if (cs && osm) {
    cs.removeChild(osm)
    return
  }
 
  a = c.getElementsByTagName('a')[1]
  h = a.href
  h = h.split('params=')[1]
 
  i = document.createElement('iframe')
  url = 'http://tools.wikimedia.de/~magnus/ol/wp_poi.php?title=' + wgTitle
  url += '&language=' + wgUserLanguage
  url += '&params=' + h
  i.id = 'openstreetmap'
  i.style.width = '100%'
  i.style.height = '300px'
  i.style.clear = 'both'
  i.src = url
  cs.appendChild(i)
}
 
 
addOnloadHook(openStreetMapInit)