function timeStamp_Version_js() {
   return "2014.05.22 11:19 (UTC-7)";
}

function getCommonjsTimeStamp(index) {
   var strLink;
   var result = '<table class="wikitable sortable">';

   result  += '<tr><th scope="col">Javascript Page</th>' + 
              '<th scope="col">Last Updated</th></tr>';

   strLink  = "MediaWiki:Common.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Common_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Version.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Version_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/GemCalculators.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_GemCalculators_js() + "</td></tr>";

   strLink  = "ExtendedNavigation/code.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_ExtendedNavigation_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Sliders.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Sliders_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Quiz.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Quiz_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Experience.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Experience_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Clashingtools.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Clashingtools_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Cookies.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Cookies_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Storage.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Storage_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Usernames.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Usernames_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/TroopInfo.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_TroopInfo_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/bbTroopInfo.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_bbTroopInfo_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Tabber2.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Tabber2_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/RateIt.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_RateIt_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Clock.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Clock_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/ImageHover.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_ImageHover_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/UnitComparator.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_UnitComparator_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Protection.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Protection_js() + "</td></tr>";

   strLink  = "MediaWiki:Common.js/Test.js";
   result  += "<tr><td>" + strLink.link("/" + strLink) + "</td>" + 
              "<td style=&#34;text-align:center;&#34;>" +
              timeStamp_Test_js() + "</td></tr>";

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