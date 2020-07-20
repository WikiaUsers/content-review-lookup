/* Any JavaScript here will be loaded for all users on every page load. */

function createTimeToGemCalculator() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-t2g")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var input3 = document.createElement("input");
         var input4 = document.createElement("input");
         var input5 = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcTimeToGems(" + offset + ");");
         input1.setAttribute("size", "5");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "days_input_" + offset);
 
         input2.setAttribute("size", "5");
         input2.setAttribute("value", "0");
         input2.setAttribute("id", "hours_input_" + offset);
 
         input3.setAttribute("size", "5");
         input3.setAttribute("value", "0");
         input3.setAttribute("id", "minutes_input_" + offset);
 
         input4.setAttribute("size", "5");
         input4.setAttribute("value", "0");
         input4.setAttribute("id", "seconds_input_" + offset);
 
         input5.setAttribute("type", "button");
         input5.setAttribute("value", "Calculate Gem Cost");
         input5.setAttribute("onclick", "javascript:calcTimeToGems(" + offset + ");");
 
         span.setAttribute("id", "gem_time_result_" + offset);
         span.innerHTML = " = 0 gems";
 
         form.appendChild(document.createTextNode("D: "));
         form.appendChild(input1);
         form.appendChild(document.createTextNode(" H: "));
         form.appendChild(input2);
         form.appendChild(document.createTextNode(" M: "));
         form.appendChild(input3);
         form.appendChild(document.createTextNode(" S: "));
         form.appendChild(input4);
         form.appendChild(input5);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}