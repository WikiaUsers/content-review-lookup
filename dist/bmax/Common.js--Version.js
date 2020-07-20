/* Any JavaScript here will be loaded for all users on every page load. */
function timeStamp_Version_js() {
   return "2013.07.18 19:00 (UTC)";
}
 
function getCommonjsTimeStamp(index) {
   var result = "<table>";
   result    += "<tr><th>Common.js</th>" + 
                "<td style=&#34;text-align:center;&#34;>" +
                timeStamp_Common_js() + "</td></tr>";
   result    += "<tr><th>Version.js</th>" +
                "<td style=&#34;text-align:center;&#34;>" +
                timeStamp_Version_js() + "</td></tr>";
   result    += "<tr><th>SubNav.js</th>" +
                "<td style=&#34;text-align:center;&#34;>" +
                timeStamp_SubNav_js() + "</td></tr>";
   result    += "<tr><th>Sliders.js</th>" +
                "<td style=&#34;text-align:center;&#34;>" +
                timeStamp_Sliders_js() + "</td></tr>";
   result    += "<tr><th>Quiz.js</th>" +
                "<td style=&#34;text-align:center;&#34;>" +
                timeStamp_Quiz_js() + "</td></tr>";
   result    += "</table>";
 
   document.getElementById("version_result_" + index).innerHTML = result;
}
 
function createVersionDisplay() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "common-js-version")) {
         var form  = document.createElement("form");
         var input = document.createElement("input");
         var span  = document.createElement("span");
 
         form.setAttribute("onSubmit",
            "return getCommonjsTimeStamp(" + offset + ");");
         input.setAttribute("type", "button");
         input.setAttribute("value", "Display Common.js Timestamp");
         input.setAttribute("onclick",
            "javascript:getCommonjsTimeStamp(" + offset + ");");
 
         span.setAttribute("id", "version_result_" + offset);
         span.innerHTML = "";
 
         form.appendChild(input);
/*
         form.appendChild(document.createTextNode("<br/>"));
*/
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset ++;
      }
   }     
}
 
addOnloadHook(createVersionDisplay);