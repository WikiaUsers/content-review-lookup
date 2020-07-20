/* JavaScript an dieser Stelle wirkt sich auf alle Skins für jeden Benutzer aus. */
/* Ausgelagertes JavaScript für individuelle Bearbeiten-Schaltflächen. Wird in MediaWiki:Common.js eingebunden. */
/* <pre> <nowiki> */

if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Kategorie",
     "tagOpen": "[[Kategorie:",
     "tagClose": "]]",
     "sampleText": "Kategorie einfügen"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
     "speedTip": "Weiterleitung",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/ac/Button_redir_rtl.png",
     "speedTip": "Neue Zeile",
     "tagOpen": "<br/>",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_delete.png",
     "speedTip": "Löschantrag stellen",
     "tagOpen": "{{löschen|",
     "tagClose": "}}",
     "sampleText": "Grund"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/6/60/Button_support.png",
     "speedTip": "Mit PRO stimmen",
     "tagOpen": "{{Pro",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
     "speedTip": "Mit CONTRA stimmen",
     "tagOpen": "{{contra",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
     "speedTip": "Gallerie einfügen",
     "tagOpen": "<gallery>",
     "tagClose": "</gallery>",
     "sampleText": "Füge hier deine Bilder ein"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/9/92/Anbeten.png",
     "speedTip": "Anbeten",
     "tagOpen": " https://images.wikia.nocookie.net/__cb20090812184938/vereins/images/e/ee/Mx1.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/0/07/Knopf_smile.png",
     "speedTip": "Lächeln",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/f/fb/Smile.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/5/5f/Knopf_wink.png",
     "speedTip": "Zwinker",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/e/e0/Wink.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/9/91/Knopf_confused.png",
     "speedTip": "Verwirrt",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/5/52/Confused.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/3/36/Knopf_ugly.png",
     "speedTip": "Ugly",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/6/64/Ugly.gif.png ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/e/e0/Knopf_sad.png",
     "speedTip": "Traurig",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/2/22/Sad.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/7/7d/Knopf_hehe.png",
     "speedTip": "hehe",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/9/94/Hehe.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/9/96/Knopf_razz.png",
     "speedTip": "Zunge",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/c/cc/Razz.gif ",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/halo/de/images/c/c2/Knopf_bang.png",
     "speedTip": "Aua",
     "tagOpen": " https://images.wikia.nocookie.net/halo/de/images/3/39/Bang.gif ",
     "tagClose": "",
     "sampleText": ""};
}