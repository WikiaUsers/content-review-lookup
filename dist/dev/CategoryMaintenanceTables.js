// CategoryMaintenanceTable
// Generates copy paste-able text from Special:WantedCategories and 
// Special:Categories, at a click of a button

;(function($, mw) {
	'use strict';
    if (mw.config.get('wgNamespaceNumber') !== -1) return;
    if (!['Categories', 'Wantedcategories'].includes(mw.config.get('wgCanonicalSpecialPageName'))) return;

    var api = new mw.Api();
    var msg;
    var cmt = {};
    cmt.getCategories = function(next) {
        return api.get({
            action: 'query',
            list: 'allcategories',
            acprop: 'size',
            aclimit: 500,
            accontinue: next || undefined
        });
    };

    cmt.getWantedCategories = function(next) {
        return api.get({
            action: 'query',
            list: 'querypage',
            qppage: 'Wantedcategories',
            qplimit: 500,
            qpoffset: next || undefined
        });
    };

    cmt.getAllCategories = function() {
        return new Promise(function(resolve, reject) {
            var next = '';
            var allCategories = [];
            function repeat() {
                cmt.getCategories(next).then(function(res) {
                    var newCategories = res.query.allcategories.map(function(cat) {
                        return [cat['*'], cat.size];
                    });
                    allCategories = allCategories.concat(newCategories);
                    if (res.continue && res.continue.accontinue) {
                        next = res.continue.accontinue;
                        repeat();
                    } else {
                        resolve(allCategories);
                    }
                }, function(err) {
                    reject(err);
                });
            }
            repeat();
        });
    };

    cmt.getAllWantedCategories = function() {
        return new Promise(function(resolve, reject) {
            var next = '';
            var allCategories = [];
            function repeat() {
                cmt.getWantedCategories(next).then(function(res) {
                    var newCategories = res.query.querypage.results.map(function(cat) {
                        return [cat.title.replace(/^Category:/, ''), cat.value];
                    });
                    allCategories = allCategories.concat(newCategories);
                    if (res.continue && res.continue.qpoffset) {
                        next = res.continue.qpoffset;
                        repeat();
                    } else {
                        resolve(allCategories);
                    }
                }, function(err) {
                    reject(err);
                });
            }
            repeat();
        });
    };

    cmt.table = function(data) {
        return '<table class="article-table" style="font-size:11px"><thead><tr>' +
                    '<th>' + msg('category-header').escape() + '</th>' +
                    '<th>' + msg('link-header').escape() + '</th>' +
                    '<th>' + msg('number-of-members-header').escape() + '</th>' +
                '</tr></thead>' +
                '<tbody>' +
                    data.map(function(els) {
                        return '<tr><td>' + els[0] + '</td>' +
                            '<td>' + mw.config.get('wgServer') +
                            mw.config.get('wgScriptPath') + '/wiki/Category:' +
                            els[0].replace(/ /g, '_') + '</td>' +
                            '<td>' + els[1] + '</td></tr>';
                    }).join('') +
            '</tbody></table>';
    };

    // Data is an array like [['Foo', 3], ['Bar', 8]]
    cmt.displayInModal = function(data) {
        cmt.windowManager.openWindow(cmt.messageDialog, {
            title: msg('category-information-title').plain(),
            message: $(cmt.table(data)),
            size: 'larger'
        });
    };

    cmt.init = function() {
        function CMTDialog(config) {
            CMTDialog.super.call(this, config);
        }
        OO.inheritClass(CMTDialog, OO.ui.MessageDialog);

        CMTDialog.static.actions = [{
            action: 'accept',
            label: msg('dismiss').plain(),
            flags: 'primary'
        }, {
            action: 'copy',
            label: msg('copy-table').plain()
        }];
        CMTDialog.prototype.initialize = function() {
            CMTDialog.super.prototype.initialize.apply(this, arguments);
        };
        CMTDialog.prototype.getActionProcess = function(action) {
            if (action === 'copy') {
                // Copy to clipboard
                var el = document.createElement('textarea');
                el.value = cmt.data.map(function(els) {
                    return els[0] + '\t' + mw.config.get('wgServer') +
                           mw.config.get('wgScriptPath') + '/wiki/Category:' +
                           els[0].replace(/ /g, '_') + '\t' + els[1];
                }).join('\n');
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
            }
            return CMTDialog.super.prototype.getActionProcess.call(this, action);
        };

        cmt.messageDialog = new CMTDialog();
        cmt.windowManager = new OO.ui.WindowManager();
        $('body').append(cmt.windowManager.$element);
        cmt.windowManager.addWindows([cmt.messageDialog]);

        switch (mw.config.get('wgCanonicalSpecialPageName')) {
            case 'Categories': {
                $('#content').prepend('<button class="wds-button" id="openCategories">' + msg('view-table').escape() + '</button>');
                $('#openCategories').on('click', function() {
                    cmt.getAllCategories().then(function(res) {
                        cmt.data = res;
                        cmt.displayInModal(res);
                    });
                });
                break;
            }
            case 'Wantedcategories': {
                $('#content').prepend('<button class="wds-button" id="openWantedCategories">' + msg('view-table').escape() + '</button>');
                $('#openWantedCategories').on('click', function() {
                    cmt.getAllWantedCategories().then(function(res) {
                        cmt.data = res;
                        cmt.displayInModal(res);
                    });
                });
                break;
            }
        }
    };

    mw.loader.using(['oojs-ui-windows'], function() {
    	mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('CategoryMaintenanceTables').done(function (i18no) {
				msg = i18no.msg;
		        cmt.init();
			});
		});
		importArticles({
			type: 'script',
			articles: 'u:dev:MediaWiki:I18n-js/code.js'
		});
    });

})(window.jQuery, window.mediaWiki);