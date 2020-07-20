// Konfiguracja dla AutoEditDropdown
var	AutoEditDropdownConfig = {
	expandedAreaContribute: true,
	expandedAreaEdit: false
};
 
// RevealAnonIP
window.RevealAnonIP = {
	permissions: ['bureaucrat','sysop']
};

// Licencje
var LicenseOptions = {
	'{{Fairuse}}': 'Dozwolony użytek',
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi z jednego z projektów Wikimedia'
};

// UserTag
window.UserTagsJS = {
	tags: {
		usermonth:	{ u:'Użyt. miesiąca', title: 'Użytkownik miesiąca' }
	},
	modules: {
		inactive: 30,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};
importArticles({
    type: "script",
    articles: [
	"MW:Video.js",					// Filmy
	"MW:Slider.js",					// Nowy slider
	"u:pl.tes:MediaWiki:Summaries.js",		// Summaries
	"u:pl.tes:MediaWiki:Preload.js",		// Preload
	"u:pl.tes:MediaWiki:Preload2.js",		// Preload
	"u:pl.tes:MediaWiki:AjaxRC.js",			// AjaxRC
	"u:pl.tes:MediaWiki:Wiki.js",			// ToTop
	"u:pl.tes:MediaWiki:APIQuery.js",               // Licencje plików
	"u:pl.tes:MediaWiki:Licenses.js",               // Licencje plików
	"u:pl.tes:MediaWiki:Change.js",			// Change
	"u:pl.tes:MediaWiki:UserTags.js",		// UserTag
	"u:pl.tes:MediaWiki:Slider.js",			// Nowy slider
	"u:pl.tes:MediaWiki:CategorySorter.js",		// CategorySorter
	"u:pl.tes:MediaWiki:AutoEditDropdown.js",	// AutoEditDropdown
	"u:pl.tes:MediaWiki:VisualSpellCheck.js",	// VisualSpellCheck
	"u:pl.tes:MediaWiki:LockOldBlogs.js",		// LockOldBlogs
	"u:pl.tes:MediaWiki:DupImageList.js",		// DupImageList
	"u:pl.tes:MediaWiki:Disablecomments.js",	// Disablecomments
	"u:pl.tes:MediaWiki:SearchSuggest.js",		// SearchSuggest
	"u:pl.tes:MediaWiki:RevealAnonIP.js",		// RevealAnonIP
	"u:dev:WallGreetingButton/code.js"		// WallGreetingButton
   ]
});

if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Btn_toolbar_tt.png",
		"speedTip": "Wstaw « »",
		"tagOpen": "«",
		"tagClose": "»",
		"sampleText": "Tekst"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/21/Button_invalid_template.png",
		"speedTip": "Bez formatowania Wiki",
		"tagOpen": "<nowiki>",
		"tagClose": "</nowiki>",
		"sampleText": "Tekst"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/e/e1/O_Accent_Button.png",
		"speedTip": "Dodaj ō",
		"tagOpen": "ō",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/d/db/U_Accent_Button.png",
		"speedTip": "Dodaj ū",
		"tagOpen": "ū",
		"tagClose": "",
		"sampleText": ""};
};