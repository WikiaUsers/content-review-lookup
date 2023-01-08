/* <nowiki> */
/* Custom Edit Buttons */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) { 
 
       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
         "speedTip": "Redirect",
         "tagOpen": "#REDIRECT [[",
         "tagClose": "]]",
         "sampleText": "Insert text"};
 
       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
         "speedTip": "Insert a table",
         "tagOpen": '{| class="wikitable"\n|-\n',
         "tagClose": "\n|}",
         "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};
 
       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
         "speedTip": "Line break",
         "tagOpen": "<br />",
         "tagClose": "",
         "sampleText": ""};
 
       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
         "speedTip": "Insert a picture gallery",
         "tagOpen": '\n<div align="center"><gallery>\n',
         "tagClose": "\n</gallery></div>",
         "sampleText": "File:Example.jpg|Caption1\nFile:Example.jpg|Caption2"};
}
/* </nowiki> */