(function ($) {
    if (!['sysop', 'bureaucrat'].some(function(v){return window.wgUserGroups.indexOf(v)>-1})) return;
    
    var textDi = 'dev:DiscordIntegrator/code.js',
        textDii = 'dev:DiscordIntegrator/install.js',
        template = 'Template:DiscordIntegrator';
    var templateContent;
    
    function getVal (data, key) {
        //travers through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                r = getVal(data[k], key);
                if (r) {
                    ret = ret.concat(r);
                }
            } else {
                if (k === key) {
                    ret.push(data[k]);
                }
            } //if obj
        } //for k in data
        return ret;
    } //getVal
    
    function chkTemplate (template) {
        var api = new mw.Uri(wgScriptPath + '/api.php');
        if (!template)
            template = 'Template:DiscordIntegrator';
        return new Promise(function(resolve, reject) {
            $.getJSON(api.extend({
                action:'query',
                titles: template,
                prop: 'info',
                intoken: 'edit',
                format: 'json'
            }))
            .done(function(data) {
                if (data.query.pages['-1']) {
                    data.token = data.query.pages['-1'].edittoken;
                    reject(data);
                    return;
                }
                data.token = getVal(data, 'edittoken')[0];
                resolve(data);
            })
            .fail(function(data) {
                reject(data);
            });//gejson query template
        });
    }//chktemplate
    
    function createTemplate (template, token) {
        var mwApi = new mw.Api();
        template = template ? template : 'Template:DiscordIntegrator';
        token = token ? token : mw.user.tokens.get('editToken');
        return new Promise(function(resolve, reject) {
            mwApi.post({
                action: 'edit',
                title: template,
                text: templateContent,
                summary: 'integration of integrator template',
                recreate: true,
                bot: true,
                minor: true,
                token: token
            })
            .done(function(data) {
                mw.log('dii create template done', data);
                resolve(data);
            })
            .fail(function(data) {
                mw.log('dii create template fail', data);
                reject(data);
            });//mwapi post template
        });//promise
    }//createtemplate
    
    function removeMe() {
        //remove from importjs
        var token,
            api = new mw.Uri(wgScriptPath + '/api.php'),
            mwApi = new mw.Api();
        token = mw.user.tokens.get('editToken');
        $.getJSON(api.extend({
            action: 'query',
            titles: 'MediaWiki:ImportJS',
            prop: 'info|revisions',
            rvprop: 'content',
            intoken: 'edit',
            format: 'json'
        }))
        .done(function(data) {
            var content = '';
            token = getVal(data, 'editToken')[0] || token;
            content = getVal(data, '*')[0] || '';
            content = content.replace(textDii, '').replace('\n\n', '\n');
            if (content.indexOf(textDi) === -1)
                content = textDi + '\n' + content;
            mw.log('dii.removeme content', content);
            mwApi.post({
                action: 'edit',
                title: 'MediaWiki:ImportJS',
                text: content,
                summary: 'integration of integrator template. import clean up',
                recreate: true,
                bot: true,
                minor: true,
                token: token
            })
            .done(function(data) {
                    mw.log('dii.removeme.post ok', data);
                    showBanner('ImportJS is clean. Follow <a href="/wiki/MediaWiki:ImportJS">MediaWiki:ImportJS</a> to check result.');
            })
            .fail(function(data) {
                    mw.log('dii.removeme.post fail', data);
                    showBanner('Can\'t edit ImportJS. Follow <a href="/wiki/MediaWiki:ImportJS">MediaWiki:ImportJS</a> and do it manually.');
            });//post importjs
        })
        .fail(function(data) {
            mw.log('dii.removeme fail', data);
            showBanner('Something wrong happened. Follow <a href="/wiki/MediaWiki:ImportJS">MediaWiki:ImportJS</a> and do something.');
        });//getjson importjs
    }//removeme
    
    function addIdHelper (id) {
        //addid helper
        return new Promise(function(resolve, reject) {
            var mwApi = new mw.Api();
            mwApi.post({
                action: 'edit',
                title: 'MediaWiki:Custom-DiscordIntegrator-config-id',
                text: id,
                summary: 'integration of integrator. server id',
                recreate: true,
                bot: true,
                minor: true,
                token: mw.user.tokens.get('editToken')
            })
            .done(function(data) {
                mw.log('dii.saveid done', data);
                resolve(data);
            })
            .fail(function(data) {
                mw.log('dii.saveid fail', data);
                reject(data);
            });//mwapi post data
        });//promise
    }//saveid
    
    function addId () {
        $.showCustomModal('Do you want to set Discord server ID now?',
            '<input id="dii-modal-yes" class="wikia-button" type="button" value="Yes"/>' +
            '<input id="dii-modal-no" class="wikia-button secondary" type="button" value="No"/>',
            {callback: function($m) {
                $m.on('click', '#dii-modal-no', $m.closeModal.bind($m));
                $m.on('click', '#dii-modal-yes', function () {
                    $m.closeModal();
                    $.showCustomModal('Enter discord server ID',
                        '<input id="dii-modal-input" type="text" maxlength="18" pattern="[0-9]{18}"/>' +
                        '<input type="button" id="dii-modal-ok" class="wikia-button" value="ok"/>' +
                        '<div id="dii-modal-log"></div>',
                        {callback:function($modal) {
                            $modal.on('click', '#dii-modal-ok', function(e) {
                                var ival = $modal.find('#dii-modal-input').val();
                                if(/^\d{18}$/.test(ival)) {
                                    $modal.closeModal();
                                    addIdHelper(ival).then(
                                        showBanner.bind(this, 'ID saved. Follow <a href="/wiki/MediaWiki:Custom-DiscordIntegrator-config-id">MediaWiki:Custom-DiscordIntegrator-config-id</a> to check result.'),
                                        showBanner.bind(this, 'Can\'t save ID. Follow <a href="/wiki/MediaWiki:Custom-DiscordIntegrator-config-id">MediaWiki:Custom-DiscordIntegrator-config-id</a> to add ID manually.')
                                    );
                                } else {
                                    $modal.find('#dii-modal-log').text('input server id (18 digits)');
                                }
                            });
                        }
                    });//modal id
                });
            }}
        );//modal yes
    }//addid
    
    function showBanner (text) {
        var banner = new BannerNotification();
        banner.setContent(text);
        banner.show();
    }//showbanner
    
    function main () {
        $.ajax({
            url: 'https://dev.fandom.com/api.php',
            data: {
                action: 'query',
                prop: 'revisions',
                titles: 'Template:DiscordIntegrator',
                rvprop: 'content',
                format: 'json'
            },
            dataType: 'jsonp',
            success: function(data) {
                if (data.error) {
                    mw.log('dii.gettemplate error', data);
                    showBanner('Failed to get template. Follow <a href="dev.fandom.com/wiki/Talk:DiscordIntegrator">DiscordIntegrator talk page</a> to get help.');
                    return; // or handle error
                }
                var pages = data.query.pages,
                    page = pages[Object.keys(pages)[0]];
                if (!page || !page.revisions) {
                    mw.log('dii.gettemplate !page', data);
                    showBanner('Failed to get template. Follow <a href="dev.fandom.com/wiki/Talk:DiscordIntegrator">DiscordIntegrator talk page</a> to get help.');
                    return; // or handle error
                }
                templateContent = page.revisions[0]['*'];
                mw.log(templateContent);
                chkTemplate().then(
                    function(data) {
                        mw.log('dii.main.chktemplate resolve', data);
                        //showBanner('follow <a href="/wiki/MediaWiki:Custom-DiscordIntegrator-config-id">MediaWiki:Custom-DiscordIntegrator-config-id</a> to add id.');
                    },//resolve
                    function(data) {
                        mw.log('dii.main.chktemplate reject', data);
                        createTemplate().then(
                            showBanner.bind(this, 'Template created. follow <a href="/wiki/MediaWiki:Custom-DiscordIntegrator-config-id">MediaWiki:Custom-DiscordIntegrator-config-id</a> to add id.'),
                            showBanner.bind(this, 'Failed to create template.')
                        );//createtemplate
                    }//reject
                );//chktemplate
                removeMe();
                addId();
            }
        });
    }//main
    
    (function ($) {
    //promise polyfill for ie
        if (typeof Promise === 'function') return;
        function Promis (f) {
            var p = new $.Deferred();
            f(p.resolve, p.reject);
            return p;
        }//promise
        window.Promise = Promis;
    }(jQuery));
    
    mw.loader.using(['mediawiki.api', 'ext.bannerNotifications']).then(main);
}(jQuery));