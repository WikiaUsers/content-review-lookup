// <nowiki>

var flickrfixr_api_url = wgScriptPath + "/api.php?" ;

if ( wgNamespaceNumber == 6 && wgAction == "view" ) {
    $j(document).ready( init_flickrfixr ) ;
}

function init_flickrfixr() {
  var url = flickrfixr_api_url + "format=xml&action=query&prop=templates&titles=" + wgPageName ;
  var xmlreq = sajax_init_object();
  xmlreq.open ( "GET" , url , false ) ;
  xmlreq.send ( null ) ;
  xml = xmlreq.responseXML ;

  var tls = xml.getElementsByTagName('tl') ;
  var flickrreview = 0 ;
  for ( var i = 0 ; i < tls.length ; i++ ) {
    var template = tls[i].attributes.getNamedItem("title").value ;
    if ( template != "Template:Flickrreview" ) continue ;
    flickrreview = 1 ;
    break ;
  }
  if ( flickrreview == 0 ) return ; // Page does not use {{flickrreview}}

  var out = '<li id="t-permalink">' ;
  out += "FlickrFixr " ;
  out += "<a href='#' onclick='flickrfixr_ok()'>ok</a> " ;
  out += "<a href='#' onclick='flickrfixr_changed()'>other</a> " ;
  out += "<a href='#' onclick='flickrfixr_bad()'>bad</a> " ;

  out += 
    '<span style="display:none"><form name="flickrfixrform" enctype="multipart/form-data" method="post">' + 
    '<input type="hidden" name="wpTextbox1" />' +
    '<input type="hidden" name="wpSummary" />' +
    '<input type="hidden" name="wpDiff" value="wpDiff" />' +
    '<input type="hidden" name="wpStarttime" />' +
    '<input type="hidden" name="wpEdittime" />' +
    '</form></div>' ;


  out += '</li>' ;

  // flinfo
  var flickr_id = get_flickr_id_api () ;
  if ( flickr_id != '' ) {
    out += '<li id="t-permalink">' ;
    out += '<a href="http://wikipedia.ramselehof.de/flinfo.php?id=' + flickr_id + '" target="_blank">Flinfo</a> (new win)' ;
    out += '</li>' ;
  }

  var tools = document.getElementById("p-tb") ;
  tools = tools.getElementsByTagName("ul")[0] ;
  tools.innerHTML += out ;
}

function get_flickr_id_api () {
  if ( wgNamespaceNumber != 6 ) return '' ; // Not an image
  var request = sajax_init_object();
  var url = flickrfixr_api_url + 'format=xml&action=query&prop=extlinks&titles=' + encodeURIComponent(wgPageName);
  request.open("GET", url, false);
  request.send(null);
  var xml = request.responseXML ;
  var els = xml.getElementsByTagName('el') ;
  var start = 'http://www.flickr.com/photos/' ;
  for ( i = 0 ; i < els.length ; i++ ) {
    url = els[i].textContent ;
    if ( url.substr ( 0 , start.length ) != start ) continue ;
    var p = url.split ( '/' ) ;
    var id = '' ;
    while ( id == '' ) id = p.pop() ;
    return id ;
  }
  return '' ;
}


function flickrfixr_get_date () {
  var d = new Date() ;
  var year = d.getUTCFullYear() ;
  var month = d.getUTCMonth() + 1 ;
  var day = d.getUTCDate() ;
  if ( month < 10 ) month = "0" + month ;
  if ( day < 10 ) day = "0" + day ;
  return year + "-" + month + "-" + day ;
}

function flickrfixr_ok() {
  var date = flickrfixr_get_date() ;
  flickrfixr_replace ( '{{flickrreview|' + wgUserName  + '|' + date + '}}' ) ;
}

function flickrfixr_changed() {
  var date = flickrfixr_get_date() ;
  var license = prompt ( "Old license on commons" , "" ) ;
  flickrfixr_replace ( '{{flickrreview|' + wgUserName  + '|' + date + '|changed=' + license + '}}' ) ;
}

function flickrfixr_bad() {
  var date = flickrfixr_get_date() ;
  var license = prompt ( "Changed BAD license on Flickr" , "All rights reserved" ) ;
  flickrfixr_replace ( '{{flickrreview|' + wgUserName  + '|' + date + '|' + license + '}}' ) ;
}

function flickrfixr_replace ( what ) {
  var url = wgScriptPath + "/index.php?action=raw&title=" + wgPageName ;

  var xmlreq = sajax_init_object();
  xmlreq.open ( "GET" , url , false ) ;
  xmlreq.send ( null ) ;
  var text = xmlreq.responseText ;

  var parts = text.split ( '{{flickrreview' ) ;
  if ( parts.length < 2 ) parts = text.split ( '{{Flickrreview' ) ;
  if ( parts.length != 2 ) {
    alert ( "I'm afraid I can't do that, Dave..." ) ;
    return ;
  }

  var before = parts.shift() ;
  var after = parts.pop() ;
  parts = after.split ( '}}' , 2 ) ;
  var params = parts.shift() ;
  after = parts.pop() ;
  text = before + what + after ;

  var comment = "Changed flickrreview to : " + what ;
  var starttime = flickrfixr_get_current_utc_timestamp() ;
  var last_version_timestamp = flickrfixr_get_article_timestamp ( wgPageName ) ;

  url = wgScriptPath + "/index.php?action=edit&title=" + wgPageName ;
  document.flickrfixrform.action = url ;
  document.flickrfixrform.wpSummary.value = comment ;
  document.flickrfixrform.wpTextbox1.value = text ;
  document.flickrfixrform.wpStarttime.value = starttime ;
  document.flickrfixrform.wpEdittime.value = last_version_timestamp ;
  document.flickrfixrform.submit () ;
}


// Generates current timestamp
function flickrfixr_get_current_utc_timestamp () {
  var today=new Date() ; 

  var y  = "00" + today.getUTCFullYear() ; 
  var mo = today.getUTCMonth() + 1 ; 
  var d  = "00" + today.getUTCDate() ; 
  mo = "00" + mo ;

  var h = "00" + today.getUTCHours() ; 
  var m = "00" + today.getUTCMinutes() ;
  var s = "00" + today.getUTCSeconds() ;

  var ret = "" ;
  ret +=  y.substr (  y.length - 4 ) ;
  ret += mo.substr ( mo.length - 2 ) ;
  ret +=  d.substr (  d.length - 2 ) ;
  ret +=  h.substr (  h.length - 2 ) ;
  ret +=  m.substr (  m.length - 2 ) ;
  ret +=  s.substr (  s.length - 2 ) ;
  return ret ;
}


function flickrfixr_fix_time ( time ) {
  time = time.replace ( /:/g , "" ) ;
  time = time.replace ( / /g , "" ) ;
  time = time.replace ( /-/g , "" ) ;
  time = time.replace ( /Z/g , "" ) ;
  time = time.replace ( /T/g , "" ) ;
  return time ;
}

function flickrfixr_get_article_timestamp ( title ) {
  var ret ;
  var url = flickrfixr_api_url + 'format=xml&action=query&prop=revisions&rvprop=timestamp&titles=' + title ;

  var xmlreq = sajax_init_object() ;
  xmlreq.open ( "GET" , url , false ) ;
  xmlreq.send ( null ) ;
  if (xmlreq.status == 200) {
    var xml = xmlreq.responseXML ;
    var rev = xml.getElementsByTagName('rev') ;
    if ( rev.length == 0 ) return flickrfixr_get_current_utc_timestamp () ;

    ret = rev[0].getAttribute('timestamp') ;
    return flickrfixr_fix_time ( ret ) ;
  }
}

//</nowiki>