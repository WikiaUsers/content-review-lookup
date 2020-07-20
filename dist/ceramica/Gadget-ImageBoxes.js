//<nowiki>
var image_annotation_span_ids = Array () ;
var image_annotation_visible = 1 ;
var image_annotation_image_width = 0 ;
var image_annotation_image_height = 0 ;
var image_annotation_thumb_width = 0 ;
var image_annotation_thumb_height = 0 ;
var image_annotation_is_IE = document.all?true:false
var image_annotation_mouse_x = 0 ;
var image_annotation_mouse_y = 0 ;
var image_annotation_firstclick_x = 0 ;
var image_annotation_firstclick_y = 0 ;
var image_annotation_state = "" ;
var image_annotation_draw_box ;


if ( wgNamespaceNumber == 6 && wgAction == "view" ) {
  $j(document).ready( init_image_annotation ) ;
}

function init_image_annotation() {
  // Get list of span ids that start with "boxid_"
  var spans = document.getElementsByTagName("span") ;
  var ids = Array () ;
  for ( var i = 0 ; i < spans.length ; i++ ) {
    var id = spans[i].id ;
    if ( id.substr ( 0 , 6 ) != "boxid_" ) continue ;
    ids.push ( id ) ;
  }
  image_annotation_span_ids = ids ;
  image_annotation_show_boxes () ;
}

function image_annotation_get_thumbnail_element () {
  var file = document.getElementById ( "file" ) ;
  var img = file.getElementsByTagName ( "img" ) [0] ;
  return img ;
}

function image_annotation_load_wiki_page ( title ) {
  var url = wgServer + wgArticlePath.split("$1").join(title) ;
  window.location = url ;
}

function image_annotation_mouse_enter ( id ) {
  document.getElementById(id).style.backgroundColor = "transparent" ;
  image_annotation_set_opacity ( document.getElementById(id) , 10 ) ;
}

function image_annotation_mouse_leave ( id ) {
  image_annotation_set_opacity ( document.getElementById(id) , 4 ) ;
  document.getElementById(id).style.backgroundColor = "white" ;
}

function image_annotation_show_hide () {
  var n = getElementsByClassName ( document , "div" , "image_box_class" ) ;
  for ( var i = 0 ; i < n.length ; i++ ) {
    image_annotation_visible = 1 - ( n[i].style.display == "none" ) ;
    n[i].style.display = ( n[i].style.display == "none" ) ? "block" : "none" ;
  }
}

function image_annotation_set_opacity(obj,value) {
  obj.style.opacity = value/10;
  obj.style.filter = 'alpha(opacity=' + value*10 + ')';
}




function image_annotation_capture_move ( e ) {
  if ( image_annotation_is_IE ) { // grab the x-y pos.s if browser is IE
    image_annotation_mouse_x = event.clientX + document.body.scrollLeft
    image_annotation_mouse_y = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    image_annotation_mouse_x = e.pageX
    image_annotation_mouse_y = e.pageY
  }  
  // catch possible negative values in NS4
  if (image_annotation_mouse_x < 0){image_annotation_mouse_x = 0}
  if (image_annotation_mouse_y < 0){image_annotation_mouse_y = 0}  

  var content = document.getElementById ( "content" ) ;
  image_annotation_mouse_x -= image_offset_left + parseInt ( content.offsetLeft ) ;
  image_annotation_mouse_y -= image_offset_top + parseInt ( content.offsetTop ) ;

  if ( image_annotation_state == "add2" ) {
    image_annotation_draw_box = document.getElementById ( "draw_box" ) ;
    var w = image_annotation_mouse_x - image_annotation_firstclick_x - 1 ;
    var h = image_annotation_mouse_y - image_annotation_firstclick_y - 1;
    image_annotation_draw_box.style.width = w + "px" ;
    image_annotation_draw_box.style.height= h + "px" ;
  }

  return true ;
}

function image_annotation_capture_click () {
  if ( image_annotation_state == "add1" ) {
    var controls2 = document.getElementById ( "image_annotation_controls2" ) ;
    var fc = controls2.firstChild ;
    controls2.insertBefore ( document.createTextNode ( "2. Click on the lower right corner of the new box, or " ) , fc ) ;
    controls2.removeChild ( fc ) ;
    image_annotation_firstclick_x = image_annotation_mouse_x ;
    image_annotation_firstclick_y = image_annotation_mouse_y ;
    image_annotation_state = "add2" ;

    image_annotation_draw_box = document.createElement ( "div" ) ;
    var f = document.getElementById ( "file" ) ;
    f.appendChild ( image_annotation_draw_box ) ;
    image_annotation_draw_box.id = "draw_box" ;
    var x = image_offset_left + image_annotation_firstclick_x ;
    var y = image_offset_top + image_annotation_firstclick_y ;
    image_annotation_draw_box.style.border = "1px solid red" ;
    image_annotation_draw_box.style.position = "absolute" ;
    image_annotation_draw_box.style.left = x + "px" ;
    image_annotation_draw_box.style.top = y + "px" ;

  } else if ( image_annotation_state == "add2" ) {
    image_annotation_state = "fin" ;
    var name = prompt ( "Category to link this box to (without \"Category:\"; leave blank to cancel)" , "" ) ;
    if ( name == "" ) {
      image_annotation_add_box_cancel () ; // Back to normal
      return ;
    }

    var x = Math.floor ( image_annotation_firstclick_x * image_annotation_image_width / image_annotation_thumb_width ) ;
    var y = Math.floor ( image_annotation_firstclick_y * image_annotation_image_height / image_annotation_thumb_height ) ;
    var w = Math.floor ( image_annotation_mouse_x * image_annotation_image_width / image_annotation_thumb_width - x ) ;
    var h = Math.floor ( image_annotation_mouse_y * image_annotation_image_height / image_annotation_thumb_height - y ) ;
    var desc = "{{Imagebox|" + x + "|" + y + "|" + w + "|" + h + "|" + name + "}}" ;
    prompt ( "Copy the following wikitext and paste it into the image description:" , desc ) ;
    image_annotation_add_box_cancel () ; // Back to normal
  }
}

function image_annotation_add_box_cancel () {
  if (!image_annotation_is_IE) document.captureEvents(null) ;
  document.onmousemove = null ;
  image_annotation_state = "" ;

  image_annotation_draw_box = document.getElementById ( "draw_box" ) ;
  if ( image_annotation_draw_box ) image_annotation_draw_box.parentNode.removeChild ( image_annotation_draw_box ) ;

  var controls = document.getElementById ( "image_annotation_controls" ) ;
  var controls2 = document.getElementById ( "image_annotation_controls2" ) ;
  var clickfetcher = document.getElementById ( "image_annotation_clickfetcher" ) ;
  controls2.parentNode.removeChild ( controls2 ) ;
  clickfetcher.parentNode.removeChild ( clickfetcher ) ;
  controls.style.display = "block" ;
  document.body.style.cursor = "auto" ;
  image_annotation_show_hide () ; // Show boxes
}

function image_annotation_get_img_link (file_div) {
  var linkinfiles = file_div.getElementsByTagName ("a");
  for (var i = 0; i < linkinfiles.length; i++) {
    if (linkinfiles[i].href.substr (0, 14) == "http://upload." && linkinfiles[i].parentNode == file_div) {
      return linkinfiles[i];
    }
  }
  return null;
}

function image_annotation_add_box () {
  if ( image_annotation_visible ) image_annotation_show_hide () ; // Hide boxes, if any

  var file = document.getElementById ( "file" ) ;
  if (!file) return; // Paranoia.
  var linkinfile = image_annotation_get_img_link (file);
  if (!linkinfile) return; // Sanity check

  if (!image_annotation_is_IE) document.captureEvents(Event.MOUSEMOVE) ;
  document.onmousemove = image_annotation_capture_move;
  image_annotation_state = "add1" ;

  var newdiv = document.createElement ( "div" ) ;
  newdiv.id = "image_annotation_clickfetcher" ;
  newdiv.style.zIndex = "10" ;
  newdiv.style.position = "absolute" ;
  newdiv.style.left = Math.floor ( image_offset_left - 1 ) + "px" ;
  newdiv.style.top = Math.floor( image_offset_top - 1 ) + "px" ;
  newdiv.style.width = Math.floor( image_annotation_thumb_width - 1 ) + "px" ;
  newdiv.style.height = Math.floor( image_annotation_thumb_height - 1 ) + "px" ;
  newdiv.style.border = "3px solid green" ;
  newdiv.style.zIndex = "10" ;
  document.body.style.cursor = "crosshair" ;

  if ( image_annotation_is_IE ) {
    image_annotation_set_opacity( newdiv , 1 ) ;
    newdiv.style.backgroundColor = "white" ;
  }

  file.insertBefore ( newdiv , file.firstChild ) ;
  newdiv.onclick = function () { image_annotation_capture_click(); } ;

  var controls = document.getElementById ( "image_annotation_controls" ) ;
  var controls2 = document.createElement ( "div" ) ;
  controls2.id = "image_annotation_controls2" ;

  var text = document.createTextNode ( "1. Click on the upper left corner of the new box, or " ) ;
  var link = document.createElement ( "a" ) ;
  link.href = "#" ;
  controls2.appendChild ( text ) ;
  controls2.appendChild ( link ) ;
  file.insertBefore ( controls2 , controls ) ;
  link.onclick = function () { image_annotation_add_box_cancel() ; } ;
  link.innerHTML = "cancel" ;
  controls.style.display = "none" ;
}

function image_annotation_show_boxes () {
  var file = document.getElementById ( "file" ) ;
  if (!file) return;
  var linkinfile = image_annotation_get_img_link (file);
  if (!linkinfile) return;
  var bc = document.getElementById ( "bodyContent" ) ;
  var ids = image_annotation_span_ids ;
  var img = image_annotation_get_thumbnail_element () ;
  
  if ( typeof img == 'undefined' ) return ;

  image_annotation_thumb_width = img.width ;
  image_annotation_thumb_height = img.height ;

  // Find image size in text
  image_annotation_image_width = 0 ;
  image_annotation_image_height = 0 ;
  for ( var i = 0 ; i < file.childNodes.length ; i++ ) {
    var j = file.childNodes[i].nodeValue ;
    if ( !j ) continue ;
    j = j.split("(",2).pop() ;
    j = j.split(" × ",2) ;
    image_annotation_image_width = parseInt ( j.shift() ) ;
    image_annotation_image_height = j.pop().split(" ",2).shift() ;
  }

  // Sanity check
  if ( image_annotation_thumb_width <= 0 || image_annotation_thumb_height <= 0 || image_annotation_image_width <= 0 || image_annotation_image_height <= 0 ) return ;

  // Add control elements
  var showhide ;
  var addboxes ;
  var controls = document.createElement ( "div" ) ;
  controls.id = "image_annotation_controls" ;

  if ( ids.length > 0 ) {
    showhide = document.createElement ( "a" ) ;
    showhide.href = "#" ;
    controls.appendChild ( showhide ) ;
    controls.appendChild ( document.createTextNode ( " | " ) ) ;
  }

  addboxes = document.createElement ( "a" ) ;
  addboxes.id = "image_annotation_add_link" ;
  addboxes.href = "#" ;
  controls.appendChild ( addboxes ) ;

  linkinfile.parentNode.insertBefore ( controls , linkinfile.nextSibling ) ;

  if ( ids.length > 0 ) {
    showhide.innerHTML = "Show/hide boxes" ;
    showhide.onclick = function () { image_annotation_show_hide() ; } ;
  }

  addboxes.innerHTML = "Add a box" ;
  addboxes.onclick = function () { image_annotation_add_box() ; } ;

  image_offset_left = parseInt (linkinfile.firstChild.offsetLeft, 10);
  image_offset_top = parseInt (linkinfile.firstChild.offsetTop, 10);

  // Add all boxes
  for ( var i = 0 ; i < ids.length ; i++ ) {
    var b = document.getElementById ( ids[i] ) ;
    var text = b.innerHTML ;
    text = text.split ( "|" , 2 ) ;
    var coords = text.shift().split(",") ;
    var title = text.pop() ;

    var left = parseInt ( coords[0] ) * image_annotation_thumb_width / image_annotation_image_width - 1 ;
    var top = parseInt ( coords[1] ) * image_annotation_thumb_height / image_annotation_image_height - 1 ;
    var width = parseInt ( coords[2] ) * image_annotation_thumb_width / image_annotation_image_width - 1 ;
    var height = parseInt ( coords[3] ) * image_annotation_thumb_height / image_annotation_image_height - 1 ;

    left = left + image_offset_left ;
    top = top + image_offset_top ;

    var id = "image_box_" + i ;
    var newdiv = document.createElement ( "div" ) ;
    newdiv.innerHTML = title ;
    newdiv.id = id ;
    newdiv.className = "image_box_class" ;
    newdiv.style.position = "absolute" ;
    newdiv.style.left = Math.floor ( left ) + "px" ;
    newdiv.style.top = Math.floor ( top ) + "px" ;
    newdiv.style.width = Math.floor ( width ) + "px" ;
    newdiv.style.height = Math.floor ( height ) + "px" ;
    newdiv.style.zIndex = "10" ;
    newdiv.style.textAlign = "center" ;
    newdiv.style.cursor = "pointer" ;
    newdiv.style.verticalAlign = "middle" ;
    newdiv.style.border = "2px solid red" ;
    newdiv.style.backgroundColor = "white" ;
    image_annotation_set_opacity( newdiv , 4 ) ;
    linkinfile.parentNode.insertBefore ( newdiv , linkinfile ) ;
    document.getElementById(id).onclick = function () { image_annotation_load_wiki_page("Category:"+escape(this.innerHTML)) ; } ;
    document.getElementById(id).onmouseover = function () { image_annotation_mouse_enter(this.id) ; } ;
    document.getElementById(id).onmouseout = function () { image_annotation_mouse_leave(this.id) ; } ;
  }
}
//</nowiki>