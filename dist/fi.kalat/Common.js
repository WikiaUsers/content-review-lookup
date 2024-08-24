/* T‰m‰n sivun koodi liitet‰‰n jokaiseen sivulataukseen */
/* <pre> */

if (wgAction == "edit" || wgAction == "submit") {

   /***** Custom edit buttons *****/ 
   if (mwCustomEditButtons) { 

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
         "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
         "speedTip": "Pienenn‰",
         "tagOpen": '\n<small>\n',
         "tagClose": "\n</small>",
         "sampleText": "Pienenn‰"};   

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
         "speedTip": "Yliviivaa",
         "tagOpen": '\n<s>\n',
         "tagClose": "\n</s>",
         "sampleText": "Yliviivaa"}; 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/3/34/Button_hide_comment.png",
         "speedTip": "Kommentti",
         "tagOpen": '\n<!--\n',
         "tagClose": "\n-->",
         "sampleText": "Kommentti"}; 
     }
}

/* </pre> */