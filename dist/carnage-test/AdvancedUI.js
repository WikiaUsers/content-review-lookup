var advanced_ui = {};

advanced_ui.createSidebar = function(heading, config){
    var sidebar_items = config.items || [],
        position = config.position || 'right',
        background_color = config.bgColor || '#348acf',
        font_color = config.fontColor || 'white';
    function menu(items){
        var item_title, item_link, item_html, item_tooltip;
        for (var i = 0; i < items.length; i++){
            item_title = items[i].title;
            item_link = items[i].link;
            item_tooltip = items[i].tooltip;
            item_html = '<li class="advanced-ui-sidebar-item" data-tooltip="' + item_tooltip + '" data-title="' + item_title + '"><a href="' + item_link + '">' + item_title + '</a></li>';
            menu_items = item_html;
        }
        return menu_items;
    }

    function sidebar(heading, sidebar_items){
        var sidebar_nav = '<aside class="advanced-ui-sidebar-wrapper"><h1 class="advanced-ui-sidebar-heading">' + heading + '</h1>' + sidebar_content + '</aside>',
            sidebar_content = '<nav class="advanced-ui-sidebar">' + sidebar_list + '</nav>',
            sidebar_list = '<ul class="advanced-ui-sidebar-list">' + sidebar_items + '</ul>';
        return sidebar_nav;
    }

    $('body').append(sidebar('Menu', menu(menu_list));
};