/* Konfiguracja tooltipów */
var tooltips_list = [
    {
        classname: 'page-tooltip',
        parse: '{'+'{:<#page#>|tooltip=<#page#>}}',
        onParsed: function() {
            var text = $(this).find('.tooltip-content').html();
            if(text) {
                $(this).html(text);
                $(this).find('a.new').removeClass('new');
            } else {
                $(this).html('').addClass('empty-tooltip');
            }
        }
    }
]

/* Import skryptów */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});

// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}

// prototype functions
function $A(a) {
var r = [];
for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
return r;
}

Function.prototype.bind = function() {
var __method = this, args = $A(arguments), object = args.shift();
return function() { return __method.apply(object, args.concat($A(arguments))) };
}

/* Test if an element has a certain class **************************************
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/** Collapsible tables *********************************************************
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
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

/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages.
 */
 
function addEditIntro(name)
{
  var el = document.getElementById('control_edit');
  if (!el)
    return;
  el = el.getElementsByTagName('a')[0];
  if (el)
    el.href += '&editintro=' + name;
}
 
 
if (wgNamespaceNumber == 0) {
  addOnloadHook(function(){
    if (document.getElementById('disambigbox'))
      addEditIntro('Template:Disambig_editintro');
  });
}

/*********************************************/
/* chat module compatibility by User:Tierrie */
/* opens Special:Chat in the same window as  */
/* created by ChatModule regardless of skin  */
/* used                                      */
/*********************************************/
// window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes')
$(function(){
  $('a[href*="http://dragonage.wikia.com/wiki/Special:Chat"]').click(function(event){
    window.open($(this).attr('href'), 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    event.preventDefault();
  });
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );


/****************************/
/* spoilers by User:Tierrie */
/****************************/
var showSpoiler = new Array();
function showSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    // allows the child to be something besides a div (a table for example)
    if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('show_warning','hide_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('hide_spoiler','show_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=1; path=/';
}

function hideSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {

    // allows the child to be something besides a div (a table for example)
    if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=0; path=/';
}
 
function toggleSpoilers(ev) {
  var splrType=this.className.split('_')[1];
  showSpoiler[splrType] = showSpoiler[splrType]?0:1;
  if(showSpoiler[splrType])
    showSpoilers(splrType);
  else 
    hideSpoilers(splrType);
  //ev.target.focus(); /* focus back on the element because large spoilers tend to move the page around */
}
 
function initSpoilers() {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    if (hasClass(Divs[i], 'splr')) {
      Divs[i].childNodes[0].onclick = toggleSpoilers;

      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
 
  var cookies = document.cookie.split("; ");
  for (var i=0; i < cookies.length; i++) {
    // a name/value pair (a crumb) is separated by an equal sign
    if(cookies[i].indexOf('showspoiler')!=-1) {
      var crumbs = cookies[i].split("=");
      var splrType = crumbs[0].split('_')[1]; /* cookie="showspoiler_dao=1", crumbs[0] = "showspoiler_dao", splrType="dao" */
      var splrValue = parseInt(crumbs[1]);
 
      showSpoiler[splrType]=splrValue;
      if(splrValue)
        showSpoilers(splrType);
      else
        hideSpoilers(splrType);
    }
  }
}
 
var spoilers = true;
function loadSpoilers() {
  if(spoilers) initSpoilers();
}
addOnloadHook(loadSpoilers);


/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]] and [[User:Monchoman45|Monchoman45]]
 ********************************************************************/
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
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
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/******************************/
/* changes the redirect image */
/******************************/
function ChangeRedirectImage() {
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/__cb20100902033555/dragonage/images/b/b5/Redirectltr.png');
}
addOnloadHook(ChangeRedirectImage);
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF CODE
///////////////////////////////////////////////////////////////////////////////////////////////////////////