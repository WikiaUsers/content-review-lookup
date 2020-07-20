/*****************
 * Случайный фон *
 *****************/
 
document.addEventListener("DOMContentLoaded", function(event)
{ 
    var imgs =
    [
        'https://vignette.wikia.nocookie.net/warhammer-40000-dawn-of-war-ii-retribution/images/9/91/Dawn_of_War_III_Art_%281%29.jpg/revision/latest?cb=20200501153402&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/warhammer-40000-dawn-of-war-ii-retribution/images/5/54/Dawn_of_War_III_Art_%282%29.jpg/revision/latest?cb=20200501153403&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/warhammer-40000-dawn-of-war-ii-retribution/images/d/d5/Dawn_of_War_III_Art_%283%29.jpg/revision/latest?cb=20200501153403&path-prefix=ru'
    ];
 
 document.getElementsByTagName("body")[0]
 .setAttribute("style", 'background-image:url(' 
 + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
 
});
/********************/