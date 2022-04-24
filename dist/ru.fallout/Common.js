/* Сюда добавляются скрипты, используемые в пределах основного блока (.mw-parser-output), */
/* т.е. не зависящие от скина проекта                                                     */

/* [[MediaWiki:ImportJS]] для импорта скриптов */
/* [[MediaWiki:Wikia.js]] для скриптов вне основного блока (.mw-parser-output) */

//================================================================
// Костыль для удаление пустого тега <p> перед инфобоксами
$('#mw-content-text .mw-parser-output > .portable-infobox').prev('p').each(function() {
    var pLength = $(this).text().replace(/(\n|\s)/g, '').length;
    if (pLength === 0) $(this).hide();
});

//================================================================
// Настройки скриптов

//--------------------------------
// Неактивные пользователи (InactiveUsers)
InactiveUsers = {
	months: 3,
	text: 'Неактивен'
};

//--------------------------------
// Проверка подписей (SignatureCheck)
// window.SignatureCheckJS = {
// 	// Parts of the confirm prompt
// 	preamble: '',
// 	epilogue: '\nНажмите кнопу «отмена» и внесите соответствующие изменения. Если же вы уверены, что данное предупреждение сработало ошибочно, то вы можете сохранить страницу, нажав кнопку «OK»',
// 	noForumheader: 'Вы удалили (либо забыли добавить) шапку форума. Пожалуйста, добавьте в начало страницы шаблон {{Forumheader}}.\n\n',
// 	noSignature: 'Вы забыли добавить подпись к своему сообщению с помощью четырёх тильда ~ ~ ~ ~ (без пробелов)\n',
// 		forumheader: 'Forumheader'
// };

//--------------------------------
// Что-то про ReferencePopups
( (window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {} ).lockdown = true;

//--------------------------------
// Кастомные теги участников не перезатирают обычные
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

//--------------------------------
// Полу-автоматическая архивация (ArchiveTool)
// Конфигурация, вероятно, не работает. Используем значения по-умолчанию + перенаправления.
// var ArchiveToolConfig = {
// 	archiveListTemplate: 'Archives',
// 	archivePageTemplate: 'Archivepage',
// 	archiveSubpage: 'Archive'
// };

//--------------------------------
// Автообновление служебных страниц (AJAX Recent Changes)
// Пока что не адаптировано под UCP
// var ajaxPages = ["Служебная:Вклад","Служебная:Журналы","Служебная:Новые_страницы","Служебная:Новые_файлы"];
// var AjaxRCRefreshText = 'Автообновление';
// var AjaxRCRefreshHoverText = 'Включить автообновление';

//--------------------------------
// Описание правок (Standard Edit Summary)
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'Шаблон:Описание правки'
};

//================================================================
// Вставка пользовательского имени для [[Template:Username]]
$(function() {
	if (mw.config.values.wgUserName != 'null') {
		$('.insertusername').html(mw.config.values.wgUserName);
	}
});

//================================================================
// Спойлеры
if ( $('.js-items-spoilers').length ) {

    var controls = '<tr colspan="2" class="js-items-controls"><td><div class="js-items-buttons">' +
        '<span class="button" data-type="show" title="Развернуть">▼</span>' +
        '<span class="button" data-type="hide" title="Свернуть">▲</span>' +
        '</div></td></tr>';

    // Adding controls row
    $('.js-items-spoilers').prepend(controls);

    // Initialize click event
    $('.js-items-controls .button').click(function() {
        var $spoilerContainer = $(this).closest('.js-items-spoilers'),
            toShow = ( $(this).data('type') == 'show' ? true : false );

        // For each show/hide actions
        $spoilerContainer.find('.mw-collapsible').each(function() {

            if ( toShow) {

                $(this).removeClass('mw-collapsed');
                $(this).find('> tbody > tr:not(:first-child)').show();
            
            } else if ( !toShow ) {

                $(this).addClass('mw-collapsed');
                $(this).find('> tbody > tr:not(:first-child)').hide();

            }
        });
    });

}

//================================================================
// Фикс нескрываемых подзаголовков в "mw-collapsible mw-collapsed sortable"
$(function() {

	if ( !$('.mw-collapsible-toggle').length ) return;

    $('.mw-collapsible-toggle').click(function() { /* This workink after MediaWiki classes change*/

        var $titles = $(this).closest('.mw-collapsible').find('thead > tr:not(:first-child)');

        if ( $(this).hasClass('mw-collapsible-toggle-collapsed') ) {

            $titles.hide();

        } else if ( $(this).hasClass('mw-collapsible-toggle-expanded') ) {

            $titles.show();

        }

    });

});

//================================================================
// Кнопка открытия попапа создания блога

$(function () {
    /* Based on dev:CreateNewBlogButton.js */
	var user = mw.config.get('wgUserName');
	if ((user !== null) && $('.create_new_blog').length) {
		$('.create_new_blog').html('<div class="main-btn create_new_blog"><span>Написать блог</span></div>');
		var editurl = 'placeholder';
		if ((mw.user.options.get('editor') === "2") && (mw.user.options.get('editortype') === "2")) {
			editurl = "?veaction=edit";	
		}
		else {
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
		} );	
	}
} );

//================================================================
// Mbox2

$('.mbox2__footer-toggler').click(function() {
    $(this).closest('.mbox2').find('.mbox2__footer').toggle();
});