/* == Get Bible Verses ==
document.write('<script type="text/javascript" src="http://galaxie.com/include/getverse.js"></script>');
document.write('<script type="text/javascript" src="http://galaxie.com/include/tooltip.js"></script>');
document.write('<script type="text/javascript" src="http://galaxie.com/include/style.js"></script>');

== Set Bible verse to use popup ==
*/

addOnloadHook(function() {
  var links = document.getElementsByTagName("a");

  for (var i = 0; i < links.length; i++)
    if (/BibleVerse/.test(links[i].parentNode.className))
      links[i].target = "BibleVerse";
    else if ("BookLookUpInWP" == links[i].parentNode.className)
      links[i].target = "BookLookUpInWP";
});