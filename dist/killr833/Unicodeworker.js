var data = '',
char;
onmessage = function( event ) {
    if ( event.data == true ) {
            for ( var i = 0; i < 65536; i++; ) {
                var result = i.toString( 16 );
                    if ( result.length < 4 ) {
                        switch ( result.length ) {
                            case 1:
                                result = '000' + result;
                                break;
                            case 2:
                                result = '00' + result;
                                break;
                            case 3:
                                result = '0' + result;
                                break;
                        }
                    }
                char = eval( '"\\u' + result + '"' );
                data += '<span title="' + char + ': ' + i + ' (\\u' + result + ')">' + char + ' <\/span>'; 
            }
        postMessage( data );
};