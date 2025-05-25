/* ----------------------------------------------------------------- */
/* ---------- JAVASCRIPT FILE FOR THE FABLED LEGACY WIKI ----------- */
/* --------------------- APPLIED TO ALL SKINS ---------------------- */
/* ----------------------------------------------------------------- */

/* ------------------------Table of Contents------------------------ */
/* 1. Add a modern button to the Back To Top Button script --------- */
/* 2. Custom user tags --------------------------------------------- */
/* 2.1. Initializing the custom user tags -------------------------- */
/* 2.2. Remove the Administrator user tag from Bureaucrats --------- */
/* 2.3. Manually giving the custom user tags to users -------------- */
/* 2.4. Inactive users who have not edited the wiki for more than
40 days ------------------------------------------------------------ */
/* 2.5. New wiki editors ------------------------------------------- */
/* 3. Stat potential bar ------------------------------------------- */
/* 3.1. Adding the input box --------------------------------------- */
/* 3.2. Initializing the potential bar ----------------------------- */


/* --------- 1 --------- */
/* Add a modern button to the Back To Top Button script */
window.BackToTopModern = true;
window.BackToTopStart = 1250;



/* --------- 2 --------- */
/* Custom user tags */

/* -------- 2.1 -------- */
/* Initializing the custom user tags */
window.UserTagsJS = {
    modules: {},
    tags: {
        former_staff: { u: 'Former FL Wiki Staff', order: 100 },
        impactful: { u: 'Impactful Editor', order: 101 },
        bureaucrat: { order: 1 },
        founder: { u: 'FL Wiki Founder', order: 0 }
    }
};


/* -------- 2.2 -------- */
/* Remove the Administrator user tag from Bureaucrats */
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'],
};


/* -------- 2.3 -------- */
/* Manually giving the custom user tags to users */
UserTagsJS.modules.custom = {
    '123 bst': ['founder'],
    'Its Gear47': ['impactful'],
    'SillyWillyLookinGuy': ['impactful'],
    'VoidDrin': ['impactful'],
    '4KFrost01': ['impactful'],
    'Mubinazo': ['impactful'],
    'Tawit2546': ['impactful'],
    'ChemBond': ['former_staff', 'impactful'],
    'Agrusix': ['former_staff', 'impactful'],
    'TheTreasureHunter': ['former_staff', 'impactful'],
};


/* -------- 2.4 -------- */
/* Inactive users who have not edited the wiki for more than 40 days */
UserTagsJS.modules.inactive = 40;


/* -------- 2.5 -------- */
/* New wiki editors */
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;



/* --------- 3 --------- */
/* Stat potential bar */

/* -------- 3.1 -------- */
/* Adding the input box */
const statPotentialInputField = '<input type="number" id="statPotentialInput" min="-500" max="200" value="0"><span style="user-select:none;" class="stat-potential-bar-right">%</span>';
document.getElementById("inputWrapper").innerHTML = statPotentialInputField;


/* -------- 3.2 -------- */
/* Initializing the potential bar */
var input = document.getElementById("statPotentialInput");
var statPotentialBar = document.getElementById("statPotentialBar");
var statPotentialText = document.getElementById("statPotentialText");

input.addEventListener("input", function(){
    var percentage_value = parseInt(input.value);

    if (isNaN(percentage_value)) percentage_value = 0;
    if (percentage_value < -500) percentage_value = -500; // Stops the user from going lower than -500
    if (percentage_value > 200) percentage_value = 200; // Stops the user from going higher than 200

    statPotentialBar.style.width = percentage_value + "%";

    if (percentage_value >= 0 && percentage_value < 40) {
        statPotentialBar.style.background = "linear-gradient(90deg, #5C2020, #AD3C3C)"; // Stat Potential: Poor
        statPotentialText.textContent = "Stat Potential: Poor";
    } else if (percentage_value >= 40 && percentage_value < 60) {
        statPotentialBar.style.background = "linear-gradient(90deg, #5C581E, #ADA538)"; // Stat Potential: Average
        statPotentialText.textContent = "Stat Potential: Average";
    } else if (percentage_value >= 60 && percentage_value < 70) {
        statPotentialBar.style.background = "linear-gradient(90deg, #435C2D, #7DAD55)"; // Stat Potential: Good
        statPotentialText.textContent = "Stat Potential: Good";
    } else if (percentage_value >= 70 && percentage_value < 80) {
        statPotentialBar.style.background = "linear-gradient(90deg, #2A5C31, #4FAD5E)"; // Stat Potential: Great
        statPotentialText.textContent = "Stat Potential: Great";
    } else if (percentage_value >= 80 && percentage_value < 90) {
        statPotentialBar.style.background = "linear-gradient(90deg, #2E5C24, #58AD45)"; // Stat Potential: Amazing
        statPotentialText.textContent = "Stat Potential: Amazing";
    } else if (percentage_value >= 90 && percentage_value < 95) {
        statPotentialBar.style.background = "linear-gradient(90deg, #5C3A14, #AD6F27)"; // Stat Potential: Legendary
        statPotentialText.textContent = "Stat Potential: Legendary";
    } else if (percentage_value >= 95 && percentage_value <= 100) {
        statPotentialBar.style.background = "linear-gradient(90deg, #5B3F07, #AD770D)"; // Stat Potential: Godly
        statPotentialText.textContent = "Stat Potential: Godly";
    } else {
        statPotentialBar.style.background = "linear-gradient(90deg, #5C2020, #AD3C3C)"; // Stat Potential: UNOBTAINABLE
        statPotentialText.textContent = "Stat Potential: UNOBTAINABLE";
		if (percentage_value > 100) {
                statPotentialBar.style.width = "100%"; //Stops the background gradient color from moving
        }
    }
});