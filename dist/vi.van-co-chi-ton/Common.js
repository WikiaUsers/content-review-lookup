$(function () {
    $(".scroll").each(function () {
        this.scrollLeft = (this.scrollWidth - this.clientWidth) / 2;
    });
});