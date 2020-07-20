  /*Wrapper around addOnloadHook() for backwards compatibility.  */
 function addLoadEvent( f ) { addOnloadHook( f ); }

 /* Чтоб была возможность изменить поведение кнопки "+" (добавление новой темы) для страниц обсуждения  */ 
 addOnloadHook(function(){
  var plus = document.getElementById('ca-addsection');
  if (!plus) return;
  var custom = document.getElementById('add-custom-section');
  if (!custom) return;
  plus.firstChild.setAttribute('href', custom.getElementsByTagName('A')[0].href);
 })

 /** Import module 
  *  Description: Includes a raw wiki page as javascript 
  */
 
 function importScript(page, lang) {
   var url = '/index.php?title='
    + encodeURIComponent(page.replace(' ','_'))
    + '&action=raw&ctype=text/javascript&dontcountme=s';
   if (lang) url = 'http://' + lang + '.wikipedia.org/w/' + url;
   var s = document.createElement('script');
   s.src = url;
   s.type = 'text/javascript';
   document.getElementsByTagName('head')[0].appendChild(s);
 }

 /** Internet Explorer bug fix **************************************************
  */
 
 if (window.showModalDialog && document.compatMode && document.compatMode == "CSS1Compat")
 {
   var oldWidth;
   var docEl = document.documentElement;
 
   function fixIEScroll()
   {
     if (!oldWidth || docEl.clientWidth > oldWidth)
       doFixIEScroll();
     else
       setTimeout(doFixIEScroll, 1);
   
     oldWidth = docEl.clientWidth;
   }
 
   function doFixIEScroll() {
     docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
   }
 
   document.attachEvent("onreadystatechange", fixIEScroll);
   attachEvent("onresize", fixIEScroll);
 }

 /** Tooltips and access keys ***************************************************
  */
 ta = new Object();
 ta["t-print"] = new Array("","Версия без кнопок, пригодная для распечатки");
 ta["t-permalink"]           = new Array("","Ссылка на текущую версию этой статьи");

 /** Interwiki links to featured articles ***************************************
  *
  *  Описание: Ставит звёздочки для избранных иноязычных статей, а заодно и даёт картинку для статуса ICQ
  */
 
 function LinkFA() 
 {
   // iterate over all span-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a ICQ span
      if(a.className == "ICQ") {
            a.style.padding = "0 0 0 20px";
            a.style.backgroundImage = "url('http://status.icq.com/online.gif?icq="+a.id+"&img=5')";
            a.style.backgroundRepeat = "no-repeat";
      }
      // if found a Jabber span
      if(a.className == "Jabber") {
            a.style.padding = "0 0 0 20px";
            a.style.backgroundImage = "url('http://jabber.autocom.pl/estatus.php?jid="+a.id+"&iconset=c1&type=image')";
            a.style.backgroundRepeat = "no-repeat";
      }
      // if found a FA span
      if(a.className == "FA") {
         // iterate over all li-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a FA link
            if(b.className == "interwiki-" + a.id) {
                b.className += " FA"
                b.title = "Эта статья является избранной в другом языковом разделе.";               
            }
         }
      }
   }
 }
 
 addOnloadHook( LinkFA );

 /* hasClass from en-wiki */
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[Wikipedia:User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "скрыть";
 var expandCaption = " показать";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  }
  
  addOnloadHook( createNavigationBarToggleButton );

 /** Делаем ссылку "править" для нулевой секции *****************************************<nowiki>
 */
 var disable_zero_section = 0;
 function edit_zero_section()
 {
   var  body = document.getElementById ('bodyContent');
 
   if (disable_zero_section != 1 && body.innerHTML.match ('class="editsection"')) {
     var  title = document.title.substr (0, document.title.lastIndexOf (' - '));
 
     if (typeof encodeURIComponent == 'function')
       title = encodeURIComponent (title);
 
     body.innerHTML = '<div class="editsection" id="ca-edit-0">[<a href="/index.php?title=' + title + '&amp;action=edit&amp;section=0">править</a>]</div>' + body.innerHTML;
   }
 }
 
 addOnloadHook(edit_zero_section);

 /*</nowiki>*/

 /** Расширенный поиск *****************************************<nowiki>
 ** Автор: ru:User:Не А
 */
 function SpecialSearchEnhanced() 
 {
    var mainNode = document.getElementsByTagName("form");
    if (!mainNode) return;
    
    var searchValue = document.forms[0].search.value
	var safeSearchValue = searchValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    var firstForm = mainNode[0];

    var node = document.createElement('div');
    
    var googleSearch  = '<form action="http://www.google.com/custom" method="get" name="google" target="_blank" id="google">';
    googleSearch += '<input type="hidden" name="hl" value="ru" />';
    googleSearch += '<input type="hidden" name="domains" value="ru.lgbt.wikia.com" />';
    googleSearch += '<input type="hidden" name="q" maxlength="2048" value="' + safeSearchValue + '" />'
    googleSearch += '<input type="hidden" name="sitesearch" value="ru.lgbt.wikia.com" />'
    googleSearch += '<input type="button" value="Google по Вики" onclick="document.google.q.value = document.forms[0].search.value; this.form.submit();" style="width: 12em;" />'
    googleSearch += '</form>'
    
    var yandexSearch  = '<form action="http://www.yandex.ru/yandsearch" method="get" name="yandex" target="_blank" id="yandex">';
    yandexSearch += '<input type="hidden" name="text" maxlength="300" value="' + safeSearchValue + '" />';
    yandexSearch += '<input type="hidden" name="site" value="ru.lgbt.wikia.com" />';
    yandexSearch += '<input type="hidden" name="ras" value="1" />'
    yandexSearch += '<input type="hidden" name="site_manually"  value="true" />'
    yandexSearch += '<input type="hidden" name="server_name" value="Википедия" />'
    yandexSearch += '<input type="button" value="Яндекс по Вики"  onclick="document.yandex.text.value = document.forms[0].search.value; this.form.submit();" style="width: 12em;" />'
    yandexSearch += '</form>'

    node.innerHTML = node.innerHTML + '<table style="margin-left: 75%;  padding-left:4px;"><tr><td>' + yandexSearch + '</td></tr><tr><td>' + googleSearch + '</td></tr></table>';
        
    firstForm.parentNode.insertBefore(node, firstForm.nextSibling);
 }

 if (wgPageName == "Служебная:Search") { addOnloadHook(SpecialSearchEnhanced); }

 /*</nowiki>*/

 /** "Technical restrictions" title fix *****************************************
  */
 // For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
 //	(for instance [[iPod]]'s title is updated.  <nowiki>But [[C#]] is not an equivalent wikilink, so [[C Sharp]] doesn't have its main title changed)</nowiki>
 //
 // The function looks for a banner like this: <nowiki>
 // <div id="RealTitleBanner">    <!-- div that gets hidden -->
 //   <span id="RealTitle">title</span>
 // </div>
 // </nowiki>An element with id=DisableRealTitle disables the function.
 
 // similar to innerHTML, but only returns the text portions of the insides, excludes HTML
 function pickUpText(aParentElement) {
  var str = "";
 
  function pickUpTextInternal(aElement) {
    var child = aElement.firstChild;
    while (child) {
      if (child.nodeType == 1)          // ELEMENT_NODE 
        pickUpTextInternal(child);
      else if (child.nodeType == 3)     // TEXT_NODE
        str += child.nodeValue;
 
      child = child.nextSibling;
    }
  }
 
  pickUpTextInternal(aParentElement);
 
  return str;
 }
 
 var disableRealTitle = 0;		// users can disable this by making this true from their monobook.js
 addOnloadHook(function() {
 	try {
 		var realTitleBanner = document.getElementById("RealTitleBanner");
 		if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
 			var realTitle = document.getElementById("RealTitle");
 			if (realTitle) {
 				var realTitleHTML = realTitle.innerHTML;
 				realTitleText = pickUpText(realTitle);
 
 				var isPasteable = 0;
 				//var containsHTML = /</.test(realTitleHTML);	// contains ANY HTML
 				var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); // contains HTML that will be ignored when cut-n-pasted as a wikilink
 				// calculate whether the title is pasteable
 				var verifyTitle = realTitleText.replace(/^ +/, "");		// trim left spaces
 				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
 
 				// if the namespace prefix is there, remove it on our verification copy.  If it isn't there, add it to the original realValue copy.
 				if (wgNamespaceNumber != 0) {
 					if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
 						verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
 					} else {
 						realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText;
 						realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;
 					}
 				}
 
 				// verify whether wgTitle matches
 				verifyTitle = verifyTitle.replace(/^ +/, "").replace(/ +$/, "");		// trim left and right spaces
 				verifyTitle = verifyTitle.replace(/_/g, " ");		// underscores to spaces
 				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
 				isPasteable = (verifyTitle == wgTitle);
 
 				var h1 = document.getElementsByTagName("h1")[0];
 				if (h1 && isPasteable) {
 					h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
 					if (!containsTooMuchHTML)
 						realTitleBanner.style.display = "none";
 				}
 				document.title = realTitleText + " — Википедия";
 			}
 		}
 	} catch (e) {
 		/* Something went wrong. */
 	}
 });

 /* Замена неправильного заголовка правильным by SergV  */
  
  // Все неправильные заголовки
  title_restr_alerts = ["trestrictions_replace", "trestrictions_alert"];
 
  // Только шаблон title
  //title_restr_alerts = ["trestrictions_replace"];
 
  function display_correct_title () {
    var title_restr_alert1, a1;
    if (document.getElementsByTagName && document.getElementById) {  
      for(var i=0; i < title_restr_alerts.length; i++) { 
        title_restr_alert1 = title_restr_alerts[i];
        a1 = document.getElementById(title_restr_alert1);
        if(a1) {
          ct = document.getElementById("trestrictions_correct");
          if(ct) {
            document.getElementsByTagName("h1")[0].innerHTML  = ct.innerHTML;
            a1.style.display = "none";
            document.getElementById("trestrictions_replaced").style.display = "block";
          }
          break;
        }
      }
    }
  }
 
 addOnloadHook(display_correct_title);


 
 /* подгрузка файла со скриптами для редактирования */
 window.przyciskiOpisDone = false;
 var auto_comment = 0;
 if ((document.URL.indexOf('action=edit') > 0 
  || document.URL.indexOf('action=submit') > 0) 
 && wgCanonicalNamespace != 'Special' )
 document.write('<script type="text/javascript"' +
 'src="http://ru.wikipedia.org/w/index.php?title=MediaWiki:Onlyifediting.js' +   
 '&action=raw&ctype=text/javascript&dontcountme=s"><\/script>');

 importScript('Участник:Twyster/blockLoop.js')

/* Викификатор */
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