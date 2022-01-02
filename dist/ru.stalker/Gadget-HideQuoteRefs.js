// This script hides the "цитата" ("quote") group references
(function () {
    var refs = document.querySelectorAll('.reference');

    refs.forEach(
        function (ref) {
            if (ref.firstChild.innerHTML.split(' ').includes('[цит.')) {
                ref.style.display = 'none';
            }
        }
    )
})();