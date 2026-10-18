(function () {
  "use strict";
  if (window.edit0Loaded) return;
  window.edit0Loaded = true;

  mw.hook("wikipage.content").add(function () {
    if (
      $.inArray(mw.config.get("wgAction"), ["view", "purge"]) === -1 ||
      mw.config.get("wgNamespaceNumber") < 0
    )
      return;
    var localtitles = {
      bg: "Редактиране на началото",
      bn: "সূচনা অনুচ্ছেদ সম্পাদনা করুন",
      cs: "Editovat úvodní sekci",
      en: "Edit lead section",
      fa: "ویرایش بخش آغازین",
      fr: "Modifier le résumé introductif",
      id: "Sunting bagian atas",
      it: "Modifica della sezione iniziale",
      ja: "導入部を編集",
      kk: "Кіріспе бөлімді өңдеу",
      min: "Suntiang bagian ateh",
      ko: "도입부를 편집",
      pa: "ਸੋਧ",
      pt: "Editar a seção superior",
      "pt-br": "Editar a seção superior",
      sr: "Уреди уводни део",
      vi: "Sửa phần mở đầu",
    };
    localtitles.zh =
      localtitles["zh-hans"] =
      localtitles["zh-cn"] =
      localtitles["zh-sg"] =
      localtitles["zh-my"] =
        "编辑首段";
    localtitles["zh-hant"] =
      localtitles["zh-hk"] =
      localtitles["zh-mo"] =
      localtitles["zh-tw"] =
        "編輯首段";

    var content = $("#content, #mw_content").first();
    var edit1 = content.find("span.mw-editsection:not(.plainlinks)").first();
    if (!edit1.length) return;
    var edit0 = edit1.clone();

    $("#firstHeading").first().append(edit0);
    edit0.find("a").each(function (idx) {
      var a = $(this);
      var href = a.attr("href") || "";
      a.attr(
        "title",
        localtitles[mw.config.get("wgUserLanguage")] || localtitles.zh
      );
      if (!/&(ve|)section=T/.test(href)) {
        // not transcluded
        a.attr(
          "href",
          href.replace(
            /&(ve|)section=\d+/,
            "&$1section=0&summary=/*%20lead%20*/%20"
          )
        );
      } else if (/&vesection=/.test(href)) {
        // transcluded, VE
        a.attr(
          "href",
          mw.util.getUrl(mw.config.get("wgPageName")) +
            "?veaction=edit&vesection=0&summary=/*%20lead%20*/%20"
        );
      } else {
        // transcluded, not VE
        a.attr(
          "href",
          mw.util.getUrl(mw.config.get("wgPageName")) +
            "?action=edit&section=0&summary=/*%20top%20*/%20"
        );
      }
    });
  });
})();