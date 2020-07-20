if(!!$('.intertype-links').length) { // before: Artikel in anderen Wikis
    raw = $('.intertype-links').text();
    $('.intertype-links').empty();
    re = /([a-z]+):([A-Za-z ]+)/g;
    wikis = [];
    wikis['harrypotter'] = 'de.harrypotter';
    wikis['fringe'] = 'de.fringe';
    all_links = [];
    links_raw = raw.replace(re,function($0,$1,$2) {
        match = [];
        match[0] = $1;
        match[1] = $2;
        if(!!wikis[$1]) {
            console.log($1,'is',wikis[$1]);
            match[0] = $('<small />').html($('<a />').attr('href','http://' + wikis[$1] + '.wikia.com/wiki/' + $2).text($2));
            $('.intertype-links').append(match[0]);
        }
        all_links.push([$1,$2]);
        return match[0] + "-->" + $2; }
    );
    links = links_raw.split('\n');
    console.log(raw,re.test(raw));
    console.log(typeof links_raw,links_raw,typeof links, links,typeof all_links,all_links);
}