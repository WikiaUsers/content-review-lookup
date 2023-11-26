;(function($, mw) {
    'use strict';

	var preloads = 2;

    function globalFileUsage(i18n) {

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
        var format   = '&format=json';
        var siteUrl  = mw.config.values.wgServer + '/';
        var fileName = mw.config.values.wgTitle;

        if (action == 'move')
            fileName = fileName.replace('MovePage/File:', '');

        var baseParams = '/api.php?action=query&titles=File:' + fileName;

        function showGUContainer(place, title, i18n) {

            // $('#global-usage-container').remove(); // for tests
            $(place).append('<div id="global-usage-container">' + title + '<p><button class="wds-button" id="show-global-usage-btn"><span>' + i18n.msg('button-show').plain() + '</span></button></p></div>');

            $('#show-global-usage-btn').click(function(){
                showGUTable(i18n);
            });

        }

        function showGUTable(i18n) {

            $('#global-usage-list').remove();
            $('#global-usage-container').append('<table id="global-usage-list" class="wikitable" style="width:100%"><tbody><tr><th>' + i18n.msg('lang').plain() + '</th><th>' + i18n.msg('page').plain() + '</th></tr></tbody></table>');

            langs.forEach(function(lang) {
                if (lang == mw.config.values.wgContentLanguage) return;
                $('#global-usage-list').append('<tbody data-lang="' + lang + '"></tbody>');
                checkFile(siteUrl, baseParams, lang, i18n);
            });

            $('#show-global-usage-btn').text(i18n.msg('button-update').plain()).prop('disabled', true);

            setTimeout(function(){
                $('#show-global-usage-btn').prop('disabled', false);
            }, 1200);

        }

        var deleteWarning = '<div id="global-usage-delete-warning" hidden>' + i18n.msg('delete-warn').plain() + '</div>';

        switch (action) {
            case 'view':

                showGUContainer('#mw-imagepage-section-linkstoimage, #mw-imagepage-nolinkstoimage', '<h3>' + i18n.msg('global').plain() + '</h3>', i18n);

                if (config.auto_show || $('#ca-delete').length)
                    showGUTable(i18n);

                break;

            case 'delete':

                if (!config.hide_on_delete) {

                    $('#mw-img-deleteconfirm').append(deleteWarning);

                    showGUContainer('#mw-content-text', '<h2>' + i18n.msg('global-usage').plain() + '</h2>', i18n);
                    showGUTable(i18n);

                }
                break;

            case 'move':

                if (!config.hide_on_move) {

                    $('#movepage').append(deleteWarning);

                    showGUContainer('#mw-content-text', '<h2>' + i18n.msg('global-usage').plain() + '</h2>', i18n);
                    showGUTable(i18n);

                }
                break;
        }

        function checkFile(siteUrl, baseParams, lang, i18n) {

			var infoParams = baseParams + '&prop=imageinfo' + format;
			var langUrl = siteUrl + lang;
			var infoUrl = langUrl + infoParams;
	
			fetch(infoUrl)
				.then(function(response){
					return response.json();
				})
				.then(function(response) {

					var pages = response.query.pages;
					var repo = pages[Object.keys(pages)[0]].imagerepository;
					
					if (repo == 'shared') {

                        var usageParams = baseParams + '&prop=fileusage' + format;
                        usageQuery(siteUrl, usageParams, lang, i18n);

					} else if (repo != 'local') {

                        globalFileUsageError('<a href="' + langUrl + '" target="_blank">' + langUrl + '</a><br>' + i18n.msg('no-shared').plain());

					}
 
				 });

        }

        function usageQuery(siteUrl, params, lang, i18n) {

            var usageUrl = siteUrl + lang + params;
            var $langRow =  $('#global-usage-list [data-lang="' + lang + '"]');

            config.showDeleteWarning = false;
            $('#global-usage-delete-warning').hide();

            fetch(usageUrl)
                .then(function(response){
                    if (!response.ok) {
                        var fullUrl = siteUrl + lang;
                        $langRow.append('<tr class="global-usage-error"><td>' + lang + '</td><td colspan="2">' + i18n.msg('connection-error', fullUrl).plain() + '</td></tr>');
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

        function globalFileUsageError(text) {
            $('#global-usage-container').append('<div class="warningbox">' + text + '</div>');
        }

    }

	function preload() {
		if (--preloads>0) return;
        window.dev.i18n.loadMessages('GlobalFileUsage').done(function(i18no) {
            i18no.useUserLang();
            globalFileUsage(i18no);
        });
	}

    mw.hook('wikipage.content').add(preload);
    mw.hook('dev.i18n').add(preload);
    
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
 
})(window.jQuery, window.mediaWiki);