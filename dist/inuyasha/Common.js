importArticles({
    type: "script",
    articles: [
         "MediaWiki:Common.js/FairUseUpload.js", /* Fair use form in Special:Upload */
    ]
});

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=86400&templates=expand');

/**
 * Inserts text at the cursor's current position
 * Originally from Wookieepedia
 */
function insertAtCursor( myField, myValue ) {
	//IE support
	if ( document.selection ) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if( myField.selectionStart || myField.selectionStart == '0' ) {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	} else {
		myField.value += myValue;
	}
}

/* Ability to change full page title
 * See w:c:dev:DISPLAYTITLE for info and attribution
 */
 
$(function() {
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0]; // Find the span with the new title
	if(newPageTitle == null) return; // If not found exit
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0]; //Find the page's title
	if(oldPageTitle == null) return; // If not found exit
	oldPageTitle.innerHTML = newPageTitle.innerHTML; // Set the title
});

//edit buttons
 if (mwCustomEditButtons) {
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inuyasha/images/6/6c/U-macron.png",
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
        "tagClose": "\" /> ",
        "sampleText": "source name"};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/images/9/93/Chapter_reference_button.png",
        "speedTip": "Add a chapter reference",
        "tagOpen": "<ref name=>{{Cite manga|",
        "tagClose": "}}</ref>",
        "sampleText": "chapter#"};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/images/e/e9/Episode_reference_button.png",
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