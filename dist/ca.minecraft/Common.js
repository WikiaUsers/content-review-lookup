// ******** Pestanya del Facebook ********** //
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.com/es_ESP/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/historiopedia/pl/images/3/3e/Wiki-facebook.png)',
		width:350,
		height:401,
		position:'fixed',
		top:150,
		right:-320,
		zIndex:300}).appendTo("body");
	//Zawartość (Ves a saber què és...)
	$('<div class="fb-like-box" data-href="https://www.facebook.com/minecraftwikicat" data-width="253" data-height="361" data-show-faces="false" data-stream="true" colorscheme="light" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		FACEBOOK_HOVER = true;
		toggleFacebookWnd();
	}).mouseleave(function(){
		FACEBOOK_HOVER = false;
		toggleFacebookWnd();
	});
});
 
var FACEBOOK_HOVER = false;
function toggleFacebookWnd() {
	setTimeout(function(){
		if (FACEBOOK_HOVER) $("#FacebookWnd").animate({right:"-40px"}, 700);
		else $("#FacebookWnd").animate({right:"-320px"}, 700);
	}, 100);
}

// **************************************************
// BOTONS ADDICIONALS a la caixa d'edició
// **************************************************
 
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png?uselang=ca",
     "speedTip": "Redirecció",
     "tagOpen": "#REDIRECT[[",
     "tagClose": "]]",
     "sampleText": "Nom de l'article a redirigir"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Codi font",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Codi font"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantilles",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nom de la plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enllaç a usuari",
     "tagOpen": "[[usuari:",
     "tagClose": "|]]",
     "sampleText": "Nom de l'usuari"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categoria",
     "tagOpen": "[[Categoria:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nom de la categoria"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
     "speedTip": "Advertir que s'està editant l'article",
     "tagOpen": "{{inacabat|",
     "tagClose": "}}",
     "sampleText": "Nom d'usuari"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20111227131921/onepiece-cat/ca/images/3/33/Article_incomplet.png",
     "speedTip": "Indicar l'article com a Esborrany",
     "tagOpen": "{{Esborrany}}",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/brookproves/ca/images/thumb/e/ec/Obres.jpg/50px-Obres.jpg",
     "speedTip": "Indicar l'article com a Article Incomplet",
     "tagOpen": "{{Incomplet}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20140913153803/minecraft/ca/images/6/60/Cara_Porc.png",
     "speedTip": "Inserir la plantilla {{mob}}",
     "tagOpen": "{{mob"+"\n"+
"|nom = Nom del mob"+"\n"+
"|imatge = [[Fitxer:Nom_de_la_imatge.png]]"+"\n"+
"|cara = [[Fitxer:Nom_imatge_amb_la_cara_del_mob.png]]"+"\n"+
"|tipus = Passiu, neutral, hostil..."+"\n"+
"|ps = Punts de salut del mob"+"\n"+
"|spawn = Caracetrístiques del lloc on apareix"+"\n"+
"|força = El número de cors i vides que treu al jugador al atacar"+"\n"+
"|Drops = Ítems que tira al morir"+"\n"+
"|Exp = Punts d'experiència que dóna al matar-lo"+"\n"+
"|PriAparició = La versió en la que va apareixer per primer cop"+"\n"+
"}}",
     "tagClose": "",
     "sampleText": ""};
 }

//// Etiquetes personalitzades pels usuaris ////
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		tutorialeditor: { u:'Editor de tutorials' },
	}
};
UserTagsJS.modules.custom = {
	'Unoi': ['tutorialeditor'],
        'marc=serra': ['tutorialeditor'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

//// Resums d'edició predeterminats ////
// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: 'MediaWiki:StandardEditSummary' //Pàgina on hi han els Resums
};
 
// Importem l'script:
 
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});