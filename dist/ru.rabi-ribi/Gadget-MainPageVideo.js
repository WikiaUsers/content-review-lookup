(function () {
	if (mw.config.get("wgIsMainPage") !== true) return;

	const video = document.createElement("video");
	video.classList.add("rbrbw-home-hero__video");
	video.setAttribute("autoplay", "autoplay");
	video.setAttribute("loop", "loop");
	video.setAttribute("preload", "auto");
	video.style.opacity = 0;

	const source = document.createElement("source");
	source.classList.add("rbrbw-home-hero__video-source");
	source.setAttribute("src", "/ru/wiki/Special:Filepath/File:Microtrailer.webm");
	source.setAttribute("type", "video/webm");

	video.append(source);

	document.querySelector(".rbrbw-home-hero__background").append(video);

	video.addEventListener("loadeddata", function () {
		video.animate([{
			opacity: 0
		}, {
			opacity: 1
		}], {
			easing: "ease",
			duration: 500,
			fill: "both"
		});
	});
})();