// Blokada starych blogów i wątków
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 30 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum"
};

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Nikt nie skomentował tego blogu od ponad 30 dni. Nowy komentarz zostałby i tak prawdopodobnie uznany za odkopywanie starych dyskusji, więc możliwość komentowania została automatycznie wyłączona. Jeśli jesteś autorem bloga i chcesz, aby komentowanie zawsze było możliwe, dodaj kategorię „Blogi zawsze aktualne”.",
    nonexpiryCategory: "Blogi zawsze aktualne"
};

//Przycisk „Edytuj wstęp”
EditIntroButtonText = 'Edytuj wstęp';

//LinkPreview (http://dev.wikia.com/wiki/LinkPreview) missing image placeholder and disable for character images on the list of characters
window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://vignette.wikia.nocookie.net/mlp/images/6/6d/TECH-brak_obrazka.svg/revision/latest?cb=20170709164212&path-prefix=pl',
    RegExp: {
        iparents: ['.characters-gallery'],
    },
});


//Import skryptów
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js",
        "MediaWiki:Common.js/BlokForum.js",
        "w:c:dev:EditIntroButton/code.js",
        "w:c:dev:ReferencePopups/code.js"
    ]
});

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************

/*    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
}); */

//Licznik na żywo
var counterTargets = [];
if ($('.CountdownTimer').length > 0) {
    for (var i = 0; i < $('.CountdownTimer').length; i++) {
        counterTargets.push(Date.parse($("#CountdownTarget" + (i + 1)).html()));
    }
}

function startTime() {
    var currentTime = new Date().getTime();
    for (var i = 0; i < counterTargets.length; i++) {
        var counterTarget = counterTargets[i];
        var timeToPass = (counterTarget - currentTime) / 1000;
        if (timeToPass < 0) {
            $("#CountdownTimer" + (i + 1)).html('<tr><td><span class="CountdownLabel">Odliczanie zakończone</span></tr>');
        } else {
            var days = Math.floor(timeToPass / 86400);
            var hours = Math.floor(timeToPass % 86400 / 3600);
            var minutes = createTwoDigitNumber(Math.floor(timeToPass % 86400 % 3600 / 60));
            var seconds = createTwoDigitNumber(Math.floor(timeToPass % 86400 % 3600 % 60));
            $("#CountdownTimer" + (i + 1)).html(prepareCounterText(days, hours, minutes, seconds));
        }
    }
    t = setTimeout('startTime()', 500);
}

function prepareCounterText(days, hours, minutes, seconds) {
    var result = "<tr>";
    result += '<td>' + days + '<br /><span class="CountdownLabel">' + createPluralForm(days, 'Dzień', 'Dni', 'Dni') + '</span></td>';
    result += '<td>' + hours + '<br /><span class="CountdownLabel">' + createPluralForm(hours, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>';
    result += '<td>' + minutes + '<br /><span class="CountdownLabel">' + createPluralForm(minutes, 'Minutę', 'Minuty', 'Minut') + '</span></td>';
    result += '<td>' + seconds + '<br /><span class="CountdownLabel">' + createPluralForm(seconds, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td>';
    result += "</tr>";
    return result;
}

function createTwoDigitNumber(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}

addOnloadHook(startTime);

//Skrypt do obliczania poprawnej formy liczby mnogiej autorstwa Vengira, optymalizowany przez Dj mateooshkę, zrefaktoryzowany przez Haifischa
function createPluralForm(number, single, plural1, plural2) {
    if (number == 1) {
        return single;
    } else if ((number % 10 > 1) && (number % 10 < 5) && (number % 100 < 12 || number % 100 > 21)) {
        return plural1;
    } else {
        return plural2;
    }
}

var activityBackgrounds = {
    1: "https://images.wikia.nocookie.net/__cb20140527232909/mlp/pl/images/6/65/TECH-MAT-TS.png",
    2: "https://images.wikia.nocookie.net/__cb20140527232908/mlp/pl/images/4/48/TECH-MAT-R.png",
    3: "https://images.wikia.nocookie.net/__cb20140527232907/mlp/pl/images/2/2e/TECH-MAT-FS.png",
    4: "https://images.wikia.nocookie.net/__cb20140527232908/mlp/pl/images/f/fd/TECH-MAT-RD.png",
    5: "https://images.wikia.nocookie.net/__cb20140527232907/mlp/pl/images/a/a3/TECH-MAT-AJ.png",
    6: "https://images.wikia.nocookie.net/__cb20140527232908/mlp/pl/images/8/8c/TECH-MAT-PP.png",
    7: "https://images.wikia.nocookie.net/__cb20140527232907/mlp/pl/images/c/ca/TECH-MAT-KC.png",
    8: "https://images.wikia.nocookie.net/__cb20140527232908/mlp/pl/images/1/1b/TECH-MAT-KL.png",
    9: "https://images.wikia.nocookie.net/__cb20140527232908/mlp/pl/images/0/08/TECH-MAT-S.png",
};


backgroundLoaded = false;

$('#WikiaRail').bind('DOMNodeInserted', function(event) {
    if (!backgroundLoaded) {
        $("#WikiaRecentActivity").attr("style","background: url('" + activityBackgrounds[Math.floor((Math.random() * 9) + 1)] + "') no-repeat right bottom");
        backgroundLoaded = true;
    }
});

//Informowanie o braku licencji
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została wybrana. Proszę o dodanie odpowiedniej licencji."
    if(window.emptyLicenseWarningDelivered) {
        return true;
    }
    if($('#wpLicense').val() == '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true
        return false
    }
    return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});

///Skrypt na nazwę użytkownika
if (wgUserName != null/* && span.insertusername != undefined*/) {
    $(".insertusername").html(wgUserName);
}

//Code for Template:Youtube2. Replaces specially marked YouTube links with embeeded videos. Intended as a successor to the outdated flash-based youtube tags.
while ($(".youtube-placeholderlink").size() > 0) {
    currentItem = $(".youtube-placeholderlink")[0];
    embeedId = $(currentItem).attr("data-id");
    $(currentItem).replaceWith('<iframe width="340" height="191" src="https://www.youtube.com/embed/'+embeedId+'"frameborder="0" allowfullscreen></iframe>');
}

//Images changing on hover for the list of characters
$(".characters-gallery").on("hover", function(){
    $(this).find("img").attr("src", $(this).attr("data-focus"));
});
 
$(".characters-gallery").on("mouseout", function(){
    $(this).find("img").attr("src", $(this).attr("data-default"));
});