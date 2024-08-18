/* Experience Calculator - GorillaMan */
 
/* Level to experience necessary for that level */
 
function doExperience(Level, noFormat) {
   if (isNaN(Level) || Level < 0 || Level >= 300)
      return "???";

   if (!Level)
      return 0;

   var retval = Level * 50 + Math.max(0, (Level - 199) * 450);

   return (noFormat ? retval : retval.format('#,##0'));
}

function calcExperience(index) {
   var Level  = parseInt(document.getElementById("lev_input_" + index).value);
   var result = doExperience(Level);

   document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Experience";    
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
         input2.setAttribute("value", "Calculate Experience");
         input2.setAttribute("onclick", "javascript:calcExperience(" + offset + ");");

         span.setAttribute("id", "ex_result_" + offset);
         span.innerHTML = " = 0 Experience";

         form.appendChild(document.createTextNode("Level: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);

         paras[index].appendChild(form);
         offset ++;
      }
   }
}

addOnloadHook(createExperience);

/* Level to Experience until the level */

function doExperience2 (Lev) {
   if (isNaN(Lev) || Lev < 0 || Lev > 300)
      return "???";

   if (Lev < 201)
      return (Lev * (Lev - 1) * 25).format('#,##0');

   var tot = 200 * 199 * 25;
   var lvl = 200;

   while (lvl < Lev)
      tot += doExperience(lvl++, true);

   return tot.format('#,##0');
}

function calcExperience2 (index) {
   var Lev    = parseInt(document.getElementById("lev_input2_" + index).value);
   var result = doExperience2(Lev);

   document.getElementById("ex_result2_" + index).innerHTML = " = " + result + " Experience";    
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
         input2.setAttribute("value", "Calculate Experience");
         input2.setAttribute("onclick", "javascript:calcExperience2(" + offset + ");");

         span.setAttribute("id", "ex_result2_" + offset);
         span.innerHTML = " = 0 Experience";

         form.appendChild(document.createTextNode("Level: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);

         paras[index].appendChild(form);
         offset ++;
      }
   }
}

addOnloadHook(createExperience2);