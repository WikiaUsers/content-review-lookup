
LIR.i18n['pt-br'] = {
	queueModalTitle: 'Fila de Atualização de Uso de Arquivos',
	fileNamespace: 'Arquivo',
	imageNamespace: 'Imagem',
	videoNamespace: 'Video',
	using: 'Usando',
	queue: 'Fila',
	userBlogCommentNamespace: 'Comentário de blog de usuário', // Will always use the translated version because it's returned from the API (hopefully)
	editSummary: 'Atualizando os links de arquivos (automático)',
	filesInQueue: 'Arquivos na fila',
	oldFileName: 'Antigo nome do arquivo',
	newFileName: 'Novo nome do arquivo',
	addToQueue: 'Adicionar à fila',
	nameInUse: 'Nome de destino já está na fila para ser usado ou está atualmente em uso.',
	alreadyInQueue: 'Arquivo já foi adicionado à fila.',
	invalidExtension: 'Extensão de arquivo inválida.',
	blogComment: 'Arquivo sendo utilizado em comentário de blog. Incapaz de editar comentários de blogs.',
	fileNotUsed: 'Arquivo não está sendo usado em nenhuma página.',
	noQueueExists: 'Não há nada para ser executado na fila',
	itemRemoved: 'Item removido',
	destInUse: 'Nome de destino já está em uso.',
	processing: 'Processando...',
	successful: 'Bem sucedido.',
	varsUndef: 'Variáveis indefinidas, cheque o código.',
	queueComplete: 'Execução da fila completa',
	queueStarted: 'Execução da fila iniciada',
	contentsRetrieved: 'Conteúdos da página recuperados e salvos',
	queueUpdate: 'Listagem atualizada',
	nothingInQueue: 'Atualmente, não há nada na fila.',
	tryDiffName: 'Por favor, digite um nome de arquivo.',
	waitCleared: 'Lista de páginas em espera atualizada',
	toUndef: 'A variável "Para" não foi definida.',
	fileNameBlank: 'Nomes de arquivos não podem ser deixados em branco',
	submittingContent: 'Enviando conteúdo da página',
	namespaceCheckbox: 'Incluir <span style="font-weight: bold">links</span> em todos os namespaces ex: [[:Arquivo:Arquivo.png]] <span style="font-size: 9px;">(apenas inclui Principal por padrão)</span>',
	failedDescription: 'Itens com falhas aparecem aqui depois da execução. Note que páginas para as quais o arquivo foi transcluído por uma predefiniçãotambém aparecerão aqui.',
	pagesWaiting: 'Páginas ainda estão esperando serem adicionadas à fila. Se este não for o caso, por favor use o botão "Resetar lista de espera" para poder executar a fila.',
	unableToMoveChoose: 'Por favor, adicione outro destinatário para este arquivo.',
	unableToMoveFail: /* Image name */ 'foi removido da fila.',
	singleButtonText: 'Renomear e atualizar',
	queueButtonText: 'Adicionar à fila',
	fileInQueue: 'Este arquivo já está na fila para ser atualizado!',
	removeFromQueue: 'Remover da fila',
	queueModalClose: 'Fechar',
	queueModalManual: 'Adicionar manualmente',
	queueModalReset: 'Resetar lista de espera',
	queueModalUpdate: 'Atualizar',
	queueModalExecute: 'Executar',
	queueAddition: 'Adição na fila',
	manualModalDescription: 'Adicione o nome do arquivo para atualizar os links (não precisa existir). Os links serão atualizados porém <span style="font-weight: bold;">nenhum</span> arquivo será movido.',
	
	queueModalWaitConfirm: [
		'Isto irá resetar a lista de páginas esperando para serem adicionadas à fila no caso de haver um problema ao processar uma página que está te prevenindo de executar uma fila.',
		'Note que ainda há',
		/* Number of pages */
		'páginas a serem adicionadas à fila. Se você tem absoluta certeza de que atualmente não há páginas abertas que estejam esperando na fila para serem processadas ou que ocorreu um problema que cessou o processamento das páginas, então aperte OK para limpar a lista de páginas em espera.',
		'Se ainda há páginas na fila de espera para serem processadas, você precisará atualizar ou recolocar estas páginas na fila para adicioná-las.'
	],
	waitList: [
		'Número',
		/* number on waitlist */
		'na lista de espera'
	],
	unableToFind: [
		'Incapaz de encontrar',
		/* Image Name */
		'na página',
		/* Page Name */
		'talvez tenha sido transcluído à página através de uma predefinição. Por favor, cheque e renomeie manualmente caso necessário.'
	],
	unableToMove: [
		'O arquivo',
		/* Image Name */
		'não pôde ser movido para',
		/* Image Name */
		'pelo seguinte motivo:'
		/* error code */
	],
	unableToSubmit: [
		'A página',
		/* Page Name */
		'não pôde ser criada pelo seguinte código de erro:',
		/* Image Name */
		'Por favor, atualiza o(s) link(s) desta página manualmente.'
	],
	movePageNamespaceSelect: [
		'Afeta a opção',
		/* Single button name */
		'apenas'
	],
	movePageDescription: [
		'O botão',
		/* Single button name */
		'atualiza o uso de uma única imagem pelas páginas da wiki, enquanto o botão',
		/* Multi button name */
		'adiciona o arquivo em questão a uma fila para que seus usos nas páginas sejam atualizados em grupo. Ao atualizar os usos de arquivos utilizando a fila, usos localizados em páginas idênticas são agrupados para que apenas uma única edição aconteça, ao invés de ocorrer uma edição por arquivo. A fila pode ser acessada ou executada através de qualquer página de arquivo dentro do menu do botão "Editar". Por favor, note que uma fila salva é local do navegador que está sendo usado, e não é carregada para outros navegadores/computadores.'
	],
	
	movePageInfo: [
		'Script atualizado',
		/* date */
		'Mais informações a respeito de atualizações e funcionalidades podem ser encontradas <a href="//dev.wikia.com/wiki/FileUsageAuto-update">aqui</a>.  Por favor, relate bugs substituições ausentes na página de Discussões detalhadamente.'
	]
};