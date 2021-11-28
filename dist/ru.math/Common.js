/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

//<pre>

//hasClass, from en.wp
var hasClass = (function (){
 var reCache = {}
 return function (element, className){
     return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
  }
})()


//Collapsible tables, [[Wikipedia:Wikipedia:Collapsible tables]]
 
var autoCollapse = 2
var collapseCaption = 'скрыть'
var expandCaption = 'показать'

function collapseTable (tableIndex){
 var Table = document.getElementById('collapsibleTable' + tableIndex)
 var btn = document.getElementById('collapseButton' + tableIndex)
 if (!Table || !btn) return false
 var style, Rows = Table.rows
 if (btn.firstChild.data == collapseCaption) {
   btn.firstChild.data = expandCaption
   style = 'none'
 }else{
   btn.firstChild.data = collapseCaption
   style = Rows[0].style.display
 }
 for (var i=1; i < Rows.length; i++) 
    Rows[i].style.display = style
}
 
function createCollapseButtons(){
 var HRow, THs, Header, btn, a
 var tableIndex = 0, NavBoxes = []
 var Tables = document.getElementsByTagName('table')
 for (var i=0; i < Tables.length; i++ ){
   if (!hasClass(Tables[i], 'collapsible')) continue
   if (!(HRow = Tables[i].rows[0])) continue
   THs = HRow.getElementsByTagName('th') 
   if (THs.length == 0) continue
   Header = THs[THs.length-1] //last TH, not 1st like in en.wp
   Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex)
   btn = document.createElement('span')
   btn.style.styleFloat = 'right'
   btn.style.cssFloat = 'right'
   btn.style.fontWeight = 'normal'
   btn.style.textAlign = 'right'
   btn.style.width = '6em'
   a = document.createElement('a')
   a.id = 'collapseButton' + tableIndex
   a.href = 'javascript:collapseTable(' + tableIndex + ');' 
   a.appendChild(document.createTextNode(collapseCaption))
   btn.appendChild(document.createTextNode('['))
   btn.appendChild(a)
   btn.appendChild(document.createTextNode(']'))
   Header.insertBefore(btn, Header.childNodes[0])
   NavBoxes[tableIndex++] = Tables[i]
 }
 for (var i=0; i < tableIndex; i++)
   if (hasClass(NavBoxes[i], 'collapsed') || (tableIndex >= autoCollapse && hasClass(NavBoxes[i], 'autocollapse')))
      collapseTable(i)
}
 
 
 
//Collapsible divs, [[:en:Wikipedia:NavFrame]]
 
var NavigationBarHide = '[' + collapseCaption + ']'
var NavigationBarShow = '[' + expandCaption + ']'
// set up max count of Navigation Bars on page, if there are more, all will be hidden
var NavigationBarShowDefault = autoCollapse
 
// shows and hides content and picture (if available) of navigation bars
function toggleNavigationBar(indexNavigationBar)  {
 var NavToggle = document.getElementById('NavToggle' + indexNavigationBar);
 var NavFrame = document.getElementById('NavFrame' + indexNavigationBar);
 if (!NavFrame || !NavToggle) return false
 // if shown now
 if (NavToggle.firstChild.data == NavigationBarHide) {
    for (var NavChild = NavFrame.firstChild;  NavChild != null;  NavChild = NavChild.nextSibling)
      if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) 
          NavChild.style.display = 'none'
    NavToggle.firstChild.data = NavigationBarShow
 // if hidden now
 } else if (NavToggle.firstChild.data == NavigationBarShow) {
     for (var NavChild = NavFrame.firstChild;  NavChild != null; NavChild = NavChild.nextSibling)
        if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) 
                 NavChild.style.display = 'block'
     NavToggle.firstChild.data = NavigationBarHide
 }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton(){
 var indexNavigationBar = 0
 // iterate over all < div >-elements 
 var divs = document.getElementsByTagName('div');
 for (var i=0; NavFrame = divs[i]; i++) {
     // if found a navigation bar
     if (hasClass(NavFrame, 'NavFrame')) {
         indexNavigationBar++
         var NavToggle = document.createElement('a')
         NavToggle.className = 'NavToggle'
         NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar)
         NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');')
         var NavToggleText = document.createTextNode(NavigationBarHide)
         NavToggle.appendChild(NavToggleText)
         // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
         for(var j=0; j < NavFrame.childNodes.length; j++)
            if (hasClass(NavFrame.childNodes[j], 'NavHead'))
                NavFrame.childNodes[j].appendChild(NavToggle)
         NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
     }
 }
 // if more Navigation Bars found than Default: hide all
 if (NavigationBarShowDefault < indexNavigationBar) 
   for (var i=1; i<=indexNavigationBar; i++) 
       toggleNavigationBar(i)
}


// Загрузка функция на нормальных страницах.. ну и всех которые не история правок
addOnloadHook(createNavigationBarToggleButton);
addOnloadHook(createCollapseButtons);

// </pre>