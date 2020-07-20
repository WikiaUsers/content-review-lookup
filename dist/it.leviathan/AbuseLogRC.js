// ======================
//      AbuseLog in RC
// ======================
/*  Originally created by "User:Suppa chuppa" on http://runescape.wikia.com/wiki/User:Suppa_chuppa/abuselog.js
    Edited and improved by User:leviathan_89
    api documentation: /api.php?query=list
    example: http://community.wikia.com/api.php?action=query&list=abuselog&afllimit=4&afldir=older&aflprop=ids|filter|user|title|result|timestamp|details|hidden&format=jsonfm
    (remove "|details" from the query if you do not have the rights)
    
    thnx Nanaki for the help!
*/

$(function() {
    //
    // Configuration
    //

    // MediaWiki data
    var data =  {
        mw: mw.config.get([
               'wgCanonicalSpecialPageName',
               'wgUserLanguage',
               'wgUserName'
            ]),
        ug: wgUserGroups.join(' ')
    };
    
    // Run condition
    if ( typeof window.abuseLogRCactive !== 'undefined' ) { 
        return;
    }
    if ( data.mw.wgCanonicalSpecialPageName != 'Recentchanges' ) { 
        console.log('[AbuseLogRC]: page is not RecentChanges.');
        return;
    }
    window.abuseLogRCactive = true;
    console.log('[AbuseLogRC]: version 1.01 - 17/05/2017.');
    
    // Configuration
    var config = {
            interval: null,
            showTo: null,
            entries: null,
            order: null,
            timeFrame1: null,
            timeFrame2: null,
            timeFrame3: null,
            position: null,
            collapsible: null,
            userInfo: null
        },
        userType,
        customUser;

    // Variables for functions
    var refreshTimer = null,
        refreshCycle = 0,
        itemSince = null,
        itemIds = [];
     
    // Checking user's custom settings
    config.interval = ( typeof abuseLogRC_interval == 'number' ) ? Math.max(5, abuseLogRC_interval) : 60;
    config.entries = ( typeof abuseLogRC_entries == 'number' ) ? Math.max(1, abuseLogRC_entries) : 3;
    config.showTo = ( typeof abuseLogRC_showTo == 'string' ) ? abuseLogRC_showTo : 'sysop';
    config.order = ( typeof abuseLogRC_order == 'string' ) ? abuseLogRC_order : 'newer';
    config.position = ( typeof abuseLogRC_position === 'string' ) ? abuseLogRC_position : 'before';
    config.collapsible = ( typeof abuseLogRC_collapsible === 'boolean' ) ? abuseLogRC_collapsible : true;
    config.userInfo = ( typeof abuseLogRC_userInfo === 'boolean' ) ? abuseLogRC_userInfo : true;
    config.timeFrame1 = ( typeof abuseLogRC_timeFrame1 == 'number' ) ? abuseLogRC_timeFrame1 * 3600000 : 2 * 3600000;
    config.timeFrame2 = ( typeof abuseLogRC_timeFrame2 == 'number' ) ? abuseLogRC_timeFrame2 * 3600000 : 12 * 3600000;
    config.timeFrame3 = ( typeof abuseLogRC_timeFrame3 == 'number' ) ? abuseLogRC_timeFrame3 * 3600000 : 24 * 3600000;

    // END Configuration
    
    //
    // i18n
    //
    var lang = data.mw.wgUserLanguage,
        splitLang = lang.split('-')[0],
        i18n = {
            // English
            en: {
                optionsHeader: 'Abuse Log Watch options',
                autoRefresh: 'Auto-refresh table every $1 seconds',
                refreshButton: 'Refresh now',
                refreshButtonDesc: 'Click here if table gets stuck',
                lastUpdate: 'Last update:',
                changeNumber: 'Change number of entries:',
                changeButton: 'Change',
                devLink: 'abuseLogRC on Dev Wiki',
                newAccount: 'new account',
                age: 'age:',
                globalEdits: 'global edits:',
                triggeredFilter: 'Triggered abuse filter:',
                vstfTooltip: 'Ask VSTF for help',
                apiError: 'API error:',
                ajaxError: 'AJAX error:'
            },
            // Belarusian
            be: {
                optionsHeader: 'Налады Abuse Log Watch',
                autoRefresh: 'Аўтаматычна абнаўляць кожныя $1 секунд(ы)',
                refreshButton: 'Абнавіць',
                refreshButtonDesc: 'Націсніце тут, калі табліца не абнаўляецца',
                lastUpdate: 'Апошняе абнаўленне:',
                changeNumber: 'Колькасць запісаў:',
                changeButton: 'Змяніць',
                devLink: 'abuseLogRC на Dev Wiki',
                newAccount: 'новы ўліковы запіс',
                age: 'ўзрост:',
                globalEdits: 'колькасць правак на ўсіх вікі:',
                triggeredFilter: 'Фільтр, які спрацаваў :',
                vstfTooltip: 'Папрасіць VSTF аб дапамозе',
                apiError: 'Памылка API:',
                ajaxError: 'Памылка AJAX:'
            },
            // Catalan
            ca: {
                optionsHeader: 'Opcions de control del registre del Filtre Anti-Abús',
                autoRefresh: 'Actualitza automàticament la taula cada $1 segons',
                refreshButton: 'Actualitza ara',
                refreshButtonDesc: 'Fes clic aquí si la taula es bloqueja',
                lastUpdate: 'Última actualització:',
                changeNumber: 'Canvia el nombre d’elements visualitzats',
                changeButton: 'Canvia',
                devLink: 'abuseLogRC a la Dev Wiki',
                newAccount: 'nou compte',
                age: 'edat:',
                globalEdits: 'modificacions globals:',
                triggeredFilter: 'Filtre anti-abús activat:',
                vstfTooltip: 'Demana ajuda al VSTF',
                apiError: 'Error API:',
                ajaxError: 'Error AJAX:'
            },
            // German
            de: {
                optionsHeader: 'Überwachungs-Optionen für Missbrauchsfilter',
                autoRefresh: 'Tabelle alle $1 Sekunden aktualisieren',
                refreshButton: 'Jetzt aktualisieren',
                refreshButtonDesc: 'Hier klicken, falls Tabelle hängenbleibt',
                lastUpdate: 'Letzte Aktualisierung:',
                changeNumber: 'Anzahl der Einträge ändern:',
                changeButton: 'Ändern',
                devLink: 'abuseLogRC im Dev-Wiki',
                newAccount: 'neuer Account',
                age: 'Alter:',
                globalEdits: 'globale Bearbeitungen:',
                triggeredFilter: 'Ausgelöster Filter:',
                vstfTooltip: 'VSTF um Hilfe bitten',
                apiError: 'API-Fehler:',
                ajaxError: 'AJAX-Fehler:'
            },
            // Spanish
            es: {
                optionsHeader: 'Opciones de control del registro del Filtro Anti-Abuso',
                autoRefresh: 'Actualizar automáticamente la tabla cada $1 segundos',
                refreshButton: 'Actualizar ahora',
                refreshButtonDesc: 'Haz clic aquí si la tabla se bloquea',
                lastUpdate: 'Última actualización:',
                changeNumber: 'Cambiar el número de elementos visualizados',
                changeButton: 'Cambiar',
                devLink: 'abuseLogRC en la Dev Wiki',
                newAccount: 'nueva cuenta',
                age: 'edad:',
                globalEdits: 'modificaciones globales:',
                triggeredFilter: 'Filtro anti-abuso activado:',
                vstfTooltip: 'Pide ayuda al VSTF',
                apiError: 'Error API:',
                ajaxError: 'Error AJAX:'
            },
            // French
            'fr': {
                optionsHeader: 'Options de contrôle dans le journal du filtre anti-abus',
                autoRefresh: 'Rafraîchir automatiquement le tableau toutes les $1 secondes',
                refreshButton: 'Rafraîchir',
                refreshButtonDesc: 'Cliquez ici si le tableau ne fonctionne pas',
                lastUpdate: 'Dernière actualisation:',
                changeNumber: 'Changer le nombre d\'entrées:',
                changeButton: 'Changer',
                devLink: 'abuseLogRC dans le Dev Wiki',
                newAccount: 'nouveau compte',
                age: 'âge:',  // qui signifie l'"âge du compte", des secondes aux jours
                globalEdits: 'modifications globales:',
                triggeredFilter: 'Activer le filtre anti-abus:',
                vstfTooltip: 'Demander de l\'aide à un VSTF',
                apiError: 'Erreur d\'API:',
                ajaxError: 'Erreur d\'AJAX:'
            },
            // Finnish
            fi: {
                optionsHeader: 'Väärinkäyttö Lokin Valvonta valinnat',
                autoRefresh: 'Auto-päivitä taulukko $1 sekunnin välein',
                refreshButton: 'Päivitä nyt',
                refreshButtonDesc: 'Klikkaa tästä jos taulukko menee jumiin',
                lastUpdate: 'Päivitetty viimeksi:',
                changeNumber: 'Muuta kohtien määrä:',
                changeButton: 'Vaihda',
                devLink: 'abuseLogRC Dev Wikissä',
                newAccount: 'uusi tili',
                age: 'ikä:',  // tarkoittaa "tilin ikää", sekunneista päiviin
                globalEdits: 'maailmanlaajuiset muokkaukset:',
                triggeredFilter: 'Laukausi väärinkäyttö filtterin:',
                vstfTooltip: 'Pyydä VSTF:n jäseniltä apua',
                apiError: 'API virhe:',
                ajaxError: 'AJAX virhe:'
            },
            // Galego
            gl: {
                optionsHeader: 'Opcións de control do rexistro do Filtro Anti-Abuso',
                autoRefresh: 'Actualizar automaticamente a táboa cada $1 segundos',
                refreshButton: 'Actualizar agora',
                refreshButtonDesc: 'Fai clic aquí se a táboa bloquéase',
                lastUpdate: 'Última actualización:',
                changeNumber: 'Cambiar o número de elementos visualizados',
                changeButton: 'Cambiar',
                devLink: 'abuseLogRC na Dev Wiki',
                newAccount: 'nova conta',
                age: 'idade:',
                globalEdits: 'modificacións globais:',
                triggeredFilter: 'Filtro anti-abuso activado:',
                vstfTooltip: 'Pide axuda ao VSTF',
                apiError: 'Erro API:',
                ajaxError: 'Erro AJAX:'
            },
            // Bahasa Indonesia
           'id': {
                optionsHeader: 'Pilihan mengamati penyalahgunaan',
                autoRefresh: 'Otomatis memuat ulanag laman dalam $1 detik',
                refreshButton: 'Muat ulang sekarang',
                refreshButtonDesc: 'Klik disini jika tabel terhambat',
                lastUpdate: 'Terakhir memperbaharui:',
                changeNumber: 'Ubah urutan pemasukan:',
                changeButton: 'Ubah',
                devLink: 'Mengamati penyalahgunaan di Dev Wiki',
                newAccount: 'akun baru',
                age: 'age:',  // Untuk akun yang cukup", dari menit ke hari-hari
                globalEdits: 'edit yang umum:',
                triggeredFilter: 'pemicu penyalahgunaan filter',
                vstfTooltip: 'Tanya VSTF untuk bantuan',
                apiError: 'API eror:',
                ajaxError: 'AJAX eror:'
            },
            // Italian
            it: {
                optionsHeader: 'Opzioni monitoraggio registro Filtro Anti-Abusi',
                autoRefresh: 'Aggiorna automaticamente la tabella ogni $1 secondi',
                refreshButton: 'Aggiorna adesso',
                refreshButtonDesc: 'Clicca qui se la tabella si blocca',
                lastUpdate: 'Ultimo aggiornamento:',
                changeNumber: 'Cambia numero di elementi visualizzati',
                changeButton: 'Cambia',
                devLink: 'abuseLogRC su Dev Wiki',
                newAccount: 'nuovo account',
                age: 'età:',
                globalEdits: 'modifiche globali:',
                triggeredFilter: 'Filtro anti-abuso attivato:',
                vstfTooltip: 'Chiedi aiuto al VSTF',
                apiError: 'Errore API:',
                ajaxError: 'Errore AJAX:'
            },
            // Japanese - 日本語
            ja: {
                optionsHeader: '不正利用ログ確認機能の設定',
                autoRefresh: '$1秒ごとに一覧を自動更新する',
                refreshButton: '今すぐ更新',
                refreshButtonDesc: '一覧が更新されない場合はこちらをクリックしてください。',
                lastUpdate: '最終更新:',
                changeNumber: '表示する数を変更:',
                changeButton: '変更する',
                devLink: 'Dev WikiのabuseLogRC',
                newAccount: '新しいアカウント',
                age: '登録期間:',
                globalEdits: 'Fandom全体での編集回数:',
                triggeredFilter: '不正利用フィルターの誘因:',
                vstfTooltip: 'VSTFに対処を依頼する',
                apiError: 'APIエラー:',
                ajaxError: 'AJAXエラー:'
            },
            // Dutch
            nl: {
                optionsHeader: 'Filterlogboek volginstellingen',
                autoRefresh: 'Ververs de tabel elke $1 seconden',
                refreshButton: 'Ververs nu',
                refreshButtonDesc: 'Klik hier indien de tabel vastzit',
                lastUpdate: 'Laatst bijgewerkt:',
                changeNumber: 'Wijzig aantal entries:',
                changeButton: 'Wijzig',
                devLink: 'abuseLogRC op Dev Wiki',
                newAccount: 'nieuw account',
                age: 'leeftijd:',
                globalEdits: 'globale bewerkingen:',
                triggeredFilter: 'Liet filter afgaan:',
                vstfTooltip: 'Vraag VSTF om hulp',
                apiError: 'API fout:',
                ajaxError: 'AJAX fout:'
            },
            // Polish
            pl: {
                optionsHeader: 'Obserwowanie rejestru nadużyć',
                autoRefresh: 'Odświeżaj automatycznie co $1 sekund(y)',
                refreshButton: 'Odśwież teraz',
                refreshButtonDesc: 'Kliknij tutaj, jeśli tabela się nie odświeża',
                lastUpdate: 'Ostatnia aktualizacja:',
                changeNumber: 'Ilość wpisów:',
                changeButton: 'Zmień',
                devLink: 'abuseLogRc na Dev Wiki',
                newAccount: 'Nowe konto',
                age: 'wiek:',
                globalEdits: 'edycje globalnie:',
                triggeredFilter: 'Uruchomiony filtr:',
                vstfTooltip: 'Poproś VSTF o pomoc',
                apiError: 'Błąd API:',
                ajaxError: 'Błąd AJAX:'
            },
            // European Portuguese
            pt: {
                optionsHeader: 'Opções de controlo do registo do Filtro Anti-Abuso',
                autoRefresh: 'Actualiza automaticamente a tabela a cada $1 segundos',
                refreshButton: 'Actualiza agora',
                refreshButtonDesc: 'Clica aqui se a tabela bloqueia-se',
                lastUpdate: 'Última actualização:',
                changeNumber: 'Muda o número de elementos visualizados',
                changeButton: 'Muda',
                devLink: 'abuseLogRC na Dev Wiki',
                newAccount: 'nova conta',
                age: 'idade:',
                globalEdits: 'modificações globais:',
                triggeredFilter: 'Filtro anti-abuso activado:',
                vstfTooltip: 'Pede ajuda ao VSTF',
                apiError: 'Erro API:',
                ajaxError: 'Erro AJAX:'
            },
            // Brazilian Portuguese
            'pt-br': {
                optionsHeader: 'Opções de controle do registro do Filtro Anti-Abuso',
                autoRefresh: 'Atualize automaticamente a tabela a cada $1 segundos',
                refreshButton: 'Atualize agora',
                refreshButtonDesc: 'Clique aqui se a tabela fica bloqueiada',
                lastUpdate: 'Última atualização:',
                changeNumber: 'Mude o número de elementos visualizados',
                changeButton: 'Mude',
                devLink: 'abuseLogRC na Dev Wiki',
                newAccount: 'nova conta',
                age: 'idade:',
                globalEdits: 'modificações globais:',
                triggeredFilter: 'Filtro anti-abuso ativado:',
                vstfTooltip: 'Peça ajuda ao VSTF',
                apiError: 'Erro API:',
                ajaxError: 'Erro AJAX:'
            },
            // Romanian
            ro: {
                optionsHeader: 'Opţiuni de control în registrul Filtrului Anti-Abuz',
                autoRefresh: 'Actualizaţi tabloul în mod automat fiecare $1 secunde',
                refreshButton: 'Actualizaţi acum',
                refreshButtonDesc: 'Faceţi clic aici dacă tabloul se blochează',
                lastUpdate: 'Ultimă actualizare:',
                changeNumber: 'Schimbaţi numărul elementelor vizualizate',
                changeButton: 'Schimbare',
                devLink: 'abuseLogRC pe Dev Wiki',
                newAccount: 'nou cont',
                age: 'vârstă:',
                globalEdits: 'modificări globale:',
                triggeredFilter: 'Filtrul anti-abuz activat:',
                vstfTooltip: 'Cereţi-i ajutor VSTF-ului',
                apiError: 'Eroare API:',
                ajaxError: 'Eroare AJAX:'
            },
            // Russian
            ru: {
                optionsHeader: 'Настройки Abuse Log Watch',
                autoRefresh: 'Автоматически обновлять каждые $1 секунд(ы)',
                refreshButton: 'Обновить',
                refreshButtonDesc: 'Нажмите здесь, если таблица не обновляется',
                lastUpdate: 'Последнее обновление:',
                changeNumber: 'Количество записей:',
                changeButton: 'Изменить',
                devLink: 'abuseLogRC на Dev Wiki',
                newAccount: 'новая учётная запись',
                age: 'возраст:',
                globalEdits: 'глобальное количество правок:',
                triggeredFilter: 'Сработавший фильтр:',
                vstfTooltip: 'Попросить VSTF о помощи',
                apiError: 'Ошибка API:',
                ajaxError: 'Ошибка AJAX:'
            },
            // Ukrainian
            uk: {
                optionsHeader: 'Налаштування Abuse Log Watch',
                autoRefresh: 'Автоматично оновлювати кожні $1 секунд(и)',
                refreshButton: 'Оновити зараз',
                refreshButtonDesc: 'Натисніть тут, якщо таблиця не оновлюється',
                lastUpdate: 'Останнє оновлення:',
                changeNumber: 'Кількість записів:',
                changeButton: 'Змінити',
                devLink: 'abuseLogRC на Dev Wiki',
                abuseLog: 'Журнал зловживань',
                newAccount: 'новий обліковий запис',
                age: 'вік:',
                globalEdits: 'кількість редагувань на всіх вікі:',
                triggeredFilter: 'Фільтр, який спрацював:',
                vstfTooltip: 'Попросити VSTF про допомогу',
                apiError: 'Помилка API:',
                ajaxError: 'Помилка AJAX:'
            },
            // Valencian
            val: {
                optionsHeader: 'Opcions de control del registre del Filtre Anti-Abús',
                autoRefresh: 'Actualisar automaticament la taula cada $1 segons',
                refreshButton: 'Actualisar ara',
                refreshButtonDesc: 'Fe clic ací si la taula se bloqueja',
                lastUpdate: 'Última actualisació:',
                changeNumber: 'Canviar el número d’elements visualisats',
                changeButton: 'Canviar',
                devLink: 'abuseLogRC en la Dev Wiki',
                newAccount: 'nou conte',
                age: 'edat:',
                globalEdits: 'modificacions globals:',
                triggeredFilter: 'Filtre anti-abús activat:',
                vstfTooltip: 'Demana ajuda al VSTF',
                apiError: 'Erró API:',
                ajaxError: 'Erró AJAX:'
            },
            // Chinese (simplified) (Also in zh)
            zh: {
                optionsHeader: '滥用日志监视选项',
                autoRefresh: '每 $1 秒自动刷新列表',
                refreshButton: '立即刷新',
                refreshButtonDesc: '如列表无任何回应，请点击此处',
                lastUpdate: '最后一次刷新于：',
                changeNumber: '更改显示数量：',
                changeButton: '更改',
                devLink: 'abuseLogRC 于 Dev Wiki',
                newAccount: '新账户',
                age: '账户年龄：',
                globalEdits: '全域编辑次数：',
                triggeredFilter: '触发过滤器次数：',
                vstfTooltip: '向反破坏小组寻求协助',
                apiError: 'API 错误：',
                ajaxError: 'AJAX 错误：'
            },
            // Chinese (traditional)
            'zh-hant': {
                optionsHeader: '濫用日誌監視選項',
                autoRefresh: '每 $1 秒自動刷新列表',
                refreshButton: '立即刷新',
                refreshButtonDesc: '如列表無任何回應，請點擊此處',
                lastUpdate: '最後一次刷新於：',
                changeNumber: '更改顯示數量：',
                changeButton: '更改',
                devLink: 'abuseLogRC 於 Dev Wiki',
                newAccount: '新帳戶',
                age: '帳戶年齡：',
                globalEdits: '全域編輯次數：',
                triggeredFilter: '觸發過濾器次數：',
                vstfTooltip: '向反破壞小組尋求協助',
                apiError: 'API 錯誤：',
                ajaxError: 'AJAX 錯誤：'
            },
            // Chinese (Taiwan)
            'zh-tw': {
                optionsHeader: '濫用日誌監視選項',
                autoRefresh: '每 $1 秒自動更新列表',
                refreshButton: '立即更新',
                refreshButtonDesc: '如列表無任何回應，請點擊此處',
                lastUpdate: '最後一次更新於：',
                changeNumber: '變更顯示數量：',
                changeButton: '變更',
                devLink: 'abuseLogRC 於 Dev Wiki',
                newAccount: '新帳號',
                age: '帳號年齡：',
                globalEdits: '全域編輯次數：',
                triggeredFilter: '觸發過濾器次數：',
                vstfTooltip: '向反破壞小組尋求協助',
                apiError: 'API 錯誤：',
                ajaxError: 'AJAX 錯誤：'
            }
            // thank you http://wlb.wikia.com/
    };

    // Select language
    // Check if user's language is present
    if (typeof i18n[lang] === 'object') {
        $.extend( i18n, i18n.en, i18n[lang] );
    } else {
        // Check to see if the parent language has a translation, example pt-br -> pt
        if (typeof i18n[splitLang] === 'object') {
            $.extend( i18n, i18n.en, i18n[splitLang] );
        } else {
        // Fallback to English
        $.extend( i18n, i18n.en );
        }
    }
    // END i18n
    

    //
    // Choosing to create the table or not
    //
    
    // Checking user rights
    if ( /(sysop|helper|vstf|staff)/.test(data.ug) ) {
        userType = 'sysop';
    } else {
        userType = 'all';
    }
    
    // Checking if user name matches custom users list
    if (typeof abuseLogRC_users == 'object') {
        customUser = (abuseLogRC_users.indexOf(data.mw.wgUserName) > -1) ? true : false;
    } else {
        customUser = false;
    }

    // Check if AbuseFilter is enabled
    var AfQuery = {
        'meta': 'siteinfo',
        'siprop': 'extensions',
        'action': 'query'
    };
	
    callAPI(AfQuery, 'GET', function(response) {
        var o = response.query.extensions,
            found = false,
            i;
 
        if ($.isArray(o)) {
            for ( i = 0; i < o.length && !found ; ++i ) {
                found = o[i].name === 'Abuse Filter';
            }
        }
        if (found) {
            // If everything checks out, load needed MediaWiki messages and create table
            if ( config.showTo == userType || config.showTo == 'all' || customUser ) {
                loadMessages([ 
                    'activityindicator-message',
                    'abusefilter-log',
                    'abusefilter-log-linkoncontribs',
                    'abusefilter-log-linkoncontribs-text',
                    'abusefilter-log-summary',
                    'abusefilter-action-block',
                    'abusefilter-action-blockautopromote',
                    'abusefilter-action-degroup',
                    'abusefilter-action-disallow',
                    'abusefilter-examine-title',
                    'abusefilter-history-public',
                    'abusefilter-history-timestamp',
                    'abusefilter-history-user',
                    'abusefilter-action-rangeblock',
                    'abusefilter-action-tag',
                    'abusefilter-action-throttle',
                    'abusefilter-action-warn',
                    'abusefilter-changeslist-examine',
                    'abusefilter-edit-builder-vars-tor-exit-node',
                    'abusefilter-edit-builder-vars-user-age',
                    'abusefilter-edit-warn-actions',
                    'blocklink',
                    'contribslink',
                    'talkpagelinktext'
                ]).then( createTableHTML );
            } else {
                console.log('[AbuseLogRC]: user is not allowed to view AbuseLogRC.');
            }
        } else {
            console.log('[AbuseLogRC]: AbuseFilter is not enabled.');
        }
    });
    // END choosing
    
    //
    // Functions
    //
    
    // Get MediaWiki messages
    // @return instance of jQuery.Promise
    // https://www.mediawiki.org/wiki/Manual:Messages_API#Getting_the_messages_to_the_client
    function loadMessages( messages ) {
        return new mw.Api().get({
            action: 'query',
            meta: 'allmessages',
            ammessages: messages.join( '|' ),
            amlang: lang
        }).then( function ( data ) {
            $.each( data.query.allmessages, function ( i, message ) {
                if ( message.missing !== '' ) {
                    mw.messages.set( message.name, message['*'] );
                }
            });
        });
    }
    
    // Call API
	function callAPI(data, method, callback) {
		data.format = 'json'; // add the format to the given data query
 
		$.ajax({
			data: data,
			dataType: 'json',
			url: wgScriptPath + '/api.php',
			type: method,
			success: function(response) {
				if (response.error) {
                    $('#abErrorsLog ul').empty();   // clears errors log
                    $('#abErrorsLog ul').append('<li>' + new Date().toLocaleTimeString() + ' - ' + i18n.apiError + ' ' + response.error.info + '</li>');
				} else {
					callback(response);
				}
			},
			error: function(xhr, error) {
                $('#abErrorsLog ul').empty();   // clears errors log
                $('#abErrorsLog ul').append('<li>' + new Date().toLocaleTimeString() + ' - ' + i18n.ajaxError + ' ' + error + '</li>');
            },
			timeout: 10000
		});
	}

    // URLs
	function articleURL(article) {
		return wgArticlePath.replace('$1', encodeURI(article.replace(/ /g, '_')));
	}
 
	function scriptURL(article) {
		return wgScript + '?title=' + encodeURIComponent(article.replace(/ /g, '_'));
	}
	
	// Converts number of seconds in time string
    function secondsToString(seconds , mode){
        var d = (Math.floor(seconds / 86400) > 0) ? Math.floor(seconds / 86400) + 'd ' : '',
            h = (Math.floor((seconds % 86400) / 3600) > 0) ? Math.floor((seconds % 86400) / 3600) + 'h ' : '',
            m = (Math.floor(((seconds % 86400) % 3600) / 60) > 0) ? Math.floor(((seconds % 86400) % 3600) / 60) + 'm ' : '',
            s = ((seconds % 86400) % 3600) % 60 + 's';
        
        if (seconds < 300 && mode != 'timestamp'){
            return i18n.newAccount;
        } else {
            return  d + h + m + s;
        }
    }
    
    // Change table sorting
    function changeOrder(){
        if (config.order == 'older') {
            // Change to 'newer'
            config.order = 'newer';
            $('#abSorting').empty().text('↓');
            refreshData();
        } else {
            // Change to 'older'
            config.order = 'older';
            $('#abSorting').empty().text('↑');
            refreshData();
        }
    }
	
	// Add urgency class
	function urgencyClass(timeNew, timeOld) {
        timeDifference = timeNew - timeOld;
        
        if (timeDifference <= config.timeFrame1) {
            return 'abUrgency1';
        } else {
            if (timeDifference <= config.timeFrame2) {
                return 'abUrgency2';
            } else {
                if (timeDifference <= config.timeFrame3) {
                    return 'abUrgency3';
                } else {
                    return 'abUrgency4';
                }
            }
        }
	}
	
	// Change number of entries
	function updateEntriesNumber(number) {
        if ( !isNaN(number) ) {
            config.entries = Math.max(1, number);
            refreshData();
        }
	}
	
    // load Complete - sets the auto-refresh time interval
	function loadComplete() {
		if ($('#abAutoRefresh:checked').length) {
			window.clearTimeout(refreshTimer);
			refreshTimer = window.setTimeout(loadData, config.interval * 1000);
		}
		// Update last update status
		$('#ab_update img').hide();
		$('#abLastUpdate').text((new Date()).toLocaleTimeString());
	}

	// Change auto-refresh time interval
	function updateIntervalTime(number) {
        if ( !isNaN(number) ) {
            // Change interval
            config.interval = Math.max(5, number);

            // Update text
            var updatedText = i18n.autoRefresh.replace('$1' , config.interval);
            $('#abAutoRefreshText').text(updatedText);
            
            // Restart cycle
            loadData();
        }
	}
	
	// Refresh Data - clears the table and reset everything
	function refreshData(){
        $('#abHeader').nextAll().remove();      // clears table rows
        $('#abErrorsLog ul').empty();           // clears errors log
        refreshCycle = 0;                       // reset refresh cycle control
        itemIds = [];
        itemSince = null;
        loadData();
	}
	
    // loadData - load new data for the table
	function loadData() {
        // Show loading image
		$('#ab_update img').show();
		
		// Define query
		var itemQuery;
		if ( userType == 'sysop' ) {
            itemQuery = {
                'afllimit': config.entries,
                'afldir': 'older',
                'action': 'query',
                'list': 'abuselog',
                'aflprop': 'ids|user|title|action|result|filter|timestamp|details|hidden'
            };
		} else {
            itemQuery = {
                'afllimit': config.entries,
                'afldir': 'older',
                'action': 'query',
                'list': 'abuselog',
                'aflprop': 'ids|user|title|action|result|filter|timestamp|hidden'
            };
		}
		
		
        // Select only new items
		if (itemSince) {
			itemQuery.itemend = itemSince;
		}
        // Get data
		callAPI(itemQuery, 'GET', function(response) {
			for (var i in response.query.abuselog) {
				var item = response.query.abuselog[i];
 
				// Remove duplicates which may occur during autorefresh
				if ($.inArray(item.id, itemIds) > -1) {
					continue;
				}
                if(itemIds.length >= config.entries) {
                    refreshData();
                }
				itemIds.push(item.id);
				
                // Time
                // query timestamps are UTC in ISO format
				var now  = new Date(),
                    then = new Date(item.timestamp),
                    date = then.toLocaleDateString(),
                    time = then.toLocaleTimeString();
                    
                // Set time limit for next requests
				itemSince = item.timestamp;
				
                // Create item details if viewer has permission, checks with personal configuration and item is not an anon
                var tableUserTOR,
                    tableUserExtraLinks;
                    
                if ( userType == 'sysop' && config.userInfo && (/(user)/.test(item.details.user_groups)) ) {
                    var userAge = secondsToString(item.details.user_age);
                    
                    // Create extra info
                    tableUserTOR = ( item.details.tor_exit_node != '0' ) ? '<span title="' + mw.msg('abusefilter-edit-builder-vars-tor-exit-node') + '">TOR</span> &bull; ' : '';
                
                    tableUserExtraLinks = '<span class="abExtraLinks">(' + tableUserTOR + i18n.globalEdits + '&nbsp;' + item.details.user_editcount + ' &bull; <span title="' + mw.msg('abusefilter-edit-builder-vars-user-age') + '">' + i18n.age + '&nbsp;' + userAge + '</span>)' + '</span>';
                } else {
                    tableUserExtraLinks = '';
                }
				
				// Create cells HTML
                var tableCellTime = '<td rowspan="2" class="abItemTime" >' + date + '<br/>' + time + '</td>';
                var tableCellPage = 
                        '<td class="abItemPage">' +
                            '<a href="' + articleURL(item.title) + '" target="_blank">' + item.title + '</a>' + '&nbsp;' + 
                            '<span class="abExtraLinks" style="text-transform:lowercase;">(' +
                                '<a href="/wiki/Special:AbuseLog?details=' + item.id + '" target="_blank">' +  mw.msg('abusefilter-changeslist-examine') + '</a>' + 
                                ' &bull; ' + mw.msg('abusefilter-edit-warn-actions') + '&nbsp;' + mw.msg('abusefilter-action-' + item.result) + ')' +
                            '</span>' +
                        '</td>';
                        
                var tableCellUser = 
                        '<td class="abItemUser">' + 
                            '<a href="' + articleURL('User:' + item.user) + '" target="_blank">' + item.user + '</a> ' + tableUserExtraLinks +
                        '</td>';
                        
                var tableCellFilter = 
                        '<td class="abItemFilterID">' +
                            '<a href="/wiki/Special:AbuseLog?title=Special%3AAbuseLog&wpSearchFilter=' + item.filter_id + '" title="' + mw.msg('abusefilter-log-summary') + '" target="_blank">' + i18n.triggeredFilter + '&nbsp;' + item.filter_id + '</a>' + 
                            ' - ' + 
                            '<a href="/wiki/Special:AbuseFilter/' + item.filter_id + '" title="' + mw.msg('abusefilter-history-public') + '" target="_blank">'+ item.filter + '</a>' +
                        '</td>';
                        
                var tableCellTools = 
                        '<td class="abItemTools">&raquo; ' +
                            '<a href="' + articleURL('User_talk:' + item.user) + '" target="_blank">' + mw.msg('talkpagelinktext') + '</a> &bull; ' +
                            '<a href="' + articleURL('Special:Contributions/' + item.user) + '" target="_blank">' + mw.msg('contribslink') + '</a> &bull; ' +
                            '<a href="/wiki/Special:AbuseLog?wpSearchUser=' + item.user + '" title="' + mw.msg('abusefilter-log-linkoncontribs-text') + '" target="_blank">' + mw.msg('abusefilter-log-linkoncontribs') + '</a> &bull; ' +
                            '<a href="http://vstf.wikia.com/" target="_blank" title="' + i18n.vstfTooltip + '">VSTF</a> &bull; ' +
                            '<a href="' + articleURL('Special:Block/' + item.user) + '" target="_blank">' + mw.msg('blocklink') + '</a>' +
                        '</td>';
                
				// Create table row HTML
				var urgency = urgencyClass(now.getTime(), then.getTime()),
                    timeDiff = Math.floor( (now.getTime() - then.getTime()) / 1000 ), // debugging purpose
                    tableRow =  
                        '<tr class="abItemRow ' + urgency + '" data-time-ago="' + secondsToString(timeDiff , 'timestamp') + '">' +
                            tableCellTime + tableCellPage + tableCellUser + 
                        '</tr>' +
                        '<tr class="abItemRow ' + urgency + '">' + 
                            tableCellFilter + tableCellTools +
                        '</tr>';
                    
                // Insert row in table
                if (config.order == 'older') {
                    $('#abHeader').after(tableRow);
                } else {
                    $('#abData').append(tableRow);
                }
			}
		});
		
        // After some auto-refresh do an hard refresh to update the HTML if there weren't any new items in a while
        if ( refreshCycle >= 60 ) {
            refreshCycle = 0;
            refreshData();
        } else {
            refreshCycle++;
            loadComplete();
        }
	}
    
    // CreateHTML body
    function createTableHTML() {

        // Create table container and place it
        var container = '<div id="ab_options"></div><div id="ab_main"></div>';
        
        if (config.position == 'after') {
            $('#mw-content-text').after(container);
        } else {
            $('#mw-content-text').before(container);
        }
        
        // Table options
		$('#ab_options').empty().append(
            '<fieldset class="collapsible">' +
                '<legend>' + i18n.optionsHeader + '</legend>' +
                '<form>' +
                    '<div class="abRefresh">' +
                        '<input type="checkbox" id="abAutoRefresh" checked="checked" /> <label for="abAutoRefresh" id="abAutoRefreshText">' + i18n.autoRefresh.replace('$1' , config.interval) + '</label>' +
                        '&nbsp;<input type="text" name="abIntervalTime" id="abIntervalTime" style="width:50px;">&nbsp;' +
                        '<input type="button" id="abSetIntervalButton" value="' + i18n.changeButton + '">' +
                        '<input type="button" id="abRefresh" title="' + i18n.refreshButtonDesc + '" value="' + i18n.refreshButton + '" style="margin-left:5px;">' +
                        '<div id="ab_update" style="float:right;">' +
                            '<img src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" width="16" height="16" alt="' + mw.msg('activityindicator-message') + '"/> ' + 
                            '<span style="font-weight:bold;">' + i18n.lastUpdate + '</span>&nbsp;<span id="abLastUpdate"></span>' +
                        '</div>' +
                    '</div>' +
                '</form>' +
                '<form>' +
                    '<div class="abEntries"">' +
                        i18n.changeNumber + 
                        '&nbsp;<input type="text" name="abEntriesNumber" id="abEntriesNumber" style="width:50px;">&nbsp;' +
                        '<input type="button" id="abSetEntriesButton" value="' + i18n.changeButton + '">' +
                        '<div class="abDocumentation" style="float:right; font-size:10px;"><a href="/wiki/Special:AbuseLog" target="_blank">' + mw.msg('abusefilter-log') + '</a> &bull; <a href="http://dev.wikia.com/wiki/AbuseLogRC" target="_blank">' + i18n.devLink + '</a></div>' +
                    '</div>' +
                '</form>' +
                '<div id="abErrorsLog" style="display:block;"><ul></ul></div>' +
            '</fieldset>'
		);
		
		// Insert table in container
		$('#ab_main').empty().append(
            '<table id="abData" class="wikitable mw-collapsible" style="width:100%; font-size:14px;">' +
                '<tr id="abHeader">' +
                    '<th style="cursor:pointer;"><span id="abSorting"></span>&nbsp;' + mw.msg('abusefilter-history-timestamp') + '</th>' +
                    '<th>' + mw.msg('abusefilter-examine-title').replace(':' , '') + '</th>' +
                    '<th>' + mw.msg('abusefilter-history-user') + '</th>' +
                '</tr>' +
            '</table>'
        );

		// Add sorting icon
        if (config.order == 'older') {
            $('#abSorting').text('↑');
        } else {
            $('#abSorting').text('↓');
        }
		
		// Bind functions
		$('#abRefresh').click(refreshData);                     // refresh button
		$('#abSetEntriesButton').click(function() {
                var newNumber = $('#abEntriesNumber').val();
                updateEntriesNumber(newNumber);
            }
        );                                                      // entries button
		$('#abSetIntervalButton').click(function() {
                var newTime = $('#abIntervalTime').val();
                updateIntervalTime(newTime);
            }
        );                                                      // refresh interval button
        $('#abHeader th:first').click(changeOrder);                     // sorting options
		
		// Make table collapsible
		if ( config.collapsible ) {
            $('#ab_main table.mw-collapsible').makeCollapsible();
        }
        
        // Get data
		loadData();
	}
	// End functions
});