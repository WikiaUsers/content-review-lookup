/* Any JavaScript here will be loaded for all users on every page load. */

// <syntax type="javascript">

/** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */

// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = [];
var allClasses = {}; // associative map of class names to page elements

function toggler(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled) return;

    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++) {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof (toggles) == "string") {
            if (toggles.charAt(0) == '-') {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles) toggles = new Array(toggles);
            } else toggles = allClasses[toggles];
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
                break;
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
    var togglerElems = [];
    var toggleGroup = [];

    // initialize/clear any old information
    togglers = [];
    allClasses = {};
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
            if (!allClasses[elemClass]) allClasses[elemClass] = [];
            allClasses[elemClass].push(elem);

            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle") continue;

            if (elemClass == "_togglegroup") toggleGroup = [];
            else if (elemClass == "_toggle") toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init") {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show") elem.style.display = '';
                else if (disp == "hide") elem.style.display = 'none';
                elem._toggle_original_display = disp;
            } else if (elemClass.substring(0, 8) == "_toggler") {
                if (togglerID == -1) {
                    togglerID = togglers.length;
                    togglers[togglerID] = [];
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

function owwsitesearch(f) {
    f.q.value = 'site:http://openwetware.org/wiki/' + f.base.value + '++' + f.qfront.value;
}

addOnloadHook(toggleInit);

// START CustomImages script
(function CustomImages($) {
    var imgWidth = $('.custom-image img').attr('width');

    $('.custom-image').css('width', imgWidth);

    $('.custom-image img').css({
        'border': '1px solid #aaaaaa',
            'border-radius': '1em',
            'overflow': 'hidden',
            'padding': '0'
    });

    $('.custom-image-desc').css({
        'border': '1px solid #aaaaaa',
            'border-radius': '1em',
            'text-align': 'center',
            'width': '100%'
    });
}(jQuery));
// END CustomImages script

/* Import Articles Start */

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.MessageWallUserTags = {
    tagColor: '#A58200',
    users: {
        'NengeMishou': 'Bureaucrat, Administrator'
        'Scylar.Otori5': 'Administrator'
    }
};

 
importArticles({
    type: 'script',
    articles: [
        'u:dev:CollapsibleInfobox/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:MessageWallUserTags/code.js'
    ]
});