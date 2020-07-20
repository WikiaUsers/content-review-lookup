//<source lang="javascript">
//////////////////////////////////////////////////
// Translatable strings
//////////////////////////////////////////////////
//
// See instructions at
// http://en.wikipedia.org/wiki/Wikipedia:Tools/Navigation_popups/Translation

var localPopupsInfoPage = '[[' + ( mw.config.get( 'wgDBname' ) == 'plwiki' ? '' : 'w:' ) + 'WP:POP|Popups]]';

popupStrings = {
	/////////////////////////////////////
	// summary data, searching etc.
	/////////////////////////////////////
	'article': 'artykuł',
	'category': 'kategoria',
	'categories': 'kategorie',
	'image': 'grafika',
	'images': 'grafiki',
	'stub': 'zalążek',
	'section stub': 'zalążek sekcji',
	'Empty page': 'Pusta strona',
	'kB': 'kB',
	'bytes': 'bajtów',
	'day': 'dzień',
	'days': 'dni',
	'hour': 'godzina',
	'hours': 'godziny',
	'minute': 'minuta',
	'minutes': 'minut',
	'second': 'sekunda',
	'seconds': 'sekund',
	'week': 'tydzień',
	'weeks': 'tygodni',
	'search': 'szukaj',
	'SearchHint': 'Szukaj artykułów zawierających %s',
	'web': 'w&nbsp;sieci',
	'global': 'xx.wiki',
	'globalSearchHint': 'Szukaj %s w różnych wersjach językowych Wikipedii',
	'googleSearchHint': 'Szukaj %s w Google',
	/////////////////////////////////////
	// article-related actions and info
	// (some actions also apply to user pages)
	/////////////////////////////////////
	'actions': 'akcje',         ///// view articles and view talk
	'popupsMenu': 'popups',
	'togglePreviewsHint': 'Zmień sposób generowania podglądu na tej stronie',
	'enable previews' : 'włącz podgląd',
	'disable previews' : 'wyłącz podgląd',
	'toggle previews': 'zmień wyświetlanie podglądu',
	'show preview': 'pokaż podgląd',
	'reset': 'resetuj',
	'more...': 'więcej...',
	'disable': 'wyłącz popups',
	'disablePopupsHint': 'Wyłącz popups na tej stronie. Przeładuj stronę, żeby włączyć ponownie.',
	'historyfeedHint': 'Kanał RSS z ostatnimi zmianami na tej stronie',
	'purgePopupsHint': 'Zresetuj popups i wyczyść jego pamięć podręczną.',
	'PopupsHint': 'Zresetuj popups i wyczyść jego pamięć podręczną.',
	'spacebar': 'spacja',
	'view': 'zobacz',
	'view article': 'zobacz artykuł',
	'viewHint': 'Idź do %s',
	'talk': 'dyskusja',
	'talk page': 'strona dyskusji',
	'this&nbsp;revision': 'tę&nbsp;wersję',
	'revision %s of %s': 'wersji %s strony %s',
	'Revision %s of %s': 'Wersja %s strony %s',
	'the revision prior to revision %s of %s': 'wersja poprzednia w stosunku do wersji %s strony %s',
	'Toggle image size': 'Zmień rozmiar obrazka',
	'del': 'usuń',                  ///// delete, protect, move
	'delete': 'usuń',
	'deleteHint': 'Usuń %s',
	'undeleteShort': '&nbsp;-&nbsp;',
	'UndeleteHint': 'Pokaż historię kasowań strony %s',
	'protect': 'zabezpiecz',
	'protectHint': 'Zabezpiecz %s',
	'unprotectShort': '&nbsp;-&nbsp;',
	'unprotectHint': 'Przywróć możliwość edycji strony %s przez wszystkich użytkowników',
	'move': 'przenieś',
	'move page': 'przenieś stronę',
	'MovepageHint': 'Przenieś stronę %s na stronę pod innym tytułem',
	'edit': 'edytuj',               ///// edit articles and talk
	'edit article': 'edytuj artykuł',
	'editHint': 'Zmień zawartość %s',
	'edit talk': 'edytuj dyskusję',
	'new': 'nowy',
	'new topic': 'nowy temat',
	'newSectionHint': 'Dodaj nowy temat (sekcję) w %s',
	'null edit': 'pusta edycja',
	'nullEditHint': 'Stwórz pustą edycję w %s, nic w nim nie zmieniając ',
	'hist': 'hist',                 ///// history, diffs, editors, related
	'history': 'historia',
	'historyHint': 'Pokaż historię zmian %s',
	'last': 'ost.',
	'lastEdit': 'ost.&nbsp;edycja',
	'mark patrolled': 'ozn. sprawdzone',
	'markpatrolledHint': 'Oznacz tę zmianę jako sprawdzoną',
	'show last edit': 'ostatnia edycja',
	'Show the last edit': 'Pokaż efekty najnowszej zmiany',
	'lastContrib': 'ost.&nbsp;zmiany',
	'last set of edits': 'ostatnio zmienione w artykule',
	'lastContribHint': 'Pokaż efekt zmian dokonanych przez ostatniego edytującego',
	'cur': 'bież',
	'diffCur': 'do&nbsp;bieżącej',
	'Show changes since revision %s': 'Pokaż zmiany od wersji %s',
	'%s old': 'wiek: %s', // as in 4 weeks old (to jest przy czasie od ostatniej edycji)
	'oldEdit': 'do&nbsp;wersji',
	'purge': 'odśwież',
	'purgeHint': 'Zażądaj odświeżenia strony %s',
	'raw': 'źródło',
	'rawHint': 'Pobierz źródło %s',
	'render': 'prosty',
	'renderHint': 'Pokaż uproszczoną wersję HTML strony %s',
	'Show the edit made to get revision': 'Pokaż zmiany do (tej) wersji',
	'sinceMe': 'do&nbsp;mojej',
	'changes since mine': 'zmiany od mojej edycji',
	'sinceMeHint': 'Pokaż zmiany od mojej ostatniej edycji',
	'Couldn\'t find an edit by %s\nin the last %s edits to\n%s': 'Nie można odnaleźć zmiany %s\nw w ostatnich %s edycjach strony\n%s',
	'eds': 'aut.',
	'editors': 'autorzy',
	'editorListHint': 'Pokaż autorów zmian strony %s',
	'related': 'dolinkowane',
	'relatedChanges': 'zm.&nbsp;dolinkowane',
	'related changes': 'zmiany w dolinkowanych',
	'RecentchangeslinkedHint': 'Ostatnie zmiany w stronach linkujących do %s',
	'editOld': 'edytuj&nbsp;wersję',            ///// edit old version, or revert
	'rv': 'rv',
	'revert': 'revert',
	'revertHint': 'Revert do %s',
	'defaultpopupRedlinkSummary': localPopupsInfoPage + ': Usuwanie linku do pustej strony [[%s]]',
	'defaultpopupFixDabsSummary': localPopupsInfoPage + ': Ujednoznacznienie linku z [[%s]] na [[%s]]',
	'defaultpopupFixRedirsSummary': localPopupsInfoPage + ': Zmiana linku ze strony przekierowującej [[%s]] na [[%s]]',
	'defaultpopupExtendedRevertSummary': localPopupsInfoPage + ': Przywrócenie wersji autora $2 z dnia $1',
	'defaultpopupRevertToPreviousSummary': localPopupsInfoPage + ': Przywrócenie wersji poprzedzającej wersję %s',
	'defaultpopupRevertSummary': localPopupsInfoPage + ': Przywrócenie wersji %s',
	'defaultpopupQueriedRevertToPreviousSummary': localPopupsInfoPage + ': Przywrócenie wersji poprzedzającej wersję autora $3 z dnia $2',
	'defaultpopupQueriedRevertSummary': localPopupsInfoPage + ': Przywrócenie wersji autora $3 z dnia $2',
	'defaultpopupRmDabLinkSummary': localPopupsInfoPage + ': Usunięcie linku do strony ujednoznaczniającej [[%s]]',
	'Redirects': 'Przekierowanie', // as in Redirects to ...
	' to ': ' do ',           // as in Redirects to ...
	'Bypass redirect': 'Omiń przekierowanie',
	'Fix this redirect': 'Napraw to przekierowanie',
	'disambig': 'ujednoznacznienie',          ///// add or remove dab etc.
	'disambigHint': 'Ujednoznacznij ten link do [[%s]]',
	'Click to disambiguate this link to:': 'Kliknij, by ujednoznacznić ten link do:',
	'remove this link': 'usuń ten link',
	'remove all links to this page from this article': 'usuń wszystkie linki do tej strony z tego artykułu',
	'remove all links to this disambig page from this article': 'usuń wszystkie linki do tej strony ujednoznaczniającej z tego artykułu',
	'mainlink': 'główny link',          ///// links, watch, unwatch
	'wikiLink': 'wikilink',
	'wikiLinks': 'wikilinków',
	'links here': 'linkujące',
	'whatLinksHere': 'linkujące',
	'what links here': 'linkujące',
	'WhatlinkshereHint': 'Pokaż listę stron linkujących do %s',
	'unwatchShort': '&nbsp;-&nbsp;',
	'watchThingy': 'obserwuj',  // called watchThingy because {}.watch is a function
	'watchHint': 'Dodaj stronę %s do listy obserwowanych',
	'unwatchHint': 'Usuń stronę %s z listy obserwowanych',
	'Only found one editor: %s made %s edits': 'Znaleziono tylko jednego autora: %s wykonał %s zmian',
	'%s seems to be the last editor to the page %s': '%s jest ostatnim autorem zmian na stronie %s',
	'rss': 'rss',
	/////////////////////////////////////
	// diff previews
	/////////////////////////////////////
	'Diff truncated for performance reasons': 'Diff został skrócony, aby przyśpieszyć działanie',
	'Old revision': 'Stara wersja',
	'New revision': 'Nowa wersja',
	'Something went wrong :-(': 'Coś poszło nie tak :-(',
	'Empty revision, maybe non-existent': 'Pusta wersja, prawdopodobnie nieistniejąca',
	'Unknown date': 'Nieznana data',
	/////////////////////////////////////
	// other special previews
	/////////////////////////////////////
	'Empty category': 'Pusta kategoria',
	'Category members (%s shown)': 'Należący do kategorii (%s pokazanych)',
	'No image links found': 'Nie znaleziono linków do grafik',
	'File links': 'Linki do plików',
	'No image found': 'Nie znaleziono grafiki',
	'Image from Commons': 'Ten plik jest z Wikimedia Commons.',
	'Description page': 'Strona opisu',
	'Alt text:': 'Alternatywny tekst:',
	'revdel':'Usunięta wersja',
	/////////////////////////////////////
	// user-related actions and info
	/////////////////////////////////////
	'user': 'użytkownik',               ///// user page, talk, email, space
	'user&nbsp;page': 'strona',
	'user talk': 'dyskusja użytkownika',
	'edit user talk': 'edytuj dyskusję użytkownika',
	'leave comment': 'zostaw komentarz',
	'email': 'e-mail',
	'email user': 'wyślij e-mail',
	'EmailuserHint': 'Wyślij e-mail do %s',
	'space': 'przestrzeń', // short form for userSpace link
	'PrefixIndexHint': 'Pokaż strony w przestrzeni użytkownika %s',
	'count': 'licznik',             ///// contributions, tree, log
	'edit counter': 'licznik edycji',
	'editCounterLinkHint': 'Licznik edycji użytkownika %s',
	'contribs': 'wkład',
	'contributions': 'wkład',
	'deletedContribs': 'usunięty wkład',
	'DeletedcontributionsHint': 'Usunięty wkład użytkownika %s',
	'ContributionsHint': 'Pokaż listę edycji użytkownika %s',
	'log': 'log',
	'user log': 'logi użytkownika',
	'userLogHint': 'Pokaż logi użytkownika %s',
	'arin': 'szukaj w ARIN',             ///// ARIN lookup, block user or IP
	'Look up %s in ARIN whois database': 'Szukanie %s w bazie danych whois - ARIN',
	'unblockShort': '&nbsp;-&nbsp;',
	'block': 'blokuj',
	'block user': 'blokuj użytkownika',
	'IpblocklistHint': 'Odblokuj użytkownika %s',
	'BlockipHint': 'Zablokuj możliwość edycji użytkownikowi %s',
	'block log': 'logi blokowań',
	'blockLogHint': 'Pokaż logi blokowania dla %s',
	'protectLogHint': 'Pokaż logi zabezpieczania dla %s',
	'pageLogHint': 'Pokaż log strony %s',
	'deleteLogHint': 'Pokaż logi kasowania dla %s',
	'Invalid %s %s': 'Opcja %s jest nieprawidłowa: %s',
	'No backlinks found': 'Nie znaleziono linków powrotnych',
	' and more': ' i więcej',
	'undo': 'anuluj zmiany',
	'undoHint': 'anuluj zmiany dokonane w tej edycji',
	'Download preview data': 'Pobierz dane dla podglądu',
	'Invalid or IP user': 'Invalid or IP user', //FIXME
	'Not a registered username': 'Not a registered username', //FIXME
	'BLOCKED': 'ZABLOKOWANY',
	' edits since: ': ' edycji od: ',
	/////////////////////////////////////
	// Autoediting
	/////////////////////////////////////
	'Enter a non-empty edit summary or press cancel to abort': 'Wypełnij opis zmian albo wciśnij Anuluj, aby zakończyć',
	'Failed to get revision information, please edit manually.\n\n': 'Pobranie danych o wersji okazało się niemożliwe – zmień samodzielnie.\n\n',
	'The %s button has been automatically clicked. Please wait for the next page to load.': 'Uwaga! Przycisk %s został wciśnięty automatycznie. Proszę czekać na przeładowanie strony.',
	'Could not find button %s. Please check the settings in your javascript file.': 'Nie odnaleziono przycisku %s. Proszę sprawdzić ustawienia w swoim pliku JavaScript.',
	/////////////////////////////////////
	// Popups setup
	/////////////////////////////////////
	'Open full-size image': 'Otwórz obrazek w wersji pełnoekranowej.',
	'zxy': 'zxy'
};
//</source>