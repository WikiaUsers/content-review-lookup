/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

//Portable infoboxes colors
(function() {
    /* Check for Portable Infoboxes and change their color */
    if (document.querySelector('.portable-infobox')) {
        Array.prototype.forEach.call(document.querySelector('.portable-infobox'), function() {
            if (this.previousElementSibling.textContent) {
                this.querySelectorAll('.pi-image-thumbnail').style.width = this.previousElementSibling.textContent;
                this.querySelectorAll('.pi-image-thumbnail').style.height = 'auto';
            }
            var color = '';
            var classNames = this.getAttribute('class').split(' ');
            for (var i = 0; i < classNames.length; i++) {
                if (classNames[i].indexOf('pi-theme-_') !== -1) {
                    color = classNames[i].replace('pi-theme-_', '');
                    break;
                }
            }
            if (color) {
                this.style.border = '2px solid #' + color;
            }
        });
    }
})();