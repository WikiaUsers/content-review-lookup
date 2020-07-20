function calculateToARewards()
{
    var toaRewards = $("#toa-rewards");
    var floor = parseInt($("#toa-floor").val());
    
    if (floor >= 1 && floor <= 100 && !isNaN(floor))
    {
        var manaTier = [1350, 1890, 2880, 3915, 4590, 5940, 7290, 7920, 8910, 9900];
        
        var rewards = {
            mana: 0,
            ss: 0,
            crystals: 0,
            energy: 0,
            ms: 0,
        };
        
        for (var i=1; i<=floor; i++)
        {
            var tier = Math.floor(i/10);
            // Floor 10 is considered tier 0
            tier = i % 10 === 0 ? --tier : tier;
            rewards.mana += manaTier[tier];
                
            i % 5 !== 0 ? rewards.ss += 1 : 
            i == 5 || i == 15 ? rewards.crystals += 10 : 
            i == 25 || i == 35 ? rewards.crystals += 20 : 
            i == 45 || i == 55 ? rewards.crystals += 30 : 
            i == 65 || i == 75 ? rewards.crystals += 40 : 
            i == 85 || i == 95 ? rewards.crystals += 50 : 
            i == 10     ? rewards.energy = 50 :
            i == 20     ? rewards.rm3 = 1 : 
            i == 30     ? rewards.ms  = 1 : 
            i == 40     ? rewards.crystals += 100 : 
            i == 50     ? rewards.ms += 2 : 
            i == 60     ? rewards.rm4 = 1 : 
            i == 70     ? rewards.dm  = 1 : 
            i == 80     ? rewards.crystals += 300 : 
            i == 90     ? rewards.ld = 1 : /*
            i == 100 */   rewards.ls = 1; 
        }
        
        var cols = 0;
        var result = "<table class='article-table'>\
                          <tr><th style='font-size: 110%; padding: 3px 0; text-align: center;' colspan='2'>Rewards</th></tr>";
        for (var reward in rewards)
        {
            result += "<tr>";
            if (rewards[reward] > 0)
            {
                switch(reward)
                {
                    case "mana": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/b/bc/Mana_Stone.png'>\
                                   </td>\
                                   <td>" + rewards[reward].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Mana</td>";
                        break;
                    case "ss": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/8/8f/Summoning_Stones.png'>\
                                   </td>\
                                   <td>Summoning Stones x" + rewards[reward] + "</td>";
                        break;
                    case "crystals": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/4/4f/Mystical_Summon.png'>\
                                   </td>\
                                   <td>Crystals x" + rewards[reward] + "</td>";
                        break;
                    case "energy": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/a/a3/Energy_Icon.png'>\
                                   </td>\
                                   <td>Energy x" + rewards[reward] + "</td>";
                        break;
                    case "rm3": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/5/52/Rainbowmon_%28Light%29_Icon.png'>\
                                   </td>\
                                   <td>Rainbowmon (3-Star) x" + rewards[reward] + "</td>";
                        break;
                    case "rm4": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/5/52/Rainbowmon_%28Light%29_Icon.png'>\
                                   </td>\
                                   <td>Rainbowmon (4-Star) x" + rewards[reward] + "</td>";
                        break;
                    case "dm": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/6/6d/Devilmon_%28Dark%29_Icon.png'>\
                                   </td>\
                                   <td>Devilmon x" + rewards[reward] + "</td>";
                        break;
                    case "ms": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/a/ab/Mystical_Scroll.png'>\
                                   </td>\
                                   <td>Mystical Scrolls x" + rewards[reward] + "</td>";
                        break;
                    case "ld": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/e/e2/Scroll_of_Light_%26_Darkness.png'>\
                                   </td>\
                                   <td>Scroll of Light and Darkness x" + rewards[reward] + "</td>";
                        break;
                    case "ls": 
                        result += "<td>\
                                       <img  height='45px' width='45px' src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/d/d1/Legendary_Scroll.png'>\
                                   </td>\
                                   <td>Legendary Scroll x" + rewards[reward] + "</td>";
                        break;
                }
            }
            result += "</tr>";
        }
        result += "</table>";
        toaRewards.html("<br/>" + result);   
    }
    else
    {
        toaRewards.html("<br/><div style='color: red; font-size: 120%;'>Please enter a number between 1-100!</div> ");
    }
    
}

if (window.location.href.indexOf("summonerswar.wikia.com/wiki/User:M%CD%A2ystr%CD%A2ile/ToA_Rewards_Calculator") != -1)
{
    $(document).ready(function()
    {
        var toaCalc = $("#toa-calculator");
        
        toaCalc.html("\
                <span style='font-size: 120%; font-weight: bold;'>Floor: </span>\
                <form style='display: inline;' onsubmit='return false;'>\
                    <input autofocus type='number' min='1' max='100' placeholder='Highest floor cleared' id='toa-floor' style='font-size: 110%; width: 175px;'></input>\
                    <input  type='submit' value='Submit' class='wikia-menu-button' style='padding: 1px 8px;' onclick='calculateToARewards()'>\
                </form>\
                <div id='toa-rewards'></div>");
    });    
    
}