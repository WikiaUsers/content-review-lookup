/*---------------------------- LockOldComments -----------------------*/
    window.lockOldComments = (window.lockOldComments || {});
    window.lockOldComments.limit = 90;
        /** translation fix **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides['LockOldComments'] = window.dev.i18n.overrides['LockOldComments'] || {};
        window.dev.i18n.overrides['LockOldComments']['locked-reply-box'] = "🔒 Этой ветке комментариев более " + window.lockOldComments.limit + " " + (window.lockOldComments.limit > 1 ? 'дней.' : 'дня.') + " Нет необходимости отвечать.";
     
/*---------------------------- Кнопка "Новая страница" -----------------------*/
// Основа
$(".wiki-tools__theme-switch").before('<a href="https://pochti-absolyutnie-monstri.fandom.com/ru/wiki/Служебная:CreatePage" class="wds-button wds-is-secondary" title="Новая страница"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-page-small"></use></svg></a>');

// Блок правой панели. Всзято с вики "Убежище"
function addNewPages(){
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:RailModuleNewPages&action=render');
}

/*---------------------------- Окно при наведении на ссылку -----------------------*/
// Основа
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

// Параметры
window.pPreview.noimage = 'https://pochti-absolyutnie-monstri.fandom.com/ru/wiki/Special:FilePath/Изображение_отсутствует.jpg';
window.pPreview.delay = 500;
window.pPreview.apid = true;
window.pPreview.mline = 5;
window.pPreview.textAlign = 'left';

// Исключение ссылок на пространства имён
window.pPreview.RegExp.ilinks = [
    /(%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F|%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD|%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA|%D0%97%D0%BB%D0%BE%D0%B4%D0%B5%D0%B8[ _]%D0%B2%D0%B8%D0%BA%D0%B8|%D0%A4%D0%B0%D0%B9%D0%BB)(:|%3A)/i,
    /(Категория|Шаблон|Участник|Злодеи[ _]вики|Файл|MediaWiki)(:|%3A)/i
];

/* Bang Search (русская версия) */
(function bang(window, mw, $) {
    if (window.bangLoaded) return;
    window.bangLoaded = true;

 // Селекторы поиска
    var searchInputSelectors = [
        '#searchInput',
        '.mw-searchInput',
        'input[name="search"]',
        '#searchform input[type="text"]',
        '.search-app input'
    ].join(', ');

    var ns = mw.config.get('wgFormattedNamespaces');

 // Кириллица и латиница
    var namespaces = {
        'ш':  ns[10],    // Шаблон
        'мв': ns[8],     // MediaWiki
        'с':  ns[-1],    // Служебная
        'сп': ns[12],    // Справка
        'мо': ns[828],   // Модуль
        'ф':  ns[6],     // Файл
        'у':  ns[2],     // Участник
        'оу': ns[3],     // Обсуждение участника
        'ст': ns[1200],  // Стена обсуждения
        'бу': ns[500],   // Блог участника
        'п':  ns[4],     // Проект
        'к':  ns[14],    // Категория
        'фо': ns[110],   // Форум

        't':  ns[10],    // Template
        'mw': ns[8],     // MediaWiki
        's':  ns[-1],    // Special
        'h':  ns[12],    // Help
        'm':  ns[828],   // Module
        'f':  ns[6],     // File
        'u':  ns[2],     // User
        'ut': ns[3],     // User talk
        'w':  ns[1200],  // Message Wall
        'ub': ns[500],   // User blog
        'p':  ns[4],     // Project
        'c':  ns[14],    // Category
        'fo': ns[110]    // Forum
    };

 // Для удаления отсутствующих ключей
    Object.keys(namespaces).forEach(function(k) {
        if (namespaces[k] === undefined || namespaces[k] === null || namespaces[k] === '') {
            delete namespaces[k];
        }
    });
    $(document).on('keyup', searchInputSelectors, function() {
        var old = $(this).val(),
            txt,
 // !ключ + пробел и всё готово
            m = old.match(/^\!([a-zа-яё]+)\s+/i);
        if (!m) return;
        var key = m[1].toLowerCase();
        if (!namespaces.hasOwnProperty(key)) return;
        txt = namespaces[key] + ':' + old.substr(m[0].length);

 // Нативный сеттер, в протиыном случае React откатит значение обратно
        var setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
        ).set;
        if (setter) {
            setter.call(this, txt);
        } else {
            this.value = txt;
        }
        this.dispatchEvent(new Event('input', { bubbles: true }));
    });
})(window, mediaWiki, jQuery);

/************* BlockSummary от BratockDova *************/

mw.loader.using('mediawiki.api', function() {
	var config = mw.config.get([
		'wgNamespaceNumber',
		'wgRelevantUserName',
		'wgServer', // адрес вики
		'wgSiteName', // как вики зовут
		'wgContentLanguage' // языковой код, чтоб знать, куда лепить /ru
	]);
	
	// не та страница — валим
	if (config.wgNamespaceNumber !== 2) {
		console.error("Страница не в пространстве \"Участник\". BlockSummary.js прерван!");
		return;
	}
	
	// имя не определилось — тоже валим
	if (config.wgRelevantUserName === null) {
		console.error("Имя участника не найдено. BlockSummary.js прерван!");
		return;
	}
	
	var wiki_url = config.wgServer;
	var wiki_lang = config.wgContentLanguage;
	
	// если вики не английская — добавляем языковой сегмент в URL
	if (wiki_lang !== "en") {
		wiki_url = wiki_url + "/" + wiki_lang;
	}
	
	// месяцы в родительном падеже, чтоб было "сентября 27", а не "сентябрь 27"
	var months_ru = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
	
	// сдвиг часового пояса. 3 = МСК. если переедем — поменять тут
	var TZ_OFFSET_HOURS = 3;
	var TZ_LABEL = "МСК";
	
	var user = config.wgRelevantUserName;
	var url_user = user.replace(/ /g, "_"); // пробелы в именах — зло, меняем на подчёркивания
	
	var api = new mw.Api(), data;
	var blockr, blockID, blockperformer, blockperformer_url, blocktime, expire, block_type;
	var partial_block_pages, partial_block_features, partial_block_namespaces;
	var partial_block_namespaces_titles = [];
	var blockStartDateTime, blockEndDateTime;
	var i18n;
	
	
	//----------- | Локализация (i18n) | -----------//
	
	// ждём, пока dev.i18n подгрузится, и только тогда начинаем работать
	mw.hook('dev.i18n').add(function(dev_i18n) {
		dev_i18n.loadMessages('BlockSummary', {
			cacheVersion: 2
		}).done(function(loaded_i18n) {
			i18n = loaded_i18n;
			fetchBlockData();
		});
	});
	
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
	
	// сокращение для вызова перевода. escape() — чтоб не прилетело XSS через имя юзера
	function msg(key) {
		var args = Array.prototype.slice.call(arguments, 1);
		return i18n.msg.apply(i18n, [key].concat(args)).escape();
	}
	
	// "2026-09-27T12:52:00Z" → "15:52 (МСК), сентября 27, 2026"
	// сдвигаем вручную и читаем через getUTC*, чтоб у читателя из другого пояса
	// время не перескакивало. иначе у немца +2, у владивостокца +10 — бардак
	function formatDateTime(iso) {
		var d = new Date(iso);
		d.setTime(d.getTime() + TZ_OFFSET_HOURS * 60 * 60 * 1000);
		
		var monthName = months_ru[d.getUTCMonth()];
		var day = d.getUTCDate();
		var year = d.getUTCFullYear();
		var hours = ("0" + d.getUTCHours()).slice(-2); // ведущий ноль, чтоб было 05:07, а не 5:7
		var minutes = ("0" + d.getUTCMinutes()).slice(-2);
		
		return hours + ":" + minutes + " (" + TZ_LABEL + "), " + monthName + " " + day + ", " + year;
	}
	
	
	function fetchBlockData() {
		// тянем данные о блокировках этого юзера
		api.get({
			action: 'query',
			list: 'blocks',
			bkusers: user,
			bkprop: "restrictions|by|expiry|id|reason|timestamp|user|userid|flags|byid",
		}).then(function(d) {
			data = d.query.blocks;
			
			// не заблокирован — тихо уходим, плашка не нужна
			if (data === undefined || data.length < 1) { 
				return;
			}
			
			blockr = data[0].reason;
			blockID = data[0].id;
			blockperformer = data[0].by;
			blockperformer_url = blockperformer.replace(/ /g, "_");
			blocktime = data[0].timestamp;
			expire = data[0].expiry;
			// partial !== undefined → значит частичная блокировка, иначе полная
			block_type = data[0].partial !== undefined ? msg("block-type-partial") : msg("block-type-sitewide");
			
			if (block_type === msg("block-type-partial")) {
				partial_block_pages = [];
				if (data[0].restrictions.pages !== undefined) {
					for (var i in data[0].restrictions.pages) {
						partial_block_pages.push(data[0].restrictions.pages[i]["title"]);
					}
				}
				else {
					partial_block_pages = msg("na");
				}
				partial_block_features = data[0].restrictions.actions;
				partial_block_namespaces = data[0].restrictions.namespaces;

				// а вот тут отдельный запрос за названиями пространств имён,
				// потому что в blocks приходят только их ID. ID — не то, что показывать юзеру
				if (partial_block_namespaces !== undefined) {
					api.get({
						action: 'query',
						meta: 'siteinfo',
						siprop: 'namespaces',
					}).then(function(data_namespaces) {
						data_namespaces = data_namespaces.query.namespaces;
						
						// сопоставляем ID → имя
						for (var id in partial_block_namespaces) {
							for (var i in data_namespaces) {
								if (partial_block_namespaces[id] === data_namespaces[i]["id"]) {
									partial_block_namespaces_titles.push(data_namespaces[i]["canonical"]);
									break;
								}
							}
						}
					});
				}
				else {
					partial_block_namespaces_titles = msg("na");
				}
			}
			
			// защита от повторного запуска — а то Fandom любит дважды дёрнуть
			if (window.BlockSummary || !user)
				return;
			window.BlockSummary = true;
			
			
			//----------- | Основная функция отчёта | -----------//
			function main(user, blockreason, blockID, blockperformer, blockperformer_url, blocktime, blockexpire, block_type, partial_block_pages, partial_block_features, partial_block_namespaces_titles) {			
				
				// парсим причину блокировки, чтоб викитекст стал HTML
				api.parse(blockreason).done(function(parsedBlockReason) {
					
					//----------- | Время начала и окончания (МСК) | -----------//
					blockStartDateTime = formatDateTime(blocktime);
					
					// infinity — значит бессрочно, форматировать нечего
					if (blockexpire == "infinity") {
						blockEndDateTime = msg("block-expiry-infinity");
					}
					else {
						blockEndDateTime = formatDateTime(blockexpire);
					}
					
					
					//----------- | Собираем HTML-плашку | -----------//
					var Box = document.createElement("div");
					Box.style.marginTop = "1em";
					Box.style.marginBottom = "1em";
					Box.style.marginLeft = "auto";   // центрируем по горизонтали
					Box.style.marginRight = "auto";
					Box.style.padding = "1em";
					Box.style.width = "50%";         // половина ширины контента, чтоб не растягивалась на весь экран
					Box.style.boxSizing = "border-box"; // padding не вылезает за 50%
					
					// классы от Fandom — дают жёлтенькую рамку-предупреждение
					Box.classList.add("warningbox");
					Box.classList.add("mw-warning-with-logexcerpt");
					Box.classList.add("mw-content-ltr");
					
					var textParagraph = document.createElement("p");

					// если блокировка частичная — дописываем детали: что, где, в каких пространствах
					if (block_type === msg("block-type-partial")) {
						var partial_block_details = "<br/>   <b><i>" + msg("blocked-features") + " </b></i>" + partial_block_features + "<br/>   <b><i>" + msg("blocked-pages") + " </b></i>" + partial_block_pages + "<br/>   <b><i>" + msg("blocked-namespaces") + " </b></i>" + partial_block_namespaces_titles;
					}
					else {
						var partial_block_details = "";
					}
					
					// заголовок. имя участника кликабельно, "на этой вики" — чтоб не тащить сюда URL-простыню
					var headerLine = 'Участник <a href="' + wiki_url + '/wiki/User:' + url_user + '">' + user + '</a> заблокирован на этой вики.';
					
					// вся разметка одной строкой. да, страшно, но так задумано автором.
					textParagraph.innerHTML = "<center><div style=\"font-size: 15pt; line-height: 1em\">" + headerLine + "</div></center><hr style=\"border: 1px solid rgb(var(--theme-alert-color--rgb)); background-color: rgb(var(--theme-alert-color--rgb));\"><span style=\"position: relative; float: right; border: 1.5px dotted; padding: 0 0.25em 0 0.25em\"><a href=\"" + wiki_url + "/wiki/Special:Log?type=block&page=User:" + url_user + "\">" + msg("block-log") + "</a></span><div style =\"font-size: 15pt; text-decoration: underline;\">" + msg("block-information") + "</div><b><i>" + msg("username") + " </i></b>" + user + "<br/><b><i>" + msg("block-id") + " </b></i>" + blockID + "<br/><b><i>" + msg("block-performer") + " </b></i><a href=\"" + wiki_url + "/wiki/User:" + blockperformer_url + "\">" + blockperformer + "</a><br/><b><i>" + msg("block-type") + " </b></i>" + block_type + partial_block_details + "<br/><b><i>" + msg("block-start") + " </b></i>" + blockStartDateTime + "<br/><b><i>" + msg("block-expiry") + " </b></i>" + blockEndDateTime + "<br/><b><i>" + msg("block-reason") + " </b></i><blockquote style=\"border-left: 5px solid rgba(var(--theme-alert-color--rgb), 0.5); padding-left: 0.5em;\">" + parsedBlockReason + "</blockquote>";
					
					Box.appendChild(textParagraph);
					
					// Fandom грузит контент асинхронно, поэтому #content может появиться не сразу.
					// долбим каждую секунду, пока не найдём — потом снимаем таймер
					var interval = setInterval(function() {
						if ($('.ns-2 #content').length) {
							clearInterval(interval);
							$(".ns-2 #content").eq(0).before(Box); // вставляем плашку перед контентом
						}
					}, 1000);	
				});
			}
			main(user, blockr, blockID, blockperformer, blockperformer_url, blocktime, expire, block_type, partial_block_pages, partial_block_features, partial_block_namespaces_titles);
		});
	}
});