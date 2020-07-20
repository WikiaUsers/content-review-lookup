function searchPage() {
 var searchEngines = {
  'Внутренний поиск': false,
  'Wikiwix': 'http://ru.wikiwix.com/?action=%s&disp=article',
  'Google': 'http://www.google.com/custom?q=%s&hl=ru&domains=ru.wikipedia.org&sitesearch=ru.wikipedia.org',
  'Yahoo': 'http://search.yahoo.com/search?p=%s&vs=ru.wikipedia.org',
  'Яндекс': 'http://yandex.ru/yandsearch?text=%s&site=ru.wikipedia.org&site_manually=true&ras=1'
  }
 createOption = function(site, engine) {
   var opt = document.createElement('option')
   opt.appendChild(document.createTextNode(site))
   opt.value = site
   return opt
 }
 var searchForm = document.forms['search'] || document.forms['powersearch']
 if (searchForm.fulltext) searchForm.fulltext.value = 'Найти'
 submit = function() {
   var optSelected = searchEngines[document.getElementById('searchEngine').value]
   if (optSelected) {
     searchInput = document.getElementById('searchText') || document.getElementById('powerSearchText')
     window.location = optSelected.replace(/%s/g, encodeURIComponent(searchInput.value))
     return false
   }
 }
 if (navigator.appName == 'Microsoft Internet Explorer') addHandler(searchForm, 'submit', submit)
 else searchForm.onsubmit = submit
 var selectBox = document.createElement('select')
 selectBox.id = 'searchEngine'
 for (var se in searchEngines)
    selectBox.appendChild(createOption(se, searchEngines[se]))
 searchInput = document.getElementById('searchText') || document.getElementById('powerSearchText')
 searchInput.parentNode.insertBefore(selectBox, searchInput.nextSibling)
}

addOnloadHook(searchPage)