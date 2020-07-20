// KONFIGURACJA AJAXRC
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:AllPages',
    'Special:UncategorizedPages',
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:Aktywność_na_wiki",
    "Specjalna:Wszystkie_strony",
    "Specjalna:Nieskategoryzowane_strony"
];
 
// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'staff', 'helper']
};
 
// KONFIGURACJA ADDRAILMODULE
window.AddRailModule = [
    {
        page: 'Template:RailModule',
        prepend: true,
        maxAge: 86400
    }
];
 
// KONFIGURACJA INACTIVEUSERS
InactiveUsers = {
    text: 'nieobecny'
};

// OSTRZEŻENIE O BRAKU LICENCJI by Vuh
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA by Wedkarski
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/8/85/Cudzyslow-icon.svg",
        "speedTip": "Wstaw polskie cudzysłowy",
        "tagOpen": "„",
        "tagClose": "”",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/d/d7/Ppauza.svg",
        "speedTip": "Wstaw półpauzę",
        "tagOpen": "–",
        "tagClose": "",
        "sampleText": ""
    };
}