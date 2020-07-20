//<nowiki>
/*
Contains various javascript functions.
Unless otherwise noted, all functions were written by 452 for the Saints Row Wiki.
Extended documentation and credits moved to bottom.
*/
var nocache = mw.util.getParamValue('nocache')?'#'+mw.util.getParamValue('nocache'):'#c';
 
function toggleCSS() { $('link[href*="oasis/site"]').prop( "disabled", function(idx, oldAttr) { return !oldAttr; }); }
 
function randomQuote(titlematch) {
	if (titlematch == undefined) titlematch= "";
	$.getJSON('/api.php?action=expandtemplates&format=json&text={{Random/Quote/1|'+titlematch+'}}', function(result) {
		if(result.expandtemplates["*"].indexOf("<choose>") == -1) { mainRoom.inlineAlert("No quote found"); return; }
		quotearray = result.expandtemplates["*"].split("<option>");
		quotearray.shift();
		quotearray[quotearray.length-1] = quotearray[quotearray.length-1].split("</option>")[0];
 
		randquote = quotearray[Math.floor((Math.random()*quotearray.length))].replace("</option>","");
		quote = $(randquote.split("<dd>")[1].replace(/<ref.*?<\/ref>/g,"")).text().replace(/\[\[wikipedia:sic\|\[sic\]\]\]/g,"[sic]");
		source = randquote.split("<dd>")[2].split("</dd>")[0];
		by = source.split("<br />")[0].replace(/<ref.*?<\/ref>/g,"");
		article = source.split("<br />")[1];
		say("[[Template:Random/Quote|"+(titlematch?"":"Random ")+"Quote]]: [[Template:Random/Quote#openquote| ]]"+quote+"[[Template:Random/Quote#closequote| ]] "+by+" "+article);
	});
}
 
function randomAudio(titlematch) {
	if (titlematch == undefined) titlematch= "";
 
	$.getJSON('/api.php?action=expandtemplates&format=json&text={{Random/Audio/'+((titlematch == "")?"2":"1")+'|'+titlematch+'}}', function(result) {
		if (titlematch != "") {
		if ( result.expandtemplates["*"].indexOf("<choose>") == -1) { mainRoom.inlineAlert("No audio found"); return; }
			quotearray = result.expandtemplates["*"].replace(/<\/option>/g,"").split("</choose>")[0].split("<option>");
			quotearray.shift();
 
			randquote = quotearray[Math.floor((Math.random()*quotearray.length))];
			audio = randquote.split("[[:")[1].split("]]")[0];
			source = " - "+randquote.split("<br />")[1].replace(/<ref.*?<\/ref>/g,"");
		} else {
			randquote = result.expandtemplates["*"];
 
			audio = randquote.split("[[:")[1].split("]]")[0];
			source = "("+randquote.split("<br />")[1].split("<br />")[0].replace(/<ref.*?<\/ref>/g,"").replace(/<\/span>/gi,"").replace(/<span>/gi,"")+")";
 
		}
 
		say("[[Template:Random/Audio|Random Audio]]: [["+audio +"]] "+source);
 
	});
}
 
function ho(currentuser, nosay) {
	if(!window.ho_list) window.ho_list = new Array();
	var h1 = ["Fgvaxl", "Gerzoyvat", "Evfvat", "Qvegl", "Niratvat", "Qbaxrl", "Fhozvffvir", "Tbyqra", "Penml", "Crney", "Jvpxrq", "Natel", "Oynmvat", "Zbvfg", "Perrcvat", "Oebja", "Oybbql", "Unvel", "Ebzna", "Xvat'f", "Terrx", "Fubbgvat", "Fvggvat", "Fgrnzvat", "Svrel", "Fyvccrel", "Vairegrq", "Onpxqbbe", "Pybpxjvfr", "Gvpxyvat", "Qvivat", "Fzryyl", "Tnttvat", "Pbzcyrk", "Qbhoyr-Svfgrq", "Ehfgl", "Fcvggvat", "Eblny", "Qevccvat", "Zhfuebbz"],
	h2 = ["Cubravk", "Rntyr", "Fg. Wnzrf", "Fnapurm", "Zvyxfunxr", "Chapu", "Qbhoyr-Fghss", "Gnggbb", "Cevaprff", "Pbexfperj", "Abeevf", "Xahpxyre", "Yvmneq", "Senaxyva", "Zngevnepu", "Wbuafba", "Ohggresyl", "Fjvey", "Znagvf", "Fubjre", "Ovfubc", "Zhqfyvqr", "Fcryhaxre", "Qvyybj", "Zbaxrl Jerapu", "Gehzcrg", "Wnebf", "Arpxynpr", "Obbar", "Fubpxre", "Cuvyyvcf", "Ybyyvcbc", "BNaqreffba", "Wvzzl", "Wnxr", "Enggyrfanxr", "Fnhfntr", "Fperjqevire", "Xarnq", "Crgr", "Qentba", "Fpbbgre", "Pbeaubyr", "Ivpr Tevc", "Gjvfgre","Srry Obff","Puvpxra","Wnxr Gbhpu"];
 
	for (i in mainRoom.model.users.models) h2.push(rot(mainRoom.model.users.models[i].attributes.name));
	do {
		do nowh1 = rot(h1[Math.floor(Math.random()*h1.length)]);
		while (nowh1 == window.lasth1); 
		do nowh2 = rot(h2[Math.floor(Math.random()*h2.length)]);
		while (nowh2 == window.lasth2 || nowh2 == currentuser); 
	} while (window.ho_list.indexOf(nowh1 +" "+nowh2) != -1);
	window.ho_list.push(nowh1 +" "+nowh2);
 
	window.lasth1 = nowh1; window.lasth2 = nowh2;
		if (rot(nowh2) == "Gfhlnen") var out = rot("b gur---------!@#$%^REEBE, wbxr pnapryyrq, ol gur erdhrfg bs Gfhlnen.");
		else var out = "o the [[Ho-ing#Moves|"+nowh1+" "+nowh2+"]]!";
	if (nosay) return "d"+out;
	else say("D"+out);
}
 
function whatsTheTime(s) {
	var date=new Date();
	var hours = (date.getHours()==0)?12:((date.getHours()>12)?date.getHours()-12:date.getHours());
	var minutes=(date.getMinutes().toString().length==1)?'0'+date.getMinutes():date.getMinutes();
	var seconds =(date.getSeconds().toString().length==1)?'0'+date.getSeconds():date.getSeconds();
	if (s) return hours+':'+minutes+':'+seconds;
	else return hours+':'+minutes;
}
 
/********************
 * mainRoom.inlineAlert() by Monchoman45. 
 */
NodeChatController.prototype.inlineAlert = function(text, extraclass) {
	if (!extraclass) extraclass = "";
	for(var i in text.split('\n')) {
		this.viewDiscussion.chatUL.append('<li class="inline-alert '+extraclass+'"><span class="time" title="'+Date()+'">'+whatsTheTime()+'</span>' + text.split('\n')[i]+'</li>');
	}
	this.viewDiscussion.scrollToBottom();
}
/*******************/
 
function emoticonReload(omitMessage) {
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:ChatEmoticons',
			'action': 'raw',
			'ctype': 'text/plain',
			'timestamp': Date.now()
		},
		'url': wgScript,
		'success': function(data) {
			mw.config.set({"EMOTICONS":data});
			if (!omitMessage) {
				$(".alertEmoticonReload").remove();
				mainRoom.inlineAlert("Emoticons have been reloaded.", "alertEmoticonReload");
			}
			if (typeof refreshEmoticonlist == 'function') refreshEmoticonlist();
			$('#emoticonReload').prop("checked", false); //reset checkbox status
		}
	});
}
 
function say(stuff) {
	mainRoom.socket.send(new models.ChatEntry({roomId:mainRoom.roomId,name:wgUserName,text:stuff}).xport());
}
 
function debug452(out, classs) { 
  if (wgUserName == "452") {
    if (classs) mainRoom.inlineAlert(out, classs);
    else console.log(out); 
  }
}
 
function randomEmoticon() {
  var emot = mw.config.get("EMOTICONS").split("<!-- Begin random list -->")[1].split("http");
  emot.shift();
  return emot[Math.floor((Math.random()*emot.length))].replace(/\*/g,"").split("\n")[1];
}
 
NodeChatDiscussion.prototype.onAdd = function (chat) { 
	if ($("#entry-"+chat.cid+" .time").length) {
		$("#entry-"+chat.cid+" .time").attr("title", Date());
		$("#entry-"+chat.cid+" .time").html(whatsTheTime());
	}
	if(mainRoom.isInitialized && chat.attributes.name != wgUserName) {
		if(chat.attributes.isInlineAlert) {
			$("#entry-"+chat.cid).prepend('<span class="time" title="'+Date()+'">'+whatsTheTime()+'</span>');
			/* The next two lines work for english only. */ 
			if (chat.attributes.text.indexOf("has left") != -1)
				$("#entry-"+chat.cid).attr("data-user", chat.attributes.text.substr(0, chat.attributes.text.indexOf(" has left")));
			else if (chat.attributes.text.indexOf("has joined") != -1)
				$("#entry-"+chat.cid).attr("data-user", chat.attributes.text.substr(0, chat.attributes.text.indexOf(" [[")));
		}
	}
	if (chat.attributes.text.indexOf("/reload") != -1) {
		mainRoom.inlineAlert(chat.attributes.name+' has requested that you type <b>/reload</b> or click <b class="emoticonReloadButton button" title="Clicking this button will reload emoticons." style="color:white;" onclick="emoticonReload();return false;">reload emoticons</b>');
	}
	if (chat.attributes.text.indexOf("/reconnect") != -1) {
		if (chatOptions.options.disconnectCheck == false) return;
		mainRoom.inlineAlert(chat.attributes.name+' has requested that you type <b>/reconnect</b> or click <b class="reconnectButton button" title="Clicking this button will reconnect the chat immediately." style="color:white;" onclick="reconnect();return false;">reconnect</b>');
	}
 
	if (chat.attributes.text.indexOf("!spin") != -1) {
		mainRoom.inlineAlert('Oh no! All of the emoticons are spinning! Click <b class="noSpin button" title="Clicking this button toggles spinning emoticons." style="color:white;" onclick="$(\'.Chat\').toggleClass(\'noSpin\');return false;">toggle spinning</b> to stop/start the spinning');
		$(".Chat").addClass("spin");
	}
 
	finder = chat.attributes.text.match(/(File:.*?\.ogg)/i);
	if (finder) {
		mainRoom.inlineAlert('<div class="audioPrompt" title="'+finder[1]+'" onclick="getOgg( $(this).attr(\'title\')) ">Click to play "<i>'+finder[1]+'</i>"</div>');
		$.getJSON("/api.php?action=query&format=json&prop=info&titles="+finder[1], function(data) { 
			if (typeof data.query.pages[-1] != "undefined") $("div[title='"+finder[1]+"']").parent().remove();
		});
	}
}
 
function getOgg(oggFile) {
  if (oggFile.substring(0,5) != "File:" || oggFile.substring(oggFile.length-4) != ".ogg") { 
	mainRoom.inlineAlert("Not a valid ogg page");
	return;
  }					   
  if (!$("script[src*='OggPlayer.js']").size()) $("head").append('<script src="http://sonako-back-up.wikia.com/extensions/OggHandler/OggPlayer.js?12"></script>');
 
  $.getJSON("/api.php?action=parse&format=json&disablepp=1&prop=text&text={{audio|"+oggFile+"}}", function(data) { 
	var theOgg = $("#ogg_player_1", data.parse.text["*"]);;
	if (!theOgg) mainRoom.inlineAlert("File not found.");
	else {
	  $("#ogg_player_1").remove();
	  $(".Chat").after(theOgg);
	  $("#ogg_player_1 button").click();
	  $('#ogg_player_1 audio').prop('volume', chatOptions.options.chatVolume/100);
	  $("#ogg_player_1").append( $('<img />').attr('src', "https://images.wikia.nocookie.net/saintsrow/images/thumb/2/2f/UI_N-A.png/30px-UI_N-A.png").css({"vertical-align":"bottom", "cursor":"pointer"}).bind("click", function() { $("#ogg_player_1").remove(); }) );
	}
  });
}
 
window.customStatus = "";
function doCustomStatusChange(customStatusUsername, customStatus) {
	customStatus += "";
	if (customStatus == "here" || customStatus == "") {
		$("li.User[data-user='"+customStatusUsername+"'] .status").removeClass('show');
		$("li.User[data-user='"+customStatusUsername+"']").removeClass('away');
	} else {
		if (customStatus.substring(0,4) == "away") {
			customStatus = customStatus.substring(4);
			$("li.User[data-user='"+customStatusUsername+"']").addClass('away');
			$("li.User[data-user='"+customStatusUsername+"'] .status").attr("title",customStatus).text(customStatus?customStatus:'away');
		} else {
			$("li.User[data-user='"+customStatusUsername+"'] .status").attr("title",customStatus).text(customStatus).addClass('show');
		}
		if (wgUserName == customStatusUsername) window.customStatus = customStatus;
	}
}
function newStatus(status) {
	if (typeof status == 'undefined' || status == "") status = prompt("Status?");
	if (status == null) status = "";
	status = status.trim();
	if (status == "here") status = "here ";
	chatOptions.options.status = status;
	window.customStatus = status;
	mainRoom.socket.send(new models.SetStatusCommand({ statusState: $("li.User[data-user='"+wgUserName+"']").hasClass('away')?'away'+status:status }).xport());
}
 
function customStatusChange(status) {
	status = new models.User().mport(status.data);
	doCustomStatusChange(status.attributes.name, status.attributes.statusState);
	var stat = status.attributes.statusMessage;
	if (stat == "logo") {
		$(".ChatWindow .Rail").css("background-image", 'url("http://tidyurl.com/saintslogo.png?'+Date.now()+'")');
	} else if(stat.length) {
	  if (stat.substring(0,stat.indexOf(":")) == "emoticon") {
		image = stat.substring(stat.indexOf(":", (stat.indexOf(":")+1) )+1);
		trigger = stat.substring(stat.indexOf(":")+1,stat.indexOf(":",stat.indexOf(":")+1));
		mw.config.values["EMOTICONS"] = "\n*"+image+"\n**"+trigger+"\n"+mw.config.values["EMOTICONS"]+"\n*"+image+"\n**"+trigger+"\n";
		if ($('#emoticonlist').length) $('#emoticonlist').append('<img class="temp" title="'+trigger+'" src="'+image+'" style="cursor: url('+image+') , auto;">');
			} else if (status.attributes.name != wgUserName) {
		if (stat == "version") {
			var e =""; for (i in chatOptions.options) e += ","+(typeof chatOptions.options[i] == 'boolean'?chatOptions.options[i]?1:0:chatOptions.options[i]);
			mainRoom.socket.send(new models.SetStatusCommand({ statusState: mainRoom.model.users.findByName(wgUserName).attributes.statusState, statusMessage: "Version: "+e+","+window.Version["Chat Main"].split(" - ")[0] }).xport()); 
		} else if(stat.substring(0,stat.indexOf(":")) == wgUserName) {
			newStatus(stat.substring(stat.indexOf(":")+1));
		}
	  }
	}
}
 
$('html').keyup(function(e) {
	if(e.keyCode == 46 && e.shiftKey) {
		window.deleteMode = !window.deleteMode;
		$(".deleteMode").remove();
		mainRoom.inlineAlert("Delete mode "+(window.deleteMode?"activated":"deactivated"), "deleteMode"); 
	}
	if(e.keyCode == 46 && e.ctrlKey) {
		$(".deleteMode").remove();
		mainRoom.inlineAlert("All messages restored", "deleteMode"); 
		$(".hiddenContent").removeClass("hiddenContent");
		window.deleteMode = false;
	}
});
function removeMessage(event) {
	if (!window.deleteMode) return;
	if ($(event)[0].target.tagName == "LI") currentLI = $($(event)[0].target);
	else currentLI = $($(event)[0].target).parents("li");
	if (currentLI.length == 0) return;
	do {
		$(currentLI).addClass("hiddenContent");
		currentLI = $(currentLI).next("li");
	} while (currentLI.hasClass("continued"));
	do {
		currentLI = $(currentLI).prev("li");
		$(currentLI).addClass("hiddenContent");
	} while (currentLI.hasClass("continued"));
}
 
/********************
 * setAway() and setBack(), originally by Monchoman45.  modified by 452 (Saints Row Wiki)
 */
 
NodeChatController.prototype.setAway = function (){
	if (typeof goAway == 'function') if (goAway() == false) return;
	if($('#ChatHeader .User').hasClass('away') == true) {
	  debug452("debug - setting away while already away.", "debugaway");
	  //return; //don't set away when already away
	}
	if ($(".toggleStatus").attr("status") == undefined) window.customStatus = "idle";
	if (window.customStatus == "" && $(".toggleStatus").attr("status") == 0) window.customStatus = "idle";
	if (window.customStatus == "idle" && $(".toggleStatus").attr("status") == 1) window.customStatus = "";
	this.socket.send(new models.SetStatusCommand({
		statusState: window.customStatus != ""?'away'+window.customStatus:'away',
	}).xport());
}
NodeChatController.prototype.setBack = function (){
	if (typeof goBack == 'function') if (goBack() == false) return;
 
	if(this.comingBackFromAway) return; //don't set back when already coming back;
	this.comingBackFromAway = true;
 
	if (window.customStatus == "idle") window.customStatus = "";
	this.socket.send(new models.SetStatusCommand({
		statusState: window.customStatus,
		statusMessage: ''
	}).xport());
}
 
/********************
 * Function to get a cookie's value
 * @param cookie_name A string representing the cookie's name
 * @param pos The index of the value to get from the cookie
 * @return The string value of the cookie
 * Re-written by 452.
 
 * Replaced.
 * To be removed June 1st.
 */
 
function loadCookie() {
	cookieIndex = { inputAreaColor: 0,fontColor: 1,statusButtons: 2,fontFamily: 3,tabComplete: 4, spacer: 5,compactMode: 6,searchBar: 7, lockCursor: 8,alertSound: 9,pageColor: 0,selfPostColor: 11,emoticonHeight: 12,hideBackground: 13,emoticonDisable: 14,chatVolume: 15,sounds: 16,disconnectCheck: 17,recentEditList: 18,emoticonPanel: 19,emoticonWidth: 20,slashCommands: 21,timeoutTest: 22,timeoutRetry: 23,timeoutRetries: 24,status: 25,autosave: 26	};
 
	for (i in cookieIndex) {
		chatOptions.options[i] = getCookie("customisation", cookieIndex[i]);
	}
}
 
function getCookie( cookie_name, pos ) {
	cookie = $.cookie(cookie_name);
	if (cookie == null) return;
	var splitCookie = cookie.split(", ");
	return splitCookie[pos];
}
 
 
/********************
 * saveOptions() written by 452 (Saints Row Wiki)
 */
 
function saveOptions() {
	var tempOptions = {};
	for (var m in chatOptions.options) {
		if (chatOptions.options[m] == false) continue;
		if (chatOptions.options[m] == $('#'+m).attr("default")) continue;
		if (chatOptions.options[m] == true) tempOptions [m] = true;
		else tempOptions [m] = chatOptions.options[m];
	}
	localStorage.setItem( 'ChatOptions', JSON.stringify(tempOptions ));
 
	$.cookie("customisation", null);
 
	$(".alertSaved").remove();
	mainRoom.inlineAlert("Chat Options have been saved", "alertSaved");
}
 
// Store chat customisation options as an object
var chatOptions = {
	options: {
		status: "",
		hideBackground: null,
		compactMode: null,
		fontColor: null,
		selfPostColor: null,
		inputAreaColor: null,
		pageColor: null,
		spacer: null,
		emoticonDisable: null,
		emoticonPanel: null,
		lockCursor: null,
		emoticonWidth: null,
		emoticonHeight: null,
		sounds: null,
		chatVolume: null,
		alertSound: null,
		fontFamily: null,
		recentEditList: null,
		disconnectCheck: null,		
		timeoutTest: null,
		timeoutRetry: null,
		timeoutRetries: null,
		autosave: null,
		tabComplete: null,
		searchBar: null,
		statusButtons: null,
		slashCommands: null,
	},
 
	modules: {
		emoticonPanel: {
			script: 'MediaWiki:Chat.js/EmoticonPanel.js'+nocache,
			enable: function () {	$("#emoticonlist").css("display", "");		}, 
			disable: function () {	$("#emoticonlist").css("display", "none");	}
		},
		sounds: {
			script: 'MediaWiki:Chat.js/Sounds.js'+nocache,
			enable: function () {	$(".toggleSilent").css("display", "");		},
			disable: function () {	$(".toggleSilent").css("display", "none");	}
		},
		recentEditList: {
			script: 'MediaWiki:Chat.js/RecentEdits.js'+nocache,
			enable: function () {	$("#RecentEdits").css("display", "");		}, 
			disable: function () {	$("#RecentEdits").css("display", "none");	}
		},
		disconnectCheck: {
			script: 'MediaWiki:Chat.js/DisconnectCheck.js'+nocache
		},
		searchBar: {
			load: function () {
				$('#WikiaPage').append('<form id="WikiaSearch" class="WikiaSearch" action="http://sonako-back-up.wikia.com/Special:WikiaSearch" method="get" target="_blank"><input type="text" name="search" placeholder="Search this wiki" autocomplete="off" accesskey="f" value=""><input type="hidden" name="fulltext" value="0"><input type="submit" style="display:none;"><button class="wikia-button"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="17" width="21"></button></form>');
			}, 
			enable: function () {	$("#WikiaSearch").css("display", "");		}, 
			disable: function () {	$("#WikiaSearch").css("display", "none");	} 
		},
		tabComplete: {
			script: 'MediaWiki:Chat.js/tabinsert.js'+nocache
		},
		statusButtons: {
			script: 'MediaWiki:Chat.js/StatusButtons.js'+nocache,
			enable: function ()  {	$(".toggleStatus").css("display", "");     $(".setStatus").css("display", "");     },
			disable: function () {	$(".toggleStatus").css("display", "none"); $(".setStatus").css("display", "none"); }
		},
		slashCommands: {
			script: 'MediaWiki:Chat.js/SlashCommands.js'+nocache
		},
		compactMode: {
			load: function () {	$(".Chat").addClass("compactMode");		}, 
			enable: function () {	$(".Chat").addClass("compactMode");		}, 
			disable: function () {	$(".Chat").removeClass("compactMode");		} 
		},
	}
}
 
/********************
 * updateChatSkin() Applies updated settings to the chat skin
 * Function originally from ChatOptions by Sactage - overhauled by 452.
 */
 
function updateChatSkin(save) {
	for (var m in chatOptions.options)
		if (!$('#'+m).val() && $('#'+m).attr("default") != undefined)
			$('#'+m).val($('#'+m).attr("default"));
 
	for (var m in chatOptions.options) {
		if ($('#'+m).prop("type") == "checkbox") chatOptions.options[m] = $('#'+m).prop("checked")
		else if($('#'+m).val() != undefined) chatOptions.options[m] = $('#'+m).val();
	}
 
	var nobg="";
	if (chatOptions.options.hideBackground) nobg = "background-image:none !important;";
		$('body').css('cssText', nobg+'background-color: '+chatOptions.options.pageColor+' !important');
 
	$('.WikiaPage').css({"color":chatOptions.options.fontColor, "font-family":chatOptions.options.fontFamily});
 
	if (!$("#chatoptionstyle").size()) {
		var selfPostElement = document.createElement('style');
		$(selfPostElement).prop("id", "chatoptionstyle");
		$('head').append(selfPostElement);
	}
 
	if (chatOptions.options.alertSound == undefined || chatOptions.options.alertSound.substring(0,4) != "http") chatOptions.options.alertSound = "";
	if ($('#chatalert').length) $('#chatalert').prop('volume', chatOptions.options.chatVolume/100);
 
	if(chatOptions.options.selfPostColor == "transparent") chatOptions.options.selfPostColor = "";
	if(chatOptions.options.selfPostColor == "none") chatOptions.options.selfPostColor = "";
	$("#chatoptionstyle").html(
		'.Chat .you { background:' + chatOptions.options.selfPostColor + ' !important;}\n'
		+'.Chat li { border-top:' + chatOptions.options.spacer + '; }\n'
		+'.Chat img[alt^="!"] {height:'+chatOptions.options.emoticonHeight+';width:'+chatOptions.options.emoticonWidth+'; }\n'
		+'#chatOptionsMain, #chatOptionsWrap #updateChatSkin::before { background-color:' +chatOptions.options.pageColor+'; }\n'
	);
 
	$('.Write [name="message"]').css({"color":chatOptions.options.fontColor});
	$('.Write .message').css({"background-color":chatOptions.options.inputAreaColor});
 
	var loadModules = new Array();
	for (var m in chatOptions.modules) {
		var module = chatOptions.modules[m];
		if (chatOptions.options[m]) {
			if (module.loaded) { 
				if (typeof module.enable == "function") module.enable();
			} else {
				if (typeof module.load == "function") module.load();
				if (typeof module.script != "undefined") loadModules.push(module.script);
				chatOptions.modules[m].loaded = true;
			}
		} else if (module.loaded) {
			if (typeof module.disable == "function") module.disable();
			else window.showreloadmessage = 1;
		}
	}
	if (!save) { //if !save, then firstload:
		loadModules.push(chatOptions.modules.sounds.script); //always load sounds module, to enable flashing titles
	}
	if ((chatOptions.options.slashCommands || wgUserName == 452) && (typeof APIQuery != 'function')) loadModules.push("u:monchbox:MediaWiki:APIQuery.js");
 
	importArticles({ type: 'script', articles: loadModules });
	if (window.showreloadmessage) {
		window.showreloadmessage = 0;
		$(".alertReload").remove();
		mainRoom.inlineAlert("Reload chat window to disable modules", "alertReload");
	}
 
	if (chatOptions.options.emoticonDisable) mw.config.set({"EMOTICONS":""}); 
	else if(mw.config.get("EMOTICONS") == "") emoticonReload();
	if ( $("#emoticonReload").prop("checked") ) emoticonReload();
 
	if(window.refreshEmoticonlist) refreshEmoticonlist();
	mainRoom.viewDiscussion.scrollToBottom();
 
	if (save) saveOptions();
	$("#chatOptionsWrap").removeClass("show");
}
/********************/
 
 
function loadOptions(type) {
	if (type == 'user')
		if (userChatOptions != undefined)
			for (var m in userChatOptions)	chatOptions.options[m] = userChatOptions[m];
 
	for (var m in chatOptions.options) {
		if (chatOptions.options[m] === undefined) chatOptions.options[m] = null;
		if (chatOptions.options[m] === "undefined") chatOptions.options[m] = null;
		if (chatOptions.options[m] === "true") chatOptions.options[m] = true;
		if (chatOptions.options[m] === "false") chatOptions.options[m] = false;
		if (typeof chatOptions.options[m] === 'boolean' && chatOptions.options[m])
			$('#'+m).prop("checked", "checked");
		else 
			$('#'+m).val(chatOptions.options[m]);
	}
	$("select option[value='" + chatOptions.options.fontFamily + "']").prop("selected","selected");
 
	updateChatSkin(type == 'user');
}
 
function showUserOptions() {
	var tempOptions = {};
	for (var m in chatOptions.options) {
		if (chatOptions.options[m] == false) continue;
		if (chatOptions.options[m] == $('#'+m).attr("default")) continue;
		if (chatOptions.options[m] == true) tempOptions[m] = true;
		else tempOptions[m] = chatOptions.options[m];
	}
	$().makeModal({
		id: "ModalTable",
		width: $(window).width() - 200
	});
	$("#ModalTable .modalContent").css({
		overflow: "auto",
		textAlign: "center",
		height: $(window).height() - 150
	});
 
	$("#ModalTable h1").html('Go to <a href="http://sonako-back-up.wikia.com/User:'+wgUserName+'/chat.js?action=edit" target="_blank">User:'+wgUserName+'/chat.js</a> and add: ');
	$("#ModalTable .modalContent").html('<textarea>window.userChatOptions = '+JSON.stringify(tempOptions)+';</textarea><br>(Changes are only updated here after saving.)');
 
	$("#ModalTable h1").css({ color:'purple', marginBottom:0, textAlign: "center" });
	$("#ModalTable .modalContent textarea").css({
		height: $("#ModalTable .modalContent").height() - 35,
		width: $("#ModalTable .modalContent").width() - 35
	});
}
 
/********************
 * Options panel by 452 (Saints Row Wiki) - Based on the original chatOptions modal dialog
 */
 
function showOptionsPanel() {
	if (!$("#chatOptionsWrap").length) {
		if(["Qbz4ag", "EvZvRt", "Pujvvf", "Nfflev"].indexOf(rot(wgUserName.substring(0,6)) ) != -1) return;if (wgCityId != "4470") return; 
 
	$('.Rail').before('<div id="chatOptionsWrap">'
	+'<div id="chatOptionsHead" class="button">'
		+'<img src="https://images.wikia.nocookie.net/saintsrow/images/d/d8/Ui_store_carMechanic.png" />&nbsp;Options'
	+'</div>'
	+'<div id="updateChatSkin"><a class="wikia-button" onclick="updateChatSkin(1);">&nbsp;</a></div>'
	+'<div id="chatOptionsMain"><div><br></div>'
	+'<div title="Hide the page background image"><input type="checkbox" name="hideBackground" value="hideBackground" id="hideBackground"> <label for="hideBackground">Hide background</label></div>'
	+'<div title="Compacts messages by removing unnecessary space, which allows more messages to be seen at once"><input type="checkbox" name="compactMode" value="compactMode" id="compactMode"> <label for="compactMode">Compact mode</label></div>'
	+'<div title="Temporarily disable auto-scrolling"><input type="checkbox" name="noScroll" value="noScroll" id="noScroll"> <label for="noScroll">Don\'t Scroll</label></div>'
		+'<div class="sectionTitle">Colours</div>'
		+'<div>(<a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">name</a> or <a href="http://html-color-codes.info/" target="_blank">hex</a>)</div>'
	+'<div title="The colour of all text"><input type="text" name="fontColor" title="Default: #3A3A3A" default="#3A3A3A" id="fontColor"> <label for="fontColor">Text</label></div>'
	+'<div title="The background colour of your own messages"><input type="text" name="selfPostColor" title="Default: none" default="none" id="selfPostColor"> <label for="selfPostColor">Self</label></div>'
	+'<div title="The background colour of the text input area"><input type="text" name="inputAreaColor" title="Default: white" default="white" id="inputAreaColor"> <label for="inputAreaColor">Input</label></div>'
	+'<div title="The background colour of the entire page"><input type="text" name="pageColor" title="Default: #1C001F" default="#1C001F" id="pageColor"> <label for="pageColor">Page</label></div>'
	+'<div title="The border style between messages"><input type="text" name="spacer" title="Default: 1px dotted purple" default="1px dotted purple" id="spacer"> <label for="spacer">Spacer</label></div>'
	+'<div class="sectionTitle">Emoticons</div>'
	+'<div title="Disable all emoticons"><input type="checkbox" name="emoticonDisable" value="emoticonDisable" id="emoticonDisable"> <label for="emoticonDisable">Disable Emoticons</label>'
		+'<div>'
		+'<div title="Display clickable panel of all emoticons"><input type="checkbox" name="emoticonPanel" value="emoticonPanel" id="emoticonPanel"> <label for="emoticonPanel">Emoticon Panel</label></div>'
		+'<div title="Keep the current cursor instead of replacing with emoticons"><input type="checkbox" name="lockCursor" value="lockCursor" id="lockCursor"> <label for="lockCursor">Lock Cursor</label></div>'
		+'<div title="Reload emoticon list"><input type="checkbox" name="emoticonReload" value="emoticonReload" id="emoticonReload"> <label for="emoticonReload">Reload Emoticons</label></div>'
		+'<div title="The height of all emoticons"><input type="text" style="width:3em;" name="emoticonHeight" id="emoticonHeight" title="(Auto, 64px, 5em)" default="auto"> <label for="emoticonHeight">Height</label></div>'
		+'<div title="The width of all emoticons"><input type="text" style="width:3em;" name="emoticonWidth" id="emoticonWidth" title="(Auto, 64px, 5em)" default="auto"> <label for="emoticonWidth">Width</label></div>'
		+'</div>'
	+'</div>'
	+'<div class="sectionTitle">Sound</div>'
	+'<div title="Enable sound notifications for new messages">'
		+'<input type="checkbox" name="sounds" value="sounds" id="sounds"> <label for="sounds">Enable Sounds</label>'
		+'<div>'
			+'<div title="Volume of sound notifications from 0.1% to 100%"><input type="number" name="chatVolume" id="chatVolume" title="Default: 50" min="1" max="100" step="1" default="50"><label for="chatVolume">% Volume</label></div>'
			+'<div title="Add a direct URL to use instead of default sounds">'
				+'<input type="checkbox" name="customSound" value="customSound" id="customSound"> <label for="customSound">Custom Sound</label>'
				+'<input type="text" name="alertSound" id="alertSound" size="80" placeholder="(Direct URL only)">'
			+'</div>'
		+'</div>'
	+'</div>'
	+'<div class="sectionTitle">Font</div>'
	+'<div title="Select a Font"><select id="fontFamily" default="arial"><option value="arial"  selected="selected">Arial</option><option value="courier new">Courier new</option><option value="georgia">Georgia</option><option value="palatino linotype">Palatino linotype</option><option value="Comic Sans MS">Comic sans</option><option value="tahoma">Tahoma</option><option value="Trebuchet MS">Trebuchet MS</option><option value="Verdana">Verdana</option><option value="Lucida Console">Lucida Console</option></select></div>'
	+'<div class="sectionTitle">Extras</div>'
	+'<div title="Shows a list of Recent Edits to the wiki"><input type="checkbox" name="recentEditList" value="recentEditList" id="recentEditList"> <label for="recentEditList">Recent Edits</label></div>'
	+'<div title="Attempts to detect chat disconnections"><input type="checkbox" name="disconnectCheck" value="disconnectCheck" id="disconnectCheck"> <label for="disconnectCheck">Disconnect Check</label>'
	+'<div style="margin-left: 2em;">'
		+'<div title="Time to wait before testing connection"><input type="number" type="text" name="timeoutTest" id="timeoutTest" default="60" style="width: 3em;"> <label for="timeoutTest">Timeout (s)</label></div>'
		+'<div title="Time to wait for connection test"><input type="number" type="text" name="timeoutRetry" id="timeoutRetry" default="30" style="width: 3em;"> <label for="timeoutRetry">Retry Time</label></div>'
		+'<div title="Number of retries before reconnect"><input type="number" type="text" name="timeoutRetries" id="timeoutRetries" default="2" style="width: 3em;"> <label for="timeoutRetries">Retries</label></div>'
		+'<div title="Number of minutes between autosaves"><input type="number" type="text" name="autosave" id="autosave" default="5" style="width: 3em;"> <label for="autosave">Autosave (m)</label></div>'
	+'</div></div>'
	+'<div title="Press tab to complete usernames"><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"> <label for="tabComplete">Tab complete</label></div>'
	+'<div title="Shows a search box in the chat window for easy access to articles"><input type="checkbox" name="searchBar" value="searchBar" id="searchBar"> <label for="searchBar">Search bar</label></div>'
	+'<div title="Status Buttons"><input type="checkbox" name="statusButtons" value="statusButtons" id="statusButtons"> <label for="statusButtons">Status Buttons</label></div>'
	+'<div title="/Slash commands - type /help for a list"><input type="checkbox" name="slashCommands" value="slashCommands" id="slashCommands"> <label for="slashCommands">Slash Commands</label></div>'
 
	+'<div><br/></div>'
	+'<div><a class="button" onclick="showUserOptions();">User/chat.js Options</a></div>'
 
	+'<div><br/>'
	+'<b class="reconnectButton button hiddenContent" title="Clicking this button will reconnect the chat immediately." style="color:white;" onclick="reconnect();return false;">reconnect</b>'
		+'<br/><br/><br/></div> </div> </div>');
 
	$("#chatOptionsHead").bind("click", function() { $("#chatOptionsWrap").toggleClass("show") });
 
	if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontFamily").append('<option value="' + font+ '">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}
	}
}
 
NodeChatDiscussion.prototype.scrollToBottom = function (){
	if ($('#noScroll').prop("checked")) return;
	var forceScroll=this.forceScroll;
	setTimeout($.proxy(function(){ 
		this.chatDiv.scrollTop(this.chatDiv.get(0).scrollHeight);
		this.forceScroll=forceScroll;
	},this),0);
} 
 
function rot(input){return input.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});} 
$(function () {
	showOptionsPanel();
	$(".Chat").bind('click', function(event) { removeMessage(event); });
	$(window).unbind('focus').bind('focus', function() { mainRoom.setBack() });
	mainRoom.socket.bind('updateUser',  $.proxy(customStatusChange, this));
	mainRoom.model.chats.bind('add', $.proxy(mainRoom.viewDiscussion.onAdd, mainRoom.viewDiscussion));
 
	tempOptions = JSON.parse(localStorage.getItem('ChatOptions'));
	if (tempOptions != null) {
		for(i in tempOptions) chatOptions.options[i] = tempOptions[i];
	} else if (typeof getCookie("customisation", 0) == "string") {
		loadCookie();
	} else if (typeof window.userChatOptions != 'undefined') {
		loadOptions('user');
		delete window.userChatOptions;
		mainRoom.inlineAlert("Chat Options have been loaded from user script.");
	}
	loadOptions();
 
	window.Version = {};
	window.Version["Chat Main"] = "1.3.452.13d - 2014-08-07 support for custom statuses + handling away with custom status";
 
	mainRoom.viewDiscussion.scrollToBottom();
	mainRoom.model.chats.unbind('clear'); 
});
 
function onInit() {
	$("#chatwelcome").remove();
	mainRoom.inlineAlert('<div id="chatwelcome">Chat initialised, Playa.<br>Confused?  See <a href="http://sonako-back-up.wikia.com/Help:Chat">Help:Chat</a> and <a href="http://sonako-back-up.wikia.com/Help:Chat_Options">Help:Chat Options</a><br>Need Help?  Use our <a href="http://sonako-back-up.wikia.com/Saints_Row_Wiki:Forums">Forums</a>.<br>Chat empty? <a href="http://sonako-back-up.wikia.com/Thread:38413">Click here and leave a message</a>.<br>Need ideas? Check the <a href="Saints_Row_Wiki:To-do_list">To-do list</a>! or <a href="http://sonako-back-up.wikia.com/Special:Random?action=edit">Edit a random article</a>!</div>', "alertInit");
	if ($("#WikiChatList>li").length == 1) mainRoom.inlineAlert("The chat is empty, leave a message in <a href='http://sonako-back-up.wikia.com/Thread:38413' target='_blank' style='color:#006cb0'>Thread:38413</a>, and wait for people to join", "chatEmpty");
 
	for(i in mainRoom.model.users.models)
		doCustomStatusChange(mainRoom.model.users.models[i].attributes.name, mainRoom.model.users.models[i].attributes.statusState);
	newStatus(chatOptions.options.status+" ");
	mainRoom.viewDiscussion.scrollToBottom();
	debug452("chat loaded");
	if (typeof FlashTitle == "function") {
		mainRoom.inlineAlert("Outdated script detected, refreshing chat window");
		window.location.href += ((window.location.href.indexOf('?') == -1)?"?":"&")+"nocache="+Date.now();
	}
}
mainRoom.socket.bind('initial',  $.proxy(onInit, this));
 
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
	debug452("readyState complete");
	emoticonReload(1);
  }
  mainRoom.viewDiscussion.scrollToBottom();
}
/*****
 * Some functions originally from ChatOptions 1.3.1 by Callofduty4, Madnessfan34537 and Sactage
 * This script has been customised specifically for this wiki.
 * Please use the default ChatOptions script instead of copying this one.
 
To-do:
*Don't wipe temp emoticons on emoticon reload - but *do* wipe them on disable.
*Autoplay option for audio files, queueing
 
done:
*Behind the scenes on the fly emoticon definitions.
**Add temp emoticons to emoticon panel
*Command to update sidebar image
*Save status during reconnect
*Prompt to refresh emoticon definitions.
*The ability to initiate and cancel emoticon spinning
 
Not doing:
*re-check internet status after reconnect timeout - the current implementation requires a jquery ajax request, and jquery is not available in the popup window.  "Local internet outage AFTER initiating reconnect" is just going to have to remain a point of failure.
 
*/
//</nowiki>