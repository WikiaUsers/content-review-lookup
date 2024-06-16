
$(function() {
  var links = document.getElementsByTagName("a");

  for (var i = 0; i < links.length; i++)
    if (/BibleVerse/.test(links[i].parentNode.className))
      links[i].target = "BibleVerse";
    else if ("BookLookUpInWP" == links[i].parentNode.className)
      links[i].target = "BookLookUpInWP";
});