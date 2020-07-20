//<nowiki>
 
function AutoWIGO() {
  var pollname;
  var fulload = false;
  switch(wgPageName)
  {
  case "Resident_Evil_Wiki:What is going on?":
    pollname="world";
    break;    
  case "User:ForeBot/Scripts/AutoWIGO.js":
    pollname="test";
    fulload = true;
    break;
  case "Resident_Evil_Wiki:To_do_list/Suggestions":
    pollname="todo";
    fulload = true;
    break;
//insert additional polls here:
//  case "Page name (encoded form, wgPageName)":
//      pollname="the poll name used in the wigo tag";
////optional: load entire page separately, to make section editing work
////      fulload = true;
//      break;
  default:
    return;
  }
  if (fulload) {
    var req = sajax_init_object();
    if (!req) return null;
    req.open("GET", wgServer+wgScriptPath+"/index.php?title="+wgPageName+"&action=raw&ctype=text/javascript&ffcacheworkaround=" + Math.random(),false);
    req.send(null);
    if (req.status == 200) 
    {
      str = req.responseText;
    } else {
      return;
    }
  } else {
    if (document.forms['editform'] == null) return;
    var editarea = document.forms['editform'].elements['wpTextbox1'];
    var str = editarea.value;
  }
  var wigos = str.split(/<\/vote(cp|)>/);
  if (wigos.length == 0) return;
  var i;
  var numbers = [];
  var j = 0;
  for (i=0;i<wigos.length;++i)
  {
    var start = wigos[i].indexOf("<vote");
    wigos[i] = wigos[i].substring(start);
    var closetag = wigos[i].indexOf(">");
    var pollstart = wigos[i].indexOf("poll="+pollname);
    var tempi = parseInt(wigos[i].substring(pollstart+5+pollname.length,closetag),10);
    if (!isNaN(tempi) && (tempi != 0 || temp == "0"))
    {
      numbers[j] = tempi;
      ++j
    }
  }
  if (numbers.length > 0)
  {
    var nextnum = Math.max.apply(Math, numbers) + 1;
  } else {
    var nextnum = 1;
  }
  //add the button
  if (mwCustomEditButtons) {
    mwCustomEditButtons.push({
        "imageFile": "http://residentevil.com/wiki/images/3/3a/Button_WIGO.png",
        "speedTip": "WIGO",
        "tagOpen": "<vote poll=" + pollname + nextnum + ">",
        "tagClose": "</vote>",
        "sampleText": "LULZ"
    });
  }
  //modify the link in edittools
  if (etparent = document.getElementById('edittools_wigo')) {
    var anchors = etparent.getElementsByTagName("a");
    var i;
    for (i=0;i<anchors.length;++i)
    {
      if (anchors[i].innerHTML.indexOf("vote poll=wigo") != -1) {
        anchors[i].innerHTML = anchors[i].innerHTML.replace(/vote poll=wigo/,"vote poll=" + pollname + nextnum);
        attrib = anchors[i].getAttribute('onclick');
        attrib = attrib.replace(/vote poll=wigo','>/,"vote poll=" + pollname + nextnum + ">','");
        anchors[i].setAttribute('onclick',attrib);
      }
      if (anchors[i].innerHTML.indexOf("vote nextpoll=") != -1) {
        anchors[i].innerHTML = anchors[i].innerHTML.replace(/vote nextpoll=/,"vote nextpoll=" + pollname);
        attrib = anchors[i].getAttribute('onclick');
        attrib = attrib.replace(/vote nextpoll=','>/,"vote nextpoll=" + pollname + ">','");
        anchors[i].setAttribute('onclick',attrib);
      }
/*      if (anchors[i].innerHTML.indexOf("votecp nextpoll=") != -1) {
        anchors[i].innerHTML = anchors[i].innerHTML.replace(/votecp nextpoll=/,"votecp nextpoll=" + pollname);
        attrib = anchors[i].getAttribute('onclick');
        attrib = attrib.replace(/votecp nextpoll=/,"votecp nextpoll=" + pollname);
        anchors[i].setAttribute('onclick',attrib);
      }*/
    }
  }
}
 
addOnloadHook(AutoWIGO);
 
//</nowiki>