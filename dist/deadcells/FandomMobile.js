$(function() {
	$.when( 
		$('.spoiler').each(function() {
			var position = $(this).css('position');
			if (!position || (position == 'static')) $(this).css({'position': 'relative'});
			$(this).append(
				$('<div>').append(
					$('<div>', {
						text: ' Spoiler alert!'
					}).prepend(
						$('<img>', {
							'src': 'https://static.wikia.nocookie.net/deadcells_gamepedia_en/images/c/c0/Exclamation.png/revision/latest/scale-to-width-down/15?cb=20210304214608'
						})
					).css({'color': '#d1394e', 'font-weight': 'bold', 'font-size': '20px'}),
					$('<a>', {
						'class': 'spoiler-text',
						href: 'javascript:void(0)',
						text: 'Tap to reveal'
					})
				).css({'position': 'absolute', 'inset': '0px', 'background-color': 'black', 'display': 'flex', 'justify-content': 'center', 'flex-flow': 'column wrap', 'align-items': 'center'})
			);
		})
	).done(function() {
       $('.spoiler-text').click(function() {
			$(this).parent().fadeOut("400", function() {
        		$(this).remove();
    		});
		});
	});
} );