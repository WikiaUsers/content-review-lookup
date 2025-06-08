$(function () {
    const navIcons = {
        'Wiki Guidelines': 'https://static.wikia.nocookie.net/bladeball/images/d/d5/TitanBlade.png/revision/latest?cb=20241109062358',
        'Game Contents': 'https://static.wikia.nocookie.net/bladeball/images/e/e2/Infinity.png/revision/latest?cb=20231203092053',
        'Game Infos': 'https://static.wikia.nocookie.net/bladeball/images/d/d0/Singularity.png/revision/latest?cb=20241109061647',
        'Miscellaneous': 'https://static.wikia.nocookie.net/bladeball/images/f/f5/DeathSlash.png/revision/latest?cb=20231127121024'
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