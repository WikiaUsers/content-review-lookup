/* Important message */
$("#WikiHeader").html($("#WikiHeader").html() + '<table style="padding: 5px; width: 100%; border: 2px solid orange; background-color: yellow;"><tr><td><div align="left" style="text-align: justify; font-face: Tahoma; font-weight: bold;">FIGYELEM!<br><br>A Testvériség tudásának bővítése és az oldal minőségének javítása érdekében kérünk, vegyél részt a wiki cikkszerkesztő projektmunkálataiban, a <a href="http://hu.assassinscreed.wikia.com/wiki/Assassin%27s_Creed_Wiki:Maszj%C3%A1ft%C3%B3l_Firenz%C3%A9ig_projekt_(projektoldal)">Maszjáftól Firenzéig projektben</a> és a <a href="http://hu.assassinscreed.wikia.com/wiki/Assassin%27s_Creed_Wiki:Kenway-kr%C3%B3nik%C3%A1k_projekt_(projektoldal)">Kenway-krónikák projektben</a>! A legsikeresebb szerkesztők felvételt nyerhetnek a wiki <a href="http://hu.assassinscreed.wikia.com/wiki/Kezd%C5%91lap/Vezet%C5%91s%C3%A9g">vezetőségébe</a>.</div></td></tr></table>');

/* Episodes hack */
(function ($) {
function preload(img) {
$('<img/>')[0].src = img;
}
				
		$.fn.onmousepic = function (id, params) {
			$this = $(this);
			$this.append('<img id="hatter' + id + '" src="' + params.hatter + '" width="' + params.szelesseg + '" height="' + params.magassag + '" usemap="#episodes' + id + '" />');
			$this.append('<map id="map' + id + '" name="episodes' + id + '"></map>');
			for (var i = 0; i < params.valtozatok.length; i++) {
				$("#map" + id).append('<area shape="poly" id="kep' + id + i + '" coords="' + params.valtozatok[i].koordinatak.join(',') + '" href="' + params.valtozatok[i].link + '" />');
			}
			$("#map" + id + " > area").mouseover(function () {
				$("#hatter" + id).attr('src', params.valtozatok[$(this).index()].kep);
			}).mouseleave(function () {
				$("#hatter" + id).attr('src', params.hatter);
			});
		};
}(jQuery));
			
// EZT KELL MÓDOSÍTANI:
			
$(document).ready(function () {
function preload(src) {
var img = new Image();
img.src = src;
}
	var data = {
		hatter: 'https://vignette.wikia.nocookie.net/assassinscreed/images/9/96/Mainpage_menu.png/revision/latest?cb=20150728190824&path-prefix=hu',
		szelesseg: 640,
		magassag: 350,
		valtozatok: [{
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/e/ea/M_u_1.png/revision/latest?cb=20150728190820&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/Assassin%27s_Creed',
			koordinatak: [0, 0, 103, 0, 103, 130, 93, 135, 87, 164, 37, 230, 0, 230]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/7/7a/M_u_2.png/revision/latest?cb=20150728190820&path-prefix=hu',
			link: "http://hu.assassinscreed.wikia.com/wiki/Assassin's_Creed_II",
			koordinatak: [104, 0, 210, 0, 213, 124, 196, 125, 200, 204, 211, 231, 122, 230, 119, 173, 104, 132]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/0/06/M_u_3.png/revision/latest?cb=20150728190821&path-prefix=hu',
			link: "http://hu.assassinscreed.wikia.com/wiki/Assassin's_Creed%3A_Brotherhood",
			koordinatak: [214, 0, 316, 0, 318, 230, 230, 230]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/5/51/M_u_4.png/revision/latest?cb=20150728190821&path-prefix=hu',
			link: "http://hu.assassinscreed.wikia.com/wiki/Assassin's_Creed%3A_Revelations",
			koordinatak: [319, 0, 422, 0, 418, 230, 350, 232, 331, 117, 319, 107]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/0/03/M_u_5.png/revision/latest?cb=20150728190821&path-prefix=hu',
			link: "http://hu.assassinscreed.wikia.com/wiki/Assassin's_Creed_III",
			koordinatak: [425, 0, 528, 0, 528, 154, 493, 197, 492, 230, 446, 230, 425, 133]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/2/27/M_u_6.png/revision/latest?cb=20150728190822&path-prefix=hu',
			link: "http://hu.assassinscreed.wikia.com/wiki/Assassin's_Creed_IV%3A_Black_Flag",
			koordinatak: [532, 0, 640, 0, 640, 200, 612, 200, 612, 230, 550, 230, 530, 158]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/d/d7/M_u_7.png/revision/latest?cb=20150728190822&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/Kezd%C5%91lap/Vezet%C5%91s%C3%A9g',
			koordinatak: [0, 232, 125, 232, 125, 350, 0, 350]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/9/90/M_u_8.png/revision/latest?cb=20150728190822&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/Kezd%C5%91lap/Alapok',
			koordinatak: [126, 232, 254, 230, 254, 350, 130, 350]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/9/91/M_u_9.png/revision/latest?cb=20150728190823&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/Kezd%C5%91lap/Chat',
			koordinatak: [257, 232, 383, 232, 383, 350, 255, 350]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/a/a6/M_u_10.png/revision/latest?cb=20150728190823&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/Kezd%C5%91lap/K%C3%B6z%C3%B6ss%C3%A9gi_munka',
			koordinatak: [385, 230, 512, 230, 512, 350, 385, 350]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/7/7e/M_u_11.png/revision/latest?cb=20150728190823&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/FANszekci%C3%B3%3AKezd%C5%91lap',
			koordinatak: [514, 230, 640, 230, 640, 350, 514, 350]
		}, {
			kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/3/3e/M_u_12.png/revision/latest?cb=20150728190824&path-prefix=hu',
			link: 'http://hu.assassinscreed.wikia.com/wiki/Kezd%C5%91lap/Assassin%27s_Creed_sorozat',
			koordinatak: [614, 207, 631, 207, 631, 225, 614, 225]
		}]
	};
var data2 ={
					hatter: 'https://vignette.wikia.nocookie.net/assassinscreed/images/4/42/Under_above_menu_v2.png/revision/latest?cb=20150727213202&path-prefix=hu',
					szelesseg: 640,
					magassag: 80,
					valtozatok: [
						{
							kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/1/1a/U_a_m_1_v2.png/revision/latest?cb=20150727213202&path-prefix=hu',
							link: 'http://hu.assassinscreed.wikia.com/wiki/Assassin%27s_Creed:_Unity',
							koordinatak: [ 0, 0, 0, 80, 213, 80, 213, 0]
						},
						{
							kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/1/19/U_a_m_2_v2.png/revision/latest?cb=20150727213202&path-prefix=hu',
							link: "http://hu.assassinscreed.wikia.com/wiki/Assassin%27s_Creed:_Syndicate",
							koordinatak: [ 213, 0, 213, 80, 440, 80, 440, 0]
						},
						{
							kep: 'https://vignette.wikia.nocookie.net/assassinscreed/images/b/b7/U_a_m_3_v2.png/revision/latest?cb=20150727213202&path-prefix=hu',
							link: "http://hu.assassinscreed.wikia.com/wiki/Assassin%27s_Creed:_Rogue",
							koordinatak: [ 440, 0, 440, 80, 640, 80, 640, 0]
						}
					]
				};
	data.valtozatok.forEach(function (i) {
		preload(i.kep);
	});
	data2.valtozatok.forEach(function (i) {
		preload(i.kep);
	});
	$("#episodes-main-page").onmousepic(28,data);
$("#episodes-main-page-new").onmousepic(29,data2);
});

/* Szerkesztői javascript */

$(function() {
var rights = {};
 
rights["Rodrigo Borgia"]      = ["Il Mentore"];
rights["NikitaDragovich"]           = ["Bürokrata"];
rights["Ezio Borgia"]           = ["Bürokrata"];
rights["Csermely Attila"]           = ["Templomos Nagymester"];
rights["Erődi Gergely"]           = ["Rafik"];

if (wgPageName.indexOf("Special:Contributions") != -1){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
userName.replace("User:", "");
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.tag').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});

/* Show/hide */

$(document).ready(function() {
$(".mutat").click(function() {
if ($(this).text() == "Mutat") {
$(this).text("Elrejt");
$(".titok").show();
} else if ($(this).text() == "Elrejt") {
$(this).text("Mutat");
$(".titok").hide();
}
});
});


/* Szerkesztői gombok */

if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/assassinscreed/hu/images/7/77/Button_információ.png",
		"speedTip": "Információs sablon beszúrása",
		"tagOpen": "{{Információ\n",
		"tagClose": "}}",
		"sampleText": "|leírás =\n|forrás =\n|szerző =\n|engedély =\n"
	};
}