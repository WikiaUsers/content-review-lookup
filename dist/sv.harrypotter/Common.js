/* JavaScript som skrivs här körs varje gång en användare laddar en sida. */
 /**
  * Dynamic Navigation Bars (experimantal)
  */
 
 // set up the words in your language
 var NavigationBarHide = '[ Dölj ]';
 var NavigationBarShow = '[ Visa ]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1;
 
 
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
 
 addOnloadHook(createNavigationBarToggleButton);