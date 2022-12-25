// Wikis Aliadas (extraido de Ben 10 Wiki, todos los derechos para su autor)
$(function(){
    $('#WikiaFooter').prepend('<section id="comunidadesaliadas"><div class="header-container"><h1>Comunidades aliadas</h1></div><ul></ul></section>');
        // es.memes-pedia
        $('<li data-wiki="Wiki Memes Pedia"><a href="http://es.memes-pedia.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.slycooper
        $('<li data-wiki="Wiki Sly Cooper"><a href="http://es.slycooper.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
});