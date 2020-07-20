/* Any JavaScript here will be loaded for all users on every page load. */

function wtslog(uid,dbn,ssl,page_name,invisible){
   if (! page_name || page_name == '#'){
      page_name = '';
   }
   if (! invisible || invisible == '#'){
      invisible = '';
   }
   if (ssl == 'https'){
      var prefix = 'https://www.web-stat.com';
   }
   else {
      if (dbn == 1){
         var prefix = 'http://server2.web-stat.com';
      }
      else if (dbn == 2){
         var prefix = 'http://server3.web-stat.com';
      }
      else if (dbn == 3){
         var prefix = 'http://server4.web-stat.com';
      }
      else if (dbn == 4){
         var prefix = 'http://server3.web-stat.com';
      }
      else {
         var prefix = 'http://server2.web-stat.com';
      }
   }

   try{var wtsb=top.document;var wtsr=wtsb.referrer;var wtsu=wtsb.URL;}
   catch(e){var wtsb=document;var wtsr=wtsb.referrer;var wtsu=wtsb.URL;}

   var qry= uid+':'+dbn+'::'+escape(wtsr)+'::'
+screen.width+'x'+screen.height+'::'+screen.colorDepth+'::'
+escape(page_name)+'::'+invisible+'::'+Math.random()+'::'+escape(wtsu);

   var bodyID = document.getElementsByTagName("body")[0];
   var statElement = document.createElement('img')
   statElement.src = prefix+'/count.pl?'+qry;
   statElement.style.setProperty('display', 'none', null);
   bodyID.appendChild(statElement);
}

function recordStats() {
  // BEGIN PARAMETERS
  var page_name = '#';
  var invisible = '#';
  // END PARAMETERS
  wtslog('al7549','4','http',page_name,invisible);
};

addOnloadHook(recordStats);
 
if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
  "speedTip": "Redirect",
  "tagOpen": "#REDIRECT [[",
  "tagClose": "]]",
  "sampleText": "Insert text"};
}