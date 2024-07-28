// original_data_processing
function tabsEdit() {
    // get_box
    var ContainerArray = document.getElementsByClassName('tabs-container');
    var KeysArray = [];
    // get_keys
    for(var i = 0;ContainerArray[i];i++){
        KeysArray[i] = [];
        var KeysData = ContainerArray[i].getElementsByClassName('tabs-keys');
        for(var j = 0;KeysData[j];j++){
            KeysArray[i].push(KeysData[j].innerHTML); //[[box1_keys],[box2_keys]......]
        }
    }
    // remove_redundancy
    for(var i = 1;KeysArray[i];i++){
        // reserve_outer_keys_only
        if(ContainerArray[i].parentNode.className == 'tabs-values'){
            KeysArray[i-1].splice(KeysArray[i-1].length - KeysArray[i].length, KeysArray[i].length);
        }
    }
    return [ContainerArray,KeysArray];
}
function tabsDraw(EditedArray) {
    // receiver
    var ContainerArray = EditedArray[0];
    var KeysArray = EditedArray[1];
    // combine
    for(var i = 0;ContainerArray[i];i++){
        // create_toggle_bar
        var toggleBar = document.createElement('ul');
        toggleBar.className = 'tabs-toggleBar';
        toggleBar.setAttribute('style','list-style: none;display: flex;margin: 0px;padding: 0px;');
        ContainerArray[i].insertBefore(toggleBar,ContainerArray[i].firstElementChild);
        // create_toggle_buttons
        for(var j = 0; KeysArray[i][j];j++){
            var toggleButton = document.createElement('li');
            toggleButton.className = 'tabs-toggleButton';
            toggleButton.setAttribute('style','border: 0;margin: 0;padding: 0;cursor: pointer;');
            toggleButton.setAttribute('onclick',"var buttonArray = this.parentNode.getElementsByClassName('tabs-toggleButton');for(var i = 0; buttonArray[i]; i++){buttonArray[i].className='tabs-toggleButton';document.getElementById(buttonArray[i].innerHTML).className='tabs-content';};this.className='tabs-toggleButton tabs-selected';document.getElementById(this.innerHTML).className='tabs-content tabs-show'");
            toggleButton.innerHTML = KeysArray[i][j];
            toggleBar.appendChild(toggleButton);
        }
    }
    // change_values_class_and_id
    var KeysDataAll = document.getElementsByClassName('tabs-keys');
    var ValuesDataAll = document.getElementsByClassName('tabs-values');
    for(var i = 0; KeysDataAll[i]; i++){
        ValuesDataAll[0].id = KeysDataAll[i].innerHTML;
        ValuesDataAll[0].className = 'tabs-content';
    }
    // remove_keys_div?
}

console.log('tabberLoaded');
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementsByClassName('tabs-container') !== null) {
        var EditedArray = tabsEdit();
        tabsDraw(EditedArray);
        console.log('tabberDone');
    } else {
        console.log("tabberFailed");
    }
});