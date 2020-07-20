$(function () {
    var target = '';

    if (mw.config.get('wgIsMainPage') === true) {
        target = 'header.WikiaPageHeader div.mainpage-tally em';
    } else {
        target = 'section.WikiaPagesOnWikiModule details.tally em';
    }

    var link = $('<a/>').attr('href', "/wiki/EverQuest_2_Wiki:Number_of_Articles");
    $(link).html($(target).html());

    $(target).html(link);
});