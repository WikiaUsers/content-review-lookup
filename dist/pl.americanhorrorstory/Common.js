/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Nieaktywny użytkownik */
window.InactiveUsers = { text: 'Nieaktywny' };

/* Licznik by Nanaki */
function getTimeCountText(time) {
    amount = Math.floor((time - new Date().getTime())/1000);
    if(amount < 0) return false;
 
    var days = Math.floor(amount / 86400);
    amount = amount % 86400;
    var hours = Math.floor(amount / 3600);
    amount = amount % 3600;
    var mins = Math.floor(amount / 60);
    amount = amount % 60;
    var secs = Math.floor(amount);
 
    var list = [];
    if (days > 0) {
        list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
    }
    if (hours > 0) {
        list.push('<span span="hours">' + hours + ' h</span>');
    }
    list.push('<span span="minutes">' + mins + ' m</span>');
    list.push('<span span="seconds">' + secs + ' s</span>');
 
    return list.join(' ');
}

function countBoxTick(box) {
    console.log(this);
    var time = box.data('time');
    var res = getTimeCountText(time);
    if(res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box);
        }, 1000);
    } else {
        box.html('Oczekuj!');
    }
}

$('.countbox').each(function() {
    if($(this).data('date')) {
        var time = new Date($(this).data('date')).getTime();
        if(!isNaN(time)) {
            $(this).data('time', time);
            countBoxTick($(this));
        } else {
            $(this).html('Niepoprawna data');
        }
    }
});

/* Ostrzeżenie o braku licencji */
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() === '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true;
		return false;
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});