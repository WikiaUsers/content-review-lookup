/**
 * Ajax Message Wall Greeting Creation
 * Attempts to create your message wall greeting
 * Adapted from Grunny's QuickCreateUserPage tool
 */
 
 
( function( $, mw, window ) {
	'use strict';
 
	var QuickCreateMessageWallGreeting = {
 
		init: function() {
			var $qcLink = $( '<li />' ).attr( 'id', 'quick-cup' ).addClass( 'QuickCreateMessageWallGreeting' ).append(
				$( '<a />' ).attr( 'title', QuickCreateMessageWallGreeting.langMsg( 'button-tooltip', true ) )
					.attr( 'style', 'cursor: pointer' ).text( QuickCreateMessageWallGreeting.langMsg( 'button-link-text', true ) )
					.click( QuickCreateMessageWallGreeting.createMessageWallGreeting )
			);
			//checks if message walls are enabled on the wiki, thanks to Colour and Speedit
			var wall = '.wds-global-navigation__dropdown-link[data-tracking-label="account.message-wall"]';
			if ($(wall).length === 0) {
				console.log('Message walls are not enabled on this wiki, exiting QuickCreateMessageWallGreeting');
				return;
			} else {
				if ( mw.config.get( 'skin' ) === 'oasis' ) {
					$( '.wds-global-navigation__user-menu .wds-list').append( $qcLink );
				} else {
					$( '#column-one' ).find( '#p-personal > .pBody > ul' ).prepend( $qcLink );
				}
			}
		},
 
		langConfig: {
			// English
			en: {
				'button-link-text': 'Create message wall greeting',
				'button-tooltip': 'Automatically create your message wall greeting',
				'buttontalk-link-text': 'Create message wall greeting',
				'buttontalk-tooltip': 'Create your message wall greeting on this wiki automagically',
				'cup-reason': 'Creating message wall greeting',
				'cup-success-text': 'Successfully created greeting!',
				'cup-error-exists': 'Greeting already exists!',
				'cup-error-failed': 'Creating greeting failed!'
			},
			// Arabic
			ar: {
				'button-link-text': 'إنشاء تحية الجدار المناقشة',
				'button-tooltip': 'إنشاء تلقائي تحية على الجدار مناقشة هذه الويكي',
				'buttontalk-link-text': 'إنشاء تحية الجدار المناقشة',
				'buttontalk-tooltip': 'إنشاء تلقائي تحية على الجدار مناقشة هذه الويكي',
				'cup-reason': 'إنشاء تحيات الجدار المناقشة',
				'cup-success-text': 'إنشاء تحيات كاملة!',
				'cup-error-exists': 'تحية موجود بالفعل',
				'cup-error-failed': 'فشلت في خلق تحية!'
			},
			// Belarusian
			be: {
				'button-link-text': 'Стварыць вітанне сцяны абмеркавання',
				'button-tooltip': 'Стварыць аўтаматычнае вітанне на сцяне абмеркавання на гэтай вікі',
				'buttontalk-link-text': 'Стварыць вітанне сцяны абмеркавання',
				'buttontalk-tooltip': 'Стварыць аўтаматычнае вітанне на сцяне абмеркавання на гэтай вікі',
				'cup-reason': 'Стварэнне вітання сцяны абмеркавання',
				'cup-success-text': 'Стварэнне вітання завершана!',
				'cup-error-exists': 'Вітанне ўжо існуе',
				'cup-error-failed': 'Не атрымалася стварыць вітанне!'
			},
			// Bosnian
			bs: {
				'button-link-text': 'Stvoriti stranicu sudionika',
				'button-tooltip': 'Automatski kreirati svoju stranicu sudionika',
				'buttontalk-link-text': 'Stvoriti zid rasprave sudionika',
				'buttontalk-tooltip': 'Automatski stvoriti svoj zid rasprave sudionika',
				'cup-reason': 'Izrada stranice sudionika',
				'cup-success-text': 'Stranica je uspješno kreiran!',
				'cup-error-exists': 'Stranica već postoji!',
				'cup-error-failed': 'Nije uspio stvoriti stranicu!'
			},
			// Catalan
			ca: {
				'button-link-text': 'Crea la benvinguda del mur',
				'button-tooltip': 'La teva benvinguda del mur ha estat creada automàticament',
				'buttontalk-link-text': 'Crea la benvinguda del mur',
				'buttontalk-tooltip': 'Crea la teva benvinguda del mur automàticament en aquesta comunitat',
				'cup-reason': 'Creant benvinguda del mur',
				'cup-success-text': 'S\'ha creat amb èxit la teva benvinguda del mur!',
				'cup-error-exists': 'La teva benvinguda del mur ja existeix!',
				'cup-error-failed': 'Ha ocorregut un error en crear la teva benvinguda del mur!'
			},
			// German
			de: {
				'button-link-text': 'Begrüßung erstellen',
				'button-tooltip': 'Begrüßung automatisch erstellen',
				'buttontalk-link-text': 'Begrüßung erstellen',
				'buttontalk-tooltip': 'Begrüßung automatisch erstellen',
				'cup-reason': 'Begrüßung erstellt',
				'cup-success-text': 'Begrüßung erfolgreich erstellt!',
				'cup-error-exists': 'Die Begrüßung existiert schon!',
				'cup-error-failed': 'Erstellung fehlgeschlagen!'
			},
			// Greek
			el: {
				'button-link-text': 'Δημιούργησε χαιρετιστήριο μήνυμα στο τοίχο μυνημάτων',
				'button-tooltip': 'Αυτόματα δημιούργησε χαιρετιστήριο μήνυμα στο τοίχο μηνυμάτων',
				'buttontalk-link-text': 'Δημιούργησε χαιρετιστήριο μύνημα στο τοίχο μυνημάτων',
				'buttontalk-tooltip': 'Δημιούργησε χαιρετιστήριο μύνημα στο τοίχο μυνημάτων σε αυτή τη wiki αυτόματα',
				'cup-reason': 'Δημιουργώντας χαιρετιστήριο μήνυμα στο τοίχο μηνυμάτων',
				'cup-success-text': 'Δημιουργήθηκε χαιρετιστήριο μύνημα επιτυχώς!',
				'cup-error-exists': 'Το χαιρετιστήριο μήνυμα υπάρχει ήδη!',
				'cup-error-failed': 'Η δημιουργία του χαιρετιστήριου μηνύματος απέτυχε!'
			},
			// Esperanto
			eo: {
				'button-link-text': 'Krei mesaĝmuro-saluton',
				'button-tooltip': 'Krei vian mesaĝmuro-saluton aŭtomate',
				'buttontalk-link-text': 'Krei mesaĝmuro-saluton',
				'buttontalk-tooltip': 'Krei vian mesaĝmuro-saluton en ĉi tiu vikio aŭtomate',
				'cup-reason': 'Kreante mesaĝmuro-saluton',
				'cup-success-text': 'Sukcese kreis saluton!',
				'cup-error-exists': 'Saluto jam ekzistas!',
				'cup-error-failed': 'Salutokreado malsukcesis!'
			},
			// Spanish
			es: {
				'button-link-text': 'Crear bienvenida del muro',
				'button-tooltip': 'Tu bienvenida del muro ha sido creada automáticamente',
				'buttontalk-link-text': 'Crear bienvenida del muro',
				'buttontalk-tooltip': 'Crear tu bienvenida del muro automáticamente en esta comunidad',
				'cup-reason': 'Creando bienvenida del muro',
				'cup-success-text': '¡Se ha creado exitosamente tu bienvenida del muro!',
				'cup-error-exists': '¡Tu bienvenida del muro ya existe!',
				'cup-error-failed': '¡Ha ocurrido un error al crear tu bienvenida del muro!'
			},
			// Finnish
			fi: {
				'button-link-text': 'Luo viestiseinä tervehdys',
				'button-tooltip': 'Luo viestiseinä tervehdys automaattisesti',
				'buttontalk-link-text': 'Luo viestiseinä tervehdys',
				'buttontalk-tooltip': 'Luo viestiseinä tervehdyksesi automaattisesti tässä wikissä',
				'cup-reason': 'Luodaan viestiseinä tervehdystä',
				'cup-success-text': 'Tervehdyksen luominen onnistui!',
				'cup-error-exists': 'Tervehdys on jo luotu!',
				'cup-error-failed': 'Tervehdyksen luominen epäonnistui!'
			},
			// French
			fr: {
				'button-lien-text': 'Créer accueil du mur',
				'button-tooltip': 'Votre accueil du mur a été créé automatiquement',
				'buttontalk-lien-text': 'Créer accueil du mur',
				'buttontalk-tooltip': 'Créer votre accueil du mur automatiquement sur cette communauté',
				'cup-reason': 'Création de l\'accueil du mur',
				'cup-success-text': 'La création de l\'accueil du mur a réussi !',
				'cup-error-exists': 'Votre accueil du mur existe déjà !',
				'cup-error-failed': 'La création de l\'accueil du mur a échoué !'
			},
			// Frisian
			fy: {
				'button-link-text': 'Meitsje prikboerdbegroeting oan',
				'button-tooltip': 'Automatysk prikbordbegroeting oanmeitjse',
				'buttontalk-link-text': 'Meitsje prikboerdbegroeting oan',
				'buttontalk-tooltip': 'Meitsje de prikboerdbegroeting op dizze wiki automagysk oan',
				'cup-reason': 'Prikboerdbegroeting oanmeitsje',
				'cup-success-text': 'Prikboerdbegroeting succesvol oanmakke!',
				'cup-error-exists': 'Prikboerdbegroeting bestiet al!',
				'cup-error-failed': 'Prikboerdbegroeting oanmeitjse mislukt!'
			},
			// Galician
			gl: {
				'button-link-text': 'Crear mensaxe de benvida do muro',
				'button-tooltip': 'A túa mensaxe de benvida do muro creouse automaticamente',
				'buttontalk-link-text': 'Crear mensaxe de benvida do muro',
				'buttontalk-tooltip': 'Crea a túa mensaxe de benvida do muro automaticamente nesta comunidade',
				'cup-reason': 'A crear mensaxe de benvida do muro',
				'cup-success-text': 'A túa mensaxe de benvida do muro creouse con éxito!',
				'cup-error-exists': 'A túa mensaxe de benvida do muro xa existe!',
				'cup-error-failed': 'Ocorreu un erro ao crear a túa mensaxe de benvida do muro!'
			},
			// Hindi
			hi: {
				'button-link-text': 'बनाएं संदेश दीवार बधाई ',
				'button-tooltip': 'स्वचालित रूप से अपने संदेश दीवार बधाई बनाने',
				'buttontalk-link-text': 'बनाएं संदेश दीवार बधाई ',
				'buttontalk-tooltip': 'अपना संदेश दीवार स्वतः इस विकि पर बधाई',
				'cup-reason': 'संदेश दीवार बधाई बनाना',
				'cup-success-text': 'सफलतापूर्वक ग्रीटिंग बनाया!',
				'cup-error-exists': 'बधाई पहले से मौजूद है!',
				'cup-error-failed': 'बधाई बनाना विफल!'
			},
			// Croatian
			hr: {
				'button-link-text': 'Stvoriti pozdrav zid rasprave',
				'button-tooltip': 'Stvoriti automatski pozdrav na zidu rasprave na ovom wikiju',
				'buttontalk-link-text': 'Stvoriti pozdrav zid rasprave',
				'buttontalk-tooltip': 'Stvoriti automatski pozdrav na zidu rasprave na ovom wikiju',
				'cup-reason': 'Stvaranje pozdrav zid rasprave',
				'cup-success-text': 'Stvaranje pozdrav završena!',
				'cup-error-exists': 'Pozdrav već postoji',
				'cup-error-failed': 'Nije uspio stvoriti pozdrav!'
			},
			// Indonesian
			id: {
				'button-link-text': 'Membuat Pesan Dinding',
				'button-tooltip': 'Membuat Pesan Dinding di wiki ini secara otomatis', 
				'cup-reason': 'Pembuatan Pesan Dinding',
				'cup-sucess-text': 'Berhasil membuat pesan dinding!',
				'cup-error-exists': 'Pesan Dinding telah terdaftar!',
				'cup-error-failed': 'Gagal membuat Pesan Dinding, silahkan coba lagi!'
			},
			// Italian
			it: {
				'button-link-text': 'Crea benvenuto della bacheca',
				'button-tooltip': 'Il tuo benvenuto della bacheca è stato creato automaticamente',
				'buttontalk-link-text': 'Crea benvenuto della bacheca',
				'buttontalk-tooltip': 'Crea il tuo benvenuto della bacheca automaticamente su questa comunità',
				'cup-reason': 'Creando benvenuto della bacheca',
				'cup-success-text': 'È stato creato con successo il tuo benvenuto della bacheca!',
				'cup-error-exists': 'Il tuo benvenuto della bacheca esiste già!',
				'cup-error-failed': 'C\'è un errore nella creazione del tuo benvenuto della bacheca!'
			},
			// Japanese
			ja: {
				'button-link-text': 'メッセージウォール・グリーティングを作成',
				'button-tooltip': 'メッセージウォール・グリーティングを自動作成',
				'buttontalk-link-text': 'メッセージウォール・グリーティング（挨拶文）を作成する。',
				'buttontalk-tooltip': 'メッセージウォール・グリーティング（挨拶文）を自動作成する。',
				'cup-reason': 'メッセージウォール・グリーティング作成中',
				'cup-success-text': '作成完了！',
				'cup-error-exists': '既にページがあります。',
				'cup-error-failed': '作成できませんでした。'
			},
			// Kannada
			kn: {
				'button-link-text': 'ಸಂದೇಶ ಗೋಡೆಯ ಶುಭಾಶಯ ರಚಿಸಿ',
				'button-tooltip': 'ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಗೋಡೆಯ ಶುಭಾಶಯ ರಚಿಸಲು',
				'buttontalk-link-text': 'ರಚಿಸಿ ಸಂದೇಶವನ್ನು ಗೋಡೆಯ ಶುಭಾಶಯ',
				'buttontalk-tooltip': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಗೋಡೆಯ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಈ ವಿಕಿ ಶುಭಾಶಯ ರಚಿಸಿ',
				'cup-reason': 'ಸಂದೇಶ ಗೋಡೆಯ ಶುಭಾಶಯ ರಚಿಸಲಾಗುತ್ತಿದೆ',
				'cup-success-text': 'ಯಶಸ್ವಿಯಾಗಿ ಶುಭಾಶಯ ರಚಿಸಲಾಗಿದೆ!',
				'cup-error-exists': 'ಶುಭಾಶಯ ಈಗಾಗಲೇ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ!',
				'cup-error-failed': 'ರಚನೆಯಿದೆ ಶುಭಾಶಯ ವಿಫಲವಾಗಿದೆ!'
			},
			// Korean
			ko: {
				'button-link-text': '메시지 담벼락 인사문을 만드세요',
				'button-tooltip': '자동으로 메시지 담벼락 인사문을 만드세요',
				'buttontalk-link-text': '메시지 담벼락 인사문을 만드세요',
				'buttontalk-tooltip': '이 위키에 자동으로 메시지 담벼락 인사문을 만드세요',
				'cup-reason': '메시지 담벼락 인사문을 만드는 중',
				'cup-success-text': '인사문 만들기 성공!',
				'cup-error-exists': '인사문이 이미 존재합니다!',
				'cup-error-failed': '인사문 만들기 실패!'
			},
			// Latin
			la: {
				'button-link-text': 'Usoris discussionis paginae salutem creare',
				'button-tooltip': 'Usoris discussionis paginae salutem in hac encyclopaedia automatopoete creare',
				'buttontalk-link-text': 'Usoris discussionis paginae salutem creare',
				'buttontalk-tooltip': 'Usoris discussionis paginae salutem in hac encyclopaedia automatopoete creare',
				'cup-reason': 'Usoris discussionis paginae salutis creatio',
				'cup-success-text': 'Salutis creatio finita est!',
				'cup-error-exists': 'Salus iam est',
				'cup-error-failed': 'Nequit salutem creare!'
			},
			// Latvian
			lv: {
				'button-link-text': 'Izveidot sveicinājumu diskusijas lapā',
				'button-tooltip': 'Automātiski izveidot sveicinājumu mana diskusijas lapā',
				'buttontalk-link-text': 'Izveidot sveicinājumu diskusijas lapā',
				'buttontalk-tooltip': 'Automātiski izveidot sveicinājumu mana diskusijas lapā',
				'cup-reason': 'Sveicinājuma izveidošana',
				'cup-success-text': 'Sveicinājums tika veiksmīgi izveidots!',
				'cup-error-exists': 'Sveicinājums jau ekistē!',
				'cup-error-failed': 'Sveicinājums netika izveidots!'
			},
			// Dutch
			nl: {
				'button-link-text': 'Maak prikbordbegroeting aan',
				'button-tooltip': 'Automatisch prikbordbegroeting aanmaken',
				'buttontalk-link-text': 'Maak prikbordbegroeting aan',
				'buttontalk-tooltip': 'Maak de prikbordbegroeting op deze wiki automagisch aan',
				'cup-reason': 'Prikbordbegroeting aanmaken',
				'cup-success-text': 'Prikbordbegroeting súksesfol aangemaakt!',
				'cup-error-exists': 'Prikbordbegroeting bestaat al!',
				'cup-error-failed': 'Prikbordbegroeting aanmaken mislukt!'
			},
			// Occitan
			oc: {
				'button-link-text': 'Crear benvenguda del mur',
				'button-tooltip': 'Ta benvenguda del mur es estat creada automaticament',
				'buttontalk-link-text': 'Crear benvenguda del mur',
				'buttontalk-tooltip': 'Crear ta benvenguda del mur automaticament sus aquesta comunitat',
				'cup-reason': 'Creacion de la benvenguda del mur',
				'cup-success-text': 'Es estat creada amb capitada ta benvenguda del mur !',
				'cup-error-exists': 'Ta benvenguda del mur existís ja !',
				'cup-error-failed': 'Error amb la creacion de ta benvenguda del mur !'
			},
			// Polish
			pl: {
				'button-link-text': 'Utwórz nagłówek tablicy wiadomości',
				'button-tooltip': 'Utwórz automatycznie nagłówek tablicy wiadomości na tej Wiki',
				'buttontalk-link-text': 'Utwórz nagłówek tablicy wiadomości',
				'buttontalk-tooltip': 'Utwórz automatycznie nagłówek tablicy wiadomości na tej Wiki',
				'cup-reason': 'Utworzenie nagłówka tablicy wiadomości',
				'cup-success-text': 'Zakończono tworzenie nagłówka!',
				'cup-error-exists': 'Nagłówek już istnieje',
				'cup-error-failed': 'Niepowodzenie!'
			},
			// European Portuguese
			pt: {
				'button-link-text': 'Criar saudação no mural',
				'button-tooltip': 'A tua saudação no mural de mensagens criou-se automaticamente',
				'buttontalk-link-text': 'Criar saudação no mural de mensagens',
				'buttontalk-tooltip': 'Cria a tua saudação no mural de mensagens automaticamente nesta comunidade',
				'cup-reason': 'A criar saudação no mural de mensagens',
				'cup-success-text': 'A tua saudação no mural de mensagens criou-se com sucesso!',
				'cup-error-exists': 'A tua saudação no mural de mensagens já existe!',
				'cup-error-failed': 'Ocorreu um erro ao criar a tua saudação no mural de mensagens!'
			},
			// Brazilian Portuguese
			'pt-br': {
				'button-link-text': 'Criar saudação no mural',
				'button-tooltip': 'Sua saudação no mural de mensagens foi criada automaticamente',
				'buttontalk-link-text': 'Criar saudação no mural de mensagens',
				'buttontalk-tooltip': 'Crie sua saudação no mural de mensagens automaticamente nesta comunidade',
				'cup-reason': 'Criando saudação no mural de mensagens',
				'cup-success-text': 'Sua saudação no mural de mensagens foi criada com sucesso!',
				'cup-error-exists': 'Sua saudação no mural de mensagens já existe!',
				'cup-error-failed': 'Ocorreu um erro criando sua saudação no mural de mensagens!'
			},
			// Romanian
			ro: {
				'button-link-text': 'Crearea salutului pentru peretele tău de mesaje',
				'button-tooltip': 'Salutul pentru peretele tău de mesaje a fost creat în mod automat',
				'buttontalk-link-text': 'Crearea salutului pentru peretele tău de mesaje',
				'buttontalk-tooltip': 'Creează-ţi salutul pentru peretele tău de mesaje în mod automat pe această comunitate',
				'cup-reason': 'Creându-ţi salutul pentru peretele tău de mesaje',
				'cup-success-text': 'Salutul pentru peretele tău de mesaje a fost creat cu succes!',
				'cup-error-exists': 'Salutul pentru peretele tău de mesaje deja există!',
				'cup-error-failed': 'Există o eroare în crearea salutului pentru peretele tău de mesaje!'
			},
			// Russian
			ru: {
				'button-link-text': 'Создать приветствие стены обсуждения',
				'button-tooltip': 'Создать автоматическое приветствие на стене обсуждения на этой вики',
				'buttontalk-link-text': 'Создать приветствие стены обсуждения',
				'buttontalk-tooltip': 'Создать автоматическое приветствие на стене обсуждения на этой вики',
				'cup-reason': 'Создание приветствия стены обсуждения',
				'cup-success-text': 'Создание приветствия завершено!',
				'cup-error-exists': 'Приветствие уже существует',
				'cup-error-failed': 'Не удалось создать приветствие!'
			},
			// Scots
			sco: {
				'button-link-text': 'Creaut message waw greetin',
				'button-tooltip': 'Automatically creaut yer message waw greetin',
				'buttontalk-link-text': 'Creaut message waw greetin',
				'buttontalk-tooltip': 'Creaut yer message waw greetin on this wiki automagically',
				'cup-reason': 'Creautin message waw greetin',
				'cup-success-text': 'Successfully creautit greetin!',
				'cup-error-exists': 'Greetin awready exists!',
				'cup-error-failed': 'Creatin greetin failt!'
			},
			// Ukrainian
			uk: {
				'button-link-text': 'Створити привітання стіни обговорення',
				'button-tooltip': 'Створити автоматичне привітання на стіні обговорення на цій вікі',
				'buttontalk-link-text': 'Створити привітання стіни обговорення',
				'buttontalk-tooltip': 'Створити автоматичне привітання на стіні обговорення на цій вікі',
				'cup-reason': 'Створення привітання стіни обговорення',
				'cup-success-text': 'Створення привітання завершено!',
				'cup-error-exists': 'Привітання вже існує',
				'cup-error-failed': 'Не вдалося створити привітання!'
			},
			// Valencian
			val: {
				'button-link-text': 'Crear benvinguda del mur',
				'button-tooltip': 'La tua benvinguda del mur ha segut creada automaticament',
				'buttontalk-link-text': 'Crear benvinguda del mur',
				'buttontalk-tooltip': 'Crear la tua benvinguda del mur automaticament en esta comunitat',
				'cup-reason': 'Creant benvinguda del mur',
				'cup-success-text': '¡S\'ha creat exitosament la tua benvinguda del mur!',
				'cup-error-exists': '¡La tua benvinguda del mur ya existix!',
				'cup-error-failed': '¡Ha ocorregut un error creant la tua benvinguda del mur!'
			},
			// Chinese
			zh: {
				'button-link-text': '创建信息墙问候语',
				'button-tooltip': '自动创建您的信息墙问候语',
				'buttontalk-link-text': '创建信息墙问候语',
				'buttontalk-tooltip': '于此维基自动创建您的信息墙问候语',
				'cup-reason': '正在创建信息墙问候语',
				'cup-success-text': '成功创建信息墙问候语！',
				'cup-error-exists': '信息墙问候语已经存在！',
				'cup-error-failed': '创建信息墙问候语失败！'
			},
			// Chinese (Simplified)
			'zh-hans': {
				'button-link-text': '创建信息墙问候语',
				'button-tooltip': '自动创建您的信息墙问候语',
				'buttontalk-link-text': '创建信息墙问候语',
				'buttontalk-tooltip': '于此维基自动创建您的信息墙问候语',
				'cup-reason': '正在创建信息墙问候语',
				'cup-success-text': '成功创建信息墙问候语！',
				'cup-error-exists': '信息墙问候语已经存在！',
				'cup-error-failed': '创建信息墙问候语失败！'
			},
			// Chinese (Traditional)
			'zh-hant': {
				'button-link-text': '創建信息牆問候語',
				'button-tooltip': '自動創建您的信息牆問候語',
				'buttontalk-link-text': '創建信息牆問候語',
				'buttontalk-tooltip': '於此維基自動創建您的信息牆問候語',
				'cup-reason': '正在創建信息牆問候語',
				'cup-success-text': '成功創建信息牆問候語！',
				'cup-error-exists': '信息牆問候語已經存在！',
				'cup-error-failed': '創建信息牆問候語失敗！'
			},
			// Chinese (Taiwan)
			'zh-tw': {
				'button-link-text': '新建訊息牆問候語',
				'button-tooltip': '自動建立您的訊息牆問候語',
				'buttontalk-link-text': '新建訊息牆問候語',
				'buttontalk-tooltip': '於此維基自動建立您的訊息牆問候語',
				'cup-reason': '正在建立訊息牆問候語',
				'cup-success-text': '成功建立訊息牆問候語！',
				'cup-error-exists': '訊息牆問候語已經存在！',
				'cup-error-failed': '建立訊息牆問候語失敗！'
			}
		},
		langMsg: function ( name, userLang ) {
			if ( userLang && mw.config.get( 'wgUserLanguage' ) in QuickCreateMessageWallGreeting.langConfig && name in QuickCreateMessageWallGreeting.langConfig[mw.config.get( 'wgUserLanguage' )] ) {
				return QuickCreateMessageWallGreeting.langConfig[mw.config.get( 'wgUserLanguage' )][name];
			}
			if ( !userLang && mw.config.get( 'wgContentLanguage' ) in QuickCreateMessageWallGreeting.langConfig && name in QuickCreateMessageWallGreeting.langConfig[mw.config.get( 'wgContentLanguage' )] ) {
				return QuickCreateMessageWallGreeting.langConfig[mw.config.get( 'wgContentLanguage' )][name];
			}
			return QuickCreateMessageWallGreeting.langConfig.en[name];
		},
 
		createMessageWallGreeting: function() {
			var	MessageWallGreetingContent = window.qtMessageWallGreetingTemplate || '{{w:User:' + mw.config.get( 'wgUserName' ) + '/MessageWallGreeting}}',
				pageName = 'Message_Wall_Greeting:' + mw.config.get( 'wgUserName' ),
				overwriteMessageWallGreeting = window.qtEnableMessageWallGreetingOverwrite || false;
			if ( overwriteMessageWallGreeting === true ) {
				QuickCreateMessageWallGreeting.makeEdit( pageName, MessageWallGreetingContent );
				return;
			}
			$.getJSON( mw.util.wikiScript( 'api' ), {
				action: 'query',
				prop: 'revisions',
				titles: pageName,
				format: 'json'
			} ).done( function ( data ) {
				var	pageIds = Object.keys( data.query.pages ),
					pageId = pageIds[0];
				if ( pageId !== '-1' ) {
					QuickCreateMessageWallGreeting.showResult( 'ok', 'cup-error-exists' );
				} else {
					QuickCreateMessageWallGreeting.makeEdit( pageName, MessageWallGreetingContent );
				}
			} );
		},
 
		makeEdit: function( pageName, MessageWallGreetingContent ) {
			$.ajax( {
				type: 'POST',
				url: mw.util.wikiScript( 'api' ),
				dataType: 'json',
				data: {
					action: 'edit',
					title: pageName,
					summary: QuickCreateMessageWallGreeting.langMsg( 'cup-reason', false ),
					text: MessageWallGreetingContent,
					format: 'json',
					token: mw.user.tokens.get( 'editToken' )
				}
			} ).done( function ( data ) {
				if ( data.edit.result === 'Success' ) {
					QuickCreateMessageWallGreeting.showResult( 'ok', 'cup-success-text' );
				} else {
					QuickCreateMessageWallGreeting.showResult( 'error', 'cup-error-failed' );
				}
			} ).fail( function ( data ) {
				QuickCreateMessageWallGreeting.showResult( 'error', 'cup-error-failed' );
			} );
		},
 
		showResult: function( result, message ) {
			if ( mw.config.get( 'skin' ) === 'monobook' ) {
				mw.util.$content.prepend(
					'<div class="' + ( result === 'error' ? 'errorbox' : 'successbox' ) + '"><p class="plainlinks"><img src="' +
					mw.config.get( 'wgBlankImgUrl' ) + '" class="sprite ' + result + '"> ' + QuickCreateMessageWallGreeting.langMsg( message, true ) + '</p></div>' +
					'<div class="visualClear"></div>'
				);
			} else {
				var resultClass = ( result === 'error' ? 'error' : 'confirm' );
				window.GlobalNotification.show( QuickCreateMessageWallGreeting.langMsg( message, true ), resultClass );
			}
		}
	};
 
	$( QuickCreateMessageWallGreeting.init );
}( jQuery, mediaWiki, this ) );