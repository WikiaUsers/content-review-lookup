/* 
 * Массовая Категоризация
 * @description (De)Categorize listed multiple pages.
 * @автор Ozuzanna, Dorumin
 * @todo добавить больше i18n
 * Добавлена опция <noinclude></include> (Dessamator)
 * Улучшено: (Dorumin)
 *     - Некоторая оптимизация и очистка кода.
 *     - Повторно добавлена функция replace.
 *     - Теперь можно добавлять, удалять и заменять сразу несколько категорий (но не все три режима одновременно).
 *     - Теперь запрашивает подтверждение, если вы пытаетесь выйти из модального окна во время работы.
 *     - Широкая опция теперь не заменяет такие вещи, как "Test 123", но я сохранил эту опцию в любом случае. 
 */
 
mw.loader.using('mediawiki.api').then(function() {

    var groups = window.MassCategorizationGroups || ['autoconfirmed', 'bot', 'sysop'];
    if (
        window.MassCategorizationLoaded ||
        !mw.config.get('wgUserGroups').some(function(el) {
            return groups.indexOf(el) !== -1;
        })
    ) {
        return;
    }
    window.MassCategorizationLoaded = true;

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:MassCategorization.css'
    });

	var i18n = {
		//language list - start
		en: {
			title: "Mass Categorization",
			mode: "Mode",
			add: "Add",
			remove: "Remove",
			replace: "Replace",
			category: "Category",
			categoryPlural: "Categories",
			replaceWith: "Replace with",
			matching: "Matching",
			generalMatching: "General (does not account for piped categories)",
			broadMatching: "Broad (takes care of piped links)",
			noInclude: "Do not include in transclusion (for templates)",
			caseSensitive: "Case sensitive (removal and replace only)",
			instructions: "Put the name of each page you want to categorize on a separate line",
			outputInitial: "Any errors encountered will appear below",
			cancel: "Cancel",
			addCategoryContents: "Add category contents",
			initiate: "Initiate",
			categoryPrompt: "Please enter the category name (no category prefix)",
			doesNotExist: "$1 does not exist",
			failedToGetContents: "Failed to get contents of $1",
			categoryAlert: "Please enter at least one category",
			warning: "Warning",
			closeModalWarning: "Are you sure you want to close the modal without finishing?",
			close: "Close",
			finished: "Finished",
			nothingLeftToDo: "Nothing left to do, or next line is blank",
			noCategoryToReplace: "No $1 to replace with entered",
			pageNotExist: "Page $1 does not exist",
			addSummary: "Adding $1 (automatic)",
			addFail: "Failed to add $1 to $2",
			categoryAlready: "$1 already has the category $2 or an error was encountered; it has been skipped",
			categoryCheckFail: "Category check failed for $1; it has been skipped",
			removeNotFound: "$1 was not found on $2",
			removeFail: "Failed to remove $1 from $2",
			removeSuccess: "$1 successfully removed from $2",
			removeSummary: "Removing $1 (automatic)",
			replaceFail: "Failed to replace $1 on $2",
			replaceSuccess: "Category successfully replaced on $1",
			replaceSummary: "Replacing $1 with $2 (automatic)",
			multiReplaceSummary: "Replacing categories: $1 (automatic)",
			noCategoryReplace: "No category to replace",
			automatic: "automatic"
		},
		be: {
			title: "Масавая катэгарызацыя",
			mode: "Дзеянне",
			add: "Дадаць",
			remove: "Выдаліць",
			replace: "Перасунуць",
			category: "Катэгорыя",
			categoryPlural: "Катэгорыі",
			replaceWith: "Замяніць на",
			matching: "Параўнанне",
			generalMatching: "Звычайнае (не ўлічвае асобныя катэгорыі)",
			broadMatching: "Пашыранае (улічвае асобныя спасылкі)",
			noInclude: "Не ўлічваць улучэння (для шаблонаў)",
			caseSensitive: "З улікам рэгістра (толькі для опцый выдаленні і перасоўванні)",
			instructions: "Змясцуйце тут назву старонкі, якую вы хочаце змясціць у катэгорыю ў асобным радку",
			outputInitial: "Тут будуць з\'яўляцца ўсе абмылы",
			cancel: "Скасаванне",
			addCategoryContents: "Дадаць змесціва катэгорыі",
			initiate: "Запусціць",
			categoryPrompt: "Калі ласка, пакажыце назву катэгорыі (без прэфікса Катэгорыя:)",
			doesNotExist: "$1 не існуе",
			failedToGetContents: "Не атрымалася стварыць $1",
			categoryAlert: "Калі ласка, пастаўце хоць бы адну катэгорыю",
			warning: "Папярэджанне",
			closeModalWarning: "Вы ўпэўнены, што хочаце адключыць гэты скрыпт без захавання якіх-небудзь катэгорый?",
			close: "Зачыніць",
			finished: "Завершана",
			nothingLeftToDo: "Вам не трэба нічога рабіць далей ці наступны радок пусты",
			noCategoryToReplace: "Вы не можаце перасунуць старонкі $1",
			pageNotExist: "Старонка $1 не існуе",
			addSummary: "Дададзена $1 (аўтаматычна)",
			addFail: "Не атрымалася дадаць $1 у $2",
			categoryAlready: "$1 вужы ў катэгорыі $2 ці адбылася абмыла, дадзеная назва была прапушчана",
			categoryCheckFail: "Катэгорыя $1 не знойдзена; дадзеная назва была прапушчана",
			removeNotFound: "$1 не было знойдзена ў $2",
			removeFail: "Не атрымалася выдаліць $1 з $2",
			removeSuccess: "$1 было выдалена з $2",
			removeSummary: "Выдалена з $1 (аўтаматычна)",
			replaceFail: "Не атрымалася замяніць $1 на $2",
			replaceSuccess: "Катэгорыя паспяхова заменена на $1",
			replaceSummary: "Замена $1 на $2 (аўтаматычна)",
			multiReplaceSummary: "Замена катэгорый: $1 (аўтаматычна)",
			noCategoryReplace: "Няма катэгорыі для замены",
			automatic: "аўтаматычна"
		},
		ca: {
			title: 'Categorització en massa',
			mode: 'Manera',
			add: 'Afegeix',
			remove: 'Treu',
			replace: 'Reemplaça',
			category: 'Categoria',
			categoryPlural: 'Categories',
			replaceWith: 'Reemplaça amb',
			matching: 'Coincidències',
			generalMatching: "General (no té en compte les categories amb barra)",
			broadMatching: "Extensa (té en compte les categories amb barra)",
			noInclude: "No ho incloguis a la transclusió (per a plantilles)",
			caseSensitive: "Té en compte majúscules i minúscules (només en les maneres de treure i reemplaçar)",
			instructions: "Introdueix el nom de cada pàgina que vulguis categoritzar en una línia separada",
			outputInitial: "Qualsevol error trobat apareixerà a baix",
			cancell: "Canceŀla",
			addCategoryContents: "Afegeix contingut de categoria",
			initiate: "Inicia",
			categoryPrompt: "Si us plau, introdueix el nom de la categoria (sense el prefix de Categoria)",
			doesNotExist: "$1 no existeix",
			failedToGetContents: "Error per carregar continguts de $1",
			categoryAlert: "Introdueix almenys una categoria",
			warning: "Advertència",
			closeModalWarning: "Estàs segur que vols tancar el mòdul sense acabar?",
			close: "Tanca",
			finished: "Finalitzat",
			nothingLeftToDo: "Res més per fer, o la següent línia està en blanc",
			noCategoryToReplace: "Cap $1 per reemplaçar s\'ha introduït",
			pageNotExist: "La pàgina $1 no existeix",
			addSummary: "Afegint $1 (automàtic)",
			addFail: "Error en afegir $1 a $2",
			categoryAlready: "$1 ja conté la categoria $2 o algun error s\'ha trobat; ha estat omesa",
			categoryCheckFail: "La verificació de categories ha fallat per a la pàgina $1; aquesta ha estat omesa",
			removeNotFound: "$1 no s\'ha trobat a la pàgina $2",
			removeSummary: "Traient $1 (automàtic)",
			removeFail: "Error traient $1 de la pàgina $2",
			replaceSummary: "Reemplaçant $1 amb $2 (automàtic)",
			multiReplaceSummary: 'Reemplaçant categories: $1 (automàtic)',
			removeSuccess: "$1 s\'ha tret de la pàgina $2 amb èxit",
			replaceFail: "Error en reemplaçar $1 a la pàgina $2",
			replaceSuccess: "Categoria reemplaçada amb èxit a la pàgina $1",
			noCategoryReplace: "Cap categoria per reemplaçar",
			automatic: "automàtic"
		},
		de: {
			title: "Mehrfaches Kategorisieren",
			mode: "Modus",
			add: "Hinzufügen",
			remove: "Entfernen",
			replace: "Ersetzen",
			category: "Kategorie",
			categoryPlural: "Kategorien",
			replaceWith: "Ersetze mit",
			matching: "Übereinstimmungen",
			generalMatching: "Allgemein (ausgenommen Kategorie-Links mit senkrechtem Strich)",
			broadMatching: "Breit (berücksichtigt Links mit senkrechtem Strich)",
			noInclude: "Schließe Einbindungen nicht mit ein (für Vorlagen)",
			caseSensitive: "Groß-/Kleinschreibung beachten (nur Entfernen und Ersetzen)",
			instructions: "Schreibe den Namen jeder Seite, die du kategorisieren willst, jeweils in eine eigene Zeile",
			outputInitial: "Alle aufgetretenden Fehler werden unten angezeigt",
			cancel: "Abbrechen",
			addCategoryContents: "Kategorien-Inhalte hinzufügen",
			initiate: "Start",
			categoryPrompt: "Bitte füge den Namen der Kategorie ein (kein Kategorie-Präfix)",
			doesNotExist: "$1 existiert nicht",
			failedToGetContents: "Abrufen der Inhalte aus $1 fehlgeschlagen",
			categoryAlert: "Bitte mindestens eine Kategorie eingeben",
			warning: "Warnung",
			closeModalWarning: "Willst du das Modul wirklich schließen ohne deine Arbeit zu beenden?",
			close: "Schließen",
			finished: "Erledigt",
			nothingLeftToDo: "Nichts mehr zu tun, oder die nächste Zeile ist leer",
			noCategoryToReplace: "Keine $1 mit der eingegebenen Kategorie zu ersetzen",
			pageNotExist: "Die Seite $1 existiert nicht",
			addSummary: "Füge $1 hinzu (automatisch)",
			addFail: "Das Hinzufügen von $1 zu $2 ist fehlgeschlagen",
			categoryAlready: "$1 hat die Kategorie $2 bereits oder ein Fehler ist aufgetreten; die Seite wurde übersprungen",
			categoryCheckFail: "Überprüfung der Kategorie für $1 fehlgeschlagen; sie wurde übersprungen",
			removeNotFound: "$1 wurde auf $2 nicht gefunden",
			removeFail: "Das Entfernen von $1 von $2 ist fehlgeschlagen",
			removeSuccess: "$1 erfolgreich von $2 entfernt",
			removeSummary: "Entferne $1 (automatisch)",
			replaceFail: "Das Ersetzen von $1 auf $2 ist fehlgeschlagen",
			replaceSuccess: "Kategorie erfolgreich auf $1 ersetzt",
			replaceSummary: "Ersetze $1 mit $2 (automatisch)",
			multiReplaceSummary: "Ersetze Kategorien: $1 (automatisch)",
			noCategoryReplace: "Keine Kategorie zum Ersetzen",
			automatic: "automatisch"
		},
		es: {
			title: 'Categorización en masa',
			mode: 'Modo',
			add: 'Añadir',
			remove: 'Quitar',
			replace: 'Reemplazar',
			category: 'Categoría',
			categoryPlural: 'Categorías',
			replaceWith: 'Reemplazar con',
			matching: 'Coincidencias',
			generalMatching: "General (no toma en cuenta las categorías con barra)",
			broadMatching: "Extensa (toma en cuenta las categorías con barra)",
			noInclude: "No incluir en transclusión (para plantillas)",
			caseSensitive: "Toma en cuenta mayúsculas y minúsculas (solo en las modos de quitar y reemplazar)",
			instructions: "Introduce el nombre de cada página que quieras categorizar en una línea separada",
			outputInitial: "Cualquier error encontrado aparecerá abajo",
			cancel: "Cancelar",
			addCategoryContents: "Añadir contenido de categoría",
			initiate: "Iniciar",
			categoryPrompt: "Por favor, introduce el nombre de la categoría (sin el prefijo de Categoría)",
			doesNotExist: "$1 no existe",
			failedToGetContents: "Error para cargar contenidos de $1",
			categoryAlert: "Introduce al menos una categoría",
			warning: "Advertencia",
			closeModalWarning: "¿Estás seguro de que quieres cerrar el módulo sin terminar?",
			close: "Cerrar",
			finished: "Finalizado",
			nothingLeftToDo: "Nada más que hacer, o la siguiente línea está en blanco",
			noCategoryToReplace: "Ninguna $1 para reemplazar se ha introducido",
			pageNotExist: "La página $1 no existe",
			addSummary: "Añadiendo $1 (automático)",
			addFail: "Error al añadir $1 a $2",
			categoryAlready: "$1 ya contiene la categoría $2 o algún error se ha encontrado; ha sido omitida",
			categoryCheckFail: "La verificación de categorías ha fallado para la página $1; ésta ha sido omitida",
			removeNotFound: "$1 no se ha encontrado en la página $2",
			removeSummary: "Removiendo $1 (automático)",
			removeFail: "Error removiendo $1 de la página $2",
			replaceSummary: "Reemplazando $1 con $2 (automático)",
			multiReplaceSummary: 'Reemplazando categorías: $1 (automático)',
			removeSuccess: "$1 se ha removido de la página $2 con éxito",
			replaceFail: "Error al reemplazar $1 en la página $2",
			replaceSuccess: "Categoría reemplazada con éxito en la página $1",
			noCategoryReplace: "Ninguna categoría para reemplazar",
			automatic: "automático"
		},
		fr: {
			title: 'Catégorisation massive',
			mode: 'Façon',
			add: 'Ajouter',
			remove: 'Enlever',
			replace: 'Remplacer',
			category: 'Catégorie',
			categoryPlural: 'Catégories',
			replaceWith: 'Remplacer avec',
			matching: 'Coïncidences',
			generalMatching: "Général (ne prend pas en compte les catégories avec barre)",
			broadMatching: "Étendue (en prenant en compte les catégories avec barre)",
			noInclude: "Ne pas inclure dans la transclusion (pour les modèles)",
			caseSensitive: "En prenant en compte majuscules et minuscules (seulement dans les façons d\'enlever et remplacer)",
			instructions: "Introduisez le nom de chaque page dans n\'importe quelle page que vous voulez catégoriser dans une ligne séparée",
			outputInitial: "N\'importe quelle erreur trouvée apparaîtra en bas",
			cancel: "Annuler",
			addCategoryContents: "Ajouter le contenu de la catégorie",
			initiate: "Entamer",
			categoryPrompt: "S\'il vous plaît, introduisez le nom de la catégorie (sans le préfixe de Catégorie)",
			doesNotExist: "$1 n\'existe pas",
			failedToGetContents: "Erreur lors du chargement des contenus de $1",
			categoryAlert: "Introduisez au moins une catégorie",
			warning: "Avertissement",
			closeModalWarning: "Êtes-vous sûr que vous voulez fermer le module sans terminer ?",
			close: "Fermer",
			finished: "Terminé",
			nothingLeftToDo: "Il n'y a plus rien à faire, ou la suivante ligne est vide",
			noCategoryToReplace: "Aucune $1 pour remplacer s\'est introduit",
			pageNotExist: "La page $1 n\'existe pas",
			addSummary: "En train d\'ajouter $1 (automatique)",
			addFail: "Erreur lors de l\'ajout de la page $1 à $2",
			categoryAlready: "$1 déjà contient la catégorie $2 ou quelque erreur s\'est trouvée; il a été omis",
			categoryCheckFail: "La vérification de catégories a failli pour la page $1; elle a été omise",
			removeNotFound: "$1 ne s\'est pas trouvé sur la page $2",
			removeSummary: "En train de supprimer $1 (automatique)",
			removeFail: "Erreur lors de la suppression de $1 de la page $2",
			replaceSummary: "En train de remplacer $1 avec $2 (automatique)",
			multiReplaceSummary: 'En train de remplacer les catégories: $1 (automatique)',
			removeSuccess: "$1 s\'est supprimé de la page $2 avec succès",
			replaceFail: "Erreur lors du remplacement de $1 sur la page $2",
			replaceSuccess: "Catégorie remplacée avec succès sur la page $1",
			noCategoryReplace: "Aucune catégorie pour remplacer",
			automatic: "automatique"
		},
		gl: {
			title: 'Categorización en masa',
			mode: 'Modo',
			add: 'Engadir',
			remove: 'Quitar',
			replace: 'Substituír',
			category: 'Categoría',
			categoryPlural: 'Categorías',
			replaceWith: 'Substituír con',
			matching: 'Coincidencias',
			generalMatching: "Xeral (non toma en conta as categorías con barra)",
			broadMatching: "Extensa (toma en conta as categorías con barra)",
			noInclude: "Non incluír en transclusión (para modelos)",
			caseSensitive: "Toma en conta maiúsculas e minúsculas (só nos modos de quitar e substituír)",
			instructions: "Introduce o nome de cada páxina que quixeres categorizar nunha liña separada",
			outputInitial: "Calquera erro atopado aparecerá abaixo",
			cancel: "Cancelar",
			addCategoryContents: "Engadir contido de categoría",
			initiate: "Iniciar",
			categoryPrompt: "Por favor, introduce o nome da categoría (sen o prefixo de Categoría)",
			doesNotExist: "$1 non existe",
			failedToGetContents: "Erro ao cargar contidos de $1",
			categoryAlert: "Introduce polo menos unha categoría",
			warning: "Advertencia",
			closeModalWarning: "Estás seguro de que queres pechar o módulo sen terminar?",
			close: "Pechar",
			finished: "Finalizado",
			nothingLeftToDo: "Máis nada para facer, ou a seguinte liña está en branco",
			noCategoryToReplace: "Ningunha $1 para substituír foi introducida",
			pageNotExist: "A páxina $1 non existe",
			addSummary: "A engadir $1 (automático)",
			addFail: "Erro ao engadir $1 a $2",
			categoryAlready: "$1 xa contén a categoría $2 ou algún erro foi atopado; daquela foi omitida",
			categoryCheckFail: "A verificación de categorías fallou para a páxina $1; daquela foi omitida",
			removeNotFound: "$1 non se atopou na páxina $2",
			removeSummary: "A remover $1 (automático)",
			removeFail: "Erro ao remover $1 da páxina $2",
			replaceSummary: "A substituír $1 con $2 (automático)",
			multiReplaceSummary: 'A substituír categorías: $1 (automático)',
			removeSuccess: "$1 removeuse da páxina $2 con éxito",
			replaceFail: "Erro ao substituír $1 na páxina $2",
			replaceSuccess: "Categoría substituída con éxito na páxina $1",
			noCategoryReplace: "Ningunha categoría para substituír",
			automatic: "automático"
		},
		hi: {
			title: "मास वर्गीकरण",
			mode: "मोड",
			add: "जोड़ें",
			remove: "निकालें",
			replace: "बदलें",
			category: "श्रेणी",
			categoryPlural: "चैनल",
			replaceWith: "के साथ बदलें",
			matching: "मिलान",
			generalMatching: "जनरल (पहुंचाया श्रेणियों के लिए खाते में नहीं है)",
			broadMatching: "ब्रॉड (पहुंचाया लिंक का ख्याल रखता है)",
			noInclude: "(टेम्पलेट्स के लिए) ट्रांसक्लुजन में शामिल न करें",
			caseSensitive: "प्रकरण संवेदनशील (हटाने और केवल जगह)",
			instructions: "प्रत्येक पृष्ठ आप एक अलग लाइन पर वर्गीकृत करने के लिए चाहते हैं के नाम रखो",
			outputInitial: "नीचे दिखाई देगा का सामना करना पड़ा किसी भी त्रुटि",
			cancel: "रद्द",
			addCategoryContents: "जोड़ें श्रेणी सामग्री",
			initiate: "आरंभ",
			categoryPrompt: "श्रेणी नाम (कोई श्रेणी उपसर्ग) दर्ज करें",
			doesNotExist: "$1 मौजूद नहीं है",
			failedToGetContents: "$1 की सामग्री को पाने में विफल",
			categoryAlert: "कम से कम एक श्रेणी दर्ज करें",
			warning: "चेतावनी",
			closeModalWarning: "क्या आप परिष्करण के बिना मोडल बंद करना चाहते हैं?",
			close: "बंद",
			finished: "समाप्त",
			nothingLeftToDo: "कुछ भी नहीं करना छोड़ दिया है, या अगली पंक्ति को खाली है",
			noCategoryToReplace: "नहीं $1 में प्रवेश के साथ बदलने के लिए",
			pageNotExist: "पन्ना $1 मौजूद नहीं है",
			addSummary: "जोड़ना $1 (स्वचालित)",
			addFail: "$1 $2 जोड़ने में विफल",
			categoryAlready: "$1 पहले से ही श्रेणी $2 है या एक त्रुटि का सामना करना पड़ा था, यह छोड़ दिया गया है",
			categoryCheckFail: "श्रेणी की जांच $1 के लिए विफल रहा है, इसे छोड़ दिया गया है",
			removeNotFound: "$1 $2 पर नहीं मिला था",
			removeFail: "$2 से $1 को दूर करने में विफल",
			removeSuccess: "$1 $2 से सफलतापूर्वक हटा दिया",
			removeSummary: "हटाने $1 (स्वचालित)",
			replaceFail: "$2 $1 करने में असफ़ल",
			replaceSuccess: "श्रेणी सफलतापूर्वक $1 पर प्रतिस्थापित",
			replaceSummary: "$2 (स्वचालित) के साथ $1 की जगह",
			multiReplaceSummary: "श्रेणियों की जगह: $1 (स्वचालित)",
			noCategoryReplace: "नहीं श्रेणी को बदलने के लिए",
			automatic: "स्वचालित"
		},
		it: {
			title: 'Categorizzazione massiccia',
			mode: 'Modo',
			add: 'Aggiungi',
			remove: 'Togli',
			replace: 'Sostituisci',
			category: 'Categoria',
			categoryPlural: 'Categorie',
			replaceWith: 'Sostituisci con',
			matching: 'Coincidenze',
			generalMatching: "Generale (non tiene conto delle categorie con barra)",
			broadMatching: "Estesa (tiene conto delle categorie con barra)",
			noInclude: "Non includere nella transclusione (per i template)",
			caseSensitive: "Tiene conto delle maiuscole e delle minuscole (solo nei modi di togliere e sostituire)",
			instructions: "Introduci il nome di ogni pagina che desideri categorizzare in una linea separata",
			outputInitial: "Qualsiasi errore trovato apparirà giù",
			cancel: "Annulla",
			addCategoryContents: "Aggiungi contenuto di categoria",
			initiate: "Inizia",
			categoryPrompt: "Per favore, introduci il nome della categoria (senza il prefisso di Categoria)",
			doesNotExist: "$1 non esiste",
			failedToGetContents: "Errore per caricare contenuti di $1",
			categoryAlert: "Introduci almeno una categoria",
			warning: "Avvertimento",
			closeModalWarning: "Sei sicuro che vuoi chiudere il modulo senza terminare?",
			close: "Chiudi",
			finished: "Finito",
			nothingLeftToDo: "Niente più di fare, o la seguente linea è in bianco",
			noCategoryToReplace: "Nessuna $1 per sostituire si è introdotta",
			pageNotExist: "La pagina $1 non esiste",
			addSummary: "Aggiungendo $1 (automatico)",
			addFail: "Errore aggiungendo $1 a $2",
			categoryAlready: "$1 contiene già la categoria $2 o alcun errore si è trovato; è stato omesso",
			categoryCheckFail: "La verificazione di categorie non è riuscita per la pagina $1; questa è stata omessa",
			removeNotFound: "$1 non si è trovato sulla pagina $2",
			removeSummary: "Rimuovendo $1 (automatico)",
			removeFail: "Errore rimuovendo $1 dalla pagina $2",
			replaceSummary: "Sostituendo $1 con $2 (automatico)",
			multiReplaceSummary: 'Sostituendo categorie: $1 (automatico)',
			removeSuccess: "$1 si è rimosso dalla pagina $2 con successo",
			replaceFail: "Errore sostituendo $1 sulla pagina $2",
			replaceSuccess: "Categoria sostituita con successo sulla pagina $1",
			noCategoryReplace: "Nessuna categoria per sostituire",
			automatic: "automatico"
		},
		kn: {
			title: "ಮಾಸ್ ವರ್ಗೀಕರಣ",
			mode: "ಮೋಡ್",
			add: "ಸೇರಿಸು",
			remove: "ತೆಗೆದುಹಾಕು",
			replace: "ಬದಲಾಯಿಸಿ",
			category: "ವರ್ಗ",
			categoryPlural: "ವರ್ಗಗಳು",
			replaceWith: "ಬದಲಾಯಿಸಿ",
			matching: "ಹೊಂದಾಣಿಕೆಯ",
			generalMatching: "ಜನರಲ್ (ವೇಗದ ವಿಭಾಗಗಳು ಇಲ್ಲ ಖಾತೆಯನ್ನು)",
			broadMatching: "ಬ್ರಾಡ್ (ವೇಗದ ಕೊಂಡಿಗಳು ನೋಡಿಕೊಳ್ಳುತ್ತಾರೆ)",
			noInclude: "(ಟೆಂಪ್ಲೆಟ್ಗಳನ್ನು) ಸೇರ್ಪಡೆ ಸೇರಿಸಬೇಡಿ",
			caseSensitive: "ಕೇಸ್ ಸೂಕ್ಷ್ಮ (ತೆಗೆಯುವುದು ಮತ್ತು ಮಾತ್ರ ಬದಲಿಗೆ)",
			instructions: "ನೀವು ಒಂದು ಪ್ರತ್ಯೇಕ ಸಾಲಿನಲ್ಲಿ ವರ್ಗೀಕರಿಸಲು ಬಯಸುವ ಪ್ರತಿ ಪುಟದ ಹೆಸರು ಹಾಕಿ",
			outputInitial: "ಎದುರಿಸಿದೆ ಕೆಳಗೆ ಕಾಣಿಸುತ್ತದೆ ಯಾವುದೇ ದೋಷಗಳು",
			cancel: "ರದ್ದು",
			addCategoryContents: "ವರ್ಗದಲ್ಲಿ ವಿಷಯಗಳನ್ನು ಸೇರಿಸಿ",
			initiate: "ಆರಂಭಿಸು",
			categoryPrompt: "ದಯವಿಟ್ಟು ವರ್ಗದಲ್ಲಿ ಹೆಸರು (ಯಾವುದೇ ವರ್ಗದಲ್ಲಿ ಪೂರ್ವಪ್ರತ್ಯಯ)  ನಮೂದಿಸಿ",
			doesNotExist: "$1 ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ",
			failedToGetContents: "$1 ವಿಷಯಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ",
			categoryAlert: "ದಯವಿಟ್ಟು ಒಂದು ವರ್ಗದಲ್ಲಿ ನಮೂದಿಸಿ",
			warning: "ಎಚ್ಚರಿಕೆ",
			closeModalWarning: "ನೀವು ಸ್ಥಾನ ಇಲ್ಲದೆ ಮೋಡಲ್ ಮುಚ್ಚಲು ಬಯಸಿದ್ದೀರಾ?",
			close: "ಮುಚ್ಚಲಾಗಿದೆ",
			finished: "ಮುಗಿಸಿದರು",
			nothingLeftToDo: "ಏನೂ ಇಲ್ಲ ಮಾಡಲು, ಅಥವಾ ಮುಂದಿನ ಸಾಲಿನ ವಿಳಾಸ",
			noCategoryToReplace: "ಇಲ್ಲ $1 ಪ್ರವೇಶಿಸಿತು ಬದಲಾಯಿಸಲು",
			pageNotExist: "ಪೇಜ್ $1 ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ",
			addSummary: "ಸೇರಿಸುವ $1 (ಸ್ವಯಂಚಾಲಿತ)",
			addFail: "$1 $2 ಸೇರಿಸಲು ವಿಫಲವಾಗಿದೆ",
			categoryAlready: "$1 ಈಗಾಗಲೇ ವರ್ಗದಲ್ಲಿ $2 ಅಥವಾ ದೋಷ ಕಂಡುಬಂದಿತು; ಸಾಗುವಂತೆ ಮಾಡಲಾಗಿದೆ",
			categoryCheckFail: "ವರ್ಗ ಚೆಕ್ $1 ವಿಫಲವಾಯಿತು; ಸಾಗುವಂತೆ ಮಾಡಲಾಗಿದೆ",
			removeNotFound: "$1 $2 ಕಂಡುಬಂದಿಲ್ಲ",
			removeFail: "$2 $1 ತೆಗೆದುಹಾಕಲು ವಿಫಲವಾಗಿದೆ",
			removeSuccess: "$1 $2 ಯಶಸ್ವಿಯಾಗಿ ತೆಗೆದುಹಾಕಲಾಗಿದೆ",
			removeSummary: "ತೆಗೆದು $1 (ಸ್ವಯಂಚಾಲಿತ)",
			replaceFail: "$2 $1 ಬದಲಿಗೆ ವಿಫಲವಾಗಿದೆ",
			replaceSuccess: "ವರ್ಗ ಯಶಸ್ವಿಯಾಗಿ $1 ಬದಲಿಗೆ",
			replaceSummary: "$2 (ಸ್ವಯಂಚಾಲಿತ) ಜೊತೆ ಬದಲಿಗೆ $1",
			multiReplaceSummary: "ವಿಭಾಗಗಳು ಬದಲಿಗೆ: $1 (ಸ್ವಯಂಚಾಲಿತ)",
			noCategoryReplace: "ಬದಲಿಗೆ ಯಾವುದೇ ವರ್ಗದಲ್ಲಿ",
			automatic: "ಸ್ವಯಂಚಾಲಿತ"
		},
		ko: {
			title: "다중 분류 작업",
			mode: "작업",
			add: "추가",
			remove: "제거",
			replace: "변경",
			category: "분류",
			categoryPlural: "분류들",
			replaceWith: "바꿀 분류",
			matching: "일치 조건",
			generalMatching: "일반 (파이프 분류를 고려하지 않음)",
			broadMatching: "광역 (파이프 링크 처리)",
			noInclude: "틀에 매개되어 있는 분류 제외",
			caseSensitive: "대소문자 구분 (제거 및 변경만 가능)",
			instructions: "각각의 줄에 분류 작업을 할 문서 이름을 입력하십시오",
			outputInitial: "아래에 작업 중에 발생한 오류가 나타납니다",
			cancel: "취소",
			addCategoryContents: "분류 내용을 추가",
			initiate: "실행",
			categoryPrompt: "분류 이름을 입력하십시오 (분류 접두사 없이)",
			doesNotExist: "$1 문서가 이 위키에 없음",
			failedToGetContents: "$1 문서에서 내용을 가져오지 못함",
			categoryAlert: "최소 한 개의 분류를 입력하시오",
			warning: "경고",
			closeModalWarning: "정말로 이 작업을 닫으시겠습니까? 아직 작업이 끝나지 않았습니다.",
			close: "닫기",
			finished: "끝났음",
			nothingLeftToDo: "더 이상 할 것이 없거나 다음 줄이 비었습니다",
			noCategoryToReplace: "입력된 분류를 대체할 $1 문서가 없음",
			pageNotExist: "문서 $1 이(가) 없음",
			addSummary: "$1 추가 (자동)",
			addFail: "$2에 $1을(를) 추가하는데 실패함",
			categoryAlready: "$1에 이미 $2 분류가 있거나 오류가 발생함; 이 문서는 스킵됨",
			categoryCheckFail: "$1에서 분류를 확인하지 못함; 이 문서는 스킵됨",
			removeNotFound: "$2에서 $1을(를) 찾지 못함",
			removeFail: "$2에서 $1을(를) 제거하지 못함",
			removeSuccess: "$2에서 $1이(가) 성공적으로 제거됨",
			removeSummary: "$1 제거 (자동)",
			replaceFail: "$2에서 $1을(를) 바꾸지 못함",
			replaceSuccess: "$1(으)로 분류를 성공적으로 바꿈",
			replaceSummary: "$1을(를) $2(으)로 변경 (자동)",
			multiReplaceSummary: "분류들을 바꿈: $1 (자동)",
			noCategoryReplace: "바꿀 분류가 없음",
			automatic: "자동"
		},
		oc: {
			title: 'Categorizacion en massa',
			mode: 'Manièra',
			add: 'Apondre',
			remove: 'Levar',
			replace: 'Remplaçar',
			category: 'Categoria',
			categoryPlural: 'De categorias',
			replaceWith: 'Remplaçar amb',
			matching: 'De coïncidéncias',
			generalMatching: "General (pren pas en compte las categorias amb barra)",
			broadMatching: "Vasta (pren en compte las categorias amb barra)",
			noInclude: "Pas inclure dins la transclusion (per de modèls)",
			caseSensitive: "Pren en compte de majusculas e de minúsculas (sonque en las manièras de levar e remplaçar)",
			instructions: "Introdusís lo nom de cada pagina que vòlguas categorizar en una linha separada",
			outputInitial: "Quin error trobat que siá apareisserà aval",
			cancel: "Anullar",
			addCategoryContents: "Apondre contengut de categoria",
			initiate: "Iniciar",
			categoryPrompt: "Se vos plai, introdusís lo nom de la categoria (sens lo prefixe de Categoria)",
			doesNotExist: "$1 existís pas",
			failedToGetContents: "Error al moment de cargar de contenguts de $1",
			categoryAlert: "Introdusís almens una categoria",
			warning: "Advertencia",
			closeModalWarning: "Ès segur que vòles barrar lo modul sens fenir?",
			close: "Barrar",
			finished: "Finalizat",
			nothingLeftToDo: "Brica mai per far, o la seguenta linha es en blanc",
			noCategoryToReplace: "Cap $1 per remplaçar s\'es introdusida",
			pageNotExist: "La pagina $1 existís pas",
			addSummary: "En apondent $1 (automatic)",
			addFail: "Error al moment d\'apondre $1 a $2",
			categoryAlready: "$1 conten ja la categoria $2 o qualque error s\'es trobat; es estat omitida",
			categoryCheckFail: "La verificacion de categorias manquèt per la pagina $1; aquesta es estada omitida",
			removeNotFound: "$1 s\'es pas trobat sus la pagina $2",
			removeSummary: "En levant $1 (automatic)",
			removeFail: "Error al moment de levar $1 de la pagina $2",
			replaceSummary: "En remplaçant $1 amb $2 (automatic)",
			multiReplaceSummary: 'En remplaçant de categorias: $1 (automatic)',
			removeSuccess: "$1 s\'es levat de la pagina $2 amb capitada",
			replaceFail: "Error al moment de remplaçar $1 sus la pagina $2",
			replaceSuccess: "Categoria remplaçada amb capitada sus la pagina $1",
			noCategoryReplace: "Cap categoria per remplaçar",
			automatic: "automatic"
		},
		pl: {
			title: "Mass Categorization",
			mode: "Działanie",
			add: "Dodaj",
			remove: "Usuń",
			replace: "Przenieś",
			category: "Kategoria",
			categoryPlural: "Dodaj kategorie",
			replaceWith: "Zamień na",
			matching: "Dopasuj",
			generalMatching: "Generalnie (nie uwzględnia doprowadzonych linków)",
			broadMatching: "Ogólnie (bierze pod uwagę doprowadzone linki)",
			noInclude: "Nie należy do transkluzji (dla szablonów)",
			caseSensitive: "Z uwzględnieniem wielkości liter (tylko dla opcji usunięcia i przeniesienia)",
			instructions: "Umieść tutaj nazwę strony, jaką chcesz skategoryzować w oddzielnej linii",
			outputInitial: "Tutaj pojawią się wszystkie błędy",
			cancel: "Anuluj",
			addCategoryContents: "Dodaj treść do kategorii",
			initiate: "Uruchom",
			categoryPrompt: "Proszę umieścić nazwę kategorii (bez prefiksu kategorii)",
			doesNotExist: "$1 nie istnieje",
			failedToGetContents: "Nie udało się stworzyć $1",
			categoryAlert: "Proszę umieścić przynajmniej jedną kategorię",
			warning: "Ostrzeżenie",
			closeModalWarning: "Czy na pewno chcesz wyłączyć ten skrypt bez zapisywania żadnych kategorii?",
			close: "Zamknij",
			finished: "Zakończono",
			nothingLeftToDo: "Nie musisz nic robić dalej, polecenie zostało wykonane",
			noCategoryToReplace: "Nie możesz przenieść strony $1",
			pageNotExist: "Strona $1 nie istnieje",
			addSummary: "Dodano $1 (automatycznie)",
			addFail: "Nie udało się dodać $1 do $2",
			categoryAlready: "$1 posiada już kategorię $2 lub mógł wystąpić błąd, procedura została pominięta",
			categoryCheckFail: "Kategoria nie sprawdziła się na stronie $1; została pominięta",
			removeNotFound: "$1 nie zostało znalezione na $2",
			removeFail: "Nie udało się usunąć $1 z $2",
			removeSuccess: "$1 zostało usunąć z $2",
			removeSummary: "Usunięto $1 (automatycznie)",
			replaceFail: "Nie udało się przenieść $1 na $2",
			replaceSuccess: "Kategoria pomyślnie przeniesiona na $1",
			replaceSummary: "Zamieniono $1 z $2 (automatycznie)",
			multiReplaceSummary: "Przeniesienie kategorii: $1 (automatycznie)",
			noCategoryReplace: "Nie ma kategorii do przeniesienia",
			automatic: "automatycznie"
		},
		pt: {
			title: 'Categorização em massa',
			mode: 'Modo',
			add: 'Acrescentar',
			remove: 'Tirar',
			replace: 'Substituir',
			category: 'Categoria',
			categoryPlural: 'Categorias',
			replaceWith: 'Substituir com',
			matching: 'Coincidências',
			generalMatching: "Geral (sem ter em consideração as categorias com barra)",
			broadMatching: "Extensa (tendo em consideração as categorias com barra)",
			noInclude: "Não incluir na transclusão (para predefinições)",
			caseSensitive: "Ter em consideração maiúsculas e minúsculas (só nos modos de tirar e substituir)",
			instructions: "Introduz o nome de cada página que quiseres categorizar numa linha separada",
			outputInitial: "Qualquer erro encontrado aparecerá abaixo",
			cancel: "Cancelar",
			addCategoryContents: "Acrescentar conteúdo de categoria",
			initiate: "Iniciar",
			categoryPrompt: "Por favor, introduz o nome da categoria (sem o prefixo de Categoria)",
			doesNotExist: "$1 não existe",
			failedToGetContents: "Erro ao carregar conteúdos de $1",
			categoryAlert: "Introduz ao menos uma categoria",
			warning: "Advertência",
			closeModalWarning: "Tens a certeza de que queres fechar o módulo sem terminares?",
			close: "Fechar",
			finished: "Finalizado",
			nothingLeftToDo: "Mais nada para fazeres, ou a seguinte linha está em branco",
			noCategoryToReplace: "Nenhuma $1 para substituir foi introduzida",
			pageNotExist: "A página $1 não existe",
			addSummary: "A acrescentar $1 (automático)",
			addFail: "Erro ao acrescentar $1 a $2",
			categoryAlready: "$1 já contém a categoria $2 ou algum erro foi encontrado; então foi omitido",
			categoryCheckFail: "A verificação de categorias falhou para a página $1; então foi omitida",
			removeNotFound: "$1 não se encontrou na página $2",
			removeSummary: "A remover $1 (automático)",
			removeFail: "Erro ao remover $1 da página $2",
			replaceSummary: "A substituir $1 com $2 (automático)",
			multiReplaceSummary: 'A substituir categorias: $1 (automático)',
			removeSuccess: "$1 removeu-se da página $2 com sucesso",
			replaceFail: "Erro ao substituir $1 na página $2",
			replaceSuccess: "Categoria substituída com sucesso na página $1",
			noCategoryReplace: "Nenhuma categoria para substituir",
			automatic: "automático"
		},
		'pt-br': {
			title: 'Categorização em massa',
			mode: 'Modo',
			add: 'Adicionar',
			remove: 'Remover',
			replace: 'Substituir',
			category: 'Categoria',
			categoryPlural: 'Categorias',
			replaceWith: 'Substituir com',
			matching: 'Coincidências',
			generalMatching: "General (sem levar em conta as categorias com barra)",
			broadMatching: "Extensa (levando em conta as categorias com barra)",
			noInclude: "Não incluir na transclusão (para predefinições)",
			caseSensitive: "Levando em conta maiúsculas e minúsculas (só nos modos de remover e substituir)",
			instructions: "Introduza o nome da cada página que você quiser categorizar em uma linha separada",
			outputInitial: "Qualquer erro encontrado aparecerá embaixo",
			cancel: "Anular",
			addCategoryContents: "Adicione conteúdo de categoria",
			initiate: "Iniciar",
			categoryPrompt: "Por favor, introduza o nome da categoria (sem o prefixo de Categoria)",
			doesNotExist: "$1 não existe",
			failedToGetContents: "Erro carregando conteúdos de $1",
			categoryAlert: "Introduza ao menos uma categoria",
			warning: "Advertência",
			closeModalWarning: "Tem certeza que você quer fechar o módulo sem terminar?",
			close: "Fechar",
			finished: "Finalizado",
			nothingLeftToDo: "Nada mais para fazer, ou a seguinte linha está em branco",
			noCategoryToReplace: "Nenhuma $1 para substituir foi introduzida",
			pageNotExist: "A página $1 não existe",
			addSummary: "Adicionando $1 (automático)",
			addFail: "Erro adicionando $1 a $2",
			categoryAlready: "$1 já contém a categoria $2 ou algum erro foi encontrado; ele foi ignorado",
			categoryCheckFail: "A verificação de categorias falhou para a página $1; ela foi ignorada",
			removeNotFound: "$1 não foi encontrado na página $2",
			removeSummary: "Removendo $1 (automático)",
			removeFail: "Erro removendo $1 da página $2",
			replaceSummary: "Substituindo $1 com $2 (automático)",
			multiReplaceSummary: 'Substituindo categorias: $1 (automático)',
			removeSuccess: "$1 foi removido da página $2 com sucesso",
			replaceFail: "Erro substituindo $1 na página $2",
			replaceSuccess: "Categoria substituída com sucesso na página $1",
			noCategoryReplace: "Nenhuma categoria para substituir",
			automatic: "automático"
		},
		ro: {
			title: 'Categorisirea masivă',
			mode: 'Mod',
			add: 'Adăugare',
			remove: 'Eliminare',
			replace: 'Înlocuire',
			category: 'Categorie',
			categoryPlural: 'Categorii',
			replaceWith: 'Înlocuieşte cu',
			matching: 'Coincidenţe',
			generalMatching: "General (nu ia în considerare categoriile cu bară)",
			broadMatching: "Largă (luând în considerare categoriile cu bară)",
			noInclude: "Nu include în includerea formatului (pentru formate)",
			caseSensitive: "Luând în considerare majuscule şi minuscule (doar în modurile de eliminare şi înlocuire)",
			instructions: "Introdu numele fiecărui pagini pe care vrei să-o categorizezi într-o linie separa",
			outputInitial: "Orice eroare găsită va apărea jos",
			cancel: "Revocare",
			addCategoryContents: "Adăugarea conţinutului de categorie",
			initiate: "Început",
			categoryPrompt: "Te rugam să introduci numele categoriei (fără prefixul de Categorie)",
			doesNotExist: "$1 nu există",
			failedToGetContents: "Eroare pentru a încărca conţinutul de $1",
			categoryAlert: "Introdu cel puţin o categorie",
			warning: "Avertisment",
			closeModalWarning: "Eşti sigur că vrei să închizi modulul fără să termini?",
			close: "Închidere",
			finished: "Finalizat",
			nothingLeftToDo: "Nimic altceva de făcut, sau următoarea linie este goală",
			noCategoryToReplace: "Nicio $1 pentru a înlocui s-a introdus",
			pageNotExist: "Pagina $1 nu există",
			addSummary: "Adăugând $1 (automatic)",
			addFail: "Eroare pentru a adăuga $1 la $2",
			categoryAlready: "$1 deja conţine categoria $2 sau vreo eroare s-a găsit; a fost omisă",
			categoryCheckFail: "Verificarea categoriilor a ratat pentru pagina $1; aceasta a fost omisă",
			removeNotFound: "$1 nu s-a găsit pe pagina $2",
			removeSummary: "Scoţând $1 (automatic)",
			removeFail: "Eroare scoţând $1 din pagina $2",
			replaceSummary: "Înlocuind $1 cu $2 (automatic)",
			multiReplaceSummary: 'Înlocuind categorii: $1 (automatic)',
			removeSuccess: "$1 s-a scos din pagina $2 cu succes",
			replaceFail: "Erori înlocuind $1 pe pagina $2",
			replaceSuccess: "Categorii înlocuite cu succes -pe pagina $1",
			noCategoryReplace: "Nicio categorie pentru a înlocui",
			automatic: "automatic"
		},
		ru: {
			title: "Массовая категоризация",
			mode: "Действие",
			add: "Добавить",
			remove: "Удалить",
			replace: "Переместить",
			category: "Категория",
			categoryPlural: "Категории",
			replaceWith: "Заменить на",
			matching: "Сравнение",
			generalMatching: "Обычное (не учитывает отдельные категории)",
			broadMatching: "Расширенное (учитывает отдельные ссылки)",
			noInclude: "Не учитывать включения (для шаблонов)",
			caseSensitive: "С учётом регистра (только для опций удаления и перемещения)",
			instructions: "Разместите здесь название страницы, которую вы хотите поместить в категорию в отдельной строке",
			outputInitial: "Здесь будут появляться все ошибки",
			cancel: "Отмена",
			addCategoryContents: "Добавить содержимое категории",
			initiate: "Запустить",
			categoryPrompt: "Пожалуйста, укажите название категории (без префикса Категория:)",
			doesNotExist: "$1 не существует",
			failedToGetContents: "Не удалось создать $1",
			categoryAlert: "Пожалуйста, поставьте хотя бы одну категорию",
			warning: "Предупреждение",
			closeModalWarning: "Вы уверены, что хотите отключить этот скрипт без сохранения каких-либо категорий?",
			close: "Закрыть",
			finished: "Завершено",
			nothingLeftToDo: "Вам не нужно ничего делать дальше или следующая строка пустая",
			noCategoryToReplace: "Вы не можете переместить страницы $1",
			pageNotExist: "Страница $1 не существует",
			addSummary: "Добавлено $1 (автоматически)",
			addFail: "Не удалось добавить $1 в $2",
			categoryAlready: "$1 уже в категории $2 или произошла ошибка, данное название было пропущено",
			categoryCheckFail: "Категория $1 не найдена; данное название было пропущено",
			removeNotFound: "$1 не было найдено в $2",
			removeFail: "Не удалось удалить $1 из $2",
			removeSuccess: "$1 было удалено из $2",
			removeSummary: "Удалено из $1 (автоматически)",
			replaceFail: "Не удалось заменить $1 на $2",
			replaceSuccess: "Категория успешно заменена на $1",
			replaceSummary: "Замена $1 на $2 (автоматически)",
			multiReplaceSummary: "Замена категорий: $1 (автоматически)",
			noCategoryReplace: "Нет категории для замены",
			automatic: "автоматически"
		},
		uk: {
			title: "Масова категоризація",
			mode: "Дія",
			add: "Додати",
			remove: "Видалити",
			replace: "Перемістити",
			category: "Категорія",
			categoryPlural: "Категорії",
			replaceWith: "Замінити на",
			matching: "Порівняння",
			generalMatching: "Звичайне (не враховує окремі категорії)",
			broadMatching: "Розширене (враховує окремі посилання)",
			noInclude: "Не враховувати включення (для шаблонів)",
			caseSensitive: "З урахуванням регістра (тільки для опцій видалення та переміщення)",
			instructions: "Розмістіть тут назву сторінки, яку ви хочете помістити у категорію в окремому рядку",
			outputInitial: "Тут з\'являтимуться всі помилки",
			cancel: "Скасування",
			addCategoryContents: "Додати вміст категорії",
			initiate: "Запустити",
			categoryPrompt: "Будь ласка, вкажіть назву категорії (без префікса Категорія:)",
			doesNotExist: "$1 не існує",
			failedToGetContents: "Не вдалося створити $1",
			categoryAlert: "Будь ласка, поставте хоча б одну категорію",
			warning: "Попередження",
			closeModalWarning: "Ви впевнені, що хочете відключити цей скрипт без збереження будь-яких категорій?",
			close: "Закрити",
			finished: "Завершено",
			nothingLeftToDo: "Вам не потрібно нічого робити далі або наступний рядок порожний",
			noCategoryToReplace: "Ви не можете перемістити сторінки $1",
			pageNotExist: "Сторінка $1 не існує",
			addSummary: "Додано $1 (автоматично)",
			addFail: "Не вдалося додати $1 до $2",
			categoryAlready: "$1 вже в категорії $2 або сталася помилка, цю назву було пропущено",
			categoryCheckFail: "Категорія $1 не знайдена; цю назву було пропущено",
			removeNotFound: "$1 не було знайдено в $2",
			removeFail: "Не вдалося видалити $1 з $2",
			removeSuccess: "$1 було видалено з $2",
			removeSummary: "Видалено з $1 (автоматично)",
			replaceFail: "Не вдалося замінити $1 на $2",
			replaceSuccess: "Категорію успішно замінено на $1",
			replaceSummary: "Заміна $1 на $2 (автоматично)",
			multiReplaceSummary: "Заміна категорій: $1 (автоматично)",
			noCategoryReplace: "Немає категорії для заміни",
			automatic: "автоматично"
		},
		val: {
			title: 'Categorisació en massa',
			mode: 'Modo',
			add: 'Afegir',
			remou: 'Traure',
			replace: 'Reemplaçar',
			category: 'Categoria',
			categoryPlural: 'Categories',
			replaceWith: 'Reemplaçar en',
			matching: 'Coincidències',
			generalMatching: "General (no pren en conte les categories en barra)",
			broadMatching: "Extensa (prenent en conte les categories en barra)",
			noInclude: "No incloure en transclusió (per a plantilles)",
			caseSensitive: "Prenent en conte mayúscules i minúscules (només en els modos de traure i reemplaçar)",
			instructions: "Introduix el nom de cada pàgina que voleres categorisar en una llínia separada",
			outputInitial: "Qualsevol error trobat apareixerà avall",
			cancell: "Cancelar",
			addCategoryContents: "Afegir contingut de categoria",
			initiate: "Iniciar",
			categoryPrompt: "Per favor, introduix el nom de la categoria (sense el prefix de Categoria)",
			doesNotExist: "$1 no existix",
			failedToGetContents: "Error carregant continguts de $1",
			categoryAlert: "Introduix al menys una categoria",
			warning: "Advertència",
			closeModalWarning: "¿Estàs segur de que vols tancar el mòdul sense terminar?",
			close: "Tancar",
			finished: "Finalisat",
			nothingLeftToDo: "Res més que fer, o la següent llínia està en blanc",
			noCategoryToReplace: "Cap $1 per a reemplaçar s\'ha introduït",
			pageNotExist: "La pàgina $1 no existix",
			addSummary: "Afegint $1 (automàtic)",
			addFail: "Error afegint $1 a $2",
			categoryAlready: "$1 ya conté la categoria $2 o algun error s\'ha trobat; ha segut omesa",
			categoryCheckFail: "La verificació de categories fallà per a la pàgina $1; esta ha segut omesa",
			removeNotFound: "$1 no s\'ha trobat en la pàgina $2",
			removeSummary: "Traient $1 (automàtic)",
			removeFail: "Erro traient $1 de la pàgina $2",
			replaceSummary: "Reemplaçant $1 en $2 (automàtic)",
			multiReplaceSummary: 'Reemplaçant categories: $1 (automàtic)',
			removeSuccess: "$1 s\'ha tret de la pàgina $2 en èxit",
			replaceFail: "Error reemplaçant $1 en la pàgina $2",
			replaceSuccess: "Categoria reemplaçada en èxit en la pàgina $1",
			noCategoryReplace: "Cap categoria per a reemplaçar",
			automatic: "automàtic"
		},
		vi: {
			title: "Phân loại tập trung",
			mode: "Chế độ",
			add: "Thêm",
			remove: "Loại bỏ",
			replace: "Thay thế",
			category: "Thể loại",
			categoryPlural: "Các thể loại",
			replaceWith: "Thay thế với",
			matching: "Kết hợp",
			generalMatching: "Bình thường (không tính những đường dẫn...) /* Need proper translation */",
			broadMatching: "Rộng (takes care of piped links...) /* Need proper translation */",
			noInclude: "Do not include in transclusion (for templates)",
			caseSensitive: "Phân biệt hoa/thường (chỉ đối với loại bỏ/thay thế)",
			instructions: "Cho tên của từng trang bạn muốn phân loại vào từng dòng riêng lẻ một.",
			outputInitial: "Bất kì lỗi nào bạn gặp phải sẽ được xuất hiện dưới đây",
			cancel: "Thoát",
			addCategoryContents: "Thêm nội dung của thể loại",
			initiate: "Bắt đầu",
			categoryPrompt: "Làm ơn thêm tên thể loại (không có tiền tố)",
			doesNotExist: "$1 không tồn tại",
			failedToGetContents: "Thất bại trong việc lấy nội dung của $1",
			categoryAlert: "Xin hãy điền ít nhất một thể loại",
			warning: "Cảnh báo!",
			closeModalWarning: "Bạn có muốn đóng phương thức này mà không hoàn thành hay không??",
			close: "Đóng",
			finished: "Đã hoàn thành",
			nothingLeftToDo: "Không còn việc gì để làm, hoặc dòng tiếp theo trống",
			noCategoryToReplace: "Không có $1 để thay thế với thứ đã được nhập",
			pageNotExist: "Trang $1 không tồn tại",
			addSummary: "Đang thêm $1 (tự động)",
			addFail: "Thất bại trong việc thêm $1 vào $2",
			categoryAlready: "$1 đã sẵn có trong thể loại $2 hoặc đã gặp lỗi; đã bỏ qua",
			categoryCheckFail: "Kiểm tra thể loại cho $1 thất bại; đã bỏ qua",
			removeNotFound: "$1 không tìm thấy trong $2",
			removeFail: "Thất bại trong việc loại bỏ $1 khỏi $2",
			removeSuccess: "$1 đã được loại bỏ khỏi $2",
			removeSummary: "Đang loại bỏ $1 (tự động)",
			replaceFail: "Thất bại trong việc thay thế $1 với $2",
			replaceSuccess: "Thể loại đã được thay thế bởi $1",
			replaceSummary: "Đang thay thế $1 với $2 (tự động)",
			multiReplaceSummary: "Đang thay thế thể loại: $1 (tự động)",
			noCategoryReplace: "Không có thể loại để thay thế",
			automatic: "tự động"
		},
		zh: {
			title: "批次分类",
			mode: "模式",
			add: "添加",
			remove: "移除",
			replace: "取代",
			category: "分类",
			categoryPlural: "分类",
			replaceWith: "取代为",
			matching: "配对中",
			generalMatching: "一般（将不处理含有[[w:c:zh:Help:链接#.E4.BD.BF.E7.94.A8.E6.BA.90.E4.BB.A3.E7.A2.BC.E6.A8.A1.E5.BC.8F|管道链接]]的分类 (Piped category)）",
			broadMatching: "广泛（一并处理[[w:c:zh:Help:链接#.E4.BD.BF.E7.94.A8.E6.BA.90.E4.BB.A3.E7.A2.BC.E6.A8.A1.E5.BC.8F|管道链接]] (Piped link)）",
			noInclude: "不包含透过模板嵌入的分类",
			caseSensitive: "区分大小写（仅用于移除及取代）",
			instructions: "请逐行输入各个您想要分类的页面名称",
			outputInitial: "任何出现的错误会显示于下方",
			cancel: "取消",
			addCategoryContents: "添加分类内容",
			initiate: "开始",
			categoryPrompt: "请输入分类名称（不含前缀字，即「Category:」或「分类:」）",
			doesNotExist: "$1 不存在",
			failedToGetContents: "无法取得 $1 的内容",
			categoryAlert: "请输入至少一个分类",
			warning: "警告",
			closeModalWarning: "确定要在尚未完成操作的情况下关闭此窗口吗？",
			close: "关闭",
			finished: "已完成",
			nothingLeftToDo: "已无需处理的项目，或下一行为空白",
			noCategoryToReplace: "输入内容中找不到取代项目 $1",
			pageNotExist: "页面 $1 不存在",
			addSummary: "正在添加 $1（自动）",
			addFail: "添加 $1 至 $2 失败",
			categoryAlready: "页面 $1 已有分类 $2，或出现错误。已略过",
			categoryCheckFail: "检查于 $1 的分类失败。已略过",
			removeNotFound: "于 $2 找不到 $1",
			removeFail: "自 $2 移除 $1 失败",
			removeSuccess: "成功自 $2 移除 $1",
			removeSummary: "正在移除 $1（自动）",
			replaceFail: "于 $2 取代 $1 失败 (Failed to replace $1 on $2)",
			replaceSuccess: "成功取代页面 $1 中的分类",
			replaceSummary: "正在取代 $1 为 $2（自动）",
			multiReplaceSummary: "正在取代分类：$1（自动）",
			noCategoryReplace: "没有可取代的分类",
			automatic: "自动"
		},
		'zh-hant': {
			title: "批次分類",
			mode: "模式",
			add: "添加",
			remove: "移除",
			replace: "取代",
			category: "分類",
			categoryPlural: "分類",
			replaceWith: "取代為",
			matching: "配對中",
			generalMatching: "一般（將不處理含有[[w:c:zh:Help:鏈接#.E4.BD.BF.E7.94.A8.E6.BA.90.E4.BB.A3.E7.A2.BC.E6.A8.A1.E5.BC.8F|管道鏈接]]的分類 (Piped category)）",
			broadMatching: "廣泛（一併處理[[w:c:zh:Help:鏈接#.E4.BD.BF.E7.94.A8.E6.BA.90.E4.BB.A3.E7.A2.BC.E6.A8.A1.E5.BC.8F|管道鏈接]] (Piped link)）",
			noInclude: "不包含透過模板嵌入的分類",
			caseSensitive: "區分大小寫（僅用於移除及取代）",
			instructions: "請逐行輸入各個您想要分類的頁面名稱",
			outputInitial: "任何出現的錯誤會顯示於下方",
			cancel: "取消",
			addCategoryContents: "添加分類內容",
			initiate: "開始",
			categoryPrompt: "請輸入分類名稱（不含前綴字，即「Category:」或「分類:」）",
			doesNotExist: "$1 不存在",
			failedToGetContents: "無法取得 $1 的內容",
			categoryAlert: "請輸入至少一個分類",
			warning: "警告",
			closeModalWarning: "確定要在尚未完成操作的情況下關閉此視窗嗎？",
			close: "關閉",
			finished: "已完成",
			nothingLeftToDo: "已無需處理的項目，或下一行為空白",
			noCategoryToReplace: "輸入內容中找不到取代項目 $1",
			pageNotExist: "頁面 $1 不存在",
			addSummary: "正在添加 $1（自動）",
			addFail: "添加 $1 至 $2 失敗",
			categoryAlready: "頁面 $1 已有分類 $2，或出現錯誤。已略過",
			categoryCheckFail: "檢查於 $1 的分類失敗。已略過",
			removeNotFound: "於 $2 找不到 $1",
			removeFail: "自 $2 移除 $1 失敗",
			removeSuccess: "成功自 $2 移除 $1",
			removeSummary: "正在移除 $1（自動）",
			replaceFail: "於 $2 取代 $1 失敗 (Failed to replace $1 on $2)",
			replaceSuccess: "成功取代頁面 $1 中的分類",
			replaceSummary: "正在取代 $1 為 $2（自動）",
			multiReplaceSummary: "正在取代分類：$1（自動）",
			noCategoryReplace: "沒有可取代的分類",
			automatic: "自動"
		},
		'zh-tw': {
			title: "批次分類",
			mode: "模式",
			add: "新增",
			remove: "移除",
			replace: "取代",
			category: "分類",
			categoryPlural: "分類",
			replaceWith: "取代為",
			matching: "配對中",
			generalMatching: "一般（將不處理含有[[w:c:zh:Help:鏈接#.E4.BD.BF.E7.94.A8.E6.BA.90.E4.BB.A3.E7.A2.BC.E6.A8.A1.E5.BC.8F|管道連結]]的分類 (Piped category)）",
			broadMatching: "廣泛（一併處理[[w:c:zh:Help:鏈接#.E4.BD.BF.E7.94.A8.E6.BA.90.E4.BB.A3.E7.A2.BC.E6.A8.A1.E5.BC.8F|管道連結]] (Piped link)）",
			noInclude: "不包含透過模板嵌入的分類",
			caseSensitive: "區分大小寫（僅用於移除及取代）",
			instructions: "請逐行輸入各個您想要分類的頁面名稱",
			outputInitial: "任何出現的錯誤會顯示於下方",
			cancel: "取消",
			addCategoryContents: "新增分類內容",
			initiate: "開始",
			categoryPrompt: "請輸入分類名稱（不含前綴字，即「Category:」或「分類:」）",
			doesNotExist: "$1 不存在",
			failedToGetContents: "無法取得 $1 的內容",
			categoryAlert: "請輸入至少一個分類",
			warning: "警告",
			closeModalWarning: "確定要在尚未完成操作的情況下關閉此視窗嗎？",
			close: "關閉",
			finished: "已完成",
			nothingLeftToDo: "已無需處理的項目，或下一行為空白",
			noCategoryToReplace: "輸入內容中找不到取代項目 $1",
			pageNotExist: "頁面 $1 不存在",
			addSummary: "正在新增 $1（自動）",
			addFail: "新增 $1 至 $2 失敗",
			categoryAlready: "頁面 $1 已有分類 $2，或出現錯誤。已略過",
			categoryCheckFail: "檢查於 $1 的分類失敗。已略過",
			removeNotFound: "於 $2 找不到 $1",
			removeFail: "自 $2 移除 $1 失敗",
			removeSuccess: "成功自 $2 移除 $1",
			removeSummary: "正在移除 $1（自動）",
			replaceFail: "於 $2 取代 $1 失敗 (Failed to replace $1 on $2)",
			replaceSuccess: "成功取代頁面 $1 中的分類",
			replaceSummary: "正在取代 $1 為 $2（自動）",
			multiReplaceSummary: "正在取代分類：$1（自動）",
			noCategoryReplace: "沒有可取代的分類",
			automatic: "自動"
		}
		//language list - stop
	};
	//set i18n according to user's language
	i18n = i18n[mw.config.get("wgUserLanguage")] || i18n[mw.config.get("wgUserLanguage").split('-')[0]] || i18n.en;
	var categoryName = mw.config.get('wgFormattedNamespaces')[14];
    var FormMC = '\
    <form method="" name="" class="WikiaForm "> \
        <fieldset> \
            <p>' + i18n.mode + ': \
                <select id="select-mc"> \
                    <option value="1">' + i18n.add + '</option> \
                    <option value="2">' + i18n.remove + '</option> \
                    <option value="3">' + i18n.replace + '</option> \
                </select> \
            </p> \
            <span style="float: right; text-align: center;"> \
                <span id="mc-add-category">+</span> \
                <br /> \
                <span id="mc-remove-category" disabled>-</span> \
            </span> \
            <div id="mc-categories-container"> \
                <p>' + i18n.category + ': \
                    <input type="text" class="category-name" value="" /> \
                <p class="replace-para" style="display: none; padding-top: 3px;">' + i18n.replaceWith+ ': \
                    <input type="text" class="replace-category-name" value="" /> \
           </div> \
                <p>' + i18n.matching + ': \
                <br/> \
                <label for="normal-removal"><input type="radio" id="mc-normal-removal" name="mass-categorization-removal" value="1" checked="checked"/>' + i18n.generalMatching + '</label> \
             <br/> \
                <label for="broad-removal"><input type="radio" id="mc-broad-removal" name="mass-categorization-removal"/ value="2">' + i18n.broadMatching + '</label> \
            <p> \
            <br/> \
                <label for="no-include"><input type="checkbox" id="mc-noinclude" name="mass-categorization-noinclude"/ value="1">' + i18n.noInclude + '</label> \
            <br/> \
                <label for="case-sensitive"><input type="checkbox" id="mc-case-sensitive" name="mass-categorization-casesensitive"/ value="1">' + i18n.caseSensitive + '</label> \
            </p> \
            <br/> \
            <p>' + i18n.instructions + '</p> \
                <textarea style="height: 20em; width: 80%;" id="text-categorization"/> \
        </fieldset> \
        <div id="text-error-output">' + i18n.outputInitial + '<br /></div> \
    </form>',
    delay = window.massCategorizationDelay || 1000,
    Api = new mw.Api();

    function click() {
        $.showCustomModal(i18n.title, FormMC, {
            id: 'form-categorization',
            callback: function() {
                document.getElementById('mc-add-category').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('mc-remove-category').removeAttribute('disabled');
                    var container = document.getElementById('mc-categories-container');
                    $(container).append('<div style="display: none;">\
                        <p>' + i18n.category + ': \
                            <input type="text" class="category-name" value="" /> \
                        <p class="replace-para" style="' + (document.getElementById('select-mc').value == 3 ? '' : 'display: none;') + 'padding-top: 3px;">' + i18n.replaceWith + ': \
                            <input type="text" class="replace-category-name" value="" />\
                    </div>');
                    $(container.lastElementChild).fadeIn();
                });
                document.getElementById('mc-remove-category').addEventListener('click', function(e) {
                    e.preventDefault();
                    var $toremove = $('#mc-categories-container > div:not(.removed)').last();
                    $toremove.addClass('removed').fadeOut(400, function() {
                        $(this).remove();
                    });
                    if ($toremove.parent().children(':not(.removed):last').prop('tagName') != 'DIV') this.setAttribute('disabled', 'disabled');
                });
                document.getElementById('select-mc').addEventListener('change', function() {
                    if (this.value == 3) {
                        $('.replace-para').fadeIn();
                    } else {
                        $('.replace-para').fadeOut();
                    }
                });
            },
            width: 500,
            buttons: [{
                message: i18n.cancel,
                handler: function() {
                    $('#form-categorization').closeModal();
                }
            }, {
                message: i18n.addCategoryContents,
                defaultButton: true,
                handler: addCategoryContents
            }, {
                id: 'start-button',
                message: i18n.initiate,
                defaultButton: true,
                handler: init
            }]
        });
    }

    $('#my-tools-menu').prepend(
        $('<li>', {
            'class': 'custom'
        }).append(
            $('<a>', {
                id: 't-mc',
                text: i18n.title,
                click: click
            })
        )
    );
 
    function logError(msg) {
        console.log(msg);
        var errBox = document.getElementById('text-error-output');
        var text = document.createTextNode(msg);
        errBox.appendChild(text);
        var brTag = document.createElement('br');
        errBox.appendChild(brTag);
    }
 
    function addCategoryContents() {
        var category = prompt(i18n.categoryPrompt + ' :').replace('_', ' ');
        Api.get({
                action: 'query',
                list: 'categorymembers',
                cmtitle: i18n.category + ':' + category,
                cmlimit: 5000,
                cb: new Date().getTime()
            })
            .done(function(d) {
                if (!d.error) {
                    var data = d.query;
                    var pList = document.getElementById('text-categorization');
                    if (data.categorymembers) {
                        for (var i in data.categorymembers) {
                            pList.value += data.categorymembers[i].title + '\n';
                        }
                    } else {
                        logError(i18n.doesNotExist.replace('$1',category));
                    }
                } else {
                    logError(i18n.failedToGetContents.replace('$1',category) + ' : ' + d.error.code);
                }
            })
            .fail(function() {
                logError(i18n.failedToGetContents.replace('$1',category));
            });
    }
 
    function init() {
        var catSlots = Array.from(document.getElementsByClassName('category-name')),
            txt = document.getElementById('text-categorization'),
            pages = txt.value.split('\n'),
            page = pages[0],
            catNames = [];
 
        $.each(catSlots, function(i, name) {
            name = name.value.trim();
            catNames.push(name.charAt(0).toUpperCase() + name.slice(1));
        });
 
        if (!catNames.filter(Boolean).length) {
            alert(i18n.categoryAlert);
            return;
        }
 
        document.getElementById('start-button').setAttribute('disabled', 'disabled');
 
        $('.blackout, #form-categorization .close').unbind();
        $('.blackout, #form-categorization .close').bind('click', function() {
            $.showCustomModal(i18n.warning, i18n.closeModalWarning, {
                id: 'close-warning',
                width: 400,
                buttons: [{
                    message: i18n.close,
                    defaultButton: true,
                    handler: function() {
                        // Nope, you can't close both with one call.
                        $('#close-warning').closeModal();
                        $('#form-categorization').closeModal();
                    }
                }, {
                    message: i18n.cancel,
                    handler: function() {
                        $('#close-warning').closeModal();
                    }
                }]
            });
        });
        if (!page && !document.getElementById('form-complete')) {
            document.getElementById('start-button').removeAttribute("disabled");
            $.showCustomModal(i18n.finished, i18n.nothingLeftToDo, {
                id: 'form-complete',
                width: 200,
                callback: function() {
                    var $blackout = $('.blackout').last();
                    $blackout.unbind();
                    $blackout.click(function() {
                        $('#form-complete .wikia-button').click();
                    });
                },
                buttons: [{
                    message: i18n.close,
                    id: 'form-complete-button',
                    defaultButton: true,
                    handler: function() {
                        $('#form-complete').closeModal();
                        var $elems = $('.blackout, #form-categorization .close');
                        $elems.unbind();
                        $elems.click(function() {
                            $('#form-categorization').closeModal();
                        });
                    }
                }]
            });
        } else {
            categorize(page, catNames);
        }
        pages = pages.slice(1, pages.length);
        txt.value = pages.join('\n');
    }
 
    function categorize(pageToCat, cats) {
        var actionVal = document.getElementById('select-mc').value;
        if (actionVal == 3) {
            var newCatEl = Array.from(document.getElementsByClassName('replace-category-name'));
            var newCats = [];
            $.each(newCatEl, function(i, name) {
                name = name.value.trim();
                newCats.push(name.charAt(0).toUpperCase() + name.slice(1));
            });
            if (!newCats.filter(Boolean).length) {
                alert(i18n.noCategoryToReplace.replace('$1', (newCatEl.length == 1 ? i18n.category : i18n.categoryPlural) ));
                document.getElementById('start-button').removeAttribute("disabled");
                return;
            }
        }
        Api.get({
            action: 'query',
            titles: pageToCat,
            prop: 'revisions|categories',
            rvprop: 'content',
            cb: new Date().getTime()
        }).done(function(d) {
            var page = d.query.pages[Object.keys(d.query.pages)[0]];
            var content = page.missing === '' ? '' : page.revisions[0]['*'];
            var newContent = content;
            var config;
            var summary;
            if (actionVal == 1 && !d.error) {
                /*
                 * Добавляет категорию.
                 */
                if (page.missing === '') {
                    logError(i18n.pageNotExist.replace('$1', pageToCat));
                    return;
                }
                var knownCats = [];
                if (page.categories) {
                    $.each(page.categories, function(i, categ) {
                        knownCats.push(categ.title);
                    });
                }
                var toAdd = [];
                $.each(cats, function(i, cat) {
                    if (!cat) return;
                    cat = i18n.category + ':' + cat;
                    if (knownCats.indexOf(cat) === -1) toAdd.push(cat);
                });
                if (toAdd.length) {
                    var sPrefix = "";
                    var sSuffix = "";
                    if ($('input[name=mass-categorization-noinclude]').prop('checked')) {
                        sPrefix = "<noinclude>";
                        sSuffix = "<\/noinclude>";
                    }
                    summary = i18n.addSummary
                        .replace('$1', (toAdd.length == 1 ? i18n.category : i18n.categoryPlural + ':') + ' [[' + toAdd.join(']], [[') + ']]')
                        .replace(new RegExp('\\[\\[(?:' + i18n.category + '|Category):(.*?)\\]\\]', 'gi'), '[[' + i18n.category + ':$1|$1]]');
                    config = {
                        format: 'json',
                        action: 'edit',
                        title: pageToCat,
                        summary: summary,
                        nocreate: '',
                        appendtext: sPrefix + '\n[[' + toAdd.join(']]\n[[') + ']]' + sSuffix,
                        bot: true,
                        minor: true,
                        token: mw.user.tokens.get('editToken')
                    };
 
                    $.ajax({
                        url: mw.util.wikiScript('api'),
                        data: config,
                        dataType: 'json',
                        type: 'POST',
                        success: function(d) {
                            if (!d.error) {
                                console.log((toAdd.length == 1 ? i18n.category : i18n.categoryPlural) + ' successfully added to ' + pageToCat + '!');
                            } else {
                                logError(i18n.addFail.replace('$1',(toAdd.length == 1 ? i18n.category : i18n.categoryPlural )).replace('$2',pageToCat) + ': ' + d.error.code);
                            }
                        },
                        error: function() {
                            logError(i18n.addFail.replace('$1',(toAdd.length == 1 ? i18n.category : i18n.categoryPlural )).replace('$2',pageToCat));
                        }
                    });
                } else {
                    logError(cats.length == 1 ? pageToCat + ' already has the category ' + cats[0].substring(9) + ' or an error was encountered; it has been skipped.' : pageToCat + ' has each of the categories specified; it has been skipped.');
                }
            } else if (actionVal == 2 && !d.error) {
                /*
                 * Удаляет категорию.
                 */
                if (page.missing === '') {
                    logError(i18n.pageNotExist.replace('$1',pageToCat));
                    return;
                }
 
                $.each(cats, function(i, cat) {
                    if (!cat) {
                        cats[i] = false;
                        return;
                    }

                    // Удалить её
                    var cSens = document.getElementById('mc-case-sensitive').checked;
                    var broad = document.getElementById('mc-broad-removal').checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var escapedCat = $.escapeRE(cat).replace(/\s/g, '(\\s|_)');
                    var escapedName = $.escapeRE(categoryName).replace(/\s/g, '(\\s|_)');
                    var nRegEx = '\\[\\[' + escapedName + ':' + escapedCat + '\\]\\]';
                    var sRegEx = '(\\[\\[' + escapedName + ':' + escapedCat + '\\]\\]|\\[\\[' + i18n.category + ':' + escapedCat + '\\|.*?\\]\\])';
                    var regex = new RegExp(broad ? sRegEx : nRegEx, flags);
                    if ($('input[name=mass-categorization-removal]:checked').val() == 2) {
                        regex = new RegExp(sRegEx, "gi");
                    }
                    if (document.getElementById('mc-noinclude').checked) {
                        regex = new RegExp('\\<noinclude\\>\\s*' + (broad ? sRegEx : nRegEx) + '\\s*\\<\/noinclude\\>', flags);
                    }
                    if (regex.test(newContent)) 
                        newContent = newContent.replace(regex, '');
                    else {
                        console.log(i18n.removeNotFound.replace('$1', cat).replace('$2', pageToCat));
                        cats[i] = false;
                    }
                    newContent = newContent.replace(regex, '');
                });
 
                //don't submit if new and old contents are equal (no category found)
                if (newContent == content) {
                    logError(i18n.removeNotFound.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2',pageToCat ));
                    return;
                }
 
                //отправить новую страницу
                cats = cats.filter(Boolean);
                summary = i18n.removeSummary
                    .replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) + ' [[' + i18n.category + ':' + cats.join(']], [[' + i18n.category + ':') + ']]')
                    .replace(new RegExp('\\[\\[(?:' + i18n.category + '|Category):(.*?)\\]\\]', 'gi'), '[[' + i18n.category + ':$1|$1]]');
                config = {
                    format: 'json',
                    action: 'edit',
                    watchlist: 'nochange',
                    title: pageToCat,
                    summary: summary,
                    nocreate: '',
                    text: newContent,
                    bot: true,
                    minor: true,
                    token: mw.user.tokens.get('editToken')
                };
 
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    data: config,
                    dataType: 'json',
                    type: 'POST',
                    success: function(d) {
                        if (!d.error) {
                            console.log(i18n.removeSuccess.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat) );
                        } else {
                            logError(i18n.removeFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat) + ': ' + d.error.code);
                        }
                    },
                    error: function() {
                        logError(i18n.removeFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat));
                    }
                });
            } else if (actionVal == 3 && !d.error) {
                /* 
                 * Заменить категорию.
                 */
                if (page.missing === '') {
                    logError(i18n.pageNotExist.replace('$1', pageToCat) );
                    return;
                }
 
                // Заменить её
                $.each(cats, function(i, cat) {
                    if (!cat) {
                        console.log(i18n.noCategoryToReplace);
                        cat[i] = false;
                        newCats[i] = false;
                        return;
                    } else if (!newCats[i]) {
                        console.log(cat + ': ' + i18n.noCategoryToReplace);
                        cats[i] = false;
                        newCats[i] = false;
                        return;
                    }
                    var cSens = document.getElementById('mc-case-sensitive').checked;
                    var broad = document.getElementById('mc-broad-removal').checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var escapedCat = cat;
                    ['\\', '(', ')', '[', ']', '{', '}', '?', '.', '^', '$', '|'].forEach(function(el) {
                        escapedCat = escapedCat.replace(new RegExp('\\' + el, 'g'), '\\' + el);
                    });
                    var nRegEx = '\\[\\[' + i18n.category + ':' + escapedCat + '\\]\\]';
                    var sRegEx = '(\\[\\[' + i18n.category + ':' + escapedCat + '\\]\\]|\\[\\[' + i18n.category + ':' + escapedCat + '\\|.*?\\]\\])';
                    var regex = new RegExp(broad ? sRegEx : nRegEx, flags);
                    var newCat = i18n.category + ':' + newCats[i].charAt(0).toUpperCase() + newCats[i].substring(1);
                    if (regex.test(newContent)) 
                        newContent = newContent.replace(regex, '[[' + newCat + ']]');
                    else {
                        cats[i] = false;
                        newCats[i] = false;
                        return;
                    }
                });
 
 
                // Don't submit if new and old contents are equal (no category found)
                if (newContent == content) {
                    logError(i18n.removeNotFound.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat));
                    return;
                }
 
                // Создание сводки
                cats = cats.filter(Boolean);
                newCats = newCats.filter(Boolean);
                if (cats.length == 1)
                    summary = i18n.replaceSummary
                        .replace('$1', '[[' + i18n.category + ':' + cats[0] + '|' + cats[0] + ']]')
                        .replace('$2', '[[' + i18n.category + ':' + newCats[0] + '|' + newCats[0] + ']]');
                else {
                    var replacements = '';
                    $.each(cats, function(i, cat) {
                        var temp = replacements + '[[' + i18n.category + ':' + cat + '|' + cat + ']] → [[' + i18n.category + ':' + newCats[i] + '|' + newCats[i] + ']], ';
                        if (temp.length > 150) {
                            if (replacements.indexOf('(+)') == -1)
                                replacements = replacements.replace('(' + i18n.automatic + ')', '(+) (' + i18n.automatic + ')');
                            return;
                        }
                        replacements = temp;
                    });
                    summary = i18n.multiReplaceSummary
                        .replace('$1', replacements.slice(0, replacements.length - 2));
                }
 
                //отправить новую страницу
                config = {
                    format: 'json',
                    action: 'edit',
                    watchlist: 'nochange',
                    title: pageToCat,
                    summary: summary,
                    nocreate: '',
                    text: newContent,
                    bot: true,
                    minor: true,
                    token: mw.user.tokens.get('editToken')
                };
 
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    data: config,
                    dataType: 'json',
                    type: 'POST',
                    success: function(d) {
                        if (!d.error) {
                            console.log(i18n.replaceSuccess.replace('$1', pageToCat));
                        } else {
                            logError(i18n.replaceFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat) + ': ' + d.error.code);
                        }
                    },
                    error: function() {
                        logError(i18n.replaceFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat));
                    }
                });
            } else {
                if (actionVal == 1) logError(i18n.categoryCheckFail.replace('$1', pageToCat) + d.error.code);
                else logError(i18n.failedToGetContents.replace('$1', pageToCat) + d.error.code);
            }
        }).fail(function() {
            if (actionVal == 1) logError(i18n.categoryCheckFail.replace('$1', pageToCat));
            else logError(i18n.failedToGetContents.replace('$1', pageToCat));
        });
        setTimeout(init, delay);
    }
});