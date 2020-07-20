/* Any JavaScript here will be loaded for all users on every page load. */

/*
<pre>
*/

// The function looks for a banner like that:
// <div id="RealTitleBanner">Div that is hidden
//   <span id="RealTitle">title</span>
// </div>
// An element with id=DisableRealTitle disables the function.
rewritePageH1 = function() {
 try {
 var realTitleBanner = document.getElementById("RealTitleBanner");
 if (realTitleBanner) {
 if (!document.getElementById("DisableRealTitle")) {
 var realTitle = document.getElementById("RealTitle");
 var h1 = document.getElementsByTagName("h1")[0];
 if (realTitle && h1) {
 h1.innerHTML = realTitle.innerHTML;
 realTitleBanner.style.display = "none";
 }
 }
 }
 } catch (e) {
 /* Something went wrong. */
 }
}
addOnloadHook(rewritePageH1);

/*
</pre>
*/