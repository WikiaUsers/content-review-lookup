$(document).ready(function(){
 
    /* ---- Countdown timer ---- */
 
    $('#counter').countdown({
        timestamp : (new Date()).getTime() + 51*24*60*60*1000
    });
 
});