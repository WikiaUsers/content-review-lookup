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
            'Ale_-_Remastered': ['asistente'],
            'Turnip0310': ['asistente'],
            'PNAS27': ['asistente'],
            
            'WKorps': ['veterano'],
            'ClaudeSpeed9425': ['veterano'],
            'Kenbill': ['veterano'], 
            'Playsonic2': ['veterano'],
            'Nikolai%27Bellic..': ['veterano'],
            'Xabierl': ['veterano'],
            'Donaldlove57': ['veterano'],
            'Absay': ['veterano'],
            'Master_Jacob': ['veterano'],
            'ClaudeGTA3': ['veterano'],
            'Kombatgaby': ['veterano'],
            'KentPaul5000': ['veterano'],
            'GhostRiley2000': ['veterano'],
            'Antony97': ['veterano'],
            'WeisserHirsch': ['veterano'],
            
            'FabianVercetti': ['retirado'],
            'Leandritodepompeya': ['retirado'],
            'Nicolas_F._Chiribelo': ['retirado'],
            'G%C3%A1ngster_Tommy': ['retirado'],
            'Raimox': ['retirado'],
            'Franco_vice_city': ['retirado'],
            'Bigdadi': ['retirado'],
            'Smoke1996': ['retirado'],
            'Star_Falco': ['retirado'],
            'Juanfro88': ['retirado'],
            'Alejandro_Rostagno': ['retirado'],
            'Psycho1960': ['retirado'],
            'Alejandrobelik': ['retirado'],
            'CJ_SanAndreas': ['retirado'],
            'Rodriseb': ['retirado'],
            'BillyShears9426': ['retirado'],
            'Platybus': ['retirado'],
            'Bruno_Cardozo': ['retirado'],
            'Matias_Montanna': ['retirado'],
            'Marco_Antonio_Guti%C3%A9rrez_Udaondo': ['retirado'],
            'GuidoM1995': ['retirado']
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
		},
		veterano: { 
			f:'Veterano', 
			link:'project:Administración/Antiguos miembros#Veteranos' 	
		},
		retirado: { 
			f:'Retirado', 
			link:'project:Administración/Antiguos miembros#Retirados' 	
		}
    }
};