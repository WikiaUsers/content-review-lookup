const video = document.querySelector('video')
video.setAttribute("autoplay", "autoplay");
video.setAttribute("loop", "loop");
video.removeAttribute("controls");
video.removeAttribute("width");
video.removeAttribute("height");