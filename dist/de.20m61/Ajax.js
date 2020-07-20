var OnlineUser = [];
var AjaxOnlineUser = "";

function apiReq(q, fn) {
 q.format = 'json';
 return $.ajax({
  async: false, type: 'POST', url: ''+wgScriptPath + '/api.php', data: q, success: fn, dataType: 'json',
 });
}

function getToken(page, fn) {
 apiReq({
  action: 'query',query: 'prop',prop: 'info',titles: page,intoken: 'edit'
 },function(q){
  for( var k in q.query.pages )return fn(q.query.pages[k]);
 });
}

function GetOnlineUser() {
  // erzeugt alle UserObjekte mit den jeweiligen Eigenschaften
  OnlineUser.splice(0, OnlineUser.length); // altes Array löschen, falls User gegangen sind.
  OnlineString = AjaxOnlineUser.split('<div class="OnlineUser" ');
  var m=0;
  for (var i=0; i < OnlineString.length-1; i++){
    var OString = OnlineString[i+1].substr(0,OnlineString[i+1].search('>'));     // Substring: "></div>\n"
    if (OString.search('data-name="'+wgUserName+'"') >=0) continue;        // den eigenen Username überspringen
    var timestring = OString.slice(OString.search('data-timestamp="')+16);
    timestring = timestring.slice(0, timestring.search('"'));
    if (timestring*1 < new Date().getTime()) continue;
    var OStringObj = OString.split('" ');

    OnlineUser[m] = new Object();
    for (var j = 0; j < OStringObj.length; j ++) {
      OnlineUser[m][OStringObj[j].split('=')[0]] = OStringObj[j].split('=')[1].replace(/"/g,'');
    }
    m ++;
  }
}

function SetOnlineUser() {
  var OnlineStringVorlage = '';
  var OnlineStringBox = '';
  var AnzahlOnlineUser = 0;
  for(var i = 0; i < OnlineUser.length; i++){
    OnlineStringVorlage += '<div class="OnlineUser" ';
    OnlineStringBox += '<div class="OnlineUser" ';
    for(var dataObjekt in OnlineUser[i]) {
        OnlineStringVorlage += dataObjekt + '="'+ OnlineUser[i][dataObjekt] + '" ';
        OnlineStringBox += dataObjekt + '="'+ OnlineUser[i][dataObjekt] + '" ';
    }
    OnlineStringVorlage += '>'+OnlineUser[i]['data-imgall']+'</div>\n';
    OnlineStringBox += '><img src="'+OnlineUser[i]['data-imgall']+'" alt="'+OnlineUser[i]['data-name']+'" title="'+OnlineUser[i]['data-name']+'"></div>\n';
    AnzahlOnlineUser ++;
    if (! (AnzahlOnlineUser % 6)) {
      OnlineStringVorlage += '<br style="clear:both;" />';
      OnlineStringBox += '<br style="clear:both;" />';
    }
  }

  var AllIMG = document.getElementsByTagName('img');
  var wgUserAvatar = 'https://images.wikia.nocookie.net/__cb0/messaging/images/thumb/1/19/Avatar.jpg/150px-Avatar.jpg';
  for (i = 0; i < AllIMG.length; i++) {
    if (AllIMG[i].alt == wgUserName) {
      wgUserAvatar = AllIMG[i].src;
      break;
    }
  }
  var Tmp = wgUserAvatar.split('/');
  wgUserAvatar ='';
  for (i=0; i<Tmp.length-1; i++)
    wgUserAvatar += Tmp[i]+'/';
  wgUserAvatar += '150px'+Tmp[Tmp.length-1].slice(Tmp[Tmp.length-1].search('-'));

  var myUserTime = new Date().getTime()
  myUserTime = myUserTime*1 +1000*60*5;  // 1.000ms * 60sec * 5min = 5 Minuten, bis die Person abgemeldet wird.
  var OnlineString = '';
  OnlineString += '<div class="OnlineUser" ';
  OnlineString += 'data-name="'        + wgUserName + '" ';
  OnlineString += 'data-timestamp="'   + myUserTime + '" '; 
  OnlineString += 'data-ImgAll="'      + wgUserAvatar + '" ';
  OnlineString += 'data-ImgFriend="'   + 1 + '" ';
  OnlineString += 'data-ImgCoworker="' + 2 + '" ';
  OnlineString += 'data-UserGroup="';
                   for (var n=0; n < wgUserGroups.length; n++) {
                     OnlineString += wgUserGroups[n];
                     if (n+1 < wgUserGroups.length) OnlineString += ",";
                   }
                   OnlineString += '" ';
  OnlineStringVorlage += OnlineString + '>'+wgUserAvatar+'</div>\n';
  OnlineStringBox += OnlineString + '><img src="'+wgUserAvatar+'" alt="'+wgUserName+'" title="'+wgUserName+'"></div>\n';
  AnzahlOnlineUser ++;

  var p;
  getToken('Vorlage:OnlineUser',function(x){
    p = x;
  });

  apiReq({
    action: 'edit',
    title: 'Vorlage:OnlineUser',
    text: OnlineStringVorlage,
    token: p.edittoken,
    summary: wgUserName + " ist online.",
    minor: true,
  });

  // Darstellen der OnlineUser
  $("#OnlineUserModul").remove();
  OnlineString = '<section id="OnlineUserModul" class="OnlineUserModul module"><h1 style="margin-bottom:0">Benutzer im Wikia</h1><p>Zurzeit online: '+AnzahlOnlineUser+' Benutzer</p><br style="clear:both;" />' + OnlineStringBox + '</section>';
  $("#WikiaRail").append(OnlineString);

}

function AjaxReady(Seitenname){
  if(Seitenname == "Vorlage:OnlineUser")
    { GetOnlineUser(); SetOnlineUser(); return true; }
}

function ajax_LoadPage(Seitenname){
  var xmlhttp;
  // Codeweiche IE6/7 zu den restlichen Browsern
  if (window.XMLHttpRequest){ xmlhttp=new XMLHttpRequest(); }
                       else { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }
  xmlhttp.onreadystatechange=function()  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var Ajax = xmlhttp.responseText;
      Ajax = Ajax.slice(Ajax.search('<div id="mw-content-text"'), Ajax.length); // Alles vor Start entfernen
      Ajax = Ajax.slice(Ajax.search('>')*1+1, Ajax.length);                     // 1.Tag (Suchtag) entfernen - gehört Body
      Ajax = Ajax.slice(0, Ajax.search('<div class="printfooter">'));           // Ende entfernen - gehört Body    
      if (Ajax.search('<!--') >=0) Ajax = Ajax.slice(0, Ajax.search('<!--')*1); // Wikia-Kommentar entfernen
      AjaxOnlineUser = Ajax;
      AjaxReady(Seitenname);
      setTimeout('ajax_LoadPage("Vorlage:OnlineUser");',1000*60);               // Minütlich soll man sich selbst und die Liste aktualisieren.
    }
  }
  var wiki_url = location.href;
      wiki_url = wiki_url.slice(0, (wiki_url.search(".wikia.com/wiki/")*1+16));
      wiki_url += Seitenname.replace(' ', '_');
  xmlhttp.open("POST", wiki_url, true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("");
}

ajax_LoadPage("Vorlage:OnlineUser");