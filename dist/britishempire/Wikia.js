/* 
This code is loaded on all skins.
*/

/* Opens chat in a new window for homepage */
$(".openchat a").click(function() {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});

$(function() {
    // Move searchbar into H1 on masthead
    $('#UserProfileMastheadSearch').appendTo('.masthead-info hgroup h1');
 
    // Move Edit button to more logical position
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

/*Testing possibility of image pop-up on text hover*/
$('#textpop').mouseenter(function(){
    $('#image_to_show').fadeIn();
}).mouseleave(function(){
    $('#image_to_show').fadeOut();
});