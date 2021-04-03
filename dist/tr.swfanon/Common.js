/* Buraya konulacak JavaScript kodu sitedeki her kullanıcı için her sayfa yüklendiğinde çalışacaktır */
/* Bilgi preload */
  this.insertInformationTemplate = function (target) {
    var $target, defaultText;

    $target = (target instanceof $) ? target : $(target);
    defaultText = "==Özet==\n{{Bilgi\n|açıklama=\n|kaynak=\n" +
      "|esersahibi=\n|lisanslama=\n}}";

    this.getTemplate("Template:Stdinformation").then(
      function (data) {
        return data;
      },
      function () {
        return defaultText;
      }
    ).then(function (value) {
      $target.val(value);
    });
  };
  
      // Add <nowiki>{{Information}}</nowiki> to field if viewing Special:Upload
if (mw.config.get("wgCanonicalSpecialPageName") === "Upload") {
  this.insertInformationTemplate("#wpUploadDescription");
}

/* Bilgi preload end */