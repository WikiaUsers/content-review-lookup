console.log("Tiles.js loaded");

document.addEventListener("DOMContentLoaded", function() {
    var tabs = document.querySelectorAll('.tile-link');
    var contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var tabId = this.getAttribute('data-tab');

            contents.forEach(function(content) {
                content.classList.remove('active');
            });

            var activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    if (tabs.length > 0 && contents.length > 0) {
        tabs[0].classList.add('active');
        contents[0].classList.add('active');
    }
});