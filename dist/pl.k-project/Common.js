//===============================================================================
//			Common.js K-Project Wiki
//===============================================================================
// Umieszczony tutaj kod JavaScript zostanie załadowany
// przez każdego użytkownika, podczas każdego ładowania strony.
//===============================================================================

importArticles({
    type: 'script',
    articles: [
	'MediaWiki:DisplayTimer.js',
	'MediaWiki:Preload.js',
	'MediaWiki:AjaxRC.js',
	'MediaWiki:Common.js/UserTags.js',
	'MediaWiki:Common.js/license.js',
        'u:dev:ReferencePopups/code.js',
	'u:dev:WallGreetingButton/code.js',
	'u:dev:SearchSuggest/code.js',
	'u:dev:RevealAnonIP/code.js'
    ]
});

// Ostrzeżenie o braku licencji dla plików
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
// Usunięcie z galerii rozmiaru pliku
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});
//===============================================================================
// MediaWiki:CustomButton.js
//===============================================================================

if (mwCustomEditButtons) {
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
		"speedTip": "Ekspresowa kasacja",
		"tagOpen": "\{\{ek|",
		"tagClose": "\}\}",
		"sampleText": "powód"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/e/e1/O_Accent_Button.png",
		"speedTip": "Dodaj znak ō",
		"tagOpen": "ō",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/d/db/U_Accent_Button.png",
		"speedTip": "Dodaj znak ū",
		"tagOpen": "ū",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Utwórz przekierowanie",
		"tagOpen": "#PATRZ [[",
		"tagClose": "]]",
		"sampleText": "Przekierowanie"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5c/Button_h2p.png",
		"speedTip": "Nagłówek 2. poziomu",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Tekst nagłówka"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/15/Button_h3p.png",
		"speedTip": "Nagłówek 3. poziomu",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Tekst nagłówka"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/1c/Button_h4p.png",
		"speedTip": "Nagłówek 4. poziomu",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Tekst nagłówka"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
		"speedTip": "Dodaj przypisy",
		"tagOpen": "<ref>",
		"tagClose": "</ref>",
		"sampleText": ""};
}