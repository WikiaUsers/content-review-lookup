// append '&format=original' to the url source of specified images
$( function() {
    $('.mw-parser-output img').each( function() {
        var imagename = $(this).attr('data-image-name');
        if ((imagename.match(/^Sprite/) != null) || (imagename.match(/^NPC/) != null) || (imagename.match(/^Artifact/) != null) || (imagename.match(/^Icon/) != null) || (imagename.match(/^Equipment/) != null) || (imagename.match(/^Costume/) != null)) {
            $(this).attr('src', $(this).attr('src') + '&format=original');
        }
    });
});