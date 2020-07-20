/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Użycie {{USERNAME}} ukazuje nazwę użytkownika odwiedzającego stronę.
// Odpowiedzialny za to kod należy do Szablon:USERNAME.
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
importScriptPage('MediaWiki:Common.js/SpoilerPop.js');
 
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

// Display 12 hour time followed by day, month (English, full name) 
// and year with "(UTC)" at the end 
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{Styczeń;Luty;Marzec;Kwiecień;Maj;Czerwiec;Lipiec;Sierpień;Wrzesień;Październik;Listopad;Grudzień}m %Y (UTC)'; 
importArticles({ 
type: 'script', 
articles: [ // ... 
'u:dev:DisplayClock/code.js', 
// ... 
] 
});

/* Sugestie */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Tooltips */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});