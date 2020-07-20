/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
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
 var collapseCaption = "hide";
 var expandCaption = "show";
 
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

/* Custom edit buttons for source mode
 * by: Seraskus
 */

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/eff/images/e/ed/AddMember_PageEditorIcon.png",
     "speedTip": "Add unfilled template content to create a new Member Page",
     "tagOpen": "[[File:Template_Placeholder|right|300px]]\rIn-game Name:\r\rReal Name:\r\rForum Name:\r\rDate of Birth:\r\rGender:\r\rXfire:\r\rMSN:\r\rE-mail:\r\rLocation:\r\rSide:\r\rSkin:\r==Achievements==\r==Ranks==\rAdept, on DATE he was accepted by NAME\r\r==Joining==\r==Character==",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/eff/images/4/4a/AddEventTitle_PageEditorIcon.png",
     "speedTip": "Add Event Title panel",
     "tagOpen": "{{",
     "tagClose": "BattleMaster\r|Event= 0\r|Weapons= 0\r|Force= 0\r|Ships= 0\r|Rank = 0\r}}",
     "sampleText": ""};


}



/*
 * Hidding the 'did you know?' message
 */


function ukryj()
{
 document.getElementById("NiceTip").style.display='none';
}

/*
 * Addind the "Did you know?" section
 */
//--------------------------------------------------------------

             var WScreen= screen.width;
             var TipWidth= ((WScreen-1000)/2)-23;

             

             var didYouKnow = document.createElement( "div" );
             var didYouKnowHide = document.createElement( "a" );
             var didYouKnowHideText = document.createTextNode("hide"); 
             var pageLink = document.createElement( "a" );
             var didYouKnowText = document.createElement( "b" );
             

             didYouKnow.style.position = "fixed";

             if(TipWidth<150) {
                  TipWidth=150;
                  didYouKnow.style.bottom = "23px";
                  didYouKnow.style.left = "0%";
             }
             else{
             didYouKnow.style.top = "45%";
             didYouKnow.style.left = "0%";
             }
             didYouKnow.style.border = "2px solid rgb(7,7,7)";
             didYouKnow.style.borderTopLeftRadius = "10px 10px";
             didYouKnow.style.borderBottomLeftRadius = "10px 10px";
             didYouKnow.style.borderTopRightRadius = "10px 10px";
             didYouKnow.style.borderBottomRightRadius = "10px 10px";
             didYouKnow.style.background = "rgb(32,32,32)";
             didYouKnow.style.minWidth = TipWidth+"px";
             didYouKnow.style.maxWidth = TipWidth+"px";
             didYouKnow.style.zIndex = "30" ;
             didYouKnow.setAttribute( "id", "NiceTip" );

             didYouKnowHide.setAttribute( "href", "javascript:ukryj()");
             didYouKnowHide.appendChild( didYouKnowHideText );


 //adding the random'did you know' tip

             //didYouKnowText.appendChild( document.createTextNode( "Did you know?" ) );
             didYouKnowText.style.fontWeight = "bold";
             didYouKnowText.style.fontStyle = "italic";
             didYouKnowText.innerHTML="Did you know?";
             didYouKnow.appendChild( didYouKnowText );
             didYouKnow.appendChild( document.createTextNode( " ( " ) );
             didYouKnow.appendChild( didYouKnowHide );
             didYouKnow.appendChild( document.createTextNode( " )" ) );
             didYouKnow.appendChild( document.createElement("br") );
var losowyTip = Math.floor(Math.random()*14);   
//var losowyTip = Math.random(); 
if(losowyTip==0){
didYouKnow.appendChild( document.createTextNode( "There is a saber which" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "doesn't deal any damage!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Commands Guide#Saber");
var pageLinkText = document.createTextNode("Saber Commands"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==1){
didYouKnow.appendChild( document.createTextNode( "Ysalamiri can protect" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "you from all Force Powers!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Powerups");
var pageLinkText = document.createTextNode("Powerups"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==2){
didYouKnow.appendChild( document.createTextNode( "You can deny /amkiss" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "pressing the Force Push" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "button!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Emoting");
var pageLinkText = document.createTextNode("Emoting"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==3){
didYouKnow.appendChild( document.createTextNode( "Colors under ^8 and ^9" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "are buggy" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Naming Guide");
var pageLinkText = document.createTextNode("Naming Guide"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==4){
didYouKnow.appendChild( document.createTextNode( "You can learn to jump" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "even 30% further!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Advanced jumping");
var pageLinkText = document.createTextNode("Advanced jumping"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==5){
didYouKnow.appendChild( document.createTextNode( "In Alternate Dimension" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "laming is allowed!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Alternate Dimension");
var pageLinkText = document.createTextNode("Alternate Dimension"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==6){
didYouKnow.appendChild( document.createTextNode( "Force Lightning deals" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "double damage when used" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "along with melee!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Force Powers");
var pageLinkText = document.createTextNode("Force Powers"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==7){
didYouKnow.appendChild( document.createTextNode( "There is a glitch" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "making any single saber" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "behave like a staff!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Tricks and Glitches");
var pageLinkText = document.createTextNode("Tricks and Glitches"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==8){
didYouKnow.appendChild( document.createTextNode( "Scince the Fighters leaving" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "EFF has no base server." ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "Council decided not to" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "set it up any more." ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "EFF History");
var pageLinkText = document.createTextNode("EFF History"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==9){
didYouKnow.appendChild( document.createTextNode( "Flipping the saber lets you perform instant hits!" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "You can easily bind it!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Saber flip script");
var pageLinkText = document.createTextNode("Saber flip script"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==10){
didYouKnow.appendChild( document.createTextNode( "You can bind multiple" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "commands to 1 button!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Commands Guide#Multi-binding");
var pageLinkText = document.createTextNode("Multi-binding"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==11){
didYouKnow.appendChild( document.createTextNode( "Using a Staff in the" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "Force gameplay you can" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "save even 26 points" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "for other Force Powers!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Force_fighting#Saber_with_the_Force");
var pageLinkText = document.createTextNode("Saber with the Force"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==12){
didYouKnow.appendChild( document.createTextNode( "While fighting with melee" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "you can turn backwards to" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "enemy to perform an" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "Instant Kata!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Melee");
var pageLinkText = document.createTextNode("Melee"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}
if(losowyTip==13){
didYouKnow.appendChild( document.createTextNode( "Most of the Spaceships" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "can link their cannons" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "to shot together in" ) );
didYouKnow.appendChild( document.createElement("br") );
didYouKnow.appendChild( document.createTextNode( "Coupled Fire Mode!" ) );
didYouKnow.appendChild( document.createElement("br") );
pageLink.setAttribute( "href", "Spaceship_Guide");
var pageLinkText = document.createTextNode("Spaceship Guide"); 
pageLink.appendChild( pageLinkText );
didYouKnow.appendChild( document.createTextNode( "See: " ) );
didYouKnow.appendChild( pageLink );
}


             //didYouKnow.appendChild( document.createTextNode( "test" ) );
             //didYouKnow.appendChild( document.createElement("br") );
             //didYouKnow.appendChild( document.createElement("br") );
            
      
         
             document.getElementById("WikiaMainContent").appendChild(didYouKnow);

//---------------------------------------------