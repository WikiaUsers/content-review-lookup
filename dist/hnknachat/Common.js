/*<pre>*/
/* Recent Changes Auto Refresh */
importScriptPage( 'AjaxRC/code.js', 'dev' );


/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */

$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});

/* Substitute Template:Fair use rationale into upload page. BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. */
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\r\n|Description=\r\n|Source=\r\n|Purpose=\r\n|Resolution=\r\n|Other Information=\r\n}}';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

//edit buttons
 if (mwCustomEditButtons) {
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/images/e/e6/O-macron.png",
        "speedTip": "Add the ō character",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png",
        "speedTip": "Add a reference",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Source goes here"};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/f/f2/Ref_name_button.png",
        "speedTip": "Cite a named source",
        "tagOpen": "<ref name=\"",
        "tagClose": "\"/ > ",
        "sampleText": "source name"};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/9/93/Chapter_reference_button.png",
        "speedTip": "Add a chapter reference",
        "tagOpen": "<ref name=>{{Cite manga|",
        "tagClose": "}}</ref>",
        "sampleText": "chapter#"};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/e/e9/Episode_reference_button.png",
        "speedTip": "Add an episode reference",
        "tagOpen": "<ref name=>{{Cite anime|",
        "tagClose": "|episode#}}</ref>",
        "sampleText": "series#"};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/images/4/4d/Movie_reference_button.png",
        "speedTip": "Add a movie reference",
        "tagOpen": "<ref name=>{{Cite movie|",
        "tagClose": "}}</ref>",
        "sampleText": "Movie#"};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
        "speedTip": "Comment visible only for editors",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Insert comment here"};
}

/*</pre>*/