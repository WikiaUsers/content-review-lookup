/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
function addWikifButton(){
 var toolbar = document.getElementById('toolbar')
 var textbox = document.getElementById('wpTextbox1')
 if (!textbox || !toolbar) return
 var i = document.createElement('img')
 i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
 i.alt = i.title = 'Викификатор'
 i.onclick = Wikify
 i.style.cursor = 'pointer'
 toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit'){
 document.write('<script type="text/javascript" src="http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript"><\/script>')
 addOnloadHook(addWikifButton)
}
//See http://ru.wikipedia.org/wiki/project:code

importScript_ = importScript
importScript = function (page, proj){
 if (!proj) importScript_(page)
 else {
   if (proj.indexOf('.')==-1) proj += '.wikipedia.org'
   importScriptURI('http://'+proj+'/w/index.php?action=raw&ctype=text/javascript&title='+encodeURIComponent(page.replace(/ /g,'_')))
 }
}


function LinkFA(){
 var pLang = document.getElementById('p-lang')
 if (!pLang) return
 var iw = pLang.getElementsByTagName('li')
 for (var i=0; i < iw.length; i++)
   if (document.getElementById(iw[i].className+'-fa')){
     iw[i].className += ' FA'
     iw[i].title = 'Эта статья является избранной в другом языковом разделе'
   }else if (document.getElementById(iw[i].className+'-fl')){
     iw[i].className += ' FL'
     iw[i].title = 'Этот список или портал является избранным в другом языковом разделе'
   }else if (document.getElementById(iw[i].className+'-ga')){
     iw[i].className += ' GA'
     iw[i].title = 'Эта статья является хорошей в другом языковом разделе'
   }
}


function icqIcons(){
 var a, spans = document.getElementById('content').getElementsByTagName('span')
 for (var i=0; a=spans[i]; i++)
   if (a.className == 'ICQ') 
     a.style.backgroundImage = "url('http://status.icq.com/online.gif?icq="+a.id+"&img=5&randseed="+Math.floor(Math.random()*10000000)+"')"
}


function newSectionLink(){
 var plus = document.getElementById('ca-addsection')
 if (!plus) return
 var custom = document.getElementById('add-custom-section')
 if (!custom) return
 plus.firstChild.setAttribute('href', custom.getElementsByTagName('a')[0].href)
}


function editZeroSection(){
 var body = document.getElementById('bodyContent')
 if (!body) return
 var h2s = body.getElementsByTagName('H2')
 var h2 = h2s[0]
 if (!h2) return
 if (h2.parentNode.id == 'toctitle') h2 = h2s[1]
 if (!h2) return
 var span = h2.firstChild
 if (!span || span.className != 'editsection') return
 var zero = span.cloneNode(true)
 body.insertBefore(zero, body.firstChild)
 var a = zero.getElementsByTagName('a')[0]
 if (a.href.indexOf('&section=T') == -1 )  a.title = a.title.replace(/:.*$/,': 0')
 else a.title = 'Править секцию: 0'
 a.setAttribute('href', wgScript + '?title='+encodeURIComponent(wgPageName) + '&action=edit&section=0')
}


function mainPage(){
 if (wgArticleId == 23 || wgArticleId == 4401){
  var li = addPortletLink('p-lang', wgArticlePath.replace(/\$1/, 'Википедия:Список_Википедий'), 'Полный список', 'interwiki-completelist')
  if (li) li.style.fontWeight = 'bold'
  var nstab = document.getElementById('ca-nstab-main') || document.getElementById('ca-current')
  if (nstab && wgUserLanguage == 'ru')  nstab.firstChild.firstChild.nodeValue = 'Заглавная'
 }
}




if (wgUserGroups)
for (var i=0; i<wgUserGroups.length; i++) switch (wgUserGroups[i]){
 case 'autoconfirmed': importStylesheet('MediaWiki:Gadget-FlaggedRevs.css'); break
 case 'sysop': importScript_('MediaWiki:Sysop.js'); break
}


// ВП:СО, кроме статей  В Контакте, Одноклассники и Facebook
if (wgArticleId!=639373 && wgArticleId!=932117 && wgArticleId!=1297302 && wgArticleId!=25133866)
 importScript_('MediaWiki:Wikibugs.js')

// ВП:Инкубатор
if (wgArticleId == 2169956 || /^Википедия:Мастер\sстатей.+$/.test(wgPageName))
 importScript_('MediaWiki:Incubator.js')

// iwiki sorting
 if (!wgUserName
     || (wgUserName
         && (((typeof wgLangPrefs == 'undefined') ? false : true)
             || ((typeof wgAddLangHints == 'undefined') ? false : wgAddLangHints)
             || ((typeof wgUseUserLanguage == 'undefined') ? false : wgUseUserLanguage))))
     importScript_('MediaWiki:Interwiki-links.js');

// ВП:Выборы арбитров/Весна 2010/Голосование
if (wgArticleId == 2486335) addOnloadHook(voting10)

/* Указанный здесь JavaScript будет загружен всем участникам, использующим тему оформления MonoBook  */
NavigationBarShowDefault = 2 //максимальное количество автосворачиваемых блоков 
 //(div'ы и таблицы считаются отдельно), после которого они будут изначально свёрнуты
var NavigationBarHide = '[скрыть]' //ссылка-переключатель на развёрнутом блоке
var NavigationBarShow = '[показать]' //ссылка-переключатель на свёрнутом блоке