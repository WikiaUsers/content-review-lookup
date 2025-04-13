// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:DailyFact.js
if (document.getElementById("DailyFact") === null) {
    console.log("[Daily Fact] [LOG]: Cannot locate ID 'DailyFact'. Cancelling script.");
} else {
    console.log("[Daily Fact] [LOG]: The 'DailyFact' ID has been located. Running script.");

    document.getElementById("DailyFact").setAttribute("style", "display:block;");

    // Variables and constants.
    const d = new Date();
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    var currentDay = formatDate(new Date(year + '-' + month + '-' + day), "d MMMM")
    var result;
    var outputText;

    function addLeadingZero(e) {
        if (e < 10) {
            result = '0' + e;
        } else {
            result = e;
        }
        return result;
    }

    function randomPlaceholderOutputText() {
        const randomTextList = [
            "No fact available. So sad.",
            "No fact available. How disappointing.",
            "No fact available for today. Oh well.",
            "No fact available for today. Better luck next time.",
            "No fact available. Or is there? *Cue Jake Chudnow - Moon Men*",
            "No fact? *Insert Megamind here*",
            "Error 404: Fact not found.",
            "Every day, there is a 93.973% chance you will see a placeholder message instead of a normal fact. This is due to there being only 22 out of 365 facts (for every day of a standard year) currently implemented.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "There are 10 possible placeholder messages. Have you seen them all?"
        ];
        result = randomTextList[Math.floor((Math.random() * randomTextList.length - 1) + 1)];
        return result;
    }

    switch (addLeadingZero(month) + '' + addLeadingZero(day)) {
        case "0211":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Eyeless_Jack'>Eyeless Jack</a> was added to the game on 11 February 2016.";
            break;
        case "0217":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Jane'>Jane</a> and <a href='https://saktkia51.fandom.com/wiki/Leatherface'>Leatherface</a> were added to the game on 17 February 2016.";
            break;
        case "0226":
            outputText = "The <a href='https://saktkia51.fandom.com/wiki/Alien_Laboratory'>Alien Laboratory</a> was massively expanded on 26 February 2022. This change came with redesigning the location's former single room as well as adding new rooms. It also featured the addition of the <a href='https://saktkia51.fandom.com/wiki/P90'>P90</a>, <a href='https://saktkia51.fandom.com/wiki/AN-94'>AN-94</a> and <a href='https://saktkia51.fandom.com/wiki/DB_Shotgun'>DB Shotgun</a> weapons and the <a href='https://saktkia51.fandom.com/wiki/Jack_Torrance'>Jack Torrance</a> and <a href='https://saktkia51.fandom.com/wiki/Wendigo'>Wendigo</a> killers, as well as <a href='https://saktkia51.fandom.com/wiki/Update_Log#26_February_2022'>other changes</a> such as the addition of <a href='https://saktkia51.fandom.com/wiki/Proximity_Prompt'>Proximity Prompts</a>.";
            break;
        case "0306":
            outputText = "2021: The <a href='https://saktkia51.fandom.com/wiki/Sewer'>Sewer</a> had a major expansion on this date.<br>2022: In <a href='https://saktkia51.fandom.com/wiki/Juggernaut_Mode'>Juggernaut Mode</a>, the <a href='https://saktkia51.fandom.com/wiki/Energy_Drink'>Energy Drink</a>'s usage limit was changed from 4 to 2.";
            break;
        case "0309":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Killer_Case_Files'>Killer Case Files</a> were added to the game on 9 March 2020, along with a considerable nerf of the PAP <a href='https://saktkia51.fandom.com/wiki/M1911'>M1911</a>.</a>";
            break;
        case "0319":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Pack-A-Punch_Machine'>PAP</a> weapons were given custom firing sounds on 19 March 2022. On the same day, shift lock was added to mobile, tablet and controller devices.";
            break;
        case "0401":
            outputText = "April Fools' Day. In 2022, the SAKTKIA51 Official Discord Server changed its <a href='https://saktkia51.fandom.com/wiki/File:SAKTKIA51_Official_Server_April_Fools_2022_icon.png'>icon</a> and <a href='https://saktkia51.fandom.com/wiki/File:SAKTKIA51_Official_Server_April_Fools_2022_banner.png'>banner</a> to commemorate the date, lasting approximately 24 hours. In 2024 and 2025, the game received April Fools-themed map <a href='https://saktkia51.fandom.com/wiki/Locations'>locations</a> and <a href='https://saktkia51.fandom.com/wiki/Killers'>Killers</a>. (See <a href='https://saktkia51.fandom.com/wiki/Game_Events#April_Fools_events'>Game Events#April Fools events</a>).";
            break;
        case "0429":
            outputText = "The game's place was created on 29 April 2014. It was also likely <a href='https://saktkia51.fandom.com/wiki/Game_Developers#Homermafia1'>Homermafia1's</a> first place, as it was on the same day he joined Roblox.";
            break;
        case "0518":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Classic_Mode'>Classic Mode</a> received separate difficulties (Normal, Hard, Classic)</a> on 18 May 2019. On the same day, the <a href='https://saktkia51.fandom.com/wiki/Rake'>Rake</a>'s model had a major redesign.";
            break;
        case "0628":
            outputText = "A popular bug, <a href='https://saktkia51.fandom.com/wiki/Jason_Voorhees'>Jason Voorhees</a>' former Chainsaw weapon being able to be taken by survivors, was fixed on 28 June 2016.";
            break;
        case "0702":
            outputText = "On 2 July 2022, the <a href='https://saktkia51.fandom.com/wiki/Surface'>Surface</a> was massively redesigned.";
            break;
        case "0717":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Killer_Mode'>Killer Mode</a> was added to the game on 17 July 2018. On the same day, <a href='https://saktkia51.fandom.com/wiki/Granny'>Granny</a> and <a href='https://saktkia51.fandom.com/wiki/Pennywise'>were also added</a>.";
            break;
        case "0721":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Area_51_Storming'>Area 51 Storming</a> was added to the game on 21 July 2019.";
            break;
        case "0820":
            outputText = "The killers <a href='https://saktkia51.fandom.com/wiki/Alien_(Enemy)'>Alien</a>, <a href='https://saktkia51.fandom.com/wiki/Chucky'>Chucky</a>, <a href='https://saktkia51.fandom.com/wiki/Eyeless_Jack'>Eyeless Jack</a>, <a href='https://saktkia51.fandom.com/wiki/Ghostface'>Ghostface</a>, <a href='https://saktkia51.fandom.com/wiki/Rake'>Rake</a>, <a href='https://saktkia51.fandom.com/wiki/Robot'>Robot</a>, <a href='https://saktkia51.fandom.com/wiki/Slenderman'>Slenderman</a> and <a href='https://saktkia51.fandom.com/wiki/Sonic.exe'>Sonic.exe</a> received special abilities on 20 August 2018. On the same day, the <i>''Killer choice''</i> gamepass was also added.";
            break;
        case "0825":
            outputText = "The SAKTKIA51 Wiki Discord server received <a href='https://cdn.discordapp.com/attachments/750971858844647434/1012291437678829618/SAKTKIA51_Wiki_Discord_server_logo_25_August_2022_v8.png'>a brand new logo</a> on 25 August 2022.";
            break;
        case "1020":
            outputText = "2015: SAKTKIA51 was first publicly released on 20 October 2015.<br>2022: The game's first official seasonal event, <a href='https://saktkia51.fandom.com/wiki/Vicious_Wraith'>Halloween</a>, was released on this day in 2022. It ran until 4 November 2022.";
            break;
        case "1023":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Aberration_(Boss_Rush)'>Aberration</a> was added to the game on 23 October 2021. On the same day, <a href='https://saktkia51.fandom.com/wiki/Endless_Survival'>Endless Survival</a>'s saving system was added and killers in <a href='https://saktkia51.fandom.com/wiki/Killer_Mode'>Killer Mode</a> received a slight buff to their walkspeed, among <a href='https://saktkia51.fandom.com/wiki/Update_Log#23_October_2021'>other changes</a>.";
            break;
        case "1120":
            outputText = "Player collisions was disabled for each other on 20 November 2015.";
            break;
        case "1217":
            outputText = "The icons of each <a href='https://saktkia51.fandom.com/wiki/Gamepasses'>gamepass</a> were redesigned on 17 December 2021.";
            break;
        case "1218":
            outputText = "The Elite difficulty was added to <a href='https://saktkia51.fandom.com/wiki/Boss_Rush'>Boss Rush</a> on 18 December 2021. On the same day, the <a href='https://saktkia51.fandom.com/wiki/Energy_Drink'>Energy Drink</a> was limited to 4 uses and <a href='https://saktkia51.fandom.com/wiki/Pack-A-Punch_Machine'>PAP</a> weapons received custom names, among <a href='https://saktkia51.fandom.com/wiki/Update_Log#18_December_2021'>other changes</a>.";
            break;
        case "1221":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Boss_Rush'>Boss Rush</a> was added to the game on 21 December 2020.</a>";
            break;
        case "1224":
            outputText = "<a href='https://saktkia51.fandom.com/wiki/Endless_Survival'>Endless Survival</a> was added to the game on 24 December 2018.";
            break;
        default:
            outputText = "<i>" + randomPlaceholderOutputText() + "</i>";
    }

    document.getElementById("DailyFactCurrentDate").innerHTML = currentDay;

    document.getElementById("DailyFactOutput").innerHTML = outputText + "<br><small>(<a href='https://saktkia51.fandom.com/wiki/MediaWiki:DailyFact.js'>view facts list</a>)</small>";
}
// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:DailyFact.js