//* CREDITS TO BLADEBALL WIKI THIS WAS TAKEN FROM THE BLADEBALL WIKI!!!

$(function () {
    const navIcons = {
        'GAME': 'https://static.wikia.nocookie.net/jujutsu-shenanigans/images/e/e8/Vessel_icon.png/revision/latest?cb=20241030033201',
       'CHARACTERS': 'https://static.wikia.nocookie.net/jujutsu-shenanigans/images/1/18/Blood_Manipulator_ICON_.png/revision/latest?cb=20241104210130',
        'FEATURES': 'https://static.wikia.nocookie.net/jujutsu-shenanigans/images/5/58/Gambler_ult_icon.png/revision/latest?cb=20241030043852',
        'WIKI COMMUNITY': 'https://static.wikia.nocookie.net/jujutsu-shenanigans/images/c/c2/Tenshadowsulticon.png/revision/latest?cb=20241209201322'
    };

    $('.wds-tabs__tab-label').each(function () {
        const label = $(this).text().trim();
        if (navIcons[label]) {
            $(this).prepend(
                $('<img>')
                    .attr('src', navIcons[label])
                    .css({
                        width: '23px',
                        height: '23px',
                        marginRight: '5px',
                        verticalAlign: 'middle'
                    })
            );
        }
    });
});