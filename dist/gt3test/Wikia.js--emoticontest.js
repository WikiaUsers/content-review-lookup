}
var GMSU_meta_48536 = usodata_58536.toString();
GMSU.init(48536);

window.addEventListener("load", function(e) {

tagtype = 'html'; // default; alternative: 'bbcode'

// Emoticon definitions
function setemoticons(domname) {
  if ( typeof(domname)=='string' ) {
    var editbar = document.getElementById(domname);
  } else {
    var editbar = domname;
  }
  if (editbar) {
    var bdiv = document.createElement('div');
    bdiv.setAttribute('align','center');
    bdiv.setAttribute('id','IzEmoticons');
    var buttons = "<div style='background-color:#ffffff;border:1px solid grey;width:95%;'>";
    // -=[ Schilder ]=-
	buttons += emoticonButton("Huh?", "http://www.mysmiley.net/imgs/smile/sign/sign0035.gif");
	buttons += emoticonButton("Oops!", "http://www.mysmiley.net/imgs/smile/sign/sign0040.gif");
	buttons += emoticonButton("WOW!", "http://www.mysmiley.net/imgs/smile/sign/sign0046.gif");
	buttons += emoticonButton("Cool", "http://www.mysmiley.net/imgs/smile/sign/sign0028.gif");
	buttons += emoticonButton("Thankyou!", "http://www.freesmileys.org/smileys/smiley-signs153.gif");
	buttons += emoticonButton("Herz","http://www.smiley-paradies.de/smileys/liebe/liebe_0185.gif");
	buttons += emoticonButton("Thank you!", "http://www.smileyvault.com/albums/basic/smileyvault-flowers.gif");
	buttons += emoticonButton("Willkommen!","http://www.greensmilies.com/smile/smiley_emoticons_charly_willkommen.gif");
	buttons += emoticonButton("ThreadNice","http://www.smileyvault.com/albums/forum/smileyvault-nicethread.gif");
	buttons += emoticonButton("ThreadHijacked","http://www.smileyvault.com/albums/forum/smileyvault-hijacked.gif");
	buttons += emoticonButton("Bahnhof","http://www.gesundehunde.com/forum/images/smilies/bahnhof1.gif");
	buttons += emoticonButton("GoodNight","http://www.freesmileys.org/smileys/smiley-forum/goodnight.gif");
	buttons += emoticonButton("Geistlos","http://www.smilies.4-user.de/include/Schilder/geist.gif");
	buttons += emoticonButton("GoogleFriend","http://www.smilies.4-user.de/include/Schilder/google.gif");
//
	buttons += emoticonButton("Smile", "http://www.freesmileys.org/smileys/smiley-basic/smile.gif");
	buttons += emoticonButton("Sad", "http://www.freesmileys.org/smileys/smiley-basic/sad.gif");
	buttons += emoticonButton("Huh", "http://www.freesmileys.org/smileys/smiley-basic/huh.gif");
	buttons += emoticonButton("Dry", "http://www.freesmileys.org/smileys/smiley-basic/dry.gif");
	buttons += emoticonButton("Mellow", "http://www.freesmileys.org/smileys/smiley-basic/mellow.gif");
	buttons += emoticonButton("Died", "http://www.freesmileys.org/smileys/smiley-violent004.gif");
	buttons += emoticonButton("Hush", "http://www.freesmileys.org/smileys/smiley-shocked002.gif");
	buttons += emoticonButton("Cool", "http://www.freesmileys.org/smileys/smiley-basic/cool.gif");
	buttons += emoticonButton("Peace", "http://www.freesmileys.org/smileys/smiley-char038.gif");
	buttons += emoticonButton("Whistle", "http://www.freesmileys.org/smileys/smiley-green/greensmilies-029.gif");
	buttons += emoticonButton("Huh?", "http://smileyjungle.com/smilies/doh28.gif");
	buttons += emoticonButton("Confused", "http://www.smileyvault.com/albums/basic/smileyvault-chin.gif");
	buttons += emoticonButton("What", "http://www.freesmileys.org/smileys/smiley-basic/what.gif");
	buttons += emoticonButton("Doh", "http://smileyjungle.com/smilies/doh13.gif");
	buttons += emoticonButton("whao?", "http://www.freesmileys.org/smileys/smiley-basic/spock.gif");
	buttons += emoticonButton("Wink", "http://www.freesmileys.org/smileys/smiley-basic/wink.gif");
	buttons += emoticonButton("OhMy", "http://www.freesmileys.org/smileys/smiley-basic/ohmy.gif");
	buttons += emoticonButton("Laugh", "http://www.freesmileys.org/smileys/smiley-basic/laugh.gif");
	buttons += emoticonButton("Tongue", "http://www.freesmileys.org/smileys/smiley-basic/tongue.gif");
	buttons += emoticonButton("Bleh", "http://www.freesmileys.org/smileys/smiley-fc/bleh.gif");
	buttons += emoticonButton("Tongue", "http://smileys.on-my-web.com/repository/Tongue/mockery-035.gif");
	buttons += emoticonButton("...", "http://smileyjungle.com/smilies/disdain21.gif");
	buttons += emoticonButton("Angel", "http://www.freesmileys.org/smileys/smiley-basic/angel.gif");
	buttons += emoticonButton("Nono", "http://smileyjungle.com/smilies/disdain25.gif");
	buttons += emoticonButton("OhYes!", "http://www.freesmileys.org/smileys/smiley-basic/lol.gif");
	buttons += emoticonButton("ROFL", "http://www.freesmileys.org/smileys/smiley-basic/rofl.gif");
	buttons += emoticonButton("LOL", "http://www.freesmileys.org/smileys/smiley-laughing001.gif");
	buttons += emoticonButton("Hehaha!", "http://www.freesmileys.org/smileys/smiley-laughing021.gif");
	buttons += emoticonButton("Happyspin", "http://www.mysmiley.net/imgs/smile/happy/happy0088.gif");
	buttons += emoticonButton("Yeap!", "http://www.freesmileys.org/smileys/smiley-happy120.gif");
	buttons += emoticonButton("Guru", "http://www.freesmileys.org/smileys/smiley-green/greensmilies-028.gif");
	buttons += emoticonButton("Bow","http://www.theabeforum.com/images/emoticons/New/bow.gif");
	buttons += emoticonButton("RollEyes", "http://www.freesmileys.org/smileys/smiley-basic/rolleyes.gif");
	buttons += emoticonButton("Unsure", "http://www.freesmileys.org/smileys/smiley-basic/unsure.gif");
	buttons += emoticonButton("Excited", "http://www.freesmileys.org/smileys/smiley-basic/excited.gif");
	buttons += emoticonButton("Tears", "http://www.freesmileys.org/smileys/smiley-basic/tears.gif");
	buttons += emoticonButton("Sick", "http://www.freesmileys.org/smileys/smiley-basic/sick.gif");
	buttons += emoticonButton("Sleep", "http://www.freesmileys.org/smileys/smiley-basic/sleep.gif");
	buttons += emoticonButton("Shy", "http://www.freesmileys.org/smileys/smiley-basic/shy.gif");
	buttons += emoticonButton("Cash", "http://www.freesmileys.org/smileys/smiley-forum/2c.gif");
	buttons += emoticonButton("Censored", "http://www.freesmileys.org/smileys/smiley-forum/censored.gif");
	buttons += emoticonButton("Stop", "http://www.freesmileys.org/smileys/smiley-forum/stop.gif");
	buttons += emoticonButton("Ashamed", "http://www.freesmileys.org/smileys/smiley-ashamed005.gif");
	buttons += emoticonButton("Captain", "http://www.freesmileys.org/smileys/smiley-char027.gif");
	buttons += emoticonButton("NoIdea", "http://www.freesmileys.org/smileys/smiley-confused005.gif");
	buttons += emoticonButton("Beer", "http://www.freesmileys.org/smileys/smiley-eatdrink004.gif");
	buttons += emoticonButton("Sweat", "http://www.freesmileys.org/smileys/smiley-gen113.gif");
	buttons += emoticonButton("Stupid", "http://www.freesmileys.org/smileys/smiley-gen135.gif");
	buttons += emoticonButton("SOS", "http://www.freesmileys.org/smileys/smiley-gen164.gif");
	buttons += emoticonButton("Hydrogen","http://sa.peteyproductions.net/savedimage/emoticons/hydrogen.gif");
	buttons += emoticonButton("Shock", "http://www.freesmileys.org/smileys/smiley-shocked003.gif");
	buttons += emoticonButton("Shocking!..", "http://www.freesmileys.org/smileys/smiley-shocked017.gif");
	buttons += emoticonButton("Mad", "http://www.freesmileys.org/smileys/smiley-basic/mad.gif");
	buttons += emoticonButton("Nosepunch", "http://smileyjungle.com/smilies/fighting0.gif");
	buttons += emoticonButton("Cheerleeder","http://www.web-smilie.de/smilies/party_smilies/dance.gif");
	buttons += emoticonButton("Stereo","http://www.smileyvault.com/albums/basic/smileyvault-stereo.gif");
	buttons += emoticonButton("Matrix","http://www.freesmileys.org/smileys/smiley-cool21.gif");
	buttons += emoticonButton("HeadCrash","http://www.smilies.4-user.de/include/Computer/smilie_pc_033.gif");
	buttons += emoticonButton("Painter","http://www.freesmileys.org/smileys/smiley-chores032.gif");
	buttons += emoticonButton("Mail","http://www.freesmileys.org/smileys/smiley-forum/mailboxhappy.gif");
	buttons += emoticonButton("Doctor","http://www.web-smilie.de/smilies/kranke_smilies/doctor.gif");
	buttons += emoticonButton("ThumbsUp","http://www.smiliesuche.de/smileys/grinsende/grinsende-smilies-0189.gif");
//	buttons += emoticonButton("Runaway","http://www.gametoast.com/forums/images/smilies/runaway.gif");
	buttons += emoticonButton("Runaway","http://sa.peteyproductions.net/savedimage/emoticons/runaway.gif");
	buttons += emoticonButton("CoolSmoke","http://www.smiliemania.de/smilie132/00007380.gif");
	buttons += emoticonButton("OldManSays","http://www.freesmileys.org/smileys/smiley-char124.gif");
	buttons += emoticonButton("WheelChair","http://www.smileyvault.com/albums/character/smiley-vault-character-241.gif");
	buttons += emoticonButton("Jordi","http://www.smileyvault.com/albums/character/smiley-vault-character-253.gif");
//	buttons += emoticonButton("LaOla","http://www.freesmileys.org/smileys/smiley-bounce016.gif");
//	buttons += emoticonButton("LaOla2","http://www.freesmileys.org/smileys/smiley-happy110.gif");
	buttons += emoticonButton("Hiding","http://www.freesmileys.org/smileys/smiley-scared003.gif");
	buttons += emoticonButton("TomCat","http://www.freesmileys.org/emoticons/emoticon-looney-toons-002.gif");
	buttons += emoticonButton("DragonsThere","http://www.freesmileys.org/smileys/smiley-green/greensmilies-008.gif");
	buttons += emoticonButton("Fishing","http://www.smileyvault.com/albums/character/smiley-vault-character-262.gif");
	buttons += emoticonButton("WasGeraucht","http://www.smilies.4-user.de/include/Raucher/smilie_smoke_001.gif");
	buttons += emoticonButton("SchnellWeg","http://www.smilies.4-user.de/include/Schock/smilie_sh_029.gif");
//	buttons += emoticonButton("","");
//	buttons += emoticonButton("","");
//	buttons += emoticonButton("","");
    buttons += "</div>";

    bdiv.innerHTML += buttons;
    editbar.appendChild(bdiv);
  }
}

// Create a single emoticon element
function emoticonButton(name, url) {
  if (tagtype=='bbcode')
//    return "<span id='IzEmoticons_"+name+"' title='" + name + "' onmousedown='(function() {var rich_edit = document.getElementById(\""+textar+"\");rich_edit.value+=\"[img]"+url+"[/img]\";})();'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
    return "<span id='IzEmoticons_"+name+"' title='" + name + "' onmousedown='emoticonInsert(\"[img]"+url+"[/img]\");'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
  else
//    return "<span id='IzEmoticons_"+name+"' title='" + name + "' onmousedown='(function() {var rich_edit = document.getElementById(\""+textar+"\");rich_edit.value+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
    return "<span id='IzEmoticons_"+name+"' title='" + name + "' onmousedown='emoticonInsert(\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\")'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

// Create a separator (currently unused)
function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

// Check for a named element (divname) and, if found, initialize the
// corresponding textarea (txtname)
function initEmoticons(divname,txtname) {
  if ( typeof(divname)=='string' ) {
    var editbar = document.getElementById(divname);
  } else {
    var editbar = divname;
  }
//  if ( document.getElementById(divname) ) {
  if (editbar) {
    textar = txtname;
    setemoticons(editbar);
    return true;
  }
  return false;
}

// Loader for UserScripts "Edit post" Ajax link
function usoEditInit() {
  window.setTimeout(function() {
    initEmoticons("edit","edit_post_body");
  },1000);
}

// insert at cursor position
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML = "function emoticonInsert(instext) { var input = document.getElementById('"+textar+"'); var start = input.selectionStart; var end = input.selectionEnd; input.value = input.value.substr(0, start) + instext + input.value.substr(end); var pos = start + instext.length; input.selectionStart = pos; input.selectionEnd = pos; input.focus();}";
document.getElementsByTagName("head")[0].appendChild(scriptElement);
/*
function emoticonInsert(instext) {
  var input = document.getElementById(textar);
  var start = input.selectionStart;
  var end = input.selectionEnd;
  // insert emoticon
  input.value = input.value.substr(0, start) + instext + input.value.substr(end);
  // move cursor
  var pos = start + instext.length;
  input.selectionStart = pos;
  input.selectionEnd = pos;
  input.focus();
}";
*/

}, false);