/* Any JavaScript here will be loaded for all users on every page load. */
/* Experience Calculator - GorillaMan */
 
/* Available Loot */
 
function createLootGE() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-lootGE")) {
         var form = document.createElement("form");
         var inputM = document.createElement("input");
         var inputS = document.createElement("input");
         var inputMC = document.createElement("input");
         var inputTH = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcLootGE(" + offset + ");");
         inputM.setAttribute("size", "1");
         inputM.setAttribute("value", "0");
         inputM.setAttribute("id", "mult_input_" + offset);
 
         inputS.setAttribute("size", "6");
         inputS.setAttribute("value", "0");
         inputS.setAttribute("max", "199000");
         inputS.setAttribute("min", "0");
         inputS.setAttribute("id", "stor_input_" + offset);
 
         inputMC.setAttribute("size", "8");
         inputMC.setAttribute("value", "0");
         inputMC.setAttribute("min", "0");
         inputMC.setAttribute("id", "minecollect_input_" + offset);

         inputTHsetAttribute("size", "4");
         inputTH.setAttribute("value", "0");
         inputTH.setAttribute("min", "1000");
         inputTH.setAttribute("min", "0");
         inputTH.setAttribute("id", "town_input_" + offset);
 
         span.setAttribute("id", "lootGE_result_" + offset);
         span.innerHTML = " = 0 Gold/Elixir";
 
         form.appendChild(document.createTextNode("Multiplier: "));
         form.appendChild(inputM);
         form.appendChild(document.createTextNode(" Storage: "));
         form.appendChild(inputS);
         form.appendChild(document.createTextNode(" Collector/Mines: "));
         form.appendChild(inputMC);
         form.appendChild(document.createTextNode(" Town Hall: "));
         form.appendChild(inputTH);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}

function displayLoot(){
    var value = doLootGE(resources);
document.getElementById("lootGE_result_" + index).innerHTML = " = " + result + " Gold/Elixir";

function doLootGE (resources) {
   if (isNaN(resources)||resource<0) return "???";
   else if (resources==0) return 0;
   return inputM*((inputS*0.2)+(inputMC*0.5)+inputTH);
}
}










 
//////// //////// //////// //////// //////// //////// //////// //////// //////// ////////