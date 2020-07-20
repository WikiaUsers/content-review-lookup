(function(window, $, mw){
    function InsertUsername($target){
        this.$elem = $target;
        this.username = mw.config.get('wgUserName');
        this.showAvatar = ['0', 'false'].indexOf(
            this.$elem.data('showAvatar') || this.$elem.$data('avatar') || 'false'
        ) === -1;
        this.bold = ['0', 'false'].indexOf(
            this.$elem.data('bold') || 'false'
        ) === -1;
        this.italic = ['0', 'false'].indexOf(
            this.$elem.data('italic') || 'false'
        ) === -1;
        this.title = new mw.Title('User:' + this.username);
        this.showLink = ['0', 'false'].indexOf(
            this.$elem.data('link') || this.$elem.data('showLink') || 'false'
        ) === -1;
        this.link = this.showLink && this.title.getUrl();
        if (this.showAvatar) this.loadAvatar();
    }
    
    InsertUsername.prototype = {
        constructor: InsertUsername,
        create: function(){
            this.$wrapper = $('<div>').addClass('wiki-username');
            this.$username = [];
            if (this.showAvatar){
                this.$avatar_wrapper = $('<div>').addClass('wiki-avatar-wrapper');
                this.$avatar = $('<img>').addClass('wiki-avatar')
                    .attr({ 'alt': this.username, 'src': this.avatar });
                this.$avatar_wrapper.html(this.$avatar);
                this.$username[this.$username.length] = this.$avatar;
            }
            
            if (this.link){
                this.$link = $('<a>').addClass('wiki-username-link')
                    .attr('href', this.link).text(this.username);
                if (this.bold) this.$link.addClass('username-bold');
                if (this.italic) this.$link.addClass('username-italic');
                this.$username[this.$username.length] = this.$link;
            } else {
                this.$text = $('<span>').addClass('wiki-username-text')
                    .text(this.username);
                if (this.bold) this.$text.addClass('username-bold');
                if (this.italic) this.$text.addClass('username-italic');
                this.$username[this.$username.length] = this.$text;
            }
            this.$wrapper.html(this.$username);
            return this;
        },
        loadAvatar: function(){
            $.getJSON('/wikia.php', {
                controller: 'UserProfilePage',
                method: 'renderUserIdentityBox',
                title: this.title.toText(),
                format: 'json'
            }).done($.proxy(function(response){
                if (response.user)
                    this.avatar = response.user.avatar;
            }, this));
        },
        insert: function(){
            this.$elem.replaceWith(this.$wrapper);
            return this;
        }
    };
    
    InsertUsername.init = function(){
        $('.username').each(function(){
            var $target = $(this),
                instance = new InsertUsername($target);
            instance.create().insert();
        });
    };
    
    return (window.InsertUsername = InsertUsername);
}(this, jQuery, mediaWiki)).init();