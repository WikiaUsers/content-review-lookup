// For switching between MK1/2/3 views
// CSS display:
//     none = invisible, block = visible

// mk1 button; show mk1, hide mk2 and 3
$('#buttonmk1').click(function () {
    $('#elementmk1').css('display', 'block');
    $('#elementmk2').css('display', 'none');
    $('#elementmk3').css('display', 'none');
});
// mk2 button; show mk2, hide mk1 and 3
$('#buttonmk2').click(function () {
    $('#elementmk1').css('display', 'none');
    $('#elementmk2').css('display', 'block');
    $('#elementmk3').css('display', 'none');
});
// mk3 button; show mk3, hide mk1 and 2
$('#buttonmk3').click(function () {
    $('#elementmk1').css('display', 'none');
    $('#elementmk2').css('display', 'none');
    $('#elementmk3').css('display', 'block');
});