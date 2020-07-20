if (wgPageName === "Utilisateur:Hulothe/Test_titres") {
    var titreh2 = $('.WikiaArticle h2 .mw-headline').text();
    var titreh3 = $('.WikiaArticle h3 .mw-headline').text();
    var titreh4 = $('.WikiaArticle h4 .mw-headline').text();
    var newtitreh2 = titreh2.replace(/Br/g, '<img src="https://images.wikia.nocookie.net/__cb20130823162743/breakingbad/images/4/4c/BreakingBad-BRperiodic.png" width="40">');
    var newtitreh3 = titreh3.replace(/Br/g, '<img src="https://images.wikia.nocookie.net/__cb20130823162743/breakingbad/images/4/4c/BreakingBad-BRperiodic.png" width="30">');
    var newtitreh4 = titreh4.replace(/Br/g, '<img src="https://images.wikia.nocookie.net/__cb20130823162743/breakingbad/images/4/4c/BreakingBad-BRperiodic.png" width="20">');
    $('.WikiaArticle h2 .mw-headline').html(newtitreh2);
    $('.WikiaArticle h3 .mw-headline').html(newtitreh3);
    $('.WikiaArticle h4 .mw-headline').html(newtitreh4);
}