// Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице

// Сделать видимым только для администрации
mw.hook("wikipage.content").add(function($content) {
    if (
        /sysop|vstf|staff|helper|content-volunteer|content-moderator/.test(mw.config.get('wgUserGroups').join())
    ) {
        $content.find(".admins-only.hide").removeClass("hide");
        $content.find(".admins-only.default").addClass("hide");
    }
});

$(function() {
	/* Шаблон:Автотаблица */
	// Убрать title в автотаблицах
	var intervalNoTitle = setInterval(notitle, 1000);
	function notitle() {
    	if ($('.autotable .tooltip-theme-main').parent('th.headerSort').attr('title', '')) {
		    clearInterval(intervalNoTitle);
			$('.autotable .tooltip-theme-main').parent('th.headerSort').attr('title', '');
		}
	}
	
	/* Шаблон:Подсказка/Предмет */
	// Заменить несущ. картинки на картинку вопроса
	$('.item-tooltip .new').html('<img alt="Иконка неизвестно.png" src="https://static.wikia.nocookie.net/hell-is-others/images/3/39/Иконка_неизвестно.png/revision/latest?cb=20230116113815&format=original&path-prefix=ru" decoding="async" loading="lazy" width="64" height="64" data-image-name="Иконка неизвестно.png" data-image-key="Иконка неизвестно.png">');
	
	/* Шаблон:Навбокс */
	// Открытие таблицы кликом по заголовку
	 $('.navbox-table .header').click(function() {
	 	var navboxTable = $(this).parent('.navbox-table');
	 	navboxTable.find('.mw-collapsible-content').removeAttr('style')
		if (navboxTable.hasClass('mw-collapsed')) {
			navboxTable.removeClass('mw-collapsed');
			navboxTable.find('.mw-collapsible-content').show();
		}
		else {
			navboxTable.addClass('mw-collapsed');
			navboxTable.find('.mw-collapsible-content').hide();
		}
	});
});

/* Настройки для BackToTopButton */
window.BackToTopModern = true;

/* Прогресс-бар */
window.AddRailModule = [
    // { page: 'Template:RailModule1', maxAge: 60 },
    { page: 'Template:RailModule2', maxAge: 60 },
];

/* Настройка тултипов */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
/* Тултип предметов */
window.tooltips_list = [
    {
    	classname: 'item-tooltip',
    	parse: '{{#invoke:getdata|infobox|<#article#>|Автоинфобокс/Предмет}}',
	},
    {
    	classname: 'furniture-tooltip',
    	parse: '{{#invoke:getdata|infobox|<#article#>|Автоинфобокс/Мебель}}',
	}
];

// Шаблоны обсуждений
window.DiscussionTemplates = {
    templates: {
        'Стандартное приветствие': {
            name: 'Шаблон:DiscussionTemplates/Приветствие',
            title: 'Приветствие нового участника'
        },
    },
    allowedGroups: ['sysop', 'content-moderator', 'threadmoderator']
};