// Main script's code and idea by Rappy4187
// Modified and fixed by Kopcap94
$(function () {
    if (!$('#UserProfileMasthead').length) {
        return;
    }

    var uNick = (wgCanonicalSpecialPageName == 'Contributions') ? wgTitle.replace('Contributions/', '') : wgTitle;

    if (typeof (MastRights[uNick]) == "undefined") {
        return;
    }

    var tags = '';
    $.each(MastRights[uNick], function (i, g) {
        tags += '<span class="tag">' + g + '</span>';
    });

    $('#UserProfileMasthead .tag').remove();
    $('#UserProfileMasthead hgroup').append(tags);
});