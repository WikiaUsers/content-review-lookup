/* Credit to the SwordBurst2 Wiki */

;(function() {
    "use strict";
    
   // config 
   var defaultFont = "Helvetica";
   var options = { 
       "Courier New" : "Courier New", 
       "Fondamento" : "Fondamento", 
       "Helvetica" : "Helvetica",
       "Josefin Sans" : "Josefin Sans", 
       "Times New Roman" : "Times New Roman",
   };
   //
   
   // cookie config
   var prefCookieExpirationDays=7;
   var prefCookieName="rt_wiki_font_pref";
   //
   
   var pageContent=$("#WikiaMainContent")[0];
   var pageRail=$("WikiaRail")[0];
   
   var fontPickerAlreadyExists=$("#page-font")[0];
   if (fontPickerAlreadyExists) { return true; }
   
   var pickerLabelText="Select a font: ";
   var pickerLabel=$("<label for='page-font'></label>").text (pickerLabelText);
   
   var picker=$("<select id='page-font'></select>");
   
   function getCookie(cname) {
       var name=cname + "=";
       var decodedCookie=decodeURIComponent(document.cookie); 
       var ca = decodedCookie.split(';');
       for(var i = 0; i <ca.length; i++) {
           var c=ca[i];
           while (c.charAt(0) == ' ') {
               c = c.substring(1);
           }
           if(c.indexOf(name) === 0) {
               return c.substring(name.length, c.length);
           }
       }
       return "";
   }
   
   function changeFont(fontName) {
       if (pageContent) {
           pageContent.style["font-family"] = fontName; }
           if (pageRail) { pageRail.style["font-family"] = fontName; }
   }
   
   function setPrefCookie(fontName) {
       var expiration=new Date();
       expiration.setTime(expiration.getTime() + (prefCookieExpirationDays * 86400 * 1000));
   
   document.cookie=prefCookieName + "=" + encodeURIComponent(fontName) + ";expires=" + expiration.toUTCString() + ";path=/" + ";samesite=strict";
   }
   
   defaultFont=decodeURIComponent(getCookie(prefCookieName)) || defaultFont;
   
   for (var displayName in options) {
       var fontOption=$("<option>" + displayName + "</option>");
       fontOption.attr("value", options[displayName]);
       
       if (options[displayName] == defaultFont) {
           fontOption.attr("selected", "true");
       changeFont(options[displayName]); }
       picker.append(fontOption);
   }
   
   picker.change(function() {
       changeFont(picker.val());
       setPrefCookie(picker.val());
   });
   
   var fontPickerContainer=$("<div class='fp-container'></div>").css("margin", "10px 0");
   
   fontPickerContainer.append(pickerLabelText);
   fontPickerContainer.append(picker);
   
   var content=$(".page-header")[0];
   if (!content) { return true }
   
   fontPickerContainer.insertAfter(content);
})();