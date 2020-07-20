mw.loader.using('jquery.autocomplete', function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgTitle'
    ]);
    if (config.wgNamespaceNumber !== 0) {
        return;
    }
	function done() {
        $('#article-search-notice').html(
            'Successfully added redirects to ' + mw.html.element( 'a', {href: mw.util.getUrl( wgPageName )}, wgPageName ) + ' (' + mw.html.element( 'a', {href: mw.util.getUrl( 'Special:WhatLinksHere/' + wgPageName )}, 'See all' ) + ')'
        );
    }
	function saveRedicrects() {
		articles = $('#article-search').val().split('\n');
		if(articles[articles.length - 1] == '') {
			articles.pop();
        }
        doneCallback = _.after(articles.length,done);
		articles.forEach(function(article,idx,arr) {
			console.log(article,idx,arr);
			$.post('/api.php',{
				action: 'edit',
				title: article,
				summary: 'Redirect [[' + article + ']] to [[' + wgPageName + ']]',
				text: '#REDIRECT [[' + wgPageName + ']]',
				token: mw.user.tokens.get('editToken'),
				format: 'json'
            },function(res) {
                $('#article-search').val(
					arr.slice(idx + 1).join('\n')
				);
				doneCallback()
            },'json');
        });
    }
    function callback() {
        var $el = $('#article-search').autocomplete({
            serviceUrl: mw.util.wikiScript('api') + '?action=opensearch',
            appendTo: $('#article-search-form'),
            deferRequestBy: 250,
            maxHeight: 1000,
            queryParamName: 'search',
            selectedClass: 'selected',
            width: '270px',
            namespace: 0,
			delimiter: '\n',
			autoSelectFirst: true,
            fnPreprocessResults: function(response) {
                response.query = response[0];
                response.suggestions = response[1];
                response.data = response[1];
                return response;
            },
			onSelect: function() {
				$('#article-search').val($('#article-search').val() + '\n');
            }
        }, function(e) {
            console.error(e);
        });
    }

    function click() {
        $.showCustomModal(
            'Choose Article',
            $('<div>').append(
				$('<div />',{
					id: 'article-search-notice'
                }),
                $('<textarea />', {
                    id: 'article-search',
                    style: 'width: 100%; height:300px;'
                })
            ).html(),
            {
                id: 'article-search-form',
                callback: callback,
                buttons: [{
                    message: 'Cancel',
                    handler: function() {
                        $('#article-search-form').closeModal();
                    },
                    id: 'article-search-cancel'
                },{
					message: 'Add',
                    defaultButton: true,
                    handler: saveRedicrects,
                    id: 'article-search-submit',
					disabled: true
				}]
            }
        );
    }
    $('.page-header__contribution-buttons .wds-dropdown .wds-list').append(
        $('<li>').append(
            $('<a>', {
                id: 'ca-add2cat',
                text: 'Add redicrects'
            }).click(click)
        )
    );
});