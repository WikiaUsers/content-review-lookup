LIR.i18n.pl= {
	queueModalTitle: 'Kolejka aktualizacji nazw plików',
	fileNamespace: 'Plik',
	imageNamespace: 'Grafika',
	videoNamespace: 'Wideo', //No longer allowed alias. I don't know what it was in the past, but I might as well try to guess something. What can possibly go wrong?
	using: 'Korzystanie z', //Replaced from "Using" - needs testing for context
	queue: 'Kolejka',
	userBlogCommentNamespace: 'Komentarz na blogu',
	editSummary: 'Aktualizacja nazw plików (automatycznie)',
	filesInQueue: 'Pliki w kolejce',
	oldFileName: 'Stara nazwa pliku',
	newFileName: 'Nowa nazwa pliku',
	addToQueue: 'Dodaj do kolejki',
	nameInUse: 'Nazwa docelowa już jest używana albo jest w kolejce do użycia.',
	alreadyInQueue: 'Plik już jest w kolejce.',
	invalidExtension: 'Nieprawidłowe rozszerzenie pliku.',
	blogComment: 'Plik użyty w komentarzu na blogu. Aktualizacja niemożliwa.',
	fileNotUsed: 'Plik nie jest używany na żadnej stronie.',
	noQueueExists: 'Nie ma żadnej kolejki do uruchomienia',
	itemRemoved: 'Usunięto z kolejki',
	destInUse: 'Nazwa docelowa jest już zajęta.',
	processing: 'Praca w toku',
	successful: 'Zakończono powodzeniem.',
	varsUndef: 'Nie zdefiniowano zmiennych. Sprawdź kod.',
	queueComplete: 'Wykonywanie kolejki zakończone',
	queueStarted: 'Kolejka uruchomiona',
	contentsRetrieved: 'Pobrano i zapisano zawartość strony',
	queueUpdate: 'Kolejka zaktualizowana',
	nothingInQueue: 'Kolejka jest pusta.',
	tryDiffName: 'Proszę wpisać nazwę pliku.',
	waitCleared: 'Wyczyszczono listę stron oczekujących',
	toUndef: 'Zmienna „To” nie została określona.',
	fileNameBlank: 'Nazwa pliku nie może być pusta',
	submittingContent: 'Zapisywanie strony',
	namespaceCheckbox: 'Uwzględnia <span style="font-weight: bold">linki</span> we wszystkich przestrzeniach, np. [[:Plik:Plik.png]] <span style="font-size: 9px;">(domyślnie tylko w przestrzeni głównej)</span>',
	failedDescription: 'Tutaj zostaną uwzględnione wszelkie nieudane podmiany. Obrazy stranskludowane ze strony szablonu wywołają fałszywe alarmy.',
	pagesWaiting: 'Nadal wykryto strony oczekujące na dodanie do kolejki. Jeśli to nieprawda, skorzystaj z przycisku „Zresetuj listę”.',
	unableToMoveChoose: 'Proszę wybrać inną nazwę docelową dla tego pliku.',
	unableToMoveFail: /* Image name */ 'został usunięty z kolejki.',
	singleButtonText: 'Przenieś i zastąp',
	queueButtonText: 'Dodaj do kolejki',
	fileInQueue: 'Ten plik jest już w kolejce do zmiany nazwy.',
	removeFromQueue: 'Usuń z kolejki',
	queueModalClose: 'Zamknij',
	queueModalManual: 'Dodaj ręcznie',
	queueModalReset: 'Zresetuj listę',
	queueModalUpdate: 'Odśwież',
	queueModalExecute: 'Uruchom',
	queueAddition: 'Ręczne dodawanie do kolejki',
	manualModalDescription: 'Wpisz nazwę pliku (może być nieistniejący) do ręcznego zaktualizowania. Jedynie linki na stronach zostaną podmienione, natomiast sam plik <span style="font-weight: bold">nie zostanie</span> przeniesiony, nawet jeśli istnieje. Przydatne do naprawiania redlinków i zastępowania jednego pliku drugim (na przykład w przypadku duplikatów)',
	
	queueModalWaitConfirm: [
		'Ta opcja zresetuje listę stron oczekujących na dodanie do kolejki w przypadku problemów z przetwarzaniem strony, które uniemożliwiają wykonywanie kolejki.',
		'Liczba stron oczekujących na dodanie do kolejki:',
		/* Number of pages */
		'',
		'Wciśnij „OK”, żeby kontynuować. Wszelkie niedokończone próby dodania do kolejki będą musiały zostać ponowione po odświeżeniu stron.'
	],
	waitList: [
		'Pozycja nr',
		/* number on waitlist */
		'na liście oczekujących'
	],
	unableToFind: [
		'',
		/* Image Name */
		'nie został odnaleziony na stronie',
		/* Page Name */
		'ale mógł być straskludowany przez szablon. Sprawdź ręcznie w razie potrzeby.'
	],
	unableToMove: [
		'Nazwa pliku',
		/* Image Name */
		'nie mogła zostać zmieniona na',
		/* Image Name */
		'z następującego powodu:'
		/* error code */
	],
	unableToSubmit: [
		'Strona',
		/* Page Name */
		'nie mogła zostać zapisana z powodu następującego błędu:',
		/* Image Name */
		'Proszę zaktualizować linki ręcznie.'
	],
	movePageNamespaceSelect: [
		'wpływa tylko na opcję',
		/* Single button name */
		''
	],
	movePageDescription: [
		'Przycisk',
		/* Single button name */
		'zaktualizuje wszystkie artykuły o nową nazwę pliku, podczas gdy przycisk',
		/* Multi button name */
		'doda plik do kolejki tak, aby w przypadku zmiany wielu plików w jednym artykule zostały one zaktualizowane za jednym zamachem. Kolejka może zostać wyświetlona na dowolnej stronie pliku z wysuwanego menu przy przycisku "Edytuj". Dane z kolejki zapisują się tylko dla jednej przeglądarki i nie przechodzą na inne przeglądarki bądź komputery.'
	],
	
	movePageInfo: [
		'Skrypt zaktualizowano',
		/* date */
		'Więcej informacji na temat uaktualnień i funkcji znajdziesz <a href="//dev.wikia.com/wiki/FileUsageAuto-update">tutaj</a>. Prosimy o szczegółowe opisywanie błędów i pominiętych zmian nazw plików na stronie dyskusji.'
	]
};