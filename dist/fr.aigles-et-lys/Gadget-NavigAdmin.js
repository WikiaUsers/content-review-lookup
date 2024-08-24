/* 
 * OptimizedNavigAdmin
 * 
 * Liens utiles � l'administration
 * 
 * Auteur : Dake
 * Contributeur : Tieno
 * Derni�re r�vision : 1 novembre 2008
 * {{:Projet:JavaScript/Script|NavigAdmin}}
 */

function OptimizedNavigAdmin()
{
        var a = document.getElementById("p-navigation");
        if (a)
        {
                b = a.getElementsByTagName("ul");
                if(b.length > 0)
                {
                        b[0].innerHTML = b[0].innerHTML
                                + '<br>'
                                + '<li><span id="n-admin" title="Aigles_et_Lys:Administrateur">'
                                + '<a href="/wiki/Aigles_et_Lys:Administrateur">Administrateur</a>'
                                + '</span></li>'
                                + '<li><span id="n-badmin" title="Aigles_et_Lys:Bulletin des administrateurs">'
                                + '<a href="/wiki/Aigles_et_Lys:Bulletin des administrateurs">Bulletin</a>'
                                + '</span></li>'
                                + '<li><span id="n-radmin" title="Aigles_et_Lys:Requ�te aux administrateurs">'
                                + '<a href="/wiki/Aigles_et_Lys:Requ�te aux administrateurs">Requ�tes</a>'
                                + '</span></li>'
                                + '<br>'
                                + '</span></li>'
                                + '<li><span id="n-npages" title="Special:Newpages">'
                                + '<a href="/wiki/Special:Newpages">Nouvelles pages</a>'
                                + '</span></li>'
                                + '<li><span id="n-spages" title="Special:Shortpages">'
                                + '<a href="/wiki/Special:Shortpages">Articles courts</a>'
                                + '</span></li>'
                                + '<li><span id="n-logs" title="Special:Log">'
                                + '<a href="/wiki/Special:Log">Journaux</a>'
                                + '</span></li>'
                                + '<br>'
                                + '<li><span id="n-blockip" title="Special:BlockIp">'
                                + '<a href="/wiki/Special:Blockip">Bloquer</a>'
                                + '</span></li>'
                }
        }
}

addOnloadHook(OptimizedNavigAdmin);