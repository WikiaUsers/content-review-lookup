/* Any JavaScript here will be loaded for users using the MonoBook skin */

wgSidebar['On the Wiki'] = [ 
	'Especial:Mudanças_recentes|Mudanças recentes',
	'Especial:Aleatória|Página Aleatória',
	'Especial:Videos|Vídeos',
	'Especial:Arquivos_novos|Imagens',
];

wgSidebar['Mídia'] = [ 
	{'To LOVE-Ru (série)|Série': [
		'Lista de Volumes|Capítulos e Volumes',
	]},
        'Lista de Episódios|Lista de Episódios'
        'OVAs|OVAs'
];

wgSidebar['Lista de Personagens|Personagens'] = [ 
	{'Categoria:Femininos|Femininos': [
		'Lala Satalin Deviluke|Lala Satalin Deviluke',
		'Haruna Sairenji|Haruna Sairenji',
                'Yui Kotegawa|Yui Kotegawa',
                'Momo Velia Deviluke|Momo Velia Deviluke',
                'Nana Aster  Deviluke|Nana Aster  Deviluke',
                'Mikan Yūki|Mikan Yūki',
                'Escuridão Dourada|Escuridão Dourada'
	]},
	{'Categoria:Masculinos|Masculinos': [
		'Rito Yūki|Rito Yūki',
		'Kenichi Saruyama|Kenichi Saruyama',
		'Ren Elise Jewelria|Ren Elise Jewelria'
		'Zastin Deviluke|Zastin Deviluke'
		'Yū Kotegawa|Yū Kotegawa'
	]},
];

wgSidebar['Project:Portal comunitário|Comunidade'] = [ 
	{'Project:Administradores|Administradores': [
		'Message Wall:PlacidoNB|PlacidoNB',
		'Message Wall:Hidan16|Hidan16',
	]},
];

/* Call initialising method of the Monobook Sidebar*/
$(MonobookSidebar.init);