/* Any JavaScript here will be loaded for all users on every page load.  */

/* importScriptPages-start */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

//importScriptPage('MediaWiki:Search_Fix.js', 'dantest');

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* importScriptPages-end */

/**
 Toggles the display of elements on a page
 Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
 See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
 */

// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();
var allClasses = new Object(); // associative map of class names to page elements

function toggler(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled) return;

    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++) {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string") {
            if (toggles.charAt(0) == '-') {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles) toggles = new Array(toggles);
            }
            else toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length) continue;

        var op = toBeToggled[i][0]; // what the operation will be
        switch (op) {
        case "_reset":
            for (var j in toggles)
            toggles[j].style.display = toggles[j]._toggle_original_display;
            break;
        case "_show":
            for (var j in toggles)
            toggles[j].style.display = '';
            break;
        case "_hide":
            for (var j in toggles)
            toggles[j].style.display = 'none';
            break;
        case "":
        default:
            // Toggle
            for (var j in toggles)
            toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
            break;
        }
    }
}

function createTogglerLink(toggler, id) {
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}

function toggleInit() {
    var togglerElems = new Array();
    var toggleGroup = new Array();

    // initialize/clear any old information
    togglers = new Array();
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;


    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem.className) continue;

        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++) {
            var elemClass = elemClasses[j];
            if (!allClasses[elemClass]) allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);

            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle") continue;

            if (elemClass == "_togglegroup") toggleGroup = new Array();
            else if (elemClass == "_toggle") toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init") {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show") elem.style.display = '';
                else if (disp == "hide") elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler") {
                if (togglerID == -1) {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }

                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1) toBeToggled = elemClass.substring(hyphen + 1);
                else {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }

                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }

    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
    createTogglerLink(togglerElems[i], i);
}

/*
function owwsitesearch(f) {
    f.q.value = 'site:http://openwetware.org/wiki/' + f.base.value + '++' + f.qfront.value
}*/


addOnloadHook(toggleInit);

// <syntax>
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME.

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
*/
/* End of the {{USERNAME}} replacement */

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
/*
function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }

    if ($('#title-meta').length == 0) {
        return;
    }

    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '<div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '<div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}


// END JavaScript title rewrite
addOnloadHook(rewriteTitle);


function collapsercexpanded() {
   $(".rc-conntent span.mw-collapsible-toggle-expanded").each( function() { 
     this.click(); //collapsing expanded sections on recentchanges by default.  Wikia has been notified about this problem, but have not fixed it.
   });
}
addOnloadHook(collapsercexpanded);*/
//CItazioni random
/*
function RandomQuote()
{
    var quotes= new Array();
    quotes[0] = "...believes it may be useful in a time of need."
    quotes[1] = "...knows you have a problem, but accepts you anyway."
    quotes[2] = "...believes the aliens were involved at Oak Island."
    quotes[3] = "...demands to know the location of your hidden rebel base!"
    quotes[4] = "...SAW you take the cookie from the cookie jar."
    return quotes[Math.floor(Math.random() * 4.99);
}
addOnloadHook(RandomQuote);*/
PurgeButtonText = 'Aggiorna';

importArticles({
    type: 'script',
    articles: [
        'u:dev:View_Source/code.js', // aggiunge "vedi codice sorgente" al menu modifica per visualizzare il codice sorgente della pagina
        'u:dev:PurgeButton/code.js', // aggiunge "aggiorna" al menu modifica per aggiornare la cache del browser
        'u:dev:AutoEditDropdown/code.js', // apre automaticamente il menu modifica se si passa sopra col mouse
    ]
});