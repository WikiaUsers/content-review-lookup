var togglers = [];
var allClasses = {}; // associative map of class names to page elements
 
var toggler = function(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = [toggles];
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
        var j;
        
        switch (op)
        {
            case "_reset":
                for (j in toggles)
                    if (toggles.hasOwnProperty(j))
                        toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (j in toggles)
                    if (toggles.hasOwnProperty(j))
                        toggles[j].style.display = '';
                break;
            case "_hide":
                for (j in toggles)
                    if (toggles.hasOwnProperty(j))
                        toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (j in toggles)
                    if (toggles.hasOwnProperty(j))
                        toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
};
 
var createTogglerLink = function(togglr, id) {
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', '#');
    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        toggler(id);
    });
    var child = togglr.firstChild;
    togglr.removeChild(child);
    toggle.appendChild(child);
    togglr.insertBefore(toggle, togglr.firstChild);
};
 
var toggleInit = function() {
    var togglerElems = [];
    var toggleGroup = [];
 
    // initialize/clear any old information
    togglers = [];
    allClasses = {};

    // make list of all document classes
    var elems = document.getElementsByTagName("*"); // BAD
    
    for (var i = 0, numelems = elems.length; i < numelems; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = [];
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = [];
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = [];
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push([op, toBeToggled]);
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
};
 
$(toggleInit);