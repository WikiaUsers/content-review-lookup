/* Any JavaScript here will be loaded for all users on every page load. */
if ( $('.classe_Tirage')[0] )
    {
        ListItem = new Array(4);
        ListItem[0] = '<B>Madi</B>'
        ListItem[1] = '<I>Flo</I>'
        ListItem[2] = '<B>Crody</B>'
        ListItem[3] = '<I>Jar</I>'
        ListItem[4] = '<B>Think</B>'
        function LMW_Rnd(StartItem,EndItem,NbrOfItem)
        { // v1.0
        for (vr=1;vr<NbrOfItem;vr++)
        {
        RndNbr=Math.random()*(1+EndItem-StartItem)
        ItemRnd=StartItem+Math.floor(RndNbr);
        function monBouton() {
    var str = "How are you doing today?";
    var res = str.split();
    document.getElementById("demo").innerHTML = res;
}
        }
        }
        monBouton='<button type="button">Cliquez ici </button>';
$("#resultatTirage").append(monBouton);
    }