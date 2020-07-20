
function updateCountdowns() {
    var searchCountdown = document.getElementsByClassName('countdown');
    for (var i = 0; i<searchCountdown.length; i++) {
        if (searchCountdown[i].getAttribute("data-date") == null) { continue; }
        var neueZeit = Math.round((new Date(searchCountdown[i].getAttribute("data-date")).getTime() - new Date() ) / 1000);
        if (neueZeit <= 0) {
            var days = 0, hours = 0, minutes = 0, seconds = 0;
        } else {
            var days = Math.floor(neueZeit / 86400);
            var hours = Math.floor((neueZeit - days * 86400) / 3600);
            var minutes = Math.floor((neueZeit - hours * 3600 - days * 86400) / 60);
            var seconds = neueZeit - minutes * 60 - hours * 3600 - days * 86400;
        }
        searchCountdown[i].innerHTML = "<div class='days'><div class='time'>"+days+"</div> <div class='label'>Tage</div></div> <div class='after'>:</div> <div class='hours'><div class='time'>"+hours+"</div> <div class='label'>Stunden</div></div> <div class='after'>:</div> <div class='minutes'><div class='time'>"+minutes+"</div> <div class='label'>Minuten</div></div> <div class='after'>:</div> <div class='seconds'><div class='time'>"+seconds+"</div> <div class='label'>Sekunden</div></div> <div style='clear:both'></div>";
    }
}
 
$(document).ready(function() {
    mediaWiki.loader.using('mediawiki.api', function () {
	var api = new mediaWiki.Api();
	if (skin === 'oasis' && wgAction === 'view' && wgNamespaceNumber > -1) {
		api.get({
			action: 'parse',
			page: 'Vorlage:Modul-Countdown',
			prop: 'text'
		}, {
			ok: function (json) {
				$('#WikiaRail').append('<section class="module modul-countdown">' +  json.parse.text['*'] + '</section>');
			}
		});
	}
    setInterval(updateCountdowns, 1000);
    });
});