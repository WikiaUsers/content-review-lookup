/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function()
{
  var enableWidget = document.getElementById("reddit-widget");
  if (enableWidget)
  {
    var redditWidget = document.createElement("iframe");
    redditWidget.width = "100%";
    enableWidget.appendChild(redditWidget);
    redditWidget.contentWindow.document.write("<html><head></head><body><script src='https://www.reddit.com/r/talesoftherays/hot/.embed?limit=4&t=all' type='text/javascript'></script></body></html>");
    var tryReadjust = setInterval(function()
    {
      var t = redditWidget.contentDocument.children; 
      t = t[0].getElementsByClassName("rembeddit")[0]; 
      if (t)
      {
        document.getElementById("reddit-widget").appendChild(t);
        redditWidget.remove();
        clearInterval(tryReadjust);
      }
    }, 1000);  
  }
});