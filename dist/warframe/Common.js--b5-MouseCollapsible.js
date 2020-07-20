var b5_MouseCollapsible_ArrayObj = [];

$('.b5_MouseCollapsible').mouseenter(function () {
    if (b5_MouseCollapsible_ArrayObj[$(this).attr('id')] === undefined) { //taking in data on new objects
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')] = $(this).attr('id'); //filling this array slot
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')] = new Object(); //turning this array slot into an object

        //starting to collect data
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].Click = false; //click feature
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].StartingHeight = $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).height(); //starting/collapsed height
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].EndingHeight = $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).css('max-height'); //ending/expanded height;
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].StartingWidth = $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).width(); //starting/collapsed width
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].EndingWidth = $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).css('max-width'); //ending/expanded width
    }

    $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).css('height', 'auto'); //expand height to full before starting the transition now that the data has been collected
    $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).css('max-height', b5_MouseCollapsible_ArrayObj[$(this).attr('id')].EndingHeight); //expand height
});

$('.b5_MouseCollapsible').mouseleave(function () {
    if (b5_MouseCollapsible_ArrayObj[$(this).attr('id')].Click === false) { //check if clicked
        $('.b5_MouseCollapsible_Child-' + $(this).attr('id')).css('max-height', b5_MouseCollapsible_ArrayObj[$(this).attr('id')].StartingHeight); //collapse height
    }
});

$('.b5_MouseCollapsible').mousedown(function () { //if clicked, meant to freeze from collapsing
    if (b5_MouseCollapsible_ArrayObj[$(this).attr('id')].Click === false) { //not clicked
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].Click = true; //is now clicked
        return;
    }
    if (b5_MouseCollapsible_ArrayObj[$(this).attr('id')].Click === true) { //is now clicked
        b5_MouseCollapsible_ArrayObj[$(this).attr('id')].Click = false; //is not clicked
        return;
    }
});