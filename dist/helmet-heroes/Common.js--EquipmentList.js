/* Tools for showing/hiding equipment for various classes on the equipment list pages (Helmets, Armor, Leggings, Shoes/Boots */

// check if a tag has a certain class
// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}



$(document).ready(function() {
    var checkboxGroups = document.getElementsByClassName('equipment_checkbox_group');
    for (var i = 0; i < checkboxGroups.length; i++) {
        var group = checkboxGroups[i];
        group.id = 'checkbox_container_' + i;
        var elements = group.getElementsByClassName('tableToggler');
        for(var j = 0; j < elements.length; j++) {
            elements[j].setAttribute('container_id', group.id);
            elements[j].addEventListener('click', toggleTableRowEntries);
        }
    }
});

function toggleTableRowEntries() {
    // set new value of check for element
    this.classList.toggle('checked');
    
    // get the checkbox group this checkbox is part of, and get a list of which boxes are checked
    var group_id = this.getAttribute('container_id');
    var container = document.getElementById(group_id);
    // determine which checkboxes are checked
    var checkboxes = container.getElementsByClassName('tableToggler');
    var checkedList = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].classList.contains('checked')) {
            checkedList.push(checkboxes[i].getAttribute('data-category'));
        }
    }
    // iterate over the equipment table, show rows with at least one class in the checked list and hide the rest
    var tableEntries = document.getElementsByClassName('equipment');
    for (var i = 0; i < tableEntries.length; i++) {
        var tableRow = tableEntries[i];
        // check if row has at least one of the classes in the checkedList array
        if (hasClassArray(tableRow, checkedList)) {
            tableRow.style.display = 'table-row';
        } else {
            tableRow.style.display = 'none';
        }
    }
    
}
function hasClassArray(element, classArray) {
    for (var i = 0; i < classArray.length; i++) {
        if (element.classList.contains(classArray[i])) {
            return true;
        }
    }
    return false;
}

function updateHanded() {

    var tableEntries = document.getElementsByClassName('equipment');

    var checkOneHanded = false;
    var checkTwoHanded = false;

    if (document.getElementById('HHcheckbox-oneHanded').checked)
        checkOneHanded = true;
    if (document.getElementById('HHcheckbox-twoHanded').checked)
        checkTwoHanded = true;

    // cycle through list, making correct rows visible
    for (var i = 0; i < tableEntries.length; i++) {
        if (checkOneHanded && hasClass(tableEntries[i], 'oneHanded'))
            tableEntries[i].style.display = 'table-row';
        else if (checkTwoHanded && hasClass(tableEntries[i], 'twoHanded'))
            tableEntries[i].style.display = 'table-row';
        else
            tableEntries[i].style.display = 'none';
        
    }
}



// enables/disables display of item images
function switchIcons() {
    
    var tableEntries = document.getElementsByClassName('equipment-icon');
    
    var newDisplayStyle = 'inline';
    
    if (document.getElementById('HHcheckbox-icon').checked)
        newDisplayStyle = 'inline';
    else
        newDisplayStyle = 'none';
    
    
    // cycle through list, toggle as necessary
    for (var i = 0; i < tableEntries.length; i++) {

            tableEntries[i].style.display = newDisplayStyle;
        
    }
}