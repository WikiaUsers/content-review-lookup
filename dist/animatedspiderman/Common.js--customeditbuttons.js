/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/animatedspiderman/images/c/ce/Ep_ref_Button.png",
     "speedTip": "Episode/issue reference tag",
     "tagOpen": "<ref name=>{{ep ref|",
     "tagClose": "}}</ref>",
     "sampleText": "number"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "\{\{Character\r| name        = ",
     "tagClose": "\r| image       = \r| real name   = \r| alias       = \r| age         = \r| species     = \r| designation = \r| gender      = \r| hair color  = \r| eye color   = \r| relatives   = \r| affiliation = \r| powers      = \r| weaknesses  = \r| equipment   = \r| first       = \r| voice       = \r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/animatedspiderman/images/d/de/Film_Button.png",
     "speedTip": "Insert episode template",
     "tagOpen": "\{\{Episode\r| episode  = ",
     "tagClose": "\r| image    = \r| airdate  = \r| director = \r| writer   = \r| prev     = \r| next     = \r\}\}",
     "sampleText": ""};
  
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/5/5d/Team_Button.png",
     "speedTip": "Insert organization template",
     "tagOpen": "\{\{Organization\r| name       = ",
     "tagClose": "\r| image      = \r| location   = \r| leader     = \r| goal       = \r| members    = \r| attributes = \r| first      = \r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/animatedspiderman/images/d/dc/Image_Button.png",
     "speedTip": "Insert filebox template",
     "tagOpen": "\{\{Filebox\r| description = ",
     "tagClose": "\r| season      = \r| episode     = \r| source      = \r| origin      = \r| license     = screenshot\r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/animatedspiderman/images/1/1d/Copyrights_needed_Button.png",
     "speedTip": "Uncredited image tag",
     "tagOpen": "\{\{subst:Unknown/ukn|",
     "tagClose": "}}",
     "sampleText": "both"};
 
}