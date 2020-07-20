/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

/* Script pour alterner entre deux cartes de géolocalisation  */
addOnloadHook(function(){ 
  var cont;
  if(!(wgAction=="view")) return

  cont=getElementsByClass('img_toogle', document.getElementById('bodyContent'), 'div');
  if(cont.length==0) return

  for (var i = 0; i < cont.length ; i++) {
    cont.box = getElementsByClass('geobox',cont[i]);
    cont.box[0].style.display='none';
    cont.box[1].style.borderTop='0';
    var toogle = document.createElement('a');
    toogle.appendChild(document.createTextNode(cont.box[0].getElementsByTagName('img')[0].alt));
    toogle.href='#';
    toogle.className='a_toogle';
    toogle.status = 1;
    toogle.onclick = function() {
      this.removeChild(this.firstChild);
      div0 = getElementsByClass('geobox',this.parentNode)[0];
      div1 = getElementsByClass('geobox',this.parentNode)[1];
      alt0 = div0.getElementsByTagName('img')[0].alt;
      alt1 = div1.getElementsByTagName('img')[0].alt;
      if(this.status==0) {
        div0.style.display='none';
        div1.style.display='';
        this.status=1;
        this.appendChild(document.createTextNode(alt0));
      } else {
        div0.style.display='';
        div1.style.display='none';
        this.status=0;
        this.appendChild(document.createTextNode(alt1));
      }
      return false;
    }
  cont[i].insertBefore(toogle, cont.box[1].nextSibling);
  }
});