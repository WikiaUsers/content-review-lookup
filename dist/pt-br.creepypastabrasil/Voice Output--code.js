//<syntaxhighlight lang="javascript">
$(function(){
   var voiceButtons = ' <span id="VoiceModule"><button type="button" id="SpeakButton" class="wikia-button" style="background-color:#BB00BB;color:#00FF00; font-weight:800; vertical-align:top; padding:0.5em;" onclick="readPageAloud();">Speak</button> <button class="wikia-button" style="background-color:#BB00BB;color:#00FF00; font-weight:800; vertical-align:top; padding:0.5em; " id="ShutUpButton" onclick="ShutUpVoiceOutput();">Shut Up</button><span id="ShutUpValue" style="display:none;">false</span></span> ';
   $("#WikiaSearch").after(voiceButtons);
   $("#searchBody").after(voiceButtons);
   $('#PowerShareMenu').ready(function(){
      $("#SpeakButton").outerHeight("6em");
      $("#SpeakButton").outerWidth("6em");
      $("#ShutUpButton").outerHeight("6em");
      $("#ShutUpButton").outerWidth("6em");
      var shiftingCode = $("#VoiceModule").detach();
      shiftingCode.appendTo(document.getElementById("PowerShareMenu"));
      });
});
   function ShutUpVoiceOutput(){
      document.getElementById("ShutUpValue").innerHTML = "true";
   }
   function readPageAloud(){
      $( ".RelatedForumDiscussion" ).remove();
      $( "noscript" ).remove();
      var text = "" ;
      if (mw.config.get("skin") === "oasis" || mw.config.get("skin") === "wikia") {
            text = document.getElementById("mw-content-text").textContent ;
      }
      else{
           text = document.getElementById("bodyContent").textContent ;
      }
      function removechar(workingchar,workingstring){
         while(workingstring.indexOf(workingchar)!=-1){
            workingstring= workingstring.replace(workingchar,"_");
         }
         return workingstring;
      }
      text = removechar('<',text);
      text = removechar('>',text);
      text = removechar('/',text);
      text = removechar('\\',text);
      text = removechar('\'',text);
      text = removechar('\"',text);
      text = removechar('=',text);
      text = removechar('?',text);
      text = removechar(',',text);
      while(text.indexOf("#")!=-1){
          text = text.replace("#","_number_");
      }
      while(text.indexOf("_")!=-1){
          text = text.replace("_"," ");
      }
      var word = 0;
      var msecs = 0;
      function sayword(workingword){
         url = words[word] + "&tl=" + mw.config.get("wgPageContentLanguage");
         while(url.indexOf("_")!=-1){
           url = url.replace("_"," ");
         }
         url = "http://translate.google.com/translate_tts?q=" + url
          newwindow.location = url;
          word++;
          msecs=10000;
          if(document.getElementById("ShutUpValue").textContent == "true"){
             newwindow.close();
             return;
          }
          if(word<words.length){
             setTimeout(function(){sayword(word);},msecs);
          }
      }
      while(text.indexOf("_")!=-1){
         text= text.replace("_"," ");
      }
      var sentences = new Array();
      var sentenceNum = 0 ;
      var workingpoint = 0;
      while(text.length>98){
          workingpoint = 98;
          sentences[sentenceNum] = text.substring(0,workingpoint);
          text= text.substring(workingpoint);
          sentenceNum++;
      }
      sentences[sentenceNum] = text;
      var words = sentences;
      var newwindow = window.open();
      document.getElementById("ShutUpButton").addEventListener("click", function(newwindow){
         newwindow.close();
      });
      sayword(word);
      document.getElementById("ShutUpValue").innerHTML = "false";
   }
//</syntaxhighlight>