//============================================================
// Insertion de nouveaux boutons dans la barre d'outils
//============================================================

//Remplit la variable mwCustomEditButtons  pour ajouter des boutons à la barre d'outils

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
/* Not supported on UCP
   mwCustomEditButtons[mwCustomEditButtons.length] =
    {"imageId": imageId,
     "imageFile": imageFile,
     "speedTip": speedTip,
     "tagOpen": tagOpen,
     "tagClose": tagClose,
     "sampleText": sampleText};
*/
}
 
addCustomButton('https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png','Liste numérotée','\n# élément 1\n# élément 2\n# élément 3','','');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png','Liste','\n* élément A\n* élément B\n* élément C','','');

addCustomButton('https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png','Tableau','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png','Block quote','<blockquote style="border: 1px solid blue; padding: 2em;">','</blockquote>','Block quote');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png','Rayer','<s>','</s>','texte rayé');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/5/56/Button_big.png','Texte plus grand','<big>','</big>','texte agrandi');

addCustomButton('https://images.wikia.nocookie.net/central/images/5/58/Button_small.png','Texte plus petit','<small>','</small>','texte rapetissé');

addCustomButton('https://images.wikia.nocookie.net/central/images/a/aa/Button_sub_letter.png','Texte en indice','<sub>','</sub>','texte en indice');

addCustomButton('https://images.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png','Texte en exposant','<sub>','</sub>','texte en exposant');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/8/80/Button_upper_letter.png','Exposant','<sup>','</sup>','');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/4/4b/Button_nbsp.png','Espace insécable','&nbsp\;','','');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/8/8e/Button_shifting.png', 'Insérer un retrait',':','','' );
 
addCustomButton('https://images.wikia.nocookie.net/central/images/e/ea/Button_align_left.png','Aligner un texte à gauche','<div style="text-align: left; direction: ltr; margin-left: 1em;">','</div>','texte aligné à gauche');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/5/5f/Button_center.png','Centrer un texte','<div style="text-align: center;">','</div>','texte centré');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/a/a5/Button_align_right.png','Texte aligné à droite','<div style="text-align: right; direction: ltr; margin-left: 1em;">','</div>','texte aligné à droite');

addCustomButton('https://images.wikia.nocookie.net/central/images/2/29/Button_justify.png','Justifier texte','<div style="text-align: justify;">','</div>','texte justifié');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png','Aller à la ligne','<br />','','');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/5/59/Button_paint.png','Texte coloré','<span style="color: #Nom de la couleur;">','</span>','texte à colorer');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/1/1c/Button_advanced_image.png','Image avancée','[[Image:','|thumb|right|px|Légende]]','nom de la photo');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png','Commentaire','<!--','-->','');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png','Redirection','#REDIRECT [[',']]','nom de la destination');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png','Modèle','{{','}}','nom du modèle');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png','Catégorie','[[Catégorie:',']]','nom de la catégorie');

/* remettre en forme la balise pre */
addCustomButton('https://images.wikia.nocookie.net/central/images/3/3c/Button_pre.png','Texte préformaté','<pre>','</pre>','texte préformaté');

 
addCustomButton('https://images.wikia.nocookie.net/central/images/c/c4/Button_ref.png','Ajoute une référence','<ref>','</ref>','référence, citation ou lien');

addCustomButton('https://images.wikia.nocookie.net/central/images/8/8b/Button_ref_link.png','Index des références','==Notes et références==\n<references />','','');

addCustomButton('https://images.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png','Citation Wikipédia','<nowiki>{{Wikipediafr}}</nowiki>','');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/c/ce/Button_no_include.png','Ne pas inclure','<nowiki><noinclude> </nowiki>','<nowiki></noinclude></nowiki>');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/7/79/Button_include.png','Inclure seulement','<nowiki><includeonly><nowiki>','</nowiki></includeonly></nowiki>','');

var voirAussi = '==Notes et références==\n'
 + '<references/>\n'
 + '==Voir aussi==\n'
 + '===Articles connexes===\n'
 + '* [[À remplacer]]\n'
 + '*\n'
 + '===Liens et documents externes===\n'
 + '*\n';
addCustomButton('https://images.wikia.nocookie.net/central/images/b/bb/Seealso.png','Section Voir aussi',voirAussi,'','')

/** incluer CSS */
 function addCSS(title) {
     document.write(
                '<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=' + 
                encodeURIComponent(title) + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }
 
 /** JS einbinden */
 function addJS(title) {
     document.write(
                '<scr'+'ipt type="text/javascript" src="/index.php?title=' +
                encodeURIComponent(title) + '&action=raw&ctype=text/javascript"></scr'+'ipt>');
 }
 
 // afficher et masquer
 function einaus (inhalt, einblenden, ausblenden) {
    var thisLevel  = document.getElementById(inhalt);
    var otherLevel = document.getElementById(einblenden);
    var linkLevel  = document.getElementById(ausblenden);
    if (thisLevel.style.display == 'none') {
        thisLevel.style.display = 'block';
        otherLevel.style.display = 'none';
        linkLevel.style.display = 'inline';
    } else {
        thisLevel.style.display = 'none';
        otherLevel.style.display = 'inline';
        linkLevel.style.display = 'none';
    }
 }
 
 //================================================================================
 // alles mit class='jstest' ist dragbar
 
 /***********************************************
 * Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for this script and 100s more.
 ***********************************************/
 
 var dragobject={
 z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
 initialize:function(){
 document.onmousedown=this.drag
 document.onmouseup=function(){this.dragapproved=0}
 },
 drag:function(e){
 var evtobj=window.event? window.event : e
 this.targetobj=window.event? event.srcElement : e.target
 if (this.targetobj.className=="jstest"){
 this.dragapproved=1
 if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
 if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
 this.offsetx=parseInt(this.targetobj.style.left)
 this.offsety=parseInt(this.targetobj.style.top)
 this.x=evtobj.clientX
 this.y=evtobj.clientY
 if (evtobj.preventDefault)
 evtobj.preventDefault()
 document.onmousemove=dragobject.moveit
 }
 },
 moveit:function(e){
 var evtobj=window.event? window.event : e
 if (this.dragapproved==1){
 this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
 this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
 return false
 }
 }
 }
 
 dragobject.initialize();   
 
 
// Ein- und Ausblenden per Javascript
 
// mit den folgenden Funktionen lässt sich ein div-Konstrukt in ein Einblende-Ausblende-Ding verwandeln
//
// Variante 1 (Klick irgendwo blendet ein oder aus):
//	<div class="klapp">
//		<div class="klapp_t">Titel im eingeblendeten Zustand</div>
//		<div class="klapp_e">Titel im ausgeblendeten Zustand</div>
//		<div class="klapp_i">Einzublendender Inhalt</div>
//	</div>
//
// Variante 2 (ein- und ausblenden nur mit Links):
//	<div class="klapp_x">
//		<div class="klapp_t">Titel im eingeblendeten Zustand mit <span class="klapp">Einblendelink</span></div>
//		<div class="klapp_e">Titel im ausgeblendeten Zustand mit <span class="klapp">Ausblendelink</span></div>
//		<div class="klapp_i">Einzublendender Inhalt</div>
//	</div>
 
function ausklapp( element )
{
	var klapp_i = null;
	var klapp_e = null;
	var klapp_t = null;
 
	for (i=0; i<element.childNodes.length; i++)
	{
		if( element.childNodes[i].nodeType == 1 )
		{
			if ( element.childNodes[i].className == "klapp_i" )
				klapp_i = element.childNodes[i];
			else if ( element.childNodes[i].className == "klapp_t" )
				klapp_t = element.childNodes[i];
			else if ( element.childNodes[i].className == "klapp_e" )
				klapp_e = element.childNodes[i];
		}
 
		if ( klapp_i && klapp_t && klapp_e )
			break;
	}
 
	if( klapp_i.style.display != "none")
	{
		klapp_i.style.display = "none";
		klapp_e.style.display = "none";
		klapp_t.style.display = "block";
 
	}
	else
	{
		klapp_i.style.display = "block";
		klapp_e.style.display = "block";
		klapp_t.style.display = "none";
	}
 
}
 
function getKlappDiv( obj )
{
	while ( obj && obj.parentNode && obj.className != "klapp_x" )
		obj = obj.parentNode;
 
	return obj;
}
 
// Event-Handler für alle class="klapp"-Objekte zuweisen
function makeAusklapp()
{
	// klapp-div-Rahmen
	var a = document.getElementsByTagName("div"); 
	for ( div=0; div<a.length; div++ )
	{
		if ( a[div].className == "klapp" )
		{
			//Leider nicht IE-Kompatibel:
			//var f = function () { ausklapp(this) };
			//addEvent( a[div], "click", f , false );
			//stattdessen:
 
			a[div].onclick = function () { ausklapp(this);}
		}
	}
 
	// klapp-spans-Rahmen als Link-Ersatz
	var a = document.getElementsByTagName("span"); 
	for ( span=0; span<a.length; span++ )
	{
		if ( a[span].className == "klapp" )
		{
			a[span].onclick = function () { ausklapp(getKlappDiv( this ));}
		}
	}
 
}
 
// Nach dem Laden des Fensters folgendes Ausführen:
/* Not supported on UCP
addOnloadHook(makeAusklapp);
*/

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
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
var collapseCaption = "masquer";
var expandCaption = "afficher";
 
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

/* Not supported on UCP 
addOnloadHook( createCollapseButtons );
*/

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }
 
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

/* Not supported on UCP 
addOnloadHook( createNavigationBarToggleButton );
*/
//

/*
Description: Allows tables to be collapsed, showing only the header. See
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

/* Not supported on UCP
addOnloadHook( createCollapseButtons );
*/

/*Paramètres UserTags*/
importArticle({type:'script', article:'w:c:dev:MediaWiki:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
	    bureaucrat: {
            u:'BUREAUCRATE',
            order: 100,
        },
		star: { u: 'INVITÉ D\'HONNEUR DU TCHAT' },
	}
};
UserTagsJS.modules.custom = {
	'Sedali': ['star'],
	'FrenchTouch': ['star'], 
	'Esteban02': ['star'],
	'Matauf' : ['star'],
	'SireAmiel' : ['star'],
	'Dark Yada' : ['star'],
	'Babounet' : ['bureaucrat'],
	'Sellieromain' : ['bureaucrat']
};