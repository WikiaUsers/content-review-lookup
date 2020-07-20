//<source lang="javascript">
/**
 * Easter Eggs for the Nuclear-Throne Wiki
 * @author Witik
 *
 */
/*jshint curly:false jquery:true browser:true */

(function() {
    "use strict";

    var verifyVenuzList = [16, 51, 86, 69, 82, 73, 70, 89, 86, 69, 78, 85, 90],
        verifyVenuzCount = 0,
        venuzSrc = "https://images.wikia.nocookie.net/__cb20131202181230/nuclear-throne/images/9/9a/Yv_counting.gif",
        venuzKey = "Yv_counting.gif",
        venuzName = "Yv counting.gif",
        venuzTxt = "#verifyvenuz",
        makeAllVenuz = function() {
            var i,
                images = document.getElementsByTagName("img");
            for (i = images.length - 1; i >= 0; i--) {
                images[i].setAttribute("src", venuzSrc);
                images[i].setAttribute("data-src", venuzSrc);
                images[i].setAttribute("alt", venuzTxt);
                images[i].setAttribute("data-image-name", venuzName);
                images[i].setAttribute("data-image-key", venuzKey);
            }
        };

    window.EasterEggs = {
        handleInput: function(keyCode) {
            if (keyCode === verifyVenuzList[verifyVenuzCount]) {
                verifyVenuzCount += 1;
                if (verifyVenuzCount === verifyVenuzList.length) {
                    makeAllVenuz();
                    verifyVenuzCount = 0;
                }
            } else {
                verifyVenuzCount = 0;
            }
        }
    };
}());
//</source>