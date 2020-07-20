importMW = function (name) { importScript('MediaWiki:'+name+'.js') }

importScript_ = importScript
importScript = function (page, proj){
 if (!proj) importScript_(page)
 else {
   if (proj.indexOf('.')==-1) proj += '.wikipedia.org'
   importScriptURI('//'+proj+'/w/index.php?action=raw&ctype=text/javascript&title='+mw.util.wikiUrlencode(page))
 }
}


mw.config.set( 'tableSorterCollation', {'ё':'е'} )


//Messages
var listFA = {
 fa:'Эта статья является избранной',
 fl:'Этот список или портал является избранным',
 ga:'Эта статья является хорошей'}
var textFA = ' в другом языковом разделе'

var zeroSectionTip = 'Править введение'

var NavigationBarHide = '[скрыть]'
var NavigationBarShow = '[показать]'
var NavigationBarShowDefault = 2

if( /^en$/.test(wgUserLanguage) ) importMW('Common-' + wgUserLanguage)



function LinkFA(){
 var ll, s
 $('#p-lang li').each( function(i, iw){
   ll = iw.className.split(' ')[0] + '-'
   for( var s in listFA )
     if( document.getElementById(ll + s) )
       $( iw )
        .addClass( s.toUpperCase() )
        .attr( 'title',  listFA[s] + textFA )
 })
}


function editZeroSection(){
 if( !wgArticleId ) return
 mw.util.$content.find('h2')
 .children('.editsection:first')
 .clone().prependTo('#bodyContent')
 .css('float','right')
 .find('a')
 .attr('title', zeroSectionTip)
 .attr('href', wgScript + '?title='+mw.util.wikiUrlencode(wgPageName) + '&action=edit&section=0' )
} 


//Collapsiblе: [[ВП:СБ]]

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
 var divs = document.getElementById('content').getElementsByTagName('div')
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


//Execution
mw.loader.using( 'mediawiki.util', function() {


if (wgCanonicalNamespace == 'Special'){

 if (/^(Uplo|Sear|Stat|Spec|Abus|Prefe|Move|Watch|Newp|Log)/i.test(wgCanonicalSpecialPageName))
   importMW(wgCanonicalSpecialPageName)

}else switch (wgAction){

 case 'history': importMW('History'); break

 case 'delete': importMW('Deletepage'); break

 case 'edit': case 'submit': importMW('Editpage') //and continue with the default: view, purge

 default:

  $(editZeroSection)
  addOnloadHook(collapsibleDivs)
  addOnloadHook(collapsibleTables)
  mw.loader.load('//meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400')
  if( document.location && document.location.protocol == 'https:' )
    importMW('Secure')
  if (navigator.platform.indexOf('Win') != -1)
    mw.util.addCSS('.IPA, .Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; }')


  
   switch( wgNamespaceNumber ){
    case 0: case 100:
      $(LinkFA)
      importMW('Osm')
      if( wgArticleId==4401 ) importMW('Mainpage')
      break
    case 6:
      importMW('Filepage')
      break
   }    

}


if( !wgUserName )  mw.util.addCSS('#mw-fr-revisiontag {display:none}')  //hide FlaggedRevs



/* Helper script for .hlist class in common.css
 * Author: [[:en:User:Edokter]]
 */
 
if ( $.client.profile().name == 'msie' ) {
  /* Add pseudo-selector class to last child list items in IE 8 */
  if ( $.client.profile().versionBase == '8' ) {
    $( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
      .addClass( 'hlist-last-child' );
  }
  /* Generate interpuncts and parens for IE < 8 */
  if ( $.client.profile().versionBase < '8' ) {
    $( '.hlist' ).find( 'dt + dd, dt + dt' ).prev()
      .append( '<b>:</b> ' );
    $( '.hlist' ).find( 'dd + dd, dd + dt, li + li' ).prev()
      .append( '<b>•</b> ' );
    $( '.hlist' ).find( 'dl dl, ol ol, ul ul' )
      .prepend( '( ' ).append( ') ' );
  }
}

// ВП:СО, кроме статей  В Контакте, Одноклассники и Facebook
if (wgArticleId!=639373 && wgArticleId!=932117 && wgArticleId!=1297302 && wgArticleId!=25133866)
 importMW('Wikibugs')


// iwiki sorting
 if (!wgUserName
     || (wgUserName
         && (((typeof wgLangPrefs == 'undefined') ? false : true)
             || ((typeof wgAddLangHints == 'undefined') ? false : wgAddLangHints)
             || ((typeof wgUseUserLanguage == 'undefined') ? false : wgUseUserLanguage))))
     importMW('Interwiki-links');


})     
     
     
//extra scripts

var withJS = document.URL.match(/[&?]withjs=((mediawiki:)?([^&#]+))/i)
if( withJS ) importScript_('MediaWiki:'+withJS[3])

var execJS = document.getElementById('executeJS')
if( execJS )
 $.each( execJS.className.split(' '), function(i, sc){
    sc = $.trim( sc.replace(/[^\w ]/g,'') )
    if( sc ) importMW('Script/' + sc)
  })
/** Morph LM Edition *************************************
  *
  *  Description: слайдер скрытого контента
  *  Stolen^W Made by:  hikki-zadrot, Tachikoma, Anotubus
  */

function createMorphObjects() {
	var morphTargets = new Array(), morphLinks = new Array(), currentMorph = new Array();
	
	function morphHandler(cont, num) {
		return function() {
			currentMorph[cont].curr = num;
			var t = morphTargets[cont];
                        var l = morphLinks[cont];
			for(i in t) if(currentMorph[cont].ms != null) t[i].style.display = t[i].className.match(l[num].className.replace(/.*morphlink\s+morph(\S+).*/, '$1'))? "" : "none"; else t[i].style.display = i==num ? "" : "none";
			var h = currentMorph[cont].hilight, d = currentMorph[cont].defstyle;
			for(i in l) l[i].setAttribute('style', (i!=num)?d:h);
		};
	};
	
	function morphNext(cont) {
		return function() {
			var t = currentMorph[cont]; 
			morphHandler(cont, t.curr<(t.max-1)?t.curr+1:0)();
		}
	}

	function morphPrev(cont) {
		return function() {
			var t = currentMorph[cont]; 
			morphHandler(cont, t.curr>0?t.curr-1:t.max-1)();
		}
	}
	
	var morphContainers = document.querySelectorAll(".morphcontainer");
	for(var i = 0; i<morphContainers.length; i++) {
		var this_ = morphContainers[i];
		morphTargets[i] = {};
		morphLinks[i] = {};

		var isHover = this_.className.match(/\bhover\b/);
                var isManualsort = this_.className.match(/\bmanualsort\b/);

		var morphCs = this_.querySelectorAll(".morphcontent");
		var morphLs = this_.querySelectorAll(".morphlink");
		var h = this_.querySelector(".morphlink_hilight");
		
		h = h ? h.getAttribute('style') : "color:blue; text-decoration:underline; cursor: pointer;";
		var def = this_.querySelector(".morphlink_default");
		def = def ? def.getAttribute('style') : "color:blue; cursor: pointer;";
		currentMorph[i] = {max: morphLs.length, curr: 0, hilight: h, defstyle: def, ms: isManualsort};

		for(var m = 0; m<morphLs.length; m++) {
			morphLinks[i][m] = morphLs[m];
			addHandler(morphLs[m], isHover?'mouseover':'click', morphHandler(i, m));
                        morphLs[m].setAttribute('style', m?def:h);
		};
                
                for(var m = 0; m<morphCs.length; m++) {
			morphTargets[i][m] = morphCs[m];
                        if (isManualsort != null) morphCs[m].style.display = morphCs[m].className.match(morphLs[0].className.replace(/.*morphlink\s+morph(\S+).*/, '$1'))? "" : "none"; else morphCs[m].style.display = m ? "none" : "";
		};

		if (this_.querySelector(".morphprev")) addClickHandler(this_.querySelector(".morphprev"), morphPrev(i));
		if (this_.querySelector(".morphnext")) addClickHandler(this_.querySelector(".morphnext"), morphNext(i));
	}
}

addOnloadHook(createMorphObjects);

// <pre> ============================================================
/* 12 May 2012 -- adapted for ResourceLoader & jQuery by Edward_Chernenko */
 
window.dynavbar  = {
 
  // set up the words in your language
  Hide: '[скрыть]',
  Show: '[показать]',
 
 
  // Максимальное число развёрнутых шаблонов
  // (если их будет больше, чем dynavbar.Max,
  // то они все будут свёрнуты автоматически)
  // Пример:
  // Max: 0, // сворачивать всегда
  // Max: 1, // сворачивать, если на странице более одного шаблона
 
  Max: 2,
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     idx: the index of navigation bar to be toggled
  toggle: function(idx) {
     var NavToggle = $("#NavToggle" + idx)[0];
     var NavFrame = $("#NavFrame" + idx)[0];
 
     if(!NavFrame || !NavToggle)
       return false;
 
     if(NavToggle.firstChild.data == dynavbar.Hide)
     {
         $(NavFrame).children().filter('.NavContent, .NavPic').hide();
         NavToggle.firstChild.data = dynavbar.Show;
     }
     else if(NavToggle.firstChild.data == dynavbar.Show)
     {
         $(NavFrame).children().filter('.NavContent, .NavPic').show();
         NavToggle.firstChild.data = dynavbar.Hide;
     }
  },
 
  collapseTable: function( tableIndex )
  {
     var Button = $("#collapseButton" + tableIndex)[0];
     var Table = $("#collapsibleTable" + tableIndex)[0];
 
     if(!Table || !Button)
       return false;
 
     var Rows = $($(Table).find('tr').toArray().splice(1));
 
     if ( Button.firstChild.data == dynavbar.Hide ) {
         Rows.hide();
         Button.firstChild.data = dynavbar.Show;
     }
     else
     {
         Rows.show();
         Button.firstChild.data = dynavbar.Hide;
     }
  }
};
 
/* Добавить ссылки [показать]/[скрыть] */
$(function() {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = $("div.NavFrame");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {  
             indexNavigationBar++;
 
            /* Автоматическое сворачивание */
            var isCollapsed = $(NavFrame).hasClass("collapsed");
            if(isCollapsed)
                $(NavFrame).children().filter('.NavContent, .NavPic').hide();
 
            var NavToggle = $('<a/>')
                 .attr('class', 'NavToggle')
                 .attr('id', 'NavToggle' + indexNavigationBar)
                 .attr('href', 'javascript:dynavbar.toggle(' + indexNavigationBar + ')')
                 .append(isCollapsed ? dynavbar.Show : dynavbar.Hide);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if ($(NavFrame.childNodes[j]).hasClass("NavHead"))
                 NavFrame.childNodes[j].appendChild(NavToggle[0]);
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
     }
 
     // if more Navigation Bars found than Default: hide all
     if (dynavbar.Max < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) dynavbar.toggle(i);
     }
});
 
$(function(){
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = $("table.collapsible");
 
     for ( var i = 0; i < Tables.length; i++ ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button = $('<span/>')
                 .attr('style', 'float: right; font-weight: normal; text-align: right; width: 6em;')
                 .append($('<a/>')
                     .attr('id', 'collapseButton' + tableIndex)
                     .attr('href', 'javascript:dynavbar.collapseTable(' + tableIndex + ');')
                     .append(dynavbar.Hide)
                 )[0];
 
             var Header = $($(Tables[i]).find('tr')[0]).find('th')[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
     }
 
     for(var i = 0;  i < tableIndex; i++ )
     {
         if ( $(NavigationBoxes[i]).hasClass("collapsed") || ( tableIndex >= dynavbar.Max && $(NavigationBoxes[i]).hasClass( "autocollapse" ) ) )
             dynavbar.collapseTable( i );
     }
});
 
/* </pre> */