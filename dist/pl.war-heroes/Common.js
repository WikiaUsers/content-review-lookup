/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane, a edytorzy którzy wkleili owy plik - blokowani na jeden dzień. Za notoryczne przesyłanie plików bez licencji grozi ban do jednego roku,a po nim każdy następny plik to ban."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
 
// Konfiguracja UserTags
window.UserTagsJS = {
	tags: {
		bohwiki:      { u:'Bohater', title: 'Bohater' }
	},
	modules: {
		custom: {
			'Silver635': ['bohwiki'],
                        
		},
		inactive: 60,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:dev:UserTags/code.js"				// UserTag
   ]
})