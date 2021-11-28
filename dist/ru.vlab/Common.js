importScript_ = importScript
importScript = function (page, proj){
 if (!proj) importScript_(page)
 else {
   if (proj.indexOf('.')==-1) proj += '.wikipedia.org'
   importScriptURI('http://'+proj+'/w/index.php?action=raw&ctype=text/javascript&title='+encodeURIComponent(page.replace(/ /g,'_')))
 }
}

addLoadEvent = addOnloadHook 


function ts_parseFloat(n){
 if (!n) return 0
 n = parseFloat(n.replace(/\./g, '').replace(/,/, '.'))
 return (isNaN(n) ? 0 : n)
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
 a.setAttribute('href', wgScript + '?title='+wgPageName + '&action=edit&section=0')
}

importScript("MediaWiki:LanguageSelection.js");

//Collapsiblе: [[ВП:СБ]]

var NavigationBarShowDefault = 2
var NavigationBarHide = '[скрыть]'
var NavigationBarShow = '[показать]'

var hasClass = (function (){
 var reCache = {}
 return function (element, className){
   return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className)
  }
})()

function collapsibleTables(){
 var Table, HRow,  HCell, btn, a, tblIdx = 0, colTables = []
 var allTables = document.getElementsByTagName('table')
 for (var i=0; Table = allTables[i]; i++){
   if (!hasClass(Table, 'collapsible')) continue
   if (!(HRow=Table.rows[0])) continue
   if (!(HCell=HRow.getElementsByTagName('th')[0])) continue
   Table.id = 'collapsibleTable' + tblIdx
   btn = document.createElement('span')
   btn.style.cssText = 'float:right; font-weight:normal; font-size:smaller'
   a = document.createElement('a')
   a.id = 'collapseButton' + tblIdx
   a.href = 'javascript:collapseTable(' + tblIdx + ');' 
   a.style.color = HCell.style.color
   a.appendChild(document.createTextNode(NavigationBarHide))
   btn.appendChild(a)
   HCell.insertBefore(btn, HCell.childNodes[0])
   colTables[tblIdx++] = Table
 }
 for (var i=0; i < tblIdx; i++)
   if ((tblIdx > NavigationBarShowDefault && hasClass(colTables[i], 'autocollapse')) || hasClass(colTables[i], 'collapsed'))
     collapseTable(i)
}

function collapseTable (idx){
 var Table = document.getElementById('collapsibleTable' + idx)
 var btn = document.getElementById('collapseButton' + idx)
 if (!Table || !btn) return false
 var Rows = Table.rows
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ?  NavigationBarShow : NavigationBarHide
 var disp = isShown ? 'none' : Rows[0].style.display
 for (var i=1; i < Rows.length; i++) 
    Rows[i].style.display = disp
}

function collapsibleDivs(){
 var navIdx = 0, colNavs = [], i, NavFrame
 var divs = document.getElementById('content')
  if(divs == null) return
 divs = divs.getElementsByTagName('div')
  if(divs == null) return

 for (i=0; NavFrame = divs[i]; i++) {
   if (!hasClass(NavFrame, 'NavFrame')) continue
   NavFrame.id = 'NavFrame' + navIdx
   var a = document.createElement('a')
   a.className = 'NavToggle'
   a.id = 'NavToggle' + navIdx
   a.href = 'javascript:collapseDiv(' + navIdx + ');'
   a.appendChild(document.createTextNode(NavigationBarHide))
   for (var j=0; j < NavFrame.childNodes.length; j++)
     if (hasClass(NavFrame.childNodes[j], 'NavHead'))
       NavFrame.childNodes[j].appendChild(a)
   colNavs[navIdx++] = NavFrame
 }
 for (i=0; i < navIdx; i++)
  if ((navIdx > NavigationBarShowDefault && !hasClass(colNavs[i], 'expanded')) || hasClass(colNavs[i], 'collapsed'))
     collapseDiv(i)
}

function collapseDiv(idx) {
 var div = document.getElementById('NavFrame' + idx)
 var btn = document.getElementById('NavToggle' + idx)
 if (!div || !btn) return false
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ? NavigationBarShow : NavigationBarHide 
 var disp = isShown ? 'none' : 'block'
 for (var child = div.firstChild;  child != null;  child = child.nextSibling)
   if (hasClass(child, 'NavPic') || hasClass(child, 'NavContent')) 
      child.style.display = disp
}


function voting9(){
 if (votingTrigger = document.getElementById('voting-trigger'))
  importScriptURI(wgServer+wgScript
   +'?title=MediaWiki:Voting9.js&action=raw&ctype=text/javascript&cversion='
   +encodeURIComponent(votingTrigger.innerHTML.replace(/\D+/g, '.')))
}

//Execution
if (wgCanonicalNamespace == 'Special'){
  switch (wgCanonicalSpecialPageName){
   case 'Upload': importScript('MediaWiki:Upload.js'); break
   case 'Search': importScript('MediaWiki:Search.js'); break
  }
}else if (wgAction != 'history'){
  addOnloadHook(editZeroSection)
  addOnloadHook(collapsibleDivs)
  addOnloadHook(collapsibleTables)
  if (navigator.appName=='Microsoft Internet Explorer' && document.createStyleSheet)
    document.createStyleSheet().addRule('.IPA', 'font-family: "Doulos SIL", "Charis SIL", Gentium, "DejaVu Sans", Code2000, "TITUS Cyberbit Basic", "Arial Unicode MS", "Lucida Sans Unicode", "Chrysanthi Unicode";')
  if (wgNamespaceNumber == 0)
  { }
  else
  {
    addOnloadHook(newSectionLink)
  }
  if (wgAction=='edit' || wgAction=='submit') importScript('MediaWiki:Editpage.js')
  addOnloadHook(voting9)
}

    addOnloadHook(function() {
        if(!($('ol.references').size())) return;
        $('ol.references').before($('<a href="#">[показать примечания]</a>').click(function(e){e.preventDefault(); $('ol.references').toggle()})).hide()
        $('.reference a').live('click', function(e) { 
            e.preventDefault();
            var x = $(this), iscurrent = x.hasClass('curreference'), i = $('.tooltip').hide(250)
            $('.curreference').removeClass('curreference'); 
            if (iscurrent) return;
            var par = x.parent(), o = par.offset(), l = o.left, t = o.top+13
            var b = $('body'), mh = b.height(), mw = b.width()
            var c=$(x.attr('href')).clone().find('a:first').remove().end().html()
 
            x.addClass('areference').addClass('curreference') 
            if (!i.size()) i = $('<span />').addClass('tooltip')
            i.insertAfter(par).empty().append(' ('+c+')').show(250)
            i.css('color','grey')
        });
        $(window).click(function(e) {
            if (!($(e.target).hasClass('areference') || $(e.target).parents().andSelf().hasClass('tooltip'))) {
                $('.tooltip').hide(250); $('.curreference').removeClass('curreference')
            }
        });
    });