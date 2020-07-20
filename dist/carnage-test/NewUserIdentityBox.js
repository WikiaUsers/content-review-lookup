(function(window, $, mw){
    var config = $.extend({}, window.masthead);
    if (config.disabled || !$('#UserProfileMasthead').length) return;
    var statuses = $.extend({}, window.mastheadStatuses),
        tabs = $.extend({}, window.mastheadTabs);
    
    function NUIB(){
        this.page = mw.config.get('wgPageName');
        this.pageTitle = this.page.replace('_', ' ');
        this.title = new mw.Title(this.pageTitle);
        this.hasMessageWall = false;
        this.profileData = {};
        this.userData = {};
        this.statuses = statuses;
    }
    
    NUIB.prototype.tabs = $.extend({
        'Profile': 'User:$1',
        'Talk Page': 'User talk:$1',
        'Message Wall': 'Message Wall:$1',
        'Blog': 'User blog:$1',
        'Contributions': 'Special:Contributions/$1',
        'Editcount': 'Special:Editcount/$1',
        'Following': 'Special:Following',
        'User Activity': 'Special:UserActivity'
    }, tabs);
    
    NUIB.prototype.toLink = function(page){
        return this.toWikiLink(page)
            .replace('/wiki/', '/index.php?title=');
    };
    
    NUIB.prototype.toWikiLink = function(page){
        var title = new mw.Title(page);
        return mw.config.get('wgServer') + title.getUrl();
    };
    
    NUIB.prototype.parseTabs = function(){
        var index = 0;
        Object.keys(this.tabs).forEach(function(name){
            var obj = {}, page = this.tabs[name];
            if (name === 'Message Wall' && !this.hasMessageWall){
                delete this.tabs[name]; return;
            } 
            if (name === 'Talk Page' && this.hasMessageWall){
                delete this.tabs[name]; return;
            }
            if ((name === 'User Activity' || name === 'Following') 
                && !this.userData.isOwner){
                delete this.tabs[name]; return;
            }
            obj.index = index;
            obj.link = this.toWikiLink(page.replace('$1', this.userData.name));
            this.tabs[name] = obj;
            index++;
        }, this);
    };
    
    NUIB.prototype.loadData = function(callback){
        $.get('/wikia.php', {
            controller: 'UserProfilePage',
            method: 'renderUserIdentityBox',
            format: 'json'
        }).always($.proxy(callback, this));
    };
    
    NUIB.prototype.parseData = function(response){
        if (response.error) return;
        this.profileData = response;
        this.isOwner = this.profileData.isUserPageOwner;
        this.isBlocked = this.profileData.isBlocked;
        this.isStaff = this.profileData.isWikiStaff;
        this.userData = this.profileData.user;
        delete this.profileData.user;
        this.userData.showBio = true;
        this.userData.showFbPage = true;
        this.userData.showTwitter = true;
        this.userData.showEdits = true;
        this.userData.showRegistration = true;
        this.userData.showTopWikis = true;
        this.userData.showTags = true;
        if (this.userData.hideEditsWikis !== '')
            this.userData.hideEditsWikis = true;
        if (this.userData.bio === null)
            this.userData.showBio = false;
        if (this.userData.fbPage === '')
            this.userData.showFbPage = false;
        if (this.userData.twitter === '')
            this.userData.showTwitter = false;
        if (this.userData.edits === 0)
            this.userData.showEdits = false;
        if (this.userData.registration === null){
            this.userData.registrationDate = 
                new Date(this.userData.registration);
            this.userData.showRegistration = false;
        }
        if (!this.userData.topWikis.length)
            this.userData.showTopWikis = false;
        if (!this.userData.tags.length)
            this.userData.showTags = false;
    };
    
    NUIB.prototype.create = function(){
        this.$masthead = $('<header>').addClass('UserPageHeader')
            .attr('id', 'UserPageHeader');
        this.$reloadURI = $('<input>').attr({
            'id': 'reloadURI',
            'type': 'hidden',
            'value': this.userData.userPage
        });
        this.$mastheadContent = $('<section>')
            .addClass('UserIdentityBox identity-box masthead')
            .attr({
                'id': 'UserIdentityBox',
                'itemscope': '',
                'itemtype': 'http://schema.org/Person'
            });
        this.$tabs = $('<nav>').addClass('ProfileTabs tabs-container');
        this.$tabItems = Object.keys(this.tabs).map(this.generateTab, this);
        this.$avatar = $('<figure>').addClass('avatar-container')
            .attr('id', 'avatar-container');
        this.$content = $('<div>').addClass('masthead-content')
            .attr('id', 'masthead-content');
        this.$sections = Object.keys(this.sections).map(this.generateSection, this);
        this.$content.html(this.$sections);
    };
    
    NUIB.prototype.generateTabs = function(tab){
        var tabObj = this.tabs[tab], index = tabObj.index,
            link = tabObj.link, name = tab,
            $tab = $('<div>').addClass('tab-item'),
            $tabLink = $('<a>').attr('href', link)
                .addClass('tab-link')
                .text(name);
        if (window.location.href === link)
            $tab.addClass('selected');
        return $tab.html($tabLink);
    };
    
    return (window.NUIB = new NUIB());
}(window, jQuery, mediaWiki)).init();