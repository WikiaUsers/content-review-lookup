/** COMMON.JS **
 * Plik zawiera funkcje używane w innych skryptach. Edytuj ostrożnie!
 * <pre><nowiki>
 ** - SŁOWNIK UŁATWIAJĄCY PISANIE SKRYPTU **/
var
	editform = (document.forms.editform)?document.forms.editform:null,
	deleteconfirm = (document.forms.deleteconfirm)?document.forms.deleteconfirm:null,
	TextBox = (null!=editform)?editform.wpTextbox1:'',
	OpisZmian = (null!=editform)?editform.wpSummary:'',
	DrobnaZmiana = (null!=editform)?editform.wpMinoredit:'',
	GuzikZapisz = (null!=editform)?editform.wpSave:'',
	deleteReason= (null!=deleteconfirm)?deleteconfirm.wpReason.value:'',
	Non = {},
	copywarn = document.getElementById('editpage-copywarn'),
	displayFlashOverride = !1;
	Gettext = !1;
(null!=deleteconfirm)&&(deleteconfirm.wpDeleteReasonList.onchange=function(){document.forms.deleteconfirm.wpReason.value="other"!=document.forms.deleteconfirm.wpDeleteReasonList.value?"":deleteReason;console.log(document.forms.deleteconfirm.wpDeleteReasonList.value)});

/** - PODSTAWOWE FUNKCJE **/
function inGroup(a){var b=0;for(i in wgUserGroups)wgUserGroups[i]==a&&(b=1);return b}
function returnObjById(a){var b=null;document.getElementById?b=document.getElementById(a):document.all?b=document.all[a]:document.layers&&(b=document.layers[a]);return b}
var hasClass=function(){
var a={};return function(b,c){return(a[c]?a[c]:a[c]=RegExp("(?:\\s|^)"+c+"(?:\\s|$)")).test(b.className)}
}();
function impzWiki(wk, st) {importScriptURI('http://'+wk+'.org/w/index.php?title='+st+'&action=raw&ctype=text/javascript');}
/* Archiwizacja Porum */
function zipForum(){
if(!("Forum"!=wgCanonicalNamespace||"view"!=wgAction||"Strona główna"==wgTitle))if(!document.getElementById("naglowekforum")||document.getElementById("nieodkopuj"))$("#ca-edit a")[0].style.color="DarkKhaki",$("#ca-edit a")[0].href="",$("#ca-edit a")[0].title="Ten wątek jest archiwalny, prosimy o nieedytowanie go."
}
/* Wyświetlenie nazwy użytkownika ([[Szablon:USERNAME]]) */
function UserNameReplace(){if(!("undefined"!=typeof disableUsernameReplace&&disableUsernameReplace||null==wgUserName)){
var a=YAHOO.util.Dom.getElementsByClassName("insertusername","span",document.getElementById("bodyContent")),b;for(b in a)a[b].innerHTML=wgUserName
}}
/* Import CSS i Wyświetlany przycisk do usuwania */
function cssYmport(){document.getElementById("cssimp")&&importStylesheet(document.getElementById("cssimp").textContent)}
function EKNuke(){1==inGroup("sysop")&&$(".nuke").css("display","inline")}

YAHOO.util.Event.onContentReady('column-one', zipForum);
addOnloadHook(UserNameReplace);
addOnloadHook(function() {$('.usercheck#' + wgUserName).css('display', 'inline');});
$(document).ready(cssYmport);
$(document).ready(EKNuke);
$(document).ready(function() {$('input#searchInput').attr({'placeholder': 'Szukaj'});});

/*** IMPORTY SKRYPTÓW ***/
importScript('MediaWiki:Dynamiczne_adresy_IP.js');
importScript('MediaWiki:Glosowanie.js');

/*** Skrypty dotyczące Gry ***/
/* Zmiana tytułu "Gra:Gra" na samo "Gra" */
$("#firstHeading").ready(function() {if($("#firstHeading").html() == "Gra:Gra") {$("#firstHeading").html("Gra");}});

/* BEGIN Dynamic Navigation Bars (experimantal)
 * pochodzi z http://en.wikipedia.org/wiki/MediaWiki:Monobook.js
 * autorzy: http://en.wikipedia.org/w/index.php?title=MediaWiki:Monobook.js&action=history
 * licencja: GFDL
 */
// set up the words in your language
 var NavigationBarHide = '[ Ukryj ]';
 var NavigationBarShow = '[ Pokaż ]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1; 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {return false;}
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
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
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
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
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
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
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar && !wgTitle.match(/Najbardziej poszablonowana/)) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
YAHOO.util.Event.onContentReady('bodyContent', createNavigationBarToggleButton);
 
/** Collapsible tables **
 *  Description: Allows tables to be collapsed, showing only the header. See
 *  [[en:Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "Ukryj";
var expandCaption = "Pokaż";
 
function collapseTable( tableIndex ) {
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
function createCollapseButtons() {
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
 
        Button.style.styleFloat = "right";
        Button.style.cssFloat = "right";
        Button.style.fontWeight = "normal";
        Button.style.textAlign = "right";
        Button.style.width = "6em";
 
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
jQuery(document).ready( createCollapseButtons );

/* Zmiana tytułu strony, autor: [[user:Vae]], Public Domain   */
/* Użycie: {{nibytytul|Przykladowy tytul}}                    */
/*         {{nibytytul|Przykladowy tytul|sub=Podtytul}}       */
 
function uChangeTitle(){
    var staryTytul=null;
    staryTytul=returnObjById("firstHeading"); /* monobook */
    if(!staryTytul) {
        var h1=document.body.getElementsByTagName("h1");
        staryTytul = h1[0];
    }
    var nowyTytul=null;
    nowyTytul=returnObjById("uTytulStrony");
    if(nowyTytul && staryTytul){
        // sprawdzamy, czy zawiera cudzyslowy (np. strona edycji)
        // jesli tak, podmieniamy tylko zawartosc cudzyslowow
        if(staryTytul.innerHTML.match(/^.*?„.*?”.*?$/))
                staryTytul.innerHTML=staryTytul.innerHTML.replace(/^(.*?)„.*?”(.*?)$/,"$1"+"„"+nowyTytul.innerHTML+"”"+"$2");
        else if(staryTytul.innerHTML.match(/<span>/i))
            staryTytul.innerHTML=staryTytul.innerHTML.replace(/^(.*?)<span>/,returnObjById("uTytulStrony").innerHTML+"<span>");
        else
            staryTytul.innerHTML=returnObjById("uTytulStrony").innerHTML;
        staryTytul.style.backgroundColor=nowyTytul.style.backgroundColor;
        staryTytul.style.color=nowyTytul.style.color;
        // sprawdzamy, czy podtytul tez jest do zamiany
        var ssub = returnObjById("uPodtytulStrony");
        var sub = returnObjById("siteSub");
        if(ssub && ssub.innerHTML && sub) {
            sub.innerHTML=ssub.innerHTML;
        }
    }
 
    if(returnObjById("uLogoStrony")) {
        var a=(skin=="monobook")?returnObjById("p-logo").getElementsByTagName('a')[0]:returnObjById("wiki_logo");
        a.style.backgroundImage="url("+returnObjById("uLogoStrony").getElementsByTagName('img')[0].src+")";
    }
    return;
}
addOnloadHook(uChangeTitle);
 
/* komentarz w formularzu rejestracji */
YAHOO.util.Event.onContentReady('userlogin2', function(){
	$('#wpNameTD')[0].innerHTML+='<p style="font-size:9pt;">Nazwa użytkownika <b>może</b> zawierać spacje oraz polskie znaki.</p>';
	$('#wpEmailTD')[0].innerHTML+='<p style="font-size:9pt;">Podanie adresu e-mail nie jest obowiązkowe. Będzie on jednak porzebny, jeśli zapomnisz hasła.</p>';
});

/** Embed flash movies. Wymaga [[Szablon:Flash]] **
 * Pozwala wstawić animacje Flash w atykule. Zobacz [[Szablon:Flash]]
 * By [[:en:User:Olipro|Olipro]], spolszczenie: [[User:Optdex|Optdex]]
 */
var flashOk;
function embedFlashMovie( flashOk ) {
    mainbody = document.getElementById( 'bodyContent' );
    mainbody.innerHTML = contentTempHolder;
    spancheck = document.getElementsByTagName( 'span' );
    for( i = 0; i < spancheck.length; i++ ) {
        if( spancheck[i].getAttribute( 'id' ) != 'embedFlashDoc' ) {
            continue;
        }
        obj = spancheck[i].innerHTML.split( '@' );
        flwidth = obj[0];
        flheight = obj[1];
        flfile = obj[2].replace( 'fullurl://', 'http://' );
        flopen = 'Uruchom animację Flash';
        flclose = 'Zamknij animację Flash';
        showFlash = ' ';
        if( flashOk ) {
            showFlash = '<a style="color:inherit" href="javascript:embedFlashMovie(false)"><button onClick="embedFlashMovie(false)">' + flclose + '</button></a>';
            showFlash += '<div align="center" style="clear:both;">';
            showFlash += '<object width="' + flwidth + '" height="' + flheight + '"';
            showFlash += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
            showFlash += 'codebase="http://fpdownload.macromedia.com/pub/';
            showFlash += 'shockwave/cabs/flash/swflash.cab#version=8,0,0,0">';
            showFlash += '<param name="movie" value="' + flfile + '" />';
            showFlash += '<embed src="' + flfile + '" width="' + flwidth + '" height=';
            showFlash += '"' + flheight + '" type="application/x-shockwave-flash" ';
            showFlash += 'pluginspage="http://www.macromedia.com/go/getflashplayer" />';
            showFlash += '</object></div>';
        } else {
            showFlash = '<a style="color:inherit" href="javascript:embedFlashMovie(true)"><button onClick="embedFlashMovie(true)">' + flopen + '</button></a>';
        }
        spancheck[i].innerHTML = showFlash;
        spancheck[i].style.display = 'inline';
    }
}

var contentTempHolder;
function embedFlashCheck(){
$("#embedFlashDoc")[0]&&(mainbody=$("#bodyContent")[0],contentTempHolder=mainbody.innerHTML,"undefined"!=typeof displayFlashOverride?embedFlashMovie(displayFlashOverride):(askmessage="<b>Coś widocznie się popsuło. Element Flash nie może być w tej chwili wyświetlony.</b>",mainbody.innerHTML=askmessage))
}
addOnloadHook( embedFlashCheck );

/* Skrypt dla Szablon:Galeria */
function toggleImage (group, remindex, shwindex) {
	jQuery("#ImageGroupsGr" + group + "Im" + remindex).hide();
	jQuery("#ImageGroupsGr" + group + "Im" + shwindex).show();
}
function ImageGroup() {
	jQuery('div.ImageGroup').each(function(i, group) {
		var unitnode = jQuery('div.ImageGroupUnits', group).get(0);
		if (unitnode == undefined) {
			return 1;
		}
		var units = jQuery(unitnode).children('.center');
		var count = units.get().length;
		if (count <= 1) {
			return 1;
		}
		units.each(function(j, currentimage) {
			jQuery(currentimage).attr('id', "ImageGroupsGr" + i + "Im" + j);
			var leftlink = jQuery('<a href="#"/>');
			if (j != 0) {
				leftlink.text('◀').click(function() {
					toggleImage(i, j, j - 1); return false;
				});
			}
			var rightlink = jQuery('<a href="#"/>');
			if (j != count - 1) {
				rightlink.text('▶').click(function() {
					toggleImage(i, j, j + 1); return false;
				});
			}
			jQuery('<div/>').css({ 'font-size' : '110%', 'font-weight' : 'bold' })
				.append(leftlink)
				.append('<tt>(' + (j + 1) + '/' + count +  ')</tt>')
				.append(rightlink)
				.prependTo(jQuery(currentimage));
			if (j != 0) {
				jQuery(currentimage).hide().addClass('noprint');
			}
		});
	});
}
jQuery(document).ready(ImageGroup);

/* </nowiki></pre> */