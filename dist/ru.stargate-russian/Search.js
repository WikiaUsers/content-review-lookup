$(function () {

 //remove [[MediaWiki:Searchmenu-new]] if searching with "prefix:" (usually in talk archives)
 var cL = $('.mw-search-createlink')
 if( / prefix:/.test( cL.find('a:first').text() ) )
    cL.after('<br />').remove()

 //external Search Engines
 var list = {
  'Внутренний поиск': '',
  'Wikiwix': 'ru.wikiwix.com/?action=!&disp=article',
  'Google': 'google.com/search?q=!+site:ru.wikipedia.org&hl=ru',
  'Yahoo': 'search.yahoo.com/search?p=!&vs=ru.wikipedia.org',
  'Яндекс': 'yandex.ru/yandsearch?text=!&site=ru.wikipedia.org'
  }

  var sel = ''
  for( var nm in list )
    sel += '<option value="' + list[nm] + '">' + nm + '</option>'
  
  var frm = $('#search, #powersearch').eq(0), 
      inp = frm.find('input[name=search]')
  
  $( '<select id=searchEngines>' + sel + '</select>' ).insertAfter( inp )
  
  frm.submit(function(e){
    var site = $('#searchEngines').val()
    if( !site ) return true
    e.preventDefault()
    window.location = 'http://' + site.replace(/!/, encodeURIComponent( inp.val() ) )
    return false
  })
 
})