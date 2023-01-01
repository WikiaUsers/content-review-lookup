function createCategoryList( categoryName, listParentId, limit ) {
    $.ajax({
        url: mw.util.wikiScript( 'api' ),
        data: {
            // For parameter documentation, visit <http://en.wikipedia.org/w/api.php> and then search for "list=categorymembers"
            format: 'json',
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + categoryName,
            cmtype: 'page',
            cmlimit: limit || 10
        },
        dataType: 'json',
        type: 'GET',
        success: function( data ) {
            if ( data && data.query && data.query.categorymembers ) {
                // ... success ...
                var list = document.createElement( 'ul' );
                for ( var i = 0; i < data.query.categorymembers.length; i++ ) {
                	var item = document.createElement("li");
                	item.textContent = data.query.categorymembers[i]["title"];
                	list.appendChild(item);                	
                }
                document.getElementById( listParentId ).appendChild( list );
            } else if ( data && data.error ) {
                // Will this ever happen??
                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                alert( 'Error: Unknown result from API.' );
            }
        },
        error: function( xhr ) {
            // ... error ...
        }
    });
}