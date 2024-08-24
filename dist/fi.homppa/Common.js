/* T�m�n sivun koodi liitet��n jokaiseen sivulataukseen */

// ============================================================
 // BEGIN Enable multiple onload functions
 
 // setup onload functions this way:
 // aOnloadFunctions[aOnloadFunctions.length] = function_name; // without brackets!
 
 if (!window.aOnloadFunctions) {
   var aOnloadFunctions = new Array();
 }
 
 window.onload = function() {
   if (window.aOnloadFunctions) {
     for (var _i=0; _i<aOnloadFunctions.length; _i++) {
       aOnloadFunctions[_i]();
     }
   }
 }
 
 // END Enable multiple onload functions
 // ============================================================
 
 // ============================================================
 // BEGIN Dynamic Navigation Bars
 
 // set up the words in your language
 var NavigationBarHide = '[piilota]';
 var NavigationBarShow = '[n�yt�]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 0;
 
 
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
       if (NavChild.className == 'NavPic') {
       NavChild.style.display = 'none';
     }
     if (NavChild.className == 'NavContent') {
       NavChild.style.display = 'none';
     }
     if (NavChild.className == 'NavToggle') {
       NavChild.firstChild.data = NavigationBarShow;
     }
   }
 
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
       if (NavChild.className == 'NavToggle') {
         NavChild.firstChild.data = NavigationBarHide;
       }
     }
   }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
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
 
       // add NavToggle-Button as first div-element 
       // in < div class="NavFrame" >
       NavFrame.insertBefore(
         NavToggle,
         NavFrame.firstChild
       );
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
 
 aOnloadFunctions[aOnloadFunctions.length] = createNavigationBarToggleButton;
 
 // END Dynamic Navigation Bars
 // ============================================================
 
 function addLoadEvent(func) 
 {
   if (window.addEventListener) 
     window.addEventListener("load", func, false);
   else if (window.attachEvent) 
     window.attachEvent("onload", func);
 }

 
 /** Username replace function ([[malline:USERNAME]]) *******************************
  * Inserts user name into <span id="insertusername"></span>
  * By [[wikia:User:Splarka|Splarka]]
  */
 addOnloadHook(UserNameReplace);
 
 function UserNameReplace() {
 if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
        if ((document.getElementById('pt-userpage'))&&(UserName.getAttribute('id') == "insertusername")) {
            UserName.innerHTML = wgUserName;
        }
    }
 }

/* Skinikokeilu  */
 
 reskin = {
    "Etusivu": "Etusivu.css"
 //Kaikkien muiden paitsi viimeisen rivin lopussa pit�isi olla pilkku!
 }
 var skinName;

 if (reskin[wgPageName] != undefined && wgIsArticle == true) {
     skinName = (reskin[wgPageName].length > 0) ? reskin[wgPageName] : wgPageName + '.css';
     document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }