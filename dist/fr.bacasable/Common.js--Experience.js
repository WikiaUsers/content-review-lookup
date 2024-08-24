/* Calculateur - John */
 
/* Créer une box pour calcul */
 
function doPrime (Prime) {
 
   if (isNaN(Prime)) return("???");
 
   if (Prime < 0) return("???");
   else if (Prime == 0) return(0);
   else return((Prime * 50));
 
   return("???");
}
 
 
function calcPrime(index) {
   var Prime = parseInt(document.getElementById("prim_input_" + index).value);
 
   var result = doPrime(Prime);
 
   if (result != 1)
      document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Prime";
   else
      document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Prime";    
 
   return false;
}
 
function createPrime() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-ex")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcPrime(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "prim_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Prime");
         input2.setAttribute("onclick", "javascript:calcPrime(" + offset + ");");
 
         span.setAttribute("id", "ex_result_" + offset);
         span.innerHTML = " = 0 Prime";
 
         form.appendChild(document.createTextNode("Prime: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createPrime);