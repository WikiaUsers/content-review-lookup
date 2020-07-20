
if (wgPageName == 'Help:Contents') {
    $('.centralhelpbox').click(function() {
        window.location.href = '/wiki/Help:' + $(this).attr('data-link');
    });
}
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditPages/code.js'
    ]
});
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
  }
 
  if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
  }
 
    if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/c/c4/Small_Icon.png/revision/latest?cb=20150606072417",
     "speedTip": "Small Text",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Small Text"};
 
  }
 
      if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/d/dc/Big_Icon.png/revision/latest?cb=20150530121654",
     "speedTip": "Big Text",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Big Text"};
 
  }
 
        if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/d/dc/Link_User_Button.png/revision/latest?cb=20150606073813",
     "speedTip": "Username Link",
     "tagOpen": "[[User:",
     "tagClose": "]]",
     "sampleText": "Username"};
 
  }
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/9/98/SpanButton.png/revision/latest?cb=20150606141800",
    "speedTip": "Span",
    "tagOpen": "<span>",
    "tagClose": "</span>",
    "sampleText": "Text"};
 
 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/8/80/Template_Icon.png/revision/latest?cb=20150606142352",
    "speedTip": "Template",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Template"};
 
 }
 
       if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/74/Verbatim_Icon.png/revision/latest?cb=20150606142955",
    "speedTip": "Verbatim",
    "tagOpen": "<verbatim>",
    "tagClose": "</verbatim>",
    "sampleText": "Verbatim"};
 
 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/56/Center.png/revision/latest?cb=20150624143216",
    "speedTip": "Center Text",
    "tagOpen": "<center>'>",
    "tagClose": "</center>",
    "sampleText": "Center"};
 
 }
 
        if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/4/4b/Plus_Icon.png/revision/latest?cb=20150606144344",
    "speedTip": "Category",
    "tagOpen": "[[Category:",
    "tagClose": "]]",
    "sampleText": ""};
 
 }
 
        if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/f/fa/Code_Button.png/revision/latest?cb=20150606145317",
    "speedTip": "Code Text",
    "tagOpen": "<code>",
    "tagClose": "</code>",
    "sampleText": "Code"};
 
 }

importArticles({
    type: 'script',
    articles: [
        'u:dev:QuickTitle/code.js',
        'u:dev:UserTags/code.js'
    ]
});