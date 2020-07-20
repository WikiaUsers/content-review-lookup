(function(ChatView, $, _){
    var username = mw.config.get('wgUserName');
    ChatView.prototype.templates = {
        'gender': function(){
            var args = [].slice.call(arguments), gender = args[0],
                forms = args.slice(1);
            return mw.language.gender(gender, forms);
        },
        'plural': function(){
            var args = [].slice.call(arguments), count = args[0],
                forms = args.slice(1);
            return mw.language.convertPlural(Number(count), forms);
        },
        'username': function(){
            return mw.config.get('wgUserName');
        }
    };
    ChatView.prototype.emoticonMapping = new EmoticonMapping();
    ChatView.prototype.emoticonString = mw.config.get('wgChatEmoticons');
    ChatView.prototype.loadPersonalEmoticons = function(){
        var params = {
            format: 'json',
            action: 'query',
            titles: 'User:' + username + '/Emoticons',
            prop: 'revisions',
            rvprop: 'content',
            indexpageids: true
        };
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: '/api.php',
            data: params
        }).done(
            $.proxy(this.parsePersonalEmoticons, this)
        );
    };
    ChatView.prototype.parsePersonalEmoticons = function(data){
        if (data.query.pageids.indexOf('-1') > -1) return;
        var pageid = data.query.pageids[0], page = data.query.pages[pageid],
            res = [this.emoticonString];
        if (page.revisions){
            var revision = page.revisions[0], string = revision['*'].trim();
            string = string.replace(/<!--[\s\S]*?-->/gm, '');
            res[res.length] = string;
        }
        this.emoticonString = res.join('\n');
    };
    ChatView.prototype.initialize = function(options){
        this.loadPersonalEmoticons();
        _.bindAll(this, 'render');
        if (this.model) this.model.bind('all', this.render);
        
        this.emoticonMapping.loadFromWikiText(this.emoticonString);
    };
    ChatView.prototype.processText = function(text, allowHtml){
        var context = this;
        if (!allowHtml) text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        var localWikiLinkReg = '^' + mw.config.get('wgServer') + mw.config.get('wgArticlePath');
        localWikiLinkReg = localWikiLinkReg.replace(/\$1/, '(\\S+[^.\\s\\?\\,])');
        localWikiLinkReg = new RegExp(localWikiLinkReg, 'i');
        
        if (!allowHtml){
            var exp = /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig;
            text = text.replace(exp, function(link){
                var linkName = link;
                
                var match = localWikiLinkReg.exec(link);
                if (match !== null) linkName = match[1].replace(/_/g, ' ');
                try {
                    linkName = decodeURIComponent(linkName);
                } catch(e){
                    return '';
                }
                return $('<a>', {
                    'href': link,
                    text: linkName
                }).prop('outerHTML');
            });
        }
        
        function linkify(article, linkText){
            article = article.replace(/\s+/g, '_');
            linkText = linkText.replace(/_/g, ' ');
            linkText = decodeURIComponent(linkText);
            
            var path = mw.config.get('wgServer') + mw.config.get('wgArticlePath');
            article = encodeURIComponent(article);
            article = article.replace(/%2f/gi, '/');
            article = article.replace(/%3a/gi, ':');
            var url = path.replace('$1', article);
            
            return $('<a>', {
                'href': url,
                text: linkText
            }).prop('outerHTML');
        }
        
        function templatify(name, value){
            if (typeof value === 'undefined') value = '';
            value = value.indexOf('|') > -1 ? value.split('|') : [value];
            var rv = context.templates[name].apply(context, value);
            if (typeof rv === 'undefined') return '';
            return rv;
        }
        
        var exp1 = /\[\[([^\[\|\]\r\n\t]*)\|([^\[\]\|\r\n\t]*)\]\]/ig;
        text = text.replace(exp1, function(match, article, linkText){
            if (!linkText){
                var colonPos = article.indexOf(':');
                if (colonPos === -1) linkText = article;
                else linkText = article.substring(colonPos + 1);
            }
            return linkify(article, linkText);
        });
        
        var exp2 = /(\[\[[^\[\]\r\n\t]*\]\])/ig;
        text = text.replace(exp2, function(match){
            var article = match.substr(2, match.length - 4),
                linkText = article.replace(/_/g, ' ');
            return linkify(article, linkText);
        });
        
        var exp3 = /\{\{([^\{\|\}\r\n\t]*)\|([^\[\]\r\n\t]*)\}\}/ig;
        text = text.replace(exp3, function(match, name, value){
            name = name.toLowerCase();
            if (!context.templates.hasOwnProperty(name)) return match;
            return templatify(name, value);
        });
        
        var exp4 = /(\{\{[^\{\}\r\n\t]*\}\})/gi;
        text = text.replace(exp4, function(match){
            var name = match.substr(2, match.length - 4).toLowerCase();
            if (!context.templates.hasOwnProperty(name)) return match;
            return templatify(name);
        });
        
        text = WikiaEmoticons.doReplacements(text, this.emoticonMapping);
    };
}(this.ChatView, this.jQuery, this._));