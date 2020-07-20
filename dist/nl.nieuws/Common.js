/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Staat je toe om sjablonen te maken die je in/uit kan klappen */
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "weergeef",
	hide: "verberg",
	showAll: "alle weergeven",
	hideAll: "alle verbergen"
    }
};

 var isMainPage = (wgTitle == "Hoofdpagina");
 function mainpg() {
       if ((isMainPage || /[\/=:]Main_Page/.test(document.location)) && document.getElementById('ca-nstab-main')) {
            document.getElementById('ca-nstab-main').firstChild.innerHTML = 'DigiNieuws';
       }   
 }