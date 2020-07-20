//Redirects the upload file button at Special:Images to go to Special:Upload. It forms part of a larger script.
function ufExecute() {
    $(".wikia-button.upphotos").click(function () {
        window.location.href = "/wiki/Special:Upload";
    });
}

$(document).ready(ufExecute());