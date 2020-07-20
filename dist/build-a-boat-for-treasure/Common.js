/* Any JavaScript here will be loaded for all users on every page load. */

/* AJAX RC */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
];

// some function declarations
var sortByClass;
var sortByName;
var sortByCreator;
var shuffle;

// JS will be executed upon page load since some scripts broke

window.onload = function(){

// HTML variable escaper (won't comment out incase needed)

var escapeHTML = function(rawtext){
    return rawtext
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "%quot;")
    .replace(/'/g, "&#039;");
};

// community boat counter

var communityBoatHolderCount;
var communityBoats;

if(document.getElementById("community-boat-container-counter") !== null){
    communityBoatHolderCount = document.getElementById("community-boat-container").getElementsByClassName("community-boat").length;
    communityBoats = document.getElementById("community-boat-container").getElementsByClassName("community-boat");
    document.getElementById("community-boat-container-counter").innerHTML = escapeHTML(communityBoatHolderCount);
}

// wikia anniversary countdown

if(mw.config.get('wgPageName') == "Build_a_boat_for_treasure_Wiki"){
    var wikiaAnniversaryCountdown = setInterval(function(){
        var timeLeft = 1597448400000 - new Date().getTime();
        var daysText = "";
        var hoursText = "";
        var minutesText = "";
        var secondsText = "";
        if(Math.floor(timeLeft/86400000) > 0){
            var plurald = 's';
            if(Math.floor(timeLeft/86400000) == 1){
                plurald = '';
            }
            daysText = Math.floor(timeLeft/86400000) + " day" + plurald + ", ";
        }
        if(Math.floor((timeLeft%86400000)/3600000) > 0){
            var pluralh = 's';
            if(Math.floor((timeLeft%86400000)/3600000) == 1){
                pluralh = '';
            }
            hoursText = Math.floor((timeLeft%86400000)/3600000) + " hour" + pluralh + ", ";
        }
        if(Math.floor((timeLeft%3600000)/60000) > 0){
            var pluralm = 's';
            if(Math.floor((timeLeft%3600000)/60000) == 1){
                pluralm = '';
            }
            minutesText = Math.floor((timeLeft%3600000)/60000) + " minute" + pluralm + ", ";
        }
        if(Math.floor((timeLeft%60000)/1000) > 0){
            var plurals = 's';
            if(Math.floor((timeLeft%60000)/1000) == 1){
                plurals = '';
            }
            secondsText = Math.floor((timeLeft%60000)/1000) + " second" + plurals + ", ";
        }
        if(document.getElementById("wikia-anniversary-countdown") !== null){
            document.getElementById("wikia-anniversary-countdown").innerHTML = "In " + daysText + hoursText + minutesText + secondsText + "Build a Boat for Treasure Wikia will be celebrating its second anniversary!";
        }
        if(timeLeft <= 0){
            timeLeft = 0;
            if(document.getElementById("wikia-anniversary-countdown") !== null){
                document.getElementById("wikia-anniversary-countdown").innerHTML = "Build a Boat for Treasure Wikia is celebrating its second anniversary!";
            }
        }
    }, 100);
    
    console.log("interval handler: " + wikiaAnniversaryCountdown);
}

//community boats slideshow

if(mw.config.get('wgPageName').split('/').length == 2 && mw.config.get('wgPageName').split('/')[0] == "Community_Boats"){
    var slideIndex = 1;
    var dots = [];
    try{
        document.getElementById('community-boat-container').style.position = "relative";
        dots = document.getElementById("seven-dot").getElementsByClassName("dot");
    }
    catch(err){}
    
    var slideDisplay = function(index){
        //var slides = document.querySelectorAll('#community-boat-container .community-boat');
        var slides = document.getElementById('community-boat-container').getElementsByClassName('community-boat');
        if (index > slides.length)
            slideIndex = index - slides.length;
        if (index < 1)
            slideIndex = slides.length + index;
        for (var i = 0; i < slides.length; i++){
            slides[i].style.display = "none";
            slides[i].style.position = "static";
        }
        
        slides[slideIndex-1].style.display = "block";
        if(document.getElementById("current-boat") !== null)
            document.getElementById("current-boat").innerHTML = escapeHTML(slideIndex);
        
        if(dots.length > 0){
            for(var k = -3; k <= 3; k++){
                var dotIndex = ((slides.length * 2) + slideIndex + k - 1) % slides.length + 1;
                dots[k + 3].className = "dot";
                switch(parseFloat(slides[dotIndex-1].getAttribute("data-class"))){
                    case 1:
                        dots[k + 3].style.backgroundColor = "#00FFFF";
                        dots[k + 3].innerHTML = 1;
                        dots[k + 3].style.color = "black";
                        break;
                    case 2:
                        dots[k + 3].style.backgroundColor = "#00AAFF";
                        dots[k + 3].innerHTML = 2;
                        dots[k + 3].style.color = "white";
                        break;
                    case 3:
                        dots[k + 3].style.backgroundColor = "#0055FF";
                        dots[k + 3].innerHTML = 3;
                        dots[k + 3].style.color = "white";
                        break;
                    case 3.14:
                        dots[k + 3].style.backgroundColor = "#0055FF";
                        dots[k + 3].innerHTML = '<span style="font-family: Consolas, monospace;">π</span>';
                        dots[k + 3].style.color = "white";
                        break;
                    case 4:
                        dots[k + 3].style.backgroundColor = "#0000FF";
                        dots[k + 3].innerHTML = 4;
                        dots[k + 3].style.color = "white";
                        break;
                    case 5:
                        dots[k + 3].style.backgroundColor = "#008080";
                        dots[k + 3].innerHTML = 5;
                        dots[k + 3].style.color = "white";
                        break;
                    case 6:
                        dots[k + 3].style.backgroundColor = "#00FF00";
                        dots[k + 3].innerHTML = 6;
                        dots[k + 3].style.color = "black";
                        break;
                    case 7:
                        dots[k + 3].style.backgroundColor = "#FFFF00";
                        dots[k + 3].innerHTML = 7;
                        dots[k + 3].style.color = "black";
                        break;
                    case 8:
                        dots[k + 3].style.backgroundColor = "#FF8000";
                        dots[k + 3].innerHTML = 8;
                        dots[k + 3].style.color = "white";
                        break;
                    case 9:
                        dots[k + 3].style.backgroundColor = "#FF0000";
                        dots[k + 3].innerHTML = 9;
                        dots[k + 3].style.color = "white";
                        break;
                    case 10:
                        dots[k + 3].style.backgroundColor = "#800000";
                        dots[k + 3].innerHTML = 10;
                        dots[k + 3].style.color = "white";
                        break;
                    case 11:
                        dots[k + 3].style.backgroundColor = "#000000";
                        dots[k + 3].innerHTML = 11;
                        dots[k + 3].style.color = "white";
                        break;
                    case 12:
                        dots[k + 3].innerHTML = 12;
                        dots[k + 3].style.color = "white";
                        dots[k + 3].style.backgroundColor = "black";
                        dots[k + 3].className += " c12-dot";
                        break;
                    default:
                        dots[k + 3].style.backgroundColor = "#808080";
                        dots[k + 3].innerHTML = "?";
                        dots[k + 3].style.color = "white";
                        break;
                }
            }
        }
    };
    
    var prevSlide = function(){
        slideDisplay(slideIndex -= 1);
    };
    var nextSlide = function(){
        slideDisplay(slideIndex += 1);
    };
    var slideChangeDot = function(change){
        slideDisplay(slideIndex += change);
    };
    
    try{
        slideDisplay(slideIndex);
    }
    catch(err){console.log(err);}
    
    if(document.getElementsByClassName("prev")[0])
        document.getElementsByClassName("prev")[0].addEventListener('click', prevSlide);
    if(document.getElementsByClassName("next")[0])
        document.getElementsByClassName("next")[0].addEventListener('click', nextSlide);
    
    dots[0].onclick = function(){slideChangeDot(-3);};
    dots[1].onclick = function(){slideChangeDot(-2);};
    dots[2].onclick = function(){slideChangeDot(-1);};
    dots[4].onclick = function(){slideChangeDot(1);};
    dots[5].onclick = function(){slideChangeDot(2);};
    dots[6].onclick = function(){slideChangeDot(3);};
    
    // sort algorithm
    
    // list all boat combinations
    
    var allBoats = [];
    for(var i = 0; i < communityBoatHolderCount; i++){
        var boatOrder = [];
        do{
            boatOrder.push(communityBoats[i]);
            if(communityBoats[i].getAttribute("data-precede") == 1){
                i++;
            }
            else{
                break;
            } 
        }
        while(true);
        allBoats.push([]);
        for(var j = 0; j < boatOrder.length; j++){
            allBoats[allBoats.length - 1].push(boatOrder[j]);
        }
    }
    
    // sort by class function
    
    sortByClass = function(){
        var sortArea = document.getElementById("sort-boat");
        sortArea.innerHTML = "";
        
        allBoats.sort(function(a, b){return a[0].getAttribute("data-class") - b[0].getAttribute("data-class");});
        
        for(var i = 0; i < allBoats.length; i++){
            for(var j = 0; j < allBoats[i].length; j++)
                sortArea.appendChild(allBoats[i][j]);
        }
        
        slideDisplay(1);
    };
    
    // sort by name function
    
    sortByName = function(){
        var sortArea = document.getElementById("sort-boat");
        sortArea.innerHTML = "";
        
        allBoats.sort(function(a,b){
            if (a[0].getAttribute("data-boatname").toLowerCase() < b[0].getAttribute("data-boatname").toLowerCase())
                return -1;
            if (a[0].getAttribute("data-boatname").toLowerCase() > b[0].getAttribute("data-boatname").toLowerCase())
                return 1;
            return 0;
        });
        
        for(var i = 0; i < allBoats.length; i++){
            for(var j = 0; j < allBoats[i].length; j++)
                sortArea.appendChild(allBoats[i][j]);
        }
        
        slideDisplay(1);
    };
    
    // sort by creator function
    
    sortByCreator = function(){
        var sortArea = document.getElementById("sort-boat");
        sortArea.innerHTML = "";
        
        allBoats.sort(function(a,b){
            if (a[0].getAttribute("data-creator").toLowerCase() < b[0].getAttribute("data-creator").toLowerCase())
                return -1;
            if (a[0].getAttribute("data-creator").toLowerCase() > b[0].getAttribute("data-creator").toLowerCase())
                return 1;
            return 0;
        });
        
        for(var i = 0; i < allBoats.length; i++){
            for(var j = 0; j < allBoats[i].length; j++)
                sortArea.appendChild(allBoats[i][j]);
        }
        
        slideDisplay(1);
    };
    
    // random shuffle
    
    shuffle = function(){
        var sortArea = document.getElementById("sort-boat");
        sortArea.innerHTML = "";
        
        var placeholder = allBoats.slice();
        
        while(placeholder.length > 0){
            var randomBoat = Math.floor(Math.random() * placeholder.length);
            for(var j = 0; j < placeholder[randomBoat].length; j++)
                sortArea.appendChild(placeholder[randomBoat][j]);
            placeholder.splice(randomBoat, 1);
        }
        
        slideDisplay(1);
    };
    
    shuffle(); // initial random shuffling
    
    if(document.getElementById("sort-class") !== null)
        document.getElementById("sort-class").addEventListener("click", sortByClass);
    if(document.getElementById("sort-name") !== null)
        document.getElementById("sort-name").addEventListener("click", sortByName);
    if(document.getElementById("sort-creator") !== null)
        document.getElementById("sort-creator").addEventListener("click", sortByCreator);
    if(document.getElementById("shuffle") !== null)
        document.getElementById("shuffle").addEventListener("click", shuffle);
}
};