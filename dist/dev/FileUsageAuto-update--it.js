LIR.i18n.it= {
	queueModalTitle: 'Coda aggiornamento dell\'uso del file',
	fileNamespace: 'File',
	imageNamespace: 'Immagine',
	videoNamespace: 'Video',
	using: 'Utilizzando',
	queue: 'Coda di rinominazione',
	userBlogCommentNamespace: 'Commento blog utente', // Will always use the translated version because it's returned from the API (hopefully)
	editSummary: 'Aggiornamento automatico dei link al file',
	filesInQueue: 'File nella coda',
	oldFileName: 'Vecchio nome del file',
	newFileName: 'Nuovo nome del file',
	addToQueue: 'Aggiungi alla coda',
	nameInUse: 'Il nome di destinazione è già in coda per essere usato o è attualmente in uso.',
	alreadyInQueue: 'Il file è già stato aggiunto alla coda.',
	invalidExtension: 'Estensione del file non valida.',
	blogComment: 'File usato in un commento di un blog. Impossibile aggiornare i commenti ai blog.',
	fileNotUsed: 'Il file non è usato su nessuna pagina.',
	noQueueExists: 'Nessuna coda esistente da eseguire',
	itemRemoved: 'Elemento rimosso',
	destInUse: 'Nome di destinazione già in uso.',
	processing: 'Elaborando...',
	successful: 'Successo.',
	varsUndef: 'Variabile non definita, controlla il codice.',
	queueComplete: 'Esecuzione della coda completata',
	queueStarted: 'Esecuzione della coda avviata',
	contentsRetrieved: 'Contenuti della pagina recuperati e salvati',
	queueUpdate: 'Lista aggiornata',
	nothingInQueue: 'Non c\'è nulla in coda al momento.',
	tryDiffName: 'Inserisci il nome di un file per favore.',
	waitCleared: 'Lista delle pagine in attesa svuotata',
	toUndef: 'La variabile "A" non è definita.',
	fileNameBlank: 'I nomi dei file non possono essere vuoti.',
	submittingContent: 'Inviando i contenuti della pagina',
	namespaceCheckbox: 'Includi i <span style="font-weight: bold">link</span> su tutti i namespace, es.: [[:File:File.png]] <span style="font-size: 9px;">(per default include solamente il namespace principale)</span>',
	failedDescription: 'Gli elementi falliti appariranno qui dopo l\'esecuzione. Tieni presente che le pagine su cui è usato il file per mezzo di un template appariranno erroneamente qui.',
	pagesWaiting: 'Le pagine stanno ancora aspettando di essere aggiunte alla coda. Se quello non è il caso, per favore usa il pulsante "Resetta lista di attesa" per poter eseguire la coda.',
	unableToMoveChoose: 'Per favore, inserisci un altro nome di destinazione per questo file.',
	unableToMoveFail: /* Image name */ 'è stato rimosso dalla coda.',
	singleButtonText: 'Sposta e aggiorna',
	queueButtonText: 'Aggiungi alla coda',
	fileInQueue: 'Quessto file è al momento nella tua coda per essere rinominato!',
	removeFromQueue: 'Rimuovi dalla coda',
	queueModalClose: 'Chiudi',
	queueModalManual: 'Aggiungi manualmente',
	queueModalReset: 'Resetta lista di attesa',
	queueModalUpdate: 'Aggiorna',
	queueModalExecute: 'Esegui',
	queueAddition: 'Aggiunta alla coda',
	manualModalDescription: 'Inserisci il nome del file di cui si vogliono aggiornare i link (non deve necessariamente esistere). I link saranno aggiornati, ma <span style="font-weight: bold;">nessun</span> file sarà spostato.',
	
	queueModalWaitConfirm: [
		'Questo resetterà la lista delle pagine in attesa per essere aggiunte alla coda in caso ci fosse un problema che ti impedisce di eseguire la coda stessa.',
		'Tieni presente che ci sono ancora',
		/* Number of pages */
		'pagine in attesa di essere aggiunte alla coda. Se sei assolutamente sicuro che non hai pagine aperte che sono in attesa di essere processate o che sia avvenuto un problema che ha interrotto il processso, allora premi OK per azzerare la lista delle pagine in attesa.',
		'Se hai delle pagine in attesa di essere processate, dovrai ricaricarle e riaggiungerle di nuovo alla lista..'
	],
	waitList: [
		'Numero',
		/* number on waitlist */
		'nella lista di attesa'
	],
	unableToFind: [
		'Impossibile trovare',
		/* Image Name */
		'nella  pagina',
		/* Page Name */
		'potrebbe essere aggiunto tramite un template. Per favore, controlla e rinomina manualmente se necessario.'
	],
	unableToMove: [
		'Non è stato possibile rinominare il file',
		/* Image Name */
		'in',
		/* Image Name */
		'per il seguente motivo:'
		/* error code */
	],
	unableToSubmit: [
		'Non è stato possibile inviare la pagina',
		/* Page Name */
		'per il seguente errore:',
		/* Image Name */
		'Aggiorna i link di quella pagina manualmente per favore.'
	],
	movePageNamespaceSelect: [
		'riguarda solamente l\'opzione',
		/* Single button name */
		'.'
	],
	movePageDescription: [
		'Il pulsante',
		/* Single button name */
		'aggiorna l\'uso di un singolo file sulle pagine, mentre il pulsante',
		/* Multi button name */
		'aggiunge il file ad una coda di aggiornamento che potrà essere eseguita in una sola volta in blocco. Quando si aggiorna l\'uso dei file usando la coda, verrà eseguita una singola modifica per tutti gli usi su una pagina piuttosto che una modifica per ogni utilizzo. Si può accedere ed eseguire la coda tramite il menù di modifica (pulsante "Modifica") presente su ogni pagina di file. Tieni presente che una coda è salvata localmente nel tuo browser e non è accessibile da altri browser o PC.'
	],
	
	movePageInfo: [
		'Lo script è stato aggiornato il',
		/* date */
		'Maggiori informazioni su aggiornamenti o sulle funzionalità possono essere trovate <a href="//dev.wikia.com/wiki/FileUsageAuto-update">qui</a>. Per favore, segnala dettagliatamente bug o mancati spostamenti sulla pagina di discussione.'
	]
};