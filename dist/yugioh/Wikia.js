// Replace "Luster Dragon #2" with "Luster Dragon 2" etc. when searching
$('#WikiaSearch input:first-of-type').on('change', function() {
    $('#WikiaSearch input:first-of-type').val($('#WikiaSearch input:first-of-type').val().replace(' #', ' '));
});

// Fill in card details on upload
$(document).on('click', '#UploadPhotos input[type="submit"]', function()
{
    var selected_license = $('#wpLicense').find(':selected');

    if (selected_license.val() == 'OCG-TCG card image')
    {
        var image_name   = $('[name="wpDestFile"]').val().split('-');
        var card_name    = image_name[0];
        var card_set     = image_name[1];
        var card_region  = image_name[2];
        var card_rarity  = image_name[3];
        var card_edition = image_name[4];

        if (card_rarity.indexOf('.') != -1)
        {
            card_rarity = card_rarity.substring(0, card_rarity.indexOf('.'));
        }

        var licensing = 'TCG-OCG card image\n' +
            '| name    = ' + card_name   + '\n' +
            '| set     = ' + card_set    + '\n' +
            '| region  = ' + card_region + '\n' +
            '| rarity  = ' + card_rarity + '\n';

        if (card_edition != 'undefined')
        {
            if (card_edition.indexOf('.') != -1)
            {
                card_edition = card_edition.substring(0, card_edition.indexOf('.'));
            }

            licensing += '| edition = ' + card_edition+ '\n';
        }

        selected_license.val(licensing);
    }
});

$(document).ready(function() {
    $('#toc:not(.show)').find('#togglelink').click();
});