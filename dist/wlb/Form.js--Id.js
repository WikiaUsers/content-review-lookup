//Array of language codes
var langarray = ["EN", "CA", "BS", "DE", "ES", "FR", "IT", "JA", "MS", "NL", "PL"];

//Adds language classes to each tab
$('.tabbernav').find('a').each(function(i) {
    $(this).attr("id", langarray[i]);
});