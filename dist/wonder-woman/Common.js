
/* SORT WHATLINKSHERE ALPHABETICALLY BEGIN */

(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')) ? 1 : -1;
    });
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

/* SORT WHATLINKSHERE ALPHABETICALLY END */



/* DEV INACTIVEUSERS BEGIN */

InactiveUsers = { 
    months: 6,
    gone: ['username1', 'username2'],
    text: 'inactive'
};

/* DEV INACTIVEUSERS END */