/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
//Customization for imported scripts
//PreloadFileDescription, source: https://dev.fandom.com/wiki/PreloadFileDescription
PFD_templates = [
    {
        label:   '总体文件',
        desc:    '{' + '{Information\n|描述 = \n|来源      = \n|游戏        = \n|重置  = \n|关卡       = \n|关卡部分   = \n|位置    = \n|主题       = \n|许可     = \n|批准人    = \n}}\n{' + '{Unprocessed File}}',
    },
    '其他模板',
    {
        label:   '录音日记/留声机的图片或录音',
        desc:    '{' + '{Audio Diary File\n|游戏           = \n|关卡          = \n|标题          = \n|说话者        = \n|显示的说话者     = \n|地点       = \n|文章        = \n|显示的文章     = \n|许可        = \n|来源         = \n|来源路径     = \n|来源文件名称 = \n}}\n{' + '{Unprocessed File}}',
    },
    {
        label:   '活动电影放映机的图片或录音',
        desc:    '{' + '{Kinetoscope File\n|游戏           = \n|关卡          = \n|标题          = \n|说话者        = \n|显示的说话者     = \n|地点       = \n|文章        = \n|显示的文章     = \n|许可        = \n|来源         = \n|来源路径     = \n|来源文件名称 = \n}}\n{' + '{Unprocessed File}}',
    },
];

/* 
 * Replacement for the old collapsible tables.
 * This incorporates mw-collapsible which brings several advantages over the previous method:
 * - Bundled with MediaWiki, so unlikely to ever break
 * - Works on previews too
 * - Performs better, instantaneously instead of the content showing for a split second
 */

// Amount of navboxes on a page that should be regarded as limit. If met, collapse all navboxes on the page
var autoCollapse = 2; 
var navBoxes = $( '.navbox' ).not( '.nocount' );

if ( navBoxes.length >= autoCollapse ) {
    // Collapse all elements in navBoxes
    navBoxes.addClass( 'mw-collapsed' );
}

// ============================================================
// BEGIN sliders using jquery by User:Tierrie
// ============================================================

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
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
} );

// ============================================================
// END sliders using jquery by User:Tierrie
// ============================================================