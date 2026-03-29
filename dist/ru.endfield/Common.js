/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Изменение кнопки перенаправления в режиме редактирования исходного кода WikiEditor для автоматического добавления категории */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#перенаправление [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[' + 'Категория:Страницы-перенаправления]]';
});

/* ListUsers */
window.listUsers = {
    talk: true,
    customgroups: ['autopatrol','content-moderator','threadmoderator'],
    limit: 50
};

/* MapsExtended */
window.mapsExtendedConfig = {
    "minimalLayout": true,
    "enableSidebar": true,
    "enableSearch": true,
    "iconAnchor": "center",
    "useCustomPopups": true,
    "enableTooltips": true,
    "enableFullscreen": true,
    "fullscreenMode": "window",
    "mapControls": [
        [],
        ["zoom", "fullscreen"],
        ["edit"],
        []
    ],
    "sortMarkers": "category",
    "categoryGroups": [
        {
            "label": "Группа 1",
            "children": [
                "category_id_1",
                "category_id_2"
            ]
        },
        {
            "label": "Группа 2",
            "children": [
                "category_id_3"
            ]
        }
    ]
};

/* Страницы обучения */
$(function() {
    $('.tutorial-slider-container').each(function() {
        var $container = $(this);
        var $slides = $container.find('.tutorial-slide');
        var $btnNext = $container.find('.next');
        var $btnPrev = $container.find('.prev');
        var current = 0;
        var total = $slides.length;
        
        if (total <= 1) {
            $btnNext.hide();
            $btnPrev.hide();
            return; 
        }
        
        function updateButtons() {
            if (current === 0) {
                $btnPrev.addClass('disabled').css({
                    'opacity': '0.3',
                    'pointer-events': 'none'
                });
            } else {
                $btnPrev.removeClass('disabled').css({
                    'opacity': '1',
                    'pointer-events': 'auto'
                });
            }
            if (current === total - 1) {
                $btnNext.addClass('disabled').css({
                    'opacity': '0.3',
                    'pointer-events': 'none'
                });
            } else {
                $btnNext.removeClass('disabled').css({
                    'opacity': '1',
                    'pointer-events': 'auto'
                });
            }
        }
        
        updateButtons();
        
        $btnNext.on('click', function() {
            if (current < total - 1) {
                $slides.eq(current).hide();
                current++;
                $slides.eq(current).fadeIn(300);
                updateButtons();
            }
        });
        $btnPrev.on('click', function() {
            if (current > 0) {
                $slides.eq(current).hide();
                current--;
                $slides.eq(current).fadeIn(300);
                updateButtons();
            }
        });
    });
});