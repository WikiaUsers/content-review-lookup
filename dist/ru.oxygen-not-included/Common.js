/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// настройки для BackToTopButton
window.BackToTopModern = true;

// настройки для AddRailModule
window.AddRailModule = ['Шаблон:Блоги'];

// отключаем Rollback
window.RollbackWikiDisable = true;

window.railWAM = {
    logPage:"Project:WAM Log"
};

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

//Редактор страниц v2.0
    //Переключение ширины редактора
$('#cke_toolbar_source_1').append('<label for="full_edit_page"><input type="checkbox" id="full_edit_page">Широкая страница редактора</label>');
$('#EditPageToolbar').on('change', '#full_edit_page', function() {
    if ($('#full_edit_page').prop('checked')) $('#WikiaPage').addClass('full-width');
    else $('#WikiaPage').removeClass('full-width');
});
    //Табуляция
$('textarea[name=wpTextbox1]').attr('onkeydown', `if (event.keyCode === 9)
    {
        var v = this.value,
            s = this.selectionStart,
            e = this.selectionEnd;
        this.value = v.substring(0, s) + '    ' + v.substring(e);
        this.selectionStart = this.selectionEnd = s + 4;
        return false;
    }`);