//From http://clashofclans.wikia.com/wiki/MediaWiki:Common.js/Experience.js and http://clashofclans.wikia.com/wiki/MediaWiki:Common.js
var hasClass = (function() {
   var reCache = {};
   return function(element, className) {
      return ( reCache[className] ? reCache[className] :
         (reCache[className] = new RegExp( "(?:\\s|^)" + className +
         "(?:\\s|$)" ) ) ).test(element.className);
   };
})();
 
function hasClassTest(element, className) {
   // No reason to have two functions that do the same thing
   // return element.className.indexOf(className) != -1;
   return hasClass(element, className);
}
/* Any JavaScript here will be loaded for all users on every page load. */
/* Experience Calculator - GorillaMan */
 
/*
 * Experience gained from building and upgrading structures
 *   Requires: time in seconds
 *   Returns:  amount of experience gained (unformatted)
 */
function experienceGained(seconds) {
   if (seconds < 0)
      seconds = 0;
 
   return Math.floor(Math.sqrt(seconds), 0);
}
 
/* Level to experience necessary for that level */
 
function doExperience(Level, noFormat) {
   if (isNaN(Level) || Level < 0)
      return "???";
 
   if (!Level)
      return 0;
 
   var retval = Level * 50 + Math.max(0, (Level - 199) * 450);
 
   return (noFormat ? retval : retval.format('#&nbsp;##0'));
}
 
function calcExperience(index) {
   var Level  = parseInt(document.getElementById("lev_input_" + index).value);
   var result = doExperience(Level);
 
   document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Expérience";    
}
 
function createExperience() {
   var paras  = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-ex")) {
         var form   = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span   = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcExperience(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "lev_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculer l\'expérience");
         input2.setAttribute("onclick", "javascript:calcExperience(" + offset + ");");
 
         span.setAttribute("id", "ex_result_" + offset);
         span.innerHTML = " = 0 Expérience";
 
         form.appendChild(document.createTextNode("Niveau: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset ++;
      }
   }
}
 
$(document).ready(function() {
    createExperience();
});
 
/* Level to Experience until the level */
 
function doExperience2 (Lev) {
   if (isNaN(Lev) || Lev < 0)
      return "???";
 
   if (Lev < 201)
      return (Lev * (Lev - 1) * 25).format('#&nbsp;##0');
 
   var tot = 200 * 199 * 25;
   var lvl = 200;
 
   while (lvl < Lev)
      tot += doExperience(lvl++, true);
 
   return tot.format('#&nbsp;##0');
}
 
function calcExperience2 (index) {
   var Lev    = parseInt(document.getElementById("lev_input2_" + index).value);
   var result = doExperience2(Lev);
 
   document.getElementById("ex_result2_" + index).innerHTML = " = " + result + " Expérience";    
}
 
function createExperience2() {
   var paras  = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-lev")) {
         var form   = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span   = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcExperience2(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "lev_input2_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculer l\'expérience");
         input2.setAttribute("onclick", "javascript:calcExperience2(" + offset + ");");
 
         span.setAttribute("id", "ex_result2_" + offset);
         span.innerHTML = " = 0 Expérience";
 
         form.appendChild(document.createTextNode("Niveau: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset ++;
      }
   }
}
 
$(document).ready(function() {
    createExperience2();
});