//Translated by SpacePucky & Dragon Rainbow

LIR.i18n.de= {
	queueModalTitle: 'Dateibenutzungs-Aktualsierungs-Warteschlange',
	fileNamespace: 'Datei',
	imageNamespace: 'Bild',
	videoNamespace: 'Video',
	using: 'Verwendung',
	queue: 'Warteschlange',
	userBlogCommentNamespace: 'Benutzer Blog Kommentare', // Will always use the translated version because it's returned from the API (hopefully)
	editSummary: 'Dateilinks aktualisiert (automatisch)',
	filesInQueue: 'Dateien in der Warteschlange',
	oldFileName: 'Alter Dateiname',
	newFileName: 'Neuer Dateiname',
	addToQueue: 'Zur Warteschlange hinzufügen',
	nameInUse: 'Der gewählte Name ist bereits in der Warteschlange oder wird schon verwendet.',
	alreadyInQueue: 'Die Datei wurde der Warteschlange bereits hinzugefügt.',
	invalidExtension: 'Fehlerhafte Dateierweiterung.',
	blogComment: 'Die Datei wird in einem Blog-Kommentar verwendet. Es ist nicht möglich, Dateinamen in Blog-Kommentaren zu ändern.',
	fileNotUsed: 'Die Datei wird auf keiner Seite verwendet.',
	noQueueExists: 'Die Warteschlange ist leer.',
	itemRemoved: 'Datei entfernt',
	destInUse: 'Der gewählte Name wird bereits verwendet.',
	processing: 'Verarbeitung...',
	successful: 'Erfolgreich.',
	varsUndef: 'Variablen sind nicht definiert, überprüfe den Code.',
	queueComplete: 'Die Warteschlange wurde abgearbeitet',
	queueStarted: 'Die Warteschlange wird jetzt abgearbeitet',
	contentsRetrieved: 'Seiteninhalt wurde abgerufen und abgespeichert',
	queueUpdate: 'Warteschlange aktualisiert',
	nothingInQueue: 'Die Warteschlange ist aktuell leer.',
	tryDiffName: 'Bitte gib einen Dateinamen ein.',
	waitCleared: 'Wartende Seiten gelöscht',
	toUndef: 'Es wurde kein gültiges Ziel angegeben.',
	fileNameBlank: 'Dateinamen können nicht leer sein.',
	submittingContent: 'Seiteninhalt wird gespeichert',
	namespaceCheckbox: 'Einschließen von <span style="font-weight: bold">Links</span> aus allen Namensräumen, wie z. B.: [[:File:File.png]] <span style="font-size: 9px;">(beinhaltet normalerweise nur Artikel-Links).</span>',
	failedDescription: 'Fehler werden hier nach der Ausführung erscheinen. Beachte, dass Seiten, die das Bild durch eine Vorlage erhalten, hier fälschlicherweise auch aufgelistet werden.',
	pagesWaiting: 'Die Seiten warten noch immer darauf, zur Warteschlange hinzugefügt zu werden. Wenn dies nicht der Fall sein sollte, benutze bitte den "Wartende Seiten zurücksetzen"-Button, um den Vorgang ausführen zu können.',
	unableToMoveChoose: 'Bitte gib für diese Datei einen neuen Zielnamen ein.',
	unableToMoveFail: /* Image name */ 'wurde aus der Warteschlange entfernt.',
	singleButtonText: 'Umbenennen und aktualisieren.',
	queueButtonText: 'Zur Warteschlange hinzufügen.',
	fileInQueue: 'Diese Datei befindet sich aktuell in der Warteschlange der umzubenennenden Dateien!',
	removeFromQueue: 'Aus der Warteschlange entfernen',
	queueModalClose: 'Schließen',
	queueModalManual: 'Manuell hinzufügen',
	queueModalReset: 'Wartende Seiten zurücksetzen',
	queueModalUpdate: 'Aktualisieren',
	queueModalExecute: 'Ausführen',
	queueAddition: 'Warteschlangen Ergänzung',
	manualModalDescription: 'Gib den Namen einer Datei ein, um Links davon zu aktualisieren (es muss nicht existieren).  Links werden aktualisiert, aber es werden <span style="font-weight: bold;">keine</span> Dateien entfernt.',
 
	queueModalWaitConfirm: [
		'Dies wird die Seiten entfernen, die darauf warten, der Warteschlange hinzugefügt zu werden. Falls es ein Problem gab ein Seite auszuführen, wird dich dies davon abhalten, den Prozess zu starten.',
		'Beachte, dass noch immer',
		/* Number of pages */
		'Seite(n) darauf warten, der Warteschlange hinzugefügt zu werden.  Wenn du dir absolut sicher bist, dass du im Moment keine Seiten geöffnet hast, die auf eine Durchführung warten oder, dass ein Problem aufgetaucht ist, das die Durchführung aufhält, dann drücke "OK", um die Liste der wartenden Seiten zu leeren.',
		'Wenn du Seiten hast, die darauf warten, bearbeitet zu werden, musst du neu laden und diese Seiten erneut zur Warteschlange hinzufügen.'
	],
	waitList: [
		'Nummer',
		/* number on waitlist */
		'auf der Warteliste'
	],
	unableToFind: [
		'Es war nicht möglich,',
		/* Image Name */
		'auf der Seite',
		/* Page Name */
		'zu finden. Vielleicht wurde die Datei durch eine Vorlage hinzugefügt. Bitte überprüfe das und benenne manuell um, wenn nötig.'
	],
	unableToMove: [
		'Die Datei',
		/* Image Name */
		'konnte nicht zu',
		/* Image Name */
		'verschoben werden. Grund:'
		/* error code */
	],
	unableToSubmit: [
		'Die Seite',
		/* Page Name */
		'konnte nicht gespeichert werden, wegen Fehler:',
		/* Image Name */
		'Bitte aktualisiere die Links/den Link manuell.'
	],
	movePageNamespaceSelect: [
		'only affects',
		/* Single button name */
		'option'
	],
	movePageDescription: [
		'Der',
		/* Single button name */
		'Button aktualisiert Dateibenutzungen auf Seiten für ein einzelnes Bild, während der',
		/* Multi button name */
		'Button Dateinutzungen des Bildes, zu einer Warteschlange hinzufügt, um sie als Gruppe zu aktualisieren. Wenn Dateibenutzungen durch die Warteschlange aktualisiert werden, werden Benutzungen auf der selben Seite zu einer Gruppe gemacht, um die Nutzungen mit einer Bearbeitung zu aktualisieren. Auf die Warteschlange kann auf jeder Datei-Seite durch das "Bearbeiten"-Menü zugegriffen werden. Bitte beachte, dass eine gespeicherte Warteschlange lokal für einen Browser gespeichert ist und nicht auf anderen Browsern/Computern darauf zugegriffen werden kann.'
	],
 
	movePageInfo: [
		'Script updated',
		/* date */
		'Mehr Informationen über Updates und Funktionen können <a href="//dev.wikia.com/wiki/FileUsageAuto-update">hier</a> eingesehen werden.  Bitte melde Bugs oder falsche Ersetzungen detailliert auf der Diskussionsseite.'
	]
};