;(function loadSearchButton(mw, $, mainRoom, ChatSearch){
    if (typeof mainRoom === 'undefined'){
        setInterval(function(){
            loadSearchButton(mw, $, mainRoom, ChatSearch);
        }, 500);
        return;
    }
    
    var mwValues = mw.config.get([
            'wgMainpage',
            'wgUserLanguage'
        ]);
    
    ChatSearch = $.extend(ChatSearch, {
        placement: '#ChatHeader h1.public.wordmark > a',
        position: 'after',
        closed: true,
        placeholder: 'Search ' + mwValues['wgMainpage'],
        limit: 10
    });
    
    $(document).ready(function(){
        var $search = $('<form />', {
                'class': 'ChatSearch search',
                'id': 'ChatSearch',
                'action': '/index.php?title=Special:Search'
            }),
            $placement = $(ChatSearch.placement);
        $search.html([
            $('<section />', {
                'class': 'ChatSearchContainer search-container',
                'id': 'ChatSearchContainer',
                html: [
                    $('<div />', {
                        'class': 'ChatSearchInputWrapper search-input-wrapper',
                        'id': 'ChatSearchInputWrapper',
                        html: $('<input />', {
                            'type': 'text',
                            'name': 'ChatSearch',
                            'class': 'ChatSearchInput search-input',
                            'id': 'ChatSearchInput',
                            'placeholder': ChatSearch.placeholder || ''
                        }).on('input', function(event){
                            var value = $(event.target).val(),
                                $autocomplete = $('.ChatSearchAutocomplete');
                            $.ajax({
                                method: 'GET',
                                dataType: 'json',
                                url: mw.util.wikiScript('api'),
                                data: {
                                    action: 'opensearch',
                                    search: value,
                                    limit: ChatSearch.limit,
                                    format: 'json'
                                },
                                complete: function(data){
                                    function escapeRegex(val){
                                        val = val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                                        return val;
                                    }
                                    var _list = data[1],
                                        _char = data[0],
                                        _regex = new RegExp('(' + escapeRegex(_char) + ')', 'gi');
                                    $autocomplete.html($.map(_list, function(item){
                                        var $item = $('<li />', {
                                            'class': 'autocomplete-item',
                                            'data-item': item,
                                            html: $('<a />', {
                                                'href': '#search-autocomplete',
                                                'class': 'autocomplete-link',
                                                html: function(){
                                                    var reg = item.replace(_regex, '<strong>$1</strong>');
                                                    return reg;
                                                }
                                            }).on('click', function(event){
                                                var $target = null,
                                                    $e = $(event.target);
                                                if ($e.is('.autocomplete-link')){
                                                    $target = $e;
                                                } else {
                                                    $target = $e.parents('.autocomplete-link');
                                                }
                                                
                                                $(typeof $.fn.prop !== 'undefined' ? $target.prop('hash') : $target.get(0).hash).fadeOut();
                                            })
                                        });
                                    }));
                                }
                            });
                        })
                    }),
                    $('<a />', {
                        'class': 'ChatSearchButton search-button' + (ChatSearch.closed === false ? ' submit' : ''),
                        'id': 'ChatSearchButton',
                        'href': '#ChatSearchInput',
                        html: $('<i />', {
                            'class': 'icon ion-search'
                        })
                    }).on('click', function(event){
                        event.preventDefault();
                        var $elem = $(event.target),
                            $button = null,
                            $target = null;
                        if ($elem.is('#ChatSearchButton')){
                            $button = $elem;
                        } else {
                            $button = $elem.parents('#ChatSearchButton');
                        }
                        
                        $target = $((typeof jQuery.fn.prop !== 'undefined') ? $button.prop('hash') : $button.get(0).hash);
                        if (ChatSearch.closed === true){
                            var rect = $target.get(0).getBoundingClientRect(),
                                width = rect.width,
                                $search_container = $target.parents('#ChatSearchContainer');
                            if (!$button.hasClass('submit')){
                                $target.animate({
                                    'left': '-=' + width + 'px',
                                    'opacity': 1
                                }, 500);
                                $button.off('click').addClass('submit').on('click', function(e){
                                    $('#ChatSearch').submit();
                                });
                                $('#ChatGoButton').fadeIn();
                            }
                        } else {
                            $('#ChatSearch').submit();
                        }
                    })
                ]
            }),
            $('<ul />', {
                'class': 'ChatSearchAutocomplete search-autocomplete',
                'id': 'search-autocomplete'
            }).hide()
        ]);
        
        $search.on('submit', function(event){
            event.preventDefault();
            var link = $(event.target).attr('action'),
                $input = $(event.target).find('#ChatSearchInput');
            if (['', null, undefined].indexOf($input.val()) > -1){
                return;
            } else {
                link = link + '?query=' + $input.val();
                window.open(wgServer + link, '_blank');
            }
        });
        
        switch (ChatSearch.position){
            case 'insertAfter':
            case 'after':
                $placement.after($search);
                break;
            case 'insertBefore':
            case 'before':
                $placement.before($search);
                break;
            case 'append':
                $placement.append($search);
                break;
            case 'prepend':
                $placement.prepend($search);
                break;
            case 'replace':
                $placement.replaceWith($search);
                break;
            default:
                return;
        }
    });
})(this.mediaWiki, this.jQuery, this.mainRoom, this.ChatSearch);