function ninjaWorksIt(){
    $.showCustomModal( 'Ninja Works It', '<video width="680" autoplay="" loop="" id="ninjaworksit" style="pointer-events:none;"><source src="http://www.giovixd.com.ar/archivos/recursos/dancing.mp4" type="video/mp4"></source></video>', {
	    id: "ninjaWorksIt",
	    width: 600,
            height: 400,
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

$(function(){
    $('[data-user="Benfutbol10"] .avatar').click(function(){
        ninjaWorksIt();
    });
});