var d = new Date();
var n = d.getHours();

//Hora del script en acción
///1
if (n > 21 & n < 9) {
    $('.Chat').nocturno();
} else if (n = 9) {
    $('.Chat').diurno();
}


/*Funciones*/
//Tema Nocturno : Hora UTC - 9 PM
$.fn.nocturno = function() {
    /*Cabecera*/
	$('.ChatHeader').css('background','#07111F');
	$('.ChatHeader').css('border','0');
	var ColorUsernameHeaderSelf = document.createElement('style');
	ColorUsernameHeaderSelf.innerHTML = '.ChatHeader .User .username{color: #FFF !important;}';
	$('head').append(ColorUsernameHeaderSelf);
	$('.ChatHeader .User').css('border-left','1px solid #0B1729');
	$('.ChatHeader').css('transition','.6s');
	/*Rail / Lista*/
	var SectorSeleccionado = document.createElement('style');
	SectorSeleccionado.innerHTML = '.Rail .User:hover{background: #11213A !important;}';
	$('head').append(SectorSeleccionado);
	$('.UserStatsMenu .info').css('background','#0B1729');
	$('.UserStatsMenu .info').css('color','#FFF');
	$('.UserStatsMenu').css('background','#060E1B');
	var accionLiHoverStatus = document.createElement('style');
	accionLiHoverStatus.innerHTML = '.UserStatsMenu .actions ul li:hover{background-color: #102038 !important;}';
	$('head').append(accionLiHoverStatus);
	$('.UserStatsMenu .info img').css('border','1px solid #0B1729');
	$('.ChatWindow .UserStatsMenu').css('border','3px solid #14243C');
	var BorderUserIMGSelf = document.createElement('style');
	BorderUserIMGSelf.innerHTML = '.User img{border: 1px solid #0B1729 !important;}';
	$('head').append(BorderUserIMGSelf);
	$('.UserStatsMenu').css('transition','.6s');
	$('.Rail').css('transition','.6s');
	$('.User img').css('transition','.6s');
	/*Página general*/
	$('.ChatWindow').css('background','#0D1F38');
	$('.ChatWindow').css('font-family','Tw Cen MT');
	$('#WikiaPage').css('background-color','#07111F');
	$('#WikiaPage').css('border','0');
	$('#WikiaPage').css('color','#FFF');
	var MensajesPropios = document.createElement('style');
	MensajesPropios.innerHTML = '.Chat .you{background: #0B1729 !important;}';
	$('head').append(MensajesPropios);
	$('.Chat').css('border-right','1px solid #0B1729');
	$('.Chat').css('border-bottom','1px solid #0B1729');
	var Avatares = document.createElement('style');
	Avatares.innerHTML = '.Chat .avatar{border: 1px solid #0B1729 !important;}';
	$('head').append(Avatares);
	var Alertas = document.createElement('style');
	Alertas.innerHTML = '.Chat .inline-alert{color: #FFF !important;}';
	$('head').append(Alertas);
	$('.Chat .inline-alert').css('transition','.6s');
	$('.Chat').css('transition','.6s');
	$('#WikiaPage').css('transition','.6s');
	$('.ChatWindow').css('transition','.6s');
	/*WriteBox*/
	$('.Write [name="message"]').css('background-color','transparent');
	$('.Write [name="message"]').css('border','0');
	$('.Write [name="message"]').css('color','#FFF');
	$('.Write .message').css('background-color','#07111F');
	$('.Write .message').css('border','0');
	$('.Write img').css('border','#0B1729');
	$('.Write').css('transition','.6s');
}

//Tema Diurno : Hora UTC - 9 AM
$.fn.diurno() = function() {
    /*Cabecera*/
	$('.ChatHeader').css('background','#9C9C9C');
	$('.ChatHeader').css('border','1px solid #1E1E1E');
	var ColorUsernameHeaderSelf = document.createElement('style');
	ColorUsernameHeaderSelf.innerHTML = '.ChatHeader .User .username{color: #000 !important;}';
	$('head').append(ColorUsernameHeaderSelf);
	$('.ChatHeader .User').css('border-left','1px solid #1E1E1E');
	$('.ChatHeader').css('transition','.6s');
	/*Rail / Lista*/
	var SectorSeleccionado = document.createElement('style');
	SectorSeleccionado.innerHTML = '.Rail .User:hover{background: #1E1E1E !important;}';
	$('head').append(SectorSeleccionado);
	$('.UserStatsMenu .info').css('background','#5C5C5C');
	$('.UserStatsMenu .info').css('color','#FFF');
	$('.UserStatsMenu').css('background','#2C2C2C');
	var accionLiHoverStatus = document.createElement('style');
	accionLiHoverStatus.innerHTML = '.UserStatsMenu .actions ul li:hover{background-color: #8C8C8C !important;}';
	$('head').append(accionLiHoverStatus);
	$('.UserStatsMenu .info img').css('border','1px solid #1E1E1E');
	$('.ChatWindow .UserStatsMenu').css('border','3px solid #2D2D2D');
	var BorderUserIMGSelf = document.createElement('style');
	BorderUserIMGSelf.innerHTML = '.User img{border: 1px solid #1E1E1E !important;}';
	$('head').append(BorderUserIMGSelf);
	$('.UserStatsMenu').css('transition','.6s');
	$('.Rail').css('transition','.6s');
	$('.User img').css('transition','.6s');
	/*Página general*/
	$('.ChatWindow').css('background','#9C9C9C');
	$('.ChatWindow').css('font-family','Arial');
	$('#WikiaPage').css('background-color','#9C9C9C');
	$('#WikiaPage').css('border','0');
	$('#WikiaPage').css('color','#000');
	var MensajesPropios = document.createElement('style');
	MensajesPropios.innerHTML = '.Chat .you{background: #1E1E1E !important;}';
	$('head').append(MensajesPropios);
	$('.Chat').css('border-right','1px solid #1E1E1E');
	$('.Chat').css('border-bottom','1px solid #1E1E1E');
	var Avatares = document.createElement('style');
	Avatares.innerHTML = '.Chat .avatar{border: 1px solid #1E1E1E !important;}';
	$('head').append(Avatares);
	var Alertas = document.createElement('style');
	Alertas.innerHTML = '.Chat .inline-alert{color: #1E1E1E !important;}';
	$('head').append(Alertas);
	$('.Chat .inline-alert').css('transition','.6s');
	$('.Chat').css('transition','.6s');
	$('#WikiaPage').css('transition','.6s');
	$('.ChatWindow').css('transition','.6s');
	/*WriteBox*/
	$('.Write [name="message"]').css('background-color','transparent');
	$('.Write [name="message"]').css('border','0');
	$('.Write [name="message"]').css('color','#000');
	$('.Write .message').css('background-color','#9C9C9C');
	$('.Write .message').css('border','1px solid #1E1E1E');
	$('.Write img').css('border','1px solid #1E1E1E');
	$('.Write').css('transition','.6s');
}