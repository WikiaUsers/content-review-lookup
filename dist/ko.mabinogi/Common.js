/**
 * 이 스크립트는 마비노기 위키아 전체에 적용됩니다. 고칠 때는 주의해주세요.
 * 
 * 스크립트를 넣을 때는 충분한 설명, 출처를 넣어주세요! 이후 관리가 어려워집니다.
 *
 **/

/* 시작: Edittool Bars */
// [[MediaWiki:Edittools]]와 동시 편집 (순서 바꾸지 않기를!)
  function addCharSubsetMenu() {
   var specialchars = document.getElementById('specialchars');
   if (specialchars) {
    var menu = "<select style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>위키 문법</option>";
    menu += "<option>문장 부호</option>";
    menu += "<option>특수 기호</option>";
    menu += "<option>틀</option>";
    menu += "<option>특수 함수</option>";
    menu += "<option>내용 꾸미기</option>";
    menu += "<option>기타</option>";
    menu += "<option>정비 요망</option>";
    menu += "</select>";
    specialchars.innerHTML = menu + specialchars.innerHTML;
    chooseCharSubset(0);
   }
  }
  function chooseCharSubset(s) {
   var l = document.getElementById('specialchars').getElementsByTagName('p');
   for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
   }
  }
/* 끝: Edittool Bars */
/* 시작: Edittool-bar 옮기기 */
  // Cookie
  function SetCookie(cookieName, cookieValue) {
   var today = new Date();
   var expire = new Date();
   var nDays = 30;
   expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
   document.cookie = cookieName + "=" + escape(cookieValue) + ";expires="+expire.toGMTString();
  }
  function GetCookie(name) {
   var i =0;
   while (i < document.cookie.length) {
    if (document.cookie.substr(i,name.length) == name) {
     var valend = document.cookie.indexOf(";",i+name.length+1);
      if (valend == -1) {
       valend = document.cookie.length;
      }
      return unescape(document.cookie.substring(i+name.length+1,valend));
     }
     i = document.cookie.indexOf(" ", i) + 1;
     if (i == 0) break;
    }
   }
  function chooseCharSubset(ss) {
   s = parseInt( ss );
   if ( isNaN(s) ) s = 0;
   if (SpecCharsAccesskeys.length==0) {
    if (is_opera) SpecCharsAccesskeys = new  Array("!","\"","§","$","%","&","/","(",")","=");
     else SpecCharsAccesskeys = new  Array("1","2","3","4","5","6","7","8","9","0","!","\"","§","$","%","&","/","(",")","=");
   }
    if (s>=0) {
     var l = document.getElementById('specialchars').getElementsByTagName('p');
     for (var i = 0; i < l.length ; i++) {
      if (i==s) {
       l[i].style.display = 'inline';  
       SetArrayAccessKeys(l[i].getElementsByTagName('a'),SpecCharsAccesskeys);
       } else l[i].style.display =  'none';
      }
    SetCookie('CharSubset', s);
   } 
  }
  // Accesskeys
  function SetArrayAccessKeys(elements, keys) {
   for (var i =0; i < elements.length;i++) {
    if (i < keys.length) {
     elements[i].setAttribute("accessKey",keys[i]);
     elements[i].setAttribute("title","alt-"+keys[i]);
    } else {
     elements[i].setAttribute("accessKey","");
     elements[i].setAttribute("title","");
    }
   }
  }
  SpecCharsAccesskeys = new Array(); 
  function addCharSubsetMenu() {
   var SpecCharsMove = true;
   var edittools = document.getElementById('specialchars');
   if (edittools) {
    var name;
    var menu=document.createElement("select");
    menu.style.display="inline";
    var line = edittools.getElementsByTagName('p');
    for (var i = 0; i < line.length ; i++) {
     if (line[i].className == "specialbasic" || line[i].className == "speciallang") {
      if (line[i].title) name=line[i].title;
       else name = line[i].id;
       menu.options[menu.options.length]=new Option(name);
     }
    }
    menu.onchange=function() {chooseCharSubset(this.selectedIndex);} ;
    if (SpecCharsMove) {
     edittools.insertBefore(menu,edittools.firstChild);
     } else {
     edittools.insertAfter(menu,edittools.firstChild);
    }
    var stdsubset = 0;
    if (GetCookie ("CharSubset")) stdsubset = parseInt( GetCookie ("CharSubset") );
    if ( isNaN(stdsubset) ) stdsubset = 0;
    menu.options[stdsubset].selected = true;
    chooseCharSubset(stdsubset);
    var charlinks = document.getElementById('toolbar').getElementsByTagName('a');
    for (var i=0; i < charlinks.length; i++) {
     charlinks[i].setAttribute("tabindex",8);
    }
   }
  }
  addOnloadHook(addCharSubsetMenu);
  //  Toolbar 옮기기
  function elementMoveto(node, refNode, pos) {
   if(node && refNode) {
    var parent = refNode.parentNode;
    if (pos && pos == 'after') refNode=refNode.nextSibling;
    try {
     parent.insertBefore(node, refNode);
    } catch (DOMException) {};
   }
  }
  // Toolbar 고정
  function fixToolbar(){
   var wpEditToolbar = document.getElementById("toolbar");
   var dropdownListEditTools = document.getElementById("dropdownListEditTools");
   elementMoveto(dropdownListEditTools , wpEditToolbar , 'after' );
   if (dropdownListEditTools) dropdownListEditTools.style.display="block";
   var editspecialchars = document.getElementById("specialchars");
   elementMoveto( editspecialchars, wpEditToolbar, 'after' );      
  }
  addOnloadHook(fixToolbar);
/* 끝: Edittool-bar 옮기기 */

/* 편집창 위의 단추 추가 */
  function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) {
   mwCustomEditButtons[mwCustomEditButtons.length] =
   {"imageFile": imageFile, "speedTip": speedTip, "tagOpen": tagOpen, "tagClose": tagClose, "sampleText": sampleText};
  }
  addCustomButton('https://images.wikia.nocookie.net/suju/ko/images//4/43/Button_KST.png', '한국시간으로 서명하기', '--\~\~\~ \{\{풀기:KSTS\}\}', '', '');

/* Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

window.killEvt=function(evt){evt=evt||window.event||window.Event;if(typeof(evt.preventDefault)!='undefined'){evt.preventDefault();evt.stopPropagation();}else{evt.cancelBubble=true;}return false;};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:en:Wikipedia:NavFrame]].
 *  Maintainers: [[Wikipedia:en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "숨기기";
var expandCaption = "보이기";
 
function collapseTable( tableIndex ){
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
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
 
function createCollapseButtons(){
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "#" );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:en:Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar){
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
$( createNavigationBarToggleButton );

/** 
  * IE6에서 투명 PNG 처리를 위한 스크립트.
  *
  * Correctly handle PNG transparency in Internet Explorer 6.
  * http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.
  *  
  * Adapted for Wikipedia by Remember_the_dot and Edokter.
  *  
  * http://homepage.ntlworld.com/bobosola/pnginfo.htm states "This page contains more information for
  * the curious or those who wish to amend the script for special needs", which I take as permission to
  * modify or adapt this script freely. I release my changes into the public domain.
  */  
 
 function PngFix()
 {
    if (document.body.filters && !window.PngFixDisabled)
    {
        var documentImages = document.images
        var documentCreateElement = document.createElement
        var funcEncodeURI = encodeURI
        
        for (var i = 0; i < documentImages.length;)
        {
            var img = documentImages[i]
            var imgSrc = img.src
            
            if (imgSrc.substr(imgSrc.length - 3).toLowerCase() == "png" && !img.onclick)
            {
                if (img.useMap)
                {
                    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
                    img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
                    i++
                }
                else
                {
                    var outerSpan = documentCreateElement("span")
                    var innerSpan = documentCreateElement("span")
                    var outerSpanStyle = outerSpan.style
                    var innerSpanStyle = innerSpan.style
                    var imgCurrentStyle = img.currentStyle
                    
                    outerSpan.id = img.id
                    outerSpan.title = img.title
                    outerSpan.className = img.className
                    outerSpanStyle.backgroundImage = imgCurrentStyle.backgroundImage
                    outerSpanStyle.borderWidth = imgCurrentStyle.borderWidth
                    outerSpanStyle.borderStyle = imgCurrentStyle.borderStyle
                    outerSpanStyle.borderColor = imgCurrentStyle.borderColor
                    outerSpanStyle.display = "inline-block"
                    outerSpanStyle.fontSize = "0"
                    outerSpanStyle.verticalAlign = "middle"
                    if (img.parentElement.href) outerSpanStyle.cursor = "hand"
                    
                    innerSpanStyle.width = "1px"
                    innerSpanStyle.height = "1px"
                    innerSpanStyle.display = "inline-block"
                    innerSpanStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + funcEncodeURI(imgSrc) + "')"
                    
                    outerSpan.appendChild(innerSpan)
                    img.parentNode.replaceChild(outerSpan, img)
                }
            }
            else
            {
                i++
            }
        }
    }
 }
 
 if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.substr(22, 1) == "6")
 {
    window.attachEvent("onload", PngFix)
 }
 
/* 대문의 "문서" 탭을 "대문"으로 바꿉니다. */
function MainPageRenameNamespaceTab() {
     try {
         var Node = document.getElementById('ca-nstab-main').firstChild;
         if (Node.textContent) {
             Node.textContent = "대문";
         } else if ( Node.innerText ) { // IE
             Node.innerText = "대문";
         } else {
             Node.replaceChild(Node.firstChild, document.createTextNode("대문"));
         }
     } catch (e) {
     }
}
 
if (wgPageName == "대문" || wgPageName == "토론:대문") {     addOnloadHook(MainPageRenameNamespaceTab);
}

/** JSconfig ************
 * Global configuration options to enable/disable and configure
 * specific script features from [[MediaWiki:Common.js]] and
 * [[MediaWiki:Monobook.js]]
 * This framework adds config options (saved as cookies) to [[Special:Preferences]]
 * For a more permanent change you can override the default settings in your 
 * [[Special:Mypage/monobook.js]]
 * for Example: JSconfig.keys[loadAutoInformationTemplate] = false;
 *
 *  Maintainer: User:Dschwen
 */
 
var JSconfig =
{
 prefix : 'jsconfig_',
 keys : {},
 meta : {},
 
 //
 // Register a new configuration item
 //  * name          : String, internal name
 //  * default_value : String or Boolean (type determines configuration widget)
 //  * description   : String, text appearing next to the widget in the preferences
 //  * prefpage      : Integer (optional), section in the preferences to insert the widget:
 //                     0 : User profile
 //                     1 : Skin
 //                     2 : Math
 //                     3 : Files
 //                     4 : Date and time
 //                     5 : Editing
 //                     6 : Recent changes
 //                     7 : Watchlist
 //                     8 : Search
 //                     9 : Misc
 //
 // Access keys through JSconfig.keys[name]
 //
 registerKey : function( name, default_value, description, prefpage )
 {
  if( typeof JSconfig.keys[name] == 'undefined' ) 
   JSconfig.keys[name] = default_value;
  else {
 
   // all cookies are read as strings, 
   // convert to the type of the default value
   switch( typeof default_value )
   {
    case 'boolean' : JSconfig.keys[name] = ( JSconfig.keys[name] == 'true' ); break;
    case 'number'  : JSconfig.keys[name] = JSconfig.keys[name]/1; break;
   }
 
  }
 
  JSconfig.meta[name] = { 'description' : description, 'page' : prefpage || 0, 'default_value' : default_value };
 },
 
 readCookies : function()
 {
  var cookies = document.cookie.split("; ");
  var p =JSconfig.prefix.length;
  var i;
 
  for( var key in cookies )
  {
   if( cookies[key].substring(0,p) == JSconfig.prefix )
   {
    i = cookies[key].indexOf('=');
    //alert( cookies[key] + ',' + key + ',' + cookies[key].substring(p,i) );
    JSconfig.keys[cookies[key].substring(p,i)] = cookies[key].substring(i+1);
   }
  }
 },
 
 writeCookies : function()
 {
  for( var key in JSconfig.keys )
   document.cookie = JSconfig.prefix + key + '=' + JSconfig.keys[key] + '; path=/; expires=Thu, 2 Aug 2009 10:10:10 UTC';
 },
 
 evaluateForm : function()
 {
  var w_ctrl,wt;
  //alert('about to save JSconfig');
  for( var key in JSconfig.meta ) {
   w_ctrl = document.getElementById( JSconfig.prefix + key )
   if( w_ctrl ) 
   {
    wt = typeof JSconfig.meta[key].default_value;
    switch( wt ) {
     case 'boolean' : JSconfig.keys[key] = w_ctrl.checked; break;
     case 'string' : JSconfig.keys[key] = w_ctrl.value; break;
    }
   }
  }
 
  JSconfig.writeCookies();
  return true;
 },
 
 setUpForm : function()
 { 
  var prefChild = document.getElementById('preferences');
  if( !prefChild ) return;
  prefChild = prefChild.childNodes;
 
  //
  // make a list of all preferences sections
  //
  var tabs = new Array;
  var len = prefChild.length;
  for( var key = 0; key < len; key++ ) {
   if( prefChild[key].tagName &&
       prefChild[key].tagName.toLowerCase() == 'fieldset' ) 
    tabs.push(prefChild[key]);
  }
 
  //
  // Create Widgets for all registered config keys
  //
  var w_div, w_label, w_ctrl, wt;
  for( var key in JSconfig.meta ) {
   w_div = document.createElement( 'DIV' );
 
   w_label = document.createElement( 'LABEL' );
   w_label.appendChild( document.createTextNode( JSconfig.meta[key].description ) )
   w_label.htmlFor = JSconfig.prefix + key;
 
   wt = typeof JSconfig.meta[key].default_value;
 
   w_ctrl = document.createElement( 'INPUT' );
   w_ctrl.id = JSconfig.prefix + key;
 
   // before insertion into the DOM tree
   switch( wt ) {
    case 'boolean' : w_ctrl.type = 'checkbox'; break;
    case 'string'  : w_ctrl.type = 'text'; break;
   }
 
   w_div.appendChild( w_label );
   w_div.appendChild( w_ctrl );
   tabs[JSconfig.meta[key].page].appendChild( w_div );
 
   // after insertion into the DOM tree
   switch( wt ) {
    case 'boolean' : w_ctrl.defaultChecked = w_ctrl.checked = JSconfig.keys[key]; break;
    case 'string' : w_ctrl.defaultValue = w_ctrl.value = JSconfig.keys[key]; break;
   }
 
  }
  addEvent(document.getElementById('preferences').parentNode, 'submit', JSconfig.evaluateForm );
 }
}
 
JSconfig.readCookies();
addOnloadHook(JSconfig.setUpForm);

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('보존된 문서').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = '보존된 문서';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/* 채팅방으로 통하는 링크를 항상 새 창에서 열기 */
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + '초';
  } else {
    left = (diff%60) + '초';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + '분 ' + left;
    } else {
      left = (diff%60) + '분 ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + '시간 ' + left;
    } else {
      left = (diff%24) + '시간 ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + '일 ' + left;
    } else {
      left = diff + '일 ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
//

/* Special:Upload */
function Information() {
	if((wgPageName == '특수기능:파일올리기' || wgPageName == '특수기능:다중올리기') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{그림 정보\r| 설명 = \n| 출처 = \n| 날짜 = \n| 만든이 = \n| 저작권 = \n | 기타 = \n}}';
	}
}
addOnloadHook(Information);

// ==============================
// BackToTopButton
// ==============================

// A script that adds a "Back To Top" option in the footer of the Oasis theme.
// I don't like scrolling back to top on long pages neither do you :)
// Created by Noemon from Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Back To Top" onClick="goToTop();">위로 가기</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              User:Porter21 (fallout.wikia.com)                   ### */
/* ######################################################################## */
 
var indicator = 'https://images.wikia.nocookie.net/mabinogi/ko/images/d/de/Ajax-loader.gif';
var ajaxPages = new Array("특수기능:최근바뀜", "특수기능:WikiActivity", "특수기능:주시문서목록", "특수기능:새파일");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = '자동 갱신';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = '이 문서를 1분마다 자동으로 새로 고칩니다.';
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;
 
function setCookie(c_name,value,expiredays) {
   var exdate=new Date()
   exdate.setDate(exdate.getDate()+expiredays)
   document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
 
function getCookie(c_name) {
   if (document.cookie.length>0) {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1) { 
         c_start=c_start + c_name.length+1 
         c_end=document.cookie.indexOf(";",c_start)
         if (c_end==-1) c_end=document.cookie.length
         return unescape(document.cookie.substring(c_start,c_end))
      } 
   }
   return ""
}
 
function preloadAJAXRL() {
   ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
   appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
   appTo.append('&#160;<span style="font-size: small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="새로 고치는 중..." /></span></span>');
   $("#ajaxLoadProgress").ajaxSend(function (event, xhr, settings){
      if (location.href == settings.url) $(this).show();
   }).ajaxComplete (function (event, xhr, settings){
      if (location.href == settings.url) $(this).hide();
   });
   $("#ajaxToggle").click(toggleAjaxReload);
   $("#ajaxToggle").attr("checked", ajaxRLCookie);
   if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
   if ($("#ajaxToggle").prop("checked") == true) {
      setCookie("ajaxload-"+wgPageName, "on", 30);
      doRefresh = true;
      loadPageData();
   } else {
      setCookie("ajaxload-"+wgPageName, "off", 30);
      doRefresh = false;
      clearTimeout(ajaxTimer);
   }
}
 
function loadPageData() {
   cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
   $(cC).load(location.href + " " + cC + " > *", function (data) { 
      if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
   });
}
addOnloadHook(function(){ for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL() } } );

/* 주석 말풍선 기능 */
importScriptPage('ReferencePopups/code.js', 'dev');

/**
 * Helper script for .hlist class in [[미디어위키:Common.css]]
 * Add pseudo-selector class to last-child list items in IE8
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 6 (2014-08-23)
 * @author [[User:Edokter]]
 * 
 * [[포럼:수평 목록 코드가 쓰고 싶습니다.]] - Lorentz21 사용자의 요청
 */
( function ( mw, $ ) {
    var profile = $.client.profile();
    if ( profile.name === 'msie' && profile.versionNumber === 8 ) {
        mw.hook( 'wikipage.content' ).add( function ( $content ) {
            $content.find( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
                .addClass( 'hlist-last-child' );
        } );
    }
} ( mediaWiki, jQuery ) );