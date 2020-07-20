/* to style the first word of all paragraphs set firstWordClassName to
an empty string. */
var firstWordClassName = 'firstWord';
/* "Style First Word Script" by http://www.dynamicsitesolutions.com/
*/

$(function() {
  if(!document.getElementsByTagName || !document.getElementsByTagName('body') ||
    !document.createElement || 
    !document.getElementsByTagName('body')[0].childNodes) {
      styleFirstWord2(); //for IE4
      return;
    }
  var el,pel,str,str2,idx,j,k,m,r=/^\s+$/;
  var paras = document.getElementsByTagName('p');
  for(var i=0;i<paras.length;i++) {
    if(!paras[i].hasChildNodes()) continue;
    if(firstWordClassName != '')
      if(paras[i].className.indexOf(firstWordClassName) == -1) continue;
    if(paras[i].normalize) paras[i].normalize();
    pel = paras[i].childNodes[0];
    j=0;
    m=(pel.nodeType != 3)?1:(pel.nodeValue.match(r)?1:0);
    while(m) {
      if(!pel.hasChildNodes()) {
        if(pel.nextSibling) pel = pel.nextSibling;
      } else if(pel.nodeType == 1) {
        pel = pel.childNodes[0];
      }
      j++;
      m=(pel.nodeType!=3)?1:(pel.nodeValue===null)?1:pel.nodeValue.match(r)?1:0;
      m=(j<16)?m:0;
    }
    str = pel.data;
    if(!str.length) continue;
    k=0;
    while(str.charAt(k).match(/\s/)) { k++; }
    idx = str.replace(/^\s+/,'').indexOf(' ');
    if(idx==-1) idx=0;
    if(idx > 0) {
      idx+=k;
      pel.data = str.substring(idx,str.length);
      str = str.substring(0,idx);
    } else {
      pel.data = '';
    }
    el = document.createElement('span');
    pel.parentNode.insertBefore(el,pel);
    el.className='firstWord';
    str2 = document.createTextNode(str);
    el.appendChild(str2);
    if(pel.data == '') pel.parentNode.removeChild(pel);
  }
});