/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

$(document).ready(function() {
 
    var
//add this class to all elements created by the script. the reason is that we call the script again on
//window resize, and use the class to remove all the "artefacts" we created in the previous run.
		myClassName = 'imageMapHighlighterArtefacts'
		, liHighlightClass = 'liHighlighting'
// "2d context" attributes used for highlighting.
		, areaHighLighting = {fillStyle: 'rgba(110,0,0,0.40)', strokeStyle: 'red', lineJoin: 'round', lineWidth: 2}
//every imagemap that wants highlighting, should reside in a div of this 'class':
		, hilightDivMarker = '.imageMapHighlighter'
// specifically for wikis - redlinks tooltip adds this message
		, he = mw && mw.config && mw.config.get('wgUserLanguage') == 'he'
		, pageDoesntExistMessage = he ? ' (הדף אינו קיים)' : ' (page does not exist)'
		, expandLegend = he ? 'הצגת מקרא' : 'ּShow Legend'
		, collapseLegend = he ? 'הסתרת המקרא' : 'Hide Legend'
		;
 
 
	function drawMarker(context, areas) { // this is where the magic is done.
 
		function drawPoly(coords) {
			context.moveTo(coords.shift(), coords.shift());
			while (coords.length)
				context.lineTo(coords.shift(), coords.shift());
		}
 
		for (var i in areas) {
			var coords = areas[i].coords.split(',');
			context.beginPath();
			switch (areas[i].shape) {
				case 'rect': drawPoly([coords[0], coords[1], coords[0], coords[3], coords[2], coords[3], coords[2], coords[1]]); break;
				case 'circle': context.arc(coords[0],coords[1],coords[2],0,Math.PI*2);  break;//x,y,r,startAngle,endAngle
				case 'poly': drawPoly(coords); break;
			}
			context.closePath();
			context.stroke();
			context.fill();
		}
	}
 
	function mouseAction(e) {
		var $this = $(this),
			context = $this.data('context'),
			activate = e.type == 'mouseover',
			li = $this.prop('tagName') == 'LI';
		if (li && activate) { // in this case, we need to test visibility vis a vis scrolling
			var height = $this.height(),
				ol = $this.parent(),
				top = $this.position().top;
			if (top < 0 || top + height > ol.height()) 
				ol.animate({scrollTop: ol.scrollTop() + top - ol.height() / 2});
		}
		$this.toggleClass(liHighlightClass, activate);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		if (activate) {
			drawMarker(context, $this.data('areas'));
			if ($.client.profile().name === 'msie') {	// ie9: dimwit needs to be told twice.
				context.clearRect(0, 0, context.canvas.width, context.canvas.height);
				drawMarker(context, $this.data('areas'));
			}
		}
	}
});