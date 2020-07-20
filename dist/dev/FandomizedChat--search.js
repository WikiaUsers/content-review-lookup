(function($, mw, mainRoom, FandomizedChat){
    function ChatSearch(mainRoom, i18n){
        this.id = 'ChatSearch';
        this.searchLink = '/index.php?title=Special:Search&query=';
        this.goLink = '/index.php?title=';
        this.loaded = $.Deferred();
        this.namespaceId = 0;
        this.namespace = '';
        this.limit = 15;
        this.wgNamespaces = mw.config.get('wgFormattedNamespaces');
        this.siteName = mw.config.get('wgSiteName');
        this.namespaces = this.getNamespaces();
        this.param = {};
        this.param.action = 'opensearch';
        this.param.limit = this.limit;
        this.searchText = '';
        this.autocomplete = null;
        this.i18n = null;
        this.wds = null;
        this.loadi18n();
        this.loadWDS();
        this.message = typeof window.FandomizedChat !== 'undefined' ? 'FandomizedChat' : 'ChatSearch';
    }
    
    ChatSearch.prototype.loadi18n = function(){
        mw.hook('dev.i18n').add($.proxy(function(i18no){
            $.when(i18no.loadMessages('FandomizedChat')).done($.proxy(function(i18n){
                this.i18n = i18n;
            }, this));
        }, this));
    };
    
    ChatSearch.prototype.loadWDS = function(){
        mw.hook('dev.wds').add($.proxy(function(wds){
            this.wds = wds;
        }, this));
    };
    
    ChatSearch.prototype.formatNamespace = function(string){
        var extArr = string.split(':'), ext = extArr[0],
            name = extArr.slice(1).join(':');
        if (this.namespaceExists(ext)){
            this.namespace = ext;
            this.param.namespace = this.getNamespaceId(ext);
            this.param.search = name.trim();
        } else {
            this.namespace = '';
            this.param.namespace = this.namespaceId;
            this.param.search = string.trim();
        }
    };
    
    ChatSearch.prototype.namespaceExists = function(namespace){
        return this.namespaces.hasOwnProperty(namespace);
    };
    
    ChatSearch.prototype.getNamespaceId = function(namespace){
        return this.namespaces[namespace] || 0;
    };
    
    ChatSearch.prototype.getNamespaces = function(){
        var keys = Object.keys(this.wgNamespaces),
            index = 0, obj = {};
        while ((namespaceId = keys[index])){
            var namespace = this.wgNamespaces[namespaceId];
            obj[namespace] = namespaceId;
            index++;
        }
        return obj;
    };
    
    ChatSearch.prototype.updateSearch = function(event){
        var value = $(event.target).val(),
            Api = new mw.Api();
        this.formatNamespace(value);
        Api.get(this.param).done($.proxy(function(data){
			console.log(data);
            if (data[1].length){
                this.generate.apply(this, [value, data]);
            }
        }, this));
    };
    
    ChatSearch.prototype.generate = function(value, data){
        var queries = data[1];
        if (!queries.length) return;
        if (this.namespace !== ''){
            queries = queries.map($.proxy(function(query){
                return this.namespace + ':' + query;
            }, this));
        }
        this.autocomplete = this.createAutocomplete(value, queries);
        this.insertAutocomplete();
    };
    
    ChatSearch.prototype.createAutocomplete = function(value, queries){
        var $list = $('<ul />').addClass('ChatSearchAutocompleteList search-autocomplete-list'),
            $label = $('<section />').addClass('ChatSearchAutocompleteLabel search-autocomplete-label');
        $list.html(queries.map($.proxy(function(query){
            var text = query.replace(value, function(match, string){
                    return '<span class="search-autocomplete-highlight">' + string + '</span>';
                }),
                url = this.goLink + encodeURIComponent(query);
            return $('<li />').addClass('ChatSearchAutocompleteItem search-autocomplete-item')
                .attr('data-name', query).html(
                    $('<a />').attr('href', url).html(text).addClass('ChatSearchAutocompleteLink search-autocomplete-link')
                        .on('click', function(event){
                            event.preventDefault();
                            var link = event.target.href;
                            window.open(link, '_blank');
                        })
                );
        }, this)));
        $label.html([
            $('<div />').addClass('ChatSearchAutocompleteLabelText search-autocomplete-label-text')
                .text(this.i18n.msg('chat_search_autocomplete_label_text').plain()),
            $('<div />').addClass('ChatSearchAutocompleteValue search-autocomplete-value')
                .text(value)
        ]).on('click', $.proxy(function(){
            var link = this.searchLink + encodeURIComponent(value);
            window.open(link, '_blank');
        }, this));
        return [$list, $label];
    };
    
    ChatSearch.prototype.insertAutocomplete = function(){
        if ($('.ChatSearchAutocomplete').length){
            $('.ChatSearchAutocomplete').html(this.autocomplete);
        }
    };
    
    ChatSearch.prototype.openSearch = function(event){
        var $input = $('#' + this.id + '-input'),
            value = $input.val();
        window.open(this.searchLink + encodeURIComponent(value), '_blank');
    };
    
    ChatSearch.prototype.create = function(){
        var $search = $('<form />').addClass('ChatSearch chat-search').attr('id', this.id),
            $searchWrapper = $('<section />').addClass('ChatSearchWrapper chat-search-wrapper'),
            $autocomplete = $('<nav />').addClass('ChatSearchAutocomplete chat-search-autocomplete'),
            searchIcon = this.wds.icon('magnifying-glass', { 'class': 'chat-search-icon' });
        $searchWrapper.html([
            $('<div />').addClass('ChatSearchBar chat-search-bar')
                .html(
                    $('<input />').attr({ 'type': 'text', 'name': 'chat-search', 
                        'placeholder': this.i18n.msg('chat_search_placeholder', this.siteName).plain(),
                        'id': this.id + '-input'
                    }).addClass('ChatSearchInput chat-search-input').on('input', 
                        $.proxy(this.updateSearch, this)
                    )
                ),
            $('<div />').addClass('ChatSearchButton chat-search-button')
                .html(
                    $('<a />').attr('href', '#').html(searchIcon)
                        .on('click', $.proxy(this.openSearch, this))
                )
        ]);
        $search.html([$searchWrapper, $autocomplete]).on('click', function(event){
            if (!$(event.target).is('.ChatSearch, .ChatSearch *')){
                if ($('.ChatSearch').hasClass('active'))
                    $('.ChatSearch').removeClass('active');
            } else {
                if (!$('.ChatSearch').hasClass('active'))
                    $('.ChatSearch').addClass('active');
            }
        });
        this.search = $search;
    };
    
    ChatSearch.prototype.toElement = function(){
        return this.search;
    };
    
    ChatSearch.prototype.appendTo = function(selector, context, name){
        if (typeof context === 'string'){
            name = context;
        }
        
        if (typeof name !== 'string'){
            if (typeof context !== 'object'){
                $(selector).append(this.search);
            } else {
                $(selector, context).append(this.search);
            }
        } else {
            switch (name){
                case 'before':
                    if (typeof context !== 'object'){
                        $(selector).before(this.search);
                    } else {
                        $(selector, context).before(this.search);
                    }
                    break;
                case 'after':
                    if (typeof context !== 'object'){
                        $(selector).after(this.search);
                    } else {
                        $(selector, context).after(this.search);
                    }
                    break;
                case 'prepend':
                    if (typeof context !== 'object'){
                        $(selector).prepend(this.search);
                    } else {
                        $(selector, context).prepend(this.search);
                    }
                    break;
                case 'append':
                    if (typeof context !== 'object'){
                        $(selector).append(this.search);
                    } else {
                        $(selector, context).append(this.search);
                    }
                    break;
                default:
                    if (typeof context !== 'object'){
                        $(selector).append(this.search);
                    } else {
                        $(selector, context).append(this.search);
                    }
            }
        }
    };
    
    if (typeof window.FandomizedChat !== 'undefined'){
        window.FandomizedChat.ChatSearch = function(){
            return new ChatSearch(this.room);
        };
    } else {
        $(importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:WDSIcons/code.js'
            ]
        })).on('load', function(){
            window.ChatSearch = ChatSearch;
            mw.hook('dev.chatsearch').fire(new ChatSearch());
        });
    }
}(jQuery, mediaWiki, mainRoom, window.FandomizedChat || {}));