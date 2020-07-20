/* DisplayTimer */
importArticle({type:'script', article:'w:c:dev:DisplayTimer/code.js'}); 
 
/* BOTONES EXTRAS */
/******************/
 if (typeof(mwCustomEditButtons) != 'w:c:dev:undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};


    }