/* Chat Aviso */
// Aviso ao Entrar no Chat -
	var $optionsWindowHTML = $.showCustomModal( "Bem vindo(a) ao Chat!", {
		id: "optionsWindow",
	    width: 450,
	    buttons: [
		{
			id: "updateCookie",
			defaultButton: true,
			message: "Continuar",
			handler: function () {
				updateCookie();
		    }
	    }
		]
	});