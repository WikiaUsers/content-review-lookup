/**************/
/*** Смайли ***/
/**************/
// SpeedEmoticon.js
// Code: KORNiUX
// Additional help: Wildream, Set440, rutes community
// Hosted on "KORNiUX's HUGE SANDBOX WIKI"
importStylesheetURI('http://korniux.wikia.com/wiki/SpeedEmoticon/style.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://vignette.wikia.nocookie.net/starbound/images/6/6f/Catface2.png/revision/latest?cb=20160714140135&path-prefix=ru" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
		$('#poplist').css({				
				top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
				left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
			});
	});
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
	$('#poplist img')	.click(function(){
		var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
			messg = $('.message textarea').val();
		$('.message textarea').val(messg + txt + ' ').focus();
	});
	$('#poplist div').attr('style', '');
	console.log('SpeedEmoticon v1.7')
});
/**************/