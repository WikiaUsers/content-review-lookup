importScriptPage('ShowHide/code.js', 'dev');

// Alternate table row colors (Thanks to the Dungeons and Dragons Wiki)

function addAlternatingRowColors()
{
    var tables = getElementsByClass('rage-bw', document.getElementById('content'));
 
    if(tables.length == 0)
        return;
 
    for(var k = 0; k < tables.length; k++) {
        var table = tables[k];
        var rows = table.getElementsByTagName('tr');
        var changeColor = false;
 
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].className.indexOf('noalt') != -1)
               continue;
            if(rows[i].className.indexOf('stopalt') != -1)
                break;
 
            var ths = rows[i].getElementsByTagName('th');
 
            if(ths.length > 0)
            {
                rows[i].className = "odd";
                changeColor = true;
            }
 
            if(changeColor)
                rows[i].className = "odd";
            else
                rows[i].className = "even";
 
            changeColor = !changeColor;
        }
    }
}
addOnloadHook(addAlternatingRowColors);
 
// Also, make the "sortable" tables striped. This overrides wikibits.js
var ts_alternate_row_colors = true;
 
// Hit me baby, one more time!
 
if ( !Array.prototype.indexOf )
{
    Array.prototype.indexOf = function( elt /*, from*/ )
    {
        var len = this.length;
        var from = Number( arguments[1] ) || 0;
        from = from < 0 ? Math.ceil( from ) : Math.floor( from );
 
        if ( from < 0 )
            from += len;
 
        for ( ; from < len; from++ )
        {
            if ( from in this && this[from] === elt )
 
            return from;
        }
 
        return -1;
    };
}