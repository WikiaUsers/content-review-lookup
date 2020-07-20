importArticles({
    type: "script",
    articles: [
    "u:dev:ReferencePopups/code.js"
    ]
});

function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0];
	if(newPageTitle == null) return;
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0];
	if(oldPageTitle == null) return;
	oldPageTitle.innerHTML = newPageTitle.innerHTML;
}
addOnloadHook(fixPageName);

/* Podpisy zamiast prefiksów */
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Dead of Summer Wiki</h2>');
});

// Skrypt dodaje na pasku narzędzi przycisk powrotu na górę strony.
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
}
addOnloadHook(ToTop);
 
// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */