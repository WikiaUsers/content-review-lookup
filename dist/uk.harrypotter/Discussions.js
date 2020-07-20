// ############################## //
// ### Обговорення Гарріпедія ### //
// ### Version 1.2            ### //
// ############################## //
//@ By: Сибирский Смотритель
//@ Ukrainian translation: Skyflurry
if ($('#WikiaRail').length) {
  var waitCommunityModule = setInterval(function() {
    if (!$('.community-page-entry-point-module').length) return;
    var i18n = {
      uk: {
        description: "Нове розширення на «Гарріпедія»!",
        button: "Перейти до обговорень"
      },
      en: {
        description: "New feature on «Гарріпедія»!",
        button: "Go to discussion"
      },
      ru: {
        description: "Новое расширение на «Гарріпедія»!",
        button: "Перейти к обсуждениям"
      }
    };
    var discussion = (mw.config.get("wgUserLanguage") in i18n) ? i18n[mw.config.get("wgUserLanguage")] : i18n['en'];
 
    var date = new Date();
    $('<section class="module DiscussionModule community-page-entry-point-module">' + 
      '<div class="community-page-entry-point-description">' + discussion.description + '</div>' +
      '<a class="community-page-entry-point-button" href="/d/f">' + discussion.button + '</a>' +
    '</section>').insertAfter(".community-page-entry-point-module");
    clearInterval(waitCommunityModule);
  }, 1000);
}
// ############################## //
// ############################## //
// ############################## //