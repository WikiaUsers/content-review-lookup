document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.mw-customtoggle-myFirstText, .mw-customtoggle-myOtherText');
    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var target = this.getAttribute('data-target');
            var content = document.querySelector('.mw-collapsible[data-section="' + target + '"]');
            if (content.classList.contains('mw-collapsed')) {
                content.classList.remove('mw-collapsed');
            } else {
                content.classList.add('mw-collapsed');
            }
        });
    });
});