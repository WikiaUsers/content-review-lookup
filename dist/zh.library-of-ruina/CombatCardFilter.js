$(document).ready(function() {
            var loadingDiv = document.getElementById('CombatCardFilter-loading');
            loadingDiv.style.display = 'none';
});
$(document).ready(function() {

    var buttons = document.querySelectorAll('.CombatCardFilter-button .btn');
    var activeButtonsByType = {}; 

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var typeCostSuffix = this.querySelector('i').textContent;
            var parent = this.closest('.type');
            var typePrefix = '';
            Array.from(parent.classList).forEach(function(className) {
                if (className !== 'type') {
                    typePrefix = className;
                    return false;
                }
            });
            var fullClassName = typePrefix + typeCostSuffix;

            this.classList.toggle('btn-active');

            if (!activeButtonsByType[typePrefix]) {
                activeButtonsByType[typePrefix] = [];
            }
            var index = activeButtonsByType[typePrefix].indexOf(fullClassName);
            if (this.classList.contains('btn-active')) {
                if (index === -1) {
                    activeButtonsByType[typePrefix].push(fullClassName);
                }
            } else {
                if (index !== -1) {
                    activeButtonsByType[typePrefix].splice(index, 1);
                }
            }

            document.querySelectorAll('.CombatCardFilter-content > div').forEach(function(div) {
                var isVisible = true;
                for (var type in activeButtonsByType) {
                    if (activeButtonsByType[type].length > 0) {
                        isVisible = activeButtonsByType[type].some(function(activeClass) {
                            return div.classList.contains(activeClass);
                        });
                        if (!isVisible) {
                            break;
                        }
                    }
                }
                div.style.display = isVisible ? 'inline-block' : 'none';
            });
        });
    });
});