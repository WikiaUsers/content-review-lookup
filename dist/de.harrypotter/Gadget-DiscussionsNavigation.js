el = $('nav.wds-community-header__local-navigation > ul > li:last-child');
discLabel = el.find('.wds-tabs__tab-label');
discIcon = discLabel.find('a > svg').clone();
discText = discLabel.find('a > span').clone();
chevronLvl1 = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg>';
chevronLvl2 = '<svg class="wds-icon wds-icon-tiny wds-dropdown-chevron"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wds-icons-menu-control-tiny"></use></svg>';
el.append(
	$('<div />',{class: 'wds-dropdown'}).append(
        $('<div />',{class: 'wds-tabs__tab-label wds-dropdown__toggle'}).append(
            discIcon,
            discText,
            chevronLvl1
        ),
        $('<div />',{class: 'wds-is-not-scrollable wds-dropdown__content'}).append(
            $('<ul />',{class: 'wds-list wds-is-linked wds-has-bolded-items discussions-nav-dropdown-items'})
        )
	)
);
discLabel.remove();
$.getJSON(wgScriptPath + '/api.php?' + $.param({
    action: 'parse',
    page: 'Vorlage:Gatget-DiscussionsNavigationLinks',
    format: 'json',
    disablepp: 1
}),function(res) {
    items = $(res.parse.text['*']).filter('ul').children();
    items = list2Dropdown(items);
    $('.discussions-nav-dropdown-items').html(items);
});

function list2Dropdown(items) {
    items.addClass('wds-dropdown-level-2');
	items.contents().filter(function(){
        return this.nodeType === 3 && $(this).text().trim().length;
    }).wrap(
        $('<a />',{href: '#', class: 'wds-dropdown-level-2__toggle'})
	).wrap($('<span />'));
	items.find('a.wds-dropdown-level-2__toggle').append(chevronLvl2);
    items.find('> ul').wrap(
        $('<div />',{class: 'wds-dropdown-level-2__content'})    
    ).addClass('wds-list wds-is-linked');
    items.each(function(key,val) {
        children = $(val).find('.wds-dropdown-level-2__content > ul > li').length;
        if($(val).prevAll().length + 1 > children) {
            $(val).addClass('wds-is-sticked-to-parent');
        }
    });
    return items;
}