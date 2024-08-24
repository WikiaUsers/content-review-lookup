/* Any JavaScript here will be loaded for all users on every page load. */

// TimeCircles - funcionamiento y diseño
 
var timeCrirclesDivs = document.getElementsByClassName("TimeCirclesDiv");
 
for (var i = 0; i < timeCrirclesDivs.length; i++) {
	var dateTime = timeCrirclesDivs[i].innerHTML.substring(1).split("]")[0];
 
	var width = "100%";
 
	var height = Math.round(timeCrirclesDivs[i].offsetWidth / 4) + "px";
 
	timeCrirclesDivs[i].innerHTML = '<iframe scrolling="no" src="http://spongebobia.com/ESB/TimeCircle/TimeCirclesImport.php?dateTime=' + dateTime + '" style="width:' + width + '; height:' + height + ';"></iframe>'; 
}
 
$("#TimeCirclesDiv").TimeCircles({
    "animation": "smooth",
    "bg_width": 1.2,
    "fg_width": 0.1,
    "circle_bg_color": "#60686F",
    "time": {
        "Days": {
            "text": "Días",
            "color": "#FFCC66",
            "show": true
        },
        "Hours": {
            "text": "Horas",
            "color": "#99CCFF",
            "show": true
        },
        "Minutes": {
            "text": "Minutos",
            "color": "#BBFFBB",
            "show": true
        },
        "Seconds": {
            "text": "Segundos",
            "color": "#FF9999",
            "show": true
        }
    }
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
//Fondo cambiante al recargar o cambiar de pagina By BranDaniMB
var wallpaper = ["http://i.imgur.com/3vOG9ey.jpg","http://i.imgur.com/ZlTlSMS.jpg","http://i.imgur.com/ud9ZItU.jpg","http://i.imgur.com/PNwsJNF.jpg","http://i.imgur.com/nOjnD89.jpg","http://i.imgur.com/Va7wiR0.jpg","http://i.imgur.com/mTs4Qsw.jpg","http://i.imgur.com/YW2jhVD.jpg","http://i.imgur.com/qkm8EJN.jpg","http://i.imgur.com/f5ZeirT.jpg"];
var min = 0;
var max = 10;
var number = Math.floor(Math.random() * (max - min)) + min;
var background = wallpaper[number];
$(".mediawiki").css("background-image", "url('"+ background +"')");
$(".mediawiki").css("background-color", "#000");
$(".mediawiki").css("background-size", "100%");
$(".mediawiki").css("background-attachment", "fixed");
$(".mediawiki").css("background-repeat", "no-repeat");