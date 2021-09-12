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