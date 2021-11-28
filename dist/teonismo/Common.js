// =================================================
//   O que se segue eh material para o NAVBOX retirado de Help:Dynamic navigation (Wikia)
// ===================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
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
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "Esconder";
 var expandCaption = "Expandir";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); //Table.rows;   na Wikipédia
 
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


/* only add button and increment count if there is a header row to work with (segundo Wikipédia lusófona; aparece diferente um pouco mais abaixo)

var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
if (!HeaderRow) continue;
var Header = HeaderRow.getElementsByTagName( "th" )[0];
if (!Header) continue;
*/

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

/* ButtonLink.style.color = Header.style.color; */

             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );

/* Trecho não existente na Wikipédia lusófona */
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
/* Fim desse trecho */
     
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





/** Correlatos ******************************************************************************
  *  Descrição:Correlatos no menu lateral. Código copiado do de:wikt (Copiado de wikipedia lusófona)
  ********************************************************************************************/
 // InterProjekt-Links (vgl. [[MediaZilla:708]])
  document.write('<style type="text/css">#interProject, #sisterProjects {display: none; speak: none;} #p-tb .pBody {padding-right: 0;}<\/style>');
 function iProject() {
  if (document.getElementById("interProject")) {
   var iProject = document.getElementById("interProject").innerHTML;
   var interProject = document.createElement("div");
   interProject.style.marginTop = "0.7em";
   interProject.innerHTML = '<h5>Correlatos<\/h5><div class="pBody">'+iProject+'<\/div>';
   document.getElementById("p-tb").appendChild(interProject);
  }
 }
 addOnloadHook(iProject);





/** ***************************************************************************
  *  Descrição: Adiciona a predefinição {protegido} e {protegido-ip} automáticos para artigos protegidos
  *  Autor: [[:pt:User:Rei-artur]]
  ******************************************************************************/
 importScript('MediaWiki:Topicon.js')



/** ***************************************************************************
  *  Descrição: Adição de botões
  *  http://www.mediawiki.org/wiki/Wikipedia_buttons
  *  http://en.wikipedia.org/wiki/User:MarkS/Extra_edit_buttons
  *  http://help.wikia.com/wiki/Custom_edit_buttons
  *  http://commons.wikimedia.org/wiki/Mediawiki_edit_toolbar
  *  http://community.wikia.com/wiki/Category:Custom_edit_buttons
  ******************************************************************************/

/*
  if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"}
  }

$ sudo cat urls
http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png
http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png
http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png
http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png
http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png
http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png
http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png
http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png
http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png
http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png
*/