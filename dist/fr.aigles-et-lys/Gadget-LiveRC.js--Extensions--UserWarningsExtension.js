/* 
 --------------------------------------------------------------------------------------
 ---------LLLL---------III--------------------------RRRRRRRRRR--------CCCCC------------
 ---------LLLL---------III--------------------------RRRRRRRRRRRR----CCCCCCCCC----------
 ---------LLLL--------------------------------------RRR------RRR---CCC-----CCC---------
 ---------LLLL---------III--VV-----VV--EEEEEEEEE----RRR------RRR--CCC------------------
 ---------LLLL---------III---VV---VV---EEE----------RRRRRRRRRRR---CCC------------------
 ---------LLLL---------III---VV---VV---EEEEEE-------RRRRRRRRRR----CCC------------------
 ---------LLLL---------III----VV-VV----EEEEEE-------RRR-----RRR----CCC-----CCC---------
 ---------LLLLLLLLLLL--III----VVVVV----EEE----------RRR------RRR----CCCCCCCCC----------
 ---------LLLLLLLLLLL--III-----VVV-----EEEEEEEEE----RRR-------RRR-----CCCCC------------
 --------------------------------------------------------------------------------------
 
'''Extension de LiveRC'''
 
Permet de marquer les utilisateurs ayant reçu un avertissement sur leur page de discussion
 
* Licence : CC0
* Documentation :
* Auteur : [[Wikipedia:fr:User:Orlodrim]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF

if (typeof(lrcXUWMessages) == 'undefined') {
  lrcXUWMessages = [
    {tooltip: "Averti : spam", regex: "spammeur", image: "//upload.wikimedia.org/wikipedia/commons/9/92/LiveRC_Spam.png"},
    {tooltip: "Averti : test :)", regex: "test ?\\:\\)", image: "//upload.wikimedia.org/wikipedia/commons/3/3b/LiveRC_Test0.png"},
    {tooltip: "Averti : test 0", regex: "test ?0", image: "//upload.wikimedia.org/wikipedia/commons/3/3b/LiveRC_Test0.png"},
    {tooltip: "Averti : test 1", regex: "test ?1", image: "//upload.wikimedia.org/wikipedia/commons/5/5d/LiveRC_Test1.png"},
    {tooltip: "Averti : test 2", regex: "test ?2", image: "//upload.wikimedia.org/wikipedia/commons/7/78/LiveRC_Test2.png"},
    {tooltip: "Averti : test 3", regex: "test ?3", image: "//upload.wikimedia.org/wikipedia/commons/7/7b/LiveRC_Test3.png"},
    {tooltip: "Révoqué par Salebot", regex: "^bot \\: annonce de révocation", image: "//upload.wikimedia.org/wikipedia/commons/3/31/Salebot_small_icon.png"}
  ];
}

if (typeof(lrcXUWOptions) == 'undefined') {
  lrcXUWOptions =
    {lrcXUWColorNoTalk: "",
     lrcXUWColorRecentTalk: "",
     lrcXUWColorRecentWarning: "",
     lrcXUWDelay: 24};
  if (typeof(lrcXUWDelay) != 'undefined')               lrcXUWOptions.lrcXUWDelay = lrcXUWDelay / (3600 * 1000);
  if (typeof(lrcXUWColorNoTalk) != 'undefined')         lrcXUWOptions.lrcXUWColorNoTalk += lrcXUWColorNoTalk;
  if (typeof(lrcXUWColorRecentTalk) != 'undefined')     lrcXUWOptions.lrcXUWColorRecentTalk += lrcXUWColorRecentTalk;
  if (typeof(lrcXUWColorRecentWarning) != 'undefined')  lrcXUWOptions.lrcXUWColorRecentWarning += lrcXUWColorRecentWarning;
}


function lrcXUWTwoDigits(i) {
  return (i < 10 ? '0' : '') + i;
}

function lrcXUWGetWikiDate(localDate) {
  var d = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000);
  return '' + d.getFullYear() + lrcXUWTwoDigits(d.getMonth() + 1)
            + lrcXUWTwoDigits(d.getDate()) + lrcXUWTwoDigits(d.getHours())
            + lrcXUWTwoDigits(d.getMinutes()) + lrcXUWTwoDigits(d.getSeconds());
}

function lrcXUWGetUserLink(tr1) {
  var links = tr1.getElementsByTagName("td")[0].getElementsByTagName("a");
  for (var i = links.length - 1; i >= 0; i--) {
    if(links[i].className && links[i].className === "lrc_EditorLink") return links[i];
  }
}

function lrcXUWHook(Args) {
  var id = Args.id;
  var tr1 = document.getElementById(id);
  if (!tr1) return;
  var rc = Args.rc;
  var user = rc.user;
  var talkPage = wgFormattedNamespaces[3] + ':' + user;
  var yesterday = lrcXUWGetWikiDate(new Date(new Date() - lrcXUWOptions.lrcXUWDelay * 3600 * 1000));
  var requestTH = wgServer + wgScriptPath + '/api.php?format=xml'
          + '&action=query&prop=revisions&rvlimit=10&rvend=' + yesterday
          + '&rvprop=comment&titles=' + encodeURIComponent(talkPage);
  wpajax.http({url: requestTH, onSuccess: lrcXUWCallback,
              user: user, tr1id: id});
}

function lrcXUWCallback(xmlreq, data) {
  var tr1 = document.getElementById(data.tr1id);
  if (!tr1) return;
  var td2 = tr1.getElementsByTagName("td")[0];
  var lastLink = lrcXUWGetUserLink(tr1);

  var page = xmlreq.responseXML.getElementsByTagName('page')[0];
  if (!page.getAttribute('pageid')) {
    if (lrcXUWOptions.lrcXUWColorNoTalk) lastLink.style.color = lrcXUWOptions.lrcXUWColorNoTalk;
    return;
  }
  var revisions = xmlreq.responseXML.getElementsByTagName('revisions');
  if (revisions.length == 0) return;
  var lst = revisions[0].childNodes;
  var warning = -1;
  for (i = 0; i < lst.length && warning == -1; i++) {
    var comment = lst[i].getAttribute('comment');
    if (!comment) continue;
    for (var j = 0; j < lrcXUWMessages.length && warning == -1; j++) {
      if ((new RegExp(lrcXUWMessages[j].regex, 'i')).test(comment)) {
        warning = j;
      }
    }
  }
  if (warning >= 0) {
    var icon = document.createElement('img');
    icon.src = lrcXUWMessages[warning].image;
    icon.title = lrcXUWMessages[warning].tooltip;
    td2.insertBefore(icon, lastLink);
    if (lrcXUWOptions.lrcXUWColorRecentWarning) {
      lastLink.style.color = lrcXUWOptions.lrcXUWColorRecentWarning;
    }
  } else if (lst.length > 0 && lrcXUWOptions.lrcXUWColorRecentTalk) {
    lastLink.style.color = lrcXUWOptions.lrcXUWColorRecentTalk;
  }
}

LiveRC_AddHook("AfterRC", lrcXUWHook);

// Personnalisation auto

LiveRC_AddHook("AfterFillParamPanel", function(){
  LiveRC_ManageParams_Fill(lrcXUWMessages, "lrcXUWMessages", true);
  LiveRC_ManageParams_Fill(lrcXUWOptions, "lrcXUWOptions", false);
});

lrcManageParams_Desc['DesclrcXUWMessages'] = new Array('Paramètres de UserWarningsExtension (1 / 2)', 'UserWarningsExtension 1');
lrcManageParams_Desc['DesclrcXUWOptions'] = new Array('Paramètres de UserWarningsExtension (2 / 2)', 'UserWarningsExtension 2');
lrcManageParams_Desc['DesclrcXUWColorNoTalk'] = new Array('Couleur du nom des utilisateurs sans page de discussion (<a href="//fr.wikipedia.org/wiki/Couleurs_du_Web">code HTML</a> comme « #C0C0C0 » ou « blue »)');
lrcManageParams_Desc['DesclrcXUWColorRecentTalk'] = new Array('Couleur du nom des utilisateurs avec message récent mais pas d\'avertissement', 'Couleur du nom des utilisateurs avec message récent mais pas d\'avertissement');
lrcManageParams_Desc['DesclrcXUWColorRecentWarning'] = new Array('Couleur du nom des utilisateurs avertis', 'Couleur du nom des utilisateurs avertis');
lrcManageParams_Desc['DesclrcXUWDelay'] = new Array('Délai en heures avant que les avertissements ne soient caducs', 'Délai en heures avant que les avertissement soient caducs');

} // FIN IF

//</source>