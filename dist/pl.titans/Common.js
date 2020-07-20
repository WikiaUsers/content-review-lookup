// KONFIGURACJA AJAXRC
window.ajaxPages = ["Special:RecentChanges", "Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';

// NIEAKTYWNY UŻYTKOWNIK
window.InactiveUsers = {
    text: 'nieobecny'
};

// BUTTON DYSKUSJI by Szynka013
$(function() {
    $("#dyskusje").appendTo(".page-header .wds-button-group");
});

// KONFIGURACJA DISCUSSIONSRAILMODULE
window.discussionsModuleConfig = {
	'columns' : '1 ',
	'size' : '4',
	'mostrecent' : 'false'
};

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
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

$('#mw-upload-form').submit(function(e) {
    return emptyLicenseAlert(this);
});

$(".wikia-gallery-item .thumbimage").each(function(i, elem) {
    $(elem).attr('title', $(elem).attr('alt'));
});

$(".wikia-gallery-item .image").each(function(i, elem) {
    $(elem).attr('title', $(elem).attr('alt'));
});

// LICENCJE by Vuh
var LicenseOptions = {
    '{{Brak licencji}}': 'Nie znam licencji',
    '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
    '{{CC-BY-SA}}': 'Plik używany zgodnie z zasadami Creative Commons BY-SA',
    '{{Copyright}}': 'Plik posiadający zastrzeżone prawa autorskie',
    '{{PD}}': 'Plik używany zgodnie z zasadami domeny publicznej',
    '{{Wikimedia}}': 'Plik używany zgodnie z zasadami projektów Fundacji Wikimedia',
};

importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:APIQuery.js",
        "u:pl.tes:MediaWiki:Licenses.js"
    ]
});

// LICZNIK PREMIER by Nanaki
function getTimeCountText(time) {
    amount = Math.floor((time - new Date().getTime()) / 1000);
    if (amount < 0) return false;

    var days = Math.floor(amount / 86400);
    amount = amount % 86400;
    var hours = Math.floor(amount / 3600);
    amount = amount % 3600;
    var mins = Math.floor(amount / 60);
    amount = amount % 60;
    var secs = Math.floor(amount);

    var list = [];
    if (days > 0) {
        list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
    }
    if (hours > 0) {
        list.push('<span span="hours">' + hours + ' h</span>');
    }
    list.push('<span span="minutes">' + mins + ' m</span>');
    //list.push('<span span="seconds">' + secs + ' s</span>');

    return list.join(' ');
}

function countBoxTick(box) {
    console.log(this);
    var time = box.data('time');
    var res = getTimeCountText(time);
    if (res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box);
        }, 1000);
    } else {
        box.html(' ');
    }
}

$('.countbox').each(function() {
    if ($(this).data('date')) {
        var time = new Date($(this).data('date')).getTime();
        if (!isNaN(time)) {
            $(this).data('time', time);
            countBoxTick($(this));
        } else {
            $(this).html('Niepoprawna data');
        }
    }
});

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA by Wedkarski
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/a/a8/CudzyslowIconWhite.svg",
        "speedTip": "Wstaw polskie cudzysłowy",
        "tagOpen": "„",
        "tagClose": "”",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/6/62/PpauzaIconWhite.svg",
        "speedTip": "Wstaw półpauzę",
        "tagOpen": "–",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/7/70/ApostrofIconWhite.svg",
        "speedTip": "Wstaw polski apostrof",
        "tagOpen": "’",
        "tagClose": "",
        "sampleText": ""
    };
}