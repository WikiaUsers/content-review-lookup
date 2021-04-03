$(document).ready(function() {

    var nav = $(".wikia-menu-button").first().after('<nav class="wikia-menu-button"></nav>');

    nav.append('<a accesskey="e" data-id="edit" id="ca-edit"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22">Platform</a>');

    nav.append('<span class="drop"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></span>');

    var list = nav.append('<ul class="WikiaMenuElement"></ul>');

    list.append('<li></li>').append('<a href="/wiki/Awesomenauts_Wiki?action=history" accesskey="h" data-id="history" id="ca-history">PC</a>').click(pcClicked);

    list.append('<li></li>').append('<a href="/wiki/Special:MovePage/Awesomenauts_Wiki" accesskey="m" data-id="move" id="ca-move">Console</a>').click(consoleClicked);

    function pcClicked() {
        setCookie("WikiPlatform", "PC", 365);
    }

    function consoleClicked() {
        setCookie("WikiPlatform", "CONSOLE", 365);
    }

    function setCookie(c_name,value,exdays)
    {
         var exdate=new Date();
         exdate.setDate(exdate.getDate() + exdays);
         var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
         document.cookie=c_name + "=" + c_value;
    }

 
 });