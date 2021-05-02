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
// Primera parte - 4 backgrounds durante el día
// **************************************************
$(function () {
 var d = new Date();
 if (d.getHours() < 6) {
  document.body.className += ' BG4';
  document.getElementsByClassName('WikiaPage').className += ' BG4-page';
 } 
 else if (d.getHours() < 10) {
  document.body.className += ' BG3';
  document.getElementsByClassName('WikiaPage').className += ' BG3-page';
 } 
 else if (d.getHours() < 17) {
  document.body.className += ' BG1';
  document.getElementsByClassName('WikiaPage').className += ' BG1-page';
 } 
 else if (d.getHours() < 21) {
  document.body.className += ' BG2';
  document.getElementsByClassName('WikiaPage').className += ' BG2-page';
 } 
 else if (d.getHours() < 24) {
  document.body.className += ' BG4';
  document.getElementsByClassName('WikiaPage').className += ' BG4-page';
 } 
});


// **************************************************
// Crea clase e id para cinta adhesiva en thumbs
// **************************************************
$('.thumb').append('<div class="plantilla-cinta-cinta" id="plantilla-cinta-cinta"></div>');


// **************************************************
// Añade nuevas etiquetas en los perfiles de los usuarios
// **************************************************
window.UserTagsJS = {
	modules: { 
        mwGroups: ['bureaucrat', 'chatmoderator', 'asistente', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
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
		    ' ': ['yearuser'],
		    'Alansanchez412': ['asistente'],
		    'Alexis21155': ['asistente'],
		    'Bloomdanix': ['asistente'],
		    'GhostRiley2000': ['asistente'],
            'GuidoM1995': ['asistente'],
            'Ale_-_Remastered': ['asistente']
        }
    },
	tags: {
		inactive: { 
			u:'Inactivo', 
			f:'Inactiva' 
		},
		monthuser: { 
			u:'Usuario del mes', 
			f:'Usuaria del mes', 
			link:'project:Usuario_del_mes' 
		},
		yearuser: { 
			u:'Usuario del año', 
			f:'Usuaria del año', 
			link:'project:Usuario_del_año' 
		},
		asistente: { 
			u:'Asistente', 
			link:'project:Administración#Asistente' 
		},
		bureaucrat: { 
			title:'El Dictador Benevolente', 
			link:'project:Administración#Burócrata' 
		},
		sysop: { 
			f:'Administradora', 
			link:'project:Administración#Administrador' 
		},
		bot: { 
			link:'project:Administración#Bot' 
		}
    }
};