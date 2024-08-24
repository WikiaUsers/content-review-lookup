/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

// Alerta de Spoilers e Não Finalizados
SpoilerAlert = {
    question: 'ATENÇÃO! Essa página pode conter grandes spoilers ou informações provisórias que você pode<br />não querer ver. Tem certeza que deseja prosseguir para a página?.',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');
 
//Pontuação WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Automático';
window.AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];

// User tags
window.UserTagsJS = {
	modules: {
        inactive: 45,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'patroller',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: true,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,
	},
 
    tags: {
        bureaucrat: {
            u:'Cônsul',
            link:'Project:Administradores',
            color:'white',
            title:'Burocrata' 
        },
		sysop: {
            u:'Membro do Conselho',
            link:'Project:Administradores',
            color:'white',
            title:'Administradores' 
        },
		patroller: { 
            u:'Inquisidor',
            link:'Project:Administradores',
            color:'white',
            title:'Patroller' 
        },
		rollback: {
            u:'Caçador de Sombras',
            link:'Project:Administradores',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags