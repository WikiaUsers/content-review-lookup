//Licznik do Pirates of the Caribean: Dead Men Tell No Tales
function startTime() {
    var countdown = document.getElementById('CountdownTimer');
    
    if (!countdown) return;
    
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    
    var dr = Date.parse("26 May 2017 00:00:00 UTC");
    var today = new Date();
    var dt = today.getTime();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = Math.floor((dr - dt) / 86400000);
    var h1 = Math.floor((dr - dt) % 86400000 / 3600000);
    var m1 = Math.floor((dr - dt) % 86400000 % 3600000 / 60000);
    var s1 = 59 - s;

    m = checkTime(m);
    s = checkTime(s);
    m1 = checkTime(m1);
    s1 = checkTime(s1);
    
    countdown.innerHTML = "<tr><td>" + d + "<br><span style=font-size:60%>Dni</span></td>" + "<td>" + h1 + "<br><span style=font-size:60%>Godzin</span></td>" + "<td>" + m1 + "<br><span style=font-size:60%>Minut</span></td>" + "<td>" + s1 + "<br><span style=font-size:60%>Sekund</span></td>";

    t = setTimeout('startTime()', 500);
}

addOnloadHook(startTime);

// Spoiler Alert
SpoilerAlert = {
    categories: "Spoiler",
};
SpoilerAlert = {
    question: 'Ten artykuł zawiera ważne informacje na temat fabuły filmów, a więc jest spoilerem. Czy chcesz kontynuować?',
    yes: 'Tak, chcę kontynuować',
    no: 'Nie, zabierz mnie stąd',
    isSpoiler: function() {
        return Boolean($('#spoiler').length);
    }
};
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});