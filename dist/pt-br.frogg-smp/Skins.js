/* Skins CSS - created by KeiCol (https://qsmp.fandom.com/wiki/User:KeiCol) */
$(function() {
    $('.skin-container:not([data-mode])').attr('data-mode', 'preview').find('.models > div:first-child').addClass('active').end().attr('data-mode', 'description').find('.skin-description > div:first-child').addClass('active');
    
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
	
    // Manejar clics en iconos de grupo
    $('.skin-icon[data-group]').click(function() {
        var group = $(this).attr('data-group');
        // Remover la clase 'group-first' de todos los elementos del grupo
        $('.skin-icon[data-group="' + group + '"]').removeClass('group-first');
    });
    
    // Manejar clics en el botón "Mostrar Todos"
    $('#showAllButton').click(function() {
        // Agregar la clase 'group-first' a todos los primeros elementos de cada grupo
        $('.skin-icon[data-group]').addClass('group-first');
    });

    // Agregar contenido de data-group a todos los primeros elementos de cada grupo
    $('.skin-icon[data-group]').each(function() {
        var group = $(this).attr('data-group');
        $(this).addClass('group-first').attr('data-content', group);
    });
    
     importArticle({
        type: 'style',
        article: 'MediaWiki:Skins.css'
    });
});