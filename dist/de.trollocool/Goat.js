function goattext()
{
    getlist=new XMLHttpRequest();
    getlist.open("GET", "http://de.trollocool.wikia.com/load.php?mode=articles&articles=MediaWiki:Custom-Goattexts&only=styles", false);
    getlist.send();
    var goattexts = getlist.responseText;
 
    goattexts=goattexts.split('/*')[0];
    goattexts=goattexts.split(',');
 
    var text=goattexts[Math.floor((Math.random()*goattexts.length))];
    return text;
}
 
$('<div id="Ziege"><img src="https://images.wikia.nocookie.net/hayday/images/thumb/5/52/Goat.png/100px-Goat.png" width="100px" height="100px"></img><p>'+goattext()+'</p></div>').appendTo( '.WikiaSiteWrapper');
 
$('#Ziege').on('click',function(){$("#Ziege > p").css('display','block'); $('#Ziege').css('opacity','0'); $("#Ziege").css('top', $("#Ziege").css('top')); $('#Ziege').css('animation-name','none');});