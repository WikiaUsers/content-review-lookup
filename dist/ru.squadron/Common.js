! function($, mw) {
	if (!$('#request-help').length) {
		return;
	}
	var rQ = {
		c: {
			p: mw.config.get('wgPageName'),
			n: mw.config.get('wgUserName'),
			t: mw.user.tokens.values.editToken
		},
		f: '<fieldset><div><span>Название вики:</span><input data-type="name" class="rQ_field" placeholder="Вики сообщества" type="text"></div>' + '<div><span>Ссылка на вики:</span><input data-type="url" class="rQ_field" placeholder="ru.community" type="text"></div><div><span>Причина:</span><input data-type="reason" class="rQ_field" placeholder="Вики требуется помощь в создании нового материала" type="text"></div><div class="rQ_types-text">Выберите, что конкретно требуется для проекта:</div><ul class="rQ_types"><li><label>Дизайн<input data-requesttype="design" type="checkbox"></label></li><li><label>Заглавная страница<input data-requesttype="mainpage" type="checkbox"></label></li><li><label>Шаблоны<input data-requesttype="templates" type="checkbox"></label></li></ul><div class="rQ_isAdmin"><input class="rQ_isAdmin_field" type="checkbox">Я являюсь администратором этого проекта.</div><div class="rQ_error"></div></fieldset>'
	};
	var preventClick;
	rQ.showModal = function() {
		$.showCustomModal('Заполните эту форму', rQ.f, {
			id: 'custom-modal-request',
			width: 600,
			buttons: [{
				message: 'Отправить',
				handler: function() {
					if (preventClick) {
						return;
					}
					var data_obj = {},
						rQ_error = $('#custom-modal-request .rQ_error');
					rQ_error.hide();
					$('#custom-modal-request .rQ_field').each(function() {
						var $t = $(this);
						data_obj[$t.attr('data-type')] = $.trim($t.val()) || null;
					});
					data_obj.isAdmin = ($('#custom-modal-request .rQ_isAdmin_field').attr('checked') === 'checked');
					$('#custom-modal-request input[data-requesttype]').each(function() {
						var $t = $(this);
						data_obj[$t.attr('data-requesttype')] = $t.attr('checked') === 'checked' || false;
					});
					if ([data_obj.name, data_obj.url, data_obj.reason].some(function(e) {
							return e === null;
						})) {
						rQ_error.text('Пожалуйста, заполните поля выше.').show();
						preventClick = !0;
						setTimeout(function() {
							rQ_error.hide();
							preventClick = !1;
						}, 3000);
					} else if ([data_obj.design, data_obj.mainpage, data_obj.templates].every(function(e) {
							return e === false;
						})) {
						rQ_error.text('Пожалуйста, выберите с чем вам нужно помочь.').show();
						preventClick = !0;
						setTimeout(function() {
							rQ_error.hide();
							preventClick = !1;
						}, 3000);
					} else {
						preventClick = !0;
						rQ.saveAndSend(data_obj);
					}
				}
			}, {
				message: 'Отменить',
				handler: function() {
					$('#custom-modal-request').closeModal();
				}
			}]
		});
	};
	rQ.saveAndSend = function(obj) {
		var url = obj.url.replace(/(https?:..|\.wikia.com.*)/g, ''),
			user = '[[User:' + rQ.c.n + '|' + rQ.c.n + ']]',
			sec_title = '[[w:c:' + url + '|' + obj.name + ']]',
			sec_text = '* Вики-проект: ' + sec_title + '\n* Причина запроса: ' + obj.reason + '\n* Запросил(а): ' + user;
		if (obj.isAdmin) {
			sec_text += ' (администратор проекта)';
		}
		sec_text += '\n*Требуется: ';
		var req = [];
		obj.design ? (req.push('дизайн')) : null;
		obj.mainpage ? (req.push('заглавная')) : null;
		obj.templates ? (req.push('шаблоны')) : null;
		sec_text += req.join(', ');
		req = null;
		$.post('/api.php', {
			action: 'edit',
			format: 'json',
			section: 'new',
			summary: 'Новый запрос от ' + user,
			sectiontitle: sec_title,
			text: sec_text,
			title: rQ.c.p,
			token: rQ.c.t
		}, function(d) {
			if (typeof d.error !== 'undefined') {
				$('#custom-modal-request .rQ_error').text('Произошла ошибка. Попробуйте позже.').show();
				return;
			}
			window.location.reload();
		});
	};
	$('#request-help').on('click', function() {
		rQ.showModal();
	});
}(jQuery, mediaWiki);

// Кнопка для юзербоксов
void(function(window, $) {
	var t = $('.b-slider-button');
	t.click(function() {
		var i = $(this).next('.b-slider-content');
		if (i.hasClass('collapsed')) {
			i.slideDown();
			i.removeClass('collapsed');
		} else {
			i.slideUp();
			i.addClass('collapsed');
		}
	});
})(this || window, this && this.jQuery || window.jQuery);

// Аватары юзербокса
void(function(window) {
	var document = window.document;
	Array.prototype.slice.call(document.querySelectorAll('#mw-content-text div.userbox[data-username]')).forEach(function(e) {
		var xhr = new window.XMLHttpRequest();
		xhr.open('GET', '/api/v1/User/Details?ids=' + e.getAttribute('data-username') + '&size=150', true);
		xhr.onload = function() {
			var d = this.response;
			if (this.status === 200 || this.status === 0) {
				try {
					d = window.JSON.parse(d);
					e.querySelector('.b-useravatar').insertAdjacentHTML('beforeend', '<img src="' + d.items[0].avatar + '"/>');
				} catch (err) {
					e.querySelector('.b-useravatar').insertAdjacentHTML('beforeend', '<div style="text-align: center;color: red;font-weight: 700;">Не удалось загрузить аватар!</div>');
				}
			}
		};
		xhr.send();
	});
})(this || window);