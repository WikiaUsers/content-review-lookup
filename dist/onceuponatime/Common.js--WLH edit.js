/* Any JavaScript here will be loaded for all users on every page load. */

function addEditLinksToWLH() {
  if(wgCanonicalSpecialPageName=='Whatlinkshere')
  {
    var links = document.getElementById("mw-whatlinkshere-list").getElementsByTagName('li');
    for(var i = 0; i<links.length; i++)
    {
      aLink = links[i].getElementsByTagName('a');
      var linkHref = aLink[0].href + "?action=edit";
      var tools = getElementsByClassName(links[i], 'span', 'mw-whatlinkshere-tools');
      var editLinkSpan = document.createElement("span");
      editLinkSpan.className = "mw-whatlinkshere-edit";
      editLinkSpan.innerHTML = '(<a title="Edit form" href="' + linkHref + '">edit</a>) ';
      links[i].insertBefore(editLinkSpan,tools[0]);
    }
  }
}
 
addOnloadHook(addEditLinksToWLH);