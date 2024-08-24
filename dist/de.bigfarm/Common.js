/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */
$(document).ready(function(e) {
   
   if (window.location.href.indexOf("Kalender") > -1) {
      
   var spreadsheetID = "1Qz8aql3_ir1sr1_G5l3XDnsRSHT1yXoA5En0mf_udfE";
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/2/public/values?alt=json";

    var lang = window.location.href.slice(-2).toLowerCase();
    $.getJSON(url, function(data) {                  
     var entry = data.feed.entry; 
    for(var i = 0; i < data.feed.entry.length; i++) {
        var day = $(".door"+(i+1));
        console.log(entry);
       var singleentry = data.feed.entry[i];
       $(day).find(".door-text").text(i+1);
       $(day).find(".back").addClass(singleentry["gsx$reward"]["$t"])
       $(day).find(".icon").attr("link",singleentry["gsx$"+lang]["$t"] );
    }
    
   
                       
    });
    
     $(".icon").off("click").on("click", function(e) {
         window.open($(this).attr("link"), '_blank');
     });  
     
     $(".door").each(function(){
            $(this).on("click", flipDoor);
    });
    
    function flipDoor() {
    var date = new Date();
    if(date.getDate() >= $(this).attr("data-day") && date.getMonth() >= 11) {
        $(this).find(".front").fadeOut();
        $(this).find(".back").fadeIn();
        $(this).find(".icon").addClass("clickable");
    }
}
   }
});