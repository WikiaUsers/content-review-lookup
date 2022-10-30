window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.defimage = 'https://static.wikia.nocookie.net/yaoiboyslove/images/e/e6/Site-logo.png/revision/latest?cb=20210714142404e';

(function () {
    
    "use strict";
    
    var choices = document.getElementsByClassName("js-choose");
    var options, i, j;
    for (i = 0; i < choices.length; i++) {
        options = choices[i].getElementsByClassName("js-option");
        for (j = 0; j < options.length; j++) {
            options[j].classList.remove("current");
        }
        options[Math.floor(Math.random() * options.length)].classList.add("current");
    }
    
})();