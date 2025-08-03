/* ----------------------------------------------------------------- */
/* ---------- JAVASCRIPT FILE FOR THE FABLED LEGACY WIKI ----------- */
/* ------------- APPLIED FOR USERS ON THE DESKTOP SITE ------------- */
/* ----------------------------------------------------------------- */

/* ------------------------Table of Contents------------------------ */
/* 1. Importing the external JavaScript files ---------------------- */
/* 2. Add a modern button to the Back To Top Button script --------- */
/* 3. Custom user tags --------------------------------------------- */
/* 3.1. Initializing the custom user tags -------------------------- */
/* 3.2. Remove the Administrator user tag from Bureaucrats --------- */
/* 3.3. Manually giving the custom user tags to users -------------- */
/* 3.4. Inactive users who have not edited the wiki for more than
40 days ------------------------------------------------------------ */
/* 3.5. New wiki editors & disable the autoconfirmed user tag ------ */
/* 4. Stat potential bar & Guild color picker ---------------------- */
/* 4.1. Adding the input boxes on both elements -------------------- */
/* 4.2. Initializing the potential bar and guild color picker------- */


/* --------- 1 --------- */
/* Importing the external JavaScript files */
importArticles({
    type: "script",
    article: "MediaWiki:Experience_Calculator.js"
});



/* --------- 2 --------- */
/* Add a modern button to the Back To Top Button script */
window.BackToTopModern = true;
window.BackToTopStart = 1250;



/* --------- 3 --------- */
/* Custom user tags */

/* -------- 3.1 -------- */
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


/* -------- 3.2 -------- */
/* Remove the Administrator user tag from Bureaucrats */
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'],
};


/* -------- 3.3 -------- */
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


/* -------- 3.4 -------- */
/* Inactive users who have not edited the wiki for more than 40 days */
UserTagsJS.modules.inactive = 40;


/* -------- 3.5 -------- */
/* New wiki editors & disable the autoconfirmed user tag */
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;



/* --------- 4 --------- */
/* Stat potential bar & Guild color picker */
mw.loader.using('mediawiki.util', function () { // Adding this method so both of the input fields can work properly on Fandom
  $(function () {
    /* -------- 4.1 -------- */
    /* Adding the input boxes on both elements */
    // Stat potential input
    const statPotentialInputField = '<input type="number" id="statPotentialInput" min="-500" max="200" value="0" placeholder="0"><span style="user-select:none;" class="stat-potential-bar-right">%</span>';
    $('#inputWrapper').html(statPotentialInputField);

    // Guild color picker
    const guildColorPickerLoader = '<input type="color" id="guildColorPicker" value="#000000">';
    $('#guildColorPickerWrapper').html(guildColorPickerLoader);

    // Variables for the stat potential bar
    var statPotentialInput = document.getElementById("statPotentialInput");
    var statPotentialBar = document.getElementById("statPotentialBar");
    var statPotentialText = document.getElementById("statPotentialText");
    // Variables for the guild color picker
    var guildColorPicker = document.getElementById("guildColorPicker");
    var guildColorDisplay = document.getElementById("guildColorDisplay");
    var guildHexCode = document.getElementById("guildHexCode");
    var guildColorTag = document.getElementById("guildColorTag");


    /* -------- 4.2 -------- */
    /* Initializing the potential bar and guild color picker */
    // Stat potential bar
    if (statPotentialInput && statPotentialBar && statPotentialText) {
      statPotentialInput.oninput = function () {
        var percentage_value = parseInt(statPotentialInput.value);

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
            statPotentialBar.style.width = "100%"; // Stops the background gradient color from moving
          } else if (percentage_value < 0) {
            statPotentialBar.style.width = "0%"; // Sets the bar width as 0% when a negative number is directly typed
          }
        }
      };
    }
    // Guild color picker
    if (guildColorPicker && guildColorDisplay && guildHexCode && guildColorTag) {
      guildColorPicker.oninput = function () {
        guildColorDisplay.style.borderColor = guildColorPicker.value;
        guildHexCode.textContent = guildColorPicker.value.toUpperCase();
        guildColorTag.style.color = guildColorPicker.value;
      };
    }
  });
});