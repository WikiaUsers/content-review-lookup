//The JS code needed to power the new voting templates
if ($('.header-title > h1').text().indexOf('Vote:') > -1 || $('.header-title > h1').text().indexOf('Animal Jam Wiki:Request') > -1 ) {
    var supporttotal = [];
    var neutraltotal = [];
    var opposetotal = [];
    var usersections = [];
    var supportpercent = [];
    var noofsections = $('.section').length;
    var sections = $('.section');
    var i = 0;
    while (i < noofsections) {
        usersections.push($(sections[i]).attr("id"));
        i++;
    }
    i = 0;
    while (i < noofsections) {
        supporttotal.push($('#'+usersections[i]+' > .support').length);
        neutraltotal.push($('#'+usersections[i]+' > .neutral').length);
        opposetotal.push($('#'+usersections[i]+' > .oppose').length);
        supportpercent.push(calculatepercentage(supporttotal[i], opposetotal[i]));
        i++;
    }
    i = 0;
    while (i < noofsections) {
        $('#'+usersections[i]+' .supportdisp').append(supporttotal[i]);
        $('#'+usersections[i]+' .neutraldisp').append(neutraltotal[i]);
        $('#'+usersections[i]+' .opposedisp').append(opposetotal[i]);
        $('#'+usersections[i]+' .votetitle').append('<br/>('+supportpercent[i]+'%)');
        i++;
    }
}

function calculatepercentage(supporttotal, opposetotal) {
    if (supporttotal === 0) {
        return 0;
    } else {
        return Math.round((supporttotal/ (supporttotal + opposetotal)) * 100);
    }
}