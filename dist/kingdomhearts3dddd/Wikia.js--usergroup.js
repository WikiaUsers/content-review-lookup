(function(window, $, mw, config){
    function UserGroupFilter(){
        this.usergroups = this.getUserGroups.call(this);
        this.bool = {};
        this.bool.global = this.getMode.call(this, 'global');
        this.bool.local = this.getMode.call(this, 'local');
        this.param = {};
        this.param.action = 'query';
        this.param.list = 'groupmembers';
        this.param.gmlimit = 'max';
        this.storage = $.storage.get('highlight');
        var time = (new Date()).getTime(),
            cb = Number(this.storage.age) || time,
            s = (typeof this.storage.cache === 'undefined');
        if (s || (time > +cb+21600000)){
            this.groups.forEach(function(g){
                this.cache[g] = [];
            }, this);
            this._call.apply(this, [this.groups]);
        } else {
            this.cache = this.storage.cache;
            this._generate.call(this);
        }
    }
    
    UserGroupFilter.prototype._call = function(list){
        this.param.gmgroups = list.join('|');
        var Api = new mw.Api();
        Api.get(this.param)
            .done($.proxy(this._stoore, this));
    };
    
    UserGroupFilter.prototype.
}(window, jQuery, mediaWiki, $.extend(window.usergroupConfig, {})));