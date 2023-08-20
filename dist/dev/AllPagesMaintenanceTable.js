// AllPagesMaintenanceTable
// Generates copy paste-able text from Special:AllPages at a click of a button

;(function($, mw) {
	'use strict';
    if (mw.config.get('wgNamespaceNumber') !== -1) return;
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Allpages') return;

    var api = new mw.Api();
    var msg;
    var apmt = {};
    var searchParams = new URLSearchParams(window.location.search);
    apmt.getAllPages = function(next) {
        return api.get({
            action: 'query',
            list: 'allpages',
            aplimit: 'max',
            apnamespace: searchParams.get('namespace') || 0,
            apcontinue: next || undefined
        });
    };

    apmt.getAllAllPages = function() {
        return new Promise(function(resolve, reject) {
            var next = '';
            var allPages = [];
            function repeat() {
                apmt.getAllPages(next).then(function(res) {
                    var newPages = res.query.allpages.map(function(page) {
                        return page.title;
                    });
                    allPages = allPages.concat(newPages);
                    if (res.continue && res.continue.apcontinue) {
                        next = res.continue.apcontinue;
                        repeat();
                    } else {
                        resolve(allPages);
                    }
                }, function(err) {
                    reject(err);
                });
            }
            repeat();
        });
    };

    apmt.table = function(data) {
        return '<table class="article-table" style="font-size:11px"><thead><tr>' +
                    '<th>' + msg('page-header').escape() + '</th>' +
                    '<th>' + msg('link-header').escape() + '</th>' +
                '</tr></thead>' +
                '<tbody>' +
                    data.map(function(page) {
                        return '<tr><td>' + page + '</td>' +
                            '<td>' + mw.config.get('wgServer') +
                            mw.config.get('wgScriptPath') + '/wiki/' +
                            page.replace(/ /g, '_') + '</td>' +
                            '</tr>';
                    }).join('') +
            '</tbody></table>';
    };

    // Data is an array like [['Foo', 3], ['Bar', 8]]
    apmt.displayInModal = function(data) {
        apmt.windowManager.openWindow(apmt.messageDialog, {
            title: msg('page-information-title').plain(),
            message: $(apmt.table(data)),
            size: 'larger'
        });
    };

    apmt.init = function() {
        function APMTDialog(config) {
            APMTDialog.super.call(this, config);
        }
        OO.inheritClass(APMTDialog, OO.ui.MessageDialog);

        APMTDialog.static.actions = [{
            action: 'accept',
            label: msg('dismiss').plain(),
            flags: 'primary'
        }, {
            action: 'copy',
            label: msg('copy-table').plain()
        }];
        APMTDialog.prototype.initialize = function() {
            APMTDialog.super.prototype.initialize.apply(this, arguments);
        };
        APMTDialog.prototype.getActionProcess = function(action) {
            if (action === 'copy') {
                // Copy to clipboard
                var el = document.createElement('textarea');
                el.value = apmt.data.map(function(page) {
                    return page + '\t' + mw.config.get('wgServer') +
                            mw.config.get('wgScriptPath') + '/wiki/' +
                            page.replace(/ /g, '_');
                }).join('\n');
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
            }
            return APMTDialog.super.prototype.getActionProcess.call(this, action);
        };

        apmt.messageDialog = new APMTDialog();
        apmt.windowManager = new OO.ui.WindowManager();
        $('body').append(apmt.windowManager.$element);
        apmt.windowManager.addWindows([apmt.messageDialog]);

        $('#content').prepend('<button class="wds-button" id="openAllPages">' + msg('view-table').escape() + '</button>');
        $('#openAllPages').on('click', function() {
            apmt.getAllAllPages().then(function(res) {
                apmt.data = res;
                apmt.displayInModal(res);
            });
        });
    };

    mw.loader.using(['oojs-ui-windows'], function() {
    	mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('AllPagesMaintenanceTable').done(function (i18no) {
				msg = i18no.msg;
		        apmt.init();
			});
		});
		importArticles({
			type: 'script',
			articles: 'u:dev:MediaWiki:I18n-js/code.js'
		});
    });

})(window.jQuery, window.mediaWiki);