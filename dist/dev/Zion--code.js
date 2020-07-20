(function (window, document, mw) {
    if ('ActiveXObject' in window) {
        var commandments = [
            'Commandments:',
            '\tThou shalt not steal time from developers supporting your terrible browser.',
            '\tThou shalt not complain when things don\'t work.',
            '\tThou shalt not complain to others when you can fix your own problem.',
            '\tThou shalt not be a complete burden on everyone by using Internet Explorer.',
            '\tThou shalt change to Firefox or Chrome.',
            '\tWe shalt also accept Edge but why would you do that to yourself?'
        ];
        
        console.log(commandments.join('\n'));
        return;
    }
    
    var ZION = function () {
        this._scripts = [];
        this.loaded = this.loaded();
        
        return this;
    };

    ZION.prototype._getScriptURL = function (script) {
        var split = script.split(':');

        if (split.length === 0) return null;

        if (split.length >= 1) {
            if (split[0] === 'u') {
                split.shift();

                var server = split.shift(),
                    page   = split.join(':');
                return '//' + server + '.wikia.com/wiki/' + page + '?action=raw&ctype=text/javascript';
            } else {
                var page = (split.length > 1) ? split.join(':') : split[0];
                return mw.config.get('wgServer') + '/wiki/' + page + '?action=raw&ctype=text/javascript'; 
            }
        }
    };

    ZION.prototype._loadScript = function (script) {
        var node = document.createElement('script');
        var src  = this._getScriptURL(script);

        if (src === null) this.loaded.fire();

        node.setAttribute('src', src);
        node.setAttribute('async', 'true');
        document.body.appendChild(node);
    };

    ZION.prototype.load = function (scripts) {
        if (typeof scripts !== undefined) {
            if (Array.isArray(scripts)) {
                this._scripts = scripts;
            } else {
                this._scripts = [scripts];
            }
            
            this.loaded.fire();
        }
    };

    ZION.prototype.loaded = function () {
        return mw.hook('ZION.loaded').add(function () {
            if (this._scripts.length === 0) return;

            this._loadScript(this._scripts.shift());
        }.bind(this));
    };

    if (window.ZION !== undefined) return;

    window.ZION = new ZION();
}(window, document, mw));