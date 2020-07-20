/** 
  * This script is used in familiar pages to add various enhancements:
 *  - POPE stats
 *  - Ratings
 *  - CCs
 * Note: 
 *  - do not use the character "&" in code. Use nested ifs or de morgans instead
 *  - careful with the " !" string. Turn them into just "!"
 *  - DO NOT USE // inline comment. Use / * * / everywhere
 *  - all "style" string literals will be stripped out when mobile theme is used.
 *    Workaround is using "s"+"tyle"
 * You have been warned.
 * 
 * ** How to debug this **
 * So you're getting something like 'Unexpected token ILLEGAL'?
 * Copy the one-line js to sublime, HTML prettify it, scroll down to the
 * end to see where it fails. Or copy the prettified code to jsHint and 
 * let it spell out the error.
 * 
 * You just made some changes and nothing works anymore? Contact Chinhodado.
 */
var data = {
    hpMax:  0, atkMax:  0, defMax:  0, wisMax:  0, agiMax:  0,
    hpPE:   0, atkPE:   0, defPE:   0, wisPE:   0, agiPE:   0,
    hpPOPE: 0, atkPOPE: 0, defPOPE: 0, wisPOPE: 0, agiPOPE: 0,

    hpTop: 0, atkTop: 0, defTop: 0, wisTop: 0, agiTop: 0,

    hpCC: 10, atkCC: 10, defCC: 10, wisCC: 10, agiCC: 10,

    pvpTier: "N/A",
    raidTier: "N/A",
    towerTier: "N/A",
    
    famName: "",
    category: "",
    statTable: "",
    isFinalEvolution: false
};

var tierURL = [];
tierURL.pvp   = "http://bloodbrothersgame.wikia.com/index.php?title=Familiar_Tier_List/PvP&action=render";
tierURL.raid  = "http://bloodbrothersgame.wikia.com/index.php?title=Familiar_Tier_List/Raid&action=render";
tierURL.tower = "http://bloodbrothersgame.wikia.com/index.php?title=Familiar_Tier_List/Tower&action=render";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length)!==-1;
}

function getStats() {

    function getRatingText(famStat, highestStat) {
        var rating = Math.round(famStat / highestStat * 100);
        var color = "3a3a3a";
        if (rating >= 90) {
            color = "FF0000";
        } else if (rating >= 80) {
            if (rating < 90) { /* avoid && */
                color = "FF8000";
            }
        } else if (rating >= 70) {
            if (rating < 80) {
                color = "ADAD00";
            }
        } else if (rating >= 60) {
            if (rating < 70) {
                color = "438F43";
            }
        }

        return "<span s"+"tyle='color:#" + color + "'>" + rating + "</span>";
    }

    function onFinishedGettingTopTable() {
        var doc = document.implementation.createHTMLDocument("TOP");
        doc.documentElement.innerHTML = sessionStorage.topTable;

        var hpTop = (doc.getElementById("highestHpTable").getElementsByTagName("tr")[2]).getElementsByTagName("td")[3];
        data.hpTop = parseInt((hpTop.innerText || hpTop.textContent).replace(/,/g, ""));

        var atkTop = (doc.getElementById("highestAtkTable").getElementsByTagName("tr")[2]).getElementsByTagName("td")[3];
        data.atkTop = parseInt((atkTop.innerText || atkTop.textContent).replace(/,/g, ""));

        var defTop = (doc.getElementById("highestDefTable").getElementsByTagName("tr")[2]).getElementsByTagName("td")[3];
        data.defTop = parseInt((defTop.innerText || defTop.textContent).replace(/,/g, ""));

        var wisTop = (doc.getElementById("highestWisTable").getElementsByTagName("tr")[2]).getElementsByTagName("td")[3];
        data.wisTop = parseInt((wisTop.innerText || wisTop.textContent).replace(/,/g, ""));

        var agiTop = (doc.getElementById("highestAgiTable").getElementsByTagName("tr")[2]).getElementsByTagName("td")[3];
        data.agiTop = parseInt((agiTop.innerText || agiTop.textContent).replace(/,/g, ""));

        var newText = "<tr><td s"+"tyle='text-align:center;padding:0em;'>" +
            "<span s"+"tyle='border-bottom: 1px dotted; padding: 0em' " + 
            "title='Percentage vs the highest current stat in the category'>" +
            "<a>Rating</a></span></td><td s"+"tyle='text-align:center'>";

        var categorySection = document.getElementById("articleCategories");
        if (!categorySection) {
            categorySection = document.getElementById("catlinks"); /* mobile site */
        }
        var isBloodLinked = categorySection.innerHTML.indexOf("Blood-linked Familiars")!=-1;
        if (isBloodLinked) {
            newText = newText + getRatingText(data.hpPE, data.hpTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.atkPE, data.atkTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.defPE, data.defTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.wisPE, data.wisTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.agiPE, data.agiTop) + "</td></tr>";
        }
        else {
            newText = newText + getRatingText(data.hpPOPE, data.hpTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.atkPOPE, data.atkTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.defPOPE, data.defTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.wisPOPE, data.wisTop) + "</td><td s"+"tyle='text-align:center'>" +
            getRatingText(data.agiPOPE, data.agiTop) + "</td></tr>";
        }

        /* add the new row to tbody */
        (data.statTable[0].getElementsByTagName("tbody"))[0].innerHTML += newText;

        /* add CC */
        addCC();
    }

    function onFinishCalculatedPOPE() {
        addPOPEStats();
        addTotalStats();
        getTopStats();
    }

    function getTopStats() {
        if (!sessionStorage.topTable) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        sessionStorage.topTable = xmlhttp.responseText;
                        onFinishedGettingTopTable();
                    }
                }
            };
            xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/wiki/Familiar_Top_10_List", true);
            xmlhttp.send();
            console.log("Familiar.js: Fetching top table");
        } else {
            /* already cached, just parse it and get the result */
            onFinishedGettingTopTable();
        }
    }


    /**
     * Calculate the POPE stats from the EP3 stats, then add it to our page
     */
    function getPOPEFromEP3() {
        /* parse the response text into DOM */
        var doc = document.implementation.createHTMLDocument(data.famName + "POPE");
        doc.documentElement.innerHTML = sessionStorage[data.famName];

        var maxRow = doc.getElementById("max");
        /* EP3 max stats */
        var ep3_maxHP = parseInt((maxRow.getElementsByTagName("td"))[1].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_maxATK = parseInt((maxRow.getElementsByTagName("td"))[2].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_maxDEF = parseInt((maxRow.getElementsByTagName("td"))[3].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_maxWIS = parseInt((maxRow.getElementsByTagName("td"))[4].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_maxAGI = parseInt((maxRow.getElementsByTagName("td"))[5].childNodes[0].nodeValue.replace(/,/g, ""));

        /* EP3 PE stats */
        var PERow = doc.getElementById("pe");
        var ep3_PE_HP = parseInt((PERow.getElementsByTagName("td"))[1].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_PE_ATK = parseInt((PERow.getElementsByTagName("td"))[2].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_PE_DEF = parseInt((PERow.getElementsByTagName("td"))[3].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_PE_WIS = parseInt((PERow.getElementsByTagName("td"))[4].childNodes[0].nodeValue.replace(/,/g, ""));
        var ep3_PE_AGI = parseInt((PERow.getElementsByTagName("td"))[5].childNodes[0].nodeValue.replace(/,/g, ""));

        /* our POPE */
        /* POPE E4 = Max E4 - Max E3 + ((PE E3+605)*1.1) */

        /* if not all data is available, don't show it */
        if (data.hpMax == "000" || ep3_maxHP == "000" || ep3_PE_HP == "000") {
            return;
        }
        data.hpPOPE = data.hpMax - ep3_maxHP + Math.round(((ep3_PE_HP) + 605) * 1.1);
        data.atkPOPE = data.atkMax - ep3_maxATK + Math.round(((ep3_PE_ATK) + 605) * 1.1);
        data.defPOPE = data.defMax - ep3_maxDEF + Math.round(((ep3_PE_DEF) + 605) * 1.1);
        data.wisPOPE = data.wisMax - ep3_maxWIS + Math.round(((ep3_PE_WIS) + 605) * 1.1);
        data.agiPOPE = data.agiMax - ep3_maxAGI + Math.round(((ep3_PE_AGI) + 605) * 1.1);

        /* yuhhaur added: cc reduction in POPE */
        if (Math.round((ep3_PE_HP + 605) / 10) - Math.round((ep3_PE_HP + 600) / 10) > 0) {
            data.hpCC = Math.round((0.5 - (Math.round((ep3_PE_HP * 10 + 6000) / 10) / 10 - Math.round((ep3_PE_HP + 600) / 10))) * 10 / 0.5);
        } else {
            data.hpCC = 0;
        }
        if (Math.round((ep3_PE_ATK + 605) / 10) - Math.round((ep3_PE_ATK + 600) / 10) > 0) {
            data.atkCC = Math.round((0.5 - (Math.round((ep3_PE_ATK * 10 + 6000) / 10) / 10 - Math.round((ep3_PE_ATK + 600) / 10))) * 10 / 0.5);
        } else {
            data.atkCC = 0;
        }
        if (Math.round((ep3_PE_DEF + 605) / 10) - Math.round((ep3_PE_DEF + 600) / 10) > 0) {
            data.defCC = Math.round((0.5 - (Math.round((ep3_PE_DEF * 10 + 6000) / 10) / 10 - Math.round((ep3_PE_DEF + 600) / 10))) * 10 / 0.5);
        } else {
            data.defCC = 0;
        }
        if (Math.round((ep3_PE_WIS + 605) / 10) - Math.round((ep3_PE_WIS + 600) / 10) > 0) {
            data.wisCC = Math.round((0.5 - (Math.round((ep3_PE_WIS * 10 + 6000) / 10) / 10 - Math.round((ep3_PE_WIS + 600) / 10))) * 10 / 0.5);
        } else {
            data.wisCC = 0;
        }
        if (Math.round((ep3_PE_AGI + 605) / 10) - Math.round((ep3_PE_AGI + 600) / 10) > 0) {
            data.agiCC = Math.round((0.5 - (Math.round((ep3_PE_AGI * 10 + 6000) / 10) / 10 - Math.round((ep3_PE_AGI + 600) / 10))) * 10 / 0.5);
        } else {
            data.agiCC = 0;
        }
        /* End yuhhaur */

        onFinishCalculatedPOPE();
    }

    data.statTable = document.getElementsByClassName("article-table");
    var rowPE = ((data.statTable[0].getElementsByTagName("tbody"))[0].getElementsByTagName("tr"))[3];

    /* PE stats */
    data.hpPE = parseInt((rowPE.getElementsByTagName("td"))[1].childNodes[0].nodeValue.replace(/,/g, ""));
    data.atkPE = parseInt((rowPE.getElementsByTagName("td"))[2].childNodes[0].nodeValue.replace(/,/g, ""));
    data.defPE = parseInt((rowPE.getElementsByTagName("td"))[3].childNodes[0].nodeValue.replace(/,/g, ""));
    data.wisPE = parseInt((rowPE.getElementsByTagName("td"))[4].childNodes[0].nodeValue.replace(/,/g, ""));
    data.agiPE = parseInt((rowPE.getElementsByTagName("td"))[5].childNodes[0].nodeValue.replace(/,/g, ""));

    var rowMax = ((data.statTable[0].getElementsByTagName("tbody"))[0].getElementsByTagName("tr"))[2];
    data.hpMax = parseInt((rowMax.getElementsByTagName("td"))[1].childNodes[0].nodeValue.replace(/,/g, ""));
    data.atkMax = parseInt((rowMax.getElementsByTagName("td"))[2].childNodes[0].nodeValue.replace(/,/g, ""));
    data.defMax = parseInt((rowMax.getElementsByTagName("td"))[3].childNodes[0].nodeValue.replace(/,/g, ""));
    data.wisMax = parseInt((rowMax.getElementsByTagName("td"))[4].childNodes[0].nodeValue.replace(/,/g, ""));
    data.agiMax = parseInt((rowMax.getElementsByTagName("td"))[5].childNodes[0].nodeValue.replace(/,/g, ""));

    var pageHeader = document.getElementById("WikiaPageHeader");
    if (!pageHeader) {
        pageHeader = document.getElementById("wkMainCntHdr"); /* mobile site */
    }
    data.famName = (pageHeader.getElementsByTagName("h1"))[0].innerHTML.trim();
    
    var categorySection = document.getElementsByClassName("container")[0];
    if (!categorySection) {
        categorySection = document.getElementById("catlinks"); /* mobile site */
    }
    data.isFinalEvolution = categorySection.innerHTML.indexOf("Final Evolution")!=-1;
    
    var firstCategoryContainer = document.getElementsByClassName("name")[0];
    if (!firstCategoryContainer) {
        firstCategoryContainer = categorySection.getElementsByTagName("li")[0]; /* mobile site */
    }
    data.category = (firstCategoryContainer.getElementsByTagName("a"))[0].childNodes[0].nodeValue;

    if (data.isFinalEvolution) {
        var toAdd = 0;
        if (endsWith(data.category, "1")) toAdd = 500; /* 1 star */
        else if (endsWith(data.category, "2")) toAdd = 550; /* 2 star */
        else if (endsWith(data.category, "3")) toAdd = 605; /* 3 star */

        if (endsWith(data.category, "1")) {

            data.hpPOPE = data.hpMax + toAdd;
            data.atkPOPE = data.atkMax + toAdd;
            data.defPOPE = data.defMax + toAdd;
            data.wisPOPE = data.wisMax + toAdd;
            data.agiPOPE = data.agiMax + toAdd;

            onFinishCalculatedPOPE();
        } else if (!endsWith(data.category, "4")) {
            data.hpPOPE = data.hpPE + toAdd;
            data.atkPOPE = data.atkPE + toAdd;
            data.defPOPE = data.defPE + toAdd;
            data.wisPOPE = data.wisPE + toAdd;
            data.agiPOPE = data.agiPE + toAdd;

            onFinishCalculatedPOPE();
        } else {
            /* only fetch the 3 star stats when it's a 4-star familiar */
            var evo3link = (document.getElementById("evoStep3").getElementsByTagName("a")[0]).getAttribute("href");
            if (!sessionStorage[data.famName]) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            sessionStorage[data.famName] = xmlhttp.responseText;
                            getPOPEFromEP3();
                        }
                    }
                };
                xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com" + evo3link, true);
                xmlhttp.send();
                console.log("Familiar.js: Fetching EP3 stats to calculate POPE");
            } else {
                /* already cached, just parse it and get the result */
                getPOPEFromEP3();
            }
        }
    }
}
/**
 * Inject the POPE stats HTML into the page
 */
function addPOPEStats() {
    var categorySection = document.getElementById("articleCategories");
    if (!categorySection) {
        categorySection = document.getElementById("catlinks"); /* mobile site */
    }
    var isBloodLinked = categorySection.innerHTML.indexOf("Blood-linked Familiars")!=-1;
    if (isBloodLinked) {
        /* oh well, blood linked doesn't like POPE, just exit */
        return;
    }
    if (data.isFinalEvolution) {
        var newText = "<tr><td s"+"tyle='text-align:center;padding:0em;'><a>POPE</a></td><td s"+"tyle='text-align:right'>" + numberWithCommas(data.hpPOPE) + "</td><td s"+"tyle='text-align:right'>" + numberWithCommas(data.atkPOPE) + "</td><td s"+"tyle='text-align:right'>" + numberWithCommas(data.defPOPE) + "</td><td s"+"tyle='text-align:right'>" + numberWithCommas(data.wisPOPE) + "</td><td s"+"tyle='text-align:right'>" + numberWithCommas(data.agiPOPE) + "</td></tr>";

        /* add the new row to tbody */
        (data.statTable[0].getElementsByTagName("tbody"))[0].innerHTML += newText;

        console.log("Familiar.js: Calculated POPE from EP3 stats");
    }
}

function addTotalStats() {
    var totalPE = data.hpPE + data.atkPE + data.defPE + data.wisPE + data.agiPE;
    var totalPOPE = data.hpPOPE + data.atkPOPE + data.defPOPE + data.wisPOPE + data.agiPOPE;
    
    var categorySection = document.getElementById("articleCategories");
    if (!categorySection) {
        categorySection = document.getElementById("catlinks"); /* mobile site */
    }
    var isBloodLinked = categorySection.innerHTML.indexOf("Blood-linked Familiars")!=-1;
    if (isBloodLinked) {
        /* oh well, blood linked doesn't like POPE, replace POPE stats by PE and PE stats ad max stats */
        totalPE = data.hpMax + data.atkMax + data.defMax + data.wisMax + data.agiMax;
        totalPOPE = data.hpPE + data.atkPE + data.defPE + data.wisPE + data.agiPE;
    }
    var totalPEText = (isNaN(totalPE) || totalPE == 0)?"N/A":numberWithCommas(totalPE);
    var totalPOPEText = (isNaN(totalPOPE) || totalPOPE == 0)?"N/A":numberWithCommas(totalPOPE);

    var newText = "<tr><td s"+"tyle='text-align:center;padding:0em;'><span s"+"tyle='border-bottom: 1px dotted; padding: 0em' title='Total PE stats and total POPE stats'><a>Total</a></span></td><td></td><td></td><td></td><td>"
                  + totalPEText + "</td><td>" 
                  + totalPOPEText + "</td></tr>";

    /* add the new row to tbody */
    (data.statTable[0].getElementsByTagName("tbody"))[0].innerHTML += newText;

    /* or add it directly to the PE row, but can cause overflow in small screens */
    /*var addedPETotalText = "<td>" + numberWithCommas(totalPE) + "</td>";*/
    /*rowPE.innerHTML += addedPETotalText; */
}

function addCC() {
    if (!(!data.isFinalEvolution||!endsWith(data.category, "4"))) {
        var newText = "<tr><td s"+"tyle='text-align:center;padding:0em;'><a href=\"http://bloodbrothersgame.wikia.com/wiki/Thread:290324\">Last CC</a></td><td s"+"tyle='text-align:center'>" + data.hpCC + "</td><td s"+"tyle='text-align:center'>" + data.atkCC + "</td><td s"+"tyle='text-align:center'>" + data.defCC + "</td><td s"+"tyle='text-align:center'>" + data.wisCC + "</td><td s"+"tyle='text-align:center'>" + data.agiCC + "</td></tr>";

        /* add the new row to tbody */
        (data.statTable[0].getElementsByTagName("tbody"))[0].innerHTML += newText;
    }
}

function addSkillInfo () {

    /* get the list of skills */
    var skillList = (((document.getElementsByClassName("infobox"))[0].getElementsByTagName("tr"))[3]).getElementsByTagName("a");

    var skillLink1 = skillList[0].getAttribute("href");
    if (!sessionStorage[skillLink1]) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    sessionStorage[skillLink1] = xmlhttp.responseText;
                    skill1();
                }
            }
        };
        xmlhttp.open("GET", skillLink1, true);
        xmlhttp.send();        
    }
    else {
        skill1();
    }

    function skill1 () {
        /* parse the response text into DOM */
        var doc = document.implementation.createHTMLDocument("Skill");
        doc.documentElement.innerHTML = sessionStorage[skillLink1];

        /* get the skill info box */
        var infoBox = (doc.getElementsByClassName("infobox"))[0];

        /* insert the skill box to the side */
        var content = document.getElementsByClassName("WikiaPageContentWrapper")[0];
        var rail = document.getElementById("WikiaRail");
        content.insertBefore(infoBox, rail);
    }
    
    function skill2 () {
        /* parse the response text into DOM */
        var doc = document.implementation.createHTMLDocument("Skill");
        doc.documentElement.innerHTML = sessionStorage[skillLink2];
        
        /* get the skill info box */
        var infoBox = (doc.getElementsByClassName("infobox"))[0];
        
        /* insert the skill box to the side */
        var content = document.getElementsByClassName("WikiaPageContentWrapper")[0];
        var rail = document.getElementById("WikiaRail");
        content.insertBefore(infoBox, rail);
    }

    /* if there's a second skill, add it too */
    if (!(typeof skillList[1] === 'undefined')) {

        var skillLink2 = skillList[1].getAttribute("href");
        if (!sessionStorage[skillLink2]) {
            var xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.onreadystatechange = function() {
                if (xmlhttp2.readyState == 4) {
                    if (xmlhttp2.status == 200) {
                        sessionStorage[skillLink2] = xmlhttp2.responseText;
                        skill2();
                    }
                }
            };
            xmlhttp2.open("GET", skillLink2, true);
            xmlhttp2.send();            
        }
        else {
            skill2();
        }
    }
}

/*
 * Initially, call getPvP(), which has getRaid() as callback,
 *                 getRaid() has getTower() as callback
 *    and finally, getTower() has addTierInfo() as callback
 * Ideally, getPvP(), getRaid() and getTower() should be done in parallel instead of 
 * being done serially like this, but that's for later
 */
function getTierInfo () {

    function getPvP() {
        /* fetch the pvp tier page */
        if (!sessionStorage.pvp) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        sessionStorage.pvp = xmlhttp.responseText;
                        data.pvp = getTier("pvp");
                        getRaid();
                    }
                }
            };
            xmlhttp.open("GET", tierURL.pvp, true);
            xmlhttp.send();
            sessionStorage.pvp = xmlhttp.responseText;
            console.log("Fetching pvp tier");
        }
        else {
            data.pvp = getTier("pvp");
            getRaid();
        }
    }

    function getRaid() {
        /* fetch the raid tier page */
        if (!sessionStorage.raid) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        sessionStorage.raid = xmlhttp.responseText;
                        data.raid = getTier("raid");
                        getTower();
                    }
                }
            };
            xmlhttp.open("GET", tierURL.raid, true);
            xmlhttp.send();
            sessionStorage.raid = xmlhttp.responseText;
            console.log("Fetching raid tier");
        }
        else {
            data.raid = getTier("raid");
            getTower();
        }
    }

    function getTower() {
        /* fetch the tower tier page */
        if (!sessionStorage.tower) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        sessionStorage.tower = xmlhttp.responseText;
                        data.tower = getTier("tower");
                        addTierInfo();
                    }
                }
            };
            xmlhttp.open("GET", tierURL.tower, true);
            xmlhttp.send();
            sessionStorage.tower = xmlhttp.responseText;
            console.log("Fetching tower tier");
        }
        else {
            data.tower = getTier("tower");
            addTierInfo();
        }
    }

    function getTier(category) {
        /* parse the response text into DOM */
        var tierResult = "N/A";
        var tierTable = "";
        var doc = document.implementation.createHTMLDocument("Tier");
        doc.documentElement.innerHTML = sessionStorage[category];

        var tables = doc.getElementsByClassName("wikitable");
        
        if (!tables) {
            return tierResult;
        }

        var famName = (document.getElementById("WikiaPageHeader").getElementsByTagName("h1"))[0].innerHTML;

        for (var i = 0; i < tables.length; i++){
            if (!tables[i])
                break;
            var items = tables[i].innerHTML;
            if (items.indexOf(famName)!= -1) {
                tierTable = tables[i].id;
                tierResult = tierTable.substr(5).replace(".2B", "+");
                console.log("Tier: " + tierResult);
                break;
            }
        }
        return tierResult;
    }

    getPvP();
}

/*
 * Add the tier info row to the stat table
 * This has to be called AFTER the tiers info have all been fetched
 */
function addTierInfo () {
    var table = (document.getElementsByClassName("article-table"))[0];

    var newText = "<tr s"+"tyle='text-align:center'>" + 
            "<td s"+"tyle='padding:0em;'><span s"+"tyle='border-bottom: 1px dotted; padding: 0em' title='PVP tier'><a>PVP</a></span></td><td>" 
            + data.pvp + "</td><td s"+"tyle='padding:0em;'><span s"+"tyle='border-bottom: 1px dotted; padding: 0em' title='Raid tier'><a>Raid</a></span></td><td>" 
            + data.raid + "</td><td s"+"tyle='padding:0em;'><span s"+"tyle='border-bottom: 1px dotted; padding: 0em' title='Tower tier'><a>Tower</a></span></td><td>" 
            + data.tower + "</td></tr>";
     
    /* add the new row to tbody */
    (table.getElementsByTagName("tbody"))[0].innerHTML += newText;
}

$(document).ready(function(){
    try {
        getStats();
        addSkillInfo();
        getTierInfo();
    }
    catch(err) {
        console.log("Familiar.js: error: " + err);
    }
});