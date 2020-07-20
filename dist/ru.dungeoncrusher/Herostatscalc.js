/* Скрипт импортируется через [[MediaWiki:ImportJS]] */
/*         Автор: АбырвалГ#3393 (Discord)         */
/*          Калькулятор характеристик героя        */

var statsTable, hero, heroStats, insertRangeSlider, arrRares, listRares,
    rankCnt, rankDiv, rankLabel, rankInput, rankLabelCnt,
    doblCnt, doblDiv, doblLabel, doblInput, doblLabelCnt,
    selectRare, doblCss, doblImg, siegeDiv, siegeCnt;
 
function init() {
    hero = {};
    heroStats = document.querySelectorAll("#parent .hero-block-icons");
    hero.baseRareName = document.querySelector("#parent [class^='hero-border']").className;
 
    statsTable = document.querySelectorAll("#calc_table_out tbody")[1];
 
    targetHeroRare = document.getElementById("brdHero");
    targetHeroRank = document.querySelector("#calc_table_out b");
 
    selectRare = document.getElementById("slider_stats_ppls_out");
    rankDiv = document.getElementById("slider_stats_rangs_out");
    doblDiv = document.getElementById("slider_stats_dobl_out");
 
    doblCss = "hero-border-dobl";
 
    doblImg = document.createElement('img');
    doblImg.src = "https://vignette.wikia.nocookie.net/dungeoncrusher/images/1/14/Доблесть_рамка.png/revision/latest?cb=20200316195856&format=original&path-prefix=ru";
    doblImg.className = doblCss;
    doblImg.hidden = true;
    targetHeroRare.prepend(doblImg);
 
    hero.sum = Number.parseInt(heroStats[0].innerText);
    hero.hp = Number.parseInt(heroStats[1].innerText);
    hero.atk = Number.parseInt(heroStats[2].innerText);
    hero.def = Number.parseInt(heroStats[3].innerText);
    hero.wis = Number.parseInt(heroStats[4].innerText);
    hero.agi = Number.parseInt(heroStats[5].innerText);
    hero.rank = 5500;
    hero.rare = 25;
    hero.dobl = 0;
    
    siegeDiv = document.getElementById("switchSiegeTypes");
    siegeCnt = 1;

    if (siegeDiv) {
        for (var i = 0; i < siegeDiv.children.length; i++) {
            siegeDiv.children[i].setAttribute("onclick", "updateSiege(this)");
         }
    }
 
    arrRares = [
        { key: "ob", cnt: 1, name: "Обычный", css: "hero-border-ob", rank: 10},
        { key: "neob", cnt: 1, name: "Необычный", css: "hero-border-neob", rank: 25},
        { key: "redkiy", cnt: 2, name: "Редкий", css: "hero-border-redkiy", rank: 50},
        { key: "redkiy2", cnt: 3, name: "Редчайший", css: "hero-border-redkiy2", rank: 100},
        { key: "epic", cnt: 3, name: "Эпический", css: "hero-border-epic", rank: 250},
        { key: "lega", cnt: 5, name: "Легендарный", css: "hero-border-lega", rank: 500},
        { key: "mifik", cnt: 7, name: "Мифический", css: "hero-border-mifik", rank: 2500},
        { key: "bozh", cnt: 8, name: "Божественный", css: "hero-border-bozh", rank: 3250},
        { key: "bozh2", cnt: 13, name: "Богоподобный", css: "hero-border-bozh2", rank: 4000},
        { key: "vechn", cnt: 17, name: "Вечный", css: "hero-border-vechn", rank: 4750},
        { key: "gal", cnt: 25, name: "Галактический", css: "hero-border-gal", rank: 5500}
    ];
 
    listRares = new Map();
 
    for (var i in arrRares) {
        listRares.set(arrRares[i].key, arrRares[i]);
    }
 
    selectRare.classList.add("selectRare");
    selectRare.style.display = "flex";
 
    rankCnt = document.createElement('input');
    rankCnt.type = "range";
    rankCnt.id = "rankCnt";
    rankCnt.min = 0;
    rankCnt.max = 5500;
    rankCnt.value = 5500;
    rankCnt.step = 25;
    rankCnt.setAttribute("oninput", "changeRankCnt()");
 
    rankInput = document.createElement('input');
    rankInput.type = "number";
    rankInput.value = rankCnt.value;
    rankInput.min = rankCnt.min;
    rankInput.max = rankCnt.max;
    rankInput.step = rankCnt.step;
    rankInput.setAttribute("oninput", "changeRankInput()");
 
    rankDiv.classList.add("rankRangeSelector");
 
    rankLabel = document.createElement('div');
    rankLabel.innerHTML = 'Кол-во рангов: ';
 
    rankDiv.append(rankLabel);
    rankDiv.append(rankInput);
    rankDiv.append(rankCnt);
 
    doblDiv.classList.add("doblRangeSelector");
 
    doblCnt = document.createElement('input');
    doblCnt.type = "range";
    doblCnt.id = "doblCnt";
    doblCnt.min = 0;
    doblCnt.max = 35;
    doblCnt.value = 0;
    doblCnt.setAttribute("oninput", "changeDoblCnt()");
 
    doblInput = document.createElement('input');
    doblInput.type = "number";
    doblInput.value = doblCnt.value;
    doblInput.min = doblCnt.min;
    doblInput.max = doblCnt.max;
    doblInput.setAttribute("oninput", "changeDoblInput()");
 
    doblLabel = document.createElement('div');
    doblLabel.innerHTML = 'Кол-во доблестей: ';
 
    doblDiv.append(doblLabel);
    doblDiv.append(doblInput);
    doblDiv.append(doblCnt);
 
    setBaseRare();
    addListOfRares();
 
}
 
function formatSum(s, k, i) {
    return Number.parseInt(s / hero.baseRareCnt * k * 
    (1 + 0.2 * i)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
 
function updateHeroStats() {
    var koef = hero.rare *  //редкость текущая
     siegeCnt * // осадный коэффициент
        (1 + hero.rank * 0.001) * //ранги
        (1 + 0.2 * hero.dobl); //доблесть
    // hero.baseRareCnt базовая редкость
 
    // SUM HP ATK DEF WIS AGI
    for (var i = 1; i <= 8; i++) {
        statsTable.children[i].children[1].innerHTML = formatSum(hero.sum, koef, i);
        statsTable.children[i].children[2].innerHTML = formatSum(hero.hp, koef, i);
        statsTable.children[i].children[3].innerHTML = formatSum(hero.atk, koef, i);
        statsTable.children[i].children[4].innerHTML = formatSum(hero.def, koef, i);
        statsTable.children[i].children[5].innerHTML = formatSum(hero.wis, koef, i);
        statsTable.children[i].children[6].innerHTML = formatSum(hero.agi, koef, i);
    }
 
 
}
 
function setBaseRare() {
    for (var i in arrRares) {
        if (arrRares[i].css == hero.baseRareName) {
            hero.baseRareId = arrRares[i].key;
            hero.baseRareCnt = arrRares[i].cnt;
            break;
        }
    }
}
 
 
function changeRankCnt() {
    hero.rank = Number.parseInt(rankCnt.value);
    targetHeroRank.innerHTML = rankCnt.value;
    rankInput.value = Number.parseInt(rankCnt.value);
 
    updateHeroStats();
}
function changeRankInput() {
    hero.rank = Number.parseInt(rankInput.value);
    targetHeroRank.innerHTML = rankInput.value;
    rankCnt.value = rankInput.value;
 
    updateHeroStats();
}
 
 
function changeDoblCnt() {
    hero.dobl = Number.parseInt(doblCnt.value);
    doblInput.value = doblCnt.value;
 
    if (doblInput.value == 0 && !doblImg.hidden) {
        doblImg.hidden = true;
    }
 
    if (doblInput.value > 0 && doblImg.hidden) {
        doblImg.hidden = false;
    }
 
    updateHeroStats();
}
function changeDoblInput() {
    hero.dobl = Number.parseInt(doblInput.value);
    doblCnt.value = doblInput.value;
 
    if (doblCnt.value == 0 && !doblImg.hidden) {
        doblImg.hidden = true;
    }
 
    if (doblCnt.value > 0 && doblImg.hidden) {
        doblImg.hidden = false;
    }
 
    updateHeroStats();
}
 
function addListOfRares() {
    for (var i in arrRares) {
        var div = document.createElement('div');
        div.setAttribute("onclick", "updateHeroRare(this)");
        div.setAttribute("name", arrRares[i].key);
        div.setAttribute("title", arrRares[i].name);
        div.classList.add(arrRares[i].css+"_mini");
         div.classList.add("hero-border-mini");
 
        if (arrRares[i].cnt == 25) {
             div.classList.add("checked");
        }
        var img = document.createElement('img');
        img.src = targetHeroRare.children[1].src;
 
        div.append(img);
        selectRare.append(div);
    }
}
function updateHeroRare(t) {
    var newRare = listRares.get(t.getAttribute("name"));
    var maxRank = false;
   
    targetHeroRare.className = newRare.css;
    hero.rare = newRare.cnt;

    selectRare.getElementsByClassName("checked")[0].classList.remove("checked");
    t.classList.add("checked");

    if (rankCnt.value == rankCnt.max) {
        maxRank = true;
    }

    if (newRare.rank <= 25 && rankCnt.step !== 5) {
        rankCnt.step = 5;
        rankInput.step = 5;
    }

    if (newRare.rank > 25 && rankCnt.step == 5) {
        if (rankCnt.value < 25) {
            rankCnt.value = 25;
            rankInput.value = 25;
        }
        rankCnt.step = 25;
        rankInput.step = 25;
        
    }

    rankCnt.max = newRare.rank;
    rankInput.max = newRare.rank;
    
    if (maxRank) {
        rankInput.value = rankCnt.max;
        rankCnt.value = rankCnt.max;
        }

    targetHeroRank.innerHTML = rankCnt.value;
    hero.rank = Number.parseInt(rankCnt.value);
 
    updateHeroStats();
}

function updateSiege(t) {
    siegeCnt = Number.parseInt(t.dataset.id);

    for (var i = 0; i < siegeDiv.children.length; i++) {
        siegeDiv.children[i].classList.remove("checked");
    }
    t.classList.add("checked");
    updateHeroStats();
   }