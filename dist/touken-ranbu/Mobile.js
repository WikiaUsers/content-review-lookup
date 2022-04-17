/* Any JavaScript here will be loaded for users using the mobile site */
var cssId = 'https://touken-ranbu.fandom.com/load.php?fandomdesktop=1&lang=en&modules=site.styles&only=styles&skin=fandomdesktop';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://touken-ranbu.fandom.com/load.php?fandomdesktop=1&lang=en&modules=site.styles&only=styles&skin=fandomdesktop';
    link.media = 'all';
    head.appendChild(link);
}