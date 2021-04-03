/* This script modifies the image-header at the top-right based on the current game you're browsing. */
 
$( window ).on( "load", function() {
    var LoR = false;
    var LoL = false;
    var TFT = false;
    var WR = false;
 
    if ($('#articleCategories').length) {
        if( document.getElementById("articleCategories").innerHTML.indexOf("Legends of Legends")!==-1){LoL = true}
        if( document.getElementById("articleCategories").innerHTML.indexOf("Legends of Runeterra")!==-1){LoR = true}
        if( document.getElementById("articleCategories").innerHTML.indexOf("Teamfight Tactics")!==-1){TFT = true}
        if( document.getElementById("articleCategories").innerHTML.indexOf("Wild Rift")!==-1){WR = true}   
    }
    if ($('#PageHeader').length) {
        if( document.getElementById("PageHeader").innerHTML.indexOf("Legends of Legends")!==-1){LoL = true}
        if( document.getElementById("PageHeader").innerHTML.indexOf("Legends of Runeterra")!==-1||document.getElementById("PageHeader").innerHTML.indexOf("/LoR")!==-1){LoR = true}
        if( document.getElementById("PageHeader").innerHTML.indexOf("Teamfight Tactics")!==-1||document.getElementById("PageHeader").innerHTML.indexOf("/TFT")!==-1){TFT = true}
        if( document.getElementById("PageHeader").innerHTML.indexOf("Wild Rift")!==-1){WR = true}   
    }
 
    if(LoL === true){
    }else if(LoR === true){
        $('.wds-community-header').css('background-image', 'url(https://vignette.wikia.nocookie.net/leagueoflegends/images/3/34/Legends_of_Runeterra_banner.png/revision/latest?cb=20191103220415&format=original)');
    }else if(TFT === true){
        $('.wds-community-header').css('background-image', 'url(https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ec/Teamfight_Tactics_banner.png/revision/latest?cb=20191106193202&format=original)');
    }else if(WR === true){
        $('.wds-community-header').css('background-image', 'url(https://vignette.wikia.nocookie.net/leagueoflegends/images/d/d3/Wild_Rift_banner.png/revision/latest?cb=20191106193517&format=original)');
    }
 
});