var series = ["series1", "series2", "series3", "series4", "series5", "series6", "series7", "series8", "series9", "series10", "series11", "series12", "series13", "series14", "series15"];
var collected = 0; 
var totalMinifigures = 0; 
var totalAllMinifigures = 0;
var totalAllMinifiguresSum =0;
var total=0; 
for (var i = 0; i < series.length; i++) 
{  
   totalMinifigures = 0; 
   total += 9 * $("."+series[i] + " div").length;
  for (var j = 0; j < $("."+series[i] + " .collected").length; j++){
       collected += $("."+series[i] + " .collected").eq(j).data("level");  
totalMinifigures++;           
  }  
 $("."+series[i] + "title span").text(totalMinifigures +" / "+ $("."+series[i] + " div").length);
   collected += $("."+series[i] + " .partlycollected1").length /3; 
   collected += $("."+series[i] + " .partlycollected2").length /3 *2; 
   collected += $("."+series[i] + " .partlycollected3").length /3 *3; 
  totalAllMinifigures += totalMinifigures;
   totalAllMinifiguresSum += $("."+series[i] + " div").length; 
 } 
$(".progressbarMinifigures").text(Math.round((collected / total) * 100) + " %");
$(".minifigures").text($(".minifigures").text() + " (" + 
totalAllMinifigures + " / " + totalAllMinifiguresSum + ")");