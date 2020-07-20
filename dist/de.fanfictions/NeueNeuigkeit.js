/* -------------------------------------------------------------- */
// Variables for later on
// Keep these in an object for organization
var _nnp_tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};



// fallback: hole posttime, falls beim übermitteln nicht rechtzeitig abgefragt wird 
importScriptPage('MediaWiki:Posttime.js', 'de.fanfictions');

 
// nnp_pagename = wgPageName + '/' + $(".ns-112 a[title^='Geschichte:'].new").html(); 
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    nnp_msg = nnp_messages = {
        get: function(name) {
    return (nnp_messages[_nnp_tr.language.toUpperCase()]||nnp_messages['DE'])[name];
        },
        languages: {
            DE: 'Deutsch',
        },
    };
 
// German
nnp_messages['DE'] = {
    nnp_button: "Neuigkeit hinzufügen",
    "nnp_form-name": "Neuigkeit hinzufügen",
    "nnp_form-header": "",
    "nnp_form-header-placeholder": "",
    "nnp_form-kapitel-header": "",
    "nnp_text_placeholder": "Füge hier deine Neuigkeit ein!",
}
 
function count_textarea_nnp() {
$('#nnp_editarea').keyup(function() {
    characters_entered_nnp = $(this).val().length;
    $('#nnp_characters span').text(characters_entered_nnp);
});
}

var hasModalClass = '';

if($("body").hasClass("ns-112")) {
 
    window.nnp_editarea = '<div style="float: right;" id="nnp_characters"><span />/500</div><textarea style="width: 100%; height: 80px;" id="nnp_editarea" name="nnp_editarea" placeholder="' + nnp_msg.get('nnp_text_placeholder') + '" tabindex="1"></textarea>'
 
// This opens the form for the users to fill out
 
function neueNeuigkeitPosten() {
if (wgUserName === null) {
window.location = "http://de.fanfictions.wikia.com/wiki/Spezial:Anmelden?returnto=" + wgPageName + "&type=login";
} else {
setTimeout(function() {
count_textarea_nnp();
}, 1000);

pagenamePiped = wgPageName.slice(11); // extract "Geschichte:"
 
setTimeout(function (){
		 
    $.showCustomModal(nnp_msg.get('nnp_form-name'), '<form class="WikiaForm" method="" name="" id="nnp_Form"><fieldset><!--<strong>' + nnp_msg.get('nnp_form-header') + '</strong><input id="request-header" type="text" placeholder="' + nnp_msg.get('nnp_form-header-placeholder') + '" style="width: 450px"/><br/><strong><br>--><span style="opacity: 0.50; font-style:italic; font-size: 10px;" title="">Dieses Textfeld wird als <a href="http://mum.wikia.com/wiki/Hilfe:Wikitext">Wikitext</a> gespeichert. Das wichtigste: Ein "normaler" Absatz entsteht durch zwei Mal Enter drücken.</span></span><!--<span title="' + nnp_msg.get('form-information-request') + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong>--><table cellspacing="0" cellpadding="0" style="width: 100%;" border="0" id="mw-translate-table"><tr><td class="mw-input">' + window.nnp_editarea + '</td></tr></table></fieldset></form>', {
        id: "neuesKapitelModal",
        width: 900,
        buttons: [{
    id: "cancel",
    message: "Abbrechen",
    handler: function () {
        nnp_abbrechen();
    }
        }, {
    id: "submit",
    defaultButton: true,
    message: "Neuigkeit hinzufügen",
    handler: function () {
        nnp_neuigkeitPosten();
    }
        }]
    });
		 }, 100);
    }
}
// Closes the form
}
// Closes the logged out function
 
function nnp_abbrechen() {
    $("#neuesKapitelModal").closeModal();
}
 
// Submits the form
 
function nnp_neuigkeitPosten() {
    var $form = $('#nnp_Form'),
        header = $form.find('#request-header').val(),
        geschichtentext = $form.find('#nnp_editarea').val(),
        page = '{{Neuigkeiten-Nav}}\n\n<div class="neuigkeiten-nachricht">' + geschichtentext + '<hr><div class="newsfrom">Neuigkeit von: [[Benutzer:' + wgUserName + '|' + wgUserName + ']]</div></div>';
 
    if (!geschichtentext ) {
        alert('Bitte gib deine Neuigkeit an!');
        return;
    }

// aktualisiere ältere variable
            importScriptPage('MediaWiki:Posttime.js', 'de.fanfictions');
 
    // Ajax URL
    var url = _nnp_tr.server + '/api.php?action=edit&title=Neuigkeiten:' + encodeURIComponent(pagenamePiped) + '/' + posttime + isBot + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(_nnp_tr.edittoken) + '&summary=Neuigkeit hinzugefügt';

if (url.length > 1000) {
alert("Du hast das Limit für die Neuigkeit überschritten.");
} else { 
    $.post(url, function () {
        window.location.reload();
    });
    setTimeout(nnp_abbrechen(), 1000);
}
}

$("#aktuelles").append('&nbsp;&nbsp;<a class="button" id="addNews" onclick="neueNeuigkeitPosten()" style="vertical-align: bottom;">Neuigkeit hinzufügen</a>');

/* get news */
if ($("body").hasClass("ns-112") || $("body").hasClass("ns-124") || $("body").hasClass("mainpage") || $("body").hasClass("page-Benutzer_MehrBot_newsfeed")) {
    $("#neuigkeitenfeed a[title^='Neuigkeiten:']").each(function() {
   var link = $(this)
   var name = link.attr('href').slice(18);

   var news_id = link.attr('href').slice(-14);
var news_id_day    = news_id.slice(6, 8);
var news_id_month  = news_id.slice(4, 6);
var news_id_year   = news_id.slice(0, 4);
var news_id_hour   = news_id.slice(8, 10);
var news_id_minute = news_id.slice(10, 12);


   var div = $('<div id="news_id" ></div>').hide().text(name)

   $(this).after(div)
   div.load("http://de.fanfictions.wikia.com/wiki/Neuigkeiten:" + name + "?action=render", null, function() {
    var box = $(this).find('.neuigkeiten-nachricht')
    if(!box.length) {  } else { 

if($("body").hasClass("mainpage")) {
s_name = name.slice(0, -15);
/* add umlauts to this list */
s_name_noUs = 
s_name.replace(/_/g, ' ')
.replace(/%C3%BC/g, 'ü')
.replace(/%C3%A4/g, 'ä')
.replace(/%3F/g, '?')
.replace('%E1%8F%96%E1%8F%82%E1%8F%8B %E1%8F%95%E1%8F%96%E1%8E%A7%E1%8F%92%E1%8E%A9 %E1%8E%A7%E1%8E%A6 %E1%8F%97%E1%8E%A5', 'The Story of Ai');

//alert(s_name); 

link.replaceWith(box); 
box.attr("news-id", news_id); 
box.append('<div><small><a class="checkForUnderscores" href="http://de.fanfictions.wikia.com/wiki/Neuigkeiten:' + s_name + '" target="_blank">Weitere Neuigkeiten</a> - <small>'
+ '<span class="timestamp">' + news_id_day + '.' + news_id_month + '.' + news_id_year + ', ' + news_id_hour + ':' + news_id_minute + '</span>' 
+ '</small></small></div>');
box.wrapInner('<div class="update-text" style="padding: 5px 10px;"></div>');
box.prepend('<h4 style="font-weight: bold; margin-top: 0; float: left;"><a href="/wiki/Geschichte:' + s_name + '" class="checkForUnderscores" style="background: rgba(255, 255, 255, 0.5); padding: 0px 8px; text-align: center;">' + s_name_noUs +  '</a></h4><div class="author-view" style="float: left; display: none;">&nbsp;<a b href="http://de.fanfictions.wikia.com/wiki/Neuigkeiten:' + name + '" target="_blank">Neuigkeit bearbeiten</a></div><div style="clear: both;"></div>');

box.css('padding', '0');

box.unwrap(); 

} else {
link.replaceWith(box); 
box.attr("news-id", news_id); 
/* box.append('<div><small><small>'
+ '<span class="timestamp">' + news_id_day + '.' + news_id_month + '.' + news_id_year + ', ' + news_id_hour + ':' + news_id_minute + '</span>' 
+ '</small></small></div>');
*/
box.wrapInner('<div class="update-text" style="padding: 5px 10px;"></div>');
box.prepend('<h4 style="font-weight: bold; margin-top: 0; float: left;">Neuigkeit vom ' + news_id_day + '.' + news_id_month + '.' + news_id_year + ', ' + news_id_hour + ':' + news_id_minute + '</h4><div class="author-view" style="float: left; display: none;">&nbsp;<a b href="http://de.fanfictions.wikia.com/wiki/Neuigkeiten:' + name + '" target="_blank">Neuigkeit bearbeiten</a></div><div style="clear: both;"></div>');

box.css('padding', '0');


if ($("body").hasClass("page-Neuigkeiten_Übersicht")) {

} else {
box.unwrap(); 
}
}
}
    $(this).remove()
/*setTimeout(function() {
npp_loaded = 1;
}, 5000);*/
	});
  });
npp_loaded = 0;
}

if (wgUserGroups.indexOf("sysop") == "1" || wgUserName == autor1 || wgUserName == autor2 || wgUserName == autor3) {
if (skin === "monobook") {
pagenamePiped = wgPageName.slice(11); // extract "Geschichte:"
    var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            var d = today.getDate();
            var mo = today.getMonth()+1;
            var y = today.getFullYear();
             if(s<10){
                 s = "0"+s;
             } if(m<10){
                 m = "0"+m;
             } if(d<10){
                 d = "0"+d;
             } if(mo<10){
                 mo = "0"+mo;
             }
             if(h<10){
                 h = "0"+h;
             }
             posttime = y+mo+d+h+m+s;


$("#aktuelles .button").removeAttr("onclick");
$("#aktuelles .button").attr('href', _nnp_tr.server + '/wiki/Neuigkeiten:' + encodeURIComponent(pagenamePiped) + '/' + posttime  + '?action=edit&preload=Vorlage:Neuigkeit_hinzufügen_preload' +  '&summary=Neuigkeit hinzugefügt');
}
} else {
$("h2#aktuelles a").remove();
$("h2#aktuelles .button").remove();
}
/*
setTimeout(function(){
if (npp_loaded === 1) { } else {
if (wgUserName === autor1 || wgUserName === autor2 || wgUserName === autor3 || wgUserName === "MehrBot") {
alert("hello");
} else { 
}
}, 6000);
*/

// new flow 2015: falls neuigkeitenseite noch nicht existiert, erstelle sie über knopfdruck.
if ($("body").hasClass("ns-112")) {
importScriptPage("MediaWiki:ApiKey.js", "translators");

$.get( "http://de.fanfictions.wikia.com/wiki/Neuigkeiten:" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_neuigkeiten = "vorhanden";
			console.log("neuigkeiten existiert");
			
		})
		.fail(function () {
			awk_neuigkeiten = "fehlt";
			console.log("awk neuigkeiten existiert nicht");
			$("a.new[href*='Neuigkeiten:']").removeAttr("href").attr('onclick', 'neuigkeitenUebersicht()').text('Neuigkeiten-Feed freischalten').addClass("button").removeClass("new");

			$("#addNews").remove();

		
	});

function neuigkeitenUebersicht() {
// post to wiki
importScriptPage("MediaWiki:Posttime.js", "de.fanfictions");

	var url_neuigkeiten = _api.server + '/api.php?action=edit&title=Neuigkeiten:' + encodeURIComponent(wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '')) + '&text=' + encodeURIComponent("{{Geschichten-Neuigkeitenmodul/Neuigkeitenübersicht}}") + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Neuigkeitenseite erstellt' + isBot;
 
	var url_neuigkeiten_post = _api.server + '/api.php?action=edit&title=Neuigkeiten:' + encodeURIComponent(wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "/" + posttime) + '&text=' + encodeURIComponent('{{Neuigkeiten-Nav}}<div class="neuigkeiten-nachricht">' + encodeURIComponent(wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '')) + ' wurde gestartet!') + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Neuigkeit hinzugefügt';
 
	setTimeout(function() {
	
		$.post(url_neuigkeiten_post, function () {
    	    setTimeout(function () {
//        		window.location.reload();
       		}, 1000);
    	});
	}, 1250);

	setTimeout(function() {
	
		$.post(url_neuigkeiten, function () {
    	    setTimeout(function () {
        		window.location.reload();
       		}, 1000);
    	});
	}, 2500);
}
}