var count=0;
$( '.DropsLineNotes' ).each(function(){
	count++;
	
	var currentMousePos = { x: -1, y: -1 };
	var hoverText = $(this).find( '.notesText' ).html();
	console.log(hoverText)
	//creating overlay
	$( '<div>' ).attr({
					'id': 'overlay'+count,
					'class': 'allOverlays'
					})
				.css({
					'z-index':5,
					'position':'absolute',
					'background-color':"#FFFFC2",
					'border-style': 'ridge',
					'border-width': 'thick',
					'border-color': '#6699FF',
					'padding': '10px'
				})
				.appendTo( 'body' )
				.html(hoverText);
	
	var $image = $( '<img>' ).attr({
		src: 'https://vignette.wikia.nocookie.net/runescapefanfiction/images/d/d5/DropsLine_info.png/revision/latest?cb=20150822080442',
		alt: 'Info'
	}),
	    $link = $( '<span>' ).attr('id','overlayLink'+count)
		.append( $image )
		.on("mouseenter", function(){
			//get mouse co-ords
			$(document).mousemove(function(event) {
				currentMousePos.x = event.pageX;
				currentMousePos.y = event.pageY;
			});
			
			//find which overlay is linked to this link
			var overlayNumber = $(this).attr('id').split('k')[1]
			$('#overlay'+overlayNumber).css({
				'left': currentMousePos.x,
				'top': currentMousePos.y
			}).fadeIn(200);
			console.log("overlay has appeared")
		})
		.on("mouseleave", function(){
			var overlayNumber = $(this).attr('id').split('k')[1]
			//if not hovering on overlay
			if($('#overlay'+overlayNumber+':hover').length == 0)
				$('#overlay'+overlayNumber).fadeOut(100);
		});
		
		$('.allOverlays').on("mouseleave", function() {
			$('.allOverlays').fadeOut(100);
		});
		
	$( this ).append( $link );
})