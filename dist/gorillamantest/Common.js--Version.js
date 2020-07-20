/*
  Functionality to determine if a particular version of a Javascript
  page has been cached. Each page needs to have its timestamp updated
  manually in order for it to appear here, so if you modify the JS
  without updating the timestamp, you will not see any change.

  -- Spottra, 13 July 2013
*/
function timeStamp_Version_js() {
   return "2013.11.01 16:31 (UTC-7)";
}

function getCommonjsTimeStamp(index) {
   var strLink;
   var result = "<table>";

   strLink  = "MediaWiki:Common.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Common_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Version.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Version_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Quiz.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Quiz_js() + "</td></tr>";

   result  += "</table>";

   document.getElementById("version_result_" + index).innerHTML = result;
}

function createVersionDisplay() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (paras[index].className == "common-js-version") {
         var form  = document.createElement("form");
         var input = document.createElement("input");
         var span  = document.createElement("span");
 
         form.setAttribute("onSubmit",
            "return getCommonjsTimeStamp(" + offset + ");");
         input.setAttribute("type", "button");
         input.setAttribute("value", "Display JS Timestamps");
         input.setAttribute("onclick",
            "javascript:getCommonjsTimeStamp(" + offset + ");");
 
         span.setAttribute("id", "version_result_" + offset);
         span.innerHTML = "";
 
         form.appendChild(input);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset ++;
      }
   }     
}
 
addOnloadHook(createVersionDisplay);