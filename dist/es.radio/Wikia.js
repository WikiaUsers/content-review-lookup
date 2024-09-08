mw.loader.load('http://es.prueba.wikia.com/wiki/MediaWiki:Wikia-WR.js?action=raw&ctype=text/javascript');

/* Entradas destacadas (excelentes/recomendadas) */
if (wgNamespaceNumber == 0) {
 for (var i = 0, d = ['excelente', 'recomendada']; i < d.length; i++) {
  var y = d[i];
  if (wgCategories.indexOf('Wiki Radios:Entradas ' + y + 's') > -1) {
   document.getElementsByClassName('page-header__title')[0].insertAdjacentHTML('afterend', '<a id="WR-PYede" class="WR-PYede-' + y.substring(0,3) + '" title="Entrada ' + y + '" target="_blank" href="/wiki/Wiki_Radios:Entradas_' + y + 's"></a>');
   break
  }
 }
};

/* Comentarios en artículos */
if (document.getElementById('WikiaArticleComments')) {
 (function() {
  document.head.insertAdjacentHTML('afterbegin', '<meta property="fb:admins" content="100012738284067"/>');
  var cec = document.createElement('div');
  cec.id = 'WR-WDcmt';
  cec.innerHTML = '<h2>En Wiki Radios tu voz es muy importante</h2><p>Opina sobre este artículo. Si has encontrado errores u omisiones en él, recuerda que <a href="/wiki/' + wgPageName + '?action=edit" title="Edita este artículo">tú puedes mejorarlo</a>.</p><p>Comentar usando:</p>';
  var csw = document.createElement('ul'),
   r = [
    [document.createElement('div')],
    [document.getElementById('WikiaArticleComments')]
   ],
   u = 0;

  for (var i = 0; i < 2; i++) {
   (function() {
    var l = document.createElement('li'),
     j = document.createElement('i');
    r[i].push(j);
    j.addEventListener('click', function() {
     if (!this.classList.contains('WR-WDcmt-pac')) {
      r[u][0].hidden = true;
      r[u][1].className = '';
      u = (u + 1) % 2;
      this.className = 'WR-WDcmt-pac';
      r[u][0].hidden = false;
     }
    });
    l.appendChild(j);
    csw.appendChild(l);
   })();
  };
  r[0][1].className = 'WR-WDcmt-pac';
  r[1][0].hidden = true;
  cec.appendChild(csw);
  r[0][0].className = 'fb-comments';
  r[0][0].setAttribute('data-href', 'http://es.radios.wikia.com/?curid=' + wgArticleId);
  r[0][0].setAttribute('data-numposts', 15);
  r[0][0].setAttribute('data-order-by', 'reverse_time');
  r[0][0].setAttribute('data-width', '100%');
  r[1][0].parentNode.insertBefore(cec, r[1][0]);
  r[1][0].insertAdjacentElement('afterend', r[0][0]);

  function ccf() {
   if (r[0][0].getBoundingClientRect().top < this.innerHeight) {
    this.removeEventListener('scroll', ccf);
    (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s);
     js.id = id;
     js.src = "https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.11";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
   };
  };
  window.addEventListener('scroll', ccf);
 })();
};