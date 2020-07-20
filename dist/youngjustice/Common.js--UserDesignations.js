/* Display of ranking on userprofile masthead by User:KettleMeetPot */
$(document).ready(function() {
    setTimeout(function() {
        if ($(".ranking").exists())  {
            var name = $(".masthead-info hgroup h1").text();
            var rankObject = $(".ranking p a").text().split(" #");
            rankObject = rankObject[1].split("");
            var mastheadString10 = name + "-D-Zero-";
            var mastheadString10Plus = name + "-D-";
            var numeralArray = [ "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" ];
            for ( i = 0; i <= rankObject.length - 1; i++ ) {
                if (rankObject.length - 1 === 0) {
                    mastheadString10 = mastheadString10 + numeralArray[rankObject];
                }
                else if ( rankObject.length - 1 > 0 && i != rankObject.length - 1) {
                    mastheadString10Plus = mastheadString10Plus + numeralArray[rankObject[i]] + "-";
                    mastheadString10 = mastheadString10Plus; 
                }
                else {
                    mastheadString10 = mastheadString10 + numeralArray[rankObject[i]];
                }
            }
            $(".masthead-info hgroup h1").html('<span class="mastheadPrefix">Recognized:</span> ' + mastheadString10);
        }
    }, 2000);
});