// **************************************************
// Añadir etiquetas en los perfiles
// **************************************************
window.UserTagsJS = {
	modules: { 
                mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
		},
		autoconfirmed: true,
		newuser: true,
		custom: {
			'HuellasDelSur': ['informático'],
			'BillyShears9426': ['vigilante'],
 			'GuidoM1995': ['vigilante'],
			"Darax'Rax Vas Neema": ['monthuser'],
			"Darax'Rax Vas Neema": ['vigilante'],
}
        },
	tags: {
				monthuser: { 
			u:'Usuario del mes', f:'Usuaria del mes'
		},
		informático: { 
			u:'Informáticos', f:'Informáticas' link:'project:Administración#Informáticos' 
		},
		vigilante: { 
			u:'Vigilante', link:'project:Administración#Vigilantes' 
		},
		hacker: { 
			u:'Hacker', link:'project:Administración#Hackers' 
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