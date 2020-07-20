require(['wikia.window', 'mw'], function (context, mw) {
    // Script variables
    if (
        window.cmiLoaded ||
        wgCanonicalSpecialPageName !== 'Chat'
    ) {
        return;
    }
    window.cmiLoaded = true;

    // Icon CSS import
    importArticle({
        type: 'style',
        articles: (function(s) {
            if (window.ClassicModIcons)
                s.push('u:dev:MediaWiki:ClassicModIcons.css');
            return s;
        }(['u:dev:MediaWiki:CustomModIcons.css']))
    });

    // Custom mod icons
    var cmi = {
        // Main chat function
        main: function(mainRoom) {
            // Status class delegation
            mainRoom.socket.bind('initial', $.proxy(this.rdr, this));
            mainRoom.model.users.bind('add', this.mdl);
            mainRoom.model.privateUsers.bind('add', this.mdl);
            mainRoom.socket.bind('updateUser', $.proxy(this.uu, this));
        },
        // Status update event
        uu: function(e) {
            if (JSON.parse(e.data).attrs.name === mainRoom.userMain.get('name')) {
                this.uh();
            }
        },
        // Updates classes in the chat header
        uh: function() {
            $('#ChatHeader .User').addClass(mainRoom.userMain.attributes.groups.join(' '));
        },
        // Userlist class renderer.
        rdr: function() {
            mainRoom.model.users.models.forEach(this.mdl);
            mainRoom.model.privateUsers.models.forEach(this.mdl);
            this.uh();
        },
        // User model class handler for usergroups. 
        mdl: function(m) {
            $(m.view.el).addClass(m.attributes.groups.join(' '));
        }
    };
    
    // Script loader
    mw.hook('dev.chat.socket').add($.proxy(cmi.main, cmi));
    importArticle({ type: 'script', article: 'u:dev:Chat-js.js' });
});