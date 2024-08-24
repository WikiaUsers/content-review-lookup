// **************************************************
//       Grand Theft Encyclopedia - Versión 7.0
//          Creado por User:bola - CC-BY-SA
//          Created by User:bola - CC-BY-SA
// --------------------------------------------------
// ATENCIÓN: La mayor parte de los códigos incluídos
// aquí han sido creados específicamente para es.gta
// por user:bola, si estás interesado en hacer alguna
// modificación o usarlos en tu wiki, avisa al autor
// para evitar añadir algo que pueda romper los TdU.
//                                           Gracias,
// **************************************************


// **************************************************
// Importa diferentes códigos extra
// **************************************************
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:FloatingToc.js',
        'w:c:dev:UserTags/code.js'
    ]
});

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "gtaencyclopedia"
};
importScriptPage('SocialIcons/code.js','dev');


// **************************************************
// Primera parte - 4 backgrounds durante el día
// **************************************************
$(function () {
 var d = new Date();
 if (d.getHours() < 5) {
  document.body.className += ' BG4';
  document.getElementById('WikiaPage').className += ' BG4-page';
 } 
 else if (d.getHours() < 9) {
  document.body.className += ' BG3';
  document.getElementById('WikiaPage').className += ' BG3-page';
 } 
 else if (d.getHours() < 18) {
  document.body.className += ' BG1';
  document.getElementById('WikiaPage').className += ' BG1-page';
 } 
 else if (d.getHours() < 22) {
  document.body.className += ' BG2';
  document.getElementById('WikiaPage').className += ' BG2-page';
 } 
 else if (d.getHours() < 24) {
  document.body.className += ' BG4';
  document.getElementById('WikiaPage').className += ' BG4-page';
 } 
});


// **************************************************
// Segunda parte - Añade un contenedor extra para background
// **************************************************
$('#WikiaPageBackground').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"></div>');


// **************************************************
// Crea clase e id para cinta adhesiva en thumbs
// **************************************************
$('.thumb').append('<div class="plantilla-cinta-cinta" id="plantilla-cinta-cinta"></div>');


// **************************************************
// Añade el tagline de forma manual
// **************************************************
$(function(){
     if ($('#WikiaPageHeader').length ) {
            $('#WikiaPageHeader').append('<div id="siteSub"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Attention :</span> Ce wiki est hautement corrosif</div>');
     }
});


// **************************************************
// Añade en las noticias un header especial - prueba
// **************************************************
$('body.ns-116 .WikiHeader .wordmark.graphic ').bind('click.cabecera', function(){ window.location.href = 'http://es.gta.wikia.com/wiki/Noticias:Índice'; return false; });

// **************************************************
// Añade nuevas etiquetas en los perfiles de los usuarios
// **************************************************
window.UserTagsJS = {
	modules: { 
                mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
                metafilter: {	
			sysop: ['bureaucrat'], 
		},
                inactive: { 
			days: 30,
			namespaces: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
			zeroIsInactive: true
		},
		autoconfirmed: true,
		newuser: true,
		custom: {
			'': ['monthuser'], 
			'Star Falco': ['yearuser'],
                        'Antony97': ['patrulla'],
			'GTAAAF': ['patrulla'],
                        'GhostRiley2000': ['patrulla'],
                        'GuidoM1995': ['patrulla'],
                        'BillyShears9426': ['mantenimiento'],  
 			'Star Falco': ['mantenimiento'],                  
                        'Troll GT': ['mantenimiento']
		}
        },
	tags: {
		inactive: { 
			u:'Inactivo', f:'Inactiva' 
		},
		monthuser: { 
			u:'Usuario del mes', f:'Usuaria del mes', link:'project:Usuario_del_mes' 
		},
		yearuser: { 
			u:'Usuario del año', f:'Usuaria del año', link:'project:Usuario_del_año' 
		},
		patrulla: { 
			u:'Patrulla', link:'project:Administración#Patrulla' 
		},
		mantenimiento: { 
			u:'Mantenimiento', link:'project:Administración#Mantenimiento' 
		},
		bureaucrat: { 
			title:'El Dictador Benevolente', link:'project:Administración#Burócratas' 
		},
		chatmoderator: { 
			f:'Moderadora del chat' 
		},
		sysop: { 
			f:'Administradora', link:'project:Administración#Administradores' 
		},
		bot: { 
			link:'project:Administración#Bots' 
		}
        }
};