function showEras(className) {
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;
 
    var titleDiv = document.getElementById(className);
 
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

$(function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  if (wgUserName === null) {
    $('span.insertusername').text("Moorhuhn Freund");
  } else {
    $('span.insertusername').text(wgUserName);
  }
});
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "Einklappen";
 var expandCaption = "Ausklappen";
 
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
     }
 }
 
 $( createCollapseButtons );
 
// onload stuff
var firstRun = true;
 
function loadFunc()
{
    if(firstRun)
        firstRun = false;
    else
        return;
 
    initFunctionsJS();
    if(document.getElementById('mp3-navlink') != null)
    {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }
 
    if(window.storagePresent)
        initVisibility();
 
    fillEditSummaries();
    fillDeleteReasons();
    fillPreloads();
 
    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;
 
    if(!bodyClass || (bodyClass.indexOf('page-') == -1))
    {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }
 
    if(typeof(onPageLoad) != "undefined")
    {
        onPageLoad();
    }
}
 
function fillEditSummaries()
{
    var label = document.getElementById("wpSummaryLabel");
 
    if(label == null)
        return;
 
    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;
 
    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}
 
function onStdSummaryChange()
{
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value != "")
        document.getElementById("wpSummary").value = value;
}
 
function fillDeleteReasons()
{
    var label = document.getElementById("wpReason");
 
    if(label == null)
        return;
 
    label = document.getElementById("contentSub");
 
    if(label == null)
        return;
 
    var comboString = "<br /><select id='stdReasons' onchange='onStdReasonChange()'>";
    comboString += "</select>";
    label.innerHTML += comboString;
 
    requestComboFill('stdReasons', "Template:Stdreasons");
}
 
function onStdReasonChange()
{
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value != "")
        document.getElementById("wpReason").value = value;
}
 
function fillPreloads()
{
    var div = document.getElementById("lf-preload");
 
    if(div == null)
        return;
 
    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');
 
    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
 
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';
 
    requestComboFill('stdPreloads', "Template:Stdpreloads");
}
 
function doCustomPreload() {
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}
 
function onPreloadChange() {
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value == "")
        return;
 
    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
}
 
function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest(); //Not Internet Explorer
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
	} else {
		//fail silently
	}
}
 
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 30000;

mw.loader.using( ['jquery.ui.tabs'], function() {
	$(document).ready(function() {
		var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
		$("[class^=portal_sliderlink]").click(function() { // bind click event to link
    		var num = this.className.replace("portal_sliderlink_", "").replace(" jump","");    
    		$tabs.tabs('select', num );
    		$('.jump').text('·');
    		$('.portal_sliderlink_' + num + '.jump').text('•');
    		return false;
		});
		$('#portal_next').click(function() {
    		var num = ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1;
    		$tabs.tabs('select', num ); // switch to next tab
    		$('.jump').text('·');
    		$('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    		return false;
		});
		$('#portal_prev').click(function() { // bind click event to link
    		var num = ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1;
    		$tabs.tabs('select', num ); // switch to previous tab
    		$('.jump').text('·');
    		$('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    		return false;
		});
	});
});
// **************************************************
//  - end -  Experimental javascript countdown timer
// *************************************************

$($("#title-eraicons").contents()).insertBefore("#WikiaPageHeader > h1");

function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).show ();
						break;
					default:
						$( '#backtotop' ).fadeIn ();
						break;
				}
			} else {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).hide ();
						break;
					default:
						$( '#backtotop' ).fadeOut ();
						break;
				}					
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
	$('<li id="backtotop" style="position: absolute; right:20px; top:1px; border:none;"><button style="height: 20px;" type="button" value="Back To Top" onClick="goToTop();">Zum Seitenanfang</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
	hideFade ();
}	

var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
 
if( typeof ToggleFading == "number" ) {
	FadeSwitch = ToggleFading;
}

var AbstimmungObj = document.getElementById('WikiaArticle').getElementsByTagName('div');
for (var i = 0; i < AbstimmungObj.length; i++){
	if (AbstimmungObj[i].className == 'Abstimmung' && wgUserName) 
		AbstimmungObj[i].style.display = 'block';
}