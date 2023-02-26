/* Any JavaScript here will be loaded for all users on every page load. */

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */

//==========================================
// BEGIN RailWAM Log
//==========================================

//Unmessifies RailWAM Logs
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
//=========================================
// END RailWAM 
//=========================================
 /* Any JavaScript here will be loaded for all users on every page load. */

if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}
// Article Rating window customization options.
window.ArticleRating = {   
    title: 'Rate this page!',   
    values: ['Worst', 'Bad', 'Average', 'Good', 'Great'],   
    starSize: [22, 22],   
    starColor: ['#ccc', '#fff782'],   
    starStroke: '#000',   
    exclude: ['Superpower Wiki', 'Superpower Wiki:Administration'],   
    excludeCats: ['Category:Policy', 'Category:Organization', 'Category:Blog posts', 'Category:Character Sheet'],   
    location: 'top-rail'
    
}
 
/* Custom edit buttons
See http://help.wikia.com/wiki/Help:Custom_edit_buttons
 */
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
     "speedTip": "List",
     "tagOpen": "\n* ",
     "tagClose": "\n* Element B\n* Element C",
     "sampleText": "Element A"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
     "speedTip": "Numbering",
     "tagOpen": "\n# ",
     "tagClose": "\n# Element 2\n# Element 3",
     "sampleText": "Element 1"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png",
     "speedTip": "Blockquote",
     "tagOpen": "<blockquote>",
     "tagClose": "</blockquote>",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Note",
     "tagOpen": "{{Info|Insert title|",
     "tagClose": "}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Category",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": "Category name"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
     "speedTip": "Picture gallery",
     "tagOpen": "\n<gallery>\nImage:",
     "tagClose": "|[[The Sims Wiki]] Logo\nImage:Wiki.png|[[The Sims Wiki]] Logo\nImage:Wiki.png|Eine [[The Sims Wiki]] Logo\n<\/gallery>",
     "sampleText": "Wiki.png"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Template",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Template"};
 }