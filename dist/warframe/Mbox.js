
$(function () {
    closeBox();
    setInterval(closeBox, 100);
});

function closeBox() {
    var boxes = document.getElementsByClassName("mbox");

    for (var i = 0; i < boxes.length; i++) {
        if (!boxes[i].classList.contains("fixed-close")) {
            var box = boxes[i];
            box.classList.add("fixed-close");
            var close = box.children[0].children[1].getElementsByClassName("mbox__close")[0];

            /* ×xΧхХ᙭ */
            var handler = document.createElement('span');
            handler.textContent = 'x';
            handler.addEventListener('click', function () {
                $(box).css('display', 'none');
            });

            close.appendChild(handler);
        }
    }
}