/* Plakietki */
window.UserTagsJS = {
	modules: {},
	tags: {
	'Okres próbny':		{ u:'Okres próbny' },
	'Biurokrata':		{ u:'Biurokrata' },
	'Okres próbny':		{ u:'Okres próbny' },
	'Rollback':	        { u:'Rollback' },
	'Moderator czatu':	{ u:'Moderator czatu' }
	}
};
 
UserTagsJS.modules.custom = {
	'Dawid2':		['Biurokrata']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});


/* Facebook */
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
        $("<div id='FacebookWnd'></div>").css({
                background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
                width:242,
                height:401,
                position:'fixed',
                top:150,
                right:-210,
                zIndex:300}).appendTo("body");
        //Zawartość
        $('<div class="fb-like-box" data-href="https://www.facebook.com/TwojaTwarzBrzmiZnajomoWiki" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
        $("#FacebookWnd").click(function(){
                toggleFacebookWnd();
        });
});
 
function toggleFacebookWnd() {
        if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
        else $("#FacebookWnd").animate({right:"-210px"}, 700);
}


/* Dodanie przycisków w edytorze źródła */
if (typeof (mwCustomEditButtons) != 'undefined') {
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/1/11/Button_Nuvola_apps_edu_lang.png",
		"speedTip": "Wstaw infobox uczestników",
		"tagOpen": "{{Uczestnik infobox\n|Zdjęcie= \n|Imię i nazwisko= \n|Pseudonim= \n|Data i miejsce urodzenia= \n|Data i miejsce śmierci= \n|Stan cywilny= \n|Zawód= \n|Płeć= \n|Wzrost= \n|Kolor włosów= \n|Kolor oczu= \n|Kolor skóry= \n|Dzieci= \n|Współmałżonek(a)= \n|Partner(ka)= \n|Rodzeństwo= \n|Rodzice= \n|Jako= \n|Edycja= \n|Wystąpił(a) jako= \n",
		"tagClose": "}}",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Button_note.png",
		"speedTip": "Wstaw infobox wokalistów",
		"tagOpen": "{{Wokaliści infobox\n|Zdjęcie= \n|Imię i nazwisko= \n|Pseudonim= \n|Data i miejsce urodzenia= \n|Data i miejsce śmierci= \n|Stan cywilny= \n|Aktywność= \n|Gatunek muzyczny= \n|Typ głosu= \n|Instrument= \n|Wytwórnia płytowa= \n|Zespół= \n|Zawód= \n|Płeć= \n|Wzrost= \n|Kolor włosów= \n|Kolor oczu= \n|Kolor skóry= \n|Dzieci= \n|Współmałżonek(a)= \n|Partner(ka)= \n|Rodzeństwo= \n|Rodzice= \n|Uczestnik wcielający się= \n|Wykonywany utwór= \n|Edycja= \n",
		"tagClose": "}}",
		"sampleText": ""
	};

/* Nieaktywny użytkownik */
InactiveUsers = { text: 'Nieaktywny' };
importScriptPage('InactiveUsers/code.js', 'dev');

/* Licencje */
var options = {
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{CC-BY-SA}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
	'{{Copyright}}': 'Creative Commons BY-SA',
	'{{Fairuse}}': 'Zastrzeżone prawa autorskie',
	'{{PD}}': 'Plik znajdujący się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia',
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js"
   ]
});