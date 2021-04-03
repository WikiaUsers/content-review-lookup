//<syntaxhighlight lang="javascript">
//Originally by Deadcode
//Optimized and modified by Kangaroopower
$(function(){
   var translateButton = '<button id="TranslateButton" class="wikia-button" style="font-weight:800;width:6em;background-color:#BB00BB;color:#00FF00;"> A / 漢字 </button>';
   $("#WikiaSearch").after(translateButton);
   $("#searchBody").after(translateButton);

   $("#TranslateButton").click(function(){
      var url = "http://translate.google.com/#" + mw.config.get("wgPageContentLanguage") + "/" + mw.config.get("wgUserLanguage") + "/";

      $( ".RelatedForumDiscussion, noscript" ).remove();
      
      var text = "" ;
      if (mw.config.get("skin") === "oasis" || mw.config.get("skin") === "wikia") {
            text = document.getElementById("mw-content-text").textContent ;
      }
      else{
           text = document.getElementById("bodyContent").textContent ;
      }

      //This probably could be super shortened with regex
      text = text.replace(' ', "_")
         .replace('<', "_")
         .replace('>', "_")
         .replace('\\', "_")
         .replace('\'', "_")
         .replace('\"', "_")
         .replace('=', "_")
         .replace('?', "_")
         .replace(',', "_")
         .replace("#","_number_")
         .replace("_","%"+"20");

         url += text;
         
         window.open(url);
   });
});
//</syntaxhighlight>