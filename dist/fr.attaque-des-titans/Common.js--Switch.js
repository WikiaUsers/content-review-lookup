// <syntax type="javascript">
 
/********************************************************************************
 * Modèle switch                                                              ***
 * Auteur/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che  ***
 * Voir http://openwetware.org/wiki/OpenWetWare:Toggle pour plus d'infos      ***
 * Revu par @Think D. Solucer                                                 ***
 * Pour utiliser ce modèle :                                                  ***
 * importScriptPage('MediaWiki:Common.js/Switch.js', 'fr.onepiece');          ***
*********************************************************************************/

var togglers = [];     
var allClasses = {};

function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
        
    var i=0;
    for (i=0; i < toBeToggled.length; i++)
    {
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0];
 
        switch (op)
        {
            case "_reset":
                var j1=0;
                for (j1=0; j1 < toggles.length; j1++)
                    toggles[j1].style.display = toggles[j1]._toggle_original_display;
                break;
            case "_show":
                var j2=0;
                for (j2 = 0; j2 < toggles.length; j2++)
                    toggles[j2].style.display = '';
                break;
            case "_hide":
                var j3=0;
                for (j3=0; j3 < toggles.length; j3++)
                    toggles[j3].style.display = 'none';
                break;
            default:
            case "":
                var j4=0;
                for (j4=0; j4 < toggles.length; j4++)
                    toggles[j4].style.display = ((toggles[j4].style.display == 'none') ? '' : 'none');
                break;
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
    var togglerElems = [];
    var toggleGroup = [];
    togglers = [];     
    allClasses = {};
    
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    var i = 0;
    for (i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.toString().split(" ");
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
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
    for (i=0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value;
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
/* Any JavaScript here will be loaded for all users on every page load. */

// <syntax type="javascript">
 
/********************************************************************************
 * Modèle switch                                                              ***
 * Auteur/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che  ***
 * Voir http://openwetware.org/wiki/OpenWetWare:Toggle pour plus d'infos      ***
 * Revu par @Think D. Solucer                                                 ***
 * Pour utiliser ce modèle :                                                  ***
 * importScriptPage('MediaWiki:Common.js/Switch.js', 'fr.onepiece');          ***
*********************************************************************************/

var togglers = [];     
var allClasses = {};

function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
        
    var i=0;
    for (i=0; i < toBeToggled.length; i++)
    {
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0];
 
        switch (op)
        {
            case "_reset":
                var j1=0;
                for (j1=0; j1 < toggles.length; j1++)
                    toggles[j1].style.display = toggles[j1]._toggle_original_display;
                break;
            case "_show":
                var j2=0;
                for (j2 = 0; j2 < toggles.length; j2++)
                    toggles[j2].style.display = '';
                break;
            case "_hide":
                var j3=0;
                for (j3=0; j3 < toggles.length; j3++)
                    toggles[j3].style.display = 'none';
                break;
            default:
            case "":
                var j4=0;
                for (j4=0; j4 < toggles.length; j4++)
                    toggles[j4].style.display = ((toggles[j4].style.display == 'none') ? '' : 'none');
                break;
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
    var togglerElems = [];
    var toggleGroup = [];
    togglers = [];     
    allClasses = {};
    
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    var i = 0;
    for (i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.toString().split(" ");
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
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
    for (i=0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value;
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>