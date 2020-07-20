/* Any JavaScript here will be loaded for all users on every page load. */


window.addEventListener("load", function() {
    var slime = document.createElement("img");
    var urls = ["https://vignette.wikia.nocookie.net/cat-dos/images/6/69/SCARE_01.png/revision/latest?cb=20150228202240",
    "https://vignette.wikia.nocookie.net/cat-dos/images/b/b1/SCARE_07.png/revision/latest?cb=20150301020845",
    "https://vignette.wikia.nocookie.net/cat-dos/images/a/a0/SCARE_05.png/revision/latest?cb=20150301020828",
    "https://vignette.wikia.nocookie.net/cat-dos/images/1/1f/SCARE_04.png/revision/latest?cb=20150301020819",
    "https://vignette.wikia.nocookie.net/cat-dos/images/e/ea/SCARE_03.png/revision/latest?cb=20150301020812",
    "https://vignette.wikia.nocookie.net/cat-dos/images/4/4f/SCARE_02.png/revision/latest/scale-to-width/480?cb=20150301053156",
    "https://vignette.wikia.nocookie.net/cat-dos/images/2/22/SCARE_06.png/revision/latest/scale-to-width/480?cb=20150301053217",
    "https://vignette.wikia.nocookie.net/cat-dos/images/6/63/SCARE_01S.png/revision/latest?cb=20150301020755"];
    var idx = Math.floor((Math.random() * 1000)) % urls.length;
    slime.src = urls[idx];
    slime.style.maxHeight = "300px";
    slime.style.maxWidth = "300px";
    slime.style.height = "auto";
    slime.style.width = "auto";
    slime.style.position = "fixed";
    slime.style.right = "-220px";
    slime.style.top = "300px";
    slime.style.zIndex = "99999";
    
    slime.addEventListener("mouseover", function() {
        slime.style.right = "0px";
    });
    slime.addEventListener("mouseout", function() {
        slime.style.right = "-220px";
    });
    document.body.appendChild(slime);
});