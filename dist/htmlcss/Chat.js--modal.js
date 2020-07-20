(function($, mw, window){
    function ModalWindow(){
        var title, content, buttons, callback, timeout, fade, args = [].slice.call(arguments);
        if ($.type(args[0]) === 'object'){
            title = args[0].title || '';
            content = args[0].content || '';
            id = args[0].id || '';
            buttons = args[0].buttons || [];
            callback = args[0].callback || null;
            timeout = args[0].timeout || NaN;
            fade = args[0].fade || NaN;
        } else {
            title = args[0] || '';
            id = ($.type(args[1]) === 'object' ? args[1].id : args[1]);
            content = ($.type(args[1]) === 'object' ? args[1].content : args[2]) || '';
            buttons = ($.type(args[1]) === 'object' ? args[1].buttons : args[3]) || [];
            callback = 
                ($.type(args[1]) === 'object' ? args[1].callback :
                    ($.type(args[4]) === 'function' ? args[4] : null));
            timeout = 
                ($.type(args[1]) === 'object' ? args[1].timeout : 
                    (['number', 'string'].indexOf($.type(args[4])) > -1 ? args[4] : args[5])) || NaN;
            fade =
                ($.type(args[1]) === 'object' ? args[1].fade :
                    ($.type(args[4]) !== 'function' && ['number', 'string'].indexOf($.type(args[5])) > -1 ? args[5] : args[6])) || NaN;
        }
        this.loaded = this.exists = false;
        this.opened = false;
        this.ajax = false;
        this.title = title;
        this.id = id;
        this.content = content;
        this.buttons = buttons;
        this.callback = callback;
        this.timeout = timeout;
        this.fade = fade;
        this.load = $.Deferred();
        this.loadContent = $.Deferred();
        this.symbols = {
            'close': {
                classname: 'modal-icon__close',
                type: 'path',
                path_dir: 'M 10,10 L 40,40, M 40,10, L 10,40'
            }
        };
        return this;
    }
    
    ModalWindow.prototype.getElement = function(){
        return $('<div>').addClass('modal-window-blackout modal__blackout')
            .html(
                $('<section>').addClass('modal-window modal__window').attr({
                    id: this.id,
                    'data-title': this.title,
                    'data-key': this.generate()
                }).html([
                    $('<header>').addClass('modal-window-header modal__header')
                        .html([
                            $('<h2>').addClass('modal-window-title modal-window-heading modal__heading')
                                .text(this.title),
                            $('<a>').addClass('modal-window-close modal-window-close-button modal__close')
                                .attr('href', '#')
                                .html(this.getSymbol('close'))
                                .on('click', $.proxy(this.close, this))
                        ]),
                    $('<article>').addClass('modal-window-content modal__content')
                        .html(
                            $('<div>').addClass('modal-window-content-wrapper modal-content__wrapper')
                                .html(
                                    $.type(this.content) === 'function' ? $.proxy(this.content, this) : this.content
                                )
                        ),
                    $('<footer>').addClass('modal-window-footer modal__footer')
                        .html(
                            $('<nav>').addClass('modal-window-toolbar modal__toolbar')
                                .html($.proxy(this.createButtons, this))
                        )
                ])
            ).on('click', $.proxy(function(event){
                if (!$(event.target).is('.modal__window, .modal__window *')){
                    this.close();
                }
            }, this));
    };
    
    ModalWindow.prototype.createButtons = function(){
        return $.map(this.buttons, $.proxy(function(object, index){
            return $('<a>')
                .attr({
                    'class': 'modal-toolbar-button modal-toolbar__button' + (object.isPrimary ? '' : ' modal-toolbar-secondary-button'),
                    href: object.link || '#',
                    id: object.id
                })
                .text(object.text || object.message)
                .on('click', $.proxy(function(event){
                    event.preventDefault();
                    (object.callback || object.handler).call(this, event);
                    this.close();
                }, this));
        }, this));
    };
    
    ModalWindow.prototype.generate = function(){
        var key = '', characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.+*-_&%$'.split(''),
            char_length = characters.length, result = [], max = 18;
        for (var i = 0; i < max; i++){
            var char_index = Math.floor(Math.random() * char_length),
                character = characters[char_index];
            result[result.length] = character;
        }
        return result.join('');
    };
    
    ModalWindow.prototype.getSymbol = function getSymbol(name){
        if (!this.symbols.hasOwnProperty(name)) return;
        var result;
        if (name.indexOf(' ') === -1){
            var symbol = this.symbols[name],
                $svg = $('<svg>').attr({
                    'viewbox': '0 0 50 50',
                    'xmlns': 'http://www.w3.org/2000/svg',
                    'id': 'modal-symbol__' + name,
                    'class': 'modal-symbol modal-icon ' + symbol.classname + '-wrapper'
                });
            $svg.html($.proxy(function(){
                var types = {
                    'path': $.proxy(function(){
                        return $('<path>').attr({
                            'd': symbol.path_dir,
                            'fill-rule': 'evenodd'
                        }).addClass(symbol.classname);
                    }, this)
                };
                return types[symbol.type]() || '';
            }, this));
            result = $svg;
        } else {
            var names = name.split(/\s+/g);
            result = [];
            for (var i = 0; i < names.length; i++){
                var n = names[i];
                result[result.length] = getSymbol(n);
            }
        }
        return result;
    };
    
    ModalWindow.prototype.open = function(){
        var $content = this.getElement();
        this.$selector = $('.modal-window#' + this.id);
        if (this.$selector.length && this.opened) return;
        $.when(this.load).done($.proxy(this.callback, this));
        $(document.body).append($content);
        if (!this.loaded){
            this.loaded = this.exists = true;
            this.load.resolve();
        }
        this.opened = true;
    };
    
    ModalWindow.prototype.close = function(event){
        if (typeof event !== 'undefined' && event){
            event.preventDefault();
        }
        if (this.opened && this.$selector.length){
            var $mainElement = this.$selector.parent('.modal__blackout'),
                time;
            if (isNaN(this.fade) || !this.fade){
                var time_pattern = /([\-\d\.][\d\.]*)([a-z]{1,})/g;
                if (this.fade && this.fade.match(time_pattern)){
                    time = time_pattern.exec(this.fade);
                    time = [].slice.call(time, 1).map(function(value){
                        if (isNaN(value)) return Number(value);
                        return value;
                    });
                    time = $.proxy(this.getTime, this, time_results)();
                    $mainElement.fadeOut(time);
                } else {
                    $mainElement.remove();
                }
            } else {
                time = Number(this.fade);
                $mainElement.fadeOut(time);
            }
            this.opened = false;
        }
    };
    
    ModalWindow.prototype.getTime = function(time){
        var number = Number(time[0]), measure = time[1],
            time_obj = {
                ms: function(n){
                    return n;
                },
                s: function(n){
                    return n * 1000;
                },
                m: function(n){
                    return n * (60 * 1000);
                },
                h: function(n){
                    return n * (60 * 60 * 1000);
                },
                d: function(n){
                    return n * (24 * (60 * 60 * 1000));
                },
                w: function(n){
                    return n * (7 * 24 * (60 * 60 * 1000));
                },
                mo: function(n){
                    var d = new Date(), mo, month = d.getMonth(), isLeapYear = (d.getFullYear() % 4) === 0,
                        months = [[0, 2, 4, 6, 7, 9, 11], [3, 5, 8, 10], [2]];
                    if (months[0].indexOf(month) > -1){
                        mo = 31;
                    } else if (months[1].indexOf(month) > -1){
                        mo = 30;
                    } else {
                        if (isLeapYear){
                            mo = 29;
                        } else {
                            mo = 28;
                        }
                    }
                    return n * (mo * 24 * (60 * 60 * 1000));
                },
                y: function(n){
                    var d = new Date(), isLeapYear = (d.getFullYear() % 4) === 0,
                        y = isLeapYear ? 366 : 365;
                    return n * (y * 24 * (60 * 60 * 1000));
                }
            };
        return time_obj[measure].call(this, number);
    };
    
    ModalWindow.prototype.createTimeout = function(){
        var time;
        if (isNaN(this.timeout)){
            var time_pattern = /([\-\d\.][\d\.]*)([a-z]{1,})/g;
            if (this.timeout.match(time_pattern)){
                var time_results = time_pattern.exec(this.timeout);
                time_results = [].slice.call(time_results, 1).map(function(value){
                    if (isNaN(value)) return Number(value);
                    return value;
                });
                time = $.proxy(this.getTime, this, time_results)();
            } else return;
        } else {
            time = Number(this.timeout);
        }
        
        setTimeout($.proxy(this.close, this), time);
    };
    
    ModalWindow.prototype.getContent = function(){
        if (!this.ajax) return;
        var type, url, params, callback, args = [].slice.call(arguments),
            validTypes = ['json', 'text', 'html', 'script', 'xml', 'jsonp'],
            invalidType = false;
        if ($.type(args[0]) === 'object'){
            if (['dataType', 'url', 'params', 'callback'].some((value) => args[0].hasOwnProperty(value))){
                type = args[0].dataType || 'json';
                url = args[0].url || mw.config.get('wgScriptPath') + '/api.php';
                // Parameters and callbacks are required
                params = args[0].params;
                callback = args[0].callback;
            } else {
                type = 'json';
                url = mw.config.get('wgScriptPath') + '/api.php';
                params = args[0];
                callback = args[1];
            }
        } else {
            invalidType = validTypes.indexOf(args[0]) === -1;
            type = !invalidType ? args[0] : 'json';
            url = invalidType ? args[0] : args[1];
            params = invalidType ? args[1] : args[2];
            callback = invalidType ? args[2] : args[3];
        }
        $.when(this.loadContent).done($.proxy(callback, this));
        $.ajax({
            method: 'GET',
            dataType: type,
            url: url,
            data: params
        }).done($.proxy(function(response){
            this.loadContent.resolve(response);
        }, this));
    };
    
    $(importArticle({
        type: 'style',
        article: 'MediaWiki:Chat.css/modal.css'
    })).on('load', function(){
        window.ModalWindow = ModalWindow;
        mw.hook('dev.modal').fire(window.ModalWindow);
    });
}(jQuery, mediaWiki, window));