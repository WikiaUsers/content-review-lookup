function ninjaWorksIt(){
    $.showCustomModal( 'Ninja Works It', '<video width="600" autoplay="" loop="" id="ninjaworksit" style="pointer-events:none;"><source src="http://www.giovixd.com.ar/archivos/recursos/dancing.mp4" type="video/mp4"></source></video>', {
	    id: "ninjaWorksIt",
	    width: 600,
            height: 540,
	    buttons: [
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
				cerrarDialogDos();
		    }
	    }
		]
	});
}

if ( window.addEventListener ) {
	var state = 0, konami = [38,38,40,40,37,39,37,39,66,65];
	window.addEventListener("keydown", function(e) {
		if ( e.keyCode == konami[state] ) state++;
		else state = 0;
			if ( state == 10 ) {
                             $('ul.dropdown').hover(function(){
                                 $('#ninjacool').show(); 
                             });
                        }
	}, true);
}