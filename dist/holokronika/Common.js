function moveToHeader(elem) {
    $('#WikiaPageHeader, #firstHeading').append($('#mw-content-text').find(elem));
}
$(function() {
    moveToHeader('#title-eraicons');
});