function getMultiplierSp(typeSp, lvSp) {
    var allMultiplier = {
        "légers" : {
            1: 130,
            2: 140,
            3: 150,
            4: 160,
            5: 170,
            6: 180,
            7: 190,
            8: 200,
            9: 210,
            10: 220
        },
        "moyens" : {
            1: 170,
            2: 180,
            3: 190,
            4: 200,
            5: 210,
            6: 220,
            7: 230,
            8: 240,
            9: 250,
            10: 260
        },
        "gros" : {
            1: 200,
            2: 210,
            3: 220,
            4: 230,
            5: 240,
            6: 250,
            7: 260,
            8: 270,
            9: 280,
            10: 290,
            11: 300,
            12: 310,
            13: 320,
            14: 330,
            15: 360
        },
        "énormes" : {
            1: 220,
            2: 235,
            3: 250,
            4: 265,
            5: 280,
            6: 295,
            7: 310,
            8: 325,
            9: 340,
            10: 355,
            11: 370,
            12: 385,
            13: 400,
            14: 415,
            15: 450
        },
        "colossaux" : {
            1: 250,
            2: 270,
            3: 290,
            4: 310,
            5: 330,
            6: 350,
            7: 370,
            8: 390,
            9: 410,
            10: 430
        },
        "immenses" : {
            1: 280,
            2: 305,
            3: 330,
            4: 355,
            5: 380,
            6: 405,
            7: 430,
            8: 455,
            9: 480,
            10: 505
        },
        "gigantesques" : {
            1: 300,
            2: 305,
            3: 310,
            4: 315,
            5: 320,
            6: 325,
            7: 330,
            8: 335,
            9: 340,
            10: 345,
            11: 350,
            12: 355,
            13: 360,
            14: 365,
            15: 370,
            16: 375,
            17: 380,
            18: 385,
            19: 390,
            20: 425
        },
        "titanesques" : {
            1: 350,
            2: 360,
            3: 370,
            4: 380,
            5: 390,
            6: 400,
            7: 410,
            8: 420,
            9: 430,
            10: 440,
            11: 450,
            12: 460,
            13: 470,
            14: 480,
            15: 490,
            16: 500,
            17: 510,
            18: 520,
            19: 530,
            20: 570
        }
    };
    
    return (allMultiplier[typeSp][lvSp]);
}

function computedamage()
{
    //Obtain user inputs
    var baseatk = Number(
        document.querySelector("#baseatk input").value
        );
    var potboost = Number(
        document.querySelector("#potboost input").value
        );
    var spboost = Number(
        document.querySelector("#spboost input").value
        );
    var leader1 = Number(
        document.querySelector("#leader input").value
        ) / 100;
    var leader2 = Number(
        document.querySelector("#friend input").value
        ) / 100;
    var fullki = Number(
        document.querySelector("#fullki input").value
        ) / 100;
    var spatk = getMultiplierSp(
        document.querySelector("#typesp select").value,
        document.querySelector("#lvsp input").value
        ) / 100;
    var startperc = Number(
        document.querySelector("#startperc input").value
        ) / 100;
    var startflat = Number(
        document.querySelector("#startflat input").value
        );
    var fstartperc = Number(
        document.querySelector("#fstartperc input").value
        ) / 100;
    var fstartflat = Number(
        document.querySelector("#fstartflat input").value
        );
    var linkperc = Number(
        document.querySelector("#linkperc input").value
        )/100;
    var linkflat = Number(
        document.querySelector("#linkflat input").value
        );
    var endperc = Number(
        document.querySelector("#endperc input").value
        )/100;
    var endflat = Number(
        document.querySelector("#endflat input").value
        );
    var spatkboost = Number(
        document.querySelector("#spatkboost input").value
        )/100;
    var spatkboostflat = Number(
        document.querySelector("#spatkboostflat input").value
        );
	
    //Calculate damage
    var combinedatk = baseatk + potboost;
    var leaderatk = Math.floor(combinedatk*(1 + leader1 + leader2));
    var atkwithpass = Math.floor(startflat + fstartflat + leaderatk*(1 + startperc + fstartperc));
    var linkedatk = Math.floor(atkwithpass*(1+linkperc) + linkflat);
    var fullkiatk = Math.ceil(fullki*(linkedatk + endflat));
    var fullkiatk2 = Math.floor(fullkiatk * ( 1 + spatkboost) + spatkboostflat);
    var superboost = spatk + 0.05 * spboost + endperc;
    var totaldamage = Math.floor(fullkiatk2*superboost);

    //Display the result
    document.getElementById("outputTotal").innerText = totaldamage;
	document.getElementById("outputKi").innerText = fullkiatk;
}

/* Fonction pour ajouté créer le formulaire du calculateur de dégâts */
computeDamageButton = document.getElementById('ComputeDamage');
if (computeDamageButton) {

    $('<input type="number" value="0"/>').appendTo(document.getElementById("baseatk"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("potboost"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("spboost"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("leader"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("friend"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("fullki"));
    $(
        '<select>' +
            '<option value="légers">Légers dégâts</option>' +
            '<option value="moyens">Dégâts moyens </option>' +
            '<option value="gros">Gros dégâts </option>' +
            '<option value="énormes" selected="">Énormes dégâts</option>' +
            '<option value="colossaux">Dégâts colossaux</option>' +
            '<option value="immenses">Dégâts immenses</option>' +
            '<option value="gigantesques">Dégâts gigantesques</option>' +
            '<option value="titanesques">Dégâts titanesques</option>' +
        '</select>'
    ).appendTo(document.getElementById("typesp")); //modify for select
    $('<input type="number" value="0"/>').appendTo(document.getElementById("lvsp"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("startperc"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("startflat"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("fstartperc"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("fstartflat"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("linkperc"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("linkflat"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("endperc"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("endflat"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("spatkboost"));
    $('<input type="number" value="0"/>').appendTo(document.getElementById("spatkboostflat"));
    
    computeDamageButton.addEventListener("click", function( ) {
        computedamage();
        return false;
    } );
}