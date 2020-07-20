// script for [[:de:Wikipedia:Persönliche Bekanntschaften]] (2nd part)
// author: [[:de:Benutzer:Euku]]
// <nowiki>

// use global variables to avoid problems with ' and "
var pbRequest = {
  textToBeAdded: '',
  comment: ''
};
// localization
var msg = { };
var logVar = "";

if (wgUserLanguage == "de") {
   // Deutsch
   msg = {
     commentHint: 'Vermeide Details, die die Identität offenlegen könnten.',
     editCommentAddMe: 'füge mich selbst hinzu',
     errorMsgSaveParse: "Es ist ein Fehler aufgetreten! Möglicherweise bringt es etwas den Vorgang zu wiederholen. Ein Grund könnte ein Bearbeitungskonflikt sein.<br />Wenn du den Fehler berichten willst, gib bitte auch folgende Informationen an:<br /><pre>Browser: " + navigator.userAgent + "<br />Skript-Version: " + persBekannt.PBJSversion,
     errorMsgDefault: 'Ein Fehler ist aufgetreten. Benutzerliste konnte nicht geladen werden. Melde es bitte <a href="' + myArticlePath + '/Benutzer:Euku">Benutzer:Euku</a>!',
     errorNotAutoconfirmed: 'Du bist leider noch zu kurz dabei, um diese Seiten bearbeiten zu können. Du musst zur Benutzergruppe "autoconfirmed" gehören. Im Regelfall gehörst du automatisch <b>vier Tage</b> nach Anmeldung dazu und kannst diese und viele andere Seite bearbeiten.<br />Mehr Informationen: <a href="' + myArticlePath + 'Wikipedia:Benutzer#Angemeldeter_Benutzer">Hier</a> (bitte beachte, dass dort mit <i>bestätigter Benutzer</i> nicht das gleiche meint ist wie auf <a href="' + myArticlePath + 'Wikipedia:Persönliche_Bekanntschaften">Wikipedia:Persönliche Bekanntschaften</a>)<br />',
     gadgetOutdated: 'Das <a href="' + myArticlePath + 'Wikipedia:Gadgets">Gadget</a>, was du gerade benutzt, wurde vor kurzer Zeit <a href="' + myArticlePath + 'Wikipedia:Persönliche_Bekanntschaften/Versionslog">aktualisiert</a>. In deinem <a href="' + myArticlePath + 'Browsercache">Browsercache</a> befindet sich allerdings noch die ältere Version. Dies könnte zu Problemen führen. Es wird empfohlen, dass du jetzt die Seite neu lädst und deinen Browsercache umgehst:<br /> <b>Mozilla/Firefox/Safari:</b> Strg + Shift + R (Mactaste + R bei Macintosh) drücken; <b>Konqueror:</b> F5 drücken; <b>Opera:</b> Cache unter Extras ? Einstellungen leeren; <b>Internet Explorer:</b> Strg + F5',
     gadgetStopped: 'Das <a href="' + myArticlePath + 'Wikipedia:Gadgets">Gadget</a>, was du gerade benutzt, wurde temporär deaktiviert. Wahrscheinlich hat dies technische Ursachen. Du kannst dich über den Grund auf der <a href="' + myArticlePath + 'Wikipedia_Diskussion:Persönliche_Bekanntschaften">Diskussionsseite des Projekts</a> informieren. Versuche es einige Zeit später nochmal!',
     msgAlreadyIn: 'Du bist bereits in der Liste eingetragen.',
     msgNoBrackets: "Im Kommentar darf weder '{{' noch '}}' vorkommen.",
     msgPickSomeone: 'Du musst jemanden auswählen, den du bestätigen willst!',
     pleaseWait: 'bitte warten ... ',
     putCommentInHere: 'Hier auf Wunsch Kommentar eingeben',
     receivedVerifications: 'erhaltene Bestätigungen',
     retry: 'erneut versuchen',
     save: 'Speichern',
     selectAUserInDropdown: 'Bitte auswählen',
     showUserPage: 'Benutzerseite anzeigen',
     tabPurge: 'Servercache umgehen (purge)',
     tabPurgeHint: 'Seite neuladen und Servercache umgehen',
     tabUnwatchThis: 'diese Seite nicht beobachten',
     tabUnwatchThisHint: 'diese Seite nicht beobachten',
     tabWatchNewUsers: 'Liste mit neuen Teilnehmern beobachten',
     tabWatchNewUsersHint: 'Liste mit neuen Teilnehmern beobachten',
     tabWatchThis: 'diese Seite beobachten',
     tabWatchThisHint: 'diese Seite beobachten',
     userPage: 'Benutzerseite',
     verificationComment: 'Kommentar zur Bestätigung',
     waitForThreeVerifications: 'Du hast noch keine drei verschiedenen Bestätigungen erhalten und darfst somit noch nicht selber Bestätigungen vergeben. Warte bitte bis dich jemand bestätigt!',
     whoToVerify: 'Wen möchtest du bestätigen?',
     youAreNotInList: '<div align="center">Du bist <b>noch nicht</b> als Teilnehmer bei <i>WP:PB</i> eingetragen und damit nicht bestätigt. Damit darfst noch nicht selber bestätigen und kannst nicht bestätigt werden. Benutze den unteren Link, um dich einzutragen und warte bis du 3 Bestätigungen bekommst.<br><b><a href="javascript:AddMeToThisList();">ich möchte in die Liste der Teilnehmer aufgenommen werden</a>',
     yourReceivedVerifications: 'deine erhaltenen und vergebenen Bestätigungen',
     yourUsername: 'Dein Benutzername',
//   not necessary for German
     pageDescription: '',
     newRequestsHeadline: 'Anfragen',
     newRequestsDescription: '',
     wantsToTakePart: 'möchte in das System eingetragen werden.',
     Xverifies: 'bestätigt',
     YwasVerified: '[[:de:Wikipedia:Persönliche Bekanntschaften|gesehen]] zu haben.'
   };
} else if (wgUserLanguage == "cs" || wgUserLanguage == "sk") {
   // Tschechisch und Slowakisch
   msg = {
     commentHint: 'Vyvaruj se údajům, které by mohly prozradit tvou identitu.',
     editCommentAddMe: 'zanést do seznamu účastníků',
     errorMsgSaveParse: "Došlo k chybě! Pomoci by mohlo provést ještě jednou. Jednou příčinou by mohl být editační konflikt.<br />Pokud bys chtěl chybu ohlásit, uveď prosím i následující informaci:<br /><pre>Browser: " + navigator.userAgent + "<br />Skript-Version: " + persBekannt.PBJSversion,
     errorMsgDefault: 'Došlo k chybě. Seznam účastníků nemohl být otevřen. Oznam to uživteli <a href="' + myArticlePath + '/Benutzer:Euku">Benutzer:Euku</a>!',
     errorNotAutoconfirmed: 'Jsi teprve krátce zaregistrován a nemůžeš proto editovat tuto stránku. Předpokladem je, že patříš do skupiny automaticky schválených uživatelů ("autoconfirmed"). Tím se staneš <b>čtyři dny</b> po registraci nebo automatickém založení účtu.<br /><br />',
     gadgetOutdated: '<a href="' + myArticlePath + 'Wikipedia:Gadgets">Udělátko</a>, které užíváš, bylo před krátkou dobou <a href="' + myArticlePath + 'Wikipedia:Persönliche_Bekanntschaften/Versionslog">aktualizováno</a>. <a href="' + myArticlePath + 'Browsercache">Cache tvého prohlížeče</a> ale stále obsahuje starou verzi. To by mohlo způsobit problémy. Doporučujeme stránku znovu otevřít a vyprázdnit cache:<br /> <b>Mozilla/Firefox/Safari:</b> Strg + Shift + R (Mac + R u Macintoshe); <b>Konqueror:</b> F5; <b>Opera:</b> Cache je pod Extras ? vyprázdnit nastavení; <b>Internet Explorer:</b> Strg + F5',
     gadgetStopped: '<a href="' + myArticlePath + 'Wikipedia:Gadgets">Gadget</a>, které právě užíváš, bylo dočasně deaktivováno, což má pravděpodobně technické příčiny. Informovat se můžeš na diskusní stránce projektu <a href="' + myArticlePath + 'Wikipedia_Diskussion:Persönliche_Bekanntschaften"></a>. Nebo se pokus o štěstí trochu později!',
     msgAlreadyIn: 'Již se nacházíš v seznamu účastníků.',
     msgNoBrackets: "Komentář nesmí obsahovat ani '{{' ani '}}'.",
     msgPickSomeone: 'Musíš vybrat osobu, kterou chceš potvrdit!',
     pleaseWait: 'okamžik prosím ... ',
     putCommentInHere: 'Zde je možno udat komentář',
     receivedVerifications: 'obdržená potvrzení',
     retry: 'pokus se znovu',
     save: 'uložit',
     selectAUserInDropdown: 'prosím vyber wikipedistu',
     showUserPage: 'ukaž uživatelskou stránku',
     tabPurge: 'vyprázdni cache serveru (purge)',
     tabPurgeHint: 'otevři stranu ještě jednou a vyprázdni cache serveru',
     tabUnwatchThis: 'tuto stránku nesledovat',
     tabUnwatchThisHint: 'tuto stránku nesledovat',
     tabWatchNewUsers: 'sledovat seznam nových účastníků',
     tabWatchNewUsersHint: 'sledovat seznam nových účastníků',
     tabWatchThis: 'tuto stránku sledovat',
     tabWatchThisHint: 'tuto stránku sledovat',
     userPage: 'uživatelská stánka',
     verificationComment: 'komentář k potvrzení',
     waitForThreeVerifications: 'Stále jsi ještě nebyl potvrzen minimálně třemi účastníky a nemůžeš proto potvrzovat jiné. Musíš počkat až budeš třikrát potvrzen.',
     whoToVerify: 'Koho chceš potvrdit?',
     youAreNotInList: '<div align="center"><b>Nejsi ještě</b> zaznamenán jako účastník projektu <i>WP:PB</i>. Nemůžeš tedy zatím ani povrzovat jiné ani být jimi povrzen. Klikni na následující odkaz k registraci a čekej, až tě minimálně tři účastníci potvrdí.<br><b><a href="javascript:AddMeToThisList();">chci se registrovat jako účastník projektu</a>',
     yourReceivedVerifications: 'účastníci, které jsi potvrdil a potvrzení, která jsi obdržel',
     yourUsername: 'tvé uživatelské jméno',
     pageDescription: 'Tato stránka je uživatelským rozhraním projektu <a href="' + myArticlePath + 'Wikipedia:Persönliche_Bekanntschaften">Osobní známosti</a> a databáze, která je jeho součástí. Zde je možno se do projektu přihlásit a potvrzovat jiné účastníky. Níže uvedené žádosti jsou vyřizovány robotem několikrát za hodinu. K vyřízení jiných problému (smazání, přejmenování, chyby, technické problémy užívej diskusní stránku.',
     newRequestsHeadline: 'Žádosti',
     newRequestsDescription: 'Následující žádosti budou do databáze vloženy během několika minut',
     wantsToTakePart: 'chci se přihlásit do projektu.',
     Xverifies: 'potvrzuje',
     YwasVerified: 'že četl stránku [[:de:Wikipedia:Osobní známosti|Osobní známosti]].'
   };
} else {
   // use English for other people
   msg = {
     commentHint: 'Avoid private information.',
     editCommentAddMe: 'füge mich selbst hinzu (add me to [[WP:PB]])',
     errorMsgSaveParse: "An error occurred! Maybe the problem can be resolved by tring again. An edit conflict could be the reason for that.<br />If you want to report this, please add the following details:<br /><pre>Browser: " + navigator.userAgent + "<br />Skript-Version: " + persBekannt.PBJSversion,
     errorMsgDefault: 'An error occurred. The user list could not be loaded. Please report it to <a href="' + myArticlePath + 'Benutzer:Euku">User:Euku</a>!',
     errorNotAutoconfirmed: 'Unfortunately you created your account on this wiki less than 4 days ago. At first you must be "<a href="http://en.wikipedia.org/wiki/Wikipedia:Autoconfirmed">autoconfirmed</a>". Usually this happens <b>4 days</b> after your accoung creation automatically.',
     gadgetOutdated: 'An update is available for this <a href="/wiki/http://en.wikipedia.org/wiki/Wikipedia:Gadget">gadget</a>. But your <a href="http://en.wikipedia.org/wiki/Browser_cache">browser cache</a> stores an older version of this. Please reload this page to bypass your browser\'s cache to see the changes:<br /><b>Mozilla/Firefox/Safari:</b> press Ctrl + Shift + R (for Mac: Command Key + R); <b>Konqueror:</b> F5; <b>Opera:</b> Tools → Preferences; <b>Internet Explorer:</b> Ctrl + F5',
     gadgetStopped: 'This <a href="http://en.wikipedia.org/wiki/Wikipedia:Gadget">gadget</a> was stopped temporary. Probably there are tecnical reasons for this. You can read more information on the <a href="' + myArticlePath + 'Wikipedia_Diskussion:Persönliche_Bekanntschaften">project\'s talk page</a>. Try again later!',
     msgAlreadyIn: 'You are alredy in this list.',
     msgNoBrackets: "Your comment must not contain '{{' or '}}'.",
     msgPickSomeone: 'You must select someone you want to verify!',
     pleaseWait: 'please wait ... ',
     putCommentInHere: 'Add a comment here, when required.',
     receivedVerifications: 'received verifications',
     retry: 'retry',
     save: 'Save',
     selectAUserInDropdown: 'Please select',
     showUserPage: 'show user page',
     tabPurge: 'bypass server cache (purge)',
     tabPurgeHint: 'reload this page and bypass server cache',
     tabUnwatchThis: 'unwatch this page',
     tabUnwatchThisHint: 'unwatch this page',
     tabWatchNewUsers: 'watch new participants\' list',
     tabWatchNewUsersHint: 'watch new participants\' list',
     tabWatchThis: 'watch this page',
     tabWatchThisHint: 'watch this page',
     userPage: 'user page',
     verificationComment: 'Comment',
     waitForThreeVerifications: 'You are not verified by three people yet. Therefore you cannot verify others. Please wait until you until receive three verifications!',
     whoToVerify: 'Who do you want to verify?',
     youAreNotInList: '<div align="center">You are not participating in <i>WP:PB</i> <b>yet</b>. So you cannot verify someone else and cannot be verified. Use the link below, to participate and wait until you are verified by three people.<br><b><a href="javascript:AddMeToThisList();">I want to take part in this</a>',
     yourReceivedVerifications: 'your received verifications and verified users',
     yourUsername: 'Your user name',
     pageDescription: 'This page is the user interface for <a href="' + myArticlePath + 'Wikipedia:Persönliche_Bekanntschaften">Persönliche Bekanntschaften</a> and the database, that is part of the project. Here you can join this project and verify other wikipedians. The requests below will be executed by a bot several times per hour. For other requets (deletion, renaming, errors, technical problems) use the talk page.',
     newRequestsHeadline: 'Requests',
     newRequestsDescription: 'The following requests will be added to the database in a few minutes:',
     wantsToTakePart: 'wants to join the project WP:PB.',
     Xverifies: 'verifies to know',
     YwasVerified: '<a href="' + myArticlePath + 'Wikipedia:Persönliche_Bekanntschaften">personally</a>.'
   };
}

var bigUserList;

function loadFile(file) {
     xmlHttp = null;
     if (typeof XMLHttpRequest != 'undefined') { xmlHttp = new XMLHttpRequest(); }
     if (!xmlHttp) {
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch(e) { throw 'Could not create XMLHttpRequest. Stop now.'; }
        }
     }
     if (xmlHttp) {
        var now = new Date();
        xmlHttp.open('GET', wgServer + wgScript + '?title='+ file +'&action=raw&ctype=text/javascript&ts=' + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes(), false);
        xmlHttp.send(null);
        return (xmlHttp.responseText);
     }
     return false;
 }

// creates a new attribute
// e.g. newAttrib("href", "bla") returns
//     href="bla" as an attribute for the <a>-tag
function newAttrib(name, attrib) {
   var tmpAttrib = document.createAttribute(name);
   tmpAttrib.nodeValue = attrib;
   return tmpAttrib;
}

function showErrorMesage(htmlText) {
   var intro = '<div style="float:center; border: 1px solid black; padding: 8px; background-color:white;"><img height="17" width="20" longdesc="/wiki/Bild:Zeichen_101.svg" alt="Achtung" src="http://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Zeichen_101.svg/20px-Zeichen_101.svg.png"/>&nbsp;'
   var reload = ' <a href="javascript:startGUI()">' + msg.retry + '</a>';
   var log = "<br><b>;Einflüsse</b><br>wgServer: " + wgServer + ", wgUserName: " + wgUserName + ", wgUserLanguage: " + wgUserLanguage + ", Browser: " + navigator.userAgent + ", persBekannt.PBJSversion: " + persBekannt.PBJSversion + "<br><br><b>;Log</b><br>" + logVar;
   document.getElementById("no-gadget-active").innerHTML = intro + htmlText + log + reload + '</div>';
}

function AmIin() {
   // load user list
   var rawText = loadFile(persBekannt.userList);
   if (!rawText) {
   	showErrorMesage(msg.errorMsgDefault);
   	return;
   }
   // remove "<" and ">" to prevent hacks, split text in to array
   var userNameArray = rawText.replace(/(?:\<|\>)/g, "ERROR").split('\n');
   for (i in userNameArray)
       if (wgUserName == userNameArray[i])
           return true;
   return false;
}

function loadBigUserList() {
   var rawTextBig = loadFile(persBekannt.bigUserList);
   var searchRegEx = /\{\{\/DB\-Link\|([^\|]+)\|([^}]*)\}\}/g;
   var searchRes;
   var userListArray = new Array();
   var i = 0;
   while (searchRes = searchRegEx.exec(rawTextBig)) {
      userListArray[i] = [searchRes[1], searchRes[2]];
      i++;
   }
   return userListArray;
}

function AddMeToThisList() {
   if (AmIin()) {
       showErrorMesage(msg.msgAlreadyIn);
       return;
   }
   tellUserToWait();

   // concat the string to save
   pbRequest.textToBeAdded = "{{Wikipedia:Persönliche Bekanntschaften/neuer Benutzer|Name=" + wgUserName + "|Zeit=~~~~~}}";
   pbRequest.comment = msg.editCommentAddMe;
   addTextAndSavePage();
}

// add text to persBekannt.requestPage and save it
function addTextAndSavePage() {
     logging("Betrete function addTextAndSavePage()");
     var saveSucc = false;
     var trySaveCounter = 1;
     do {
        logging("Speicherversuch: " + trySaveCounter);
        // GET edit token
        xmlHttp = null; // this object is reused
        pbRequest.editToken = null;
        pbRequest.timestamp = null;
        if (typeof XMLHttpRequest != 'undefined') {
            xmlHttp = new XMLHttpRequest(); 
            logging("new XMLHttpRequest() ausgeführt");
        }
        if (!xmlHttp) {
            logging("xmlHttp: " + xmlHttp);
            try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); 
                  logging("xmlHttp2: " + xmlHttp);
            }
            catch(e) {
                 try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
                       logging("xmlHttp3: " + xmlHttp);
                 }
                 catch(e) { 
                    logging("Could not create XMLHttpRequest. Stopping now.");
                    throw 'Could not create XMLHttpRequest. Stopping now.';
                 }
            }
        }

        // this is only for avoiding the browser to use cache...
        var now = new Date();
        var tstamp = '0' + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
        // get meta data
        if (xmlHttp) {
           logging("hole: " + wgServer + wgScriptPath + "/api.php?action=query&prop=info|revisions&intoken=edit&format=xml&titles=" + persBekannt.requestPage + "&dummyvar=" + tstamp);
           xmlHttp.open('GET', wgServer + wgScriptPath + "/api.php?action=query&prop=info|revisions&intoken=edit&format=xml&titles=" + persBekannt.requestPage + "&dummyvar=" + tstamp, false);
           xmlHttp.send(null);
        } else {
       	   showErrorMesage(msg.errorMsgSaveParse);
           return;
        }

        // parse meta data
        logging("Antwort war (encodeURIComponent(xmlHttp.responseText)): " + encodeURIComponent(xmlHttp.responseText.replace(/edittoken=\".*?\+\\/i, 'edittoken="xxx"')));
        var xml = parseXML(xmlHttp.responseText);
        pbRequest.editToken = xml.getElementsByTagName("page")[0].getAttribute("edittoken");
        pbRequest.timestamp = xml.getElementsByTagName("rev")[0].getAttribute("timestamp");

        // POST to an URL
        var params = 
         "action=edit" +
         "&title=" + decodeURI(persBekannt.requestPage) +
         "&appendtext=" + encodeURIComponent("\n" + pbRequest.textToBeAdded) +
         "&summary=" + encodeURIComponent(pbRequest.comment) +
         "&token=" + encodeURIComponent(pbRequest.editToken) +
         "&basetimestamp="+ pbRequest.timestamp +
         "&minor=0";

        logging("hole: " + wgServer + wgScriptPath + "/api.php?format=xml");
        xmlHttp.open("POST", wgServer + wgScriptPath + "/api.php?format=xml", false);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.onreadystatechange = function() { if (xmlHttp.readyState !== 4) return;  }
        xmlHttp.send(params);

        logging("Antwort: (encodeURIComponent(xmlHttp.responseText))" + encodeURIComponent(xmlHttp.responseText));
        // parse response
        xml = parseXML(xmlHttp.responseText);

        if (xml.getElementsByTagName("edit").length != 0 && xml.getElementsByTagName("edit")[0].getAttribute("result") == "Success") {
            // reload current page
            saveSucc = true;
            window.location.href = wgServer + myArticlePath + persBekannt.workPage + '?action=purge';
        } else if (xml.getElementsByTagName("error").length != 0 && xml.getElementsByTagName("error")[0].getAttribute("code") == "editconflict") {
            // edit confict, try again
            logging("Bearbeitungskonflikt...");
            trySaveCounter++;
        } else {
            trySaveCounter++;
        }
    } while (!saveSucc && trySaveCounter <= 5)
    if (trySaveCounter > 5) {
       showErrorMesage("An unknown error occured, message was: " + xmlHttp.responseText);
    }
}

function parseXML(text) {
    var xml;
    if (window.ActiveXObject) {
       // for IE
       xml=new ActiveXObject("Microsoft.XMLDOM");
       xml.async="false";
       xml.loadXML(text);
    } else if (document.implementation && document.implementation.createDocument) {
       // every other browser on this planet
       xml = new DOMParser().parseFromString(text, "text/xml");
    }
    var doc = xml.documentElement;
    if (doc.tagName === "parserError") {
   	showErrorMesage("XML parser error: " + doc.textContent);
        return;
    }
    return xml;
}

function saveACKForm(eventP) {
     if ((eventP != null) && (eventP != "klick")) {
        var pressedKey = (eventP.keyCode ? eventP.keyCode : (eventP.which ? eventP.which : eventP.charCode));
        if (pressedKey != 13) // enter was pressed in input-field
           return;
     } else if (eventP != "klick") {
        return;
     }
     var confirmed = document.getElementById('confirmed').value;
     var comment = document.getElementById('comment').value;
     if (confirmed == "null") {
         showErrorMesage(msg.msgPickSomeone);
         return;
     }
     if (comment.indexOf("}}") > -1 || comment.indexOf("{{") > -1) {
         alert(msg.msgNoBrackets);
         return;
     }
     tellUserToWait();
     pbRequest.textToBeAdded = "{{Wikipedia:Persönliche Bekanntschaften/neue Bestätigung|Bestätiger=" + wgUserName + "|Bestätigter=" + confirmed + "|Kommentar=" + comment + "|Zeit=~~~~~}}";
     pbRequest.comment = "Bestätige [[User:" + confirmed + "|" + confirmed + "]]";
     addTextAndSavePage();
}

function tellUserToWait() {
   // tell the user to wait
   document.getElementById('no-gadget-active').innerHTML = msg.pleaseWait;
   var newElement = document.createElement("img");
       newElement.setAttributeNode(newAttrib("src", "http://upload.wikimedia.org/wikipedia/commons/4/42/Loading.gif"));
       newElement.setAttributeNode(newAttrib("width", 18));
       newElement.setAttributeNode(newAttrib("id", "busyImg"));
       newElement.setAttributeNode(newAttrib("height", 18));
   document.getElementById("no-gadget-active").appendChild(newElement);
}
// Updates the link to the userpage when 'onchage' is fired in the select-field
function updateUserLink() {
   var userToConfirm = document.getElementById("confirmed").value;
   var dbText = '<br />→ <small><a target="_blank" href="http://toolserver.org/~wppb/web/user/name=' + encodeURIComponent(userToConfirm) + '">' + msg.receivedVerifications + '</a></small>';

   if (document.getElementById("confirmed").value == "null")
      document.getElementById("userPageLink").innerHTML = "";
   else
      document.getElementById("userPageLink").innerHTML = '→ <small><a target="_blank" href="' + myArticlePath + 'Benutzer:' + encodeURIComponent(userToConfirm) + '">' + msg.userPage + '</a></small>' + dbText;
}

function showFormToACKsomeone() {
   // load big user list
   bigUserList = loadBigUserList();
   for (var i = 0; i < bigUserList.length; i++)
     if (wgUserName == bigUserList[i][0]) {
         if ("unbestätigt" == bigUserList[i][1]) {
       	   showErrorMesage(msg.waitForThreeVerifications);
           return;
         } else
           break;
     }

   // load user list
   var rawText = loadFile(persBekannt.userList);
   if (!rawText) {
   	showErrorMesage(msg.errorMsgDefault);
   	return;
   }

   var userNameArray = rawText.split('\n');
   var usersToConfirm = '<option value="null">' + msg.selectAUserInDropdown + '</option><optgroup label="0-9">';
   var currentLetter = "0-9";
   for (var i = 0; i < userNameArray.length; i++) {
        // avoid injection of code
        var tmpUser = userNameArray[i].replace("<", "").replace(">", "").replace('"', '&quot;');
        // new header?
        if ((currentLetter == "0-9") && (tmpUser.charAt(0) == "A")) {
            currentLetter = "A";
            usersToConfirm += '</optgroup><optgroup label="A">';
        }
        else if ((currentLetter != "0-9") && (tmpUser.charAt(0) > currentLetter)) {
            currentLetter = tmpUser.charAt(0);
            usersToConfirm += '</optgroup><optgroup label="' + currentLetter + '">';
        }
        if (tmpUser != wgUserName)
           usersToConfirm += '<option value="' + tmpUser + '" label="' + tmpUser + '">' + tmpUser + '</option>';
   }
   usersToConfirm += '</optgroup>';

   var formHTMLcode = '<table align="center" class="wikitable" id="ACKtable">'+
   '<tbody><tr><td style="padding: 0.5em 1ex;">' + msg.yourUsername + '</td><td id="myUserName" style="padding: 0.5em 1ex;">' + wgUserName+
   '<br />→ <small><a target="_blank" href="http://toolserver.org/~wppb/web/user/name=' + encodeURIComponent(wgUserName) + '">' + msg.yourReceivedVerifications + '</a></small>'+
   '</td></tr>'+
   '<tr><td style="padding: 0.5em 1ex;"><label for="confirmed">' + msg.whoToVerify + '</label></td><td style="padding: 0.5em 1ex;">'+
   '    <select id="confirmed" name="confirmed" onchange="javascript:updateUserLink();">' + msg.showUserPage + '</small>\"" style="width: 100%;">' + usersToConfirm +
   '    </select><br/><div id="userPageLink"></div>' +
   '</td></tr>'+
   '<tr><td style="padding: 0.5em 1ex;"><label for="comment">' + msg.verificationComment + '<br/><small>' + msg.commentHint + '</small></td><td style="padding: 0.5em 1ex;">'+
   '<input type="text" id="comment" title="' + msg.putCommentInHere + '" value="" maxlength="50" onkeypress="javascript:saveACKForm(event)" />'+
   '</td></tr>'+
   '<tr><td style="padding: 0.5em 1ex; text-align: right;" colspan="2"><b><a href="javascript:saveACKForm(\'klick\');">' + msg.save + '</a></b>'+
   '</tbody></table>';
   document.getElementById('no-gadget-active').innerHTML = formHTMLcode; // write form
   document.getElementById("confirmed").focus() // focus the select field
}

function startGUI() {
   // modify GUI
   tellUserToWait();
   try {
      document.getElementById('ca-edit').innerHTML = '<a title="' + msg.tabPurge + '" href="' + myArticlePath + persBekannt.workPage + '?action=purge"><span>' + msg.tabPurgeHint + '</span></a>';
   } catch(e) {}
   try {
      document.getElementById('ca-unwatch').innerHTML = '<a title="' + msg.tabUnwatchThis + '" href="' + myArticlePath + persBekannt.workPage + '?action=unwatch"><span>' + msg.tabUnwatchThisHint + '</span></a>';
   } catch(e) {}
   try {
      document.getElementById('ca-watch').innerHTML = '<a title="' + msg.tabWatchThis + '" href="' + myArticlePath + persBekannt.workPage + '?action=watch"><span>' + msg.tabWatchThisHint + '</span></a>';
   } catch(e) {}
   try {
      document.getElementById('ca-delete').innerHTML = '';
   } catch(e) {}
   try {
      document.getElementById('ca-move').innerHTML = '<a target="_blank" title="' + msg.tabWatchNewUsers + '" href="' + myArticlePath + persBekannt.newUserList + '?action=watch">' + msg.tabWatchNewUsers + '</a>';
   } catch(e) {}
   try {
      document.getElementById('ca-unprotect').innerHTML = '';
   } catch(e) {}
   try {
      if (wgUserLanguage != "de") { // replace the German texts
         document.getElementById('page-description').innerHTML = msg.pageDescription;
         document.getElementById('new-requests-headline').innerHTML = msg.newRequestsHeadline;
         document.getElementById('new-requests-description').innerHTML = msg.newRequestsDescription;
         el = document.getElementsByTagName('span');
         for(i = 0; i < el.length; i++) {
            att = el[i].getAttribute("name");
            if (att == null)
               att = el[i].getAttribute("id");
            if(att == 'wants-to-take-part') {
               el[i].innerHTML = msg.wantsToTakePart;
            }
            else if (att == 'Xverifies') {
               el[i].innerHTML = msg.Xverifies;
            }
            else if (att == 'YwasVerified') {
               el[i].innerHTML = msg.YwasVerified;
            }
         }
      }
   } catch(e) {}

   // check if user is autoconfirmed
   var AmIAutoconfirmed = false;
   for (var i in wgUserGroups) {
       if (wgUserGroups[i] == "autoconfirmed") {
           AmIAutoconfirmed = true;
           break;
       }
   }
   if (!AmIAutoconfirmed) {
       showErrorMesage(msg.errorNotAutoconfirmed);
       return;
   }
   // check if this is the latest version
   var currentVersion = loadFile(persBekannt.versionCheckPage);
   if (currentVersion == "stop") {
       showErrorMesage('<br /><br />' + msg.gadgetStopped);
       return;
   }
   if (currentVersion > persBekannt.PBJSversion) {
       showErrorMesage('<br /><br />' + msg.gadgetOutdated);
       return;
   }
   if (!AmIin()) {
      // replace the warning und remove the edit button
      document.getElementById('no-gadget-active').innerHTML = msg.youAreNotInList;
    } else {
      // we can go on
      showFormToACKsomeone();
    }
}

function logging(msg) {
    var now = new Date();
    logVar += "*<b>'''['''</b>" + now.getMonth() + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "<b>''']'''</b> " + msg + "<br>";
}
// </nowiki>