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
    
    // Hide the "Show All" button at the top of the screen
    var showAllButton = $('#showAllButton').hide(), groupsShown = {};
    
    // Show only the icons without group and the first of each group at the top
    $('.skin-icon').hide().each(function() {
        var group = $(this).attr('data-group');
        if (!group || !(group in groupsShown)) {
            $(this).show();
            if (group) groupsShown[group] = true;
        }
    });
    
    // Function to display icons by group or all icons
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
    
    // Function to manage clicks on group icons
    $('.skin-icon[data-group]').click(function() {
    	showIcons($(this).attr('data-group')); 
    });
    
    // Function to manage clicks on the "Show All" button
    showAllButton.click(function() { 
    	showIcons(null); 
    });
	
    // Manage clicks on group icons
    $('.skin-icon[data-group]').click(function() {
        var group = $(this).attr('data-group');
        // Remove the 'group-first' class from all group elements
        $('.skin-icon[data-group="' + group + '"]').removeClass('group-first');
    });
    
    // Manage clicks on the "Show All" button
    $('#showAllButton').click(function() {
        // Add the class 'group-first' to all the first elements of each group
        $('.skin-icon[data-group]').addClass('group-first');
    });

    // Add data-group content to all first elements of each group
    $('.skin-icon[data-group]').each(function() {
        var group = $(this).attr('data-group');
        $(this).addClass('group-first').attr('data-content', group);
    });
    
     importArticle({
        type: 'style',
        article: 'MediaWiki:Skins.css'
    });
});