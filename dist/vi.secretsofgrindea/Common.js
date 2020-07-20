/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
window.onload = function()
{
    /* make img in map full div */
    var mapImgs = document.querySelectorAll(".map__img img");
    mapImgs.forEach(function(item) {
        item.style.width = "100%";
        item.style.height = "auto";
        item.style.borderRadius = "6px";
    });
}

var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
}