LIR.i18n.ru= {
	queueModalTitle: 'Очередь обновления имен файлов',
	fileNamespace: 'Файл',
	imageNamespace: 'Изображение',
	videoNamespace: 'Видео', //No longer allowed alias. I don't know what it was in the past, but I might as well try to guess something. What can possibly go wrong?
	using: 'Использование', //Replaced from "Using" - needs testing for context
	queue: 'Очередь',
	userBlogCommentNamespace: 'Комментарий блога участника',
	editSummary: 'Обновление имен файлов (автоматическое)',
	filesInQueue: 'Файлы в очереди',
	oldFileName: 'Старое имя файла',
	newFileName: 'Новое имя файла',
	addToQueue: 'Добавить в очередь',
	nameInUse: 'Целевое имя уже используется или находится в очереди для использования.',
	alreadyInQueue: 'Файл уже находится в очереди.',
	invalidExtension: 'Неправильное расширение файла.',
	blogComment: 'Файл используется в комментариях к блогу. Обновление невозможно.',
	fileNotUsed: 'Файл не используется ни на одной странице.',
	noQueueExists: 'Очереди не существует',
	itemRemoved: 'Удалено из очереди',
	destInUse: 'Целевое имя уже занято.',
	processing: 'Работа в процессе',
	successful: 'Завершено успешно.',
	varsUndef: 'Не определены переменные. Проверьте код.',
	queueComplete: 'Выполнение очереди завершено',
	queueStarted: 'Очередь запущена',
	contentsRetrieved: 'Содержимое страницы загружено и сохранено',
	queueUpdate: 'Очередь обновлена',
	nothingInQueue: 'Очередь пуста.',
	tryDiffName: 'Пожалуйста, введите имя файла.',
	waitCleared: 'Список ожидающих страниц очищен',
	toUndef: 'Переменная „To” не была указана.',
	fileNameBlank: 'Имя файла не может быть пустым',
	submittingContent: 'Сохранение страницы',
	namespaceCheckbox: 'Учитываются <span style="font-weight: bold">ссылки</span> во всех пространствах имен, например, [[:Файл:Файл.png]] <span style="font-size: 9px;">(по умолчанию только в основном пространстве)</span>',
	failedDescription: 'Здесь будут учтены любые неудачные замены. Изображения в шаблонах могут вызывать ложные срабатывания.',
	pagesWaiting: 'По-прежнему обнаружены страницы, ожидающие добавления в очередь. Если это не так, пожалуйста, используйте кнопку „Сбросить список”.',
	unableToMoveChoose: 'Пожалуйста, выберите другое имя для этого файла.',
	unableToMoveFail: /* Image name */ 'был удален из очереди.',
	singleButtonText: 'Переместить и заменить',
	queueButtonText: 'Добавить в очередь',
	fileInQueue: 'Этот файл уже находится в очереди на переименование.',
	removeFromQueue: 'Удалить из очереди',
	queueModalClose: 'Закрыть',
	queueModalManual: 'Добавить вручную',
	queueModalReset: 'Сбросить список',
	queueModalUpdate: 'Обновить',
	queueModalExecute: 'Запустить',
	queueAddition: 'Ручное добавление в очередь',
	manualModalDescription: 'Введите имя файла (возможно, несуществующее) для ручного обновления. Только ссылки на страницах будут заменены, а сам файл – <span style="font-weight: bold">не будет</span>, даже если должен или есть замена. Полезно для восстановления красных ссылок и замены одного файла другим (например, в случае повторяющихся записей)',
	
	queueModalWaitConfirm: [
		'Эта опция сбросит список страниц, ожидающих добавления в очередь в случае возникновения проблем с обработкой страницы, которые мешают обрабатывать файлы из очереди.',
		'Количество страниц в очереди на добавление в очередь:',
		/* Number of pages */
		'',
		'Нажмите „OK”, чтобы продолжить. Любые незавершенные попытки добавить файлы в очередь должны быть повторены после обновления страницы.'
	],
	waitList: [
		'Позиция №',
		/* number on waitlist */
		'в списке ожидающих'
	],
	unableToFind: [
		'',
		/* Image Name */
		'не был найден на странице',
		/* Page Name */
		'но он мог быть включён через шаблон. Проверьте вручную в случае необходимости.'
	],
	unableToMove: [
		'Имя файла',
		/* Image Name */
		'не может быть изменено на',
		/* Image Name */
		'по следующей причине:'
		/* error code */
	],
	unableToSubmit: [
		'Страница',
		/* Page Name */
		'не может быть сохранена из-за следующей ошибки:',
		/* Image Name */
		'Пожалуйста, обновите ссылки вручную.'
	],
	movePageNamespaceSelect: [
		'влияет только на параметр',
		/* Single button name */
		''
	],
	movePageDescription: [
		'Кнопка',
		/* Single button name */
		'обновит все статьи с новым именем файла при нажатии на кнопку',
		/* Multi button name */
		'добавляет файл в очередь так, чтобы в случае изменения нескольких файлов в одной статье они были обновлены одновременно. Очередь может быть отображена на любой странице файла в раскрывающемся меню рядом с кнопкой "Править". Данные из очереди сохраняются только для одного браузера и не переходят на другие браузеры или компьютеры.'
	],
	
	movePageInfo: [
		'Скрипт обновлен',
		/* date */
		'Больше информации об обновлениях и функциях вы найдете <a href="//dev.wikia.com/wiki/FileUsageAuto-update">здесь</a>. Просим подробно описывать ошибки и пропущенные изменения имён файлов на странице обсуждения.'
	]
};