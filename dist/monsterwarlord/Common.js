/* Any JavaScript here will be loaded for all users on every page load. */

// Create the "dev" namespace if it doesn't exist already:
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
     css: '#stdSummaries { width: 260px; border-radius: 4px; padding: 2px 2px;}',
     select: [ '(click to browse)', [ 'Added infobox','Added sources/appearances','Added template(s) ','Added/modified categories','Added new information','Cleanup','Corrected spelling/grammar','Corrected template usage','Expanded','Factual correction','Formatting','Replaced duplicate image(s)','Reverted test edit','Reverted vandalism','Reverted vanity edit','Revised','Test edit','Updated with new information' ] ]
};

window.BackToTopStart = 300; //how much to scroll before the backtotop button appears

//Toggles the display of elements on a page 
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = [];     
var allClasses = {}; // associative map of class names to page elements

function toggler(id)
{
    let toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (let i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        let toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (let j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (let j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (let j in toggles)
                    toggles[j].style.display = 'none';
                break;
            default:
                // Toggle
                for (let j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    let togglerElems = [];
    let toggleGroup = [];
 
    // initialize/clear any old information
    togglers = [];     
    allClasses = {};
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
    // make list of all document classes
    let elems = document.getElementsByTagName("*");
    let numelems = elems.length;
    for (let i = 0; i < elems.length; i++)
    {
        let elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        let togglerID = -1;
        let elemClasses = (elem.className + '').split(' ');  // get list of classes
        for (let j = 0; j < elemClasses.length; j++)
        {
            let elemClass = elemClasses[j];
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
                let disp = elemClass.substring(12);
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
                let toBeToggled;
                let hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                let op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (let k = 0; k < togglerElems.length; k++)
        createTogglerLink(togglerElems[k], k);
}
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value;
}
 
addOnloadHook(toggleInit);

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */