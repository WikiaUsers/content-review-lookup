 /* 
 Drag and drop uploading script 1.4.25 by user:452 (I wish I had created this 8000 files ago.)

 To use this script 
 - Go to http://saintsrow.wikia.com/Special:Upload?DragDrop=1
 To enable it permanently:
 - Go to http://saintsrow.wikia.com/Special:MyPage/common.js?action=edit
 - add this line: window.DragDropUploader = true;
 
 After enabling this script, 
 a drag and drop area will appear on Special:Upload and Special:MultipleUpload
 Files dropped in that area will be uploaded immediately.
 The summary and license options at the bottom of the page will be used for all files

 To-do list:
 - Nothing!

 Done list:
 - error messages
 - progress bar
 - confirmation of successful upload
 - list of uploaded files for easy copy/pasting
 - Supports reploading (When dropping one file on a reupload page)
 - Unique status ids, to allow new drops before previous upload has completed.
 - Status line is updated when there is an error.
 - Correctly handles batch limit for non-admins
 - Actively check for filetype before uploading
 - Works on Special:Upload?DragDrop=1 for all users
 - Automatically resubmit form on server error
 - 2015 update: Now queues batches instead of parallel uploads, due to performance issues.

 Some error messages are shown, but have not been fully tested.
 - Duplicate file messages are shown
 - Existing filename messages are shown
 - File blacklist messages are shown
 - Allowed file types are pulled from the list in #mw-upload-permitted on the upload page.  If the format of the message is detected to have changed, it falls back to the current list: png, gif, jpg, jpeg, ico, pdf, svg, odt, ods, odp, odg, odc, odf, odi, odm, ogg, ogv, oga.

 */

$(function () {
  if (!$("#mw-upload-form").size() || !(mw.util.getParamValue('DragDrop') || window.DragDropUploader) || $("#dropAreaOuter").length) return;
  $(".hideforDragDrop").remove();

  console.log("DragDropUploader v 1.4.25.2");
  var reuploadMessage = "";
  if ($("#wpForReUpload").val()) reuploadMessage = "Dropping a single file here will upload it as:<br/><span style='font-size:14px'>\""+$("#wpDestFile").val()+"\"</span><br /><hr /><br />Multiple ";

  $("#mw-upload-form").before('<div id="dropAreaOuter"><table><tr><td colspan="2" id="dropArea">'+reuploadMessage+'Những tập tin được kéo thả vào đây sẽ được tải lên ngay lập tức.<br><br>Hãy đặt tên tập tin một cách rõ ràng để thuận tiện sử dụng sau này.<br><br>Áp dụng tóm lược và giấy phép được chọn ở cuối trang cho tất cả tập tin.</td></tr><tr><td colspan="2" id="statusArea"><h1>Khu vực thông báo trạng thái tải lên</h1></td></tr><tr><td id="successArea"><h1 style="padding-left:1em;">Khu vực báo tải lên thành công</h1></td><td id="errorArea"><h1 style="padding-left:1em;">Khu vực báo lỗi</h1></td></tr><tr><td id="historyArea" colspan="2"><h1>Khu vực thông báo lịch sử tải lên</h1></td></tr></table></div>');

  var uploadDiv = document.getElementById("dropAreaOuter");
  window.DragDrop = {
    batchCounter:1,
    busy:0,
    uploaderQueue:[],
  }

  if( $("#mw-upload-permitted").size() && $("#mw-upload-permitted").html().indexOf("<p>Định dạng tập tin cho phép:") != -1) {
    window.DragDrop.allowedFiles = $("#mw-upload-permitted").html().split("<p>Định dạng tập tin cho phép: ")[1].split(".")[0].split(", ");
  } else {
    window.DragDrop.allowedFiles = new Array("png", "gif", "jpg", "jpeg", "ico", "pdf", "svg", "odt", "ods", "odp", "odg", "odc", "odf", "odi", "odm", "ogg", "ogv", "oga");
  }

  function sendNext() {
    if (window.DragDrop.busy) return;
    if (!window.DragDrop.uploaderQueue.length) return;
    xhr = window.DragDrop.uploaderQueue.shift();
    xhr.send(xhr.form);
    window.DragDrop.busy = 1;
  }

  function makeUploadForm(newForm, whichBatch, howMany) {
    var xhr = new XMLHttpRequest();
    xhr.whichBatch = whichBatch;
    xhr.howMany = howMany;
    xhr.form = newForm;

    $("#statusArea").prepend('<div id="batch'+xhr.whichBatch+'"></div>');
    $("#batch"+xhr.whichBatch).html('Status of batch '+xhr.whichBatch+': Queued. '+xhr.howMany+' tập tin đang chờ được tải lên.');

    xhr.open("post", $("#mw-upload-form").attr("action").replace("Special:Upload", "Special:MultipleUpload"));
    xhr.onload = function () {
      if (xhr.status === 200) {
        $("#batch"+xhr.whichBatch).html('Status of batch '+xhr.whichBatch+': Hoàn thành. '+xhr.howMany+' tập tin đã được tải lên.');
        if ($("#errorArea").html()) $("#errorArea").prepend("<hr>");
        $("#errorArea").html($("#errorArea").html().replace(/<hr><hr>/g,"<hr>"));
        if ($(".warning", xhr.response).size()) {
          $("#errorArea").prepend($(".warning", xhr.response));
          $("#batch"+xhr.whichBatch).addClass("warning");
        }
        if ($(".error", xhr.response).size()) {
          $("#errorArea").prepend($(".error", xhr.response));
          $("#batch"+xhr.whichBatch).addClass("error");
          $("#batch"+xhr.whichBatch).addClass("error2");
        }
        if ($("#mw-content-text h2", xhr.response).size()) {
          if ($("#mw-content-text h2", xhr.response)[0].innerHTML == "Successful upload") {
            if ($("#successArea").html()) $("#successArea").prepend("<hr>");
            $("#successArea").prepend($("#mw-content-text ul:not([class])", xhr.response));
            $("#successArea").html($("#successArea").html().replace(/\: File uploaded\./g,""));
          } else {
            //this occurs when there is a h2 with text other than "Successful upload".
            if ($("#mw-content-text ul:not([class])", xhr.response).size()) {
              //Headings with class "error" and "warning" are already handled.
              $("#errorArea").prepend($("#mw-content-text ul:not([class])", xhr.response).addClass("error"));
              $("#batch"+xhr.whichBatch).addClass("error");
              $("#batch"+xhr.whichBatch).addClass("error3");
            }
          }
        } else {
          $("#errorArea").prepend("<ul><li>Non-specific error for batch "+xhr.whichBatch+". Xin hãy tải tập tin lên theo cách thông thường.</li></ul>");
          $("#batch"+xhr.whichBatch).addClass("error");
          $("#batch"+xhr.whichBatch).addClass("error4");
        }
        window.DragDrop.busy = 0;
        sendNext();
      } else {
        $("#errorArea").prepend('<ul><li>Lỗi: '+xhr.status+' for batch '+xhr.whichBatch+'. Automatically resubmitting files.</li></ul>');
        $("#batch"+xhr.whichBatch).addClass("error");
        $("#batch"+xhr.whichBatch).addClass("error5");
        xhr.open("post", $("#mw-upload-form").attr("action").replace("Special:Upload", "Special:MultipleUpload"));
        window.DragDrop.uploaderQueue.unshift(xhr);
        window.DragDrop.busy = 0;
        sendNext();
      }
    };
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        $("#batch"+xhr.whichBatch).html("Status of batch "+xhr.whichBatch+': '+(event.loaded / event.total * 100 | 0)+"% "+xhr.howMany+" tập tin đã được tải lên.");
        if ((event.loaded / event.total) == 1) 
           $("#batch"+xhr.whichBatch).html("Status of batch "+xhr.whichBatch+': '+(event.loaded / event.total * 100 | 0)+"% "+xhr.howMany+" tập tin đã được tải lên. Chờ hồi đáp từ máy chủ.");
      }
    };
    window.DragDrop.uploaderQueue.push(xhr);
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
        batchlimit = 50,
        filecount = 0;
    if (wgUserGroups.indexOf("sysop") == -1) batchlimit = 20; //if not sysop, MultipleUpload limit is 20

    if ($("#statusArea").text() == "Khu vực thông báo trạng thái tải lên") { 
       $("#historyArea").html("<table><tr><th>Tên tập tin</th><th>Loại</th><th>Kích thước</th></tr></table>");
       $("#errorArea").html("");
       $("#successArea").html("");
       $("#statusArea").html("");
    }

    if ($("#historyArea").html()) $("#historyArea table").prepend("<tr><td colspan=3><hr></td></tr>");
    for (var i = 0; i < files.length; i++) {
      $("#historyArea table").prepend("<tr><td>" + files[i].name + "</td><td>" + files[i].type +"</td><td style='text-align:right;'>" + files[i].size + "</td></tr>");
      totalsize += files[i].size;

      if (window.DragDrop.allowedFiles.indexOf(files[i].name.split(".").pop().toLowerCase()) == -1) {
        $("#errorArea").prepend("<ul class='error'><li>Sai định dạng: "+files[i].name+"</li></ul>");
        $("#statusArea").prepend("<div class='error'>Lỗi: Sai định dạng</div>");
        continue;
      }
      //local errors must be caught by this point.
      //i is the index for files dropped.
      //filecount is the index for files being sent.

      var j = window.DragDrop.batchCounter;

      if (!multiform[j]) {
        multiform[j] = new FormData();
        multiform[j].append("title", "Special:MultipleUpload");
        multiform[j].append("wpUpload", "Upload file");
        multiform[j].append("wpEditToken", $("#wpEditToken").val());
        multiform[j].append("wpUploadDescription", $("#wpUploadDescription").val() +" ");
        if ($("#wpLicense").val()) multiform[j].append("wpLicense", $("#wpLicense").val());
        if ($("#wpWatchthis:checked").size()) multiform[j].append("wpWatchthis", $("#wpWatchthis").val());
        if ($("#wpIgnoreWarning:checked").size()) multiform[j].append("wpIgnoreWarning", $("#wpIgnoreWarning").val());
        if ($("#wpForReUpload").val() && (files.length == 1)) multiform[j].append("wpForReUpload", 1);
      }

      multiform[j].append("wpUploadFile"+filecount, files[i]);
      if ($("#wpForReUpload").val() && (files.length == 1)) multiform[j].append("wpDestFile"+filecount, $("#wpDestFile").val());
      else multiform[j].append("wpDestFile"+filecount, files[i].name);

      filecount++;
      if (filecount == batchlimit) { // filecount == 10 or 20 here
        makeUploadForm(multiform[j], window.DragDrop.batchCounter++, filecount); //filecount=20 is fine.
        filecount = 0;
      }
    }

    $("#historyArea table").prepend("<tr><td colspan=2>Batch "+j+": "+files.length+" Tập tin</td><td style='text-align:right;'>Tổng: "+totalsize+"</td></tr>");
    if (filecount && (multiform[j] != undefined)) {
      //don't resend the same 20 files and don't send when there is no file
      makeUploadForm(multiform[j], window.DragDrop.batchCounter++, filecount);
    }
    sendNext();
  }, false);
});