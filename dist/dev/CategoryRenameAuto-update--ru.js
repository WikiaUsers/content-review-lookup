//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>

CRA.i18n.ru = {
	pageTitle: 'CategoryRenameAuto-update',
	categoryNamespace: 'Категория',
	rename: 'Переименовать',
	reason: 'Причина',
	automatic: 'автоматически',
	failedItems: 'Ошибочные элементы',
	renameFieldset: 'Переименовать категории',
	currentName: 'Текущее название',
	leaveRedir: 'Оставить перенаправление под прежнем названием',
	replaceOldContents: 'Изменить содержимое',
	deleteOldCat: 'Удалить старую категорию',
	doNothing: 'Ничего не изменять',
	checkingNewTitle: 'Проверка нового названия на наличие на вики',
	gettingCatMembers: 'Загрузка названий',
	fetchingContents: 'Загрузка содержимого страниц с API',
	creatingNewPage: 'Создание новой страницы',
	submittingPages: 'Начать сохранение страниц',
	renameComplete: 'Изменение названия завершено. Новая категория',
	catNotUsed: 'Категория не используется ни на одной странице, переименуйте категории вручную.',
	destExists: 'Данное название уже существует.',
	renamingCat: 'Переименование категории',
	createdNewCat: 'Новая категория создана',
	unableToCreate: 'Невозможно создать категории',
	updating: 'Обновление',
	redirToNew: 'Перенаправить на новую категорию',
	submittedPage: 'Страница сохранена',
	mainDescription: 'Используя форму ниже, вы можете изменить название категории, изменив название категории на страницах, входящих в эту категорию. Вы можете решить, что сделать со старыми страницами категорий; новая страница категории создаётся с содержимым старой категории. Не забудьте просмотреть <a href="' + mw.util.getUrl('Special:WantedCategories') + '">список требуемых категорий</a>. Вы несёте ответственность за корректную работу ссылок.<br /><br />Следует иметь в виду, что страница <strong>не</strong> будет перенесена, если уже есть страница с новым именем.<br /><br /><strong>Внимание!</strong> Использование скрипта может привести к неожиданным последствиям для популярных категорий, перед переименованием рекомендуется проверить корректность вносимых изменений.',
	failedDescription: 'Ошибочные элементы появятся здесь после очистки. Следует иметь в виду, что страницы, которые попадают в категорию с помощью шаблона, также появятся здесь.',
	chooseOldPage: 'выберите, что сделать со старой категорией',
	includeLinks: 'Содержит <span style="font-weight: bold">ссылки</span> во всех пространствах имен, например: [[:Категория:Название категории]] <span style="font-size: 9px;">(включает в себя (основное) по умолчанию)</span>',
	pageNotCreated: [
		'Страница',
		/* New Category Name */ 
		'не может быть создана, потому что'
		/* Error Code */
	],
	pageNotSubmitted: [
		'Страница',
		/* Page Name */ 
		'не может быть сохранена, потому что',
		/* Error Code */
		'Пожалуйста, обновите ссылку(и) на странице вручную.'
	],
	pageNotDeleted: [
		'Страница',
		/* Page Name */ 
		'не может быть удалена из-за',
		/* Error Code */
		'Пожалуйста, удалите страницу вручную.'
	],
	unableToFind: [
		'Не удаётся найти',
		/* Old Category Name */
		'на странице',
		/* Page Name */
		'; может быть добавлена с помощью шаблона. Пожалуйста, проверьте и обновите вручную в случае необходимости.'
	]
}

//</nowiki>
//</source>