/* 
//////////////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
/////////////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/gintama/images/1/11/Button_category.png",
     "speedTip": "Category",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": "Insert text"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"}; 

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert text"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"}
}

/* 
///////////////////////////////////////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS BUTTONS TO ADD EMPTY TEMPLATE SYNTAX TO THE JAVASCRIPT EDIT TOOLBAR
// : Disabled due to template change....
//////////////////////////////////////////////////////////////////////////////////////////////////////


if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Add character infobox",
     "tagOpen": "\{\{Char infobox blue\r| color				= ",
     "tagClose": "\r| romajiname1		= \r| kanjiname1			= \r| imagename			= \r| seiyuu_kanjiname	= \r| seiyuu_romajiname	= \r| links				= \r| affiliationENG		= \r| affiliationJAP		= \r| species			= \r| gender				= \r| birthdate			= \r| zodiac				= \r| age				= \r| height				= \r| weight				= \r| others				= \r\}\}",
     "sampleText": ""};
}
*/