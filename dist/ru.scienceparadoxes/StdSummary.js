function fillEditSummaries()
 {
    var label = document.getElementById("wpSummaryLabel");

    if(label == null)
    {
        return;
    }

    var comboString = "Стандартные описания:\n<select id='stdSummaries' onchange='onStdSummaryChange()'>\n  <option value=''>&lt;выберите из списка&gt;</option>";  
    var request;

    try
    {
        request = new XMLHttpRequest();
    }
    catch(e)
    {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    }

    xhrSummaries = request;
    request.open("GET", "http://ru.scienceparadoxes.wikia.com/index.php?title=Шаблон:Stdsummaries&action=render");

    request.onreadystatechange = function()
    {
        if(xhrSummaries.readyState == 4)
        {
            var txt = xhrSummaries.responseText.split("<!--")[0];
            txt = txt.replace("<p>", "").replace("</p>", "");
            var lines = txt.split("\n");
            var i;

            for(i = 0; i < lines.length; i++)
            {
                comboString += (lines[i].indexOf("-- ") == 0) ?
                  ("  <option value = '" + lines[i].substring(3) + "'>" + lines[i].substring(3) + "</option>\n") :
                  (" <optgroup label='" + lines[i] + "' />\n");
            }

            comboString += "</select>\n<br />";
            label.innerHTML = comboString + label.innerHTML;
        }
    }

    request.send(null);
 }
addOnloadHook(fillEditSummaries);

 function onStdSummaryChange()
 {
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
    {
        var box = document.getElementById("wpSummary");

        var sstring = /\/\*(.*)\*\//.exec(box.value);
        if(sstring)
          box.value = sstring[0] + " " + value;
        else
          box.value = value;
    }
 }