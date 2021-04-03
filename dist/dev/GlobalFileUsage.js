(function($, document, mw) {
    'use strict';

    function globalFileUsage() {

        if (window.globalFileUsageInit) return;

        window.globalFileUsageInit = true;

        var action = mw.config.values.wgAction;
        var config = window.globalFileUsageConfig;

        if (mw.config.values.wgCanonicalSpecialPageName == 'Movepage') {
            action = 'move';
            if (!mw.config.values.wgTitle.includes('MovePage/File:')) return;
        }
        
        var space = mw.config.values.wgNamespaceNumber;
    
        if ((space != 6 && space != -1) || (action != 'view' && (action != 'delete' &&  action != 'move') ) || (action == 'delete' && config.hide_on_delete) || (action == 'move' && config.hide_on_move)) return;

        if (!window.globalFileUsageConfig || !window.globalFileUsageConfig.lang) {
            console.warn('File Global Usage: Add some languages in your config. Read manual for more information.');
            return;
        }

        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:GlobalFileUsage.css'
        });

        var langs    = config.lang;
        var siteUrl  = mw.config.values.wgServer + '/';
        var fileName = mw.config.values.wgTitle;

        if (action == 'move')
            fileName = fileName.replace('MovePage/File:', '');

        var params   = '/api.php?action=query&titles=File:' + fileName + '&prop=fileusage&format=json';

        function showGUContainer(place, title) {

            // $('#global-usage-container').remove(); // for tests
            $(place).append('<div id="global-usage-container">' + title + '<p><button class="wds-button" id="show-global-usage-btn"><span>Show Usage</span></button></p></div>');

            $('#show-global-usage-btn').click(function(){
                showGUTable();
            });

        }

        function showGUTable() {

            $('#global-usage-list').remove();
            $('#global-usage-container').append('<table id="global-usage-list" class="wikitable" style="width:100%"><tbody><tr><th>Lang</th><th>Page</th></tr></tbody></table>');

            langs.forEach(function(lang) {
                if (lang == mw.config.values.wgContentLanguage) return;
                $('#global-usage-list').append('<tbody data-lang="' + lang + '"></tbody>');
                usageQuery(siteUrl, params, lang);
            });

            $('#show-global-usage-btn').text('Update Usage').prop('disabled', true);

            setTimeout(function(){
                $('#show-global-usage-btn').prop('disabled', false);
            }, 1200);

        }

        var deleteWarning = '<div id="global-usage-delete-warning" hidden><strong>Warning!</strong> This file used at other languages.</div>';

        switch (action) {
            case 'view':

                showGUContainer('#mw-imagepage-section-linkstoimage, #mw-imagepage-nolinkstoimage', '<h3>Global</h3>');

                if (config.auto_show)
                    showGUTable();

                break;

            case 'delete':

                if (!config.hide_on_delete) {

                    $('#mw-img-deleteconfirm').append(deleteWarning);

                    showGUContainer('#mw-content-text', '<h2>Global Usage</h2>');
                    showGUTable();

                }
                break;

            case 'move':

                if (!config.hide_on_move) {

                    $('#movepage').append(deleteWarning);

                    showGUContainer('#mw-content-text', '<h2>Global Usage</h2>');
                    showGUTable();

                }
                break;
        }

        function usageQuery(siteUrl, params, lang) {

            var usageUrl = siteUrl + lang + params;
            var $langRow =  $('#global-usage-list [data-lang="' + lang + '"]');

            config.showDeleteWarning = false;
            $('#global-usage-delete-warning').hide();

            fetch(usageUrl)
                .then(function(response){
                    if (!response.ok) {
                        var fullUrl = siteUrl + lang;
                        $langRow.append('<tr class="global-usage-error"><td>' + lang + '</td><td colspan="2"><strong>Error:</strong> Have no connection to <a href="'+ fullUrl +'">' + fullUrl + '</a></td></tr>');
                    }
                    return response.json();
                })
                .then(function(response) {

                    var pages = response.query.pages;
                    var usageInfo = pages[Object.keys(pages)[0]].fileusage;

                    if (!usageInfo) return;

                    if (!config.showDeleteWarning) {
                        config.showDeleteWarning = true;
                        $('#global-usage-delete-warning').show();
                    }

                    var list = '';

                    usageInfo.forEach(function(item) {
                        var fileLink = siteUrl + lang + '/wiki/' + item.title;
                        list += '<tr><td>' + lang + '</td><td><a href="' + fileLink + '" target="_blank">' + item.title + '</a></td></tr>';
                    });

                    $langRow.append(list);

                 });

        }

    }

    mw.hook('wikipage.content').add(globalFileUsage);
 
})(window.jQuery, document, window.mediaWiki);