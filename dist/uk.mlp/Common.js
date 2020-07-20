// ########################################## //
// ### Нові функції Дружба — це диво Вікі ### //
// ### Version 1.2                        ### //
// ########################################## //

var MessageBlock = {
  title: 'Блокування',
  message: 'Вас було заблоковано на $2 з причини $1'
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewCategoriesLocalizedFilter.js',
        'u:dev:MediaWiki:NewImages.js',
        'u:dev:MediaWiki:RailWAM/code.js',
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
        'u:dev:MediaWiki:View Source/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
        'u:dev:MediaWiki:Wikificator.js',
        'u:dev:MediaWiki:ManageReferences/code.js',
        'u:dev:MediaWiki:MessageBlock/code.js'
    ]
});

/* Автовизначення ніку користувача */
if (wgUserName !== null) $('span.insertusername').text(wgUserName);

/* Автооновлення (Налаштування) */
window.ajaxPages = [
    "Спеціальна:Watchlist",
    "Спеціальна:Contributions",
    "Спеціальна:WikiActivity",
    "Спеціальна:RecentChanges",
    "Спеціальна:NewFiles",
    "Спеціальна:Images"
];
window.AjaxRCRefreshText = 'Автооновлення сторінки';

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/c/c3/Button_guillemets.png",
        "speedTip": "Лапки",
        "tagOpen": "«",
        "tagClose": "»",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/c/c8/Button_redirect.png",
        "speedTip": "Перенаправлення",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Введіть текст"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/1/13/Button_enter.png",
        "speedTip": "На інший рядок",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/6/63/Button_l_en.png",
        "speedTip": "Посилання на англ. вікі",
        "tagOpen": "[[en:",
        "tagClose": "]]",
        "sampleText": "Назва сторінки"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/4/43/Button-template.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Шаблон"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/0/0c/Button_Link_DifferentName.png",
        "speedTip": "Внутрішнє посилання",
        "tagOpen": "[[|",
        "tagClose": "]]",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.com/central/images/c/cb/Button_wikipedia.png",
        "speedTip": "Вікіпедія",
        "tagOpen": "[[wikipedia:uk:|",
        "tagClose": "]]",
        "sampleText": "Вікіпедія"
    };
}

/* Закриття блогу для коментування */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Цей блог був неактивний протягом <expiryDays> днів. Прохання не редагувати його.",
    nonexpiryCategory: "Архівні блоги"
};

/* LinkImagePopups */
if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    impart('MediaWiki:Gadget-LinkImagePopup.js');
}

/* Неактивні користувачі */
window.InactiveUsers = {
    months: 1,
    text: 'Поза Еквестрією'
};
// ########################################## //
// ########################################## //
// ########################################## //

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = '';
        ''
    } else {
        var tpm = '';
        ''
    }

    // Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунди';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' хвилина, и ' + left;
        } else {
            left = (diff % 60) + ' хвилин, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' година, ' + left;
        } else {
            left = (diff % 24) + ' годин, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' днів, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer