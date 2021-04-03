/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function($content) {
    $content.find('.new, .mw-userlink').each(function() {
          $(this).attr("href", $(this).attr("href").replace("?action=edit&redlink=1", "")).removeclass("new");
       });
});