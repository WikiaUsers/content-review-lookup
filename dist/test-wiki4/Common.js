/* Any JavaScript here will be loaded for all users on every page load. */

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

importScriptPage('PowerPageMaker/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ListUsers/code.js',
        // ...
    ]
});

importArticles({
    type: "script",
    articles: [
        "u:dev:Medals/code.js"
    ]
});
/*************************/
/* Custom edit buttons
/*************************/

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
 
         if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/71/Warning_Icon.png/revision/latest?cb=20150606154119",
    "speedTip": "Warning",
    "tagOpen": "{{Warning|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
         if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/d/de/Note_Icon.png/revision/latest?cb=20150606154110",
    "speedTip": "Code Text",
    "tagOpen": "{{Note|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
          if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/e/e2/Error_Icon.png/revision/latest?cb=20150606154807",
    "speedTip": "Error",
    "tagOpen": "{{Error|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
           if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/9/97/Div_Button_Icon.png/revision/latest?cb=20150606155413",
    "speedTip": "Div",
    "tagOpen": "<div>",
    "tagClose": "</div>",
    "sampleText": "Div Text"};

 }
 
            if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/b/b2/Info_Icon.png/revision/latest?cb=20150606160047",
    "speedTip": "Info",
    "tagOpen": "{{Info|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
             if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/6/60/Checkbox_Icon.png/revision/latest?cb=20150606160059",
    "speedTip": "Checkbox",
    "tagOpen": "<verbatim>Checkbox</verbatim>",
    "tagClose": "",
    "sampleText": ""};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/55/Waving_Smiley_Icon.png/revision/latest?cb=20150606160638",
    "speedTip": "Waving Smiley (GIF)",
    "tagOpen": "[[File:Wave_emoticon2.gif]]",
    "tagClose": "",
    "sampleText": ""};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/6/63/Question_Icon.png/revision/latest?cb=20150606162136",
    "speedTip": "Question",
    "tagOpen": "{{Question|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/7a/Help_Icon.png/revision/latest?cb=20150606163904",
    "speedTip": "Help",
    "tagOpen": "{{Help|",
    "tagClose": "}}",
    "sampleText": ""};

 }
       if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/b/b1/Delete_Icon.png/revision/latest?cb=20150606164041",
    "speedTip": "Delete Marker",
    "tagOpen": "{{Delete}}",
    "tagClose": "",
    "sampleText": ""};

 }
 
        if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/57/Not_Fixed_yet.png/revision/latest?cb=20150606165747",
    "speedTip": "Not Fixed Yet",
    "tagOpen": "{{Not Fixed Yet|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
         if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/70/CheckIcon.png/revision/latest?cb=20150624151610",
    "speedTip": "Fixed Error",
    "tagOpen": "{{Fixed Error|",
    "tagClose": "}}",
    "sampleText": ""};

 }
 
         if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/8/84/Dot123.png/revision/latest?cb=20150606170426",
    "speedTip": "Enumeration dot (Circle)",
    "tagOpen": "<li>",
    "tagClose": "",
    "sampleText": ""};

 }
 
          if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/6/6f/DotABC.png/revision/latest?cb=20150606170723",
    "speedTip": "Enumeration dot (Square)",
    "tagOpen": "*",
    "tagClose": "",
    "sampleText": ""};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/3/31/Red.png/revision/latest?cb=20150623180746",
    "speedTip": "Red Text",
    "tagOpen": "<span style='color:red;'>",
    "tagClose": "</span>",
    "sampleText": "Red Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/1/16/Blue.png/revision/latest?cb=20150623180044",
    "speedTip": "Blue Text",
    "tagOpen": "<span style='color:blue;'>",
    "tagClose": "</span>",
    "sampleText": "Blue Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/72/Green.png/revision/latest?cb=20150623181012",
    "speedTip": "Green Text",
    "tagOpen": "<span style='color:green;'>",
    "tagClose": "</span>",
    "sampleText": "Green Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/9/92/Yellow.png/revision/latest?cb=20150623180746",
    "speedTip": "Yellow Text",
    "tagOpen": "<span style='color:yellow;'>",
    "tagClose": "</span>",
    "sampleText": "Yellow Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/4/43/Orange.png/revision/latest?cb=20150623180745",
    "speedTip": "Orange Text",
    "tagOpen": "<span style='color:orange;'>",
    "tagClose": "</span>",
    "sampleText": "Orange Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/5f/Olive.png/revision/latest?cb=20150623180746",
    "speedTip": "Olive Text",
    "tagOpen": "<span style='color:olive;'>",
    "tagClose": "</span>",
    "sampleText": "Olive Text"};
     }
    
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/c/c9/Dark_Blue.png/revision/latest?cb=20150623180045",
    "speedTip": "Dark-Blue Text",
    "tagOpen": "<span style='color:darkblue;'>",
    "tagClose": "</span>",
    "sampleText": "Dark-Blue Text"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/3/37/Dark_Red.png/revision/latest?cb=20150623180747",
    "speedTip": "Dark-Red Text",
    "tagOpen": "<span style='color:darkred;'>",
    "tagClose": "</span>",
    "sampleText": "Dark-Red Text"};
      }
    
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/9/96/Dark_Green.png/revision/latest?cb=20150623180046",
    "speedTip": "Dark-Green Text",
    "tagOpen": "<span style='color:darkgreen;'>",
    "tagClose": "</span>",
    "sampleText": "Dark-Green Text"};
      }
    
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/0/06/Brown.png/revision/latest?cb=20150623180045",
    "speedTip": "Brown Text",
    "tagOpen": "<span style='color:#b07030;'>",
    "tagClose": "</span>",
    "sampleText": "Brown Text"};
         }
    
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/3/34/Lime.png/revision/latest?cb=20150623180747",
    "speedTip": "Lime-Green Text",
    "tagOpen": "<span style='color:lime;'>",
    "tagClose": "</span>",
    "sampleText": "Lime-Green Text"};
         }
    
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/5d/Dark_Grey.png/revision/latest?cb=20150623180047",
    "speedTip": "Dark-Grey Text",
    "tagOpen": "<span style='color:darkgrey;'>",
    "tagClose": "</span>",
    "sampleText": "Dark-Grey Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/a/ab/Cyan.png/revision/latest?cb=20150624114030",
    "speedTip": "Cyan Text",
    "tagOpen": "<span style='color:cyan;'>",
    "tagClose": "</span>",
    "sampleText": "Cyan Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/50/Pink.png/revision/latest?cb=20150624115156",
    "speedTip": "Pink Text",
    "tagOpen": "<span style='color:#ff77a7;'>",
    "tagClose": "</span>",
    "sampleText": "Pink Text"};

 }
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/c/cd/Sea_Green.png/revision/latest?cb=20150624141246",
    "speedTip": "Sea Green Text",
    "tagOpen": "<span style='color:#009F82;'>",
    "tagClose": "</span>",
    "sampleText": "Sea Green Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/8/80/White.png/revision/latest?cb=20150624140412",
    "speedTip": "White Text",
    "tagOpen": "<span style='color:white;'>",
    "tagClose": "</span>",
    "sampleText": "White Text"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/71/Black.png/revision/latest?cb=20150624140412",
    "speedTip": "Black Text",
    "tagOpen": "<span style='color:black;'>",
    "tagClose": "</span>",
    "sampleText": "Black Text"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/9/93/Dark_Cyan.png/revision/latest?cb=20150624141525",
    "speedTip": "Dark-Cyan Text",
    "tagOpen": "<span style='color:#008B8B;'>",
    "tagClose": "</span>",
    "sampleText": "Dark-Cyan Text"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/1/10/Gold.png/revision/latest?cb=20150624144608",
    "speedTip": "Gold Text",
    "tagOpen": "<span style='color:gold;'>",
    "tagClose": "</span>",
    "sampleText": "Gold Text"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/1/14/Very_Small_Text.png/revision/latest?cb=20150624153245",
    "speedTip": "Very Small Text",
    "tagOpen": "<small><small>",
    "tagClose": "</small></small>",
    "sampleText": "Very Small Text"};

 }
 
       if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/9/9f/Very_Big_Text.png/revision/latest?cb=20150624153426",
    "speedTip": "Very Big Text",
    "tagOpen": "<big><big>",
    "tagClose": "</big></big>",
    "sampleText": "Very Big Text"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/79/VeryVeryBigText.png/revision/latest?cb=20150624181026",
    "speedTip": "Very Very Big Text (Huge Text)",
    "tagOpen": "<big><big><big>",
    "tagClose": "</big></big></big>",
    "sampleText": "Very Very Big Text"};

 }
 
        if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/1/10/Very_Huge.png/revision/latest?cb=20150624181804",
    "speedTip": "Very Very Very Big Text (Enormous Text)",
    "tagOpen": "<big><big><big><big>",
    "tagClose": "</big></big></big></big>",
    "sampleText": "Very Very Very Big Text"};

 }
 
       if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/2/25/Enormous_Text.png/revision/latest?cb=20150624182351",
    "speedTip": "Enormous Text",
    "tagOpen": "<span style='font-size:50px;'>",
    "tagClose": "</span>",
    "sampleText": "Enormous Big Text"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/6/66/99px_Text.png/revision/latest?cb=20150624183601",
    "speedTip": "99px Text",
    "tagOpen": "<span style='font-size:99px;'>",
    "tagClose": "</span>",
    "sampleText": "99px Text"};

 }
 
       if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/e/e8/46px_Text.png/revision/latest?cb=20150624183923",
    "speedTip": "46px Text",
    "tagOpen": "<span style='font-size:46px;'>",
    "tagClose": "</span>",
    "sampleText": "46px Text"};

 }
 
        if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/3/3b/74px_Text.png/revision/latest?cb=20150624184153",
    "speedTip": "74px Text",
    "tagOpen": "<span style='font-size:74px;'>",
    "tagClose": "</span>",
    "sampleText": "74px Text"};

 }
 
         if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/5c/10px_Text.png/revision/latest?cb=20150624184732",
    "speedTip": "10px Text",
    "tagOpen": "<span style='font-size:10px;'>",
    "tagClose": "</span>",
    "sampleText": "10px Text"};

 }
 
 
    if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/4/4e/H1.png/revision/latest?cb=20150624175835",
    "speedTip": "Heading 1",
    "tagOpen": "=",
    "tagClose": "=",
    "sampleText": "Heading"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/78/H2.png/revision/latest?cb=20150624175835",
    "speedTip": "Heading 2",
    "tagOpen": "==",
    "tagClose": "==",
    "sampleText": "Heading"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/2/26/H3.png/revision/latest?cb=20150624175835",
    "speedTip": "Heading 3",
    "tagOpen": "===",
    "tagClose": "===",
    "sampleText": "Heading"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/d/d4/H4.png/revision/latest?cb=20150624175836",
    "speedTip": "Heading 4",
    "tagOpen": "====",
    "tagClose": "====",
    "sampleText": "Heading"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/e/ec/H5.png/revision/latest?cb=20150624175836",
    "speedTip": "Heading 5",
    "tagOpen": "=====",
    "tagClose": "=====",
    "sampleText": "Heading"};

 }
 
     if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/5/5c/H6.png/revision/latest?cb=20150624175836",
    "speedTip": "Heading 6",
    "tagOpen": "======",
    "tagClose": "======",
    "sampleText": "Heading"};

 }
 
      if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/79/Box_Div.png/revision/latest?cb=20150624183431",
    "speedTip": "Div Box",
    "tagOpen": "<div style='border:2px solid#000000; width: 300px; height:300px; border-radius: 3px;'>",
    "tagClose": "</div>",
    "sampleText": "Text"};

 }
       if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/7/75/65jdn2f.png/revision/latest?cb=20150707144627",
    "speedTip": "HeadingA Text",
    "tagOpen": "{{HeadingA|",
    "tagClose": "}}",
    "sampleText": "HeadingA Text"};

 }
 
/*****************************/
/* End custom edit buttons
/*****************************/

$("#UserProfileMasthead .masthead-info hgroup h2").hide();