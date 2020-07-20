/* Any JavaScript here will be loaded for all users on every page load. */

//Allow setting all Tabber's tab based on a preset "OpenTab=XX" class -- coded by Kozd
//V2 updated from default Tabber tab and "OpenTab=X" to all Tabber's tab and "OpenTab=XX"
function selecttabber() {
    var tabber = document.getElementsByClassName("tabber-NavSpecies");
    if (tabber.length > 0) {
        for (var tab = 0; tab < tabber.length; tab++) {
            for (var i = 0; i < tabber[tab].classList.length; i++) {
                if ((tabber[tab].classList[i].length > 8) && (tabber[tab].classList[i].indexOf("OpenTab=") === 0)){
                    var number = parseInt(tabber[tab].classList[i].substr(8,2),10) - 1;
                    tabber[tab].children[0].children[0].getElementsByTagName("li")[number].children[0].click();
                    break;
                }
            }
        }
    }
}
// in case the document is already rendered
if (document.readyState!="loading") selecttabber();
// modern browsers
else if (document.addEventListener) document.addEventListener("DOMContentLoaded", selecttabber);