/* console.log($.cookie('Geo')); */



/* Nombres de los días y los meses */
var dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
 meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];



/* Añadir cero a la izquierda si el valor es igual o mayor que 1 y menor que 10 */
function ceroIzq(n) {
 return ('0' + n).slice(-2)
}



/* Crear elementos HTML */
function crearHtml (a, b, c) {
  var d = document.createElement(a);
  for(f in c) {
    d[f] = c[f]
  }
  if (b) {
    b.appendChild(d);
  }
  return d;
}



/* Portada */
if (wikiaPageType === 'home') {
 crearHtml('script', document.head, {'src': '/es/wiki/MediaWiki:Common.js/Portada.js?action=raw&ctype=text/javascript'});
};



/* Pop ups */
$('.WR-PYpup').on('click', function(event) {
 event.preventDefault();
 window.open(this.href, '', 'width=600,height=600,scrollbars=yes,top=0,left=0')
});



/* Reproductor Wiki Radios */
document.querySelectorAll('.WR-PRrep').forEach(
 function (e) {
  var rep_con = e.getAttribute('data-con');
  e.removeAttribute('data-con');
  e.onclick = function () {
   window.open('', '', 'top=0,left=0,height=350,width=650').document.write('<!DOCTYPE html><html lang="es" data-con="' + rep_con + '" data-estado="0" data-volumen="3"><head><meta charset="UTF-8"/><meta name="referrer" content="no-referrer"/><title>Emisión por Internet - Wiki Radios, la enciclopedia de la radio</title><link rel="shortcut icon" type="image/x-icon" href="https://vignette.wikia.nocookie.net/radios/es/images/6/64/Favicon.ico"/><link rel="stylesheet"><base target="_blank"></head><body><header><a href="/" title="Ir a la portada de Wiki Radios"><img alt="Wiki Radios" src="https://images.wikia.nocookie.net/__cb18/radios/es/images/8/89/Wiki-wordmark.png"/></a></header><main><div id="tit"><h1><a id="tit-vin" class="ear"> </a></h1></div><figure id="log"><a class="ear"><img id="log-ima"/></a></figure><dl id="met"><dt>Artista</dt><dd id="met-art"> </dd><dt>Canción</dt><dd id="met-can"> </dd></dl><div id="con"><button id="con-eap">Iniciar reproducción</button><button id="con-crs">Compartir en redes sociales</button><button id="con-sde">Silenciar</button><input id="con-ven" type="range" min="0" max="100" value="100"/><output id="con-vte">100%</output></div></main><footer id="pdp">Funcionalidad desarrollada por <strong>Wiki Radios</strong>, 2013-</footer><div id="mod-car" class="mod"></div><script></script></body></html>');
  };
 }
);



/* Plantilla «Presencia geográfica» */
var GMAPIcargado = false;
if (document.getElementsByClassName('WR-PYpge').length) {
 var sgm = crearHtml('script', document.body, {'src':'https://maps.googleapis.com/maps/api/js?language=es&key=AIzaSyBgK4ZMe8zv90ZdZgSM3gL88-it0Z37eaA'});
 sgm.onload = function() {
  var mk_ic = {
   url: 'https://ninrpg-ch3302.files.1drv.com/y3mIj06xgDHNrAFWlq0kQz96taR0IjJbsYaoG2VcQGoIkEEb86wrpuXicfnIXg6gE3aMFW9o58-vmVxUw1w7g_Asw1nRaMMMp5V9hZWhZCB4qp4hqXvQwhmM51oBjdFDmOP6kdYLq5iwTRtEYVY1HxQJP-zVbNzl-pm6KRHO7R7Ed4/Sprite%20WR.png',
   size: new google.maps.Size(31, 44),
   origin: new google.maps.Point(0, 124)
  };
  $(document.getElementsByClassName('WR-PYpge')).each(function(ind, val) {
   var pg_cf = JSON.parse(this.getAttribute('data-datos')),
    pg_me = this.getElementsByTagName('ul')[0].children,
    pg_ca = crearHtml('div', this, {'className':'WR-PYpge-cnv'}),
    pg_pc = crearHtml('button', this, {'className':'WR-PYpge-bpc','textContent':'Pantalla completa'});
    pg_pc.addEventListener('click',function(){
     if(document.fullscreenElement) {
      document.exitFullscreen();
      this.textContent = 'Ver en pantalla completa';
     } else {
      val.requestFullscreen();
      this.textContent = 'Salir de pantalla completa';
     }
    });
    var pg_ma = new google.maps.Map(pg_ca, {
     zoom: 1,
     center: {
      lat: 0,
      lng: 0
     },
     mapTypeId: google.maps.MapTypeId.HYBRID,
     styles: [{
      featureType: 'poi',
      elementType: 'all',
      stylers: [{
       visibility: 'off'
      }]
     }],
     fullscreenControl: false,
     rotateControl: false
    }),
    pg_bd = new google.maps.LatLngBounds(),
    ia = null,
    iw = null;
   pg_ma.controls[google.maps.ControlPosition.TOP_RIGHT].push(pg_pc); 
   pg_ma.setTilt(0);
   function pg_ic(x) {
    var j = pg_cf[x],
     h = pg_me[x],
     n = j.nombre,
     l = j.logotipo,
     c = h.getElementsByClassName('WR-PYpge-dsc')[0].textContent;
    var iw_ct = crearHtml('div', null, {'className': 'WR-WDifw'});
    if (l) {
     var iw_fg = crearHtml('figure', iw_ct),
      iw_lg = crearHtml('img', iw_fg, {'src': 'https://vignette.wikia.nocookie.net/prueba/images/' + l});
    };
    var iw_cp = crearHtml('div', iw_ct),
     iw_ti = crearHtml('h2', iw_cp, {'textContent': n}),
     iw_ds = crearHtml('div', iw_cp, {'textContent': c});
    return iw_ct;
   };
   $(pg_cf).each(function(i) {
    var pg_ps = this.coordenadas,
      li = pg_me[i],
      pg_mk = new google.maps.Marker({
      map: pg_ma,
      position: pg_ps,
      icon: mk_ic,
     }),
     pg_iw = new google.maps.InfoWindow({
      content: pg_ic(i)
     });

    function lugarclick(el) {
     pg_iw.open(pg_ma, el);
     pg_ma.panTo(pg_ps);
     if (li != ia) {
      if (ia) {
       ia.classList.remove('WR-PYpge-lac');
       iw.close();
      }
      ia = li;
      iw = pg_iw;
      ia.classList.add('WR-PYpge-lac');
     }
    };
    pg_mk.addListener('click', function() {
     lugarclick(this);
    });
    google.maps.event.addDomListener(crearHtml('i', li, {'className':'WR-PYpge-mem','title':'Mostrar en el mapa'}), 'click', function() {
     pg_ma.getStreetView().setVisible(false);
     lugarclick(pg_mk);
    });
    pg_iw.addListener('closeclick', function() {
     ia.classList.remove('WR-PYpge-lac');
     ia = null;
     iw = null;
    });

    pg_bd.extend(pg_ps);
   });
   pg_ma.fitBounds(pg_bd);
  });
 };
};



/* Mapa en ventana modal */
var tipomapa = {
 'EP': 'Estudios principales',
 'PT': 'Planta transmisora',
 'SD': 'Sede'
};



$('.WR-PYemp a').on('click', function(e) {
 e.preventDefault();
 bma();
 var coordenadas = mw.util.getParamValue('q', this.href).split(',');
 var logo = $(this).parents('.WR-PYemp').attr('data-logotipo');
 var direcciontexto = $(this).text();
 if (GMAPIcargado == false) {
  if (!$('#WR-WDmdl-map').length) {
   crearmodal('Mapa', 'WR-WDmdl-map', '<div id="WR-WDmdl-map-cgd">Cargando</div>', '<a class="button" target="_blank" href="#">Ampliar mapa</a>');

  }
  $.ajax({
   url: 'https://maps.googleapis.com/maps/api/js?language=es',
   dataType: 'script',
   cache: true,
   context: this,
   success: function() {
    GMAPIcargado = !GMAPIcargado;
    $('#WR-WDmdl-map-cgd').replaceWith('<div id="WR-WDmdl-map-cnv"></div>');
    var ubicacion = new google.maps.LatLng(coordenadas[0], coordenadas[1]);
    var map = new google.maps.Map(document.getElementById('WR-WDmdl-map-cnv'), {
      zoom: 16,
      center: ubicacion,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      styles: [{
       featureType: "poi",
       elementType: "all",
       stylers: [{
        visibility: "off"
       }]
      }],
      rotateControl: false,
     }),
     infowindow = new google.maps.InfoWindow({
      content: '<div class="WR-WDifw"><figure><img src="//es.radios.wikia.com/wiki/Especial:RutaDeArchivo/' + logo + '"></figure><div><h2>' + tipomapa[$(this).parents('.WR-PYemp').data('tipo')] + ' de XHUIA-FM (Ibero 90.9)</h2><strong>' + ubicacion + '</strong></div></div>'
     }),
     marker = new google.maps.Marker({
      map: map,
      position: ubicacion,
      icon: new google.maps.MarkerImage("https://ninrpg-ch3302.files.1drv.com/y3mIj06xgDHNrAFWlq0kQz96taR0IjJbsYaoG2VcQGoIkEEb86wrpuXicfnIXg6gE3aMFW9o58-vmVxUw1w7g_Asw1nRaMMMp5V9hZWhZCB4qp4hqXvQwhmM51oBjdFDmOP6kdYLq5iwTRtEYVY1HxQJP-zVbNzl-pm6KRHO7R7Ed4/Sprite%20WR.png", new google.maps.Size(31, 44), new google.maps.Point(0, 124)),
     });
    map.setTilt(0);
    marker.addListener('click', function() {
     infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
    $('.WR-PYemp a').on('click', function() {
     var cd = mw.util.getParamValue('q', this.href).split(',');
     map.setMapTypeId(google.maps.MapTypeId.HYBRID);
     marker.setPosition(new google.maps.LatLng(cd[0], cd[1]));
     map.setCenter(marker.getPosition());
     infowindow.open(map, marker);
     map.setZoom(16);
     map.getStreetView().setVisible(false);
     $('#WR-WDmdl-map').show();
    });
   }
  });
 }
});