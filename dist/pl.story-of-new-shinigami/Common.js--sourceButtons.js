/* DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA */
 
if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
     "speedTip": "Align text to the left",
     "tagOpen": "<left>",
     "tagClose": "</left>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Center the text",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
     "speedTip": "Align text to the right",
     "tagOpen": "<right>",
     "tagClose": "</right>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
     "speedTip": "Justify the text",
     "tagOpen": "<p align=justify>",
     "tagClose": "</p>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
     "speedTip": "insert superscript",
     "tagOpen": "<sup>",
     "tagClose": "</"+ "sup>",
     "sampleText": "Superscript"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
     "speedTip": "Insert subscript",
     "tagOpen": "<sub>",
     "tagClose": "</"+ "sub>",
     "sampleText": "Subscript"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
     "speedTip": "Comment, which is visible during edition",
     "tagOpen": "<!--",
     "tagClose": "-->",
     "sampleText": "Message text."};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Add the code",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Coded text"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
     "speedTip": "Disambiguation template",
     "tagOpen": "{{Disambiguation template",
     "tagClose": "}}",
     "sampleText": ""};
   
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
     "speedTip": "Mark this article as to delete",
     "tagOpen": "{{Delete",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
     "speedTip": "Wstaw galerię zdjęć",
     "tagOpen": "\n<gallery spacing=medium columns=3 position=center widths=180 orientation=none captionalign=center>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "File:Example 1.png|Description 1\nFile:Example 2.png|Description 2"};

 }