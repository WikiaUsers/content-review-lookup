/* 此处的JavaScript将加载于所有用户每一个页面。 */

/*
 * Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
 * Maintainer: Cacycle
 */

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:DISPLAYTITLE/code.js',
        'u:dev:ExtendedNavigation/code.js',
    ]
});

if (wgArticleId == 0 && wgUserName) {
  var slash = wgPageName.indexOf('/');
  var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
  var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
  var ext = null;
  if (norm == test + 'js') ext = 'js';
  else if (norm == test + 'css') ext = 'css';
  if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin + '.' + ext);
}
 
 
if (wgAction == "edit" || wgAction == "submit" || (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName =="Upload")) //對應編輯頁面
{
    importScript("MediaWiki:Common.js/edit.js")
}
else if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName =="Watchlist") //watchlist scripts
{
    importScript("MediaWiki:Common.js/watchlist.js")
}
if( wgNamespaceNumber == 6 ) {
    importScript('MediaWiki:Common.js/file.js');
}
 
 
/** SysOP Javascript *******************************************************
  *
  *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
  */
function sysopFunctions() {
    if ( wgUserGroups && !window.disableSysopJS ) {
        for ( var g = 0; g < wgUserGroups.length; ++g ) {
            if ( wgUserGroups[g] == "sysop" ) {
                importScript( "MediaWiki:Sysop.js" );
                break;
            }
        }
    }
}
 
//addOnloadHook(sysopFunctions);
 
 
//遍历
function forEach(callback,array){
	var i=0,j=array.length;
	while(i<j){callback(array[i++]);}
}
function applyEach(callback,array){
	var i=0,j=array.length;
	while(i<j){callback(array[i++]);}
}
 
// 移動元素
function elementMoveto(node, refNode, pos){//默認位置為refNode前
	if(node && refNode){
		var parent=refNode.parentNode;
		if (pos && pos=='after') {refNode=refNode.nextSibling;}
		try {
			if(refNode){
				parent.insertBefore(node, refNode);
			}else{
				parent.appendChild(node);
			}
		} catch (DOMException) {};
	}
}
// 創建元素
function createElement(tag,children,props){
	var element = document.createElement(tag);
	if(!(children instanceof Array)){children=[children];}
	for(var i=0;i<children.length;i++){
		var child=children[i];
		if(typeof child=='string'){child=document.createTextNode(child);}
		if(child){element.appendChild(child);}
	}
	if(typeof props=='object'){
		for(var k in props){
			switch(k){
			case 'styles':
				var styles=props.styles;
				for(var s in styles){element.style[s]=styles[s];}
				break;
			case 'events':
				var events=props.events;
				for(var e in events){ addHandler(element,e,events[e]); }
				break;
			case 'class':
				element.className=props[k];break;
			default:
				element.setAttribute(k,props[k]);
			}
		}
	}
	return element;
}
 
/* Scripts specific to Internet Explorer */
 
 
if (navigator.appName == "Microsoft Internet Explorer"){
	var oldWidth;
	var docEl = document.documentElement;
 
	function fixIEScroll(){
		if (!oldWidth || docEl.clientWidth > oldWidth){
			doFixIEScroll();
		}else{
			setTimeout(doFixIEScroll, 1);
		}
		oldWidth = docEl.clientWidth;
	}
 
	function doFixIEScroll() {
		docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
	}
 
    document.attachEvent("onreadystatechange", fixIEScroll);
    document.attachEvent("onresize", fixIEScroll);
 
    // IE overflow bug
    appendCSS('div.overflowbugx { overflow-x: scroll !important; overflow-y: hidden !important; } div.overflowbugy { overflow-y: scroll !important; overflow-x: hidden !important; }');
}
 
/* Test if an element has a certain class **************************************
 * Description: Uses regular expressions and caching for better performance.
 */
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
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = " △ 隱藏卡片對話 △ ";
var expandCaption = " ▼ 顯示卡片對話 ▼ ";
 
function collapseTable( tableIndex )
{
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
 
function createCollapseButtons()
{
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
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
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
 
addOnloadHook( createCollapseButtons );
 
 
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '【' + collapseCaption + '】';
var NavigationBarShow = '【' + expandCaption + '】';
 
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
function createNavigationBarToggleButton()
{
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
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
addOnloadHook( createNavigationBarToggleButton );
 
 
addOnloadHook(function(){
    var opt = document.createElement("option");
    opt.text = "monobook";
    opt.value = "monobook";
 
    var placeholder = document.getElementById("adminSkin");
    if (!placeholder) return;
    placeholder.options.add(opt);
 
});
 
//</source>

//Onload functions
$(function(){
	showDaily();
	//Move module to right column
	moveModule();
});

function showDaily(){
	if ($("#daily")[0]){
		var d=new Date();
		var day=d.getUTCDay();
		var h=d.getUTCHours()+9;
		if (h>23){
			h-=24;
			day++;
			if (day==7) day=0;
		}
		if (day>=0 && day<=6){
			$("[id^='daily-']").hide();
			$("#daily-"+day).show();
		}else{
			$("#daily").hide().after("<div>今天沒有限定活動。</div>");
		}
	}
}

function moveModule(){
	if($(".page-Home").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}

/** Quick Edit Mode (beta) *************************************
 *
 *  Description: to add a URL to card data page in different card mini display(for beta)
 *  Maintainers: Tony0815
 */
var quickedit_loop_i;
if(document.URL.indexOf("quickedit") == -1){
  for (quickedit_loop_i = 0; quickedit_loop_i < document.getElementsByClassName("quickedit").length; quickedit_loop_i++) {
  document.getElementsByClassName("quickedit")[quickedit_loop_i].innerHTML = "";
  }
}
//Quick Edit Mode END