/* Tekkit wordmark link
 */
 
$(document).ready(function () {
  if ( wgCanonicalNamespace == "Tekkit" ) {
    $(".wordmark.large.graphic a:first-child").attr("href","/wiki/Tekkit");
  }
});