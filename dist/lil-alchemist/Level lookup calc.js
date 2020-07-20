var submit = document.getElementById("submit");

submit.onclick = function () {
    var inputLevel = document.getElementById("input").value;

    if (isNaN(inputLevel) || inputLevel < 1 || inputLevel > 100) {
        document.getElementById("error").innerHTML = "Not a valid level. Ensure you type a number between 1 and 100.";
        document.getElementById("error").style.color = "red";
    } else {
        document.getElementById("error").innerHTML = "Details for level " + inputLevel + " displayed.";
        document.getElementById("error").style.color = "green";
        getData(inputLevel);
    }
};

function getData(inputLvl) {
    var rowIndex = inputLvl;
    //window.alert("rowIndex = " + rowIndex);
    var row = document.getElementById("dataTable").rows.item(rowIndex);
    //window.alert("row = " + row);

    var outLevel = row.cells.item(0).innerText;
    var outEnergy = row.cells.item(1).innerText;
    var outCoins = row.cells.item(2).innerText;
    var outDiamonds = row.cells.item(3).innerText;
    var outCards = row.cells.item(4).innerText;
    var outXPReq = row.cells.item(5).innerText;
    var outXPTot = row.cells.item(6).innerText;

    var outRow = row;

    //window.alert("Data output = " + outLevel + ", " + outEnergy + ", " + outCoins + ", " + outDiamonds + ", " + outCards + ", " + outXPReq + ", " + outXPTot)

    document.getElementById("Level").innerHTML = outLevel;
    document.getElementById("Energy").innerHTML = outEnergy;
    document.getElementById("Coins").innerHTML = outCoins;
    document.getElementById("Diamonds").innerHTML = outDiamonds;
    document.getElementById("Cards").innerHTML = outCards;
    document.getElementById("XPreq").innerHTML = outXPReq;
    document.getElementById("XPtot").innerHTML = outXPTot;

}