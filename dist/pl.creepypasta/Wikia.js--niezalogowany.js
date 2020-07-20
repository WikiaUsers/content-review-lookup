var noRegister = getWikiCookie('wikiRegisterInfoCookie', 0);
$(function(){
    if(noRegister != 1){
	    if(wgUserName == null){
		    $('#WikiHeader').append('&nbsp<div id="registerAccountInfo">Wygląda na to, że wciąż nie masz konta. W takim razie, <a href="/wiki/Specjalna:Zaloguj">Zaloguj Się</a> lub <a href="/wiki/Specjalna:Zarejestruj">Zarejestruj</a> (<a href="/wiki/Creepypasta_Wiki:Konto">Dowiedz się więcej...</a>)(<a onclick="hideRegisterInfo();">Nie Pokazuj</a>)</div>');
		}
	}
});
function hideRegisterInfo(){
    $('#registerAccountInfo').hide(500);
	noRegister = 1;
	setWikiCookie('wikiRegisterInfoCookie', noRegister);
}