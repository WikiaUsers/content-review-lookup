/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/* 백괴사전에서 설정 파일을 복사 (CC-BY-NC-SA 2.5에 따라) 및 변경 */
/*<source lang="javascript"><nowiki>*/
/** [[틀:USERNAME]]에서 사용하는 바꿔치기 함수
  * 작성자: [[사용자:Peremen]]
*/

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    if (!document.getElementById('pt-userpage')) return;
    $("span.insertusername").each(function(i) {
        $(this).text(wgUserName)
    })
};
$(UserNameReplace);

/** [[틀:제목]]에서 사용하는 제목 바꿔치기 함수
  * 작성자: [[사용자:Peremen]]
  */

function rewriteTitle() {
    if (typeof(disableTitleRewrite) != 'undefined' && disableTitleRewrite) return;
    if (!document.getElementById('title-meta')) return;
    $('h1.firstHeading').each( function(i){
        $(this).html( $("#title-meta").html()).css('text-align', $("#title-align").text())
    })
}
$(rewriteTitle);

/* from en: */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
}
)();

/*
[[:en:Wikipedia:WikiProject User scripts/Scripts/Add edit section 0]]
[[위키백과:사랑방/2007년 1월#듕귁어판을 보니 section 0 편집 방법이 있더군요]]
*/

/* 영어 위키백과 버전 */
function addEditZero() {
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
}
$(addEditZero);

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Collapsible tables *********************************************************
*
*  Description: Allows tables to be collapsed, showing only the header. See
*               Wikipedia:NavFrame.
*  Maintainers: User:R. Koot
*/

//var autoCollapse = 2;
//var collapseCaption = "hide";
//var expandCaption = "show";

function collapseTable( tableIndex ) {
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

function createCollapseButtons() {
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

$( createCollapseButtons );

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
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
function toggleNavigationBar(indexNavigationBar) {
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
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    var divs = document.getElementsByTagName("div");
    for (var i=0;NavFrame = divs[i];i++) {
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
            for (
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
        for (
            var i=1;
            i<=indexNavigationBar;
            i++
        ) {
            toggleNavigationBar(i);
        }
    }

}

$( createNavigationBarToggleButton );

/** 특집 기사에 별표를 붙이는 함수.
  * 작성자: [[사용자:Peremen]]
*/
function LinkFA() {
    // iterate over all <span>-elements
  $("span.FA").each(function(i, e) {
    var a = e.id;
    $("#p-lang li").each( function(j, k) {
      if (k.className == "interwiki-"+a) {
        k.className += " FA";
        k.title = "이 글은 특집 기사입니다.";
      }
    });
  });
}
$(LinkFA);

/**
 * MainPage-tab
 * On the main page (and its associated namespaces and actions (Talk, edit, history etc.) this script will put  "Main Page" instead of "Article" or "Page" in the first tab
 *
 * @source: http://www.mediawiki.org/wiki/Snippets/Main_Page_tab
 * @rev: 2
 */

function MainPageRenameNamespaceTab() {
        var title = mw.config.get( 'wgPageName' );
        var hasMainPageTab = (title == '잉여위키:대문' || title == '잉여위키토론:대문');
        if ( hasMainPageTab ){
                $( '#ca-nstab-project a' ).text( "대문" );
        }
}
$(MainPageRenameNamespaceTab);

/** 자매 프로젝트에 맞게 로고 URL을 변경하는 함수.
  * 작성자: [[사용자:Cyrus H.]] / [[사용자:Peremen]]
*/
var siflIsUngameMain=false;

function runLogoLinkChanger() {
  var no = mw.config.get("wgNamespaceNumber");
  var nm = mw.config.get("wgCanonicalNamespace");
  if (no == 0) return true;
/*  if (no == 104 || no == 105 || no == 106 || no == 107 || no == 112 || no == 113 || no == 114 || no == 115 || no == 116 | no == 117) {
    $("#p-logo a").attr("href", mw.util.wikiGetlink(nm.replace(/토론/,"")+":대문"));
  }
*/
}
$(runLogoLinkChanger);

/** 백괴사전 원본의 '해설' 대신 '부연설명'으로, 사용 가능성은 낮음 */
/** 일반 문서에 해설 탭을, 해설 문서에 일반 문서 탭을 추가하는 함수.
  * 작성자: [[사용자:Cyrus H.]] / [[사용자:Peremen]]
*/
 
/*
function doHaeseolseoThings() {
  var ns = mw.config.get("wgNamespaceNumber");
  var t = mw.config.get("wgTitle");
  var skin = (mw.config.get("skin") == 'vector');
  if(ns == 0) {
    mw.util.addPortletLink(skin?'p-namespaces':'p-cactions', mw.util.wikiGetlink("부연설명:"+t), "부연설명", "ca-go-to-haeseolseo", "이 문서의 부연설명을 봅니다.", "1", '#ca-talk');
    checkDocumentExistency("부연설명:"+wgTitle,"ca-go-to-haeseolseo");
  } else if(ns == 1) {
    mw.util.addPortletLink(skin?'p-namespaces':'p-cactions', mw.util.wikiGetlink("부연설명:"+t), "부연설명", "ca-go-to-haeseolseo", "이 문서의 부연설명을 봅니다.", "1", '#ca-talk');
    checkDocumentExistency("해설:"+wgTitle,"ca-go-to-haeseolseo");
  } else if(ns == 108) {
   mw.util.addPortletLink(skin?'p-namespaces':'p-cactions', mw.util.wikiGetlink(t), "문서", "ca-return-to-document", "잉여위키에 있는 문서를 봅니다.", "1", "#ca-nstab-..ED.95.B4.EC.84.A4");
   mw.util.addPortletLink(skin?'p-namespaces':'p-cactions', mw.util.wikiGetlink("토론:"+t), "토론", "ca-return-to-talk", "잉여위키에 있는 토론 문서를 봅니다.", "2", "#ca-nstab-..ED.95.B4.EC.84.A4");
   checkDocumentExistency(wgTitle,"ca-return-to-document");
   checkDocumentExistency("토론:"+wgTitle,"ca-return-to-talk");
  }
}
$(doHaeseolseoThings);
*/

/** 문서가 존재하는지 존재하지 않는지 판단하여 탭 색을 바꾸는 함수.
  * 작성자: [[사용자:Cyrus H.]] / [[사용자:Peremen]]
*/

function checkDocumentExistency(documentTitle,tabId) {
  $.getJSON("/w/api.php",
    {action:"query", titles:documentTitle, format:"json"},
    function(d) {
      if(d.query.pages["-1"].missing != undefined) $("#"+tabId).addClass("new");
    }
  );
}

/*</nowiki></source>*/