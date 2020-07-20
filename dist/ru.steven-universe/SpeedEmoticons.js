if(wgCanonicalSpecialPageName == 'Chat') {
$('.Write').append('<div id="SmilesMod"><img src="https://images.wikia.nocookie.net/central/images/a/ac/Emoticon_laughing.png" style="border: none !important;"/></div>');
$('#SmilesMod').append('<div id="poplist"></div>')
	.css({
	  	display: 'inline-block',
 		textAlign: 'center',
 		position: 'absolute',
 		top: '-23px',
 		right: '40px',
 		cursor: 'pointer',
 		width: 30,
 		height: 30,
 		zIndex: 10000
	})
	.mouseenter(function(){
		$('#poplist')
			.fadeIn(200)
			.css({				
				top: ($('#SmilesMod').offset().top - $('#poplist').height() - 8),
				left: ($('#SmilesMod').offset().left - $('#poplist').width() - 8)
			});
	})
	.mouseleave(function(){
		$('#poplist').fadeOut(400);
	});
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
	$('#poplist img').css('cssText','display: inline-block; height: 19px; position: relative !important; border: none !important;')
	.click(function(){
		var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
			messg = $('.message textarea').val();
		$('.message textarea').val(messg + txt + ' ').focus();
	});
	$('#poplist div').attr('style', '');
	$('#poplist ul li > ul').hide();
	$('#poplist ul > li').css('display','inline-block');
})
	.css({
		position: 'fixed',
		display: 'none',
		background: 'rgba(0,0,0,0.8)',
		width: '225px',
		maxHeight: '320px',
		zIndex: '10001',
		overflowX: 'hidden',
		overflowy: 'auto',
		lineHeight: '16px',
		padding: '14px',
		borderRadius: '5px'
});
}
//