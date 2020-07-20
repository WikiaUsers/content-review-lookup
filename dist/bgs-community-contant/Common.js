/* Any JavaScript here will be loaded for all users on every page load. */

(function() {
    const originalValues = {};
    String.prototype.commafy = function() {
        return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
            return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
        });
    };
    Number.prototype.commafy = function() {
        return String(this).commafy();
    };
    function addStatsCalculator(element) {
        var level = document.createElement("input");
        var levelLabel = document.createElement("label");
        levelLabel.innerHTML = "Level ";
        var enchant = document.createElement("input");
        var enchantLabel = document.createElement("label");
        enchantLabel.innerHTML = "Enchant ";
        var submit = document.createElement("button");
        submit.innerHTML = "Calculate";
        submit.onclick = function() {
            var infobox = document.getElementsByClassName("portable-infobox")[0];
            var infoboxSpans = infobox.getElementsByTagName("span");
            for (var i = 0; i < infoboxSpans.length; i++) {
                if (!originalValues[i]) {
                    originalValues[i] = {};
                    var stat = infoboxSpans[i].innerHTML;
                    if (stat.includes('x')) {
                        originalValues[i].value = parseInt(parseFloat(stat.split('x')[1].replace(/,/g, '')));
                        originalValues[i].sep = 'x';
                    } else if (stat.includes('+')) {
                        originalValues[i].value = parseInt(parseFloat(stat.split('+')[1].replace(/,/g, '')));
                        originalValues[i].sep = '+';
                    }
                }
                if (!isNaN(originalValues[i].value) && !isNaN(enchant.value) && !isNaN(level.value)) {
                    if (calculate(level.value, enchant.value, originalValues[i].value) == originalValues[i].value) {
                        var headers = document.getElementsByClassName('pi-header');
                        for (var h = 0; h < headers.length; h++) {
                            if (headers[h].innerHTML == "Calculated Stats") {
                                headers[h].innerHTML = "Base Stats";
                            } else if (headers[h].innerHTML == "Calculated Shiny Stats") {
                                headers[h].innerHTML = "Shiny Base Stats";
                            } else if (headers[h].innerHTML == "Calculated Mythic Stats") {
                                headers[h].innerHTML = "Mythic Base Stats";
                            } else if (headers[h].innerHTML == "Calculated Shiny Mythic Stats") {
                                headers[h].innerHTML = "Shiny Mythic Base Stats";
                            }
                        }
                    } else {
                        var headers = document.getElementsByClassName('pi-header');
                        for (var h = 0; h < headers.length; h++) {
                            if (headers[h].innerHTML == "Base Stats") {
                                headers[h].innerHTML = "Calculated Stats";
                            } else if (headers[h].innerHTML == "Shiny Base Stats") {
                                headers[h].innerHTML = "Calculated Shiny Stats";
                            } else if (headers[h].innerHTML == "Mythic Base Stats") {
                                headers[h].innerHTML = "Calculated Mythic Stats";
                            } else if (headers[h].innerHTML == "Shiny Mythic Base Stats") {
                                headers[h].innerHTML = "Calculated Shiny Mythic Stats";
                            }
                        }
                    }
                    infoboxSpans[i].innerHTML = originalValues[i].sep + calculate(level.value, enchant.value, originalValues[i].value).commafy();
                }
            }
            const XP_RARITIES = {
                Common: 110,
                Unique: 275,
                Rare: 650,
                Epic: 1400,
                Legendary: 2600
            };
            const ENCHANT_COSTS = {
                Gems: [
                [
                    0,
                    1000,
                    6400000
                ],
                [
                    1031,
                    100000,
                    28700000
                ],
                [
                    5001,
                    1000000,
                    129000000
                ],
                [
                    12741,
                    25000000,
                    597430000
                ],
                [
                    21021,
                    50000000,
                    2610000000
                ],
                [
                    24403,
                    100000000,
                    11550000000
                ]
                ],
                Candy: [
                [
                    0,
                    1000,
                    1432000
                ],
                [
                    697,
                    10000,
                    4750000
                ],
                [
                    4901,
                    100000,
                    28700000
                ],
                [
                    15895,
                    10000000,
                    182700000
                ],
                [
                    21431,
                    25000000,
                    1067000000
                ],
                [
                    30981,
                    100000000,
                    15547000000
                ]
                ],
                Else: [
                [
                    0,
                    1000,
                    1932000
                ],
                [
                    1167,
                    5000,
                    4748000
                ],
                [
                    3803,
                    20000,
                    15740000
                ],
                [
                    5441,
                    100000,
                    70400000
                ],
                [
                    15661,
                    25000000,
                    3479000000
                ],
                [
                    29811,
                    100000000,
                    18043600000
                ]
                ]
            };
            function getXPForLevel(rarity, level, shiny) {
                var XP = 0;
                if(level == 1) return 0;
                for(var i = 2; i <= level; i++) {
                    XP += Math.floor(XP_RARITIES[rarity] * Math.pow(i, 1.4)) * ((shiny) ? 5 : 1);
                }
                return XP;
            }
            function getEnchantCost(currency, level, shiny) {
                var data = ENCHANT_COSTS[currency];
                if(level == 0) return 0;
                var sum  = function() {
                    var num = 0;
                    for (var i = 0; i < (Object.keys(originalValues).length); i++) {
                        var value = originalValues[i];
                        if (i !== 0 && !(value.value)) break;
                        num += value.value || 0;
                    }
                    return num * ((shiny) ? 2 : 1);
                }();
                var cost = function() {
                    var totalCost = 0;
                    for (var z = 1; z <= level; z++) {
                        for (var i = 0; i < (Object.keys(data).length); i++) {
                            var line = data[(Object.keys(data).length - 1) - i];
                            var min_sum = line[0];
                            var min_cost = line[1];
                            var max_cost = line[2];
                            if (min_sum <= sum) {
                                totalCost += Math.floor(min_cost + ((max_cost - min_cost) * (z - 1) / 19));
                            }
                        }
                    }
                    return totalCost;
                }();
                return cost;
            }
            function calculate(level, enchant, stat) {
                var l = level || 1;
                var e = enchant || 0;
                var res = parseInt(stat + ((stat * 2) - stat) * (l - 1) / (25 - 1));
                return parseInt(res + ((res * 1.5) - res) * e / 40);
            }
            if (!isNaN(level.value)) {
                var rarity = (((document.getElementsByClassName('pi-section-contents')[0]).getElementsByClassName('pi-data')[0]).getElementsByTagName('span')[0]).innerHTML;
                document.getElementById('xpLabel').setAttribute("style", "");
                document.getElementById('xpReq').setAttribute("class", "xp");
                document.getElementById('xpReq').setAttribute("style", "");
                document.getElementById('xpReq').innerHTML = getXPForLevel(rarity, level.value).commafy();
                document.getElementById('xpLabels').setAttribute("style", "");
                document.getElementById('xpReqs').setAttribute("class", "xp");
                document.getElementById('xpReqs').setAttribute("style", "");
                document.getElementById('xpReqs').innerHTML = getXPForLevel(rarity, level.value, true).commafy();
            }
            if(!isNaN(enchant.value)) {
                var type = document.getElementById('encCost').getAttribute("data-type");
                document.getElementById('encLabel').setAttribute("style", "");
                document.getElementById('encCost').setAttribute("style", "");
                document.getElementById('encCost').innerHTML = getEnchantCost(type, enchant.value).commafy();
                document.getElementById('encLabels').setAttribute("style", "");
                document.getElementById('encCosts').setAttribute("style", "");
                document.getElementById('encCosts').innerHTML = getEnchantCost(type, enchant.value, true).commafy();
            }
        };
        element.append(
            levelLabel, document.createElement("br"), level, document.createElement("br"),
            enchantLabel, document.createElement("br"), enchant, document.createElement("br"), document.createElement("br"),
            submit
        );
    }
    if (document.getElementsByClassName("calculator")[0] !== undefined) {
        var calculators = document.getElementsByClassName('calculator');
        for (var i = 0; i < calculators.length; i++) {
            addStatsCalculator(calculators[i]);
        }
    }
})();

/***** Welcome to MediaWiki:Common.css *****/
/***** Maintained by: Ivan Clemente and Cbkguy *****/
/*This stylesheet covers all the skins of the wiki.*/
 
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
@import url("/MediaWiki:PaintJob.css?ctype=text/css&action=raw");
@import url("/index.php?title=MediaWiki:Wikia.css/NavigationButton.css&ctype=text/css&action=raw");
 
.skin-oasis {
    background:url('https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/3/3a/Bg.png/revision/latest?cb=20180609063912') fixed !important;
    background-size:cover !important;
}
/*UserLinks*/
.WikiaRail .activity-module .edit-info .edit-info-user{
    font-size:9.5pt;
}
 
/* Bureaucrats */
a[href$=":Notysean"], a[href$="/Notysean"],
a[href$=":GpaSarge6"], a[href$="/GpaSarge6"],
a[href$=":Ryan_Dankersom"], a[href$="/Ryan_Dankersom"],
a[href$=":Olphium"], a[href$="/Olphium"],
a[href$=":AWSM1ANW"], a[href$="/AWSM1ANW"],
a[href$=":GumdropTheGummyBee"], a[href$="/GumdropTheGummyBee"],
a[href$=":OldLuckEE"], a[href$="/OldLuckEE"]{
    font-weight:bold;
    color: #FF002A !important;
    text-shadow: 0 0 5px #FF5974 !important;
}
 
/* Admins */
a[href$=":LoadingCodeWiki"], a[href$="/LoadingCodeWiki"],
a[href$=":Iceman778970"], a[href$="/Iceman778970"],
a[href$=":DaBEASTKEATON2"], a[href$="/DaBEASTKEATON2"],
a[href$=":SaltRay"], a[href$="/SaltRay"],
a[href$=":RaidAll"], a[href$="/RaidAll"],
a[href$=":RolledOut34"], a[href$="/RolledOut34"],
a[href$=":JesseTheBeast"], a[href$="/JesseTheBeast"],
a[href$=":GalaxyGourmet"], a[href$="/GalaxyGourmet"],
a[href$=":L1242092"], a[href$="/L1242092"]{
    font-weight:bold;
    color: #FF8400 !important;
    text-shadow: 0 0 5px #FFAC59 !important;
}
 
/* Content Mods */
a[href$=":DiamondPro408584"], a[href$="/DiamondPro408584"],
a[href$=":Tahaym"], a[href$="/Tahaym"],
a[href$=":Crystal98TR"], a[href$="/Crystal98TR"],
a[href$=":RegularChild"], a[href$="/RegularChild"],
a[href$=":CapuchinoGaming"], a[href$="/CapuchinoGaming"],
a[href$=":DvH2"], a[href$="/DvH2"],
a[href$=":JoshDaNoob"], a[href$="/JoshDaNoob"],
a[href$=":WorldJudgement"], a[href$="/WorldJudgement"]{
    font-weight:bold;
    color:#3D9900 !important;
    text-shadow: 0 0 5px #5D9935 !important;
}
 
/* Discussion Mods */
a[href$=":DefildPlaysThinks"], a[href$="/DefildPlaysThinks"],
a[href$=":Luckyflower05"], a[href$="/Luckyflower05"]{
    font-weight:bold;
    color:#FF1BFF !important;
    text-shadow: 0 0 5px #DA64E2 !important;
}
 
/* Devs and Game Mods */
a[href$=":Ellexen"], a[href$="/Ellexen"],
a[href$=":Number1riker"], a[href$="/Number1riker"],
a[href$=":ItsAventix"], a[href$="/ItsAventix"],
a[href$=":MarshadowIsMeta"], a[href$="/MarshadowIsMeta"]{
    font-weight:bold;
    color: #AE00FF !important;
    text-shadow: 0 0 5px #662A82 !important;
}
 
/* Others */
a[href$=":Bambam_Bot"], a[href$="/Bambam_Bot"]{
    font-weight:bold;
    color:#00A3BA !important;
    text-shadow: 0 0 5px #40A9B7 !important;
}
 
/* Text Shadow Removal */
.wds-global-navigation__user-menu .wds-dropdown__content .wds-list.wds-is-linked > li > a, .WikiaNotifications .WikiaBadgeNotification .notification-details a {
    color: unset !important;
    font: unset;
    text-shadow: unset !important;
}
body #WikiaPage .tabs-container .tabs li a {
    font: unset;
    text-shadow: unset !important;
}
 
/*ProfileTags*/
.tag-javascript {
    background: darkred !important;
}
.tag-css {
    animation: pulse 10s infinite linear;
    color: #000;
}
.tag-verified {
    background:#93e0ff !important;
    color:#000;
}
/*Customized Stuff*/
.crit{
position:absolute;
animation:critAnimation 4s infinite linear;
  text-shadow:
   -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000;
}
 
@keyframes critAnimation {
    0%{transform: scale(0,0) rotate(-20deg); color:#FFF;}
    5%{transform: scale(1.05,1.05) rotate(20deg); color:#d1fcda;}
    10%{transform: scale(1.0,1.0) rotate(-20deg); color:#FFF;}
    15%{transform: rotate(20deg); color:#d1fcda;}
    20%{transform:rotate(-20deg); color:#FFF;}
    25%{transform:rotate(20deg); color:#d1fcda;;}
    30%{transform:rotate(-20deg); color:#FFF;}
    35%{transform: rotate(20deg); color:#d1fcda;}
    40%{transform:scale(0.5,0.5) rotate(-20deg); color:#FFF;}
    45%{transform:scale(0.25,0.25)rotate(20deg); color:#d1fcda;;}
    50%{transform:scale(0,0) rotate(-20deg); color:#FFF}
    100%{transform:scale(0,0); color:#FFF}
 
 
}
 
 
.bw img{filter:grayscale(3); transition: filter .25 ease-in-out}
.bw img:hover{filter:grayscale(0)}
.faq {
    border-bottom: solid 1px #c7bd9c
}
/*Mainpage*/
 
#main-header {
    margin: 55px auto auto auto;
    position: relative;
}
#main-header .background {
    background: url("https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/b/b9/Bss-welcome.png/revision/latest?cb=20180507105602") no-repeat;
    margin:-12px auto auto auto;
    position: relative;
    width: 720px;
    height: 133px;
}
 
#main-header .icons.hoverimage img{
    opacity: 0.5;
}
#main-header .icons.hoverimage img:hover{
    opacity: 0.8;
}
#main-header .description{
    position: absolute;
    left: 100px;
    bottom: 1px;
}
 
#main-header .bee1{
    position: absolute;
    z-index: 1;
    width: 150px;
    height: 150px;
    top: -2.5%;
}
 
#main-header .bee2{
    position: absolute;
    z-index: 1;
    width: 150px;
    height: 150px;
    left: 105px;
    bottom: 25%;
    transform: rotate(-15deg);
}
 
#main-header .bee3{
    position: absolute;
    z-index: 1;
    width: 150px;
    height: 150px;
    top: -10%;
    left: 180px;
    transform: rotate(45deg);
}
 
#main-header .bee4{
    position: absolute;
    z-index: 1;
    width: 150px;
    height: 150px;
    top: 8%;
    left: 300px;
    transform: rotate(-9deg);
}
 
.hoverimg img{
    opacity: 0.70;
    filter: alpha(opacity=70);
    transition: opacity .25s ease-in-out;
   -moz-transition: opacity .25s ease-in-out;
   -o-transition: opacity .25s ease-in-out;
   -webkit-transition: opacity .25s ease-in-out;
}
 
.hoverimg img:hover {
    opacity: 1;
    filter: alpha(opacity=100);
}
 
/*Mainpage Navigation*/
.hive:before {
    background: url("https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/5/5a/4-2-hexagon-transparent_%281%29.png/revision/latest?cb=20180507130402");
    position:absolute;
    z-index:-1;
    height: 100px;
    width: 100px;
    display: block;
    content: " ";
}
 
#hex li{
    position:relative;
    list-style-type:none;
    float:left;
  overflow:hidden;
  padding:0;
  margin:0 auto;
}
.clr:after{
  content:"";
  display:block;
  clear:both;
}
#hex .even {
  padding-bottom:50px;
}
#hex li p{
    text-align:center;
    margin:0 auto;
    transform: translateY(-10px);
}
 
/*nth-child responsiveness*/
#hex li:nth-child(2n){
    top:50px!important;
}
/*Table of contents scroll*/
.toc .show > ol{
    max-height:500px;
    overflow-y:auto;
}
 
/*Edit Summary*/
#stdSummaries{
    background: #f7e5ac;
    color: rgba(0,0,0,.5);
    font-family: Source Sans Pro;
    font-size: 9pt;
    border: 1px solid #f0cf66;
    width:264px;
}
 
.used{
    background:url(https://vignette.wikia.nocookie.net/bss-test-realm/images/0/07/Flowerfaded_%281%29.jpg/revision/latest?cb=20200601212849) center !important;
    background-repeat:no-repeat !important;
    background-size:30px 30px !important;
 
}
.toolbackground tr:nth-child(n+1):nth-child(-n+11) td:nth-child(n+1):nth-child(-n+11) {
    background:url(https://vignette.wikia.nocookie.net/bss-test-realm/images/d/d1/Flowerbright.png/revision/latest?cb=20200601214010) center;
    background-repeat:no-repeat !important;
    background-size:30px 30px !important;
    border:none !important;
}
/*PollenCollector Template*/
/*Line Collectors*/
.scythe tr:nth-child(n):nth-child(-n+6) td:nth-child(6),
.rake tr:nth-child(5) td:nth-child(6),
.rake tr:nth-child(4) td:nth-child(6),
.scooper tr:nth-child(5) td:nth-child(6),
.scooper tr:nth-child(4) td:nth-child(6),
/*Surround Fields*/
.nine-base tr:nth-child(n+5):nth-child(-n+7) td:nth-child(n+5):nth-child(-n+7),
/*4-spike after nine-base*/
.one-spike tr:nth-child(6) td:nth-child(4n),
.one-spike tr:nth-child(4n) td:nth-child(6),
/*Pulsar*/
.pulsar tr:nth-child(n+4):nth-child(-n+8) td:nth-child(n+4):nth-child(-n+8),
.pulsar tr:nth-child(n+3):nth-child(-n+9) td:nth-child(6),
.pulsar tr:nth-child(6) td:nth-child(n+3):nth-child(-n+9),
/*Honey and Porcelain*/
.dipper tr:nth-child(n+3):nth-child(-n+9) td:nth-child(n+3):nth-child(-n+9),
.porcelain tr:nth-child(n+3):nth-child(-n+9) td:nth-child(n+4):nth-child(-n+8),
.porcelain tr:nth-child(n+4):nth-child(-n+8) td:nth-child(n+3):nth-child(-n+9),
.porcelain tr:nth-child(6) td:nth-child(n+2):nth-child(-n+10),
.porcelain tr:nth-child(n+2):nth-child(-n+10) td:nth-child(6),
/*Bubble Wand*/
.bubble tr:nth-child(3n):nth-child(odd) td:nth-child(n+5):nth-child(-n+7),
.bubble tr:nth-child(n+5):nth-child(-n+7) td:nth-child(3n):nth-child(odd),
.bubble tr:nth-child(4n) td:nth-child(4n),
/*Golden Rake*/
.goldenrake tr:nth-child(n+2):nth-child(-n+5) td:nth-child(4),
.goldenrake tr:nth-child(n+2):nth-child(-n+5) td:nth-child(6),
.goldenrake tr:nth-child(n+2):nth-child(-n+5) td:nth-child(8),
/*Clippers*/
.clippers tr:nth-child(5) td:nth-child(6),
/*Petal Wand*/
.petal tr:nth-child(n+1):nth-child(-n+11) td:nth-child(6),
.petal tr:nth-child(6) td:nth-child(n+1):nth-child(-n+11),
.petal tr:nth-child(n+2):nth-child(-n+3) td:nth-child(n+5):nth-child(-n+7),
.petal tr:nth-child(n+9):nth-child(-n+10) td:nth-child(n+5):nth-child(-n+7),
.petal tr:nth-child(n+5):nth-child(-n+7) td:nth-child(n+2):nth-child(-n+3),
.petal tr:nth-child(n+5):nth-child(-n+7) td:nth-child(n+9):nth-child(-n+10),
/*test*/
.test tr:nth-child(n+2):nth-child(-n+5) td:nth-child(4),
.test tr:nth-child(n+2):nth-child(-n+5) td:nth-child(8),
.test tr:nth-child(n+8):nth-child(-n+8) td:nth-child(4),
.test tr:nth-child(n+8):nth-child(-n+8) td:nth-child(8),
.test tr:nth-child(n+9):nth-child(-n+9) td:nth-child(5),
.test tr:nth-child(n+9):nth-child(-n+9) td:nth-child(7),
.test tr:nth-child(n+10):nth-child(-n+10) td:nth-child(6)
{
    background:url(https://vignette.wikia.nocookie.net/bss-test-realm/images/0/07/Flowerfaded_%281%29.jpg/revision/latest?cb=20200601212849) center !important;
    background-repeat:no-repeat !important;
    background-size:30px 30px !important;
 
}
/*Spark Staff*/
.spark tr:nth-child(1) td:nth-child(6),
.spark tr:nth-child(11) td:nth-child(6),
.spark tr:nth-child(6) td:nth-child(11),
.spark tr:nth-child(6) td:nth-child(1),
.spark tr:nth-child(n+3):nth-child(-n+9) td:nth-child(n+2):nth-child(-n+10),
.spark tr:nth-child(2) td:nth-child(n+3):nth-child(-n+9),
.spark tr:nth-child(10) td:nth-child(n+3):nth-child(-n+9),
/*One-pollen*/
.scissors tr:nth-child(5) td:nth-child(6) 
{
    background:rgb(63, 105, 63) center !important;
    background-repeat:no-repeat !important;
    background-size:30px 30px !important;
 
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
//parallax
$(window).scroll(function(){    
    var wScroll=$(this).scrollTop();
    $('.para-content-profile').css({'transform':'translate(0px, '+wScroll/16+'%)'});
    $('.para-content-profile2').css({'transform':'translate(0px, -'+wScroll/16+'%)'});
    $('.bees').css({'transform':'translate(0px, -'+wScroll/14+'%)'});
    $('.checkmark').css({'transform':'translate(0px, -'+wScroll/24+'%)'});
    $('.hstorm').css({'transform':'translate('+wScroll/120+'%, '+wScroll/34+'%)'});
    $('.bokeh').css({'transform':'translate(0px, -'+wScroll+'px)'});
    $('.scrollthing1').css({'transform':'translate(0px, -'+wScroll/5+'%)'});
    $('#scroll-counter').text(wScroll*2);
});
var velocity = 0.15;
 
function update(){ 
    var pos = $(window).scrollTop(); 
    $('.move-bg').each(function() { 
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px'); 
    }); 
    $('.move-bg-inverted').each(function() { 
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + -Math.round((height - pos) * velocity + 300) + 'px'); 
    }); 
}
 
 
$(window).bind('scroll', update);

@import "/load.php?mode=articles&articles=u:dev:MediaWiki:ModernWikiActivity.css&only=styles";
@import "/load.php?mode=articles&articles=u:dev:MediaWiki:ActivityFeed.css&only=styles";
@import "/load.php?mode=articles&articles=u:dev:MediaWiki:FandomizedMasthead.css&only=styles";