$(function(){

 var ns = $('[name = "wpNewTitleNs"]');
 
 // (основное)  → (статья)
 var ns0 = ns.find('option:first');
 if( ns0.text() == '(основное)' )  ns0.text('(статья)');
 
 if( ns.val() == 6 ){ //for files: lowercase ext & suppress redirect
   var nm = $('[name = "wpTitleMain"]');
   nm.val( nm.val().replace( /\.[A-Z]{3,4}$/, function(s){ return s.toLowerCase() }) );
   $('[name = "wpLeaveRedirect"]').prop('checked', false);
 }

 if( ns.val() == 14 ) //for categories: suppress redirect
   $('[name = "wpLeaveRedirect"]').prop('checked', false);
 
});