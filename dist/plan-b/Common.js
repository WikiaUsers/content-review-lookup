/* Any JavaScript here will be loaded for all users on every page load. */

//********************************************************************************
// Start "Articletype positioning" script; by User:Bp - Installed for test by plkrtn 3/2/10 - Testing by Pyramidhead
//********************************************************************************
function moveArticletypeDiv() {
  var fooel = document.getElementById('lp-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
       artel.parentNode.insertBefore(fooel,artel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
hookEvent("load", moveArticletypeDiv);
// End "Articletype positioning" script
 
// Scroll to an anchor ID defined in element "data-scroll-to".
// Used in conjunction with collapse buttons on long tables/sections.
$('[data-scroll-to]').click(function(){  
    var target = $(this).data('scroll-to');
    $('html, body').animate({ scrollTop: $(target).offset().top -80 }, 500);
});