 // <nowiki>

 switch (wgUserLanguage){
   case 'de':
   case 'de-at':
   case 'de-ch':
   case 'de-formal':
 
   var configrevisionjumper = new Array('Änderungen seit meiner letzten Bearbeitung', 
                                        'Zum vorletzten Bearbeiter',
                                        'frühere Versionen',
                                        'spätere Versionen',
                                        'Version(en) zurück',
                                        'Version(en) vorwärts',
                                        'Jahr(e)',
                                        'Monat(e)',
                                        'Tag(e)',
                                        'Stunde(n)',
                                        'zurück',    // 10
                                        'vorwärts',
                                        'prompt Version(en)',
                                        'prompt um-Zeit',
                                        'prompt auf-Zeit',
                                        'erste Version',
                                        'letzte Version',
                                        'Um wie viele Versionen springen?',
                                        'Um welche Zeit soll gesprungen werden? [a = Jahr; m = Monat; d = Tag; h = Stunde; alles optional -> „1h“ allein springt somit um eine Stunde in die gewünschte Richtung]',
                                        'Auf welche Zeit soll gesprungen werden? [Syntax: Jahr-Monat-Tag Stunde:Minute; es geht auch nur Jahr-Monat-Tag -> 2007-12-31 springt also auf die Version, die um 00:00 Uhr an Silvester angezeigt wurde]'); // 19
   break;
 
   case 'pt':
   case 'pt-br':
 
   var configrevisionjumper = new Array('alterações desde a minha última edição',
                                        'penúltimo editor',
                                        'edições anteriores',
                                        'edições posteriores',
                                        'revisão(ões) anteriores',
                                        'revisão(ões) posteriores',
                                        'ano(s)',
                                        'mês(es)',
                                        'dia(s)',
                                        'hora(s)',
                                        'retroceder',    // 10
                                        'avançar',
                                        'solicitar revisão(ões)',
                                        'saltar no tempo',
                                        'saltar para o tempo',
                                        'primeira revisão',
                                        'revisão atual',
                                        'Quantas revisões devem ser puladas?',
                                        'Que período deve ser pulado? [a = ano; m = mês; d = dia; h = hora; todos os itens são opcionais -> „1h“ apenas causa um salto de uma hora na direção selecionada]',
                                        "Para que instante de tempo você quer saltar? [sintaxe: ano-mês-dia hora:minuto; ano-mês-dia também é possível -> então 2007-12-31 mostra a revisão que estava disponível na véspera de ano novo às 00:00h]"); // 19
   break;
 
   default:
 
   var configrevisionjumper = new Array('changes since my last edit',
                                        'next-to-last editor',
                                        'former revisions',
                                        'later revisions',
                                        'revision(s) backward',
                                        'revision(s) forward',
                                        'year(s)',
                                        'month(s)',
                                        'day(s)',
                                        'hour(s)',
                                        'backward',    // 10
                                        'forward',
                                        'prompt revision(s)',
                                        'skip over time',
                                        'skip to time',
                                        'first revision',
                                        'current revision',
                                        'How many revisions to be skipped?',
                                        'What period is to be skipped? [a = year; m = month; d = day; h = hour; all items optional -> „1h“ only causes a jump of 1 hour in the selected direction]',
                                        "What time is to be skipped to? [syntax: year-month-day hour:minute; year-month-day possible as well -> thus 2007-12-31 shows the revision that has been available on New Year's Eve at 00:00]"); // 19
 }

 // Version: 1.2.5

 if(!getoldid) var getoldid = false;
 if(!displayonview) var displayonview = false;
 if(!displayonhistory) var displayonhistory = false;
 if(!disabledisplayonpermalink) var disabledisplayonpermalink = false;
 if(!disabledisplayondiff) var disabledisplayondiff = false;
 if(!disablepenultimateeditor) var disablepenultimateeditor = false;
 if(!disablechangessincemylastedit) var disablechangessincemylastedit = false;
 if(!numberrevisionjumper) var numberrevisionjumper = new Array("10", "50", "150", "500");
 if(!timerevisionjumper) var timerevisionjumper = new Array("1h", "4h", "12h", "3d", "7d", "1m", "3m", "1a", "2a");
 var diffoptionnames = new Array();
 diffoptionnames[0] = new Array();
 diffoptionnames[1] = new Array();
 var numberrevisionjumperlength = numberrevisionjumper.length;
 var timerevisionjumperlength = timerevisionjumper.length;
 for(a=0;a<numberrevisionjumper.length;a++){
   diffoptionnames[0][a] = numberrevisionjumper[a];
 }
 for(b=0;b<timerevisionjumper.length;b++){
   diffoptionnames[1][b] = timerevisionjumper[b];
 }
 
 function newRequest() {
   try {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else {
        return new ActiveXObject("MSXML2.XMLHTTP");
      }
   } catch (e) {
      return false;
   }
 }

 // get URL parameters (used for page type variables)
 var UrlParameters = new Array ();
 readparams();
 
 function readparams() {
  var asReadInUrlParameters;
  var asReadInUrlParameter;
 
  // Get URL parameters
  asReadInUrlParameters = location.search.substring(1, location.search.length).split("&");
  for (i = 0; i < asReadInUrlParameters.length; i++) {
    asReadInUrlParameter = asReadInUrlParameters[i].split("=");
    UrlParameters[decodeURIComponent(asReadInUrlParameter[0])] = decodeURIComponent(asReadInUrlParameter[1]);
  }
 }
 
 function addrevisionjumper(){
 if (wgCanonicalNamespace != 'Special') {
  for(j=0;j<2;j++){
   var difflink = new Array();
   if(UrlParameters["diff"] && !disabledisplayondiff) {
    difflink[0] = document.getElementById('differences-prevlink');
    difflink[1] = document.getElementById('differences-nextlink');
    var leftuser = document.getElementById('mw-diff-otitle2');
    if (leftuser) { leftuser = leftuser.getElementsByTagName('a')[0].innerHTML; } else { leftuser = ''; }
    var rightuser = document.getElementById('mw-diff-ntitle2');
    if (rightuser) { rightuser = rightuser.getElementsByTagName('a')[0].innerHTML; } else { rightuser = ''; }
   } else if (wgAction == 'view' && displayonview && !UrlParameters["oldid"]) {
     var req10;
     if (req10 = newRequest()) {
       var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvlimit=1&rvprop=ids&rvdir=newer&rvstart=20000000000000';
       req10.open("GET", text, false);
       req10.send("");
       var firstrevision = req10.responseXML.getElementsByTagName("rev")[0].getAttribute('revid');
     }
     if(wgCurRevisionId!=firstrevision) difflink[0] = document.getElementById('firstHeading');
   } else if (wgAction == 'history' && displayonhistory) {
    var lasthistoryrevision = document.getElementById('pagehistory').getElementsByTagName('li');
    if(lasthistoryrevision.length>1) {
      difflink[0] = document.getElementById('jump-to-nav');
      lasthistoryrevisionid = lasthistoryrevision[0].getElementsByTagName('input')[0].getAttribute('value');
      if(lasthistoryrevisionid != wgCurRevisionId) difflink[1] = document.getElementById('movetodiff0');
    }
   } else if (UrlParameters["oldid"] && !UrlParameters["action"] && !disabledisplayonpermalink) {
    if(document.getElementById('mw-revision-nav').innerHTML.search(/href\=/)!=-1) difflink[0] = document.getElementById('jump-to-nav');
    if(UrlParameters["oldid"] != wgCurRevisionId) difflink[1] = document.getElementById('movetodiff0');
   }
   if(difflink[j]) {
    var newlink = document.createElement('select');
    newlink.onchange = j == 0 ? function(){movetodiff(0);} : function(){movetodiff(1)}; 
    newlink.setAttribute('id', 'movetodiff'+j);
    newlink.setAttribute('name', 'movetodiff'+j);
    difflink[j].parentNode.insertBefore( newlink, difflink[j].nextSibling );
    if(!disablechangessincemylastedit && !document.getElementById('changessincemylastedit')) {
           var req4;
           if (req4 = newRequest()) {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvprop=user|ids&rvlimit=500';
             req4.open("GET", text, false);
             req4.send("");
 
             var thisrevision = req4.responseXML.getElementsByTagName("rev");
             var thisrevisionlength = thisrevision.length;
             var l = 0;
             while(thisrevision[l]) {
               if(thisrevision[l].getAttribute('user')!=wgUserName && l<(thisrevisionlength-1)) { l++; } else { break; }
             }
             nextrevision = thisrevision[l].getAttribute('revid');
             var req8;
             if (req8 = newRequest()) {
               var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvlimit=1&rvprop=ids&rvdir=newer&rvstart=20000000000000';
               req8.open("GET", text, false);
               req8.send("");
               var firstrevision = req8.responseXML.getElementsByTagName("rev")[0].getAttribute('revid');
             }
             if(nextrevision!=wgCurRevisionId && nextrevision!=firstrevision) {
               var newrevisionlink = document.createElement('a');
               newrevisionlink.setAttribute('id', 'changessincemylastedit');
               newrevisionlink.setAttribute('href', wgServer+wgScript+'?title='+wgPageName+'&oldid='+nextrevision+'&diff=cur');
               if(j==0) var EditTextNode = document.createTextNode('← '+configrevisionjumper[0]);
               else if(j==1) var EditTextNode = document.createTextNode(configrevisionjumper[0]+' →');
               newrevisionlink.appendChild(EditTextNode);
               var newline = document.createElement('br');
               difflink[j].parentNode.insertBefore( newline, difflink[j].nextSibling );
               difflink[j].parentNode.insertBefore( newrevisionlink, difflink[j].nextSibling );
             }
           }
    }
    if(j==0 && (leftuser==rightuser) && !disablepenultimateeditor){
           var req19;
           if (req19 = newRequest()) {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvprop=user|ids&rvlimit=500';
             req19.open("GET", text, false);
             req19.send("");
 
             var thisrevision = req19.responseXML.getElementsByTagName("rev");
             var thisrevisionlength = thisrevision.length;
             if(!leftuser) var leftuser = thisrevision[0].getAttribute('user');
             var l = 0;
             while(thisrevision[l]) {
               if(thisrevision[l].getAttribute('user')==leftuser && l<(thisrevisionlength-1)) { l++; } else { break; }
             }
             nextrevision = thisrevision[l].getAttribute('revid');
             var req9;
             if (req9 = newRequest()) {
               var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvlimit=1&rvprop=ids&rvdir=newer&rvstart=20000000000000';
               req9.open("GET", text, false);
               req9.send("");
               var firstrevision = req9.responseXML.getElementsByTagName("rev")[0].getAttribute('revid');
             }
             var changessincemylasteditid = document.getElementById('changessincemylastedit');
             if(changessincemylasteditid) {
               changessincemylasteditid = changessincemylasteditid.getAttribute('href').match(/oldid\=(\d+)/);
               changessincemylasteditid = RegExp.$1;
             }
             if(nextrevision!=firstrevision && nextrevision!=changessincemylasteditid) {
               var newrevisionlink = document.createElement('a');
               newrevisionlink.setAttribute('href', wgServer+wgScript+'?title='+wgPageName+'&oldid='+nextrevision+'&diff=cur');
               var EditTextNode = document.createTextNode('← '+configrevisionjumper[1]);
               newrevisionlink.appendChild(EditTextNode);
               newrevisionlink.setAttribute('id', 'penultimateeditor');
               var newline = document.createElement('br');
               if(changessincemylasteditid) {
                 document.getElementById('changessincemylastedit').parentNode.insertBefore( newrevisionlink, document.getElementById('changessincemylastedit').nextSibling );
                 document.getElementById('changessincemylastedit').parentNode.insertBefore( newline, document.getElementById('changessincemylastedit').nextSibling );
               } else {
                 difflink[j].parentNode.insertBefore( newline, difflink[j].nextSibling );
                 difflink[j].parentNode.insertBefore( newrevisionlink, difflink[j].nextSibling );
               }
             }
           }
    }
    if (UrlParameters["diff"]) {
      var newline2 = document.createElement('br');
      difflink[j].parentNode.insertBefore( newline2, difflink[j].nextSibling );
    }
    var currentmovetodiffid = document.getElementById('movetodiff'+j);
    var newoption = document.createElement("option");
    currentmovetodiffid.appendChild(newoption);
    if(j==0) var newoptiontext = document.createTextNode(configrevisionjumper[2]);
    else if (j==1) var newoptiontext = document.createTextNode(configrevisionjumper[3]);
    currentmovetodiffid.getElementsByTagName("option")[0].appendChild(newoptiontext);
    for (var k=0; k<2; k++) {
      if(k==0) { var thisiteration = numberrevisionjumperlength+1; } else { var thisiteration = timerevisionjumperlength+1; }
      for(m=1;m<thisiteration;m++) {
        var newoption = document.createElement("option");
        if(k==0) {
          if(j==0) {
            var thisnewtextnode = diffoptionnames[k][m-1]+' '+configrevisionjumper[4];
          } else if (j==1) {
            var thisnewtextnode = diffoptionnames[k][m-1]+' '+configrevisionjumper[5];
          }
        } else if (k==1) {
          var regexprevision = diffoptionnames[k][m-1].match(/(\d+)(\D+)/);
          var regexpnumber = RegExp.$1;
          var regexptype = RegExp.$2;
          if(regexptype=='a') { var regexptypename = configrevisionjumper[6]; } else if(regexptype=='m') { var regexptypename = configrevisionjumper[7]; } else if(regexptype=='d') { var regexptypename = configrevisionjumper[8]; } else if(regexptype=='h') { var regexptypename = configrevisionjumper[9]; }
          if (j==0) {
            var thisnewtextnode = regexpnumber+' '+regexptypename+' '+configrevisionjumper[10];
          } else if (j==1) { 
            var thisnewtextnode = regexpnumber+' '+regexptypename+' '+configrevisionjumper[11];
          }
        }
        var newoptiontext = document.createTextNode(thisnewtextnode);
        currentmovetodiffid.appendChild(newoption);
        if(k==0) { currentmovetodiffid.getElementsByTagName("option")[m].appendChild(newoptiontext); } else if(k==1) { currentmovetodiffid.getElementsByTagName("option")[m+numberrevisionjumperlength].appendChild(newoptiontext); }
      }
    }
    var handt = numberrevisionjumperlength+timerevisionjumperlength;
    var newoption = document.createElement("option");
    var thisnewtextnode = configrevisionjumper[12];
    var newoptiontext = document.createTextNode(thisnewtextnode);
    currentmovetodiffid.appendChild(newoption);
    currentmovetodiffid.getElementsByTagName("option")[handt+1].appendChild(newoptiontext);
    var newoption = document.createElement("option");
    var thisnewtextnode = configrevisionjumper[13];
    var newoptiontext = document.createTextNode(thisnewtextnode);
    currentmovetodiffid.appendChild(newoption);
    currentmovetodiffid.getElementsByTagName("option")[handt+2].appendChild(newoptiontext);
    var newoption = document.createElement("option");
    var thisnewtextnode = configrevisionjumper[14];
    var newoptiontext = document.createTextNode(thisnewtextnode);
    currentmovetodiffid.appendChild(newoption);
    currentmovetodiffid.getElementsByTagName("option")[handt+3].appendChild(newoptiontext);
    if(j==0) { 
      var newoption = document.createElement("option");
      var thisnewtextnode = configrevisionjumper[15];
      var newoptiontext = document.createTextNode(thisnewtextnode);
      currentmovetodiffid.appendChild(newoption);
      currentmovetodiffid.getElementsByTagName("option")[handt+4].appendChild(newoptiontext);
    } else if (j==1) {
      var newoption = document.createElement("option");
      var thisnewtextnode = configrevisionjumper[16];
      var newoptiontext = document.createTextNode(thisnewtextnode);
      currentmovetodiffid.appendChild(newoption);
      currentmovetodiffid.getElementsByTagName("option")[handt+4].appendChild(newoptiontext);
    }
   }
  }
 }
 }
 if ( (UrlParameters["diff"] && !disabledisplayondiff) || (UrlParameters["oldid"] && !UrlParameters["action"] && !disabledisplayonpermalink) || (wgAction == 'view' && displayonview && !UrlParameters["oldid"]) || (wgAction == 'history' && displayonhistory) ) $(addrevisionjumper);
 
 function movetodiff(type){
   var handt = numberrevisionjumperlength+timerevisionjumperlength;
   for (i=0;i<(handt+4);i++) {
     if (document.getElementById('movetodiff'+type).options[i+1].selected == true) {
       if (i<numberrevisionjumperlength || i==handt) {
         if(UrlParameters["diff"]) {
           if(type==0) var currentid = document.getElementById('mw-diff-ntitle1');
           else if(type==1) var currentid = document.getElementById('mw-diff-otitle1');
           if(!currentid){ var currentid = document.getElementById('differences-nextlink'); } else { currentid = currentid.getElementsByTagName('a')[0]; }
           currentid = currentid.getAttribute('href').match(/oldid\=(\d+)/);
           currentid = RegExp.$1;
         } else if (wgAction == 'view' && !UrlParameters["oldid"]) {
           var currentid = wgCurRevisionId;
         } else if (wgAction == 'history') {
           var currentid = document.getElementById('pagehistory').getElementsByTagName('li')[0].getElementsByTagName('input')[0].getAttribute('value');
         } else {
           var currentid = UrlParameters["oldid"];
         }
         if (i<numberrevisionjumperlength) {
           var revisionlimit = numberrevisionjumper[i];
         } else {
           var revisionlimit = 'a';
           while(revisionlimit.search(/\D/)!=-1) {
             revisionlimit = prompt(configrevisionjumper[17],'50');
           }
           if (revisionlimit>499) revisionlimit = 499;
         }
         if(type==0) var direction = 'older';
         else if(type==1) var direction = 'newer';
         if(UrlParameters["diff"]) {
           if(type==0) var anothercurrentid = document.getElementById('differences-prevlink');
           else if(type==1) var anothercurrentid = document.getElementById('differences-nextlink');
           anothercurrentid = anothercurrentid.getAttribute('href').match(/oldid\=(\d+)/);
           anothercurrentid = RegExp.$1;
         }
         if (req = newRequest()) {
           if(UrlParameters["diff"]) {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvstartid='+anothercurrentid+'&rvlimit='+revisionlimit+'&rvprop=ids&rvdir='+direction;
           } else {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvstartid='+currentid+'&rvlimit='+(parseInt(revisionlimit)+1)+'&rvprop=ids&rvdir='+direction;
           }
           req.open("GET", text, false);
           req.send("");
           var firstrevision = req.responseXML.getElementsByTagName("rev");
           firstrevision = firstrevision[firstrevision.length-1].getAttribute('revid');
           if(getoldid && !UrlParameters["diff"]) {
             location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+firstrevision;
           } else {
             if(type==0) location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+currentid+'&oldid='+firstrevision;
             else if(type==1) location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+firstrevision+'&oldid='+currentid;
           }
         }
       } else if ((i>=numberrevisionjumperlength && i<=handt)|| i==(handt+1)) {
         if(UrlParameters["diff"]) {
           if(type==0) var currentid = document.getElementById('mw-diff-otitle1');
           else if(type==1) var currentid = document.getElementById('mw-diff-ntitle1');
           if(!currentid){ var currentid = document.getElementById('differences-nextlink'); } else { currentid = currentid.getElementsByTagName('a')[0]; }
           currentid = currentid.getAttribute('href').match(/oldid\=(\d+)/);
           currentid = RegExp.$1;
           if(type==0) var permanentid = document.getElementById('mw-diff-ntitle1');
           else if(type==1) var permanentid = document.getElementById('mw-diff-otitle1');
           if(!permanentid){ var permanentid = document.getElementById('differences-nextlink'); } else { permanentid = permanentid.getElementsByTagName('a')[0]; }
           permanentid = permanentid.getAttribute('href').match(/oldid\=(\d+)/);
           permanentid = RegExp.$1;
         } else if (wgAction == 'view' && !UrlParameters["oldid"]) {
           var currentid = wgCurRevisionId;
           var permanentid = currentid;
         } else if (wgAction == 'history') {
           var currentid = document.getElementById('pagehistory').getElementsByTagName('li')[0].getElementsByTagName('input')[0].getAttribute('value');
           var permanentid = currentid;
         } else {
           var currentid = UrlParameters["oldid"];
           var permanentid = currentid;
         }
         var req;
         if (req = newRequest()) {
           var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvlimit=1&rvstartid='+currentid+'&rvprop=timestamp&rvdir=older';
           req.open("GET", text, false);
           req.send("");
 
           var lasttimestamp = req.responseXML.getElementsByTagName("rev")[0].getAttribute('timestamp');
           var lastminute = lasttimestamp.match(/([^\-]*)\-([^\-]*)\-([^T]*)T([^\:]*)\:([^\:]*)\:([^Z]*)Z/);
           lastyear = RegExp.$1;
           lastmonth = RegExp.$2;
           lastday = RegExp.$3;
           lasthour = parseInt(RegExp.$4);
           if (lasthour < 10) { lasthour = "0" + lasthour.toString(); } else { lasthour = lasthour.toString() }
           lastminute = RegExp.$5;
           lastsecond = RegExp.$6;
           var lastdate = Date.parse(lastmonth + ' ' + lastday + ' ' + lastyear + ' ' + lasthour + ':' + lastminute + ':' + lastsecond);
           if(i>=numberrevisionjumperlength && i<=handt) {
             var regexprevision = timerevisionjumper[i-numberrevisionjumperlength].match(/(\d+)(\D+)/);
             var regexpnumber = RegExp.$1;
             var regexptype = RegExp.$2;
             if(regexptype=='a') { var yearmatched = true; } else { var yearmatched = false; }
             if(regexptype=='m') { var monthmatched = true; } else { var monthmatched = false; }
             if(regexptype=='d') { var daymatched = true; } else { var daymatched = false; }
             if(regexptype=='h') { var hourmatched = true; } else { var hourmatched = false; }

             if(type==0) {
               if(yearmatched) {
                 lastdate = lastdate-(parseInt(regexpnumber)*31557816000); 
               }
               if(monthmatched) {
                 lastdate = lastdate-(parseInt(regexpnumber)*(31557816000/12));
               }
               if(daymatched) {
                 lastdate = lastdate-(parseInt(regexpnumber)*86400000);
               }
               if(hourmatched) {
                 lastdate = lastdate-(parseInt(regexpnumber)*3600000);
               }
             } else if(type==1) {
               if(yearmatched) {
                 lastdate = lastdate+(parseInt(regexpnumber)*31557816000); 
               } else if(monthmatched) {
                 lastdate = lastdate+(parseInt(regexpnumber)*(31557816000/12));
               } else if(daymatched) {
                 lastdate = lastdate+(parseInt(regexpnumber)*86400000);
               } else if(hourmatched) {
                 lastdate = lastdate+(parseInt(regexpnumber)*3600000);
               }
             }
           } else if (i==(handt+1)) {
             var getjumptime = prompt(configrevisionjumper[18], '1a 12m 30d 24h');
             var newregularexp = /(\d*)(\D*)(\d*)?(\D*)?(\d*)?(\D*)?(\d*)?(\D*)?/;
             var regexprevision = newregularexp.exec(getjumptime);
             var yearmatched = false;
             var monthmatched = false;
             var daymatched = false;
             var hourmatched = false;
             for(d=1;d<regexprevision.length;d++){
              if(regexprevision[d]) {
               if(regexprevision[d].search(/a/)!=-1) { 
                 if(type==0) {
                   lastdate = lastdate-(parseInt(regexprevision[d-1])*31557816000);
                 } else if(type==1) {
                   lastdate = lastdate+(parseInt(regexprevision[d-1])*31557816000);
                 }
               }
               if(regexprevision[d].search(/m/)!=-1) {
                 if(type==0) {
                   lastdate = lastdate-(parseInt(regexprevision[d-1])*(31557816000/12));
                 } else if(type==1) {
                   lastdate = lastdate+(parseInt(regexprevision[d-1])*(31557816000/12));
                 }
               }
               if(regexprevision[d].search(/d/)!=-1) {
                 if(type==0) {
                   lastdate = lastdate-(parseInt(regexprevision[d-1])*86400000);
                 } else if(type==1) {
                   lastdate = lastdate+(parseInt(regexprevision[d-1])*86400000);
                 }
               }
               if(regexprevision[d].search(/h/)!=-1) {
                 if(type==0) {
                   lastdate = lastdate-(parseInt(regexprevision[d-1])*3600000);
                 } else if(type==1) {
                   lastdate = lastdate+(parseInt(regexprevision[d-1])*3600000);
                 }
               }
              } else {
                break;
              }
             }
           }
           var newdate = new Date();
           newdate.setTime(lastdate);
           var newyear = newdate.getFullYear().toString();
           var newmonth = newdate.getMonth()+1;
           if (newmonth < 10) { newmonth = "0" + newmonth; }
           var newday = newdate.getDate();
           if (newday < 10) { newday = "0" + newday; }
           var newhour = newdate.getHours();
           if (newhour < 10) { newhour = "0" + newhour; }
           var newminute = newdate.getMinutes();
           if (newminute < 10) { var newminute2 = "0" + newminute; } else { var newminute2 = newminute; }
           var newsecond = newdate.getSeconds();
           if (newsecond < 10) { newsecond = "0" + newsecond; }
           var newtime = newyear + newmonth + newday + newhour + newminute2 + newsecond;
           var req2;
           if (req2 = newRequest()) {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvprop=ids&rvlimit=1&rvdir=older&rvstart='+newtime;
             req2.open("GET", text, false);
             req2.send("");
 
             var lastrevision = req2.responseXML.getElementsByTagName("rev")[0];
             if(!lastrevision){
               var req3;
               if (req3 = newRequest()) {
                 var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvprop=ids&rvlimit=1&rvdir=newer&rvstart='+newtime;
                 req3.open("GET", text, false);
                 req3.send("");
 
                 var lastrevision = req3.responseXML.getElementsByTagName("rev")[0];
                 if(getoldid && !UrlParameters["diff"]) {
                   location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+lastrevision.getAttribute('revid');
                 } else {
                   location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+permanentid+'&oldid='+lastrevision.getAttribute('revid');
                 }
               }
             } else {
               if(getoldid && !UrlParameters["diff"]) {
                 location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+lastrevision.getAttribute('revid');
               } else {
                 var thisrevid = lastrevision.getAttribute('revid');
                 if(thisrevid == wgCurRevisionId) {
                   location.href=wgServer+wgScript+'?title='+wgPageName+'&diff=cur'+'&oldid='+permanentid;
                 } else {
                   if(type==0) location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+permanentid+'&oldid='+thisrevid;
                   else if(type==1) location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+thisrevid+'&oldid='+permanentid;
                 }
               }
             }
           }
         }
       } else if (i==(handt+2)) {
         if(UrlParameters["diff"]) {
           if(type==0) var permanentid = document.getElementById('mw-diff-ntitle1');
           else if (type==1) var permanentid = document.getElementById('mw-diff-otitle1');
           if(!permanentid){ var permanentid = document.getElementById('differences-nextlink'); } else { permanentid = permanentid.getElementsByTagName('a')[0]; }
           permanentid = permanentid.getAttribute('href').match(/oldid\=(\d+)/);
           permanentid = RegExp.$1;
         } else if (wgAction == 'view' && !UrlParameters["oldid"]) {
           var permanentid = wgCurRevisionId;
         } else if (wgAction == 'history') {
           var permanentid = document.getElementById('pagehistory').getElementsByTagName('li')[0].getElementsByTagName('input')[0].getAttribute('value');
         } else {
           var permanentid = UrlParameters["oldid"];
         }
         var actualdate = new Date();
         var actualyear = actualdate.getFullYear().toString();
         var actualmonth = actualdate.getMonth()+1;
         if (actualmonth < 10) { actualmonth = "0" + actualmonth; }
         var actualday = actualdate.getDate();
         if (actualday < 10) { actualday = "0" + actualday; }
         var lasttime = false;
         while(!lasttime){
           var getjumptime = prompt(configrevisionjumper[19], actualyear+'-'+actualmonth+'-'+actualday+' 00:00');
           var lasttime = getjumptime.match(/([^\-]*)\-([^\-]*)\-(\S*)\s?([^\:]*)?\:?([^\b]*)?/);
           lastyear = RegExp.$1;
           lastmonth = parseInt(RegExp.$2);
           lastday = parseInt(RegExp.$3);
           lasthour = RegExp.$4;
           lastminute = RegExp.$5;
         }
         if (lastmonth < 10) { lastmonth = "0" + lastmonth.toString(); } else { lastmonth = lastmonth.toString() }
         if (lastday < 10) { lastday = "0" + lastday.toString(); } else { lastday = lastday.toString() }
         if (lasthour) { lasthour = parseInt(lasthour); if (lasthour == 0) { var lasthour2 = "00"; } else if (lasthour < 10) { var lasthour2 = "0" + lasthour.toString(); } else { var lasthour2 = lasthour.toString() } }
         if (lastminute) { lastminute = parseInt(lastminute); if (lastminute == 0) { var lastminute2 = "00"; } else if (lastminute < 10) { var lastminute2 = "0" + lastminute.toString(); } else { var lastminute2 = lastminute.toString() } }
         if (lasthour2 && lastminute2) {
           var lastdate = Date.parse(lastmonth + ' ' + lastday + ' ' + lastyear + ' ' + lasthour2 + ':' + lastminute2 + ':00');
         } else {
           var lastdate = Date.parse(lastmonth + ' ' + lastday + ' ' + lastyear + ' 00:00:00');
         }
         lastdate = lastdate-3600000;
         var newdate = new Date();
         newdate.setTime(lastdate);
         var newyear = newdate.getFullYear().toString();
         var newmonth = newdate.getMonth()+1;
         if (newmonth < 10) { newmonth = "0" + newmonth; }
         var newday = newdate.getDate();
         if (newday < 10) { newday = "0" + newday; }
         var newhour = newdate.getHours();
         if (newhour < 10) { newhour = "0" + newhour; }
         var newminute = newdate.getMinutes();
         if (newminute < 10) { var newminute2 = "0" + newminute; } else { var newminute2 = newminute; }
         var newsecond = newdate.getSeconds();
         if (newsecond < 10) { newsecond = "0" + newsecond; }
         var newtime = newyear + newmonth + newday + newhour + newminute2 + newsecond;
         var req6;
         if (req6 = newRequest()) {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvprop=ids&rvlimit=1&rvdir=older&rvstart='+newtime;
             req6.open("GET", text, false);
             req6.send("");
 
             var lastrevision = req6.responseXML.getElementsByTagName("rev")[0];
             if(!lastrevision){
               var req7;
               if (req7 = newRequest()) {
                 var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvprop=ids&rvlimit=1&rvdir=newer&rvstart='+newtime;
                 req7.open("GET", text, false);
                 req7.send("");
 
                 var lastrevision = req7.responseXML.getElementsByTagName("rev")[0];
                 if(getoldid && !UrlParameters["diff"]) {
                   location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+lastrevision.getAttribute('revid');
                 } else {
                   location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+permanentid+'&oldid='+lastrevision.getAttribute('revid');
                 }
               }
             } else {
               if(getoldid && !UrlParameters["diff"]) {
                 location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+lastrevision.getAttribute('revid');
               } else {
                 var thisrevid = lastrevision.getAttribute('revid');
                 if(thisrevid == wgCurRevisionId) {
                   location.href=wgServer+wgScript+'?title='+wgPageName+'&diff=cur'+'&oldid='+permanentid;
                 } else {
                   if(type==0) location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+permanentid+'&oldid='+thisrevid;
                   else if(type==1) location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+thisrevid+'&oldid='+permanentid;
                 }
               }
             }
           }
       } else if (i==(handt+3)) {
         if(UrlParameters["diff"]) {
           if(type==0) var permanentid = document.getElementById('mw-diff-ntitle1');
           else if (type==1) var permanentid = document.getElementById('mw-diff-otitle1');
           if(!permanentid){ var permanentid = document.getElementById('differences-nextlink'); } else { permanentid = permanentid.getElementsByTagName('a')[0]; }
           permanentid = permanentid.getAttribute('href').match(/oldid\=(\d+)/);
           permanentid = RegExp.$1;
         } else if (wgAction == 'view' && !UrlParameters["oldid"]) {
           var permanentid = wgCurRevisionId;
         } else if (wgAction == 'history') {
           var permanentid = document.getElementById('pagehistory').getElementsByTagName('li')[0].getElementsByTagName('input')[0].getAttribute('value');
         } else {
           var permanentid = UrlParameters["oldid"];
         }
         if(type==0) {
           if (req = newRequest()) {
             var text = wgServer+wgScriptPath+'/api.php?format=xml&action=query&prop=revisions&titles='+wgPageName+'&rvlimit=1&rvprop=ids&rvdir=newer&rvstart=20000000000000';
             req.open("GET", text, false);
             req.send("");
             var firstrevision = req.responseXML.getElementsByTagName("rev")[0].getAttribute('revid');
             if(getoldid && !UrlParameters["diff"]) {
               location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+firstrevision;
             } else {
               location.href=wgServer+wgScript+'?title='+wgPageName+'&diff='+permanentid+'&oldid='+firstrevision;
             }
           }
         } else if (type==1) {
           if(getoldid && !UrlParameters["diff"]) {
             location.href=wgServer+wgScript+'?title='+wgPageName+'&oldid='+wgCurRevisionId;
           } else {
             location.href=wgServer+wgScript+'?title='+wgPageName+'&diff=cur&oldid='+permanentid;
           }
         }
       }
     }
   }
 }
 // </nowiki>