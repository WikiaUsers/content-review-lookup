$(function(){
  var el = addPortletLink('p-lang', wgArticlePath.replace(/\$1/, 'Википедия:Список_Википедий'), 'Полный список', 'interwiki-completelist')
  if( el ) el.style.fontWeight = 'bold'
})