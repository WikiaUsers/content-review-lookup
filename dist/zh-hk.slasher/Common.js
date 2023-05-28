/* Style switch */

	$(function() {
		if($('#changestyle').length > 0) {
			var cl = $($('#changestyle').get(0)).data('bg');
		if(cl) {
			cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
			$(document.body).addClass('season-' + cl);
		}
		}
	});

/* End of Style switch */