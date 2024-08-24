window.interwikiInternational = {
  namespace: 'Interwiki',
  namespaceId: 120,
  mainPage: 'Central_da_Comunidade:Pedidos_de_link_interl�ngua',
  
  interwikiSchema: '{{bStart}}Solicita��o de link interlingua|{{from}}|{{to}}{{bEnd}}',
	pageSchema: '{{bStart}}T�tulo solicita��o de link interlingua{{bEnd}}\n\n' +
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
        namespace: 'Pedido de ado��o',
        namespaceId: 118,
        adoptionsPage: 'Ado��o:Pedidos'
    },
    wikitextSchema: "{{bStart}}Pedido de Ado��o\n" +
        "| 0-Status              = Aberto\n" +
        "| 1-Nome de Usu�rio     = {{userName}}\n" +
        "| 2-Endere�o da Wiki    = {{{wikiURL}}}\n" +
        "| 3-Tipo de permiss�es  = {{permissionsType}}\n" +
        "| 4-N� de dias ativo    = {{numDays}}\n" +
        "| 5-N� de admins ativos = {{numAdmins}}\n" +
        "| 6-Raz�o para a ado��o = {{comments}}\n" +
        "| 7-Endere�o discuss�es = {{{communityVote}}}\n" +
    "{{bEnd}}",
   i18n: {
        activeAdminsError: 'Por favor tenha em mente que caso haja administradores ativos, voc� deve primeiramente entrar em contato com eles sobre a possibilidade de se tornar admin.',
        adminsActivityLabel: 'N�mero de admins ativos nos �ltimos 60 dias',
        adoptionButtonLabel: 'Adotar uma wiki',
        alreadyAdminError: 'Voc� j� � um admin nesta wiki. Por favor tenha em mente de que voc� n�o precisa adotar uma wiki na qual voc� j� tenha permiss�es de admin a menos que esteja se candidatando ao cargo de burocrata.',
        alreadyBureaucratError: 'You are already a bureaucrat on this wiki. You do not need to adopt this wiki.',
        automaticQueryError: 'A wiki n�o respondeu a uma consulta automatizada. Por favor preencha os campos requisitados.',
        ccError: 'Wikis oficiais do Fandom n�o est�o dispon�veis para ado��o.',
        closeLabel: 'Cancelar',
        commentsLabel: 'Coment�rios/Raz�es para a ado��o',
        communityVoteLabel: 'Voto da comunidade',
        invalidLanguageError: 'Para pedidos de ado��o internacionais, por favor expanda a se��o de Pedidos de ado��o Internacional e visite a Central da Comunidade referente ao seu idioma para fazer um pedido de ado��o.',
        invalidUrlError: 'O formato de endere�o fornecido n�o foi reconhecido.',
        linkLabel: 'Link',
        modalTitle: 'Pedido de Ado��o',
        nameLabel: 'Nome da Wiki',
        noActivityError: 'Por favor, tenha em mente de que voc� deve ter contribu�do com a wiki de maneira consistente durante uma semana antes de submeter um pedido de ado��o.',
        noCommentsError: 'Por favor deixe um motivo do por que voc� quer adotar essa wiki e por que voc� estaria apto a ser um admin.',
        noEditsError: 'Voc� precisa ter contribu�do por uma semana nessa wiki para poder adot�-la.',
        noNameError: 'Por favor coloque o nome da wiki.',
        noUrlError: 'Por favor coloque o endere�o da wiki.',
        permissionLabel: 'Tipos de permiss�es',
        placeholderComments: 'Comentarios sobre o pedido de ado��o. Por favor nos diga o por que de voc� querer adotar essa wiki e por que voc� seria um bom candidato para ser um admin.',
        placeholderDiscussionsPost: 'ID do post de Discuss�es',
        placeholderUrl: 'https://wiki.fandom.com/pt-br',
        processFailError: 'Houve problemas ao submeter o seu pedido.',
        provideCommunityVote: 'Aparentemente existem outros usu�rios ativos na wiki. Por favor considere criar um post de Discuss�es descrevendo as suas inten��es de adotar a wiki e deixar que eles deem as suas opini�es. Caso j� o tenha feito, tenha certeza de incluir o link para tal post.',
        submitError: 'Ocorreram problemas ao submeter o seu pedido.',
        submitLabel: 'Submeter',
        userActivityLabel: 'N�mero de dias editados nos �ltimos 10 dias'
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