/**
 * 
 * @module                  HighlightUsers.js
 * @description             Dynamic user highlighting for Fandom.
 * @author                  Bobogoobo
 * @author                  MACH-59330
 * @version                 0.3.2
 * @license                 CC-BY-SA 3.0
 * 
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    'use strict';
    
    // Script variables
    window.dev = window.dev || {};
    if (window.dev.highlightUsers) {
        return;
    }
    window.dev.highlightUsers = {};
    var config = window.highlightUsersConfig || {};

    /**
     * Script bootloader.
     * @function            highlightUsersInit
     * @requires            'mediawiki.api'
     * @private
     */
    function highlightUsersInit() {
        window.dev.highlightUsers = new HighlightUsers();
    }

    /**
     * User highlighting module.
     * @class               HighlightUsers
     * @this                window.dev.highlightUsers
     */
    function HighlightUsers() {
        // Script configuration
        this.usergroups = (function(ug) {
            return ug.global.concat(ug.local);
        }(this.registry));
        this.groups.forEach(this._validate.bind(this));
        this.bool = {
            global: this._mode.bind(this)('global'),
            local: this._mode.bind(this)('local')
        };
        // Conditional API query
        var t = new Date().getTime(),
            cb = Number(localStorage.highlightUsersAge) || t,
            s = (typeof localStorage.highlightUsersCache === 'undefined');
        if (s || (t > +cb+21600000)) {
            this.groups.forEach(function(g) {
                this.cache[g] = [];
            }, this);
            this._call.bind(this)(this.groups.join('|'));
        } else {
            this.cache = JSON.parse(localStorage.highlightUsersCache);
            this._generate.bind(this)();
        }
    }

    /**
     * API userlist callback.
     * @method              _call
     * @this                window.dev.highlightUsers
     */
    HighlightUsers.prototype._call = function(l) {
        // Fixes cache issue - "groupmembers" is hard cached serverside based on gmgroups; appending a timestamp as a url param doesn't fix it, nor does setting any headers I tried. While this is a bit hacky, this forces a uniq id into gmgroups, which forces it to fetch a unique set of data. Note: Script manually handles cache support, so this cache behavior is not wanted.
        l += "|"+Date.now()
        
        var query = {
                action: 'query',
                list: 'groupmembers',
                gmgroups: l,
                gmlimit: 'max'
            },
            api = new mw.Api();
        api.get(query)
            .done(this._store.bind(this));  
    };

    /**
     * Userlist cache.
     * @member              {Object} cache
     */
    HighlightUsers.prototype.cache = { /* users */ };
    /**
     * Usergroup cache handler.
     * @method              _store
     * @this                window.dev.highlightUsers
     */
    HighlightUsers.prototype._store = function(d) {
        if (d.error) { return; }
        d.users.forEach(function(u) {
            u.groups.forEach(function(g) {
                this.cache[g].push(u.name);
            }, this);
        }, this);
        this.groups.forEach(function(g) {
            this.cache[g] = this.cache[g].sort();
        }, this);
        localStorage.highlightUsersCache = JSON.stringify(this.cache);
        localStorage.highlightUsersAge = new Date().getTime();
        this._generate.bind(this)();
    };

    /**
     * Style highlighting generator.
     * @method              _generate
     * @this                window.dev.highlightUsers
     */
    HighlightUsers.prototype._generate = function() {
        this.styleTag = mw.util.addCSS('/* HighlightUsers styling */').ownerNode;
        this.styleTag.id = 'highlightUserStyles';
        this.groups.forEach(this._recolor.bind(this));
    };
    /**
     * Usergroup styling method.
     * @method              _recolor
     * @this                window.dev.highlightUsers
     */
    HighlightUsers.prototype._recolor = function(g) {
        var color = this.colors[g]
                ? 'color: ' + this.colors[g] + ' !important;'
                : '',
            ext   = this.styles[g] || '',
            style = color + ext,
            slxtr =
                '.WikiaPage a[href$="' +
                this.cache[g]
                     .map(mw.util.wikiUrlencode)
                    .join('"],\n.WikiaPage a[href$="') +
                '"]';
        if (
            this.bool.local &&
            this.registry.local.indexOf(g) !== -1
        ) {
            style += ' font-weight: bold;';
        }
        $(this.styleTag).text(function(_, t) {
            return t + '\n\n' + slxtr + ' {' + style + '}';
        });
    };

    /**
     * Usergroup colors.
     * @member              {Object} colors
     */
    HighlightUsers.prototype.colors = typeof config.colors === 'object'
        ? config.colors
        : {};
    /**
     * Usergroup list for prioritization.
     * @member              {Array} groups
     */
    HighlightUsers.prototype.groups = Object
        .keys(HighlightUsers.prototype.colors)
        .reverse();

    /**
     * Custom usergroup styles.
     * @member              {Object} styles
     */
    HighlightUsers.prototype.styles = typeof config.styles === 'object'
        ? config.styles
        : {};

    /**
     * Configuration validator.
     * @method              _validate
     * @this                window.dev.highlightUsers
     */
    HighlightUsers.prototype._validate = function(g) {
        var groupIsValid = this.usergroups.includes(g);
        if (!groupIsValid) {
            delete this.colors[g];
            this.groups.splice(this.groups.indexOf(g), 1);
        }
    };

    /**
     * Local/global mode boolean generator.
     * @method              _mode
     * @this                window.dev.highlightUsers
     */
    HighlightUsers.prototype._mode = function(ug) {
        return this.groups.some(function(g) {
            return this.registry[ug].includes(g);
        }, this);
    };

    /**
     * Usergroup registry - lists all rights.
     * @member              {Object} registry
     */
    HighlightUsers.prototype.registry = {
        global: [
            'staff',
            'helper',
            'wiki-representative',
            'wiki-specialist',
            'soap',
            'global-discussions-moderator',
            'voldev',
            'vanguard',
            'content-volunteer',
            'council',
            'bot-global'
        ],
        local: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'threadmoderator',
            'chatmoderator',
            'rollback',
            'bot'
        ]
    };

    // Script initialiser
    mw.loader.using('mediawiki.api').then(highlightUsersInit);

});