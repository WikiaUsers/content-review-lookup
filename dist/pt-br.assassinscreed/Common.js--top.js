//Créditos: http://deadspace.wikia.com/

// ==============================
// Botão de Voltar ao topo
// ==============================
 
//Um script que adiciona uma opção "Voltar ao topo" no rodapé do tema Oasis.
//Eu não gosto de rolar até voltar ao topo em páginas longas nem você :)
//Criado por Noemon da Dead Space Wiki
 
 
function hideFade () {
	// esconde #backtotop primeiro
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// rola corpo para 0px no clique
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Voltar ao topo" onClick="goToTop();">Voltar ao topo</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // previne duplicação