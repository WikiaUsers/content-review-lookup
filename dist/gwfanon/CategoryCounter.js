;(function() {
    if($('#UserProfileMasthead').length === 0) return;
    if($('#UserProfileMasthead .category-details').length === 1) return;
    
    var labels = [
        'Utworzony artykuł', // 1 …
        'Utworzone artykuły', // 2 …
        'Utworzonych artykułów' // 5 …
    ];
    
    var cat = 'Category:' + $('#UserProfileMasthead h1').text();
    
    var tally = $('<div>', {
        'class': 'category-details discussion-details tally',
        'style': 'position: relative;'
    }).startThrobbing().append(
        $('<a>', {
            id: 'pagesInUserCategory',
            href: mw.util.getUrl(cat)
        }).append(
            $('<em>').html('0'),
            $('<span>').addClass('category-label discussion-label').html(labels[2]))
    ).insertAfter($('#UserProfileMasthead .tally').first());
    
    $.getJSON(mw.util.wikiScript('api'), 
        {
            format: 'json',
            action: 'query',
            prop: 'categoryinfo',
            titles: cat,
        },
        function(data) {
            $.each(data.query.pages, function(k, v) {
                var count = 0;
                if(k !== '-1') count = v.categoryinfo.pages;
                
                tally.find('em').html(count);
                
                if(count === 1) {
                    tally.find('span').html(labels[0]);
                } else if(count % 10 >= 2 && count % 10 <= 4 && !(count % 100 >= 12 && count % 100 <= 14)) {
                    tally.find('span').html(labels[1]);
                }
                tally.stopThrobbing();
                return false;
            });
        }
    );
})();