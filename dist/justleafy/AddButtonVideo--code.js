// Button for adding a video
// Made by User:JustLeafy
// TODO: I18n
$('.page-header__contribution-buttons').append(
    $('<a>', {
        'class': 'wds-button wds-is-squished wds-is-secondary',
        href: mw.util.getUrl(page),
        text: 'Add a Video',
        title: 'Add a Video'
    })
);