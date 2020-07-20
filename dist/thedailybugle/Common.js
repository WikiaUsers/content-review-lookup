AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importScriptPage('ShowHide/code.js','dev');

importScriptPage('Countdown/code.js', 'dev');

////////////////////////////////////////////////////////////////////////////////'
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "\{\{Character\r| name        = ",
     "tagClose": "\r| image       = \r| imagewidth  = \r| real name   = \r| alias       = \r| age         = \r| species     = \r| gender      = \r| hair color  = \r| eye color   = \r| relatives   = \r| enemies     = \r| affiliation = \r| powers      = \r| weaknesses  = \r| equipment   = \r| first       = \r| voice       = \r\}\}",
     "sampleText": ""};