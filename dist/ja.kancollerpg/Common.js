// <source lang="javascript">
/* ここに書いたスクリプトは全ての外装に反映されます */

/** 現在のURLから URLパラメータを取り出す **********
 * [[en:MediaWiki:Common.js]] より。paramName  : 取り出すパラメータの名前
 */
function getURLParamValue( paramName, url) 
{
 if (typeof (url) == 'undefined'  || url === null) url = document.location.href;
 var cmdRe=RegExp( '[&?]' + paramName + '=([^&#]*)' ); // Stop at hash
 var m=cmdRe.exec(url);
 if (m && m.length > 1) return decodeURIComponent(m[1]);
 return null;
}

/** &withJS= URL parameter, &withCSS= URL parameter *******
 * [[en:MediaWiki:Common.js]] より。MediaWiki空間に置かれているスクリプトまたはスタイルシートを
 * [[Special:Mypage/vector.js]]または[[Special:Mypage/vector.css]]を編集しないで体験できるようにする
 */
var extraJS = getURLParamValue("withJS");
if ( extraJS && extraJS.match("^MediaWiki:[^&<>=%]*\.js$") ) {
  importScript(extraJS);
}
var extraCSS = getURLParamValue("withCSS");
if ( extraCSS && extraCSS.match("^MediaWiki:[^&<>=%]*\.css$") ) {
  importStylesheet(extraCSS);
}

/*
 * [[特別:検索]]に外部検索サイト選択用のプルダウンメニューをつける
 */
if (wgPageName == '特別:検索')
{
    importScript('MediaWiki:Common.js/SpecialSearchEnhanced.js')
}

 /** "Technical restrictions" title fix *****************************************
  *
  *  Description:
  *  Maintainers: [[en:User:Interiot]], [[en:User:Mets501]]
  */
 
 // For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
 //	(for instance [[iPod]]'s title is updated.  <nowiki>But [[C#]] is not an equivalent wikilink, so [[C Sharp]] doesn't have its main title changed)</nowiki>
 //
 // The function looks for a banner like this: <nowiki>
 // <div id="RealTitleBanner">    <!-- div that gets hidden -->
 //   <span id="RealTitle">title</span>
 // </div>
 // </nowiki>An element with id=DisableRealTitle disables the function.
 var disableRealTitle = 0;		// users can disable this by making this true from their monobook.js
 if (wgIsArticle) {			// don't display the RealTitle when editing, since it is apparently inconsistent (doesn't show when editing sections, doesn't show when not previewing)
     $(function() {
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
 				document.title = realTitleText + " - Wikipedia";
 			}
 		}
 	} catch (e) {
 		/* Something went wrong. */
 	}
     });
 }
 
 
 // similar to innerHTML, but only returns the text portions of the insides, excludes HTML
 function pickUpText(aParentElement) {
   var str = "";
 
   function pickUpTextInternal(aElement) {
     var child = aElement.firstChild;
     while (child) {
       if (child.nodeType == 1)		// ELEMENT_NODE 
         pickUpTextInternal(child);
       else if (child.nodeType == 3)	// TEXT_NODE
         str += child.nodeValue;
 
       child = child.nextSibling;
     }
   }
 
   pickUpTextInternal(aParentElement);
 
   return str;
 }

 /* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[:en:User:Mike Dillon]], [[:en:User:R. Koot]], [[:en:User:SG]]
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/**
 * Collapsible tables *********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[Wikipedia:NavFrame]].
 * Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "隠す";
var expandCaption = "表示";
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createCollapseButtons );

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
  var NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  //var NavigationBarShowDefault = autoCollapse;
  
  
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
  
  $( createNavigationBarToggleButton );

/////////////////////////////////////////////////////////////////
// 記事名チェッカ 1.0 written by Tietew and Hatukanezumi
/////////////////////////////////////////////////////////////////

/*
 * 無効化のフラグ変数。無効化は、利用者のユーザスクリプトで真に設定することでする。
 */
var disableTitleChecker = false;

/*
 * 記事名チェッカによる処理を適用しない記事名のリスト (除外リスト)。
 */
var TitleChecker_exclude = [
  // [名前空間番号, 項目名], ...
];

/*
 * 記事名を検査し、結果を返す。
 * 引数:
 *   ns:    名前空間番号 (標準: 0; ノート: 1; ...)。
 *   title: 項目名。
 *   body:  項目本文の内容。
 * 返値:
 *   [処理, [[説明文, [ガイドライン等, ...]], ...], リダイレクトの即時削除対象になりうるかどうか]
 *   ただし、処理が「許可」であるときは false。
 */ 
function TitleChecker_check(ns, title, body) {
  var platform; // プラットフォームを識別する名称。
  var is_redirect; // リダイレクトであるかどうか。
  var action = 0; // 処理。0: 許可する; 1: 警告する; 2: 拒否する.
  var reason = [];
  var for_redirect = false;

  var do_check = function (pattern, newaction, message, guides) {
    var re, m, matched, msgstr;
    re = new RegExp(pattern, "g");
    m = title.match(re);
    if (m && (matched = m.join(" "))) {
      if (newaction > action) action = newaction;

      msgstr = message;
      msgstr = msgstr.replace("%s", matched);
      msgstr = msgstr.replace("%%", "%");
      reason.push([msgstr, guides]);

      if (guides && is_redirect)
        for ( var i = 0; i < guides.length; i++)
          if (guides[i] == "Wikipedia:即時削除の方針#リダイレクト") {
            for_redirect = true;
            break;
          }
    }
  };

  title = title.replace(/_/g, ' ');

  // 記事ごとの無効化。除外リストにあれば検査をしない。
  if (TitleChecker_exclude)
    for ( var i = 0;  i < TitleChecker_exclude.length; i++)
      if (TitleChecker_exclude[i][0] == ns && TitleChecker_exclude[i][1] == title)
        return false;

  // プラットフォームの判別。
  // check for AppleWebKit/416 (Safari/2.0.2) or later
  var safari = navigator.userAgent.match(/\bAppleWebKit\/(\d+)/);
  if(safari && safari[1] < 416) platform = 'Safari/1.x';

  // リダイレクトであるかどうかの判定。
  is_redirect = (body && body.match(/^#redirect[[\t\r\n ]/i));
  
  /*
   * 書式の検査
   */

  // 記事名の全体を「」または『』などでくくっているもの、ないしは、その後に曖昧さ回避の括弧があるもの。
  if (platform != 'Safari/1.x') do_check(
    "^[「『].*[」』]([ _]+[(][^)]+[)])?$",
    1, "記事名が鈎括弧でくくられています。芸術作品のタイトルは鈎括弧でくくるべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#小説・詩・映画・舞台・音楽・絵画など芸術作品のタイトル"]);

  // 記事名の末尾の括弧書きに半角の小括弧（丸括弧）を使用する場合に、左括弧の前に半角スペースがないもの。
  // 注: 入れ子は2重まで。
  do_check(
    "[^ ][(]([(][^()]*[)]|[^()])*[)]$",
    1, "記事名の最後の左括弧の前に半角スペースがありません: %s。曖昧さ回避の括弧である場合は、括弧の前に半角スペースを入れてください。名称自体に括弧を含んでいる場合はこの限りではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:曖昧さ回避#曖昧さ回避の種類と方法"]);

  // 記事名に半角の小括弧（丸括弧）を使用する場合に、括弧の左右が対称でないもの。
  // 注: 入れ子は2重まで。
  if (platform != 'Safari/1.x') do_check(
    "[(]([(][^()（）]*[)]|[（][^()（）]*[）]|[^()（）])*[）]|[（]([(][^()（）]*[)]|[（][^()（）]*[）]|[^()（）])*[)]",
    1, "括弧の左右が対称ではありません: %s。両方を、半角括弧か全角括弧に統一してください。",
    ["Wikipedia:即時削除の方針#リダイレクト"]);

  // 記事名に実体参照または数値文字参照を含んでいるもの。
  do_check(
    "([&][#]?[\dA-Za-z]+;)+",
    2, "記事名に実体参照を含んでいます: %s。実体参照を記事名に使うべきではありません。",
    ["Wikipedia:記事名の付け方#特殊記号の使用は慎重にすること"]);

  /*
   * 使用文字種の検査
   */

  // 技術的な考慮 (拒否)

  if (platform != 'Safari/1.x') do_check(
    "[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]",
    2, "文字でないものを含んでいます。文字でないものを記事名に使うべきではありません。");

  if (platform != 'Safari/1.x') do_check(
    "[\u0080-\u009F\uFFF0-\uFFFD\uDB40-\uDB7F]",
    2, "制御文字を含んでいます。制御文字を記事名に使うべきではありません。");

  if (platform != 'Safari/1.x') do_check(
    "[\u00A0]",
    2, "ノーブレークスペースを含んでいます。通常のスペースを使ってください。");

  if (platform != 'Safari/1.x') do_check("[\u00AD]",
    2, "ソフトハイフンを含んでいます。ソフトハイフンを記事名に使うべきではありません。");

  if (platform != 'Safari/1.x') do_check(
    "[\u2000-\u200A\u200B\u205F]",
    2, "特別な幅のスペースを含んでいます。通常のスペースを使ってください。");

  if (platform != 'Safari/1.x') do_check(
    "[\u200C\u200D\u2060]",
    2, "書式制御文字を含んでいます。一部の言語ではこの文字を使いますが、記事名には日本語を使ってください。",
    ["Wikipedia:記事名の付け方#日本語を使うこと"]);

  if (platform != 'Safari/1.x') do_check(
    "[\u2011]",
    2, "ノンプレーキングハイフンを含んでいます。ハイフンマイナス (-) を使ってください。");

  if (platform != 'Safari/1.x') do_check(
    "[\u2028-\u202E\u2061-\u206F]",
    2, "書式制御文字を含んでいます。書式制御文字を記事名に使うべきではありません。");

  if (platform != 'Safari/1.x') do_check(
    "[\u202F]",
    2, "特別な幅のノーブレークスペースを含んでいます。通常のスペースを使ってください。");

  if (platform != 'Safari/1.x') do_check(
    "[\uE000-\uF8FF\uDB80-\uDBFF]",
    2, "私用文字を含んでいます。私用文字 (外字) を記事名に使うべきではありません。");

  if (platform != 'Safari/1.x') do_check(
    "[\uFEFF]",
    2, "不可視な文字を含んでいます。この文字を記事名に使うべきではありません。");

  // その他のガイドライン等 (警告)

  if (platform != 'Safari/1.x') do_check(
    "[\u2160-\u217F]+",
    1, "ローマ数字を含んでいます: %s。これは機種依存文字です。ローマ数字は半角英字 (iやVなど) を並べて表記してください。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:表記ガイド#ローマ数字"]);

  if (platform != 'Safari/1.x') do_check(
    "[\u2460-\u2473\u24EA-\u24FF\u3251-\u325F\u32B1-\u32BF]+",
    1, "丸数字を含んでいます: %s。これは機種依存文字です。代わりに (1), (2), (3) を使用してください。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:表記ガイド#丸数字"]);

  if (platform != 'Safari/1.x') do_check(
    "[\u2474-\u24B5\u3200-\u3250\u32C0-\u32CF\u3300-\u33FF]+",
    1, "組文字を含んでいます: %s。片仮名や、漢字、英数字で表記してください。これは機種依存文字である場合もあります。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:表記ガイド#略記号", "Wikipedia:表記ガイド#文字コード"]);

  if (platform != 'Safari/1.x') do_check(
    "[\u3000]",
    1, "全角空白を含んでいます。全角空白を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#全角と半角の使い分け"]);

  if (platform != 'Safari/1.x') do_check(
    "[\uFB00-\uFEFE\uFFE0-\uFFE7\uFFE8-\uFFEF]+",
    1, "機種依存文字を含んでいます: %s。機種依存文字を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:表記ガイド#文字コード"]);

  if (platform != 'Safari/1.x') do_check(
    "[\uFF10-\uFF19]+",
    1, "全角数字を含んでいます: %s。全角英数字を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#全角と半角の使い分け"]);

  if (platform != 'Safari/1.x') do_check(
    "[\uFF21-\uFF3A\uFF41-\uFF5A]+",
    1, "全角英字を含んでいます: %s。全角英数字を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#全角と半角の使い分け"]);

  if (platform != 'Safari/1.x') do_check(
    "[\uFF00\uFF02\uFF04-\uFF07\uFF0A-\uFF0F\uFF1B\uFF20\uFF3C\uFF3E-\uFF40\uFF5F-\uFF60]+",
    1, "全角英記号を含んでいます: %s。全角英記号を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#全角と半角の使い分け"]);

  if (platform != 'Safari/1.x') if (!is_redirect) do_check( // リダイレクトでない場合のみ
    "[\uFF5E]+",
    1, "全角チルダを含んでいます。この文字は、一部の環境で正しく表示されません。波ダッシュ (〜) か、できればハイフンマイナス (-) を使ってください。波ダッシュを使った記事名へのリダイレクトを作成しようとしている場合は、この限りではありません。",
    ["Wikipedia:表記ガイド#波ダッシュ"]);

  if (platform != 'Safari/1.x') do_check(
    "[\uFF61-\uFF9F]+",
    1, "半角片仮名を含んでいます: %s。半角片仮名を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#全角と半角の使い分け"]);

  if (platform != 'Safari/1.x') do_check(
    "[\uFFA0-\uFFDF]+",
    1, "半角ハングル字母を含んでいます: %s。半角ハングル字母を記事名に使うべきではありません。",
    ["Wikipedia:即時削除の方針#リダイレクト", "Wikipedia:記事名の付け方#全角と半角の使い分け"]);
  
  if (action == 0) return false;
  return [action, reason, for_redirect];
}

/*
 * 記事名を検査した結果を表示する。
 * 引数:
 *   mark:   説明文などを挿入する場所のelement。
 *   action: 処理。
 *   reason: [[説明文, [ガイドライン等, ...]], ...]
 *   for_redirect: リダイレクトの即時削除対象でありうるかどうか。
 * 返値:
 *   なし。
 */
function TitleChecker_warn (mark, action, reason, for_redirect) {  
  var esc = function(str) {
    var e = document.createElement('div');
    e.appendChild(document.createTextNode(str));
    return e.innerHTML;
  };
  var wl = function(title) {
    title = title.replace(/_/g, ' ');
    return '<a href="/wiki/' +
      encodeURIComponent(title.replace(/ /g, '_')).replace(/%2F/g, '/').replace(/%3A/g, ':') +
      '" title="' + esc(title) + '">' +
      esc(arguments[1] || title) + '</a>';
  };

  var text = '';
  text = text +
    '<p><strong>警告: このページの記事名の付け方は、' +
    '当ウィキペディアのガイドラインなどにそっていないかもしれません。' +
    '理由は以下のとおりです。</strong></p>';
  if (reason) {
    text = text + '<ul>';
    for ( var i = 0; i < reason.length; i++) {
      text = text + '<li>' + esc(reason[i][0]);
      if (reason[i][1]) {
        var rl = [];
        for ( var j = 0; j < reason[i][1].length; j++) {
          rl.push(wl(reason[i][1][j]));
        }
        text = text + '詳しくは、' + rl.join('、') + 'を参照してください。';
      }
      text = text + '</li>';
    }
    text = text + '</ul>';
  }
  text = text +
    '<p>ガイドラインにそっていないときは、記事名の変更を検討してみてください。' +
    'なお、記事名を変更したときは、' +
    wl('特別:Whatlinkshere/' + wgPageName, 'このページのリンク元') +
    'を調べて、新しい記事へのリンクに変更するようにしてください。</p>' +
    '<p>記事名チェック機能の詳細は、' +
    wl('Help:記事名のチェック') +
    'をご覧ください。</p>';
  if (for_redirect && wgArticleId)
    text = text +
      '<p>編集中のページは' + wl('Wikipedia:リダイレクト', 'リダイレクト') + 'ですが、' +
      '即時削除に出せるかもしれません。' +
      'リダイレクトの即時削除に出すことができるのは、以下のすべてが該当する場合です。</p><ul>' +
      '<li>項目名の書き誤りで、それが誰が見ても明らかに誤りだとわかる。</li>' +
      '<li>項目が有益な履歴を持っていない。</li>' +
      '<li>項目がどこからもリンクされていない。</li>' +
      '</ul><p>リダイレクトの即時削除についての詳細は、' + wl('Wikipedia:即時削除の方針')+'を参照してください。</p>';

  var div = document.createElement('div');
  div.innerHTML = text;
  mark.parentNode.insertBefore(div, mark.nextSibling);

  return;
}

/*
 * 記事名チェッカの処理を実行する。
 * 引数:
 *   なし。
 * 返値:
 *   なし。
 */
function TitleChecker() {
  var dis = function() {
    for(var i = 0; i < arguments.length; ++i) {
      var e = document.getElementById(arguments[i]);
      if(e) e.disabled = true;
    }
  };

  // 利用者ごとの無効化。
  if (disableTitleChecker) return;

  // 検査は標準名前空間の記事に対してのみ行う。
  if (wgNamespaceNumber != 0) return;
  // 検査は利用者が新規作成または編集しようとしたときにのみ行う。
  var editform = document.getElementById('editform');
  if(!editform) return;
  
  // 検査して結果を得る。  
  var nc = TitleChecker_check(wgNamespaceNumber, wgTitle, document.getElementById('wpTextbox1').value);

  // 検査の結果、次のいずれかの処理を行う。
  // 許可: 「警告」や「拒否」に該当する処理をしない場合は、何もしない。
  if(!nc) return;
  // 拒否: 編集をできなくする。
  if (nc[0] > 1) {
    if(wgArticleId == 0) {
      editform.parentNode.removeChild(editform);
    } else {
      dis('wpSummary', 'wpMinoredit', 'wpWatchthis', 'wpSave', 'wpPreview', 'wpDiff');
      document.getElementById('wpTextbox1').readOnly = true;
    }
  }
  // 警告と拒否: 説明文を表示する。
  var mark;
  switch(skin) {
  case 'standard':
  case 'cologneblue':
  case 'nostalgia':
    mark = document.getElementById('specialpages') ?
           document.getElementById('topbar') :
           $('h1.pagetitle')[0].nextSibling;
    break;
  default:
    mark = document.getElementById('jump-to-nav') ||
           document.getElementById('contentSub');
  }
  TitleChecker_warn(mark, nc[0], nc[1], nc[2]);

  return;
}

/*
 * 以上の処理は、ページ読み込みの際に実行する。
 */
$(TitleChecker);

/* Internet Explorer に対してのみ適用 */

var prof = $.client.profile();
if (prof.name == 'msie' && prof.versionBase == '6') {
	// PNGアルファチャンネルの透過処理
	mw.loader.load(mw.config.get("wgServer") + mw.config.get("wgScript") + "?action=raw&ctype=text/javascript&title=" + mw.util.wikiUrlencode("MediaWiki:Common.js/IE60Fixes.js"), "text/javascript");
	
	// wikitableが崩れる問題への対処
	mw.loader.load(mw.config.get("wgServer") + mw.config.get("wgScript") + "?action=raw&ctype=text/javascript&title=" + mw.util.wikiUrlencode("MediaWiki:Common.js/IE60TableFixes.js"), "text/javascript");
}
if (prof.name == 'msie') {
    mw.loader.load(mw.config.get("wgServer") + mw.config.get("wgScript") + "?action=raw&ctype=text/javascript&title=" + mw.util.wikiUrlencode("MediaWiki:Common.js/IEFixes.js"), "text/javascript");
}

/*
 * サイドバーの秀逸な記事・良質な記事への言語間リンクに専用アイコンを付ける処理
 * [[Template:Link FA]]、[[Template:Link GA]]、
 * [[MediaWiki:Common.css]]、[[MediaWiki:Vector.css]] も参照
 */
 
/* set to false in Special:Mypage/common.js to switch off this "feature" */
// mw.user.options.set('linkFA_enabled', false);
 
$(function() {
    /* description that is displayed when cursor hovers FA/GA interwiki links */
    var linkFA_description = 'この記事は秀逸な記事に選ばれています';
    var linkGA_description = 'この記事は良質な記事に選ばれています';
 
    /** image to use for cologneblue, nostalgia and standard skins */
    var linkFA_bullet = '//upload.wikimedia.org/wikipedia/commons/d/d0/Monobook-bullet-star-transparent.png';
    var linkGA_bullet = '//upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Blue_star_boxed.svg/9px-Blue_star_boxed.svg.png';
 
    // early exit when disabled
    if (mw.user.options.exists('linkFA_enabled') && !mw.user.options.get('linkFA_enabled'))
        return;
 
    var skin = mw.config.get('skin');
 
    // skins that can be handled the CSS class way
    if (skin == 'vector' || skin == 'monobook' || skin == 'simple' ||
        skin == 'modern' || skin == 'myskin' || skin == 'chick')
        linkFA_CSS();
    else if (skin == 'cologneblue' || skin == 'nostalgia' || skin == 'standard')
        linkFA_decorate();
 
    /** vector, monobook, simple, modern, myskin, chick */
    function linkFA_CSS() {
        // links are to be replaced in p-lang only
        var pLang = document.getElementById('p-lang');
        if (!pLang) return;
 
        var lis = pLang.getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            var className = li.className.match(/interwiki-[-\w]+/);
            // only links with a corresponding Link_FA/GA template are interesting
            if (document.getElementById(className + '-fa')) {
                li.className += ' FA';
                li.title = linkFA_description;
                continue;
            }
            if (document.getElementById(className + '-ga')) {
                li.className += ' GA';
                li.title = linkGA_description;
                continue;
            }
        }
    }
 
    /** cologneblue, nostalgia, standard */
    function linkFA_decorate() {
        // these root elements can contain FA/GA links
        var rootIds = ['topbar', 'footer'];
        for (var i = 0; i < rootIds.length; i++) {
            var root = document.getElementById(rootIds[i]);
            if (!root) continue;
 
            // if the root exists, iterate all the links within
            var links = root.getElementsByTagName('a');
            for (var j = 0; j < links.length; j++) {
                var link = links[j];
                var lang = link.hostname.split('.')[0];
                // only decorate a FA/GA link
                if (document.getElementById('interwiki-' + lang + '-fa')) {
                    decorate(link, linkFA_bullet, linkFA_description);
                    continue;
                }
                if (document.getElementById('interwiki-' + lang + '-ga')) {
                    decorate(link, linkGA_bullet, linkGA_description);
                    continue;
                }
            }
        }
    }
 
    /** modify a link to show the FA- or GA-icon (older) */
    function decorate(link, bullet, description) {
        // build an image-node
        var img = document.createElement('img');
        img.setAttribute('src', bullet);
        img.setAttribute('alt', description);
        img.setAttribute('style', 'margin-right: 0.2em;');
 
        // decorate the link with the image
        link.appendChild(img);
        link.appendChild(link.removeChild(link.firstChild));
        link.setAttribute('title', description);
    }
});

/*
 * modifyEditsection
 * (1) 冒頭部編集用のセクション編集リンクをつける
 * (2) セクション編集リンクをセクション・ヘッドラインの右に移動させる
 * (3) トランスクルードされたセクションのセクション編集リンクを拡張する
 *
 *   dbenzhuser (de:Benutzer:Dbenzhuser)
 *   Alex Smotrov (en:User:Alex Smotrov)
 *   TheDJ (en:User:TheDJ)
 *   mizusumashi (ja:User:Mizusumashi)
 */

function modifyEditsection(){
    // メッセージのセットアップ
    var messages = {};
    
    messages['en'] = {  'edit'          : 'edit',
                        'topEditDescription'  : 'Edit lead section',
                        'openTitle'          : 'open',
                        'openDescription'     : 'Open "$1#$2"',
                        'historyTitle'       : 'history',
                        'historyDescription'  : 'Past version of "$1"',
                        'watchTitle'         : 'watch',
                        'watchDescription'    : 'Add "$1" to your watchlist',
                        'unwatchDescription'  : 'Remove "$1" from your watchlist',
                        'purgeTitle'         : 'purge',
                        'purgeDescription'    : 'Clear the cache of "$1" and view the last version of "$2"' }
    
    messages['ja'] = {  'editTitle'          : '編集',
                        'topEditDescription'  : '導入部を編集',
                        'openTitle'          : '閲覧',
                        'openDescription'     : '「$1#$2」を閲覧"',
                        'historyTitle'       : '履歴',
                        'historyDescription'  : '「$1」の履歴',
                        'watchTitle'         : 'ウォッチ',
                        'watchDescription'    : '「$1」をウォッチリストに追加',
                        'unwatchDescription'  : '「$1」をウォッチリストから削除',
                        'purgeTitle'         : '更新',
                        'purgeDescription'    : '「$1」を更新し、「$2」の最新版を反映' }

    messages['fr'] = {  'topEditDescription'  : 'Modifier le résumé introductif' }

    messages['it'] = {  'topEditDescription'  : 'Modifica della sezione iniziale' }
    
    
    // コード全体を通して使う値の設定
    var pageUri = encodeURIComponent(wgPageName);
    
    var heading = document.getElementById('firstHeading')      // simple, chick, vector, myskin, modern, monobook
                    || $('h1.pagetitle')[0];
                                                                // standard, cologneblue, nostalgia
                    /* || document.getElementsByTagName('h1')[0] */;   // others - フェールセーフ用
                    
    var edits = $('span.editsection');
    
    // editsection が存在しなければ何もしない。
    // 冒頭編集リンクもつけないのは、過去版閲覧時などに付与してしまうことを避けるため。
    if(!edits.length){
        return;
    }
    
    
    // 動作条件の設定
    
    // 冒頭編集リンクの設置を行うか
    // topEditsectionEnable = true を設定していれば、機能を有効化できる
    var top = typeof topEditsectionEnable != 'undefined' && topEditsectionEnable;
    
    // セクション編集リンクの移動を行うか
    // moveEditsectionDisable = true を設定していれば、機能を無効化できる
    var move = typeof moveEditsectionDisable == 'undefined' || ! moveEditsectionDisable;
    
    // セクション編集リンクの拡張を行うか
    // expandEditsectionDisable = true を設定していれば、機能を無効化できる
    var expand = (typeof expandEditsectionDisable == 'undefined' || ! expandEditsectionDisable)
                    && (wgNamespaceNumber == 4 || wgNamespaceNumber % 2 == 1);
    
    
    // デバック・モード
    // expandEditsectionDebug = true をユーザースクリプトで設定していれば、機能を有効化できる
    var debug = typeof modifyEditsectionDebug != 'undefined' && modifyEditsectionDebug;
    
    
    // すべての機能が無効にされていれば、ここで脱出
    if(!top && !move && !expand){
        return;
    }
    
    
    // メッセージのセットアップ(承前)
    if(! messages[wgUserLanguage]){
        messages[wgUserLanguage] = {};
    }
    
    if(! messages[wgUserLanguage]['editTitle'] && edits.length){
        messages[wgUserLanguage]['editTitle'] = edits[0].getElementsByTagName('a')[0].innerHTML;
    }
    
    var ca = function(key){
        var span = document.getElementById('ca-' + key);
        if(span){
            var aTags = span.getElementsByTagName('a');
            if(aTags.length){
                var spanTags = span.getElementsByTagName('span');
                if(spanTags.length){
                    return spanTags[0].innerHTML.toLowerCase();
                } else {
                    return aTags[0].innerHTML.toLowerCase();
                }
            }
        }
        return null;
    }
    
    if(! messages[wgUserLanguage]['editTitle']){
        messages[wgUserLanguage]['editTitle'] = ca('edit');
    }
    
    if(! messages[wgUserLanguage]['historyTitle']){
        messages[wgUserLanguage]['historyTitle'] = ca('history');
    }
    
    var message = function(key){
        return messages[wgUserLanguage][key] || messages['en'][key];
    }
    
    
    // ここから本体の動作
    
    
    // 冒頭編集リンクの設置
    if( top ){
        var topEdit = document.createElement('span');
        var topEditA = document.createElement('a');
        topEditA.appendChild(document.createTextNode(message('editTitle')));
        topEditA.href = wgScript + '?title=' + pageUri + '&action=edit&section=0';
        topEditA.title = message('topEditDescription');
        
        topEdit.appendChild(document.createTextNode('['));
        topEdit.appendChild(topEditA);
        topEdit.appendChild(document.createTextNode(']'));
        
        if(move){
            topEdit.className = 'editsection-moved';
            heading.appendChild(document.createTextNode(' '));
            heading.appendChild(topEdit);
        }else{
            topEdit.className = 'editsection';
            heading.insertBefore(document.createTextNode(' '), heading.firstChild);
            heading.insertBefore(topEdit, heading.firstChild);
        }
    }
    
    
    // 以下、セクション編集リンクの移動と拡張
    // セクション編集リンクの移動と拡張が無効にされていれば、ここで脱出
    if(!move && !expand){
        return;
    }
    
    
    // セクション編集リンクを処理していくループ
    var expanded = {};
    for (var i = 0; i < edits.length; i++) {
        var parent = edits[i].parentNode;
        var debugMsg = '';
        
        // セクション編集リンクの移動
        if(move){
            parent.removeChild(edits[i]);
            if( /(^|\s)editsection($|\s)/.test(edits[i].className) ){
                edits[i].className =
                    RegExp.leftContext
                    + RegExp.$1 + 'editsection-moved' + RegExp.$2
                    + RegExp.rightContext;
            }
            parent.appendChild(document.createTextNode(' '));
            parent.appendChild(edits[i]);
        }
        
        
        // セクション・リンクの拡張が無効にされていれば、ここでループ折り返し
        if(! expand){
            continue;
        }
        
        
        // 以下の処理は、セクション・リンクの拡張
        var a = edits[i].getElementsByTagName('a')[0];
        
        // トランスクードされたのではないセクションは拡張しない
        if(! a.href.match('&section=T')){
            expanded = {};
            continue;
        }
        
        
        a.href.match(/\?title=([^&]+).+/);
        var transUri = RegExp.$1;
        var level = Number(parent.tagName.replace(/h/i, ''));
        
        
        // 以前に同じページからのトランスクルードがあり、かつセクション・レベルが下がっていれば、拡張しない
        if(expanded[transUri] && level > expanded[transUri]){
            continue;
        }
        
        expanded[transUri] = level;
        
        var section = $('span.mw-headline', parent)[0].innerHTML
                        .replace(/^(\s|(&nbsp;))*/, '').replace(/(\s|(&nbsp;))*$/, '');
        var transTitle = a.title;

        // セクションID（http//...#*** の *** の部分）を取得
        // MediaWiki のバージョンにけっこう依存。1.16alpha-wmf (r56620) では、このコードで取得できる
        // 失敗した場合は、セクションタイトルから自力で生成した transId を使う
        var sectionId = null;
        
        var headline = $('span.mw-headline', parent);
        if(headline){
            headline = headline[0];
            if(headline.id){
                sectionId = headline.id;
            }
        }
        
        if(! sectionId){
            debugMsg += 'sectionId が取得できませんでした。';
        }
        
        
        // セクションタイトルから自力でIDを生成
        // これは、セクションタイトルが重複した場合に区別するための末尾の「_2」がない
        // (1) [閲覧]リンクのリンク先につかう
        //          リンク先（読み込み元）でセクションタイトルが重複しているのか、
        //          重複しているのであれば何番目なのかはわからないから、
        //          重複していないと仮定してこちらを使う
        // (2) sectionId の取得に失敗した場合に使う
        //          フェールセーフ
        var transId
                = encodeURIComponent
                        (section
                            .replace(/ /g, '_')
                            .replace(/&amp;/g, '&')
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>'))
                    .replace(/%/g, '.')
                    .replace(/!/g, '.21')
                    .replace(/'/g, '.27')
                    .replace(/\(/g, '.28')
                    .replace(/\)/g, '.29')
                    .replace(/\*/g, '.2A')
                    .replace(/\.3A/g, ':');
        
        
        var extensions = document.createElement('span');
        extensions.className = 'editsection-extensions';
        
        var open = document.createElement('a');
        open.appendChild(document.createTextNode(message('openTitle')));
        open.href = wgScript + '?title=' + transUri + '&action=view#' + transId;
        open.title = message('openDescription').replace('$1', transTitle).replace('$2', section);

        extensions.appendChild(document.createTextNode('['));
        extensions.appendChild(open);
        extensions.appendChild(document.createTextNode(']'));
        
        var history = document.createElement('a');
        history.appendChild(document.createTextNode(message('historyTitle')));
        history.href = wgScript + '?title=' + transUri + '&action=history';
        history.title = message('historyDescription').replace('$1', transTitle);
        
        extensions.appendChild(document.createTextNode('['));
        extensions.appendChild(history);
        extensions.appendChild(document.createTextNode(']'));
        
        if(wgUserName != null){
            var watch = document.createElement('a');
            watch.appendChild(document.createTextNode(message('watchTitle')));
            watch.href = wgScript + '?title=' + transUri + '&action=watch';
            watch.title = message('watchDescription').replace('$1', transTitle);
            
            var unwatch = document.createElement('a');
            unwatch.appendChild(document.createTextNode('-'));
            unwatch.href = wgScript + '?title=' + transUri + '&action=unwatch';
            unwatch.title = message('unwatchDescription').replace('$1', transTitle);
            
            extensions.appendChild(document.createTextNode('['));
            extensions.appendChild(watch);
            extensions.appendChild(document.createTextNode('('));
            extensions.appendChild(unwatch);
            extensions.appendChild(document.createTextNode(')]'));
            
            if(wgAction != 'purge'){
                var purge = document.createElement('a');
                purge.appendChild(document.createTextNode(message('purgeTitle')));
                purge.href = wgScript + '?title=' + pageUri + '&action=purge#' + (sectionId || transId);
                purge.title = message('purgeDescription').replace('$1', wgPageName).replace('$2', transTitle);
                
                extensions.appendChild(document.createTextNode('['));
                extensions.appendChild(purge);
                extensions.appendChild(document.createTextNode(']'));
            }
            
            if(debug && debugMsg){
                debugSignal = document.createElement('span');
                debugSignal.appendChild(document.createTextNode('*'));
                debugSignal.title = debugMsg;
                extensions.appendChild(debugSignal);
            }
        }
        
        edits[i].appendChild(extensions);
    }
}

if( (wgAction == 'view' || wgAction == 'purge') && wgNamespaceNumber >= 0 ){
    $(modifyEditsection);
}

/** Magic editintros ****************************************************
 *
 *  Description: 特定カテゴリの記事の編集画面にヘッダテンプレートを表示する
 *               （編集リンクに "&editintro=Template:hogehoge" を付加する）
 *  Maintainers: [[利用者:Cpro]]
 */
 
// カテゴリ名と表示テンプレートの対応テーブル。名前空間は書かない。
var CATEGORY_EDITINTRO_TABLE = {
	'存命人物': 'BLP editintro' ,
	'学校記事': '学校記事 editintro' /* ,
	'カテゴリ名': 'テンプレート名' */
};
 
function addEditIntro(templateName) {
	var editURI = wgScript + '?title=' + encodeTitle(wgPageName) + '&action=edit';

	var searchIds = { //外装ごとの検索対象要素のID
		'chick'       : ['ca-edit', 'bodyContent'],
		'cologneblue' : ['quickbar', 'footer', 'article'],
		'modern'      : ['ca-edit', 'mw_contentholder'],
		'monobook'    : ['ca-edit', 'bodyContent'],
		'myskin'      : ['ca-edit', 'bodyContent'],
		'nostalgia'   : ['topbar', 'footer', 'article'],
		'simple'      : ['ca-edit', 'bodyContent'],
		'standard'    : ['topbar', 'quickbar', 'footer', 'article'],
		'vector'      : ['ca-edit', 'bodyContent']
	};
	var ids = searchIds[skin] || searchIds['monobook']; //未知の外装はとりあえずmonobookと同じ構造を期待

	for(var i = 0; i < ids.length; i++) {
		var el = document.getElementById(ids[i]);
		if(!el) continue;

		var aElements = el.getElementsByTagName('a');
		for(var j = 0; j < aElements.length; j++) {
			if(aElements[j].href.indexOf(editURI) >= 0) {
				aElements[j].href += '&editintro=' + encodeTitle(templateName);
			}
		}
	}

	function encodeTitle(title) {
		return encodeURIComponent(title.replace(/ /g, '_')).replace(/%2F/gi, '/').replace(/%3A/gi, ':');
	}
}

if (wgNamespaceNumber == 0) {
	$(function(){
		var catIds = ['mw-normal-catlinks', 'mw-hidden-catlinks'];
		for(var i = 0; i < catIds.length; i++) {
			var catContainer = document.getElementById(catIds[i]);
			if(!catContainer) continue;

			var cats = catContainer.getElementsByTagName('a');
			for(var j = 0; j < cats.length; j++) {
				var ei;
				if(ei = CATEGORY_EDITINTRO_TABLE[cats[j].innerHTML]) {
					addEditIntro('Template:' + ei);
					return;
				}
			}
		}
	});
}

// 検索ボックス入力時の全角・半角文字正規化
importScript('MediaWiki:Common.js/NormalizeCharWidth.js');

/*
 * 要約欄でエンターキーを押した際に投稿されないようにする
 * 
 * window.summaryEnterRejectDisable - 
 *   この機能を無効化させるには jQuery.ready() が呼び出されるまでに true にする
 */
jQuery( document ).ready( function( $ )
{
  // 未定義であるか、無効化されてなければ
  if ( typeof summaryEnterRejectDisable === 'undefined' || summaryEnterRejectDisable == false )
  {
    // キーが押されたとき
    $( "#wpSummary" ).keypress( function( e )
    {
      // エンターキーならば
      if ( e.keyCode == 13 )
      {
        // イベントをキャンセル
        e.preventDefault();
      }
    });
 
    // アクセシビリティを考慮
    $( "#wpSave" ).css( "font-weight" , "normal" );
  }
});

/*
 * 拡張型折りたたみ要素(EnhancedCollapsibleElements)
 * 説明書：[[ヘルプ:拡張型折りたたみ可能要素]]
 */
importScript('MediaWiki:EnhancedCollapsibleElements.js');

/* == Username replace function ==
 * Inserts user name into <span class="insertusername"></span>
 * Originally by [[uncyclopedia:User:Splaka|Splaka]], updated by same.
 * disable with:   var disableUsernameReplace = true;
 */
 
function UsernameReplace() {
  if(window.disableUsernameReplace || wgUserName == null) return;
  var un = $('span.insertusername');
  for (var i=0;i<un.length;i++) {
    var d = 0;
    for(var j=0;j<un[i].childNodes.length;j++) {
      if(un[i].childNodes[j].nodeType == 3 && d < 1) {
        //find first text node and replace;
        un[i].childNodes[j].nodeValue = wgUserName;
        d++;
      }
    }
  }
}
$(UsernameReplace);

// </source>