/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*** Хотфикс для сворачиваемых таблиц ***/
$('.collapsible').addClass('mw-collapsible');
$('.collapsed').addClass('mw-collapsed');
 
// Ajax auto-refresh
window.ajaxPages = ['Служебная:RecentChanges','Служебная:WikiActivity','Служебная:Contributions','Служебная:NewFiles'];
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автообновление';
 
//Неактивные пользователи
window.InactiveUsers = { months: 1, text: 'НЕАКТИВЕН' };


//Кнопки-вставлялки
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/sims/ru/images/4/44/Knopka_Tire.png",
        "speedTip": "Тире",
        "tagOpen": "—",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
        "speedTip": "На другую строку",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
        "speedTip": "Зачеркнуть",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Зачеркнутый текст"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
        "speedTip": "Перенаправление",
        "tagOpen": "#перенаправление [[",
        "tagClose": "]]",
        "sampleText": "Ведите текст"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
        "speedTip": "Кавычки",
        "tagOpen": "«",
        "tagClose": "»",
        "sampleText": "Текст"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Название шаблона"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "",
        "speedTip": "Тег",
        "tagOpen": "<",
        "tagClose": ">",
        "sampleText": "Название тега"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20140529054149/nuikiepedia/ru/images/9/90/-.png",
        "speedTip": "Решетка",
        "tagOpen": "#",
        "tagClose": "",
        "sampleText": ""
    };
}

/* Наведение на стрелку заставляет её открыться */
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
/* Username */
window.onload = function () {
    if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
};

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */

/** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
// set up the words in your language
var NavigationBarHide = '[ закрыть ]';
var NavigationBarShow = '[ открыть ]';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 1;


// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if ($(NavChild).hasClass('NavPic')) {
                NavChild.style.display = 'none';
            }
            if ($(NavChild).hasClass('NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if ($(NavChild).hasClass('NavPic')) {
                NavChild.style.display = 'block';
            }
            if ($(NavChild).hasClass('NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
$(function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for ( var i = 0; NavFrame = divs[i]; i++ ) {
        // if found a navigation bar
        if ($(NavFrame).hasClass("NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for ( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ($(NavFrame.childNodes[j]).hasClass("NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for ( var i = 1; i <= indexNavigationBar; i++ ) {
            toggleNavigationBar(i);
        }
    }
});