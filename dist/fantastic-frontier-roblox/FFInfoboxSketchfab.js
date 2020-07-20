/**
 * Upgrades infoboxes with sketchfab_link to support 3D model embeds from Sketchfab into the infobox in place of its image.
 * 
 * Example embed link: https://sketchfab.com/3d-models/staff-of-dreams-f3a245be467d4d77be16dbfa5bf03845/embed
 */


$(document).ready(function() {
    $(document).on('change', '.ve-ui-mwParameterPage-field .oo-ui-textInputWidget textarea', function() {
        var input = $(this);
        var field = input.parents('.ve-ui-mwParameterPage-field');
        var fieldName = field.parent().find('.ve-ui-mwParameterPage-label').text();
        if (fieldName !== 'sketchfab_link' && fieldName !== 'Sketchfab link') { return; }
        if (field.find('.ff-infobox-sf-info').length === 0) {
            field.append('<div class="ff-infobox-sf-info"></div>');
        }
        var sfInfo = field.find('.ff-infobox-sf-info');
        if (input.val().length > 6 && input.val().toLowerCase().indexOf('https://sketchfab.com/') === 0) {
            sfInfo.text('Finding 3D model thumbnail...');
            $.getJSON('https://sketchfab.com/oembed?url=' + input.val(), function(data) {
                sfInfo.html('You\'ve put a 3D model link.<br>Consider uploading the thumbnail to the wiki for use in the image of this infobox:<br><a target="__blank" alt="' + data.title + ' 3D model thumbnail" title="Opens in a new tab" href="' + data.thumbnail_url + '">' + data.title + '</a>');
            }).fail(function() {
                sfInfo.text('Failed to get 3D model thumbnail.');
            });
        } else if (input.val().length > 0) {
            sfInfo.text('Invalid 3D model link format.');
        } else {
            sfInfo.text('');
        }
    });
    
    $('.portable-infobox').each(function() {
        var infobox = $(this);
        if (infobox.find('.pi-item[data-source="sketchfab_link"]').length === 0) { return; }
        var model_link = infobox.find('.pi-data[data-source="sketchfab_link"] a').text();
        
        // We validate that the link is actually a Sketchfab 3D model, for the embedding.
        console.log(model_link, model_link.indexOf('https://sketchfab.com/3d-models/'));
        if (model_link.indexOf('https://sketchfab.com/3d-models/') !== 0) { return; }
        
        var imgBox = infobox.find('.pi-image');
        if (imgBox.length === 0) {
            imgBox = $('<figure class="pi-item pi-image"></figure>');
            if (infobox.find('.pi-title').length > 0) {
                $(infobox.find('.pi-title')[0]).append(imgBox);
            }
        }
        imgBox = $(imgBox[0]);
        
        imgBox.html('<div class="ff-infobox-sf-wrap"><div class="ff-infobox-sf-modes"><a class="ff-infobox-sf-2d">Image</a> / <a class="ff-infobox-sf-3d">3D</a></div><div class="ff-infobox-sf-display"><div class="sketchfab-embed-wrapper" style="display:none"><iframe height="300" title="" webkitallowfullscreen="true" width="300" frameborder="0" class="" src="' + model_link + '/embed" allowfullscreen="" onmousewheel="" allowvr="" allow="autoplay; fullscreen; vr" mozallowfullscreen="true"></iframe></div>' + imgBox.html() + '</div></div>');
        
        var modes = imgBox.find('.ff-infobox-sf-modes');
        var display = imgBox.find('.ff-infobox-sf-display');
        
        modes.find('.ff-infobox-sf-2d').click(function() {
            display.find('>a').css({display: ''});
            display.find('.sketchfab-embed-wrapper').css({display: 'none'});
        });
        
        modes.find('.ff-infobox-sf-3d').click(function() {
            display.find('>a').css({display: 'none'});
            display.find('.sketchfab-embed-wrapper').css({display: ''});
        });
    });
});