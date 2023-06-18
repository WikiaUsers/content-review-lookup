//<!--
var smileyList;

function showSmileyList()
{
  var vis = (smileyList.style.display == "block");
  if (!vis)
  {
    var toolbar = document.getElementById('editpage-specialchars');
    toolbar.appendChild(smileyList);
    smileyList.style.display = "block";
  } else {
    smileyList.style.display = "none";
  }
}

function smileys2()
{

  var toolbar = document.getElementById('editpage-specialchars');
  if (!toolbar) { return false; }

  var textbox = document.getElementById('wpTextbox1');
//  if (!textbox) { return false; }

  // Don't generate buttons for browsers which don't fully
  // support it.
/*  if (!(document.selection && document.selection.createRange))
  {
    return false;
  }
  if (textbox && textbox.selectionStart === null) {
    return false;
  }*/

  var smileyspan = document.createElement("span");
  smileyspan.innerHTML = "<small><b>Smileys</b></small>";
  smileyspan.id = "edittools_smileys";
  smileyspan.title = "Smileys";
  smileyspan.style.cursor = "pointer";
  smileyspan.onclick = function() {
    showSmileyList();
    return false;
  };

  toolbar.appendChild(smileyspan);
	
  smileyList = document.createElement("div");
  smileyList.id = "smileyList";
  smileyList.style.position = "static";
  /*populate smiley box using RationalWiki:Smileys*/
  var req = false;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (req) {
    req.open("GET", mw.config.get("wgServer") + mw.config.get("wgScript") + "?title=MediaWiki:Smileys", true);
    //req.overrideMimeType("text/xml");
    req.onreadystatechange = function()
    {
      if (req.readyState==4 && req.status == 200) {
        var xmlhack = document.createElement("div");
        xmlhack.innerHTML = req.responseText;
        var divs = xmlhack.getElementsByTagName("div");
        //var divs = req.responseXML.documentElement.getElementsByTagName("div");
        var bci;
        var i;
        for (i=0; i<divs.length; i++ ) {
          if ( divs[i].id == "bodyContent" ) {
            bci = i;
            break;
          }
        }
        var imgs = divs[bci].getElementsByTagName("img");
        while (imgs.length>0)
        {
          addSmiley2(smileyList,imgs.item(0));
        }
      }
    };
    req.send(null);
  }

  smileyList.style.display = "none";
	
  return true;
}

function addSmiley2(parent, item)
{
  item.onclick = function() {
    insertTags('[[File:' + item.alt +  ']]','','');
    return false;
  };
  item.style.margin="4px";  
  item.style.cursor = "pointer";
  item.title = item.alt;
  parent.appendChild(item);
}

hookEvent("load", smileys2);
//-->