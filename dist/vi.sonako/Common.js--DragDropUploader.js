/* 
Muốn sử dụng nó thay thế hoàn toàn:
 - Đi tới https://sonako.fandom.com/Special:MyPage/common.js?action=edit
 - Và thêm dòng sau: window.DragDropUploader = true;
*/
$(function () {
  if (!$("#mw-upload-form").length || !(mw.util.getParamValue('DragDrop') || window.DragDropUploader) || $("#dropAreaOuter").length) return;

  console.log("DragDropUploader v 1.4.25.4");
  var reuploadMessage = "";
  if ($("#wpForReUpload").val()) reuploadMessage = "Kéo thả tập tin vào đây sẽ tải lên phiên bản mới của tập tin:<br/><span style='font-size:14px'>\""+$("#wpDestFile").val()+"\"</span><br /><hr /><br />Đa tập tin ";

  $("#mw-upload-form").before('<div id="dropAreaOuter"><table><tr><td colspan="2" id="dropArea">'+reuploadMessage+'Những tập tin được kéo thả vào đây sẽ được tải lên ngay lập tức.<br><br>Đặt tên tập tin một cách rõ ràng để thuận tiện sử dụng sau này.<br><br>Áp dụng tóm lược, giấy phép ở cuối trang cho tất cả tập tin.</td></tr><tr><td colspan="2" id="statusArea"><h1>Khu vực thông báo trạng thái tải lên</h1></td></tr><tr><td id="successArea"><h1 style="padding-left:1em;">Khu vực báo tải lên thành công</h1></td><td id="errorArea"><h1 style="padding-left:1em;">Khu vực báo lỗi</h1></td></tr><tr><td id="historyArea" colspan="2"><h1>Khu vực thông báo lịch sử tải lên</h1></td></tr></table></div>');

  var uploadDiv = document.getElementById("dropAreaOuter");
  window.DragDrop = {
    batchCounter:1,
    busy:0,
    uploaderQueue:[],
  }

  if( $("#mw-upload-permitted").length && $("#mw-upload-permitted").html().indexOf("<p>Permitted file types:") != -1) {
    DragDrop.allowedFiles = $("#mw-upload-permitted").html().split("<p>Định dạng tập tin cho phép: ")[1].split(".")[0].split(", ");
  } else {
    DragDrop.allowedFiles = new Array("png", "gif", "jpg", "jpeg", "ico", "pdf", "svg", "odt", "ods", "odp", "odg", "odc", "odf", "odi", "odm", "ogg", "ogv", "oga");
  }

  function sendNext() {
    if (DragDrop.busy) return;
    if (!DragDrop.uploaderQueue.length) return;
    xhr = DragDrop.uploaderQueue.shift();
    xhr.open("post", $("#mw-upload-form").attr("action"));
    xhr.send(xhr.form);
    DragDrop.busy = 1;
  }

  function makeUploadForm(newForm, whichBatch, whichFile) {
    var xhr = new XMLHttpRequest();
    xhr.whichBatch = whichBatch;
    xhr.whichFile = whichFile;
    xhr.form = newForm;

    $("#statusArea").prepend('<div id="batch'+xhr.whichBatch+'"></div>');
    $("#batch"+xhr.whichBatch).html('Tình trạng gói tập tin '+xhr.whichBatch+': Đã lên lịch. ('+xhr.whichFile+')');

    xhr.onload = function () {
      $("#errorArea").prepend("<hr>");
      $("#errorArea").html($("#errorArea").html().replace(/<hr><hr>/g,"<hr>"));

      if (xhr.status == 200) {
        $("#batch"+xhr.whichBatch).html('Tình trạng gói tập tin '+xhr.whichBatch+': Hoàn thành. ('+xhr.status+') Đã tải lên: "'+xhr.whichFile+'".');

        if ($(".warning", xhr.response).length) {                                                       //Warning
          $("#errorArea").prepend($(".warning", xhr.response));
          $("#batch"+xhr.whichBatch).addClass("warning");
        }
        else if ($(".mw-destfile-warning", xhr.response).length) {                                      //Warning
          $("#errorArea").prepend($(".mw-destfile-warning", xhr.response));
          $("#errorArea .wikia-photogallery-add").remove();
          $("#batch"+xhr.whichBatch).addClass("warning");
        }
        else if ($(".mw-destfile-error", xhr.response).length) {                                        //Error
          $("#errorArea").prepend($(".mw-destfile-error", xhr.response));
          $("#batch"+xhr.whichBatch).addClass("error");
          $("#batch"+xhr.whichBatch).addClass("error2");
        }
        else if ($(".error", xhr.response).length) {                                                    //Error
          $("#errorArea").prepend($(".error", xhr.response));
          $("#batch"+xhr.whichBatch).addClass("error");
          $("#batch"+xhr.whichBatch).addClass("error2");
        }
        else if ($(".fullImageLink", xhr.response).length) {                                            //Success
          if ($("#successArea").html()) $("#successArea").prepend("<hr>");
          $("#successArea").prepend("<li><a href='"+xhr.responseURL+"'>"+xhr.whichFile+"</a></li>");
          $("#successArea").html($("#successArea").html().replace(/\: File uploaded\./g,""));
        } else {                                                                                        //Unknown
          $("#errorArea").prepend("<ul><li>Lỗi không rõ ràng với gói tập tin "+xhr.whichBatch+". Xin hãy tải tập tin lên theo cách thông thường.</li></ul>");
          $("#batch"+xhr.whichBatch).addClass("error");
          $("#batch"+xhr.whichBatch).addClass("error4");
        }
      } else {                                                                                          //HTTP error
        $("#errorArea").prepend('<ul><li>Lỗi: '+xhr.status+' với gói tập tin '+xhr.whichBatch+'. Tự động gửi lại tập tin.</li></ul>');
        $("#batch"+xhr.whichBatch).addClass("error");
        $("#batch"+xhr.whichBatch).addClass("error5");
        DragDrop.uploaderQueue.push(xhr);
      }
      DragDrop.busy = 0;
      sendNext();
    };
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        $("#batch"+xhr.whichBatch).html("Tình trạng gói tập tin "+xhr.whichBatch+': '+(event.loaded / event.total * 100 | 0)+"% tập tin đã được tải lên.");
        if ((event.loaded / event.total) == 1)
           $("#batch"+xhr.whichBatch).html("Status of batch "+xhr.whichBatch+': '+(event.loaded / event.total * 100 | 0)+"% tập tin đã được tải lên. Chờ hồi đáp từ máy chủ.");
      }
    };
    DragDrop.uploaderQueue.push(xhr);
    sendNext();
  }

  uploadDiv.addEventListener("dragover", function(event) {
    event.preventDefault();
  }, false);
  uploadDiv.addEventListener("drop", function(event) {
    event.preventDefault();
    var files = event.dataTransfer.files,
        totalsize = 0,
        multiform = new Array(),
        batchlimit = 1,
        filecount = 0;

    if (!files.length) return; //dragging text

    if ($("#statusArea").text() == "Khu vực thông báo trạng thái tải lên") {
       $("#historyArea").html("<table><tr><th>Tên tập tin</th><th>Loại</th><th>Kích thước</th></tr></table>");
       $("#errorArea").html("");
       $("#successArea").html("");
       $("#statusArea").html("");
    }

    if ($("#successArea").html() && $("#wpForReUpload").val()) {
       var rereupload = confirm("Bạn đã thay thế tập tin này, bạn có chắc không?");
       if (rereupload !== true) return;
    }

    if ($("#historyArea").html()) $("#historyArea table").prepend("<tr><td colspan=3><hr></td></tr>");
    for (var i = 0; i < files.length; i++) {
      $("#historyArea table").prepend("<tr><td>" + files[i].name + "</td><td>" + files[i].type +"</td><td style='text-align:right;'>" + files[i].size + "</td></tr>");
      totalsize += files[i].size;

      if (DragDrop.allowedFiles.indexOf(files[i].name.split(".").pop().toLowerCase()) == -1) {
        $("#errorArea").prepend("<ul class='error'><li>Sai định dạng: "+files[i].name+"</li></ul>");
        $("#statusArea").prepend("<div class='error'>Lỗi: Sai định dạng</div>");
        continue;
      }
      //local errors must be caught by this point.
      //i is the index for files dropped.
      //filecount is the index for files being sent.

      var j = DragDrop.batchCounter;

      if (!multiform[j]) {
        multiform[j] = new FormData();
        multiform[j].append("title", "Special:Upload");
        multiform[j].append("wpUpload", "Upload file");
        multiform[j].append("wpEditToken", $("#wpEditToken").val());
        multiform[j].append("wpUploadDescription", $("#wpUploadDescription").val() +" ");
        if ($("#wpLicense").val()) multiform[j].append("wpLicense", $("#wpLicense").val());
        if ($("#wpWatchthis:checked").length) multiform[j].append("wpWatchthis", $("#wpWatchthis").val());
        if ($("#wpIgnoreWarning:checked").length) multiform[j].append("wpIgnoreWarning", $("#wpIgnoreWarning").val());
        if ($("#wpForReUpload").val() && (files.length == 1)) multiform[j].append("wpForReUpload", 1);
      }

      multiform[j].append("wpUploadFile", files[i]);
      if ($("#wpForReUpload").val() && (files.length == 1)) multiform[j].append("wpDestFile", $("#wpDestFile").val());
      else multiform[j].append("wpDestFile", files[i].name);

      filecount++;
      if (filecount == batchlimit) { // filecount is always 1 here because Special:MultipleUpload is gone
        makeUploadForm(multiform[j], DragDrop.batchCounter++, files[i].name); //filecount=20 is fine.
        filecount = 0;
      }
    }

    $("#historyArea table").prepend("<tr><td colspan=2>Gói tập tin "+j+": "+files.length+" Files</td><td style='text-align:right;'>Tổng: "+totalsize+"</td></tr>");
    if (filecount && (multiform[j] != undefined)) {
      //don't resend the same 20 files and don't send when there is no file
      console.log("final make upload form");
      makeUploadForm(multiform[j], DragDrop.batchCounter++, files[i].name);
    }
    sendNext();
  }, false);
});