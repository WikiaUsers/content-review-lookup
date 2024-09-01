document.addEventListener("DOMContentLoaded", function() {
    var videoId = "VIDEO_ID";
    var iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = "https://www.youtube.com/embed/" + videoId;
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    
    document.body.appendChild(iframe);
});