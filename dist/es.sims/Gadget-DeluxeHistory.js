/**
 * Nom : DeluxeHistory
 * Auteur : Dake
 * Basé sur du code Ajax de GôTô
 * Dernière mise à jour : 11 mars 2008
 * Adaptación al español: Sanbec 03/12/2008
 */
var sysopsDeluxeHistory = null;
var botsDeluxeHistory = null;

function extractUsers(res) {
  pattern = /title\=\"Usuari[ao]:(.*?)\"/g,
  s = "";
  while((result = pattern.exec(res)) != null) {
    result = result[1].replace('&#039;', '\'');
    s += result  + "||";
  }
  return s;
}

function getBots() {
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  } catch (e) { /* mange l'exception */ }

  if (!cookies.get("botsDeluxeHistory")) {
    ajax.conn.onreadystatechange = function () {
    if (ajax.conn.readyState == 4) {
      botsDeluxeHistory = extractUsers(ajax.getResult())
      // conservé pour une semaine
      cookies.setWithDelay("botsDeluxeHistory", botsDeluxeHistory, 1000*3600*24*7)
      getSysops();
    }
  }
  ajax.sendRequest("//es.sims.wikia.com/index.php?title=Special:Listusers&group=bot&limit=500&action=raw", "GET", true)
  } else {
    botsDeluxeHistory = cookies.get("botsDeluxeHistory")
    getSysops();
  }
}
			
function getSysops() {
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  } catch (e) { /* mange l'exception */ }

  if (!cookies.get("sysopsDeluxeHistory")) {
    ajax.conn.onreadystatechange = function () {
    if (ajax.conn.readyState == 4) {
      sysopsDeluxeHistory = extractUsers(ajax.getResult())
      // conservé pour une semaine
      cookies.setWithDelay("sysopsDeluxeHistory", sysopsDeluxeHistory, 1000*3600*24*7)
      deluxeHistoryProcess();
    }
  }
  ajax.sendRequest("//es.sims.wikia.com/index.php?title=Special:Listusers&group=sysop&limit=500&action=raw", "GET", true)
  } else {
    sysopsDeluxeHistory = cookies.get("sysopsDeluxeHistory")
    deluxeHistoryProcess();
  }
}
				
// code by Martin Honnen
function getOuterHTML (node) {
  if (node.nodeType == 3) {
    return node.nodeValue;
  } else if (node.nodeType == 1) {
    var html = '';
    html += '<' + node.nodeName;
    for (var a = 0; a < node.attributes.length; a++) html += ' ' + node.attributes[a].nodeName + '="' + node.attributes[a].nodeValue + '"';
    if (node.childNodes.length == 0) {
      html += ' \/>';
    } else {
      html += '>';
    }
    for (var c = 0; c < node.childNodes.length; c++) html += getOuterHTML(node.childNodes[c]);
    html += '<\/' + node.nodeName + '>';
  }
  return html;
}
		
function deluxeHistoryProcess() {					
    var sysopsList = sysopsDeluxeHistory.split("||")
    var botsList = botsDeluxeHistory.split("||")		
	
    var lis = document.getElementById("pagehistory").getElementsByTagName("li");

    for (var i=0; i<lis.length; i++) {

    var spanNode = lis[i].getElementsByTagName("a");
    if(spanNode[2].href.match("/index\.php") ) {
        if (typeof (spanNode[3]) == "undefined") {
            continue; // Ne corrige pas vraiment le problème des révisions masquées, mais évite au moins de casser tout le JavaScript sur la page
        }
        var username = spanNode[3].childNodes[0].nodeValue;
    } else {
        var username = spanNode[2].childNodes[0].nodeValue;
    }


		
    // check le statut du contributeur
    var className = "history-user-normal";
		
    // bot ? 
    for (var j=0;j<botsList.length;j++) {
      if (botsList[j] == username) {
        className = "history-user-bot";
        break;
      }
    }  
		
    // sysop ? 
    for (var j=0;j<sysopsList.length;j++) {
      if (sysopsList[j] == username) {
        className = "history-user-sysop";
        break;
      }
    }

    // ip ? 
    var ip = /(\d{1,3}\.){3}\d{1,3}|([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}/;
		
    if (ip.exec(username)) {
      className = "history-user-ip"
    }

    // ajout des icônes
    var specialOp = "";
    var comment = "";
					
    for (var h=0;h<spanNode.length;h++) {
      if (spanNode[h].getAttribute("class") == "comment") { 
        var comment = getOuterHTML(spanNode[h])
        break;
      }
    }
				
    var regexExpEvents = new Array();
    regexExpEvents[0] = /((r|R)(é|e)vocation|(r|R)v |(R|r)evert|(v|V)andal(isme|e))/;
    regexExpEvents[1] = /(a restauré|a (e|é)ffacé|(s|S)uppression)/;	
    regexExpEvents[2] = /((R|r)enommage|a déplacé|a renommé)/;
    regexExpEvents[3] = /((semi|Semi)-(p|P)rotection|(P|p)rotection|(A|a) protégé)/;
		
    var iconsEvents = new Array();
    iconsEvents[0] = "//upload.wikimedia.org/wikipedia/commons/thumb/7/77/Crystal_Clear_action_reload.png/20px-Crystal_Clear_action_reload.png"
    iconsEvents[1] = "//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Crystal_Clear_action_exit.png/20px-Crystal_Clear_action_exit.png"
    iconsEvents[2] = "//upload.wikimedia.org/wikipedia/commons/thumb/4/45/Crystal_Clear_action_2rightarrow.png/20px-Crystal_Clear_action_2rightarrow.png"
    iconsEvents[3] = "//upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Crystal_Clear_action_lock.png/20px-Crystal_Clear_action_lock.png"

    if (comment) {
      for (var k=0;k<regexExpEvents.length;k++) {
        if (regexExpEvents[k].test(comment)) {
          var imgTag = "<img src=\"" + iconsEvents[k] + "\" />" 
          specialOp = "<div class=\"" + className + "\" style=\"float: right; vertical-align:top;\">" + 
          imgTag + "</div>"
        }
      }	
    }
		
    lis[i].innerHTML = "<div class=\"" + className + "\">" + specialOp  + lis[i].innerHTML + "</div>"

    inputNodes = lis[i].getElementsByTagName("input");
    for (var j=0;j<inputNodes.length;j++) {
      inputNodes[j].style.visibility='visible';
    }

    for (var j=0;j<spanNode.length;j++) {
      if(spanNode[j].getAttribute("class")=="history-user") {
        spanNode[j].setAttribute("class", className);
      }
    }
  }
}

if (wgAction == "history") addOnloadHook(getBots);