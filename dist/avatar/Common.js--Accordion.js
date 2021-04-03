/* Any JavaScript here will be loaded for all users on every page load. */

function Accordion() {
  if ( $('.accordion').length > 0 ) {
    $(".accordion > :header:not(:last-child)").each(function () {   
      $(this).nextUntil(":header").wrapAll("<div></div>");
    });
    mw.loader.using( ['jquery.ui.core', 'jquery.ui.widget'], function () {
      $('.accordion').accordion({
        active:false,
        collapsible:true
      });
    });
  }
}
$(Accordion);