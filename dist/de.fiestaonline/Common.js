//<pre>
/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
//<pre>
function addonBackgroundSwitcher() {

    var logoimages = new Array();
    logoimages[0] = 'http://de.opwiki.org/images/OPwiki-new-ace.png';
    logoimages[1] = 'http://de.opwiki.org/images/OPwiki-new-aokiji.png';
    logoimages[2] = 'http://de.opwiki.org/images/OPwiki-new-franky.png';
    logoimages[3] = 'http://de.opwiki.org/images/OPwiki-new-sanji.png';
    logoimages[4] = 'http://de.opwiki.org/images/OPwiki-new-zorro.png';
    logoimages[5] = 'http://de.opwiki.org/images/OPwiki-new-lucci.png';
    logoimages[6] = 'http://de.opwiki.org/images/OPwiki-new-mihawk.png';
    logoimages[7] = 'http://de.opwiki.org/images/OPwiki-new-shanks.png';
    logoimages[8] = 'http://de.opwiki.org/images/OPwiki-new-enel.png';
    logoimages[9] = 'http://de.opwiki.org/images/OPwiki-new-moria.png';
    logoimages[10] = 'http://de.opwiki.org/images/OPwiki-new-nami.png';
    logoimages[11] = 'http://de.opwiki.org/images/OPwiki-new-smoker.png';
    logoimages[12] = 'http://de.opwiki.org/images/OPwiki-new-croco.png';
    logoimages[13] = 'http://de.opwiki.org/images/OPwiki-new-ruffy.png';
    logoimages[14] = 'http://de.opwiki.org/images/OPwiki-buggy.png';
    logoimages[15] = 'http://de.opwiki.org/images/OPwiki-chopper.png';
    logoimages[16] = 'http://de.opwiki.org/images/OPwiki-lysop.png';
    logoimages[17] = 'http://de.opwiki.org/images/OPwiki-oz.png';
    logoimages[18] = 'http://de.opwiki.org/images/OPwiki-perona.png';
    logoimages[19] = 'http://de.opwiki.org/images/OPwiki-robin.png';


    var currentlogo = Math.floor( Math.random() * logoimages.length );

    //check for IE
    var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');

    if(rslt==null){ //not IE
        document.getElementById('p-logo').style.background="url('" + logoimages[currentlogo] + "') no-repeat left top";
        document.getElementById('kidszone').style.background="url('http://de.opwiki.org/Kidszone_Logo_klein.png') no-repeat";
    }
    else{ // IE
        document.getElementById('p-logo').style.background="none";
        document.getElementById('kidszone').style.background="none";
        document.getElementById('p-logo').style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+logoimages[currentlogo]+"', sizingMethod='crop')";
        document.getElementById('kidszone').style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://de.opwiki.org/Kidszone_Logo_klein.png', sizingMethod='crop')";
    }

    document.getElementById('p-logo').style.display="inline";
    doneOnloadHook = true;

}

addOnloadHook(addonBackgroundSwitcher);

//for IE to cache background images
try {
  document.execCommand("BackgroundImageCache", false, true);
} catch(err) {}


function horizont_scroll(i)
{
  if(!i){ i=0; doneOnloadHook = true;}
  i=i+1;
  if(i>1601) i=1;
  var val=""+i+"px 0px"
  document.body.style.backgroundPosition=val;
  setTimeout("horizont_scroll("+i+")",100);
}
//addOnloadHook(horizont_scroll);


    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin
     */

// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements

function toggler(id)
{
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
    var togglerElems = new Array();
    var toggleGroup = new Array();
        
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
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
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);

            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;

            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
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
                    togglers[togglerID] = new Array();
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
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }

    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}

addOnloadHook(toggleInit);

function unToggle()
{    
   var path=window.location.href;
   var parts=path.split("#");
   if(parts.length > 1)
   {
      path=parts[parts.length-1];
      parts=path.split(".23");
      
      var untogglerGroup = new Array();
      var untogglerClass = new Array();
          
      // make list of all document classes
      var elems = document.getElementsByTagName("*");
      var numelems = elems.length;
      for (var c=0; c < parts.length; c++)
      {
        for (var i = 0; i < elems.length; i++)
        {
            var elem = elems[i];
            if (!elem.className)
                continue;
    
            var elemClasses = elem.className.split(' '); // get list of classes
            
            for (var j = 0; j < elemClasses.length; j++)
            {
              var elemClass=elemClasses[j];
              if (elemClass != parts[c])
                  continue;   
              else
              {
                  untogglerGroup.push(elem);
                  untogglerClass.push(elemClass);
              }
            }
         }
      }
  
      // add javascript links to all toggler elements
      for (var i = 0; i < untogglerGroup.length; i++)
      {
          untogglerGroup[i].style.display = '';
      }
   } 
}

addOnloadHook(unToggle);

//</pre>