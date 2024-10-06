// Function to get the value from a contenteditable element, converting abbreviation back to number
function getInputValue(id) {
    var value = document.getElementById(id).innerText.replace(/,/g, '') || 0;
    return deAbbreviateNumber(value);
}

// Function to set the value in a contenteditable element, with abbreviation for large numbers
function setInputValue(id, value) {
    document.getElementById(id).innerText = abbreviateNumber(Number(value));
}

// Function to abbreviate large numbers based on value
function abbreviateNumber(value) {
    if (value >= 1e99) {
        return (value / 1e99).toFixed(2) + 'Dtg';
    } else if (value >= 1e96) {
        return (value / 1e96).toFixed(2) + 'Utg';
    } else if (value >= 1e93) {
        return (value / 1e93).toFixed(2) + 'Tg';
    } else if (value >= 1e90) {
        return (value / 1e90).toFixed(2) + 'Novg';
    } else if (value >= 1e87) {
        return (value / 1e87).toFixed(2) + 'Ocvg';
    } else if (value >= 1e84) {
        return (value / 1e84).toFixed(2) + 'Spvg';
    } else if (value >= 1e81) {
        return (value / 1e81).toFixed(2) + 'Sxvg';
    } else if (value >= 1e78) {
        return (value / 1e78).toFixed(2) + 'Qivg';
    } else if (value >= 1e75) {
        return (value / 1e75).toFixed(2) + 'Qavg';
    } else if (value >= 1e72) {
        return (value / 1e72).toFixed(2) + 'Tvg';
    } else if (value >= 1e69) {
        return (value / 1e69).toFixed(2) + 'Dvg';
    } else if (value >= 1e66) {
        return (value / 1e66).toFixed(2) + 'Uvg';
    } else if (value >= 1e63) {
        return (value / 1e63).toFixed(2) + 'Vg';
    } else if (value >= 1e60) {
        return (value / 1e60).toFixed(2) + 'Nod';
    } else if (value >= 1e57) {
        return (value / 1e57).toFixed(2) + 'Ocd';
    } else if (value >= 1e54) {
        return (value / 1e54).toFixed(2) + 'Spd';
    } else if (value >= 1e51) {
        return (value / 1e51).toFixed(2) + 'Sxd';
    } else if (value >= 1e48) {
        return (value / 1e48).toFixed(2) + 'Qid';
    } else if (value >= 1e45) {
        return (value / 1e45).toFixed(2) + 'Qad';
    } else if (value >= 1e42) {
        return (value / 1e42).toFixed(2) + 'Td';
    } else if (value >= 1e39) {
        return (value / 1e39).toFixed(2) + 'Dd';
    } else if (value >= 1e36) {
        return (value / 1e36).toFixed(2) + 'Ud';
    } else if (value >= 1e33) {
        return (value / 1e33).toFixed(2) + 'Dc';
    } else if (value >= 1e30) {
        return (value / 1e30).toFixed(2) + 'No';
    } else if (value >= 1e27) {
        return (value / 1e27).toFixed(2) + 'Oc';
    } else if (value >= 1e24) {
        return (value / 1e24).toFixed(2) + 'Sp';
    } else if (value >= 1e21) {
        return (value / 1e21).toFixed(2) + 'Sx';
    } else if (value >= 1e18) {
        return (value / 1e18).toFixed(2) + 'Qi';
    } else if (value >= 1e15) {
        return (value / 1e15).toFixed(2) + 'Qa';
    } else if (value >= 1e12) {
        return (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    } else {
        return value.toLocaleString();
    }
}

// Function to de-abbreviate numbers like '1.00T+' back into their numeric form
function deAbbreviateNumber(value) {
    var abbreviationMap = {
        'Dtg': 1e99,
        'Utg': 1e96,
        'Tg': 1e93,
        'Novg': 1e90,
        'Ocvg': 1e87,
        'Spvg': 1e84,
        'Sxvg': 1e81,
        'Qivg': 1e78,
        'Qavg': 1e75,
        'Tvg': 1e72,
        'Dvg': 1e69,
        'Uvg': 1e66,
        'Vg': 1e63,
        'Nod': 1e60,
        'Ocd': 1e57,
        'Spd': 1e54,
        'Sxd': 1e51,
        'Qid': 1e48,
        'Qad': 1e45,
        'Td': 1e42,
        'Dd': 1e39,
        'Ud': 1e36,
        'Dc': 1e33,
        'No': 1e30,
        'Oc': 1e27,
        'Sp': 1e24,
        'Sx': 1e21,
        'Qi': 1e18,
        'Qa': 1e15,
        'T': 1e12,
        'B': 1e9,
        'M': 1e6
    };

    for (var key in abbreviationMap) {
        if (value.includes(key)) {
            return parseFloat(value.replace(key, '')) * abbreviationMap[key];
        }
    }

    return parseFloat(value) || 0;
}

// Function to sanitize and extract numeric value from a string like "1,000,000,000 (1B)"
function extractNumericValue(value) {
    var numericPart = value.split(" ")[0];
    return Number(numericPart.replace(/,/g, ''));
}

// Function to display an input prompt for user to enter a multiplier
function promptForMultiplier() {
    var multiplier = prompt("Enter the multiplier value:", "1");
    if (multiplier === null || isNaN(multiplier) || multiplier.trim() === "") {
        return 1;
    }
    return Number(multiplier);
}

// Function to add value based on the section (left or right)
function addValueBasedOnSection(button) {
    var container = button.closest('.calculator-container');
    var value = button.getAttribute('data-value');
    var numericValue = extractNumericValue(value);
    // Get multiplier from the user
    var multiplier = promptForMultiplier();
    // Multiply the value by the user-provided multiplier
    var multipliedValue = numericValue * multiplier;
    // Check which section the container belongs to
    if (container.closest('#left-section')) {
        var leftValue = getInputValue('left-input');
        var newLeftValue = Number(leftValue) + multipliedValue;
        setInputValue('left-input', newLeftValue);
    } else if (container.closest('#right-section')) {
        var rightValue = getInputValue('right-input');
        var newRightValue = Number(rightValue) + multipliedValue;
        setInputValue('right-input', newRightValue);
    }
}

// Function to reset the value of a section
function resetValue(sectionId) {
    setInputValue(sectionId, 0); // Reset the specified section to 0
}

// Add event listeners for the "Add" buttons
var buttons = document.querySelectorAll('.calculator-add-button');
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        addValueBasedOnSection(button);
    });
});

// Add event listeners for the "Reset" divs
var resetDivs = document.querySelectorAll('.calculator-reset');
resetDivs.forEach(function(div) {
    div.addEventListener('click', function() {
        var section = div.getAttribute('data-section'); // Get the section to reset
        resetValue(section); // Reset the specified section
    });
});