/**
 * @name            PortableListUsers
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @author          Ursuul
 * @description     Alternative to Special:ListUsers.
 * @protect         <nowiki>
 */
(function () {
    'use strict';
    if (window.PortableListUsersLoaded) {
        return;
    }
    window.PortableListUsersLoaded = true;
    /**
     * @class LU
     * @classdesc Central PortableListUsers class
     */
    var LU = {};
    /**
     * @type {Number}
     * @description Number of script preloads
     */
    LU.preloads = 4;
    /**
     * @type {Object}.{Object}
     * @description User groups
     */
    LU.users = {
        //'authenticated': {},
        'bot': {},
        //'bot-global': {},
        'bureaucrat': {},
        'checkuser': {},
        'content-moderator': {},
        //'content-reviewer': {},
        //'content-volunteer': {},
        //'emailconfirmed': {},
        //'fandom-editor': {},
        //'fandom-star': {},        
        //'global-discussions-moderator': {},
        //'imagereviewer': {},
        //'notifications-cms-user': {},
        //'request-to-be-forgotten-admin': {},
        //'restricted-login': {},
        //'restricted-login-exempt': {},
        'rollback': {},
        //'sensitive-tool-access': {},        
        //'soap': {},
        //'staff': {},
        'sysop': {},
        'threadmoderator': {},
        //'translator': {},
        //'util': {},
        //'voldev': {},
        //'wiki-representative': {},
        //'wiki-specialist': {}
    };
    /**
     * @type {Object}.{Object}
     * @description Object for storing user data
     */
    LU.data = {};
    /**
     * @type {Object}
     * @description Object for storing cached jQuery values
     */
    LU.$ = {};
    /**
     * @type {Object}
     * @description Script configuration options
     */
    LU.options = $.extend(
        {
            avatars: true,
            editcount: '0',
            landing: 'sysop',
            storage: false,
            time: 'timeago'
        },
        window.PortableListUsers
    );
    LU.mobileModules = mw.loader
        .getModuleNames()
        .filter(function(module) {
            return module.indexOf('isTouchScreen') === 0;
        });
    /**
     * @method preload
     * @description Preloads the script
     * @returns {void}
     */
    LU.preload = function () {
        if (--this.preloads === 0) {
            this.api = new mw.Api();
            window.dev.i18n.loadMessages('PortableListUsers').then(
                this.init.bind(this)
            );
        }
    };
    /**
     * @method init
     * @description Adds the link
     * @param {Object} i18n - Data from I18n-js
     * @returns {void}
     */
    LU.init = function (i18n) {
        this.i18n = i18n.msg;
        if (this.mobileModules.length === 1) {
            this.mobile = mw.loader.require(LU.mobileModules[0])
                .isTouchScreen();
        }
        window.dev.placement.loader.util({
            script: 'PortableListUsers',
            element: 'tools',
            type: 'prepend',
            content: $('<li>', {
                'id': 'lu-link'
            }).append(
                $('<a>', {
                    'text': this.i18n('title').plain(),
                    'click': this.click.bind(this)
                })
            )
        });
    };
    /**
     * @method click
     * @description Displays the modal/spinner
     * @returns {void}
     */
    LU.click = function () {
        if (this.modal) {
            this.modal.show();
        } else {
            $('<div>', {
                'id': 'lu-throbber',
                'html': '<svg class="wds-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width="3"stroke-dasharray="238.76104167282426" stroke-dashoffset="238.76104167282426"stroke-linecap="round" r="38"></circle></g></svg>'
            }).appendTo(document.body);
            this.$.spinner = $('#lu-throbber');
            this.getUsers();
        }
    };
    /**
     * @method getUsers
     * @description Gets all members of a usergroup
     * @returns {Function|void}
     */
    LU.getUsers = function () {
        this.$.spinner.show();
        var val1 = $('#lu-group-select').val();
        var sto = localStorage.getItem('PortableListUsers');
        if (val1) {
            this.currentGroup = val1;
        } else {
            if (this.options.storage && sto) {
                this.currentGroup = sto.split('|')[0];
            } else {
                this.currentGroup = this.options.landing;
            }
        }
        var val2 = $('#lu-edits-select').val();
        if (val2) {
            this.currentNumber = val2;
        } else {
            if (this.options.storage && sto) {
                this.currentNumber = sto.split('|')[1];
            } else {
                this.currentNumber = this.options.editcount;
            }
        }
        this.setStorage();
        var obj = this.currentGroup;
        if (this.isObject(this.users[obj])) {
            return this.getData();
        }
        this.api.get({
            action: 'listuserssearchuser',
            groups: obj,
            contributed: 0,
            limit: 5000,
            order: 'ts_edit',
            sort: 'desc',
            offset: 0,
            uselang: 'en'
        }).done(
            this.getData.bind(this)
        );
    };
    /**
     * @method setStorage
     * @description Resets the localStorage
     * @returns {void}
     */
    LU.setStorage = function () {
        if (this.options.storage) {
            localStorage.setItem(
                'PortableListUsers',
                this.currentGroup + '|' + this.currentNumber
            );
        }
    };
    /**
     * @method isObject
     * @description Tests to see if the object is empty
     * @param {Object} obj - The object to test
     * @returns {Boolean}
     */
    LU.isObject = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @method getData
     * @description Processes usergroup data and gets more data
     * @param {JSON} d - Data from getUsers
     * @returns {Function|void}
     */
    LU.getData = function (d) {
        var obj = this.users[this.currentGroup];
        if (d) {
            if (d.error) {
                return;
            }
            $.each(d.listuserssearchuser, (function (k, v) {
                obj[v.username] = v.username;
                if (!this.data[v.username]) {
                    this.data[v.username] = v;
                }
            }).bind(this));
        }
        this.loadModal();
    };
    /**
     * @method loadModal
     * @description Updates/creates the modal
     * @returns {void}
     */
    LU.loadModal = function () {
        if (this.modal) {
            this.currentNumber = this.$.edits.val() || this.options.editcount;
            this.setStorage();
            this.$.list.html('');
            this.createRow();
            this.addContent();
        } else {
            this.createModal();
        }
    };
    /**
     * @method createModal
     * @description Creates the script modal
     * @returns {void}
     */
    LU.createModal = function () {
        this.modal = new window.dev.modal.Modal({
            content: $('<div>', {
                'class':
                    'list-users list-users-' +
                    (this.mobile ? 'mobile' : 'desktop')
            }).append(
                this.createSelect('group'),
                this.createSelect('edits'),
                $('<span>', {
                    'id': 'lu-tally'
                }),
                $(this.mobile ? '<ul>' : '<table>', {
                    'class': this.mobile ? '' : 'article-table',
                    'id': this.mobile ? 'lu-list' : 'lu-table'
                })
            ).prop('outerHTML'),
            id: 'list-users',
            size: 'large',
            title: this.i18n('title').plain()
        });
        this.modal.create().then(
            this.createContent.bind(this)
        );
        this.modal.show();
    };
    /**
     * @method createContent
     * @description Creates the modal's main content
     * @returns {void}
     */
    LU.createContent = function () {
        this.$.list = $(this.mobile ? '#lu-list' : '#lu-table');
        this.$.group = $('#lu-group-select');
        this.$.group.change(
            this.getUsers.bind(this)
        );
        $.each(this.users, (function (k, v) {
            this.$.group.append(
                $('<option>', {
                    'text': k,
                    'value': k,
                    'selected': this.currentGroup === k ? true : false
                })
            );
        }).bind(this));
        this.$.edits = $('#lu-edits-select');
        this.$.edits.change(
            this.loadModal.bind(this)
        );
        $.each([
            '0',
            '1',
            '5',
            '10',
            '20',
            '50',
            '100'
        ], (function (k, v) {
            this.$.edits.append(
                $('<option>', {
                    'text': this.i18n('number', v).plain(),
                    'value': v,
                    'selected': this.currentNumber === v ? true : false
                })
            );
        }).bind(this));
        this.createRow();
        this.addContent();
    };
    /**
     * @method addContent
     * @description Adds the user data
     * @returns {void}
     */
    LU.addContent = function () {
        $.each(this.data, (function (k, v) {
            if (this.users[this.currentGroup][v.username || k]) {
                var count = v.edit_count || '0';
                if (Number(count) < Number(this.currentNumber)) {
                    return;
                }
                this.createRow(
                    v.username || k,
                    v.last_edit_date,
                    v.diff_edit_url,
                    v.user_id,
                    count,
                    v.groups
                );
            }
        }).bind(this));
        $('#lu-tally').html(
            this.i18n(
                'tally',
                this.mobile ?
                this.$.list.find('li').length :
                (this.$.list.find('tr').length -1)
            ).plain()
        );
        $('img#lu-avatar').each(function () {
            $(this).on('error', function () {
                $(this).attr(
                    'src',
                    'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest'
                );
            });
        });
        this.$.spinner.hide();
    };
    /**
     * @method createRow
     * @description Creates a table row or list item
     * @param {String} user
     * @param {String} timestamp
     * @param {String} title
     * @param {String} id
     * @param {Number|String} editcount
     * @param {Array} groups
     * @returns {void}
     */
    LU.createRow = function (user, timestamp, title, id, editcount, groups) {
        var item = this.mobile ? '<li>' : '<tr>';
        if (user) {
            this.$.list.append(
                $(item).append(
                    this.createItem(
                        $('<span>').append(
                            this.createLink(user, 'User:' + user),
                            ' (',
                            this.createLink(
                                this.i18n('talk').plain(),
                                'User talk:' + user
                            ),
                            ' | ',
                            this.createLink(
                                this.i18n('contribs').plain(),
                                'Special:Contributions/' + user
                            ),
                            ')'
                        ),
                        'user'
                    ),
                    this.createItem(
                        timestamp ?
                        this.createLink(this.timestamp(timestamp), title, false) :
                        (editcount === '0' ? 'N/A' : timestamp),
                        'last-edited'
                    ),
                    this.createItem(editcount, 'editcount'),
                    this.createItem(
                        groups
                        .replace(', *', '').replace(', user', '')
                        .replace('*, ', '').replace('user, ', ''),
                        'groups'
                    ),
                    this.createItem(
                        id ? $('<img>', {
                            'src':
                                'https://services.fandom.com/user-avatar/user/' +
                                id + '/avatar',
                            'id': 'lu-avatar'
                        }) : id,
                        'avatar'
                    )
                )
            );
        } else if (!this.mobile) {
            this.$.list.append(
                $(item, {
                    'id': 'lu-table-first'
                }).append(
                    this.createSpecialItem('user'),
                    this.createSpecialItem('last-edited'),
                    this.createSpecialItem('editcount'),
                    this.createSpecialItem('groups'),
                    this.createSpecialItem('avatar')
                )
            );
        }
    };
    /**
     * @method createItem
     * @description Creates a div or td item
     * @param {String} html - The item's HTML
     * @param {String} id - The item's id
     * @returns {String}
     */
    LU.createItem = function (html, id) {
        if (this.mobile) {
            return $('<div>', {
                'id': 'lu-list-' + id,
                'html': html || this.i18n('unknown').plain()
            }).prepend(
                /user|groups|avatar/.test(id) ?
                '' :
                ('<b>' + this.i18n(id).escape() + '</b><br/>')
            );
        } else {
            if (id === 'avatar' && !this.options.avatars) {
                return;
            }
            return $('<td>', {
                'html': html || this.i18n('unknown').plain()
            });
        }
    };
    /**
     * @method createSpecialItem
     * @description Creates a different td item
     * @param {String} msg - The text
     * @returns {String}
     */
    LU.createSpecialItem = function (msg) {
        if (msg === 'avatar' && !this.options.avatars) {
            return;
        }
        return $('<th>', {
            'html': this.i18n(msg).plain()
        });
    };
    /**
     * @method createSelect
     * @description Creates a select item
     * @param {String} id - The select's id
     * @returns {String}
     */
    LU.createSelect = function (id) {
        return $('<select>', {
            'id': 'lu-' + id + '-select'
        });
    };
    /**
     * @method createLink
     * @description Creates an a item
     * @param {String} text - The link text
     * @param {String} href - The link href
     * @param {boolean} isTitle - Whether or not util.getUrl should be called (defaults true)
     * @returns {String}
     */
    LU.createLink = function (text, href, isTitle) {
        return $('<a>', {
            'text': text,
            'href': isTitle !== false ? mw.util.getUrl(href) : href
        });
    };
    /**
     * @method timeAgo 
     * @description Reimplements $.timeago due to a bug that prevents dates from > 1 month ago
     * @param {Date} time - The time to compare to
     * @returns {String}
     */
    LU.timeAgo = function (time) {
        var millis = (new Date()).getTime() - time.getTime();
        var isFuture = millis < 0 ? 1 : 0;
        var seconds = millis / 1e3,     // r
            minutes = seconds / 60,     // n
            hours = minutes / 60,       // i
            days = hours / 24,          // a
            years = days / 365;         // o
        function msg (key, arg) {
            return mw.message('timeago-' + key + (isFuture ? '-from-now' : ''), arg).text();
        }
        return seconds < 45 && msg('second', Math.round(seconds)) ||
            seconds < 90 && msg('minute', 1) ||
            minutes < 45 && msg('minute', Math.round(minutes)) ||
            minutes < 90 && msg('hour', 1) ||
            hours < 24 && msg('hour', Math.round(hours)) ||
            hours < 48 && msg('day', 1) ||
            days < 30 && msg('day', Math.floor(days)) ||
            days < 60 && msg('month', 1) ||
            days < 365 && msg('month', Math.floor(days / 30)) ||
            years < 2 && msg('year', 1) ||
            msg('year', Math.floor(years));
    };
    /** 
     * @method timestamp
     * @description Parses and reformats the timestamp provided by the API
     * @param {String} time - The timestamp to parse
     * @returns {Date}
     */
    LU.timestamp = function (timestamp) {
        if (this.options.time === 'timeago') {
            return this.timeAgo(new Date(timestamp.replace(/,/g, '')));
        } else {
            return timestamp;
        }
    };
    var packages = [
        'mediawiki.api',
        'mediawiki.util'
    ];
    if (LU.mobileModules.length === 1) {
        packages.push(LU.mobileModules[0]);
    } else {
        LU.mobile = false;
    }
    mw.loader.using(packages).then(
        LU.preload.bind(LU)
    );
    mw.hook('dev.i18n').add(
        LU.preload.bind(LU)
    );
    mw.hook('dev.modal').add(
        LU.preload.bind(LU)
    );
    mw.hook('dev.placement').add(
        LU.preload.bind(LU)
    );
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:Placement.js'
        ]
    });
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:PortableListUsers.css'
    });
})();