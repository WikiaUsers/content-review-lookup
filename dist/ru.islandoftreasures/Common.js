/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Блоги

$(function () {
	/* Based on dev:CreateNewBlogButton.js */
	mw.loader.using(['oojs-ui-windows']).then(function() {
		var user = mw.config.get('wgUserName');
		if ((user !== null) && $('.create_new_blog').length) {
			$('.create_new_blog').html('<div class="main-btn create_new_blog"><span>Написать блог</span></div>');
			var editurl = 'placeholder';
			if ((mw.user.options.get('editor') === "2") && (mw.user.options.get('editortype') === "2")) {
				editurl = "?veaction=edit";	
			} else {
				editurl = "?action=edit";
			}
			$('.create_new_blog').click(function t() {
				OO.ui.prompt('Написать блог', {
					textInput: {
						placeholder: 'Введите заголовок'
					}
				}).done((function(t) {
					t && (window.location.href = function(t) {
					const e = mw.config.get("wgArticlePath").replace("$1", 'User_blog:'+user);
					return "".concat(e, "/").concat(encodeURIComponent(t), editurl);
					}(t));
				}));
			});
		}
	});
} );