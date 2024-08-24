/*
 * R�sum� Deluxe
 *
 * Ajoute des commentaires de modification pr�d�finis
 *
 * Auteur : Dake
 * Contributions : Pabix, Tieno
 * Date de derni�re r�vision : 10 avril 2009
 * {{:Projet:JavaScript/Script|ResumeDeluxe}}
 */

//////////////////////ZONE PERSONNALISABLE//////////////////////
var resumedeluxeTitles = new Array();
with (resumedeluxeTitles) {
        push("orthographe");
        push("- typographie");
        push("- cat�gorisation");
        push("- interwiki");
        push("- wikification");
        push("- image");
        push("- mise en page");
        push("- redirection");
        push("- relecture");
        push("- style");
        push("- revert");
        push("- r�organisation");
        push("- r�ponse");
        push("- maintenance");
        push("- 1.0");
        push("- homonymie");
        push("- bandeau");
        push("- infobox");
        push("- r�f�rences");
        push("- retouche de la modification pr�c�dente");
}
var resumedeluxeInputs= new Array();
with (resumedeluxeInputs) {
        push("orthographe");
        push("typographie");
        push("cat�gorisation");
        push("interwiki");
        push("wikification");
        push("image");
        push("mise en page");
        push("redirection");
        push("relecture");
        push("style");
        push("revert");
        push("r�organisation");
        push("r�ponse");
        push("maintenance");
        push("�valuation Aigles et Lys 1.0");
        push("cr�ation homonymie");
        push("ajout de bandeau");
        push("infobox");
        push("r�f�rences");
        push("retouche de la modification pr�c�dente");
}
/////////////////FIN DE LA ZONE PERSONNALISABLE/////////////////

function setSummary(str)
{
        document.editform.wpSummary.value = str;
}

function addToSummary(str)
{
        var resum = document.editform.wpSummary.value;
        if(resum != 0 && resum.indexOf("*/") < resum.length - 3) {
                document.editform.wpSummary.value += " ; ";
        }
        document.editform.wpSummary.value += str;
}

function DeluxeSummary()
{
        if (document.URL.indexOf("&section=new") > 0) return;
        var sumLbl = document.getElementById("wpSummaryLabel");
        if(sumLbl) {
                var sumInput = document.getElementById("wpSummary");
                sumInput.style.width = "95%";
                var str = "Messages pr�d�finis : ";
                for(var cpt = 0; cpt < resumedeluxeTitles.length; cpt ++) {
                        var tmp = resumedeluxeInputs[cpt];
                        str += "<a href=\"javascript:addToSummary('" + tmp.replace( /[']/g , "\\'") + "')\""
                                + " class=\"sumLink\" title=\"Ajouter dans la bo�te de r�sum�\">"
                                + resumedeluxeTitles[cpt]
                                + "</a> ";
                }
                sumLbl.innerHTML = str + "<br />" + sumLbl.innerHTML;
        }
}
addOnloadHook(DeluxeSummary);