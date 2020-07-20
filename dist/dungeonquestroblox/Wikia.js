function able() {
    var level1 = document.getElementById("myText").value;
    var level2 = document.getElementById("my").value;
    var xp = 0;
    for (var x = level1; x < level2; x++) xp += Math.floor((84 * Math.pow(1.13, x - 1) + 0.5));
    var xpString = xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("cable").innerHTML = "You will need about " + xpString + " experience";
}