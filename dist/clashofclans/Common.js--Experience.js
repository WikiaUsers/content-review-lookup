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
   var retval;
   
   if (Level == 1)
   retval = 30;
   
   else if (Level <= 200)
   retval = 50 * (Level - 1);
   
   else if (Level < 300)
   retval = 500 * (Level - 200) + 9500;
   
   else
   retval = 1000 * (Level - 300) + 60000;

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

function doExperience2 (Lev, noFormat) {
   if (isNaN(Lev) || Lev <= 0)
      return "???";
      
   if (Lev == 1)
      return 0;

   else if (Lev < 202)
      return ((Lev - 1) * (Lev - 2) * 25 + 30).format('#,##0');
      
   else if (Lev < 300)
      return (250 * (Lev - 202) * (Lev - 202) + 10250 * (Lev - 202) + 1005030).format('#,##0');
      
   else
      return (500 * (Lev - 300) * (Lev - 300) + 59500 * (Lev - 300) + 4410530).format('#,##0');
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