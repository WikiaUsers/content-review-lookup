/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
var titles = document.getElementById('tab-header').getElementsByTagName('li');
var divs = document.getElementById('tab-content').getElementsByClassName('dom');

$('toc').each(function () {
	dragElement($this);
})

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}






  
$(document).on('click', '#zero',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[0].className = 'selected';
            divs[0].style.display = 'block';
});
$(document).on('click', '#one',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[1].className = 'selected';
            divs[1].style.display = 'block';
});
$(document).on('click', '#two',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[2].className = 'selected';
            divs[2].style.display = 'block';
});
$(document).on('click', '#three',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[3].className = 'selected';
            divs[3].style.display = 'block';
});

/* Any JavaScript here will be loaded for all users on every page load. */
/*模板来自 CyberPunk
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    
    // Allow links as tabs
    $(".ui-tabs li a.ui-tabs-anchor").each(function(_, e) {
      if (!$(e).attr("href").startsWith("#"))
        $(e).unbind("click");
    });
    
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* lockdown for reference popup configuration */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
/* -- 为页面加载JS脚本或CSS样式表 -- */
/* 参见[[模板:ResourceLoader]]*/
/* 来源：碧蓝航线WIKI*/
$('.resourceLoader').each(function () {
  var $x = $(this);
  var text = $.trim($x.text());

  if (!text) return;

  //加载模块
  if ($x.data('isModule') === true)
    return mw.loader.load(text);

  //自动补充MediaWiki命名空间
  var ns = text.match('^.*?:');
  if (!ns) text = 'MediaWiki:' + text;

  //加载CSS样式表
  var mime = ($x.data('mime') || "text/javascript").toLowerCase();
  if (mime == "text/css") {
    if (text.slice(-4).toLowerCase() !== '.css') text = text + '.css';
    //if ($x.data('debug') !== true) text = text + '&debug=false';
    return mw.loader.load("//wiki.biligame.com/ys/index.php?title=" + text + "&action=raw&ctype=text/css", "text/css");
  }

  //加载JS脚本
  if (ns && ns[0].toLowerCase() !== 'mediawiki:') {
    return console.log('ResourceLoader: 不允许加载MediaWiki以外的js脚本');
  }
  if (text.slice(-3).toLowerCase() !== '.js') text = text + '.js';
  //if ($x.data('debug') !== true) text = text + '&debug=false';
  return mw.loader.load("//wiki.biligame.com/ys/index.php?title=" + text + "&action=raw&ctype=text/javascript", "text/javascript");
});