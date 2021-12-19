/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */

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
/* 模板来自 碧蓝航线 冒险蜗牛 */
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
    return mw.loader.load("//wiki.biligame.com/zqwn/index.php?title=" + text + "&action=raw&ctype=text/css", "text/css");
  }

  //加载JS脚本
  if (ns && ns[0].toLowerCase() !== 'mediawiki:') {
    return console.log('ResourceLoader: 不允许加载MediaWiki以外的js脚本');
  }
  if (text.slice(-3).toLowerCase() !== '.js') text = text + '.js';
  //if ($x.data('debug') !== true) text = text + '&debug=false';
  return mw.loader.load("//wiki.biligame.com/zqwn/index.php?title=" + text + "&action=raw&ctype=text/javascript", "text/javascript");
});