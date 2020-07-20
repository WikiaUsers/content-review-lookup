window.AdminBox = (function(window, $, mw){
    var config = $.extend({}, window.AdminBoxConfig);
    
    function val(){
        var args = [].slice.call(arguments),
            len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    }
    
    function empty(val){ return val === ''; }
    
    function AdminBox($elem){
        this.username = val($elem.data('user'), $elem.data('username'), '');
        this.status = val($elem.data('status'), '');
        this.statuses = ['active', 'semi-active', 'inactive', 'retired', 'resigned', 'removed', 'blocked'];
        this.aliases = { statuses: {}, groups: {} };
        this.aliases.statuses.semiactive = 'semi-active';
        this.aliases.statuses.demoted = 'removed';
        this.aliases.statuses.quit = 'resigned';
        this.aliases.groups.admin = 'sysop';
        this.description = val($elem.data('description'), '');
        this.groups = val($elem.data('group'), $elem.data('groups'), '');
        this.title = val($elem.data('title'), '');
        this.signature = val($elem.data('sig'), $elem.data('signature'), '');
        this.since = val($elem.data('since'), '');
    }
    
    AdminBox.prototype = $.extend(AdminBox.prototype, {
        constructor: AdminBox,
        create: function(){
            this.$wrapper = $('<section>').addClass('admin-box');
            // User avatar
            this.$avatarContainer = $('<div>').addClass('admin-box-avatar-container');
            this.$avatarWrapper = $('<div>').addClass('admin-box-avatar-wrapper');
            this.$avatar = $('<img>').addClass('admin-box-avatar');
            // Description
            this.$descriptionContainer = $('<div>').addClass('admin-box-description-container');
            this.$userInfo = $('<header>').addClass('admin-box-user-info');
            this.$username = $('<h3>').addClass('admin-box-username');
            this.$status = $('<span>').addClass('admin-box-status');
            this.$title = $('<span>').addClass('admin-box-title');
            this.$since = $('<div>').addClass('admin-box-since');
            this.$descriptionWrapper = $('<footer>').addClass('admin-box-description-wrapper');
            this.$sigContainer = $('<div>').addClass('admin-box-sig-container');
            this.$description = $('<div>').addClass('admin-box-description');
        },
        loadInfo: function(){
            var api = new mw.Api(),
                props = ['registration', 'gender', 'editcount'];
            api.get({
                action: 'query',
                list: 'user',
                ususers: this.username,
                usprop: props.join('|'),
                format: 'json'
            }).done($.proxy(this.setInfo, this));
        }
        
    });
}(window, jQuery, mediaWiki));