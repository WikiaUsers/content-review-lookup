/* Any JavaScript here will be loaded for all users on every page load. */


addOnloadHook( function() {
     var pops = function( elems ) {
         for (var i=0; i<elems.length; i++) {
             if ( !(' '+elems[i].className+' ').match( / pops / ) ) continue;
             var anchs = elems[i].getElementsByTagName('a');
             for (var j=0; j<anchs.length; j++) anchs[j].target = '_blank';
         }
     };
     var bc = document.getElementById('bodyContent');
     var tags = ['span', 'div', 'table', 'td', 'th'];
     for (var i=0; i<tags.length; i++) pops( bc.getElementsByTagName( tags[i] ) );
 } );