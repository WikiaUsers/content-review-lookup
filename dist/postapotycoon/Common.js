/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('myCheckbox');
    var label = document.getElementById('myCheckboxLabel');
    var valueDisplay = document.getElementById('valueDisplay');
    var value = 10;

    function toggleCheckbox() {
        if (checkbox.textContent === '[ ]') {
            checkbox.textContent = '[x]';
            value += 5;
        } else {
            checkbox.textContent = '[ ]';
            value -= 5;
        }
        valueDisplay.textContent = value;
    }

    if (checkbox && label && valueDisplay) {
        checkbox.addEventListener('click', toggleCheckbox);
        label.addEventListener('click', toggleCheckbox);
    }
});