require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(wk, wd, $, mw){
    if ("ChatDashboard" in wk) return;
    function ChatDashboard(config){
        if (typeof config === "string") config = { id: config };
        ChatDashboard.__getDefaultConfig(config);
        this.id = config.id;
        if (!ChatDashboard.__isset(this.id)){
            return "An ID is required for the Dashboard to work!";
        }
        this.heading = config.heading;
        this.defaultIndex = config.defaultIndex;
        this.sections = [].concat(config.sections);
        this.currentIndex = this.defaultIndex;
        this.state = {};
        this.flags = {};
        this.settings = {};
        this.opened = false;
        return this.__convertSections();
    }
    ChatDashboard.__isset = function(value){
        var A = [];
        A.push(function(x){ return x !== void 0; });
        A.push(function(x){ return x !== null; });
        A.push(function(x){ return x !== ""; });
        return A.every(function(f){ return f(value); });
    };
    ChatDashboard.__getDefaultConfig = function(config){
        var O = { heading: "", defaultIndex: 0, sections: [] };
        for (var key in O) (key in config && ChatDashboard.__isset(config[key])) ? null : (config[key] = O[key]);
    };
    ChatDashboard.prototype.__setState = function(state){
        var O = Object.assign({}, state);
        this.state = O;
        return this;
    };
    ChatDashboard.prototype.__seek = function(index){
        index = Number(index);
        if (index < 0) index = this.sections.length + index;
        else if (isNaN(index) || !isFinite(index)) index = this.currentIndex;
        this.__update(index);
        return this;
    };
    ChatDashboard.prototype.__update = function(index){
        if (index === this.currentIndex) return;
        this.sections[this.currentIndex].unselect();
        this.sections[index].select();
        this.currentIndex = index;
        return this;
    };
    ChatDashboard.prototype.__log = function(statement){
        if (!ChatDashboard.__isset(statement)) console.log(this.state);
        else console.log(statement);
    };
    ChatDashboard.prototype.__hasSection = function(config){
        if (typeof config === "string") config = { id: config };
        return this.sections.some(function(section){
            return Object.keys(config).every(function(key){
                var value = config[key];
                return section[key] === value;
            }, this);
        }, this);
    };
    ChatDashboard.prototype.__findIndex = function(config){
        if (typeof config === "string") config = { id: config };
        return this.sections.findIndex(function(section){
            return Object.keys(config).every(function(key){
                var value = config[key];
                return section[key] === value;
            }, this);
        }, this);
    };
    ChatDashboard.prototype.__convertSections = function(){
        this.sections = this.sections.map(function(section, index){
            var O = Object.assign({}, section);
            O.index = index;
            return new ChatDashboardSection(O, this);
        }, this).filter(ChatDashboard.__isset);
        return this;
    };
    ChatDashboard.prototype.prev = function(){
        var currIndex = this.currentIndex, index = currIndex - 1;
        if (index < 0) index = this.sections.length + index;
        return this.__seek(index);
    };
    ChatDashboard.prototype.next = function(){
        var currIndex = this.currentIndex, index = currIndex + 1, lastIndex = this.sections.length - 1;
        if (index > lastIndex) index = index - this.sections.length;
        return this.__seek(index);
    };
    ChatDashboard.prototype.seek = function(index){
        var currIndex = this.currentIndex;
        if (index === currIndex) return this;
        return this.__seek(index);
    };
    ChatDashboard.prototype.addSection = function(config){
        var O = Object.assign({}, config), hasSection = this.__hasSection(O);
        if (hasSection) return false;
        O.index = this.sections.length;
        this.sections.push(new ChatDashboardSection(O, this));
        return true;
    };
    ChatDashboard.prototype.addSections = function(){
        var A = Array.from(arguments), R = [];
        if (Array.isArray(A[0])) R = R.concat(A[0]);
        else R = R.concat(A);
        return R.every(function(section){
            var O = Object.assign({}, section);
            return this.addSection(O);
        }, this);
    };
    ChatDashboard.prototype.removeSection = function(config){
        var index = this.__findIndex(config), hasSection = this.__hasSection(config);
        if (!hasSection) return false;
        this.sections.splice(index, 1);
        return true;
    };
    ChatDashboard.prototype.removeSections = function(){
        var A = Array.from(arguments), R = [];
        if (Array.isArray(A[0])) R = R.concat(A[0]);
        else R = R.concat(A);
        return R.every(function(section){
            var O = Object.assign({}, section);
            return this.removeSection(O);
        }, this);
    };
    function ChatDashboardSection(config, referrer){
        if (typeof config === "string") config = { id: config };
        ChatDashboardSection.__getDefaultConfig(config);
        this.id = config.id;
        if (!ChatDashboard.__isset(this.id)) return null;
        this.index = config.index;
        this.title = config.title;
        this.description = config.description;
        this.content = config.content;
        this.referrer = referrer;
        this.selected = false;
        return this;
    }
    ChatDashboardSection.__getDefaultConfig = function(config){
        var O = { content: "", description: "", title: "" };
        for (var key in O) (key in config && ChatDashboard.__isset(config[key])) ? null : (config[key] = O[key]);
    };
    ChatDashboardSection.prototype.__createHTML = function(){
        this.$section = $("<section>", {
            "class": "ChatDashboardSection chat-dashboard__section",
            "id": this.id,
            html: [
                (this.$heading = $("<h2>", {
                    "class": "ChatDashboardHeading chat-dashboard__heading",
                    html: $("<span>", { "class": "ChatDashboardHeadingText chat-dashboard__heading-text" })
                        .text(this.title)
                })),
                (this.$content = $("<div>", {
                    "class": "ChatDashboardContent chat-dashboard__content",
                    html: this.__generateContent(this.content)
                }))
            ]
        });
    };
    ChatDashboardSection.prototype.__createItem = function(){
        this.$listItem = $("<li>", {

        });
    };
    mw.hook("dev.chat-dashboard").fire(ChatDashboard);
    window.ChatDashboard = ChatDashboard;
});