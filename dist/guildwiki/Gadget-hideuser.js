/*** hideUser for RC ***/
/*** Author: User:Dr ishmael ***/
function hideUserWrapper()
{
    if (document.title.substring(0,14) == 'Recent changes') {
        var tables = document.getElementsByTagName('table');
        var RCinput;
        for (var i = 0; i < tables.length; i++) {
            if (tables[i].className == 'mw-recentchanges-table') {
                RCinput = tables[i];
                break;
            }
        }
    
        var uls = document.getElementsByTagName('ul');
        var RCuls = new Array();
        for (var i = 0; i < uls.length; i++) {
            if (uls[i].className == 'special') {
                RCuls.push(uls[i]);
            }
        }

        var myInput = document.createElement('input');
        myInput.type = 'text';
        myInput.id = 'hideUsername';
        myInput.name = 'hideUsername';

        var myLabel = document.createElement('label');
        myLabel.for = 'hideUsername';
        myLabel.innerHTML = "Hide user:";

        var mySubmit = document.createElement('input');
        mySubmit.type = 'button';
        mySubmit.value = 'Hide';
    
        var newRow = RCinput.insertRow(1);
        var newLabelCell = newRow.insertCell(0);
        var newInputCell = newRow.insertCell(1);

        newLabelCell.appendChild(myLabel);

        newInputCell.appendChild(myInput);
        newInputCell.appendChild(mySubmit);

        try { //IE
            mySubmit.attachEvent("onclick", function(){ hideUser(RCuls) } );
        }
        catch(e) { //Mozilla
            mySubmit.addEventListener("click", function() { hideUser(RCuls) }, false);
        }
    }
}
addOnloadHook(hideUserWrapper);

function hideUser(RCuls)
{
    var myUser = document.getElementById('hideUsername').value;
    for (var j = 0; j < RCuls.length; j++) {
        var lis = RCuls[j].getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            var ulUser;
            if (lis[i].innerHTML.substring(0,7) == '(diff |') /* New page creation entry */
                ulUser = lis[i].getElementsByTagName('a')[2].innerHTML;
            else if (lis[i].getElementsByTagName('a')[0].innerHTML == 'diff') /* Page edit entry */
                ulUser = lis[i].getElementsByTagName('a')[3].innerHTML;
            else  /* Log entry */
                ulUser = lis[i].getElementsByTagName('a')[1].innerHTML;

            if (ulUser == myUser)
                lis[i].style.display = 'none';
            else
                lis[i].style.display = '';
        }
    }
}