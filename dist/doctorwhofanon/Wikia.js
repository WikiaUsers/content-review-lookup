//Sign up message
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h2><center>' + 'Read & Create' + '</center>' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sign up}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

//Article Message
function moveArticlemessageDiv() {
  var fooel = document.getElementById('ArticleMessage');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('bottom');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!=null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticlemessageDiv);

//Site-wide Message 
/*$('#WikiaArticle').prepend('<div style="text-align:center;width:99%;padding:10px;color:white;font-weight:500;background:#6090AB">This site is having a bit of a facelift. Please bear with us as we try to get it finished. <a href="http://doctorwhofanon.wikia.com/wiki/Thread:20175" style=color:#A7DAF6;font-weight:900>Comments?</div></div>');*/