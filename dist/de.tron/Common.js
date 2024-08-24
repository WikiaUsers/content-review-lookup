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
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/ac/Button_redir_rtl.png",
     "speedTip": "Neue Zeile",
     "tagOpen": "<br />",
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
     "tagOpen": "{{PRO",
     "tagClose": "}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
     "speedTip": "Mit CONTRA stimmen",
     "tagOpen": "{{CONTRA",
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
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184938/vereins/images/e/ee/Mx1.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/c/cf/Nagelfeile.png",
     "speedTip": "Nagelfeile",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184602/vereins/images/0/01/Gi30.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/8/8d/HarHarHar.png",
     "speedTip": "HarHar",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812185322/vereins/images/e/ee/Twinkle.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/6/6a/Verlegen.png",
     "speedTip": "Verlegen sein",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184604/vereins/images/f/f6/Helga.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/5/51/Help_me.png",
     "speedTip": "Zu Hülf",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184630/vereins/images/a/ad/Help.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/4/48/LOL.png",
     "speedTip": "LOL",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184834/vereins/images/6/6d/Lol1.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/4/4f/Fragezeichen.png",
     "speedTip": "???",
     "tagOpen": "http://upload.wikimedia.org/wikipedia/commons/e/e4/IrritierterSmiley.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/7/75/Zwinkern.png",
     "speedTip": "Zwinkern",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20091006204740/vereins/images/c/c3/Zwinker.png",
     "tagClose": "",
     "sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100519195130/vereins/images/8/83/Kopf.png",
     "speedTip": "Aua",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20100408194335/de/images/7/7e/Kopf_an_die_Wand.gif",
     "tagClose": "",
     "sampleText": ""};
 
}
 
 
/* add contribs to user menu - 2/1/11 */
function UserBeoMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="http://de.community.wikia.com/wiki/Benutzer:'+ encodeURIComponent (wgUserName) +'">Zentral-Account</a></li>');
} 
addOnloadHook(UserBeoMenuItem);
 
/* add contribs to user menu - 2/1/11 */
function UserContribsMenuItem() {
$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Eigene Beiträge</a></li>');
} 
addOnloadHook(UserContribsMenuItem);