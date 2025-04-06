$(document).ready(function () {
    var buttons = document.querySelectorAll('.appearance-face .appearance-btn');
    var activeButtonsByType = {};

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var typeCostSuffix = this.querySelector('i').textContent;
            var parent = this.closest('.appearance-type');
            var typePrefix = Array.from(parent.classList).find(className => className!== 'appearance-type');
            var fullClassName = typePrefix + typeCostSuffix;

            var sameTypeButtons = parent.querySelectorAll('.appearance-btn');
            sameTypeButtons.forEach(function (sameTypeButton) {
                sameTypeButton.classList.remove('appearancebtn-active');
            });
            this.classList.add('appearancebtn-active');

            if (!activeButtonsByType[typePrefix]) {
                activeButtonsByType[typePrefix] = [];
            }
            var index = activeButtonsByType[typePrefix].indexOf(fullClassName);
            if (this.classList.contains('appearancebtn-active')) {
                if (index === -1) {
                    activeButtonsByType[typePrefix].push(fullClassName);
                }
            } else {
                if (index!== -1) {
                    activeButtonsByType[typePrefix].splice(index, 1);
                }
            }

            var img = this.querySelector('img');
            if (img) {
                var targetSpan = document.getElementById(typePrefix);
                if (targetSpan) {
                    targetSpan.innerHTML = '';
                    var clonedImg = img.cloneNode(true);
                    targetSpan.appendChild(clonedImg);
                }
            }
        });
    });

    document.getElementById('appearance-random-button').addEventListener('click', function () {
        var appearanceTypes = document.querySelectorAll('.appearance-type');
        appearanceTypes.forEach(function (type) {
            var typePrefix = Array.from(type.classList).find(className => className!== 'appearance-type');
            var typeButtons = type.querySelectorAll('.appearance-btn');
            if (typeButtons.length > 0) {
                var randomIndex = Math.floor(Math.random() * typeButtons.length);
                var randomButton = typeButtons[randomIndex];
                var clickEvent = new Event('click');
                randomButton.dispatchEvent(clickEvent);
            }
        });
    });
});