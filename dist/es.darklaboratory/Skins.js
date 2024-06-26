$(function() {
    $('.skin-container:not([data-mode])').find('.models > div:first-child').addClass('active').end().find('.skin-description > div:first-child').addClass('active');
    
    $('.skin-icon').click(function() {
        var skin = $(this).attr('data-name');
        var container = $(this).closest('.skin-container');
        container.find('.skin-icon, .preview, .description').removeClass('active');
        container.find('.preview[data-name="' + skin + '"], .description[data-name="' + skin + '"]').addClass('active');
        $(this).addClass('active');
        container.find('.skin-title').text(skin);
    });
    
    // Ocultar el botón "Mostrar Todos" al principio
    var showAllButton = $('#showAllButton').hide(), groupsShown = {};
    
    // Mostrar solo los iconos sin grupo y el primer de cada grupo al principio
    $('.skin-icon').hide().each(function() {
        var group = $(this).attr('data-group');
        if (!group || !(group in groupsShown)) {
            $(this).show();
            if (group) groupsShown[group] = true;
        }
    });
    
    // Función para mostrar iconos por grupo o todos
    function showIcons(group) {
        $('.skin-icon').hide();
        if (!group) {
            $('.skin-icon:not([data-group])').show();
            groupsShown = {};
            $('.skin-icon[data-group]').each(function() {
                var group = $(this).attr('data-group');
                if (!(group in groupsShown)) {
                    $(this).show();
                    groupsShown[group] = true;
                }
            });
            showAllButton.hide();
        } else {
            $('.skin-icon[data-group="' + group + '"]').show();
            showAllButton.show();
        }
    }
    
    // Función para manejar clics en iconos de grupo
    $('.skin-icon[data-group]').click(function() {
    	showIcons($(this).attr('data-group')); 
    });
    
    // Función para manejar clics en el botón "Mostrar Todos"
    showAllButton.click(function() { 
    	showIcons(null); 
    });
    
     importArticle({
        type: 'style',
        article: 'MediaWiki:Skins.css'
    });
});