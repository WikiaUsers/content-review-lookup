/* == Шапка вики == */
/* === Логотип === */
mw.loader.using(['mediawiki.api']).then(function () {
	var link = document.querySelector('.fandom-community-header__image');
	var img = link && link.querySelector('img');
	if (!img || !window.fetch || !window.URL || window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
		return;
	}
	var still = img.getAttribute('src');
	var current = null;
	function playOnce(bytes) {
		var tag = 'NETSCAPE2.0';
		for (var i = 0; i < bytes.length - 19; i++) {
			if (bytes[i] === 0x21 && bytes[i + 1] === 0xFF && bytes[i + 2] === 0x0B) {
				var name = String.fromCharCode.apply(null, bytes.subarray(i + 3, i + 14));
				if (name === tag) {
					var out = new Uint8Array(bytes.length - 19);
					out.set(bytes.subarray(0, i), 0);
					out.set(bytes.subarray(i + 19), i);
					return out;
				}
			}
		}
		return bytes;
	}

	new mw.Api().get({
		action:'query',
		titles:'Файл:Site-logo.gif',
		prop:'imageinfo',
		iiprop:'url',
		formatversion:2
	}).then(function (data) {
		var page = data.query.pages[0];
		if (!page.imageinfo) {
			return null;
		}
		return fetch(page.imageinfo[0].url + '&format=original', {headers:{Accept:'image/gif'}});
	}).then(function (response) {
		return response && response.ok ? response.arrayBuffer() : null;
	}).then(function (buffer) {
		if (!buffer) {
			return;
		}
		var blob = new Blob([playOnce(new Uint8Array(buffer))], {type:'image/gif'});
		link.addEventListener('mouseenter', function () {
			img.style.width = img.offsetWidth + 'px';
			img.style.height = img.offsetHeight + 'px';
			img.style.objectFit = 'contain';
			if (current) {
				URL.revokeObjectURL(current);
			}
			current = URL.createObjectURL(blob);
			img.src = current;
		});
		link.addEventListener('mouseleave', function () {
			img.src = still;
			img.style.width = '';
			img.style.height = '';
			img.style.objectFit = '';
			if (current) {
				URL.revokeObjectURL(current);
				current = null;
			}
		});
	});
});

/* == Заглавная страница == */
/* === Кнопка закрытия окон === */
mw.hook('wikipage.content').add(function ($content) {
	var bars = $content[0].querySelectorAll('.hp-main .hp-window__bar, .hp-main .hp-title__bar');
	var windows = [];
	var finaleTimer = null;
	var locked = false;
	var still = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
	function hideContent(item) {
		[].forEach.call(item.win.children, function (child) {
			if (child !== item.bar && !child.classList.contains('hp-ticker')) {
				child.style.display = 'none';
			}
		});
		item.message = document.createElement('div');
		item.message.className = 'hp-window__message';
		item.message.setAttribute('role', 'status');
		item.message.textContent = 'Действия на терминале регистрируются.';
		item.win.appendChild(item.message);
	}

	function restoreContent(item) {
		item.win.removeChild(item.message);
		item.message = null;
		[].forEach.call(item.win.children, function (child) {
			child.style.display = '';
		});
	}

	function fold(el, from, to, done) {
		if (still) {
			done();
			return;
		}
		el.animate([{transform:'scaleY(' + from + ')'}, {transform:'scaleY(' + to + ')'}], {duration:220, easing:'ease-in-out'}).finished.then(done);
	}

	function finale() {
		locked = true;
		windows.forEach(function (item) {
			item.button.classList.add('hp-close--spent');
			item.button.setAttribute('aria-disabled', 'true');
			if (!item.message) {
				return;
			}
			fold(item.win, 1, 0.02, function () {
				restoreContent(item);
				fold(item.win, 0.02, 1, function () {});
			});
		});
	}

	[].forEach.call(bars, function (bar) {
		if (bar.querySelector('.hp-close')) {
			return;
		}
		var item = {win:bar.parentNode, bar:bar, button:document.createElement('button'), message:null, clicks:0};
		item.button.type = 'button';
		item.button.className = 'hp-close';
		item.button.setAttribute('aria-label', 'Закрыть окно');
		item.button.textContent = '×';
		item.button.addEventListener('click', function () {
			if (locked || item.clicks >= 4) {
				return;
			}
			item.clicks += 1;
			if (item.clicks === 2) {
				hideContent(item);
			} else if (item.clicks === 4) {
				item.message.textContent = 'Эфир временно прерван.\nПожалуйста, подождите.';
				item.button.classList.add('hp-close--spent');
				item.button.setAttribute('aria-disabled', 'true');
				if (!finaleTimer) {
					finaleTimer = setTimeout(finale, 3000);
				}
			}
		});
		bar.appendChild(item.button);
		windows.push(item);
	});
});