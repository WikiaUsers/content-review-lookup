/**
   LolAds -- 20 September 2010.
   Автор: [[Участник:Edward Chernenko]].
 
   Шуточная реклама (см. [[Абсурдопедия:Реклама]]) в левом нижнем углу страницы. */
 
function append_lolads()
{
    if(document.getElementById('lolads-sticker')) return;
 
    var col = document.getElementById('column-one');
    if(!col || col.nololads == 1) return;
 
    if(Math.random() >= 0.1) return; /* 10% шанс показать */
 
    var lolads_request;
 
    try
    {
        lolads_request = new XMLHttpRequest();
    }
    catch(e)
    {
        lolads_request = new ActiveXObject("Msxml2.XMLHTTP");
    }
 
    lolads = lolads_request;
    lolads_request.open("GET", "/?title=%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD:%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0&action=render");
 
    lolads_request.onreadystatechange = function()
    {
        if(lolads.readyState == 4)
        {
           var res = lolads.responseText;
 
           col.innerHTML += "<div class='generated-sidebar portlet' id='p-lolads'><h5><a href='/wiki/Абсурдопедия:Реклама'>Реклама</a> <a href='/index.php?title=Template:%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0&action=edit'>+</a></h5><div class='pBody'>" + res + "</div></div>";
        }
    }
 
    lolads_request.send(null);
}
addOnloadHook(append_lolads);