/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

$(function() {
 
$('#WikiChatList #user-Karolcia555555, .Chat li[data-user="Karolcia555555"] .avatar').attr('src', 'https://images.wikia.nocookie.net/__cb1397502471/common/avatars/thumb/8/84/24632903.png/28px-24632903.png.jpg');
$('#WikiChatList #user-Karolcia555555, .Chat li[data-user="Karolcia555555"] .username').html('Karolcia');
$('#user-Karolcia555555').html('<img src="https://images.wikia.nocookie.net/__cb1397502471/common/avatars/thumb/8/84/24632903.png/28px-24632903.png.jpg"></img><span class="username">Karolcia</span>');
 
});

importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js"
   ]
});


// Licencje
var options = {
	'{{fairuse}}': 'Screeny (zrzuty ekranu) z filmów, serialu lub gier',
	'{{fairuse-inne}}': 'Grafiki filmowe DreamWorks (promocyjne, plakaty, concepty, okładki, zdjęcia zabawek)',
	'{{ilustracje}}': 'Ilustracje do powieści Cressidy Cowell oraz ich okładki',
	'{{copyright}}': 'Fan Art',
	'{{copyright-inne}}': 'plik własnego autorstwa, np. zdjęcia (nie dotyczy Fan Artów)',
	'{{Brak licencji}}': 'Prawa autorskie nieznane',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Screenshot-Web}}': 'Zdjęcie strony internetowej (screenshot)',
	'{{cc-by-3.0}}': 'Licencja CC BY-SA 3.0 (ikonki tylko techniczne!)',
};


var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');


$(function() {
var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 // Filmowe konta
  rights["Nieustraszona Astrid Hofferson"]                   = ["potwierdzona osobistość"];
  rights["Sączysmark Jorgenson"]                   = ["potwierdzona osobistość"];
  rights["Śledzik Ingerman"]                   = ["potwierdzona osobistość"];
  rights["Szczerbatek Alfa"]                   = ["potwierdzona osobistość"];
  rights["Mieczyk Thorston"]                   = ["potwierdzona osobistość"];
  rights["Szpadka Thorston"]                   = ["potwierdzona osobistość"];
  rights["Pyskacz Gbur"]                   = ["potwierdzona osobistość"];
  rights["Stoick Ważki"]                   = ["potwierdzona osobistość"];
  rights["Koszmar Ponocnik Hakokieł"]                   = ["potwierdzona osobistość"];
  rights["Śmiertnik Zębacz Wichura "]                   = ["potwierdzona osobistość"];
  rights["Gronkiel Sztukamięs"]                   = ["potwierdzona osobistość"];
  rights["Zębiróg Zamkogłowy Jot i Wym"]                   = ["potwierdzona osobistość"];
  rights["Czkawka Haddock"]                   = ["potwierdzona osobistość"];
   rights["Stormcutter Chmuroskok"]                   = ["potwierdzona osobistość"];
 
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});