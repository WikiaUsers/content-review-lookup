// Qualquer JavaScript aqui vai ser carregado para todos os usuários em cada carregamento da página.

//
// scripts de importação
//

PurgeButtonText = 'Atualizar';
importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",                   // Ajax Recent Changes
        "w:c:dev:DisableArchiveEdit/code.js",       // Disable Archive Edit
        "w:c:dev:DupImageList/code.js",             // Duplicate Images
        "w:c:dev:ShowHide/code.js",                 // Show - Hide button
        "w:c:dev:PurgeButton/code.js",              // Botão de Atualizar
        "MediaWiki:DireitosTítulosdoUtilizador.js", // DireitosTítulosdoUtilizador
        "MediaWiki:ResumosPadrãoEditar.js"          // Resumos Padrão Editar
    ]
});

//
// Patch em alterações linhas da tabela de classificação e alt
// Cortesia do PCJ de WoWPedia.org
//

function changeTS() {
window['ts_alternate'] = function (table) {
var tableBodies = table.getElementsByTagName("tbody");
for (var i = 0; i < tableBodies.length; i++) {
var tableRows = tableBodies[i].getElementsByTagName("tr");
for (var j = 0; j < tableRows.length; j++) {
var oldClasses = tableRows[j].className.split(" ");
var newClassName = "";
for (var k = 0; k < oldClasses.length; k++) {
if (oldClasses[k] != "" && oldClasses[k] != "alt") newClassName += oldClasses[k] + " ";
} tableRows[j].className = newClassName + (j%2 == 0?"alt":"");
}
}
}
}
addOnloadHook(changeTS);

//
// Função ShowHide para mesas dobráveis ​​e navboxes
//

var ShowHideConfig = {
     brackets: '[]', 
     autoCollapse: 3,
};

//
// AJAX Mudanças Recentes atualização automática
// Cortesia do PCJ de WoWPedia.org
//

ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

var indicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
var ajaxRefresh = 60000;

//
// DisableArchiveEdit - Desativar edição de falar página de arquivos
// Cortesia de Porter21 de w:c:fallout
//

var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: false,
   textColor: '#D9D9D9',
   userLang: true
};


//Um script que adiciona um botão de "Voltar para o Topo" no rodapé do tema Oasis.
//Criado por Noemon do Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).show ();
						break;
					default:
						$( '#backtotop' ).fadeIn ();
						break;
				}
			} else {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).hide ();
						break;
					default:
						$( '#backtotop' ).fadeOut ();
						break;
				}					
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:1px; border:none;"><button style="height: 20px;" type="button" value="Voltar para o Topo" onClick="goToTop();">Voltar para o Topo</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
 
if( typeof ToggleFading == "number" ) {
	FadeSwitch = ToggleFading;
}
//