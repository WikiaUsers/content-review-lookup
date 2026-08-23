// MediaWiki:ListOfMinorCharacters.js. Создание перенаправлений для Таблицы Малозначимых Персонажей (ТМП). При смене ISO-недели обходит все страницы "Малозначимые персонажи (X)", извлекает вызовы {{ТМП|...}} и создаёт/обновляет перенаправления "Имя (Вселенная)" на "Малозначимые персонажи (X)#Имя (Вселенная)".

( function ( $, mw ) {
    'use strict';

    var MARKER_VERSION     = 1;
    var MARKER_PAGE         = 'Данные:Последний запуск скриптов'; // общая страница для всех скриптов, зависящих от смены недели JSON-содержимое хранится внутри первого HTML-комментария на странице — это скрывает его от обычного просмотра (MediaWiki вырезает комментарии при рендере), но не мешает парсингу, и позволяет держать рядом документацию/<noinclude> без риска её потерять.
    var MARKER_COMMENT_RE   = /<!--([\s\S]*?)-->/;
    var SCRIPT_ID           = 'ListOfMinorCharacters'; // ключ этого скрипта внутри общего JSON — не менять без необходимости, иначе отметка "потеряется"
    var MARKER_MAX_RETRIES  = 3; // попытки перезаписи при конфликте одновременной записи с другим скриптом
    var CONFLICTS_PAGE      = 'Марвелпедия:Управление ТМП';
    var CONFLICTS_START     = '<!-- TMP-CONFLICTS-START -->';
    var CONFLICTS_END       = '<!-- TMP-CONFLICTS-END -->';
    var LIST_PREFIX         = 'Малозначимые персонажи (';
    var API_BASE            = 'https://marvel.fandom.com/api.php';
    var RIGHTCOLORS_PAGE    = 'MediaWiki:RightColors.css';
    
    // === TMP_REQUIRE_AUTH ===
    // Если отключить (false), кнопку сможет нажимать кто угодно. Включить (true) для ограничения доступа на авторизованных пользователей (sysop/модератор из wgUserGroups или RightColors.css).
    var TMP_REQUIRE_AUTH    = false;
    
    // Группы, которых достаточно для запуска без проверки RightColors.css:
    var AUTHORIZED_GROUPS   = [ 'sysop', 'bureaucrat', 'content-moderator', 'threadmoderator', 'moderator' ];
    var EDIT_SUMMARY_NEW    = 'ТМП: автоматическое создание перенаправления';
    var EDIT_SUMMARY_UPD    = 'ТМП: обновление цели перенаправления';
    var EDIT_SUMMARY_MARK   = 'ТМП: обновление маркера последнего запуска';
    var EDIT_SUMMARY_CONF   = 'ТМП: обновление списка конфликтов';
    var EDIT_DELAY_MS       = 400; // пауза между правками, чтобы не долбить API

    // 1. ISO-неделя (аналогично MarvelCalendar.js)
    function getCurrentISOWeekAndYear() {
        var now = new Date();
        var d = new Date( Date.UTC( now.getFullYear(), now.getMonth(), now.getDate() ) );
        d.setUTCDate( d.getUTCDate() + 3 - ( d.getUTCDay() + 6 ) % 7 );
        var yearStart = new Date( Date.UTC( d.getUTCFullYear(), 0, 1 ) );
        var weekNo = Math.ceil( ( ( ( d - yearStart ) / 86400000 ) + 1 ) / 7 );
        return { week: weekNo, year: d.getUTCFullYear() };
    }

    function fetchJson( url ) {
        return fetch( url ).then( function ( res ) {
            if ( !res.ok ) throw new Error( 'HTTP ' + res.status );
            return res.json();
        } );
    }

    // 2. Работа с общей маркер-страницей "Данные:Последний запуск скриптов" (хранится на вики, не в localStorage — должно быть общим для всех устройств админа/модератора и для всех скриптов, зависящих от смены недели). Формат: { version, scripts: { SCRIPT_ID: {week,year,timestamp}, ... } }. Каждый скрипт читает и пишет только свой ключ внутри scripts — так они не мешают друг другу. Возвращает { data: object, content: string, basetimestamp } — content нужен, чтобы при записи сохранить всё, что на странице находится вне JSON-комментария (документацию, <noinclude> и т.п.).
    function fetchMarkerRaw() {
        var url = API_BASE + '?action=query&titles=' + encodeURIComponent( MARKER_PAGE ) + '&prop=revisions&rvprop=content|timestamp&rvslots=main&format=json&formatversion=2&origin=*';
        return fetchJson( url ).then( function ( json ) {
            var page = json.query && json.query.pages ? json.query.pages[ 0 ] : null;
            if ( !page || page.missing ) {
                return { data: { version: MARKER_VERSION, scripts: {} }, content: '', basetimestamp: null };
            }
            var rev = page.revisions[ 0 ];
            var content = rev.slots.main.content || '';
            var data = parseMarkerData( content );
            return { data: data, content: content, basetimestamp: rev.timestamp };
        } ).catch( function () {
            return { data: { version: MARKER_VERSION, scripts: {} }, content: '', basetimestamp: null };
        } );
    }

    // Извлекает JSON из первого HTML-комментария на странице. Для обратной совместимости, если комментария нет, пробует распарсить содержимое страницы целиком как JSON (старый формат).
    function parseMarkerData( content ) {
        var raw = null;
        var match = MARKER_COMMENT_RE.exec( content );
        if ( match ) {
            raw = match[ 1 ].trim();
        } else if ( content.trim() ) {
            raw = content.trim();
        }
        if ( !raw ) return { version: MARKER_VERSION, scripts: {} };
        try {
            var data = JSON.parse( raw );
            if ( data.version !== MARKER_VERSION || !data.scripts ) {
                return { version: MARKER_VERSION, scripts: {} };
            }
            return data;
        } catch ( e ) {
            console.warn( 'ListOfMinorCharacters: не удалось разобрать JSON маркера, использую пустой', e );
            return { version: MARKER_VERSION, scripts: {} };
        }
    }

    // Собирает новый текст страницы: заменяет JSON внутри первого HTML-комментария, либо добавляет такой комментарий, если его ещё нет — остальной текст страницы (документация) не трогается.
    function buildMarkerContent( oldContent, data ) {
        var block = '<!--\n' + JSON.stringify( data, null, 2 ) + '\n-->';
        if ( MARKER_COMMENT_RE.test( oldContent ) ) {
            return oldContent.replace( MARKER_COMMENT_RE, block );
        }
        if ( !oldContent.trim() ) return block;
        return block + '\n' + oldContent;
    }

    // Отметка о своём последнем запуске (только свой SCRIPT_ID)
    function getMarker() {
        return fetchMarkerRaw().then( function ( raw ) {
            return raw.data.scripts[ SCRIPT_ID ] || { week: 0, year: 0 };
        } );
    }

    // Запись со слиянием: перед сохранением заново читает страницу и передаёт basetimestamp — если её кто-то (другой скрипт) успел изменить между чтением и записью, MediaWiki вернёт ошибку editconflict вместо молчаливой перезаписи чужих данных, и мы повторяем попытку.
    function setMarker( api, week, year, attempt ) {
        attempt = attempt || 1;
        return fetchMarkerRaw().then( function ( raw ) {
            raw.data.scripts[ SCRIPT_ID ] = { week: week, year: year, timestamp: Date.now() };
            var newContent = buildMarkerContent( raw.content, raw.data );
            var editParams = {
                action: 'edit',
                title: MARKER_PAGE,
                text: newContent,
                summary: EDIT_SUMMARY_MARK
            };
            if ( raw.basetimestamp ) editParams.basetimestamp = raw.basetimestamp;
            return api.postWithToken( 'csrf', editParams ).catch( function ( err ) {
                var isConflict = err && ( err === 'editconflict' ||
                    ( err.error && err.error.code === 'editconflict' ) );
                if ( isConflict && attempt < MARKER_MAX_RETRIES ) {
                    console.warn( 'ListOfMinorCharacters: конфликт записи маркера (другой скрипт), повтор ' + attempt );
                    return setMarker( api, week, year, attempt + 1 );
                }
                console.error( 'ListOfMinorCharacters: не удалось обновить маркер', err );
            } );
        } );
    }

    // 3. Проверка прав: sysop/модератор через wgUserGroups ИЛИ упоминание в RightColors.css
    var allowedFromRightColorsCache = null; // Promise<Set<string>>, кэшируется на время сессии страницы

    function getAllowedUsersFromRightColors() {
        if ( allowedFromRightColorsCache ) return allowedFromRightColorsCache;
        var url = API_BASE + '?action=query&titles=' + encodeURIComponent( RIGHTCOLORS_PAGE ) + '&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&origin=*';
        allowedFromRightColorsCache = fetchJson( url ).then( function ( json ) {
            var page = json.query && json.query.pages ? json.query.pages[ 0 ] : null;
            var users = {};
            if ( !page || page.missing ) return users;
            var content = page.revisions[ 0 ].slots.main.content || '';
            // Ищем все href$="...Участник:ИМЯ" / href$="...User:ИМЯ", включая URL-кодированные варианты
            var re = /href\$="([^"]*(?:User|%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA)[^"]*)"/gi;
            var match;
            while ( ( match = re.exec( content ) ) !== null ) {
                var raw = match[ 1 ];
                var decoded;
                try { decoded = decodeURIComponent( raw ); } catch ( e ) { decoded = raw; }
                var parts = decoded.split( ':' );
                if ( parts.length < 2 ) continue;
                var username = parts.slice( 1 ).join( ':' ).replace( /_/g, ' ' ).trim();
                if ( username ) users[ username.toLowerCase() ] = true;
            }
            return users;
        } ).catch( function ( err ) {
            console.warn( 'ListOfMinorCharacters: не удалось загрузить RightColors.css', err );
            return {};
        } );
        return allowedFromRightColorsCache;
    }

    function isAuthorized() {
        var groups = mw.config.get( 'wgUserGroups' ) || [];
        var hasGroup = groups.some( function ( g ) { return AUTHORIZED_GROUPS.indexOf( g ) !== -1; } );
        if ( hasGroup ) return Promise.resolve( true );
        var username = mw.config.get( 'wgUserName' );
        if ( !username ) return Promise.resolve( false ); // анонимы никогда не проходят
        return getAllowedUsersFromRightColors().then( function ( users ) {
            return !!users[ username.toLowerCase() ];
        } );
    }

    // 4. Список страниц "Малозначимые персонажи (X)"
    function getListPages() {
        var url = API_BASE + '?action=query&list=allpages&apprefix=' + encodeURIComponent( LIST_PREFIX ) + '&apnamespace=0&aplimit=500&format=json&formatversion=2&origin=*';
        return fetchJson( url ).then( function ( json ) {
            var pages = ( json.query && json.query.allpages ) ? json.query.allpages : [];
            return pages.map( function ( p ) { return p.title; } );
        } ).catch( function ( err ) {
            console.error( 'ListOfMinorCharacters: не удалось получить список страниц', err );
            return [];
        } );
    }

    // 5. Получение содержимого страниц батчем по 50
    function fetchPagesContent( titles ) {
        if ( titles.length === 0 ) return Promise.resolve( {} );
        var batches = [];
        for ( var i = 0; i < titles.length; i += 50 ) {
            batches.push( titles.slice( i, i + 50 ) );
        }
        var requests = batches.map( function ( batch ) {
            var url = API_BASE + '?action=query&titles=' + encodeURIComponent( batch.join( '|' ) ) + '&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&origin=*';
            return fetchJson( url ).then( function ( json ) {
                var pages = ( json.query && json.query.pages ) ? json.query.pages : [];
                var result = {};
                pages.forEach( function ( p ) {
                    result[ p.title ] = ( !p.missing && p.revisions && p.revisions[ 0 ] )
                        ? p.revisions[ 0 ].slots.main.content || ''
                        : null; // null = страницы не существует
                } );
                return result;
            } );
        } );
        return Promise.all( requests ).then( function ( results ) {
            var merged = {};
            results.forEach( function ( r ) {
                Object.keys( r ).forEach( function ( t ) { merged[ t ] = r[ t ]; } );
            } );
            return merged;
        } );
    }

    // 6. Парсинг вызовов {{ТМП|...}} с учётом вложенных {{...}} и [[...]]
    function extractTMPCalls( wikitext ) {
        var calls = [];
        var re = /\{\{\s*ТМП\s*\|/gi;
        var match;
        while ( ( match = re.exec( wikitext ) ) !== null ) {
            var start = match.index;
            var pos = start + 2;
            var depthBrace = 1;
            var end = -1;
            for ( var i = pos; i < wikitext.length - 1; i++ ) {
                var two = wikitext.substr( i, 2 );
                if ( two === '{{' ) { depthBrace++; i++; continue; }
                if ( two === '}}' ) {
                    depthBrace--;
                    if ( depthBrace === 0 ) { end = i + 2; break; }
                    i++; continue;
                }
            }
            if ( end === -1 ) { re.lastIndex = start + 2; continue; }
            var inner = wikitext.slice( start + 2, end - 2 );
            var params = splitTopLevel( inner );
            params.shift(); // убираем "ТМП"
            var named = {};
            params.forEach( function ( p, idx ) {
                var eq = findTopLevelEquals( p );
                if ( eq !== -1 ) {
                    named[ p.slice( 0, eq ).trim() ] = p.slice( eq + 1 ).trim();
                } else {
                    named[ String( idx + 1 ) ] = p.trim();
                }
            } );
            if ( named[ '3' ] && named[ '2' ] ) {
                calls.push( { name: named[ '3' ], universe: named[ '2' ] } );
            }
            re.lastIndex = end;
        }
        return calls;
    }

    function splitTopLevel( str ) {
        var parts = [];
        var depthBrace = 0, depthBracket = 0, buf = '';
        for ( var i = 0; i < str.length; i++ ) {
            var two = str.substr( i, 2 );
            if ( two === '{{' ) { depthBrace++; buf += two; i++; continue; }
            if ( two === '}}' ) { depthBrace = Math.max( 0, depthBrace - 1 ); buf += two; i++; continue; }
            if ( two === '[[' ) { depthBracket++; buf += two; i++; continue; }
            if ( two === ']]' ) { depthBracket = Math.max( 0, depthBracket - 1 ); buf += two; i++; continue; }
            if ( str[ i ] === '|' && depthBrace === 0 && depthBracket === 0 ) {
                parts.push( buf ); buf = ''; continue;
            }
            buf += str[ i ];
        }
        parts.push( buf );
        return parts;
    }

    function findTopLevelEquals( str ) {
        var depthBrace = 0, depthBracket = 0;
        for ( var i = 0; i < str.length; i++ ) {
            var two = str.substr( i, 2 );
            if ( two === '{{' ) { depthBrace++; i++; continue; }
            if ( two === '}}' ) { depthBrace = Math.max( 0, depthBrace - 1 ); i++; continue; }
            if ( two === '[[' ) { depthBracket++; i++; continue; }
            if ( two === ']]' ) { depthBracket = Math.max( 0, depthBracket - 1 ); i++; continue; }
            if ( str[ i ] === '=' && depthBrace === 0 && depthBracket === 0 ) return i;
        }
        return -1;
    }

    // 7. Разбор существующего перенаправления: возвращает { page, anchor } либо null, если это не перенаправление
    var REDIRECT_RE = /^\s*#(?:REDIRECT|redirect|перенаправление)\s*\[\[\s*([^\]#]+?)\s*(?:#\s*([^\]]+?)\s*)?\]\]/;

    function parseRedirect( content ) {
        if ( content === null ) return null;
        var m = REDIRECT_RE.exec( content );
        if ( !m ) return null;
        return { page: m[ 1 ].trim(), anchor: ( m[ 2 ] || '' ).trim() };
    }

    // 8. Последовательное выполнение правок (создание/обновление) с паузой между ними
    function applyEditsSequentially( api, edits ) {
        var i = 0;
        function next() {
            if ( i >= edits.length ) return Promise.resolve();
            var e = edits[ i ];
            i++;
            var params = {
                action: 'edit',
                title: e.redirectTitle,
                text: '#REDIRECT [[' + e.target + ']]',
                summary: e.isUpdate ? EDIT_SUMMARY_UPD : EDIT_SUMMARY_NEW
            };
            if ( !e.isUpdate ) params.createonly = 1; // защита от гонки при создании
            else params.nocreate = 1; // при обновлении страница обязана уже существовать
            return api.postWithToken( 'csrf', params ).catch( function ( err ) {
                console.warn( 'ListOfMinorCharacters: не удалось записать ' + e.redirectTitle, err );
            } ).then( function () {
                return new Promise( function ( resolve ) { setTimeout( resolve, EDIT_DELAY_MS ); } );
            } ).then( next );
        }
        return next();
    }

    // 9. Обновление автоматического блока на странице управления (не трогает остальной текст страницы)
    function updateConflictsPage( api, conflicts ) {
        var block = CONFLICTS_START + '\n';
        if ( conflicts.length === 0 ) {
            block += "''На данный момент конфликтов не обнаружено.''\n";
        } else {
            conflicts.forEach( function ( c ) {
                block += '* [[' + c.redirectTitle + ']]\n';
            } );
        }
        block += CONFLICTS_END;

        var url = API_BASE + '?action=query&titles=' + encodeURIComponent( CONFLICTS_PAGE ) + '&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&origin=*';
        return fetchJson( url ).then( function ( json ) {
            var page = json.query && json.query.pages ? json.query.pages[ 0 ] : null;
            var current = ( page && !page.missing && page.revisions ) ? page.revisions[ 0 ].slots.main.content : '';
            var newText;
            if ( current.indexOf( CONFLICTS_START ) !== -1 && current.indexOf( CONFLICTS_END ) !== -1 ) {
                var re = new RegExp( CONFLICTS_START.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ) +
                    '[\\s\\S]*?' + CONFLICTS_END.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ) );
                newText = current.replace( re, block );
            } else {
                newText = current + ( current ? '\n\n' : '' ) + block;
            }
            if ( newText === current ) return; // без изменений — не создаём лишнюю правку в истории
            return api.postWithToken( 'csrf', {
                action: 'edit',
                title: CONFLICTS_PAGE,
                text: newText,
                summary: EDIT_SUMMARY_CONF
            } );
        } ).catch( function ( err ) {
            console.error( 'ListOfMinorCharacters: не удалось обновить страницу управления', err );
        } );
    }

    // 10. Основной проход
    function runSync( week, year ) {
        var api = new mw.Api();
        return getListPages().then( function ( listPages ) {
            return fetchPagesContent( listPages ).then( function ( contentMap ) {
                var entries = [];
                var seen = {};
                Object.keys( contentMap ).forEach( function ( pageTitle ) {
                    if ( contentMap[ pageTitle ] === null ) return;
                    var calls = extractTMPCalls( contentMap[ pageTitle ] );
                    calls.forEach( function ( c ) {
                        var suffix = c.name + ' (' + c.universe + ')';
                        if ( seen[ suffix ] ) {
                            console.warn( 'ListOfMinorCharacters: дублирующаяся запись ТМП: ' + suffix + ' на страницах "' + seen[ suffix ] + '" и "' + pageTitle + '"' );
                            return;
                        }
                        seen[ suffix ] = pageTitle;
                        entries.push( { redirectTitle: suffix, targetPage: pageTitle, target: pageTitle + '#' + suffix } );
                    } );
                } );

                if ( entries.length === 0 ) return { created: 0, updated: 0, conflicts: [] };

                return fetchPagesContent( entries.map( function ( e ) { return e.redirectTitle; } ) )
                    .then( function ( targetContent ) {
                        var edits = [];
                        var conflicts = [];
                        entries.forEach( function ( e ) {
                            var existing = targetContent[ e.redirectTitle ];
                            if ( existing === null || existing === undefined ) {
                                edits.push( { redirectTitle: e.redirectTitle, target: e.target, isUpdate: false } );
                                return;
                            }
                            var redirect = parseRedirect( existing );
                            if ( !redirect ) {
                                // существует и это не перенаправление => отдельная статья => конфликт
                                conflicts.push( e );
                                return;
                            }
                            var currentTarget = redirect.page + ( redirect.anchor ? '#' + redirect.anchor : '' );
                            if ( currentTarget !== e.target ) {
                                edits.push( { redirectTitle: e.redirectTitle, target: e.target, isUpdate: true } );
                            }
                            // иначе уже синхронизирован — ничего не делаем
                        } );
                        return applyEditsSequentially( api, edits ).then( function () {
                            return updateConflictsPage( api, conflicts ).then( function () {
                                var created = edits.filter( function ( e ) { return !e.isUpdate; } ).length;
                                var updated = edits.filter( function ( e ) { return e.isUpdate; } ).length;
                                return { created: created, updated: updated, conflicts: conflicts.length };
                            } );
                        } );
                    } );
            } );
        } );
    }

    // 11. Инициализация: авто-запуск при смене недели + ручная кнопка (#tmp-sync-control)
    function maybeAutoRun() {
        // Авторазгрузка только если авторизация требуется
        if ( !TMP_REQUIRE_AUTH ) return;
        
        isAuthorized().then( function ( ok ) {
            if ( !ok ) return;
            var current = getCurrentISOWeekAndYear();
            getMarker().then( function ( marker ) {
                if ( marker.week === current.week && marker.year === current.year ) return;
                console.log( 'ListOfMinorCharacters: смена недели, запускаю синхронизацию…' );
                var api = new mw.Api();
                runSync( current.week, current.year ).then( function ( result ) {
                    console.log( 'ListOfMinorCharacters: готово. Создано: ' + result.created + ', обновлено: ' + result.updated + ', конфликтов: ' + result.conflicts );
                    return setMarker( api, current.week, current.year );
                } ).catch( function ( err ) {
                    console.error( 'ListOfMinorCharacters: ошибка синхронизации', err );
                } );
            } );
        } );
    }

    function createSyncButton( control ) {
        var btn = document.createElement( 'button' );
        var running = false;
        btn.textContent = 'Запустить синхронизацию ТМП сейчас';
        btn.onclick = function () {
            if ( running ) return;
            running = true;
            btn.textContent = 'Выполняется…';
            var current = getCurrentISOWeekAndYear();
            var api = new mw.Api();
            runSync( current.week, current.year ).then( function ( result ) {
                btn.textContent = 'Готово: создано ' + result.created + ', обновлено ' + result.updated + ', конфликтов ' + result.conflicts;
                return setMarker( api, current.week, current.year );
            } ).catch( function ( err ) {
                console.error( 'ListOfMinorCharacters: ошибка синхронизации', err );
                btn.textContent = 'Ошибка, см. консоль';
            } ).then( function () {
                running = false;
            } );
        };
        control.appendChild( btn );
    }

    function attachManualButton() {
        var control = document.getElementById( 'tmp-sync-control' );
        if ( !control ) return;
        
        // Если проверка доступа не требуется — показываем кнопку всем
        if ( !TMP_REQUIRE_AUTH ) {
            createSyncButton( control );
            return;
        }
        
        // Иначе проверяем авторизацию
        isAuthorized().then( function ( ok ) {
            if ( !ok ) return;
            createSyncButton( control );
        } );
    }

    mw.loader.using( 'mediawiki.api' ).then( function () {
        maybeAutoRun();
        mw.hook( 'wikipage.content' ).add( attachManualButton );
        if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
            attachManualButton();
        }
    } );

}( jQuery, mediaWiki ) );
/* Для ручного запуска на конкретной странице добавьте контейнер:
<div id="tmp-sync-control"></div>

Кнопка будет видна в зависимости от флага TMP_REQUIRE_AUTH в начале скрипта:
- Если TMP_REQUIRE_AUTH = true (по умолчанию): кнопка видна только авторизованным пользователям (sysop/модератор из wgUserGroups или перечисленных в MediaWiki:RightColors.css).
- Если TMP_REQUIRE_AUTH = false: кнопка доступна всем.
*/

/* На странице "Марвелпедия:Управление ТМП" оставьте (в любом месте) маркеры для авто-блока конфликтов:
<!-- TMP-CONFLICTS-START -->
<!-- TMP-CONFLICTS-END -->
Всё остальное содержимое страницы скрипт не трогает. */