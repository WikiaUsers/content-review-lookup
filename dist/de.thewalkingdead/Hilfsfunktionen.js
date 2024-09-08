/*********************************************************\
  Hilfsfunktionen
  Hier werden Funktionen gelagert, die in mehreren Funktionen Verwendung finden (können)

  
  (c) 2015-2018 - 20M61 (TWD-Wikia)
\*********************************************************/

// Artikel schreiben
/* JSON Unterstützung um Wikia-Seiten auszulesen */
function apiReq(q, fn) {q.format='json'; return $.ajax({ async:false, type:'POST', url:''+wgScriptPath+'/api.php', data:q, success:fn, dataType:'json', }); }
function getToken(page, fn) {apiReq({ action: 'query',query: 'prop',prop: 'info',titles: page,intoken: 'edit' }, function(q){ for( var k in q.query.pages )return fn(q.query.pages[k]); }); }

// Diverses
/* Hilfsfunktion überprüft ob ein Wert eine Zahl ist */
function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

// Cookies
/* Hilfsfunktion löst ein Zeitproblem bei Cookies */
function fixedGMTString(datum){
   var damals=new Date(1970,0,1,12);
   if (damals.toGMTString().indexOf("02")>0)
      datum.setTime(datum.getTime()-1000*60*60*24);
   return datum.toGMTString();
}