/* Пользовательский ProfileCard */
var currentUrl = decodeURIComponent(window.location.href);
var username = currentUrl.replace(/.*\/(Участни(к|ца):|Стена_обсуждения:|Служебная:Вклад\/|Служебная:UserProfileActivity\/)/g, "").replace(/\?action=(edit|history|purge|protect|delete)/, "");
var profile = "https://genshin-impact.fandom.com/ru/wiki/Участник:" + username;
if (/(Стена_обсуждения:|Служебная:Вклад\/|Служебная:UserProfileActivity\/|Участни(к|ца):)/.test(currentUrl)) {
    $.ajax({
    url: profile,
    success: function(response) {
        var profileDiv = $(response).find('div[class*="profile-theme--"]');
        $('#userProfileApp').append(profileDiv);
        }
    });
}