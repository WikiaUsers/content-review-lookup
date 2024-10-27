document.querySelectorAll('.view-button, .chance-bar, .href-redirect').forEach(function(button) {
    var link = button.getAttribute('data-link');
    var isHoldingLeft = false;
    var isHoldingMiddle = false;

    button.style.cursor = 'pointer';

    button.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
            isHoldingLeft = true;
        } else if (event.button === 1) {
            event.preventDefault();
            isHoldingMiddle = true;
        }
    });

    button.addEventListener('mouseup', function(event) {
        if (isHoldingLeft && event.button === 0) {
            window.location.href = link;
        } else if (isHoldingMiddle && event.button === 1) {
            window.open(link, '_blank');
        }
        isHoldingLeft = false;
        isHoldingMiddle = false;
    });

    button.addEventListener('mouseleave', function() {
        isHoldingLeft = false;
        isHoldingMiddle = false;
    });
});