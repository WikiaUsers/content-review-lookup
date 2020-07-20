////////////////////////////////////QUIZ/////////////////////////////////////////
/* Check for Answer = A */
 
function doAnsA (AnsA) {
   if (AnsA == "A" || AnsA == "a" || AnsA == 1) {
      return "Correct" ;
   } 
   else {
      return "Wrong" ;
   }
}
 
function calcAnsA (index) {
   var AnsA 
= parseInt(document.getElementById("ansA_input_" + index).value);
 
   var result 
= doAnsA(AnsA);
 
   if (result == "Correct")
      document.getElementById("ansA_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsA + "', Got: '" + result + "')";
   else
      document.getElementById("ansA_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsA + "', Got: '" + result + "')";    
 
   return false;
}
 
function createAnsA() {
   var paras 
= document.getElementsByTagName("p");
   var offset 
= 0;
 
   for (var index 
= 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "check-ansA")) {
         var form 
= document.createElement("form");
         var input1 
= document.createElement("input");
         var input2 
= document.createElement("input");
         var span 
= document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcansA(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "ansA_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Check Answer");
         input2.setAttribute("onclick", "javascript:calcAnsA(" + offset + ");");
 
         span.setAttribute("id", "ansA_result_" + offset);
         span.innerHTML 
= " =  ???";
 
         form.appendChild(document.createTextNode("Answer: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createAnsA);