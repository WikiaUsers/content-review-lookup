/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
 
 /* from en: */
 var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 /*
 [[wikipedia:Wikipedia:WikiProject User scripts/Scripts/Add edit section 0]]
 [[wikipedia:ko:위키백과:사랑방/2007년 1월#중국어판을 보니 section 0 편집 방법이 있더군요]]
 */
 // 원형은 러시아어 위키백과. 일부 수정했습니다.
 /*addOnloadHook(function () {
    var x;
    if (!(x = document.getElementById('ca-edit') )) return;
    var url;
    if (!(url = x.getElementsByTagName('a')[0] )) return;
    if (!(url = url.href )) return;
 
    var body = document.getElementById ('bodyContent');
    if(!body) return;
    if(body.innerHTML.match('class="editsection"')){
        body.innerHTML = '<d'+'iv class="editsection" id="ca-edit-0">[<a href="' + url + '&section=0">편집</a>]</di'+'v>' + body.innerHTML;
    }
 }
 );*/
 /* 영어 위키백과 버전 */
 addOnloadHook(function () {
    var x;
    if (!(x = document.getElementById('ca-edit') )) return;
    var url;
    if (!(url = x.getElementsByTagName('a')[0] )) return;
    if (!(url = url.href )) return;
    var y = addPortletLink('p-cactions', url+"&section=0", '0', 'ca-edit-0',
                           '문서의 첫 부분만을 편집합니다.', '0', x.nextSibling);
 
    y.className = x.className;  // steal classes from the the edit tab...
    x.className = 'istalk';     // ...and make the edit tab have no right margin
 
    // exception: don't steal the "selected" class unless actually editing section 0:
    if (/(^| )selected( |$)/.test(y.className)) {
        if (!document.editform || !document.editform.wpSection
            || document.editform.wpSection.value != "0") {
            y.className = y.className.replace(/(^| )selected( |$)/g, "$1");
            x.className += ' selected';
        }
    }
 });
 
/* 대문의 "프로젝트" 탭을 "대문"으로 바꿉니다. */
 
function MainPageRenameNamespaceTab() {
  try {
    var Node = document.getElementById('ca-nstab-project').firstChild;
    if (Node.textContent) {
      Node.textContent = "대문";
    } else if ( Node.innerText ) { // IE
      Node.innerText = "대문";
    } else {
      Node.replaceChild(Node.firstChild, document.createTextNode("대문")); 
    }
  } catch(e) {
  }
}
 
if (wgPageName == "Social_Wiki:대문" || wgPageName == "Social_Wiki토론:대문") {
  addOnloadHook(MainPageRenameNamespaceTab);
}
 
 /* ([[wikipedia:ko:위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
 /** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               Wikipedia:NavFrame.
 *  Maintainers: User:R. Koot
 */
 
 //var autoCollapse = 2;
 //var collapseCaption = "hide";
 //var expandCaption = "show";
 
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
 
 /* ([[wikipedia:ko:위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[:en:Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var autoCollapse = 2;
  var collapseCaption = "숨기기";
  var expandCaption = "보이기";
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