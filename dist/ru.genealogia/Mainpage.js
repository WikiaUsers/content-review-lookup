addOnloadHook(function(){
  var el = addPortletLink('p-lang', wgArticlePath.replace(/\$1/, 'Википедия:Список_Википедий'), 'Полный список', 'interwiki-completelist')
  if (el) el.style.fontWeight = 'bold'
  el = document.getElementById('ca-nstab-main') || document.getElementById('ca-current')
  if (el && wgUserLanguage == 'ru'){
    while (el.firstChild) el = el.firstChild
    el.nodeValue = 'Заглавная' 
  }
})

appendCSS('#t-cite, #catlinks, #lastmod, #footer-info-lastmod {display:none}')

appendCSS('.globegris {background:\
url(http://upload.wikimedia.org/wikipedia/commons/1/10/Wikipedia-logo-v2-200px-transparent.png)}')