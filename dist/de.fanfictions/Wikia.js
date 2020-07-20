importScriptPage('MediaWiki:TemplatedValues.js', 'de.fanfictions');
if ( wgUserName == "MehrBot" ) {
var isBot = '&bot=1';
} else {
var isBot = '';
}

/* adventskalender 2014
var advent = "geladen";
$('ul.nav').append('<li class="nav-item"><a href="http://bit.ly/1ysTUZr">Adventskalender 2014</a></li>');
*/

$(".afw8-charaktertabelle td").parent().css("background", "rgb(240, 230, 200)");	
$(".afw8-charaktertabelle td").parent().css("opacity", "0.8");	
$(".afw8-charaktertabelle td b").parent().parent().css("background", "rgb(255, 240, 160)");
$(".afw8-charaktertabelle td b").parent().parent().css("opacity", "1");

function hideAfW8Gone() {
$(".afw8-charaktertabelle td").parent().fadeOut();	
setTimeout(function () {
$(".afw8-charaktertabelle td b").parent().parent().fadeIn();
}, 100);
}

function showAfW8Gone() {
$(".afw8-charaktertabelle td").parent().fadeIn();	
}

$(".afw8-charaktertabelle").before('<a onclick="hideAfW8Gone()" class="button">Zeige nur Charaktere, die noch dabei sind</a>&nbsp;<a onclick="showAfW8Gone()" class="button">Zeige alle Charaktere</a>');


$(document).ready(function() {
setTimeout(function(){
// only executes if name defined or sysop. define autors
if ($("body").hasClass("ns-112")) {

if ($("*").hasClass("autor1")) {
autor1 = $("*").find('.autor1').text();
} else {
autor1 = "undefined"
}
if ($("*").hasClass("autor2")) {
autor2 = $("*").find('.autor2').text();
} else {
autor2 = "undefined"
}
if ($("*").hasClass("autor3")) {
autor3 = $("*").find('.autor3').text();
} else {
autor3 = "undefined"
}

if (wgUserGroups.indexOf("sysop") == "1" || wgUserName == autor1 || wgUserName == autor2 || wgUserName == autor3) {
//$("body").css("background", "green");
importScriptPage('MediaWiki:AddNewChapterToPage.js', 'de.fanfictions');
} else { }
$(".vorlage-kapitel-link").parent().parent().addClass("multicolumn");
setTimeout(function() {
$(".multicolumn").after('<div style="clear: both;"></div>');
}, 1000);
}
}, 500);

/* full width banner */
if (wgPageName === "MeerUndMehr") {
href_aktiv = $('a[title="Aktiv-Fanfiction"]').attr("href");
$('a[title="Aktiv-Fanfiction"]').parent().wrap('<a href="' + href_aktiv + '"></a>');

href_neu = $('a[title="Neu-Fanfiction"]').attr("href");
$('a[title="Neu-Fanfiction"]').parent().wrap('<a href="' + href_neu + '"></a>');

href_vorgestellt = $('a[title="Vorgestellt-Fanfiction"]').attr("href");
$('a[title="Vorgestellt-Fanfiction"]').parent().wrap('<a href="' + href_vorgestellt + '"></a>');
}

setTimeout(function(){
importScriptPage('MediaWiki:NeuesKapitel.js', 'de.fanfictions');
importScriptPage('MediaWiki:AutorenWerkzeugkasten.js', 'de.fanfictions'); // test
importScriptPage('MediaWiki:StoryCardPortal.js', 'de.fanfictions');
importScriptPage('MediaWiki:LoadStoryNav.js', 'de.fanfictions');
}, 500);

importScriptPage('MediaWiki:NeueGeschichte2015.js', 'de.fanfictions');
});

$(document).ready(function() {
// bgs
// removing for winter importScriptPage('MediaWiki:PageBackgroundMagic.js', 'de.fanfictions');
// rail stuff
                        setTimeout(function() {

$(".msg a[href^='http://fanfictions']").parent().parent().remove();

        if ($('#WikiaRail section').length > 0) {


                $('#WikiaRail section.module:last').after('<section style="padding: 5px 10px; margin-bottom: 10px; border:1px solid #CCCC77;" class="module" id="twittermodule"><a class="twitter-timeline"  href="https://twitter.com/meerundmehrwiki" data-chrome="transparent" data-widget-id="511806078380564481"  data-theme="light"  data-dnt="true  width="300"  height="250">Tweets von @MeerUndMehrWiki</a></section>' +

// youtube hörspiel - alarm für waddle 8 s23

'<section class="module" id="youtube-hoerspiel" style="padding-left: 0; padding-right: 0;"><div style="padding-left: 15px; padding-right: 15px"><h1 style="margin-bottom: 10px;">Die neusten Fanfiction-Hörspiele</h1>Aktuell: Alarm für Waddle 8. Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div><iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="//www.youtube-nocookie.com/embed/videoseries?list=PLBEW5wVWavkmwH1ZpPMiNxfZsEE5Y5PKU" frameborder="0" allowfullscreen></iframe></section');


$('#youtube-hoerspiel > div').html('<h1 style="margin-bottom: 10px;">Anhören: Digimon Adventure 3!</h1>Aktuell: Niederschwäbeln. Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div>')
$('#youtube-hoerspiel > iframe').replaceWith('<iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="https://www.youtube.com/embed/videoseries?list=PLBEW5wVWavknWChY2mWmpC2coIUT43j7b" frameborder="0" allowfullscreen></iframe></section>'); /* only works if not closed? */


$("#WikiaRail > section:nth-child(2)").before('<section style-="padding: 0;" class="module" id="social"><h3 style="font-size: 16px;">Folge Fanfiction Writing Wiki auf...</h3><table style="width: 50%; text-align: center; margin: 10px auto 0px;"><tr><td style="width: 33%;"><a href="http://twitter.com/meerundmehrwiki"><img src="http://mpb4848.com/ffv//images/b/be/Twitter_button.png" width="29" height="29"></a><td style="width: 33%;"><a href="http://facebook.com/meerundmehr"><img src="http://mpb4848.com/ffv//images/c/cb/Fb_button.png" width="29" height="29"></a></td><td><a href="http://youtube.com/meerundmehrwiki"><img src="http://mpb4848.com/ffv//images/5/59/Youtube_icon.png"></a></td></tr></table></section>');

//for later
$("div#writeyourstory").parent().detach().prependTo("#WikiaRail");
//fix order
$("#WikiaRail form").detach().prependTo("#WikiaRail");

}                        
//twitter code
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
setTimeout(function() {
twttr.widgets.load();
setTimeout(function() {
// custom twitter feeds

if (wgPageName.indexOf("Alarm_für_Waddle_8") >= 0 || wgPageName.indexOf("AfW8") >= 0) {
                $('#twittermodule').html('<a class="twitter-timeline"  href="https://twitter.com/mum_afw8" data-chrome="transparent" data-widget-id="422333692158029824"  data-theme="light"  data-dnt="true  width="300"  height="400">Tweets von @mum_afw8</a>');

twttr.widgets.load();
}


if (wgPageName.indexOf("Flat_Share_Society") >= 0 || wgPageName.indexOf("FSS") >= 0) {
                $('#twittermodule').html('<a class="twitter-timeline"  href="https://twitter.com/mum_fss" data-chrome="transparent" data-widget-id="520559489133473792"  data-theme="light"  data-dnt="true  width="300"  height="400">Tweets von @mum_fss</a>');

twttr.widgets.load();
}


if (wgPageName.indexOf("Traumland_Trisaster") >= 0 || wgPageName.indexOf("(TT)") >= 0) {
                $('#twittermodule').html('<a class="twitter-timeline"  href="https://twitter.com/mum_tt" data-chrome="transparent" data-widget-id="520560163116183552"  data-theme="light"  data-dnt="true  width="300"  height="400">Tweets von @mum_tt</a>');

twttr.widgets.load();
}

if (wgPageName.indexOf("Digimon") >= 0 || $('#geschichtenthema').text().indexOf("Digimon") >= 0) {
                $('#twittermodule').html('<a class="twitter-timeline"  href="https://twitter.com/mum_digimon" data-chrome="transparent" data-widget-id="569153214965362688"  data-theme="light"  data-dnt="true  width="300"  height="400">Tweets von @mum_digimon</a>');

twttr.widgets.load();
}

importScriptPage('Vorlage:MainpageScript', 'de.fanfictions');

/* custom videos */
setTimeout(function() {

/* DIGIMON ADVENTURE 3, DA3 */
if (wgPageName.indexOf("Digimon_Adventure_3") >= 0 || wgPageName.indexOf("DA3") >= 0) {

$('#youtube-hoerspiel > div').html('<h1 style="margin-bottom: 10px;">Anhören: Digimon Adventure 3!</h1>Aktuell: Niederschwäbeln. Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div>')
$('#youtube-hoerspiel > iframe').replaceWith('<iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="https://www.youtube.com/embed/videoseries?list=PLBEW5wVWavkmlxQJZ8ActmX_Nm7rSEFpC" frameborder="0" allowfullscreen></iframe>');                

$('#social.module').before($('#youtube-hoerspiel').detach());
}



/* REISE EINES HELDEN, ReH */
if (wgPageName.indexOf("Reise_eines_Helden") >= 0 || wgPageName.indexOf("ReH") >= 0) {

$('#youtube-hoerspiel > div').html('<h1 style="margin-bottom: 10px;">Anhören: Reise eines Helden!</h1>Aktuell: Nitzudan liest. Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div>')
$('#youtube-hoerspiel > iframe').replaceWith('<iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="https://www.youtube.com/embed/videoseries?list=PLBEW5wVWavknG8cDecaqUusj142uqxCM2" frameborder="0" allowfullscreen></iframe>');                

$('#social.module').before($('#youtube-hoerspiel').detach());
}


/* FLAT SHARE SOCIETY, FSS, FSS2 */
if (wgPageName.indexOf("Flat_Share_Society_-_Die_Chaostage") >= 0 || wgPageName.indexOf("FSS") >= 0) {

$('#youtube-hoerspiel > div').html('<h1 style="margin-bottom: 10px;">Anhören: Flat Share Society!</h1>Aktuell: Hörspiel. Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div>')
$('#youtube-hoerspiel > iframe').replaceWith('<iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="https://www.youtube.com/embed/videoseries?list=PLBEW5wVWavkmKVZMQpEIINn24CKKnR8xs" frameborder="0" allowfullscreen></iframe>');                

$('#social.module').before($('#youtube-hoerspiel').detach());
}



/* ALLE ANDEREN DIGIMON-GESCHICHTEN */
if (wgPageName.indexOf("Digimon") >= 0 || $('#geschichtenthema').text().indexOf("Digimon") >= 0) {


$('#youtube-hoerspiel > div').html('<h1 style="margin-bottom: 10px;">Anhören: Digimon Adventure 3!</h1>Aktuell: Niederschwäbeln. Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div>')
$('#youtube-hoerspiel > iframe').replaceWith('<iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="https://www.youtube.com/embed/videoseries?list=PLBEW5wVWavkmlxQJZ8ActmX_Nm7rSEFpC" frameborder="0" allowfullscreen></iframe>');                

$('#social.module').before($('#youtube-hoerspiel').detach());

}


/* ALLE ANDEREN ONE PIECE-GESCHICHTEN */
if (wgPageName.indexOf("One Piece") >= 0 || $('#geschichtenthema').text().indexOf("One Piece") >= 0) {

$('#youtube-hoerspiel > div').html('<h1 style="margin-bottom: 10px;">Anhören: Reise eines Helden!</h1>Aktuell: Nitzudan liest die <b>One Piece-Fanfiction</b> "Reise eines Helden"! Schau auch im <a asdf href="/wiki/Portal:Hörspiele">Portal Hörspiele vorbei</a>, wenn du mehr Hörspiele hören möchtest!</div>')
$('#youtube-hoerspiel > iframe').replaceWith('<iframe width="279" height="158" style="margin-left: 10px; margin-top: 10px; margin-bottom: -5px;" src="https://www.youtube.com/embed/videoseries?list=PLBEW5wVWavknG8cDecaqUusj142uqxCM2" frameborder="0" allowfullscreen></iframe>');                

$('#social.module').before($('#youtube-hoerspiel').detach());

}

/* end custom videos */
}, 500);
/* ^ end custom videos */

}, 500);
}, 1000);

                                              },500);
});

/*if ($("body").hasClass("mainpage")) {
$(".rcs-container:first-child").prepend('<div class="bluelink mainpage-box plainlinks" style="text-align: center; background-color:#FFE9A0; border:1px solid #CCCC77; font-size: 100%; padding: .3em; padding-left: 10px; text-align: left;"><h3 style="text-align: center;"><h3>Adventskalender 2013</h3><br/>Hattest du heute schon deine Dosis Fanfiction? Ob ja oder nein - schau rein in unseren <a id="ohai" href="http://bit.ly/mum-adv2013-ref-rail">Adventskalender 2013 - mit jeder Menge Fanfiction-Inhalten!</a></h3><div style="clear: both;"></div></div>')
}*/
/* linking background skin */
/*
$('body').bind('click', function(e) { var obj = (e.target ? e.target : e.srcElement); if (obj.tagName != 'BODY') return true; window.location.href = 'http://bit.ly/mum-adventskalender-2012'; return false; });
*/

$("header a[data-id='shareButton']").after('<a href="' + window.location + '?&action=purge"><span style="position: absolute; line-height: normal; top: -1.33em; right: 0px; font-family: monospace;">Lokale Uhrzeit&nbsp;<span id="clock">Uhr wird eingestellt...</span></span></a>');

         function getdate(){
                var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
             if(s<10){
                 s = "0"+s;
             }

            $("#clock").text(h+" : "+m+" : "+s);
            }

setInterval(function() {
    getdate();
}, 1000);

/* genres durchsuchen */
if (wgPageName === "MeerUndMehr:Genre_durchsuchen") {
$(window).ready(function() {
/* works if below is specified */

function searchGenre() {
catIns_category_1 = 'Genre - ' + $("#catIns1 input").val();

catIns_apiURL = 'http://de.fanfictions.wikia.com/api.php?action=query&list=categoryintersection&limit=20&categories=Kategorie:Voller_Geschichtenbalken|Kategorie:' + catIns_category_1 + '&format=json';

$.when( $("body").css("cursor", "progress"), $("#GenreSucheResultate").css("opacity", "0.5")).then($("#GenreSucheResultate").text(""),  $("#GenreSucheResultate").css("opacity", "1") );

setTimeout(function() {
$.ajax({
    url: catIns_apiURL,
    dataType: 'json',
    success: function(data){

$.each(data.query.categoryintersection, function(index, value) {
   $("#GenreSucheResultate").append('<li><a href="http://de.fanfictions.wikia.com/wiki/' + value.title + '">' + value.title.slice(11) + '</a></li>');
});

$("body").css("cursor", "inherit")

    }
});
}, 1000);
}

/* -------------------- */

$("#inputfield_load").append('<div id="catIns1"><input name="category_1" placeholder="Action, Abenteuer, Fantasy, ...">&nbsp;<a onclick="searchGenre()" class="button">Genre durchsuchen</a></div>');
});
}

$(document).ready(function() {
                        setTimeout(function() {

        if ($('#WikiaRail section').length > 0) {
if (wgPageName === "Spezial:WikiActivity") {
var neuigkeiten_apiurl = "http://de.fanfictions.wikia.com/api.php?action=query&list=categorymembers&cmtitle=Kategorie:Alle_Neuigkeiten&cmsort=timestamp&cmdir=desc&cmnamespace=124&format=json";

neuigkeiten_apidata = '';

$.getJSON(neuigkeiten_apiurl, function(data) {

n_geschichte1 = data.query.categorymembers[0].title;
n_geschichte2 = data.query.categorymembers[1].title;
n_geschichte3 = data.query.categorymembers[2].title;
n_geschichte4 = data.query.categorymembers[3].title;

setTimeout(function() {	
	
	neuigkeiten_apidata = '<a href="http://de.fanfictions.wikia.com/wiki/'+ n_geschichte1 + '">' + n_geschichte1 + '</a><br><br><a href="http://de.fanfictions.wikia.com/wiki/'+ n_geschichte2 + '">' + n_geschichte2 + '</a><br><br><a href="http://de.fanfictions.wikia.com/wiki/'+ n_geschichte3 + '">' + n_geschichte3 + '</a><br><br><a href="http://de.fanfictions.wikia.com/wiki/'+ n_geschichte4 + '">' + n_geschichte4 + '</a>';
});
setTimeout(function() {
$("#geschichten-neuigkeiten-content").append(neuigkeiten_apidata);
}, 1000);
}, 5000);

$(".CommunityCornerModule").before('<section class="GeschichtenNeuigkeiten module"><h2 class="dark_text_2">Geschichten-Neuigkeiten</h2><div id="geschichten-neuigkeiten-content">' + neuigkeiten_apidata + '</div></section>');
}

}                        
                                              },500);
});

if ($("body").hasClass("ns-112")) {

$(document).ready(function() {
$(".ns-112 #storyfooter a[href*='Portal:'].new").each(function() {

link_alt = $(this).attr("href");

link_split = link_alt.replace(/\?(.*)/g, '');

link_final = link_split + '?action=edit&preload=Vorlage:Portal-preload&summary=Portal hinzugefügt';

$(this).attr("href", link_final);

});
});

}

/* VE info - because its broken */
$(document).ready(function() {
                 setTimeout(function() {

        if ($('#WikiaRail section').length > 0) {

if ($("html").hasClass("ve-activated") && wgNamespaceNumber === 112 ) {
baseurl = 'http://de.fanfictions.wikia.com/wiki/' + wgPageName;
finalurl = baseurl.replace(/\?(.*)/g, '') + "?action=edit&useeditor=monobook";

$("#WikiaPageHeader").after('<div class="mainpage-box" style="background: orange; padding: 20px; font-size: 20px;">Der VisualEditor funktioniert hier nicht richtig. Wir empfehlen daher, temporär <a href="' + finalurl + '">in den Wikitext-Modus zu wechseln für die Bearbeitung dieser Seite</a>.</div>');
}

}                        
   
// portal banners href link                   
$(".portalBanner > div > div > a").each(function() {
href = $(this).attr("href");

$(this).parent().parent().wrap('<a href="' + href + '"></a>');
});
                                              },1500);

});

/* patch fix */
if ($("#geschichten-navigation").length > 0) {
$(document).ready(function() {

setTimeout(function() {
$("#empty_div_nav").remove();
},4500);

});
}

$(window).ready(function () {
if ($("body").hasClass('mainpage') || $('body').hasClass('ns-4')) {

setTimeout(function() {

	$('div[id*="portal-"]').each(function () {

		portal = $(this).attr('id');
		link_url = $(this).find("a").attr('href');

		portalImgURL = $(this).find('.portalBanner_image img').attr('src');
		portalImgURL2 = $("#portal-" + portal + " img").attr('src');
	
		$(this)
		.css('background-image', 'url( ' + portalImgURL + ')')
		.css('background-position', '-70px center')
		.css('background-repeat', 'no-repeat');

		$(this).find("h2").css('padding-left', '60px');

		$(this).find(".portaldiv").wrap('<a href="' + link_url + '"></a>');
		
	});

}, 1000);

}

});

$(window).ready(function () {

     $('div[data-type="5"]').prepend('Hinweis: Dies ist eine Nachricht, die nicht von ' + wgSiteName + ' stammt und dich auf eine andere Seite von Wikia leitet.<hr>');

if (wgPageName === "MeerUndMehr") {
$("table#mainpage-button-top tr:nth-child(2)").slideUp();
}

});

if (wgPageName === "MeerUndMehr") {
$("table#mainpage-button-top tr:nth-child(2)").slideUp();

$("table#mainpage-button-top tr:nth-child(2)").after('<tr><td style="background: #222; font-size: 300%"><div style="transform: rotate(90deg)">›</div></td><td style="background: #222; font-size: 300%"><div style="transform: rotate(90deg)">›</div></td><td style="background: #222; font-size: 300%"><div style="transform: rotate(90deg)">›</div></td></tr>');

$("table#mainpage-button-top")

.mouseenter(function() {
	$("table#mainpage-button-top tr:nth-child(2)").fadeIn();
	$("table#mainpage-button-top tr:nth-child(3)").fadeOut();
  })
  /*.mouseleave(function() {
    $("table#mainpage-button-top tr:nth-child(2)").fadeOut();
    $("table#mainpage-button-top tr:nth-child(3)").fadeIn();
  })*/;
}

function loadAllYT() { 
$('.fww-youtube-playlist').each(function() {

$(this).fadeIn();

url = $(this).find('.fww-url').text();
heading = $(this).find('.fww-heading').html();

if (heading === '<h2><span class="mw-headline" id=""></span></h2>') {

$(this).replaceWith('<div class="fww-yt-video"><iframe width="318" height="178" src="https://www.youtube.com/embed/videoseries?list=' + url + '" frameborder="0" allowfullscreen></iframe></div>');

} else {

$(this).replaceWith('<div class="fww-yt-video">' + heading + '<iframe width="318" height="178" src="https://www.youtube.com/embed/videoseries?list=' + url + '" frameborder="0" allowfullscreen></iframe></div>');

}

});
}

$(document).ready(function() {
/* special for mainpage */
$('.page-MeerUndMehr .fww-youtube-playlist, .page-Vorlage_Hauptseite_Lesen .fww-youtube-playlist').each(function() {

_this = $(this);

url = $(_this).find('.fww-url').text();
heading = $(_this).find('.fww-heading').html();

$(_this).replaceWith('<div class="fww-yt-video">' + heading + '<iframe width="298" height="168" src="https://www.youtube.com/embed/videoseries?list=' + url + '" frameborder="0" allowfullscreen></iframe></div>');

$('.fww-yt-video h3').css('min-height', '0');

$('.fww-yt-video iframe').css('margin-left', -10).css('margin-bottom', -22);

});

/* regular */
$('.fww-youtube-playlist').each(function() {
$(this).append('<button class="loadThisYT">Video laden</button>&nbsp;<button onclick="loadAllYT()">Alle Videos laden (ladeintensiv)</button>');
});


$(".loadThisYT").click(function(e) {

_this = $(this).parent();

$(_this).fadeIn();

url = $(_this).find('.fww-url').text();
heading = $(_this).find('.fww-heading').html();

if (heading === '<h2><span class="mw-headline" id=""></span></h2>') {

$(_this).replaceWith('<div class="fww-yt-video"><iframe width="318" height="178" src="https://www.youtube.com/embed/videoseries?list=' + url + '" frameborder="0" allowfullscreen></iframe></div>');

} else {

$(_this).replaceWith('<div class="fww-yt-video">' + heading + '<iframe width="318" height="178" src="https://www.youtube.com/embed/videoseries?list=' + url + '" frameborder="0" allowfullscreen></iframe></div>');

}

});
});
// cache nerv #12