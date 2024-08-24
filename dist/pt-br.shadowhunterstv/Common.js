/* C�digos JavaScript colocados aqui ser�o carregados por todos aqueles que acessarem alguma p�gina desta wiki */

// Alerta de Spoilers e N�o Finalizados
SpoilerAlert = {
    question: 'ATEN��O! Essa p�gina pode conter grandes spoilers ou informa��es provis�rias que voc� pode<br />n�o querer ver. Tem certeza que deseja prosseguir para a p�gina?.',
    yes: 'Sim, por favor',
    no: 'N�o, ainda n�o',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// Pop-ups em Refer�ncias
importScriptPage('ReferencePopups/code.js', 'dev');
 
//Pontua��o WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Autom�tico';
window.AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudan�as_recentes",
    "Especial:WikiActivity",
    "Especial:P�ginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:P�ginas_novas",
    "Especial:Contribui��es"
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
            u:'C�nsul',
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
            u:'Ca�ador de Sombras',
            link:'Project:Administradores',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags