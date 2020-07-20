// <nowiki>

function countdown()
{
	var untildate = "1 FEburary 2015 12:59 UTC";
	var newdate = new Date();
	var difference = Date.parse(untildate) - Date.parse(newdate) + newdate.getTimezoneOffset() * 60000;
	var dif = new Date(difference);
	var timeleft = dif.getDate() - 1 + ' days, ' + dif.getHours() + ' hours, ' + dif.getMinutes() + ' minutes, ' + dif.getSeconds() + ' seconds';
	$('.countdowndate').empty().append(timeleft);
	window.clearTimeout(s);
	var s = window.setTimeout(countdown, 1000);
}

var date;

$.ajax({
	url: '/api.php',
	dataType: 'json',
	data: {
		format: 'json',
		action: 'query',
		titles: 'MediaWiki:Communitymessages-notice-msg',
		prop: 'revisions',
		rvprop: 'timestamp',
		indexpageids: true
	},
	success: function(response) {
		var time = response.query.pages[response.query.pageids[0]].revisions[0].timestamp + '';
		date = new Date(time.substring(0,4), time.substring(5,7)-1, time.substring(8, 10), time.substring(11,13), time.substring(14,16), time.substring(17,19), 0);
	}
});


var last = $.cookie('anon_bubble_test');

if(!last && wgUserGroups == null && (wgAction == 'view' || wgAction == 'purge')) {
	$.ajax({
		url: 'http://dcsuper.wikia.com/api.php',
		dataType: 'json',
		data: {
			format: 'json',
			action: 'parse',
 			page: 'MediaWiki:Communitymessages-notice-msg'
		},
		success: function(data) {
		$('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div data-type="2"><a class="sprite close-notification"></a><ul>' + data.parse.text['*'] + '</ul></li></div></ul>').prependTo('footer#WikiaFooter');

		$('#WikiaNotifications').css('position', 'fixed').css('top', 'auto').css('bottom', '20px');

		$('a.sprite.close-notification').click(function() {
			$('#WikiaNotifications').empty();
		});

		$('span small a').attr('href', '#');

		$('#close small a').attr('title', 'Dismiss this message');
		$('#close').click(function() {
			$.cookie('anon_bubble_test', new Date(), {expires: 7});
			$('#WikiaNotifications').empty();
		});
		
		countdown();
    	}
	});
}

// </nowiki>