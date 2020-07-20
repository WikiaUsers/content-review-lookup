(function($, mw, $content){
    if (!$content.find('#navigation-wrapper').length) return;
    var $wrapper = $content.find('#navigation-wrapper'),
        $result = $('<section />', { 'class': 'wiki-navigation wiki-navigation-v1 wiki-nav', 'id': 'wiki-navigation' }),
        navigation = new Object(null);
    navigation.defaultValue = function(value, def){
        if (
            typeof value === 'undefined' ||
            value === '' ||
            value === null ||
            !value ||
            isNaN(value)
        ){
            return def;
        }
        return value;
    };
    navigation.focusedState = navigation.defaultValue(JSON.parse(localStorage.getItem('nl_focused')), false);
    navigation.create = function create(obj, index){
        var $ul = $('<ul />', { 'class': 'wiki-navigation-list wiki-nav-list nl-level-' + index });
        for (var key in obj){
            if (obj.hasOwnProperty(key)){
                var item = obj[key], $li = $('<li />', { 'class': 'wiki-navigation-item wiki-nav-item nl-item-level-' + index, 'data-item-id': key });
                if (item.hasOwnProperty('children')){
                    var children = item.children, i = index + 1;
                    $li.html([
                        $('<a />', {
                            'href': item.link || '#',
                            'class': 'wiki-navigation-link wiki-nav-link nl-link-level-' + index,
                            html: item.title || ''
                        }),
                        create(children, i)
                    ]);
                } else {
                    $li.addClass('nl-last').html(
                        $('<a />', {
                            'href': item.link || '#',
                            'class': 'wiki-navigation-link wiki-nav-link nl-link-level-' + index,
                            html: item.title || ''
                        })
                    );
                }
                $ul.append($li);
            }
        }
        return $ul;
    };
    navigation.createSearch = function(){
        var $search = $('<form />', { 'class': 'wiki-search wiki-navigation-search search', 'id': 'wiki-search' }),
            $svg = $('<svg />', { 'class': 'wiki-search-icon search-icon icon', html: '<path d="M27.132 23.827l-6.632-5.641c-0.686-0.617-1.419-0.9-2.011-0.873 1.566-1.834 2.511-4.213 2.511-6.813 0-5.799-4.701-10.5-10.5-10.5s-10.5 4.701-10.5 10.5 4.701 10.5 10.5 10.5c2.6 0 4.98-0.946 6.813-2.511-0.027 0.592 0.256 1.326 0.873 2.011l5.641 6.632c0.966 1.073 2.544 1.164 3.506 0.201s0.872-2.54-0.201-3.506zM10.5 17.5c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z"></path>' }),
            $input = $('<div />', { 'class': 'wiki-search-wrapper wiki-navigation-search-wrapper search-wrapper' });
        $input.html([
            $('<input />', { 'class': 'wiki-search-input wiki-navigation-search-input search-input', 'id': 'wiki-search-input', 'placeholder': 'Search ' + mw.config.get('wgMainPageTitle') }),
            $('<ul />', { 'class': 'wiki-search-autocomplete wiki-navigation-search-autocomplete search-autocomplete' }),
        ]);
        $search.html([
            $input,
            $('<a />', {
                'href': '#',
                'class': 'wiki-search-button wiki-navigation-search-button search-button',
                'id': 'wiki-search-button',
                html: $svg,
                on: { 'click': navigation.submitSearch }
            })
        ]);
        return $search;
    };
    navigation.render = function(data){
        if (!data.error){
            var obj = JSON.parse(data);
            if ($.isEmptyObject(obj)) return;
            var $ul = navigation.create(obj, 1),
                $nav = $('<nav />', { 'class': 'wiki-navigation wiki-nav nl-wrapper' }).html($ul),
                $search = navigation.createSearch();
            $result.html([$search, $nav]);
            navigation.init($result);
        }
    };
    navigation.interact = function(event){
        event = event || window.event;
        var $nav = $('#wiki-navigation .wiki-nav');
        if (navigation.focusedState === true && [37, 38, 39,40].indexOf(event.keyCode) > -1){
            event.preventDefault();
            var $ul = $nav.find('ul.selected-nav'), $li = $nav.find('li.selected-item');
            // Left Arrow
            if (event.keyCode === 37){
                if ($ul.is('.nl-level-1')) return;
                else {
                    $ul.parent('ul').addClass('selected-nav').find('li').addClass('selected-item');
                    $ul.removeClass('selected-nav').find('li').removeClass('selected-item');
                }
            } else if (event.keyCode === 39){
                if ($ul.is('.nl-last')) return;
                else {
                    $ul.children('ul').addClass('selected-nav').find('li').addClass('selected-item');
                    $ul.removeClass('selected-nav').find('li').removeClass('selected-item');
                }
            } else if (event.keyCode === 38){
                if ($li.is(':first-child')){
                    $li.eq(-1).addClass('selected-item');
                    $li.removeClass('selected-item');
                } else {
                    $li.prev().addClass('selected-item');
                    $li.removeClass('selected-item');
                }
            } else if (event.keyCode === 40){
                if ($li.is(':last-child')){
                    $li.eq(0).addClass('selected-item');
                    $li.removeClass('selected-item');
                }
            }
        }
    };
    navigation.changeState = function(event){
        event.preventDefault();
        if (navigation.focusedState){
            navigation.focusedState = false;
            localStorage.setItem('nl_focused', false);
        } else {
            navigation.focusedState = true;
            localStorage.setItem('nl_focused', true);
        }
    };
    navigation.search = function(event){
        event.preventDefault();
        var $target = $(event.delegateTarget || event.target);
        if (!$target.is('a')){
            $target = $target.find('a');
        }
        $('#wiki-search-input').val($target.text());
    };
    navigation.submitSearch = function(event){
        
    };
    navigation.autocomplete = function(event){
        var $autocomplete = $('.wiki-search-autocomplete'), $input = $(event.target);
        $.ajax({
            method: 'GET',
            url: '/api.php',
            data: {
                action: 'opensearch',
                search: $input.val(),
                format: 'json'
            },
            success: function(data){
                if ($.isArray(data[1]) && data[1].length){
                    var items = [], terms = [].slice.call(data[1], 0, 10);
                    for (var i = 0; i < terms.length; i++){
                        var item = terms[i], $li = $('<li />', { 'class': 'wiki-search-autocomplete-item search-autocomplete-item autocomplete-item', 'data-name': mw.html.escape(item) });
                        $li.html(
                            $('<a />', {
                                'class': 'autocomplete-link wiki-search-autocomplete-link',
                                'href': '#',
                                html: mw.html.escape(item),
                                on: { 'click': navigation.search }
                            })
                        );
                        items[items.length] = $li;
                    }
                    $autocomplete.addClass('show').html(items);
                } else {
                    $autocomplete.removeClass('show').empty();
                }
            }
        });
    };
    navigation.init = function($elem){
        $wrapper.replaceWith($elem);
        $(window).on('keydown', navigation.interact);
        $('#wiki-navigation').on('click', navigation.changeState);
        $('#wiki-search-input').on('input', navigation.autocomplete);
    };
}(jQuery, mediaWiki, jQuery('#mw-content-text')));