var spans=document.getElementsByTagName('span');
for (var i=0; i<spans.length; i++){
 var span=spans[i];
 if (span.className.indexOf('sprIcon')>=0)
   span.onclick=function(){location=this.getAttribute('data-link');};
}
var imgs=document.getElementsByTagName('img');
for (var i=0; i<imgs.length; i++){
 var img=imgs[i];
 if (img.getAttribute('data-src')!="")
   img.setAttribute("src", img.getAttribute('data-src'));
}