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
        //'council': {},
        //'emailconfirmed': {},
        //'fandom-editor': {},
        //'global-discussions-moderator': {},
        //'helper': {},
        //'imagereviewer': {},
        'interface-admin': {},
        //'request-to-be-forgotten-admin': {},
        //'restricted-login': {},
        //'restricted-login-exempt': {},
        'rollback': {},
        //'soap': {},
        //'staff': {},
        'sysop': {},
        'threadmoderator': {},
        //'translator': {},
        //'util': {},
        //'vanguard': {},
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
                $.proxy(this.init, this)
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
                    'click': $.proxy(this.click, this)
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
            action: 'query',
            list: 'allusers|groupmembers',
            augroup: obj,
            aulimit: 'max',
            gmgroups: obj,
            gmlimit: 'max'
        }).done(
            $.proxy(this.getData, this)
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
            $.each(d.users || d.query.allusers, $.proxy(function (k, v) {
                obj[v.name] = v.name;
            }, this));
        }
        if (!this.isObject(obj)) {
            return this.loadModal();
        }
        var users = Object.keys(obj).join('|');
        this.api.post({
            action: 'query',
            list: 'users|usercontribs',
            ususers: users,
            usprop: 'groups|editcount|gender|registration',
            ucuser: users,
            uclimit: 'max',
            ucprop: 'timestamp|title'
        }).done(
            $.proxy(this.loadData, this)
        );
    };
    /**
     * @method loadData
     * @description Loads the data from getData
     * @param {JSON} d - The data from getData
     * @returns {void}
     */
    LU.loadData = function (d) {
        if (d.error) {
            return;
        }
        $.each(d.query.users, $.proxy(function (k, v) {
            if (!this.data[v.name]) {
                this.data[v.name] = v;
            }
        }, this));
        $.each(d.query.usercontribs, $.proxy(function (k, v) {
            if (!this.data[v.user]) {
                return;
            }
            if (!this.data[v.user].timestamp) {
                this.data[v.user].timestamp = v.timestamp;
            }
            if (!this.data[v.user].title) {
                this.data[v.user].title = v.title;
            }
        }, this));
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
            $.proxy(this.createContent, this)
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
            $.proxy(this.getUsers, this)
        );
        $.each(this.users, $.proxy(function (k, v) {
            this.$.group.append(
                $('<option>', {
                    'text': k,
                    'value': k,
                    'selected': this.currentGroup === k ? true : false
                })
            );
        }, this));
        this.$.edits = $('#lu-edits-select');
        this.$.edits.change(
            $.proxy(this.loadModal, this)
        );
        $.each([
            '0',
            '1',
            '5',
            '10',
            '20',
            '50',
            '100'
        ], $.proxy(function (k, v) {
            this.$.edits.append(
                $('<option>', {
                    'text': this.i18n('number', v).plain(),
                    'value': v,
                    'selected': this.currentNumber === v ? true : false
                })
            );
        }, this));
        this.createRow();
        this.addContent();
    };
    /**
     * @method addContent
     * @description Adds the user data
     * @returns {void}
     */
    LU.addContent = function () {
        $.each(this.data, $.proxy(function (k, v) {
            if (this.users[this.currentGroup][v.name || k]) {
                var count = v.editcount || '0';
                if (Number(count) < Number(this.currentNumber)) {
                    return;
                }
                this.createRow(
                    v.name || k,
                    v.timestamp,
                    v.title,
                    v.userid,
                    count,
                    v.gender,
                    v.registration,
                    v.groups
                );
            }
        }, this));
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
     * @param {String} gender
     * @param {String} registration
     * @param {Array} groups
     * @returns {void}
     */
    LU.createRow = function (user, timestamp, title, id, editcount, gender, registration, groups) {
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
                        this.createLink(this.timestamp(timestamp), title)  :
                        (editcount === '0' ? 'N/A' : timestamp),
                        'last-edited'
                    ),
                    this.createItem(editcount, 'editcount'),
                    this.createItem(gender, 'gender'),
                    this.createItem(
                        registration ?
                        this.timestamp(registration) :
                        registration,
                        'registration'
                    ),
                    this.createItem(
                        groups.join(', ')
                        .replace(', *', '').replace(', user', ''),
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
                    this.createSpecialItem('gender'),
                    this.createSpecialItem('registration'),
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
     * @returns {String}
     */
    LU.createLink = function (text, href) {
        return $('<a>', {
            'text': text,
            'href': mw.util.getUrl(href)
        });
    };
    /**
     * @method timestamp
     * @description Processes timestamps
     * @param {String} time - The timestamp to process
     * @returns {String}
     */
    LU.timestamp = function (time) {
        var $time = new Date(time).toString();
        var formattedTime;
        if (this.options.time === 'timeago') {
            formattedTime = $.timeago(
                $time.slice(0, 3) + ', ' +
                $time.slice(4, 15) + ', ' +
                $time.slice(16, 24)
            );
        } else if (this.options.time === 'utc') {
            $time = new Date(time).toUTCString();
            formattedTime = $time.slice(0, 3) + ', ' +
                $time.slice(4, 16) + ', ' +
                $time.slice(17, 25) + ' (' +
                $time.slice(26) + ')';
        } else {
            formattedTime = $time.slice(0, 3) + ', ' +
                $time.slice(4, 15) + ', ' +
                $time.slice(16, 24) + ' ' +
                $time.slice(34);
        }
        return formattedTime;
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
        $.proxy(LU.preload, LU)
    );
    mw.hook('dev.i18n').add(
        $.proxy(LU.preload, LU)
    );
    mw.hook('dev.modal').add(
        $.proxy(LU.preload, LU)
    );
    mw.hook('dev.placement').add(
        $.proxy(LU.preload, LU)
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