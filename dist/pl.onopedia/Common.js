//Skrypt na nazwę użytkownika
if (wgUserName != null) {
    $(".insertusername").html(wgUserName);
}

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

// Podtytuły

$(function() {
    // Strony projektu
    $('.ns-4 .page-header__title').text(wgTitle); // usuń prefiks z tytułu strony
    $('.ns-4 .page-header__title').after('<div class="page-header__page-subtitle">Strona projektu</div>'); // dodaj podpis pod tytułem
    
    //Tu wstawiaj kolejne
});

// Inactive user badge

InactiveUsers =  { text :  'bierny'  } ;

//Navigation popups
popupAdminLinks=true;

/* Przycisk "Wkład" w menu personalnym (z undertale wiki) */
function UserContribsMenuItem() {
	$('.wds-global-navigation__user-menu .wds-global-navigation__dropdown-content ul.wds-list li:first-child').after('<li><a href="/wiki/Specjalna:Wkład/'+ encodeURIComponent (wgUserName) +'" class="wds-global-navigation__dropdown-link">Wkład</a></li>');
}
addOnloadHook(UserContribsMenuItem);

//Spoiler Alter: <div id="SpoilerAlter>

window.SpoilerAlertJS = {
    question: 'Ta sekcja zawiera tajne informacje! Czy chcesz je przeczytać?',
    yes: 'Tak',
    no: 'Nie',
    fadeDelay: 1200
};

// Blok starych blogów

okno. LockOldBlogs  =  { 
    expiryDays :  60 , 
    expiryMessage :  "Ten blog został zarchiwizowany, ponieważ nie był edytowany od 60 dni. Nie komentuj go. Pownie i tak nikt ci nie odpowie. Zamiast tego zadaj pytanie w dyskucjach."
    //nonexpiryCategory :  "Nigdy nie zarchiwizowane blogi"
};

// Preload templates

preloadTemplates_subpage = "case-by-case";