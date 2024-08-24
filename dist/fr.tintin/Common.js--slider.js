/* Slider Jquery 
 * Inspiré du travail de Tierrie, adapté au Wiki Tintin par Soronos
 */

$(function() {
  if ( mw.config.get('wgPageName') =="Wiki_Tintin") {
    mw.loader.using( ['jquery.ui.tabs'], function() {
      var $tabs = $("#portal_slider").tabs({ fx: [{opacity:'toggle', duration:200},{height:'toggle', duration:'normal'}, ] } );
      $("[class^=portal_sliderlink]").click(function() { // lier le clic au lien
        var currentCl = $(this).prop('class');
        var workaround = $(this).children("a").prop('href');
        $(this).children("a").children("img").addClass("selectedImg");
        $(".selectedImg").animate( {height: "90%", width: "90%" }, { duration: 50, queue: true} );
        $(".selectedImg").animate( {height: "100%", width: "100%" }, { duration: 150, queue: true, complete: function(){
          $(".selectedImg").removeClass("selectedImg");
          if ( currentCl != "portal_sliderlink_15" ) {
            $tabs.tabs('select', currentCl.replace("portal_sliderlink_", ""));
          }
          else {
            window.location.replace(workaround);
          }
        } } );
        return false;
      });
    });
    //data-src vers img-src pour atténuer le décalage sur certaines images
    $( "#portal_slider img" ).each(function(i,e) {
        dataSRC = $(e).attr("data-src");
        $(e).attr("src", dataSRC);
    });
    }
});