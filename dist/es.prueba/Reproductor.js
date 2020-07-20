var dc = document.documentElement,
 au = document.createElement('audio'),
 rc = JSON.parse(dc.getAttribute('data-recursos')),
 es = 0,
 ii = false,
 ca = 0,
 vp = 0,
 ct = [],
 et = document.getElementsByTagName('title')[0].childNodes[0],
 te = ['Cargando emisión', '', '', 'Emisión no disponible'],
 ot = {
  'json': function(a, b) {
   return a.reduce(function(c, d, e) {
    return c && c[d] ? (typeof c[d] === 'string' && e < a.length - 1 ? JSON.parse(c[d]) : c[d]) : null;
   }, b);
  },
  'xml': function(a, b) {
   return b.querySelector(a) ? b.querySelector(a).childNodes[0].nodeValue : null;
  }
 },
 mtH = {
  'h': ['ats', 'tit']
 },
 mtA,
 mtP;

et.splitText(19);
var vt = document.getElementById('cts-vtx').firstChild;
vt.splitText(3);

au.volume = 0;

for (var i = 0; i < 3; i++) {
 ct.push(document.getElementById('cts').children[i]);
}

function ce(a) {
 es = a;
 dc.setAttribute('data-estado', a);
 et.nodeValue = te[a];
}

function az() {
 if (rc[ca].audios[rc[ca].au_po + 1]) {
  au.src = rc[ca].audios[++rc[ca].au_po];
 } else if (rc[ca].listas && rc[ca].listas[rc[ca].li_po]) {
  cl();
 } else {
  ce(3);
 }
}

function cl() {
 var a = new XMLHttpRequest();
 a.onreadystatechange = function() {
  if (this.readyState == 4) {
   if (this.status == 200) {
    var b = {
      'm3u': /^(?!#)(\S+)$/gm,
      'pls': /^File\d+=(\S+)$/gm
     }[rc[ca].listas[rc[ca].li_po].formato],
     c = rc[ca].audios.length,
     d;
    while (d = b.exec(this.responseText)) {
     rc[ca].audios.push(new URL(d[1], this.responseURL).href);
    }
    if (rc[ca].audios.length > c) {
     rc[ca].listas.splice(rc[ca].li_po, 1);
     if (c) {
      rc[ca].au_po++;
     }
     au.src = rc[ca].audios[rc[ca].au_po];
     au.play();
    } else {
     rc[ca].li_po++;
     az();
    }
   } else {
    rc[ca].li_po++;
    az();
   }
   a = null;
  }
 };
 a.open('GET', rc[ca].listas[rc[ca].li_po].url, true);
 a.send();
}

function tt(a, b) {
 a.firstChild.nodeValue = b;
 a.title = b;
}

if(rc.length > 1) {
 var mc = document.createElement('select');
 for(var i = 0; i < rc.length; i++) {
  var el = document.createElement('option');
  el.textContent = rc[i].nombre;
  if(!rc[i].directos) {
   el.disabled = true;
  } else {
   rc[i].au_po = 0; 
   rc[i].li_po = 0;
  }
 }
 mc.onchange = function () {
  ca = this.selectedIndex;
  te[1] = 'Estás escuchando ' + rc[ca].nombre;
  te[2] = rc[ca].nombre;
 };
 document.getElementById('pri-tit').appendChild(mc);
}


ct[0].onclick = function() {
 ce(0);
 ic();
 this.onclick = function() {
  if (es === 1) {
   ce(2);
   tt(this, 'Reanudar la reproducción');
   ct.forEach(function (v) {
    v.disabled = true;
   });
   vp = +ct[2].value;
   if (au.muted) {
    au.pause();
    au.removeAttribute('src');
    au.load();
    ct[0].disabled = false;
    vp = 0;
   } else {
    var voldec = setInterval(function() {
     if (vp) {
      vp--;
      au.volume = vp / 100;
     } else {
      clearInterval(voldec);
      au.pause();
      au.removeAttribute('src');
      au.load();
      ct[0].disabled = false;
     }
    }, 10);
   }
   if (rc.metadatos) {
    mtX.abort();
    mtT = 0;
    clearTimeout(mtP);
   }
  } else {
   ct[0].disabled = true;
   ce(0);
   au.src = rc[ca].audios[rc[ca].au_po];
   au.play();
  }
 };
};

ct[1].onclick = function() {
 au.muted = !au.muted;
 if (au.muted) {
  dc.setAttribute('data-mudo', '');
  tt(this, 'Escuchar');
 } else {
  dc.removeAttribute('data-mudo');
  tt(this, 'Silenciar');
 };
};

au.addEventListener('error', function() {
 if (es !== 2) {
  az();
 }
});

au.addEventListener('ended', function() {
 vp = 0;
 au.volume = 0;
 au.removeAttribute('src');
 au.load();
 if (rc.metadatos) {
  mtX.abort();
  mtT = 0;
  clearTimeout(mtP);
 }
 ce(0);
 au.src = rc[ca].audios[rc[ca].au_po];
 au.play();
});

au.addEventListener('canplay', function() {
 this.play();
 if (es === 0) {
  ce(1);
  dc.setAttribute('data-aparicion', '');
  tt(ct[0], 'Detener la reproducción');
  if (!ii) {
   ii = true;
   dc.setAttribute('data-iniciado', '');

   function cv(e) {
    if (au.muted) {
     au.muted = false;
     dc.removeAttribute('data-mudo');
     tt(ct[1], 'Silenciar');
    };
    au.volume = e.value / 100;
    vt.nodeValue = e.value;
    dc.setAttribute('data-volumen', Math.ceil(e.value / 33.333333333333336));
   };

   ct[2].addEventListener('input', function() {
    cv(this);
   });

   ct[2].addEventListener('wheel', function(e) {
    e.preventDefault();
    this.value = e.deltaY > 0 ? this.value - 5 : +this.value + 5;
    cv(this);
   });

   if (rc.metadatos) {
    window.cm = [{
     'formato': 'json',
     'url': ['https://bo.cope.webtv.flumotion.com/api/active?format=json&podId=', '&_='],
     'propiedades': [
      ['value', 'author'],
      ['value', 'title']
     ]
    }, {
     'formato': 'json',
     'url': ['https://nowplaying.s-mdstrm.com/cache/nowplaying_', '.json?_='],
     'propiedades': [
      ['data', 'artist', 'name'],
      ['data', 'song', 'title']
     ]
    }, {
     'formato': 'xml',
     'url': ['https://np.tritondigital.com/public/nowplaying?mountName=', '&numberToFetch=1&eventType=track&_='],
     'propiedades': ['property[name="track_artist_name"]', 'property[name="cue_title"]']
    }][rc.metadatos.servicio];

    cm.url.splice(1, 0, rc.metadatos.id);
    cm.url = cm.url.join('');

    window.rx = {
     'json': function(a) {
      return JSON.parse(a.responseText)
     },
     'xml': function(a) {
      return a.responseXML
     }
    }[cm.formato];

    mtH.p = document.createElement('div');
    mtH.p.id = 'mtd';
    document.getElementById('inf-ecn').lastChild.appendChild(mtH.p);
    for (var i = 0; i < 2; i++) {
     var e = document.createElement('span');
     e.id = 'mtd-' + mtH.h[i];
     mtH.h[i] = document.createTextNode('');
     e.appendChild(mtH.h[i]);
     mtH.p.appendChild(e);
    };
    mtH.h[0].parentNode.insertAdjacentText('afterend', ' ');

    window.mtX = new XMLHttpRequest;
    window.mtC = function() {
     mtX.open('GET', cm.url + Math.random(), true);
     mtX.send();
    };
    window.mtT = 0;
    mtX.onreadystatechange = function() {
     if (this.readyState == 4) {
      if (this.status == 200 && this.response !== mtA) {
       mtA = this.response;
       var r = rx(this);
       mtH.p.setAttribute('data-transicion', '');
       setTimeout(function() {
        for (var i = 0; i < 2; i++) {
         mtH.h[i].nodeValue = ot[cm.formato](cm.propiedades[i], r);
        };
        mtH.p.removeAttribute('data-transicion');
       }, mtT);
      };
      clearTimeout(mtP);
      mtP = setTimeout(mtC, 2e4);
     }
    };
   };
  };

  var vl = ct[2].value;
  (function volapc() {
   if (vp++ < vl) {
    au.volume = vp / 100;
    setTimeout(volapc, 25);
   } else {
    dc.removeAttribute('data-aparicion');
    ct.forEach(function(v){
     v.disabled = false;
    });
    if (rc[ca].metadatos) {
     mtT = 500;
    }
   };
  })();

  if (rc[ca].metadatos) {
   mtC();
  }
 }
});

function ic() {
 if (rc[ca].audios.length) {
  au.src = rc[ca].audios[rc[ca].au_po];
  au.play();
 } else {
  cl();
 };
}

/* document.getElementById('rtr').addEventListener('click', function() {
 this.disabled = true;
 ce(0);
 au_po = 0;
 listasP = 0;
 ic();
});

*/


[
 ['Facebook', 'https://www.facebook.com/sharer/sharer.php?u='],
 ['Twitter', 'https://twitter.com/share?url='],
 ['WhatsApp', 'https://web.whatsapp.com/send?text=']
].forEach(function(i){
 var e = document.createElement('a');
 e.href = i[1] + 'https%3A%2F%2Fradios.fandom.com%2Fes%2Fwiki%2F' + encodeURIComponent('');
 e.title = 'Compartir en ' + i[0];
 document.getElementById('cmp').appendChild(e);
});

document.getElementById('cmp').onclick = function(e) {
 e.preventDefault();
 window.open(e.target.href, '', 'width=500,height=350');
};

dc.style.display = '';
dc.removeAttribute('data-recursos');