$(document).ready(function() {
    $('td.stage2').find("img").css({"opacity":"0.5"});
    $('td.stage3').find("img").css({"opacity":"0.5"});
});

$('td.stage1').mouseenter(function(){
    renderPetEvolution(this, 'evolution1');
    $(this).find("img").css({"opacity":"1"});
});
$('td.stage2').mouseenter(function(){
    renderPetEvolution(this, 'evolution2');
    $(this).find("img").css({"opacity":"1"});
});
$('td.stage3').mouseenter(function(){
    renderPetEvolution(this, 'evolution3');
    $(this).find("img").css({"opacity":"1"});
});


function renderPetEvolution(startingElement, stage) {
    
    var table = $(startingElement).parentsUntil("table");
    
    var cells = $(table).children().children().children();

    $(table).find("img").css({"opacity":"0.5"});

    for (var j = 0; j < cells.length; j++) {
        if ($(cells[j]).hasClass(stage))
            cells[j].style.display = 'inline';
        else
            cells[j].style.display = 'none';
    }
    
}