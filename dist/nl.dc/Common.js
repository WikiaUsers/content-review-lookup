/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/
 
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
  
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Personage",
     "tagOpen": "{{Personage\r |titel=",
     "tagClose": "\r |image=\r |naam=\r |alias=|alt_namen=\r |vertaald=\r |familie=\r |nationaliteit=\r |thuisbasis=\r |krachten=\r |oorsprong=\r |alignement=\r |team=\r |bondgenoten=\r |vijanden=\r |bedenkers=\r |eerste=\r |eerste_nl=\r}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Strip",
     "tagOpen": "{{Stripboek\r |titel=",
     "tagClose": "\r |image=\r |serie=\r |datum=\r |uitgever=\r\r |titel1=\r |schrijver1=\r |vertaling1=\r |tekenaar1=\r |inkter1=\r |inkleuring1=\r |origineel1=\r\r |vorige=\r |volgende=\r}}",
     "sampleText": ""}
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png",
     "speedTip": "Serie",
     "tagOpen": "{{Stripserie\r |titel=",
     "tagClose": "\r |image=\r |uitgever=\r |loopjaren=\r |nummers=\r |hoofdrol=\r |bijrol=\r}}",
     "sampleText": ""}
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png",
     "speedTip": "Team",
     "tagOpen": "{{Team\r |titel=",
     "tagClose": "\r |image=\r |naam=\r |alt_namen=\r |vertaald=\r |alignement=\r |allianties=\r |leden=\r |thuisbasis=\r |bedenkers=\r |eerste=\r |eerste_nl=\r}}",
     "sampleText": ""}
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png",
     "speedTip": "Locatie",
     "tagOpen": "{{Locatie\r |titel=",
     "tagClose": "\r |image=\r |type=\r |alt_namen=\r |vertaalde_naam=\r |sterrenstelsel=\r |zonnestelsel=\r |planeet=\r |land=\r |staat/provincie=\r |stad=\r |bedenkers=\r |eerste=\r |eerste_nl=\r}}",
     "sampleText": ""}
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
     "speedTip": "Voertuig",
     "tagOpen": "{{Voertuig\r |titel=",
     "tagClose": "\r |image=\r |type=\r |alt_namen=\r |vertaalde_naam=\r |eigenaar=\r |alt_eigenaar=\r |ontwerper=\r |bedenkers=\r |eerste=\r |eerste_nl=\r}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": " https://images.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
     "speedTip": "Voorwerp",
     "tagOpen": "{{Voorwerp\r |titel=",
     "tagClose": "\r |image=\r |type=\r |alt_namen=\r |vertaalde_naam=\r |eigenaar=\r |alt_eigenaar=\r |ontwerper=\r |bedenkers=\r |eerste=\r |eerste_nl=\r}}",
     "sampleText": ""};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
     "speedTip": "Afbeelding",
     "tagOpen": "{{Afbeelding \r |type=afb\r |bron=",
     "tagClose": "\r | ow1 = \r}}",
     "sampleText": ""}
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
     "speedTip": "Omslag",
     "tagOpen": "{{Afbeelding \r |type=omslag\r |bron=",
     "tagClose": "\r}}",
     "sampleText": ""}
}