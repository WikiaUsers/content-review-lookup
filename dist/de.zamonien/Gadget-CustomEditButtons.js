/* Anpassung der Edit-Buttons im Quelltext-Editor */
$(function(){
	$("#mw-editbutton-nowiki,#mw-editbutton-math,#mw-editbutton-media,#mw-editbutton-headline,#mw-editbutton-hr").css("display", "none");
});
 
if (mwCustomEditButtons) {
/*** wrappers *****/
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Kategorie",
     "tagOpen": "[[Kategorie:",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
     "speedTip": "Weiterleitung",
     "tagOpen": "#WEITERLEITUNG [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/advieser/images/b/bd/EditAnf%C3%BChrungszeichenYellow.png/revision/latest?cb=20141221141010&path-prefix=de",
     "speedTip": "Anführungszeichen",
     "tagOpen": "„",
     "tagClose": "“",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/advieser/images/2/28/EditViertelgestrichYellow.png/revision/latest?cb=20141221141012&path-prefix=de",
     "speedTip": "Geviertelstrich",
     "tagOpen": "–",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/advieser/images/5/52/EditApostrophYellow.png/revision/latest?cb=20141221141010&path-prefix=de",
     "speedTip": "Apostroph",
     "tagOpen": "’",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/advieser/images/6/6b/EditPunkteYellow.png/revision/latest?cb=20141221141012&path-prefix=de",
     "speedTip": "Drei Punkte",
     "tagOpen": "…",
     "tagClose": "",
     "sampleText": ""};
}