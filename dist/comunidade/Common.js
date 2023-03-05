window.interwikiInternational = {
  namespace: 'Interwiki',
  namespaceId: 120,
  mainPage: 'Central_da_Comunidade:Pedidos_de_link_interlíngua',
  
  interwikiSchema: '{{bStart}}Solicitação de link interlingua|{{from}}|{{to}}{{bEnd}}',
	pageSchema: '{{bStart}}Título solicitação de link interlingua{{bEnd}}\n\n' +
			'{{interwikis}}\n\n' +
			'~~' + '~~',
};

window.AddRailModule = [{prepend: true}];

mw.hook('AddRailModule.module').add(function() {
  mw.hook('dev.wds').add(function(wds) {
    $('.railModule.rail-module h2.has-icon').prepend(
      wds.icon('discord', {'class': 'wds-icon-small'})
    );
    wds.render('h2.has-icon');
  });
});


window.adoptInternational = {
    unsupportedLanguages: ['en','es','de','fr','ru','it','nl','pl','zh'],
   pageConfig: {
        namespace: 'Pedido de adoção',
        namespaceId: 118,
        adoptionsPage: 'Adoção:Pedidos'
    },
    wikitextSchema: "{{bStart}}Pedido de Adoção\n" +
        "| 0-Status              = Aberto\n" +
        "| 1-Nome de Usuário     = {{userName}}\n" +
        "| 2-Endereço da Wiki    = {{{wikiURL}}}\n" +
        "| 3-Tipo de permissões  = {{permissionsType}}\n" +
        "| 4-Nº de dias ativo    = {{numDays}}\n" +
        "| 5-Nº de admins ativos = {{numAdmins}}\n" +
        "| 6-Razão para a adoção = {{comments}}\n" +
        "| 7-Endereço discussões = {{{communityVote}}}\n" +
    "{{bEnd}}",
   i18n: {
        activeAdminsError: 'Por favor tenha em mente que caso haja administradores ativos, você deve primeiramente entrar em contato com eles sobre a possibilidade de se tornar admin.',
        adminsActivityLabel: 'Número de admins ativos nos últimos 60 dias',
        adoptionButtonLabel: 'Adotar uma wiki',
        alreadyAdminError: 'Você já é um admin nesta wiki. Por favor tenha em mente de que você não precisa adotar uma wiki na qual você já tenha permissões de admin a menos que esteja se candidatando ao cargo de burocrata.',
        alreadyBureaucratError: 'You are already a bureaucrat on this wiki. You do not need to adopt this wiki.',
        automaticQueryError: 'A wiki não respondeu a uma consulta automatizada. Por favor preencha os campos requisitados.',
        ccError: 'Wikis oficiais do Fandom não estão disponíveis para adoção.',
        closeLabel: 'Cancelar',
        commentsLabel: 'Comentários/Razões para a adoção',
        communityVoteLabel: 'Voto da comunidade',
        invalidLanguageError: 'Para pedidos de adoção internacionais, por favor expanda a seção de Pedidos de adoção Internacional e visite a Central da Comunidade referente ao seu idioma para fazer um pedido de adoção.',
        invalidUrlError: 'O formato de endereço fornecido não foi reconhecido.',
        linkLabel: 'Link',
        modalTitle: 'Pedido de Adoção',
        nameLabel: 'Nome da Wiki',
        noActivityError: 'Por favor, tenha em mente de que você deve ter contribuído com a wiki de maneira consistente durante uma semana antes de submeter um pedido de adoção.',
        noCommentsError: 'Por favor deixe um motivo do por que você quer adotar essa wiki e por que você estaria apto a ser um admin.',
        noEditsError: 'Você precisa ter contribuído por uma semana nessa wiki para poder adotá-la.',
        noNameError: 'Por favor coloque o nome da wiki.',
        noUrlError: 'Por favor coloque o endereço da wiki.',
        permissionLabel: 'Tipos de permissões',
        placeholderComments: 'Comentarios sobre o pedido de adoção. Por favor nos diga o por que de você querer adotar essa wiki e por que você seria um bom candidato para ser um admin.',
        placeholderDiscussionsPost: 'ID do post de Discussões',
        placeholderUrl: 'https://wiki.fandom.com/pt-br',
        processFailError: 'Houve problemas ao submeter o seu pedido.',
        provideCommunityVote: 'Aparentemente existem outros usuários ativos na wiki. Por favor considere criar um post de Discussões descrevendo as suas intenções de adotar a wiki e deixar que eles deem as suas opiniões. Caso já o tenha feito, tenha certeza de incluir o link para tal post.',
        submitError: 'Ocorreram problemas ao submeter o seu pedido.',
        submitLabel: 'Submeter',
        userActivityLabel: 'Número de dias editados nos últimos 10 dias'
    }
};

window.botFlagInternational = {
	pageConfig: {
		namespace: 'Bot_request',
		namespaceId: 122,
		requestsPage: 'Central_da_Comunidade:Pedidos_de_Bot'
	},
	titleSchema: '$1 at $2', 
	wikitextSchema: '{{bStart}}Pedido_de_Bandeira_bot\n' +
		'| 0-Status             = novo\n' +
		'| 1-Nome Wiki          = {{wikiName}}\n' +
		'| 2-URL Bot            = {{{botUrl}}}\n' +
		'| 3-Nome Bot           = {{botName}}\n' +
		'| 4-Nome solicitante   = {{requesterName}}\n' +
		'| 5-Voto da Comunidade = {{{communityVote}}}\n' +
		'| 6-Comentarios        = {{comments}}\n' +
	'{{bEnd}}'
};