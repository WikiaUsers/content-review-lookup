/**
 * @name            Censor
 * @author          Ultimate Dark Carnage
 * @version         v1.0.0
 * @description     Censors bad words that were said in chat
 **/
(function(window, document, $, mw){
    if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat") return;
    // The configuration object
    const CONFIG = Object.assign({}, window.CensorConfig);
    // The main stylesheet
    const STYLESHEET = "MediaWiki:Censor.css";
    // Importing the stylesheet
    importArticle({ type: "style", article: STYLESHEET });
    // Creating the core constructor
    function Censor(options){
        if (!(this instanceof Censor)) return new Censor(options);
        options = Object.assign({}, options);
        this.page = options.page || "Badwords";
        this.incInlineAlert = options.incInlineAlert || false;
        this.badwords = [];
        this.censoredHTML = '<span class="censored-text is-censored">$1</span>';
        return this.__loadWords();
    }
    // Utility functions
    Censor.prototype.__promisify = function(deferred){
        return new Promise(function(resolve, reject){
            deferred.done(resolve).fail(reject);
        });
    };
    Censor.prototype.__escape = function(s){
        return s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
    };
    Censor.prototype.__getRoom = function(roomId){
        return mainRoom.chats.privates[roomId] || mainRoom;
    };
    Censor.prototype.__loadWords = function(){
        this.__getWords().then(this.__insertWords.bind(this));
        return this;
    };
    Censor.prototype.__insertWords = function(words){
        let word;
        while ((word = words.shift()) && words.length){
            if (this.badwords.indexOf(word) > -1) continue;
            this.badwords.push(word);
        }
    };
    Censor.prototype.__getWords = function(){
        return this.__promisify($.ajax({
            method: "GET",
            url: mw.util.wikiScript("api"),
            data: {
                action: "query",
                format: "json",
                prop: "revisions",
                rvprop: "content",
                titles: "MediaWiki:Custom-" + this.page,
                indexpageids: true
            },
            dataType: "json"
        })).then(this.__parseWords.bind(this));
    };
    Censor.prototype.__parseWords = function(response){
        let query = response.query, pages = query.pages,
            pageId = query.pageids[0];
        if ('-1' in pages) return [];
        let page = pages[pageId], revision = page.revisions[0];
        if (!revision) return [];
        let result = revision["*"], arr = [];
        result = result.match(/[^\r\n]+/g);
        return result;
    };
    // Core functions
    Censor.prototype.parse = function(text){
        let matches = text.match(this.pattern),
            result = "";
        if (!matches) return text;
        let index = 0, lastIndex = 0;
        result = text;
        while (index < this.badwords.length){
            let word = this.badwords[index];
                pattern = new RegExp('(' + this.__escape(word) + ')', 'gi');
            result = result.replace(pattern, this.censoredHTML);
            index++;
        }
        return result;
    };
    Censor.prototype.message = function(model){
        let text = model.attributes.text,
            parsed = this.parse(text),
            entry = document.getElementById('entry-' + model.cid),
            isInlineAlert = model.attributes.isInlineAlert/*,
            roomId = entry ? $(entry).closest('.Chat').attr('id').slice(5) :
                mainRoom.roomId,
            room = this.__getRoom(roomId)*/;
        if (!text || (isInlineAlert && this.incInlineAlert)) return;
        $(entry).find('.message').html(parsed);
        $(entry).find('.censored-text').each(function(_, el){
            let $el = $(el);
            $el.on("click", function(){
                event.preventDefault();
                $el.toggleClass('is-censored');
            });
        });
    };
    Censor.prototype.bind = function(fn){
        function initFn(model){
            return fn.apply(this, [model, true]);
        }
        mainRoom.model.chats.models.forEach(initFn.bind(this));
        mainRoom.model.chats.bind('afteradd', fn.bind(this));
        Object.keys(mainRoom.chats.privates).forEach(function(roomId){
            let room = mainRoom.chats.privates[roomId];
            room.model.chats.models.forEach(initFn.bind(this));
            room.model.chats.bind('afteradd', fn.bind(this));
        }, this);
        function initPriv(user){
            let roomId = user.attributes.roomId,
                room = mainRoom.chats.privates[roomId];
            room.model.chats.models.forEach(initFn.bind(this));
            room.model.chats.bind('afteradd', fn.bind(this));
        }
        mainRoom.model.privateUsers.bind('add', initPriv.bind(this));
        return this;
    };
    Censor.prototype.init = function(){
        return this.bind(this.message);
    };
    if (!window.CensorLoaded && !CONFIG.disabled){
        window.Censor = Censor;
        var Controller = new Censor(CONFIG);
        Controller.init();
        window.CensorController = Controller;
        window.CensorLoaded = true;
    }
})(window, document, this.jQuery, this.mediaWiki);