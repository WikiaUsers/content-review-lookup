if(wgNamespaceNumber === 6 && !mw.util.$content.find('#mw-imagepage-nofile').length) {
    $('.page-header__contribution-buttons .wds-dropdown .wds-list').append(
        $('<li />').append(
            $('<a />',{id: "ca-history"}).text('Add to article').click(function() {
                $.showCustomModal('Choose Article','<input type="text" id="article-search" style="width:100%;" /><br /><a href="/wiki/Spezial:Seite_erstellen?wpTitle=&addFile=' + wgTitle + '" class="wds-button wds-is-secondary wds-is-squished add-to-new"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-add-new-page-small"><g fill-rule="evenodd"><path d="M4.667 11H8v1.333H4.667V11zm0-3.333h8V9h-8V7.667zm0-3.334h8v1.334h-8V4.333zM2.667 17H10v-4.667c0-.368.3-.666.667-.666h4.666v-10A.667.667 0 0 0 14.667 1h-12A.667.667 0 0 0 2 1.667v14.666c0 .368.3.667.667.667z"></path><path d="M14.943 13h-3.61v3.61z"></path></g></svg>&emsp;Insert into new article</a>',{
                    id: 'article-search-form',
                    callback: function() {
                        //mw.loader.load('jquery.autocomplete');
                        mw.loader.using('jquery.autocomplete',function () {
                            el = $('#article-search').autocomplete({
                                serviceUrl: wgScriptPath + '/api.php?action=opensearch',
                                appendTo: $('#article-search-form'),
                                deferRequestBy: 250,
                                maxHeight: 1000,
                                queryParamName: 'search',
                                selectedClass: 'selected',
                                width: '270px',
                                namespace: 0,
                                fnPreprocessResults: function(response){
                                    response.query = response[0];
                                    response.suggestions = response[1];
                                    response.data = response[1];
                                    return response;
                                },
                                onSelect: function(value, data, event) {
                                    var valueEncoded = encodeURIComponent(value.replace(/ /g, '_'));
                                    // slashes can't be urlencoded because they break routing
                                    window.location = window.wgArticlePath.replace(/\$1/, valueEncoded + '?action=edit&&addFile=' + wgTitle).replace(encodeURIComponent('/'), '/');
                                }
                            });
                        },function(e) {
                            console.error(e);
                        });
						$('.add-to-new').click(function(e) {
							e.preventDefault();
							window.location = '/wiki/Spezial:Seite_erstellen?wpTitle=' + $('#article-search').val() + '&addFile=' + wgTitle;
                        });
                    },
                    buttons: [{
                        message: 'Cancel',
                        handler: function() { $('#article-search-form').closeModal(); },
                        id: 'article-search-cancel',
                        defaultButton: true,
                    }]
                });
            })
        )
    );
}