(function($, mw, mainRoom){
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    function escapePattern(string){
        return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    
    function trim(string){
        return string.trim();
    }
    
    function WordFilter(){
        this.words = [];
        this.data = {};
        this.params = {};
        this.params.action = 'query';
        this.params.format = 'json';
        this.params.prop = 'revisions';
        this.params.rvprop = 'content';
        this.params.titles = 'MediaWiki:Custom-Badwords';
        this.params.indexpageids = 1;
        this.getWords();
    }
    
    WordFilter.prototype = {
        tags: {
            start: '<span class="censored">',
            end: '</span>'
        },
        getWords: function(){
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/api.php',
                data: this.params
            }).done($.proxy(function(data){
                var pages = data.query.pages;
                if (data.query.pageids['-1']) return;
                var pageid = data.query.pageids[0],
                    page = pages[pageid],
                    revisions = page.revisions;
                if (revisions){
                    var revision = revisions[0],
                        result = revision['*'].trim(),
                        words = result.split('\n');
                    this.words = words.map(trim);
                    this.getPattern();
                }
            }, this));
        },
        getPattern: function(){
            var list = this.words.join('|'),
                esc = escapePattern(list);
            this.pattern = new RegExp(esc, 'g');
        },
        getData: function(){
            if (typeof data == 'object'){
                var keys = Object.keys(data), index = 0;
                while ((key = keys[index])){
                    var value = data[key];
                    if (typeof value === 'undefined') continue;
                    this.data[key] = value;
                    index++;
                }
            }
        },
        getTargets: function(){
            this.targets = this.data.message.match(this.pattern);
        },
        removeData: function(){
            this.data = {};
        },
        replaceWords: function(){
            this.message = this.data.message.replace(this.pattern, $.proxy(function(match, word){
                return this.tag.start + word + this.tag.end;
            }, this));
        },
        updateWords: function(){
            setTimeout($.proxy(this.getWords, this), 500);
        }
    };
}(jQuery, mediaWiki, mainRoom));