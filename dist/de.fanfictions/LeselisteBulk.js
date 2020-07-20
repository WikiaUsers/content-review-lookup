/* bulk add link - kategorieseite */
// ROUGHLY WORKING - test on http://de.fanfictions.wikia.com/wiki/Kategorie:Alarm_f%C3%BCr_Waddle_8_-_Geschichten
if ($("body").hasClass("ns-14")) {
function checkAllStatus() {
$('.leseopt').trigger('click');
}

$(".WikiaArticle").prepend('<div class="mainpage-box leselistebulk" style="padding: 10px;"><h3 style="margin-top: 0;">Was hast du bereits gelesen?</h3>Mithilfe der Schaltflächen auf dieser Seite kannst du direkt Geschichten zu deiner Leseliste hinzufügen oder entfernen. Klicke die Schaltfläche <span class="button">"LL?"</span> neben der entsprechenden Geschichte, um zu prüfen, ob sich diese Geschichte bereits auf deiner Leseliste befindet. Klicke anschließend auf "LL+", wenn du die Geschichte bereits gelesen hast. <br>Wenn du einen Eintrag wieder entfernen möchtest, nachdem du ihn hinzugefügt hast, klicke erneut auf "LL?" und anschließend auf "LL-", um den Eintrag von deiner Leseliste zu entfernen. Wenn du automatisch alle Schaltflächen prüfen möchtest, klicke die folgende Schaltfläche.<br><a class="button" onclick="checkAllStatus()">Prüfe welche Geschichten bereits auf der Leseliste sind (ladeintensiv)</a></div>');

function usernameChange() {

wgUserName = prompt('Neuer Benutzername', 'MtaÄ');

}

if (wgUserName === "MehrBot") {
$('.leselistebulk').append('&nbsp;<a class="button" onclick="usernameChange()">Change Username</a>');
}

$("a[title*='Geschichte:']").addClass("geschichte");
$("a[title*='Geschichte:']").each(function () {

var ges_name = $(this).text(); 
var ges_name_global = $(this).attr('title');


$(this).attr("data-ges", ges_name);
$(this).attr("data-ges_name_global", ges_name_global);

$(this).text(ges_name);

$(this).wrap('<span class="readwrap"></span>');
$(this).before('<span style="margin-right: 5px;" class="button leseopt" onclick="loadBecauseItDoesntWorkElsewise()">LL?</span>');
 
});

$(".leseopt").click(function() {

$storyB = $(this).parent().find("a[title*='Geschichte:']").attr('data-ges_name_global').replace('Geschichte:', '').replace(/ /g, '_');
/* alert('storyB = ' + $storyB); */

$.ajax({
       type: "GET",
            url: "http://mpb4848.com/mum/leseliste.php?mode=read&story="+$storyB+"&user="+wgUserName,
			context: this, // ohne das kann man das erste this nicht verwenden
        success: function(msg){            

		if(msg == 1){

			//alert($storyB +  " was added");
			$(this).parent().find(".leseopt").css("background", "green");
			$(this).after('&nbsp;<a class="button leseremove">LL-</a><br>');
			
		}
		else {
		// Button einfügen

			//alert($storyB + " not added");
			$(this).parent().find(".leseopt").css("background", "#880").attr("title", "Diese Geschichte ist noch nicht hinzugefügt.");
			$(this).after('&nbsp;<a class="button leseadd">LL+</a><br>');
		}
}
});
	
});

function loadBecauseItDoesntWorkElsewise() {
$(document).on('click', ".leseadd", function() {

story = $(this).parent().find("a[title*='Geschichte:']").attr('data-ges_name_global');

story_underscore = story.replace(/ /g,"_").replace('Geschichte:', '');

/* alert('story =  ' + story + '; story_underscore = ' + story_underscore); */

// Neuen Eintrag anlegen

$.ajax("http://mpb4848.com/mum/leseliste.php?mode=add&user=" + mw.config.get('wgUserName') + '&story='+story_underscore);

//alert("hello?");

$(this).css("background", "green").delay(500).fadeOut("slow");
$(this).parent().find(".leseopt").css("background", "green").attr("title", "Diese Geschichte ist bereits hinzugefügt");

});


$(document).on('click', ".leseremove", function() {

story = $(this).parent().find("a[title*='Geschichte:']").attr('data-ges_name_global');

story_underscore = story.replace(/ /g,"_").replace('Geschichte:', '');

// Neuen Eintrag anlegen

$.ajax("http://mpb4848.com/mum/leseliste.php?mode=remove&user=" + mw.config.get('wgUserName') + '&story='+story_underscore);

// ???

$(this).css("background", "red").delay(500).fadeOut("slow");
$(this).parent().find(".leseopt").css("background", "red").attr("title", "Diese Geschichte ist noch nicht hinzugefügt");

});
}
}