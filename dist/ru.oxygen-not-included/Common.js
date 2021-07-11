/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// настройки для BackToTopButton
window.BackToTopModern = true;

// настройки для AddRailModule
window.AddRailModule = ['Шаблон:Блоги'];

// отключаем Rollback
window.RollbackWikiDisable = true;

//Разворачивание по клику
$('.oni-colapsible-button').click(function() {
    $(this).parent().find('.oni-colapsible-body').slideToggle();
});

//База данных v2.0
$('body').on('click', '.oni-database .database-list .database-category .database-category-title', function (){
    $(this).parent().find('ul').slideToggle();
    $(this).find('.arrow-down, .arrow-up').toggle();
});

$('.database-category-title').click(function() {
    $(this).parent().find('ul').slideToggle();
    $(this).find('.arrow-down, .arrow-up').toggle();
});

$('.oni-database > .database-list').each(function() {
    var lists = $(this).html().replace(/\r?\n?\t/g, '').split('((~))');
    var d_list = $(this);
	$(this).html('');
	
    $.each(lists, function(i, list) {

        var items = list.split('((%))').pop().split('((-))');
        var title_cat = list.split('((%))').shift().trim();
		
        d_list.append('<div class="database-category"><div class="database-category-title">' + title_cat + '<div class="arrow-down">▼</div><div class="arrow-up">▲</div></div>');
        var d_item = $('<ul></ul>');
        $.each(items, function(i, item) {
            var content = item.split('((=))').pop().trim();
            var title = item.split('((=))').shift().trim();
            d_item.append('<li>' + title + '</li>\n');
			d_list.parents('.oni-database').find('.database-monitor').append('<div value="' + title + '">' + content + '</div>');
        });
		d_list.find('.database-category:last-child').append(d_item);
    });
});
$('.oni-database > .database-monitor > div').hide();
$('.oni-database > .database-list li').click(function() {
    $(this).parents('.oni-database').find('.database-monitor > div').hide();
    var title = $(this).html();
    $(this).parents('.oni-database').find('.database-monitor > div[value="' + title + '"]').show();
});

// Цвета админов в комментариях, код взят с Don't Starve вики
setInterval(function () {
	$('.wds-avatar a[href$="Ksarfax"]').closest('.Reply, .Reply_body__3woA9').addClass('Ksarfax');
	$('.wds-avatar a[href$="MarisFrance"]').closest('.Reply, .Reply_body__3woA9').addClass('MarisFrance');
	$('.wds-avatar a[href$="%D0%9D%D0%B8%D0%B2%D0%B0%D0%BB%D1%8C"]').closest('.Reply, .Reply_body__3woA9').addClass('Nival');
}, 500 );