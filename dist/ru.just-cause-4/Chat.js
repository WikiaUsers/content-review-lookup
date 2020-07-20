//Автор: GoodLuck

;(function(window, mediaWiki) {
	var document = window.document,
		data = {
			animations: []
		};

	function $(selector, find) {
		if (!selector) {
			return [];
		}
		if (selector.nodeType && selector.nodeName && find && typeof find == 'string') {
			return Array.prototype.slice.call(selector.querySelectorAll(find));
		} else if (selector.nodeType && selector.nodeName) {
			return [selector];
		}
		if (selector.match(/^#(?:[^\d\.\+\>\=\]\[\+\~\{\}])?(\w|[-_])+$/)) {
			selector = document.getElementById(selector.replace('#', ''));
			return [selector][0] && [selector] || [];
		} else if (selector.match(/^(?:[^\d\.\+\>\=\]\[\+\~\{\}])?([a-zA-Z]|[-_])+$/i)) {
			selector = document.getElementsByTagName(selector);
			return selector.length >= 1 && Array.prototype.slice.call(selector) || [];
		} else if (selector.match(/^\.(?:[^\d\.\+\>\=\]\[\+\~\{\}])?(\w|[-_])+$/)) {
			selector = document.getElementsByClassName(selector.replace('.', ''));
			return selector.length >= 1 && Array.prototype.slice.call(selector) || [];
		} else {
			selector = document.querySelectorAll(selector);
			return selector.length >= 1 && Array.prototype.slice.call(selector) || [];
		}
	}

	function serializeString() {
		var serialize = function() {
				var x = !x,
					string = '';
				for (var key in arguments[0]) {
					if (x) {
						string += '?' + key + '=' + arguments[0][key];
						x = !x;
						continue;
					}
					string += '&' + key + '=' + arguments[0][key];
				}
				return string;
			},
			string = '';
		if (!arguments[0] && !arguments[1]) {
			return window.decodeURIComponent(window.location.pathname);
		}
		if (!arguments[0] && arguments[1]) {
			return window.decodeURIComponent(window.location.pathname) + serialize(arguments[1]);
		}
		if (arguments[0] && !arguments[1]) {
			if (typeof arguments[0] == 'object') {
				return serialize(arguments[0]);
			}
			return arguments[0];
		}
		if (typeof arguments[0] == 'string' && typeof arguments[1] == 'object') {
			return arguments[0] + serialize(arguments[1]);
		}
	}

	function $ajax() {
		var xhr = new XMLHttpRequest(),
			options = (typeof arguments[0] == 'object' && arguments[0] !== null) && arguments[0] || {},
			query = serializeString(options.url || '', options.params),
			async = options.async === undefined ? true : options.async,
			type = options.type || 'GET',
			selector = options.selector || null,
			insert = $(options.insertTo || null),
			callback = typeof options.callback == 'function' && options.callback || !options.callback && typeof arguments[1] == 'function' && arguments[1] || function() {},
			extended = options.extended || {};
		xhr.timeout = options.timeout || 0;
		xhr.onload = function() {
			var responseText = xhr.responseText,
				status = xhr.status,
				html = [],
				container,
				_JSON = !!_JSON,
				called,
				i;
			try {
				_JSON = !_JSON;
				responseText = JSON.parse(responseText);
			} catch (e) {
				_JSON = !_JSON;
			}
			if (selector && Array.isArray(insert) && !_JSON) {
				container = document.createElement('div');
				container.innerHTML = responseText;
				html = $(container, selector);
				!insert[0] && callback.call(window, xhr, responseText, html);
				container = null;
				if (insert.length >= 1) {
					for (i = 0; i < insert.length; i++) {
						insert[i].innerHTML = html[0] && html[0].innerHTML;
						callback.call(insert[i], xhr, responseText, html[0] && html[0].innerHTML);
					}
				}
				called = !called;
			}!called && callback.call(window, xhr, responseText, null);
		};
		xhr.onerror = function() {
			callback.call(window, xhr, xhr.responseText, null);
		};
		xhr.onloadend = extended.onloadend == 'function' && extended.onloadend;
		xhr.open(type, query, async);
		xhr.send();
		return xhr;
	}

	function $extend(target) {
		if (!target) {
			return {};
		}
		var extend = (function() {
			var x = [];
			for (var i = 1; i < arguments[0].length; i++) {
				if (!arguments[0][i] || typeof arguments[0][i] == 'boolean') {
					continue;
				}
				x.push(arguments[0][i]);
			}
			return x;
		})(arguments);
		if (target instanceof Function || target instanceof Object && !(target instanceof Array)) {
			for (var i = 0; i < extend.length; i++) {
				if (extend[i] instanceof Function && extend[i].name) {
					target[extend[i].name] = extend[i];
					continue;
				}
				if (extend[i] instanceof Array) {
					continue;
				}
				for (var key in extend[i]) {
					target[key] = extend[i][key];
				}
			}
		}
		return target;
	}

	function $toggle() {
		var fns = [],
			target = arguments[0],
			fn = 0;
		for (var i = 1; i < arguments.length; i++) {
			if (typeof arguments[i] == 'function') {
				fns.push(arguments[i]);
			}
		}!$isEmptyArray(fns) && fns.length != 1 && target.addEventListener('click', function() {
			fns[fn].apply(this, arguments);
			fn++;
			fn = fn > fns.length - 1 ? 0 : fn;
		});
	}

	function $trigger(target, type) {
		var event = new CustomEvent(type);
		target.dispatchEvent(event);
	}

	function $next(element) {
		var next = element.nextSibling;
		if (!next) {
			return null;
		}
		if (next.nodeType != 1) {
			while (true) {
				next = next.nextSibling;
				if (!next || next.nodeType == 1) {
					break;
				}
			}
		}
		return next;
	}

	function $prev(element) {
		var prev = element.previousSibling;
		if (!prev) {
			return null;
		}
		if (prev.nodeType != 1) {
			while (true) {
				prev = prev.previousSibling;
				if (!prev || prev.nodeType == 1) {
					break;
				}
			}
		}
		return prev;
	}

	function $fadeOut(target, time, reject) {
		if (reject) {
			return false;
		}
		if (!target.nodeType || !target.nodeName || window.getComputedStyle(target, null).display == 'none' || !!(~data.animations.indexOf(target))) {
			if (!!(~data.animations.indexOf(target))) {
				var interval = window.setInterval(function() {
					if (!(~data.animations.indexOf(target))) {
						$fadeOut(target, time, true);
						window.clearInterval(interval);
					}
				}, 34);
			}
			return;
		}
		time = time && typeof time == 'number' && time > 0 && time != Infinity ? time : typeof time !== 'string' ? 1000 : !window.isNaN(time) ? +time : 1000;
		data.animations.push(target);
		target.style.animation = 'fadeOut ' + (time / 1000) + 's ' + 'linear 0s forwards';
		window.setTimeout(function() {
			target.style.animation = null;
			target.style.display = 'none';
			data.animations.splice(data.animations.indexOf(target));
		}, time);
	}

	function $fadeIn(target, time, display, reject) {
		if (reject) {
			return false;
		}
		if (!target.nodeType || !target.nodeName || window.getComputedStyle(target, null).display != 'none' || !!(~data.animations.indexOf(target))) {
			if (!!(~data.animations.indexOf(target))) {
				var interval = window.setInterval(function() {
					if (!(~data.animations.indexOf(target))) {
						$fadeIn(target, time, display, true);
						window.clearInterval(interval);
					}
				}, 34);
			}
			return;
		}
		data.animations.push(target);
		target.style.animation = 'fadeIn ' + (time / 1000) + 's ' + 'linear 0s';
		target.style.display = display && typeof display == 'string' && display || 'block';
		window.setTimeout(function() {
			target.style.animation = null;
			data.animations.splice(data.animations.indexOf(target));
		}, time);
	}

	function $closest(element, target) {
		while (element) {
			if (element.webkitMatchesSelector && element.webkitMatchesSelector(target) || element.matches && element.matches(target) && element != element) {
				return element;
			} else {
				element = element.parentElement;
			}
		}
		return null;
	}

	function $remove(target) {
		var parent;
		if (target.nodeType || target.nodeName) {
			if (target.remove) {
				target.remove();
			} else {
				parent = target.parentNode;
				parent && parent.removeChild(target);
			}
			return;
		}
		target = $(target)[0];
		parent = target.parentElement;
		parent.removeChild(target);
	}

	function $isEmptyArray(array) {
		for (var i = 0; i < array.length; i++) {
			return false;
		}
		return true;
	}

	function $isEmptyObject(object) {
		if (object instanceof Array) {
			return $isEmptyArray(object);
		}
		for (var key in object) {
			return false;
		}
		return true;
	}
	//Последнее обновление функций от 16/12/2016; Last fn. update 15/12/2016;
	function just_cause_4() {
		this.init = function() {
			this.loaded = {};
			this.auto();
			this.tags();
			this.smiles();
		};
	}
	just_cause_4.prototype = {
		fn: {
			$ajax: $ajax,
			$: $,
			$toggle: $toggle,
			serializeString: serializeString,
			$prev: $prev,
			$next: $next,
			$fadeOut: $fadeOut,
			$fadeIn: $fadeIn,
			$trigger: $trigger,
			$remove: $remove,
			$isEmptyArray: $isEmptyArray,
			$isEmptyObject: $isEmptyObject,
			$extend: $extend,
			$closest: $closest
		},
		modalWindow: function(content, append, callback) {
			if (typeof arguments[0] == 'string') {
				switch (arguments[0].toLowerCase()) {
					case 'delete':
					case 'close':
					case 'remove':
						{
							$('.modalWindowWrapper').forEach(function() {
								$remove(arguments[0]);
							});
						}
						break;
					case 'hide':
						{
							$('.modalWindowWrapper').forEach(function() {
								arguments[0].style.display = 'none';
							});
						}
						break;
					default:
						{
							alert('Неверное значение:' + arguments[0]);
						}
				}
				return;
			}
			append = append || false;
			content = content || {};
			var _ = this,
				actions = function(event) {
					var target = event.target;
					if (target.getAttribute('data-modal') == 'close' || target.getAttribute('data-modal') == 'wrapper') {
						event.preventDefault();
						_.modalWindow('close');
					}
				},
				html = '<div data-modal="wrapper" ' + (content.id && 'id="' + content.id + '"') + ' class="modalWindowWrapper"><div class="modalWindow"><header><a data-modal="close" class="closeModalWindow"></a><h3>' + (content.title || '') + '</h3></header><section class="WikiaArticle">' + (content.section || '') + '</section><footer>' + (content.footer || '') + '</footer></div></div>';
			document.body.insertAdjacentHTML('beforeend', html);
			this.loaded.modalWindow = {
				active: true
			};
			if (!content.footer) {
				$('.modalWindow > footer').forEach(function() {
					$remove(arguments[0]);
				});
			}
			$('.modalWindowWrapper')[0].addEventListener('click', function() {
				actions.apply(this, arguments);
			});
			if (append) {
				$('.modalWindowWrapper')[0].style.display = 'flex';
			}
			if (callback && typeof callback == 'function') {
				callback();
			}
			if (!this.loaded.modalWindow.loaded) {
				this.loaded.modalWindow.loaded = true;
			}
		},
		globalHandler: function(event, target) {
			if (event.type == 'click') {
				var action = target.getAttribute('data-action');
				switch (action) {
					case 'reload':
						{
							window.location.reload();
						}
						break;
					case 'ajax_blocks':
						{
							this.ajaxBlocks();
						}
						break;
					case 'ignore':
						{
							this.ignore();
						}
						break;
					case 'tags':
						{
							this.tags_i();
						}
				}
			}
			if (event.type == 'keydown') {
				if (target.nodeName == 'TEXTAREA' && event.which == 13 && target.getAttribute('name') == 'message' && (target.value.match(/^\s*$/g) || target.value.match(/^\n*$/) || target.value.match(/(&nbsp(;)?){1,}/g))) {
					target.value = null;
					event.preventDefault();
					return;
				}
				this.filter(event, target);
			}
		},
		auto: function() {
			var _ = this;
			$('#ChatHeader .wordmark img')[0].setAttribute('src', 'https://vignette.wikia.nocookie.net/just-cause-4/images/d/d7/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D1%87%D0%B0%D1%82%D0%B0.png/revision/latest/scale-to-width-down/212?cb=20190212080013&path-prefix=ru');
			$('#ChatHeader h1.wordmark')[0].insertAdjacentHTML('beforeend', '<div id="chat-head" class="chat-head">Добро пожаловать на «Just Cause 4 вики» чат!</br><a href="/FAQ/Словарь" target="_blank">Словарь</a> — <a href="/wiki/Just Cause 4 вики:Чат" target="_blank">О чате</a></div>');
			$('#WikiaPage')[0].insertAdjacentHTML('beforeend', '<div id="chat-actions-wrapper" class="chat-actions-wrapper fa fa-chevron-up"><div id="chat-actions" class="chat-actions"><ul><li data-action="ignore">Игнорировать</li><li data-action="reload">Обновить</li><li data-action="tags">Теги</li><li data-action="ajax_blocks">Блокировки</li></ul></div></div>');
			$('.Write .message')[0].insertAdjacentHTML('afterbegin', '<div class="smilesWrapper" id="smilesWrapper"><div class="smiles" id="smiles"></div><div class="smiles-list-wrapper" id="smiles-list-wrapper" style="display: none;"><div class="smiles-list" id="smiles-list"></div></div></div>');
			$ajax({
				url: '/index.php',
				params: {
					title: 'MediaWiki:Emoticons',
					action: 'render'
				},
				selector: 'div',
				callback: function(xhr, html, elements) {
					elements[0] && elements.forEach(function(element) {
						element.removeAttribute('style');
						$('#smiles-list')[0].insertAdjacentHTML('beforeend', element.outerHTML);
					});
				}
			});
			document.body.addEventListener('click', function(event) {
				_.globalHandler.call(_, event, event.target);
			});
			data.filter_regExp = /([^А-Яа-яA-Za-z0-9]|^)(((н|h)(а|a|и|е|e)|(п|n|д)(о|o|0))?(х|x)(у|y)(й(ня)?|я|(c|с)?(е|e|ё)|(л|в|b|6)?(о|o|0)?)|п(и|е)(з|3)(д|d)((р|p)и(л|шь?)|юк)?((а|a|e|е|y|у|и)((б|b|6)(о|o|0)л(и(з|с|c|3))?)?|(е|e)ц?)|((н|h)(а|a)|п(р|p)(о|o|0))?(c|с)(р|p)((а|a)(л(а|a|и)?|ть|(h|н)(h|н)?((а|a)я|ый|(о|o|0)(е|e)|ы(е|e)))|у|(е|e|ё)м)|(б|b)ля((д|(т|t))(ь|b)|я{1,})?|(С|C|с|с)д(о|0|o)(х|x)(н|h)и(т(е|e))?|(д(о|o)(л(б|b|6)(о|o))?)?((е|e)|ё)(б|b|6)((а|a)(л((о|o|0)|(ь|b)(н|h)и(к|k))|(т|t)(ь|b)((с|c)я)?)?)?|у?(ё|(е|e))(б|b|6)((a|а)(h|н)|ищ)?((о|o|0)(к|k)|(к|k)и|(а|a)|(е|e)|ы|у|(а|a)(т|t)(ь|b)|ыч(ь|b)?)|(д|d)(и|(е|e))(б|b|6)ил((а|a)|у|(о|o|0)(м|m))?|п(а|a)дл((а|a)|у|(е|e)|(о|o|0)й?)|((а|a)|(о|o|0))(х|x)(у|y)(е|e)((н|h)(н|h)?(о|o|0))|п(и|(е|e))д((а|a)|(о|o|0)|и)(р|p)(((а|a)(с|з))?|(т|t)(ь|b)|ли|(с|c)(о|o|0)(с|c)ы?)|((н|h)((а|a)|и|(е|e))|п(о|o|0))?(х|x)(е|e)(р|p)((н|h)(я|ю|(е|ё|e)й)|(ь|b))?|шлю(х|ш(к|k))((а|a)|(е|e)|(о|o|0)й|(у|y))|м(у|y)д((а|a)(к|k)((а|a)|и|(у|y)|(о|o|0)м)?|ил((а|a)|ы))|(е|e|ё)п(т|t)(а|a)?|((м|m)(а|a)з(а|a))?ф(а|a)(к|k)(а|a)?|(б|b)(и|i)(т|t)(ч|ch)|((к|k)(у|y)(р|p)(в)(а|a|ы))){1,}([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]{1,})?(?!\S)/gi;
			document.body.addEventListener('keydown', function(event) {
				_.globalHandler.call(_, event, event.target);
			});
			document.head.appendChild(document.createElement('style'));
			var ignored = JSON.parse(window.localStorage.getItem('warframe-wiki-chat')) || [],
				css = document.styleSheets[document.styleSheets.length - 1];
			for (var i = 0; i < ignored.length; i++) {
				css.insertRule('#Chat_' + window.mainRoom.roomId + ' li[data-user="' + ignored[i] + '"] { display: none !important; opacity: 0 !important; visibility: hidden !important; }', css.cssRules.length);
			}
		},
		filter: function(event, target) {
			if (target.nodeName == 'TEXTAREA' && event.which == 13 && target.getAttribute('name') == 'message') {
				if (target.value.match(data.filter_regExp)) {
					target.value = target.value.replace(data.filter_regExp, '[удалено]');
				}
				if (target.value.length > 10 && target.value.replace(/%..|[^А-ЯA-Z]/g, '').length / target.value.length > 0.35) {
					target.value = target.value.charAt(0).toUpperCase() + target.value.substr(1).toLowerCase();
				}
			}
		},
		ajaxBlocks: function() {
			var params = {
					url: '/index.php',
					params: {
						action: 'ajax',
						rs: 'ChatAjax',
						method: 'getPrivateBlocks'
					}
				},
				elements = {},
				change = {
					by: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.blockedByMeButton.classList.remove('selected');
						elements.blockedByList.innerHTML = null;
						elements.blockedByMeList.style.display = 'none';
						elements.blockedByList.style.display = 'block';
						elements.footerText.innerHTML = 'Список участников, заблокировавших ваши личные сообщения';
						$ajax(params, function(xhr, data) {
							for (var i = 0; i < data.blockedByChatUsers.length; i++) {
								elements.blockedByList.insertAdjacentHTML('beforeend', '<li><span data-name="' + data.blockedByChatUsers[i] + '">' + data.blockedByChatUsers[i] + '</span></li>');
							}
						});
					},
					me: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.blockedByButton.classList.remove('selected');
						elements.blockedByMeList.innerHTML = null;
						elements.blockedByList.style.display = 'none';
						elements.blockedByMeList.style.display = 'block';
						elements.footerText.innerHTML = 'Список участников, личные сообщения которых вы заблокировали';
						$ajax(params, function(xhr, data) {
							for (var i = 0; i < data.blockedChatUsers.length; i++) {
								elements.blockedByMeList.insertAdjacentHTML('beforeend', '<li><span data-name="' + data.blockedChatUsers[i] + '">' + data.blockedChatUsers[i] + '</span></li>');
							}
						});
					}
				};
			this.modalWindow({
				id: 'ajaxBlocksModal',
				title: 'Блокировки личных сообщений',
				section: '<ul data-section="blocked_by"></ul><ul data-section="blocked"></ul>',
				footer: '<span data-footer="text">Список участников, заблокировавших ваши личные сообщения</span><div data-footer="ajxbb-wrapper"><span class="fa fa-ban" data-footer="blocked"></span><span data-footer="blocked_by" class="selected fa fa-eye-slash"></span></div>'
			}, true, function() {
				$extend(elements, {
					blockedByButton: $('#ajaxBlocksModal span[data-footer="blocked_by"]')[0],
					blockedByMeButton: $('#ajaxBlocksModal span[data-footer="blocked"]')[0],
					footerText: $('#ajaxBlocksModal span[data-footer="text"]')[0],
					blockedByList: $('#ajaxBlocksModal ul[data-section="blocked_by"]')[0],
					blockedByMeList: $('#ajaxBlocksModal  ul[data-section="blocked"]')[0]
				});
				elements.blockedByButton.addEventListener('click', function(event) {
					change.by.call(this, event);
				});
				elements.blockedByMeButton.addEventListener('click', function(event) {
					change.me.call(this, event);
				});
				$ajax(params, function(xhr, data) {
					for (var i = 0; i < data.blockedByChatUsers.length; i++) {
						elements.blockedByList.insertAdjacentHTML('beforeend', '<li><span data-name="' + data.blockedByChatUsers[i] + '">' + data.blockedByChatUsers[i] + '</span></li>');
					}
				});
			});
		},
		tags_i: function() {
			var _ = this;
			if (this.loaded.tags_i) {
				this.modalWindow({
					id: 'ajaxTagsModal',
					title: 'Теги',
					section: _.loaded.tags_i
				}, true);
				return;
			}
			this.modalWindow({
				id: 'ajaxTagsModal',
				title: 'Теги',
				section: '<div id="ajax-onload" style="position: static;"><div><img src="https://vignette.wikia.nocookie.net/just-cause-4/images/6/62/%D0%98%D0%B4%D1%91%D1%82_%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0.gif/revision/latest?cb=20190212081151&path-prefix=ru"><br><span>Идёт загрузка...</span></div></div>'
			}, true, function() {
				$ajax({
					url: '/index.php',
					params: {
						title: 'Just_Cause_4_вики:Чат/Теги',
						action: 'render'
					},
					selector: '#ajax-load',
					callback: function(xhr, data, elements) {
						_.loaded.tags_i = elements[0].innerHTML;
						$fadeOut($('#ajax-onload')[0], 300);
						$remove($('#ajax-onload')[0]);
						$('#ajaxTagsModal section')[0].innerHTML = elements[0].innerHTML;
					}
				});
			});
		},
		ignore: function(call) {
			var css = document.styleSheets[document.styleSheets.length - 1],
				_ = this,
				item = 'just-cause-4-wiki-chat',
				ignored = JSON.parse(window.localStorage.getItem(item)) || [],
				elements = {},
				change = {
					joined: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.modalTitle.innerHTML = 'Список участников в чате';
						elements.insertName.disabled = true;
						elements.insertName.focus();
						elements.ignoredButton.classList.remove('selected');
						elements.joinedList.innerHTML = null;
						elements.ignoredList.style.display = 'none';
						var blocked = JSON.parse(window.localStorage.getItem(item)) || [],
							joined = $('#WikiChatList > li');
						for (var i = 0; i < joined.length; i++) {
							if (!(~blocked.indexOf(joined[i].getAttribute('data-user'))) && joined[i].getAttribute('data-user') != mediaWiki.userName) {
								elements.joinedList.insertAdjacentHTML('beforeend', '<li><span data-name="' + joined[i].getAttribute('data-user') + '">' + joined[i].getAttribute('data-user') + '</span><span class="fa fa-plus" data-action="add"></span></li>');
							}
						}
						elements.joinedList.style.display = 'block';
					},
					ignored: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.modalTitle.innerHTML = 'Список игнорируемых';
						elements.insertName.disabled = false;
						elements.insertName.focus();
						elements.joinedButton.classList.remove('selected');
						elements.ignoredList.innerHTML = null;
						elements.joinedList.style.display = 'none';
						for (var i = 0; i < ignored.length; i++) {
							elements.ignoredList.insertAdjacentHTML('beforeend', '<li><span data-name="' + ignored[i] + '">' + ignored[i] + '</span><span class="fa fa-times" data-action="remove"></span></li>');
						}
						elements.ignoredList.style.display = 'block';
					}
				};

			function addUser(name) {
				if (!!(~ignored.indexOf(name)) || name.match(/["'&\\@]+/g)) {
					return false;
				}
				ignored = ignored.concat(name);
				css.insertRule('#Chat_' + window.mainRoom.roomId + ' li[data-user="' + name + '"] { display: none !important; opacity: 0 !important; visibility: hidden !important; }', css.cssRules.length);
				this.value && elements.ignoredList.insertAdjacentHTML('beforeend', '<li><span data-name="' + name + '">' + name + '</span><span class="fa fa-times" data-action="remove"></span></li>');
				window.localStorage.setItem(item, JSON.stringify(ignored));
				this.value && (this.value = null);
				return true;
			}

			function removeUser(name) {
				if (!(~ignored.indexOf(name))) {
					return false;
				}
				for (var i = 0; i < css.cssRules.length; i++) {
					if (new RegExp('li\\[data\\-user=("|\')' + name + '("|\')]$').test(css.cssRules[i].selectorText)) {
						css.deleteRule(i);
						ignored.splice(ignored.indexOf(name), 1);
						window.localStorage.setItem(item, JSON.stringify(ignored));
						return true;
					}
				}
			}
			this.modalWindow({
				id: 'ignoreModal',
				title: 'Список игнорируемых',
				section: '<ul data-section="ignored"></ul><ul data-section="joined"></ul><input data-section="insert_name" type="text" placeholder="Игнорировать" />',
				footer: '<span data-footer="text">Нажмите <b>Enter</b> для добавления участника в список.</span><div data-footer="ign-wrapper"><span class="fa fa-users" data-footer="joined"></span><span data-footer="ignored" class="fa fa-list selected"></span></div>'
			}, true, function() {
				$extend(elements, {
					ignoredButton: $('#ignoreModal span[data-footer="ignored"]')[0],
					joinedButton: $('#ignoreModal span[data-footer="joined"]')[0],
					ignoredList: $('#ignoreModal ul[data-section="ignored"]')[0],
					joinedList: $('#ignoreModal ul[data-section="joined"]')[0],
					insertName: $('#ignoreModal input[data-section="insert_name"]')[0],
					modalTitle: $('#ignoreModal header > h3')[0]
				});
				elements.insertName.focus();
				for (var i = 0; i < ignored.length; i++) {
					elements.ignoredList.insertAdjacentHTML('beforeend', '<li><span data-name="' + ignored[i] + '">' + ignored[i] + '</span><span class="fa fa-times" data-action="remove"></span></li>');
				}
				elements.joinedButton.addEventListener('click', function(event) {
					change.joined.call(this, event);
				});
				elements.ignoredButton.addEventListener('click', function(event) {
					change.ignored.call(this, event);
				});
				elements.insertName.addEventListener('keyup', function(event) {
					if (event.which == 13 && this.value.length && this.value != mediaWiki.userName && !(~ignored.indexOf(this.value))) {
						addUser.call(this, this.value);
					}
				});
				elements.ignoredList.addEventListener('click', function(event) {
					if (event.target.getAttribute('data-action') == 'remove') {
						removeUser.call(this, $prev(event.target).getAttribute('data-name')) && $remove($closest(event.target, 'li'));
					}
				});
				elements.joinedList.addEventListener('click', function(event) {
					if (event.target.getAttribute('data-action') == 'add') {
						addUser.call(this, $prev(event.target).getAttribute('data-name')) && $remove($closest(event.target, 'li'));
					}
				});
			});
		},
		tags: function() {
			var replacement = {
					img: [/\[(img|image)\]\s*<.+">/, '<img class="chat-image" src="', /(\[\/(img|image)\]<\/a>|<\/a>\s*\[\/img\])/, '"></img>'],
					spoiler: [/\[spoiler\]/, '<hr /><button class="open-chat-spoiler" onclick="this.nextSibling.style.display = \'\';just-cause-4.fn.$remove(this);">Показать содержимое</button><div style="display: none;" class="chat-spoiler-content">', /\[\/spoiler\]/, '</div><hr />'],
					youtube: [/\[(yt|youtube)\].+\?v=/gi, '<iframe class="chat-videoYT" src="https://www.youtube.com/embed/', /((&|&amp;).+\[\/(yt|youtube)\]<\/a>|(&|&amp;).+<\/a>\s*\[\/(yt|youtube)\]|<\/a>\s*\[\/(yt|youtube)\]|\[\/(yt|youtube)\]<\/a>)/gi, '" frameborder="0" allowfullscreen>Отсутствует поддержка iframe</iframe>'],
					soundcloud: [/\[(soundcloud|sc)\]\s*?(&lt;|<).+"<a\s*?href="/gi, '<iframe class="chat-soundCloud" scrolling="no" frameborder="no" src="', /("\s*?(&gt;&lt;="").+\[\/(sc|soundcloud)\]<\/a>|"\s*&gt;&lt;.+<\/a>\s*?\[\/(sc|soundcloud)\])/gi, '">Отсутствует поддержка video</iframe>'],
					b: [/\[(b|bold|big)\]/gi, '<span style="font-weight: 700;">', /\[\/(b|bold|big)\]/gi, '</span>'],
					i: [/\[(i|italic)\]/gi, '<span style="font-style: italic;">', /\[\/(i|italic)\]/gi, '</span>'],
					s: [/\[(s|strike)\]/gi, '<span style="text-decoration: line-through;">', /\[\/(s|strike)\]/gi, '</span>'],
					u: [/\[(u|underline)\]/gi, '<span style="text-decoration: underline;">', /\[\/(u|underline)\]/gi, '</span>']
				},
				room = $('#Chat_' + window.mainRoom.roomId)[0];

			function exec(content) {
				if (!content) {
					return '';
				}
				for (var key in replacement) {
					key == 'soundcloud' ? (content = content.replace('visual=true', 'visual=false').replace('auto_play=true', 'auto_play=false')) : false;
					content = content.replace(replacement[key][0], replacement[key][1]).replace(replacement[key][2], replacement[key][3]);
				}
				return content;
			}
			room.addEventListener('click', function fn(event) {
				if (event.target.className == 'chat-image' && (event.target.offsetWidth > 175 && event.target.offsetHeight > 175)) {
					window.open(event.target.getAttribute('src'));
				}
			});
			$(room, 'ul > li[data-user] > span.message').forEach(function(target) {
				target.innerHTML = exec(target.innerHTML);
			});
			var msgHtml;
			window.mainRoom.model.chats.bind('afteradd', function() {
				msgHtml = $(room, 'ul > li[data-user]:last-child > span.message')[0];
				msgHtml && (msgHtml.innerHTML = exec(msgHtml.innerHTML || ''));
			});
		},
		smiles: function() {
			var timeout = null;
			$('#smiles')[0] && $('#smiles')[0].addEventListener('mouseover', function(event) {
				var _this = this;
				timeout = window.setTimeout(function() {
					timeout = null;
					$fadeIn($next(_this), 300);
				}, 200);
			});
			$('#smiles-list')[0] && $('#smiles-list')[0].addEventListener('click', function(event) {
				var textarea = $('.Write [name="message"]')[0];
				if (event.target.nodeName == 'IMG') {
					if (!textarea.value) {
						textarea.value = textarea.value + $next(event.target).children[0].textContent.replace(/\n$/, '').replace(/^.{1}/, '');
					} else {
						textarea.value = textarea.value + $next(event.target).children[0].textContent.replace(/\n$/, '');
					}
				}
			});
			$('#smiles')[0] && $('#smiles')[0].addEventListener('mouseleave', function(event) {
				timeout && window.clearTimeout(timeout);
			});
			$('#smiles-list-wrapper')[0] && $('#smiles-list-wrapper')[0].addEventListener('mouseleave', function(event) {
				$fadeOut(this, 250);
			});
		},
		notificator: function() {
			var msgs = 0,
				onended = function() {
					$remove(this);
				};
			window.mainRoom.model.chats.bind('afteradd', function() {
				document.body.insertAdjacentHTML('beforeend', '<audio id="notification_' + (++msgs) + '" controls=""><source src="//images.wikia.com/warframe/ru/images/9/9d/Уведомление.ogg" type="audio/ogg; codecs=vorbis"></audio>');
				$('#notification_' + msgs)[0].onended = onended;
				$('#notification_' + msgs)[0].play();
			});
		}
	};
	document.addEventListener('DOMContentLoaded', function(event) {
		window.warframe = new warframe();
		window.warframe.init();
	});
})(this, {
	userName: window.mediaWiki.config.get('wgUserName')
});

//