/* Any JavaScript here will be loaded for all users on every page load. */

 if ( window.mwCustomEditButtons ) {
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"} );
 
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert text"} );
 
  mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"} );
 
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""} );
 
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"} );

mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/xmen-nexus/images/3/3b/Button_template_alt.png",
     "speedTip": "Insert Character Template",
     "tagOpen": "{{Template:Infobox character\r| title = ",
     "tagClose": "\r| image = \r| Codename = \r| Real Name = \r| Affiliation = \r| Type = \r| Age = \r| Hair = \r| Eyes = \r| Height = \r| Weight = \r\}\}",
     "sampleText": ""} );

mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/xmen-nexus/images/3/3b/Button_template_alt.png",
     "speedTip": "Insert Plot Template",
     "tagOpen": "{{Template:CSS image crop\r| title = ",
     "tagClose": "\r| image = \r| Plot Name = \r| Enemy = \r\}\}",
     "sampleText": ""} );
  }