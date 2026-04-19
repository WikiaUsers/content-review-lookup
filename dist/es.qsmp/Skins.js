$(function() {

    $('.skin-container').each(function() {
        var container = $(this);

        container.attr('data-mode', 'preview')
            .find('.models > div:first-child').addClass('active');

        container.attr('data-mode', 'description')
            .find('.skin-description > div:first-child').addClass('active');

        var showAllButton = container.find('.showAllButton').hide();
        var groupsShown = {};
        var menuTitle = container.find('.menu-title');

        container.find('.skin-icon').click(function() {
            var skin = $(this).attr('data-name');

            container.find('.skin-icon, .preview, .description').removeClass('active');

            container.find('.preview[data-name="' + skin + '"], .description[data-name="' + skin + '"]')
                .addClass('active');

            $(this).addClass('active');
            container.find('.skin-title').text(skin);
        });

        container.find('.skin-icon').hide().each(function() {
            var group = $(this).attr('data-group');

            if (!group || !(group in groupsShown)) {
                $(this).show();
                if (group) groupsShown[group] = true;
            }
        });

        function applyGroupFirst() {
            var groupsSeen = {};

            container.find('.skin-icon[data-group]').removeClass('group-first');

            container.find('.skin-icon[data-group]').each(function() {
                var group = $(this).attr('data-group');

                if (!(group in groupsSeen)) {
                    $(this).addClass('group-first')
                        .attr('data-content', group);

                    groupsSeen[group] = true;
                }
            });
        }

        applyGroupFirst();

        function showIcons(group) {
            container.find('.skin-icon').hide();

            if (!group) {
                groupsShown = {};

                container.find('.skin-icon').each(function() {
                    var g = $(this).attr('data-group');

                    if (!g || !(g in groupsShown)) {
                        $(this).show();
                        if (g) groupsShown[g] = true;
                    }
                });

                menuTitle.contents().first()[0].textContent = 'Aspectos';
                showAllButton.hide();
                applyGroupFirst();
            } else {
                container.find('.skin-icon[data-group="' + group + '"]').show();
                showAllButton.show();

                menuTitle.contents().first()[0].textContent = group;

                container.find('.skin-icon[data-group="' + group + '"]')
                    .removeClass('group-first');
            }
        }

        container.find('.skin-icon[data-group]').click(function() {
            var group = $(this).attr('data-group');
            showIcons(group);
        });

        showAllButton.click(function() {
            showIcons(null);
        });

    });

    importArticle({
        type: 'style',
        article: 'MediaWiki:Skins.css'
    });

});