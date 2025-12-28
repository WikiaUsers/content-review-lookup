/* Recent Changes Auto Refresh */
importScriptPage( 'AjaxRC/code.js', 'dev' );

window.railWAM = {
    logPage:"Project:WAM Log",
    top5000mode:"true",
    lang: 'en'
};

/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */

$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});

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
 
function addHideButtons() {
	if(typeof getElementsByClass != 'function') {
		return;
	}
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	if(typeof getElementsByClass != 'function') {
		return;
	}
 
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}
 
/* Substitute Template:Information into upload page */
$(document).ready(function() {
 
	if (wgPageName != 'Special:Upload') {
		return;
	}
 
	$('#wpUploadDescription').text("==Beschreibung==\r\n{{Information\r\n|achtung=\r\n|beschreibung=\r\n|quwllw=\r\n|urheber=\r\n|datum=\r\n|anmerkungen=\r\n|lizenz=\r\n|andere versionen=\r\n|kategorien=\r\n}}");
 
});

//edit buttons
 if (mwCustomEditButtons) {
    
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
        "imageFile": "https://images.wikia.nocookie.net/hdm/images/4/48/Ae_button.png",
        "speedTip": "Insert the æ character",
        "tagOpen": "æ",
        "tagClose": "",
        "sampleText": ""};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/hdm/images/a/a6/AE_button.png",
        "speedTip": "Insert the Æ character",
        "tagOpen": "Æ",
        "tagClose": "",
        "sampleText": ""};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/hdm/images/1/13/O_button.png",
        "speedTip": "Insert the ø character",
        "tagOpen": "ø",
        "tagClose": "",
        "sampleText": ""};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/hdm/images/2/29/À_button.png",
        "speedTip": "Insert the à character",
        "tagOpen": "à",
        "tagClose": "",
        "sampleText": ""};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/hdm/images/9/9a/Ë_button.png",
        "speedTip": "Insert the ë character",
        "tagOpen": "ë",
        "tagClose": "",
        "sampleText": ""};
}