/* Any JavaScript here will be loaded for all users on every page load. */

// <source lang="JavaScript">
 
// CUSTOM EDIT BUTTONS
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 
 if (mwCustomEditButtons) {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/raulelistesting/images/7/71/Button_accent_o.png",
     "speedTip": "Bubuh askara ó",
     "tagOpen": "ó",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Pelencongan",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Garis batal",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Teks yang mahu dibatalakan"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Garis bawah",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Teks bergaris bawah"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
     "speedTip": "Besar",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Teks besar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Kecil",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Teks kecil"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Ketengah",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Teks ketengah"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Templat",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nama Templat"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020123837/central/images/c/ce/Button_no_include.png",
     "speedTip": "Tidak termasuk",
     "tagOpen": "<noinclude>",
     "tagClose": "</noinclude>",
     "sampleText": "Tidak termasuk"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Bubuh komen tersorok",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Komen"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Pecah baris",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
}