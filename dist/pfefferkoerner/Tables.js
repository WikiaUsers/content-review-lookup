console.log('Table module loaded');

function createTable() {
    if(arguments.length !== 0) {
        var table = $('<table />');
        var headers = (Object.keys(arguments[0]).length >= 2 && arguments[0].headers.length != -1) ? arguments[0].headers.split(',') : undefined;
        var cells = (Object.keys(arguments[0]).length >= 2 && arguments[0].cells.length != -1) ? arguments[0].cells.split(',') : Object.keys(arguments[0].data[0]);
        var tdata = arguments[0].data;
        var idPrefix = (Object.keys(arguments[0]).length >= 2 && arguments[0].idPref !== '') ? arguments[0].idPref : undefined;
        var elClass = arguments[0].elClass ? arguments[0].elClass : 'auto-table wikitable';
        var elID = arguments[0].elID ? arguments[0].elID : 'auto-table';
        var parent = arguments[0].parent ? $(arguments[0].parent) : $('.WikiaArticle#WikiaArticle');
        
        console.log(Object.keys(arguments[0]),headers,tdata);
        if(headers.length === cells.length  || headers.length === 0) {
            $(table).addClass(elClass).attr('id',elID);
            
            if(headers.length !== 0) {
                var thead = $('<thead />').prependTo($(table));
                console.log('thead',$(thead));
                var headcells = $('<tr />').appendTo($(thead));
                console.log($(headcells));
                for(i = 0; i < headers.length; i++) {
                    $(headcells).append(
                        $('<th />').text(headers[i])
                    );
                }
            }
            
            var tbody = $('<tbody />').appendTo($(table));
            console.log('Data',Object.keys(tdata).length);
            for(i = 0; i < Object.keys(tdata).length; i++) {
                var currentcell = $('<tr />').appendTo($(tbody));
                console.log(i,'current row',tdata[i],$(currentcell),tbody,'idPref',idPrefix.length ? idPrefix.length + ' ' + idPrefix : 'no');
                for(n = 0; n < cells.length; n++) {
                    console.log(n,'current cell',tdata[i]);
                    $(currentcell).append(
                        $('<td />').text(cells[n] === 'id' ? (idPrefix.length ? idPrefix + ' ' + (i+1) : i+1) : tdata[i][cells[n]]) 
                    );
                }
            }
            
            parent.append($(table));
        }
        else {
            throw 'unequal number of arguments for headers and data ' + headers.length + ', ' + cells.length;
        }
    }
    else if(!Object.keys(arguments[0]).length) {
        throw 'attributes were set wrong';
    }
    else {
        throw 'No arguments for table data';
    }
}

/*****
 * 
 *  createTable({
 *      headers: (optional) String kommagetrennt,
 *      cells: (required) String kommagetrennt,
 *      data: (required) Objelt,
 *      elClass: (optional) wird gesetzt,
 *      elID: (optional) wird gesetzt,
 *      parent: (optional)
 *  });
 * 
 *****/