/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SyntaxHighlight.js',
    ]
});

/* Чтобы был виден участникам их собственный ник */
 
$(function() {
	if ( !wgUserName ) return;
	$('.insertusername').text(wgUserName);
});

/* Для плашки неактивным */
window.InactiveUsers = { 
    months: 1,
    text: 'В вики отпуске'
};

/* Календарь */
var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var date = new Date();
var currentMonth = date.getMonth();
var currentDay = date.getDate() - 1;
var viewMonth = currentMonth;
 
function initCalendar() {
    // Parse month and day, not implemented
    loadMonth(currentMonth);
}
 
function loadMonth(month) {
    $('#cal #month').text(months[month]);
    var newMonth = '';
    for (var i = 0; i < days[month]; i++) {
        var classes = (month == currentMonth && i == currentDay) ? "day current" : "day";
        newMonth = newMonth + '<a href="/ru/wiki/Русская Литература вики:Календарь/' + months[month] + '/' + (i+1) + '"><div class="' + classes + '">' + (i+1) + '</div></a>';
    }
    $('#cal #cal-frame').fadeOut('fast', function() {
        $('#cal #cal-frame').html(newMonth).fadeIn('fast');
    });
    viewMonth = month;
}
 
$(document).ready(function() {
    initCalendar();
    $('#cal #prev').click(function() {
        loadMonth((viewMonth - 1 + 12) % 12);
    });
    $('#cal #next').click(function() {
        loadMonth((viewMonth + 1) % 12);
    });
});