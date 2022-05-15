mw.loader.using('mediawiki.api', function() {
	// защита от двойной загрузки
	if (window.UserActivityFull) return
	window.UserActivityFull = true
	
	// глобальные переменные
	const PREFIX = 'kof-uaf__'
	const api = new mw.Api()
	const c = mw.config.get(['wgNamespaceNumber', 'wgTitle', 'wgScriptPath', 'wgSiteName', 'wgArticlePath'])
	
	// запрещаем работу скрипта не на служебной
	if (c.wgNamespaceNumber != -1 || !c.wgTitle.match(/^useractivityfull\/?/i)) return
	
	// нам нужен CSS
	importArticle({ type: 'style', article: 'u:ru.koffee:MediaWiki:UserActivityFull.css' })
	
	// начальная верстка страницы
	$('title').text('Полная активность пользователя | ' + c.wgSiteName + ' | Fandom')
	$('.page-header__title').text('Полная активность пользователя')
	$('#mw-content-text').empty()

	const target = c.wgTitle.match(/^useractivityfull\/([^\/?&]+)$/i)
	if (!target) { // если цели нет, создаем форму
		$('#mw-content-text').append($('<p>', {
			class: PREFIX + 'intro',
			text: 'Здесь можно просмотреть абсолютно всю социальную активность участника (посты, сообщения и комментарии), отсортированную в порядке от нового к старому.'
		}))
		.append($('<div>', { class: PREFIX + 'form' })
			.append($('<label>', { text: 'Имя пользователя:' }).append($('<input>', { type: 'text', id: PREFIX + 'form-user' })))
			.append($('<button>', { text: 'Отправить', id: PREFIX + 'form-submit' }).on('click', function() {
				const input = $('#' + PREFIX + 'form-user').val()
				if (!input) return

				window.location.href = c.wgArticlePath.replace('$1', 'Special:UserActivityFull/' + input)
			}))
		)
		return
	}
	// а если есть, то получаем айди
	getId(target[1])
	
	function getId(target) {
		// нам нужно получить айдишник по юзернейму
		api.get({
			action: 'query',
			list: 'users',
			ususers: target
		}).done(function(json) {
			// выписываем данные
			const id = json.query.users[0].missing == '' ? -1 : json.query.users[0].userid
			const name = json.query.users[0].name
			
			if (id == -1) {
				$('#mw-content-text').text('Участника ' + name + ' не существует')
				return
			}
	
			// переверстываем страницу
			$('.page-header__title').text('Полная активность ' + name)
			$('#mw-content-text').empty()
				.append($('<input>', { type: 'checkbox', class: PREFIX + 'filter', id: PREFIX + 'filter-posts', checked: true }))
				.append($('<input>', { type: 'checkbox', class: PREFIX + 'filter', id: PREFIX + 'filter-messages', checked: true }))
				.append($('<input>', { type: 'checkbox', class: PREFIX + 'filter', id: PREFIX + 'filter-comments', checked: true }))
				.append($('<div>', { class: PREFIX + 'filters' }))
				.append($('<div>', { class: PREFIX + 'list' }))
			$('.' + PREFIX + 'list')
				.append($('<div>', { class: PREFIX + 'loading', text: 'Посты:' }).append($('<span>', { id: PREFIX + 'loading-posts' })))
				.append($('<div>', { class: PREFIX + 'loading', text: 'Сообщения:' }).append($('<span>', { id: PREFIX + 'loading-messages' })))
				.append($('<div>', { class: PREFIX + 'loading', text: 'Комментарии:' }).append($('<span>', { id: PREFIX + 'loading-comments' })))
			
			$('.' + PREFIX + 'filters')
				.append($('<span>', { class: PREFIX + 'filters-label', text: 'Фильтры:' }))
				.append($('<label>', { class: PREFIX + 'filter-button', for: PREFIX + 'filter-posts', text: '📣' }))
				.append($('<span>', { class: PREFIX + 'counter', id: PREFIX + 'counter-posts' }))
				.append($('<label>', { class: PREFIX + 'filter-button', for: PREFIX + 'filter-messages', text: '✉️' }))
				.append($('<span>', { class: PREFIX + 'counter', id: PREFIX + 'counter-messages' }))
				.append($('<label>', { class: PREFIX + 'filter-button', for: PREFIX + 'filter-comments', text: '💬' }))
				.append($('<span>', { class: PREFIX + 'counter', id: PREFIX + 'counter-comments' }))
	
			// ждем поттягивания данных и потом рендеримся
			Promise.all([
				getData('posts', id, 0),
				getData('messages', id, 0),
				getData('comments', id, 0)
			]).then(render)
			.catch(function() {
				$('.' + PREFIX + 'list').text('Во время получения информации возникла ошибка!')
			})
		})
	}
	
	function getData(type, id, page, accum) {
		if (!accum) accum = []
		return new Promise(function(res, rej) {
			$('#' + PREFIX + 'loading-' + type).text('грузим ' + (page + 1) + '-ю страницу')
			$.ajax({
				method: 'get',
				url: c.wgScriptPath + '/wikia.php',
				data: {
					controller: 'Fandom\\UserProfileActivity\\UserProfileActivity',
					method: 'getData',
					type: type,
					userId: id,
					page: page,
					uselang: 'en'
				}
			}).done(function(html) {
				// обходим все записи и запоминаем их текст
				$(html).siblings('.Message').each(function(_, e) {
					accum.push({
						type: type,
						time: Date.parse($(e).find('.Message__timestamp').text().replace(/,/g, '') + ' UTC'),
						text: $(e).find('.Message__description').html().replace(/[\t\n]+/g, '')
					})
				})
				console.debug('[KOF-UAF] Getting', type, 'page', page)
				
				// если доступно больше записей, уходим в рекурсию
				if ($(html).siblings('.UserProfileActivity__loadMore').length)
					res(getData(type, id, page + 1, accum))
				else { // в противном случае резолвим функцию
					console.debug('[KOF-UAF] All', type, 'were retrieved!')
					$('#' + PREFIX + 'loading-' + type).text('все загружено!')
					res(accum)
				}
			}).fail(function(err) {
				console.error('[KOF-UAF] Page', page, 'of', type, 'loading failed:', err)
				$('#' + PREFIX + 'loading-' + type).text('ошибка загрузки ' + (page + 1) + '-й страницы!')
				rej(err)
			})
		})
	}
	
	function render(data) {
		// рендерим все, что набралось
		$('.' + PREFIX + 'list').empty()

		const union = []
		data.forEach(function(t, n) {
			t.forEach(function(e) { union.push(e) })
			$('.' + PREFIX + 'counter').eq(n).text('(' + t.length + ')')
		})
		if (!union.length) return $('.' + PREFIX + 'list').text('Ничего не найдено')
		union.sort(function(a, b) { return b.time - a.time })
		.forEach(function(entry) {
			$('.' + PREFIX + 'list').append($('<div>', {
				class: PREFIX + 'entry ' + entry.type,
				html: entry.text,
				'data-ts': entry.time
			}))
		})
	}
});