MastRights = {};
MastRights["Thest"] = ["Одмиен"];
MastRights["White torch"] = ["Бюрократ"];
MastRights["Iris iter"] = ["Системный оператор"];
MastRights["Kopcap94"] = ["Вафелька"];

// Main script's code and idea by Rappy4187
// Modified and fixed by Kopcap94
$(function () {
    if (!$('#UserProfileMasthead').length) {
        return;
    }

    uNick = (wgCanonicalSpecialPageName == 'Contributions') ? wgTitle.replace('Contributions/', '') : wgTitle;

    if (typeof (MastRights[uNick]) == "undefined") {
        return;
    }

    tags = '';
    $.each(MastRights[uNick], function (i, g) {
        tags += '<span class="tag">' + g + '</span>';
    });

    $('#UserProfileMasthead .tag').remove();
    $('#UserProfileMasthead hgroup').append(tags);
});