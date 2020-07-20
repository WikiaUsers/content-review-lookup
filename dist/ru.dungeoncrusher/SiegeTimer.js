//                                                      //
//      Таймер для отсчета начала и окончания осад      //
//          Автор: АбырвалГ#3393 (Discord)              //
//      [[w:c:ru.dungeoncrusher:Участник:Абырвалг11]]   //
//                                                      //

var today, h, m, s, h1, h2, m1, m2, s1, s2,
    hourPlay, hourPlay2, minutePlay, minutePlay2, secondPlay, secondPlay2,
    arrClock, siegeHours, nextSiegeId, salt, siegeTimer, siegeCloseTimer, nowSiege, tmpHour, nowTime,
    nowSiegeStatus = false;

function initSiegeTimer() {

    hourPlay2 = document.getElementById("siegeClockHourPlay2");
    hourPlay = document.getElementById("siegeClockHourPlay");

    minutePlay2 = document.getElementById("siegeClockMinutePlay2");
    minutePlay = document.getElementById("siegeClockMinutePlay");

    secondPlay2 = document.getElementById("siegeClockSecondPlay2");
    secondPlay = document.getElementById("siegeClockSecondPlay");

    nowSiege = document.getElementById("nowSiege");

    arrClock = [hourPlay, hourPlay2, minutePlay, minutePlay2, secondPlay, secondPlay2];

    siegeHours = [5, 10, 15, 20, 24];
    
    today = new Date();
    h = today.getUTCHours();

    for (var i = 0; i < siegeHours.length; i++) {
        if (h == siegeHours[i]) {
            m = today.getUTCMinutes();
            s = today.getUTCSeconds();
            nowTime = h * 3600 + m * 60 + s;
            nowSiege.style.display = "block";
            nowSiegeStatus = true;
            hourPlay.style.display = "none";
            hourPlay2.style.display = "none";
            hourBlinker.style.display = "none";
        }
    }
    
    nextSiege();
    setTimer();

    setInterval(function () {
        secPlay();
        checkSiege();
    }, 1000);
}

function nextSiege() {
    today = new Date();
    h = today.getUTCHours();
    m = today.getUTCMinutes();
    s = today.getUTCSeconds();

    nextSiegeId = 0;
    var nowTime = h * 3600 + m * 60 + s;

    for (var i = 0; i < siegeHours.length; i++) {
        if (nowTime < siegeHours[i] * 3600) {
            nextSiegeId = i;
            break;
        }
    }
    siegeCloseTimer = (h + 1) * 3600 - nowTime;
    h = siegeHours[nextSiegeId] - h - 1;
    m = 60 - m;
    s = 60 - s;
    m = m == 60 ? 0 : m - 1;
    s = s == 60 ? 0 : s - 1;
    siegeTimer = h * 3600 + m * 60 + s;
    if (nowSiegeStatus) {
        siegeCloseTimer = siegeTimer - siegeCloseTimer;
    }
}

function setTimer() {

    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    h1 = 9 - parseInt(h.toString()[0]);
    h2 = 9 - parseInt(h.toString()[1]);

    m1 = 5 - parseInt(m.toString()[0]);
    m2 = 9 - parseInt(m.toString()[1]);

    s1 = 5 - parseInt(s.toString()[0]);
    s2 = 9 - parseInt(s.toString()[1]);

    for (var i = 0; i < arrClock.length; i++) {
        for (var j = 0; j < arrClock[i].childElementCount; j++) {
            arrClock[i].children[j].className = "";
        }
    }

    hourPlay2.children[h1].classList.add("activeNumRotation");
    hourPlay.children[h2].classList.add("activeNumRotation");

    minutePlay2.children[m1].classList.add("activeNumRotation");
    minutePlay.children[m2].classList.add("activeNumRotation");

    secondPlay2.children[s1].classList.add("activeNumRotation");
    secondPlay.children[s2].classList.add("activeNumRotation");
}

function checkSiege() {
    siegeTimer--;
    if (siegeTimer === 0) {
        nowSiegeStatus = nowSiegeStatus ? false : true;
        nowSiege.style.display = nowSiegeStatus ? "block" : "";
        hourPlay.style.display = nowSiegeStatus ? "none" : "block";
        hourPlay2.style.display = nowSiegeStatus ? "none" : "block";
        hourBlinker.style.display = nowSiegeStatus ? "none" : "block";

        nextSiege();
        setTimer();
    }
    if (nowSiegeStatus && siegeTimer == siegeCloseTimer) {
        nowSiege.style.display = "";
        hourPlay.style.display = "block";
        hourPlay2.style.display = "block";
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function hPlay2() {
    document.body.classList.remove("playNumRotation");
    var aa = hourPlay2.getElementsByClassName("activeNumRotation")[0];

    if (aa == hourPlay2.children[hourPlay2.children.length - 1]) {

        for (var i = 0; i < hourPlay2.children.length; i++) {
            hourPlay2.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.classList.remove("activeNumRotation");
        aa = hourPlay2.children[0];
        aa.classList.add("activeNumRotation");
        document.body.classList.add("playNumRotation");
        //hPlay2();
    } else {

        for (var i = 0; i < hourPlay2.children.length; i++) {
            hourPlay2.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.nextElementSibling.classList.add("activeNumRotation");
        aa.classList.remove("activeNumRotation");
        document.body.classList.add("playNumRotation");
    }
}


function hPlay() {
    document.body.classList.remove("playNumRotation");
    var aa = hourPlay.getElementsByClassName("activeNumRotation")[0];

    if (aa == hourPlay.children[hourPlay.children.length - 1]) {

        for (var i = 0; i < hourPlay.children.length; i++) {
            hourPlay.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.classList.remove("activeNumRotation");
        aa = hourPlay.children[0];
        aa.classList.add("activeNumRotation");
        document.body.classList.add("playNumRotation");
        hPlay2();
    } else {

        for (var i = 0; i < hourPlay.children.length; i++) {
            hourPlay.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.nextElementSibling.classList.add("activeNumRotation");
        aa.classList.remove("activeNumRotation");
        document.body.classList.add("playNumRotation");
    }
}


function minPlay2() {
    document.body.classList.remove("playNumRotation");
    var aa = minutePlay2.getElementsByClassName("activeNumRotation")[0];

    if (aa == minutePlay2.children[minutePlay2.children.length - 1]) {
        for (var i = 0; i < minutePlay2.children.length; i++) {
            minutePlay2.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.classList.remove("activeNumRotation");
        aa = minutePlay2.children[0];
        aa.classList.add("activeNumRotation");
        document.body.classList.add("playNumRotation");
        hPlay();
    } else {
        for (var i = 0; i < minutePlay2.children.length; i++) {
            minutePlay2.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.nextElementSibling.classList.add("activeNumRotation");
        aa.classList.remove("activeNumRotation");
        document.body.classList.add("playNumRotation");
    }
}

function minPlay() {
    document.body.classList.remove("playNumRotation");
    var aa = minutePlay.getElementsByClassName("activeNumRotation")[0];

    if (aa == minutePlay.children[minutePlay.children.length - 1]) {
        for (var i = 0; i < minutePlay.children.length; i++) {
            minutePlay.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.classList.remove("activeNumRotation");
        aa = minutePlay.children[0];
        aa.classList.add("activeNumRotation");
        document.body.classList.add("playNumRotation");
        minPlay2();
    } else {
        for (var i = 0; i < minutePlay.children.length; i++) {
            minutePlay.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.nextElementSibling.classList.add("activeNumRotation");
        aa.classList.remove("activeNumRotation");
        document.body.classList.add("playNumRotation");
    }
}


function secPlay2() {
    document.body.classList.remove("playNumRotation");
    var aa = secondPlay2.getElementsByClassName("activeNumRotation")[0];

    if (aa == secondPlay2.children[secondPlay2.children.length - 1]) {
        for (var i = 0; i < secondPlay2.children.length; i++) {
            secondPlay2.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.classList.remove("activeNumRotation");
        aa = secondPlay2.children[0];
        aa.classList.add("activeNumRotation");
        document.body.classList.add("playNumRotation");
        minPlay();
    } else {
        for (var i = 0; i < secondPlay2.children.length; i++) {
            secondPlay2.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.nextElementSibling.classList.add("activeNumRotation");
        aa.classList.remove("activeNumRotation");
        document.body.classList.add("playNumRotation");
    }
}


function secPlay() {
    document.body.classList.remove("playNumRotation");
    var aa = secondPlay.getElementsByClassName("activeNumRotation")[0];

    if (aa == secondPlay.children[secondPlay.children.length - 1]) {
        for (var i = 0; i < secondPlay.children.length; i++) {
            secondPlay.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.classList.remove("activeNumRotation");
        aa = secondPlay.children[0];
        aa.classList.add("activeNumRotation");
        document.body.classList.add("playNumRotation");
        secPlay2();
    } else {
        for (var i = 0; i < secondPlay.children.length; i++) {
            secondPlay.children[i].classList.remove("beforeNumRotation");
        };
        aa.classList.add("beforeNumRotation");
        aa.nextElementSibling.classList.add("activeNumRotation");
        aa.classList.remove("activeNumRotation");
        document.body.classList.add("playNumRotation");
    }
}