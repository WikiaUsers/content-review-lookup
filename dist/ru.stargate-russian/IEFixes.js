// now IE6 only; IPA moved back to [[MediaWiki:Common.js|Common.js]]

//See http://ru.wikipedia.org/wiki/project:code#IEFixes.js

function doFixIEScroll() {
  var d = document.documentElement
  d.style.overflowX = (d.scrollWidth - d.clientWidth < 4) ? 'hidden' : ''
}
document.attachEvent('onreadystatechange', doFixIEScroll)
window.attachEvent('onresize', function(){setTimeout(doFixIEScroll, 1)})


// PNG transparency fix
function PngFix(){
 try {
   if (!document.body.filters) disablePngFix = true
 } catch (e) { disablePngFix = true }
 if (window.disablePngFix) return
 var images = document.images, img, imgSrc, outer, inner
 for (var i = 0; i < images.length; i++){
   img = images[i]
   imgSrc = img.src
   if (imgSrc.substr(imgSrc.length - 4).toLowerCase() != '.png' || img.onclick || !img.complete) continue
   if (img.useMap){
       img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
       img.src = 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif'
   }else{
     outer = document.createElement('span')
     inner = document.createElement('span')
     outer.id = img.id
     outer.title = img.title
     outer.className = img.className
     outer.style.backgroundImage = img.currentStyle.backgroundImage
     outer.style.borderWidth = img.currentStyle.borderWidth
     outer.style.borderStyle = img.currentStyle.borderStyle
     outer.style.borderColor = img.currentStyle.borderColor
     outer.style.display = 'inline-block'
     outer.style.fontSize = '0'
     outer.style.verticalAlign = 'middle'
     if (img.parentElement.href) outer.style.cursor = 'hand'
     inner.style.width = '1px'
     inner.style.height = '1px'
     inner.style.display = 'inline-block'
     inner.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
     outer.appendChild(inner)
     img.parentNode.replaceChild(outer, img)
     i--
  }
 }
}

if (wgCanonicalNamespace != 'Special')
   window.attachEvent('onload', PngFix)