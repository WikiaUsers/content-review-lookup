// MediaWiki:MarvelCalendar.js. Недельный календарь Marvel — JS-версия с кэшированием по ISO-неделе, автоматической инвалидацией при изменении исключений и выводом через {{РГ}}
 
( function ( $, mw ) {
    'use strict';
 
    var CALENDAR_ID   = 'marvel-weekly-calendar';
    var CACHE_KEY     = 'marvelCalendarCache';
    var CACHE_VERSION = 6;

    // 0. Стили анимации загрузки (Серебряный Сёрфер)
    var SURFER_CSS = [
        '@keyframes surfer-hover {',
        '  0%   { transform: scaleX(-1) translateY(0px); }',
        '  50%  { transform: scaleX(-1) translateY(-8px); }',
        '  100% { transform: scaleX(-1) translateY(0px); }',
        '}',
        // .railModule задаёт flex на .comics-week через boxes.css, но вне rail (Заглавная, трансклюзия) flex отсутствует —', без него order:-1 на .comics-week_title не работает и заголовок недели не отображается',
        '#marvel-weekly-calendar .comics-week {',
        '  display: flex;',
        '  flex-wrap: wrap;',
        '  justify-content: center;',
        '}',
        '#marvel-weekly-calendar .comics-week_title { order: -1; width: 100%; }',
        '.mc-loading {',
        '  display: flex;',
        '  flex-direction: column;',
        '  align-items: center;',
        '  padding: 20px 0;',
        '  gap: 8px;',
        '}',
        '.mc-loading img {',
        '  width: 73px;',
        '  height: 60px;',
        '  object-fit: contain;',
        '  transform: scaleX(-1);',
        '  animation: surfer-hover 2s ease-in-out infinite;',
        '  filter: drop-shadow(0px 4px 6px rgba(100,180,255,0.5));',
        '}',
        '.mc-loading span {',
        '  font-size: 0.95em;',
        '  opacity: 0.75;',
        '}'
    ].join( '\n' );

    ( function injectSurferStyles() {
        if ( document.getElementById( 'mc-surfer-styles' ) ) return;
        var style = document.createElement( 'style' );
        style.id = 'mc-surfer-styles';
        style.textContent = SURFER_CSS;
        document.head.appendChild( style );
    }() );

    var SURFER_URL = 'https://marvel.fandom.com/ru/wiki/Special:FilePath/Silver_Surfer_To_Top.png';

    var LOADING_HTML = '<div class="mc-loading">' +
        '<img src="' + SURFER_URL + '" alt="Загрузка..." />' + '<span>Загрузка релизов Marvel...</span>' +
        '</div>';
 
    // 1. Вспомогательные функции
    function getCurrentISOWeekAndYear() {
        var now = new Date();
        var d = new Date( Date.UTC( now.getFullYear(), now.getMonth(), now.getDate() ) );
        d.setUTCDate( d.getUTCDate() + 3 - ( d.getUTCDay() + 6 ) % 7 );
        var yearStart = new Date( Date.UTC( d.getUTCFullYear(), 0, 1 ) );
        var weekNo = Math.ceil( ( ( ( d - yearStart ) / 86400000 ) + 1 ) / 7 );
        return { week: weekNo, year: d.getUTCFullYear() };
    }
 
    function getWeekRange( week, year ) {
        var monday    = getDateOfISOWeek( week, year, 1 );
        var wednesday = getDateOfISOWeek( week, year, 3 );
        var sunday    = getDateOfISOWeek( week, year, 7 );

        var months = [ 'января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря' ];

        var wedDay   = wednesday.getUTCDate();
        var wedMonth = months[ wednesday.getUTCMonth() ];

        var startDay   = monday.getUTCDate();
        var endDay     = sunday.getUTCDate();
        var startMonth = months[ monday.getUTCMonth() ];
        var endMonth   = months[ sunday.getUTCMonth() ];

        var range;
        if ( monday.getUTCMonth() === sunday.getUTCMonth() ) {
            range = startDay + ' — ' + endDay + ' ' + startMonth;
        } else {
            range = startDay + ' ' + startMonth + ' — ' + endDay + ' ' + endMonth;
        }

       return '<div class="comics-week_title"><h3 style="text-align:center;">' + week + ' неделя (' + range + '), от ' + wedDay + ' ' + wedMonth + '</h3></div>';
    }
 
    function getDateOfISOWeek( week, year, dayOfWeek ) {
        var date = new Date( Date.UTC( year, 0, 1 + ( week - 1 ) * 7 ) );
        var day = date.getUTCDay() || 7;
        date.setUTCDate( date.getUTCDate() + dayOfWeek - day );
        return date;
    }
 
    // 2. Работа с кэшем
    function isLocalStorageAvailable() {
        try {
            var test = '__ls_test__';
            localStorage.setItem( test, '1' );
            localStorage.removeItem( test );
            return true;
        } catch ( e ) {
            return false;
        }
    }
 
    var LS_AVAILABLE = isLocalStorageAvailable();
 
    function getCache() {
        if ( !LS_AVAILABLE ) return null;
        try {
            var cached = localStorage.getItem( CACHE_KEY );
            if ( !cached ) return null;
            var parsed = JSON.parse( cached );
            if ( parsed.version !== CACHE_VERSION ) return null;
            return parsed;
        } catch ( e ) {
            try { localStorage.removeItem( CACHE_KEY ); } catch ( _ ) {}
            return null;
        }
    }
 
    function setCache( releasesData, exceptionsRevId ) {
        if ( !LS_AVAILABLE ) return;
        try {
            var current = getCurrentISOWeekAndYear();
            localStorage.setItem( CACHE_KEY, JSON.stringify( {
                version: CACHE_VERSION,
                week: current.week,
                year: current.year,
                data: releasesData,
                exceptionsRevId: exceptionsRevId,
                timestamp: Date.now()
            } ) );
        } catch ( e ) {
            console.warn( 'MarvelCalendar: Не удалось сохранить кэш' );
        }
    }
 
    // 3. Загрузка исключений
    var EXCEPTIONS_PAGE    = 'Данные:ReleaseExceptions';
    var EXCEPTION_TEMPLATE = 'EH';
 
    function getExceptionsInfo() {
        var api = new mw.Api();
        return api.get( {
            action: 'query',
            titles: EXCEPTIONS_PAGE,
            prop: 'revisions',
            rvprop: 'content|ids',
            rvslots: 'main',
            formatversion: 2
        } ).then( function ( response ) {
            var page = response.query.pages[ 0 ];
            if ( !page || page.missing ) return { exceptions: {}, revid: 0 };
            var content = page.revisions[ 0 ].slots.main.content || '';
            var revid   = page.revisions[ 0 ].revid;
            var exceptions = {};
            var regex = new RegExp( '\\{\\{' + EXCEPTION_TEMPLATE + '\\s*([\\s\\S]*?)\\}\\}', 'gi' );
            var match;
            while ( ( match = regex.exec( content ) ) !== null ) {
                var chunk = match[ 1 ];
                var exc = {};
                var paramRegex = /\|?\s*([^|=\s]+)\s*=\s*([^|\n]+)/g;
                var paramMatch;
                while ( ( paramMatch = paramRegex.exec( chunk ) ) !== null ) {
                    var key   = paramMatch[ 1 ].trim().toLowerCase();
                    var value = paramMatch[ 2 ].trim();
                    exc[ key ] = value;
                }
                if ( exc.name ) exceptions[ exc.name ] = exc;
            }
            return { exceptions: exceptions, revid: revid };
        } ).catch( function ( err ) {
            console.warn( 'MarvelCalendar: Не удалось загрузить исключения', err );
            return { exceptions: {}, revid: 0 };
        } );
    }
 
    // 4. Парсинг и применение исключений
    var CGD_PREFIX  = 'Comics Giveaway Day';
    var FCBD_PREFIX = 'Free Comic Book Day';
 
    function removeColon( str ) {
        return str.replace( /:/g, '' ).replace( /\//g, '' ).replace( /\s+/g, ' ' ).trim();
    }
 
    function isCGDorFCBD( title ) {
        return title.indexOf( CGD_PREFIX ) === 0 || title.indexOf( FCBD_PREFIX ) === 0;
    }
 
    function parseTitle( title ) {
        if ( isCGDorFCBD( title ) ) {
            var displayTitle = title.replace( /\s+Vol\s+1\s+1\s*$/i, '' ).trim();
            var pictureTitle = removeColon( title );
            return {
                fullTitle:   title,
                series:      displayTitle,
                vol:         1,
                issueStr:    displayTitle,
                picture:     pictureTitle + '.jpg',
                isException: false,
                isOneShot:   false,
                isCGDFCBD:   true,
                date:        ''
            };
        }
        var series     = title.replace( /\s*\bVol\b.*$/, '' ).trim();
        var volMatch   = title.match( /Vol\s+(\d+)/i );
        var vol        = volMatch ? parseInt( volMatch[ 1 ] ) : 1;
        var issueMatch = title.match( /(\d+)(?:\s+(Annual|Special))?$/i );
        var issue      = issueMatch ? issueMatch[ 1 ] : '1';
        var isAnnual   = /Annual/i.test( title );
        var isSpecial  = /Special/i.test( title );
        var issueStr   = issue;
        if ( isAnnual )  issueStr += ' Annual';
        if ( isSpecial ) issueStr += ' Special';
        var pictureBase = title.replace( /:/g, '' ).replace( /\s+/g, ' ' ).trim();
        return {
            fullTitle:   title,
            series:      series,
            vol:         vol,
            issueStr:    issueStr,
            picture:     pictureBase + '.jpg',
            isException: false,
            isOneShot:   false,
            isCGDFCBD:   false,
            date:        ''
        };
    }
 
    function findException( series, exceptions ) {
        if ( exceptions[ series ] ) return exceptions[ series ];
        var found = null;
        Object.keys( exceptions ).forEach( function ( key ) {
            var escaped = key.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
            var regex = new RegExp( '\\b' + escaped + '\\b', 'i' );
            if ( regex.test( series ) ) found = exceptions[ key ];
        } );
        return found;
    }
 
    // Слова-маркеры сборников — используются и при фильтрации, и в no_filter
    var FILTER_WORDS = /\b(Omnibus|TPB|Edition|Collection)\b/i;

    function applyExceptions( titles, exceptions ) {
        // Восстанавливаем выпуски с no_filter = yes, которые были отфильтрованы. (fetchReleases уже отфильтровал, но здесь обрабатываем оставшиеся)
        return titles.map( function ( title ) {
            var data = parseTitle( title );
            var exc  = findException( data.series, exceptions );
            if ( exc ) {
                data.isException = true;
                // no_filter: выпуск не фильтруется как омнибус
                if ( exc.no_filter === 'yes' ) data.noFilter = true;
                if ( exc.issue2 ) {
                    data.issueStr = exc.issue2;
                    if ( exc.issue2 === 'One-Shot' ) data.isOneShot = true;
                }
                if ( exc.vol2 )       data.vol     = parseInt( exc.vol2 ) || data.vol;
                if ( exc.picture2 )   data.picture = exc.picture2;
                if ( exc.name2 )      data.series  = exc.name2;
                if ( exc.series_link === 'yes' ) data.seriesLink = true;
            }
            return data;
        } ).filter( function ( data ) {
            // Фильтруем омнибусы/сборники, если нет явного no_filter
            if ( data.noFilter ) return true;
            return !FILTER_WORDS.test( data.fullTitle );
        } );
    }

    // 4б. Автоопределение ван-шотов
    function detectOneShotsFromAPI( releasesData ) {
    	// Собираем кандидатов: Vol 1, выпуск 1, не CGD/FCBD, не помечен исключением
        var candidates = releasesData.filter( function ( d ) {
            return !d.isCGDFCBD && !d.isOneShot && d.vol === 1 && d.issueStr === '1';
        } );
        if ( candidates.length === 0 ) return Promise.resolve( releasesData );
        // Извлекаем название тома (убираем последнее число — номер выпуска), например: "Amazing Spider-Man Vol 1 1" → "Amazing Spider-Man Vol 1"
        var volumeTitles = candidates.map( function ( d ) {
            return d.fullTitle.replace( /\s+\d+$/, '' );
        } );
        // Батч-запрос (пакетный запрос): до 50 томов за раз
        var batches = [];
        for ( var i = 0; i < volumeTitles.length; i += 50 ) {
            batches.push( volumeTitles.slice( i, i + 50 ) );
        }

        var requests = batches.map( function ( batch ) {
            var url = 'https://marvel.fandom.com/api.php?action=query' + '&titles=' + encodeURIComponent( batch.join( '|' ) ) + '&prop=categories&clcategories=Category:One%20Shots' + '&format=json&origin=*';
            return fetch( url ).then( function ( res ) {
                return res.json();
            } ).then( function ( json ) {
                // Собираем множество томов, которые входят в категорию One Shots
                var oneShotVolumes = {};
                var pages = json.query && json.query.pages ? json.query.pages : {};
                Object.keys( pages ).forEach( function ( id ) {
                    var page = pages[ id ];
                    if ( page.categories && page.categories.length > 0 ) {
                        oneShotVolumes[ page.title ] = true;
                    }
                } );
                return oneShotVolumes;
            } );
        } );

        return Promise.all( requests ).then( function ( results ) {
            // Объединяем результаты всех батчей в одно множество
            var allOneShotVolumes = {};
            results.forEach( function ( r ) {
                Object.keys( r ).forEach( function ( title ) {
                    allOneShotVolumes[ title ] = true;
                } );
            } );
            // Помечаем кандидатов, чей том оказался в One Shots
            releasesData.forEach( function ( d ) {
                if ( !d.isCGDFCBD && !d.isOneShot && d.vol === 1 && d.issueStr === '1' ) {
                    var volumeTitle = d.fullTitle.replace( /\s+\d+$/, '' );
                    if ( allOneShotVolumes[ volumeTitle ] ) {
                        d.isOneShot = true;
                        d.issueStr  = d.series;
                    }
                }
            } );
            return releasesData;
        } ).catch( function ( err ) {
            console.warn( 'MarvelCalendar: Не удалось проверить ван-шоты', err );
            return releasesData; // при ошибке возвращаем данные как есть
        } );
    }

    // 4в. Автоопределение Star Wars (ссылка на серию)
    function detectStarWarsFromAPI( releasesData ) {
        // Кандидаты: обычные выпуски, не помеченные вручную через EH
        var candidates = releasesData.filter( function ( d ) {
            return !d.isCGDFCBD && !d.isOneShot && !d.seriesLink;
        } );
        if ( candidates.length === 0 ) return Promise.resolve( releasesData );

        // Извлекаем названия томов
        var volumeTitles = candidates.map( function ( d ) {
            return d.fullTitle.replace( /\s+\d+$/, '' );
        } );

        // Дедупликация
        var unique = [];
        volumeTitles.forEach( function ( t ) {
            if ( unique.indexOf( t ) === -1 ) unique.push( t );
        } );

        var batches = [];
        for ( var i = 0; i < unique.length; i += 50 ) {
            batches.push( unique.slice( i, i + 50 ) );
        }

        var requests = batches.map( function ( batch ) {
            var url = 'https://marvel.fandom.com/api.php?action=query' + '&titles=' + encodeURIComponent( batch.join( '|' ) ) + '&prop=categories&clcategories=Category:Star%20Wars%20Comic%20Books' + '&format=json&origin=*';
            return fetch( url ).then( function ( res ) {
                return res.json();
            } ).then( function ( json ) {
                var swVolumes = {};
                var pages = json.query && json.query.pages ? json.query.pages : {};
                Object.keys( pages ).forEach( function ( id ) {
                    var page = pages[ id ];
                    if ( page.categories && page.categories.length > 0 ) {
                        swVolumes[ page.title ] = true;
                    }
                } );
                return swVolumes;
            } );
        } );

        return Promise.all( requests ).then( function ( results ) {
            var allSWVolumes = {};
            results.forEach( function ( r ) {
                Object.keys( r ).forEach( function ( title ) {
                    allSWVolumes[ title ] = true;
                } );
            } );
            releasesData.forEach( function ( d ) {
                if ( !d.isCGDFCBD && !d.isOneShot && !d.seriesLink ) {
                    var volumeTitle = d.fullTitle.replace( /\s+\d+$/, '' );
                    if ( allSWVolumes[ volumeTitle ] ) {
                        d.seriesLink = true;
                        // Обрезаем Vol X из series для ссылки на серию
                        d.series = d.series.replace( /\s*Vol\s+\d+\s*$/i, '' ).trim();
                    }
                }
            } );
            return releasesData;
        } ).catch( function ( err ) {
            console.warn( 'MarvelCalendar: Не удалось проверить Star Wars', err );
            return releasesData;
        } );
    }
 
    // 5. Формирование {{РГ}} и рендер
    function buildRGCall( data ) {
        if ( data.isCGDFCBD ) {
            return '{{РГ|' + data.picture + '|' + data.series + '|' + data.series + '}}';
        }
        if ( data.isOneShot || data.issueStr === 'One-Shot' ) {
            return '{{РГ|' + data.picture + '|' + data.series + '|' + data.series + '}}';
        }
        // Ссылка на серию вместо выпуска (series_link или Star Wars)
        if ( data.seriesLink ) {
            return '{{РГ|' + data.picture + '|' + data.series + '|#' + data.issueStr + '}}';
        }
        // Исключение без series_link — ссылка на конкретный выпуск с кастомной обложкой/томом
        // data.series, data.vol и data.picture уже содержат применённые значения из EH
        if ( data.isException ) {
            return '{{РГ|' + data.picture + '|' + data.series + ' Vol ' + data.vol + ' ' + data.issueStr + '|#' + data.issueStr + '}}';
        }
        var volPart = ( data.vol === 1 ) ? '' : ' ' + data.vol;
        return '{{РГ|' + data.issueStr + volPart + '|в=' + data.series + '}}';
    }
 
    function fetchReleases( week, year ) {
        var cat = 'Week_' + week + ',_' + year;
        var url = 'https://marvel.fandom.com/api.php?action=query&list=categorymembers' + '&cmtitle=Category:' + encodeURIComponent( cat ) + '&cmlimit=500&cmprop=title&format=json&origin=*';
        return fetch( url ).then( function ( res ) {
            if ( !res.ok ) throw new Error( 'HTTP ' + res.status );
            return res.json();
        } ).then( function ( json ) {
            var all = ( json.query && json.query.categorymembers )
                ? json.query.categorymembers.map( function ( m ) { return m.title; } )
                : [];
            return all;
        } ).catch( function ( err ) {
            console.error( 'MarvelCalendar: Ошибка запроса к API Marvel', err );
            return [];
        } );
    }
 
    function renderWithRG( releasesData, calendar ) {
        var container = calendar.querySelector( '.comics-container' );
        if ( !container ) return Promise.resolve();
        if ( releasesData.length === 0 ) {
            container.innerHTML = '<p class="no-releases">На этой неделе релизов Marvel нет.</p>';
            return Promise.resolve();
        }
        var wikitext = releasesData.map( buildRGCall ).join( '\n' );
        var api = new mw.Api();
        return api.parse( wikitext, {
            title: mw.config.get( 'wgPageName' ),
            disableeditsection: true,
            wrapoutputclass: ''
        } ).then( function ( parsed ) {
            var current = getCurrentISOWeekAndYear();
            // Заголовок недели переносим внутрь .comics-week; .comics-week_title — под .mw-collapsible, — это необходимо для корректной работы CSS (order: -1 в railModule); .mw-collapsible даёт раскрывающуюся вкладку; инициализируется через jquery.makeCollapsible
            container.innerHTML =
                '<div class="comics-week">' +
                    getWeekRange( current.week, current.year ) +
                    '<div class="mw-collapsible mw-collapsed">' +
                        '<div class="mw-collapsible-content">' +
                            '<div class="comics-table">' +
                                parsed +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            mw.loader.using( 'jquery.makeCollapsible' ).then( function () {
                $( container ).find( '.mw-collapsible' ).makeCollapsible();
            } );
        } ).catch( function ( err ) {
            console.error( 'MarvelCalendar: Ошибка парсинга {{РГ}}', err );
            container.innerHTML = '<p class="error">Ошибка отображения календаря. Попробуйте обновить страницу.</p>';
        } );
    }
 
    // 6. Основная функция инициализации
    function initMarvelCalendar( calendar ) {
        // .week-header оставляем пустым — заголовок теперь рендерится внутри .comics-week
        var container = calendar.querySelector( '.comics-container' );
        if ( !container ) return;

        var current = getCurrentISOWeekAndYear();
        var week = current.week;
        var year = current.year;

        // Показываем Серебряного Сёрфера пока идёт загрузка
        container.innerHTML = LOADING_HTML;
 
        var cache = getCache();
 
        getExceptionsInfo().then( function ( exceptionsInfo ) {
            if ( cache &&
                 cache.week === week &&
                 cache.year === year &&
                 cache.exceptionsRevId === exceptionsInfo.revid ) {
                return renderWithRG( cache.data, calendar );
            }
            return fetchReleases( week, year ).then( function ( titles ) {
                var releasesData = applyExceptions( titles, exceptionsInfo.exceptions );
                // Автоопределение ван-шотов через API
                return detectOneShotsFromAPI( releasesData );
            } ).then( function ( releasesData ) {
                return detectStarWarsFromAPI( releasesData );
            } ).then( function ( releasesData ) {
                setCache( releasesData, exceptionsInfo.revid );
                return renderWithRG( releasesData, calendar );
            } );
        } ).catch( function ( err ) {
            console.error( err );
            container.innerHTML = '<p class="error">Не удалось загрузить данные. Попробуйте обновить страницу.</p>';
        } );
    }
 
    // 7. Запуск + кнопка «Обновить сейчас»
    // Вместо глобального флага started используем атрибут data-mc-init на каждом элементе — это позволяет корректно инициализировать оба экземпляра календаря: на Заглавной и в модуле рельсы (вставляется позже через AddRailModule, который повторно файрит mw.hook('wikipage.content'))
    function startCalendar( $content ) {
        var root = ( $content && $content[ 0 ] ) ? $content[ 0 ] : document;
        var calendars = root.querySelectorAll( '#' + CALENDAR_ID + ':not([data-mc-init])' );
        calendars.forEach( function ( calendar ) {
            calendar.setAttribute( 'data-mc-init', '1' );
            initMarvelCalendar( calendar );
            var refreshBtn = document.createElement( 'button' );
            var refreshing = false;
            refreshBtn.textContent = 'Обновить календарь сейчас';
            refreshBtn.style.cssText = 'font-size:0.85em; margin-top:8px; opacity:0.8;';
            refreshBtn.onclick = function () {
                if ( refreshing ) return;
                refreshing = true;
                if ( LS_AVAILABLE ) {
                    try { localStorage.removeItem( CACHE_KEY ); } catch ( _ ) {}
                }
                initMarvelCalendar( calendar );
                refreshBtn.textContent = 'Обновлено!';
                setTimeout( function () {
                    refreshBtn.textContent = 'Обновить календарь сейчас';
                    refreshing = false;
                }, 3000 );
            };
            calendar.appendChild( refreshBtn );
        } );
    }
 
    mw.loader.using( 'mediawiki.api' ).then( function () {
        mw.hook( 'wikipage.content' ).add( startCalendar );
        if ( document.readyState === 'complete' ||
             document.readyState === 'interactive' ) {
            startCalendar();
        }
    } );
 
}( jQuery, mediaWiki ) );
// html контейнер для корректного вызова:
/*<div id="marvel-weekly-calendar">
  <div class="week-header"></div>
  <div class="comics-container">Загрузка...</div>
</div> */
// «Загрузка...» нужна как статический контент — без него AddRailModule может посчитать модуль пустым. JS немедленно перезаписывает .comics-container на Серебряного Сёрфера.