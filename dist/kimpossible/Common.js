/* Any JavaScript here will be loaded for all users on every page load. */

/*var kpw_data = document.getElementById('kpw_data').innerHTML;
document.getElementById('kpw_display').innerHTML = kpw_data;*/
 
if ( mw.config.exists( 'wgGlobalGroups' ) ) {
  document.getElementById('kpw_display').innerHTML = "mw exist";
}

/* Left-justify Reflist multi-links */

$('ol.references > li').each(function() {
        if ($(this).children('sup').length > 0) {
                $(this).children('.reference-text').insertBefore($(this).children('sup:first'));
        }
});

/* Color Code three Categories */
 
$(function() {
    var cats = mw.config.get('wgCategories'), 
      colors = {
        'LAM101':'rgb(128, 0, 128)',
        'Art101':'rgb(120, 175, 230)',
        'Film101':'rgb(255, 99, 71)'
      };
    for (var cat in colors) {
        if (cats.indexOf(cat) !== -1) {
            mw.util.addCSS('.WikiaArticle {' +
              'border: 0px solid ' + colors[cat] + ';' + 
              'background-color: transparent;' + //fallback
              'background-color: ' + colors[cat].replace('rgb', 'rgba').replace(')', ', 0.1)') + ';' + 
              'padding: 2px;' + 
            '}');
            break;
        }
    }
});