//Удаление комментариев без перезагрузки страницы. Автор: GoodLuck
//http://ru.warframe.wikia.com/wiki/MediaWiki:Wikia.js/AjaxCommentsDelete.js
$(function() {
	var wgServer = mw.config.get('wgServer'),
		wgScriptPath = mw.config.get('wgScriptPath'),
		token = mw.user.tokens.get('editToken'),
		id,
		del,
		style = '<div class="ajaxCommentsDeleteWrapper"><div class="ajaxCommentsDeleteWindow"><header><a class="closeAjaxCommentsDeleteWindow"></a><h3>Удалить этот комментарий</h3></header><section>Пожалуйста напишите почему вы хотите удалить это:<textarea class="ajaxCDeleteReason"></textarea></section><footer><button class="ajaxCDelete">Удалить</button><button class="cancelAjaxCDelete">Отмена</button></footer></div></div>',
		deleteComment = function() {
			var reason = $('.ajaxCDeleteReason').val();
			id = decodeURIComponent(id);
			id = id.match(/[^\/wiki\/].+[^\?redirect=no&action=delete]+/gi);
			var full_url = wgServer + wgScriptPath + '/api.php?action=delete&title=' + window.encodeURIComponent(id) + '&reason=' + window.encodeURIComponent(reason) + '&format=json&token=' + window.encodeURIComponent(token);
			$.post(full_url, function(data) {
				if (data.error) {
					alert('Ошибка:' + data.error.info);
				} else {
					if ($(del).closest('li.comment').next().hasClass('sub-comments')) {
						$(del).closest('li.comment').slideUp(400);
						$(del).closest('li.comment').next().slideUp(400);
					} else {
						$(del).closest('li.comment').slideUp(400);
					}
				}
			});
			$('.ajaxCommentsDeleteWrapper').remove();
		};
	$(document.body).on('click', function(event) {
		event = event || window.event;
		var target = event.target;
		switch (target.className) {
			case 'article-comm-delete':
				event.preventDefault();
				id = $(target).attr('href');
				del = $(target);
				$(document.body).append(style);
				$('.ajaxCommentsDeleteWrapper').css({
					display: 'flex'
				});
				$.htmlScroll('hidden');
				$('.ajaxCDeleteReason').focus();
				$('.ajaxCDeleteReason').on('input', function() {
					var v = $(this).val().length;
					if (v === 0) {
						$('.ajaxCDelete').attr('disabled', 'disabled');
					} else {
						$('.ajaxCDelete').removeAttr('disabled');
					}
				});
				break;
			case 'closeAjaxCommentsDeleteWindow':
				$('.ajaxCommentsDeleteWrapper').remove();
				$.htmlScroll('auto');
				break;
			case 'ajaxCommentsDeleteWrapper':
				target.remove();
				$.htmlScroll('auto');
				break;
			case 'cancelAjaxCDelete':
				$('.ajaxCommentsDeleteWrapper').remove();
				$.htmlScroll('auto');
				break;
			case 'ajaxCDelete':
				deleteComment();
				$.htmlScroll('auto');
				break;
		}
	});
	console.log('AjaxCommentsDelete loaded');
});