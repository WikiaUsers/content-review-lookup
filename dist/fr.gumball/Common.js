mw.loader.using('mediawiki.cookie').then(function () {
  try {
    const KEY = 'forceRLDebug';

    // OFF si pas activé
    if (localStorage.getItem(KEY) !== '1') return;

    // Si déjà activé, ne reload pas en boucle
    if (mw.cookie.get('resourceLoaderDebug') === 'true') return;

    // Pose le cookie pour 24h
    mw.cookie.set('resourceLoaderDebug', 'true', { path: '/', expires: 1 });

    // Reload 1 fois pour que le prochain cycle charge les modules en debug
    location.reload();
  } catch (e) {}
});

(function () {
  try {
    const HOST = "beacon.wikia-services.com";
    const PATH = "/__track/";
    const origFetch = window.fetch && window.fetch.bind(window);
    if (!origFetch) return;

    // Ajuste si besoin (25/s = assez strict, 50/s = plus permissif)
    const LIMIT_PER_SEC = 25;
    let winStart = Date.now();
    let hits = 0;

    function isTrackUrl(u) {
      return typeof u === "string" && u.indexOf(HOST) !== -1 && u.indexOf(PATH) !== -1;
    }

    function shouldDrop() {
      const now = Date.now();
      if (now - winStart >= 1000) {
        winStart = now;
        hits = 0;
      }
      hits++;
      return hits > LIMIT_PER_SEC;
    }

    window.fetch = function (input, init) {
      try {
        const url = (typeof input === "string") ? input : (input && input.url);
        if (isTrackUrl(url) && shouldDrop()) {
          // On "réussit" silencieusement pour éviter retries / flush / promesses en rafale
          return Promise.resolve(new Response("", { status: 204 }));
        }
      } catch (e) {}
      return origFetch(input, init);
    };
  } catch (e) {}
})();

/* Multi-upload sur Special:Upload */
mw.loader.using(["site"]).then(function () {
  "use strict";

  const i18n = {
    multiupload: "Upload multiple files:",
    yes: "Yes",
    no: "No",
    sourcefiles: "Source files:",
    uploadfiles: "Upload files",
    nofiles: "Please select some files first.",
    nolicense: "Please select a valid license first.",
    summary: "Summary",
    license: "License",
    uploading: "Uploading files...",
    uploaded: "Uploaded:",
    failed: "Failed:",
    done: "Done."
  };

  if (mw.config.get("wgCanonicalSpecialPageName") !== "Upload") return;

  $("#wpUploadFile").parent().parent().addClass("regularFileSelect");
  $("tr.regularFileSelect").before(
    '<tr><td class="mw-label">' + i18n.multiupload + '</td><td class="mw-input">' +
      '<label><input type="radio" name="multipleFiles" value="' + i18n.yes + '" /> ' + i18n.yes + '</label> &nbsp; ' +
      '<label><input type="radio" name="multipleFiles" value="' + i18n.no + '" checked="" /> ' + i18n.no + "</label>" +
    "</td></tr>"
  );
  $("tr.regularFileSelect").after(
    '<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">' + i18n.sourcefiles +
    '</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>'
  );
  $("input[name='wpUpload']").addClass("regularFileSelect");
  $("#wpDestFile").parent().parent().addClass("regularFileSelect");
  $("#wpIgnoreWarning").parent().parent().addClass("regularFileSelect");
  $("span.mw-htmlform-submit-buttons").append(
    '<input type="button" value="' + i18n.uploadfiles + '" class="multipleFileSelect" style="display:none;" id="multiFileSubmit" />'
  );

  $("input[name='multipleFiles']").on("change", function () {
    if (this.value === i18n.yes) {
      $(".regularFileSelect").hide();
      $(".multipleFileSelect").show();
    } else {
      $(".regularFileSelect").show();
      $(".multipleFileSelect").hide();
    }
  });

  $("#multiFileSubmit").on("click", function () {
    const files = $("#multiupload")[0].files;
    if (!files || files.length === 0) {
      alert(i18n.nofiles);
      return false;
    }
    if ($("#wpLicense option:selected").val() === "") {
      alert(i18n.nolicense);
      return false;
    }

    let summary = $("#wpUploadDescription").val();
    if (summary !== "") summary = "== " + i18n.summary + " ==\n" + summary;
    const license = "== " + i18n.license + " ==\n" + $("#wpLicense option:selected").prop("title");
    const text = summary + "\n" + license;

    let watch = "preferences";
    if ($("#wpWatchthis").is(":checked")) watch = "watch";
    else watch = "nochange";

    let curFile = 0;

    $("#firstHeading").text(i18n.uploading);
    $("#mw-content-text").html(
      "<h3>" + i18n.uploaded + "</h3><ul></ul>" +
      "<div style='display:none;' id='multiUploadFailed'><h3>" + i18n.failed + "</h3><ul></ul></div>"
    );

    function nextFile() {
      if (curFile >= files.length) {
        $("#mw-content-text").append("<h3>" + i18n.done + "</h3>");
        return;
      }

      const file = files[curFile];
      if (!file) {
        curFile++;
        nextFile();
        return;
      }

      $.ajax({
        url: "/api.php",
        data: { action: "query", meta: "tokens", format: "json" },
        dataType: "json"
      }).done(function (data) {
        const fd = new FormData();
        fd.append("action", "upload");
        fd.append("token", data.query.tokens.csrftoken);
        fd.append("filename", file.name);
        fd.append("file", file);
        fd.append("text", text);
        fd.append("watchlist", watch);
        fd.append("ignorewarnings", 1);
        fd.append("format", "json");

        $.ajax({
          url: "/api.php",
          method: "POST",
          data: fd,
          cache: false,
          contentType: false,
          processData: false
        }).done(function (d) {
          if (d && d.error === undefined) {
            $("#mw-content-text > ul").append(
              '<li><a href="' + d.upload.imageinfo.descriptionurl + '" target="_blank">' + d.upload.filename + "</a></li>"
            );
          } else {
            $("#multiUploadFailed ul").append("<li>" + file.name + "</li>");
            $("#multiUploadFailed").show();
          }
          curFile++;
          nextFile();
        }).fail(function () {
          $("#multiUploadFailed ul").append("<li>" + file.name + "</li>");
          $("#multiUploadFailed").show();
          curFile++;
          nextFile();
        });
      });
    }

    nextFile();
  });
});