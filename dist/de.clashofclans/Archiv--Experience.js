function doExperience (Level) {
 
   if (isNaN(Level)) return("???");
 
   if (Level < 0) return("???");
   else if (Level == 0) return(0);
   else return(((Level * 50) - 50));
 
   return("???");
}
 
 
function calcExperience (index) {
   var Level = parseInt(document.getElementById("lev_input_" + index).value);
 
   var result = doExperience(Level);
 
   if (result != 1)
      document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Experience";
   else
      document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Experience";    
 
   return false;
}
 
function createExperience() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-ex")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcExperience(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "lev_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Experience");
         input2.setAttribute("onclick", "javascript:calcExperience(" + offset + ");");
 
         span.setAttribute("id", "ex_result_" + offset);
         span.innerHTML = " = 0 Experience";
 
         form.appendChild(document.createTextNode("Level: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createExperience);
 
/* Level to Experience until the level */
 
function doExperience2 (Lev) {
 
   if (isNaN(Lev)) return("???");
 
   if (Lev < 0) return("???");
   else if (Lev == 0) return(0);
   else return((((Lev * (Lev - 1)) / 2) * 50));
 
   return("???");
}
 
 
function calcExperience2 (index) {
   var Lev = parseInt(document.getElementById("lev_input2_" + index).value);
 
   var result = doExperience2(Lev);
 
   if (result != 1)
      document.getElementById("ex_result2_" + index).innerHTML = " = " + result + " Experience";
   else
      document.getElementById("ex_result2_" + index).innerHTML = " = " + result + " Experience";    
 
   return false;
}
 
function createExperience2() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-lev")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcExperience2(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "lev_input2_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Experience");
         input2.setAttribute("onclick", "javascript:calcExperience2(" + offset + ");");
 
         span.setAttribute("id", "ex_result2_" + offset);
         span.innerHTML = " = 0 Experience";
 
         form.appendChild(document.createTextNode("Level: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createExperience2);