/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 
 // END import Onlyifediting-functions
 // ============================================================


/*  Custom buttons */

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100820192443/htmlcss/images/3/38/Code.png",
     "speedTip": "Contenu codé",
     "tagOpen": "<code>",
     "tagClose": "</code>",
     "sampleText": "Contenu codé"};

}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100820192625/htmlcss/images/2/26/Favicon.png",
     "speedTip": "Liens interwiki",
     "tagOpen": "[[en:",
     "tagClose": "]]",
     "sampleText": "Nom anglais de l'article"};

}