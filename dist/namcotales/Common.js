 importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     if ( page.substr (0, 10) == "Wikipedia:") {
         npage = page.substring (10);
         var url= 'http://en.wikipedia.org/w/index.php?title='
             + encodeURIComponent( npage.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     } else {
         var url = wgScriptPath
                 + '/index.php?title='
                 + encodeURIComponent( page.replace( / /g, '_' ) )
                 + '&action=raw&ctype=text/javascript';
     }
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }