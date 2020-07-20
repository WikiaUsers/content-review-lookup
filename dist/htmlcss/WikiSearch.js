window.WikiSearch = window.WikiSearch || {};
WikiSearch.baseURL = mw.config.get('wgServer', wgServer);
WikiSearch.createSearchBox = function createSearchBox(){
    var $searchWrapper = $('<form />', {
        'class': 'WikiSearch wiki-search',
        'id': 'WikiSearch',
        'method': '',
        'name': 'WikiSearch',
        'action': '/index.php'
    }).on('submit', function(event){
        event.preventDefault();
        var page = $('#WikiSearchInput').val();
        $.ajax({
            method: 'GET',
            url: event.target.action,
            data: {
                title: page,
                action: 'view'
            }
        }).done(function(data){
            var url = WikiSearch.baseURL + mw.util.wikiGetlink(page);
            window.location.href = url;
        }).fail(function(error){
            console.log(error);
        });
    });
    $searchWrapper.html([
        $(''),
        $('')
    ]);
};