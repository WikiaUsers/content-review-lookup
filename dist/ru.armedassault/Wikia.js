/* ################################################################################################################################################
   Random Page Background
   Author: Dimas535
################################################################################################################################################ */

function randomBg () {
    var imgs = [
        'https://images.wikia.nocookie.net/armedassault/images/d/da/Wiki-Background-1.jpg',
        'https://images.wikia.nocookie.net/armedassault/images/1/12/Wiki-Background-2.jpg',
        'https://images.wikia.nocookie.net/armedassault/images/7/71/Wiki-Background-3.jpg',
        'https://images.wikia.nocookie.net/armedassault/images/6/68/Wiki-Background-4.jpg',
        'https://images.wikia.nocookie.net/armedassault/images/0/09/Wiki-Background-5.jpg',
        'https://images.wikia.nocookie.net/armed-assault/ru/images/3/38/Background1.jpg',
        'https://images.wikia.nocookie.net/armed-assault/ru/images/6/67/Background2.jpg',
        'https://images.wikia.nocookie.net/armed-assault/ru/images/1/11/Ru.arma.wikia.com_-_Background3.jpg'
    ];

    $('body').css('background-size', 'cover');
    $('body').css('background-attachment', 'fixed');
    $('body').css('background-image','url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
$(randomBg);

/* ################################################################################################################################################
   Special Article Appearance
   Author: Dim@s535
################################################################################################################################################ */
/* Disabled
function articleAppear() {
    var arList = ["ArmA 2","ArmA 3"],
        arHeadEl = document.getElementById("WikiaPageHeader").children[0];

    if (arList.indexOf(arHeadEl.innerText) !== -1) {
        arHeadEl.style.color = "(цвет)";
        $('body').css('background-image', 'url(' + 'http://...' + ')');
    }
}

$(articleAppear);
*/

/* ################################################################################################################################################
   DHTML Snow Effect
   Author: Scott Schiller
################################################################################################################################################ */
/* Disabled
importArticle({
    type: "script",
    articles: [
        "MediaWiki:Snow.js"
    ],
});
*/