function ChatMedia(){
    this.image = ['png', 'gif', 'jpg', 'jpeg', 'ico', 'svg'];
    this.video = ['mp4', 'wmv', 'flv', 'avi', 'webm', 'gifv'];
    this.audio = ['ogg', 'ogv', 'oga', 'mp3'];
    this.pos = ['left', 'center', 'right'];
    this.setup.call(this);
}

ChatMedia.prototype = {
    constructor: ChatMedia,
    patterns: [
        /^\s*title\s*=\s*(.+)\s*$/i,
        /^\s*(\d{1,3})\s*(px)?\s*$/i,
        /^\s*(\d{1,3})\s*x\s*(\d{1,3})\s*(px)?\s*$/i,
        /^\s*link\s*=\s*(.+)\s*/i
    ],
    setup: function(){
        var promise = new Promise($.proxy(function(resolve, reject){
            var args = [], hooks = ['colors', 'i18n', 'wds'];
            $.each(hooks, $.proxy(function(index, key){
                mw.hook('dev.' + key).add($.proxy(function(){
                    var _args = [].slice.call(arguments);
                    args = args.concat(_args);
                }, this));
            }, this));
            if (args.length){
                resolve(args);
            } else reject();
        }, this));
        promise.then($.proxy(this.process, this));
    },
    process: function(colors, i18no, wds){
        this.i18n = null;
        this.i18no = i18no;
        this.colors = colors;
        this.wds = wds;
        this.loadI18n.call(this);
    },
    loadI18n: function(){
        var i18nPromise = new Promise($.proxy(function(resolve, reject){
            this.i18no.loadMessages('ChatMedia')
                .done(resolve).fail(reject);
        }, this));
        i18nPromise.then($.proxy(this.setI18nObject, this));
    },
    setI18nObject: function(i18n){
        this.i18n = i18n;
    },
    parse: function(message){
        this.imgObj = {};
        var index = 0, $link, $elem;
        if (message instanceof jQuery){
            $elem = message;
        } else {
            $elem = $(message);
        }
        $link = $elem.children('a[href]');
        $link.each($.proxy(function(index, element){
            this.imgObj.href = decodeURIComponent(element.href)
                .replace(mw.config.get('wgServer') + '/wiki/', '');
            if (
                !(element.innerText.includes('|')) && 
                this.imgObj.href.endsWith(element.innerText)
            ) this.imgObj.href += '|' + element.innerText;
            if (!((pattern = 
                new RegExp('^\\s*(?:' + this.getPrefixes().join('|') + 
                    ')\\s*:\\s*([^\\|\\.]+)\\.(' +
                    this.image.concat(this.audio, this.video).join('|') +
                ')\\s*', 'i'))
            ).test(this.imgObj.href)) return;
            this.imgObj.alt = pattern.exec(this.imgObj.href)[1];
            this.imgObj.ext = pattern.exec(this.imgObj.href)[2];
            this.imgObj.title = 'File:' + this.imgObj.alt + '.' + this.imgObj.ext;
            this.imgObj.href.split('|').forEach(
                $.proxy(this.fetchData, this)
            );
            this.imageLoaded = new Promise($.proxy(function(resolve, reject){
                var api = new mw.Api();
                api.get({
                    action: 'query',
                    titles: this.imgObj.title,
                    prop: 'imageinfo',
                    iiprop: 'url',
                    indexpageids: 'true',
                    format: 'json'
                }).done(resolve);
            }, this));
            this.imageLoaded.then($.proxy(this.fetchImage, this));
        }, this));
    },
    fetchData: function(item, index){
        var pattern;
        if (index === 0) return;
        else if (this.pos.includes(item))
            this.imgObj.pos = item;
        else if ((pattern = this.patterns[0]).test(item))
            this.imgObj.title = pattern.exec(item)[1];
        else if ((pattern = this.patterns[1]).test(item))
            this.imgObj.width = this.imgObj.height = pattern.exec(item)[1];
        else if ((pattern = this.patterns[2]).test(item)){
            this.imgObj.width = pattern.exec(item)[1];
            this.imgObj.height = pattern.exec(item)[2];
        } else if ((pattern = this.patterns[3]).test(item)){
            if (index + 1 == this.imgObj.href.split('|').length)
                this.imgObj.href = pattern.exec(item)[1];
            else
                this.imgObj.href += '|link=' + pattern.exec(item)[1];
        } else
            this.imgObj.alt = this.imgObj.title = item;
    },
    fetchImage: function(response){
        var pageId = response.query.pageids[0],
            pages = response.query.pages, page = pages[pageId],
            element, link = false;
        if (pageId == '-1'){
            element = $('<span>').css('color', 'red');
            element.text(this.i18n.msg('missing').escape());
            link = true;
        } else {
            if (this.image.includes(this.imgObj.ext)){
                element = $('<img>').addClass('chat-image');
                ['width', 'height', 'title', 'alt', 'src'].forEach($.proxy(function(key){
                    if (this.imgObj[key]) element.prop(key, this.imgObj[key]);
                }, this));
                link = true;
                switch (this.imgObj.pos){
                    case 'left':
                    case 'right':
                        element.css('float', this.imgObj.pos);
                        break;
                    case 'center':
                        element.css({ 'display': 'block', 'text-align': 'center' });
                        break;
                }
            } else if (this.audio.includes(this.imgObj.ext)){
                var audio = $('<audio>').attr({
                        'src': this.imgObj.src
                    }),
                    controls = '';
            }
        }
    },
    getPrefixes: function(){
        return JSON.parse(this.i18n.msg('file').plain()) || [];
    }
};