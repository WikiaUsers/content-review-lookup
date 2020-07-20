//===============================================================================
//   Ostrzeżenie o braku licencji dla plików
//===============================================================================
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
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});

//===============================================================================
//   Wikiowa Postać
//===============================================================================
window.UserTagsJS = {
        tags: {
                wikiowaelsa:    { u:'Zbuntowana Księżniczka', m:'Zbuntowana Księżniczka', f:'Zbuntowana Księżniczka' }
        },
        modules: {
                inactive: 30,
                autoconfirmed: true,
                newuser: true,
                nonuser: true,
                custom: {
                        'Harmonixia':            ['wikiowaelsa']
                }
        }
};
 
importArticles({type: "script", articles: ["u:dev:UserTags/code.js"]});