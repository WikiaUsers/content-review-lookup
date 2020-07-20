mw.hook("fc.library").add(function(FC){
    require([
        "wikia.window",
        "wikia.document",
        "jquery",
        "mw"
    ], function(wk, wd, $, mw){
        FC.__guid = Math.floor(Math.random() * Math.pow(10, 8));
        
        FC.prototype.$chatWrapper = $(".ChatWindow #WikiaPage");
        
        FC.prototype.$wordmarkElement = $("h1.wordmark");
        
        FC.prototype.hasWordmark = function(){
            return this.$wordmarkElement.find("img:not(.chevron)").length > 0;
        };
        
        FC.prototype.getWordmark = function(){
            return this.hasWordmark() ? this.$wordmarkElement.find("img:not(.chevron)").attr("src") : null;
        };
        
        FC.prototype.createHeader = function(){
            this.__headerData = $("#ChatHeader").detach();
            this.$header = $("<header>", { "class": "fc-chat__header", "id": "fc-chat__header" });
            this.$heading = $("<h1>", { "class": "fc-chat__heading", "id": "fc-chat__heading" });
            this.$title = null;
            
            var WORDMARK = this.getWordmark();
            if (!WORDMARK){
                this.$heading.addClass("fc-title");
                this.$title = $("<span>", { "class": "fc-title__text", html: mw.config.get("wgSiteName") });
            } else {
                this.$heading.addClass("fc-wordmark");
                this.$title = $("<img>", { "class": "fc-wordmark__image", "src": WORDMARK });
            }
            
            this.$heading.html(this.$title);
            
            this.$chattopic = $("<div>", { "class": "fc-chat-topic", "id": "fc-chat-topic" });
            
            this.generateChatTopic();
        };
        
        FC.prototype.generateChatTopic = function(){
            $.when(this.getChatTopic()).done(this.addChatTopic.bind(this));
        };
        
        FC.prototype.getChatTopic = function(){
            var deferred = $.Deferred(), API = new mw.Api();
            
            API.get({
                action: "query",
                prop: "revisions",
                rvprop: "content",
                titles: "MediaWiki:Custom-Chattopic",
                format: "json",
                indexpageids: true
            }).done(function(response){
                var query = response.query, pages = query.pages, pageid = query.pageids[0];
                
                if ("-1" in pages) return deferred.reject();
                var page = pages[pageid], rev = page.revisions[0], content = rev["*"];
                
                var html = $.parseHTML(content, null, false),
                    string = $("<div>").html(html);
                    
                string = string.html();
                deferred.resolve(string);
            }).fail(deferred.reject);
            
            return deferred;
        };
        
        FC.prototype.addChatTopic = function(topic){
            this.$chattopic.html(topic);
            
            this.$user = $("<section>", { "class": "fc-user__container", "id": "fc-user__container" });
            
            var SELF = FC.getUserData(mw.config.get("wgUserName"));
        };
        
        wk.FandomizedChat = FC;
    });
});