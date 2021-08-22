/**
 * Improved re-invented wheel that colors header in mobile browsers and Safari 15
 * @docs [[BrowserHeaderColor]]
 * @author Kofirs2634
 */
$(function() {
 	if (!['fandomdesktop', 'fandommobile'].includes(mw.config.get('skin'))) return
	
	if (window.BrowserHeaderColor) return
	window.BrowserHeaderColor = true

	if ($('meta[name="theme-color"]').length) return

	function getVar(name) {
		return getComputedStyle(document.body).getPropertyValue(name)
	}
	var colors, modal
	var modalObj
	
	if (mw.config.get('skin') == 'fandommobile')
		return $('head').append($('<meta>', {
			name: 'theme-color',
			content: getVar('--fandom-global-nav-background-color')
		}))

	function appendTag() {
		$('head').append($('<meta>', { name: 'theme-color' }))
		setInterval(function() {
			colors = {
				body: getVar('--theme-body-background-color'),
				menu: getVar('--theme-sticky-nav-background-color'),
				accent: getVar('--theme-accent-color'),
				page: getVar('--theme-page-background-color')
			}
			$('meta[name="theme-color"]').attr('content', colors[localStorage.getItem('bhc-color')] || colors.body)
		}, 1000)
	}

	function initModal() {
		modalObj = new modal.Modal({
			title: 'Настройка цвета',
			content: '<div id="bhc-modal-wrp"></div>',
			size: 'medium',
			id: 'bhc-modal',
			closeTitle: 'Закрыть',
			buttons: [
				{ text: 'Готово', primary: true, id: 'bhc-done', event: 'done' },
				{ text: 'Сбросить', id: 'bhc-reset', event: 'reset' }
			],
			events: {
				done: function() {
					localStorage.setItem('bhc-color', $('#bhc-color-pick .oo-ui-buttonElement-active').attr('id').match(/[a-z]+$/)[0])
					this.close()
				},
				reset: function() {
					localStorage.setItem('bhc-color', 'body')
					this.close()
				}
			}
		})
		modalObj.create()
	}

	function buildModal() {
		$('#bhc-modal-wrp').empty()
		var items = []
		const d = {
			body: { label: 'Фон вики' , desc: 'Цвет фона вики, в который плавно переходит фоновое изображение' },
			menu: { label: 'Меню' , desc: 'Цвет меню навигации, появляющегося при прокручивании страницы' },
			accent: { label: 'Акцент' , desc: 'Акцентный цвет википроекта, в оформлении использующийся практически везде' },
			page: { label: 'Фон страницы' , desc: 'Цвет самого тела статьи' },
		}
		for (var color in colors) {
			var button = new OO.ui.ButtonOptionWidget({
				label: d[color].label,
				title: d[color].desc,
				id: 'bhc-button-' + color
			})
			if (localStorage.getItem('bhc-color') == color) button.setSelected(true)
			items.push(button)
		}
		$('#bhc-modal-wrp').append(new OO.ui.ButtonSelectWidget({ id: 'bhc-color-pick', items: items }).$element)
	}

	mw.loader.using('oojs-ui', function() {
		mw.hook('dev.modal').add(function(m) {
			modal = m; appendTag(); initModal()
	
			$('.page-side-tools').append($('<button>', {
				class: 'page-side-tool',
				id: 'bhc-config',
				title: 'Выбрать цвет шапки браузера'
			}).append(new OO.ui.IconWidget({ icon: 'browser' }).$element))
			$('#bhc-config').click(function() { buildModal(); modalObj.show() })
	
			if (!localStorage.getItem('bhc-color')) localStorage.setItem('bhc-color', 'body')
		})
	
		importArticle({ type: 'script', article: 'u:dev:MediaWiki:Modal.js' })
		importArticle({ type: 'style', article: 'u:ru.koffee:MediaWiki:BrowserHeaderColor.css' })
	})
});