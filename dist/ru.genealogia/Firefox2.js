if (window.$j) addOnloadHook(function(){
 var tbox = $j('#wpTextbox1')
 if (tbox.length==0) return
 var unsp = tbox.attr('defaultValue').match(/\xA0/g)
 if (!unsp || unsp.length<=1 || /\xA0/.test(tbox.val())) return
 $j('<div id=warning-firefox2 />')
 .prependTo('#editform')
 .load(wgScript+'?action=render&title=MediaWiki:Firefox2'
  +(wgUserLanguage!='ru' ? '/en' : ''))[0].scrollIntoView()
})