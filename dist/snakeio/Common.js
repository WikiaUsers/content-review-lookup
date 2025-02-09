$(document).ready(function() {
    let index = 0;
    let images = $('.carousel img');
    let total = images.length;

    function showImage(i) {
        images.hide();
        $(images[i]).fadeIn();
    }

    function nextImage() {
        index = (index + 1) % total;
        showImage(index);
    }

    function prevImage() {
        index = (index - 1 + total) % total;
        showImage(index);
    }

    $('.next').click(nextImage);
    $('.prev').click(prevImage);

    showImage(index);
    setInterval(nextImage, 5000); // Auto-slide every 5 seconds
});
/* Any JavaScript here will be loaded for all users on every page load. */