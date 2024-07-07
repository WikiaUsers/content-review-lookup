(function($, mw, config){
    function ArticlePreview(){
        this._hooks(['dev.i18n', 'dev.colors', 'dev.wds'])
            .add(this._setup.bind(this));
    }
    
    ArticlePreview.prototype._hooks = function(hooks){
        return {
            add: function(callback){
                var index = 0, args = [];
                function insertArg(){
                    var _args = [].slice.call(arguments);
                    args.concat(_args);
                }
                while ((hook = hooks[index])){
                    mw.hook(hook).add(insertArg);
                    index++;
                }
                callback.apply(window, args);
            },
            fire: function(){
                var index = 0, args = [].slice.call(arguments);
                while ((hook = hooks[index])){
                    var value = args[index] || null;
                    mw.hook(hook).fire(value);
                }
            }
        };
    };
    
    ArticlePreview.prototype._setup = function(i18no, colors, wds){
        this.i18no = i18no;
        this.i18n = null;
        this.colors = colors;
        this.wds = wds;
        this.version = '2.4.0';
        this.articlePath = mw.config.get('wgArticlePath');
        this.pageName = mw.config.get('wgPageName');
        this.groups = mw.config.get('wgUserGroups');
        this.siteURL = mw.config.get('wgServer');
        this.patterns = {};
        this.patterns.wikiURL = /https?:\/\/(.+)\.(?:wikia|fandom)\.com/g;
        this.patterns.longURL = /^https?:\/\/(.+)\.(?:wikia|fandom)\.com\/(?:(.*))/g;
        this.patterns.shortURL = /\/(?:wiki\/|(?:index\.php&title\=))(.*)/g;
        this.patterns.urlParam1 = /(.*)[?&]((?:[a-z0-9])=(?:.*))/g;
        this.patterns.urlParam2 = /[?&](?:[a-z0-9])=(.*)/g;
        this.patterns.dataImage = /data:image\/(?:.*)/g;
        this.params = {};
        this.params.page = '';
        this.params.action = 'parse';
        this.params.format = 'json';
        this.currentSiteName = this.patterns.wikiURL.exec(this.siteURL)[1];
        this.selectors = ['#WikiaRail .rail-module', '.mw-content-text'];
        this.placeholder = 'https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png';
        this.geti18n();
    };
    
    ArticlePreview.prototype.buttons = {
        edit: {
            icon: 'pencil',
            id: 'article-preview-edit',
            link: '$link?action=edit',
            msg: 'article_preview_edit',
            show: true
        },
        history: {
            icon: 'clock',
            id: 'article-preview-history',
            link: '$link?action=history',
            msg: 'article_preview_history',
            show: true
        },
        'delete': {
            icon: 'trash',
            id: 'article-preview-delete',
            link: '$link?action=delete',
            msg: 'article_preview_delete',
            show: function(){
                return this.groups.some(function(group){
                    var adminGroups = ['content-moderator', 'sysop', 'soap', 'wiki-specialist', 'staff'];
                    return adminGroups.indexOf(group) > -1;
                });
            }
        }
    };
    
    ArticlePreview.prototype.css = $.extend(config.css, {
        '#ArticlePreview .preview-chevron': ['triangleup(menu)'],
        '#ArticlePreview .preview-wrapper': ['background(menu)'],
        '#ArticlePreview .preview-buttons .preview-button': ['text(link)'],
        '#ArticlePreview .preview-buttons .preview-button:hover': ['text(hoverlink)', 'background(hoverbg)']
    });
    
    ArticlePreview.prototype.geti18n = function(){
        $.when(this.i18no.loadMessages('ArticlePreview')).done(function(i18n){
            this.i18n = i18n;
        });
    };
    
    ArticlePreview.prototype.getLinks = function(exceptions){
        this.links = this.selectors.map(function(selector){
            return selector + ' a';
        });
        var $links = $(this.links.join(', '));
        if (Array.isArray(exceptions)){
            return $links.filter(function(index){
                return !($(this).is(exceptions.join(', ')));
            });
        } else return $links;
    };
    
    ArticlePreview.prototype.isCurrentSite = function(url){
        var siteName = this.patterns.longURL.exec(url)[1];
        return (sitename === this.currentSiteName);
    };
    
    ArticlePreview.prototype.isLong = function(url){
        return this.patterns.longLink.test(url);
    };
    
    ArticlePreview.prototype.isShort = function(url){
        var end = this.patterns.shortLink.exec(url)[1],
            isParam = this.patterns.urlParam1.test(end);
        return (this.patterns.shortLink.test(url)) && !(isParam);
    };
    
    ArticlePreview.prototype.shorten = function(url){
        var result;
        if (this.isLong(url)){
            result = '/' + this.patterns.longURL.exec(url)[1];
        } else {
            result = url;
        }
        return result;
    };
    
    ArticlePreview.prototype.lengthen = function(url){
        var result;
        if (this.isShort(url)){
            result = this.siteURL + url;
        } else {
            result = url;
        }
        return result;
    };
    
    ArticlePreview.prototype.getContent = function(event, link, callback){
        var Api = new mw.Api(),
            page = link.replace(this.patterns.shortURL, 
            (function(match, title){
                var result = '';
                if (this.patterns.urlParam1.test(title)){
                    result = this.patterns.urlParam1.exec(title)[1];
                } else result = title;
                return result;
            }).bind(this)),
            pageName = page.replace(/\_/g, ' ').replace(this.patterns.urlParam2, '');
        this.params.page = decodeURIComponent(pageName);
        $.when(Api.get(this.params)).done(callback.bind(this, event));
    };
    
    ArticlePreview.prototype.parseContent = function(event, response){
        this.$wrapper = null;
        var html = '', $html = null;
        if (typeof response.parse.text['*'] !== 'string'){
            throw new ReferenceError('The preview is not available');
        } else {
            html = response.parse.text['*'];
            $html = $('<div>').html($.parseHTML(html));
            this.parseData(event, $html);
        }
    };
    
    ArticlePreview.prototype.parseData = function(event, $code){
        var $imgElem = $code.find('img'),
            imgSrc = $imgElem.not((function(index, img){
                return this.patterns.dataImage.test($(img).attr('src'));
            }).bind(this)).eq(0).attr('src'),
            $img = null,
            $pElem = $code.find('p'),
            $p = $pElem.not(function(){
                return $(this).attr('class') !== '';
            }).eq(0).html(),
            $desc = $('<div>').addClass('article-preview-desc description')
                .attr({ 'id': 'article-preview-desc' }).html($p),
            dataImage = this.patterns.dataImage.test($imgElem.attr('src'));
        if (dataImage && this.isNew(event.target)){
            imgSrc = this.placeholder;
        }
        $img = $('<img>').addClass('article-preview-image image')
                .attr({ 'id': 'article-preview-image', 'src': imgSrc });
        this.createHTML({
            img: $img,
            desc: $desc
        });
    };
    
    ArticlePreview.prototype.createHTML = function(options){
        
    };
}(jQuery, mediaWiki, $.extend(this.ArticlePreview, {})));